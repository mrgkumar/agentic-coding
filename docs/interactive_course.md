Yes. I would design this as a **small interactive course**, not a slide viewer.

The key product decision is:

```text
Presentation
speaker drives the experience
        │
        ▼
condensed explanation + live demo


Self-paced site
learner drives the experience
        │
        ▼
predict → act → observe → understand → apply
```

Below is the implementation plan I would use. I have also done a second-pass completeness audit at the end.

---

# 1. Product goal

### Primary goal

After completing the site, a new employee should be able to use Claude Code with this engineering workflow:

```text
BUILD CONTEXT
      │
      ▼
   RESEARCH
      │
      ▼
     PLAN
      │
      ▼
👤 REVIEW / APPROVE
      │
      ▼
    EXECUTE
      │
      ▼
     VERIFY
      │
      ▼
👤 ACCEPT / REJECT
```

They should understand that Claude Code is **not simply a better prompt box**.

They should learn how to control an engineering agent.

---

# 2. Measurable learning outcomes

The course should not merely say that someone "completed" it.

At the end, the learner should demonstrate that they can:

| Capability     | Learner should be able to...                                                       |
| -------------- | ---------------------------------------------------------------------------------- |
| Context        | Build relevant repository context without dumping everything into the conversation |
| Research       | Ask Claude to gather evidence before proposing a change                            |
| Root cause     | Distinguish evidence from assumptions                                              |
| Planning       | Review a plan for scope, risk, tests and unnecessary work                          |
| Human control  | Know where human approval matters                                                  |
| `/goal`        | Write a measurable completion condition                                            |
| `/loop`        | Recognize when repeated scheduled checking is appropriate                          |
| Execution      | Keep implementation bounded by an approved plan                                    |
| Verification   | Review tests, diff, goal evidence and unintended changes                           |
| Tools          | Understand what tools make an LLM an acting agent                                  |
| Permissions    | Understand what Claude may or may not do                                           |
| Hooks          | Understand deterministic controls                                                  |
| Subagents      | Know when separate context is useful                                               |
| Memory/context | Understand CLAUDE.md, memory, session context and compaction                       |
| Judgment       | Recognize premature edits, weak evidence, scope creep and unsafe autonomy          |

These become the **acceptance criteria for the learning site**.

---

# 3. Audience model

We have two important audiences.

```text
                     NEW EMPLOYEE
                          │
              ┌───────────┴───────────┐
              ▼                       ▼
         ENTRY LEVEL               SENIOR
              │                       │
        needs concepts          knows engineering
        + terminology           needs agent model
        + examples              + failure modes
              │                       │
              └───────────┬───────────┘
                          ▼
                  SHARED CORE COURSE
                          │
                    optional depth
```

Therefore each lesson should support:

### Core

Required for everyone.

### 🔎 Go deeper

Optional material such as:

* architecture implications
* context pollution
* autonomy boundaries
* plan quality
* verification strategy
* agent decomposition
* failure modes

This is better than separate beginner and senior courses.

---

# 4. Overall information architecture

I recommend **10 modules including onboarding and capstone**.

```text
00  START
     │
     ▼
01  FROM CHAT TO AGENT
     │
     ▼
02  BUILD CONTEXT
     │
     ▼
03  RESEARCH BEFORE EDITING
     │
     ▼
04  PLAN THE CHANGE
     │
     ▼
05  CONTROL EXECUTION
     │
     ├── PLAN = HOW
     ├── /goal = WHEN DONE
     └── /loop = WHEN AGAIN
     │
     ▼
06  VERIFY & ACCEPT
     │
     ▼
07  TOOLS, PERMISSIONS & HOOKS
     │
     ▼
08  CONTEXT, MEMORY & SUBAGENTS
     │
     ▼
09  CAPSTONE
     │
     ▼
     APPLY IT TO REAL WORK
```

---

# 5. Module 00 — Start

This is not a generic landing page.

It establishes the learning contract.

### Screen 1

Large statement:

> **Claude Code is not primarily about writing better prompts.
> It is about controlling an engineering agent.**

Then:

```text
You will learn to control:

Context      What Claude knows
Evidence     What Claude has established
Plan         How it intends to change the system
Goal         When it should stop
Tools        What it can do
Permissions  What it may do
Hooks        What must happen
Verification Whether you accept the result
```

### Path selection

```text
┌──────────────────────┐
│ FULL COURSE          │
│ ~60–90 min           │
│                      │
│ Learn + exercises    │
└──────────────────────┘

┌──────────────────────┐
│ QUICK REFRESHER      │
│ ~20–30 min           │
│                      │
│ Concepts + challenge │
└──────────────────────┘

┌──────────────────────┐
│ REFERENCE            │
│                      │
│ Jump to a concept    │
└──────────────────────┘
```

The same content should support all three modes.

---

# 6. Module 01 — From chat to agent

## Learning objective

Understand why Claude Code behaves differently from a chatbot.

