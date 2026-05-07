import type { ReactNode } from "react";
import { Avatar, Box, Button, Card, CardActions, CardContent, Grid, Stack, Typography } from "@mui/material";
import { CardGiftcard, Favorite, TrendingUp } from "@mui/icons-material";
import { Bar, Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import "../../../components/ChartJS/chartConfig";
import VuseSectionDefinition from "../../../components/layout/VuseSectionDefinition";

const neuGlow = "-7px -7px 5px rgba(255,255,255,.86), 7px 7px 7px rgba(174,174,192,.30)";
const neuGlowSmall = "-4px -4px 5px rgba(255,255,255,.88), 5px 5px 7px rgba(174,174,192,.28)";
const monthLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const shortLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function AnalyticalPage() {
  return (
    <>
      <VuseSectionDefinition
        title="Analytical Widgets"
        namespace="Widgets"
        icon={<CardGiftcard />}
        breadcrumbs={[
          { label: "Widgets", href: "/widgets/analytical" },
          { label: "Analytical" },
        ]}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <AnalyticIncomeExpense />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <RevenueProfileBar />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ProductComparisonBar />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ProductSalesHorizBar />
        </Grid>
        <Grid item xs={12} md={6}>
          <OrdersStackedLine />
        </Grid>
        <Grid item xs={12} md={6}>
          <NetProfitLine />
        </Grid>
      </Grid>
    </>
  );
}

function AnalysisCard({
  subtitle,
  title,
  stats,
  avatar,
  action,
  children,
}: {
  subtitle: string;
  title: string;
  stats?: ReactNode;
  avatar?: ReactNode;
  action?: string;
  children: ReactNode;
}) {
  return (
    <Card
      sx={{
        height: "100%",
        bgcolor: "background.default",
        backgroundImage: "none",
        borderRadius: 1,
        boxShadow: neuGlow,
        overflow: "hidden",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 2 }}>
        <Box>
          <Typography color="text.secondary" sx={{ fontSize: 18, fontWeight: 400, lineHeight: 1.25 }}>
            {subtitle}
          </Typography>
          <Typography variant="h4" sx={{ fontSize: 34, fontWeight: 500, lineHeight: 1.15 }}>
            {title}
          </Typography>
        </Box>
        {stats && (
          <Stack alignItems="flex-end" spacing={0.25}>
            {stats}
          </Stack>
        )}
        {avatar}
      </Stack>
      <CardContent sx={{ pt: 0, pb: action ? 0.25 : 2 }}>
        <Box sx={{ height: 184 }}>{children}</Box>
      </CardContent>
      {action && (
        <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 1.25, pt: 0 }}>
          <Button sx={{ color: "text.primary", fontWeight: 500, px: 1 }}>{action}</Button>
        </CardActions>
      )}
    </Card>
  );
}

function TrendStat({ value, suffix = "than last year" }: { value: string; suffix?: string }) {
  return (
    <>
      <Stack direction="row" alignItems="center" spacing={0.75} sx={{ color: "#00897b" }}>
        <TrendingUp sx={{ fontSize: 17 }} />
        <Typography sx={{ fontSize: 14.5 }}>{value}</Typography>
      </Stack>
      <Typography color="text.secondary" sx={{ fontSize: 14 }}>
        {suffix}
      </Typography>
    </>
  );
}

function TextStat({ value }: { value: string }) {
  return <Typography sx={{ fontSize: 15, color: "text.secondary" }}>{value}</Typography>;
}

function SoftAvatar({ children, color }: { children: ReactNode; color: string }) {
  return (
    <Avatar sx={{ bgcolor: "background.default", color, width: 48, height: 48, boxShadow: neuGlowSmall }}>
      {children}
    </Avatar>
  );
}

function AnalyticIncomeExpense() {
  return (
    <AnalysisCard subtitle="Expense" title="$42220" stats={<TrendStat value="+3.49" />} action="See Details">
      <Bar data={incomeExpenseData("#00838f", "#ffb74d")} options={compactBarOptions as ChartOptions<"bar">} />
    </AnalysisCard>
  );
}

function RevenueProfileBar() {
  return (
    <AnalysisCard subtitle="Profit" title="$38000" stats={<TrendStat value="+8.50%" />} action="See Details">
      <Bar data={incomeExpenseData("#00bcd4", "#ffc107", "Profit", "Revenue")} options={simpleHiddenBarOptions as ChartOptions<"bar">} />
    </AnalysisCard>
  );
}

function ProductComparisonBar() {
  return (
    <AnalysisCard subtitle="JS Framework" title="Comparison" stats={<TextStat value="Year 2020" />} action="See Details">
      <Bar data={comparisonData} options={compactBarOptions as ChartOptions<"bar">} />
    </AnalysisCard>
  );
}

function ProductSalesHorizBar() {
  return (
    <AnalysisCard subtitle="Sales" title="12000" stats={<TextStat value="Year 2020" />} action="See Details">
      <Bar data={productSalesData} options={{ ...(compactBarOptions as ChartOptions<"bar">), indexAxis: "y" }} />
    </AnalysisCard>
  );
}

