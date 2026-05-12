import type { PointerEvent, RefObject } from "react";
import { CORRECT_POSITIONS, ElectrodeLabel, Placement, TrainingMode } from "./constants";
import ElectrodeChip from "./ElectrodeChip";

type HeadMapProps = {
  boardRef: RefObject<HTMLDivElement | null>;
  placements: Partial<Record<ElectrodeLabel, Placement>>;
  tolerance: number;
  mode: TrainingMode;
  onPlacedPointerDown: (label: ElectrodeLabel, event: PointerEvent<HTMLButtonElement>) => void;
};

export default function HeadMap({ boardRef, placements, tolerance, mode, onPlacedPointerDown }: HeadMapProps) {
  return (
    <div
      ref={boardRef}
      className="relative mx-auto aspect-[0.78] w-full max-w-[36rem] overflow-hidden border border-[#D7E4E6] bg-white shadow-[0_24px_80px_rgba(24,40,45,0.08)]"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="leadHead" cx="50%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EEF5F5" />
          </radialGradient>
        </defs>

        <path d="M50 4.5 L54.5 11.2 H45.5 Z" fill="#DCC6A6" stroke="#17272C" strokeWidth="0.35" />
        <path
          d="M50 9 C68 9, 82 25, 85 45 C88 65, 78 86, 62 93 C55 96, 45 96, 38 93 C22 86, 12 65, 15 45 C18 25, 32 9, 50 9 Z"
          fill="url(#leadHead)"
          stroke="#17272C"
          strokeWidth="0.75"
        />
        <path d="M14.8 43 C9.8 46.5, 9.8 57.5, 14.8 61" fill="none" stroke="#DCC6A6" strokeWidth="2.1" strokeLinecap="round" />
        <path d="M85.2 43 C90.2 46.5, 90.2 57.5, 85.2 61" fill="none" stroke="#DCC6A6" strokeWidth="2.1" strokeLinecap="round" />
        <path d="M50 11 V92" stroke="#D7E4E6" strokeDasharray="2 2" strokeWidth="0.45" />
        <path d="M15.5 52 H84.5" stroke="#D7E4E6" strokeDasharray="2 2" strokeWidth="0.45" />
        <path d="M24 35 C34 28, 66 28, 76 35" fill="none" stroke="#D7E4E6" strokeWidth="0.35" opacity="0.8" />
        <path d="M21 69 C34 77, 66 77, 79 69" fill="none" stroke="#D7E4E6" strokeWidth="0.35" opacity="0.8" />
        <circle cx="50" cy="93" r="1.3" fill="#E8B4B4" />
        <text x="50" y="97" textAnchor="middle" className="fill-[#A46666] text-[3px] uppercase tracking-[0.2em]">
          Inion
        </text>
        <text x="50" y="9" textAnchor="middle" className="fill-[#52686E] text-[3px] uppercase tracking-[0.2em]">
          Nasion
        </text>

        {mode === "study" &&
          Object.entries(CORRECT_POSITIONS).map(([label, point]) => (
            <g key={label}>
              <circle
                cx={point.x}
                cy={point.y}
                r={tolerance}
                fill="rgba(255,255,255,0.72)"
                stroke="rgba(47,102,114,0.18)"
                strokeWidth="0.35"
              />
              <circle cx={point.x} cy={point.y} r="0.8" fill="#FFFFFF" />
              <text x={point.x} y={point.y - tolerance - 1.2} textAnchor="middle" className="fill-[#5E858C] text-[2.8px]">
                {label}
              </text>
            </g>
          ))}
      </svg>

      {Object.entries(placements).map(([label, placement]) => {
        if (!placement) return null;

        return (
          <div
            key={label}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-200 ease-out"
            style={{ left: `${placement.x}%`, top: `${placement.y}%` }}
          >
            <ElectrodeChip
              compact
              label={label as ElectrodeLabel}
              status={placement.status}
              onPointerDown={(event) => onPlacedPointerDown(label as ElectrodeLabel, event)}
            />
          </div>
        );
      })}
    </div>
  );
}
