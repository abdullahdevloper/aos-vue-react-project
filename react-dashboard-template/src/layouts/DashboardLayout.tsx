import { useEffect, useRef, useState, type MouseEvent, type PropsWithChildren, type ReactNode, type UIEvent } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  ClickAwayListener,
  Collapse,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  FormControlLabel,
  FormLabel,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu as MuiMenu,
  MenuItem,
  Paper,
  Popper,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  AccountBalanceWallet,
  ArrowBack,
  Chat,
  Check,
  Close,
  ColorLens,
  Contacts,
  DashboardCustomize,
  DoubleArrow,
  ExpandLess,
  ExpandMore,
  Inbox,
  Menu as MenuIcon,
  MenuOpen,
  MoreHoriz,
  OpenInNew,
  Person,
  PowerSettingsNew,
  Settings,
} from "@mui/icons-material";
import { fallbackIcon, pendingNote, uiComponentsNavigation, type SidebarNavEntry, type SidebarNavItem } from "../data/uiComponentsNavigation";
import { useDashboardStore } from "../store/useDashboardStore";
import aliAvatar from "../assets/pages/profile/lists/ali.jpg";

const drawerWidth = 280;
const miniDrawerWidth = 80;

const neuGlow = "-7px -7px 5px rgba(255,255,255,.9), 7px 7px 7px rgba(174,174,192,.34)";
const neuInset = "inset -7px -7px 5px rgba(255,255,255,.88), inset 7px 7px 7px rgba(174,174,192,.32)";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const sidebarOpen = useDashboardStore((state) => state.sidebarOpen);
  const miniVariant = useDashboardStore((state) => state.miniVariant);
  const sidebarRight = useDashboardStore((state) => state.sidebarRight);
  const headerVisible = useDashboardStore((state) => state.headerVisible);
  const headerHideOnScroll = useDashboardStore((state) => state.headerHideOnScroll);
  const footerVisible = useDashboardStore((state) => state.footerVisible);
  const headerDense = useDashboardStore((state) => state.headerDense);
  const headerClippedOver = useDashboardStore((state) => state.headerClippedOver);
  const headerFloating = useDashboardStore((state) => state.headerFloating);
  const headerColor = useDashboardStore((state) => state.headerColor);
  const footerColor = useDashboardStore((state) => state.footerColor);
  const footerFixed = useDashboardStore((state) => state.footerFixed);
  const footerInset = useDashboardStore((state) => state.footerInset);
  const footerPadless = useDashboardStore((state) => state.footerPadless);
  const semiDark = useDashboardStore((state) => state.semiDark);
  const activeMenuStyle = useDashboardStore((state) => state.activeMenuStyle);
  const rtl = useDashboardStore((state) => state.rtl);
  const locale = useDashboardStore((state) => state.locale);
  const setLocale = useDashboardStore((state) => state.setLocale);
  const toggleSidebar = useDashboardStore((state) => state.toggleSidebar);
  const setMiniVariant = useDashboardStore((state) => state.setMiniVariant);
  const location = useLocation();
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [localeAnchor, setLocaleAnchor] = useState<HTMLElement | null>(null);
  const [profileAnchor, setProfileAnchor] = useState<HTMLElement | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(locales.find((item) => item.value === locale) || locales[0]);
  const [hideHeaderOnScroll, setHideHeaderOnScroll] = useState(false);
  const mainScrollRef = useRef<HTMLElement | null>(null);
  const lastMainScrollTop = useRef(0);
  const previousPathRef = useRef(location.pathname);
  const effectiveMini = miniVariant && !sidebarHovered;
  const effectiveHeaderVisible = headerVisible && !(headerHideOnScroll && hideHeaderOnScroll);
  const activeDrawerWidth = sidebarOpen ? (miniVariant ? miniDrawerWidth : drawerWidth) : 0;
  const sidebarPaperWidth = sidebarOpen ? (effectiveMini ? miniDrawerWidth : drawerWidth) : 0;
  const headerTextColor = headerColor ? readableTextFor(headerColor) : "text.primary";
  const shellOffset = effectiveHeaderVisible ? (headerDense ? 6 : 8) : 0;

  useEffect(() => {
    const selected = locales.find((item) => item.value === locale) || locales[0];
    setCurrentLocale(selected);
  }, [locale]);

  useEffect(() => {
    if (!headerHideOnScroll) setHideHeaderOnScroll(false);
  }, [headerHideOnScroll]);

  useEffect(() => {
    if (previousPathRef.current === location.pathname) return;
    previousPathRef.current = location.pathname;
    mainScrollRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    window.scrollTo(0, 0);
    lastMainScrollTop.current = 0;
    setHideHeaderOnScroll(false);
  }, [location.pathname]);

  const handleMainScroll = (event: UIEvent<HTMLElement>) => {
    if (!headerHideOnScroll) return;
    const current = event.currentTarget.scrollTop;
    if (current < 6) {
      setHideHeaderOnScroll(false);
      lastMainScrollTop.current = current;
      return;
    }
    const delta = current - lastMainScrollTop.current;
    if (delta > 8) setHideHeaderOnScroll(true);
    if (delta < -8) setHideHeaderOnScroll(false);
    lastMainScrollTop.current = current;
  };

  const direction = rtl ? "rtl" : "ltr";
  const menuOrigin = rtl ? "left" : "right";
  const layoutOffset = { xs: 0, md: `${activeDrawerWidth}px` };

  return (
    <Box dir={direction} sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default", direction }}>
      <CssBaseline />
      {effectiveHeaderVisible && (
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            bgcolor: "background.default",
            color: headerTextColor,
            boxShadow: "none",
            zIndex: (theme) => (headerClippedOver ? theme.zIndex.drawer + 1 : theme.zIndex.drawer - 1),
            left: { xs: 0, md: sidebarRight || headerClippedOver ? 0 : `${activeDrawerWidth}px` },
            right: { xs: 0, md: sidebarRight && !headerClippedOver ? `${activeDrawerWidth}px` : 0 },
            width: { xs: "100%", md: headerClippedOver ? "100%" : `calc(100% - ${activeDrawerWidth}px)` },
            px: { xs: 1.5, md: headerFloating && !headerClippedOver ? 3 : 0 },
            pt: headerFloating && !headerClippedOver ? 1.5 : 0,
            transition: (theme) => theme.transitions.create(["left", "right", "width"], { duration: theme.transitions.duration.shorter }),
          }}
        >
          <Toolbar
            sx={{
              minHeight: headerDense ? 50 : 64,
              borderRadius: headerFloating && !headerClippedOver ? 1 : 0,
              bgcolor: headerColor || "background.default",
              boxShadow: headerColor ? "none" : neuGlow,
              px: { xs: 1.1, md: 1.6 },
              gap: 1.5,
            }}
          >
            {headerClippedOver && (
              <Stack direction="row" alignItems="center" spacing={1.25} sx={{ marginInlineEnd: { xs: 0, lg: 2 }, minWidth: { xs: 0, md: 220 } }}>
                <Box sx={{ width: 42, height: 42, display: "grid", placeItems: "center", color: headerColor ? headerTextColor : "primary.main" }}>
                  <DashboardCustomize sx={{ fontSize: 32 }} />
                </Box>
                <Typography variant="h6" color={headerColor ? headerTextColor : "primary.main"} sx={{ display: { xs: "none", md: "block" }, fontWeight: 600, fontSize: "1.25rem", lineHeight: "2rem", letterSpacing: 0, whiteSpace: "nowrap" }}>
                  Vuse Admin
                </Typography>
                <Box sx={{ display: { xs: "none", lg: "block" } }}>
                  <SoftToolbarButton label="Toggle mini navigation" onClick={() => setMiniVariant(!miniVariant)} contrast={Boolean(headerColor)}>
                    {miniVariant ? <DoubleArrow /> : <MenuOpen />}
                  </SoftToolbarButton>
                </Box>
              </Stack>
            )}
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ display: { xs: "none", lg: "flex" } }}>
              <SoftToolbarButton label="Toggle mini navigation" onClick={() => setMiniVariant(!miniVariant)} contrast={Boolean(headerColor)} sx={{ display: headerClippedOver ? "none" : "inline-flex" }}>
                {miniVariant ? <DoubleArrow /> : <MenuOpen />}
              </SoftToolbarButton>
              <SoftToolbarButton label="Contacts" contrast={Boolean(headerColor)}>
                <Contacts />
              </SoftToolbarButton>
              <SoftToolbarButton label="Chat" contrast={Boolean(headerColor)}>
                <Chat />
              </SoftToolbarButton>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1.25} sx={{ display: { xs: "flex", lg: "none" }, minWidth: 0 }}>
              <Box sx={{ width: 40, height: 40, display: "grid", placeItems: "center", color: headerColor ? headerTextColor : "primary.main" }}>
                <DashboardCustomize sx={{ fontSize: 30 }} />
              </Box>
              <Typography variant="h6" color={headerColor ? headerTextColor : "primary.main"} sx={{ display: { xs: "none", md: "block" }, fontWeight: 600, fontSize: "1.25rem", lineHeight: "2rem", letterSpacing: 0, whiteSpace: "nowrap" }}>
                Vuse Admin
              </Typography>
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            <SoftToolbarButton label="Open navigation" onClick={toggleSidebar} contrast={Boolean(headerColor)} sx={{ display: { xs: "inline-flex", md: "none" }, marginInlineEnd: 1 }}>
              <MenuIcon />
            </SoftToolbarButton>
            <SoftToolbarButton label="Settings" onClick={() => setSettingsOpen(true)} contrast={Boolean(headerColor)} sx={{ marginInlineEnd: 1 }}>
              <Settings />
            </SoftToolbarButton>
            <SoftToolbarButton label="Language" onClick={(event) => setLocaleAnchor(event.currentTarget)} contrast={Boolean(headerColor)} sx={{ marginInlineEnd: 1 }}>
              <Avatar sx={{ width: 30, height: 30, fontSize: 18, bgcolor: "transparent" }}>{currentLocale.flag}</Avatar>
            </SoftToolbarButton>
            <IconButton aria-label="User profile" onClick={(event) => setProfileAnchor(event.currentTarget)} sx={{ width: 44, height: 44, p: 0, marginInlineEnd: 0, color: headerColor ? headerTextColor : "primary.main", borderRadius: "50%" }}>
              <Avatar src={aliAvatar} sx={{ width: 40, height: 40, boxShadow: headerColor ? "0 5px 14px rgba(0,0,0,.18)" : neuGlow }} />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      <MuiMenu
        anchorEl={localeAnchor}
        open={Boolean(localeAnchor)}
        onClose={() => setLocaleAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: menuOrigin }}
        transformOrigin={{ vertical: "top", horizontal: menuOrigin }}
        PaperProps={{ dir: direction, sx: { ...menuPaperSx, direction } }}
      >
        {locales.map((locale) => (
          <MenuItem key={locale.value} onClick={() => { setLocale(locale.value); setCurrentLocale(locale); setLocaleAnchor(null); }} sx={menuItemSx}>
            <ListItemAvatar>
              <Avatar variant="rounded" sx={{ width: 25, height: 25, fontSize: 15, bgcolor: "transparent" }}>{locale.flag}</Avatar>
            </ListItemAvatar>
            <Typography sx={{ fontSize: 14.5 }}>{locale.text}</Typography>
          </MenuItem>
        ))}
      </MuiMenu>

      <MuiMenu
        anchorEl={profileAnchor}
        open={Boolean(profileAnchor)}
        onClose={() => setProfileAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: menuOrigin }}
        transformOrigin={{ vertical: "top", horizontal: menuOrigin }}
        PaperProps={{ dir: direction, sx: { ...menuPaperSx, minWidth: 180, boxShadow: "0 8px 18px rgba(0,131,143,.22)", direction } }}
      >
        {profileItems.map((item, index) =>
          item.divider ? (
            <Divider key={`divider-${index}`} sx={{ my: 0.4 }} />
          ) : (
            <MenuItem key={item.text} onClick={() => setProfileAnchor(null)} sx={menuItemSx}>
              <ListItemIcon sx={{ minWidth: 34, color: "text.secondary" }}>{item.icon}</ListItemIcon>
              <Typography sx={{ fontSize: 14.5 }}>{item.text}</Typography>
            </MenuItem>
          ),
        )}
      </MuiMenu>

      <Drawer
        variant="persistent"
        open={sidebarOpen}
        anchor={sidebarRight ? "right" : "left"}
        onMouseEnter={() => miniVariant && setSidebarHovered(true)}
        onMouseLeave={() => miniVariant && setSidebarHovered(false)}
        sx={{
          width: 0,
          order: sidebarRight ? 2 : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: sidebarPaperWidth,
            pt: 0,
            px: 0,
            borderRight: 0,
            top: effectiveHeaderVisible && headerClippedOver ? (headerDense ? 50 : 64) : 0,
            height: effectiveHeaderVisible && headerClippedOver ? (headerDense ? "calc(100% - 50px)" : "calc(100% - 64px)") : "100%",
            bgcolor: semiDark ? "#22272d" : "background.default",
            boxShadow: neuGlow,
            overflow: "hidden",
            transition: (theme) => theme.transitions.create("width", { duration: theme.transitions.duration.shorter }),
          },
        }}
      >
        <UiComponentsSidebar mini={effectiveMini} semidark={semiDark} clipped={headerClippedOver} activeMenuStyle={activeMenuStyle} sidebarRight={sidebarRight} direction={direction} />
      </Drawer>

      <ThemeSettingsDrawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        direction={direction}
        currentLocale={currentLocale.value}
        onLocaleChange={(value) => {
          setLocale(value);
          setCurrentLocale(locales.find((item) => item.value === value) || locales[0]);
        }}
      />

      <Box
        component="main"
        ref={mainScrollRef}
        dir={direction}
        onScroll={handleMainScroll}
        sx={{
          order: 1,
          flexGrow: 1,
          minWidth: 0,
          pt: shellOffset,
          pb: footerVisible ? 4 : 2,
          height: "100vh",
          overflow: "auto",
          direction,
          ml: sidebarOpen && !sidebarRight ? layoutOffset : 0,
          mr: sidebarOpen && sidebarRight ? layoutOffset : 0,
          transition: (theme) => theme.transitions.create(["margin-left", "margin-right"], { duration: theme.transitions.duration.shorter }),
        }}
      >
        <Container maxWidth={false} sx={{ px: 1.5, py: 1.5, maxWidth: "100%" }}>
          {children}
        </Container>
        {footerVisible && <Stack sx={{ mt: 4, px: footerPadless ? 0 : 3, py: footerPadless ? 0 : 1.5, ...(footerColor && { bgcolor: footerColor, color: readableTextFor(footerColor) }), ...(footerInset && { width: "auto" }), ...(footerFixed && { position: "sticky", bottom: 0, zIndex: 9 }) }} alignItems="center">
          <Typography variant="caption" color={footerColor ? "inherit" : "text.secondary"}>
            React UI Components slice: Vuetify / Badges pending visual approval
          </Typography>
        </Stack>}
      </Box>
    </Box>
  );
}

