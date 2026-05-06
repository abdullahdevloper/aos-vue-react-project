<template>
  <v-card :max-width="maxWidth" class="neu-glow">
    <v-card-title>{{ title }}</v-card-title>
    <v-text-field
      placeholder="Search"
      hide-details
      class="mx-3 neu-input-inset"
      @input="handleInput"
      :value="searchText"
    ></v-text-field>
    <v-card-text>
      <v-list-item v-for="item in listItems" :key="item.title" class="px-0">
        <v-list-item-avatar
          v-if="item.avatar"
          v-bind="item.avatar.avatarStyle ? item.avatar.avatarStyle : {}"
        >
          <img :src="item.avatar.src" v-if="item.avatar.src" />
          <v-icon
            v-else-if="item.avatar.icon"
            v-bind="item.avatar.style ? item.avatar.style : {}"
            >{{ item.avatar.icon }}</v-icon
          >
          <span class="text-h5" v-else>{{ item.avatar.text }}</span>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action v-if="item.action">
          <v-btn
            v-if="item.action.btn"
            v-bind="item.action.style ? item.action.style : {}"
          >
            <v-icon
              v-if="item.action.btn.icon"
              v-bind="item.action.btn.style ? item.action.btn.style : {}"
              >{{ item.action.btn.icon }}</v-icon
            >
            <span v-else>{{ item.action.btn.text }}</span>
          </v-btn>
          <v-chip
            class="ma-2"
            v-else-if="item.action.chip"
            v-bind="item.action.style ? item.action.style : {}"
          >
            {{ item.action.chip }}
          </v-chip>
          <div v-else v-bind="item.action.style ? item.action.style : {}">
            {{ item.action.text }}
          </div>
        </v-list-item-action>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script>
import Fuse from "fuse.js";

export default {
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
    searchOption: {
      type: Object,
      default: () => {
        return {
          includeScore: true,
          keys: ["title", "subtitle"],
        };
      },
    },
  },
  data() {
    return {
      searchText: null,
      timeout: null,
    };
  },
  methods: {
    handleInput(value) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.searchText = value;
      }, 1200);
    },
  },
  computed: {
    listItems() {
      let result;
      if (this.searchText) {
        const fuse = new Fuse(this.list, this.searchOption);
        result = fuse.search(this.searchText);
      }
      return this.searchText
        ? Object.keys(result).map((i) => {
            return {
              ...result[i].item,
            };
          })
        : this.list;
    },
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
};
</script>
