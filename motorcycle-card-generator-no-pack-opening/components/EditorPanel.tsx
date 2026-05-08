import { Calculator, FileText, Image, RotateCcw, Shuffle, Upload } from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";
import { Rider, csvToRiders, STAT_LABELS, NATIONAL_FLAGS, CARD_DESIGNS } from "@/lib/data";

type Props = {
  rider: Rider;
  riders: Rider[];
  setRider: (rider: Rider) => void;
  setRiders: (riders: Rider[]) => void;
  update: (key: keyof Rider, value: any) => void;
  updateStat: (key: string, value: number) => void;
  setPhoto: (value: string) => void;
  setClubLogo: (value: string) => void;
  setRegionLogo: (value: string) => void;
  calculateRating: () => void;
  randomizeTraits: () => void;
  toggleBack: () => void;
  downloadPNG: () => void;
  downloadPDF: () => void;
};

const inputClass = "w-full rounded-xl border border-yellow-800/30 bg-black/45 px-3 py-2 text-sm text-white outline-none focus:border-yellow-400/70";
const labelClass = "font-title text-sm uppercase tracking-[0.12em] text-yellow-300";

export default function EditorPanel(props: Props) {
  const {
    rider, riders, setRider, setRiders, update, updateStat, setPhoto, setClubLogo, setRegionLogo,
    calculateRating, randomizeTraits, toggleBack, downloadPNG, downloadPDF
  } = props;

  const upload = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setter(String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  const importCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const imported = csvToRiders(String(reader.result || ""));
      if (imported.length) {
        setRiders(imported);
        setRider(imported[0]);
      }
    };
    reader.readAsText(file);
  };

  return (
    <Card className="premium-panel rounded-[26px]">
      <CardContent className="p-5 space-y-5">
        <div className="flex items-center gap-3 border-b border-yellow-800/30 pb-4">
          <div className="text-3xl">🏍️</div>
          <div>
            <h1 className="font-title text-4xl tracking-[0.08em] text-yellow-200">KARTEN EDITOR</h1>
            <p className="text-xs text-zinc-400">Motorrad-Club Sammelkarten</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className={labelClass}>Allgemein</h2>

          <div className="rounded-2xl border border-yellow-800/25 bg-black/30 p-3">
            <label className="text-xs text-zinc-400 flex items-center gap-2">
              <Upload className="h-4 w-4 text-yellow-400" /> CSV Import mit ; getrennt
            </label>
            <input type="file" accept=".csv,text/csv" onChange={importCSV} className="mt-2 text-xs text-zinc-300" />
            {riders.length > 1 && (
              <select
                className={`${inputClass} mt-3`}
                onChange={(e) => setRider(riders[Number(e.target.value)])}
              >
                {riders.map((r, i) => (
                  <option key={`${r.name}-${i}`} value={i}>{r.name} · {r.bike}</option>
                ))}
              </select>
            )}
          </div>

          {[
            ["name", "Name"],
            ["nickname", "Position/Kürzel"],
            ["bike", "Motorrad"],
            ["year", "Baujahr"],
            ["role", "Club-Rolle"],
            ["location", "Ort/Gruppe"],
            ["region", "Region"],
            ["motto", "Motto"]
          ].map(([key, label]) => (
            <label key={key} className="grid grid-cols-[115px_1fr] items-center gap-3 text-sm text-zinc-300">
              <span>{label}</span>
              <input
                className={inputClass}
                value={(rider as any)[key]}
                onChange={(e) => update(key as keyof Rider, e.target.value)}
              />
            </label>
          ))}

          <label>
            <span className="mb-1 block text-xs text-zinc-400">Gesamtwertung</span>
            <input
              type="number"
              className={inputClass}
              value={rider.rating}
              onChange={(e) => update("rating", Number(e.target.value))}
            />
          </label>

          <div>
            <span className="mb-2 block text-xs text-zinc-400">Nationalität / Flagge</span>
            <div className="grid grid-cols-5 gap-2">
              {NATIONAL_FLAGS.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  title={item.name}
                  onClick={() => update("nationality", item.code)}
                  className={`flex h-12 items-center justify-center rounded-xl border bg-black/35 text-3xl transition hover:scale-105 ${
                    rider.nationality === item.code ? "border-yellow-300 ring-2 ring-yellow-400/70" : "border-yellow-800/35"
                  }`}
                >
                  <span aria-label={item.name}>{item.flag}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="mb-2 block text-xs text-zinc-400">Karten Design</span>
            <div className="grid grid-cols-5 gap-2">
              {CARD_DESIGNS.map((design) => (
                <button
                  key={design.id}
                  type="button"
                  title={design.name}
                  onClick={() => update("cardDesign", design.id)}
                  className={`h-16 rounded-xl border bg-gradient-to-br ${design.swatch} ${
                    rider.cardDesign === design.id ? "border-yellow-300 ring-2 ring-yellow-400/70" : "border-yellow-800/35"
                  }`}
                >
                  <span className="sr-only">{design.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-3 border-t border-yellow-800/25 pt-4">
          <h2 className={labelClass}>Bild & Text anpassen</h2>

          <div className="grid grid-cols-1 gap-2 text-sm text-zinc-300">
            <label>Fahrerfoto <input type="file" accept="image/*" onChange={upload(setPhoto)} className="mt-1 block text-xs" /></label>
            <label>Clublogo <input type="file" accept="image/*" onChange={upload(setClubLogo)} className="mt-1 block text-xs" /></label>
            <label>Regional-Logo <input type="file" accept="image/*" onChange={upload(setRegionLogo)} className="mt-1 block text-xs" /></label>
          </div>

          {[
            ["nameSize", "Namensgröße", 30, 66, "px"],
            ["imageBrightness", "Helligkeit", 60, 150, "%"],
            ["imageContrast", "Kontrast", 70, 160, "%"],
            ["imageSaturation", "Sättigung", 40, 160, "%"],
            ["imageVignette", "Vignette", 0, 85, "%"]
          ].map(([key, label, min, max, unit]) => (
            <label key={key as string} className="block rounded-xl border border-yellow-800/20 bg-black/25 p-3 text-sm text-zinc-300">
              <div className="flex justify-between">
                <span className="font-bold text-yellow-300">{label}</span>
                <span>{(rider as any)[key]}{unit}</span>
              </div>
              <input
                type="range"
                min={Number(min)}
                max={Number(max)}
                value={(rider as any)[key]}
                onChange={(e) => update(key as keyof Rider, Number(e.target.value))}
                className="mt-2 w-full"
              />
            </label>
          ))}
        </section>

        <section className="space-y-3 border-t border-yellow-800/25 pt-4">
          <h2 className={labelClass}>Stats</h2>
          <Button onClick={calculateRating} className="w-full rounded-xl bg-gradient-to-b from-yellow-300 to-yellow-700 py-2 text-black hover:brightness-110">
            <Calculator className="w-4 h-4 mr-2" /> Gesamtwertung berechnen
          </Button>

          <div className="grid grid-cols-2 gap-2">
            {Object.entries(rider.stats).map(([key, value]) => (
              <label key={key} className="rounded-xl border border-yellow-800/20 bg-black/30 p-2 text-xs text-zinc-300">
                <div className="flex justify-between gap-2">
                  <span className="font-black text-yellow-300">{key}</span>
                  <span>{value}</span>
                </div>
                <div className="mb-1 truncate text-[10px] text-zinc-500">{STAT_LABELS[key]}</div>
                <input
                  type="range"
                  min="1"
                  max="99"
                  value={value}
                  onChange={(e) => updateStat(key, Number(e.target.value))}
                  className="w-full"
                />
              </label>
            ))}
          </div>
        </section>

        <section className="space-y-3 border-t border-yellow-800/25 pt-4">
          <h2 className={labelClass}>Export</h2>
          <input
            className={inputClass}
            value={rider.qr}
            onChange={(e) => update("qr", e.target.value)}
            placeholder="QR-Code Link"
          />

          <div className="grid grid-cols-2 gap-3">
            <Button onClick={randomizeTraits} className="rounded-xl bg-yellow-500 py-2 text-black hover:bg-yellow-400">
              <Shuffle className="w-4 h-4 mr-2" /> Traits
            </Button>
            <Button onClick={toggleBack} className="rounded-xl bg-zinc-900 py-2 text-yellow-200 hover:bg-zinc-800">
              <RotateCcw className="w-4 h-4 mr-2" /> Drehen
            </Button>
            <Button onClick={downloadPNG} className="rounded-xl bg-zinc-900 py-2 text-yellow-200 hover:bg-zinc-800">
              <Image className="w-4 h-4 mr-2" /> PNG
            </Button>
            <Button onClick={downloadPDF} className="rounded-xl bg-zinc-900 py-2 text-yellow-200 hover:bg-zinc-800">
              <FileText className="w-4 h-4 mr-2" /> PDF
            </Button>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
