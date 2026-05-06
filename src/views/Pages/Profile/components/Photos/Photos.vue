<template>
  <v-sheet class="neu-glow-inset px-3">
    <div v-if="!isFullscreen">
      <v-fade-transition class="row " group tag="div">
        <template v-for="n in 18">
          <v-col :key="`${n}-pictures-col`" cols="12" md="3">
            <v-hover v-slot:default="{ hover }">
              <v-card flat tile>
                <v-img
                  :src="`https://picsum.photos/500/300?image=${n * 6 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${n * 6 + 10}`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <v-expand-transition>
                    <div
                      class="d-flex transition-fast-in-fast-out primary darken-2 v-card--reveal text-h2 white--text justify-center align-center"
                      style="height: 100%;"
                      v-if="hover"
                    >
                      <v-btn
                        fab
                        color="secondary"
                        @click="switchFullscreenMod(n - 1)"
                      >
                        <v-icon x-large>fullscreen</v-icon>
                      </v-btn>
                    </div>
                  </v-expand-transition>
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </v-fade-transition>
    </div>
    <div class="py-3" v-else>
      <v-carousel v-model="carousel" hide-delimiters>
        <v-carousel-item v-for="n in 18" :key="`${n}-pictures-carousel`">
          <v-hover v-slot:default="{ hover }">
            <v-sheet height="100%" tile>
              <v-img
                :src="`https://picsum.photos/1024/720?image=${n * 6 + 10}`"
                :lazy-src="`https://picsum.photos/10/6?image=${n * 6 + 10}`"
                :aspect-ratio="16 / 9"
                class="grey lighten-2"
              >
                <v-fab-transition>
                  <v-btn
                    fab
                    absolute
                    color="red"
                    right
                    small
                    class="mt-2"
                    @click="switchFullscreenMod()"
                    v-if="hover"
                  >
                    <v-icon>fullscreen_exit</v-icon>
                  </v-btn>
                </v-fab-transition>
              </v-img>
            </v-sheet>
          </v-hover>
        </v-carousel-item>
      </v-carousel>
    </div>
  </v-sheet>
</template>
<script>
export default {
  data() {
    return {
      isFullscreen: false,
      carousel: 0,
    };
  },
  methods: {
    switchFullscreenMod(val = 0) {
      this.isFullscreen = !this.isFullscreen;
      this.carousel = val;
    },
  },
};
</script>
<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
