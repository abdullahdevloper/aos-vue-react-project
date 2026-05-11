# Vuetify Batch 2 Audit

Status: audit complete; implementation not started.

Scope:

- Bottom Navigation: `/components/bottom-navigation`
- Bottom Sheets: `/components/bottom-sheets`
- Breadcrumbs: `/components/breadcrumbs`
- Buttons: `/components/buttons`

Out of scope:

- Approved Vuetify slices.
- Bars pages already implemented or pending review.
- Buttons sibling routes `Floating Action` and `Button Groups`.
- Directives, App, Dashboard, animations, and `.claude/`.
- React code changes and build.

## Sources Inspected

Vue:

- `src/config/navigation-items.js`
- `src/router/routes/vuetify.js`
- `src/views/Vuetify/BottomNavigation.vue`
- `src/views/Vuetify/BottomSheets.vue`
- `src/views/Vuetify/Breadcrumbs.vue`
- `src/views/Vuetify/Buttons/Buttons.vue`
- `src/lang/en/components/BottomNavigation.json`
- `src/lang/en/components/BottomSheets.json`
- `src/lang/en/components/Breadcrumbs.json`
- `src/lang/en/components/Buttons.json`
- `src/demo/examples/bottom-navigation/**`
- `src/demo/examples/bottom-sheets/**`
- `src/demo/examples/breadcrumbs/**`
- `src/demo/examples/buttons/**`
- `src/demo/usages/bottom-sheets.vue`
- `src/demo/usages/breadcrumbs.vue`
- `src/demo/usages/buttons.vue`

React:

- `react-dashboard-template/src/App.tsx`
- `react-dashboard-template/src/data/uiComponentsNavigation.tsx`
- `react-dashboard-template/src/pages/ui-components/vuetify/**`

## Vue Sidebar And Route Map

| Sidebar order | Page | Vue route | Vue source | Vue sidebar entry | React status |
|---:|---|---|---|---|---|
| 09 | Bottom Navigation | `/components/bottom-navigation` | `src/views/Vuetify/BottomNavigation.vue` | `Bottom Navigation` | Missing route/page; sidebar item visible but disabled/pending |
| 10 | Bottom Sheets | `/components/bottom-sheets` | `src/views/Vuetify/BottomSheets.vue` | `Bottom Sheets` | Missing route/page; sidebar item visible but disabled/pending |
| 11 | Breadcrumbs | `/components/breadcrumbs` | `src/views/Vuetify/Breadcrumbs.vue` | `Breadcrumbs` | Missing route/page; sidebar item visible but disabled/pending |
| 12 | Buttons / Buttons | `/components/buttons` | `src/views/Vuetify/Buttons/Buttons.vue` | `Buttons > Buttons` | Missing route/page; child item visible but disabled/pending |

Notes:

- Vue also has `Buttons > Floating Action` at `/components/buttons/floating-action-buttons` and `Buttons > Button Groups` at `/components/buttons/button-groups`. These are not in this Batch 2 scope and should remain pending/disabled.
- React currently has no registered routes for the four Batch 2 paths in `App.tsx`.

## Shared Documentation Structure

All four pages use the Vuse Vuetify documentation shell:

- `vuse-section-definition`
- `v-container fluid`
- `doc-page`
- Vue source breadcrumbs under `Components > Vuetify > [Page]`
- Example blocks with title, documentation text, action icons, source panel, and invert behavior where supported by the docs shell.

React implementation should reuse the established Vuetify docs shell and preserve exact:

- page title casing from `page`
- breadcrumb labels from source
- documentation text from `src/lang/en/components/*.json`
- inline code styling
- example order from each Vue page
- usage playground controls where a `usage` config or usage component exists

## Bottom Navigation

Route:

- `/components/bottom-navigation`

Vue page:

- `src/views/Vuetify/BottomNavigation.vue`
- `namespace: "Components"`
- `page: "BottomNavigation"`
- Breadcrumb label: `Bottom Navigations`
- `usage="usage"`
- Examples:
  - `simple/color`
  - `simple/grow`
  - `simple/horizontal`
  - `simple/shift`
  - `simple/toggle`
  - `intermediate/hide-on-scroll`
  - `intermediate/scroll-threshold`

Documentation text:

- Main: `The v-bottom-navigation is an alternative to the sidebar...`
- Usage: active state is controlled with `active.sync`, `value`, and `v-model`.

Examples and behavior:

