# Style & User Interface Audit

Audit date: 2026-05-07

Scope: Vue `Style & User Interface` section only. This audit is read-only for Vue/root files and does not implement React code.

Current migration context:

- UI Components / Charts: approved.
- UI Components / Widgets: approved.
- Global Sidebar: approved.
- Pages: approved.
- Vuetify is paused before Banners and must not be continued unless explicitly requested.

## Source References

Navigation and routing:

- `src/config/navigation-items.js`
- `src/router/routes.js`
- `src/router/routes/vuetify.js`
- `src/router/routes/vuse.js`

Vue pages:

- `src/views/Vuetify/UI/ColorsUI.vue`
- `src/views/Vuetify/UI/Icons.vue`
- `src/views/Vuetify/UI/Helpers/index.vue`
- `src/views/Vuetify/UI/Helpers/Partials/Content.vue`
- `src/views/Vuetify/UI/Helpers/Partials/Display.vue`
- `src/views/Vuetify/UI/Helpers/Partials/Elevation.vue`
- `src/views/Vuetify/UI/Helpers/Partials/Flex.vue`
- `src/views/Vuetify/UI/Helpers/Partials/Float.vue`
- `src/views/Vuetify/UI/Helpers/Partials/Spacing.vue`
- `src/views/Vuetify/UI/BorderRadius.vue`
- `src/views/Vuetify/UI/TextTypography/index.vue`
- `src/views/Vuetify/UI/Typography/index.vue`
- `src/views/Vuetify/UI/Typography/Partials/Font.vue`
- `src/views/Vuetify/UI/Typography/Partials/Text.vue`
- `src/views/Vuetify/UI/Typography/Partials/Typefaces.vue`
- `src/views/Vuetify/UI/Typography/Partials/Typography.vue`
- `src/views/Vuetify/UI/Transitions.vue`
- `src/views/Vuetify/UI/Scroll.vue`
- `src/views/Forms/Forms.vue`
- `src/views/Forms/Partials/Basic.vue`

Shared docs/components:

- `src/demo/components/DocPage.vue`
- `src/demo/components/Example.vue`
- `src/demo/components/Examples.vue`
- `src/demo/components/Usage.vue`
- `src/demo/components/DocText.vue`
- `src/demo/components/DocMarkup.vue`
- `src/demo/components/BaseMarkdown.vue`
- `src/views/Vuetify/ViewportBreakpoints.vue`
- `src/views/Vuetify/VisibilityTable.vue`

Data/styles:

- `src/data/json/google-material-icons.json`
- `src/lang/en/styles/*.json`
- `src/demo/snippets/js/vuetify_color_pack.txt`
- `src/demo/snippets/sass/vuetify_color_pack.txt`
- `src/demo/snippets/sass/default_rounded_variables.txt`
- `src/demo/snippets/sass/changing_rounded_variables.txt`
- `src/sass/_variables.scss`
- `src/sass/_helpers.scss`
- `src/sass/preset/variables.scss`
- `src/plugins/vuetify.js`
- `src/config/theme.js`

## Sidebar Inventory

The original Vue sidebar section order under `Style & User Interface` is:

| Sidebar entry | Icon | Route name | Vue route | Badge | Status in React |
|---|---|---:|---|---|---|
| Color | `color_lens` | `ColorsUI` | `/colors` | none | Visible in global sidebar as pending/disabled; route/page missing |
| Icons | `collections` | `IconsView` | `/icons` | none | Visible in global sidebar as pending/disabled; route/page missing |
| Helpers | `help` | `HelpersView` | `/helpers` | none | Visible in global sidebar as pending/disabled; route/page missing |
| Border Radius | `rounded_corner` | `BorderRadius` | `/border-radius` | `new` | Visible in global sidebar as pending/disabled; route/page missing |
| Text & Typography | `text_fields` | `TextTypographyView` | `/text-typography` | `new` | Visible in global sidebar as pending/disabled; route/page missing |
| Motion | `slideshow` | `Transitions` | `/transitions` | none | Visible in global sidebar as pending/disabled; route/page missing |
| Programmatic Scrolling | none | `Scroll` | `/scroll` | none | Visible in global sidebar as pending/disabled; route/page missing |
| Forms | `input` | `Forms` | `/forms` | none | Visible in global sidebar as pending/disabled; route/page missing |

