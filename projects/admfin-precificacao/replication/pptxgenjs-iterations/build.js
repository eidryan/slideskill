// Gera apresentacao.pptx (Adm Fin, Exemplo de aplicação, Cruz Neto 2018).
// Números: leitura/dissertacao_condensada.md e leitura/anexo2.csv.
const path = require("path");
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const SKILL = "C:/Users/adria/.claude/skills/synced/08880bea-5393-40ac-b324-ec6a48439c82_8a8b6610-ca77-4d15-b215-dc9e5dbc2267/pptx";
const { applyTheme } = require(SKILL + "/scripts/apply_theme.js");

const THEME = {
  name: "Precificacao Contabil",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1B2631", lt1: "FFFFFF", dk2: "123B3A", lt2: "EEF3F2",
    accent1: "00897B", accent2: "C2410C", accent3: "5F6B76", accent4: "B9D3CF",
    accent5: "1B2631", accent6: "D9A21B", hlink: "00897B", folHlink: "5F6B76",
  },
};
const HEX = THEME.colors;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = "Precificação de serviços contábeis: Cruz Neto (2018)";
pres.author = "Adrian Villela";
const C = pres.SchemeColor;

// ---------- layouts ----------
pres.defineSlideMaster({
  title: "CAPA",
  background: { color: C.text2 },
  objects: [
    { placeholder: { options: { name: "tag", type: "body", x: 0.8, y: 1.5, w: 11.5, h: 0.5, fontSize: 14, bold: true, color: C.accent4, charSpacing: 2 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 2.1, w: 11.7, h: 2.0, fontFace: "Cambria", fontSize: 40, bold: true, color: C.background1, valign: "top", align: "left" }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 4.3, w: 11.7, h: 1.2, fontSize: 18, color: C.accent4, valign: "top" }, text: "" } },
    { placeholder: { options: { name: "meta", type: "body", x: 0.8, y: 6.1, w: 11.7, h: 0.6, fontSize: 14, color: C.background1 }, text: "" } },
  ],
});
pres.defineSlideMaster({
  title: "CONTEUDO",
  background: { color: C.background1 },
  margin: [0.4, 0.6, 0.6, 0.6],
  slideNumber: { x: 12.25, y: 6.95, w: 0.5, h: 0.3, fontSize: 10, color: C.accent3, align: "right" },
  objects: [
    { placeholder: { options: { name: "tag", type: "body", x: 0.6, y: 0.3, w: 9, h: 0.35, fontSize: 12, bold: true, color: C.accent1, charSpacing: 2, margin: 0 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.65, w: 12.1, h: 1.15, fontFace: "Cambria", fontSize: 26, bold: true, color: C.text1, valign: "top", align: "left", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "src", type: "body", x: 0.6, y: 6.95, w: 11.2, h: 0.3, fontSize: 10, color: C.accent3, margin: 0 }, text: "" } },
  ],
});

// ---------- helpers ----------
function content(section, tag, title, src, notes) {
  const s = pres.addSlide({ masterName: "CONTEUDO", sectionTitle: section });
  s.addText(tag.toUpperCase(), { placeholder: "tag" });
  s.addText(title, { placeholder: "title" });
  if (src) s.addText("Fonte: " + src, { placeholder: "src" });
  if (notes) s.addNotes(notes);
  return s;
}
function box(s, x, y, w, h, fill, name) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { color: fill }, rectRadius: 0.08, objectName: name });
}
function text(s, t, o) {
  s.addText(t, Object.assign({ isTextBox: true, fontSize: 16, color: C.text1, valign: "top", margin: 0 }, o));
}
function circleNum(s, x, y, n, fill) {
  s.addShape(pres.shapes.OVAL, { x, y, w: 0.5, h: 0.5, fill: { color: fill || C.accent1 }, line: { color: fill || C.accent1 }, objectName: "num" + n });
  s.addText(String(n), { isTextBox: true, x, y, w: 0.5, h: 0.5, fontSize: 16, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0 });
}
function card(s, x, y, w, h, head, body, opts = {}) {
  box(s, x, y, w, h, opts.fill || C.background2, "card-" + head.slice(0, 12));
  text(s, head, { x: x + 0.25, y: y + 0.2, w: w - 0.5, h: 0.5, fontSize: opts.headSize || 18, bold: true, color: opts.headColor || C.text2 });
  text(s, body, { x: x + 0.25, y: y + 0.75, w: w - 0.5, h: h - 0.95, fontSize: opts.bodySize || 15 });
}
function quote(s, x, y, w, h, q, who, opts = {}) {
  box(s, x, y, w, h, opts.fill || C.background2, "quote");
  text(s, "“", { x: x + 0.2, y: y + 0.05, w: 0.6, h: 0.7, fontSize: 44, bold: true, color: C.accent1, fontFace: "Cambria" });
  text(s, q, { x: x + 0.3, y: y + 0.65, w: w - 0.6, h: h - 1.2, fontSize: opts.size || 16, italic: true });
  text(s, who, { x: x + 0.3, y: y + h - 0.5, w: w - 0.6, h: 0.35, fontSize: 13, bold: true, color: C.accent3 });
}
function stat(s, x, y, w, big, label, color) {
  text(s, big, { x, y, w, h: 1.0, fontSize: 54, bold: true, color: color || C.accent1, fontFace: "Cambria" });
  text(s, label, { x, y: y + 1.05, w, h: 0.9, fontSize: 15, color: C.accent3 });
}
const AX = { // mesma aparência em todos os gráficos
  catAxisLabelColor: HEX.accent3, valAxisLabelColor: HEX.accent3,
  catAxisLabelFontFace: "+mn-lt", valAxisLabelFontFace: "+mn-lt", dataLabelFontFace: "+mn-lt",
  catAxisLabelFontSize: 12, valAxisLabelFontSize: 12, dataLabelFontSize: 12, dataLabelColor: HEX.dk1,
  valGridLine: { color: "E3E8E7", size: 0.75 }, catGridLine: { style: "none" },
  catAxisLineShow: true, catAxisLineColor: "C9D1CF", valAxisLineShow: false,
  showLegend: false,
};

