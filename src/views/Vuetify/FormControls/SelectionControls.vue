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
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      namespace: "Components",
      page: "SelectionControls",
      examples: [
        "simple/checkboxes-boolean",
        "simple/checkboxes-array",
        "simple/checkboxes-states",
        "simple/checkboxes-colors",
        "intermediate/checkboxes-inline-textfield",
        "simple/radios-default",
        "simple/radios-direction",
        "simple/radios-colors",
        "simple/switches-boolean",
        "simple/switches-array",
        "simple/switches-states",
        "simple/switches-colors",
        "simple/switches-flat",
        "simple/switches-inset",
        "intermediate/label-slot",
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
          text: "Selection Controls",
          disabled: true,
        },
      ],
    };
  },
};
</script>
