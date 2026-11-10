# Replicação do Adm Fin v7

Tudo o que foi usado para chegar ao deck aprovado, na ordem em que entrou. Os scripts são o registro real, com caminhos locais; leia como receita, não rode às cegas.

| Etapa | Arquivo | O que é |
|---|---|---|
| 1. Entrada | `inputs/spec-apresentacao-precificacao.md` | Spec inicial do deck (propósito, público, estrutura) |
| 2. Entrada | `inputs/backlog-revalidacao-apresentacao-2026-10-05.md` | Feedback de voz do autor dividido em 264 IDs, antes de qualquer plano |
| 3. Método | `inputs/PLANO-v2.md` | Plano de estratégia antes de operação (tese, storyline, storyboard, sistema visual por último) |
| 4. Iterações | `pptxgenjs-iterations/build.js` a `build_v5.js` | v1 a v5 em PptxGenJS (portável, `npm install` e `node`). v1 rejeitado como "template de IA", v3 como disperso |
| 5. Manifesto | `content_v6.json`, `notes_v7.json` | Conteúdo auditado contra a fonte, e notas em tópicos |
| 6. Design | `artifact-tool/build_v6.mjs`, `build_v7.mjs` | v6 reconstrói o conteúdo auditado; v7 só troca a camada de design (título de ação, layout por relação, tracker). Usa `@oai/artifact-tool` do runtime Codex |
| 7. Correções | `artifact-tool/fix_markers.py` | Conserto dos marcadores ocos em cor de tema |
| 8. Checagem | `checks/validate_main.ps1`, `checks/final_review_v6.md` | Validação do PPTX e revisão independente contra as fontes |
| Saída | `../output/apresentacao_v7.pptx`, `.pdf`, `thumbnails/`, `roteiro_fala_v7.*` | O deck aprovado, para abrir e comparar |

Não incluído: a dissertação condensada usada como fonte (material de terceiros) e os decks públicos de consultoria de referência (Bain 2009 e 2023, McKinsey UK electricity 2012). Veja `docs/EVIDENCE_DECK_MODE.md` para os links e o que observar neles.

O backlog e o feedback são do autor sobre o próprio trabalho. Antes de reutilizar o repositório para outro caso, confira `projects/README.md` sobre privacidade.
