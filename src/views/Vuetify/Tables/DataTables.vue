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
      page: "DataTables",
      usage: "usage",
      examples: [
        "simple/select",
        "simple/group",
        "simple/multi-sort",
        "simple/search",
        "simple/headerless",
        "simple/loading",
        "simple/dense",
        "simple/footer-props",
        "simple/filterable-columns",
        "intermediate/slots",
        "intermediate/simple-checkbox",
        "intermediate/expand",
        "intermediate/custom-filter",
        "intermediate/customize-header",
        "intermediate/customize-rows",
        "intermediate/paginate",
        "intermediate/sort",
        "intermediate/server",
        "complex/edit-dialog",
        "complex/crud",
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
          text: "Data Tables",
          disabled: true,
        },
      ],
    };
  },
};
</script>
