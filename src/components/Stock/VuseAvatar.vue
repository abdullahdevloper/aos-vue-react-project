<template>
  <v-sheet
    :width="ringDimention"
    :height="ringDimention"
    class="justify-center d-flex align-center"
    :class="tile ? 'rounded' : 'circle'"
  >
    <v-avatar :class="avatarClasses" :size="size" :tile="tile" :color="color">
      <v-img :src="src" v-if="src"></v-img>
      <v-icon :size="Number(size)" :color="iconColor" v-else>{{ icon }}</v-icon>
    </v-avatar>
  </v-sheet>
</template>

<script>
export default {
  name: "VuseAvatar",
  props: {
    src: {
      type: String,
      default: "",
    },
    size: {
      type: [String, Number],
      default: 105,
    },
    tile: {
      type: Boolean,
      default: false,
    },
    ring: {
      type: [String, Number],
      default: null,
    },
    glowClass: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
    iconColor: {
      type: String,
      default: null,
    },
  },
  computed: {
    ringDimention() {
      const ringSize =
        Number(this.size) * 0.15 > 16 ? 15 : Number(this.size) * 0.15;
      return this.ring
        ? Number(this.ring)
        : Math.ceil(Number(this.size) + ringSize);
    },
    sheetClasses() {
      const glowClass = this.glowClass;
      return {
        "with-radius": true,
        "justify-center": true,
        "d-flex": true,
        "align-center": true,
        circle: !this.tile,
        [`${glowClass}`]: true,
      };
    },
    avatarClasses() {
      return {
        "user-avatar": true,
        "align-self-center": true,
        "with-radius": this.tile,
        circle: !this.tile,
      };
    },
  },
};
</script>
