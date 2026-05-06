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
      page: "Breadcrumbs",
      examples: [
        "simple/large",
        "simple/divider",
        "intermediate/icon-dividers",
        "intermediate/item-slot",
      ],
      usage: {
        booleans: ["customDivider", "large"],
        selects: [
          {
            prop: "divider",
            label: "Divider",
            attrs: {
              // eslint-disable-next-line no-useless-escape
              items: ["/", "\/", ".", ";", ">", "-"],
            },
          },
        ],
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
          text: "Breadcrumbs",
          disabled: true,
        },
      ],
    };
  },
};
</script>