function SoftToolbarButton({ label, onClick, children, sx = {}, contrast = false }: { label: string; onClick?: (event: MouseEvent<HTMLButtonElement>) => void; children: ReactNode; sx?: object; contrast?: boolean }) {
  return (
    <IconButton aria-label={label} onClick={onClick} size="small" sx={{ ...toolbarButtonSx, ...(contrast ? contrastToolbarButtonSx : {}), ...sx }}>
      {children}
    </IconButton>
  );
}

function UiComponentsSidebar({
  mini = false,
  semidark = false,
  clipped = false,
  activeMenuStyle,
  sidebarRight,
  direction,
}: {
  mini?: boolean;
  semidark?: boolean;
  clipped?: boolean;
  activeMenuStyle: { shaped: boolean; rounded: boolean; flat: boolean };
  sidebarRight: boolean;
  direction: "ltr" | "rtl";
}) {
  const location = useLocation();
  const logoSpacer = clipped ? 15 : 75;

  return (
    <Stack dir={direction} spacing={0} sx={{ height: "100%", pt: 0, position: "relative", direction }}>
      {!clipped && <Stack direction="row" alignItems="center" spacing={1.25} sx={{ px: mini ? 0.6 : 1, py: 1.25, justifyContent: mini ? "center" : "flex-start", position: "absolute", top: 0, insetInlineStart: 0, width: "calc(100% - 10px)", bgcolor: semidark ? "#363636" : "background.default", zIndex: 1 }}>
        <Box sx={{ width: 38, height: 38, display: "grid", placeItems: "center", color: "primary.main", borderRadius: 1, boxShadow: neuGlow }}>
          <DashboardCustomize color="primary" />
        </Box>
        {!mini && <Typography variant="h6" color={semidark ? "#f6f7fb" : "primary.main"} sx={{ fontWeight: 600, fontSize: "1.25rem", lineHeight: "2rem", letterSpacing: 0 }}>
          Vuse Admin
        </Typography>}
      </Stack>}
      <Box sx={{ height: logoSpacer, flexShrink: 0 }} />
      <Box sx={{ flexGrow: 1, overflowY: "auto", paddingInlineEnd: 0.35, pb: 3 }}>
        <List dense disablePadding>
          {uiComponentsNavigation.map((entry, index) => (
            <SidebarEntry entry={entry} pathname={location.pathname} depth={0} index={index} mini={mini} semidark={semidark} activeMenuStyle={activeMenuStyle} sidebarRight={sidebarRight} key={"header" in entry ? `${entry.header}-${index}` : `${entry.title}-${index}`} />
          ))}
        </List>
      </Box>
      {!mini && <><Divider sx={{ borderColor: "rgba(111, 125, 133, .16)" }} />
      <Stack direction="row" spacing={1} alignItems="center" sx={{ px: 1.5, color: semidark ? "#c8d0d8" : "text.secondary" }}>
        <ExpandMore fontSize="small" />
        <Typography variant="caption">Pages / Errors pending approval</Typography>
      </Stack></>}
    </Stack>
  );
}

