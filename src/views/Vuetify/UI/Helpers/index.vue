<template>
  <div class="vuse-content-wrapper">
    <vuse-section-definition
      :title="page"
      :breadcrumbs="breadcrumbs"
      icon="help"
    ></vuse-section-definition>
    <v-container fluid>
      <v-bottom-navigation
        v-model="activeSection"
        horizontal
        color="secondary"
        class="neu-glow with-radius mb-6"
        v-if="$vuetify.breakpoint.mdAndUp"
      >
        <v-btn
          :value="btnOption.value"
          v-for="(btnOption, i) in menuOptions"
          :key="`${btnOption.text}-bottomNav-${i}`"
        >
          <span>{{ btnOption.text }}</span>
        </v-btn>
      </v-bottom-navigation>
      <v-menu offset-y v-else>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" class="neu-glow" text color="secondary">
            <v-icon left>arrow_drop_down</v-icon> {{ activeSection }}
          </v-btn>
        </template>
        <v-list class="neu-glow">
          <template v-for="(menuOption, i) in menuOptions">
            <v-divider
              :key="`${menuOption.text}-divider-${i}`"
              v-if="menuOptions.length != i && i > 0"
            ></v-divider>
            <v-list-item
              :key="`${menuOption.text}-menuOption-${i}`"
              @click="activeSection = menuOption.value"
            >
              <v-list-item-title>{{ menuOption.text }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
      <component :is="activeComponent" />
    </v-container>
  </div>
</template>
<script>
import ComponentsList from "./Partials";
export default {
  data() {
    return {
      page: "Helpers",
      breadcrumbs: [
        {
          text: "User Interface",
          disabled: false,
        },
        {
          text: "Helpers",
          disabled: true,
        },
      ],
      activeSection: "Content",
      componentsList: ComponentsList,
      menuOptions: [
        { text: "Content", value: "Content" },
        { text: "Display", value: "Display" },
        { text: "Elevation", value: "Elevation" },
        { text: "Flex", value: "Flex" },
        { text: "Float", value: "Float" },
        { text: "Spacing", value: "Spacing" },
      ],
    };
  },
  computed: {
    activeComponent() {
      return this.componentsList[this.activeSection];
    },
  },
  beforeDestroy() {
    this.componentsList = null;
    delete this.componentsList;
  },
};
</script>
