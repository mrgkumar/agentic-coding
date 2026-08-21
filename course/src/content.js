export const lessons = [
  { id: "start", title: "Start", short: "Start", progress: "Start", objective: "Set the learning contract: control an engineering agent instead of trying to prompt it perfectly." },
  { id: "agent", title: "From LLM to Coding Agent", short: "LLM → agent", progress: "Model", objective: "Understand tokens, Transformer blocks, the agent loop, how attention uses context, and why tools create observable evidence rather than certainty." },
  { id: "context", title: "Build Context", short: "Context", progress: "Context", objective: "Build relevant repository context in a deliberate ladder instead of flooding the conversation." },
  { id: "research", title: "Investigate Before Editing", short: "Investigate", progress: "Evidence", objective: "Separate known facts, inferences, assumptions, and open questions before touching code." },
  { id: "plan", title: "Plan the Change", short: "Plan", progress: "Plan", objective: "Review for the smallest coherent change and protect behavior that must remain stable." },
  { id: "execution", title: "Control Execution", short: "Execute", progress: "Control", objective: "Keep the plan, completion condition, and recurring schedule distinct while retaining human control." },
  { id: "verification", title: "Verify, Review & Accept", short: "Verify", progress: "Verify", objective: "Review evidence and decide whether the completion condition is met and the change is acceptable." },
  { id: "controls", title: "Extend & Constrain the Agent", short: "Extensions", progress: "Extend", objective: "Choose the right responsibility: guidance, reusable procedure, external capability, focused worker, automation, authorization, or isolation." },
  { id: "context-agents", title: "Manage Long-Running Work", short: "Long-running work", progress: "Continuity", objective: "Manage memory, context, sessions, handoffs, recovery, and parallel work without losing engineering state." },
  { id: "capstone", title: "Cross-Platform Capstone", short: "Capstone", progress: "Apply", objective: "Transfer the complete workflow to a new repository with an ambiguous requirement, independent of product commands." }
];

export const files = {
  "README.md": `# Shopping Calculator

A small JavaScript calculator used by a checkout page.

Run tests:
  npm test

The public API is calculateBill(input).`,
  "package.json": `{
  "name": "shopping-calculator",
  "type": "module",
  "scripts": { "test": "node --test" }
}`,
  "src/calculator.js": `export function calculateBill({
  price, quantity, discountType, discountValue, taxRate
}) {
  validateInputs(...);
  const subtotal = price * quantity;

  if (discountType === "percentage") {
    const discount = subtotal * (discountValue / 100);
    const taxable = subtotal - discount;
    const tax = taxable * (taxRate / 100);
    return { subtotal, discount, tax, total: taxable + tax };
  }

  const tax = subtotal * (taxRate / 100);
  const discount = Math.min(discountValue, subtotal);
  return { subtotal, discount, tax, total: subtotal + tax - discount };
}`,
  "tests/calculator.test.js": `test("percentage discount keeps tax on discounted subtotal", ...)
test("negative prices are rejected", ...)
test("fixed coupons cannot reduce a bill below zero", ...)`
};

export const capstoneFiles = {
  "README.md": `# Pulse Monitor

A tiny service converts heartbeat age into a status for a dashboard.

Current statuses: healthy, stale.

Product request:
"Add a warning state before a heartbeat becomes stale."`,
  "src/monitor.js": `export function getStatus(lastSeen, now) {
  const ageSeconds = (now - lastSeen) / 1000;
  if (ageSeconds > 30) return "stale";
  return "healthy";
}`,
  "tests/monitor.test.js": `test("10 second heartbeat is healthy", ...)
test("45 second heartbeat is stale", ...)`,
  "src/api.js": `const status = getStatus(lastSeen, Date.now());
return Response.json({ status });`
};

