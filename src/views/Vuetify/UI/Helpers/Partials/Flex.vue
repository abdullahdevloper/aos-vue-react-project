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
const namespace = "Styles";
const page = "Flex";

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
            source: "flexHeader",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "flexText1",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: `Flexbox`,
            value: "flexbox",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Flexbox Inline",
            value: "flexbox-inline",
          },
        },
        // direction
        {
          component: "BaseHeading",
          properties: {
            namespace: namespace,
            page: page,
            source: "directionHeader",
            id: "flex-direction",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "directionText1",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Flexbox Direction",
            value: "flex-direction",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "directionText2",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Flexbox Column",
            value: "flex-column",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "directionText3",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "directionList",
          },
        },
        // justify
        {
          component: "BaseHeading",
          properties: {
            namespace: namespace,
            page: page,
            source: "justifyHeader",
            id: "flex-justify",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "justifyText1",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Flexbox Justify",
            value: "flex-justify",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "justifyText2",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "justifyList",
          },
        },
        // Align
        {
          component: "BaseHeading",
          properties: {
            namespace: namespace,
            page: page,
            source: "alignHeader",
            id: "flex-align",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "alignText1",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "alignAlert1",
            class: "neu-glow-inset-primary pa-3 mb-6",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Flexbox Align",
            value: "flex-align",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "alignText2",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "alignList",
          },
        },
        // Align Self
        {
          component: "BaseHeading",
          properties: {
            namespace: namespace,
            page: page,
            source: "alignSelfHeader",
            id: "flex-align-self",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "alignSelfText1",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Flexbox Align Self",
            value: "flex-align-self",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "alignSelfText2",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "alignSelfList",
          },
        },
        // auto-margins
        {
          component: "BaseHeading",
          properties: {
            namespace: namespace,
            page: page,
            source: "marginHeader",
            id: "auto-margins",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "marginText1",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "marginAlert",
            class: "neu-glow-inset-primary pa-3 mb-6",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Margins",
            value: "margins",
          },
        },
        // auto-marginSubheader
        {
          component: "BaseHeading",
          properties: {
            namespace: namespace,
            page: page,
            source: "marginSubheader",
            id: "auto-margin-subheader",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "marginText2",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Margins Align Items",
            value: "margins-align-items",
          },
        },
        // wrap
        {
          component: "BaseHeading",
          properties: {
            namespace: namespace,
            page: page,
            source: "wrapHeader",
            id: "flex-wrap",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "wrapText1",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "wrapList1",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Flex Nowrap",
            value: "flex-nowrap",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Flex Wrap",
            value: "flex-wrap",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Flex Wrap Reverse",
            value: "flex-wrap-reverse",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "wrapText2",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "wrapList2",
          },
        },
        // Order
        {
          component: "BaseHeading",
          properties: {
            namespace: namespace,
            page: page,
            source: "orderHeader",
            id: "flex-order",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "orderText1",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Flex Order",
            value: "flex-order",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "orderText2",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "orderList",
          },
        },
        // Flex align content
        {
          component: "BaseHeading",
          properties: {
            namespace: namespace,
            page: page,
            source: "alignContentHeader",
            id: "flex-align-content",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "alignContentText1",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Align Content Start",
            value: "flex-align-content-start",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Align Content End",
            value: "flex-align-content-end",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Align Content Center",
            value: "flex-align-content-center",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Align Content Between",
            value: "flex-align-content-between",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Align Content Around",
            value: "flex-align-content-around",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "alignContentText2",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "alignContentList",
          },
        },
        // Flex Grow & Shrink
        {
          component: "BaseHeading",
          properties: {
            namespace: namespace,
            page: page,
            source: "growShrinkHeader",
            id: "flex-grow-shrink",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "growShrinkText1",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "growShrinkList1",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Grow & Shrink",
            value: "grow-shrink",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "growShrinkText2",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "growShrinkList2",
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
