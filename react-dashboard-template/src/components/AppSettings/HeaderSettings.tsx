import { FormControlLabel, Switch } from "@mui/material";
import { useDashboardStore } from "../../store/useDashboardStore";

export default function HeaderSettings() {
  const visible = useDashboardStore((state) => state.headerVisible);
  const setVisible = useDashboardStore((state) => state.setHeaderVisible);
  return <FormControlLabel control={<Switch checked={visible} onChange={(event) => setVisible(event.target.checked)} />} label="Header" />;
}
