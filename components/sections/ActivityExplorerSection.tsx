"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";
import SectionLabel from "../ui/SectionLabel";

const years = ["2020", "2021", "2022", "2023", "2024", "2025", "2026"] as const;

const sites = [
  { key: "nervi", label: "Nervi", color: "#1F2F35", x: 244, y: 298, labelX: -18, labelY: 20 },
  { key: "tradate", label: "Tradate", color: "#2C5D6B", x: 289, y: 185, labelX: 18, labelY: 6 },
  { key: "sciacca", label: "Sciacca", color: "#7A8E95", x: 388, y: 845, labelX: -16, labelY: 22 },
  { key: "veruno", label: "Veruno", color: "#6FA9B8", x: 323, y: 206, labelX: 14, labelY: -22 },
  { key: "bari", label: "Bari", color: "#377082", x: 746, y: 522, labelX: 18, labelY: 12 },
  { key: "montescano", label: "Montescano", color: "#4A8FA3", x: 320, y: 245, labelX: 18, labelY: 18 },
  { key: "pavia", label: "Pavia", color: "#D9E5E8", x: 306, y: 226, labelX: 16, labelY: 8 },
  { key: "torino", label: "Torino", color: "#A9BBC0", x: 212, y: 218, labelX: -36, labelY: 14 },
  { key: "telese", label: "Telese", color: "#88B7A5", x: 607, y: 520, labelX: -18, labelY: 18 },
] as const;

type Year = (typeof years)[number];
type SiteKey = (typeof sites)[number]["key"];
type ViewMode = "year" | "site";

type ActivityRow = {
  year: Year;
} & Record<SiteKey, number>;

const rows: ActivityRow[] = [
  { year: "2020", nervi: 89, tradate: 9, sciacca: 40, veruno: 5, bari: 0, montescano: 0, pavia: 0, torino: 0, telese: 0 },
  { year: "2021", nervi: 87, tradate: 40, sciacca: 2, veruno: 0, bari: 14, montescano: 4, pavia: 37, torino: 0, telese: 0 },
  { year: "2022", nervi: 44, tradate: 38, sciacca: 0, veruno: 0, bari: 48, montescano: 29, pavia: 22, torino: 20, telese: 0 },
  { year: "2023", nervi: 36, tradate: 58, sciacca: 0, veruno: 0, bari: 54, montescano: 26, pavia: 19, torino: 25, telese: 0 },
  { year: "2024", nervi: 34, tradate: 34, sciacca: 0, veruno: 0, bari: 95, montescano: 6, pavia: 20, torino: 35, telese: 0 },
  { year: "2025", nervi: 43, tradate: 36, sciacca: 0, veruno: 0, bari: 60, montescano: 12, pavia: 13, torino: 22, telese: 11 },
  { year: "2026", nervi: 13, tradate: 0, sciacca: 0, veruno: 0, bari: 40, montescano: 0, pavia: 0, torino: 0, telese: 44 },
];

function rowTotal(row: ActivityRow) {
  return sites.reduce((sum, site) => sum + row[site.key], 0);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("it-IT").format(value);
}