function ThemeSettingsDrawer({ open, onClose, direction, currentLocale, onLocaleChange }: { open: boolean; onClose: () => void; direction: "ltr" | "rtl"; currentLocale: string; onLocaleChange: (value: string) => void }) {
  const sidebarOpen = useDashboardStore((state) => state.sidebarOpen);
  const setSidebarOpen = useDashboardStore((state) => state.setSidebarOpen);
  const headerVisible = useDashboardStore((state) => state.headerVisible);
  const setHeaderVisible = useDashboardStore((state) => state.setHeaderVisible);
  const footerVisible = useDashboardStore((state) => state.footerVisible);
  const setFooterVisible = useDashboardStore((state) => state.setFooterVisible);
  const darkMode = useDashboardStore((state) => state.darkMode);
  const setDarkMode = useDashboardStore((state) => state.setDarkMode);
  const semiDark = useDashboardStore((state) => state.semiDark);
  const setSemiDark = useDashboardStore((state) => state.setSemiDark);
  const rtl = useDashboardStore((state) => state.rtl);
  const setRtl = useDashboardStore((state) => state.setRtl);
  const primaryColor = useDashboardStore((state) => state.primaryColor);
  const secondaryColor = useDashboardStore((state) => state.secondaryColor);
  const headerColor = useDashboardStore((state) => state.headerColor);
  const footerColor = useDashboardStore((state) => state.footerColor);
  const setPrimaryColor = useDashboardStore((state) => state.setPrimaryColor);
  const setSecondaryColor = useDashboardStore((state) => state.setSecondaryColor);
  const setHeaderColor = useDashboardStore((state) => state.setHeaderColor);
  const setFooterColor = useDashboardStore((state) => state.setFooterColor);
  const headerClippedOver = useDashboardStore((state) => state.headerClippedOver);
  const setHeaderClippedOver = useDashboardStore((state) => state.setHeaderClippedOver);
  const headerDense = useDashboardStore((state) => state.headerDense);
  const setHeaderDense = useDashboardStore((state) => state.setHeaderDense);
  const headerHideOnScroll = useDashboardStore((state) => state.headerHideOnScroll);
  const setHeaderHideOnScroll = useDashboardStore((state) => state.setHeaderHideOnScroll);
  const headerFloating = useDashboardStore((state) => state.headerFloating);
  const setHeaderFloating = useDashboardStore((state) => state.setHeaderFloating);
  const activeMenuStyle = useDashboardStore((state) => state.activeMenuStyle);
  const setActiveMenuStyle = useDashboardStore((state) => state.setActiveMenuStyle);
  const miniVariant = useDashboardStore((state) => state.miniVariant);
  const setMiniVariant = useDashboardStore((state) => state.setMiniVariant);
  const sidebarRight = useDashboardStore((state) => state.sidebarRight);
  const setSidebarRight = useDashboardStore((state) => state.setSidebarRight);
  const footerFixed = useDashboardStore((state) => state.footerFixed);
  const setFooterFixed = useDashboardStore((state) => state.setFooterFixed);
  const footerAbsolute = useDashboardStore((state) => state.footerAbsolute);
  const setFooterAbsolute = useDashboardStore((state) => state.setFooterAbsolute);
  const footerInset = useDashboardStore((state) => state.footerInset);
  const setFooterInset = useDashboardStore((state) => state.setFooterInset);
  const footerPadless = useDashboardStore((state) => state.footerPadless);
  const setFooterPadless = useDashboardStore((state) => state.setFooterPadless);
  const drawerAnchor = sidebarRight ? "left" : "right";
  const activeStyle = activeMenuStyle.flat ? "flat" : activeMenuStyle.rounded ? "rounded" : activeMenuStyle.shaped ? "shaped" : "default";

  return (
    <Drawer
      anchor={drawerAnchor}
      open={open}
      variant="persistent"
      hideBackdrop
      sx={{
        width: 0,
        flexShrink: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        "& .MuiDrawer-paper": {
          top: 0,
          width: 300,
          border: 0,
          bgcolor: "background.default",
          backgroundImage: "none",
          boxShadow: neuGlow,
          overflowY: "auto",
          overscrollBehavior: "contain",
          pointerEvents: "auto",
          direction,
        },
      }}
    >
      <Box dir={direction} sx={{ width: 300, maxWidth: 300, bgcolor: "background.default", direction }}>
        <Stack direction="row" alignItems="center" sx={{ position: "sticky", top: 0, zIndex: 2, px: 2, py: 1.65, bgcolor: "background.default" }}>
          <Typography className="title" sx={{ flexGrow: 1, fontSize: 20, fontWeight: 500, color: "text.primary" }}>
            Theme Settings
          </Typography>
          <IconButton aria-label="Close theme settings" onClick={onClose} sx={{ ...toolbarButtonSx, width: 36, height: 36 }}>
            <Close sx={{ fontSize: 20 }} />
          </IconButton>
        </Stack>
        <Box sx={{ height: 18 }} />

        <SettingsSection title="Visibility">
          <SettingsSwitch checked={sidebarOpen} onChange={setSidebarOpen} title="Sidebar" subtitle="Show Sidebar" />
          <SettingsSwitch checked={headerVisible} onChange={setHeaderVisible} title="Header" subtitle="Show Header" />
          <SettingsSwitch checked={footerVisible} onChange={setFooterVisible} title="Footer" subtitle="Show footer" />
        </SettingsSection>

        <SettingsSection title="Theme Builder">
          <ColorSetting title="Primary color" color={primaryColor} onChange={setPrimaryColor} options={themePrimaryColors} />
          <ColorSetting title="Secondary color" color={secondaryColor} onChange={setSecondaryColor} options={themeSecondaryColors} />
          <ColorSetting title="Header" color={headerColor || "#f2f3f7"} onChange={setHeaderColor} options={surfaceColorOptions} resettable />
          <ColorSetting title="Footer" color={footerColor || "#f2f3f7"} onChange={setFooterColor} options={surfaceColorOptions} resettable />
          <Box sx={{ px: 1.5, pb: 1 }}>
            <SettingsSwitch compact checked={darkMode} onChange={setDarkMode} title="Dark Theme" />
            <SettingsSwitch compact checked={semiDark} onChange={setSemiDark} title="Semi Dark Theme" />
            <SettingsSwitch compact checked={rtl} onChange={setRtl} title="RTL" />
          </Box>
        </SettingsSection>

        <SettingsSection title="Header Setting">
          <RadioSetting label="Alignment" value={headerClippedOver ? "above" : "below"} onChange={(value) => setHeaderClippedOver(value === "above")} options={[{ label: "Below", value: "below" }, { label: "Above", value: "above" }]} />
          <SettingsSwitch compact checked={headerDense} onChange={setHeaderDense} title="Shrinked Header" subtitle="Shrinked Header" />
          <SettingsSwitch compact checked={headerHideOnScroll} onChange={setHeaderHideOnScroll} title="On Scroll Action" subtitle="Hide on Scroll" />
          <SettingsSwitch compact checked={headerFloating} onChange={setHeaderFloating} title="Floating" subtitle="Floating" />
        </SettingsSection>

        <SettingsSection title="Sidebar Setting">
          <RadioSetting
            label="Menu Style"
            value={activeStyle}
            onChange={(value) => setActiveMenuStyle({ shaped: value === "shaped", rounded: value === "rounded", flat: value === "flat" })}
            options={[
              { label: "Default", value: "default" },
              { label: "Flat", value: "flat" },
              { label: "Rounded", value: "rounded" },
              { label: "Shaped", value: "shaped" },
            ]}
          />
          <SettingsSwitch compact checked={miniVariant} onChange={setMiniVariant} title="Menu Style" subtitle="Collapse Sidebar" />
          <RadioSetting label="Position" value={sidebarRight ? "right" : "left"} onChange={(value) => setSidebarRight(value === "right")} options={[{ label: "Left", value: "left" }, { label: "Right", value: "right" }]} />
        </SettingsSection>

        <SettingsSection title="Footer Setting">
          <RadioSetting label="Position" value={footerFixed ? "fixed" : footerAbsolute ? "absolute" : "static"} onChange={(value) => { setFooterFixed(value === "fixed"); setFooterAbsolute(value === "absolute"); }} options={[{ label: "Standard", value: "absolute" }, { label: "Fixed", value: "fixed" }]} />
          <RadioSetting label="Alignment" value={footerInset ? "below" : "above"} onChange={(value) => setFooterInset(value === "below")} options={[{ label: "Below", value: "below" }, { label: "Above", value: "above" }]} />
          <SettingsSwitch compact checked={footerPadless} onChange={setFooterPadless} title="Padless Footer" subtitle="Padless Footer" />
        </SettingsSection>

        <SettingsSection title="Language Selection">
          <Box sx={{ px: 2.5, py: 1.8 }}>
            <Box component="select" value={currentLocale} onChange={(event) => onLocaleChange(event.target.value)} sx={selectSx}>
              {locales.map((locale) => (
                <option key={locale.value} value={locale.value}>{locale.text}</option>
              ))}
            </Box>
          </Box>
        </SettingsSection>
      </Box>
    </Drawer>
  );
}

function SettingsSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box sx={{ mx: 1.5, mb: 1.5, borderRadius: 1, boxShadow: neuInset, overflow: "hidden" }}>
      <Typography sx={{ px: 1.5, py: 1.2, fontSize: 20, fontWeight: 500 }}>{title}</Typography>
      <Divider sx={{ borderColor: "rgba(111,125,133,.16)" }} />
      <Box sx={{ py: 0.6 }}>{children}</Box>
    </Box>
  );
}

function SettingsSwitch({ checked, onChange, title, subtitle, compact = false }: { checked: boolean; onChange: (value: boolean) => void; title: string; subtitle?: string; compact?: boolean }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.2} sx={{ px: compact ? 0 : 1.5, py: compact ? 0.15 : 0.75, minHeight: compact ? 42 : 62 }}>
      <Switch checked={checked} onChange={(event) => onChange(event.target.checked)} sx={switchSx} />
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontSize: compact && !subtitle ? 14.5 : 15, lineHeight: 1.25, color: "text.primary" }}>{title}</Typography>
        {subtitle && <Typography sx={{ mt: 0.25, fontSize: 12.5, lineHeight: 1.2, color: "text.secondary" }}>{subtitle}</Typography>}
      </Box>
    </Stack>
  );
}

function RadioSetting({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Array<{ label: string; value: string }> }) {
  return (
    <Box sx={{ px: 1.5, py: 0.85 }}>
      <FormLabel sx={{ display: "block", mb: 0.55, color: "text.primary", fontSize: 15 }}>{label}</FormLabel>
      <RadioGroup row value={value} onChange={(event) => onChange(event.target.value)} sx={{ gap: 1 }}>
        {options.map((option) => (
          <FormControlLabel key={option.value} value={option.value} control={<Radio size="small" sx={radioSx} />} label={option.label} sx={radioLabelSx} />
        ))}
      </RadioGroup>
    </Box>
  );
}

