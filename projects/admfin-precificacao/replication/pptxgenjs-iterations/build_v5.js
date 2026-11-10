// Deck v5 (Adm Fin, Cruz Neto 2018). Correções da auditoria review/review_v4.md.
// Regras de cor: navy = evidência focal; cinza = contexto; laranja = SÓ cliente abaixo do custo.
// Código: contorno = declarado pelos sócios; preenchido = observado em documento ou número.
// Números: leitura/dissertacao_condensada.md e leitura/anexo2.csv.
const path = require("path");
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const SKILL = "C:/Users/adria/.claude/skills/synced/08880bea-5393-40ac-b324-ec6a48439c82_8a8b6610-ca77-4d15-b215-dc9e5dbc2267/pptx";
const { applyTheme } = require(SKILL + "/scripts/apply_theme.js");

const H = {
  navy: "0B2545", loss: "C2410C", ink: "1F2328", gray: "5B6670", grayMark: "A3ACB5",
  soft: "DDE2E6", line: "D9DEE3", fill: "EEF1F4", white: "FFFFFF", zoneLoss: "F6DED3", zoneGap: "DCE3EC",
};
const THEME = {
  name: "Consultoria v5", headFontFace: "Arial", bodyFontFace: "Arial",
  colors: { dk1: H.ink, lt1: H.white, dk2: H.navy, lt2: H.fill, accent1: H.navy, accent2: H.loss, accent3: H.gray, accent4: H.grayMark, accent5: H.navy, accent6: H.line, hlink: H.navy, folHlink: H.gray },
};
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.theme = { headFontFace: "Arial", bodyFontFace: "Arial" };
pres.title = "Precificação de serviços contábeis: Cruz Neto (2018)";
pres.author = "Adrian Villela";

const L = 0.45, R = 12.88, W = R - L, TOP = 1.55, BOT = 6.5;
const BODY = 12, LABEL = 10;
const TESE = "Escritórios contábeis afirmam precificar pelo custo, mas sem um sistema de custo por cliente o preço acaba ancorado no mercado";

pres.defineSlideMaster({
  title: "V5",
  background: { color: H.white },
  slideNumber: { x: 12.45, y: 7.0, w: 0.43, h: 0.25, fontSize: 9, color: H.gray, align: "right" },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: L, y: 0.3, w: W, h: 0.95, fontFace: "Arial", fontSize: 22, bold: true, color: H.navy, valign: "bottom", align: "left", margin: 0 }, text: "" } },
  ],
});

