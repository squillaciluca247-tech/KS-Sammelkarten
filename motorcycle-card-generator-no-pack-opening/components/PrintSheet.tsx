import { Card, CardContent } from "@/components/ui";
import { Rider } from "@/lib/data";

export default function PrintSheet({ riders }: { riders: Rider[] }) {
  return (
    <Card className="bg-black/60 border border-yellow-700/40 rounded-3xl">
      <CardContent className="p-5">
        <h2 className="text-2xl font-bold text-yellow-400 mb-3">Druckbogen Vorschau</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 opacity-80">
          {riders.slice(0, 8).map((r, i) => (
            <div
              key={`${r.name}-${i}`}
              className="aspect-[1080/1600] rounded-2xl border border-yellow-700 bg-gradient-to-b from-black to-zinc-900 flex flex-col items-center justify-center text-yellow-400 font-bold"
            >
              <span>{r.rating}</span>
              <span>{r.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
