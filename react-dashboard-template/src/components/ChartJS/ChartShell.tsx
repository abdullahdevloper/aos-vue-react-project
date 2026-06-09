import type { PropsWithChildren } from "react";
import { Card, CardContent, CardHeader, Box } from "@mui/material";
import type { ChartPanelProps } from "../../types/dashboard";

export function ChartShell({ title = "Chart", height = 280, children }: PropsWithChildren<ChartPanelProps>) {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <Box sx={{ height }}>{children}</Box>
      </CardContent>
    </Card>
  );
}
