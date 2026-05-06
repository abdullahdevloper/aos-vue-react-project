import { Stack } from "@mui/material";
import { metrics } from "../../../../../data/dashboardData";
import { ProgressMetric } from "../../../../common";

export default function ColumnarStatistic() {
  return <Stack spacing={2}>{metrics.map((item, index) => <ProgressMetric key={item.label} item={item} value={(index + 2) * 18} />)}</Stack>;
}
