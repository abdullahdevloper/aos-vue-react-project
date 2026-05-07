import type { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Collapse,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { DashboardCustomize, ExpandLess, ExpandMore, Menu } from "@mui/icons-material";
import { uiComponentsNavigation } from "../data/uiComponentsNavigation";
import { useDashboardStore } from "../store/useDashboardStore";

const drawerWidth = 282;

const neuGlow = "-7px -7px 5px rgba(255,255,255,.9), 7px 7px 7px rgba(174,174,192,.34)";
const neuInset = "inset -7px -7px 5px rgba(255,255,255,.88), inset 7px 7px 7px rgba(174,174,192,.32)";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const sidebarOpen = useDashboardStore((state) => state.sidebarOpen);
  const toggleSidebar = useDashboardStore((state) => state.toggleSidebar);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          boxShadow: "none",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          px: { xs: 1, md: 3 },
          pt: 1.5,
        }}
      >
        <Toolbar
          sx={{
            minHeight: 58,
            borderRadius: 1,
            bgcolor: "background.default",
            boxShadow: neuGlow,
            px: { xs: 1.5, md: 2 },
          }}
        >
          <IconButton onClick={toggleSidebar} edge="start" aria-label="menu" sx={{ mr: 1.5, color: "primary.main", boxShadow: neuGlow, bgcolor: "background.default" }}>
            <Menu />
          </IconButton>
          <DashboardCustomize color="primary" />
          <Typography variant="h6" color="primary.main" sx={{ ml: 1, display: { xs: "none", sm: "block" }, fontWeight: 500 }}>
            Vuse Admin
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        open={sidebarOpen}
        sx={{
          width: sidebarOpen ? drawerWidth : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            pt: 0,
            px: 1.5,
            borderRight: 0,
            bgcolor: "background.default",
            boxShadow: neuGlow,
            overflow: "hidden",
          },
        }}
      >
        <UiComponentsSidebar />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, minWidth: 0, pt: 11, pb: 4, height: "100vh", overflow: "auto" }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 3 }, maxWidth: 1480 }}>
          {children}
        </Container>
        <Stack sx={{ mt: 4, px: 3 }} alignItems="center">
          <Typography variant="caption" color="text.secondary">
            React UI Components slice: Vuetify / Badges pending visual approval
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

function UiComponentsSidebar() {
  return (
    <Stack spacing={1.5} sx={{ height: "100%", pt: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 1, py: 1.5, position: "sticky", top: 0, bgcolor: "background.default", zIndex: 1 }}>
        <Box sx={{ width: 42, height: 42, display: "grid", placeItems: "center", color: "primary.main", borderRadius: 1, boxShadow: neuGlow }}>
          <DashboardCustomize color="primary" />
        </Box>
        <Typography variant="h6" color="primary.main" sx={{ fontWeight: 500 }}>
          Vuse Admin
        </Typography>
      </Stack>
      <Box sx={{ height: 48 }} />
      {uiComponentsNavigation.map((section) => (
        <Box key={section.section}>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              px: 2,
              pb: 0.75,
              color: "text.secondary",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 0,
              fontSize: 12,
            }}
          >
            {section.section}
          </Typography>
          <List disablePadding>
            {section.items.map((item) => (
              <Box key={item.title}>
                <ListItemButton
                  sx={{
                    borderRadius: 1,
                    minHeight: 40,
                    mx: 0.5,
                    color: "text.primary",
                    px: 1.5,
                    "& .MuiListItemIcon-root": { color: "primary.main" },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 38 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} primaryTypographyProps={{ fontWeight: 700 }} />
                  <ExpandLess fontSize="small" />
                </ListItemButton>
                <Collapse in timeout="auto" unmountOnExit={false}>
                  <List disablePadding sx={{ pl: 0.75, mt: 0.25 }}>
                    {item.children.map((child) => (
                      <ListItemButton
                        key={child.path}
                        component={NavLink}
                        to={child.path}
                        sx={{
                          ml: 2,
                          mr: 0.5,
                          my: 0.45,
                          minHeight: 38,
                          borderRadius: 1,
                          color: "text.secondary",
                          px: 1.5,
                          "& .MuiListItemIcon-root": { color: "text.secondary" },
                          "&.active": {
                            color: "primary.main",
                            bgcolor: "background.default",
                            boxShadow: neuInset,
                            "& .MuiListItemIcon-root": { color: "primary.main" },
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 34 }}>{child.icon}</ListItemIcon>
                        <ListItemText primary={child.title} primaryTypographyProps={{ fontWeight: 700, fontSize: 14 }} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ))}
          </List>
        </Box>
      ))}
      <Divider sx={{ pt: 1, borderColor: "rgba(111, 125, 133, .16)" }} />
      <Stack direction="row" spacing={1} alignItems="center" sx={{ px: 1.5, color: "text.secondary" }}>
        <ExpandMore fontSize="small" />
        <Typography variant="caption">Vuetify Batch A started</Typography>
      </Stack>
    </Stack>
  );
}
