# Course Structure · v2.0 alpha

The course keeps one ten-module lesson graph. The learner selects a platform guide without creating a second course or progress history.

```text
00 Start                              #/start

01 From LLM to Coding Agent           #/agent
  ├─ LLM vs agent                     #/agent
  ├─ Tokens + Transformers             #/agent/tokens
  ├─ Attention mechanism              #/agent/attention
  ├─ Position bias                    #/agent/position
  └─ Finite context                   #/agent/budget

02 Build Context                      #/context/orient
  ├─ Orient / repository              #/context/orient
  ├─ Context Ladder                   #/context/ladder
  └─ Context summary                  #/context/summary

03 Investigate Before Editing         #/research/problem
  ├─ Observed problem                 #/research/problem
  ├─ Investigation                    #/research/investigation
  └─ Evidence board                   #/research/evidence

04 Plan the Change                    #/plan/critique
  ├─ Critique bad plan                #/plan/critique
  └─ Approve good plan                #/plan/approve

05 Control Execution                  #/execution/controls
  ├─ Plan / goal / schedule           #/execution/controls
  ├─ Completion condition             #/execution/goal
  └─ Recurring check                  #/execution/loop

06 Verify, Review & Accept            #/verification/goal
  ├─ Goal met?                        #/verification/goal
  ├─ Review evidence                  #/verification/review
  └─ Acceptance decision              #/verification/scope

07 Extend & Constrain the Agent       #/controls/map
  ├─ Responsibility map               #/controls/map
  ├─ Choose the mechanism             #/controls/choose
  └─ Safety layers                    #/controls/safety

08 Manage Long-Running Work           #/context-agents/sources
  ├─ Guidance, memory, context         #/context-agents/sources
  ├─ Inspect / compact / start fresh   #/context-agents/hygiene
  ├─ Handoff / resume                 #/context-agents/handoff
  ├─ Restore / branch                 #/context-agents/recovery
  └─ Subagent / worktree / sessions   #/context-agents/parallel

09 Cross-Platform Capstone            #/capstone/repository
  ├─ New repository                   #/capstone/repository
  ├─ Investigation                    #/capstone/investigation
  ├─ Plan / execution                 #/capstone/plan
  └─ Verification                     #/capstone/verification
```

Total learner routes: **38 + reference**.

## Learning modes

- **Full course**: all routes, target about 80–105 minutes.
- **Quick refresher**: curated decision path, target about 35–45 minutes.
- **Reference**: direct concept lookup plus research and official platform sources.

## Platform guide modes

- **Generic concepts**: shared principle and product-neutral prompt only.
- **Claude Code**: shared content plus concise Claude Code adapter notes.
- **Codex**: shared content plus concise Codex adapter notes.
- **Show both**: shared content followed by a compact adapter comparison.

Platform selection, course mode, answers, drafts, and progress share one browser-local state. Switching a platform does not reset completion.

## Central operating model

```text
Understand goal
      ↓
Build context
      ↓
Gather evidence
      ↓
Propose plan
      ↓
Human review
      ↓
Agent executes
      ↓
Agent verifies
      ↓
Human reviews evidence
      ↓
Accept or correct
```

## Content boundary

```text
SHARED PRINCIPLE
      ↓
SHARED ENGINEERING PATTERN
      ↓
PLATFORM ADAPTER
```

The shared lesson must remain meaningful without slash commands. Current product commands, configuration files, caveats, sources, maturity, and review dates belong in `src/platforms.js`.
