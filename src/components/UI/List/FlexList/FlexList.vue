<template>
  <v-card :max-width="maxWidth" class="neu-glow">
    <v-card-text class="pb-0">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="pa-0">{{ title }}</v-card-title>
        <!-- Some more Options -->
        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-row>
    </v-card-text>

    <v-card-text>
      <v-row class="mx-0" align="center" justify="center">
        <template v-for="(item, i) in list">
          <list-item
            v-bind="item"
            :key="`${item.title}-flexitem-${i}`"
            :class="i < list.length - 1 ? 'mb-4' : ''"
            :align-items="alignItems"
          />
        </template>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import ListItem from "./Partials/FlexListItem";

export default {
  components: { ListItem },
  props: {
    maxWidth: {
      type: [String, Number],
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: null,
    },

    alignItems: {
      type: String,
      default: "center",
    },
  },
};
</script>
