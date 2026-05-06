<template>
  <v-card class="neu-glow">
    <v-card-title>My Progress</v-card-title>

    <div class="text-center">
      <v-progress-circular
        :value="progress"
        size="150"
        width="12"
        color="primary"
      >
        <div class="text-center">
          <div class="text-h4 ml-3">{{ progress }}<sup>&#37;</sup></div>
        </div>
      </v-progress-circular>
    </div>
    <v-card-text>
      <v-row align="center" justify="center" class="text-center my-5">
        <v-col align-self="center">
          <div class="text-h4 pl-2">32<sup>&#37;</sup></div>
          <div class="text-subtitle-1">Last Week</div>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col>
          <div class="text-h4 pl-2">89<sup>&#37;</sup></div>
          <div class="text-subtitle-1">Last Month</div>
        </v-col>
      </v-row>
      <v-list-item class="mx-3 px-5 py-3 neu-glow-inset with-radius">
        <v-list-item-avatar>
          <v-img :src="user.avatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
          <v-list-item-subtitle class="secondary--text">{{
            user.email
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script>
import { users } from "@/data/dummyData";
export default {
  data() {
    return {
      user: users[9],
      progress: 78,
    };
  },
};
</script>

<style lang="scss" scoped>
.profile-row {
  position: absolute;
  top: -50px !important;
  width: 100%;
}
</style>
