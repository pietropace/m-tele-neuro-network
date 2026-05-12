import { CORRECT_POSITIONS, ElectrodeLabel, Placement, PlacementHint, Point } from "./constants";

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

export function getPlacementHint(label: ElectrodeLabel, point: Point, tolerance: number): PlacementHint {
  const target = CORRECT_POSITIONS[label];
  const dx = point.x - target.x;
  const dy = point.y - target.y;

  if (distance(point, target) <= tolerance * 1.18) return "Close";
  if (Math.abs(dy) >= Math.abs(dx)) return dy < 0 ? "Too anterior" : "Too posterior";
  return Math.abs(point.x - 50) > Math.abs(target.x - 50) ? "Too lateral" : "Too medial";
}

export function snapPlacement(label: ElectrodeLabel, point: Point, tolerance: number): Placement {
  const correctPoint = CORRECT_POSITIONS[label];
  const isCorrect = distance(point, correctPoint) <= tolerance * 0.72;
  const nextPoint = isCorrect ? correctPoint : clampPoint(point);

  return {
    ...nextPoint,
    status: isCorrect ? "correct" : "wrong",
    hint: getPlacementHint(label, nextPoint, tolerance),
  };
}

export function countCorrect(placements: Partial<Record<ElectrodeLabel, Placement>>, tolerance: number) {
  return Object.entries(placements).filter(([label, placement]) => {
    if (!placement) return false;
    return validatePlacement(label as ElectrodeLabel, placement, tolerance);
  }).length;
}
