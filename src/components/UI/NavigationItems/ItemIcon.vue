<template>
  <v-list-item-icon>
    <v-icon v-if="icon">{{ icon }}</v-icon>
    <v-avatar size="26" v-else>
      <span>{{ title | first2Char }}</span>
    </v-avatar>
  </v-list-item-icon>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null
    },
    title: {
      title: String,
      required: true
    }
  }
};
</script>
