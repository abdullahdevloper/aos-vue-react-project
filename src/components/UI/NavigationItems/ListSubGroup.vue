<template>
  <!-- 2 -->
  <v-list-group :group="group">
    <template v-slot:activator>
      <ItemIcon :icon="icon" :title="title" />
      {{
        /**
          * TODO: Put margin-left: {x}px
         */
      }}
      <v-list-item-content>
        <v-list-item-title>{{ title }}</v-list-item-title>
      </v-list-item-content>
    </template>

    <v-list-item
      v-for="(subitem, i) in items"
      :key="i"
      :to="toBind(subitem)"
      ripple
      :exact="subitem.exact"
    >
      <ItemIcon :icon="subitem.icon" :title="subitem.title" />
      <v-list-item-title v-text="subitem.title"></v-list-item-title>
      <v-badge inline :content="subitem.badge" v-if="subitem.badge"></v-badge>
    </v-list-item>
  </v-list-group>
</template>

<script>
import ItemIcon from "./ItemIcon";

export default {
  props: {
    group: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
    },
    toBind: {
      type: Function,
    },
  },
  components: {
    ItemIcon,
  },
};
</script>
