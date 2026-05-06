<template>
  <v-sheet class="neu-glow-inset">
    <v-card-text>
      <p class="text-h4 text--primary">
        Testimonials
      </p>
      <v-row class="ma-0" v-if="testimonials">
        <v-col
          cols="12"
          v-for="(item, i) in testimonials"
          :key="`${item.name}-testimonial-${i}`"
          class="px-0"
        >
          <horizontal-card v-bind="item" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-sheet>
</template>

<script>
import HorizontalCard from "@/components/UI/Card/HorizontalCard";
import { testimonials } from "@/data/dummyData";
export default {
  data() {
    return { testimonials };
  },
  components: { HorizontalCard },
  beforeDestroy() {
    this.testimonials = null;
    delete this.testimonials;
  },
};
</script>
