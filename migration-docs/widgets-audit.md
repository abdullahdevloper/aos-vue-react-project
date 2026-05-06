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
