# Directives Section Audit

Status: audit complete; implementation not started.

Scope:

- Directives / Click Outside
- Directives / Intersect
- Directives / Mutate
- Directives / Resizing
- Directives / Ripples
- Directives / Scrolling

Out of scope:

- Vuetify continuation.
- animations.
- Dashboard.
- App Contacts / Chat.
- approved slices.
- `.claude/`.

## Vue Sidebar

Source: `src/config/navigation-items.js`

Vue sidebar structure:

- Directives
  - Directives
    - Click Outside, badge `new`
    - Intersect
    - Mutate
    - Resizing
    - Ripples
    - Scrolling

The Directives group appears after UI Components and before Guide. The parent icon is `mdi-function`.

## Vue Routes

Source: `src/router/routes/vuetify.js`

| Page | Vue route | Vue route name | Vue source | Shell |
|---|---|---|---|---|
| Click Outside | `/directives/click-outside` | `directives/ClickOutside` | `src/views/Vuetify/Directives/ClickOutside.vue` | `navs: true` |
| Intersect | `/directives/Intersect` | `directives/Intersect` | `src/views/Vuetify/Directives/Intersect.vue` | `navs: true` |
| Mutate | `/directives/mutate` | `directives/Mutate` | `src/views/Vuetify/Directives/Mutate.vue` | `navs: true` |
| Resizing | `/directives/resizing` | `directives/Resizing` | `src/views/Vuetify/Directives/Resizing.vue` | `navs: true` |
| Ripples | `/directives/ripples` | `directives/Ripples` | `src/views/Vuetify/Directives/Ripples.vue` | `navs: true` |
| Scrolling | `/directives/scrolling` | `directives/Scrolling` | `src/views/Vuetify/Directives/Scrolling.vue` | `navs: true` |

Note: Vue uses uppercase `Intersect` in the route path for Intersect.

## Shared Docs Shell

Sources:

- `src/demo/components/DocPage.vue`
- `src/demo/components/Example.vue`
- `src/demo/components/Examples.vue`
- `src/demo/components/Usage.vue`
- `src/demo/components/DocText.vue`
- `src/demo/components/DocMarkup.vue`

All Directives pages use the same docs shell pattern:

- `vuse-section-definition` with `title`, `namespace="Directives"`, and breadcrumbs.
- `v-container fluid`.
- `doc-page` with heading text, optional usage example, examples list, and example blocks.
- Example card shell:
  - `neu-glow-inset` card.
  - Dense transparent toolbar.
  - example title.
  - optional `New in` chip.
  - action icons:
    - Invert example colors when not in global dark theme.
    - View on Github.
    - View source.
  - source panel expands with dark `#2d2d2d` surface.
  - source panel has tabs for `template`, `style`, and `script` when present.
  - example body can be inverted/dark unless the language JSON sets `uninverted: true`.

React target should reuse the existing React Vuetify docs/example primitives where possible, but must not continue paused Vuetify content beyond these Directives pages.

## Documentation Text Sources

Sources:

- `src/lang/en/directives/ClickOutside.json`
- `src/lang/en/directives/Intersect.json`
- `src/lang/en/directives/Mutate.json`
- `src/lang/en/directives/Resizing.json`
- `src/lang/en/directives/Ripples.json`
- `src/lang/en/directives/Scrolling.json`

The React Directives pages must preserve exact visible text, inline code styling, markdown links, headings, example descriptions, option labels, and `uninverted` behavior from these JSON files.

## Page Inventories

### Click Outside

Vue page source:

- `src/views/Vuetify/Directives/ClickOutside.vue`

Route:

- `/directives/click-outside`

Breadcrumbs:

- `Directives` -> `/directives/Intersect`
- `Click Outside`

Examples:

- Usage: `src/demo/examples/click-outside/usage.vue`
- Conditional handler: `src/demo/examples/click-outside/close-conditional.vue`

Visible behavior:

- Usage card:
  - 256px by 256px rounded-xl card centered.
  - Text starts as `Click Me`.
  - Clicking card sets active state.
  - Active state changes card color to primary, dark text mode, and text to `Click Outside`.
  - Clicking outside the card resets active state.
