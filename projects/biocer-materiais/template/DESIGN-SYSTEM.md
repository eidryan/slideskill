# Design system do template escolhido: "Chemistry Thesis Defense" (galeria do Canva)

Template: Beige Brown and Grey Minimal Modern Chemistry Thesis Defense Presentation (12 páginas, 1920x1080).
Cópia na conta do autor, exportada em .pptx e lida com python-pptx (o arquivo do template não é versionado: direitos do criador). Medidas abaixo em polegadas do slide original (20 x 11,25);
o deck v5 usa 13,333 x 7,5, ou seja, fator 0,6667.

## 1. Cor (três cores, nada mais)

| Papel | Hex | Uso |
|---|---|---|
| Argila (maroon) | 6E332E | fundo escuro; texto e linhas nos slides claros |
| Cinza-cinza (ash) | D5D7D5 | fundo claro; linhas e texto nos slides escuros |
| Branco | FFFFFF | texto sobre argila; texto de botão; caixa de rodapé da capa |
| Tons da argila (só em gráfico) | 8A5A55, 7B4742, 43211D | fatias do donut, preenchimentos secundários |

Regras: sem acento de outra cor, sem sombra, sem gradiente. Slide escuro usa texto branco e linhas cinza;
slide claro usa texto e linhas argila. Os dois modos se alternam (no template: capa clara, 2-3 escuros,
4 claro, 5-6 escuros, 7 claro, 8-9 escuros, 10 claro, 11-12 escuros).

## 2. Tipografia

| Papel | Fonte do template | Tamanho (20 pol) | Tamanho no deck (13,33 pol) | Substituta que existe no Windows |
|---|---|---|---|---|
| Display (capa, "Thank you") | Hagrid Ultra-Bold | 178,75 | 84 a 119 | Franklin Gothic Heavy |
| Título na aba, rótulos de bloco, números grandes | Neue Machina Ultra-Bold | 46 / 35 / 95 | 28 / 24 / 64 | Bahnschrift SemiBold |
| Rodapé, "Page 02", botões | Neue Machina regular | 20 a 29 | 13 a 19 | Bahnschrift |
| Corpo | DM Sans regular | 20 a 27 | 16 a 18 (mínimo 16) | Segoe UI |

Hagrid, Neue Machina e DM Sans não vêm no PowerPoint do projetor. As substitutas são do Windows.
Corpo sempre alinhado à esquerda em blocos de texto corrido do lado de uma imagem e centralizado em
colunas curtas; título na aba sempre à esquerda; sem negrito no corpo.

## 3. Estrutura fixa de todo slide de conteúdo

1. **Aba do título**: contorno em forma de pílula (stadium), linha de 3 pt, que nasce fora do slide à esquerda
   (x = -1,44) e termina à direita do texto (largura do texto + 0,75). Altura 1,74. Texto do título em
   x = 1,12, ultra-bold, cor oposta ao fundo. É o único título do template; o deck v5 usa a aba para o nome
   da seção e põe a frase-conclusão logo abaixo.
2. **Marcador de página**, canto superior direito: três bolinhas (contorno, cheia, contorno; 0,12 de diâmetro,
   x = 16,88 / 17,10 / 17,31, y = 1,06) e o texto "Page 02" alinhado à direita em x = 18,88, y = 0,90.
3. **Rodapé**: duas linhas horizontais de 3 pt em y = 10,08, a da esquerda de x = -1,22 a 6,16 e a da direita
   de 13,85 a 21,23, cada uma terminando em um **nó** (círculo cheio de 0,28) no lado de dentro. Texto
   centralizado entre elas (x 7,18 a 12,83). O texto alterna entre "apresentador | tema" e "tema | instituição".
4. Margens: conteúdo entre x = 1,7 e 18,3; começa em y = 3,3 e termina em y = 8,8.

## 4. Peças de layout

