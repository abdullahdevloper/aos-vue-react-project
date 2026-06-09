# Vuetify Full Map Audit

Status: audit complete; implementation not started.

Scope:

- Vuetify section under `UI Components` only.
- Exact Vue sidebar order from `src/config/navigation-items.js`.

Out of scope:

- Directives routes in `src/router/routes/vuetify.js`.
- Style & User Interface routes in `src/router/routes/vuetify.js`.
- Charts / Spark Line implementation.
- React code changes.
- Build.

## Sources Inspected

Vue:

- `src/config/navigation-items.js`
- `src/router/routes/vuetify.js`
- `src/views/Vuetify/**`

React:

- `react-dashboard-template/src/App.tsx`
- `react-dashboard-template/src/data/uiComponentsNavigation.tsx`
- `react-dashboard-template/src/pages/ui-components/vuetify/**`

Migration docs:

- `migration-docs/progress.md`
- `migration-docs/phase-report.md`
- `migration-docs/vuetify-batch-a-audit.md`
- `migration-docs/vuetify-banners-audit.md`

## Notes

- Vue keeps the Vuetify component routes, Style & User Interface routes, and Directives routes in `src/router/routes/vuetify.js`.
- This audit maps only the Vue sidebar `UI Components > Vuetify` section.
- React currently mirrors the full Vuetify sidebar structure, but only Api Explorer, Alerts, Avatars, and Badges are implemented and approved.
- Banners has a dedicated audit and remains not implemented.
- All later Vuetify items are disabled/pending in React and have no route/page implementation.
- Spark Line is not part of the Vuetify sidebar section. Existing Spark Line work belongs to `UI Components > Charts`; no active Vuetify Sparkline route exists. Any Sparkline-related mismatch should remain outside this Vuetify map unless the user explicitly reopens Charts.

## Vuetify Route Map

