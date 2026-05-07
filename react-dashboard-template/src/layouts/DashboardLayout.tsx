import { useEffect, useState, type PropsWithChildren } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
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
import { DashboardCustomize, ExpandLess, ExpandMore, Menu, MoreHoriz, OpenInNew } from "@mui/icons-material";
import { fallbackIcon, pendingNote, uiComponentsNavigation, type SidebarNavEntry, type SidebarNavItem } from "../data/uiComponentsNavigation";
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
  const location = useLocation();

  return (
    <Stack spacing={0} sx={{ height: "100%", pt: 1.5 }}>
      <Stack direction="row" alignItems="center" spacing={1.25} sx={{ px: 1, py: 1.25, position: "sticky", top: 0, bgcolor: "background.default", zIndex: 1 }}>
        <Box sx={{ width: 38, height: 38, display: "grid", placeItems: "center", color: "primary.main", borderRadius: 1, boxShadow: neuGlow }}>
          <DashboardCustomize color="primary" />
        </Box>
        <Typography variant="h6" color="primary.main" sx={{ fontWeight: 500, fontSize: 20 }}>
          Vuse Admin
        </Typography>
      </Stack>
      <Box sx={{ height: 60, flexShrink: 0 }} />
      <Box sx={{ flexGrow: 1, overflowY: "auto", pr: 0.35, pb: 3 }}>
        <List dense disablePadding>
          {uiComponentsNavigation.map((entry, index) => (
            <SidebarEntry entry={entry} pathname={location.pathname} depth={0} index={index} key={"header" in entry ? `${entry.header}-${index}` : `${entry.title}-${index}`} />
          ))}
        </List>
      </Box>
      <Divider sx={{ borderColor: "rgba(111, 125, 133, .16)" }} />
      <Stack direction="row" spacing={1} alignItems="center" sx={{ px: 1.5, color: "text.secondary" }}>
        <ExpandMore fontSize="small" />
        <Typography variant="caption">Pages / Errors pending approval</Typography>
      </Stack>
    </Stack>
  );
}

function SidebarEntry({ entry, pathname, depth, index }: { entry: SidebarNavEntry; pathname: string; depth: number; index: number }) {
  if ("header" in entry) {
    return (
      <Typography
        component="li"
        variant="caption"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.65,
          mt: index === 0 ? 0.75 : 2.1,
          mb: 0.6,
          ml: 1.5,
          color: "text.secondary",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 0,
          fontSize: 11.5,
          lineHeight: 1.2,
          listStyle: "none",
        }}
      >
        <MoreHoriz sx={{ fontSize: 19, opacity: 0.58 }} />
        <Box component="span">{entry.header}</Box>
      </Typography>
    );
  }

  return <SidebarNavItemView item={entry} pathname={pathname} depth={depth} />;
}

