# UI Components / Widgets Audit

Last updated: 2026-05-06

## Scope

Audit-only pass for the original Vue UI Components / Widgets section. Charts is already visually approved and was not modified. No React implementation was changed.

Inspected Vue references:

- `src/config/navigation-items.js`
- `src/router/routes.js`
- `src/router/routes/vuse.js`
- `src/views/Widgets/**`
- `src/components/UI/Widgets/**`
- `src/components/UI/List/**`
- `src/components/UI/ProgressBar/**`
- `src/components/ChartJS/**`
- `src/data/dummyData.js`

## Sidebar Entries

The Widgets group appears under the `UI Components` sidebar section:

| Parent | Child label | Route name | Vue route |
| --- | --- | --- | --- |
| Widgets | Cards | `CardWidgets` | `/widgets/card` |
| Widgets | Lists | `ListWidgets` | `/widgets/lists` |
| Widgets | Statistic | `StatisticWidgets` | `/widgets/statistic` |
| Widgets | Chart | `ChartWidgets` | `/widgets/analytical` |
| Widgets | Document Cards | `DocumentWidgets` | `/widgets/document-cards` |

The Widgets parent uses the `widgets` icon and an expandable nested menu structure.

## Routes And Pages

| Route | Route name | Vue page |
| --- | --- | --- |
| `/widgets/card` | `widgets/CardWidgets` | `src/views/Widgets/Card/index.vue` |
| `/widgets/lists` | `widgets/ListWidgets` | `src/views/Widgets/List/index.vue` |
| `/widgets/statistic` | `widgets/StatisticWidgets` | `src/views/Widgets/Stats/index.vue` |
| `/widgets/analytical` | `widgets/ChartWidgets` | `src/views/Widgets/Chart/index.vue` |
| `/widgets/document-cards` | `widgets/DocumentWidgets` | `src/views/Widgets/Documents/index.vue` |

All pages use `vuse-section-definition` with `icon="card_giftcard"`, then a Vuetify fluid container.

## Page Inventories

### Cards

Vue page: `src/views/Widgets/Card/index.vue`

Layout: three responsive columns with `mb-6` vertical gaps.

Column 1:

- `MovieTicket`
- `CourseCard`
- `BlogPostCard`
- `UserFollowCard`

Column 2:

- `AddToCart`
- `ShoeCard`
- `ArticlePostCard`
- `UserProfileCard`

Column 3:

- `ProductCard`
- `TinyPost`
- `UserProfileCardAlternative`
- `UserProfileCardAnother`
- `UserUtilization`

Shared components used:

- `CartCard`
- `FabIconCard`
- `ProductDetailsCard`
- `CourseCard`
- `BlogPost`
- `ArticlePost`
- `TextPost`
- `UserProfileCard`
- `UserSocialCard`

### Lists

Vue page: `src/views/Widgets/List/index.vue`

Layout: three responsive columns with `mb-6` vertical gaps.

Column 1:

- `LatestMediaList`
- `TicketCheckList`

Column 2:

- `AuthorList`
- `TransactionsList`
- `TodoList`

Column 3:

- `MembersList`
- `BestSellerList`

Shared components used:

- `SearchableList`
- `CheckList`
- `CheckList/Partials/ListItem`
- `FlexList`
- `FlexList/Partials/FlexListItem`

### Statistic

Vue page: `src/views/Widgets/Stats/index.vue`

Sections:

- Six single-column `ColumnarStatistic` cards: Total Orders, Total Views, Likes, Comments, Reviews, Return.
- Four two-column `ColumnarStatistic` cards: Users, Happy Customers, Tickets, UI Users.
- Four `BasicStatistic` cards from `basicStatisticArr`: Users, Orders, CUP Usage, Weekly Income.
- Four inline `BasicStatistic` cards: Customers, Closed Tickets, Downloads, Visits.
- One `TaskStatus` card with ongoing and upcoming progress rows.

Shared components used:

- `ColumnarStatistic`
- `BasicStatistic`
- `TaskStatus`
- `LinearProgressContent`
- Vuetify linear progress bars

### Chart

Vue page: `src/views/Widgets/Chart/index.vue`

Layout:

- First row: four cards at `lg=3 md=6`.
- Second row: two cards at `md=6`.

Active widgets:

- `AnalyticIncomeExpense`
- `RevenueProfileBar`
- `ProductComparisonBar`
- `ProductSalesHorizBar`
- `OrdersStackedLine`
- `NetProfitLine`

Shared components used:

- `StatsChartAnalysis`
- `BarChart`
- `HorizontalBarChart`
- `LineChart`

