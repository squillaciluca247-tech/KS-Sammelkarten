export type DesignId = "gold" | "purple" | "blue" | "white" | "green";

export type Rider = {
  name: string;
  nickname: string;
  bike: string;
  year: string;
  role: string;
  location: string;
  region: string;
  rating: number;
  nationality: string;
  design: DesignId;
  qr: string;
  motto: string;
  subtitle: string;
  nameSize: number;
  mottoSize: number;
  regionLogoX: number;
  regionLogoY: number;
  regionLogoW: number;
  regionLogoH: number;
  aiBackground: string;
  cutoutLook: boolean;
  holoEffect: boolean;
  imageZoom: number;
  imageX: number;
  imageY: number;
  imageBrightness: number;
  imageContrast: number;
  imageSaturation: number;
  vignette: number;
  stats: Record<string, number>;
};

export type Trait = {
  title: string;
  text: string;
  icon: string;
};

export const DEFAULT_RIDER: Rider = {
  name: "Crankomat",
  nickname: "RW",
  bike: "Honda CB1000r",
  year: "2020",
  role: "Member",
  location: "KS Salzburg",
  region: "Salzburg",
  rating: 92,
  nationality: "AT",
  design: "gold",
  qr: "https://instagram.com/",
  motto: "KNIESCHLEIFER AUS ÜBERZEUGUNG",
  subtitle: "Präzision • Freiheit • Adrenalin",
  nameSize: 78,
  mottoSize: 26,
  regionLogoX: 690,
  regionLogoY: 260,
  regionLogoW: 95,
  regionLogoH: 95,
  aiBackground: "alps",
  cutoutLook: true,
  holoEffect: true,
  imageZoom: 112,
  imageX: 50,
  imageY: 50,
  imageBrightness: 100,
  imageContrast: 108,
  imageSaturation: 105,
  vignette: 42,
  stats: {
    SPD: 88,
    SKL: 91,
    CRV: 82,
    SND: 97,
    END: 99,
    STY: 95
  }
};

export const DESIGNS = [
  {
    id: "gold",
    name: "Legend Gold",
    colors: ["#fff1a8", "#d6a22a", "#68420b", "#050505"],
    text: "#f8d66a",
    bg1: "#17110a",
    bg2: "#030303"
  },
  {
    id: "purple",
    name: "Neon Purple",
    colors: ["#f5d0fe", "#9333ea", "#3b0764", "#050008"],
    text: "#f5d0fe",
    bg1: "#1b0828",
    bg2: "#020202"
  },
  {
    id: "blue",
    name: "Carbon Blue",
    colors: ["#a5f3fc", "#2563eb", "#0f172a", "#010409"],
    text: "#a5f3fc",
    bg1: "#081323",
    bg2: "#020617"
  },
  {
    id: "white",
    name: "Platin White",
    colors: ["#ffffff", "#d4d4d8", "#a16207", "#111111"],
    text: "#f8fafc",
    bg1: "#3f3f46",
    bg2: "#09090b"
  },
  {
    id: "green",
    name: "Emerald",
    colors: ["#a7f3d0", "#059669", "#064e3b", "#010705"],
    text: "#a7f3d0",
    bg1: "#052e25",
    bg2: "#020403"
  }
] as const;

export const FLAGS = [
  { code: "AT", name: "Österreich" },
  { code: "DE", name: "Deutschland" },
  { code: "CH", name: "Schweiz" },
  { code: "IT", name: "Italien" },
  { code: "FR", name: "Frankreich" },
  { code: "ES", name: "Spanien" },
  { code: "NL", name: "Niederlande" },
  { code: "HR", name: "Kroatien" },
  { code: "SI", name: "Slowenien" },
  { code: "CZ", name: "Tschechien" },
  { code: "HU", name: "Ungarn" },
  { code: "US", name: "USA" }
];