function OrdersStackedLine() {
  return (
    <AnalysisCard subtitle="Orders" title="18K" avatar={<SoftAvatar color="#f44336"><Favorite /></SoftAvatar>}>
      <Line data={ordersLineData} options={stackedLineOptions as ChartOptions<"line">} />
    </AnalysisCard>
  );
}

function NetProfitLine() {
  return (
    <AnalysisCard subtitle="Net Profit" title="68K" avatar={<SoftAvatar color="#00bfa5"><TrendingUp /></SoftAvatar>}>
      <Line data={netProfitData} options={netProfitOptions as ChartOptions<"line">} />
    </AnalysisCard>
  );
}

function incomeExpenseData(expenseColor: string, earningColor: string, first = "Expense", second = "Earning"): ChartData<"bar"> {
  return {
    labels: monthLabels,
    datasets: [
      {
        label: first,
        backgroundColor: expenseColor,
        data: [40, 39, 20, 40, 38, 50, 40, 39, 20, 40, 38, 50],
        categoryPercentage: 0.5,
        barPercentage: 0.5,
        borderRadius: 4,
      },
      {
        label: second,
        backgroundColor: earningColor,
        data: [43, 30, 48, 47, 70, 30, 43, 30, 48, 47, 70, 30],
        categoryPercentage: 0.5,
        barPercentage: 0.5,
        borderRadius: 4,
      },
    ],
  };
}

const comparisonData: ChartData<"bar"> = {
  labels: monthLabels,
  datasets: [
    { label: "Angular", backgroundColor: "#f44336", data: [40, 39, 20, 40, 38, 50, 40, 39, 20, 40, 38, 50], categoryPercentage: 0.5, barPercentage: 0.5, borderRadius: 4 },
    { label: "VuseJs", backgroundColor: "#4caf50", data: [43, 30, 48, 47, 70, 30, 43, 30, 48, 47, 70, 30], categoryPercentage: 0.5, barPercentage: 0.5, borderRadius: 4 },
    { label: "ReactJs", backgroundColor: "#2196f3", data: [43, 30, 48, 47, 70, 30, 43, 30, 48, 47, 70, 30], categoryPercentage: 0.5, barPercentage: 0.5, borderRadius: 4 },
  ],
};

const productSalesData: ChartData<"bar"> = {
  labels: monthLabels,
  datasets: [
    { label: "Roe", backgroundColor: "#2196f3", data: [43, 30, 48, 47, 70, 30, 43, 30, 48, 47, 70, 30], categoryPercentage: 0.5, barPercentage: 0.5, borderRadius: 4 },
    { label: "Vuse", backgroundColor: "#4caf50", data: [50, 48, 53, 40, 78, 36, 40, 35, 68, 50, 68, 35], categoryPercentage: 0.5, barPercentage: 0.5, borderRadius: 4 },
  ],
};

const compactBarOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
  layout: { padding: { top: 10, left: 10, right: 10, bottom: 10 } },
  scales: {
    x: { display: false, stacked: true, grid: { display: false, offset: true } },
    y: { display: false, stacked: true, suggestedMin: 0, suggestedMax: 100 },
  },
};

const simpleHiddenBarOptions: ChartOptions<"bar"> = {
  ...compactBarOptions,
  scales: {
    x: { display: false, grid: { display: false, offset: true } },
    y: { display: false, suggestedMin: 0, suggestedMax: 100 },
  },
};

const ordersLineData: ChartData<"line"> = {
  labels: shortLabels,
  datasets: [
    { label: "Profit", fill: true, data: [40, 39, 20, 40, 38, 50, 40, 39, 20, 40, 38, 50], borderWidth: 0, pointRadius: 0, backgroundColor: "rgba(0, 200, 83, .78)", tension: 0.35 },
    { label: "Revenue", fill: true, data: [43, 30, 48, 47, 70, 30, 43, 30, 48, 47, 70, 30], borderWidth: 0, pointRadius: 0, backgroundColor: "rgba(255, 196, 0, .72)", tension: 0.35 },
  ],
};

const stackedLineOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
  layout: { padding: { left: 10, right: 10, bottom: 10, top: 10 } },
  scales: {
    x: { stacked: true, grid: { display: false }, ticks: { color: "#6f7d85" } },
    y: { stacked: true, beginAtZero: true, grid: { color: "rgba(103,116,132,.18)" } },
  },
};

const netProfitData: ChartData<"line"> = {
  labels: shortLabels,
  datasets: [
    {
      label: "Net Profit",
      fill: true,
      data: [40, 39, 20, 40, 38, 50, 40, 39, 20, 40, 38, 50],
      borderWidth: 3,
      pointRadius: 0,
      borderColor: "#304ffe",
      backgroundColor: "rgba(98, 0, 234, 0.5)",
      tension: 0.35,
    },
  ],
};

const netProfitOptions: ChartOptions<"line"> = {
  ...stackedLineOptions,
  plugins: {
    legend: { display: false },
    tooltip: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: (context) => `${context.dataset.label} $${context.parsed.y}K`,
      },
    },
  },
};