Present but not active in the Vue page:

- `Revenue`
- `ExpenseStats`
- `ExpenseStats/data.js`

### Document Cards

Vue page: `src/views/Widgets/Documents/index.vue`

Layout: transparent `v-sheet` with `max-width="1180"`, then three responsive columns.

Column 1:

- `WordDocument`
- `PictureDocument`

Column 2:

- `PdfDocument`
- `AudioDocument`

Column 3:

- `VideoDocument`

Shared components used:

- `LinearProgressAvatar`
- Native audio element
- Vuetify image/card/action patterns

## Shared Data And Assets

Shared data:

- `src/data/dummyData.js`
- `users`
- `authUser`
- `defaultUserPic`
- post/list/contact/media data derived from `users`

Local static assets referenced by Widgets:

- `/static/doc-images/lists/*.jpg`
- `/static/doc-images/lists/*.png`
- `/static/default/user.svg`
- `/static/illustator/dragon.jpg`
- `/static/illustator/design_community.png`
- `/static/e-commerce/shoe-revolt-unsplash.webp`
- `/static/e-commerce/headphone-fancy-yellow.webp`
- `/static/e-commerce/apple-teal.webp`
- `/static/e-commerce/strawberry.webp`
- `/static/e-commerce/heinz-mustard.webp`
- `/static/e-commerce/coffee-yellow-cup.webp`
- `/static/e-commerce/nike-red-shoe.webp`
- `/static/movies/Avengers-EndGame.jpg`
- `/static/brands/sketch.png`
- `/static/brands/AdobeXD.png`
- `/static/pages/envato.png`
- `/static/pages/netflix.jpg`
- `/static/pages/scotch-io.png`

Remote assets:

- `https://picsum.photos/500/300?image=292`
- `https://picsum.photos/500/300?image=188`
- `https://picsum.photos/500/300?image=512`
- `https://picsum.photos/500/300?image=271`
- `https://picsum.photos/500/300?image=501`
- `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3`

## Current React Gaps

The approved React work covers Charts only. The current React source has no approved Vue-matched Widgets pages, routes, sidebar entries, widget data model, or copied widget assets.

Missing approved routes:

- `/widgets/card`
- `/widgets/lists`
- `/widgets/statistic`
- `/widgets/analytical`
- `/widgets/document-cards`

Missing approved pages:

- Cards widgets page
- Lists widgets page
- Statistic widgets page
- Chart widgets page
- Document cards widgets page

Missing approved shared UI:

- Widget masonry/three-column layout primitives
- Vuse e-commerce cards
- Vuse post cards
- Vuse user profile/social cards
- Searchable list cards
- Checklist cards
- Flex media lists
- Statistic cards
- Task status/progress card
- Analytical chart widget card
- Document/media cards
- Widget data and asset mapping

## Required React Target Files

Recommended future implementation targets inside `react-dashboard-template/`:

- `src/pages/ui-components/widgets/CardsPage.tsx`
- `src/pages/ui-components/widgets/ListsPage.tsx`
- `src/pages/ui-components/widgets/StatisticPage.tsx`
- `src/pages/ui-components/widgets/ChartWidgetsPage.tsx`
- `src/pages/ui-components/widgets/DocumentCardsPage.tsx`
- `src/components/widgets/cards/*`
- `src/components/widgets/lists/*`
- `src/components/widgets/statistics/*`
- `src/components/widgets/charts/*`
- `src/components/widgets/documents/*`
- `src/data/widgetsData.ts`
- `src/assets/ui-components/widgets/**`

Future implementation will also need route/sidebar updates in existing React routing/navigation files, but those were intentionally not edited in this audit.

## Visual Fidelity Requirements

Widgets must keep the Vuse visual identity:

- Pale `#f2f3f7` dashboard background.
- Soft `neu-glow` raised cards with subtle shadows.
- Inset soft list/progress surfaces where Vue uses `neu-glow-inset`.
- 4px root/card radius unless a specific Vue widget uses circular/fab/avatar geometry.
- Teal/cyan primary accent, plus Vue-like secondary accent colors on icons/progress.
- Compact Vuetify-like typography and spacing, but not compressed.
- Three-column documentation/widget layouts that collapse responsively.
- Media-heavy cards with real images, cover overlays, avatars, chips, small icon actions, and progress elements.
- Chart widgets should reuse the approved chart visual language while matching the compact analytical cards from Vue.
- Document cards need the same max-width feel, icon badges, image overlays, play/audio affordances, and metadata rows.

## Behavior Inventory

