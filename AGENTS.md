# Repository Guidelines

## Project Structure & Module Organization

- `docs/` contains supporting course material.
- `course/` is the static GitHub Pages-compatible self-paced learning site; its modular content, browser state, and tests live under `course/src/` and `course/tests/`.
- `presentations/claude-code-talk-pack/` contains the talk deck, presenter notes, runbook, and audit documents.
- `presentations/claude-code-talk-pack/demo-shopping-calculator/` is the runnable browser demo:
  - `index.html` defines the interface.
  - `src/app.js` handles DOM events and rendering.
  - `src/calculator.js` contains calculation and validation logic.
  - `tests/calculator.test.js` contains automated tests.
  - `styles.css` contains demo styling.
- Keep presentation assets and demo-specific code inside their existing directories. There is no root application or build output directory.

## Build, Test, and Development Commands

Run commands from the relevant project directory:

```bash
# repository root (serves the landing page source, course, and linked talk assets)
python -m http.server 8000

# course/
npm test                 # Run course content/invariant tests

# presentations/claude-code-talk-pack/demo-shopping-calculator/
npm test                 # Run the Node test suite
python -m http.server 8000  # Serve the ES-module demo locally
```

Open the matching `http://localhost:8000` after starting a server. No `npm install` or production build is required. For course UI changes, use `agent-browser` against the served site and record meaningful results in `course/VERIFICATION_REPORT.md`.

## Coding Style & Naming Conventions

Use modern browser JavaScript with ES modules, two-space indentation, semicolons, and double-quoted strings, matching the existing code. Prefer small named functions and descriptive `camelCase` identifiers (for example, `calculateBill` and `discountValue`). Keep pure calculation/validation logic in `src/calculator.js`; keep DOM and presentation behavior in `src/app.js`. Use lowercase kebab-case for new demo filenames.

## Testing Guidelines

Tests use Node’s built-in `node:test` and `node:assert/strict`; name files `*.test.js` and describe behavior in test names. Add or update tests for calculation, validation, rounding, and discount/tax edge cases. Run `npm test` before submitting changes. UI-only changes should also be checked manually in the browser using the local server.

## Commit & Pull Request Guidelines

The history currently contains only `Initial commit`, so no repository-specific convention is established. Use concise imperative commit subjects (for example, `Document calculator validation behavior`) and keep each commit focused. Pull requests should explain the change, identify affected paths, include test results, and attach screenshots or a short recording for visual/presentation changes. Link the relevant issue when one exists.

## Content and Configuration Notes

Preserve the educational/demo focus and avoid committing generated files, credentials, or local server output. Keep user-visible currency and behavior consistent with the existing INR calculator unless a change explicitly updates the documentation and tests alongside the implementation.
