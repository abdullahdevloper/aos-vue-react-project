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
      page: "Treeview",
      usage: "usage",
      examples: [
        "simple/dense",
        "simple/selected-color",
        "simple/color",
        "simple/shaped",
        "simple/rounded",
        "simple/item-disabled",
        "simple/selection-type",
        "simple/selectable",
        "simple/activatable",
        "simple/hoverable",
        "simple/open-all",
        "intermediate/file-explorer",
        "complex/human-resources",
        "complex/directory",
        "complex/hotspots",
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
          text: "Treeview",
          disabled: true,
        },
      ],
    };
  },
};
</script>
