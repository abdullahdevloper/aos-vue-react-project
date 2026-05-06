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
      page: "Combobox",
      examples: [
        "simple/combobox-multiple",
        "simple/dense",
        "intermediate/no-data",
        "intermediate/advanced",
      ],
      alerts: [
        { value: "error", text: "Components.Combobox.objectReturnAlert" },
        { value: "warning", text: "Components.Selects.autoAlert" },
        { value: "info", text: "Components.Selects.autocompleteAlert" },
      ],
      usage: {
        booleans: [
          "hide-selected",
          "multiple",
          "persistent-hint",
          "small-chips",
          "clearable",
        ],
        selects: [
          {
            prop: "type",
            label: "Type",
            attrs: {
              items: ["filled", "outlined", "solo"],
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
          text: "Combobox",
          disabled: true,
        },
      ],
    };
  },
};
</script>
