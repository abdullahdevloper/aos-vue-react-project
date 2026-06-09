import { Inventory2 } from "@mui/icons-material";
import { MetricCard } from "../../../../common";

export default function ProductDetailsCard() {
  return <MetricCard title="Product Details" heading="Headphones" avatar={{ icon: <Inventory2 /> }}>$129 in electronics</MetricCard>;
}