Note: local ports were checked for a running Vue widgets route, but the active Node listeners did not expose `/widgets/card`. The behavior and visual details below are source-confirmed from the Vue Widgets pages/components and should be verified against the running Vue app before final visual approval.

### Shared Widgets Page Behavior

Applies to all five Widgets pages:

- Page header uses `vuse-section-definition` with `icon="card_giftcard"`.
- Page content sits inside a pale Vuse dashboard area with fluid Vuetify container spacing.
- Cards use soft `neu-glow` surfaces, compact typography, and Vuetify card padding.
- Responsive behavior is Vuetify grid-driven:
  - Cards, Lists, and Document Cards collapse from three `md=4` columns to one `cols=12` column.
  - Statistic cards collapse from dense `lg` rows to two-up and then one-up layouts.
  - Chart widgets collapse from four-up to two-up to one-up.
- Most buttons rely on Vuetify default hover/focus behavior unless wrapped in a custom hover component.
- Root widget cards generally do not expose tooltips; visible affordances are buttons, menus, chips, checkboxes, progress bars, media controls, avatars, and chart hover tooltips.

### Cards Page Behavior

Vue page: `src/views/Widgets/Card/index.vue`

Visible buttons/actions:

- `MovieTicket` and `AddToCart` use `CartCard`:
  - Sticky top-left rounded/fab label button over the card text area.
  - Main rounded CTA button such as `Add To Cart`.
  - Optional small fab icon action.
  - Button callbacks are prop-driven no-op defaults in the demo unless a page supplies behavior.
- `ShoeCard` uses `FabIconCard`:
  - Centered floating fab over the media/content boundary.
  - Fab has a click handler prop with no-op default.
- `ProductCard` uses `ProductDetailsCard`:
  - Read-only star rating.
  - Rounded action button.
  - Market price can be struck through beside offer price.
- User profile/follow/social cards:
  - Rounded `Follow` / `Add Friend` actions.
  - Small fab message/action button on `UserProfileCard`.
  - Social buttons are small circular/fab buttons linking to social URLs or `mailto:` when configured.
- Post cards:
  - Top/right `more_vert` icon button.
  - Text action buttons for likes and comments with icons.
- `UserUtilization`:
  - Circular progress display.
  - Inset user summary row at the bottom.

Hover states:

- Cards preserve soft raised `neu-glow` surfaces.
- Buttons use Vuetify hover states; social/fab/icon buttons should retain soft circular surfaces.
- No card-level expand/collapse behavior is present.

Checkboxes/toggles:

- None on the Cards page.

Search/filter behavior:

- None on the Cards page.

Menus/tooltips:

- Post card `more_vert` buttons are visible icon buttons, but the shared post card components do not define a menu body.
- No tooltips are defined in the Cards page/component source.

Progress/status behavior:

- `UserUtilization` shows circular progress plus Last Week / Last Month comparison stats.
- Status is visual only; no update loop is defined.

Chart interactions:

- None on the Cards page.

Media/audio behavior:

- Media cards use `v-img` with lazy image sources where provided.
- Cover/avatar cards position the avatar partially over the cover image.
- E-commerce cards use fixed-height product/movie/course imagery.

Responsive behavior:

- Three columns at desktop, one column on small screens.
- Uneven card heights intentionally create a masonry-like visual rhythm within each column.

Exact visual notes to preserve:

- Cards should feel like individual soft Vuse widgets, not generic MUI cards.
- Use small rounded CTAs, circular fab actions, soft avatars, and media images with Vue-like fixed heights.
- Preserve vertical gaps close to `mb-6` between cards.
- Avatar-over-cover cards need the avatar to overlap the cover edge, with title spacing pushed down.

### Lists Page Behavior

Vue page: `src/views/Widgets/List/index.vue`

Visible buttons/actions:

- `FlexList` cards show a top-right `more_vert` icon button in the card header.
- `FlexListItem` rows can show:
  - Text buttons.
  - Icon buttons.
  - Chips.
  - Plain action text.
- `SearchableList` rows can show the same action schema: button, chip, or text.
- `CheckList` rows show a trailing vertical-dots menu button.

Hover states:

- `FlexListItem` uses `v-hover`.
- On hover, a row switches from `neu-glow` to `neu-glow-inset`.
- Checklist rows remain raised `neu-glow` list tiles unless interacted with through checkbox/menu.

Checkboxes/toggles:

- `CheckList/Partials/ListItem.vue` includes a `v-checkbox`.
- Checkbox changes emit `checked` to the parent.
- Parent mutates `item.isCompleted`.

Search/filter behavior:

