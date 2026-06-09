# UI Components Audit

Last updated: 2026-05-06

## Scope

This audit covers only the active `UI Components` migration section:

- Charts
- Widgets
- Vuetify

Excluded from this section unless explicitly approved later:

- Dashboard pages
- App pages
- Style & User Interface sidebar entries outside the `UI Components` header
- Directives sidebar entries outside the `UI Components` header
- Authentication, profile, forms, and error pages outside this section

No implementation work was performed for this audit.

## Source Files Inspected

- `src/config/navigation-items.js`
- `src/router/routes.js`
- `src/router/routes/vuse.js`
- `src/router/routes/vuetify.js`
- `src/views/Charts/**`
- `src/views/Widgets/**`
- `src/views/Vuetify/**`
- `src/components/ChartJS/**`
- `src/components/UI/Widgets/**`
- `src/demo/components/**`
- `src/demo/examples/chartjs/**`
- `src/demo/examples/sparklines/**`

## Sidebar Inventory

### Charts

- Charts
  - Spark Line
  - ChartJS

### Widgets

- Widgets
  - Cards
  - Lists
  - Statistic
  - Chart
  - Document Cards

### Vuetify

- Vuetify
  - Api Explorer
  - Alerts
  - Avatars
  - Badges
  - Banners
  - Bars
    - App Bars
    - Toolbar
    - System bars
  - Bottom Navigation
  - Bottom Sheets
  - Breadcrumbs
  - Buttons
    - Buttons
    - Floating Action
    - Button Groups
  - Calendars
  - Cards
  - Carousels
  - Chips
    - Chips
    - Chip Groups
  - Dialogs
  - Dividers
  - Expansion Panels
  - Footers
  - Form Control
    - Autocompletes
    - Combobox
    - File Inputs
    - Forms
    - Inputs
    - Overflow Buttons
    - Selects
    - Selection Controls
    - Sliders
    - Textareas
    - Textfields
  - Grids
  - Groups
    - Item Groups
    - Slide Groups
    - Windows
  - Hover
  - Icons
  - Images
  - Lazy
  - Lists
    - List
    - Item Group
  - Menus
  - Navigation Drawers
  - Overlays
  - Paginations
  - Parallax
  - Pickers
    - Color Pickers
    - Date Pickers
    - Time Pickers
  - Progress
    - Circular
    - Linear
  - Ratings
  - Sheets
  - Skeleton Loaders
  - Snackbars
  - Steppers
  - Subheaders
  - Tables
    - Data Iterators
    - Simple Tables
    - Data Tables
  - Tabs
  - Timelines
  - Tooltips
  - Treeview
  - VirtualScrollers

## Route And Page Inventory

### Charts Routes

| Sidebar entry | Vue route | Vue page |
| --- | --- | --- |
| ChartJS | `/charts/chartjs` | `src/views/Charts/ChartJs.vue` |
| Spark Line | `/charts/spark-line` | `src/views/Charts/SparkLine.vue` |

### Widgets Routes

| Sidebar entry | Vue route | Vue page |
| --- | --- | --- |
| Lists | `/widgets/lists` | `src/views/Widgets/List/index.vue` |
| Cards | `/widgets/card` | `src/views/Widgets/Card/index.vue` |
| Document Cards | `/widgets/document-cards` | `src/views/Widgets/Documents/index.vue` |
| Statistic | `/widgets/statistic` | `src/views/Widgets/Stats/index.vue` |
| Chart | `/widgets/analytical` | `src/views/Widgets/Chart/index.vue` |

### Vuetify Routes

