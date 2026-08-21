# Verification Report · Course v1.3

Date: 19 August 2026

## Summary

```text
Static syntax / tests              PASS
Rendered route audit               PASS
Desktop layout                     PASS
Mobile layout                      PASS
Narrow-mobile layout               PASS
New interaction checks             PASS
Long-context source links          PASS
Professional light theme           PASS
agent-browser final acceptance     PENDING (tool unavailable here)
```

## Automated checks

Command:

```bash
npm run check
```

Result:

- JavaScript syntax valid
- **21 / 21 tests pass**

New regression coverage includes:

- context window vs attention vs memory distinction
- U-shaped lost-in-the-middle content
- carefully qualified J-like recency regime
- context rot / attention-budget material
- context failure-mode → engineering-response mapping
- primary research-source presence
- responsive rules for attention/position visual components
- quick refresher retaining the attention foundation

## Rendered browser audit

A Chromium/Playwright audit harness rendered the actual course UI for every hash route.

Routes checked:

- 31 learner routes
- 1 reference route
- 32 total rendered routes per viewport

Viewports:

| Viewport | Result | Horizontal overflow | Runtime errors |
|---|---|---:|---:|
| 1440 × 900 | PASS | 0 routes | 0 routes |
| 390 × 844 | PASS | 0 routes | 0 routes |
| 320 × 760 | PASS | 0 routes | 0 routes |

Machine-readable evidence:

`artifacts/attention_audit/browser_audit.json`

## Interaction checks

Verified the intended strong-answer path for:

- attention mechanism decision
- classic positional-bias decision
- finite-context principle decision

Also verified:

- Q/K/V “Go deeper” disclosure opens
- position screen exposes three research links
- finite-context screen exposes two context-engineering/documentation links
- Module 08 `/compact` screen explicitly connects back to finite, non-uniform context use

## Visual evidence

Representative screenshots:

- `agent_attention_desktop.png`
- `agent_position_desktop.png`
- `agent_budget_desktop.png`
- `agent_attention_mobile.png`
- `agent_position_mobile.png`
- `agent_budget_mobile.png`
- `context_hygiene_mobile.png`
- `attention_context_montage.png`

## Accuracy checks

The course does not state that:

- U-shaped positional behavior is universal;
- all LLMs have a J curve;
- attention weights fully explain reasoning;
- more context always improves performance.

The J-shaped visual is described as **J-like / recency-dominant**, based on research reporting a weakening primacy advantage and relatively stable recency as relative input length grows.

## Remaining acceptance step

The project acceptance criteria require final verification with the `agent-browser` CLI against the deployed/rendered GitHub Pages build. That CLI is not available in this execution environment, so this report does not claim that requirement passed.

When the course is integrated in Codex, retain the gate:

```text
build
  ↓
agent-browser learner journeys
  ↓
desktop + tablet + mobile
  ↓
a11y + screenshots + console
  ↓
answer-leak audit
  ↓
complete
```

## Answer-position bias fix — 2026-08-19

- Multiple-choice options are shuffled with Fisher–Yates ordering on each render.
- The original answer index remains attached to each button, so feedback correctness is preserved.
- `npm test` and `npm run check` pass.
- Live browser verification was attempted, but this sandbox blocks the local HTTP server and `agent-browser` daemon socket; no browser-pass claim is made here.