function ColorSetting({ title, color, onChange, resettable = false }: { title: string; color: string; options: string[]; onChange: (value: string) => void; resettable?: boolean }) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedBase, setSelectedBase] = useState<ColorGroup | null>(findColorGroup(color));
  const [draftHex, setDraftHex] = useState(normalizeHex(color));
  const [pickerHasSelection, setPickerHasSelection] = useState(false);

  useEffect(() => {
    if (!anchor) return;
    setSelectedBase(findColorGroup(color));
    setDraftHex(normalizeHex(color));
    setPickerHasSelection(false);
    setStep(1);
    // The picker must reset only when it opens. Color changes inside the open
    // picker should advance to the shade step instead of resetting step one.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchor]);

  const selectedShades = selectedBase?.shades || [];
  const selectedShade = selectedShades.find((shade) => hexMatches(shade.hex, color));

  const closeMenu = () => {
    setAnchor(null);
    setStep(1);
    setPickerHasSelection(false);
  };

  const selectBase = (group: ColorGroup) => {
    setSelectedBase(group);
    setDraftHex(group.baseHex);
    setPickerHasSelection(true);
    onChange(group.baseHex);
    setStep(2);
  };

  const selectShade = (shade: ColorShade) => {
    setDraftHex(shade.hex);
    setPickerHasSelection(true);
    onChange(shade.hex);
  };

  const handleHexInput = (value: string) => {
    const next = value.startsWith("#") ? value : `#${value}`;
    setDraftHex(next);
    setPickerHasSelection(true);
    if (/^#[0-9a-fA-F]{6}$/.test(next)) {
      onChange(next);
      setSelectedBase(findColorGroup(next));
    }
  };

  const showColorField = pickerHasSelection && Boolean(draftHex);

  return (
    <Stack direction="row" alignItems="center" spacing={1.2} sx={{ px: 1.5, py: 0.65, minHeight: 54 }}>
      <IconButton aria-label={`${title} picker`} onClick={(event) => setAnchor(event.currentTarget)} sx={{ ...toolbarButtonSx, width: 36, height: 36 }}>
        <ColorLens sx={{ color, fontSize: 20 }} />
      </IconButton>
      <Typography sx={{ fontSize: 14.5, color: "text.primary" }}>{title}</Typography>
      <Popper
        open={Boolean(anchor)}
        anchorEl={anchor}
        placement="bottom-start"
        disablePortal={false}
        sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
        modifiers={[{ name: "offset", options: { offset: [0, 8] } }]}
      >
        <ClickAwayListener onClickAway={closeMenu}>
          <Paper elevation={0} sx={{ width: 300, minWidth: 300, p: 0, overflow: "hidden", borderRadius: 1, backgroundImage: "none", boxShadow: neuGlow }}>
            <Box sx={{ width: 300, bgcolor: "#2f353b", color: "#fff", boxShadow: "inset -4px -4px 6px rgba(255,255,255,.04), inset 6px 6px 10px rgba(0,0,0,.26)" }}>
              <Stack direction="row" alignItems="center" justifyContent={showColorField ? "space-between" : "flex-end" } sx={{ px: 1, pt: 1, minHeight: 54 }}>
                {step > 1 && (
                  <IconButton aria-label="Back to color palette" onClick={() => setStep(1)} sx={{ ...colorPickerFabSx, mr: 1 }}>
                    <ArrowBack sx={{ fontSize: 17 }} />
                  </IconButton>
                )}
                {showColorField && (
                  <Box
                    component="input"
                    aria-label={`${title} hex color`}
                    value={draftHex}
                    onChange={(event) => handleHexInput(event.target.value)}
                    sx={{
                      width: 138,
                      height: 38,
                      border: 0,
                      outline: 0,
                      borderRadius: 1,
                      px: 1.2,
                      color: "#9aa6af",
                      bgcolor: "#2f353b",
                      fontFamily: "monospace",
                      fontSize: 14,
                      textAlign: "center",
                      boxShadow: "inset -5px -5px 6px rgba(255,255,255,.05), inset 6px 6px 9px rgba(0,0,0,.28)",
                    }}
                  />
                )}
                <IconButton aria-label="Close color picker" onClick={closeMenu} sx={colorPickerFabSx}>
                  <Close sx={{ fontSize: 17 }} />
                </IconButton>
              </Stack>

              <Box sx={{ px: 1.25, pb: 1.25, pt: 0.8 }}>
                {step === 1 ? (
                  <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 48px)", gap: 0.5 }}>
                    {VUSE_COLOR_GROUPS.map((group) => {
                      const selected = selectedBase?.key === group.key || hexMatches(group.baseHex, color);
                      return <ColorRoundButton key={group.key} label={group.label} color={group.baseHex} selected={selected} iconColor={readableTextFor(group.baseHex)} onClick={() => selectBase(group)} special={group.key === "shades"} />;
                    })}
                  </Box>
                ) : (
                  <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 48px)", gap: 0.5 }}>
                    {selectedShades.map((shade) => (
                      <ColorRoundButton key={shade.key} label={`${selectedBase?.label} ${shade.key}`} color={shade.hex} selected={selectedShade?.key === shade.key || hexMatches(shade.hex, color)} iconColor={readableTextFor(shade.hex)} onClick={() => selectShade(shade)} />
                    ))}
                  </Box>
                )}
              </Box>

              {resettable && (
                <Stack direction="row" justifyContent="flex-end" sx={{ px: 1.25, pb: 1.15 }}>
                  <Box component="button" onClick={() => { onChange(""); setDraftHex(""); setSelectedBase(null); setPickerHasSelection(false); setStep(1); }} sx={{ border: 0, borderRadius: 1, px: 1.3, py: 0.65, bgcolor: "#f2f3f7", color: "#263238", fontSize: 12.5, fontWeight: 600, cursor: "pointer", boxShadow: neuGlow, textTransform: "lowercase" }}>
                    reset
                  </Box>
                </Stack>
              )}
            </Box>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Stack>
  );
}

