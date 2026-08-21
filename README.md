# agentic-coding

## Self-paced course

The Claude Code learning course lives in [`course/`](course/). The repository landing page routes visitors to the course, presentation, and presenter notes. It is a static GitHub Pages site with hash-based deep links, deterministic exercises, and no backend or API key requirement.

Run it locally:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/course/` for the course or `http://localhost:8000/site/` for the landing-page source.

The `main` branch deploys `course/` automatically through [GitHub Pages](https://pages.github.com/).
