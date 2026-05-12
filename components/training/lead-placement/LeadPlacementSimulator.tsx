"use client";

import Link from "next/link";
import { PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  DIFFICULTIES,
  Difficulty,
  ELECTRODES,
  ElectrodeLabel,
  Placement,
  Point,
} from "./constants";
import ElectrodeChip from "./ElectrodeChip";
import HeadMap from "./HeadMap";
import { countCorrect, snapPlacement, validatePlacement } from "./utils";

type DragState = {
  label: ElectrodeLabel;
  clientX: number;
  clientY: number;
};

function getPointFromClient(board: HTMLDivElement, clientX: number, clientY: number): Point | null {
  const rect = board.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 100;
  const y = ((clientY - rect.top) / rect.height) * 100;

  if (x < -8 || x > 108 || y < -8 || y > 108) return null;
  return { x, y };
}

function shuffleElectrodes() {
  const shuffled = [...ELECTRODES];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

export default function LeadPlacementSimulator() {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("clinical");
  const [availableLeads, setAvailableLeads] = useState<ElectrodeLabel[]>(() => shuffleElectrodes());
  const [placements, setPlacements] = useState<Partial<Record<ElectrodeLabel, Placement>>>({});
  const [drag, setDrag] = useState<DragState | null>(null);
  const [checked, setChecked] = useState(false);
  const tolerance = DIFFICULTIES[difficulty].tolerance;
  const placedCount = Object.keys(placements).length;
  const correctCount = countCorrect(placements, tolerance);
  const progress = Math.round((placedCount / ELECTRODES.length) * 100);

  const resultMessage = useMemo(() => {
    if (!checked) return "Drag each lead onto the scalp map, then check placement.";
    if (correctCount === ELECTRODES.length) return "Perfect placement. All leads are within tolerance.";
    return `${ELECTRODES.length - correctCount} lead${ELECTRODES.length - correctCount === 1 ? "" : "s"} need adjustment.`;
  }, [checked, correctCount]);

  useEffect(() => {
    if (!drag) return;

    function handleMove(event: globalThis.PointerEvent) {
      setDrag((current) => current && { ...current, clientX: event.clientX, clientY: event.clientY });
    }

    function handleUp(event: globalThis.PointerEvent) {
      const board = boardRef.current;
      const point = board ? getPointFromClient(board, event.clientX, event.clientY) : null;

      setDrag((current) => {
        if (!current) return null;

        if (point) {
          setPlacements((existing) => ({
            ...existing,
            [current.label]: snapPlacement(current.label, point, tolerance),
          }));
          setChecked(false);
        }

        return null;
      });
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp, { once: true });
    window.addEventListener("pointercancel", handleUp, { once: true });

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
    };
  }, [drag, tolerance]);

  function startDrag(label: ElectrodeLabel, event: PointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    setDrag({ label, clientX: event.clientX, clientY: event.clientY });
  }

  function checkAnswers() {
    setPlacements((existing) => {
      const next: Partial<Record<ElectrodeLabel, Placement>> = {};

      for (const label of ELECTRODES) {
        const placement = existing[label];
        if (!placement) continue;
        next[label] = {
          ...placement,
          status: validatePlacement(label, placement, tolerance) ? "correct" : "wrong",
        };
      }

      return next;
    });
    setChecked(true);
  }

  function reset() {
    setPlacements({});
    setChecked(false);
    setDrag(null);
    setAvailableLeads(shuffleElectrodes());
  }

  return (
    <main className="min-h-screen bg-[#F7FAFA] text-[#18282D]">
      <section className="px-5 py-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Link href="/training/terminology" className="text-[10px] uppercase tracking-[0.28em] text-[#2F6672]">
            Training - Terminology
          </Link>
          <div className="mt-14 grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.36em] text-[#5E858C]">
                EEG Training
              </p>
              <h1 className="mt-5 max-w-5xl font-serif text-[4rem] leading-[0.88] tracking-normal text-[#17272C] md:text-[7rem]">
                Lead Placement
              </h1>
            </div>
            <p className="max-w-2xl text-xl font-light leading-[1.75] text-[#52686E] md:text-2xl lg:justify-self-end">
              Drag each electrode onto the 10-20 head map. Snap into the correct position, check your score, and refine placement.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-10">
        <div className="mx-auto max-w-7xl border border-[#D7E4E6] bg-white/70 p-4 shadow-[0_24px_80px_rgba(24,40,45,0.08)] backdrop-blur md:p-6">
          <div className="grid gap-4 border-b border-[#D7E4E6] pb-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#5E858C]">
                Placement simulator
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(Object.keys(DIFFICULTIES) as Difficulty[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setDifficulty(key);
                      setChecked(false);
                    }}
                    aria-pressed={difficulty === key}
                    className={`border px-4 py-2 text-[10px] uppercase tracking-[0.22em] transition ${
                      difficulty === key
                        ? "border-[#2F6672] bg-[#2F6672] text-white"
                        : "border-[#D7E4E6] bg-white text-[#52686E] hover:border-[#2F6672]"
                    }`}
                  >
                    {DIFFICULTIES[key].label}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-[#52686E]">{DIFFICULTIES[difficulty].hint}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={reset}
                className="border border-[#D7E4E6] bg-white px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-[#17272C] transition hover:border-[#2F6672]"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={checkAnswers}
                className="bg-[#17272C] px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-white transition hover:bg-[#2F6672]"
              >
                Check answers
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[17rem_1fr_18rem]">
            <aside className="order-2 border border-[#D7E4E6] bg-white p-5 xl:order-1">
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.24em] text-[#5E858C]">Available leads</p>
                <p className="font-serif text-3xl text-[#2F6672]">{ELECTRODES.length - placedCount}</p>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 xl:grid-cols-2">
                {availableLeads.map((label) => (
                  <ElectrodeChip
                    key={label}
                    compact
                    label={label}
                    disabled={Boolean(placements[label])}
                    onPointerDown={(event) => startDrag(label, event)}
                  />
                ))}
              </div>
            </aside>

            <div className="order-1 xl:order-2">
              <HeadMap
                boardRef={boardRef}
                placements={placements}
                tolerance={tolerance}
                onPlacedPointerDown={startDrag}
              />
            </div>

            <aside className="order-3 border border-[#D7E4E6] bg-[#F3F7F7] p-5">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#5E858C]">Results</p>
              <p className="mt-6 font-serif text-6xl text-[#2F6672]">
                {correctCount}/{ELECTRODES.length}
              </p>
              <div className="mt-6 h-2 bg-white">
                <div className="h-full bg-[#88B7A5] transition-[width] duration-300" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-6 text-sm leading-7 text-[#52686E]">{resultMessage}</p>
              <div className="mt-8 grid gap-3">
                <div className="border border-[#D7E4E6] bg-white p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#5E858C]">Tolerance</p>
                  <p className="mt-2 font-serif text-3xl text-[#17272C]">{tolerance}%</p>
                </div>
                <div className="border border-[#D7E4E6] bg-white p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#5E858C]">Placed</p>
                  <p className="mt-2 font-serif text-3xl text-[#17272C]">{placedCount}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {drag && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 scale-105 opacity-95"
          style={{ left: drag.clientX, top: drag.clientY }}
        >
          <ElectrodeChip compact label={drag.label} />
        </div>
      )}
    </main>
  );
}
