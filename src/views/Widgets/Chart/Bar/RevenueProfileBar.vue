<template>
  <stats-chart-analysis
    :subtitle="subtitle"
    :title="title"
    :stats="stats"
    :action="action"
  >
    <bar-chart
      :data="data"
      :options="option"
    />
  </stats-chart-analysis>
</template>

<script>
import StatsChartAnalysis from "@/components/UI/Widgets/Cards/Analytical/StatsChartAnalysis";
import BarChart from "@/components/ChartJS/BarChart";
import colors from "vuetify/lib/util/colors";

export default {
  components: { StatsChartAnalysis, BarChart },
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
            label: "Profit",
            backgroundColor: colors.cyan.base,
            data: [40, 39, 20, 40, 38, 50, 40, 39, 20, 40, 38, 50],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: "rgba(66, 165, 245, 0.5)",
            categoryPercentage: 0.5,
            barPercentage: 0.5
          },
          {
            label: "Revenue",
            backgroundColor: colors.amber.base,
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
            top: 10,
            left: 10,
            right: 10,
            bottom: 10
          }
        },
        scales: {
          xAxes: [
            {
              display: false,
              gridLines: {
                offsetGridLines: true
              }
            }
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                suggestedMin: 0,
                suggestedMax: 100
              }
            }
          ]
        }
      },
      subtitle: "Profit",
      title: "$38000",
      stats: {
        icon: {
          name: "trending_up",
          style: { color: "teal", small: true }
        },
        text: {
          val: "+8.50%",
          style: {
            class: "teal--text"
          }
        },
        subtitle: "than last year"
      },
      action: {
        btn: {
          text: "See Details"
        },
        style: {
          text: true
        },
        rowStyle: {
          justify: "end"
        }
      }
    };
  }
};
</script>