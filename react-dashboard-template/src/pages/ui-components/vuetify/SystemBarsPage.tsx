import { useState, type ReactNode } from "react";
import {
  Box,
  Card,
  Collapse,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  Switch,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  BatteryFull,
  CheckBoxOutlineBlank,
  Close,
  Code,
  Dashboard,
  Email,
  GitHub,
  InvertColors,
  Message,
  Minimize,
  SignalCellularAlt,
  ViewHeadline,
  Wifi,
} from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };
const layoutOne = "https://cdn.vuetifyjs.com/images/home/vuetify_layout1.svg";
const layoutTwo = "https://cdn.vuetifyjs.com/images/home/vuetify_layout2.svg";

interface SystemBarExample {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  minHeight: number;
  render: (inverted: boolean) => ReactNode;
}

export default function SystemBarsPage() {
  return (
    <DocPage
      title="SystemBars"
      namespace="Components"
      icon={<Dashboard />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "System Bars" },
      ]}
    >
      <DocText>
        The <CodePill>v-system-bar</CodePill> component can be used for displaying statuses to the user. It looks like the Android system bar and can contain icons, spacers, and some text.
      </DocText>
      <UsageSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  const [height, setHeight] = useState(30);
  const [lightsOut, setLightsOut] = useState(false);
  const [windowBar, setWindowBar] = useState(false);
  const [inverted, setInverted] = useState(false);

  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Usage
      </Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>
        <CodePill>v-system-bar</CodePill> in its simplest form displays a small container with default theme.
      </Typography>

      <Card variant="outlined" sx={{ bgcolor: "background.default", borderColor: "rgba(111,125,133,.18)", boxShadow: "none", overflow: "hidden", mb: 6 }}>
        <Grid container>
          <Grid item xs={12} md={9}>
            <Box
              sx={{
                minHeight: 300,
                p: { xs: 3, md: 4 },
                bgcolor: inverted ? "#303030" : "transparent",
                color: inverted ? "#fff" : "inherit",
                transition: "background-color 180ms ease, color 180ms ease",
              }}
            >
              <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 220 }}>
                <ImageCard image={layoutOne} height={200} sx={{ mb: 3 }}>
                  <VSystemBar color="orange" height={height} lightsOut={lightsOut} windowBar={windowBar} dark={inverted || windowBar}>
                    <Email sx={systemIconSx} />
                    <span>10 unread emails</span>
                    <Box sx={{ flexGrow: 1 }} />
                    <Wifi sx={systemIconSx} />
                    <SignalCellularAlt sx={systemIconSx} />
                    <BatteryFull sx={systemIconSx} />
                    <span>12:30</span>
                  </VSystemBar>
                </ImageCard>
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
            <Divider />
            <Stack spacing={1.5} sx={{ p: 2.25, maxHeight: 300, overflowY: "auto" }}>
              <TextField
                label="Height - px"
                type="number"
                value={height}
                onChange={(event) => setHeight(clampHeight(Number(event.target.value)))}
                inputProps={{ min: 1, max: 30, step: 1 }}
                sx={vuseTextFieldSx}
              />
              <FormControlLabel control={<Switch checked={lightsOut} onChange={(event) => setLightsOut(event.target.checked)} sx={vuseSwitchSx} />} label="Toggle lights-out" sx={switchLabelSx} />
              <FormControlLabel control={<Switch checked={windowBar} onChange={(event) => setWindowBar(event.target.checked)} sx={vuseSwitchSx} />} label="Toggle window" sx={switchLabelSx} />
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
        {systemBarExamples.map((example) => (
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
  minHeight = 210,
}: {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  children: (inverted: boolean) => ReactNode;
  minHeight?: number;
}) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);

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
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", maxHeight: { xs: "none", sm: "calc(100vh - 275px)" }, overflowY: "auto", p: 2 }}>
          <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', 'SFMono-Regular', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap", color: "#f8f8f2" }}>
            {sourceTemplates[source]}
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

