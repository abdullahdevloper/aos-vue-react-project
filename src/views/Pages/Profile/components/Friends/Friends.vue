<template>
  <v-sheet class="neu-glow-inset">
    <v-toolbar flat class="transparent">
      <v-toolbar-title
        v-if="!(this.$vuetify.breakpoint.smAndDown && showSearch)"
        >All Friends</v-toolbar-title
      >

      <v-spacer></v-spacer>
      <v-slide-y-transition>
        <v-btn
          class="box-glow mx-2"
          fab
          x-small
          dark
          @click="handleSearchVisibility()"
          v-if="!isSearchVisible"
        >
          <v-icon>search</v-icon>
        </v-btn>
        <v-text-field
          v-model="search"
          label="Search Friend"
          solo
          clear-icon="clear_all"
          :append-icon="$vuetify.breakpoint.smAndDown ? 'close' : ''"
          prepend-inner-icon="search"
          class="input-width-3x mr-3"
          dense
          @click:append="handleSearchVisibility()"
          hide-details
          clearable
          v-else
        ></v-text-field>
      </v-slide-y-transition>
    </v-toolbar>
    <v-container v-if="friends.length > 0">
      <v-fade-transition class="row " group tag="div">
        <template v-for="(friend, i) in friends">
          <v-col :key="`${friend.name}-horizcardlist-${i}`" cols="12" md="6">
            <v-card class="neu-glow-inset" v-if="!friend.hide">
              <div class="d-flex flex-no-wrap">
                <VuseNeuAvatar
                  :src="friend.avatar"
                  tile
                  class="ma-3"
                  outterDimention="120"
                  innerDimention="110"
                  size="100"
                />
                <div class="flex-grow-1">
                  <v-card-title v-text="friend.name"></v-card-title>

                  <v-card-subtitle v-text="friend.email"></v-card-subtitle>
                  <v-card-actions>
                    <v-btn
                      icon
                      @click="
                        () => {
                          friend.closedFriend = !friend.closedFriend;
                        }
                      "
                    >
                      <v-fab-transition>
                        <v-icon color="red" v-if="friend.closedFriend"
                          >favorite</v-icon
                        >
                        <v-icon color="red" v-else>favorite_border</v-icon>
                      </v-fab-transition>
                    </v-btn>
                    <v-btn
                      rounded
                      @click="unfriend(friend)"
                      title="Click to unfriend"
                    >
                      Unfriend
                    </v-btn>
                  </v-card-actions>
                </div>
              </div>
            </v-card>
          </v-col>
        </template>
      </v-fade-transition>
    </v-container>
  </v-sheet>
</template>

<script>
import { users } from "@/data/dummyData";

export default {
  data() {
    return {
      // Removed Authuser from DummyData List & refined the object tht fits to friend list ;)
      users: users
        .filter((user) => user.id !== 1)
        .map((friend) => {
          return {
            ...friend,
            closedFriend: Math.random() >= 0.5,
            hide: false,
          };
        }),
      search: null,
      showSearch: false,
    };
  },
  computed: {
    isSearchVisible: {
      get() {
        return !this.$vuetify.breakpoint.smAndDown || this.showSearch;
      },
      set(val) {
        this.showSearch = val;
      },
    },
    friends() {
      let list = this.users;
      if (this.search) {
        list = list.filter((user) => {
          return (
            user.firstname.toLowerCase().includes(this.search.toLowerCase()) ||
            user.lastname.toLowerCase().includes(this.search.toLowerCase()) ||
            user.email.toLowerCase().includes(this.search.toLowerCase()) ||
            String(user.phone)
              .toLowerCase()
              .includes(this.search.toLowerCase())
          );
        });
      }
      return list;
    },
  },

  methods: {
    unfriend(friend) {
      const index = this.users.findIndex((user) => user.id === friend.id);
      this.users.splice(index, 1);
    },
    handleSearchVisibility() {
      this.showSearch = !this.showSearch;
    },
  },
  beforeDestroy() {
    this.users = null;
    delete this.users;
  },
};
</script>
