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
        :alerts="alerts"
      />
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      namespace: "Components",
      page: "Selects",
      examples: [
        "simple/disabled",
        "simple/readonly",
        "simple/light",
        "simple/icons",
        "simple/multiple",
        "simple/dense",
        "simple/custom-text-and-value",
        "intermediate/menu-props",
        "intermediate/slots",
        "intermediate/selection-appearance",
      ],
      usage: "usage",
      alerts: [
        { value: "error", text: "Components.Selects.objectAlert" },
        { value: "warning", text: "Components.Selects.autoAlert" },
        { value: "info", text: "Components.Selects.autocompleteAlert" },
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
          text: "Selects",
          disabled: true,
        },
      ],
    };
  },
};
</script>
