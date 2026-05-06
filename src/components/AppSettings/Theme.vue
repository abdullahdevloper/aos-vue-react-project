<template>
  <v-sheet class="transparent mx-3" max-width="200">
    <v-row justify="space-between" align="center">
      <v-col>
        <v-menu
          offset-y
          v-model="primaryColorMenu"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on }">
            <v-btn fab small class="neu-glow" v-on="on">
              <v-icon color="primary">color_lens</v-icon>
            </v-btn>
          </template>
          <vuse-color-picker
            @changed="setPrimaryColor"
            dismissible
            @closed="primaryColorMenu = false"
          />
        </v-menu>
      </v-col>
      <v-col cols="8">
        <div class="subtitle">Primary color</div>
      </v-col>
    </v-row>

    <v-row justify="space-between" align="center">
      <v-col>
        <v-menu
          offset-y
          v-model="secondaryColorMenu"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on }">
            <v-btn fab small class="neu-glow" v-on="on">
              <v-icon color="secondary">color_lens</v-icon>
            </v-btn>
          </template>
          <vuse-color-picker
            @changed="setSecondaryColor"
            dismissible
            @closed="secondaryColorMenu = false"
          />
        </v-menu>
      </v-col>
      <v-col cols="8">
        <div class="subtitle">Secondary color</div>
      </v-col>
    </v-row>

    <v-row justify="space-between" align="center">
      <v-col>
        <v-menu offset-y v-model="headerBgMenu" :close-on-content-click="false">
          <template v-slot:activator="{ on }">
            <v-btn fab small class="neu-glow" v-on="on">
              <v-icon :color="header.color">color_lens</v-icon>
            </v-btn>
          </template>
          <vuse-color-picker
            reset-neu
            @changed="handleNavTheme($event, 'setHeaderColor')"
            dismissible
            @closed="headerBgMenu = false"
          />
        </v-menu>
      </v-col>
      <v-col cols="8">
        <div class="subtitle">Header</div>
      </v-col>
    </v-row>

    <v-row justify="space-between" align="center">
      <v-col>
        <v-menu offset-y v-model="footerBgMenu" :close-on-content-click="false">
          <template v-slot:activator="{ on }">
            <v-btn fab small class="neu-glow" v-on="on">
              <v-icon :color="footer.color">color_lens</v-icon>
            </v-btn>
          </template>
          <vuse-color-picker
            @changed="handleNavTheme($event, 'setFooterColor')"
            reset-neu
            dismissible
            @closed="footerBgMenu = false"
          />
        </v-menu>
      </v-col>
      <v-col cols="8">
        <div class="subtitle">Footer</div>
      </v-col>
    </v-row>
    <div>
      <v-switch v-model="isDarkMod" label="Dark Theme"></v-switch>
      <v-switch v-model="isSemiDarkMod" label="Semi Dark Theme"></v-switch>
      <v-switch v-model="isRtl" label="RTL"></v-switch>
    </div>
  </v-sheet>
</template>
<script>
import { mapGetters } from "vuex";
import colors from "vuetify/es5/util/colors";
import VuseColorPicker from "@/components/VuseColorPicker";

export default {
  data() {
    return {
      primaryColorMenu: false,
      secondaryColorMenu: false,
      headerBgMenu: false,
      footerBgMenu: false,
    };
  },
  computed: {
    ...mapGetters("navigations", ["isClippedOver", "isInsetFooter"]),
    ...mapGetters("scheme", ["dark", "semidark", "header", "footer", "rtl"]),
    isDarkMod: {
      get() {
        return this.dark;
      },
      set(value) {
        this.$vuetify.theme.dark = value;
        this.$store.dispatch("scheme/setDarkTheme", value);
      },
    },
    isSemiDarkMod: {
      get() {
        return this.semidark;
      },
      set(value) {
        this.$store.dispatch("scheme/setSemiDarkTheme", value);
      },
    },
    isRtl: {
      get() {
        return this.rtl;
      },
      set(value) {
        this.$vuetify.rtl = value;
        this.$store.dispatch("scheme/setRtl", value);
        this.$store.dispatch("navigations/setSidenavPositionRight", value);
      },
    },
  },
  components: { VuseColorPicker },
  methods: {
    endStr(str) {
      return str[str.length - 1];
    },
    convertToClass(str) {
      const end = this.endStr(str);
      const sub = str.substr(0, str.length - 1);

      if (isNaN(parseInt(end))) return str;

      return `${sub}-${end}`;
    },
    getTextForShade(key) {
      if (
        ["white", "transparent"].includes(key) ||
        key.indexOf("light") > -1 ||
        key.indexOf("accent") > -1
      )
        return {
          hex: colors.shades.black,
          class: "black--text",
          dark: false,
          theme: "theme--light",
        };

      return {
        hex: colors.shades.white,
        class: "white--text",
        dark: true,
        theme: "theme--dark",
      };
    },
    setPrimaryColor({ base, hex, shade }) {
      const color = {
        base: hex,
        darken1: colors[base]["darken3"],
        lighten1: colors[base]["lighten3"],
      };
      const { hex: bgText } = this.getTextForShade(shade);
      this.$vuetify.theme.themes.light.primary = color;
      this.$vuetify.theme.themes.dark.primary = color;
      this.$vuetify.theme.themes.light.primaryBgText = bgText;
      this.$vuetify.theme.themes.dark.primaryBgText = bgText;
      this.$store.dispatch("scheme/setPrimaryColor", { color, bgText });
    },
    setSecondaryColor({ hex, shade }) {
      const { hex: bgText } = this.getTextForShade(shade);

      this.$vuetify.theme.themes.light.secondary = hex;
      this.$vuetify.theme.themes.dark.secondary = hex;
      this.$vuetify.theme.themes.light.secondaryBgText = bgText;
      this.$vuetify.theme.themes.dark.secondaryBgText = bgText;
      this.$store.dispatch("scheme/setSecondaryColor", { color: hex, bgText });
    },
    handleNavTheme({ hex, shade, reset }, identifier) {
      if (reset) {
        this.$store.dispatch(`scheme/${identifier}`, {
          color: "",
          classes: "neu-glow",
          dark: false,
        });
      } else {
        const { class: bgText, dark } = this.getTextForShade(shade);
        this.$store.dispatch(`scheme/${identifier}`, {
          color: `${hex}`,
          classes: bgText,
          dark,
        });
      }
    },
  },
};
</script>
