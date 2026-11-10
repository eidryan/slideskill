# Final review, Adm Fin v6

Reviewer: independent Task 3 reviewer, 2026-10-05. No builder, manifest or output file was edited.

## Verdict

**Approved with fixes.** There are no Critical findings. Three Important findings remain. Two affect only the backup deck (I-1, I-2). One affects main slide 7 (I-3). The main deck is factually faithful to the dissertation and meets every hard content rule in the brief. Fix the three Important items, re-export the PDFs, then deliver.

## What was verified

| Check | Result | Evidence |
|---|---|---|
| Slide count | Pass | Main deck has 16 slides, backup has 3 (python-pptx). PDFs have 16 and 3 pages. |
| Slide order and purpose | Pass | Titles match the plan storyboard 1-16 exactly. |
| Size, font | Pass | 12192000 x 6858000 EMU, Arial only in both decks. |
| Main deck minimum sizes | Pass | Body and table text at least 15 pt. Slide 14 note is 14 pt. Labels are 13.5 pt, tracker and page number 12 pt. |
| Backup minimum sizes | **Fail** | See I-2. |
| Notes = manifest = script | Pass | For all 16 slides, speech, transition and every source string from `content_v6.json` appear verbatim in the PPTX notes and in `roteiro_fala_v6.md`. |
| PDFs match PPTX | Pass | Every text run of every slide (both decks) appears in the matching PDF page text. |
| Timing | Pass | Sum is 1,630 s = **27:10**, at or under 29:30. Speech rates run 86-115 wpm, except the cover at 148 wpm for 99 words in 40 s. |
| No visible source footers on main content slides | Pass | Only provenance that changes meaning is visible ("Exemplo NIBO do Anexo 1" on 6 and 8). Citations are in notes and on slide 16. |
| Em dashes | Pass | None in manifest, script or backup builder. En dashes appear only in page ranges. B3 uses a minus sign (U+2212). |
| Rhetorical questions | Pass | The only "?" is the research question on slide 2. |
| "não é X, é Y" | Pass | No occurrence. |
| Course name | Pass | Cover reads "ADMINISTRAÇÃO FINANCEIRA II". No course code anywhere. |
| R$ 31,22 | Pass | Called "custos individualizados por unidade" (slide 8). The only "por empregado" is the speech's negation: "não podemos afirmar que o último valor seja por empregado". |
| NIBO not generalized | Pass | Disclaimers on 1 (speech), 6 (speech and lead), 8, 15, and B1-B3. "Sem estabelecer um percentual geral" is on 6. |
| Client cost | Pass | ORGC1 reports per-client cost (slide 8 speech, slide 14 row "Cliente: ORGC1 informa custo por cliente"). Nothing says no firm computes it. |
| Salário mínimo qualifier | Pass | No "regional" or "nacional" in any artifact. |
| Anexo 2 kept out of main | Pass | No 13.1%, 25/36, 27%/30%, R$ 100, Bruni and Famá, or whale curve in the main deck. |
| Facts vs presenter inferences | Pass | Notes tag presenter calculations (6, 8) and presenter readings (3, 10, 13, 15). |

### Numbers checked against the source

- Slide 2: question and objective (p. 19), continuity and competitive advantage (p. 21).
- Slide 5: 19.169 organizations in May 2018 (p. 35, 64), "forte concorrência" (p. 36), services (p. 40-46).
- Slide 6: all 12 table cells, R$ 24.768,69, R$ 1.896,27, R$ 11.150,00 and R$ 5.100,00 match p. 105. 13.046,27 / 24.768,69 = 52.67%, shown as "cerca de 53%". Column sums differ from published totals by R$ 0,01, as the slide discloses.
- Slide 8: 2,33 / 1,56 / 31,22 match p. 105.
- Slide 10: 11 interviews from Dec/2017 to Dec/2018 (Quadro 13, p. 71). 109 contracts from 2004-2017 (p. 80). Non-probability sample (p. 70).
- Slide 11: four variables (p. 66, 68). Two variables in the abstract (p. 9).
- Slide 12: margem bruta, EBIT, ROE and ROI (Quadro 12, p. 69). Absorção, variável and ABC (p. 70).
- Slide 13: limited companies, 6-400 staff, average 120 clients (p. 72).
- Slide 14: one participant uses cost alone (p. 22). ORGC6, ORGC7, ORGC1 and ORGC2 quotes (p. 76-79). 43 of 109 (p. 80).
- Slide 15: "por unanimidade ... melhor método" (p. 87). Future research proposal (p. 88).
- Backup, recomputed from `anexo2.csv`:
  - cost sum is 24.768,69
  - 11 clients pay the ideal or more, 17 pay between cost and ideal, 8 pay below cost
  - the cumulative peak is 10.390,65, the final result 9.201,31 and the loss 1.189,34
  - the peak is 112.9% of the final result
  - the ideal-to-cost ratio is 1,5791 in every row

