import { QRCodeSVG } from "qrcode.react";
import { Rider, Trait, STAT_LABELS, getDesign } from "@/lib/data";

type Props = {
  rider: Rider;
  traits: Trait[];
  photo: string;
  clubLogo: string;
  regionLogo: string;
  back: boolean;
  cardRef: React.RefObject<HTMLDivElement>;
};

function FlagGraphic({ code }: { code: string }) {
  const box = "h-full w-full";

  switch (code) {
    case "AT":
      return <div className={`${box} grid grid-rows-3`}><div className="bg-red-600" /><div className="bg-white" /><div className="bg-red-600" /></div>;
    case "DE":
      return <div className={`${box} grid grid-rows-3`}><div className="bg-black" /><div className="bg-red-600" /><div className="bg-yellow-400" /></div>;
    case "CH":
      return <div className={`${box} relative bg-red-600`}><div className="absolute left-[42%] top-[22%] h-[56%] w-[16%] bg-white" /><div className="absolute left-[25%] top-[40%] h-[20%] w-[50%] bg-white" /></div>;
    case "IT":
      return <div className={`${box} grid grid-cols-3`}><div className="bg-green-600" /><div className="bg-white" /><div className="bg-red-600" /></div>;
    case "FR":
      return <div className={`${box} grid grid-cols-3`}><div className="bg-blue-700" /><div className="bg-white" /><div className="bg-red-600" /></div>;
    case "ES":
      return <div className={`${box} grid grid-rows-[1fr_2fr_1fr]`}><div className="bg-red-600" /><div className="bg-yellow-400" /><div className="bg-red-600" /></div>;
    case "NL":
      return <div className={`${box} grid grid-rows-3`}><div className="bg-red-600" /><div className="bg-white" /><div className="bg-blue-700" /></div>;
    case "HR":
      return <div className={`${box} grid grid-rows-3`}><div className="bg-red-600" /><div className="bg-white" /><div className="bg-blue-700" /></div>;
    case "SI":
      return <div className={`${box} grid grid-rows-3`}><div className="bg-white" /><div className="bg-blue-700" /><div className="bg-red-600" /></div>;
    case "CZ":
      return <div className={`${box} relative grid grid-rows-2`}><div className="bg-white" /><div className="bg-red-600" /><div className="absolute left-0 top-0 h-full w-1/2 bg-blue-700 [clip-path:polygon(0_0,100%_50%,0_100%)]" /></div>;
    case "HU":
      return <div className={`${box} grid grid-rows-3`}><div className="bg-red-600" /><div className="bg-white" /><div className="bg-green-700" /></div>;
    case "US":
      return <div className={`${box} relative bg-red-600`}><div className="absolute inset-0 grid grid-rows-[repeat(13,1fr)]">{Array.from({ length: 13 }).map((_, i) => <div key={i} className={i % 2 ? "bg-white" : "bg-red-600"} />)}</div><div className="absolute left-0 top-0 h-[54%] w-[45%] bg-blue-800" /></div>;
    default:
      return <div className={`${box} bg-zinc-700`} />;
  }
}

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
        <div className={`absolute inset-[14px] z-0 rounded-[30px] ${design.bg}`} />
        <div className="absolute inset-[14px] z-0 rounded-[30px] bg-[linear-gradient(115deg,transparent_0_20%,rgba(255,255,255,.11)_22%,transparent_30%,transparent_63%,rgba(255,215,0,.10)_66%,transparent_72%)]" />

        <svg className="pointer-events-none absolute inset-0 z-[1] h-full w-full" viewBox="0 0 405 720" preserveAspectRatio="none">
          <defs>
            <linearGradient id="frameMainFlagFix" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={design.border[0]} />
              <stop offset="42%" stopColor={design.border[1]} />
              <stop offset="100%" stopColor={design.border[2]} />
            </linearGradient>
            <filter id="softShadowFlagFix" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity=".65" />
            </filter>
          </defs>

          <path d="M32 90 L70 28 L155 28 L178 10 L203 32 L227 10 L250 28 L335 28 L373 90 L373 590 L340 660 L203 702 L65 660 L32 590 Z" fill="none" stroke="url(#frameMainFlagFix)" strokeWidth="28" filter="url(#softShadowFlagFix)" />
          <path d="M62 108 L90 66 L166 66 L185 51 L203 67 L220 51 L239 66 L315 66 L343 108 L343 558 L317 615 L203 650 L88 615 L62 558 Z" fill="none" stroke="url(#frameMainFlagFix)" strokeWidth="4" opacity=".95" />
          <path d="M96 95 C132 72, 274 72, 310 95" fill="none" stroke={design.border[0]} strokeWidth="3" opacity=".82" />
          <path d="M110 112 C145 96, 260 96, 295 112" fill="none" stroke={design.border[1]} strokeWidth="2" opacity=".7" />
          <path d="M75 180 C52 288, 53 420, 78 535" fill="none" stroke={design.border[0]} strokeWidth="5" opacity=".44" />
          <path d="M330 180 C353 288, 352 420, 327 535" fill="none" stroke={design.border[0]} strokeWidth="5" opacity=".44" />
          <path d="M116 622 C150 646, 256 646, 290 622" fill="none" stroke={design.border[0]} strokeWidth="3" opacity=".78" />
          <circle cx="203" cy="43" r="8" fill={design.border[0]} />
          <circle cx="203" cy="633" r="12" fill={design.border[0]} />
        </svg>

        {!back ? (
          <div className="absolute inset-0 z-[50] flex h-full flex-col px-[58px] pb-[72px] pt-[72px] text-white">
            <div className="absolute left-[58px] top-[84px] z-[60]">
              <div className="text-[58px] font-black leading-none tracking-tight drop-shadow-lg" style={{ color: design.text }}>{rider.rating}</div>
              <div className="text-2xl font-black leading-none drop-shadow-lg">{rider.nickname}</div>
              <div className="mt-3 h-8 w-12 overflow-hidden rounded-sm border border-yellow-700/70 bg-black/55 shadow-lg">
                <FlagGraphic code={rider.nationality} />
              </div>
            </div>

            <div className="absolute right-[60px] top-[82px] z-[60] flex flex-col items-end gap-2">
              {clubLogo && <img src={clubLogo} className="h-12 w-12 object-contain drop-shadow-lg" alt="Clublogo" />}
              {regionLogo && <img src={regionLogo} className="h-12 w-12 object-contain drop-shadow-lg" alt="Regional-Logo" />}
            </div>

            <div className="relative mt-[18px] h-[290px] overflow-hidden rounded-[32px] border border-yellow-700/25 bg-black/25">
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
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050403] via-[#050403]/84 to-transparent" />
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

            <div className="-mt-2 text-center">
              <h2
                className="font-black uppercase leading-none tracking-wide drop-shadow-lg"
                style={{ color: design.text, fontSize: `${rider.nameSize}px` }}
              >
                {rider.name}
              </h2>
              <p className="mt-1 text-[15px] font-semibold text-zinc-100 drop-shadow-md">{rider.bike} · {rider.location}</p>
            </div>

            <div className="mt-3 rounded-2xl border border-yellow-500/55 bg-black/70 px-3 py-2 shadow-[inset_0_0_20px_rgba(0,0,0,.65)]">
              <div className="grid grid-cols-6 gap-1 text-center">
                {Object.entries(rider.stats).map(([key, value]) => (
                  <div key={key} title={STAT_LABELS[key]}>
                    <div className="text-[9px] font-black text-yellow-200">{key}</div>
                    <div className="text-[21px] font-black leading-none" style={{ color: design.text }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-1.5 rounded-2xl border border-yellow-700/45 bg-black/70 p-3 text-[10px] shadow-[inset_0_0_24px_rgba(0,0,0,.7)]">
              {traits.slice(0, 4).map((trait) => (
                <div key={trait.title} className="grid grid-cols-[22px_86px_1fr] items-center gap-2 border-b border-yellow-900/30 last:border-b-0 pb-1 last:pb-0">
                  <div className="text-base">{trait.icon}</div>
                  <div className="font-black uppercase leading-tight" style={{ color: design.text }}>{trait.title}</div>
                  <div className="leading-tight text-zinc-200">{trait.text}</div>
                </div>
              ))}
            </div>

            <div className="mt-auto text-center text-[10px] font-black uppercase tracking-[.18em] drop-shadow-md" style={{ color: design.text }}>
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
