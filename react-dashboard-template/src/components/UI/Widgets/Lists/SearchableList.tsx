import { useState } from "react";
import { Stack, TextField } from "@mui/material";
import { SearchList } from "../../../common";

export default function SearchableList() {
  const [query, setQuery] = useState("");
  return (
    <Stack spacing={2}>
      <TextField size="small" label="Search" value={query} onChange={(event) => setQuery(event.target.value)} />
      <SearchList query={query} items={["Revenue report", "Design review", "Operations sync", "Chart audit"]} />
    </Stack>
  );
}
