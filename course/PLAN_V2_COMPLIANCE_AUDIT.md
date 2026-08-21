# Plan v2 Compliance Audit

**Baseline audited:** `2.0.0-alpha.1`  
**Refined result:** `2.0.0-alpha.2`  
**Source of truth:** `GENERIC_AGENTIC_CODING_COURSE_PLAN_V2(1).md`

## Requirement matrix

| Plan v2 requirement | Alpha.1 gap | Alpha.2 result | Status |
|---|---|---|---|
| Software engineers new to LLMs and coding agents can begin without hidden prerequisites | Prerequisites existed, but no readiness interaction | Non-gating readiness check plus labeled support for unfamiliar learners | Closed |
| Complete first-task walkthrough before attention internals | Orientation existed later in the context module | Four-step no-edit orientation walkthrough now precedes attention | Closed |
| Plain explanation of model, tools, context, memory, verification, and limits | Core concepts existed but limits were scattered | First-task lesson explicitly covers capabilities, four limits, and the working-context stack | Closed |
| One shared workflow plus Claude Code and Codex adapters | Implemented | Preserved with one progress identity and compare mode | Preserved |
| Explicit task contract: Goal, Context, Constraints, Evidence, Done when, Stop / ask | Missing | Six-field locally saved builder with exemplar | Closed |
| Evidence taxonomy includes Known, Inferred, Assumed, Unverified | Assumed was missing | Four-column evidence board | Closed |
| Learner constructs a plan, not only recognizes one | Checkbox critique and multiple choice only | Free-form 3–5 step plan with delayed exemplar | Closed |
| Persistent glossary and easy retrieval | Static reference only | Searchable 21-term glossary in the persistent Reference route | Closed |
| Cumulative retrieval practice | Missing | One recall-before-reveal check at every module boundary | Closed |
| Complete capstone evidence and handoff loop | Final page asserted success without showing a flawed candidate or handoff | Candidate diff/tests, boundary and scope defects, written rationale, corrected evidence, final handoff | Closed |
| Adapter entries carry source, caveat, date, and maturity metadata | Source metadata was split from lesson entries | Required seven fields now live on every generic/Claude/Codex adapter entry | Closed |
| Product naming collisions are explicit | “Rules” distinction was indirect | Dedicated compare note distinguishes Claude guidance from experimental Codex command authorization rules | Closed |
| Source freshness can be audited | Review dates existed but no overdue state | 180-day review-age calculation appears in source registry | Closed |
| Avoid further monolithic feature growth | New work was at risk of expanding `app.js` | Feature content extracted into three focused modules; app remains the route/wiring layer | Substantially closed |
| Professional light visual system and responsive layout | Implemented | Preserved; new surfaces include 1000/800/520px collapse rules | Preserved |
| Automated static verification | 24 tests | 34 tests plus syntax checks for all source modules | Closed |
| Deployed browser, keyboard, accessibility, console, and overflow validation | Environment blocked local browser automation | Documented release gate; no unsupported claim | Open release gate |
| Beginner and product-switcher learner validation | Not run | Documented release gate | Open release gate |

## Audit conclusion

The implementation now matches the material curriculum, interaction, adapter, and capstone requirements in Plan v2. The only open items require a deployed browser surface or real learners; they are release validation gates rather than missing course content.

