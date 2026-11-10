# GOAL: desenvolver uma skill que produza slides visualmente convincentes

**Status:** active / human-in-the-loop · **Início:** 2026-11-09 · **Owner:** revisão humana + agente executor.

## Outcome mensurável

A skill deve produzir decks com argumento claro, representação semântica correta, variedade composicional intencional, fidelidade às fontes e editabilidade, evitando sinais recorrentes de "slide genérico de IA".

### Definition of Done (não reduzida a um score)

- 3 decks heterogêneos (científico, consultoria/dados, ensino/pitch) produzidos a partir de materiais previamente congelados.
- Avaliação humana cega: cada deck deve superar o baseline com as mesmas fontes e tempo comparável; registrar notas e comentários de pelo menos 2 revisores sempre que possível.
- Zero bloqueadores: fatos inventados, evidência sem fonte, geometria que comunica relação falsa, corte visual real, cor semanticamente inconsistente.
- Editabilidade verificada no PowerPoint final, não só na estrutura OOXML ou no LibreOffice.
- Regressão: ao corrigir um caso não degradar outro; registrar limitações e falhas.
- Catálogo visual de exemplos positivos e **antiexemplos** com proveniência, casos de uso e imagens acessíveis.

## Loop de trabalho (rodar uma iteração por execução, não simular cron job)

1. **Research:** selecionar um fracasso observável; pesquisar 2+ fontes sobre o tipo de problema e 3+ referências de alta qualidade com origem/licença anotadas. Não tratar Reddit/opinião como evidência empírica.
2. **Hypothesis:** escrever uma causa testável e uma mudança atômica na metodologia ou na biblioteca. Definir antecipadamente o que faria a hipótese falhar.
3. **Freeze test:** congelar fontes, requisitos, brief, baseline visual, data e ID da skill/branch. Evitar que o agente use a solução anterior como gabarito.
4. **Apply:** atualizar regras, catálogo e/ou motor com commit pequeno, preservando os casos de regressão.
5. **Run:** gerar PPTX e render de todos os slides. Para slides-chave, produzir 2 alternativas estruturais distintas; registrar escolhas e alternativas rejeitadas.
6. **Critique:** comparar deck inteiro + slides em escala real; cruzar números/fontes; verificar semântica de cor, representação física, legibilidade, falsos positivos do QA e "cara de IA".
7. **Feedback humano:** pedir notas e comentários por IDs de falha (qual slide, o quê, por quê); não interpretar silêncio como aprovação.
8. **Promotion:** só elevar regra para docs/_shared/ ou SKILL.md se o teste mostrar benefício sem regressão. Atualizar catálogo, avaliação, issue e próxima hipótese.

**Parada:** se teste não renderiza, falta fonte material ou há dado não verificado, registrar BLOCKED/NOT_VERIFIED e não fingir sucesso. O loop não roda automaticamente entre conversas; cada rodada é acionada por usuário/agent.

## Métricas e gates

| Sinal | Medida | Objetivo |
|---|---|---|
| Aderência à tese | Evidência realmente demonstra a frase | Revisão independente / 0 blocker |
| Relação visual | Elementos representam mecanismo, comparação, tempo ou causalidade verdadeira | 0 erro semântico |
| Evidência & fonte | Números/afirmações rastreáveis | 100% para fatos críticos |
| Ritmo do deck | Composições diferentes por necessidade, sem quotas artificiais | Parecer de 2 revisores |
| Clipping real | PNG/PDF + PowerPoint, não só bounding boxes | 0 |
| Criatividade útil | Alternativas mudam codificação, não paleta | 2+ para slides críticos |
| Edição final | Texto, valores, gráficos essenciais editáveis | Teste no PowerPoint |
| Aparência genérica | Checklist de padrões de IA + crítica cega | Melhor que baseline |

Score de 1–5 por argumento, representação, composição, tipografia, ritmo, fidelidade e editabilidade. Uma média boa **não substitui** gate crítico.

## Casos

- [Biocerâmicas](../../projects/biocer-materiais/): primeiro ciclo. Revisão v0 revelou texto cortado e ausência de representação física. Alternativas A/B renderizadas (PPTX em artefato da sessão; não integram o repo por enquanto).
- [Logística / efeito chicote](../../projects/logistica-efeito-chicote/): próximo caso, mas depende de separar simulação, dados verificados e casos ainda sem fonte.
- [Adm Fin](../../projects/admfin-precificacao/): regressão aprovada, não template obrigatório.

## Registros

- [Iteração 001: cold-run e pesquisa](iterations/001-biocer-analysis.md)
- [Iteração 002: padrões visuais e testes A/B](iterations/002-visual-ab.md)
- [Iteração 003: deck completo, render e revisão](iterations/003-biocer-full-deck.md)
- [Iteração 004: pivô de linguagem visual após rejeição humana](iterations/004-html-look-pivot.md)
- [Iteração 005: piloto com gerador visual externo e gate de proveniência](iterations/005-asset-first-pilot.md)
- [Iteração 006: A v5 reprovada; alternativas com foco editorial](iterations/006-chart-focus.md)
- [Iteração 007: rejeição da linguagem de UI, troca do pipeline para design-first](iterations/007-code-first-stop.md)
- [Iteração 008: Logística, duas direções editoriais criadas no Canva](iterations/008-logistica-visual-first.md)
- [Iteração 009: auditoria de rejeição da Logística v9 e portões de processo](iterations/009-logistica-v9-rejected.md)
- [Referências externas verificáveis](research/visual-source-index.md)
- [Catálogo de exemplos originais](../../examples/visual-casebook/README.md)

**Next gate:** gerar e revisar um deck completo com a nova política; apenas depois promover os resultados para as regras centrais. Não confundir testes de 3 slides com validação de deck inteiro.
