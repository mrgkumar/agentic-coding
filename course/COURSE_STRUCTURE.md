# Course Structure · v1.3

The app keeps ten top-level modules. Module 01 now establishes the technical reason for context engineering before the learner practices the Context Ladder.

```text
00 Start                              #/start

01 How an Agent Thinks                #/agent
  ├─ Chat vs agent                    #/agent
  ├─ Attention mechanism              #/agent/attention
  ├─ Position bias                    #/agent/position
  └─ Finite context                   #/agent/budget

02 Build Context                      #/context/orient
  ├─ Orient / repository              #/context/orient
  ├─ Context Ladder                   #/context/ladder
  └─ Context summary                  #/context/summary

03 Research Before Editing            #/research/problem
  ├─ Problem                          #/research/problem
  ├─ Investigation                    #/research/investigation
  └─ Evidence board                   #/research/evidence

04 Plan the Change                    #/plan/critique
  ├─ Critique bad plan                #/plan/critique
  └─ Approve good plan                #/plan/approve

05 Control Execution                  #/execution/controls
  ├─ Plan / goal / loop               #/execution/controls
  ├─ /goal exercise                   #/execution/goal
  └─ /loop micro-example              #/execution/loop

06 Verify & Accept                    #/verification/goal
  ├─ Goal met?                        #/verification/goal
  ├─ Review evidence                  #/verification/review
  └─ Acceptance decision              #/verification/scope

07 Extend & Control Claude            #/controls/map
  ├─ Extension map                    #/controls/map
  ├─ Choose the mechanism             #/controls/choose
  └─ Safety layers                    #/controls/safety

08 Manage Long-Running Work           #/context-agents/sources
  ├─ Memory and sources               #/context-agents/sources
  ├─ /context /compact /clear         #/context-agents/hygiene
  ├─ Handoff / resume                 #/context-agents/handoff
  ├─ /rewind /branch                  #/context-agents/recovery
  └─ Subagent / worktree / team       #/context-agents/parallel

09 Capstone                           #/capstone/repository
  ├─ New repository                   #/capstone/repository
  ├─ Investigation                    #/capstone/investigation
  ├─ Plan / execution                 #/capstone/plan
  └─ Verification                     #/capstone/verification
```

Total learner routes: **31 + reference**.

## Modes

- **Full course**: all routes, target about 80–105 minutes.
- **Quick refresher**: curated decision path, now includes the position/context-resource foundation, target about 35–45 minutes.
- **Reference**: direct concept lookup plus primary research and official Claude Code documentation.

## Module 01 causal bridge

```text
Agent loop
   ↓
Attention is selective
   ↓
Position can matter
   ↓
Long context has failure modes
   ↓
Therefore context must be engineered
   ↓
Context Ladder
```

Progress remains stored in `localStorage` and learners can resume the most recent route from the home page.
