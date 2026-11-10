// Deck v2 (Adm Fin, Cruz Neto 2018). Plano: PLANO-v2.md.
// Números: leitura/dissertacao_condensada.md e leitura/anexo2.csv.
const path = require("path");
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const SKILL = "C:/Users/adria/.claude/skills/synced/08880bea-5393-40ac-b324-ec6a48439c82_8a8b6610-ca77-4d15-b215-dc9e5dbc2267/pptx";
const { applyTheme } = require(SKILL + "/scripts/apply_theme.js");

// ---------- sistema visual ----------
const H = {
  navy: "0B2545",    // títulos e texto de destaque
  mark: "22589C",    // marcas de gráfico em destaque (validado no dataviz)
  loss: "C2410C",    // só para perda, déficit, abaixo do custo
  ink: "1F2328",
  gray: "5B6670",    // texto secundário
  grayMark: "A3ACB5",// marcas de contexto
  line: "D9DEE3",    // fios e grade
  fill: "F1F3F5",    // caixas
  white: "FFFFFF",
};
const THEME = {
  name: "Consultoria v2", headFontFace: "Arial", bodyFontFace: "Arial",
  colors: { dk1: H.ink, lt1: H.white, dk2: H.navy, lt2: H.fill, accent1: H.mark, accent2: H.loss, accent3: H.gray, accent4: H.grayMark, accent5: H.navy, accent6: H.line, hlink: H.mark, folHlink: H.gray },
};
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.theme = { headFontFace: "Arial", bodyFontFace: "Arial" };
pres.title = "Precificação de serviços contábeis: Cruz Neto (2018)";
pres.author = "Adrian Villela";

const L = 0.45, W = 12.43;              // margem esquerda e largura útil
const BODY_Y = 1.8, BODY_B = 6.55;      // corpo
const EX_W = 8.9, INS_X = 9.6, INS_W = 3.28; // composição A

pres.defineSlideMaster({
  title: "V2",
  background: { color: H.white },
  slideNumber: { x: 12.45, y: 7.05, w: 0.45, h: 0.25, fontSize: 9, color: H.gray, align: "right" },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: L, y: 0.42, w: W, h: 0.95, fontFace: "Arial", fontSize: 22, bold: true, color: H.navy, valign: "top", align: "left", margin: 0 }, text: "" } },
  ],
});

