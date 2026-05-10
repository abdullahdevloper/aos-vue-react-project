# Dashboard Audit

Status: audit complete; implementation not started.

Scope:

- Dashboard / Operational
- Dashboard / Analytical

Out of scope:

- Vuetify
- App Contacts / Chat
- Directives
- Animation fidelity
- Approved page/component slices

## Vue Sidebar

Source: `src/config/navigation-items.js`

Vue dashboard sidebar structure:

- Dashboard
  - Operational
  - Analytical

The Dashboard group is the first top-level group in the Vue sidebar. Both children use the dashboard material icon.

## Vue Routes

Source: `src/router/routes/vuse.js`

| Page | Vue route | Vue route name | Vue source |
|---|---|---|---|
| Operational | `/dashboard/operational` | `dashboard/Operational` | `src/views/Dashboards/OperationalDashboard/OperationalDashboard.vue` |
| Analytical | `/dashboard/analytical` | `dashboard/Analytical` | `src/views/Dashboards/AnalyticalDashboard/AnalyticalDashboard.vue` |

Source: `src/router/routes.js`

- Vue redirects `/` to `/dashboard/operational`.
- Both dashboard routes render inside the app shell with sidebar/header/footer because `navs: true`.

## React Current State

Sources:

- `react-dashboard-template/src/App.tsx`
- `react-dashboard-template/src/data/uiComponentsNavigation.tsx`
- `react-dashboard-template/src/routes/pages.tsx`

Current React behavior:

- `/` redirects to `/charts/chartjs`.
- `/dashboard/operational` redirects to `/charts/chartjs`.
- `/dashboard/analytical` has no React route.
- Sidebar shows `Dashboard > Operational` linked to `/dashboard/operational`.
- Sidebar shows `Dashboard > Analytical` as disabled/pending.
- `react-dashboard-template/src/routes/pages.tsx` contains an old prototype `DashboardPage`, but it is only mounted at `/prototype-dashboard` and does not match either Vue dashboard page.

Conclusion:

- The Operational redirect to `/charts/chartjs` is incorrect/stale relative to Vue.
- The Analytical route/page is missing.
- The Dashboard sidebar group exists, but only Operational is linked, and that link routes to Charts instead of the Dashboard page.

## Operational Dashboard Inventory

Vue source:

- `src/views/Dashboards/OperationalDashboard/OperationalDashboard.vue`
- `src/views/Dashboards/OperationalDashboard/Partials/BasicStats.vue`
- `src/views/Dashboards/OperationalDashboard/Partials/SalesRevenue.vue`
- `src/views/Dashboards/OperationalDashboard/Partials/OrdersVisits.vue`

Layout:

- `vuse-content-wrapper`
- `v-container fluid`
- Row 1: four statistic cards, `cols=12 sm=6 lg=3`
- Row 2: Revenue chart `md=7` and Visits chart `md=5`
- Row 3: three equal columns:
  - LatestMediaList
  - BlogPostCard + TaskStatus
  - TicketCheckList + MembersList

Child components:

- `BasicStatistic` from `src/components/UI/Widgets/Cards/Statistics/BasicStatistic.vue`
- `LineChart` from `src/components/ChartJS/LineChart.vue`
- `BarChart` from `src/components/ChartJS/BarChart.vue`
- `TaskStatus` from `src/views/Widgets/Stats/TaskStatus.vue`
- `LatestMediaList` from `src/views/Widgets/List/LatestMediaList.vue`
- `BlogPostCard` from `src/views/Widgets/Card/BlogPostCard.vue`
- `MembersList` from `src/views/Widgets/List/MembersList.vue`
- `TicketCheckList` from `src/views/Widgets/List/TicketCheckList.vue`

Statistics:

- Sales: `106K`, storefront icon, `+4.25%`, `Since last month`
- New Users: `3214`, people icon, `+2.25%`, `Since last month`
- Traffic: `350K`, import_export icon, `+4.75%`, `Since last month`
- Performance: `78.67%`, insert_chart_outlined icon, `+4.75%`, `Since last month`

Revenue chart:

