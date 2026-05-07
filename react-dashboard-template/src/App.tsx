import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";
import DashboardLayout from "./layouts/DashboardLayout";
import { useDashboardStore } from "./store/useDashboardStore";
import { buildTheme } from "./theme/theme";
import { DashboardPage, ListsPage, SettingsPage, WidgetsPage } from "./routes/pages";
import ChartJsPage from "./pages/ui-components/charts/ChartJsPage";
import SparkLinePage from "./pages/ui-components/charts/SparkLinePage";
import CardsPage from "./pages/ui-components/widgets/CardsPage";
import ListsWidgetsPage from "./pages/ui-components/widgets/ListsPage";
import StatisticPage from "./pages/ui-components/widgets/StatisticPage";
import AnalyticalPage from "./pages/ui-components/widgets/AnalyticalPage";
import DocumentCardsPage from "./pages/ui-components/widgets/DocumentCardsPage";
import ApiExplorerPage from "./pages/ui-components/vuetify/ApiExplorerPage";
import AlertsPage from "./pages/ui-components/vuetify/AlertsPage";
import AvatarsPage from "./pages/ui-components/vuetify/AvatarsPage";
import BadgesPage from "./pages/ui-components/vuetify/BadgesPage";
import Error404Page from "./pages/pages/Error404Page";
import Error500Page from "./pages/pages/Error500Page";

export default function App() {
  const darkMode = useDashboardStore((state) => state.darkMode);
  const rtl = useDashboardStore((state) => state.rtl);
  const theme = buildTheme(darkMode, rtl);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardRoute><Navigate to="/charts/chartjs" replace /></DashboardRoute>} />
          <Route path="/dashboard/operational" element={<DashboardRoute><Navigate to="/charts/chartjs" replace /></DashboardRoute>} />
          <Route path="/charts" element={<DashboardRoute><Navigate to="/charts/chartjs" replace /></DashboardRoute>} />
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
          <Route path="/prototype-dashboard" element={<DashboardRoute><DashboardPage /></DashboardRoute>} />
          <Route path="/widgets" element={<DashboardRoute><WidgetsPage /></DashboardRoute>} />
          <Route path="/lists" element={<DashboardRoute><ListsPage /></DashboardRoute>} />
          <Route path="/settings" element={<DashboardRoute><SettingsPage /></DashboardRoute>} />
          <Route path="/pages/error/404" element={<Error404Page />} />
          <Route path="/pages/error/500" element={<Error500Page />} />
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function DashboardRoute({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
