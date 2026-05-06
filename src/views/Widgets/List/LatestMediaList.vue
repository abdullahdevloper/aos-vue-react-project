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
        title: "Latest Media",
        list: [
          {
            title: users[8].name,
            body: format(subDays(new Date(), 5), "MMM dd, yyyy"),
            img: {
              src: "/static/e-commerce/shoe-revolt-unsplash.webp",
              style: {
                width: "100",
                contain: true,
                class: "with-radius",
              },
            },
            action: {
              chip: "Published",
              style: {
                small: true,
                color: "teal accent-3",
                textColor: "white",
                label: true,
              },
            },
          },
          {
            title: users[8].name,
            body: format(subDays(new Date(), 5), "MMM dd, yyyy"),
            img: {
              src: "/static/e-commerce/apple-teal.webp",
              style: {
                width: "100",
                contain: true,
                class: "with-radius",
              },
            },
            action: {
              chip: "Published",
              style: {
                small: true,
                color: "teal accent-3",
                textColor: "white",
                label: true,
              },
            },
          },
          {
            title: users[8].name,
            body: format(subDays(new Date(), 5), "MMM dd, yyyy"),
            img: {
              src: "/static/e-commerce/strawberry.webp",
              style: {
                width: "100",
                contain: true,
                class: "with-radius",
              },
            },
            action: {
              chip: "Progress",
              style: {
                small: true,
                color: "amber accent-3",
                textColor: "white",
                label: true,
              },
            },
          },
          {
            title: users[8].name,
            body: format(subDays(new Date(), 5), "MMM dd, yyyy"),
            img: {
              src: "/static/e-commerce/heinz-mustard.webp",
              style: {
                width: "100",
                contain: true,
                class: "with-radius",
              },
            },
            action: {
              chip: "Rejected",
              style: {
                small: true,
                color: "red",
                textColor: "white",
                label: true,
              },
            },
          },
          {
            title: users[8].name,
            body: format(subDays(new Date(), 5), "MMM dd, yyyy"),
            img: {
              src: "/static/e-commerce/coffee-yellow-cup.webp",
              style: {
                width: "100",
                contain: true,
                class: "with-radius",
              },
            },
            action: {
              chip: "Published",
              style: {
                small: true,
                color: "teal accent-3",
                textColor: "white",
                label: true,
              },
            },
          },
          {
            title: users[9].name,
            body: format(subDays(new Date(), 5), "MMM dd, yyyy"),
            img: {
              src: "/static/e-commerce/nike-red-shoe.webp",
              style: {
                width: "100",
                contain: true,
                class: "with-radius",
              },
            },
            action: {
              chip: "Published",
              style: {
                small: true,
                color: "teal accent-3",
                textColor: "white",
                label: true,
              },
            },
          },
        ],
        alignItems: "start",
      },
    };
  },
  beforeDestroy() {
    this.componentProps = null;
    delete this.componentProps;
  },
};
</script>
