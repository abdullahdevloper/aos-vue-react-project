<script>
import has from "lodash/has";
import "chartjs-plugin-style";
import { HorizontalBar } from "vue-chartjs";

export default {
  extends: HorizontalBar,
  props: {
    data: Object,
    options: Object,
    gradients: {
      type: Array,
      default: () => [],
    },
    linearStroke: {
      type: Array,
      default: () => [0, 0, 0, 450],
    },
  },
  beforeDestroy() {
    this.$data._chart.destroy();

    // window.removeEventListener("resize", this.rerender);
  },
  mounted() {
    // window.addEventListener("resize", this.rerender);
    this.$refs.canvas.style.width = "50%";

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
  methods: {
    rerender() {
      this.renderChart(this.data, this.options);
    },
  },
};
</script>
