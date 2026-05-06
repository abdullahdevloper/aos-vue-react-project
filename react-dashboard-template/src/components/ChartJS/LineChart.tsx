import { Line } from "react-chartjs-2";
import { ChartShell } from "./ChartShell";
import { chartOptions, labels, palette } from "./chartConfig";
import type { ChartPanelProps } from "../../types/dashboard";

export default function LineChart(props: ChartPanelProps) {
  return (
    <ChartShell title={props.title ?? "Line Chart"} height={props.height}>
      <Line
        options={chartOptions}
        data={{
          labels,
          datasets: [
            {
              label: "Sessions",
              data: [24, 38, 36, 52, 58, 71],
              borderColor: palette[0],
              backgroundColor: "rgba(0, 131, 143, .14)",
              fill: true,
              tension: 0.35,
            },
          ],
        }}
      />
    </ChartShell>
  );
}
