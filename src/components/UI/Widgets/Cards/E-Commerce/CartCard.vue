<template>
  <v-card :max-width="maxWidth" class="neu-glow">
    <v-img :height="imgHeight" :src="img" :lazy-src="img"> </v-img>

    <v-card-text class="text-center pos-relative">
      <v-btn
        :color="stickyBtnColor"
        dark
        small
        absolute
        top
        left
        :fab="fab"
        rounded
        :class="!fab ? 'vuse-fab' : ''"
        @click="handleEvent()"
      >
        {{ stickyText }}
      </v-btn>

      <div class="text-h6 font-weight-bold">{{ title }}</div>
      <slot />
    </v-card-text>
    <v-card-actions>
      <v-row justify="center" align="center" class="mb-3">
        <v-btn
          :color="actionBtnColor"
          rounded
          @click="actionEvent()"
          class="mx-3 neu-glow text-capitalize white--text"
          v-if="actionText"
        >
          {{ actionText }}
        </v-btn>
        <v-btn fab small @click="fabBtnEvent()" class="neu-glow" v-if="fabIcon">
          <v-icon small :color="fabIconColor">{{ fabIcon }}</v-icon>
        </v-btn>
      </v-row>
    </v-card-actions>
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
    stickyText: {
      type: String,
      default: null,
    },
    stickyBtnColor: {
      type: String,
      default: "primary",
    },
    title: {
      type: String,
      default: null,
    },
    handleEvent: {
      type: Function,
      default: () => {},
    },
    actionEvent: {
      type: Function,
      default: () => {},
    },
    actionText: {
      type: String,
      default: "Add To Cart",
    },
    actionBtnColor: {
      type: String,
      default: "blue",
    },
    fabIcon: {
      type: String,
      default: null,
    },
    fabIconColor: {
      type: String,
      default: "blue",
    },
    fabBtnEvent: {
      type: Function,
      default: () => {},
    },
    fab: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
