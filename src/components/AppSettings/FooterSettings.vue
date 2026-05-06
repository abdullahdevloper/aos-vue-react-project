<template>
  <v-sheet class="transparent">
    <v-list-item class="px-0">
      <v-list-item-content class="pb-0">
        <v-list-item-title class="mx-3">Position</v-list-item-title>
        <v-radio-group v-model="selectedFooterType">
          <v-row
            class="mx-3"
            align="start"
            justify="start"
          >
            <v-radio
              v-for="(option,i) in footerType"
              :key="`${option.label}-footertype-${i}`"
              :label="option.label"
              :value="option.value"
              class="my-1 mr-5"
            ></v-radio>
          </v-row>
        </v-radio-group>
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="px-0">
      <v-list-item-content class="py-0">
        <v-list-item-title class="mx-3">Alignment</v-list-item-title>
        <v-radio-group v-model="insetFooter">
          <v-row
            class="mx-3"
            align="center"
            justify="center"
          >
            <v-radio
              v-for="(option,i) in footerAlignment"
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
        <v-list-item-title class="mx-3">Padless Footer</v-list-item-title>
        <div class="mx-3">
          <v-switch
            v-model="selectedPadlessType"
            label="Padless Footer"
          ></v-switch>
        </div>
      </v-list-item-content>
    </v-list-item>
  </v-sheet>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      footerType: [
        { label: "Standard", value: "absolute" },
        { label: "Fixed", value: "fixed" }
      ],
      footerAlignment: [
        { label: "Below", value: true },
        { label: "Above", value: false }
      ]
    };
  },
  computed: {
    ...mapGetters("navigations", [
      "isFixedFooter",
      "isAbsoluteFooter",
      "isPadlessFooter",
      "isInsetFooter"
    ]),
    selectedFooterType: {
      get() {
        return this.isFixedFooter
          ? "fixed"
          : this.isAbsoluteFooter
          ? "absolute"
          : "static";
      },
      set(value) {
        this.$store.dispatch(
          "navigations/setAbsoluteFooter",
          value === "absolute"
        );
        this.$store.dispatch("navigations/setFixedFooter", value === "fixed");
        this.$store.dispatch(
          "navigations/setAbsoluteFooter",
          value === "absolute"
        );
      }
    },
    selectedPadlessType: {
      get() {
        return this.isPadlessFooter;
      },
      set(value) {
        this.$store.dispatch("navigations/setPadlessFooter", value);
      }
    },
    insetFooter: {
      get() {
        return this.isInsetFooter;
      },
      set(value) {
        this.$store.dispatch("navigations/setInsetFooter", value);
      }
    }
  }
};
</script>