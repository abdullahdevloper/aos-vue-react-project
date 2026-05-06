<template>
  <polararea-chart
    :data="data"
    :options="option"
    :height="200"
  />
</template>
<script>
import colors from "vuetify/lib/util/colors";
import PolarareaChart from "@/components/ChartJS/PolarareaChart";
export default {
  components: { PolarareaChart },
  data() {
    return {
      data: {
        labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
        datasets: [
          {
            label: "Population (millions)",
            gradientFill: [
              [colors.purple.lighten3, colors.blue.accent3],
              [colors.purple.lighten3, colors.teal.accent3],
              [colors.orange.lighten3, colors.orange.accent3],
              [colors.red.lighten4, colors.amber.accent3],
              [colors.deepOrange.lighten3, colors.blue.lighten1]
            ],
            data: [
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
          text: "Chart.js PolarareaChart Chart"
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