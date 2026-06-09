import { ListItem, ListItemText, Chip } from "@mui/material";

export default function FlexListItem({ title, subtitle = "Active" }: { title: string; subtitle?: string }) {
  return (
    <ListItem secondaryAction={<Chip label={subtitle} size="small" color="primary" />}>
      <ListItemText primary={title} />
    </ListItem>
  );
}
