# Pages Section Audit

Last updated: 2026-05-07

## Scope

Active scope: Pages section only.

This is audit-only. No React implementation code was changed.

Paused/untouched sections:

- UI Components / Charts: approved, not touched.
- UI Components / Widgets: approved, not touched.
- Vuetify Batch A approved items: Api Explorer, Alerts, Avatars, Badges, not touched.
- Vuetify / Banners: intentionally paused, not started.
- Vuetify Batch B or later: not started.
- Style & User Interface: not in scope.

## Source Paths Inspected

- `src/config/navigation-items.js`
- `src/router/routes.js`
- `src/router/routes/vuse.js`
- `src/router/routes/applications.js`
- `src/router/routes/vuetify.js` for route-split context only
- `src/views/Pages/**`
- `src/components/CountDown.vue`
- `src/components/UI/List/TwoLinesItems.vue`
- `src/components/UI/List/HorizontalCardList.vue`
- `src/components/UI/Card/HorizontalCard.vue`
- `src/components/Stock/VuseNeuAvatar.vue`
- `src/components/Stock/VuseLogo.vue`
- `src/data/dummyData.js`
- `public/static/illustator/**`
- `public/static/pages/**`
- `public/static/doc-images/lists/**`

Requested paths that do not exist in this Vue project:

- `src/views/Auth/**`
- `src/views/Error/**`

Auth and error pages are stored under:

- `src/views/Pages/Authentication/**`
- `src/views/Pages/Errors/**`

## Sidebar Inventory

Pages sidebar section from `src/config/navigation-items.js`:

- Header: `Pages`
- `Profile`
  - icon: `people`
  - route name: `ProfileView`
- `Coming Soon`
  - icon: `timer`
  - route name: `ComingSoon`
- `Maintenance`
  - icon: `build`
  - route name: `MaintenancePage`
- `Authentication`
  - group: `pages/authentication`
  - icon: `lock`
  - children:
    - `Login`
    - `Sign Up`
    - `Forgot Password`
    - `Lock Screen`
- `Error`
  - group: `pages/error`
  - icon: `error`
  - children:
    - `404`
    - `500`

## Routes Inventory

Routes from `src/router/routes/vuse.js`:

| Sidebar item | Path | Route name | Vue view | Layout behavior |
|---|---|---|---|---|
| Profile | `/pages/profile` | `ProfileView` | `Pages/Profile/Profile` | App shell with sidebar/header/footer because `navs: true`. |
| Login | `/pages/authentication/login` | `pages/authentication/LoginPage` | `Pages/Authentication/Login/Login` | Auth/full-screen route; `meta.layout = auth`; no named nav components. |
| Forgot Password | `/pages/authentication/forgot-password` | `pages/authentication/ForgotPasswordPage` | `Pages/Authentication/ForgotPassword/ForgotPassword` | Auth/full-screen route; `meta.layout = auth`; no named nav components. |
| Sign Up | `/pages/authentication/signup` | `pages/authentication/SignupPage` | `Pages/Authentication/Signup/Signup` | Auth/full-screen route; `meta.layout = auth`; no named nav components. |
| Lock Screen | `/pages/authentication/lock-screen` | `pages/authentication/LockScreenPage` | `Pages/Authentication/LockScreen/LockScreen` | Auth/full-screen route; `meta.layout = auth`; no named nav components. |
| Coming Soon | `/pages/coming-soon` | `ComingSoon` | `Pages/ComingSoon` | Full-page route; `meta.layout = full`; no named nav components. |
| Maintenance | `/pages/under-maintenance` | `MaintenancePage` | `Pages/Maintenance` | Full-page route; `meta.layout = full`; no named nav components. |
| 404 | `/pages/error/404` | `pages/error/Error404` | `Pages/Errors/Error404` | Full-page route; `meta.layout = full`; no named nav components. |
| 500 | `/pages/error/500` | `pages/error/Error500` | `Pages/Errors/Error500` | Full-page route; `meta.layout = full`; no named nav components. |
| Catch-all 404 | `*` | `PageNotFound` | `Pages/Errors/Error404` | Full-page route; `meta.layout = full`; no named nav components. |

