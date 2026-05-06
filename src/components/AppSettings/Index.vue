<template>
  <v-sheet :max-width="maxWidth" class="transparent">
    <!-- Navigation -->
    <v-list-item class="fixed-item app-bg">
      <v-list-item-content>
        <v-list-item-title class="title">Theme Settings</v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon>
        <v-btn fab small class="neu-glow" @click="handleDrawer()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-list-item-icon>
    </v-list-item>
    <v-sheet height="72" />
    <!-- Visibility -->
    <v-sheet class="mx-3 mb-3 neu-glow-inset with-radius">
      <div class="pa-3 text-h6">Visibility</div>
      <v-divider></v-divider>
      <visibility />
    </v-sheet>
    <!-- Theme Builder -->
    <v-sheet class="mx-3 mb-3 neu-glow-inset with-radius">
      <div class="pa-3 text-h6">Theme Builder</div>
      <v-divider></v-divider>
      <theme />
    </v-sheet>

    <!-- Header -->
    <v-sheet class="mx-3 mb-3 neu-glow-inset with-radius">
      <div class="pa-3 text-h6">Header Setting</div>
      <v-divider></v-divider>
      <header-settings />
    </v-sheet>

    <!-- Sidebar -->
    <v-sheet class="mx-3 mb-3 neu-glow-inset with-radius">
      <div class="pa-3 text-h6">Sidebar Setting</div>
      <v-divider></v-divider>
      <sidenav-settings />
    </v-sheet>

    <!-- Footer -->
    <v-sheet class="mx-3 mb-3 neu-glow-inset with-radius">
      <div class="pa-3 text-h6">Footer Setting</div>
      <v-divider></v-divider>
      <footer-settings />
    </v-sheet>

    <!-- Language -->
    <v-sheet class="mx-3 mb-3 neu-glow-inset with-radius">
      <div class="pa-3 text-h6">Language Selection</div>
      <v-divider></v-divider>
      <language-selection />
    </v-sheet>
  </v-sheet>
</template>
<script>
import Visibility from "./Visibility";
import SidenavSettings from "./SidenavSettings";
import FooterSettings from "./FooterSettings";
import HeaderSettings from "./HeaderSettings";
import LanguageSelection from "./LanguageSelection";
import Theme from "./Theme";

export default {
  props: {
    maxWidth: {
      type: [String, Number],
      default: "",
    },
    classes: {
      type: [String, Array],
      default: "transparent",
    },
    handleDrawer: Function,
  },
  components: {
    Visibility,
    SidenavSettings,
    LanguageSelection,
    FooterSettings,
    HeaderSettings,
    Theme,
  },
};
</script>

<style scoped>
.fixed-item {
  position: fixed;
  width: 100%;
  z-index: 1;
}
</style>
