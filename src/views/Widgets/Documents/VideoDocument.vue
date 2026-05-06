<template>
  <v-card max-width="374" class="neu-glow" dark>
    <v-img
      :src="`https://picsum.photos/500/300?image=501`"
      :lazy-src="`https://picsum.photos/10/6?image=501`"
      class="relative"
    >
      <v-row
        align="center"
        justify="center"
        class="fill-height pos-absolute fill-width mx-0"
      >
        <v-btn fab>
          <v-icon>play_arrow</v-icon>
        </v-btn>
      </v-row>
      <v-row class="fill-height mx-0">
        <v-col align-self="start" cols="12" class="text-right">
          <v-btn x-small>01:28</v-btn>
        </v-col>
        <v-col align-self="end" cols="12">
          <div class="text-caption">Beach Party</div>
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
