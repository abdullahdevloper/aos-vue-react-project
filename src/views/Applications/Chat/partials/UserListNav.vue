<template>
  <v-navigation-drawer
    hide-overlay
    :value="drawer"
    :permanent="$vuetify.breakpoint.mdAndUp"
    enable-resize-watcher
    class="flex-shrink-0 vuse-sidebar-scrollable"
    width="280"
    :stateless="$vuetify.breakpoint.smAndDown"
    v-show="drawer"
    :floating="$vuetify.breakpoint.smAndDown"
    :color="$vuetify.breakpoint.mdAndUp ? 'transparent' : ''"
    :absolute="$vuetify.breakpoint.smAndDown"
    mobile-breakpoint
  >
    <div class="vuse-sidenav-wrapper">
      <v-toolbar flat class="transparent">
        <slot />
        <v-spacer></v-spacer>
        <v-btn
          v-if="$vuetify.breakpoint.smAndDown && drawer"
          icon
          @click="onToggle()"
        >
          <v-icon>chevron_left</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list class="scrollable-content" rounded>
        <v-slide-y-transition group>
          <template v-for="(group, index) in users">
            <v-list-item
              @click="clicked(group)"
              :key="`member-${index}-${group.user.id}`"
              :class="[group.id === activeId ? 'neu-glow-inset-primary' : '']"
            >
              <v-list-item-avatar class="unset-overflow">
                <v-badge
                  avatar
                  overlap
                  bordered
                  bottom
                  :color="group.user.status.color"
                  dot
                  offset-x="10"
                  offset-y="10"
                >
                  <v-avatar size="40">
                    <v-img :src="group.user.avatar"></v-img>
                  </v-avatar>
                </v-badge>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ group.user.name }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  group.user.last_message
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action v-if="group.lastMsg && !group.lastMsg.read">
                <v-btn icon x-small>
                  <v-icon color="secondary" x-small>mdi-bell</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-slide-y-transition>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script>
import orderBy from "lodash/orderBy";

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
    clicked: Function,
    activeId: {
      type: Number,
      default: 1,
    },
    onToggle: Function,
  },
  computed: {
    users() {
      return orderBy(this.items, ["msgOn"], ["desc"]);
    },
  },
};
</script>
