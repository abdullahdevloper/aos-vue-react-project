# Codex Instructions

## Goal

Create a parallel React version of this Vue/Vuetify dashboard UI template.

## Absolute Rules

- The existing Vue project is read-only.
- Do not delete Vue files.
- Do not rename Vue files.
- Do not move Vue files.
- Do not refactor Vue files.
- Do not edit existing Vue files.
- All React output must go inside: react-dashboard-template/
- All reports must go inside: migration-docs/
- Do not modify AGENTS.md unless explicitly instructed.
- Before finishing each phase, run: git status --short -- src public scripts package.json package-lock.json babel.config.js vue.config.js webpack.config.js README.md
## Target Stack

- React
- TypeScript
- Vite
- MUI
- React Router
- Zustand
- react-chartjs-2
- chart.js
- fuse.js

## Workflow

Work in phases.

After every phase:
1. Run build if React project exists.
2. Update migration-docs/progress.md.
3. Update migration-docs/phase-report.md.
4. List completed files.
5. List failed or skipped items.
6. Confirm whether any Vue file was modified.

If any Vue file was modified, revert it immediately.

## Done Means

- react-dashboard-template builds successfully.
- All 49 Vue components have React equivalents or documented exceptions.
- Vue project remains unchanged.



## Protected Paths

Do not modify these existing Vue project files or folders:

- src/
- public/
- scripts/
- package.json
- package-lock.json
- babel.config.js
- vue.config.js
- webpack.config.js
- README.md

## Command Rules

- Do not run npm install from the repository root.
- Do not run npm run build from the repository root.
- All npm commands must be executed inside react-dashboard-template/.
- If react-dashboard-template/package.json does not exist, create it first.
- Only modify files inside:
  - react-dashboard-template/
  - migration-docs/