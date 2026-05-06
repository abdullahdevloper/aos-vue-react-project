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
        title: "Tickets",
        list: [
          {
            title: "[PRE-110] Project Scoping & Estimation",
            body:
              "Culpa sint aliqua adipisicing officia aliquip excepteur occaecat dolor velit culpa ullamco.",
            isCompleted: true,
            tags: [
              {
                name: "In Progress",
                color: "blue",
                textColor: "white",
              },
            ],
          },
          {
            title: "[PRE-111] Logo Making",
            body:
              "Culpa sint aliqua adipisicing officia aliquip excepteur occaecat dolor velit culpa ullamco.",
            isCompleted: false,
            tags: [
              {
                name: "UX/UI",
                color: "pink lighten-2",
                textColor: "white",
              },
            ],
          },
          {
            title: "[PRE-112] Sprint Planning",
            body:
              "Sint officia aute incididunt dolor sit consectetur laborum consequat est adipisicing veniam dolor.",
            isCompleted: true,
            tags: [
              {
                name: "Backlog",
                color: "amber",
                textColor: "white",
              },
            ],
          },
          {
            title: "[UI-145] WireFrames and Design",
            body:
              "Minim fugiat labore est enim consectetur anim commodo irure reprehenderit est.",
            isCompleted: false,
            tags: [
              {
                name: "FrontEnd",
                color: "blue",
                textColor: "white",
              },
            ],
          },
          {
            title: "[SV-180] Gather API requirement",
            body:
              "Officia consectetur consectetur adipisicing consectetur commodo enim tempor nulla reprehenderit occaecat.",
            isCompleted: false,
            tags: [
              {
                name: "Backend",
                color: "grey",
                textColor: "white",
              },
            ],
          },
        ],
        enableCreateNew: true,
        filterable: true,
        showTags: true,
      },
    };
  },
  beforeDestroy() {
    this.componentProps = null;
    delete this.componentProps;
  },
};
</script>
