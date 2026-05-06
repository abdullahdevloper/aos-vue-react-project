<template>
  <v-row>
    <v-col cols="12" md="4">
      <intro />
      <photos />
      <friends :users="users" v-if="users" />
      <last-activities />
    </v-col>
    <v-col cols="12" md="8">
      <!-- Input -->
      <v-sheet class="transparent neu-glow-inset pa-3 mb-3" v-if="posts">
        <v-textarea
          solo
          name="input-1"
          class="no-details white py-0"
          placeholder="What's new today?"
          hide-details
        ></v-textarea>
        <v-card-actions class="px-0">
          <v-btn icon light>
            <v-icon>photo</v-icon>
          </v-btn>
          <v-btn icon light>
            <v-icon>person</v-icon>
          </v-btn>
          <v-btn icon light>
            <v-icon>location_on</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary">Post</v-btn>
        </v-card-actions>
      </v-sheet>
      <!-- POST -->
      <post :post="post" v-for="post in posts" :key="post.id" />
    </v-col>
  </v-row>
</template>

<script>
import Intro from "./partials/Intro";
import Photos from "./partials/Photos";
import Friends from "./partials/Friends";
import Post from "./partials/Post";
import LastActivities from "./partials/LastActivities";
import { users, posts } from "@/data/dummyData";

export default {
  data() {
    return {
      users,
      posts,
    };
  },
  components: {
    Intro,
    Photos,
    Friends,
    Post,
    LastActivities,
  },
  beforeDestroy() {
    this.users = null;
    this.posts = null;
    delete this.users;
    delete this.posts;
  },
};
</script>
