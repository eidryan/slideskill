# Plano operacional: deck v2 do seminário Efeito Chicote (Logística)

Slides no Classroom até qua 11/11 23:59. Apresentação: no máximo 15 min com perguntas, ou seja, cerca de 12 min de fala.
Base: o rascunho v1 do seminário (v1, 09/11).
Este plano segue o método do projeto Adm Fin (`projects/admfin-precificacao`) e as regras de `projects/_shared/editorial-rules.md`. Fontes do método:

| Fonte | O que traz |
|---|---|
| `projects/admfin-precificacao/storyboard.md` | Sistema visual (grade, tipografia, cor, componentes), composições A e B, especificação por slide, QA e critérios de aceite. |
| `projects/_shared/editorial-rules.md` | Evidência densa, uma tese por slide, caixa de destaque rara, conteúdo separado do design, tiques de texto proibidos, diretrizes editoriais do autor. |
| `projects/admfin-precificacao/content.json`, `notes.json`, `reference-implementation/build_v7.mjs` | Implementação aprovada: conteúdo auditado em JSON, título de ação e visual no script, notas em tópicos num JSON à parte. |

## 1. Diagnóstico do v1 contra o método

| Regra | Problema no v1 |
|---|---|
| Título afirma conclusão | Títulos são rótulos ("Por que importa", "Casos reais", "Conclusão"). |
| Todo slide de conteúdo tem exhibit que prova o título | Oito dos 12 slides são lista de tópicos. O gráfico do slide 3 usa valores inventados. |
| Layout segue a relação lógica (composição A ou B) | Causas, remédios e tendências são matrizes e estão em lista. |
| Sem sumário executivo (Situação, Complicação, Resolução) | Não existe. |
| Tracker de seção no topo | Não existe. Os critérios do professor avaliam justamente a sequência introdução, desenvolvimento, aplicação, conclusão. |
| Tipografia e grade do sistema (título 22 pt, corpo 12 a 14 pt, mínimo 11 pt) | v1 usa título 32 pt e corpo 20 a 28 pt, sem grade nem rodapé. |
| Uma cor de destaque, resto cinza, laranja só para perda | v1 usa azul escuro e laranja decorativos. |
| Notas em tópicos, sem IDs e sem instruções ao grupo | Notas são frases soltas e instruções misturadas. |
| Conteúdo separado do design | O texto está dentro do script. |
| Nada idêntico em todos os slides | A mesma barra azul em todos. |

## 2. Mensagem central e SCQ

Mensagem central: o efeito chicote nasce de decisões racionais de cada elo com informação parcial, e as tendências de visibilidade, gêmeo digital e IA reduzem a causa de previsão e a de lead time.

- **Situação:** a demanda do consumidor final varia pouco e os pedidos dos elos anteriores variam muito (Beer Game, P&G).
- **Complicação:** a amplificação gera estoque, capacidade e transporte desalinhados e piora giro, C2C e retorno sobre ativos (Estudo de Caso 2).
- **Resolução:** compartilhar dado de venda, reduzir lead time e lote, e usar visibilidade, gêmeo digital e IA para prever com dado real, desde que os elos aceitem compartilhar dados.

## 3. Sistema visual (do PLANO-v2, adaptado a 16:9 de sala de aula)

| Elemento | Regra |
|---|---|
| Grade | Margens de 0,45 pol. Tracker no topo à direita, título entre y 0,35 e 1,25, corpo entre y 1,75 e 6,55, rodapé entre y 6,70 e 7,25. |
| Composição A | Exhibit à esquerda (8,9 pol.) e caixa "Leitura" à direita (3,3 pol.) com 2 a 4 frases, cada uma ligada a um número do exhibit. |
| Composição B | Tabela, matriz ou fluxo em largura total, com a conclusão dentro do exhibit. |
| Tipografia | Arial. Título 22 pt negrito marinho, no máximo 2 linhas. Corpo e tabela 12 a 14 pt (tabelas em 14 pt sempre que couber, a sala lê de longe). Rótulos de gráfico 11 pt. Mínimo de 11 pt em tudo. |
| Cor | Marinho `0B2545` só para o dado que prova o título. Cinzas `B8BFC6`, `5B6670`, `E6E9EC` para contexto. Laranja `C2410C` só para perda ou desvio negativo. Texto `1F2328`. |
| Gráficos | Nativos do PowerPoint, estilo único: sem borda, grade horizontal clara, rótulo de dado só onde o título precisa. Só entram se sustentarem uma conclusão explícita. |
| Rodapé | Linha curta "Fonte:" em 11 pt só onde houver número ou gráfico. Sem número de página nem autor repetido no corpo. Bibliografia completa no slide final. Isso resolve a crítica do backlog (EDI-004 a EDI-009): rodapé pequeno e repetido foi rejeitado. |
| Caixa de destaque | Rara. No máximo 3 no deck (lição 18). |

## 4. Storyline e storyboard (ghost deck)

Com 12 min de fala e cerca de 1,3 min por slide, o deck fica em 8 slides de conteúdo mais capa e referências. Os slides de causa e remédio foram fundidos numa matriz, e viabilidade foi para a matriz de tendências.

