export type DesignId = "gold" | "carbon" | "neon" | "red" | "silver";

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
  nameSize: number;
  imageZoom: number;
  imageX: number;
  imageY: number;
  imageBrightness: number;
  imageContrast: number;
  imageSaturation: number;
  vignette: number;
  stats: Record<string, number>;
};

export type Trait = { title: string; text: string; icon: string; };

export const STAT_LABELS: Record<string, string> = {
  SPD: "Speed / Geschwindigkeit",
  SKL: "Schrauber-Skill",
  CRV: "Kurvenlage",
  SND: "Sound",
  END: "Ausdauer",
  STY: "Style"
};

export const FLAGS = [
  { code: "AT", name: "Österreich", flag: "🇦🇹" },
  { code: "DE", name: "Deutschland", flag: "🇩🇪" },
  { code: "CH", name: "Schweiz", flag: "🇨🇭" },
  { code: "IT", name: "Italien", flag: "🇮🇹" },
  { code: "FR", name: "Frankreich", flag: "🇫🇷" },
  { code: "ES", name: "Spanien", flag: "🇪🇸" },
  { code: "NL", name: "Niederlande", flag: "🇳🇱" },
  { code: "HR", name: "Kroatien", flag: "🇭🇷" },
  { code: "SI", name: "Slowenien", flag: "🇸🇮" },
  { code: "CZ", name: "Tschechien", flag: "🇨🇿" },
  { code: "HU", name: "Ungarn", flag: "🇭🇺" },
  { code: "US", name: "USA", flag: "🇺🇸" }
];

export const DESIGNS = [
  { id: "gold", name: "Legend Gold", bg: "card-bg-gold", border: ["#fff1a8", "#d7a52f", "#3a2204"], text: "#f8d66a" },
  { id: "carbon", name: "Carbon Blue", bg: "card-bg-carbon", border: ["#a5f3fc", "#2563eb", "#020617"], text: "#a5f3fc" },
  { id: "neon", name: "Neon Purple", bg: "card-bg-neon", border: ["#f5d0fe", "#9333ea", "#050008"], text: "#f5d0fe" },
  { id: "red", name: "Racing Red", bg: "card-bg-red", border: ["#fecaca", "#dc2626", "#210000"], text: "#fecaca" },
  { id: "silver", name: "Platin Silver", bg: "card-bg-silver", border: ["#ffffff", "#a1a1aa", "#18181b"], text: "#f4f4f5" }
] as const;

export const TRAITS: Trait[] = [
  { title: "Asphaltjäger", text: "Sucht die nächste Kurve.", icon: "⚡" },
  { title: "Soundmaschine", text: "Man hört ihn schon von weitem.", icon: "🔊" },
  { title: "Präzisionsmeister", text: "Jede Linie sitzt.", icon: "🎯" },
  { title: "Kontrollfreak", text: "Stabil in jeder Situation.", icon: "🛡️" },
  { title: "Schrauberblut", text: "Kennt jede Schraube.", icon: "🔧" },
  { title: "Langstrecke", text: "Gibt auch nach Stunden nicht auf.", icon: "🐺" },
  { title: "Pack Leader", text: "Hält die Gruppe zusammen.", icon: "👑" },
  { title: "Benzinblut", text: "Lebt für Asphalt und Motoren.", icon: "🔥" }
];

export const DEFAULT_RIDER: Rider = {
  name: "Michi",
  nickname: "RW",
  bike: "Harley Fat Bob",
  year: "2020",
  role: "Member",
  location: "KS Salzburg",
  region: "Salzburg",
  rating: 89,
  nationality: "AT",
  design: "gold",
  qr: "https://instagram.com/",
  motto: "KNIESCHLEIFER AUS ÜBERZEUGUNG",
  nameSize: 42,
  imageZoom: 108,
  imageX: 50,
  imageY: 48,
  imageBrightness: 100,
  imageContrast: 108,
  imageSaturation: 105,
  vignette: 44,
  stats: { SPD: 88, SKL: 91, CRV: 82, SND: 97, END: 84, STY: 95 }
};

export function getFlag(code: string) {
  return FLAGS.find((item) => item.code === code)?.flag || "🏳️";
}

export function getDesign(id: string) {
  return DESIGNS.find((item) => item.id === id) || DESIGNS[0];
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
