<script>
import has from "lodash/has";
import "chartjs-plugin-style";
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  type: "horizontalBar",
  props: {
    data: Object,
    options: Object,

    linearStroke: {
      type: Array,
      default: () => [0, 0, 0, 450],
    },
  },
  beforeDestroy() {
    // window.removeEventListener("resize", this.rerender);
    this.$data._chart.destroy();
  },
  mounted() {
    // window.addEventListener("resize", this.rerender);
    this.$refs.canvas.style.width = "50%";
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
