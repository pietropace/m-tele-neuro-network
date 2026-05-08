"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";
import SectionLabel from "../ui/SectionLabel";

const years = ["2020", "2021", "2022", "2023", "2024", "2025"] as const;
const sites = ["Tradate", "Montescano", "Pavia"] as const;

const categories = [
  { key: "rai", label: "14 RAI", color: "#2C5D6B" },
  { key: "vni", label: "16 VNI", color: "#4A8FA3" },
  { key: "vemg", label: "16 VEMG", color: "#6FA9B8" },
  { key: "uno", label: "20 UNO", color: "#7A8E95" },
  { key: "vep", label: "32 VEP", color: "#D9E5E8" },
  { key: "code35", label: "35", color: "#A8735A" },
  { key: "aval", label: "45 AVAL", color: "#8E4E4A" },
  { key: "icone", label: "ICONE", color: "#C98B84" },
] as const;

type CategoryKey = (typeof categories)[number]["key"];
type ActivityRow = {
  year: (typeof years)[number];
  site: (typeof sites)[number];
} & Record<CategoryKey, number>;

const rows: ActivityRow[] = [
  { year: "2020", site: "Tradate", rai: 32, vni: 2, vemg: 0, uno: 5, vep: 8, code35: 0, aval: 0, icone: 0 },
  { year: "2020", site: "Montescano", rai: 31, vni: 8, vemg: 3, uno: 0, vep: 5, code35: 0, aval: 0, icone: 0 },
  { year: "2020", site: "Pavia", rai: 22, vni: 4, vemg: 6, uno: 0, vep: 0, code35: 0, aval: 0, icone: 0 },
  { year: "2021", site: "Tradate", rai: 24, vni: 5, vemg: 8, uno: 0, vep: 0, code35: 0, aval: 0, icone: 0 },
  { year: "2021", site: "Montescano", rai: 18, vni: 6, vemg: 12, uno: 24, vep: 0, code35: 0, aval: 0, icone: 0 },
  { year: "2021", site: "Pavia", rai: 15, vni: 7, vemg: 10, uno: 0, vep: 0, code35: 0, aval: 0, icone: 0 },
  { year: "2022", site: "Tradate", rai: 10, vni: 10, vemg: 8, uno: 10, vep: 0, code35: 4, aval: 5, icone: 0 },
  { year: "2022", site: "Montescano", rai: 8, vni: 8, vemg: 15, uno: 12, vep: 10, code35: 7, aval: 8, icone: 4 },
  { year: "2022", site: "Pavia", rai: 14, vni: 12, vemg: 18, uno: 8, vep: 7, code35: 9, aval: 7, icone: 5 },
  { year: "2023", site: "Tradate", rai: 24, vni: 15, vemg: 14, uno: 10, vep: 0, code35: 8, aval: 6, icone: 7 },
  { year: "2023", site: "Montescano", rai: 6, vni: 10, vemg: 10, uno: 0, vep: 6, code35: 9, aval: 8, icone: 6 },
  { year: "2023", site: "Pavia", rai: 10, vni: 9, vemg: 12, uno: 0, vep: 8, code35: 10, aval: 9, icone: 8 },
  { year: "2024", site: "Tradate", rai: 31, vni: 6, vemg: 9, uno: 18, vep: 0, code35: 11, aval: 10, icone: 9 },
  { year: "2024", site: "Montescano", rai: 22, vni: 7, vemg: 11, uno: 0, vep: 10, code35: 10, aval: 12, icone: 8 },
  { year: "2024", site: "Pavia", rai: 18, vni: 10, vemg: 14, uno: 0, vep: 12, code35: 9, aval: 11, icone: 10 },
  { year: "2025", site: "Tradate", rai: 24, vni: 6, vemg: 12, uno: 0, vep: 0, code35: 8, aval: 10, icone: 11 },
  { year: "2025", site: "Montescano", rai: 8, vni: 18, vemg: 8, uno: 0, vep: 0, code35: 6, aval: 9, icone: 7 },
  { year: "2025", site: "Pavia", rai: 18, vni: 18, vemg: 6, uno: 0, vep: 0, code35: 5, aval: 8, icone: 8 },
];

function total(row: ActivityRow) {
  return categories.reduce((sum, category) => sum + row[category.key], 0);
}

function groupTotal(items: ActivityRow[]) {
  return items.reduce((sum, row) => sum + total(row), 0);
}

type Mode = "year" | "site";

