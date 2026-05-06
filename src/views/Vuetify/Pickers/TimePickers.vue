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
      page: "TimePickers",
      usage: "usage",
      examples: [
        "simple/colorable",
        "simple/disabled",
        "simple/readonly",
        "simple/24h-format",
        "simple/allowed-times",
        "simple/width",
        "simple/ampm-in-title",
        "simple/no-title",
        "simple/use-seconds",
        "simple/scrollable",
        "intermediate/dialog-and-menu",
        "intermediate/range",
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
          text: "Time Pickers",
          disabled: true,
        },
      ],
    };
  },
};
</script>
