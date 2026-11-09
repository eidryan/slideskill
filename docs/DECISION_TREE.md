# Árvore de decisão visual

Esta árvore serve para **selecionar candidatos**, não para fixar layout automaticamente.

## Camada A — Qual é o trabalho do deck?

1. Público decide algo? Priorizar implicações, evidência e chamada à ação.
2. Público aprende algo? Priorizar progressão didática e representações que reduzem dificuldade.
3. Público lê sem apresentador? Explicitar contexto e fontes; aumentar densidade sem sacrificar hierarquia.
4. Público ouve uma apresentação? Simplificar superfície visual; mover detalhes para notas e apêndice.

A saída é um perfil de densidade e sequência argumentativa; ela NÃO é um template.

## Camada B — Qual é a função do slide?

| Pergunta | Relação | Composições candidatas | Rejeitar se |
| --- | --- | --- | --- |
| Quais opções diferem em quê? | comparison | matriz, pares paralelos | critérios não comparáveis |
| O que causa ou compõe o resultado? | decomposition | driver tree, equação, sistema | não existe vínculo causal/matemático |
| Como variou ao longo do tempo? | time_series | linha, antes/depois, timeline | períodos inconsistentes |
| Qual categoria tem maior magnitude? | magnitude_comparison | barras com base comum | sem unidades ou fonte |
| Como os valores se distribuem? | distribution | histograma, boxplot | sem observações suficientes |
| Quais etapas se sucedem? | sequence | processo, swimlane | setas sugerem dependência falsa |
| Qual evidência ilustra o fenômeno? | qualitative_evidence | imagem anotada, caso comparado | evidência não apoia título |
| O que deve ser decidido/feito? | decision | árvore de decisão, roadmap com gates | não há alternativa ou decisão real |
| Qual conclusão abre/fecha o deck? | thesis/recommendation | abertura de tese, recomendação | não é sustentada pelo restante |

## Camada C — Como escolher entre candidatos?

Avaliar 1 a 5:
- adequação semântica (peso **4**);
- fidelidade às fontes (**4**);
- clareza e legibilidade (**3**);
- integração ao storyline (**3**);
- diversidade justificada no conjunto (**2**);
- editabilidade/custo de execução (**2**).

Aplicar gates antes do ranking: proibido representar hipótese como fato; proibido escolher gráfico incompatível com os dados; proibido ocultar unidades e bases essenciais. A pontuação é uma ferramenta heurística inicial, não um benchmark validado.

## Estratégia de exploração controlada

- **Reutilizar** se precedente coincide em propósito/relação e não há motivo para variar.
- **Adaptar** se a semântica é boa, mas a densidade ou canal é diferente.
- **Criar** se o acervo não dispõe de forma que prove bem a tese.

Gerar 2–3 alternativas nos slides-chave e registrar rejeições. Evitar variações superficiais (só trocar cor ou borda); alternativas devem mudar como a evidência é codificada.

## Regulador de diversidade

Ao planejar um deck, olhar a sequência inteira. Se uma composição dominar vários slides sem necessidade, reconsiderar os casos de baixo fit. **Não punir repetição útil**: uma série de análises comparáveis pode exigir a mesma grade para permitir comparação. O alerta detecta repetição não justificada; não impõe cotas estéticas rígidas.

## Critério de parada

Escolher o candidato de maior fidelidade semântica e menor retrabalho estimado, desde que passe os gates. Se nenhum serve, registrar que a biblioteca não cobre o caso e esboçar uma forma nova.

## Ligação com o catálogo

Busca inicial:
~~~bash
python3 scripts/search_library.py --purpose compare_options --relation comparison --limit 5
~~~
A recuperação usa regras escritas de 'use_when/avoid_when'. Similaridade textual é uma pista, nunca autorização para copiar.
