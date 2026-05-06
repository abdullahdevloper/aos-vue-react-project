# React Parallel Build Progress

Last updated: 2026-05-06

## Strategy Status

The previous React output is treated as an unapproved prototype.

Current rebuild strategy:

- Rebuild section by section with high visual fidelity.
- Do not move to the next section until the current section is approved by the user.
- Active section: UI Components only.

## Current Slice

- Scope: UI Components Shell + Charts pages
- Status: approved by user
- UI Components / Charts: approved
- Widgets: not started
- Vuetify: not started
- Style & User Interface: not in scope
- Pages and Dashboard rebuild: not in scope beyond the shell required for Charts

## Implemented Routes

- `/charts/chartjs`
- `/charts/spark-line`
- `/charts` redirects to `/charts/chartjs`
- `/` redirects to `/charts/chartjs` for this focused slice

## Implemented UI Components Shell

- Left app sidebar modeled on the Vue UI Components section.
- `UI Components` section label.
- Expanded `Charts` parent item.
- `Spark Line` and `ChartJS` children.
- Compact 282px drawer with section headers, nested items, and expanded Charts group.
- Teal/cyan primary color, compact typography, and Vue/Vuetify-like menu density.
- Neumorphic raised shell surfaces based on the Vue `neu-glow` token.
- Rounded inset active navigation pills based on the Vue `neu-glow-inset` token.
- Circular soft icon buttons in the top toolbar and example cards.
- Main content area with Vuse pale gray `#f2f3f7` background and Vue-like spacing.

## Visual Correction Pass

Completed after auditing the React Charts slice against the Vue app shell, Chart pages, doc/example components, and Vuse SCSS tokens.

Applied Vuse visual tokens:

- `#f2f3f7` light dashboard background.
- 4px root radius.
- Teal primary color.
- `neu-glow` raised shadows.
- Inset active states.
- Compact 280px-style drawer.
- Section header built from a transparent toolbar-like layout plus raised avatar.

Visual fixes completed:

- Reworked the React theme away from generic MUI dashboard styling.
- Reworked the app shell, drawer, toolbar, sidebar active state, and footer note.
- Reworked `VuseSectionDefinition` to match the Vue transparent section header composition.
- Reworked chart example cards to resemble Vue `Example.vue`: dense toolbar, source/actions, transparent demo body, and soft inset card surface.
- Reworked ChartJS and SparkLine pages to stack examples full-width like Vue `DocPage`, instead of a generic two-column dashboard grid.
- Added examples intro copy to mirror the Vue documentation/demo flow.

## Implemented Charts Pages

### ChartJS

Route: `/charts/chartjs`

Examples implemented:

- Simple Bar
- Horizontal Bar
- Simple Line
- Filled Line
- Pie Chart
- Doughnut Chart
- Radar Chart
- Polararea Chart
- Bubble Chart
- Scatter Chart

### Spark Line

Route: `/charts/spark-line`

Examples implemented:

- Playground
- Fill
- Heart Rate
- Dashboard Card
- Sales Card

## Build

- Command: `npm run build`
- Working directory: `react-dashboard-template/`
- Result: passed
- Notes: Vite reported a non-failing chunk-size warning for the generated JS bundle.

## Protected Files

Verification command:

`git status --short -- src public scripts package.json package-lock.json babel.config.js vue.config.js webpack.config.js README.md AGENTS.md`

Result: no output. No protected Vue/root files or `AGENTS.md` were modified.

## Remaining Gaps

- Charts visual review approved by user.
- Widgets are intentionally not implemented in this slice.
- Vuetify is intentionally not implemented in this slice.
- The Vuetify documentation shell and API explorer remain future work.
- The app shell currently includes only the UI Components Charts group needed for this approved slice.

## Latest Charts Visual Tuning

Status: approved by user.

Completed:

- Reduced example-card shadow strength so the documentation surfaces are lighter and less framed.
- Reduced top-right example action button size, opacity, and visual weight.
- Reduced source/footer path prominence with smaller text, lower opacity, and tighter footer padding.
- Added descriptive copy above the Simple Line chart to better match the Vue documentation/example structure.
- Tightened chart card padding, vertical spacing, intro typography, and chart heights.
- Kept the full-width documentation-style layout.
- Did not implement Widgets, Vuetify, Style & User Interface, or Pages.

## Exact Vue Fidelity Pass

Status: approved by user.

Completed:

- Removed visible source/footer paths from chart example cards.
- Removed the `Simple Line` heading.
- Set the Simple Line visible paragraph exactly to: `A line chart is a way of plotting data points on a line. Often, it is used to show trend data, and the comparison of two data sets.`
- Changed `Filled Line` heading to exactly `Filled Line Chart`.
- Further reduced example-card chrome with subtler inset shadow, no footer divider/path area, and tighter body padding.
- Reduced top-right action icons to smaller, lower-opacity controls.
- Preserved full-width documentation-style layout and Vue-like chart datasets/proportions.

## Final Charts Scale And Density Pass

Status: approved by user.

Completed:

- Increased overall Charts page scale so React no longer reads as compressed compared with Vue.
- Increased section title, examples heading, and body text sizes.
- Increased chart card body padding and vertical rhythm.
- Increased chart canvas heights/presence across ChartJS examples.
- Increased SparkLine example block heights to feel roomier.
- Increased spacing between full-width documentation examples.
- Preserved previous fixes: no source/footer paths, minimal top-right icons, subtle documentation surfaces, pale Vuse background, and Vue-like datasets.
- Did not implement Widgets, Vuetify, Style & User Interface, or Pages.
