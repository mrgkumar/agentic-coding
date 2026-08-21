export const glossary = [
  ["Agent", "A model operating in an observe–decide–act loop with tools and new evidence."],
  ["Approval policy", "Rules for when an action may run automatically and when human authorization is required."],
  ["Assumption", "A claim temporarily treated as true without enough supporting evidence."],
  ["Attention", "The mechanism that selectively combines information from context during model computation."],
  ["Completion condition", "Observable conditions that tell the agent when work can stop and return for verification."],
  ["Context", "The working input currently available to the model, including prompts, files, guidance, history, and tool results."],
  ["Evidence", "An observable source—code, command output, test, diff, or document—that supports or challenges a claim."],
  ["Goal", "The desired outcome; in this course, expressed as a visible completion contract."],
  ["Handoff", "A compact engineering state that lets another person or session continue without reconstructing the work."],
  ["Hook", "A deterministic action that runs at a lifecycle event."],
  ["Inference", "A conclusion supported by evidence but not directly observed."],
  ["MCP", "A protocol for connecting an agent to external tools, services, and resources."],
  ["Project guidance", "Stable human-written instructions that shape work in a repository."],
  ["Sandbox", "An isolation boundary that limits filesystem, process, or network reach."],
  ["Scope creep", "Work outside the approved requirement and plan."],
  ["Skill", "Reusable task knowledge or procedure loaded when relevant."],
  ["Subagent", "A focused worker with a separate reasoning context."],
  ["Task contract", "Goal, Context, Constraints, Evidence, Done when, and Stop / ask."],
  ["Tool", "A capability the agent can use to observe or change an environment."],
  ["Verification", "The act of checking requirement, diff, tests, scope, risk, and uncertainty before acceptance."],
  ["Worktree", "A separate Git working tree used to isolate concurrent file edits."]
];

export function renderGlossary() {
  return `<section class="panel glossary-panel"><span class="tag">GLOSSARY</span><h2>Search the shared vocabulary</h2><p class="small">These definitions are product-neutral. Platform adapters translate the responsibility into a current surface.</p><label class="glossary-search"><span>Filter terms</span><input type="search" data-glossary-filter placeholder="Try “evidence” or “sandbox”" autocomplete="off"></label><p class="glossary-count" data-glossary-count>${glossary.length} terms</p><div class="glossary-grid">${glossary.map(([term, definition]) => `<article class="glossary-term" data-glossary-term="${(term + " " + definition).toLowerCase()}"><h3>${term}</h3><p>${definition}</p></article>`).join("")}</div><div class="feedback reasonable" data-glossary-empty hidden>No terms match that filter.</div></section>`;
}
