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
      page: "OverflowBtns",
      examples: [
        "simple/counter",
        "simple/disabled",
        "simple/dense",
        "simple/editable",
        "simple/filled",
        "simple/hint",
        "simple/loading",
        "simple/menu-props",
        "simple/readonly",
        "simple/segmented",
      ],
      usage: "usage",
      alerts: [
        { value: "error", text: "Components.Selects.objectAlert" },
        { value: "warning", text: "Components.Selects.autoAlert" },
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
          text: "Overflow Buttons",
          disabled: true,
        },
      ],
    };
  },
};
</script>
