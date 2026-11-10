// Deck v3 (Adm Fin, Cruz Neto 2018). Cada slide tem uma forma própria, escolhida pelo
// argumento que ele precisa provar. Código visual: contorno = declarado, preenchido = observado.
// Números: leitura/dissertacao_condensada.md e leitura/anexo2.csv.
const path = require("path");
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const SKILL = "C:/Users/adria/.claude/skills/synced/08880bea-5393-40ac-b324-ec6a48439c82_8a8b6610-ca77-4d15-b215-dc9e5dbc2267/pptx";
const { applyTheme } = require(SKILL + "/scripts/apply_theme.js");

// ---------- sistema visual ----------
const H = {
  navy: "0B2545", mark: "22589C", loss: "C2410C", ink: "1F2328", gray: "5B6670",
  grayMark: "A3ACB5", soft: "DDE2E6", line: "D9DEE3", fill: "F1F3F5", white: "FFFFFF",
  zoneLoss: "F6DED3", zoneGap: "DCE6F2",
};
const THEME = {
  name: "Consultoria v3", headFontFace: "Arial", bodyFontFace: "Arial",
  colors: { dk1: H.ink, lt1: H.white, dk2: H.navy, lt2: H.fill, accent1: H.mark, accent2: H.loss, accent3: H.gray, accent4: H.grayMark, accent5: H.navy, accent6: H.line, hlink: H.mark, folHlink: H.gray },
};
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.theme = { headFontFace: "Arial", bodyFontFace: "Arial" };
pres.title = "Precificação de serviços contábeis: Cruz Neto (2018)";
pres.author = "Adrian Villela";

// Esqueleto: título termina sempre no fio de 1,33; corpo de 1,55 a 6,5; rodapé de 6,68 a 7,2.
const L = 0.45, R = 12.88, W = R - L, TOP = 1.55, BOT = 6.5;
const BODY = 12, LABEL = 10; // três estilos: título 22, corpo 12, rótulo 10

pres.defineSlideMaster({
  title: "V3",
  background: { color: H.white },
  slideNumber: { x: 12.45, y: 7.0, w: 0.43, h: 0.25, fontSize: 9, color: H.gray, align: "right" },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: L, y: 0.3, w: W, h: 0.95, fontFace: "Arial", fontSize: 22, bold: true, color: H.navy, valign: "bottom", align: "left", margin: 0 }, text: "" } },
  ],
});

// ---------- helpers ----------
const SECOES = ["Contexto", "1 Declarado", "2 Praticado", "3 Efeito"];
function rich(str, base = {}, boldColor) {
  return str.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map(part => part.startsWith("**")
    ? { text: part.slice(2, -2), options: Object.assign({}, base, { bold: true }, boldColor ? { color: boldColor } : {}) }
    : { text: part, options: Object.assign({}, base) });
}
function T(s, t, o, boldColor) {
  s.addText(typeof t === "string" ? rich(t, {}, boldColor) : t, Object.assign({ isTextBox: true, fontFace: "Arial", fontSize: BODY, color: H.ink, valign: "top", margin: 0 }, o));
}
function label(s, t, o) { T(s, t.toUpperCase(), Object.assign({ fontSize: LABEL, bold: true, color: H.gray, charSpacing: 1, h: 0.22 }, o)); }
function rect(s, x, y, w, h, fill, line, o = {}) {
  s.addShape(o.round ? pres.shapes.ROUNDED_RECTANGLE : pres.shapes.RECTANGLE, Object.assign({ x, y, w, h, fill: fill ? { color: fill } : { type: "none" }, line: line ? { color: line, width: o.lw || 0.75, dashType: o.dash } : { type: "none" }, objectName: o.name || "rect" }, o.round ? { rectRadius: 0.06 } : {}));
}
function seg(s, x1, y1, x2, y2, color, width, dash, arrow) {
  const o = { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1) || 0.001, h: Math.abs(y2 - y1) || 0.001, line: { color, width: width || 1 }, objectName: "linha" };
  if (dash) o.line.dashType = dash;
  if (arrow) o.line.endArrowType = "triangle";
  if (x2 < x1) o.flipH = true;
  if (y2 < y1) o.flipV = true;
  s.addShape(pres.shapes.LINE, o);
}
function circ(s, x, y, d, fill, line, lw) {
  s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: fill ? { color: fill } : { type: "none" }, line: line ? { color: line, width: lw || 1 } : { type: "none" }, objectName: "circ" });
}
function slide(secao, titulo, fonte, notas, speaker) {
  const s = pres.addSlide({ masterName: "V3" });
  s.addText(titulo, { placeholder: "title" });
  seg(s, L, 1.33, R, 1.33, H.line, 0.75);
  if (secao !== null && secao !== undefined) {
    const runs = [];
    SECOES.forEach((n, i) => {
      runs.push({ text: n, options: { bold: i === secao, color: i === secao ? H.navy : H.grayMark } });
      if (i < SECOES.length - 1) runs.push({ text: "    ", options: {} });
    });
    T(s, runs, { x: 7.4, y: 0.1, w: 5.48, h: 0.22, fontSize: 9, align: "right" });
  }
  const foot = [];
  (notas || []).forEach(n => foot.push({ text: n, options: { breakLine: true } }));
  if (fonte) foot.push({ text: "Fonte: " + fonte });
  if (foot.length) T(s, foot, { x: L, y: 6.64, w: 11.9, h: 0.58, fontSize: 9, color: H.gray, valign: "bottom" });
  if (speaker) s.addNotes(speaker);
  return s;
}
const CHART = {
  catAxisLabelColor: H.gray, valAxisLabelColor: H.gray, catAxisLabelFontFace: "Arial", valAxisLabelFontFace: "Arial",
  catAxisLabelFontSize: LABEL, valAxisLabelFontSize: LABEL, valGridLine: { color: "E6E9EC", size: 0.75 }, catGridLine: { style: "none" },
  catAxisLineShow: true, catAxisLineColor: "B8BFC6", valAxisLineShow: false, showLegend: false,
  plotArea: { fill: { color: "FFFFFF", transparency: 100 } },
};
const brl = (v, d = 2) => v.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });

// ---------- dados do Anexo 2 ----------
const rows = fs.readFileSync(path.join(__dirname, "..", "leitura", "anexo2.csv"), "utf8").trim().split(/\r?\n/).slice(1).map(l => {
  const c = l.split(",");
  return { emp: c[1], custo: +c[5], ideal: +c[6], cobrado: +c[7] };
}).map(r => ({ ...r, lucro: +(r.cobrado - r.custo).toFixed(2), gap: +(r.cobrado - r.ideal).toFixed(2) }));
const byProfit = [...rows].sort((a, b) => b.lucro - a.lucro);
const totalLucro = rows.reduce((a, r) => a + r.lucro, 0);
let acc = 0;
const cum = byProfit.map(r => (acc += r.lucro, +(acc / totalLucro * 100).toFixed(1)));
const byGap = [...rows].sort((a, b) => b.gap - a.gap);
const nPrej = rows.filter(r => r.lucro < 0).length, nDesc = rows.filter(r => r.lucro >= 0 && r.gap < 0).length, nAcima = rows.filter(r => r.gap >= 0).length;
const totCobrado = rows.reduce((a, r) => a + r.cobrado, 0), totIdeal = rows.reduce((a, r) => a + r.ideal, 0), totCusto = rows.reduce((a, r) => a + r.custo, 0);
const difMarkup = totCusto / (1 - 0.30 - 0.0953) - totIdeal;
const check = (c, m) => { if (!c) throw new Error("checagem: " + m); };
check(Math.abs(totalLucro - 9201.31) < 0.01, "lucro total");
check(Math.max(...cum) === 112.9 && cum.indexOf(112.9) === 27, "pico no 28º");
check(cum.findIndex(v => v >= 100) === 18, "19 clientes");
check(nPrej === 8 && nDesc === 17 && nAcima === 11, "zonas 8/17/11");
check(Math.abs(totCobrado - 33970) < 0.01 && Math.abs(totIdeal - 39111.14) < 0.05, "totais");
check(Math.round(difMarkup) === 1849, "markup");
const gapPct = (totCobrado / totIdeal - 1) * 100;
check(brl(gapPct, 1) === "-13,1", "gap " + gapPct);

