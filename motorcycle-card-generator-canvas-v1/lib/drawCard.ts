import { Rider, Trait, getDesign } from "@/lib/cardData";

export const CARD_W = 900;
export const CARD_H = 1600;

type DrawOptions = {
  rider: Rider;
  traits: Trait[];
  photo?: HTMLImageElement | null;
  clubLogo?: HTMLImageElement | null;
  regionLogo?: HTMLImageElement | null;
  side: "front" | "back";
};

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function framePath(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.moveTo(72, 198);
  ctx.lineTo(145, 72);
  ctx.lineTo(342, 72);
  ctx.lineTo(394, 26);
  ctx.lineTo(450, 73);
  ctx.lineTo(506, 26);
  ctx.lineTo(558, 72);
  ctx.lineTo(755, 72);
  ctx.lineTo(828, 198);
  ctx.lineTo(828, 1295);
  ctx.lineTo(752, 1446);
  ctx.lineTo(450, 1538);
  ctx.lineTo(148, 1446);
  ctx.lineTo(72, 1295);
  ctx.closePath();
}

function innerPath(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.moveTo(120, 228);
  ctx.lineTo(185, 115);
  ctx.lineTo(360, 115);
  ctx.lineTo(405, 78);
  ctx.lineTo(450, 116);
  ctx.lineTo(495, 78);
  ctx.lineTo(540, 115);
  ctx.lineTo(715, 115);
  ctx.lineTo(780, 228);
  ctx.lineTo(780, 1260);
  ctx.lineTo(710, 1397);
  ctx.lineTo(450, 1475);
  ctx.lineTo(190, 1397);
  ctx.lineTo(120, 1260);
  ctx.closePath();
}

function polygonBackground(ctx: CanvasRenderingContext2D, color: string) {
  ctx.save();
  ctx.globalAlpha = 0.34;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.4;
  const pts = [
    [130,160],[320,130],[520,170],[730,120],[800,310],[630,390],[760,560],
    [520,520],[455,690],[310,600],[150,760],[370,850],[690,780],[780,1000],
    [550,1100],[720,1280],[450,1440],[180,1320],[310,1130],[120,1020]
  ];
  for (let i = 0; i < pts.length - 2; i++) {
    ctx.beginPath();
    ctx.moveTo(pts[i][0], pts[i][1]);
    ctx.lineTo(pts[i+1][0], pts[i+1][1]);
    ctx.lineTo(pts[i+2][0], pts[i+2][1]);
    ctx.stroke();
  }
  ctx.restore();
}

