<template>
  <text-post v-bind="postData" v-if="postData">
    <div>
      Turns out semicolon-less style is easier and safer in TS because most
      gotcha edge cases are type invalid as well.
    </div>
  </text-post>
</template>

<script>
import { users } from "@/data/dummyData";
import TextPost from "@/components/UI/Widgets/Cards/Posts/TextPost";
export default {
  components: { TextPost },
  data() {
    return {
      postData: {
        name: users[12].name,
        avatar: users[12].avatar,
        likesCount: 213,
        commentsCount: 123,
      },
    };
  },
  beforeDestroy() {
    this.postData = null;
    delete this.postData;
  },
};
</script>
