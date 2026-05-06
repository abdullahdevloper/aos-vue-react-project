<template>
  <v-card max-width="374" class="neu-glow">
    <v-sheet height="250" color="transparent">
      <v-row
        align="center"
        justify="center"
        class="fill-height pos-absolute fill-width mx-0"
      >
        <audio controls class="audio-player neu-glow">
          <source
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            type="audio/mpeg"
          />
        </audio>
      </v-row>
      <v-row class="fill-height mx-0">
        <v-col align-self="start" cols="12" class="text-right">
          <v-btn x-small dark color="teal accent-3">06:12</v-btn>
        </v-col>
        <v-col align-self="end" cols="12" class="text-center">
          <div class="text-subtitle-1">Beach Party</div>
          <div class="text-overline">
            <v-icon small>query_builder</v-icon>
            {{ date | fulldate }}
          </div>
        </v-col>
      </v-row>
    </v-sheet>
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
<style scoped lang="scss">
.audio-player {
  border-radius: 30px;
  &:focus {
    outline: none;
  }
}
</style>
