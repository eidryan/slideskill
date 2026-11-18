# Modo template: partir de um template pronto e extrair o design system antes do slide

Use quando o autor pede "um template", aprova um template visto na galeria ou diz que gostou de um deck pronto. Origem: caso `biocer-materiais`, iterações v1 a v5. O autor reprovou duas vezes o caminho de reaproveitar o sistema visual de outro deck dele ("eu queria um repositório legal ou do Canva") e uma vez o caminho de só extrair tokens ("eu queria um template de um slide, não só um design system"). Template é a estrutura inteira do slide (aba de título, marcador de página, rodapé, molduras, colchetes, divisores, alternância de fundo), não só cor e fonte.

## Como este modo se encaixa nos gates

- A página do template, vista em tamanho real, é a **imagem de design** que o gate 007 pede. Salvar a captura, registrar o SHA256 e a escolha humana em `design_handoff*.json`. A aprovação é do autor, nunca do agente.
- G0 a G3 (fonte, backlog, argumento, evidência) valem do mesmo jeito e vêm **antes** da escolha do template. G7 a G9 (render no PowerPoint, revisor independente, aprovação humana) também.
- O template define a **casca**. A relação lógica de cada slide continua decidindo o que entra dentro dela.

## Missão (conferir em toda etapa)

Slides **dinâmicos** (variedade de layout e ritmo, sem o mesmo cartão repetido), **visíveis** (letra grande, contraste, imagem grande, nada em cima de nada) e **didáticos** (cada slide ensina uma coisa que o público sem formação consegue repetir), com **equilíbrio de imagens** conforme `IMAGE_STRATEGY.md`. Em cada etapa abaixo, fazer a pergunta da linha "Missão".

## Etapas

1. **Conteúdo congelado, estrutura livre.** O que o autor escreveu vira manifesto de fatos (números, fórmulas, referências, nomes técnicos). A ordem, a quantidade e a forma dos slides **não** são herdadas de nenhum deck anterior. Se existe um deck anterior, ele não entra no contexto do agente que desenha (ver `AGENT_BRIEFING.md`).
   *Missão:* o manifesto tem o que o público precisa aprender, e não o layout de outra pessoa?
2. **Procurar template pela estrutura.** O conector do Canva não abre a galeria pública (e `create-design` falha por cota de créditos). Navegar na galeria pelo navegador do autor já logado: `canva.com/templates/?query=<termos>&category=<presentation>`, rolar, abrir os candidatos e ver **todas as páginas** de cada um. Escolher pelo conjunto de layouts, não pela capa. Critérios: tem layout para texto curto, comparação, sequência, imagem com texto, gráfico, números grandes, citação ou destaque? Alterna fundo escuro e claro? Aguenta foto grande? A fonte é legível em sala?
   *Missão:* o template dá dinamismo (mais de 6 layouts distintos) e espaço para foto grande?
3. **Copiar e exportar.** "Customize this template" cria a cópia na conta do autor (avisar). `export-design` em PPTX e baixar para uma pasta nova e vazia. Ler com python-pptx: tamanho, fundo de cada slide, cada forma (posição, tamanho, preenchimento, linha), cada texto (fonte, tamanho, negrito, cor, alinhamento). Renderizar o PPTX no PowerPoint e olhar todas as páginas para ver o que o XML não conta (grupos, curvas, nós, máscaras).
   *Missão:* li as regras ou só olhei a capa?
4. **Escrever o design system antes de qualquer slide.** Arquivo `DESIGN-SYSTEM.md` do projeto com: cor (hex e papel), tipografia (família, tamanho, substituta), estrutura fixa de todo slide (aba de título, marcador de página, rodapé), peças de layout (nome, descrição, medidas, slide de origem), regras de uso, adaptações previstas (e por quê) e fator de escala para o tamanho do deck. Modelo: `projects/biocer-materiais/template/DESIGN-SYSTEM.md`.
   *Missão:* alguém sem ver o template consegue reconstruir a casca só com este arquivo?
