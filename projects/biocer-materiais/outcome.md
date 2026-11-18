# Resultado até aqui: biocerâmicas (18/11/2026)

Não é o fechamento do caso. Registra o que o autor aprovou e corrigiu nas cinco iterações de redesenho.

## Linha do tempo das iterações

| Versão | Origem do visual | O autor disse | Lição |
|---|---|---|---|
| v1 | Deck do grupo, paleta terracota e bege | Parece gerado por IA; letra pequena | `_shared/editorial-rules.md`, seção 9 |
| v2 a v3 | Sistema visual de outro deck do autor (Arial, marinho, laranja) | Queria um sistema vindo de repositório ou do Canva | A origem do sistema é template novo |
| v4 | Sistema "Claude" do repositório awesome-design-md (creme, coral, serifa) | Queria um **template** de um slide, não só um design system | Extrair a estrutura inteira, não só tokens |
| v5 | Template "Chemistry Thesis Defense" do Canva, extraído do PPTX exportado | Gostei do template. Pouco equilíbrio de imagens, de pouca qualidade; faltaram as fontes originais; tira o nome dos apresentadores do rodapé | `docs/IMAGE_STRATEGY.md`, fontes em `docs/TEMPLATE_FIRST_MODE.md` |

## O que ficou decidido

- Template aprovado como casca. Ver `template/DESIGN-SYSTEM.md`.
- Entregar o deck pronto de outra pessoa a quem desenha limita o resultado. A próxima rodada é de outro agente, com `AGENT_BRIEF.md`.
- Imagens: o v5 tinha 4 fotos em 3 de 16 slides. A resolução passou em `scripts/check_image_quality.py` (415 a 722 dpi), o que mostra que o problema é curadoria e quantidade, não pixel.

## Para a próxima rodada comparar

Se o storyboard do novo agente repetir a ordem e os títulos do deck antigo, o contexto vazou ou ele ancorou. Registrar aqui.
