import type { PropsWithChildren } from "react";
import { AppBar, Box, Container, CssBaseline, Drawer, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { NavList } from "../components/common";
import { VuseLogo } from "../components/Stock";
import { navigationItems } from "../data/dashboardData";
import { useDashboardStore } from "../store/useDashboardStore";

const drawerWidth = 260;

export default function DashboardLayout({ children }: PropsWithChildren) {
  const sidebarOpen = useDashboardStore((state) => state.sidebarOpen);
  const toggleSidebar = useDashboardStore((state) => state.toggleSidebar);
  const headerVisible = useDashboardStore((state) => state.headerVisible);
  const footerVisible = useDashboardStore((state) => state.footerVisible);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      {headerVisible && (
        <AppBar position="fixed" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: "divider", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton onClick={toggleSidebar} edge="start" aria-label="menu"><Menu /></IconButton>
            <VuseLogo />
          </Toolbar>
        </AppBar>
      )}
      <Drawer variant="persistent" open={sidebarOpen} sx={{ width: sidebarOpen ? drawerWidth : 0, flexShrink: 0, "& .MuiDrawer-paper": { width: drawerWidth, pt: headerVisible ? 8 : 2, px: 2 } }}>
        <NavList items={navigationItems} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, pt: headerVisible ? 10 : 3, pb: 3 }}>
        <Container maxWidth="xl">{children}</Container>
        {footerVisible && (
          <Stack sx={{ mt: 4, px: 3 }} alignItems="center">
            <Typography variant="caption" color="text.secondary">React parallel dashboard template</Typography>
          </Stack>
        )}
      </Box>
    </Box>
  );
}
