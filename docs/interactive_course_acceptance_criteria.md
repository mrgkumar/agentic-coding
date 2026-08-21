```text
MVP THEME

Professional light
      │
      ├─ high contrast
      ├─ restrained blue accents
      ├─ generous whitespace
      ├─ engineering/product feel
      └─ consistent with the talk

Dark mode ──► deferred
```

# Acceptance Criteria — Interactive Claude Code Course

## AC-00 · Definition of success

The implementation is complete only when a learner can use the published GitHub Pages site to move through this engineering model:

```text
Build context
      │
      ▼
Research
      │
      ▼
Plan
      │
      ▼
👤 Review / Approve
      │
      ▼
Execute
      │
      ▼
Verify
      │
      ▼
👤 Accept / Reject
```

The site must teach these ideas through **decisions, interaction, evidence, and feedback**, not by reproducing the presentation as a sequence of slides.

Passing unit tests alone does **not** satisfy the goal.

---

# AC-01 · Existing assets are the source baseline

The implementation must use:

```text
docs/
└── interactive_course.md
        │
        └── product + learning plan

presentations/
└── claude-code-talk-pack/
    ├── claude-code-talk.html
    │       │
    │       └── presentation/content/visual baseline
    │
    └── demo-shopping-calculator/
            │
            └── primary continuous case study
```

### Must

* Preserve the existing presentation as the talk version.
* Reuse its validated concepts, terminology, diagrams and demo story where appropriate.
* Use `demo-shopping-calculator` as the continuous teaching case.
* Keep the self-paced experience independent from the presentation runtime.

### Must not

```text
✕ iframe the presentation and call it training
✕ convert each slide directly into a lesson
✕ duplicate large amounts of content unnecessarily
✕ silently change the existing demo's intended behavior
```

---

# AC-02 · Professional light visual theme

The MVP must use **one professional light theme**.

Dark mode is explicitly out of scope for this version.

### Visual character

```text
Professional
Technical
Calm
Modern
High-information when needed
Low visual noise
```

Use the existing presentation as the visual starting point.

### Expected design language

* white/light surfaces
* restrained blue accents
* dark readable text
* generous whitespace
* subtle borders
* restrained shadows
* clear typography hierarchy
* limited decorative graphics
* strong visual grouping
* consistent spacing

### Reject if

* it resembles a consumer gamification product,
* excessive gradients dominate pages,
* cards are used for every piece of text,
* multiple bright colors compete for attention,
* decoration overwhelms the engineering content,
* text/background contrast is poor,
* the page looks like converted PowerPoint slides.

---

# AC-03 · Course structure

The site must contain the following learning sequence:

```text
00 Start
    │
01 From Chat to Agent
    │
02 Build Context
    │
03 Research Before Editing
    │
04 Plan the Change
    │
05 Control Execution
    │
06 Verify & Accept
    │
07 Tools, Permissions & Hooks
    │
08 Context, Memory & Subagents
    │
09 Capstone
```

Each module must have a stable URL/deep link.

Example:

```text
#/start
#/agent
#/context
#/research
#/plan
#/execution
#/verification
#/controls
#/context-agents
#/capstone
```

Exact route syntax may differ, but browser refresh and direct navigation must work on GitHub Pages.

---

# AC-04 · Three modes of use

The home page must support:

```text
FULL COURSE
~60–90 min
learning + exercises

QUICK REFRESHER
~20–30 min
core concepts + key decisions

REFERENCE
jump directly to concepts
```

The modes should reuse the same content.

Do not maintain three separate copies of the course.

---

# AC-05 · Every module has a learning contract

Each substantial lesson must identify:

```text
What should I understand?
        │
        ▼
What decision/action will teach it?
        │
        ▼
What feedback will I receive?
        │
        ▼
What should I remember?
        │
        ▼
How can I try it in Claude Code?
```

A lesson should normally contain:

1. scenario,
2. learner prediction or decision,
3. interaction/observation,
4. explanation,
5. short checkpoint,
6. takeaway,
7. optional **Go deeper** section,
8. **Try this in Claude Code** action where relevant.

---

# AC-06 · Interaction must teach

Do not make something interactive merely to make the site feel interactive.

Use this rule:

```text
Would learner action improve understanding?
              │
         ┌────┴────┐
        YES        NO
         │          │
         ▼          ▼
   interactive    explain it
```

Acceptable interaction vocabulary should remain small:

