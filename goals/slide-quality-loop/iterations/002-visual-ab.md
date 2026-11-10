# Iteração 002 — Experimento A/B em 3 pontos críticos

**Data:** 2026-11-09. **Status:** PROTOTYPE/NOT_APPROVED. **Mudança ainda não promovida à skill principal.**

## Hipótese

Desenhar explicitamente a geometria da evidência, antes do PPTX, deve melhorar slides científicos sem depender de cartão, setas ou timelines genéricos.

## Artefatos do experimento

O executor produziu localmente: `biocer_visual_ab_v1.pptx`, `biocer_visual_ab_v1.pdf`, `contact-sheet.png`. São **6 slides totalmente novos**, 2 alternativas para cada slide-alvo. A galeria original em `examples/visual-casebook/` disponibiliza os princípios visualmente, mas **não é cópia pixel a pixel** desses renders.

| Slide | Alternativa A | Alternativa B | Primeiro julgamento |
|---|---|---|---|
| 5, módulo elástico | Escala log explícita com intervalos e labels | Dois painéis com escalas declaradas | A torna intervalos comparáveis; B facilita falar de grupos, mas exige aviso de escalas independentes. |
| 8, tenacificação Y-TZP | Microestrutura ilustrativa + trinca/grãos e região de tensão | Antes/depois com estado físico alterado | Melhora sobre 3 círculos, mas a compressão ainda é simbolizada, não quantitativamente explicada. |
| 10, vidro 45S5 | Corte transversal com camadas + reações | Cinco estados de transformação da superfície | A aproxima a geometria real; B ainda lembra grades repetidas, sinal de design automático. |

## Testes do protótipo

- 6 páginas geradas com objetos de PowerPoint nativos.
- Exportação por LibreOffice para PDF inspecionada em contact sheet.
- PPTX ZIP: 6 slides, 6 partes de notas, 0 itens em `ppt/media` (formas originais, não imagens achatadas).
- Não testado no Microsoft PowerPoint; não revisado cegamente; não comparado por revisores humanos.

## Auto-crítica e risco

- A escolha de 2 soluções por slide ainda foi dirigida pelo executor, não feita automaticamente por um agente independente.
- Desenho esquemático pode induzir falsa precisão física; fonte e rótulo 'sem escala' são obrigatórios.
- A escolha de seis slides fora de um deck não valida ritmo global e storytelling.
- O 10B repete o antipadrão de cinco painéis; **não promove-lo como exemplo recomendado**.
- Sem dados brutos externos verificados além do relatório do grupo; exemplos devem dizer 'fonte: relatório do grupo' e não fingir leitura direta dos artigos.

## Próximo ciclo proposto

Executar o motor com `visual-spec` explícito, catálogo original + referências externas, mas contra o brief congelado e por agente independente quando possível. Registrar screenshots e parecer humano. Rejeitar métodos que melhorem o slide isolado à custa de legibilidade do deck.
