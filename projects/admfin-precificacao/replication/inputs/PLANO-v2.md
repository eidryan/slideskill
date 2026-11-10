# Plano operacional: deck v2 (Adm Fin, Cruz Neto)

Apresentação: segunda 05/10/2026, por volta das 15h, slot de cerca de 30 min.
Base estratégica (já aprovada no chat): mensagem central, SCQ e storyboard de 15 slides.
Mensagem central: escritórios contábeis afirmam precificar pelo custo, mas sem custo por
cliente o preço acaba ancorado no mercado, e a própria dissertação traz os dados que
mostram o efeito disso.

v1 fica como está (`apresentacao.pptx`, `build.js`). A v2 é `build_v2.js` gerando
`apresentacao_v2.pptx`.

---

## 1. Sistema visual

### 1.1 Grade (16:9, 13,333 × 7,5 pol.)

| Zona | Posição (pol.) | Conteúdo |
|---|---|---|
| Margens | 0,45 laterais | nada encosta na borda |
| Tracker | y 0,20, alinhado à direita | seções 1 2 3, a atual em negrito |
| Título | y 0,35 a 1,25, largura 12,4 | afirmação, no máximo 2 linhas |
| Cabeçalho do exhibit | y 1,45 | o que se mede e a unidade |
| Corpo | y 1,75 a 6,55 | exhibit (8,9 de largura) + coluna de insights (3,3) ou exhibit inteiro (12,4) |
| Rodapé | y 6,70 a 7,25 | notas numeradas e linha "Fonte:", número da página à direita |

Duas composições-base para todos os slides de evidência:
- **A. Exhibit + insights:** exhibit à esquerda (x 0,45, w 8,9), caixa "Leitura" à direita (x 9,6, w 3,3).
- **B. Exhibit inteiro:** tabela, matriz ou fluxo em largura total, com a conclusão escrita dentro do exhibit.

### 1.2 Tipografia (Arial em tudo, sem serifa)

| Elemento | Tamanho |
|---|---|
| Título | 22 pt negrito, marinho |
| Cabeçalho do exhibit | 12 pt negrito, grafite |
| Texto do corpo e células de tabela | 12 a 14 pt |
| Rótulos de gráfico | 11 pt |
| Anotações sobre o gráfico | 11 pt, cor do destaque |
| Notas e fonte | 9 pt, cinza |

Mínimo de 11 pt em tudo o que é projetado, para a sala ler.

### 1.3 Cor: uma de destaque, o resto cinza

| Papel | Cor |
|---|---|
| Destaque (o dado que prova o título) | marinho 0B2545 |
| Contexto | cinzas: B8BFC6 (marcas), 5B6670 (texto secundário), E6E9EC (linhas de grade e caixas) |
| Perda ou negativo (semântico, só quando o dado é perda) | laranja C2410C |
| Texto | 1F2328 |

Regra: em cada exhibit só a série ou a linha que o título menciona leva marinho. O laranja
aparece apenas para prejuízo, déficit ou o que está abaixo do custo. Passar o par
marinho/laranja e o cinza no validador do dataviz antes de montar.

### 1.4 Componentes (funções no `build_v2.js`)

| Componente | Uso |
|---|---|
| `titulo(slide, texto)` + `tracker(slide, secao)` | todos os slides de conteúdo |
| `cabecalhoExhibit(texto)` | o que se mede, a unidade, o n |
| `caixaLeitura(itens)` | 2 a 4 frases de interpretação, cada uma ligada a um número do exhibit |
| `anotacao(x, y, texto, alvo)` | texto curto com linha fina apontando para o ponto do gráfico |
| `tabelaConsultoria(linhas)` | cabeçalho em negrito com fio inferior, fios finos entre linhas, sem zebra, primeira coluna em negrito |
| `rodape(notas[], fonte)` | notas numeradas ¹ ² ³ e fonte |
| `marcadorGravidade(nivel)` | círculo cheio, meio ou vazio (Harvey ball) para a tabela de inconsistências |

Gráficos nativos do PowerPoint (`addChart`), estilo único definido uma vez: sem borda, grade
horizontal clara, eixo y sem linha, rótulos 11 pt cinza, rótulos de dados só onde o título
precisa.

---

## 2. Especificação slide a slide

Notação: **[A]** ou **[B]** é a composição-base; "destaque" é o que leva marinho.

### 0. Capa
Fundo branco, título 32 pt marinho à esquerda, subtítulo com a referência completa,
autor, disciplina e data. Sem imagem.

### 1. Sumário executivo [B]
Três blocos verticais rotulados à esquerda (Situação, Complicação, Resolução), texto em
frases completas à direita, 13 pt, com subitens. Os números-chave em negrito (64 mil, 43
de 109, 19 de 36, 25 de 36, 27%). Termina com a pergunta do autor para pesquisa futura
(p. 88). Fonte: páginas por bloco.

