import { lessons, files, capstoneFiles, ladderSteps, researchSources, tokenSources } from "./content.js";
import { platforms, platformConcepts, sourceRegistry, normalizePlatform, isReviewOverdue } from "./platforms.js";
import { renderReadiness, renderFirstTask, renderTokenPrimer, renderTaskContract, renderConstructPlan, renderRetrievalCheck } from "./foundations.js";
import { renderGlossary } from "./glossary.js";
import { renderCapstoneEvidence, renderCapstoneHandoff } from "./capstone.js";

const main = document.querySelector("#main");
const nav = document.querySelector("#lesson-nav");
const bar = document.querySelector("#progress-bar");
const progressLabel = document.querySelector("#progress-label");
const platformSelect = document.querySelector("#platform-select");

const STORAGE_KEY = "agent-course-state-v3";
const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
state.done ||= [];
state.answers ||= [];
state.drafts ||= {};
state.mode ||= "full";
state.platform = normalizePlatform(new URLSearchParams(location.search).get("platform") || state.platform);

const fullSequence = [
  { path: "start", module: "start", label: "Start", title: "Start" },
  { path: "start/readiness", module: "start", label: "Readiness", title: "Your starting point" },
  { path: "agent", module: "agent", label: "LLM vs agent", title: "From LLM to Coding Agent" },
  { path: "agent/first-task", module: "agent", label: "First task", title: "Your first agent task" },
  { path: "agent/tokens", module: "agent", label: "Tokens + Transformers", title: "Tokens and Transformers" },
  { path: "agent/attention", module: "agent", label: "Attention mechanism", title: "How attention uses context" },
  { path: "agent/position", module: "agent", label: "Position bias", title: "Position changes what gets used" },
  { path: "agent/budget", module: "agent", label: "Finite context", title: "Treat context as a finite engineering resource" },
  { path: "context/orient", module: "context", label: "Orient / repository", title: "Orient the repository" },
  { path: "context/ladder", module: "context", label: "Context Ladder", title: "Context Ladder" },
  { path: "context/summary", module: "context", label: "Context summary", title: "Context summary" },
  { path: "context/contract", module: "context", label: "Task contract", title: "Build a task contract" },
  { path: "research/problem", module: "research", label: "Problem", title: "The observed problem" },
  { path: "research/investigation", module: "research", label: "Investigation", title: "Investigation" },
  { path: "research/evidence", module: "research", label: "Evidence board", title: "Evidence board" },
  { path: "plan/critique", module: "plan", label: "Critique bad plan", title: "Critique the plan" },
  { path: "plan/construct", module: "plan", label: "Construct a plan", title: "Construct the plan" },
  { path: "plan/approve", module: "plan", label: "Approve good plan", title: "Approve the plan" },
  { path: "execution/controls", module: "execution", label: "Plan / goal / schedule", title: "Plan, completion condition, and schedule" },
  { path: "execution/goal", module: "execution", label: "Completion exercise", title: "Write a completion condition" },
  { path: "execution/loop", module: "execution", label: "Recurring check", title: "Use recurrence only when time matters" },
  { path: "verification/goal", module: "verification", label: "Goal met?", title: "Goal met?" },
  { path: "verification/review", module: "verification", label: "Diff / test review", title: "Review the evidence" },
  { path: "verification/scope", module: "verification", label: "Scope-creep challenge", title: "Make the acceptance decision" },
  { path: "controls/map", module: "controls", label: "Extension map", title: "Extend the agent at the right layer" },
  { path: "controls/choose", module: "controls", label: "Choose the mechanism", title: "Choose the right mechanism" },
  { path: "controls/safety", module: "controls", label: "Safety layers", title: "Safety is layered" },
  { path: "context-agents/sources", module: "context-agents", label: "Memory and sources", title: "What persists, and where?" },
  { path: "context-agents/hygiene", module: "context-agents", label: "Context hygiene", title: "Inspect, compact, or start fresh" },
  { path: "context-agents/handoff", module: "context-agents", label: "Handoff / resume", title: "Continue without losing the thread" },
  { path: "context-agents/recovery", module: "context-agents", label: "Recover / branch", title: "Recover or explore safely" },
  { path: "context-agents/parallel", module: "context-agents", label: "Parallel work", title: "Choose the right isolation boundary" },
  { path: "capstone/repository", module: "capstone", label: "New repository", title: "New repository" },
  { path: "capstone/investigation", module: "capstone", label: "Investigation", title: "Capstone investigation" },
  { path: "capstone/plan", module: "capstone", label: "Plan / execution", title: "Plan and execution" },
  { path: "capstone/evidence", module: "capstone", label: "Evidence review", title: "Review candidate evidence" },
  { path: "capstone/verification", module: "capstone", label: "Verification", title: "Capstone verification" },
  { path: "capstone/handoff", module: "capstone", label: "Handoff", title: "Capstone handoff" }
];

const quickPaths = new Set([
  "start", "agent", "agent/first-task", "agent/tokens", "agent/attention", "agent/position", "agent/budget", "context/ladder", "context/contract", "research/problem", "research/investigation",
  "plan/critique", "execution/controls", "execution/goal", "verification/scope",
  "controls/choose", "controls/safety", "context-agents/hygiene", "context-agents/handoff",
  "context-agents/parallel", "capstone/investigation", "capstone/evidence", "capstone/handoff"
]);
const quickSequence = fullSequence.filter(page => quickPaths.has(page.path));

const esc = value => String(value).replace(/[&<>]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[char]));
const escAttr = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

function syncPlatformToUrl() {
  const url = new URL(location.href);
  if (state.platform === "generic") url.searchParams.delete("platform");
  else url.searchParams.set("platform", state.platform);
  history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
}

function setPlatform(platform) {
  state.platform = normalizePlatform(platform);
  save();
  syncPlatformToUrl();
}

function platformNote(conceptId, { includeGeneric = false } = {}) {
  const concept = platformConcepts[conceptId];
  if (!concept) return "";
  if (state.platform === "generic") {
    if (!includeGeneric) return "";
    return `<aside class="platform-note generic-note"><span class="tag">SHARED PATTERN</span><h3>${concept.label}</h3><strong>${concept.generic.command_or_surface}</strong><p>${concept.generic.short_explanation}</p><small>${concept.generic.caveat}</small></aside>`;
  }

  const ids = state.platform === "compare" ? ["claude", "codex"] : [state.platform];
  if (state.platform === "compare") {
    return `<aside class="platform-note compare-note"><div class="adapter-heading"><span class="tag">PLATFORM ADAPTERS</span><h3>${concept.label}</h3></div><div class="adapter-table" role="table" aria-label="${escAttr(concept.label)} platform comparison">${ids.map(id => {
      const item = concept[id];
      return `<div class="adapter-column" role="row"><span class="adapter-product">${platforms[id].label}</span><strong>${item.command_or_surface}</strong><p>${item.short_explanation}</p><small>${item.caveat}</small>${item.official_source ? `<a href="${item.official_source}" target="_blank" rel="noreferrer">Official source ↗</a>` : ""}<span class="adapter-meta">${item.maturity} · reviewed ${item.last_reviewed}</span></div>`;
    }).join("")}</div></aside>`;
  }

  const item = concept[state.platform];
  return `<aside class="platform-note"><div class="adapter-heading"><span class="tag green">${platforms[state.platform].label.toUpperCase()}</span><h3>${concept.label}</h3></div><strong>${item.command_or_surface}</strong><p>${item.short_explanation}</p><small>${item.caveat}</small>${item.official_source ? `<a href="${item.official_source}" target="_blank" rel="noreferrer">Official source ↗</a>` : ""}<span class="adapter-meta">${item.maturity} · reviewed ${item.last_reviewed}</span></aside>`;
}

function selectedPrompt(conceptId, fallback) {
  const concept = platformConcepts[conceptId];
  if (!concept) return fallback;
  if (state.platform === "compare") return concept.generic.prompt || fallback;
  return concept[state.platform]?.prompt || concept.generic.prompt || fallback;
}