function ColorRoundButton({ label, color, selected, iconColor, onClick, special = false }: { label: string; color: string; selected: boolean; iconColor: string; onClick: () => void; special?: boolean }) {
  return (
    <Box component="button" aria-label={label} onClick={onClick} sx={{ width: 48, height: 48, border: 0, p: 0, bgcolor: "transparent", display: "grid", placeItems: "center", borderRadius: "50%", cursor: "pointer", "&:hover .swatch": { transform: "scale(1.06)", boxShadow: "0 0 0 3px rgba(255,255,255,.12), 0 7px 16px rgba(0,0,0,.2)" } }}>
      <Box className="swatch" sx={{ width: 40, height: 40, borderRadius: "50%", bgcolor: special ? "#f2f3f7" : color, color: special ? "#9aa6af" : iconColor, display: "grid", placeItems: "center", transition: "transform 140ms ease, box-shadow 140ms ease", boxShadow: selected ? "0 0 0 3px rgba(255,255,255,.16), inset 4px 4px 7px rgba(0,0,0,.18), inset -4px -4px 7px rgba(255,255,255,.14)" : "0 4px 10px rgba(0,0,0,.14)" }}>
        {selected ? <Check sx={{ fontSize: 18 }} /> : special ? <Box sx={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid currentColor" }} /> : null}
      </Box>
    </Box>
  );
}

type ColorShade = {
  key: string;
  hex: string;
};

type ColorGroup = {
  key: string;
  label: string;
  baseHex: string;
  shades: ColorShade[];
};

const VUSE_COLOR_GROUPS: ColorGroup[] = [
  makeColorGroup("red", "Red", "#f44336", ["#ffebee", "#ffcdd2", "#ef9a9a", "#e57373", "#ef5350", "#f44336", "#e53935", "#d32f2f", "#c62828", "#b71c1c"]),
  makeColorGroup("pink", "Pink", "#e91e63", ["#fce4ec", "#f8bbd0", "#f48fb1", "#f06292", "#ec407a", "#e91e63", "#d81b60", "#c2185b", "#ad1457", "#880e4f"]),
  makeColorGroup("purple", "Purple", "#9c27b0", ["#f3e5f5", "#e1bee7", "#ce93d8", "#ba68c8", "#ab47bc", "#9c27b0", "#8e24aa", "#7b1fa2", "#6a1b9a", "#4a148c"]),
  makeColorGroup("deepPurple", "Deep Purple", "#673ab7", ["#ede7f6", "#d1c4e9", "#b39ddb", "#9575cd", "#7e57c2", "#673ab7", "#5e35b1", "#512da8", "#4527a0", "#311b92"]),
  makeColorGroup("indigo", "Indigo", "#3f51b5", ["#e8eaf6", "#c5cae9", "#9fa8da", "#7986cb", "#5c6bc0", "#3f51b5", "#3949ab", "#303f9f", "#283593", "#1a237e"]),
  makeColorGroup("blue", "Blue", "#2196f3", ["#e3f2fd", "#bbdefb", "#90caf9", "#64b5f6", "#42a5f5", "#2196f3", "#1e88e5", "#1976d2", "#1565c0", "#0d47a1"]),
  makeColorGroup("lightBlue", "Light Blue", "#03a9f4", ["#e1f5fe", "#b3e5fc", "#81d4fa", "#4fc3f7", "#29b6f6", "#03a9f4", "#039be5", "#0288d1", "#0277bd", "#01579b"]),
  makeColorGroup("cyan", "Cyan", "#00bcd4", ["#e0f7fa", "#b2ebf2", "#80deea", "#4dd0e1", "#26c6da", "#00bcd4", "#00acc1", "#0097a7", "#00838f", "#006064"]),
  makeColorGroup("teal", "Teal", "#009688", ["#e0f2f1", "#b2dfdb", "#80cbc4", "#4db6ac", "#26a69a", "#009688", "#00897b", "#00796b", "#00695c", "#004d40"]),
  makeColorGroup("green", "Green", "#4caf50", ["#e8f5e9", "#c8e6c9", "#a5d6a7", "#81c784", "#66bb6a", "#4caf50", "#43a047", "#388e3c", "#2e7d32", "#1b5e20"]),
  makeColorGroup("lightGreen", "Light Green", "#8bc34a", ["#f1f8e9", "#dcedc8", "#c5e1a5", "#aed581", "#9ccc65", "#8bc34a", "#7cb342", "#689f38", "#558b2f", "#33691e"]),
  makeColorGroup("lime", "Lime", "#cddc39", ["#f9fbe7", "#f0f4c3", "#e6ee9c", "#dce775", "#d4e157", "#cddc39", "#c0ca33", "#afb42b", "#9e9d24", "#827717"]),
  makeColorGroup("yellow", "Yellow", "#ffeb3b", ["#fffde7", "#fff9c4", "#fff59d", "#fff176", "#ffee58", "#ffeb3b", "#fdd835", "#fbc02d", "#f9a825", "#f57f17"]),
  makeColorGroup("amber", "Amber", "#ffc107", ["#fff8e1", "#ffecb3", "#ffe082", "#ffd54f", "#ffca28", "#ffc107", "#ffb300", "#ffa000", "#ff8f00", "#ff6f00"]),
  makeColorGroup("orange", "Orange", "#ff9800", ["#fff3e0", "#ffe0b2", "#ffcc80", "#ffb74d", "#ffa726", "#ff9800", "#fb8c00", "#f57c00", "#ef6c00", "#e65100"]),
  makeColorGroup("deepOrange", "Deep Orange", "#ff5722", ["#fbe9e7", "#ffccbc", "#ffab91", "#ff8a65", "#ff7043", "#ff5722", "#f4511e", "#e64a19", "#d84315", "#bf360c"]),
  makeColorGroup("blueGrey", "Blue Grey", "#607d8b", ["#eceff1", "#cfd8dc", "#b0bec5", "#90a4ae", "#78909c", "#607d8b", "#546e7a", "#455a64", "#37474f", "#263238"]),
  makeColorGroup("brown", "Brown", "#795548", ["#efebe9", "#d7ccc8", "#bcaaa4", "#a1887f", "#8d6e63", "#795548", "#6d4c41", "#5d4037", "#4e342e", "#3e2723"]),
  makeColorGroup("grey", "Grey", "#9e9e9e", ["#fafafa", "#f5f5f5", "#eeeeee", "#e0e0e0", "#bdbdbd", "#9e9e9e", "#757575", "#616161", "#424242", "#212121"]),
  makeColorGroup("shades", "Shades", "#f2f3f7", ["#000000", "#ffffff", "#f2f3f7", "#263238", "#37474f"]),
];

function makeColorGroup(key: string, label: string, baseHex: string, shadeHexes: string[]): ColorGroup {
  const keys = shadeHexes.length === 10 ? ["lighten5", "lighten4", "lighten3", "lighten2", "lighten1", "base", "darken1", "darken2", "darken3", "darken4"] : ["black", "white", "neu", "darken3", "darken2"];
  return {
    key,
    label,
    baseHex,
    shades: shadeHexes.map((hex, index) => ({ key: keys[index] || `${index}`, hex })),
  };
}

function normalizeHex(color: string) {
  if (!color) return "";
  return color.startsWith("#") ? color : `#${color}`;
}

function hexMatches(left: string, right: string) {
  return normalizeHex(left).toLowerCase() === normalizeHex(right).toLowerCase();
}

function findColorGroup(color: string) {
  if (!color) return null;
  return VUSE_COLOR_GROUPS.find((group) => group.shades.some((shade) => hexMatches(shade.hex, color))) || null;
}

const locales = [
  { text: "English", value: "en", flag: "🇺🇸" },
  { text: "Français", value: "fr-FR", flag: "🇫🇷" },
  { text: "Русский", value: "ru-RU", flag: "🇩🇪" },
  { text: "日本語", value: "ja-JP", flag: "🇯🇵" },
];

const profileItems = [
  { icon: <Person fontSize="small" />, text: "Profile" },
  { icon: <AccountBalanceWallet fontSize="small" />, text: "Account" },
  { icon: <Settings fontSize="small" />, text: "Settings" },
  { icon: <Inbox fontSize="small" />, text: "Inbox" },
  { divider: true },
  { icon: <PowerSettingsNew fontSize="small" />, text: "Logout" },
];

const toolbarButtonSx = {
  width: 40,
  height: 40,
  color: "primary.main",
  bgcolor: "background.default",
  boxShadow: neuGlow,
  borderRadius: "50%",
  transition: "box-shadow 140ms ease, background-color 140ms ease, transform 140ms ease, color 140ms ease",
  "& .MuiSvgIcon-root": { fontSize: 22 },
  "&:hover": { bgcolor: "background.default", color: "primary.dark", boxShadow: neuInset },
  "&:active": { transform: "scale(.94)", boxShadow: neuInset },
  "&:focus-visible": { outline: "2px solid rgba(0,131,143,.32)", outlineOffset: 2 },
};

const contrastToolbarButtonSx = {
  color: "inherit",
  bgcolor: "rgba(255,255,255,.16)",
  boxShadow: "0 6px 16px rgba(0,0,0,.16)",
  "&:hover": { bgcolor: "rgba(255,255,255,.24)", color: "inherit", boxShadow: "inset 3px 3px 8px rgba(0,0,0,.16), inset -3px -3px 8px rgba(255,255,255,.16)" },
};

const colorPickerFabSx = {
  width: 36,
  height: 36,
  color: "#263238",
  bgcolor: "#f2f3f7",
  boxShadow: neuGlow,
  borderRadius: "50%",
  "&:hover": { bgcolor: "#f2f3f7", boxShadow: neuInset },
  "&:active": { transform: "scale(.94)", boxShadow: neuInset },
};

const menuPaperSx = {
  mt: 1,
  bgcolor: "background.default",
  borderRadius: 1,
  backgroundImage: "none",
  boxShadow: neuGlow,
  minWidth: 178,
  p: 0.5,
};

const menuItemSx = {
  minHeight: 40,
  borderRadius: 1,
  mx: 0.25,
  my: 0.2,
  color: "text.primary",
  "&:hover": { bgcolor: "rgba(0,131,143,.08)", color: "primary.main" },
};

const switchSx = {
  width: 46,
  height: 30,
  p: 0,
  "& .MuiSwitch-switchBase": {
    p: 0.45,
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": { bgcolor: "primary.main", opacity: 1 },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 21,
    height: 21,
    boxShadow: "0 3px 7px rgba(0,0,0,.18)",
  },
  "& .MuiSwitch-track": {
    borderRadius: 999,
    bgcolor: "rgba(111,125,133,.22)",
    opacity: 1,
    boxShadow: neuInset,
  },
};

const radioSx = {
  color: "rgba(111,125,133,.52)",
  p: 0.55,
  "&.Mui-checked": { color: "primary.main" },
};

const radioLabelSx = {
  mr: 1.2,
  ml: -0.35,
  "& .MuiFormControlLabel-label": { fontSize: 13.5, color: "text.secondary" },
};

const selectSx = {
  width: "100%",
  height: 46,
  border: 0,
  outline: 0,
  borderRadius: 1,
  px: 1.5,
  color: "text.primary",
  bgcolor: "background.default",
  boxShadow: neuInset,
  fontSize: 14,
};

const themePrimaryColors = ["#00838f", "#00acc1", "#039be5", "#5e35b1", "#43a047", "#7cb342", "#f4511e", "#e53935", "#546e7a", "#263238"];
const themeSecondaryColors = ["#ffb74d", "#ffa726", "#ff7043", "#ec407a", "#ab47bc", "#26a69a", "#9ccc65", "#ffee58", "#78909c", "#8d6e63"];
const surfaceColorOptions = ["#f2f3f7", "#ffffff", "#00838f", "#00acc1", "#263238", "#37474f", "#5e35b1", "#43a047", "#ffb74d", "#e53935"];

function readableTextFor(color: string) {
  const normalized = color.replace("#", "");
  if (normalized.length !== 6) return "#263238";
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? "#263238" : "#fff";
}

function SidebarEntry({
  entry,
  pathname,
  depth,
  index,
  mini,
  semidark,
  activeMenuStyle,
  sidebarRight,
}: {
  entry: SidebarNavEntry;
  pathname: string;
  depth: number;
  index: number;
  mini: boolean;
  semidark: boolean;
  activeMenuStyle: { shaped: boolean; rounded: boolean; flat: boolean };
  sidebarRight: boolean;
}) {
  if ("header" in entry) {
    if (mini) {
      return (
        <Box component="li" sx={{ listStyle: "none", display: "flex", alignItems: "center", marginInlineStart: 1, my: 0.8, color: semidark ? "#c8d0d8" : "text.secondary" }}>
          <MoreHoriz sx={{ fontSize: 20, opacity: 0.7 }} />
        </Box>
      );
    }
    return (
      <Typography
        component="li"
        variant="caption"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.65,
          height: 40,
          mt: index === 0 ? 0 : 1.5,
          mb: 0,
          px: 1,
          marginInlineStart: 1,
          color: semidark ? "#c8d0d8" : "text.secondary",
          fontWeight: 400,
          letterSpacing: ".0333333333em",
          fontSize: ".75rem",
          lineHeight: "1.25rem",
          listStyle: "none",
        }}
      >
        <MoreHoriz sx={{ fontSize: 19, opacity: 0.58 }} />
        <Box component="span">{entry.header}</Box>
      </Typography>
    );
  }

  return <SidebarNavItemView item={entry} pathname={pathname} depth={depth} mini={mini} semidark={semidark} activeMenuStyle={activeMenuStyle} sidebarRight={sidebarRight} />;
}

