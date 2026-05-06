<template>
  <v-card
    :max-width="maxWidth"
    class="neu-glow"
  >
    <v-img
      height="200px"
      :src="thumbnail"
      :lazy-src="thumbnailLazy"
      contain
      class="grey lighten-3"
      v-if="thumbnail"
    ></v-img>
    <div class="pos-relative">
      <v-btn
        absolute
        dark
        fab
        bottom
        right
        color="secondary"
      >
        <v-icon>play_arrow</v-icon>
      </v-btn>
    </div>
    <v-card-subtitle class="pb-0">{{subtitle}}</v-card-subtitle>
    <v-card-title>{{title}}</v-card-title>

    <v-card-text class="pos-relative">

      <div class="text--primary">{{name}}</div>
      <v-row
        justify="space-between"
        align="center"
      >
        <v-col cols="9">{{info}}</v-col>
        <v-col cols="3">
          <v-progress-linear
            :value='progress'
            color="primary"
            rounded
            height="8"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-card-text>

  </v-card>
</template>

<script>
export default {
  props: {
    maxWidth: {
      type: [String, Number],
      default: ""
    },
    thumbnail: {
      type: String,
      default: null
    },
    thumbnailLazy: {
      type: String,
      default: null
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    info: {
      type: String,
      default: null
    },
    progress: {
      type: [String, Number],
      default: 0
    }
  }
};
</script>