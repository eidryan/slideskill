// v7: consulting layout over the audited v6 content.
// Speech, transitions, timing and sources come from content_v6.json; this file only
// adds action titles, takeaways and the visual for each slide.
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { Presentation, PresentationFile, FileBlob } from '@oai/artifact-tool';

const ROOT = 'C:/Users/adria/tasks/admfin-v6-work';
const SKILL = 'C:/Users/adria/.codex/plugins/cache/openai-primary-runtime/presentations/26.909.12148/skills/presentations';
const PYTHON = 'C:/Users/adria/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe';
process.env.RUNTIME_NODE_MODULES = 'C:/Users/adria/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
process.env.RUNTIME_NODE = 'C:/Users/adria/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe';
const { finalizePresentation } = await import(pathToFileURL(path.join(SKILL, 'container_tools/artifact_tool_utils.mjs')));
const content = JSON.parse(await fs.readFile(path.join(ROOT, 'content_v6.json'), 'utf8'));
// Speaker notes as topics and keywords; the full speech lives in the script PDF.
const NOTES = JSON.parse(await fs.readFile(path.join(ROOT, 'notes_v7.json'), 'utf8'));
const S = Object.fromEntries(content.slides.map(s => [s.number, s]));
const C = { navy: '#0B2545', blue: '#3E5C76', ink: '#1F2328', gray: '#5B6670', light: '#9AA5B1', line: '#D9DEE3', soft: '#EEF1F4', white: '#FFFFFF' };
const SECTIONS = [['Contexto', [1, 2]], ['Fundamentos', [3, 4, 5, 6, 7, 8, 9]], ['Método', [10, 11, 12]], ['Resultados', [13, 14]], ['Conclusões', [15, 16]]];
const mmss = n => `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`;

const HEAD = {
  2: 'A pesquisa parte de um problema prático: formar honorários que cubram os gastos em um mercado concorrido',
  3: 'Pela teoria da contingência, as práticas de gestão devem se ajustar ao contexto de cada organização',
  4: 'Custos se classificam pela identificação e pelo comportamento, e nos serviços a mão de obra concentra a análise',
  5: 'São Paulo reunia 19.169 organizações contábeis em 2018, que vendem serviços recorrentes e intangíveis',
  6: 'No escritório-exemplo da NIBO, 53% do custo mensal é comum e chega aos departamentos por rateio',
  7: 'Cada base de preço tem uma vantagem e um risco, segundo a avaliação da SESCAPLDR',
  8: 'Precificar pelo custo exige descer do departamento até o cliente, unidade por unidade',
  9: 'Mercado, cliente e condições econômicas também pesam no preço, por isso a revisão rejeita uma receita única',
  10: 'A pesquisa combina o que 11 sócios declaram com o que 109 contratos registram',
  11: 'Quatro variáveis de controle descrevem os escritórios para verificar se o contexto muda o método',
  12: 'Três construtos organizam as entrevistas: preço, desempenho e custos',
  13: 'Os escritórios variam de 6 a 400 colaboradores, mas oferecem serviços recorrentes semelhantes',
  14: 'Os sócios preferem o custo, mas o mercado aparece em 10 de 11 relatos e em 43 de 109 contratos',
  15: 'O autor conclui pelo custo, com o mercado como complemento, a partir de relatos de preferência',
  16: 'Referências',
};

