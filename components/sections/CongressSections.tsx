"use client";

import { motion } from "framer-motion";
import ActivityExplorerSection from "./ActivityExplorerSection";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";
import SectionLabel from "../ui/SectionLabel";
import SignalEvidenceSection from "./SignalEvidenceSection";

const workflow = [
  {
    title: "Remote review",
    text: "Specialists access examinations from distributed rehabilitation sites through a shared digital infrastructure.",
    icon: "M16 48h32M20 32h24M26 18h12",
  },
  {
    title: "Centralized reporting",
    text: "Interpretation and reporting are organized around a common workflow, reducing dependence on local specialist availability.",
    icon: "M18 18h28v28H18zM24 28h16M24 36h10",
  },
  {
    title: "Digital archiving",
    text: "Reports and traces are preserved in a structured archive for continuity, retrieval and multicenter consultation.",
    icon: "M17 24h30v24H17zM21 18h22l4 6H17zM25 34h14",
  },
  {
    title: "Digital signature",
    text: "Validated reports are completed through a signed digital process, supporting governance across the network.",
    icon: "M17 46c10-14 14-24 21-24 6 0 7 7 1 10-5 3-8-1-4-5 5-7 16-6 14 12",
  },
];

const examinations = [
  {
    label: "EEG",
    title: "Cortical rhythms",
    path: "M0 52 C20 48 26 24 42 24 C58 24 58 78 75 78 C92 78 91 32 108 32 C126 32 128 62 144 58 C160 54 162 43 180 43",
  },
  {
    label: "ENG/EMG",
    title: "Peripheral conduction",
    path: "M0 58 L34 58 L40 22 L47 88 L54 37 L62 58 L98 58 L104 30 L111 78 L118 47 L126 58 L180 58",
  },
  {
    label: "SEP",
    title: "Sensory pathways",
    path: "M0 64 C24 64 28 62 42 58 C54 54 55 36 68 34 C82 32 86 72 100 72 C116 72 118 49 132 48 C149 47 154 56 180 56",
  },
  {
    label: "MEP",
    title: "Motor pathways",
    path: "M0 62 C22 62 31 62 42 61 C50 60 52 20 60 20 C69 20 69 88 78 88 C87 88 89 40 99 40 C112 40 113 62 128 62 L180 62",
  },
];

const timeline = [
  {
    year: "2018",
    title: "Network foundation",
    text: "The first operational model for remote neurophysiology reporting is established within ICS Maugeri.",
  },
  {
    year: "2020",
    title: "Workflow standardization",
    text: "Shared procedures, reporting criteria and digital archiving practices become part of the network routine.",
  },
  {
    year: "2022",
    title: "Remote reporting expands",
    text: "The model supports broader specialist collaboration across multiple rehabilitation sites.",
  },
  {
    year: "2025",
    title: "Consolidated activity",
    text: "The network reaches a mature multicenter configuration, enabling continuity and workload redistribution.",
  },
];

