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
      page: "DatePickers",
      usage: "usage",
      examples: [
        "simple/date-colorable",
        "simple/date-allowed-dates",
        "simple/date-width",
        "simple/date-picker-date",
        "simple/date-internationalization",
        "simple/date-icons",
        "simple/date-readonly",
        "simple/date-current",
        "simple/month-light",
        "simple/month-colorable",
        "simple/month-allowed-months",
        "simple/month-multiple",
        "simple/month-width",
        "simple/month-internationalization",
        "simple/month-icons",
        "simple/month-readonly",
        "simple/month-current",
        "intermediate/date-dialog-and-menu",
        "intermediate/date-formatting",
        "intermediate/date-formatting-moment-datefns",
        "intermediate/date-multiple",
        "intermediate/date-range",
        "intermediate/date-birthday",
        "intermediate/date-events",
        "intermediate/month-dialog-and-menu",
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
          text: "Date Pickers",
          disabled: true,
        },
      ],
    };
  },
};
</script>
