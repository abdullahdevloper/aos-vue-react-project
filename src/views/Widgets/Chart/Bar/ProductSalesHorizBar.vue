<template>
  <stats-chart-analysis
    :subtitle="subtitle"
    :title="title"
    :action="action"
    :stats="stats"
  >
    <horizontal-bar-chart
      :data="data"
      :options="option"
    />
  </stats-chart-analysis>
</template>

<script>
import StatsChartAnalysis from "@/components/UI/Widgets/Cards/Analytical/StatsChartAnalysis";
import HorizontalBarChart from "@/components/ChartJS/HorizontalBarChart";
import colors from "vuetify/lib/util/colors";
export default {
  components: { StatsChartAnalysis, HorizontalBarChart },
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
            label: "Roe",
            backgroundColor: colors.blue.base,
            data: [43, 30, 48, 47, 70, 30, 43, 30, 48, 47, 70, 30],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: "rgba(66, 165, 245, 0.5)",
            categoryPercentage: 0.5,
            barPercentage: 0.5
          },
          {
            label: "Vuse",
            backgroundColor: colors.green.base,
            data: [50, 48, 53, 40, 78, 36, 40, 35, 68, 50, 68, 35],
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
      subtitle: "Sales",
      title: "12000",
      stats: {
        text: {
          val: "Year 2020"
        }
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