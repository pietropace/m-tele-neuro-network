"use client";

import { motion } from "framer-motion";

type MapNode = {
  id: string;
  name: string;
  x: number;
  y: number;
  labelDesktopX: number;
  labelDesktopY: number;
  anchorDesktop: "start" | "end";
};

const nodes: MapNode[] = [
  {
    id: "02",
    name: "Milano",
    x: 272,
    y: 178,
    labelDesktopX: 56,
    labelDesktopY: 17,
    anchorDesktop: "start",
  },
  {
    id: "01",
    name: "Veruno",
    x: 323,
    y: 206,
    labelDesktopX: -22,
    labelDesktopY: -32,
    anchorDesktop: "end",
  },
  {
    id: "03",
    name: "Pavia",
    x: 306,
    y: 226,
    labelDesktopX: -17,
    labelDesktopY: 7,
    anchorDesktop: "end",
  },
  {
    id: "04",
    name: "Montescano",
    x: 320,
    y: 245,
    labelDesktopX: 22,
    labelDesktopY: 24,
    anchorDesktop: "start",
  },
  {
    id: "05",
    name: "Telese",
    x: 607,
    y: 520,
    labelDesktopX: -22,
    labelDesktopY: 10,
    anchorDesktop: "end",
  },
  {
    id: "06",
    name: "Bari",
    x: 746,
    y: 522,
    labelDesktopX: 24,
    labelDesktopY: 8,
    anchorDesktop: "start",
  },
];

const hub = nodes.find((node) => node.name === "Pavia") ?? nodes[0];

export default function ItalyNetworkMap() {
  return (
    <div className="mx-auto w-full max-w-[620px]">
      <div className="relative aspect-square w-full">
        <svg
          viewBox="0 0 1000 1000"
          className="absolute inset-0 h-full w-full"
          aria-label="ICS Maugeri tele-neurophysiology sites in Italy"
          role="img"
        >
          <motion.g
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.17 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 1.6 }}
          >
            <image
              href="/it.svg"
              x="0"
              y="0"
              width="1000"
              height="1000"
              preserveAspectRatio="xMidYMid meet"
            />
          </motion.g>

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
                strokeOpacity="0.12"
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
                x={node.x + node.labelDesktopX}
                y={node.y + node.labelDesktopY}
                textAnchor={node.anchorDesktop}
                className="hidden md:block"
                fontSize="17"
                fill="#4F5E64"
                letterSpacing="0.06em"
              >
                {node.name}
              </text>

              <g className="md:hidden" transform={`translate(${node.x - 9}, ${node.y - 9})`}>
                <rect
                  width="18"
                  height="18"
                  rx="9"
                  fill="#2C5D6B"
                  fillOpacity="0.95"
                />
                <text
                  x="9"
                  y="12"
                  textAnchor="middle"
                  fontSize="8"
                  fontWeight="600"
                  fill="#F5F7F8"
                  letterSpacing="0.02em"
                >
                  {node.id}
                </text>
              </g>
            </motion.g>
          ))}
        </svg>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-[#1F2F35]/10 pt-5 md:hidden">
        {nodes.map((node) => (
          <div
            key={node.name}
            className="flex items-center gap-2 text-[11px] uppercase leading-relaxed tracking-[0.16em] text-[#7A8E95]"
          >
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#2C5D6B] text-[8px] font-semibold tracking-normal text-[#F5F7F8]">
              {node.id}
            </span>
            {node.name}
          </div>
        ))}
      </div>
    </div>
  );
}
