<template>
  <v-sheet
    :width="outterLayerDimention"
    :height="outterLayerDimention"
    :class="sheetClasses"
  >
    <v-sheet
      :width="innerLayerDimention"
      :height="innerLayerDimention"
      class="neu-glow justify-center d-flex align-center"
      :class="!tile ? 'circle' : ''"
    >
      <v-avatar :class="avatarClasses" :size="size" :tile="tile" :color="color">
        <v-img :src="src" v-if="src"></v-img>
        <v-icon :size="Number(size)" :color="iconColor" v-else>{{
          icon
        }}</v-icon>
      </v-avatar>
    </v-sheet>
  </v-sheet>
</template>

<script>
export default {
  name: "VuseNeuAvatar",
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
    outterDimention: {
      type: [String, Number],
      default: null,
    },
    innerDimention: {
      type: [String, Number],
      default: null,
    },
    glowClass: {
      type: String,
      default: "neu-glow-inset",
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
    outterLayerDimention() {
      const ringSize =
        Number(this.size) * 0.4 > 42 ? 42 : Number(this.size) * 0.4;
      return this.outterDimention
        ? Number(this.outterDimention)
        : Math.ceil(Number(this.size) + ringSize);
    },
    innerLayerDimention() {
      const ringSize =
        Number(this.size) * 0.15 > 16 ? 15 : Number(this.size) * 0.15;
      return this.innerDimention
        ? Number(this.innerDimention)
        : Math.ceil(Number(this.size) + ringSize);
    },
    sheetClasses() {
      const glowClass = this.glowClass;
      return {
        "with-radius": this.tile,
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
        "neu-glow-inset": !this.color,
        "with-radius": this.tile,
        circle: !this.tile,
      };
    },
  },
};
</script>