// ================= Capa =================
let s = pres.addSlide({ masterName: "V3" });
label(s, "Administração Financeira II   ·   Formação de preços   ·   Exemplo de aplicação", { x: L, y: 1.75, w: W, h: 0.3, fontSize: 11 });
T(s, "Como escritórios contábeis formam o preço dos seus serviços, e o que os dados da própria pesquisa mostram", { x: L, y: 2.2, w: 11.2, h: 1.9, fontSize: 32, bold: true, color: H.navy });
seg(s, L, 4.35, L + 2.0, 4.35, H.navy, 2);
T(s, "Leitura aplicada de CRUZ NETO, B. P. Métodos de precificação de serviços: uma abordagem comparativa entre os métodos de precificação de serviços contábeis pelo custo e valor de mercado. Dissertação (Mestrado Profissional em Controladoria e Finanças Empresariais), Universidade Presbiteriana Mackenzie, 2018.", { x: L, y: 4.6, w: 10.5, h: 1.0, fontSize: 13, color: H.gray });
T(s, "Adrian Villela   ·   UFF   ·   5 de outubro de 2026", { x: L, y: 6.5, w: W, h: 0.3 });
s.addNotes("Minha parte é o exemplo de aplicação: o que acontece quando a teoria de formação de preços que a Luisa e o Robert apresentaram encontra um setor real. O caso é a dissertação de mestrado do Benedito Cruz Neto, Mackenzie, 2018, sobre como escritórios de contabilidade em São Paulo precificam. Vou resumir o trabalho e, no fim, mostrar o que os anexos da própria dissertação revelam quando a gente faz as contas.");

// ================= 1. Sumário executivo: a história em uma página =================
s = slide(null, "Sem custo por cliente, escritórios que dizem precificar pelo custo acabam com o preço ancorado no mercado", "Cruz Neto (2018), p. 9, 20, 22, 35, 36, 79, 80, 87, 88 e Anexo 2 (p. 106); cálculos do apresentador sobre o Anexo 2", null,
  "Este slide é a apresentação inteira em uma página, lida de cima para baixo. Situação: a teoria oferece três bases de preço, e o setor contábil é grande, sem tabela e intensivo em mão de obra. Complicação: o autor ouviu onze sócios e leu 109 contratos; os sócios dizem custo, os contratos mostram salário mínimo, e ninguém tem custo por cliente. Resolução: sem custo por cliente, o preço fica ancorado no mercado, e o Anexo 2 da própria dissertação mostra o efeito. À direita estão os números que vou provar ao longo da apresentação.");
const blocos = [
  ["Situação", "A formação de preço pode partir do custo, do mercado ou do valor percebido. No setor contábil, com 64.026 escritórios, sem tabela oficial desde 1990 e com a mão de obra como maior custo, cada escritório forma o próprio preço.", "64.026", "escritórios contábeis no Brasil"],
  ["Complicação", "Cruz Neto ouviu 11 sócios e leu 109 contratos. Os sócios declaram o custo como base e o mercado como conferência, mas boa parte dos contratos atrela o honorário ao salário mínimo, e nenhum escritório tem custo por colaborador e cliente.", "43 de 109", "contratos atrelados ao salário mínimo"],
  ["Resolução", "Sem custo por cliente, o preço fica ancorado no mercado. O Anexo 2 da própria dissertação mostra o efeito numa carteira de 36 clientes: a maioria paga abaixo do preço que o custo indica, e uma parte paga menos do que custa.", "25 de 36", "clientes abaixo do preço ideal; 8 abaixo do custo"],
];
blocos.forEach(([k, v, n, nl], i) => {
  const y = TOP + 0.05 + i * 1.5;
  if (i) seg(s, L, y - 0.12, R, y - 0.12, H.line, 0.75);
  T(s, k, { x: L, y, w: 1.9, h: 0.3, bold: true, color: H.navy, fontSize: 14 });
  T(s, v, { x: 2.45, y, w: 7.3, h: 1.25, fontSize: 13 });
  T(s, n, { x: 10.2, y: y - 0.05, w: 2.68, h: 0.5, fontSize: 24, bold: true, color: i === 2 ? H.navy : H.gray });
  T(s, nl, { x: 10.2, y: y + 0.48, w: 2.68, h: 0.6, fontSize: LABEL, color: H.gray });
});
seg(s, 9.95, TOP, 9.95, TOP + 4.3, H.line, 0.75);
seg(s, L, 6.0, R, 6.0, H.navy, 1);
T(s, "Proposto pelo próprio autor (p. 88): comparar o resultado de quem precifica pelo custo com o de quem precifica pelo mercado. O Anexo 2 já traz o tipo de dado necessário.", { x: 2.45, y: 6.1, w: 10.4, h: 0.4, color: H.navy });
T(s, "Próximo passo", { x: L, y: 6.1, w: 1.9, h: 0.3, bold: true, color: H.navy, fontSize: 14 });

// ================= 2. Três bases: o trade-off =================
s = slide(0, "Precificar é escolher entre três bases que trocam facilidade por qualidade, num setor sem tabela e com 64 mil escritórios", "SESCAPLDR (2016), Duarte (2012) e Souza (2009), citados em Cruz Neto (2018), p. 47 e 48; setor: p. 17, 20, 35, 36 e 53",
  ["Posições qualitativas definidas pelo apresentador a partir das avaliações citadas na p. 47 (Quadro 6); não são medidas."],
  "Conectando com a Luisa e o Robert: a literatura que o autor revisa oferece três bases de preço, e elas não são equivalentes. O sindicato de Londrina resume em três frases, que eu posicionei neste mapa. O mercado é o mais fácil e o mais traiçoeiro. O valor percebido é o melhor e o mais difícil, porque exige pesquisa. O custo fica no meio: é o mais importante para conhecer a empresa, mas não o melhor, e é o mais usado. Nenhuma base é fácil e boa ao mesmo tempo. À direita, por que essa escolha pesa tanto no setor contábil: muitos concorrentes, nenhuma tabela oficial e custo dominado por mão de obra.");
// mapa 2x2
const mx = L + 0.55, my = TOP + 0.3, mw = 7.0, mh = 4.35;
rect(s, mx + mw / 2, my, mw / 2, mh / 2, H.fill, null, { name: "quadrante ideal" });
seg(s, mx, my + mh, mx + mw, my + mh, H.gray, 1, null, true);
seg(s, mx, my + mh, mx, my, H.gray, 1, null, true);
seg(s, mx + mw / 2, my, mx + mw / 2, my + mh, H.line, 0.75, "dash");
seg(s, mx, my + mh / 2, mx + mw, my + mh / 2, H.line, 0.75, "dash");
label(s, "Facilidade de aplicar  →", { x: mx + mw - 3.0, y: my + mh + 0.08, w: 3.0, align: "right" });
T(s, [{ text: "QUALIDADE COMO FORMA DE PRECIFICAR  →", options: { bold: true, color: H.gray, fontSize: LABEL, charSpacing: 1 } }], { x: mx - 2.45, y: my + mh / 2 - 0.11, w: 4.35, h: 0.22, rotate: 270, align: "center" });
T(s, "Fácil e bom: nenhuma base está aqui", { x: mx + mw / 2 + 0.15, y: my + 0.12, w: 3.2, h: 0.25, fontSize: LABEL, color: H.gray, italic: true });
const met = [
  ["Valor percebido", 0.16, 0.86, false, "“a menos importante, porém a melhor forma de se precificar”", "Exige pesquisa, análise de vendas e entrevistas (Duarte)"],
  ["Custo", 0.47, 0.5, true, "“a forma mais importante para conhecer a realidade da empresa, entretanto não é a melhor”", "O mais utilizado (Duarte, 2012)"],
  ["Mercado", 0.85, 0.15, false, "“a forma mais fácil, todavia a mais traiçoeira”", "Comum em escritórios iniciantes ou pequenos (Souza, 2009)"],
];
met.forEach(([n, fx, fy, dest, q, b], i) => {
  const cx = mx + mw * fx, cy = my + mh * (1 - fy), d = 0.34;
  circ(s, cx - d / 2, cy - d / 2, d, dest ? H.navy : H.white, dest ? H.navy : H.gray, 1.25);
  const tx = i === 2 ? cx - 3.35 : cx + 0.28, al = i === 2 ? "right" : "left";
  T(s, n, { x: tx, y: cy - 0.32, w: 3.1, h: 0.25, bold: true, color: dest ? H.navy : H.ink, align: al });
  T(s, [{ text: q, options: { italic: true, breakLine: true } }, { text: b, options: { color: H.gray } }], { x: tx, y: cy - 0.05, w: 3.1, h: 0.85, fontSize: LABEL, align: al });
});
// contexto do setor
const sx = 9.25;
seg(s, sx - 0.25, TOP, sx - 0.25, BOT, H.line, 0.75);
label(s, "Por que a escolha pesa no setor", { x: sx, y: TOP, w: R - sx });
[["64.026", "escritórios contábeis no Brasil; 29,9% deles em São Paulo (CFC, 2018)"], ["Desde 1990", "a tabela de honorários das entidades de classe deixa de valer (CDC)"], ["Mão de obra", "é o maior componente de custo (Vaz, 2014)"], ["Rara", "é a empresa de serviços com sistema de custos (Farber et al., 2014)"]]
  .forEach(([a, b], i) => {
    const y = TOP + 0.4 + i * 1.18;
    if (i) seg(s, sx, y - 0.12, R, y - 0.12, H.line, 0.75);
    T(s, a, { x: sx, y, w: R - sx, h: 0.4, fontSize: 18, bold: true, color: H.navy });
    T(s, b, { x: sx, y: y + 0.42, w: R - sx, h: 0.6 });
  });

