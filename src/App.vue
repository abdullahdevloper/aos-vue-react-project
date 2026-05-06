<template>
  <v-app>
    <router-view name="sidebar" />
    <router-view name="header" :handleSettingsDrawer="handleSettingsDrawer" />
    <v-main class="vuse-content">
      <v-fade-transition>
        <router-view />
      </v-fade-transition>
    </v-main>
    <router-view name="footer" />
    <app-settings-drawer
      :handleDrawer="handleSettingsDrawer"
      :drawer="settingsDrawer"
    />
  </v-app>
</template>

<script>
import AppSettingsDrawer from "@/layouts/App/AppSettingsDrawer";

export default {
  data: () => {
    return {
      settingsDrawer: false,
    };
  },

  components: {
    AppSettingsDrawer,
  },
  methods: {
    handleSettingsDrawer() {
      this.settingsDrawer = !this.settingsDrawer;
    },
  },
};
</script>
