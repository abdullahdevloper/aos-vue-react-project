# Vuetify Batch 3 Audit

Status: audit only; no React implementation in this pass.

Scope:

- Floating Action Buttons: `/components/buttons/floating-action-buttons`
- Button Groups: `/components/buttons/button-groups`
- Calendars: `/components/calendars`
- Cards: `/components/cards`

Out of scope:

- Approved Vuetify slices.
- Directives.
- App.
- Dashboard.
- Animations.
- `.claude/`.

## Vue Routes And Sidebar

Vue sidebar source:

- `src/config/navigation-items.js`
  - `Buttons` group:
    - `Buttons`
    - `FloatingActionButtons` title `Floating Action`
    - `ButtonGroups` title `Button Groups`
  - then `Calendars`
  - then `Cards`

Vue route source:

- `src/router/routes/vuetify.js`

| Page | Vue route | Vue page source | React status |
|---|---|---|---|
| Floating Action Buttons | `/components/buttons/floating-action-buttons` | `src/views/Vuetify/Buttons/FloatingActionButtons.vue` | Missing route/page; sidebar item disabled/pending |
| Button Groups | `/components/buttons/button-groups` | `src/views/Vuetify/Buttons/ButtonGroups.vue` | Missing route/page; sidebar item disabled/pending |
| Calendars | `/components/calendars` | `src/views/Vuetify/Calendars.vue` | Missing route/page; sidebar item disabled/pending |
| Cards | `/components/cards` | `src/views/Vuetify/Cards.vue` | Missing route/page; sidebar item disabled/pending |

React route/sidebar source inspected:

- `react-dashboard-template/src/App.tsx`
  - Currently has `/components/buttons`.
  - Does not register Batch 3 routes.
- `react-dashboard-template/src/data/uiComponentsNavigation.tsx`
  - `Floating Action` disabled/pending under `Buttons`.
  - `Button Groups` disabled/pending under `Buttons`.
  - `Calendars` disabled/pending.
  - `Cards` disabled/pending.

## Floating Action Buttons

Vue sources:

- `src/views/Vuetify/Buttons/FloatingActionButtons.vue`
- `src/lang/en/components/FloatingActionButtons.json`
- `src/demo/examples/floating-action-buttons/usage.vue`
- `src/demo/examples/floating-action-buttons/simple/small.vue`
- `src/demo/examples/floating-action-buttons/simple/display-animation.vue`
- `src/demo/examples/floating-action-buttons/intermediate/speed-dial.vue`
- `src/demo/examples/floating-action-buttons/complex/lateral-screens.vue`

Documentation:

- Heading: `# Buttons: Floating Action Button`
- Heading text describes `v-btn` as a floating action button and `v-speed-dial`.
- Usage text explains attached FABs and the `small` variant.

Examples:

| Example | Vue components/props | Static or interactive | Behavior / risks |
|---|---|---|---|
| Usage | `v-card`, `v-toolbar`, `v-btn absolute dark fab top right`, `v-btn small absolute bottom left fab` | Static | Two responsive columns (`cols=12`, `md=6`) showing FAB placement in normal and extended toolbar cards |
| Small variant | `v-toolbar extended`, `v-btn fab color="cyan accent-2" bottom left absolute`, `v-list`, `v-dialog`, `v-text-field` | Interactive | FAB toggles dialog; dialog max-width `500px`; Submit closes dialog; list rows and icon buttons retain ripple |
| Display animation | `v-fab-transition`, `v-show`, `v-btn color="primary"` | Interactive | Hide/Show button toggles two FABs with Vuetify FAB transition |
| FAB with speed-dial | `v-speed-dial`, `v-checkbox`, `v-radio-group`, `v-btn fab small`, transition options | Interactive, high risk | Controls open-on-hover, top/right/bottom/left with watcher pairs, direction, transition; activator icon switches account/close; child FABs animate from activator |
| Lateral screens | `v-toolbar tabs`, `v-tabs`, `v-tabs-items`, `v-fab-transition`, computed `activeFab` | Interactive, medium risk | Tab selection changes FAB color/icon/key with transition; default tab yields empty activeFab until selected |

Responsive behavior:

