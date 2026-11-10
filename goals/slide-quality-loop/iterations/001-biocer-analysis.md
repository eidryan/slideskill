# Iteração 001 — Biocer v0 (baseline rejeitado)

Status: **FAIL**. User feedback: apresentação "horrorosa", com muitos sinais de geração automática.

## Evidência

- 16 slides PPTX criados, 393 auto-shapes e nenhum item de mídia/charts nativos contabilizados na análise anterior.
- Estrutura e exportação passaram por LibreOffice, mas o PowerPoint final não foi inspecionado.
- Slide 3 com texto visivelmente cortado; QA de geometria havia declarado ausência de overflow (**falso negativo**).
- Slide 6 associa verde-azulado a bioativas; slide 11 usa o mesmo destaque para Y-TZP, bioinerte.
- Slides 8 e 10 mostram passos/linhas em vez dos fenômenos físicos de trinca e camadas reativas.
- Títulos, navegação, área branca e rodapé repetem-se quase sem mudança; falta imagem/diagrama disciplinar onde necessária.
- O agente contornou manifesto formal: script ad hoc injetou conteúdos. Esse caminho não prova aderência à SKILL.md.

## Conjecturas refutáveis

- H1: impedir que mecanismos físicos caiam em `sequence` genérico aumenta adequação semântica e reduz assinatura de IA.
- H2: dar à skill precedentes visuais (com casos de uso/erros) aumenta variedade útil versus catálogo puramente textual.
- H3: revisão do render final detecta problemas que QA de shapes não identifica.

## Mudança proposta

Introduzir visual-spec/semantic scene contract, exemplos originais com previews, 2 alternativas por fenômeno complexo, inspeção de screenshots e comparações contra baseline.

A avaliação do modelo não deve usar a v0 aprovada como inspiração; v0 é **exemplo negativo**. Ver issue #6.
