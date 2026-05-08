"use client";

import { useRef, useState } from "react";
import CardPreview from "@/components/CardPreview";
import EditorPanel from "@/components/EditorPanel";
import InfoPanel from "@/components/InfoPanel";
import { DEFAULT_RIDER, Rider, randomTraits } from "@/lib/data";

export default function MotorcycleCardApp() {
  const [rider, setRider] = useState<Rider>(DEFAULT_RIDER);
  const [riders, setRiders] = useState<Rider[]>([DEFAULT_RIDER]);
  const [traits, setTraits] = useState(randomTraits(4));
  const [photo, setPhoto] = useState("");
  const [clubLogo, setClubLogo] = useState("");
  const [regionLogo, setRegionLogo] = useState("");
  const [back, setBack] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const update = (key: keyof Rider, value: any) => setRider((current) => ({ ...current, [key]: value }));
  const updateStat = (key: string, value: number) => {
    setRider((current) => ({ ...current, stats: { ...current.stats, [key]: value } }));
  };

  const calculateRating = () => {
    const values = Object.values(rider.stats);
    update("rating", Math.round(values.reduce((sum, value) => sum + value, 0) / values.length));
  };

  const renderCardCanvas = async () => {
    if (!cardRef.current) return null;
    if (document.fonts?.ready) await document.fonts.ready;

    const html2canvas = (await import("html2canvas")).default;
    return await html2canvas(cardRef.current, {
      backgroundColor: "#050505",
      scale: 3,
      useCORS: true,
      allowTaint: true,
      logging: false,
      imageTimeout: 15000,
      onclone: (doc) => {
        const clonedCard = doc.querySelector("[data-export-card]") as HTMLElement | null;
        if (clonedCard) {
          clonedCard.style.width = "405px";
          clonedCard.style.height = "720px";
          clonedCard.style.maxWidth = "none";
          clonedCard.style.transform = "none";
        }
        doc.body.style.background = "#050505";
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

  const downloadPDF = async () => {
    const canvas = await renderCardCanvas();
    if (!canvas) return;
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: [90, 160], compress: true });
    pdf.setFillColor(5, 5, 5);
    pdf.rect(0, 0, 90, 160, "F");
    pdf.addImage(canvas.toDataURL("image/png", 1.0), "PNG", 0, 0, 90, 160, undefined, "FAST");
    pdf.save(`${rider.name || "sammelkarte"}.pdf`);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_50%_0%,#1b1f26_0%,#070707_48%,#000_100%)] p-4 md:p-8">
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-7 xl:grid-cols-[430px_1fr_330px]">
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
          randomizeTraits={() => setTraits(randomTraits(4))}
          toggleBack={() => setBack((value) => !value)}
          downloadPNG={downloadPNG}
          downloadPDF={downloadPDF}
        />

        <div className="flex items-start justify-center pt-2">
          <CardPreview
            rider={rider}
            traits={traits}
            photo={photo}
            clubLogo={clubLogo}
            regionLogo={regionLogo}
            back={back}
            cardRef={cardRef}
          />
        </div>

        <InfoPanel />
      </div>
    </main>
  );
}
