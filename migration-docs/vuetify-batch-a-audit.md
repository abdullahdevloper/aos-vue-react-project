# UI Components / Vuetify Batch A Audit

Last updated: 2026-05-07

## Scope

Audit-only scope for the first Vuetify slice under UI Components.

Batch A pages:

- Api Explorer
- Alerts
- Avatars
- Badges
- Banners

Out of scope:

- Vuetify Batch B and later
- Style & User Interface
- Pages
- Charts
- Widgets
- React implementation changes

## Shared Source References

- Sidebar: `src/config/navigation-items.js`
- Routes: `src/router/routes.js`, `src/router/routes/vuetify.js`
- Shared page wrapper: `src/demo/components/DocPage.vue`
- Shared examples renderer: `src/demo/components/Examples.vue`
- Shared example card/action bar: `src/demo/components/Example.vue`
- Shared usage wrapper: `src/demo/components/Usage.vue`
- Shared usage playground: `src/demo/components/UsageExample.vue`
- API explorer: `src/demo/components/Api/ApiExplorer.vue`
- API tables: `src/demo/components/Api/Api.vue`, `src/demo/components/Api/ApiItems.vue`, `src/demo/components/Api/ApiItem.vue`

## Sidebar Inventory

Batch A lives under the Vue navigation parent:

| Parent | Group | Icon | Child entry | Route name |
|---|---|---|---|---|
| Vuetify | `components` | `dashboard` | Api Explorer | `ApiExplorerView` |
| Vuetify | `components` | `dashboard` | Alerts | `AlertsView` |
| Vuetify | `components` | `dashboard` | Avatars | `AvatarsView` |
| Vuetify | `components` | `dashboard` | Badges | `BadgeView` |
| Vuetify | `components` | `dashboard` | Banners | `BannersView` |

The React sidebar target should keep the existing approved UI Components shell and add only the Vuetify parent plus Batch A children needed for this slice. Charts and Widgets entries must remain unchanged.

## Route Inventory

| Page | Vue route | Vue route name | Vue view |
|---|---|---|---|
| Api Explorer | `/components/vuetify/api-explorer` | `components/ApiExplorerView` | `src/views/Vuetify/ApiExplorerView.vue` |
| Alerts | `/components/alerts` | `components/AlertsView` | `src/views/Vuetify/AlertsView.vue` |
| Avatars | `/components/avatars` | `components/AvatarsView` | `src/views/Vuetify/AvatarsView.vue` |
| Badges | `/components/badge` | `components/BadgeView` | `src/views/Vuetify/BadgeView.vue` |
| Banners | `/components/banners` | `components/BannersView` | `src/views/Vuetify/BannersView.vue` |

Note: the Vue source uses singular `/components/badge` for the Badges page.

## Shared Docs Behavior

All non-API Batch A pages use the Vue documentation/demo page pattern:

- `vuse-section-definition` style header with namespace, page title, icon avatar, and breadcrumbs.
- Heading text rendered through `doc-text`.
- Optional usage section with `Generic.Pages.usage` heading.
- Usage playground uses a two-column outlined card on desktop: live component area on the left and `Options` panel on the right.
- Usage controls include tabs, switches, sliders, selects, and text inputs depending on page config.
- Usage playground has a top-right tooltip/button labeled `Invert playground colors`; clicking toggles the playground surface between light and dark.
- Examples section renders `Generic.Pages.examples` heading and examples text.
- Each example uses a soft documentation card with a compact toolbar, optional `New` chip, and top-right icon buttons.
- Example action buttons include tooltip/action for `Invert example colors`, GitHub source link, and source-code expand/collapse.
- The source-code action opens a dark code panel with language tabs for template/style/script when available.
- Examples lazy-load component and raw source; source panel content is loaded when the example enters the viewport or is eager.
- On larger screens, the example container can scroll vertically with `max-height: calc(100vh - 275px)`.
- On small screens, examples stack and the usage options panel moves below the preview.

React implementation must recreate these behaviors or document exceptions before approval.

## Page Audit: Api Explorer

### Route And Sidebar

