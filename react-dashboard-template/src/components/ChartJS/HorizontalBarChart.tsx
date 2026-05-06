import { Bar } from "react-chartjs-2";
import { ChartShell } from "./ChartShell";
import { chartOptions, palette } from "./chartConfig";
import type { ChartPanelProps } from "../../types/dashboard";

export default function HorizontalBarChart(props: ChartPanelProps) {
  return (
    <ChartShell title={props.title ?? "Horizontal Bar Chart"} height={props.height}>
      <Bar
        options={{ ...chartOptions, indexAxis: "y" as const }}
        data={{
          labels: ["Design", "Build", "QA", "Launch"],
          datasets: [{ label: "Hours", data: [18, 34, 21, 13], backgroundColor: palette[1] }],
        }}
      />
    </ChartShell>
  );
}
