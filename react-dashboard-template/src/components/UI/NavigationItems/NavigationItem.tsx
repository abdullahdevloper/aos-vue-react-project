import { ListItemButton, ListItemText } from "@mui/material";

export default function NavigationItem({ title, path = "#" }: { title: string; path?: string }) {
  return <ListItemButton component="a" href={path}><ListItemText primary={title} /></ListItemButton>;
}
