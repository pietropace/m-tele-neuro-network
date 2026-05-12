export type ElectrodeLabel =
  | "Fp1"
  | "Fp2"
  | "F3"
  | "F4"
  | "C3"
  | "C4"
  | "P3"
  | "P4"
  | "O1"
  | "O2"
  | "Cz"
  | "Fz"
  | "Pz";

export type Difficulty = "training" | "clinical" | "expert";

export type PlacementStatus = "idle" | "correct" | "wrong" | "missing";

export type TrainingMode = "study" | "test";

export type PlacementHint = "Close" | "Too anterior" | "Too posterior" | "Too lateral" | "Too medial" | "Missing";

export type Point = {
  x: number;
  y: number;
};

export type Placement = Point & {
  status: PlacementStatus;
  hint: PlacementHint;
};

export const ELECTRODES: ElectrodeLabel[] = [
  "Fp1",
  "Fp2",
  "F3",
  "F4",
  "C3",
  "C4",
  "P3",
  "P4",
  "O1",
  "O2",
  "Fz",
  "Cz",
  "Pz",
];

export const CORRECT_POSITIONS: Record<ElectrodeLabel, Point> = {
  Fp1: { x: 39, y: 16 },
  Fp2: { x: 61, y: 16 },
  F3: { x: 35.5, y: 34 },
  F4: { x: 64.5, y: 34 },
  C3: { x: 29, y: 52 },
  C4: { x: 71, y: 52 },
  P3: { x: 36, y: 70 },
  P4: { x: 64, y: 70 },
  O1: { x: 41, y: 88 },
  O2: { x: 59, y: 88 },
  Fz: { x: 50, y: 34 },
  Cz: { x: 50, y: 52 },
  Pz: { x: 50, y: 71 },
};

export const DIFFICULTIES: Record<Difficulty, { label: string; tolerance: number; hint: string }> = {
  training: {
    label: "Training",
    tolerance: 9,
    hint: "Wide tolerance. Learn the spatial logic first.",
  },
  clinical: {
    label: "Clinical",
    tolerance: 7,
    hint: "Standard tolerance. Moderate precision required.",
  },
  expert: {
    label: "Expert",
    tolerance: 5,
    hint: "Tight tolerance. Place with technician-level accuracy.",
  },
};
