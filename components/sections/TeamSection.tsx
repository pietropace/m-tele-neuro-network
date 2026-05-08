"use client";

import Image from "next/image";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";
import SectionLabel from "../ui/SectionLabel";

const teams = [
  {
    title: "Clinical leadership",
    location: "Neurophysiology laboratory",
    src: "/team/clinical-leadership.jpg",
    alt: "Clinical neurophysiology team lead in the laboratory",
    className: "aspect-[4/5]",
  },
  {
    title: "Pavia team",
    location: "ICS Maugeri Pavia",
    src: "/team/pavia-team.jpg",
    alt: "Pavia neurophysiology team at ICS Maugeri",
    className: "aspect-[4/3]",
  },
  {
    title: "Montescano team",
    location: "ICS Maugeri Montescano",
    src: "/team/montescano-team.jpg",
    alt: "Montescano neurophysiology team at ICS Maugeri",
    className: "aspect-[4/3]",
  },
];

export default function TeamSection() {
  return (
    <section className="bg-[#F5F7F8] py-16 md:py-32 lg:py-40">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <FadeIn className="lg:col-span-4">
            <SectionLabel>Clinical Teams</SectionLabel>
            <h2 className="font-serif text-[2.55rem] leading-[0.98] tracking-normal text-[#1F2F35] min-[380px]:text-[2.85rem] md:text-[5rem]">
              The network is sustained by clinical presence.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <p className="border-t border-[#1F2F35]/10 pt-6 text-[18px] font-light leading-[1.72] text-[#4F5E64] md:pt-8 md:text-[23px] md:leading-[1.8]">
              Tele-reporting is not an abstraction: it is an organizational
              model built around clinicians, technicians and local teams who
              preserve the quality of neurophysiology across sites.
            </p>
          </FadeIn>
        </div>

        <div className="mt-12 grid gap-8 md:mt-20 lg:grid-cols-12 lg:gap-8">
          <FadeIn className="lg:col-span-5">
            <figure>
              <div
                className={`${teams[0].className} relative overflow-hidden bg-[#D9E5E8]`}
              >
                <Image
                  src={teams[0].src}
                  alt={teams[0].alt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-5 border-t border-[#1F2F35]/10 pt-4">
                <p className="font-serif text-[2rem] leading-none text-[#1F2F35]">
                  {teams[0].title}
                </p>
                <p className="mt-3 text-[10px] uppercase leading-relaxed tracking-[0.18em] text-[#7A8E95] md:text-[11px]">
                  {teams[0].location}
                </p>
              </figcaption>
            </figure>
          </FadeIn>

          <div className="grid gap-8 lg:col-span-7 lg:self-end">
            {teams.slice(1).map((team, index) => (
              <FadeIn key={team.title} delay={0.12 + index * 0.08}>
                <figure className="grid gap-5 md:grid-cols-[1.35fr_1fr] md:items-end md:gap-8">
                  <div
                    className={`${team.className} relative overflow-hidden bg-[#D9E5E8]`}
                  >
                    <Image
                      src={team.src}
                      alt={team.alt}
                      fill
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-[#1F2F35]/10 pt-4">
                    <p className="font-serif text-[2rem] leading-none text-[#1F2F35]">
                      {team.title}
                    </p>
                    <p className="mt-3 text-[10px] uppercase leading-relaxed tracking-[0.18em] text-[#7A8E95] md:text-[11px]">
                      {team.location}
                    </p>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
