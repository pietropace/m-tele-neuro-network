"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type MapNode = {
  name: string;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  anchor: "start" | "end";
};

const nodes: MapNode[] = [
  {
    name: "Milano",
    x: 314,
    y: 174,
    labelX: -18,
    labelY: -18,
    anchor: "end",
  },
  {
    name: "Veruno",
    x: 264,
    y: 158,
    labelX: 22,
    labelY: -18,
    anchor: "start",
  },
  {
    name: "Pavia",
    x: 300,
    y: 197,
    labelX: -18,
    labelY: 22,
    anchor: "end",
  },
  {
    name: "Montescano",
    x: 307,
    y: 209,
    labelX: 22,
    labelY: 22,
    anchor: "start",
  },
  {
    name: "Telese",
    x: 607,
    y: 507,
    labelX: -18,
    labelY: 8,
    anchor: "end",
  },
  {
    name: "Bari",
    x: 753,
    y: 517,
    labelX: 24,
    labelY: 8,
    anchor: "start",
  },
];

const hub = nodes.find((node) => node.name === "Pavia") ?? nodes[0];

export default function ItalyNetworkMap() {
  return (
    <div className="relative mx-auto w-full max-w-[720px] aspect-square">
      <motion.div
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 0.16,
        }}
        viewport={{
          once: true,
          margin: "-12%",
        }}
        transition={{
          duration: 1.8,
        }}
        className="absolute inset-0"
      >
        <Image
          src="/it.svg"
          alt="Italy"
          fill
          sizes="(min-width: 1024px) 50vw, 92vw"
          className="object-contain saturate-0"
        />
      </motion.div>

      <svg
        viewBox="0 0 1000 1000"
        className="absolute inset-0 h-full w-full"
        aria-label="ICS Maugeri tele-neurophysiology sites in Italy"
        role="img"
      >
        {nodes
          .filter((node) => node.name !== hub.name)
          .map((node, index) => (
            <motion.line
              key={node.name}
              x1={hub.x}
              y1={hub.y}
              x2={node.x}
              y2={node.y}
              stroke="#2C5D6B"
              strokeOpacity="0.1"
              strokeWidth="1"
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
                margin: "-12%",
              }}
              transition={{
                duration: 1.4,
                delay: index * 0.06,
              }}
            />
          ))}

        {nodes.map((node, index) => (
          <motion.g
            key={node.name}
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
              margin: "-12%",
            }}
            transition={{
              duration: 0.7,
              delay: 0.2 + index * 0.05,
            }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={node.name === hub.name ? 6 : 4.5}
              fill="#1F2F35"
            />

            <circle
              cx={node.x}
              cy={node.y}
              r={node.name === hub.name ? 13 : 10}
              fill="none"
              stroke="#2C5D6B"
              strokeOpacity="0.18"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />

            <text
              x={node.x + node.labelX}
              y={node.y + node.labelY}
              textAnchor={node.anchor}
              fontSize="17"
              fill="#4F5E64"
              letterSpacing="0.06em"
            >
              {node.name}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
