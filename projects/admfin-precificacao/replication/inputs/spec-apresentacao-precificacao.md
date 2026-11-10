# Spec: Adm Fin presentation, "Exemplo de aplicação" (quant version)

- Course: Adm Fin (Administração Financeira II), Primeira atividade, Formação de Preços
- Presentation: Monday 2026-10-05, around 15:00, hybrid (sala 444, Bloco E, or the Classroom link)
- Adrian's part: "Exemplo de aplicação", based on Cruz Neto's dissertation (Mackenzie)
- Classmates: Luisa (Bruni/Famá, ch. 13 to 15), Robert (Padoveze, Padoveze/Takakura)
- Source: `<LOCAL_PATH>` (text: `cruz_neto.txt`, `=== pN ===` page markers)
- Written: 2026-10-03

## 1. Thesis

The dissertation is qualitative: 11 semi-structured interviews and 109 fee
contracts. It concludes that accounting firms price by cost and only glance
at the market. The interviewees make claims about outcomes that the study
never tests. This presentation builds a synthetic accounting firm calibrated
on the dissertation's own numbers, then lets the pricing methods compete.

One-line pitch: "Os entrevistados fizeram afirmações. Eu construí o escritório e testei."

## 2. Facts taken from the dissertation (the calibration base)

Every number used in the model must trace back to one of these items, or be
labelled on the slide as an assumption.

| # | Fact | Where |
|---|---|---|
| F1 | Method: qualitative, exploratory, 11 interviews, 109 contracts (SP, 2004 to 2017), non-probabilistic sample | Resumo p9; 4.6 p80; amostra p70 |
| F2 | Most used method: cost (actual cost incurred), with a market check as a complement | Resumo p9 |
| F3 | Labour is about 80% of costs; the rest is structural (water, power, rent, phone) | ORGC7, p79 |
| F4 | Fee = client's volume of operations × hourly cost of each employee per department | ORGC7, p76 to 77 |
| F5 | Partner: 160 h/month, R$ 5.200 total, R$ 32,50/h, split by activity (operational R$ 1.300, non-operational R$ 3.900) | Apêndice 5, p104 |
| F6 | Activity hour split for accounting routines (imputação 10%, conferência 45%, relatórios 15%, legislação 5%, atendimento 24%) | Apêndice 1, p100 |
| F7 | 43 of 109 contracts tie the fee to the regional minimum wage, driven by headcount, invoices/month, accounting entries | 4.6, p80 |
| F8 | "Online accounting for R$ 80" undercuts the market | ORGC3, p76 |
| F9 | Cost pricers "see 6, 12 or 24 months ahead"; market pricing is "temerária" | ORGC2, p80 |
| F10 | 4 clients left over price and returned within about 10 to 11 months for quality | ORGC1, p75 |
| F11 | Fee drivers split into quantitative (volume) and qualitative (client organisation) | Silva 2018, cited p76 |
| F12 | Anexo 2 (NIBO 2018): 36 real-format clients with cost per dept, ideal fee, fee charged. Totals: cost 24.768,69, ideal 39.111,14, charged 33.970,00 | p106; parsed to `leitura/anexo2.csv` |
| F13 | Client cost = units × unit cost per dept: about R$ 2,334 fiscal, R$ 1,563 contábil, R$ 31,22 pessoal (matches Anexo 1 "custo individualizado"). Unit type not stated; probably invoice / entry / employee (inference) | p105, p106; `anexo2.py` |
| F14 | Ideal fee = cost × 1,5791 for every client = 1/((1 − 30% margin)(1 − 9,53% taxes)), sequential, not the single markup 1,6537 | p106; `anexo2.py` |
| F15 | Firm cost structure: personnel 55,0% of cost, 75,6% counting the partner's pró-labore; fixed costs 11.150,00/month | p105 |

Before building, re-read Apêndices 2 to 4 (p101 to 103) for the other
roles' hours. (Pages checked against `cruz_neto.txt`: F10 is p75, the amostra paragraph is p70.)

## 3. Deliverables

### D1. Firm simulator (Python, Monte Carlo): the backbone

- **Firm:** a small team (partner + 3 to 5 staff). Hourly costs come from F5,
  with labour as about 80% of total cost (F3).
- **Clients:** N = 40 to 60 synthetic clients. Each one has invoices/month,
  headcount and entries/month drawn from skewed distributions (lognormal),
  plus an "organisation" score (F11) that multiplies hours.
- **True cost per client** = hours needed (driven by volume, using the F6
  activity split) × hourly cost.
- **Pricing policies**, run for 24 months:
  - **P1 Custo:** cost × markup. Markup = 1 / (1 − taxes − desired margin), as in Bruni/Famá and Padoveze.
  - **P2 Mercado:** fee from a minimum-wage table by volume band (F7), with an R$ 80 low-end competitor as the anchor (F8).
  - **P3 Híbrido:** max(cost floor, market price), capped by a market ceiling.
- **Churn:** the monthly chance a client leaves rises with price/market
  ratio and falls with service quality. Quality falls when margin is
  squeezed (F9: market pricing hurts labour pay). Clients who left can come
  back (F10).
