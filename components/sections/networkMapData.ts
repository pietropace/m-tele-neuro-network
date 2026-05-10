export const MAP_VIEWBOX_SIZE = 1000;

export type SharedMapPoint = {
  x: number;
  y: number;
};

export const sharedMapPoints = {
  milano: { x: 272, y: 178 },
  veruno: { x: 323, y: 206 },
  pavia: { x: 306, y: 226 },
  montescano: { x: 320, y: 245 },
  telese: { x: 607, y: 520 },
  bari: { x: 746, y: 522 },
  torino: { x: 212, y: 218 },
  nervi: { x: 244, y: 298 },
  sciacca: { x: 388, y: 845 },
  tradate: { x: 289, y: 185 },
} satisfies Record<string, SharedMapPoint>;

export const italyNetworkNodes = [
  {
    id: "02",
    name: "Milano",
    point: sharedMapPoints.milano,
    labelDesktopX: 46,
    labelDesktopY: 14,
    anchorDesktop: "start" as const,
  },
  {
    id: "01",
    name: "Veruno",
    point: sharedMapPoints.veruno,
    labelDesktopX: -18,
    labelDesktopY: -28,
    anchorDesktop: "end" as const,
  },
  {
    id: "03",
    name: "Pavia",
    point: sharedMapPoints.pavia,
    labelDesktopX: -20,
    labelDesktopY: 11,
    anchorDesktop: "end" as const,
  },
  {
    id: "04",
    name: "Montescano",
    point: sharedMapPoints.montescano,
    labelDesktopX: 20,
    labelDesktopY: 20,
    anchorDesktop: "start" as const,
  },
  {
    id: "05",
    name: "Telese",
    point: sharedMapPoints.telese,
    labelDesktopX: -18,
    labelDesktopY: 14,
    anchorDesktop: "end" as const,
  },
  {
    id: "06",
    name: "Bari",
    point: sharedMapPoints.bari,
    labelDesktopX: 22,
    labelDesktopY: 10,
    anchorDesktop: "start" as const,
  },
];

export const activityMapSites = [
  { key: "nervi", label: "Nervi", point: sharedMapPoints.nervi, color: "#1F2F35", labelX: -20, labelY: 24 },
  { key: "tradate", label: "Tradate", point: sharedMapPoints.tradate, color: "#2C5D6B", labelX: 22, labelY: 2 },
  { key: "sciacca", label: "Sciacca", point: sharedMapPoints.sciacca, color: "#7A8E95", labelX: -14, labelY: 24 },
  { key: "veruno", label: "Veruno", point: sharedMapPoints.veruno, color: "#6FA9B8", labelX: 18, labelY: -26 },
  { key: "bari", label: "Bari", point: sharedMapPoints.bari, color: "#377082", labelX: 22, labelY: 14 },
  { key: "montescano", label: "Montescano", point: sharedMapPoints.montescano, color: "#4A8FA3", labelX: 22, labelY: 20 },
  { key: "pavia", label: "Pavia", point: sharedMapPoints.pavia, color: "#D9E5E8", labelX: 18, labelY: 10 },
  { key: "torino", label: "Torino", point: sharedMapPoints.torino, color: "#A9BBC0", labelX: -40, labelY: 12 },
  { key: "telese", label: "Telese", point: sharedMapPoints.telese, color: "#88B7A5", labelX: -20, labelY: 20 },
] as const;