import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type SiteAccessMode = "public" | "private";

const LOCAL_DATA_DIR = path.join(process.cwd(), "app", ".contact-data");
const VERCEL_DATA_DIR = path.join("/tmp", "m-tele-neuro-network", "contact-data");
const FILE_NAME = "site-access.json";

function dataDir() {
  return process.env.VERCEL ? VERCEL_DATA_DIR : LOCAL_DATA_DIR;
}

function isSiteAccessMode(value: unknown): value is SiteAccessMode {
  return value === "public" || value === "private";
}

async function localFilePath() {
  const dir = dataDir();
  await mkdir(dir, { recursive: true });
  return path.join(dir, FILE_NAME);
}

async function readLocalMode() {
  try {
    const content = await readFile(await localFilePath(), "utf8");
    const parsed = JSON.parse(content) as { siteAccessMode?: unknown };
    return isSiteAccessMode(parsed.siteAccessMode) ? parsed.siteAccessMode : "public";
  } catch {
    return "public";
  }
}

async function writeLocalMode(mode: SiteAccessMode) {
  await writeFile(
    await localFilePath(),
    JSON.stringify({ siteAccessMode: mode, updatedAt: new Date().toISOString() }, null, 2),
    "utf8",
  );
}

async function readEdgeMode() {
  const id = process.env.VERCEL_EDGE_CONFIG_ID;
  const token = process.env.VERCEL_API_TOKEN;

  if (!id || !token) {
    return null;
  }

  const params = new URLSearchParams();
  if (process.env.VERCEL_TEAM_ID) {
    params.set("teamId", process.env.VERCEL_TEAM_ID);
  }

  const response = await fetch(
    `https://api.vercel.com/v1/edge-config/${id}/item/siteAccessMode${params.size ? `?${params}` : ""}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return null;
  }

  const item = (await response.json()) as { value?: unknown };
  return isSiteAccessMode(item.value) ? item.value : null;
}

async function writeEdgeMode(mode: SiteAccessMode) {
  const id = process.env.VERCEL_EDGE_CONFIG_ID;
  const token = process.env.VERCEL_API_TOKEN;

  if (!id || !token) {
    return false;
  }

  const params = new URLSearchParams();
  if (process.env.VERCEL_TEAM_ID) {
    params.set("teamId", process.env.VERCEL_TEAM_ID);
  }

  const response = await fetch(
    `https://api.vercel.com/v1/edge-config/${id}/items${params.size ? `?${params}` : ""}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{ operation: "upsert", key: "siteAccessMode", value: mode }],
      }),
    },
  );

  return response.ok;
}

export async function getSiteAccessMode() {
  return (await readEdgeMode()) ?? (await readLocalMode());
}

export async function setSiteAccessMode(mode: SiteAccessMode) {
  await writeLocalMode(mode);
  const edgeUpdated = await writeEdgeMode(mode);
  return { mode, edgeUpdated };
}
