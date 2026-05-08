import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Rider, Trait, STAT_LABELS, getFlag } from "@/lib/data";

type Theme = {
  border: string;
  text: string;
  background?: string;
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

function CardFrame({ children, cardRef, theme }: { children: React.ReactNode; cardRef: React.RefObject<HTMLDivElement>; theme: Theme }) {
  return (
    <motion.div
      whileHover={{ rotateX: 4, rotateY: -4, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 160 }}
      className="perspective-card"
    >
      <div ref={cardRef} data-export-card className={`premium-shield relative w-[390px] max-w-[92vw] aspect-[9/16] bg-gradient-to-b ${theme.border}`}>
        <div className="absolute inset-0 premium-frame-shine" />
        <div className="shield-inner absolute inset-[8px] overflow-hidden bg-[#060503]">
          <div className={`absolute inset-0 card-bg-${theme.background || "legend"}`} />
          <div className="absolute inset-0 opacity-35 bg-[linear-gradient(120deg,transparent_0_18%,rgba(255,215,0,.25)_19%,transparent_24%,transparent_42%,rgba(255,255,255,.14)_43%,transparent_48%,transparent_70%,rgba(255,215,0,.18)_71%,transparent_76%)]" />
          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(35deg,transparent_0_48%,rgba(255,215,0,.3)_49%,transparent_51%),linear-gradient(145deg,transparent_0_38%,rgba(255,215,0,.22)_39%,transparent_41%)]" />
          <div className="absolute inset-[15px] shield-line border border-yellow-400/45" />
          <div className="absolute left-[9%] right-[9%] top-[2.6%] h-[9%] rounded-t-[70px] border-t-2 border-yellow-200/80" />
          <div className="absolute left-1/2 top-[2px] h-16 w-28 -translate-x-1/2 rounded-b-[42px] border-x-2 border-b-2 border-yellow-300/80 bg-black/20" />
          <div className="absolute left-1/2 top-[15px] -translate-x-1/2 text-xl text-yellow-300 drop-shadow-lg">★</div>
          <div className="absolute bottom-[2.5%] left-1/2 h-16 w-24 -translate-x-1/2 rounded-t-[42px] border-x-2 border-t-2 border-yellow-300/70 bg-black/25" />
          <div className="absolute bottom-[5.7%] left-1/2 -translate-x-1/2 text-2xl text-yellow-300">🏍️</div>
          <div className="absolute left-[2.5%] top-[18%] h-[64%] w-3 rounded-full bg-gradient-to-b from-transparent via-yellow-300/70 to-transparent" />
          <div className="absolute right-[2.5%] top-[18%] h-[64%] w-3 rounded-full bg-gradient-to-b from-transparent via-yellow-300/70 to-transparent" />
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export default function CardPreview({ rider, traits, photo, clubLogo, regionLogo, back, theme, cardRef }: Props) {
  const imageFilter = `brightness(${rider.imageBrightness}%) contrast(${rider.imageContrast}%) saturate(${rider.imageSaturation}%)`;

  return (
    <div className="flex justify-center">
      <CardFrame cardRef={cardRef} theme={theme}>
        {!back ? (
          <div className="relative z-10 flex h-full flex-col px-7 pb-8 pt-8 text-white">
            <div className="absolute left-9 top-14 z-30">
              <div className={`font-title text-[72px] leading-none drop-shadow-xl ${theme.text}`}>{rider.rating}</div>
              <div className="font-title text-4xl leading-none">{rider.nickname}</div>
              <div className="mt-5 text-3xl">🏍️</div>
              <div className="mt-4 flex h-10 w-14 items-center justify-center rounded-md border border-yellow-700/50 bg-black/45 text-3xl shadow-lg">
                {getFlag(rider.nationality)}
              </div>
            </div>

            <div className="absolute right-9 top-10 z-30 flex flex-col items-end gap-2">
              {clubLogo && <img src={clubLogo} className="h-12 w-12 object-contain drop-shadow-xl" alt="Clublogo" />}
              {regionLogo && <img src={regionLogo} className="h-12 w-12 object-contain drop-shadow-xl" alt="Regional-Logo" />}
            </div>

            <div className="relative -mx-2 mt-4 h-[46%] min-h-0 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-full rounded-[40%] bg-yellow-500/10 blur-3xl" />
              {photo ? (
                <>
                  <img
                    src={photo}
                    style={{ filter: imageFilter }}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    alt="Fahrerfoto"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at center, transparent 35%, rgba(6,5,3,${rider.imageVignette / 100}) 78%, rgba(6,5,3,.96) 100%)`
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#060503] via-[#060503]/78 to-transparent" />
                  <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#060503]/65 to-transparent" />
                  <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#060503] to-transparent" />
                  <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#060503] to-transparent" />
                </>
              ) : (
                <div className="absolute inset-8 flex items-center justify-center rounded-[42px] border border-yellow-700/35 bg-black/30 text-zinc-500">
                  FOTO HOCHLADEN
                </div>
              )}
            </div>

            <div className="-mt-3 text-center">
              <h2
                className={`font-title uppercase tracking-[0.08em] drop-shadow-[0_5px_8px_rgba(0,0,0,.9)] ${theme.text}`}
                style={{ fontSize: `${rider.nameSize}px`, lineHeight: 0.95 }}
              >
                {rider.name}
              </h2>
              <p className="font-body mt-2 text-[20px] tracking-wide text-zinc-100 drop-shadow-md">{rider.bike} · {rider.location}</p>
            </div>

            <div className="mt-4 rounded-2xl border border-yellow-500/75 bg-black/55 px-3 py-3 shadow-[inset_0_0_22px_rgba(0,0,0,.8)]">
              <div className="grid grid-cols-6 gap-1 text-center">
                {Object.entries(rider.stats).map(([k, v]) => (
                  <div key={k} title={STAT_LABELS[k]}>
                    <div className="font-tech text-[11px] font-bold text-yellow-200">{k}</div>
                    <div className={`font-tech text-[30px] font-bold leading-none ${theme.text}`}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 rounded-2xl border border-yellow-700/50 bg-black/50 p-4 text-[12px] shadow-[inset_0_0_28px_rgba(0,0,0,.75)]">
              {traits.slice(0, 4).map((t) => (
                <div key={t.title} className="grid grid-cols-[28px_1fr] gap-2">
                  <div className="text-2xl text-yellow-300">{t.icon}</div>
                  <div>
                    <div className={`font-title uppercase leading-tight tracking-wide ${theme.text}`}>{t.title}</div>
                    <div className="mt-0.5 leading-tight text-zinc-200">{t.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto flex justify-center pt-4">
              <div className="rounded-full border border-yellow-500/70 bg-black/60 px-5 py-2 text-2xl text-yellow-300">★</div>
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex h-full flex-col items-center px-8 py-10 text-center">
            <h2 className={`mt-4 text-4xl font-black uppercase ${theme.text}`}>{rider.name}</h2>
            <p className="mt-2 text-zinc-300">{rider.role} · {rider.region}</p>

            <div className="mt-8 w-full rounded-3xl border border-yellow-700/70 bg-black/55 p-5 text-left text-sm leading-relaxed">
              <p><b>Motorrad:</b> {rider.bike}</p>
              <p><b>Baujahr:</b> {rider.year}</p>
              <p><b>Ort:</b> {rider.location}</p>
              <p><b>Level:</b> {rider.level}</p>
            </div>

            <div className="mt-5 w-full rounded-3xl border border-yellow-700/70 bg-black/55 p-4 text-left">
              <h3 className="mb-2 font-black text-yellow-300">Stats Erklärung</h3>
              <div className="grid grid-cols-1 gap-1 text-xs text-zinc-300">
                {Object.entries(STAT_LABELS).map(([key, label]) => (
                  <div key={key}><b className="text-yellow-300">{key}</b> = {label}</div>
                ))}
              </div>
            </div>

            <div className="mt-7 rounded-2xl bg-white p-3">
              <QRCodeSVG value={rider.qr || "https://example.com"} size={130} />
            </div>

            <p className="mt-auto text-sm uppercase tracking-[.25em] text-yellow-400">{rider.motto}</p>
          </div>
        )}
      </CardFrame>
    </div>
  );
}
