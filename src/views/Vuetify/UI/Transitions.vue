<template>
  <div class="vuse-content-wrapper">
    <vuse-section-definition
      :title="page"
      :breadcrumbs="breadcrumbs"
      :namespace="namespace"
      icon="slideshow"
    ></vuse-section-definition>
    <v-container fluid v-if="examples">
      <doc-page
        :namespace="namespace"
        :page="page"
        :examples="examples"
        :usage="usage"
      />
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      namespace: "Styles",
      page: "Transitions",
      examples: [
        "slide-x-transitions",
        "slide-y-transitions",
        "scroll-x-transitions",
        "scroll-y-transitions",
        "scale-transition",
        "fab-transition",
        "fade-transition",
        "expand-transition",
        "custom-origin",
        "todo",
      ],
      usage: "usage",
      breadcrumbs: [
        {
          text: "User Interface",
          disabled: false,
        },
        {
          text: "Transitions",
          disabled: true,
        },
      ],
    };
  },
  beforeDestroy() {
    this.examples = null;
    delete this.examples;
  },
};
</script>
