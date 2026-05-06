<template>
  <div class="vuse-content-wrapper">
    <vuse-section-definition
      :title="page"
      :breadcrumbs="breadcrumbs"
      :namespace="namespace"
    ></vuse-section-definition>
    <v-container fluid>
      <doc-page :namespace="namespace" :page="page" :examples="examples" />
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      namespace: "Components",
      page: "Dividers",
      examples: [
        "simple/inset",
        "simple/vertical",
        "simple/vertical-inset",
        "intermediate/subheaders",
        "intermediate/divider-list-portrait",
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
          text: "Dividers",
          disabled: true,
        },
      ],
    };
  },
};
</script>
