# Briefing para o agente que vai montar a apresentação de Biocerâmicas

Leia este arquivo inteiro antes de abrir qualquer outro. Ele foi escrito para você **não** conhecer o deck anterior do grupo. Isso é de propósito: queremos que você proponha os slides que **você** acredita serem os mais dinâmicos, visíveis e didáticos, com bom equilíbrio de fotos, diagramas, imagens de banco e figuras de artigos científicos. O que existe é o assunto, o público, o template e as regras. A estrutura dos slides é sua.

## 1. Missão

Montar uma apresentação oral de 20 minutos que um público de engenharia **sem formação em biomateriais** entenda, lembre e ache bonita de ver. Critérios que o autor usa para aceitar, em ordem:

1. **Dinâmica**: ritmo variado. Slide de imagem grande, slide de número, slide de comparação, slide de mecanismo, slide de sequência. Nenhum cartão repetido em fila.
2. **Visível**: corpo de texto a partir de 16 pt, imagens grandes, contraste alto, nada em cima de nada, legível do fundo da sala.
3. **Didática**: cada slide ensina uma coisa que o público consegue repetir depois. O título afirma essa coisa.
4. **Equilíbrio de imagens**: veja `docs/IMAGE_STRATEGY.md`. Evidência do objeto (foto e micrografia reais), cena de contexto (stock de qualidade), figuras científicas de artigos de acesso aberto e diagramas próprios onde um diagrama explica melhor que uma foto.
5. **Fidelidade ao template** escolhido (seção 7) e **fidelidade aos fatos** (seção 5).

**A cada etapa do processo (seção 9), pare e confira esta lista.** Se a etapa não serviu à missão, refaça antes de seguir.

## 2. Situação real

- Segundo trabalho da disciplina Introdução à Engenharia dos Materiais I, Engenharia de Produção, turma A1, 2026.2, em universidade federal. Relatório de 21 páginas já entregue. Falta a apresentação.
- **Apresentação oral em 19/11/2026, às 14 h.** 20 minutos (19 min 30 s úteis, 30 s de margem), depois perguntas.
- Três integrantes, que chamamos de **A, B e C**. Os três blocos de fala são fixos: A abre e vai da pergunta inicial até os requisitos e a rigidez (6 min); B cuida da classificação pela resposta do tecido e dos materiais (7 min); C cuida da fragilidade, da fabricação, das aplicações e da síntese (6 min 30 s). A passagem de bloco acontece no fim de um slide, com uma frase de ponte. A quantidade de slides de cada bloco é sua decisão, dentro do tempo (cerca de 1 min por slide de conteúdo, 30 s por slide de abertura ou de imagem pura).
- Na hora das perguntas, o slide de referências e créditos fica projetado.
- O professor valoriza **propriedades e aplicações** dos materiais e a ligação com os conceitos da disciplina (ligação iônico-covalente, fragilidade, defeitos, módulo de ruptura, processamento, estrutura, propriedade, desempenho). A ênfase de Engenharia de Produção é fabricação, controle de qualidade e o caso de 2001.
- Idioma: português do Brasil. Números no formato brasileiro (vírgula decimal).

## 3. Público e o que ele já sabe

Colegas de Engenharia de Produção e o professor. Conhecem tração, módulo de elasticidade e tipos de ligação. Não conhecem prótese de quadril, osso como material, zircônia estabilizada, vidro bioativo nem mecânica da fratura. Um termo técnico novo precisa de uma imagem ou de uma comparação cotidiana na primeira vez em que aparece.

## 4. Tese e o que o público deve aprender

**Tese:** as biocerâmicas se dividem pela resposta do tecido (inerte, bioativa, reabsorvível); a baixa tenacidade, que vem da ligação iônico-covalente, é a limitação comum; o processamento e a microestrutura são o caminho para reduzi-la.

Ao fim, o público deve conseguir responder:

1. Por que usar cerâmica para substituir osso e dente?
2. O que um material precisa cumprir para ficar vinte anos dentro do corpo?
3. O que significa bioinerte, bioativo e reabsorvível, e um exemplo de cada?
4. Por que a zircônia é mais tenaz que a alumina e por que ela envelhece na água?
5. Por que um defeito pequeno derruba uma cerâmica e como isso se calcula?
6. Como se faz uma peça cerâmica implantável e por que cada peça é testada?
7. O que aconteceu em 2001 e o que uma fábrica deve aprender com isso?
8. Para qual aplicação cada material serve?

