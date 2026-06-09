import { Scatter } from "react-chartjs-2";
import { ChartShell } from "./ChartShell";
import { chartOptions, palette } from "./chartConfig";
import type { ChartPanelProps } from "../../types/dashboard";

export default function ScatterChart(props: ChartPanelProps) {
  return (
    <ChartShell title={props.title ?? "Scatter Chart"} height={props.height}>
      <Scatter
        options={chartOptions}
        data={{
          datasets: [{ label: "Velocity", data: [{ x: 2, y: 8 }, { x: 4, y: 13 }, { x: 7, y: 18 }, { x: 9, y: 23 }], backgroundColor: palette[5] }],
        }}
      />
    </ChartShell>
  );
}
