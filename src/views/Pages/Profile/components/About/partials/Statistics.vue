<template>
  <v-sheet class="neu-glow-inset mb-5">
    <v-row class="ma-0">
      <v-col
        cols="12"
        md="4"
      >
        <horizontal-card
          icon="photo"
          title="365"
          subtitle="Photos"
          mediaSize="50"
          color="neu-glow-inset-primary"
          iconColor="primary"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <horizontal-card
          icon="how_to_reg"
          title="845"
          subtitle="Followers"
          mediaSize="50"
          color="neu-glow-inset-primary"
          iconColor="blue"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <horizontal-card
          icon="favorite"
          title="612"
          subtitle="Following"
          mediaSize="50"
          color="neu-glow-inset-primary"
          iconColor="pink"
        />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import HorizontalCard from '@/components/UI/Card/HorizontalCard';
export default {
  components: { HorizontalCard }
}
</script>