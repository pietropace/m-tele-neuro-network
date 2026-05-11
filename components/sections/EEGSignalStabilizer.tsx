"use client";

import { ArrowLeft, HelpCircle, RotateCcw, Zap } from "lucide-react";
import Link from "next/link";
import { KeyboardEvent, PointerEvent, useEffect, useRef, useState } from "react";

type Difficulty = "training" | "clinical" | "expert";

const DIFFICULTIES: Record<
  Difficulty,
  {
    label: string;
    duration: number;
    drift: number;
    correction: number;
    scoreRate: number;
    artifactMin: number;
    artifactMax: number;
    artifactAmp: number;
  }
> = {
  training: {
    label: "Training",
    duration: 20,
    drift: 0.72,
    correction: 155,
    scoreRate: 8,
    artifactMin: 5200,
    artifactMax: 3600,
    artifactAmp: 0.7,
  },
  clinical: {
    label: "Clinical",
    duration: 20,
    drift: 1,
    correction: 185,
    scoreRate: 10,
    artifactMin: 2800,
    artifactMax: 2400,
    artifactAmp: 1,
  },
  expert: {
    label: "Expert",
    duration: 20,
    drift: 1.38,
    correction: 205,
    scoreRate: 13,
    artifactMin: 1800,
    artifactMax: 1600,
    artifactAmp: 1.35,
  },
};

type GameState = {
  phase: "idle" | "countdown" | "playing" | "finished";
  difficulty: Difficulty;
  score: number;
  stability: number;
  quality: number;
  countdown: number;
  timeLeft: number;
  bestScore: number;
  status: string;
  feedback: string;
};

function getBestScore(difficulty: Difficulty) {
  if (typeof window === "undefined") return 0;
  return Number(window.localStorage.getItem(`eeg-stabilizer-best-${difficulty}`) ?? 0);
}

