# Iteração 004 — avaliação e pivô da linguagem visual

**Status:** REJECTED (v3) / PIVOT POLICY PUBLISHED / nova geração ainda não aprovada.

Feedback humano: a apresentação parece desenho em HTML e precisa mudar inteiramente a estratégia.

## Auditoria do deck e do gerador

A iteração 003 foi inspecionada como contact sheet de 16 slides. O gerador experimental build_biocer_v2.cjs contém os helpers box, dot, hollow, line, poly, top. Esse vocabulário programático foi imposto aos temas científicos, criando uma assinatura estética de UI.

| Slide | O que deu errado | Direção proposta |
| --- | --- | --- |
| 1 | Capa com hexágonos decorativos que fingem cerâmica | Fotografia de objeto/material real com composição editorial ou capa tipográfica honesta |
| 2 | Matriz de hexágonos para colágeno e apatita | Histologia/micrografia ou figura científica contextualizada |
| 3 | Bolinhas com setas e três blocos de uma linha do tempo estilo interface | Marcos e objetos reais, cronologia honesta sem falsas distâncias |
| 4 | Corte de implante construído com retângulos | Foto real de prótese com anotações sobre componentes visíveis |
| 5 | Faixas de módulo com valor, porém visual timidamente pequeno | Gráfico editorial grande; preservar faixas, escala e fonte |
| 6 | Três quadros geométricos da resposta do tecido, sem evidência | Figuras científicas próprias/licenciadas das interfaces |
| 7 | Duas microbarras com muito espaço vazio | Comparação quantitativa forte com unidades separadas |
| 8 | Grãos circulares regulares e trinca desenhada como polyline | Imagem SEM verdadeira, mais figura especializada para mecanismo; não confundir micrografia com prova de tenacificação |
| 9 | Hexágonos que fingem reabsorção de HA/β-TCP | Figura longitudinal ou reformulação da claim se não houver evidência |
| 10 | Cinco faixas coloridas que parecem barras de CSS | Figura científica das reações ou mecanismo revisado; nunca espessuras/tempo inferidos |
| 11 | Equação e cálculo são relevantes; layout ainda tímido | Manter fórmulas e gráfico a partir dos dados com maior foco |
| 12 | Sete componentes pequenos de workflow e callout | Caso de mudança de forno como narrativa/evidência; processo só quando necessário |
| 13 | Prótese representada por caixa, haste e esfera | Foto real e anotações nativas com crédito |
| 14 | Silhueta de dente SVG simplista | Foto clínica ou visual de aplicação com fonte; sem inventar resultado |
| 15 | Fórmula rodeada de grãos geométricos e círculos genéricos | Equação central e imagem real de defeito ou gráfico de sensibilidade |
| 16 | Bibliografia funcional; não precisa visualização | Preservar, melhorar legibilidade quando necessário |

## O que o v3 melhorou sem resolver

3 objetos fora da área no v0 → 0 no v3; notas e dados foram preservados; mecanismos foram nomeados. Mesmo assim a qualidade editorial foi rejeitada. **Logo, o problema está na linguagem visual e na seleção de meios, não apenas no esquema de decisão.**

## Hipóteses verificáveis

H4a: fotos/micrografias/fontes reais para fenômenos físicos aumentam especificidade e credibilidade.
H4b: PPTX híbrido (textos/gráficos nativos + imagens autênticas) terá melhor qualidade visual que desenhar tudo como shapes.
H4c: SlidePoise pode melhorar repertório se a etapa de imagem for realmente executada, mas também pode recair em cards ou introduzir distorções.
H4d: o gate de asset sourcing e a crítica do deck inteiro eliminam falhas que QA geométrico não identifica.

## Decisão

- Descontinuar o renderer geométrico antigo como motor editorial padrão.
- Manter seus artefatos somente para regressão técnica.
- Rebaixar a galeria SVG a legado estilístico, sem destruí-la.
- Registrar referências reais e plano de assets, com limites de evidência e licenças.
- Não gerar novo deck inteiro antes de um piloto de imagens reais e gráfico auditado.

Referências de método: Naegle 2021 (PLOS Computational Biology, CC BY); SlidePoise (reconstrução editável a partir de exploração por imagem); MDPI Kim et al. 2022 fig. 7 (SEM de indentação), Wikimedia Commons Nuno Nogueira (fotografia domínio público).
