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
