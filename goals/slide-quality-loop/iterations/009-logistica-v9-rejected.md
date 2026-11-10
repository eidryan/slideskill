# Iteração 009 — postmortem da versão Logística v9 REJEITADA

**10/11/2026. Status: REJECTED; release blocked.** O usuário disse 'ficou horroroso' e trouxe uma crítica de outro agente. Esta auditoria foi feita diretamente no PPTX, PDF, 10 renders, build script, manifesto e CSV.

## Fatos técnicos confirmados

- 10 slides, 10 notas, PDF 10 páginas, sem clipping de texto fora da página via PyMuPDF. Isso mede estrutura, não qualidade.
- **0 gráficos nativos**: ZIP PPTX sem chart XML; o comparativo do slide 4 usa barras de formas dimensionadas via CSV, não gráfico editável como gráfico.
- **0 fotografias/figuras**; composições feitas integralmente com texto, retângulos e linhas.
- Rodapés e trackers em tamanhos recorrentes ~9,5–11 pt; densidade irregular: slides textuais versus número gigante e muitas áreas vazias.
- O PowerPoint da Microsoft não foi aberto/validado, não houve aprovação humana ou revisão externa da fonte.
- Fonte do comparativo de estoque: CSV EC2 (Walmart 6,46 semanas e Macy's 16,69; giro 8,05/3,12 e C2C -1,51/1,82). Demonstrativos e período original ausentes. Isso **não mede** amplificação de pedidos.
- Fonte do exemplo 100÷50%=200: Stanford GSB, cenário hipotético explicitamente rotulado. O artigo Lee et al., Management Science (1997), identifica quatro mecanismos.

## Revisão slide a slide

| # | Crítica observável | Encaminhamento |
|---|---|---|
| 1 | Capa genérica e excessivamente vazia | Escolher identidade após evidência/narrativa |
| 2 | SCQA existe, mas foi desenhada como três parágrafos e coluna 'leitura' sem exhibit | Integrar à abertura; auditar progressão de títulos |
| 3 | Fluxo de elos com setas mostra sequência, não a amplificação da variância | Exigir gráfico/dado publicado ou exemplo didático explicitado |
| 4 | Semanas de estoque têm gráfico proporcional, mas não demonstram efeito chicote; gráfico é feito de shapes | Usar como contexto operacional, talvez anexo; se mantido, usar gráfico nativo |
| 5 | Matriz de quatro causas correta, porém genérica | Reformular conforme a pergunta e a tese, não estética de template |
| 6 | 100/200 é exemplo publicado, porém slide de número grande isolado repete defeito do Adm Fin v1 | Incorporar ao mecanismo de escassez ou dar contexto explicativo real |
| 7 | Tabela de remédios repete estrutura e densidade da tabela anterior | Mesclar como mapa causa-remédio e reduzir redundância |
| 8 | Três colunas ligadas por setas voltam à aparência HTML; promessa tecnológica abstrata | Associar condicionantes concretos sem porcentagens inventadas |
| 9 | Lista de três passos sem exhibit comprobatório | Síntese de decisão/debate, não outro quadro de texto |
| 10 | Lista de fontes e limites; tipografia muito pequena | Melhorar legibilidade e mover detalhes para apêndice |

## Nuances no comentário externo

Era falso dizer que não existia SCQA: há uma no slide 2 e um storyboard anterior no repositório. Era igualmente excessivo concluir que o PR #16 era inacessível por estar aberto: seu código foi consultado no GitHub. O erro foi **não executar os gates de cobertura/revisão e não aproveitar a construção do gráfico nativo nem o QA do PowerPoint**.

## Correção sistêmica

- Adicionar checklist obrigatória de entrada/release em docs/EVIDENCE_DECK_MODE.md.
- Adicionar verificador estrutural de artefatos e bloqueio de release, com teste de chart OOXML quando a tese requer gráfico nativo.
- Guardar v9 como **antiexemplo** e não usar CI de estrutura para anunciar qualidade estética.
- O PR #16 permanece aberto; **não fazer merge implícito nem tratar seu port como template genérico**.

**Próximo experimento:** novo backlog e storyline para Logística, após separar evidência teórica do efeito chicote, o exemplo 100/200 e os indicadores EC2, seguidos de storyboard com exhibit para cada título. Sem dados reais da série FastFood/Beer Game, não atribuir valores simulados à turma.
