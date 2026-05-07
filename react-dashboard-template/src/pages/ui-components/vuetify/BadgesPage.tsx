import { useState, type ReactNode } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  Code,
  Dashboard,
  Email,
  GitHub,
  InvertColors,
  Lock,
  NotificationsActive,
} from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";
import localAvatar from "../../../assets/ui-components/widgets/lists/m2.jpg";

const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const neuGlow = "-6px -6px 5px rgba(255,255,255,.86), 6px 6px 7px rgba(174,174,192,.28)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };

type BadgePosition = {
  left?: boolean;
  bottom?: boolean;
  overlap?: boolean;
  bordered?: boolean;
};

export default function BadgesPage() {
  return (
    <DocPage
      title="Badges"
      namespace="Components"
      icon={<Dashboard />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Badge" },
      ]}
    >
      <DocText>
        The v-badge component superscripts or subscripts an avatar-like icon or text onto content to highlight information to a user or to just draw attention to a specific element.
      </DocText>
      <UsageSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  const [dot, setDot] = useState(false);
  const [overlap, setOverlap] = useState(false);
  const [icon, setIcon] = useState(false);
  const [left, setLeft] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [tab, setTab] = useState("default");
  const [inverted, setInverted] = useState(false);

  const hidden = tab === "hidden";
  const inline = tab === "inline";
  const text = tab === "text";
  const bordered = tab === "bordered";
  const badgeContent = icon ? <NotificationsActive sx={{ fontSize: 13 }} /> : text || inline ? "new" : "6";

  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Usage
      </Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>
        Badges are commonly used to show notification counts, status dots, or small icons around another element. Use the controls to mirror the Vuetify badge props.
      </Typography>
      <Card variant="outlined" sx={{ bgcolor: "background.default", borderColor: "rgba(111,125,133,.18)", boxShadow: "none", overflow: "hidden", mb: 6 }}>
        <Grid container>
          <Grid item xs={12} md={9}>
            <Box sx={{ minHeight: 350, overflowY: "auto", bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "#fff" : "inherit", transition: "background-color 180ms ease" }}>
              <Stack sx={{ minHeight: 350, p: { xs: 3.25, md: 4 } }} alignItems="center" justifyContent="center">
                {inline ? (
                  <Typography sx={{ fontSize: { xs: 18, md: 20 }, lineHeight: 1.8, color: inverted ? "rgba(255,255,255,.9)" : "text.primary" }}>
                    Account status{" "}
                    <VuseBadge inline color="primary" content={badgeContent} dot={dot} value={!hidden} left={left} bottom={bottom} overlap={overlap} bordered={bordered}>
                      <Box component="span" sx={{ fontWeight: 500, color: inverted ? "#fff" : "primary.main" }}>
                        active
                      </Box>
                    </VuseBadge>
                  </Typography>
                ) : (
                  <VuseBadge color="primary" content={badgeContent} dot={dot} value={!hidden} left={left} bottom={bottom} overlap={overlap} bordered={bordered}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        display: "grid",
                        placeItems: "center",
                        color: inverted ? "rgba(255,255,255,.82)" : "rgba(84,96,103,.82)",
                        borderRadius: 1,
                        boxShadow: inverted ? "none" : neuGlow,
                        bgcolor: inverted ? "rgba(255,255,255,.08)" : "background.default",
                      }}
                    >
                      <AccountCircle sx={{ fontSize: 42 }} />
                    </Box>
                  </VuseBadge>
                )}
              </Stack>
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
            <Stack spacing={1.35} sx={{ p: 2.25, maxHeight: 350, overflowY: "auto" }}>
              <UsageTabs value={tab} onChange={setTab} />
              <FormControlLabel control={<Switch checked={dot} onChange={(event) => setDot(event.target.checked)} sx={vuseSwitchSx} />} label="dot" sx={switchLabelSx} />
              <FormControlLabel control={<Switch checked={overlap} onChange={(event) => setOverlap(event.target.checked)} sx={vuseSwitchSx} />} label="overlap" sx={switchLabelSx} />
              <FormControlLabel control={<Switch checked={icon} onChange={(event) => setIcon(event.target.checked)} sx={vuseSwitchSx} />} label="icon" sx={switchLabelSx} />
              <FormControlLabel control={<Switch checked={left} onChange={(event) => setLeft(event.target.checked)} sx={vuseSwitchSx} />} label="left" sx={switchLabelSx} />
              <FormControlLabel control={<Switch checked={bottom} onChange={(event) => setBottom(event.target.checked)} sx={vuseSwitchSx} />} label="bottom" sx={switchLabelSx} />
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