export const ladderSteps = [
  { id: "orient", label: "ORIENT", short: "Purpose, runtime, commands", detail: "Establish what the repository does and how to run it before interpreting implementation details.", prompt: "Summarize this repository's purpose, runtime, test command, and major folders. Do not make changes." },
  { id: "map", label: "MAP", short: "Components and responsibilities", detail: "Build a coarse map of the parts that matter so later searches have structure.", prompt: "Map the main components and their responsibilities. Keep this at architecture level." },
  { id: "locate", label: "LOCATE", short: "Files relevant to the goal", detail: "Narrow attention to files that can explain the requested behavior.", prompt: "Which files are relevant to checkout calculation behavior, and why?" },
  { id: "trace", label: "TRACE", short: "Input through behavior", detail: "Follow the execution path so observations become causal rather than merely adjacent.", prompt: "Trace one checkout input from validation through subtotal, discount, tax, and final total." },
  { id: "constrain", label: "CONSTRAIN", short: "What must remain stable", detail: "Name neighboring behavior that a fix must preserve before implementation begins.", prompt: "List the existing behaviors and public contracts that this change must preserve." },
  { id: "summarize", label: "SUMMARIZE", short: "Compact working model", detail: "Compress the useful evidence into a working model that can survive a longer engineering session.", prompt: "Summarize the current goal, relevant files, behavior flow, constraints, evidence, and open questions." }
];


export const researchSources = [
  { label: "Lost in the Middle", note: "Classic positional-performance study: relevant information is often used best near the beginning or end of long input.", url: "https://arxiv.org/abs/2307.03172" },
  { label: "Found in the Middle", note: "Connects lost-in-the-middle behavior with U-shaped positional attention bias.", url: "https://arxiv.org/abs/2406.16008" },
  { label: "Positional Biases Shift as Inputs Approach Context Window Length", note: "Reports weakening primacy and relatively stable recency for very long relative inputs, producing an end-dominant regime.", url: "https://arxiv.org/abs/2508.07479" },
  { label: "Effective context engineering for AI agents", note: "Anthropic engineering guidance on context rot, finite attention budget, and high-signal context.", url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" },
  { label: "Claude Code context window", note: "Official Claude Code view of what occupies context and how to manage it.", url: "https://code.claude.com/docs/en/context-window" },
  { label: "Codex best practices", note: "Official Codex guidance for repository orientation, reusable project guidance, verification, and bounded tasks.", url: "https://learn.chatgpt.com/guides/best-practices" }
];

export const tokenSources = [
  { label: "OpenAI Tokenizer", note: "Interactive tokenizer and token-count explorer; the exact result depends on the selected model family.", url: "https://platform.openai.com/tokenizer" },
  { label: "Hugging Face: Tokenizers", note: "A practical explanation of tokenization pipelines, vocabularies, and common subword methods.", url: "https://huggingface.co/docs/course/en/chapter2/4" },
  { label: "Attention Is All You Need", note: "The original Transformer paper: attention-based sequence processing without recurrence or convolutions.", url: "https://arxiv.org/abs/1706.03762" },
  { label: "Optional video: Transformers, the tech behind LLMs", note: "Visual explanation of tokens, embeddings, attention, and the Transformer stack.", url: "https://www.youtube.com/watch?v=wjZofJX0v4M" }
];

export const officialDocs = [
  { label: "How Claude Code works", url: "https://code.claude.com/docs/en/how-claude-code-works" },
  { label: "Extend Claude Code", url: "https://code.claude.com/docs/en/features-overview" },
  { label: "Skills", url: "https://code.claude.com/docs/en/skills" },
  { label: "Output styles", url: "https://code.claude.com/docs/en/output-styles" },
  { label: "Memory and CLAUDE.md", url: "https://code.claude.com/docs/en/memory" },
  { label: "Rules", url: "https://code.claude.com/docs/en/memory" },
  { label: "MCP", url: "https://code.claude.com/docs/en/mcp" },
  { label: "Plugins", url: "https://code.claude.com/docs/en/plugins" },
  { label: "Permissions", url: "https://code.claude.com/docs/en/permissions" },
  { label: "Sandboxing", url: "https://code.claude.com/docs/en/sandboxing" },
  { label: "Hooks", url: "https://code.claude.com/docs/en/hooks" },
  { label: "Sessions", url: "https://code.claude.com/docs/en/sessions" },
  { label: "Checkpointing", url: "https://code.claude.com/docs/en/checkpointing" },
  { label: "Subagents", url: "https://code.claude.com/docs/en/sub-agents" },
  { label: "Worktrees", url: "https://code.claude.com/docs/en/worktrees" },
  { label: "/goal", url: "https://code.claude.com/docs/en/goal" }
];
