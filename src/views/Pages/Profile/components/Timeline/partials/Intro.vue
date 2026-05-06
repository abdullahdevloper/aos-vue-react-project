<template>
  <v-sheet class="neu-glow-inset mb-3">
    <v-toolbar dense flat color="transparent">
      <v-btn icon color="blue">
        <v-icon>public</v-icon>
      </v-btn>
      <v-toolbar-title>Intro</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <div class="text-body-2">
        I'm web developer working in fullstack application. I choose this firm
        b'coz I love it. Lorem ipsum dolor sit amet, consectetur adipisicing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </div>
    </v-card-text>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>Lives In: </v-list-item-title>
        <v-list-item-subtitle>Los Angeles, California</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>Joined: </v-list-item-title>
        <v-list-item-subtitle>April 14, 2012</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>Current Job: </v-list-item-title>
        <v-list-item-subtitle
          >Technical Lead at Hexesis Studio</v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>Email: </v-list-item-title>
        <v-list-item-subtitle>{{ authUser.email }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>Website: </v-list-item-title>
        <v-list-item-subtitle
          ><a href="http://hexesis.com" target="_blank"
            >http://hexesis.com</a
          ></v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>
  </v-sheet>
</template>
<script>
import { authUser } from "@/data/dummyData";
export default {
  data() {
    return {
      authUser,
    };
  },
};
</script>