function drawFrame(ctx: CanvasRenderingContext2D, rider: Rider) {
  const d = getDesign(rider.design);

  ctx.save();
  framePath(ctx);
  const grad = ctx.createLinearGradient(80, 0, 840, 1600);
  grad.addColorStop(0, d.colors[0]);
  grad.addColorStop(0.3, d.colors[1]);
  grad.addColorStop(0.62, d.colors[2]);
  grad.addColorStop(1, d.colors[0]);
  ctx.fillStyle = grad;
  ctx.shadowColor = "rgba(0,0,0,.85)";
  ctx.shadowBlur = 36;
  ctx.shadowOffsetY = 22;
  ctx.fill();

  innerPath(ctx);
  ctx.fillStyle = "#050403";
  ctx.shadowColor = "transparent";
  ctx.fill();

  ctx.lineWidth = 7;
  ctx.strokeStyle = d.colors[0];
  innerPath(ctx);
  ctx.stroke();

  ctx.lineWidth = 3;
  ctx.globalAlpha = 0.7;
  ctx.strokeStyle = d.colors[1];
  ctx.beginPath();
  ctx.moveTo(210, 190);
  ctx.bezierCurveTo(310, 140, 590, 140, 690, 190);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(235, 225);
  ctx.bezierCurveTo(330, 190, 570, 190, 665, 225);
  ctx.stroke();

  ctx.globalAlpha = 0.45;
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.moveTo(155, 390);
  ctx.bezierCurveTo(110, 650, 110, 950, 165, 1205);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(745, 390);
  ctx.bezierCurveTo(790, 650, 790, 950, 735, 1205);
  ctx.stroke();

  ctx.globalAlpha = 0.9;
  ctx.fillStyle = d.colors[0];
  ctx.beginPath();
  ctx.arc(450, 103, 17, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(450, 1372, 24, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawBase(ctx: CanvasRenderingContext2D, rider: Rider) {
  const d = getDesign(rider.design);
  ctx.clearRect(0, 0, CARD_W, CARD_H);

  const bg = ctx.createRadialGradient(450, 150, 10, 450, 750, 900);
  bg.addColorStop(0, d.bg1);
  bg.addColorStop(0.42, d.bg2);
  bg.addColorStop(1, "#020202");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  ctx.save();
  innerPath(ctx);
  ctx.clip();

  const glow = ctx.createRadialGradient(450, 150, 20, 450, 360, 650);
  glow.addColorStop(0, "rgba(255,235,150,.55)");
  glow.addColorStop(0.28, "rgba(255,205,80,.18)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(70, 70, 760, 1380);

  polygonBackground(ctx, d.colors[0]);

  ctx.restore();
  drawFrame(ctx, rider);
}

function drawFlag(ctx: CanvasRenderingContext2D, code: string, x: number, y: number, w: number, h: number) {
  ctx.save();
  roundRect(ctx, x, y, w, h, 6);
  ctx.clip();
  ctx.fillStyle = "#222";
  ctx.fillRect(x, y, w, h);

  const stripeH = h / 3;
  const stripeW = w / 3;

  if (code === "AT") {
    ctx.fillStyle = "#d71920"; ctx.fillRect(x,y,w,stripeH); ctx.fillRect(x,y+stripeH*2,w,stripeH);
    ctx.fillStyle = "#fff"; ctx.fillRect(x,y+stripeH,w,stripeH);
  } else if (code === "DE") {
    ctx.fillStyle = "#000"; ctx.fillRect(x,y,w,stripeH);
    ctx.fillStyle = "#dd0000"; ctx.fillRect(x,y+stripeH,w,stripeH);
    ctx.fillStyle = "#ffce00"; ctx.fillRect(x,y+stripeH*2,w,stripeH);
  } else if (code === "CH") {
    ctx.fillStyle = "#d52b1e"; ctx.fillRect(x,y,w,h);
    ctx.fillStyle = "#fff"; ctx.fillRect(x+w*.42,y+h*.18,w*.16,h*.64); ctx.fillRect(x+w*.22,y+h*.40,w*.56,h*.20);
  } else if (code === "IT") {
    ctx.fillStyle = "#009246"; ctx.fillRect(x,y,stripeW,h);
    ctx.fillStyle = "#fff"; ctx.fillRect(x+stripeW,y,stripeW,h);
    ctx.fillStyle = "#ce2b37"; ctx.fillRect(x+stripeW*2,y,stripeW,h);
  } else if (code === "FR") {
    ctx.fillStyle = "#0055a4"; ctx.fillRect(x,y,stripeW,h);
    ctx.fillStyle = "#fff"; ctx.fillRect(x+stripeW,y,stripeW,h);
    ctx.fillStyle = "#ef4135"; ctx.fillRect(x+stripeW*2,y,stripeW,h);
  } else if (code === "ES") {
    ctx.fillStyle = "#aa151b"; ctx.fillRect(x,y,w,h);
    ctx.fillStyle = "#f1bf00"; ctx.fillRect(x,y+h*.25,w,h*.5);
  } else if (code === "NL") {
    ctx.fillStyle = "#ae1c28"; ctx.fillRect(x,y,w,stripeH);
    ctx.fillStyle = "#fff"; ctx.fillRect(x,y+stripeH,w,stripeH);
    ctx.fillStyle = "#21468b"; ctx.fillRect(x,y+stripeH*2,w,stripeH);
  } else if (code === "CZ") {
    ctx.fillStyle = "#fff"; ctx.fillRect(x,y,w,h/2);
    ctx.fillStyle = "#d7141a"; ctx.fillRect(x,y+h/2,w,h/2);
    ctx.fillStyle = "#11457e"; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+w*.52,y+h/2); ctx.lineTo(x,y+h); ctx.closePath(); ctx.fill();
  } else if (code === "HU") {
    ctx.fillStyle = "#ce2939"; ctx.fillRect(x,y,w,stripeH);
    ctx.fillStyle = "#fff"; ctx.fillRect(x,y+stripeH,w,stripeH);
    ctx.fillStyle = "#477050"; ctx.fillRect(x,y+stripeH*2,w,stripeH);
  } else if (code === "SI" || code === "HR") {
    ctx.fillStyle = "#fff"; ctx.fillRect(x,y,w,stripeH);
    ctx.fillStyle = "#005da4"; ctx.fillRect(x,y+stripeH,w,stripeH);
    ctx.fillStyle = "#ed1c24"; ctx.fillRect(x,y+stripeH*2,w,stripeH);
  } else if (code === "US") {
    for (let i=0; i<13; i++) {
      ctx.fillStyle = i % 2 ? "#fff" : "#b22234";
      ctx.fillRect(x, y + (h/13)*i, w, h/13);
    }
    ctx.fillStyle = "#3c3b6e"; ctx.fillRect(x,y,w*.45,h*.54);
  } else {
    ctx.fillStyle = "#444"; ctx.fillRect(x,y,w,h);
  }

  ctx.restore();
  ctx.strokeStyle = "rgba(0,0,0,.6)";
  ctx.lineWidth = 2;
  roundRect(ctx, x, y, w, h, 6);
  ctx.stroke();
}

function drawIcon(ctx: CanvasRenderingContext2D, icon: string, x: number, y: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (icon === "bolt") {
    ctx.beginPath(); ctx.moveTo(x+20,y); ctx.lineTo(x,y+34); ctx.lineTo(x+22,y+30); ctx.lineTo(x+9,y+62); ctx.lineTo(x+42,y+22); ctx.lineTo(x+20,y+26); ctx.closePath(); ctx.fill();
  } else if (icon === "sound") {
    ctx.beginPath(); ctx.moveTo(x,y+22); ctx.lineTo(x+15,y+22); ctx.lineTo(x+32,y+8); ctx.lineTo(x+32,y+54); ctx.lineTo(x+15,y+40); ctx.lineTo(x,y+40); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.arc(x+35,y+31,16,-.7,.7); ctx.stroke();
  } else if (icon === "target") {
    ctx.beginPath(); ctx.arc(x+24,y+30,24,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.arc(x+24,y+30,9,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x+24,y); ctx.lineTo(x+24,y+60); ctx.moveTo(x-6,y+30); ctx.lineTo(x+54,y+30); ctx.stroke();
  } else if (icon === "shield") {
    ctx.beginPath(); ctx.moveTo(x+24,y); ctx.lineTo(x+48,y+12); ctx.lineTo(x+43,y+44); ctx.lineTo(x+24,y+62); ctx.lineTo(x+5,y+44); ctx.lineTo(x,y+12); ctx.closePath(); ctx.stroke();
  } else if (icon === "wrench") {
    ctx.font = "48px Arial"; ctx.fillText("🔧", x-4, y+48);
  } else if (icon === "wolf") {
    ctx.font = "48px Arial"; ctx.fillText("🐺", x-4, y+48);
  } else if (icon === "crown") {
    ctx.font = "48px Arial"; ctx.fillText("👑", x-4, y+48);
  } else {
    ctx.font = "48px Arial"; ctx.fillText("🔥", x-4, y+48);
  }
  ctx.restore();
}

function drawTextFit(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, fontSize: number, color: string, align: CanvasTextAlign = "left") {
  let size = fontSize;
  ctx.textAlign = align;
  ctx.font = `900 ${size}px Impact, Arial Black, Arial`;
  while (ctx.measureText(text).width > maxW && size > 18) {
    size -= 2;
    ctx.font = `900 ${size}px Impact, Arial Black, Arial`;
  }
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function drawWrapped(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lineHeight: number, maxLines = 2) {
  const words = text.split(" ");
  let line = "";
  let lines: string[] = [];
  for (const word of words) {
    const test = line ? line + " " + word : word;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  lines = lines.slice(0, maxLines);
  lines.forEach((l, i) => ctx.fillText(l, x, y + i * lineHeight));
}

function drawImageArea(ctx: CanvasRenderingContext2D, rider: Rider, photo?: HTMLImageElement | null) {
  const x = 142, y = 238, w = 616, h = 560;
  ctx.save();
  roundRect(ctx, x, y, w, h, 42);
  ctx.clip();

  const grad = ctx.createLinearGradient(x, y, x, y+h);
  grad.addColorStop(0, "#333");
  grad.addColorStop(.55, "#111");
  grad.addColorStop(1, "#050403");
  ctx.fillStyle = grad;
  ctx.fillRect(x, y, w, h);

  if (photo) {
    ctx.filter = `brightness(${rider.imageBrightness}%) contrast(${rider.imageContrast}%) saturate(${rider.imageSaturation}%)`;

    const scale = rider.imageZoom / 100;
    const cover = Math.max(w / photo.width, h / photo.height) * scale;
    const dw = photo.width * cover;
    const dh = photo.height * cover;
    const px = x + (w - dw) * (rider.imageX / 100);
    const py = y + (h - dh) * (rider.imageY / 100);
    ctx.drawImage(photo, px, py, dw, dh);
    ctx.filter = "none";
  } else {
    ctx.fillStyle = "#777";
    ctx.font = "900 34px Arial";
    ctx.textAlign = "center";
    ctx.fillText("FOTO HOCHLADEN", x + w/2, y + h/2);
  }

  const vg = ctx.createRadialGradient(x+w/2, y+h/2, 80, x+w/2, y+h/2, Math.max(w,h)*.62);
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(0.72, `rgba(0,0,0,${rider.vignette/100})`);
  vg.addColorStop(1, "rgba(0,0,0,.88)");
  ctx.fillStyle = vg;
  ctx.fillRect(x, y, w, h);

  const bottom = ctx.createLinearGradient(x, y+h-180, x, y+h);
  bottom.addColorStop(0, "rgba(5,4,3,0)");
  bottom.addColorStop(1, "rgba(5,4,3,.96)");
  ctx.fillStyle = bottom;
  ctx.fillRect(x, y+h-180, w, 180);

  ctx.restore();

  ctx.strokeStyle = "rgba(248,214,106,.35)";
  ctx.lineWidth = 2;
  roundRect(ctx, x, y, w, h, 42);
  ctx.stroke();
}

function drawFront(ctx: CanvasRenderingContext2D, rider: Rider, traits: Trait[], photo?: HTMLImageElement | null, clubLogo?: HTMLImageElement | null, regionLogo?: HTMLImageElement | null) {
  const d = getDesign(rider.design);
  drawBase(ctx, rider);
  drawImageArea(ctx, rider, photo);

  ctx.save();
  ctx.textBaseline = "alphabetic";

  ctx.fillStyle = d.text;
  ctx.textAlign = "left";
  ctx.font = "900 118px Impact, Arial Black, Arial";
  ctx.shadowColor = "rgba(0,0,0,.7)";
  ctx.shadowBlur = 8;
  ctx.fillText(String(rider.rating), 145, 345);

  ctx.fillStyle = "#fff";
  ctx.font = "900 58px Impact, Arial Black, Arial";
  ctx.fillText(rider.nickname.toUpperCase(), 148, 410);

  drawFlag(ctx, rider.nationality, 148, 455, 92, 56);

  if (clubLogo) ctx.drawImage(clubLogo, 660, 250, 88, 88);
  if (regionLogo) ctx.drawImage(regionLogo, 660, 345, 88, 88);

  ctx.shadowBlur = 0;
  drawTextFit(ctx, rider.name.toUpperCase(), 450, 905, 650, rider.nameSize, d.text, "center");

  ctx.fillStyle = "#f8fafc";
  ctx.font = "600 35px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`${rider.bike} · ${rider.location}`, 450, 958);

  ctx.fillStyle = "#e5e7eb";
  ctx.font = "500 28px Arial";
  ctx.fillText(rider.subtitle, 450, 1002);

  roundRect(ctx, 135, 1040, 630, 130, 26);
  ctx.fillStyle = "rgba(0,0,0,.72)";
  ctx.fill();
  ctx.strokeStyle = "rgba(248,214,106,.75)";
  ctx.lineWidth = 2;
  ctx.stroke();

  const entries = Object.entries(rider.stats);
  entries.forEach(([key, value], i) => {
    const cx = 165 + i * 102;
    ctx.textAlign = "center";
    ctx.fillStyle = "#f8e7a1";
    ctx.font = "900 27px Arial";
    ctx.fillText(key, cx, 1090);
    ctx.fillStyle = d.text;
    ctx.font = "900 47px Impact, Arial Black, Arial";
    ctx.fillText(String(value), cx, 1145);
  });

  roundRect(ctx, 135, 1210, 630, 220, 26);
  ctx.fillStyle = "rgba(0,0,0,.72)";
  ctx.fill();
  ctx.strokeStyle = "rgba(248,214,106,.45)";
  ctx.stroke();

  traits.slice(0,4).forEach((trait, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 165 + col * 310;
    const y = 1255 + row * 88;
    drawIcon(ctx, trait.icon, x-45, y-42, d.text);
    ctx.textAlign = "left";
    ctx.fillStyle = d.text;
    ctx.font = "900 28px Arial";
    ctx.fillText(trait.title.toUpperCase(), x+20, y-12);
    ctx.fillStyle = "#e5e7eb";
    ctx.font = "500 23px Arial";
    drawWrapped(ctx, trait.text, x+20, y+18, 230, 27, 2);
  });

  ctx.textAlign = "center";
  ctx.font = "900 27px Arial";
  ctx.fillStyle = d.text;
  ctx.letterSpacing = "4px" as any;
  ctx.fillText(rider.motto.toUpperCase(), 450, 1490);

  ctx.restore();
}

function drawQrLike(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, size: number) {
  ctx.save();
  ctx.fillStyle = "#fff";
  roundRect(ctx, x, y, size, size, 14);
  ctx.fill();
  ctx.fillStyle = "#050505";

  let seed = 0;
  for (let i=0; i<text.length; i++) seed = (seed * 31 + text.charCodeAt(i)) >>> 0;
  const cells = 21;
  const cell = size / cells;

  function finder(cx: number, cy: number) {
    ctx.fillRect(x+cx*cell, y+cy*cell, cell*7, cell*7);
    ctx.fillStyle = "#fff";
    ctx.fillRect(x+(cx+1)*cell, y+(cy+1)*cell, cell*5, cell*5);
    ctx.fillStyle = "#050505";
    ctx.fillRect(x+(cx+2)*cell, y+(cy+2)*cell, cell*3, cell*3);
  }

  finder(1,1); finder(13,1); finder(1,13);
  for (let r=0; r<cells; r++) {
    for (let c=0; c<cells; c++) {
      const inFinder = (c<8 && r<8) || (c>12 && r<8) || (c<8 && r>12);
      if (inFinder) continue;
      seed = (seed * 1664525 + 1013904223) >>> 0;
      if (seed % 3 === 0) ctx.fillRect(x+c*cell, y+r*cell, cell*.92, cell*.92);
    }
  }
  ctx.restore();
}

function drawBack(ctx: CanvasRenderingContext2D, rider: Rider, traits: Trait[]) {
  const d = getDesign(rider.design);
  drawBase(ctx, rider);

  ctx.save();
  ctx.textAlign = "center";
  ctx.fillStyle = d.text;
  ctx.font = "900 72px Impact, Arial Black, Arial";
  ctx.fillText(rider.name.toUpperCase(), 450, 250);

  ctx.fillStyle = "#e5e7eb";
  ctx.font = "500 32px Arial";
  ctx.fillText(`${rider.role} · ${rider.region}`, 450, 295);

  roundRect(ctx, 165, 360, 570, 245, 28);
  ctx.fillStyle = "rgba(0,0,0,.68)";
  ctx.fill();
  ctx.strokeStyle = "rgba(248,214,106,.5)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.textAlign = "left";
  ctx.fillStyle = "#fff";
  ctx.font = "500 30px Arial";
  ctx.fillText(`Motorrad: ${rider.bike}`, 205, 425);
  ctx.fillText(`Baujahr: ${rider.year}`, 205, 480);
  ctx.fillText(`Ort: ${rider.location}`, 205, 535);
  ctx.fillText(`Design: ${d.name}`, 205, 590);

  roundRect(ctx, 165, 650, 570, 275, 28);
  ctx.fillStyle = "rgba(0,0,0,.68)";
  ctx.fill();
  ctx.strokeStyle = "rgba(248,214,106,.5)";
  ctx.stroke();

  ctx.fillStyle = d.text;
  ctx.font = "900 34px Arial";
  ctx.fillText("STATS ERKLÄRUNG", 205, 705);
  ctx.font = "500 24px Arial";
  ctx.fillStyle = "#e5e7eb";
  const labels: [string,string][] = [["SPD","Speed / Geschwindigkeit"],["SKL","Schrauber-Skill"],["CRV","Kurvenlage"],["SND","Sound"],["END","Ausdauer"],["STY","Style"]];
  labels.forEach(([k,v], i) => {
    const y = 755 + i*32;
    ctx.fillStyle = d.text;
    ctx.fillText(k, 205, y);
    ctx.fillStyle = "#e5e7eb";
    ctx.fillText(`= ${v}`, 275, y);
  });

  drawQrLike(ctx, rider.qr, 330, 990, 240);

  ctx.fillStyle = d.text;
  ctx.font = "900 32px Arial";
  ctx.textAlign = "center";
  ctx.fillText(rider.motto.toUpperCase(), 450, 1450);

  ctx.restore();
}

export function drawCard(ctx: CanvasRenderingContext2D, options: DrawOptions) {
  const { rider, traits, photo, clubLogo, regionLogo, side } = options;
  if (side === "front") drawFront(ctx, rider, traits, photo, clubLogo, regionLogo);
  else drawBack(ctx, rider, traits);
}
