"use strict";
const pptxgen = require("pptxgenjs");

// ═══════ НОВАЯ ПАЛИТРА (элегантная, без нейросетевых клише) ═══════
const C = {
  NAVY:   "1A1A2E",      // глубокий фиолетово-синий
  NAVY2:  "0D0D1A",
  TEAL:   "E94560",      // яркий розово-коралловый акцент
  TEAL2:  "C73652",
  ICE:    "F8F4F0",      // тёплый светлый бежевый
  ICE2:   "EFEAE3",
  WHITE:  "FFFFFF",
  DARK:   "2D2D3A",
  MUTED:  "6B6B7A",
  BG:     "F8F4F0",
  GREEN:  "2D9C7C",
  GRNL:   "D4EDDA",
  AMBER:  "F5A623",
  AMBL:   "FFF3CD",
  RED:    "E94560",
  REDL:   "FDD9DF",
  GRAY:   "A0A0B0",
  GRAY2:  "E8E5E0",
  PURP:   "6C5B7B",
  PURPL:  "E8D9F0",
  CODE_BG: "1A1A2E",
  CODE_FG: "F8F4F0",
};

// ═══════ LAYOUT ═══════
const W = 10, H = 5.625;
const MX = 0.42, MY = 0.18;
const TH = 0.60;
const CY = MY + TH + 0.12;
const CH = H - CY - 0.22;
const CW = W - 2 * MX;

// Тени – мягче
const mkSh = () => ({
  type: "outer",
  color: "000000",
  blur: 12,
  offset: 3,
  angle: 45,
  opacity: 0.12,
});

// ═══════ FACTORIES ═══════
function newPres(title) {
  const p = new pptxgen();
  p.layout = "LAYOUT_16x9";
  p.title = title;
  p.author = "Ломазина Александра, гр 22307";
  return p;
}

// Обложка – только безопасные фигуры (овалы и линии)
function addCover(pres, code, title) {
  const s = pres.addSlide();

  // Градиентный фон (угольно-фиолетовый)
  s.background = { fill: "solid", color: C.NAVY };

  // Декоративный большой овал (золотистый полупрозрачный)
  s.addShape(pres.shapes.OVAL, {
    x: 6.8, y: -1.0, w: 4.0, h: 4.0,
    fill: { color: C.AMBER, transparency: 70 },
    line: { color: C.AMBER, transparency: 70 },
  });

  // Маленький овал (розовый акцент)
  s.addShape(pres.shapes.OVAL, {
    x: -0.6, y: 3.8, w: 2.2, h: 2.2,
    fill: { color: C.TEAL, transparency: 60 },
    line: { color: C.TEAL, transparency: 60 },
  });

  // Акцентная полоса с кодом темы
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 0.82, w: 3.0, h: 0.40,
    fill: { color: C.TEAL },
    line: { color: C.TEAL },
    rectRadius: 0.08,
  });
  s.addText(code, {
    x: 0.5, y: 0.82, w: 3.0, h: 0.40,
    color: C.WHITE,
    fontSize: 12,
    bold: true,
    align: "center",
    valign: "middle",
    margin: 0,
    fontFace: "Times New Roman",
  });

  // Заголовок – Georgia
  s.addText(title, {
    x: 0.5, y: 1.38, w: 8.8, h: 2.1,
    color: C.WHITE,
    fontSize: 26,
    bold: true,
    align: "left",
    valign: "middle",
    fontFace: "Georgia",
  });

  // Подзаголовок
  s.addText("Проект ТППО: «Личный кабинет для клиентов компании»", {
    x: 0.5, y: 3.68, w: 8.5, h: 0.40,
    color: C.ICE,
    fontSize: 12,
    fontFace: "Times New Roman",
  });

  // Нижний колонтитул
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 4.88, w: 10, h: 0.745,
    fill: { color: C.NAVY2 },
    line: { color: C.NAVY2 },
  });
  s.addText(
    "Выполнила: Ломазина Александра, гр 22307   |   Руководитель: Корзун Дмитрий Жоржевич   |   ИМИТ ПетрГУ, 2026",
    {
      x: 0.5, y: 4.88, w: 9, h: 0.745,
      color: "B8B0C0",
      fontSize: 11,
      fontFace: "Times New Roman",
      align: "left",
      valign: "middle",
    }
  );

  return s;
}

