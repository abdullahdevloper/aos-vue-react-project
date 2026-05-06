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
      page: "Steppers",
      usage: "usage",
      examples: [
        "simple/editable",
        "simple/non-editable",
        "simple/optional",
        "simple/horizontal",
        "simple/vertical",
        "simple/linear",
        "simple/non-linear",
        "simple/alternate-labels",
        "simple/error",
        "simple/alternate-error",
        "simple/vertical-error",
        "intermediate/dynamic",
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
          text: "Steppers",
          disabled: true,
        },
      ],
    };
  },
};
</script>
