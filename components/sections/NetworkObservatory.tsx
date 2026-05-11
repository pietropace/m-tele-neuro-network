"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Activity, Map, Radio, Signal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { activityMapSites, MAP_VIEWBOX_SIZE } from "./networkMapData";

const years = ["2020", "2021", "2022", "2023", "2024", "2025", "2026"] as const;
const modes = [
  { key: "network", label: "Network", icon: Map },
  { key: "year", label: "Year", icon: Activity },
  { key: "center", label: "Center", icon: Radio },
  { key: "signal", label: "Signal", icon: Signal },
] as const;

type Year = (typeof years)[number];
type Mode = (typeof modes)[number]["key"];
type SiteKey = (typeof activityMapSites)[number]["key"];
type ActivityRow = { year: Year } & Record<SiteKey, number>;

const rows: ActivityRow[] = [
  { year: "2020", nervi: 89, tradate: 9, sciacca: 40, veruno: 5, bari: 0, montescano: 0, pavia: 0, torino: 0, telese: 0 },
  { year: "2021", nervi: 87, tradate: 40, sciacca: 2, veruno: 0, bari: 14, montescano: 4, pavia: 37, torino: 0, telese: 0 },
  { year: "2022", nervi: 44, tradate: 38, sciacca: 0, veruno: 0, bari: 48, montescano: 29, pavia: 22, torino: 20, telese: 0 },
  { year: "2023", nervi: 36, tradate: 58, sciacca: 0, veruno: 0, bari: 54, montescano: 26, pavia: 19, torino: 25, telese: 0 },
  { year: "2024", nervi: 34, tradate: 34, sciacca: 0, veruno: 0, bari: 95, montescano: 6, pavia: 20, torino: 35, telese: 0 },
  { year: "2025", nervi: 43, tradate: 36, sciacca: 0, veruno: 0, bari: 60, montescano: 12, pavia: 13, torino: 22, telese: 11 },
  { year: "2026", nervi: 13, tradate: 0, sciacca: 0, veruno: 0, bari: 40, montescano: 0, pavia: 0, torino: 0, telese: 44 },
];

const waveforms = [
  { label: "EEG", path: "M0 54 C28 44 34 20 52 24 C74 29 68 84 92 82 C113 80 104 34 130 34 C151 34 154 62 180 56" },
  { label: "ENG/EMG", path: "M0 58 L28 58 L34 24 L41 90 L49 38 L57 58 L92 58 L99 31 L107 79 L116 46 L126 58 L180 58" },
  { label: "SEP", path: "M0 64 C31 65 38 60 52 56 C65 51 68 34 82 34 C99 34 101 73 119 73 C137 73 139 50 154 49 C165 49 170 55 180 56" },
  { label: "MEP", path: "M0 62 C24 62 34 62 45 61 C54 60 56 20 65 20 C74 20 74 88 84 88 C94 88 96 40 108 40 C122 40 124 62 140 62 L180 62" },
];

const hub = activityMapSites.find((site) => site.key === "pavia") ?? activityMapSites[0];

function formatNumber(value: number) {
  return new Intl.NumberFormat("it-IT").format(value);
}

function rowTotal(row: ActivityRow) {
  return activityMapSites.reduce((sum, site) => sum + row[site.key], 0);
}

function siteTotal(key: SiteKey) {
  return rows.reduce((sum, row) => sum + row[key], 0);
}

