"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";
import SectionLabel from "../ui/SectionLabel";

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
      className="h-12 w-12 text-[#2C5D6B]"
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
    <svg viewBox="0 0 180 110" className="h-32 w-full" aria-hidden="true">
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
      <section className="bg-[#F5F7F8] py-24 md:py-32 lg:py-44">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
            <FadeIn className="lg:col-span-5">
              <SectionLabel>Clinical Need</SectionLabel>
              <h2 className="max-w-4xl font-serif text-[3.05rem] leading-[0.94] tracking-normal text-[#1F2F35] sm:text-[3.6rem] md:text-[5.6rem] lg:text-[6.8rem]">
                Timely neurophysiology is crucial in rehabilitation settings.
              </h2>
            </FadeIn>

            <div className="lg:col-span-5 lg:col-start-8 lg:pt-32">
              <FadeIn delay={0.12}>
                <p className="border-t border-[#1F2F35]/10 pt-8 text-[19px] font-light leading-[1.8] text-[#4F5E64] md:text-[23px]">
                  Access to EEG, EMG and evoked potentials can shape diagnostic
                  and prognostic decisions during rehabilitation, where timing
                  often determines the value of specialist interpretation.
                </p>
                <p className="mt-8 text-base leading-[1.9] text-[#4F5E64] md:text-lg">
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

      <section className="bg-white py-24 md:py-32 lg:py-44">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <FadeIn className="lg:col-span-4">
              <SectionLabel>Workflow Infrastructure</SectionLabel>
              <h2 className="font-serif text-[3rem] leading-[0.96] text-[#1F2F35] md:text-[5rem]">
                A shared digital spine for distributed reporting.
              </h2>
            </FadeIn>

            <div className="lg:col-span-7 lg:col-start-6">
              <div className="border-y border-[#1F2F35]/10">
                {workflow.map((item, index) => (
                  <FadeIn
                    key={item.title}
                    delay={index * 0.06}
                    className="grid gap-6 border-b border-[#1F2F35]/10 py-8 last:border-b-0 md:grid-cols-[5rem_1fr] md:gap-8"
                  >
                    <WorkflowIcon path={item.icon} />
                    <div>
                      <h3 className="font-serif text-[2rem] leading-none text-[#1F2F35] md:text-[2.6rem]">
                        {item.title}
                      </h3>
                      <p className="mt-4 max-w-2xl text-base leading-[1.85] text-[#4F5E64] md:text-lg">
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

      <section className="bg-[#F5F7F8] py-24 md:py-32 lg:py-44">
        <Container>
          <FadeIn>
            <SectionLabel>Examinations</SectionLabel>
            <div className="max-w-5xl">
              <h2 className="font-serif text-[3rem] leading-[0.96] text-[#1F2F35] md:text-[5.8rem]">
                Four workflows, one reporting architecture.
              </h2>
              <p className="mt-8 max-w-2xl text-lg font-light leading-[1.85] text-[#4F5E64] md:text-[22px]">
                EEG, ENG/EMG, somatosensory evoked potentials and motor evoked
                potentials are translated into a common digital reporting
                environment.
              </p>
            </div>
          </FadeIn>

          <div className="mt-16 grid gap-px overflow-hidden border-y border-[#1F2F35]/10 bg-[#1F2F35]/10 md:grid-cols-2 lg:mt-24 lg:grid-cols-4">
            {examinations.map((exam, index) => (
              <FadeIn
                key={exam.label}
                delay={index * 0.08}
                className="bg-[#F5F7F8] p-6 md:p-8 lg:p-10"
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

      <section className="relative overflow-hidden bg-white py-24 md:py-36 lg:py-48">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
            <FadeIn className="lg:col-span-7">
              <SectionLabel>Results</SectionLabel>
              <p className="font-serif text-[6rem] leading-[0.78] text-[#1F2F35] sm:text-[7rem] md:text-[13rem] lg:text-[17rem]">
                1,048
              </p>
              <h2 className="mt-8 max-w-3xl font-serif text-[2.75rem] leading-[1] text-[#1F2F35] md:text-[5rem]">
                examinations managed remotely through the network.
              </h2>
            </FadeIn>

            <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <FadeIn delay={0.16}>
                <div className="border-y border-[#1F2F35]/10 py-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="font-serif text-[4rem] leading-none text-[#1F2F35]">
                        8
                      </p>
                      <p className="mt-3 text-[11px] uppercase leading-relaxed tracking-[0.22em] text-[#7A8E95]">
                        Years
                      </p>
                    </div>
                    <div>
                      <p className="font-serif text-[4rem] leading-none text-[#1F2F35]">
                        6
                      </p>
                      <p className="mt-3 text-[11px] uppercase leading-relaxed tracking-[0.22em] text-[#7A8E95]">
                        ICS sites
                      </p>
                    </div>
                  </div>
                  <p className="mt-10 text-base leading-[1.9] text-[#4F5E64] md:text-lg">
                    The network supported continuity of diagnostic activity,
                    flexible workload redistribution and multicenter specialist
                    collaboration.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>

          <FadeIn delay={0.22} className="mt-20 lg:mt-28">
            <div className="relative h-20 border-y border-[#D9E5E8] md:h-28">
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

      <section className="bg-[#F5F7F8] py-24 md:py-32 lg:py-44">
        <Container>
          <FadeIn>
            <SectionLabel>Timeline</SectionLabel>
            <h2 className="max-w-5xl font-serif text-[3rem] leading-[0.96] text-[#1F2F35] md:text-[6rem]">
              2018-2025: from foundation to consolidated multicenter activity.
            </h2>
          </FadeIn>

          <div className="relative mt-16 border-l border-[#1F2F35]/10 pl-8 md:mt-24 md:pl-12 lg:ml-[33%]">
            {timeline.map((item, index) => (
              <FadeIn
                key={item.year}
                delay={index * 0.08}
                className="relative pb-16 last:pb-0 md:pb-24"
              >
                <span className="absolute -left-[2.19rem] top-2 h-3 w-3 rounded-full border border-[#2C5D6B] bg-[#F5F7F8] md:-left-[3.19rem]" />
                <p className="font-serif text-[3.6rem] leading-none text-[#1F2F35] md:text-[5rem]">
                  {item.year}
                </p>
                <h3 className="mt-5 text-[12px] uppercase tracking-[0.24em] text-[#377082]">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-[1.9] text-[#4F5E64] md:text-lg">
                  {item.text}
                </p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="flex min-h-screen items-center bg-[#1F2F35] py-24 text-white md:py-32 lg:py-44">
        <Container>
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#6FA9B8]">
              Conclusions
            </p>
            <h2 className="mt-10 max-w-6xl font-serif text-[2.85rem] leading-[0.94] tracking-normal text-white sm:text-[4rem] md:text-[7rem] lg:text-[9rem]">
              Standard-
              <br className="sm:hidden" />
              ization is the infrastructure of scalable
              neurophysiology.
            </h2>
          </FadeIn>

          <div className="mt-16 grid gap-10 border-t border-white/15 pt-8 md:grid-cols-3 lg:mt-24">
            {[
              "Feasible in a multicenter rehabilitation system.",
              "Improves access to specialist neurophysiology.",
              "Requires procedures, training and clear governance.",
            ].map((item, index) => (
              <FadeIn key={item} delay={index * 0.08}>
                <p className="text-[19px] font-light leading-[1.65] text-[#EAF3F5] md:text-[22px]">
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