// ---------- dados do Anexo 2 ----------
const rows = fs.readFileSync(path.join(__dirname, "..", "leitura", "anexo2.csv"), "utf8").trim().split(/\r?\n/).slice(1).map(l => {
  const c = l.split(",");
  return { emp: c[1], custo: +c[5], ideal: +c[6], cobrado: +c[7] };
});
const byProfit = rows.map(r => ({ ...r, lucro: r.cobrado - r.custo })).sort((a, b) => b.lucro - a.lucro);
const totalLucro = byProfit.reduce((a, r) => a + r.lucro, 0);
let acc = 0;
const cumPct = byProfit.map(r => { acc += r.lucro; return +(acc / totalLucro * 100).toFixed(1); });
const byGap = rows.map(r => ({ emp: r.emp, gap: +(r.cobrado - r.ideal).toFixed(2) })).sort((a, b) => b.gap - a.gap);
const fmt = v => v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
// checagens contra o que está no spec
if (Math.abs(totalLucro - 9201.31) > 0.01) throw new Error("total " + totalLucro);
if (Math.max(...cumPct) !== 112.9) throw new Error("pico " + Math.max(...cumPct));
if (byGap.filter(g => g.gap < 0).length !== 25) throw new Error("abaixo do ideal");

const S1 = "Abertura", S2 = "O estudo", S3 = "Como o escritório calcula", S4 = "Resultados", S5 = "O que os anexos mostram", S6 = "Fechamento";

// ================= 1. Capa =================
pres.addSection({ title: S1 });
let s = pres.addSlide({ masterName: "CAPA", sectionTitle: S1 });
s.addText("ADMINISTRAÇÃO FINANCEIRA II  ·  FORMAÇÃO DE PREÇOS  ·  EXEMPLO DE APLICAÇÃO", { placeholder: "tag" });
s.addText("Como escritórios contábeis formam o preço dos seus serviços", { placeholder: "title" });
s.addText("Cruz Neto (2018), Métodos de precificação de serviços: uma abordagem comparativa entre custo e valor de mercado. Dissertação, Mackenzie", { placeholder: "body" });
s.addText("Adrian Villela  ·  UFF  ·  5 de outubro de 2026", { placeholder: "meta" });
s.addNotes("Minha parte é o exemplo de aplicação. Depois da teoria de formação de preços que a Luisa e o Robert apresentaram, vou mostrar como um setor real precifica: escritórios de contabilidade em São Paulo, a partir da dissertação de mestrado do Benedito Cruz Neto, defendida no Mackenzie em 2018.");

// ================= 2. Mensagem central =================
s = content(S1, "Mensagem central", "Os sócios dizem precificar pelo custo, mas 4 em cada 10 contratos seguem o salário mínimo", "Cruz Neto (2018), p. 9, 22, 80, 87 e Anexo 2 (p. 106)",
  "Esta é a mensagem da apresentação inteira. Vou em três partes. Primeiro, o estudo: pergunta, base teórica e método. Segundo, os resultados: como os escritórios calculam o honorário e o que os sócios e os contratos dizem. Terceiro, o que os anexos da própria dissertação mostram quando a gente faz as contas.");
[["O estudo", "11 entrevistas com sócios e 109 contratos para descobrir qual método domina: custo ou mercado"],
 ["Os resultados", "Os sócios usam o custo como base e o mercado como conferência; os contratos mostram o mercado como regra frequente"],
 ["O que os anexos mostram", "Na carteira do Anexo 2, metade dos clientes gera todo o lucro e 8 pagam menos do que custam"]]
  .forEach(([h, b], i) => {
    const x = 0.6 + i * 4.1;
    circleNum(s, x, 2.3, i + 1);
    text(s, h, { x, y: 3.0, w: 3.8, h: 0.5, fontSize: 20, bold: true, color: C.text2, fontFace: "Cambria" });
    text(s, b, { x, y: 3.6, w: 3.7, h: 2.2, fontSize: 16 });
  });

// ================= 3. Contexto =================
pres.addSection({ title: S2 });
s = content(S2, "Contexto", "Com 64 mil escritórios e sem tabela oficial de honorários, cada escritório precisa formar o próprio preço", "Cruz Neto (2018), p. 20, 35 e 36, com dados do CFC (maio de 2018)",
  "O setor é grande e pulverizado. São 64 mil organizações contábeis no Brasil, quase 30% delas em São Paulo. Até o Código de Defesa do Consumidor, as entidades de classe publicavam tabelas de honorários. Depois a tabela passou a ser proibida, e algumas entidades só divulgam valores de referência, que consideram um escritório genérico. O autor afirma que, por isso, o método de precificação virou o instrumento principal.");
stat(s, 0.6, 2.3, 3.8, "64.026", "organizações contábeis registradas no Brasil");
stat(s, 4.75, 2.3, 3.8, "29,9%", "delas estão no Estado de São Paulo (19.169)");
stat(s, 8.9, 2.3, 3.8, "1990", "Código de Defesa do Consumidor: a tabela de honorários das entidades de classe passa a ser proibida");
box(s, 0.6, 4.9, 12.1, 1.15, C.background2, "contexto-nota");
text(s, "As referências que ainda circulam (SESCON-SP, AESCON, SESCON-RS) consideram um universo genérico de escritórios e não a estrutura de custos de cada um. Muitos empresários usam como referência o honorário pago ao contador anterior.", { x: 0.85, y: 5.1, w: 11.6, h: 1.2, fontSize: 16 });

// ================= 4. Pergunta =================
s = content(S2, "Pergunta de pesquisa", "O autor quer descobrir qual método os escritórios mais usam: custo ou valor de mercado", "Cruz Neto (2018), p. 19 e 20",
  "A pergunta é direta: qual método é o mais utilizado. O objetivo geral vai um pouco além e fala no método mais adequado, para maximizar resultado sem perder competitividade. Guardem essa diferença entre mais utilizado e mais adequado, porque eu volto a ela no final. Os objetivos específicos incluem olhar o código de ética do contador e propor o método com melhor viabilidade.");
