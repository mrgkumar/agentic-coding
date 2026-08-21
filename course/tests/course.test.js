import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { lessons, files, capstoneFiles, ladderSteps, researchSources, tokenSources } from "../src/content.js";
import { PLATFORM_IDS, platformConcepts, sourceRegistry, normalizePlatform, isReviewOverdue } from "../src/platforms.js";
import { glossary } from "../src/glossary.js";
import { retrievalPrompts } from "../src/foundations.js";

const appSource = fs.readFileSync(new URL("../src/app.js", import.meta.url), "utf8");
const cssSource = fs.readFileSync(new URL("../styles.css", import.meta.url), "utf8");
const htmlSource = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
const siteSource = fs.readFileSync(new URL("../../site/index.html", import.meta.url), "utf8");
const platformSource = fs.readFileSync(new URL("../src/platforms.js", import.meta.url), "utf8");
const foundationSource = fs.readFileSync(new URL("../src/foundations.js", import.meta.url), "utf8");
const glossarySource = fs.readFileSync(new URL("../src/glossary.js", import.meta.url), "utf8");
const capstoneSource = fs.readFileSync(new URL("../src/capstone.js", import.meta.url), "utf8");

const expectedModules = ["start", "agent", "context", "research", "plan", "execution", "verification", "controls", "context-agents", "capstone"];

test("course preserves the required ten-module learning sequence", () => {
  assert.deepEqual(lessons.map(item => item.id), expectedModules);
});

test("context ladder contains all six deliberate context-building stages", () => {
  assert.deepEqual(ladderSteps.map(item => item.label), ["ORIENT", "MAP", "LOCATE", "TRACE", "CONSTRAIN", "SUMMARIZE"]);
});

test("shopping-calculator baseline does not leak the diagnosis in README or tests", () => {
  assert.match(files["src/calculator.js"], /calculateBill/);
  assert.doesNotMatch(files["README.md"], /bug|tax before|coupon before|2124|2,124/i);
  assert.doesNotMatch(files["tests/calculator.test.js"], /2124|2,124|fixed coupon.*tax/i);
});

test("capstone exposes the request but not the missing threshold answer", () => {
  assert.match(capstoneFiles["README.md"], /warning state/i);
  assert.doesNotMatch(capstoneFiles["README.md"], /20 seconds|threshold|ambiguous|unspecified/i);
  assert.match(capstoneFiles["src/monitor.js"], /> 30/);
});

test("plan, completion condition, and schedule remain distinct control questions", () => {
  assert.match(appSource, /PLAN[\s\S]*How\?/i);
  assert.match(appSource, /GOAL[\s\S]*When done\?/i);
  assert.match(appSource, /SCHEDULE[\s\S]*When again\?/i);
});

test("verification includes diff, tests, approved plan, and a scope decision", () => {
  assert.match(appSource, /data-evidence-tab="diff"/);
  assert.match(appSource, /data-evidence-tab="tests"/);
  assert.match(appSource, /data-evidence-tab="plan"/);
  assert.match(appSource, /verification-decision/);
});

test("multiple-choice options are shuffled without losing their answer mapping", () => {
  assert.match(appSource, /const shuffled = choices\.map\(\(choice, index\) => \(\{ choice, index \}\)\)/);
  assert.match(appSource, /Math\.floor\(Math\.random\(\) \* \(index \+ 1\)\)/);
  assert.match(appSource, /data-choice="\$\{index\}"/);
});

test("course navigation resets the viewport and exposes the current update date", () => {
  assert.match(appSource, /window\.scrollTo\(\{ top: 0, left: 0, behavior: "auto" \}\)/);
  assert.match(htmlSource, /Updated 21 August 2026/);
  assert.match(siteSource, /Course 2\.0 alpha\.2 · Updated 21 August 2026/);
});

