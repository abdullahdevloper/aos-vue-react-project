<template>
  <flex-list v-bind="componentProps" v-if="componentProps" />
</template>
<script>
import { users } from "@/data/dummyData";
import subDays from "date-fns/subDays";
import format from "date-fns/format";
import FlexList from "@/components/UI/List/FlexList/FlexList";

export default {
  components: { FlexList },
  data() {
    return {
      componentProps: {
        title: "Monthly Best Sellers",
        list: [
          {
            title: users[8].name,
            body: format(subDays(new Date(), 5), "MMM dd, yyyy"),
            avatar: {
              src: users[8].avatar,
            },
            action: {
              chip: "208 sales",
              style: {
                small: true,
                color: "green",
                textColor: "white",
              },
            },
          },
          {
            title: users[12].name,
            body: format(subDays(new Date(), 7), "MMM dd, yyyy"),
            avatar: {
              src: users[12].avatar,
            },
            action: {
              chip: "167 sales",
              style: {
                small: true,
                color: "green",
                textColor: "white",
              },
            },
          },
          {
            title: users[4].name,
            body: format(subDays(new Date(), 8), "MMM dd, yyyy"),
            avatar: {
              src: users[4].avatar,
            },
            action: {
              chip: "123 sales",
              style: {
                small: true,
                color: "green",
                textColor: "white",
              },
            },
          },
          {
            title: users[5].name,
            body: format(subDays(new Date(), 9), "MMM dd, yyyy"),
            avatar: {
              src: users[5].avatar,
            },
            action: {
              chip: "105 sales",
              style: {
                small: true,
                color: "green",
                textColor: "white",
              },
            },
          },
          {
            title: users[1].name,
            body: format(subDays(new Date(), 9), "MMM dd, yyyy"),
            avatar: {
              src: users[1].avatar,
            },
            action: {
              chip: "104 sales",
              style: {
                small: true,
                color: "green",
                textColor: "white",
              },
            },
          },
        ],
        alignItems: "center",
      },
    };
  },
  beforeDestroy() {
    this.componentProps = null;
    delete this.componentProps;
  },
};
</script>
