import { NextResponse } from "next/server";
import { getStats } from "../_lib/telemetryStore";

export const runtime = "nodejs";

export async function GET() {
  try {
    const stats = await getStats();
    return NextResponse.json({ ok: true, stats }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unable to load stats" }, { status: 500 });
  }
}