quote(s, 0.6, 2.2, 5.6, 2.6, "qual o método de precificação é mais utilizado para a prestação de serviços de natureza contábil?", "Pergunta de pesquisa, p. 19", { size: 20 });
text(s, "Objetivos específicos", { x: 6.8, y: 2.2, w: 5.9, h: 0.5, fontSize: 18, bold: true, color: C.text2 });
["Descrever os métodos pelo custo e pelo valor de mercado", "Identificar os métodos usados pelos escritórios", "Verificar as diretivas de preço no código de ética do contador", "Propor o método com melhor viabilidade e relevância"]
  .forEach((t, i) => { circleNum(s, 6.8, 2.85 + i * 0.85, i + 1); text(s, t, { x: 7.5, y: 2.9 + i * 0.85, w: 5.2, h: 0.7, fontSize: 16 }); });
text(s, "Objetivo geral: identificar o método “mais adequado”, maximizando resultados sem perder competitividade (p. 19)", { x: 0.6, y: 5.2, w: 5.6, h: 1.1, fontSize: 15, color: C.accent3 });

// ================= 5. Três métodos =================
s = content(S2, "Referencial teórico", "A literatura oferece três caminhos para o preço, cada um com uma limitação declarada", "SESCAPLDR (2016) e Duarte (2012), citados em Cruz Neto (2018), p. 47 (Quadro 6)",
  "Aqui conecto com o que a Luisa e o Robert mostraram. O autor organiza os métodos em três: custo, mercado ou concorrência, e valor percebido. A frase do sindicato de Londrina resume bem: o custo é o mais importante para conhecer a empresa, mas não o melhor; o mercado é o mais fácil, mas o mais traiçoeiro; o valor percebido é o melhor, mas o mais difícil de aplicar.");
[["Custo", "“a forma mais importante para conhecer a realidade da empresa, entretanto não é a melhor”", "Calculado de dentro para fora. É o mais utilizado (Duarte, 2012)."],
 ["Mercado ou concorrência", "“a forma mais fácil, todavia a mais traiçoeira”", "Para acompanhar a concorrência, o preço pode não cobrir os custos e gerar guerra de preços."],
 ["Valor percebido", "“a menos importante, porém a melhor forma de se precificar”", "Mais indicado pelos especialistas, mas exige pesquisa, análise de vendas e entrevistas."]]
  .forEach(([h, q, b], i) => {
    const x = 0.6 + i * 4.1;
    box(s, x, 2.2, 3.85, 4.3, i === 0 ? C.text2 : C.background2, "metodo" + i);
    const dark = i === 0;
    text(s, h, { x: x + 0.25, y: 2.45, w: 3.35, h: 0.5, fontSize: 20, bold: true, fontFace: "Cambria", color: dark ? C.background1 : C.text2 });
    text(s, q, { x: x + 0.25, y: 3.1, w: 3.35, h: 1.6, fontSize: 17, italic: true, color: dark ? C.background1 : C.text1 });
    text(s, b, { x: x + 0.25, y: 4.8, w: 3.35, h: 1.5, fontSize: 14, color: dark ? C.accent4 : C.accent3 });
  });

// ================= 6. Contingência =================
s = content(S2, "Base teórica", "Pela teoria da contingência, o método de preço depende das competências do escritório e do seu ambiente", "Cruz Neto (2018), p. 26 a 29 e 54 e 55 (Quadro 9, elaborado pelo autor)",
  "A base teórica é a teoria da contingência: não existe uma única melhor forma de gerir, a organização se ajusta ao ambiente. O autor monta um quadro próprio. Os fatores internos, como competências e habilidades, definem o modelo de preço. Os fatores externos, como concorrência, cliente e governo, definem o nível de serviço. A leitura dele é que escritórios com mais competências usam modelos mais complexos, custo e valor percebido, e os com menos competências ficam no mercado.");
const flow = [[0.6, "Fatores internos", "Competências, habilidades, atitudes"], [7.2, "Modelo de precificação", "Custo, valor percebido ou mercado"]];
const flow2 = [[0.6, "Fatores externos", "Concorrente, cliente, economia, governo"], [7.2, "Nível de serviço", "Diversificado ou padrão"]];
[[flow, 2.2], [flow2, 3.75]].forEach(([f, y]) => {
  f.forEach(([x, h, b], i) => card(s, x, y, 5.5, 1.3, h, b, { fill: i === 0 ? C.background2 : C.accent4, headSize: 18, bodySize: 15 }));
  s.addShape(pres.shapes.RIGHT_ARROW, { x: 6.25, y: y + 0.4, w: 0.8, h: 0.5, fill: { color: C.accent1 }, line: { color: C.accent1 }, objectName: "seta" });
});
text(s, [{ text: "Leitura do autor: ", options: { bold: true } }, { text: "mais competências levam a modelos mais complexos (custo e valor percebido); menos competências levam ao modelo mais simples (mercado)." }],
  { x: 0.6, y: 5.4, w: 12.1, h: 0.9, fontSize: 16 });

// ================= 7. Método =================
s = content(S2, "Método", "O estudo combina 11 entrevistas com sócios e a leitura de 109 contratos de prestação de serviços", "Cruz Neto (2018), p. 64 a 71 e 80",
  "O método é qualitativo e exploratório. Foram onze entrevistas presenciais com sócios de escritórios em São Paulo, de 40 minutos a pouco mais de uma hora, entre 2017 e 2018. Além disso, ele leu 109 contratos de prestação de serviço para ver como a cláusula de preço aparece. A amostra é não probabilística, ou seja, escolhida pelo julgamento do pesquisador. O roteiro cobre quatro variáveis de controle e três construtos, e a análise é de conteúdo, pela técnica de Bardin.");
