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
            label: "Expense",
            backgroundColor: this.$vuetify.theme.themes.light.primary.base,
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
            backgroundColor: this.$vuetify.theme.themes.light.secondary,
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
              stacked: true,
              gridLines: {
                offsetGridLines: true
              }
            }
          ],
          yAxes: [
            {
              display: false,
              stacked: true,
              ticks: {
                suggestedMin: 0,
                suggestedMax: 100
              }
            }
          ]
        }
      },
      subtitle: "Expense",
      title: "$42220",
      stats: {
        icon: {
          name: "trending_up",
          style: { color: "teal", small: true }
        },
        text: {
          val: "+3.49",
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