- Route: `/components/vuetify/api-explorer`
- Sidebar: `UI Components` > `Vuetify` > `Api Explorer`

### Vue Source Files

- `src/views/Vuetify/ApiExplorerView.vue`
- `src/demo/components/Api/ApiExplorer.vue`
- `src/demo/components/Api/Api.vue`
- `src/demo/components/Api/ApiItems.vue`
- `src/demo/components/Api/ApiItem.vue`
- `src/demo/components/Parameters/Parameters.vue`
- API data dependency: `@vuetify/api-generator`

### Visible Sections

- Vuse section definition header.
- Intro documentation text.
- Full-width autocomplete with database-search icon.
- Empty state with centered gray text: search prompt, `or`, browse-categories prompt.
- Selected component API section with heading, API text, toolbar, select, search, vertical tabs, and parameter rows.

### Buttons, Actions, Tooltips

- Autocomplete clear action.
- Autocomplete chip selection with component icon and label.
- API table toolbar component select.
- API table search field with magnify icon and clear action.
- API tabs for available categories such as props, slots, events, functions, options, sass.
- No explicit tooltip in this page source beyond native Vuetify input affordances.

### API Explorer Behavior

- Autocomplete lists Vuetify API entries from `@vuetify/api-generator`.
- Items are sorted alphabetically.
- Entries classify as Components, Layout/Grid Component, Motion/Transition, Functional Components, or directives using icon/subtext rules.
- Directives `v-ripple`, `v-touch`, `v-scroll`, and `v-resize` are excluded.
- Selecting an item renders `doc-api` for the selected component.
- API items choose the first populated tab among props, slots, and options when the active tab becomes empty.
- Search filters parameter rows inside the selected API category.
- On desktop, API category tabs are vertical; on small screens, tabs become horizontal.
- Parameter rows render name, type, default, description, snippets, examples, signatures, props, and sass defaults with monospace/code styling.

### Data And Assets

- Requires generated Vuetify API metadata or a React-local equivalent data subset.
- No local image/audio/media assets.
- Icons: Material Design Icons equivalents for database search, dashboard, grid, function, transition, magnify.

### Responsive Behavior

- Autocomplete remains full width.
- API toolbar select and search split into two columns at `md` and stack on smaller screens.
- API tabs are vertical on `smAndUp` and horizontal on smaller screens.
- API tab panels cap at about 800px height with internal scrolling.

### Visual Fidelity Requirements

- Preserve Vuse pale dashboard background and soft documentation surfaces.
- Autocomplete should be raised/soft, dense, and Vuetify-like, not a generic browser select.
- API toolbar should use the original primary/teal bar feel with white outlined controls.
- Parameter rows need compact overline labels, monospace values, and subtle dividers/spacing.

### React Target Files

- `react-dashboard-template/src/pages/ui-components/vuetify/ApiExplorerPage.tsx`
- `react-dashboard-template/src/components/vuetify-docs/ApiExplorer.tsx`
- `react-dashboard-template/src/components/vuetify-docs/ApiItems.tsx`
- `react-dashboard-template/src/components/vuetify-docs/ApiParameterRow.tsx`
- `react-dashboard-template/src/data/vuetifyApiData.ts`

### Implementation Checklist

- Add route and sidebar entry without changing approved Charts/Widgets.
- Recreate autocomplete with chips, item icons, clear behavior, and empty state.
- Provide API metadata source or documented Batch A subset.
- Recreate selected API view with select/search/tabs/parameter rendering.
- Verify responsive toolbar and tab orientation.

## Page Audit: Alerts

### Route And Sidebar

- Route: `/components/alerts`
- Sidebar: `UI Components` > `Vuetify` > `Alerts`

### Vue Source Files

