import { Calculator, FileText, Image, RotateCcw, Shuffle, Upload } from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";
import { Rider, csvToRiders, STAT_LABELS } from "@/lib/data";

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
    <Card className="bg-black/70 border border-yellow-700/50 rounded-3xl shadow-2xl">
      <CardContent className="p-5 space-y-4">
        <div>
          <h1 className="text-3xl font-black text-yellow-400">Card Generator</h1>
          <p className="text-zinc-400">Motorrad-Club Sammelkarten im FIFA-Style</p>
        </div>

        <div className="rounded-2xl border border-yellow-700/40 p-3 bg-zinc-950/70">
          <label className="text-sm text-zinc-300 flex items-center gap-2">
            <Upload className="w-4 h-4" /> CSV Import mit ; getrennt
          </label>
          <input type="file" accept=".csv,text/csv" onChange={importCSV} className="mt-2 text-sm" />
          {riders.length > 1 && (
            <select
              className="mt-3 w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700"
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
          <input
            key={key}
            className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700"
            value={(rider as any)[key]}
            placeholder={label}
            onChange={(e) => update(key as keyof Rider, e.target.value)}
          />
        ))}

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            className="p-3 rounded-xl bg-zinc-900 border border-zinc-700"
            value={rider.rating}
            onChange={(e) => update("rating", Number(e.target.value))}
          />
          <select
            className="p-3 rounded-xl bg-zinc-900 border border-zinc-700"
            value={rider.level}
            onChange={(e) => update("level", e.target.value)}
          >
            <option>Bronze</option>
            <option>Silber</option>
            <option>Gold</option>
            <option>Legend</option>
          </select>
        </div>

        <label className="block text-sm text-zinc-300 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-3">
          <div className="flex justify-between">
            <span className="font-bold text-yellow-300">Namensgröße</span>
            <span>{rider.nameSize}px</span>
          </div>
          <input
            type="range"
            min="28"
            max="62"
            value={rider.nameSize}
            onChange={(e) => update("nameSize", Number(e.target.value))}
            className="w-full mt-2"
          />
        </label>

        <Button onClick={calculateRating} className="w-full rounded-2xl bg-yellow-500 text-black hover:bg-yellow-400 py-3">
          <Calculator className="w-4 h-4 mr-2" /> Gesamtwertung automatisch berechnen
        </Button>

        <div className="grid grid-cols-2 gap-3">
          {Object.entries(rider.stats).map(([key, value]) => (
            <label key={key} className="text-sm text-zinc-300 rounded-xl border border-zinc-800 bg-zinc-950/60 p-2">
              <div className="flex justify-between gap-2">
                <span className="font-bold text-yellow-300">{key}</span>
                <span>{value}</span>
              </div>
              <div className="text-[11px] text-zinc-500 mb-1">{STAT_LABELS[key]}</div>
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

        <div className="grid grid-cols-1 gap-3 text-sm">
          <label>Fahrerfoto <input type="file" accept="image/*" onChange={upload(setPhoto)} className="block mt-1" /></label>
          <label>Clublogo <input type="file" accept="image/*" onChange={upload(setClubLogo)} className="block mt-1" /></label>
          <label>Regional-Logo <input type="file" accept="image/*" onChange={upload(setRegionLogo)} className="block mt-1" /></label>
          <input
            className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700"
            value={rider.qr}
            onChange={(e) => update("qr", e.target.value)}
            placeholder="QR-Code Link"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button onClick={randomizeTraits} className="rounded-2xl bg-yellow-500 text-black hover:bg-yellow-400 py-3">
            <Shuffle className="w-4 h-4 mr-2" /> Traits
          </Button>
          <Button onClick={toggleBack} className="rounded-2xl bg-zinc-800 hover:bg-zinc-700 py-3">
            <RotateCcw className="w-4 h-4 mr-2" /> Drehen
          </Button>
          <Button onClick={downloadPNG} className="rounded-2xl bg-zinc-800 hover:bg-zinc-700 py-3">
            <Image className="w-4 h-4 mr-2" /> PNG
          </Button>
          <Button onClick={downloadPDF} className="rounded-2xl bg-zinc-800 hover:bg-zinc-700 py-3">
            <FileText className="w-4 h-4 mr-2" /> PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
