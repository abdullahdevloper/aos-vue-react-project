import { Box, Typography } from "@mui/material";

export default function VuseSectionDefinition({ title = "Dashboard", subtitle = "React parallel component" }: { title?: string; subtitle?: string }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h5" fontWeight={800}>{title}</Typography>
      <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
    </Box>
  );
}
