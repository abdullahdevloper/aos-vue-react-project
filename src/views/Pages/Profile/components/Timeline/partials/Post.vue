<template>
  <v-sheet class="transparent neu-glow-inset pa-3 mt-5">
    <v-list-item two-line>
      <v-list-item-avatar>
        <v-img :src="post.user.avatar"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ post.user.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ post.publishedON }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-icon>
        <v-icon :color="post.favorite ? 'red darken-4' : ''">favorite</v-icon>
      </v-list-item-icon>
    </v-list-item>
    <div class="text-body-1 pa-3">{{ post.content }}</div>
    <v-img
      v-if="post.img"
      :src="post.img.src"
      :lazy-src="post.img.lazy"
      class="neu-glow-inset ma-3"
    >
    </v-img>
    <v-row class="mx-2">
      <v-col align="start">
        <div>
          <v-icon>favorite_border</v-icon>
          <span class="px-2 text-caption">{{ post.counts.likes }}</span>
        </div>
      </v-col>
      <v-col align="end">
        <div>
          <v-icon>comment</v-icon>
          <span class="px-2 text-caption">{{ post.counts.comments }}</span>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="post.comments && post.comments.length > 0">
      <v-col
        v-for="comment in post.comments"
        :key="comment.id"
        cols="12"
        class="pt-0"
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="comment.user.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="comment.user.name"></v-list-item-title>
            <v-list-item-subtitle>{{ comment.createdAt }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon small><v-icon small>favorite_border</v-icon></v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-sheet class="ml-12 mr-3 pa-3 rounded">{{ comment.content }}</v-sheet>
        <!-- <v-sheet>{{ comment.content }}</v-sheet> -->
      </v-col>
    </v-row>
    <!-- Input -->
    <v-sheet class="transparent neu-glow-inset pa-3 mx-3 rounded">
      <v-textarea
        solo
        name="input-1"
        class="no-details white py-0 mb-2"
        placeholder="What's new today?"
        hide-details
      ></v-textarea>
      <v-btn color="primary">Comment</v-btn>
    </v-sheet>
  </v-sheet>
</template>

<script>
export default {
  props: {
    post: Object,
  },
};
</script>
