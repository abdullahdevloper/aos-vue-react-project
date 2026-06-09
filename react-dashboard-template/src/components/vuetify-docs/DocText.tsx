import type { ReactNode } from "react";
import { Typography } from "@mui/material";

export default function DocText({ children }: { children: ReactNode }) {
  return (
    <Typography
      color="text.secondary"
      sx={{
        fontSize: { xs: 16, md: 18 },
        fontWeight: 300,
        lineHeight: 1.65,
        mb: 3,
      }}
    >
      {children}
    </Typography>
  );
}
