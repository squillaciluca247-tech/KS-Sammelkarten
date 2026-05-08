# Motorrad Club Card Generator — Premium Card V2

Diese Version ist ein gezielter Neuaufbau nach dem Screenshot.

## Fokus

- Karte ist vollständig sichtbar
- Foto, Stats und Traits liegen vor dem Rahmen
- SVG-Rahmen bleibt stabil
- keine Pack-Animation
- PNG/PDF Export
- Flaggenauswahl
- Designauswahl
- Bildregler

## Vercel

- Application Preset: Next.js
- Install Command: npm install
- Build Command: npm run build
- Output Directory: leer lassen
- Root Directory: leer lassen, wenn package.json direkt sichtbar ist


## Sichtbarkeits-Fix

- SVG-Rahmen liegt jetzt hinter dem Karteninhalt
- Foto, Name, Stats und Traits werden nicht mehr verdeckt
- Hintergrund, Rahmen und Content haben feste Layer


## Hardfix

- SVG hat keine dunklen Füllflächen mehr
- Rahmen ist nur noch Stroke/Deko
- Karteninhalt liegt absolut auf z-[50]
- Rating, Foto, Name, Stats und Traits werden nicht mehr verdeckt


## Flag & Traits Fix

- Flagge wird jetzt als CSS-Grafik gerendert, nicht mehr als Text/Emoji
- Traits sind jetzt einzeilig untereinander angeordnet
- Trait-Text läuft nicht mehr ineinander
- Bildbereich leicht kleiner, damit unten mehr Platz bleibt


## Image Export Fix

- Fahrerfoto wird beim PNG/PDF Export nicht mehr horizontal verzerrt
- Bild nutzt feste CSS-Werte für width, height, objectFit und objectPosition
- html2canvas Export-Skalierung auf 2 reduziert
- foreignObjectRendering aktiviert
