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
const page = "Float";

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
          component: "BaseHeading",
          properties: {
            namespace: namespace,
            page: page,
            source: "overviewHeader",
            id: "float-overview",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "overviewText1",
          },
        },
        {
          component: "ViewportBreakpoints",
          properties: {},
        },
        // Classes
        {
          component: "BaseHeading",
          properties: {
            namespace: namespace,
            page: page,
            source: "classesHeader",
            id: "float-classes",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "classesText1",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Classes",
            value: "classes",
          },
        },
        // Responsive
        {
          component: "BaseHeading",
          properties: {
            namespace: namespace,
            page: page,
            source: "responsiveHeader",
            id: "float-resposive",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "responsiveText1",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Responsive",
            value: "responsive",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "responsiveText2",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "responsiveClasses",
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
