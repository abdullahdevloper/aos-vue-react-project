# App Section Audit

Status: audit complete; implementation not started.

Scope:

- App / Contacts
- App / Chat

Out of scope:

- Vuetify
- Animations
- Dashboard
- Directives
- Approved slices
- `.claude/`

## Vue Sidebar

Source: `src/config/navigation-items.js`

Vue App sidebar entries:

- App
  - Contacts
  - Chat

The App section appears after Dashboard and before Style & User Interface. Contacts uses the `contacts` material icon. Chat uses the `chat` material icon.

## Vue Routes

Source: `src/router/routes/applications.js`

| Page | Vue route | Vue route name | Vue source | App shell |
|---|---|---|---|---|
| Contacts | `/app/contacts` | `Contacts` | `src/views/Applications/Contacts/Contacts.vue` | `navs: true` |
| Chat | `/app/chat` | `Chat` | `src/views/Applications/Chat/Chat.vue` | `navs: true` |

Both routes render inside the main app shell with sidebar/header/footer.

## Shared Inner Layout

Source: `src/layouts/Inner/Layout.vue`

Contacts and Chat use `inner-base-layout`:

- Outer `v-container fluid fill-vuse-container inner-container`.
- Base `v-sheet` with `overflow-hidden flex-x x-height rounded`.
- App-specific base class `neu-glow-inset`.
- Sidebar slot.
- Header slot.
- Scrollable content region with class `scrollable-content`.
- Transparent inner container for both App pages.

React target should create or reuse a shared App inner layout only when implementing the App pages, not during this audit.

## Contacts Inventory

### Vue Sources

- `src/views/Applications/Contacts/Contacts.vue`
- `src/views/Applications/Contacts/partials/sidenav.vue`
- `src/views/Applications/Contacts/partials/ContactRow.vue`
- `src/views/Applications/Contacts/partials/ContactToolbar.vue`
- `src/layouts/Inner/Layout.vue`
- `src/components/UI/Dialogs/ConfirmBox`
- `src/mixins/validationMixin`
- `src/utils/validators`
- `src/data/dummyData.js`

### Data And Assets

From `src/data/dummyData.js`:

- `users`
- `contacts`
- `defaultUserPic`

Referenced assets:

- `public/static/default/user.svg`
- `public/static/doc-images/lists/ali.jpg`
- `public/static/doc-images/lists/men1.png`
- `public/static/doc-images/lists/jack.png`
- `public/static/doc-images/lists/julieta.png`
- `public/static/doc-images/lists/2.jpg`
- `public/static/doc-images/lists/lily.png`
- `public/static/doc-images/lists/g1.jpg`
- `public/static/doc-images/lists/g2.jpg`
- `public/static/doc-images/lists/g3.jpg`
- `public/static/doc-images/lists/g4.jpg`
- `public/static/doc-images/lists/g5.jpg`
- `public/static/doc-images/lists/g6.jpg`
- `public/static/doc-images/lists/m1.jpg`
- `public/static/doc-images/lists/m2.jpg`
- `public/static/doc-images/lists/m3.jpg`
- `public/static/doc-images/lists/m4.jpg`
- Dialog cover image: `https://picsum.photos/630/280?image=618`

`contacts` are derived from `users` and add:

- `nickname`
- `phone`
- `company`
- `birthdate`
- `address`
- `notes`
- `is_favourite`
- `is_frequent`
- `selected`

Note: Vue initializes `is_favourite` and `is_frequent` with `Math.random() >= 0.5`, so exact initial membership differs per load unless React chooses deterministic fixtures for visual review.

### Page Structure

- Vuse section definition:
  - title `Contacts`
  - namespace `Applications`
  - icon `contacts`
- Inner layout:
  - Left contacts sidenav.
  - Header contact toolbar.
  - Scrollable contact list.
- Delete confirmation dialog.
- Create/edit contact dialog.

### Contacts Sidenav

Source: `partials/sidenav.vue`

