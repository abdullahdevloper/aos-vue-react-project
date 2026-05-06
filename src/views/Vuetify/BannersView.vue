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
      />
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      namespace: "Components",
      page: "Banners",
      examples: [
        "simple/single-line",
        "simple/two-line",
        "intermediate/icon-slot",
        "intermediate/icon-event",
        "intermediate/actions-slots",
      ],
      usage: {
        booleans: ["action", "icon"],
        sliders: ["elevation"],
        tabs: ["default", "single-line", "sticky"],
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
          text: "Badge",
          disabled: true,
        },
      ],
    };
  },
};
</script>
