<template>
  <v-sheet
    width="300"
    class="neu-glow"
    dark
  >
    <v-stepper
      v-model="step"
      class="transparent"
    >
      <v-row
        class="mx-1"
        :justify="selectedColor.base ? 'space-between' : 'end'"
        align="center"
      >
        <v-col
          cols="3"
          v-if="step > 1"
        >
          <v-btn
            fab
            small
            @click="step = 1"
            light
            class="neu-glow"
          >
            <v-icon small>arrow_back</v-icon>
          </v-btn>
        </v-col>
        <v-col
          cols="6"
          v-if="selectedColor.hex"
        >
          <div class="pa-2 neu-glow-inset with-radius grey--text">
            {{ selectedColor.hex }}
          </div>
        </v-col>
        <v-col cols="3">
          <v-btn
            fab
            small
            @click="$emit('closed')"
            light
            class="neu-glow"
            v-if="dismissible"
          >
            <v-icon small>close</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-row class="mx-0">
            <v-sheet
              v-for="(color, key) in colors"
              :key="`${key}-base`"
              color="transparent"
              class="ma-1 "
            >
              <v-btn
                fab
                small
                text
                @click="selectBaseColor(color, key)"
              >
                <v-avatar
                  size="40"
                  :color="key === 'shades' ? 'neu-glow ' : color.base"
                >
                  <v-icon
                    small
                    :class="getColorClass(key)"
                    v-if="selectedColor.base === key"
                  >done_outline</v-icon>
                  <v-icon
                    v-if="key === 'shades' && selectedColor.base !== 'shades'"
                    large
                    color="grey"
                  >
                    panorama_fish_eye
                  </v-icon>
                </v-avatar>
              </v-btn>
            </v-sheet>
          </v-row>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-row class="mx-0">
            <v-sheet
              v-for="(color, key) in selectedColorShade"
              :key="`${key}-shades`"
              color="transparent"
              class="ma-1 "
            >
              <v-btn
                fab
                small
                text
                @click="selectShade(color, key)"
              >
                <v-avatar
                  size="40"
                  :color="color"
                >
                  <v-icon
                    small
                    :class="getColorClass(key)"
                    v-if="selectedColor.shade === key"
                  >check</v-icon>
                </v-avatar>
              </v-btn>
            </v-sheet>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
      <v-row
        class="mx-1"
        justify="end"
        align="center"
        v-if="resetNeu"
      >
        <v-col cols="4">
          <v-btn
            small
            @click="reset()"
            light
            class="neu-glow"
          >
            reset
          </v-btn>
        </v-col>
      </v-row>
    </v-stepper>
  </v-sheet>
</template>
<script>
import colors from "vuetify/es5/util/colors";
export default {
  name: "StyleColors",
  props: {
    resetNeu: {
      type: Boolean,
      default: false
    },
    dismissible: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    colors,
    step: 1,
    selectedColorShade: null,
    selectedColor: {
      base: "",
      shade: "",
      hex: ""
    }
  }),

  methods: {
    selectBaseColor(color, key) {
      this.selectedColorShade = color;
      this.selectedColor = {
        base: key,
        shade: "base",
        hex: colors[key]["base"]
      };
      this.$emit("changed", this.selectedColor);
      this.step = 2;
    },
    selectShade(color, key) {
      const selection = { ...this.selectedColor };
      this.selectedColor = {
        ...selection,
        shade: key,
        hex: colors[selection.base][key]
      };
      this.$emit("changed", this.selectedColor);
    },
    reset() {
      this.$emit("changed", {
        reset: true
      });
    },
    getColorClass(key) {
      if (
        ["white", "transparent", "shades"].includes(key) ||
        key.indexOf("light") > -1 ||
        key.indexOf("accent") > -1 ||
        key === undefined
      )
        return "black--text";

      return "white--text";
    }
  }
};
</script>

<style lang="scss">
.v-stepper__content {
  padding: 10px !important;
}
</style>
