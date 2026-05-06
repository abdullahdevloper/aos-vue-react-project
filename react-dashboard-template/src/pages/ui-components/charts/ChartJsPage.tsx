import { Box, Grid, Typography } from "@mui/material";
import { InsertChartOutlined } from "@mui/icons-material";
import { Bar, Bubble, Doughnut, Line, Pie, PolarArea, Radar, Scatter } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import ExampleBlock from "../../../components/docs/ExampleBlock";
import VuseSectionDefinition from "../../../components/layout/VuseSectionDefinition";
import { frameworkLabels, linearGradient, monthLabels, radialValues, scatterValues, vueColors } from "./chartPalette";

const commonCartesianOptions: ChartOptions<"bar" | "line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  layout: { padding: { left: 10, right: 10, bottom: 10 } },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true, grid: { color: "rgba(103, 116, 132, .14)" } },
  },
};

const radialOptions: ChartOptions<"radar" | "polarArea"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: "top" }, title: { display: true, text: "Chart.js Radar Chart" } },
  scales: { r: { beginAtZero: true, grid: { color: "rgba(103, 116, 132, .18)" } } },
};

export default function ChartJsPage() {
  return (
    <>
      <VuseSectionDefinition
        title="Chartjs"
        namespace="Vuse"
        icon={<InsertChartOutlined />}
        breadcrumbs={[
          { label: "Components", href: "/components/vuetify/api-explorer" },
          { label: "Vuetify", href: "/components/vuetify/api-explorer" },
          { label: "SparkLine" },
        ]}
      />
      <Box sx={{ mx: { xs: 0, md: 1.5 }, mb: 1.5 }}>
        <Typography variant="h5" color="text.primary" sx={{ fontSize: 22, fontWeight: 500, mb: 0.75 }}>
          Examples
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13.5 }}>
          Chart.js examples rendered with the Vuse soft UI demo shell and source-matched datasets.
        </Typography>
      </Box>
      <Grid container spacing={2.5}>
        {chartExamples.map((example) => (
          <Grid item xs={12} key={example.title}>
            <ExampleBlock title={example.title} source={example.source} height={example.height ?? 260} description={example.description}>
              {example.render()}
            </ExampleBlock>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

const barData: ChartData<"bar"> = {
  labels: monthLabels,
  datasets: [
    {
      label: "Expense",
      data: [40, 39, 20, 40, 38, 50, 40, 39, 20, 40, 38, 50],
      backgroundColor: linearGradient(vueColors.purple.lighten4, vueColors.purple.accent4),
      borderRadius: 7,
      categoryPercentage: 0.5,
      barPercentage: 0.5,
    },
    {
      label: "Earning",
      data: [43, 30, 48, 47, 70, 30, 43, 30, 48, 47, 70, 30],
      backgroundColor: linearGradient(vueColors.blue.lighten4, vueColors.blue.accent4),
      borderRadius: 7,
      categoryPercentage: 0.5,
      barPercentage: 0.5,
    },
  ],
};

const horizontalBarData: ChartData<"bar"> = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Expense",
      data: [40, 39, 20, 40, 38, 50],
      backgroundColor: linearGradient(vueColors.orange.base, vueColors.orange.accent4),
      borderRadius: 7,
      categoryPercentage: 0.5,
      barPercentage: 0.5,
    },
    {
      label: "Earning",
      data: [43, 30, 48, 47, 70, 30],
      backgroundColor: linearGradient(vueColors.green.base, vueColors.green.accent4),
      borderRadius: 7,
      categoryPercentage: 0.5,
      barPercentage: 0.5,
    },
  ],
};

const simpleLineData: ChartData<"line"> = {
  labels: monthLabels,
  datasets: [
    {
      label: "Expense",
      fill: false,
      data: [40, 39, 20, 40, 38, 50, 40, 39, 20, 40, 38, 50],
      borderColor: vueColors.blue.accent3,
      pointBorderColor: vueColors.blue.base,
      pointBackgroundColor: "#fff",
      pointRadius: 4,
      pointHoverRadius: 6,
      tension: 0.35,
    },
    {
      label: "Earning",
      fill: false,
      data: [43, 30, 48, 47, 70, 30, 43, 30, 48, 47, 70, 30],
      borderColor: vueColors.indigo.accent3,
      pointBorderColor: vueColors.indigo.base,
      pointBackgroundColor: "#fff",
      pointRadius: 4,
      pointHoverRadius: 6,
      tension: 0.35,
    },
  ],
};

const filledLineData: ChartData<"line"> = {
  labels: monthLabels,
  datasets: [
    {
      label: "Expense",
      fill: true,
      data: [40, 39, 20, 40, 38, 50, 40, 39, 20, 40, 38, 50],
      borderWidth: 0,
      pointRadius: 0,
      backgroundColor: linearGradient(vueColors.blue.lighten4, vueColors.blue.accent4, 0.72),
      tension: 0.42,
    },
    {
      label: "Earning",
      fill: true,
      data: [43, 30, 48, 47, 70, 30, 43, 30, 48, 47, 70, 30],
      borderWidth: 0,
      pointRadius: 0,
      backgroundColor: linearGradient(vueColors.indigo.lighten4, vueColors.indigo.accent4, 0.66),
      tension: 0.42,
    },
  ],
};

