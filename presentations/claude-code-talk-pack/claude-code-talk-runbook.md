# Claude Code Talk — Live Demo Runbook

## Demo 01 — Build shared context

Do **not** reveal the bug yet.

```text
I just joined this project.

Do not modify anything.

Explain:
- what this application does,
- the major files/modules,
- how to run it,
- how to run its tests.
```

Then narrow:

```text
Where is the final shopping total calculated?

Trace the flow from the HTML form,
through the business logic,
and back to the displayed result.

What tests currently protect that path?
```

The repository intentionally does **not** contain a README or source comment that reveals the root cause.

---

## Demo 02 — Research the bug

```text
**Show the arithmetic before investigation:**

```text
Subtotal       ₹2,000
Coupon         − ₹200
               ───────
Taxable amount ₹1,800
Tax @ 18%      + ₹324
               ───────
Expected       ₹2,124
```

Current application result: **₹2,160**.

For a ₹2,000 subtotal with a ₹200 fixed coupon
and 18% tax, the result should be ₹2,124,
but the application returns ₹2,160.

For this application, the business rule is:
apply the fixed coupon before calculating tax.

Investigate the root cause.
Do not modify any files.

Show:
- the exact code path,
- why the result is ₹2,160,
- why the current tests still pass,
- which behavior would be at risk if we change it.

Separate KNOWN, INFERRED, ASSUMED and RISK.
```

---

## Demo 03 — Plan → human approval

```text
/plan Create the smallest implementation plan.

Requirements:
- Fixed coupon applies before tax.
- Percentage discounts keep working.
- Add a regression test for the ₹2,124 case.
- Preserve existing validation behavior.
- Avoid unrelated refactoring.

Do not implement yet.

Include:
- files affected,
- exact behavior change,
- risks,
- verification steps.
```

Review the plan with the audience.

```text
PLAN = HOW WE WILL GET THERE
```

Once satisfied, say explicitly:

```text
This is the approved plan.
It becomes the execution contract.
```

Exit Plan mode, but keep the same session so the approved plan stays in context.

---

## Concept checkpoint — Plan vs /goal vs /loop

```text
PLAN  = HOW
/goal = WHEN DONE
/loop = WHEN RUN AGAIN
```

The shopping-calculator demo uses **Plan + /goal**. It does not need `/loop`.

A separate polling example is:

```text
/loop 5m check if the deployment finished
```

---

## Demo 04 — Execute the approved plan under /goal

Use a **completion state**, not a second implementation plan:

```text
/goal The approved plan is implemented with no unapproved material scope or approach changes, and the conversation contains evidence that:

- fixed coupons are deducted before tax;
- ₹2,000 subtotal − ₹200 coupon, then 18% tax, returns ₹2,124;
- the approved regression test exists and passes;
- percentage-discount behavior remains unchanged;
- npm test exits 0.

If reaching this state requires a material plan or scope change,
stop and ask for human review.
```

```text
PLAN  = HOW
/goal = WHEN DONE
```

The `/goal` evaluator judges evidence that Claude surfaces in the conversation. It does not independently read files or run commands.

---

## Demo 05 — Verify before human acceptance

```text
The goal evaluator says the completion condition is met.

Before I accept the change, verify the implementation against
BOTH the approved plan and the goal.

Show:
1. the relevant diff and whether it stayed within approved scope,
2. how each plan step was implemented,
3. the regression test and full test results,
4. evidence for every goal condition,
5. remaining edge cases, assumptions or risks.

Do not make additional changes during this verification.
```

Then make an explicit human decision:

```text
GOAL MET ≠ CHANGE ACCEPTED

ACCEPT
   or
REJECT / return to Research, Plan or Execute
```

Claude Code also provides `/verify` for building/running/observing an application. Mention it if useful, but keep this explicit verification pass because it also checks scope and plan conformance.

---

## Timing fallback

### MUST SHOW

```text
01–15 + 20
```

### COMPRESS IF NEEDED

```text
16 Tools
17 Agents
18 Guardrails
19 Context hygiene
```

Do not sacrifice the Research → Plan → Execute → Verify story to cover more features.
