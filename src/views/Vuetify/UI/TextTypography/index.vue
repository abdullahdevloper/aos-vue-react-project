<template>
  <div class="vuse-content-wrapper">
    <vuse-section-definition
      :title="page"
      :breadcrumbs="breadcrumbs"
      :namespace="namespace"
      icon="text_fields"
    ></vuse-section-definition>
    <v-container fluid>
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
    </v-container>
  </div>
</template>
<script>
const namespace = "Styles";
const page = "TextAndTypography";

export default {
  data() {
    return {
      namespace,
      page,
      breadcrumbs: [
        {
          text: "User Interface",
          disabled: false,
        },
        {
          text: "Text & Typography",
          disabled: true,
        },
      ],
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
            source: "typographyHeader",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "typographyText1",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "",
            value: "typography",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "typographyText2",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "typographyFormats",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "typographyText3",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "typographyClasses",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "typographyText4",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "",
            value: "typography-breakpoints",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "alignmentHeader",
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
            heading: "",
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
            heading: "",
            value: "align-all",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "decorationHeader",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "decorationText1",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "",
            value: {
              file: "decoration",
              newIn: "v2.3",
            },
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "overflowHeader",
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
            heading: "",
            value: {
              file: "no-wrap",
            },
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
            heading: "",
            value: "truncate",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "transformHeader",
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
            heading: "",
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
            heading: "",
            value: "break",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "weightsHeader",
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
            heading: "",
            value: "weights",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "opacityHeader",
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
            heading: "",
            value: "opacity",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "rtlHeader",
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
            heading: "",
            value: "rtl",
          },
        },
      ],
    };
  },
};
</script>
