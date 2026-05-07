import { Box, Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import FullPageShell from "./components/FullPageShell";
import maintenanceImage from "../../assets/pages/illustrator/under_construction.png";

const secondary = "#ffb74d";

export default function MaintenancePage() {
  return (
    <FullPageShell>
      <Stack sx={{ minHeight: { xs: 470, sm: 505 }, height: "100%", px: { xs: 3, sm: 5 }, py: { xs: 2.5, sm: 3 } }}>
        <Box component="img" src={maintenanceImage} alt="Under construction illustration" sx={{ width: "100%", height: 250, objectFit: "contain" }} />

        <Box sx={{ flexGrow: 1, minHeight: { xs: 18, sm: 26 } }} />

        <Typography component="h1" sx={{ textAlign: "center", fontSize: { xs: 30, sm: 34 }, fontWeight: 400, color: "text.primary", lineHeight: 1.25 }}>
          Under Maintenance!
        </Typography>

        <Stack alignItems="center" sx={{ px: { xs: 0, sm: 5 }, mt: { xs: 2.2, sm: 2.6 }, mb: { xs: 1, sm: 1.5 } }}>
          <Typography sx={{ textAlign: "center", fontSize: { xs: 15.5, sm: 16 }, color: "text.primary", lineHeight: 1.65, mb: 2.6 }}>
            Scheduled maintenance is currently in progress. <br />
            Please check back soon We apologize for any inconvenience.
          </Typography>
          <Button component={RouterLink} to="/dashboard/operational" sx={secondaryButtonSx}>
            Back To Home
          </Button>
        </Stack>
      </Stack>
    </FullPageShell>
  );
}

const secondaryButtonSx = {
  minHeight: 36,
  px: 2.4,
  borderRadius: 1,
  bgcolor: secondary,
  color: "#263238",
  fontSize: 14,
  fontWeight: 500,
  letterSpacing: 0.25,
  textTransform: "uppercase",
  boxShadow: "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)",
  "&:hover": { bgcolor: "#ffa726", boxShadow: "0 4px 5px rgba(0,0,0,.18)" },
  "&:active": { bgcolor: "#fb9f18", boxShadow: "0 2px 3px rgba(0,0,0,.18)", transform: "translateY(1px)" },
  "&:focus-visible": { outline: "2px solid rgba(255,183,77,.5)", outlineOffset: 2 },
};