Layout and behavior:

- `v-navigation-drawer`
- `hide-overlay`
- Permanent on `mdAndUp`.
- Temporary/absolute/stateless on `smAndDown`.
- `vuse-sidebar-scrollable`
- Transparent color on desktop.
- Header toolbar with authenticated user avatar/name.
- Mobile close chevron when drawer is open.
- Rounded dense list.
- Menu items:
  - `All Contacts`, slug `all`
  - `Frequently Contacted`, slug `frequent`
  - `Favourite Contacts`, slug `favourite`
- Active menu item gets `neu-glow-inset-primary`.
- Item avatars show first two characters of the menu title.

### Contacts Toolbar

Source: `partials/ContactToolbar.vue`

Visible controls:

- Select-all checkbox.
- Mobile drawer toggle icon.
- Search field:
  - label `Search Contact`
  - `solo`
  - `dense`
  - prepend search icon
  - clear icon `clear_all`
  - append close icon on small screens.
  - Always visible on desktop.
  - Hidden behind search FAB on small screens until toggled.
- Bulk delete icon appears only when one or more contacts are selected.
- Search FAB appears when search field is hidden.
- Add FAB opens contact dialog.

Toolbar behavior:

- Select-all selects unselected contacts; unchecking unselects selected contacts.
- Search emits `onSearch` and filters the default all-contacts list.
- Bulk delete removes selected contacts.
- Add opens the create contact dialog.

### Contact Rows

Source: `partials/ContactRow.vue`

Visible row columns:

- Checkbox.
- Avatar.
- Full name.
- Email column hidden on `smAndDown`.
- Phone column hidden on `mdAndDown`.
- Favorite star action.
- More menu action.

Row behavior:

- Clicking row/content opens edit dialog.
- Checkbox toggles `item.selected`.
- Star toggles `item.is_favourite`.
- More menu opens one option:
  - Delete
- Delete opens confirmation dialog.

### Contact Dialog

Source: `Contacts.vue`

Dialog behavior:

- `v-dialog` scrollable, persistent, max-width `375`.
- Header cover image from Picsum.
- Tile avatar area using current form avatar.
- Close chevron icon in the image header.
- Name and designation overlay in image header.
- Fields:
  - First Name, prepend `person`, required.
  - Last name, prepend `c`.
  - Nickname, prepend `c`.
  - Phone, prepend `phone`, required, mask `+#### #### #######`.
  - Email, prepend `email`, email validation.
  - Company, prepend `domain`.
  - Job, prepend `work`.
  - Birthdate with `v-menu`, `v-date-picker`, `MM/DD/YYYY format` hint.
  - Address, prepend `mdi-map-marker`.
- Helper text: `*indicates required field`.
- Actions:
  - `Close`
  - `Save` for create mode.
  - `Edit` for edit mode.

Validation:

- `firstname.required` with message `First name is required`.
- `phone.required`, `validNumber`, `maxLength(15)`, `minLength(7)`.
- Phone messages:
  - `Max 14 digits`
  - `Min 7 digits`
  - `Phone number must be a valid number`
- `email.email` with message `Email must be valid`.
- Save/Edit disabled while form invalid.

Other Contacts behavior:

- `All Contacts` search filters by firstname, lastname, email, or phone.
- `Frequently Contacted` filters by `is_frequent`.
- `Favourite Contacts` filters by `is_favourite`.
- Edit mode stores `editIndex`, mutates selected contact, and updates in place.
- Create mode pushes the form object to contacts.
- Delete confirm uses `ConfirmBox`:
  - title `Delete Contact ?`
  - subtitle `Are you sure you want to delete the Contact ?`
  - left button `Cancel`
  - right button `Delete`

### Contacts Responsive Behavior

- Inner App shell remains inside DashboardLayout.
- Contacts sidenav is permanent on `mdAndUp`.
- Contacts sidenav is temporary, absolute, stateless on `smAndDown`.
- Search field is always visible on desktop but toggled behind a FAB on small screens.
- Email column is hidden on `smAndDown`.
- Phone column is hidden on `mdAndDown`.

