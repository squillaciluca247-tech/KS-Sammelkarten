"use client";

import { useEffect, useRef, useState } from "react";
import { CARD_H, CARD_W, drawCard } from "@/lib/drawCard";
import { DEFAULT_RIDER, DESIGNS, FLAGS, Rider, STAT_LABELS, Trait, csvToRiders, randomTraits } from "@/lib/cardData";

function loadImageFromFile(file: File): Promise<{ url: string; image: HTMLImageElement }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => resolve({ url, image });
    image.onerror = reject;
    image.src = url;
  });
}

export default function MotorcycleCardApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [rider, setRider] = useState<Rider>(DEFAULT_RIDER);
  const [riders, setRiders] = useState<Rider[]>([DEFAULT_RIDER]);
  const [traits, setTraits] = useState<Trait[]>(randomTraits(4));
  const [side, setSide] = useState<"front" | "back">("front");
  const [photo, setPhoto] = useState<HTMLImageElement | null>(null);
  const [regionLogo, setRegionLogo] = useState<HTMLImageElement | null>(null);

  const update = (key: keyof Rider, value: any) => setRider((current) => ({ ...current, [key]: value }));
  const updateStat = (key: string, value: number) => setRider((current) => ({ ...current, stats: { ...current.stats, [key]: value } }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = CARD_W;
    canvas.height = CARD_H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawCard(ctx, { rider, traits, photo, clubLogo: null, regionLogo, side });
  }, [rider, traits, photo, regionLogo, side]);

  const uploadImage = (setter: (img: HTMLImageElement | null) => void) => async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const { image } = await loadImageFromFile(file);
    setter(image);
  };

  const importCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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

  const calculateRating = () => {
    const values = Object.values(rider.stats);
    update("rating", Math.round(values.reduce((sum, value) => sum + value, 0) / values.length));
  };

  const generateMotto = () => {
    const mottos = [
      "KNIESCHLEIFER AUS ÜBERZEUGUNG",
      "RIDE HARD STAY LOYAL",
      "ASPHALT IM BLUT",
      "FREIHEIT AUF ZWEI RÄDERN",
      "LAUT STARK UNAUFHALTSAM",
      "BORN TO RIDE"
    ];
    update("motto", mottos[Math.floor(Math.random() * mottos.length)]);
  };

  const downloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${rider.name || "sammelkarte"}.png`;
    link.href = canvas.toDataURL("image/png", 1);
    link.click();
  };

  const downloadJPEG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${rider.name || "sammelkarte"}.jpg`;
    link.href = canvas.toDataURL("image/jpeg", 0.95);
    link.click();
  };

  const downloadPDF = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: [90, 160], compress: true });
    pdf.addImage(canvas.toDataURL("image/png", 1), "PNG", 0, 0, 90, 160, undefined, "FAST");
    pdf.save(`${rider.name || "sammelkarte"}.pdf`);
  };

  const slider = (key: keyof Rider, label: string, min: number, max: number, suffix = "") => (
    <label className="block rounded-xl border border-yellow-800/20 bg-black/25 p-3 text-sm">
      <div className="flex justify-between text-zinc-300">
        <span className="font-bold text-yellow-300">{label}</span>
        <span>{String(rider[key])}{suffix}</span>
      </div>
      <input className="mt-2 w-full" type="range" min={min} max={max} value={Number(rider[key])} onChange={(e) => update(key, Number(e.target.value))} />
    </label>
  );

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_50%_0%,#17202b_0%,#070707_48%,#000_100%)] p-4 md:p-8">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-7 xl:grid-cols-[430px_1fr_330px]">
        <aside className="panel max-h-[calc(100vh-40px)] overflow-auto rounded-3xl p-5">
          <div className="border-b border-yellow-800/30 pb-4">
            <h1 className="text-3xl font-black text-yellow-300">Karten Editor</h1>
            <p className="text-sm text-zinc-400">Canvas Version · Vorschau = Export</p>
          </div>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-yellow-800/25 bg-black/30 p-3">
              <label className="text-sm text-zinc-400">CSV Import</label>
              <input type="file" accept=".csv,text/csv" onChange={importCSV} className="mt-2 block text-xs" />
              {riders.length > 1 && (
                <select className="input mt-3" onChange={(e) => setRider(riders[Number(e.target.value)])}>
                  {riders.map((item, index) => <option key={`${item.name}-${index}`} value={index}>{item.name} · {item.bike}</option>)}
                </select>
              )}
            </div>

            {[
              ["name", "Name"], ["nickname", "Kürzel"], ["bike", "Motorrad"], ["year", "Baujahr"],
              ["role", "Rolle"], ["location", "Ort"], ["region", "Region"], ["subtitle", "Untertitel"],
              ["motto", "Motto"], ["qr", "QR Link"]
            ].map(([key, label]) => (
              <label key={key} className="grid grid-cols-[96px_1fr] items-center gap-3 text-sm text-zinc-300">
                <span>{label}</span>
                <input className="input" value={(rider as any)[key]} onChange={(e) => update(key as keyof Rider, e.target.value)} />
              </label>
            ))}

            <label className="grid grid-cols-[96px_1fr] items-center gap-3 text-sm text-zinc-300">
              <span>Rating</span>
              <input type="number" className="input" value={rider.rating} onChange={(e) => update("rating", Number(e.target.value))} />
            </label>

            <div>
              <div className="mb-2 text-sm font-bold text-yellow-300">Seltenheitsgrad / Design</div>
              <div className="grid grid-cols-5 gap-2">
                {DESIGNS.map((design) => (
                  <button
                    key={design.id}
                    type="button"
                    title={design.name}
                    onClick={() => update("design", design.id)}
                    className={`h-16 rounded-xl border ${rider.design === design.id ? "border-yellow-300 ring-2 ring-yellow-400" : "border-yellow-800/40"}`}
                    style={{ background: `linear-gradient(135deg, ${design.colors[0]}, ${design.colors[1]}, ${design.colors[3]})` }}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm font-bold text-yellow-300">Flagge</div>
              <div className="grid grid-cols-6 gap-2">
                {FLAGS.map((item) => (
                  <button key={item.code} type="button" title={item.name} onClick={() => update("nationality", item.code)}
                    className={`h-10 rounded-xl border bg-black/40 text-sm font-black ${rider.nationality === item.code ? "border-yellow-300 ring-2 ring-yellow-400" : "border-yellow-800/40"}`}>
                    {item.code}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 text-sm text-zinc-300">
              <label>Fahrerfoto <input type="file" accept="image/*" onChange={uploadImage(setPhoto)} className="mt-1 block text-xs" /></label>
              <label>Regional-Logo <input type="file" accept="image/*" onChange={uploadImage(setRegionLogo)} className="mt-1 block text-xs" /></label>
            </div>

            {slider("nameSize", "Namensgröße", 44, 100, "px")}
            {slider("mottoSize", "Motto Größe", 14, 38, "px")}
            {slider("regionLogoX", "Regional-Logo X", 560, 760, "px")}
            {slider("regionLogoY", "Regional-Logo Y", 180, 420, "px")}
            {slider("regionLogoW", "Regional-Logo Breite", 40, 180, "px")}
            {slider("regionLogoH", "Regional-Logo Höhe", 40, 180, "px")}
            {slider("imageZoom", "Bild Zoom", 70, 180, "%")}
            {slider("imageX", "Bild X", 0, 100, "%")}
            {slider("imageY", "Bild Y", 0, 100, "%")}
            {slider("imageBrightness", "Helligkeit", 50, 160, "%")}
            {slider("imageContrast", "Kontrast", 60, 180, "%")}
            {slider("imageSaturation", "Sättigung", 40, 180, "%")}
            {slider("vignette", "Vignette", 0, 90, "%")}

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-bold text-yellow-300">Stats</span>
                <button onClick={calculateRating} className="rounded-lg bg-yellow-500 px-3 py-1 text-xs font-bold text-black">Rating berechnen</button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(rider.stats).map(([key, value]) => (
                  <label key={key} className="rounded-xl border border-yellow-800/20 bg-black/25 p-2 text-xs">
                    <div className="flex justify-between"><span className="font-black text-yellow-300">{key}</span><span>{value}</span></div>
                    <div className="truncate text-[10px] text-zinc-500">{STAT_LABELS[key]}</div>
                    <input type="range" min="1" max="200" value={value} onChange={(e) => updateStat(key, Number(e.target.value))} className="w-full" />
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button onClick={() => setTraits(randomTraits(4))} className="btn btn-gold">Traits würfeln</button>
              <button onClick={generateMotto} className="btn btn-gold">Motto</button>
              <button onClick={() => setSide(side === "front" ? "back" : "front")} className="btn btn-dark">Drehen</button>
              <button onClick={downloadPNG} className="btn btn-dark">PNG</button>
              <button onClick={downloadJPEG} className="btn btn-dark">JPEG</button>
              <button onClick={downloadPDF} className="btn btn-dark">PDF</button>
            </div>
          </div>
        </aside>

        <section className="flex items-start justify-center pt-2">
          <canvas ref={canvasRef} className="card-canvas" width={CARD_W} height={CARD_H} />
        </section>

        <aside className="space-y-5">
          <section className="panel rounded-3xl p-5">
            <h2 className="text-2xl font-black text-yellow-300">Stats Erklärung</h2>
            <div className="mt-4 space-y-3">
              {Object.entries(STAT_LABELS).map(([key, label]) => (
                <div key={key} className="grid grid-cols-[52px_1fr] gap-3 rounded-xl border border-yellow-800/30 bg-black/35 p-3">
                  <div className="rounded-lg border border-yellow-500/60 py-1 text-center font-black text-yellow-300">{key}</div>
                  <div className="text-sm text-zinc-300">{label}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="panel rounded-3xl p-5">
            <h2 className="text-2xl font-black text-yellow-300">Warum Canvas?</h2>
            <div className="mt-4 space-y-3 text-sm text-zinc-300">
              <p>Die Karte wird direkt gezeichnet. Dadurch ist die Vorschau exakt dieselbe Datei wie PNG, JPEG und PDF.</p>
              <p>Keine schwarzen Exporte, keine verzerrten Fotos, kein Screenshot-Rendering.</p>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
