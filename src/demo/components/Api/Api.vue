<template>
  <section>
    <base-heading id="api">{{ computedHeading }}</base-heading>

    <base-markdown>Generic.Pages.apiText</base-markdown>

    <doc-api-items :lang="lang" :value="value" />
  </section>
</template>

<script>
import DocApiItems from "@/demo/components/Api/ApiItems";

export default {
  name: "DocApi",

  props: {
    lang: {
      type: String,
      default: "",
    },
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
  },

  computed: {
    computedHeading() {
      const title = `${this.namespace}.${this.page}.apiHeading`;

      return this.$te(title, "en") ? "apiHeading" : "Generic.Pages.api";
    },
  },
  components: { DocApiItems },
};
</script>
