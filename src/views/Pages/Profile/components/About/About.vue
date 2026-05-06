<template>
  <v-row>
    <v-col cols="12" md="4">
      <two-lines-items v-bind="overview" v-if="overview" />
      <two-lines-items v-bind="workEducation" v-if="workEducation" />
      <horizontal-card-list v-bind="pages" v-if="pages" />
    </v-col>
    <v-col cols="12" md="8">
      <!-- Photos Followers and Followings -->
      <statistics />
      <!-- Biography -->
      <biography />
      <!-- Skills -->
      <skills />
      <testimonials />
    </v-col>
  </v-row>
</template>

<script>
import { authUser, pages } from "@/data/dummyData";
// Components
import TwoLinesItems from "@/components/UI/List/TwoLinesItems";
import HorizontalCardList from "@/components/UI/List/HorizontalCardList";
// Partial Views
import partials from "./partials/index";

export default {
  data() {
    return {
      authUser,
      overview: {
        title: "overview",
        icon: "info",
        items: [
          {
            title: "Lead. UI/UX Designer at Hexesis",
            subtitle: "Past: ABC Technologies",
            icon: "business",
            iconColor: "blue",
          },
          {
            title: "Master Degree at Oxford University",
            subtitle: "June 2012",
            icon: "school",
            iconColor: "blue-grey",
          },
          {
            title: "Los Angeles, California",
            subtitle: "From New York",
            icon: "house",
            iconColor: "pink",
          },
          {
            title: "Phone",
            subtitle: "+1 2245721247",
            icon: "call",
            iconColor: "blue darken-4",
          },
          {
            title: "Website",
            subtitle: `<a
            href="http://hexesis.com"
            target="_blank"
          >http://hexesis.com</a>`,
            icon: "language",
            iconColor: "light-blue",
          },
        ],
      },
      workEducation: {
        title: "Work",
        icon: "business",
        iconColor: "blue",
        items: [
          {
            title: "Face Ltd",
            subtitle: "Sr. UI/UX Designer, Nov 2018 - Present",
            icon: "face",
            iconColor: "amber",
          },
          {
            title: "Doddle Ltd",
            subtitle: "Sr. UI/UX Designer, Sept 2016 - Nov 2018",
            icon: "android",
            iconColor: "green",
          },
          {
            title: "Polymer Ltd.",
            subtitle: "UI/UX Designer, Jun 2014 - Aug 2016",
            icon: "polymer",
            iconColor: "blue darken-5",
          },
          {
            title: "Pet Shop",
            subtitle: "Store Assistant",
            icon: "pets",
            iconColor: "orange",
          },
          {
            title: "Green Ozon Foundation",
            subtitle: "Founder",
            icon: "nature",
            iconColor: "green accent-5",
          },
        ],
      },
      pages: {
        title: "Pages",
        icon: "pages",
        toolbar: {
          leftIcon: "pages",
          color: "transparent",
        },
        iconColor: "blue-grey darken-1",
        items: pages,
      },
    };
  },
  components: {
    TwoLinesItems,

    HorizontalCardList,
    ...partials,
  },
  beforeDestroy() {
    this.overview = null;
    this.workEducation = null;
    this.pages = null;
    delete this.overview;
    delete this.workEducation;
    delete this.pages;
  },
};
</script>
