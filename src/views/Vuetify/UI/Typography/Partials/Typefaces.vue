<template>
  <v-card class="pa-12 hidden-sm-and-down" flat>
    <v-layout
      v-for="(type, i) in typefaces"
      :key="i"
      my-4
      align-center
      justify-space-between
      wrap
    >
      <v-flex :class="type[1]" v-html="type[0]" />
      <v-flex hidden-md-and-down text-right text-uppercase grey--text>
        {{ type[2] }}
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    typefaces: [
      ["Quantum Mechanics", "text-h2", "Regular"],
      [
        '6.626069x10<sup class="text-h3 font-weight-light mt-6">-34</sup>',
        "d-flex align-start text-h1 font-weight-thin",
        "Thin",
      ],
      [
        "One hundred percent cotton bond",
        "text-h4 font-italic font-weight-bold",
        "Bold italic",
      ],
      ["Quasiparticles", "text-h1 font-weight-bold", "Bold"],
      [
        "It became the non-relativistic limit of quantum field theory",
        "title",
        "Condensed",
      ],
      ["PAPERCRAFT", "text-h1 font-weight-light font-italic", "Light italic"],
      [
        "Probabilistic wave - particle wavefunction orbital path",
        "title font-italic font-weight-medium",
        "Medium italic",
      ],
      ["ENTANGLED", "text-h1 font-weight-black", "Black"],
      [
        "Cardstock 80lb ultra-bright orange",
        "text-h4 font-weight-medium",
        "Medium",
      ],
      ["STATIONERY", "text-h1 font-weight-thin", "Thin"],
      [
        "POSITION, MOMENTUM & SPIN",
        "text-h3 font-weight-light",
        "Condensed Light",
      ],
    ],
  }),
};
</script>