function SidebarNavItemView({ item, pathname, depth }: { item: SidebarNavItem; pathname: string; depth: number }) {
  const containsActive = itemHasActivePath(item, pathname);
  const [open, setOpen] = useState(containsActive || depth === 0);

  useEffect(() => {
    if (containsActive) setOpen(true);
  }, [containsActive]);

  if (item.children?.length) {
    return (
      <Box component="li" sx={{ listStyle: "none" }}>
        <ListItemButton onClick={() => setOpen((value) => !value)} sx={groupButtonSx(depth, containsActive)}>
          <ListItemIcon sx={itemIconSx(depth, containsActive)}>{renderIcon(item)}</ListItemIcon>
          <ListItemText primary={item.title} primaryTypographyProps={{ fontWeight: containsActive ? 700 : 600, fontSize: depth === 0 ? 14.5 : 13.5, noWrap: true }} />
          {item.badge && <BadgePill label={item.badge} />}
          {open ? <ExpandLess sx={{ fontSize: 18, opacity: 0.66 }} /> : <ExpandMore sx={{ fontSize: 18, opacity: 0.66 }} />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit={false}>
          <List dense disablePadding sx={{ mt: 0.1, mb: 0.2 }}>
            {item.children.map((child) => (
              <SidebarNavItemView key={`${item.title}-${child.title}`} item={child} pathname={pathname} depth={depth + 1} />
            ))}
          </List>
        </Collapse>
      </Box>
    );
  }

  const active = Boolean(item.path && pathsMatch(pathname, item.path));
  const commonProps = {
    sx: leafButtonSx(depth, active, Boolean(item.disabled)),
    disabled: item.disabled,
  };
  const content = (
    <>
      <ListItemIcon sx={itemIconSx(depth, active, Boolean(item.disabled))}>{renderIcon(item)}</ListItemIcon>
      <ListItemText primary={item.title} primaryTypographyProps={{ fontWeight: active ? 700 : 500, fontSize: depth === 0 ? 14.25 : 13.25, noWrap: true }} />
      {item.pending && <PendingPill />}
      {item.badge && <BadgePill label={item.badge} />}
      {item.href && <OpenInNew sx={{ fontSize: 13, opacity: 0.54, ml: 0.4 }} />}
    </>
  );

  if (item.href) {
    return (
      <ListItemButton component="a" href={item.href} target={item.target} rel="noopener" {...commonProps}>
        {content}
      </ListItemButton>
    );
  }

  if (item.path && !item.disabled) {
    return (
      <ListItemButton component={RouterLink} to={item.path} {...commonProps}>
        {content}
      </ListItemButton>
    );
  }

  return <ListItemButton {...commonProps}>{content}</ListItemButton>;
}

function renderIcon(item: SidebarNavItem) {
  return item.icon || (
    <Box sx={{ width: 26, height: 26, borderRadius: "50%", display: "grid", placeItems: "center", bgcolor: "rgba(0,131,143,.10)", color: "primary.main", fontSize: 10.5, fontWeight: 700 }}>
      {fallbackIcon(item.title)}
    </Box>
  );
}

function itemHasActivePath(item: SidebarNavItem, pathname: string): boolean {
  if (item.path && pathsMatch(pathname, item.path)) return true;
  return Boolean(item.children?.some((child) => itemHasActivePath(child, pathname)));
}

function pathsMatch(pathname: string, path: string) {
  return pathname === path || (path !== "/" && pathname.startsWith(`${path}/`));
}

function BadgePill({ label }: { label: string }) {
  return <Box component="span" sx={{ ml: 0.5, px: 0.7, py: 0.1, borderRadius: 999, bgcolor: "primary.main", color: "#fff", fontSize: 10, fontWeight: 700, lineHeight: 1.45 }}>{label}</Box>;
}

function PendingPill() {
  return <Box component="span" sx={{ ml: 0.5, px: 0.65, py: 0.1, borderRadius: 999, color: "text.secondary", bgcolor: "rgba(111,125,133,.10)", fontSize: 9.5, fontWeight: 700, lineHeight: 1.45 }}>{pendingNote}</Box>;
}

function groupButtonSx(depth: number, active: boolean) {
  return {
    mx: 0.35,
    ml: 0.35 + depth * 1.55,
    mr: 0.45,
    my: 0.2,
    minHeight: depth === 0 ? 38 : 34,
    px: 1.2,
    borderRadius: 1,
    color: active ? "primary.main" : "text.primary",
    bgcolor: "transparent",
    transition: "background-color 140ms ease, color 140ms ease, box-shadow 140ms ease",
    "& .MuiSvgIcon-root": { fontSize: depth === 0 ? 21 : 18 },
    "&:hover": { bgcolor: "rgba(0,131,143,.065)", color: "primary.main" },
    ...(active && {
      bgcolor: "background.default",
      boxShadow: neuInset,
      "&:hover": { bgcolor: "background.default", color: "primary.main" },
    }),
  };
}

function leafButtonSx(depth: number, active: boolean, disabled: boolean) {
  return {
    mx: 0.35,
    ml: 0.35 + depth * 1.65,
    mr: 0.45,
    my: 0.15,
    minHeight: depth === 0 ? 36 : 32,
    px: 1.2,
    borderRadius: 1,
    color: active ? "primary.main" : "text.secondary",
    opacity: disabled ? 0.54 : 1,
    transition: "background-color 140ms ease, color 140ms ease, box-shadow 140ms ease",
    "& .MuiSvgIcon-root": { fontSize: depth === 0 ? 20 : 17 },
    "&:hover": disabled ? {} : { bgcolor: "rgba(0,131,143,.065)", color: "primary.main" },
    ...(active && {
      color: "primary.main",
      bgcolor: "background.default",
      boxShadow: neuInset,
      "&:hover": { bgcolor: "background.default", color: "primary.main" },
    }),
    "&.Mui-disabled": {
      color: "text.secondary",
      opacity: 0.52,
    },
  };
}

function itemIconSx(depth: number, active: boolean, disabled = false) {
  return {
    minWidth: depth === 0 ? 34 : 30,
    color: active ? "primary.main" : "inherit",
    opacity: disabled ? 0.72 : 1,
    alignItems: "center",
    "& .MuiSvgIcon-root": { fontSize: depth === 0 ? 20 : 17 },
  };
}
