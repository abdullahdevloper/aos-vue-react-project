import "../../../components/ChartJS/chartConfig";

import { Box, Button, Collapse, IconButton, Link, Stack, Tooltip, Typography } from "@mui/material";
import { Code, InsertChartOutlined, InvertColors } from "@mui/icons-material";
import { Bar, Bubble, Doughnut, Line, Pie, PolarArea, Radar, Scatter } from "react-chartjs-2";
import type { Chart, ChartData, ChartOptions, Plugin } from "chart.js";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import VuseSectionDefinition from "../../../components/layout/VuseSectionDefinition";
import { chartJsVueSources } from "./chartJsVueSources";

const colors = {
  blue: { base: "#2196f3", lighten1: "#42a5f5", lighten3: "#90caf9", lighten4: "#bbdefb", accent3: "#2979ff", accent4: "#2962ff" },
  purple: { lighten3: "#ce93d8", lighten4: "#e1bee7", accent3: "#d500f9", accent4: "#aa00ff" },
  indigo: { base: "#3f51b5", lighten4: "#c5cae9", accent3: "#3d5afe", accent4: "#304ffe" },
  teal: { lighten3: "#80cbc4", accent3: "#1de9b6" },
  green: { base: "#4caf50", accent3: "#00e676", accent4: "#00c853" },
  orange: { base: "#ff9800", lighten3: "#ffcc80", accent3: "#ff9100", accent4: "#ff6d00" },
  red: { lighten3: "#ef9a9a", lighten4: "#ffcdd2", accent3: "#ff1744", accent4: "#d50000" },
  amber: { lighten3: "#ffe082", lighten4: "#ffecb3", accent3: "#ffc400", accent4: "#ffab00" },
  pink: { base: "#e91e63", lighten4: "#f8bbd0", accent4: "#c51162" },
  deepOrange: { lighten3: "#ffab91" },
};

const monthLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const frameworkLabels = ["VueJs", "ReactJs", "EmberJs", "AngularJs"];
const defaultLinearStroke: [number, number, number, number] = [0, 0, 0, 450];

const chartStylePlugin: Plugin = {
  id: "vuse-chartjs-style",
  beforeDatasetDraw(chart, args) {
    const dataset = chart.data.datasets[args.index] as VueDataset;
    if (!dataset.shadowColor) return;

    chart.ctx.save();
    chart.ctx.shadowOffsetX = dataset.shadowOffsetX ?? 0;
    chart.ctx.shadowOffsetY = dataset.shadowOffsetY ?? 0;
    chart.ctx.shadowBlur = dataset.shadowBlur ?? 0;
    chart.ctx.shadowColor = dataset.shadowColor;
  },
  afterDatasetDraw(chart, args) {
    const dataset = chart.data.datasets[args.index] as VueDataset;
    if (dataset.shadowColor) chart.ctx.restore();
  },
};

