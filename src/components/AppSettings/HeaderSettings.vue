<template>
  <v-sheet class="transparent">
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-title class="mx-3">Alignment</v-list-item-title>
        <v-radio-group v-model="clippedHeader">
          <v-row
            class="mx-3"
            align="center"
            justify="center"
          >
            <v-radio
              v-for="(option,i) in headerOptions"
              :key="`${option.label}-header-${i}`"
              :label="option.label"
              :value="option.value"
              class="my-0 mr-5"
            ></v-radio>
          </v-row>
        </v-radio-group>
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="px-0">
      <v-list-item-content class="py-0">
        <v-list-item-title class="mx-3">Shrinked Header</v-list-item-title>
        <div class="mx-3">
          <v-switch
            v-model="densed"
            label="Shrinked Header"
          ></v-switch>
        </div>
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="px-0">
      <v-list-item-content class="py-0">
        <v-list-item-title class="mx-3">On Scroll Action</v-list-item-title>
        <div class="mx-3">
          <v-switch
            v-model="hideOnScrollAction"
            label="Hide on Scroll"
          ></v-switch>
        </div>
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="px-0">
      <v-list-item-content class="py-0">
        <v-list-item-title class="mx-3">Floating</v-list-item-title>
        <div class="mx-3">
          <v-switch
            v-model="floating"
            label="Floating"
          ></v-switch>
        </div>
      </v-list-item-content>
    </v-list-item>

    <!-- <v-list-item class="px-0">
      <v-list-item-content class="py-0">
        <v-list-item-title class="mx-3">Prominent</v-list-item-title>
        <div class="mx-3">
          <v-switch
            v-model="prominent"
            label="Prominent Header"
          ></v-switch>
        </div>
      </v-list-item-content>
    </v-list-item> -->

  </v-sheet>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      headerOptions: [
        { label: "Below", value: false },
        { label: "Above", value: true }
      ],
      onScrollVisibilityOptions: [
        { label: "No Action", value: "none" },
        { label: "Hide On Scroll", value: "hideOnScroll" },
        { label: "Shrink On Scroll", value: "shrinkOnScroll" }
      ]
    };
  },
  computed: {
    ...mapGetters("navigations", [
      "isClippedOver",
      "isDense",
      "isProminent",
      "isHideOnScroll",
      "isFloating"
    ]),
    clippedHeader: {
      get() {
        return this.isClippedOver;
      },
      set(value) {
        this.$store.dispatch("navigations/updateHeaderSettings", {
          clippedOver: value
        });
      }
    },
    densed: {
      get() {
        return this.isDense;
      },
      set(value) {
        this.$store.dispatch("navigations/updateHeaderSettings", {
          dense: value
        });
      }
    },
    prominent: {
      get() {
        return this.isProminent;
      },
      set(value) {
        this.$store.dispatch("navigations/updateHeaderSettings", {
          prominent: value
        });
      }
    },
    hideOnScrollAction: {
      get() {
        return this.isHideOnScroll;
      },
      set(value) {
        this.$store.dispatch("navigations/updateHeaderSettings", {
          hideOnScroll: value
        });
      }
    },
    floating: {
      get() {
        return this.isFloating;
      },
      set(value) {
        this.$store.dispatch("navigations/updateHeaderSettings", {
          floating: value
        });
      }
    }
  }
};
</script>