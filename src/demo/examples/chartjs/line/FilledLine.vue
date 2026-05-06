<template>
  <line-chart
    :data="data"
    :options="option"
  />
</template>
<script>
import colors from "vuetify/lib/util/colors";

import LineChart from "@/components/ChartJS/LineChart";
export default {
  components: { LineChart },
  data() {
    return {
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "Expense",
            fill: true,
            data: [40, 39, 20, 40, 38, 50, 40, 39, 20, 40, 38, 50],
            shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 10,
            shadowColor: "rgba(103, 116, 132, 0.5)",
            pointRadius: 0,
            borderWidth: 0,
            pointHoverInnerGlowColor: `rgba(103, 116, 132, 0.5)`,
            gradientFill: [colors.blue.lighten4, colors.blue.accent4],
            order: 0
          },
          {
            label: "Earning",
            data: [43, 30, 48, 47, 70, 30, 43, 30, 48, 47, 70, 30],
            fill: true,
            shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 10,
            shadowColor: "rgba(103, 116, 132, 0.5)",
            pointRadius: 0,
            borderWidth: 0,
            pointHoverInnerGlowColor: `rgba(103, 116, 132, 0.5)`,
            gradientFill: [colors.indigo.lighten4, colors.indigo.accent4],
            order: 1
          }
        ]
      },
      option: {
        responsive: true,
        maintainAspectRatio: false,
        scaleOverride: true,
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "index",
          intersect: false
        },
        legend: {
          display: false
        },
        layout: {
          padding: {
            left: 10,
            right: 10,
            bottom: 10
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                zeroLineColor: "transparent"
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false,
                drawTicks: false
              }
            }
          ]
        }
      },
      gradients: [
        { stop: 0, color: colors.pink.base },
        { stop: 0.5, color: colors.amber.base }
      ]
    };
  }
};
</script>