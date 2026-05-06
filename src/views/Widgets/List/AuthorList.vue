<template>
  <searchable-list v-bind="componentProps" v-if="componentProps" />
</template>

<script>
import { users } from "@/data/dummyData";
import SearchableList from "@/components/UI/Widgets/Lists/SearchableList";
export default {
  components: { SearchableList },
  data() {
    return {
      componentProps: {
        list: [
          {
            title: users[4].name,
            subtitle: "VueJS, Laravel",
            avatar: {
              src: users[4].avatar,
            },
            action: {
              btn: {
                icon: "favorite",
                style: {
                  small: true,
                  color: "red",
                },
              },
              style: {
                icon: true,
                xSmall: true,
              },
            },
          },
          {
            title: users[8].name,
            subtitle: "MySQL, MongoDB, Laravel",
            avatar: {
              src: users[8].avatar,
            },
            action: {
              btn: {
                icon: "favorite",
                style: {
                  small: true,
                  color: "red",
                },
              },
              style: {
                icon: true,
                xSmall: true,
              },
            },
          },
          {
            title: users[15].name,
            subtitle: "React, Redux, Redux-Saga",
            avatar: {
              src: users[15].avatar,
            },
            action: {
              btn: {
                icon: "favorite",
                style: {
                  small: true,
                  color: "red",
                },
              },
              style: {
                icon: true,
                xSmall: true,
              },
            },
          },
          {
            title: users[11].name,
            subtitle: "Atomic Design",
            avatar: {
              src: users[11].avatar,
            },
            action: {
              btn: {
                icon: "favorite_border",
                style: {
                  small: true,
                  color: "red",
                },
              },
              style: {
                icon: true,
                xSmall: true,
              },
            },
          },
          {
            title: users[14].name,
            subtitle: "GraphQL, Apollo, ReactJS",
            avatar: {
              src: users[14].avatar,
            },
            action: {
              btn: {
                icon: "favorite",
                style: {
                  small: true,
                  color: "red",
                },
              },
              style: {
                icon: true,
                xSmall: true,
              },
            },
          },
        ],
        title: "Authors",
      },
    };
  },
  beforeDestroy() {
    this.componentProps = null;
    delete this.componentProps;
  },
};
</script>
