# Resultado: Adm Fin

- **Fechamento:** 05/10/2026, mesmo dia da apresentação.
- **Versão final:** v7 (layout de consultoria sobre o conteúdo auditado da v6).
- **Reação do autor:** "gostei de como ficou". Única queixa: a mesma caixa de conclusão em todos os 16 slides parecia genérica.

## O que funcionou

Detalhado em `projects/_shared/editorial-rules.md`, seção 3: backlog por ID, conteúdo separado do design, versão segura antes do redesenho, revisor independente, renderização no PowerPoint real, título de conclusão com layout pela relação lógica, material de ensaio gerado do mesmo manifesto.

## Correções do autor ao longo do caso

| Versão | Problema | Causa | Regra |
|---|---|---|---|
| v1 | Parecia template de IA | Números de 54 pt em cartões, citações, colunas de uma linha | Densidade de evidência (regras, seção 1) |
| v3 | Slides dispersos | Duas teses por título, visual que sugeria o contrário do dado | Uma tese e uma codificação verdadeira (seção 2) |
| v3 | Referência de página sob cada item | Fonte no lugar errado | Fonte só no rodapé (seção 5) |
| v7 | Caixa idêntica em todos os slides | Elemento de layout tratado como obrigatório | Caixa é exceção (seção 4) |

## Layouts repetidos por inércia?

Sim, a caixa de conclusão. Não houve outro elemento idêntico entre slides além de tracker e número de página.

## Não verificado neste repositório

O PPTX não é versionado (`.gitignore`). Só o PDF renderizado está em `output/`. O script de geração depende de um runtime local e não roda em CI.
