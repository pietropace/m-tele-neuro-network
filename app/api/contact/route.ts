import { NextResponse } from "next/server";
import { recordContact } from "../_lib/telemetryStore";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const name = payload.name?.trim() ?? "";
    const email = payload.email?.trim() ?? "";
    const message = payload.message?.trim() ?? "";
    const company = payload.company?.trim() ?? "";

    if (company) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (name.length > 120 || email.length > 160 || message.length > 3000) {
      return NextResponse.json(
        { error: "Input exceeds allowed length" },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const stats = await recordContact({ name, email, message });

    return NextResponse.json({ ok: true, stats }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unable to save contact request" },
      { status: 500 },
    );
  }
}