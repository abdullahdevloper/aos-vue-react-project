# Phase Report

Last updated: 2026-05-09

## Phase

Style & User Interface / Programmatic Scrolling implementation.

Status: implemented; pending user visual approval.

Approval:

- UI Components / Charts = approved
- UI Components / Widgets = approved
- UI Components / Vuetify / Api Explorer = approved
- UI Components / Vuetify / Alerts = approved
- UI Components / Vuetify / Avatars = approved
- UI Components / Vuetify / Badges = approved
- UI Components / Vuetify / Banners = not started; intentionally paused
- Pages section = approved
- Global Sidebar Navigation = approved
- Style & User Interface / Color = route preserved
- Style & User Interface / Icons = route preserved
- Style & User Interface / Helpers = route preserved
- Style & User Interface / Border Radius = route preserved
- Style & User Interface / Text & Typography = route preserved
- Style & User Interface / Motion = route preserved
- Style & User Interface / Programmatic Scrolling = implemented; pending user visual approval
- Style & User Interface / Forms = not started

## Completed Files

- `migration-docs/progress.md`
- `migration-docs/phase-report.md`
- `react-dashboard-template/src/App.tsx`
- `react-dashboard-template/src/data/uiComponentsNavigation.tsx`
- `react-dashboard-template/src/pages/style-ui/ScrollPage.tsx`

## Verification Table

| Item | Vue expected | React implemented | Match level | Notes |
|---|---|---|---|---|
| Route | `/scroll` renders inside the dashboard app shell | `/scroll` added inside `DashboardRoute` | High | Forms remains pending |
| Sidebar entry | Style & User Interface > Programmatic Scrolling | Programmatic Scrolling linked to `/scroll` | High | Approved Style UI routes preserved |
| Page header hierarchy | `VuseSectionDefinition` title `Scroll`, namespace `Styles`, breadcrumb `User Interface > Scroll`, followed by `# Programmatic Scrolling` | React renders the same section title, namespace, breadcrumb labels, and main content heading | Pending visual review | Uses existing Vuse docs shell |
| Documentation intro | Exact `headingText` from `src/lang/en/styles/Scroll.json` with inline code tokens | React renders exact text and Vue-like inline code styling for `goTo` and `$vuetify` | Pending visual review | Inline code follows Vue markdown styling |
| Usage description | Vue `Example.vue` renders usage `desc` inside the example body | React usage description appears inside the example body before controls | Pending visual review | Header remains title/actions only |
| Target controls | Heading `Target`, row radio group for `Number`, `Selector`, `DOMElement`, and conditional field/select | React implements the same radio group and conditional Number/Selector/DOMElement controls | High | Defaults match Vue source |
| Options controls | Heading `Options`, Easing select, Duration slider 0-1000, Offset slider -500-500 | React implements all controls with Vuetify easing pattern names and matching defaults | High | Slider value labels are visible like Vue thumb labels |
| Scroll action | Full-width primary `scroll` button calls `$vuetify.goTo(target, options)` | React button performs smooth scrolling for numeric, selector, and element targets using selected duration/easing/offset | Pending visual review | Targets dashboard main scroll container |
| Element targets | Vue can scroll to Button or Radio group refs | React maps `Button` to the scroll button ref and `Radio group` to the Target heading ref | High | Matches visible choices |
| Router section | `Using with router` text and `js_import_goto_router` code snippet | React renders exact router text and local snippet content | High | Link markdown rendered visually |
| Anchor content | Sections `First`, `Second`, `Third`, each followed by three lorem ipsum paragraphs | React renders all three anchors with repeated exact Vue lorem ipsum text | High | Provides selector targets and long scroll area |
| Example actions | Invert colors, View on Github, View source | React implements invert body color, visual GitHub action, and source expansion | High | Shared docs behavior preserved |
| Responsive layout | Vue `v-container`, `v-row`, `v-col cols=12`; controls stack full-width | React controls are full-width stacked like Vue | High | No arbitrary custom breakpoints beyond matching stacked layout |
| Visual identity | Pale Vuse background, soft inset example surface, Vuetify-like controls and typography | React uses Vuse docs shell, soft inset example card, teal accent controls, and Vue-scale docs text | Pending visual review | Needs user screenshot comparison before approval |