box(s, 0.6, 2.2, 5.9, 2.4, C.text2, "m1");
text(s, "11", { x: 0.9, y: 2.35, w: 2.0, h: 1.2, fontSize: 66, bold: true, color: C.background1, fontFace: "Cambria" });
text(s, "entrevistas semiestruturadas com sócios, gravadas, de 40 a 70 minutos (dez/2017 a dez/2018)", { x: 0.9, y: 3.55, w: 5.3, h: 0.9, fontSize: 15, color: C.accent4 });
box(s, 6.8, 2.2, 5.9, 2.4, C.background2, "m2");
text(s, "109", { x: 7.1, y: 2.35, w: 2.5, h: 1.2, fontSize: 66, bold: true, color: C.accent1, fontFace: "Cambria" });
text(s, "contratos de diversas regiões do Estado de São Paulo, firmados entre 2004 e 2017", { x: 7.1, y: 3.55, w: 5.3, h: 0.9, fontSize: 15, color: C.accent3 });
[["Abordagem", "Qualitativa e exploratória"], ["Amostra", "Não probabilística, só sociedades limitadas"], ["Roteiro", "4 variáveis de controle e 3 construtos"], ["Análise", "Análise de conteúdo (Bardin)"]]
  .forEach(([h, b], i) => {
    const x = 0.6 + i * 3.075;
    text(s, h, { x, y: 4.95, w: 2.9, h: 0.4, fontSize: 14, bold: true, color: C.accent1 });
    text(s, b, { x, y: 5.35, w: 2.85, h: 0.9, fontSize: 15 });
  });

// ================= 8. Custos =================
pres.addSection({ title: S3 });
s = content(S3, "Estrutura de custos", "A mão de obra é o maior custo do escritório: 55% só com a equipe e 76% somando o sócio", "Anexo 1 (NIBO, 2018), p. 105; entrevista ORGC7, p. 79. Percentuais calculados a partir do Anexo 1",
  "Para entender o preço, primeiro o custo. Um dos sócios diz que a mão de obra é 80% do custo. O Anexo 1 da dissertação traz um escritório-exemplo com custo mensal de 24.768 reais. A equipe dos departamentos e o administrativo dão 55%. Somando o pró-labore do sócio, que o anexo lança como custo fixo, chega a 76%, perto dos 80% da entrevista. Os encargos somam 76% sobre o salário.");
s.addChart(pres.charts.BAR, [{ name: "Custo mensal (R$)", labels: ["Equipe dos departamentos", "Outros custos fixos", "Pró-labore do sócio", "Administrativo"], values: [11722.42, 6050.0, 5100.0, 1896.27] }],
  Object.assign({}, AX, { x: 0.6, y: 2.1, w: 7.4, h: 4.5, barDir: "bar", catAxisOrientation: "maxMin", chartColors: [HEX.accent1, "9AA7A5", HEX.accent1, HEX.accent1], barGapWidthPct: 60,
    showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "#,##0", valAxisHidden: true, valGridLine: { style: "none" }, showTitle: true, title: "Custo mensal do escritório-exemplo, R$ (total 24.768,69)", titleFontSize: 14, titleColor: HEX.dk1, titleFontFace: "+mn-lt" }));
stat(s, 8.5, 2.2, 4.2, "80%", "do custo é mão de obra, segundo o sócio da ORGC7");
stat(s, 8.5, 4.1, 4.2, "76,34%", "de encargos sobre o salário (INSS, FGTS, 13º, férias, multa, vales)", C.text2);

// ================= 9. Horas do sócio =================
s = content(S3, "Horas do sócio", "Três quartos das horas do sócio vão para gestão, consultoria e administração, fora da rotina contábil", "Apêndices 1 e 5 (adaptados de Vaz, 2014), p. 100 e 104",
  "O Apêndice 5 calcula a hora do sócio: 160 horas por mês, 5.200 reais, ou 32,50 por hora. Só 40 horas vão para a rotina contábil, e dentro dela o maior peso é a conferência. As outras 120 horas, três quartos do tempo, vão para gestão, consultoria e atendimento, e rotinas administrativas. Isso importa para o preço: o tempo do sócio é custo, mas grande parte dele não está ligada a nenhum cliente específico.");
s.addChart(pres.charts.BAR, [{ name: "R$ por mês", labels: ["Legal e consultoria", "Gestão", "Rotina contábil", "Rotinas administrativas"], values: [1722.5, 1592.5, 1300.0, 585.0] }],
  Object.assign({}, AX, { x: 0.6, y: 2.1, w: 7.4, h: 4.5, barDir: "bar", catAxisOrientation: "maxMin", chartColors: ["9AA7A5", "9AA7A5", HEX.accent1, "9AA7A5"], barGapWidthPct: 60,
    showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "#,##0.00", valAxisHidden: true, valGridLine: { style: "none" }, showTitle: true, title: "Custo do sócio por atividade, R$ por mês (total 5.200,00)", titleFontSize: 14, titleColor: HEX.dk1, titleFontFace: "+mn-lt" }));
stat(s, 8.5, 2.2, 4.2, "R$ 32,50", "por hora: 160 horas e R$ 5.200,00 por mês");
stat(s, 8.5, 4.1, 4.2, "40 de 160 h", "vão para a rotina contábil; 45% delas em conferência de dados", C.text2);

// ================= 10. Fórmula =================
s = content(S3, "Formação do honorário", "O honorário nasce do volume de operações do cliente multiplicado pelo custo de cada unidade", "Entrevista ORGC7, p. 76 e 77; Anexos 1 e 2 (NIBO, 2018), p. 105 e 106",
  "A fórmula que os sócios descrevem é simples. Conta-se o volume do cliente: notas fiscais, lançamentos e empregados. Multiplica-se pelo custo de cada unidade em cada departamento. O Anexo 1 dá esses custos unitários: 2,33 por unidade no fiscal, 1,56 no contábil e 31,22 no pessoal. Isso dá o custo do cliente. Depois entram margem e impostos para chegar ao honorário ideal. Exemplo real do Anexo 2: o cliente ABC custa 85,82, o ideal seria 135,52 e ele paga 180.");
