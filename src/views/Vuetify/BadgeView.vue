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
      page: "Badges",
      examples: [
        "simple/tabs",
        "intermediate/hover",
        "complex/dynamic",
        "complex/customization",
      ],
      usage: {
        booleans: ["dot", "overlap", "icon", "left", "bottom"],
        tabs: ["default", "hidden", "text", "inline", "bordered"],
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
          text: "Badge",
          disabled: true,
        },
      ],
    };
  },
};
</script>
