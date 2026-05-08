"use client";

import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import ItalyNetworkMap from "./ItalyNetworkMap";
import FadeIn from "../ui/FadeIn";

export default function NetworkSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32 lg:py-40">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-24 lg:items-center">
          <div className="lg:col-span-5">
            <FadeIn>
              <SectionLabel>
                Multicenter Infrastructure
              </SectionLabel>

              <h2 className="font-serif text-[3rem] leading-[0.95] tracking-normal text-[#1F2F35] md:text-[5rem]">
                A coordinated neurophysiology network across Italy
              </h2>

              <p className="mt-10 max-w-xl text-lg leading-[1.9] text-[#4F5E64]">
                The tele-neurophysiology infrastructure connects multiple
                ICS Maugeri centers through a shared reporting workflow,
                enabling specialist collaboration, workload redistribution
                and continuity of diagnostic activity.
              </p>

              <p className="mt-8 max-w-xl text-[12px] uppercase leading-loose tracking-[0.2em] text-[#7A8E95]">
                Montescano / Pavia / Milano / Bari / Telese / Veruno
              </p>

              <div className="mt-16 grid grid-cols-2 gap-y-8">
                <div>
                  <div className="text-[12px] uppercase tracking-[0.24em] text-[#7A8E95]">
                    Active sites
                  </div>

                  <div className="mt-2 font-serif text-[48px] leading-none tracking-normal text-[#1F2F35]">
                    6
                  </div>
                </div>

                <div>
                  <div className="text-[12px] uppercase tracking-[0.24em] text-[#7A8E95]">
                    Regions
                  </div>

                  <div className="mt-2 font-serif text-[48px] leading-none tracking-normal text-[#1F2F35]">
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
