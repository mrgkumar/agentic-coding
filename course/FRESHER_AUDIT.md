# Learner and Visual Audit · v1.2

Audience: mixed entry-level and senior engineers.

## Learner-flow assessment

The course now teaches three connected layers rather than only the basic coding loop:

```text
DO THE WORK
Context → Research → Plan → Execute → Verify

EXTEND / CONTROL THE AGENT
Skills · Rules · MCP · Subagents · Hooks · Plugins · Sandbox

KEEP LONG WORK HEALTHY
Memory · Compact · Handoff · Resume · Rewind · Branch · Worktrees
```

This closes the largest vocabulary gaps without adding new top-level modules.

## Cognitive-load decisions

- Skills, output styles, MCP, and plugins are taught together because learners mainly need to distinguish their responsibilities.
- Sandboxing is paired with permissions and project trust because those concepts are often confused.
- `/context`, `/compact`, and `/clear` share one screen because they answer one context-hygiene decision.
- Handoff and session resume share one screen but are explicitly distinguished.
- `/rewind` and `/branch` share one recovery screen because one restores while the other preserves an alternate path.
- Subagents, worktrees, and agent teams share one isolation screen because they solve different parallelism boundaries.
- Code intelligence, non-interactive usage, Remote Control/Teleport, and artifacts remain situational reference items.

## Visual policy

The professional light theme remains unchanged. New concepts use diagrams only where relationships or boundaries matter; commands and comparisons use structured cards/tables instead of decorative diagrams.

## Remaining learner-validation need

The next meaningful refinement should come from observing first-time learners. In particular, test whether new employees can correctly answer:

1. Skill vs CLAUDE.md vs Rule
2. Skill vs Subagent
3. Permission vs Sandbox
4. `/compact` vs `/clear`
5. Handoff vs `/resume`
6. `/rewind` vs `/branch`
7. Subagent vs Worktree

If learners consistently confuse one pair, refine that comparison rather than adding more features.
