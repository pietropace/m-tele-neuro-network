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

export type Point = {
  x: number;
  y: number;
};

export type Placement = Point & {
  status: PlacementStatus;
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
  Fp1: { x: 39, y: 22 },
  Fp2: { x: 61, y: 22 },
  F3: { x: 37, y: 36 },
  F4: { x: 63, y: 36 },
  C3: { x: 34, y: 52 },
  C4: { x: 66, y: 52 },
  P3: { x: 38, y: 68 },
  P4: { x: 62, y: 68 },
  O1: { x: 42, y: 84 },
  O2: { x: 58, y: 84 },
  Fz: { x: 50, y: 34 },
  Cz: { x: 50, y: 52 },
  Pz: { x: 50, y: 69 },
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