### Interactive diagram

```text
CHAT

Question
   │
   ▼
 Model
   │
   ▼
Answer
```

Then reveal:

```text
CODING AGENT

                    ┌───────────────┐
                    │    CONTEXT    │
                    └───────┬───────┘
                            ▼
                    ┌───────────────┐
             ┌─────►│    CLAUDE     │
             │      └───────┬───────┘
             │              │ decides
             │              ▼
             │      ┌───────────────┐
             │      │     TOOL      │
             │      └───────┬───────┘
             │              │ acts
             │              ▼
             │      ┌───────────────┐
             └──────│   EVIDENCE    │
                    └───────────────┘
```

### Learner question

> What makes the second system an agent?

Feedback explains:

```text
Model + tools + iterative observations
```

### Takeaway

> The agent becomes useful because it can **observe and act**, not merely because its prompts are longer.

---

# 7. Module 02 — Build Context

This should be one of the signature experiences.

## Use the actual demo repository structure

```text
shopping-calculator/
│
├── README.md
├── package.json
│
├── src/
│   ├── calculator.js
│   └── validation.js
│
└── test/
    └── calculator.test.js
```

Initially, the learner knows nothing else.

Ask:

> You inherited this repository. What should Claude do first?

Possible actions appear.

After the learner chooses, show consequences.

### Context Ladder

Make this interactive rather than static:

```text
ORIENT
  ●
  │
  ▼
MAP
  ○
  │
  ▼
LOCATE
  ○
  │
  ▼
TRACE
  ○
  │
  ▼
CONSTRAIN
  ○
  │
  ▼
SUMMARIZE
  ○
```

Each stage unlocks evidence.

For example:

### ORIENT

Learner sees:

* purpose
* runtime
* test command
* major folders

### MAP

Learner sees components and responsibilities.

### LOCATE

Learner identifies code relevant to checkout.

### TRACE

Learner follows:

```text
Input
  │
  ▼
validation
  │
  ▼
subtotal
  │
  ▼
discount
  │
  ▼
tax
  │
  ▼
total
```

### CONSTRAIN

The learner identifies behaviors that must remain unchanged.

### SUMMARIZE

Claude produces a compact context summary.

---

# 8. Teach the most important Context Ladder lesson

At the end:

```text
             MORE CONTEXT
                  ≠
             BETTER CONTEXT


             BETTER CONTEXT
                  =
        Relevant evidence
              +
          Current goal
              +
          Constraints
              +
           Decisions
```

This should be a prominent visual.

---

# 9. Module 03 — Research before editing

Now introduce the problem.

```text
Subtotal       ₹2,000
Coupon         − ₹200
               ───────
Taxable amount ₹1,800
Tax @ 18%      + ₹324
               ───────
Expected       ₹2,124
```

But:

```text
Application result

₹2,160  ✕
```

Ask:

> What should you ask Claude to do next?

Choices could include:

```text
Fix calculator.js

Rewrite the calculation

Investigate why the result is ₹2,160

Add a test that expects ₹2,124
```

The useful choice is investigation.

---

# 10. Evidence board

During investigation, show an evidence panel.

```text
┌──────────────── EVIDENCE ────────────────┐
│                                         │
│ KNOWN                                   │
│ ✓ Expected result = ₹2,124              │
│ ✓ Existing tests pass                   │
│ ✓ Fixed coupon exists                   │
│                                         │
│ INFERRED                                │
│ ? Ordering may be responsible           │
│                                         │
│ UNVERIFIED                              │
│ ? Percentage discounts affected?        │
│ ? Validation affected?                  │
│                                         │
└─────────────────────────────────────────┘
```

As files are inspected, items move between states.

This directly teaches:

```text
KNOWN
INFERRED
ASSUMED
UNVERIFIED
```

Very useful engineering discipline.

---

# 11. Simulated terminal

The simulated terminal should first appear here and continue through the rest of the course.

```text
┌────────────────────────────────────────────────────┐
│ Claude Code Simulator                              │
├────────────────────────────────────────────────────┤
│                                                    │
│ > Investigate why the fixed coupon case returns    │
│   ₹2,160 instead of ₹2,124.                        │
│                                                    │
│ Claude is inspecting...                            │
│                                                    │
│ ✓ src/calculator.js                                │
│ ✓ existing tests                                   │
│ ✓ execution path                                   │
│                                                    │
├────────────────────────────────────────────────────┤
│ Evidence      Files      Tests      Conversation   │
└────────────────────────────────────────────────────┘
```

But this must remain a **deterministic simulator**.

Do not call a real LLM.

---

# 12. Simulator architecture

Internally:

```text
Learner action
      │
      ▼
Scenario engine
      │
      ├── allowed?
      │
      ├── useful?
      │
      ├── premature?
      │
      └── state transition
              │
              ▼
       predefined response
              │
              ▼
       reveal new evidence
```

We can support typed input by matching concepts or keywords, but suggested actions should always be available.

