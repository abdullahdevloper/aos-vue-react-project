import { Radar } from "react-chartjs-2";
import { ChartShell } from "./ChartShell";
import { chartOptions, palette } from "./chartConfig";
import type { ChartPanelProps } from "../../types/dashboard";

export default function RadarChart(props: ChartPanelProps) {
  return (
    <ChartShell title={props.title ?? "Radar Chart"} height={props.height}>
      <Radar
        options={chartOptions}
        data={{
          labels: ["UX", "API", "QA", "Docs", "Ops"],
          datasets: [{ label: "Readiness", data: [76, 68, 81, 55, 64], borderColor: palette[4], backgroundColor: "rgba(94, 53, 177, .18)" }],
        }}
      />
    </ChartShell>
  );
}
