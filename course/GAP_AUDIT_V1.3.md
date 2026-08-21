# Claude Code Course Gap Audit · v1.3

Audit date: 19 August 2026

## Gap addressed

The course previously taught context management well, but it did not explain the model behavior that makes context engineering necessary. Module 01 now provides that causal foundation.

## Added to the core course

| Concept | Why it matters | Where |
|---|---|---|
| Attention mental model | Distinguishes information being available from being equally influential | 01.2 Attention |
| Context window vs attention vs memory | Prevents three common concepts from being conflated | 01.2 Attention |
| Query / Key / Value | Gives technical depth without forcing a mathematical derivation | 01.2 optional Go deeper |
| Positional bias | Shows that placement can affect long-context use | 01.3 Position |
| U-shaped lost-in-the-middle pattern | Well-established long-context failure pattern | 01.3 Position |
| J-like recency-dominant regime | Adds nuance for inputs approaching more of the context window | 01.3 Position |
| Context rot | Explains degradation as context grows | 01.4 Finite context |
| Attention budget | Practitioner mental model for finite useful signal | 01.4 Finite context |
| Retrieval vs reasoning | Presence is not enough: information must be found, connected and used | 01.4 Finite context |
| Context failure modes | Lost middle, recency dominance, pollution, stale context, drift, conflict | 01.4 Finite context |
| Engineering countermeasures | Connects /compact, /clear, subagents and handoff to the underlying limitation | 01.4 + 08.2 |

## Accuracy guardrails

The course deliberately does **not** claim:

- that all LLMs always follow a U-shaped curve;
- that LLMs universally “have a J curve”;
- that attention weights are a complete explanation of model reasoning;
- that a larger context window guarantees reliable use of all tokens;
- that repeating instructions at the end is a universal fix.

The J-shaped visualization is labeled **J-like / recency-dominant regime** and is presented as an observed pattern under some very long relative-input conditions.

## Research basis

The course links directly to primary/official sources:

- *Lost in the Middle: How Language Models Use Long Contexts* — arXiv 2307.03172
- *Found in the Middle: Calibrating Positional Attention Bias Improves Long Context Utilization* — arXiv 2406.16008
- *Positional Biases Shift as Inputs Approach Context Window Length* — arXiv 2508.07479
- Anthropic, *Effective context engineering for AI agents*
- Claude Code, *Explore the context window*

## Refined mental model

```text
CONTEXT WINDOW
what can be referenced
      │
      ▼
ATTENTION / RETRIEVAL
what becomes salient and connected
      │
      ▼
REASONING
what is used correctly
      │
      ▼
ACTION
what changes the next decision
```

Persistent state sits outside this immediate chain:

```text
CLAUDE.md / Rules / Memory / Files
                │
                └──── load or retrieve ───► context
```

## Completeness verdict

The course now explains both sides of context engineering:

1. **Why context is difficult** — attention, position, retrieval and context rot.
2. **What engineers do about it** — Context Ladder, compaction, clearing, memory/guidance, handoff and context isolation.

Further transformer internals should remain optional rather than expanding the core course into an ML architecture course.