5. **Fontes.** Ver a seção de fontes abaixo. Decidir antes de montar, não no fim.
6. **Storyboard livre, com biblioteca de layouts do template.** Mapear cada tese de slide a uma peça do template (ou a uma composição nova que respeita as regras de uso). Propor títulos de ação e declarar a imagem de cada slide (família, função, vaga). O template tem título curto na aba; a frase-conclusão do slide vai logo abaixo dela.
   *Missão:* o deck alterna ritmo (texto, imagem grande, diagrama, número, comparação)? Cada slide tem uma coisa para o público aprender?
7. **Imagens.** Seguir `IMAGE_STRATEGY.md` inteira: candidatas, prancha de contato, escolha humana, resolução, proveniência.
   *Missão:* o equilíbrio de famílias está nas metas? Nenhuma imagem é só enfeite?
8. **Reconstrução editável.** PptxGenJS (ou o motor que mantenha tudo editável) na escala do template (por exemplo 20 x 11,25 pol para 13,333 x 7,5 pol, fator 0,6667). Receitas validadas: linha aberta com cantos arredondados em `custGeom` com curva quadrática, nó como círculo cheio, aba em pílula como `roundRect` com raio igual à metade da altura nascendo fora do slide, colchete com nó, divisor com nós, alternância de fundo por paridade do slide.
   *Missão:* o texto de corpo tem 16 pt ou mais? Há 3 ou mais composições diferentes de colunas e imagens?
9. **QA.** `docs/QA.md` mais `scripts/check_image_quality.py`. Render no PowerPoint real de todos os slides, miniaturas lado a lado, procura de sobreposição, corte, orfandade de título, rodapé em cima de conteúdo. Revisor independente confere fatos e a missão.
   *Missão:* repetir a pergunta da missão olhando as miniaturas lado a lado.

## Rodapé, marcador e marcas

- **Sem nome de apresentador no rodapé** (correção do autor). Quem fala vai nas notas e no roteiro. O rodapé leva tema e instituição, como no template.
- O marcador de página segue o template (por exemplo "Pág. 02").
- Crédito de imagem fica logo abaixo da linha do rodapé, em 11 pt.

## Fontes do template

O template usa fontes de Canva (por exemplo uma display ultra-bold, uma sans geométrica larga e a DM Sans) que **não existem** no PowerPoint do projetor. Opções, em ordem:

1. **Fonte livre do template.** Algumas são livres (DM Sans é OFL, no Google Fonts). Pedir permissão ao autor para baixar, instalar e **incorporar** no PPTX (PowerPoint: `Presentation.EmbedTrueTypeFonts`, ou Salvar como com a opção de incorporar). Só funciona com fontes TrueType que permitem incorporação. Testar abrindo o arquivo em outro computador.
2. **PDF exportado do próprio Canva** carrega as fontes. Serve de entrega de projeção; o PPTX continua para edição.
3. **Parecida e livre.** Para a display pesada e a sans larga do template, escolher no Google Fonts (OFL) a mais próxima e tratar como a fonte do deck, com o mesmo procedimento de incorporação.
4. **Fonte do Windows** como último recurso (Bahnschrift, Franklin Gothic, Segoe UI no caso do v5). É a que fica menos fiel e o autor percebeu.

Registrar a escolha e a razão em `DESIGN-SYSTEM.md`.

## Erros vistos

| Erro | Correção do autor | Regra |
|---|---|---|
| Reusar o sistema visual de outro deck dele | "queria de um repositório legal ou do Canva" | Origem do sistema é template novo, a menos que ele peça o contrário |
| Extrair só cor e fonte | "queria um template de um slide, não só um design system" | Extrair a estrutura inteira (passo 4) |
| Poucas imagens, de pouca qualidade | "pouco equilíbrio de imagens" | `IMAGE_STRATEGY.md` |
| Fontes trocadas pelas do sistema | "e aquelas outras fontes que a gente tinha visto?" | Passo 5 antes de montar |
| Nomes dos apresentadores em todos os slides | "tira esse nome de baixo" | Rodapé sem nome |
| Entregar a ele o deck pronto de outra pessoa como ponto de partida | "eu te limitei" | `AGENT_BRIEFING.md` |
