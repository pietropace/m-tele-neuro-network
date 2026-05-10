import { NextResponse } from "next/server";
import { recordLike } from "../_lib/telemetryStore";

export const runtime = "nodejs";

export async function POST() {
  try {
    const stats = await recordLike();
    return NextResponse.json({ ok: true, stats }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to save like" }, { status: 500 });
  }
}
