import type { PointerEvent, RefObject } from "react";
import { CORRECT_POSITIONS, ElectrodeLabel, Placement } from "./constants";
import ElectrodeChip from "./ElectrodeChip";

type HeadMapProps = {
  boardRef: RefObject<HTMLDivElement | null>;
  placements: Partial<Record<ElectrodeLabel, Placement>>;
  tolerance: number;
  onPlacedPointerDown: (label: ElectrodeLabel, event: PointerEvent<HTMLButtonElement>) => void;
};

export default function HeadMap({ boardRef, placements, tolerance, onPlacedPointerDown }: HeadMapProps) {
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

        <path d="M50 5 L54 11 H46 Z" fill="#DCC6A6" stroke="#17272C" strokeWidth="0.35" />
        <ellipse cx="50" cy="50" rx="34" ry="42" fill="url(#leadHead)" stroke="#17272C" strokeWidth="0.7" />
        <path d="M16 45 C12 48 12 56 16 59" fill="none" stroke="#DCC6A6" strokeWidth="2" strokeLinecap="round" />
        <path d="M84 45 C88 48 88 56 84 59" fill="none" stroke="#DCC6A6" strokeWidth="2" strokeLinecap="round" />
        <path d="M50 11 V92" stroke="#D7E4E6" strokeDasharray="2 2" strokeWidth="0.45" />
        <path d="M17 52 H83" stroke="#D7E4E6" strokeDasharray="2 2" strokeWidth="0.45" />
        <circle cx="50" cy="92" r="1.3" fill="#E8B4B4" />
        <text x="50" y="96" textAnchor="middle" className="fill-[#A46666] text-[3px] uppercase tracking-[0.2em]">
          Inion
        </text>
        <text x="50" y="9" textAnchor="middle" className="fill-[#52686E] text-[3px] uppercase tracking-[0.2em]">
          Nasion
        </text>

        {Object.entries(CORRECT_POSITIONS).map(([label, point]) => (
          <g key={label}>
            <circle
              cx={point.x}
              cy={point.y}
              r={tolerance}
              fill="rgba(255,255,255,0.62)"
              stroke="rgba(23,39,44,0.08)"
              strokeWidth="0.35"
            />
            <circle cx={point.x} cy={point.y} r="0.7" fill="#FFFFFF" opacity="0.9" />
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
