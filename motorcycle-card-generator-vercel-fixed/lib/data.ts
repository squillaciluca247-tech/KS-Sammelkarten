export type Rider = {
  name: string;
  nickname: string;
  bike: string;
  year: string;
  role: string;
  location: string;
  region: string;
  rating: number;
  level: "Bronze" | "Silber" | "Gold" | "Legend";
  qr: string;
  motto: string;
  stats: Record<string, number>;
};

export type Trait = {
  title: string;
  text: string;
  icon: string;
};

export const TRAITS: Trait[] = [
  { title: "Kurvenkönig", text: "Extrem präzise in jeder Lage.", icon: "🏍️" },
  { title: "Nervenstark", text: "Bleibt ruhig, wenn es drauf ankommt.", icon: "🛡️" },
  { title: "Explosiver Start", text: "Schnell weg. Immer einen Schritt voraus.", icon: "⚡" },
  { title: "Perfekte Linie", text: "Findet immer den idealen Weg.", icon: "🎯" },
  { title: "Soundmaschine", text: "Man hört ihn, bevor man ihn sieht.", icon: "🔊" },
  { title: "Schrauberblut", text: "Kennt jede Schraube beim Vornamen.", icon: "🔧" },
  { title: "Freiheitsliebe", text: "Fährt für das Gefühl, lebt für die Freiheit.", icon: "🪽" },
  { title: "Langstreckenwolf", text: "Gibt auch nach Stunden nicht auf.", icon: "🐺" },
  { title: "Regenmeister", text: "Auch nass bleibt die Linie sauber.", icon: "🌧️" },
  { title: "Benzin im Blut", text: "Lebt für Asphalt, Kurven und Motoren.", icon: "🔥" },
  { title: "Pack Leader", text: "Hält die Gruppe zusammen.", icon: "👑" },
  { title: "Tunnelblick", text: "Fokus bis zur letzten Kurve.", icon: "👁️" },
  { title: "Rudelpilot", text: "Fährt sauber vorneweg und hält Tempo.", icon: "🐺" },
  { title: "Asphaltjäger", text: "Sucht die nächste perfekte Straße.", icon: "🛣️" },
  { title: "Boxenstopp-Profi", text: "Schnelle Hilfe, bevor jemand fragt.", icon: "🧰" }
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
  level: "Legend",
  qr: "https://instagram.com/",
  motto: "Ride hard. Stay loyal.",
  stats: {
    SPD: 88,
    SKL: 91,
    CRV: 82,
    SND: 97,
    END: 84,
    STY: 95
  }
};

export function randomTraits(count = 6): Trait[] {
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
      name: row.Name || row.name || DEFAULT_RIDER.name,
      nickname: row.Spitzname || row.nickname || row.Kürzel || DEFAULT_RIDER.nickname,
      bike: row.Motorrad || row.bike || DEFAULT_RIDER.bike,
      year: row.Baujahr || row.year || DEFAULT_RIDER.year,
      role: row.Rolle || row.role || DEFAULT_RIDER.role,
      location: row.Ort || row.location || DEFAULT_RIDER.location,
      region: row.Region || row.region || DEFAULT_RIDER.region,
      rating: Number(row.Rating || row.Gesamtwertung || DEFAULT_RIDER.rating),
      level: (row.Level || DEFAULT_RIDER.level) as Rider["level"],
      motto: row.Motto || DEFAULT_RIDER.motto,
      qr: row.QR || row.qr || DEFAULT_RIDER.qr
    };
  });
}
