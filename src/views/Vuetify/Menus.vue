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
      page: "Menus",
      usage: "usage",
      examples: [
        "simple/absolute",
        "simple/menu-activator-tooltip",
        "simple/hover",
        "simple/custom-transition",
        "simple/disabled",
        "simple/offset-x",
        "simple/offset-y",
        {
          file: "simple/rounded",
          newIn: "v2.3",
        },
        "simple/close-on-click",
        "simple/close-on-content-click",
        "intermediate/absolute-without-activator",
        "intermediate/menus",
        "intermediate/popover",
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
          text: "Menus",
          disabled: true,
        },
      ],
    };
  },
};
</script>
