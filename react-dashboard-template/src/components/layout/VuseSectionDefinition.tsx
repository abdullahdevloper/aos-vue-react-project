import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

export interface SectionCrumb {
  label: string;
  href?: string;
}

interface VuseSectionDefinitionProps {
  title: string;
  namespace?: string;
  icon?: ReactNode;
  breadcrumbs?: SectionCrumb[];
}

export default function VuseSectionDefinition({ title, namespace, icon, breadcrumbs = [] }: VuseSectionDefinitionProps) {
  return (
    <Box
      sx={{
        mx: { xs: 0, md: 1.5 },
        mb: 2.5,
        py: 1.25,
      }}
    >
      <Stack spacing={0.75}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          {icon && (
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 1,
                display: "grid",
                placeItems: "center",
                color: "primary.main",
                bgcolor: "background.default",
                boxShadow: "-7px -7px 5px rgba(255,255,255,.9), 7px 7px 7px rgba(174,174,192,.34)",
              }}
            >
              {icon}
            </Box>
          )}
          <Box>
            <Typography variant="h5" color="primary.main" sx={{ fontSize: { xs: 22, md: 24 }, fontWeight: 500 }}>
              {title}
            </Typography>
            {namespace && (
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, letterSpacing: 0 }}>
                {namespace}
              </Typography>
            )}
          </Box>
        </Stack>

        {breadcrumbs.length > 0 && (
          <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ color: "text.secondary", pl: { xs: 0, sm: 8 }, fontSize: 14 }}>
            {breadcrumbs.map((crumb, index) =>
              crumb.href && index < breadcrumbs.length - 1 ? (
                <Link key={crumb.label} underline="hover" color="inherit" href={crumb.href}>
                  {crumb.label}
                </Link>
              ) : (
                <Typography key={crumb.label} color={index === breadcrumbs.length - 1 ? "text.primary" : "text.secondary"}>
                  {crumb.label}
                </Typography>
              ),
            )}
          </Breadcrumbs>
        )}
      </Stack>
    </Box>
  );
}