- `SearchableList` has a `Search` input styled with `neu-input-inset`.
- Search is debounced by 1200 ms.
- Filtering uses Fuse.js with default keys `title` and `subtitle`.
- When search text is empty, the original list is shown.
- When search text exists, Fuse results are mapped back to list items.
- `CheckList` can filter active/completed tasks when `filterable` is true:
  - `Active Tasks` rounded x-small button.
  - `Completed Tasks` rounded x-small button.
  - Active filter button gets `primary` color.
- `CheckList` can add new tasks when `enableCreateNew` is true:
  - Text input uses `keyup.enter`.
  - New task is inserted at the top.
  - Input clears after add.

Menus/tooltips:

- Checklist row menu opens bottom-left.
- Menu items: `Edit`, `Move to Archive`, `Delete`.
- Menu is dense and uses `with-radius neu-glow`.
- No tooltips are defined.

Progress/status behavior:

- Checklist state changes affect active/completed counts and filtered list membership.

Chart interactions:

- None on the Lists page.

Media/audio behavior:

- `LatestMediaList` uses thumbnail images for e-commerce media rows.
- Other lists use avatars from `dummyData`.

Responsive behavior:

- Three desktop columns collapse to one column.
- List cards keep dense row spacing and should not become oversized.

Exact visual notes to preserve:

- List rows should be compact, soft, and pill-like.
- Hover inset behavior is important for `FlexListItem`.
- Search inputs must look inset, not flat outlined fields.
- Filter buttons are tiny rounded pills and should not dominate the card header.

### Statistic Page Behavior

Vue page: `src/views/Widgets/Stats/index.vue`

Visible buttons/actions:

- Statistic cards do not expose clickable CTAs.
- `BasicStatistic` examples include icon/avatar surfaces and embedded progress bars.
- `TaskStatus` has no buttons.

Hover states:

- No explicit hover behavior is defined.
- Cards retain soft raised `neu-glow`.

Checkboxes/toggles:

- None.

Search/filter behavior:

- None.

Menus/tooltips:

- None.

Progress/status behavior:

- `ColumnarStatistic` shows:
  - Large avatar/icon, heading, and trend subheading.
  - Trend icons use up/down visual status colors.
- `BasicStatistic` shows:
  - Large value, avatar/icon, and slotted detail content.
  - Some cards include `v-progress-linear` with value/color.
- `TaskStatus` shows two sections:
  - `On Going`
  - `Upcomig` as spelled in Vue source.
- Each task row uses `LinearProgressContent`:
  - Labels appear above the progress bar when `upside` is true.
  - Progress bars are rounded.
  - Values are static demo data.

Chart interactions:

- None.

Media/audio behavior:

- `UI Users` statistic card uses brand image avatars for Sketch and Adobe XD.

Responsive behavior:

- First statistic row: six dense cards at `lg=2`, then wider at smaller breakpoints.
- Second/basic statistic rows: four cards at `lg=3`, two at `sm=6`, one at mobile.
- `TaskStatus` occupies `md=6`, full width on small screens.

Exact visual notes to preserve:

- Statistic cards should be dense but roomy enough for 70px and 50px soft avatars.
- Headings are large (`text-h4` in Vue) and visually dominant.
- Trend/status colors are varied, not a single teal-only palette.
- Progress bars are thin Vuetify-like bars inside soft card content.

### Chart Widgets Page Behavior

Vue page: `src/views/Widgets/Chart/index.vue`

Visible buttons/actions:

- First-row analytical cards use `StatsChartAnalysis` actions:
  - `See Details` text button aligned to the end.
- Some cards show stats at the top-right:
  - Trending icon plus stat text/subtitle.
  - Plain `Year 2020` text for comparison/sales cards.
- Line cards use an avatar/icon at the top-right instead of a text action.

Hover states:

- No explicit card hover behavior is defined.
- Chart.js itself supplies hover/tooltips where enabled.

Checkboxes/toggles:

- None.

Search/filter behavior:

- None.

Menus/tooltips:

- No Vuetify menus or tooltips are defined in the page.
- Chart.js tooltips are enabled on line widgets:
  - `OrdersStackedLine` uses index mode, non-intersect.
  - `NetProfitLine` uses index mode, non-intersect, with custom labels formatted as `$valueK`.
- Bar widgets hide legends and axes, making the chart cards feel compact.

Progress/status behavior:

- Top stat blocks use trend icons/text to communicate status.

Chart interactions:

- Bar widgets:
  - Responsive, no legend, hidden axes, stacked where defined.
  - Dataset shadows are configured in Vue data.
- Horizontal bar widget:
  - Same compact no-axis/no-legend style.