### Contacts Theme Behavior

- Uses `vuse-content-wrapper`, `contact-app`, `neu-glow-inset`, transparent inner content, Vuse sidebar scroll class, rounded list items, primary inset active state, and soft FAB/action buttons.
- Must preserve DashboardLayout theme settings, light/dark readability, sidebar/header offsets, and Vuse soft UI.

## Chat Inventory

### Vue Sources

- `src/views/Applications/Chat/Chat.vue`
- `src/views/Applications/Chat/partials/UserListNav.vue`
- `src/views/Applications/Chat/partials/ChatToolbar.vue`
- `src/layouts/Inner/Layout.vue`
- `src/data/dummyData.js`

### Data And Assets

From `src/data/dummyData.js`:

- `users`
- `authUser`
- `conversation`
- `groups`

Referenced assets:

- Same `public/static/doc-images/lists/*` user avatars as Contacts.
- User details menu cover image: `https://picsum.photos/630/280?image=618`

Chat data behavior:

- Conversations are grouped by `group_id`.
- Active group defaults to `1`.
- Chat sidebar groups are enriched with:
  - `msgOn` from latest conversation timestamp.
  - `lastMsg` from latest group message.
- Sidebar groups are sorted descending by `msgOn`.
- Search filters groups by `group.user.name`.
- Mounted hook schedules a delayed incoming unread message after 5000ms:
  - `group_id: 7`
  - `user_id: 9`
  - message `Hey, please check new design. It's really amazing. Hope you love it`
  - `read: false`

### Page Structure

- Vuse section definition:
  - title `Chat`
  - icon `chat`
- Inner layout:
  - Left user list nav.
  - Header chat toolbar.
  - Scrollable message conversation area.
  - Bottom message textarea.

### Chat User List Nav

Source: `partials/UserListNav.vue`

Visible controls and behavior:

- `v-navigation-drawer`
- width `280`
- `hide-overlay`
- Permanent on `mdAndUp`.
- Absolute/stateless/floating on `smAndDown`.
- Toolbar contains slotted search field:
  - label `Search User`
  - solo, dense, flat
  - prepend `search`
  - hide details.
- Mobile close chevron.
- Rounded list in scrollable content.
- Each group item:
  - avatar with status dot badge.
  - user name.
  - last message/date text from `group.user.last_message`.
  - unread notification bell when `group.lastMsg && !group.lastMsg.read`.
- Active group gets `neu-glow-inset-primary`.

### Chat Toolbar

Source: `partials/ChatToolbar.vue`

Visible controls and behavior:

- Mobile drawer nav icon only when `smAndDown && !drawer`.
- Active user avatar.
- Active user name.
- Right-side vertical dots button opens user detail menu.
- User detail menu:
  - max-width `280`
  - cover image `https://picsum.photos/630/280?image=618`
  - large tile avatar.
  - close icon.
  - full name.
  - designation.
  - About heading.
  - user mood text.

### Chat Messages

Source: `Chat.vue`

Visible behavior:

- Conversation region has `scrollable-content` and ref `conversations`.
- Messages render in `v-slide-y-transition group`.
- Each message row:
  - full width column.
  - transparent sheet.
  - Incoming messages use normal row direction.
  - Auth user messages use `flex-row-reverse`.
  - Avatar size `40px`.
  - Message bubble:
    - `mx-3 pa-3`.
    - Auth user message gets `neu-glow-inset rounded`.
    - Other messages get `rounded`.
  - Message content supports HTML via `v-html`.

Message input:

- `v-textarea`
- class `chat-input`
- placeholder `Write your message ...`
- `auto-grow`
- `outlined`
- `solo`
- rows `1`
- append icon `fa-paper-plane`.
- Clicking append sends the message.

Send behavior:

- Adds message to `conversation` with active group id, auth user, current timestamp, `read: true`.
- Clears editor.
- After render, scrolls conversations container to bottom.

