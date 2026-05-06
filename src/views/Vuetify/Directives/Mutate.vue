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
      page: "Mutate",
      examples: ["simple/once"],
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
          text: "Mutate",
          disabled: true,
        },
      ],
    };
  },
};
</script>