const route = () => location.hash.replace(/^#\/?/, "") || "start";
const lessonIndex = id => lessons.findIndex(item => item.id === id);
const firstPageForModule = id => fullSequence.find(page => page.module === id)?.path || "start";

function activePath() {
  const raw = route();
  if (raw === "reference") return { path: "reference", module: "reference", title: "Reference" };
  const direct = fullSequence.find(page => page.path === raw);
  if (direct) return direct;
  const module = raw.split("/")[0];
  return fullSequence.find(page => page.module === module) || fullSequence[0];
}

function currentSequence(page) {
  if (state.mode === "quick" && quickSequence.some(item => item.path === page.path)) return quickSequence;
  return fullSequence;
}

function modulePages(module) {
  return fullSequence.filter(page => page.module === module);
}

function isModuleFinal(page) {
  const pages = modulePages(page.module);
  return pages.at(-1)?.path === page.path;
}

function renderNav() {
  const current = activePath();
  if (platformSelect) platformSelect.value = state.platform;
  nav.innerHTML = lessons.map((lesson, index) => `
    <li>
      <a href="#/${firstPageForModule(lesson.id)}"
         aria-current="${current.module === lesson.id ? "page" : "false"}"
         class="${state.done.includes(lesson.id) ? "done" : ""}">
        <span class="num">${state.done.includes(lesson.id) ? "✓" : String(index).padStart(2, "0")}</span>
        <span>${lesson.short}</span>
      </a>
    </li>`).join("");

  const completed = state.done.filter(id => lessons.some(lesson => lesson.id === id)).length;
  bar.style.width = `${completed / lessons.length * 100}%`;
  progressLabel.textContent = `${completed} / ${lessons.length}`;
}

function complete(module) {
  state.done = [...new Set([...state.done, module])];
  save();
  renderNav();
}

function stepMeta(page) {
  const pages = modulePages(page.module);
  const step = Math.max(0, pages.findIndex(item => item.path === page.path));
  return `
    <div class="module-meta">
      <span class="kicker">Module ${String(lessonIndex(page.module)).padStart(2, "0")}</span>
      <span class="module-step">Step ${step + 1} of ${pages.length}</span>
    </div>
    <div class="step-dots" aria-hidden="true">
      ${pages.map((_, index) => `<span class="step-dot ${index < step ? "done" : index === step ? "current" : ""}"></span>`).join("")}
    </div>`;
}

function shell(page, body) {
  const lesson = lessons.find(item => item.id === page.module);
  const sequence = currentSequence(page);
  let index = sequence.findIndex(item => item.path === page.path);
  if (index < 0) index = fullSequence.findIndex(item => item.path === page.path);
  const previous = sequence[Math.max(0, index - 1)];
  const next = sequence[Math.min(sequence.length - 1, index + 1)];
  const finishing = page.path === "capstone/handoff";
  const shouldComplete = finishing || !next || page.module !== next.module;
  const previousButton = index > 0 ? `<a class="button ghost" href="#/${previous.path}">← Previous</a>` : `<span></span>`;
  const nextButton = finishing
    ? `<a class="button" href="#/start" data-finish="true">Finish course →</a>`
    : `<a class="button" ${shouldComplete ? `data-next="${page.module}"` : ""} href="#/${next.path}">Continue →</a>`;

  return `
    <div class="section-head">
      ${stepMeta(page)}
      <h1>${page.title}</h1>
      <p>${lesson.objective}</p>
    </div>
    ${body}
    ${isModuleFinal(page) ? renderRetrievalCheck(page.module) + lessonFaq(page.module) + tryPrompt(page.module) : ""}
    <div class="lesson-footer">${previousButton}${nextButton}</div>`;
}

function choiceBlock(id, choices) {
  const shuffled = choices.map((choice, index) => ({ choice, index }));
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return `
    <div class="choice-list" role="group" aria-label="${escAttr(id)}">
      ${shuffled.map(({ choice, index }) => `<button class="choice" data-choice="${index}" data-choice-set="${escAttr(id)}" type="button">${choice}</button>`).join("")}
    </div>
    <div class="feedback" data-feedback="${escAttr(id)}" aria-live="polite" hidden></div>`;
}

const decisionFeedback = {
  agent: [
    ["strong", "Strong. Tools let the system observe and act; the resulting evidence becomes input to the next decision."],
    ["reasonable", "Incomplete. A longer prompt can guide a model, but it does not create an observe–act loop."],
    ["reasonable", "Incomplete. Without tool use and new observations, the system is still only answering from existing context."]
  ],
  attention: [
    ["strong", "Strong. Being inside the context window makes information available, not equally influential. Attention is selective across many heads and layers."],
    ["reasonable", "Not quite. Context capacity is not an equal-weight guarantee; relevant information can still be under-used."],
    ["reasonable", "No. Context is working input. Persistent learned memory is stored separately and must become relevant context before it can influence a turn."]
  ],
  position: [
    ["strong", "Strong. In the classic lost-in-the-middle pattern, relevant information near the beginning or end is often used more reliably than information buried in the middle."],
    ["reasonable", "That would imply uniform positional use. Long-context studies repeatedly find that position can change performance even when the relevant information is identical."],
    ["reasonable", "Recency can be strong, especially at very long relative inputs, but the classic lost-in-the-middle result also shows a beginning-of-context advantage."]
  ],
  "context-budget": [
    ["strong", "Strong. Treat context as a finite resource: keep the smallest high-signal set that still contains the goal, evidence, constraints, and decisions needed for the task."],
    ["reasonable", "More context can help only when it adds useful signal. Large logs, stale branches, and repeated output can compete with the information that matters."],
    ["reasonable", "A larger context window raises capacity, but it does not guarantee perfect retrieval or reasoning over every token."]
  ],
  context: [
    ["strong", "Strong. Start with purpose, runtime, test command, and major folders. Then narrow toward the current goal."],
    ["reasonable", "Premature. Reading every file adds noise before you know which evidence matters."],
    ["risk", "High risk. Refactoring is an implementation action, not context building."]
  ],
  research: [
    ["strong", "Strong. Investigation establishes cause before implementation changes the evidence."],
    ["risk", "High risk. Editing before you know the cause can turn an assumption into code."],
    ["reasonable", "Useful evidence, but incomplete. A regression test states desired behavior; it does not explain why the current result is wrong."]
  ],
  execution: [
    ["strong", "Strong. A goal describes observable completion, including behavior, tests, and preserved constraints."],
    ["reasonable", "That is an implementation instruction. It belongs in the plan, not in the finish line."],
    ["reasonable", "That is a schedule for another check, not a completion condition."]
  ],
  safety: [
    ["strong", "Strong. A sandbox constrains filesystem and network reach. Permission rules decide whether an action is authorized; the sandbox limits where it can act."],
    ["reasonable", "Permissions are important, but they are an approval layer. They do not create the same OS-level filesystem and network isolation as the sandbox."],
    ["reasonable", "Hooks automate or enforce lifecycle actions. They are not the primary isolation boundary for Bash access."]
  ],
  "context-hygiene": [
    ["strong", "Strong. Use /compact when the session still matters but old logs and dead branches are crowding the working context. Give the summary a focus."],
    ["reasonable", "Starting fresh is better when the task changes or the previous context no longer helps."],
    ["reasonable", "Inspection diagnoses what is consuming the working context. It helps you decide what to do, but it does not itself reduce context."]
  ],
  recovery: [
    ["strong", "Strong. Branching preserves the original conversation while you try a different approach in a copied session."],
    ["reasonable", "Restoring changes the current state. Use it when you want to return to an earlier checkpoint, not when you want to keep both alternatives alive."],
    ["reasonable", "Git preserves source history, but it does not copy the reasoning context. Conversation branching preserves the reasoning path as well."]
  ],
  parallel: [
    ["strong", "Strong. Worktrees isolate file edits, so competing implementation approaches can proceed without colliding in one working tree."],
    ["risk", "High risk. Parallel writers in the same working tree can interfere with each other even if their conversations are separate."],
    ["reasonable", "A subagent is excellent for isolated research or review. For two competing implementations, file-system isolation is the more important boundary."]
  ],
  subagent: [
    ["strong", "Strong. Use a focused subagent when isolation reduces context noise and its findings can return as concise evidence."],
    ["reasonable", "More agents are not automatically better. Coordination and context boundaries have a cost."],
    ["reasonable", "Keeping every side investigation in the main context can bury the evidence that matters to the primary goal."]
  ],
  capstone: [
    ["strong", "Strong. The request introduces a new state but does not define when warning begins. Clarify that contract before editing."],
    ["risk", "High risk. Choosing a threshold yourself invents product behavior that was never specified."],
    ["reasonable", "Premature. Refactoring cannot resolve a missing product decision."]
  ],
  "capstone-plan": [
    ["strong", "Strong. The plan changes only status logic and regression coverage, while preserving the API response shape."],
    ["risk", "Too broad. Rewriting the API layer and dashboard is not required by the clarified behavior."],
    ["reasonable", "Incomplete. A threshold change without regression tests leaves the new contract weakly verified."]
  ],
  "verification-decision": [
    ["risk", "Do not accept yet. Green tests do not justify the unrelated styles.css change that falls outside the approved plan."],
    ["strong", "Strong. Challenge the implementation: the functional fix is correct, but the unrelated UI change violates the approved scope."],
    ["reasonable", "Re-running tests is useful, but it does not answer the scope problem already visible in the diff."]
  ]
};

function handleChoice(button) {
  const id = button.dataset.choiceSet;
  const index = Number(button.dataset.choice);
  const feedback = main.querySelector(`[data-feedback="${CSS.escape(id)}"]`);
  const [tone, message] = decisionFeedback[id]?.[index] || ["reasonable", "Review the available evidence and choose the action that preserves human judgment."];

  feedback.className = `feedback ${tone}`;
  feedback.textContent = message;
  feedback.hidden = false;
  button.parentElement.querySelectorAll(".choice").forEach(item => item.classList.remove("selected", "correct", "risky"));
  button.classList.add(tone === "strong" ? "correct" : tone === "risk" ? "risky" : "selected");

  if (tone === "strong") {
    state.answers = [...new Set([...state.answers, id])];
    save();
  }

  if (id === "research" && index === 0) {
    const terminal = main.querySelector(".terminal");
    if (terminal) terminal.innerHTML = `<span class="prompt">&gt; Investigate the fixed-coupon result before editing.</span>\n<span class="ok">✓ traced subtotal → tax → fixed coupon\n✓ observed tax base = ₹2,000 instead of ₹1,800\n✓ root cause candidate is now supported by code evidence</span>`;
  }
}

function repoBrowser(repoFiles, initial) {
  return `
    <div class="repo-browser">
      <div class="repo-files">
        <span class="repo-files-label">REPOSITORY</span>
        ${Object.keys(repoFiles).map(file => `<button class="code-file ${file === initial ? "active" : ""}" data-tab="${escAttr(file)}" type="button">${file}</button>`).join("")}
      </div>
      <div class="repo-view"><pre class="mono" data-file-viewer>${esc(repoFiles[initial])}</pre></div>
    </div>`;
}

function start() {
  const resume = state.lastPath && state.lastPath !== "start"
    ? `<div class="resume-card"><div><strong>${state.courseCompleted ? "Course completed" : "Continue where you left off"}</strong><p>${state.courseCompleted ? "You can revisit any module or run the capstone again." : `Resume ${state.mode === "quick" ? "the quick refresher" : "the full course"} without losing your progress.`}</p></div><a class="button secondary" href="#/${state.courseCompleted ? "reference" : state.lastPath}">${state.courseCompleted ? "Open reference" : "Resume →"}</a></div>`
    : "";

  return `
    <section class="hero">
      <div class="hero-top">
        <div>
          <span class="kicker">Tool-independent agentic coding</span>
          <h1>Control the coding <em>agent</em>.</h1>
          <p class="lead">Learn one durable engineering workflow, then translate it into Claude Code or Codex without making slash commands the lesson.</p>
        </div>
        <aside class="hero-aside" aria-label="Course outcomes">
          <strong>By the end, you can</strong>
          <ul><li>orient a repository before editing</li><li>separate evidence from assumptions</li><li>approve a bounded plan and finish line</li><li>control permissions and isolation</li><li>manage long sessions and handoffs</li><li>verify before accepting a change</li></ul>
        </aside>
      </div>
      ${resume}
      <div class="callout subtle"><strong>Prerequisites</strong>No prior LLM, Claude Code, or Codex experience is required. Basic familiarity with source files and automated tests is recommended.</div>
      <section class="platform-picker-panel" aria-labelledby="platform-picker-title">
        <div><span class="tag">CHOOSE YOUR GUIDE</span><h2 id="platform-picker-title">Which coding agent are you using?</h2><p>The shared lesson and progress stay the same. You can switch at any time.</p></div>
        <div class="platform-picker-grid">
          ${Object.values(platforms).map(item => `<button class="platform-choice ${state.platform === item.id ? "active" : ""}" type="button" data-platform="${item.id}" aria-pressed="${state.platform === item.id}"><strong>${item.label}</strong><span>${item.description}</span></button>`).join("")}
        </div>
      </section>
      <div class="callout subtle"><strong>Your learning contract</strong>The agent executes. You own the requirement, evidence, approval, and acceptance decision. Exercises remain deterministic and API-key free.</div>
      <div class="mode-grid">
        <article class="card mode-card primary"><span class="tag">RECOMMENDED</span><h3>Full course</h3><p>All concepts, constructed exercises, retrieval checks, and the capstone · about 95–120 min</p><a class="button" data-mode="full" href="#/start/readiness">Begin full course →</a></article>
        <article class="card mode-card"><span class="tag">FAST</span><h3>Quick refresher</h3><p>A curated decision path through the same material · about 40–50 min</p><a class="button secondary" data-mode="quick" href="#/agent">Start refresher →</a></article>
        <article class="card mode-card"><span class="tag">LOOK UP</span><h3>Reference</h3><p>Jump directly to a concept when you need it during real work.</p><a class="button secondary" href="#/reference">Browse reference →</a></article>
      </div>
      <div class="workflow-panel">
        <h2>The engineering loop you will practice</h2>
        <div class="workflow" aria-label="Build context, gather evidence, plan, human review, execute, verify, human acceptance">
          <div class="workflow-step">Build context</div><div class="workflow-step">Gather evidence</div><div class="workflow-step">Plan</div><div class="workflow-step human">Review<span class="human-mark">human gate</span></div><div class="workflow-step">Execute</div><div class="workflow-step">Verify</div><div class="workflow-step human">Accept<span class="human-mark">human gate</span></div>
        </div>
      </div>
    </section>`;
}

function agent() {
  return `<div class="panel">
    <div class="agent-compare">
      <div>
        <span class="tag">CHAT</span><h2>Answers from existing context</h2>
        <p class="small">A chat model can explain or propose. It does not become an engineering agent merely because the prompt is longer.</p>
        <div class="chat-path"><span>Question</span><b>→</b><span>Model</span><b>→</b><span>Answer</span></div>
        <div class="callout subtle"><strong>Key idea</strong>Tools do not make an LLM infallible. They make work observable and give the next decision new evidence.</div>
      </div>
      <div>
        <span class="tag green">AGENT</span><h2>Observe → act → observe again</h2>
        <p class="small">Read this as a cycle. Each tool result changes what the agent can reasonably do next.</p>
        <div class="agent-loop" role="img" aria-label="Context informs the agent's decision. The agent uses a tool. The tool returns evidence. The evidence becomes context for the next decision.">
          <div class="loop-step"><span class="step-number">1</span><div><strong>Context</strong><small>What the agent can see</small></div></div>
          <div class="loop-step"><span class="step-number">2</span><div><strong>Decide</strong><small>Choose the next useful action</small></div></div>
          <div class="loop-step"><span class="step-number">3</span><div><strong>Tool acts</strong><small>Read, search, test, edit</small></div></div>
          <div class="loop-step evidence-step"><span class="step-number">4</span><div><strong>Evidence</strong><small>Results become context</small></div></div>
          <div class="loop-return">↺ Evidence returns to context for the next decision</div>
        </div>
      </div>
    </div>
    <h3 style="margin-top:24px">What makes the second system an agent?</h3>
    ${choiceBlock("agent", ["Model + tools + iterative observations", "A longer prompt with more instructions", "A confident answer without tool use"])}
  </div>`;
}


function researchLinks(labels) {
  const wanted = labels ? new Set(labels) : null;
  const items = researchSources.filter(source => !wanted || wanted.has(source.label));
  return `<div class="research-links" aria-label="Research sources">${items.map(source => `<a href="${source.url}" target="_blank" rel="noreferrer"><strong>${source.label}</strong><span>${source.note}</span><b aria-hidden="true">↗</b></a>`).join("")}</div>`;
}

function agentAttention() {
  return `<div class="panel">
    <div class="attention-intro">
      <div>
        <span class="tag">MENTAL MODEL</span>
        <h2>Context is available. Attention decides what gets mixed into the current computation.</h2>
        <p>Modern transformers process tokens through many layers and attention heads. A useful simplified view is: queries match keys, those matches produce weights, and the weights determine how value information is mixed.</p>
      </div>
      <div class="attention-pipeline" role="img" aria-label="Context tokens provide keys and values. A query compares with keys, produces attention weights, and combines relevant value information.">
        <div class="attention-box source"><span>CONTEXT TOKENS</span><strong>Keys + values</strong><small>available information</small></div>
        <div class="attention-arrow">→</div>
        <div class="attention-box query"><span>CURRENT COMPUTATION</span><strong>Query</strong><small>what information matters now?</small></div>
        <div class="attention-arrow">→</div>
        <div class="attention-box weights"><span>MATCH</span><strong>Attention weights</strong><small>not equal across tokens</small></div>
        <div class="attention-arrow">→</div>
        <div class="attention-box result"><span>MIX</span><strong>Useful information</strong><small>feeds the next representation</small></div>
      </div>
    </div>
    <div class="concept-three">
      <div class="concept-card"><span>CAPACITY</span><h3>Context window</h3><p>What information can be referenced during this turn.</p></div>
      <div class="concept-card"><span>MECHANISM</span><h3>Attention</h3><p>How information is selectively combined inside the model.</p></div>
      <div class="concept-card"><span>PERSISTENCE</span><h3>Memory / files</h3><p>Information stored outside the current turn and loaded or retrieved when needed.</p></div>
    </div>
    <h3>A requirement appears somewhere in a very long context. What can you safely conclude?</h3>
    ${choiceBlock("attention", ["The model can potentially access it, but may not use it equally or reliably", "Every token in the context receives equal influence", "The requirement has automatically become persistent memory"])}
    <details class="deep-dive"><summary>Go deeper · Query, Key, Value</summary><div><p>A compact mathematical form is <code>softmax(QKᵀ / √d) V</code>. Real models use many attention heads and layers, so this is a teaching abstraction—not a claim that one visible score controls the whole model.</p></div></details>
    <div class="callout"><strong>Core distinction</strong>Context available ≠ context used equally.</div>
  </div>`;
}

function agentPosition() {
  return `<div class="panel">
    <h2>Where information appears can change how reliably it is used</h2>
    <p>Long-context research shows positional bias: identical relevant information can produce different task performance depending on where it appears. Treat the curves below as observed patterns, not universal laws for every model and task.</p>
    <div class="curve-grid">
      <figure class="curve-card">
        <figcaption><span class="tag">CLASSIC PATTERN</span><h3>U-shaped · “lost in the middle”</h3></figcaption>
        <svg viewBox="0 0 520 250" role="img" aria-label="U-shaped performance curve: high at the beginning, lower in the middle, high again at the end.">
          <line x1="56" y1="28" x2="56" y2="205" class="axis"/><line x1="56" y1="205" x2="492" y2="205" class="axis"/>
          <path d="M72 63 C145 83 170 174 270 179 C371 181 404 87 476 57" class="curve u-curve"/>
          <circle cx="72" cy="63" r="6" class="point"/><circle cx="270" cy="179" r="6" class="point muted-point"/><circle cx="476" cy="57" r="6" class="point"/>
          <text x="68" y="229">BEGINNING</text><text x="242" y="229">MIDDLE</text><text x="448" y="229">END</text>
          <text x="14" y="185" transform="rotate(-90 14 185)">RELIABLE USE</text>
        </svg>
        <div class="curve-labels"><span><b>Primacy</b> beginning advantage</span><span><b>Lost middle</b> weaker use</span><span><b>Recency</b> end advantage</span></div>
      </figure>
      <figure class="curve-card">
        <figcaption><span class="tag amber">VERY LONG RELATIVE INPUTS</span><h3>J-like · recency-dominant regime</h3></figcaption>
        <svg viewBox="0 0 520 250" role="img" aria-label="J-like performance curve: relatively weak at the beginning and middle, then rising strongly near the end.">
          <line x1="56" y1="28" x2="56" y2="205" class="axis"/><line x1="56" y1="205" x2="492" y2="205" class="axis"/>
          <path d="M72 165 C170 177 290 182 354 157 C410 135 438 88 476 48" class="curve j-curve"/>
          <circle cx="72" cy="165" r="6" class="point muted-point"/><circle cx="270" cy="178" r="6" class="point muted-point"/><circle cx="476" cy="48" r="6" class="point"/>
          <text x="68" y="229">BEGINNING</text><text x="242" y="229">MIDDLE</text><text x="448" y="229">END</text>
          <text x="14" y="185" transform="rotate(-90 14 185)">RELIABLE USE</text>
        </svg>
        <p class="small">Some recent studies report that as input occupies more of a model's context window, primacy can weaken while recency stays comparatively strong. The result is an end-dominant shape—not a universal “J-curve law.”</p>
      </figure>
    </div>
    <div class="callout subtle"><strong>Y-axis: reliable use, not raw attention</strong>Higher on the vertical axis means the model is more likely to retrieve and apply the relevant fact correctly; lower means the fact is more likely to be missed or under-used. This is a task-performance proxy, not a direct readout of one attention weight. The horizontal axis is the fact's location within the total input.</div>
    <h3>What the three regions suggest</h3>
    <div class="grid-3">
      <div class="card"><span class="tag">BEGINNING</span><h3>Set the contract</h3><p>Put the goal, constraints, output shape, and critical invariants near the start so the task has a stable frame.</p></div>
      <div class="card"><span class="tag amber">MIDDLE</span><h3>Reduce the fog</h3><p>Long logs, repeated instructions, and unrelated tool output are more likely to bury a useful fact here. Summarize and label evidence.</p></div>
      <div class="card"><span class="tag green">END</span><h3>Restate the state</h3><p>End with the current finding, unresolved risk, and next action. This gives the next decision a compact, recent summary.</p></div>
    </div>
    <details class="deep-dive"><summary>Concrete example · the same fact in three positions</summary><div>
      <p>Suppose a repository has one invariant: <strong>percentage discounts are calculated before tax</strong>. Its placement can change how easily the agent uses it:</p>
      <pre class="mono">BEGINNING  Goal + invariant + task
MIDDLE     80 lines of logs, three failed hypotheses, tool output...
END        “Current decision: preserve percentage-discount ordering.”</pre>
      <p>This is not a command to repeat everything at the end. It is a reason to keep the working context short, put durable constraints where they are easy to find, and refresh the current state after major evidence arrives.</p>
    </div></details>
    <h3>Practical response: design for retrieval, then verify placement</h3>
    <ul class="checklist">
      <li><strong>Front-load the contract.</strong> State the goal, scope, constraints, and acceptance conditions before large evidence blocks.</li>
      <li><strong>Compress the middle.</strong> Replace stale transcripts and dead hypotheses with labeled summaries instead of carrying every intermediate step forward.</li>
      <li><strong>Close with a handoff.</strong> Restate what is known, what changed, what remains uncertain, and what should happen next.</li>
      <li><strong>Test the arrangement.</strong> If a requirement is important, vary its position or ask for the source evidence during verification; do not assume that presence means reliable use.</li>
    </ul>
    <h3>In the classic lost-in-the-middle result, where is relevant information often used most reliably?</h3>
    ${choiceBlock("position", ["Near the beginning or the end", "All positions equally", "Only at the very end"])}
    <div class="callout warning"><strong>Do not turn this into prompt superstition.</strong>The engineering lesson is not “repeat everything at the end.” It is: keep critical context concise, explicit, current, and easy to retrieve.</div>
    ${researchLinks(["Lost in the Middle", "Found in the Middle", "Positional Biases Shift as Inputs Approach Context Window Length"])}
  </div>`;
}

function agentBudget() {
  return `<div class="panel">
    <h2>Context has capacity, but useful attention is still scarce</h2>
    <p>Anthropic uses an <strong>attention budget</strong> as a practical mental model: as context grows, useful signal competes with logs, stale branches, repeated output, and old assumptions. This broader degradation is often called <strong>context rot</strong>.</p>
    <div class="signal-compare">
      <div class="signal-card good-signal"><span class="tag green">HIGH SIGNAL</span><h3>Curated working context</h3><div class="context-stack"><span class="goal-segment">Goal</span><span class="evidence-segment">Evidence</span><span class="constraint-segment">Constraints</span><span class="decision-segment">Decisions</span></div><p>Small enough that the important state remains easy to find and connect.</p></div>
      <div class="signal-card noisy-signal"><span class="tag amber">NOISY</span><h3>Accumulated session</h3><div class="context-stack"><span class="goal-segment">Goal</span><span class="noise-segment">Logs</span><span class="noise-segment wide">Old approach</span><span class="evidence-segment">Evidence</span><span class="noise-segment">Tool output</span><span class="noise-segment wide">Dead branch</span><span class="constraint-segment">Constraint</span></div><p>The information is still present, but signal density and long-range use can degrade.</p></div>
    </div>
    <div class="retrieval-flow" role="img" aria-label="Information must first be present, then retrieved, connected, reasoned over, and finally influence an action.">
      <div><span>1</span><strong>Present?</strong><small>Is the evidence in context?</small></div><b>→</b>
      <div><span>2</span><strong>Retrieved?</strong><small>Can the model find it?</small></div><b>→</b>
      <div><span>3</span><strong>Connected?</strong><small>Linked to the goal?</small></div><b>→</b>
      <div><span>4</span><strong>Reasoned?</strong><small>Used correctly?</small></div><b>→</b>
      <div><span>5</span><strong>Acts?</strong><small>Changes the decision?</small></div>
    </div>
    <h3>What principle follows from these limitations?</h3>
    ${choiceBlock("context-budget", ["Keep the smallest high-signal context that is sufficient for the task", "Load everything because more context always improves reasoning", "A larger context window removes the need for context engineering"])}
    <div class="failure-grid">
      <div><strong>Lost in the middle</strong><span>Relevant evidence is under-used because of position.</span></div>
      <div><strong>Recency dominance</strong><span>Recent context can overpower older information.</span></div>
      <div><strong>Context pollution</strong><span>Logs and side investigations crowd useful state.</span></div>
      <div><strong>Stale context</strong><span>Old assumptions survive after reality changes.</span></div>
      <div><strong>Instruction / goal drift</strong><span>Earlier constraints lose practical influence during long work.</span></div>
      <div><strong>Context conflict</strong><span>Old and new instructions disagree.</span></div>
    </div>
    <div class="response-map">
      <span>When this happens…</span><strong>Build context deliberately → inspect pressure → compact useful history → start unrelated work fresh → isolate noisy research → hand off essential state.</strong>
    </div>
    ${platformNote("continuity")}
    <div class="callout"><strong>This is why the next module exists.</strong>The Context Ladder is not ceremony. It is a strategy for spending context on relevant evidence instead of volume.</div>
    ${researchLinks(["Effective context engineering for AI agents", "Claude Code context window"])}
  </div>`;
}

function contextOrient() {
  return `<div class="two-col">
    <div class="panel"><h2>Repository explorer</h2><p class="small">Orient before narrowing. Inspect only what helps you build the first map.</p>${repoBrowser(files, "README.md")}</div>
    <div class="panel"><span class="tag">DECIDE</span><h2>What should the agent do first?</h2><p class="small">A strong first move creates orientation without flooding the context.</p>${choiceBlock("context", ["Inspect the README, runtime, test command, and major folders", "Read every file before naming a goal", "Refactor the repository structure first"])}
    <div class="callout subtle"><strong>Orientation is not diagnosis.</strong>At this point you are learning the terrain, not guessing the bug.</div>${platformNote("orient")}</div>
  </div>`;
}

function contextLadder() {
  const first = ladderSteps[0];
  return `<div class="panel"><h2>Build context in a ladder</h2><p>Each step narrows attention while preserving the evidence needed for a sound engineering decision. Select a step to see what it contributes.</p>
    <div class="ladder-layout">
      <div class="ladder-list">
        ${ladderSteps.map((step, index) => `<button class="ladder-step ${index === 0 ? "active" : ""}" data-ladder="${step.id}" type="button"><span class="ladder-index">${String(index + 1).padStart(2,"0")}</span><span><strong>${step.label}</strong><small>${step.short}</small></span></button>`).join("")}
      </div>
      <div class="ladder-detail" data-ladder-detail><span class="step-title">${first.label}</span><h3>${first.short}</h3><p>${first.detail}</p><div class="prompt-box">${esc(first.prompt)}</div></div>
    </div>
    <div class="callout"><strong>More context ≠ better context</strong>Better context = relevant evidence + current goal + constraints + decisions.</div>
  </div>`;
}

function contextSummary() {
  return `<div class="panel"><h2>Compress the evidence into a working model</h2><p>Before asking for a change, you should be able to summarize the repository without carrying every file and transcript forward.</p>
    <pre class="mono">GOAL
Investigate the fixed-coupon total.

RELEVANT FILES
src/calculator.js · tests/calculator.test.js

BEHAVIOR FLOW
Input → validation → subtotal → discount/tax → total

PRESERVE
Percentage discounts · validation · public API

OPEN QUESTION
Why does the fixed-coupon case use the wrong taxable amount?</pre>
    <div class="grid-3" style="margin-top:14px"><div class="card"><span class="tag">LOCATE</span><h3>Where?</h3><p>Know which files own the behavior.</p></div><div class="card"><span class="tag">TRACE</span><h3>How?</h3><p>Know how the input reaches the result.</p></div><div class="card"><span class="tag">CONSTRAIN</span><h3>Preserve?</h3><p>Know what the change must not break.</p></div></div>
  </div>`;
}

function researchProblem() {
  return `<div class="panel"><span class="tag">OBSERVE</span><h2>The calculator disagrees with the business rule</h2>
    <div class="arithmetic-wrap">
      <div class="ledger">Subtotal       ₹2,000
Coupon         − ₹200
               ───────
Taxable amount ₹1,800
Tax @ 18%      + ₹324
               ───────
Expected       ₹2,124</div>
      <div class="observed-card"><strong>Application today</strong><div class="observed-value">₹2,160 ✕</div><span class="small">Baseline tests pass.</span><span class="discrepancy">Δ ₹36 · unexplained</span></div>
    </div>
    <div class="callout subtle"><strong>Evidence, not diagnosis</strong>The arithmetic proves a discrepancy. It does not yet prove which line of code is responsible.</div>
  </div>`;
}

function researchInvestigation() {
  return `<div class="panel"><span class="tag">DECIDE</span><h2>Choose the next investigation</h2><p>Editing now would change the evidence. Choose an action that can explain the discrepancy first.</p>
    ${choiceBlock("research", ["Investigate the fixed-coupon calculation before editing", "Fix calculator.js immediately", "Add a ₹2,124 expected-value test and stop there"])}
    <div class="terminal" style="margin-top:16px"><span class="prompt">&gt; Waiting for your investigation decision.</span>\n<span>Evidence has not changed yet.</span></div>
  </div>`;
}

function researchEvidence() {
  return `<div class="panel"><h2>Separate evidence from inference</h2><p>After tracing the calculation, the evidence board becomes precise enough to plan from.</p>
    <div class="evidence">
      <div class="evidence-column"><h4>KNOWN</h4><ul><li>Expected total = ₹2,124</li><li>Current total = ₹2,160</li><li>Tax is calculated from ₹2,000</li></ul></div>
      <div class="evidence-column inferred"><h4>INFERRED</h4><ul><li>Fixed coupon ordering causes the ₹36 difference</li></ul></div>
      <div class="evidence-column assumed"><h4>ASSUMED</h4><ul><li>The coupon should reduce the taxable subtotal</li></ul></div>
      <div class="evidence-column unverified"><h4>UNVERIFIED</h4><ul><li>Percentage discounts remain unchanged</li><li>Validation remains unchanged</li></ul></div>
    </div>
    <div class="causal-compare" aria-label="Current and expected calculation order">
      <div class="causal-lane bad"><h4>CURRENT PATH</h4><div class="causal-flow"><span>₹2,000 subtotal</span><b>→</b><span>tax ₹360</span><b>→</b><span>− ₹200</span><b>→</b><span>₹2,160</span></div></div>
      <div class="causal-lane good"><h4>EXPECTED PATH</h4><div class="causal-flow"><span>₹2,000 subtotal</span><b>→</b><span>− ₹200</span><b>→</b><span>tax ₹324</span><b>→</b><span>₹2,124</span></div></div>
    </div>
    <div class="callout success"><strong>Investigation output</strong>You now have a causal explanation plus two preservation questions. That is enough to create a bounded plan.</div>
  </div>`;
}

function planCritique() {
  return `<div class="panel"><span class="tag">REVIEW</span><h2>Critique the proposed plan before it becomes work</h2><p>Select only the items that are <strong>unnecessary or too broad</strong> for this defect.</p>
    <ul class="checklist">
      <li><label><input type="checkbox" data-plan-item="0"> Change fixed-coupon ordering so the coupon reduces the taxable amount</label></li>
      <li><label><input type="checkbox" data-plan-item="1"> Add regression coverage for the ₹2,124 case</label></li>
      <li><label><input type="checkbox" data-plan-item="2"> Rewrite every discount type behind a new abstraction</label></li>
      <li><label><input type="checkbox" data-plan-item="3"> Preserve percentage discounts and validation behavior</label></li>
      <li><label><input type="checkbox" data-plan-item="4"> Rename unrelated public APIs for consistency</label></li>
    </ul>
    <p class="review-hint">Review for scope, not for whether each sentence sounds technically reasonable in isolation.</p>
    <button class="button" id="review-plan" type="button">Review selected scope</button>
    <div class="feedback" id="plan-feedback" aria-live="polite" hidden></div>
  </div>`;
}

function planApprove() {
  return `<div class="panel"><h2>The approved plan is a route, not a wish list</h2>
    <div class="control-diagram" role="img" aria-label="Change fixed-coupon ordering, prove it with a regression test, and preserve percentage discounts and validation behavior.">
      <div class="control-track"><div class="control-node"><span>CHANGE</span><strong>Ordering</strong><small>Coupon reduces taxable amount</small></div><div class="control-arrow">→</div><div class="control-node"><span>PROVE</span><strong>Regression test</strong><small>₹2,124 case</small></div><div class="control-arrow">→</div><div class="control-node goal-node"><span>PRESERVE</span><strong>Neighbors</strong><small>Percent discounts + validation</small></div></div>
    </div>
    <div class="grid"><div class="card"><span class="tag">SCOPE</span><h3>Files likely affected</h3><p><code>src/calculator.js</code> and <code>tests/calculator.test.js</code>. No unrelated UI or API cleanup.</p></div><div class="card"><span class="tag">RISK</span><h3>What could regress?</h3><p>Percentage discounts and validation. Those become explicit verification targets.</p></div></div>
    <div class="callout"><strong>Human approval gate</strong>The agent may propose this route. The engineer approves, changes, or rejects it before execution.</div>
  </div>`;
}

function executionControls() {
  return `<div class="panel"><h2>Three controls answer three different questions</h2><p>Keeping these separate prevents the execution instruction from swallowing the plan or the finish line.</p>
    <div class="control-three">
      <div class="control-card"><span class="tag">PLAN</span><div class="control-q">How?</div><p>Approved files, behavior change, boundaries, tests, and risks.</p></div>
      <div class="control-card goal"><span class="tag green">GOAL</span><div class="control-q">When done?</div><p>Observable conditions that tell the agent when the work can stop.</p></div>
      <div class="control-card loop"><span class="tag amber">SCHEDULE</span><div class="control-q">When again?</div><p>A time or event that starts another check.</p></div>
    </div>
    <div class="callout subtle"><strong>Not interchangeable</strong>A plan can be approved while the goal is unmet. A goal can be met while the change is still awaiting human acceptance.</div>
    ${platformNote("plan")}${platformNote("goal")}${platformNote("schedule")}
  </div>`;
}

function executionGoal() {
  return `<div class="panel"><h2>Write a finish line, not another implementation prompt</h2>
    <div class="control-diagram" role="img" aria-label="The approved plan defines how. Execution produces evidence. The completion condition checks whether the finish line is met.">
      <div class="control-track"><div class="control-node"><span>PLAN</span><strong>Approved route</strong><small>How?</small></div><div class="control-arrow">→</div><div class="control-node"><span>WORK</span><strong>Execute + observe</strong><small>Evidence</small></div><div class="control-arrow">→</div><div class="control-node goal-node"><span>GOAL</span><strong>Finish line</strong><small>When done?</small></div></div>
      <div class="goal-branch"><strong>Goal met?</strong><span class="branch-no">NO ↺ Continue within plan</span><span class="branch-yes">YES → Stop for human verification</span></div>
    </div>
    <h3>Which option is a completion condition?</h3>
    ${choiceBlock("execution", ["The approved plan is implemented, the fixed-coupon case returns ₹2,124, existing tests pass, and validation behavior is unchanged.", "Open calculator.js and move the discount calculation before tax.", "Check CI every five minutes until it finishes."])}
    ${platformNote("goal")}
  </div>`;
}

function executionLoop() {
  return `<div class="panel"><h2>Use recurrence for time-driven work</h2><p>A recurring check schedules another observation. It does not define what correctness means.</p>
    <div class="control-diagram" role="img" aria-label="Check CI, decide whether it is finished, wait five minutes if not, and report when it is finished.">
      <div class="control-track"><div class="control-node"><span>1</span><strong>Check CI</strong><small>Observe status</small></div><div class="control-arrow">→</div><div class="control-node"><span>2</span><strong>Finished?</strong><small>Decision point</small></div></div>
      <div class="goal-branch"><span class="branch-no">NO → Wait 5 minutes ↺</span><span class="branch-yes">YES → Report status</span></div>
    </div>
    <div class="callout warning"><strong>Do not force recurrence into the calculator task.</strong>The calculator can be verified directly after the change. Recurrence is useful here only because CI is external and may finish later.</div>
    ${platformNote("schedule")}
  </div>`;
}

function verificationGoal() {
  return `<div class="panel"><h2>Stopping and accepting are different decisions</h2>
    <div class="control-diagram"><div class="control-track"><div class="control-node goal-node"><span>AUTOMATED</span><strong>Goal met</strong><small>Completion evidence exists</small></div><div class="control-arrow">→</div><div class="control-node"><span>HUMAN</span><strong>Verify</strong><small>Diff · tests · scope · risk</small></div><div class="control-arrow">→</div><div class="control-node"><span>HUMAN</span><strong>Accept / reject</strong><small>Engineering judgment</small></div></div></div>
    <div class="callout"><strong>GOAL MET ≠ CHANGE ACCEPTED</strong>The agent can stop because its finish line holds. The engineer still decides whether the result belongs in the codebase.</div>
    ${platformNote("verify")}
  </div>`;
}

const evidenceViews = {
  diff: `<div class="diff-file">src/calculator.js</div><div class="diff"><span class="remove">- const tax = subtotal * (taxRate / 100);</span>\n<span class="add">+ const taxable = subtotal - discount;</span>\n<span class="add">+ const tax = taxable * (taxRate / 100);</span>\n<span class="add">+ return { subtotal, discount, tax, total: taxable + tax };</span>\n\n<span class="diff-file">styles.css</span>\n<span class="remove">- .button { border-radius: 8px; }</span>\n<span class="add">+ .button { border-radius: 14px; }</span></div>`,
  tests: `<pre class="mono">✓ percentage discount still passes\n✓ negative prices are still rejected\n✓ fixed coupons still clamp at zero\n✓ NEW: ₹2,000 − ₹200 coupon + 18% tax = ₹2,124\n\n4 tests passed</pre>`,
  plan: `<pre class="mono">APPROVED PLAN\n\nCHANGE\n- fixed-coupon tax ordering\n\nTEST\n- add ₹2,124 regression\n\nPRESERVE\n- percentage discount behavior\n- validation behavior\n- unrelated UI and public APIs</pre>`
};

function verificationReview() {
  return `<div class="panel"><h2>Inspect evidence sources together</h2><p>Tests answer only one question. Compare the diff with both the approved plan and the verification evidence.</p>
    <div class="evidence-tabs">
      <div class="tab-list" role="tablist" aria-label="Verification evidence">
        <button class="evidence-tab active" role="tab" aria-selected="true" data-evidence-tab="diff" type="button">Diff</button>
        <button class="evidence-tab" role="tab" aria-selected="false" data-evidence-tab="tests" type="button">Tests</button>
        <button class="evidence-tab" role="tab" aria-selected="false" data-evidence-tab="plan" type="button">Approved plan</button>
      </div>
      <div class="evidence-view" data-evidence-view>${evidenceViews.diff}</div>
    </div>
    <div class="callout subtle"><strong>Question to carry forward</strong>Do all changed files belong to the approved route?</div>
  </div>`;
}

function verificationScope() {
  return `<div class="panel"><span class="tag">DECIDE</span><h2>What is your acceptance decision?</h2><p>The functional test suite is green. Your evidence review also showed one change outside the approved plan.</p>
    ${choiceBlock("verification-decision", ["Accept because all tests pass", "Challenge the implementation and remove or separately justify the unrelated UI change", "Run the same tests again and accept if they stay green"])}
    <div class="callout success"><strong>The verification habit</strong>Review <em>diff + tests + goal + scope + risk</em>. No single signal substitutes for the others.</div>
  </div>`;
}

function controlsMap() {
  return `<div class="panel"><h2>Extend the agent at the layer that matches the job</h2><p>Start with the engineering responsibility. Product names and file formats come second.</p>
    <div class="extension-map" role="img" aria-label="Project guidance, reusable procedures, external capabilities, focused workers, lifecycle automation, authorization, isolation, and packaging solve different responsibilities.">
      <div class="extension-band"><span class="band-label">GUIDANCE</span><div class="extension-items"><div class="feature-tile"><strong>Project guidance</strong><small>Stable repository conventions</small></div><div class="feature-tile"><strong>Path-scoped guidance</strong><small>Instructions that apply only near matching code</small></div></div></div>
      <div class="extension-band"><span class="band-label">ON DEMAND</span><div class="extension-items"><div class="feature-tile"><strong>Skill</strong><small>Reusable knowledge + procedure</small></div><div class="feature-tile"><strong>MCP</strong><small>Trusted external data + actions</small></div><div class="feature-tile"><strong>Subagent</strong><small>Bounded work in isolated context</small></div></div></div>
      <div class="extension-band"><span class="band-label">CONTROL</span><div class="extension-items"><div class="feature-tile"><strong>Hook</strong><small>Deterministic lifecycle action</small></div><div class="feature-tile"><strong>Approval policy</strong><small>Authorization boundary</small></div><div class="feature-tile"><strong>Sandbox / worktree</strong><small>Reach and edit isolation</small></div><div class="feature-tile package"><strong>Plugin</strong><small>Package reusable capabilities</small></div></div></div>
    </div>
    <div class="callout subtle"><strong>Start small.</strong>Use concise project guidance for stable conventions. Add another mechanism only when its responsibility appears repeatedly.</div>
    ${platformNote("guidance")}${platformNote("permissions")}
  </div>`;
}

function extensionClassifierRow(text, id) {
  return `<div class="classifier-row"><p>${text}</p><select data-extension-id="${id}" aria-label="Choose mechanism: ${escAttr(text)}"><option value="">Choose…</option><option value="guidance">Project guidance</option><option value="scope">Path-scoped guidance</option><option value="skill">Skill</option><option value="mcp">MCP</option><option value="subagent">Subagent</option><option value="hook">Hook</option><option value="sandbox">Sandbox / worktree</option><option value="plugin">Plugin</option></select></div>`;
}

function controlsChoose() {
  return `<div class="panel"><span class="tag">PRACTICE</span><h2>Choose by responsibility, not by feature name</h2><p>Each mechanism has a different loading model or control boundary.</p>
    <div class="classifier">
      ${extensionClassifierRow("Always use pnpm and run the repository test command before reporting completion.", "e1")}
      ${extensionClassifierRow("Apply API-specific guidance only when the agent works under src/api/**.", "e2")}
      ${extensionClassifierRow("Create a reusable release checklist that can be invoked as /release.", "e3")}
      ${extensionClassifierRow("Let the agent query Jira, a database, or a browser through an external integration.", "e4")}
      ${extensionClassifierRow("Investigate a security concern in isolated context and return concise findings.", "e6")}
      ${extensionClassifierRow("Run eslint automatically after every matching file edit.", "e7")}
      ${extensionClassifierRow("Distribute a team setup containing skills, hooks, agents, and MCP servers.", "e8")}
      ${extensionClassifierRow("Run a competing implementation without letting its edits collide with the current work.", "e9")}
    </div>
    <button class="button" id="check-extensions" type="button" style="margin-top:14px">Check mechanisms</button>
    <div class="feedback" id="extensions-feedback" aria-live="polite" hidden></div>
    <div class="callout subtle"><strong>Two distinctions worth remembering</strong>A skill is reusable task knowledge or procedure; a subagent is a separate worker with isolated context. Project guidance shapes repository work; approval policy and sandboxing control action.</div>
  </div>`;
}

function controlsSafety() {
  return `<div class="panel"><h2>Safety is layered; no single mechanism replaces the others</h2><p>Capability, authorization, isolation, and trust answer different questions.</p>
    <div class="safety-stack" role="img" aria-label="Project trust controls whether repository configuration is trusted. Tools provide capability. Permissions authorize actions. Sandbox limits filesystem and network reach. Hooks can enforce lifecycle checks.">
      <div class="safety-row trust"><span>PROJECT TRUST</span><strong>May repository-supplied configuration load?</strong></div>
      <div class="safety-arrow">↓</div>
      <div class="safety-row"><span>TOOLS</span><strong>What can the agent attempt?</strong></div>
      <div class="safety-arrow">↓</div>
      <div class="safety-row"><span>PERMISSIONS</span><strong>Is this action authorized?</strong></div>
      <div class="safety-arrow">↓</div>
      <div class="safety-row sandbox"><span>SANDBOX</span><strong>Where can Bash reach?</strong></div>
      <div class="safety-arrow">↓</div>
      <div class="safety-row hook"><span>HOOKS</span><strong>What checks or actions must fire at lifecycle events?</strong></div>
    </div>
    <h3>Which mechanism primarily constrains Bash filesystem and network reach?</h3>
    ${choiceBlock("safety", ["Sandbox", "Permission rule", "Hook"])}
    <div class="callout subtle"><strong>Permission mode vs permission rule</strong>The mode sets the session's baseline approval behavior; rules add fine-grained allow / ask / deny patterns. Neither is the same as sandbox isolation.</div>
    <div class="callout warning"><strong>Treat tool output as untrusted input.</strong>Files, web pages, and external tools can contain prompt-injection attempts. Trust, permissions, sandboxing, and human review work together.</div>
    ${platformNote("permissions")}${platformNote("rules", { includeGeneric: true })}
  </div>`;
}

function contextSources() {
  return `<div class="panel"><h2>Separate durable guidance, learned memory, and working context</h2><p>These all influence an agent, but they differ in who writes them, when they load, and how long they should live.</p>
    <div class="memory-compare">
      <div class="memory-card"><span class="tag">HUMAN-WRITTEN</span><h3>Project guidance</h3><p>Stable, versioned conventions and checks that should guide repository work.</p></div>
      <div class="memory-card"><span class="tag">PATH-SCOPED</span><h3>Focused guidance</h3><p>Instructions that apply only near matching files, keeping broader context lean.</p></div>
      <div class="memory-card"><span class="tag green">LEARNED</span><h3>Persistent learned context</h3><p>Useful discoveries retained across sessions. Helpful context, but not an enforcement boundary.</p></div>
    </div>
    <div class="context-map" role="img" aria-label="Persistent guidance, auto memory, conversation, loaded skills, tool evidence, and the current goal contribute to working context.">
      <div class="context-sources">
        <div class="context-source"><strong>Persistent guidance</strong><small>Human-written project expectations</small></div>
        <div class="context-source"><strong>Learned context</strong><small>Retained repository knowledge</small></div>
        <div class="context-source"><strong>Conversation</strong><small>Current decisions and requests</small></div>
        <div class="context-source"><strong>Loaded skills</strong><small>Task-specific instructions when relevant</small></div>
        <div class="context-source"><strong>Tool evidence</strong><small>Files, tests, command results</small></div>
        <div class="context-source"><strong>Current goal</strong><small>What makes evidence relevant</small></div>
      </div><div class="context-arrow" aria-hidden="true">→</div><div class="context-target"><strong>Working context</strong><span class="small">What the agent can use for the next decision</span></div>
    </div>
    <div class="callout subtle"><strong>Do not use memory as policy.</strong>Stable team expectations belong in versioned project guidance; learned memory is useful context, not an enforcement boundary.</div>
    ${platformNote("guidance")}
  </div>`;
}

function contextHygiene() {
  return `<div class="panel"><h2>Inspect, compact, or start fresh—three different operations</h2><p>Long sessions need explicit context hygiene. Choose based on whether you need diagnosis, compression, or a fresh context.</p>
    <div class="control-three">
      <div class="control-card"><span class="tag">INSPECT</span><div class="control-q">What is consuming attention?</div><p>Inspect the current working state before deciding whether cleanup is needed.</p></div>
      <div class="control-card goal"><span class="tag green">COMPACT</span><div class="control-q">Keep the thread, shrink history</div><p>Replace older conversation with a focused summary and continue the same coherent task.</p></div>
      <div class="control-card loop"><span class="tag amber">START FRESH</span><div class="control-q">Change the task boundary</div><p>Begin with clean context when the task changes or the old state no longer helps.</p></div>
    </div>
    <div class="context-meter" aria-label="Illustrative noisy context">
      <div class="context-row keep"><span>Approved plan</span><div class="context-bar"><span style="width:82%"></span></div></div>
      <div class="context-row keep"><span>Root-cause evidence</span><div class="context-bar"><span style="width:92%"></span></div></div>
      <div class="context-row"><span>Old logs</span><div class="context-bar"><span style="width:70%"></span></div></div>
      <div class="context-row"><span>Dead hypotheses</span><div class="context-bar"><span style="width:58%"></span></div></div>
    </div>
    <h3>A long debugging session is still useful, but old logs dominate the window. What now?</h3>
    ${choiceBlock("context-hygiene", ["Compact the thread while preserving the approved plan, root-cause evidence, open risks, and next action", "Discard the entire task state immediately", "Inspect usage and assume that inspection alone fixes it"])}
    <div class="prompt-box">Compact this thread. Preserve the approved plan, root-cause evidence, unresolved risks, and next action.</div>
    <div class="callout subtle"><strong>Why this works</strong>Module 01 showed the underlying limitation: context capacity is not equal attention. Compaction increases signal density while preserving the thread that still matters.</div>
    ${platformNote("continuity")}
  </div>`;
}

function contextHandoff() {
  return `<div class="panel"><h2>A resumable session and a good handoff solve different problems</h2><p>Resume keeps the conversation. A handoff makes the engineering state understandable to a fresh session or another engineer.</p>
    <div class="split">
      <div class="card"><span class="tag">SAME THREAD</span><h3>Name + resume</h3><pre class="mono">NAME  coupon-tax-fix
STATE same coherent task
ACTION resume the stored conversation</pre><p>Use a clear name to make the session findable. Resume when the task and working assumptions remain coherent.</p></div>
      <div class="card"><span class="tag green">FRESH READER</span><h3>Structured handoff</h3><pre class="mono">GOAL
CURRENT STATE
DECISIONS
EVIDENCE
FILES CHANGED
TESTS
OPEN RISKS
NEXT ACTION</pre><p>Use when someone—or a fresh agent—must reconstruct the state without rereading the whole transcript.</p></div>
    </div>
    <div class="handoff-flow" role="img" aria-label="Long session becomes a compact structured handoff that a new session or another engineer can use."><span>Long working session</span><b>→</b><span class="focus">Handoff</span><b>→</b><span>Fresh session / engineer</span></div>
    <div class="callout subtle"><strong>Summary, transcript, and handoff are different.</strong>A summary compresses a session; a transcript preserves it. A good handoff deliberately surfaces the goal, decisions, evidence, risks, and next action for a fresh reader.</div>
    ${platformNote("continuity")}
  </div>`;
}

function contextRecovery() {
  return `<div class="panel"><h2>Recover state without confusing checkpoints, branches, and git</h2><p>Use the mechanism that matches whether you want to restore, explore an alternative, or preserve durable source history.</p>
    <div class="recovery-grid">
      <div class="card"><span class="tag">RESTORE</span><h3>Return to a checkpoint</h3><p>Restore code, conversation, or both only when the product supports a trustworthy checkpoint for that state.</p></div>
      <div class="card"><span class="tag green">BRANCH</span><h3>Try another reasoning path</h3><p>Copy the conversation into a new branch while leaving the original path intact.</p></div>
      <div class="card"><span class="tag amber">GIT</span><h3>Durable source history</h3><p>Use version control as the durable source-history boundary. Product recovery controls do not replace it.</p></div>
    </div>
    <h3>You want to try a different implementation idea without losing the current conversation. What should you use?</h3>
    ${choiceBlock("recovery", ["Branch the conversation", "Restore an earlier checkpoint", "Only switch the Git branch; the reasoning context does not matter"])}
    <div class="callout warning"><strong>Verify recovery semantics.</strong>Checkpoint coverage differs by product and action. Keep important source history in Git and inspect what a restore will change.</div>
    ${platformNote("continuity")}
  </div>`;
}

function contextParallel() {
  return `<div class="panel"><h2>Parallelism has two different isolation problems</h2><p>Separate <strong>thinking context</strong> from <strong>file-system edits</strong>. They are not the same boundary.</p>
    <div class="parallel-map">
      <div class="parallel-card"><span class="tag">SUBAGENT</span><h3>Isolate thinking</h3><p>Focused worker in its own context that returns a summary to the parent session.</p><small>Best for research, review, focused analysis.</small></div>
      <div class="parallel-card"><span class="tag green">WORKTREE</span><h3>Isolate edits</h3><p>Separate git working tree and branch, so parallel implementation work does not collide.</p><small>Best for competing or independent code changes.</small></div>
      <div class="parallel-card"><span class="tag amber">PARALLEL SESSIONS</span><h3>Coordinate independent work</h3><p>Multiple sessions require explicit ownership, merge boundaries, and a final integrator.</p><small>Use only when the work is genuinely independent.</small></div>
    </div>
    <h3>Two competing implementation approaches may edit the same files. What boundary matters most?</h3>
    ${choiceBlock("parallel", ["Separate worktrees / sessions so file edits are isolated", "Several parallel writers in the same working tree", "A research subagent alone, with both implementations still writing to one tree"])}
    <div class="callout subtle"><strong>Rule of thumb</strong>Subagent = context isolation. Worktree = edit isolation. Parallel sessions = coordination overhead.</div>
    ${platformNote("continuity")}
  </div>`;
}

function capstoneRepository() {
  return `<div class="panel"><span class="tag">TRANSFER</span><h2>New repository: Pulse Monitor</h2><p>This is a different problem. Do not reuse the calculator answer—reuse the engineering workflow.</p>
    ${repoBrowser(capstoneFiles, "README.md")}
    <div class="callout subtle"><strong>Your first task</strong>Orient the repository and identify what evidence you need before planning the requested warning state.</div>
  </div>`;
}

function capstoneInvestigation() {
  return `<div class="panel"><span class="tag">DECIDE</span><h2>What blocks implementation?</h2><p>The code defines <strong>healthy</strong> up to 30 seconds and <strong>stale</strong> after 30 seconds. Product asks for a <strong>warning</strong> state before stale, but gives no warning threshold.</p>
    ${choiceBlock("capstone", ["Ask what heartbeat age should enter warning, and confirm whether the API response shape stays the same", "Choose 20 seconds because it sounds reasonable and implement it", "Refactor monitor.js first, then decide the warning behavior later"])}
    <div class="callout warning"><strong>A requirement gap is engineering evidence.</strong>Sometimes the correct action is to stop implementation and ask a precise question.</div>
  </div>`;
}

function capstonePlan() {
  return `<div class="panel"><h2>Clarification turns ambiguity into a contract</h2><div class="callout success"><strong>Product clarification</strong>Warning begins after 20 seconds; stale remains after 30 seconds; return the string <code>"warning"</code>; the HTTP response shape remains <code>{ status }</code>.</div>
    <h3>Which plan is the smallest coherent change?</h3>
    ${choiceBlock("capstone-plan", ["Update status thresholds in monitor.js, add healthy/warning/stale boundary tests, and preserve the API response shape", "Rewrite the monitor, API layer, and dashboard around a new status object", "Change the threshold logic now; tests can be added later if something breaks"])}
    <div class="control-diagram"><div class="control-track"><div class="control-node"><span>PLAN</span><strong>Bounded change</strong><small>How?</small></div><div class="control-arrow">→</div><div class="control-node goal-node"><span>GOAL</span><strong>Healthy / warning / stale tests pass</strong><small>When done?</small></div></div></div>
    ${platformNote("goal")}
  </div>`;
}

function capstoneVerification() {
  return `<div class="panel"><h2>Verify the corrected candidate</h2><p>The review was acted on: the unrelated API field was removed and exact boundary coverage was added.</p>
    <div class="grid-3">
      <div class="card"><span class="tag">REQUIREMENT</span><h3>Explicit?</h3><p>Warning >20s, stale >30s, response shape unchanged.</p></div>
      <div class="card"><span class="tag">EVIDENCE</span><h3>Proven?</h3><p>Tests cover 20s, just over 20s, 30s, and just over 30s.</p></div>
      <div class="card"><span class="tag">SCOPE</span><h3>Clean?</h3><p>Final diff changes monitor logic and tests only; <code>{ status }</code> is preserved.</p></div>
    </div>
    <div class="callout success"><strong>Completion condition met</strong>The candidate is ready for the engineer's acceptance decision and a durable handoff.</div>
  </div>`;
}

const prompts = {
  agent: "Explain the difference between a chat model and an agent. Then explain why context-window capacity does not mean every token will influence a decision equally, and how that should change the way we build context.",
  context: "Orient this repository first. Summarize its purpose, runtime, test command, major folders, and the files relevant to the current goal. Do not edit anything.",
  research: "Investigate why the fixed-coupon scenario returns ₹2,160 instead of ₹2,124. Trace the calculation and gather evidence before editing.",
  plan: "Propose the smallest coherent plan for the fixed-coupon defect. Name files, exact behavior change, preserved behavior, risks, and verification. Do not implement yet.",
  execution: "The approved plan is implemented; the ₹2,000 subtotal with a ₹200 fixed coupon and 18% tax returns ₹2,124; existing tests pass; validation behavior remains unchanged.",
  verification: "Verify the implementation against the approved plan. Review the diff, tests, goal evidence, scope, and risks. Call out any unrelated changes.",
  controls: "Review this repository setup. Classify each need as project guidance, a reusable skill, external capability, focused subagent, lifecycle hook, approval policy, sandbox or worktree isolation, or plugin packaging. Explain why.",
  "context-agents": "Review this long-running session. Recommend what to keep as project guidance or learned context, whether to inspect, compact, start fresh, resume, branch, or hand off, and whether parallel work needs context isolation or edit isolation.",
  capstone: "Orient this repository and investigate the new warning-state request. Identify any missing product contract before proposing code changes."
};

const faqData = {
  agent: [
    ["What makes an agent different from chat?", "The agent can use tools, observe results, and use those results to choose another action."],
    ["Is attention the same as the context window?", "No. The context window is working capacity; attention is an internal mechanism for selectively combining information within that context."],
    ["Does information being present mean the agent will use it reliably?", "No. Retrieval, position, competing context, and reasoning all affect whether information influences the next action."],
    ["Is the U-curve universal?", "No. It is a well-established positional-performance pattern on long-context tasks, not a law that every model and task follows exactly."],
    ["What is the J-like pattern?", "A reported recency-dominant regime at very long relative input lengths where primacy weakens while end-of-context performance remains stronger."],
    ["What is context rot?", "A broad degradation in recall or precision as context grows. It is why capacity should be treated as a finite engineering resource rather than a target to fill."],
    ["Where does the engineer fit?", "The engineer curates context, sets boundaries, reviews plans, controls permissions, and accepts or rejects the result."]
  ],
  context: [
    ["Should the agent read the whole repository?", "Usually no. Orient broadly, then narrow to evidence relevant to the current goal."],
    ["How do I know context is sufficient?", "You can name where the behavior lives, how it flows, what must remain stable, and what is still unknown."],
    ["What belongs in the summary?", "Goal, relevant files, behavior flow, constraints, decisions, evidence, and open questions."],
    ["Why not start with a fix prompt?", "Because without context the agent can optimize the wrong behavior or miss an existing contract."]
  ],
  research: [
    ["Why calculate the expected value independently?", "It gives you an external check against both the application and the agent's explanation."],
    ["What should research produce?", "A supported causal explanation, affected files, preserved invariants, and remaining uncertainty."],
    ["What if the hypothesis is wrong?", "Update the evidence board and continue investigating. A disproved hypothesis is useful evidence."],
    ["Why not edit and see what happens?", "Because editing can destroy the clean evidence you need to understand the original defect."]
  ],
  plan: [
    ["What makes a plan reviewable?", "It names files, behavior, preserved constraints, risks, and the evidence that will prove completion."],
    ["Why 'smallest coherent change'?", "The smallest diff can be incomplete. A coherent change includes the fix and the evidence needed to trust it."],
    ["Who approves the plan?", "The engineer. Agent-generated plans are proposals until reviewed."],
    ["What is a scope smell?", "Unrelated cleanup, new abstractions, or API changes that are not required by the goal."]
  ],
  execution: [
    ["How are plan and goal different?", "The plan defines how to work; the goal defines observable conditions for stopping."],
    ["When should I schedule recurrence?", "For time-driven repetition such as polling CI or checking an external process periodically."],
    ["Does a goal approve the result?", "No. Goal completion returns you to human verification and acceptance."],
    ["What if execution needs a materially different plan?", "Stop and return to human review instead of silently expanding scope."]
  ],
  verification: [
    ["Why are passing tests insufficient?", "Tests may miss scope creep, untested contracts, or unrelated changes."],
    ["What should I inspect?", "Diff, tests, goal evidence, scope, and remaining risks."],
    ["When should I reject?", "When evidence is weak, requirements are unmet, or the implementation exceeds the approved plan."],
    ["What does acceptance add?", "It applies engineering judgment after automated completion conditions are satisfied."]
  ],
  controls: [
    ["Skill or project guidance?", "Use project guidance for stable repository expectations; use a skill for reusable knowledge or a procedure that loads when relevant."],
    ["Skill or subagent?", "A skill is reusable instructions/knowledge; a subagent is a separate worker with isolated context and its own tool/permission configuration."],
    ["MCP or built-in tool?", "Built-in tools are part of the agent harness. MCP adds trusted external tools, services, resources, or prompts."],
    ["MCP or plugin?", "MCP connects the agent to external services. A plugin packages reusable capabilities for distribution."],
    ["Permissions or sandbox?", "Permissions decide whether actions are authorized; sandboxing constrains Bash filesystem and network reach."],
    ["Why project trust?", "Repository configuration can influence agent behavior. Trust gates project-supplied configuration before the agent loads or executes it."]
  ],
  "context-agents": [
    ["Project guidance or learned memory?", "Project guidance holds stable human-written conventions; learned memory stores useful discoveries but is not an enforcement boundary."],
    ["Inspect, compact, or start fresh?", "Inspect diagnoses the state; compaction preserves a coherent thread with less history; starting fresh creates a clean task boundary."],
    ["What makes a good handoff?", "Goal, current state, decisions, evidence, changed files, tests, open risks, and the next action."],
    ["Restore or branch?", "Restore returns to an earlier state; branching copies the conversation so you can explore an alternative without losing the original."],
    ["Subagent or worktree?", "Subagents isolate reasoning context. Worktrees isolate file edits. Use both when the task needs both boundaries."],
    ["Are parallel sessions the default?", "No. They add coordination overhead. Use them only for genuinely independent work with explicit ownership and integration."]
  ],
  capstone: [
    ["Why use a different repository?", "It tests transfer of the workflow rather than memory of the calculator solution."],
    ["Can 'do not edit yet' be progress?", "Yes. Clarifying an essential requirement prevents the code from encoding a guess."],
    ["What makes the capstone successful?", "Requirement, plan, implementation evidence, tests, and scope all agree."],
    ["What should I take to real work?", "Build context, gather evidence, expose the plan, define the finish line, and verify before acceptance."]
  ]
};

function lessonFaq(id) {
  const items = faqData[id];
  if (!items) return "";
  return `<details class="lesson-faq"><summary>Questions worth asking</summary><div class="faq-list">${items.map(([question, answer]) => `<div class="faq-item"><h3>${question}</h3><p>${answer}</p></div>`).join("")}</div></details>`;
}

function tryPrompt(id) {
  let prompt = prompts[id];
  if (!prompt) return "";
  if (id === "context") prompt = selectedPrompt("orient", prompt);
  if (id === "execution" && ["claude", "codex"].includes(state.platform)) prompt = `/goal ${prompt}`;
  const label = state.platform === "compare" ? "TRY IN EITHER AGENT" : state.platform === "generic" ? "PRODUCT-NEUTRAL PROMPT" : `TRY IN ${platforms[state.platform].label.toUpperCase()}`;
  return `<div class="try-card"><div><span class="tag green">${label}</span><p>${esc(prompt)}</p></div><button class="button secondary" data-copy="${escAttr(prompt)}" type="button">Copy prompt</button></div>`;
}

function reference() {
  const groups = [
    ["Engineering workflow", ["agent", "context", "research", "plan", "execution", "verification"]],
    ["Extend, control, and continue", ["controls", "context-agents"]]
  ];
  const advanced = [
    ["Code intelligence", "Language-server symbol navigation and diagnostics for typed codebases."],
    ["Non-interactive operation", "Run an agent from scripts or CI when an interactive session is not the right surface."],
    ["Remote and cloud surfaces", "Continue work across surfaces without treating every surface as a new engineering state."],
    ["Parallel agents", "Coordinate independent workers only when the task justifies the added integration cost."],
    ["Settings and managed policy", "Personal, project, command-line, and organization policy can have different precedence and ownership."]
  ];
  const sourceProducts = state.platform === "claude" ? new Set(["Claude Code"]) : state.platform === "codex" ? new Set(["Codex"]) : new Set(["Claude Code", "Codex"]);
  const visibleSources = sourceRegistry.filter(source => sourceProducts.has(source.product));
  return `<div class="section-head"><span class="kicker">Reference</span><h1>Keep the control model handy.</h1><p>Use this field guide with any coding agent. Platform details appear after the shared responsibility.</p></div>
    ${renderGlossary()}
    ${groups.map(([title, ids]) => `<section class="reference-group"><h2>${title}</h2><div class="reference-grid">${ids.map(id => { const lesson = lessons.find(item => item.id === id); return `<a class="card reference-card" href="#/${firstPageForModule(id)}"><span class="tag">${lesson.progress}</span><h3>${lesson.title}</h3><p>${lesson.objective}</p></a>`; }).join("")}</div></section>`).join("")}
    <section class="panel"><h2>Advanced / situational capabilities</h2><p class="small">Know these exist; do not configure them merely because they are available.</p><div class="advanced-grid">${advanced.map(([title, body]) => `<div class="advanced-item"><strong>${title}</strong><span>${body}</span></div>`).join("")}</div></section>
    <section class="panel"><h2>Research behind long-context behavior</h2><p class="small">These sources support the positional-bias and context-engineering mental models used in Module 01.</p>${researchLinks()}</section>
    <section class="panel"><h2>Official platform sources</h2><p class="small">Commands and surfaces change. Each adapter claim records its source, maturity, review date, and whether its 180-day review window is overdue.</p><div class="source-table" role="table" aria-label="Official platform source registry">${visibleSources.map(source => { const overdue = isReviewOverdue(source.lastReviewed); return `<a class="source-row" href="${source.url}" target="_blank" rel="noreferrer"><span>${source.product}</span><strong>${source.label}</strong><small>${source.concept} · ${source.lastReviewed} · ${source.maturity} · ${overdue ? "REVIEW OVERDUE" : "review current"}</small><b>↗</b></a>`; }).join("")}</div></section>`;
}

function pageBody(current) {
  const pages = {
    "start/readiness": renderReadiness,
    "agent": agent,
    "agent/first-task": () => renderFirstTask({ adapterNote: platformNote("orient", { includeGeneric: true }), prompt: selectedPrompt("orient", prompts.context) }),
    "agent/tokens": () => renderTokenPrimer(tokenSources),
    "agent/attention": agentAttention,
    "agent/position": agentPosition,
    "agent/budget": agentBudget,
    "context/orient": contextOrient,
    "context/ladder": contextLadder,
    "context/summary": contextSummary,
    "context/contract": () => renderTaskContract(state.drafts),
    "research/problem": researchProblem,
    "research/investigation": researchInvestigation,
    "research/evidence": researchEvidence,
    "plan/critique": planCritique,
    "plan/construct": () => renderConstructPlan(state.drafts),
    "plan/approve": planApprove,
    "execution/controls": executionControls,
    "execution/goal": executionGoal,
    "execution/loop": executionLoop,
    "verification/goal": verificationGoal,
    "verification/review": verificationReview,
    "verification/scope": verificationScope,
    "controls/map": controlsMap,
    "controls/choose": controlsChoose,
    "controls/safety": controlsSafety,
    "context-agents/sources": contextSources,
    "context-agents/hygiene": contextHygiene,
    "context-agents/handoff": contextHandoff,
    "context-agents/recovery": contextRecovery,
    "context-agents/parallel": contextParallel,
    "capstone/repository": capstoneRepository,
    "capstone/investigation": capstoneInvestigation,
    "capstone/plan": capstonePlan,
    "capstone/evidence": () => renderCapstoneEvidence(state.drafts),
    "capstone/verification": capstoneVerification,
    "capstone/handoff": () => renderCapstoneHandoff(state.drafts)
  };
  return pages[current.path]?.() || "";
}

function wire() {
  main.querySelectorAll("[data-next]").forEach(button => button.addEventListener("click", () => complete(button.dataset.next)));
  main.querySelectorAll("[data-mode]").forEach(button => button.addEventListener("click", () => { state.mode = button.dataset.mode; state.courseCompleted = false; complete("start"); save(); }));
  main.querySelectorAll("[data-platform]").forEach(button => button.addEventListener("click", () => { setPlatform(button.dataset.platform); page(); }));
  main.querySelectorAll("[data-finish]").forEach(button => button.addEventListener("click", () => { complete("capstone"); state.courseCompleted = true; state.lastPath = "capstone/handoff"; save(); }));
  main.querySelectorAll("[data-choice]").forEach(button => button.addEventListener("click", () => handleChoice(button)));
  main.querySelectorAll("[data-copy]").forEach(button => button.addEventListener("click", async () => {
    try { await navigator.clipboard?.writeText(button.dataset.copy); button.textContent = "Copied ✓"; }
    catch { button.textContent = "Copy unavailable"; }
  }));
  main.querySelectorAll("[data-tab]").forEach(button => button.addEventListener("click", () => {
    main.querySelectorAll("[data-tab]").forEach(item => item.classList.remove("active"));
    const viewer = main.querySelector("[data-file-viewer]");
    const file = button.dataset.tab;
    if (viewer) viewer.textContent = files[file] ?? capstoneFiles[file] ?? "File unavailable";
    button.classList.add("active");
  }));
  main.querySelectorAll("[data-ladder]").forEach(button => button.addEventListener("click", () => {
    const step = ladderSteps.find(item => item.id === button.dataset.ladder);
    if (!step) return;
    main.querySelectorAll("[data-ladder]").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const detail = main.querySelector("[data-ladder-detail]");
    detail.innerHTML = `<span class="step-title">${step.label}</span><h3>${step.short}</h3><p>${step.detail}</p><div class="prompt-box">${esc(step.prompt)}</div>`;
  }));
  main.querySelectorAll("[data-evidence-tab]").forEach(button => button.addEventListener("click", () => {
    main.querySelectorAll("[data-evidence-tab]").forEach(item => { item.classList.remove("active"); item.setAttribute("aria-selected", "false"); });
    button.classList.add("active"); button.setAttribute("aria-selected", "true");
    main.querySelector("[data-evidence-view]").innerHTML = evidenceViews[button.dataset.evidenceTab];
  }));

  main.querySelectorAll("[data-draft]").forEach(field => field.addEventListener("input", () => {
    state.drafts[field.dataset.draft] = field.value;
    save();
    const status = main.querySelector(`[data-draft-status="${CSS.escape(field.dataset.draft)}"]`);
    if (status) status.textContent = "Saved";
  }));

  main.querySelectorAll("[data-reveal]").forEach(button => button.addEventListener("click", () => {
    const panel = main.querySelector(`[data-reveal-panel="${CSS.escape(button.dataset.reveal)}"]`);
    if (!panel) return;
    panel.hidden = false;
    button.setAttribute("aria-expanded", "true");
    button.textContent = button.dataset.reveal.startsWith("retrieval-") ? "Answer revealed" : "Exemplar revealed";
  }));

  const readiness = main.querySelector("#check-readiness");
  if (readiness) readiness.addEventListener("click", () => {
    const total = main.querySelectorAll("[data-readiness]").length;
    const checked = main.querySelectorAll("[data-readiness]:checked").length;
    const feedback = main.querySelector("#readiness-feedback");
    feedback.hidden = false;
    feedback.className = `feedback ${checked >= 2 ? "strong" : "reasonable"}`;
    feedback.textContent = checked >= 2 ? `Ready to begin. ${checked} of ${total} foundations are already familiar.` : "You can continue. Use the labeled walkthroughs and verify one claim at a time.";
  });

  const glossaryFilter = main.querySelector("[data-glossary-filter]");
  if (glossaryFilter) glossaryFilter.addEventListener("input", () => {
    const query = glossaryFilter.value.trim().toLowerCase();
    const terms = [...main.querySelectorAll("[data-glossary-term]")];
    let visible = 0;
    terms.forEach(term => { const matches = term.dataset.glossaryTerm.includes(query); term.hidden = !matches; if (matches) visible += 1; });
    main.querySelector("[data-glossary-count]").textContent = `${visible} ${visible === 1 ? "term" : "terms"}`;
    main.querySelector("[data-glossary-empty]").hidden = visible !== 0;
  });

  const reviewPlan = main.querySelector("#review-plan");
  if (reviewPlan) reviewPlan.addEventListener("click", () => {
    const items = [...main.querySelectorAll("[data-plan-item]")];
    const removeItems = new Set(["2", "4"]);
    const correct = items.every(input => input.checked === removeItems.has(input.dataset.planItem));
    const feedback = main.querySelector("#plan-feedback");
    feedback.hidden = false;
    feedback.className = `feedback ${correct ? "strong" : "reasonable"}`;
    feedback.textContent = correct
      ? "Strong review. Remove the broad abstraction and unrelated API rename. Keep the causal fix, regression coverage, and preservation constraints."
      : "Review the scope again. Select only work that is unnecessary or unrelated to fixing and proving this defect.";
  });

  const checkExtensions = main.querySelector("#check-extensions");
  if (checkExtensions) checkExtensions.addEventListener("click", () => {
    const answers = { e1: "guidance", e2: "scope", e3: "skill", e4: "mcp", e6: "subagent", e7: "hook", e8: "plugin", e9: "sandbox" };
    const selects = [...main.querySelectorAll("[data-extension-id]")];
    const correct = selects.filter(select => select.value === answers[select.dataset.extensionId]).length;
    const feedback = main.querySelector("#extensions-feedback");
    feedback.hidden = false;
    feedback.className = `feedback ${correct === selects.length ? "strong" : "reasonable"}`;
    feedback.textContent = correct === selects.length
      ? "Strong. You matched each mechanism to its real responsibility rather than treating the extension layer as interchangeable features."
      : `${correct} of ${selects.length} mechanisms match. Re-check whether the scenario needs persistent guidance, path scope, reusable workflow, response shaping, external connectivity, context isolation, lifecycle automation, or packaging.`;
  });


}

function page() {
  const current = activePath();

  if (current.path === "start") {
    main.innerHTML = start();
  } else if (current.path === "reference") {
    main.innerHTML = reference();
  } else {
    state.lastPath = current.path;
    save();
    main.innerHTML = shell(current, pageBody(current));
  }

  wire();
  renderNav();
  main.focus({ preventScroll: true });
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

window.addEventListener("hashchange", page);
platformSelect?.addEventListener("change", event => { setPlatform(event.target.value); page(); });
save();
page();