| Priority | Sidebar item | Vue route path | Vue source file/component | React status | Audit file |
|---:|---|---|---|---|---|
| 01 | Api Explorer | `/components/vuetify/api-explorer` | `src/views/Vuetify/ApiExplorerView.vue` | Approved | `migration-docs/vuetify-batch-a-audit.md` |
| 02 | Alerts | `/components/alerts` | `src/views/Vuetify/AlertsView.vue` | Approved | `migration-docs/vuetify-batch-a-audit.md` |
| 03 | Avatars | `/components/avatars` | `src/views/Vuetify/AvatarsView.vue` | Approved | `migration-docs/vuetify-batch-a-audit.md` |
| 04 | Badges | `/components/badge` | `src/views/Vuetify/BadgeView.vue` | Approved | `migration-docs/vuetify-batch-a-audit.md` |
| 05 | Banners | `/components/banners` | `src/views/Vuetify/BannersView.vue` | Missing; disabled pending; audit complete | `migration-docs/vuetify-banners-audit.md` |
| 06 | Bars / App Bars | `/components/bars/app-bars` | `src/views/Vuetify/Bars/AppBars.vue` | Missing; disabled pending | None |
| 07 | Bars / Toolbar | `/components/bars/toolbar` | `src/views/Vuetify/Bars/Toolbar.vue` | Missing; disabled pending | None |
| 08 | Bars / System bars | `/components/bars/system-bar` | `src/views/Vuetify/Bars/SystemBars.vue` | Missing; disabled pending | None |
| 09 | Bottom Navigation | `/components/bottom-navigation` | `src/views/Vuetify/BottomNavigation.vue` | Missing; disabled pending | None |
| 10 | Bottom Sheets | `/components/bottom-sheets` | `src/views/Vuetify/BottomSheets.vue` | Missing; disabled pending | None |
| 11 | Breadcrumbs | `/components/breadcrumbs` | `src/views/Vuetify/Breadcrumbs.vue` | Missing; disabled pending | None |
| 12 | Buttons / Buttons | `/components/buttons` | `src/views/Vuetify/Buttons/Buttons.vue` | Missing; disabled pending | None |
| 13 | Buttons / Floating Action | `/components/buttons/floating-action-buttons` | `src/views/Vuetify/Buttons/FloatingActionButtons.vue` | Missing; disabled pending | None |
| 14 | Buttons / Button Groups | `/components/buttons/button-groups` | `src/views/Vuetify/Buttons/ButtonGroups.vue` | Missing; disabled pending | None |
| 15 | Calendars | `/components/calendars` | `src/views/Vuetify/Calendars.vue` | Missing; disabled pending | None |
| 16 | Cards | `/components/cards` | `src/views/Vuetify/Cards.vue` | Missing; disabled pending | None |
| 17 | Carousels | `/components/carousels` | `src/views/Vuetify/Carousels.vue` | Missing; disabled pending | None |
| 18 | Chips / Chips | `/components/chips` | `src/views/Vuetify/Chips/Chips.vue` | Missing; disabled pending | None |
| 19 | Chips / Chip Groups | `/components/chips/chip-groups` | `src/views/Vuetify/Chips/ChipGroups.vue` | Missing; disabled pending | None |
| 20 | Dialogs | `/components/dialogs` | `src/views/Vuetify/Dialogs.vue` | Missing; disabled pending | None |
| 21 | Dividers | `/components/dividers` | `src/views/Vuetify/DividersView.vue` | Missing; disabled pending | None |
| 22 | Expansion Panels | `/components/expansion-panels` | `src/views/Vuetify/ExpansionPanels.vue` | Missing; disabled pending | None |
| 23 | Footers | `/components/footer` | `src/views/Vuetify/Footer.vue` | Missing; disabled pending | None |
| 24 | Form Control / Autocompletes | `/components/forms-control/autocompletes` | `src/views/Vuetify/FormControls/Autocompletes.vue` | Missing; disabled pending | None |
| 25 | Form Control / Combobox | `/components/forms-control/combobox` | `src/views/Vuetify/FormControls/Combobox.vue` | Missing; disabled pending | None |
| 26 | Form Control / File Inputs | `/components/forms-control/file-inputs` | `src/views/Vuetify/FormControls/FileInputs.vue` | Missing; disabled pending | None |
| 27 | Form Control / Forms | `/components/forms-control/forms` | `src/views/Vuetify/FormControls/Forms.vue` | Missing; disabled pending | None |
| 28 | Form Control / Inputs | `/components/forms-control/inputs` | `src/views/Vuetify/FormControls/Inputs.vue` | Missing; disabled pending | None |
| 29 | Form Control / Overflow Buttons | `/components/forms-control/overflow-btns` | `src/views/Vuetify/FormControls/OverflowBtns.vue` | Missing; disabled pending | None |
| 30 | Form Control / Selects | `/components/forms-control/selects` | `src/views/Vuetify/FormControls/Selects.vue` | Missing; disabled pending | None |
| 31 | Form Control / Selection Controls | `/components/forms-control/selection-controls` | `src/views/Vuetify/FormControls/SelectionControls.vue` | Missing; disabled pending | None |
| 32 | Form Control / Sliders | `/components/forms-control/sliders` | `src/views/Vuetify/FormControls/Sliders.vue` | Missing; disabled pending | None |
| 33 | Form Control / Textareas | `/components/forms-control/textarea` | `src/views/Vuetify/FormControls/Textarea.vue` | Missing; disabled pending | None |
| 34 | Form Control / Textfields | `/components/forms-control/text-fields` | `src/views/Vuetify/FormControls/Textfields.vue` | Missing; disabled pending | None |
| 35 | Grids | `/components/grids` | `src/views/Vuetify/Grids.vue` | Missing; disabled pending | None |
| 36 | Groups / Item Groups | `/components/groups/item-groups` | `src/views/Vuetify/Groups/ItemGroups.vue` | Missing; disabled pending | None |
| 37 | Groups / Slide Groups | `/components/groups/slide-groups` | `src/views/Vuetify/Groups/SlideGroups.vue` | Missing; disabled pending | None |
| 38 | Groups / Windows | `/components/groups/windows` | `src/views/Vuetify/Groups/Windows.vue` | Missing; disabled pending | None |
| 39 | Hover | `/components/hover` | `src/views/Vuetify/Hover.vue` | Missing; disabled pending | None |
| 40 | Icons | `/components/icons` | `src/views/Vuetify/Icons.vue` | Missing; disabled pending | None |
| 41 | Images | `/components/images` | `src/views/Vuetify/Images.vue` | Missing; disabled pending | None |
| 42 | Lazy | `/components/lazy` | `src/views/Vuetify/Lazy.vue` | Missing; disabled pending | None |
| 43 | Lists / List | `/components/lists` | `src/views/Vuetify/Lists/Lists.vue` | Missing; disabled pending | None |
| 44 | Lists / Item Group | `/components/lists/item-groups` | `src/views/Vuetify/Lists/ItemGroupView.vue` | Missing; disabled pending | None |
| 45 | Menus | `/components/menus` | `src/views/Vuetify/Menus.vue` | Missing; disabled pending | None |
| 46 | Navigation Drawers | `/components/navigation-drawers` | `src/views/Vuetify/NavigationDrawers.vue` | Missing; disabled pending | None |
| 47 | Overlays | `/components/overlays` | `src/views/Vuetify/Overlays.vue` | Missing; disabled pending | None |
| 48 | Paginations | `/components/paginations` | `src/views/Vuetify/Paginations.vue` | Missing; disabled pending | None |
| 49 | Parallax | `/components/parallax` | `src/views/Vuetify/Parallax.vue` | Missing; disabled pending | None |
| 50 | Pickers / Color Pickers | `/components/pickers/color-pickers` | `src/views/Vuetify/Pickers/ColorPickers.vue` | Missing; disabled pending | None |
| 51 | Pickers / Date Pickers | `/components/pickers/date-pickers` | `src/views/Vuetify/Pickers/DatePickers.vue` | Missing; disabled pending | None |
| 52 | Pickers / TIme Pickers | `/components/pickers/time-pickers` | `src/views/Vuetify/Pickers/TimePickers.vue` | Missing; disabled pending | None |
| 53 | Progress / Circular | `/components/progress/progress-circular` | `src/views/Vuetify/Progress/Circular.vue` | Missing; disabled pending | None |
| 54 | Progress / Linear | `/components/progress/progress-linear` | `src/views/Vuetify/Progress/Linear.vue` | Missing; disabled pending | None |
| 55 | Ratings | `/components/ratings` | `src/views/Vuetify/Ratings.vue` | Missing; disabled pending | None |
| 56 | Sheets | `/components/sheets` | `src/views/Vuetify/Sheets.vue` | Missing; disabled pending | None |
| 57 | Skeleton Loaders | `/components/skeleton-loaders` | `src/views/Vuetify/SkeletonLoaders.vue` | Missing; disabled pending | None |
| 58 | Snackbars | `/components/snackbars` | `src/views/Vuetify/Snackbars.vue` | Missing; disabled pending | None |
| 59 | Steppers | `/components/steppers` | `src/views/Vuetify/Steppers.vue` | Missing; disabled pending | None |
| 60 | Subheaders | `/components/subheaders` | `src/views/Vuetify/Subheaders.vue` | Missing; disabled pending | None |
| 61 | Tables / Data Iterators | `/components/tables/data-iterators` | `src/views/Vuetify/Tables/DataIterators.vue` | Missing; disabled pending | None |
| 62 | Tables / Simple Tables | `/components/tables/simple-tables` | `src/views/Vuetify/Tables/SimpleTables.vue` | Missing; disabled pending | None |
| 63 | Tables / Data Tables | `/components/tables/data-tables` | `src/views/Vuetify/Tables/DataTables.vue` | Missing; disabled pending | None |
| 64 | Tabs | `/components/tabs` | `src/views/Vuetify/Tabs.vue` | Missing; disabled pending | None |
| 65 | Timelines | `/components/timelines` | `src/views/Vuetify/Timelines.vue` | Missing; disabled pending | None |
| 66 | Tooltips | `/components/tooltips` | `src/views/Vuetify/Tooltips.vue` | Missing; disabled pending | None |
| 67 | Treeview | `/components/treeview` | `src/views/Vuetify/Treeview.vue` | Missing; disabled pending | None |
| 68 | VirtualScrollers | `/components/virtual-scrollers` | `src/views/Vuetify/VirtualScrollers.vue` | Missing; disabled pending | None |

## React Status Summary

| Status | Items |
|---|---|
| Approved | Api Explorer, Alerts, Avatars, Badges |
| Audited but missing | Banners |
| Missing / disabled pending | Bars through VirtualScrollers |
| Implemented pending approval | None in Vuetify section |
| Known mismatch deferred | None active in Vuetify. Spark Line is a Charts route, not a Vuetify route; keep any Sparkline mismatch outside this map unless Charts is reopened. |

## Recommended Next Slice

Next recommended Vuetify slice:

- Vuetify / Banners only.
- Route: `/components/banners`.
- Enable `UI Components > Vuetify > Banners`.
- Use `migration-docs/vuetify-banners-audit.md` as the implementation source.

Reason:

- It is the next Vue sidebar item after the approved Badges slice.
- Its source audit is already complete.
- It keeps Vuetify continuation aligned with the existing Batch A order.