// ================= 3. Duas lentes =================
s = slide(0, "Cruz Neto responde com duas lentes: o que 11 sócios declaram e o que 109 contratos documentam", "Cruz Neto (2018), p. 19, 62, 64 a 71, 80, 87 e Anexos 1 e 2",
  null,
  "O desenho da pesquisa tem uma pergunta e duas lentes, e isso define o resto da apresentação. A primeira lente é o que os sócios declaram, em onze entrevistas. Vou desenhar sempre o que é declarado com contorno, vazado. A segunda é o que está documentado: 109 contratos e, nos anexos, os custos e preços de um escritório-exemplo. O que é observado aparece sempre preenchido. Cada lente vê uma coisa e deixa de ver outra: as entrevistas mostram como os sócios pensam o preço, mas não o resultado; os contratos mostram como o preço é escrito, mas não se sabe de onde vêm. Uma observação: a pergunta busca o método mais utilizado, e a conclusão fala do melhor método.");
// pergunta
const qx = L, qy = 2.55, qw = 3.15, qh = 2.6;
rect(s, qx, qy, qw, qh, H.fill, null, { name: "pergunta" });
label(s, "Pergunta (p. 19)", { x: qx + 0.2, y: qy + 0.18, w: qw - 0.4 });
T(s, "“qual o método de precificação é mais utilizado para a prestação de serviços de natureza contábil?”", { x: qx + 0.2, y: qy + 0.5, w: qw - 0.4, h: 1.2, fontSize: 13, italic: true, color: H.navy });
T(s, "A conclusão responde pelo “melhor método” (p. 87), o que pede dado de resultado.", { x: qx + 0.2, y: qy + 1.75, w: qw - 0.4, h: 0.7, fontSize: LABEL, color: H.gray });
// lentes
const lx = 4.25, lw2 = 3.3;
const lentes = [
  { y: TOP, t: "Declarado", n: "11 entrevistas", d: "Sócios de sociedades limitadas em SP; 40 a 70 minutos; dez/2017 a dez/2018 (p. 70 e 71)", ve: "Como os sócios descrevem o cálculo do preço, o papel do mercado e a percepção de qualidade", nao: "O preço efetivamente cobrado e o resultado: o estudo mede “desempenho percebido e não o desempenho medido” (p. 62)", obs: false },
  { y: 4.1, t: "Observado", n: "109 contratos", d: "Contratos de SP firmados de 2004 a 2017 (p. 80), mais os Anexos 1 e 2: custos e preços de um escritório-exemplo (NIBO, 2018)", ve: "Como o preço é formalizado no contrato; custo, preço ideal e preço cobrado por cliente no Anexo 2", nao: "A origem e o critério de seleção dos contratos, e o método dos 66 não classificados", obs: true },
];
lentes.forEach(le => {
  const h2 = 2.4;
  rect(s, lx, le.y, lw2, h2, le.obs ? H.navy : null, le.obs ? null : H.navy, { name: "lente", lw: 1.5 });
  label(s, le.t, { x: lx + 0.2, y: le.y + 0.18, w: lw2 - 0.4, color: le.obs ? "C9D3E0" : H.gray });
  T(s, le.n, { x: lx + 0.2, y: le.y + 0.45, w: lw2 - 0.4, h: 0.4, fontSize: 18, bold: true, color: le.obs ? H.white : H.navy });
  T(s, le.d, { x: lx + 0.2, y: le.y + 0.95, w: lw2 - 0.4, h: 1.3, fontSize: LABEL, color: le.obs ? "E3E8EF" : H.gray });
  seg(s, qx + qw, qy + qh / 2, lx, le.y + h2 / 2, H.grayMark, 1.25, null, true);
  const vx = 7.9, vw = 2.4, nx = 10.48, nw = R - 10.48;
  label(s, "O que mostra", { x: vx, y: le.y + 0.18, w: vw });
  label(s, "O que não mostra", { x: nx, y: le.y + 0.18, w: nw, color: H.loss });
  T(s, le.ve, { x: vx, y: le.y + 0.5, w: vw, h: 1.8 });
  T(s, le.nao, { x: nx, y: le.y + 0.5, w: nw, h: 1.8 });
  seg(s, vx, le.y, R, le.y, H.line, 0.75);
});
// legenda do código visual
T(s, [{ text: "Código visual da apresentação:  ", options: { bold: true, color: H.navy } }, { text: "contorno = declarado pelos sócios   ·   preenchido = observado em documento ou número" }], { x: qx, y: 5.55, w: 3.4, h: 0.7, fontSize: LABEL, color: H.gray });

// ================= 4. Árvore do honorário =================
s = slide(1, "Para os sócios, o honorário é o volume do cliente multiplicado pelo custo de cada unidade, mais margem e impostos", "Entrevista ORGC7, p. 76 e 77; Anexos 1 e 2 (NIBO, 2018), p. 105 e 106",
  ["¹ Multiplicador observado em todos os 36 clientes do Anexo 2 (slide 11).   ² O anexo não nomeia a unidade; nota fiscal, lançamento e empregado é inferência a partir das p. 80 e 87."],
  "É assim que os sócios descrevem o cálculo, com os números do Anexo 1. Lendo da direita para a esquerda: cada departamento tem um custo mensal, com salários, encargos e rateio dos custos fixos. Dividindo pelo volume do mês, sai um custo por unidade: 2,33 no fiscal, 1,56 no contábil, 31,22 por empregado no pessoal. O cliente ABC tem 10 unidades no fiscal, 20 no contábil e 1 empregado: custo de 85,82. Multiplicado por 1,5791, que embute margem e impostos, chega ao honorário ideal de 135,52. Ele paga 180. A ORGC7 resume: volume de operações vezes custo hora por departamento.");
const colsX = [L, 3.4, 6.55, 9.8], colsW = [2.6, 2.75, 2.95, R - 9.8];
["Preço", "Custo do cliente", "Custo por departamento", "Custo unitário"].forEach((h, i) => label(s, h, { x: colsX[i], y: TOP, w: colsW[i] }));
function node(x, y, w, h, t, v, dest) {
  rect(s, x, y, w, h, dest ? H.navy : H.white, dest ? null : H.grayMark, { name: "no" });
  T(s, t, { x: x + 0.14, y: y + 0.1, w: w - 0.28, h: 0.26, fontSize: LABEL, color: dest ? "C9D3E0" : H.gray });
  T(s, v, { x: x + 0.14, y: y + 0.38, w: w - 0.28, h: h - 0.44, fontSize: 14, bold: true, color: dest ? H.white : H.ink });
}
const rowY = [1.95, 3.15, 4.35], nh = 0.95;
node(colsX[0], 3.15, colsW[0], nh, "Honorário ideal", "R$ 135,52", true);
T(s, "Cobrado: R$ 180,00 (Anexo 2)", { x: colsX[0], y: 4.18, w: colsW[0], h: 0.25, fontSize: LABEL, color: H.gray });
node(colsX[1], 2.55, colsW[1], nh, "Custo do cliente", "R$ 85,82", false);
node(colsX[1], 4.35, colsW[1], nh, "Margem e impostos¹", "× 1,5791", false);
[["Fiscal: 10 unidades²", "10 × 2,33 = R$ 23,34", "Fiscal: R$ 7.649,16 ÷ volume", "R$ 2,33 por unidade"],
 ["Contábil: 20 unidades²", "20 × 1,56 = R$ 31,26", "Contábil: R$ 8.377,65 ÷ volume", "R$ 1,56 por unidade"],
 ["Pessoal: 1 empregado²", "1 × 31,22 = R$ 31,22", "Pessoal: R$ 8.741,89 ÷ volume", "R$ 31,22 por empregado"]].forEach(([t1, v1, t2, v2], i) => {
  node(colsX[2], rowY[i], colsW[2], nh, t1, v1, false);
  node(colsX[3], rowY[i], colsW[3], nh, t2, v2, false);
  seg(s, colsX[2] + colsW[2], rowY[i] + nh / 2, colsX[3], rowY[i] + nh / 2, H.grayMark, 1);
  seg(s, colsX[1] + colsW[1], 2.55 + nh / 2, colsX[2], rowY[i] + nh / 2, H.grayMark, 1);
});
seg(s, colsX[0] + colsW[0], 3.15 + nh / 2, colsX[1], 2.55 + nh / 2, H.navy, 1.25);
seg(s, colsX[0] + colsW[0], 3.15 + nh / 2, colsX[1], 4.35 + nh / 2, H.navy, 1.25);
seg(s, L, 5.6, R, 5.6, H.line, 0.75);
T(s, [{ text: "“os honorários são calculados considerando o volume de operações dos clientes vezes o custo hora de cada colaborador por departamento”", options: { italic: true } }, { text: "   ORGC7, p. 76 e 77", options: { bold: true, color: H.gray, fontSize: LABEL } }], { x: L, y: 5.75, w: W, h: 0.6, fontSize: 12 });