const steps = [["Volume", "Notas fiscais, lançamentos e empregados do cliente"], ["× custo unitário", "R$ 2,33 fiscal\nR$ 1,56 contábil\nR$ 31,22 pessoal"], ["= custo do cliente", "Soma dos três departamentos"], ["+ margem", "Margem de 30% e 9,53% de tributos sobre a receita"]];
steps.forEach(([h, b], i) => {
  const x = 0.6 + i * 3.1;
  box(s, x, 2.2, 2.75, 2.1, i === 3 ? C.text2 : C.background2, "passo" + i);
  text(s, h, { x: x + 0.2, y: 2.35, w: 2.4, h: 0.5, fontSize: 18, bold: true, fontFace: "Cambria", color: i === 3 ? C.background1 : C.text2 });
  text(s, b, { x: x + 0.2, y: 2.95, w: 2.4, h: 1.3, fontSize: 15, color: i === 3 ? C.accent4 : C.text1 });
  if (i < 3) s.addShape(pres.shapes.RIGHT_ARROW, { x: x + 2.78, y: 3.05, w: 0.3, h: 0.4, fill: { color: C.accent1 }, line: { color: C.accent1 }, objectName: "seta" + i });
});
quote(s, 0.6, 4.6, 7.0, 1.9, "os honorários são calculados considerando o volume de operações dos clientes vezes o custo hora de cada colaborador por departamento", "ORGC7, p. 76 e 77", { size: 15 });
text(s, "Exemplo do Anexo 2: cliente ABC", { x: 8.0, y: 4.6, w: 4.7, h: 0.4, fontSize: 15, bold: true, color: C.text2 });
[["Custo", "R$ 85,82"], ["Honorário ideal", "R$ 135,52"], ["Honorário cobrado", "R$ 180,00"]].forEach(([k, v], i) => {
  text(s, k, { x: 8.0, y: 5.1 + i * 0.45, w: 2.6, h: 0.4, fontSize: 15, color: C.accent3 });
  text(s, v, { x: 10.6, y: 5.1 + i * 0.45, w: 2.1, h: 0.4, fontSize: 15, bold: true, align: "right" });
});

// ================= 11. Entrevistas =================
pres.addSection({ title: S4 });
s = content(S4, "Resultado das entrevistas", "Os sócios usam o custo como base e o mercado como conferência", "Cruz Neto (2018), p. 22, 76 e 80",
  "O resultado central das entrevistas: o custo é a base, e o mercado é uma conferência. Só um entrevistado disse ter segurança em usar o custo isoladamente. Os outros precificam pelo custo, mas sempre olhando o mercado. A fala da ORGC1 resume a posição: o mercado é desleal, eu não precifico por ele, mas estou sempre olhando para manter o melhor preço.");
quote(s, 0.6, 2.2, 5.9, 3.6, "dos entrevistados apenas um afirmou ter segurança em adotar o método de custo como instrumento de precificação isoladamente, os demais precificam pelo custo como ferramenta principal, mas sempre observando o comportamento do mercado", "Autor, p. 22", { size: 17 });
quote(s, 6.8, 2.2, 5.9, 3.6, "o que se pratica pelo mercado não é a realidade interna [...] e o mercado é desleal [...] apesar de eu não utilizar a precificação pelo valor de mercado sempre estou olhando o mercado para poder manter o melhor preço, mas a precificação deve ser pelo custo", "ORGC1, p. 80", { size: 17 });
text(s, "Na prática: software ou planilha apura o custo (principalmente mão de obra), soma a margem e confere se o preço é viável para cada cliente (p. 76).", { x: 0.6, y: 6.05, w: 12.1, h: 0.7, fontSize: 15, color: C.accent3 });

// ================= 12. Mercado ameaça qualidade =================
s = content(S4, "Custo versus mercado", "Para os sócios, seguir o preço de mercado coloca em risco a qualidade e a previsibilidade", "Entrevistas ORGC1, ORGC2 e ORGC3, p. 75, 76 e 80",
  "Os sócios justificam o custo com três argumentos. A ORGC3 reclama da contabilidade online vendida a 80 reais, que ela vê como desvalorização da profissão. A ORGC2 diz que quem precifica pelo custo enxerga 6, 12 ou 24 meses à frente, e quem segue o mercado precifica de forma temerária. E a ORGC1 conta que quatro clientes saíram por preço e voltaram em dez ou onze meses, pela qualidade. São afirmações sobre resultado, mas o estudo não mede esse resultado.");
[["R$ 80", "Contabilidade online vendida a R$ 80,00 por mês, “sem nenhuma ação humana”", "ORGC3"],
 ["24 meses", "Quem precifica pelo custo “consegue enxergar o cenário para 06, 12 ou 24 meses”; pelo mercado, a precificação “passa a ser temerária”", "ORGC2"],
 ["4 clientes", "Saíram por preço e voltaram em 10 a 11 meses “pela qualidade dos serviços prestados”", "ORGC1"]]
  .forEach(([big, b, who], i) => {
    const x = 0.6 + i * 4.1;
    box(s, x, 2.2, 3.85, 3.8, C.background2, "arg" + i);
    text(s, big, { x: x + 0.25, y: 2.4, w: 3.4, h: 1.0, fontSize: 44, bold: true, color: C.accent2, fontFace: "Cambria" });
    text(s, b, { x: x + 0.25, y: 3.5, w: 3.4, h: 2.0, fontSize: 15 });
    text(s, who, { x: x + 0.25, y: 5.5, w: 3.4, h: 0.35, fontSize: 13, bold: true, color: C.accent3 });
  });
text(s, "O autor conclui que precificar pelo mercado prejudica a qualidade, principalmente a remuneração da mão de obra (p. 80).", { x: 0.6, y: 6.25, w: 12.1, h: 0.5, fontSize: 15, color: C.accent3 });

// ================= 13. Gestão =================
s = content(S4, "Gestão de custos", "Nenhum escritório entrevistado usa sistema de custeio gerencial nem indicador de desempenho", "Cruz Neto (2018), p. 77, 79 e 87",
  "Há uma ironia que o próprio sócio aponta: o escritório faz a gestão de custo dos clientes, mas não a sua. Existe controle, timesheet, planilha, um software próprio desde 1990 na ORGC7. Mas nenhum usa absorção, custeio variável ou ABC, e na conclusão o autor afirma que não há uso de qualquer indicador de desempenho. Ninguém sabe dizer quanto cada colaborador custa para cada cliente.");
