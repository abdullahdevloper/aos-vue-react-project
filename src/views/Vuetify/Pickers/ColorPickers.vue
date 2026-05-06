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
      page: "ColorPickers",
      usage: {
        booleans: [
          "disabled",
          "hide-canvas",
          "hide-inputs",
          "hide-mode-switch",
          "show-swatches",
          "flat",
        ],
        selects: [
          {
            prop: "mode",
            label: "Mode",
            attrs: {
              items: ["rgba", "hsla", "hexa"],
            },
          },
        ],
        sliders: [
          {
            prop: "dot-size",
            attrs: {
              min: 0,
              max: 50,
            },
          },
          {
            prop: "swatches-max-height",
            attrs: {
              min: 100,
              max: 250,
            },
          },
        ],
      },
      examples: [
        "simple/model",
        "intermediate/swatches",
        "intermediate/inputs",
        "intermediate/canvas",
      ],
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
          text: "Color Pickers",
          disabled: true,
        },
      ],
    };
  },
};
</script>
