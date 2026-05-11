"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { ReactNode, useRef } from "react";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";

const teams = [
  {
    title: "Clinical leadership",
    location: "Neurophysiology laboratory",
    src: "/team/clinical-leadership.jpg",
    alt: "Clinical neurophysiology team lead in the laboratory",
    aspect: "aspect-[4/5]",
    sizes: "(min-width: 1024px) 34vw, 100vw",
  },
  {
    title: "Pavia team",
    location: "ICS Maugeri Pavia",
    src: "/team/pavia-team.jpg",
    alt: "Pavia neurophysiology team at ICS Maugeri",
    aspect: "aspect-[4/3]",
    sizes: "(min-width: 1024px) 42vw, 100vw",
  },
  {
    title: "Montescano team",
    location: "ICS Maugeri Montescano",
    src: "/team/montescano-team.jpg",
    alt: "Montescano neurophysiology team at ICS Maugeri",
    aspect: "aspect-[4/3]",
    sizes: "(min-width: 1024px) 38vw, 100vw",
  },
];

function RevealBlock({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.05, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ParallaxImage({
  team,
  depth = 1,
  priority = false,
}: {
  team: (typeof teams)[number];
  depth?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.45,
  });
  const y = useTransform(smoothProgress, [0, 1], prefersReducedMotion ? [0, 0] : [28 * depth, -34 * depth]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], prefersReducedMotion ? [1, 1, 1] : [1.045, 1.015, 1.055]);
  const captionY = useTransform(smoothProgress, [0, 1], prefersReducedMotion ? [0, 0] : [16 * depth, -10 * depth]);

  return (
    <figure ref={ref} className="group">
      <div className={`${team.aspect} relative overflow-hidden bg-[#D9E5E8]`}>
        <motion.div
          style={{ y, scale }}
          className="absolute -inset-6 will-change-transform"
        >
          <Image
            src={team.src}
            alt={team.alt}
            fill
            priority={priority}
            sizes={team.sizes}
            className="object-cover"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1F2F35]/18 via-transparent to-white/10" />
      </div>

      <motion.figcaption
        style={{ y: captionY }}
        className="mt-5 border-t border-[#1F2F35]/10 pt-4 will-change-transform"
      >
        <p className="font-serif text-[2rem] leading-none text-[#1F2F35] md:text-[2.45rem]">
          {team.title}
        </p>
        <p className="mt-3 text-[10px] uppercase leading-relaxed tracking-[0.18em] text-[#7A8E95] md:text-[11px]">
          {team.location}
        </p>
      </motion.figcaption>
    </figure>
  );
}

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    mass: 0.5,
  });
  const atmosphereY = useTransform(smoothProgress, [0, 1], prefersReducedMotion ? [0, 0] : [90, -120]);
  const titleY = useTransform(smoothProgress, [0, 1], prefersReducedMotion ? [0, 0] : [24, -42]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F5F7F8] py-20 md:py-36 lg:py-48"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: atmosphereY }}
        className="pointer-events-none absolute right-[-18vw] top-24 h-[36rem] w-[36rem] rounded-full border border-[#2C5D6B]/10 opacity-70 will-change-transform"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: atmosphereY }}
        className="pointer-events-none absolute bottom-20 left-[-10vw] h-[28rem] w-[28rem] rounded-full border border-[#88B7A5]/12 opacity-60 will-change-transform"
      />

      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <RevealBlock className="lg:col-span-5">
            <SectionLabel>Clinical Teams</SectionLabel>
            <motion.h2
              style={{ y: titleY }}
              className="font-serif text-[2.7rem] leading-[0.96] tracking-normal text-[#1F2F35] min-[380px]:text-[3.05rem] md:text-[5.8rem] lg:text-[6.8rem]"
            >
              The network is sustained by clinical presence.
            </motion.h2>
          </RevealBlock>

          <RevealBlock delay={0.12} className="lg:col-span-5 lg:col-start-8 lg:pt-20">
            <p className="border-t border-[#1F2F35]/10 pt-6 text-[18px] font-light leading-[1.72] text-[#4F5E64] md:pt-8 md:text-[23px] md:leading-[1.8]">
              Tele-reporting is not an abstraction: it is an organizational
              model built around clinicians, technicians and local teams who
              preserve the quality of neurophysiology across sites.
            </p>
          </RevealBlock>
        </div>

        <div className="mt-14 grid gap-10 md:mt-24 lg:grid-cols-12 lg:gap-8">
          <RevealBlock delay={0.06} className="lg:col-span-5 lg:pt-14">
            <ParallaxImage team={teams[0]} depth={1.05} priority />
          </RevealBlock>

          <div className="grid gap-10 lg:col-span-7">
            <RevealBlock delay={0.16} className="lg:ml-[12%]">
              <ParallaxImage team={teams[1]} depth={0.75} />
            </RevealBlock>

            <RevealBlock delay={0.22} className="lg:mr-[10%] lg:w-[78%] lg:justify-self-end">
              <ParallaxImage team={teams[2]} depth={0.9} />
            </RevealBlock>
          </div>
        </div>
      </Container>
    </section>
  );
}