- Usage: two columns on `md`, stacked below.
- Small: card centered in `sm=6 offset-sm=3`, full width on mobile.
- Speed dial controls use `cols=12 sm=6 md=4`.

Dark/inverted behavior:

- Examples use dark toolbar/buttons where specified.
- Shared doc example shell should still preserve invert example color behavior where Vue doc supports it.

Recommended implementation notes:

- Implement local FAB and speed-dial primitives visually matched to Vuetify.
- Treat speed-dial as a behavior spike because it combines hover/click, direction, position, and transition.

## Button Groups

Vue sources:

- `src/views/Vuetify/Buttons/ButtonGroups.vue`
- `src/lang/en/components/ButtonGroups.json`
- `src/demo/examples/button-groups/usage.vue`
- `src/demo/examples/button-groups/simple/rounded.vue`
- `src/demo/examples/button-groups/simple/mandatory.vue`
- `src/demo/examples/button-groups/simple/multiple.vue`
- `src/demo/examples/button-groups/intermediate/app-bar.vue`
- `src/demo/examples/button-groups/intermediate/qwerty.vue`

Documentation:

- Heading: `# Button groups`
- Heading text describes `v-btn-toggle`.
- Usage text: toggle buttons create a styled group selected/toggled under one `v-model`.

Examples:

| Example | Vue components/props | Static or interactive | Behavior / risks |
|---|---|---|---|
| Usage | Multiple `v-btn-toggle` groups; `multiple`, `dense`, `background-color="primary"`, `dark`, `mandatory`, `shaped`, `tile`, `group`, `borderless` | Interactive | Exclusive, multiple, no-selection, mandatory, text, and text+icon groups; selected values initialized as `2`, `[0,1,2]`, `null`, `0`, `center`, `justify` |
| Rounded buttons | `v-btn-toggle rounded`, `v-model` initially `undefined` | Interactive | Single select can become selected; rounded group geometry must match |
| Mandatory | `v-btn-toggle mandatory`, `v-model` initially `undefined` | Interactive | Vue forces/keeps a selected value; cannot fully deselect |
| Multiple | `v-btn-toggle multiple`, model displayed as `Model: {{ toggle_exclusive }}` | Interactive | Multiple selected values array updates visibly |
| In toolbar | `v-toolbar dense`, `v-overflow-btn`, `v-divider`, `v-spacer`, grouped dense toggles, `mdAndUp` gate | Interactive, medium risk | Font and size dropdowns plus dense grouped toggle controls; some toolbar controls hidden below md |
| Selected action | `v-card max-width=400`, `v-textarea auto-grow`, formatting/alignment toggles, custom color underline, keyboard rows | Interactive, medium risk | Textarea editing, multi-select formatting, exclusive alignment, custom qwerty display; preserve values and typography |

Responsive behavior:

- Usage uses two-column `sm=6` grid.
- Toolbar example hides most controls when `$vuetify.breakpoint.mdAndUp` is false.

Dark/inverted behavior:

- Usage includes primary dark toggle group.
- Example shell should support inverted mode checks where available.

Recommended implementation notes:

- Implement `v-btn-toggle` behavior before page assembly.
- `In toolbar` should reuse any exact overflow/dropdown behavior learned from Buttons dropdown mismatches.

## Calendars

Vue sources:

- `src/views/Vuetify/Calendars.vue`
- `src/lang/en/components/Calendars.json`
- `src/demo/examples/calendars/usage.vue`
- `src/demo/examples/calendars/playground.vue`
- `src/demo/examples/calendars/simple/weekly.vue`
- `src/demo/examples/calendars/simple/daily.vue`
- `src/demo/examples/calendars/intermediate/slots.vue`
- `src/demo/examples/calendars/intermediate/nowline.vue`
- `src/demo/examples/calendars/complex/events.vue`
- `src/demo/examples/calendars/complex/category.vue`
- `src/demo/examples/calendars/complex/dragndrop.vue`

Documentation:

- Heading: `# Calendars`
- Heading text explains daily, weekly, monthly, category views, event arrays, slots, and timed/all-day events.
- Usage text explains type, value, and event shape.

Playground:

