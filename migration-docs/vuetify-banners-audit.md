# Vuetify Banners Audit

Status: audit complete; implementation not started.

Scope:

- Vuetify / Banners only.
- Vue route: `/components/banners`.
- React route target: `/components/banners`.

Out of scope:

- Directives.
- Animations.
- Dashboard.
- App Contacts / Chat.
- Approved Vuetify slices.
- React implementation code.
- `.claude/`.

## Vue Route And Sidebar

| Item | Vue source | Vue behavior |
|---|---|---|
| Sidebar entry | `src/config/navigation-items.js` | `UI Components > Vuetify > Banners`, after `Badges` and before `Bars` |
| Route | `src/router/routes/vuetify.js` | `/components/banners` |
| Route name | `src/router/routes/vuetify.js` | `components/BannersView` |
| View component | `src/router/routes/vuetify.js` | `Vuetify/BannersView` |
| Nav flag | `src/router/routes/vuetify.js` | `navs: true` |

## Vue Source Files

Page source:

- `src/views/Vuetify/BannersView.vue`

Documentation source:

- `src/lang/en/components/Banners.json`

Shared docs shell:

- `src/demo/components/DocPage.vue`
- `src/demo/components/Usage.vue`
- `src/demo/components/UsageExample.vue`
- `src/demo/components/Examples.vue`
- `src/demo/components/Example.vue`
- `src/demo/components/DocText.vue`
- `src/demo/components/BaseMarkdown.vue`

Rendered usage component:

- `src/demo/usages/banners.vue`

Example files:

- `src/demo/examples/banners/usage.vue`
- `src/demo/examples/banners/simple/single-line.vue`
- `src/demo/examples/banners/simple/two-line.vue`
- `src/demo/examples/banners/intermediate/icon-slot.vue`
- `src/demo/examples/banners/intermediate/icon-event.vue`
- `src/demo/examples/banners/intermediate/actions-slots.vue`

Related but not directly listed in `BannersView.vue` examples:

- `src/demo/examples/banners/playground.vue`

## Vue Page Structure

`BannersView.vue` renders:

- `v-container fluid`
- `vuse-section-definition`
  - `namespace="Components"`
  - `page="Banners"`
  - icon `aspect_ratio`
- Breadcrumbs:
  - `Components` -> `/components/vuetify/api-explorer`
  - `Vuetify` -> `/components/vuetify/api-explorer`
  - `Badge` disabled
- `doc-page`
  - `namespace="components"`
  - `page="Banners"`
  - `usage`
  - `examples`

Note: the final breadcrumb text is `Badge` in the Vue source even though the page is Banners. React should preserve or document this exact source behavior during implementation.

## Documentation Text

Main heading:

- `# Banners`

Heading text:

- The `v-banner` component is used as middle-interruptive message to user with 1-2 actions. It comes in 2 variations, **single-line** and **multi-line** (implicit). These can have icons which you can use with your message and actions.

Usage text:

- Banners can have 1-2 lines of text, actions and icon.

Examples:

| Example | Heading | Vue documentation text |
|---|---|---|
| `simple/single-line` | `### Single-line (desktop)` | Single-line v-banner is used for small amount of information and is recommended for desktop only implementations. You can optionally enable the `sticky` prop to ensure the content is pinned to the screen (note: does not work in IE11). You can find more information about sticky positioning on MDN. |
| `simple/two-line` | `### Two-line (mobile)` | Two-line v-banner can store larger amount of data, use it for big messages. Recommended for mobile. |
| `intermediate/icon-slot` | `### Icon slot` | The icon slot allows you to explicitly control the content and functionality within it. |
| `intermediate/icon-event` | `### Icon click event` | The `click:icon` event is emitted when the icon is clicked. |
| `intermediate/actions-slots` | `### Actions slot` | The `actions` slot has a dismiss function in its scope, you can use it to easily dismiss the banner. |

