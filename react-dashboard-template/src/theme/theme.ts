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
      fontFamily: ["Muli", "sans-serif"].join(","),
      h4: { fontWeight: 400, letterSpacing: ".0073529412em", lineHeight: "2.5rem" },
      h5: { fontWeight: 400, letterSpacing: 0, lineHeight: "2rem" },
      h6: { fontWeight: 600, letterSpacing: 0, lineHeight: "2rem" },
      subtitle1: { fontSize: "1rem", fontWeight: 400, lineHeight: "1.75rem", letterSpacing: ".009375em" },
      subtitle2: { fontSize: ".875rem", fontWeight: 600, lineHeight: "1.375rem", letterSpacing: ".0071428571em" },
      body1: { fontSize: "1rem", fontWeight: 400, lineHeight: "1.5rem", letterSpacing: ".03125em" },
      body2: { fontSize: ".875rem", fontWeight: 400, lineHeight: "1.25rem", letterSpacing: ".0178571429em" },
      caption: { fontSize: ".75rem", fontWeight: 400, lineHeight: "1.25rem", letterSpacing: ".0333333333em" },
      button: { fontSize: ".875rem", textTransform: "none", fontWeight: 500, lineHeight: "2.25rem", letterSpacing: ".0892857143em" },
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
