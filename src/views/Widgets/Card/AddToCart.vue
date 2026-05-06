<template>
  <cart-card v-bind="componentData" v-if="componentData">
    <div class="my-4 text-center">
      48 Hours of video with <span class="pink--text">Full Access</span>
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
        img: "/static/illustator/dragon.jpg",
        title: "Discover How to Design",
        stickyText: "$250",
        stickyBtnColor: "pink",
        actionText: "Add to Cart",
        actionBtnColor: "blue",
        actionEvent: () => {},
      },
    };
  },
  beforeDestroy() {
    this.componentData = null;
    delete this.componentData;
  },
};
</script>