// ================= 5. Custo: cascata + 160 horas =================
s = slide(1, "O custo é quase todo mão de obra, e três quartos da hora do sócio não pertencem a nenhum cliente", "Anexo 1 (NIBO, 2018), p. 105; Apêndices 1 e 5 (adaptados de Vaz, 2014), p. 100 e 104; ORGC7, p. 79. Percentuais calculados pelo apresentador", null,
  "Se o preço parte do custo, vale ver do que o custo é feito. À esquerda, o escritório-exemplo do Anexo 1: 24.768 reais por mês. As três primeiras barras são mão de obra: equipe, administrativo e o pró-labore do sócio, 76% do total, perto dos 80% que a ORGC7 cita. Os encargos somam 76% sobre o salário. À direita, as 160 horas do sócio, uma célula por hora: só 40 vão para a rotina contábil de clientes; as outras 120 são gestão, consultoria, atendimento e administração. A conclusão está embaixo: boa parte do custo é comum a todos os clientes, e a regra de rateio decide quanto cada um paga.");
label(s, "Custo mensal do escritório-exemplo, R$ (Anexo 1)", { x: L, y: TOP, w: 7.4 });
const wf = [["Equipe dos\ndepartamentos", 11722.42, true], ["Adminis-\ntrativo", 1896.27, true], ["Pró-labore\ndo sócio", 5100.0, true], ["Demais\ncustos fixos", 6050.0, false], ["Custo total", 24768.69, null]];
const wfX0 = L + 0.05, wfY0 = 5.05, wfH = 2.55, bw = 1.12, bgap = 0.36;
let base = 0;
wf.forEach(([lab, v, mo], i) => {
  const x = wfX0 + i * (bw + bgap), isTot = mo === null, y0 = isTot ? 0 : base;
  const yTop = wfY0 - (y0 + v) / 24768.69 * wfH, hh = v / 24768.69 * wfH;
  rect(s, x, yTop, bw, hh, mo ? H.mark : isTot ? H.gray : H.grayMark, null, { name: "wf" + i });
  T(s, brl(v, 0), { x: x - 0.1, y: yTop - 0.24, w: bw + 0.2, h: 0.22, fontSize: LABEL, bold: true, align: "center" });
  T(s, lab, { x: x - 0.15, y: wfY0 + 0.06, w: bw + 0.3, h: 0.4, fontSize: LABEL, color: H.gray, align: "center" });
  if (!isTot && i < 4) seg(s, x + bw, yTop, x + bw + bgap, yTop, H.grayMark, 0.75, "dash");
  if (!isTot) base += v;
});
seg(s, wfX0 - 0.05, wfY0, wfX0 + 5 * bw + 4 * bgap + 0.05, wfY0, "B8BFC6", 1);
// colchete da mão de obra sobre as 3 primeiras barras
const bTop = wfY0 - 18718.69 / 24768.69 * wfH - 0.5;
seg(s, wfX0, bTop + 0.12, wfX0, bTop, H.mark, 1); seg(s, wfX0, bTop, wfX0 + 3 * bw + 2 * bgap, bTop, H.mark, 1); seg(s, wfX0 + 3 * bw + 2 * bgap, bTop, wfX0 + 3 * bw + 2 * bgap, bTop + 0.12, H.mark, 1);
T(s, "Mão de obra: R$ 18.719 (75,6%), com encargos de 76,34% sobre o salário. A ORGC7 fala em 80%", { x: wfX0, y: bTop - 0.46, w: 4.0, h: 0.42, fontSize: LABEL, bold: true, color: H.mark });
// 160 horas
const gx = 8.25, cols = 16, rowsN = 10, cell = 0.235, cg = 0.04;
seg(s, gx - 0.3, TOP, gx - 0.3, 5.5, H.line, 0.75);
label(s, "160 horas mensais do sócio, 1 célula = 1 hora", { x: gx, y: TOP, w: R - gx });
for (let i = 0; i < 160; i++) {
  const r = Math.floor(i / cols), c = i % cols;
  const op = i < 40;
  rect(s, gx + c * (cell + cg), 1.95 + r * (cell + cg), cell, cell, op ? H.mark : H.white, op ? null : H.grayMark, { name: "h" + i, lw: 0.5 });
}
const gyEnd = 1.95 + rowsN * (cell + cg);
T(s, [{ text: "40 h na rotina contábil", options: { bold: true, color: H.mark } }, { text: " (preenchidas): atribuíveis a clientes" }], { x: gx, y: gyEnd + 0.08, w: R - gx, h: 0.25, fontSize: LABEL });
T(s, [{ text: "120 h fora da rotina", options: { bold: true, color: H.gray } }, { text: ": gestão, consultoria, atendimento e administração, R$ 3.900 de R$ 5.200" }], { x: gx, y: gyEnd + 0.36, w: R - gx, h: 0.45, fontSize: LABEL });
seg(s, L, 5.75, R, 5.75, H.navy, 1);
T(s, "Boa parte do custo é comum a todos os clientes: pró-labore, administrativo e demais fixos somam 53% do total. A regra de rateio, que nenhum escritório formaliza, decide quanto cada cliente paga.", { x: L, y: 5.85, w: W, h: 0.6, color: H.navy });

// ================= 6. Afirmação → teste =================
s = slide(1, "Os sócios fazem afirmações sobre resultado que o estudo não testa; só uma delas tem dado no próprio trabalho", "Cruz Neto (2018), p. 62, 69, 75 a 80 e 87",
  ["O Quadro 12 previa medir desempenho por margem bruta, EBIT, ROE e ROI (p. 69); a conclusão registra que não há uso de indicador de desempenho (p. 87)."],
  "A lente das entrevistas produz afirmações fortes, e cada uma é, no fundo, uma hipótese sobre resultado. Na primeira coluna está o que os sócios dizem, desenhado com contorno porque é declarado. No meio, o que seria preciso medir para testar. À direita, se o trabalho tem esse dado. O preço pelo custo pode ser olhado com o Anexo 2, que traz custo e preço de cada cliente, e é o que faço na parte 3. O papel do mercado tem um indício nos contratos. As outras três afirmações, previsibilidade, retorno de clientes e qualidade, não têm dado nenhum. O próprio autor registra que mede desempenho percebido.");
