<template>
  <check-list v-bind="componentProps" v-if="componentProps" />
</template>
<script>
import CheckList from "@/components/UI/Widgets/Lists/CheckList/CheckList";
export default {
  components: { CheckList },
  data() {
    return {
      componentProps: {
        title: "Todo",
        list: [
          {
            title: "Project Scoping & Estimation",
            body: "Due in 1 day",
            isCompleted: false,
            tags: [
              {
                color: "info",
              },
            ],
          },
          {
            title: "Sprint Planning",
            body: "Due in 2 day",
            isCompleted: false,
            tags: [
              {
                color: "warning",
              },
            ],
          },
          {
            title: "WireFrames and Design",
            body: "Due in 1Wk",
            isCompleted: false,
            tags: [
              {
                color: "error",
              },
            ],
          },
          {
            title: "Gather API requirement",
            body: "Due in 10 Days",
            isCompleted: false,
            tags: [
              {
                color: "success",
              },
            ],
          },
        ],
      },
    };
  },
  beforeDestroy() {
    this.componentProps = null;
    delete this.componentProps;
  },
};
</script>
