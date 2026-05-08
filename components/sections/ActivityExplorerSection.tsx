"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";
import SectionLabel from "../ui/SectionLabel";

const years = ["2020", "2021", "2022", "2023", "2024", "2025"] as const;

const sites = [
  { key: "nervi", label: "Nervi", color: "#1F2F35", x: 27, y: 37 },
  { key: "tradate", label: "Tradate", color: "#2C5D6B", x: 31.5, y: 21.5 },
  { key: "sciacca", label: "Sciacca", color: "#7A8E95", x: 39, y: 89.5 },
  { key: "veruno", label: "Veruno", color: "#6FA9B8", x: 30.5, y: 23.5 },
  { key: "bari", label: "Bari", color: "#377082", x: 61, y: 64.5 },
  { key: "montescano", label: "Montescano", color: "#4A8FA3", x: 33, y: 30.5 },
  { key: "pavia", label: "Pavia", color: "#D9E5E8", x: 32.5, y: 28.5 },
  { key: "torino", label: "Torino", color: "#A9BBC0", x: 22.5, y: 25 },
] as const;

type Year = (typeof years)[number];
type SiteKey = (typeof sites)[number]["key"];
type ViewMode = "year" | "site";

type ActivityRow = {
  year: Year;
  quarter: "I" | "II" | "III" | "IV";
  label: string;
} & Record<SiteKey, number>;

const rows: ActivityRow[] = [
  { year: "2020", quarter: "I", label: "I trimestre 2020", nervi: 4, tradate: 0, sciacca: 8, veruno: 0, bari: 0, montescano: 0, pavia: 0, torino: 0 },
  { year: "2020", quarter: "II", label: "II trimestre 2020", nervi: 32, tradate: 1, sciacca: 11, veruno: 4, bari: 0, montescano: 0, pavia: 0, torino: 0 },
  { year: "2020", quarter: "III", label: "III trimestre 2020", nervi: 32, tradate: 5, sciacca: 9, veruno: 1, bari: 0, montescano: 0, pavia: 0, torino: 0 },
  { year: "2020", quarter: "IV", label: "IV trimestre 2020", nervi: 21, tradate: 3, sciacca: 12, veruno: 0, bari: 0, montescano: 0, pavia: 0, torino: 0 },
  { year: "2021", quarter: "I", label: "I trimestre 2021", nervi: 24, tradate: 6, sciacca: 2, veruno: 0, bari: 2, montescano: 0, pavia: 0, torino: 0 },
  { year: "2021", quarter: "II", label: "II trimestre 2021", nervi: 20, tradate: 11, sciacca: 0, veruno: 0, bari: 2, montescano: 0, pavia: 0, torino: 0 },
  { year: "2021", quarter: "III", label: "III trimestre 2021", nervi: 24, tradate: 10, sciacca: 0, veruno: 23, bari: 2, montescano: 3, pavia: 0, torino: 0 },
  { year: "2021", quarter: "IV", label: "IV trimestre 2021", nervi: 19, tradate: 13, sciacca: 0, veruno: 14, bari: 8, montescano: 1, pavia: 0, torino: 0 },
  { year: "2022", quarter: "I", label: "I trimestre 2022", nervi: 12, tradate: 5, sciacca: 0, veruno: 0, bari: 7, montescano: 12, pavia: 3, torino: 4 },
  { year: "2022", quarter: "II", label: "II trimestre 2022", nervi: 12, tradate: 9, sciacca: 0, veruno: 0, bari: 8, montescano: 7, pavia: 6, torino: 7 },
  { year: "2022", quarter: "III", label: "III trimestre 2022", nervi: 11, tradate: 10, sciacca: 0, veruno: 0, bari: 15, montescano: 1, pavia: 3, torino: 2 },
  { year: "2022", quarter: "IV", label: "IV trimestre 2022", nervi: 9, tradate: 14, sciacca: 0, veruno: 0, bari: 18, montescano: 9, pavia: 10, torino: 7 },
  { year: "2023", quarter: "I", label: "I trimestre 2023", nervi: 10, tradate: 16, sciacca: 10, veruno: 0, bari: 24, montescano: 10, pavia: 12, torino: 4 },
  { year: "2023", quarter: "II", label: "II trimestre 2023", nervi: 11, tradate: 18, sciacca: 0, veruno: 0, bari: 17, montescano: 8, pavia: 0, torino: 4 },
  { year: "2023", quarter: "III", label: "III trimestre 2023", nervi: 6, tradate: 12, sciacca: 0, veruno: 0, bari: 7, montescano: 8, pavia: 6, torino: 6 },
  { year: "2023", quarter: "IV", label: "IV trimestre 2023", nervi: 9, tradate: 12, sciacca: 0, veruno: 0, bari: 6, montescano: 0, pavia: 1, torino: 11 },
  { year: "2024", quarter: "I", label: "I trimestre 2024", nervi: 8, tradate: 6, sciacca: 0, veruno: 0, bari: 31, montescano: 2, pavia: 6, torino: 9 },
  { year: "2024", quarter: "II", label: "II trimestre 2024", nervi: 10, tradate: 7, sciacca: 13, veruno: 0, bari: 20, montescano: 4, pavia: 0, torino: 9 },
  { year: "2024", quarter: "III", label: "III trimestre 2024", nervi: 10, tradate: 9, sciacca: 0, veruno: 0, bari: 20, montescano: 0, pavia: 1, torino: 7 },
  { year: "2024", quarter: "IV", label: "IV trimestre 2024", nervi: 6, tradate: 12, sciacca: 0, veruno: 0, bari: 24, montescano: 0, pavia: 0, torino: 10 },
  { year: "2025", quarter: "I", label: "I trimestre 2025", nervi: 4, tradate: 12, sciacca: 0, veruno: 0, bari: 12, montescano: 0, pavia: 0, torino: 10 },
  { year: "2025", quarter: "II", label: "II trimestre 2025", nervi: 10, tradate: 10, sciacca: 0, veruno: 0, bari: 15, montescano: 4, pavia: 0, torino: 5 },
  { year: "2025", quarter: "III", label: "III trimestre 2025", nervi: 18, tradate: 9, sciacca: 0, veruno: 0, bari: 18, montescano: 3, pavia: 3, torino: 3 },
  { year: "2025", quarter: "IV", label: "IV trimestre 2025", nervi: 11, tradate: 5, sciacca: 5, veruno: 0, bari: 10, montescano: 5, pavia: 0, torino: 4 },
];

