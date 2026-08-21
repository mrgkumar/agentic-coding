export const PLATFORM_IDS = ["generic", "claude", "codex", "compare"];

export const platforms = {
  generic: { id: "generic", label: "Generic concepts", shortLabel: "Generic", description: "Learn the durable engineering responsibility without vendor commands." },
  claude: { id: "claude", label: "Claude Code", shortLabel: "Claude", description: "Show concise Claude Code commands and configuration notes after the shared lesson." },
  codex: { id: "codex", label: "Codex", shortLabel: "Codex", description: "Show concise Codex commands and configuration notes after the shared lesson." },
  compare: { id: "compare", label: "Show both", shortLabel: "Both", description: "Compare both adapters after the shared lesson without duplicating the lesson." }
};

const reviewed = "2026-08-21";
const entry = (concept_id, command_or_surface, short_explanation, caveat, official_source = null, prompt = "", maturity = "current") => ({
  concept_id, command_or_surface, short_explanation, caveat, official_source, last_reviewed: reviewed, maturity, prompt
});

export const platformConcepts = {
  orient: {
    label: "Orient before editing",
    generic: entry("orient", "Product-neutral prompt", "Ask the agent to inspect the repository and report evidence before it changes files.", "A summary is a claim set; verify at least one cited source or command.", null, "Orient this repository first. Summarize its purpose, runtime, test command, major folders, and the files relevant to the current task. Cite the evidence for each claim. Do not edit anything."),
    claude: entry("orient", "Claude Code session", "Open Claude Code in the project and use the same product-neutral orientation prompt.", "There is no orientation command that replaces evidence review.", "https://code.claude.com/docs/en/best-practices", "What does this project do? Summarize the runtime and test command, cite the files you used, and do not edit anything."),
    codex: entry("orient", "Codex app, CLI, or IDE", "Open Codex in the target project and ask it to orient before making changes.", "Repository access and approval settings can change what Codex can observe.", "https://learn.chatgpt.com/guides/best-practices", "Tell me about this project. Summarize the runtime and test command, cite the files you used, and do not edit anything.")
  },
  guidance: {
    label: "Project guidance",
    generic: entry("guidance", "Versioned project guidance", "Store short, stable repository expectations near the code they govern.", "Guidance shapes behavior; it is not an authorization or isolation boundary."),
    claude: entry("guidance", "CLAUDE.md and .claude/rules/", "Use CLAUDE.md for stable guidance and path-scoped guidance rules only where they apply.", "Claude project rules are guidance—not command authorization rules.", "https://code.claude.com/docs/en/memory"),
    codex: entry("guidance", "AGENTS.md and AGENTS.override.md", "Codex builds a guidance chain from global and project files; nearer guidance overrides broader guidance.", "Keep guidance concise because loaded instructions consume working context.", "https://learn.chatgpt.com/docs/agent-configuration/agents-md")
  },
  plan: {
    label: "Plan the change",
    generic: entry("plan", "Explicit planning request", "Ask for a bounded, reviewable route and withhold implementation until a human approves it.", "A plan is a proposal, not authorization to edit."),
    claude: entry("plan", "Plan mode or /plan", "Use planning controls for investigation and a reviewable implementation route before editing.", "Available commands and modes can change; the responsibility is the stable part.", "https://code.claude.com/docs/en/commands"),
    codex: entry("plan", "/plan or plan mode", "Use the planning control when you want a visible route before implementation.", "Review the route for scope, evidence, and preservation constraints before approving it.", "https://learn.chatgpt.com/docs/developer-commands")
  },
  goal: {
    label: "Completion condition",
    generic: entry("goal", "Done-when contract", "State observable behavior, checks, preserved constraints, and scope boundaries.", "Meeting a completion condition returns work for verification; it does not equal acceptance."),
    claude: entry("goal", "/goal", "Attach a visible completion contract when long-running work benefits from an explicit finish line.", "Confirm command availability in the current release; the contract can always be expressed in plain language.", "https://code.claude.com/docs/en/goal"),
    codex: entry("goal", "/goal", "Use /goal to keep the completion contract visible while Codex works toward verifiable conditions.", "Goal completion does not approve the result or expand the plan.", "https://learn.chatgpt.com/docs/developer-commands")
  },
  schedule: {
    label: "Recurring check",
    generic: entry("schedule", "Time- or event-driven recurrence", "Schedule another observation only when work depends on a later time or external state.", "A schedule says when to check again, not what correctness means."),
    claude: entry("schedule", "/loop or scheduled task", "Use a recurring surface for repeated checks inside a session.", "Recurrence does not define correctness and may not persist beyond its documented lifecycle.", "https://code.claude.com/docs/en/commands"),
    codex: entry("schedule", "Automation or scheduled task", "Use a scheduled task when another check must run later or repeatedly.", "Keep the schedule separate from the completion condition and acceptance decision.", "https://learn.chatgpt.com/docs/developer-commands")
  },
  verify: {
    label: "Verify and review",
    generic: entry("verify", "Evidence review", "Inspect the requirement, diff, tests, scope, risks, and unresolved uncertainty before acceptance.", "No single signal—including green tests—substitutes for the full review."),
    claude: entry("verify", "Checks plus review skills", "Run repository checks and inspect the diff; bundled verification or review skills can add evidence.", "Agent review does not replace the engineer's acceptance decision.", "https://code.claude.com/docs/en/skills"),
    codex: entry("verify", "Checks plus /review", "Run checks, inspect the diff, and use an independent review surface where available.", "The review surface can miss requirements or organizational context it cannot see.", "https://learn.chatgpt.com/docs/developer-commands")
  },
  permissions: {
    label: "Authorization and reach",
    generic: entry("permissions", "Approval policy plus isolation boundary", "Authorization decides whether an action may run. Isolation limits where the action can reach.", "Tool availability, authorization, and isolation are separate layers."),
    claude: entry("permissions", "Permission modes, rules, and sandboxing", "Permission settings authorize actions; sandboxing constrains filesystem and network reach.", "Repository-supplied configuration is untrusted until the project is trusted.", "https://code.claude.com/docs/en/permissions"),
    codex: entry("permissions", "Approval policy, command rules, and sandbox", "The sandbox limits technical reach; approval policy and command rules govern authorization.", "Codex command rules are experimental and are not the same thing as project guidance.", "https://learn.chatgpt.com/docs/agent-configuration/rules", "", "experimental")
  },
  rules: {
    label: "The word “rules” collides",
    generic: entry("rules", "Name the responsibility explicitly", "Ask whether a rule is guidance for the agent or authorization for a command.", "Never infer equivalent semantics from a shared feature name."),
    claude: entry("rules", ".claude/rules/", "Claude project rules provide scoped guidance that shapes how the agent works.", "They do not provide OS-level isolation or replace permissions.", "https://code.claude.com/docs/en/memory"),
    codex: entry("rules", "Command rules", "Codex rules control whether commands outside the sandbox are allowed, prompted, or forbidden.", "This feature is experimental and is not Codex project guidance; AGENTS.md fills that role.", "https://learn.chatgpt.com/docs/agent-configuration/rules", "", "experimental")
  },
  continuity: {
    label: "Long-running work",
    generic: entry("continuity", "Inspect, compact, hand off, branch, or start fresh", "Keep one coherent task per context and preserve engineering state explicitly.", "Conversation continuity is not durable source history; keep important changes in Git."),
    claude: entry("continuity", "/context, /compact, /clear, /resume, /branch, /rewind", "Use each command for its documented responsibility and keep Git as durable source history.", "Checkpoint coverage and command semantics vary by release and action.", "https://code.claude.com/docs/en/commands"),
    codex: entry("continuity", "/status, /compact, new chat, resume, /fork, Git", "Inspect session state, compact coherent history, fork alternatives, and use worktrees to isolate parallel edits.", "A fork copies reasoning context; a worktree is still needed to isolate competing file edits.", "https://learn.chatgpt.com/docs/developer-commands")
  }
};

export const sourceRegistry = Object.entries(platformConcepts).flatMap(([concept, group]) => ["claude", "codex"].map(platform => {
  const item = group[platform];
  return { product: platforms[platform].label, concept, label: group.label, url: item.official_source, lastReviewed: item.last_reviewed, maturity: item.maturity };
}));

export function isReviewOverdue(lastReviewed, now = new Date(), maximumAgeDays = 180) {
  const reviewedAt = new Date(`${lastReviewed}T00:00:00Z`);
  return Number.isNaN(reviewedAt.valueOf()) || (now.valueOf() - reviewedAt.valueOf()) / 86_400_000 > maximumAgeDays;
}

export function normalizePlatform(value) {
  return PLATFORM_IDS.includes(value) ? value : "generic";
}
