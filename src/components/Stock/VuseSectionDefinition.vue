<template>
  <v-container
    fluid
    my-0
    ma-3
    pa-0
    class="section-definition"
    :class="{ 'mt-3': this.isFloating }"
  >
    <v-toolbar flat :extended="breadcrumbs.length > 0" class="transparent">
      <v-avatar class="neu-glow with-radius" :tile="tile">
        <v-icon color="primary" v-html="icon" v-if="icon"></v-icon>
        <span class="primary--text" v-else>{{ title | first2Char }}</span>
      </v-avatar>
      <v-toolbar-title class="primary--text mx-4">{{
        sectionTitle
      }}</v-toolbar-title>
      <v-toolbar-title slot="extension" v-if="breadcrumbs.length">
        <v-breadcrumbs :items="breadcrumbs" class="pl-0">
          <v-icon slot="divider">chevron_right</v-icon>
        </v-breadcrumbs>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <slot />
    </v-toolbar>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import capitalize from "lodash/capitalize";
export default {
  name: "SectionDefinition",
  props: {
    title: String,
    breadcrumbs: {
      type: Array,
      default: () => [],
    },
    icon: String,
    tile: {
      type: Boolean,
      default: true,
    },
    namespace: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapGetters("navigations", ["isFloating"]),
    heading() {
      return this.namespace
        ? `${capitalize(this.namespace)}.${this.title}.heading`
        : this.title;
    },
    sectionTitle() {
      return this.namespace
        ? this.$t(this.heading).replace("# ", "")
        : this.heading;
    },
  },
};
</script>

<style lang="scss" scoped>
.toobar-extension {
  margin-left: 5px !important;
}

.breadcrumb-section {
  margin-left: -25px !important;
}

.action-btn {
  margin-left: 5px !important;
}
</style>
