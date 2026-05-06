<template>
  <v-navigation-drawer
    :right="!isSidenavPostionRight"
    :value="drawer"
    floating
    class="neu-glow"
    stateless
    temporary
    hide-overlay
    app
    width="300"
  >
    <app-settings :handleDrawer="handleDrawer" />
  </v-navigation-drawer>
</template>
<script>
import AppSettings from "@/components/AppSettings/Index";
import { mapGetters } from "vuex";
export default {
  props: {
    handleDrawer: Function,
    drawer: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters("navigations", ["isSidenavPostionRight"]),
  },
  components: { AppSettings },
};
</script>
