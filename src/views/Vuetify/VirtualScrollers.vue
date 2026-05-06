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
        :usage="usage"
        :examples="examples"
      />
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      namespace: "Components",
      page: "VirtualScrollers",
      usage: {
        sliders: [
          {
            prop: "count",
            label: "Item Count",
            attrs: {
              min: 7000,
              max: 15000,
            },
          },
          {
            prop: "height",
            label: "Height",
            value: 200,
            attrs: {
              min: 175,
              max: 275,
            },
          },
        ],
      },
      examples: ["simple/user-directory", "advanced/benching"],
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
          text: "VirtualScrollers",
          disabled: true,
        },
      ],
    };
  },
};
</script>
