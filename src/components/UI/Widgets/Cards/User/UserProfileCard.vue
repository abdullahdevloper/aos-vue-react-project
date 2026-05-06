<template>
  <v-card :max-width="maxWidth" class="neu-glow">
    <v-img :src="coverPic" :lazy-src="coverLazyPic" v-if="coverPic"> </v-img>

    <v-card-text class="text-center pos-relative">
      <v-row class="profile-row" justify="center" v-if="avatar">
        <vuse-neu-avatar
          :src="avatar"
          glowClass="neu-glow-inset"
          size="80"
          innerDimention="80"
          outterDimention="95"
        />
      </v-row>

      <div class="text-h6 font-weight-bold mt-10">{{ name }}</div>
      <div v-if="location">{{ location }}</div>
    </v-card-text>
    <v-card-actions>
      <v-row justify="center" align="center" class="mb-3">
        <v-btn
          color="secondary"
          rounded
          @click="actionEvent()"
          class="mx-3 neu-glow"
        >
          {{ actionText }}
        </v-btn>
        <v-btn fab small @click="fabBtnEvent()" class="neu-glow">
          <v-icon small color="primary">{{ fabIcon }}</v-icon>
        </v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    maxWidth: {
      type: [String, Number],
      default: "",
    },
    coverPic: {
      type: String,
      default: null,
    },
    coverLazyPic: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    actionEvent: {
      type: Function,
      default: () => {},
    },
    actionText: {
      type: String,
      default: "Follow",
    },
    fabIcon: {
      type: String,
      default: "message",
    },
    fabBtnEvent: {
      type: Function,
      default: () => {},
    },
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
