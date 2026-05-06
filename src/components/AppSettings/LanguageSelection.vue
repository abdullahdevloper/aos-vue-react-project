<template>
  <v-sheet class="transparent">
    <v-select
      :items="langs"
      label="Solo field"
      solo
      v-model="lang"
      class="ma-5"
    ></v-select>
  </v-sheet>
</template>
<script>
import { mapGetters } from "vuex";
import { availableLocale } from "@/config/locale";
export default {
  data() {
    return {
      langs: availableLocale,
    };
  },
  computed: {
    ...mapGetters(["locale"]),
    lang: {
      get() {
        return this.locale;
      },
      set(value) {
        this.$store.dispatch("setLocale", value);
      },
    },
  },
};
</script>