card(s, 0.6, 2.2, 5.9, 2.4, "O que existe", "Timesheet diário das atividades\nPlanilhas de controle interno\nSoftware próprio (ORGC7, desde 1990)\nPesquisas de satisfação", { fill: C.accent4 });
card(s, 6.8, 2.2, 5.9, 2.4, "O que falta", "Custeio por absorção, variável ou ABC\nIndicador de desempenho financeiro\nCusto de cada colaborador por cliente", { headColor: C.accent2 });
quote(s, 0.6, 4.85, 12.1, 1.75, "por incrível que pareça o escritório de contabilidade não tem gestão de custo e fazemos a gestão de custo dos clientes", "ORGC2, p. 77", { size: 17 });

// ================= 14. Contratos =================
s = content(S4, "Análise dos contratos", "43 dos 109 contratos atrelam o honorário ao salário mínimo regional", "Cruz Neto (2018), p. 21, 80, 87 e 88",
  "Aqui está o único dado quantitativo do estudo. Dos 109 contratos, 43, ou 39%, vinculam o honorário ao salário mínimo regional, usando como base o número de empregados, notas fiscais e lançamentos do cliente. O autor lê isso como precificação pelo mercado. Ele também lembra que vincular ao salário mínimo é vedado pela Constituição e que isso nem é, tecnicamente, um método de precificação. O texto não diz o que fazem os outros 66 contratos.");
const cols = 11, sq = 0.3, gap = 0.07;
for (let i = 0; i < 109; i++) {
  const r = Math.floor(i / cols), c = i % cols;
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6 + c * (sq + gap), y: 2.25 + r * (sq + gap), w: sq, h: sq, fill: { color: i < 43 ? C.accent2 : C.accent4 }, line: { color: i < 43 ? C.accent2 : C.accent4 }, objectName: "contrato" + (i + 1) });
}
text(s, [{ text: "■ ", options: { color: C.accent2 } }, { text: "43 vinculados ao salário mínimo   " }, { text: "■ ", options: { color: C.accent4 } }, { text: "66 sem método informado no texto" }],
  { x: 0.6, y: 6.05, w: 6.5, h: 0.4, fontSize: 13, color: C.accent3 });
stat(s, 5.4, 2.2, 3.4, "39,4%", "dos contratos analisados", C.accent2);
card(s, 8.9, 2.2, 3.8, 3.7, "Base do cálculo", "Quantidade de empregados\nNotas fiscais por mês (entrada, saída, serviços)\nLançamentos contábeis", { bodySize: 15 });
text(s, "A vinculação ao salário mínimo é vedada pelo art. 7º, IV, da Constituição, e o autor afirma que ela “não se caracteriza tecnicamente como um método de precificação” (p. 21).", { x: 5.4, y: 4.3, w: 3.3, h: 2.2, fontSize: 14, color: C.accent3 });

// ================= 15. Conclusão do autor =================
s = content(S4, "Conclusão do autor", "O autor conclui que o custo efetivamente incorrido é o melhor método, com o mercado como complemento", "Cruz Neto (2018), p. 87 e 88",
  "A conclusão do autor: por unanimidade, o melhor método é o custo efetivamente incorrido, com o mercado como complemento. Ele alerta para o risco de nivelar o preço por baixo quando se olha demais para o mercado. E deixa uma sugestão de pesquisa futura que é a ponte para a minha última parte: comparar o resultado financeiro de quem precifica pelo custo com o de quem precifica pelo mercado.");
quote(s, 0.6, 2.2, 7.4, 2.7, "Obteve-se por unanimidade que o melhor método de precificação dos serviços de natureza contábil é o método pelo custo efetivamente incorrido", "Autor, p. 87", { size: 19 });
card(s, 8.3, 2.2, 4.4, 2.7, "Risco apontado", "Comparar demais com o mercado pode levar a “um possível nivelamento por baixo” dos preços (p. 87)", { bodySize: 15 });
box(s, 0.6, 5.15, 12.1, 1.45, C.text2, "futura");
text(s, "Pesquisa futura sugerida pelo autor", { x: 0.85, y: 5.3, w: 11.6, h: 0.4, fontSize: 15, bold: true, color: C.accent4 });
text(s, "Comparar o resultado financeiro dos escritórios que precificam pelo custo com o dos que precificam pelo valor de mercado (p. 88)", { x: 0.85, y: 5.7, w: 11.6, h: 0.8, fontSize: 17, color: C.background1 });

// ================= 16. Leitura crítica =================
pres.addSection({ title: S5 });
s = content(S5, "Leitura crítica", "Entrevistas e contratos apontam para lados diferentes, e o texto não reconcilia os dois", "Cruz Neto (2018), páginas indicadas na tabela. Leitura do apresentador",
  "Antes dos anexos, três pontos de leitura crítica, com respeito ao trabalho. Primeiro, as entrevistas dizem custo e os contratos mostram salário mínimo em quatro de cada dez casos: o que se diz e o que se assina não coincidem. Segundo, a conclusão fala em unanimidade, e a introdução diz que só um usa o custo isoladamente; as duas coisas podem ser verdade, todos preferem o custo e quase todos olham o mercado, mas o texto não explica. Terceiro, o método prometia medir desempenho com margem, EBIT, ROE e ROI, e esses números não aparecem.");
const tRows = [
  ["Tema", "O texto afirma", "O texto também mostra"],
  ["Método usado", "Os sócios precificam pelo custo (p. 87)", "43 de 109 contratos usam o salário mínimo, que o autor classifica como mercado (p. 80)"],
  ["Consenso", "“por unanimidade” o custo é o melhor método (p. 87)", "“apenas um” usa o custo isoladamente (p. 22)"],
  ["Desempenho", "Seria medido por margem bruta, EBIT, ROE e ROI (p. 69)", "“não há a utilização de qualquer indicador de desempenho” (p. 87)"],
];
s.addTable(tRows.map((r, i) => r.map((c, j) => ({ text: c, options: {
  bold: i === 0 || j === 0, color: i === 0 ? C.background1 : C.text1, fill: { color: i === 0 ? C.text2 : (i % 2 ? C.background2 : C.background1) },
  fontSize: i === 0 ? 15 : 15, valign: "middle", margin: [0.08, 0.15, 0.08, 0.15] } }))),
  { x: 0.6, y: 2.2, w: 12.1, colW: [2.2, 4.6, 5.3], rowH: [0.5, 1.1, 1.1, 1.1], border: { type: "solid", pt: 0.5, color: "D5DEDC" } });