| # | Seção | Título de ação (a validar) | Exhibit que prova o título | Comp. | Quem |
|---|---|---|---|---|---|
| 1 | Capa | Efeito Chicote (Bullwhip Effect) | Nenhum. | n/a | Integrante A |
| 2 | Introdução | Os pedidos crescem a cada elo da cadeia embora o consumo final varie pouco | Sumário executivo: Situação, Complicação, Resolução em frases completas. A pergunta do Beer Game abre a fala neste slide. | B | Integrante A |
| 3 | Introdução | A variabilidade dos pedidos aumenta a cada elo, mesmo com demanda final estável | Gráfico nativo: variância dos pedidos por elo (cliente, varejista, atacadista, fabricante), simulação do grupo sobre a série FastFood. Premissas (lead time, janela da média) no rodapé. Destaque só na barra do último elo. | A | Integrante A |
| 4 | Introdução | Mais estoque por unidade vendida reduz o giro e alonga o ciclo de caixa | Tabela Walmart contra Macy's: semanas de estoque 6,5 e 16,7, giro 8,05 e 3,12, C2C −1,51 e 1,82. Dados do nosso Estudo de Caso 2. Destaque na linha de estoque. Caixa "Leitura" curta. | A | Integrante A |
| 5 | Desenvolvimento | Cinco causas explicam a amplificação, e cada uma tem um remédio clássico | Matriz: causa, mecanismo, remédio clássico, onde apareceu no Beer Game. Destaque nas causas 1 e 2, que as tendências atacam. | B | Integrante B |
| 6 | Desenvolvimento | Três episódios reais mostram causas diferentes em ação | Tabela: P&G (Lee et al., 1997), papel higiênico em 2020 e semicondutores em 2020 e 2021, com causa, mecanismo e fonte. | B | Integrante B |
| 7 | Aplicação | Com a previsão por elo, o pico de outubro a fevereiro da FastFood se amplia para trás | Gráfico: a série FastFood com a previsão de 53.898 em janeiro do Ano 5 e o pedido simulado do elo seguinte. Caixa de destaque com o caveat da simulação. | A | Integrante B |
| 8 | Aplicação | Visibilidade, gêmeo digital e IA atacam as causas de previsão e de lead time, se houver dado compartilhado | Matriz: tendência, causa atacada, fonte, limite. Linha marinho no limite comum, que é a confiança entre empresas. | B | Integrante C |
| 9 | Conclusão | Informação completa em cada elo reduz o chicote, e a tecnologia torna isso viável | Três colunas com título-afirmação: para as empresas, para a teoria, para o debate. A pergunta de debate fica numa caixa de destaque. | B | Integrante C |
| 10 | Referências | Referências | Lista no padrão ABNT. | n/a | n/a |

Lista de cortes por slide (vão para as notas ou para o slide escondido de apoio): histórico de Forrester; detalhes de VMI e CPFR; número da KPMG (94% otimistas com gêmeos digitais, só se perguntarem); fórmula de medição da amplificação.

Mapa de critérios do professor: domínio técnico e aplicação (slides 3 a 8), estrutura (tracker, SCQ e 8 slides em ordem), equipe (divisão e transições), arguição (slide 9 e perguntas preparadas), material e bibliografia (slides 3 a 8 e 10).

## 5. Execução

| Passo | Feito quando | Tempo |
|---|---|---|
| 1 | Reler lições 3 e 16 a 19 e a memória de estilo antes de escrever qualquer texto. | 5 min |
| 2 | Validar títulos e storyboard com o autor (esta rodada). | 15 min |
| 3 | Rodar a simulação e gerar os dados dos slides 3 e 7. Comparar com o limite teórico de Chen et al. (2000) como conferência. | 40 min |
| 4 | Criar `content_seminario.json` (títulos, textos, tabelas, fontes) e `notes_seminario.json` (tópicos). Auditar uma vez contra KPMG, Gartner, ASCM, Chopra, apostila e o Estudo de Caso 2. | 40 min |
| 5 | Montar com a estrutura de `build_v7.mjs` (tracker, títulos, exhibits). Verificar antes se o runtime do `build_v7.mjs` ainda roda nesta máquina. Se não rodar, montar com python-pptx seguindo a mesma grade. | 90 min |
| 6 | Exportar PDF pelo PowerPoint (COM), olhar todas as miniaturas lado a lado e checar contra a tese de cada slide. | 30 min |
| 7 | Revisor independente confere números, fontes e regras de texto. Busca no arquivo por "de verdade", "ponte", "em vez de", "não é" e travessão. | 30 min |
| 8 | Grupo revisa o conteúdo das suas partes (editar o JSON, não o layout). | em paralelo |
| 9 | Roteiro completo em PDF e áudio de ensaio, gerados do mesmo JSON. Cronometrar cada parte. | 30 min |
| 10 | Entrega no Classroom depois do ok do grupo. | 5 min |

Ordem de corte se faltar tempo: áudio de ensaio, depois o slide 6 vira uma linha no slide 5, depois o slide 4 vira linha no slide 2.

## 6. Critérios de aceite (do PLANO-v2)

- Lendo só os títulos dos slides 2 a 9, a história fecha sem o apresentador.
- Todo slide de 3 a 9 tem exhibit que prova o título. Nenhum slide é só citação ou só número.
- Em cada exhibit, só o que o título menciona tem cor.
- Todo número tem fonte curta no rodapé ou rótulo de "simulação do grupo".
- Nenhum texto abaixo de 11 pt e nenhum transbordamento no render.
- Abre no PowerPoint sem reparo.
- Nenhum elemento idêntico em todos os slides, além do tracker e do número da página.

## 7. Decisões pendentes

1. O slide 2 em sumário executivo cobre a abertura, ou você prefere abrir com a pergunta do Beer Game sozinha, num slide?
2. A turma tem resultados do Beer Game? Se tiver, entram no slide 3 no lugar da simulação.
3. A simulação sobre a FastFood vale como evidência do grupo, com o rótulo de simulação?
4. Se não houver fonte verificável para papel higiênico ou semicondutores, cortamos o caso e o slide 6 fica com dois episódios?
5. Quem apresenta e em que dia? O grupo ainda não respondeu.

## 8. Fora deste plano

O Estudo de Caso 2 é um relatório em PDF e segue conferência de números e de fontes, não o método de slides.
