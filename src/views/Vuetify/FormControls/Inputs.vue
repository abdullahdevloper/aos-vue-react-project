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
      page: "Inputs",
      examples: [
        "simple/loading",
        "simple/hint",
        "simple/success",
        "simple/error",
        "simple/multi-error",
        "intermediate/rules",
        "intermediate/hide-details",
        "intermediate/slots",
        "intermediate/slot-events",
      ],
      usage: "usage",
      alerts: [{ value: "info", text: "Components.Inputs.attributesAlert" }],
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
          text: "Inputs",
          disabled: true,
        },
      ],
    };
  },
};
</script>
