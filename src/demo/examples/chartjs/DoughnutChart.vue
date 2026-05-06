<template>
  <doughnut-chart
    :data="data"
    :options="option"
  />
</template>
<script>
import colors from "vuetify/lib/util/colors";

import DoughnutChart from "@/components/ChartJS/DoughnutChart";
export default {
  components: { DoughnutChart },
  data() {
    return {
      data: {
        labels: ["VueJs", "ReactJs", "EmberJs", "AngularJs"],
        datasets: [
          {
            gradientFill: [
              [colors.purple.lighten3, colors.blue.accent3],
              [colors.purple.lighten3, colors.teal.accent3],
              [colors.orange.lighten3, colors.orange.accent3],
              [colors.red.lighten4, colors.amber.accent3]
            ],
            data: [40, 40, 15, 10]
          }
        ]
      },
      option: { responsive: true, maintainAspectRatio: false }
    };
  }
};
</script>