const ax = [L, 5.35, 9.75], aw = [4.35, 3.85, R - 9.75];
["O que os sócios afirmam (declarado)", "O que seria preciso medir", "Dado disponível no trabalho"].forEach((h, i) => label(s, h, { x: ax[i], y: TOP, w: aw[i] }));
const af = [
  ["O preço parte do custo apurado mais a margem", "ORGC1 e ORGC7, p. 76 e 77", "Custo e preço cobrado de cada cliente", 2, "Sim: Anexo 2, 36 clientes", "parte 3"],
  ["O mercado serve só de conferência", "ORGC1, p. 80; p. 22", "Método escrito nos contratos", 1, "Indício: 43 de 109 contratos", "slide 7"],
  ["Quem precifica pelo custo enxerga 6, 12 ou 24 meses", "ORGC2, p. 80", "Resultado ao longo do tempo, por método", 0, "Não", ""],
  ["Clientes que saem por preço voltam pela qualidade", "ORGC1, p. 75", "Saída e retorno de clientes por faixa de preço", 0, "Não", ""],
  ["Precificar pelo mercado prejudica a qualidade", "autor, p. 80", "Qualidade e remuneração por método", 0, "Não", ""],
];
af.forEach(([a, src, m, lvl, st, ref], i) => {
  const y = TOP + 0.35 + i * 0.86, h2 = 0.72;
  rect(s, ax[0], y, aw[0], h2, null, H.grayMark, { round: true, name: "afirma" });
  T(s, [{ text: "“" + a + "”", options: { italic: true, breakLine: true } }, { text: src, options: { fontSize: 9, color: H.gray } }], { x: ax[0] + 0.15, y: y + 0.08, w: aw[0] - 0.3, h: h2 - 0.1 });
  seg(s, ax[0] + aw[0] + 0.08, y + h2 / 2, ax[1] - 0.12, y + h2 / 2, H.grayMark, 1, null, true);
  T(s, m, { x: ax[1], y, w: aw[1], h: h2, valign: "middle" });
  seg(s, ax[1] + aw[1] + 0.05, y + h2 / 2, ax[2] - 0.12, y + h2 / 2, H.grayMark, 1, null, true);
  const fill = lvl === 2 ? H.navy : lvl === 1 ? H.soft : null, line = lvl === 0 ? H.grayMark : null;
  rect(s, ax[2], y + 0.08, aw[2], h2 - 0.16, fill, line, { round: true, name: "status" });
  T(s, [{ text: st, options: { bold: lvl === 2, color: lvl === 2 ? H.white : lvl === 1 ? H.ink : H.gray } }, ...(ref ? [{ text: "  " + ref, options: { fontSize: 9, color: lvl === 2 ? "C9D3E0" : H.gray } }] : [])], { x: ax[2] + 0.15, y: y + 0.08, w: aw[2] - 0.3, h: h2 - 0.16, valign: "middle" });
});
T(s, "O estudo mede “desempenho percebido e não o desempenho medido/objetivo” (p. 62).", { x: L, y: 6.18, w: W, h: 0.3, color: H.navy });

// ================= 7. Confronto =================
s = slide(2, "O que os sócios declaram e o que os contratos mostram não coincide: 4 em cada 10 contratos seguem o salário mínimo", "Cruz Neto (2018), p. 21, 22, 70, 80, 87 e 88",
  ["¹ Intervalo de Wilson a 95% calculado pelo apresentador. A amostra não é probabilística (p. 70), então mesmo esse intervalo é otimista."],
  "Este é o centro da parte 2: as duas lentes lado a lado. À esquerda, os onze sócios, desenhados com contorno porque é o que declaram: dez precificam pelo custo olhando o mercado, um usa só o custo, e o autor conclui por unanimidade que o custo é o melhor método. À direita, os 109 contratos, preenchidos porque são documento: 43 vinculam o honorário ao salário mínimo, base de empregados, notas e lançamentos. São 39%, com intervalo de 31% a 49% se a amostra fosse aleatória. O autor classifica isso como mercado e lembra que a vinculação é vedada pela Constituição. O texto não reconcilia as duas lentes; o próximo slide mostra por que elas podem divergir.");
const midX = 6.35;
seg(s, midX, TOP, midX, 5.45, H.line, 0.75);
label(s, "Declarado: 11 sócios entrevistados", { x: L, y: TOP, w: 5.6 });
label(s, "Observado: 109 contratos, SP, 2004 a 2017", { x: midX + 0.35, y: TOP, w: 6.0 });
// 11 sócios
const pd = 0.36, pg = 0.12, py = 2.05;
for (let i = 0; i < 11; i++) {
  const x = L + i * (pd + pg) + (i === 10 ? 0.25 : 0);
  circ(s, x, py, pd, null, i === 10 ? H.navy : H.gray, 1.5);
}
const g10 = L + 10 * (pd + pg) - pg;
seg(s, L, py + pd + 0.12, g10, py + pd + 0.12, H.gray, 0.75);
T(s, "10 precificam pelo custo, “mas sempre observando o comportamento do mercado”", { x: L, y: py + pd + 0.2, w: 4.0, h: 0.5, fontSize: LABEL, color: H.ink });
const x11 = L + 10 * (pd + pg) + 0.25;
T(s, "1 usa só o custo (p. 22)", { x: x11 - 0.75, y: py + pd + 0.2, w: 1.9, h: 0.5, fontSize: LABEL, color: H.navy, bold: true, align: "center" });
rect(s, L, 3.4, 5.6, 1.15, null, H.grayMark, { round: true, name: "conclusao autor" });
label(s, "Conclusão do autor (p. 87)", { x: L + 0.18, y: 3.5, w: 5.2 });
T(s, "“Obteve-se por unanimidade que o melhor método de precificação dos serviços de natureza contábil é o método pelo custo efetivamente incorrido”", { x: L + 0.18, y: 3.76, w: 5.25, h: 0.75, italic: true, fontSize: 11 });
T(s, "O resultado é declarado: nenhuma entrevista traz o preço cobrado.", { x: L, y: 4.75, w: 5.6, h: 0.5, color: H.gray });
// 109 contratos
const wx0 = midX + 0.35, colsC = 11, sq = 0.235, gp = 0.05;
for (let i = 0; i < 109; i++) {
  const r = Math.floor(i / colsC), c = i % colsC;
  rect(s, wx0 + c * (sq + gp), 2.0 + r * (sq + gp), sq, sq, i < 43 ? H.loss : H.soft, null, { name: "c" + i });
}
const tx0 = wx0 + colsC * (sq + gp) + 0.3, tw = R - tx0;
T(s, "43", { x: tx0, y: 1.95, w: tw, h: 0.5, fontSize: 28, bold: true, color: H.loss });
T(s, "atrelam o honorário ao salário mínimo regional, com base em empregados, notas fiscais e lançamentos do cliente (p. 80)", { x: tx0, y: 2.5, w: tw, h: 1.0, fontSize: LABEL });
T(s, "39,4% dos contratos; intervalo de 30,8% a 48,8%¹", { x: tx0, y: 3.5, w: tw, h: 0.45, fontSize: LABEL, bold: true, color: H.loss });
T(s, "66", { x: tx0, y: 4.05, w: tw, h: 0.4, fontSize: 20, bold: true, color: H.gray });
T(s, "sem método informado no texto", { x: tx0, y: 4.45, w: tw, h: 0.3, fontSize: LABEL, color: H.gray });
T(s, "A vinculação é vedada pelo art. 7º, IV, da Constituição e “não se caracteriza tecnicamente como um método de precificação” (p. 21).", { x: wx0, y: 4.95, w: R - wx0, h: 0.5, fontSize: LABEL, color: H.gray });
seg(s, L, 5.7, R, 5.7, H.navy, 1);
T(s, "O autor classifica a vinculação ao salário mínimo como precificação pelo mercado (p. 80 e 88) e, ao mesmo tempo, conclui pelo custo. O texto não reconcilia as duas lentes.", { x: L, y: 5.8, w: W, h: 0.6, color: H.navy });

// ================= 8. Escada da informação de custo =================
s = slide(2, "Os escritórios param antes do custo por cliente, o degrau mínimo para que o preço pelo custo seja possível", "Cruz Neto (2018), p. 76, 77, 79 e 87",
  null,
  "Por que as lentes divergem? Porque precificar de fato pelo custo exige subir uma escada de informação. Cada degrau é uma informação de custo mais fina. Todos os escritórios têm o custo total. Por departamento, só parte. Por cliente, alguns têm software de atividades, mas o autor não encontrou sistema completo. Por colaborador e cliente, ninguém. Sistema de custeio gerencial e indicador de desempenho, ninguém. O degrau marcado é o mínimo para cobrar pelo custo de cada cliente. Sem ele, o custo serve para saber quanto o escritório gasta, mas não quanto cada cliente custa, e o preço acaba seguindo outra referência, como o salário mínimo dos contratos.");
