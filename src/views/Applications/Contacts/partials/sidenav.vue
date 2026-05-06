<template>
  <v-navigation-drawer
    hide-overlay
    :value="drawer"
    :permanent="$vuetify.breakpoint.mdAndUp"
    enable-resize-watcher
    :temporary="$vuetify.breakpoint.smAndDown"
    class="flex-shrink-0 vuse-sidebar-scrollable"
    :stateless="$vuetify.breakpoint.smAndDown"
    v-show="drawer"
    :color="$vuetify.breakpoint.mdAndUp ? 'transparent' : ''"
    :absolute="$vuetify.breakpoint.smAndDown"
    mobile-breakpoint
  >
    <div class="vuse-sidenav-wrapper">
      <v-toolbar flat class="transparent">
        <v-avatar size="40">
          <img :src="authUser.avatar" :alt="authUser.name" />
        </v-avatar>
        <v-toolbar-title class="ml-2 text-subtitle-1">{{
          authUser.name
        }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          icon
          v-if="$vuetify.breakpoint.smAndDown && drawer"
          @click="onToggle()"
        >
          <v-icon color="grey lighten-1">chevron_left</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense rounded class="scrollable-content">
        <template v-for="(item, index) in items">
          <v-list-item
            :key="`${index}-menuitems`"
            @click="itemClicked(item)"
            :class="[item.slug === activeItem ? 'neu-glow-inset-primary' : '']"
          >
            <v-list-item-avatar class="my-0">
              <v-avatar size="40">
                <span>{{ item.title | first2Char }}</span>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { authUser } from "@/data/dummyData";
export default {
  props: {
    drawer: {
      type: Boolean,
      default: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
    itemClicked: Function,
    activeItem: {
      type: String,
      default: "all",
    },
    onToggle: Function,
  },
  data() {
    return {
      authUser,
    };
  },
};
</script>