This prevents the experience from breaking if free text does not match.

---

# 13. Feedback should be engineering feedback

Avoid:

> ❌ Wrong.

Prefer:

```text
🟡 REASONABLE, BUT PREMATURE

Running tests gives useful evidence.

However, you still have not established why
₹2,160 is produced.

Investigate the execution order before editing.
```

Possible classifications:

```text
✓ STRONG
○ REASONABLE
△ PREMATURE
⚠ HIGH RISK
✕ CONTRADICTS EVIDENCE
```

---

# 14. Module 04 — Plan the change

First, show a deliberately poor plan.

```text
1. Rewrite calculator.js.
2. Refactor discount handling.
3. Add a TaxCalculator abstraction.
4. Update validation.
5. Add tests.
6. Clean up related code.
```

Ask:

> What concerns you?

Learner can select plan lines.

Then visualize:

```text
                PROBLEM
                   │
                   ▼
             REQUIRED CHANGE
                   │
          ┌────────┴────────┐
          ▼                 ▼
     MUST CHANGE       MUST PRESERVE

fixed coupon order     percentage discount
regression test        validation behavior
                       unrelated APIs
```

Anything beyond these requires justification.

---

# 15. Plan-review framework

Teach one compact review model:

```text
                    PLAN
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
      SCOPE         RISK       EVIDENCE
        │            │            │
 What changes?   What breaks?  How prove it?
        │
        ▼
 What explicitly
 does NOT change?
```

The learner should eventually approve a plan.

---

# 16. Module 05 — Control execution

This teaches three concepts together, while keeping their purposes separate.

```text
┌─────────────────┐
│      PLAN       │
│                 │
│      HOW?       │
└────────┬────────┘
         │
         ▼
 Approved route


┌─────────────────┐
│      /goal      │
│                 │
│   WHEN DONE?    │
└────────┬────────┘
         │
         ▼
 Completion state


┌─────────────────┐
│      /loop      │
│                 │
│  WHEN AGAIN?    │
└────────┬────────┘
         │
         ▼
 Repeated schedule
```

---

# 17. `/goal` exercise

Show three candidates.

```text
A
/goal Fix the calculator
```

```text
B
/goal Modify calculator.js and add a test
```

```text
C
/goal The approved plan has been implemented,
the ₹2,000 subtotal with a ₹200 fixed coupon and
18% tax returns ₹2,124, existing tests pass,
and validation behavior remains unchanged.
```

Ask:

> Which one defines a completion condition rather than an implementation route?

Then reveal:

```text
       APPROVED PLAN
            │
          HOW
            ▼
        EXECUTION
            │
            ▼
         EVIDENCE
            │
            ▼
          /goal
            │
        GOAL MET?
        /       \
      NO         YES
      │           │
      └──↺        ▼
                 STOP
```

---

# 18. `/loop` micro-exercise

Keep `/loop` short.

Scenario:

> CI is running. Claude should check every five minutes until it finishes.

Visual:

```text
Check CI
   │
   ▼
Finished?
 /      \
NO      YES
│        │
▼        ▼
wait    report
5 min   result
│
└────↺
```

Then reinforce:

```text
PLAN  → how to solve
/goal → when solved
/loop → when to check again
```

---

# 19. Module 06 — Verify and accept

This should be another signature interaction.

Claude says:

```text
✓ Goal satisfied
✓ Tests pass
```

Ask:

> Are we finished?

The learner should learn:

```text
GOAL MET
   ≠
CHANGE ACCEPTED
```

---

# 20. Interactive diff review

Show a code diff.

Include:

* correct coupon ordering fix
* new regression test
* one subtle unrelated change

Ask the learner to inspect it.

Tabs:

```text
[ Diff ] [ Tests ] [ Goal ] [ Scope ] [ Risks ]
```

Then:

```text
                  HUMAN VERIFY
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
       DIFF           TESTS          GOAL
        │              │              │
        └───────┬──────┴──────┬──────┘
                ▼             ▼
              SCOPE          RISK
                │
                ▼
          ACCEPT / REJECT
```

---

# 21. Hidden scope-creep exercise

This deserves its own interaction.

Example hidden change:

```diff
- throw new Error("Invalid discount");
+ return 0;
```

The requested bug fix did not require changing validation.

Learner should catch it.

Feedback:

> Tests passing does not prove that the implementation respected scope.

This is a powerful senior-level lesson without being difficult for juniors.

---

# 22. Module 07 — Tools, permissions and hooks

Use scenarios rather than definitions.

## Core model

```text
                    CLAUDE
                       │
             ┌─────────┼─────────┐
             ▼         ▼         ▼
           TOOLS   PERMISSIONS  HOOKS

         What can   May this    What must
         it do?     happen?     happen?
```

Then scenario cards.

Example:

> Claude should know that all tests belong under `test/`.

Correct:

```text
CLAUDE.md
```

Example:

> Claude must ask before using a dangerous shell operation.

Correct:

```text
Permission
```

Example:

> Every JavaScript edit should trigger formatting.

Correct:

```text
Hook
```

---

# 23. Add CLAUDE.md to that model

The complete model is:

```text
CLAUDE.md
    │
    ▼
GUIDANCE
How should Claude work?


TOOLS
    │
    ▼
CAPABILITY
What can Claude do?


PERMISSIONS
    │
    ▼
BOUNDARY
What may Claude do?


HOOKS
    │
    ▼
DETERMINISTIC CONTROL
What happens regardless of model judgment?
```

---

# 24. Module 08 — Context, memory and subagents

Start with context sources.

```text
System instructions ───────┐
                           │
User CLAUDE.md ────────────┤
                           │
Project CLAUDE.md ─────────┤
                           │
Auto memory ───────────────┼──► WORKING CONTEXT
                           │
Conversation ──────────────┤
                           │
Tool evidence ─────────────┘
```

Then teach context hygiene.

---

# 25. Context-window exercise

Visually accumulate context:

```text
Context
██████████████████░░

Useful evidence      ███████
Old investigation    ████
Large logs           ███
Dead branches        ██
Repeated discussion  ██
```

Ask:

> What should remain salient?

Then demonstrate compaction conceptually:

```text
NOISY CONTEXT
      │
      ▼
   COMPACT
      │
      ▼
CURRENT GOAL
DECISIONS
KEY EVIDENCE
OPEN QUESTIONS
```

---

# 26. Subagent interaction

Ask:

> Which investigation would benefit from separate context?

For example:

```text
                    MAIN AGENT
                        │
             ┌──────────┼──────────┐
             ▼          ▼          ▼
         Code path    Tests      Security
          research    review      review
             │          │          │
             └──────────┼──────────┘
                        ▼
                  concise findings
```

Then explain:

> Separation is useful when it keeps focused work from polluting the main context.

Not:

> More agents are always better.

---

# 27. Module 09 — Capstone

The capstone must use a **new problem**.

Do not reuse the calculator solution.

Suggested case:

## Shipping-price bug

Repository:

```text
shipping-checkout/
├── README.md
├── package.json
├── src/
│   ├── checkout.js
│   ├── promotions.js
│   └── shipping.js
└── test/
    ├── checkout.test.js
    └── promotions.test.js
```

Problem:

```text
Items        ₹900
Shipping     ₹100
Promo         10%
```

Reported result looks suspicious.

But requirements are ambiguous:

> Does the promo apply to shipping?

The learner has to recognize that **not every bug is a coding problem**.

---

# 28. Capstone sequence

The learner has to perform:

```text
ORIENT
  │
  ▼
MAP
  │
  ▼
LOCATE
  │
  ▼
RESEARCH
  │
  ▼
IDENTIFY AMBIGUITY
  │
  ▼
REQUEST / FIND REQUIREMENT
  │
  ▼
PLAN
  │
  ▼
DEFINE GOAL
  │
  ▼
EXECUTE
  │
  ▼
VERIFY
  │
  ▼
ACCEPT
```

The key surprise:

```text
Sometimes the correct engineering action is:

             DON'T EDIT YET
                    │
                    ▼
            Clarify requirement
```

Excellent final lesson.

---

# 29. Completion summary

Do not use badges or childish scores.

Use an engineering capability report.

```text
YOUR ENGINEERING LOOP

Build context               ✓
Use evidence                 ✓
Control scope                ✓
Review plans                 ✓
Define completion            ✓
Verify implementation        ✓
Recognize ambiguity          ✓
Use autonomy responsibly     ✓
```

Then:

> **Next: use this workflow on a real repository.**

---

# 30. "Try it for real" kit

Every module should eventually bridge into real Claude Code.

Example panel:

```text
┌─────────────────────────────────────────┐
│ 🧪 TRY THIS IN CLAUDE CODE              │
│                                         │
│ Understand this repository without      │
│ making changes.                         │
│                                         │
│ Map the main execution path for         │
│ checkout calculations.                  │
│                                         │
│ Explain which files matter and why.     │
│                                         │
│              [ Copy prompt ]            │
└─────────────────────────────────────────┘
```

The final toolkit should contain:

* demo repository
* context-building prompts
* research prompts
* plan-review prompts
* `/goal` examples
* `/loop` examples
* verification prompts
* CLAUDE.md starter example
* engineering-loop cheat sheet

---

# 31. Course navigation

Desktop:

```text
┌───────────────┬─────────────────────────────────────┐
│ COURSE        │                                     │
│               │                                     │
│ ✓ Start       │          CURRENT LESSON             │
│ ✓ Agent       │                                     │
│ ✓ Context     │                                     │
│ ● Research    │                                     │
│ ○ Plan        │                                     │
│ ○ Execute     │                                     │
│ ○ Verify      │                                     │
│ ○ Controls    │                                     │
│ ○ Context     │                                     │
│ ○ Challenge   │                                     │
│               │                                     │
└───────────────┴─────────────────────────────────────┘
```