const P = Presentation.create({ slideSize: { width: 1280, height: 720 } });
const charts = [];
function text(s, txt, x, y, w, h, size = 20, bold = false, color = C.ink, align = 'left', valign = 'top', italic = false) {
  const shape = s.shapes.add({ geometry: 'textbox', name: `text-${s.shapes.items.length}`, position: { left: x, top: y, width: w, height: h }, fill: 'none', line: { fill: 'none', width: 0 } });
  shape.text = txt;
  shape.text.style = { typeface: 'Arial', fontSize: size, bold, italic, color, alignment: align, verticalAlignment: valign, autoFit: 'none', wrap: 'square', insets: { left: 0, right: 0, top: 0, bottom: 0 } };
  return shape;
}
function box(s, x, y, w, h, fill, txt = '', size = 20, bold = false, color = C.ink, align = 'left', geometry = 'rect', inset = 16) {
  const shape = s.shapes.add({ geometry, name: `box-${s.shapes.items.length}`, position: { left: x, top: y, width: w, height: h }, fill, line: { fill: 'none', width: 0 } });
  if (txt) {
    shape.text = txt;
    shape.text.style = { typeface: 'Arial', fontSize: size, bold, color, alignment: align, verticalAlignment: 'middle', autoFit: 'none', wrap: 'square', insets: { left: inset, right: inset, top: 6, bottom: 6 } };
  }
  return shape;
}
function rule(s, x, y, w, color = C.line, weight = 1) {
  return s.shapes.add({ geometry: 'line', position: { left: x, top: y, width: w, height: 0 }, fill: 'none', line: { fill: color, width: weight } });
}
function tracker(s, n) {
  let x = 44;
  for (const [name, nums] of SECTIONS) {
    const on = nums.includes(n);
    const w = name.length * 9.6 + 8;
    text(s, name, x, 20, w, 22, 16, on, on ? C.navy : C.light);
    if (on) rule(s, x, 44, w - 8, C.navy, 2);
    x += w + 22;
  }
}
function base(d) {
  const s = P.slides.add(); s.background.fill = C.white;
  if (d.number !== 1) {
    tracker(s, d.number);
    text(s, HEAD[d.number], 44, 62, 1192, 74, 28, true, C.navy, 'left', 'top');
    rule(s, 44, 146, 1192);
    text(s, String(d.number), 1180, 680, 56, 22, 16, false, C.gray, 'right');
  }
  const nt = NOTES[d.number];
  s.speakerNotes.textFrame.setText(`Tempo: ${mmss(d.seconds)}\n\n${nt.topics.map(t => '• ' + t).join('\n')}\n\nPalavras-chave: ${nt.keywords.join(' · ')}\n\n→ Próximo: ${nt.next}\n\nFontes: ${d.sources.join(' ')}`);
  return s;
}
function takeaway(s, txt) { box(s, 44, 596, 1192, 66, C.navy, txt, 20, true, C.white, 'left', 'rect', 22); }
// Column card: navy header band, then label/value pairs.
function card(s, x, y, w, h, title, parts, size = 19) {
  box(s, x, y, w, h, C.soft);
  box(s, x, y, w, 50, C.navy, title, 21, true, C.white, 'left', 'rect', 18);
  let yy = y + 66;
  for (const [label, value, hh] of parts) {
    if (label) { text(s, label, x + 18, yy, w - 36, 20, 16, true, C.gray); yy += 24; }
    text(s, value, x + 18, yy, w - 36, hh, size, false, C.ink);
    yy += hh + 12;
  }
}
function chevrons(s, labels, y, h = 54, size = 20) {
  const n = labels.length, gap = 8, w = (1192 - gap * (n - 1)) / n;
  labels.forEach((l, i) => box(s, 44 + i * (w + gap), y, w, h, i === n - 1 ? C.navy : C.blue, l, size, true, C.white, 'center', i === 0 ? 'homePlate' : 'chevron', 30));
  return w;
}

