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
      page: "Tabs",
      usage: "usage",
      examples: [
        "simple/fixed-tabs",
        "simple/center-active",
        "simple/tab-items",
        "simple/grow",
        "simple/pagination",
        "simple/icons",
        "simple/vertical",
        "intermediate/icons-and-text",
        "intermediate/right",
        "intermediate/content",
        "intermediate/align-with-title",
        "intermediate/dynamic",
        "complex/dynamic-height",
        "complex/desktop",
        "complex/overflow-to-menu",
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
          text: "Tabs",
          disabled: true,
        },
      ],
    };
  },
};
</script>
