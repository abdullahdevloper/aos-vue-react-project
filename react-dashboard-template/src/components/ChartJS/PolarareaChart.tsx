import { PolarArea } from "react-chartjs-2";
import { ChartShell } from "./ChartShell";
import { chartOptions, palette } from "./chartConfig";
import type { ChartPanelProps } from "../../types/dashboard";

export default function PolarareaChart(props: ChartPanelProps) {
  return (
    <ChartShell title={props.title ?? "Polar Area Chart"} height={props.height}>
      <PolarArea
        options={chartOptions}
        data={{
          labels: ["Email", "Search", "Social", "Direct"],
          datasets: [{ data: [31, 26, 19, 24], backgroundColor: palette.slice(0, 4) }],
        }}
      />
    </ChartShell>
  );
}
