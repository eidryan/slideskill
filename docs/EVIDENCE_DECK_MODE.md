# Modo evidência: o que fez o deck Adm Fin v7 funcionar

Este é o modo padrão para decks de argumento (acadêmicos, executivos, propostas), em que o conteúdo é texto, número e relação lógica. O pivô de direção de arte (`ART_DIRECTION_PIVOT.md`) vale só para slides cujo conteúdo é um objeto ou fenômeno físico (prótese, micrografia, equipamento). Não aplique os gates de imagem a um deck de dados ou de argumento: o Adm Fin v7 foi aprovado sem nenhuma foto.

Caso de referência: `projects/admfin-precificacao/` (16 slides, aprovado em 05/10/2026, "gostei de como ficou"). Veja `output/thumbnails/` e `output/apresentacao_v7.pdf`.

## Portões obrigatórios para começar e entregar um NOVO deck

**Esta checklist precede a escolha de template, tipografia ou ferramentas.** Adm Fin v7 é uma aprovação do caso Adm Fin, não aprovação automática de decks que copiem Arial/marinho/tracker.

| Gate | Evidência de entrada/saída exigida | Se faltar |
|---|---|---|
| G0 · Fonte | Inventário com material do professor/autor, arquivos, datas, números e lacunas | BLOCKED_SOURCE |
| G1 · Feedback | Backlog de pedidos e críticas com IDs, prioridade e cobertura final para cada ID | BLOCKED_BACKLOG |
| G2 · Argumento | Uma tese, SCQA, storyline e leitura sequencial dos títulos, antes do primeiro layout | BLOCKED_STORY |
| G3 · Evidência | Storyboard: cada título → claim → dado/figura que prova → fonte → inferência proibida → cortes | BLOCKED_EVIDENCE |
| G4 · Referências visuais | 2–3 decks reais examinados em imagem/página; comparar densidade e codificação, não só citar nomes | BLOCKED_REFERENCE |
| G5 · Produção | Conteúdo revisado e congelado em manifesto separado; gerar versão segura; aplicar construção visual por relação lógica | BLOCKED_BUILD |
| G6 · Gráficos | Se a página é gráfico quantitativo editável: objeto de gráfico nativo/Excel; shapes só se declarados como desenho estático | BLOCKED_CHART |
| G7 · QA real | PPTX aberto e renderizado no Microsoft PowerPoint, imagens de todas as páginas, formatos pt-BR e clipping conferidos | BLOCKED_POWERPOINT |
| G8 · Independência | Revisor diferente do criador compara dados, citações, tese e layout com as fontes e registra achados | BLOCKED_REVIEW |
| G9 · Aprovação | Decisão humana explícita; o criador não pode autoaprovar estética; guardar status e problemas residuais | BLOCKED_APPROVAL |

**Regra de entrega:** uma planilha de checks ou CI estrutural nunca é substituto dos gates G7–G9. Na ausência de PowerPoint ou revisor externo, registrar bloqueio e entregar apenas como EXPERIMENTO, sem anunciar apresentação pronta.

**Validação estrutural reproduzível:** preencher um manifesto evidence-gates-v1, executar python scripts/validate_evidence_release.py <manifesto> e, para publicação, repetir com --release. Este teste apenas verifica artefatos e bloqueios declarados; não detecta layouts feios nem verifica fatos sem revisor.

### Antiexemplo de regressão: Logística v9

A tentativa de reproduzir Adm Fin v7 com fontes/cores/tracker e um gráfico desenhado em retângulos foi rejeitada. Ver goals/slide-quality-loop/iterations/009-logistica-v9-rejected.md e projects/logistica-efeito-chicote/reviews/v9-gates.json. **Não gerar mais um v10 diretamente das coordenadas de v9.**

## Sequência que produziu o v7