function SidebarNavItemView({
  item,
  pathname,
  depth,
  mini,
  semidark,
  activeMenuStyle,
  sidebarRight,
}: {
  item: SidebarNavItem;
  pathname: string;
  depth: number;
  mini: boolean;
  semidark: boolean;
  activeMenuStyle: { shaped: boolean; rounded: boolean; flat: boolean };
  sidebarRight: boolean;
}) {
  const containsActive = itemHasActivePath(item, pathname);
  const [open, setOpen] = useState(containsActive);

  useEffect(() => {
    if (containsActive) setOpen(true);
  }, [containsActive]);

  if (item.children?.length) {
    return (
      <Box component="li" sx={{ listStyle: "none" }}>
        <ListItemButton onClick={() => setOpen((value) => !value)} sx={groupButtonSx(depth, containsActive, mini, activeMenuStyle, sidebarRight, semidark)}>
          <ListItemIcon sx={itemIconSx(depth, containsActive, false, mini)}>{renderIcon(item)}</ListItemIcon>
          {!mini && <ListItemText primary={item.title} primaryTypographyProps={sidebarTitleTypographyProps(containsActive ? 600 : 500)} />}
          {!mini && item.badge && <BadgePill label={item.badge} />}
          {!mini && (open ? <ExpandLess sx={{ fontSize: 18, opacity: 0.66 }} /> : <ExpandMore sx={{ fontSize: 18, opacity: 0.66 }} />)}
        </ListItemButton>
        <Collapse in={open && !mini} timeout="auto" unmountOnExit={false}>
          <List dense disablePadding sx={{ mt: 0.1, mb: 0.2 }}>
            {item.children.map((child) => (
              <SidebarNavItemView key={`${item.title}-${child.title}`} item={child} pathname={pathname} depth={depth + 1} mini={mini} semidark={semidark} activeMenuStyle={activeMenuStyle} sidebarRight={sidebarRight} />
            ))}
          </List>
        </Collapse>
      </Box>
    );
  }

  const active = Boolean(item.path && pathsMatch(pathname, item.path));
  const commonProps = {
    sx: leafButtonSx(depth, active, Boolean(item.disabled), mini, activeMenuStyle, sidebarRight, semidark),
    disabled: item.disabled,
  };
  const content = (
    <>
      <ListItemIcon sx={itemIconSx(depth, active, Boolean(item.disabled), mini)}>{renderIcon(item)}</ListItemIcon>
      {!mini && <ListItemText primary={item.title} primaryTypographyProps={sidebarTitleTypographyProps(active ? 600 : 500)} />}
      {!mini && item.pending && <PendingPill />}
      {!mini && item.badge && <BadgePill label={item.badge} />}
      {!mini && item.href && <OpenInNew sx={{ fontSize: 13, opacity: 0.54, marginInlineStart: 0.4 }} />}
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
  return <Box component="span" sx={{ marginInlineStart: 0.5, px: 0.7, py: 0.1, borderRadius: 999, bgcolor: "primary.main", color: "#fff", fontSize: 10, fontWeight: 700, lineHeight: 1.45 }}>{label}</Box>;
}

function PendingPill() {
  return <Box component="span" sx={{ marginInlineStart: 0.5, px: 0.65, py: 0.1, borderRadius: 999, color: "text.secondary", bgcolor: "rgba(111,125,133,.10)", fontSize: 9.5, fontWeight: 700, lineHeight: 1.45 }}>{pendingNote}</Box>;
}

function groupButtonSx(
  depth: number,
  active: boolean,
  mini = false,
  activeMenuStyle: { shaped: boolean; rounded: boolean; flat: boolean },
  sidebarRight: boolean,
  semidark = false,
) {
  const radius = navRadius(activeMenuStyle, sidebarRight);
  const activeBg = activeMenuStyle.flat ? "transparent" : semidark ? "rgba(255,255,255,.10)" : "background.default";
  const activeShadow = activeMenuStyle.flat ? "none" : semidark ? "inset 3px 3px 8px rgba(0,0,0,.28), inset -3px -3px 8px rgba(255,255,255,.06)" : neuInset;
  return {
    mx: 0.35,
    marginInlineStart: mini ? 0.35 : 0.35 + depth * 1.55,
    marginInlineEnd: 0.45,
    my: 0.2,
    minHeight: 40,
    px: mini ? 0 : 2,
    justifyContent: mini ? "center" : "flex-start",
    borderRadius: radius,
    color: active ? "primary.main" : semidark ? "#f6f7fb" : "text.primary",
    bgcolor: "transparent",
    transition: "background-color 140ms ease, color 140ms ease, box-shadow 140ms ease",
    "& .MuiSvgIcon-root": { fontSize: depth === 0 ? 21 : 18 },
    "&:hover": { bgcolor: "rgba(0,131,143,.065)", color: "primary.main" },
    ...(active && {
      bgcolor: activeBg,
      boxShadow: activeShadow,
      "&:hover": { bgcolor: activeBg, color: "primary.main" },
    }),
  };
}

function leafButtonSx(
  depth: number,
  active: boolean,
  disabled: boolean,
  mini = false,
  activeMenuStyle: { shaped: boolean; rounded: boolean; flat: boolean },
  sidebarRight: boolean,
  semidark = false,
) {
  const radius = navRadius(activeMenuStyle, sidebarRight);
  const activeBg = activeMenuStyle.flat ? "transparent" : semidark ? "rgba(255,255,255,.10)" : "background.default";
  const activeShadow = activeMenuStyle.flat ? "none" : semidark ? "inset 3px 3px 8px rgba(0,0,0,.28), inset -3px -3px 8px rgba(255,255,255,.06)" : neuInset;
  return {
    mx: 0.35,
    marginInlineStart: mini ? 0.35 : 0.35 + depth * 1.65,
    marginInlineEnd: 0.45,
    my: 0.15,
    minHeight: 40,
    px: mini ? 0 : 2,
    justifyContent: mini ? "center" : "flex-start",
    borderRadius: radius,
    color: active ? "primary.main" : semidark ? "#c8d0d8" : "text.secondary",
    opacity: disabled ? 0.54 : 1,
    transition: "background-color 140ms ease, color 140ms ease, box-shadow 140ms ease",
    "& .MuiSvgIcon-root": { fontSize: depth === 0 ? 20 : 17 },
    "&:hover": disabled ? {} : { bgcolor: "rgba(0,131,143,.065)", color: "primary.main" },
    ...(active && {
      color: "primary.main",
      bgcolor: activeBg,
      boxShadow: activeShadow,
      "&:hover": { bgcolor: activeBg, color: "primary.main" },
    }),
    "&.Mui-disabled": {
      color: semidark ? "#9aa6af" : "text.secondary",
      opacity: 0.52,
    },
  };
}

function sidebarTitleTypographyProps(fontWeight: number) {
  return {
    fontWeight,
    fontSize: ".95rem",
    lineHeight: "1.2rem",
    letterSpacing: "normal",
    noWrap: true,
  };
}

function navRadius(style: { shaped: boolean; rounded: boolean; flat: boolean }, sidebarRight: boolean) {
  if (style.flat) return 0;
  if (style.rounded) return 999;
  if (style.shaped) return sidebarRight ? "999px 0 0 999px" : "0 999px 999px 0";
  return 4;
}

function itemIconSx(depth: number, active: boolean, disabled = false, mini = false) {
  return {
    minWidth: mini ? 0 : depth === 0 ? 34 : 30,
    color: active ? "primary.main" : "inherit",
    opacity: disabled ? 0.72 : 1,
    alignItems: "center",
    justifyContent: "center",
    "& .MuiSvgIcon-root": { fontSize: depth === 0 ? 20 : 17 },
  };
}
