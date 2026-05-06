<template>
  <div class="vuse-content-wrapper">
    <vuse-section-definition
      :title="page"
      :breadcrumbs="breadcrumbs"
      :namespace="namespace"
    ></vuse-section-definition>
    <v-container fluid>
      <v-responsive>
        <v-row>
          <v-col cols="12">
            <section>
              <doc-text :id="page">{{ headingText }}</doc-text>
            </section>
          </v-col>
        </v-row>
      </v-responsive>
      <ApiExplorer />
    </v-container>
  </div>
</template>

<script>
import ApiExplorer from "@/demo/components/Api/ApiExplorer";

export default {
  data() {
    return {
      namespace: "Components",
      page: "ApiExplorer",
      breadcrumbs: [
        {
          text: "Components",
          disabled: false,
        },
        {
          text: "Vuetify",
          disabled: true,
        },
      ],
    };
  },
  computed: {
    headingText() {
      return `${this.namespace}.${this.page}.headingText`;
    },
  },
  components: {
    ApiExplorer,
  },
};
</script>