const steps = [
  ["Custo total do escritório", 2, "Tem", "“O que temos é a mensuração de todo custo do escritório” (ORGC6, p. 79)"],
  ["Custo por departamento", 1, "Parcial", "Hora por departamento em parte dos escritórios; “Um controle específico por setor não temos” (ORGC6, p. 79)"],
  ["Custo por cliente", 1, "Parcial", "Software de atividades em alguns (ORGC1, p. 76); o autor não observou sistema completo (p. 76)"],
  ["Custo de cada colaborador por cliente", 0, "Não tem", "“o que não tem é quanto custa cada colaborador para o cliente” (ORGC2, p. 79)"],
  ["Sistema de custeio (absorção, variável, ABC)", 0, "Não tem", "Nenhum escritório usa, por custo-benefício (p. 79)"],
  ["Indicador de desempenho", 0, "Não tem", "“não há a utilização de qualquer indicador de desempenho” (p. 87)"],
];
const sw = 1.95, sg = 0.146, sBase = 4.15;
steps.forEach(([t, lvl, st, ev], i) => {
  const x = L + i * (sw + sg), hgt = 0.75 + i * 0.32, y = sBase - hgt;
  const fill = lvl === 2 ? H.navy : lvl === 1 ? H.soft : null, line = lvl === 0 ? H.grayMark : null;
  rect(s, x, y, sw, hgt, fill, line, { name: "degrau" + i, dash: lvl === 0 ? "dash" : undefined });
  T(s, t, { x: x + 0.12, y: y + 0.1, w: sw - 0.24, h: hgt - 0.15, fontSize: LABEL, bold: true, color: lvl === 2 ? H.white : H.ink });
  T(s, st, { x, y: sBase + 0.1, w: sw, h: 0.25, bold: true, color: lvl === 2 ? H.navy : lvl === 1 ? H.ink : H.gray });
  T(s, ev, { x, y: sBase + 0.4, w: sw - 0.05, h: 1.2, fontSize: LABEL, color: H.gray });
});
seg(s, L, sBase, R, sBase, "B8BFC6", 1);
const mX = L + 2 * (sw + sg);
rect(s, mX - 0.06, sBase - (0.75 + 2 * 0.32) - 0.08, sw + 0.12, 0.75 + 2 * 0.32 + 0.08, null, H.loss, { lw: 2, name: "marco" });
T(s, "Mínimo para precificar pelo custo de cada cliente", { x: mX - 0.6, y: TOP, w: sw + 1.2, h: 0.45, fontSize: LABEL, bold: true, color: H.loss, align: "center" });
seg(s, mX + sw / 2, TOP + 0.48, mX + sw / 2, sBase - (0.75 + 2 * 0.32) - 0.1, H.loss, 1, null, true);
seg(s, L, 5.75, R, 5.75, H.navy, 1);
T(s, "Sem o custo por cliente, o custo diz quanto o escritório gasta, mas não quanto cada cliente custa. A frase da ORGC2 resume: “fazemos a gestão de custo dos clientes” (p. 77).", { x: L, y: 5.85, w: W, h: 0.6, color: H.navy });

// ================= 9. Dispersão (herói) =================
s = slide(3, "No Anexo 2, 25 dos 36 clientes pagam abaixo do preço que o próprio custo indica, e 8 pagam menos do que custam", "Anexo 2 (NIBO, 2018), p. 106; zonas e gráfico do apresentador. O texto da dissertação não comenta este anexo",
  null,
  "Parte 3. O Anexo 2 é a lente observada mais rica do trabalho: 36 clientes com custo, preço ideal e preço cobrado, e o texto não o comenta. Cada ponto é um cliente: custo no eixo horizontal, preço cobrado no vertical. Se o escritório cobrasse pelo custo, todos os pontos estariam sobre a linha azul, o preço ideal. As zonas mostram o que acontece de fato. Na zona laranja, 8 clientes pagam menos do que custam; o pior é o JS, que custa 2.043 e paga 1.500. Na zona azul clara, 17 pagam mais que o custo, mas menos que o ideal. Só 11 ficam acima da linha, como o FIL, que paga 4.000. No total, a carteira cobra 13,1% abaixo do ideal.");
const XMAX = 2100, YMAX = 4200;
const cx = L, cy = TOP, cw = W, ch = BOT - TOP + 0.05, lay = { x: 0.065, y: 0.02, w: 0.915, h: 0.87 };
const px0 = cx + lay.x * cw, pw = lay.w * cw, py0 = cy + lay.y * ch, ph = lay.h * ch;
const PX = v => px0 + pw * v / XMAX, PY = v => py0 + ph - ph * v / YMAX;
s.addShape(pres.shapes.RIGHT_TRIANGLE, { x: PX(0), y: PY(XMAX * 1.5791), w: pw, h: PY(0) - PY(XMAX * 1.5791), flipH: true, fill: { color: H.zoneGap }, line: { type: "none" }, objectName: "zona desconto" });
s.addShape(pres.shapes.RIGHT_TRIANGLE, { x: PX(0), y: PY(XMAX), w: pw, h: PY(0) - PY(XMAX), flipH: true, fill: { color: H.zoneLoss }, line: { type: "none" }, objectName: "zona prejuizo" });
const sorted = [...rows].sort((a, b) => a.custo - b.custo);
s.addChart(pres.charts.SCATTER, [
  { name: "Custo", values: sorted.map(r => r.custo) },
  { name: "Acima do custo", values: sorted.map(r => r.lucro >= 0 ? r.cobrado : null) },
  { name: "Abaixo do custo", values: sorted.map(r => r.lucro < 0 ? r.cobrado : null) },
], Object.assign({}, CHART, { x: cx, y: cy, w: cw, h: ch, layout: lay, lineSize: 0, lineDataSymbol: "circle", lineDataSymbolSize: 9, chartColors: [H.navy, H.loss],
  valAxisMinVal: 0, valAxisMaxVal: YMAX, valAxisMajorUnit: 1000, catAxisMinVal: 0, catAxisMaxVal: XMAX, catAxisMajorUnit: 500,
  valAxisLabelFormatCode: "#,##0", catAxisLabelFormatCode: "#,##0", valGridLine: { style: "none" },
  showValAxisTitle: true, valAxisTitle: "Honorário cobrado, R$ por mês", valAxisTitleFontSize: LABEL, valAxisTitleColor: H.gray, valAxisTitleFontFace: "Arial",
  showCatAxisTitle: true, catAxisTitle: "Custo do cliente, R$ por mês", catAxisTitleFontSize: LABEL, catAxisTitleColor: H.gray, catAxisTitleFontFace: "Arial" }));
seg(s, PX(0), PY(0), PX(XMAX), PY(XMAX * 1.5791), H.mark, 1.75);
T(s, "preço ideal = custo × 1,5791", { x: PX(2100) - 2.6, y: PY(2100 * 1.5791) - 0.3, w: 2.55, h: 0.24, fontSize: LABEL, bold: true, color: H.mark, align: "right" });
T(s, "preço = custo", { x: PX(2100) - 1.5, y: PY(2100) - 0.27, w: 1.45, h: 0.24, fontSize: LABEL, bold: true, color: H.loss, align: "right" });
// contagens dentro das zonas
const zoneTxt = (x, y, n, t, color, w) => T(s, [{ text: n, options: { fontSize: 24, bold: true, color, breakLine: true } }, { text: t, options: { fontSize: LABEL, color: H.ink } }], { x, y, w: w || 2.3, h: 0.95 });
zoneTxt(PX(1450), PY(700), String(nPrej), "abaixo do custo: prejuízo", H.loss);
zoneTxt(PX(1180), PY(1750), String(nDesc), "acima do custo e abaixo do ideal: desconto", H.mark, 2.1);
zoneTxt(PX(250), PY(3500), String(nAcima), "acima do preço ideal", H.navy);
const fil = rows.find(r => r.emp === "FIL"), js = rows.find(r => r.emp === "JS");
T(s, "FIL: custo 1.511, paga 4.000", { x: PX(fil.custo) + 0.15, y: PY(fil.cobrado) - 0.12, w: 2.6, h: 0.24, fontSize: LABEL, color: H.navy, bold: true });
T(s, "JS: custo 2.043, paga 1.500", { x: PX(js.custo) - 2.55, y: PY(js.cobrado) + 0.08, w: 2.4, h: 0.24, fontSize: LABEL, color: H.loss, bold: true, align: "right" });
T(s, [{ text: "Carteira inteira: ", options: { bold: true } }, { text: "cobra R$ 33.970 contra um ideal de R$ 39.111, " }, { text: "13,1% abaixo", options: { bold: true, color: H.navy } }],
  { x: PX(250), y: PY(2500), w: 3.6, h: 0.5, fontSize: LABEL });

// ================= 10. Curva da baleia =================
s = slide(3, "Por isso 19 dos 36 clientes já geram todo o lucro, e os 8 abaixo do custo devolvem 13% dele", "Anexo 2 (NIBO, 2018), p. 106; lucro = honorário cobrado menos custo total; curva calculada pelo apresentador",
  null,
  "A consequência aparece quando ordeno os clientes do mais para o menos lucrativo e acumulo o lucro. O primeiro ponto já é 27% do resultado: é o FIL sozinho. Com 19 clientes chega-se a 100%. A curva sobe até 112,9% no 28º e depois cai, porque os 8 últimos custam mais do que pagam e devolvem 1.189 reais. Embaixo, os nomes dos extremos, alinhados à curva. Essa forma tem nome na contabilidade de custos, curva da baleia, e é o que o custeio ABC revela; o autor cita um estudo que mostra que o ABC é viável em escritório contábil.");
