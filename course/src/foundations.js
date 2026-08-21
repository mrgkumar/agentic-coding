const escapeHtml = value => String(value ?? "").replace(/[&<>]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[character]));
const escapeAttribute = value => String(value ?? "").replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));

function constructedResponse({ id, title, prompt, placeholder, exemplar, draft = "", rows = 7 }) {
  return `<section class="constructed-response" aria-labelledby="${escapeAttribute(id)}-title">
    <span class="tag">CONSTRUCT</span>
    <h3 id="${escapeAttribute(id)}-title">${title}</h3>
    <p>${prompt}</p>
    <textarea rows="${rows}" data-draft="${escapeAttribute(id)}" placeholder="${escapeAttribute(placeholder)}">${escapeHtml(draft)}</textarea>
    <div class="constructed-actions"><button class="button secondary" type="button" data-reveal="${escapeAttribute(id)}">Compare with an exemplar</button><span class="draft-status" data-draft-status="${escapeAttribute(id)}" aria-live="polite">Saved locally as you type</span></div>
    <div class="reveal-card" data-reveal-panel="${escapeAttribute(id)}" hidden><strong>Exemplar—not the only valid answer</strong><p>${exemplar}</p></div>
  </section>`;
}

export function renderReadiness() {
  return `<div class="panel"><span class="tag">READINESS CHECK</span><h2>You do not need prior agent experience</h2><p>This check sets expectations; it does not gate the course. Select each statement that is true today.</p>
    <ul class="readiness-list">
      <li><label><input type="checkbox" data-readiness> I can recognize a source file and an automated test.</label></li>
      <li><label><input type="checkbox" data-readiness> I can describe a desired behavior, even if I do not know the implementation.</label></li>
      <li><label><input type="checkbox" data-readiness> I am willing to inspect evidence instead of accepting a confident answer.</label></li>
    </ul>
    <button class="button" id="check-readiness" type="button">Check readiness</button>
    <div class="feedback" id="readiness-feedback" aria-live="polite" hidden></div>
    <div class="callout subtle"><strong>If the first statement is unfamiliar</strong>You can still continue. The repository walkthrough labels files, commands, observations, and decisions as they appear.</div>
  </div>`;
}

export function renderFirstTask({ adapterNote = "", prompt = "" } = {}) {
  return `<div class="panel"><span class="tag">FIRST TASK</span><h2>Ask the agent to learn before it edits</h2><p>Your first successful task is intentionally small: build a trustworthy repository orientation and make no changes.</p>
    <div class="walkthrough" aria-label="First task walkthrough">
      <div class="walkthrough-step"><span>1</span><div><strong>Set the boundary</strong><p>State the goal and say “Do not edit anything.”</p></div></div>
      <div class="walkthrough-step"><span>2</span><div><strong>Let tools observe</strong><p>The agent reads the README, package metadata, major folders, and test command.</p></div></div>
      <div class="walkthrough-step"><span>3</span><div><strong>Require evidence</strong><p>The response names the files and commands that support each claim.</p></div></div>
      <div class="walkthrough-step"><span>4</span><div><strong>Verify one claim</strong><p>Open a cited file or run the reported test command before trusting the orientation.</p></div></div>
    </div>
    <div class="first-task-prompt"><span class="tag green">TRY THIS</span><p>${escapeHtml(prompt)}</p><button class="button secondary" type="button" data-copy="${escapeAttribute(prompt)}">Copy prompt</button></div>
    <div class="grid model-limits">
      <div class="card"><h3>What the model can do</h3><p>Interpret context, choose tools, summarize evidence, propose a next action.</p></div>
      <div class="card"><h3>What it cannot guarantee</h3><p>Complete context, deterministic reasoning, correct interpretation, or an acceptable change.</p></div>
    </div>
    <h3>What forms the working context?</h3>
    <div class="working-context" role="list"><span role="listitem">Project guidance</span><span role="listitem">Your prompt</span><span role="listitem">Loaded files</span><span role="listitem">Tool results</span><span role="listitem">Conversation history</span><span role="listitem">Current goal</span></div>
    <div class="callout warning"><strong>Four limits to carry forward</strong>The agent may be uncertain, lack relevant context, vary between runs, or drift as a long session accumulates noise. Evidence and human gates compensate for those limits.</div>
    ${adapterNote}
  </div>`;
}

