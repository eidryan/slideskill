#!/usr/bin/env node
/**
 * Deliberately limited v0.1 PPTX renderer. Does not claim design QA.
 * Usage: node scripts/build_deck.mjs examples/demo-consulting.json dist/demo-consulting.pptx
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import PptxGenJS from 'pptxgenjs';

const inFile = process.argv[2] ?? 'examples/demo-consulting.json';
const outFile = process.argv[3] ?? 'dist/demo-consulting.pptx';
const deck = JSON.parse(fs.readFileSync(inFile, 'utf8'));
if (deck.schema_version !== '0.1') throw new Error('Unsupported manifest version');
const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Slide Director';
pptx.subject = 'Illustrative methodology demo, not verified empirical data';
pptx.title = deck.meta.title;
pptx.lang = deck.meta.language || 'pt-BR';
pptx.theme = {
  headFontFace: 'Arial',
  bodyFontFace: 'Arial',
  lang: deck.meta.language || 'pt-BR',
};
const W = 13.333, H = 7.5;
const C = {
  navy: '152C40', blue: '22618D', pale: 'DCE9F3', gray: '5D6B77',
  soft: 'EEF2F5', line: 'CCD5DC', white: 'FFFFFF', dark: '233746',
};
const ST = pptx.ShapeType;
function txt(slide, text, x, y, w, h, options = {}) {
  slide.addText(String(text ?? ''), {
    x, y, w, h, fontFace: 'Arial', fontSize: 16, color: C.dark,
    margin: 0, valign: 'mid', breakLine: false, ...options,
  });
}
function rect(slide, x, y, w, h, fill, line = fill, radius = false) {
  slide.addShape(radius ? ST.roundRect : ST.rect, {
    x, y, w, h, rectRadius: 0.08,
    line: { color: line, width: 0.6 }, fill: { color: fill },
  });
}
function line(slide, x1, y1, x2, y2, color = C.line, width = 1.6) {
  slide.addShape(ST.line, { x: x1, y: y1, w: x2 - x1, h: y2 - y1,
    line: { color, width } });
}
function addFrame(slide, s, page) {
  rect(slide, 0, 0, W, H, C.white);
  rect(slide, 0.72, 0.42, 0.09, 0.48, C.blue);
  txt(slide, s.title, 1.02, 0.39, 11.4, 1.12, {
    fontSize: s.title.length > 89 ? 23 : 27, bold: true,
    valign: 'mid', color: C.navy, breakLine: false,
  });
  line(slide, 0.75, 6.92, 12.58, 6.92, C.line, 0.8);
  const caption = s.visual_plan.caption || '';
  if (caption) txt(slide, caption, 0.78, 6.66, 11.7, 0.2,
    { fontSize: 10, color: C.gray, valign: 'mid' });
  const sources = s.evidence.map(e => e.source).filter(Boolean);
  if (sources.length) txt(slide, 'Fonte: ' + [...new Set(sources)].join('; '),
    0.78, 7.03, 10.5, 0.21, { fontSize: 8.2, color: C.gray });
  txt(slide, String(page).padStart(2, '0'), 11.8, 7.03, 0.75, 0.22,
      { fontSize: 9, color: C.gray, align: 'right' });
  if (deck.meta.data_status === 'illustrative') {
    txt(slide, 'DEMO', 11.12, 7.03, 0.7, 0.22, {
      fontSize: 8, bold: true, color: C.blue, align: 'right' });
  }
}
function cover(slide, s) {
  const v = s.visual_plan;
  rect(slide, 0, 0, W, H, C.white);
  rect(slide, 0.82, 1.18, 0.12, 4.68, C.blue);
  txt(slide, 'SLIDE DIRECTOR / MÉTODO', 1.25, 1.25, 10, 0.42,
      { color: C.blue, bold: true, fontSize: 13, charSpacing: 1.3 });
  txt(slide, s.title, 1.25, 2.05, 10.9, 1.9,
      { fontSize: 34, bold: true, color: C.navy, valign: 'mid' });
  txt(slide, v.subtitle || s.claim, 1.26, 4.48, 10.5, 0.55,
      { fontSize: 18, color: C.gray });
  line(slide, 1.26, 5.65, 11.55, 5.65, C.line, 1);
  txt(slide, v.signature || '', 1.27, 5.91, 10.5, 0.5,
      { fontSize: 15, color: C.blue });
  txt(slide, 'DEMONSTRAÇÃO — conteúdo e dados ilustrativos', 1.25, 6.93, 10, 0.2,
      { fontSize: 9, color: C.gray });
}
function driverTree(slide, s) {
  const v = s.visual_plan;
  txt(slide, 'DECOMPOSIÇÃO', 0.89, 1.65, 3.2, 0.28,
      { fontSize: 11, bold: true, color: C.blue });
  rect(slide, 1.0, 3.0, 3.1, 1.1, C.pale, C.pale, true);
  txt(slide, v.root, 1.23, 3.27, 2.62, 0.53,
      { fontSize: 22, bold: true, color: C.navy, align: 'center' });
  const ys = [2.25, 4.65];
  const drivers = v.drivers || [];
  drivers.slice(0, 2).forEach((node, i) => {
    rect(slide, 8.4, ys[i], 3.55, 0.95, C.soft, C.soft, true);
    txt(slide, node.label, 8.62, ys[i] + 0.16, 3.13, 0.32,
        { fontSize: 19, bold: true, color: C.navy });
    txt(slide, node.detail || '', 8.62, ys[i] + 0.55, 3.13, 0.24,
        { fontSize: 12, color: C.gray });
    line(slide, 6.52, ys[i] + 0.47, 8.4, ys[i] + 0.47, C.blue, 2);
  });
  line(slide, 4.1, 3.56, 6.52, 3.56, C.blue, 2);
  line(slide, 6.52, ys[0] + 0.47, 6.52, ys[1] + 0.47, C.blue, 2);
  txt(slide, v.operator || '×', 7.2, 3.30, 0.5, 0.52,
      { fontSize: 25, bold: true, color: C.blue, align: 'center' });
}
function comparison(slide, s) {
  const v = s.visual_plan;
  const xs = [0.8, 4.25, 8.32], ws = [3.45, 4.07, 4.2];
  const startY = 1.86, headerH = 0.66;
  v.headers.forEach((h, j) => {
    rect(slide, xs[j], startY, ws[j], headerH, j === v.highlight_column ? C.blue : C.navy);
    txt(slide, h, xs[j] + 0.16, startY + 0.07, ws[j] - 0.3, 0.5,
        { fontSize: 15, bold: true, color: C.white });
  });
  const rows = v.rows || [];
  const rowH = Math.min(0.78, 3.65 / Math.max(1, rows.length));
  rows.forEach((row, i) => {
    const y = startY + headerH + i * rowH;
    row.forEach((cell, j) => {
      rect(slide, xs[j], y, ws[j], rowH,
           j === v.highlight_column ? (i % 2 ? 'E7F0F7' : 'F1F6FA') :
           (i % 2 ? C.white : C.soft), C.line);
      txt(slide, cell, xs[j] + 0.16, y + 0.08, ws[j] - 0.3, rowH - 0.16,
          { fontSize: 15, bold: j === 0, color: j === v.highlight_column ? C.blue : C.dark });
    });
  });
}
function barChart(slide, s) {
  const v = s.visual_plan;
  const data = v.series || [];
  const max = Math.max(1, ...data.map(d => d.value));
  const base = 5.78, availableH = 3.45, colGap = 1.3;
  const barWidth = 1.06, plotW = data.length * (barWidth + colGap) - colGap;
  const start = (W - plotW) / 2;
  line(slide, start - 0.25, base, start + plotW + 0.25, base, C.gray, 1);
  data.forEach((d, i) => {
    const x = start + i * (barWidth + colGap);
    const h = d.value / max * availableH;
    rect(slide, x, base - h, barWidth, h,
         d.label === v.highlight ? C.blue : 'C5D3DD');
    txt(slide, String(d.value), x - 0.12, base - h - 0.36,
        barWidth + 0.24, 0.3, { fontSize: 17, bold: true, align: 'center',
          color: d.label === v.highlight ? C.blue : C.dark });
    txt(slide, d.label, x - 0.06, base + 0.15, barWidth + 0.12, 0.3,
        { fontSize: 16, align: 'center', color: C.dark });
  });
  txt(slide, v.units, 0.95, 1.85, 4.7, 0.3,
      { fontSize: 12, color: C.gray });
}
function sequence(slide, s) {
  const steps = s.visual_plan.steps;
  const n = steps.length, margin = 0.84, gap = 0.26;
  const usable = W - 2 * margin;
  const boxW = (usable - gap * (n - 1)) / n;
  const y = 2.92;
  steps.forEach((label, i) => {
    const x = margin + i * (boxW + gap);
    rect(slide, x, y, boxW, 1.2, i === n - 1 ? C.pale : C.soft, C.line, true);
    txt(slide, String(i + 1).padStart(2, '0'), x + 0.15, y + 0.18, 0.47, 0.25,
        { fontSize: 12, bold: true, color: C.blue });
    txt(slide, label, x + 0.13, y + 0.49, boxW - 0.26, 0.54,
        { fontSize: 16, bold: true, align: 'center', color: C.navy });
    if (i < n - 1) {
      line(slide, x + boxW, y + 0.6, x + boxW + gap, y + 0.6, C.blue, 2);
    }
  });
  txt(slide, 'Aprovação / retorno para correções', 3.8, 4.7, 5.75, 0.47,
      { fontSize: 15, color: C.gray, italic: true, align: 'center' });
}
function recommendation(slide, s) {
  const v = s.visual_plan;
  txt(slide, 'DECISÃO PROPOSTA', 0.9, 1.85, 5.0, 0.35,
      { fontSize: 12, color: C.blue, bold: true });
  rect(slide, 0.9, 2.35, 0.09, 2.75, C.blue);
  txt(slide, v.decision, 1.25, 2.55, 5.3, 1.5,
      { fontSize: 29, bold: true, color: C.navy });
  txt(slide, v.rationale || '', 1.25, 4.22, 5.2, 1.03,
      { fontSize: 16, color: C.gray });
  txt(slide, 'PRÓXIMAS AÇÕES', 7.05, 1.85, 4.7, 0.35,
      { fontSize: 12, bold: true, color: C.blue });
  (v.actions || []).forEach((action, i) => {
    const y = 2.42 + i * 1.05;
    txt(slide, String(i + 1).padStart(2, '0'), 7.05, y, 0.54, 0.5,
        { fontSize: 20, bold: true, color: C.blue });
    txt(slide, action, 7.75, y, 4.6, 0.73,
        { fontSize: 17, color: C.dark });
    line(slide, 7.05, y + 0.82, 12.33, y + 0.82, C.line, 0.7);
  });
}
const layouts = {
  thesis_cover: cover, driver_tree: driverTree, comparison_matrix: comparison,
  bar_chart: barChart, sequence, recommendation,
};
deck.slides.forEach((s, i) => {
  const draw = layouts[s.layout];
  if (!draw) throw new Error('Unsupported layout: ' + s.layout);
  const slide = pptx.addSlide();
  if (s.layout !== 'thesis_cover') addFrame(slide, s, i + 1);
  draw(slide, s);
  if (typeof slide.addNotes === 'function') {
    slide.addNotes((s.notes || []).join('\n'));
  }
});
fs.mkdirSync(path.dirname(outFile), { recursive: true });
await pptx.writeFile({ fileName: outFile });
console.log('Wrote ' + deck.slides.length + ' slides to ' + outFile);
console.log('VISUAL QA NOT VERIFIED: open/render in target PowerPoint before delivery.');