Router layout detail:

- `src/router/routes.js` adds named `sidebar`, `header`, and `footer` components only when a route has `navs: true`.
- Profile uses the full Vuse app shell: `src/layouts/App/Sidebar`, `src/layouts/App/Toolbar`, `src/layouts/App/Footer`.
- Auth, coming soon, maintenance, and errors render only the default page in `src/App.vue` inside `v-main`; they use a full-height self-contained layout.

## Page Inventory

### Profile

Vue files:

- `src/views/Pages/Profile/Profile.vue`
- `src/views/Pages/Profile/components/index.js`
- `src/views/Pages/Profile/components/Cover.vue`
- `src/views/Pages/Profile/components/Timeline/Timeline.vue`
- `src/views/Pages/Profile/components/Timeline/partials/Intro.vue`
- `src/views/Pages/Profile/components/Timeline/partials/Photos.vue`
- `src/views/Pages/Profile/components/Timeline/partials/Friends.vue`
- `src/views/Pages/Profile/components/Timeline/partials/LastActivities.vue`
- `src/views/Pages/Profile/components/Timeline/partials/Post.vue`
- `src/views/Pages/Profile/components/About/About.vue`
- `src/views/Pages/Profile/components/About/partials/Statistics.vue`
- `src/views/Pages/Profile/components/About/partials/Biography.vue`
- `src/views/Pages/Profile/components/About/partials/Skills.vue`
- `src/views/Pages/Profile/components/About/partials/Testimonials.vue`
- `src/views/Pages/Profile/components/Friends/Friends.vue`
- `src/views/Pages/Profile/components/Photos/Photos.vue`

Shared components:

- `VuseNeuAvatar`
- `TwoLinesItems`
- `HorizontalCardList`
- `HorizontalCard`

Data and assets:

- `authUser`, `users`, `posts`, `pages`, `testimonials` from `src/data/dummyData.js`.
- Local avatars under `/static/doc-images/lists/*`.
- Page cards: `/static/pages/envato.png`, `/static/pages/netflix.jpg`, `/static/pages/scotch-io.png`.
- Cover image: `https://picsum.photos/id/823/851/315`.
- Timeline/gallery/post images from `https://picsum.photos/...`.

Visible layout:

- Outer `ma-3 vuse-user-profile` wrapper.
- Fluid container.
- Large inset neumorphic card with cover image, profile avatar, camera icon button, floating add FAB.
- Name row with `Alice Blue`.
- Right-aligned tabs: `timeline`, `about`, `friends`, `photos`.
- Tab content is kept alive.

Actions and behavior:

- Profile tabs switch between timeline/about/friends/photos.
- Cover camera icon is visible; no handler in source.
- Cover add FAB is visible; no handler in source.
- Timeline composer has textarea plus icon buttons for photo/person/location and a primary `Post` button; no post mutation in source.
- Timeline post favorite icon is visible from post data; no toggle handler in `Post.vue`.
- Timeline comment favorite buttons are visible; no handler.
- Timeline comment textarea and `Comment` button are visible; no comment mutation in source.
- Timeline sidebar `See All` buttons are visible in Photos/Friends/Last Activities; no navigation handler in source.
- Friends tab:
  - Search icon toggles search field on small screens.
  - Search field is always visible on larger screens.
  - Search filters by firstname, lastname, email, or phone.
  - Clearable search field.
  - Heart icon toggles `closedFriend`.
  - `Unfriend` removes a friend from the list.
  - `title="Click to unfriend"` tooltip/native title exists on the button.
- Photos tab:
  - 18-image grid.
  - Hover overlay reveals fullscreen FAB.
  - Clicking fullscreen switches to carousel mode and starts at selected image.
  - Carousel hides delimiters.
  - Hovering carousel image reveals red fullscreen-exit FAB.
  - Clicking exit returns to grid mode.

Responsive behavior:

- Main Profile content uses `v-row`/`v-col`.
- Profile tabs sit beside name row; should wrap or stack if needed in React while matching Vue density.
- Timeline and About use `cols=12 md=4` + `cols=12 md=8`.
- Friends tab cards use `cols=12 md=6`.
- Photos tab grid uses `cols=12 md=3`.
- Cover toolbar title hides below `md` using `$vuetify.breakpoint.mdAndUp`.
- Friends search title hides on small screens when the search field is visible.

### Login

Vue file:

- `src/views/Pages/Authentication/Login/Login.vue`

Assets:

- `/static/illustator/working_late.png`
- `VuseLogo`

Visible layout:

- Full-height inset neumorphic page background.
- Centered card: `cols=12 sm=8 md=7`.
- Left illustration column hidden below `md`.
- Right form column with Vuse Admin branding, welcome subtitle, max-width 380 form.

Fields and validation:

- Email text field:
  - `required`
  - `email`
  - error messages: `Please enter email`, `Email must be valid`
  - touched on input and blur
- Password text field:
  - `required`
  - `minLength(6)`
  - error messages: `Please enter password`, `Password must be of 6 characters`
  - prepend icon `vpn_key`
  - append eye icon toggles visible password
- Remember Me checkbox.

Actions and navigation:

- Submit button `Sign In`, block, disabled while invalid.
- On submit: success snackbar `Signed In Successfully`, reset form, reset validation, after 2000ms router pushes `dashboard/operational`.
- `Forgot Password` link to `/pages/authentication/forgot-password`.
- `Create Account` link to `/pages/authentication/signup`.

### Sign Up

Vue file:

- `src/views/Pages/Authentication/Signup/Signup.vue`

Assets:

- `/static/illustator/welcome.png`

Visible layout:

- Same full-height auth card pattern as Login.
- Left illustration hidden below `md`.
- Right form with `Vuse Admin`, `Create Account`, max-width 380 form.

Fields and validation:

- Name:
  - `required`
  - error: `Name is required.`
- Email:
  - `required`, `email`
  - errors: `Please enter email`, `Email must be valid`
- Password:
  - `required`, `minLength(6)`
  - eye icon toggles visible password
  - errors: `Please enter password`, `Password must be of 6 characters`
- Confirm Password:
  - `required`
  - `sameAs("password")`
  - error: `Password does not match`
- Agree to policy checkbox:
  - `required`
  - label includes clickable `terms & privacy policy` `v-btn-toggle`
  - toggles `dialog`, but no dialog markup is present in the file.

Actions and navigation:

- Submit `Sign Up`, disabled while invalid.
- On submit: success snackbar text is `Signed In Successfully`, reset form, reset validation, after 2000ms route to `dashboard/operational`.
- `Login` link to `/pages/authentication/login`.

### Forgot Password

Vue files:

- `src/views/Pages/Authentication/ForgotPassword/ForgotPassword.vue`
- `src/views/Pages/Authentication/ForgotPassword/Partials/SendOtp.vue`
- `src/views/Pages/Authentication/ForgotPassword/Partials/VerifyOtp.vue`
- `src/views/Pages/Authentication/ForgotPassword/Partials/ResetPassword.vue`

Assets:

- Step 1: `/static/illustator/forgot_password.png`
- Step 2: `/static/illustator/my_passcode.png`
- Step 3: `/static/illustator/password.png`

Visible layout:

- Full-height auth card pattern.
- Centered card: `cols=12 sm=8 md=8 lg=6`.
- Left image column hidden below `md`; image changes by step.
- Right column has absolute top-right icon close button to `/pages/authentication/login`.
- Header changes by step:
  - `Recover Your Account`; subtitle `Provide your e-mail address to reset your password`
  - `Enter 5- Digit Code.`; subtitle `We've sent a 5-digit code to your email address. Input code below.`
  - `Set New Password`; subtitle `null`
- Uses transparent `v-stepper`; header hidden.

Fields and validation:

- Step 1 SendOtp:
  - Email required/email.
  - Button `Send OTP`, disabled while invalid, loading during fake async.
  - After 2000ms emits `next`.