Inline code tokens must match Vue markdown styling:

- `v-banner`
- `sticky`
- `click:icon`
- `actions`

## Usage Playground

`BannersView.vue` passes this usage object:

```js
{
  booleans: ["action", "icon"],
  sliders: ["elevation"],
  tabs: ["default", "single-line", "sticky"]
}
```

`UsageExample.vue` renders:

- A two-column card.
- Left content column, `md="9"`.
- Right options column, `md="3"`.
- Top tabs for the provided tab names.
- 300px example body in a scrollable `v-sheet`.
- Options header with `Options` title.
- Invert playground colors icon button when global theme is not dark.
- Switch controls for boolean options.
- Slider controls for elevation, min `0`, max `24`.

`src/demo/usages/banners.vue` renders:

- `v-responsive max-height="252"` as `v-container`.
- A scrollable usage area.
- A tall sticky layout when `attrs.sticky` is true.
- `v-banner v-bind="$_attrs"`.
- Text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis magnam necessitatibus possimus`
- Optional action button when `attrs.action` is true:
  - text button
  - color `deep-purple accent-4`
  - label `Action Button`
- Optional icon mapping:
  - boolean `icon` becomes `mdi-vuetify`.

## Vue Examples And Behavior

| Example | Visible content | Actions / behavior |
|---|---|---|
| `usage.vue` | Single-line banner with text `One line message text string with two actions on tablet / Desktop` | `Action` text button, color `deep-purple accent-4` |
| `simple/single-line.vue` | Card with system bar, toolbar title `My Document`, `Sticky Banner` switch, offline banner, grey content body | Switch toggles `sticky`; action button `Get Online` |
| `simple/two-line.vue` | Two-line text banner | Action buttons `Dismiss` and `Retry`, both primary text buttons |
| `intermediate/icon-slot.vue` | Two-line banner with 40px deep-purple avatar icon slot containing `mdi-lock` | Two `Action` buttons, color `deep-purple accent-4` |
| `intermediate/icon-event.vue` | Single-line banner with warning wifi icon slot | Clicking icon emits `click:icon` and calls `alert("Hello, World!")`; action button `Connecting Settings` |
| `intermediate/actions-slots.vue` | Checkbox `Visible`; single-line banner `No Internet connection` | `Dismiss` action uses slot `dismiss` and hides banner; checkbox restores it; banner transition `slide-y-transition` |

`src/demo/examples/banners/playground.vue` exists and contains a fuller local playground with:

- `Sticky` switch.
- `Single-line` switch.
- `Icon` select.
- `Color` select.
- `Icon color` select.
- `Elevation` slider.
- Long 1500px scroll container.

This file is not listed in `BannersView.vue` `examples`, so implementation should treat it as source context only unless Vue rendering proves it is displayed through another docs path.

## Example Shell Behavior

`Example.vue` wraps every listed example in a Vuse docs card:

- Card class `neu-glow-inset`.
- Dense transparent toolbar.
- Heading from localized example metadata.
- Action icons:
  - Invert example colors.
  - View on Github.
  - View source.
- View source expands a dark `#2d2d2d` source panel.
- Source panel tabs are generated from parsed sections: `template`, `style`, `script`.
- Example body renders `doc-text` description first, then the Vue example component.
- Inverted state sets the example sheet to dark mode.

Implementation must preserve:

- source/code panel expansion
- source tabs
- invert example color behavior
- dark/inverted body styling
- action icon placement
- header/body separation

## Responsive Behavior

Vue responsive behavior comes from Vuetify:

- Page uses `v-container fluid`.
- `DocPage` rows are full-width `v-row class="mx-0"` with `v-col cols="12"`.
- Usage playground uses `v-col cols="12" md="9"` and `v-col cols="12" md="3"`, so options stack under the example below `md`.
- Example body/source panels follow `Example.vue`; source container gains `v-example__container` only on `smAndUp`.
- Single-line docs explicitly state desktop recommendation.
- Two-line docs explicitly state mobile recommendation.