* choice/prediction,
* reveal,
* repository explorer,
* deterministic terminal,
* evidence board,
* plan reviewer,
* goal builder,
* diff reviewer,
* concept classifier,
* capstone scenario.

Avoid unnecessary interaction patterns.

---

# AC-07 · Diagram policy

For every lesson ask:

```text
Does spatial structure explain this better?
              │
         ┌────┴────┐
        YES        NO
         │          │
         ▼          ▼
      diagram      don't
```

Diagrams are appropriate for:

* workflows,
* loops,
* state transitions,
* dependencies,
* context sources,
* agent/subagent relationships,
* permission/control boundaries,
* human approval gates.

Do not create diagrams for:

* simple arithmetic,
* ordinary lists,
* code that is clearer as code,
* definitions that need only one sentence.

Every meaningful diagram must remain understandable on mobile.

---

# AC-08 · Chat → Agent mental model

The learner must encounter and understand this conceptual difference:

```text
CHAT

Prompt
  │
  ▼
Model
  │
  ▼
Answer
```

versus:

```text
AGENT

Context
   │
   ▼
Claude
   │
 decides
   ▼
Tool
   │
 acts
   ▼
Evidence
   │
   └────────► back into context
```

The learner must make at least one decision that demonstrates understanding of why tools + iterative evidence change the interaction model.

---

# AC-09 · Context Ladder is interactive

The course must teach:

```text
ORIENT
  ↓
MAP
  ↓
LOCATE
  ↓
TRACE
  ↓
CONSTRAIN
  ↓
SUMMARIZE
```

The learner must progressively discover the shopping calculator repository rather than receiving the whole explanation immediately.

At least one exercise must demonstrate:

```text
More context ≠ Better context
```

and:

```text
Better context =
relevant evidence
+ current goal
+ constraints
+ decisions
```

---

# AC-10 · Repository explorer

The shopping calculator must be browsable inside the learning experience.

At minimum the learner must be able to inspect appropriate representations of:

* repository tree,
* README/project orientation,
* calculator code,
* validation code if relevant,
* tests,
* evidence gathered so far.

It need not be a full IDE.

It must remain easy to understand on mobile.

---

# AC-11 · Problem arithmetic is explicit

The core scenario must clearly display:

```text
Subtotal       ₹2,000
Coupon         − ₹200
               ───────
Taxable amount ₹1,800
Tax @ 18%      + ₹324
               ───────
Expected       ₹2,124
```

and contrast it with:

```text
Current result
₹2,160 ✕
```

Do not replace this with a more complicated diagram.

---

# AC-12 · Research precedes editing

The learner must face a decision between actions such as:

```text
Fix immediately
Run random edits
Add an expected-value test
Investigate the root cause
```

The course must explain why investigation is appropriate before implementation.

The learner must distinguish:

```text
KNOWN
INFERRED
ASSUMED
UNVERIFIED
```

---

# AC-13 · Evidence board

The research experience must include an evidence model.

Example:

```text
KNOWN
✓ Expected result is ₹2,124
✓ Existing baseline tests pass

INFERRED
? Calculation order may explain the result

UNVERIFIED
? Percentage discounts remain correct
? Validation remains unchanged
```

As the learner investigates, evidence should change state where appropriate.

---

# AC-14 · Deterministic Claude Code simulator

The site must provide a Claude Code-style simulated interaction for the important exercises.

It must be:

```text
deterministic
client-side
reproducible
offline-compatible in principle
API-key free
```

It must **not** depend on a live LLM call for core learning.

The interaction model should be approximately:

```text
Learner action
      │
      ▼
Scenario state
      │
      ├─ strong?
      ├─ reasonable?
      ├─ premature?
      ├─ risky?
      └─ incompatible with evidence?
              │
              ▼
       feedback + evidence
```

---

# AC-15 · Feedback quality

Do not use only:

```text
Correct
Incorrect
```

Feedback should explain engineering quality.

Supported categories may include:

```text
✓ STRONG
○ REASONABLE
△ PREMATURE
⚠ HIGH RISK
✕ CONTRADICTS EVIDENCE
```

For example:

> **Reasonable, but premature.** Running the tests gives useful evidence, but you still have not established why ₹2,160 is produced.

---

# AC-16 · Plan-review exercise

The learner must review a deliberately over-scoped plan.

They must be able to distinguish:

```text
MUST CHANGE
fixed-coupon ordering
regression coverage

MUST PRESERVE
percentage discounts
validation
unrelated APIs

UNJUSTIFIED
broad refactoring
new abstractions
cleanup unrelated to the bug
```

The course must teach:

```text
smallest coherent change
```

rather than merely “smallest diff”.

---

# AC-17 · Human approval is visible

The workflow must visibly include human control points.

```text
Research
   │
   ▼
Plan
   │
   ▼
👤 REVIEW / APPROVE
   │
   ▼
Execute
   │
   ▼
Verify
   │
   ▼
👤 ACCEPT / REJECT
```

The site must not imply that an agent reaching a completion condition means the engineer has accepted the change.

---

# AC-18 · Plan, `/goal`, `/loop` stay distinct

The learner must understand:

```text
PLAN
HOW?


/goal
WHEN DONE?


/loop
WHEN AGAIN?
```

The three concepts must not be collapsed into one.

---

# AC-19 · `/goal` exercise

The learner must distinguish a completion condition from an implementation instruction.

The good example should resemble:

```text
The approved plan has been implemented,
the ₹2,000 subtotal with a ₹200 fixed coupon
and 18% tax returns ₹2,124,
existing tests pass,
and validation behavior remains unchanged.
```

The lesson must visualize:

```text
Approved plan
     │ HOW
     ▼
Execution
     │
     ▼
Evidence
     │
     ▼
/goal
     │
 goal met?
  /       \
NO        YES
│          │
↺         stop
```

---

# AC-20 · `/loop` stays a small separate concept

The course must include one appropriate polling example such as:

```text
Check CI
   │
finished?
 /       \
NO       YES
│         │
wait     report
5 min
│
└────↺
```

The calculator scenario itself must not artificially use `/loop`.

---

# AC-21 · Verification exercise

The learner must encounter:

```text
GOAL MET
   ≠
CHANGE ACCEPTED
```

They must inspect at least:

```text
Diff
Tests
Goal evidence
Scope
Risks
```

before accepting the implementation.

---

# AC-22 · Hidden scope-creep challenge

At least one verification exercise must contain a plausible unrelated change.

The learner must identify it.

Passing tests must **not** automatically mark the exercise complete.

---

# AC-23 · Tools / Permissions / Hooks / CLAUDE.md

The learner must be able to distinguish:

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
May this happen?


HOOKS
    │
    ▼
DETERMINISTIC CONTROL
When X happens, what must happen?
```

At least one scenario must assess each distinction.

---

# AC-24 · Context and memory

The learner must see the main context sources:

```text
System instructions ─────┐
User CLAUDE.md ──────────┤
Project CLAUDE.md ───────┤
Auto memory ─────────────┼──► Working context
Conversation ────────────┤
Tool evidence ───────────┘
```

The lesson must explain context hygiene and why irrelevant accumulated context can hurt engineering work.

---

# AC-25 · Subagents

The learner must understand that subagents are useful when **separation of focused context provides value**.

The course must explicitly reject:

```text
More agents = automatically better
```

At least one scenario should ask whether work belongs in:

```text
Main context
or
Focused subagent context
```

---

# AC-26 · Capstone uses a new scenario

The final assessment must not simply repeat the shopping calculator.

Use a second synthetic repository/problem.

The learner must demonstrate:

* orientation,
* investigation,
* evidence handling,
* ambiguity recognition,
* plan review,
* goal definition,
* execution control,
* verification,
* acceptance judgment.

At least one important requirement must initially be ambiguous.

The learner should discover:

```text
Sometimes the correct action is:

DON'T EDIT
    │
    ▼
Clarify requirement
```

---

# AC-27 · No answer leakage

Before an answer should become known, it must not be exposed through:

* README text,
* comments,
* test names,
* filenames,
* HTML hidden content,
* ARIA labels,
* tooltips,
* source code comments,
* scenario metadata rendered into the DOM,
* browser console,
* downloadable baseline files.

For each exercise:

```text
Can the learner discover the answer
without doing the intended reasoning?
            │
       ┌────┴────┐
      YES        NO
       │          │
      FAIL        PASS
```

This is a mandatory acceptance test.

---

# AC-28 · Core and Go Deeper

Each major concept may provide:

```text
CORE
required for everyone

GO DEEPER
optional senior-engineer perspective
```

The core experience must remain understandable without opening advanced sections.

---

# AC-29 · Real Claude Code bridge

Relevant modules must include a **Try this in Claude Code** action.

These should provide useful, copyable prompts.

The course must include downloadable or directly usable synthetic demo repositories.

The transition should be:

```text
Learn
  ↓