function UsageTabs({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const tabs = ["default", "hidden", "text", "inline", "bordered"];

  return (
    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.8, mb: 0.8 }}>
      {tabs.map((tab) => (
        <Button key={tab} size="small" onClick={() => onChange(tab)} sx={usageTabSx(value === tab)}>
          {tab}
        </Button>
      ))}
    </Stack>
  );
}

function ExamplesSection() {
  return (
    <Box component="section">
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Examples
      </Typography>
      <Typography color="text.secondary" sx={{ ...docsParagraphSx, mb: 5 }}>
        Badge examples rendered with the Vuse documentation card shell and source-matched Vuetify compositions.
      </Typography>
      <Grid container spacing={5.5}>
        {badgeExamples.map((example) => (
          <Grid item xs={12} key={example.title}>
            <VuetifyExampleBlock title={example.title} source={example.source} minHeight={example.minHeight}>
              {example.render()}
            </VuetifyExampleBlock>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function VuetifyExampleBlock({ title, source, children, minHeight = 215 }: { title: string; source: string; children: ReactNode; minHeight?: number }) {
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
        <Tooltip title="Invert example color">
          <IconButton size="small" aria-label="Invert example color" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}>
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
        {children}
      </Box>
    </Card>
  );
}

function TabsExample() {
  const [active, setActive] = useState(0);

  return (
    <Toolbar disableGutters sx={{ minHeight: 64, bgcolor: "#00838f", color: "#fff", width: "100%", boxShadow: "0 2px 5px rgba(0,0,0,.16)" }}>
      <Stack direction="row" sx={{ width: "100%", minHeight: 64 }}>
        {[
          { label: "Item One", badge: <VuseBadge color="pink" dot /> },
          { label: "Item Two", badge: <VuseBadge color="green" content="6" /> },
          { label: "Item Three", badge: <VuseBadge color="deep-purple accent-4" content={<Typography sx={{ color: "#fff", fontSize: 11, fontWeight: 800 }}>V</Typography>} /> },
        ].map((item, index) => (
          <Button
            key={item.label}
            onClick={() => setActive(index)}
            sx={{
              flex: 1,
              borderRadius: 0,
              color: "#fff",
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: 0.3,
              textTransform: "uppercase",
              bgcolor: active === index ? "rgba(255,255,255,.14)" : "transparent",
              borderBottom: active === index ? "2px solid rgba(255,255,255,.95)" : "2px solid transparent",
              "&:hover": { bgcolor: "rgba(255,255,255,.12)" },
              "&:active": { bgcolor: "rgba(255,255,255,.18)" },
            }}
          >
            <VuseBadge color={index === 0 ? "pink" : index === 1 ? "green" : "deep-purple accent-4"} dot={index === 0} content={index === 1 ? "6" : index === 2 ? "V" : undefined}>
              <span>{item.label}</span>
            </VuseBadge>
          </Button>
        ))}
      </Stack>
    </Toolbar>
  );
}

function HoverExample() {
  const [hover, setHover] = useState(false);

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 110 }}>
      <VuseBadge color="deep-purple accent-4" content="9999+" left value={hover}>
        <Box onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)} tabIndex={0} sx={{ display: "grid", placeItems: "center", color: "#bdbdbd", outline: 0 }}>
          <AccountCircle sx={{ fontSize: 38 }} />
        </Box>
      </VuseBadge>
    </Stack>
  );
}