test("extension lesson starts from durable responsibilities", () => {
  for (const term of ["Project guidance", "Path-scoped guidance", "Skill", "MCP", "Subagent", "Hook", "Approval policy", "Sandbox / worktree", "Plugin"]) {
    assert.match(appSource, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }
});

test("extension classification does not expose mechanism answers in DOM attributes", () => {
  assert.match(appSource, /data-extension-id/);
  assert.doesNotMatch(appSource, /data-extension-answer/);
});

test("safety lesson separates trust, tools, permissions, sandbox, and hooks", () => {
  for (const term of ["PROJECT TRUST", "TOOLS", "PERMISSIONS", "SANDBOX", "HOOKS", "prompt-injection"]) {
    assert.match(appSource, new RegExp(term, "i"));
  }
});

test("long-running work teaches context hygiene, handoff, recovery, and parallel isolation", () => {
  for (const term of ["Inspect", "compact", "start fresh", "resume", "restore", "branch", "worktree", "parallel sessions", "handoff"]) {
    assert.match(appSource, new RegExp(term, "i"));
  }
});

test("memory lesson distinguishes human guidance, path scope, and learned context", () => {
  assert.match(appSource, /HUMAN-WRITTEN[\s\S]*Project guidance/i);
  assert.match(appSource, /PATH-SCOPED[\s\S]*Focused guidance/i);
  assert.match(appSource, /LEARNED[\s\S]*Persistent learned context/i);
});

test("plan review does not encode keep/remove answers in rendered attributes", () => {
  assert.doesNotMatch(appSource, /data-plan-review="(?:keep|remove)"/);
  assert.match(appSource, /data-plan-item/);
});

test("course stays professional-light only and includes mobile breakpoints", () => {
  assert.match(cssSource, /--canvas:\s*#f3f7fb/i);
  assert.match(cssSource, /@media \(max-width: 800px\)/);
  assert.doesNotMatch(cssSource, /prefers-color-scheme:\s*dark/i);
});

test("new extension and continuity visuals have mobile collapse rules", () => {
  assert.match(cssSource, /\.extension-band/);
  assert.match(cssSource, /\.memory-compare/);
  assert.match(cssSource, /\.parallel-map/);
  assert.match(cssSource, /\.safety-row/);
});

test("adapter source registry uses official Claude Code and Codex documentation", () => {
  assert.ok(sourceRegistry.length >= 8);
  assert.ok(sourceRegistry.some(item => item.product === "Claude Code"));
  assert.ok(sourceRegistry.some(item => item.product === "Codex"));
  assert.ok(sourceRegistry.every(item => /^(https:\/\/code\.claude\.com\/docs\/|https:\/\/learn\.chatgpt\.com\/)/.test(item.url)));
  assert.ok(sourceRegistry.every(item => /^\d{4}-\d{2}-\d{2}$/.test(item.lastReviewed)));
});


test("attention foundation distinguishes context capacity, attention, and persistent memory", () => {
  for (const term of ["Context window", "Attention", "Memory / files", "Query", "Keys + values", "Attention weights"]) {
    assert.match(appSource, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }
  assert.match(appSource, /Context available ≠ context used equally/i);
});

test("position-bias lesson teaches U-shaped lost-in-middle and carefully framed J-like recency regime", () => {
  assert.match(appSource, /U-shaped[\s\S]*lost in the middle/i);
  assert.match(appSource, /J-like[\s\S]*recency-dominant/i);
  assert.match(appSource, /not universal|not a universal/i);
  assert.doesNotMatch(appSource, /LLMs have a J curve/i);
  assert.match(appSource, /<text x="14" y="185" transform="rotate\(-90 14 185\)">RELIABLE USE<\/text>/);
  for (const term of ["Y-axis: reliable use, not raw attention", "task-performance proxy", "RELIABLE USE", "Set the contract", "Reduce the fog", "Restate the state", "Concrete example", "Practical response", "Front-load the contract", "Compress the middle", "Close with a handoff", "Test the arrangement"]) {
    assert.match(appSource, new RegExp(term.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&"), "i"));
  }
});

test("finite-context lesson connects context rot to practical context engineering", () => {
  for (const term of ["attention budget", "context rot", "Lost in the middle", "Recency dominance", "Context pollution", "Stale context", "goal drift", "compact", "start fresh", "subagents", "handoff"]) {
    assert.match(appSource, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }
});

test("long-context research sources are explicit and primary", () => {
  assert.ok(researchSources.length >= 5);
  assert.ok(researchSources.some(item => item.label === "Lost in the Middle"));
  assert.ok(researchSources.some(item => item.label.includes("Positional Biases Shift")));
  assert.ok(researchSources.every(item => /^(https:\/\/arxiv\.org\/|https:\/\/www\.anthropic\.com\/|https:\/\/code\.claude\.com\/|https:\/\/learn\.chatgpt\.com\/)/.test(item.url)));
});

test("platform selector supports one shared course in four modes", () => {
  assert.deepEqual(PLATFORM_IDS, ["generic", "claude", "codex", "compare"]);
  assert.match(htmlSource, /id="platform-select"/);
  assert.match(appSource, /state\.platform = normalizePlatform/);
  assert.match(appSource, /localStorage\.setItem/);
  assert.match(appSource, /searchParams\.set\("platform"/);
  assert.equal(normalizePlatform("unknown"), "generic");
});

test("platform-specific behavior is structured as adapters", () => {
  const fields = ["concept_id", "command_or_surface", "short_explanation", "caveat", "official_source", "last_reviewed", "maturity"];
  for (const concept of ["orient", "guidance", "plan", "goal", "schedule", "verify", "permissions", "rules", "continuity"]) {
    assert.ok(platformConcepts[concept]?.generic);
    for (const platform of ["generic", "claude", "codex"]) {
      assert.deepEqual(fields.every(field => Object.hasOwn(platformConcepts[concept][platform], field)), true);
    }
    assert.ok(platformConcepts[concept]?.claude?.official_source);
    assert.ok(platformConcepts[concept]?.codex?.official_source);
  }
  assert.match(platformSource, /command rules/i);
  assert.match(platformSource, /path-scoped guidance/i);
});

test("adapter review-age calculation flags stale and invalid dates", () => {
  const now = new Date("2026-08-21T00:00:00Z");
  assert.equal(isReviewOverdue("2026-08-21", now), false);
  assert.equal(isReviewOverdue("2025-01-01", now), true);
  assert.equal(isReviewOverdue("not-a-date", now), true);
});

test("rules collision is explicit rather than inferred from a shared name", () => {
  assert.match(platformConcepts.rules.claude.short_explanation, /guidance/i);
  assert.match(platformConcepts.rules.codex.short_explanation, /commands outside the sandbox/i);
  assert.equal(platformConcepts.rules.codex.maturity, "experimental");
  assert.match(appSource, /platformNote\("rules"/);
});

test("beginner path includes readiness and a complete first-task walkthrough", () => {
  assert.match(appSource, /start\/readiness/);
  assert.match(appSource, /agent\/first-task/);
  for (const term of ["Do not edit anything", "Require evidence", "Verify one claim", "uncertain", "vary between runs", "working context"]) {
    assert.match(foundationSource, new RegExp(term, "i"));
  }
});

test("beginner foundation explains tokens and Transformers without presenting the toy split as universal", () => {
  assert.match(appSource, /agent\/tokens/);
  for (const term of ["Tokens are the working units", "toy tokenizer", "model-specific", "Transformer", "attention", "feed-forward", "next token", "Optional deep dive", "causal language model", "Tokens are not thoughts"]) {
    assert.match(foundationSource, new RegExp(term.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&"), "i"));
  }
  assert.ok(tokenSources.length >= 4);
  assert.ok(tokenSources.some(item => item.url === "https://platform.openai.com/tokenizer"));
  assert.ok(tokenSources.some(item => item.url === "https://arxiv.org/abs/1706.03762"));
  assert.ok(tokenSources.some(item => item.url === "https://www.youtube.com/watch?v=wjZofJX0v4M"));
  assert.match(cssSource, /\.token-demo/);
  assert.match(cssSource, /\.transformer-flow/);
});

test("task contract includes all six required control fields", () => {
  for (const field of ["Goal", "Context", "Constraints", "Evidence", "Done when", "Stop / ask"]) {
    assert.match(foundationSource, new RegExp(field.replace("/", "\\/"), "i"));
  }
  assert.match(foundationSource, /data-draft="\$\{id\}"/);
});

test("plan practice requires a constructed response with delayed exemplar", () => {
  assert.match(appSource, /plan\/construct/);
  assert.match(foundationSource, /Your proposed plan/);
  assert.match(foundationSource, /data-reveal="\$\{escapeAttribute\(id\)\}"/);
  assert.match(appSource, /data-reveal-panel/);
});

test("evidence board distinguishes known, inferred, assumed, and unverified", () => {
  for (const label of ["KNOWN", "INFERRED", "ASSUMED", "UNVERIFIED"]) assert.match(appSource, new RegExp(label));
  assert.match(cssSource, /evidence-column\.assumed/);
});

test("reference includes a searchable persistent glossary", () => {
  assert.ok(glossary.length >= 20);
  assert.ok(glossary.some(([term]) => term === "Task contract"));
  assert.match(glossarySource, /data-glossary-filter/);
  assert.match(appSource, /glossaryFilter\.addEventListener/);
});

test("every top-level module has a cumulative retrieval check", () => {
  assert.deepEqual(Object.keys(retrievalPrompts), expectedModules);
  assert.match(appSource, /renderRetrievalCheck\(page\.module\)/);
});

test("capstone contains candidate evidence, boundary review, scope review, and handoff", () => {
  assert.match(appSource, /capstone\/evidence/);
  assert.match(appSource, /capstone\/handoff/);
  for (const term of ["20\/30-second boundaries", "observedAt", "response-shape constraint", "Your handoff", "Changed files", "Next action"]) {
    assert.match(capstoneSource, new RegExp(term, "i"));
  }
});

test("new learning surfaces are modularized outside the route orchestrator", () => {
  assert.match(appSource, /from "\.\/foundations\.js"/);
  assert.match(appSource, /from "\.\/glossary\.js"/);
  assert.match(appSource, /from "\.\/capstone\.js"/);
  assert.ok(foundationSource.length > 5000);
});

test("attention and position visuals include responsive collapse rules", () => {
  for (const selector of [".attention-pipeline", ".curve-grid", ".signal-compare", ".retrieval-flow", ".failure-grid", ".research-links"]) {
    assert.match(cssSource, new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("quick refresher retains the attention and context-resource foundation", () => {
  const quick = appSource.match(/const quickPaths = new Set\(\[([\s\S]*?)\]\);/)?.[1] || "";
  for (const path of ["agent", "agent/attention", "agent/position", "agent/budget", "context/ladder"]) {
    assert.match(quick, new RegExp(path.replace("/", "\\/")));
  }
});