- `src/views/Vuetify/AlertsView.vue`
- `src/demo/usages/alerts.vue`
- `src/demo/examples/alerts/simple/type.vue`
- `src/demo/examples/alerts/simple/border.vue`
- `src/demo/examples/alerts/simple/colored-border.vue`
- `src/demo/examples/alerts/simple/dense.vue`
- `src/demo/examples/alerts/simple/dismissible.vue`
- `src/demo/examples/alerts/simple/icon.vue`
- `src/demo/examples/alerts/simple/outlined.vue`
- `src/demo/examples/alerts/simple/prominent.vue`
- `src/demo/examples/alerts/simple/text.vue`
- `src/demo/examples/alerts/simple/transition.vue`
- `src/demo/examples/alerts/complex/twitter.vue`

### Visible Sections

- Header and breadcrumbs: Components > Vuetify > Alerts.
- Usage playground.
- Examples section with eleven alert examples.

### Usage Controls

- Switch: `dismissible`.
- Slider: `elevation`, range 0-24.
- Tabs: `normal`, `dense`, `prominent`, `outlined`, `text`, `tile`.
- Selects:
  - `border`: top, right, left, bottom.
  - `color`: red, orange, yellow, green, blue, purple.
  - `icon`: mdi-vuetify, mdi-account.
  - `type`: success, info, warning, error.

### Buttons, Actions, Tooltips

- Shared usage invert tooltip/action: `Invert playground colors`.
- Shared example invert tooltip/action: `Invert example colors`.
- Shared GitHub and source expand/collapse actions.
- Dismissible examples show close icons; close text is `Close Alert`.
- Dismissible examples show a `Reset` button after closing.
- Transition example has a `Toggle` button.
- Prominent example includes `Take action`.
- Text example includes `Okay`.
- Twitter complex example uses a delete close icon and `Reset` button after dismissal.

### Hover, Click, Toggle Behavior

- Close icon hides the alert.
- Reset button restores hidden alert.
- Toggle button shows/hides alert with scale transition.
- Usage switches, tabs, slider, and selects immediately alter preview props.
- Example action icons use hover tooltips and icon hover states.

### Data And Assets

- No local assets required.
- Icons include success/info/warning/error defaults, `mdi-home`, `mdi-cloud-alert`, `mdi-fire`, `mdi-clock-fast`, `mdi-delete`, `mdi-vuetify`, `mdi-account`.

### Responsive Behavior

- Usage preview and options split 9/3 columns on desktop and stack on smaller screens.
- Alert content remains full-width inside the example card.

### Visual Fidelity Requirements

- Alerts need Vuetify-like color variants, border positions, text/outlined/prominent/dense/tile styles, close icon placement, and transition behavior.
- Demo cards must use the same light documentation surface, subtle elevation, minimal action icons, and Vuse spacing already approved for Charts.

### React Target Files

- `react-dashboard-template/src/pages/ui-components/vuetify/AlertsPage.tsx`
- `react-dashboard-template/src/components/vuetify-docs/DocPage.tsx`
- `react-dashboard-template/src/components/vuetify-docs/UsagePlayground.tsx`
- `react-dashboard-template/src/components/vuetify-docs/VuetifyExampleBlock.tsx`
- `react-dashboard-template/src/components/vuetify-examples/alerts/*`

### Implementation Checklist

- Implement usage controls and preview.
- Implement all eleven examples.
- Preserve dismiss/reset/toggle behavior.
- Preserve example action bar invert/source affordances.
- Verify mobile stacking.

## Page Audit: Avatars

### Route And Sidebar

- Route: `/components/avatars`
- Sidebar: `UI Components` > `Vuetify` > `Avatars`

### Vue Source Files

- `src/views/Vuetify/AvatarsView.vue`
- `src/demo/usages/avatars.vue`
- `src/demo/examples/avatars/simple/size.vue`
- `src/demo/examples/avatars/simple/tile.vue`
- `src/demo/examples/avatars/intermediate/default.vue`
- `src/demo/examples/avatars/intermediate/profile.vue`
- `src/demo/examples/avatars/complex/advanced.vue`

### Visible Sections

- Header and breadcrumbs: Components > Vuetify > Avatars.
- Usage playground.
- Five avatar examples.

### Usage Controls

- Switches: `image`, `tile`.
- Select: `color` with primary, accent, warning lighten-2, teal, grey lighten-2.
- Slider: `size`, range 56-128.

### Buttons, Actions, Tooltips