- Conditional handler example:
  - `v-list` with two rows:
    - `Default Click Outside`
    - `Default w/ Close Conditional`
  - Each row has a right `mdi-record` icon.
  - Icon is green when the model is active and red when inactive.
  - Clicking a row sets its model active.
  - Outside click resets the standard row.
  - Conditional outside click calls `closeConditional()` and only resets when `models.conditional` is true.

Interactions:

- Card click.
- Outside click.
- List row click.
- Conditional outside click behavior.
- View source.
- View on Github.
- Invert example color unless blocked by global dark mode.

Responsive behavior:

- Uses docs shell fluid container and example cards.
- Usage card remains fixed 256px square.
- Example body stacks naturally with Vuetify container/card behavior.

### Intersect

Vue page source:

- `src/views/Vuetify/Directives/Intersect.vue`

Route:

- `/directives/Intersect`

Breadcrumbs:

- `Directives` -> `/directives/Intersect`
- `Intersect`

Examples:

- Usage: `src/demo/examples/intersect/usage.vue`
- With options: `src/demo/examples/intersect/simple/options.vue`

Visible behavior:

- Usage and options examples both show:
  - A 32px circular avatar/dot above the scroll area.
  - Dot color changes from `red darken-2` to `green lighten-1`.
  - A 400px max-height vertical scroll region.
  - A 200vh internal area.
  - A centered card with `Card title` and text.
- Usage example:
  - `v-intersect="onIntersect"`.
  - Dot turns green when the card intersects the scroll viewport.
- Options example:
  - `v-intersect` receives `handler` and `options.threshold: [0, 0.5, 1.0]`.
  - Dot turns green only when `intersectionRatio >= 0.5`.

Documentation extras:

- `polyfillHeading`: `## Polyfill`
- `polyfillText1` describes Intersection Observer polyfill for IE11.
- Options table includes `modifiers.once`, `modifiers.quiet`, and `value`.

Interactions:

- Scroll inside example viewport.
- Intersection-driven dot color state.
- View source.
- View on Github.
- Invert example color.

Responsive behavior:

- Scroll viewport remains max-height 400px.
- Card max-width 336px.
- Dot remains centered.

### Mutate

Vue page source:

- `src/views/Vuetify/Directives/Mutate.vue`

Route:

- `/directives/mutate`

Breadcrumbs:

- `Directives` -> `/directives/Intersect`
- `Mutate`

Examples:

- Usage: `src/demo/examples/mutate/usage.vue`
- Modifiers: `src/demo/examples/mutate/simple/once.vue`

Snippet/code-panel sources:

- `src/demo/snippets/html/directive_mutate.txt`
- `src/demo/snippets/html/directive_mutate_attr.txt`
- `src/demo/snippets/html/directive_mutate_child.txt`
- `src/demo/snippets/html/directive_mutate_char.txt`
- `src/demo/snippets/html/directive_mutate_sub.txt`
- `src/demo/snippets/html/directive_mutate_once.txt`

Visible behavior:

- Usage example:
  - `Content` text field, default `Hello, world!`.
  - Sheet bound with `v-mutate="onMutate"` displays the content.
  - `Total mutations: {{ mutations }}` increments when the bound DOM updates.
- Modifiers example:
  - Centered `Change Content` button.
  - Two columns on `md` and up; stacked on smaller screens.
  - Card 1 title `Card 1`, mutation count, card text.
  - Card 2 title `Card 2 (w/ once modifier)`, mutation count, card text.
  - Button toggles extra paragraph content.
  - Card 1 mutation count increments on each content change.
  - Card 2 uses `v-mutate.once`, so it increments once and then stops.

Documentation/options:

- Options table includes `modifiers.once`, `modifiers.attr`, `modifiers.child`, `modifiers.char`, `modifiers.sub`, and `value`.
- Usage documentation contains inline directive examples such as `v-mutate.attr.sub="onMutate"`.

Interactions:

- Text input mutation.
- Change Content button.
- Mutation counters.
- Once modifier behavior.
- View source.
- View on Github.
- Invert example color.

Responsive behavior:

- Modifiers example uses `v-container`, `v-row`, `v-col cols="12" md="6"`.

### Resizing

Vue page source:

- `src/views/Vuetify/Directives/Resizing.vue`

Route:

- `/directives/resizing`

Breadcrumbs:

- `Directives` -> `/directives/Intersect`
- `Resizing`

Examples:

- Usage: `src/demo/examples/resizing/usage.vue`

