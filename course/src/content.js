export const lessons = [
  { id: "start", title: "Start", short: "Start", progress: "Start", objective: "Set the learning contract: control an engineering agent instead of trying to prompt it perfectly." },
  { id: "agent", title: "How an Agent Thinks", short: "Agent + attention", progress: "Model", objective: "Understand the agent loop, how attention uses context, and why context quality matters more than raw context volume." },
  { id: "context", title: "Build Context", short: "Context", progress: "Context", objective: "Build relevant repository context in a deliberate ladder instead of flooding the conversation." },
  { id: "research", title: "Research Before Editing", short: "Research", progress: "Evidence", objective: "Separate observations, hypotheses, and open questions before touching code." },
  { id: "plan", title: "Plan the Change", short: "Plan", progress: "Plan", objective: "Review for the smallest coherent change and protect behavior that must remain stable." },
  { id: "execution", title: "Control Execution", short: "Execute", progress: "Control", objective: "Keep plan, /goal, and /loop distinct while retaining human control." },
  { id: "verification", title: "Verify & Accept", short: "Verify", progress: "Verify", objective: "Decide whether the goal is met and whether the change is actually acceptable." },
  { id: "controls", title: "Extend & Control Claude", short: "Extensions", progress: "Extend", objective: "Choose the right extension or control: guidance, reusable skills, external tools, automation, presentation, or safety boundaries." },
  { id: "context-agents", title: "Manage Long-Running Work", short: "Long-running work", progress: "Continuity", objective: "Manage memory, context, sessions, handoffs, recovery, and parallel work without losing engineering state." },
  { id: "capstone", title: "Capstone", short: "Capstone", progress: "Apply", objective: "Transfer the complete workflow to a new repository with an ambiguous requirement." }
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
  { label: "Claude Code context window", note: "Official Claude Code view of what occupies context and how to manage it.", url: "https://code.claude.com/docs/en/context-window" }
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