| Sidebar entry | Vue route | Vue page |
| --- | --- | --- |
| Api Explorer | `/components/vuetify/api-explorer` | `src/views/Vuetify/ApiExplorerView.vue` |
| Alerts | `/components/alerts` | `src/views/Vuetify/AlertsView.vue` |
| Avatars | `/components/avatars` | `src/views/Vuetify/AvatarsView.vue` |
| Badges | `/components/badge` | `src/views/Vuetify/BadgeView.vue` |
| Banners | `/components/banners` | `src/views/Vuetify/BannersView.vue` |
| App Bars | `/components/bars/app-bars` | `src/views/Vuetify/Bars/AppBars.vue` |
| Toolbar | `/components/bars/toolbar` | `src/views/Vuetify/Bars/Toolbar.vue` |
| System bars | `/components/bars/system-bar` | `src/views/Vuetify/Bars/SystemBars.vue` |
| Bottom Navigation | `/components/bottom-navigation` | `src/views/Vuetify/BottomNavigation.vue` |
| Bottom Sheets | `/components/bottom-sheets` | `src/views/Vuetify/BottomSheets.vue` |
| Breadcrumbs | `/components/breadcrumbs` | `src/views/Vuetify/Breadcrumbs.vue` |
| Buttons | `/components/buttons` | `src/views/Vuetify/Buttons/Buttons.vue` |
| Floating Action | `/components/buttons/floating-action-buttons` | `src/views/Vuetify/Buttons/FloatingActionButtons.vue` |
| Button Groups | `/components/buttons/button-groups` | `src/views/Vuetify/Buttons/ButtonGroups.vue` |
| Calendars | `/components/calendars` | `src/views/Vuetify/Calendars.vue` |
| Cards | `/components/cards` | `src/views/Vuetify/Cards.vue` |
| Carousels | `/components/carousels` | `src/views/Vuetify/Carousels.vue` |
| Chips | `/components/chips` | `src/views/Vuetify/Chips/Chips.vue` |
| Chip Groups | `/components/chips/chip-groups` | `src/views/Vuetify/Chips/ChipGroups.vue` |
| Dialogs | `/components/dialogs` | `src/views/Vuetify/Dialogs.vue` |
| Dividers | `/components/dividers` | `src/views/Vuetify/DividersView.vue` |
| Expansion Panels | `/components/expansion-panels` | `src/views/Vuetify/ExpansionPanels.vue` |
| Footers | `/components/footer` | `src/views/Vuetify/Footer.vue` |
| Autocompletes | `/components/forms-control/autocompletes` | `src/views/Vuetify/FormControls/Autocompletes.vue` |
| Combobox | `/components/forms-control/combobox` | `src/views/Vuetify/FormControls/Combobox.vue` |
| File Inputs | `/components/forms-control/file-inputs` | `src/views/Vuetify/FormControls/FileInputs.vue` |
| Forms | `/components/forms-control/forms` | `src/views/Vuetify/FormControls/Forms.vue` |
| Inputs | `/components/forms-control/inputs` | `src/views/Vuetify/FormControls/Inputs.vue` |
| Overflow Buttons | `/components/forms-control/overflow-btns` | `src/views/Vuetify/FormControls/OverflowBtns.vue` |
| Selects | `/components/forms-control/selects` | `src/views/Vuetify/FormControls/Selects.vue` |
| Selection Controls | `/components/forms-control/selection-controls` | `src/views/Vuetify/FormControls/SelectionControls.vue` |
| Sliders | `/components/forms-control/sliders` | `src/views/Vuetify/FormControls/Sliders.vue` |
| Textareas | `/components/forms-control/textarea` | `src/views/Vuetify/FormControls/Textarea.vue` |
| Textfields | `/components/forms-control/text-fields` | `src/views/Vuetify/FormControls/Textfields.vue` |
| Grids | `/components/grids` | `src/views/Vuetify/Grids.vue` |
| Item Groups | `/components/groups/item-groups` | `src/views/Vuetify/Groups/ItemGroups.vue` |
| Slide Groups | `/components/groups/slide-groups` | `src/views/Vuetify/Groups/SlideGroups.vue` |
| Windows | `/components/groups/windows` | `src/views/Vuetify/Groups/Windows.vue` |
| Hover | `/components/hover` | `src/views/Vuetify/Hover.vue` |
| Icons | `/components/icons` | `src/views/Vuetify/Icons.vue` |
| Images | `/components/images` | `src/views/Vuetify/Images.vue` |
| Lazy | `/components/lazy` | `src/views/Vuetify/Lazy.vue` |
| List | `/components/lists` | `src/views/Vuetify/Lists/Lists.vue` |
| Item Group | `/components/lists/item-groups` | `src/views/Vuetify/Lists/ItemGroupView.vue` |
| Menus | `/components/menus` | `src/views/Vuetify/Menus.vue` |
| Navigation Drawers | `/components/navigation-drawers` | `src/views/Vuetify/NavigationDrawers.vue` |
| Overlays | `/components/overlays` | `src/views/Vuetify/Overlays.vue` |
| Paginations | `/components/paginations` | `src/views/Vuetify/Paginations.vue` |
| Parallax | `/components/parallax` | `src/views/Vuetify/Parallax.vue` |
| Color Pickers | `/components/pickers/color-pickers` | `src/views/Vuetify/Pickers/ColorPickers.vue` |
| Date Pickers | `/components/pickers/date-pickers` | `src/views/Vuetify/Pickers/DatePickers.vue` |
| Time Pickers | `/components/pickers/time-pickers` | `src/views/Vuetify/Pickers/TimePickers.vue` |
| Circular | `/components/progress/progress-circular` | `src/views/Vuetify/Progress/Circular.vue` |
| Linear | `/components/progress/progress-linear` | `src/views/Vuetify/Progress/Linear.vue` |
| Ratings | `/components/ratings` | `src/views/Vuetify/Ratings.vue` |
| Sheets | `/components/sheets` | `src/views/Vuetify/Sheets.vue` |
| Skeleton Loaders | `/components/skeleton-loaders` | `src/views/Vuetify/SkeletonLoaders.vue` |
| Snackbars | `/components/snackbars` | `src/views/Vuetify/Snackbars.vue` |
| Steppers | `/components/steppers` | `src/views/Vuetify/Steppers.vue` |
| Subheaders | `/components/subheaders` | `src/views/Vuetify/Subheaders.vue` |
| Data Iterators | `/components/tables/data-iterators` | `src/views/Vuetify/Tables/DataIterators.vue` |
| Simple Tables | `/components/tables/simple-tables` | `src/views/Vuetify/Tables/SimpleTables.vue` |
| Data Tables | `/components/tables/data-tables` | `src/views/Vuetify/Tables/DataTables.vue` |
| Tabs | `/components/tabs` | `src/views/Vuetify/Tabs.vue` |
| Timelines | `/components/timelines` | `src/views/Vuetify/Timelines.vue` |
| Tooltips | `/components/tooltips` | `src/views/Vuetify/Tooltips.vue` |
| Treeview | `/components/treeview` | `src/views/Vuetify/Treeview.vue` |
| VirtualScrollers | `/components/virtual-scrollers` | `src/views/Vuetify/VirtualScrollers.vue` |

