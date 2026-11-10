# Pivô de direção de arte — iteração 004

**9 de novembro de 2026. Política de produção experimental, decorrente de rejeição humana explícita.**

## Decisão principal

**Congelar o uso da biblioteca de formas programadas como padrão de design.** O problema do deck de biocerâmicas não foi HTML de verdade: foi PowerPoint construído como se fosse uma interface CSS, com retângulos, círculos, linhas, hexágonos, badges, campos e painéis. Isso persistiu mesmo após a correção de dados, clareza e geometria.

A partir de agora, selecionar **evidência visual e direção de arte antes de escolher o mecanismo de construção**.

### Diagnóstico de causa-raiz

1. **Falsa materialidade.** Hexágonos parecem cristais, círculos parecem grãos, barras parecem camadas, um círculo sobre um retângulo parece prótese; nenhum deles contém a informação, a escala ou a textura de uma figura de domínio real.
2. **Ferramenta determinando repertório.** A biblioteca de funções box, line, dot, hollow, poly e top do script Biocer v3 fez todos os assuntos convergirem para o mesmo estilo.
3. **Repetição de gramática de interface.** Kicker em caixa-alta, título no mesmo lugar, conteúdo em painéis pastel, rodapé idêntico, linhas finas e cards com a mesma proporção. Não existe direção editorial específica por slide.
4. **Confusão entre editabilidade e tudo desenhado com shapes.** Texto, rótulos, gráficos de dados e anotações podem permanecer editáveis, enquanto foto e micrografia são imagens autênticas incorporadas.
5. **QA medindo integridade, não linguagem visual.** A ausência de overflow não impede uma apresentação de parecer vetor genérico gerado por IA.

### Nova sequência de produção

Tese e evidência verificável (Minto + Assertion–Evidence) → trabalho visual exato que o slide precisa executar → scouting de fotos, micrografias, figuras autorizadas e gráficos reais → art direction com alternativas → composição por imagem/referência e revisão → PPTX híbrido editável → QA no PowerPoint.

SlidePoise é candidato a motor de exploração por imagens e reconstrução. **Não está integrado nem validado** para este repositório.

## Árvore de escolha do meio visual principal

| Conteúdo | Meio preferido | Não usar como substituto |
| --- | --- | --- |
| Objeto, material, prótese, equipamento | Fotografia real relevante, autorizada e com crédito | Mockup feito de formas, polígonos, ícones |
| Microestrutura, fratura, grãos, superfície | Micrografia com barra de escala e contexto do experimento | Bolinhas decorativas que fingem SEM |
| Mecanismo que não aparece diretamente em uma foto | Figura científica publicada e autorizada, ou ilustração técnica revisada | Setas/cartões numerados ou imagem generativa fingindo evidência |
| Comparação quantitativa, intervalo, tendência | Gráfico construído a partir de dados auditáveis; nativo no PPTX quando cabível | Foto genérica ou barra sem unidade/fonte |
| Processo organizacional/decisão | Tabela, fluxograma, árvore de decisão apenas quando a lógica pede | Cards por hábito |
| Abertura | Foto editorial com função narrativa ou tipografia expressiva | Mosaicos geométricos decorativos |

**Importante:** não substituir um erro por outro. Fotografia bonita não comprova mecanismo. Uma micrografia de trincas não prova sozinha transformação tetragonal-monoclínica. O slide precisa delimitar a evidência real.

## Gates mandatórios

**G1. Brief visual:** registrar para cada slide o objeto/fenômeno/dado que o público precisa ver, o meio visual, a fonte, a licença e o limite da inferência. Conteúdo factual não disponível? Declarar asset em falta e não inventar figura.

**G2. Scouting:** selecionar 2–3 precedentes legítimos por slide crítico e justificar por que um ajuda. Usar referências apenas para aprender composição; não copiar slides privados.

**G3. Exploração:** produzir 2 direções materialmente diferentes por slide crítico. Não são alternativas reais se só mudam cores, bordas ou número de cards.

**G4. Composição:** texto, números e gráficos importantes devem ser editáveis; fotos/SEM/figuras podem permanecer assets. Não recriar textura da natureza como círculos.

**G5. Revisão:** abrir todas as miniaturas; executar o teste de troca de tema: a mesma arte poderia ilustrar tanto Logística quanto Biocerâmicas? Se sim, provavelmente é genérica. Checar relevância da foto, fidelidade dos dados, direitos de uso, legibilidade, ritmo e assinatura visual.

**G6. Aprovação:** zero claims sem fonte, zero cor contraditória, zero clipping real, e aprovação humana da direção. Render e CI técnicos nunca equivalem a aprovação editorial.

## Compatibilidade e transição

- **Preservar:** narrativa, Minto, SCQA, Assertion–Evidence, relações da Visual Vocabulary, dados, fontes, notas, gráficos editáveis.
- **Rebaixar:** os 12 SVGs candidatos do casebook anterior. Eles documentam a linguagem programática que o usuário rejeitou; não devem ser usados como precedentes visuais positivos por padrão. Os quatro antiexemplos continuam úteis.
- **Legado:** scripts/build_deck.mjs e os protótipos antigos continuam como smoke-tests de PPTX; não são design engines indicados para produção.
- **Promover:** busca de ativos e referências reais, política de licença, orientação editorial por slide, reconstrução seletiva e crítica estética por humano.
- **Pendente:** benchmark real de SlidePoise no mesmo briefing, geração visual com referências, aquisição de ativos, avaliação cega.

## Contraexemplos do próprio pivô

- Usar foto de prótese para provar revestimento HA não visível.
- Mostrar SEM de superfície como se provasse compressão na ponta de trinca.
- Reutilizar figura científica de outro material e omitir sua condição experimental.
- Achar que todo slide precisa de foto (gráfico nativo é melhor para números).
- Achatar o PPTX inteiro para escapar da estética de shapes.

**Próximo teste definido:** três slides com material real: foto de implante com anotação, micrografia publicada de zircônia com claims restritos ao que ela observa, e comparação quantitativa em gráfico editável. Primeiro mockups visuais; só depois gerar deck completo por agente independente.
