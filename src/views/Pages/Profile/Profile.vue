<template>
  <div class="ma-3 vuse-user-profile">
    <v-container fluid>
      <v-card color="neu-glow-inset with-radius">
        <cover :user="authUser" />

        <v-row class="mt-10 mx-0">
          <v-col class="align-self-center ml-12 pa-0" align="start">
            <h1 class="font-weight-bold text-h4 basil--text">
              {{ authUser.name }}
            </h1>
          </v-col>
          <v-col class="pa-0">
            <v-tabs
              v-model="tab"
              background-color="transparent"
              color="primary"
              right
              class="vuse-neu-ele"
            >
              <v-tabs-slider color="primary" />
              <v-tab v-for="item in items" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>
          </v-col>
        </v-row>
      </v-card>
      <v-sheet class="transparent profile-tab-item">
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item" dark>
            <v-sheet class="mt-3 transparent">
              <keep-alive>
                <component :is="item" />
              </keep-alive>
            </v-sheet>
          </v-tab-item>
        </v-tabs-items>
      </v-sheet>
    </v-container>
  </div>
</template>
<script>
import { authUser } from "@/data/dummyData";
import ProfileComponent from "@/views/Pages/Profile/components/index";

export default {
  components: {
    ...ProfileComponent,
  },
  data() {
    return {
      authUser,
      tab: 0,
      items: ["timeline", "about", "friends", "photos"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
};
</script>
