import { ListItemIcon } from "@mui/material";
import { Dashboard } from "@mui/icons-material";

export default function ItemIcon({ icon = <Dashboard /> }: { icon?: React.ReactNode }) {
  return <ListItemIcon>{icon}</ListItemIcon>;
}
