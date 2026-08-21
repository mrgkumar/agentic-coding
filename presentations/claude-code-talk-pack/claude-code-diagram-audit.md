# Diagram Relevance Audit

The question asked for every slide was: **Would a diagram materially improve understanding of structure, flow, dependency, state, or control?**

| Slide | Diagram? | Decision |
|---:|:---:|---|
| 01 | No | Opening thesis. A diagram would dilute the headline. |
| 02 | Yes | Assistant vs coding-agent behavior is a flow comparison. Existing side-by-side pipelines retained. |
| 03 | Yes | Core agent behavior is a feedback loop. Rebuilt as a real loop with result → context feedback and a permission checkpoint. |
| 04 | No | Live prompt slide. The terminal interaction is the visual. |
| 05 | Yes | Context building is progressive narrowing. Staircase retained. |
| 06 | Yes | Context sources and persistence are relationships. Rebuilt as sources feeding CURRENT CONTEXT. |
| 07 | No | The arithmetic ledger is clearer than a process diagram. Retained as a stacked calculation. |
| 08 | Yes | The engineering workflow has human decision gates. Rebuilt with ALIGN, APPROVE and ACCEPT gates. |
| 09 | No | Evidence checklist is the point. A new research diagram would duplicate slides 05/08/10. |
| 10 | No | Live investigation prompt. Keep audience attention on Claude Code. |
| 11 | Yes, simple | Planning sits between research and execution. Existing small chain retained; no extra diagram added. |
| 12 | Yes, simple | Live planning prompt is primary. Existing propose → review → approved-plan chain retained. |
| 13 | Yes | Plan, /goal and /loop represent three different control structures. Added a miniature diagram to each. |
| 14 | Yes — critical | Execution is a control loop. Added approved plan → execute → evidence → goal check → repeat/stop, plus human-review escape path. |
| 15 | Yes — critical | Automated completion is not human acceptance. Added explicit verification/acceptance gate. |
| 16 | No | This is a capability taxonomy. Icons + categories are more readable than a relationship diagram. |
| 17 | Yes | Subagents are a topology/context-isolation concept. Enhanced delegation ↓ and summary/evidence ↑ paths. |
| 18 | Yes | Guardrails have increasing enforcement strength. Existing layered diagram retained. |
| 19 | Yes | Compaction is a before/after state transformation. Added noisy context → /compact → smaller working context. |
| 20 | Yes, simple | Closing recap benefits from one simple operating flow. Existing flow retained; no richer diagram added. |

## Principle

Use a diagram only when it answers at least one of these questions faster than prose:

- **What flows where?**
- **What depends on what?**
- **Where is the human decision gate?**
- **What repeats?**
- **What changes state?**
- **What is isolated from what?**

Do not diagram a slide merely because a diagram would look attractive.
