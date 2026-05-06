<template>
  <stats-chart-analysis
    :subtitle="subtitle"
    :title="title"
    :stats="stats"
    :action="action"
  >
    <line-chart
      :data="data"
      :options="option"
    />
  </stats-chart-analysis>
</template>

<script>
import StatsChartAnalysis from "@/components/UI/Widgets/Cards/Analytical/StatsChartAnalysis";
import LineChart from "@/components/ChartJS/LineChart";
import colors from "vuetify/lib/util/colors";

export default {
  components: { StatsChartAnalysis, LineChart },
  data() {
    return {
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Net Profit",
            fill: true,
            data: [40, 39, 20, 40, 38, 50, 40, 39, 20, 40, 38, 50],
            shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 10,
            shadowColor: "rgba(103, 116, 132, 0.5)",
            pointRadius: 4,
            pointBevelWidth: 3,
            pointHoverRadius: 6,
            pointHoverBevelWidth: 4.5,
            pointHoverInnerGlowWidth: 20,
            pointHoverInnerGlowColor: `rgba(103, 116, 132, 0.5)`,
            gradientStroke: [colors.blue.base, colors.blue.accent3]
          },
          {
            label: "Revenue",
            data: [43, 30, 48, 47, 70, 30, 43, 30, 48, 47, 70, 30],
            fill: true,
            shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 10,
            shadowColor: "rgba(103, 116, 132, 0.5)",
            pointRadius: 4,
            pointBevelWidth: 3,
            pointHoverRadius: 6,
            pointHoverBevelWidth: 4.5,
            pointHoverInnerGlowWidth: 20,
            pointHoverInnerGlowColor: `rgba(103, 116, 132, 0.5)`,
            gradientStroke: [colors.indigo.base, colors.indigo.accent3]
          }
        ]
      },
      option: {
        responsive: true,
        maintainAspectRatio: true,
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
              display: false
            }
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        tooltips: {
          mode: "label",
          callbacks: {
            label: function(tooltipItem, data) {
              let label =
                data.datasets[tooltipItem.datasetIndex].data[
                  tooltipItem.index
                ] || "";

              return `$${label}K (${
                data.datasets[tooltipItem.datasetIndex].label
              })`;
            }
          }
        }
      },
      subtitle: "Revenue",
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