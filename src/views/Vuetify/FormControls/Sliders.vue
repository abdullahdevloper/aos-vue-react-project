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
      page: "Sliders",
      examples: [
        "simple/min-max",
        "simple/disabled",
        "simple/readonly",
        "simple/icons",
        "simple/vertical",
        "simple/thumb",
        "simple/inverse-label",
        "simple/custom-thumb",
        "simple/ticks",
        "simple/custom-colors",
        "simple/range",
        "intermediate/validation",
        "intermediate/metronome",
      ],
      usage: {
        booleans: [
          "dense",
          "disabled",
          "hide-details",
          "inverse-label",
          "readonly",
          "persistent-hint",
          "vertical",
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
          text: "Sliders",
          disabled: true,
        },
      ],
    };
  },
};
</script>
