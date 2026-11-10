# Iteração 008 — Logística: piloto visual fora do motor HTML-like

**Data:** 2026-11-10. **Status:** DUAS PROPOSTAS EDITÁVEIS GERADAS / REVISÃO ESTÉTICA HUMANA PENDENTE / QA DE CONTEÚDO COM BLOQUEADORES.

## Material de origem
- `projects/logistica-efeito-chicote/brief.md`, `storyboard.md`, `sources.md`.
- `data/ec2-indicadores-walmart-macys.csv` — dados do Estudo de Caso 2 do grupo, sem data da amostra explicitada.
- Tempo do seminário: ~12 min de fala, máximo 15 min com perguntas.

## Mudança real em relação à iteração 007
**Não compusemos outro PPTX com as primitivas PptxGenJS.** Usamos o gerador visual do Canva para produzir design visual editável antes de qualquer reconstrução PowerPoint.

- **Direção A:** 10 slides, storytelling acadêmico-editorial, imagens de armazéns como contexto e dados no centro. `DAHahEykag4` — [abrir no Canva](https://www.canva.com/design/DAHahEykag4/). Todas as 10 páginas confirmadas não vazias na inspeção do editor.
- **Direção B:** 3 slides alternativos, composição de atlas de dados e contrastes numéricos; não é deck completo. `DAHahEijY4c` — [abrir no Canva](https://www.canva.com/design/DAHahEijY4c/). 3/3 páginas com conteúdo.
- Ambas são editáveis no Canva. Não exportadas nem validadas como PPTX e não inspecionadas no Microsoft PowerPoint.
- Design de composição ainda não aprovado pela pessoa usuária. O gate de `--require-approved` **deve continuar falhando**, sem inventar aceitação ou hashes de páginas Canva.

## Correções factuais feitas ANTES do design
1. Lee, Padmanabhan e Whang (1997, Management Science 43(4)) identificam **quatro** causas: revisão da previsão, lote, variação de preços e racionamento. Lead time influencia a amplificação, mas não é uma quinta causa na taxonomia desse artigo.
2. Série FastFood e resultados do Beer Game não estão no repo. Nenhum gráfico de valores medidos/simulados foi inventado; um esquema é rotulado *conceitual, sem escala*.
3. Dados Walmart/Macy's do EC2 são comparação operacional: semanas estoque 6,46 vs 16,69; giro 8,05 vs 3,12; C2C -1,51 vs 1,82 semanas. Não atribuir diferenças observadas ao efeito chicote sem estudo causal.
4. O exemplo 100 unidades desejadas / 200 pedidas quando se espera 50% de alocação é exemplo didático publicado pelo Stanford GSB, não medição do grupo.
5. A tecnologia (IA, gêmeo digital e visibilidade) é perspectiva gerencial; não declarar % de ganho sem evidência.

## Auditoria dos layouts gerados
- Em ambas as propostas, a geração produziu slides realmente preenchidos ao final (10 e 3). Conferidos elementos editáveis e texto da composição.
- **Direção A, slide 4:** a legenda usa 'Ciclo do pedido ao recebimento (C2C)' — **incorreto**. Corrigir para 'Ciclo de conversão de caixa (C2C), em semanas'.
- **Direção A, slide 6:** 'prevé' (deve ser 'prevê').
- **Direção A, slide 9:** 'compartiha' (deve ser 'compartilha').
- Fonte da comparação ainda precisa de referência completa do estudo e período dos dados antes de entrega acadêmica.
- Imagens Canva possuem tags de warehouse/logistics, porém não foi demonstrada proveniência individual de foto; devem ser tratadas como **fotografia contextual / composição editorial, não evidência empírica da cadeia estudada**. Não prometer autenticidade de cada imagem.
- A autoria de todas as figuras usadas em uma exportação final precisa ser conferida de acordo com os termos do Canva.
- Ausente revisão full screen por humano, export PPTX e teste em projetor. **Não elevar status para 'aprovado'.**

## Questões de design a investigar
- Os layouts finalmente deixaram de parecer o mesmo esquema de linhas/caixas? O avaliador humano decide.
- Fotos contextuais melhoraram clareza ou só decoração? Verificar se cada foto serve ao slide.
- Comparativo 16,69/6,46 é legível sem parecer dashboard? Verificar a hierarquia e não inferir causa.
- Como aproveitar a versão B em um deck de 10 slides sem sacrificar narrativa, bibliografia e editabilidade?

## Próxima ação após feedback
Obter escolha entre A/B (ou rejeição), corrigir texto/citações na versão escolhida com prévia e autorização, documentar o design selecionado, exportar PPTX e validar rendendo página por página. Se a direção for reprovada, pesquisar outros precedentes antes de reconstruir com código.

**Pesquisa externa verificada:**
- https://pubsonline.informs.org/doi/10.1287/mnsc.43.4.546
- https://www.gsb.stanford.edu/insights/whang-lee-eliminating-bullwhip-effect-supply-chains
- https://beergame.mgt.tum.de/
- https://www.ascm.org/making-an-impact/research/top-10-supply-chain-trends-in-2026/
- https://www.gartner.com/en/newsroom/press-releases/2026-06-30-gartner-identifies-top-supply-chain-technology-trends-for-2026
