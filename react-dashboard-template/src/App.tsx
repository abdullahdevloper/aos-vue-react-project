import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, type ReactNode } from "react";
import DashboardLayout from "./layouts/DashboardLayout";
import { useDashboardStore } from "./store/useDashboardStore";
import { buildTheme } from "./theme/theme";
import { DashboardPage, ListsPage, SettingsPage, WidgetsPage } from "./routes/pages";
import OperationalDashboardPage from "./pages/dashboard/OperationalDashboardPage";
import AnalyticalDashboardPage from "./pages/dashboard/AnalyticalDashboardPage";
import ChartJsPage from "./pages/ui-components/charts/ChartJsPage";
import SparkLinePage from "./pages/ui-components/charts/SparkLinePage";
import ColorsPage from "./pages/style-ui/ColorsPage";
import IconsPage from "./pages/style-ui/IconsPage";
import HelpersPage from "./pages/style-ui/HelpersPage";
import BorderRadiusPage from "./pages/style-ui/BorderRadiusPage";
import TextTypographyPage from "./pages/style-ui/TextTypographyPage";
import TransitionsPage from "./pages/style-ui/TransitionsPage";
import ScrollPage from "./pages/style-ui/ScrollPage";
import FormsPage from "./pages/style-ui/FormsPage";
import CardsPage from "./pages/ui-components/widgets/CardsPage";
import ListsWidgetsPage from "./pages/ui-components/widgets/ListsPage";
import StatisticPage from "./pages/ui-components/widgets/StatisticPage";
import AnalyticalPage from "./pages/ui-components/widgets/AnalyticalPage";
import DocumentCardsPage from "./pages/ui-components/widgets/DocumentCardsPage";
import ApiExplorerPage from "./pages/ui-components/vuetify/ApiExplorerPage";
import AlertsPage from "./pages/ui-components/vuetify/AlertsPage";
import AvatarsPage from "./pages/ui-components/vuetify/AvatarsPage";
import BadgesPage from "./pages/ui-components/vuetify/BadgesPage";
import BannersPage from "./pages/ui-components/vuetify/BannersPage";
import AppBarsPage from "./pages/ui-components/vuetify/AppBarsPage";
import ToolbarPage from "./pages/ui-components/vuetify/ToolbarPage";
import SystemBarsPage from "./pages/ui-components/vuetify/SystemBarsPage";
import BottomNavigationPage from "./pages/ui-components/vuetify/BottomNavigationPage";
import BottomSheetsPage from "./pages/ui-components/vuetify/BottomSheetsPage";
import BreadcrumbsPage from "./pages/ui-components/vuetify/BreadcrumbsPage";
import ButtonsPage from "./pages/ui-components/vuetify/ButtonsPage";
import FloatingActionButtonsPage from "./pages/ui-components/vuetify/FloatingActionButtonsPage";
import ButtonGroupsPage from "./pages/ui-components/vuetify/ButtonGroupsPage";
import CalendarsPage from "./pages/ui-components/vuetify/CalendarsPage";
import CardsVuetifyPage from "./pages/ui-components/vuetify/CardsPage";
import CarouselsPage from "./pages/ui-components/vuetify/CarouselsPage";
import ChipsPage from "./pages/ui-components/vuetify/ChipsPage";
import ChipGroupsPage from "./pages/ui-components/vuetify/ChipGroupsPage";
import DialogsPage from "./pages/ui-components/vuetify/DialogsPage";
import DividersPage from "./pages/ui-components/vuetify/DividersPage";
import ExpansionPanelsPage from "./pages/ui-components/vuetify/ExpansionPanelsPage";
import FootersPage from "./pages/ui-components/vuetify/FootersPage";
import AutocompletesPage from "./pages/ui-components/vuetify/AutocompletesPage";
import ComboboxPage from "./pages/ui-components/vuetify/ComboboxPage";
import FileInputsPage from "./pages/ui-components/vuetify/FileInputsPage";
import VuetifyFormsPage from "./pages/ui-components/vuetify/VuetifyFormsPage";
import InputsPage from "./pages/ui-components/vuetify/InputsPage";
import OverflowButtonsPage from "./pages/ui-components/vuetify/OverflowButtonsPage";
import SelectsPage from "./pages/ui-components/vuetify/SelectsPage";
import SelectionControlsPage from "./pages/ui-components/vuetify/SelectionControlsPage";
import SlidersPage from "./pages/ui-components/vuetify/SlidersPage";
import TextareasPage from "./pages/ui-components/vuetify/TextareasPage";
import TextfieldsPage from "./pages/ui-components/vuetify/TextfieldsPage";
import GridsPage from "./pages/ui-components/vuetify/GridsPage";
import ItemGroupsPage from "./pages/ui-components/vuetify/ItemGroupsPage";
import SlideGroupsPage from "./pages/ui-components/vuetify/SlideGroupsPage";
import WindowsPage from "./pages/ui-components/vuetify/WindowsPage";
import HoverPage from "./pages/ui-components/vuetify/HoverPage";
import VuetifyIconsPage from "./pages/ui-components/vuetify/VuetifyIconsPage";
import ImagesPage from "./pages/ui-components/vuetify/ImagesPage";
import LazyPage from "./pages/ui-components/vuetify/LazyPage";
import ListsVuetifyPage from "./pages/ui-components/vuetify/ListsVuetifyPage";
import ListItemGroupsPage from "./pages/ui-components/vuetify/ListItemGroupsPage";
import MenusPage from "./pages/ui-components/vuetify/MenusPage";
import NavigationDrawersPage from "./pages/ui-components/vuetify/NavigationDrawersPage";
import OverlaysPage from "./pages/ui-components/vuetify/OverlaysPage";
import PaginationsPage from "./pages/ui-components/vuetify/PaginationsPage";
import ParallaxPage from "./pages/ui-components/vuetify/ParallaxPage";
import ColorPickersPage from "./pages/ui-components/vuetify/ColorPickersPage";
import DatePickersPage from "./pages/ui-components/vuetify/DatePickersPage";
import TimePickersPage from "./pages/ui-components/vuetify/TimePickersPage";
import ProgressCircularPage from "./pages/ui-components/vuetify/ProgressCircularPage";
import ProgressLinearPage from "./pages/ui-components/vuetify/ProgressLinearPage";
import RatingsPage from "./pages/ui-components/vuetify/RatingsPage";
import SheetsPage from "./pages/ui-components/vuetify/SheetsPage";
import SkeletonLoadersPage from "./pages/ui-components/vuetify/SkeletonLoadersPage";
import SnackbarsPage from "./pages/ui-components/vuetify/SnackbarsPage";
import SteppersPage from "./pages/ui-components/vuetify/SteppersPage";
import SubheadersPage from "./pages/ui-components/vuetify/SubheadersPage";
import Error404Page from "./pages/pages/Error404Page";
import Error500Page from "./pages/pages/Error500Page";
import ProfilePage from "./pages/pages/ProfilePage";
import ComingSoonPage from "./pages/pages/ComingSoonPage";
import MaintenancePage from "./pages/pages/MaintenancePage";
import LoginPage from "./pages/pages/auth/LoginPage";
import SignupPage from "./pages/pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/pages/auth/ForgotPasswordPage";
import LockScreenPage from "./pages/pages/auth/LockScreenPage";
import ContactsPage from "./pages/app/ContactsPage";
import ChatPage from "./pages/app/ChatPage";
import ClickOutsidePage from "./pages/directives/ClickOutsidePage";

