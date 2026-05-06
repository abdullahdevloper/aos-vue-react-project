<template>
  <section>
    <base-heading id="playground">Generic.Pages.playground</base-heading>
    <example
      :id="`usage-${-1}`"
      :value="internalValue"
      :namespace="namespace"
      :page="page"
    />
  </section>
</template>

<script>
// Utilities
import kebabCase from "lodash/kebabCase";

export default {
  props: {
    value: {
      type: [Object, String],
      default: undefined
    },
    namespace: {
      type: String,
      default: ""
    },
    page: {
      type: String,
      default: ""
    }
  },

  computed: {
    internalValue() {
      return this.value === Object(this.value)
        ? this.value
        : { file: this.value };
    },
    file() {
      return `${this.kebabCase(this.page)}/${this.internalValue.file}`;
    }
  },

  methods: { kebabCase }
};
</script>