const lc = { x: L, y: TOP, w: W, h: 3.65 }, lLay = { x: 0.055, y: 0.08, w: 0.93, h: 0.78 };
const lx0 = lc.x + lLay.x * lc.w, lw = lLay.w * lc.w, ly0 = lc.y + lLay.y * lc.h, lh = lLay.h * lc.h;
const LY = v => ly0 + lh - lh * v / 120, LX = i => lx0 + lw * i / 35;
rect(s, LX(18), LY(120), LX(35) - LX(18), LY(100) - LY(120), H.zoneLoss, null, { name: "zona acima de 100" });
s.addChart(pres.charts.LINE, [{ name: "Lucro acumulado", labels: byProfit.map((_, i) => (i === 0 || (i + 1) % 5 === 0 || i === 35) ? String(i + 1) : ""), values: cum }],
  Object.assign({}, CHART, lc, { layout: lLay, chartColors: [H.mark], lineSize: 2.5, lineDataSymbol: "none", valAxisMinVal: 0, valAxisMaxVal: 120, valAxisMajorUnit: 20, valAxisLabelFormatCode: "0\"%\"" }));
seg(s, lx0, LY(100), lx0 + lw, LY(100), H.navy, 1, "dash");
T(s, "FIL sozinho: 27% do lucro", { x: LX(0) + 0.15, y: LY(20), w: 2.4, h: 0.24, fontSize: LABEL, bold: true, color: H.navy });
T(s, "100% do lucro no 19º cliente", { x: LX(18) + 0.1, y: LY(100) + 0.08, w: 2.5, h: 0.24, fontSize: LABEL, bold: true, color: H.navy });
T(s, "pico: 112,9% no 28º cliente", { x: LX(27) - 1.3, y: LY(112.9) - 0.32, w: 2.6, h: 0.24, fontSize: LABEL, bold: true, color: H.loss, align: "center" });
T(s, "os 8 últimos devolvem R$ 1.189 (12,9%)", { x: LX(35) - 3.2, y: LY(100) + 0.08, w: 3.1, h: 0.24, fontSize: LABEL, bold: true, color: H.loss, align: "right" });
// extremos alinhados ao eixo da curva
seg(s, L, 5.3, R, 5.3, H.line, 0.75);
label(s, "5 mais lucrativos, R$ por mês", { x: L, y: 5.38, w: 4.2, color: H.mark });
byProfit.slice(0, 5).forEach((r, i) => T(s, [{ text: r.emp + "  ", options: { bold: true } }, { text: brl(r.lucro, 0), options: { color: H.mark } }], { x: L + i * 1.05, y: 5.62, w: 1.05, h: 0.25, fontSize: LABEL }));
label(s, "8 abaixo do custo, R$ por mês", { x: R - 6.9, y: 5.38, w: 6.9, color: H.loss, align: "right" });
byProfit.slice(-8).forEach((r, i) => T(s, [{ text: r.emp + "  ", options: { bold: true } }, { text: brl(r.lucro, 0), options: { color: H.loss } }], { x: R - 6.9 + i * 0.8625, y: 5.62, w: 0.8625, h: 0.25, fontSize: 9, align: "right" }));
seg(s, L, 6.0, R, 6.0, H.navy, 1);
T(s, "É a curva que o custeio ABC busca revelar; Eckert (2013), citado na p. 79, mostra que o ABC é viável em escritórios contábeis.", { x: L, y: 6.08, w: W, h: 0.4, color: H.navy });

// ================= 11. Markup =================
s = slide(3, "Até a fórmula do preço ideal perde margem: aplicar margem e impostos em sequência entrega 27% no lugar de 30%", "Anexo 2 (NIBO, 2018), p. 106; Bruni e Famá",
  ["¹ O anexo não mostra a fórmula; a equivalência entre 1,5791 e a aplicação em sequência é inferência do apresentador."],
  "Último achado, que conversa com a parte da Luisa. Em todos os 36 clientes, o preço ideal é o custo vezes 1,5791. Esse número sai de aplicar a margem de 30% e depois os impostos de 9,53%. O markup que Bruni e Famá ensinam divide o custo por um menos a soma dos dois, e dá 1,6537. As duas colunas partem dos mesmos 100 reais de custo. Pelo método sequencial, a margem fica em 42,86, 27,1% do preço; pelo markup único, 49,61, os 30% pretendidos. Na carteira do anexo, a diferença é de 1.849 reais por mês de preço ideal.");
const sc = 3.5 / 170, yb = 5.95, cw2 = 1.45;
const colsM = [[1.2, "Sequencial (Anexo 2)", 100 * 1.5791, true], [3.75, "Markup único (Bruni e Famá)", 100 / (1 - 0.3953), false]];
const tops = [];
colsM.forEach(([x, t, preco, dest]) => {
  const imp = preco * 0.0953, mg = preco - 100 - imp;
  const parts = [["Custo", 100, H.soft, H.ink], ["Impostos", imp, H.grayMark, H.ink], ["Margem", mg, dest ? H.mark : H.gray, H.white]];
  let b = 0;
  parts.forEach(([n, v, c, tc]) => {
    const y = yb - (b + v) * sc;
    rect(s, x, y, cw2, v * sc, c, H.white, { name: n, lw: 1.5 });
    T(s, n === "Margem" ? [{ text: brl(v), options: { bold: true, breakLine: true } }, { text: brl(v / preco * 100, 1) + "% do preço", options: { fontSize: LABEL } }] : brl(v), { x, y, w: cw2, h: v * sc, align: "center", valign: "middle", color: tc });
    if (x === 1.2) T(s, n, { x: x - 1.1, y, w: 1.0, h: v * sc, align: "right", valign: "middle", fontSize: LABEL, color: H.gray });
    b += v;
  });
  tops.push([x, yb - preco * sc, yb - (100 + imp) * sc, mg / preco]);
  T(s, brl(preco), { x, y: yb - preco * sc - 0.3, w: cw2, h: 0.25, align: "center", bold: true });
  T(s, t, { x: x - 0.3, y: yb + 0.08, w: cw2 + 0.6, h: 0.4, align: "center", fontSize: LABEL, color: H.gray, bold: true });
});
seg(s, tops[0][0] + cw2, tops[0][1], tops[1][0], tops[1][1], H.grayMark, 0.75, "dash");
seg(s, tops[0][0] + cw2, tops[0][2], tops[1][0], tops[1][2], H.grayMark, 0.75, "dash");
seg(s, 0.9, yb, 5.5, yb, "B8BFC6", 1);
label(s, "Preço formado a partir de R$ 100 de custo", { x: L, y: TOP, w: 5.4 });
// cálculo
const fx = 6.4, fw = R - fx;
seg(s, fx - 0.3, TOP, fx - 0.3, BOT, H.line, 0.75);
label(s, "Como cada número é obtido", { x: fx, y: TOP, w: fw });
[["Sequencial (Anexo 2)¹", "preço = custo ÷ [(1 − 0,30) × (1 − 0,0953)] = custo × 1,5791", "A margem de 30% incide sobre o preço já líquido de impostos: 0,30 × (1 − 0,0953) = 27,1% do preço.", true],
 ["Markup único (Bruni e Famá)", "preço = custo ÷ (1 − 0,30 − 0,0953) = custo × 1,6537", "Impostos e margem saem juntos do preço, e a margem fica nos 30% pretendidos.", false]].forEach(([t, f, e, dest], i) => {
  const y = TOP + 0.4 + i * 1.6;
  T(s, t, { x: fx, y, w: fw, h: 0.28, bold: true, color: dest ? H.mark : H.ink });
  T(s, f, { x: fx, y: y + 0.32, w: fw, h: 0.3, fontSize: 13, fontFace: "Arial" });
  T(s, e, { x: fx, y: y + 0.7, w: fw, h: 0.7, color: H.gray });
  seg(s, fx, y + 1.45, R, y + 1.45, H.line, 0.75);
});
T(s, "R$ 1.849", { x: fx, y: 5.12, w: 2.2, h: 0.55, fontSize: 26, bold: true, color: H.navy });
T(s, "por mês de diferença no preço ideal da carteira do anexo (custo total de R$ 24.768,69)", { x: fx + 2.25, y: 5.15, w: fw - 2.25, h: 0.6 });
T(s, "Na parte da Luisa, o markup de Bruni e Famá; aqui, o que acontece quando ele é aplicado em duas etapas.", { x: fx, y: 5.95, w: fw, h: 0.5, color: H.gray, fontSize: LABEL });