## 5. Conteúdo: mapa por conceito (fatos congelados, estrutura livre)

A fonte integral é `source/relatorio.md` (21 páginas). Os números abaixo estão lá ou em `data/`. **Use só fatos do relatório e dos dados.** Se faltar um fato, registre a lacuna, não invente. O mapa está organizado por **conceito**, não por slide. Reúna, divida ou reordene como a didática pedir, mantendo as passagens de bloco.

| # | Conceito | O que explicar | Fatos e prova | Erro comum a evitar | Oportunidades visuais (ideias, não ordens) |
|---|---|---|---|---|---|
| 1 | O osso é um compósito | Cerâmica já mora no corpo: apatita no colágeno | Cerca de 2/3 da massa seca do osso é apatita carbonatada | Pensar que osso é "cálcio puro" | Hierarquia do osso em micrografia ou esquema de artigo aberto; radiografia de fêmur |
| 2 | Cerâmica avançada e biocerâmica | Pó sintético, alta pureza, microestrutura controlada; biocerâmica repara ou substitui tecido | Definições; Hench 1991, Ratner 2013 | Confundir com louça e tijolo | Contraste foto de louça ou tijolo e foto de componente avançado |
| 3 | Histórico em três gerações | Do "menos reação possível" à reação controlada e à regeneração | 1970 primeiras cabeças e cúpulas de alumina; 1971 vidro de Hench; anos 1980 revestimento de HA e cabeça de zircônia; 2001 recolhimento; anos 2000 ZTA e arcabouços | Ver a história como lista de datas | Linha do tempo com imagens de cada marco |
| 4 | Requisitos do implante | Biocompatibilidade, estabilidade, fadiga, rigidez próxima à do osso | ISO 10993; 37 °C, pH 7,4, cloreto e proteínas; 1 a 2 milhões de passos por ano, 2 a 3 vezes o peso corporal no quadril; vida de 20 anos significa dezenas de milhões de ciclos | Achar que só importa não ser tóxico | Cena de caminhada ou corrida; esquema de carga no quadril |
| 5 | Módulo e blindagem de tensões | Implante rígido demais descarrega o osso e o osso perde massa | Osso cortical 7 a 30 GPa; alumina 380 GPa (mais de 10 vezes); lei de Wolff; stress shielding | Achar que mais rígido é sempre melhor | Gráfico nativo de barras em escala log (`data/modulo-elasticidade-slide5.csv`); radiografia ou figura de artigo sobre blindagem |
| 6 | Classificação pela resposta do tecido | Três interfaces: cápsula fibrosa, ligação química, substituição | Bioinerte (alumina, zircônia, ZTA); bioativa (HA densa, vidros); reabsorvível (β-TCP, sulfato de cálcio, cimentos); poros acima de 100 µm deixam o osso crescer por dentro | Achar que "inerte" é inerte de verdade | Histologia ou micrografia da interface osso-implante de artigo aberto; esquema das três respostas |
| 7 | Alumina | Dura, estável, polível; pouca tenacidade | Al₂O₃ acima de 99,5 %; corundum; dureza cerca de 2000 HV; flexão 400 a 600 MPa; K_IC 3,5 a 4,5 MPa·m^½; grão abaixo de 2 µm com prensagem isostática a quente | Achar que dureza é o mesmo que tenacidade | Micrografia da microestrutura; foto de cabeça femoral cerâmica |
| 8 | Zircônia e tenacificação | A fase que muda de forma freia a trinca | ZrO₂ monoclínica até cerca de 1170 °C, tetragonal até cerca de 2370 °C; 3 mol % de Y₂O₃ mantém a fase tetragonal; transformação aumenta o volume em cerca de 4 %; K_IC 6 a 10; flexão 900 a 1200 MPa; degrada em água (envelhecimento) | Achar que o mesmo mecanismo que protege não pode também degradar | Micrografia de Y-TZP; diagrama de fases; esquema animado em passos da trinca e da zona transformada; foto de coroa |
| 9 | ZTA | Compósito que junta alumina e zircônia | Cerca de 80 % de alumina e 17 % de zircônia; K_IC 5,5 a 7; flexão 1000 a 1400 MPa; usada na maior parte das cabeças e cúpulas atuais | Achar que é só uma mistura | Foto do componente; micrografia de artigo |
| 10 | Fosfatos de cálcio | Composição do osso: HA e β-TCP | HA Ca/P 1,67, flexão 50 a 115 MPa, K_IC 0,7 a 1,2; β-TCP Ca/P 1,5, dissolve em meses; bifásicas ajustam a velocidade; HA decompõe acima de 1300 °C | Achar que HA serve para peças que sofrem carga | Micrografia de revestimento ou de grânulos; foto de granulado para enxerto |
| 11 | Vidro bioativo 45S5 | O vidro que se liga ao osso | 45 % SiO₂, 24,5 % Na₂O, 24,5 % CaO, 6 % P₂O₅ (em massa); cinco etapas até a apatita carbonatada em horas; flexão 40 a 60 MPa; S53P4 contra infecção óssea | Achar que a camada de apatita vem do osso | Micrografia da camada de HCA; esquema das cinco etapas em corte |
| 12 | Carbono pirolítico e outras | Cerâmica que também protege o sangue | Folhetos de válvulas cardíacas desde os anos 1970; Y-90 em microesferas de vidro | Achar que cerâmica só serve para osso | Foto de válvula cardíaca mecânica |
| 13 | Origem da fragilidade | Sem deformação plástica, não há alívio na ponta do defeito | Ligação iônico-covalente; curva linear até a ruptura; compressão muito maior que tração | Confundir resistência com tenacidade | Foto do ensaio de flexão; fratografia (origem da fratura) |
| 14 | Griffith e sensibilidade a defeitos | O maior defeito decide | σ_c = K_IC / (Y·√(π·a)); defeito de 50 µm: HA 80 MPa, alumina 320 MPa, Y-TZP 640 MPa (`data/griffith.csv`); Weibull; flexão σ = 3FL / (2bd²) | Achar que testar uma amostra garante cada peça | Gráfico nativo de resistência × tenacidade, escala log (`data/propriedades.csv`) |
| 15 | Fabricação e controle | Pó, conformação, sinterização, HIP, usinagem, ensaio de prova | Alumina sinterizada acima de 1500 °C, zircônia entre 1350 e 1500 °C; cada peça passa por proof test; rastreabilidade por lote; revestimento de HA por plasma | Achar que controle por amostragem basta | Fotos reais do processo (pó, corpo verde, forno, usinagem, ensaio); fluxo com setas |
| 16 | O caso de 2001 | Mudança de forno virou mudança de produto | Fraturas acima do esperado em lotes sinterizados em forno novo; microestrutura alterada, degradação acelerada; lotes recolhidos; três lições: mudança de equipamento é mudança de produto, efeito leva anos, rastreabilidade limita o recolhimento | Achar que foi acaso | Linha do tempo do caso; foto de cabeça fraturada ou de forno; fluxo de causa e efeito |
| 17 | Ortopedia | Onde cada material entra e por quê | Cabeça e cúpula em alumina e ZTA, desgaste de micrômetros por ano, evita osteólise por partículas de polietileno; revestimento de HA em haste de titânio por plasma (titânio leva a carga, HA liga ao osso); risco de fratura abaixo de 1 em 10 mil peças | Achar que cerâmica quebra "toda hora" | Radiografia de prótese com marcações; foto intraoperatória ou de componente |
| 18 | Odontologia | A maior área de uso | Coroas e pontes de Y-TZP fresadas por CAD/CAM; dissilicato de lítio cerca de 400 MPa onde a estética pesa; implante de zircônia sem cor cinza sob a gengiva; creme dental com vidro bioativo fecha túbulos da dentina | Achar que odontologia usa só metal | Fotos clínicas e de laboratório (stock de qualidade), fresagem, micrografia de dentina |
| 19 | Enxertos e arcabouços | Preencher o defeito com algo que vira osso | Grânulos e blocos porosos com poros acima de 100 µm; cimentos de fosfato de cálcio que endurecem no corpo; impressão 3D de arcabouço a partir de tomografia | Achar que o osso do paciente é sempre possível | Micrografia de arcabouço; foto de enxerto; impressão 3D |
| 20 | Limitações e tendências | Baixa tenacidade, degradação da zircônia, custo | Compósitos, polímero com cerâmica, impressão 3D, dopagem iônica, nitreto de silício | Terminar em "futuro brilhante" sem limite | Foto ou figura de uma tendência |
| 21 | Síntese | Três famílias, uma limitação comum, uma cadeia | processamento → estrutura → propriedade → desempenho; as quatro conclusões do relatório | Repetir o índice | Um visual que amarre os conceitos 6, 8, 10, 11 e 14 |