## Route Inventory

| Page | Route | Vue file | Layout | Main child components |
|---|---|---|---|---|
| Color | `/colors` | `Vuetify/UI/ColorsUI.vue` | Dashboard app shell, `navs: true` | `VuseSectionDefinition`, `v-text-field`, color cards, `BaseMarkdown`, `DocMarkup`, `Example`, `DocText` |
| Icons | `/icons` | `Vuetify/UI/Icons.vue` | Dashboard app shell, `navs: true` | `VuseSectionDefinition`, icon search field, icon grid cards |
| Helpers | `/helpers` | `Vuetify/UI/Helpers/index.vue` | Dashboard app shell, `navs: true` | responsive section selector, `Content`, `Display`, `Elevation`, `Flex`, `Float`, `Spacing` |
| Border Radius | `/border-radius` | `Vuetify/UI/BorderRadius.vue` | Dashboard app shell, `navs: true` | markdown sections, examples, Sass snippets |
| Text & Typography | `/text-typography` | `Vuetify/UI/TextTypography/index.vue` | Dashboard app shell, `navs: true` | markdown sections, typography helper examples |
| Motion | `/transitions` | `Vuetify/UI/Transitions.vue` | Dashboard app shell, `navs: true` | `DocPage`, transition examples, usage example |
| Programmatic Scrolling | `/scroll` | `Vuetify/UI/Scroll.vue` | Dashboard app shell, `navs: true` | `DocPage`, go-to usage, markdown anchor sections |
| Forms | `/forms` | `Forms/Forms.vue` | Dashboard app shell, `navs: true` | `BasicForm` reactive form and validation panel |

## Page Details

### Color

Route: `/colors`

Vue sources:

- `src/views/Vuetify/UI/ColorsUI.vue`
- `src/demo/examples/colors/classes.vue`
- `src/demo/examples/colors/text-classes.vue`
- `src/demo/snippets/js/vuetify_color_pack.txt`
- `src/demo/snippets/sass/vuetify_color_pack.txt`
- `src/lang/en/styles/Colors.json`

Data/assets:

- `vuetify/es5/util/colors` color object.
- No image assets.

Visible sections:

- Vuse section definition: `Styles / Colors`, breadcrumbs `Style & User Interface > Color`.
- Search field with magnify prefix and palette append icon.
- Responsive color palette grid: `cols=12 md=6 lg=4`.
- Parent color cards and child shade cards.
- JavaScript color pack docs and Sass color pack docs.
- Color class example block.
- Follow-up doc text.

Behavior:

- Search filters color families by kebab-cased family name.
- Shade text color switches to black for `white`, `transparent`, `light*`, and `accent*`; otherwise white.
- Example block supports invert colors, View on Github, View source, source tabs, copy/edit controls via shared docs shell.
- Responsive grid collapses to one column on mobile.

React gaps:

- No `/colors` route or page.
- No React Vuetify color-pack grid/data source in this section.
- Existing shared docs `ExampleBlock` can be reused but needs Style pages to feed exact examples/text.

### Icons

Route: `/icons`

Vue sources:

- `src/views/Vuetify/UI/Icons.vue`
- `src/data/json/google-material-icons.json`

Data/assets:

- Google Material Icons JSON dataset, 11,986 lines; entries include `id`, `name`, `group_id`, `keywords`, `ligature`, `codepoint`, `is_new`.
- Material icon font CSS imported by Vuetify plugin.

Visible sections:

