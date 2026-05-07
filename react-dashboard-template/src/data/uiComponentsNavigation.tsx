import type { ReactNode } from "react";
import {
  Article,
  BorderStyle,
  Build,
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
      { title: "Operational", icon: <Dashboard />, path: "/dashboard/operational" },
      { title: "Analytical", icon: <Dashboard />, disabled: true, pending: true },
    ],
  },
  { header: "App" },
  { icon: <Contacts />, title: "Contacts", disabled: true, pending: true },
  { icon: <Chat />, title: "Chat", disabled: true, pending: true },
  { header: "Style & User Interface" },
  { icon: <ColorLens />, title: "Color", disabled: true, pending: true },
  { icon: <PhotoLibrary />, title: "Icons", disabled: true, pending: true },
  { icon: <Help />, title: "Helpers", disabled: true, pending: true },
  { icon: <RoundedCorner />, title: "Border Radius", badge: "new", disabled: true, pending: true },
  { icon: <FormatColorText />, title: "Text & Typography", badge: "new", disabled: true, pending: true },
  { icon: <Slideshow />, title: "Motion", disabled: true, pending: true },
  { title: "Programmatic Scrolling", disabled: true, pending: true },
  { icon: <Input />, title: "Forms", disabled: true, pending: true },
  { header: "Pages" },
  { icon: <People />, title: "Profile", disabled: true, pending: true },
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
      { title: "Banners", disabled: true, pending: true },
      {
        title: "Bars",
        children: [
          { title: "App Bars", disabled: true, pending: true },
          { title: "Toolbar", disabled: true, pending: true },
          { title: "System bars", disabled: true, pending: true },
        ],
      },
      { title: "Bottom Navigation", disabled: true, pending: true },
      { title: "Bottom Sheets", disabled: true, pending: true },
      { title: "Breadcrumbs", disabled: true, pending: true },
      {
        title: "Buttons",
        children: [
          { title: "Buttons", disabled: true, pending: true },
          { title: "Floating Action", disabled: true, pending: true },
          { title: "Button Groups", disabled: true, pending: true },
        ],
      },
      { title: "Calendars", disabled: true, pending: true },
      { title: "Cards", disabled: true, pending: true },
      { title: "Carousels", disabled: true, pending: true },
      {
        title: "Chips",
        children: [
          { title: "Chips", disabled: true, pending: true },
          { title: "Chip Groups", disabled: true, pending: true },
        ],
      },
      { title: "Dialogs", disabled: true, pending: true },
      { title: "Dividers", disabled: true, pending: true },
      { title: "Expansion Panels", disabled: true, pending: true },
      { title: "Footers", disabled: true, pending: true },
      {
        title: "Form Control",
        children: [
          { title: "Autocompletes", disabled: true, pending: true },
          { title: "Combobox", disabled: true, pending: true },
          { title: "File Inputs", disabled: true, pending: true },
          { title: "Forms", disabled: true, pending: true },
          { title: "Inputs", disabled: true, pending: true },
          { title: "Overflow Buttons", disabled: true, pending: true },
          { title: "Selects", disabled: true, pending: true },
          { title: "Selection Controls", disabled: true, pending: true },
          { title: "Sliders", disabled: true, pending: true },
          { title: "Textareas", disabled: true, pending: true },
          { title: "Textfields", disabled: true, pending: true },
        ],
      },
      { title: "Grids", disabled: true, pending: true },
      {
        title: "Groups",
        children: [
          { title: "Item Groups", disabled: true, pending: true },
          { title: "Slide Groups", disabled: true, pending: true },
          { title: "Windows", disabled: true, pending: true },
        ],
      },
      { title: "Hover", disabled: true, pending: true },
      { title: "Icons", disabled: true, pending: true },
      { title: "Images", disabled: true, pending: true },
      { title: "Lazy", disabled: true, pending: true },
      {
        title: "Lists",
        children: [
          { title: "List", disabled: true, pending: true },
          { title: "Item Group", disabled: true, pending: true },
        ],
      },
      { title: "Menus", disabled: true, pending: true },
      { title: "Navigation Drawers", disabled: true, pending: true },
      { title: "Overlays", disabled: true, pending: true },
      { title: "Paginations", disabled: true, pending: true },
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
      { title: "Click Outside", badge: "new", disabled: true, pending: true },
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
