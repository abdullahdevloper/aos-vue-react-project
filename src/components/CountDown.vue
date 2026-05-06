<template>
  <v-sheet class="d-flex flex-row flex-wrap justify-center transparent">
    <v-sheet
      class="neu-glow-inset rounded align-center justify-center d-flex flex-column ma-2"
      height="70"
      width="70"
    >
      <div class="text-h5">{{ days | twoDigits }}</div>
      <div class="text-subtitle-1">Days</div>
    </v-sheet>
    <v-sheet
      class="neu-glow-inset rounded align-center justify-center d-flex flex-column ma-2"
      height="70"
      width="70"
    >
      <div class="text-h5">{{ hours | twoDigits }}</div>
      <div class="text-subtitle-1">Hrs</div>
    </v-sheet>
    <v-sheet
      class="neu-glow-inset rounded align-center justify-center d-flex flex-column ma-2"
      height="70"
      width="70"
    >
      <div class="text-h5">{{ minutes | twoDigits }}</div>
      <div class="text-subtitle-1">Min</div>
    </v-sheet>
    <v-sheet
      class="neu-glow-inset rounded align-center justify-center d-flex flex-column ma-2"
      height="70"
      width="70"
    >
      <div class="text-h5">{{ seconds | twoDigits }}</div>
      <div class="text-subtitle-1">Sec</div>
    </v-sheet>
  </v-sheet>
</template>

<script>
let interval = null;
export default {
  props: ["deadline", "stop", "dark"],
  data() {
    return {
      now: Math.trunc(new Date().getTime() / 1000),
      date: null,
      diff: 0,
    };
  },
  mounted() {
    this.date = Math.trunc(Date.parse(this.deadline.replace(/-/g, "/")) / 1000);

    interval = setInterval(() => {
      this.now = Math.trunc(new Date().getTime() / 1000);
    }, 1000);
  },
  computed: {
    seconds() {
      return Math.trunc(this.diff) % 60;
    },

    minutes() {
      return Math.trunc(this.diff / 60) % 60;
    },

    hours() {
      return Math.trunc(this.diff / 60 / 60) % 24;
    },

    days() {
      return Math.trunc(this.diff / 60 / 60 / 24);
    },
  },
  watch: {
    now() {
      this.diff = this.date - this.now;
      if (this.diff <= 0 || this.stop) {
        this.diff = 0;
        // Remove interval
        clearInterval(interval);
      }
    },
  },
};
</script>
<style scoped>
.vue-countdown {
  padding: 0;
  margin: 0;
}
.vue-countdown li {
  display: inline-block;
  margin: 0 8px;
  text-align: center;
  position: relative;
}
.vue-countdown li p {
  margin: 0;
}
.vue-countdown li:after {
  content: ":";
  position: absolute;
  top: 0;
  right: -13px;
  font-size: 32px;
}
.vue-countdown.dark li:after {
  color: white;
}
.vue-countdown li:first-of-type {
  margin-left: 0;
}
.vue-countdown li:last-of-type {
  margin-right: 0;
}
.vue-countdown li:last-of-type:after {
  content: "";
}
.vue-countdown .digit {
  font-size: 32px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 0;
}
.vue-countdown .text {
  text-transform: uppercase;
  margin-bottom: 0;
  font-size: 10px;
}
</style>