Mobile:

```text
┌──────────────────────────┐
│ 03 · RESEARCH       ☰    │
│ ●●●○○○○○○                 │
├──────────────────────────┤
│                          │
│ Lesson content           │
│                          │
│                          │
├──────────────────────────┤
│ ← Back         Continue →│
└──────────────────────────┘
```

---

# 32. Progress model

Progress should track concepts, not page views.

```text
Context       ✓
Research      ✓
Plan          ●
Execute       ○
Verify        ○
Guardrails    ○
```

Store locally.

No account required.

---

# 33. State persistence

For the MVP:

```text
Browser
   │
   ▼
localStorage
   │
   ├── current module
   ├── completed lessons
   ├── exercise attempts
   ├── selected path
   ├── theme
   └── optional preferences
```

A user can leave and return to the same browser.

Later, if useful, we can support:

```text
Export progress
      │
      ▼
small JSON file
      │
      ▼
Import on another device
```

No backend needed.

---

# 34. Deep linking

Every learning concept needs a stable URL.

For example:

```text
/#/context
/#/context-ladder
/#/research
/#/plan
/#/goal
/#/loop
/#/verification
/#/permissions
/#/hooks
/#/subagents
```

This matters because people will eventually use the site as a **reference**, not only as a course.

---

# 35. Shared content architecture

This is one of the most important engineering decisions.

Do **not** maintain:

```text
slides copy
+
learning site copy
+
presenter notes copy
```

independently.

Instead:

```text
                     CONTENT MODEL
                          │
             ┌────────────┼────────────┐
             │            │            │
             ▼            ▼            ▼
       Presentation   Self-paced    Reference
             │          course         pages
             │
       Presenter notes
```

Shared concepts should come from structured content.

---

# 36. Proposed source structure

```text
claude-code-learning/
│
├── index.html
│
├── src/
│   │
│   ├── app.js
│   ├── router.js
│   ├── state.js
│   │
│   ├── components/
│   │   ├── lesson.js
│   │   ├── diagram.js
│   │   ├── terminal.js
│   │   ├── code-browser.js
│   │   ├── evidence-board.js
│   │   ├── quiz.js
│   │   ├── feedback.js
│   │   ├── diff-viewer.js
│   │   └── progress.js
│   │
│   ├── lessons/
│   │   ├── 00-start.js
│   │   ├── 01-agent.js
│   │   ├── 02-context.js
│   │   ├── 03-research.js
│   │   ├── 04-plan.js
│   │   ├── 05-execution.js
│   │   ├── 06-verification.js
│   │   ├── 07-controls.js
│   │   ├── 08-context-agents.js
│   │   └── 09-capstone.js
│   │
│   ├── scenarios/
│   │   ├── shopping-calculator.js
│   │   └── shipping-checkout.js
│   │
│   ├── diagrams/
│   │   ├── agent-loop.js
│   │   ├── context-ladder.js
│   │   ├── engineering-loop.js
│   │   ├── plan-goal-loop.js
│   │   ├── verification.js
│   │   └── context-sources.js
│   │
│   └── content/
│       ├── concepts.js
│       ├── prompts.js
│       └── glossary.js
│
├── demo/
│   ├── shopping-calculator/
│   └── shipping-checkout/
│
├── styles/
│   ├── tokens.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   └── responsive.css
│
├── assets/
│   └── icons/
│
├── tests/
│   ├── lessons/
│   ├── scenarios/
│   ├── accessibility/
│   └── navigation/
│
├── docs/
│   ├── CONTENT_GUIDE.md
│   ├── LEARNING_DESIGN.md
│   ├── ARCHITECTURE.md
│   └── RELEASE_CHECKLIST.md
│
└── .github/
    └── workflows/
        ├── test.yml
        └── pages.yml
```

---

# 37. Keep the implementation deliberately lightweight

I would strongly prefer:

```text
HTML
CSS
JavaScript
SVG
JSON / JS content modules
```

over a large framework unless we discover a concrete need.

Why?

```text
Small static application
        │
        ├── fast
        ├── easy GitHub Pages deployment
        ├── easy to understand
        ├── easy to maintain
        └── easy to preserve long-term
```

We can still keep the architecture modular.

---

# 38. Diagram policy

Carry over the rule we established for the presentation.

For every learning unit ask:

```text
Does spatial structure help explain this?
               │
          ┌────┴────┐
          │         │
         YES        NO
          │         │
          ▼         ▼
       Diagram      Don't
```

Use diagrams for:

* workflows
* loops
* hierarchy
* context sources
* boundaries
* state changes
* agent/subagent relationships
* execution control

Do **not** diagram:

* simple calculations
* code that is clearer as code
* ordinary definitions
* lists of commands
* prose merely for decoration

---

# 39. Interaction policy

Likewise:

```text
Would making the learner act
change their understanding?
               │
          ┌────┴────┐
          │         │
         YES        NO
          │         │
          ▼         ▼
      Interaction   Explain
```

This prevents interaction theatre.

---

# 40. Interaction types we actually need

After refinement, I would limit the component vocabulary.

| Component           | Purpose                                    |
| ------------------- | ------------------------------------------ |
| Choice              | Predict what action should come next       |
| Reveal              | Compare expectation with evidence          |
| Repository explorer | Build context                              |
| Terminal simulator  | Practice agent interaction                 |
| Evidence board      | Separate facts from assumptions            |
| Plan reviewer       | Detect unnecessary work                    |
| Goal builder        | Construct measurable completion conditions |
| Diff reviewer       | Verify implementation                      |
| Scenario classifier | Choose tool / permission / hook / memory   |
| Capstone            | Integrate all concepts                     |

This is enough.

We don't need 20 different interaction patterns.

---

# 41. Accessibility is a first-class requirement

Every diagram must have a textual equivalent.

```text
Visual diagram
     │
     ├── SVG semantics where practical
     │
     └── accompanying concise text
```

The whole course must support:

| Requirement   | Design                                        |
| ------------- | --------------------------------------------- |
| Keyboard      | Everything operable without mouse             |
| Focus         | Clear visible focus state                     |
| Screen reader | Semantic HTML and labels                      |
| Contrast      | Accessible foreground/background combinations |
| Motion        | `prefers-reduced-motion`                      |
| Font scaling  | Layout survives browser zoom                  |
| Mobile        | No hover-only interaction                     |
| Touch         | Comfortable hit targets                       |
| Diagrams      | Textual alternative                           |
| Color         | Never sole carrier of meaning                 |

The hover-dependent behavior should always have tap/focus equivalents.

---

# 42. Mobile matters

Because the presentation already exposed mobile-navigation problems, we should make this a deliberate acceptance criterion.

Test layouts at approximately:

```text
320 px
375 px
430 px
768 px
1024 px
desktop
```

The simulated terminal and diff viewer must work especially well on narrow screens.

For code:

```text
┌─────────────────────┐
│ calculator.js       │
├─────────────────────┤
│ horizontal scroll → │
│                     │
│ code...             │
│                     │
└─────────────────────┘
```

Never shrink code into unreadability.

---

# 43. Theme

Reuse the professional presentation language:

```text
Light professional
Engineering-inspired
restrained blue palette
high whitespace
strong typography
minimal decoration
```

Support:

```text
Light
Dark
System
```

But design and test light first.

---

# 44. Content versioning

This is something we had **not explicitly covered before**, and it matters.

Claude Code changes.

Every course release should display something like:

```text
Course version       1.0
Updated              Aug 2026
Claude Code concepts verified against current docs
```

Content modules that discuss commands should carry metadata:

```text
concept: goal
lastVerified: 2026-08
```

This makes future audits practical.

---

# 45. Documentation links

Each advanced concept should have:

```text
Learn here
   │
   ▼
Understand concept
   │
   ▼
Official documentation ↗
```

The training site should summarize and teach.

It should **not try to replace Claude Code documentation**.

---

# 46. Public GitHub Pages safety

This is another important addition.

If this goes on a public GitHub Pages site:

```text
NO

✕ proprietary source code
✕ internal paths
✕ credentials
✕ company-only architecture
✕ customer information
✕ screenshots containing confidential material
```

The course repositories should remain completely synthetic.

The shopping calculator is good for exactly this reason.

If company branding or internal guidance appears, publication approval should be treated separately from technical deployment.

---

# 47. Analytics and privacy

For MVP:

```text
No learner login
No server profile
No personal information
```

If analytics are ever added, measure things such as:

```text
lesson opened
exercise completed
concept abandoned
course completed
```

not:

```text
typed prompts
source code
identity
repository information
```

Analytics should be optional rather than structurally required.

---

# 48. Feedback mechanism

Add a small footer:

```text
Was this unclear?
[ Report an issue ]
```

That can open a GitHub issue template containing:

```text
Course version
Module
Browser
What was unclear?
```

Do not capture user code.

This is very useful for improving the course.

---

# 49. Search and glossary

I would **not put search in MVP unless trivial**.

But a glossary is worth having:

```text
Agent
Context
Context window
CLAUDE.md
Auto memory
Tool
Permission
Hook
Plan mode
/goal
/loop
Subagent
Compaction
Verification
```

Clicking a term should navigate to where it is taught, rather than merely displaying a dictionary definition.

---

# 50. Performance

The first page should need very little JavaScript.

Avoid:

* huge JS bundles
* large animation frameworks
* video backgrounds
* unnecessary external libraries
* remote fonts if not needed
* giant images

SVG and native CSS are ideal for most diagrams.

---

# 51. Offline support

This is useful but **not MVP-critical**.

Later we could add:

```text
Service worker
      │
      ▼
cache application shell
      │
      ▼
course works offline
```