- Vuse section definition: `Icons`, breadcrumbs `User Interface > Google Material Icons`.
- Search field with magnify prefix.
- Responsive icon grid: `cols=12 sm=6 md=4 lg=2`.
- 150px soft raised icon cards with large icon and id label.

Behavior:

- Search uses case-insensitive regex against `keywords` and `state`.
- Cards are visual only; no click behavior in page source.
- Responsive card columns follow Vuetify props.

React gaps:

- No `/icons` route/page.
- Need decide whether to copy/recreate full icon JSON dataset inside React or derive from `@mui/icons-material` names. Vue fidelity requires the Vue JSON or a documented exception.

### Helpers

Route: `/helpers`

Vue sources:

- `src/views/Vuetify/UI/Helpers/index.vue`
- `src/views/Vuetify/UI/Helpers/Partials/Content.vue`
- `src/views/Vuetify/UI/Helpers/Partials/Display.vue`
- `src/views/Vuetify/UI/Helpers/Partials/Elevation.vue`
- `src/views/Vuetify/UI/Helpers/Partials/Flex.vue`
- `src/views/Vuetify/UI/Helpers/Partials/Float.vue`
- `src/views/Vuetify/UI/Helpers/Partials/Spacing.vue`
- `src/views/Vuetify/ViewportBreakpoints.vue`
- `src/views/Vuetify/VisibilityTable.vue`

Helper sections:

- Content
- Display
- Elevation
- Flex
- Float
- Spacing

Demo examples:

- Content: `block`, `paragraph`, `code`, `variables`, `user`.
- Display: `display-inline`, `display-block`, `visibility`, `print`; includes `ViewportBreakpoints` and `VisibilityTable`.
- Elevation: `usage`, `playground`, `simple/dynamic`.
- Flex: `flexbox`, `flexbox-inline`, `flex-direction`, `flex-column`, `flex-justify`, `flex-align`, `flex-align-self`, `margins`, `margins-align-items`, `flex-nowrap`, `flex-wrap`, `flex-wrap-reverse`, `flex-order`, `flex-align-content-*`, `grow-shrink`.
- Float: `classes`, `responsive`; includes `ViewportBreakpoints`.
- Spacing: `playground`, `simple/horizontal`, `intermediate/negative-margin`, `simple/breakpoint-md`; includes `ViewportBreakpoints`.

Behavior:

- On `mdAndUp`, Helpers uses a raised `v-bottom-navigation` with horizontal buttons.
- On `smAndDown`, Helpers switches to a `v-menu` with a raised dropdown activator and list items.
- Section selection swaps the active partial component.
- Example blocks use shared invert/source/GitHub behavior.
- Elevation dynamic example changes elevation on hover.
- Elevation playground uses a slider.
- Spacing playground uses direction/size selects to alter visible padding/margin classes.
- Display tables are static but responsive examples depend on viewport classes.

React gaps:

- No `/helpers` route/page.
- No React helper-section bottom navigation/menu switcher.
- No React recreations of helper examples, breakpoint table, or visibility table in this section.

### Border Radius

Route: `/border-radius`

Vue sources:

- `src/views/Vuetify/UI/BorderRadius.vue`
- `src/demo/examples/border-radius/simple/rounded.vue`
- `src/demo/examples/border-radius/simple/pill-and-circle.vue`
- `src/demo/examples/border-radius/simple/removing.vue`
- `src/demo/examples/border-radius/simple/by-side.vue`
- `src/demo/examples/border-radius/intermediate/separately.vue`
- `src/demo/snippets/sass/default_rounded_variables.txt`
- `src/demo/snippets/sass/changing_rounded_variables.txt`
- `src/lang/en/styles/BorderRadius.json`

Visible sections:

- Markdown intro, rounded section, pill/circle section, removing section, sides section, corners section, customizing/overwriting Sass sections.
- Example blocks for each visual radius sample.
- Dark code markup cards for Sass snippets.

Behavior:

