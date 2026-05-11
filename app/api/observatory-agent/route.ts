import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ChatMessage = {
  role?: "user" | "assistant";
  content?: string;
};

type Row = {
  institute: string;
  values: Record<string, number>;
};

const years = ["2020", "2021", "2022", "2023", "2024", "2025", "2026"];

function parseRows(content: string) {
  return content
    .trim()
    .split("\n")
    .slice(1)
    .map((line) => {
      const [institute, ...rawValues] = line.split(/\t+/);
      return {
        institute,
        values: Object.fromEntries(years.map((year, index) => [year, Number(rawValues[index] ?? 0)])),
      } satisfies Row;
    });
}

function buildFacts(rows: Row[]) {
  const total = rows.reduce(
    (sum, row) => sum + years.reduce((yearSum, year) => yearSum + row.values[year], 0),
    0,
  );
  const yearlyTotals = years.map((year) => ({
    year,
    total: rows.reduce((sum, row) => sum + row.values[year], 0),
  }));
  const instituteTotals = rows
    .map((row) => ({
      institute: row.institute,
      total: years.reduce((sum, year) => sum + row.values[year], 0),
    }))
    .sort((a, b) => b.total - a.total);

  return [
    `Totale esami remoti 2020-2026: ${total}.`,
    `Totali per anno: ${yearlyTotals.map((item) => `${item.year}: ${item.total}`).join(", ")}.`,
    `Totali per istituto: ${instituteTotals.map((item) => `${item.institute}: ${item.total}`).join(", ")}.`,
    `Anno con volume massimo: ${yearlyTotals.sort((a, b) => b.total - a.total)[0].year}.`,
    `Istituto con volume massimo complessivo: ${instituteTotals[0].institute}.`,
  ].join("\n");
}

function fallbackAnswer(question: string, facts: string) {
  return `Posso rispondere sui dati della Network Observatory.\n\n${facts}\n\nDomanda ricevuta: ${question}`;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { messages?: ChatMessage[] };
    const messages = (payload.messages ?? [])
      .filter((message) => message.role && message.content)
      .slice(-6);
    const question = messages.at(-1)?.content?.slice(0, 800) ?? "";

    if (!question) {
      return NextResponse.json({ error: "Missing question" }, { status: 400 });
    }

    const dataPath = path.join(process.cwd(), "app", "dati.txt");
    const data = await readFile(dataPath, "utf8");
    const facts = buildFacts(parseRows(data));
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ answer: fallbackAnswer(question, facts) });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile",
        temperature: 0.2,
        max_completion_tokens: 420,
        messages: [
          {
            role: "system",
            content:
              "Sei l'assistente della pagina Network Observatory. Rispondi in italiano, in modo conciso. Usa solo i dati forniti. Se il dato non è presente, dillo chiaramente.",
          },
          {
            role: "user",
            content: `DATI GREZZI:\n${data}\n\nFATTI CALCOLATI:\n${facts}`,
          },
          ...messages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ answer: fallbackAnswer(question, facts) });
    }

    const completion = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };

    return NextResponse.json({
      answer: completion.choices?.[0]?.message?.content ?? fallbackAnswer(question, facts),
    });
  } catch {
    return NextResponse.json({ error: "Unable to answer" }, { status: 500 });
  }
}