| Peça | Descrição | Slide do template |
|---|---|---|
| Moldura de circuito | linha de 3 pt com cantos arredondados (raio 0,4), aberta em algum ponto, com nó de 0,28 na ponta | 1, 5, 12 |
| Colchete com nó | três lados de retângulo arredondado (esquerda, base, direita), título em ultra-bold sobre a linha de cima, nó na ponta da linha de cima e na ponta da base | 7, 9, 5 |
| Pílula de rótulo | pílula cheia (cor do texto invertida) sobre a linha de cima do colchete, rótulo pequeno ultra-bold | 9 |
| Botão-pílula | contorno de 3 pt, 3,14 x 1,09, texto de 21,7 centralizado | 2 |
| Divisor vertical | linha de 3 pt de 5,3 de altura entre colunas | 8 |
| Divisor horizontal com nós | linha de 3 pt de ponta a ponta, nó em cada ponta, separa duas linhas "Título + número 01 / texto" | 6 |
| Número grande | ultra-bold de 95 ao lado do rótulo | 6 |
| Imagem | retângulo reto, sem borda, sem sombra, 7,05 x 6,70, ao lado do texto | 4, 10, 11 |
| Gráfico | donut nos tons da argila, rótulos pequenos fora | 10 |

## 5. Regras de uso (extraídas dos 12 slides)

- Um tema visual repetido: **linha com nó na ponta**. Aparece no rodapé, nas molduras, nos colchetes, no divisor.
  Esse é o motivo recorrente do template (equivale à onda do Efeito Chicote).
- Todo texto grande é curto. Parágrafo corrido só em fonte de corpo, 3 a 8 linhas.
- Foto de laboratório em cor, ao lado do texto, nunca sobre ele, nunca com overlay.
- Slide de imagem ou gráfico em fundo claro; slide de texto e processo em fundo escuro.
- Nada além de argila, cinza, branco e as fotos.

## 6. Adaptações previstas para Biocerâmicas (e por quê)

- Fator de escala 0,6667 em tudo. Texto de corpo que ficaria abaixo de 16 pt sobe para 16.
- O template só tem título curto na aba. A aba leva o nome da seção e a frase-conclusão do slide vai abaixo dela, em sans semibold de 22 pt, para manter a pedagogia do título de ação.
- Rodapé **sem nome de apresentador** (correção do autor). Texto do rodapé: tema e instituição, como no template.
- O template não tem cor de destaque. Para marcar uma classe (bioinerte, bioativa, reabsorvível) usar variações de argila e cinza, ou preenchido contra contorno, nunca uma cor nova sem aprovação.
- Diagramas de mecanismo seguem as cores do template (grão de uma fase em linha ou tom claro, grão da outra em branco ou argila escura).
- Créditos de foto abaixo da linha do rodapé, em 11 pt.

## 7. Fontes do template e o que usar na entrega

Fontes originais: display ultra-bold, sans geométrica larga (títulos e rótulos) e DM Sans (corpo). Nenhuma delas existe num PowerPoint de sala. Ordem de preferência: (1) fonte livre do template, instalada e incorporada ao PPTX com permissão do autor (DM Sans é OFL); (2) PDF exportado do Canva, que leva as fontes; (3) parecida e livre do Google Fonts, incorporada; (4) fonte do Windows. A versão v5 usou a 4 e o autor sentiu falta das originais, então o próximo deck deve tentar 1 a 3 primeiro.

## 8. Receitas de reconstrução em PptxGenJS (validadas no v5)

- Linha aberta com cantos arredondados: `custGeom` sem `close`, `fill: none`, curva `quadratic` em cada canto (controle no vértice, raio de 0,25 a 0,4 pol).
- Nó: círculo cheio de 0,19 pol na ponta da linha.
- Aba do título: `roundRect` sem preenchimento, linha de 2 pt, raio igual à metade da altura (0,8 pol de altura no deck de 13,333 pol), começando em x negativo para nascer fora do slide.
- Colchete com nó: linha curta de cima, lado esquerdo, base, nós nas duas pontas, título à direita do primeiro nó.
- Alternância de fundo: argila nos slides pares, cinza nos ímpares (capa em cinza). Texto e linhas invertem junto.
