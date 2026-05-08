"use client";

import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import ItalyNetworkMap from "./ItalyNetworkMap";
import FadeIn from "../ui/FadeIn";

export default function NetworkSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-32 lg:py-40">
      <Container>
        <div className="grid gap-12 md:gap-16 lg:grid-cols-12 lg:gap-24 lg:items-center">
          <div className="lg:col-span-5">
            <FadeIn>
              <SectionLabel>
                Multicenter Infrastructure
              </SectionLabel>

              <h2 className="font-serif text-[2.55rem] leading-[0.98] tracking-normal text-[#1F2F35] min-[380px]:text-[2.85rem] md:text-[5rem]">
                A coordinated neurophysiology network across Italy
              </h2>

              <p className="mt-7 max-w-xl text-[17px] leading-[1.8] text-[#4F5E64] md:mt-10 md:text-lg md:leading-[1.9]">
                The tele-neurophysiology infrastructure connects multiple
                ICS Maugeri centers through a shared reporting workflow,
                enabling specialist collaboration, workload redistribution
                and continuity of diagnostic activity.
              </p>

              <p className="mt-6 max-w-xl text-[10px] uppercase leading-loose tracking-[0.16em] text-[#7A8E95] md:mt-8 md:text-[12px] md:tracking-[0.2em]">
                Veruno / Milano / Pavia / Montescano / Telese / Bari
              </p>

              <div className="mt-10 grid grid-cols-2 gap-y-8 md:mt-16">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#7A8E95] md:text-[12px] md:tracking-[0.24em]">
                    Active sites
                  </div>

                  <div className="mt-2 font-serif text-[42px] leading-none tracking-normal text-[#1F2F35] md:text-[48px]">
                    6
                  </div>
                </div>

                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#7A8E95] md:text-[12px] md:tracking-[0.24em]">
                    Regions
                  </div>

                  <div className="mt-2 font-serif text-[42px] leading-none tracking-normal text-[#1F2F35] md:text-[48px]">
                    4
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7">
            <FadeIn delay={0.2}>
              <ItalyNetworkMap />
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
