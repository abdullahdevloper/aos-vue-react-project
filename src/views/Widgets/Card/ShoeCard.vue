<template>
  <fab-icon-card v-bind="data" v-if="data">
    <div>Men's Shoe <span class="pink--text"> $189.99</span></div>
    <div><b>Size</b>: 6 US</div>
  </fab-icon-card>
</template>
<script>
import FabIconCard from "@/components/UI/Widgets/Cards/E-Commerce/FabIconCard";

export default {
  components: { FabIconCard },
  data() {
    return {
      data: {
        img: "/static/e-commerce/shoe-revolt-unsplash.webp",
        fabIcon: "shopping_cart",
        fabColor: "cyan",
        title: "Nike Revolt",
      },
    };
  },
  beforeDestroy() {
    this.data = null;
    delete this.data;
  },
};
</script>