### 2. Três bases de preço num setor sem tabela [B]
Matriz de 3 colunas (Custo, Mercado, Valor percebido) × 4 linhas (Lógica, Vantagem, Risco
segundo SESCAPLDR, Quem usa segundo Duarte e Souza). Faixa de contexto do setor acima da
matriz, em uma linha: 64.026 escritórios · 29,9% em SP · tabela de honorários proibida
desde o CDC (1990) · mão de obra como maior custo. Destaque: a coluna Custo (fio marinho no
cabeçalho). Fonte: p. 20, 35, 36, 47, 48.

### 3. Desenho da pesquisa [B]
Fluxo da esquerda para a direita, 4 etapas: Pergunta (citação p. 19) → Fontes (11
entrevistas com duração e período; 109 contratos, SP, 2004 a 2017) → Análise (4 variáveis
de controle, 3 construtos, Bardin) → Limites (amostra não probabilística, desempenho
percebido e não medido, p. 62 e 70). Embaixo de cada etapa, a página. Destaque: as duas
fontes de dados, porque o resto do deck compara as duas.

### 4. O honorário como volume × custo unitário [B]
Árvore de direcionadores da esquerda para a direita:
Honorário ideal = Custo do cliente × 1,5791¹ ← Custo do cliente = Σ (volume × custo
unitário) por departamento ← Custo unitário: fiscal R$ 2,33, contábil R$ 1,56, pessoal
R$ 31,22 ← Custo do departamento (7.649, 8.378, 8.742) ÷ unidades. Folhas com os números
do Anexo 1. Citação curta da ORGC7 ao pé da árvore (p. 76 e 77). Exemplo do cliente ABC
percorrendo a árvore na lateral (85,82 → 135,52 → cobrado 180,00). Nota ¹: 1,5791 vem do
Anexo 2; ver slide 13.

### 5. O custo é mão de obra, e o sócio é custo sem cliente [A]
Esquerda: cascata do custo mensal do escritório-exemplo (Anexo 1): equipe dos departamentos
11.722 → administrativo 1.896 → pró-labore 5.100 → demais fixos 6.050 → total 24.769.
Cascata feita com barra empilhada e série base invisível (nativo). Destaque: equipe +
pró-labore (mão de obra). Faixa inferior menor: hora do sócio, 160 h, barra única
dividida 40 h rotina contábil (marinho) e 120 h fora da rotina (cinza).
Leitura: 55% do custo é equipe; 76% com o sócio (ORGC7 fala em 80%); 75% da hora do sócio
não é atribuível a um cliente, então o critério de rateio define o preço.
Fonte: p. 79, 100, 104, 105.

### 6. Matriz das entrevistas [B]
Tabela: Construto | O que os sócios dizem | Evidência (citação curta) | Quem, página.
Linhas: Método de preço; Papel do mercado; Custo como ferramenta; Sistema de custeio;
Desempenho; Qualidade e retorno de clientes. Coluna final estreita "Medido no estudo?" com
marcador (não / parcial). Destaque: a linha "Método de preço". Fonte: p. 22, 75 a 80, 87.

### 7. Os contratos contam outra história [A]
Esquerda: grade de 109 quadrados, 43 em laranja (salário mínimo), 66 em cinza claro
(método não informado). Abaixo, régua 0 a 100% com o ponto 39,4% e a faixa 30,8% a
48,8% (Wilson 95%)¹. Leitura: base do cálculo (empregados, notas, lançamentos); vedação
constitucional e "não se caracteriza tecnicamente como um método" (p. 21); o texto não diz
o que fazem os outros 66. Nota ¹: cálculo do apresentador; a amostra não é probabilística
(p. 70), então o intervalo é otimista. Fonte: p. 21, 70, 80, 87.