function getRoundReport(game: GameState) {
  const scoreWeight = Math.min(100, Math.round(game.score / 4.5));
  const composite = Math.round(game.stability * 0.55 + game.quality * 0.35 + scoreWeight * 0.1);

  if (composite >= 88) {
    return {
      grade: "A",
      label: "Excellent control",
      note: "The trace remained clinically readable with minimal drift and confident recovery.",
    };
  }

  if (composite >= 72) {
    return {
      grade: "B",
      label: "Good clinical window",
      note: "The signal stayed mostly stable. A few smoother corrections would improve continuity.",
    };
  }

  if (composite >= 55) {
    return {
      grade: "C",
      label: "Readable with drift",
      note: "The trace was intermittently readable, but recovery after drift needs earlier correction.",
    };
  }

  return {
    grade: "D",
    label: "Unstable acquisition",
    note: "The signal spent too much time outside the target window. Use shorter, gentler inputs.",
  };
}

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
  const phaseState = useRef<GameState["phase"]>("idle");
  const difficulty = useRef<Difficulty>("clinical");
  const countdown = useRef(0);
  const timeLeft = useRef(DIFFICULTIES.clinical.duration);
  const nextArtifactAt = useRef(0);
  const artifact = useRef<{ x: number; width: number; amp: number; until: number } | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [game, setGame] = useState<GameState>(() => ({
    phase: "idle",
    difficulty: "clinical",
    score: 0,
    stability: 0,
    quality: 0,
    countdown: 0,
    timeLeft: DIFFICULTIES.clinical.duration,
    bestScore: getBestScore("clinical"),
    status: "Idle",
    feedback: "Press Play, then stabilize the trace.",
  }));

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

      if (phaseState.current === "countdown") {
        countdown.current = Math.max(0, countdown.current - dt);
        if (countdown.current === 0) {
          phaseState.current = "playing";
          nextArtifactAt.current = timestamp + 1800;
          setGame((current) => ({
            ...current,
            phase: "playing",
            feedback: "Round started. Keep the signal readable.",
          }));
        }
      }

      if (phaseState.current === "playing") {
        const config = DIFFICULTIES[difficulty.current];
        timeLeft.current = Math.max(0, timeLeft.current - dt);
        phase.current += dt * 96;
        const driftScale = config.drift * (1 + Math.min(score.current / 120, 1.8));
        const naturalDrift =
          Math.sin(timestamp * 0.0009) * 42 +
          Math.sin(timestamp * 0.0021) * 22 +
          Math.sin(timestamp * 0.0043) * 10;
        const correction = pointerActive.current ? -Math.sign(drift.current || 1) * config.correction : 0;
        velocity.current += (naturalDrift * driftScale + correction) * dt;
        velocity.current *= pointerActive.current ? 0.965 : 0.992;
        drift.current += velocity.current * dt;
        drift.current = Math.max(-height * 0.28, Math.min(height * 0.28, drift.current));

        if (timestamp > nextArtifactAt.current) {
          artifact.current = {
            x: width * (0.18 + Math.random() * 0.64),
            width: 16 + Math.random() * 20,
            amp: (Math.random() > 0.5 ? 1 : -1) * (26 + Math.random() * 34) * config.artifactAmp,
            until: timestamp + 1500,
          };
          nextArtifactAt.current = timestamp + config.artifactMin + Math.random() * config.artifactMax;
        }

        if (timeLeft.current === 0) {
          phaseState.current = "finished";
          pointerActive.current = false;
          const finalScore = Math.round(score.current);
          const bestScore = Math.max(finalScore, getBestScore(difficulty.current));
          window.localStorage.setItem(`eeg-stabilizer-best-${difficulty.current}`, String(bestScore));
          setGame((current) => ({
            ...current,
            phase: "finished",
            score: finalScore,
            bestScore,
            timeLeft: 0,
            feedback: "Round complete. Review your signal quality.",
          }));
        }
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
      const quality = Math.max(0, Math.min(100, Math.round(100 - (Math.abs(currentY - center) / band) * 58)));
      const status = artifact.current && timestamp < artifact.current.until
        ? "Artifact risk"
        : quality > 78
          ? "Stable"
          : quality > 48
            ? "Readable"
            : "Drifting";

      if (phaseState.current === "playing") {
        if (inBand) {
          stableFrames.current += 1;
          score.current += dt * DIFFICULTIES[difficulty.current].scoreRate;
        } else {
          stableFrames.current = Math.max(0, stableFrames.current - 3);
          score.current = Math.max(0, score.current - dt * 3);
        }
      }

      ctx.strokeStyle = inBand ? "#88B7A5" : "#E8B4B4";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 3) {
        const artifactSignal =
          artifact.current && timestamp < artifact.current.until
            ? Math.exp(-((x - artifact.current.x) ** 2) / (2 * artifact.current.width ** 2)) * artifact.current.amp
            : 0;
        const signal =
          center +
          drift.current +
          Math.sin((phase.current + x) * 0.052) * 22 +
          Math.sin((phase.current + x) * 0.137) * 11 +
          (x % 97 < 6 ? Math.sin(timestamp * 0.01 + x) * 14 : 0) +
          artifactSignal;
        if (x === 0) ctx.moveTo(x, signal);
        else ctx.lineTo(x, signal);
      }
      ctx.stroke();

      if (artifact.current && timestamp < artifact.current.until) {
        ctx.fillStyle = "rgba(232, 180, 180, 0.12)";
        ctx.fillRect(artifact.current.x - artifact.current.width, 0, artifact.current.width * 2, height);
        ctx.fillStyle = "#E8B4B4";
        ctx.font = "10px Inter, sans-serif";
        ctx.fillText("ARTIFACT", artifact.current.x - 28, 22);
      }

      const sweepX = ((timestamp * 0.055) % Math.max(width, 1));
      const gradient = ctx.createLinearGradient(sweepX - 46, 0, sweepX, 0);
      gradient.addColorStop(0, "rgba(136, 183, 165, 0)");
      gradient.addColorStop(1, "rgba(136, 183, 165, 0.22)");
      ctx.fillStyle = gradient;
      ctx.fillRect(Math.max(0, sweepX - 46), 0, 46, height);

      if (pointerActive.current) {
        ctx.fillStyle = "rgba(136, 183, 165, 0.13)";
        ctx.beginPath();
        ctx.arc(width * 0.82, center, 42 + Math.sin(timestamp * 0.006) * 5, 0, Math.PI * 2);
        ctx.fill();
      }

      frame += 1;
      if (frame % 12 === 0) {
        const stability = Math.min(100, Math.round((stableFrames.current / 90) * 100));
        const displayStatus =
          phaseState.current === "countdown"
            ? "Get ready"
            : phaseState.current === "finished"
              ? "Complete"
              : status;

        setGame((current) => ({
          ...current,
          score: Math.round(score.current),
          stability,
          quality,
          countdown: Math.ceil(countdown.current),
          timeLeft: Math.ceil(timeLeft.current),
          status: displayStatus,
        }));
      }

      if (phaseState.current === "playing" && frame % 150 === 0) {
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
        const source = stability > 70 ? stableFeedback : warningFeedback;
        feedbackIndex.current = (feedbackIndex.current + 1) % source.length;
        setGame((current) => ({
          ...current,
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
  }, []);

  function start() {
    const config = DIFFICULTIES[difficulty.current];
    drift.current = 0;
    velocity.current = 0;
    phase.current = 0;
    score.current = 0;
    stableFrames.current = 0;
    lastTime.current = null;
    countdown.current = 3;
    timeLeft.current = config.duration;
    phaseState.current = "countdown";
    artifact.current = null;
    setGame((current) => ({
      ...current,
      phase: "countdown",
      difficulty: difficulty.current,
      score: 0,
      stability: 0,
      quality: 0,
      countdown: 3,
      timeLeft: config.duration,
      bestScore: getBestScore(difficulty.current),
      status: "Get ready",
      feedback: "Starting in 3 seconds.",
    }));
  }

  function stop() {
    phaseState.current = "idle";
    setGame((current) => ({ ...current, phase: "idle", status: "Paused" }));
    pointerActive.current = false;
  }

  function selectDifficulty(nextDifficulty: Difficulty) {
    if (phaseState.current === "playing" || phaseState.current === "countdown") return;
    difficulty.current = nextDifficulty;
    setGame((current) => ({
      ...current,
      difficulty: nextDifficulty,
      timeLeft: DIFFICULTIES[nextDifficulty].duration,
      bestScore: getBestScore(nextDifficulty),
      feedback: `${DIFFICULTIES[nextDifficulty].label} mode selected.`,
    }));
  }

  function handlePointer(event: PointerEvent<HTMLCanvasElement>, active: boolean) {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    pointerActive.current = active && phaseState.current === "playing";
  }

  function handleKeyboard(event: KeyboardEvent<HTMLCanvasElement>, active: boolean) {
    if (event.key !== " " && event.key !== "Enter") return;
    event.preventDefault();
    pointerActive.current = active && phaseState.current === "playing";
  }

  const roundReport = getRoundReport(game);

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
              onClick={game.phase === "playing" || game.phase === "countdown" ? stop : start}
              className="inline-flex items-center gap-2 bg-white px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-[#061215]"
            >
              <Zap size={15} />
              {game.phase === "playing" || game.phase === "countdown" ? "Pause" : "Play"}
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

          <div className="mt-4 flex flex-wrap gap-2">
            {(Object.keys(DIFFICULTIES) as Difficulty[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => selectDifficulty(key)}
                aria-pressed={game.difficulty === key}
                className={`border px-4 py-2 text-[10px] uppercase tracking-[0.22em] transition ${
                  game.difficulty === key
                    ? "border-[#88B7A5] bg-[#88B7A5]/12 text-white"
                    : "border-white/15 text-[#A9BBC0]"
                }`}
              >
                {DIFFICULTIES[key].label}
              </button>
            ))}
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
                On desktop, you can also focus the signal panel and use Space or
                Enter as the stabilizer control.
              </p>
              <p className="mt-3">
                Each round begins with a short countdown. Training is slower,
                Clinical is balanced, and Expert adds faster drift with more
                artifacts.
                The trace turns green when it is readable and inside the window.
                It turns pink when it leaves the target range. Random artifacts
                may appear; do not chase every spike. Score increases while the
                signal remains stable. Quality and Stability tell you how
                consistently you are keeping clinical control.
              </p>
            </div>
          )}
        </div>

        <div className="border border-white/10 bg-white/[0.035] p-4 shadow-2xl backdrop-blur md:p-6">
          <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="border border-white/10 p-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#A9BBC0]">Score</p>
              <p className="mt-2 font-serif text-4xl">{game.score}</p>
            </div>
            <div className="border border-white/10 p-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#A9BBC0]">Stability</p>
              <p className="mt-2 font-serif text-4xl">{game.stability}%</p>
            </div>
            <div className="border border-white/10 p-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#A9BBC0]">Time</p>
              <p className="mt-2 font-serif text-4xl">{game.timeLeft}</p>
            </div>
            <div className="border border-white/10 p-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#A9BBC0]">Best</p>
              <p className="mt-2 font-serif text-4xl">{game.bestScore}</p>
            </div>
            <div className="border border-white/10 p-4 md:col-span-2">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#A9BBC0]">Signal quality</p>
              <div className="mt-4 h-2 bg-white/10">
                <div
                  className="h-full bg-[#88B7A5] transition-[width]"
                  style={{ width: `${game.quality}%` }}
                />
              </div>
            </div>
            <div className="hidden border border-white/10 p-4 md:col-span-2 md:block">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#A9BBC0]">Feedback</p>
              <p className="mt-2 text-sm leading-6 text-[#D9E5E8]">
                {game.status} · {game.feedback}
              </p>
            </div>
          </div>

          {game.phase === "countdown" && (
            <div className="mb-4 border border-[#88B7A5]/30 bg-[#88B7A5]/10 p-4 text-center font-serif text-5xl">
              {game.countdown}
            </div>
          )}

          {game.phase === "finished" && (
            <div className="mb-4 grid gap-3 border border-[#88B7A5]/30 bg-[#88B7A5]/10 p-4 text-sm leading-7 text-[#D9E5E8] md:grid-cols-[auto_1fr]">
              <div className="flex size-20 items-center justify-center border border-white/15 font-serif text-5xl text-white">
                {roundReport.grade}
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-[#88B7A5]">
                  {roundReport.label}
                </p>
                <p className="mt-2">
                  {roundReport.note}
                </p>
                <p className="mt-2 text-[#A9BBC0]">
                  {DIFFICULTIES[game.difficulty].label} round. Final score: {game.score}. Best score: {game.bestScore}.
                </p>
              </div>
            </div>
          )}

          <div className="mb-4 border border-white/10 bg-white/[0.03] p-3 text-sm leading-6 text-[#D9E5E8] md:hidden">
            {game.status} · {game.feedback}
          </div>

          <canvas
            ref={canvasRef}
            tabIndex={0}
            onPointerDown={(event) => handlePointer(event, true)}
            onPointerUp={(event) => handlePointer(event, false)}
            onPointerLeave={(event) => handlePointer(event, false)}
            onPointerCancel={(event) => handlePointer(event, false)}
            onKeyDown={(event) => handleKeyboard(event, true)}
            onKeyUp={(event) => handleKeyboard(event, false)}
            className="h-[24rem] w-full touch-none bg-[#061215] outline-none ring-0 transition focus-visible:ring-2 focus-visible:ring-[#88B7A5]/70 md:h-[34rem]"
            aria-label="EEG signal stabilizer game canvas"
          />
        </div>
      </section>
    </main>
  );
}
