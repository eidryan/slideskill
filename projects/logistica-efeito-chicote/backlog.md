# Logística, Grupo 2, v10 | Backlog de requisitos por ID

**Etapa:** 1 de 8. **Status:** BLOCKED_SOURCE / DRAFT, **não aprovado**. **Data:** 2026-11-10.

**Atenção:** este arquivo registra EXCLUSIVAMENTE requisitos rastreáveis no briefing e material secundário já no repositório, nas instruções atuais e na auditoria da v9. NÃO representa extração completa do `Modelo_Entrega_Logistica_Grupo2.pdf` nem do histórico do WhatsApp, que ainda não foram obtidos. Não marcar como ETAPA 1 CONCLUÍDA e não começar fontes/prova/storyline até revisão e aprovação humana.

## Inventário da Etapa 1 / condição G0

| Código | Origem | Disponibilidade | Confiabilidade |
|---|---|---|---|
| B1 | `projects/logistica-efeito-chicote/brief.md` | Lido em `main` | Briefing derivado, fonte secundária |
| B2 | `projects/logistica-efeito-chicote/storyboard.md` | Lido em `main` | Plano v2, **não** critérios confirmados pelo professor; contém erros/hipóteses |
| B3 | `projects/logistica-efeito-chicote/sources.md` | Lido em `main` | Inventário de fontes e lacunas, não é a fonte primária |
| B4 | `AUDITORIA_V9.md` fornecido na conversa, texto integral consultado | Acessível | Diagnóstico da versão rejeitada, não briefing primário |
| B5 | `docs/EVIDENCE_DECK_MODE.md` com checklist G0–G9 do PR #17 | Lido na `main` | Regras de processo |
| B6 | `projects/_shared/editorial-rules.md`, seções 1 e 7 | Lidas na `main` | Regras editoriais |
| B7 | PR #16: `projects/admfin-precificacao/replication/pptxgenjs-v7/build_v7.mjs` | Código lido em `refs/pull/16/head`, PR continua aberto | Apenas referência para etapa de build, não usado nem alterado |
| P1 | **`Modelo_Entrega_Logistica_Grupo2.pdf`** | **NÃO LOCALIZADO** entre anexos, Biblioteca e repositório | **Obrigatório e bloqueante para completude** |
| P2 | **Chat WhatsApp `Logística` do Grupo 2** | Aba WhatsApp visível no navegador, mas apenas lista de conversas; conversa não aberta nem exportada e skill `whatsapp-chat` indisponível | **Obrigatório e bloqueante para completude** |

Conferência: as buscas por nome exato do PDF na Biblioteca, na conversa e no repo retornaram **zero ocorrências do PDF**. Nenhuma mensagem completa da conversa do Grupo 2 foi recuperada. O texto de prévia `vou fazendo o do seminario aqui` não estabelece requisitos e não foi transcrito como regra.

## Requisitos identificados com rastreabilidade

Status `EXTRAÍDO_SECUNDÁRIO` significa que a exigência foi citada em briefing derivado, ainda pendente de confirmar contra PDF/chat. Status `PEDIDO_ATUAL` é instrução explícita nesta tarefa. Status `PLANO_CONDICIONAL` é sugestão/decisão do storyboard v2, **não** obrigação do professor. Um ID equivale a uma obrigação verificável.

