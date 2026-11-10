import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { Presentation, PresentationFile, FileBlob } from '@oai/artifact-tool';

const ROOT = '<LOCAL_PATH>';
const SKILL = '<LOCAL_PATH>';
const PYTHON = '<LOCAL_PATH>';
process.env.RUNTIME_NODE_MODULES = '<LOCAL_PATH>';
process.env.RUNTIME_NODE = '<LOCAL_PATH>';
const { finalizePresentation } = await import(pathToFileURL(path.join(SKILL, 'container_tools/artifact_tool_utils.mjs')));
const content = JSON.parse(await fs.readFile(path.join(ROOT, 'content_v6.json'), 'utf8'));
const C = { navy: '#0B2545', ink: '#1F2328', gray: '#5B6670', line: '#D9DEE3', soft: '#EEF1F4', white: '#FFFFFF' };
const P = Presentation.create({slideSize: {width: 1280, height: 720}});
const total = content.slides.reduce((a,s)=>a+s.seconds, 0);
if (content.slides.length !== 16 || total > 1770) throw new Error('Slide count or time contract failed');
const mmss = n => `${Math.floor(n / 60)}:${String(n % 60).padStart(2,'0')}`;
const nativeTables = [];

function text(s, txt, x, y, w, h, size=20, bold=false, color=C.ink, align='left') {
  const shape = s.shapes.add({geometry:'textbox',name:`text-${s.shapes.items.length}`,position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
  shape.text = txt;
  shape.text.style = {typeface:'Arial',fontSize:size,bold,color,alignment:align,verticalAlignment:'top',autoFit:'none',wrap:'square',insets:{left:0,right:0,top:0,bottom:0}};
  return shape;
}
function rule(s, x, y, w, color=C.line, weight=1) {
  return s.shapes.add({geometry:'line',position:{left:x,top:y,width:w,height:0},fill:'none',line:{fill:color,width:weight}});
}
function base(d) {
  const s=P.slides.add(); s.background.fill=C.white;
  if(d.number!==1) {
    text(s,d.title,44,60,1192,60,29.333,true,C.navy);
    rule(s,44,130,1192);
  }
  text(s,'Contexto · Fundamentos · Método · Resultados',700,18,536,25,16,false,C.gray,'right');
  text(s,String(d.number),1180,674,56,24,16,false,C.gray,'right');
  s.speakerNotes.textFrame.setText(`Tempo: ${mmss(d.seconds)}\n\nFala:\n${d.speech}\n\nTransição:\n${d.transition}\n\nFontes e páginas:\n${d.sources.join('\n')}`);
  return s;
}
function bottom(s, txt, y=581,h=66) { rule(s,44,y-16,1192); text(s,txt,44,y,1192,h,20,false,C.gray); }
function table(s,d,y=218,heights=null) {
  const values=[d.headers,...d.rows];
  const hs=heights??[56,...d.rows.map(()=>76)];
  const t=s.tables.add({rows:values.length,columns:values[0].length,left:44,top:y,width:1192,height:hs.reduce((a,b)=>a+b),columnWidths:d.widths,values});
  t.styleOptions={headerRow:false,bandedRows:false};
  t.borders.assign({fill:C.line,width:0.6,style:'solid'});
  t.cells.block({row:0,column:0,rowCount:values.length,columnCount:values[0].length}).assign({fill:C.white,textStyle:{typeface:'Arial',fontSize:20,color:C.ink},margins:{left:14,right:14,top:12,bottom:8},anchor:'center'});
  for(let r=0;r<values.length;r++) {
    t.rows[r].height=hs[r];
    for(let c=0;c<values[0].length;c++) {
      const cell=t.getCell(r,c);
      cell.text.style={typeface:'Arial',fontSize:20,bold:r===0||c===0,color:r===0?C.navy:C.ink,autoFit:'none',verticalAlignment:'middle'};
      if(r===0)cell.fill=C.soft;
    }
  }
  nativeTables.push(d.number);
  return t;
}
for (const d of content.slides) {
  const s=base(d);
  if(d.layout==='cover') {
    text(s,'ADMINISTRAÇÃO FINANCEIRA II',44,174,1192,30,18,true,C.gray);
    text(s,d.title,44,226,1110,135,42.666,true,C.navy);
    rule(s,44,399,210,C.navy,2);
    text(s,d.subtitle,44,428,1110,45,24,false,C.gray);
    text(s,'Universidade Presbiteriana Mackenzie · 2018',44,478,1110,35,20,false,C.gray);
    text(s,d.body,44,580,1110,65,20);
  } else if(d.layout==='rows') {
    d.rows.forEach(([k,v],i)=>{const y=176+i*113; if(i)rule(s,44,y-18,1192);text(s,k,44,y,235,52,22,true,C.navy);text(s,v,300,y,918,82,22);});
  } else if(d.layout==='contingency') {
    text(s,d.lead,44,166,1192,64,24);
    d.rows.forEach(([k,v],i)=>{const y=264+i*94;text(s,k,44,y,330,38,24,true,C.navy);text(s,v,403,y,833,60,22);if(i<2)rule(s,44,y+69,1192);});
    bottom(s,d.bottom,588,52);
  } else if(d.layout==='table') {
    text(s,d.lead,44,165,1192,56,22);
    const hs=d.number===12?[58,82,114,82]:d.rows.length===3?[58,94,94,94]:[56,73,73,73,73];
    table(s,d,222,hs);
    bottom(s,d.bottom,d.number===12?594:602,66);
  } else if(d.layout==='services') {
    text(s,d.lead,44,165,1192,69,22);
    d.rows.forEach(([k,v,n],i)=>{const y=274+i*151;text(s,k,44,y,300,46,22,true,C.navy);text(s,v,370,y,866,69,24);text(s,n,370,y+78,866,32,20,false,C.gray);if(i===0)rule(s,44,y+128,1192);});
    bottom(s,d.bottom,589,62);
  } else if(d.layout==='allocation') {
    text(s,d.lead,44,166,1192,42,24);
    table(s,d,225,[56,67,67,67,67]);
    bottom(s,d.bottom,587,66);
  } else if(d.layout==='cost') {
    text(s,d.lead,44,166,1192,44,24);
    d.rows.forEach(([n,k,v],i)=>{const y=237+i*73;text(s,n,44,y,48,34,24,true,C.gray);text(s,k,105,y,327,40,23,true,C.navy);text(s,v,476,y,760,54,22);if(i<3)rule(s,105,y+55,1131);});
    bottom(s,d.bottom,584,75);
  } else if(d.layout==='method') {
    text(s,d.lead,44,166,1192,64,23);
    d.rows.forEach(([k,v,n],i)=>{const x=44+i*622;text(s,k,x,267,560,40,22,true,C.gray);text(s,v,x,318,558,88,28,true,C.navy);text(s,n,x,424,558,96,22);});
    bottom(s,d.bottom,586,72);
  } else if(d.layout==='results') {
    table(s,d,172,[52,87,84,151,89]);
    rule(s,44,646,1192);
    text(s,d.bottom,44,652,1136,32,18.667,false,C.gray);
  } else if(d.layout==='conclusions') {
    text(s,d.lead,44,164,1192,58,24,true,C.navy);
    d.rows.forEach(([k,v],i)=>{const x=44+i*402;text(s,k,x,249,380,28,18,true,C.gray);text(s,v,x,286,380,45,24,true,C.navy);});
    rule(s,44,350,1192);
    d.limits.forEach((v,i)=>text(s,v,44,378+i*63,1192,57,21));
    bottom(s,d.bottom,596,66);
  } else if(d.layout==='references') {
    let y=179;
    d.references.forEach((r,i)=>{text(s,r,44,y,1192,i===0?138:97,21,i===0,C.ink); y+=i===0?153:112;});
  }
}
const staging=path.join(ROOT,'.codex-finalizer');
await fs.mkdir(staging,{recursive:true});
await fs.mkdir(path.join(ROOT,'output'),{recursive:true});
const candidatePath=path.join(staging,'candidate-main.pptx');
await (await PresentationFile.exportPptx(P)).save(candidatePath);
const finalPath=path.join(ROOT,'output',process.env.MAIN_OUTPUT_NAME??'apresentacao_v6.pptx');
const result=await finalizePresentation({workspaceDir:ROOT,candidatePath,finalPath,pythonExecutable:PYTHON,integrityValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_layout_geometry.py'),explicitTotalSlideCount:16,requiredNativeTableOwnerSlides:nativeTables,requiredNativeChartOwnerSlides:[],fontPolicy:{basis:'user_request',families:['Arial']},layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit',...nativeTables.flatMap(n=>['--require-native-table-slide',String(n)])],verifyArtifactToolImport:true,receiptPath:path.join(staging,`${path.basename(finalPath)}.validation.json`)});
let elapsed=0;
const script=[`# Roteiro de fala v6\n\nDuração planejada: ${mmss(total)}. Os tempos incluem leitura dos quadros, pausas e transições.\n`];
for(const d of content.slides) {
  script.push(`## ${d.number}. ${d.title}\n\nTempo: ${mmss(d.seconds)}. Faixa: ${mmss(elapsed)} a ${mmss(elapsed+d.seconds)}.\n\n${d.speech}\n\nTransição: ${d.transition}\n\nFontes e páginas:\n\n${d.sources.map(s=>'- '+s).join('\n')}\n`); elapsed+=d.seconds;
}
await fs.writeFile(path.join(ROOT,'output','roteiro_fala_v6.md'),script.join('\n'));
const imported=await PresentationFile.importPptx(await FileBlob.load(finalPath));
for(let i=0;i<imported.slides.items.length;i++) {
  const s=imported.slides.items[i];
  const blob=await imported.export({slide:s,format:'png',scale:1});
  await fs.writeFile(path.join(ROOT,'review',`main-slide-${i+1}.png`),new Uint8Array(await blob.arrayBuffer()));
  const layout=await s.export({format:'layout'});
  await fs.writeFile(path.join(ROOT,'review',`main-slide-${i+1}.layout.json`),await layout.text());
}
await fs.writeFile(path.join(staging,'main-build-summary.json'),JSON.stringify({slides:16,totalSeconds:total,duration:mmss(total),nativeTables,finalPath,validation:result},null,2));
console.log(JSON.stringify({slides:16,duration:mmss(total),nativeTables,finalPath,rendered:16}));
