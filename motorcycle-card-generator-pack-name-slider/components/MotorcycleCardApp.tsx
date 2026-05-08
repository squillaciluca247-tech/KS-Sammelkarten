"use client";

import { useMemo, useRef, useState } from "react";
import EditorPanel from "@/components/EditorPanel";
import CardPreview from "@/components/CardPreview";
import PrintSheet from "@/components/PrintSheet";
import { DEFAULT_RIDER, Rider, randomTraits } from "@/lib/data";

export default function MotorcycleCardApp() {
  const [rider, setRider] = useState<Rider>(DEFAULT_RIDER);
  const [riders, setRiders] = useState<Rider[]>([DEFAULT_RIDER]);
  const [photo, setPhoto] = useState("");
  const [clubLogo, setClubLogo] = useState("");
  const [regionLogo, setRegionLogo] = useState("");
  const [back, setBack] = useState(false);
  const [packOpening, setPackOpening] = useState(false);
  const [traits, setTraits] = useState(randomTraits(6));
  const cardRef = useRef<HTMLDivElement>(null);

  const theme = useMemo(() => {
    if (rider.level === "Bronze") return { border: "from-orange-900 via-amber-700 to-orange-950", text: "text-amber-500" };
    if (rider.level === "Silber") return { border: "from-zinc-100 via-zinc-500 to-zinc-950", text: "text-zinc-200" };
    if (rider.level === "Gold") return { border: "from-yellow-300 via-yellow-600 to-yellow-950", text: "text-yellow-300" };
    return { border: "from-yellow-100 via-yellow-500 to-black", text: "text-yellow-300" };
  }, [rider.level]);

  const update = (key: keyof Rider, value: any) => {
    setRider((r) => ({ ...r, [key]: value }));
  };

  const updateStat = (key: string, value: number) => {
    setRider((r) => ({ ...r, stats: { ...r.stats, [key]: value } }));
  };

  const calculateRating = () => {
    const values = Object.values(rider.stats);
    const rating = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    update("rating", rating);
  };

  const downloadPNG = async () => {
    if (!cardRef.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(cardRef.current, { backgroundColor: null, scale: 2 });
    const link = document.createElement("a");
    link.download = `${rider.name || "sammelkarte"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const openPack = () => {
    setPackOpening(true);
    setTimeout(() => setPackOpening(false), 2400);
  };

  const downloadPDF = async () => {
    if (!cardRef.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");
    const canvas = await html2canvas(cardRef.current, { backgroundColor: null, scale: 2 });
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a6" });
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 105, 148);
    pdf.save(`${rider.name || "sammelkarte"}.pdf`);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#2b2109,#030303_55%)] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[430px_1fr] gap-8">
        <EditorPanel
          rider={rider}
          riders={riders}
          setRider={setRider}
          setRiders={setRiders}
          update={update}
          updateStat={updateStat}
          setPhoto={setPhoto}
          setClubLogo={setClubLogo}
          setRegionLogo={setRegionLogo}
          calculateRating={calculateRating}
          randomizeTraits={() => setTraits(randomTraits(6))}
          toggleBack={() => setBack((value) => !value)}
          downloadPNG={downloadPNG}
          downloadPDF={downloadPDF}
        />

        <div className="space-y-6">
          <div className="flex justify-center">
            <button
              onClick={openPack}
              className="rounded-2xl bg-yellow-500 text-black font-black px-6 py-3 hover:bg-yellow-400 transition shadow-lg"
            >
              Booster Pack öffnen
            </button>
          </div>

          <div className="relative">
            {packOpening && (
              <div className="absolute inset-0 z-30 flex items-center justify-center">
                <div className="w-[340px] h-[520px] rounded-[36px] bg-gradient-to-b from-yellow-300 via-yellow-600 to-black border-4 border-yellow-200 shadow-[0_0_120px_rgba(250,204,21,.9)] animate-packReveal flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🏍️</div>
                    <div className="text-4xl font-black text-black uppercase">Legend Pack</div>
                    <div className="text-black/70 font-bold mt-2">Motorrad Club</div>
                  </div>
                </div>
              </div>
            )}
          <CardPreview
            rider={rider}
            traits={traits}
            photo={photo}
            clubLogo={clubLogo}
            regionLogo={regionLogo}
            back={back}
            theme={theme}
            cardRef={cardRef}
          />
          </div>
          <PrintSheet riders={riders} />
        </div>
      </div>
    </main>
  );
}
