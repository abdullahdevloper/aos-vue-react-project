<template>
  <v-sheet class="transparent">
    <v-list-item>
      <v-list-item-action>
        <v-switch v-model="sidebar"></v-switch>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Sidebar</v-list-item-title>
        <v-list-item-subtitle>Show Sidebar
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-action>
        <v-switch v-model="header"></v-switch>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Header</v-list-item-title>
        <v-list-item-subtitle>Show Header</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-action>
        <v-switch v-model="footer"></v-switch>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Footer</v-list-item-title>
        <v-list-item-subtitle>Show footer</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

  </v-sheet>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("navigations", [
      "isVisibleSideNav",
      "isVisibleHeader",
      "isVisibleFooter"
    ]),
    sidebar: {
      get() {
        return this.isVisibleSideNav;
      },
      set(value) {
        this.$store.dispatch("navigations/setSidenavVisibility", value);
      }
    },
    header: {
      get() {
        return this.isVisibleHeader;
      },
      set(value) {
        this.$store.dispatch("navigations/setHeaderVisibility", value);
      }
    },
    footer: {
      get() {
        return this.isVisibleFooter;
      },
      set(value) {
        this.$store.dispatch("navigations/setFooterVisibility", value);
      }
    }
  }
};
</script>