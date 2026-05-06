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
const page = "Text";

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
        // Text alignment
        {
          component: "BaseHeading",
          properties: {
            namespace: namespace,
            page: page,
            source: "alignmentHeader",
            id: "text-aligment",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "alignmentText1",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Align Justify",
            value: "align-justify",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "alignmentText2",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Align All",
            value: "align-all",
          },
        },
        // text-wrapping-and-overflow
        {
          component: "BaseHeading",
          properties: {
            namespace: namespace,
            page: page,
            source: "overflowHeader",
            id: "text-wrapping-and-overflow",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "overflowText1",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "No Wrap",
            value: "no-wrap",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "overflowText2",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Truncate",
            value: "truncate",
          },
        },
        // Text transform
        {
          component: "BaseHeading",
          properties: {
            namespace: namespace,
            page: page,
            source: "transformHeader",
            id: "text-transform",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "transformText1",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Transform",
            value: "transform",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "transformText2",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Break",
            value: "break",
          },
        },
        // Font weights and italics
        {
          component: "BaseHeading",
          properties: {
            namespace: namespace,
            page: page,
            source: "weightsHeader",
            id: "font-weights-and-italics",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "weightsText1",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Weights",
            value: "weights",
          },
        },
        // Text opacity
        {
          component: "BaseHeading",
          properties: {
            namespace: namespace,
            page: page,
            source: "opacityHeader",
            id: "text-opacity",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "opacityText1",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "opacity",
            value: "opacity",
          },
        },
        // RTL Alignment
        {
          component: "BaseHeading",
          properties: {
            namespace: namespace,
            page: page,
            source: "rtlHeader",
            id: "rtl-alignment",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "rtlText1",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "RTL",
            value: "rtl",
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
