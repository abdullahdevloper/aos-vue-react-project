<template>
  <v-card :max-width="maxWidth" class="neu-glow">
    <v-img :height="imgHeight" :src="img" v-if="img"> </v-img>

    <v-card-text>
      <v-row justify="space-between" align="center" class="mx-0">
        <div>
          <div class="text-subtitle-1 font-weight-bold">{{ title }}</div>
          <v-rating
            :value="ratings"
            dense
            size="15"
            readonly
            :color="ratingsColor"
          ></v-rating>
        </div>
        <div>
          <span class="mx-2 text-line-through" v-if="marketCost">{{
            marketCost
          }}</span
          ><span class="text-subtitle-2" v-if="offerCost">{{ offerCost }}</span>
        </div>
      </v-row>
      <slot />
    </v-card-text>

    <v-card-actions>
      <v-row justify="center" align="center" class="mb-3">
        <v-btn color="secondary" rounded @click="actionEvent">
          {{ actionText }}
        </v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    maxWidth: {
      type: [String, Number],
      default: "",
    },
    imgHeight: {
      type: [String, Number],
      default: 250,
    },
    img: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    marketCost: {
      type: [String, Number],
      default: null,
    },
    offerCost: {
      type: [String, Number],
      default: null,
    },
    ratings: {
      type: Number,
      default: null,
    },
    ratingsColor: {
      type: String,
      default: "primary",
    },
    actionText: {
      type: String,
      default: null,
    },
    actionEvent: {
      type: Function,
      default: () => {},
    },
  },
};
</script>
