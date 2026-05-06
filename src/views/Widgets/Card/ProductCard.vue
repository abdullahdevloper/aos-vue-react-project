<template>
  <product-details-card v-bind="componentData" v-if="componentData">
    <div>
      The Fancy-Beats Noise Cancelling Headphones are currently the best
      headphones and have a sexy new design and cool features that come with its
      high price tag.
    </div>
  </product-details-card>
</template>
<script>
import ProductDetailsCard from "@/components/UI/Widgets/Cards/E-Commerce/ProductDetailsCard";
export default {
  components: { ProductDetailsCard },
  data() {
    return {
      componentData: {
        img: "/static/e-commerce/headphone-fancy-yellow.webp",
        title: "Fancy Headphone",
        marketCost: "$349",
        offerCost: "$250",
        actionText: "Add to Cart",
        ratings: 3,
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
