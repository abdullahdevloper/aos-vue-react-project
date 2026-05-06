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
      page: "Images",
      examples: [
        "simple/contain-cover",
        "simple/max-height",
        "simple/ratio",
        "simple/placeholder",
        "intermediate/gradients",
        "intermediate/grid",
      ],
      usage: {
        booleans: ["contain"],
        sliders: [
          {
            prop: "max-width",
            attrs: {
              min: 0,
              max: 500,
            },
            value: 250,
          },
          {
            prop: "max-height",
            attrs: {
              min: 0,
              max: 300,
            },
            value: 150,
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
          text: "Images",
          disabled: true,
        },
      ],
    };
  },
};
</script>
