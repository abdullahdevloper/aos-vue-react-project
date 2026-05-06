import { Bubble } from "react-chartjs-2";
import { ChartShell } from "./ChartShell";
import { chartOptions, palette } from "./chartConfig";
import type { ChartPanelProps } from "../../types/dashboard";

export default function BubbleChart(props: ChartPanelProps) {
  return (
    <ChartShell title={props.title ?? "Bubble Chart"} height={props.height}>
      <Bubble
        options={chartOptions}
        data={{
          datasets: [{ label: "Segments", data: [{ x: 12, y: 18, r: 14 }, { x: 20, y: 28, r: 10 }, { x: 32, y: 14, r: 18 }], backgroundColor: "rgba(0, 131, 143, .45)" }],
        }}
      />
    </ChartShell>
  );
}