function ColoredBarExample() {
  return (
    <Stack spacing={2.5}>
      <VSystemBar color="primary" dark>
        <Box sx={{ flexGrow: 1 }} />
        <StatusIcons />
      </VSystemBar>
      <VSystemBar color="red lighten-2" dark>
        <Box sx={{ flexGrow: 1 }} />
        <StatusIcons />
      </VSystemBar>
      <VSystemBar color="indigo darken-2" dark>
        <Box sx={{ flexGrow: 1 }} />
        <StatusIcons />
      </VSystemBar>
    </Stack>
  );
}

function LightsOutExample({ inverted }: { inverted: boolean }) {
  return (
    <Stack spacing={2.5}>
      <Subheader inverted={inverted}>Lights out (light)</Subheader>
      <ImageCard image={layoutTwo} height={200}>
        <VSystemBar color="primary" lightsOut>
          <Box sx={{ flexGrow: 1 }} />
          <StatusIcons />
        </VSystemBar>
      </ImageCard>
      <Subheader inverted={inverted}>Lights out (dark)</Subheader>
      <ImageCard image={layoutTwo} height={200}>
        <VSystemBar color="primary" lightsOut dark>
          <Box sx={{ flexGrow: 1 }} />
          <StatusIcons />
        </VSystemBar>
      </ImageCard>
    </Stack>
  );
}

function ThemesExample({ inverted }: { inverted: boolean }) {
  return (
    <Stack spacing={2.5}>
      <Subheader inverted={inverted}>Light status bar</Subheader>
      <ImageCard image={layoutOne} height={200}>
        <VSystemBar color="primary">
          <Box sx={{ flexGrow: 1 }} />
          <StatusIcons />
        </VSystemBar>
      </ImageCard>
      <Subheader inverted={inverted}>Dark status bar</Subheader>
      <ImageCard image={layoutOne} height={200}>
        <VSystemBar color="primary" dark>
          <Box sx={{ flexGrow: 1 }} />
          <StatusIcons />
        </VSystemBar>
      </ImageCard>
    </Stack>
  );
}

function WindowBarExample() {
  return (
    <VSystemBar windowBar dark>
      <Message sx={systemIconSx} />
      <span>10 unread messages</span>
      <Box sx={{ flexGrow: 1 }} />
      <Minimize sx={systemIconSx} />
      <CheckBoxOutlineBlank sx={systemIconSx} />
      <Close sx={systemIconSx} />
    </VSystemBar>
  );
}

function VSystemBar({
  children,
  color,
  dark = false,
  lightsOut = false,
  windowBar = false,
  height,
}: {
  children?: ReactNode;
  color?: string;
  dark?: boolean;
  lightsOut?: boolean;
  windowBar?: boolean;
  height?: number;
}) {
  const resolvedHeight = height ?? (windowBar ? 32 : 24);
  const background = resolveSystemColor(color, dark);
  const foreground = dark ? "#fff" : "rgba(0,0,0,.87)";

  return (
    <Box
      sx={{
        height: resolvedHeight,
        minHeight: resolvedHeight,
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 1,
        fontSize: 13,
        lineHeight: 1,
        fontWeight: 400,
        bgcolor: background,
        color: foreground,
        opacity: lightsOut ? 0.72 : 1,
        borderTopLeftRadius: windowBar ? 4 : 0,
        borderTopRightRadius: windowBar ? 4 : 0,
        transition: "height 180ms ease, min-height 180ms ease, opacity 180ms ease, background-color 180ms ease",
        "& svg": { color: "inherit" },
      }}
    >
      {children}
    </Box>
  );
}

function StatusIcons() {
  return (
    <>
      <Wifi sx={systemIconSx} />
      <SignalCellularAlt sx={systemIconSx} />
      <BatteryFull sx={systemIconSx} />
      <span>12:30</span>
    </>
  );
}

