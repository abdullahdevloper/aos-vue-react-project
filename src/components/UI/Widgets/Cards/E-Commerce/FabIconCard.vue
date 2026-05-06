<template>
  <v-card :max-width="maxWidth" class="neu-glow">
    <v-img :height="imgHeight" :src="img" :lazy-src="img"> </v-img>

    <v-card-text class="text-center pos-relative">
      <v-row class="fab-row" justify="center" v-if="fabIcon">
        <v-btn :color="fabColor" small dark fab @click="handleEvent()">
          <v-icon>{{ fabIcon }}</v-icon>
        </v-btn>
      </v-row>

      <div class="text-h6 font-weight-bold mt-3">{{ title }}</div>
      <div class="my-4 text-center">
        <slot />
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    maxWidth: {
      type: [String, Number],
      default: "",
    },
    imgHeight: {
      type: [String, Number],
      default: 250,
    },
    img: {
      type: String,
      default: null,
    },
    fabIcon: {
      type: String,
      default: null,
    },
    fabColor: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    handleEvent: {
      type: Function,
      default: () => {},
    },
  },
};
</script>
