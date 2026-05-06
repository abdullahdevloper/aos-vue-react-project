<template>
  <v-card :max-width="maxWidth" class="neu-glow">
    <v-card-title v-text="title" />
    <v-card-text>
      <v-list-item class="grow px-0">
        <v-list-item-content>
          <v-list-item-title class="text-h4">{{ heading }}</v-list-item-title>
          <v-list-item-subtitle>
            <slot />
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar
          v-bind="avatar.avatarStyle ? avatar.avatarStyle : {}"
        >
          <img :src="avatar.src" v-if="avatar.src" />
          <v-icon
            v-else-if="avatar.icon"
            v-bind="avatar.style ? avatar.style : {}"
            >{{ avatar.icon }}</v-icon
          >
          <span class="text-h5" v-else>{{ avatar.text }}</span>
        </v-list-item-avatar>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    maxWidth: {
      type: [Number, String],
      default: "",
    },
    title: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    avatar: {
      type: Object,
      default: () => {
        return {
          avatarStyle: null,
        };
      },
    },
  },
};
</script>