Particularly useful for workshops with unreliable connectivity.

But it should come after core teaching quality.

---

# 52. GitHub deployment

Architecture:

```text
Source repository
      │
      ▼
automated tests
      │
      ▼
build / validate
      │
      ▼
GitHub Pages deployment
      │
      ▼
static learning site
```

A broken course should never deploy simply because someone merged HTML.

---

# 53. Test strategy

We need more than unit tests.

```text
                     TEST PYRAMID

                  ┌──────────────┐
                  │ Visual audit │
                  └──────────────┘
               ┌────────────────────┐
               │ Browser journeys   │
               └────────────────────┘
            ┌──────────────────────────┐
            │ Interaction/scenario tests│
            └──────────────────────────┘
         ┌────────────────────────────────┐
         │ Content + unit + state tests   │
         └────────────────────────────────┘
```

Important test categories:

| Area            | Verify                                        |
| --------------- | --------------------------------------------- |
| Scenario engine | Correct state transitions                     |
| Exercises       | All choices produce intended feedback         |
| Progress        | Resume works                                  |
| Routing         | Deep links work                               |
| Code copy       | Exact expected command copied                 |
| Mobile          | No clipped controls                           |
| Accessibility   | Keyboard + contrast + semantics               |
| Diagrams        | No unreadable labels                          |
| Capstone        | Multiple plausible paths handled              |
| Demo code       | Known baseline behaves exactly as lesson says |
| Content         | No answer leakage                             |
| Deployment      | URLs and assets work under GitHub Pages path  |

---

# 54. Content leakage tests

Because we already encountered this in the presentation demo, this needs its own quality rule.

For each exercise:

```text
Before learner discovers X
        │
        ▼
Search all visible content
        │
        ▼
Does anything reveal X?
        │
    ┌───┴───┐
   YES      NO
    │        │
   FIX       ✓
```

Especially check:

* comments
* README
* test names
* filenames
* source constants
* hints
* accessibility text
* hidden DOM
* JSON scenario data accidentally rendered
* browser console

This is an important addition.

---

# 55. Learning-design tests

We should also audit the pedagogy.

For every lesson ask:

```text
What should the learner know afterward?

What must they DO to learn it?

What misconception are we correcting?

What evidence shows they understood it?

Could we remove anything without reducing learning?
```

This avoids turning the site into documentation.

---

# 56. Content-authoring contract

Each lesson module should contain something structurally like:

```text
ID
TITLE
LEARNING OBJECTIVE

SCENARIO

PREDICTION
    learner commits to decision

EXPERIENCE
    diagram / terminal / code

EXPLANATION

CHECKPOINT

TAKEAWAY

TRY IN CLAUDE CODE

GO DEEPER
    optional
```

This consistency will make the site feel coherent.

---

# 57. MVP scope

After all that, the **actual first version should stay disciplined**.

I recommend these implementation phases:

1. **Foundation** — static shell, routing, responsive layout, theme, lesson component, progress state and shared design tokens.
2. **Core learning loop** — modules 00–03, interactive agent model, Context Ladder, repository browser, evidence board and deterministic terminal.
3. **Engineering control** — plan-review exercise, plan/goal/loop module, goal builder and execution-loop visualization.
4. **Verification** — diff viewer, test evidence, scope review and hidden-scope-change exercise.
5. **Agent controls** — tools, permissions, hooks, context sources, compaction and subagents.
6. **Capstone** — new shipping scenario with multiple valid paths and ambiguity detection.
7. **Real-tool bridge** — downloadable demo repositories, copyable prompts, CLAUDE.md example and cheat sheet.
8. **Hardening** — mobile audit, accessibility audit, scenario tests, answer-leak audit, browser testing, content version metadata and release automation.
9. **Publish** — GitHub Pages workflow, public-content review, README/documentation and release tag.
10. **Post-MVP only after usage** — search, offline/PWA, progress export/import, optional analytics and additional case studies.

---

# 58. MVP vs later

## MVP — definitely build

| Capability                        | MVP |
| --------------------------------- | --: |
| Responsive course shell           |   ✓ |
| Full/quick/reference paths        |   ✓ |
| Progress/resume                   |   ✓ |
| Agent-loop interaction            |   ✓ |
| Context Ladder                    |   ✓ |
| Repository explorer               |   ✓ |
| Evidence board                    |   ✓ |
| Deterministic terminal            |   ✓ |
| Shopping calculator case          |   ✓ |
| Plan review                       |   ✓ |
| `/goal` exercise                  |   ✓ |
| `/loop` micro-exercise            |   ✓ |
| Diff verification                 |   ✓ |
| Scope-creep exercise              |   ✓ |
| Tools/permissions/hooks scenarios |   ✓ |
| Context/memory lesson             |   ✓ |
| Subagent lesson                   |   ✓ |
| Capstone                          |   ✓ |
| Real Claude Code prompts          |   ✓ |
| Demo downloads                    |   ✓ |
| Accessibility                     |   ✓ |
| Mobile                            |   ✓ |
| Content versioning                |   ✓ |
| GitHub Pages deployment           |   ✓ |

