import { Doughnut } from "react-chartjs-2";
import { ChartShell } from "./ChartShell";
import { chartOptions, palette } from "./chartConfig";
import type { ChartPanelProps } from "../../types/dashboard";

export default function DoughnutChart(props: ChartPanelProps) {
  return (
    <ChartShell title={props.title ?? "Doughnut Chart"} height={props.height}>
      <Doughnut
        options={chartOptions}
        data={{
          labels: ["Complete", "Remaining"],
          datasets: [{ data: [72, 28], backgroundColor: [palette[2], "#d7dee6"] }],
        }}
      />
    </ChartShell>
  );
}
