<template>
  <v-responsive>
    <v-row class="mx-0">
      <v-col cols="12" class="px-0">
        <section>
          <doc-text :id="page">{{ headingText }}</doc-text>
        </section>
      </v-col>
    </v-row>
    <v-row v-if="usage" class="mx-0">
      <v-col cols="12" class="px-0">
        <usage :value="usage" :namespace="namespace" :page="page"></usage>
      </v-col>
    </v-row>
    <v-row v-if="alerts.length" class="mx-0">
      <v-col
        cols="12"
        class="pa-0"
        v-for="alert in alerts"
        :key="`${alert.value}-${alert.text}`"
      >
        <app-alert :value="alert.value">{{ alert.text }}</app-alert>
      </v-col>
    </v-row>
    <v-row v-if="playground" class="mx-0">
      <v-col cols="12" class="px-0">
        <playground :value="playground" :namespace="namespace" :page="page">
        </playground>
      </v-col>
    </v-row>
    <v-row class="mx-0" v-if="examples && examples.length">
      <v-col cols="12" class="px-0">
        <examples
          :namespace="namespace"
          :page="page"
          :value="examples"
          :hideGitCodepan="hideGitCodepan"
        />
      </v-col>
    </v-row>
  </v-responsive>
</template>

<script>
import capitalize from "lodash/capitalize";
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    namespace: {
      type: String,
      default: "",
    },
    page: {
      type: String,
      default: "",
    },
    examples: {
      type: Array,
      default: () => [],
    },
    playground: {
      type: [Object, String],
      default: "",
    },
    usage: {
      type: [Object, String],
      default: undefined,
    },
    hideGitCodepan: {
      type: Boolean,
      default: false,
    },
    alerts: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    headingText() {
      return `${capitalize(this.namespace)}.${this.page}.headingText`;
    },
    heading() {
      return `${capitalize(this.namespace)}.${capitalize(this.page)}.heading`;
    },
  },
};
</script>
