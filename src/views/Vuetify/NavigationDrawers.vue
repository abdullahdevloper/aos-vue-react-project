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
      page: "NavigationDrawers",
      usage: "usage",
      examples: [
        "simple/colored",
        "simple/permanent-floating",
        "simple/mini",
        "simple/temporary",
        "simple/right",
        "simple/expand-on-hover",
        "intermediate/background",
        "intermediate/combined",
        "complex/bottom-drawer",
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
          text: "Navigation Drawers",
          disabled: true,
        },
      ],
    };
  },
};
</script>
