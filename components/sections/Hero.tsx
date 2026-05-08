"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F5F7F8]">
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/neural-network.svg')" }} />

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
            <div className="mb-12">
              <span className="uppercase tracking-[0.38em] text-[11px] text-[#7A8E95]">
                ICS Maugeri IRCCS - ISTITUTI CLINICI SCIENTIFICI · SINC 2026
              </span>
            </div>

            <h1 className="font-serif text-[#1F2F35] leading-[0.84] tracking-[-0.07em] text-balance text-[5rem] md:text-[8rem] lg:text-[10rem] max-w-[1200px]">
              Tele-neurophysiology reporting network
            </h1>

            <div className="mt-14 grid lg:grid-cols-12 gap-16 items-end">
              <div className="lg:col-span-7">
                <p className="text-[#4F5E64] text-lg md:text-[23px] leading-[1.9] font-light max-w-2xl">
                  A multicenter clinical infrastructure enabling remote
                  neurophysiology reporting, continuity of specialist
                  activity and workload redistribution across Italy.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="grid grid-cols-2 gap-6">
                  <div className="thin-border bg-white/60 p-8">
                    <div className="text-[11px] uppercase tracking-[0.24em] text-[#7A8E95]">
                      Remote examinations
                    </div>

                    <div className="mt-4 text-[72px] leading-none tracking-[-0.06em] font-light text-[#1F2F35]">
                      1048
                    </div>
                  </div>

                  <div className="thin-border bg-white/60 p-8">
                    <div className="text-[11px] uppercase tracking-[0.24em] text-[#7A8E95]">
                      Study period
                    </div>

                    <div className="mt-4 text-[42px] leading-none tracking-[-0.05em] font-light text-[#1F2F35]">
                      2018→2025
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