function DynamicExample() {
  const [messages, setMessages] = useState(0);

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container alignItems="center" justifyContent="space-around" spacing={3}>
        <Grid item>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.4}>
            <Button onClick={() => setMessages((value) => value + 1)} sx={vuseButtonSx("primary")}>
              Send Message
            </Button>
            <Button onClick={() => setMessages(0)} sx={vuseButtonSx("error")}>
              Clear Notifications
            </Button>
          </Stack>
        </Grid>
        <Grid item>
          <VuseBadge color="green" content={String(messages)} value={messages > 0} overlap>
            <Email sx={{ fontSize: 38, color: "text.secondary" }} />
          </VuseBadge>
        </Grid>
      </Grid>
    </Box>
  );
}

function CustomizationExample() {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container alignItems="center" justifyContent="center" spacing={{ xs: 3, sm: 4 }}>
        <Grid item>
          <VuseBadge bordered color="error" content={<Lock sx={{ fontSize: 13 }} />} overlap>
            <Button sx={vuseButtonSx("error")}>Lock Account</Button>
          </VuseBadge>
        </Grid>
        <Grid item>
          <VuseBadge bordered bottom color="deep-purple accent-4" dot>
            <Avatar sx={{ width: 40, height: 40 }}>
              <Box component="img" src={localAvatar} alt="Profile" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Avatar>
          </VuseBadge>
        </Grid>
        <Grid item>
          <VuseBadge
            avatarBadge={
              <Avatar sx={{ width: 26, height: 26 }}>
                <Box component="img" src="https://cdn.vuetifyjs.com/images/logos/v.png" alt="Vuetify" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </Avatar>
            }
            bordered
            overlap
          >
            <Avatar sx={{ width: 40, height: 40 }}>
              <Box component="img" src="https://cdn.vuetifyjs.com/images/john.png" alt="John" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Avatar>
          </VuseBadge>
        </Grid>
      </Grid>
    </Box>
  );
}

function VuseBadge({
  children,
  content,
  dot = false,
  color = "primary",
  value = true,
  left = false,
  bottom = false,
  overlap = false,
  bordered = false,
  inline = false,
  avatarBadge,
}: {
  children?: ReactNode;
  content?: ReactNode;
  dot?: boolean;
  color?: string;
  value?: boolean;
  inline?: boolean;
  avatarBadge?: ReactNode;
} & BadgePosition) {
  const isAvatar = Boolean(avatarBadge);

  return (
    <Box component="span" sx={{ position: "relative", display: inline ? "inline-flex" : "inline-flex", alignItems: "center", lineHeight: 1.4 }}>
      {children}
      <Box
        component="span"
        sx={{
          position: "absolute",
          zIndex: 1,
          top: bottom ? "auto" : overlap ? 2 : -8,
          bottom: bottom ? (overlap ? 2 : -8) : "auto",
          right: left ? "auto" : overlap ? 0 : -10,
          left: left ? (overlap ? 0 : -10) : "auto",
          transform: badgeTransform(left, bottom, overlap),
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: isAvatar ? 28 : dot ? 10 : 22,
          width: isAvatar ? 28 : dot ? 10 : "auto",
          height: isAvatar ? 28 : dot ? 10 : 22,
          px: dot || isAvatar ? 0 : 0.65,
          borderRadius: 999,
          bgcolor: isAvatar ? "background.default" : resolveBadgeColor(color),
          color: "#fff",
          border: bordered ? `2px solid ${isAvatar ? "#f2f3f7" : "#f2f3f7"}` : 0,
          fontSize: dot ? 0 : 12,
          fontWeight: 500,
          lineHeight: 1,
          boxSizing: "border-box",
          whiteSpace: "nowrap",
          opacity: value ? 1 : 0,
          scale: value ? 1 : 0.62,
          pointerEvents: "none",
          transition: "opacity 180ms ease, scale 180ms ease, transform 180ms ease",
          boxShadow: "0 1px 2px rgba(0,0,0,.16)",
        }}
      >
        {isAvatar ? avatarBadge : dot ? null : content}
      </Box>
    </Box>
  );
}

