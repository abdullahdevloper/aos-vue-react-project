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
      <app-alert value="warning">Components.Toolbars.buttonMargin</app-alert>
      <functional value="functional" :namespace="namespace" :page="page" />
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      namespace: "Components",
      page: "AppBars",
      examples: [
        "simple/dense",
        "simple/prominent",
        "simple/img",
        "simple/hide",
        "simple/collapse",
        "simple/elevate-on-scroll",
        "simple/inverted-scroll",
        "intermediate/app-bar-nav",
        "intermediate/scroll-threshold",
        "complex/img-fade",
        "complex/menu",
      ],
      usage: {
        booleans: [
          "image",
          "collapse-on-scroll",
          "dense",
          "flat",
          "hide-on-scroll",
          "inverted-scroll",
          "prominent",
        ],
        selects: [
          {
            prop: "color",
            label: "Color",
            attrs: {
              items: ["primary", "orange", "yellow", "green", "blue", "purple"],
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
          text: "AppBars",
          disabled: true,
        },
      ],
    };
  },
};
</script>
