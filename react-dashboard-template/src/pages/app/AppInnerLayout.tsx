import type { ReactNode } from "react";
import { Box, Divider } from "@mui/material";

const neuInset = "inset -6px -6px 7px rgba(255,255,255,.86), inset 6px 6px 9px rgba(174,174,192,.30)";

export default function AppInnerLayout({
  sidebar,
  header,
  footer,
  children,
}: {
  sidebar: ReactNode;
  header: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Box sx={{ width: "100%", minHeight: "calc(100vh - 190px)", p: { xs: 1, md: 1.5 }, borderRadius: 1, boxShadow: neuInset, overflow: "hidden" }}>
      <Box sx={{ display: "flex", minHeight: { xs: 620, md: 690 }, height: { xs: "auto", md: "calc(100vh - 202px)" }, position: "relative" }}>
        {sidebar}
        <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", bgcolor: "transparent" }}>
          <Box sx={{ flexShrink: 0 }}>
            {header}
            <Divider sx={{ borderColor: "rgba(111,125,133,.18)" }} />
          </Box>
          <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>{children}</Box>
          {footer ? <Box sx={{ flexShrink: 0 }}>{footer}</Box> : null}
        </Box>
      </Box>
    </Box>
  );
}