function ImageCard({ image, height, children, sx }: { image: string; height: number; children: ReactNode; sx?: object }) {
  return (
    <Card
      sx={{
        width: "100%",
        height,
        overflow: "hidden",
        borderRadius: 1,
        boxShadow: "0 2px 4px rgba(0,0,0,.2)",
        bgcolor: "#fff",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...sx,
      }}
    >
      {children}
    </Card>
  );
}

function Subheader({ children, inverted }: { children: ReactNode; inverted: boolean }) {
  return (
    <Typography sx={{ height: 48, display: "flex", alignItems: "center", px: 2, color: inverted ? "rgba(255,255,255,.7)" : "rgba(0,0,0,.54)", fontSize: 14, fontWeight: 500 }}>
      {children}
    </Typography>
  );
}

function CodePill({ children }: { children: ReactNode }) {
  return (
    <Box component="code" sx={{ mx: 0.25, px: 0.6, py: 0.2, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "85%" }}>
      {children}
    </Box>
  );
}

function clampHeight(value: number) {
  if (Number.isNaN(value)) return 1;
  return Math.min(30, Math.max(1, value));
}

function resolveSystemColor(color?: string, dark?: boolean) {
  if (color === "primary") return "#0097a7";
  if (color === "orange") return "#ff9800";
  if (color === "red lighten-2") return "#e57373";
  if (color === "indigo darken-2") return "#303f9f";
  if (dark) return "#212121";
  return "#f5f5f5";
}

const systemIconSx = { fontSize: 16, flexShrink: 0 };

const vuseTextFieldSx = {
  width: 125,
  "& .MuiInputLabel-root": { fontSize: 14, color: "text.secondary" },
  "& .MuiInputBase-root": {
    height: 46,
    borderRadius: 1,
    bgcolor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,.18)",
    fontSize: 14,
  },
  "& fieldset": { borderColor: "rgba(0,0,0,.12)" },
};

const switchLabelSx = {
  mx: 0,
  "& .MuiFormControlLabel-label": { fontSize: 15, color: "text.secondary" },
};

const vuseSwitchSx = {
  "& .MuiSwitch-switchBase.Mui-checked": { color: "#0097a7" },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "#0097a7" },
};

function softIconButtonSx(active: boolean) {
  return {
    width: 34,
    height: 34,
    color: active ? "#0097a7" : "text.secondary",
    bgcolor: "background.paper",
    boxShadow: active ? neuInset : "-3px -3px 4px rgba(255,255,255,.72), 3px 3px 5px rgba(174,174,192,.28)",
    "&:hover": { bgcolor: "background.paper", color: "#0097a7" },
  };
}

function exampleIconSx(active: boolean) {
  return {
    width: 32,
    height: 32,
    ml: 0.75,
    color: active ? "#0097a7" : "text.secondary",
    bgcolor: "background.paper",
    boxShadow: active ? neuInset : "-3px -3px 4px rgba(255,255,255,.72), 3px 3px 5px rgba(174,174,192,.24)",
    "&:hover": { bgcolor: "background.paper", color: "#0097a7" },
  };
}

const systemBarExamples: SystemBarExample[] = [
  {
    title: "Colored bar",
    description: <>You can optionally change the color of the <CodePill>v-system-bar</CodePill> by using the <CodePill>color</CodePill> prop.</>,
    source: "color",
    minHeight: 230,
    render: () => <ColoredBarExample />,
  },
  {
    title: "Window bar",
    description: "A window bar with window controls and status info.",
    source: "window",
    minHeight: 170,
    render: () => <WindowBarExample />,
  },
  {
    title: "Themes",
    description: <>Dark or light theme variants can be applied to <CodePill>v-system-bar</CodePill>.</>,
    source: "themes",
    minHeight: 570,
    render: (inverted) => <ThemesExample inverted={inverted} />,
  },
  {
    title: "Lights out",
    description: <>You can reduce <CodePill>v-system-bar</CodePill>&apos;s opacity using <CodePill>lights-out</CodePill> property.</>,
    source: "lights-out",
    minHeight: 570,
    render: (inverted) => <LightsOutExample inverted={inverted} />,
  },
];

