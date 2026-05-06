<template>
  <v-col md="5">
    <v-card class="neu-glow">
      <v-row class="mx-0 pa-4" justify="space-between" align="center">
        <!-- title and subtitle -->
        <div>
          <div class="text-h6">Visits</div>
        </div>
        <!-- Stats -->

        <v-card-text class="py-0" v-if="data">
          <bar-chart
            :data="data"
            :options="options"
            :style="{ height: '410px' }"
          />
        </v-card-text>
      </v-row>
    </v-card>
  </v-col>
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
          "Dec",
        ],
        datasets: [
          {
            label: "Visits",
            gradientFill: [colors.purple.lighten4, colors.purple.accent1],
            data: [40, 39, 20, 40, 38, 50, 40, 39, 20, 40, 38, 50],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: "rgba(66, 165, 245, 0.5)",
            categoryPercentage: 0.5,
            barPercentage: 0.5,
          },
          {
            label: "Order",
            gradientFill: [colors.blue.lighten4, colors.blue.accent4],
            data: [43, 30, 48, 47, 70, 30, 43, 30, 48, 47, 70, 30],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: "rgba(66, 165, 245, 0.5)",
            categoryPercentage: 0.5,
            barPercentage: 0.5,
          },
        ],
      },
      options: {
        responsive: true,
        scaleOverride: true,
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "index",
          intersect: false,
        },
        maintainAspectRatio: false,
        legend: {
          display: false,
          intersect: false,
        },
        layout: {
          padding: {
            top: 10,
            left: 10,
            right: 10,
            bottom: 10,
          },
        },
        scales: {
          xAxes: [
            {
              ticks: {
                display: true,
              },
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                display: true,
                suggestedMin: 0,
                suggestedMax: 100,
                beginAtZero: true,
              },
              gridLines: {
                borderDash: [8, 4],
                display: true,
                offsetGridLines: true,
              },
            },
          ],
        },
      },
    };
  },
  beforeDestroy() {
    this.data = null;
    delete this.data;
  },
};
</script>
