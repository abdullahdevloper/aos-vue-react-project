<template>
  <pie-chart
    :data="data"
    :options="option"
  />
</template>
<script>
import colors from "vuetify/lib/util/colors";

import PieChart from "@/components/ChartJS/PieChart";
export default {
  components: { PieChart },
  data() {
    return {
      data: {
        labels: ["VueJs", "ReactJs", "EmberJs", "AngularJs"],
        datasets: [
          {
            gradientFill: [
              [colors.blue.lighten3, colors.green.accent3],
              [colors.purple.lighten3, colors.blue.accent3],
              [colors.red.lighten3, colors.amber.accent3],
              [colors.amber.lighten3, colors.indigo.accent3]
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