Resposta à pergunta de abertura (conceito 1 e 2) deve voltar na síntese.

### Pontos de conteúdo ainda abertos (resolver ou marcar no slide)

- Módulo da alumina: 380 GPa na Tabela 1 e 380 a 400 no gráfico. Escolher um valor e usar o mesmo em todo o deck.
- Módulos de Ti-6Al-4V, aço 316L, CoCrMo e osso trabecular (conceito 5) e valores de dissilicato de lítio no gráfico de resistência × tenacidade **não estão na Tabela 1**. Declare como "valor da literatura, a conferir" ou remova.
- ASTM F1185 está nas referências e não é citada no texto.
- Edição do livro de Callister: a disciplina lista a de 2016.

## 6. Imagens

Siga `docs/IMAGE_STRATEGY.md`. Resumo operacional:

- **Metas para ~16 slides**: pelo menos 8 com imagem real; 3 ou mais de evidência do objeto; 2 ou mais de cena de contexto; 2 ou mais figuras de artigos de acesso aberto; diagramas só onde o mecanismo pede (conceitos 8, 11 e 15 são bons candidatos); gráficos nativos nos conceitos 5 e 14.
- **O que já se sabe que não funcionou**: fotos escolhidas como "o primeiro arquivo livre" (fundo escuro, mão enluvada, baixo contraste), poucas imagens (só 3 de 16 slides), nenhuma imagem de microestrutura, nenhuma figura de artigo. Evite repetir.
- Onde buscar: Europe PMC e PubMed Central com filtro de acesso aberto e licença CC BY (micrografias, esquemas, radiografias, fratografias de artigos sobre biocerâmicas, zircônia, vidro bioativo, hidroxiapatita, scaffolds, stress shielding); Wikimedia Commons (categorias de implantes, radiografias, microscopia de cerâmicas, odontologia); Pexels e Unsplash para cena de contexto (clínica, laboratório, forno, usinagem, caminhada).
- **Prancha de contato** com 3 candidatas por vaga, autor, licença e resolução, e **o humano escolhe**. Sem escolha, o slot fica BLOCKED_ASSET.
- Proveniência de cada imagem em `sources.md` (autor, título, ano, licença, URL ou DOI) e crédito no rodapé do slide e no slide final.
- Rode `python scripts/check_image_quality.py deck.pptx --min-slides-with-image 8` antes de entregar.