for (const d of content.slides) {
  const s = base(d), n = d.number;
  if (n === 1) {
    box(s, 0, 0, 22, 720, C.navy);
    text(s, 'ADMINISTRAÇÃO FINANCEIRA II', 80, 170, 1100, 30, 18, true, C.gray);
    text(s, d.title, 80, 214, 1100, 130, 46, true, C.navy);
    rule(s, 80, 372, 210, C.navy, 3);
    text(s, d.subtitle, 80, 400, 1100, 40, 24, false, C.gray);
    text(s, 'Universidade Presbiteriana Mackenzie · 2018', 80, 446, 1100, 32, 20, false, C.gray);
    text(s, d.body, 80, 596, 1100, 32, 20, false, C.ink);
  } else if (n === 2) {
    const w = chevrons(s, ['Problema', 'Pergunta de pesquisa', 'Objetivo geral'], 184);
    d.rows.slice(0, 3).forEach(([, v], i) => text(s, v, 44 + i * (w + 8) + 6, 262, w - 30, 170, 22, i === 1, i === 1 ? C.navy : C.ink));
    text(s, 'Pergunta e objetivo usam termos diferentes: método mais utilizado e método mais adequado.', 44, 470, 1192, 60, 20, false, C.gray);
    takeaway(s, `Justificativa: ${d.rows[3][1]}`);
  } else if (n === 3) {
    const w = 360, gap = (1192 - 3 * w) / 2;
    d.rows.forEach(([k, v], i) => {
      const x = 44 + i * (w + gap);
      box(s, x, 200, w, 64, i === 2 ? C.navy : C.blue, k, 24, true, C.white, 'center');
      text(s, v, x + 8, 284, w - 16, 90, 22, false, C.ink, 'center');
      if (i < 2) box(s, x + w + 14, 214, gap - 28, 36, C.light, '', 0, false, C.ink, 'left', 'rightArrow');
    });
    text(s, d.lead, 44, 420, 1192, 40, 22, false, C.gray, 'center');
    takeaway(s, d.bottom);
  } else if (n === 4) {
    const panels = [['Pela identificação', [d.rows[0], d.rows[1]]], ['Pelo comportamento', [d.rows[2], d.rows[3]]]];
    panels.forEach(([t, rows], i) => {
      const x = 44 + i * 606;
      box(s, x, 178, 586, 54, C.navy, t, 22, true, C.white);
      rows.forEach(([, k, v], j) => {
        const y = 250 + j * 112;
        box(s, x, y, 586, 100, C.soft);
        text(s, k, x + 20, y + 16, 180, 34, 24, true, C.navy);
        text(s, v, x + 200, y + 18, 366, 70, 21);
      });
    });
    text(s, 'Elementos básicos do custo: materiais, mão de obra e gastos gerais de fabricação.', 44, 486, 1192, 60, 20, false, C.gray);
    takeaway(s, 'Nos serviços, a discussão se concentra na mão de obra e nos gastos de apoio.');
  } else if (n === 5) {
    box(s, 44, 178, 380, 396, C.navy);
    text(s, '19.169', 76, 226, 330, 90, 72, true, C.white);
    text(s, 'organizações contábeis no Estado de São Paulo em maio de 2018', 76, 330, 320, 100, 24, false, C.white);
    text(s, 'O autor associa esse número à concorrência do setor.', 76, 470, 320, 70, 19, false, C.line);
    d.rows.forEach(([k, v, note], i) => {
      const y = 178 + i * 206;
      box(s, 448, y, 788, 190, C.soft);
      text(s, k, 474, y + 20, 740, 34, 24, true, C.navy);
      text(s, v, 474, y + 64, 740, 64, 22);
      text(s, note, 474, y + 140, 740, 30, 20, true, C.blue);
    });
    takeaway(s, d.bottom);
  } else if (n === 6) {
    const num = v => Number(v.replace(/\./g, '').replace(',', '.'));
    const cats = ['Fiscal', 'Contábil', 'Pessoal'];
    const fills = [C.navy, C.blue, C.light];
    charts.push(n);
    const chart6 = s.charts.add('bar', {
      position: { left: 44, top: 166, width: 730, height: 410 },
      title: 'Custo mensal por departamento (R$)',
      titlePlacement: 'aboveChart',
      categories: cats,
      series: d.rows.slice(0, 3).map((r, i) => ({ name: r[0], values: r.slice(1).map(num), fill: fills[i], dataLabelOverrides: r.slice(1).map((v, idx) => ({ idx, text: v, showValue: true, position: 'center', textStyle: { typeface: 'Arial', fontSize: 16, fill: C.white, bold: true } })) })),
      barOptions: { direction: 'column', grouping: 'stacked', gapWidth: 70, overlap: 100 },
      hasLegend: true,
      legend: { position: 'bottom', overlay: false, textStyle: { typeface: 'Arial', fontSize: 17, fill: C.ink } },
      dataLabels: { showValue: true, position: 'center', textStyle: { typeface: 'Arial', fontSize: 16, fill: C.white, bold: true } },
      xAxis: { textStyle: { typeface: 'Arial', fontSize: 18, fill: C.ink }, line: { style: 'solid', fill: C.line, width: 1 } },
      yAxis: { visible: false, majorGridlines: null, textStyle: { typeface: 'Arial', fontSize: 16, fill: C.gray } },
      titleTextStyle: { typeface: 'Arial', fontSize: 18, bold: true, fill: C.gray },
    });
    chart6.dataLabels = { showValue: true, position: 'center', textStyle: { typeface: 'Arial', fontSize: 16, fill: C.white, bold: true } };
    box(s, 806, 178, 430, 396, C.soft);
    text(s, '53%', 836, 204, 380, 84, 72, true, C.navy);
    text(s, 'do custo mensal é comum: R$ 13.046,27 de R$ 24.768,69', 836, 296, 370, 66, 22, true, C.ink);
    text(s, 'R$ 1.896,27 de salários administrativos\nR$ 11.150,00 de custos fixos', 836, 382, 370, 64, 20, false, C.ink);
    text(s, 'Totais publicados por departamento: R$ 7.649,16, R$ 8.377,65 e R$ 8.741,89. Há diferenças de arredondamento de centavos.', 836, 466, 370, 96, 16, false, C.gray);
    takeaway(s, 'Exemplo ilustrativo do Anexo 1. O texto não documenta vínculo com as 11 organizações entrevistadas.');
  } else if (n === 7) {
    const verdict = ['“A forma mais importante para conhecer a realidade da empresa, entretanto não é a melhor”', '“A forma mais fácil, todavia a mais traiçoeira”', '“A menos importante, porém a melhor forma de se precificar”'];
    d.rows.forEach(([k, ref, att], i) => {
      const x = 44 + i * 404;
      card(s, x, 172, 384, 404, k, [['Referência', ref, 56], ['Atenção', att, 56], ['Avaliação da SESCAPLDR', verdict[i], 84]], 19);
    });
    takeaway(s, 'As bases respondem a aspectos diferentes da decisão e podem coexistir na prática.');
  } else if (n === 8) {
    const w = chevrons(s, d.rows.map(r => `${r[0]}. ${r[1]}`), 180, 58, 19);
    d.rows.forEach(([, , v], i) => text(s, v, 44 + i * (w + 8) + 8, 256, w - 40, 84, 20));
    box(s, 44, 368, 1192, 206, C.soft);
    text(s, 'Custo individualizado por unidade no exemplo NIBO (Anexo 1)', 70, 388, 1140, 28, 20, true, C.gray);
    [['Fiscal', 'R$ 2,33'], ['Contábil', 'R$ 1,56'], ['Pessoal', 'R$ 31,22']].forEach(([k, v], i) => {
      const x = 70 + i * 300;
      text(s, v, x, 430, 280, 60, 44, true, C.navy);
      text(s, k + ' por unidade', x, 494, 280, 28, 20);
    });
    text(s, 'O anexo não informa o nome das unidades.', 970, 446, 240, 90, 18, false, C.gray);
    takeaway(s, d.lead);
  } else if (n === 9) {
    d.rows.slice(0, 2).forEach(([k, v], i) => card(s, 44 + i * 606, 172, 586, 216, k, [[null, v, 120]], 22));
    text(s, 'Variáveis que influenciam a formação do preço', 44, 408, 1192, 28, 20, true, C.gray);
    ['Econômicas', 'Mercadológicas', 'Societárias', 'Tributárias', 'Custos da organização'].forEach((v, i) => box(s, 44 + i * 241, 448, 227, 120, i === 4 ? C.navy : C.blue, v, 21, true, C.white, 'center'));
    takeaway(s, d.rows[3][1]);
  } else if (n === 10) {
    text(s, d.lead, 44, 168, 1192, 34, 21, false, C.gray);
    d.rows.forEach(([k, v, note], i) => {
      const x = 44 + i * 606, [num, ...rest] = v.split(' ');
      box(s, x, 218, 586, 356, C.soft);
      box(s, x, 218, 586, 50, i === 0 ? C.blue : C.navy, i === 0 ? 'Declarado: entrevistas' : 'Observado: documentos', 21, true, C.white);
      text(s, num, x + 24, 290, 540, 96, 80, true, C.navy);
      text(s, rest.join(' '), x + 24, 392, 540, 40, 24, true, C.ink);
      text(s, note, x + 24, 446, 540, 70, 21, false, C.gray);
    });
    takeaway(s, d.bottom);
  } else if (n === 11) {
    d.rows.forEach(([k, obs, aim], i) => card(s, 44 + i * 302, 172, 286, 318, k, [['Observa', obs, 64], ['Analisa', aim.replace('Examinar a ', ''), 90]], 21));
    box(s, 44, 506, 1192, 72, C.soft, 'Resultado (slide 13): o texto descreve as quatro variáveis, sem demonstrar relação entre cada uma e o método de preço.', 20, false, C.ink);
    takeaway(s, d.bottom);
  } else if (n === 12) {
    d.rows.forEach(([k, f, ref], i) => card(s, 44 + i * 404, 172, 384, 318, k, [['Foco', f, 60], ['Referências de observação', ref.replace(' O método também cita margem bruta, EBIT, ROE e ROI.', ''), 90]], 21));
    text(s, 'Indicadores financeiros citados no desenho', 60, 520, 470, 40, 20, true, C.gray, 'left', 'middle');
    ['Margem bruta', 'EBIT', 'ROE', 'ROI'].forEach((v, i) => box(s, 540 + i * 176, 510, 164, 60, C.blue, v, 21, true, C.white, 'center'));
    takeaway(s, d.bottom);
  } else if (n === 13) {
    [['11', 'sociedades limitadas'], ['6 a 400', 'colaboradores por escritório'], ['120', 'clientes em média']].forEach(([v, k], i) => {
      const x = 44 + i * 404;
      box(s, x, 172, 384, 150, i === 1 ? C.navy : C.soft);
      text(s, v, x + 24, 192, 340, 70, 56, true, i === 1 ? C.white : C.navy);
      text(s, k, x + 24, 270, 340, 34, 21, false, i === 1 ? C.white : C.ink);
    });
    d.rows.slice(1).forEach(([k, v], i) => {
      const y = 346 + i * 78;
      if (i) rule(s, 44, y - 10, 1192);
      text(s, k, 44, y, 240, 32, 22, true, C.navy);
      text(s, v, 300, y, 936, 62, 21);
    });
    takeaway(s, d.bottom);
  } else if (n === 14) {
    box(s, 44, 166, 586, 412, C.soft);
    text(s, 'Preço: relatos e contratos', 68, 180, 540, 28, 21, true, C.navy);
    for (let i = 0; i < 11; i++) s.shapes.add({ geometry: 'ellipse', position: { left: 68 + i * 48, top: 222, width: 36, height: 36 }, fill: i === 0 ? C.navy : C.light, line: { fill: 'none', width: 0 } });
    text(s, '1 de 11 sócios afirma segurança em usar só o custo. Os outros 10 também observam o mercado.', 68, 272, 540, 56, 19);
    rule(s, 68, 346, 540);
    box(s, 68, 364, 540, 36, C.light);
    box(s, 68, 364, Math.round(540 * 43 / 109), 36, C.navy, '43', 19, true, C.white, 'center');
    text(s, '109 contratos', 68, 404, 540, 24, 16, false, C.gray, 'right');
    text(s, '43 de 109 contratos vinculam o honorário ao salário mínimo, referência que o autor classifica como mercado. O texto não descreve o método dos outros 66.', 68, 436, 540, 120, 19);
    box(s, 650, 166, 586, 260, C.soft);
    text(s, 'Custos: quatro níveis de informação', 674, 180, 540, 28, 21, true, C.navy);
    d.rows[2][1].split('\n').forEach((line, i) => {
      const [k, v] = line.split(': ');
      const y = 220 + i * 50;
      text(s, k, 674, y, 190, 44, 18, true, C.blue);
      text(s, v, 870, y, 350, 44, 19);
    });
    box(s, 650, 438, 586, 140, C.soft);
    text(s, 'Desempenho', 674, 450, 540, 28, 21, true, C.navy);
    text(s, d.rows[1][1], 674, 486, 540, 84, 19);
    takeaway(s, d.bottom);
  } else if (n === 15) {
    const w = chevrons(s, d.rows.map(r => r[0]), 170, 50, 20);
    d.rows.forEach(([, v], i) => text(s, v, 44 + i * (w + 8) + 8, 234, w - 40, 40, 24, true, C.navy));
    text(s, 'Limites da evidência', 44, 312, 1192, 28, 20, true, C.navy);
    d.limits.forEach((v, i) => {
      const y = 356 + i * 76;
      box(s, 44, y + 4, 8, 44, C.blue);
      text(s, v, 70, y, 1166, 56, 20);
    });
    takeaway(s, d.bottom);
  } else if (n === 16) {
    let y = 180;
    d.references.forEach((r, i) => {
      if (i) rule(s, 44, y - 16, 1192);
      text(s, r, 44, y, 1192, i === 0 ? 120 : 84, 20, false, C.ink);
      y += i === 0 ? 136 : 100;
    });
  }
}