Practice safely
  ↓
Try in real Claude Code
```

---

# AC-30 · Progress

Progress must represent the engineering model rather than arbitrary page count.

Example:

```text
Context       ✓
Research      ✓
Plan          ●
Execute       ○
Verify        ○
Guardrails    ○
```

Progress must survive page refresh in the same browser.

No account is required.

---

# AC-31 · Mobile-first usability

The course must work at minimum at these widths:

```text
320 px
375/390 px
430 px
768 px
1024 px
desktop
```

No critical interaction may depend on hover.

Code may scroll horizontally rather than becoming unreadably small.

No:

* clipped controls,
* off-screen dialog content,
* overlapping text,
* inaccessible navigation,
* unreadably compressed diagrams.

---

# AC-32 · Accessibility

All primary journeys must be keyboard operable.

The implementation must include:

* semantic headings,
* landmarks,
* labels,
* visible focus,
* adequate contrast,
* meaningful button names,
* text alternatives for diagrams,
* reduced-motion support,
* no meaning conveyed by color alone,
* touch/focus alternative for hover interactions.

`agent-browser a11y` uses axe-core and can report accessibility violations, so it should be part of the automated verification evidence. ([GitHub][1])

---

# AC-33 · GitHub Pages compatibility

The entire core learning experience must run as a static GitHub Pages application.

Core operation must not require:

```text
backend
database
authentication
API key
Claude API
server-side state
```

Direct/deep links must work with the chosen GitHub Pages routing strategy.

---

# AC-34 · Public-safe content

All course examples must remain synthetic.

The published repository/site must not contain:

* proprietary source,
* credentials,
* internal URLs,
* customer information,
* confidential screenshots,
* sensitive company architecture,
* accidentally committed secrets.

---

# AC-35 · Content version metadata

The course must expose at least:

```text
Course version
Last updated
```

Concepts tied closely to evolving Claude Code functionality should be maintainable without searching through monolithic HTML.

---

# AC-36 · Code architecture

The solution must remain modular.

Avoid one giant HTML/JS file.

Separate concerns such as:

```text
content
lessons
scenario state
components
routing
styles
diagrams
tests
```

Avoid unnecessary framework complexity.

Do not rewrite working presentation/demo code merely to conform to the new site's architecture.

---

# AC-37 · Automated tests

Tests must cover at least:

* scenario transitions,
* correct/incorrect learner choices,
* progress persistence,
* routes/deep links,
* copy controls,
* capstone state,
* hidden answer leakage where automatable,
* calculator baseline behavior,
* key content invariants.

A bug discovered during development should receive a regression test when practical.

---

# AC-38 · Mandatory `agent-browser` verification

Browser verification is part of the **definition of done**.

The final implementation must be served locally or from the built GitHub Pages output and exercised using `agent-browser`.

`agent-browser` supports opening pages, accessibility snapshots, interaction via stable element refs, screenshots, and browser-state inspection. ([GitHub][1])

The verifier must not merely open the homepage.

It must complete representative learner journeys.

---

# AC-39 · Browser verification matrix

At minimum verify:

### Desktop

```text
1440 × 900
```

### Tablet

```text
768 × 1024
```

### Mobile

```text
390 × 844
```

### Narrow mobile stress test

```text
320 px width
```

Exact device emulation can differ, but these viewport classes must be covered.

---

# AC-40 · Required `agent-browser` journeys

The verification must exercise at least:

### Journey A — Start

```text
Open site
  ↓
See professional light theme
  ↓
Choose Full Course
  ↓
Enter first module
```

### Journey B — Context Ladder

```text
Navigate to Context
  ↓
Use repository interaction
  ↓
Make at least one learner decision
  ↓
Receive feedback
  ↓
Progress updates
```

### Journey C — Research

```text
Reach calculator problem
  ↓
Verify ₹2,124 arithmetic
  ↓
Investigate
  ↓
Observe evidence-board changes
```

### Journey D — Plan

```text
Review bad plan
  ↓
Identify scope problems
  ↓
Reach approved-plan state
```

### Journey E — Goal

```text
Compare /goal candidates
  ↓
Select completion condition
  ↓
Observe goal-loop explanation
```

### Journey F — Verification

```text
Inspect implementation evidence
  ↓
Find hidden unrelated change
  ↓
