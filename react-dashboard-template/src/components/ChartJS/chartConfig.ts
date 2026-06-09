import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart as ChartJS,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PieController,
  PointElement,
  PolarAreaController,
  RadialLinearScale,
  RadarController,
  ScatterController,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PieController,
  PointElement,
  PolarAreaController,
  RadialLinearScale,
  RadarController,
  ScatterController,
  Title,
  Tooltip,
);

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "bottom" as const },
  },
};

export const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

export const palette = ["#00838f", "#ffb74d", "#43a047", "#e53935", "#5e35b1", "#039be5"];
