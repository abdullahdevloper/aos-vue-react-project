import { ContentCard, NavList } from "../../common";
import { navigationItems } from "../../../data/dashboardData";

export default function ListGroup() {
  return <ContentCard title="Navigation"><NavList items={navigationItems} /></ContentCard>;
}
