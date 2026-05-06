<template>
  <div class="vuse-content-wrapper">
    <vuse-section-definition
      :title="page"
      :breadcrumbs="breadcrumbs"
      :namespace="namespace"
    ></vuse-section-definition>
    <v-container fluid>
      <doc-page
        :namespace="namespace"
        :page="page"
        :examples="examples"
        :usage="usage"
      />
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      namespace: "Components",
      page: "Carousels",
      examples: [
        "simple/cycle",
        "simple/custom-transition",
        "simple/custom-icons",
        "simple/hide-controls",
        "simple/hide-delimiters",
        "intermediate/model",
      ],
      usage: {
        booleans: ["show-arrows", "hide-delimiters", "cycle"],
      },
      breadcrumbs: [
        {
          text: "Components",
          disabled: false,
          to: {
            path: "/components/vuetify/api-explorer",
          },
        },
        {
          text: "Vuetify",
          disabled: false,
          to: {
            path: "/components/vuetify/api-explorer",
          },
        },
        {
          text: "Carousels",
          disabled: true,
        },
      ],
    };
  },
};
</script>
