import { FormControlLabel, Switch } from "@mui/material";
import { useDashboardStore } from "../../store/useDashboardStore";

export default function FooterSettings() {
  const visible = useDashboardStore((state) => state.footerVisible);
  const setVisible = useDashboardStore((state) => state.setFooterVisible);
  return <FormControlLabel control={<Switch checked={visible} onChange={(event) => setVisible(event.target.checked)} />} label="Footer" />;
}
