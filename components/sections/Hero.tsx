"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "../ui/Container";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-start overflow-hidden bg-[#F5F7F8] py-8 md:py-14 lg:py-20">
      <div className="absolute inset-0 bg-cover bg-[position:68%_center] opacity-45 md:bg-right" style={{ backgroundImage: "url('/hero_home.png')" }} />

      <Container className="relative z-10">
        <div className="max-w-[1400px]">
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
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
            <div className="mb-12 flex flex-col gap-6 md:mb-16 md:gap-8">
              <div className="flex items-start justify-between gap-8">
                <div className="inline-flex items-start gap-4 md:gap-6">
                  <div className="flex h-20 w-20 items-center justify-center md:h-28 md:w-28">
                    <Image
                      src="/maugeri_official.png"
                      alt="ICS Maugeri official symbol"
                      width={170}
                      height={77}
                      priority
                      className="h-14 w-auto object-contain md:h-20"
                    />
                  </div>

                  <span className="pt-1 font-sans leading-[0.92] tracking-[-0.008em] text-[#2C5D6B] md:pt-2">
                    <span className="block text-[1.26rem] md:text-[2.35rem]">Istituti</span>
                    <span className="block text-[1.26rem] md:text-[2.35rem]">Clinici</span>
                    <span className="block text-[1.26rem] md:text-[2.35rem]">Scientifici</span>
                  </span>
                </div>

                <span className="hidden pt-4 text-right text-[11px] uppercase tracking-[0.38em] text-[#377082] md:block">
                  Tele-neurophysiology Network
                </span>
              </div>

              <span className="text-[10px] uppercase tracking-[0.28em] text-[#377082] md:hidden">
                Tele-neurophysiology Network
              </span>
            </div>

            <h1 className="max-w-[980px] font-serif text-[3.1rem] leading-[0.9] tracking-[-0.035em] min-[380px]:text-[3.6rem] md:text-[6.2rem] lg:text-[8.1rem]">
              <span className="text-[#1F2F35]">Tele-neurophysiology</span>
              <br />
              <span className="text-[#2C5D6B]">reporting network</span>
            </h1>

            <div className="mt-10 grid items-end gap-10 md:mt-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <p className="max-w-2xl text-[1.1rem] font-light leading-[1.8] text-[#4F5E64] md:text-[1.45rem] md:leading-[1.9]">
                  A multicenter clinical infrastructure enabling remote
                  neurophysiology reporting, continuity of specialist
                  activity and workload redistribution across Italy.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
                  <div className="thin-border bg-white/65 p-5 sm:p-6 lg:p-8">
                    <div className="text-[10px] uppercase tracking-[0.24em] text-[#7A8E95]">
                      Remote examinations
                    </div>

                    <div className="mt-3 text-[3.45rem] font-light leading-none tracking-[-0.05em] text-[#1F2F35] sm:mt-4 sm:text-[4rem] md:text-[4.35rem]">
                      1264
                    </div>
                  </div>

                  <div className="thin-border bg-white/65 p-5 sm:p-6 lg:p-8">
                    <div className="text-[10px] uppercase tracking-[0.24em] text-[#7A8E95]">
                      Study period
                    </div>

                    <div className="mt-3 text-[2.15rem] font-light leading-none tracking-[-0.04em] text-[#1F2F35] sm:mt-4 sm:text-[2.45rem] md:text-[2.6rem]">
                      2020→2026
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}