import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Rider, Trait } from "@/lib/data";

type Theme = {
  border: string;
  text: string;
};

type Props = {
  rider: Rider;
  traits: Trait[];
  photo: string;
  clubLogo: string;
  regionLogo: string;
  back: boolean;
  theme: Theme;
  cardRef: React.RefObject<HTMLDivElement>;
};

export default function CardPreview({ rider, traits, photo, clubLogo, regionLogo, back, theme, cardRef }: Props) {
  return (
    <div className="flex justify-center">
      <motion.div whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02 }} transition={{ type: "spring", stiffness: 160 }}>
        <div
          ref={cardRef}
          className={`w-[360px] md:w-[430px] aspect-[1080/1600] rounded-[42px] p-[5px] bg-gradient-to-b ${theme.border} shadow-[0_0_80px_rgba(245,197,66,.35)]`}
        >
          <div className="relative h-full rounded-[38px] overflow-hidden bg-black border border-yellow-500/50 p-5">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_55%_22%,rgba(255,210,92,.7),transparent_24%),linear-gradient(135deg,transparent,rgba(255,215,0,.22),transparent)]" />
            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(115deg,transparent_0_14px,rgba(255,215,0,.25)_15px,transparent_17px)]" />

            {!back ? (
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <div className={`text-6xl md:text-7xl font-black ${theme.text}`}>{rider.rating}</div>
                    <div className="text-2xl font-bold">{rider.nickname}</div>
                  </div>
                  <div className="flex gap-2 items-start">
                    {clubLogo && <img src={clubLogo} className="w-14 h-14 object-contain" alt="Clublogo" />}
                    {regionLogo && <img src={regionLogo} className="w-14 h-14 object-contain" alt="Regional-Logo" />}
                  </div>
                </div>

                <div className="mt-3 h-[255px] md:h-[335px] rounded-3xl overflow-hidden border border-yellow-600/70 bg-zinc-900 flex items-center justify-center">
                  {photo ? <img src={photo} className="w-full h-full object-cover" alt="Fahrerfoto" /> : <span className="text-zinc-500">FOTO HOCHLADEN</span>}
                </div>

                <div className="text-center mt-4">
                  <h2 className={`text-4xl md:text-5xl font-black tracking-wider uppercase ${theme.text}`}>{rider.name}</h2>
                  <p className="text-zinc-300">{rider.bike} · {rider.location}</p>
                </div>

                <div className="grid grid-cols-6 gap-1 mt-4 border-y border-yellow-700 py-3 text-center">
                  {Object.entries(rider.stats).map(([k, v]) => (
                    <div key={k}>
                      <div className="text-xs text-yellow-200">{k}</div>
                      <div className={`text-2xl md:text-3xl font-black ${theme.text}`}>{v}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] md:text-xs">
                  {traits.slice(0, 6).map((t) => (
                    <div key={t.title} className="border border-yellow-700/70 rounded-xl p-2 bg-black/60 flex gap-2">
                      <div className="text-xl">{t.icon}</div>
                      <div>
                        <div className={`font-bold uppercase ${theme.text}`}>{t.title}</div>
                        <div className="text-zinc-300">{t.text}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto text-center text-yellow-400 font-bold tracking-[.25em] uppercase text-xs md:text-sm">
                  {rider.motto}
                </div>
              </div>
            ) : (
              <div className="relative z-10 h-full flex flex-col items-center text-center p-4">
                <h2 className={`text-4xl font-black mt-6 uppercase ${theme.text}`}>{rider.name}</h2>
                <p className="text-zinc-300 mt-2">{rider.role} · {rider.region}</p>

                <div className="mt-8 w-full rounded-3xl border border-yellow-700 p-5 bg-black/50 text-left space-y-3">
                  <p><b>Motorrad:</b> {rider.bike}</p>
                  <p><b>Baujahr:</b> {rider.year}</p>
                  <p><b>Ort:</b> {rider.location}</p>
                  <p><b>Level:</b> {rider.level}</p>
                </div>

                <div className="mt-8 bg-white p-3 rounded-2xl">
                  <QRCodeSVG value={rider.qr || "https://example.com"} size={130} />
                </div>

                <p className="mt-auto text-yellow-400 uppercase tracking-widest">{rider.motto}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