| Example | Vue file | Static or interactive | Key props/state | Behavior/risk |
|---|---|---|---|---|
| Usage | `src/demo/examples/bottom-navigation/usage.vue` | Interactive | `v-model="bottomNav"`, initial `recent`; button values `recent`, `favorites`, `nearby` | Clicking buttons changes active state |
| Color | `simple/color.vue` | Static visual | `:value="activeBtn"`, initial `1`, `color="purple lighten-1"` | Active Favorites row/color state must match |
| Grow | `simple/grow.vue` | Static visual | `grow`, `color="teal"`, active index `1` | Buttons fill available width |
| Horizontal | `simple/horizontal.vue` | Static visual | `horizontal`, `color="primary"`, active index `1` | Text appears beside icon |
| Shift | `simple/shift.vue` | Interactive | `v-model="bottomNav"`, `dark`, `shift`, initial `3`; computed color exists but is not bound in template | Shift hides inactive labels; clicking active item changes visible label |
| Toggle | `simple/toggle.vue` | Interactive | `showNav`, `activeBtn`, `:input-value="showNav"` | `Toggle Nav` button hides/shows navigation; active button remains |
| Hide on scroll | `intermediate/hide-on-scroll.vue` | Interactive scroll behavior | `scroll-target="#scroll-area-1"`, `hide-on-scroll`, `absolute`, `horizontal`; card height `200`, max-width `500`, scroll sheet max-height `600`, content height `1500` | Must use local scroll container, not page window |
| Scroll threshold | `intermediate/scroll-threshold.vue` | Interactive scroll behavior | `scroll-target="#scroll-area-2"`, `hide-on-scroll`, `scroll-threshold="500"`, `absolute`, `color="white"`, `horizontal` | Risky; needs threshold behavior spike |

Responsive behavior:

- The scroll examples use fixed example card geometry (`height="200"`, `max-width="500"`) and a local `v-sheet` scroll target.
- Standard examples use `v-bottom-navigation` width from the example body.

Dark/inverted behavior:

- `shift` is explicitly `dark`.
- Other examples inherit the docs-shell invert behavior if available.

Risky behavior examples:

- `hide-on-scroll`
- `scroll-threshold`
- `toggle`
- `shift`

Recommended implementation note:

- Bottom Navigation should likely be implemented first from this batch, but scroll examples should be handled as isolated behavior spikes after the base/static examples render.

## Bottom Sheets

Route:

- `/components/bottom-sheets`

Vue page:

- `src/views/Vuetify/BottomSheets.vue`
- `namespace: "Components"`
- `page: "BottomSheets"`
- Breadcrumb label: `Bottom Sheets`
- Usage config: booleans `inset`, `hide-overlay`, `persistent`
- Examples:
  - `simple/persistent`
  - `simple/model`
  - `simple/inset`
  - `complex/player`
  - `complex/open-in-list`

Documentation text:

- Main: bottom sheet is a modified `v-dialog` sliding from bottom, similar to `v-bottom-navigation`.
- Usage text: displays an example list of application actions.

Usage playground:

- `src/demo/usages/bottom-sheets.vue`
- Activator button text: `Open Playground`
- Purple dark button.
- Sheet content:
  - close button
  - `Active Playground Props`
  - `v-model` when open
  - `inset`, `hide-overlay`, `persistent` when enabled

Examples and behavior:

| Example | Vue file | Static or interactive | Key props/state | Behavior/risk |
|---|---|---|---|---|
| Persistent | `simple/persistent.vue` | Interactive modal/sheet | `v-model="sheet"`, `persistent`; activator `Open Persistent`; close text button | Outside click must not close; close button closes |
| v-model control | `simple/model.vue` | Interactive modal/sheet | external `Open v-model` button toggles `sheet` | Button opens/closes without activator slot |
| Inset | `simple/inset.vue` | Interactive modal/sheet | `inset`; activator `Open Inset`; sheet height `200px` | Sheet max width reduced on desktop |
| Music Player | `complex/player.vue` | Interactive modal/sheet | `inset`; progress linear value `50`; player controls | Layout includes card tile, 3px progress, responsive md icon margins |
| Open In List | `complex/open-in-list.vue` | Interactive modal/sheet | `v-list`; tiles with CDN images `keep.png`, `inbox.png`, `hangouts.png`, `messenger.png`, `google.png` | Clicking list item closes sheet |

Responsive behavior:

- `player.vue` uses `$vuetify.breakpoint.mdAndUp` to add `mx-5` and `mr-3` around player icon controls.
- `inset` reduces max width to 70% on desktop.

Dark/inverted behavior:

- Activator buttons use explicit colors/dark props.
- Bottom sheet surfaces are light unless docs-shell invert applies.

Risky behavior examples:

- All examples require correct bottom-sheet overlay/portal behavior.
- `persistent` must block outside close but allow close button.
- `inset` desktop width must match.
- `player` responsive icon spacing must be checked.

## Breadcrumbs

Route:

- `/components/breadcrumbs`

Vue page:

- `src/views/Vuetify/Breadcrumbs.vue`
- `namespace: "Components"`
- `page: "Breadcrumbs"`
- Breadcrumb label: `Breadcrumbs`
- Usage config:
  - booleans `customDivider`, `large`
  - select `divider` label `Divider`, items `/`, `/`, `.`, `;`, `>`, `-`