- Primarily static visual documentation.
- Shared Example action bar: invert, GitHub, source panel.
- Source panel has section tabs for parsed template/style/script.

React gaps:

- No `/border-radius` route/page.
- Need source snippet/code panels and exact radius sample blocks.

### Text & Typography

Route: `/text-typography`

Vue sources:

- `src/views/Vuetify/UI/TextTypography/index.vue`
- `src/demo/examples/text-and-typography/typography.vue`
- `src/demo/examples/text-and-typography/typography-breakpoints.vue`
- `src/demo/examples/text-and-typography/align-justify.vue`
- `src/demo/examples/text-and-typography/align-all.vue`
- `src/demo/examples/text-and-typography/decoration.vue`
- `src/demo/examples/text-and-typography/no-wrap.vue`
- `src/demo/examples/text-and-typography/truncate.vue`
- `src/demo/examples/text-and-typography/transform.vue`
- `src/demo/examples/text-and-typography/break.vue`
- `src/demo/examples/text-and-typography/weights.vue`
- `src/demo/examples/text-and-typography/opacity.vue`
- `src/demo/examples/text-and-typography/rtl.vue`
- `src/lang/en/styles/TextAndTypography.json`

Visible sections:

- Typography intro and display examples.
- Typography breakpoints.
- Alignment: justify and all.
- Text decoration.
- Overflow: no-wrap and truncate.
- Transform and break.
- Weights/italics.
- Opacity.
- RTL alignment.

Behavior:

- Typography example uses hover/click expansion behavior.
- Typography breakpoint example uses selectable/hoverable item group cards.
- Shared example action bar behavior applies.
- Responsive typography examples change based on viewport breakpoints.

React gaps:

- No `/text-typography` route/page.
- Need recreate all typography utility examples and source panels.

### Motion

Route: `/transitions`

Vue sources:

- `src/views/Vuetify/UI/Transitions.vue`
- `src/demo/examples/transitions/usage.vue`
- `src/demo/examples/transitions/slide-x-transitions.vue`
- `src/demo/examples/transitions/slide-y-transitions.vue`
- `src/demo/examples/transitions/scroll-x-transitions.vue`
- `src/demo/examples/transitions/scroll-y-transitions.vue`
- `src/demo/examples/transitions/scale-transition.vue`
- `src/demo/examples/transitions/fab-transition.vue`
- `src/demo/examples/transitions/fade-transition.vue`
- `src/demo/examples/transitions/expand-transition.vue`
- `src/demo/examples/transitions/custom-origin.vue`
- `src/demo/examples/transitions/todo.vue`
- `src/lang/en/styles/Transitions.json`

Visible sections:

- Vuse section definition: `Styles / Transitions`.
- `DocPage` usage block.
- Ten transition examples.

Behavior:

- Menu examples open/close using named Vuetify transitions.
- Expand example toggles vertical and horizontal expand blocks.
- Todo example creates tasks, checks complete state, toggles active/completed count, and animates list transitions.
- Shared docs shell provides invert/source/GitHub behavior.

React gaps:

- No `/transitions` route/page.
- Need React transition utilities or CSS/MUI transition equivalents that visually match Vuetify transition timing and direction.

### Programmatic Scrolling

Route: `/scroll`

Vue sources:

- `src/views/Vuetify/UI/Scroll.vue`
- `src/demo/examples/scroll/usage.vue`
- `src/lang/en/styles/Scroll.json`

Visible sections:

- Vuse section definition: `Styles / Scroll`.
- `DocPage` usage block.
- Router heading/text and import snippet.
- Three long markdown anchor sections: first, second, third.

Behavior:

- Usage example has radio group, numeric target field, selector select, element select, easing select, duration slider, offset slider, and `scroll` button.
- `scroll` button calls `$vuetify.goTo(target, options)`.
- Page has scrollable long content and anchor targets.

React gaps:

