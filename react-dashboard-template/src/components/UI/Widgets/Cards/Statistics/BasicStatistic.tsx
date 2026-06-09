import { TrendingUp } from "@mui/icons-material";
import { MetricCard } from "../../../../common";

export default function BasicStatistic() {
  return <MetricCard title="Basic Statistic" heading="$48.2k" avatar={{ icon: <TrendingUp /> }}>12% month over month</MetricCard>;
}