- Shared usage/example invert and source actions.
- Advanced example uses expansion panels; clicking a panel header expands/collapses the message content.
- No page-specific buttons in the basic avatar examples.

### Hover, Click, Toggle Behavior

- Usage controls update avatar image/text, color, tile shape, and size.
- Advanced expansion panels use popout hover/click affordance and expand a text body.

### Data And Assets

- Remote images:
  - `https://vuetifyjs.com/apple-touch-icon-180x180.png`
  - `https://picsum.photos/630/280?image=618`
  - `https://avatars0.githubusercontent.com/u/9064066?v=4&s=460`
- Local image references:
  - `/static/doc-images/lists/m4.jpg`
  - The default example has `/static/doc-images/lists/m4.jpgg` in source, likely an intentional/broken demo typo; document before implementing.
- Icons: people, local_offer.

### Responsive Behavior

- Profile card max-width 434px.
- Advanced example hides some columns at `xs` and `sm` breakpoints.
- Expansion rows use column widths `cols=4 sm=2 md=1`, `sm=5 md=3`, `cols=5 sm=3`.

### Visual Fidelity Requirements

- Avatar sizing, circular/tile shape, image cropping, chips, expansion panel popout, and profile-card overlay must match Vuetify density and proportions.
- Preserve dark overlay text in profile image card.

### React Target Files

- `react-dashboard-template/src/pages/ui-components/vuetify/AvatarsPage.tsx`
- `react-dashboard-template/src/components/vuetify-examples/avatars/*`
- Required copied assets under `react-dashboard-template/src/assets/ui-components/vuetify/avatars/` only if local assets are needed.

### Implementation Checklist

- Implement usage preview controls.
- Implement all five examples.
- Preserve expansion panel click behavior.
- Decide/document treatment of the source typo `m4.jpgg`.
- Verify responsive hidden/truncated columns.

## Page Audit: Badges

### Route And Sidebar

- Route: `/components/badge`
- Sidebar: `UI Components` > `Vuetify` > `Badges`

### Vue Source Files

- `src/views/Vuetify/BadgeView.vue`
- `src/demo/usages/badges.vue`
- `src/demo/examples/badges/simple/tabs.vue`
- `src/demo/examples/badges/intermediate/hover.vue`
- `src/demo/examples/badges/complex/dynamic.vue`
- `src/demo/examples/badges/complex/customization.vue`

### Visible Sections

- Header and breadcrumbs: Components > Vuetify > Badge.
- Usage playground.
- Four badge examples.

### Usage Controls

- Switches: `dot`, `overlap`, `icon`, `left`, `bottom`.
- Tabs: `default`, `hidden`, `text`, `inline`, `bordered`.

### Buttons, Actions, Tooltips

- Shared usage/example invert and source actions.
- Dynamic example buttons:
  - `Send Message` increments badge count.
  - `Clear Notifications` resets count to zero and hides badge.
- Customization example has a `Lock Account` button with an error badge.
- Simple tabs example uses three clickable tabs with dot, numeric, and icon badges.

### Hover, Click, Toggle Behavior

- Hover example shows the `9999+` badge only while hovering the account icon, with slide-x transition.
- Dynamic badge visibility is driven by message count.
- Usage tabs and switches update badge position/content/inline/hidden/bordered behavior.

### Data And Assets

- Local image:
  - `/static/doc-images/lists/m2.jpg`
- Remote images:
  - `https://cdn.vuetifyjs.com/images/logos/v.png`
  - `https://cdn.vuetifyjs.com/images/john.png`
- Icons: `mdi-vuetify`, `mdi-email`, `mdi-account-circle`, `mdi-lock`, `mdi-bell`.

### Responsive Behavior

- Examples center content in responsive containers.
- Tabs example grows tabs to fill toolbar width.

### Visual Fidelity Requirements

- Badge placement, overlap, dot mode, bordered mode, avatar badge slot, and tab toolbar colors must closely match Vuetify.
- Dynamic and hover transitions must feel immediate and polished.

### React Target Files

