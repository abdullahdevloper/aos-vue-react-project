<template>
  <v-sheet class="neu-glow-inset mb-3">
    <v-toolbar
      dense
      flat
      color="transparent"
    >
      <v-btn
        icon
        color="purple"
      >
        <v-icon>group</v-icon>
      </v-btn>
      <v-toolbar-title>Friends</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>See All</v-btn>
    </v-toolbar>
    <v-container fluid>
      <v-row>
        <v-col
          v-for="friend in friends"
          :key="friend.id"
          class="d-flex child-flex"
          cols="6"
        >
          <v-card
            flat
            tile
            class="neu-glow-inset with-radius"
          >
            <v-img
              :src="friend.avatar"
              :lazy-src="friend.avatar"
            />
            <v-card-text>
              {{friend.name}}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    friends () {
      return this.users.slice(1, 7);
    }
  }
}
</script>