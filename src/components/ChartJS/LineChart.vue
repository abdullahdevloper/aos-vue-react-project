<script>
import has from "lodash/has";
import "chartjs-plugin-style";
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    data: Object,
    options: Object,
  },
  beforeDestroy() {
    // window.removeEventListener("resize", this.rerender);
    this.$data._chart.destroy();
  },
  mounted() {
    // window.addEventListener("resize", this.rerender);
    this.renderChart(this.chartData, this.options);
  },
  methods: {
    rerender() {
      this.renderChart(this.chartData, this.options);
    },
  },
  computed: {
    chartData() {
      let linearStroke = [0, 0, 0, 450];
      let { datasets, labels } = this.data;
      datasets = datasets.map((obj) => {
        if (has(obj, "gradientStroke") && obj.gradientStroke.length) {
          linearStroke = has(obj, "linearStroke")
            ? obj.linearStroke
            : linearStroke;
          let gradientStroke = this.$refs.canvas
            .getContext("2d")
            .createLinearGradient(...linearStroke);
          obj.gradientStroke.forEach((hex, index) => {
            if (
              typeof hex === "object" &&
              has(hex, "stop") &&
              has(hex, "color")
            ) {
              let { stop, color } = hex;
              gradientStroke.addColorStop(stop, color);
            } else {
              let stop = index > 0 ? 1 / index : 0;
              stop = Number(stop.toFixed(1));
              gradientStroke.addColorStop(stop, hex);
            }
          });

          if (has(obj, "borderColor") === false) {
            obj.borderColor = gradientStroke;
          }
          if (has(obj, "pointBorderColor") === false) {
            obj.pointBorderColor = gradientStroke;
          }
          if (has(obj, "pointBackgroundColor") === false) {
            obj.pointBackgroundColor = gradientStroke;
          }
          if (has(obj, "pointHoverBackgroundColor") === false) {
            obj.pointHoverBackgroundColor = gradientStroke;
          }
          if (has(obj, "pointHoverBorderColor") === false) {
            obj.pointHoverBorderColor = gradientStroke;
          }
        }

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
        return obj;
      });
      return {
        labels,
        datasets,
      };
    },
  },
  watch: {
    data() {
      this.renderChart(this.chartData, this.options);
    },
  },
};
</script>