## Findings

### Critical

None.

### Important

**I-1. Backup B2 and B3: chart axis numbers render in US format.** Files are `output/apresentacao_v6_backup_anexo2.pdf` and `.pptx` (chart1.xml, chart2.xml), produced by `build_backup.mjs`. The y-axes show "1,000 ... 4,000" (B2) and "2,000 ... 12,000" (B3). In Portuguese, "10,000" reads as ten. This sits next to "R$ 10.390,65" on the same slide. Cause: number format `#,##0` follows the rendering machine's locale. **Fix:** set a pt-BR locale in the chart number format, e.g. `[$-416]#,##0`, or let the builder emit pre-formatted axis labels. Then re-export the backup PDF and confirm "4.000" and "10.000" render.

**I-2. Backup B2 and B3: text below the plan's minimums (body 14 pt, auxiliary 12 pt).**
- Provenance line "Exemplo ilustrativo: escritório NIBO (2018)..." is 10.5 pt (B2, B3).
- Line legend "Linha escura... Linha clara..." is 11.25 pt (B2).
- Chart axis tick labels and axis titles are 10.5 pt (both charts).
- Card descriptions ("pagam o ideal ou mais" and similar) are 13.5 pt.

The 10.5 pt footer also repeats the small-footer problem from backlog EDI-004 and EDI-005. **Fix in `build_backup.mjs`:**
- provenance line and legend: at least 16 px (12 pt)
- chart axis fonts: at least 12 pt
- card descriptions: at least 19 px (14 pt)

Then re-render and check that the cards still fit.

**I-3. Main slide 7 drops the SESCAPLDR wording that Adrian explicitly approved.** The backlog says v5 slide 3 was approved and should be preserved (SLD-003-01). It also asks to keep the formulation that cost is how you know the firm's reality (PRE-004) and to state perceived value clearly (PRE-011, PRE-034). Two parts of v5 slide 3 were correctly removed: its qualitative axes and its footnote (SLD-003-03). The three source quotes (p. 47) were removed as well, and no approved decision covers that. Slide 7 now only paraphrases ("Conhecer o esforço e a estrutura do escritório"). The speech refers to "avaliações diferentes sobre facilidade e conveniência" without saying what they are. **Fix in `content_v6.json`, slide 7:**
- Replace the bottom line with: "Avaliações citadas na revisão: custo, a forma mais importante para conhecer a realidade da empresa; concorrência, a mais fácil e a mais traiçoeira; valor percebido, a menos importante e a melhor forma de precificar."
- Add one speech sentence that attributes these assessments to SESCAPLDR via the dissertation.
- Add the note source "SESCAPLDR (2016), citado em Cruz Neto (2018), p. 47".
- Raise slide 7 timing by about 10 s. The total stays near 27:20.

### Minor

