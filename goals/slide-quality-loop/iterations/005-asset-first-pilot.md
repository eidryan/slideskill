# Iteração 005 — piloto asset-first, edição e proveniência

**Data:** 2026-11-10. **Resultado:** PARTIAL PASS para os dados; FAIL para o uso de fotos/SEM; não aprovado para produção.

## Contexto
Após rejeição dos desenhos geométricos da iteração 003, o objetivo era testar três slides (módulo, micrografia Y-TZP, fotografia de prótese), cada um com duas composições A/B, sem simular imagens empíricas com formas.

## Experimento A — ferramenta visual independente (Canva)
Foi solicitada uma apresentação de seis slides com dados auditados e imagens exclusivamente reais/atribuídas. O gerador produziu 12 páginas; as seis primeiras estavam vazias e as seis restantes continham as alternativas. O material é EDITÁVEL no Canva, mas falhou em fidelidade.

- Tentativas de importar a foto real do Wikimedia Commons e a figura SEM original da Applied Sciences falharam com erro HTTP fetch_failed. O ambiente local também não conseguiu resolver o host de download.
- O texto gerado atribuiu a figura de trincas a Kim et al., Acta Biomaterialia (2013), em vez da referência instruída: Kim et al., Applied Sciences 12(18), 9088 (2022). Atribuição contraditória = BLOQUEADOR.
- A inspeção de mídia expôs imagens sem ligação demonstrada com as fontes. Alguns ativos receberam tags como concrete, wall, brick, rough, paper/background. Isso impede classificar as imagens como micrografias verificadas.
- Logo, nenhuma imagem produzida pelo Canva deve ser usada como evidência científica nesse deck. Uma aparência mais fotográfica não é ganho se a proveniência é falsa ou desconhecida.

## Experimento B — gráfico nativo editorial
Dois slides novos em PPTX foram criados a partir do CSV de propriedades no repositório. A: intervalos em eixo linear de 0 a 400 GPa. B: contexto 0–400 GPa e zoom separado 0–40 GPa, com aviso sobre escalas. Materiais: osso cortical 7–30, vidro 45S5 30–40, HA 70–120, Y-TZP 200–210, alumina 380 GPa.

Ambos foram renderizados para PDF no LibreOffice, e os renders foram inspecionados; corrigimos a largura de rótulos e uma sobreposição de barra/eixo. Os textos e intervalos são editáveis. Arquivos da rodada: biocer_data_ab_v5.pptx/pdf, build_data_pilot.cjs. Não são evidências de ensaio experimental, apenas valores do relatório.

## Conclusão
Uma direção mais editorial funciona para dados sem reproduzir objetos com círculos/retângulos decorativos. O teste científico com imagens REALMENTE autênticas não foi concluído: ficou BLOCKED_ASSET. Não chamar esse ciclo de êxito completo.

## Regra proposta
Uma imagem só pode comprovar uma tese se houver arquivo de origem, metadados de autor/licença, hash SHA256, limites explícitos do que ela demonstra e inspeção da imagem. Geração de IA pode criar ilustração conceitual ROTULADA, mas não microscopia fictícia.

## Próximo passo
Obter manualmente, de fonte autorizada, uma fotografia real de componentes de prótese e uma micrografia com barra de escala; preencher source_assets_v5.json, rodar gate de hash e depois gerar quatro slides A/B com imagens. Só então comparar com o protótipo numérico e a versão rejeitada.

**SlidePoise:** ainda não foi instalado/testado; não afirmar integração.