const sourceTemplates = {
  color: `<template>
  <div>
    <v-system-bar dark color="primary">
      <v-spacer></v-spacer>
      <v-icon>mdi-wifi-strength-4</v-icon>
      <v-icon>mdi-signal-cellular-outline</v-icon>
      <v-icon>mdi-battery</v-icon>
      <span>12:30</span>
    </v-system-bar>
    <br>
    <v-system-bar dark color="red lighten-2">
      <v-spacer></v-spacer>
      <v-icon>mdi-wifi-strength-4</v-icon>
      <v-icon>mdi-signal-cellular-outline</v-icon>
      <v-icon>mdi-battery</v-icon>
      <span>12:30</span>
    </v-system-bar>
    <br>
    <v-system-bar dark color="indigo darken-2">
      <v-spacer></v-spacer>
      <v-icon>mdi-wifi-strength-4</v-icon>
      <v-icon>mdi-signal-cellular-outline</v-icon>
      <v-icon>mdi-battery</v-icon>
      <span>12:30</span>
    </v-system-bar>
  </div>
</template>`,
  window: `<template>
  <div>
    <v-system-bar window dark>
      <v-icon>mdi-message</v-icon>
      <span>10 unread messages</span>
      <v-spacer></v-spacer>
      <v-icon>mdi-minus</v-icon>
      <v-icon>mdi-checkbox-blank-outline</v-icon>
      <v-icon>mdi-close</v-icon>
    </v-system-bar>
  </div>
</template>`,
  themes: `<template>
  <div>
    <v-subheader>Light status bar</v-subheader>
    <v-card img="https://cdn.vuetifyjs.com/images/home/vuetify_layout1.svg" height="200px">
      <v-system-bar color="primary">
        <v-spacer></v-spacer>
        <v-icon>mdi-wifi-strength-4</v-icon>
        <v-icon>mdi-signal-cellular-outline</v-icon>
        <v-icon>mdi-battery</v-icon>
        <span>12:30</span>
      </v-system-bar>
    </v-card>
    <v-subheader>Dark status bar</v-subheader>
    <v-card img="https://cdn.vuetifyjs.com/images/home/vuetify_layout1.svg" height="200px">
      <v-system-bar color="primary" dark>
        <v-spacer></v-spacer>
        <v-icon>mdi-wifi-strength-4</v-icon>
        <v-icon>mdi-signal-cellular-outline</v-icon>
        <v-icon>mdi-battery</v-icon>
        <span>12:30</span>
      </v-system-bar>
    </v-card>
  </div>
</template>`,
  "lights-out": `<template>
  <div>
    <v-subheader>Lights out (light)</v-subheader>
    <v-card img="https://cdn.vuetifyjs.com/images/home/vuetify_layout2.svg" height="200px">
      <v-system-bar color="primary" lights-out>
        <v-spacer></v-spacer>
        <v-icon>mdi-wifi-strength-4</v-icon>
        <v-icon>mdi-signal-cellular-outline</v-icon>
        <v-icon>mdi-battery</v-icon>
        <span>12:30</span>
      </v-system-bar>
    </v-card>
    <v-subheader>Lights out (dark)</v-subheader>
    <v-card img="https://cdn.vuetifyjs.com/images/home/vuetify_layout2.svg" height="200px">
      <v-system-bar color="primary" lights-out dark>
        <v-spacer></v-spacer>
        <v-icon>mdi-wifi-strength-4</v-icon>
        <v-icon>mdi-signal-cellular-outline</v-icon>
        <v-icon>mdi-battery</v-icon>
        <span>12:30</span>
      </v-system-bar>
    </v-card>
  </div>
</template>`,
};