export default function ChartJsPage() {
  const randomData = useMemo(() => createRandomData(), []);
  const examples = useMemo(() => createExamples(randomData), [randomData]);

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

      <Box sx={{ width: "100%", maxWidth: "100%", p: "12px", mx: "auto" }}>
        <Box sx={{ display: "flex", flex: "1 1 auto", flexWrap: "wrap", mx: 0 }}>
          <Box sx={{ flex: "0 0 100%", maxWidth: "100%", width: "100%", px: 0, py: "12px" }}>
            <Box component="section">
              <Typography
                component="div"
                sx={{
                  mb: 3,
                  color: "rgba(0, 0, 0, 0.54)",
                  fontSize: { xs: 16, sm: 20 },
                  fontWeight: 300,
                  lineHeight: 1.5,
                }}
              >
                <InlineCode>vue-chartjs</InlineCode> is a wrapper for{" "}
                <Link href="https://github.com/chartjs/Chart.js" target="_blank" rel="noreferrer" underline="none" sx={{ fontWeight: 500 }}>
                  Chart.js
                </Link>{" "}
                in vue. You can easily create reuseable chart components.
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flex: "1 1 auto", flexWrap: "wrap", mx: 0 }}>
          <Box sx={{ flex: "0 0 100%", maxWidth: "100%", width: "100%", px: 0, py: "12px" }}>
            <Box component="section" id="examples">
              <DocHeading>Examples</DocHeading>
              <Typography
                sx={{
                  mb: 3,
                  color: "rgba(0, 0, 0, 0.54)",
                  fontSize: 16,
                  lineHeight: 1.55,
                }}
              >
                Below is a collection of simple to complex examples.
              </Typography>

              {examples.map((example) => (
                <ChartExample key={example.source} example={example} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

function ChartExample({ example }: { example: ChartExampleDef }) {
  const [dark, setDark] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  const sourceSections = useMemo(() => parseVueSource(example.rawSource), [example.rawSource]);
  const tabs = sourceSections.map((section) => section.name);
  const [selected, setSelected] = useState("template");
  const activeSource = sourceSections.find((section) => section.name === selected) ?? sourceSections[0];

  return (
    <Box
      component="section"
      id={kebabCase(example.title)}
      sx={{
        mb: "40px",
        borderRadius: "4px",
        bgcolor: "#fff",
        color: "rgba(0, 0, 0, 0.87)",
        overflow: "hidden",
        position: "relative",
        minWidth: 0,
        boxShadow: "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.18)",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          bgcolor: "transparent",
          display: "flex",
          height: 48,
          minHeight: 48,
          px: 2,
          position: "relative",
          width: "100%",
        }}
      >
        <Box sx={{ alignItems: "center", display: "flex", flex: "0 0 auto", minWidth: 0 }}>
          <DocHeading small>{example.title}</DocHeading>
        </Box>
        <Box sx={{ flex: "1 1 auto" }} />
        <Tooltip title="Invert example colors" placement="bottom">
          <IconButton aria-label="Invert example colors" size="small" onClick={() => setDark((value) => !value)} sx={{ width: 28, height: 28 }}>
            <InvertColors sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="View source" placement="bottom">
          <IconButton aria-label="View source" size="small" onClick={() => setSourceOpen((value) => !value)} sx={{ width: 28, height: 28 }}>
            <Code sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Collapse in={sourceOpen}>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#fff" }}>
          <Stack direction="row" spacing={1} sx={{ p: 1 }}>
            {tabs.map((section) => (
              <Button
                key={section}
                size="small"
                variant={selected === section ? "contained" : "text"}
                onClick={() => setSelected(section)}
                sx={{
                  borderRadius: 10,
                  minHeight: 36,
                  px: 2,
                  color: selected === section ? "#fff" : "rgba(255,255,255,.85)",
                  bgcolor: selected === section ? "#616161" : "transparent",
                  textTransform: "none",
                  "&:hover": { bgcolor: selected === section ? "#616161" : "rgba(255,255,255,.08)" },
                }}
              >
                {section}
              </Button>
            ))}
          </Stack>
          <Box sx={{ borderTop: "1px solid rgba(255,255,255,.12)", p: 2, overflowX: "auto" }}>
            <Box component="pre" sx={{ m: 0, fontSize: 13, lineHeight: 1.6, fontFamily: "monospace", whiteSpace: "pre" }}>
              {activeSource?.content ?? example.rawSource}
            </Box>
          </Box>
        </Box>
      </Collapse>

      <Box
        sx={{
          p: "16px",
          bgcolor: dark ? "#303030" : "transparent",
          color: dark ? "#fff" : "inherit",
          transition: "background-color .3s cubic-bezier(.25,.8,.5,1), color .3s cubic-bezier(.25,.8,.5,1)",
        }}
      >
        <Box data-app="true">
          {example.description && (
            <Typography
              component="div"
              sx={{
                mb: 1.5,
                color: dark ? "rgba(255,255,255,.7)" : "rgba(0, 0, 0, 0.54)",
                fontSize: { xs: 16, sm: 20 },
                fontWeight: 300,
                lineHeight: 1.5,
              }}
            >
              {example.description}
            </Typography>
          )}
          {example.render()}
        </Box>
      </Box>
    </Box>
  );
}

function DocHeading({ children, small = false }: { children: ReactNode; small?: boolean }) {
  return (
    <Typography
      component={small ? "h3" : "h2"}
      sx={{
        display: "inline-flex",
        m: 0,
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: small ? "1.5rem" : "2rem",
        fontWeight: 500,
        lineHeight: 1.35,
      }}
    >
      {children}
    </Typography>
  );
}

function InlineCode({ children }: { children: ReactNode }) {
  return (
    <Box
      component="code"
      sx={{
        px: 0.45,
        py: 0.1,
        borderRadius: 0.75,
        color: "#c0341d",
        bgcolor: "#fbe5e1",
        fontFamily: "monospace",
        fontSize: "0.875em",
        boxShadow: "none",
      }}
    >
      {children}
    </Box>
  );
}

function createExamples(randomData: RandomChartData): ChartExampleDef[] {
  return [
    {
      title: "Bar",
      description: "A bar chart is a way of showing data as bars. It is sometimes used to show trend data, and the comparison of multiple data sets side by side.",
      source: "chartjs/bar/SimpleBar",
      height: 260,
      render: () => <VueChartCanvas type="bar" data={barData()} options={barOptions} plugins={[chartStylePlugin]} width={400} height={260} canvasStyleWidth="50%" />,
      rawSource: chartJsVueSources.SimpleBar,
    },
    {
      title: "Horizontal Bar",
      description: "",
      source: "chartjs/bar/HorizontalBar",
      height: 260,
      render: () => <VueChartCanvas type="bar" data={horizontalBarData()} options={horizontalBarOptions} plugins={[chartStylePlugin]} width={400} height={260} canvasStyleWidth="50%" />,
      rawSource: chartJsVueSources.HorizontalBar,
    },
    {
      title: "Line Chart",
      description: "A line chart is a way of plotting data points on a line. Often, it is used to show trend data, and the comparison of two data sets.",
      source: "chartjs/line/SimpleLine",
      height: 400,
      render: () => <VueChartCanvas type="line" data={simpleLineData()} options={lineOptions} plugins={[chartStylePlugin]} width={400} height={400} />,
      rawSource: chartJsVueSources.SimpleLine,
    },
    {
      title: "Filled Line Chart",
      description: "",
      source: "chartjs/line/FilledLine",
      height: 400,
      render: () => <VueChartCanvas type="line" data={filledLineData()} options={filledLineOptions} plugins={[chartStylePlugin]} width={400} height={400} />,
      rawSource: chartJsVueSources.FilledLine,
    },
    {
      title: "Pie Chart",
      description: "",
      source: "chartjs/PieChart",
      height: 400,
      render: () => <VueChartCanvas type="pie" data={pieData()} options={simpleResponsiveOptions} width={400} height={400} />,
      rawSource: chartJsVueSources.PieChart,
    },
    {
      title: "Doughnut Chart",
      description: "",
      source: "chartjs/DoughnutChart",
      height: 400,
      render: () => <VueChartCanvas type="doughnut" data={doughnutData()} options={simpleResponsiveOptions} width={400} height={400} />,
      rawSource: chartJsVueSources.DoughnutChart,
    },
    {
      title: "Radar Chart",
      description: "",
      source: "chartjs/RadarChart",
      height: 200,
      render: () => <VueChartCanvas type="radar" data={radarData(randomData.radarFirst, randomData.radarSecond)} options={radarOptions} width={400} height={200} />,
      rawSource: chartJsVueSources.RadarChart,
    },
    {
      title: "Polar Chart",
      description: "",
      source: "chartjs/PolarareaChart",
      height: 200,
      render: () => <VueChartCanvas type="polarArea" data={polarData(randomData.polar)} options={polarOptions} width={400} height={200} />,
      rawSource: chartJsVueSources.PolarareaChart,
    },
    {
      title: "Bubble Chart",
      description: "",
      source: "chartjs/BubbleChart",
      height: 200,
      render: () => <VueChartCanvas type="bubble" data={bubbleData(randomData.bubble)} options={bubbleOptions} width={400} height={200} />,
      rawSource: chartJsVueSources.BubbleChart,
    },
    {
      title: "Scatter Chart",
      description: "",
      source: "chartjs/ScatterChart",
      height: 400,
      render: () => <VueChartCanvas type="scatter" data={scatterData(randomData.scatterFirst, randomData.scatterSecond)} options={scatterOptions} width={400} height={400} />,
      rawSource: chartJsVueSources.ScatterChart,
    },
  ];
}

function VueChartCanvas({ type, data, options, plugins, width, height, canvasStyleWidth }: VueChartCanvasProps) {
  const chartRef = useRef<Chart | null>(null);
  const [chartData, setChartData] = useState<ChartData>(data);
  const sizedOptions = useMemo(() => applyVueCanvasSizing(options, width, height), [height, options, width]);

  useEffect(() => {
    setChartData(data);
  }, [data]);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    if (canvasStyleWidth) {
      chart.canvas.style.width = canvasStyleWidth;
    }

    setChartData(resolveVueChartData(data, chart.canvas));
  }, [canvasStyleWidth, data]);

  const common = {
    ref: chartRef as never,
    data: chartData as never,
    options: sizedOptions as never,
    plugins,
    width,
    height,
    style: canvasStyleWidth ? ({ width: canvasStyleWidth } as const) : undefined,
  };

  let chart: ReactNode;
  if (type === "bar") chart = <Bar {...common} />;
  else if (type === "line") chart = <Line {...common} />;
  else if (type === "pie") chart = <Pie {...common} />;
  else if (type === "doughnut") chart = <Doughnut {...common} />;
  else if (type === "radar") chart = <Radar {...common} />;
  else if (type === "polarArea") chart = <PolarArea {...common} />;
  else if (type === "bubble") chart = <Bubble {...common} />;
  else chart = <Scatter {...common} />;

  return <Box>{chart}</Box>;
}

function barData(): ChartData<"bar"> {
  return {
    labels: monthLabels,
    datasets: [
      withVueStyle({
        label: "Expense",
        data: [40, 39, 20, 40, 38, 50, 40, 39, 20, 40, 38, 50],
        gradientFill: [colors.purple.lighten4, colors.purple.accent4],
        categoryPercentage: 0.5,
        barPercentage: 0.5,
        shadowOffsetX: 2,
        shadowOffsetY: 4,
        shadowBlur: 8,
        shadowColor: "rgba(66, 165, 245, 0.5)",
      }),
      withVueStyle({
        label: "Earning",
        data: [43, 30, 48, 47, 70, 30, 43, 30, 48, 47, 70, 30],
        gradientFill: [colors.blue.lighten4, colors.blue.accent4],
        categoryPercentage: 0.5,
        barPercentage: 0.5,
        shadowOffsetX: 2,
        shadowOffsetY: 4,
        shadowBlur: 8,
        shadowColor: "rgba(66, 165, 245, 0.5)",
      }),
    ],
  };
}

function horizontalBarData(): ChartData<"bar"> {
  return {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      withVueStyle({
        label: "Expense",
        data: [40, 39, 20, 40, 38, 50, 40, 39, 20, 40, 38, 50],
        gradientFill: [colors.orange.base, colors.orange.accent4],
        categoryPercentage: 0.5,
        barPercentage: 0.5,
        shadowOffsetX: 2,
        shadowOffsetY: 4,
        shadowBlur: 8,
        shadowColor: "rgba(66, 165, 245, 0.5)",
      }),
      withVueStyle({
        label: "Earning",
        data: [43, 30, 48, 47, 70, 30, 43, 30, 48, 47, 70, 30],
        gradientFill: [colors.green.base, colors.green.accent4],
        categoryPercentage: 0.5,
        barPercentage: 0.5,
        shadowOffsetX: 2,
        shadowOffsetY: 4,
        shadowBlur: 8,
        shadowColor: "rgba(66, 165, 245, 0.5)",
      }),
    ],
  };
}

