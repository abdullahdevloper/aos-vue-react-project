<template>
  <user-social-card v-bind="cardData" class="mb-6" v-if="cardData" />
</template>

<script>
import UserSocialCard from "@/components/UI/Widgets/Cards/User/UserSocialCard";
import { users } from "@/data/dummyData";
export default {
  components: { UserSocialCard },
  data() {
    return {
      cardData: {
        name: users[8].name,
        avatar: users[8].avatar,
        avatarSize: 120,
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