Visible behavior:

- `v-row v-resize="onResize"` with center alignment.
- Shows `Window Size` subheader and live object `{ x, y }`.
- `mounted()` calls `onResize()` once to initialize values.
- Resizing the window updates `x: window.innerWidth` and `y: window.innerHeight`.

Documentation/options:

- Usage example JSON sets `uninverted: true`, so the example should not invert/darken.
- Options include:
  - `modifiers.quiet`
  - `value`

Interactions:

- Window resize.
- View source.
- View on Github.
- Invert action should respect `uninverted` behavior if Vue suppresses dark body styling for the example content.

Responsive behavior:

- Example is centered in a row.
- Values update to actual viewport size.

### Ripples

Vue page source:

- `src/views/Vuetify/Directives/Ripples.vue`

Route:

- `/directives/ripples`

Breadcrumbs:

- `Directives` -> `/directives/Intersect`
- `Ripples`

Examples:

- Usage: `src/demo/examples/ripples/usage.vue`
- Custom color: `src/demo/examples/ripples/custom-color.vue`
- Centered ripple: `src/demo/examples/ripples/center.vue`
- Ripple in components: `src/demo/examples/ripples/ripple-in-components.vue`

Visible behavior:

- Usage:
  - Block-level `div` with `v-ripple`, centered text, elevation-2, `pa-12`, `text-h5`.
  - Clicking produces standard ripple.
- Custom color:
  - `v-list` of six rows for `primary`, `secondary`, `info`, `success`, `warning`, and `error`.
  - Each row uses `v-ripple="{ class: `${color}--text` }"`.
  - Text: `Item with "{{ color }}" class`.
  - Clicking produces ripple tinted by helper class.
- Centered ripple:
  - Block-level `div` with `v-ripple="{ center: true }"`.
  - Ripple originates from center.
- Ripple in components:
  - `v-row py-12 justify-space-around`.
  - Four buttons:
    - `With ripple (default)`
    - `Without ripple`
    - `With centered ripple`
    - `With red ripple`
  - Button ripple behavior differs by prop.

Documentation/options:

- All examples set `uninverted: true`.
- Options include `class` and `center`.

Interactions:

- Click ripple on surfaces/list rows/buttons.
- Disabled ripple comparison.
- Centered ripple origin.
- Custom ripple color.
- View source.
- View on Github.

Responsive behavior:

- Button row uses `justify="space-around"` and should wrap/space like Vue on narrow widths.

### Scrolling

Vue page source:

- `src/views/Vuetify/Directives/Scrolling.vue`

Route:

- `/directives/scrolling`

Breadcrumbs:

- `Directives` -> `/directives/Intersect`
- `Scrolling`

Examples:

- Usage: `src/demo/examples/scrolling/usage.vue`
- Scroll with options: `src/demo/examples/scrolling/options.vue`
- Watching bound element: `src/demo/examples/scrolling/simple/self.vue`, `newIn: "v2.3"`

Visible behavior:

- Usage example:
  - Similar control layout to Programmatic Scrolling:
    - Target heading.
    - Radio buttons: `Number`, `Selector`, `DOMElement`.
    - Conditional Number field.
    - Conditional Selector field.
    - Conditional DOMElement select.
    - Options heading.
    - Easing select.
    - Duration slider.
    - Offset slider.
    - Full-width primary `scroll` button.
  - Button calls `$vuetify.goTo(target, options)`.
  - Default values:
    - `type: "number"`
    - `number: 9999`
    - `selector: "#scroll-with-options"`
    - `selected: "Button"`
    - `duration: 300`
    - `offset: 0`
    - `easing: "easeInOutCubic"`
- Options example:
  - Centered row with `Offset Top` and the current scroll value.
  - Container id `scroll-target`, max-height 400px, overflow-y-auto.
  - Inner row height 1000px.
  - `v-scroll:#scroll-target="onScroll"` updates `offsetTop = e.target.scrollTop`.
- Self example:
  - `v-card v-scroll.self="onScroll"` with max-height 400 and overflow-y-auto.
  - Sticky banner text: `Scroll Me - Method invoked {{ scrollInvoked }} times`.
  - Scrolling the card increments `scrollInvoked`.
  - Example has `New in v2.3` chip.

Documentation/options:

