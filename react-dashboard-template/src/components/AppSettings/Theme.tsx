import { FormControlLabel, Switch } from "@mui/material";
import { useDashboardStore } from "../../store/useDashboardStore";

export default function Theme() {
  const darkMode = useDashboardStore((state) => state.darkMode);
  const setDarkMode = useDashboardStore((state) => state.setDarkMode);
  return <FormControlLabel control={<Switch checked={darkMode} onChange={(event) => setDarkMode(event.target.checked)} />} label="Dark mode" />;
}
