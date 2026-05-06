<template>
  <v-card :max-width="maxWidth" :max-height="maxHeight" class="neu-glow">
    <v-row class="mx-0 pa-4" justify="space-between" align="center">
      <!-- title and subtitle -->
      <div>
        <div class="text-h6 font-weight-regular grey--text">
          {{ subtitle }}
        </div>
        <div class="text-h4">{{ title }}</div>
      </div>
      <!-- Stats -->
      <div class="d-flex flex-column align-end" v-if="stats">
        <div v-if="stats.icon || stats.text">
          <v-icon
            v-bind="stats.icon.style !== undefined ? stats.icon.style : {}"
            v-if="stats.icon"
            >{{ stats.icon.name }}</v-icon
          >
          <span
            v-if="stats.text"
            class="ml-2"
            v-bind="stats.text.style !== undefined ? stats.text.style : {}"
            >{{ stats.text.val }}</span
          >
        </div>
        <div class="ml-2" v-if="stats.subtitle">{{ stats.subtitle }}</div>
      </div>

      <!-- Avatar -->
      <v-avatar
        v-if="avatar"
        v-bind="avatar.avatarStyle !== undefined ? avatar.avatarStyle : {}"
        class="d-flex flex-column align-end"
      >
        <img :src="avatar.src" v-if="avatar.src" />
        <v-icon
          v-else-if="avatar.icon"
          v-bind="avatar.style ? avatar.style : {}"
          >{{ avatar.icon }}</v-icon
        >
        <span class="text-h5" v-else>{{ avatar.text }}</span>
      </v-avatar>
    </v-row>
    <v-card-text class="py-0">
      <slot />
    </v-card-text>
    <v-card-actions v-if="action">
      <!-- Action -->
      <v-row class="mx-0" v-bind="action.rowStyle">
        <v-btn
          v-if="action.btn"
          v-bind="action.style !== undefined ? action.style : {}"
        >
          <v-icon
            v-if="action.btn.icon"
            v-bind="action.btn.style ? action.btn.style : {}"
            >{{ action.btn.icon }}</v-icon
          >
          <span v-else>{{ action.btn.text }}</span>
        </v-btn>
        <v-chip
          class="ma-2"
          v-else-if="action.chip"
          v-bind="action.style ? action.style : {}"
        >
          {{ action.chip }}
        </v-chip>
        <div v-else v-bind="action.style ? action.style : {}">
          {{ action.text }}
        </div>
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
    maxHeight: {
      type: [String, Number],
      default: "",
    },
    iconColor: {
      type: String,
      default: "teal",
    },
    subtitle: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    stats: {
      type: Object,
      default: null,
    },
    avatar: {
      type: Object,
      default: null,
    },
    action: {
      type: Object,
      default: null,
    },
  },
};
</script>