// ---------- helpers ----------
const SECOES = ["Contexto", "1 Declarado", "2 Praticado", "3 Efeito"];
function T(s, t, o) {
  s.addText(t, Object.assign({ isTextBox: true, fontFace: "Arial", fontSize: BODY, color: H.ink, valign: "top", margin: 0 }, o));
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
function circ(s, x, y, d, fill, line, lw, dash) {
  s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: fill ? { color: fill } : { type: "none" }, line: line ? { color: line, width: lw || 1, dashType: dash } : { type: "none" }, objectName: "circ" });
}
function slide(secao, titulo, fonte, notas, speaker) {
  const s = pres.addSlide({ masterName: "V5" });
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
const AXFMT = '[>=1000]0"."000;[<=-1000]-0"."000;0'; // milhar com ponto em qualquer idioma
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
const prej = r => r.lucro < 0, desc = r => r.lucro >= 0 && r.gap < 0, acima = r => r.gap >= 0;
const nPrej = rows.filter(prej).length, nDesc = rows.filter(desc).length, nAcima = rows.filter(acima).length;
const totCobrado = rows.reduce((a, r) => a + r.cobrado, 0), totIdeal = rows.reduce((a, r) => a + r.ideal, 0), totCusto = rows.reduce((a, r) => a + r.custo, 0);
const difMarkup = totCusto / (1 - 0.30 - 0.0953) - totIdeal;
const redondos = rows.filter(r => r.cobrado % 50 === 0).length, idealRedondo = rows.filter(r => r.ideal % 50 === 0).length;
const devolvido = -byProfit.slice(-8).reduce((a, r) => a + r.lucro, 0);
const check = (c, m) => { if (!c) throw new Error("checagem: " + m); };
check(Math.abs(totalLucro - 9201.31) < 0.01, "lucro total");
check(Math.max(...cum) === 112.9 && cum.indexOf(112.9) === 27, "pico no 28º");
check(cum.findIndex(v => v >= 100) === 18, "19 clientes");
check(nPrej === 8 && nDesc === 17 && nAcima === 11, "zonas 8/17/11");
check(Math.abs(totCobrado - 33970) < 0.01 && Math.abs(totIdeal - 39111.14) < 0.05, "totais");
check(Math.round(difMarkup) === 1849, "markup");
check(brl((totCobrado / totIdeal - 1) * 100, 1) === "-13,1", "gap");
check(Math.round((totCobrado / totCusto - 1) * 100) === 37, "37% acima do custo");
check(redondos === 34 && idealRedondo === 0, "34 de 36 redondos");
check(Math.abs(devolvido - 1189.34) < 0.01, "devolvido");
check(brl(devolvido / totalLucro * 100, 1) === "12,9", "12,9% do lucro final");
// Anexo 1 (p. 105): rateio por departamento
const DEP = [["Fiscal", 3620.16, 585.61 + 3443.38, 7649.16], ["Contábil", 3964.94, 641.39 + 3771.32, 8377.65], ["Pessoal", 4137.32, 669.27 + 3935.29, 8741.89]];
DEP.forEach(([n, p, r, t]) => { check(Math.abs(p + r - t) < 0.02, "rateio " + n); check(Math.round(r / t * 100) === 53, "53% " + n); });

// ================= Capa =================
let s = pres.addSlide({ masterName: "V5" });
label(s, "Administração Financeira II   ·   Formação de preços   ·   Exemplo de aplicação", { x: L, y: 1.75, w: W, h: 0.3, fontSize: 11 });
T(s, "Como escritórios contábeis formam o preço dos seus serviços, e o que os dados da própria pesquisa mostram", { x: L, y: 2.2, w: 11.2, h: 1.9, fontSize: 32, bold: true, color: H.navy });
seg(s, L, 4.35, L + 2.0, 4.35, H.navy, 2);
T(s, "Leitura aplicada de CRUZ NETO, B. P. Métodos de precificação de serviços: uma abordagem comparativa entre os métodos de precificação de serviços contábeis pelo custo e valor de mercado. Dissertação (Mestrado Profissional em Controladoria e Finanças Empresariais), Universidade Presbiteriana Mackenzie, 2018.", { x: L, y: 4.6, w: 10.5, h: 1.0, fontSize: 13, color: H.gray });
T(s, "Adrian Villela   ·   UFF   ·   5 de outubro de 2026", { x: L, y: 6.5, w: W, h: 0.3 });
s.addNotes("Boa tarde. A Luisa e o Robert mostraram a teoria: como se forma um preço a partir do custo, do mercado ou do valor que o cliente percebe. A minha parte é levar essa teoria para um caso real. Imaginem que vocês abrem um escritório de contabilidade amanhã e o primeiro cliente pergunta quanto vocês cobram por mês. Essa pergunta é o tema de uma dissertação de mestrado defendida no Mackenzie em 2018, pelo Benedito Cruz Neto. Ele foi perguntar a sócios de escritórios de São Paulo como respondem a esse cliente. Vou contar o que ele encontrou e, no final, mostrar o que os anexos do próprio trabalho revelam quando a gente faz as contas.");

// ================= 2. Sumário executivo =================
s = slide(null, TESE, "Cruz Neto (2018), p. 20, 22, 36, 76, 79, 80 e Anexo 2 (p. 106); cálculos do apresentador sobre o Anexo 2", null,
  "A história inteira em uma página, no formato que as consultorias usam: a conclusão primeiro, o resto prova. Situação: três jeitos de formar preço, num setor com mais de 64 mil escritórios e sem tabela oficial; cada um decide sozinho. Complicação: o autor ouviu 11 sócios e leu 109 contratos; os sócios dizem, quase em coro, que cobram pelo custo, mas 43 contratos amarram o honorário ao salário mínimo, e nenhum escritório usa um sistema gerencial de custeio que dê o custo de cada cliente. Resolução, a tese: sem esse sistema, o preço acaba ancorado no mercado. Os dados do Anexo 2, um escritório-exemplo, são compatíveis com isso: 25 de 36 clientes pagam abaixo do preço que o custo indica, e 34 de 36 preços cobrados são valores redondos, múltiplos de 50 reais. Preço calculado pelo custo não costuma dar número redondo; preço negociado costuma.");
const blocos = [
  ["Situação", "A formação de preço pode partir do custo, do mercado ou do valor percebido. No setor contábil, com mais de 64 mil escritórios e sem tabela oficial de honorários desde 1990, cada escritório forma o próprio preço.", "64.026", "escritórios contábeis no Brasil"],
  ["Complicação", "Cruz Neto ouviu 11 sócios e leu 109 contratos. Os sócios declaram o custo como base e o mercado como conferência, mas parte relevante dos contratos atrela o honorário ao salário mínimo, e nenhum escritório usa sistema gerencial de custeio que dê o custo de cada cliente.", "43 de 109", "contratos atrelados ao salário mínimo"],
  ["Resolução", "Sem um sistema de custo por cliente, o preço fica ancorado no mercado. Os dados do Anexo 2, um escritório-exemplo, são compatíveis com isso: a maioria dos clientes paga abaixo do preço que o custo indica, e os preços cobrados são quase todos valores redondos.", "25 de 36", "clientes abaixo do preço ideal; 34 de 36 preços cobrados são múltiplos de R$ 50"],
];
blocos.forEach(([k, v, n, nl], i) => {
  const y = TOP + 0.1 + i * 1.62;
  if (i) seg(s, L, y - 0.16, R, y - 0.16, H.line, 0.75);
  T(s, k, { x: L, y, w: 1.9, h: 0.3, bold: true, color: H.navy, fontSize: 14 });
  T(s, v, { x: 2.45, y, w: 7.3, h: 1.35, fontSize: 14 });
  T(s, n, { x: 10.2, y: y - 0.05, w: 2.68, h: 0.5, fontSize: 24, bold: true, color: i === 2 ? H.navy : H.gray });
  T(s, nl, { x: 10.2, y: y + 0.5, w: 2.68, h: 0.7, fontSize: LABEL, color: H.gray });
});
seg(s, 9.95, TOP, 9.95, BOT - 0.2, H.line, 0.75);

// ================= 3. Três bases =================
s = slide(0, "Entre as três bases de preço, o custo, a mais usada, fica entre a mais fácil e a melhor", "SESCAPLDR (2016), Duarte (2012) e Souza (2009), citados em Cruz Neto (2018), p. 47 e 48",
  ["Posições qualitativas definidas pelo apresentador a partir das avaliações citadas na p. 47 (Quadro 6); não são medidas."],
  "Começo pelo cardápio de opções. Existe uma frase antiga em projetos: bom, bonito e barato, escolha dois. Com preço acontece algo parecido. No eixo horizontal, a facilidade de aplicar; no vertical, a qualidade como forma de precificar. O mercado é o mais fácil: basta olhar o concorrente. O sindicato dos contadores de Londrina, citado pelo autor, chama de a forma mais fácil e a mais traiçoeira, porque o preço do concorrente não sabe nada dos seus custos. O valor percebido é o melhor em tese, cobrar pelo que o serviço vale para o cliente, mas exige pesquisa e entrevistas. O custo fica no meio: a forma mais importante para conhecer a empresa, e não a melhor. E é a mais usada. Guardem o custo, porque é nele que a dissertação inteira se apoia.");
const mx = L + 0.6, my = TOP + 0.15, mw = 6.9, mh = 4.3;
seg(s, mx, my + mh, mx + mw, my + mh, H.gray, 1, null, true);
seg(s, mx, my + mh, mx, my, H.gray, 1, null, true);
label(s, "Facilidade de aplicar  →", { x: mx + mw - 3.0, y: my + mh + 0.08, w: 3.0, align: "right" });
T(s, [{ text: "QUALIDADE COMO FORMA DE PRECIFICAR  →", options: { bold: true, color: H.gray, fontSize: LABEL, charSpacing: 1 } }], { x: mx - 2.45, y: my + mh / 2 - 0.11, w: 4.35, h: 0.22, rotate: 270, align: "center" });
const met = [
  ["Valor percebido", 0.15, 0.85, false, "“a menos importante, porém a melhor forma de se precificar”"],
  ["Custo", 0.5, 0.5, true, "“a forma mais importante para conhecer a realidade da empresa, entretanto não é a melhor”"],
  ["Mercado", 0.85, 0.15, false, "“a forma mais fácil, todavia a mais traiçoeira”"],
];
const cxo = 9.2, cwo = R - cxo;
met.forEach(([n, fx, fy, dest, q], i) => {
  const cx = mx + mw * fx, cy = my + mh * (1 - fy), d = 0.38;
  circ(s, cx - d / 2, cy - d / 2, d, H.white, dest ? H.navy : H.grayMark, dest ? 2.75 : 1.5);
  T(s, n, { x: i === 2 ? cx - 2.15 : cx + 0.32, y: cy - 0.13, w: 1.8, h: 0.26, bold: true, fontSize: 13, color: dest ? H.navy : H.gray, align: i === 2 ? "right" : "left" });
  const oy = TOP + 0.35 + i * 1.5;
  if (i) seg(s, cxo, oy - 0.18, R, oy - 0.18, H.line, 0.75);
  T(s, n, { x: cxo, y: oy, w: cwo, h: 0.28, bold: true, color: dest ? H.navy : H.gray });
  T(s, q, { x: cxo, y: oy + 0.32, w: cwo, h: 0.9, italic: true, fontSize: 13, color: dest ? H.ink : H.gray });
});

// ================= 4. Duas lentes =================
s = slide(0, "Cruz Neto responde com duas lentes: o que 11 sócios declaram e o que os documentos mostram", "Cruz Neto (2018), p. 19, 62, 64 a 71, 80 e Anexos 1 e 2 (p. 105 e 106)",
  null,
  "A pergunta do autor: qual método é o mais utilizado pelos escritórios contábeis. Para responder, ele usa duas fontes, que eu chamo de duas lentes. Uma associação: se eu pergunto a alguém quanto gasta por mês com comida, recebo um número; se abro a fatura do cartão, aparece outro. Um mede o que a pessoa acredita; o outro, o que ela fez. A primeira lente é a entrevista: 11 sócios, de 40 a 70 minutos. Mostra como pensam o preço, mas não o preço cobrado nem o resultado; o próprio autor avisa que mede desempenho percebido. A segunda lente são os documentos: 109 contratos e os anexos com custos e preços de um escritório-exemplo. Mostram como o preço foi escrito e cobrado, mas não se sabe de onde vieram os contratos. A partir daqui: contorno significa declarado pelos sócios; preenchido significa observado em documento ou número.");
const qx = L, qw = 3.15;
rect(s, qx, TOP, qw, BOT - TOP, H.fill, null, { name: "pergunta" });
label(s, "Pergunta", { x: qx + 0.2, y: TOP + 0.2, w: qw - 0.4 });
T(s, "“qual o método de precificação é mais utilizado para a prestação de serviços de natureza contábil?”", { x: qx + 0.2, y: TOP + 0.55, w: qw - 0.4, h: 1.6, fontSize: 14, italic: true, color: H.navy });
seg(s, qx + 0.2, 4.95, qx + qw - 0.2, 4.95, H.grayMark, 0.75);
label(s, "Código visual", { x: qx + 0.2, y: 5.08, w: qw - 0.4 });
circ(s, qx + 0.2, 5.42, 0.24, null, H.navy, 1.5);
T(s, "contorno = declarado", { x: qx + 0.55, y: 5.42, w: 2.4, h: 0.24, valign: "middle" });
rect(s, qx + 0.2, 5.82, 0.24, 0.24, H.navy, null, { name: "leg" });
T(s, "preenchido = observado", { x: qx + 0.55, y: 5.82, w: 2.4, h: 0.24, valign: "middle" });
const lx = 4.25, lw2 = 3.3, h2 = 2.35;
const lentes = [
  { y: TOP, t: "Declarado", n: "11 entrevistas", d: "Sócios de sociedades limitadas em SP; 40 a 70 minutos cada; de dez/2017 a dez/2018", ve: "Como os sócios descrevem o cálculo do preço, o papel do mercado e a percepção de qualidade", nao: "O preço efetivamente cobrado e o resultado financeiro: o estudo mede desempenho percebido", obs: false },
  { y: BOT - h2, t: "Observado", n: "Documentos", d: "109 contratos de SP, de 2004 a 2017, e os Anexos 1 e 2: custos e preços de um escritório-exemplo (NIBO, 2018)", ve: "Como o preço é escrito no contrato e, no Anexo 2, o custo, o preço ideal e o preço cobrado de cada cliente", nao: "A origem e o critério de seleção dos contratos; o texto não informa o método dos outros 66", obs: true },
];
lentes.forEach(le => {
  rect(s, lx, le.y, lw2, h2, le.obs ? H.navy : null, le.obs ? null : H.navy, { name: "lente", lw: 1.5 });
  label(s, le.t, { x: lx + 0.2, y: le.y + 0.18, w: lw2 - 0.4, color: le.obs ? "C9D3E0" : H.gray });
  T(s, le.n, { x: lx + 0.2, y: le.y + 0.45, w: lw2 - 0.4, h: 0.4, fontSize: 18, bold: true, color: le.obs ? H.white : H.navy });
  T(s, le.d, { x: lx + 0.2, y: le.y + 0.95, w: lw2 - 0.4, h: 1.3, color: le.obs ? "E3E8EF" : H.ink });
  seg(s, qx + qw, TOP + 1.3, lx, le.y + h2 / 2, H.grayMark, 1.25, null, true);
  const vx = 7.9, vw = 2.4, nx = 10.48, nw = R - 10.48;
  seg(s, vx, le.y, R, le.y, H.line, 0.75);
  label(s, "O que mostra", { x: vx, y: le.y + 0.18, w: vw });
  label(s, "O que não mostra", { x: nx, y: le.y + 0.18, w: nw });
  T(s, le.ve, { x: vx, y: le.y + 0.5, w: vw, h: 1.8 });
  T(s, le.nao, { x: nx, y: le.y + 0.5, w: nw, h: 1.8, color: H.gray });
});

// ================= 5. Árvore do honorário =================
s = slide(1, "Na descrição dos sócios, o honorário é o volume do cliente vezes o custo de cada unidade, mais margem e impostos", "Lógica: ORGC7, p. 76 e 77. Números: Anexos 1 e 2 (NIBO, 2018), p. 105 e 106",
  ["¹ Multiplicador observado em todos os 36 clientes do Anexo 2 (slide 12).   ² O anexo não nomeia a unidade; nota fiscal, lançamento e empregado é inferência (p. 80 e 87). Custos unitários arredondados no Anexo 1 para 2,33 e 1,56."],
  "Primeiro argumento: o que os sócios declaram. Um deles, o ORGC7, descreve o cálculo assim: o honorário é o volume de operações do cliente vezes o custo hora de cada colaborador por departamento. Pensem na conta de luz: consumo em quilowatts-hora vezes a tarifa, mais impostos. Aqui, o consumo é o volume do cliente e a tarifa é o custo de cada unidade de trabalho. Os números são do escritório-exemplo dos anexos, por isso aparecem preenchidos. Lendo da direita para a esquerda: o departamento fiscal custa 7.649 reais por mês; dividido pelo volume, cada unidade custa cerca de 2,33. No contábil, 1,56. No pessoal, 31,22 por empregado do cliente. O cliente ABC tem 10 unidades no fiscal, 20 no contábil e 1 empregado: custa 85,82 por mês. Esse custo vezes 1,5791, fator que embute margem e impostos, dá o honorário ideal de 135,52. Guardem o 1,5791: ele volta no final.");
const colsX = [L, 3.4, 6.55, 9.8], colsW = [2.6, 2.75, 2.95, R - 9.8];
["Preço", "Custo do cliente", "Custo do cliente por departamento", "Custo unitário"].forEach((h, i) => label(s, h, { x: colsX[i], y: TOP, w: colsW[i] }));
function node(x, y, w, h, t, v, dest) {
  rect(s, x, y, w, h, dest ? H.navy : H.fill, null, { name: "no" });
  T(s, t, { x: x + 0.14, y: y + 0.1, w: w - 0.28, h: 0.26, fontSize: LABEL, color: dest ? "C9D3E0" : H.gray });
  T(s, v, { x: x + 0.14, y: y + 0.38, w: w - 0.28, h: h - 0.44, fontSize: 14, bold: true, color: dest ? H.white : H.ink });
}
const rowY = [1.95, 3.15, 4.35], nh = 0.95;
node(colsX[0], 3.15, colsW[0], nh, "Honorário ideal", "R$ 135,52", true);
node(colsX[1], 2.55, colsW[1], nh, "Custo do cliente", "R$ 85,82", false);
node(colsX[1], 4.35, colsW[1], nh, "Margem e impostos¹", "× 1,5791", false);
[["Fiscal: 10 unidades²", "10 × 2,334 = R$ 23,34", "Fiscal: R$ 7.649,16 ÷ volume", "R$ 2,334 por unidade"],
 ["Contábil: 20 unidades²", "20 × 1,563 = R$ 31,26", "Contábil: R$ 8.377,65 ÷ volume", "R$ 1,563 por unidade"],
 ["Pessoal: 1 empregado²", "1 × 31,22 = R$ 31,22", "Pessoal: R$ 8.741,89 ÷ volume", "R$ 31,22 por empregado"]].forEach(([t1, v1, t2, v2], i) => {
  node(colsX[2], rowY[i], colsW[2], nh, t1, v1, false);
  node(colsX[3], rowY[i], colsW[3], nh, t2, v2, false);
  seg(s, colsX[2] + colsW[2], rowY[i] + nh / 2, colsX[3], rowY[i] + nh / 2, H.grayMark, 1);
  seg(s, colsX[1] + colsW[1], 2.55 + nh / 2, colsX[2], rowY[i] + nh / 2, H.grayMark, 1);
});
seg(s, colsX[0] + colsW[0], 3.15 + nh / 2, colsX[1], 2.55 + nh / 2, H.navy, 1.25);
seg(s, colsX[0] + colsW[0], 3.15 + nh / 2, colsX[1], 4.35 + nh / 2, H.navy, 1.25);
rect(s, L, 5.6, W, 0.75, null, H.grayMark, { round: true, name: "fala declarada" });
T(s, "“os honorários são calculados considerando o volume de operações dos clientes vezes o custo hora de cada colaborador por departamento”", { x: L + 0.25, y: 5.6, w: W - 0.5, h: 0.75, fontSize: 13, italic: true, valign: "middle" });

// ================= 6. Custo comum e rateio =================
s = slide(1, "Mais da metade do custo do escritório-exemplo é comum a todos os clientes e só chega a cada um por rateio", "Anexo 1 (NIBO, 2018), p. 105. Percentuais calculados pelo apresentador",
  null,
  "Agora o problema escondido na conta. Se o preço parte do custo, a pergunta é quanto do custo pertence a cada cliente. À esquerda, o escritório-exemplo do Anexo 1: 24.768 reais por mês. Só a equipe dos departamentos, em cinza, trabalha diretamente para clientes. Administrativo, pró-labore do sócio e demais custos fixos, em azul, são comuns a todos: 53% do total. À direita, o que o próprio anexo faz com esse custo comum: distribui entre os departamentos. No fiscal, a equipe custa 3.620 reais, e o rateio soma mais 4.029, o que mais que dobra o custo do departamento. Nos três departamentos, o rateio é 53% do custo. A associação é o jantar entre amigos com a conta dividida igualmente: quem pediu salada paga parte do vinho do outro. A regra de rateio decide quem paga o vinho de quem, e nenhum escritório entrevistado usa sistema gerencial de custeio para fazer essa divisão. Se perguntarem: a mão de obra total é 76% do custo, perto dos 80% que a ORGC7 cita.");
label(s, "Custo mensal do escritório, R$", { x: L, y: TOP, w: 6.6 });
const wf = [["Equipe dos\ndepartamentos", 11722.42, false], ["Adminis-\ntrativo", 1896.27, true], ["Pró-labore\ndo sócio", 5100.0, true], ["Demais\ncustos fixos", 6050.0, true], ["Custo total", 24768.69, null]];
const wfX0 = L + 0.05, wfY0 = 5.6, wfH = 3.1, bw = 1.0, bgap = 0.3;
let base = 0;
wf.forEach(([lab, v, comum], i) => {
  const x = wfX0 + i * (bw + bgap), isTot = comum === null, y0 = isTot ? 0 : base;
  const yTop = wfY0 - (y0 + v) / 24768.69 * wfH, hh = v / 24768.69 * wfH;
  rect(s, x, yTop, bw, hh, isTot ? H.gray : comum ? H.navy : H.grayMark, null, { name: "wf" + i });
  T(s, brl(v, 0), { x: x - 0.1, y: yTop - 0.24, w: bw + 0.2, h: 0.22, fontSize: LABEL, bold: true, align: "center" });
  T(s, lab, { x: x - 0.15, y: wfY0 + 0.06, w: bw + 0.3, h: 0.4, fontSize: LABEL, color: H.gray, align: "center" });
  if (!isTot && i < 4) seg(s, x + bw, yTop, x + bw + bgap, yTop, H.grayMark, 0.75, "dash");
  if (!isTot) base += v;
});
seg(s, wfX0 - 0.05, wfY0, wfX0 + 5 * bw + 4 * bgap + 0.05, wfY0, "B8BFC6", 1);
const bx1 = wfX0 + (bw + bgap), bx2 = wfX0 + 3 * (bw + bgap) + bw, bTop = wfY0 - wfH - 0.42;
seg(s, bx1, bTop + 0.12, bx1, bTop, H.navy, 1); seg(s, bx1, bTop, bx2, bTop, H.navy, 1); seg(s, bx2, bTop, bx2, bTop + 0.12, H.navy, 1);
T(s, "Custo comum: R$ 13.046 (53%)", { x: bx1, y: bTop - 0.27, w: 3.8, h: 0.24, fontSize: LABEL, bold: true, color: H.navy });
// rateio por departamento
const rx = 7.35, rw = R - rx;
seg(s, rx - 0.3, TOP, rx - 0.3, BOT, H.line, 0.75);
label(s, "Custo de cada departamento depois do rateio, R$", { x: rx, y: TOP, w: rw });
const sc = 3.55 / 8741.89, barW = 4.2, lbW = 1.1;
DEP.forEach(([n, p, r, t], i) => {
  const y = 2.2 + i * 1.15, x0 = rx + lbW;
  T(s, n, { x: rx, y, w: lbW, h: 0.55, bold: true, valign: "middle" });
  rect(s, x0, y, p * sc, 0.55, H.grayMark, null, { name: "proprio" });
  rect(s, x0 + p * sc, y, r * sc, 0.55, H.navy, null, { name: "rateio" });
  T(s, brl(p, 0), { x: x0, y, w: p * sc, h: 0.55, fontSize: LABEL, align: "center", valign: "middle", color: H.ink });
  T(s, brl(r, 0), { x: x0 + p * sc, y, w: r * sc, h: 0.55, fontSize: LABEL, align: "center", valign: "middle", color: H.white, bold: true });
  T(s, brl(t, 0), { x: x0 + (p + r) * sc + 0.08, y, w: 0.8, h: 0.55, fontSize: LABEL, bold: true, valign: "middle" });
});
rect(s, rx + lbW, 5.75, 0.22, 0.22, H.grayMark, null, { name: "leg1" });
T(s, "equipe do próprio departamento", { x: rx + lbW + 0.3, y: 5.75, w: 2.6, h: 0.22, fontSize: LABEL, valign: "middle" });
rect(s, rx + lbW, 6.05, 0.22, 0.22, H.navy, null, { name: "leg2" });
T(s, "rateio do custo comum: 53% em cada departamento", { x: rx + lbW + 0.3, y: 6.05, w: 4.2, h: 0.22, fontSize: LABEL, valign: "middle", bold: true, color: H.navy });

// ================= 7. Até onde vai a informação de custo =================
s = slide(1, "A informação de custo dos escritórios para antes de um sistema de custo por cliente", "Cruz Neto (2018), p. 76 e 79; falas de ORGC6, ORGC1 e ORGC2",
  null,
  "As duas lentes vão divergir, e este slide mostra o motivo. Para cobrar de cada cliente pelo que ele custa, o escritório precisa saber quanto cada cliente custa. A associação é familiar: saber quanto a casa gasta por mês é uma coisa; saber quanto custa cada filho é outra, bem mais difícil. Da esquerda para a direita, a informação fica mais fina. O custo total, todos medem; um sócio diz: o que temos é a mensuração de todo custo do escritório. Por departamento, só em parte: a ORGC7 calcula o custo hora por departamento, e o mesmo sócio que mede o custo total completa que um controle específico por setor eles não têm. Por cliente, há software de atividades em alguns escritórios, mas o autor não encontrou sistema completo. Por colaborador e cliente, não foi observado; um sócio diz exatamente isso. O ponto marcado é o mínimo para cobrar pelo custo de cada cliente, e os escritórios param antes dele. Embaixo: nenhum usa sistema gerencial de custeio. Sem esse sistema, o preço precisa de outra referência.");
label(s, "Informação de custo, da mais agregada à mais fina  →", { x: L, y: TOP, w: 7 });
const st = [
  ["Custo total do escritório", 2, "Todos medem", "“O que temos é a mensuração de todo custo do escritório”"],
  ["Custo por departamento", 1, "Em parte: ORGC7 calcula, ORGC6 não", "“Um controle específico por setor não temos”"],
  ["Custo por cliente", 0, "Software em alguns; sem sistema completo", "O autor não observou sistema completo de controle de custo"],
  ["Custo por colaborador e cliente", 0, "Não observado", "“o que não tem é quanto custa cada colaborador para o cliente”"],
];
const tY = 3.05, xs = i => L + 1.35 + i * 3.2, d0 = 0.56;
seg(s, xs(0), tY, xs(1), tY, H.grayMark, 3);
seg(s, xs(1), tY, xs(2), tY, H.grayMark, 2.5, "dash");
seg(s, xs(2), tY, xs(3), tY, H.line, 2.5, "dash");
st.forEach(([n, lvl, sts, q], i) => {
  const x = xs(i);
  if (i === 2) circ(s, x - d0 / 2 - 0.14, tY - d0 / 2 - 0.14, d0 + 0.28, null, H.navy, 2);
  circ(s, x - d0 / 2, tY - d0 / 2, d0, H.white, lvl === 2 ? H.navy : lvl === 1 ? H.gray : H.grayMark, lvl === 2 ? 3 : 1.5, lvl === 0 ? "dash" : undefined);
  T(s, n, { x: x - 1.5, y: 2.05, w: 3.0, h: 0.5, bold: true, align: "center", fontSize: 13, color: i === 2 ? H.navy : H.ink });
  T(s, sts, { x: x - 1.5, y: 3.55, w: 3.0, h: 0.5, bold: true, align: "center", color: lvl === 2 ? H.navy : H.gray });
  T(s, q, { x: x - 1.45, y: 4.08, w: 2.9, h: 0.9, align: "center", fontSize: 12, italic: q.startsWith("“"), color: H.gray });
});
T(s, "mínimo para cobrar pelo custo de cada cliente", { x: xs(2) - 1.7, y: 1.72, w: 3.4, h: 0.25, fontSize: LABEL, bold: true, color: H.navy, align: "center" });
seg(s, L, 5.3, R, 5.3, H.line, 0.75);
circ(s, L, 5.6, 0.22, H.white, H.grayMark, 1.25, "dash");
T(s, [{ text: "Sistema gerencial de custeio (absorção, variável, ABC): ", options: { bold: true } }, { text: "nenhum escritório entrevistado usa, por custo-benefício", options: { color: H.gray } }], { x: L + 0.35, y: 5.55, w: W - 0.35, h: 0.32 });

// ================= 8. Afirmações → dado =================
s = slide(2, "Só duas das cinco afirmações das entrevistas podem ser checadas com dados do próprio trabalho", "Entrevistas: ORGC1 e ORGC7 (p. 76 e 77), ORGC1 (p. 75 e 80), ORGC2 (p. 80); afirmação do autor (p. 80); Cruz Neto (2018), p. 62 e 87",
  null,
  "As entrevistas trazem afirmações fortes. Na primeira coluna estão cinco delas, com contorno porque são declaradas: que o preço parte do custo mais a margem; que o mercado serve só de conferência; que quem cobra pelo custo enxerga o negócio 6, 12 ou 24 meses à frente; que clientes que saem por preço voltam pela qualidade, e um sócio conta que quatro saíram e voltaram em dez ou onze meses; e, na leitura do próprio autor, que cobrar pelo mercado prejudica a qualidade. Cada frase é uma hipótese. No meio, o que seria preciso medir. À direita, se o trabalho tem esse dado. Três não têm dado nenhum. A do mercado tem, e os contratos a contrariam, como mostro agora. E a do custo pode ser olhada em parte com o Anexo 2, que é de um escritório-exemplo e não de um dos 11 entrevistados; é a parte 3. Se perguntarem: o autor registra que mede desempenho percebido, e a conclusão diz que não há indicador de desempenho.");
const ax = [L, 5.35, 9.75], aw = [4.35, 3.85, R - 9.75];
["O que se afirma nas entrevistas", "O que seria preciso medir", "Dado no próprio trabalho"].forEach((h, i) => label(s, h, { x: ax[i], y: TOP, w: aw[i] }));
const af = [
  ["O preço parte do custo apurado mais a margem", "Custo e preço cobrado de cada cliente", 1, "Em parte: Anexo 2, escritório-exemplo"],
  ["O mercado serve só de conferência", "Método escrito nos contratos", 1, "Sim, e contraria: 43 de 109 contratos"],
  ["Quem precifica pelo custo enxerga 6, 12 ou 24 meses à frente", "Resultado ao longo do tempo, por método", 0, "Não há"],
  ["Clientes que saem por preço voltam pela qualidade", "Saída e retorno de clientes por faixa de preço", 0, "Não há"],
  ["Precificar pelo mercado prejudica a qualidade (autor)", "Qualidade e remuneração por método", 0, "Não há"],
];
af.forEach(([a, m, lvl, stt], i) => {
  const y = TOP + 0.4 + i * 0.92, hh = 0.7;
  rect(s, ax[0], y, aw[0], hh, null, H.grayMark, { round: true, name: "afirma" });
  T(s, a, { x: ax[0] + 0.18, y, w: aw[0] - 0.36, h: hh, italic: true, valign: "middle" });
  seg(s, ax[0] + aw[0] + 0.08, y + hh / 2, ax[1] - 0.12, y + hh / 2, H.grayMark, 1, null, true);
  T(s, m, { x: ax[1], y, w: aw[1], h: hh, valign: "middle", color: lvl ? H.ink : H.gray });
  seg(s, ax[1] + aw[1] + 0.05, y + hh / 2, ax[2] - 0.12, y + hh / 2, H.grayMark, 1, null, true);
  if (lvl) rect(s, ax[2], y + 0.08, aw[2], hh - 0.16, lvl === 2 ? H.navy : H.soft, null, { round: true, name: "status" });
  T(s, stt, { x: ax[2] + (lvl ? 0.18 : 0), y: y + 0.08, w: aw[2] - 0.36, h: hh - 0.16, valign: "middle", bold: lvl > 0, color: lvl === 2 ? H.white : lvl === 1 ? H.navy : H.gray });
});

// ================= 9. Confronto =================
s = slide(2, "Os sócios dizem que precificam pelo custo, mas 4 em cada 10 contratos atrelam o honorário ao salário mínimo", "Cruz Neto (2018), p. 21, 22, 70, 80, 87 e 88",
  ["¹ 39,4%; intervalo de Wilson a 95% de 30,8% a 48,8%, calculado pelo apresentador; a amostra não é probabilística (p. 70). A vinculação ao salário mínimo é vedada pelo art. 7º, IV, da Constituição (p. 21)."],
  "Segundo argumento: o que é praticado. As duas lentes lado a lado. À esquerda, com contorno, o que os 11 sócios declaram: todos citam o custo como base; dez olham também o mercado e um usa só o custo. Na conclusão, o autor escreve que, por unanimidade, o melhor método é o custo efetivamente incorrido. À direita, preenchido, o que os 109 contratos documentam: 43 amarram o honorário ao salário mínimo regional, conforme o número de empregados, notas e lançamentos do cliente. Quatro em cada dez. Salário mínimo não tem relação com o custo do escritório; é uma referência de mercado, e o próprio autor classifica assim. Kahneman e Tversky chamam isso de ancoragem: quando falta uma referência própria, a gente se agarra à primeira disponível. Para ser justo com o trabalho: a amostra não foi sorteada, então os 39% são um indício. O intervalo e a vedação constitucional estão no rodapé, caso perguntem.");
const lcx = L, lcw = 5.55, rcx = 6.85, rcw = R - 6.85, midX = 6.43;
seg(s, midX, TOP, midX, BOT - 0.15, H.line, 0.75);
label(s, "Declarado: 11 sócios entrevistados", { x: lcx, y: TOP, w: lcw });
label(s, "Observado: 109 contratos, SP, 2004 a 2017", { x: rcx, y: TOP, w: rcw });
const pd = 0.42, pstep = 0.5, py = 2.15;
for (let i = 0; i < 11; i++) circ(s, lcx + i * pstep, py, pd, null, H.gray, 1.25);
seg(s, lcx, py + pd + 0.12, lcx + 9 * pstep + pd, py + pd + 0.12, H.gray, 0.75);
T(s, "10 usam o custo e olham o mercado", { x: lcx, y: py + pd + 0.2, w: 4.0, h: 0.25, fontSize: LABEL });
T(s, "1 usa só o custo", { x: lcx + 10 * pstep + pd / 2 - 0.55, y: py + pd + 0.2, w: 1.1, h: 0.4, fontSize: LABEL, color: H.gray, align: "center" });
T(s, "11 de 11", { x: lcx, y: 4.05, w: lcw, h: 0.6, fontSize: 30, bold: true, color: H.gray });
T(s, "citam o custo como base do preço, e o autor conclui “por unanimidade” que o custo é o melhor método", { x: lcx, y: 4.75, w: lcw, h: 0.9, fontSize: 13 });
const cols9 = 19, sq = 0.27, gp = 0.045;
for (let i = 0; i < 109; i++) {
  const r = Math.floor(i / cols9), c = i % cols9;
  rect(s, rcx + c * (sq + gp), 2.1 + r * (sq + gp), sq, sq, i < 43 ? H.navy : H.soft, null, { name: "c" + i });
}
T(s, "43 de 109¹", { x: rcx, y: 4.05, w: rcw, h: 0.6, fontSize: 30, bold: true, color: H.navy });
T(s, "atrelam o honorário ao salário mínimo regional, o que o autor classifica como precificação pelo mercado", { x: rcx, y: 4.75, w: rcw, h: 0.9, fontSize: 13 });

// ================= 10. Dispersão =================
s = slide(3, "No escritório-exemplo do Anexo 2, 25 dos 36 clientes pagam abaixo do preço que o próprio custo indica", "Anexo 2 (NIBO, 2018), p. 106; zonas e gráfico do apresentador. O texto da dissertação não comenta este anexo",
  null,
  "Terceiro argumento: o que os números mostram. O Anexo 2 traz 36 clientes de um escritório-exemplo, com o custo de cada um, o honorário ideal e o honorário cobrado. O texto da dissertação não comenta esse anexo; eu fiz as contas. Cada ponto é um cliente: custo no eixo horizontal, preço cobrado no vertical. A linha é o preço ideal, o custo vezes 1,5791. Se o preço seguisse o custo, todos os pontos estariam sobre ela. Eles se espalham. Em azul, 17 clientes pagam mais do que custam, mas abaixo do ideal: um desconto. Em laranja, 8 pagam menos do que custam; o pior é o JS, que custa 2.043 e paga 1.500. São 25 abaixo do ideal. Só 11, em cinza, ficam acima, como o FIL, que custa 1.511 e paga 4.000. A carteira cobra 33.970 quando o ideal seria 39.111, 13% abaixo. E um detalhe que chama atenção: 34 dos 36 preços cobrados são múltiplos de 50 reais, enquanto nenhum preço ideal é. Isso é compatível com preço negociado em valores redondos.");
const XMAX = 2100, YMAX = 4200;
const cx = L, cy = TOP, cw = W, ch = BOT - TOP + 0.05, lay = { x: 0.065, y: 0.02, w: 0.915, h: 0.87 };
const px0 = cx + lay.x * cw, pw = lay.w * cw, py0 = cy + lay.y * ch, ph = lay.h * ch;
const PX = v => px0 + pw * v / XMAX, PY = v => py0 + ph - ph * v / YMAX;
s.addShape(pres.shapes.RIGHT_TRIANGLE, { x: PX(0), y: PY(XMAX * 1.5791), w: pw, h: PY(0) - PY(XMAX * 1.5791), flipH: true, fill: { color: H.zoneGap }, line: { type: "none" }, objectName: "zona desconto" });
s.addShape(pres.shapes.RIGHT_TRIANGLE, { x: PX(0), y: PY(XMAX), w: pw, h: PY(0) - PY(XMAX), flipH: true, fill: { color: H.zoneLoss }, line: { type: "none" }, objectName: "zona prejuizo" });
const sorted = [...rows].sort((a, b) => a.custo - b.custo);
s.addChart(pres.charts.SCATTER, [
  { name: "Custo", values: sorted.map(r => r.custo) },
  { name: "Acima do ideal", values: sorted.map(r => acima(r) ? r.cobrado : null) },
  { name: "Desconto", values: sorted.map(r => desc(r) ? r.cobrado : null) },
  { name: "Abaixo do custo", values: sorted.map(r => prej(r) ? r.cobrado : null) },
], Object.assign({}, CHART, { x: cx, y: cy, w: cw, h: ch, layout: lay, lineSize: 0, lineDataSymbol: "circle", lineDataSymbolSize: 9, chartColors: [H.grayMark, H.navy, H.loss],
  valAxisMinVal: 0, valAxisMaxVal: YMAX, valAxisMajorUnit: 1000, catAxisMinVal: 0, catAxisMaxVal: XMAX, catAxisMajorUnit: 500,
  valAxisLabelFormatCode: AXFMT, catAxisLabelFormatCode: AXFMT, valGridLine: { style: "none" },
  showValAxisTitle: true, valAxisTitle: "Honorário cobrado, R$ por mês", valAxisTitleFontSize: LABEL, valAxisTitleColor: H.gray, valAxisTitleFontFace: "Arial",
  showCatAxisTitle: true, catAxisTitle: "Custo do cliente, R$ por mês", catAxisTitleFontSize: LABEL, catAxisTitleColor: H.gray, catAxisTitleFontFace: "Arial" }));
seg(s, PX(0), PY(0), PX(XMAX), PY(XMAX * 1.5791), H.navy, 1.75);
T(s, "preço ideal = custo × 1,5791", { x: PX(2100) - 2.6, y: PY(2100 * 1.5791) - 0.3, w: 2.55, h: 0.24, fontSize: LABEL, bold: true, color: H.navy, align: "right" });
T(s, "preço = custo", { x: PX(2100) - 1.5, y: PY(2100) - 0.27, w: 1.45, h: 0.24, fontSize: LABEL, bold: true, color: H.gray, align: "right" });
const zoneTxt = (x, y, n, t, color, w, big) => T(s, [{ text: n, options: { fontSize: big ? 26 : 16, bold: true, color, breakLine: true } }, { text: t, options: { fontSize: LABEL, color: H.ink } }], { x, y, w: w || 2.3, h: 0.95 });
T(s, String(nDesc), { x: PX(1440), y: PY(2240), w: 0.55, h: 0.42, fontSize: 26, bold: true, color: H.navy });
T(s, "acima do custo, abaixo do ideal", { x: PX(1440) + 0.55, y: PY(2240) + 0.02, w: 1.5, h: 0.4, fontSize: LABEL });
zoneTxt(PX(1450), PY(700), String(nPrej), "pagam menos do que custam", H.loss, 2.2, true);
zoneTxt(PX(250), PY(3550), String(nAcima), "pagam acima do preço ideal", H.gray, 2.3, false);
const fil = rows.find(r => r.emp === "FIL"), js = rows.find(r => r.emp === "JS");
T(s, "FIL: custo 1.511, paga 4.000", { x: PX(fil.custo) + 0.15, y: PY(fil.cobrado) - 0.12, w: 2.6, h: 0.24, fontSize: LABEL, color: H.gray, bold: true });
T(s, "JS: custo 2.043, paga 1.500", { x: PX(js.custo) - 2.55, y: PY(js.cobrado) + 0.08, w: 2.4, h: 0.24, fontSize: LABEL, color: H.loss, bold: true, align: "right" });
T(s, [{ text: "Carteira: ", options: { bold: true } }, { text: "cobra R$ 33.970 contra um ideal de R$ 39.111, " }, { text: "13,1% abaixo", options: { bold: true, color: H.navy } }],
  { x: PX(250), y: PY(2650), w: 3.8, h: 0.5, fontSize: BODY });

// ================= 11. Curva da baleia =================
s = slide(3, "Os 8 clientes abaixo do custo consomem R$ 1.189, o equivalente a 13% do lucro final da carteira", "Anexo 2 (NIBO, 2018), p. 106; lucro = honorário cobrado menos custo total; curva calculada pelo apresentador",
  null,
  "A consequência aparece quando ordeno os 36 clientes do mais lucrativo para o menos lucrativo e vou somando o lucro. Esse gráfico tem nome na contabilidade de custos, curva da baleia, pelo formato. Ficou conhecido com Robert Kaplan e Robin Cooper, de Harvard, criadores do custeio baseado em atividades, o ABC. O primeiro ponto já está em 27%: só o FIL gera mais de um quarto do lucro. Com 19 clientes chega-se a 100%. A curva sobe até 112,9% no vigésimo oitavo cliente e depois cai: os últimos 8 custam mais do que pagam e consomem 1.189 reais, o equivalente a quase 13% do lucro final. Os nomes deles estão embaixo. A associação é o rodízio de pizza: todo mundo paga o mesmo, e quem come três pedaços sustenta quem come quinze. O escritório só enxerga isso com o custo de cada cliente. O autor cita um estudo de Eckert, de 2013, mostrando que o ABC é viável em escritórios de contabilidade.");
const lc = { x: L, y: TOP, w: W, h: 3.85 }, lLay = { x: 0.055, y: 0.08, w: 0.93, h: 0.78 };
const lx0 = lc.x + lLay.x * lc.w, lw = lLay.w * lc.w, ly0 = lc.y + lLay.y * lc.h, lh = lLay.h * lc.h;
const LY = v => ly0 + lh - lh * v / 120, LX = i => lx0 + lw * i / 35;
rect(s, LX(27), LY(120), LX(35) - LX(27), LY(100) - LY(120), H.zoneLoss, null, { name: "zona devolucao" });
s.addChart(pres.charts.LINE, [{ name: "Lucro acumulado", labels: byProfit.map((_, i) => (i === 0 || ((i + 1) % 5 === 0 && i !== 34) || i === 35) ? String(i + 1) : ""), values: cum }],
  Object.assign({}, CHART, lc, { layout: lLay, chartColors: [H.navy], lineSize: 2.5, lineDataSymbol: "none", valAxisMinVal: 0, valAxisMaxVal: 120, valAxisMajorUnit: 20, valAxisLabelFormatCode: "0\"%\"" }));
seg(s, lx0, LY(100), lx0 + lw, LY(100), H.gray, 1, "dash");
T(s, "FIL sozinho: 27% do lucro", { x: LX(0) + 0.15, y: LY(20), w: 2.4, h: 0.24, fontSize: LABEL, bold: true, color: H.gray });
T(s, "100% do lucro no 19º cliente", { x: LX(18) - 2.6, y: LY(100) - 0.32, w: 2.5, h: 0.24, fontSize: LABEL, bold: true, color: H.gray, align: "right" });
T(s, "pico: 112,9% no 28º", { x: LX(27) - 1.25, y: LY(112.9) - 0.32, w: 2.5, h: 0.24, fontSize: LABEL, bold: true, color: H.navy, align: "center" });
T(s, "os 8 últimos devolvem R$ 1.189 (12,9%)", { x: LX(35) - 3.6, y: LY(100) + 0.08, w: 3.5, h: 0.24, fontSize: LABEL, bold: true, color: H.loss, align: "right" });
seg(s, L, 5.6, R, 5.6, H.line, 0.75);
label(s, "Os 8 clientes abaixo do custo, prejuízo mensal em R$", { x: L, y: 5.72, w: 5.5, color: H.loss });
byProfit.slice(-8).reverse().forEach((r, i) => T(s, [{ text: r.emp + "  ", options: { bold: true } }, { text: brl(r.lucro, 0), options: { color: H.loss } }], { x: L + i * 1.55, y: 6.0, w: 1.5, h: 0.28 }));

// ================= 12. Markup =================
s = slide(3, "Mesmo com o custo de cada cliente calculado, a fórmula do preço ideal do anexo entrega 27% de margem no lugar de 30%", "Anexo 2 (NIBO, 2018), p. 106; Bruni e Famá, Gestão de custos e formação de preços",
  ["¹ O anexo não mostra a fórmula; a equivalência entre 1,5791 e a aplicação em sequência é inferência do apresentador, e fecha nos 36 clientes."],
  "Último achado, que conversa com a parte da Luisa. Voltando ao 1,5791: em todos os 36 clientes, o honorário ideal é o custo vezes esse número. Ele sai de aplicar a margem de 30% e depois os impostos de 9,53%, um depois do outro. O markup de Bruni e Famá divide o custo por um menos a soma de margem e impostos, e dá 1,6537. A associação é com descontos em sequência: dois descontos seguidos de 10% dão 19% no total, um pouco menos que os 20% que a intuição sugere. Percentuais em sequência não se somam. As duas colunas partem dos mesmos 100 reais de custo. Pelo método do anexo, a margem fica em 42,86, 27,1% do preço; pelo markup de Bruni e Famá, 49,61, os 30% pretendidos. Ou seja, mesmo quem já calcula o custo de cada cliente perde margem se aplicar a fórmula em duas etapas. Na carteira do anexo, são 1.849 reais por mês de preço ideal a menos. A fórmula não aparece no anexo; a equivalência é inferência minha, e ela fecha nos 36 clientes.");
const scm = 3.5 / 170, yb = 5.95, cw2 = 1.45;
const colsM = [[1.2, "Sequencial (Anexo 2)", 100 * 1.5791, true], [3.75, "Markup único (Bruni e Famá)", 100 / (1 - 0.3953), false]];
const tops = [];
colsM.forEach(([x, t, preco, dest]) => {
  const imp = preco * 0.0953, mg = preco - 100 - imp;
  const parts = [["Custo", 100, H.soft, H.ink], ["Impostos", imp, H.grayMark, H.ink], ["Margem", mg, dest ? H.navy : H.gray, H.white]];
  let b = 0;
  parts.forEach(([n, v, c, tc]) => {
    const y = yb - (b + v) * scm;
    rect(s, x, y, cw2, v * scm, c, H.white, { name: n, lw: 1.5 });
    T(s, n === "Margem" ? [{ text: brl(v), options: { bold: true, breakLine: true } }, { text: brl(v / preco * 100, 1) + "% do preço", options: { fontSize: LABEL } }] : brl(v), { x, y, w: cw2, h: v * scm, align: "center", valign: "middle", color: tc });
    if (x === 1.2) T(s, n, { x: x - 1.1, y, w: 1.0, h: v * scm, align: "right", valign: "middle", fontSize: LABEL, color: H.gray });
    b += v;
  });
  tops.push([x, yb - preco * scm, yb - (100 + imp) * scm]);
  T(s, brl(preco), { x, y: yb - preco * scm - 0.3, w: cw2, h: 0.25, align: "center", bold: true });
  T(s, t, { x: x - 0.3, y: yb + 0.08, w: cw2 + 0.6, h: 0.4, align: "center", fontSize: LABEL, color: H.gray, bold: true });
});
seg(s, tops[0][0] + cw2, tops[0][1], tops[1][0], tops[1][1], H.grayMark, 0.75, "dash");
seg(s, tops[0][0] + cw2, tops[0][2], tops[1][0], tops[1][2], H.grayMark, 0.75, "dash");
T(s, "−2,9 pontos de margem", { x: tops[0][0] + cw2 + 0.02, y: (tops[0][1] + tops[0][2]) / 2 - 0.35, w: tops[1][0] - tops[0][0] - cw2 - 0.04, h: 0.5, fontSize: LABEL, bold: true, color: H.navy, align: "center", valign: "middle" });
seg(s, 0.9, yb, 5.5, yb, "B8BFC6", 1);
label(s, "Preço formado a partir de R$ 100 de custo", { x: L, y: TOP, w: 5.4 });
const fx = 6.4, fw = R - fx;
seg(s, fx - 0.3, TOP, fx - 0.3, BOT, H.line, 0.75);
label(s, "Como cada número é obtido", { x: fx, y: TOP, w: fw });
[["Sequencial (Anexo 2)¹", "preço = custo ÷ [(1 − 0,30) × (1 − 0,0953)] = custo × 1,5791", "A margem de 30% incide sobre o preço já líquido de impostos: 0,30 × (1 − 0,0953) = 27,1% do preço.", true],
 ["Markup único (Bruni e Famá)", "preço = custo ÷ (1 − 0,30 − 0,0953) = custo × 1,6537", "Impostos e margem saem juntos do preço, e a margem fica nos 30% pretendidos.", false]].forEach(([t, f, e, dest], i) => {
  const y = TOP + 0.4 + i * 1.6;
  T(s, t, { x: fx, y, w: fw, h: 0.28, bold: true, color: dest ? H.navy : H.ink });
  T(s, f, { x: fx, y: y + 0.32, w: fw, h: 0.3, fontSize: 13 });
  T(s, e, { x: fx, y: y + 0.7, w: fw, h: 0.7, color: H.gray });
  seg(s, fx, y + 1.45, R, y + 1.45, H.line, 0.75);
});
T(s, [{ text: "Na carteira do anexo: ", options: { bold: true } }, { text: "R$ 1.849 por mês a menos de preço ideal (custo total de R$ 24.768,69)." }], { x: fx, y: 5.15, w: fw, h: 0.6, fontSize: 13 });

// ================= 13. Síntese =================
s = slide(null, "Os três achados apontam para o mesmo passo: conhecer o custo de cada cliente antes de discutir preço", "Cruz Neto (2018), p. 22, 79, 80, 87 e 88; Anexo 2 (p. 106); Eckert (2013), citado na p. 79; Bruni e Famá", null,
  "Juntando tudo. No topo, a tese: escritórios contábeis afirmam precificar pelo custo, mas sem um sistema de custo por cliente o preço acaba ancorado no mercado. Os três achados que a sustentam. O declarado: 11 de 11 sócios citam o custo como base. O praticado: 43 de 109 contratos amarram o preço ao salário mínimo. O efeito, compatível com a tese: no Anexo 2, 25 de 36 clientes pagam abaixo do preço que o custo indica, e a carteira cobra 13,1% abaixo do ideal. E três implicações. Para os escritórios: calcular o custo por cliente antes de discutir preço; o ABC é viável nesse setor. Para a teoria que vimos hoje: o markup protege a margem quando é aplicado ao custo do cliente e em uma etapa, como em Bruni e Famá. Para a pesquisa: o teste que o próprio autor propôs, comparar o resultado de quem cobra pelo custo com o de quem cobra pelo mercado, pode começar com dados como os do Anexo 2. Voltando ao começo: quando aquele primeiro cliente perguntar quanto vocês cobram, a resposta pelo custo só funciona se vocês souberem quanto aquele cliente custa. Sem isso, quem responde é o mercado. Obrigado.");
const topW = 9.4, topX = L + (W - topW) / 2;
rect(s, topX, TOP, topW, 0.85, H.navy, null, { name: "tese" });
T(s, TESE, { x: topX + 0.25, y: TOP, w: topW - 0.5, h: 0.85, bold: true, color: H.white, valign: "middle", align: "center", fontSize: 14 });
const argW = 3.9, argG = (W - 3 * argW) / 2, argY = 2.85, argH = 1.55;
const args = [
  ["1  Declarado", "Os sócios descrevem o preço como custo mais margem", "11 de 11", "citam o custo como base", false],
  ["2  Praticado", "Os contratos atrelam o preço a uma referência de mercado", "43 de 109", "contratos no salário mínimo", true],
  ["3  Efeito", "A carteira do Anexo 2 cobra 13,1% abaixo do preço que o custo indica", "25 de 36", "clientes abaixo do preço ideal", true],
];
args.forEach(([k, t, n, nl, obs], i) => {
  const x = L + i * (argW + argG);
  seg(s, topX + topW / 2, TOP + 0.85, x + argW / 2, argY, H.grayMark, 1);
  rect(s, x, argY, argW, argH, obs ? H.fill : null, obs ? null : H.grayMark, { name: "arg" + i });
  label(s, k, { x: x + 0.18, y: argY + 0.12, w: argW - 0.36 });
  T(s, t, { x: x + 0.18, y: argY + 0.38, w: argW - 0.36, h: 0.5, bold: true, color: H.navy });
  T(s, n, { x: x + 0.18, y: argY + 0.92, w: 1.6, h: 0.5, fontSize: 20, bold: true, color: obs ? H.navy : H.gray });
  T(s, nl, { x: x + 1.8, y: argY + 0.96, w: argW - 1.98, h: 0.5, fontSize: LABEL, color: H.gray });
});
seg(s, L, 4.75, R, 4.75, H.navy, 1);
label(s, "Implicações", { x: L, y: 4.85, w: 2 });
[["Para os escritórios", "Calcular o custo por cliente antes de discutir preço; o custeio ABC é viável no setor."],
 ["Para a teoria de formação de preços", "O markup protege a margem quando aplicado ao custo do cliente e em uma etapa, como em Bruni e Famá."],
 ["Para a pesquisa", "O teste que o autor propõe, resultado por método de preço, pode começar com dados no formato do Anexo 2."]].forEach(([k, t], i) => {
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
  "Apêndice para perguntas. Os três primeiros pontos aparecem nos slides 4, 8 e 9.");
tabela(s, [["Ponto", "O texto afirma", "O texto também mostra", "Peso"],
  ["Declarado e praticado", "Os sócios precificam pelo custo (p. 87)", "43 de 109 contratos usam o salário mínimo, classificado pelo autor como mercado (p. 80)", "Alto"],
  ["Pergunta e conclusão", "Pergunta pelo método “mais utilizado” (p. 19)", "Conclui pelo “melhor método” (p. 87); entrevistas medem preferência declarada", "Alto"],
  ["Desempenho", "Seria medido por margem bruta, EBIT, ROE e ROI (p. 69)", "“não há a utilização de qualquer indicador de desempenho” (p. 87)", "Alto"],
  ["Consenso", "“por unanimidade” o custo é o melhor método (p. 87)", "“apenas um” usa o custo isoladamente (p. 22)", "Médio"],
  ["Origem dos contratos", "109 contratos de diversas regiões de SP (p. 80)", "Sem origem, critério de seleção ou o método dos outros 66", "Médio"],
  ["Base teórica", "Teoria da contingência como base (p. 26)", "Porte e diversificação não são ligados ao método escolhido (p. 72 a 75)", "Médio"],
  ["Peso da mão de obra", "80% do custo (ORGC7, p. 79)", "Anexo 1: 55%, ou 76% com o pró-labore (p. 105)", "Baixo"]],
  [2.4, 4.3, 4.73, 1.0], { rowH: [0.4, 0.6, 0.6, 0.6, 0.55, 0.55, 0.6, 0.55] });

s = slide(null, "Apêndice B: honorário cobrado menos honorário ideal, por cliente", "Anexo 2 (NIBO, 2018), p. 106; diferenças calculadas pelo apresentador", null, "Apêndice para perguntas: a mesma informação do slide 10, cliente a cliente. Em azul, cobrado abaixo do ideal; em cinza, acima.");
s.addChart(pres.charts.BAR, [{ name: "Cobrado menos ideal", labels: byGap.map(r => r.emp), values: byGap.map(r => r.gap) }],
  Object.assign({}, CHART, { x: L, y: TOP, w: W, h: BOT - TOP, barDir: "col", chartColors: [H.gray], invertedColors: [H.navy], barGapWidthPct: 35,
    valAxisMinVal: -2000, valAxisMaxVal: 2000, valAxisMajorUnit: 500, valAxisLabelFormatCode: AXFMT, catAxisLabelFontSize: 8, catAxisLabelRotate: 270 }));

s = slide(null, "Referências", null, null, "Slide de referências, só para consulta.");
T(s, [
  { text: "CRUZ NETO, B. P. Métodos de precificação de serviços: uma abordagem comparativa entre os métodos de precificação de serviços contábeis pelo custo e valor de mercado. Dissertação (Mestrado Profissional em Controladoria e Finanças Empresariais), Universidade Presbiteriana Mackenzie, São Paulo, 2018.", options: { breakLine: true, paraSpaceAfter: 10 } },
  { text: "BRUNI, A. L.; FAMÁ, R. Gestão de custos e formação de preços. São Paulo: Atlas.", options: { breakLine: true, paraSpaceAfter: 10 } },
  { text: "KAPLAN, R. S.; COOPER, R. Cost & Effect. Boston: Harvard Business School Press, 1998.", options: { breakLine: true, paraSpaceAfter: 10 } },
  { text: "TVERSKY, A.; KAHNEMAN, D. Judgment under uncertainty: heuristics and biases. Science, v. 185, 1974.", options: { breakLine: true, paraSpaceAfter: 10 } },
  { text: "Fontes secundárias citadas pela dissertação e usadas nos slides: SESCAPLDR (2016), Duarte (2012), Souza (2009), Vaz (2014), Eckert (2013), NIBO (2018, Anexos 1 e 2)." },
], { x: L, y: TOP, w: W, h: 4.5, fontSize: 13 });

(async () => {
  const out = path.join(__dirname, "apresentacao_v5.pptx");
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  console.log("ok", out);
})();
