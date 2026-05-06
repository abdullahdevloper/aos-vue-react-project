<template>
  <bubble-chart
    :data="data"
    :options="option"
    :height="200"
  />
</template>
<script>
import colors from "vuetify/lib/util/colors";
import BubbleChart from "@/components/ChartJS/BubbleChart";
export default {
  components: { BubbleChart },
  data() {
    return {
      data: {
        labels: "Js Frameworks",
        datasets: [
          {
            label: ["VueJs"],
            gradientFill: [colors.purple.lighten3, colors.blue.accent3],
            borderColor: colors.indigo.accent4,
            data: [
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor(),
                r: 10
              }
            ]
          },
          {
            label: ["ReactJS"],
            gradientFill: [colors.red.lighten4, colors.red.accent3],
            borderColor: colors.red.accent4,
            data: [
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor(),
                r: 15
              }
            ]
          },
          {
            label: ["Angular"],
            gradientFill: [colors.purple.lighten4, colors.purple.accent3],
            borderColor: colors.purple.accent4,
            data: [
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor(),
                r: 15
              }
            ]
          },
          {
            label: ["Ionic"],
            gradientFill: [colors.amber.lighten4, colors.amber.accent3],
            borderColor: colors.amber.accent4,

            data: [
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor(),
                r: 15
              }
            ]
          }
        ]
      },
      option: {
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Joined"
              }
            }
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Users"
              }
            }
          ]
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