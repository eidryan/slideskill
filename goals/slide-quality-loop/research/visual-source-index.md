# Fontes externas para o loop visual

Fonte de referência não é template livre. Registrar origem/licença e **não redistribuir imagens/PDFs sem autorização**. Exemplos gráficos do repo devem ser autorais.

| Fonte | URL | Evidência útil | Aplicar a | Cuidado |
|---|---|---|---|---|
| Harvard Catalyst: Slides / Assertion-Evidence | https://catalyst.harvard.edu/writing-communication-center/visualize-science/slides/ | Mensagem declarativa e visual que sustenta argumento | Slides 8, 10; gates de suporte visual | Não escolher imagem apenas para enfeitar |
| Carnegie Mellon: PowerPoint/Oral Presentation Design | https://www.cmu.edu/student-success/other-resources/resource-descriptions/powerpoint-design.html | Exemplo de transformação de texto em evidência visual | Anti-slide de cards/bullets | Requer adequação ao público |
| SlideAudit (UIST 2025) | https://pmc.ncbi.nlm.nih.gov/articles/PMC13227769/ | Taxonomia de composição, tipografia, cor, oclusão | QA por screenshot | Métricas do artigo não equivalem a taxa de falha do nosso deck |
| Ten Simple Rules for Effective Presentation Slides (2021) | https://pmc.ncbi.nlm.nih.gov/articles/PMC8638955/ | Exemplos visuais antes/depois para apresentações de pesquisa | Referências de redesign científico | Não copiar fotos/diagramas |
| SlidePoise | https://github.com/henryhyw/slidepoise | Busca visual, contact sheet, composição livre, mapa semântico, reconstrução editável, re-render | Benchmark técnico da pipeline | Exige motor de imagem/infra e teste real no nosso caso |
| Financial Times Visual Vocabulary | https://ft-interactive.github.io/visual-vocabulary/ | Famílias de relações de dados | Seleção preliminar de representação | Não captura todos os fenômenos científicos |
| Storytelling With Data (before/after) | https://www.storytellingwithdata.com/blog/do-you-need-a-data-story | Evidência vs ruído em relatórios com gráficos | Destaque focal e narrativa | Contexto de leitura executiva varia do seminário |
| Tufte's Razor | https://tuftesrazor.scienceux.org/ | Checklist de labels, unidades, base, redundância | Gráficos 5/7/11 | Tinta mínima isoladamente não determina qualidade |
| Help us focus please (artigo 2026) | https://pmc.ncbi.nlm.nih.gov/articles/PMC13183308/ | Sobrecarga em slides de IA com listas, setas, ícones e imagens decorativas | QA de apresentações ao vivo | Discussão, não detector confiável de autoria por IA |

## Observações derivadas (para teste, não leis universais)

- Padrões de IA são **indícios contextuais**, não assinatura forense: repetição de cards, números grandes sem contexto, diagramas genéricos, material enfeitado mas sem evidência.
- Limpeza gráfica não equivale a clareza nem veracidade: um slide pode ser muito minimalista e ainda ser semanticamente vazio.
- Physical mechanisms exigem visualização do fenômeno quando a geometria é parte da explicação. Não basta classificar como `sequence`.
- O SlidePoise pode ajudar na exploração, mas ainda precisa provar que mantém relações corretas e editabilidade no nosso projeto.

## Protocolo de aquisição

Salvar link, autor, data de acesso, licença, qual componente é útil, qual **não** deve ser copiado e quais decisões foram aprendidas. Não inserir screenshot de consultoria no repositório público.
