# Engenharia dos Materiais: biocerâmicas

- **Status:** em andamento. O deck v1 existe e a apresentação é em 19/11/2026. Há proposta de redesenho no storyboard, ainda sem deck v2.
- **O que este caso testa:** redesenhar um deck existente que parece gerado por IA, mudando o mínimo de conteúdo. Tema técnico (propriedades e aplicações de materiais), gráficos de dados e diagramas de mecanismo.
- **Modalidade:** apresentação oral, 20 minutos, com perguntas.
- **Idioma:** português do Brasil.

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `brief.md` | Público, propósito, tempo, restrições e pontos em aberto |
| `sources.md` | Fontes, direitos e itens não verificados |
| `storyboard.md` | Diagnóstico do deck v1, direção visual e storyboard de 16 slides |
| `qa.md` | O que foi conferido contra a fonte e o que ficou em aberto |
| `source/relatorio.md` | Texto integral do relatório do grupo (21 páginas) |
| `source/slides-v1.md` | Texto dos 16 slides do deck atual |
| `data/propriedades.csv` | Tabela 1 do relatório: propriedades por material |
| `data/modulo-elasticidade-slide5.csv` | Dados do gráfico do slide 5 |
| `data/griffith.csv` | Conta de Griffith do slide 11, com a fórmula |
| `reference/` | Miniaturas do deck v1 para ver o que evitar |

Os nomes dos alunos e do professor foram trocados por `[Autor N]` e `[Professor]`.

## Como reproduzir

1. Leia `brief.md` e `sources.md`.
2. Siga a sequência de `SKILL.md` na raiz do repositório, partindo de `storyboard.md`.
3. Use só os fatos de `source/` e `data/`. Registre o que conferiu em `qa.md`.

## Limites conhecidos

O gerador atual (`scripts/build_deck.mjs`, schema v0.1) tem seis layouts e não cobre dispersão, linha do tempo nem barras flutuantes. Por isso este caso ainda não tem `content.json`. O deck v1 só existe como PDF, então o redesenho parte do texto extraído.
