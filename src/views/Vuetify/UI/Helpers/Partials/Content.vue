<template>
  <v-row class="mx-0">
    <v-col cols="12">
      <template v-for="(item, i) in elements">
        <component
          :is="item.component"
          v-bind="item.properties"
          :key="`${i}-elements-items`"
        />
      </template>
    </v-col>
    <v-col
      cols="12"
      v-for="example in exmaples"
      :key="example.heading"
      class="ma-0 pa-0"
    >
      <example
        :namespace="namespace"
        :page="page"
        :value="example.value"
        :heading="`${namespace}.${page}.${example.heading}`"
        :hashid="example.hashid"
        :hideGitCodepan="example.hideGitCodepan"
        v-if="exmaples"
      />
    </v-col>
  </v-row>
</template>

<script>
const namespace = "Styles";
const page = "Content";
export default {
  data() {
    return {
      namespace,
      page,
      exmaples: [
        {
          heading: "blockquoteHeader",
          hashid: "block",
          value: "block",
          hideGitCodepan: false,
        },
        {
          heading: "paragraphsHeader",
          hashid: "paragraph",
          value: "paragraph",
          hideGitCodepan: false,
        },
        {
          heading: "codeHeader",
          hashid: "code",
          value: "code",
          hideGitCodepan: false,
        },
        {
          heading: "variablesHeader",
          hashid: "variables",
          value: "variables",
          hideGitCodepan: false,
        },
        {
          heading: "userInputHeader",
          hashid: "user",
          value: "user",
          hideGitCodepan: false,
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
      ],
    };
  },
  beforeDestroy() {
    this.exmaples = null;
    this.elements = null;
    delete this.exmaples;
    delete this.elements;
  },
};
</script>
