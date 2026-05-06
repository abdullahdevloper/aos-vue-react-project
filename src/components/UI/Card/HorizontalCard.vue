<template>
  <v-card :color="!color ? 'neu-glow-inset' : color" :max-width="maxWidth">
    <div
      class="d-flex flex-no-wrap"
      :class="!leftMedia ? 'justify-space-between' : ''"
    >
      <VuseNeuAvatar
        :src="media"
        tile
        class="ma-3"
        v-if="(media || icon) && leftMedia"
        :outterDimention="outterDimention"
        :innerDimention="innerDimention"
        :size="mediaSize"
        :icon="icon"
        :color="avatarColor"
        :iconColor="iconColor"
      />
      <div>
        <v-card-title class="text-h5" v-text="title"></v-card-title>

        <v-card-subtitle v-text="subtitle"></v-card-subtitle>
        <v-card-actions v-if="actions">
          <v-btn
            text
            v-for="action in actions"
            :key="String(action)"
            @click="action.method"
            >{{ action.text }}</v-btn
          >
        </v-card-actions>
      </div>
      <VuseNeuAvatar
        :src="media"
        tile
        class="ma-3"
        v-if="(media || icon) && !leftMedia"
        :outterDimention="outterDimention"
        :innerDimention="innerDimention"
        :size="mediaSize"
        :icon="icon"
        :color="avatarColor"
        :iconColor="iconColor"
      />
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    maxWidth: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: "Title",
    },
    subtitle: {
      type: String,
      default: "subtitle",
    },
    leftMedia: {
      type: Boolean,
      default: false,
    },
    mediaSize: {
      type: [Number, String],
      default: 100,
    },
    media: {
      type: String,
      default: null,
    },
    actions: {
      type: Array,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    avatarColor: {
      type: String,
      default: null,
    },
    iconColor: {
      type: String,
      default: null,
    },
  },
  computed: {
    outterDimention() {
      return Number(this.mediaSize) + 20;
    },
    innerDimention() {
      return Number(this.mediaSize) + 10;
    },
  },
};
</script>
