import { Bar } from "react-chartjs-2";
import { ChartShell } from "./ChartShell";
import { chartOptions, labels, palette } from "./chartConfig";
import type { ChartPanelProps } from "../../types/dashboard";

export default function BarChart(props: ChartPanelProps) {
  return (
    <ChartShell title={props.title ?? "Bar Chart"} height={props.height}>
      <Bar
        options={chartOptions}
        data={{
          labels,
          datasets: [{ label: "Revenue", data: [42, 57, 48, 66, 75, 83], backgroundColor: palette[0] }],
        }}
      />
    </ChartShell>
  );
}
