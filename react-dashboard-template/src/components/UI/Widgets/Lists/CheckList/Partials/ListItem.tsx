import { ListItem as MuiListItem, ListItemText, Checkbox } from "@mui/material";

export default function ListItem({ label = "Checklist item", done = false }: { label?: string; done?: boolean }) {
  return <MuiListItem disableGutters><Checkbox checked={done} /><ListItemText primary={label} /></MuiListItem>;
}
