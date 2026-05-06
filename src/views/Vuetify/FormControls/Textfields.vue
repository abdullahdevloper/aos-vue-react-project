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
      page: "TextFields",
      examples: [
        "simple/single-line",
        "simple/shaped",
        "simple/disabled-and-readonly",
        "simple/dense",
        "simple/icon",
        "simple/clearable",
        "simple/character-counter",
        "simple/hide-details",
        "simple/password",
        "simple/box",
        "simple/solo",
        "simple/outlined",
        "simple/custom-colors",
        "simple/hint",
        "simple/prefixes-and-suffixes",
        "intermediate/icon-events",
        "intermediate/icon-slots",
        "intermediate/label-slot",
        "intermediate/validation",
        "intermediate/full-width-with-character-counter",
        "intermediate/progress-bar",
        "complex/custom-validation",
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
          text: "Textfields",
          disabled: true,
        },
      ],
    };
  },
};
</script>
