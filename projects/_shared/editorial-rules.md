# Regras editoriais compartilhadas

Origem: correções reais do autor em decks entregues. Cada regra traz a causa. Atualize este arquivo quando um projeto produzir uma lição nova que vale para todos.

## 1. Densidade de evidência, não cartões grandes

"Estilo consultoria" significa evidência densa: Arial, corpo de 10 a 14 pt, uma tabela ou gráfico ocupando o corpo, cinza para contexto e uma cor de destaque, barra lateral de leitura, tracker de seção, notas numeradas mais linha de fonte, sumário executivo em frases completas.

O primeiro deck do caso Adm Fin tinha números de 54 pt em cartões, citações em cartões e três colunas com uma linha cada. O autor disse que parecia feito por IA. Antes de montar um deck "de consultoria", abra dois ou três decks públicos reais e compare a densidade. Todo slide de conteúdo carrega evidência que prova o título. Um slide que é só citação ou só número vira parte de outro slide que tem evidência.

## 2. Uma tese por slide, uma codificação verdadeira, uma lista de cortes

Falhas encontradas e a causa de cada uma:

- Escada em que os degraus vazios continuavam subindo: a altura sugeria progresso enquanto o preenchimento dizia "não tem". Cada variável visual (altura, cor, posição) significa uma coisa verdadeira, a que o título afirma.
- Título que junta duas afirmações com "e" gerou slide com frases soltas. Uma tese por slide. O que não prova a tese vai para notas, rodapé ou anexo.
- Referência de página embaixo de cada item puxava o olho durante a fala. Fontes ficam no rodapé. O apresentador leva os detalhes.
- A cascata destacava mão de obra, mas o título falava de custo comum a todos os clientes. A cor de destaque segue a afirmação do título.

No storyboard, escreva para cada slide: a tese única, o que o visual codifica e a lista de cortes. Depois compare o slide renderizado com a tese, antes de polir.

## 3. O que fez o deck aprovado funcionar

- **Cada ponto do feedback virou um ID de backlog antes do plano.** Ao final, cada ID foi marcado como implementado, backup, excluído por decisão ou resolvido na fonte. Nada se perdeu e a revisão final provou isso.
- **Conteúdo e design separados.** Um manifesto (`content.json`) guarda texto, fala, tempo e páginas de fonte, e foi auditado contra a fonte uma vez. O redesenho mexeu só na camada de design, sem risco de erro factual novo.
- **Uma versão segura antes do redesenho**, quando a entrega é no mesmo dia.
- **Revisor independente conferindo contra as fontes.** Achou citações aprovadas que tinham sido removidas e fontes abaixo do mínimo, que a autorrevisão não viu.
- **Renderização no PowerPoint real** (exportar PDF por COM), não só no preview. Isso achou marcadores ocos em cores de tema, valores nulos desenhados como zero e suavizados, e números no formato americano em deck brasileiro.
- **Título afirma a conclusão e o layout segue a relação lógica.** Fluxo usa setas, comparação usa cartões lado a lado, um número único aparece grande, decomposição de custo é barra empilhada.
- **Material de ensaio gerado do mesmo manifesto:** notas em tópicos com palavras-chave e o próximo slide, roteiro completo em PDF, áudio de ensaio dizendo "Slide N" antes de cada slide e omitindo fontes e páginas.

## 4. Caixa de conclusão é exceção

Uma caixa azul igual embaixo de todos os 16 slides foi a única coisa que ainda parecia template. Com título conclusivo, a caixa repete o título. Use caixa quando o slide precisa de algo que o título não carrega: ressalva que muda a leitura, ponte para a próxima seção, a mensagem central do deck. Em 16 slides, de 3 a 5 caixas. Ressalva vai em nota de rodapé ou nas notas.

Antes de fechar, olhe todas as miniaturas lado a lado. Qualquer elemento idêntico em todos os slides é marca de template.

## 5. Diretrizes editoriais do autor

- Retire quadros secundários que não acrescentam informação. Prefira lista dos indicadores essenciais a quadro extenso.
- Divida slide com excesso de conteúdo.
- Rodapé em fonte pequena demais não é lido e não agrega. Fonte curta só onde há número.
- Não repita referência bibliográfica em cada slide. Consolide a bibliografia numa seção final.
- Sintetize autores e perspectivas numa narrativa própria, sem nomear os autores toda hora.
- Mantenha gráfico só quando sustenta uma conclusão explícita.
- Um slide aprovado explicitamente deve ser preservado.
- Dado que parece inconsistente (unidade, denominador) é conferido na fonte antes de entrar.

## 6. Texto

Para texto de slide, notas e relatórios acadêmicos ou profissionais:

- Frases curtas, linguagem direta, poucas palavras por ponto.
- Sem travessão nem meia-risca como pontuação.
- Sem a construção "não é X, é Y" nem variações ("em vez de", "de verdade", "ponte").
- Sem pergunta retórica no corpo. Exceção: a pergunta de debate, quando o critério avalia estímulo ao debate.
- Números no formato do idioma do deck (vírgula decimal e ponto de milhar em português).

Antes de entregar, busque no arquivo: `de verdade`, `ponte`, `em vez de`, `não é`, travessão e meia-risca.

## 7. Sistema visual de referência (16:9)

| Item | Regra |
|---|---|
| Grade | Margens laterais de 0,45 pol. Tracker no topo à direita, título entre y 0,35 e 1,25, corpo entre y 1,75 e 6,55, rodapé entre y 6,70 e 7,25. |
| Composição A | Exhibit à esquerda (8,9 pol.) e caixa "Leitura" à direita (3,3 pol.) com 2 a 4 frases ligadas a números do exhibit. |
| Composição B | Tabela, matriz ou fluxo em largura total, com a conclusão dentro do exhibit. |
| Tipografia | Arial. Título 22 pt negrito. Corpo e tabela de 12 a 14 pt. Rótulo de gráfico 11 pt. Mínimo 11 pt em sala; em leitura autônoma o rodapé pode descer a 9 pt. |
| Cor | Marinho `0B2545` só para o dado que prova o título. Cinzas `B8BFC6`, `5B6670`, `E6E9EC` para contexto. Laranja `C2410C` só para perda ou desvio negativo. Texto `1F2328`. |
| Gráficos | Nativos do PowerPoint, estilo único, sem borda, grade horizontal clara, rótulo de dado só onde o título precisa. |

A especificação slide a slide está em `projects/admfin-precificacao/storyboard.md`.

## 8. QA mínimo

1. Renderizar todos os slides no aplicativo alvo e ver as miniaturas lado a lado.
2. Comparar cada slide com a tese do storyboard.
3. Revisor independente confere números, fontes e as regras de texto.
4. Busca pelos termos proibidos.
5. Abrir o arquivo sem pedido de reparo.
6. Registrar em `qa.md` o que não foi testado.
