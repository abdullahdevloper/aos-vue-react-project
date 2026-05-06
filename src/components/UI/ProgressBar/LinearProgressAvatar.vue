<template>
  <v-sheet
    color="transparent"
    :width="width"
    class="linear-progress-av-sheet"
    :style="style"
  >
    <v-row
      :justify='justify'
      class="mx-0"
      v-if="isUp"
    >
      <v-avatar
        :color="color"
        tile
        :size="size"
      >
        <slot />
      </v-avatar>
    </v-row>
    <v-progress-linear
      :value="value"
      :color="color"
    ></v-progress-linear>
    <v-row
      :justify='justify'
      class="mx-0"
      v-if="!isUp"
    >
      <v-avatar
        :color="color"
        tile
        :size="size"
      >
        <slot />
      </v-avatar>
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
    size: {
      type: [Number, String],
      default: 20
    },
    justify: {
      type: String,
      default: 'end'
    },
    width: {
      type: String,
      default: '100%'
    },
    isUp: {
      type: Boolean,
      default: false
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
<style scoped>
.linear-progress-av-sheet {
  position: absolute;
}
</style>