- No `/scroll` route/page.
- Need React equivalent of programmatic scroll target/easing playground and long anchor content.

### Forms

Route: `/forms`

Vue sources:

- `src/views/Forms/Forms.vue`
- `src/views/Forms/Partials/Basic.vue`
- Related Vuetify docs examples under `src/demo/examples/forms/**` are separate Vuetify component docs but useful references.

Visible sections:

- Vuse section definition: `Forms`, breadcrumbs `User Interface > Forms`.
- Two-column layout: `md=6 cols=12` form card and validation card.
- Reactive Form Example card.
- Reactive Form Validation card with JSON-like `$v` state.

Behavior:

- Fields: first name, last name, email, bio textarea, favorite animal select, age slider, city, state, pincode, terms checkbox.
- Validation: required fields, email format, pincode max length 5, favorite animal required, age required, terms required.
- Terms and conditions links open separate dialogs.
- Dialogs have `Ok` buttons.
- Cancel resets form and validation.
- Register disabled while invalid; valid submit shows top-right success snackbar `Registration successful!`, resets form, resets validation.
- Validation panel mirrors Vuelidate state.
- Responsive layout stacks on mobile and uses two columns on `md+`.

React gaps:

- No `/forms` route/page.
- Need recreate Vuelidate-like validation state display, dialogs, snackbar, form reset, select/slider/checkbox behaviors, and exact Vuse card/input density.

## Shared Docs Behavior Requirements

Pages using `Example`, `Examples`, `Usage`, `DocPage`, `DocMarkup`, and `BaseMarkdown` must preserve:

- Raised/inset documentation cards with pale Vuse background.
- Top-right example action buttons:
  - Invert example colors, hidden when global Vuetify dark theme is active.
  - View on Github link unless `hideGitCodepan`.
  - View source expand/collapse.
- Source panel:
  - Dark `#2d2d2d` source surface.
  - Section pills for `template`, `style`, `script` where present.
  - Prism-like code typography.
  - Copy icon with temporary `Copied` text.
  - Edit/GitHub link where available.
- Lazy import/intersection behavior can be implemented eagerly in React only if visual behavior is unchanged; document any deviation.
- Markdown links must preserve external-vs-router behavior where visible/clickable.

## Visual Fidelity Requirements

- Use existing Vuse dashboard shell, global sidebar, and section definition style.
- Preserve pale `#F2F3F7` background and Vuse neumorphic surfaces.
- Preserve root radius `4px`, compact Vuetify density, and Muli/Vuse-like typography scale.
- Preserve teal/cyan primary and orange secondary accents from `src/config/theme.js`.
- Preserve `neu-glow`, `neu-glow-inset`, `with-radius`, and soft input/card look.
- Documentation content should be full-width within `v-container fluid` equivalent.
- Example cards should be subtle documentation surfaces, not generic MUI cards.
- Inputs/selects/sliders/buttons must match previous approved Vuse controls and avoid MUI default density.
- Responsive behavior must follow Vue props:
  - Color grid: `cols=12 md=6 lg=4`.
  - Icons grid: `cols=12 sm=6 md=4 lg=2`.
  - Helpers/Typography navigation: bottom navigation at `mdAndUp`, dropdown menu at `smAndDown`.
  - Forms: two `md=6` columns, stacked on smaller screens.
  - Helper examples/tables should retain Vuetify breakpoints and visibility classes as demonstrable content.

## Behavior Checklist

- Search/filter:
  - Colors family search.
  - Icons keyword/state search.
- Section switching:
  - Helpers bottom nav/dropdown switches active helper partial.
  - Typography page has similar bottom nav/dropdown between Typography and Text Helpers.
- Example shell:
  - Invert example colors.
  - View source expand/collapse.
  - Source section tabs.
  - Copy code feedback.
  - GitHub/edit links.
- Motion:
  - Menus open/close with transition variants.
  - Expand toggles.
  - Todo create/complete/remove-like list animation behavior as visible in source.
