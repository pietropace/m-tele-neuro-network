"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroNetwork() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 24,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute right-[-12vw] top-[10vh] h-[82vh] w-[58vw] max-w-[820px] opacity-100 md:right-[2vw] lg:right-[7vw] lg:top-[7vh] lg:h-[88vh]"
      >
        <Image
          src="/it.svg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 58vw, 88vw"
          className="object-contain opacity-[0.045] saturate-0"
        />
      </motion.div>
    </div>
  );
}