### 8. Sem custeio, o custo por cliente não existe [B]
Tabela de lacuna, 3 colunas: Para precificar pelo custo é preciso | O que os escritórios
têm | Evidência. Linhas: custo por departamento; custo por cliente; custo por colaborador e
cliente; sistema de custeio (absorção, variável, ABC); indicador de desempenho. Marcador
cheio, meio ou vazio na coluna do meio. Citação da ORGC2 ("fazemos a gestão de custo dos
clientes") como faixa final. Fonte: p. 76, 77, 79, 87.

### 9. O texto não reconcilia o declarado e o praticado [B]
Tabela das inconsistências (6 ou 7 das 11 da leitura condensada): Ponto | O texto diz |
O texto também diz | Página | Peso para a conclusão (marcador). Ordenadas por peso.
Entram: entrevistas versus contratos; unanimidade versus "apenas um"; mais utilizado versus
mais adequado; desempenho prometido versus não medido; teoria da contingência anunciada e
não usada; origem dos contratos; 80% versus Anexo 1. Tom de rigor metodológico, sem
adjetivos. Fonte: leitura do apresentador, páginas na tabela.

### 10. O Anexo 2 permite testar a tese (gráfico-assinatura) [A]
Dispersão nativa: eixo x custo do cliente (R$ 0 a 2.100), eixo y honorário cobrado (R$ 0 a
3.300), 36 pontos. Duas linhas de referência como séries de linha: "preço = custo" (cinza
tracejado) e "preço ideal = custo × 1,5791" (marinho). Pontos abaixo da linha do custo em
laranja (8), os demais em cinza escuro. Anotações: FIL (maior lucro), JS (maior perda,
cobra 1.500 com custo 2.043), região entre as linhas rotulada "abaixo do ideal".
Leitura: 8 clientes abaixo do custo; 17 entre custo e ideal; 11 acima do ideal; o texto da
dissertação não comenta o anexo.
Execução: as três séries compartilham o eixo x ordenado (custos + extremos 0 e 2.100), com
vazio onde a série não tem ponto. Se o scatter nativo não aceitar linha por série, plano B:
linhas de referência como série de linha num gráfico combinado; plano C, só se A e B
falharem: imagem matplotlib com a mesma paleta (registrar no rodapé).
Fonte: Anexo 2, p. 106 (NIBO, 2018); classificação do apresentador.

### 11. 19 dos 36 clientes geram todo o lucro [A]
Curva acumulada (linha marinho, 2 pt) com a faixa acima de 100% sombreada em laranja
claro e anotação "pico 112,9% no 28º cliente". Linha de 100% como referência. Abaixo do
gráfico, mini tabela com os 5 mais lucrativos e os 8 deficitários (cliente, custo,
cobrado, lucro). Leitura: FIL sozinho 27%; os 8 devolvem R$ 1.189 (12,9%); é a curva da
baleia que o ABC (Eckert, citado na p. 79) busca revelar. Fonte: Anexo 2.

### 12. Mesmo calculando o custo, 25 clientes pagam abaixo do ideal [A]
Barras divergentes por cliente (cobrado menos ideal), ordenadas, positivas em cinza
escuro, negativas em laranja, rótulos só nos extremos (FIL +1.614, JS −1.726, VVV
−1.111). Leitura: carteira cobra 33.970 contra ideal de 39.111 (−13,1%); "déficit" no
anexo é cobrar abaixo do ideal, não prejuízo; liga com os contratos do slide 7: o preço
praticado segue outra âncora. Fonte: Anexo 2.

### 13. Margem e impostos em sequência reduzem a margem para 27% [A]
Ponte de R$ 100 de custo até o preço nos dois métodos, lado a lado: sequencial (custo 100
→ ÷0,70 → ÷0,9047 → 157,91; margem efetiva 27,1%) e markup único de Bruni e Famá (custo
100 → ÷(1 − 0,3953) → 165,37; margem 30,0%). Destaque: a diferença de 7,46 por R$ 100.
Leitura: na carteira do anexo, R$ 1.849 por mês; liga com a parte da Luisa. Nota: a
fórmula não aparece no anexo, a equivalência é inferência do apresentador.

### 14. Conclusão [B]
Três colunas de implicação com título-afirmação cada: Para os escritórios (custo por
cliente antes do preço; ABC é viável, Eckert p. 79); Para a teoria (o custo como base exige
o custo do objeto certo, o cliente, e não do escritório); Para a pesquisa (o teste que o
autor propôs na p. 88; o Anexo 2 é um primeiro olhar). Fecha com a mensagem central em
uma linha.

### 15. Referências
Cruz Neto (2018), Bruni e Famá (preencher edição), NIBO (2018) via anexos, Vaz (2014) via
apêndices.

---

## 3. Roteiro (notas do apresentador)

Cerca de 2 min por slide, 1 e 15 sem tempo. Cada nota tem: a frase do título dita em voz
alta, o que apontar no exhibit (na ordem do caminho do olho) e a transição para o próximo
título. Sem ler o slide.

## 4. Execução e QA

| Passo | Feito quando | Tempo |
|---|---|---|
| 1 | Validar paleta; componentes e estilo de gráfico no `build_v2.js` | 40 min |
| 2 | Slides 0 a 3 | 30 min |
| 3 | Slides 4 a 6 (árvore, cascata, matriz) | 60 min |
| 4 | Slides 7 a 9 | 40 min |
| 5 | Slides 10 a 13 (gráficos do Anexo 2) | 60 min |
| 6 | Slides 14, 15 e notas | 30 min |
| 7 | validate.py, render no LibreOffice, revisão visual slide a slide | 30 min |
| 8 | Checagem de conteúdo: cada número contra a leitura condensada ou o CSV; regras de estilo (sem travessão, sem "não é X, é Y", sem perguntas retóricas) | 15 min |
| 9 | Enviar PPTX e PDF pelo Telegram | 5 min |

Total: cerca de 5 h. Ordem de corte se faltar tempo: notas detalhadas do slide 9, depois o
slide 13 vira uma linha no 12, depois a mini tabela do slide 11.

## 5. Critérios de aceite

- Lendo só os títulos de 1 a 14, a história fecha sem o apresentador.
- Todo slide de 2 a 14 tem um exhibit que prova o título; nenhum slide é só citação ou só número.
- Em cada exhibit, só o que o título menciona tem cor.
- Todo número tem página ou "cálculo do apresentador" no rodapé.
- Nenhum texto abaixo de 11 pt, nenhum transbordamento no render.
- Abre no PowerPoint sem reparo (validate.py passa).