function simpleLineData(): ChartData<"line"> {
  return {
    labels: monthLabels,
    datasets: [
      withVueStyle({
        label: "Expense",
        fill: false,
        data: [40, 39, 20, 40, 38, 50, 40, 39, 20, 40, 38, 50],
        gradientStroke: [colors.blue.base, colors.blue.accent3],
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 10,
        shadowColor: "rgba(103, 116, 132, 0.5)",
        pointRadius: 4,
        pointBevelWidth: 3,
        pointHoverRadius: 6,
        pointHoverBevelWidth: 4.5,
        pointHoverInnerGlowWidth: 20,
        pointHoverInnerGlowColor: "rgba(103, 116, 132, 0.5)",
      }),
      withVueStyle({
        label: "Earning",
        fill: false,
        data: [43, 30, 48, 47, 70, 30, 43, 30, 48, 47, 70, 30],
        gradientStroke: [colors.indigo.base, colors.indigo.accent3],
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 10,
        shadowColor: "rgba(103, 116, 132, 0.5)",
        pointRadius: 4,
        pointBevelWidth: 3,
        pointHoverRadius: 6,
        pointHoverBevelWidth: 4.5,
        pointHoverInnerGlowWidth: 20,
        pointHoverInnerGlowColor: "rgba(103, 116, 132, 0.5)",
      }),
    ],
  };
}

