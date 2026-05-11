"use client";

import { ArrowLeft, HelpCircle, RotateCcw, Zap } from "lucide-react";
import Link from "next/link";
import { PointerEvent, useEffect, useRef, useState } from "react";

type GameState = {
  running: boolean;
  score: number;
  stability: number;
  feedback: string;
};

export default function EEGSignalStabilizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerActive = useRef(false);
  const drift = useRef(0);
  const velocity = useRef(0);
  const phase = useRef(0);
  const score = useRef(0);
  const stableFrames = useRef(0);
  const lastTime = useRef<number | null>(null);
  const feedbackIndex = useRef(0);
  const [showGuide, setShowGuide] = useState(false);
  const [game, setGame] = useState<GameState>({
    running: false,
    score: 0,
    stability: 0,
    feedback: "Press Play, then stabilize the trace.",
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const currentCanvas = canvas;

    const context = currentCanvas.getContext("2d");
    if (!context) return;
    const ctx = context;

    let frame = 0;
    let animationId = 0;

    function resize() {
      const rect = currentCanvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      currentCanvas.width = Math.floor(rect.width * dpr);
      currentCanvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(timestamp: number) {
      const rect = currentCanvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const dt = lastTime.current ? Math.min((timestamp - lastTime.current) / 1000, 0.04) : 0.016;
      lastTime.current = timestamp;

      if (game.running) {
        phase.current += dt * 96;
        const difficulty = 1 + Math.min(score.current / 120, 1.8);
        const naturalDrift =
          Math.sin(timestamp * 0.0009) * 42 +
          Math.sin(timestamp * 0.0021) * 22 +
          Math.sin(timestamp * 0.0043) * 10;
        const correction = pointerActive.current ? -Math.sign(drift.current || 1) * 185 : 0;
        velocity.current += (naturalDrift * difficulty + correction) * dt;
        velocity.current *= pointerActive.current ? 0.965 : 0.992;
        drift.current += velocity.current * dt;
        drift.current = Math.max(-height * 0.28, Math.min(height * 0.28, drift.current));
      }

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#061215";
      ctx.fillRect(0, 0, width, height);

      const center = height * 0.52;
      const band = height * 0.075;
      ctx.fillStyle = "rgba(136, 183, 165, 0.07)";
      ctx.fillRect(0, center - band, width, band * 2);
      ctx.strokeStyle = "rgba(136, 183, 165, 0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, center - band);
      ctx.lineTo(width, center - band);
      ctx.moveTo(0, center + band);
      ctx.lineTo(width, center + band);
      ctx.stroke();

      ctx.strokeStyle = "rgba(217, 229, 232, 0.11)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 48) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      const currentY =
        center +
        drift.current +
        Math.sin((phase.current + width) * 0.052) * 22 +
        Math.sin((phase.current + width) * 0.137) * 11;
      const inBand = Math.abs(currentY - center) < band;

      if (game.running) {
        if (inBand) {
          stableFrames.current += 1;
          score.current += dt * 10;
        } else {
          stableFrames.current = Math.max(0, stableFrames.current - 3);
          score.current = Math.max(0, score.current - dt * 3);
        }
      }

      ctx.strokeStyle = inBand ? "#88B7A5" : "#E8B4B4";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 3) {
        const signal =
          center +
          drift.current +
          Math.sin((phase.current + x) * 0.052) * 22 +
          Math.sin((phase.current + x) * 0.137) * 11 +
          (x % 97 < 6 ? Math.sin(timestamp * 0.01 + x) * 14 : 0);
        if (x === 0) ctx.moveTo(x, signal);
        else ctx.lineTo(x, signal);
      }
      ctx.stroke();

      if (pointerActive.current) {
        ctx.fillStyle = "rgba(136, 183, 165, 0.13)";
        ctx.beginPath();
        ctx.arc(width * 0.82, center, 42 + Math.sin(timestamp * 0.006) * 5, 0, Math.PI * 2);
        ctx.fill();
      }

      frame += 1;
      if (frame % 12 === 0) {
        const stability = Math.min(100, Math.round((stableFrames.current / 90) * 100));
        const stableFeedback = [
          "Good control. Keep it smooth.",
          "Nice stabilization.",
          "Clean trace. Stay gentle.",
          "Excellent clinical window control.",
        ];
        const warningFeedback = [
          "Too much drift. Correct gently.",
          "Refocus: bring the trace back.",
          "Signal leaving the window.",
          "Ease into the correction.",
        ];
        const idleFeedback = [
          "Small inputs work best.",
          "Hold briefly, then release.",
          "Avoid overcorrection.",
          "Find the rhythm of the trace.",
        ];
        const source = !game.running ? idleFeedback : stability > 70 ? stableFeedback : warningFeedback;
        feedbackIndex.current = (feedbackIndex.current + 1) % source.length;

        setGame((current) => ({
          ...current,
          score: Math.round(score.current),
          stability,
          feedback: source[feedbackIndex.current],
        }));
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [game.running]);

  function start() {
    drift.current = 0;
    velocity.current = 0;
    phase.current = 0;
    score.current = 0;
    stableFrames.current = 0;
    lastTime.current = null;
    setGame({ running: true, score: 0, stability: 0, feedback: "Stabilize the trace inside the clinical window." });
  }

  function stop() {
    setGame((current) => ({ ...current, running: false }));
    pointerActive.current = false;
  }

  function handlePointer(event: PointerEvent<HTMLCanvasElement>, active: boolean) {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    pointerActive.current = active;
  }

  return (
    <main className="min-h-screen bg-[#061215] text-white">
      <section className="grid min-h-screen gap-8 px-5 py-5 md:px-10 lg:grid-cols-[0.74fr_1.26fr] lg:items-center">
        <div>
          <Link href="/observatory" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#A9BBC0]">
            <ArrowLeft size={15} />
            Observatory
          </Link>

          <p className="mt-16 text-[10px] uppercase tracking-[0.34em] text-[#88B7A5]">
            Interactive signal game
          </p>
          <h1 className="mt-5 font-serif text-[4rem] leading-[0.9] tracking-normal md:text-[7rem]">
            EEG Signal Stabilizer
          </h1>
          <p className="mt-7 max-w-xl text-[1.05rem] font-light leading-[1.8] text-[#C9D9DD] md:text-[1.3rem]">
            Keep the live EEG trace inside the clinical window. Press and hold to stabilize drift; release gently to avoid overcorrection.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={game.running ? stop : start}
              className="inline-flex items-center gap-2 bg-white px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-[#061215]"
            >
              <Zap size={15} />
              {game.running ? "Pause" : "Play"}
            </button>
            <button
              type="button"
              onClick={start}
              className="inline-flex items-center gap-2 border border-white/15 px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-[#D9E5E8]"
            >
              <RotateCcw size={15} />
              Reset
            </button>
            <button
              type="button"
              onClick={() => setShowGuide((value) => !value)}
              className="inline-flex items-center gap-2 border border-white/15 px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-[#D9E5E8]"
            >
              <HelpCircle size={15} />
              How to play
            </button>
          </div>

          {showGuide && (
            <div className="mt-6 max-w-xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-[#C9D9DD]">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#88B7A5]">
                Guide
              </p>
              <p className="mt-3">
                Your goal is to keep the EEG trace inside the highlighted clinical
                window. The signal naturally drifts over time, and your input acts
                like a stabilizing correction.
              </p>
              <p className="mt-3">
                Press and hold on the trace to pull it back toward the center.
                Release before you overcorrect. Short, controlled inputs usually
                work better than holding continuously.
              </p>
              <p className="mt-3">
                The trace turns green when it is readable and inside the window.
                It turns pink when it leaves the target range. Score increases
                while the signal remains stable; Stability shows how consistently
                you are keeping control.
              </p>
            </div>
          )}
        </div>

        <div className="border border-white/10 bg-white/[0.035] p-4 shadow-2xl backdrop-blur md:p-6">
          <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-3">
            <div className="border border-white/10 p-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#A9BBC0]">Score</p>
              <p className="mt-2 font-serif text-4xl">{game.score}</p>
            </div>
            <div className="border border-white/10 p-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#A9BBC0]">Stability</p>
              <p className="mt-2 font-serif text-4xl">{game.stability}%</p>
            </div>
            <div className="hidden border border-white/10 p-4 md:block">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#A9BBC0]">Feedback</p>
              <p className="mt-2 text-sm leading-6 text-[#D9E5E8]">{game.feedback}</p>
            </div>
          </div>

          <div className="mb-4 border border-white/10 bg-white/[0.03] p-3 text-sm leading-6 text-[#D9E5E8] md:hidden">
            {game.feedback}
          </div>

          <canvas
            ref={canvasRef}
            onPointerDown={(event) => handlePointer(event, true)}
            onPointerUp={(event) => handlePointer(event, false)}
            onPointerLeave={(event) => handlePointer(event, false)}
            className="h-[24rem] w-full touch-none bg-[#061215] md:h-[34rem]"
            aria-label="EEG signal stabilizer game canvas"
          />
        </div>
      </section>
    </main>
  );
}