function WorkflowIcon({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-10 w-10 text-[#2C5D6B] md:h-12 md:w-12"
      aria-hidden="true"
    >
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Waveform({ path, delay }: { path: string; delay: number }) {
  return (
    <svg viewBox="0 0 180 110" className="h-24 w-full md:h-32" aria-hidden="true">
      <path
        d="M0 56H180"
        stroke="#D9E5E8"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <motion.path
        d={path}
        fill="none"
        stroke="#2C5D6B"
        strokeWidth="1.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{
          pathLength: 0,
          opacity: 0,
        }}
        whileInView={{
          pathLength: 1,
          opacity: 1,
        }}
        viewport={{
          once: true,
          margin: "-20%",
        }}
        transition={{
          duration: 2.4,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </svg>
  );
}

export default function CongressSections() {
  return (
    <>
      <section className="bg-[#F5F7F8] py-16 md:py-32 lg:py-44">
        <Container>
          <div className="grid gap-10 md:gap-16 lg:grid-cols-12 lg:gap-10">
            <FadeIn className="lg:col-span-5">
              <SectionLabel>Clinical Need</SectionLabel>
              <h2 className="max-w-4xl font-serif text-[2.55rem] leading-[0.98] tracking-normal text-[#1F2F35] min-[380px]:text-[2.85rem] sm:text-[3.6rem] md:text-[5.6rem] lg:text-[6.8rem]">
                Timely neurophysiology is crucial in rehabilitation settings.
              </h2>
            </FadeIn>

            <div className="lg:col-span-5 lg:col-start-8 lg:pt-32">
              <FadeIn delay={0.12}>
                <p className="border-t border-[#1F2F35]/10 pt-6 text-[18px] font-light leading-[1.72] text-[#4F5E64] md:pt-8 md:text-[23px] md:leading-[1.8]">
                  Access to EEG, EMG and evoked potentials can shape diagnostic
                  and prognostic decisions during rehabilitation, where timing
                  often determines the value of specialist interpretation.
                </p>
                <p className="mt-6 text-base leading-[1.82] text-[#4F5E64] md:mt-8 md:text-lg md:leading-[1.9]">
                  In Italy, clinical neurophysiology remains concentrated
                  within neurology-based training. A structured tele-reporting
                  model helps distribute expertise without diluting specialist
                  governance.
                </p>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-32 lg:py-44">
        <Container>
          <div className="grid gap-10 md:gap-14 lg:grid-cols-12 lg:gap-10">
            <FadeIn className="lg:col-span-4">
              <SectionLabel>Workflow Infrastructure</SectionLabel>
              <h2 className="font-serif text-[2.55rem] leading-[0.98] text-[#1F2F35] min-[380px]:text-[2.85rem] md:text-[5rem]">
                A shared digital spine for distributed reporting.
              </h2>
            </FadeIn>

            <div className="lg:col-span-7 lg:col-start-6">
              <div className="border-y border-[#1F2F35]/10">
                {workflow.map((item, index) => (
                  <FadeIn
                    key={item.title}
                    delay={index * 0.06}
                    className="grid gap-5 border-b border-[#1F2F35]/10 py-6 last:border-b-0 md:grid-cols-[5rem_1fr] md:gap-8 md:py-8"
                  >
                    <WorkflowIcon path={item.icon} />
                    <div>
                      <h3 className="font-serif text-[1.9rem] leading-none text-[#1F2F35] md:text-[2.6rem]">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-base leading-[1.75] text-[#4F5E64] md:mt-4 md:text-lg md:leading-[1.85]">
                        {item.text}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#F5F7F8] py-16 md:py-32 lg:py-44">
        <Container>
          <FadeIn>
            <SectionLabel>Examinations</SectionLabel>
            <div className="max-w-5xl">
              <h2 className="font-serif text-[2.55rem] leading-[0.98] text-[#1F2F35] min-[380px]:text-[2.85rem] md:text-[5.8rem]">
                Four workflows, one reporting architecture.
              </h2>
              <p className="mt-6 max-w-2xl text-[17px] font-light leading-[1.75] text-[#4F5E64] md:mt-8 md:text-[22px] md:leading-[1.85]">
                EEG, ENG/EMG, somatosensory evoked potentials and motor evoked
                potentials are translated into a common digital reporting
                environment.
              </p>
            </div>
          </FadeIn>

          <div className="mt-10 grid gap-px overflow-hidden border-y border-[#1F2F35]/10 bg-[#1F2F35]/10 md:mt-16 md:grid-cols-2 lg:mt-24 lg:grid-cols-4">
            {examinations.map((exam, index) => (
              <FadeIn
                key={exam.label}
                delay={index * 0.08}
                className="bg-[#F5F7F8] p-5 md:p-8 lg:p-10"
              >
                <div className="flex items-baseline justify-between gap-6">
                  <span className="text-[12px] uppercase tracking-[0.24em] text-[#377082]">
                    {exam.label}
                  </span>
                  <span className="font-serif text-3xl text-[#1F2F35]">
                    0{index + 1}
                  </span>
                </div>
                <Waveform path={exam.path} delay={index * 0.14} />
                <h3 className="mt-4 font-serif text-[2rem] leading-none text-[#1F2F35]">
                  {exam.title}
                </h3>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <SignalEvidenceSection />

      <section className="relative overflow-hidden bg-white py-16 md:py-36 lg:py-48">
        <Container>
          <div className="grid gap-10 md:gap-16 lg:grid-cols-12 lg:gap-10">
            <FadeIn className="lg:col-span-7">
              <SectionLabel>Results</SectionLabel>
              <p className="font-serif text-[5.25rem] leading-[0.82] text-[#1F2F35] min-[380px]:text-[6rem] sm:text-[7rem] md:text-[13rem] lg:text-[17rem]">
                1,048
              </p>
              <h2 className="mt-6 max-w-3xl font-serif text-[2.35rem] leading-[1.02] text-[#1F2F35] min-[380px]:text-[2.65rem] md:mt-8 md:text-[5rem]">
                examinations managed remotely through the network.
              </h2>
            </FadeIn>

            <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <FadeIn delay={0.16}>
                <div className="border-y border-[#1F2F35]/10 py-6 md:py-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="font-serif text-[3.4rem] leading-none text-[#1F2F35] md:text-[4rem]">
                        8
                      </p>
                      <p className="mt-3 text-[11px] uppercase leading-relaxed tracking-[0.22em] text-[#7A8E95]">
                        Years
                      </p>
                    </div>
                    <div>
                      <p className="font-serif text-[3.4rem] leading-none text-[#1F2F35] md:text-[4rem]">
                        6
                      </p>
                      <p className="mt-3 text-[11px] uppercase leading-relaxed tracking-[0.22em] text-[#7A8E95]">
                        ICS sites
                      </p>
                    </div>
                  </div>
                  <p className="mt-8 text-base leading-[1.8] text-[#4F5E64] md:mt-10 md:text-lg md:leading-[1.9]">
                    The network supported continuity of diagnostic activity,
                    flexible workload redistribution and multicenter specialist
                    collaboration.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>

          <FadeIn delay={0.22} className="mt-12 md:mt-20 lg:mt-28">
            <div className="relative h-16 border-y border-[#D9E5E8] md:h-28">
              <div className="absolute left-0 top-1/2 h-px w-full bg-[#D9E5E8]" />
              <motion.div
                className="absolute left-0 top-1/2 h-px bg-[#2C5D6B]"
                initial={{
                  width: "0%",
                }}
                whileInView={{
                  width: "100%",
                }}
                viewport={{
                  once: true,
                  margin: "-20%",
                }}
                transition={{
                  duration: 2.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              <div className="absolute left-0 top-6 text-[11px] uppercase tracking-[0.22em] text-[#7A8E95]">
                2018
              </div>
              <div className="absolute right-0 top-6 text-[11px] uppercase tracking-[0.22em] text-[#7A8E95]">
                2025
              </div>
              <div className="absolute bottom-5 left-[34%] h-3 w-px bg-[#2C5D6B]" />
              <div className="absolute bottom-5 left-[68%] h-3 w-px bg-[#2C5D6B]" />
            </div>
          </FadeIn>
        </Container>
      </section>

      <ActivityExplorerSection />

      <section className="bg-[#F5F7F8] py-16 md:py-32 lg:py-44">
        <Container>
          <FadeIn>
            <SectionLabel>Timeline</SectionLabel>
            <h2 className="max-w-5xl font-serif text-[2.5rem] leading-[0.99] text-[#1F2F35] min-[380px]:text-[2.8rem] md:text-[6rem]">
              2018-2025: from foundation to consolidated multicenter activity.
            </h2>
          </FadeIn>

          <div className="relative mt-12 border-l border-[#1F2F35]/10 pl-7 md:mt-24 md:pl-12 lg:ml-[33%]">
            {timeline.map((item, index) => (
              <FadeIn
                key={item.year}
                delay={index * 0.08}
                className="relative pb-12 last:pb-0 md:pb-24"
              >
                <span className="absolute -left-[1.98rem] top-2 h-3 w-3 rounded-full border border-[#2C5D6B] bg-[#F5F7F8] md:-left-[3.19rem]" />
                <p className="font-serif text-[3.1rem] leading-none text-[#1F2F35] md:text-[5rem]">
                  {item.year}
                </p>
                <h3 className="mt-5 text-[12px] uppercase tracking-[0.24em] text-[#377082]">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-[1.8] text-[#4F5E64] md:mt-5 md:text-lg md:leading-[1.9]">
                  {item.text}
                </p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="flex min-h-[100svh] items-center bg-[#1F2F35] py-16 text-white md:py-32 lg:py-44">
        <Container>
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#6FA9B8]">
              Conclusions
            </p>
            <h2 className="mt-8 max-w-6xl font-serif text-[2.45rem] leading-[0.98] tracking-normal text-white min-[380px]:text-[2.75rem] sm:text-[4rem] md:mt-10 md:text-[7rem] lg:text-[9rem]">
              Standard-
              <br className="sm:hidden" />
              ization is the infrastructure of scalable
              neurophysiology.
            </h2>
          </FadeIn>

          <div className="mt-10 grid gap-7 border-t border-white/15 pt-7 md:mt-16 md:grid-cols-3 md:gap-10 md:pt-8 lg:mt-24">
            {[
              "Feasible in a multicenter rehabilitation system.",
              "Improves access to specialist neurophysiology.",
              "Requires procedures, training and clear governance.",
            ].map((item, index) => (
              <FadeIn key={item} delay={index * 0.08}>
                <p className="text-[17px] font-light leading-[1.65] text-[#EAF3F5] md:text-[22px]">
                  {item}
                </p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