// Слайд с заголовком (шрифт Georgia)
function cs(pres, title) {
  const s = pres.addSlide();
  s.background = { color: C.WHITE };
  s.addText(title, {
    x: MX, y: MY, w: CW, h: TH,
    color: C.NAVY,
    fontSize: 16,
    bold: true,
    align: "left",
    valign: "bottom",
    fontFace: "Georgia",
  });
  return s;
}

function csg(pres, title) {
  const s = pres.addSlide();
  s.background = { color: C.BG };
  s.addText(title, {
    x: MX, y: MY, w: CW, h: TH,
    color: C.NAVY,
    fontSize: 16,
    bold: true,
    align: "left",
    valign: "bottom",
    fontFace: "Georgia",
  });
  return s;
}

function codeBox(s, pres, x, y, w, h, code, fs) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    fill: { color: C.CODE_BG },
    line: { color: "2A2A4A", pt: 1.2 },
    rectRadius: 0.08,
  });
  s.addText(code, {
    x: x + 0.15, y: y + 0.09, w: w - 0.30, h: h - 0.18,
    color: C.CODE_FG,
    fontSize: fs || 9.5,
    align: "left",
    valign: "top",
    fontFace: "Courier New",
  });
}

function hdr(cells) {
  return cells.map((t) => ({
    text: t,
    options: {
      fill: { color: C.NAVY },
      color: C.WHITE,
      bold: true,
      align: "center",
      valign: "middle",
      fontFace: "Times New Roman",
    },
  }));
}

function dr(cells, alt) {
  return cells.map((t) => ({
    text: t,
    options: {
      fill: { color: alt ? C.ICE : C.WHITE },
      color: C.DARK,
      align: "left",
      valign: "middle",
      fontFace: "Times New Roman",
    },
  }));
}

function drc(cells, alt) {
  return cells.map((t) => ({
    text: t,
    options: {
      fill: { color: alt ? C.ICE : C.WHITE },
      color: C.DARK,
      align: "center",
      valign: "middle",
      fontFace: "Times New Roman",
    },
  }));
}

function card(s, pres, x, y, w, h, fill) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    fill: { color: fill || C.ICE },
    line: { color: C.ICE2, pt: 0.8 },
    rectRadius: 0.10,
    shadow: mkSh(),
  });
}

// Старая версия баннера 
// function conclusionBanner(s, pres, text, y) {
//   const by = y || (CY + CH - 1.15);
//   s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
//     x: MX, y: by, w: CW, h: 1.05,
//     fill: { color: C.WHITE },
//     line: { color: C.ICE2, pt: 1 },
//     rectRadius: 0.10,
//     shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 45, opacity: 0.08 },
//   });
//   s.addShape(pres.shapes.RECTANGLE, {
//     x: MX, y: by + 0.1, w: 0.12, h: 0.85,
//     fill: { color: C.TEAL },
//     line: { color: C.TEAL },
//     rectRadius: 0.05,
//   });
//   s.addText("Выводы", {
//     x: MX + 0.25, y: by + 0.05, w: 1.5, h: 0.35,
//     color: C.NAVY, fontSize: 11, bold: true, fontFace: "Georgia",
//     align: "left", valign: "middle",
//   });
//   s.addText(text, {
//     x: MX + 0.25, y: by + 0.35, w: CW - 0.45, h: 0.65,
//     color: C.DARK, fontSize: 11, fontFace: "Times New Roman",
//     align: "left", valign: "top",
//   });
// }

// Новая функция – текст прижат к левому верхнему углу, крупный шрифт, перенос целыми словами
function conclusionBanner(s, pres, text, y) {
  const left = MX + 0.1;        // минимальный отступ слева
  const top = CY + 0.05;        // почти вплотную к заголовку
  const width = CW - 0.2;       // почти на всю ширину
  const height = CH - 0.1;      // почти на всю высоту

  s.addText(text, {
    x: left, y: top, w: width, h: height,
    color: C.DARK,
    fontSize: 18,               // крупный шрифт – можно увеличить до 20
    fontFace: "Times New Roman",
    align: "left",
    valign: "top",
    wrap: true,                 // перенос по словам (не разрывает слова)
    autoFit: false,             // не сжимает текст, если не влезает – переносит
    lineSpacing: 32,            // межстрочный интервал
    paraSpace: 14,              // отступ между абзацами
  });
}

module.exports = {
  C,
  W,
  H,
  MX,
  MY,
  TH,
  CY,
  CH,
  CW,
  mkSh,
  newPres,
  addCover,
  cs,
  csg,
  codeBox,
  hdr,
  dr,
  drc,
  card,
  conclusionBanner,
};