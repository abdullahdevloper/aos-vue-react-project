<template>
  <v-card max-width="374" class="neu-glow" dark>
    <v-img
      :src="`https://picsum.photos/500/300?image=271`"
      :lazy-src="`https://picsum.photos/10/6?image=271`"
    >
      <v-row class="fill-height mx-0">
        <v-col align-self="start" cols="12" class="text-right">
          <v-btn x-small>25MB</v-btn>
        </v-col>
        <v-col align-self="end" cols="12">
          <div class="text-caption">Bride At Night</div>
          <div class="text-overline">
            <v-icon small>query_builder</v-icon>
            {{ date | fulldate }}
          </div>
        </v-col>
      </v-row>
    </v-img>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
    };
  },
};
</script>