| ID | Requisito único | Origem | Status de origem | Critério de aceite / observação |
|---|---|---|---|---|
| L01 | Tema: explicar o **efeito chicote** na cadeia de suprimentos. | B1 | EXTRAÍDO_SECUNDÁRIO | Problema e definição sustentados por fontes |
| L02 | Explicar as **causas** do efeito chicote. | B1 | EXTRAÍDO_SECUNDÁRIO | Diferenciar causas e fatores amplificadores |
| L03 | Incluir **casos ou aplicações práticas** do efeito chicote. | B1 | EXTRAÍDO_SECUNDÁRIO | Apenas casos com fonte comprovável |
| L04 | Explicar **medidas para reduzir** a amplificação. | B1 | EXTRAÍDO_SECUNDÁRIO | Relacionar intervenção e mecanismo |
| L05 | Discutir **tendências** capazes de reduzir a amplificação. | B1 | EXTRAÍDO_SECUNDÁRIO | Separar evidência de previsão/perspectiva |
| L06 | Destinar a apresentação à turma e ao professor de **Logística I**, graduação em engenharia. | B1 | EXTRAÍDO_SECUNDÁRIO | Linguagem técnica acessível oralmente |
| L07 | Fazer um **seminário oral**. | B1 | EXTRAÍDO_SECUNDÁRIO | Notas e argumentação orientadas à fala |
| L08 | Preparar exposição para **três integrantes**. | B1 | EXTRAÍDO_SECUNDÁRIO | Divisão individual a confirmar com o grupo |
| L09 | Planejar cerca de **12 minutos de fala**. | B1 | EXTRAÍDO_SECUNDÁRIO | Duração por seção explicitada no futuro roteiro |
| L10 | Respeitar **máximo 15 minutos incluindo perguntas**. | B1 | EXTRAÍDO_SECUNDÁRIO | Fala e arguição dentro do limite |
| L11 | Utilizar **português do Brasil**. | B1 | EXTRAÍDO_SECUNDÁRIO | Rótulos numéricos com vírgula decimal |
| L12 | Entregar slides no **Classroom até 11/11/2026 às 23:59**, sujeito à confirmação do PDF/chat. | B1/B2 | EXTRAÍDO_SECUNDÁRIO | Verificar data e prazo na fonte primária |
| L13 | Compreender que o seminário pesa **0,15 da média** da disciplina, sujeito à confirmação. | B1 | EXTRAÍDO_SECUNDÁRIO | É metadado da avaliação, não conteúdo de slide obrigatório |
| L14 | Atender a **domínio técnico e aplicação prática**: 30 pontos. | B1 | EXTRAÍDO_SECUNDÁRIO | Cobertura técnica e demonstração prática verificáveis |
| L15 | Atender a **estrutura**: introdução, desenvolvimento, aplicação e conclusão: 20 pontos. | B1 | EXTRAÍDO_SECUNDÁRIO | Progressão de seções visível nos títulos |
| L16 | Atender ao critério de **equipe**: 20 pontos. | B1 | EXTRAÍDO_SECUNDÁRIO | Participação do trio, divisão ainda pendente |
| L17 | Atender à **arguição e interação**: 15 pontos. | B1 | EXTRAÍDO_SECUNDÁRIO | Preparar perguntas e respostas sustentadas pela fonte |
| L18 | Atender a **material de apoio e bibliografia**: 15 pontos. | B1 | EXTRAÍDO_SECUNDÁRIO | Incluir créditos, bibliografia e material visual legível |
| L19 | Identificar e confirmar **quem apresenta cada parte**. | B1/B2 | PLANO_CONDICIONAL | Participantes e transições não documentados |
| L20 | Confirmar se a turma tem resultados do **Beer Game** antes de atribuir números ao jogo. | B1/B2 | PLANO_CONDICIONAL | Na ausência da série, mostrar explicitamente que está ausente |
| L21 | Não atribuir à turma valores de uma **simulação não disponível**. | B1/B2/B4 | EXTRAÍDO_SECUNDÁRIO | Evidência futura deve ser reproduzível e rotulada |
| L22 | Excluir **caso sem fonte verificável**. | B1/B3 | EXTRAÍDO_SECUNDÁRIO | Casos de papel higiênico/chips ainda sem comprovação |
| L23 | Não tratar os indicadores **Walmart–Macy's** como prova da amplificação dos pedidos. | B4 | PEDIDO_ATUAL | Somente contexto, fonte contábil ainda não auditada |
| L24 | Sustentar a **prova central** com pedidos/vendas reais por elo OU simulação de quatro elos reproduzível. | Instrução atual Etapa 3 | PEDIDO_ATUAL | Prova com fonte exata ou script/CSV, sem resultado inventado |
| L25 | Congelar a **argumentação antes da arte**: backlog → fontes → prova → storyline → aprovação → storyboard → build. | Instrução atual/B5 | PEDIDO_ATUAL | Cada gate exige arquivo e aprovação humana |
| L26 | Formalizar cada afirmação com **valor, origem, cálculo, período e classe de evidência**. | Instrução atual Etapa 2 | PEDIDO_ATUAL | Dossiê futuro; não executar antes de aprovação da etapa 1 |
| L27 | Criar storyline com **governing thought, SCQ e 8–10 títulos conclusivos**. | Instrução atual Etapa 4 | PEDIDO_ATUAL | Parar para aprovação antes de storyboard |
| L28 | Criar um storyboard com **uma tese, evidência, relação lógica e cortes** por slide. | Instrução atual Etapa 5/B6 | PEDIDO_ATUAL | Cada visual deve sustentar seu título |
| L29 | Usar **2–3 slides reais de consultoria** como referência sem redistribuir arquivos de terceiros. | Instrução atual Etapa 5/B5 | PEDIDO_ATUAL | Comparação visual documentada antes do build |
| L30 | Evitar aparência de template, com **até três slides** usando mesma configuração cabeçalho/grade. | Instrução atual Etapa 5 | PEDIDO_ATUAL | Variation check na revisão de miniaturas |
| L31 | Limitar caixas de takeaway a **3–5 slides**. | Instrução atual Etapa 5/B6 | PEDIDO_ATUAL | Uso contextual e não repetitivo |
| L32 | Separar **JSON de conteúdo** da camada de design e preservar notas do apresentador em tópicos. | Instrução atual Etapa 6/B5 | PEDIDO_ATUAL | Fonte única de conteúdo para build e notas |
| L33 | Garantir **14 pt mínimos no corpo, 12 pt nos demais textos**, exceto fonte no rodapé. | Instrução atual Etapa 6 | PEDIDO_ATUAL | Auditar tamanhos no PowerPoint |
| L34 | Usar **gráficos nativos PowerPoint** para gráficos quantitativos, com dados editáveis e rótulos pt-BR. | Instrução atual Etapa 6 | PEDIDO_ATUAL | Partes chart OOXML presentes; sem shape fake chart |
| L35 | Fazer QA no **Microsoft PowerPoint via COM**, abrir PNGs e bloquear entrega se indisponível. | Instrução atual Etapa 7 | PEDIDO_ATUAL | BLOCKED_POWERPOINT se não executado |
| L36 | Verificar cobertura de todos os IDs L##, executar `scripts/check_projects.py` e gate do PR #17. | Instrução atual Etapa 7 | PEDIDO_ATUAL | Matriz de cobertura no futuro QA |
| L37 | Exigir **revisor independente, outro agente/sessão**, para números, afirmações e notas. | Instrução atual Etapa 7 | PEDIDO_ATUAL | Criador não pode autoaprovar |
| L38 | Abrir **PR com CI aprovado**, sem merge sem autorização explícita. | Instrução atual Etapa 8 | PEDIDO_ATUAL | PR aberto, sem merge automático |
| L39 | Não alterar nem mesclar o **PR #16** usado como referência de build. | Instrução atual | PEDIDO_ATUAL | Usar código apenas como leitura |
| L40 | Não usar fotos nem cartões decorativos; manter evidência densa e variar composição. | Instrução atual/B6 | PEDIDO_ATUAL | Rejeitar iconografia e cards sem função |
| L41 | Distinguir **dado do grupo, teoria publicada e exemplo didático** no material e nas notas. | Instrução atual | PEDIDO_ATUAL | Nenhuma evidência com classificação enganosa |
| L42 | Escrever sem travessão longo, construção 'não é X, é Y' e perguntas retóricas. | Instrução atual | PEDIDO_ATUAL | Aplicar regras editoriais nos textos finais |
| L43 | Registrar explicitamente **o que foi verificado e o que falta**, sem declarar equivalência ao Adm Fin. | Instrução atual/B4 | PEDIDO_ATUAL | Relatório final com bloqueios |

## Pendências bloqueantes para fechar esta etapa

| Código | Falta | Ação necessária |
|---|---|---|
| P1 | PDF original do modelo do professor | Anexar `Modelo_Entrega_Logistica_Grupo2.pdf` ou disponibilizá-lo em fonte acessível; extrair literalmente todos os critérios adicionais e mapear aos IDs |
| P2 | Histórico da conversa WhatsApp do Grupo 2 | Disponibilizar exportação ou acesso legível à conversa específica, para obter decisões, nomes/atribuições, datas e demandas reais; não inferir da prévia da lista |
| P3 | Confirmação/alteração de requisitos após o PDF e chat | Rodar diff do backlog, gerar novos IDs sem renumerar existentes e registrar cobertura/origem |
| P4 | Aprovação humana explícita do backlog fechado | Marcar gate G1 PASS apenas após reconciliação e aprovação |

## Portão de passagem

**Resultado: BLOCKED_SOURCE.** Este backlog é um inventário preliminar rastreável de 43 requisitos, não uma lista completa. Nenhuma etapa posterior foi iniciada. A branch contém este arquivo para revisão; não fazer merge sem autorização.
