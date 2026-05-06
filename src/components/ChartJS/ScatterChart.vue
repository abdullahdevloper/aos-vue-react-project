<script>
import has from "lodash/has";
import { Scatter } from "vue-chartjs";

export default {
  extends: Scatter,
  props: {
    data: Object,
    options: Object,
  },
  mounted() {
    let linearStroke = [0, 0, 0, 450];
    this.data.datasets.map((obj) => {
      if (has(obj, "gradientFill") && obj.gradientFill.length) {
        linearStroke = has(obj, "linearStroke")
          ? obj.linearStroke
          : linearStroke;
        let gradientFill = this.$refs.canvas
          .getContext("2d")
          .createLinearGradient(...linearStroke);
        obj.gradientFill.forEach((hex, index) => {
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

        if (has(obj, "backgroundColor") === false) {
          obj.backgroundColor = gradientFill;
        }
      }
    });
    this.renderChart(this.data, this.options);
  },
  beforeDestroy() {
    this.$data._chart.destroy();
  },
};
</script>
