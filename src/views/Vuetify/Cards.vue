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
      page: "Cards",
      examples: [
        "simple/outlined",
        "intermediate/intermediate",
        "intermediate/info-card",
        "intermediate/media-with-text",
        "intermediate/grids",
        "complex/horizontal",
        "complex/custom-actions",
        "complex/twitter-card",
        "complex/loading",
        "complex/weather",
        "complex/advanced",
      ],
      usage: {
        booleans: [
          "disabled",
          "loading",
          "image",
          {
            prop: "subtitle",
            value: true,
          },
          {
            prop: "supportingText",
            value: true,
          },
        ],
        sliders: [
          {
            prop: "elevation",
            attrs: {
              min: 2,
              max: 24,
            },
            value: 2,
          },
        ],
        tabs: ["default", "outlined", "raised", "shaped", "tile"],
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
          text: "Cards",
          disabled: true,
        },
      ],
    };
  },
};
</script>
