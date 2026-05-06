<template>
  <v-toolbar flat color="transparent">
    <v-app-bar-nav-icon
      v-if="$vuetify.breakpoint.smAndDown && !drawer"
      @click="onToggleDrawer()"
    ></v-app-bar-nav-icon>
    <v-avatar
      size="35px"
      color="grey lighten-4"
      :class="$vuetify.breakpoint.smAndDown ? 'mx-3' : 'mr-3'"
    >
      <img :src="group.user.avatar" alt="avatar" />
    </v-avatar>
    <v-toolbar-title>{{ group.user.name }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu
      v-model="userDetailMenu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-card max-width="280" class="mx-auto">
        <v-img src="https://picsum.photos/630/280?image=618">
          <v-row class="fill-height ma-0">
            <v-col class="pa-0" cols="6">
              <v-avatar class="profile" color="grey" size="164" tile>
                <v-img :src="group.user.avatar"></v-img>
              </v-avatar>
            </v-col>
            <v-col class="pa-0 text-right" cols="6">
              <v-btn
                icon
                dark
                class="fx-close-model-btn"
                @click="userDetailMenu = false"
              >
                <v-icon>close</v-icon>
              </v-btn>
            </v-col>
            <v-col class="py-0">
              <v-list-item color="rgba(0, 0, 0, .4)" dark>
                <v-list-item-content>
                  <v-list-item-title class="text-h6"
                    >{{ group.user.firstname }}
                    {{ group.user.lastname }}</v-list-item-title
                  >
                  <v-list-item-subtitle>{{
                    group.user.designation
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-img>
        <v-divider></v-divider>
        <v-card-text>
          <h4>About</h4>
          <p>{{ group.user.mood }}</p>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    drawer: Boolean,
    group: Object,
    onToggleDrawer: Function,
  },
  data() {
    return {
      userDetailMenu: false,
    };
  },
};
</script>
