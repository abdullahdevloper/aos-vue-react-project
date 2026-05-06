<template>
  <v-sheet class="neu-glow-inset mb-5">
    <v-toolbar flat color="transparent">
      <v-btn icon :color="iconColor ? iconColor : 'primary'" v-if="icon">
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
      <v-toolbar-title class="text-h6">{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text v-if="text">
      <div class="text-body-2">{{ text }}</div>
    </v-card-text>
    <div v-if="items">
      <v-list-item
        two-line
        v-for="(item, index) in items"
        :key="`${title}-twolistitem-${index}`"
      >
        <v-list-item-icon v-if="item.icon">
          <v-icon :color="item.iconColor ? item.iconColor : 'primary'">{{
            item.icon
          }}</v-icon>
        </v-list-item-icon>
        <v-list-item-avatar v-if="item.avatar">
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-sheet>
</template>
<script>
import { authUser } from "@/data/dummyData";
export default {
  props: {
    icon: {
      type: String,
      default: null,
    },
    iconColor: {
      type: String,
      default: null,
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
};
</script>
