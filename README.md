# Slide Director — slideskill

Skill de **direção de apresentações**, não um pacote de templates. Primeiro define a tese e o papel de cada slide; depois escolhe uma representação visual coerente, consulta referências anotadas, produz um PPTX editável e verifica o resultado.

## Estado

**v0.1 — fundação em desenvolvimento.** Inclui método, árvore de decisão, catálogo inicial de 12 precedentes originais, manifesto de exemplo, scripts de busca/validação e um gerador simples de PowerPoint. Não afirma reproduzir automaticamente o visual de consultorias, nem indexar a biblioteca privada de ~4.200 arquivos descrita no briefing. O acervo privado não foi importado.

## Comece aqui

1. Leia [SKILL.md](SKILL.md) para acionar o fluxo do agente.
2. Leia [docs/PLAN.md](docs/PLAN.md) para fases, critérios de aceite e backlog.
3. Consulte [docs/DECISION_TREE.md](docs/DECISION_TREE.md) antes de escolher layouts.
4. Use [references/catalog.jsonl](references/catalog.jsonl) como biblioteca semântica inicial; registros são **exemplos originais de método**, não capturas de decks externos.
5. Veja o manifesto em [examples/demo-consulting.json](examples/demo-consulting.json).
6. Veja os casos reais e como adicionar o seu em [projects/](projects/README.md). Regras editoriais comuns: [projects/_shared/editorial-rules.md](projects/_shared/editorial-rules.md).

## Instalação

Veja [docs/INSTALL.md](docs/INSTALL.md) para instalação em Codex ou Claude Code e como atualizar a skill. O repositório completo deve permanecer dentro da pasta da skill para preservar os arquivos auxiliares.

## Ferramentas

Requisitos: Python 3.10+ e Node.js 20+. O validador e a busca usam apenas Python padrão; o renderizador precisa de PptxGenJS.

~~~bash
python3 scripts/search_library.py --purpose explain_mechanism --relation decomposition --limit 3
python3 scripts/validate_manifest.py examples/demo-consulting.json
python3 scripts/check_projects.py
python3 -m unittest discover -s tests -v
npm install
npm run build:demo
~~~

O arquivo gerado fica em dist/demo-consulting.pptx (não versionado). É um **primeiro gerador com layouts limitados**, não prova de qualidade editorial. Faça renderização e revisão manual no PowerPoint antes de usar com clientes.

## Projetos

`projects/` guarda casos de teste, um por pasta: briefing, fontes, storyboard, conteúdo auditado, QA e resultado. `projects/_template/` é o ponto de partida; `projects/admfin-precificacao/` é o caso aprovado usado como regressão; `projects/logistica-efeito-chicote/` está em andamento. O repositório é público, então cada projeto segue as regras de privacidade e direitos de [projects/README.md](projects/README.md).

## Princípios

- Uma tese sustentada por slide; títulos são conclusões sempre que o contexto permitir.
- Relação lógica determina o tipo de visual. Cor destaca a evidência que sustenta a tese.
- Evidência, números, unidades e fontes não podem ser inventados.
- Layout não é escolhido apenas por similaridade visual, e repetição exige justificativa.
- Conteúdo e design são separados; um artefato de manifesto deve permanecer auditável.
- O resultado precisa ser **renderizado e inspecionado**, não apenas salvo como PPTX.

Contribuições e materiais de terceiros: consulte [docs/SOURCES.md](docs/SOURCES.md) e [references/README.md](references/README.md) antes de incorporar exemplos externos.
