<template>
  <div class="vuse-content-wrapper">
    <vuse-section-definition
      :title="page"
      :breadcrumbs="breadcrumbs"
      icon="input"
    ></vuse-section-definition>
    <v-container fluid>
      <basic-form />
    </v-container>
  </div>
</template>

<script>
import BasicForm from "./Partials/Basic";

export default {
  data() {
    return {
      page: "Forms",
      breadcrumbs: [
        {
          text: "User Interface",
          disabled: false,
        },
        {
          text: "Forms",
          disabled: true,
        },
      ],
    };
  },
  components: { BasicForm },
};
</script>
