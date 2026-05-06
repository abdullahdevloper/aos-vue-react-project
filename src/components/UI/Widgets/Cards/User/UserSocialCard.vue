<template>
  <v-card :max-width="maxWidth" class="neu-glow">
    <v-img :src="coverPic" :lazy-src="coverLazyPic" v-if="coverPic"> </v-img>

    <v-card-text class="text-center pos-relative">
      <v-row
        :class="coverPic ? 'profile-row' : ''"
        justify="center"
        v-if="avatar"
      >
        <vuse-neu-avatar
          :src="avatar"
          glowClass="neu-glow-inset"
          :size="avatarSize"
          :tile="tile"
        />
      </v-row>

      <div
        class="text-h6 font-weight-bold"
        :class="coverPic ? 'mt-10' : 'mt-3'"
      >
        {{ name }}
      </div>
      <div v-if="location">{{ location }}</div>
      <v-sheet class="d-flex justify-center transparent mt-2" v-if="socialBtns">
        <v-btn
          fab
          small
          class="mx-2 lighten-5 neu-glow"
          :color="socialBtn.color"
          target="_blank"
          :href="socialBtn.href"
          v-for="(socialBtn, i) in socialBtns"
          :key="`${socialBtn.icon}-social-${i}`"
        >
          <v-icon small :color="socialBtn.color">{{ socialBtn.icon }}</v-icon>
        </v-btn>
      </v-sheet>
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
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
const socialSet = {
  facebook: {
    icon: "fa-facebook",
    color: "purple",
  },
  twitter: {
    icon: "fa-twitter",
    color: "blue",
  },
  instagram: {
    icon: "fa-instagram",
    color: "pink",
  },
  linkedin: {
    icon: "fa-linkedin",
    color: "indigo",
  },
  mail: {
    icon: "mail",
    color: "cyan ",
  },
};
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
    avatarSize: {
      type: [String, Number],
      default: 80,
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
      default: "Add Friend",
    },
    socialLinks: {
      type: Object,
      default: null,
    },
    tile: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    socialBtns() {
      const socialLinks = this.socialLinks;
      return (
        socialLinks &&
        Object.keys(socialLinks).map((item) => {
          return {
            ...socialSet[item],
            href:
              item != "mail"
                ? socialLinks[item]
                : `mailto:${socialLinks[item]}`,
          };
        })
      );
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
