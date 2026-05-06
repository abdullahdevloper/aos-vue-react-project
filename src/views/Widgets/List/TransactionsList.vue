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
        title: "Transations",
        list: [
          {
            title: users[10].name,
            body: format(subDays(new Date(), 5), "MMM dd, yyyy"),
            avatar: {
              src: users[10].avatar,
            },
            action: {
              text: "+607",
              style: {
                class: "green--text",
              },
            },
          },
          {
            title: users[14].name,
            body: format(subDays(new Date(), 7), "MMM dd, yyyy"),
            avatar: {
              src: users[14].avatar,
            },
            action: {
              text: "-106",
              style: {
                class: "red--text",
              },
            },
          },
          {
            title: users[9].name,
            body: format(subDays(new Date(), 8), "MMM dd, yyyy"),
            avatar: {
              src: users[9].avatar,
            },
            action: {
              text: "+106",
              style: {
                class: "green--text",
              },
            },
          },
          {
            title: users[13].name,
            body: format(subDays(new Date(), 9), "MMM dd, yyyy"),
            avatar: {
              src: users[13].avatar,
            },
            action: {
              text: "+116",
              style: {
                class: "green--text",
              },
            },
          },
          {
            title: users[3].name,
            body: format(subDays(new Date(), 9), "MMM dd, yyyy"),
            avatar: {
              avatarStyle: {
                color: "blue",
                class: "neu-glow white--text",
              },
              text: "CL",
            },
            action: {
              text: "+105",
              style: {
                class: "green--text",
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
