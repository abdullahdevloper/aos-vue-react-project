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
      namespace: "Directives",
      page: "Intersect",
      examples: ["simple/options"],
      usage: "usage",
      breadcrumbs: [
        {
          text: "Directives",
          disabled: false,
          to: {
            path: "/directives/Intersect",
          },
        },

        {
          text: "Intersect",
          disabled: true,
        },
      ],
    };
  },
};
</script>
