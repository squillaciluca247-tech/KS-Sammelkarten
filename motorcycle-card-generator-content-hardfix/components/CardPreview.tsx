import { QRCodeSVG } from "qrcode.react";
import { Rider, Trait, STAT_LABELS, getDesign, getFlag } from "@/lib/data";

type Props = {
  rider: Rider;
  traits: Trait[];
  photo: string;
  clubLogo: string;
  regionLogo: string;
  back: boolean;
  cardRef: React.RefObject<HTMLDivElement>;
};

export default function CardPreview({ rider, traits, photo, clubLogo, regionLogo, back, cardRef }: Props) {
  const design = getDesign(rider.design);
  const filter = `brightness(${rider.imageBrightness}%) contrast(${rider.imageContrast}%) saturate(${rider.imageSaturation}%)`;

  return (
    <div className="flex justify-center">
      <div
        ref={cardRef}
        data-export-card
        className="export-safe card-shadow relative h-[720px] w-[405px] overflow-hidden rounded-[34px] bg-[#050403]"
      >
        {/* Hintergrund */}
        <div className={`absolute inset-[14px] z-0 rounded-[30px] ${design.bg}`} />
        <div className="absolute inset-[14px] z-0 rounded-[30px] bg-[linear-gradient(115deg,transparent_0_20%,rgba(255,255,255,.11)_22%,transparent_30%,transparent_63%,rgba(255,215,0,.10)_66%,transparent_72%)]" />

        {/* Rahmen NUR als Hintergrund/Deko, ohne dunkle Füllflächen über dem Inhalt */}
        <svg
          className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
          viewBox="0 0 405 720"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="frameMainHardfix" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={design.border[0]} />
              <stop offset="42%" stopColor={design.border[1]} />
              <stop offset="100%" stopColor={design.border[2]} />
            </linearGradient>
            <filter id="softShadowHardfix" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity=".65" />
            </filter>
          </defs>

          <path
            d="M32 90 L70 28 L155 28 L178 10 L203 32 L227 10 L250 28 L335 28 L373 90 L373 590 L340 660 L203 702 L65 660 L32 590 Z"
            fill="none"
            stroke="url(#frameMainHardfix)"
            strokeWidth="28"
            filter="url(#softShadowHardfix)"
          />
          <path
            d="M62 108 L90 66 L166 66 L185 51 L203 67 L220 51 L239 66 L315 66 L343 108 L343 558 L317 615 L203 650 L88 615 L62 558 Z"
            fill="none"
            stroke="url(#frameMainHardfix)"
            strokeWidth="4"
            opacity=".95"
          />
          <path d="M96 95 C132 72, 274 72, 310 95" fill="none" stroke={design.border[0]} strokeWidth="3" opacity=".82" />
          <path d="M110 112 C145 96, 260 96, 295 112" fill="none" stroke={design.border[1]} strokeWidth="2" opacity=".7" />
          <path d="M75 180 C52 288, 53 420, 78 535" fill="none" stroke={design.border[0]} strokeWidth="5" opacity=".44" />
          <path d="M330 180 C353 288, 352 420, 327 535" fill="none" stroke={design.border[0]} strokeWidth="5" opacity=".44" />
          <path d="M116 622 C150 646, 256 646, 290 622" fill="none" stroke={design.border[0]} strokeWidth="3" opacity=".78" />
          <circle cx="203" cy="43" r="8" fill={design.border[0]} />
          <circle cx="203" cy="633" r="12" fill={design.border[0]} />
        </svg>

        {/* Karteninhalt IMMER oben */}
        {!back ? (
          <div className="absolute inset-0 z-[50] flex h-full flex-col px-[58px] pb-[70px] pt-[72px] text-white">
            <div className="absolute left-[58px] top-[88px] z-[60]">
              <div className="text-[64px] font-black leading-none tracking-tight drop-shadow-lg" style={{ color: design.text }}>{rider.rating}</div>
              <div className="text-3xl font-black leading-none drop-shadow-lg">{rider.nickname}</div>
              <div className="mt-4 flex h-10 w-14 items-center justify-center rounded-md border border-yellow-700/50 bg-black/55 text-3xl shadow-lg">
                {getFlag(rider.nationality)}
              </div>
            </div>

            <div className="absolute right-[60px] top-[82px] z-[60] flex flex-col items-end gap-2">
              {clubLogo && <img src={clubLogo} className="h-12 w-12 object-contain drop-shadow-lg" alt="Clublogo" />}
              {regionLogo && <img src={regionLogo} className="h-12 w-12 object-contain drop-shadow-lg" alt="Regional-Logo" />}
            </div>

            <div className="relative mt-[22px] h-[318px] overflow-hidden rounded-[32px] border border-yellow-700/25 bg-black/25">
              {photo ? (
                <>
                  <img
                    src={photo}
                    alt="Fahrerfoto"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{
                      filter,
                      transform: `scale(${rider.imageZoom / 100})`,
                      transformOrigin: `${rider.imageX}% ${rider.imageY}%`
                    }}
                  />
                  <div
                    style={{
                      background: `radial-gradient(circle at center, transparent 36%, rgba(5,4,3,${rider.vignette / 100}) 73%, rgba(5,4,3,.98) 100%)`
                    }}
                    className="absolute inset-0"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050403] via-[#050403]/84 to-transparent" />
                  <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#050403]/78 to-transparent" />
                  <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050403]/92 to-transparent" />
                  <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050403]/92 to-transparent" />
                </>
              ) : (
                <div className="flex h-full items-center justify-center rounded-[32px] border border-yellow-700/40 bg-black/35 text-zinc-300">
                  FOTO HOCHLADEN
                </div>
              )}
            </div>

            <div className="-mt-4 text-center">
              <h2
                className="font-black uppercase leading-none tracking-wide drop-shadow-lg"
                style={{ color: design.text, fontSize: `${rider.nameSize}px` }}
              >
                {rider.name}
              </h2>
              <p className="mt-2 text-[17px] font-semibold text-zinc-100 drop-shadow-md">{rider.bike} · {rider.location}</p>
            </div>

            <div className="mt-4 rounded-2xl border border-yellow-500/55 bg-black/70 px-3 py-3 shadow-[inset_0_0_20px_rgba(0,0,0,.65)]">
              <div className="grid grid-cols-6 gap-1 text-center">
                {Object.entries(rider.stats).map(([key, value]) => (
                  <div key={key} title={STAT_LABELS[key]}>
                    <div className="text-[10px] font-black text-yellow-200">{key}</div>
                    <div className="text-[23px] font-black leading-none" style={{ color: design.text }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 rounded-2xl border border-yellow-700/45 bg-black/70 p-4 text-[11px] shadow-[inset_0_0_24px_rgba(0,0,0,.7)]">
              {traits.slice(0, 4).map((trait) => (
                <div key={trait.title} className="grid grid-cols-[25px_1fr] gap-2">
                  <div className="text-xl">{trait.icon}</div>
                  <div>
                    <div className="font-black uppercase leading-tight" style={{ color: design.text }}>{trait.title}</div>
                    <div className="leading-tight text-zinc-200">{trait.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto text-center text-xs font-black uppercase tracking-[.22em] drop-shadow-md" style={{ color: design.text }}>
              {rider.motto}
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 z-[50] flex h-full flex-col items-center px-[62px] py-[82px] text-center text-white">
            <h2 className="text-4xl font-black uppercase" style={{ color: design.text }}>{rider.name}</h2>
            <p className="mt-2 text-zinc-300">{rider.role} · {rider.region}</p>

            <div className="mt-7 w-full rounded-2xl border border-yellow-700/50 bg-black/70 p-4 text-left text-sm">
              <p><b>Motorrad:</b> {rider.bike}</p>
              <p><b>Baujahr:</b> {rider.year}</p>
              <p><b>Ort:</b> {rider.location}</p>
              <p><b>Design:</b> {design.name}</p>
            </div>

            <div className="mt-5 w-full rounded-2xl border border-yellow-700/50 bg-black/70 p-4 text-left text-xs">
              <h3 className="mb-2 font-black" style={{ color: design.text }}>Stats Erklärung</h3>
              {Object.entries(STAT_LABELS).map(([key, label]) => (
                <div key={key}><b style={{ color: design.text }}>{key}</b> = {label}</div>
              ))}
            </div>

            <div className="mt-7 rounded-2xl bg-white p-3">
              <QRCodeSVG value={rider.qr || "https://example.com"} size={122} />
            </div>

            <p className="mt-auto text-xs uppercase tracking-[.22em]" style={{ color: design.text }}>{rider.motto}</p>
          </div>
        )}
      </div>
    </div>
  );
}