const staging = path.join(ROOT, '.codex-finalizer');
const candidatePath = path.join(staging, 'candidate-v7.pptx');
await (await PresentationFile.exportPptx(P)).save(candidatePath);
const finalPath = path.join(ROOT, 'output', process.env.V7_OUTPUT_NAME ?? 'apresentacao_v7.pptx');
const result = await finalizePresentation({ workspaceDir: ROOT, candidatePath, finalPath, pythonExecutable: PYTHON, integrityValidatorPath: path.join(SKILL, 'container_tools/inspect_presentation_package_integrity.py'), layoutValidatorPath: path.join(SKILL, 'container_tools/inspect_presentation_layout_geometry.py'), explicitTotalSlideCount: 16, requiredNativeTableOwnerSlides: [], requiredNativeChartOwnerSlides: charts, materializeLiteralChartWorkbooks: true, fontPolicy: { basis: 'user_request', families: ['Arial'] }, layoutArgs: ['--expected-slide-size-emu', '12192000,6858000', '--validate-heading-fit'], verifyArtifactToolImport: true, receiptPath: path.join(staging, `${path.basename(finalPath)}.validation.json`) });
const total = content.slides.reduce((a, s) => a + s.seconds, 0);
let elapsed = 0;
const script = [`# Roteiro de fala v7\n\nDuração planejada: ${mmss(total)}. Os tempos incluem leitura dos quadros, pausas e transições.\n`];
for (const d of content.slides) {
  script.push(`## ${d.number}. ${HEAD[d.number] ?? d.title}\n\nTempo: ${mmss(d.seconds)}. Faixa: ${mmss(elapsed)} a ${mmss(elapsed + d.seconds)}.\n\n${d.speech}\n\nTransição: ${d.transition}\n\nFontes e páginas:\n\n${d.sources.map(x => '- ' + x).join('\n')}\n`);
  elapsed += d.seconds;
}
await fs.writeFile(path.join(ROOT, 'output', 'roteiro_fala_v7.md'), script.join('\n'));
const imported = await PresentationFile.importPptx(await FileBlob.load(finalPath));
for (let i = 0; i < imported.slides.items.length; i++) {
  const blob = await imported.export({ slide: imported.slides.items[i], format: 'png', scale: 1 });
  await fs.writeFile(path.join(ROOT, 'review', `v7-slide-${i + 1}.png`), new Uint8Array(await blob.arrayBuffer()));
}
console.log(JSON.stringify({ slides: imported.slides.items.length, duration: mmss(total), charts, finalPath, layout: result?.presentationLayout?.findingCount, warnings: result?.presentationLayout?.warnings?.length }));
