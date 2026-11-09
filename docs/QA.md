# Rubrica e QA — Slide Director

## Gates bloqueantes (qualquer um reprova)

- Afirmação factual não demonstrativa sem fonte rastreável.
- Visual contradiz título ou codifica relação inexistente.
- Número inventado, unidade omitida de maneira enganosa, escala enganosa.
- Texto ou elemento essencial cortado, perdido ou ilegível no ambiente de entrega.
- PPTX dito editável que é só imagem achatada sem declaração.
- Transcrição/citação externa incorreta ou licença de material terceiro descumprida.

## Rubrica 1–5 por dimensão

1. Argumento: afirmação única, relevante e sustentada.
2. Storyline: títulos encadeados e objetivo do deck demonstrado.
3. Semântica visual: relação representada corretamente.
4. Clareza e hierarquia: compreensão no canal previsto.
5. Composição: alinhamento, respiro, ênfase e legibilidade.
6. Coerência e diversidade: consistência sem monotonia semântica.
7. Fidelidade: números, unidades, citações e ressalvas.
8. Integridade técnica: shapes, fontes, render, notas, edição.

Regra inicial: média >=4, nenhuma dimensão <3 e **zero blockers** para aprovação humana; pesos finais devem ser calibrados por avaliações cegas.

## Procedimento

1. Auditar o manifesto e as fontes; o validador automático cobre apenas formato e algumas regras.
2. Gerar PPTX com log de ferramenta/versões.
3. Abrir/renderizar **cada** slide no aplicativo-alvo (preferência: PowerPoint real quando entrega é PPTX); registrar imagens, não confiar só em preview.
4. Revisar cada slide a 100%, e a escala da apresentação real quando possível.
5. Checar clipping, colisão, conectores, cores ambíguas, fontes substituídas, labels, rodapés, notas.
6. Revisar transições e diversidade com todos os slides lado a lado.
7. Fazer segunda passagem independente confrontando conteúdo e fontes.
8. Corrigir e repetir renderização; manter registro de problemas e evidências de fechamento.

## Relatório de QA

Incluir: data, arquivos/versões, modalidade, validação de manifesto (pass/fail), renderizador e ambiente, número de slides, blockers, notas por dimensão, problemas por slide, status de editabilidade, limitações não verificadas e conclusão: PASS / FAIL / NOT_VERIFIED.

**NOT_VERIFIED** se não houve inspeção visual. Validação JSON nunca equivale a aprovação editorial.
