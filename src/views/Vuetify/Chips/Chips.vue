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
      page: "Chips",
      examples: [
        "simple/colored",
        "simple/icon",
        "simple/outlined",
        "simple/label",
        "simple/sizes",
        "simple/draggable",
        "simple/filter",
        "simple/no-ripple",
        "intermediate/closable",
        "intermediate/action-chips",
        "intermediate/in-selects",
        "complex/photos",
        "complex/filtering",
        "complex/expandable",
      ],
      usage: {
        selects: [
          {
            prop: "close-icon",
            label: "Close icon",
            attrs: {
              items: ["mdi-close-outline", "mdi-close", "mdi-delete"],
            },
          },
          {
            prop: "icon",
            label: "Icon",
            attrs: {
              items: ["mdi-plus", "mdi-vuetify", "mdi-google"],
            },
          },
          {
            prop: "color",
            label: "Color",
            attrs: {
              items: ["red", "orange", "yellow", "green", "blue", "purple"],
            },
          },
        ],
        booleans: ["close", "avatar", "value"],
        tabs: ["filter", "label", "link", "outlined", "pill"],
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
          text: "Chips",
          disabled: true,
        },
      ],
    };
  },
};
</script>
