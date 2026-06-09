import { Stack } from "@mui/material";
import FlexListItem from "./Partials/FlexListItem";

export default function FlexList({ items = ["Design", "Develop", "Deploy"] }: { items?: string[] }) {
  return <Stack spacing={1}>{items.map((item) => <FlexListItem key={item} title={item} />)}</Stack>;
}
