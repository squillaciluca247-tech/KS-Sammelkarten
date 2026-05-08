import { STAT_LABELS } from "@/lib/data";

export default function InfoPanel() {
  return (
    <aside className="space-y-5">
      <section className="panel rounded-3xl p-5 text-white">
        <h2 className="text-2xl font-black text-yellow-300">Stats Erklärung</h2>
        <div className="mt-4 space-y-3">
          {Object.entries(STAT_LABELS).map(([key, label]) => (
            <div key={key} className="grid grid-cols-[52px_1fr] gap-3 rounded-xl border border-yellow-800/30 bg-black/35 p-3">
              <div className="rounded-lg border border-yellow-500/60 py-1 text-center font-black text-yellow-300">{key}</div>
              <div className="text-sm text-zinc-300">{label}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="panel rounded-3xl p-5 text-white">
        <h2 className="text-2xl font-black text-yellow-300">Hinweise</h2>
        <div className="mt-4 space-y-3 text-sm text-zinc-300">
          <p>Diese Version ist auf sichtbare Kartenelemente und stabilen Export ausgelegt.</p>
          <p>Rahmen, Foto, Stats und Traits sind getrennt aufgebaut, damit nichts mehr hinter dem Rahmen verschwindet.</p>
        </div>
      </section>
    </aside>
  );
}
