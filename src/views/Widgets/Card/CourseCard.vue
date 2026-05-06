<template>
  <course-card v-bind="courseData" v-if="courseData" />
</template>

<script>
import { users } from "@/data/dummyData";

import CourseCard from "@/components/UI/Widgets/Cards/Others/CourseCard";
export default {
  components: { CourseCard },
  data() {
    return {
      user: users[12],
      courseData: {
        thumbnail: "/static/illustator/design_community.png",
        subtitle: "Design",
        title: "Design Principle",
        name: users[12].name,
        info: "4 of 8 Lessons",
        progress: 50,
      },
    };
  },
  beforeDestroy() {
    this.courseData = null;
    delete this.courseData;
  },
};
</script>