## Vue Files Used By These Pages

### Shared Shell

These pages are rendered through the app shell in `src/router/routes.js` when `navs: true`:

- `src/layouts/App/Sidebar.vue`
- `src/layouts/App/Toolbar.vue`
- `src/layouts/App/Footer.vue`
- `src/components/Stock/VuseSectionDefinition.vue`

Vuetify demo-style pages also use the demo documentation shell:

- `src/demo/components/DocPage.vue`
- `src/demo/components/Example.vue`
- `src/demo/components/Examples.vue`
- `src/demo/components/Usage.vue`
- `src/demo/components/UsageExample.vue`
- `src/demo/components/BaseMarkdown.vue`
- `src/demo/components/BaseTitle.vue`
- `src/demo/components/BaseHeading.vue`
- `src/demo/components/BaseGoto.vue`
- `src/demo/components/DocMarkup.vue`
- `src/demo/components/DocText.vue`
- `src/demo/components/Functional.vue`
- `src/demo/components/AppAlert.vue`
- `src/demo/components/Parameters/Parameters.vue`
- `src/demo/components/Api/ApiExplorer.vue`
- `src/demo/components/Api/Api.vue`
- `src/demo/components/Api/ApiItems.vue`
- `src/demo/components/Api/ApiItem.vue`

### Charts

`src/views/Charts/ChartJs.vue` uses `DocPage` with these example files:

- `src/demo/examples/chartjs/bar/SimpleBar.vue`
- `src/demo/examples/chartjs/bar/HorizontalBar.vue`
- `src/demo/examples/chartjs/line/SimpleLine.vue`
- `src/demo/examples/chartjs/line/FilledLine.vue`
- `src/demo/examples/chartjs/PieChart.vue`
- `src/demo/examples/chartjs/DoughnutChart.vue`
- `src/demo/examples/chartjs/RadarChart.vue`
- `src/demo/examples/chartjs/PolarareaChart.vue`
- `src/demo/examples/chartjs/BubbleChart.vue`
- `src/demo/examples/chartjs/ScatterChart.vue`

