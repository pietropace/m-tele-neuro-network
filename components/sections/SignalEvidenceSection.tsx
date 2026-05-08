"use client";

import Image from "next/image";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";
import SectionLabel from "../ui/SectionLabel";

const sepTraces = [
  {
    src: "/signals/sep-right.png",
    alt: "Somatosensory evoked potentials trace for the right side",
    label: "SEP / right side",
  },
  {
    src: "/signals/sep-left.png",
    alt: "Somatosensory evoked potentials trace for the left side",
    label: "SEP / left side",
  },
];

const engPanels = [
  {
    src: "/signals/eng-values.png",
    alt: "ENG motor conduction values table",
    label: "ENG conduction values",
  },
  {
    src: "/signals/eng-traces.png",
    alt: "ENG motor and inching traces",
    label: "ENG motor traces",
  },
];

export default function SignalEvidenceSection() {
  return (
    <section className="bg-white py-16 md:py-32 lg:py-44">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <FadeIn className="lg:col-span-5">
            <SectionLabel>Signal Evidence</SectionLabel>
            <h2 className="font-serif text-[2.55rem] leading-[0.98] tracking-normal text-[#1F2F35] min-[380px]:text-[2.85rem] md:text-[5.4rem]">
              Clinical traces as the material record of remote reporting.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <p className="border-t border-[#1F2F35]/10 pt-6 text-[18px] font-light leading-[1.72] text-[#4F5E64] md:pt-8 md:text-[23px] md:leading-[1.8]">
              The network operates on concrete neurophysiological material:
              EEG pages, evoked potentials, conduction tables and motor traces
              become shared clinical evidence across sites.
            </p>
          </FadeIn>
        </div>

        <div className="mt-12 space-y-12 md:mt-20 md:space-y-16">
          <FadeIn>
            <figure>
              <div className="relative aspect-[16/9] overflow-hidden border-y border-[#1F2F35]/10 bg-[#F5F7F8] md:aspect-[2.7/1]">
                <Image
                  src="/signals/eeg-trace.png"
                  alt="EEG trace page"
                  fill
                  sizes="100vw"
                  className="object-cover object-left"
                />
              </div>
              <figcaption className="mt-5 grid gap-3 border-t border-[#1F2F35]/10 pt-4 md:grid-cols-12">
                <p className="text-[10px] uppercase leading-relaxed tracking-[0.2em] text-[#377082] md:col-span-3 md:text-[11px]">
                  EEG trace
                </p>
                <p className="max-w-3xl text-sm leading-[1.75] text-[#4F5E64] md:col-span-7 md:text-base">
                  Continuous multi-channel recording becomes a reportable
                  digital object within the shared workflow.
                </p>
              </figcaption>
            </figure>
          </FadeIn>

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <FadeIn>
                <div className="space-y-5">
                  {sepTraces.map((trace, index) => (
                    <figure key={trace.src}>
                      <div className="relative aspect-[2.9/1] overflow-hidden bg-[#1F2F35]">
                        <Image
                          src={trace.src}
                          alt={trace.alt}
                          fill
                          sizes="(min-width: 1024px) 38vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="mt-3 text-[10px] uppercase leading-relaxed tracking-[0.18em] text-[#7A8E95]">
                        {trace.label}
                      </figcaption>
                      {index === 0 ? (
                        <div className="mt-5 border-t border-[#1F2F35]/10" />
                      ) : null}
                    </figure>
                  ))}
                </div>
              </FadeIn>
            </div>

            <div className="grid gap-8 lg:col-span-7">
              {engPanels.map((panel, index) => (
                <FadeIn key={panel.src} delay={0.1 + index * 0.08}>
                  <figure>
                    <div className="relative aspect-[2.75/1] overflow-hidden border-y border-[#1F2F35]/10 bg-[#F5F7F8]">
                      <Image
                        src={panel.src}
                        alt={panel.alt}
                        fill
                        sizes="(min-width: 1024px) 54vw, 100vw"
                        className="object-cover object-left"
                      />
                    </div>
                    <figcaption className="mt-3 text-[10px] uppercase leading-relaxed tracking-[0.18em] text-[#7A8E95]">
                      {panel.label}
                    </figcaption>
                  </figure>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