- `react-dashboard-template/src/pages/ui-components/vuetify/BadgesPage.tsx`
- `react-dashboard-template/src/components/vuetify-examples/badges/*`
- Required copied assets under `react-dashboard-template/src/assets/ui-components/vuetify/badges/` only if local assets are needed.

### Implementation Checklist

- Implement usage preview.
- Implement all four examples.
- Preserve hover-only badge visibility.
- Preserve dynamic count/reset behavior.
- Preserve singular Vue route `/components/badge`.

## Page Audit: Banners

### Route And Sidebar

- Route: `/components/banners`
- Sidebar: `UI Components` > `Vuetify` > `Banners`

### Vue Source Files

- `src/views/Vuetify/BannersView.vue`
- `src/demo/usages/banners.vue`
- `src/demo/examples/banners/usage.vue`
- `src/demo/examples/banners/playground.vue`
- `src/demo/examples/banners/simple/single-line.vue`
- `src/demo/examples/banners/simple/two-line.vue`
- `src/demo/examples/banners/intermediate/icon-slot.vue`
- `src/demo/examples/banners/intermediate/icon-event.vue`
- `src/demo/examples/banners/intermediate/actions-slots.vue`

The page examples list in `BannersView.vue` includes five examples: `single-line`, `two-line`, `icon-slot`, `icon-event`, and `actions-slots`. The `usage.vue` and `playground.vue` files are related demo files and should be used for behavior reference.

### Visible Sections

- Header and breadcrumbs: Components > Vuetify > Badge in source, likely a source typo because page is Banners.
- Usage playground.
- Five banner examples.

### Usage Controls

- Switches: `action`, `icon`.
- Slider: `elevation`, range 0-24.
- Tabs: `default`, `single-line`, `sticky`.

### Buttons, Actions, Tooltips

- Shared usage/example invert and source actions.
- Usage preview can show an `Action Button`.
- Single-line example has `Get Online`.
- Two-line example has `Dismiss` and `Retry`.
- Icon-slot example has two `Action` buttons.
- Icon-event example has `Connecting Settings`; clicking the banner icon calls `alert('Hello, World!')`.
- Actions-slots example has a `Visible` checkbox, `Dismiss`, and `Retry`; clicking `Dismiss` hides the banner.
- Playground demo includes switches, selects, slider, and an `Action` button.

### Hover, Click, Toggle Behavior

- Sticky switch toggles fixed/sticky banner behavior inside a scrollable sheet.
- Single-line switch changes banner density in playground.
- Icon/color/icon-color selects change banner visual treatment.
- Elevation slider changes shadow strength.
- Icon-event click calls the browser alert.
- Checkbox toggles banner visibility.
- Dismiss slot action hides the banner with slide-y transition.

### Data And Assets

- No local images/audio/media assets required.
- Icons include `mdi-vuetify`, `mdi-plus`, `mdi-minus`, `mdi-access-point-network`, `mdi-network-strength-2-alert`, `mdi-earth`, and `mdi-wifi-strength-alert-outline`.

### Responsive Behavior

- Usage playground has a constrained scroll area with sticky mode creating a tall internal scroll region.
- Example content should keep full-width document layout and stack controls on narrow screens.

### Visual Fidelity Requirements

- Banner actions, icon slot, sticky scroll container, two-line wrapping, and text button colors must match Vuetify.
- Preserve compact document-card action bar styling and Vuse soft surfaces.
- Note the breadcrumb typo in Vue source but present the user-facing page as Banners unless exact breadcrumb fidelity is requested.

### React Target Files

- `react-dashboard-template/src/pages/ui-components/vuetify/BannersPage.tsx`
- `react-dashboard-template/src/components/vuetify-examples/banners/*`

### Implementation Checklist

- Implement usage preview controls.
- Implement all five page examples.
- Preserve visible checkbox/dismiss/sticky/icon-click behavior.
- Document whether browser alert is implemented as native alert or accessible mock before approval.
- Verify sticky scroll behavior.

## Current React Gaps

Missing routes:

- `/components/vuetify/api-explorer`
- `/components/alerts`
- `/components/avatars`
- `/components/badge`
- `/components/banners`