1. **Backlog por ID.** O feedback do autor (cerca de 20 min de voz) foi dividido em 264 IDs antes de qualquer plano. No fim cada ID recebeu um estado: implementado, backup, excluído por decisão ou resolvido na fonte (`review/backlog_coverage_v6.md`).
2. **Estratégia antes de operação.** Ordem fixa: propósito e tese → storyline (Minto, SCQ; os títulos lidos em sequência contam a história) → storyboard com título e esboço da evidência por slide → cada slide como argumento visual → sistema visual por último.
3. **Referências reais de densidade.** Antes de desenhar, abrir dois ou três decks públicos de consultoria e igualar a densidade: Arial, corpo de 10 a 14 pt, tabela ou gráfico ocupando o corpo, cinza para contexto e uma cor de destaque, barra lateral de leitura, tracker de seção, rodapé com fonte.
4. **Manifesto de conteúdo separado do design.** `content.json` guarda texto, fala, tempo e páginas de fonte e foi auditado contra a fonte uma vez. O redesenho (`build_v7.mjs`) só acrescenta título de ação, layout e tracker. Erro factual novo fica impossível por construção.
5. **Versão segura antes do redesenho** quando a entrega é no mesmo dia.
6. **Layout segue a relação lógica.** Fluxo em setas, comparação em cartões lado a lado, número único grande, decomposição de custo em barra empilhada, concentração em gráfico de barras ordenado. A variável visual (altura, cor, posição) significa só o que o título afirma.
7. **Uma tese por slide e lista de cortes.** O que não prova a tese vai para notas, rodapé ou anexo. A cor de destaque segue a afirmação do título.
8. **Revisor independente contra as fontes.** Achou citações aprovadas que tinham sido removidas e fontes abaixo do mínimo. A autorrevisão não viu.
9. **Render no PowerPoint real** (PDF por COM), não só no preview. Achou marcadores ocos em cor de tema, nulos desenhados como zero e suavizados, números no formato americano em deck brasileiro.
10. **Material de ensaio do mesmo manifesto:** notas em tópicos com palavras-chave e próximo slide, roteiro em PDF (`output/roteiro_fala_v7.*`), áudio edge-tts a 1,25x dizendo "Slide N" e omitindo fontes.

## Por que as versões anteriores falharam

| Versão | O autor disse | Causa | Regra |
|---|---|---|---|
| v1 | parecia feito por IA | números de 54 pt em cartões, citações em cartão, colunas de uma linha | densidade de evidência |
| v3 | slides dispersos | duas teses por título; visual sugeria o contrário do dado | uma tese, uma codificação verdadeira |
| v3 | referência de página sob cada item | fonte no lugar errado | fonte só no rodapé |
| v7 | caixa idêntica em todos os slides | elemento de layout tratado como obrigatório | caixa de conclusão é exceção (3 a 5 em 16 slides) |

## Teste de "cara de template"

Abra todas as miniaturas lado a lado. Qualquer elemento idêntico em todos os slides (caixa, faixa, kicker, rodapé decorado) é marca de template. Tracker e número de página são os únicos repetidos aceitáveis.

## O que este modo não promete

O v7 não tem fotografia nem direção de arte própria. Ele resolve "parece template de IA" com densidade, relação lógica e rigor, não com imagem. Se o autor quiser outra linguagem visual além desta, é um experimento novo (ver `goals/slide-quality-loop/`), que deve partir do v7 como baseline e provar ganho sobre ele.

## Para reproduzir

- Regras completas e sistema visual 16:9: `projects/_shared/editorial-rules.md`.
- Especificação slide a slide: `projects/admfin-precificacao/storyboard.md`.
- Implementação de referência (não portátil, usa runtime local): `reference-implementation/build_v7.mjs`. Para gerar em outra máquina use `scripts/build_deck.mjs` e copie as decisões, não o código.
- O PPTX não é versionado (`.gitignore`); o PDF e as miniaturas estão em `output/`.

## Régua de consultoria (o que "nível consultoria" quis dizer aqui)

O primeiro deck tinha títulos de ação mas parecia template de IA: números de 54 pt, citações em cartão, três colunas de uma linha, muito espaço vazio. Queixa do autor: "não parece que foi feito por consultoria; alguns slides parecem preguiçosos". Decks reais de consultoria usados como referência (PDFs de terceiros, não redistribuídos aqui): Bain, private equity 2023; Bain, estudo de 2009; McKinsey, setor elétrico do Reino Unido, 2012. O que têm em comum:

- Arial, corpo de 10 a 14 pt, tabela ou gráfico ocupando o corpo da página.
- Cinza para contexto e uma única cor de destaque.
- Barra lateral de "leitura" com 2 a 4 frases ligadas aos números do exhibit.
- Tracker de seção, notas numeradas e linha de fonte no rodapé.
- Sumário executivo em frases completas.