export function renderTokenPrimer(sources = []) {
  return `<div class="panel">
    <span class="tag">FOUNDATION</span>
    <h2>Tokens are the working units of a language model</h2>
    <p>Before a Transformer can process text, a tokenizer maps the text into a sequence of tokens. A token may be a whole word, part of a word, punctuation, whitespace, or a piece of code. Tokens are then represented as numbers the model can process.</p>
    <div class="grid token-basics">
      <div class="card"><span class="tag">NOT ALWAYS A WORD</span><h3>Subwords are common</h3><p><code>calculate</code> might remain whole, while a rare identifier or long word may be split into several pieces.</p></div>
      <div class="card"><span class="tag amber">MODEL-DEPENDENT</span><h3>There is no universal split</h3><p>Different model families use different vocabularies and tokenization rules. Never treat a word count as an exact token count.</p></div>
      <div class="card"><span class="tag green">ENGINEERING IMPACT</span><h3>Context is measured in tokens</h3><p>Input length, output budgets, latency, and sometimes cost depend on tokens—not simply on the number of words in a prompt.</p></div>
    </div>
    <h3>A toy tokenizer</h3>
    <p>This example is deliberately illustrative, not the output of a production tokenizer. The <code>▁</code> marker stands for a preceding space.</p>
    <div class="token-demo" role="img" aria-label="Toy tokenization of Fix the fixed-coupon bug into illustrative word, punctuation, and subword tokens">
      <div class="token-line"><span class="token-label">TEXT</span><code>Fix the fixed-coupon bug.</code></div>
      <div class="token-arrow" aria-hidden="true">↓</div>
      <div class="token-strip"><span class="token-chip">Fix</span><span class="token-chip">▁the</span><span class="token-chip">▁fixed</span><span class="token-chip">-</span><span class="token-chip">coupon</span><span class="token-chip">▁bug</span><span class="token-chip">.</span></div>
    </div>
    <div class="callout subtle"><strong>Why this matters for coding agents</strong>A long tool result can consume thousands of tokens even when it looks like “one output.” Code identifiers, punctuation, paths, and repeated logs all compete for the same working context.</div>
    <h3>Where Transformers fit</h3>
    <p>A Transformer is a neural-network architecture that processes token representations through repeated blocks. In a decoder-style language model, the result is a probability distribution for the next token; generation adds one token at a time and feeds it back into the sequence.</p>
    <div class="transformer-flow" role="img" aria-label="Text becomes tokens, tokens become representations with position information, Transformer blocks use attention and feed-forward layers, and the model predicts the next token">
      <div class="transformer-node"><span>1</span><strong>Text</strong><small>prompt or code</small></div><b aria-hidden="true">→</b>
      <div class="transformer-node"><span>2</span><strong>Tokens</strong><small>discrete pieces</small></div><b aria-hidden="true">→</b>
      <div class="transformer-node model"><span>3</span><strong>Representations</strong><small>embeddings + positions</small></div><b aria-hidden="true">→</b>
      <div class="transformer-node model"><span>4</span><strong>Transformer blocks</strong><small>attention + feed-forward</small></div><b aria-hidden="true">→</b>
      <div class="transformer-node result"><span>5</span><strong>Next token</strong><small>probabilities → output</small></div>
    </div>
    <div class="grid-3 token-takeaways">
      <div class="card"><h3>Tokenization</h3><p>Turns a string into model-specific pieces. It is preprocessing, not understanding.</p></div>
      <div class="card"><h3>Attention</h3><p>Lets each position selectively mix information from other positions in the current context.</p></div>
      <div class="card"><h3>Generation</h3><p>Chooses a next-token continuation repeatedly. A fluent continuation is not proof that the underlying claim is true.</p></div>
    </div>
    <details class="deep-dive transformer-deep-dive"><summary>Optional deep dive · how a Transformer works</summary><div>
      <p>The course only needs the pipeline above. If you want the working principle, follow one token through these repeated operations:</p>
      <ol class="transformer-steps">
        <li><strong>Represent.</strong> Convert each token into a vector and add information about its position in the sequence.</li>
        <li><strong>Attend.</strong> For each position, compare a query with other tokens' keys and mix their value vectors. A causal language model masks future positions so it cannot read the answer it is supposed to predict.</li>
        <li><strong>Transform.</strong> Pass each position through a feed-forward network, with residual connections and normalization helping information move through many layers.</li>
        <li><strong>Predict.</strong> Convert the final representation into scores for possible next tokens. Select or sample one, append it, and repeat.</li>
      </ol>
      <div class="callout subtle"><strong>Scope boundary</strong>“Transformer” names an architecture family. The original paper describes encoder and decoder components; many current text-generation models use decoder-style stacks. Neither architecture nor attention alone guarantees factual or correct output.</div>
      <a class="video-link" href="https://www.youtube.com/watch?v=wjZofJX0v4M" target="_blank" rel="noreferrer"><strong>Watch: Transformers, the tech behind LLMs ↗</strong><span>Optional visual explanation · Deep Learning Chapter 5</span></a>
    </div></details>
    <details class="deep-dive"><summary>Two useful boundaries</summary><div>
      <p><strong>Tokens are not thoughts.</strong> They are the representation the model operates on. <strong>Attention is not a complete explanation of reasoning.</strong> Real models also use embeddings, many layers, feed-forward transformations, positional information, output selection, and training.</p>
    </div></details>
    <h3>Explore further</h3>
    <p class="small">These links go deeper than the course needs. Use the interactive tokenizer to build intuition, then read the Transformer paper or tokenizer documentation when you want the mechanics.</p>
    <div class="research-links" aria-label="Token and Transformer exploration links">${sources.map(source => `<a href="${source.url}" target="_blank" rel="noreferrer"><strong>${source.label}</strong><span>${source.note}</span><b aria-hidden="true">↗</b></a>`).join("")}</div>
  </div>`;
}

