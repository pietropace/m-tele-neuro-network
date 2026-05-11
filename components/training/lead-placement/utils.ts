import { CORRECT_POSITIONS, ElectrodeLabel, Placement, Point } from "./constants";

export function clampPoint(point: Point): Point {
  return {
    x: Math.max(4, Math.min(96, point.x)),
    y: Math.max(4, Math.min(96, point.y)),
  };
}

export function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function validatePlacement(label: ElectrodeLabel, point: Point, tolerance: number) {
  return distance(point, CORRECT_POSITIONS[label]) <= tolerance;
}

export function snapPlacement(label: ElectrodeLabel, point: Point, tolerance: number): Placement {
  const correctPoint = CORRECT_POSITIONS[label];
  const isCorrect = validatePlacement(label, point, tolerance);

  return {
    ...(isCorrect ? correctPoint : clampPoint(point)),
    status: isCorrect ? "correct" : "wrong",
  };
}

export function countCorrect(placements: Partial<Record<ElectrodeLabel, Placement>>, tolerance: number) {
  return Object.entries(placements).filter(([label, placement]) => {
    if (!placement) return false;
    return validatePlacement(label as ElectrodeLabel, placement, tolerance);
  }).length;
}
