# Control the Coding Agent

A tool-independent, self-paced engineering course with optional Claude Code and Codex guides.

## Preview

Serve this directory with any static server. For example:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/`.

No build step, API key, framework, or package installation is required.

## Verify

```bash
npm test
npm run check
```

The course remains a static GitHub Pages-compatible application. Progress, answers, constructed-response drafts, course mode, and platform guide selection stay in browser storage.

## Course model

```text
SHARED PRINCIPLE
      ↓
SHARED ENGINEERING PATTERN
      ↓
SELECTED PLATFORM GUIDE
```

The platform state supports:

- `generic`
- `claude`
- `codex`
- `compare`

Switching platforms does not reset course progress.

## Main files

- `index.html` — static application shell
- `src/app.js` — route orchestration and shared interactions
- `src/content.js` — shared course data and examples
- `src/foundations.js` — readiness, first-task, task-contract, constructed-plan, and retrieval surfaces
- `src/glossary.js` — searchable product-neutral vocabulary
- `src/capstone.js` — candidate-evidence review and final handoff
- `src/platforms.js` — structured platform adapters and official source registry
- `styles.css` — professional light theme and responsive layout
- `tests/course.test.js` — content, interaction-contract, and architecture checks

## Current release

`2.0.0-alpha.2` closes the material learner-flow gaps found in a requirement-by-requirement audit against Generic Agentic Coding Course Plan v2. See `PLAN_V2_COMPLIANCE_AUDIT.md` and `NEXT_VERSION_IMPLEMENTATION_REPORT.md`.