Switch group behavior:

- Clicking a group sets `activeGroupId`.
- Source contains commented-out scroll reset logic, so active conversation switching does not currently force scroll in the live Vue logic.

### Chat Responsive Behavior

- User list drawer is permanent on `mdAndUp`.
- User list drawer is absolute/stateless/floating on `smAndDown`.
- Chat toolbar shows drawer toggle only when the drawer is closed on small screens.
- Inner content remains scrollable inside the App inner layout.

### Chat Theme Behavior

- Uses `vuse-content-wrapper`, `chat-app`, `neu-glow-inset`, transparent inner content, Vuse sidebar scroll class, active `neu-glow-inset-primary`, soft message bubbles, and theme status colors.
- Must preserve DashboardLayout shell and Theme Settings behavior.

## React Current State

Sources inspected:

- `react-dashboard-template/src/App.tsx`
- `react-dashboard-template/src/data/uiComponentsNavigation.tsx`
- `react-dashboard-template/src/routes`
- `react-dashboard-template/src/pages`

Current React App behavior:

- Sidebar App section is visible.
- Contacts item is disabled/pending.
- Chat item is disabled/pending.
- No `/app/contacts` route is mounted.
- No `/app/chat` route is mounted.
- No React Contacts page exists.
- No React Chat page exists.
- No shared App inner layout exists for Contacts/Chat.

Conclusion:

- App / Contacts is missing.
- App / Chat is missing.
- App routes are missing.
- App sidebar entries are intentionally visible but disabled/pending.

## React Target Files

Recommended target files for implementation:

- `react-dashboard-template/src/pages/app/ContactsPage.tsx`
- `react-dashboard-template/src/pages/app/ChatPage.tsx`
- `react-dashboard-template/src/pages/app/AppInnerLayout.tsx`
- `react-dashboard-template/src/App.tsx`
- `react-dashboard-template/src/data/uiComponentsNavigation.tsx`
- App-local copied/imported avatar assets under `react-dashboard-template/src/assets/app/` if not already available.

Implementation should avoid modifying approved page slices and only touch shared routing/sidebar where needed to expose the active App slice.

## Required React Gaps

Routes:

- Add `/app/contacts`.
- Add `/app/chat` later in its own slice.

Sidebar:

- Enable Contacts when implemented.
- Keep Chat pending until its own slice.
- Keep section order unchanged.

Contacts missing:

- Vuse section header.
- Inner app layout.
- Contacts sidenav.
- Contacts toolbar.
- Search/filter.
- Select/unselect all.
- Bulk delete.
- Contact rows.
- Favorite toggle.
- Row action menu.
- Delete confirm dialog.
- Create/edit contact dialog.
- Validation and datepicker behavior.
- Responsive drawer/search/column visibility.

Chat missing:

- Vuse section header.
- Inner app layout.
- Chat user list.
- Search users.
- Active group switching.
- Unread bell state.
- Conversation bubbles and alignment.
- User details menu.
- Message composer and send behavior.
- Scroll-to-bottom on send.
- Delayed incoming message.
- Responsive drawer behavior.

## Recommended Implementation Order

1. App / Contacts only:
   - Add `/app/contacts`.
   - Enable Contacts sidebar item.
   - Build shared App inner layout only as needed for Contacts.
   - Keep Chat disabled/pending.
2. App / Chat only:
   - Add `/app/chat`.
   - Enable Chat sidebar item.
   - Reuse shared App inner layout from Contacts if appropriate.

## First Implementation Slice

Recommended next prompt:

Start implementing App / Contacts only.

Active scope:

- App / Contacts
- Route: `/app/contacts`
- Shared App inner layout only as needed for Contacts
- Sidebar App / Contacts entry only as needed

Do not implement:

- App / Chat
- Vuetify
- animations
- Dashboard
- Directives
- approved slices

Keep App / Contacts pending user visual approval after implementation.
