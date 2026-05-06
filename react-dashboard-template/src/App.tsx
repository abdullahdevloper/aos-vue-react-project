import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import DashboardLayout from "./layouts/DashboardLayout";
import { useDashboardStore } from "./store/useDashboardStore";
import { buildTheme } from "./theme/theme";
import { ChartsPage, DashboardPage, ListsPage, SettingsPage, WidgetsPage } from "./routes/pages";

export default function App() {
  const darkMode = useDashboardStore((state) => state.darkMode);
  const rtl = useDashboardStore((state) => state.rtl);
  const theme = buildTheme(darkMode, rtl);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/charts" element={<ChartsPage />} />
            <Route path="/widgets" element={<WidgetsPage />} />
            <Route path="/lists" element={<ListsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
