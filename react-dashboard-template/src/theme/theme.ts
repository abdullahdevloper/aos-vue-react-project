import { createTheme } from "@mui/material/styles";

export const buildTheme = (darkMode = false, rtl = false) =>
  createTheme({
    direction: rtl ? "rtl" : "ltr",
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#00838f", light: "#80deea", dark: "#006064", contrastText: "#fff" },
      secondary: { main: "#ffb74d", light: "#ffe0b2", dark: "#ef6c00", contrastText: "#fff" },
      background: {
        default: darkMode ? "#101418" : "#f4f7fa",
        paper: darkMode ? "#171d23" : "#ffffff",
      },
    },
    shape: { borderRadius: 8 },
    typography: {
      fontFamily: ["Inter", "Roboto", "Arial", "sans-serif"].join(","),
      button: { textTransform: "none", fontWeight: 700 },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: darkMode
              ? "0 14px 34px rgba(0,0,0,.35)"
              : "0 12px 30px rgba(15, 23, 42, .08)",
          },
        },
      },
    },
  });
