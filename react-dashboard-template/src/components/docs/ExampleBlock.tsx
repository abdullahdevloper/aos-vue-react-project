import { Box, Card, CardContent, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { Code, GitHub, InvertColors } from "@mui/icons-material";
import type { ReactNode } from "react";

interface ExampleBlockProps {
  title: string;
  source: string;
  children: ReactNode;
  height?: number;
  description?: string;
}

export default function ExampleBlock({ title, source, children, height = 330, description }: ExampleBlockProps) {
  return (
    <Card
      sx={{
        mb: 1.25,
        borderRadius: 1,
        overflow: "hidden",
        bgcolor: "background.default",
        boxShadow: "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)",
      }}
    >
      <Toolbar variant="dense" sx={{ px: { xs: 2, md: 3 }, pt: description ? 1 : 0.5, minHeight: description ? 76 : 52, bgcolor: "transparent" }}>
        <Box>
          {title && (
            <Typography variant="subtitle1" color="text.primary" sx={{ fontSize: 18, fontWeight: 500, lineHeight: 1.35 }}>
              {title}
            </Typography>
          )}
          {description && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: title ? 0.75 : 0, fontSize: 16, lineHeight: 1.55, maxWidth: 880 }}>
              {description}
            </Typography>
          )}
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors">
          <IconButton size="small" sx={{ width: 22, height: 22, color: "text.secondary", mx: 0.1, bgcolor: "transparent", opacity: 0.48 }}>
            <InvertColors sx={{ fontSize: 14 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="View on Github">
          <IconButton size="small" sx={{ width: 22, height: 22, color: "text.secondary", mx: 0.1, bgcolor: "transparent", opacity: 0.48 }}>
            <GitHub sx={{ fontSize: 14 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="View source">
          <IconButton size="small" sx={{ width: 22, height: 22, color: "text.secondary", mx: 0.1, bgcolor: "transparent", opacity: 0.48 }}>
            <Code sx={{ fontSize: 14 }} />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ px: { xs: 2.5, md: 3.5 }, pt: description && !title ? 1.25 : 2, pb: 2.75, minHeight: height, display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "100%", height }}>{children}</Box>
        </Box>
      </CardContent>
    </Card>
  );
}
