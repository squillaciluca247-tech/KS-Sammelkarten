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
  ctx.moveTo(92, 205);
  ctx.lineTo(160, 92);
  ctx.lineTo(342, 72);
  ctx.lineTo(394, 26);
  ctx.lineTo(450, 73);
  ctx.lineTo(506, 26);
  ctx.lineTo(558, 72);
  ctx.lineTo(740, 92);
  ctx.lineTo(808, 205);
  ctx.lineTo(808, 1285);
  ctx.lineTo(735, 1428);
  ctx.lineTo(450, 1512);
  ctx.lineTo(165, 1428);
  ctx.lineTo(92, 1285);
  ctx.closePath();
}

function innerPath(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.moveTo(135, 235);
  ctx.lineTo(195, 130);
  ctx.lineTo(360, 115);
  ctx.lineTo(405, 78);
  ctx.lineTo(450, 116);
  ctx.lineTo(495, 78);
  ctx.lineTo(540, 115);
  ctx.lineTo(705, 130);
  ctx.lineTo(765, 235);
  ctx.lineTo(765, 1250);
  ctx.lineTo(695, 1380);
  ctx.lineTo(450, 1454);
  ctx.lineTo(205, 1380);
  ctx.lineTo(135, 1250);
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
  const legendGold = "#f8d66a";

  ctx.save();

  // Outer premium shield: thick beveled frame
  framePath(ctx);
  const outer = ctx.createLinearGradient(60, 0, 850, 1600);
  outer.addColorStop(0.00, d.colors[0]);
  outer.addColorStop(0.16, "#fff6bf");
  outer.addColorStop(0.34, d.colors[1]);
  outer.addColorStop(0.54, d.colors[2]);
  outer.addColorStop(0.74, d.colors[1]);
  outer.addColorStop(1.00, d.colors[0]);
  ctx.fillStyle = outer;
  ctx.shadowColor = "rgba(0,0,0,.92)";
  ctx.shadowBlur = 34;
  ctx.shadowOffsetY = 20;
  ctx.fill();

  // Inner cutout
  innerPath(ctx);
  ctx.shadowColor = "transparent";
  ctx.fillStyle = "#050403";
  ctx.fill();

  // Inner fine border
  const fine = ctx.createLinearGradient(90, 80, 810, 1510);
  fine.addColorStop(0, d.colors[0]);
  fine.addColorStop(.5, legendGold);
  fine.addColorStop(1, d.colors[2]);
  ctx.lineWidth = 5;
  ctx.strokeStyle = fine;
  innerPath(ctx);
  ctx.stroke();

  // Second inner technical line
  ctx.save();
  ctx.translate(0, 0);
  ctx.globalAlpha = .75;
  ctx.lineWidth = 3;
  ctx.strokeStyle = d.colors[0];
  ctx.beginPath();
  ctx.moveTo(158, 245);
  ctx.lineTo(205, 165);
  ctx.lineTo(370, 165);
  ctx.lineTo(410, 130);
  ctx.lineTo(450, 166);
  ctx.lineTo(490, 130);
  ctx.lineTo(530, 165);
  ctx.lineTo(695, 165);
  ctx.lineTo(742, 245);
  ctx.lineTo(742, 1245);
  ctx.lineTo(682, 1362);
  ctx.lineTo(450, 1432);
  ctx.lineTo(218, 1362);
  ctx.lineTo(158, 1245);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();

  // Top crown ornament
  ctx.save();
  ctx.lineWidth = 5;
  ctx.strokeStyle = legendGold;
  ctx.globalAlpha = .9;
  ctx.beginPath();
  ctx.moveTo(245, 175);
  ctx.bezierCurveTo(330, 118, 570, 118, 655, 175);
  ctx.stroke();
  ctx.lineWidth = 3;
  ctx.globalAlpha = .65;
  ctx.beginPath();
  ctx.moveTo(280, 210);
  ctx.bezierCurveTo(350, 176, 550, 176, 620, 210);
  ctx.stroke();

  // small top badge
  ctx.fillStyle = "#050403";
  ctx.strokeStyle = legendGold;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(450, 72);
  ctx.lineTo(482, 91);
  ctx.lineTo(474, 130);
  ctx.lineTo(450, 148);
  ctx.lineTo(426, 130);
  ctx.lineTo(418, 91);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = legendGold;
  ctx.font = "900 35px Arial";
  ctx.textAlign = "center";
  ctx.fillText("★", 450, 121);
  ctx.restore();

  // Side gold fins like premium cards
  ctx.save();
  ctx.globalAlpha = .75;
  const sideGrad = ctx.createLinearGradient(120, 0, 780, 0);
  sideGrad.addColorStop(0, d.colors[0]);
  sideGrad.addColorStop(.5, d.colors[1]);
  sideGrad.addColorStop(1, d.colors[0]);
  ctx.strokeStyle = sideGrad;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(145, 360);
  ctx.bezierCurveTo(105, 610, 108, 1000, 158, 1240);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(755, 360);
  ctx.bezierCurveTo(795, 610, 792, 1000, 742, 1240);
  ctx.stroke();

  ctx.globalAlpha = .28;
  ctx.lineWidth = 13;
  ctx.beginPath();
  ctx.moveTo(104, 460);
  ctx.bezierCurveTo(70, 720, 75, 1010, 120, 1270);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(796, 460);
  ctx.bezierCurveTo(830, 720, 825, 1010, 780, 1270);
  ctx.stroke();
  ctx.restore();

  // Bottom crest and flourish
  ctx.save();
  ctx.strokeStyle = legendGold;
  ctx.fillStyle = "#050403";
  ctx.lineWidth = 4;
  ctx.globalAlpha = .95;
  ctx.beginPath();
  ctx.moveTo(450, 1340);
  ctx.lineTo(512, 1370);
  ctx.lineTo(500, 1440);
  ctx.lineTo(450, 1474);
  ctx.lineTo(400, 1440);
  ctx.lineTo(388, 1370);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = legendGold;
  ctx.font = "900 54px Arial";
  ctx.textAlign = "center";
  ctx.fillText("★", 450, 1427);

  ctx.lineWidth = 3;
  ctx.globalAlpha = .75;
  ctx.beginPath();
  ctx.moveTo(250, 1388);
  ctx.bezierCurveTo(325, 1430, 575, 1430, 650, 1388);
  ctx.stroke();
  ctx.restore();

  // tiny edge highlights
  ctx.save();
  ctx.globalAlpha = .42;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(135, 190);
  ctx.lineTo(180, 112);
  ctx.lineTo(336, 112);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(765, 190);
  ctx.lineTo(720, 112);
  ctx.lineTo(564, 112);
  ctx.stroke();
  ctx.restore();

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


function drawGeneratedBackground(ctx: CanvasRenderingContext2D, rider: Rider, x: number, y: number, w: number, h: number) {
  const mode = rider.aiBackground || "alps";

  let top = "#2a2416", mid = "#6b4a18", bottom = "#090909";
  if (mode === "neon") { top = "#160622"; mid = "#7e22ce"; bottom = "#050008"; }
  if (mode === "storm") { top = "#111827"; mid = "#374151"; bottom = "#020617"; }
  if (mode === "garage") { top = "#111111"; mid = "#27272a"; bottom = "#050505"; }
  if (mode === "sunset") { top = "#3b1608"; mid = "#f59e0b"; bottom = "#120606"; }

  const sky = ctx.createLinearGradient(x, y, x, y + h);
  sky.addColorStop(0, top);
  sky.addColorStop(.45, mid);
  sky.addColorStop(1, bottom);
  ctx.fillStyle = sky;
  ctx.fillRect(x, y, w, h);

  ctx.save();
  ctx.globalAlpha = .55;

  if (mode === "neon") {
    ctx.strokeStyle = "#f0abfc";
    ctx.lineWidth = 3;
    for (let i = 0; i < 8; i++) {
      const yy = y + h * .55 + i * 28;
      ctx.beginPath();
      ctx.moveTo(x + w * .18 - i * 14, yy);
      ctx.lineTo(x + w * .82 + i * 14, yy);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(192,38,211,.35)";
    ctx.fillRect(x + w*.08, y + h*.2, w*.13, h*.45);
    ctx.fillRect(x + w*.78, y + h*.18, w*.12, h*.5);
  } else if (mode === "garage") {
    ctx.strokeStyle = "#f8d66a";
    ctx.lineWidth = 4;
    for (let i=0; i<5; i++) {
      ctx.beginPath();
      ctx.moveTo(x + w*.1 + i*w*.2, y + 20);
      ctx.lineTo(x + w*.18 + i*w*.17, y + h*.65);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(0,0,0,.45)";
    ctx.fillRect(x, y+h*.65, w, h*.35);
  } else {
    // mountain / road inspired
    ctx.fillStyle = "rgba(0,0,0,.38)";
    ctx.beginPath();
    ctx.moveTo(x, y+h*.62);
    ctx.lineTo(x+w*.20, y+h*.34);
    ctx.lineTo(x+w*.42, y+h*.61);
    ctx.lineTo(x+w*.60, y+h*.31);
    ctx.lineTo(x+w*.86, y+h*.63);
    ctx.lineTo(x+w, y+h*.42);
    ctx.lineTo(x+w, y+h);
    ctx.lineTo(x, y+h);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "rgba(248,214,106,.55)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x+w*.50, y+h);
    ctx.bezierCurveTo(x+w*.45, y+h*.78, x+w*.44, y+h*.65, x+w*.52, y+h*.55);
    ctx.stroke();
  }

  ctx.restore();

  const glow = ctx.createRadialGradient(x+w*.55, y+h*.18, 10, x+w*.55, y+h*.18, w*.65);
  glow.addColorStop(0, "rgba(255,230,140,.34)");
  glow.addColorStop(1, "rgba(255,230,140,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(x, y, w, h);
}

function drawHoloOverlay(ctx: CanvasRenderingContext2D, rider: Rider) {
  if (!rider.holoEffect) return;

  ctx.save();
  innerPath(ctx);
  ctx.clip();

  const g = ctx.createLinearGradient(80, 120, 820, 1450);
  g.addColorStop(0, "rgba(255,255,255,0)");
  g.addColorStop(.22, "rgba(255,255,255,.20)");
  g.addColorStop(.32, "rgba(248,214,106,.10)");
  g.addColorStop(.48, "rgba(255,255,255,0)");
  g.addColorStop(.70, "rgba(255,255,255,.12)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(80, 80, 740, 1420);

  ctx.globalAlpha = .16;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  for (let i = -6; i < 12; i++) {
    ctx.beginPath();
    ctx.moveTo(90 + i * 80, 90);
    ctx.lineTo(390 + i * 80, 1500);
    ctx.stroke();
  }

  ctx.restore();
}


function drawImageArea(ctx: CanvasRenderingContext2D, rider: Rider, photo?: HTMLImageElement | null) {
  const x = 132, y = 225, w = 636, h = 575;
  ctx.save();
  roundRect(ctx, x, y, w, h, 42);
  ctx.clip();

  drawGeneratedBackground(ctx, rider, x, y, w, h);

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
  vg.addColorStop(rider.cutoutLook ? 0.58 : 0.72, `rgba(0,0,0,${rider.vignette/100})`);
  vg.addColorStop(1, rider.cutoutLook ? "rgba(0,0,0,.96)" : "rgba(0,0,0,.88)");
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

  ctx.fillStyle = "#f8d66a";
  ctx.textAlign = "left";
  ctx.font = "900 118px Impact, Arial Black, Arial";
  ctx.shadowColor = "rgba(0,0,0,.7)";
  ctx.shadowBlur = 8;
  ctx.fillText(String(rider.rating), 145, 345);

  ctx.fillStyle = "#fff";
  ctx.font = "900 58px Impact, Arial Black, Arial";
  ctx.fillText(rider.nickname.toUpperCase(), 148, 410);

  drawFlag(ctx, rider.nationality, 148, 455, 92, 56);

  if (regionLogo) {
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,.75)";
    ctx.shadowBlur = 10;
    ctx.drawImage(regionLogo, rider.regionLogoX, rider.regionLogoY, rider.regionLogoW, rider.regionLogoH);
    ctx.restore();
  }

  ctx.shadowBlur = 0;
  // Name / bike block
  drawTextFit(ctx, rider.name.toUpperCase(), 450, 895, 655, rider.nameSize, d.text, "center");

  ctx.fillStyle = "#f8d66a";
  ctx.font = "700 34px Arial";
  ctx.textAlign = "center";
  ctx.shadowColor = "rgba(0,0,0,.85)";
  ctx.shadowBlur = 12;
  ctx.fillText(`${rider.bike} · ${rider.location}`, 450, 947);

  ctx.fillStyle = "#f8d66a";
  ctx.font = "500 27px Arial";
  ctx.fillText(rider.subtitle, 450, 988);
  ctx.shadowBlur = 0;

  // Stats panel
  roundRect(ctx, 128, 1025, 644, 128, 25);
  ctx.fillStyle = "rgba(0,0,0,.78)";
  ctx.fill();
  ctx.strokeStyle = "rgba(248,214,106,.86)";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  const entries = Object.entries(rider.stats);
  entries.forEach(([key, value], i) => {
    const cx = 164 + i * 103;
    ctx.textAlign = "center";
    ctx.fillStyle = "#f8d66a";
    ctx.font = "900 25px Arial";
    ctx.fillText(key, cx, 1074);
    ctx.fillStyle = "#f8d66a";
    ctx.font = "900 45px Impact, Arial Black, Arial";
    ctx.fillText(String(value), cx, 1128);
  });

  // Traits panel: fixed 2x2 grid with clipped text, no overlapping
  roundRect(ctx, 128, 1192, 644, 205, 26);
  ctx.fillStyle = "rgba(0,0,0,.80)";
  ctx.fill();
  ctx.strokeStyle = "rgba(248,214,106,.52)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.save();
  ctx.globalAlpha = .35;
  ctx.strokeStyle = "rgba(248,214,106,.55)";
  ctx.beginPath();
  ctx.moveTo(450, 1212);
  ctx.lineTo(450, 1377);
  ctx.moveTo(150, 1294);
  ctx.lineTo(750, 1294);
  ctx.stroke();
  ctx.restore();

  traits.slice(0,4).forEach((trait, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const boxX = 150 + col * 305;
    const boxY = 1222 + row * 82;
    const iconX = boxX;
    const textX = boxX + 58;

    drawIcon(ctx, trait.icon, iconX, boxY - 6, "#f8d66a");
    ctx.textAlign = "left";
    ctx.fillStyle = "#f8d66a";
    ctx.font = "900 25px Arial";
    const title = trait.title.toUpperCase();
    const titleMax = 218;
    let tSize = 25;
    ctx.font = `900 ${tSize}px Arial`;
    while (ctx.measureText(title).width > titleMax && tSize > 18) {
      tSize -= 1;
      ctx.font = `900 ${tSize}px Arial`;
    }
    ctx.fillText(title, textX, boxY + 18);

    ctx.fillStyle = "#f8d66a";
    ctx.font = "500 22px Arial";
    drawWrapped(ctx, trait.text, textX, boxY + 47, 225, 25, 2);
  });

  // Motto: always legend gold, fixed in card
  ctx.textAlign = "center";
  ctx.fillStyle = "#f8d66a";
  const motto = rider.motto.toUpperCase();
  let mottoSize = rider.mottoSize;
  ctx.font = `900 ${mottoSize}px Arial`;
  while (ctx.measureText(motto).width > 650 && mottoSize > 14) {
    mottoSize -= 1;
    ctx.font = `900 ${mottoSize}px Arial`;
  }
  ctx.shadowColor = "rgba(0,0,0,.9)";
  ctx.shadowBlur = 8;
  ctx.fillText(motto, 450, 1472);
  ctx.shadowBlur = 0;

  drawHoloOverlay(ctx, rider);
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
  ctx.fillStyle = "#f8d66a";
  ctx.font = "900 72px Impact, Arial Black, Arial";
  ctx.fillText(rider.name.toUpperCase(), 450, 250);

  ctx.fillStyle = "#f8d66a";
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

  ctx.fillStyle = "#f8d66a";
  ctx.font = "900 34px Arial";
  ctx.fillText("STATS ERKLÄRUNG", 205, 705);
  ctx.font = "500 24px Arial";
  ctx.fillStyle = "#f8d66a";
  const labels: [string,string][] = [["SPD","Speed / Geschwindigkeit"],["SKL","Schrauber-Skill"],["CRV","Kurvenlage"],["SND","Sound"],["END","Ausdauer"],["STY","Style"]];
  labels.forEach(([k,v], i) => {
    const y = 755 + i*32;
    ctx.fillStyle = "#f8d66a";
    ctx.fillText(k, 205, y);
    ctx.fillStyle = "#f8d66a";
    ctx.fillText(`= ${v}`, 275, y);
  });

  drawQrLike(ctx, rider.qr, 330, 990, 240);

  ctx.fillStyle = "#f8d66a";
  ctx.font = `900 ${rider.mottoSize}px Arial`;
  ctx.textAlign = "center";
  ctx.fillText(rider.motto.toUpperCase(), 450, 1450);

  drawHoloOverlay(ctx, rider);
  ctx.restore();
}

export function drawCard(ctx: CanvasRenderingContext2D, options: DrawOptions) {
  const { rider, traits, photo, clubLogo, regionLogo, side } = options;
  if (side === "front") drawFront(ctx, rider, traits, photo, clubLogo, regionLogo);
  else drawBack(ctx, rider, traits);
}
