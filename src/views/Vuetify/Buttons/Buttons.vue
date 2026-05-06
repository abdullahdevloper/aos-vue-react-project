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
      page: "Buttons",
      examples: [
        "simple/text",
        "simple/raised",
        "simple/depressed",
        "simple/dropdown",
        "simple/icon",
        "simple/floating",
        "simple/sizing",
        "simple/outlined",
        "simple/rounded",
        "simple/tile",
        "simple/block",
        "intermediate/loaders",
      ],
      usage: {
        booleans: ["disabled", "loading", "block"],
        sliders: [
          {
            prop: "elevation",
            attrs: {
              min: 0,
              max: 24,
            },
            value: 2,
          },
        ],
        selects: [
          {
            prop: "color",
            label: "Colors",
            attrs: {
              items: ["deep-purple accent-4", "primary", "secondary", "accent"],
            },
          },
          {
            prop: "size",
            label: "Sizes",
            attrs: {
              items: ["x-small", "small", "large", "x-large"],
            },
          },
        ],
        tabs: [
          "raised",
          "depressed",
          "outlined",
          "rounded",
          "text",
          "fab",
          "icon",
          "tile",
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
          text: "Buttons",
          disabled: true,
        },
      ],
    };
  },
};
</script>
