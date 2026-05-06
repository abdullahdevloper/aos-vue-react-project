<template>
  <v-sheet class="neu-glow-inset mb-3">
    <v-toolbar
      dense
      flat
      color="transparent"
    >
      <v-btn
        icon
        color="secondary"
      >
        <v-icon>insert_photo</v-icon>
      </v-btn>
      <v-toolbar-title>Photos</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid>
      <v-row>
        <v-col
          v-for="n in 9"
          :key="n"
          class="d-flex child-flex"
          cols="4"
        >
          <v-card
            flat
            tile
            class="d-flex neu-glow-inset with-radius"
          >
            <v-img
              :src="`https://picsum.photos/500/300?image=${n * 6 + 10}`"
              :lazy-src="`https://picsum.photos/10/6?image=${n * 6 + 10}`"
              aspect-ratio="1"
              class="grey lighten-2"
            >
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
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>