<template>
  <div class="vuse-content-wrapper">
    <vuse-section-definition
      :title="page"
      :breadcrumbs="breadcrumbs"
      icon="collections"
    ></vuse-section-definition>
    <v-container fluid>
      <v-row v-if="icons">
        <v-col cols="12">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            solo
            label="Search"
            single-line
            class="neu-input"
            flat
            hide-details
          />
        </v-col>
        <v-col
          v-for="icon in filteredItems"
          :key="icon.id"
          lg="2"
          md="4"
          sm="6"
          cols="12"
        >
          <v-card
            flat
            class="text-xs-center"
            color="neu-glow d-flex justify-center flex-column text-center"
            height="150"
          >
            <v-icon v-text="icon.id" large class="pt-3"></v-icon>
            <v-card-text v-text="icon.id"></v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import GoogleIcons from "@/data/json/google-material-icons.json";

export default {
  data() {
    return {
      page: "Icons",
      breadcrumbs: [
        {
          text: "User Interface",
          disabled: false,
        },
        {
          text: "Google Material Icons",
          disabled: true,
        },
      ],
      search: "",
      icons: GoogleIcons,
    };
  },
  computed: {
    filteredItems() {
      const searchRegex = new RegExp(this.search, "i");
      return this.icons.filter(
        (event) =>
          !this.search ||
          searchRegex.test(event.keywords) ||
          searchRegex.test(event.state)
      );
    },
  },
  beforeDestroy() {
    this.icons = null;
    this.search = null;
    delete this.icons;
    delete this.search;
  },
};
</script>