- `doc-page` uses `playground="playground"`.
- Controls:
  - Prev/next absolute small FABs.
  - Type select: Day, 4 Day, Week, Month, Custom Daily, Custom Weekly.
  - Dark checkbox.
  - Short intervals/months/weekdays checkboxes.
  - Color select with large Vuetify color list.
  - Start, End, Today date menus with `v-date-picker`, Cancel/OK actions.
  - Event Overlap Mode select.
  - Weekdays select.
  - Conditional Minimum Weeks, Intervals, # of Days, Styling controls.
- Calendar:
  - `v-calendar` height `600`, model `start`, `start`, `end`, `min-weeks`, `max-days`, `now`, `dark`, weekdays, interval settings, event overlap, event color, `@change=getEvents`.

Examples:

| Example | Vue components/props | Static or interactive | Behavior / risks |
|---|---|---|---|
| Usage | Toolbar sheet with prev/next, type/mode/weekdays selects, `v-calendar`, random events on `@change` | Interactive, high risk | Date navigation, type switch, overlap mode, weekday filter, random event regeneration |
| Weekly | `v-calendar type="week"`, fixed today `2019-01-08`, fixed events, `scrollToTime('08:00')` | Mostly static + mounted scroll | Must render week calendar and auto-scroll timed area |
| Daily | `v-calendar type="day"`, `day-header` and `interval` slots | Static | Custom `Today` day header and interval labels like `{{ hour }} o'clock` |
| Slots | `v-calendar`, `day` slot with tracked color sheets | Static | Past days show colored proportional bands with title metadata |
| Events | Toolbar Today/prev/next/type menu, `click:event`, `click:more`, `click:date`, event detail menu | Interactive, high risk | Calendar view navigation, menu anchored to clicked event, type menu, generated events |
| Category | Toolbar Today/prev/next, `type="category"`, categories `John Smith`, `Tori Walker` | Interactive, medium risk | Category columns, generated event categories, navigation |
| Now Line | `v-calendar type="week"`, `timeToY`, `scrollToTime`, `updateTimes` every 60s, custom current-time line | Interactive/time-based, medium risk | Current time line position, minute updates, initial scroll |
| Drag and Drop | `v-calendar type="4day"`, `event-ripple=false`, mouse handlers for drag/create/extend/cancel | Interactive, very high risk | Drag timed events, create events by dragging time area, resize bottom handle, translucent active event color |

Responsive behavior:

- Playground controls are `sm=12 lg=3`, calendar is `sm=12 lg=9`.
- Calendar sheets use fixed heights `400`, `500`, or `600`.

Dark/inverted behavior:

- Playground has its own `dark` checkbox that must affect `v-calendar`.
- Example shell invert behavior is separate and should not break calendar-local dark mode.

Recommended implementation notes:

- Calendars should be a later batch or split into multiple spikes.
- A proven calendar rendering strategy is needed; recreating all `v-calendar` layout and drag behavior by hand is high risk.

## Cards

Vue sources:

- `src/views/Vuetify/Cards.vue`
- `src/lang/en/components/Cards.json`
- `src/demo/usages/cards.vue`
- `src/demo/examples/cards/simple/outlined.vue`
- `src/demo/examples/cards/intermediate/intermediate.vue`
- `src/demo/examples/cards/intermediate/info-card.vue`
- `src/demo/examples/cards/intermediate/media-with-text.vue`
- `src/demo/examples/cards/intermediate/grids.vue`
- `src/demo/examples/cards/complex/horizontal.vue`
- `src/demo/examples/cards/complex/custom-actions.vue`
- `src/demo/examples/cards/complex/twitter-card.vue`
- `src/demo/examples/cards/complex/loading.vue`
- `src/demo/examples/cards/complex/weather.vue`
- `src/demo/examples/cards/complex/advanced.vue`

Documentation:

- Heading: `# Cards`
- Heading text describes `v-card` and helper components.
- Usage text: `v-card-title`, `v-card-subtitle`, `v-card-text`, `v-card-actions`.
- Functional component notes for actions/subtitle/text/title.

Usage playground:

- `v-card width="342"` with dynamic attrs.
- Booleans: `disabled`, `loading`, `image`, `subtitle`, `supportingText`.
- Slider: `elevation`, min `2`, max `24`, initial `2`.
- Tabs: `default`, `outlined`, `raised`, `shaped`, `tile`.
- Image placeholder is a grey sheet height `200` with `mdi-image`.
- Watchers reset elevation for `outlined`, `raised`, `shaped`, `tile`.