Regra: antes de montar um deck "de consultoria", abrir dois ou três decks públicos reais e igualar a densidade. Todo slide de conteúdo carrega evidência que prova o título; slide que é só citação ou só número vira parte de outro que tem evidência.

## Sistema visual usado no v7 (16:9)

| Item | Valor |
|---|---|
| Grade | Margens laterais 0,45 pol. Tracker no topo à direita; título y 0,35 a 1,25; corpo y 1,75 a 6,55; rodapé y 6,70 a 7,25 |
| Composição A | Exhibit à esquerda (8,9 pol.) e caixa "Leitura" à direita (3,3 pol.) |
| Composição B | Tabela, matriz ou fluxo em largura total, com a conclusão dentro do exhibit |
| Tipografia | Arial. Título 22 pt negrito; corpo e tabela 12 a 14 pt; rótulo de gráfico 11 pt; mínimo 11 pt em sala |
| Cores (v7) | Marinho `0B2545` só para o dado que prova o título; azul `3E5C76`; cinzas `5B6670`, `9AA5B1`, `D9DEE3`, `EEF1F4`; texto `1F2328`; laranja `C2410C` só para perda ou desvio negativo |
| Código de preenchimento | Contorno = declarado pelos sócios; preenchido = observado em documento ou número |
| Gráficos | Nativos do PowerPoint, estilo único, sem borda, grade horizontal clara, rótulo só onde o título precisa |
| Seções do tracker | Contexto (1-2), Fundamentos (3-9), Método (10-12), Resultados (13-14), Conclusões (15-16) |

## Lições de origem (do diário do autor)

**Uma tese, uma codificação verdadeira, uma lista de cortes.** Falhas do v3 e a causa de cada uma:
- Escada em que os degraus vazios continuavam subindo: altura sugeria progresso enquanto o preenchimento dizia "não tem". Cada variável visual significa uma coisa verdadeira, a que o título afirma.
- Título com duas afirmações ligadas por "e" gerou slide com frases soltas. O que não prova a tese vai para notas, rodapé ou anexo.
- Referência de página sob cada item puxava o olho na fala. Fontes ficam no rodapé.
- A cascata destacava mão de obra, mas o título falava de custo comum a todos. A cor de destaque segue o título.

No storyboard, escreva para cada slide a tese única, o que o visual codifica e a lista de cortes. Compare o slide renderizado com a tese antes de polir.

**Caixa de conclusão idêntica em todos os slides** foi a única coisa que ainda parecia template no v7. Usar só quando o slide precisa de algo que o título não carrega (ressalva, ponte, mensagem central); de 3 a 5 em 16 slides.

## Como replicar, passo a passo

1. Reúna a fonte e a entrada do autor (aqui: `replication/inputs/spec-*.md` e o backlog de voz).
2. Gere o backlog por ID e mantenha a tabela de cobertura (`review/backlog_coverage_v6.md` mostra o formato).
3. Escreva tese, storyline e storyboard (`storyboard.md` é o modelo, com tese, codificação e cortes por slide).
4. Monte o manifesto de conteúdo e audite uma vez contra a fonte (`replication/content_v6.json` é o modelo de campos).
5. Construa a camada de design sobre o manifesto (`replication/artifact-tool/build_v7.mjs` mostra título de ação, layout por relação e tracker; as iterações v1 a v5 em PptxGenJS estão em `replication/pptxgenjs-iterations/` e rodam com `npm install` e `node`).
6. Exporte pelo PowerPoint real e confira miniaturas, fontes mínimas, números no formato do idioma, nulos e marcadores (`replication/checks/validate_main.ps1`).
7. Revisão independente contra as fontes (`replication/checks/final_review_v6.md` é o modelo).
8. Gere notas, roteiro e áudio de ensaio do mesmo manifesto.

O PPTX aprovado está em `projects/admfin-precificacao/output/apresentacao_v7.pptx` para abrir e comparar.

## Lacunas conhecidas

- A exportação por COM do PowerPoint para PDF e o áudio edge-tts foram feitos ad hoc na sessão; não há script guardado.
- `build_v6.mjs` e `build_v7.mjs` dependem do runtime `@oai/artifact-tool`; um port para PptxGenJS não existe.
- A dissertação usada como fonte e os PDFs de referência não estão no repositório.
