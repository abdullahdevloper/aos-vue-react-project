<template>
  <v-sheet class="transparent">
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-title class="mx-3">Menu Style</v-list-item-title>
        <v-radio-group
          v-model="activeType"
          class="mx-3"
        >
          <v-radio
            v-for="item in options"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          ></v-radio>
        </v-radio-group>
      </v-list-item-content>
    </v-list-item>

    <!-- Collapse: Mini Variant -->

    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-title class="mx-3">Menu Style</v-list-item-title>
        <div class="mx-3">

          <v-switch
            v-model="miniVariant"
            label="Collapse Sidebar"
          ></v-switch>
        </div>
      </v-list-item-content>
    </v-list-item>
    <!-- Position Right/Left -->
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-title class="mx-3">Position</v-list-item-title>
        <v-radio-group v-model="right">
          <v-row
            class="mx-3"
            align="center"
            justify="center"
          >
            <v-radio
              v-for="(option,i) in positionOptions"
              :key="`${option.label}-header-${i}`"
              :label="option.label"
              :value="option.value"
              class="my-0 mr-5"
            ></v-radio>
          </v-row>
        </v-radio-group>
      </v-list-item-content>
    </v-list-item>
  </v-sheet>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      options: [
        { label: "Default", value: "default" },
        { label: "Flat", value: "flat" },
        { label: "Rounded", value: "rounded" },
        { label: "Shaped", value: "shaped" }
      ],
      positionOptions: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" }
      ]
    };
  },
  computed: {
    ...mapGetters("navigations", [
      "activeItemStyle",
      "isMinSideNav",
      "isSidenavPostionRight"
    ]),
    activeType: {
      get() {
        const selected = Object.keys(this.activeItemStyle).filter(
          key => this.activeItemStyle[key]
        );
        return selected.length ? selected[0] : "default";
      },
      set(value) {
        this.$store.dispatch("navigations/setActiveSidenavStyle", value);
      }
    },
    miniVariant: {
      get() {
        return this.isMinSideNav;
      },
      set(value) {
        this.$store.dispatch("navigations/setMiniVariant", value);
      }
    },
    right: {
      get() {
        return this.isSidenavPostionRight ? "right" : "left";
      },
      set() {
        this.$store.dispatch("navigations/setSidenavPositionRight");
      }
    }
  }
};
</script>