- **Outputs per policy:** monthly profit (median and 5 to 95% band, about
  1000 runs), cumulative profit at 24 months, client count, share of
  loss-making clients.
- **Test of F9:** report the width of the profit band at 6, 12 and 24
  months for each policy. "Seeing 24 months ahead" here means a narrower,
  predictable band.

The result must be reported as the model gives it. If P2 or P3 wins, say
so. That is still a finding about the assumptions.

### D2. Whale curve (one chart), from REAL Anexo 2 data, not synthetic

Use the 36 clients in `leitura/anexo2.csv`: profit = honorário − custo total,
sorted from most to least profitable, cumulative as % of total. Already
computed: total result R$ 9.201,31; peak R$ 10.390,65 (112,9%); 8 clients below
cost (loss R$ 1.189,34); FIL alone R$ 2.488,92. Second panel option: ideal vs
charged fee per client. Mention the link to ABC (Eckert 2013, cited p79).
The text never discusses this annex, so this is a genuine "found in the
appendix" moment for the slides.

D1 should calibrate on the same annex: client unit counts from `anexo2.csv`
(F13) as the empirical client distribution, P1 markup = 1,5791 (F14).

### D3. Live pricing page (single HTML file, offline)

Sliders for hours/month, hourly cost, taxes %, desired margin %, and
invoices/month. It shows the cost price, the market band (minimum-wage table
and R$ 80 floor), and where the hybrid price lands. No server and no internet
needed, so it opens from a USB stick or a shared screen.

### D4. Sample-critique slide

43/109 = 39,4%, with a 95% Wilson interval of about 30% to 49%. State that
the sample is non-probabilistic (F1), so even this interval is optimistic.
Tone: methodological rigour, not an attack on the author.

### D5. (Optional, only if time allows) Clients who leave and come back

A three-state chain (ativo → perdido para concorrente barato → retornou)
for price-sensitive vs quality-sensitive clients, with the lifetime value
of each. Drop it first if time is short.

### D6. Slides

Portuguese. Academic style rules: no em-dashes, no "não é X, é Y"
rhetoric, no rhetorical questions, concise. Courses named by alias.

Proposed flow (about 10 slides, adjust to the slot length):

1. Título e pergunta da dissertação
2. O que a dissertação fez (F1) e o que concluiu (F2)
3. Como o escritório precifica: hora/homem × volume (F4, F5, F6)
4. Crítica amostral (D4)
5. Hipóteses não testadas (F9, F10)
6. O modelo: escritório sintético calibrado no Apêndice 5 (premissas explícitas)
7. Resultado: 24 meses, três políticas (D1, gráfico principal)
8. Quem subsidia quem (D2)
9. Demonstração ao vivo (D3)
10. Conclusão + paralelo com a Blink (precificação por valor, piso de R$ 1.500)

Every chart follows the dataviz skill and has a footnote with "dados
sintéticos calibrados em Cruz Neto, Apêndice 5".

## 4. Out of scope

- No real client data and no scraping of market prices.
- No claim that the simulation proves anything about real firms. It tests
  whether the interviewees' claims hold under stated assumptions.
- No new web app infrastructure. One Python script plus one static HTML.

## 5. Open questions (defaults used if not answered)

| Question | Default |
|---|---|
| Slot length | 15 min, 10 slides |
| Laptop on projector / screen share? | Yes; static PNG fallbacks in the slides in case the demo fails |
| Slide format | Google Slides or PPTX with embedded PNGs, plus the D3 HTML file |
| Ask the professor which parts matter (she offered on 09/06)? | Send a short message today, don't block on the answer |

## 6. Plan and time budget

| When | Step | Done when |
|---|---|---|
| Sat 03/10 | Re-read p70, p75, p100 to 104; fill in remaining calibration numbers | Every model parameter has a source or "premissa" tag |
| Sat 03/10 | D1 simulator + D2 chart | Script runs end to end, PNGs saved |
| Sun 04/10 | D3 HTML page, D4 slide | Opens offline in the browser, numbers match D1 |
| Sun 04/10 | D6 slides + one full rehearsal with a timer | Fits the slot with 1 min to spare |
| Mon 05/10 | Check projector/screen share before 15:00 | Demo opens from the presentation machine |

Cut order if time runs short: D5, then D3 (use a screenshot), then reduce D1 to P1 vs P2.

## 7. File layout

```
<LOCAL_PATH>
  sim.py              # D1 + D2, writes out/*.png and out/results.json
  params.py           # every parameter with its source (F#) or "premissa"
  pricing.html        # D3
  out\                # charts
  slides\             # D6
```

## 8. Acceptance checks

- [ ] Every number on a slide traces to an F# row or is labelled "premissa".
- [ ] Re-running `sim.py` with a fixed seed reproduces the charts exactly.
- [ ] The F9 test result is stated as the model produced it, whichever direction.
- [ ] `pricing.html` works with Wi-Fi off.
- [ ] Slides pass the style rules (no em-dashes, no rhetorical questions).
- [ ] Rehearsed once with a timer, within the slot.
