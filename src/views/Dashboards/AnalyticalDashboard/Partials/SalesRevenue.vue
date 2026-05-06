<template>
  <v-col md="7">
    <v-card class="neu-glow">
      <v-row class="mx-0 pa-4" justify="space-between" align="center">
        <!-- title and subtitle -->
        <div>
          <div class="text-h6">Revenue</div>
        </div>
        <!-- Stats -->
        <div class="d-flex flex-column align-end">
          <v-switch
            v-model="compareListYear"
            color="primary"
            label="Last year comparison"
          ></v-switch>
        </div>
      </v-row>
      <v-card-text class="py-0" v-if="chartProperties">
        <bar-chart
          :data="chartProps.data"
          :options="chartProps.options"
          :style="{ height: '402px' }"
        />
      </v-card-text>
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
      chartProperties: {
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
        currentYear: [
          {
            label: "Sales",
            fill: true,
            data: [40, 39, 20, 40, 38, 50, 40, 39, 20, 40, 38, 50],
            shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 10,
            shadowColor: "rgba(103, 116, 132, 0.5)",
            pointRadius: 0,
            borderWidth: 0,
            pointHoverInnerGlowColor: `rgba(103, 116, 132, 0.5)`,

            gradientFill: [colors.cyan.lighten4, colors.cyan.accent4],
            order: 0,
          },
          {
            label: "Revenue",
            data: [43, 30, 48, 47, 70, 30, 43, 30, 48, 47, 70, 30],
            fill: true,
            shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 10,
            shadowColor: "rgba(103, 116, 132, 0.5)",
            pointRadius: 0,
            borderWidth: 0,
            pointHoverInnerGlowColor: `rgba(103, 116, 132, 0.5)`,
            gradientFill: [colors.pink.lighten4, colors.pink.accent4],
            order: 1,
          },
        ],
        lastYear: [
          {
            label: "Sales",
            fill: true,
            data: [20, 32, 15, 34, 31, 46, 37, 33, 16, 35, 34, 45],
            shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 10,
            shadowColor: "rgba(103, 116, 132, 0.5)",
            pointRadius: 0,
            borderWidth: 0,
            pointHoverInnerGlowColor: `rgba(103, 116, 132, 0.5)`,
            gradientFill: [colors.blue.lighten4, colors.blue.accent4],
            order: 0,
          },
          {
            label: "Revenue",
            data: [38, 25, 42, 41, 73, 24, 37, 26, 42, 41, 65, 25],
            fill: true,
            shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 10,
            shadowColor: "rgba(103, 116, 132, 0.5)",
            pointRadius: 0,
            borderWidth: 0,
            pointHoverInnerGlowColor: `rgba(103, 116, 132, 0.5)`,
            gradientFill: [colors.indigo.lighten4, colors.indigo.accent4],
            order: 1,
          },
        ],
      },
      option: {
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
            left: 10,
            right: 10,
            bottom: 10,
            top: 10,
          },
        },
        scales: {
          xAxes: [
            {
              stacked: true,
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
              stacked: true,
              ticks: {
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
      compareListYear: false,
    };
  },
  computed: {
    chartProps() {
      const { labels, currentYear, lastYear } = this.chartProperties;
      return {
        data: !this.compareListYear
          ? {
              labels: labels,
              datasets: currentYear,
            }
          : {
              labels: labels,
              datasets: lastYear,
            },
        options: this.option,
      };
    },
  },
  beforeDestroy() {
    this.chartProperties = null;
    delete this.chartProperties;
  },
};
</script>
