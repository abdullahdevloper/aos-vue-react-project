<template>
  <div>
    <base-heading>Generic.Pages.functional</base-heading>
    <doc-text>{{ `${namespace}.${page}.functional.desc` }}</doc-text>
  </div>
</template>

<script>
// Utilities

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
  }
};
</script>
