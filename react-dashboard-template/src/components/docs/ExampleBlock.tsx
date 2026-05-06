import { Box, Card, CardContent, Divider, IconButton, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { Code, GitHub, InvertColors } from "@mui/icons-material";
import type { ReactNode } from "react";

interface ExampleBlockProps {
  title: string;
  source: string;
  children: ReactNode;
  height?: number;
  description?: string;
}

export default function ExampleBlock({ title, source, children, height = 260, description }: ExampleBlockProps) {
  return (
    <Card
      sx={{
        mb: 0.5,
        borderRadius: 1,
        overflow: "hidden",
        bgcolor: "background.default",
        boxShadow: "inset -3px -3px 4px rgba(255,255,255,.68), inset 4px 4px 6px rgba(174,174,192,.18)",
      }}
    >
      <Toolbar variant="dense" sx={{ px: { xs: 1.5, md: 2 }, minHeight: 42, bgcolor: "transparent" }}>
        <Box>
          <Typography variant="subtitle1" color="text.primary" sx={{ fontSize: 15, fontWeight: 500, lineHeight: 1.35 }}>
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: 13, lineHeight: 1.45 }}>
              {description}
            </Typography>
          )}
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors">
          <IconButton size="small" sx={{ width: 26, height: 26, color: "text.secondary", mx: 0.15, bgcolor: "transparent", opacity: 0.65 }}>
            <InvertColors sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="View on Github">
          <IconButton size="small" sx={{ width: 26, height: 26, color: "text.secondary", mx: 0.15, bgcolor: "transparent", opacity: 0.65 }}>
            <GitHub sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="View source">
          <IconButton size="small" sx={{ width: 26, height: 26, color: "text.secondary", mx: 0.15, bgcolor: "transparent", opacity: 0.65 }}>
            <Code sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ px: { xs: 2, md: 2.5 }, py: 1.75, minHeight: height, display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "100%", height }}>{children}</Box>
        </Box>
        <Divider sx={{ borderColor: "rgba(111,125,133,.08)" }} />
        <Stack direction="row" alignItems="center" sx={{ px: 2, py: 0.5, bgcolor: "transparent" }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "monospace", fontSize: 11, opacity: 0.42 }}>
            {source}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
