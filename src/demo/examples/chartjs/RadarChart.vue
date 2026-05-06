<template>
  <radar-chart
    :data="data"
    :options="option"
    :height="200"
  />
</template>
<script>
import colors from "vuetify/lib/util/colors";

import RadarChart from "@/components/ChartJS/RadarChart";
export default {
  components: { RadarChart },
  data() {
    return {
      data: {
        labels: [
          ["Eating", "Dinner"],
          ["Drinking", "Water"],
          "Sleeping",
          ["Designing", "Graphics"],
          "Coding",
          "Cycling",
          "Running"
        ],
        datasets: [
          {
            label: "My First dataset",
            gradientFill: [colors.purple.lighten3, colors.blue.accent3],

            borderColor: colors.blue.lighten3,
            pointBackgroundColor: colors.blue.accent3,
            data: [
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor()
            ]
          },
          {
            label: "My Second dataset",
            gradientFill: [colors.purple.lighten3, colors.teal.accent3],
            borderColor: colors.teal.lighten3,
            pointBackgroundColor: colors.teal.accent3,
            data: [
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor()
            ]
          }
        ]
      },
      option: {
        legend: {
          position: "top"
        },
        title: {
          display: true,
          text: "Chart.js Radar Chart"
        },
        scale: {
          ticks: {
            beginAtZero: true
          }
        }
      }
    };
  },
  methods: {
    randomScalingFactor() {
      return Math.round(Math.random() * 100);
    }
  }
};
</script>