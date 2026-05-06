<template>
  <div class="vuse-content-wrapper">
    <vuse-section-definition
      :title="page"
      :breadcrumbs="breadcrumbs"
      :namespace="namespace"
    ></vuse-section-definition>
    <v-container fluid>
      <v-row>
        <v-col cols="12" v-if="elements">
          <template v-for="(item, i) in elements">
            <component
              :is="item.component"
              v-bind="item.properties"
              :key="`${i}-elements-items`"
            />
          </template>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
const namespace = "Styles";
const page = "BorderRadius";
export default {
  data() {
    return {
      namespace,
      page,
      elements: [
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "heading",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "headingText",
          },
        },

        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "roundedHeading",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "roundedText1",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "",
            value: "simple/rounded",
          },
        },
        //
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "pncHeading",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "pncText1",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "",
            value: "simple/pill-and-circle",
          },
        },
        //
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "removingHeading",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "removingText1",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "",
            value: "simple/removing",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "sidesHeading",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "sidesText1",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "",
            value: "simple/by-side",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "cornersHeading",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "cornersText1",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "",
            value: "intermediate/separately",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "customizingHeading",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "customizingText1",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "customizingText2",
          },
        },
        {
          component: "DocMarkup",
          properties: {
            lang: "sass",
            value: "sass_default_rounded_variables",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "overwriteHeading",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "overwriteText1",
          },
        },
        {
          component: "DocMarkup",
          properties: {
            lang: "sass",
            value: "sass_changing_rounded_variables",
          },
        },
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
          text: "Border Radius",
          disabled: true,
        },
      ],
    };
  },
};
</script>
