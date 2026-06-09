# Vuetify Bars Group Audit

Status: audit complete; implementation not started.

Scope:

- Vuetify / Bars / App Bars.
- Vuetify / Bars / Toolbar.
- Vuetify / Bars / System bars.

Out of scope:

- Banners implementation or fixes.
- Approved Vuetify slices.
- Directives.
- App.
- Dashboard.
- Animations.
- `.claude/`.

## Vue Route And Sidebar Map

| Sidebar order | Item | Vue route | Vue route name | Vue source |
|---:|---|---|---|---|
| 1 | Bars / App Bars | `/components/bars/app-bars` | `components/AppBarsView` | `src/views/Vuetify/Bars/AppBars.vue` |
| 2 | Bars / Toolbar | `/components/bars/toolbar` | `components/ToolbarView` | `src/views/Vuetify/Bars/Toolbar.vue` |
| 3 | Bars / System bars | `/components/bars/system-bar` | `components/SystemBarsView` | `src/views/Vuetify/Bars/SystemBars.vue` |

Vue sidebar source:

- `src/config/navigation-items.js`

Vue route source:

- `src/router/routes/vuetify.js`

React current state:

| Item | React route | React sidebar status | React page status |
|---|---|---|---|
| App Bars | Missing | Visible under Bars but disabled/pending | Missing |
| Toolbar | Missing | Visible under Bars but disabled/pending | Missing |
| System bars | Missing | Visible under Bars but disabled/pending | Missing |

React sources inspected:

- `react-dashboard-template/src/App.tsx`
- `react-dashboard-template/src/data/uiComponentsNavigation.tsx`
- `react-dashboard-template/src/pages/ui-components/vuetify/**`

## Shared Vue Docs Shell

All three pages use the shared docs shell:

- `vuse-section-definition`
- `v-container fluid`
- `doc-page`
- `Example.vue` for examples/source/invert behavior
- `UsageExample.vue` for usage playgrounds when `usage` is provided
- `Playground.vue` for System bars playground

Shared behaviors required:

- Vuse section header and breadcrumbs.
- Docs heading/paragraph text from `src/lang/en/components/*.json`.
- Example cards with action toolbar.
- Invert example colors.
- View on Github action.
- View source expansion.
- Dark source panel with source section tabs.
- Responsive full-width examples.
- Usage playground `md=9/md=3` layout for App Bars and Toolbar.
- Playground section for System bars.

## App Bars Audit

Route:

- `/components/bars/app-bars`

Vue page:

- `src/views/Vuetify/Bars/AppBars.vue`

Docs text:

- `src/lang/en/components/AppBars.json`

Usage component:

- `src/demo/usages/app-bars.vue`

Examples:

- `src/demo/examples/app-bars/simple/dense.vue`
- `src/demo/examples/app-bars/simple/prominent.vue`
- `src/demo/examples/app-bars/simple/img.vue`
- `src/demo/examples/app-bars/simple/hide.vue`
- `src/demo/examples/app-bars/simple/collapse.vue`
- `src/demo/examples/app-bars/simple/elevate-on-scroll.vue`
- `src/demo/examples/app-bars/simple/inverted-scroll.vue`
- `src/demo/examples/app-bars/intermediate/app-bar-nav.vue`
- `src/demo/examples/app-bars/intermediate/scroll-threshold.vue`
- `src/demo/examples/app-bars/complex/img-fade.vue`
- `src/demo/examples/app-bars/complex/menu.vue`

Page structure:

- Namespace `Components`.
- Page `AppBars`.
- Breadcrumbs:
  - `Components` -> `/components/vuetify/api-explorer`
  - `Vuetify` -> `/components/vuetify/api-explorer`
  - `AppBars` disabled
- `doc-page` with `usage` and the 11 examples.
- `app-alert value="warning"` with `Components.Toolbars.buttonMargin`.
- `functional value="functional"` for the `v-app-bar-nav-icon` description.

Usage controls:

- Booleans:
  - `image`
  - `collapse-on-scroll`
  - `dense`
  - `flat`
  - `hide-on-scroll`
  - `inverted-scroll`
  - `prominent`
- Select:
  - `color`: `primary`, `orange`, `yellow`, `green`, `blue`, `purple`

Usage visible behavior:

- Renders `v-app-bar` inside a 1000px tall scroll area.
- Always uses `absolute`, `dark`, and `scroll-target="#usage-example"`.
- Optional image source `https://picsum.photos/1920/1080?random`.
- Contains nav icon, title `Title`, spacer, and search icon button.
- Scroll options must visibly change app-bar height, collapse, hiding, image shrink, and scroll behavior.

