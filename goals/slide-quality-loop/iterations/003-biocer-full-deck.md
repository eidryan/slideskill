# Iteração 003 · Biocerâmicas: deck completo guiado por semântica

**Data:** 2026-11-09 · **Status:** PROTOTYPE / EDITORIAL NOT APPROVED · **Teste:** 16 slides. Não é cold-run cego.

## Pergunta de pesquisa

O que ocorre se a forma do exhibit vier do mecanismo físico/quantitativo, em lugar de um fluxo genérico ou uma tabela? O deck continua repetitivo? O QA consegue bloquear transbordamento de objetos?

## Pesquisa consultada

- Naegle (2021), *Ten simple rules for effective presentation slides* (PLoS Computational Biology): uma mensagem por slide, título que expressa ideia central, gráficos que ajudem a entender e evitar sobrecarga. https://pmc.ncbi.nlm.nih.gov/articles/PMC8638955/
- SlidePoise, código e método: explora referências + composições e reconstrói editável, com revisão por render. **Não foi instalado neste teste.** https://github.com/henryhyw/slidepoise
- SlideAudit: taxonomia de defeitos de slides, útil para QA. https://pmc.ncbi.nlm.nih.gov/articles/PMC13227769/
- Esquema de tenacificação na literatura, para compreender o fenômeno sem redistribuir figuras: https://www.mdpi.com/2304-6767/12/3/47
- Fontes materiais: `projects/biocer-materiais/source/relatorio.md`, `source/slides-v1.md`, `data/*.csv`. Os artigos primários citados no relatório **não foram reabertos** nesta rodada.

## Hipótese e mudança aplicada

Hipótese: desenhar interfaces, zonas de transformação e camadas, e tratar dados como intervalos com eixos e unidades, elimina alguns sintomas de layout genérico e torna a tese mais demonstrável.

Aplicação guiada (PptxGenJS ad hoc):
- 16 páginas, com capa escura, esquemas de microestrutura/interface, gráficos de intervalos, corte de material e uma equação final.
- Slides 5, 8, 10 e 13 planejados pela relação visual, sem forçar `sequence` com círculos.
- Sem importação de fotografias ou slides comerciais. A silhueta dentária do slide 14 é um SVG autoral (não é objeto PowerPoint nativo).
- Slide 15 foi reconstruído na **mesma rodada** após detectar que havia voltado ao padrão de dois cards.
- Cores de classe continuam: bioinerte azul, bioativa verde-azulada, reabsorvível âmbar.

## Resultado observável

| Checagem | Baseline v0 rejeitado | Iteração 003 |
|---|---|---|
| Slides | 16 | 16 |
| Objetos PowerPoint | 393 | 636 |
| Partes de notas | 16 | 16 |
| Objetos fora do canvas (via geometria OOXML) | **3 (slide 3)** | **0** |
| Blocos de texto fora do PDF (PyMuPDF) | 1 (slide 3) | 0 |
| Conteúdo visual | Quase todo texto e linha / passos genéricos | Elementos físicos e científicos originais; alguns ainda esquemáticos |
| Renderizador testado | LibreOffice | LibreOffice |
| PowerPoint real | Não | **Não** |
| Aprovação humana | Rejeitado | **Pendente** |

A contagem de objetos não é métrica de qualidade; serve para indicar editabilidade e cobertura da verificação estrutural. A maior parte do deck permanece em texto e formas nativas, com SVG usado numa ilustração. Não confundir com gráficos de dados nativos.

## Revisão por slide (foco)

- **05:** melhora marginal porque o baseline já tinha um gráfico correto. O ganho é titular o ponto de contato (30 GPa) e preservar faixas; ainda poderia haver zoom explícito na região do osso.
- **08:** deixa de ser apenas três círculos numerados; agora há trinca, grãos e região transformada. Ainda falta uma representação mais rigorosa de tensão compressiva e da mudança t→m.
- **10:** corte de vidro/gel/fosfato/apatita é mais específico que cinco segmentos. **Risco:** as faixas empilhadas podem sugerir espessura ou coexistência temporal não comprovada; a legenda diz 'sem escala', mas uma alternativa com estados poderia ser melhor.
- **14:** o desenho do dente inicial era geométrico demais. Foi substituído por SVG autoral de seção simplificada, com ressalva; ainda é esquemático e parcial em editabilidade.
- **15:** o primeiro rascunho era dois cards sem prova. Foi refeito para usar a equação de Griffith e diferenciar defeito (a) de tenacidade (KIC). A nomenclatura tipográfica das variáveis e as mini-ilustrações ainda exigem revisão técnica.

## O que este teste NÃO prova

1. Não demonstra que a skill conseguiu isso de forma autônoma: o processo foi dirigido e o motor é um script de experimento.
2. Não compara a mesma tarefa com SlidePoise instalado. O runtime do SlidePoise não está acessível nesta sessão, e geração de imagens não foi executada.
3. Não garante editabilidade de cada componente: a ilustração dentária é SVG.
4. Não valida a exatidão das referências bibliográficas primárias, microestruturas ou requisitos clínicos.
5. A captura por LibreOffice não substitui renderização e inspeção no Microsoft PowerPoint.
6. Mesmo no novo deck há uniformidade de títulos, rodapés e margens. O ritmo visual continua um problema potencial.

## Decisão de método (experimental, sem promoção automática)

Uma árvore `sequence` não é suficiente para mecanismos físico-químicos. Exigir `scene_objects`, relações espaciais e prova da representação antes da escolha de layout. Fazer inspeção **dupla**: (a) do PPTX/OOXML para limites objetivos, (b) de todas as páginas renderizadas para o que as pessoas realmente veem.

Não promover uma regra de "todos os slides têm que ter uma figura" ou "layouts têm de variar X vezes": a forma deve responder à comunicação, não ao detector superficial de IA.

## Próximo experimento

Um agente **independente**, sem acesso ao deck de saída v0/v3, deve receber brief + fontes + skill no commit congelado e gerar um deck. Avaliar às cegas v0, v3 e o novo deck: argumento, ciência visual, nível de clichê, legibilidade e fidelidade. A seguir testar o SlidePoise sob as mesmas fontes se instalação e geração de imagem estiverem disponíveis.

**Arquivos da geração:** o PPTX/PDF/contact sheet e o script experimental foram produzidos no ambiente desta conversa. Eles não estão versionados como binários no repositório público; o código-fonte foi disponibilizado separadamente para download nesta iteração.
