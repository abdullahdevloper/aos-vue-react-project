import type { ReactNode } from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import VuseSectionDefinition, { type SectionCrumb } from "../layout/VuseSectionDefinition";

interface DocPageProps {
  title: string;
  namespace: string;
  icon: ReactNode;
  breadcrumbs: SectionCrumb[];
  children: ReactNode;
}

export default function DocPage({ title, namespace, icon, breadcrumbs, children }: DocPageProps) {
  const { pathname } = useLocation();
  const isVuetifyDocsRoute = pathname.startsWith("/components");

  return (
    <>
      <VuseSectionDefinition title={title} namespace={namespace} icon={icon} breadcrumbs={breadcrumbs} />
      <Box sx={{ mx: { xs: 0, md: isVuetifyDocsRoute ? 0 : 1.5 }, pb: 2 }}>{children}</Box>
    </>
  );
}
