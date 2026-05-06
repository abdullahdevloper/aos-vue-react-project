<template>
  <v-card max-width="374" class="neu-glow">
    <linear-progress-avatar color="red" size="25">
      <span class="white--text text-overline">PDF</span>
    </linear-progress-avatar>
    <v-card-title>
      Proposal Document
    </v-card-title>
    <v-card-text>
      <div>
        Incididunt amet est amet duis anim qui. Cillum deserunt ut eu nisi
        occaecat aliqua exercitation irure aute laboris. Duis et sit ullamco
        enim ad id et veniam anim irure id aute. Eu pariatur laborum cupidatat
        veniam magna. Laboris aute id Lorem nisi deserunt.
      </div>
      <v-row>
        <v-col>
          <v-icon>query_builder</v-icon>
          {{ date | fulldate }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import LinearProgressAvatar from "@/components/UI/ProgressBar/LinearProgressAvatar";

export default {
  components: { LinearProgressAvatar },
  data() {
    return {
      date: new Date(),
    };
  },
};
</script>
