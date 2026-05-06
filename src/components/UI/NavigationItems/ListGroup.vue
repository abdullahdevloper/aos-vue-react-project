<template>
  <!-- 1 -->
  <v-list-group :group="group" :prepend-icon="icon" active-class="act-menu">
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title>{{ title }}</v-list-item-title>
      </v-list-item-content>
    </template>
    <template v-for="(subitem, i) in items">
      <!-- Sub-group  -->
      <ListSubGroup
        v-if="Object.keys(subitem).includes('items')"
        v-bind="subitem"
        :key="`${i}-subitems`"
        :toBind="genChildTarget"
      />

      <v-list-item
        v-else
        :to="genChildTarget(subitem)"
        :key="i"
        :href="Object.keys(subitem).includes('href') ? subitem.href : null"
        :disabled="
          Object.keys(subitem).includes('disabled') && subItem.disabled
        "
        :target="Object.keys(subitem).includes('target') ? subItem.target : ''"
        ripple
      >
        <ItemIcon :icon="subitem.icon" :title="subitem.title" />
        <v-list-item-title v-text="subitem.title"></v-list-item-title>
        <v-badge inline :content="subitem.badge" v-if="subitem.badge"></v-badge>
      </v-list-item>
    </template>
  </v-list-group>
</template>
<script>
import { camel } from "@/utils/helpers";
import ListSubGroup from "./ListSubGroup";
import ItemIcon from "./ItemIcon";

export default {
  props: {
    group: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
    },
    component: {
      type: String,
      default: "",
    },
  },
  components: {
    ListSubGroup,
    ItemIcon,
  },
  methods: {
    genChildTarget(subItem) {
      if (Object.keys(subItem).includes("href")) return;
      if (this.component !== "") {
        return {
          name: this.component,
          params: {
            section: this.group,
            component: subItem.name,
          },
        };
      }
      // console.log({ name: `${this.group}/${camel(subItem.name)}` });
      return { name: `${this.group}/${camel(subItem.name)}` };
    },
  },
};
</script>
