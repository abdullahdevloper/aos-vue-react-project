<script>
import has from "lodash/has";
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: {
    data: Object,
    options: Object,
    gradientFill: {
      type: Array,
      default: null,
    },
  },
  mounted() {
    let linearStroke = [0, 0, 0, 450];

    let backgroundColor = [];
    this.data.datasets.map((obj) => {
      if (has(obj, "gradientFill") && obj.gradientFill.length) {
        linearStroke = has(obj, "linearStroke")
          ? obj.linearStroke
          : linearStroke;
        const backgroundColor = [];
        obj.gradientFill.map((gradientSet) => {
          let gradientFill = this.$refs.canvas
            .getContext("2d")
            .createLinearGradient(...linearStroke);
          gradientSet.forEach((hex, index) => {
            if (
              typeof hex === "object" &&
              has(hex, "stop") &&
              has(hex, "color")
            ) {
              let { stop, color } = hex;
              gradientFill.addColorStop(stop, color);
            } else {
              let stop = index > 0 ? 1 / index : 0;
              stop = Number(stop.toFixed(1));
              gradientFill.addColorStop(stop, hex);
            }
          });
          backgroundColor.push(gradientFill);
        });

        if (has(obj, "backgroundColor") === false) {
          obj.backgroundColor = backgroundColor;
        }
      }
    });
    if (has(this.data.datasets, "backgroundColor") === false) {
      this.data.datasets.backgroundColor = backgroundColor;
    }

    this.renderChart(this.data, this.options);
  },
  beforeDestroy() {
    this.$data._chart.destroy();
  },
};
</script>
