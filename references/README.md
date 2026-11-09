# Biblioteca de precedentes e políticas de curadoria

O catálogo inicial em catalog.jsonl contém **12 casos originais descritivos** (sem imagens importadas). Ele demonstra a estrutura de classificação e a recuperação, não representa a biblioteca privada do projeto.

## Como indexar exemplos reais

Unidade = **um slide/página**, não um PDF inteiro. Armazenar hash da página/miniatura, ID de deck e número de página, autoria, permissão de uso, finalidade, relação lógica, layout, densidade, tags, canal, justificativa visual, quando usar, quando NÃO usar, adaptações e antipadrões.

Não usar marca como atalho para qualidade. Diferenciar geometria, semântica, tipografia, evidência e estilo. Catalogar **antiexemplos** igualmente e explicar erro específico.

## Modelo JSONL

Cada linha é objeto independente com:
- id único; purpose; relation; layout; tags[];
- density: low, medium, high; audience[];
- claim_example; visual_rationale; use_when; avoid_when;
- adaptations[]; anti_patterns[];
- origin: { type: original|external, reference: ..., license?: ... };
- quality: candidate|reviewed|rejected.

'original' indica uma descrição criada para o projeto, NÃO que qualquer deck citado pertence ao usuário.

## Proveniência e direitos

Não distribuir miniaturas/PDFs de consultorias sem autorização. Se exemplos são usados apenas internamente para avaliação/referência, documentar sua proveniência e condições de uso. Não plagiar gráficos, marcas ou conteúdo proprietário. Para distribuir abertamente, priorizar material original, público domínio, licenciado ou explicitamente autorizado.

## Fluxo futuro de curadoria

Inventário -> deduplicação por hash/perceptual hash -> metadados -> revisão humana -> testes de recuperação -> critérios de rejeição -> integração ao gerador. Nenhum item importado sem provenance + rights status.

## Busca no MVP

scripts/search_library.py faz ranking determinístico de propósito/relação/tags/descrições. **Não é busca multimodal**, nem embeddings, nem revisão estética automática. Avaliação futura deve medir se os top-3 ajudam um designer a resolver o problema, não só se texto tem palavras similares.
