# Engenharia dos Materiais: biocerâmicas

- **Status:** em andamento. A apresentação é em 19/11/2026. O caso já passou por 5 iterações de redesenho (v1 a v5, ver `outcome.md`). A v5 usou um template do Canva e foi aprovada na direção, mas o autor pediu mais imagens, de melhor qualidade, e fontes fiéis ao template. A próxima rodada é feita por **outro agente**, que não vê o deck antigo e parte de `AGENT_BRIEF.md`.
- **O que este caso testa:** montar uma apresentação a partir de contexto rico (assunto, público, mapa de conceitos, template, imagens), **sem ver o deck anterior**, e comparar com ele. Tema técnico (propriedades e aplicações de materiais), com fotos, micrografias, gráficos de dados e diagramas de mecanismo.
- **Modalidade:** apresentação oral, 20 minutos, com perguntas.
- **Idioma:** português do Brasil.

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `AGENT_BRIEF.md` | **Comece aqui.** Contexto rico para quem vai montar o deck sem ver o antigo: missão, público, mapa de conceitos, imagens, template, processo e proibições |
| `template/DESIGN-SYSTEM.md` | Design system extraído do template do Canva escolhido (cores, fontes, estrutura, peças, receitas) |
| `brief.md` | Público, propósito, tempo, restrições e pontos em aberto |
| `sources.md` | Fontes, direitos e itens não verificados |
| `storyboard.md` | Histórico (fase v1), não ler para desenhar |
| `qa.md` | O que foi conferido contra a fonte e o que ficou em aberto |
| `source/relatorio.md` | Texto integral do relatório do grupo (21 páginas) |
| `source/slides-v1.md` | Texto dos 16 slides do deck atual |
| `data/propriedades.csv` | Tabela 1 do relatório: propriedades por material |
| `data/modulo-elasticidade-slide5.csv` | Dados do gráfico do slide 5 |
| `data/griffith.csv` | Conta de Griffith do slide 11, com a fórmula |
| `reference/` | Miniaturas do deck v1. **Não ler para desenhar** (herdam a estrutura antiga) |

Os nomes dos alunos e do professor foram trocados por `[Autor N]` e `[Professor]`.

## Como reproduzir

1. Leia `AGENT_BRIEF.md` inteiro, depois `brief.md` e `sources.md`.
2. Siga `SKILL.md` na raiz, no modo template (`docs/TEMPLATE_FIRST_MODE.md`), e as imagens de `docs/IMAGE_STRATEGY.md`. Sua primeira saída é o seu storyboard.
3. Use só os fatos de `source/` e `data/`. Registre o que conferiu em `qa.md`.

## Limites conhecidos

O gerador atual (`scripts/build_deck.mjs`, schema v0.1) tem seis layouts e não cobre dispersão, linha do tempo nem barras flutuantes. Por isso este caso ainda não tem `content.json`. O deck v1 só existe como PDF, então o redesenho parte do texto extraído.
