# Claude Code Course Gap Audit · v1.2

Audit date: 19 August 2026

## Goal

Find material Claude Code concepts that a new engineer could reasonably need but that were missing or too lightly represented in v1.1. Add only concepts that improve the engineering mental model; avoid converting the course into a command catalog.

## Added to the core course

| Gap | Why it matters | Where added |
|---|---|---|
| Skills | Reusable knowledge/workflows are distinct from persistent project guidance | 07 · Choose the mechanism |
| Output styles | Response/system behavior is distinct from project instructions | 07 · Extension map / classifier |
| Rules | Path-scoped guidance keeps large-project context lean | 07 + 08 · guidance/memory |
| MCP | External services are a separate capability layer | 07 · Extension map / classifier |
| Plugins | Packaging/distribution layer; not another reasoning mechanism | 07 · Extension map / classifier |
| Built-in commands vs bundled skills | Slash syntax alone does not tell the learner which mechanism is running | 07 · Extension map |
| `/verify` | Product verification skill supports the engineering verification loop but does not replace acceptance | 06 · Verify & Accept |
| Sandboxing | Isolation is distinct from permissions | 07 · Safety layers |
| Permission mode vs rule | Baseline approval behavior differs from fine-grained allow/ask/deny rules | 07 · Safety layers |
| Project trust / prompt injection | Repository and tool content can influence the agent | 07 · Safety layers |
| `/context` | Diagnose context use before cleaning it | 08 · Context hygiene |
| `/compact` | Preserve the thread while reducing noisy history | 08 · Context hygiene |
| `/clear` | Fresh context is a different operation from compaction | 08 · Context hygiene |
| Handoff | Fresh readers need explicit engineering state, not only a transcript | 08 · Handoff / resume |
| `/rename` / `/recap` / `/resume` / `/export` | Session orientation/continuity is distinct from structured handoff | 08 · Handoff / resume |
| Checkpoints / `/rewind` | Recovery is an important safety and experimentation tool | 08 · Recovery |
| `/branch` | Trying another reasoning path should not destroy the original | 08 · Recovery |
| Worktrees | File-edit isolation differs from context isolation | 08 · Parallel work |
| Agent teams | Helps distinguish full independent sessions from subagents | 08 · Parallel work, marked advanced/experimental |

## Added as situational reference, not full lessons

These are useful to know exist, but a full learner screen would dilute the core course:

- Code intelligence / language-server navigation
- Non-interactive mode and Agent SDK
- Remote Control / Teleport
- Artifacts
- Agent teams (also briefly taught in the parallelism comparison)

## Deliberately not expanded in v1.2

- Detailed CLI command reference
- Every permission mode
- Settings precedence details
- Marketplace administration
- MCP transport/auth configuration
- Agent-team implementation mechanics
- CI/CD integration walkthroughs
- Remote/cloud surface setup
- Model/effort tuning

These are documentation/reference topics rather than prerequisites for the engineering control model.

## Refined mental model

```text
ENGINEERING LOOP
Context → Research → Plan → Human review → Execute → Verify → Human acceptance

EXTEND THE AGENT
CLAUDE.md / Rules → persistent guidance
Skills            → reusable knowledge/workflows
Output style      → default response behavior
MCP               → external services/tools
Subagents         → isolated focused work
Hooks             → lifecycle automation
Plugins           → package/distribute extensions

CONTROL RISK
Project trust → Permissions → Sandbox → Hooks → Human verification

MANAGE LONG WORK
Memory → /context → /compact or /clear
       → handoff / resume
       → rewind or branch
       → subagent or worktree when isolation is needed
```

## Completeness verdict

No major beginner-to-intermediate conceptual gap remains in the core engineering workflow. Future additions should be driven by learner feedback or a clearly defined audience need, not by feature count.
