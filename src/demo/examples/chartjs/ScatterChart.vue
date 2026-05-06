<template>
  <scatter-chart
    :data="data"
    :options="option"
  />
</template>
<script>
import colors from "vuetify/lib/util/colors";
import ScatterChart from "@/components/ChartJS/ScatterChart";
export default {
  components: { ScatterChart },
  data() {
    return {
      data: {
        datasets: [
          {
            label: "My First dataset",
            data: [
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              }
            ],
            gradientFill: [colors.blue.lighten4, colors.blue.accent4],
            borderColor: "transparent",
            pointBorderColor: colors.blue.base,
            pointBackgroundColor: colors.blue.lighten4,
            pointBorderWidth: 2,
            pointHoverBorderWidth: 2,
            pointRadius: 4
          },
          {
            label: "My Second dataset",
            data: [
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              }
            ],
            gradientFill: [colors.pink.lighten4, colors.pink.accent4],
            borderColor: "transparent",
            pointBorderColor: colors.pink.base,
            pointBackgroundColor: colors.pink.lighten4,
            pointBorderWidth: 2,
            pointHoverBorderWidth: 2,
            pointRadius: 4
          }
        ]
      },
      option: {
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: 800
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