React must not impose arbitrary breakpoints; it should mirror the Vuetify column behavior.

## Light, Dark, And Inverted Behavior

- Banners examples do not mark `uninverted`, so the shared invert example action is expected.
- Usage playground has independent `dark` state via the invert playground colors button.
- Inverted examples should keep banner text/buttons readable and match Vue dark sheet behavior.
- Source panel is always dark.

## React Current State

React sources inspected:

- `react-dashboard-template/src/App.tsx`
- `react-dashboard-template/src/data/uiComponentsNavigation.tsx`
- `react-dashboard-template/src/pages`

Current React status:

- Sidebar entry exists as `Banners`, but it is `disabled: true` and `pending: true`.
- No `/components/banners` route is registered.
- No Banners page component exists.
- No Banners-specific usage playground or examples are implemented.
- Approved Vuetify slices currently present: Api Explorer, Alerts, Avatars, Badges.

## Current React Gaps

| Gap | Vue expected | React current |
|---|---|---|
| Route | `/components/banners` | Missing |
| Sidebar | `UI Components > Vuetify > Banners` navigable | Visible but disabled/pending |
| Page shell | `vuse-section-definition` + `doc-page` | Missing |
| Documentation text | Exact `Banners.json` text | Missing |
| Usage playground | Tabs, switches, elevation slider, invert playground colors, scrollable 300px body | Missing |
| Banner examples | Six rendered Vue examples listed above | Missing |
| Source panels | View source with section tabs | Missing for Banners |
| Invert behavior | Example-level and usage-level invert behavior | Missing for Banners |
| Dismiss behavior | `actions-slots` dismiss hides banner and checkbox restores it | Missing |
| Icon click behavior | `click:icon` alert | Missing |
| Responsive behavior | Vuetify docs shell columns and stacking | Missing |

## React Target Files

Expected implementation targets:

- `react-dashboard-template/src/App.tsx`
- `react-dashboard-template/src/data/uiComponentsNavigation.tsx`
- `react-dashboard-template/src/pages/vuetify/BannersPage.tsx`
- Existing shared Vuetify docs/example shell files, only if Banners requires small reusable additions.

Reports:

- `migration-docs/phase-report.md`
- `migration-docs/progress.md`

## Implementation Checklist

- Add `/components/banners` route.
- Enable only Vuetify / Banners sidebar item.
- Preserve approved Api Explorer, Alerts, Avatars, and Badges.
- Rebuild Banners page using the existing Vuse docs shell style.
- Render exact section header and breadcrumbs from Vue, documenting the `Badge` breadcrumb typo if changed.
- Render exact Banners documentation text.
- Implement usage playground:
  - `default`, `single-line`, `sticky` tabs.
  - `action` switch.
  - `icon` switch.
  - `elevation` slider.
  - invert playground colors.
  - scrollable usage area and sticky behavior.
- Implement examples:
  - Usage.
  - Single-line.
  - Two-line.
  - Icon slot.
  - Icon click event.
  - Actions slot.
- Implement visible interactions:
  - Sticky switch.
  - Dismiss slot behavior.
  - Checkbox restore behavior.
  - Icon click alert.
  - Usage controls.
  - Source expansion.
  - Invert example colors.
- Match Vuse/Vuetify visual fidelity:
  - pale `#F2F3F7` page background.
  - neumorphic docs cards.
  - Vuetify banner spacing and typography.
  - text button color/casing.
  - icon/avatar sizing.
  - responsive stacking.

## Recommended First Implementation Slice

Implement `Vuetify / Banners` as one page slice:

- Route: `/components/banners`.
- Sidebar: enable `UI Components > Vuetify > Banners`.
- Page: full Vue-equivalent Banners docs page.
- Keep Vuetify Batch B and later paused.
- Keep Directives, animations, Dashboard, App, and approved slices untouched.
