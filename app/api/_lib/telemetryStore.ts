import { access, appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

type Stats = {
  likes: number;
  contacts: number;
  lastLikeAt: string | null;
  lastContactAt: string | null;
};

type ContactRecord = {
  name: string;
  email: string;
  message: string;
};

const DATA_DIR = path.join(process.cwd(), "app", ".contact-data");
const CONTACT_CSV_PATH = path.join(DATA_DIR, "requests.csv");
const LIKE_CSV_PATH = path.join(DATA_DIR, "likes.csv");
const STATS_JSON_PATH = path.join(DATA_DIR, "stats.json");

const DEFAULT_STATS: Stats = {
  likes: 126,
  contacts: 0,
  lastLikeAt: null,
  lastContactAt: null,
};

function escapeCsv(value: string) {
  return `"${value.replace(/"/g, '""').replace(/[\r\n]+/g, " ").trim()}"`;
}

async function ensureDataDirectory() {
  await mkdir(DATA_DIR, { recursive: true });
}

async function ensureCsvFile(filePath: string, header: string) {
  try {
    await access(filePath, constants.F_OK);
  } catch {
    await appendFile(filePath, `${header}\n`, "utf8");
  }
}

async function readStatsInternal() {
  await ensureDataDirectory();

  try {
    const content = await readFile(STATS_JSON_PATH, "utf8");
    const parsed = JSON.parse(content) as Partial<Stats>;
    return {
      ...DEFAULT_STATS,
      ...parsed,
    } satisfies Stats;
  } catch {
    await writeFile(STATS_JSON_PATH, JSON.stringify(DEFAULT_STATS, null, 2), "utf8");
    return DEFAULT_STATS;
  }
}

async function writeStats(stats: Stats) {
  await ensureDataDirectory();
  await writeFile(STATS_JSON_PATH, JSON.stringify(stats, null, 2), "utf8");
}

async function archiveToPrivateGitHub(eventType: "contact" | "like", payload: Record<string, string | number | null>) {
  const token = process.env.CONTACT_ARCHIVE_GH_TOKEN;
  const owner = process.env.CONTACT_ARCHIVE_GH_OWNER;
  const repo = process.env.CONTACT_ARCHIVE_GH_REPO;

  if (!token || !owner || !repo) {
    return;
  }

  const branch = process.env.CONTACT_ARCHIVE_GH_BRANCH ?? "main";
  const filePath = process.env.CONTACT_ARCHIVE_GH_PATH ?? "tele-neuro/contact-events.jsonl";
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

  try {
    const getResponse = await fetch(`${apiUrl}?ref=${encodeURIComponent(branch)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    });

    let currentContent = "";
    let sha: string | undefined;

    if (getResponse.ok) {
      const data = (await getResponse.json()) as { content?: string; sha?: string };
      currentContent = Buffer.from((data.content ?? "").replace(/\n/g, ""), "base64").toString("utf8");
      sha = data.sha;
    }

    const line = `${JSON.stringify({ ts: new Date().toISOString(), type: eventType, ...payload })}\n`;
    const nextContent = Buffer.from(`${currentContent}${line}`, "utf8").toString("base64");

    await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Archive ${eventType} event`,
        content: nextContent,
        sha,
        branch,
      }),
    });
  } catch {
    // Do not block form/like flow on archival failures.
  }
}

export async function recordContact(record: ContactRecord) {
  await ensureDataDirectory();
  await ensureCsvFile(CONTACT_CSV_PATH, "timestamp,name,email,message");

  const timestamp = new Date().toISOString();
  const row = [timestamp, record.name, record.email, record.message]
    .map(escapeCsv)
    .join(",");

  await appendFile(CONTACT_CSV_PATH, `${row}\n`, "utf8");

  const stats = await readStatsInternal();
  const nextStats: Stats = {
    ...stats,
    contacts: stats.contacts + 1,
    lastContactAt: timestamp,
  };

  await writeStats(nextStats);
  await archiveToPrivateGitHub("contact", {
    name: record.name,
    email: record.email,
    message: record.message,
    contacts: nextStats.contacts,
  });

  return nextStats;
}

export async function recordLike() {
  await ensureDataDirectory();
  await ensureCsvFile(LIKE_CSV_PATH, "timestamp,source");

  const timestamp = new Date().toISOString();
  await appendFile(LIKE_CSV_PATH, `${escapeCsv(timestamp)},${escapeCsv("footer")}\n`, "utf8");

  const stats = await readStatsInternal();
  const nextStats: Stats = {
    ...stats,
    likes: stats.likes + 1,
    lastLikeAt: timestamp,
  };

  await writeStats(nextStats);
  await archiveToPrivateGitHub("like", {
    likes: nextStats.likes,
  });

  return nextStats;
}

export async function getStats() {
  const stats = await readStatsInternal();
  return {
    likes: stats.likes,
    contacts: stats.contacts,
    lastLikeAt: stats.lastLikeAt,
    lastContactAt: stats.lastContactAt,
  };
}
