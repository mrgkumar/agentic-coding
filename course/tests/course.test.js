import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { lessons, files, capstoneFiles, ladderSteps, researchSources, officialDocs } from "../src/content.js";

const appSource = fs.readFileSync(new URL("../src/app.js", import.meta.url), "utf8");
const cssSource = fs.readFileSync(new URL("../styles.css", import.meta.url), "utf8");

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

test("plan, goal, and loop remain distinct control questions", () => {
  assert.match(appSource, /PLAN[\s\S]*How\?/i);
  assert.match(appSource, /\/goal[\s\S]*When done\?/i);
  assert.match(appSource, /\/loop[\s\S]*When again\?/i);
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

test("extension lesson covers the major Claude Code extension choices", () => {
  for (const term of ["CLAUDE.md", "Rules", "Skills", "Output style", "MCP", "Subagents", "Hooks", "Plugins", "Code intelligence"]) {
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
  for (const term of ["/context", "/compact", "/clear", "/resume", "/rename", "/export", "/rewind", "/branch", "worktree", "agent team", "handoff"]) {
    assert.match(appSource, new RegExp(term.replace("/", "\\/"), "i"));
  }
});

test("memory lesson distinguishes CLAUDE.md, rules, and auto memory", () => {
  assert.match(appSource, /HUMAN-WRITTEN[\s\S]*CLAUDE\.md/i);
  assert.match(appSource, /PATH-SCOPED[\s\S]*Rules/i);
  assert.match(appSource, /CLAUDE-WRITTEN[\s\S]*Auto memory/i);
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

test("official documentation links use code.claude.com", () => {
  assert.ok(officialDocs.length >= 12);
  assert.ok(officialDocs.every(item => item.url.startsWith("https://code.claude.com/docs/")));
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
  for (const term of ["attention budget", "context rot", "Lost in the middle", "Recency dominance", "Context pollution", "Stale context", "goal drift", "/compact", "/clear", "subagents", "handoff"]) {
    assert.match(appSource, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }
});

test("long-context research sources are explicit and primary", () => {
  assert.ok(researchSources.length >= 5);
  assert.ok(researchSources.some(item => item.label === "Lost in the Middle"));
  assert.ok(researchSources.some(item => item.label.includes("Positional Biases Shift")));
  assert.ok(researchSources.every(item => /^(https:\/\/arxiv\.org\/|https:\/\/www\.anthropic\.com\/|https:\/\/code\.claude\.com\/)/.test(item.url)));
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
