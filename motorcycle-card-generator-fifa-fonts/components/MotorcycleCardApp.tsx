"use client";

import { useMemo, useRef, useState } from "react";
import EditorPanel from "@/components/EditorPanel";
import CardPreview from "@/components/CardPreview";
import PrintSheet from "@/components/PrintSheet";
import { DEFAULT_RIDER, Rider, randomTraits, getCardDesign } from "@/lib/data";

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
    const design = getCardDesign(rider.cardDesign);
    return { border: design.card, text: design.text, background: design.background };
  }, [rider.cardDesign]);

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

  const renderCardCanvas = async () => {
    if (!cardRef.current) return null;

    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    const html2canvas = (await import("html2canvas")).default;

    return await html2canvas(cardRef.current, {
      backgroundColor: "#030303",
      scale: Math.min(3, window.devicePixelRatio || 2),
      useCORS: true,
      allowTaint: true,
      logging: false,
      removeContainer: true,
      imageTimeout: 15000,
      onclone: (clonedDocument) => {
        const clonedCard = clonedDocument.querySelector("[data-export-card]") as HTMLElement | null;
        if (clonedCard) {
          clonedCard.style.transform = "none";
          clonedCard.style.maxWidth = "none";
          clonedCard.style.width = "390px";
          clonedCard.style.height = "693px";
          clonedCard.style.backgroundColor = "#030303";
        }

        clonedDocument.body.style.background = "#030303";
      }
    });
  };

  const downloadPNG = async () => {
    const canvas = await renderCardCanvas();
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `${rider.name || "sammelkarte"}.png`;
      link.href = url;
      link.click();

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, "image/png");
  };

  const openPack = () => {
    setPackOpening(true);
    setTimeout(() => setPackOpening(false), 2400);
  };

  const downloadPDF = async () => {
    const canvas = await renderCardCanvas();
    if (!canvas) return;

    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [90, 160],
      compress: true
    });

    pdf.setFillColor(3, 3, 3);
    pdf.rect(0, 0, 90, 160, "F");

    const imgData = canvas.toDataURL("image/png", 1.0);
    pdf.addImage(imgData, "PNG", 0, 0, 90, 160, undefined, "FAST");
    pdf.save(`${rider.name || "sammelkarte"}.pdf`);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_50%_0%,#18202a_0%,#07090b_45%,#010101_100%)] text-white p-4 md:p-8">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-7 xl:grid-cols-[430px_1fr_360px]">
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
          <PrintSheet riders={riders} />
        </div>

        <aside className="space-y-5">
          <section className="premium-panel rounded-[26px] p-5">
            <h2 className="text-center text-xl font-black uppercase tracking-wide text-yellow-300">Pack Opening</h2>
            <button onClick={openPack} className="mt-5 w-full rounded-2xl border border-yellow-500/50 bg-black/40 p-6 hover:bg-black/65">
              <div className={`mx-auto flex aspect-[9/13] w-44 flex-col items-center justify-center rounded-3xl border-2 border-yellow-400 bg-[linear-gradient(145deg,#050505,#2b1d07,#070707)] shadow-[0_0_38px_rgba(234,179,8,.35)] ${packOpening ? "animate-packReveal" : ""}`}>
                <div className="text-5xl">🏍️</div>
                <div className="mt-5 text-2xl font-black text-yellow-300">LEGENDÄR</div>
                <div className="text-yellow-100">PACK</div>
              </div>
              <div className="mt-5 rounded-xl bg-gradient-to-b from-yellow-300 to-yellow-700 py-3 font-black text-black">PACK ÖFFNEN</div>
            </button>
          </section>

          <section className="premium-panel rounded-[26px] p-5">
            <h2 className="text-center text-xl font-black uppercase tracking-wide text-yellow-300">Stats Erklärung</h2>
            <div className="mt-5 space-y-3">
              {Object.entries({
                SPD: "Speed / Geschwindigkeit",
                SKL: "Schrauber-Skill",
                CRV: "Kurvenlage",
                SND: "Sound",
                END: "Ausdauer",
                STY: "Style"
              }).map(([key, value]) => (
                <div key={key} className="grid grid-cols-[52px_1fr] gap-3 rounded-xl border border-yellow-800/30 bg-black/35 p-3">
                  <div className="rounded-lg border border-yellow-500/60 py-1 text-center font-black text-yellow-300">{key}</div>
                  <div className="text-sm text-zinc-300">{value}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="premium-panel rounded-[26px] p-5">
            <h2 className="text-lg font-black uppercase text-yellow-300">Features</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-zinc-300">
              <div>✍️ Individuelle Karten erstellen</div>
              <div>🎁 Pack Opening Animation</div>
              <div>⬇️ PNG & PDF Export</div>
              <div>📱 Mobil optimiert</div>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}

