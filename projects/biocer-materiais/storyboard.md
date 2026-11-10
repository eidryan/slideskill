# Storyboard e direção visual: biocerâmicas

Proposta de partida para redesenhar o deck v1, ainda sem aprovação dos autores. O modelo pode discordar se justificar. Os números vêm de `data/` e de `source/relatorio.md`.

## 1. Direção visual

Proposta de partida, ainda sem aprovação dos autores. O modelo pode discordar se justificar no `decision_log`.

### Diagnóstico do deck v1

Ver `../reference/deck-v1-contact-sheet.png` (slides 2 a 16). O que dá cara de gerado:

1. Paleta terracota, bege-creme e um traço laranja curto sob cada título, com rótulo de seção em caixa-alta laranja.
2. Títulos de tópico ("Aplicações em ortopedia"), sem conclusão.
3. A mesma grade de 3 ou 4 cartões bege com borda superior colorida nos slides 4, 7, 9, 13 e 14, com texto pequeno.
4. Gráficos em matplotlib, com fonte diferente da do slide. Os slides 5, 6, 8 e 10 são quase só uma imagem com uma linha cinza de rodapé.
5. O slide 2 abre com pergunta retórica e uma palavra gigante em laranja.
6. O laranja marca coisas diferentes em cada slide.

### Direção

- **Cor por resposta do tecido.** Bioinerte em azul-ardósia, bioativa em verde-azulado, reabsorvível em âmbar. A cor só aparece onde a classe é o assunto. O resto do deck é marinho e cinza. Isso cumpre a regra de que cada variável visual significa uma coisa.
- Fundo branco, tinta marinho, Arial em texto e gráficos (como em `projects/_shared/editorial-rules.md`, seção 7).
- Navegação por seção no topo (Introdução, Materiais, Propriedades, Processo, Aplicações, Conclusões), como no deck de Administração Financeira aprovado.
- Sem traço decorativo sob o título e sem rótulo de seção colorido.
- Gráficos de barras e dispersão nativos do PowerPoint, editáveis. Diagramas dos slides 6, 8 e 10 redesenhados em vetor.
- Caixa de conclusão em 3 slides (11, 12 e 15), não mais.
- Uma imagem ou número em destaque por slide, no máximo.

### Alternativa considerada

Estilo de revista científica, off-white com tipografia serifada. Descartada porque o visual marinho já foi aprovado em outro deck do mesmo autor e a cor por classe dá mais valor ao conteúdo.

### Tamanhos mínimos

Arial. Corpo de 14 a 16 pt, rótulo de gráfico 12 pt, nada abaixo de 12 pt (o limite do repositório é 11 pt em sala). O deck v1 usa texto menor que isso nos cartões.

### Entrega

PPTX editável e PDF, renderizados no PowerPoint para conferir o resultado. Notas do orador em tópicos, para 20 minutos.

## 2. Tese e storyboard

**Tese:** as biocerâmicas se dividem pela resposta do tecido (inerte, bioativa, reabsorvível), e a baixa tenacidade, que vem da ligação iônico-covalente, é o limite comum que o processamento e a microestrutura reduzem.

Os títulos são rascunho e devem ser revisados com os autores. Os números vêm de `../data/` e do relatório. O conteúdo de cada slide é o do deck v1 (`../source/slides-v1.md`); só mudam título, layout e gráfico.

Nota: o schema v0.1 do repositório só tem os layouts `thesis_cover`, `driver_tree`, `comparison_matrix`, `bar_chart`, `sequence` e `recommendation`. Dispersão, linha do tempo e barras flutuantes não existem no gerador atual. Por isso este projeto ainda não tem `manifest.json`: ele depende de estender os layouts ou de gerar o PPTX por outro motor.

| # | Título proposto | Relação | Layout | Observação |
|---|---|---|---|---|
| 1 | Biocerâmicas: cerâmicas avançadas aplicadas à saúde | tese | capa limpa, sem figura | |
| 2 | Dois terços da massa seca do osso são uma cerâmica, a apatita carbonatada | tese | número grande "2/3" e osso como colágeno mais apatita | remove a pergunta retórica |
| 3 | Em 50 anos, as cerâmicas foram de inertes a reguladoras da regeneração | sequência | linha do tempo com as 3 gerações | |
| 4 | Um implante precisa ser biocompatível, estável, resistente à fadiga e com rigidez próxima à do osso | decomposição | tabela: requisito, critério, número | |
| 5 | Nenhuma biocerâmica densa tem a rigidez do osso, e o vidro 45S5 é a mais próxima | comparação de magnitude | barras flutuantes nativas | usa `data/modulo-elasticidade-slide5.csv`; resolver alumina 380 ou 380 a 400 |
| 6 | As biocerâmicas se dividem pela resposta do tecido: inerte, bioativa ou reabsorvível | decomposição | 3 colunas nas cores das classes | diagramas redesenhados |
| 7 | A zircônia tem cerca do dobro da resistência e da tenacidade da alumina, mas degrada em meio aquoso | comparação | lado a lado com barras | flexão 400 a 600 contra 900 a 1200; K_IC 3,5 a 4,5 contra 6 a 10 |
| 8 | A zircônia fecha a própria trinca: a transformação expande o grão em cerca de 4% | sequência | 3 passos | |
| 9 | A hidroxiapatita se liga ao osso e dissolve devagar, e o β-TCP é substituído por osso em meses | comparação | duas colunas | |
| 10 | O vidro 45S5 forma a camada de apatita em horas | sequência | horizontal, 5 camadas | |
| 11 | Com o mesmo defeito de 50 µm, a Y-TZP resiste a 640 MPa e a hidroxiapatita a 80 MPa | magnitude | dispersão nativa e 3 números grandes | **caixa de conclusão**; `data/griffith.csv` |
| 12 | Em 2001, a troca de um forno levou ao recolhimento de lotes de cabeças femorais de zircônia | sequência | fluxo em setas e caso | **caixa:** mudança de equipamento é mudança de produto |
| 13 | Em ortopedia, cada material entra pela propriedade que o justifica | comparação | tabela: material, propriedade, aplicação | |
| 14 | Na odontologia e em outras áreas, a estética e a bioatividade escolhem o material | comparação | lista com linhas separadoras | título a revisar |
| 15 | A baixa tenacidade é o limite comum, e o processo e a microestrutura são a saída | recomendação | 3 faixas por classe | **caixa final** |
| 16 | Referências | | tipografia | |

### O que não muda

Números, fórmulas, referências, ordem dos slides e o relatório.

### O que muda

Títulos, o slide 2 sem pergunta, legendas de rodapé de imagem que passam para título ou notas, e os slides 9, 13 e 14 que viram comparação ou tabela com os mesmos dados.
