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
      <app-alert value="warning">{{
        `${namespace}.${page}.buttonMargin`
      }}</app-alert>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      namespace: "Components",
      page: "Toolbars",
      examples: [
        "simple/prominent",
        "simple/dense",
        "simple/light-and-dark",
        "simple/variations",
        "simple/background",
        "simple/extended",
        "simple/extension-height",
        "simple/collapse",
        "intermediate/flexible-and-card",
        "intermediate/floating-with-search",
        "intermediate/contextual-action-bar",
      ],
      usage: {
        booleans: [
          "image",
          "collapse",
          "dense",
          "extended",
          "flat",
          "prominent",
          "short",
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
        selects: [
          {
            prop: "color",
            label: "Color",
            attrs: {
              items: ["primary", "orange", "yellow", "green", "blue", "purple"],
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
          text: "Toolbar",
          disabled: true,
        },
      ],
    };
  },
};
</script>
