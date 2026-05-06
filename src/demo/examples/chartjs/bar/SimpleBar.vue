<template>
  <bar-chart
    :data="data"
    :options="option"
    :height="260"
  />
</template>
<script>
import colors from "vuetify/lib/util/colors";
import BarChart from "@/components/ChartJS/BarChart";
export default {
  components: { BarChart },
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
            gradientFill: [colors.purple.lighten4, colors.purple.accent4],
            data: [40, 39, 20, 40, 38, 50, 40, 39, 20, 40, 38, 50],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: "rgba(66, 165, 245, 0.5)",
            categoryPercentage: 0.5,
            barPercentage: 0.5
          },
          {
            label: "Earning",
            gradientFill: [colors.blue.lighten4, colors.blue.accent4],
            data: [43, 30, 48, 47, 70, 30, 43, 30, 48, 47, 70, 30],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: "rgba(66, 165, 245, 0.5)",
            categoryPercentage: 0.5,
            barPercentage: 0.5
          }
        ]
      },
      option: {
        responsive: true,
        maintainAspectRatio: false,
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
                display: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                offsetGridLines: true
              }
            }
          ]
        }
      }
    };
  }
};
</script>