export default function NetworkObservatory() {
  const [year, setYear] = useState<Year>("2026");
  const [mode, setMode] = useState<Mode>("network");
  const [activeSite, setActiveSite] = useState<SiteKey>("telese");

  const row = rows.find((item) => item.year === year) ?? rows[rows.length - 1];
  const yearIndex = years.indexOf(year);
  const total = rowTotal(row);
  const ranking = activityMapSites
    .map((site) => ({ ...site, value: row[site.key], total: siteTotal(site.key) }))
    .sort((a, b) => b.value - a.value);
  const activeMeta = activityMapSites.find((site) => site.key === activeSite) ?? activityMapSites[0];
  const activeTrend = rows.map((item, index) => ({ year: item.year, value: item[activeSite], index }));
  const maxValue = Math.max(...ranking.map((site) => site.value), 1);
  const maxTrend = Math.max(...activeTrend.map((item) => item.value), 1);
  const networkTotal = rows.reduce((sum, item) => sum + rowTotal(item), 0);

  return (
    <main className="min-h-screen overflow-hidden bg-[#061215] text-white">
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_28%,rgba(111,169,184,0.26),transparent_34%),radial-gradient(circle_at_18%_72%,rgba(136,183,165,0.16),transparent_34%)]" />
        <div className="absolute inset-0 editorial-grid opacity-30" />
      </div>

      <section className="relative grid min-h-screen gap-8 px-5 py-5 md:grid-cols-[1fr_22rem] md:px-8 lg:grid-cols-[1fr_27rem] lg:px-10">
        <div className="flex min-h-[calc(100svh-2.5rem)] flex-col">
          <header className="flex items-center justify-between gap-4">
            <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#A9BBC0]">
              <ArrowLeft size={15} />
              Home
            </Link>
            <span className="hidden text-[10px] uppercase tracking-[0.42em] text-[#6FA9B8] sm:block">
              Network Observatory
            </span>
          </header>

          <div className="grid flex-1 items-center gap-6 py-8 lg:grid-cols-[0.82fr_1.18fr]">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
              <p className="text-[10px] uppercase tracking-[0.34em] text-[#6FA9B8]">
                Annual activity intelligence
              </p>
              <h1 className="mt-5 max-w-4xl font-serif text-[4rem] leading-[0.9] tracking-normal text-white min-[390px]:text-[4.6rem] md:text-[7rem] lg:text-[8.5rem]">
                Clinical network observatory
              </h1>
              <p className="mt-7 max-w-2xl text-[1.05rem] font-light leading-[1.8] text-[#C9D9DD] md:text-[1.35rem]">
                Explore the multicenter reporting system across years, centers and signal families.
              </p>
            </motion.div>

            <div className="relative mx-auto aspect-square w-full max-w-[760px]">
              <svg viewBox={`0 0 ${MAP_VIEWBOX_SIZE} ${MAP_VIEWBOX_SIZE}`} className="h-full w-full" role="img" aria-label="Interactive network observatory map">
                <image href="/it.svg" x="0" y="0" width={MAP_VIEWBOX_SIZE} height={MAP_VIEWBOX_SIZE} opacity="0.16" />
                <g opacity="0.42">
                  {activityMapSites
                    .filter((site) => site.key !== hub.key)
                    .map((site, index) => {
                      const value = row[site.key];
                      return (
                        <motion.line
                          key={site.key}
                          x1={hub.point.x}
                          y1={hub.point.y}
                          x2={site.point.x}
                          y2={site.point.y}
                          stroke={value > 0 ? "#88B7A5" : "#6FA9B8"}
                          strokeOpacity={value > 0 ? 0.62 : 0.14}
                          strokeWidth={value > 0 ? 1.8 + (value / maxValue) * 4 : 1}
                          vectorEffect="non-scaling-stroke"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.1, delay: index * 0.04 }}
                        />
                      );
                    })}
                </g>

                {activityMapSites.map((site) => {
                  const value = row[site.key];
                  const isActive = site.key === activeSite;
                  const radius = 9 + (value / maxValue) * 24;

                  return (
                    <motion.g
                      key={site.key}
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setActiveSite(site.key);
                        setMode("center");
                      }}
                      className="cursor-pointer"
                      whileTap={{ scale: 0.96 }}
                    >
                      <motion.circle
                        cx={site.point.x}
                        cy={site.point.y}
                        r={isActive ? radius + 16 : radius + 7}
                        fill="none"
                        stroke={isActive ? "#88B7A5" : "#6FA9B8"}
                        strokeOpacity={isActive ? 0.44 : 0.18}
                        strokeWidth="2"
                        animate={{ r: isActive ? [radius + 9, radius + 20, radius + 9] : radius + 7 }}
                        transition={{ duration: 2.4, repeat: isActive ? Infinity : 0 }}
                      />
                      <motion.circle
                        cx={site.point.x}
                        cy={site.point.y}
                        r={radius}
                        fill={value > 0 ? site.color : "#6A7E85"}
                        fillOpacity={value > 0 ? 0.95 : 0.28}
                        animate={{ scale: isActive ? 1.12 : 1 }}
                        transition={{ duration: 0.35 }}
                      />
                      <text
                        x={site.point.x + site.labelX}
                        y={site.point.y + site.labelY}
                        textAnchor={site.labelX < 0 ? "end" : "start"}
                        fontSize="24"
                        fill={isActive ? "#FFFFFF" : "#C9D9DD"}
                        letterSpacing="0.06em"
                      >
                        {site.label}
                      </text>
                    </motion.g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="grid gap-4 border-t border-white/10 pt-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <input
                type="range"
                min="0"
                max={years.length - 1}
                value={yearIndex}
                onChange={(event) => setYear(years[Number(event.target.value)])}
                className="w-full accent-[#88B7A5]"
                aria-label="Select year"
              />
              <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.2em] text-[#A9BBC0]">
                {years.map((item) => (
                  <button key={item} type="button" onClick={() => setYear(item)} className={item === year ? "text-white" : ""}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-px bg-white/10 p-px">
              {modes.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setMode(item.key)}
                    aria-pressed={mode === item.key}
                    className={`flex h-12 items-center justify-center ${mode === item.key ? "bg-white text-[#061215]" : "bg-[#102126] text-[#C9D9DD]"}`}
                    title={item.label}
                  >
                    <Icon size={18} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="relative flex flex-col border border-white/10 bg-white/[0.045] p-5 backdrop-blur md:min-h-[calc(100svh-2.5rem)] md:p-6">
          <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#A9BBC0]">Selected year</p>
              <p className="mt-2 font-serif text-5xl leading-none text-white">{year}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#A9BBC0]">Volume</p>
              <p className="mt-2 font-serif text-5xl leading-none text-white">{formatNumber(total)}</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${mode}-${year}-${activeSite}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="flex-1 py-6"
            >
              {mode === "signal" ? (
                <div className="space-y-5">
                  {waveforms.map((wave, index) => (
                    <div key={wave.label} className="border border-white/10 bg-[#061215]/35 p-4">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-[#88B7A5]">{wave.label}</p>
                      <svg viewBox="0 0 180 110" className="mt-2 h-20 w-full" aria-hidden="true">
                        <path d="M0 56H180" stroke="#31464D" strokeWidth="1" />
                        <motion.path
                          d={wave.path}
                          fill="none"
                          stroke="#D9E5E8"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1.6, delay: index * 0.12 }}
                        />
                      </svg>
                    </div>
                  ))}
                </div>
              ) : mode === "center" ? (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#88B7A5]">Center trace</p>
                  <h2 className="mt-3 font-serif text-5xl leading-none text-white">{activeMeta.label}</h2>
                  <p className="mt-5 text-sm leading-7 text-[#C9D9DD]">
                    {formatNumber(row[activeSite])} examinations in {year}. Total observed volume: {formatNumber(siteTotal(activeSite))}.
                  </p>
                  <div className="mt-7 space-y-3">
                    {activeTrend.map((item) => (
                      <button key={item.year} type="button" onClick={() => setYear(item.year)} className="grid w-full grid-cols-[3.5rem_1fr_3rem] items-center gap-3 text-left">
                        <span className="text-[10px] uppercase tracking-[0.18em] text-[#A9BBC0]">{item.year}</span>
                        <span className="h-2 bg-white/10">
                          <motion.span
                            className="block h-full bg-[#88B7A5]"
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.value / maxTrend) * 100}%` }}
                          />
                        </span>
                        <span className="text-right font-serif text-xl text-white">{item.value}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#88B7A5]">
                    {mode === "network" ? "Network ranking" : "Year snapshot"}
                  </p>
                  <h2 className="mt-3 font-serif text-5xl leading-none text-white">
                    {formatNumber(networkTotal)}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[#C9D9DD]">
                    Total remote examinations represented in the 2020-2026 observatory.
                  </p>
                  <div className="mt-7 space-y-3">
                    {ranking.map((site) => (
                      <button
                        key={site.key}
                        type="button"
                        onClick={() => {
                          setActiveSite(site.key);
                          setMode("center");
                        }}
                        className="grid w-full grid-cols-[6rem_1fr_3rem] items-center gap-3 text-left"
                      >
                        <span className="truncate text-[10px] uppercase tracking-[0.16em] text-[#C9D9DD]">{site.label}</span>
                        <span className="h-2 bg-white/10">
                          <motion.span
                            className="block h-full"
                            style={{ backgroundColor: site.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(site.value / maxValue) * 100}%` }}
                          />
                        </span>
                        <span className="text-right font-serif text-xl text-white">{site.value}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="border-t border-white/10 pt-5 text-[10px] uppercase leading-6 tracking-[0.18em] text-[#A9BBC0]">
            Click a center, scrub the year, switch modes.
          </div>
        </aside>
      </section>
    </main>
  );
}
