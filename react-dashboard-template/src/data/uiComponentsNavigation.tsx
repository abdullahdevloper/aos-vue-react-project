import type { ReactNode } from "react";
import {
  Article,
  AspectRatio,
  ViewHeadline,
  ViewCarousel,
  BorderStyle,
  Build,
  CalendarMonth,
  Chat,
  ColorLens,
  Contacts,
  Dashboard,
  Description,
  Error as ErrorIcon,
  Face,
  FormatColorText,
  FormatListBulleted,
  Functions,
  Help,
  Input,
  InsertChartOutlined,
  LocalOffer,
  Lock,
  MoreHoriz,
  NotificationsActive,
  OfflineBolt,
  People,
  PhotoLibrary,
  RoundedCorner,
  ShowChart,
  Slideshow,
  SwapVert,
  Timer,
  WidgetsOutlined,
} from "@mui/icons-material";

export interface SidebarNavItem {
  title: string;
  icon?: ReactNode;
  path?: string;
  href?: string;
  target?: string;
  badge?: string;
  disabled?: boolean;
  pending?: boolean;
  children?: SidebarNavItem[];
}

export type SidebarNavEntry = SidebarNavItem | { header: string };

export const pendingNote = "Pending";

export const globalNavigation: SidebarNavEntry[] = [
  {
    title: "Dashboard",
    icon: <Dashboard />,
    children: [
      { title: "Operational", icon: <span style={{ display: "inline-flex", width: 24, justifyContent: "center", fontSize: 11, fontWeight: 700, letterSpacing: 0 }}>OP</span>, path: "/dashboard/operational" },
      { title: "Analytical", icon: <span style={{ display: "inline-flex", width: 24, justifyContent: "center", fontSize: 11, fontWeight: 700, letterSpacing: 0 }}>AN</span>, path: "/dashboard/analytical" },
    ],
  },
  { header: "App" },
  { icon: <Contacts />, title: "Contacts", path: "/app/contacts" },
  { icon: <Chat />, title: "Chat", path: "/app/chat" },
  { header: "Style & User Interface" },
  { icon: <ColorLens />, title: "Color", path: "/colors" },
  { icon: <PhotoLibrary />, title: "Icons", path: "/icons" },
  { icon: <Help />, title: "Helpers", path: "/helpers" },
  { icon: <RoundedCorner />, title: "Border Radius", badge: "new", path: "/border-radius" },
  { icon: <FormatColorText />, title: "Text & Typography", badge: "new", path: "/text-typography" },
  { icon: <Slideshow />, title: "Motion", path: "/transitions" },
  { icon: <SwapVert />, title: "Programmatic Scrolling", path: "/scroll" },
  { icon: <Input />, title: "Forms", path: "/forms" },
  { header: "Pages" },
  { icon: <People />, title: "Profile", path: "/pages/profile" },
  { icon: <Timer />, title: "Coming Soon", path: "/pages/coming-soon" },
  { icon: <Build />, title: "Maintenance", path: "/pages/under-maintenance" },
  {
    title: "Authentication",
    icon: <Lock />,
    children: [
      { title: "Login", path: "/pages/authentication/login" },
      { title: "Sign Up", path: "/pages/authentication/signup" },
      { title: "Forgot Password", path: "/pages/authentication/forgot-password" },
      { title: "Lock Screen", path: "/pages/authentication/lock-screen" },
    ],
  },
  {
    title: "Error",
    icon: <ErrorIcon />,
    children: [
      { title: "404", path: "/pages/error/404" },
      { title: "500", path: "/pages/error/500" },
    ],
  },
  { header: "UI Components" },
  {
    title: "Charts",
    icon: <InsertChartOutlined />,
    children: [
      { title: "Spark Line", path: "/charts/spark-line", icon: <OfflineBolt /> },
      { title: "ChartJS", path: "/charts/chartjs", icon: <InsertChartOutlined /> },
    ],
  },
  {
    title: "Widgets",
    icon: <WidgetsOutlined />,
    children: [
      { title: "Cards", path: "/widgets/card" },
      { title: "Lists", path: "/widgets/lists", icon: <FormatListBulleted /> },
      { title: "Statistic", path: "/widgets/statistic", icon: <ShowChart /> },
      { title: "Chart", path: "/widgets/analytical", icon: <InsertChartOutlined /> },
      { title: "Document Cards", path: "/widgets/document-cards", icon: <Article /> },
    ],
  },
  {
    title: "Vuetify",
    icon: <Dashboard />,
    children: [
      { title: "Api Explorer", path: "/components/vuetify/api-explorer", icon: <Dashboard /> },
      { title: "Alerts", path: "/components/alerts", icon: <NotificationsActive /> },
      { title: "Avatars", path: "/components/avatars", icon: <Face /> },
      { title: "Badges", path: "/components/badge", icon: <LocalOffer /> },
      { title: "Banners", path: "/components/banners", icon: <AspectRatio /> },
      {
        title: "Bars",
        children: [
          { title: "App Bars", path: "/components/bars/app-bars", icon: <ViewHeadline /> },
          { title: "Toolbar", path: "/components/bars/toolbar", icon: <ViewHeadline /> },
          { title: "System bars", path: "/components/bars/system-bar", icon: <ViewHeadline /> },
        ],
      },
      { title: "Bottom Navigation", path: "/components/bottom-navigation", icon: <ViewHeadline /> },
      { title: "Bottom Sheets", path: "/components/bottom-sheets", icon: <ViewHeadline /> },
      { title: "Breadcrumbs", path: "/components/breadcrumbs", icon: <ViewHeadline /> },
      {
        title: "Buttons",
        children: [
          { title: "Buttons", path: "/components/buttons", icon: <ViewHeadline /> },
          { title: "Floating Action", path: "/components/buttons/floating-action-buttons", icon: <ViewHeadline /> },
          { title: "Button Groups", path: "/components/buttons/button-groups", icon: <ViewHeadline /> },
        ],
      },
      { title: "Calendars", path: "/components/calendars", icon: <CalendarMonth /> },
      { title: "Cards", path: "/components/cards", icon: <CalendarMonth /> },
      { title: "Carousels", path: "/components/carousels", icon: <ViewCarousel /> },
      {
        title: "Chips",
        children: [
          { title: "Chips", path: "/components/chips", icon: <LocalOffer /> },
          { title: "Chip Groups", path: "/components/chips/chip-groups", icon: <LocalOffer /> },
        ],
      },
      { title: "Dialogs", path: "/components/dialogs", icon: <ViewHeadline /> },
      { title: "Dividers", path: "/components/dividers", icon: <ViewHeadline /> },
      { title: "Expansion Panels", path: "/components/expansion-panels", icon: <ViewHeadline /> },
      { title: "Footers", path: "/components/footer", icon: <ViewHeadline /> },
      {
        title: "Form Control",
        children: [
          { title: "Autocompletes", path: "/components/forms-control/autocompletes", icon: <ViewHeadline /> },
          { title: "Combobox", path: "/components/forms-control/combobox", icon: <ViewHeadline /> },
          { title: "File Inputs", path: "/components/forms-control/file-inputs", icon: <ViewHeadline /> },
          { title: "Forms", path: "/components/forms-control/forms", icon: <ViewHeadline /> },
          { title: "Inputs", path: "/components/forms-control/inputs", icon: <ViewHeadline /> },
          { title: "Overflow Buttons", path: "/components/forms-control/overflow-btns", icon: <ViewHeadline /> },
          { title: "Selects", path: "/components/forms-control/selects", icon: <ViewHeadline /> },
          { title: "Selection Controls", path: "/components/forms-control/selection-controls", icon: <ViewHeadline /> },
          { title: "Sliders", path: "/components/forms-control/sliders", icon: <ViewHeadline /> },
          { title: "Textareas", path: "/components/forms-control/textarea", icon: <ViewHeadline /> },
          { title: "Textfields", path: "/components/forms-control/text-fields", icon: <ViewHeadline /> },
        ],
      },
      { title: "Grids", path: "/components/grids", icon: <ViewHeadline /> },
      {
        title: "Groups",
        children: [
          { title: "Item Groups", path: "/components/groups/item-groups", icon: <ViewHeadline /> },
          { title: "Slide Groups", path: "/components/groups/slide-groups", icon: <ViewHeadline /> },
          { title: "Windows", path: "/components/groups/windows", icon: <ViewHeadline /> },
        ],
      },
      { title: "Hover", path: "/components/hover", icon: <ViewHeadline /> },
      { title: "Icons", path: "/components/icons", icon: <PhotoLibrary /> },
      { title: "Images", path: "/components/images", icon: <PhotoLibrary /> },
      { title: "Lazy", path: "/components/lazy", icon: <ViewHeadline /> },
      {
        title: "Lists",
        children: [
          { title: "List", path: "/components/lists", icon: <ViewHeadline /> },
          { title: "Item Group", path: "/components/lists/item-groups", icon: <ViewHeadline /> },
        ],
      },
      { title: "Menus", path: "/components/menus", icon: <ViewHeadline /> },
      { title: "Navigation Drawers", path: "/components/navigation-drawers", icon: <ViewHeadline /> },
      { title: "Overlays", path: "/components/overlays", icon: <ViewHeadline /> },
      { title: "Paginations", path: "/components/paginations", icon: <ViewHeadline /> },
      { title: "Parallax", disabled: true, pending: true },
      {
        title: "Pickers",
        children: [
          { title: "Color Pickers", disabled: true, pending: true },
          { title: "Date Pickers", disabled: true, pending: true },
          { title: "TIme Pickers", disabled: true, pending: true },
        ],
      },
      {
        title: "Progress",
        children: [
          { title: "Circular", disabled: true, pending: true },
          { title: "Linear", disabled: true, pending: true },
        ],
      },
      { title: "Ratings", disabled: true, pending: true },
      { title: "Sheets", disabled: true, pending: true },
      { title: "Skeleton Loaders", disabled: true, pending: true },
      { title: "Snackbars", disabled: true, pending: true },
      { title: "Steppers", disabled: true, pending: true },
      { title: "Subheaders", disabled: true, pending: true },
      {
        title: "Tables",
        children: [
          { title: "Data Iterators", disabled: true, pending: true },
          { title: "Simple Tables", disabled: true, pending: true },
          { title: "Data Tables", disabled: true, pending: true },
        ],
      },
      { title: "Tabs", disabled: true, pending: true },
      { title: "Timelines", disabled: true, pending: true },
      { title: "Tooltips", disabled: true, pending: true },
      { title: "Treeview", disabled: true, pending: true },
      { title: "VirtualScrollers", badge: "new", disabled: true, pending: true },
    ],
  },
  { header: "Directives" },
  {
    title: "Directives",
    icon: <Functions />,
    children: [
      { title: "Click Outside", badge: "new", path: "/directives/click-outside" },
      { title: "Intersect", disabled: true, pending: true },
      { title: "Mutate", disabled: true, pending: true },
      { title: "Resizing", disabled: true, pending: true },
      { title: "Ripples", disabled: true, pending: true },
      { title: "Scrolling", disabled: true, pending: true },
    ],
  },
  { header: "Guide" },
  {
    icon: <Description />,
    title: "Documentation",
    href: "https://vuse-documention.hexesis.com/introduction",
    target: "_blank",
  },
];

export const uiComponentsNavigation = globalNavigation;

export function fallbackIcon(title: string) {
  return title.slice(0, 2).toUpperCase();
}