## Scroll Behavior Verification

| Scroll feature | Vue expected behavior | React before fix | React after fix | Match level | Notes |
|---|---|---|---|---|---|
| Number target | `target()` returns `Number(number)` and `goTo` computes `getOffset(number) - offset` | React added offset to the numeric target | React computes `number - offset` | High | Default `9999` still scrolls to bottom through native scroll clamping |
| Selector target | `target()` returns selector string; Vuetify uses `document.querySelector`, cumulative target offset, minus cumulative container offset, minus offset | React queried inside page and used direct `offsetTop - container.offsetTop`, then added offset | React uses `document.querySelector`, cumulative offsets, container offset subtraction, and subtracts offset | High | Matches Vuetify `getOffset(target) - getOffset(container) - offset` formula |
| DOMElement target | `target()` resolves computed `element` to Button or Radio group ref; Vuetify handles HTMLElement cumulative offset | React selected refs but used direct offset math and added offset | React resolves Button/Radio refs and uses cumulative HTMLElement offset math | High | The visible select choices remain `Button` and `Radio group` |
| Duration | Vuetify duration controls `requestAnimationFrame` progress; `0` jumps immediately | React used duration but with clamped target and non-Vuetify offset math | React uses Vuetify-style `performance.now`, `requestAnimationFrame`, and immediate jump for duration `0` | High | Uses selected duration 0-1000 |
| Offset | Vuetify subtracts `offset` from final target location | React added offset, reversing behavior | React subtracts offset for all target modes | High | Positive offset stops before target; negative offset moves past target |
| Easing | Easing name maps to Vuetify `easing-patterns`; missing easing throws | React easing math matched names but target math was wrong | React uses the same easing formulas and selected easing names | High | Local implementation mirrors Vuetify source |
| Scroll container | Vue default is `document.scrollingElement`; React dashboard has the scrollable area on `<main>` because body is hidden | React used `<main>` but with incorrect target formula | React keeps `<main>` as the effective container and applies Vuetify's container-relative formula | High | This is the React-shell equivalent of Vue's visible page scroll area |
| Button click | Vue `scroll` button calls `$vuetify.goTo(target, options)` | React called custom scroll with inaccurate option semantics | React click resolves target/options and runs Vuetify-equivalent behavior | High | Existing button label and controls preserved |
| Active/selected controls | Radio/select/slider values update target and options before click | React controls updated state correctly | Preserved | High | No visual/control behavior changed |
| Router example | Documentation-only router snippet shown below usage | Implemented as documentation-only snippet | Preserved | High | No click behavior expected in Vue source |


## Build

- Command: `npm run build`
- Working directory: `react-dashboard-template/`
- Result: passed.
- Notes: Vite reported the existing non-failing generated JS chunk-size warning.

## Skipped Or Deferred

- Forms: not implemented by active scope.
- Vuetify Banners and later Vuetify batches: not implemented by active scope.
- Pages, Charts, Widgets, and other Style UI pages: preserved; not modified for content.

## Visual Mismatch Learning Checklist

- Example header/body placement must match Vue exactly; do not place documentation text in the white example header when Vue shows it in the example body.
- Section header hierarchy must match Vue exactly: section title, namespace/category, breadcrumb trail, then page content heading.
- Example card height and body spacing must be compared against Vue before visual review; avoid compressed cards.
- Usage documentation text must appear in the same location as Vue.
- Inline code styling must match Vue markdown styling, including tokens such as `transition`, `$primary-transition`, `v-speed-dial`, and `v-expand-x-transition`.
- Use exact Vue language strings from `src/lang/en/styles/*.json`; do not replace code tokens with representative plain text.
- Light/default and inverted/dark states must both be verified before approval.
- Dark/inverted examples must use Vue-like dark body, input, list/card, divider, checkbox, and progress surfaces instead of default white MUI surfaces.
- Todo/list/card examples must keep shadows subtle; avoid heavy neumorphic glow when Vue uses darker, flatter surfaces.
- Verify spacing between input, title, counters, progress, and list rows against the Vue page before asking for visual approval.
- Preserve existing behavior while correcting visual mismatch: add-on-enter, checkbox transitions, counts, progress, row animation, View source, and Invert example color.

## Protected Files

No protected Vue/root files or `AGENTS.md` were modified.
