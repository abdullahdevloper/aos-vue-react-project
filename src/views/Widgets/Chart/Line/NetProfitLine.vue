<template>
  <stats-chart-analysis
    :subtitle="subtitle"
    :title="title"
    :avatar="avatar"
  >
    <!-- <v-row>
      <v-col cols="8"> -->
    <line-chart
      :data="data"
      :options="option"
      :style="{'max-height': '300px'}"
    />
    <!-- </v-col>
    </v-row> -->

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
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        datasets: [
          {
            label: "Net Profit",
            fill: true,
            data: [40, 39, 20, 40, 38, 50, 40, 39, 20, 40, 38, 50],
            shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 10,
            shadowColor: "rgba(103, 116, 132, 0.5)",
            pointBevelWidth: 3,
            pointHoverRadius: 6,
            pointHoverBevelWidth: 4.5,
            pointHoverInnerGlowWidth: 20,
            pointHoverInnerGlowColor: `rgba(103, 116, 132, 0.5)`,
            borderWidth: 3,
            pointRadius: 0,
            backgroundColor: `rgba(98, 0, 234, 0.5)`,
            gradientStroke: [colors.indigo.accent4, colors.purple.accent4]
          }
        ]
      },
      option: {
        responsive: true,
        scaleOverride: true,
        tooltips: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: function(tooltipItem, data) {
              let label =
                data.datasets[tooltipItem.datasetIndex].data[
                  tooltipItem.index
                ] || "";

              return `${
                data.datasets[tooltipItem.datasetIndex].label
              } $${label}K`;
            }
          }
        },
        hover: {
          mode: "index",
          intersect: false
        },
        maintainAspectRatio: false,
        legend: {
          display: false,
          intersect: false
        },
        layout: {
          padding: {
            left: 10,
            right: 10,
            bottom: 10,
            top: 10
          }
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              ticks: {
                display: true
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                borderDash: [8, 4],
                display: true,
                offsetGridLines: true
              }
            }
          ]
        }
      },
      subtitle: "Net Profit",
      title: "68K",
      avatar: {
        icon: "trending_up",
        style: {
          color: "teal accent-4"
        },
        avatarStyle: {
          class: "neu-glow"
        }
      }
    };
  }
};
</script>