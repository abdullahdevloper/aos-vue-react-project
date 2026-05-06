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
      page: "Avatars",
      examples: [
        "simple/size",
        "simple/tile",
        "intermediate/default",
        "intermediate/profile",
        "complex/advanced",
      ],
      usage: {
        booleans: ["image", "tile"],
        selects: [
          {
            prop: "color",
            label: "Colors",
            attrs: {
              items: [
                "primary",
                "accent",
                "warning lighten-2",
                "teal",
                "grey lighten-2",
              ],
            },
          },
        ],
        sliders: [
          {
            prop: "size",
            label: "Size",
            attrs: {
              min: "56",
              max: "128",
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
          text: "Avatars",
          disabled: true,
        },
      ],
    };
  },
};
</script>