export default function ActivityExplorerSection() {
  const [mode, setMode] = useState<Mode>("year");
  const [activeYear, setActiveYear] = useState<(typeof years)[number]>("2025");
  const [activeSite, setActiveSite] = useState<(typeof sites)[number]>("Pavia");

  const filteredRows = useMemo(() => {
    return mode === "year"
      ? rows.filter((row) => row.year === activeYear)
      : rows.filter((row) => row.site === activeSite);
  }, [activeSite, activeYear, mode]);

  const maxTotal = Math.max(...rows.map(total));
  const currentTotal = groupTotal(filteredRows);
  const dominant = categories
    .map((category) => ({
      ...category,
      value: filteredRows.reduce((sum, row) => sum + row[category.key], 0),
    }))
    .sort((a, b) => b.value - a.value)[0];

  return (
    <section className="bg-[#F5F7F8] py-16 md:py-32 lg:py-44">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <FadeIn className="lg:col-span-5">
            <SectionLabel>Activity Explorer</SectionLabel>
            <h2 className="font-serif text-[2.55rem] leading-[0.98] tracking-normal text-[#1F2F35] min-[380px]:text-[2.85rem] md:text-[5.4rem]">
              A navigable view of network activity by site and year.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <p className="border-t border-[#1F2F35]/10 pt-6 text-[18px] font-light leading-[1.72] text-[#4F5E64] md:pt-8 md:text-[23px] md:leading-[1.8]">
              From 2020 to 2025, activity across individual institutes can be
              read as a layered operational pattern rather than a conventional
              dashboard chart.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.14} className="mt-12 md:mt-20">
          <div className="border-y border-[#1F2F35]/10 py-6 md:py-8">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-4">
                <div className="inline-grid grid-cols-2 gap-px bg-[#1F2F35]/10 p-px">
                  {[
                    ["year", "By year"],
                    ["site", "By site"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setMode(value as Mode)}
                      className={`px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition-colors md:px-5 ${
                        mode === value
                          ? "bg-[#1F2F35] text-white"
                          : "bg-[#F5F7F8] text-[#7A8E95]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {(mode === "year" ? years : sites).map((item) => {
                    const active = mode === "year" ? item === activeYear : item === activeSite;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          mode === "year"
                            ? setActiveYear(item as (typeof years)[number])
                            : setActiveSite(item as (typeof sites)[number])
                        }
                        className={`border px-3 py-2 text-[10px] uppercase tracking-[0.18em] transition-colors ${
                          active
                            ? "border-[#2C5D6B] bg-white text-[#1F2F35]"
                            : "border-[#1F2F35]/10 text-[#7A8E95]"
                        }`}
                      >
                        {item}
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
                    transition={{ duration: 0.5 }}
                    className="mt-3 font-serif text-[4rem] leading-none text-[#1F2F35] md:text-[5rem]"
                  >
                    {currentTotal}
                  </motion.p>
                </div>
                <div>
                  <p className="text-[10px] uppercase leading-relaxed tracking-[0.2em] text-[#7A8E95]">
                    Dominant layer
                  </p>
                  <motion.p
                    key={`${mode}-${activeYear}-${activeSite}-dominant`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-5 text-[12px] uppercase leading-relaxed tracking-[0.2em] text-[#1F2F35]"
                  >
                    {dominant.label}
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-10 md:mt-16">
          <div className="space-y-5">
            {filteredRows.map((row, rowIndex) => {
              const rowTotal = total(row);
              const barWidth = (rowTotal / maxTotal) * 100;
              return (
                <motion.div
                  key={`${mode}-${activeYear}-${activeSite}-${row.site}-${row.year}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: rowIndex * 0.06 }}
                  className="grid gap-3 border-b border-[#1F2F35]/10 pb-5 md:grid-cols-[10rem_1fr_4rem] md:items-center"
                >
                  <div>
                    <p className="font-serif text-[1.85rem] leading-none text-[#1F2F35]">
                      {mode === "year" ? row.site : row.year}
                    </p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#7A8E95]">
                      {mode === "year" ? row.year : row.site}
                    </p>
                  </div>

                  <div className="relative h-9 overflow-hidden bg-white">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${barWidth}%` }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className="flex h-full"
                    >
                      {categories.map((category) => {
                        const value = row[category.key];
                        if (!value) return null;
                        return (
                          <motion.div
                            key={category.key}
                            title={`${category.label}: ${value}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            style={{
                              width: `${(value / rowTotal) * 100}%`,
                              backgroundColor: category.color,
                            }}
                          />
                        );
                      })}
                    </motion.div>
                  </div>

                  <p className="font-serif text-[2.2rem] leading-none text-[#1F2F35] md:text-right">
                    {rowTotal}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </FadeIn>

        <FadeIn delay={0.24} className="mt-10 md:mt-14">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[#1F2F35]/10 pt-6 md:grid-cols-4 lg:grid-cols-8">
            {categories.map((category) => (
              <div key={category.key} className="flex items-center gap-3">
                <span
                  className="h-2 w-6"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#7A8E95]">
                  {category.label}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
