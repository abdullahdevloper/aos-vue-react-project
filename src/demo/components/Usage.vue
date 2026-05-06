<template>
  <section>
    <base-heading id="usage">Generic.Pages.usage</base-heading>
    <doc-text v-if="typeof value !== 'string'">{{ `${namespace}.${page}.usageText` }}</doc-text>
    <example
      :id="`usage-${-1}`"
      :value="internalValue"
      :namespace="namespace"
      :page="page"
      v-if="typeof value === 'string'"
      eager
    />
    <usage-example
      v-else
      :key="`usage-${-1}`"
      :namespace="namespace"
      :page="page"
      :value="internalValue"
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
    }
  },

  methods: { kebabCase }
};
</script>
