"use strict";
const pptxgen = require("pptxgenjs");

// ═══════ PALETTE ═══════
const C = {
  NAVY:  "0F1E36", NAVY2: "0A1424",
  TEAL:  "EA580C", TEAL2: "C2410C",
  ICE:   "FFF7ED", ICE2:  "FFEDD5",
  WHITE: "FFFFFF", DARK:  "1E293B",
  MUTED: "64748B", BG:    "F8FAFC",
  GREEN: "059669", GRNL:  "D1FAE5",
  AMBER: "D97706", AMBL:  "FEF3C7",
  RED:   "DC2626", REDL:  "FEE2E2",
  GRAY:  "94A3B8", GRAY2: "F1F5F9",
  PURP:  "7C3AED", PURPL: "EDE9FE",
  CODE_BG: "0B132B", CODE_FG: "FFEDD5",
};

// ═══════ LAYOUT ═══════
const W = 10, H = 5.625;
const MX = 0.42, MY = 0.18;
const TH = 0.60;
const CY = MY + TH + 0.12;   // 0.90
const CH = H - CY - 0.22;    // 4.505
const CW = W - 2 * MX;       // 9.16

const mkSh = () => ({ type: "outer", color: "000000", blur: 7, offset: 2, angle: 45, opacity: 0.09 });

// ═══════ FACTORIES ═══════
function newPres(title) {
  const p = new pptxgen();
  p.layout = "LAYOUT_16x9";
  p.title = title;
  p.author = "Ломазина Александра, гр.22307";
  return p;
}

function addCover(pres, code, title) {
  const s = pres.addSlide();
  s.background = { color: C.NAVY };
  s.addShape(pres.shapes.OVAL, { x: 7.3, y: -0.9, w: 3.5, h: 3.5,
    fill: { color: C.TEAL, transparency: 80 }, line: { color: C.TEAL, transparency: 80 } });
  s.addShape(pres.shapes.OVAL, { x: -0.5, y: 3.9, w: 2.6, h: 2.6,
    fill: { color: C.ICE2, transparency: 87 }, line: { color: C.ICE2, transparency: 87 } });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 0.82, w: 3.0, h: 0.40,
    fill: { color: C.TEAL }, line: { color: C.TEAL }, rectRadius: 0.08 });
  s.addText(code, { x: 0.5, y: 0.82, w: 3.0, h: 0.40,
    color: C.WHITE, fontSize: 12, bold: true,
    align: "center", valign: "middle", margin: 0, fontFace: "Calibri" });
  s.addText(title, { x: 0.5, y: 1.38, w: 8.8, h: 2.1,
    color: C.WHITE, fontSize: 25, bold: true,
    align: "left", valign: "middle", fontFace: "Cambria" });
  s.addText("Проект ТППО: «Личный кабинет для клиентов компании»", {
    x: 0.5, y: 3.68, w: 8.5, h: 0.40, color: C.ICE, fontSize: 13, fontFace: "Calibri" });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.88, w: 10, h: 0.745,
    fill: { color: C.NAVY2 }, line: { color: C.NAVY2 } });
  s.addText("Выполнила: Ломазина А., гр.22307   |   Руководитель: Корзун Д.Ж.   |   ИМИТ ПетрГУ, 2024/25", {
    x: 0.5, y: 4.88, w: 9, h: 0.745, color: "7B9BC0",
    fontSize: 11, fontFace: "Calibri", align: "left", valign: "middle" });
  return s;
}

function cs(pres, title) {
  const s = pres.addSlide();
  s.background = { color: C.WHITE };
  s.addText(title, { x: MX, y: MY, w: CW, h: TH,
    color: C.NAVY, fontSize: 20, bold: true,
    align: "left", valign: "bottom", fontFace: "Cambria" });
  return s;
}

function csg(pres, title) {
  const s = pres.addSlide();
  s.background = { color: C.BG };
  s.addText(title, { x: MX, y: MY, w: CW, h: TH,
    color: C.NAVY, fontSize: 20, bold: true,
    align: "left", valign: "bottom", fontFace: "Cambria" });
  return s;
}

function codeBox(s, pres, x, y, w, h, code, fs) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h,
    fill: { color: C.CODE_BG }, line: { color: "1E4070", pt: 1 }, rectRadius: 0.08 });
  s.addText(code, { x: x + 0.15, y: y + 0.09, w: w - 0.30, h: h - 0.18,
    color: C.CODE_FG, fontSize: fs || 9.5,
    align: "left", valign: "top", fontFace: "Courier New" });
}

function hdr(cells, colWidths) {
  return cells.map((t, i) => ({ text: t, options: {
    fill: { color: C.NAVY }, color: C.WHITE, bold: true,
    align: "center", valign: "middle", fontFace: "Calibri"
  }}));
}
function dr(cells, alt) {
  return cells.map((t) => ({ text: t, options: {
    fill: { color: alt ? C.ICE : C.WHITE }, color: C.DARK,
    align: "left", valign: "middle", fontFace: "Calibri"
  }}));
}
function drc(cells, alt) {
  return cells.map((t) => ({ text: t, options: {
    fill: { color: alt ? C.ICE : C.WHITE }, color: C.DARK,
    align: "center", valign: "middle", fontFace: "Calibri"
  }}));
}

function card(s, pres, x, y, w, h, fill) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h,
    fill: { color: fill || C.ICE }, line: { color: fill || C.ICE },
    rectRadius: 0.10, shadow: mkSh() });
}

function conclusionBanner(s, pres, text, y) {
  const by = y || (CY + CH - 1.12);
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: MX, y: by, w: CW, h: 1.05,
    fill: { color: C.NAVY }, line: { color: C.NAVY }, rectRadius: 0.10 });
  s.addText(text, { x: MX + 0.18, y: by, w: CW - 0.36, h: 1.05,
    color: C.WHITE, fontSize: 12, fontFace: "Calibri", align: "left", valign: "middle" });
}

module.exports = { C, W, H, MX, MY, TH, CY, CH, CW, mkSh,
  newPres, addCover, cs, csg, codeBox, hdr, dr, drc, card, conclusionBanner };
