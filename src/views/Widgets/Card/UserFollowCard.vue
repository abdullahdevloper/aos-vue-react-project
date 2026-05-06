<template>
  <user-profile-card v-bind="cardData" v-if="cardData" />
</template>

<script>
import UserProfileCard from "@/components/UI/Widgets/Cards/User/UserProfileCard";
import { users } from "@/data/dummyData";
export default {
  components: { UserProfileCard },
  data() {
    return {
      cardData: {
        name: users[7].name,
        avatar: users[7].avatar,
        coverPic: "https://picsum.photos/500/300?image=512",
        coverLazyPic: "https://picsum.photos/10/6?image=512",
        location: "Los Angeles, California",
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
