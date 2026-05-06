<template>
  <div class="vuse-content-wrapper">
    <vuse-section-definition
      :title="page"
      icon="card_giftcard"
      :breadcrumbs="breadcrumbs"
    />
    <v-container fluid>
      <v-row justify="space-between">
        <v-col cols="12" md="4">
          <movie-ticket class="mb-6" />
          <course-card class="mb-6" />
          <blog-post-card class="mb-6" />
          <user-follow-card />
        </v-col>
        <v-col cols="12" md="4">
          <add-to-cart class="mb-6" />
          <shoe-card class="mb-6" />
          <article-post-card class="mb-6" />
          <user-profile-card />
        </v-col>
        <v-col cols="12" md="4">
          <product-card class="mb-6" />
          <tiny-post class="mb-6" />
          <user-profile-card-alternative class="mb-6" />
          <user-profile-card-another class="mb-6" />
          <user-utilization />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import MovieTicket from "./MovieTicket";
import AddToCart from "./AddToCart";
import BlogPostCard from "./BlogPostCard";
import ArticlePostCard from "./ArticlePostCard";
import ProductCard from "./ProductCard";
import ShoeCard from "./ShoeCard";
import CourseCard from "./CourseCard";
import TinyPost from "./TinyPost";
import UserFollowCard from "./UserFollowCard";
import UserProfileCard from "./UserProfileCard";
import UserUtilization from "./UserUtilization";
import UserProfileCardAlternative from "./UserProfileCardAlternative";
import UserProfileCardAnother from "./UserProfileCardAnother";
export default {
  components: {
    MovieTicket,
    AddToCart,
    CourseCard,
    BlogPostCard,
    ArticlePostCard,
    ProductCard,
    ShoeCard,
    UserFollowCard,
    UserProfileCard,
    UserUtilization,
    UserProfileCardAlternative,
    UserProfileCardAnother,
    TinyPost,
  },
  data() {
    return {
      page: "Card Widgets",
      breadcrumbs: [
        {
          text: "Widgets",
          disabled: false,
          to: {
            path: "/widgets/cards/basic",
          },
        },
        {
          text: "Card",
          disabled: true,
        },
      ],
    };
  },
};
</script>