function filledLineData(): ChartData<"line"> {
  return {
    labels: monthLabels,
    datasets: [
      withVueStyle({
        label: "Expense",
        fill: true,
        data: [40, 39, 20, 40, 38, 50, 40, 39, 20, 40, 38, 50],
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 10,
        shadowColor: "rgba(103, 116, 132, 0.5)",
        pointRadius: 0,
        borderWidth: 0,
        pointHoverInnerGlowColor: "rgba(103, 116, 132, 0.5)",
        gradientFill: [colors.blue.lighten4, colors.blue.accent4],
        order: 0,
      }),
      withVueStyle({
        label: "Earning",
        fill: true,
        data: [43, 30, 48, 47, 70, 30, 43, 30, 48, 47, 70, 30],
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 10,
        shadowColor: "rgba(103, 116, 132, 0.5)",
        pointRadius: 0,
        borderWidth: 0,
        pointHoverInnerGlowColor: "rgba(103, 116, 132, 0.5)",
        gradientFill: [colors.indigo.lighten4, colors.indigo.accent4],
        order: 1,
      }),
    ],
  };
}

function pieData(): ChartData<"pie"> {
  return {
    labels: frameworkLabels,
    datasets: [
      {
        data: [40, 40, 15, 10],
        gradientFill: [
          [colors.blue.lighten3, colors.green.accent3],
          [colors.purple.lighten3, colors.blue.accent3],
          [colors.red.lighten3, colors.amber.accent3],
          [colors.amber.lighten3, colors.indigo.accent3],
        ],
      } as never,
    ],
  };
}

