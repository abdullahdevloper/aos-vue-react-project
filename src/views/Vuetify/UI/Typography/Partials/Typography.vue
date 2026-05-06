<template>
  <v-row>
    <v-col cols="12">
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
import FontView from "./Font";
import TypefacesView from "./Typefaces";

const namespace = "Styles";
const page = "Typography";

export default {
  components: { FontView, TypefacesView },
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
            source: "fontHeader",
            id: "font-size",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "fontText",
          },
        },
        {
          component: "FontView",
          properties: {},
        },
        {
          component: "BaseHeading",
          properties: {
            namespace: namespace,
            page: page,
            source: "Generic.Pages.examples",
            class: "mb-3",
          },
        },
        {
          component: "TypefacesView",
          properties: {},
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
