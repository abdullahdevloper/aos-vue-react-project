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
- Before finishing each phase, run: git status --short -- src public scripts package.json package-lock.json babel.config.js vue.config.js webpack.config.js README.md AGENTS.md
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
- Each section is rebuilt with high visual fidelity before moving to the next section.
- A section is not complete until the user visually approves it.
- Vue project remains unchanged.
- Protected Vue/root files remain unchanged.


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
- AGENTS.md

## Command Rules

- Do not run npm install from the repository root.
- Do not run npm run build from the repository root.
- All npm commands must be executed inside react-dashboard-template/.
- If react-dashboard-template/package.json does not exist, create it first.
- Only modify files inside:
  - react-dashboard-template/
  - migration-docs/


## Vuse Visual Fidelity Rules

The goal is not a generic React/MUI dashboard.

The React version must preserve the Vuse Admin Template visual identity:

- Neumorphic / soft UI design
- soft raised cards with subtle shadows
- pale gray dashboard background
- white or near-white card surfaces in light theme
- dark neumorphic surfaces in dark theme when applicable
- cyan/teal primary accent
- compact left sidebar with section headers
- nested expandable menu groups
- rounded active navigation pills
- circular soft icon buttons
- Vue/Vuetify-like spacing, typography, and density
- chart cards and widget cards matching the original Vuse composition
- no generic MUI demo pages unless visually adapted to Vuse

Official visual reference:
ThemeForest item: Vuse: VueJs CLI Material Admin