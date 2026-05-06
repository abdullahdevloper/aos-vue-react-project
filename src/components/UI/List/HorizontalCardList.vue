<template>
  <v-sheet class="neu-glow-inset mb-5" :max-width="maxWidth">
    <v-toolbar flat :color="toolbar.color">
      <v-btn
        icon
        :color="toolbar.leftIconColor ? toolbar.leftIconColor : ''"
        v-if="toolbar.leftIcon"
      >
        <v-icon>{{ toolbar.leftIcon }}</v-icon>
      </v-btn>

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon :color="toolbar.leftIconColor ? toolbar.leftIconColor : ''">
        <v-icon>{{ toolbar.rightIcon }}</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-container v-if="items">
      <v-row dense>
        <v-col
          v-for="(item, i) in items"
          :key="`${title}-horizcardlist-${i}`"
          cols="12"
        >
          <horizontal-card v-bind="item" />
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
<script>
import { authUser } from "@/data/dummyData";
import HorizontalCard from "@/components/UI/Card/HorizontalCard";
export default {
  props: {
    maxWidth: {
      type: [String, Number],
      default: null,
    },
    toolbar: {
      type: Object,
      default: () => {
        return {
          leftIcon: null,
          rightIcon: "more_vert",
          leftIconColor: null,
          rightIconColor: null,
          color: "transparent",
        };
      },
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: null,
    },
    items: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      authUser,
    };
  },
  components: { HorizontalCard },
};
</script>