function doughnutData(): ChartData<"doughnut"> {
  return {
    labels: frameworkLabels,
    datasets: [
      {
        data: [40, 40, 15, 10],
        gradientFill: [
          [colors.purple.lighten3, colors.blue.accent3],
          [colors.purple.lighten3, colors.teal.accent3],
          [colors.orange.lighten3, colors.orange.accent3],
          [colors.red.lighten4, colors.amber.accent3],
        ],
      } as never,
    ],
  };
}

function radarData(first: number[], second: number[]): ChartData<"radar"> {
  return {
    labels: [["Eating", "Dinner"], ["Drinking", "Water"], "Sleeping", ["Designing", "Graphics"], "Coding", "Cycling", "Running"],
    datasets: [
      {
        label: "My First dataset",
        gradientFill: [colors.purple.lighten3, colors.blue.accent3],
        borderColor: colors.blue.lighten3,
        pointBackgroundColor: colors.blue.accent3,
        data: first,
      } as never,
      {
        label: "My Second dataset",
        gradientFill: [colors.purple.lighten3, colors.teal.accent3],
        borderColor: colors.teal.lighten3,
        pointBackgroundColor: colors.teal.accent3,
        data: second,
      } as never,
    ],
  };
}

function polarData(values: number[]): ChartData<"polarArea"> {
  return {
    labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    datasets: [
      {
        label: "Population (millions)",
        data: values,
        gradientFill: [
          [colors.purple.lighten3, colors.blue.accent3],
          [colors.purple.lighten3, colors.teal.accent3],
          [colors.orange.lighten3, colors.orange.accent3],
          [colors.red.lighten4, colors.amber.accent3],
          [colors.deepOrange.lighten3, colors.blue.lighten1],
        ],
      } as never,
    ],
  };
}

function bubbleData(points: BubblePoint[]): ChartData<"bubble"> {
  return {
    labels: "Js Frameworks" as never,
    datasets: [
      withVueStyle({ label: ["VueJs"], gradientFill: [colors.purple.lighten3, colors.blue.accent3], borderColor: colors.indigo.accent4, data: [{ ...points[0], r: 10 }] }),
      withVueStyle({ label: ["ReactJS"], gradientFill: [colors.red.lighten4, colors.red.accent3], borderColor: colors.red.accent4, data: [{ ...points[1], r: 15 }] }),
      withVueStyle({ label: ["Angular"], gradientFill: [colors.purple.lighten4, colors.purple.accent3], borderColor: colors.purple.accent4, data: [{ ...points[2], r: 15 }] }),
      withVueStyle({ label: ["Ionic"], gradientFill: [colors.amber.lighten4, colors.amber.accent3], borderColor: colors.amber.accent4, data: [{ ...points[3], r: 15 }] }),
    ],
  };
}