Those examples depend on:

- `src/components/ChartJS/BarChart.vue`
- `src/components/ChartJS/HorizontalBarChart.vue`
- `src/components/ChartJS/LineChart.vue`
- `src/components/ChartJS/PieChart.vue`
- `src/components/ChartJS/DoughnutChart.vue`
- `src/components/ChartJS/RadarChart.vue`
- `src/components/ChartJS/PolarareaChart.vue`
- `src/components/ChartJS/BubbleChart.vue`
- `src/components/ChartJS/ScatterChart.vue`

`src/views/Charts/SparkLine.vue` uses `DocPage` with these example files:

- `src/demo/examples/sparklines/playground.vue`
- `src/demo/examples/sparklines/simple/fill.vue`
- `src/demo/examples/sparklines/intermediate/heart-rate.vue`
- `src/demo/examples/sparklines/intermediate/dashboard-card.vue`
- `src/demo/examples/sparklines/intermediate/sales-card.vue`

### Widgets

Card Widgets page:

- Page: `src/views/Widgets/Card/index.vue`
- Direct children: `MovieTicket`, `CourseCard`, `BlogPostCard`, `UserFollowCard`, `AddToCart`, `ShoeCard`, `ArticlePostCard`, `UserProfileCard`, `ProductCard`, `TinyPost`, `UserProfileCardAlternative`, `UserProfileCardAnother`, `UserUtilization`
- Shared components used by those children:
  - `src/components/UI/Widgets/Cards/E-Commerce/CartCard.vue`
  - `src/components/UI/Widgets/Cards/E-Commerce/FabIconCard.vue`
  - `src/components/UI/Widgets/Cards/E-Commerce/ProductDetailsCard.vue`
  - `src/components/UI/Widgets/Cards/Others/CourseCard.vue`
  - `src/components/UI/Widgets/Cards/Posts/ArticlePost.vue`
  - `src/components/UI/Widgets/Cards/Posts/BlogPost.vue`
  - `src/components/UI/Widgets/Cards/Posts/TextPost.vue`
  - `src/components/UI/Widgets/Cards/User/UserProfileCard.vue`
  - `src/components/UI/Widgets/Cards/User/UserSocialCard.vue`

List Widgets page:

- Page: `src/views/Widgets/List/index.vue`
- Direct children: `LatestMediaList`, `TicketCheckList`, `AuthorList`, `TransactionsList`, `TodoList`, `MembersList`, `BestSellerList`
- Shared components used by those children:
  - `src/components/UI/List/FlexList/FlexList.vue`
  - `src/components/UI/Widgets/Lists/SearchableList.vue`
  - `src/components/UI/Widgets/Lists/CheckList/CheckList.vue`
  - `src/components/UI/Widgets/Lists/CheckList/Partials/ListItem.vue`

Statistic Widgets page:

- Page: `src/views/Widgets/Stats/index.vue`
- Direct children: `ColumnarStatistic`, `BasicStatistic`, `TaskStatus`
- Shared components used by those children:
  - `src/components/UI/Widgets/Cards/Statistics/ColumnarStatistic.vue`
  - `src/components/UI/Widgets/Cards/Statistics/BasicStatistic.vue`
  - `src/components/UI/ProgressBar/LinearProgressContent.vue`

Chart Widgets page:

- Page: `src/views/Widgets/Chart/index.vue`
- Direct children: `AnalyticIncomeExpense`, `RevenueProfileBar`, `ProductComparisonBar`, `ProductSalesHorizBar`, `OrdersStackedLine`, `NetProfitLine`
- Present but commented out in Vue: `Revenue`, `ExpenseStats`
- Shared components used by active children:
  - `src/components/UI/Widgets/Cards/Analytical/StatsChartAnalysis.vue`
  - `src/components/ChartJS/BarChart.vue`
  - `src/components/ChartJS/HorizontalBarChart.vue`
  - `src/components/ChartJS/LineChart.vue`

Document Widgets page:

- Page: `src/views/Widgets/Documents/index.vue`
- Direct children: `WordDocument`, `PdfDocument`, `PictureDocument`, `VideoDocument`, `AudioDocument`
- Shared components used by those children:
  - `src/components/UI/ProgressBar/LinearProgressAvatar.vue`

