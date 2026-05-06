<template>
  <v-app-bar
    app
    flat
    :clipped-left="isClippedLeft"
    :clipped-right="isClippedRight"
    v-if="isVisibleHeader"
    v-bind="bindStyle"
    :dense="isDense"
    :prominent="isProminent"
    :hide-on-scroll="isHideOnScroll"
    :shrink-on-scroll="isShrinkOnScroll"
  >
    <v-sheet
      color="transparent"
      v-if="isClippedOver || $vuetify.breakpoint.mdAndDown"
    >
      <v-list-item class="pl-0">
        <v-list-item-avatar tile>
          <vuse-logo class="primary--text" size="40" />
        </v-list-item-avatar>
        <v-list-item-content v-if="$vuetify.breakpoint.mdAndUp">
          <v-list-item-title class="title primary--text"
            >Vuse Admin</v-list-item-title
          >
        </v-list-item-content>
        <v-list-item-action v-if="$vuetify.breakpoint.lgAndUp">
          <v-btn
            @click.stop="toggleMiniVariant"
            small
            fab
            :class="!bindStyle.color ? 'neu-glow' : ''"
          >
            <v-icon
              :color="!bindStyle.color ? 'primary' : bindStyle.color"
              v-if="isMinSideNav"
              >double_arrow</v-icon
            >
            <v-icon
              :color="!bindStyle.color ? 'primary' : bindStyle.color"
              v-else
              >menu_open</v-icon
            >
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-sheet>
    <div v-if="$vuetify.breakpoint.lgAndUp">
      <!-- toggle Mini variant -->
      <v-btn
        @click.stop="toggleMiniVariant"
        small
        fab
        :class="!bindStyle.color ? 'neu-glow' : ''"
        v-if="!isClippedOver"
      >
        <v-icon
          :color="!bindStyle.color ? 'primary' : bindStyle.color"
          v-if="isMinSideNav"
          >double_arrow</v-icon
        >
        <v-icon :color="!bindStyle.color ? 'primary' : bindStyle.color" v-else
          >menu_open</v-icon
        >
      </v-btn>
      <!-- Contact APP -->
      <v-btn
        small
        fab
        to="/app/contacts"
        :class="!bindStyle.color ? 'neu-glow' : ''"
        active-class="neu-glow-inset"
        class="mx-3"
      >
        <v-icon :color="!bindStyle.color ? 'primary' : bindStyle.color"
          >contacts</v-icon
        >
      </v-btn>
      <!-- Chat APP -->
      <v-btn
        small
        fab
        to="/app/chat"
        :class="!bindStyle.color ? 'neu-glow' : ''"
        active-class="neu-glow-inset"
      >
        <v-icon :color="!bindStyle.color ? 'primary' : bindStyle.color"
          >chat</v-icon
        >
      </v-btn>
    </div>
    <v-spacer />
    <v-btn
      v-if="$vuetify.breakpoint.mdAndDown"
      class="mr-3"
      small
      fab
      :class="!bindStyle.color ? 'neu-glow' : ''"
      @click="handleSidenavDrawer()"
    >
      <v-icon :color="!bindStyle.color ? 'primary' : bindStyle.color"
        >menu</v-icon
      >
    </v-btn>
    <v-btn
      class="mr-3"
      small
      fab
      :class="!bindStyle.color ? 'neu-glow' : ''"
      @click="handleSettingsDrawer()"
    >
      <v-icon :color="!bindStyle.color ? 'primary' : bindStyle.color">
        settings
      </v-icon>
    </v-btn>
    <v-menu offset-y close-on-click>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" small fab class="neu-glow mr-3">
          <v-avatar size="30">
            <v-img :src="currentLocaleImg"></v-img>
          </v-avatar>
        </v-btn>
      </template>

      <v-list dense class="neu-glow">
        <v-list-item
          v-for="(item, index) in langs"
          :key="index"
          @click="handleInternationalization(item.value)"
        >
          <v-list-item-avatar tile class="with-radius" size="25">
            <v-img :src="item.img"></v-img>
          </v-list-item-avatar>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- User Profile Menu -->
    <v-menu offset-y min-width="160">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon class="mr-0">
          <v-avatar size="40" v-if="bindStyle.color">
            <v-img :src="authUser.avatar"></v-img>
          </v-avatar>
          <vuse-avatar size="40" :src="authUser.avatar" v-else />
        </v-btn>
      </template>
      <v-list nav dense class="neu-glow-primary with-radius">
        <template v-for="(item, index) in items">
          <v-divider v-if="item.divider" :key="index"></v-divider>
          <v-list-item :key="index" @click="() => {}" v-else>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import { authUser } from "@/data/dummyData";
import { availableLocale } from "@/config/locale";

export default {
  props: {
    handleSettingsDrawer: Function,
  },
  data() {
    return {
      authUser,
      items: [
        { icon: "person", text: "Profile" },
        { icon: "account_balance_wallet", text: "Account" },
        { icon: "settings", text: "Settings" },
        { icon: "inbox", text: "Inbox" },
        { divider: true },
        { icon: "power_settings_new", text: "Logout" },
      ],
      langs: availableLocale,
    };
  },
  computed: {
    activeItemStyle: (state) => state.activeMenuStyle,
    ...mapGetters("navigations", [
      "isVisibleHeader",
      "isSidenavPostionRight",
      "isClippedOver",
      "isMinSideNav",
      "isDense",
      "isProminent",
      "isHideOnScroll",
      "isShrinkOnScroll",
      "isFloating",
    ]),
    ...mapGetters("scheme", ["header"]),
    ...mapGetters(["locale"]),
    isClippedRight() {
      return this.isClippedOver && this.isSidenavPostionRight;
    },
    isClippedLeft() {
      return this.isClippedOver && !this.isSidenavPostionRight;
    },
    bindStyle() {
      const { color, dark, classes } = this.header;
      return {
        class: {
          "vuse-header": true,
          "with-radius": true,
          [classes]: true,
          "mx-6 mt-3": this.isFloating && !this.isClippedOver,
        },
        dark,
        color,
      };
    },
    currentLocaleImg() {
      return this.langs.find((item) => item.value === this.locale).img;
    },
  },
  methods: {
    toggleMiniVariant() {
      this.$store.dispatch("navigations/setMiniVariant");
    },
    handleSidenavDrawer() {
      this.$store.dispatch("navigations/setSidenavVisibility");
    },
    handleInternationalization(value) {
      this.$store.dispatch("setLocale", value);
    },
  },
};
</script>
