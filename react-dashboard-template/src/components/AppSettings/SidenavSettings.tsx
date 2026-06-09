import { FormControlLabel, Stack, Switch } from "@mui/material";
import { useDashboardStore } from "../../store/useDashboardStore";

export default function SidenavSettings() {
  const mini = useDashboardStore((state) => state.miniVariant);
  const right = useDashboardStore((state) => state.sidebarRight);
  const dense = useDashboardStore((state) => state.denseNav);
  const setMini = useDashboardStore((state) => state.setMiniVariant);
  const setRight = useDashboardStore((state) => state.setSidebarRight);
  const setDense = useDashboardStore((state) => state.setDenseNav);
  return (
    <Stack>
      <FormControlLabel control={<Switch checked={mini} onChange={(event) => setMini(event.target.checked)} />} label="Mini" />
      <FormControlLabel control={<Switch checked={right} onChange={(event) => setRight(event.target.checked)} />} label="Right" />
      <FormControlLabel control={<Switch checked={dense} onChange={(event) => setDense(event.target.checked)} />} label="Dense" />
    </Stack>
  );
}