## Later

| Capability              |                Later |
| ----------------------- | -------------------: |
| Offline/PWA             |                    ○ |
| Search                  |                    ○ |
| Progress export/import  |                    ○ |
| Analytics               |                    ○ |
| More case studies       |                    ○ |
| Instructor dashboard    |                    ○ |
| Completion certificates | probably unnecessary |
| Real Claude API         |                    ✕ |
| Authentication          |                    ✕ |
| Backend                 |                    ✕ |

---

# 59. What we were missing in the first brainstorm

The completeness review surfaced several items that were not explicit enough earlier.

```text
Previously emphasized
─────────────────────────────────
learning modules
interactions
simulator
diagrams
progress
mobile
GitHub Pages


Additional requirements found
─────────────────────────────────
✓ measurable learning outcomes
✓ quick/full/reference paths
✓ content versioning
✓ public/IP safety
✓ accessibility as architecture
✓ answer-leak testing
✓ ambiguity as an engineering skill
✓ deep links for reference use
✓ feedback/reporting mechanism
✓ deterministic scenario tests
✓ shared presentation/course content
✓ deployment quality gates
✓ optional analytics/privacy boundary
✓ real-tool transition after simulation
✓ explicit senior “go deeper” path
✓ browser-state recovery
✓ content-authoring contract
```

Those should be part of the formal plan.

---

# 60. Final completeness audit

I would now assess it this way:

| Dimension                 | Covered? |
| ------------------------- | -------: |
| Product goal              |        ✓ |
| Target audience           |        ✓ |
| Beginner needs            |        ✓ |
| Senior-engineer depth     |        ✓ |
| Learning objectives       |        ✓ |
| Pedagogical model         |        ✓ |
| Information architecture  |        ✓ |
| Continuous case study     |        ✓ |
| Independent capstone      |        ✓ |
| Context education         |        ✓ |
| Evidence/research         |        ✓ |
| Planning                  |        ✓ |
| `/goal`                   |        ✓ |
| `/loop`                   |        ✓ |
| Execution                 |        ✓ |
| Verification              |        ✓ |
| Human approval            |        ✓ |
| Tools                     |        ✓ |
| Permissions               |        ✓ |
| Hooks                     |        ✓ |
| CLAUDE.md                 |        ✓ |
| Memory                    |        ✓ |
| Context hygiene           |        ✓ |
| Subagents                 |        ✓ |
| Ambiguous requirements    |        ✓ |
| Simulated terminal        |        ✓ |
| Repository explorer       |        ✓ |
| Diff review               |        ✓ |
| Knowledge checks          |        ✓ |
| Feedback quality          |        ✓ |
| Progress/resume           |        ✓ |
| Deep links                |        ✓ |
| Reference mode            |        ✓ |
| Real Claude Code practice |        ✓ |
| Downloadable demos        |        ✓ |
| Shared content model      |        ✓ |
| Modular architecture      |        ✓ |
| GitHub Pages deployment   |        ✓ |
| No-backend operation      |        ✓ |
| Mobile                    |        ✓ |
| Accessibility             |        ✓ |
| Contrast                  |        ✓ |
| Reduced motion            |        ✓ |
| Diagram discipline        |        ✓ |
| Interaction discipline    |        ✓ |
| Performance               |        ✓ |
| Public-content/IP safety  |        ✓ |
| Privacy                   |        ✓ |
| Content versioning        |        ✓ |
| Feedback mechanism        |        ✓ |
| Automated tests           |        ✓ |
| Browser tests             |        ✓ |
| Visual audit              |        ✓ |
| Answer-leak audit         |        ✓ |
| Release process           |        ✓ |
| Future extensibility      |        ✓ |

## I do not see a major missing product dimension now.

The architecture I would freeze around is:

```text
                         ONE CONTENT MODEL
                                │
               ┌────────────────┼────────────────┐
               ▼                ▼                ▼
        LIVE PRESENTATION   SELF-PACED SITE   REFERENCE
               │                │
               ▼                ▼
        Presenter leads      Learner acts
                                │
                                ▼
                   ┌────────────────────────┐
                   │ Scenario               │
                   │       ↓                │
                   │ Predict                │
                   │       ↓                │
                   │ Act                    │
                   │       ↓                │
                   │ Observe evidence       │
                   │       ↓                │
                   │ Understand principle   │
                   │       ↓                │
                   │ Apply in Claude Code   │
                   └────────────────────────┘
```

And the **north-star rule** for implementation should be:

```text
Don't ask:
"How do we make this page interactive?"

Ask:
"What should the learner DO
to understand this engineering idea?"
```

That distinction will determine whether the GitHub Pages version becomes genuinely useful or simply an attractive online tutorial.
