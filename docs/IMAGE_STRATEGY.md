# Estratégia de imagens: equilíbrio, qualidade e proveniência

Nasceu no caso `biocer-materiais` (v5). O autor reprovou duas coisas no deck: poucas imagens (4 fotos em 3 de 16 slides) e imagens de pouca qualidade. O medidor `scripts/check_image_quality.py` mostrou que a resolução estava boa (415 a 722 dpi). O problema era **curadoria**: foto de coroa dentária em fundo preto, foto de forno com uma mão enluvada, raio X de baixo contraste, tudo escolhido por ser o primeiro arquivo livre que apareceu. Resolução é o piso. Qualidade é escolha editorial e passa por aprovação humana.

## 1. A missão de imagem

Cada deck de tema físico (material, equipamento, corpo, território, produto) precisa de **três famílias de imagem em equilíbrio**, mais o diagrama quando ele explica melhor que uma foto:

| Família | O que é | Para que serve | Onde buscar |
|---|---|---|---|
| **Evidência do objeto** | Foto ou micrografia real do que o trabalho estuda (prótese, componente, equipamento, microestrutura) | Provar que a coisa existe e mostrar como ela é | Figuras de artigos de acesso aberto (CC BY) no Europe PMC e PubMed Central, Wikimedia Commons, acervo de universidade ou fabricante com licença livre |
| **Cena de contexto** | Foto de apoio: pessoa, sala, procedimento, laboratório, uso | Dar escala humana, abrir ou fechar uma seção, descansar o olho | Pexels, Unsplash, Wikimedia Commons (preferir fotos de alta qualidade técnica) |
| **Figura científica** | Gráfico, esquema, mapa ou micrografia anotada de artigo | Dar autoridade e mostrar o dado como a literatura mostra | Artigos de acesso aberto, com a legenda e a licença do artigo |
| **Diagrama próprio** | Esquema nativo editável feito pelo grupo | Mecanismo, processo, relação que nenhuma foto mostra | Construído no deck, só quando a relação lógica pede |

**Meta de equilíbrio para 16 slides** (ajustar pelo tema): pelo menos 8 slides com imagem real (foto, micrografia ou figura de artigo), pelo menos 3 slides de evidência do objeto, pelo menos 2 de cena de contexto, pelo menos 2 figuras científicas e os diagramas onde explicam. Nenhuma família passa de metade das imagens. Slide de dado quantitativo continua com gráfico nativo e não precisa de foto.

## 2. Regras de qualidade (portão de curadoria)

1. **Mínimo técnico**: 144 dpi efetivos no tamanho em que aparece (imagem de página inteira pede 1920 px de largura; meia página, 960 px). Rode `python scripts/check_image_quality.py deck.pptx`. Miniatura (thumbnail) de 320 a 800 px esticada é FAIL.
2. **Mínimo editorial** (aprovado por humano, não pelo agente): sujeito limpo e reconhecível, iluminação e foco bons, fundo que não disputa com o sujeito, cor fiel, sem marca d'água, sem texto de terceiros na imagem, enquadramento que sobrevive ao corte do slide, sem aparência de banco de imagem genérico quando o slide fala de algo específico.
3. **Três candidatas por vaga.** Para cada slide de imagem, o agente reúne pelo menos três candidatas e monta uma **prancha de contato** (uma imagem com as candidatas lado a lado, com nome, autor, licença e resolução). O humano escolhe. Sem escolha registrada, o slot fica `BLOCKED_ASSET`.
4. **Imagem tem função declarada** no storyboard: família, o que ela prova ou ensina, o que olhar nela. Foto decorativa que não prova nem ensina é cortada.
5. **Nunca simular o objeto com formas.** Círculos, retângulos e hexágonos não representam tecido, material ou equipamento. Se não houver imagem verificável, `BLOCKED_ASSET`, e o diagrama é desenhado só quando o slide é sobre o mecanismo (ver `SEMANTIC_VISUALS.md`).
6. **Proveniência** (gate 005): arquivo original, autor, licença, URL e SHA256. Atribuição no rodapé do slide (11 pt) e na lista de imagens do slide final. `scripts/validate_source_assets.py --require-ready`.

## 3. Imagens de artigos científicos

São a melhor fonte de micrografia, esquema de mecanismo e gráfico de propriedade, e o que dá o ar de "trabalho de engenharia".

- Só **acesso aberto com licença que permite reuso** (CC BY, CC BY-SA, CC0). A licença está na página do artigo. Anotar a licença exata, os autores, o título, o periódico, o ano e o DOI.
- Onde buscar: Europe PMC (filtro "Open access" e figuras), PubMed Central (filtro "CC BY"), repositórios de universidades, Wikimedia Commons (muitas figuras de artigos abertos estão lá).
- Usar a figura **como figura**, com a legenda curta em português e a fonte no rodapé: "Fonte: Autor et al. (ano), CC BY 4.0". Não redesenhar nem cortar de forma que mude o sentido. Não colar figura de artigo com direitos reservados.
- Redimensionar sem distorcer; se a figura original tem pouca resolução, preferir outra a esticar.
- Registrar tudo em `sources.md` do projeto. O repositório é público: registrar autor, título, ano e como obter, sem copiar o arquivo.

## 4. Fluxo de imagens dentro do método

1. No storyboard, cada slide declara família e função da imagem (ou "gráfico/diagrama, sem foto" com a razão).
2. Pesquisa de candidatas por slot, com busca ampla (termos em inglês e português, o nome técnico e o nome comum).
3. Prancha de contato por slot e escolha humana registrada.
4. Download do arquivo na maior resolução disponível (não a miniatura), `check_image_quality.py` e registro de proveniência.
5. Encaixe no layout do template, com corte que preserve o sujeito, legenda e crédito.
6. Render no PowerPoint e olhar cada imagem em tamanho real.

**Checagem de missão** em cada etapa: o equilíbrio das três famílias está sendo respeitado? Tem imagem que só preenche? Tem slide que ficaria mais claro com um diagrama ou uma figura de artigo no lugar da foto?
