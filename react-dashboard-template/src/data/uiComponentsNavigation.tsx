import { InsertChartOutlined, OfflineBolt } from "@mui/icons-material";

export const uiComponentsNavigation = [
  {
    section: "UI Components",
    items: [
      {
        title: "Charts",
        icon: <InsertChartOutlined />,
        children: [
          { title: "Spark Line", path: "/charts/spark-line", icon: <OfflineBolt /> },
          { title: "ChartJS", path: "/charts/chartjs", icon: <InsertChartOutlined /> },
        ],
      },
    ],
  },
];
