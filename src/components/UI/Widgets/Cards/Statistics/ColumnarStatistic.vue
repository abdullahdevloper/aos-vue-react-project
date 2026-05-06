<template>
  <v-card :max-width="maxWidth" class="neu-glow">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-row align="center" justify="space-between">
        <v-col
          class="text-center"
          :cols="item.cols"
          v-for="(item, i) in items"
          :key="`${item.heading}-col-${i}`"
        >
          <!-- Avatar -->
          <v-avatar
            v-if="item.avatar"
            v-bind="item.avatar.avatarStyle ? item.avatar.avatarStyle : {}"
          >
            <img :src="item.avatar.src" v-if="item.avatar.src" />
            <v-icon
              v-else-if="item.avatar.icon"
              v-bind="item.avatar.style ? item.avatar.style : {}"
              >{{ item.avatar.icon }}</v-icon
            >
            <span class="text-h5" v-else>{{ item.avatar.text }}</span>
          </v-avatar>
          <!-- Heading -->
          <div class="text-h4  mt-5">{{ item.heading }}</div>
          <!-- Subheading -->
          <div v-bind="item.subheading.style ? item.subheading.style : {}">
            <v-icon
              small
              v-bind="
                item.subheading.icon.style ? item.subheading.icon.style : {}
              "
              v-if="item.subheading.icon"
              class="ml-2"
              >{{ item.subheading.icon.name }}</v-icon
            >
            <span class="text-body-2" v-html="item.subheading.text"></span>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [
        {
          cols: 12,
          avatarSize: 70,
          avatarIcon: "phone_iphone",
          iconColor: "teal--text text--accent-3",
          info: "Views",
          largeText: "36K",
        },
      ],
    },
    title: {
      type: String,
      required: true,
    },
    maxWidth: {
      type: [Number, String],
      default: "",
    },
  },
};
</script>
