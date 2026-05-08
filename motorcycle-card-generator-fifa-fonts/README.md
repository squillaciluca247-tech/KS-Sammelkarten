# Motorrad Club Card Generator

Eine Next.js Web-App für Motorrad-Club Sammelkarten im FIFA-Style.

## Funktionen

- Live Karteneditor
- Foto Upload
- Clublogo Upload
- Regional-Logo Upload
- Bronze / Silber / Gold / Legend
- Zufällige Motorradfahrer-Traits
- Vorder- und Rückseite
- QR-Code
- PNG Export
- PDF Export
- CSV Import
- Druckbogen Vorschau

## Lokal starten

```bash
npm install
npm run dev
```

Dann öffnen:

```text
http://localhost:3000
```

## CSV Beispiel

Datei mit Semikolon `;` trennen:

```csv
Name;Spitzname;Motorrad;Baujahr;Rolle;Ort;Region;Rating;Level;Motto;QR
Michi;RW;Harley Fat Bob;2020;Member;KS Salzburg;Salzburg;89;Legend;Ride hard. Stay loyal.;https://instagram.com/
Tom;DOC;BMW R nineT;2019;Schrauber;Wien;Wien;84;Gold;Built not bought.;https://example.com
```

## Kostenlos veröffentlichen

Am einfachsten über Vercel:

1. Projekt in GitHub hochladen
2. Auf vercel.com importieren
3. Deploy klicken


## Stats Kürzel

- SPD = Speed / Geschwindigkeit
- SKL = Schrauber-Skill
- CRV = Kurvenlage
- SND = Sound
- END = Ausdauer
- STY = Style


## Neu ergänzt

- Booster-Pack-Opening Animation
- Holografischer Glanz-Effekt auf der Karte
- Animierter Karten-Glow
- Namensgröße per Schieberegler


## Änderung

- Animierter Karten-Glow entfernt
- Fahrerfoto wird jetzt mit `object-contain` vollständig angezeigt
- Weiche Farbverläufe integrieren das Foto in die Karte


## Design Update

- Wappen-/Shield-Form wie bei Premium-Fußballkarten
- 9:16 Kartenformat
- Weich integrierte Bildfläche mit Vignette
- Bildregler: Helligkeit, Kontrast, Sättigung, Vignette
- Traits werden nicht mehr abgeschnitten
- Stats und Traits bleiben lesbar


## Neues Layout Update

- Nationalität/Flagge im Editor auswählbar
- Karten-Design-Auswahl mit Farbkacheln
- Wappenrahmen stärker an Premium-Karten angelehnt
- Ornamente oben/unten und seitliche Goldleisten
- Mehrere Hintergrunddesigns: Legend, Neon, Carbon, Platin, Emerald


## Export Fix

- PNG wird jetzt über Blob gespeichert
- PDF bekommt schwarzen Hintergrund statt weißen Hintergrund
- Export wartet auf geladene Fonts
- Export rendert die Karte mit fixer 9:16 Größe


## Schriftarten Update

Neue Premium-Schriften:
- Bebas Neue → Namen & Ratings
- Orbitron → Stats/Zahlen
- Rajdhani → Beschreibungen & UI

Jetzt deutlich näher an FIFA / EA FC Ultimate Team Karten.
