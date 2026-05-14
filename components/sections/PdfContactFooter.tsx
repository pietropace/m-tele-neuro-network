"use client";

import { FormEvent, useState } from "react";
import Container from "../ui/Container";

type ContactState = {
  name: string;
  email: string;
  message: string;
  company: string;
};

const initialContactState: ContactState = {
  name: "",
  email: "",
  message: "",
  company: "",
};

export default function PdfContactFooter() {
  const [form, setForm] = useState<ContactState>(initialContactState);
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Contact save failed");
      }

      setForm(initialContactState);
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <footer className="bg-[#1F2F35] py-14 md:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="mt-4 font-serif text-[2.2rem] leading-[1.03] text-[#F5F7F8] min-[380px]:text-[2.6rem] md:text-[3.2rem]">
              Grazie per aver consultato il poster.
            </h2>
            <p className="mt-4 max-w-[34rem] text-[16px] leading-[1.75] text-[#D9E5E8] md:text-[18px]">
              Se vuoi, puoi lasciarci un messaggio rapido compilando il form qui.
            </p>
          </div>

          <div className="border border-[#7A8E95]/30 bg-[#22353B]/70 p-5 md:p-6">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#A9BBC0]">Contatti</p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <input
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={(event) =>
                  setForm((current) => ({ ...current, company: event.target.value }))
                }
                className="hidden"
                aria-hidden="true"
              />

              <input
                required
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                placeholder="Nome"
                className="w-full border border-[#7A8E95]/30 bg-[#1F2F35] px-3 py-3 text-[14px] text-[#F5F7F8] placeholder:text-[#A9BBC0]/70 focus:border-[#88B7A5] focus:outline-none"
              />

              <input
                required
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({ ...current, email: event.target.value }))
                }
                placeholder="Email"
                className="w-full border border-[#7A8E95]/30 bg-[#1F2F35] px-3 py-3 text-[14px] text-[#F5F7F8] placeholder:text-[#A9BBC0]/70 focus:border-[#88B7A5] focus:outline-none"
              />

              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(event) =>
                  setForm((current) => ({ ...current, message: event.target.value }))
                }
                placeholder="Messaggio"
                className="w-full resize-none border border-[#7A8E95]/30 bg-[#1F2F35] px-3 py-3 text-[14px] text-[#F5F7F8] placeholder:text-[#A9BBC0]/70 focus:border-[#88B7A5] focus:outline-none"
              />

              <button
                type="submit"
                disabled={submitState === "loading"}
                className="w-full border border-[#88B7A5] bg-[#88B7A5]/10 px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-[#F5F7F8]"
              >
                {submitState === "loading" ? "Invio in corso..." : "Invia messaggio"}
              </button>
            </form>

            {submitState === "success" ? (
              <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-[#88B7A5]">
                Messaggio ricevuto. Grazie.
              </p>
            ) : null}

            {submitState === "error" ? (
              <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-[#E8B4B4]">
                Invio non riuscito. Riprova tra poco.
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </footer>
  );
}