function scatterData(first: ScatterPoint[], second: ScatterPoint[]): ChartData<"scatter"> {
  return {
    datasets: [
      withVueStyle({
        label: "My First dataset",
        data: first,
        gradientFill: [colors.blue.lighten4, colors.blue.accent4],
        borderColor: "transparent",
        pointBorderColor: colors.blue.base,
        pointBackgroundColor: colors.blue.lighten4,
        pointBorderWidth: 2,
        pointHoverBorderWidth: 2,
        pointRadius: 4,
      }),
      withVueStyle({
        label: "My Second dataset",
        data: second,
        gradientFill: [colors.pink.lighten4, colors.pink.accent4],
        borderColor: "transparent",
        pointBorderColor: colors.pink.base,
        pointBackgroundColor: colors.pink.lighten4,
        pointBorderWidth: 2,
        pointHoverBorderWidth: 2,
        pointRadius: 4,
      }),
    ],
  };
}

const barOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  layout: { padding: { left: 10, right: 10, bottom: 10 } },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true, grid: { offset: true } },
  },
};

const horizontalBarOptions: ChartOptions<"bar"> = {
  ...barOptions,
  indexAxis: "y",
  scales: {
    x: { beginAtZero: true, grid: { display: true } },
    y: { grid: { display: false } },
  },
};

const lineOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  layout: { padding: { left: 10, right: 10, bottom: 10 } },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true, grid: { offset: true } },
  },
};

const filledLineOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
  layout: { padding: { left: 10, right: 10, bottom: 10 } },
  scales: {
    x: { grid: { display: false, color: "transparent" } },
    y: { beginAtZero: true, grid: { display: false, drawTicks: false } },
  },
};

const simpleResponsiveOptions: ChartOptions<"pie" | "doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
};

const radarOptions: ChartOptions<"radar"> = {
  plugins: { legend: { position: "top" }, title: { display: true, text: "Chart.js Radar Chart" } },
  scales: { r: { beginAtZero: true } },
};

const polarOptions: ChartOptions<"polarArea"> = {
  plugins: { legend: { position: "top" }, title: { display: true, text: "Chart.js PolarareaChart Chart" } },
};

const bubbleOptions: ChartOptions<"bubble"> = {
  scales: {
    y: { title: { display: true, text: "Joined" } },
    x: { title: { display: true, text: "Users" } },
  },
};

const scatterOptions: ChartOptions<"scatter"> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 800 },
};

function resolveVueChartData(data: ChartData, canvas: HTMLCanvasElement): ChartData {
  const datasets = (data.datasets ?? []).map((dataset) => {
    const source = { ...(dataset as VueDataset) };
    const linearStroke = source.linearStroke ?? defaultLinearStroke;

    if (source.gradientStroke?.length) {
      const gradientStroke = makeGradient(canvas, source.gradientStroke, linearStroke);

      if (!hasOwn(source, "borderColor")) source.borderColor = gradientStroke;
      if (!hasOwn(source, "pointBorderColor")) source.pointBorderColor = gradientStroke;
      if (!hasOwn(source, "pointBackgroundColor")) source.pointBackgroundColor = gradientStroke;
      if (!hasOwn(source, "pointHoverBackgroundColor")) source.pointHoverBackgroundColor = gradientStroke;
      if (!hasOwn(source, "pointHoverBorderColor")) source.pointHoverBorderColor = gradientStroke;
    }

    if (source.gradientFill?.length) {
      if (isGradientSetList(source.gradientFill)) {
        const backgroundColor = source.gradientFill.map((stops) => makeGradient(canvas, stops, linearStroke));
        if (!hasOwn(source, "backgroundColor")) source.backgroundColor = backgroundColor;
      } else if (!hasOwn(source, "backgroundColor")) {
        source.backgroundColor = makeGradient(canvas, source.gradientFill as GradientStops, linearStroke);
      }
    }

    return source as never;
  });

  return { ...data, datasets };
}