- Card title: `Revenue`
- Control: bottom-navigation segmented control with `Monthly` and `Weekly`
- Default selected value: `monthly`
- Chart: stacked/fill line chart, hidden legend, index hover/tooltips, dashed y-grid
- Height: `402px`
- Monthly and weekly datasets are defined locally in `SalesRevenue.vue`

Visits chart:

- Card title: `Visits`
- Chart: grouped bar chart
- Datasets: `Visits` and `Order`
- Height: `410px`
- Hidden legend, index hover/tooltips, dashed y-grid

Interactions:

- Revenue segmented control switches line chart datasets between monthly and weekly.
- Chart.js hover/tooltips are visible interaction behavior.
- Widget/list child interactions should match the already approved Widgets components where reused.

Assets/data:

- Uses Vuetify color utility values for chart gradients.
- Reuses widget components and their data/assets.
- No page-specific image file was found in the Operational partials.

Responsive behavior:

- Statistics: `cols=12 sm=6 lg=3`
- Revenue/Visits: `v-col md=7` and `v-col md=5`; stack below `md`.
- Lower widgets: three `v-col` columns with default equal widths; stack on small screens.

Theme behavior:

- Uses Vuse `neu-glow` cards and dashboard shell theme.
- Charts use Vuetify color utilities and should remain readable in the app shell theme.

## Analytical Dashboard Inventory

Vue source:

- `src/views/Dashboards/AnalyticalDashboard/AnalyticalDashboard.vue`
- `src/views/Dashboards/AnalyticalDashboard/Partials/BasicStats.vue`
- `src/views/Dashboards/AnalyticalDashboard/Partials/SalesRevenue.vue`
- `src/views/Dashboards/AnalyticalDashboard/Partials/UiDesign.vue`
- `src/views/Dashboards/AnalyticalDashboard/Partials/TwoColsStats.vue`
- `src/views/Dashboards/AnalyticalDashboard/Partials/ProjectTable.vue`

Layout:

- `vuse-content-wrapper`
- `v-container fluid`
- Row 1: four basic statistic cards, `cols=12 sm=6 lg=3`
- Row 2: Revenue chart `md=7` and UI Design progress card `md=5`
- Row 3: TwoColsStats full-width row
- Row 4: ProjectTable full-width row

Child components:

- `BasicStatistic` from `src/components/UI/Widgets/Cards/Statistics/BasicStatistic.vue`
- `BarChart` from `src/components/ChartJS/BarChart.vue`
- `ColumnarStatistic` from `src/components/UI/Widgets/Cards/Statistics/ColumnarStatistic.vue`
- `LinearProgressContent` from `src/components/UI/ProgressBar/LinearProgressContent.vue`
- `v-data-table` project table using local headers and `Projects` data

Statistics:

- Customers: `52K`, progress 52, text `48K more to goal`
- Closed Tickets: `78`, progress 78, text `32 To goal`
- Downloads: `80K`, progress 80, text `20K more to goal`
- Visits: `68K`, progress 68, text `32K more to goal`

Revenue chart:

- Card title: `Revenue`
- Control: switch labeled `Last year comparison`
- Default: `false`, showing current year datasets
- When enabled: uses last year datasets
- Chart: stacked/fill bar chart, hidden legend, index hover/tooltips, dashed y-grid
- Height: `402px`

UI Design card:

- Circular progress:
  - rotate 90
  - size 180
  - width 20
  - value 60
  - color `pink lighten-3`
- Center content:
  - soft fab icon `flash_on`
  - text value `60`
- Status sheet:
  - icon `emoji_events`
  - title `UI Design Progress`
  - subtitle `Good progress!`
- Task progress rows:
  - Sketch File, 4 weeks, 80
  - Adobe XD File, 3 weeks, 70
  - UI Implementation, 6 weeks, 86

Two-column stats:

- Users:
  - phone_iphone `46K`, `+2.75%`
  - desktop_mac `42K`, `-3.25%`
- Happy Customers:
  - favorite `84K`, `+2.75%`
  - sentiment_satisfied_alt `35K`, `+9.10%`