// ---------- helpers ----------
const SECOES = ["Contexto", "1 Método declarado", "2 Método praticado", "3 Custo da diferença"];
function rich(str, base = {}, boldColor) {
  return str.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map(part => part.startsWith("**")
    ? { text: part.slice(2, -2), options: Object.assign({}, base, { bold: true }, boldColor ? { color: boldColor } : {}) }
    : { text: part, options: Object.assign({}, base) });
}
function T(s, t, o) {
  s.addText(typeof t === "string" ? rich(t) : t, Object.assign({ isTextBox: true, fontFace: "Arial", fontSize: 13, color: H.ink, valign: "top", margin: 0 }, o));
}
function rect(s, x, y, w, h, fill, line, name) {
  s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { color: line || fill, width: 0.75 }, objectName: name || "rect" });
}
function hline(s, x, y, w, color, width) {
  s.addShape(pres.shapes.LINE, { x, y, w, h: 0, line: { color: color || H.line, width: width || 0.75 }, objectName: "fio" });
}
function seg(s, x1, y1, x2, y2, color, width, dash) {
  const o = { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1) || 0.001, h: Math.abs(y2 - y1) || 0.001, line: { color, width: width || 1 }, objectName: "linha" };
  if (dash) o.line.dashType = dash;
  if ((x2 - x1) * (y2 - y1) < 0) o.flipV = true;
  s.addShape(pres.shapes.LINE, o);
}
function slide(secao, titulo, header, fonte, notas, speaker) {
  const s = pres.addSlide({ masterName: "V2" });
  s.addText(titulo, { placeholder: "title" });
  if (secao !== null && secao !== undefined) {
    const runs = [];
    SECOES.forEach((n, i) => {
      runs.push({ text: n, options: { bold: i === secao, color: i === secao ? H.navy : H.grayMark } });
      if (i < SECOES.length - 1) runs.push({ text: "     ", options: {} });
    });
    T(s, runs, { x: 6.4, y: 0.14, w: 6.48, h: 0.25, fontSize: 9, align: "right" });
  }
  if (header) T(s, header, { x: L, y: 1.42, w: W, h: 0.3, fontSize: 12, bold: true, color: H.ink });
  const foot = [];
  (notas || []).forEach(n => foot.push({ text: n, options: { breakLine: true } }));
  if (fonte) foot.push({ text: "Fonte: " + fonte });
  if (foot.length) T(s, foot, { x: L, y: 6.65, w: 11.8, h: 0.6, fontSize: 9, color: H.gray, valign: "bottom" });
  if (speaker) s.addNotes(speaker);
  return s;
}
function leitura(s, itens, o = {}) {
  const x = o.x || INS_X, y = o.y || BODY_Y, w = o.w || INS_W, h = o.h || (BODY_B - BODY_Y);
  rect(s, x, y, w, h, H.fill, H.fill, "leitura");
  T(s, o.titulo || "Leitura", { x: x + 0.2, y: y + 0.18, w: w - 0.4, h: 0.3, fontSize: 12, bold: true, color: H.navy });
  let yy = y + 0.62;
  const cpl = (w - 0.75) * 72 / (12.5 * 0.5);   // caracteres por linha, aprox.
  itens.forEach((it, i) => {
    s.addShape(pres.shapes.OVAL, { x: x + 0.2, y: yy + 0.02, w: 0.24, h: 0.24, fill: { color: H.navy }, line: { color: H.navy }, objectName: "n" + i });
    T(s, String(i + 1), { x: x + 0.2, y: yy + 0.02, w: 0.24, h: 0.24, fontSize: 9, bold: true, color: H.white, align: "center", valign: "middle" });
    const lines = Math.ceil(it.replace(/\*\*/g, "").length / cpl);
    const hh = lines * 0.215 + 0.05;
    T(s, it, { x: x + 0.55, y: yy, w: w - 0.75, h: hh, fontSize: 12.5 }, H.navy);
    yy += hh + 0.22;
  });
}
function tabela(s, rows, colW, o = {}) {
  const hl = o.highlightRow;
  const data = rows.map((r, i) => r.map((c, j) => {
    const head = i === 0;
    const cell = typeof c === "object" && c.text !== undefined ? c : { text: c };
    const runs = head || Array.isArray(cell.text) ? cell.text : rich(String(cell.text), {}, H.navy);
    return {
      text: runs, options: Object.assign({
        bold: head || (j === 0 && !o.noBoldFirst), fontFace: "Arial", fontSize: head ? 11 : (o.fontSize || 12),
        color: head ? H.gray : (i === hl ? H.navy : H.ink), valign: head ? "bottom" : "middle",
        margin: [0.05, 0.08, 0.05, 0.08],
        border: [{ type: "none" }, { type: "none" }, head ? { type: "solid", pt: 1.5, color: H.navy } : { type: "solid", pt: 0.75, color: H.line }, { type: "none" }],
      }, cell.options || {}),
    };
  }));
  s.addTable(data, { x: o.x || L, y: o.y || BODY_Y, w: colW.reduce((a, b) => a + b, 0), colW, rowH: o.rowH });
}
function marcador(s, x, y, nivel) { // 2 = tem/alto, 1 = parcial/médio, 0 = não tem/baixo
  const fill = nivel === 2 ? H.navy : nivel === 1 ? H.grayMark : H.white;
  const line = nivel === 0 ? H.gray : H.navy;
  s.addShape(pres.shapes.OVAL, { x, y, w: 0.2, h: 0.2, fill: { color: fill }, line: { color: line, width: 1 }, objectName: "marcador" });
}
const CHART = {
  catAxisLabelColor: H.gray, valAxisLabelColor: H.gray, catAxisLabelFontFace: "Arial", valAxisLabelFontFace: "Arial",
  catAxisLabelFontSize: 11, valAxisLabelFontSize: 11, dataLabelFontSize: 11, dataLabelFontFace: "Arial", dataLabelColor: H.ink,
  valGridLine: { color: "E6E9EC", size: 0.75 }, catGridLine: { style: "none" }, catAxisLineShow: true, catAxisLineColor: "B8BFC6",
  valAxisLineShow: false, showLegend: false,
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
const abaixoCusto = rows.filter(r => r.lucro < 0), abaixoIdeal = rows.filter(r => r.gap < 0);
const totCobrado = rows.reduce((a, r) => a + r.cobrado, 0), totIdeal = rows.reduce((a, r) => a + r.ideal, 0), totCusto = rows.reduce((a, r) => a + r.custo, 0);
const difMarkup = totCusto / (1 - 0.30 - 0.0953) - totIdeal;
const check = (cond, msg) => { if (!cond) throw new Error("checagem: " + msg); };
check(Math.abs(totalLucro - 9201.31) < 0.01, "lucro total");
check(Math.max(...cum) === 112.9 && cum.indexOf(112.9) === 27, "pico no 28º");
check(cum.findIndex(v => v >= 100) === 18, "19 clientes");
check(abaixoCusto.length === 8 && abaixoIdeal.length === 25, "8 e 25");
check(Math.abs(totCobrado - 33970) < 0.01 && Math.abs(totIdeal - 39111.14) < 0.05, "totais");
check(Math.round(difMarkup) === 1849, "diferença markup " + difMarkup);
console.log("checagens ok; gap total", brl((totCobrado / totIdeal - 1) * 100, 1) + "%");

// ================= 0. Capa =================
let s = pres.addSlide({ masterName: "V2" });
T(s, "ADMINISTRAÇÃO FINANCEIRA II   ·   FORMAÇÃO DE PREÇOS   ·   EXEMPLO DE APLICAÇÃO", { x: L, y: 1.7, w: W, h: 0.3, fontSize: 11, bold: true, color: H.gray, charSpacing: 1 });
T(s, "Como escritórios contábeis formam o preço dos seus serviços, e o que os dados da própria pesquisa mostram", { x: L, y: 2.2, w: 11.2, h: 1.9, fontSize: 32, bold: true, color: H.navy });
hline(s, L, 4.35, 2.0, H.navy, 2);
T(s, "Leitura aplicada de CRUZ NETO, B. P. Métodos de precificação de serviços: uma abordagem comparativa entre os métodos de precificação de serviços contábeis pelo custo e valor de mercado. Dissertação (Mestrado Profissional em Controladoria e Finanças Empresariais), Universidade Presbiteriana Mackenzie, 2018.", { x: L, y: 4.6, w: 10.5, h: 1.0, fontSize: 13, color: H.gray });
T(s, "Adrian Villela   ·   UFF   ·   5 de outubro de 2026", { x: L, y: 6.5, w: W, h: 0.3, fontSize: 12, color: H.ink });
s.addNotes("Minha parte é o exemplo de aplicação: o que acontece quando a teoria de formação de preços que a Luisa e o Robert apresentaram encontra um setor real. O caso é a dissertação de mestrado do Benedito Cruz Neto, Mackenzie, 2018, sobre como escritórios de contabilidade em São Paulo precificam. Vou resumir o trabalho e, no fim, mostrar o que os anexos da própria dissertação revelam quando a gente faz as contas.");

// ================= 1. Sumário executivo =================
s = slide(null, "Sem custo por cliente, escritórios que dizem precificar pelo custo acabam com o preço ancorado no mercado", "Sumário executivo", "Cruz Neto (2018), p. 9, 20, 22, 35, 36, 79, 80, 87, 88 e Anexo 2 (p. 106); cálculos do apresentador sobre o Anexo 2", null,
  "Este slide é a apresentação inteira em uma página. Situação: a teoria oferece três bases de preço, e o setor contábil é grande, sem tabela e intensivo em mão de obra. Complicação: o autor ouviu onze sócios e leu 109 contratos; os sócios dizem custo, os contratos mostram salário mínimo, e ninguém tem custo por cliente. Resolução: sem custo por cliente, o preço acaba ancorado no mercado, e o Anexo 2 da própria dissertação mostra o efeito. Vou percorrer esses três argumentos na ordem.");
const blocos = [
  ["Situação", "A formação de preço pode partir do **custo**, do **mercado** ou do **valor percebido**. No setor contábil, com **64.026 escritórios**, sem tabela oficial de honorários desde 1990 e com a mão de obra como maior custo, cada escritório forma o próprio preço."],
  ["Complicação", "Cruz Neto ouviu **11 sócios** e leu **109 contratos**. Os sócios declaram o custo como base e o mercado como conferência, mas **43 dos 109 contratos** atrelam o honorário ao salário mínimo, e nenhum escritório tem sistema de custeio ou custo por colaborador e cliente."],
  ["Resolução", "Sem custo por cliente, o preço fica ancorado no mercado. O Anexo 2 da própria dissertação mostra o efeito numa carteira de 36 clientes: **19 geram todo o lucro**, **8 pagam menos do que custam**, **25 pagam abaixo do preço ideal**, e a fórmula do ideal entrega **27% de margem** no lugar dos 30% pretendidos."],
];
blocos.forEach(([k, v], i) => {
  const y = 1.85 + i * 1.38;
  hline(s, L, y, W, i === 0 ? H.navy : H.line, i === 0 ? 1.5 : 0.75);
  T(s, k, { x: L, y: y + 0.15, w: 2.2, h: 0.4, fontSize: 15, bold: true, color: H.navy });
  T(s, v, { x: 2.85, y: y + 0.15, w: 10.0, h: 1.15, fontSize: 14 });
});
hline(s, L, 1.85 + 3 * 1.38, W, H.line);
T(s, "**Próximo passo, proposto pelo próprio autor (p. 88):** comparar o resultado financeiro de quem precifica pelo custo com o de quem precifica pelo mercado. O Anexo 2 já traz o tipo de dado necessário.", { x: 2.85, y: 6.1, w: 10.0, h: 0.5, fontSize: 12.5, color: H.gray });

// ================= 2. Três bases, setor sem tabela =================
s = slide(0, "Precificar serviço contábil é escolher entre três bases de preço, num setor sem tabela e com 64 mil concorrentes", "As três bases de preço segundo a literatura revisada pelo autor",
  "Cruz Neto (2018), p. 17, 20, 33, 35, 36, 47, 48 e 53; SESCAPLDR (2016), Duarte (2012), Souza (2009), Vaz (2014) e Farber et al. (2014), citados pelo autor", null,
  "Ponto de partida, conectado ao que a Luisa e o Robert mostraram. A literatura que o autor revisa organiza o preço em três bases. A linha do meio é a avaliação do sindicato de Londrina: o custo é o mais importante para conhecer a empresa, mas não o melhor; o mercado é o mais fácil e o mais traiçoeiro; o valor percebido é o melhor e o mais difícil. Em cima, o contexto do setor: 64 mil escritórios, quase 30% em São Paulo, sem tabela oficial desde o Código de Defesa do Consumidor e com custo dominado por mão de obra. Nesse cenário, cada escritório precisa escolher sua base.");
const ctx = [["64.026", "escritórios contábeis no Brasil (CFC, 2018)"], ["29,9%", "deles no Estado de São Paulo"], ["1990", "CDC: tabela de honorários das entidades de classe deixa de valer"], ["Mão de obra", "é o maior componente de custo (Vaz, 2014)"]];
ctx.forEach(([a, b], i) => {
  const x = L + i * 3.13;
  rect(s, x, 1.78, 3.0, 0.72, H.fill, H.fill, "ctx" + i);
  T(s, [{ text: a + "  ", options: { bold: true, color: H.navy, fontSize: 15 } }, { text: b, options: { fontSize: 11, color: H.gray } }], { x: x + 0.12, y: 1.83, w: 2.8, h: 0.62, valign: "middle" });
});
tabela(s, [
  ["", "Custo", "Mercado ou concorrência", "Valor percebido"],
  ["Lógica", "Custo do serviço mais margem, calculado de dentro para fora", "Preço dos concorrentes ou de tabelas de referência", "Quanto o cliente percebe de valor no serviço"],
  ["Avaliação (SESCAPLDR)", "“a forma mais importante para conhecer a realidade da empresa, entretanto não é a melhor”", "“a forma mais fácil, todavia a mais traiçoeira”", "“a menos importante, porém a melhor forma de se precificar”"],
  ["Risco", "Exige controle de custos, raro nos escritórios (Farber et al.)", "Pode não cobrir o custo e gerar guerra de preços (Duarte)", "Exige pesquisa, análise de vendas e entrevistas (Duarte)"],
  ["Quem usa", "**O mais utilizado** (Duarte, 2012)", "Escritórios iniciantes ou pequenos (Souza, 2009)", "Indicado por especialistas, pouco aplicado"],
].map((r, i) => i === 0 ? r.map((c, j) => j === 1 ? { text: c, options: { color: H.white, fill: { color: H.navy }, bold: true, valign: "bottom" } } : c) : r),
  [2.2, 3.41, 3.41, 3.41], { y: 2.75, rowH: [0.4, 0.75, 0.95, 0.75, 0.6] });

// ================= 3. Desenho da pesquisa =================
s = slide(0, "Cruz Neto pergunta qual base os escritórios usam e responde com 11 entrevistas e 109 contratos", "Desenho da pesquisa", "Cruz Neto (2018), p. 19, 62, 64 a 71 e 80", null,
  "O desenho da pesquisa em quatro etapas. A pergunta é qual método é o mais utilizado; o objetivo geral fala em mais adequado, guardem essa diferença. As fontes são duas, e é por isso que estão destacadas: onze entrevistas com sócios e 109 contratos. A análise é qualitativa, de conteúdo. E os limites que o próprio texto declara: amostra escolhida pelo pesquisador e desempenho medido pela percepção dos sócios. O resto da apresentação compara justamente as duas fontes.");
const etapas = [
  ["Pergunta", "“qual o método de precificação é mais utilizado para a prestação de serviços de natureza contábil?” (p. 19)\n\nO objetivo geral busca o método “mais adequado” (p. 19).", false],
  ["Fonte A: entrevistas", "11 sócios de sociedades limitadas no Estado de São Paulo\n\nPresenciais, de 40 a 70 minutos, de dez/2017 a dez/2018 (p. 70 e 71)", true],
  ["Fonte B: contratos", "109 contratos de prestação de serviços contábeis de diversas regiões de SP\n\nFirmados de 2004 a 2017; analisada a cláusula de preço (p. 66 e 80)", true],
  ["Análise e limites", "4 variáveis de controle e 3 construtos; análise de conteúdo (Bardin)\n\nAmostra não probabilística (p. 70); “desempenho percebido e não o desempenho medido” (p. 62)", false],
];
etapas.forEach(([h, b, dest], i) => {
  const x = L + i * 3.13, w = 2.85;
  rect(s, x, 1.85, w, 0.55, dest ? H.navy : H.fill, null, "etapa" + i);
  T(s, h, { x: x + 0.15, y: 1.85, w: w - 0.3, h: 0.55, fontSize: 14, bold: true, color: dest ? H.white : H.navy, valign: "middle" });
  T(s, b, { x: x + 0.15, y: 2.6, w: w - 0.3, h: 1.85, fontSize: 12.5 });
  if (i < 3) s.addShape(pres.shapes.CHEVRON, { x: x + w + 0.06, y: 1.97, w: 0.16, h: 0.3, fill: { color: H.grayMark }, line: { color: H.grayMark }, objectName: "chevron" });
});
const permite = ["Responde: qual método é o mais usado", "Permite afirmar: o que os sócios declaram e preferem", "Permite afirmar: como o preço aparece no documento assinado", "Não permite afirmar: qual método dá melhor resultado"];
permite.forEach((t, i) => { const [k, v] = t.split(": "); T(s, [{ text: k.toUpperCase(), options: { bold: true, fontSize: 9.5, color: H.gray, charSpacing: 1, breakLine: true } }, { text: v, options: { fontSize: 12, color: i === 3 ? H.loss : H.navy, bold: true } }], { x: L + i * 3.13 + 0.15, y: 4.55, w: 2.6, h: 0.75 }); });
hline(s, L, 5.45, W, H.line);
T(s, "O restante da apresentação compara as duas fontes: o que os sócios **declaram** (argumento 1) e o que os contratos e os anexos **mostram** (argumentos 2 e 3).", { x: L, y: 5.6, w: W, h: 0.6, fontSize: 14, color: H.navy });

// ================= 4. Árvore do honorário =================
s = slide(1, "Para os sócios, o honorário é o volume do cliente multiplicado pelo custo de cada unidade, mais margem e impostos", "Árvore de cálculo do honorário mensal, com o cliente ABC do Anexo 2 como exemplo (R$)",
  "Entrevista ORGC7, p. 76 e 77; Anexos 1 e 2 (NIBO, 2018), p. 105 e 106",
  ["¹ Multiplicador observado em todos os 36 clientes do Anexo 2; ver o slide 13.   ² O anexo não nomeia a unidade; nota fiscal, lançamento e empregado é inferência a partir das p. 80 e 87."],
  "É assim que os sócios descrevem o cálculo, e o Anexo 1 dá os números. Lendo da direita para a esquerda: cada departamento tem um custo mensal, com salário, encargos de 76% e rateio dos custos fixos. Dividindo pelo volume do mês, sai um custo por unidade: 2,33 por unidade no fiscal, 1,56 no contábil, 31,22 por empregado no pessoal. O cliente ABC tem 10 unidades no fiscal, 20 no contábil e 1 empregado, o que dá um custo de 85,82. Multiplicado por 1,5791, que embute margem e impostos, chega ao honorário ideal de 135,52. Ele paga 180. A ORGC7 resume: volume de operações vezes custo hora por departamento.");
const colsX = [L, 3.35, 6.45, 9.75], colsW = [2.55, 2.7, 3.0, 3.13];
["Preço", "Custo do cliente", "Custo por departamento", "Custo unitário"].forEach((h, i) => T(s, h.toUpperCase(), { x: colsX[i], y: 1.78, w: colsW[i], h: 0.25, fontSize: 10, bold: true, color: H.gray, charSpacing: 1 }));
function node(x, y, w, h, titulo, valor, dest) {
  rect(s, x, y, w, h, dest ? H.navy : H.white, dest ? H.navy : H.grayMark, "no");
  T(s, titulo, { x: x + 0.12, y: y + 0.08, w: w - 0.24, h: 0.3, fontSize: 11, color: dest ? "C9D3E0" : H.gray });
  T(s, valor, { x: x + 0.12, y: y + 0.36, w: w - 0.24, h: h - 0.42, fontSize: 13, bold: true, color: dest ? H.white : H.ink });
}
const rowY = [2.15, 3.3, 4.45], nh = 0.92;
node(colsX[0], 3.3, colsW[0], nh, "Honorário ideal", "R$ 135,52\n(cobrado: R$ 180,00)", true);
node(colsX[1], 2.72, colsW[1], nh, "Custo do cliente", "R$ 85,82", false);
node(colsX[1], 4.45, colsW[1], nh, "Margem e impostos¹", "× 1,5791", false);
const dep = [["Fiscal: 10 unidades²", "10 × 2,33 = R$ 23,34", "R$ 7.649,16 ÷ volume", "R$ 2,33 por unidade"],
  ["Contábil: 20 unidades²", "20 × 1,56 = R$ 31,26", "R$ 8.377,65 ÷ volume", "R$ 1,56 por unidade"],
  ["Pessoal: 1 empregado²", "1 × 31,22 = R$ 31,22", "R$ 8.741,89 ÷ volume", "R$ 31,22 por empregado"]];
dep.forEach(([t1, v1, t2, v2], i) => {
  node(colsX[2], rowY[i], colsW[2], nh, t1, v1, false);
  node(colsX[3], rowY[i], colsW[3], nh, "Custo do depto. " + t2.replace(" ÷ volume", "") + " ÷ volume", v2, false);
  seg(s, colsX[2] + colsW[2], rowY[i] + nh / 2, colsX[3], rowY[i] + nh / 2, H.grayMark, 1);
  // custo do cliente -> departamentos
  seg(s, colsX[1] + colsW[1], 2.72 + nh / 2, colsX[2], rowY[i] + nh / 2, H.grayMark, 1);
});
seg(s, colsX[0] + colsW[0], 3.3 + nh / 2, colsX[1], 2.72 + nh / 2, H.navy, 1.25);
seg(s, colsX[0] + colsW[0], 3.3 + nh / 2, colsX[1], 4.45 + nh / 2, H.navy, 1.25);
T(s, [{ text: "“os honorários são calculados considerando o volume de operações dos clientes vezes o custo hora de cada colaborador por departamento”", options: { italic: true } }, { text: "   ORGC7, p. 76 e 77", options: { bold: true, color: H.gray, fontSize: 11 } }],
  { x: L, y: 5.65, w: W, h: 0.6, fontSize: 12.5, color: H.ink });

// ================= 5. Custo: mão de obra e sócio =================
s = slide(1, "O custo é quase todo mão de obra, e três quartos da hora do sócio não estão ligados a nenhum cliente", "Custo mensal do escritório-exemplo do Anexo 1 (R$) e uso das 160 horas mensais do sócio",
  "Anexo 1 (NIBO, 2018), p. 105; Apêndices 1 e 5 (adaptados de Vaz, 2014), p. 100 e 104; entrevista ORGC7, p. 79. Percentuais calculados pelo apresentador", null,
  "Se o preço parte do custo, vale olhar do que o custo é feito. A cascata mostra o escritório-exemplo do Anexo 1: 24.768 reais por mês. Em azul está a mão de obra: equipe dos departamentos, administrativo e o pró-labore do sócio. Juntos são 76% do custo, perto dos 80% que um sócio cita na entrevista. A barra de baixo é o tempo do sócio: só 40 das 160 horas vão para a rotina contábil; as outras 120 são gestão, consultoria e administração. Isso quer dizer que boa parte do custo não pertence a nenhum cliente, e a regra de rateio decide quanto cada cliente paga.");
const wf = [["Equipe dos\ndepartamentos", 11722.42, true], ["Adminis-\ntrativo", 1896.27, true], ["Pró-labore\ndo sócio", 5100.0, true], ["Demais custos\nfixos", 6050.0, false], ["Custo total", 24768.69, null]];
const wfX0 = L + 0.1, wfY0 = 4.75, wfH = 2.45, wfMax = 24768.69, bw = 1.25, bgap = 0.45;
let base = 0;
wf.forEach(([lab, v, mo], i) => {
  const x = wfX0 + i * (bw + bgap);
  const isTot = mo === null;
  const y0 = isTot ? 0 : base;
  const yTop = wfY0 - (y0 + v) / wfMax * wfH, hh = v / wfMax * wfH;
  rect(s, x, yTop, bw, hh, mo ? H.mark : isTot ? H.gray : H.grayMark, null, "wf" + i);
  T(s, brl(v, 0), { x: x - 0.1, y: yTop - 0.28, w: bw + 0.2, h: 0.25, fontSize: 11, bold: true, align: "center" });
  T(s, lab, { x: x - 0.15, y: wfY0 + 0.06, w: bw + 0.3, h: 0.45, fontSize: 10.5, color: H.gray, align: "center" });
  if (!isTot && i < wf.length - 2) seg(s, x + bw, yTop, x + bw + bgap, yTop, H.grayMark, 0.75, "dash");
  if (i === 3) seg(s, x + bw, wfY0 - wfMax / wfMax * wfH, x + bw + bgap, wfY0 - wfH, H.grayMark, 0.75, "dash");
  if (!isTot) base += v;
});
hline(s, wfX0 - 0.05, wfY0, 5 * bw + 4 * bgap + 0.1, "B8BFC6", 1);
T(s, [{ text: "■ ", options: { color: H.mark } }, { text: "mão de obra: R$ 18.718,69 (75,6%)     " }, { text: "■ ", options: { color: H.grayMark } }, { text: "demais custos fixos (aluguel, software, energia, treinamento e outros)" }], { x: L, y: 1.8, w: EX_W, h: 0.25, fontSize: 10.5, color: H.gray });
// barra de horas do sócio
T(s, "Horas mensais do sócio (160 h, R$ 32,50 por hora)", { x: L, y: 5.42, w: EX_W, h: 0.25, fontSize: 11, bold: true });
const hbW = 8.5, hbY = 5.72;
rect(s, L, hbY, hbW * 0.25, 0.42, H.mark, null, "h40");
rect(s, L + hbW * 0.25, hbY, hbW * 0.75, 0.42, H.grayMark, null, "h120");
T(s, "40 h rotina contábil", { x: L + 0.08, y: hbY, w: hbW * 0.25 - 0.1, h: 0.42, fontSize: 11, bold: true, color: H.white, valign: "middle" });
T(s, "120 h gestão, consultoria, atendimento e administração (R$ 3.900)", { x: L + hbW * 0.25 + 0.1, y: hbY, w: hbW * 0.75 - 0.2, h: 0.42, fontSize: 11, bold: true, color: H.ink, valign: "middle" });
leitura(s, [
  "**76%** do custo é mão de obra contando o sócio, ou 55% sem ele. A ORGC7 fala em 80% (p. 79).",
  "Os encargos somam **76,34%** sobre o salário: INSS, FGTS, 13º, férias, multa e vales (p. 105).",
  "**75%** da hora do sócio não é atribuível a um cliente específico.",
  "Com tanto custo comum, o critério de rateio define boa parte do preço de cada cliente.",
]);

// ================= 6. Matriz das entrevistas =================
s = slide(1, "Os sócios declaram o custo como base e o mercado como conferência, e nenhuma dessas afirmações é testada com dados", "O que os 11 sócios afirmam, por tema, com a evidência citada no texto",
  "Cruz Neto (2018), p. 22, 62, 75 a 80 e 87", null,
  "Esta matriz junta o que os sócios disseram, tema por tema, com a fala que sustenta cada ponto. A primeira linha é a resposta à pergunta da pesquisa: custo apurado mais margem. A segunda é o papel do mercado: conferência, e só um entrevistado usa o custo sozinho. Depois vêm os argumentos contra o mercado: o concorrente online de 80 reais, a visão de 24 meses de quem usa custo, os clientes que saem por preço e voltam pela qualidade. A última coluna é a que importa para a próxima parte: nenhuma dessas afirmações é testada com dado de resultado. O próprio autor registra que mede desempenho percebido.");
const q = (t) => ({ text: [{ text: t, options: { italic: true } }] });
tabela(s, [
  ["Tema", "O que os sócios afirmam", "Evidência no texto", "Quem, página", "Testado com dados"],
  ["Método de preço", "**Custo apurado** (principalmente mão de obra) **mais margem**, ajustado pelo volume do cliente", q("“utiliza software de controle de atividades que mostra o custo de cada cliente ao qual é acrescida sua margem de lucro”"), "ORGC1, p. 76", ""],
  ["Papel do mercado", "Usado como conferência; só um entrevistado usa o custo isoladamente", q("“apesar de eu não utilizar a precificação pelo valor de mercado sempre estou olhando o mercado”"), "ORGC1, p. 80; p. 22", ""],
  ["Preço justo", "Clientes não reconhecem o honorário como justo; concorrência online barata", q("“como você consegue vender uma contabilidade a distância [...] a R$ 80,00”"), "ORGC3, p. 76", ""],
  ["Previsibilidade", "Quem usa o custo enxerga o médio prazo; pelo mercado o preço é temerário", q("“quem precifica pelo custo tem mais controle consegue enxergar o cenário para 06, 12 ou 24 meses”"), "ORGC2, p. 80", ""],
  ["Qualidade", "Clientes que saem por preço voltam pela qualidade", q("“foram quatro clientes que saíram e voltaram não pelo preço, mas pela qualidade dos serviços prestados”"), "ORGC1, p. 75", ""],
  ["Gestão de custo", "Timesheet e planilhas, sem sistema gerencial de custeio", q("“fazemos a gestão de custo dos clientes”"), "ORGC2, p. 77", ""],
], [1.75, 3.35, 4.85, 1.38, 1.1], { y: 1.8, rowH: [0.4, 0.62, 0.62, 0.58, 0.62, 0.62, 0.5], highlightRow: 1, fontSize: 11 });
{ let yy = 1.8 + 0.4; [0.62, 0.62, 0.58, 0.62, 0.62, 0.5].forEach(rh => {
  const y = yy + (rh - 0.2) / 2;
  marcador(s, 11.85, y, 0);
  T(s, "Não", { x: 12.12, y, w: 0.6, h: 0.2, fontSize: 11, color: H.gray, valign: "middle" });
  yy += rh;
}); }
T(s, "O autor registra que o estudo mede “desempenho percebido e não o desempenho medido/objetivo” (p. 62). As afirmações da matriz são hipóteses sobre resultado, e a parte 3 usa os dados do próprio trabalho para olhar uma delas.", { x: L, y: 6.08, w: W, h: 0.5, fontSize: 12, color: H.navy });

// ================= 7. Contratos =================
s = slide(2, "Os contratos contam outra história: 4 em cada 10 atrelam o honorário ao salário mínimo", "109 contratos de prestação de serviços contábeis, Estado de São Paulo, 2004 a 2017",
  "Cruz Neto (2018), p. 21, 70, 80, 87 e 88", ["¹ Intervalo de Wilson calculado pelo apresentador sobre 43/109. A amostra não é probabilística (p. 70), então mesmo esse intervalo é otimista."],
  "Agora a segunda fonte. Dos 109 contratos, 43 vinculam o honorário ao salário mínimo regional, usando número de empregados, notas e lançamentos do cliente. São 39%. O autor classifica isso como precificação pelo mercado, e lembra que a vinculação é vedada pela Constituição e nem é tecnicamente um método. A régua embaixo mostra a incerteza: se a amostra fosse aleatória, a proporção real poderia estar entre 31% e 49%. E o texto não diz de onde vêm os contratos nem o que fazem os outros 66. Mesmo com essas ressalvas, o que se assina não bate com o que se declara.");
const cols = 11, sq = 0.25, gp = 0.055;
for (let i = 0; i < 109; i++) {
  const r = Math.floor(i / cols), c = i % cols;
  s.addShape(pres.shapes.RECTANGLE, { x: L + c * (sq + gp), y: 1.85 + r * (sq + gp), w: sq, h: sq, fill: { color: i < 43 ? H.loss : "DDE2E6" }, line: { color: i < 43 ? H.loss : "DDE2E6" }, objectName: "c" + (i + 1) });
}
const wx = L + cols * (sq + gp) + 0.35;
T(s, [{ text: "43 contratos (39,4%)", options: { bold: true, color: H.loss, fontSize: 15, breakLine: true } }, { text: "vinculam o honorário ao salário mínimo regional. Base de cálculo: empregados, notas fiscais por mês e lançamentos contábeis do cliente (p. 80)." }], { x: wx, y: 1.85, w: 4.45, h: 1.3, fontSize: 12 });
T(s, [{ text: "66 contratos", options: { bold: true, color: H.gray, fontSize: 15, breakLine: true } }, { text: "método não informado no texto." }], { x: wx, y: 3.4, w: 4.45, h: 0.8, fontSize: 12 });
// régua do intervalo
const rx0 = L + 0.2, rW = 8.2, ry = 5.75, rp = v => rx0 + rW * v / 100;
T(s, "Intervalo de confiança de 95% para a proporção¹", { x: L, y: 5.12, w: EX_W, h: 0.25, fontSize: 11, bold: true });
hline(s, rx0, ry, rW, "B8BFC6", 1.25);
[0, 25, 50, 75, 100].forEach(v => { seg(s, rp(v), ry - 0.06, rp(v), ry + 0.06, "B8BFC6", 1); T(s, v + "%", { x: rp(v) - 0.35, y: ry + 0.12, w: 0.7, h: 0.22, fontSize: 10, color: H.gray, align: "center" }); });
s.addShape(pres.shapes.RECTANGLE, { x: rp(30.8), y: ry - 0.13, w: rp(48.8) - rp(30.8), h: 0.26, fill: { color: H.loss, transparency: 75 }, line: { color: H.loss, width: 0.75 }, objectName: "ic" });
s.addShape(pres.shapes.OVAL, { x: rp(39.4) - 0.09, y: ry - 0.09, w: 0.18, h: 0.18, fill: { color: H.loss }, line: { color: H.white, width: 1 }, objectName: "p" });
T(s, "30,8%", { x: rp(30.8) - 0.75, y: ry - 0.42, w: 0.7, h: 0.22, fontSize: 10, color: H.gray, align: "right" });
T(s, "39,4%", { x: rp(39.4) - 0.35, y: ry - 0.42, w: 0.7, h: 0.22, fontSize: 10.5, bold: true, color: H.loss, align: "center" });
T(s, "48,8%", { x: rp(48.8) + 0.05, y: ry - 0.42, w: 0.7, h: 0.22, fontSize: 10, color: H.gray });
leitura(s, [
  "Nas entrevistas, o custo é a base. Nos contratos, **4 em cada 10** seguem o salário mínimo, que o autor classifica como mercado (p. 80 e 88).",
  "A vinculação é vedada pelo art. 7º, IV, da Constituição e “não se caracteriza tecnicamente como um método de precificação” (p. 21).",
  "O texto não diz de onde vêm os contratos, como foram escolhidos, nem o que fazem os outros 66.",
]);

// ================= 8. Lacuna de custeio =================
s = slide(2, "Sem sistema de custeio, o custo por cliente que sustentaria o preço pelo custo não existe", "O que o preço pelo custo exige e o que os escritórios entrevistados relatam ter",
  "Cruz Neto (2018), p. 76, 77, 79 e 87", null,
  "Para precificar de fato pelo custo, o escritório precisa de uma cadeia de informação: custo total, custo por departamento, custo por cliente e, idealmente, quanto cada colaborador custa para cada cliente. A tabela mostra até onde os escritórios chegam. Custo total, todos têm. Por departamento, só parte. Por cliente, alguns têm software de atividades, mas o autor não encontrou sistema completo. Por colaborador e cliente, e sistema de custeio gerencial, ninguém. E o autor conclui que não há indicador de desempenho. A frase da ORGC2 resume a ironia: o escritório faz a gestão de custo dos clientes e não a sua.");
const gapRows = [
  ["Custo total do escritório", 2, "Tem", "Mensuração do custo total; planilhas e softwares próprios", "“O que temos é a mensuração de todo custo do escritório” (ORGC6, p. 79)"],
  ["Custo por departamento", 1, "Parcial", "Custo hora por departamento em parte dos escritórios", "“Um controle específico por setor não temos” (ORGC6, p. 79)"],
  ["Custo por cliente", 1, "Parcial", "Software de atividades em alguns escritórios (ORGC1); o autor não observou sistema completo (p. 76)", "Software “mostra o custo de cada cliente” (ORGC1, p. 76)"],
  ["Custo de cada colaborador por cliente", 0, "Não tem", "Não medido", "“o que não tem é quanto custa cada colaborador para o cliente” (ORGC2, p. 79)"],
  ["Sistema de custeio (absorção, variável, ABC)", 0, "Não tem", "Nenhum escritório usa, por custo-benefício (p. 79)", "Sistema próprio de 1990 baseado em timesheet (ORGC7, p. 79)"],
  ["Indicador de desempenho", 0, "Não tem", "Timesheet e pesquisas de satisfação", "“não há a utilização de qualquer indicador de desempenho” (p. 87)"],
];
tabela(s, [["Para precificar pelo custo é preciso", "Situação", "O que os escritórios têm", "Evidência"], ...gapRows.map(r => [r[0], "      " + r[2], r[3], r[4]])],
  [3.0, 1.35, 3.9, 4.18], { y: 1.8, rowH: [0.4, 0.55, 0.55, 0.68, 0.55, 0.62, 0.55], fontSize: 11.5, noBoldFirst: false });
let gy = 1.8 + 0.4;
[0.55, 0.55, 0.68, 0.55, 0.62, 0.55].forEach((rh, i) => { marcador(s, 3.0 + L + 0.1, gy + (rh - 0.2) / 2, gapRows[i][1]); gy += rh; });
rect(s, L, 5.85, W, 0.62, H.fill, H.fill, "faixa");
T(s, [{ text: "“por incrível que pareça o escritório de contabilidade não tem gestão de custo e fazemos a gestão de custo dos clientes”", options: { italic: true } }, { text: "   ORGC2, p. 77", options: { bold: true, color: H.gray, fontSize: 11 } }], { x: L + 0.2, y: 5.85, w: W - 0.4, h: 0.62, fontSize: 12.5, valign: "middle" });

// ================= 9. Inconsistências =================
s = slide(2, "O texto não reconcilia o que os sócios declaram com o que os contratos e os números mostram", "Pontos de leitura crítica, ordenados pelo peso na conclusão",
  "Cruz Neto (2018), páginas indicadas na tabela; leitura do apresentador", ["O autor reconhece que a pesquisa “não tem o condão de esgotar o assunto” (p. 88); os pontos da tabela tratam do desenho, sem diminuir o caráter exploratório do estudo."],
  "Antes de ir aos números, a leitura crítica, com o respeito que um trabalho exploratório merece. Os três primeiros pontos pesam na conclusão. Um: o que se declara e o que se assina divergem. Dois: a pergunta é o método mais utilizado e a conclusão fala no melhor método; entrevistas medem preferência declarada. Três: o método prometia medir desempenho com margem, EBIT, ROE e ROI, e a conclusão diz que não há indicador. Os outros são de peso médio ou baixo: o consenso descrito de dois jeitos, a origem dos contratos, a teoria da contingência que não volta na análise e o peso da mão de obra.");
const inc = [
  ["Declarado e praticado", "Os sócios precificam pelo custo (p. 87)", "43 de 109 contratos usam o salário mínimo, classificado pelo autor como mercado (p. 80)", 2, "Alto"],
  ["Pergunta e conclusão", "Pergunta pelo método “mais utilizado” (p. 19)", "Conclui pelo “melhor método” (p. 87); entrevistas medem preferência declarada", 2, "Alto"],
  ["Desempenho", "Seria medido por margem bruta, EBIT, ROE e ROI (p. 69)", "“não há a utilização de qualquer indicador de desempenho” (p. 87)", 2, "Alto"],
  ["Consenso", "“por unanimidade” o custo é o melhor método (p. 87)", "“apenas um” usa o custo isoladamente (p. 22)", 1, "Médio"],
  ["Origem dos contratos", "109 contratos de diversas regiões de SP (p. 80)", "Sem origem, critério de seleção ou o método dos outros 66", 1, "Médio"],
  ["Base teórica", "Teoria da contingência como base (p. 26)", "Porte e diversificação não são ligados ao método escolhido (p. 72 a 75)", 1, "Médio"],
  ["Peso da mão de obra", "80% do custo (ORGC7, p. 79)", "Anexo 1: 55%, ou 76% com o pró-labore (p. 105)", 0, "Baixo"],
];
tabela(s, [["Ponto", "O texto afirma", "O texto também mostra", "Peso"], ...inc.map(r => [r[0], r[1], r[2], "      " + r[4]])], [2.35, 4.2, 4.6, 1.28], { y: 1.8, rowH: [0.4, 0.6, 0.6, 0.6, 0.55, 0.55, 0.6, 0.55], fontSize: 11.5 });
gy = 1.8 + 0.4;
[0.6, 0.6, 0.6, 0.55, 0.55, 0.6, 0.55].forEach((rh, i) => { marcador(s, L + 2.35 + 4.2 + 4.6 + 0.1, gy + (rh - 0.2) / 2, inc[i][3]); gy += rh; });

// ================= 10. Dispersão =================
s = slide(3, "No Anexo 2, o preço cobrado de 36 clientes se afasta do preço que o próprio custo indica", "Custo e honorário cobrado por cliente, R$ por mês (Anexo 2, NIBO, 2018)",
  "Anexo 2 (NIBO, 2018), p. 106; classificação e gráfico do apresentador", null,
  "Agora a parte 3. O Anexo 2 traz 36 clientes reais, com custo, honorário ideal e honorário cobrado, e o texto da dissertação não comenta esse anexo. No gráfico, cada ponto é um cliente: custo no eixo horizontal, preço cobrado no vertical. A linha cinza tracejada é preço igual ao custo; a azul é o preço ideal, custo vezes 1,5791. Se o escritório cobrasse pelo custo, os pontos estariam em cima da linha azul. Eles se espalham. Os 8 pontos laranja estão abaixo do custo; o pior é o JS, que custa 2.043 e paga 1.500. Outros 17 pagam mais que o custo, mas menos que o ideal. Só 11 ficam acima do ideal, como o FIL, que paga 4.000.");
const XMAX = 2100, YMAX = 4000;
const cx = L, cy = 1.8, cw = EX_W, ch = 4.75, lay = { x: 0.1, y: 0.04, w: 0.86, h: 0.8 };
const sorted = [...rows].sort((a, b) => a.custo - b.custo);
s.addChart(pres.charts.SCATTER, [
  { name: "Custo", values: sorted.map(r => r.custo) },
  { name: "Acima do custo", values: sorted.map(r => r.lucro >= 0 ? r.cobrado : null) },
  { name: "Abaixo do custo", values: sorted.map(r => r.lucro < 0 ? r.cobrado : null) },
], Object.assign({}, CHART, { x: cx, y: cy, w: cw, h: ch, layout: lay, lineSize: 0, lineDataSymbol: "circle", lineDataSymbolSize: 8, chartColors: [H.gray, H.loss],
  valAxisMinVal: 0, valAxisMaxVal: YMAX, valAxisMajorUnit: 1000, catAxisMinVal: 0, catAxisMaxVal: XMAX, catAxisMajorUnit: 500,
  valAxisLabelFormatCode: "#,##0", catAxisLabelFormatCode: "#,##0", catGridLine: { style: "none" },
  showValAxisTitle: true, valAxisTitle: "Honorário cobrado (R$)", valAxisTitleFontSize: 11, valAxisTitleColor: H.gray, valAxisTitleFontFace: "Arial",
  showCatAxisTitle: true, catAxisTitle: "Custo do cliente (R$)", catAxisTitleFontSize: 11, catAxisTitleColor: H.gray, catAxisTitleFontFace: "Arial" }));
const px0 = cx + lay.x * cw, pw = lay.w * cw, py0 = cy + lay.y * ch, ph = lay.h * ch;
const PX = v => px0 + pw * v / XMAX, PY = v => py0 + ph - ph * v / YMAX;
seg(s, PX(0), PY(0), PX(XMAX), PY(XMAX), H.gray, 1, "dash");
seg(s, PX(0), PY(0), PX(XMAX), PY(XMAX * 1.5791), H.mark, 1.75);
T(s, "preço ideal = custo × 1,5791", { x: PX(700), y: PY(2500), w: 2.4, h: 0.25, fontSize: 10.5, bold: true, color: H.mark });
T(s, "preço = custo", { x: PX(1850), y: PY(1850) + 0.05, w: 1.2, h: 0.25, fontSize: 10.5, bold: true, color: H.gray });
const fil = rows.find(r => r.emp === "FIL"), js = rows.find(r => r.emp === "JS");
T(s, "FIL: custo 1.511, paga 4.000", { x: PX(fil.custo) - 2.75, y: PY(fil.cobrado) - 0.12, w: 2.6, h: 0.25, fontSize: 10.5, color: H.ink, align: "right" });
T(s, "JS: custo 2.043, paga 1.500", { x: PX(js.custo) - 2.55, y: PY(js.cobrado) + 0.05, w: 2.4, h: 0.25, fontSize: 10.5, color: H.loss, bold: true, align: "right" });
leitura(s, [
  "**8** clientes pagam menos do que custam (pontos laranja, abaixo da linha cinza).",
  "**17** pagam mais que o custo, mas menos que o preço ideal.",
  "**11** pagam acima do ideal; FIL sozinho rende R$ 2.488,92 de lucro.",
  "Se o preço seguisse o custo, os pontos estariam sobre a linha azul. O texto da dissertação não comenta este anexo.",
]);

// ================= 11. Curva da baleia =================
s = slide(3, "19 dos 36 clientes geram todo o lucro, e os 8 abaixo do custo consomem 13% dele", "Lucro acumulado em % do resultado total de R$ 9.201,31, clientes ordenados do mais ao menos lucrativo",
  "Anexo 2 (NIBO, 2018), p. 106; lucro = honorário cobrado menos custo total, curva calculada pelo apresentador", null,
  "Ordenando os clientes do mais para o menos lucrativo e acumulando o lucro, aparece a curva da baleia. Com 19 clientes já se chega a 100% do resultado. A curva continua subindo até 112,9% no 28º cliente e depois cai, porque os 8 últimos custam mais do que pagam e devolvem 1.189 reais, quase 13% do lucro. Embaixo estão os nomes: o FIL sozinho é 27% do resultado; o JS sozinho tira 543 reais. É exatamente isso que o custeio ABC revela, e o autor cita um estudo mostrando que o ABC é viável em escritório contábil.");
const lc = { x: L, y: 1.8, w: EX_W, h: 3.3 }, lLay = { x: 0.08, y: 0.06, w: 0.9, h: 0.76 };
s.addChart(pres.charts.LINE, [{ name: "Lucro acumulado", labels: byProfit.map((_, i) => (i === 0 || (i + 1) % 5 === 0 || i === 35) ? String(i + 1) : ""), values: cum }],
  Object.assign({}, CHART, lc, { layout: lLay, chartColors: [H.mark], lineSize: 2.25, lineDataSymbol: "none", valAxisMinVal: 0, valAxisMaxVal: 120, valAxisMajorUnit: 20, valAxisLabelFormatCode: "0\"%\"" }));
const lx0 = lc.x + lLay.x * lc.w, lw = lLay.w * lc.w, ly0 = lc.y + lLay.y * lc.h, lh = lLay.h * lc.h;
const LY = v => ly0 + lh - lh * v / 120, LX = i => lx0 + lw * (i + 0.5) / 36;
seg(s, lx0, LY(100), lx0 + lw, LY(100), H.navy, 1, "dash");
T(s, "100% do lucro no 19º cliente", { x: LX(18) + 0.1, y: LY(100) + 0.1, w: 2.5, h: 0.24, fontSize: 10.5, bold: true, color: H.navy });
T(s, "pico de 112,9% no 28º cliente; os 8 últimos devolvem 12,9%", { x: LX(27) - 2.9, y: ly0 - 0.24, w: 5.0, h: 0.22, fontSize: 10.5, bold: true, color: H.loss, align: "center" });
const top5 = byProfit.slice(0, 5), bot8 = byProfit.slice(-8).reverse();
const mini = (y, rotulo, lst, color) => {
  T(s, rotulo, { x: L, y, w: 1.75, h: 0.55, fontSize: 10.5, bold: true, color, valign: "middle" });
  lst.forEach((r, i) => {
    const x = L + 1.8 + i * 0.88;
    T(s, [{ text: r.emp, options: { bold: true, breakLine: true } }, { text: brl(r.lucro, 0), options: { color } }], { x, y, w: 0.86, h: 0.55, fontSize: 10.5, align: "center", valign: "middle" });
  });
};
hline(s, L, 5.2, EX_W, H.line);
mini(5.27, "5 mais lucrativos (R$)", top5, H.mark);
hline(s, L, 5.87, EX_W, H.line);
mini(5.94, "8 abaixo do custo (R$)", bot8, H.loss);
leitura(s, [
  "**19** de 36 clientes já somam 100% do lucro.",
  "FIL sozinho gera **27%** do resultado (R$ 2.488,92).",
  "Os 8 clientes abaixo do custo devolvem **R$ 1.189** (12,9%); JS sozinho, R$ 543.",
  "É a curva que o custeio ABC busca revelar; Eckert (2013), citado na p. 79, mostra que o ABC é viável em escritórios contábeis.",
]);

// ================= 12. Ideal x cobrado =================
s = slide(3, "Mesmo com o custo calculado, 25 clientes pagam abaixo do preço ideal, 13% da receita potencial", "Honorário cobrado menos honorário ideal, R$ por mês, por cliente (36 clientes, ordenados)",
  "Anexo 2 (NIBO, 2018), p. 106; diferenças calculadas pelo apresentador", null,
  "Segundo olhar sobre o mesmo anexo: a diferença entre o que cada cliente paga e o preço ideal que o custo indica. 25 dos 36 pagam abaixo do ideal. Somando, a carteira cobra 33.970 quando o ideal seria 39.111, 13% abaixo. Cuidado com a palavra déficit no anexo: quer dizer cobrar abaixo do ideal; prejuízo só existe nos 8 do slide anterior. O ponto é que, mesmo num escritório que conhece o custo de cada cliente, o preço praticado segue outra âncora, que é o que os contratos já sugeriam.");
const bc = { x: L, y: 1.8, w: EX_W, h: 4.75 }, bLay = { x: 0.09, y: 0.05, w: 0.89, h: 0.88 };
s.addChart(pres.charts.BAR, [{ name: "Cobrado menos ideal", labels: byGap.map(r => r.emp), values: byGap.map(r => r.gap) }],
  Object.assign({}, CHART, bc, { layout: bLay, barDir: "col", chartColors: [H.gray], invertedColors: [H.loss], barGapWidthPct: 35, catAxisHidden: true,
    valAxisMinVal: -2000, valAxisMaxVal: 2000, valAxisMajorUnit: 500, valAxisLabelFormatCode: "#,##0" }));
const bx0 = bc.x + bLay.x * bc.w, bw2 = bLay.w * bc.w, by0 = bc.y + bLay.y * bc.h, bh = bLay.h * bc.h;
const BX = i => bx0 + bw2 * (i + 0.5) / 36, BY = v => by0 + bh / 2 - (bh / 2) * v / 2000;
const lab = (emp, dy, color, align) => {
  const i = byGap.findIndex(r => r.emp === emp), v = byGap[i].gap;
  T(s, emp + " " + (v > 0 ? "+" : "−") + brl(Math.abs(v), 0), { x: BX(i) + (align === "left" ? 0.15 : -2.15), y: BY(v) + dy, w: 2.0, h: 0.24, fontSize: 10.5, bold: true, color, align });
};
lab("FIL", -0.05, H.ink, "left");
lab("VVV", -0.12, H.loss, "right");
lab("JS", -0.12, H.loss, "right");
T(s, "11 acima do ideal", { x: BX(2), y: BY(750), w: 2.0, h: 0.24, fontSize: 10.5, color: H.gray });
T(s, "25 abaixo do ideal", { x: BX(12), y: BY(-650), w: 2.0, h: 0.24, fontSize: 10.5, color: H.loss });
leitura(s, [
  "**25** de 36 clientes pagam abaixo do honorário ideal.",
  "A carteira cobra R$ 33.970 contra um ideal de R$ 39.111: **13,1%** abaixo.",
  "No anexo, “déficit” significa cobrar abaixo do ideal; prejuízo de fato só ocorre nos 8 clientes abaixo do custo.",
  "Mesmo com o custo de cada cliente calculado, o preço praticado segue outra âncora, como nos contratos.",
]);

// ================= 13. Markup sequencial =================
s = slide(3, "Aplicar margem e impostos em sequência reduz a margem efetiva de 30% para 27%", "Formação do preço a partir de R$ 100 de custo, pelos dois métodos (R$)",
  "Anexo 2 (NIBO, 2018), p. 106; Bruni e Famá", ["¹ O anexo não mostra a fórmula; a equivalência entre 1,5791 e a aplicação em sequência é inferência do apresentador."],
  "Último achado, que conversa com a parte da Luisa. Em todos os 36 clientes, o honorário ideal é o custo vezes 1,5791. Esse número sai de aplicar a margem de 30% e os impostos de 9,53% um depois do outro. O markup que Bruni e Famá ensinam coloca os dois juntos no denominador e dá 1,6537. Partindo de 100 reais de custo, o método sequencial chega a 157,91 e deixa 42,86 de margem, 27,1% do preço. O markup único chega a 165,37 e deixa 49,61, os 30% pretendidos. Na carteira do anexo, a diferença é de cerca de 1.849 reais por mês de honorário ideal.");
function ponte(x0, titulo, preco, dest) {
  const imp = preco * 0.0953, mg = preco - 100 - imp;
  const sc = 3.2 / 170, yb = 5.75, bw3 = 0.85, gp3 = 0.28;
  T(s, titulo, { x: x0, y: 1.82, w: 4.3, h: 0.5, fontSize: 12, bold: true, color: H.navy });
  const parts = [["Custo", 100, 0, H.grayMark], ["Impostos\n9,53%", imp, 100, H.grayMark], ["Margem", mg, 100 + imp, dest ? H.mark : H.gray], ["Preço", preco, 0, H.navy]];
  parts.forEach(([l, v, b, c], i) => {
    const x = x0 + i * (bw3 + gp3), yt = yb - (b + v) * sc;
    rect(s, x, yt, bw3, v * sc, c, null, "pt" + i);
    T(s, brl(v), { x: x - 0.15, y: yt - 0.26, w: bw3 + 0.3, h: 0.24, fontSize: 11, bold: true, align: "center" });
    T(s, l, { x: x - 0.15, y: yb + 0.05, w: bw3 + 0.3, h: 0.42, fontSize: 10.5, color: H.gray, align: "center" });
  });
  hline(s, x0 - 0.05, yb, 4 * bw3 + 3 * gp3 + 0.1, "B8BFC6", 1);
  T(s, "Margem efetiva: " + brl(mg / preco * 100, 1) + "% do preço", { x: x0, y: 6.22, w: 4.3, h: 0.25, fontSize: 11.5, bold: true, color: dest ? H.mark : H.ink });
}
ponte(L, "Sequencial (Anexo 2): custo ÷ [(1 − 0,30) × (1 − 0,0953)] = custo × 1,5791¹", 100 * 1.5791, true);
ponte(L + 4.65, "Markup único (Bruni e Famá): custo ÷ (1 − 0,30 − 0,0953) = custo × 1,6537", 100 / (1 - 0.3953), false);
leitura(s, [
  "Em todos os 36 clientes do Anexo 2, honorário ideal = custo × **1,5791**.",
  "1,5791 resulta de aplicar a margem e depois os impostos¹; a margem de 30% passa a incidir sobre o preço líquido de impostos.",
  "O markup único divide o custo por (1 − margem − impostos) e entrega os **30%**.",
  "Na carteira do anexo, a diferença é de **R$ 1.849** de honorário ideal por mês.",
]);

// ================= 14. Conclusão =================
s = slide(null, "Precificar pelo custo exige custo por cliente; sem ele, o mercado decide o preço", "Implicações", "Cruz Neto (2018), p. 79 e 88; Anexo 2 (p. 106); Bruni e Famá", null,
  "Três implicações. Para os escritórios: calcular o custo por cliente antes de discutir preço, porque a mesma carteira mistura quem sustenta o resultado e quem o consome, e o ABC é viável nesse setor. Para a teoria que vimos hoje: o markup parte do custo do serviço, e num escritório o objeto de custo certo é o cliente; aplicado a uma média, ele não protege ninguém. Para a pesquisa: o teste que o próprio autor propôs, comparar resultado de quem precifica por custo e por mercado, pode começar com dados no formato do Anexo 2. Obrigado.");
const imp = [
  ["Para os escritórios", "Calcular o custo por cliente antes de discutir preço", "O Anexo 2 mostra uma carteira em que 19 clientes sustentam o resultado e 8 o consomem. O ABC é viável em escritórios contábeis (Eckert, 2013, citado na p. 79)."],
  ["Para a teoria de formação de preços", "O custo como base exige o objeto de custo certo", "O markup de Bruni e Famá parte do custo do serviço. Num escritório contábil o serviço é prestado por cliente; aplicado a um custo médio, o markup não protege a margem de cada um."],
  ["Para a pesquisa", "O teste que o autor propôs pode começar pelo Anexo 2", "A p. 88 sugere comparar o resultado de quem precifica pelo custo com o de quem precifica pelo mercado. O Anexo 2 já traz o formato de dado necessário: custo, preço ideal e preço cobrado por cliente."],
];
imp.forEach(([k, h, b], i) => {
  const x = L + i * 4.2, w = 3.95;
  hline(s, x, 1.85, w, H.navy, 1.5);
  T(s, k.toUpperCase(), { x, y: 1.97, w, h: 0.25, fontSize: 10, bold: true, color: H.gray, charSpacing: 1 });
  T(s, h, { x, y: 2.3, w, h: 0.8, fontSize: 16, bold: true, color: H.navy });
  T(s, b, { x, y: 3.2, w, h: 2.0, fontSize: 13 });
});
rect(s, L, 5.0, W, 0.95, H.navy, null, "mensagem");
T(s, "Escritórios contábeis afirmam precificar pelo custo, mas sem custo por cliente o preço acaba ancorado no mercado, e a própria dissertação traz os dados que mostram o efeito disso.", { x: L + 0.25, y: 5.0, w: W - 0.5, h: 0.95, fontSize: 14, bold: true, color: H.white, valign: "middle" });

// ================= 15. Referências =================
s = slide(null, "Referências", null, null, null, "Slide de referências, só para consulta.");
T(s, [
  { text: "CRUZ NETO, B. P. Métodos de precificação de serviços: uma abordagem comparativa entre os métodos de precificação de serviços contábeis pelo custo e valor de mercado. Dissertação (Mestrado Profissional em Controladoria e Finanças Empresariais), Universidade Presbiteriana Mackenzie, São Paulo, 2018.", options: { breakLine: true, paraSpaceAfter: 10 } },
  { text: "BRUNI, A. L.; FAMÁ, R. Gestão de custos e formação de preços. São Paulo: Atlas.", options: { breakLine: true, paraSpaceAfter: 10 } },
  { text: "Fontes secundárias citadas pela dissertação e usadas nos slides: SESCAPLDR (2016), Duarte (2012), Souza (2009), Vaz (2014), Farber et al. (2014), Eckert (2013), NIBO (2018, Anexos 1 e 2)." },
], { x: L, y: 1.6, w: W, h: 4.5, fontSize: 13 });

(async () => {
  const out = path.join(__dirname, "apresentacao_v2.pptx");
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  console.log("ok", out);
})();