function makeGradient(canvas: HTMLCanvasElement, stops: GradientStops, linearStroke: [number, number, number, number]) {
  const context = canvas.getContext("2d");
  const gradient = context?.createLinearGradient(...linearStroke);
  if (!gradient) return stops[0];

  stops.forEach((stop, index) => {
    if (typeof stop === "string") {
      gradient.addColorStop(Number((index > 0 ? 1 / index : 0).toFixed(1)), stop);
    } else {
      gradient.addColorStop(stop.stop, stop.color);
    }
  });
  return gradient;
}

function hasOwn(target: object, key: string) {
  return Object.prototype.hasOwnProperty.call(target, key);
}

function applyVueCanvasSizing(options: ChartOptions, width: number, height: number): ChartOptions {
  if (hasOwn(options, "maintainAspectRatio")) return options;

  return {
    ...options,
    responsive: options.responsive ?? true,
    maintainAspectRatio: true,
    aspectRatio: width / height,
  };
}

function isGradientSetList(value: GradientFill): value is GradientStops[] {
  return Array.isArray(value[0]);
}

function withVueStyle<T extends VueDataset>(dataset: T) {
  return dataset as never;
}

function createRandomData(): RandomChartData {
  return {
    radarFirst: randomArray(7),
    radarSecond: randomArray(7),
    polar: randomArray(5),
    bubble: randomArray(8).reduce<BubblePoint[]>((points, value, index, values) => {
      if (index % 2 === 0) points.push({ x: value, y: values[index + 1] });
      return points;
    }, []),
    scatterFirst: randomPoints(7),
    scatterSecond: randomPoints(7),
  };
}

function randomArray(length: number) {
  return Array.from({ length }, () => Math.round(Math.random() * 100));
}

function randomPoints(length: number): ScatterPoint[] {
  return Array.from({ length }, () => ({ x: Math.round(Math.random() * 100), y: Math.round(Math.random() * 100) }));
}

function parseVueSource(rawSource: string): SourceSection[] {
  const sections: SourceSection[] = [];
  const orderedTags = ["template", "style", "script"];

  orderedTags.forEach((name) => {
    const match = rawSource.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, "i"));
    if (match) sections.push({ name, content: match[1].trim() });
  });

  return sections.length > 0 ? sections : [{ name: "source", content: rawSource }];
}

function kebabCase(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

interface ChartExampleDef {
  title: string;
  description: string;
  source: string;
  height: number;
  render: () => ReactNode;
  rawSource: string;
}

interface VueChartCanvasProps {
  type: ChartKind;
  data: ChartData;
  options: ChartOptions;
  plugins?: Plugin[];
  width: number;
  height: number;
  canvasStyleWidth?: string;
}

interface SourceSection {
  name: string;
  content: string;
}

interface VueDataset {
  label?: string | string[];
  data?: unknown;
  fill?: boolean;
  order?: number;
  backgroundColor?: unknown;
  borderColor?: unknown;
  gradientFill?: GradientFill;
  gradientStroke?: GradientStops;
  linearStroke?: [number, number, number, number];
  borderWidth?: number;
  pointBorderColor?: unknown;
  pointBackgroundColor?: unknown;
  pointHoverBackgroundColor?: unknown;
  pointHoverBorderColor?: unknown;
  pointBorderWidth?: number;
  pointHoverBorderWidth?: number;
  pointRadius?: number;
  pointBevelWidth?: number;
  pointHoverRadius?: number;
  pointHoverBevelWidth?: number;
  pointHoverInnerGlowWidth?: number;
  pointHoverInnerGlowColor?: string;
  categoryPercentage?: number;
  barPercentage?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowBlur?: number;
  shadowColor?: string;
}

interface ScatterPoint {
  x: number;
  y: number;
}

interface BubblePoint extends ScatterPoint {
  r?: number;
}

interface RandomChartData {
  radarFirst: number[];
  radarSecond: number[];
  polar: number[];
  bubble: BubblePoint[];
  scatterFirst: ScatterPoint[];
  scatterSecond: ScatterPoint[];
}

type GradientStop = string | { stop: number; color: string };
type GradientStops = GradientStop[];
type GradientFill = GradientStops | GradientStops[];
type ChartKind = "bar" | "line" | "pie" | "doughnut" | "radar" | "polarArea" | "bubble" | "scatter";
