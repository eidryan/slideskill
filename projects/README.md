# Projetos

Cada pasta aqui é **um caso de teste**: o material de entrada que um agente recebe, o que foi decidido, o resultado e a revisão. Serve para testar a skill em decks diferentes e para comparar versões da skill no mesmo caso (regressão).

```
projects/
  README.md                    este arquivo
  _shared/                     regras que valem para todos os projetos
    editorial-rules.md         lições, estilo de texto, regras visuais e de QA
  _template/                   copie esta pasta para começar um projeto novo
  admfin-precificacao/         caso aprovado, usado como regressão
  logistica-efeito-chicote/    caso em andamento (seminário de 12 min)
```

## Como adicionar um projeto

1. `cp -r projects/_template projects/<area>-<tema>` (minúsculas, sem acento, hífen).
2. Preencha `README.md` (status e o que o caso testa) e `brief.md` (propósito, público, tempo, restrições).
3. Registre cada fonte em `sources.md`. Guarde só o que pode ser público (veja abaixo). Dados próprios entram em `data/`.
4. Escreva `storyboard.md` antes de qualquer design: tese, SCQ e, por slide, título de ação, evidência, relação lógica, visual e lista de cortes.
5. Preencha `content.json` (texto, tabelas, fontes) e `notes.json` (notas do apresentador em tópicos).
6. Gere o deck, renderize no aplicativo alvo e registre em `qa.md` o que foi visto e o que não foi.
7. Feche com `outcome.md`: o que funcionou, o que o autor corrigiu, o que virou regra. Se a correção vale para todos os projetos, copie a regra para `_shared/editorial-rules.md`.
8. Rode `python scripts/check_projects.py`. Ele confere os arquivos obrigatórios e procura dados que não devem ir ao repositório.

## O que cada arquivo faz

| Arquivo | Para que serve | Obrigatório |
|---|---|---|
| `README.md` | Status, o que o caso testa, como reproduzir | sim |
| `brief.md` | Entrada: propósito, público, tempo, modalidade, restrições | sim |
| `sources.md` | Fontes, proveniência e direitos de cada uma | sim |
| `storyboard.md` | Tese, SCQ, storyboard, sistema visual, plano de execução | sim |
| `content.json` | Conteúdo auditado, separado do design | quando houver deck |
| `notes.json` | Notas do apresentador em tópicos | quando houver deck |
| `qa.md` | Renderização, revisão independente, o que não foi testado | quando houver deck |
| `outcome.md` | Resultado e lições | ao fechar |
| `data/` | Dados próprios usados nos exhibits | opcional |
| `reference-implementation/` | Script que gerou o deck aprovado (leitura, não template) | opcional |
| `output/` | PDF renderizado como referência visual (PPTX não é versionado) | opcional |
| `review/` | Revisões independentes e cobertura do backlog | opcional |

O verificador (`scripts/check_projects.py`) exige os quatro arquivos marcados "sim" e, quando existir `content.json`, também `notes.json`.

## Privacidade e direitos (o repositório é público)

- Sem nomes de colegas, clientes ou professores: use "integrante A", "cliente X".
- Sem conversas de mensageiros, e-mails, tokens nem caminhos de disco pessoais.
- Sem PDFs, miniaturas ou textos longos de terceiros. Registre em `sources.md` autor, título, ano e como obter. Cite no máximo trechos curtos.
- Número de fonte de terceiros entra com a referência. Número calculado pelo autor entra com a fórmula.
- Dado de demonstração leva o rótulo "demonstrativo" ou "simulação".

## Um projeto não é template

O deck aprovado de um projeto é um teste de regressão: a skill deve chegar a um resultado de qualidade parecida a partir do `brief.md` e das fontes, sem copiar o layout. Se dois projetos terminarem com o mesmo layout por inércia, registre isso em `outcome.md`.
