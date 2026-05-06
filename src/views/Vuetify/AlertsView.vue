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
      page: "Alerts",
      examples: [
        "simple/type",
        "simple/border",
        "simple/colored-border",
        "simple/dense",
        "simple/dismissible",
        "simple/icon",
        "simple/outlined",
        "simple/prominent",
        "simple/text",
        "simple/transition",
        "complex/twitter",
      ],
      usage: {
        booleans: ["dismissible"],
        sliders: ["elevation"],
        tabs: ["normal", "dense", "prominent", "outlined", "text", "tile"],
        selects: [
          {
            prop: "border",
            label: "Border",
            attrs: {
              items: ["top", "right", "left", "bottom"],
            },
          },
          {
            prop: "color",
            label: "Color",
            attrs: {
              items: ["red", "orange", "yellow", "green", "blue", "purple"],
            },
          },
          {
            prop: "icon",
            label: "Icon",
            attrs: {
              items: ["mdi-vuetify", "mdi-account"],
            },
          },
          {
            prop: "type",
            label: "Type",
            attrs: {
              items: ["success", "info", "warning", "error"],
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
          text: "Alerts",
          disabled: true,
        },
      ],
    };
  },
};
</script>