const pieData: ChartData<"pie"> = {
  labels: frameworkLabels,
  datasets: [
    {
      data: [40, 40, 15, 10],
      backgroundColor: [vueColors.blue.lighten3, vueColors.purple.lighten3, vueColors.red.lighten3, vueColors.amber.lighten3],
      borderWidth: 0,
    },
  ],
};

const doughnutData: ChartData<"doughnut"> = {
  labels: frameworkLabels,
  datasets: [
    {
      data: [40, 40, 15, 10],
      backgroundColor: [vueColors.blue.accent3, vueColors.teal.accent3, vueColors.orange.accent3, vueColors.amber.accent3],
      borderWidth: 0,
    },
  ],
};

const radarData: ChartData<"radar"> = {
  labels: [["Eating", "Dinner"], ["Drinking", "Water"], "Sleeping", ["Designing", "Graphics"], "Coding", "Cycling", "Running"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(41, 121, 255, .22)",
      borderColor: vueColors.blue.lighten3,
      pointBackgroundColor: vueColors.blue.accent3,
      data: radialValues(1),
    },
    {
      label: "My Second dataset",
      backgroundColor: "rgba(29, 233, 182, .22)",
      borderColor: vueColors.teal.lighten3,
      pointBackgroundColor: vueColors.teal.accent3,
      data: radialValues(3),
    },
  ],
};

const polarData: ChartData<"polarArea"> = {
  labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
  datasets: [
    {
      label: "Population (millions)",
      data: radialValues(2, 5),
      backgroundColor: [vueColors.blue.accent3, vueColors.teal.accent3, vueColors.orange.accent3, vueColors.amber.accent3, vueColors.deepOrange.lighten3],
      borderWidth: 0,
    },
  ],
};

const bubbleData: ChartData<"bubble"> = {
  datasets: [
    { label: "VueJs", backgroundColor: "rgba(41, 121, 255, .5)", borderColor: vueColors.indigo.accent4, data: [{ x: 72, y: 58, r: 10 }] },
    { label: "ReactJS", backgroundColor: "rgba(255, 23, 68, .42)", borderColor: vueColors.red.accent4, data: [{ x: 48, y: 75, r: 15 }] },
    { label: "Angular", backgroundColor: "rgba(213, 0, 249, .42)", borderColor: vueColors.purple.accent4, data: [{ x: 82, y: 35, r: 15 }] },
    { label: "Ionic", backgroundColor: "rgba(255, 196, 0, .52)", borderColor: vueColors.amber.accent3, data: [{ x: 38, y: 46, r: 15 }] },
  ],
};

const scatterData: ChartData<"scatter"> = {
  datasets: [
    {
      label: "My First dataset",
      data: scatterValues(2),
      backgroundColor: vueColors.blue.lighten4,
      borderColor: vueColors.blue.base,
      pointBorderWidth: 2,
      pointRadius: 4,
    },
    {
      label: "My Second dataset",
      data: scatterValues(5),
      backgroundColor: vueColors.pink.lighten4,
      borderColor: vueColors.pink.base,
      pointBorderWidth: 2,
      pointRadius: 4,
    },
  ],
};

const chartExamples = [
  { title: "Simple Bar", source: "chartjs/bar/SimpleBar", render: () => <Bar data={barData} options={commonCartesianOptions as ChartOptions<"bar">} /> },
  {
    title: "Horizontal Bar",
    source: "chartjs/bar/HorizontalBar",
    render: () => <Bar data={horizontalBarData} options={{ ...(commonCartesianOptions as ChartOptions<"bar">), indexAxis: "y" }} />,
  },
  {
    title: "Simple Line",
    source: "chartjs/line/SimpleLine",
    description: "The line chart example uses two unfilled datasets with soft point styling and month labels, matching the Vue demo structure before the chart canvas.",
    render: () => <Line data={simpleLineData} options={commonCartesianOptions as ChartOptions<"line">} />,
  },
  {
    title: "Filled Line",
    source: "chartjs/line/FilledLine",
    render: () => (
      <Line
        data={filledLineData}
        options={{
          ...(commonCartesianOptions as ChartOptions<"line">),
          interaction: { mode: "index", intersect: false },
          scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { display: false } } },
        }}
      />
    ),
  },
  { title: "Pie Chart", source: "chartjs/PieChart", height: 250, render: () => <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} /> },
  { title: "Doughnut Chart", source: "chartjs/DoughnutChart", height: 250, render: () => <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} /> },
  { title: "Radar Chart", source: "chartjs/RadarChart", height: 270, render: () => <Radar data={radarData} options={radialOptions as ChartOptions<"radar">} /> },
  {
    title: "Polararea Chart",
    source: "chartjs/PolarareaChart",
    height: 270,
    render: () => <PolarArea data={polarData} options={{ ...radialOptions, plugins: { legend: { position: "top" }, title: { display: true, text: "Chart.js PolarareaChart Chart" } } } as ChartOptions<"polarArea">} />,
  },
  {
    title: "Bubble Chart",
    source: "chartjs/BubbleChart",
    height: 270,
    render: () => (
      <Bubble
        data={bubbleData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { title: { display: true, text: "Joined" } }, x: { title: { display: true, text: "Users" } } },
        }}
      />
    ),
  },
  { title: "Scatter Chart", source: "chartjs/ScatterChart", height: 270, render: () => <Scatter data={scatterData} options={{ responsive: true, maintainAspectRatio: false }} /> },
];