### Vuetify

Most Vuetify pages follow this pattern:

- `vuse-section-definition`
- `v-container`
- `doc-page`
- Page-specific `namespace`, `page`, `examples`, and optional `usage`
- Example Vue files under `src/demo/examples/<component-family>/**`

Special Vuetify pages:

- `ApiExplorerView.vue` renders `DocText` and `ApiExplorer` from `src/demo/components/Api/**`.
- `Grids.vue` renders `DocPage` and imports `ViewportBreakpoints`.
- `Helpers/index.vue` uses a tab/dropdown section picker and dynamic partials: `Content`, `Display`, `Elevation`, `Flex`, `Float`, `Spacing`.
- `Helpers/Partials/Display.vue` imports `ViewportBreakpoints` and `VisibilityTable`.
- `Helpers/Partials/Spacing.vue` imports `ViewportBreakpoints`.
- `TextTypography/index.vue` renders an explicit ordered list of `BaseMarkdown` and `Example` blocks.
- `Typography/index.vue` uses dynamic partials: `Text` and `Typography`.
- `Icons.vue` imports `src/data/json/google-material-icons.json`.
- `ColorsUI.vue` imports Vuetify color utilities and renders color palettes plus color examples.

## Current React Gaps

The current React output is a prototype and does not match the Vue UI Components section with high visual fidelity.

### Missing React Pages

Existing React routes expose only broad prototype pages:

- `/charts`
- `/widgets`
- `/lists`

Missing page-level React equivalents:

- 2 chart pages matching `/charts/chartjs` and `/charts/spark-line`
- 5 widget pages matching `/widgets/lists`, `/widgets/card`, `/widgets/document-cards`, `/widgets/statistic`, `/widgets/analytical`
- 68 Vuetify pages matching the Vue `components/*` route catalog listed above

### Missing React Routes

The React app needs explicit UI Components routes for:

- `/charts/chartjs`
- `/charts/spark-line`
- `/widgets/lists`
- `/widgets/card`
- `/widgets/document-cards`
- `/widgets/statistic`
- `/widgets/analytical`
- Every `/components/...` Vuetify route listed in the route inventory

The existing `/charts`, `/widgets`, and `/lists` prototype routes do not correspond to the Vue route structure.

### Missing Visual And Design Elements

- Vue app shell fidelity: full sidebar grouping, nested groups, section headers, badges, icons, toolbar, footer, and route breadcrumbs.
- `vuse-section-definition` page headers with icons, namespace, breadcrumbs, title spacing, and wrapper layout.
- Vuetify doc page shell: markdown text, usage panels, example blocks, live examples, code/markup display, and API explorer behavior.
- Chart examples: separate example pages, correct chart datasets, ChartJS options, filled line variants, horizontal bar variants, polar/radar/scatter/bubble presentations.
- Sparkline examples: playground, fill, heart-rate, dashboard-card, and sales-card examples.
- Widget page layouts: three-column card/list/document layouts, responsive rows, exact spacing, `neu-glow` styling, Vuetify elevation/rounded classes, and original card composition.
- Widget media/assets: local `/static` product, movie, illustrator, brand, and avatar images; remote picsum images; audio element used by document cards.
- Widget data fidelity: `src/data/dummyData.js`, date formatting, social/user data, product metadata, chart datasets, and status values.
- Vuetify component catalog breadth: alerts, buttons, form controls, tables, navigation drawers, overlays, pickers, progress, timelines, and other interactive examples are not represented in React.
- Responsive behavior: Vuetify breakpoint-dependent layouts such as Helpers bottom navigation versus menu selector.
- Interaction fidelity: dialogs, menus, tabs, steppers, selectable controls, list filtering, searchable lists, API explorer filtering, and playground controls.

## Required React Target Files

Recommended target structure for the approved rebuild:

