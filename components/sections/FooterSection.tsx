"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";

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

export default function FooterSection() {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState<number | null>(null);
  const [contactsCount, setContactsCount] = useState<number | null>(null);
  const [form, setForm] = useState<ContactState>(initialContactState);
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const wasLiked = window.localStorage.getItem("maugeri-footer-liked") === "1";
    setLiked(wasLiked);

    let ignore = false;

    async function loadStats() {
      try {
        const response = await fetch("/api/stats", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as {
          stats?: { likes?: number; contacts?: number };
        };

        if (!ignore) {
          setLikes(data.stats?.likes ?? 0);
          setContactsCount(data.stats?.contacts ?? 0);
        }
      } catch {
        if (!ignore) {
          setLikes(0);
          setContactsCount(0);
        }
      }
    }

    void loadStats();

    return () => {
      ignore = true;
    };
  }, []);

  async function handleLike() {
    if (liked) {
      return;
    }

    setLiked(true);
    window.localStorage.setItem("maugeri-footer-liked", "1");

    try {
      const response = await fetch("/api/like", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Like save failed");
      }

      const data = (await response.json()) as {
        stats?: { likes?: number };
      };

      setLikes(data.stats?.likes ?? 0);
    } catch {
      // Keep optimistic UI even if telemetry write fails.
      setLikes((value) => (value ?? 0) + 1);
    }
  }

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

      const data = (await response.json()) as {
        stats?: { contacts?: number };
      };

      setForm(initialContactState);
      setSubmitState("success");
      setContactsCount(data.stats?.contacts ?? contactsCount ?? 0);
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <footer className="relative overflow-hidden bg-[#1F2F35] py-16 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <FadeIn className="lg:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#A9BBC0]">
              Contatti e feedback
            </p>

            <h2 className="mt-4 max-w-[26rem] font-serif text-[2.3rem] leading-[1.02] text-[#F5F7F8] min-[380px]:text-[2.6rem] md:text-[4rem]">
              Vuoi lasciare un riscontro rapido sul progetto?
            </h2>

            <p className="mt-5 max-w-[28rem] text-[16px] leading-[1.75] text-[#D9E5E8] md:text-[18px]">
              Puoi esprimere un feedback sintetico con un like oppure inviare un
              messaggio attraverso il form contatti essenziale qui sotto.
            </p>

            <div className="mt-8">
              <motion.button
                type="button"
                onClick={handleLike}
                whileTap={{ scale: 0.96 }}
                animate={liked ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                transition={{ duration: 0.35 }}
                aria-pressed={liked}
                disabled={liked}
                className={`inline-flex min-h-11 items-center gap-3 border px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  liked
                    ? "border-[#88B7A5] bg-[#88B7A5]/10 text-[#F5F7F8]"
                    : "border-[#7A8E95]/40 text-[#D9E5E8]"
                }`}
              >
                <span>{liked ? "Grazie" : "Like"}</span>
                <span className="font-serif text-[1.4rem] leading-none">{likes ?? 0}</span>
              </motion.button>

              <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-[#A9BBC0]">
                Like registrati: {likes ?? 0} · Contatti ricevuti: {contactsCount ?? 0}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="lg:col-span-4">
            <div className="border border-[#7A8E95]/30 bg-[#22353B]/70 p-5 md:p-6">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#A9BBC0]">
                Form contatti
              </p>

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

                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.97 }}
                  disabled={submitState === "loading"}
                  className="w-full border border-[#88B7A5] bg-[#88B7A5]/10 px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-[#F5F7F8]"
                >
                  {submitState === "loading" ? "Invio in corso..." : "Invia messaggio"}
                </motion.button>
              </form>

              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={submitState === "success" ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                className="mt-3 text-[11px] uppercase tracking-[0.16em] text-[#88B7A5]"
              >
                Messaggio ricevuto. Grazie.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={submitState === "error" ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[#E8B4B4]"
              >
                Invio non riuscito. Riprova tra poco.
              </motion.p>
            </div>
          </FadeIn>

          <FadeIn delay={0.14} className="lg:col-span-3">
            <div className="border-t border-[#7A8E95]/30 pt-5 text-[13px] leading-[1.75] text-[#D9E5E8] lg:border-t-0 lg:border-l lg:pl-6">
              <p>
                Istituti Clinici Scientifici Maugeri Spa Società Benefit: sede
                legale in via Salvatore Maugeri, 4 - 27100, Pavia (PV) - C.F.
                e P.I. 02631650187
              </p>

              <p className="mt-5 text-[10px] uppercase tracking-[0.18em] text-[#A9BBC0]">
                Email di riferimento
              </p>

              <a
                href="mailto:chiara.zaffina@icsmaugeri.it"
                className="mt-1 inline-block text-[14px] text-[#F5F7F8] underline decoration-[#88B7A5]/50 underline-offset-4"
              >
                chiara.zaffina@icsmaugeri.it
              </a>
            </div>
          </FadeIn>
        </div>
      </Container>
    </footer>
  );
}