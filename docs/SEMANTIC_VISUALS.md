# Contrato de visualização semântica (experimental)

**Não é ainda regra final da skill.** O contrato codifica falhas observáveis do primeiro cold-run.

## Escolha por semântica, em camadas

1. Função do argumento: explicar, comparar, provar, orientar decisão.
2. Ontologia: `magnitude`, `distribution`, `decomposition`, `spatial_structure`, `physical_mechanism`, `state_transition`, `causal_feedback`, `temporal_change`, `conditional_decision`.
3. Forma dos dados: quantitativo com unidade; sequencial; espacial; imagem/diagrama, topologia; categórico.
4. Evidência verificável: quais fontes sustentam cada elemento visual, inclusive direção de seta, magnitude, escala e causalidade?
5. Escolha de **candidatos**; analisar alternativas contrárias e casos de falha antes de gerar.

### Gates especiais por ontologia

- `physical_mechanism`: especificar objetos físicos, localização, interação, trajetória e variáveis causais. Proibir `generic_steps` como representação principal sem justificativa.
- `state_transition`: incluir pelo menos dois estados e **o que mudou** fisicamente, distinguindo sequência cronológica de mudança espacial.
- `spatial_structure`: conectar rótulos a partes de uma estrutura real, com indicação quando o desenho é esquemático/sem escala.
- `magnitude`: eixo e base coerentes, unidades e fonte; diferença de faixas não deve usar proporções ilusórias.
- `causal_feedback`: setas significam causalidade sustentada e, quando cabível, polaridade (+/–); não fazer fluxograma decorativo.
- `conditional_decision`: branches têm condições e ações; roadmap sem condições é outro tipo de visual.

### Prioridade da evidence

Se o agente não puder produzir ou obter visual que explica a tese, deve fazer uma de três coisas: buscar referência autorizada, simplificar a tese mantendo validade ou declarar bloqueio. Não preencher a tela com cards ou etapas só para fechar layout.

### Cor

Manter um `semantic_color_register` por deck. Uma cor aplicada como categoria não pode depois significar maior valor em outro slide sem legenda/desambiguação. Para revisão, inspecionar correspondência cor/semântica em **todo o deck**, não só isoladamente.

### Before render

Todo slide complexo deve ter no `visual_spec`: `intent`, `ontology`, `claim`, `evidence`, `scene_objects`, `relations`, `why_this_representation`, `alternatives_rejected`, `source_ids`, `scale_status`.

### After render

Criar contact sheet do deck; verificar em tamanho real. Declarar visual QA PASS apenas se houve inspeção do render. Inspeção OOXML de boxes não substitui detecção de glyph clipping ou problema de interpretação.
