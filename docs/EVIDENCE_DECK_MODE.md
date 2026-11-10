# Modo evidência: o que fez o deck Adm Fin v7 funcionar

Este é o modo padrão para decks de argumento (acadêmicos, executivos, propostas), em que o conteúdo é texto, número e relação lógica. O pivô de direção de arte (`ART_DIRECTION_PIVOT.md`) vale só para slides cujo conteúdo é um objeto ou fenômeno físico (prótese, micrografia, equipamento). Não aplique os gates de imagem a um deck de dados ou de argumento: o Adm Fin v7 foi aprovado sem nenhuma foto.

Caso de referência: `projects/admfin-precificacao/` (16 slides, aprovado em 05/10/2026, "gostei de como ficou"). Veja `output/thumbnails/` e `output/apresentacao_v7.pdf`.

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
