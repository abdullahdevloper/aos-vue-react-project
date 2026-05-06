import { Pie } from "react-chartjs-2";
import { ChartShell } from "./ChartShell";
import { chartOptions, palette } from "./chartConfig";
import type { ChartPanelProps } from "../../types/dashboard";

export default function PieChart(props: ChartPanelProps) {
  return (
    <ChartShell title={props.title ?? "Pie Chart"} height={props.height}>
      <Pie
        options={chartOptions}
        data={{
          labels: ["Mobile", "Desktop", "Tablet"],
          datasets: [{ data: [52, 34, 14], backgroundColor: palette.slice(0, 3) }],
        }}
      />
    </ChartShell>
  );
}
