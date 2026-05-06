<template>
  <div class="vuse-content-wrapper">
    <vuse-section-definition
      :title="page"
      :breadcrumbs="breadcrumbs"
      :namespace="namespace"
    ></vuse-section-definition>
    <v-container fluid v-if="examples">
      <doc-page :namespace="namespace" :page="page" :examples="examples" />
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      namespace: "Components",
      page: "Sparklines",
      examples: [
        "playground",
        "simple/fill",
        "intermediate/heart-rate",
        "intermediate/dashboard-card",
        "intermediate/sales-card",
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
          text: "SparkLine",
          disabled: true,
        },
      ],
    };
  },
  beforeDestroy() {
    this.examples = null;
    delete this.examples;
  },
};
</script>
