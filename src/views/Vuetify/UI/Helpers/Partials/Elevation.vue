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
const page = "Elevation";

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
          component: "Example",
          properties: {
            namespace: namespace,
            page: page,
            heading: "Usage",
            value: "usage",
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
          component: "Examples",
          properties: {
            namespace: namespace,
            page: page,
            value: ["simple/dynamic"],
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
