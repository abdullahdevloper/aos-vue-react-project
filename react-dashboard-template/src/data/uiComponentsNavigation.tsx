import { Article, CardGiftcard, Dashboard, Equalizer, FormatListBulleted, InsertChartOutlined, OfflineBolt, ShowChart, WidgetsOutlined } from "@mui/icons-material";

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
      {
        title: "Widgets",
        icon: <WidgetsOutlined />,
        children: [
          { title: "Cards", path: "/widgets/card", icon: <CardGiftcard /> },
          { title: "Lists", path: "/widgets/lists", icon: <FormatListBulleted /> },
          { title: "Statistic", path: "/widgets/statistic", icon: <Equalizer /> },
          { title: "Chart", path: "/widgets/analytical", icon: <ShowChart /> },
          { title: "Document Cards", path: "/widgets/document-cards", icon: <Article /> },
        ],
      },
      {
        title: "Vuetify",
        icon: <Dashboard />,
        children: [{ title: "Api Explorer", path: "/components/vuetify/api-explorer", icon: <Dashboard /> }],
      },
    ],
  },
];
