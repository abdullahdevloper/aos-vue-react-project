<template>
  <div class="vuse-content-wrapper">
    <vuse-section-definition
      :title="page"
      :breadcrumbs="breadcrumbs"
      :namespace="namespace"
      icon="insert_chart_outlined"
    ></vuse-section-definition>
    <v-container fluid v-if="examples">
      <doc-page
        :namespace="namespace"
        :page="page"
        :examples="examples"
        hideGitCodepan
      />
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      namespace: "Vuse",
      page: "Chartjs",
      examples: [
        "bar/SimpleBar",
        "bar/HorizontalBar",
        "line/SimpleLine",
        "line/FilledLine",
        "PieChart",
        "DoughnutChart",
        "RadarChart",
        "PolarareaChart",
        "BubbleChart",
        "ScatterChart",
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
