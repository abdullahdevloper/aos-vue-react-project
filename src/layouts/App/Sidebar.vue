<template>
  <v-navigation-drawer
    app
    width="280"
    id="app-drawer"
    v-model="drawer"
    enable-resize-watcher
    floating
    mini-variant-width="80"
    class="vuse-sidebar"
    :mini-variant="isMinSideNav"
    :expand-on-hover="isMinSideNav"
    :left="!isSidenavPostionRight"
    :right="isSidenavPostionRight"
    :clipped="isClippedOver"
    :dark="semidark"
    :class="!semidark ? 'neu-glow' : ''"
  >
    <!-- App Logo -->
    <v-list-item
      v-if="!isClippedOver"
      :class="{ 'logo-section': true, 'semi-dark': semidark }"
    >
      <v-list-item-avatar tile>
        <vuse-logo class="primary--text" size="30" :semi-dark="semidark" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="title primary--text"
          >Vuse Admin</v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>
    <v-sheet color="transparent" :height="!isClippedOver ? 75 : 15" />
    <v-list
      dense
      v-bind="{ ...activeItemStyle }"
      expand="expand"
      class="nav-drawer transparent"
      id="app-sidebar"
    >
      <template v-for="(item, i) in itm">
        <!-- 1 -->
        <ListGroup v-bind="item" :key="i" v-if="item.items" />
        <v-subheader
          v-else-if="item.header"
          class="heading-text ml-2 nav-subheader"
          :key="`${i}-item`"
          :class="{ 'mt-3': i !== 0 }"
        >
          <v-icon>more_horiz</v-icon>
          <span>
            {{ item.header }}
          </span>
        </v-subheader>
        <NavigationItem v-else :key="`si-${i}`" v-bind="item" />
      </template>
      <v-spacer class="mb-5"></v-spacer>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
import appDrawerItems from "@/config/navigation-items";
import ListGroup from "@/components/UI/NavigationItems/ListGroup";
import NavigationItem from "@/components/UI/NavigationItems/NavigationItem";
import has from "lodash/has";

export default {
  data() {
    return {
      items: appDrawerItems,
    };
  },
  computed: {
    activeItemStyle: (state) => state.activeMenuStyle,
    ...mapGetters("navigations", [
      "isVisibleSideNav",
      "isMinSideNav",
      "activeItemStyle",
      "isSidenavPostionRight",
      "isClippedOver",
    ]),
    ...mapGetters("scheme", ["semidark"]),
    activemenu() {
      return this.$vuetify.theme.activemenu;
    },
    drawer: {
      get() {
        return this.isVisibleSideNav;
      },
      set(value) {
        this.$store.dispatch("navigations/setSidenavVisibility", value);
      },
    },
    itm() {
      return this.items.map(this.addLanguagePrefix);
    },
  },
  components: {
    ListGroup,
    NavigationItem,
  },
  methods: {
    addLanguagePrefix(item) {
      const { items, ...props } = item;
      const newVal = has(props, "header")
        ? { header: this.$t(`Vuse.AppDrawer.${item.i18n}`) }
        : { title: this.$t(`Vuse.AppDrawer.${item.i18n}`) };
      const newItem = {
        ...props,
        ...newVal,
      };

      if (items) {
        newItem.items = items.map(this.addLanguagePrefix);
      }

      return newItem;
    },
  },
};
</script>
