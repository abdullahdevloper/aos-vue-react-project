import { Stack, Typography } from "@mui/material";
import { DashboardCustomize } from "@mui/icons-material";

export default function VuseLogo() {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <DashboardCustomize color="primary" />
      <Typography variant="h6" fontWeight={800}>Vuse</Typography>
    </Stack>
  );
}
