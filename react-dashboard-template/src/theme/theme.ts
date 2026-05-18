import { createTheme } from "@mui/material/styles";

export const buildTheme = (darkMode = false, rtl = false, primaryColor = "#0097a7", secondaryColor = "#ffa726") =>
  createTheme({
    direction: rtl ? "rtl" : "ltr",
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: primaryColor, light: "#80deea", dark: "#00838f", contrastText: "#fff" },
      secondary: { main: secondaryColor, light: "#ffcc80", dark: "#ef6c00", contrastText: "#fff" },
      background: {
        default: darkMode ? "#292d32" : "#f2f3f7",
        paper: darkMode ? "#292d32" : "#f2f3f7",
      },
      text: {
        primary: darkMode ? "#f6f7fb" : "#263238",
        secondary: darkMode ? "#c8d0d8" : "#6f7d85",
      },
    },
    shape: { borderRadius: 4 },
    typography: {
      fontFamily: ["Inter", "Roboto", "Arial", "sans-serif"].join(","),
      h4: { fontWeight: 500, letterSpacing: 0 },
      h6: { fontWeight: 500, letterSpacing: 0 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            backgroundImage: "none",
            boxShadow: darkMode
              ? "-4px -4px 5px rgba(255,255,255,.05), 7px 7px 7px rgba(0,0,0,.38)"
              : "-7px -7px 5px rgba(255,255,255,.85), 7px 7px 7px rgba(174, 174, 192, .32)",
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            width: 36,
            height: 36,
            borderRadius: "50%",
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          root: {
            color: primaryColor,
          },
          rail: {
            opacity: 1,
            backgroundColor: "rgba(111, 125, 133, .18)",
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            border: 0,
            borderRadius: 4,
            paddingInline: 14,
            "&.Mui-selected": {
              color: primaryColor,
              backgroundColor: "#f2f3f7",
              boxShadow: "inset -4px -4px 5px rgba(255,255,255,.85), inset 5px 5px 7px rgba(174,174,192,.32)",
            },
          },
        },
      },
    },
  });