- Examples:
  - `simple/large`
  - `simple/divider`
  - `intermediate/icon-dividers`
  - `intermediate/item-slot`

Documentation text:

- Main: `v-breadcrumbs` accepts Material Icons/text dividers, item arrays, and item/divider slots.
- Header alert: default disabled crumb behavior and `exact: true`.
- Usage text: default breadcrumbs use a text divider.

Shared item data:

- `Dashboard`, enabled, href `breadcrumbs_dashboard`
- `Link 1`, enabled, href `breadcrumbs_link_1`
- `Link 2`, disabled, href `breadcrumbs_link_2`

Examples and behavior:

| Example | Vue file | Static or interactive | Key props/state | Behavior/risk |
|---|---|---|---|---|
| Usage | `src/demo/usages/breadcrumbs.vue` | Interactive through playground controls | `items`, `attrs`, optional `customDivider` slot with `mdi-chevron-right` | Divider/large/custom divider controls change output |
| Large | `simple/large.vue` | Static visual | default breadcrumbs and `large` breadcrumbs | Font size/spacing must match |
| Custom divider | `simple/divider.vue` | Static visual | divider `-` and `.` | Divider spacing and disabled item styling |
| Icon dividers | `intermediate/icon-dividers.vue` | Static visual | divider slot icons `mdi-forward`, `mdi-chevron-right` | Icon size/baseline alignment |
| Item slot | `intermediate/item-slot.vue` | Static visual | uppercase item text via slot | Disabled item remains disabled |

Responsive behavior:

- Examples are simple inline breadcrumb rows; no special breakpoint props found.

Dark/inverted behavior:

- No explicit dark examples; docs-shell invert should be visually checked if available.

Risky behavior examples:

- Low risk overall.
- Usage playground must correctly synchronize `customDivider`, `large`, and divider select.

Recommended implementation note:

- Breadcrumbs is the safest static-heavy page in this batch.

## Buttons

Route:

- `/components/buttons`

Vue page:

- `src/views/Vuetify/Buttons/Buttons.vue`
- `namespace: "Components"`
- `page: "Buttons"`
- Breadcrumb label: `Buttons`
- Usage config:
  - booleans `disabled`, `loading`, `block`
  - slider `elevation`, min `0`, max `24`, initial `2`
  - selects:
    - `color`: `deep-purple accent-4`, `primary`, `secondary`, `accent`
    - `size`: `x-small`, `small`, `large`, `x-large`
  - tabs: `raised`, `depressed`, `outlined`, `rounded`, `text`, `fab`, `icon`, `tile`
- Examples:
  - `simple/text`
  - `simple/raised`
  - `simple/depressed`
  - `simple/dropdown`
  - `simple/icon`
  - `simple/floating`
  - `simple/sizing`
  - `simple/outlined`
  - `simple/rounded`
  - `simple/tile`
  - `simple/block`
  - `intermediate/loaders`

Documentation text:

- Main: `v-btn` replaces the standard HTML button with Material Design theme/options.
- Alert: `v-btn` behaves differently with the `dark` prop; use `white--text` when needed.
- Usage text: default button has uppercase text, slight elevation, hover effect, and click ripple.

Usage playground:

- `src/demo/usages/buttons.vue`
- Shows one centered `v-btn`.
- Applies `attrs`, default color `deep-purple accent-4`, `[attrs.size]`, and conditional elevation.
- If `fab` or `icon`, shows `mdi-account`; otherwise shows text `Click Me`.
- Elevation is suppressed for `outlined`, `depressed`, `icon`, and `text`.

Examples and behavior:

| Example | Vue file | Static or interactive | Key props/state | Behavior/risk |
|---|---|---|---|---|
| Text | `simple/text.vue` | Static visual | small/default/large columns; normal/primary/error/disabled | Button size, text color, hover state |
| Raised | `simple/raised.vue` | Static visual | small/default/large columns; normal/primary/error/disabled | Default elevation and click elevation |
| Depressed | `simple/depressed.vue` | Static visual | depressed variants | No shadow while retaining color |
| Button Dropdown Variants | `simple/dropdown.vue` | Interactive selects | `v-overflow-btn`, labels `Overflow Btn`, `Segmented Btn`, `Editable Btn`; font/icon/edit item data | Risky; menu/segmented/editable behavior and popover target |
| Icon | `simple/icon.vue` | Static visual | normal and disabled icon rows; icons heart/star/cached/thumb-up | Icon color/disabled styling |
| Floating | `simple/floating.vue` | Static visual | fab small/default/large; colors primary/pink/indigo/teal/cyan/purple | Fab sizing and icon centering |
| Sizing | `simple/sizing.vue` | Static visual | text buttons and fab buttons x-small through x-large | Responsive two-column layout |
| Outlined | `simple/outlined.vue` | Static visual | outlined text and fab buttons | Border/color inheritance |
| Rounded | `simple/rounded.vue` | Static visual | rounded primary dark button | Radius and height |
| Tile | `simple/tile.vue` | Static visual | tile filled, tile outlined with left icon, tile large icon button | Zero radius and icon alignment |
| Block | `simple/block.vue` | Static visual | block secondary dark button | Full-width button |
| Loaders | `intermediate/loaders.vue` | Interactive timed loaders | buttons set `loader`; corresponding loading flag true for 3000ms; custom loader text and rotating cached icon | Risky; timers, disabled state, loader slot content, icon rotation |