- Programmatic scroll:
  - Scroll target mode controls, selectors/easing/duration/offset sliders, scroll button.
- Forms:
  - Validation, disabled submit, reset, snackbar, terms/conditions dialogs, slider/select/checkbox state.
- Hover/click:
  - Elevation dynamic hover.
  - Typography breakpoint hover/select.
  - Buttons and icon buttons should keep Vuse hover/active states.
- Responsive:
  - Breakpoint selector swaps and grids exactly as audited above.

## Current React Gaps

Missing React routes:

- `/colors`
- `/icons`
- `/helpers`
- `/border-radius`
- `/text-typography`
- `/transitions`
- `/scroll`
- `/forms`

Missing React pages:

- `react-dashboard-template/src/pages/style-ui/ColorsPage.tsx`
- `react-dashboard-template/src/pages/style-ui/IconsPage.tsx`
- `react-dashboard-template/src/pages/style-ui/HelpersPage.tsx`
- `react-dashboard-template/src/pages/style-ui/BorderRadiusPage.tsx`
- `react-dashboard-template/src/pages/style-ui/TextTypographyPage.tsx`
- `react-dashboard-template/src/pages/style-ui/TransitionsPage.tsx`
- `react-dashboard-template/src/pages/style-ui/ScrollPage.tsx`
- `react-dashboard-template/src/pages/style-ui/FormsPage.tsx`

Required shared React targets:

- `react-dashboard-template/src/pages/style-ui/components/StyleDocPage.tsx`
- `react-dashboard-template/src/pages/style-ui/components/StyleExampleBlock.tsx` or reuse `src/components/docs/ExampleBlock.tsx` if it fully supports this section.
- `react-dashboard-template/src/pages/style-ui/components/StyleMarkdown.tsx`
- `react-dashboard-template/src/pages/style-ui/components/StyleCodePanel.tsx`
- `react-dashboard-template/src/pages/style-ui/components/ResponsiveSectionNav.tsx`
- `react-dashboard-template/src/data/style-ui/materialIcons.ts` or JSON copy for the Vue icon dataset.
- `react-dashboard-template/src/data/style-ui/vuetifyColors.ts`
- `react-dashboard-template/src/data/style-ui/styleDocs.ts` for markdown snippets/text if not embedded per page.

## Recommended Implementation Order

1. Shared docs/style shell primitives:
   - section definition reuse
   - documentation text surface
   - example block with invert/source/GitHub/copy/source tabs
   - responsive helper section navigation
2. Color page:
   - small enough, establishes color data, search input, palette card style, and shared source/code panels.
3. Icons page:
   - adds large searchable data grid and confirms responsive density/card style.
4. Helpers page, split into smaller slices:
   - Content/Display first, then Elevation/Spacing, then Flex/Float.
5. Border Radius page:
   - static docs/examples/Sass snippets, good after ExampleBlock is stable.
6. Text & Typography page:
   - many examples and responsive typography checks.
7. Motion page:
   - interaction-heavy transitions and todo animation.
8. Programmatic Scrolling page:
   - scroll behavior and long-page anchor verification.
9. Forms page:
   - form validation and dialogs; likely highest behavior risk.

Recommended first implementation slice:

> Implement Style & User Interface shared docs shell + Color page only. Add `/colors`, enable the Color sidebar entry, implement the search/filterable Vuetify color palette grid, preserve Vuse documentation surfaces, and keep Style & User Interface / Color pending user visual approval.

## Documented Unknowns

- Screenshot-level visual audit against the currently running Vue app was not performed in this audit turn. The source-level visual and behavior audit is complete; implementation should still compare with the running Vue route before user review.
- The exact runtime translation strings are sourced from `src/lang/en/styles/*.json`; implementation should read each page's JSON before rebuilding visible documentation text.
- If copying the full `google-material-icons.json` into React is considered too large, document and approve any reduced icon dataset before implementation.
