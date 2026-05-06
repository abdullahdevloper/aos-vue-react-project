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
        usage="usage"
      />
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      namespace: "Components",
      page: "BottomNavigation",
      examples: [
        "simple/color",
        "simple/grow",
        "simple/horizontal",
        "simple/shift",
        "simple/toggle",
        "intermediate/hide-on-scroll",
        "intermediate/scroll-threshold",
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
          text: "Bottom Navigations",
          disabled: true,
        },
      ],
    };
  },
};
</script>
