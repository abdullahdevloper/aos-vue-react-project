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
      page: "Hover",
      examples: [
        "simple/disabled",
        "simple/open-and-close-delay",
        "complex/hover-list",
        "complex/transition",
      ],
      usage: {
        booleans: ["value", "disabled"],
        sliders: [
          {
            prop: "open-delay",
            attrs: {
              min: 0,
              max: 1000,
            },
          },
          {
            prop: "close-delay",
            attrs: {
              min: 0,
              max: 1000,
            },
          },
        ],
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
          text: "Hover",
          disabled: true,
        },
      ],
    };
  },
};
</script>