## 7. Template e fontes

O autor escolheu e aprovou o template **"Chemistry Thesis Defense"** da galeria do Canva e pediu que o deck siga a estrutura dele. Tudo que você precisa está em `template/DESIGN-SYSTEM.md`: cores, fontes, estrutura fixa (aba de título em pílula, marcador de página, rodapé com linhas e nós), peças de layout (moldura de circuito, colchete com nó, divisor, botão-pílula, números grandes), regras de uso e receitas de reconstrução.

- O template define a **casca**. A composição dentro dela é livre, desde que respeite as regras de uso e a missão.
- **Sem nome de apresentador no rodapé.** Rodapé com tema e instituição.
- **Fontes**: o autor sentiu falta das fontes originais do template. Não aceite a fonte do Windows de primeira. Siga a ordem da seção 7 do design system (incorporar fonte livre com permissão, PDF do Canva, fonte livre parecida, só então fonte do sistema). Peça permissão antes de baixar fonte.
- Uma versão anterior que usou o template com fontes do Windows e quatro fotos existe, mas **você não vai vê-la**. O objetivo é superá-la em imagens, em variedade de layout e em fidelidade de fonte.

## 8. Entregas

1. **Primeira saída (antes de qualquer PPTX):** o seu **storyboard**: tese por slide, título de ação, conceito do mapa que ele cobre, relação lógica, imagem (família, função, candidatas), o que fica nas notas, tempo estimado, quem fala. Mais o fio da apresentação e a justificativa da quantidade de slides.
2. Prancha(s) de contato das imagens e a escolha humana registrada.
3. Imagem de design de 2 ou 3 slides-chave em tamanho real para aprovação (gate 007), com SHA256.
4. PPTX editável e PDF, renderizados no PowerPoint.
5. Notas do apresentador em tópicos, por slide, com o nome do bloco (A, B ou C) e o tempo.
6. Relatório de QA com o que foi testado e o que não foi, mais o resultado de `check_image_quality.py`.
7. `outcome.md` do caso com o que funcionou, o que o autor corrigiu e se o resultado ficou parecido com algum deck anterior.

