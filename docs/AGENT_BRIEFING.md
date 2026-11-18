# Como passar um deck para outro agente montar

Origem: o autor percebeu que entregar o slide já feito de outra pessoa a quem monta o novo deck **limita** o resultado ("a gente podia ter apresentado isso de outra forma mais legal, se você não soubesse"). O agente que desenha herda a ordem, o tamanho das caixas e os cortes do deck antigo, e só troca a roupa. Para o agente propor os slides que ele acredita serem os mais dinâmicos, visíveis e didáticos, o briefing precisa dar **contexto rico sobre o assunto, o público, a missão e as restrições**, e **não** dar a estrutura do deck antigo.

## O que entra no briefing

1. **Missão** em uma frase e os critérios que o autor usa para aceitar: dinâmico, visível, didático, equilibrado em imagens, letra grande (corpo a partir de 16 pt).
2. **Situação real**: que trabalho é, para quem, quando, quanto tempo, quantas pessoas falam e quanto cada uma, o que o público já sabe e o que não sabe, o que a banca costuma avaliar, o que o grupo quer que fique na cabeça de quem assistiu.
3. **Tese e fio condutor** em poucas frases, mais as perguntas que o público deve conseguir responder no fim.
4. **Manifesto de conteúdo**: os fatos (números com unidade e fonte, fórmulas, nomes técnicos, referências), em arquivo próprio, organizados **por conceito** e não por slide. Cada conceito traz o que o público precisa entender, o dado que prova e os erros comuns de interpretação.
5. **Oportunidades visuais por conceito**: o que seria bom ver (um mecanismo, uma micrografia, uma escala, uma comparação) e onde procurar a imagem. São ideias, não layouts.
6. **Design system do template** escolhido (arquivo `DESIGN-SYSTEM.md`) e as fontes. Estrutura obrigatória da casca; a composição de dentro é livre.
7. **Estratégia de imagens** (`IMAGE_STRATEGY.md`): metas de equilíbrio, qualidade, proveniência, prancha de contato.
8. **Gates e checagens de missão** de cada etapa, e o que o agente não pode fazer sozinho (aprovar estética, baixar arquivos sem pedir, publicar).
9. **Lições e erros já cometidos** neste caso, escritos como regras, sem mostrar o deck que os causou.
10. **Arquivos que ele pode ler** e **arquivos que não deve ler** (lista explícita).

## O que fica de fora

- O deck antigo (PPTX, PDF, miniaturas, texto extraído dos slides, notas por slide). Se o conteúdo do deck antigo é a única fonte de um fato, o fato vai para o manifesto, **sem a estrutura do slide**.
- A numeração e a ordem dos slides antigos. Quantidade de slides: faixa (por exemplo 14 a 18 para 20 minutos), não número fixo.
- Imagens e gráficos que já foram feitos, a menos que o autor os aprove como assets (com proveniência).
- Tentativas anteriores de layout. Elas ficam em `experiments/`, marcadas "não ler para desenhar".

## Como conferir que o briefing não vazou a estrutura antiga

1. Busque no briefing e nos arquivos liberados por "slide N", por títulos de slides antigos e por listas de layout. Nada deve aparecer.
2. Peça ao agente, como primeira saída, **o storyboard dele** (tese por slide, imagem por slide, relação lógica). Compare com o deck antigo: se a ordem e os títulos são idênticos, o contexto vazou ou o agente ancorou. Registre em `outcome.md`.
3. O briefing diz quais pastas o agente não abre. Em `check_projects.py` essas pastas ficam fora da varredura de privacidade, mas continuam proibidas para o design.

## Estrutura recomendada do arquivo

`projects/<caso>/AGENT_BRIEF.md` com as seções: Missão · Situação · Público · Tese · O que o público deve aprender · Conteúdo (mapa por conceito, com ponteiro para o manifesto e os dados) · Oportunidades visuais por conceito · Imagens (metas, fontes, qualidade) · Template e fontes · Processo e checagens de missão · Proibições · Arquivos que pode ler e que não deve ler · Primeira saída esperada. Modelo vivo: `projects/biocer-materiais/AGENT_BRIEF.md`.