Example inventory:

| Example | Required visible behavior |
|---|---|
| Dense | Deep-purple dense dark app bar with nav icon, `Page title`, heart/search/menu icons, and menu list `Option 1` through `Option 5` |
| Prominent | Indigo dark prominent app bar, shrink-on-scroll, 1000px scroll target |
| Prominent with image | Image app bar with gradient overlay, shrink-on-scroll, 1000px scroll target |
| Hiding on scroll | Teal prominent app bar hides while scrolling down in its target |
| Collapsible bars | Deep-purple app bar with checkbox; checkbox toggles `collapse-on-scroll` vs static collapsed state |
| Elevate on scroll | White app bar starts flat and raises to 4dp after scroll |
| Inverted scrolling | Primary app bar hides until threshold behavior is met and reacts inversely to scroll |
| Toggle Navigation Drawers | App bar nav icon opens temporary navigation drawer; drawer has Home and Account items |
| Scroll threshold | Green image app bar waits until `scroll-threshold="500"` before shrink/fade behavior |
| Image fade | Image app bar with fade-on-scroll and extension tabs `Tab 1`, `Tab 2`, `Tab 3` |
| With menu | Image app bar with yellow menu activator; menu shows `Click Me`, `Click Me`, `Click Me`, `Click Me 2`; extension tabs |

Key risks:

- Scroll behavior is heavy: hide, inverted, shrink, threshold, collapse, elevation, and image fade must use the example-local scroll containers, not the page window.
- Image gradients and `picsum` backgrounds must match Vue enough for visual review.
- Menu/dropdown and temporary drawer behavior must match Vuetify positioning and overlay.
- The `v-app-bar-nav-icon` functional description and warning alert must be included.

## Toolbar Audit

Route:

- `/components/bars/toolbar`

Vue page:

- `src/views/Vuetify/Bars/Toolbar.vue`

Docs text:

- `src/lang/en/components/Toolbars.json`

Usage component:

- `src/demo/usages/toolbars.vue`

Examples:

- `src/demo/examples/toolbars/simple/prominent.vue`
- `src/demo/examples/toolbars/simple/dense.vue`
- `src/demo/examples/toolbars/simple/light-and-dark.vue`
- `src/demo/examples/toolbars/simple/variations.vue`
- `src/demo/examples/toolbars/simple/background.vue`
- `src/demo/examples/toolbars/simple/extended.vue`
- `src/demo/examples/toolbars/simple/extension-height.vue`
- `src/demo/examples/toolbars/simple/collapse.vue`
- `src/demo/examples/toolbars/intermediate/flexible-and-card.vue`
- `src/demo/examples/toolbars/intermediate/floating-with-search.vue`
- `src/demo/examples/toolbars/intermediate/contextual-action-bar.vue`

Page structure:

- Namespace `Components`.
- Page `Toolbars`.
- Breadcrumbs:
  - `Components` -> `/components/vuetify/api-explorer`
  - `Vuetify` -> `/components/vuetify/api-explorer`
  - `Toolbar` disabled
- `doc-page` with `usage` and the 11 examples.
- `app-alert value="warning"` using `Components.Toolbars.buttonMargin`.

Usage controls:

- Booleans:
  - `image`
  - `collapse`
  - `dense`
  - `extended`
  - `flat`
  - `prominent`
  - `short`
- Slider:
  - `elevation`, min `2`, max `24`, default `2`
- Select:
  - `color`: `primary`, `orange`, `yellow`, `green`, `blue`, `purple`

Usage visible behavior:

- Renders `v-toolbar`.
- Optional image uses `https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg`.
- `extended` adds extension slot with text buttons `Link 1`, `Link 2`, `Link 3`.
- Contains nav icon, title `Title`, spacer, and on `smAndUp` export/delete/plus icon buttons.
- `flat` suppresses elevation; otherwise elevation slider applies.

Example inventory:

| Example | Required visible behavior |
|---|---|
| Prominent toolbars | Grey 200px card with prominent extended toolbar, nav/title/search/heart/menu |
| Dense toolbars | Grey 200px card with dense toolbar |
| Light and Dark | Two toolbar variants in a child-flex row; one light with back/search, one dark narrow toolbar with reply/menu |
| Variations | Four `md=6` toolbar cards: default, dark, primary dark, elevation-0 |
| Prominent with Background | Dark prominent toolbar with `vbanner.jpg` background, title `Vuetify`, export icon |
| Extended | Grey card with extended toolbar |
| Extension height | Grey card with `extended extension-height="100"` toolbar |
| Collapse | Grey card with collapsed toolbar containing search and menu icons |
| Flexible toolbar and card toolbar | Primary extended flat toolbar with overlapping centered card offset by `margin-top: -64px` |
| Floating with search | 300px map image card with dense floating toolbar, prepend search text field, my_location and menu icons |
| Contextual action bars | Card max-width 500; multi-select toggles toolbar color/content from `Photos` to `{n} selected`; close clears selection; export/delete icons appear with scale transition |

Key risks:

- Toolbar density/prominent/extended/collapse sizing must match Vuetify.
- Contextual action bar requires real multi-select state and visible toolbar transformation.
- Floating search toolbar and background image examples need accurate field/icon spacing.
- `buttonMargin` warning must appear after docs content.

## System Bars Audit

Route:

- `/components/bars/system-bar`

Vue page:

- `src/views/Vuetify/Bars/SystemBars.vue`

Docs text:

- `src/lang/en/components/SystemBars.json`

Playground:

- `src/demo/examples/system-bars/playground.vue`

Examples:

- `src/demo/examples/system-bars/simple/color.vue`
- `src/demo/examples/system-bars/simple/lights-out.vue`
- `src/demo/examples/system-bars/simple/themes.vue`
- `src/demo/examples/system-bars/simple/window.vue`

Related usage file:

- `src/demo/examples/system-bars/usage.vue`

Page structure:

- Namespace `Components`.
- Page `SystemBars`.
- Breadcrumbs:
  - `Components` -> `/components/vuetify/api-explorer`
  - `Vuetify` -> `/components/vuetify/api-explorer`
  - `System Bars` disabled
- `doc-page` with `playground="playground"` and examples.
- No `usage` object is passed; the playground is an `Example.vue`-wrapped playground section.

Playground controls:

- Height text field:
  - label `Height - px`
  - max `30`
  - min `1`
  - step `1`
  - default `30`
  - width `125px`
- Switch `Toggle lights-out`
- Switch `Toggle window`

Playground visible behavior:

- `v-card img="https://cdn.vuetifyjs.com/images/home/vuetify_layout1.svg"` height `200px`.
- `v-system-bar color="orange"` with dynamic `height`, `lights-out`, and `window`.
- Icons/text:
  - `mdi-gmail`
  - `10 unread emails`
  - spacer
  - `mdi-wifi-strength-4`
  - `mdi-signal-cellular-outline`
  - `mdi-battery`
  - `12:30`

Example inventory:

| Example | Required visible behavior |
|---|---|
| Colored bar | Three dark system bars: primary, red lighten-2, indigo darken-2; wifi/signal/battery/time aligned right |
| Lights out | Light and dark lights-out variants over `vuetify_layout2.svg`, with subheaders `Lights out (light)` and `Lights out (dark)` |
| Themes | Light and dark status bars over `vuetify_layout1.svg`, with subheaders `Light status bar` and `Dark status bar` |
| Window bar | Dark window system bar with message icon, `10 unread messages`, spacer, minimize, checkbox outline, close icons |

Key risks:

- System bar height/window/lights-out interactions must be exact.
- Background SVG image cards must render correctly.
- Playground uses text field + switches inside a three-column row.
- Source panel and invert behavior come from `Example.vue`.

## React Gaps

| Page | React status | Missing items |
|---|---|---|
| App Bars | Missing; sidebar disabled/pending | Route, page, usage playground, 11 examples, warning alert, functional section, scroll behaviors, drawer/menu behavior, source/invert |
| Toolbar | Missing; sidebar disabled/pending | Route, page, usage playground, 11 examples, warning alert, toolbar variants, contextual select behavior, source/invert |
| System bars | Missing; sidebar disabled/pending | Route, page, playground, 4 examples, height/lights-out/window controls, source/invert |

## Recommended First Implementation Slice

First slice:

- Vuetify / Bars / App Bars only.
- Route: `/components/bars/app-bars`.
- Enable only `UI Components > Vuetify > Bars > App Bars`.
- Keep Toolbar and System bars disabled/pending.

Reason:

- It is the first item in the Vue Bars group.
- It validates the shared app-bar demo primitive and scroll-target behavior before Toolbar and System bars.
- It has the highest scroll/collapse behavior risk, so it should be handled before simpler Bars pages.