- Tickets:
  - playlist_add `12K`, `Created`
  - playlist_add_check `35K`, `Completed`
- UI Users:
  - `/static/brands/sketch.png`, `82K`, `Likes`
  - `/static/brands/AdobeXD.png`, `78K`, `Likes`

Project table:

- Source data: `src/data/widgets/project.js`
- Depends on `users` from `src/data/dummyData.js`
- Headers:
  - avatar
  - Name
  - Deadline
  - Progress
  - Members
  - Action
- Rows:
  - Sketch File Template
  - Layout Design
  - GraphQL API
  - Lambda Testing
  - Project Deploy
- UI:
  - 36px project avatar
  - 5px progress bars with row-specific color
  - 25px member avatars
  - `+N` member count avatar when `membesCount > 3`
  - trailing `more_vert` icon button
- Card header includes title `Projects` and an add icon button.

Interactions:

- Revenue switch toggles current-year vs last-year chart datasets.
- Project add and row action buttons are visible icon actions; no local click handlers in source.
- Chart.js hover/tooltips are visible interaction behavior.

Assets/data:

- `public/static/brands/sketch.png`
- `public/static/brands/AdobeXD.png`
- `src/data/widgets/project.js`
- `src/data/dummyData.js`
- User avatars referenced by `dummyData`

Responsive behavior:

- Basic stats: `cols=12 sm=6 lg=3`
- Revenue/UI Design: `md=7` and `md=5`; stack below `md`.
- TwoColsStats: full-width row containing four columns, `cols=12 sm=6 lg=3`
- ProjectTable: full-width table card.

Theme behavior:

- Uses Vuse `neu-glow`, `neu-glow-inset`, soft sheets, circular soft fab, and theme colors.
- Must preserve light/dark shell readability and existing Theme Settings behavior.

## React Gaps

Routes:

- Missing real `/dashboard/operational` route/page.
- Missing `/dashboard/analytical` route/page.
- Existing `/dashboard/operational` redirect to `/charts/chartjs` is stale/incorrect.
- Existing `/` redirect to `/charts/chartjs` is stale/incorrect relative to Vue, which redirects to `/dashboard/operational`.

Sidebar:

- Dashboard group exists.
- Operational is visible and linked, but points to a stale redirect.
- Analytical is visible but disabled/pending.

Pages/components:

- Operational dashboard content is missing.
- Analytical dashboard content is missing.
- Old prototype `DashboardPage` under `/prototype-dashboard` does not match Vue and should not be treated as complete dashboard work.

Data/assets:

- Need React-side copies/imports or local equivalents for:
  - dashboard chart datasets
  - `Projects` table data
  - user avatar data/assets used by project table
  - `sketch.png` and `AdobeXD.png` brand assets

Behavior:

- Operational Revenue Monthly/Weekly toggle missing.
- Analytical Revenue Last year comparison switch missing.
- Chart.js dashboard hover/tooltips missing.
- UI Design circular progress and task progress card missing.
- Project table actions and display missing.

Responsive:

- Dashboard-specific `v-row`/`v-col` behavior is not implemented.

## Recommended Implementation Order

1. Dashboard / Operational only:
   - Add real `/dashboard/operational` page and make `/` redirect to it.
   - Keep `/dashboard/analytical` disabled/pending until its own slice.
   - Reuse already approved Widgets/Charts visual patterns where they match Vue dashboard components.
2. Dashboard / Analytical only:
   - Add `/dashboard/analytical` route and enable sidebar child.
   - Implement stats, revenue switch, UI Design card, two-column stats, and project table.

## First Implementation Slice

Recommended next prompt:

Start implementing Dashboard / Operational only.

Active scope:

- Dashboard / Operational
- Route: `/dashboard/operational`
- Root redirect `/` only as needed to match Vue
- Dashboard sidebar Operational entry only as needed

Do not implement:

- Dashboard / Analytical
- App Contacts / Chat
- Directives
- Vuetify
- animations
- approved slices

Keep Dashboard / Operational pending user visual approval after implementation.