export function renderTaskContract(drafts = {}) {
  const fields = [
    ["contract-goal", "Goal", "What outcome is needed?"],
    ["contract-context", "Context", "What repository area or background matters?"],
    ["contract-constraints", "Constraints", "What must not change?"],
    ["contract-evidence", "Evidence", "What should the agent inspect or produce?"],
    ["contract-done", "Done when", "What observable conditions mark completion?"],
    ["contract-stop", "Stop / ask", "What uncertainty or scope change requires human input?"]
  ];
  return `<div class="panel"><span class="tag">TASK CONTRACT</span><h2>Turn a request into six control fields</h2><p>A good task contract gives the agent a bounded job and gives the engineer explicit review points.</p>
    <div class="contract-grid">${fields.map(([id, label, placeholder]) => `<label><strong>${label}</strong><textarea rows="3" data-draft="${id}" placeholder="${placeholder}">${escapeHtml(drafts[id] || "")}</textarea><span class="draft-status" data-draft-status="${id}">Saved locally as you type</span></label>`).join("")}</div>
    <div class="constructed-actions"><button class="button secondary" type="button" data-reveal="task-contract">Compare with a completed contract</button></div>
    <div class="reveal-card" data-reveal-panel="task-contract" hidden><strong>Shopping Calculator exemplar</strong><dl class="contract-example"><dt>Goal</dt><dd>Correct fixed-coupon tax ordering.</dd><dt>Context</dt><dd><code>calculateBill</code> and its tests.</dd><dt>Constraints</dt><dd>Preserve percentage discounts, validation, and public API.</dd><dt>Evidence</dt><dd>Trace current arithmetic, inspect the diff, and run tests.</dd><dt>Done when</dt><dd>The ₹2,124 regression and existing tests pass.</dd><dt>Stop / ask</dt><dd>Stop if the public contract or unrelated files must change.</dd></dl></div>
  </div>`;
}

export function renderConstructPlan(drafts = {}) {
  return `<div class="panel"><h2>Construct the plan before seeing one</h2><p>Use the evidence board. Write a bounded route that names the change, proof, preserved behavior, and stop conditions.</p>
    ${constructedResponse({
      id: "constructed-plan",
      title: "Your proposed plan",
      prompt: "Write 3–5 ordered steps. Include affected files and verification evidence; do not implement.",
      placeholder: "1. In src/calculator.js…\n2. In tests/calculator.test.js…\n3. Verify…\nStop if…",
      draft: drafts["constructed-plan"],
      exemplar: "1. Add a failing regression in <code>tests/calculator.test.js</code> for ₹2,124. 2. In <code>src/calculator.js</code>, make the fixed coupon reduce the taxable subtotal before tax. 3. Run the full suite and inspect the diff for percentage-discount, validation, and public-API preservation. Stop for review if another file or contract must change."
    })}
  </div>`;
}

export const retrievalPrompts = {
  start: ["Who owns the acceptance decision?", "The engineer. The agent can execute and report evidence, but cannot confer engineering acceptance on its own work."],
  agent: ["Why do tools improve an agent without making it reliable?", "Tools create new observations and observable evidence. Interpretation and next-action choice can still be wrong."],
  context: ["Name the six fields in a task contract.", "Goal, Context, Constraints, Evidence, Done when, and Stop / ask."],
  research: ["What belongs between inference and implementation?", "A supported causal explanation, explicit assumptions, and the remaining verification questions."],
  plan: ["What makes a change small and coherent?", "It contains the required behavior change plus enough proof and preservation checks to trust it—without unrelated cleanup."],
  execution: ["Plan, goal, and schedule answer which questions?", "How? When done? When again?"],
  verification: ["Why can green tests still lead to rejection?", "Tests can miss scope creep, untested contracts, risky implementation choices, or unrelated changes."],
  controls: ["What is the rules collision across platforms?", "Claude project rules are guidance; Codex command rules govern whether commands may run outside the sandbox."],
  "context-agents": ["Subagent versus worktree?", "A subagent isolates reasoning context; a worktree isolates file edits."],
  capstone: ["What evidence must a final handoff preserve?", "Goal, decision, changed files, tests, scope, risks, and the next action or acceptance state."]
};

export function renderRetrievalCheck(moduleId) {
  const item = retrievalPrompts[moduleId];
  if (!item) return "";
  return `<section class="retrieval-check"><span class="tag amber">RETRIEVAL CHECK</span><h2>Recall before you reveal</h2><p>${item[0]}</p><button class="button ghost" type="button" data-reveal="retrieval-${escapeAttribute(moduleId)}">Reveal answer</button><div class="reveal-card" data-reveal-panel="retrieval-${escapeAttribute(moduleId)}" hidden><strong>Answer</strong><p>${item[1]}</p></div></section>`;
}
