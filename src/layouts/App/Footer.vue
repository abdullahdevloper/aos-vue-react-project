<template>
  <v-footer
    v-if="show"
    :app="app"
    :padless="padless"
    :fixed="fixed"
    :absolute="absolute"
    :inset="inset"
    v-bind="bindStyle"
  >
    <v-row
      justify="start"
      align="center"
    >
      <v-col
        class="text-left px-8"
        cols="6"
      >
        COPYRIGHT &copy;{{ new Date().getFullYear() }} <a
          href="http://hexesis.com/"
          target="_blank"
        >Hexesis</a>
      </v-col>
      <v-col
        class="text-right px-8"
        cols="6"
      >
        Handcrafted by <v-icon
          small
          color="red"
        >favorite</v-icon>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("navigations", [
      "isVisibleFooter",
      "isAppFooter",
      "isFixedFooter",
      "isAbsoluteFooter",
      "isInsetFooter",
      "isPadlessFooter"
    ]),
    ...mapGetters("scheme", ["footer"]),
    show() {
      return this.isVisibleFooter;
    },
    app() {
      return this.isAppFooter;
    },
    fixed() {
      return this.isFixedFooter;
    },
    absolute() {
      return this.isAbsoluteFooter;
    },
    inset() {
      return this.isInsetFooter;
    },
    padless() {
      return this.isPadlessFooter;
    },
    bindStyle() {
      const { color, dark, classes } = this.footer;
      return {
        class: {
          "vuse-footer": true,
          [classes]: true
        },
        dark,
        color,
        style: {
          width: "auto",
          ...(this.isFixedFooter ? { "z-index": 9 } : {})
        }
      };
    }
  }
};
</script>