<template>
  <v-sheet
    color="transparent"
    :width="width"
    :style="style"
  >
    <v-row
      class="mx-0"
      v-if="upside"
      :justify='justify'
    >
      <slot />
    </v-row>
    <v-progress-linear
      :value="value"
      :color="color"
      rounded
    ></v-progress-linear>
    <v-row
      :justify='justify'
      class="mx-0"
      v-if="!upside"
    >
      <slot />
    </v-row>
  </v-sheet>
</template>
<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: 100
    },
    color: {
      type: String,
      default: 'primary'
    },
    justify: {
      type: String,
      default: 'end'
    },
    width: {
      type: String,
      default: '100%'
    },
    upside: {
      type: Boolean,
      default: true
    },
    bottom: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    style () {
      return this.bottom ? { bottom: 0 } : {}
    }
  }
}
</script>