Examples:

| Example | Vue components/props | Static or interactive | Behavior / risks |
|---|---|---|---|
| Outlined cards | `v-card max-width=344 outlined`, `v-list-item three-line`, avatar placeholder, two text buttons | Static + button ripple | Straightforward layout fidelity |
| Intermediate | Inline card with image `store.jpg` and vertical icon actions | Static + icon ripple | Remote image and compact action column |
| Information card | `v-card max-width=344`, word of the day content, Learn More text button | Static + button ripple | Typography/padding fidelity |
| Media with text | `v-img docks.jpg`, title overlay, subtitle/text/actions | Static + button ripple | Image overlay/title alignment |
| Grids | System bar, toolbar, three image cards with gradients and action icons | Static + icon ripple | Responsive `flex` columns `12/6/6`, remote images |
| Horizontal cards | System bar, app bar, music cards with avatar images | Static + icon ripple | Nested app shell/card layout and remote images |
| Custom actions | Image, Share/Explore, expand icon, `v-expand-transition` | Interactive, medium risk | Chevron toggles hidden text and divider with expand transition |
| Twitter card | Cyan dark card, avatar URL, heart/share counts | Static | External avatar URL and dense action row |
| Loading card | `v-card :loading`, image, rating, chip group, Reserve button | Interactive, medium risk | Chip selection, Reserve sets loading true for `2000ms`; card loading bar and disabled visual |
| Weather card | List title, weather image, slider with tick labels, forecast list | Interactive, medium risk | Slider value changes; tick labels, list spacing, weather icons/image |
| Advanced | Avatar, mountain image, text, action buttons/icons | Static + ripple | Straightforward card composition |

Assets/media:

- Remote Vuetify CDN card images:
  - `store.jpg`, `docks.jpg`, `house.jpg`, `road.jpg`, `plane.jpg`, `foster.jpg`, `halcyon.png`, `sunshine.jpg`, `cooking.png`, `sun.png`, `mountain.jpg`.
- External avatar:
  - `https://avataaars.io/...`

Responsive behavior:

- Many cards use fixed `max-width` and centered layout.
- Grids uses `v-row dense` and card `flex` values.
- Usage card is centered in a fill-height container.

Dark/inverted behavior:

- Several examples set `dark` directly (`twitter-card`, `horizontal` nested cards).
- Example shell invert behavior must not override explicit dark card states incorrectly.

Recommended implementation notes:

- Cards is implementation-friendly compared with Calendars.
- Split interactive examples (`custom-actions`, `loading`, `weather`) if visual review finds issues.

## Risk Classification

| Page | Static examples | Interactive examples | Risk |
|---|---:|---:|---|
| Floating Action Buttons | 1 | 4 | Medium-high because speed-dial and transitions require exact behavior |
| Button Groups | 0 | 6 | Medium because selection models and responsive toolbar controls must be exact |
| Calendars | 3 | 6 plus playground | Very high because `v-calendar` behavior is broad and drag/drop is complex |
| Cards | 7 | 4 plus playground | Medium; mostly visual, with a few contained interactions |

## Recommended Implementation Order

Preserve Vue sidebar order:

1. Floating Action Buttons: `/components/buttons/floating-action-buttons`
2. Button Groups: `/components/buttons/button-groups`
3. Calendars: `/components/calendars`
4. Cards: `/components/cards`

Recommended first implementation slice:

- Vuetify / Floating Action Buttons.

Why:

- It is first in Vue sidebar order after Buttons.
- It is smaller than Calendars.
- It exercises FAB, dialog, tab-dependent action, and speed-dial behavior without requiring a full calendar engine.
- Risky `speed-dial` can be isolated as a follow-up behavior spike if needed.

Known high-risk behavior spikes:

- Floating Action Buttons: `FAB with speed-dial`.
- Button Groups: `In toolbar` if exact `v-overflow-btn` is not already solved.
- Calendars: playground/date menus, Events detail menu, Now Line, Drag and Drop.
- Cards: Loading card and Weather card if slider/loading visuals mismatch Vue.
