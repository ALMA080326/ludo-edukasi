# Project Guide

## Architecture

This is a framework-free static game deployed on Netlify. The complete game flow and question bank live in `index.html`; visual overrides and responsive behavior live in `assets/css/game.css`. Audio feedback is served as static MP3 files from `assets/audio/`.

## Key Directories

- `index.html`: page markup, question data, and client-side game state
- `assets/css/`: visual design, animations, and breakpoints
- `assets/audio/`: correct and incorrect answer sound effects
- `.netlify/`: platform-generated context and task results

## Conventions

- Keep the application dependency-free unless a feature clearly requires a library.
- Preserve Indonesian UI copy and the five group color mapping.
- Use CSS custom properties from `assets/css/game.css` for palette changes.
- Animate only transforms and opacity where possible.
- Keep controls keyboard accessible and provide visible focus styles.
- Audio must remain optional through the existing sound toggle.

## Non-obvious Decisions

The uploaded HTML already contained the full bank of questions and game rules, so it was retained instead of replacing it with a generic starter template. Uploaded audio was moved into public static files rather than embedded as base64, reducing document size and allowing long-lived browser caching.