## 9. Processo com checagem de missão

| Etapa | O que fazer | Missão: pergunte a si mesmo |
|---|---|---|
| 0 | Ler este arquivo, `SKILL.md`, `docs/TEMPLATE_FIRST_MODE.md`, `docs/IMAGE_STRATEGY.md`, `projects/_shared/editorial-rules.md`, `template/DESIGN-SYSTEM.md`, `brief.md`, `sources.md`, `source/relatorio.md`, `data/` | Entendi o público e o que ele precisa aprender, ou só decorei os fatos? |
| 1 | Tese, SCQ, fio e storyline. Backlog de decisões | Os títulos lidos em sequência ensinam alguma coisa? |
| 2 | Storyboard próprio com imagem declarada por slide | Há variedade de ritmo? As três famílias de imagem aparecem nas metas? |
| 3 | Pesquisa de imagens, pranchas, escolha humana, proveniência | Cada imagem prova ou ensina? A qualidade é de projeção em sala? |
| 4 | Imagens de design de slides-chave, aprovação humana | Isto parece o template e parece feito à mão, ou parece gerado? |
| 5 | Reconstrução editável | Corpo a partir de 16 pt? Nada em cima de nada? Fonte do template? |
| 6 | QA no PowerPoint, miniaturas lado a lado, revisor independente | Qualquer elemento idêntico em todos os slides? Algum slide sem lição clara? |
| 7 | Notas, roteiro e entrega | O orador consegue falar sem ler o slide? |

## 10. Proibições e regras duras

- Não leia, copie nem peça os arquivos da lista "não ler" abaixo. Se você os abrir por engano, avise e descarte a influência.
- Não invente fato, número ou unidade. Não use foto gerada por IA como se fosse real nem simule objeto físico com círculos e retângulos.
- Não aprove a própria estética. Aprovação é do autor (e de um revisor independente para fatos).
- Não baixe fonte ou arquivo sem pedir e dizer nome, origem e tamanho.
- Não coloque nome de integrante em slide.
- Texto: frases curtas, sem travessão nem meia-risca como pontuação, sem "não é X, é Y", sem pergunta retórica no corpo (exceção: a pergunta de abertura da apresentação), números em formato brasileiro. Detalhes em `projects/_shared/editorial-rules.md`.
- O repositório é público. Sem nomes de pessoas, caminhos de disco, e-mails nem conversas. Veja `projects/README.md`.

## 11. Arquivos

**Pode ler:** este arquivo, `brief.md`, `sources.md`, `source/relatorio.md`, `data/*.csv`, `template/DESIGN-SYSTEM.md`, `../_shared/editorial-rules.md`, `../../docs/*.md`, `../../SKILL.md`.

**Não ler para desenhar (herdam a estrutura antiga):** `source/slides-v1.md`, `reference/`, `experiments/`, `storyboard.md` (histórico), `art_direction_v4.json`, `visual-plan-experiment.json`, `design_handoff_v7.json`, e os números de slide citados em `qa.md`.

## 12. Primeira saída esperada

Responda com o seu storyboard (entrega 1), antes de pesquisar imagem ou abrir ferramenta de PPTX. O autor vai aprovar ou redirecionar. Só depois siga para as etapas 3 a 7.
