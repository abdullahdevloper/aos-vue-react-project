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
      page: "Lists",
      examples: [
        "simple/disabled",
        "simple/shaped",
        "simple/dense",
        "simple/flat",
        "simple/rounded",
        "intermediate/avatar-title-and-action",
        "intermediate/icon-two-lines-and-action",
        "intermediate/avatar-three-lines",
        "intermediate/avatar-subheader-title-and-action",
        "intermediate/nested",
        // "intermediate/subheadings-and-dividers",
        "intermediate/card-list",
        "intermediate/title-subtitle-actions-and-action-text",
        "intermediate/action-title-and-subtitle",
        "intermediate/expansion-lists",
        "intermediate/nav",
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
          text: "List",
          disabled: true,
        },
      ],
    };
  },
};
</script>
