import { Rider, FLAGS, DESIGNS, STAT_LABELS, csvToRiders } from "@/lib/data";

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

const inputClass = "w-full rounded-xl border border-yellow-800/30 bg-black/45 px-3 py-2 text-sm text-white outline-none focus:border-yellow-400";

export default function EditorPanel(props: Props) {
  const {
    rider, riders, setRider, setRiders, update, updateStat, setPhoto, setClubLogo, setRegionLogo,
    calculateRating, randomizeTraits, toggleBack, downloadPNG, downloadPDF
  } = props;

  const uploadImage = (setter: (value: string) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setter(String(reader.result || ""));
    reader.readAsDataURL(file);
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
    <aside className="panel max-h-[calc(100vh-40px)] overflow-auto rounded-3xl p-5 text-white">
      <div className="border-b border-yellow-800/30 pb-4">
        <h1 className="text-3xl font-black text-yellow-300">Karten Editor</h1>
        <p className="text-sm text-zinc-400">Premium Card V2</p>
      </div>

      <div className="mt-5 space-y-4">
        <div className="rounded-2xl border border-yellow-800/25 bg-black/30 p-3">
          <label className="text-sm text-zinc-400">CSV Import</label>
          <input type="file" accept=".csv,text/csv" onChange={importCSV} className="mt-2 block text-xs" />
          {riders.length > 1 && (
            <select className={`${inputClass} mt-3`} onChange={(e) => setRider(riders[Number(e.target.value)])}>
              {riders.map((item, index) => <option key={`${item.name}-${index}`} value={index}>{item.name} · {item.bike}</option>)}
            </select>
          )}
        </div>

        {[
          ["name", "Name"], ["nickname", "Kürzel"], ["bike", "Motorrad"], ["year", "Baujahr"],
          ["role", "Rolle"], ["location", "Ort"], ["region", "Region"], ["motto", "Motto"], ["qr", "QR Link"]
        ].map(([key, label]) => (
          <label key={key} className="grid grid-cols-[90px_1fr] items-center gap-3 text-sm text-zinc-300">
            <span>{label}</span>
            <input className={inputClass} value={(rider as any)[key]} onChange={(e) => update(key as keyof Rider, e.target.value)} />
          </label>
        ))}

        <label className="grid grid-cols-[90px_1fr] items-center gap-3 text-sm text-zinc-300">
          <span>Rating</span>
          <input type="number" className={inputClass} value={rider.rating} onChange={(e) => update("rating", Number(e.target.value))} />
        </label>

        <div>
          <div className="mb-2 text-sm font-bold text-yellow-300">Design</div>
          <div className="grid grid-cols-5 gap-2">
            {DESIGNS.map((design) => (
              <button key={design.id} type="button" title={design.name} onClick={() => update("design", design.id)}
                className={`h-14 rounded-xl border ${design.bg} ${rider.design === design.id ? "border-yellow-300 ring-2 ring-yellow-400" : "border-yellow-800/40"}`} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 text-sm font-bold text-yellow-300">Flagge</div>
          <div className="grid grid-cols-6 gap-2">
            {FLAGS.map((item) => (
              <button key={item.code} type="button" title={item.name} onClick={() => update("nationality", item.code)}
                className={`flex h-11 items-center justify-center rounded-xl border bg-black/40 text-2xl ${rider.nationality === item.code ? "border-yellow-300 ring-2 ring-yellow-400" : "border-yellow-800/40"}`}>
                {item.flag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 text-sm text-zinc-300">
          <label>Fahrerfoto <input type="file" accept="image/*" onChange={uploadImage(setPhoto)} className="mt-1 block text-xs" /></label>
          <label>Clublogo <input type="file" accept="image/*" onChange={uploadImage(setClubLogo)} className="mt-1 block text-xs" /></label>
          <label>Regional-Logo <input type="file" accept="image/*" onChange={uploadImage(setRegionLogo)} className="mt-1 block text-xs" /></label>
        </div>

        {slider("nameSize", "Namensgröße", 28, 56, "px")}
        {slider("imageZoom", "Bild Zoom", 80, 160, "%")}
        {slider("imageX", "Bild X", 0, 100, "%")}
        {slider("imageY", "Bild Y", 0, 100, "%")}
        {slider("imageBrightness", "Helligkeit", 60, 150, "%")}
        {slider("imageContrast", "Kontrast", 70, 160, "%")}
        {slider("imageSaturation", "Sättigung", 40, 160, "%")}
        {slider("vignette", "Vignette", 0, 80, "%")}

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
                <input type="range" min="1" max="99" value={value} onChange={(e) => updateStat(key, Number(e.target.value))} className="w-full" />
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button onClick={randomizeTraits} className="rounded-xl bg-yellow-500 py-3 font-black text-black">Traits würfeln</button>
          <button onClick={toggleBack} className="rounded-xl bg-zinc-800 py-3 font-black text-yellow-200">Drehen</button>
          <button onClick={downloadPNG} className="rounded-xl bg-zinc-800 py-3 font-black text-yellow-200">PNG</button>
          <button onClick={downloadPDF} className="rounded-xl bg-zinc-800 py-3 font-black text-yellow-200">PDF</button>
        </div>
      </div>
    </aside>
  );
}
