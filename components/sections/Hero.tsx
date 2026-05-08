"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "../ui/Container";
import HeroNetwork from "./HeroNetwork";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#F5F7F8]">
      <div className="absolute inset-x-0 top-0 h-px bg-[#1F2F35]/10" />
      <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-[#1F2F35]/10 lg:block lg:left-[6rem]" />
      <HeroNetwork />

      <Container className="relative z-10 flex min-h-screen flex-col justify-between py-10 md:py-14 lg:py-16">
        <motion.div
          initial={{
            opacity: 0,
            y: -12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex items-start justify-between gap-8 border-b border-[#1F2F35]/10 pb-5"
        >
          <div className="flex flex-col gap-4">
            <Image
              src="/maugeri-logo.png"
              alt="ICS Maugeri IRCCS"
              width={425}
              height={161}
              priority
              className="h-auto w-[116px] opacity-80 md:w-[148px]"
            />
            <span className="text-[11px] uppercase leading-relaxed tracking-[0.28em] text-[#7A8E95]">
              ICS Maugeri IRCCS
            </span>
          </div>
          <span className="text-right text-[11px] uppercase leading-relaxed tracking-[0.28em] text-[#7A8E95]">
            SINC 2026
          </span>
        </motion.div>

        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
          <div className="lg:col-span-11">
            <motion.div
              initial={{
                opacity: 0,
                y: 28,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h1 className="max-w-[1180px] text-balance font-serif text-[3.35rem] leading-[0.88] tracking-normal text-[#1F2F35] sm:text-[4.6rem] md:text-[7rem] lg:text-[9.6rem] xl:text-[11rem]">
                Tele-
                <br />
                neuro-
                <br className="sm:hidden" />
                physiology
                <br />
                reporting network
              </h1>

              <div className="mt-12 grid max-w-5xl gap-8 border-t border-[#1F2F35]/10 pt-8 md:grid-cols-12">
                <p className="text-[19px] font-light leading-[1.75] text-[#4F5E64] md:col-span-7 md:text-[22px]">
                  A multicenter digital infrastructure enabling remote
                  neurophysiology reporting, workload redistribution and
                  continuity of specialist diagnostic activity across Italy.
                </p>
                <div className="md:col-span-4 md:col-start-9">
                  <p className="text-[12px] uppercase leading-loose tracking-[0.22em] text-[#7A8E95]">
                    Remote examinations
                  </p>
                  <p className="mt-3 font-serif text-[44px] leading-none tracking-normal text-[#1F2F35]">
                    1,048
                  </p>
                  <p className="mt-6 text-[12px] uppercase leading-loose tracking-[0.22em] text-[#7A8E95]">
                    Study period
                  </p>
                  <p className="mt-3 font-serif text-[32px] leading-none tracking-normal text-[#1F2F35]">
                    2018-2025
                  </p>
                </div>
              </div>

              <div className="mt-10 max-w-5xl border-t border-[#1F2F35]/10 pt-6">
                <p className="text-[12px] uppercase leading-relaxed tracking-[0.22em] text-[#7A8E95]">
                  Implementation of a tele-neurophysiology reporting network:
                  our experience at ICS Maugeri
                </p>
                <p className="mt-5 max-w-4xl text-sm leading-[1.8] text-[#4F5E64] md:text-base">
                  C Fundarò, C Zaffina, E Berra, P Chimento, MR Argentieri,
                  F. Zani, F Montenegro, AM Saltalamacchia, C Delconte,
                  R Bagnasco, M Canti, M Buonocore
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1.2,
            delay: 0.45,
          }}
          className="grid gap-4 border-t border-[#1F2F35]/10 pt-5 text-[11px] uppercase leading-relaxed tracking-[0.22em] text-[#7A8E95] md:grid-cols-3"
        >
          <span>Remote reporting</span>
          <span>Multicenter workload redistribution</span>
          <span className="md:text-right">Italy network</span>
        </motion.div>
      </Container>
    </section>
  );
}