- Step 2 VerifyOtp:
  - Code required.
  - Mask `###-##` from `vue-the-mask`.
  - Placeholder `000-00`.
  - Button text is `Send OTP`, disabled while invalid, loading during fake async.
  - After 2000ms emits `next`.
- Step 3 ResetPassword:
  - Password required, eye icon toggles visible password.
  - Confirm password `sameAs(password)`.
  - Button `Reset Password`, disabled while invalid, loading during fake async.
  - After 2000ms emits `complete`.

Actions and navigation:

- Close icon navigates to login.
- Completion shows snackbar `Password Reset Successfully` and immediately routes to `pages/authentication/LoginPage`.

### Lock Screen

Vue file:

- `src/views/Pages/Authentication/LockScreen/LockScreen.vue`

Assets/data:

- `/static/illustator/unlock.png`
- `authUser` from dummy data; avatar `/static/doc-images/lists/ali.jpg`.
- `VuseNeuAvatar`.

Visible layout:

- Same full-height auth card pattern as Login.
- Left illustration hidden below `md`.
- Right column has Vuse Admin title, subtitle, user name, neumorphic avatar, password form.

Fields and validation:

- Password:
  - `required`
  - `minLength(6)`
  - eye icon toggles visible password
  - errors: `Please enter password`, `Password must be of 6 characters`

Actions and navigation:

- `Sign In` disabled while invalid.
- On submit: success snackbar `Signed In Successfully`, reset form, reset validation, route to `dashboard/operational` after 2000ms.
- `Login with different account` link to `/pages/authentication/login`.

### Coming Soon

Vue file:

- `src/views/Pages/ComingSoon.vue`

Shared component:

- `src/components/CountDown.vue`

Assets:

- `/static/illustator/the_moon.png`

Visible layout:

- Full-height inset neumorphic background.
- Centered card: `cols=12 sm=9 md=6`.
- Moon illustration at `height=250`, contained.
- Heading text exactly `Lauching Very Soon` in source.
- Countdown row using four 70x70 inset blocks: Days, Hrs, Min, Sec.
- Subscription copy: `Please subscribe us to get updates on our application`.
- Email field max-width 400.

Fields and validation:

- Email required/email.
- Error messages: `Please enter email`, `Email must be valid`.
- Submit button `Notify Me!`, disabled while invalid.

Actions and behavior:

- Deadline computed as one year from current date using `date-fns/addYears` and formatted as `MMM dd, yyyy`.
- Countdown updates every second and stops at zero.
- Submit resets form and validation only; no snackbar is displayed despite `snackbar` state.

Responsive behavior:

- Center card uses `cols=12 sm=9 md=6`.
- Countdown blocks flex-wrap.

### Maintenance

Vue file:

- `src/views/Pages/Maintenance.vue`

Assets:

- `/static/illustator/under_construction.png`

Visible layout:

- Full-height inset neumorphic background.
- Centered card: `cols=12 sm=9 md=6`.
- Illustration at `height=250`, contained.
- Heading `Under Maintenance!`.
- Copy: `Scheduled maintenance is currently in progress. Please check back soon We apologize for any inconvenience.`
- Button `Back To Home`.

Actions and navigation:

- `Back To Home` links to `/dashboard/operational`.

Notes:

- The script imports validation/date helpers and defines form/deadline/submit data, but none are used in the template. Treat as dead code; do not recreate unless needed for fidelity.

### Error 404

Vue file:

- `src/views/Pages/Errors/Error404.vue`

Assets:

- `/static/illustator/not_found.png`

Visible layout:

- Full-height inset neumorphic background.
- Centered card: `cols=12 sm=9 md=6`.
- Illustration at `height=250`, contained.
- Huge `404` using `text-h1 font-weight-black neu-text-glow`.
- Copy: `Sorry but we could not find the page that you are looking for`.
- Button `Back To Home`.

Actions and navigation:

- `Back To Home` links to `/dashboard/operational`.

### Error 500

Vue file:

- `src/views/Pages/Errors/Error500.vue`

Assets:

- `/static/illustator/server_down.png`

Visible layout:

- Full-height inset neumorphic background.
- Centered card: `cols=12 sm=9 md=6`.
- Illustration at `height=250`, contained.
- Huge `500` using `text-h1 font-weight-black neu-text-glow`.
- Copy: `Whoops! Internal Server Error`.
- Button `Back To Home`.

Actions and navigation:

- `Back To Home` links to `/dashboard/operational`.

## Current React Gaps

React currently has no Pages section implementation.

Missing React sidebar entries:

- Pages header.
- Profile.
- Coming Soon.
- Maintenance.
- Authentication group with Login, Sign Up, Forgot Password, Lock Screen.
- Error group with 404 and 500.

Missing React routes:

- `/pages/profile`
- `/pages/authentication/login`
- `/pages/authentication/signup`
- `/pages/authentication/forgot-password`
- `/pages/authentication/lock-screen`
- `/pages/coming-soon`
- `/pages/under-maintenance`
- `/pages/error/404`
- `/pages/error/500`
- Catch-all route to the Pages 404 equivalent

Missing React pages/components:

- Pages layout primitives for Vuse app-shell pages and full/auth pages.
- Profile page and all tabs/partials.
- Auth card shell.
- Login form.
- Signup form.
- Forgot password stepper and three partial forms.
- Lock screen form.
- Coming soon card and countdown.
- Maintenance card.
- Error 404 and Error 500 cards.
- Reusable VuseLogo and VuseNeuAvatar equivalents for Pages.
- Pages data and asset copies into `react-dashboard-template/`.

Existing placeholder/prototype files:

- `react-dashboard-template/src/routes/pages.tsx` contains generic prototype pages unrelated to the Vue Pages section.
- No current React route maps to the Vue Pages route set.

## Required React Target Files

Recommended target structure:

- `react-dashboard-template/src/pages/pages/ProfilePage.tsx`
- `react-dashboard-template/src/pages/pages/profile/ProfileCover.tsx`
- `react-dashboard-template/src/pages/pages/profile/ProfileTimeline.tsx`
- `react-dashboard-template/src/pages/pages/profile/ProfileAbout.tsx`
- `react-dashboard-template/src/pages/pages/profile/ProfileFriends.tsx`
- `react-dashboard-template/src/pages/pages/profile/ProfilePhotos.tsx`
- `react-dashboard-template/src/pages/pages/auth/LoginPage.tsx`
- `react-dashboard-template/src/pages/pages/auth/SignupPage.tsx`
- `react-dashboard-template/src/pages/pages/auth/ForgotPasswordPage.tsx`
- `react-dashboard-template/src/pages/pages/auth/LockScreenPage.tsx`
- `react-dashboard-template/src/pages/pages/ComingSoonPage.tsx`
- `react-dashboard-template/src/pages/pages/MaintenancePage.tsx`
- `react-dashboard-template/src/pages/pages/Error404Page.tsx`
- `react-dashboard-template/src/pages/pages/Error500Page.tsx`
- `react-dashboard-template/src/pages/pages/components/AuthShell.tsx`
- `react-dashboard-template/src/pages/pages/components/FullPageShell.tsx`
- `react-dashboard-template/src/pages/pages/components/CountDown.tsx`
- `react-dashboard-template/src/pages/pages/components/VuseLogo.tsx`
- `react-dashboard-template/src/pages/pages/components/VuseNeuAvatar.tsx`
- `react-dashboard-template/src/data/pagesData.ts`
- `react-dashboard-template/src/assets/pages/illustrator/*`
- `react-dashboard-template/src/assets/pages/static-pages/*`
- `react-dashboard-template/src/assets/pages/doc-images/lists/*`

Route/sidebar files that will need updates during implementation:

- `react-dashboard-template/src/App.tsx`
- React navigation data file, likely `react-dashboard-template/src/data/uiComponentsNavigation.tsx` or a renamed/expanded navigation config once Pages are added.
- `react-dashboard-template/src/layouts/DashboardLayout.tsx` only if the shell must support Pages and full/auth pages without breaking approved UI Components.

## Visual Fidelity Requirements

All Pages slices must preserve the Vuse identity:

