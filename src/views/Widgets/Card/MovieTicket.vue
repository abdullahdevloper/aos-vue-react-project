<template>
  <cart-card v-bind="componentData" v-if="componentData">
    <div class="my-4 text-center">
      After Thanos, an intergalactic warlord, disintegrates half of the
      universe, the Avengers must reunite and assemble again to reinvigorate
      their trounced allies and restore balance.
    </div>
  </cart-card>
</template>
<script>
import CartCard from "@/components/UI/Widgets/Cards/E-Commerce/CartCard";
export default {
  components: { CartCard },
  data() {
    return {
      componentData: {
        img: "/static/movies/Avengers-EndGame.jpg",
        title: "Avengers: Endgame",
        cost: "$250",
        stickyText: "0.8",
        fabIcon: "bookmark",
        actionText: "Ticket Available",
        actionBtnColor: "secondary",
        stickyBtnColor: "pink",
        actionEvent: () => {},
        fab: true,
      },
    };
  },
  beforeDestroy() {
    this.componentData = null;
    delete this.componentData;
  },
};
</script>