// ================= 12. Pirâmide =================
s = slide(null, "Precificar pelo custo exige custo por cliente; sem ele, o mercado decide o preço", "Cruz Neto (2018), p. 22, 79, 80, 87 e 88; Anexo 2 (p. 106); Bruni e Famá", null,
  "Para fechar, a lógica inteira em uma página. No topo, a mensagem. Embaixo, os três argumentos e o número que prova cada um: os sócios declaram o custo como base, com o multiplicador de 1,5791; os contratos mostram o mercado, com 43 de 109 no salário mínimo; e o efeito aparece no Anexo 2, com 25 de 36 clientes abaixo do ideal e 8 abaixo do custo. Na base, as implicações: para os escritórios, calcular o custo por cliente, e o ABC é viável; para a teoria que vimos hoje, o markup só protege a margem se for aplicado ao objeto de custo certo, que é o cliente, e em uma etapa; para a pesquisa, o teste que o próprio autor propôs já pode começar com dados como os do Anexo 2. Obrigado.");
const topW = 8.6, topX = L + (W - topW) / 2;
rect(s, topX, TOP, topW, 0.85, H.navy, null, { name: "mensagem" });
T(s, "Escritórios contábeis afirmam precificar pelo custo, mas sem custo por cliente o preço acaba ancorado no mercado", { x: topX + 0.25, y: TOP, w: topW - 0.5, h: 0.85, bold: true, color: H.white, valign: "middle", align: "center", fontSize: 14 });
const argW = 3.9, argG = (W - 3 * argW) / 2, argY = 2.85, argH = 1.55;
const args = [
  ["1  Declarado", "Os sócios descrevem o preço como custo mais margem", "× 1,5791", "sobre o custo de cada cliente", false],
  ["2  Praticado", "Os contratos mostram o preço atrelado ao mercado", "43 de 109", "contratos no salário mínimo", true],
  ["3  Efeito", "A carteira do Anexo 2 cobra longe do custo", "25 de 36", "abaixo do ideal; 8 abaixo do custo", true],
];
args.forEach(([k, t, n, nl, obs], i) => {
  const x = L + i * (argW + argG);
  seg(s, topX + topW / 2, TOP + 0.85, x + argW / 2, argY, H.grayMark, 1);
  rect(s, x, argY, argW, argH, obs ? H.fill : null, obs ? null : H.grayMark, { name: "arg" + i });
  label(s, k, { x: x + 0.18, y: argY + 0.12, w: argW - 0.36 });
  T(s, t, { x: x + 0.18, y: argY + 0.38, w: argW - 0.36, h: 0.5, bold: true, color: H.navy });
  T(s, n, { x: x + 0.18, y: argY + 0.88, w: 1.6, h: 0.5, fontSize: 20, bold: true, color: i === 2 ? H.loss : H.navy });
  T(s, nl, { x: x + 1.8, y: argY + 0.92, w: argW - 1.98, h: 0.5, fontSize: LABEL, color: H.gray });
});
seg(s, L, 4.75, R, 4.75, H.navy, 1);
label(s, "Implicações", { x: L, y: 4.85, w: 2 });
[["Para os escritórios", "Calcular o custo por cliente antes de discutir preço; o ABC é viável no setor (Eckert, 2013, p. 79)."],
 ["Para a teoria de formação de preços", "O markup protege a margem quando aplicado ao custo do cliente e em uma etapa, como em Bruni e Famá."],
 ["Para a pesquisa", "O teste que o autor propôs (p. 88), resultado por método, pode começar com dados no formato do Anexo 2."]].forEach(([k, t], i) => {
  const x = L + i * (argW + argG);
  T(s, k, { x, y: 5.15, w: argW, h: 0.28, bold: true, color: H.navy });
  T(s, t, { x, y: 5.45, w: argW, h: 0.9 });
});

// ================= Apêndice =================
function tabela(s, rowsT, colW, o = {}) {
  const data = rowsT.map((r, i) => r.map((c, j) => ({
    text: String(c), options: {
      bold: i === 0 || j === 0, fontFace: "Arial", fontSize: i === 0 ? LABEL : 11, color: i === 0 ? H.gray : H.ink, valign: i === 0 ? "bottom" : "middle",
      margin: [0.05, 0.08, 0.05, 0.08],
      border: [{ type: "none" }, { type: "none" }, i === 0 ? { type: "solid", pt: 1.5, color: H.navy } : { type: "solid", pt: 0.75, color: H.line }, { type: "none" }],
    },
  })));
  s.addTable(data, { x: L, y: o.y || TOP, w: colW.reduce((a, b) => a + b, 0), colW, rowH: o.rowH });
}
s = slide(null, "Apêndice A: pontos de leitura crítica, ordenados pelo peso na conclusão", "Cruz Neto (2018), páginas indicadas; leitura do apresentador",
  ["O autor reconhece que a pesquisa “não tem o condão de esgotar o assunto” (p. 88); os pontos tratam do desenho, sem diminuir o caráter exploratório do estudo."],
  "Apêndice para perguntas. Os três primeiros pontos já apareceram nos slides 3, 6 e 7.");
tabela(s, [["Ponto", "O texto afirma", "O texto também mostra", "Peso"],
  ["Declarado e praticado", "Os sócios precificam pelo custo (p. 87)", "43 de 109 contratos usam o salário mínimo, classificado pelo autor como mercado (p. 80)", "Alto"],
  ["Pergunta e conclusão", "Pergunta pelo método “mais utilizado” (p. 19)", "Conclui pelo “melhor método” (p. 87); entrevistas medem preferência declarada", "Alto"],
  ["Desempenho", "Seria medido por margem bruta, EBIT, ROE e ROI (p. 69)", "“não há a utilização de qualquer indicador de desempenho” (p. 87)", "Alto"],
  ["Consenso", "“por unanimidade” o custo é o melhor método (p. 87)", "“apenas um” usa o custo isoladamente (p. 22)", "Médio"],
  ["Origem dos contratos", "109 contratos de diversas regiões de SP (p. 80)", "Sem origem, critério de seleção ou o método dos outros 66", "Médio"],
  ["Base teórica", "Teoria da contingência como base (p. 26)", "Porte e diversificação não são ligados ao método escolhido (p. 72 a 75)", "Médio"],
  ["Peso da mão de obra", "80% do custo (ORGC7, p. 79)", "Anexo 1: 55%, ou 76% com o pró-labore (p. 105)", "Baixo"]],
  [2.4, 4.3, 4.73, 1.0], { rowH: [0.4, 0.6, 0.6, 0.6, 0.55, 0.55, 0.6, 0.55] });

s = slide(null, "Apêndice B: honorário cobrado menos honorário ideal, por cliente", "Anexo 2 (NIBO, 2018), p. 106; diferenças calculadas pelo apresentador", null, "Apêndice para perguntas: a mesma informação do slide 9, cliente a cliente.");
s.addChart(pres.charts.BAR, [{ name: "Cobrado menos ideal", labels: byGap.map(r => r.emp), values: byGap.map(r => r.gap) }],
  Object.assign({}, CHART, { x: L, y: TOP, w: W, h: BOT - TOP, barDir: "col", chartColors: [H.navy], invertedColors: [H.loss], barGapWidthPct: 35,
    valAxisMinVal: -2000, valAxisMaxVal: 2000, valAxisMajorUnit: 500, valAxisLabelFormatCode: "#,##0", catAxisLabelFontSize: 8, catAxisLabelRotate: 270 }));

s = slide(null, "Referências", null, null, "Slide de referências, só para consulta.");
T(s, [
  { text: "CRUZ NETO, B. P. Métodos de precificação de serviços: uma abordagem comparativa entre os métodos de precificação de serviços contábeis pelo custo e valor de mercado. Dissertação (Mestrado Profissional em Controladoria e Finanças Empresariais), Universidade Presbiteriana Mackenzie, São Paulo, 2018.", options: { breakLine: true, paraSpaceAfter: 10 } },
  { text: "BRUNI, A. L.; FAMÁ, R. Gestão de custos e formação de preços. São Paulo: Atlas.", options: { breakLine: true, paraSpaceAfter: 10 } },
  { text: "Fontes secundárias citadas pela dissertação e usadas nos slides: SESCAPLDR (2016), Duarte (2012), Souza (2009), Vaz (2014), Farber et al. (2014), Eckert (2013), NIBO (2018, Anexos 1 e 2)." },
], { x: L, y: TOP, w: W, h: 4.5, fontSize: 13 });

(async () => {
  const out = path.join(__dirname, "apresentacao_v3.pptx");
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  console.log("ok", out);
})();
