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
      namespace: "Directives",
      page: "Scrolling",
      usage: "usage",
      examples: ["options", { file: "simple/self", newIn: "v2.3" }],
      breadcrumbs: [
        {
          text: "Directives",
          disabled: false,
          to: {
            path: "/directives/Intersect",
          },
        },

        {
          text: "Scrolling",
          disabled: true,
        },
      ],
    };
  },
};
</script>
