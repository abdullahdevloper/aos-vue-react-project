<template>
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
</template>

<script>
import ViewportBreakpoints from "@/views/Vuetify/ViewportBreakpoints";

const namespace = "Styles";
const page = "Spacing";

export default {
  components: { ViewportBreakpoints },
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
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Playground",
            value: "playground",
          },
        },
        {
          component: "BaseHeading",
          properties: {
            namespace: namespace,
            page: page,
            source: "Generic.Pages.howItWorks",
            id: "spacing-workflow",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "howText",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "propertyText",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "properties",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "directionText",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "directions",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "sizeText",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "sizes",
          },
        },
        {
          component: "Examples",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Responsive",
            value: ["simple/horizontal", "intermediate/negative-margin"],
          },
        },
        {
          component: "BaseHeading",
          properties: {
            namespace: namespace,
            page: page,
            source: "breakpointHeader",
            id: "with-break-point",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "breakpointText",
          },
        },
        {
          component: "ViewportBreakpoints",
          properties: { class: "mb-6" },
        },
        {
          component: "BaseHeading",
          properties: {
            namespace: namespace,
            page: page,
            source: "Generic.Pages.howItWorks",
            id: "direction-workflow",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "breakpointHowText",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Responsive",
            value: "simple/breakpoint-md",
          },
        },
      ],
    };
  },
  beforeDestroy() {
    this.elements = null;
    delete this.elements;
  },
};
</script>
