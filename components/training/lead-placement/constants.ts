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

export type PlacementStatus = "idle" | "correct" | "wrong";

export type TrainingMode = "study" | "test";

export type PlacementHint = "Close" | "Too anterior" | "Too posterior" | "Too lateral" | "Too medial";

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
  Fp1: { x: 40, y: 19 },
  Fp2: { x: 60, y: 19 },
  F3: { x: 36.5, y: 35 },
  F4: { x: 63.5, y: 35 },
  C3: { x: 31.5, y: 52 },
  C4: { x: 68.5, y: 52 },
  P3: { x: 37, y: 69 },
  P4: { x: 63, y: 69 },
  O1: { x: 42.5, y: 85 },
  O2: { x: 57.5, y: 85 },
  Fz: { x: 50, y: 34 },
  Cz: { x: 50, y: 52 },
  Pz: { x: 50, y: 70 },
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