Responsive behavior:

- Many examples use `v-row`/`v-col cols="12" sm="4"` or `sm="6"` so rows stack on mobile and form columns on small+ screens.
- Dropdown example uses three `sm="4"` columns.

Dark/inverted behavior:

- Several examples use explicit `dark`.
- Dropdown example has `uninverted: true` in docs JSON; implementation should preserve that if the docs shell treats it specially.

Risky behavior examples:

- Usage playground tab/prop composition.
- Button Dropdown Variants (`v-overflow-btn`) needs menus, segmented behavior, editable value.
- Loaders needs exact 3000ms loading timers, disabled states, custom loader slots, and rotating icon.

## Current React Gaps

| Page | React route | Sidebar | Page implementation | Gap |
|---|---|---|---|---|
| Bottom Navigation | Missing | Disabled/pending | Missing | Need route, sidebar enable, docs shell, usage, seven examples, scroll behavior |
| Bottom Sheets | Missing | Disabled/pending | Missing | Need route, sidebar enable, usage, five examples, bottom-sheet overlay behavior |
| Breadcrumbs | Missing | Disabled/pending | Missing | Need route, sidebar enable, usage, four examples, alert text |
| Buttons | Missing | Disabled/pending child | Missing | Need route, sidebar enable, usage, twelve examples, dropdown/loaders behavior |

## Required React Target Files

Likely files for implementation:

- `react-dashboard-template/src/App.tsx`
- `react-dashboard-template/src/data/uiComponentsNavigation.tsx`
- `react-dashboard-template/src/pages/ui-components/vuetify/BottomNavigationPage.tsx`
- `react-dashboard-template/src/pages/ui-components/vuetify/BottomSheetsPage.tsx`
- `react-dashboard-template/src/pages/ui-components/vuetify/BreadcrumbsPage.tsx`
- `react-dashboard-template/src/pages/ui-components/vuetify/ButtonsPage.tsx`
- `migration-docs/progress.md`
- `migration-docs/phase-report.md`

Shared helpers may be useful later, but should only be introduced if they preserve existing approved Vuetify pages and reduce real duplication without broad refactors.

## Risk Summary

| Risk | Pages affected | Why it matters | Suggested handling |
|---|---|---|---|
| Local scroll-target behavior | Bottom Navigation | Vue hides/shows bottom nav from local `v-sheet`, not the page window | Implement `hide-on-scroll` first as a behavior spike |
| Scroll threshold | Bottom Navigation | Must match `scroll-threshold="500"` and avoid flicker/layout feedback | Isolated behavior spike after base page |
| Bottom sheet overlay/portal | Bottom Sheets | Vue sheet appears from viewport bottom with overlay/persistent/inset behavior | Implement sheet shell carefully before examples |
| Persistent close behavior | Bottom Sheets | Outside click must not close persistent sheet | Explicit interaction verification required |
| Overflow/dropdown buttons | Buttons | `v-overflow-btn` has custom select/menu/editable behavior | Separate spike recommended |
| Loader timers/slots | Buttons | Timed loading and custom loader slot behavior visible | Separate spike recommended |
| Usage playground composition | Buttons, Breadcrumbs, Bottom Sheets | Playground controls must alter the rendered component exactly like Vue | Build after static examples, then verify controls |

## Recommended Implementation Order

1. Bottom Navigation.
2. Bottom Sheets.
3. Breadcrumbs.
4. Buttons.

Recommended first implementation slice:

- Vuetify / Bottom Navigation only.
- Route: `/components/bottom-navigation`.
- Enable only `UI Components > Vuetify > Bottom Navigation`.
- Implement base usage and static examples first, then treat `hide-on-scroll` and `scroll-threshold` as isolated behavior spikes if visual review finds mismatches.

Reason:

- It is the next Vue sidebar item after the Bars group.
- It preserves original Vue sidebar order.
- It contains meaningful behavior but is narrower than Bottom Sheets and Buttons.

## Protected Files

No React code was modified for this audit.

Protected-path check must remain clean:

`git status --short -- src public scripts package.json package-lock.json babel.config.js vue.config.js webpack.config.js README.md AGENTS.md`
