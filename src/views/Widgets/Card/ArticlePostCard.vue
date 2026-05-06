<template>
  <article-post v-bind="postData" v-if="postData">
    <div>
      Turns out semicolon-less style is easier and safer in TS because most
      gotcha edge cases are type invalid as well.
    </div>
  </article-post>
</template>

<script>
import { users } from "@/data/dummyData";
import ArticlePost from "@/components/UI/Widgets/Cards/Posts/ArticlePost";
import subDays from "date-fns/subDays";

export default {
  components: { ArticlePost },
  data() {
    return {
      postData: {
        name: users[13].name,
        avatar: users[13].avatar,
        title: "Salad Recipes",
        thumbnail: "https://picsum.photos/500/300?image=292",
        thumbnailLazy: "https://picsum.photos/10/6?image=292",
        likesCount: 213,
        commentsCount: 123,
        publishedOn: subDays(new Date(), 5),
      },
    };
  },
  beforeDestroy() {
    this.postData = null;
    delete this.postData;
  },
};
</script>