function formatDelta(value: number) {
  if (value === 0) return "0%";
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${Math.round(value)}%`;
}

export default function ActivityExplorerSection() {
  const [mode, setMode] = useState<ViewMode>("year");
  const [activeYear, setActiveYear] = useState<Year>("2026");
  const [activeSite, setActiveSite] = useState<SiteKey>("telese");

  const selectedYearRow = useMemo(
    () => rows.find((row) => row.year === activeYear) ?? rows[rows.length - 1],
    [activeYear],
  );

  const yearTotals = useMemo(
    () =>
      rows.map((row, index) => {
        const total = rowTotal(row);
        const previousTotal = index > 0 ? rowTotal(rows[index - 1]) : total;
        const delta = previousTotal > 0 ? ((total - previousTotal) / previousTotal) * 100 : 0;

        return {
          year: row.year,
          value: total,
          delta,
        };
      }),
    [],
  );

  const selectedYearTotal = rowTotal(selectedYearRow);
  const maxYearTotal = Math.max(...yearTotals.map((item) => item.value), 1);
  const peakYear = [...yearTotals].sort((a, b) => b.value - a.value)[0];

  const siteTotals = useMemo(
    () =>
      sites
        .map((site) => ({
          ...site,
          total: rows.reduce((sum, row) => sum + row[site.key], 0),
        }))
        .sort((a, b) => b.total - a.total),
    [],
  );

  const selectedSiteMeta = sites.find((site) => site.key === activeSite) ?? sites[0];

  const yearSiteRanking = useMemo(
    () =>
      sites
        .map((site) => {
          const value = selectedYearRow[site.key];
          return {
            ...site,
            value,
            share: selectedYearTotal > 0 ? (value / selectedYearTotal) * 100 : 0,
          };
        })
        .sort((a, b) => b.value - a.value),
    [selectedYearRow, selectedYearTotal],
  );

  const leadingSite = yearSiteRanking[0];
  const activeInstitutes = yearSiteRanking.filter((site) => site.value > 0).length;
  const maxYearSiteValue = Math.max(...yearSiteRanking.map((item) => item.value), 1);

  const siteTrend = useMemo(
    () =>
      rows.map((row, index) => ({
        year: row.year,
        value: row[activeSite],
        share: rowTotal(row) > 0 ? (row[activeSite] / rowTotal(row)) * 100 : 0,
        index,
      })),
    [activeSite],
  );

  const siteTotal = siteTrend.reduce((sum, item) => sum + item.value, 0);
  const siteActiveYears = siteTrend.filter((item) => item.value > 0).length;
  const maxSiteTrendValue = Math.max(...siteTrend.map((item) => item.value), 1);
  const trendPoints = siteTrend.map((point) => ({
    ...point,
    x: (point.index / (siteTrend.length - 1)) * 100,
    y: 100 - (point.value / maxSiteTrendValue) * 78,
  }));

  const siteTrendPeak = trendPoints.reduce(
    (peak, point) => (point.value > peak.value ? point : peak),
    trendPoints[0],
  );

  const trendPolylinePoints = trendPoints.map((point) => `${point.x},${point.y}`).join(" ");
  const selectedTotal = mode === "year" ? selectedYearTotal : siteTotal;
  const networkTotal = rows.reduce((sum, row) => sum + rowTotal(row), 0);
  const networkPeakSite = siteTotals[0];
  const currentYearSiteValue = selectedYearRow[activeSite];

  return (
    <section className="relative overflow-hidden bg-[#F5F7F8] py-16 md:py-32 lg:py-44">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <FadeIn className="lg:col-span-5">
            <SectionLabel>Activity Explorer</SectionLabel>
            <h2 className="font-serif text-[2.5rem] leading-[0.98] tracking-normal text-[#1F2F35] min-[380px]:text-[2.8rem] md:text-[5.4rem]">
              Annual activity outlines the clinical profile of the network.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <p className="border-t border-[#1F2F35]/10 pt-6 text-[17px] font-light leading-[1.72] text-[#4F5E64] md:pt-8 md:text-[23px] md:leading-[1.8]">
              The dataset is now structured as annual volumes, offering a more
              coherent view of institutional contribution over time. The section
              has been redesigned as a mobile-first reading tool: each year can
              be reviewed as a network snapshot, while each institute can be
              followed across the entire 2020-2026 horizon.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.14} className="mt-12 md:mt-20">
          <div className="border-y border-[#1F2F35]/10 py-6 md:py-8">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-5">
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

                <div className="mt-6 grid grid-cols-2 gap-2.5 min-[460px]:grid-cols-3 min-[640px]:grid-cols-4 md:flex md:flex-wrap md:gap-2.5">
                  {(mode === "year" ? years : sites).map((item) => {
                    const key = typeof item === "string" ? item : item.key;
                    const label = typeof item === "string" ? item : item.label;
                    const active = mode === "year" ? key === activeYear : key === activeSite;

                    return (
                      <motion.button
                        key={key}
                        type="button"
                        onClick={() =>
                          mode === "year"
                            ? setActiveYear(key as Year)
                            : setActiveSite(key as SiteKey)
                        }
                        aria-pressed={active}
                        whileTap={{ scale: 0.98 }}
                        className={`min-h-10 w-full border px-2 py-2 text-center text-[9px] uppercase tracking-[0.1em] transition-colors min-[460px]:text-[10px] md:w-auto md:min-w-[5.5rem] md:px-3 md:text-[10px] md:tracking-[0.16em] ${
                          active
                            ? "border-[#2C5D6B] bg-white text-[#1F2F35]"
                            : "border-[#1F2F35]/10 text-[#7A8E95]"
                        }`}
                      >
                        {label}
                      </motion.button>
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
                    className="mt-3 font-serif text-[3rem] leading-none text-[#1F2F35] md:text-[5rem]"
                  >
                    {formatNumber(selectedTotal)}
                  </motion.p>
                </div>

                <div>
                  <p className="text-[10px] uppercase leading-relaxed tracking-[0.2em] text-[#7A8E95]">
                    {mode === "year" ? "Leading institute" : "Peak year"}
                  </p>
                  <motion.p
                    key={`${mode}-${activeYear}-${activeSite}-leading`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    className="mt-5 text-[12px] uppercase leading-relaxed tracking-[0.2em] text-[#1F2F35]"
                  >
                    {mode === "year"
                      ? `${leadingSite.label} · ${formatNumber(leadingSite.value)}`
                      : `${siteTrendPeak.year} · ${formatNumber(siteTrendPeak.value)}`}
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <FadeIn delay={0.18} className="lg:col-span-5">
            <div className="relative min-h-[430px] overflow-hidden border-y border-[#1F2F35]/10 bg-white/45 py-8 md:min-h-[560px] md:py-10">
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
                  {mode === "year" ? activeYear : selectedSiteMeta.label}
                </motion.span>
              </div>

              <div className="absolute inset-x-4 bottom-28 top-18 flex items-center justify-center md:inset-x-7 md:bottom-28 md:top-20">
                <div className="relative aspect-square h-full max-h-[370px] w-full max-w-[310px] md:max-h-[430px] md:max-w-[360px]">
                  <Image
                    src="/it.svg"
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 24vw, 78vw"
                    className="object-contain opacity-[0.05] saturate-0"
                  />

                  <div className="absolute inset-0">
                    {sites.map((site, index) => {
                      const yearValue = selectedYearRow[site.key];
                      const allTimeValue = siteTotals.find((entry) => entry.key === site.key)?.total ?? 0;
                      const pointValue = mode === "year" ? yearValue : allTimeValue;
                      const isSelected = mode === "site" && site.key === activeSite;
                      const radius = 5 + Math.sqrt(pointValue) * 1.15;
                      const opacity =
                        mode === "year"
                          ? pointValue > 0
                            ? 0.9
                            : 0.14
                          : isSelected
                            ? 0.98
                            : allTimeValue > 0
                              ? 0.22
                              : 0.12;

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
                            duration: 0.6,
                            delay: index * 0.04,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 text-left"
                          style={{ left: `${site.x / 10}%`, top: `${site.y / 10}%` }}
                          aria-label={`${site.label}: ${formatNumber(pointValue)}`}
                        >
                          <span
                            className="block rounded-full border border-white/80 shadow-[0_14px_34px_rgba(31,47,53,0.12)]"
                            style={{
                              width: radius * 2,
                              height: radius * 2,
                              backgroundColor: site.color,
                            }}
                          />
                          <span
                            className={`absolute whitespace-nowrap text-[9px] uppercase tracking-[0.12em] text-[#1F2F35] transition-opacity ${
                              isSelected || mode === "year" ? "opacity-100" : "opacity-0 md:opacity-100"
                            }`}
                            style={{
                              left: 0,
                              top: 0,
                              transform: `translate(${site.labelX}px, ${site.labelY}px)`,
                            }}
                          >
                            {site.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-5 bottom-5 grid grid-cols-2 gap-5 border-t border-[#1F2F35]/10 pt-5 md:inset-x-8 md:grid-cols-3">
                <div>
                  <p className="font-serif text-3xl leading-none text-[#1F2F35]">
                    {mode === "year" ? activeInstitutes : siteActiveYears}
                  </p>
                  <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-[#7A8E95]">
                    {mode === "year" ? "Active sites" : "Active years"}
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl leading-none text-[#1F2F35]">
                    {formatNumber(mode === "year" ? leadingSite.value : currentYearSiteValue)}
                  </p>
                  <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-[#7A8E95]">
                    {mode === "year" ? "Lead volume" : `${activeYear} volume`}
                  </p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="font-serif text-3xl leading-none text-[#1F2F35]">
                    {years.length}
                  </p>
                  <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-[#7A8E95]">
                    Observed years
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
                      <div className="flex items-end justify-between gap-6">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-[#7A8E95]">
                            Annual pulse 2020-2026
                          </p>
                          <p className="mt-2 font-serif text-[2rem] leading-none text-[#1F2F35] md:text-[2.6rem]">
                            {activeYear}
                          </p>
                        </div>
                        <p className="font-serif text-[2.2rem] leading-none text-[#1F2F35] md:text-[2.8rem]">
                          {formatNumber(selectedYearTotal)}
                        </p>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {yearTotals.map((item, index) => {
                          const active = item.year === activeYear;
                          return (
                            <motion.button
                              key={item.year}
                              type="button"
                              onClick={() => setActiveYear(item.year)}
                              aria-pressed={active}
                              whileTap={{ scale: 0.985 }}
                              className={`rounded-sm border px-4 py-4 text-left transition-colors ${
                                active
                                  ? "border-[#1F2F35] bg-[#1F2F35] text-white shadow-[0_18px_42px_rgba(31,47,53,0.16)]"
                                  : "border-[#1F2F35]/10 bg-white text-[#1F2F35]"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <p className="text-[10px] uppercase tracking-[0.18em] opacity-70">
                                    {item.year}
                                  </p>
                                  <p className="mt-3 font-serif text-[2rem] leading-none md:text-[2.3rem]">
                                    {formatNumber(item.value)}
                                  </p>
                                </div>
                                {item.year === peakYear.year && (
                                  <span className={`border px-2 py-1 text-[8px] uppercase tracking-[0.18em] ${active ? "border-white/30 text-white" : "border-[#2C5D6B]/20 text-[#2C5D6B]"}`}>
                                    Peak
                                  </span>
                                )}
                              </div>
                              <div className={`mt-4 h-2 overflow-hidden ${active ? "bg-white/15" : "bg-[#F0F4F5]"}`}>
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(item.value / maxYearTotal) * 100}%` }}
                                  transition={{ duration: 0.75, delay: index * 0.04 }}
                                  className={`h-full ${active ? "bg-white" : "bg-[#2C5D6B]"}`}
                                />
                              </div>
                              <p className={`mt-3 text-[10px] uppercase tracking-[0.18em] ${active ? "text-white/70" : "text-[#7A8E95]"}`}>
                                Delta {formatDelta(item.delta)}
                              </p>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>

                    <motion.div
                      layout
                      layoutId="activity-bottom-panel"
                      className="rounded-sm border-y border-[#1F2F35]/10 bg-white/45 p-4 md:p-5"
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-[#7A8E95]">
                            Institute mix {activeYear}
                          </p>
                          <p className="mt-2 max-w-[28rem] text-[15px] leading-[1.65] text-[#4F5E64] md:text-[16px]">
                            The annual view emphasizes institutional distribution:
                            it clarifies where clinical volume concentrates, which
                            centres remain structurally active, and how the network
                            profile changes from one year to the next.
                          </p>
                        </div>
                        <div className="hidden text-right md:block">
                          <p className="text-[10px] uppercase tracking-[0.18em] text-[#7A8E95]">
                            Active institutes
                          </p>
                          <p className="mt-2 font-serif text-[2rem] leading-none text-[#1F2F35]">
                            {activeInstitutes}
                          </p>
                        </div>
                      </div>

                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{
                          hidden: { opacity: 0 },
                          show: {
                            opacity: 1,
                            transition: { staggerChildren: 0.05, delayChildren: 0.06 },
                          },
                        }}
                        className="mt-5 space-y-2.5"
                      >
                        {yearSiteRanking.map((site, index) => (
                          <motion.button
                            key={`${activeYear}-${site.key}`}
                            type="button"
                            onClick={() => {
                              setMode("site");
                              setActiveSite(site.key);
                            }}
                            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            whileTap={{ scale: 0.992 }}
                            className="grid w-full grid-cols-[5.8rem_1fr_3rem] items-center gap-3 rounded-sm px-2 py-2.5 text-left text-[#1F2F35] transition-colors hover:bg-white"
                          >
                            <span className="text-[11px] uppercase tracking-[0.14em] md:text-[10px] md:tracking-[0.16em]">
                              {site.label}
                            </span>
                            <span className="relative h-3 overflow-hidden bg-white">
                              <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: `${(site.value / maxYearSiteValue) * 100}%` }}
                                transition={{ duration: 0.8, delay: index * 0.04 }}
                                className="absolute inset-y-0 left-0"
                                style={{ backgroundColor: site.color }}
                              />
                            </span>
                            <span className="text-right font-serif text-[1.15rem] leading-none md:text-[1.25rem]">
                              {site.value}
                            </span>
                            <span className="col-span-3 text-[9px] uppercase tracking-[0.16em] text-[#7A8E95]">
                              {site.share > 0 ? `${site.share.toFixed(1)}% of annual total` : "No recorded volume"}
                            </span>
                          </motion.button>
                        ))}
                      </motion.div>
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
                            Institute trace
                          </p>
                          <p className="mt-2 font-serif text-[2rem] leading-none text-[#1F2F35] md:text-[2.6rem]">
                            {selectedSiteMeta.label}
                          </p>
                        </div>
                        <p className="font-serif text-[2.2rem] leading-none text-[#1F2F35] md:text-[2.8rem]">
                          {formatNumber(siteTotal)}
                        </p>
                      </div>

                      <div className="relative mt-4">
                        <svg viewBox="0 0 100 100" className="h-28 w-full md:h-32" aria-hidden="true">
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
                            stroke={selectedSiteMeta.color}
                            strokeWidth="2.5"
                            vectorEffect="non-scaling-stroke"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                          />
                          {trendPoints.map((point, index) => (
                            <motion.circle
                              key={point.year}
                              cx={point.x}
                              cy={point.y}
                              r="1.8"
                              fill={selectedSiteMeta.color}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.38, delay: 0.2 + index * 0.06 }}
                            />
                          ))}
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
                            transform: "translate(-50%, -135%)",
                          }}
                        >
                          <span className="inline-block whitespace-nowrap bg-[#1F2F35] px-2 py-1 text-[8px] uppercase tracking-[0.16em] text-white">
                            Peak {siteTrendPeak.year} · {formatNumber(siteTrendPeak.value)}
                          </span>
                        </motion.div>
                        <div className="mt-2 grid grid-cols-7 text-[9px] uppercase tracking-[0.14em] text-[#7A8E95]">
                          {siteTrend.map((point) => (
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
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-[#7A8E95]">
                            Annual footprint
                          </p>
                          <p className="mt-2 max-w-[28rem] text-[15px] leading-[1.65] text-[#4F5E64] md:text-[16px]">
                            Each annual row places the selected institute in the
                            broader network context, combining absolute volume,
                            proportional weight, and a direct return to the
                            corresponding year overview.
                          </p>
                        </div>
                        <div className="hidden text-right md:block">
                          <p className="text-[10px] uppercase tracking-[0.18em] text-[#7A8E95]">
                            Active years
                          </p>
                          <p className="mt-2 font-serif text-[2rem] leading-none text-[#1F2F35]">
                            {siteActiveYears}
                          </p>
                        </div>
                      </div>

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
                        className="mt-5 space-y-2.5"
                      >
                        {siteTrend.map((item, index) => {
                          const active = item.year === activeYear;
                          return (
                            <motion.button
                              key={`${activeSite}-${item.year}`}
                              type="button"
                              onClick={() => setActiveYear(item.year)}
                              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                              whileTap={{ scale: 0.992 }}
                              className={`grid w-full grid-cols-[3.2rem_1fr_3rem] items-center gap-3 rounded-sm px-2 py-2.5 text-left transition-colors ${
                                active ? "bg-[#1F2F35] text-white" : "text-[#1F2F35] hover:bg-white"
                              }`}
                              aria-pressed={active}
                            >
                              <span className="font-serif text-[1.2rem] leading-none md:text-[1.35rem]">
                                {item.year.slice(2)}
                              </span>
                              <span className={`relative h-3 overflow-hidden ${active ? "bg-white/15" : "bg-white"}`}>
                                <motion.span
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(item.value / maxSiteTrendValue) * 100}%` }}
                                  transition={{ duration: 0.8, delay: index * 0.04 }}
                                  className={`absolute inset-y-0 left-0 ${active ? "bg-white" : ""}`}
                                  style={active ? undefined : { backgroundColor: selectedSiteMeta.color }}
                                />
                              </span>
                              <span className="text-right font-serif text-[1.15rem] leading-none md:text-[1.25rem]">
                                {item.value}
                              </span>
                              <span className={`col-span-3 text-[9px] uppercase tracking-[0.16em] ${active ? "text-white/70" : "text-[#7A8E95]"}`}>
                                {item.share > 0 ? `${item.share.toFixed(1)}% of ${item.year} network total` : "No recorded volume"}
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
          <div className="grid gap-4 border-t border-[#1F2F35]/10 pt-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-5 xl:grid-cols-9">
              {siteTotals.map((site) => (
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
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.16em] text-[#7A8E95]">
                      {site.label}
                    </span>
                    <span className="mt-1 block font-serif text-[1.1rem] leading-none text-[#1F2F35]">
                      {formatNumber(site.total)}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <div className="border-t border-[#1F2F35]/10 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#7A8E95]">
                Network total
              </p>
              <p className="mt-2 font-serif text-[2.4rem] leading-none text-[#1F2F35]">
                {formatNumber(networkTotal)}
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-[#7A8E95]">
                Peak institute {networkPeakSite.label}
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
