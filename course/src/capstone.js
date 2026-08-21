const escapeHtml = value => String(value ?? "").replace(/[&<>]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[character]));

export function renderCapstoneEvidence(drafts = {}) {
  return `<div class="panel"><span class="tag">EVIDENCE REVIEW</span><h2>The candidate works—but is not yet acceptable</h2><p>Review the implementation and tests against the approved contract. Find both the coverage gap and the scope violation.</p>
    <div class="candidate-evidence">
      <section><h3>Candidate diff</h3><pre class="mono">  if (ageSeconds &gt; 30) return "stale";
<span class="add">+ if (ageSeconds &gt; 20) return "warning";</span>

 // src/api.js
- return Response.json({ status });
<span class="add">+ return Response.json({ status, observedAt: now });</span></pre></section>
      <section><h3>Candidate tests</h3><pre class="mono">✓ 10 seconds → healthy
✓ 25 seconds → warning
✓ 45 seconds → stale

3 tests passed</pre></section>
    </div>
    <section class="constructed-response"><span class="tag">CONSTRUCT</span><h3>Your review rationale</h3><p>State the acceptance decision, cite the two problems, and request the smallest correction.</p><textarea rows="7" data-draft="capstone-review" placeholder="Decision: do not accept yet…">${escapeHtml(drafts["capstone-review"] || "")}</textarea><div class="constructed-actions"><button class="button secondary" type="button" data-reveal="capstone-review">Compare with an exemplar</button><span class="draft-status" data-draft-status="capstone-review">Saved locally as you type</span></div><div class="reveal-card" data-reveal-panel="capstone-review" hidden><strong>Exemplar</strong><p>Do not accept yet. The tests sample each state but do not prove the exact 20/30-second boundaries. The <code>observedAt</code> response field violates the explicit response-shape constraint. Remove the API change and add tests at 20, just over 20, 30, and just over 30 seconds; then rerun the suite and inspect the final diff.</p></div></section>
  </div>`;
}

export function renderCapstoneHandoff(drafts = {}) {
  return `<div class="panel"><span class="tag">FINAL HANDOFF</span><h2>Preserve the engineering state</h2><p>Write the short handoff another engineer would need to verify or accept the completed change.</p>
    <section class="constructed-response"><h3>Your handoff</h3><textarea rows="9" data-draft="capstone-handoff" placeholder="Goal…\nDecision…\nChanged files…\nEvidence…\nScope / risks…\nNext action…">${escapeHtml(drafts["capstone-handoff"] || "")}</textarea><div class="constructed-actions"><button class="button secondary" type="button" data-reveal="capstone-handoff">Compare with an exemplar</button><span class="draft-status" data-draft-status="capstone-handoff">Saved locally as you type</span></div><div class="reveal-card" data-reveal-panel="capstone-handoff" hidden><strong>Exemplar handoff</strong><p><strong>Goal:</strong> add warning after 20s; stale remains after 30s. <strong>Changed:</strong> <code>src/monitor.js</code> and boundary tests only. <strong>Evidence:</strong> exact 20/30 boundary cases and existing tests pass; final diff preserves <code>{ status }</code>. <strong>Decision:</strong> completion condition met, ready for human acceptance. <strong>Risk:</strong> confirm timestamps use the same units in production.</p></div></section>
    <div class="callout success"><strong>Transfer complete</strong>The reusable skill is the loop: context → evidence → plan → approval → execution → verification → acceptance → handoff.</div>
  </div>`;
}