// ================= 17. Amostra =================
s = content(S5, "Tamanho da amostra", "Mesmo com amostra aleatória, a proporção real de contratos no salário mínimo poderia ir de 31% a 49%", "Intervalo de Wilson a 95% calculado pelo apresentador sobre 43/109 (p. 80); amostra descrita na p. 70",
  "Sobre o único número do estudo. 43 em 109 é 39,4%. Se a amostra fosse aleatória, o intervalo de confiança de 95% iria de cerca de 31% a 49%. Mas a amostra é não probabilística, então nem esse intervalo vale de forma rigorosa. E o texto não diz de onde vêm os contratos, nem como foram escolhidos, e eles são de 2004 a 2017, antes das entrevistas. Isso não invalida o trabalho, que é exploratório; o próprio autor diz que ele não esgota o assunto. Só mostra que o 39% é um indício e pede cautela na leitura.");
const ax0 = 0.9, axW = 11.5, ay = 3.5, px = v => ax0 + axW * v / 100;
s.addShape(pres.shapes.LINE, { x: ax0, y: ay, w: axW, h: 0, line: { color: "9AA7A5", width: 1.5 }, objectName: "eixo" });
[0, 25, 50, 75, 100].forEach(v => {
  s.addShape(pres.shapes.LINE, { x: px(v), y: ay - 0.08, w: 0, h: 0.16, line: { color: "9AA7A5", width: 1 }, objectName: "tick" + v });
  text(s, v + "%", { x: px(v) - 0.4, y: ay + 0.2, w: 0.8, h: 0.35, fontSize: 13, color: C.accent3, align: "center" });
});
s.addShape(pres.shapes.RECTANGLE, { x: px(30.8), y: ay - 0.3, w: px(48.8) - px(30.8), h: 0.6, fill: { color: C.accent2, transparency: 70 }, line: { color: C.accent2, width: 1 }, objectName: "intervalo" });
s.addShape(pres.shapes.OVAL, { x: px(39.4) - 0.14, y: ay - 0.14, w: 0.28, h: 0.28, fill: { color: C.accent2 }, line: { color: C.background1, width: 1.5 }, objectName: "ponto" });
text(s, "39,4%", { x: px(39.4) - 0.7, y: ay - 1.35, w: 1.4, h: 0.5, fontSize: 22, bold: true, color: C.accent2, align: "center" });
text(s, "30,8%", { x: px(30.8) - 0.55, y: ay - 0.75, w: 1.1, align: "center", h: 0.4, fontSize: 14, color: C.accent3 });
text(s, "48,8%", { x: px(48.8) - 0.55, y: ay - 0.75, w: 1.1, align: "center", h: 0.4, fontSize: 14, color: C.accent3 });
[["Amostra não probabilística", "A seleção “depende, ao menos em parte, do julgamento do pesquisador” (p. 70)"],
 ["Origem não informada", "O texto não diz de onde vêm os contratos nem como foram selecionados"],
 ["Períodos diferentes", "Contratos de 2004 a 2017; entrevistas de 2017 a 2018"]]
  .forEach(([h, b], i) => card(s, 0.6 + i * 4.1, 4.5, 3.85, 2.1, h, b, { headSize: 16, bodySize: 14 }));

// ================= 18. Whale curve =================
s = content(S5, "Achado no Anexo 2", "Na carteira do Anexo 2, 19 dos 36 clientes já geram todo o lucro, e 8 clientes pagam menos do que custam", "Anexo 2 (NIBO, 2018), p. 106, 36 clientes; curva calculada pelo apresentador (lucro = honorário cobrado menos custo total)",
  "Agora o achado. O Anexo 2 traz uma carteira de 36 clientes com custo, honorário ideal e honorário cobrado. O texto da dissertação não comenta esse anexo. Ordenei os clientes do mais para o menos lucrativo e acumulei o lucro. O cliente FIL sozinho dá 27% do resultado. Com 19 clientes já se chega a 100%. A curva sobe até 112,9% e depois cai, porque os últimos 8 clientes custam mais do que pagam e devolvem 1.189 reais. Na literatura de custos isso se chama curva da baleia, e é exatamente o que o custeio ABC, citado pelo autor na página 79, serve para revelar.");
s.addChart(pres.charts.LINE, [{ name: "Lucro acumulado (% do total)", labels: byProfit.map((_, i) => (i === 0 || (i + 1) % 5 === 0 || i === 35) ? String(i + 1) : ""), values: cumPct }],
  Object.assign({}, AX, { x: 0.6, y: 2.0, w: 7.9, h: 4.75, chartColors: [HEX.accent1], lineSize: 2, lineDataSymbol: "none",
    valAxisMinVal: 0, valAxisMaxVal: 120, valAxisMajorUnit: 20, valAxisLabelFormatCode: "0\"%\"",
    showCatAxisTitle: true, catAxisTitle: "Clientes, do mais ao menos lucrativo", catAxisTitleFontSize: 12, catAxisTitleColor: HEX.accent3, catAxisTitleFontFace: "+mn-lt",
    catAxisLabelFrequency: 5, showTitle: true, title: "Lucro acumulado, % do resultado total (R$ 9.201,31)", titleFontSize: 14, titleColor: HEX.dk1, titleFontFace: "+mn-lt" }));
stat(s, 9.0, 2.1, 3.7, "27%", "do lucro vem de um único cliente (FIL, R$ 2.488,92)");
stat(s, 9.0, 3.65, 3.7, "112,9%", "pico do lucro acumulado, no 28º cliente", C.text2);
stat(s, 9.0, 5.2, 3.7, "R$ 1.189", "devolvidos pelos 8 clientes abaixo do custo", C.accent2);

// ================= 19. Ideal x cobrado =================
s = content(S5, "Honorário ideal versus cobrado", "25 dos 36 clientes pagam menos que o honorário ideal, e a carteira cobra 13% abaixo do que o custo indicaria", "Anexo 2 (NIBO, 2018), p. 106; diferenças calculadas pelo apresentador",
  "O segundo olhar sobre o Anexo 2 compara o que o custo indica, o honorário ideal, com o que é cobrado. 25 dos 36 clientes pagam abaixo do ideal. No total, a carteira cobra 33.970 reais quando o ideal seria 39.111, cerca de 13% abaixo. Um cuidado de leitura: déficit no anexo quer dizer cobrar menos que o ideal, não prejuízo. Prejuízo de fato só existe nos 8 clientes do gráfico anterior. Ou seja, mesmo num escritório que calcula o custo de cada cliente, o preço praticado segue outra lógica, que é o que os contratos sugeriam.");
