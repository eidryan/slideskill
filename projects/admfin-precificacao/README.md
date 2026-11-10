# Adm Fin: métodos de precificação de serviços contábeis

- **Status:** aprovado (entregue em 05/10/2026). Usado como **teste de regressão**, não como template.
- **O que este caso testa:** deck acadêmico denso (16 slides, cerca de 30 min) sobre uma dissertação qualitativa, com argumento quantitativo, gráficos nativos, tracker de seção, notas em tópicos e material de ensaio.
- **Modalidade:** apresentação oral, híbrida.
- **Idioma:** português do Brasil.

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `brief.md` | Propósito, tese e restrições do caso |
| `sources.md` | Fonte principal e itens que não estão no repositório |
| `storyboard.md` | Plano da v2: sistema visual (grade, tipografia, cor, componentes), especificação slide a slide, QA e critérios de aceite |
| `content.json` | Manifesto auditado da v6: texto, fala, tempo e páginas de fonte de cada um dos 16 slides |
| `notes.json` | Notas do apresentador em tópicos, palavras-chave e próximo slide |
| `reference-implementation/build_v7.mjs` | Script que aplicou título de ação, layout por relação e tracker sobre o manifesto. Leitura apenas, não é portátil |
| `output/apresentacao_v7.pdf` | Render da v7, para ver o resultado visual |
| `review/final_review_v6.md` | Revisão independente contra as fontes |
| `outcome.md` | O que funcionou, a correção do autor e as regras derivadas |

## Como usar como regressão

1. Entregue a um agente só `brief.md` e `sources.md`, sem o `output/`.
2. Peça um deck seguindo `SKILL.md`.
3. Compare com `output/apresentacao_v7.pdf` e com os critérios de aceite de `storyboard.md`, seção 5.
4. Registre diferenças em um `qa.md` novo, em outra pasta de teste, sem sobrescrever este caso.

## Observação sobre as versões

O `storyboard.md` é o plano da v2 (15 slides). O deck final (v7, 16 slides) usa o conteúdo de `content.json` e o layout de `build_v7.mjs`. Quando houver diferença, vale o `content.json`.
