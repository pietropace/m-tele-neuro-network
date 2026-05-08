"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "../ui/Container";
import HeroNetwork from "./HeroNetwork";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#F5F7F8]">
      <div className="absolute inset-x-0 top-0 h-px bg-[#1F2F35]/10" />
      <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-[#1F2F35]/10 lg:block lg:left-[6rem]" />
      <HeroNetwork />

      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-between py-6 sm:py-10 md:py-14 lg:py-16">
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
          className="flex items-start justify-between gap-5 border-b border-[#1F2F35]/10 pb-4 md:gap-8 md:pb-5"
        >
          <div className="flex flex-col gap-3 md:gap-4">
            <Image
              src="/maugeri-logo.png"
              alt="ICS Maugeri IRCCS"
              width={425}
              height={161}
              priority
              className="h-auto w-[96px] opacity-80 sm:w-[116px] md:w-[148px]"
            />
            <span className="text-[10px] uppercase leading-relaxed tracking-[0.22em] text-[#7A8E95] md:text-[11px] md:tracking-[0.28em]">
              ICS Maugeri IRCCS
            </span>
          </div>
          <span className="text-right text-[10px] uppercase leading-relaxed tracking-[0.22em] text-[#7A8E95] md:text-[11px] md:tracking-[0.28em]">
            SINC 2026
          </span>
        </motion.div>

        <div className="grid min-w-0 flex-1 items-center gap-10 py-10 sm:py-14 md:py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
          <div className="min-w-0 lg:col-span-11">
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
              <h1 className="max-w-[1180px] break-words text-balance font-serif text-[2.92rem] leading-[0.9] tracking-normal text-[#1F2F35] min-[380px]:text-[3.25rem] sm:text-[4.6rem] md:text-[7rem] lg:text-[9.6rem] xl:text-[11rem]">
                Tele-
                <br />
                neuro-
                <br className="sm:hidden" />
                physiology
                <br />
                reporting
                <br className="sm:hidden" />
                network
              </h1>

              <div className="mt-8 grid min-w-0 max-w-5xl gap-7 border-t border-[#1F2F35]/10 pt-6 md:mt-12 md:grid-cols-12 md:gap-8 md:pt-8">
                <p className="max-w-full text-[17px] font-light leading-[1.7] text-[#4F5E64] md:col-span-7 md:text-[22px] md:leading-[1.75]">
                  A multicenter digital infrastructure enabling remote
                  neurophysiology reporting, workload redistribution and
                  continuity of specialist diagnostic activity across Italy.
                </p>
                <div className="grid grid-cols-2 gap-6 md:col-span-4 md:col-start-9 md:block">
                  <div>
                    <p className="text-[12px] uppercase leading-loose tracking-[0.22em] text-[#7A8E95]">
                      Remote examinations
                    </p>
                    <p className="mt-2 font-serif text-[38px] leading-none tracking-normal text-[#1F2F35] md:mt-3 md:text-[44px]">
                      1,048
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px] uppercase leading-loose tracking-[0.22em] text-[#7A8E95] md:mt-6">
                      Study period
                    </p>
                    <p className="mt-2 font-serif text-[28px] leading-none tracking-normal text-[#1F2F35] md:mt-3 md:text-[32px]">
                      2018-2025
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 max-w-5xl border-t border-[#1F2F35]/10 pt-5 md:mt-10 md:pt-6">
                <p className="text-[10px] uppercase leading-relaxed tracking-[0.16em] text-[#7A8E95] md:text-[12px] md:tracking-[0.22em]">
                  <span className="md:hidden">
                    Tele-neurophysiology reporting network / ICS Maugeri
                  </span>
                  <span className="hidden md:inline">
                    Implementation of a tele-neurophysiology reporting network:
                    our experience at ICS Maugeri
                  </span>
                </p>
                <p className="mt-5 hidden max-w-4xl text-sm leading-[1.8] text-[#4F5E64] md:block md:text-base">
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
          className="grid grid-cols-2 gap-4 border-t border-[#1F2F35]/10 pt-4 text-[10px] uppercase leading-relaxed tracking-[0.18em] text-[#7A8E95] md:grid-cols-3 md:pt-5 md:text-[11px] md:tracking-[0.22em]"
        >
          <span>Remote reporting</span>
          <span className="hidden md:block">
            Multicenter workload redistribution
          </span>
          <span className="md:text-right">Italy network</span>
        </motion.div>
      </Container>
    </section>
  );
}
