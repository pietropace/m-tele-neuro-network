import type { PointerEvent } from "react";
import { ElectrodeLabel, PlacementStatus } from "./constants";

type ElectrodeChipProps = {
  label: ElectrodeLabel;
  status?: PlacementStatus;
  disabled?: boolean;
  compact?: boolean;
  onPointerDown?: (event: PointerEvent<HTMLButtonElement>) => void;
};

export default function ElectrodeChip({
  label,
  status = "idle",
  disabled = false,
  compact = false,
  onPointerDown,
}: ElectrodeChipProps) {
  const statusClass =
    status === "correct"
      ? "border-[#88B7A5] bg-[#88B7A5] text-[#061215]"
      : status === "wrong"
        ? "border-[#E8B4B4] bg-[#E8B4B4] text-[#3A1616]"
        : "border-[#D7E4E6] bg-white text-[#17272C]";

  return (
    <button
      type="button"
      disabled={disabled}
      onPointerDown={onPointerDown}
      className={`touch-none select-none border font-serif shadow-sm transition duration-200 ${
        compact ? "h-10 min-w-12 px-3 text-lg" : "h-14 min-w-16 px-4 text-2xl"
      } ${statusClass} ${
        disabled ? "cursor-default opacity-35" : "cursor-grab hover:-translate-y-0.5 hover:scale-[1.03] active:cursor-grabbing"
      }`}
    >
      {label}
    </button>
  );
}
