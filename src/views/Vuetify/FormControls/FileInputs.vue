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
      page: "FileInputs",
      examples: [
        "simple/multiple",
        "simple/accept",
        "simple/chips",
        "simple/size",
        "simple/counter",
        "simple/custom-icon",
        "simple/dense",
        "intermediate/selection",
        "intermediate/validation",
        "complex/advanced",
      ],

      usage: {
        booleans: ["chips", "counter", "disabled", "show-size"],
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
          text: "File Inputs",
          disabled: true,
        },
      ],
    };
  },
};
</script>
