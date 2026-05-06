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
      page: "Autocompletes",
      examples: [
        "simple/api",
        "simple/customFilter",
        "simple/dense",
        "intermediate/slots",
        "intermediate/asynchronous",
        "intermediate/advanced",
        "complex/stateSelector",
      ],
      alerts: [
        { value: "error", text: "Components.Selects.objectAlert" },
        { value: "warning", text: "Components.Selects.autoAlert" },
        { value: "error", text: "Components.Selects.autocompleteAlert" },
      ],
      usage: {
        selects: [
          {
            prop: "filter",
            label: "Filter",
            attrs: {
              items: ["Exact Match", "Search Length > 2 & Loose Match"],
            },
          },
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
          text: "Autocompletes",
          disabled: true,
        },
      ],
    };
  },
};
</script>
