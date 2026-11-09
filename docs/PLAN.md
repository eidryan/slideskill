# Plano de implementação — Slide Director

Data-base: 2026-11-09. Status: **fundação v0.1**. Este documento distingue explicitamente itens implementados, planejados e dependentes de ativos privados.

## Objetivo e não-objetivos

Objetivo: produzir apresentações que comuniquem argumentos verificáveis por meio de estruturas visuais apropriadas, sem repetição automática de templates. Permitir uso por Codex, Claude Code e outros agentes capazes de ler SKILL.md, bem como execução manual da linha de comando.

Não-objetivos imediatos: copiar decks McKinsey/Bain; prometer qualidade sem renderizar; converter automaticamente qualquer PDF em slides editáveis; implementar um designer visual universal em uma sprint.

## Arquitetura

Fluxo: briefing -> tese/storyline -> storyboard -> tipologia visual -> recuperação semântica de precedentes -> exploração de alternativas -> manifesto JSON -> PPTX -> render + QA -> iteração.

Separar componentes: (1) método editorial, (2) biblioteca/proveniência, (3) contrato de dados, (4) gerador substituível, (5) avaliação. O motor de slides não deve impor o layout se ele prejudica o argumento.

## Entregas por fase

| Fase | Entregável | Status | Critério de aceite |
| --- | --- | --- | --- |
| 0. Fundar | Skill, método, árvore, rubrica, contrato, exemplos | Neste PR | README e skill acionáveis; exemplos coerentes e versionados |
| 1. MVP | Busca/validação com testes e gerador PPTX mínimo | Neste PR | Scripts executam em ambiente com requisitos; dados de exemplo rotulados |
| 2. Benchmark | Comparar SlidePoise, PPTAgent e renderizador aprovado da equipe | Pendente | 3 casos iguais, outputs e relatório observável, sem cherry-picking |
| 3. Acervo | Curadoria de 100–200 *slides* distintos, com registro por página | Pendente: acesso ao acervo | Metadados, proveniência, deduplicação, 2 antiexemplos por tipo crítico |
| 4. Motor robusto | 8–12 composições úteis com edição preservada | Pendente | Verificação de PPTX no aplicativo alvo, incluindo notas e fontes |
| 5. Creative QA | Busca multimodal, 2–3 alternativas, revisão independente | Pendente | Ganho mensurável vs baseline; regressões documentadas |
| 6. Generalização | Perfis acadêmico, executivo, pitch; avaliação longitudinal | Pendente | Nenhum perfil depende de hardcode de um deck anterior |

## Experimentos iniciais

Comparar em *mesmas fontes e mesmo objetivo*: (A) workflow atual sem skill, (B) skill com catálogo, (C) SlidePoise/PPTAgent se instaláveis e autorizados. Casos: seminário acadêmico, relatório executivo denso e pitch comercial. Duas avaliações cegas independentes por dimensão: argumento, semântica visual, legibilidade, diversidade, fidelidade, editabilidade. Registrar tempo de retrabalho e falhas bloqueantes. Não presumir que um método ganha.

## Acervo de referência

O briefing cita ~4.200 arquivos em MaterialFactory/slide-library, entre PDFs e miniaturas; essa contagem NÃO foi verificada no repositório, e **nenhum arquivo privado foi importado**. O acervo inicial do repo tem apenas exemplos originais descritos em JSONL. Ingestão futura deve:
1. Inventariar PDFs, páginas, thumbnails e hashes.
2. Mapear direitos de uso e excluir conteúdo não redistribuível.
3. Eliminar duplicatas e curar por função + relação lógica, não marca.
4. Anotar o porquê de funcionar e o porquê de falhar.
5. Construir um ranking com recuperações úteis e métricas de recall.
6. Reavaliar a biblioteca com decks novos que exijam formatos ausentes.

## Leis editoriais a preservar

- Consultoria = densidade de evidência e consequência; números enormes em cards não equivalem a evidência.
- Uma conclusão por slide; forma visual precisa codificar a relação real.
- Cores de ênfase são raras e justificadas.
- 'Exhibit + caixa de leitura' não é o layout padrão.
- Sem mínimos tipográficos contraditórios: modalidade e tamanho de tela determinam o limite; rodapé e nota são casos diferentes.
- Um caso aprovado, como Adm Fin v7, é um **teste de regressão**, não um template obrigatório.
- ASD-STE100 informa concisão técnica, mas não deve ser aplicada literalmente ao português.

## Dependências e riscos

- R1: acervo privado não disponível; mitigação: catálogo original e pipeline de curadoria, sem alegações de cobertura.
- R2: renderizador sem PowerPoint/LibreOffice; mitigação: reportar como não inspecionado visualmente.
- R3: PPTX editável mas visualmente fraco; mitigação: QA de dois eixos.
- R4: overfitting ao estilo consultoria; mitigação: benchmark com 3 modalidades.
- R5: acesso/licença de decks externos; mitigação: referências bibliográficas e metadados, sem cópia no repo.
- R6: títulos sem fonte; mitigação: bloquear claims factualizados sem evidência ou rótulo demonstrativo.

## Próximo ciclo proposto

1. Rodar CI e renderização local da demo.
2. Inspecionar no PowerPoint: capturas por slide, problemas e correções.
3. Importar **com autorização** o caso Adm Fin v7 como teste de regressão, sem sobrescrever o método.
4. Implantar anotações para 25–30 exemplos variados, medir acerto de busca.
5. Rodar benchmark concorrente e decidir motor ou combinação de motores.

**Definição de pronto da v1:** três decks distintos gerados, revisados, editáveis, com notas, fontes e nenhum bloqueador de QA; ganho de qualidade comprovado contra baseline humano/agentic.