function rowTotal(row: ActivityRow) {
  return sites.reduce((sum, site) => sum + row[site.key], 0);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("it-IT").format(value);
}

export default function ActivityExplorerSection() {
  const [mode, setMode] = useState<ViewMode>("year");
  const [activeYear, setActiveYear] = useState<Year>("2025");
  const [activeSite, setActiveSite] = useState<SiteKey>("bari");

  const maxQuarterTotal = Math.max(...rows.map(rowTotal));

  const yearlyRows = useMemo(
    () => rows.filter((row) => row.year === activeYear),
    [activeYear],
  );

  const siteRows = useMemo(() => rows, []);

  const yearSiteTotals = useMemo(() => {
    return sites.map((site) => ({
      ...site,
      value: yearlyRows.reduce((sum, row) => sum + row[site.key], 0),
    }));
  }, [yearlyRows]);

  const siteSeries = useMemo(
    () =>
      siteRows.map((row) => ({
        ...row,
        value: row[activeSite],
      })),
    [activeSite, siteRows],
  );

  const selectedSite = sites.find((site) => site.key === activeSite) ?? sites[0];
  const yearTotal = yearlyRows.reduce((sum, row) => sum + rowTotal(row), 0);
  const siteTotal = siteSeries.reduce((sum, row) => sum + row.value, 0);
  const selectedTotal = mode === "year" ? yearTotal : siteTotal;
  const leadingSite = [...yearSiteTotals].sort((a, b) => b.value - a.value)[0];
  const peakYearQuarter = [...yearlyRows].sort(
    (a, b) => rowTotal(b) - rowTotal(a),
  )[0];
  const peakSiteQuarter = [...siteSeries].sort((a, b) => b.value - a.value)[0];
  const activeInstitutes = yearSiteTotals.filter((site) => site.value > 0).length;

  const yearTotals = useMemo(
    () =>
      years.map((year) => ({
        year,
        value: rows
          .filter((row) => row.year === year)
          .reduce((sum, row) => sum + rowTotal(row), 0),
      })),
    [],
  );

  const maxYearTotal = Math.max(...yearTotals.map((item) => item.value), 1);

  const siteTrendByYear = useMemo(
    () =>
      years.map((year) => ({
        year,
        value: rows
          .filter((row) => row.year === year)
          .reduce((sum, row) => sum + row[activeSite], 0),
      })),
    [activeSite],
  );

  const maxSiteTrendValue = Math.max(...siteTrendByYear.map((item) => item.value), 1);

  const yearSiteRanking = useMemo(
    () =>
      sites
        .map((site) => ({
          ...site,
          value: yearlyRows.reduce((sum, row) => sum + row[site.key], 0),
        }))
        .sort((a, b) => b.value - a.value),
    [yearlyRows],
  );

  const maxYearSiteValue = Math.max(...yearSiteRanking.map((item) => item.value), 1);

  const peakYearTotal = [...yearTotals].sort((a, b) => b.value - a.value)[0];

  const trendPoints = siteTrendByYear.map((point, index) => ({
    ...point,
    index,
    x: (index / (siteTrendByYear.length - 1)) * 100,
    y: 100 - (point.value / maxSiteTrendValue) * 78,
  }));

  const siteTrendPeak = trendPoints.reduce(
    (peak, point) => (point.value > peak.value ? point : peak),
    trendPoints[0],
  );

  const trendPolylinePoints = siteTrendByYear
    .map((point, index) => {
      const x = (index / (siteTrendByYear.length - 1)) * 100;
      const y = 100 - (point.value / maxSiteTrendValue) * 78;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <section className="relative overflow-hidden bg-[#F5F7F8] py-16 md:py-32 lg:py-44">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <FadeIn className="lg:col-span-5">
            <SectionLabel>Activity Explorer</SectionLabel>
            <h2 className="font-serif text-[2.55rem] leading-[0.98] tracking-normal text-[#1F2F35] min-[380px]:text-[2.85rem] md:text-[5.4rem]">
              Quarterly activity becomes a national clinical rhythm.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <p className="border-t border-[#1F2F35]/10 pt-6 text-[18px] font-light leading-[1.72] text-[#4F5E64] md:pt-8 md:text-[23px] md:leading-[1.8]">
              The 2020-2025 activity log is presented as a navigable sequence:
              not a dashboard, but a measured view of how remote reporting
              moved across institutes and time.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.14} className="mt-12 md:mt-20">
          <div className="border-y border-[#1F2F35]/10 py-6 md:py-8">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-4">
                <div className="inline-grid grid-cols-2 gap-px bg-[#1F2F35]/10 p-px">
                  {[
                    ["year", "Year focus"],
                    ["site", "Institute trace"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setMode(value as ViewMode)}
                      aria-pressed={mode === value}
                      className={`px-4 py-3 text-[11px] uppercase tracking-[0.18em] transition-colors md:px-5 md:text-[10px] md:tracking-[0.2em] ${
                        mode === value
                          ? "bg-[#1F2F35] text-white"
                          : "bg-[#F5F7F8] text-[#7A8E95]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="mt-6 flex snap-x gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {(mode === "year" ? years : sites).map((item) => {
                    const key = typeof item === "string" ? item : item.key;
                    const label = typeof item === "string" ? item : item.label;
                    const active =
                      mode === "year" ? key === activeYear : key === activeSite;

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() =>
                          mode === "year"
                            ? setActiveYear(key as Year)
                            : setActiveSite(key as SiteKey)
                        }
                        aria-pressed={active}
                        className={`min-h-9 shrink-0 snap-start border px-3 py-2 text-[11px] uppercase tracking-[0.14em] transition-colors md:text-[10px] md:tracking-[0.18em] ${
                          active
                            ? "border-[#2C5D6B] bg-white text-[#1F2F35]"
                            : "border-[#1F2F35]/10 text-[#7A8E95]"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 lg:col-span-5 lg:col-start-8">
                <div>
                  <p className="text-[10px] uppercase leading-relaxed tracking-[0.2em] text-[#7A8E95]">
                    Selected total
                  </p>
                  <motion.p
                    key={`${mode}-${activeYear}-${activeSite}-total`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    aria-live="polite"
                    className="mt-3 font-serif text-[3.25rem] leading-none text-[#1F2F35] md:text-[5rem]"
                  >
                    {formatNumber(selectedTotal)}
                  </motion.p>
                </div>
                <div>
                  <p className="text-[10px] uppercase leading-relaxed tracking-[0.2em] text-[#7A8E95]">
                    {mode === "year" ? "Leading site" : "Peak quarter"}
                  </p>
                  <motion.p
                    key={`${mode}-${activeYear}-${activeSite}-leading`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    className="mt-5 text-[12px] uppercase leading-relaxed tracking-[0.2em] text-[#1F2F35]"
                  >
                    {mode === "year" ? leadingSite.label : peakSiteQuarter.label}
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <FadeIn delay={0.18} className="lg:col-span-5">
            <div className="relative min-h-[390px] overflow-hidden border-y border-[#1F2F35]/10 bg-white/45 py-8 md:min-h-[520px] md:py-10">
              <Image
                src="/it.svg"
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-contain opacity-[0.045] saturate-0"
              />
              <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-5 md:px-8">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#7A8E95]">
                  Institute geography
                </span>
                <motion.span
                  key={`${mode}-${activeYear}-${activeSite}-map-label`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-serif text-2xl leading-none text-[#1F2F35]"
                >
                  {mode === "year" ? activeYear : selectedSite.label}
                </motion.span>
              </div>

              <div className="absolute inset-0">
                {yearSiteTotals.map((site, index) => {
                  const isSelected = mode === "site" && site.key === activeSite;
                  const radius = 6 + Math.sqrt(site.value) * 1.25;
                  const opacity =
                    mode === "year" || isSelected ? 0.92 : site.value > 0 ? 0.28 : 0.14;

                  return (
                    <motion.button
                      key={site.key}
                      type="button"
                      onClick={() => {
                        setMode("site");
                        setActiveSite(site.key);
                      }}
                      aria-pressed={isSelected}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity }}
                      animate={{ scale: isSelected ? 1.18 : 1, opacity }}
                      viewport={{ once: true, margin: "-20%" }}
                      transition={{
                        duration: 0.75,
                        delay: index * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 text-left"
                      style={{ left: `${site.x}%`, top: `${site.y}%` }}
                      aria-label={`View ${site.label} (${formatNumber(site.value)} exams)`}
                    >
                      <span
                        className="block rounded-full border border-white/80 shadow-[0_14px_34px_rgba(31,47,53,0.12)]"
                        style={{
                          width: radius * 2,
                          height: radius * 2,
                          backgroundColor: site.color,
                        }}
                      />
                      <span className="mt-2 hidden whitespace-nowrap text-[9px] uppercase tracking-[0.18em] text-[#1F2F35] md:block">
                        {site.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="absolute inset-x-5 bottom-5 grid grid-cols-2 gap-5 border-t border-[#1F2F35]/10 pt-5 md:inset-x-8 md:grid-cols-3">
                <div>
                  <p className="font-serif text-3xl leading-none text-[#1F2F35]">
                    {mode === "year" ? activeInstitutes : years.length}
                  </p>
                  <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-[#7A8E95]">
                    {mode === "year" ? "Active sites" : "Observed years"}
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl leading-none text-[#1F2F35]">
                    {formatNumber(
                      mode === "year" ? rowTotal(peakYearQuarter) : peakSiteQuarter.value,
                    )}
                  </p>
                  <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-[#7A8E95]">
                    Peak value
                  </p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="font-serif text-3xl leading-none text-[#1F2F35]">
                    24
                  </p>
                  <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-[#7A8E95]">
                    Quarters
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.22} className="lg:col-span-7">
            <LayoutGroup id="activity-explorer-panels">
            <AnimatePresence mode="wait" initial={false}>
              {mode === "year" ? (
                <motion.div
                  key={`year-${activeYear}`}
                  initial={{ opacity: 0, y: 24, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -18, scale: 0.99 }}
                  transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-5"
                >
                  <motion.div
                    layout
                    layoutId="activity-top-panel"
                    className="rounded-sm border-y border-[#1F2F35]/10 bg-white/45 p-4 md:p-5"
                  >
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#7A8E95]">
                      Timeline 2020-2025
                    </p>
                    <div className="mt-4 space-y-2">
                      {yearTotals.map((item, index) => {
                        const isActive = item.year === activeYear;
                        return (
                          <button
                            key={item.year}
                            type="button"
                            onClick={() => setActiveYear(item.year)}
                            aria-pressed={isActive}
                            className={`grid w-full grid-cols-[3.1rem_1fr_2.4rem] items-center gap-3 rounded-sm px-2 py-2 text-left transition-colors ${
                              isActive ? "bg-[#1F2F35] text-white" : "text-[#1F2F35]"
                            }`}
                          >
                            <span className="font-serif text-xl leading-none md:text-2xl">
                              {item.year}
                            </span>
                            <span className={`relative h-2 overflow-hidden ${isActive ? "bg-white/15" : "bg-white"}`}>
                              <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: `${(item.value / maxYearTotal) * 100}%` }}
                                transition={{ duration: 0.8, delay: index * 0.04 }}
                                className={`absolute inset-y-0 left-0 ${isActive ? "bg-white" : "bg-[#2C5D6B]"}`}
                              />
                            </span>
                            <span className="relative text-right text-sm leading-none md:text-base">
                              {Math.round(item.value / 10) / 10}
                              {item.year === peakYearTotal.year && (
                                <motion.span
                                  initial={{ opacity: 0, y: 4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.45, delay: 0.2 }}
                                  className={`absolute -right-1 -top-5 whitespace-nowrap text-[8px] uppercase tracking-[0.18em] ${
                                    isActive ? "text-white/80" : "text-[#2C5D6B]"
                                  }`}
                                >
                                  peak
                                </motion.span>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>

                  <motion.div
                    layout
                    layoutId="activity-bottom-panel"
                    className="rounded-sm border-y border-[#1F2F35]/10 bg-white/45 p-4 md:p-5"
                  >
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#7A8E95]">
                      Quarter breakdown {activeYear}
                    </p>
                    <div className="mt-4 space-y-3">
                      {yearlyRows.map((row, rowIndex) => {
                        const total = rowTotal(row);
                        return (
                          <div
                            key={row.label}
                            className="grid grid-cols-[3.2rem_1fr_2.2rem] items-center gap-3"
                          >
                            <p className="font-serif text-[1.2rem] leading-none text-[#1F2F35] md:text-[1.45rem]">
                              {row.quarter}
                            </p>
                            <div className="relative h-8 overflow-hidden bg-white md:h-9">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(total / maxQuarterTotal) * 100}%` }}
                                transition={{
                                  duration: 0.8,
                                  delay: rowIndex * 0.06,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className="flex h-full"
                              >
                                {sites.map((site) => {
                                  const value = row[site.key];
                                  if (!value) return null;
                                  return (
                                    <span
                                      key={site.key}
                                      title={`${site.label}: ${value}`}
                                      style={{
                                        width: `${(value / total) * 100}%`,
                                        backgroundColor: site.color,
                                      }}
                                    />
                                  );
                                })}
                              </motion.div>
                            </div>
                            <p className="text-right font-serif text-[1.15rem] leading-none text-[#1F2F35] md:text-[1.35rem]">
                              {total}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key={`site-${activeSite}`}
                  initial={{ opacity: 0, y: 24, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -18, scale: 0.99 }}
                  transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-5"
                >
                  <motion.div
                    layout
                    layoutId="activity-top-panel"
                    className="rounded-sm border-y border-[#1F2F35]/10 bg-white/45 p-4 md:p-5"
                  >
                    <div className="flex items-end justify-between gap-6">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#7A8E95]">
                          City trend
                        </p>
                        <p className="mt-2 font-serif text-[2rem] leading-none text-[#1F2F35] md:text-[2.6rem]">
                          {selectedSite.label}
                        </p>
                      </div>
                      <p className="font-serif text-[2.2rem] leading-none text-[#1F2F35] md:text-[2.8rem]">
                        {formatNumber(siteTotal)}
                      </p>
                    </div>

                    <div className="relative mt-4">
                      <svg viewBox="0 0 100 100" className="h-24 w-full md:h-28" aria-hidden="true">
                        <polyline
                          points="0,100 100,100"
                          fill="none"
                          stroke="#D9E5E8"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <motion.polyline
                          points={trendPolylinePoints}
                          fill="none"
                          stroke={selectedSite.color}
                          strokeWidth="2"
                          vectorEffect="non-scaling-stroke"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        />
                        {trendPoints.map((point, index) => {
                          return (
                            <motion.circle
                              key={point.year}
                              cx={point.x}
                              cy={point.y}
                              r="1.5"
                              fill={selectedSite.color}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.38, delay: 0.2 + index * 0.06 }}
                            />
                          );
                        })}
                      </svg>
                      <motion.div
                        key={`${activeSite}-trend-peak`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.35 }}
                        className="pointer-events-none absolute"
                        style={{
                          left: `${siteTrendPeak.x}%`,
                          top: `${siteTrendPeak.y}%`,
                          transform: "translate(-50%, -130%)",
                        }}
                      >
                        <span className="inline-block whitespace-nowrap bg-[#1F2F35] px-2 py-1 text-[8px] uppercase tracking-[0.16em] text-white">
                          Peak {siteTrendPeak.year.slice(2)} · {formatNumber(siteTrendPeak.value)}
                        </span>
                      </motion.div>
                      <div className="mt-2 grid grid-cols-6 text-[9px] uppercase tracking-[0.14em] text-[#7A8E95]">
                        {siteTrendByYear.map((point) => (
                          <span key={point.year} className="text-center">
                            {point.year.slice(2)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    layout
                    layoutId="activity-bottom-panel"
                    className="rounded-sm border-y border-[#1F2F35]/10 bg-white/45 p-4 md:p-5"
                  >
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#7A8E95]">
                      City view {activeYear}
                    </p>
                    <motion.div
                      initial="hidden"
                      animate="show"
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: { staggerChildren: 0.055, delayChildren: 0.08 },
                        },
                      }}
                      className="mt-4 space-y-2"
                    >
                      {yearSiteRanking.map((site, index) => {
                        const active = site.key === activeSite;
                        return (
                          <motion.button
                            key={site.key}
                            type="button"
                            onClick={() => setActiveSite(site.key)}
                            variants={{
                              hidden: { opacity: 0, y: 12 },
                              show: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className={`grid w-full grid-cols-[6.2rem_1fr_2.4rem] items-center gap-3 rounded-sm px-2 py-2 text-left transition-colors ${
                              active ? "bg-[#1F2F35] text-white" : "text-[#1F2F35]"
                            }`}
                            aria-pressed={active}
                          >
                            <span className="text-[11px] uppercase tracking-[0.14em] md:text-[10px] md:tracking-[0.16em]">
                              {site.label}
                            </span>
                            <span className={`relative h-2 overflow-hidden ${active ? "bg-white/15" : "bg-white"}`}>
                              <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: `${(site.value / maxYearSiteValue) * 100}%` }}
                                transition={{ duration: 0.8, delay: index * 0.04 }}
                                className={`absolute inset-y-0 left-0 ${active ? "bg-white" : "bg-[#2C5D6B]"}`}
                              />
                            </span>
                            <span className="text-right font-serif text-[1.15rem] leading-none md:text-[1.25rem]">
                              {site.value}
                            </span>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            </LayoutGroup>
          </FadeIn>
        </div>

        <FadeIn delay={0.26} className="mt-10 md:mt-14">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[#1F2F35]/10 pt-6 md:grid-cols-4 lg:grid-cols-8">
            {sites.map((site) => (
              <button
                key={site.key}
                type="button"
                onClick={() => {
                  setMode("site");
                  setActiveSite(site.key);
                }}
                aria-pressed={mode === "site" && activeSite === site.key}
                className="flex items-center gap-3 text-left"
              >
                <span
                  className="h-2 w-6 shrink-0"
                  style={{ backgroundColor: site.color }}
                />
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#7A8E95]">
                  {site.label}
                </span>
              </button>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
