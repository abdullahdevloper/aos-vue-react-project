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
      page: "Icons",
      examples: [
        "simple/md",
        "simple/font-awesome",
        "simple/color",
        "intermediate/buttons",
        "intermediate/clickable",
        "complex/mdi-svg",
      ],
      usage: {
        booleans: ["dense"],
        selects: [
          {
            prop: "icon",
            label: "Icon",
            attrs: {
              items: [
                "mdi-plus",
                "mdi-minus",
                "mdi-access-point",
                "mdi-antenna",
              ],
            },
          },
          {
            prop: "size",
            label: "Size",
            attrs: {
              items: ["x-small", "small", "medium", "large", "x-large"],
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
          text: "Icons",
          disabled: true,
        },
      ],
    };
  },
};
</script>