export const TRAITS: Trait[] = [
  { title: "Asphaltjäger", text: "Sucht die nächste Kurve.", icon: "bolt" },
  { title: "Soundmaschine", text: "Unverkennbarer Klang.", icon: "sound" },
  { title: "Präzision", text: "Jede Linie sitzt.", icon: "target" },
  { title: "Kontrolle", text: "Stabil in jeder Lage.", icon: "shield" },
  { title: "Schrauberblut", text: "Kennt jede Schraube.", icon: "wrench" },
  { title: "Langstrecke", text: "Gibt niemals auf.", icon: "wolf" },
  { title: "Pack Leader", text: "Führt die Gruppe.", icon: "crown" },
  { title: "Benzinblut", text: "Lebt für Asphalt und Motoren.", icon: "fire" }
];

export const STAT_LABELS: Record<string, string> = {
  SPD: "Speed / Geschwindigkeit",
  SKL: "Schrauber-Skill",
  CRV: "Kurvenlage",
  SND: "Sound",
  END: "Ausdauer",
  STY: "Style"
};

export function getDesign(id: string) {
  return DESIGNS.find((d) => d.id === id) || DESIGNS[0];
}

export function randomTraits(count = 4) {
  return [...TRAITS].sort(() => Math.random() - 0.5).slice(0, count);
}

export function csvToRiders(text: string): Rider[] {
  const rows = text.trim().split(/\r?\n/).filter(Boolean);
  if (rows.length < 2) return [];
  const headers = rows[0].split(";").map((h) => h.trim());

  return rows.slice(1).map((line) => {
    const values = line.split(";").map((v) => v.trim());
    const row = Object.fromEntries(headers.map((h, i) => [h, values[i] || ""]));

    return {
      ...DEFAULT_RIDER,
      name: row.Name || DEFAULT_RIDER.name,
      nickname: row.Spitzname || row.Kürzel || DEFAULT_RIDER.nickname,
      bike: row.Motorrad || DEFAULT_RIDER.bike,
      year: row.Baujahr || DEFAULT_RIDER.year,
      role: row.Rolle || DEFAULT_RIDER.role,
      location: row.Ort || DEFAULT_RIDER.location,
      region: row.Region || DEFAULT_RIDER.region,
      rating: Number(row.Rating || DEFAULT_RIDER.rating),
      qr: row.QR || DEFAULT_RIDER.qr,
      motto: row.Motto || DEFAULT_RIDER.motto
    };
  });
}


export const AI_BACKGROUNDS = [
  { id: "alps", name: "Alpenstraße" },
  { id: "neon", name: "Neon City" },
  { id: "storm", name: "Storm Road" },
  { id: "garage", name: "Dark Garage" },
  { id: "sunset", name: "Sunset Pass" }
];

export function smartTraits(rider: Rider): Trait[] {
  const s = rider.stats;
  const pool: Trait[] = [];

  if ((s.SND || 0) >= 85) pool.push({ title: "Soundmaschine", text: "Unverkennbarer Klang.", icon: "sound" });
  if ((s.CRV || 0) >= 80) pool.push({ title: "Kurvenjäger", text: "Saubere Linie.", icon: "target" });
  if ((s.END || 0) >= 85) pool.push({ title: "Langstrecke", text: "Gibt niemals auf.", icon: "wolf" });
  if ((s.SKL || 0) >= 80) pool.push({ title: "Schrauberblut", text: "Kennt jede Schraube.", icon: "wrench" });
  if ((s.STY || 0) >= 85) pool.push({ title: "Stylefaktor", text: "Auffallen garantiert.", icon: "crown" });
  if ((s.SPD || 0) >= 85) pool.push({ title: "Asphaltjäger", text: "Sucht die nächste Kurve.", icon: "bolt" });

  if (rider.bike.toLowerCase().includes("harley")) {
    pool.push({ title: "Cruiser Seele", text: "Druckvoll und loyal.", icon: "shield" });
  }
  if (rider.bike.toLowerCase().includes("honda")) {
    pool.push({ title: "Präzision", text: "Zuverlässig und sauber.", icon: "target" });
  }
  if (rider.role.toLowerCase().includes("admin") || rider.role.toLowerCase().includes("leader")) {
    pool.push({ title: "Pack Leader", text: "Führt die Gruppe.", icon: "crown" });
  }

  const unique = pool.filter((item, index, arr) => arr.findIndex((x) => x.title === item.title) === index);
  return (unique.length ? unique : TRAITS).slice(0, 4);
}
