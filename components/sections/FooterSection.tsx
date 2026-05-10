"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";

type ContactState = {
  name: string;
  email: string;
  message: string;
};

const initialContactState: ContactState = {
  name: "",
  email: "",
  message: "",
};

export default function FooterSection() {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(126);
  const [form, setForm] = useState<ContactState>(initialContactState);
  const [submitted, setSubmitted] = useState(false);

  function handleLike() {
    setLiked((current) => {
      const next = !current;
      setLikes((value) => value + (next ? 1 : -1));
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setForm(initialContactState);
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
                className={`inline-flex min-h-11 items-center gap-3 border px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  liked
                    ? "border-[#88B7A5] bg-[#88B7A5]/10 text-[#F5F7F8]"
                    : "border-[#7A8E95]/40 text-[#D9E5E8]"
                }`}
              >
                <span>{liked ? "Grazie" : "Like"}</span>
                <span className="font-serif text-[1.4rem] leading-none">{likes}</span>
              </motion.button>
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="lg:col-span-4">
            <div className="border border-[#7A8E95]/30 bg-[#22353B]/70 p-5 md:p-6">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#A9BBC0]">
                Form contatti
              </p>

              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
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
                  className="w-full border border-[#88B7A5] bg-[#88B7A5]/10 px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-[#F5F7F8]"
                >
                  Invia messaggio
                </motion.button>
              </form>

              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={submitted ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                className="mt-3 text-[11px] uppercase tracking-[0.16em] text-[#88B7A5]"
              >
                Messaggio ricevuto. Grazie.
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