- Usage and options examples set `uninverted: true`.
- Self example does not set `uninverted`, so invert behavior must be verified.
- Options include `arg:target`, `arg:self`, and `value`.

Interactions:

- Radio/select/slider controls.
- Programmatic scroll button.
- Scroll event on target container.
- Scroll event on bound element.
- Sticky banner.
- New-in chip.
- View source.
- View on Github.
- Invert example color.

Responsive behavior:

- Usage uses `v-container`, `v-row`, `v-col cols="12"`.
- Scroll containers remain max-height 400px.

## React Current State

Sources inspected:

- `react-dashboard-template/src/App.tsx`
- `react-dashboard-template/src/data/uiComponentsNavigation.tsx`
- `react-dashboard-template/src/pages`

Current React Directives behavior:

- Sidebar Directives header and Directives group are visible.
- Children are visible but all disabled/pending:
  - Click Outside
  - Intersect
  - Mutate
  - Resizing
  - Ripples
  - Scrolling
- No React routes exist for:
  - `/directives/click-outside`
  - `/directives/Intersect`
  - `/directives/mutate`
  - `/directives/resizing`
  - `/directives/ripples`
  - `/directives/scrolling`
- No React Directives pages exist.
- Existing React docs/example primitives from Vuetify slices may be reusable, but no Directives content has been implemented.

## Required React Target Files

Likely target files:

- `react-dashboard-template/src/App.tsx`
- `react-dashboard-template/src/data/uiComponentsNavigation.tsx`
- `react-dashboard-template/src/pages/directives/ClickOutsidePage.tsx`
- `react-dashboard-template/src/pages/directives/IntersectPage.tsx`
- `react-dashboard-template/src/pages/directives/MutatePage.tsx`
- `react-dashboard-template/src/pages/directives/ResizingPage.tsx`
- `react-dashboard-template/src/pages/directives/RipplesPage.tsx`
- `react-dashboard-template/src/pages/directives/ScrollingPage.tsx`
- Existing shared docs/example components under `react-dashboard-template/src/components/vuetify-docs/` or a Directives-scoped docs shell if needed.

## Required React Gaps

Routes:

- Add `/directives/click-outside`.
- Add `/directives/Intersect`.
- Add `/directives/mutate`.
- Add `/directives/resizing`.
- Add `/directives/ripples`.
- Add `/directives/scrolling`.

Sidebar:

- Enable one Directives child per implementation slice.
- Preserve pending/disabled state for unimplemented Directives children.
- Preserve Directives parent/group position after UI Components and before Guide.

Docs shell:

- Section definition must match Vue hierarchy:
  - namespace `Directives`.
  - page title.
  - breadcrumbs back to `/directives/Intersect`.
- Example cards must preserve:
  - toolbar title.
  - Invert colors.
  - View on Github.
  - View source.
  - source panel tabs.
  - `New in` chip when present.
  - `uninverted` behavior from language JSON.

Behavior:

- Click outside detection.
- Intersection observer thresholds and scroll containers.
- Mutation observer counters and once modifier.
- Window resize listener.
- Ripple click animations, center/custom color/no-ripple behavior.
- Scroll target/self callbacks and programmatic scroll controls.

## Recommended Implementation Order

1. Directives / Click Outside
   - Smallest page with two examples.
   - Exercises shared docs/example shell, outside-click behavior, active state, source panel, and invert behavior.
2. Directives / Resizing
   - Single usage example and simple window listener.
3. Directives / Intersect
   - IntersectionObserver behavior and 400px scroll containers.
4. Directives / Mutate
   - MutationObserver behavior and two-column modifier example.
5. Directives / Ripples
   - Ripple visual behavior across elements/buttons/list rows.
6. Directives / Scrolling
   - Most complex due programmatic scroll controls, target scroll listener, self modifier, and `New in v2.3` chip.

## First Implementation Slice Recommendation

Start with Directives / Click Outside only.

Active scope:

- Directives / Click Outside.
- Route `/directives/click-outside`.
- Shared Directives docs/example shell only as needed.
- Enable Directives / Click Outside sidebar entry only.

Do not implement:

- Intersect.
- Mutate.
- Resizing.
- Ripples.
- Scrolling.
- Vuetify continuation.
- animations.
- Dashboard.
- App Contacts / Chat.
- approved slices.

Keep Directives / Click Outside pending user visual approval after implementation.
