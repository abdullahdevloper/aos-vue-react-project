<template>
  <v-hover v-slot:default="{ hover }">
    <v-col
      class="d-flex with-radius pos-relative flex-wrap"
      cols="12"
      :class="{ ...classes, 'neu-glow-inset': hover, 'neu-glow': !hover }"
    >
      <v-img :src="img.src" :lazy-src="img.src" v-bind="img.style" v-if="img">
      </v-img>
      <!-- Avatar -->
      <v-avatar
        v-if="avatar"
        v-bind="avatar.avatarStyle ? avatar.avatarStyle : {}"
      >
        <img :src="avatar.src" v-if="avatar.src" />
        <v-icon
          v-else-if="avatar.icon"
          v-bind="avatar.style ? avatar.style : {}"
          >{{ avatar.icon }}</v-icon
        >
        <span class="text-h5" v-else>{{ avatar.text }}</span>
      </v-avatar>

      <!-- Content Area -->
      <div class="list-content flex-grow-1 mx-3">
        <div class="text-subtitle-2 mt-1">{{ title }}</div>
        <div class="text-body-2" v-html="body"></div>
      </div>

      <!-- Action -->
      <div v-if="action">
        <v-btn v-if="action.btn" v-bind="action.style ? action.style : {}">
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
      </div>
    </v-col>
  </v-hover>
</template>
<script>
/**
 * Refer readme for schema
 */
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    body: {
      type: String,
      default: "",
    },
    img: {
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
    alignItems: {
      type: String,
      default: "center",
    },
  },

  data() {
    return {
      menuItems: [
        { title: "Edit" },
        { title: "Move to Archive" },
        { title: "Delete" },
      ],
    };
  },
  computed: {
    classes() {
      return {
        "align-center": this.alignItems === "center",
        "align-start": this.alignItems === "start",
      };
    },
  },
};
</script>