Missing pages:

- Api Explorer page
- Alerts page
- Avatars page
- Badges page
- Banners page

Missing shared primitives:

- Vuetify documentation page shell for this section.
- Vuetify usage playground with controls and invert mode.
- Vuetify example block with invert, GitHub/source actions, and source-code panel.
- API explorer autocomplete and API parameter table.
- Vuetify-like alert, avatar, badge, and banner demo primitives adapted to the Vuse visual style.

Missing visual/design elements:

- Vuetify parent sidebar item under UI Components.
- Batch A active navigation states.
- Documentation-style `DocPage` layout and `Examples` section.
- Vuse/Vuetify usage card split layout.
- Code/source panel visual treatment.
- Component-specific transitions, hover states, sticky banner behavior, and API explorer filtering.

## Behavior Checklist

- Sidebar parent expand/collapse and active child pill.
- Page header, breadcrumbs, and documentation text spacing.
- Usage tabs, switches, sliders, selects, text inputs where configured.
- Usage invert-color action.
- Example invert-color action.
- GitHub/source action affordances and source panel expand/collapse.
- Example code tabs for template/style/script when source panel is open.
- Alert dismiss/reset/toggle/transition behavior.
- Avatar expansion panel click behavior and responsive hidden columns.
- Badge hover-only display, dynamic counter, reset, and tab switching.
- Banner sticky scroll, checkbox visibility, dismiss slot, icon click, and action buttons.
- API explorer autocomplete search/clear/select, selected chip, empty state, API tabs, API search, and parameter rendering.
- Responsive stacking of usage/options and examples.

## Required React Target Files

Recommended target paths for implementation:

- `react-dashboard-template/src/pages/ui-components/vuetify/ApiExplorerPage.tsx`
- `react-dashboard-template/src/pages/ui-components/vuetify/AlertsPage.tsx`
- `react-dashboard-template/src/pages/ui-components/vuetify/AvatarsPage.tsx`
- `react-dashboard-template/src/pages/ui-components/vuetify/BadgesPage.tsx`
- `react-dashboard-template/src/pages/ui-components/vuetify/BannersPage.tsx`
- `react-dashboard-template/src/components/vuetify-docs/DocPage.tsx`
- `react-dashboard-template/src/components/vuetify-docs/UsagePlayground.tsx`
- `react-dashboard-template/src/components/vuetify-docs/VuetifyExampleBlock.tsx`
- `react-dashboard-template/src/components/vuetify-docs/ApiExplorer.tsx`
- `react-dashboard-template/src/components/vuetify-docs/ApiItems.tsx`
- `react-dashboard-template/src/components/vuetify-docs/ApiParameterRow.tsx`
- `react-dashboard-template/src/components/vuetify-examples/alerts/*`
- `react-dashboard-template/src/components/vuetify-examples/avatars/*`
- `react-dashboard-template/src/components/vuetify-examples/badges/*`
- `react-dashboard-template/src/components/vuetify-examples/banners/*`
- `react-dashboard-template/src/data/vuetifyBatchA.ts`
- `react-dashboard-template/src/data/vuetifyApiData.ts`
- `react-dashboard-template/src/assets/ui-components/vuetify/*` only for required copied assets.

## Recommended Implementation Order

1. Shared Vuetify docs shell, sidebar parent, and Batch A route wiring.
2. Api Explorer page, because it has a custom interaction model and no example-card dependency.
3. Alerts page, to validate the shared usage playground and example-card behavior with the broadest control set.
4. Avatars page, including expansion panel and image asset decisions.
5. Badges page, including hover and dynamic count behavior.
6. Banners page, including sticky scroll, visibility/dismiss, and icon-click behavior.

## Audit Status

- Source audit: complete.
- Routes/sidebar audit: complete.
- Visual audit from Vue source and running-app behavior requirements: complete.
- Behavior audit: complete for visible Batch A interactions.
- Data/assets audit: complete for referenced files and remote media.
- Implementation: not started.
- Charts: approved and untouched.
- Widgets: approved and untouched.