Reject or challenge implementation
```

### Journey G — Controls

```text
Complete representative
CLAUDE.md / Tool / Permission / Hook decisions
```

### Journey H — Capstone

Complete at least one valid path far enough to confirm:

```text
ambiguity
  ↓
clarification
  ↓
planning
  ↓
verification
```

---

# AC-41 · Accessibility verification with `agent-browser`

Run accessibility audits on at least:

* home,
* Context Ladder,
* terminal/research interaction,
* plan exercise,
* verification/diff experience,
* capstone.

Acceptance:

```text
0 known critical violations
0 known serious violations
```

Any incomplete/manual axe result relevant to keyboard use, contrast, names, roles or focus must be reviewed rather than ignored.

The CLI provides an `a11y` command backed by axe-core and can scope/report violations. ([GitHub][1])

---

# AC-42 · Accessibility-tree verification

Use:

```text
agent-browser snapshot
agent-browser snapshot -i
```

during verification.

Important controls must appear with meaningful accessible roles/names.

A page that looks correct in a screenshot but exposes unusable semantics to the accessibility tree does **not** pass.

The CLI's snapshot mechanism exposes the accessibility tree and interactive refs specifically for this form of inspection. ([GitHub][1])

---

# AC-43 · Visual verification

Capture screenshots for representative screens.

At minimum:

```text
Home
Agent mental model
Context Ladder
Calculator problem
Plan exercise
Plan / goal / loop
Verification
Controls
Context / subagents
Capstone
```

Review them at desktop and at least one mobile viewport.

Check:

```text
contrast
clipping
spacing
hierarchy
diagram legibility
code legibility
button visibility
text wrapping
overflow
```

---

# AC-44 · Professional-light-theme visual checks

The browser verification must explicitly inspect:

```text
background
foreground text
cards
buttons
diagram nodes
feedback states
code blocks
selected/unselected options
disabled states
focus states
```

No recurrence of presentation-style bugs such as:

```text
light text on light background
dark text on dark background
```

Computed styles may be inspected when visual contrast is questionable; `agent-browser` provides style inspection commands in addition to screenshots. ([MCP Servers][2])

---

# AC-45 · Console/runtime cleanliness

Representative browser journeys must be checked for:

```text
JavaScript errors
uncaught exceptions
failed resource loads
broken routes
missing assets
```

No known runtime error may remain in a core learning path.

---

# AC-46 · Evidence of verification

Codex must leave verification evidence in the repository rather than merely stating:

> Tested successfully.

Recommended:

```text
artifacts/
└── verification/
    ├── desktop/
    │   └── screenshots...
    ├── mobile/
    │   └── screenshots...
    └── VERIFICATION_REPORT.md
```

If generated screenshots should not be committed long term, a temporary verification directory is acceptable, but the written report should remain.

---

# AC-47 · Verification report

`VERIFICATION_REPORT.md` should record:

```text
Build/tests
    ✓ / ✕

Browser journeys
    ✓ / ✕

Desktop
    ✓ / ✕

Tablet
    ✓ / ✕

Mobile
    ✓ / ✕

Accessibility
    ✓ / ✕

Answer leakage
    ✓ / ✕

Console errors
    ✓ / ✕

Known limitations
    ...

Deferred items
    ...
```

Include actual commands/results where useful.

---

# AC-48 · Explicit non-goals for v1

Do not expand scope to implement:

```text
✕ dark mode
✕ authentication
✕ real Claude API integration
✕ backend
✕ database
✕ leaderboard
✕ gamification/badges
✕ completion certificates
✕ instructor dashboard
✕ large video system
✕ PWA/offline support
✕ analytics unless trivial and privacy-safe
```

These require a separate decision.

---

# AC-49 · Final completion gate

Codex must not consider the goal complete until:

```text
                     IMPLEMENTATION
                           │
                           ▼
                     UNIT TESTS PASS
                           │
                           ▼
                    BUILD / SERVE PASS
                           │
                           ▼
                AGENT-BROWSER JOURNEYS
                           │
                           ▼
                    MOBILE / DESKTOP
                           │
                           ▼
                  ACCESSIBILITY AUDIT
                           │
                           ▼
                     VISUAL REVIEW
                           │
                           ▼
                   ANSWER-LEAK AUDIT
                           │
                           ▼
                 VERIFICATION REPORT
                           │
                           ▼
                       COMPLETE
```

If any required browser journey fails, the goal is **not complete**.

---

