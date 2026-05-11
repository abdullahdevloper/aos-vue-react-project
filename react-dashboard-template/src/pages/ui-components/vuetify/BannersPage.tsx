import { useState, type ReactNode } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Slider,
  Stack,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AspectRatio,
  Code,
  GitHub,
  InvertColors,
  Lock,
  SignalWifiStatusbarConnectedNoInternet4,
} from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const neuGlow = "-6px -6px 5px rgba(255,255,255,.86), 6px 6px 7px rgba(174,174,192,.28)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };

type UsageTab = "default" | "single-line" | "sticky";

export default function BannersPage() {
  return (
    <DocPage
      title="Banners"
      namespace="Components"
      icon={<AspectRatio />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Badge" },
      ]}
    >
      <DocText>
        The <CodePill>v-banner</CodePill> component is used as middle-interruptive message to user with 1-2 actions. It comes in 2 variations, <strong>single-line</strong> and <strong>multi-line</strong> (implicit). These can have icons which you can use with your message and actions.
      </DocText>
      <UsageSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  const [action, setAction] = useState(false);
  const [icon, setIcon] = useState(false);
  const [elevation, setElevation] = useState(4);
  const [tab, setTab] = useState<UsageTab>("default");
  const [inverted, setInverted] = useState(false);

  const sticky = tab === "sticky";
  const singleLine = tab === "single-line" || sticky;

  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Usage
      </Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>
        Banners can have 1-2 lines of text, actions and icon.
      </Typography>
      <Card variant="outlined" sx={{ bgcolor: "background.default", borderColor: "rgba(111,125,133,.18)", boxShadow: "none", overflow: "hidden", mb: 6 }}>
        <Grid container>
          <Grid item xs={12} md={9}>
            <Box sx={{ bgcolor: "rgba(111,125,133,.10)", borderBottom: "1px solid rgba(111,125,133,.14)" }}>
              <ToggleButtonGroup
                exclusive
                value={tab}
                onChange={(_, value: UsageTab | null) => value && setTab(value)}
                sx={usageTabsGroupSx}
              >
                {(["default", "single-line", "sticky"] as UsageTab[]).map((value) => (
                  <ToggleButton key={value} value={value}>
                    {value}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
            <Box sx={{ height: 300, overflow: "hidden", bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "#fff" : "inherit", transition: "background-color 180ms ease, color 180ms ease" }}>
              <Box id="usage-example" sx={{ width: "calc(100% - 1px)", height: 300, overflowY: "auto" }}>
                <Stack sx={{ minHeight: sticky ? "300vh" : 300, p: 3 }} alignItems={sticky ? "stretch" : "center"} justifyContent={sticky ? "flex-start" : "center"}>
                  <VuseBanner
                    singleLine={singleLine}
                    sticky={sticky}
                    icon={icon ? <AspectRatio sx={{ fontSize: 24 }} /> : undefined}
                    elevation={elevation}
                    dark={inverted}
                    actions={action ? <VuseTextButton>Action Button</VuseTextButton> : undefined}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis magnam necessitatibus possimus
                  </VuseBanner>
                </Stack>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={3} sx={{ borderLeft: { md: "1px solid rgba(111,125,133,.14)" } }}>
            <Toolbar variant="dense" sx={{ bgcolor: "rgba(111,125,133,.10)", minHeight: 54, px: 2.25 }}>
              <Typography sx={{ fontSize: 20, fontWeight: 400 }}>Options</Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Tooltip title="Invert playground colors">
                <IconButton size="small" aria-label="Invert playground colors" onClick={() => setInverted((value) => !value)} sx={softIconButtonSx(inverted)}>
                  <InvertColors fontSize="small" />
                </IconButton>
              </Tooltip>
            </Toolbar>
            <Divider />
            <Stack spacing={1.5} sx={{ p: 2.25, maxHeight: 300, overflowY: "auto" }}>
              <FormControlLabel control={<Switch checked={action} onChange={(event) => setAction(event.target.checked)} sx={vuseSwitchSx} />} label="action" sx={switchLabelSx} />
              <FormControlLabel control={<Switch checked={icon} onChange={(event) => setIcon(event.target.checked)} sx={vuseSwitchSx} />} label="icon" sx={switchLabelSx} />
              <Box sx={{ pt: 1 }}>
                <Typography sx={{ fontSize: 15, color: "text.secondary", textTransform: "capitalize", mb: 0.8 }}>Elevation</Typography>
                <Slider
                  value={elevation}
                  min={0}
                  max={24}
                  onChange={(_, value) => setElevation(value as number)}
                  size="small"
                  sx={vuseSliderSx}
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

function ExamplesSection() {
  return (
    <Box component="section">
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Examples
      </Typography>
      <Grid container spacing={5.5}>
        {bannerExamples.map((example) => (
          <Grid item xs={12} key={example.title}>
            <VuetifyExampleBlock title={example.title} description={example.description} source={example.source} minHeight={example.minHeight}>
              {(inverted) => example.render(inverted)}
            </VuetifyExampleBlock>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function VuetifyExampleBlock({
  title,
  description,
  source,
  children,
  minHeight = 215,
}: {
  title: string;
  description: ReactNode;
  source: string;
  children: (inverted: boolean) => ReactNode;
  minHeight?: number;
}) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("template");
  const sourceSections = getSourceSections(source);
  const sectionNames = Object.keys(sourceSections);
  const activeSection = sourceSections[selectedSection] ? selectedSection : sectionNames[0];

  return (
    <Card sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "hidden" }}>
      <Toolbar variant="dense" sx={{ minHeight: 74, alignItems: "center", px: { xs: 3, md: 4 }, bgcolor: "transparent" }}>
        <Typography sx={{ fontSize: { xs: 22, md: 25 }, fontWeight: 500, lineHeight: 1.35 }}>{title}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors">
          <IconButton size="small" aria-label="Invert example colors" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}>
            <InvertColors sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="View on Github">
          <IconButton size="small" aria-label="View on Github" sx={exampleIconSx(false)}>
            <GitHub sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="View source">
          <IconButton size="small" aria-label="View source" aria-expanded={sourceOpen} onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}>
            <Code sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2" }}>
          <Stack direction="row" spacing={1} sx={{ p: 1, flexWrap: "wrap" }}>
            {sectionNames.map((section) => (
              <Button key={section} size="small" onClick={() => setSelectedSection(section)} sx={sourceTabSx(activeSection === section)}>
                {section}
              </Button>
            ))}
          </Stack>
          <Divider sx={{ borderColor: "rgba(255,255,255,.14)" }} />
          <Box sx={{ maxHeight: { xs: "none", sm: "calc(100vh - 275px)" }, overflowY: "auto", p: 2 }}>
            <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', 'SFMono-Regular', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap", color: "#f8f8f2" }}>
              {sourceSections[activeSection]}
            </Box>
          </Box>
        </Box>
      </Collapse>
      <Box sx={{ px: { xs: 3, md: 4 }, py: { xs: 3.5, md: 4.25 }, minHeight, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", transition: "background-color 180ms ease, color 180ms ease" }}>
        <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: 16.5, fontWeight: 300, lineHeight: 1.7, mb: 3 }}>
          {description}
        </Typography>
        {children(inverted)}
      </Box>
    </Card>
  );
}

function SingleLineExample({ inverted }: { inverted: boolean }) {
  const [sticky, setSticky] = useState(false);

  return (
    <Card sx={{ bgcolor: inverted ? "#424242" : "#fff", color: inverted ? "#fff" : "inherit", boxShadow: inverted ? "none" : "0 2px 4px rgba(0,0,0,.16)", borderRadius: 1, overflow: "hidden" }}>
      <Box sx={{ height: 24, bgcolor: inverted ? "#303030" : "rgba(0,0,0,.04)", borderBottom: `1px solid ${inverted ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.08)"}` }} />
      <Toolbar sx={{ minHeight: 64, px: 2.5, bgcolor: inverted ? "#424242" : "#fff" }}>
        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>My Document</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <FormControlLabel control={<Switch checked={sticky} onChange={(event) => setSticky(event.target.checked)} sx={vuseSwitchSx} />} label="Sticky Banner" sx={{ ...switchLabelSx, "& .MuiFormControlLabel-label": { fontSize: 14, color: inverted ? "rgba(255,255,255,.78)" : "text.secondary" } }} />
      </Toolbar>
      <VuseBanner sticky={sticky} singleLine dark={inverted} actions={<VuseTextButton>Get Online</VuseTextButton>}>
        We can't save your edits while you are in offline mode.
      </VuseBanner>
      <Box sx={{ bgcolor: inverted ? "#303030" : "#f5f5f5", p: 3 }}>
        <Box sx={{ maxWidth: 800, height: 300, mx: "auto", bgcolor: inverted ? "#212121" : "#fff", boxShadow: inverted ? "none" : neuGlow, borderRadius: 1 }} />
      </Box>
    </Card>
  );
}

function TwoLineExample({ inverted }: { inverted: boolean }) {
  return (
    <VuseBanner
      dark={inverted}
      actions={
        <>
          <VuseTextButton color="primary">Dismiss</VuseTextButton>
          <VuseTextButton color="primary">Retry</VuseTextButton>
        </>
      }
    >
      <span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus nec sem id malesuada.
        <br />
        Curabitur lacinia sem et turpis euismod, eget elementum ex pretium.
      </span>
    </VuseBanner>
  );
}

function IconSlotExample({ inverted }: { inverted: boolean }) {
  return (
    <VuseBanner
      dark={inverted}
      icon={
        <Avatar sx={{ width: 40, height: 40, bgcolor: "#6200ea", color: "#fff" }}>
          <Lock sx={{ fontSize: 22 }} />
        </Avatar>
      }
      actions={
        <>
          <VuseTextButton>Action</VuseTextButton>
          <VuseTextButton>Action</VuseTextButton>
        </>
      }
    >
      Three line text string example with two actions. One to two lines is preferable. Three lines should be considered the maximum string length on desktop in order to keep messages short and actionable.
    </VuseBanner>
  );
}

function IconEventExample({ inverted }: { inverted: boolean }) {
  const handleAlert = () => window.alert("Hello, World!");

  return (
    <VuseBanner
      dark={inverted}
      singleLine
      icon={
        <IconButton aria-label="warning connection" onClick={handleAlert} sx={{ width: 44, height: 44, color: "#fb8c00", "&:hover": { bgcolor: "rgba(251,140,0,.08)" } }}>
          <SignalWifiStatusbarConnectedNoInternet4 sx={{ fontSize: 36 }} />
        </IconButton>
      }
      actions={<VuseTextButton color="primary">Connecting Settings</VuseTextButton>}
    >
      Unable to verify your Internet connection
    </VuseBanner>
  );
}

function ActionsSlotExample({ inverted }: { inverted: boolean }) {
  const [visible, setVisible] = useState(true);

  return (
    <Stack spacing={2.5}>
      <FormControlLabel
        control={<Checkbox checked={visible} onChange={(event) => setVisible(event.target.checked)} sx={vuseCheckboxSx} />}
        label="Visible"
        sx={{ m: 0, "& .MuiFormControlLabel-label": { fontSize: 16, color: inverted ? "rgba(255,255,255,.78)" : "text.secondary" } }}
      />
      <Collapse in={visible} timeout={220} unmountOnExit>
        <VuseBanner
          dark={inverted}
          singleLine
          actions={
            <>
              <VuseTextButton color="primary" onClick={() => setVisible(false)}>
                Dismiss
              </VuseTextButton>
              <VuseTextButton color="primary">Retry</VuseTextButton>
            </>
          }
        >
          No Internet connection
        </VuseBanner>
      </Collapse>
    </Stack>
  );
}

function VuseBanner({
  children,
  icon,
  actions,
  singleLine = false,
  sticky = false,
  dark = false,
  elevation = 0,
}: {
  children: ReactNode;
  icon?: ReactNode;
  actions?: ReactNode;
  singleLine?: boolean;
  sticky?: boolean;
  dark?: boolean;
  elevation?: number;
}) {
  return (
    <Box
      sx={{
        position: sticky ? "sticky" : "relative",
        top: sticky ? 0 : "auto",
        zIndex: sticky ? 1 : "auto",
        width: "100%",
        minHeight: singleLine ? 56 : 76,
        display: "flex",
        alignItems: singleLine ? "center" : "flex-start",
        bgcolor: dark ? "#424242" : "#fff",
        color: dark ? "#fff" : "rgba(0,0,0,.87)",
        boxShadow: elevation > 0 ? elevationShadow(elevation) : dark ? "none" : "0 1px 0 rgba(0,0,0,.12)",
        borderTop: `1px solid ${dark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.08)"}`,
        borderBottom: `1px solid ${dark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.08)"}`,
        transition: "background-color 180ms ease, box-shadow 180ms ease",
      }}
    >
      {icon ? <Box sx={{ flex: "0 0 auto", width: 72, minHeight: singleLine ? 56 : 76, display: "grid", placeItems: "center", pt: singleLine ? 0 : 1 }}>{icon}</Box> : null}
      <Box sx={{ flex: 1, py: singleLine ? 1.6 : 2, pr: actions ? 1.5 : 3, pl: icon ? 0 : 3, fontSize: 16, lineHeight: 1.5, minWidth: 0 }}>{children}</Box>
      {actions ? (
        <Stack direction="row" spacing={0.6} alignItems="center" sx={{ flex: "0 0 auto", minHeight: singleLine ? 56 : 76, px: 1.5, pt: singleLine ? 0 : 1.1, alignSelf: singleLine ? "stretch" : "flex-start" }}>
          {actions}
        </Stack>
      ) : null}
    </Box>
  );
}

function VuseTextButton({ children, color = "deep-purple", onClick }: { children: ReactNode; color?: "deep-purple" | "primary"; onClick?: () => void }) {
  const resolved = color === "primary" ? "#1976d2" : "#6200ea";

  return (
    <Button
      onClick={onClick}
      sx={{
        minHeight: 36,
        px: 1.45,
        color: resolved,
        bgcolor: "transparent",
        borderRadius: 1,
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: 0.25,
        textTransform: "uppercase",
        "&:hover": { bgcolor: `${resolved}14` },
        "&:active": { bgcolor: `${resolved}24`, transform: "translateY(1px)" },
        "&:focus-visible": { outline: `2px solid ${resolved}55`, outlineOffset: 2 },
      }}
    >
      {children}
    </Button>
  );
}

function CodePill({ children }: { children: ReactNode }) {
  return (
    <Box component="code" sx={{ px: 0.55, py: 0.15, borderRadius: 0.75, bgcolor: "rgba(255,82,82,.10)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "0.88em" }}>
      {children}
    </Box>
  );
}

const bannerExamples = [
  {
    title: "Single-line (desktop)",
    description: (
      <>
        <strong>Single-line</strong> VBanner is used for small amount of information and is recommended for desktop only implementations. You can optionally enable the <strong>sticky</strong> prop to ensure the content is pinned to the screen (note: does not work in IE11). You can find more information about <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/position">sticky positioning here</a>.
      </>
    ),
    source: "banners/simple/single-line",
    minHeight: 460,
    render: (inverted: boolean) => <SingleLineExample inverted={inverted} />,
  },
  {
    title: "Two-line (mobile)",
    description: (
      <>
        <strong>Two-line</strong> VBanner can store larger amount of data, use it for big messages.
      </>
    ),
    source: "banners/simple/two-line",
    minHeight: 170,
    render: (inverted: boolean) => <TwoLineExample inverted={inverted} />,
  },
  {
    title: "Icon slot",
    description: "The icon slot allows you to to explicitly control the content and functionality within it.",
    source: "banners/intermediate/icon-slot",
    minHeight: 190,
    render: (inverted: boolean) => <IconSlotExample inverted={inverted} />,
  },
  {
    title: "Icon click event",
    description: (
      <>
        VBanner emits <CodePill>click:icon</CodePill> event on icon click, even with custom icon slot.
      </>
    ),
    source: "banners/intermediate/icon-event",
    minHeight: 170,
    render: (inverted: boolean) => <IconEventExample inverted={inverted} />,
  },
  {
    title: "Actions slot",
    description: (
      <>
        the <CodePill>actions</CodePill> slot has <CodePill>dismiss</CodePill> function in its scope, you can use it to easily dismiss banner.
      </>
    ),
    source: "banners/intermediate/actions-slots",
    minHeight: 185,
    render: (inverted: boolean) => <ActionsSlotExample inverted={inverted} />,
  },
];

const switchLabelSx = { m: 0, minHeight: 42, "& .MuiFormControlLabel-label": { fontSize: 15, color: "text.secondary", textTransform: "capitalize" } };

const vuseSwitchSx = {
  width: 48,
  height: 30,
  p: 0.5,
  "& .MuiSwitch-switchBase": { p: 0.75, transitionDuration: "140ms", "&.Mui-checked": { transform: "translateX(18px)", color: "#fff", "& + .MuiSwitch-track": { bgcolor: "#00838f", opacity: 1 }, "&:hover": { bgcolor: "rgba(0,131,143,.08)" } }, "&:hover": { bgcolor: "rgba(0,131,143,.06)" } },
  "& .MuiSwitch-thumb": { width: 18, height: 18, boxShadow: neuGlow },
  "& .MuiSwitch-track": { borderRadius: 999, bgcolor: "rgba(111,125,133,.26)", opacity: 1, boxShadow: "inset 1px 1px 3px rgba(174,174,192,.34)" },
};

const vuseSliderSx = {
  color: "#00838f",
  height: 2,
  "& .MuiSlider-thumb": { width: 15, height: 15, bgcolor: "#ff9800", boxShadow: "0 2px 5px rgba(0,0,0,.24)", "&:hover, &.Mui-focusVisible": { boxShadow: "0 0 0 8px rgba(255,152,0,.16)" }, "&.Mui-active": { boxShadow: "0 0 0 12px rgba(255,152,0,.18)" } },
  "& .MuiSlider-track": { border: 0, height: 2 },
  "& .MuiSlider-rail": { height: 2, opacity: 1, bgcolor: "rgba(111,125,133,.26)" },
};

const vuseCheckboxSx = {
  width: 36,
  height: 36,
  color: "#00838f",
  "&.Mui-checked": { color: "#00838f" },
  "& .MuiSvgIcon-root": { fontSize: 22 },
  "&:hover": { bgcolor: "rgba(0,131,143,.08)" },
};

const usageTabsGroupSx = {
  pl: { xs: 0, md: 3 },
  overflowX: "auto",
  maxWidth: "100%",
  "& .MuiToggleButton-root": {
    minHeight: 54,
    px: 2.4,
    color: "text.secondary",
    bgcolor: "transparent",
    boxShadow: "none",
    borderRadius: 0,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.2,
    textTransform: "none",
    transition: "color 140ms ease, background-color 140ms ease, box-shadow 140ms ease",
    "&:hover": { bgcolor: "rgba(0,131,143,.06)", color: "primary.main" },
    "&.Mui-selected": { color: "primary.main", boxShadow: "inset 0 -2px 0 #00838f", bgcolor: "rgba(0,131,143,.04)", "&:hover": { bgcolor: "rgba(0,131,143,.08)" } },
  },
};

function exampleIconSx(active: boolean) {
  return { width: 28, height: 28, color: active ? "primary.main" : "text.secondary", mx: 0.1, bgcolor: "transparent", opacity: active ? 0.72 : 0.48, transition: "color 140ms ease, background-color 140ms ease, opacity 140ms ease, transform 140ms ease", "&:hover": { bgcolor: "rgba(0,131,143,.08)", color: "primary.main", opacity: 0.82 }, "&:active": { transform: "scale(.94)", bgcolor: "rgba(0,131,143,.14)", opacity: 1 }, "&:focus-visible": { outline: "2px solid rgba(0,131,143,.38)", outlineOffset: 2 } };
}

function softIconButtonSx(active: boolean) {
  return { width: 36, height: 36, color: active ? "primary.main" : "text.secondary", bgcolor: "transparent", opacity: active ? 0.86 : 0.72, transition: "color 140ms ease, background-color 140ms ease, transform 140ms ease, opacity 140ms ease", "&:hover": { bgcolor: "rgba(0,131,143,.08)", color: "primary.main", opacity: 1 }, "&:active": { bgcolor: "rgba(0,131,143,.14)", transform: "scale(.94)" }, "&:focus-visible": { outline: "2px solid rgba(0,131,143,.34)", outlineOffset: 2 } };
}

function sourceTabSx(active: boolean) {
  return { minHeight: 32, px: 1.75, borderRadius: 999, color: active ? "#fff" : "rgba(255,255,255,.78)", bgcolor: active ? "rgba(255,255,255,.16)" : "transparent", "&:hover": { bgcolor: active ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.08)" }, "&:active": { bgcolor: "rgba(255,255,255,.22)" }, "&:focus-visible": { outline: "2px solid rgba(29,233,182,.72)", outlineOffset: 2 } };
}

function elevationShadow(elevation: number) {
  if (elevation <= 0) return "none";
  const y = Math.min(8, Math.max(1, elevation / 3));
  const blur = Math.min(18, Math.max(3, elevation * 1.2));
  return `0 ${y}px ${blur}px rgba(0,0,0,.22)`;
}

function getSourceSections(source: string): Record<string, string> {
  const sections: Record<string, string> = { template: sourceTemplates[source] || "<template>\n  <v-banner>Banner</v-banner>\n</template>" };
  if (source.includes("single-line")) {
    sections.script = "<script>\n  export default {\n    data: () => ({ sticky: false }),\n  }\n</script>";
  }
  if (source.includes("icon-event")) {
    sections.script = "<script>\n  export default {\n    methods: {\n      alert () { alert('Hello, World!') },\n    },\n  }\n</script>";
  }
  if (source.includes("actions-slots")) {
    sections.script = "<script>\n  export default {\n    data: () => ({ v0: true }),\n  }\n</script>";
  }
  return sections;
}

const sourceTemplates: Record<string, string> = {
  "banners/simple/single-line": `<template>
  <v-card>
    <v-system-bar></v-system-bar>
    <v-toolbar flat>
      <v-toolbar-title>My Document</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-switch v-model="sticky" label="Sticky Banner" hide-details></v-switch>
    </v-toolbar>
    <v-banner single-line :sticky="sticky">
      We can't save your edits while you are in offline mode.
      <template v-slot:actions>
        <v-btn text color="deep-purple accent-4">Get Online</v-btn>
      </template>
    </v-banner>
    <v-card-text class="grey lighten-4">
      <v-sheet max-width="800" height="300" class="mx-auto"></v-sheet>
    </v-card-text>
  </v-card>
</template>`,
  "banners/simple/two-line": `<template>
  <v-banner>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus nec sem id malesuada.
    Curabitur lacinia sem et turpis euismod, eget elementum ex pretium.
    <template v-slot:actions>
      <v-btn text color="primary">Dismiss</v-btn>
      <v-btn text color="primary">Retry</v-btn>
    </template>
  </v-banner>
</template>`,
  "banners/intermediate/icon-slot": `<template>
  <v-banner two-line>
    <template v-slot:icon>
      <v-avatar color="deep-purple accent-4" size="40">
        <v-icon icon="mdi-lock" color="white"></v-icon>
      </v-avatar>
    </template>
    Three line text string example with two actions.
    <template v-slot:actions>
      <v-btn text color="deep-purple accent-4">Action</v-btn>
      <v-btn text color="deep-purple accent-4">Action</v-btn>
    </template>
  </v-banner>
</template>`,
  "banners/intermediate/icon-event": `<template>
  <v-banner single-line @click:icon="alert">
    <template v-slot:icon>
      <v-icon color="warning" size="36">mdi-wifi-strength-alert-outline</v-icon>
    </template>
    Unable to verify your Internet connection
    <template v-slot:actions>
      <v-btn text color="primary">Connecting Settings</v-btn>
    </template>
  </v-banner>
</template>`,
  "banners/intermediate/actions-slots": `<template>
  <div>
    <v-checkbox v-model="v0" label="Visible"></v-checkbox>
    <v-banner v-model="v0" single-line transition="slide-y-transition">
      No Internet connection
      <template v-slot:actions="{ dismiss }">
        <v-btn text color="primary" @click="dismiss">Dismiss</v-btn>
        <v-btn text color="primary">Retry</v-btn>
      </template>
    </v-banner>
  </div>
</template>`,
};