const badgeExamples = [
  { title: "Tabs", source: "badges/simple/tabs", minHeight: 166, render: () => <TabsExample /> },
  { title: "Hover", source: "badges/intermediate/hover", minHeight: 160, render: () => <HoverExample /> },
  { title: "Dynamic", source: "badges/complex/dynamic", minHeight: 170, render: () => <DynamicExample /> },
  { title: "Customization", source: "badges/complex/customization", minHeight: 180, render: () => <CustomizationExample /> },
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

function exampleIconSx(active: boolean) {
  return { width: 28, height: 28, color: active ? "primary.main" : "text.secondary", mx: 0.1, bgcolor: "transparent", opacity: active ? 0.72 : 0.48, transition: "color 140ms ease, background-color 140ms ease, opacity 140ms ease, transform 140ms ease", "&:hover": { bgcolor: "rgba(0,131,143,.08)", color: "primary.main", opacity: 0.82 }, "&:active": { transform: "scale(.94)", bgcolor: "rgba(0,131,143,.14)", opacity: 1 }, "&:focus-visible": { outline: "2px solid rgba(0,131,143,.38)", outlineOffset: 2 } };
}

function softIconButtonSx(active: boolean) {
  return { width: 36, height: 36, color: active ? "primary.main" : "text.secondary", bgcolor: "transparent", opacity: active ? 0.86 : 0.72, transition: "color 140ms ease, background-color 140ms ease, transform 140ms ease, opacity 140ms ease", "&:hover": { bgcolor: "rgba(0,131,143,.08)", color: "primary.main", opacity: 1 }, "&:active": { bgcolor: "rgba(0,131,143,.14)", transform: "scale(.94)" }, "&:focus-visible": { outline: "2px solid rgba(0,131,143,.34)", outlineOffset: 2 } };
}

function sourceTabSx(active: boolean) {
  return { minHeight: 32, px: 1.75, borderRadius: 999, color: active ? "#fff" : "rgba(255,255,255,.78)", bgcolor: active ? "rgba(255,255,255,.16)" : "transparent", "&:hover": { bgcolor: active ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.08)" }, "&:active": { bgcolor: "rgba(255,255,255,.22)" }, "&:focus-visible": { outline: "2px solid rgba(29,233,182,.72)", outlineOffset: 2 } };
}

function usageTabSx(active: boolean) {
  return {
    minHeight: 32,
    px: 1.35,
    borderRadius: 999,
    fontSize: 12.5,
    color: active ? "primary.main" : "text.secondary",
    bgcolor: active ? "background.default" : "transparent",
    boxShadow: active ? neuInset : "none",
    textTransform: "capitalize",
    "&:hover": { bgcolor: active ? "background.default" : "rgba(0,131,143,.08)", color: "primary.main" },
    "&:active": { bgcolor: "rgba(0,131,143,.12)" },
  };
}

function vuseButtonSx(color: "primary" | "error") {
  const bg = color === "primary" ? "#00838f" : "#ff5252";
  const hover = color === "primary" ? "#00747e" : "#f04747";

  return {
    minHeight: 36,
    px: 2.15,
    borderRadius: 1,
    bgcolor: bg,
    color: "#fff",
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0.25,
    textTransform: "uppercase",
    boxShadow: "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)",
    "&:hover": { bgcolor: hover, boxShadow: "0 4px 5px rgba(0,0,0,.18)" },
    "&:active": { bgcolor: hover, boxShadow: "0 2px 3px rgba(0,0,0,.18)", transform: "translateY(1px)" },
    "&:focus-visible": { outline: "2px solid rgba(0,131,143,.38)", outlineOffset: 2 },
  };
}

function badgeTransform(left: boolean, bottom: boolean, overlap: boolean) {
  if (overlap) {
    if (left && bottom) return "translate(-35%, 35%)";
    if (left) return "translate(-35%, -35%)";
    if (bottom) return "translate(35%, 35%)";
    return "translate(35%, -35%)";
  }
  if (left && bottom) return "translate(-35%, 35%)";
  if (left) return "translate(-35%, -35%)";
  if (bottom) return "translate(35%, 35%)";
  return "translate(35%, -35%)";
}

function resolveBadgeColor(color: string) {
  const map: Record<string, string> = {
    primary: "#00838f",
    pink: "#e91e63",
    green: "#4caf50",
    "deep-purple accent-4": "#6200ea",
    error: "#ff5252",
  };
  return map[color] || color;
}

function getSourceSections(source: string): Record<string, string> {
  const sections: Record<string, string> = { template: sourceTemplates[source] || "<template>\n  <v-badge color=\"primary\" content=\"6\">Badge</v-badge>\n</template>" };
  if (source.includes("hover")) {
    sections.script = "<script>\n  export default {\n    data: () => ({\n      hover: false,\n    }),\n  }\n</script>";
  }
  if (source.includes("dynamic")) {
    sections.script = "<script>\n  export default {\n    data () {\n      return {\n        messages: 0,\n        show: false,\n      }\n    },\n  }\n</script>";
  }
  return sections;
}

const sourceTemplates: Record<string, string> = {
  "badges/simple/tabs": `<template>
  <v-toolbar>
    <v-tabs dark background-color="primary" grow>
      <v-tab>
        <v-badge color="pink" dot>Item One</v-badge>
      </v-tab>
      <v-tab>
        <v-badge color="green" content="6">Item Two</v-badge>
      </v-tab>
      <v-tab>
        <v-badge color="deep-purple accent-4" icon="mdi-vuetify">Item Three</v-badge>
      </v-tab>
    </v-tabs>
  </v-toolbar>
</template>`,
  "badges/intermediate/hover": `<template>
  <div class="text-center">
    <v-badge :value="hover" color="deep-purple accent-4" content="9999+" left transition="slide-x-transition">
      <v-hover v-model="hover">
        <v-icon color="grey lighten-1" large>mdi-account-circle</v-icon>
      </v-hover>
    </v-badge>
  </div>
</template>`,
  "badges/complex/dynamic": `<template>
  <v-container>
    <v-row justify="space-around">
      <div>
        <v-btn class="mx-1" color="primary" @click="messages++">Send Message</v-btn>
        <v-btn class="mx-1" color="error" @click="messages = 0">Clear Notifications</v-btn>
      </div>
      <v-badge :content="messages" :value="messages" color="green" overlap>
        <v-icon large>mdi-email</v-icon>
      </v-badge>
    </v-row>
  </v-container>
</template>`,
  "badges/complex/customization": `<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-badge bordered color="error" icon="mdi-lock" overlap>
        <v-btn class="white--text" color="error" depressed>Lock Account</v-btn>
      </v-badge>
      <div class="mx-3"></div>
      <v-badge bordered bottom color="deep-purple accent-4" dot offset-x="10" offset-y="10">
        <v-avatar size="40"><v-img src="/static/doc-images/lists/m2.jpg"></v-img></v-avatar>
      </v-badge>
      <div class="mx-3"></div>
      <v-badge avatar bordered overlap>
        <template v-slot:badge>
          <v-avatar><v-img src="https://cdn.vuetifyjs.com/images/logos/v.png"></v-img></v-avatar>
        </template>
        <v-avatar size="40"><v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img></v-avatar>
      </v-badge>
    </v-row>
  </v-container>
</template>`,
};
