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


## Section Completion Gate

No section or slice is complete until all of the following are done:

1. Source audit completed.
2. Visual audit completed.
3. Behavior audit completed.
4. Data/assets audit completed.
5. Routes/sidebar audit completed.
6. Implementation completed only for the approved active slice.
7. Build passed inside react-dashboard-template/.
8. Protected Vue/root files remain unchanged.
9. User visually approves the result.

## Mandatory Audit Checklist

Before implementing any slice, document:

- all routes
- all sidebar entries
- all Vue source files
- all child components
- all props/data used
- all images/assets/audio/media
- all buttons/actions
- all tooltips
- all hover states
- all click behaviors
- all toggles/switches
- all filters/search behavior
- all checkboxes
- all menus/dialogs/tabs
- all chart interactions
- all responsive layout behavior
- all empty/loading/status states if present

If any item cannot be verified, mark it clearly as UNKNOWN and do not implement until resolved.

## Implementation Rule

Codex must not simplify, summarize, or approximate the slice.

Every visible element and every visible behavior from the Vue slice must either be:
- implemented in React, or
- explicitly listed as a documented exception pending user approval.

## Verification Rule

After implementation, Codex must produce a verification table:

| Item | Vue behavior | React status | Notes |
|---|---|---|---|

The slice remains pending until the user approves it visually.


## Section Audit Requirements

Before implementing any section, audit must include:

- routes and pages
- child components
- shared data and assets
- visual layout
- typography, spacing, shadows, colors
- all visible action buttons
- tooltips
- click behavior
- hover behavior
- toggle/invert/dark behavior
- expand/collapse behavior
- tabs, dialogs, filters, search, menus
- responsive behavior
- any interactive behavior visible in the running Vue app

A section must not be implemented until its behavior audit is complete.
A section must not be approved until visual behavior and interactions are reviewed by the user.


## Visual Fidelity Gate

For every implemented slice, Codex must compare the React page against the running Vue page.

The comparison must include:

- same viewport size
- same browser zoom
- same route
- same sidebar state
- same scroll position
- same light/dark/inverted state where applicable

Codex must verify:

- page width and content container width
- card width and height
- typography scale
- line-height
- padding and margins
- section spacing
- button size and states
- input/select height and label position
- icon size and alignment
- chart/canvas dimensions
- shadows and background colors
- hover/click/toggle behavior
- visible documentation text

A slice is not ready for user review until scale, spacing, and behavior are checked against Vue.

React must not rely on generic MUI default sizing. Override MUI styles locally when needed to match the Vue/Vuse page.


## Responsive Fidelity Gate

React must follow the original Vue/Vuetify responsive behavior.

Before implementing or approving any slice, Codex must inspect the original Vue source to identify:

- Vuetify breakpoints used by the page
- v-container / v-row / v-col layout behavior
- responsive props such as cols, sm, md, lg, xl
- hidden/show behavior by breakpoint
- sidebar state changes
- card wrapping behavior
- chart/media resizing behavior
- typography/spacing changes by screen size

Do not impose arbitrary breakpoints if the Vue source does not use them.

Use common viewport sizes only as test samples, not as design requirements.

If the original page has no special mobile/tablet behavior, React should preserve that behavior and document it.


## Visual Mismatch Learning Rule

Whenever the user identifies a visual or behavioral mismatch between React and the original Vue page, Codex must treat it as a reusable rule for future slices.

For every mismatch found, Codex must:
1. Fix it in the current slice.
2. Add it to the verification checklist for future slices.
3. Avoid repeating the same mismatch in later pages.
4. Document the mismatch and fix in migration-docs/phase-report.md.

Examples of reusable mismatch rules:
- Documentation text must appear in the same location as Vue.
- Example body/header structure must match Vue.
- Dark/inverted examples must use the same surface colors as Vue.
- Inputs must match Vue placeholder/label behavior.
- Buttons must match Vue hover/active/pressed states.
- Select/dropdown labels must not overlap.
- Typography scale and spacing must match Vue.
- Todo/list/card surfaces must match Vue light/dark styling.
- React must not use generic MUI defaults when Vue has custom Vuetify/Vuse styling.