export default function App() {
  const darkMode = useDashboardStore((state) => state.darkMode);
  const rtl = useDashboardStore((state) => state.rtl);
  const primaryColor = useDashboardStore((state) => state.primaryColor);
  const secondaryColor = useDashboardStore((state) => state.secondaryColor);
  const theme = buildTheme(darkMode, rtl, primaryColor, secondaryColor);

  useEffect(() => {
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }, [rtl]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/operational" replace />} />
          <Route path="/dashboard/operational" element={<DashboardRoute><OperationalDashboardPage /></DashboardRoute>} />
          <Route path="/dashboard/analytical" element={<DashboardRoute><AnalyticalDashboardPage /></DashboardRoute>} />
          <Route path="/app/contacts" element={<DashboardRoute><ContactsPage /></DashboardRoute>} />
          <Route path="/app/chat" element={<DashboardRoute><ChatPage /></DashboardRoute>} />
          <Route path="/charts" element={<DashboardRoute><Navigate to="/charts/chartjs" replace /></DashboardRoute>} />
          <Route path="/colors" element={<DashboardRoute><ColorsPage /></DashboardRoute>} />
          <Route path="/icons" element={<DashboardRoute><IconsPage /></DashboardRoute>} />
          <Route path="/helpers" element={<DashboardRoute><HelpersPage /></DashboardRoute>} />
          <Route path="/border-radius" element={<DashboardRoute><BorderRadiusPage /></DashboardRoute>} />
          <Route path="/text-typography" element={<DashboardRoute><TextTypographyPage /></DashboardRoute>} />
          <Route path="/transitions" element={<DashboardRoute><TransitionsPage /></DashboardRoute>} />
          <Route path="/scroll" element={<DashboardRoute><ScrollPage /></DashboardRoute>} />
          <Route path="/forms" element={<DashboardRoute><FormsPage /></DashboardRoute>} />
          <Route path="/charts/chartjs" element={<DashboardRoute><ChartJsPage /></DashboardRoute>} />
          <Route path="/charts/spark-line" element={<DashboardRoute><SparkLinePage /></DashboardRoute>} />
          <Route path="/widgets/card" element={<DashboardRoute><CardsPage /></DashboardRoute>} />
          <Route path="/widgets/lists" element={<DashboardRoute><ListsWidgetsPage /></DashboardRoute>} />
          <Route path="/widgets/statistic" element={<DashboardRoute><StatisticPage /></DashboardRoute>} />
          <Route path="/widgets/analytical" element={<DashboardRoute><AnalyticalPage /></DashboardRoute>} />
          <Route path="/widgets/document-cards" element={<DashboardRoute><DocumentCardsPage /></DashboardRoute>} />
          <Route path="/components/vuetify/api-explorer" element={<DashboardRoute><ApiExplorerPage /></DashboardRoute>} />
          <Route path="/components/alerts" element={<DashboardRoute><AlertsPage /></DashboardRoute>} />
          <Route path="/components/avatars" element={<DashboardRoute><AvatarsPage /></DashboardRoute>} />
          <Route path="/components/badge" element={<DashboardRoute><BadgesPage /></DashboardRoute>} />
          <Route path="/components/banners" element={<DashboardRoute><BannersPage /></DashboardRoute>} />
          <Route path="/components/bars/app-bars" element={<DashboardRoute><AppBarsPage /></DashboardRoute>} />
          <Route path="/components/bars/toolbar" element={<DashboardRoute><ToolbarPage /></DashboardRoute>} />
          <Route path="/components/bars/system-bar" element={<DashboardRoute><SystemBarsPage /></DashboardRoute>} />
          <Route path="/components/bottom-navigation" element={<DashboardRoute><BottomNavigationPage /></DashboardRoute>} />
          <Route path="/components/bottom-sheets" element={<DashboardRoute><BottomSheetsPage /></DashboardRoute>} />
          <Route path="/components/breadcrumbs" element={<DashboardRoute><BreadcrumbsPage /></DashboardRoute>} />
          <Route path="/components/buttons" element={<DashboardRoute><ButtonsPage /></DashboardRoute>} />
          <Route path="/components/buttons/floating-action-buttons" element={<DashboardRoute><FloatingActionButtonsPage /></DashboardRoute>} />
          <Route path="/components/buttons/button-groups" element={<DashboardRoute><ButtonGroupsPage /></DashboardRoute>} />
          <Route path="/components/calendars" element={<DashboardRoute><CalendarsPage /></DashboardRoute>} />
          <Route path="/components/cards" element={<DashboardRoute><CardsVuetifyPage /></DashboardRoute>} />
          <Route path="/components/carousels" element={<DashboardRoute><CarouselsPage /></DashboardRoute>} />
          <Route path="/components/chips" element={<DashboardRoute><ChipsPage /></DashboardRoute>} />
          <Route path="/components/chips/chip-groups" element={<DashboardRoute><ChipGroupsPage /></DashboardRoute>} />
          <Route path="/components/dialogs" element={<DashboardRoute><DialogsPage /></DashboardRoute>} />
          <Route path="/components/dividers" element={<DashboardRoute><DividersPage /></DashboardRoute>} />
          <Route path="/components/expansion-panels" element={<DashboardRoute><ExpansionPanelsPage /></DashboardRoute>} />
          <Route path="/components/footer" element={<DashboardRoute><FootersPage /></DashboardRoute>} />
          <Route path="/components/forms-control/autocompletes" element={<DashboardRoute><AutocompletesPage /></DashboardRoute>} />
          <Route path="/components/forms-control/combobox" element={<DashboardRoute><ComboboxPage /></DashboardRoute>} />
          <Route path="/components/forms-control/file-inputs" element={<DashboardRoute><FileInputsPage /></DashboardRoute>} />
          <Route path="/components/forms-control/forms" element={<DashboardRoute><VuetifyFormsPage /></DashboardRoute>} />
          <Route path="/components/forms-control/inputs" element={<DashboardRoute><InputsPage /></DashboardRoute>} />
          <Route path="/components/forms-control/overflow-btns" element={<DashboardRoute><OverflowButtonsPage /></DashboardRoute>} />
          <Route path="/components/forms-control/selects" element={<DashboardRoute><SelectsPage /></DashboardRoute>} />
          <Route path="/components/forms-control/selection-controls" element={<DashboardRoute><SelectionControlsPage /></DashboardRoute>} />
          <Route path="/components/forms-control/sliders" element={<DashboardRoute><SlidersPage /></DashboardRoute>} />
          <Route path="/components/forms-control/textarea" element={<DashboardRoute><TextareasPage /></DashboardRoute>} />
          <Route path="/components/forms-control/text-fields" element={<DashboardRoute><TextfieldsPage /></DashboardRoute>} />
          <Route path="/components/grids" element={<DashboardRoute><GridsPage /></DashboardRoute>} />
          <Route path="/components/groups/item-groups" element={<DashboardRoute><ItemGroupsPage /></DashboardRoute>} />
          <Route path="/components/groups/slide-groups" element={<DashboardRoute><SlideGroupsPage /></DashboardRoute>} />
          <Route path="/components/groups/windows" element={<DashboardRoute><WindowsPage /></DashboardRoute>} />
          <Route path="/components/hover" element={<DashboardRoute><HoverPage /></DashboardRoute>} />
          <Route path="/components/icons" element={<DashboardRoute><VuetifyIconsPage /></DashboardRoute>} />
          <Route path="/components/images" element={<DashboardRoute><ImagesPage /></DashboardRoute>} />
          <Route path="/components/lazy" element={<DashboardRoute><LazyPage /></DashboardRoute>} />
          <Route path="/components/lists" element={<DashboardRoute><ListsVuetifyPage /></DashboardRoute>} />
          <Route path="/components/lists/item-groups" element={<DashboardRoute><ListItemGroupsPage /></DashboardRoute>} />
          <Route path="/components/menus" element={<DashboardRoute><MenusPage /></DashboardRoute>} />
          <Route path="/components/navigation-drawers" element={<DashboardRoute><NavigationDrawersPage /></DashboardRoute>} />
          <Route path="/components/overlays" element={<DashboardRoute><OverlaysPage /></DashboardRoute>} />
          <Route path="/components/paginations" element={<DashboardRoute><PaginationsPage /></DashboardRoute>} />
          <Route path="/components/parallax" element={<DashboardRoute><ParallaxPage /></DashboardRoute>} />
          <Route path="/components/pickers/color-pickers" element={<DashboardRoute><ColorPickersPage /></DashboardRoute>} />
          <Route path="/components/pickers/date-pickers" element={<DashboardRoute><DatePickersPage /></DashboardRoute>} />
          <Route path="/components/pickers/time-pickers" element={<DashboardRoute><TimePickersPage /></DashboardRoute>} />
          <Route path="/components/progress/progress-circular" element={<DashboardRoute><ProgressCircularPage /></DashboardRoute>} />
          <Route path="/components/progress/progress-linear" element={<DashboardRoute><ProgressLinearPage /></DashboardRoute>} />
          <Route path="/components/ratings" element={<DashboardRoute><RatingsPage /></DashboardRoute>} />
          <Route path="/components/sheets" element={<DashboardRoute><SheetsPage /></DashboardRoute>} />
          <Route path="/components/skeleton-loaders" element={<DashboardRoute><SkeletonLoadersPage /></DashboardRoute>} />
          <Route path="/components/snackbars" element={<DashboardRoute><SnackbarsPage /></DashboardRoute>} />
          <Route path="/components/steppers" element={<DashboardRoute><SteppersPage /></DashboardRoute>} />
          <Route path="/components/subheaders" element={<DashboardRoute><SubheadersPage /></DashboardRoute>} />
          <Route path="/directives/click-outside" element={<DashboardRoute><ClickOutsidePage /></DashboardRoute>} />
          <Route path="/prototype-dashboard" element={<DashboardRoute><DashboardPage /></DashboardRoute>} />
          <Route path="/widgets" element={<DashboardRoute><WidgetsPage /></DashboardRoute>} />
          <Route path="/lists" element={<DashboardRoute><ListsPage /></DashboardRoute>} />
          <Route path="/settings" element={<DashboardRoute><SettingsPage /></DashboardRoute>} />
          <Route path="/pages/profile" element={<DashboardRoute><ProfilePage /></DashboardRoute>} />
          <Route path="/pages/coming-soon" element={<ComingSoonPage />} />
          <Route path="/pages/under-maintenance" element={<MaintenancePage />} />
          <Route path="/pages/error/404" element={<Error404Page />} />
          <Route path="/pages/error/500" element={<Error500Page />} />
          <Route path="/pages/authentication/login" element={<LoginPage />} />
          <Route path="/pages/authentication/signup" element={<SignupPage />} />
          <Route path="/pages/authentication/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/pages/authentication/lock-screen" element={<LockScreenPage />} />
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function DashboardRoute({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
