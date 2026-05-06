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
      <viewport-breakpoints />
    </v-container>
  </div>
</template>
<script>
import ViewportBreakpoints from "./ViewportBreakpoints";
export default {
  components: { ViewportBreakpoints },
  data() {
    return {
      namespace: "Components",
      page: "Grids",
      examples: [
        "simple/auto",
        "simple/equal",
        "simple/one-column-width",
        "intermediate/variable-content",
        "intermediate/grow-shrink",
        "intermediate/row-column-breakpoint",
        "intermediate/unique-layouts",
        "simple/vertical-alignment",
        "simple/horizontal-alignment",
        "simple/no-gutters",
        "intermediate/wrapping",
        "advanced/order",
        "advanced/order-first-last",
        "advanced/offset",
        "advanced/offset-breakpoint",
        "intermediate/margin",
        "advanced/nested-grid",
        "simple/spacer",
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
          text: "Grids",
          disabled: true,
        },
      ],
    };
  },
};
</script>
