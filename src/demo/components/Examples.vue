<template>
  <section id="examples">
    <base-heading id="examples">Generic.Pages.examples</base-heading>

    <base-markdown
      :namespace="namespace"
      :page="page"
      :lang="lang"
    >Generic.Pages.examplesText</base-markdown>

    <section
      v-for="(example, i) in examples"
      :id="example.id"
      :key="i"
    >
      <!-- <base-heading :id="example.id">{{ example.heading }}</base-heading> -->

      <!-- <doc-text>{{ example.desc }}</doc-text> -->

      <example
        :key="i"
        :namespace="namespace"
        :page="page"
        :value="value[i]"
        :desc="example.desc"
        :heading="example.heading"
        :hashid="example.id"
        :hideGitCodepan="example.hideGitCodepan"
      />

      <!-- <ad-card v-if="adIndex === i" :key="`ad-${i}`" /> -->
    </section>
  </section>
</template>

<script>
// Utilities
import kebabCase from "lodash/kebabCase";
import { mapGetters } from "vuex";

export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    namespace: {
      type: String,
      default: ""
    },
    page: {
      type: String,
      default: ""
    },
    hideGitCodepan: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapGetters({
      lang: "locale"
    }),
    examples() {
      return this.value.map(example => {
        const path = example === Object(example) ? example.file : example;
        const file = path.split("/").pop();
        const heading = `${this.namespace}.${this.page}.examples.${file}.heading`;

        return {
          heading,
          desc: `${this.namespace}.${this.page}.examples.${file}.desc`,
          id: kebabCase(this.$t(heading)),
          hideGitCodepan: this.hideGitCodepan
        };
      });
    }
  }
};
</script>
