import { Box, Card, CardContent, Divider, IconButton, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { Code, GitHub, InvertColors } from "@mui/icons-material";
import type { ReactNode } from "react";

interface ExampleBlockProps {
  title: string;
  source: string;
  children: ReactNode;
  height?: number;
}

export default function ExampleBlock({ title, source, children, height = 300 }: ExampleBlockProps) {
  return (
    <Card
      sx={{
        mb: 1,
        borderRadius: 1,
        overflow: "hidden",
        bgcolor: "background.default",
        boxShadow: "inset -7px -7px 5px rgba(255,255,255,.86), inset 7px 7px 7px rgba(174,174,192,.32)",
      }}
    >
      <Toolbar variant="dense" sx={{ px: { xs: 1.5, md: 2 }, minHeight: 48, bgcolor: "transparent" }}>
        <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 500 }}>
          {title}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors">
          <IconButton size="small" sx={{ color: "text.secondary", mx: 0.25, bgcolor: "background.default", boxShadow: "-4px -4px 5px rgba(255,255,255,.8), 4px 4px 6px rgba(174,174,192,.28)" }}>
            <InvertColors fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="View on Github">
          <IconButton size="small" sx={{ color: "text.secondary", mx: 0.25, bgcolor: "background.default", boxShadow: "-4px -4px 5px rgba(255,255,255,.8), 4px 4px 6px rgba(174,174,192,.28)" }}>
            <GitHub fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="View source">
          <IconButton size="small" sx={{ color: "text.secondary", mx: 0.25, bgcolor: "background.default", boxShadow: "-4px -4px 5px rgba(255,255,255,.8), 4px 4px 6px rgba(174,174,192,.28)" }}>
            <Code fontSize="small" />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ px: { xs: 2, md: 3 }, py: 2.5, minHeight: height, display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "100%", height }}>{children}</Box>
        </Box>
        <Divider sx={{ borderColor: "rgba(111,125,133,.12)" }} />
        <Stack direction="row" alignItems="center" sx={{ px: 2.25, py: 1, bgcolor: "transparent" }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "monospace" }}>
            {source}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