- `react-dashboard-template/src/routes/uiComponentsRoutes.tsx`
- `react-dashboard-template/src/components/layout/VuseSectionDefinition.tsx`
- `react-dashboard-template/src/components/docs/DocPage.tsx`
- `react-dashboard-template/src/components/docs/ExampleBlock.tsx`
- `react-dashboard-template/src/components/docs/UsageBlock.tsx`
- `react-dashboard-template/src/components/docs/ApiExplorer.tsx`
- `react-dashboard-template/src/pages/ui-components/charts/ChartJsPage.tsx`
- `react-dashboard-template/src/pages/ui-components/charts/SparkLinePage.tsx`
- `react-dashboard-template/src/pages/ui-components/widgets/CardWidgetsPage.tsx`
- `react-dashboard-template/src/pages/ui-components/widgets/ListWidgetsPage.tsx`
- `react-dashboard-template/src/pages/ui-components/widgets/DocumentWidgetsPage.tsx`
- `react-dashboard-template/src/pages/ui-components/widgets/StatisticWidgetsPage.tsx`
- `react-dashboard-template/src/pages/ui-components/widgets/ChartWidgetsPage.tsx`
- `react-dashboard-template/src/pages/ui-components/widgets/cards/*`
- `react-dashboard-template/src/pages/ui-components/widgets/lists/*`
- `react-dashboard-template/src/pages/ui-components/widgets/documents/*`
- `react-dashboard-template/src/pages/ui-components/widgets/stats/*`
- `react-dashboard-template/src/pages/ui-components/widgets/charts/*`
- `react-dashboard-template/src/pages/ui-components/vuetify/**`
- `react-dashboard-template/src/data/ui-components/**`
- `react-dashboard-template/src/assets/ui-components/**`

For Vuetify pages, create one React page file per Vue page in the route inventory, plus reusable example/demo primitives. The React project can use MUI components, but the visual target is the Vue/Vuetify screen, not generic MUI defaults.

## Recommended Rebuild Order

1. Rebuild the UI Components shell: sidebar groups, nested UI Components navigation, route names, page wrapper, breadcrumbs, and `VuseSectionDefinition`.
2. Rebuild Charts first: `ChartJsPage`, `SparkLinePage`, shared chart shells, and all chart/sparkline examples.
3. Wait for user approval of Charts.
4. Rebuild Widget shared primitives and data: avatars, media cards, progress cards, chart cards, list rows, dummy data, and local/remote asset mapping.
5. Rebuild Widget pages in this order: Card Widgets, List Widgets, Statistic Widgets, Chart Widgets, Document Widgets.
6. Wait for user approval of Widgets.
7. Rebuild Vuetify documentation shell: `DocPage`, example block system, usage block, markdown/text rendering, API explorer scaffold.
8. Rebuild Vuetify pages in small approval batches:
   - Batch A: Api Explorer, Alerts, Avatars, Badges, Banners
   - Batch B: Bars, Bottom Navigation, Bottom Sheets, Breadcrumbs
   - Batch C: Buttons, Calendars, Cards, Carousels, Chips
   - Batch D: Dialogs, Dividers, Expansion Panels, Footers
   - Batch E: Form Control pages
   - Batch F: Grids, Groups, Hover, Icons, Images, Lazy, Lists
   - Batch G: Menus, Navigation Drawers, Overlays, Paginations, Parallax
   - Batch H: Pickers, Progress, Ratings, Sheets, Skeleton Loaders
   - Batch I: Snackbars, Steppers, Subheaders, Tables, Tabs, Timelines, Tooltips, Treeview, VirtualScrollers
9. After each approved batch, update audit/progress docs and only then continue.

## Recommended Next Implementation Prompt

Implement only the first approved UI Components rebuild slice: the UI Components shell and Charts pages.

Requirements:

- Do not modify protected Vue/root files or `AGENTS.md`.
- Work only inside `react-dashboard-template/` and `migration-docs/`.
- Replace the prototype `/charts` route with Vue-matching routes `/charts/chartjs` and `/charts/spark-line`.
- Add UI Components sidebar entries exactly matching the Vue `Charts` group.
- Rebuild `ChartJsPage` from `src/views/Charts/ChartJs.vue` with high visual fidelity.
- Rebuild `SparkLinePage` from `src/views/Charts/SparkLine.vue` with high visual fidelity.
- Port all ChartJS and Sparkline example cards used by those two pages.
- Preserve Vue-like page headers, breadcrumbs, spacing, card surfaces, example layout, and chart behavior.
- Run the React build from `react-dashboard-template/`.
- Update `migration-docs/progress.md` and `migration-docs/phase-report.md`.
- Stop after Charts and ask for approval before starting Widgets.