- Pale `#F2F3F7` background.
- Neumorphic `neu-glow` and `neu-glow-inset` card surfaces.
- 4px-ish Vuse radius on sheets/cards.
- Teal/cyan primary accents and secondary buttons where Vue uses `secondary`.
- Vue/Vuetify form density: solo flat text fields, prepended icons, appended password visibility icons, Vuetify checkbox spacing.
- Full/auth pages must feel centered, full-height, and roomy, not like generic MUI auth cards.
- Illustration column must hide below `md` for auth pages.
- Profile must preserve the cover composition, large neumorphic profile avatar, right-aligned tabs, and soft inset content cards.
- Buttons need Vue-like hover, focus, disabled, active/pressed, block/fab/icon states.
- Snackbar placement: absolute top right, success color, check icon.
- Countdown blocks: 70x70 inset rounded cards with centered value and label.
- Error numbers: very large, black/teal-neumorphic text-glow style.

## Behavior Checklist

Global Pages behavior:

- Sidebar active/expanded state for Pages groups.
- App-shell route vs full/auth route shell behavior.
- Router links use the exact Vue paths.
- Protected UI Components routes remain intact.

Forms:

- Required/email/min-length/same-as validation.
- Touched-on-input/blur error behavior where Vue uses it.
- Disabled submit buttons while invalid.
- Password show/hide toggles.
- Checkboxes and policy toggle behavior.
- Fake async loading states for forgot password steps.
- Success snackbar behavior and redirect timing.
- Form reset and validation reset after success.

Profile:

- Tabs switch and preserve tab content state.
- Friends search visibility on mobile vs desktop.
- Friends search filtering.
- Friend heart toggle.
- Unfriend removal.
- Photos hover overlay.
- Photos fullscreen carousel enter/exit.
- Timeline composer and post controls visible, even if source has no mutation.
- Link handling for external website and profile page cards.

Full pages:

- Countdown interval and stop at zero.
- Back-to-home links.
- Catch-all 404 route.

Responsive:

- Follow Vue `v-col` props exactly where present.
- Do not invent arbitrary breakpoints.
- Use Vue breakpoints as implementation guide:
  - Auth illustrations visible only at `mdAndUp`.
  - Auth cards `cols=12 sm=8 md=7`; forgot password `cols=12 sm=8 md=8 lg=6`.
  - Full cards `cols=12 sm=9 md=6`.
  - Profile/timeline/about `cols=12 md=4/8`.
  - Profile friends cards `cols=12 md=6`.
  - Profile photos grid `cols=12 md=3`.
  - Cover toolbar title hidden below `md`.

## Recommended Implementation Order

1. Pages shared shells and assets audit finalization:
   - Create/copy only required Pages assets into React.
   - Build `FullPageShell`, `AuthShell`, `VuseLogo`, `VuseNeuAvatar`, and `CountDown`.
   - Add Pages sidebar structure without changing approved UI Components behavior.

2. Full-page simple pages:
   - `/pages/error/404`
   - `/pages/error/500`
   - `/pages/under-maintenance`
   - These establish the full-page shell and button/navigation fidelity with low interaction risk.

3. Coming Soon:
   - Adds countdown and email validation to the full-page shell.

4. Authentication:
   - Login and Lock Screen first because they share simpler validation/redirect/snackbar behavior.
   - Signup after that because of confirm-password and policy checkbox.
   - Forgot Password last because it has stepper, masks, timers, loaders, and completion redirect.

5. Profile:
   - Largest slice; implement after shared avatar/data/list/card patterns are stable.
   - Suggested sub-order: shell/cover/tabs, Timeline, About, Friends tab, Photos tab.

## Recommended First Implementation Slice

Recommended first Pages implementation slice:

- Pages shared full-page shell + Error 404 and Error 500.

Reason:

- It exercises the Pages full layout, Vuse illustration card, neu-text-glow number styling, Back To Home navigation, responsive `cols=12 sm=9 md=6`, and catch-all route behavior with minimal form/state risk.

Do not start Profile or Auth until this full-page shell is visually approved.
