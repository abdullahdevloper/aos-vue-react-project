// src/plugins/vuetify.js

import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/es5/util/colors";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@mdi/font/css/materialdesignicons.css";
import "font-awesome/css/font-awesome.min.css";

import store from "@/store";
import "./vuse";
import "./vuse-demo";
Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    current: store.state.translation.locale,
  },
  rtl: store.state.scheme.theme.rtl,
  theme: {
    dark: store.state.scheme.theme.dark,
    default: "light",
    disable: false,
    options: {
      cspNonce: undefined,
      customProperties: true,
      minifyTheme: undefined,
      themeCache: undefined,
    },
    themes: {
      light: {
        primary: store.state.scheme.theme.primary,
        secondary: store.state.scheme.theme.secondary.base,
        accent: colors.deepPurple.accent2,
        error: colors.red.accent4,
        info: colors.blue.lighten1,
        success: colors.green.accent4,
        warning: colors.amber.darken2,
        background: "#F2F3F7", // #ECF0F3
        neu: {
          darken1: "#DDE4EF", // rgba(210, 218, 230, 0.6)
          lighten1: "#FFFFFF", // rgba(255, 255, 255, 0.6)
        },
        primaryBgText: store.state.scheme.theme.primaryBgText,
        secondaryBgText: store.state.scheme.theme.secondaryBgText,
      },
      dark: {
        primary: store.state.scheme.theme.primary,
        secondary: store.state.scheme.theme.secondary.base,
        accent: colors.deepPurple.accent2,
        error: colors.red.accent4,
        info: colors.blue.lighten1,
        success: colors.green.accent4,
        warning: colors.amber.darken2,
        background: "#292D32",
        neu: {
          darken1: "#1d1f23", // rgba(210, 218, 230, 0.6)
          lighten1: "#3e4247", // rgba(255, 255, 255, 0.6)
        },
        primaryBgText: store.state.scheme.theme.primaryBgText,
        secondaryBgText: store.state.scheme.theme.secondaryBgText,
      },
    },
  },
});
