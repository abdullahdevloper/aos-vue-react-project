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
        playground="playground"
      />
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      namespace: "Components",
      page: "Textarea",
      examples: [
        "simple/icon",
        "simple/auto-grow",
        "simple/background-color",
        "simple/browser-autocomplete",
        "simple/clearable",
        "simple/counter",
        "simple/no-resize",
        "simple/rows",
        "intermediate/signup-box",
      ],
      usage: "usage",
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
          text: "Textarea",
          disabled: true,
        },
      ],
    };
  },
};
</script>
