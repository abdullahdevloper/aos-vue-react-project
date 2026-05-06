<template>
  <v-card
    :max-width="maxWidth"
    class="neu-glow"
  >
    <v-card-text class="pos-relative">
      <v-list-item class="px-0">
        <v-list-item-avatar>
          <v-img :src="avatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{name}}</v-list-item-title>

        </v-list-item-content>
        <v-row
          align="center"
          justify="end"
        >
          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-row>
      </v-list-item>

      <slot />
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        class="text-capitalize"
      >
        <v-icon
          left
          color="red"
        >favorite</v-icon> {{likesCount}} Likes
      </v-btn>
      <!-- <v-spacer></v-spacer> -->

      <v-btn
        text
        class="text-capitalize"
      >
        <v-icon left>comment</v-icon> {{commentsCount}} Comments
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { users } from "@/data/dummyData";
export default {
  props: {
    maxWidth: {
      type: [String, Number],
      default: ""
    },
    avatar: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    likesCount: {
      type: [String, Number],
      default: null
    },
    commentsCount: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      user: users[13]
    };
  }
};
</script>