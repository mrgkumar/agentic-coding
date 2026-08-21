# Next Version Implementation Report

**Release:** `2.0.0-alpha.2`  
**Date:** 21 August 2026  
**Direction:** one tool-independent course with Claude Code and Codex adapters

## Outcome

This batch closes the material learner-flow gaps found by auditing the alpha.1 implementation against `GENERIC_AGENTIC_CODING_COURSE_PLAN_V2(1).md`.

## Changed

- Added a non-gating readiness check and a complete first-task orientation walkthrough before attention internals.
- Made model limits and the working-context stack explicit for true beginners.
- Added a six-field task-contract builder: Goal, Context, Constraints, Evidence, Done when, and Stop / ask.
- Added a constructed plan exercise with locally saved drafts and delayed exemplar reveal.
- Expanded the evidence board to Known, Inferred, Assumed, and Unverified.
- Added one cumulative retrieval check to every top-level module.
- Added a searchable, product-neutral glossary with 21 terms.
- Completed the capstone evidence loop with a candidate diff, missing boundary coverage, an out-of-scope API change, a written review rationale, corrected verification evidence, and a final handoff.
- Refined every adapter entry to carry `concept_id`, `command_or_surface`, `short_explanation`, `caveat`, `official_source`, `last_reviewed`, and `maturity`.
- Made the “rules” collision visible: Claude project rules are guidance; Codex command rules govern authorization outside the sandbox.
- Added a 180-day adapter-source review-age calculation.
- Extracted new learner surfaces into `foundations.js`, `glossary.js`, and `capstone.js` instead of placing their content in the route orchestrator.

## Preserved

- Ten top-level modules and one shared progress identity.
- Shopping Calculator as the continuous learning case.
- Pulse Monitor as the transfer capstone.
- Context Ladder, attention and positional-bias lessons, diff/test review, safety layers, and continuity lessons.
- Generic, Claude Code, Codex, and compare modes.
- Professional light theme; static, API-key-free, GitHub Pages-compatible architecture.

## Verified

- JavaScript syntax checks pass for all six source modules.
- All **34** course tests pass.
- Tests now cover the adapter schema, review-age logic, rules collision, beginner path, task contract, constructed planning, four-state evidence board, glossary, cumulative retrieval, capstone evidence and handoff, and modularization.

## Remaining release gates

- Run the learner journey against the deployed Pages preview in all four platform modes.
- Verify keyboard-only operation, accessible names and focus order, console cleanliness, and horizontal overflow at desktop and mobile widths.
- Run learner validation with at least one Claude Code beginner, one Codex beginner, and one product switcher.

No browser-verification claim is made in this artifact because the available local Playwright runtime has no browser executable and the remote browser blocks loopback addresses.

## Official adapter sources checked

- [Codex developer commands](https://learn.chatgpt.com/docs/developer-commands)
- [Codex best practices](https://learn.chatgpt.com/guides/best-practices)
- [Codex command rules](https://learn.chatgpt.com/docs/agent-configuration/rules)
- [Codex skills](https://learn.chatgpt.com/docs/build-skills)
- [Codex hooks](https://learn.chatgpt.com/docs/hooks)
- [Codex worktrees](https://developers.openai.com/codex/environments/git-worktrees)
- [Claude Code commands](https://code.claude.com/docs/en/commands)
- [Claude Code skills](https://code.claude.com/docs/en/skills)
- [Claude Code permissions](https://code.claude.com/docs/en/permissions)
- [Claude Code memory and project guidance](https://code.claude.com/docs/en/memory)
- [Claude Code hooks](https://code.claude.com/docs/en/hooks)
- [Claude Code worktrees](https://code.claude.com/docs/en/worktrees)
- [Claude Code subagents](https://code.claude.com/docs/en/sub-agents)

