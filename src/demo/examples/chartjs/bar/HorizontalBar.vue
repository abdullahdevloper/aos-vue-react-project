<template>
  <horizontal-bar-chart
    :data="data"
    :options="option"
    :height="260"
  />
</template>
<script>
import colors from "vuetify/lib/util/colors";
import HorizontalBarChart from "@/components/ChartJS/HorizontalBarChart";
export default {
  components: { HorizontalBarChart },
  data() {
    return {
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Expense",
            gradientFill: [colors.orange.base, colors.orange.accent4],
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
            gradientFill: [colors.green.base, colors.green.accent4],
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
                display: true
              },
              ticks: {
                beginAtZero: true
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        }
      }
    };
  }
};
</script>