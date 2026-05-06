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
    <v-col>
      <viewport-breakpoints />
    </v-col>
    <v-col cols="12" v-if="display">
      <template v-for="(item, i) in display">
        <component
          :is="item.component"
          v-bind="item.properties"
          :key="`${i}-display-items`"
        />
      </template>
    </v-col>

    <v-col cols="12" v-if="visibility">
      <template v-for="(item, i) in visibility">
        <component
          :is="item.component"
          v-bind="item.properties"
          :key="`${i}-visibility-items`"
        />
      </template>
    </v-col>
    <v-col cols="12" v-if="displayPrint">
      <template v-for="(item, i) in displayPrint">
        <component
          :is="item.component"
          v-bind="item.properties"
          :key="`${i}-displayPrint-items`"
        />
      </template>
    </v-col>
  </v-row>
</template>

<script>
import ViewportBreakpoints from "@/views/Vuetify/ViewportBreakpoints";
import VisibilityTable from "@/views/Vuetify/VisibilityTable";

const namespace = "Styles";
const page = "Display";

export default {
  components: { ViewportBreakpoints, VisibilityTable },
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
      ],
      display: [
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "displayHeader",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "displayText",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "displayFormats",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "displayText2",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "displays",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "displayText3",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Display Inline",
            hashid: "display-inline",
            value: "display-inline",
            hideGitCodepan: false,
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Display block",
            hashid: "display-block",
            value: "display-block",
            hideGitCodepan: false,
          },
        },
      ],
      visibility: [
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "visibilityHeader",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "visibilityText",
          },
        },
        {
          component: "VisibilityTable",
          properties: {},
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Visibility",
            hashid: "visibility",
            value: "visibility",
            hideGitCodepan: false,
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "lateralDisplayText",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "conditionText",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "conditions",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "mediaText",
          },
        },
      ],
      displayPrint: [
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "printHeader",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "printText1",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "printOptions",
          },
        },
        {
          component: "BaseMarkdown",
          properties: {
            namespace: namespace,
            page: page,
            source: "printText2",
          },
        },
        {
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Print",
            hashid: "print",
            value: "print",
            hideGitCodepan: false,
          },
        },
      ],
    };
  },
  beforeDestroy() {
    this.elements = null;
    this.display = null;
    this.visibility = null;
    this.displayPrint = null;
    delete this.elements;
    delete this.display;
    delete this.visibility;
    delete this.displayPrint;
  },
};
</script>