- **m-1. Slide 14, price row: claim slightly stronger than the source.** The row says "Só um participante declara usar custo isoladamente". The source (p. 22) says "afirmou ter segurança em adotar ... isoladamente". The speech is accurate. Suggested wording: "Só um participante afirma ter segurança para usar apenas o custo."
- **m-2. Slide 14 speech: author's caveats on salário mínimo omitted.** The author gives two caveats: the linkage is barred by Constitution art. 7, IV, and it "não se caracteriza tecnicamente como um método de precificação" (p. 21, 87). One optional sentence would cover them without making salário mínimo central (RES-018).
- **m-3. Slide 15: one limit is labelled as the presenter's but is the author's.** The limit "O desempenho reflete a percepção dos participantes" is tagged "identificado pelo apresentador". The author states it himself (p. 62: "desempenho percebido e não o desempenho medido"). Suggest attributing it to the author in the notes. Optionally also note the source's own inconsistency: results report timesheet use with satisfactory results (p. 77, 84), while the conclusion says "não há a utilização de qualquer indicador de desempenho" and timesheet use by a minority (p. 87).
- **m-4. Slide 10: requested labels missing.** The words "declarado / observado" requested in MET-012 and SLD-LEN-02 are not shown. The slide says "Relatos" and "Observação". Suggest column labels "Entrevistas: declarado" and "Documentos: observado".
- **m-5. Slide 16: secondary references incomplete.** Authors used in the deck but not listed:
  - CFC (2018), slide 5 count
  - Hernandes (2010), intangibility, slide 5
  - Silva et al. (2015), survival quote, slide 9 speech
  - Gilioli (2010), slide 12
  - Souza and Clemente (2011) and Iudícibus (2006), fixed and variable costs, slide 4

  Also, "receita de bolo" is Cruz (2012), while the slide lists only "Cruz et al. (2012)". The whole primary reference is bold. ABNT bolds only the title.
- **m-6. Slide 12, Desempenho row: planned measures mixed with results.** "Prazos, tarefas e satisfação" come from the results (p. 77-78, 84), not from the Quadro 12 design. The bottom line already clarifies this. A cleaner row would read: "Previsto no Quadro 12: margem bruta, EBIT, ROE e ROI".
- **m-7. Section tracker does not mark the current section.** The tracker "Contexto · Fundamentos · Método · Resultados" is identical gray on every slide, so it carries no position information. Slides 15 and 16 sit under "Resultados". Suggest highlighting the active section in navy.
- **m-8. Plural "anexos" in the main deck.** Slide 1 speech says "O exemplo numérico dos anexos" and slide 15 says "Os anexos NIBO". The main deck only uses Anexo 1. Accurate (both annexes are NIBO) but could say "do Anexo 1".
- **m-9. B2 title states no point.** The title is descriptive. RES-022 asks each chart to state its point. Suggested title: "8 dos 36 clientes do escritório-exemplo pagam menos do que custam".
- **m-10. B1 speech: inference stated as fact.** It says "então os dois anexos descrevem o mesmo escritório". This is inferred from equal totals. Suggest "o que indica que...".
- **m-11. Slide 14 bottom line is cramped.** It sits about 8 px under the table, lower than on the other slides. The slide also has no lead line. Cosmetic only.
- **m-12. Slide 4: "despesas" never explained.** The title says "Custos e despesas", but the slide never says how a cost differs from an expense. The source section has the same title, so this is acceptable. A short speech clause would close the gap.
- **m-13. Spacing artifacts in rendered images.** The PDF images show small letter-spacing gaps in a few lines ("obr a" on 4, "concen tra" on 5, "mercado ." on 15). These are likely rasterization artifacts. Check once in PowerPoint before presenting.

## Not verified / out of scope

- Plan Task 3 item "copy final versioned artifacts beside the v5" was not done, because this brief forbids changing artifacts. The controller should do it after the fixes.
- The v5 files were not hash-checked against a baseline. No v5 path was written by this review.
- PDF images were inspected as provided. PowerPoint itself was not opened.

## Backlog

All 264 IDs are classified in `review/backlog_coverage_v6.md`:

| Status | Count |
|---|---|
| Implemented | 169 |
| Resolved/validated in source | 52 |
| Excluded by approved decision | 32 |
| Backup | 11 |

Partial items are PRE-004 and SLD-003-01 (I-3), MET-012 and SLD-LEN-02 (m-4), and RES-022 (m-9).
