<template>
  <v-list-item
    :to="!href ? { name } : null"
    :href="href"
    :disabled="disabled"
    :target="target"
    rel="noopener"
    color="primary"
    ripple
  >
    <ItemIcon :icon="icon" :title="title" />
    <v-list-item-title v-text="title"></v-list-item-title>
    <v-badge inline :content="badge" v-if="badge"></v-badge>
  </v-list-item>
</template>

<script>
import ItemIcon from "./ItemIcon";
export default {
  props: {
    href: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    target: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
      required: true,
    },
    badge: {
      type: String,
      default: "",
      required: false,
    },
  },
  components: { ItemIcon },
};
</script>