- Line widgets:
  - Responsive, no legend.
  - X/Y axes visible with dashed grid on Y.
  - Hover mode is index/non-intersect.
  - Max chart height is `300px`.

Media/audio behavior:

- None.

Responsive behavior:

- First row: `lg=3 md=6`, so four-up desktop, two-up medium, one-up small.
- Second row: `md=6`, so two-up desktop/medium, one-up small.

Exact visual notes to preserve:

- Analytical cards are compact, not full documentation examples.
- Header area has gray subtitle, larger title, optional stats/avatar, then chart body.
- Charts should sit inside card text with minimal chrome.
- `See Details` should stay low-emphasis and aligned right.

### Document Cards Page Behavior

Vue page: `src/views/Widgets/Documents/index.vue`

Visible buttons/actions:

- Word/PDF cards:
  - No clickable button besides visual progress-avatar badge.
- Picture card:
  - Small top-right size pill `25MB`.
- Video card:
  - Centered fab play button.
  - Small top-right duration pill `01:28`.
- Audio card:
  - Native audio controls.
  - Small top-right teal duration pill `06:12`.

Hover states:

- No explicit hover behavior is defined.
- Media cards rely on image/card/button default hover feedback.

Checkboxes/toggles:

- None.

Search/filter behavior:

- None.

Menus/tooltips:

- None.

Progress/status behavior:

- `LinearProgressAvatar` is positioned absolutely over Word/PDF cards.
- It renders a small tile avatar label (`W` or `PDF`) with a linear progress bar.
- Document metadata uses `query_builder` icon plus full date.

Chart interactions:

- None.

Media/audio behavior:

- Picture and video cards are dark image cards with text overlays on the image.
- Video play fab is visual only; no video player/modal behavior is defined.
- Audio card uses a real native `<audio controls>` element with SoundHelix MP3 source.
- Audio element has a rounded `30px` radius and removes focus outline.

Responsive behavior:

- Transparent max-width `1180` sheet contains three `md=4` columns.
- Columns collapse to full-width on mobile.
- Cards use `max-width="374"`, so they should not stretch too wide in desktop columns.

Exact visual notes to preserve:

- Document cards are narrower than the full content width and centered by the three-column sheet.
- Image cards use dark overlay text directly on media, not separate body sections.
- Audio card has a floating/player-centered feel inside a 250px transparent sheet.
- Word/PDF progress avatars should sit at the top edge as small status markers.

## Missing Behavior List

React Widgets implementation must still add:

- Widgets sidebar expandable group and five child routes.
- Cards page actions: sticky labels, rounded CTAs, fab icon actions, social links, post action buttons, and profile/user utilization affordances.
- Lists page Fuse search with 1200 ms debounce.
- Lists page active/completed task filters.
- Lists page add-task-on-enter behavior.
- Checklist checkbox state mutation and active/completed counts.
- Checklist dense row menu with Edit / Move to Archive / Delete.
- Flex list row hover switching from raised to inset.
- Statistic progress bars, trend/status icons, and task-status sections.
- Chart widget Chart.js hover/tooltips, including custom Net Profit tooltip formatting.
- Chart widget low-emphasis `See Details` actions.
- Document card progress-avatar badges.
- Picture/video overlay pills and centered video play fab.
- Native audio controls and rounded audio player styling.
- Responsive three-column, dense statistic, and analytical card breakpoints.

## Recommended Implementation Order

1. Extend the approved UI Components shell/sidebar to add the Widgets parent and five child routes.
2. Add shared widget data and copy only required local widget assets into `react-dashboard-template/src/assets/ui-components/widgets/`.
3. Implement shared Vuse widget primitives: widget card surface, media card shell, avatar/list rows, progress avatar/content, and chart-analysis card.
4. Rebuild Cards page first because it exercises most media, post, product, and user card primitives.
5. Rebuild Lists page using the same avatar/media/list primitives.
6. Rebuild Statistic page and task status progress card.
7. Rebuild Chart widgets page using existing approved React ChartJS wrappers where possible.
8. Rebuild Document Cards page last, including audio/media overlay fidelity.

## Recommended Next Implementation Prompt

Implement only the first UI Components / Widgets rebuild slice: Widgets shell/sidebar entries + Cards page at `/widgets/card`. Use the Vue app and `src/views/Widgets/Card/**` as the source of truth. Do not modify Charts, Vuetify, Style & User Interface, Pages, protected Vue/root files, or `AGENTS.md`. Work only inside `react-dashboard-template/` and `migration-docs/`, run `npm run build` inside `react-dashboard-template/`, then update `migration-docs/progress.md` and `migration-docs/phase-report.md`. Keep Widgets pending user visual approval.