s.addChart(pres.charts.BAR, [{ name: "Cobrado menos ideal (R$)", labels: byGap.map(g => g.emp), values: byGap.map(g => g.gap) }],
  Object.assign({}, AX, { x: 0.6, y: 2.0, w: 8.2, h: 4.75, barDir: "col", chartColors: [HEX.accent1], invertedColors: [HEX.accent2], barGapWidthPct: 40,
    valAxisLabelFormatCode: "#,##0", catAxisHidden: true, valAxisMajorUnit: 500,
    showTitle: true, title: "Honorário cobrado menos ideal, R$ por cliente (36 clientes)", titleFontSize: 14, titleColor: HEX.dk1, titleFontFace: "+mn-lt" }));
stat(s, 9.2, 2.1, 3.5, "25 de 36", "clientes pagam abaixo do honorário ideal", C.accent2);
stat(s, 9.2, 3.65, 3.5, "−13,1%", "cobrado (R$ 33.970) contra ideal (R$ 39.111)", C.text2);
text(s, "No anexo, “déficit” significa cobrar abaixo do ideal. Prejuízo de fato só ocorre nos 8 clientes cobrados abaixo do custo.", { x: 9.2, y: 5.3, w: 3.5, h: 1.3, fontSize: 14, color: C.accent3 });

// ================= 20. Markup =================
s = content(S5, "Markup do Anexo 2", "Aplicar margem e impostos em sequência reduz a margem efetiva de 30% para 27%", "Anexo 2 (NIBO, 2018), p. 106; Bruni e Famá. A fórmula não aparece no anexo: a equivalência com 1,5791 é inferência do apresentador",
  "Último achado, que conversa com a parte da Luisa. Em todos os 36 clientes o honorário ideal é exatamente o custo vezes 1,5791. Esse número sai de aplicar a margem de 30% e os impostos de 9,53% em sequência. O markup que Bruni e Famá ensinam soma os dois no denominador e dá 1,6537. A diferença parece pequena, mas com o markup sequencial a margem efetiva sobre o preço cai para 27,1%. Na carteira do anexo, seriam cerca de 1.850 reais por mês a menos de honorário ideal.");
card(s, 0.6, 2.2, 5.9, 2.6, "Sequencial (Anexo 2)", "Custo ÷ [(1 − 0,30) × (1 − 0,0953)]\n= custo × 1,5791\nMargem efetiva sobre o preço: 27,1%", { bodySize: 17 });
card(s, 6.8, 2.2, 5.9, 2.6, "Markup único (Bruni e Famá)", "Custo ÷ (1 − 0,30 − 0,0953)\n= custo × 1,6537\nMargem efetiva sobre o preço: 30,0%", { bodySize: 17, fill: C.accent4 });
box(s, 0.6, 5.1, 12.1, 1.5, C.background2, "markup-impacto");
text(s, [{ text: "Na carteira do anexo (custo de R$ 24.768,69): ", options: { bold: true } }, { text: "honorário ideal de R$ 39.111 pelo método sequencial contra cerca de R$ 40.960 pelo markup único, uma diferença de R$ 1.849 por mês." }],
  { x: 0.85, y: 5.3, w: 11.6, h: 1.1, fontSize: 17 });

// ================= 21. Conclusão =================
pres.addSection({ title: S6 });
s = pres.addSlide({ masterName: "CAPA", sectionTitle: S6 });
s.addText("CONCLUSÃO", { placeholder: "tag" });
s.addText("O custo é a base declarada, mas o preço cobrado se afasta dele, e só o custo por cliente mostra quem sustenta a carteira", { placeholder: "title", fontSize: 32 });
s.addText([
  { text: "1  O estudo: os sócios precificam pelo custo e usam o mercado como conferência.", options: { breakLine: true } },
  { text: "2  Os contratos e o Anexo 2 mostram o preço praticado longe do custo calculado.", options: { breakLine: true } },
  { text: "3  Próximo passo, proposto pelo próprio autor: medir o resultado de quem precifica pelo custo e de quem precifica pelo mercado." },
], { placeholder: "body" });
s.addNotes("Para fechar. Primeiro: o estudo mostra que os sócios declaram precificar pelo custo, com o mercado como conferência. Segundo: os contratos e o Anexo 2 mostram que o preço cobrado se afasta do custo calculado, tanto no salário mínimo quanto nos 25 clientes abaixo do ideal. Terceiro: a resposta para qual método é o mais adequado, que era o objetivo geral, depende de medir resultado, exatamente a pesquisa futura que o autor propõe. A ferramenta para isso é o custo por cliente, como no Anexo 2. Obrigado.");

// ================= 22. Referências =================
s = content(S6, "Referências", "Referências", null, "Slide de referências, só para consulta.");
text(s, [
  { text: "CRUZ NETO, B. P. Métodos de precificação de serviços: uma abordagem comparativa entre os métodos de precificação de serviços contábeis pelo custo e valor de mercado. Dissertação (Mestrado Profissional em Controladoria e Finanças Empresariais), Universidade Presbiteriana Mackenzie, São Paulo, 2018.", options: { breakLine: true, paraSpaceAfter: 10 } },
  { text: "BRUNI, A. L.; FAMÁ, R. Gestão de custos e formação de preços. São Paulo: Atlas.", options: { breakLine: true, paraSpaceAfter: 10 } },
  { text: "Anexos 1 e 2 da dissertação: NIBO (2018), exemplo de cálculo de honorários. Apêndices 1 a 5: adaptados de VAZ (2014)." },
], { x: 0.6, y: 2.0, w: 12.1, h: 4.6, fontSize: 15 });

(async () => {
  const out = path.join(__dirname, "apresentacao.pptx");
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  console.log("ok", out);
})();
