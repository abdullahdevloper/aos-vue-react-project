<template>
  <user-social-card v-bind="cardData" v-if="cardData" />
</template>

<script>
import UserSocialCard from "@/components/UI/Widgets/Cards/User/UserSocialCard";
import { users } from "@/data/dummyData";
export default {
  components: { UserSocialCard },
  data() {
    return {
      cardData: {
        name: users[9].name,
        avatar: users[9].avatar,
        coverPic: "https://picsum.photos/500/300?image=188",
        coverLazyPic: "https://picsum.photos/10/6?image=188",
        // avatarSize: 120,
        location: "Los Angeles, California",
        socialLinks: {
          facebook: "#",
          twitter: "#",
          instagram: "#",
          mail: "example@hotmail.com",
        },
      },
    };
  },
  beforeDestroy() {
    this.cardData = null;
    delete this.cardData;
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
