# Codex Instructions

## Project Goal

Create a parallel React version of the original Vue/Vuetify dashboard template:

Vuse: VueJs CLI Material Admin

The goal is not to create a generic React dashboard.
The goal is to reproduce the original Vue/Vuse template in React with high visual, behavioral, and responsive fidelity.

## Project Structure

Original Vue project:
- Read-only reference implementation.

React output:
- react-dashboard-template/

Migration reports:
- migration-docs/

Project status and slice progress must be tracked in:
- migration-docs/progress.md
- migration-docs/phase-report.md
- migration-docs/*-audit.md
- react-vuse-migration-handoff.md when present

Do not treat AGENTS.md as a progress tracker.
AGENTS.md contains durable project rules only.

---

## Absolute Protection Rules

The existing Vue project is read-only.

Do not modify, delete, rename, move, or refactor any protected Vue/root files or folders.

Protected paths:

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

Do not modify AGENTS.md unless the user explicitly instructs you to update project rules.

All React implementation must stay inside:

- react-dashboard-template/

All reports, audits, and progress notes must stay inside:

- migration-docs/

Before finishing every task, run:

git status --short -- src public scripts package.json package-lock.json babel.config.js vue.config.js webpack.config.js README.md AGENTS.md

If any protected path appears dirty due to the current task, stop and revert only that accidental change.

---

## Command Rules

Do not run npm install from the repository root.

Do not run npm run build from the repository root.

All npm commands must be executed inside:

react-dashboard-template/

Before approving or reporting a slice as ready for user review, run:

cd react-dashboard-template
npm run build

Build warnings are acceptable only if non-blocking and documented.

Do not commit build artifacts unless explicitly required.

Before committing approved work, clean build artifacts from the repository root:

git restore react-dashboard-template/dist react-dashboard-template/tsconfig.tsbuildinfo
git clean -f react-dashboard-template/dist/assets

---

## Required Stack

Use the existing React project stack:

- React
- TypeScript
- Vite
- MUI only when visually adapted to Vuse
- React Router
- Zustand if already used or needed
- react-chartjs-2
- chart.js
- fuse.js

Do not use generic MUI defaults when the Vue/Vuse page has custom styling.

---

## Workflow

Work slice by slice.

Required flow:

1. Audit
2. Implementation
3. Build
4. Report update
5. Protected-path check
6. User visual review
7. User approval
8. Commit
9. Move to the next slice only after approval

A slice is not complete until the user visually approves it.

Do not continue to the next slice without explicit user approval.

---

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
10. Approved slice is committed.

---

## Mandatory Audit Checklist

Before implementing any slice, inspect and document:

- routes
- sidebar entries
- Vue source files
- child components
- props/data used
- images/assets/audio/media
- buttons/actions
- tooltips
- hover states
- click behaviors
- toggles/switches
- filters/search behavior
- checkboxes
- menus/dialogs/tabs
- chart interactions
- form validation
- empty/loading/status states
- responsive layout behavior
- light/dark/inverted behavior where applicable

If any required item cannot be verified, mark it clearly as UNKNOWN and do not treat the slice as complete until resolved or approved as an exception by the user.

---

## Implementation Rule

Do not simplify, summarize, approximate, or replace the Vue slice with a generic React/MUI version.

Every visible element and every visible behavior from the Vue slice must either be:

- implemented in React, or
- explicitly listed as a documented exception pending user approval.

Do not write “representative”, “approximate”, “simplified”, or “similar” implementations when the Vue source contains exact content or behavior.

---

## Literal Vue Fidelity Rule

The React version must reproduce the original Vue/Vuse page as literally as possible.

For every slice, inspect the original Vue source and, when possible, the running Vue page before implementation.

Reproduce the same:

- page hierarchy
- section headers
- breadcrumbs
- documentation text
- inline code styling
- example block structure
- card/header/body layout
- spacing and padding
- typography size and weight
- colors and surfaces
- shadows
- light and inverted/dark states
- buttons and their hover/active/pressed states
- inputs/selects/checkboxes
- labels and placeholders
- animation timing and behavior
- responsive behavior from Vue/Vuetify source

If exact matching is not possible, document why in migration-docs/phase-report.md.

A slice is not ready for review if it contains representative text, approximate layouts, or simplified behavior where the Vue source provides the exact version.

---

## No Approximation Rule

Do not approximate Vue layout, text, spacing, colors, or behavior.

Use exact Vue text, exact Vue layout hierarchy, and exact Vue visual behavior whenever available.

If an exact reproduction is blocked by missing assets, incompatible libraries, or unavailable data, document:

- what is missing
- why it could not be matched
- what React uses instead
- whether user approval is required

---

## Vuse Visual Fidelity Rules

The React version must preserve the Vuse Admin Template visual identity:

- neumorphic / soft UI design
- soft raised cards with subtle shadows
- pale gray dashboard background, typically #F2F3F7
- white or near-white card surfaces in light theme
- dark neumorphic surfaces in dark/inverted examples when applicable
- cyan/teal primary accent
- compact left sidebar with section headers
- nested expandable menu groups
- rounded active navigation pills
- circular soft icon buttons
- Vue/Vuetify-like spacing, typography, and density
- chart cards and widget cards matching original Vuse composition
- no generic MUI demo pages unless visually adapted to Vuse

---

## Visual Fidelity Gate

For every implemented slice, compare React against the running Vue page.

Comparison must use:

- same viewport size
- same browser zoom
- same route
- same sidebar state
- same scroll position
- same light/dark/inverted state where applicable

Verify:

- page width
- content container width
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
- source/code panels
- invert example color behavior

A slice is not ready for user review until scale, spacing, and behavior are checked against Vue.

---

## Responsive Fidelity Gate

React must follow the original Vue/Vuetify responsive behavior.

Before implementing or approving any slice, inspect the Vue source for:

- Vuetify breakpoints used by the page
- v-container behavior
- v-row behavior
- v-col behavior
- responsive props such as cols, sm, md, lg, xl
- hidden/show behavior by breakpoint
- sidebar state changes
- card wrapping behavior
- chart/media resizing behavior
- typography/spacing changes by screen size

Do not impose arbitrary breakpoints if the Vue source does not use them.

Use common viewport sizes only as test samples, not as design requirements.

If the original page has no special mobile/tablet behavior, React should preserve that and document it.

---

## Visual Mismatch Learning Rule

Whenever the user identifies a visual or behavioral mismatch between React and the original Vue page, treat it as a reusable rule for future slices.

For every mismatch found:

1. Fix it in the current slice.
2. Add it to the future verification checklist.
3. Avoid repeating the same mismatch in later pages.
4. Document the mismatch and fix in migration-docs/phase-report.md.

Reusable mismatch rules discovered so far:

- Documentation text must appear in the same location as Vue.
- Example body/header structure must match Vue.
- Section header hierarchy must match Vue.
- Usage documentation text must appear in the same location as Vue.
- Inline code tokens must match Vue markdown/code styling.
- Example card height and body spacing must match Vue.
- Dark/inverted examples must use the same surface colors as Vue.
- Light/default and inverted/dark states must both be verified before approval.
- Fixing inverted/dark state must not break default/light state.
- Inputs must match Vue placeholder/label behavior.
- Buttons must match Vue hover/active/pressed states.
- Select/dropdown labels must not overlap.
- Typography scale and spacing must match Vue.
- Todo/list/card surfaces must match Vue light/dark styling.
- React must not use generic MUI defaults when Vue has custom Vuetify/Vuse styling.

---

## Example Block Fidelity Rule

For documentation/example pages, React must preserve Vue example block structure.

Verify:

- title placement
- action icons placement
- description placement
- body surface color
- body height
- body padding
- source/code panel behavior
- invert example color behavior
- light and inverted/dark states

If Vue places documentation text inside the example body, React must do the same.

If Vue places documentation text in the header, React must do the same.

Do not move documentation text to a different visual region.

---

## Inline Code Styling Rule

Inline code tokens in documentation text must match Vue markdown/code styling.

Examples:

- transition
- $primary-transition
- v-alert
- cols
- sm
- md

Expected style:

- monospace font
- red or accent text like Vue
- pale red/pink background where Vue uses it
- compact rounded chip-like inline appearance
- same baseline alignment as surrounding text

Do not render inline code as plain text when Vue styles it.

---

## Light/Dark Mode-Aware Styling Rule

Do not apply dark/inverted styling globally.

When an example supports Invert example color:

- default/light mode must match Vue default state
- inverted/dark mode must match Vue inverted state
- input/list/card/checkbox/text/shadow colors must be mode-aware
- both states must be visually checked before marking the slice ready

Fixing one mode must not break the other.

---

## Motion Todo Example Rule

For Motion Todo examples, preserve Vue structure and mode-specific styling.

Verify:

- description location matches Vue
- body height matches Vue content density
- input surface matches the current mode
- todo list surface matches the current mode
- row surface matches the current mode
- checkbox styling matches Vue
- glow/shadow is not excessive
- spacing between input, title, counters, progress, and rows matches Vue

Preserve behavior:

- add task on Enter
- remaining/completed counts
- progress
- checkbox transition
- row animations

---

## Sidebar Fidelity Rule

The React sidebar must structurally and visually match the original Vue sidebar.

Required:

- original section order
- section labels
- nested groups
- expand/collapse behavior
- active-route behavior
- hover behavior
- icon size
- text size
- indentation
- spacing
- active soft inset pill
- disabled or pending entries for unimplemented routes

Do not hide unimplemented sections if Vue shows them.
Show them as pending/disabled unless the user requests otherwise.

Approved page content must not be modified during sidebar-only work.

---

## Verification Rule

After implementation, update migration-docs/phase-report.md with a verification table:

| Item | Vue expected | React implemented | Match level | Notes |
|---|---|---|---|

The report must include:

- implemented route
- implemented sections
- implemented behaviors
- responsive/layout verification
- affected files
- remaining gaps
- build status
- protected files status
- confirmation that unrelated approved slices were not touched

The slice remains pending until the user visually approves it.

---

## Approved Slice Protection Rule

Do not modify approved slices unless strictly required for shared routing, shared layout, or navigation safety.

If an approved slice is touched, document:

- why it was necessary
- what changed
- how it was verified not to regress

Avoid broad refactors during slice implementation.

---

## Vuetify Pause Rule

Vuetify work is paused unless the user explicitly requests continuation.

Approved Vuetify slices may remain in the project, but do not continue Banners or later Vuetify batches unless instructed.

---

## Documentation and Reports

migration-docs/progress.md must track high-level status.

migration-docs/phase-report.md must track the latest slice details, verification, mismatches, and remaining gaps.

Audit files must be created before section implementation.

Examples:

- migration-docs/widgets-audit.md
- migration-docs/vuetify-batch-a-audit.md
- migration-docs/pages-audit.md
- migration-docs/style-ui-audit.md

Do not store durable progress only in chat.

---

## Build and Commit Discipline

Every implemented slice must build before being reported.

Build command:

cd react-dashboard-template
npm run build

Before commit, from repository root:

git restore react-dashboard-template/dist react-dashboard-template/tsconfig.tsbuildinfo
git clean -f react-dashboard-template/dist/assets

Commit only after user approval.

Recommended commit format:

approve <section> <slice> slice

Examples:

- approve style ui color slice
- approve style ui icons slice
- approve pages login slice

Rule changes should be committed separately from implementation changes when possible.

---

## Current Continuation Practice

Before starting work in a new session, read:

- AGENTS.md
- react-vuse-migration-handoff.md if present
- migration-docs/progress.md
- migration-docs/phase-report.md
- relevant migration-docs/*-audit.md

Then continue only from the next pending slice.

Do not infer current status from memory.
Use Git history and migration-docs as the source of truth.

---

## Runtime Notes

Vue original project may require Node 12.22.12 due to legacy dependencies such as fibers/http_parser.

React project should use the working modern Node version available in the environment.

Do not mix Vue and React npm commands.

Vue commands belong to the original Vue root only when needed for visual comparison.

React commands belong inside react-dashboard-template/.