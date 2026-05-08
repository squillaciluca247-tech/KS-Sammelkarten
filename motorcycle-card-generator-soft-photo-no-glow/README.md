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
