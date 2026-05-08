import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Rider, Trait, STAT_LABELS } from "@/lib/data";

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
          className={`relative w-[360px] md:w-[430px] aspect-[1080/1600] rounded-[42px] p-[5px] bg-gradient-to-b ${theme.border} shadow-[0_0_48px_rgba(245,197,66,.22)]`}
        >
          <div className="pointer-events-none absolute -inset-1 rounded-[46px] opacity-40 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,.7)_45%,transparent_55%)] animate-holoSweep" />
          <div className="relative h-full rounded-[38px] overflow-hidden bg-[#090604] border border-yellow-500/50 p-5">
            {/* FIFA/Ultimate-Team ähnlicher Kartenhintergrund */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,236,157,.75),transparent_18%),radial-gradient(circle_at_50%_36%,rgba(181,124,26,.45),transparent_34%),linear-gradient(135deg,#050505_0%,#1a1208_42%,#050505_100%)]" />
            <div className="absolute inset-[10px] rounded-[32px] border border-yellow-300/40" />
            <div className="absolute inset-[22px] rounded-[26px] border border-yellow-600/35" />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[82%] h-[46%] opacity-45 bg-[conic-gradient(from_180deg_at_50%_45%,transparent_0deg,rgba(255,215,0,.65)_38deg,transparent_80deg,rgba(255,255,255,.22)_115deg,transparent_155deg,rgba(255,215,0,.55)_210deg,transparent_280deg,rgba(255,215,0,.4)_330deg,transparent_360deg)]" />
            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(115deg,transparent_0_18%,rgba(255,215,0,.28)_19%,transparent_23%,transparent_42%,rgba(255,255,255,.16)_43%,transparent_48%,transparent_70%,rgba(255,215,0,.2)_71%,transparent_76%)]" />
            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(135deg,transparent_0_18px,rgba(255,215,0,.18)_19px,transparent_21px)]" />
            <div className="absolute -bottom-20 -left-12 w-80 h-80 rounded-full bg-yellow-500/10 blur-2xl" />
            <div className="absolute -top-16 -right-12 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

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

                <div className="relative mt-1 h-[285px] md:h-[370px] overflow-visible flex items-center justify-center">
                  <div className="absolute inset-x-2 top-8 h-[82%] rounded-full bg-yellow-400/10 blur-3xl" />
                  {photo ? (
                    <>
                      <img
                        src={photo}
                        className="relative z-10 max-w-[96%] max-h-full object-contain drop-shadow-[0_28px_28px_rgba(0,0,0,.75)]"
                        alt="Fahrerfoto"
                      />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#090604] via-[#090604]/75 to-transparent z-20" />
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#090604]/70 to-transparent z-20" />
                      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#090604]/75 to-transparent z-20" />
                      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#090604]/75 to-transparent z-20" />
                    </>
                  ) : (
                    <div className="relative z-10 w-[92%] h-[86%] rounded-[40px] border border-yellow-700/40 bg-black/35 flex items-center justify-center text-zinc-500">
                      FOTO HOCHLADEN
                    </div>
                  )}
                </div>

                <div className="text-center mt-4">
                  <h2
                    className={`font-black tracking-wider uppercase ${theme.text}`}
                    style={{ fontSize: `${rider.nameSize}px`, lineHeight: 1 }}
                  >
                    {rider.name}
                  </h2>
                  <p className="text-zinc-300">{rider.bike} · {rider.location}</p>
                </div>

                <div className="grid grid-cols-6 gap-1 mt-4 border-y border-yellow-700 py-3 text-center bg-black/30 rounded-xl">
                  {Object.entries(rider.stats).map(([k, v]) => (
                    <div key={k} title={STAT_LABELS[k]}>
                      <div className="text-xs text-yellow-200 font-bold">{k}</div>
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

                <div className="mt-6 w-full rounded-3xl border border-yellow-700 p-5 bg-black/50 text-left space-y-3">
                  <p><b>Motorrad:</b> {rider.bike}</p>
                  <p><b>Baujahr:</b> {rider.year}</p>
                  <p><b>Ort:</b> {rider.location}</p>
                  <p><b>Level:</b> {rider.level}</p>
                </div>

                <div className="mt-4 w-full rounded-3xl border border-yellow-700 p-4 bg-black/50 text-left">
                  <h3 className="text-yellow-300 font-black mb-2">Stats Erklärung</h3>
                  <div className="grid grid-cols-1 gap-1 text-xs text-zinc-300">
                    {Object.entries(STAT_LABELS).map(([key, label]) => (
                      <div key={key}><b className="text-yellow-300">{key}</b> = {label}</div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 bg-white p-3 rounded-2xl">
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
