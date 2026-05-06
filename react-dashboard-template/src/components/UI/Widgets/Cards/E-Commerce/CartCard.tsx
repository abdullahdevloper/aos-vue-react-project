import { ShoppingCart } from "@mui/icons-material";
import { Button } from "@mui/material";
import { ContentCard, CompactList } from "../../../../common";
import { commerceItems } from "../../../../../data/dashboardData";

export default function CartCard() {
  return <ContentCard title="Cart" action={<Button size="small">Checkout</Button>}><CompactList items={commerceItems.map((item) => ({ title: item.name, subtitle: item.price, icon: <ShoppingCart /> }))} /></ContentCard>;
}
