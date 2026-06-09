import { CompactList } from "../../common";

export default function TwoLinesItems() {
  return <CompactList items={[{ title: "Revenue report", subtitle: "Updated today" }, { title: "Design review", subtitle: "3 comments" }]} />;
}
