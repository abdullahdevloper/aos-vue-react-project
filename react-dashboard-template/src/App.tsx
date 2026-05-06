import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import DashboardLayout from "./layouts/DashboardLayout";
import { useDashboardStore } from "./store/useDashboardStore";
import { buildTheme } from "./theme/theme";
import { DashboardPage, ListsPage, SettingsPage, WidgetsPage } from "./routes/pages";
import ChartJsPage from "./pages/ui-components/charts/ChartJsPage";
import SparkLinePage from "./pages/ui-components/charts/SparkLinePage";
import CardsPage from "./pages/ui-components/widgets/CardsPage";
import ListsWidgetsPage from "./pages/ui-components/widgets/ListsPage";
import StatisticPage from "./pages/ui-components/widgets/StatisticPage";

export default function App() {
  const darkMode = useDashboardStore((state) => state.darkMode);
  const rtl = useDashboardStore((state) => state.rtl);
  const theme = buildTheme(darkMode, rtl);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/charts/chartjs" replace />} />
            <Route path="/charts" element={<Navigate to="/charts/chartjs" replace />} />
            <Route path="/charts/chartjs" element={<ChartJsPage />} />
            <Route path="/charts/spark-line" element={<SparkLinePage />} />
            <Route path="/widgets/card" element={<CardsPage />} />
            <Route path="/widgets/lists" element={<ListsWidgetsPage />} />
            <Route path="/widgets/statistic" element={<StatisticPage />} />
            <Route path="/prototype-dashboard" element={<DashboardPage />} />
            <Route path="/widgets" element={<WidgetsPage />} />
            <Route path="/lists" element={<ListsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
