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
  const frameId = `frame-${theme.background || "legend"}`;

  return (
    <motion.div
      whileHover={{ rotateX: 4, rotateY: -4, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 160 }}
      className="perspective-card"
    >
      <div
        ref={cardRef}
        data-export-card
        className="relative w-[390px] max-w-[92vw] aspect-[9/16] overflow-hidden rounded-[34px] bg-[#050403] shadow-[0_36px_55px_rgba(0,0,0,.75)]"
      >
        <div className={`absolute inset-[18px] overflow-hidden rounded-[26px] card-bg-${theme.background || "legend"}`} />
        <div className="absolute inset-[18px] rounded-[26px] bg-black/10" />

        <svg
          className="pointer-events-none absolute inset-0 z-20 h-full w-full"
          viewBox="0 0 390 693"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`${frameId}-gold`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff1a8" />
              <stop offset="20%" stopColor="#d7a52f" />
              <stop offset="48%" stopColor="#7a4a07" />
              <stop offset="68%" stopColor="#f8d66a" />
              <stop offset="100%" stopColor="#3a2204" />
            </linearGradient>
            <linearGradient id={`${frameId}-shine`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,.95)" />
              <stop offset="40%" stopColor="rgba(255,215,0,.35)" />
              <stop offset="100%" stopColor="rgba(255,215,0,.08)" />
            </linearGradient>
            <filter id={`${frameId}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#000000" floodOpacity=".6" />
            </filter>
          </defs>

          {/* Stabiler SVG-Wappenrahmen statt CSS clip-path */}
          <path
            d="M50 34 L150 34 L171 11 L195 31 L219 11 L240 34 L340 34 L375 84 L375 582 L345 643 L195 680 L45 643 L15 582 L15 84 Z"
            fill={`url(#${frameId}-gold)`}
            filter={`url(#${frameId}-shadow)`}
          />
          <path
            d="M65 54 L156 54 L176 32 L195 48 L214 32 L234 54 L325 54 L353 95 L353 566 L329 619 L195 652 L61 619 L37 566 L37 95 Z"
            fill="#050403"
            opacity=".96"
          />
          <path
            d="M75 66 L160 66 L179 47 L195 60 L211 47 L230 66 L315 66 L338 102 L338 555 L318 604 L195 634 L72 604 L52 555 L52 102 Z"
            fill="none"
            stroke={`url(#${frameId}-shine)`}
            strokeWidth="3"
            opacity=".9"
          />

          {/* Ornamente */}
          <path d="M106 88 C142 66, 248 66, 284 88" fill="none" stroke="#f6d365" strokeWidth="3" opacity=".8" />
          <path d="M122 106 C150 91, 240 91, 268 106" fill="none" stroke="#9d6b15" strokeWidth="2" opacity=".75" />
          <path d="M74 180 C48 280, 48 410, 74 515" fill="none" stroke="#f6d365" strokeWidth="5" opacity=".55" />
          <path d="M316 180 C342 280, 342 410, 316 515" fill="none" stroke="#f6d365" strokeWidth="5" opacity=".55" />
          <path d="M120 608 C155 631, 235 631, 270 608" fill="none" stroke="#f6d365" strokeWidth="3" opacity=".75" />
          <circle cx="195" cy="42" r="9" fill="#f6d365" opacity=".95" />
          <circle cx="195" cy="617" r="12" fill="#f6d365" opacity=".9" />
        </svg>

        <div className="absolute inset-[44px_38px_40px_38px] z-10">
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
          <div className="relative z-10 flex h-full flex-col text-white">
            <div className="absolute left-0 top-7 z-30">
              <div className={`font-title text-[72px] leading-none drop-shadow-xl ${theme.text}`}>{rider.rating}</div>
              <div className="font-title text-4xl leading-none">{rider.nickname}</div>
              <div className="mt-5 text-3xl">🏍️</div>
              <div className="mt-4 flex h-10 w-14 items-center justify-center rounded-md border border-yellow-700/50 bg-black/45 text-3xl shadow-lg">
                {getFlag(rider.nationality)}
              </div>
            </div>

            <div className="absolute right-0 top-4 z-30 flex flex-col items-end gap-2">
              {clubLogo && <img src={clubLogo} className="h-12 w-12 object-contain drop-shadow-xl" alt="Clublogo" />}
              {regionLogo && <img src={regionLogo} className="h-12 w-12 object-contain drop-shadow-xl" alt="Regional-Logo" />}
            </div>

            <div className="relative -mx-4 mt-8 h-[43%] min-h-0 overflow-hidden">
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

            <div className="-mt-1 text-center">
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
              <p><b>Design:</b> {rider.cardDesign}</p>
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
