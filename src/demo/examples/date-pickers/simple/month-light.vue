<template>
  <v-row align="center">
    <v-col cols="12">
      <v-checkbox v-model="landscape" label="Landscape"></v-checkbox>
    </v-col>
    <v-col cols="12">
      <v-date-picker
        v-model="picker"
        :landscape="landscape"
        type="month"
      ></v-date-picker>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      picker: new Date().toISOString().substr(0, 7),
      landscape: false,
    };
  },
};
</script>
