import { useState, type ReactNode, type UIEvent } from "react";
import {
  Box,
  Button,
  Card,
  Collapse,
  Grid,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Book,
  Code,
  Dashboard,
  Favorite,
  GitHub,
  History,
  Image,
  InvertColors,
  MusicNote,
  Place,
  Tv,
} from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const neuGlow = "-6px -6px 5px rgba(255,255,255,.86), 6px 6px 7px rgba(174,174,192,.28)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };

type NavValue = string | number;

interface BottomNavItem {
  label: string;
  value: NavValue;
  icon: ReactNode;
}

interface BottomNavigationExample {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  minHeight: number;
  render: (inverted: boolean) => ReactNode;
}

export default function BottomNavigationPage() {
  return (
    <DocPage
      title="BottomNavigation"
      namespace="Components"
      icon={<Dashboard />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Bottom Navigations" },
      ]}
    >
      <DocText>
        The <CodePill>v-bottom-navigation</CodePill> is an alternative to the sidebar. It is primarily used on mobile and comes in two variants, icons and text, and shift.
      </DocText>
      <UsageSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  const [active, setActive] = useState<NavValue>("recent");
  const [inverted, setInverted] = useState(false);

  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Usage
      </Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>
        While the bottom nav is meant to be used with the <CodePill>vue-router</CodePill>, you can also programmatically control the active state of the buttons by using the <CodePill>active.sync</CodePill> prop. You can change a button&apos;s value by using its <CodePill>value</CodePill> attribute.
      </Typography>
      <Card variant="outlined" sx={{ bgcolor: "background.default", borderColor: "rgba(111,125,133,.18)", boxShadow: "none", overflow: "hidden", mb: 6 }}>
        <Toolbar variant="dense" sx={{ bgcolor: "rgba(111,125,133,.10)", minHeight: 54, px: 2.25 }}>
          <Typography sx={{ fontSize: 20, fontWeight: 400 }}>default</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Invert playground colors">
            <IconButton size="small" aria-label="Invert playground colors" onClick={() => setInverted((value) => !value)} sx={softIconButtonSx(inverted)}>
              <InvertColors fontSize="small" />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <Box sx={{ minHeight: 300, p: { xs: 3, md: 4 }, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "#fff" : "inherit", transition: "background-color 180ms ease, color 180ms ease" }}>
          <Stack sx={{ minHeight: 220 }} alignItems="center" justifyContent="center">
            <Box sx={{ width: "100%", maxWidth: 620 }}>
              <VBottomNavigation value={active} onChange={setActive} dark={inverted} items={usageItems} />
            </Box>
          </Stack>
        </Box>
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
        {bottomNavigationExamples.map((example) => (
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
  minHeight = 220,
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

function ColorExample({ inverted }: { inverted: boolean }) {
  return <StaticNavExample active={1} color="purple lighten-1" inverted={inverted} />;
}

function GrowExample({ inverted }: { inverted: boolean }) {
  return <StaticNavExample active={1} color="teal" grow inverted={inverted} />;
}

function HorizontalExample({ inverted }: { inverted: boolean }) {
  return <StaticNavExample active={1} color="primary" horizontal inverted={inverted} />;
}

function StaticNavExample({ active, color, grow = false, horizontal = false, inverted }: { active: number; color: string; grow?: boolean; horizontal?: boolean; inverted: boolean }) {
  const [selected, setSelected] = useState<NavValue>(active);
  return (
    <Box sx={{ width: "100%", maxWidth: 620, mx: "auto" }}>
      <VBottomNavigation value={selected} onChange={setSelected} color={color} grow={grow} horizontal={horizontal} dark={inverted} items={defaultItems} />
    </Box>
  );
}

function ShiftExample() {
  const [active, setActive] = useState<NavValue>(3);
  return (
    <Box sx={{ width: "100%", maxWidth: 660, mx: "auto" }}>
      <VBottomNavigation value={active} onChange={setActive} dark shift items={shiftItems} />
    </Box>
  );
}

function ToggleExample({ inverted }: { inverted: boolean }) {
  const [active, setActive] = useState<NavValue>(1);
  const [show, setShow] = useState(true);

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Button onClick={() => setShow((value) => !value)} sx={{ color: "#673ab7", fontSize: 14, textTransform: "uppercase", letterSpacing: 0.4 }}>
          Toggle Nav
        </Button>
      </Box>
      <Collapse in={show} timeout={220}>
        <Box sx={{ width: "100%", maxWidth: 620, mx: "auto" }}>
          <VBottomNavigation value={active} onChange={setActive} color="indigo" dark={inverted} items={defaultItems} />
        </Box>
      </Collapse>
    </Box>
  );
}

function HideOnScrollExample() {
  const [hidden, setHidden] = useState(false);

  return (
    <ScrollCard onScroll={(top) => setHidden(top > 0)}>
      <VBottomNavigation absolute hidden={hidden} horizontal text color="deep-purple accent-4" items={defaultItems} />
    </ScrollCard>
  );
}

function ScrollThresholdExample() {
  const [hidden, setHidden] = useState(false);

  return (
    <ScrollCard onScroll={(top) => setHidden(top > 500)}>
      <VBottomNavigation absolute hidden={hidden} horizontal color="white" items={defaultItems} />
    </ScrollCard>
  );
}

function ScrollCard({ children, onScroll }: { children: ReactNode; onScroll: (scrollTop: number) => void }) {
  return (
    <Card sx={{ position: "relative", height: 200, maxWidth: 500, mx: "auto", overflow: "hidden", borderRadius: 1, boxShadow: "0 2px 4px rgba(0,0,0,.18)", bgcolor: "#fff" }}>
      {children}
      <Box
        onScroll={(event: UIEvent<HTMLDivElement>) => onScroll(event.currentTarget.scrollTop)}
        sx={{
          maxHeight: 600,
          height: 200,
          overflowY: "auto",
          bgcolor: "#fff",
          backgroundImage: "linear-gradient(180deg, rgba(0,150,167,.05), rgba(0,0,0,0))",
        }}
      >
        <Box sx={{ height: 1500 }} />
      </Box>
    </Card>
  );
}

function VBottomNavigation({
  value,
  onChange,
  items,
  color,
  dark = false,
  grow = false,
  horizontal = false,
  shift = false,
  absolute = false,
  hidden = false,
  text = false,
}: {
  value?: NavValue;
  onChange?: (value: NavValue) => void;
  items: BottomNavItem[];
  color?: string;
  dark?: boolean;
  grow?: boolean;
  horizontal?: boolean;
  shift?: boolean;
  absolute?: boolean;
  hidden?: boolean;
  text?: boolean;
}) {
  const background = resolveNavBackground(color, dark, text);
  const isWhite = color === "white";
  const activeColor = resolveActiveColor(color, dark, text);
  const baseColor = dark ? "rgba(255,255,255,.72)" : "rgba(0,0,0,.54)";

  return (
    <Box
      sx={{
        position: absolute ? "absolute" : "relative",
        left: 0,
        right: 0,
        bottom: absolute ? 0 : "auto",
        zIndex: absolute ? 2 : "auto",
        height: 56,
        display: "flex",
        alignItems: "stretch",
        justifyContent: grow ? "stretch" : "center",
        bgcolor: background,
        color: dark ? "#fff" : "rgba(0,0,0,.87)",
        boxShadow: text ? "none" : "0 -2px 4px rgba(0,0,0,.16)",
        transform: hidden ? "translateY(100%)" : "translateY(0)",
        transition: "transform 220ms cubic-bezier(.4,0,.2,1), background-color 180ms ease",
        overflow: "hidden",
      }}
    >
      {items.map((item, index) => {
        const active = value === item.value || value === index;
        return (
          <Button
            key={item.label}
            onClick={() => onChange?.(item.value)}
            disableRipple={false}
            sx={{
              minWidth: grow ? 0 : horizontal ? 120 : 80,
              flex: grow ? 1 : "0 0 auto",
              height: 56,
              px: horizontal ? 2 : 1.4,
              py: 0,
              borderRadius: 0,
              textTransform: "none",
              color: active ? activeColor : baseColor,
              bgcolor: "transparent",
              "&:hover": { bgcolor: isWhite ? "rgba(0,0,0,.04)" : dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.04)" },
              "& .MuiButton-startIcon": { m: 0 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: horizontal ? "row" : "column",
                alignItems: "center",
                justifyContent: "center",
                gap: horizontal ? 1 : 0.35,
                lineHeight: 1,
                minWidth: 0,
              }}
            >
              <Typography
                component="span"
                sx={{
                  order: horizontal ? 0 : 2,
                  fontSize: horizontal ? 14 : 12,
                  fontWeight: active ? 500 : 400,
                  lineHeight: 1.15,
                  maxHeight: shift && !active ? 0 : 18,
                  opacity: shift && !active ? 0 : 1,
                  overflow: "hidden",
                  transition: "opacity 180ms ease, max-height 180ms ease",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </Typography>
              <Box sx={{ order: horizontal ? 1 : 1, display: "inline-flex", "& svg": { fontSize: horizontal ? 22 : 24 } }}>{item.icon}</Box>
            </Box>
          </Button>
        );
      })}
    </Box>
  );
}

function CodePill({ children }: { children: ReactNode }) {
  return (
    <Box component="code" sx={{ mx: 0.25, px: 0.6, py: 0.2, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "85%" }}>
      {children}
    </Box>
  );
}

function resolveNavBackground(color?: string, dark?: boolean, text?: boolean) {
  if (text) return "transparent";
  if (color === "white") return "#fff";
  if (dark) return "#424242";
  return "#fff";
}

function resolveActiveColor(color?: string, dark?: boolean, text?: boolean) {
  if (color === "purple lighten-1") return "#ab47bc";
  if (color === "teal") return "#009688";
  if (color === "primary") return "#0097a7";
  if (color === "indigo") return "#3f51b5";
  if (color === "deep-purple accent-4") return "#6200ea";
  if (color === "white") return "#000";
  if (dark || text) return "#fff";
  return "#0097a7";
}

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

const defaultItems: BottomNavItem[] = [
  { label: "Recents", value: 0, icon: <History /> },
  { label: "Favorites", value: 1, icon: <Favorite /> },
  { label: "Nearby", value: 2, icon: <Place /> },
];

const usageItems: BottomNavItem[] = [
  { label: "Recent", value: "recent", icon: <History /> },
  { label: "Favorites", value: "favorites", icon: <Favorite /> },
  { label: "Nearby", value: "nearby", icon: <Place /> },
];

const shiftItems: BottomNavItem[] = [
  { label: "Video", value: 0, icon: <Tv /> },
  { label: "Music", value: 1, icon: <MusicNote /> },
  { label: "Book", value: 2, icon: <Book /> },
  { label: "Image", value: 3, icon: <Image /> },
];

const bottomNavigationExamples: BottomNavigationExample[] = [
  {
    title: "Color",
    description: <>The <CodePill>color</CodePill> prop applies a color to the background the bottom navigation. It is recommended to use the <CodePill>light</CodePill> and <CodePill>dark</CodePill> props to properly contrast text color.</>,
    source: "color",
    minHeight: 190,
    render: (inverted) => <ColorExample inverted={inverted} />,
  },
  {
    title: "Grow",
    description: <>If <CodePill>v-bottom-navigation</CodePill> has <CodePill>grow</CodePill> property, buttons within it grow to fill available space.</>,
    source: "grow",
    minHeight: 190,
    render: (inverted) => <GrowExample inverted={inverted} />,
  },
  {
    title: "Horizontal",
    description: <>The <CodePill>horizontal</CodePill> prop, places nav text next to the icon as appose to beneath it.</>,
    source: "horizontal",
    minHeight: 190,
    render: (inverted) => <HorizontalExample inverted={inverted} />,
  },
  {
    title: "Shift",
    description: <>The <CodePill>shift</CodePill> prop will hide the button text until active. For this to work, <CodePill>v-btn</CodePill> text is required to be wrapped in a <CodePill>&lt;span&gt;</CodePill> tag.</>,
    source: "shift",
    minHeight: 190,
    render: () => <ShiftExample />,
  },
  {
    title: "Toggle",
    description: <>The display state of <CodePill>v-bottom-navigation</CodePill> can be toggled using the <CodePill>input-value</CodePill> prop. You can also control the currently active button using <CodePill>v-model</CodePill>.</>,
    source: "toggle",
    minHeight: 230,
    render: (inverted) => <ToggleExample inverted={inverted} />,
  },
  {
    title: "Hide on scroll",
    description: <>Hide-on-scroll hides <CodePill>v-bottom-navigation</CodePill> when target element is scrolled.</>,
    source: "hide-on-scroll",
    minHeight: 310,
    render: () => <HideOnScrollExample />,
  },
  {
    title: "Scroll threshold",
    description: <><CodePill>scroll-threshold</CodePill> property allows you to customize the threshold you can scroll before <CodePill>v-bottom-navigation</CodePill> disappears.</>,
    source: "scroll-threshold",
    minHeight: 310,
    render: () => <ScrollThresholdExample />,
  },
];

const sourceTemplates = {
  color: `<template>
  <v-bottom-navigation
    :value="activeBtn"
    color="purple lighten-1"
  >
    <v-btn>
      <span>Recents</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn>
      <span>Favorites</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn>
      <span>Nearby</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>`,
  grow: `<template>
  <v-bottom-navigation
    :value="activeBtn"
    grow
    color="teal"
  >
    <v-btn>
      <span>Recents</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn>
      <span>Favorites</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn>
      <span>Nearby</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>`,
  horizontal: `<template>
  <v-bottom-navigation
    :value="activeBtn"
    color="primary"
    horizontal
  >
    <v-btn>
      <span>Recents</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn>
      <span>Favorites</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn>
      <span>Nearby</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>`,
  shift: `<template>
  <v-bottom-navigation v-model="bottomNav" dark shift>
    <v-btn>
      <span>Video</span>
      <v-icon>mdi-television-play</v-icon>
    </v-btn>

    <v-btn>
      <span>Music</span>
      <v-icon>music_note</v-icon>
    </v-btn>

    <v-btn>
      <span>Book</span>
      <v-icon>mdi-book</v-icon>
    </v-btn>

    <v-btn>
      <span>Image</span>
      <v-icon>mdi-image</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>`,
  toggle: `<template>
  <div class="overflow-hidden">
    <div class="text-center mb-2">
      <v-btn
        text
        color="deep-purple"
        @click="showNav = !showNav"
      >
        Toggle Nav
      </v-btn>
    </div>

    <v-bottom-navigation
      v-model="activeBtn"
      :input-value="showNav"
      color="indigo"
    >
      <v-btn>
        <span>Recents</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn>
        <span>Favorites</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn>
        <span>Nearby</span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>`,
  "hide-on-scroll": `<template>
  <v-card
    class="overflow-hidden mx-auto"
    height="200"
    max-width="500"
  >
    <v-bottom-navigation
      scroll-target="#scroll-area-1"
      hide-on-scroll
      absolute
      horizontal
    >
      <v-btn text color="deep-purple accent-4">
        <span>Recents</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn text color="deep-purple accent-4">
        <span>Favorites</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn text color="deep-purple accent-4">
        <span>Nearby</span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-sheet
      id="scroll-area-1"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 1500px;">

      </v-container>
    </v-sheet>
  </v-card>
</template>`,
  "scroll-threshold": `<template>
  <v-card
    class="overflow-hidden mx-auto"
    height="200"
    max-width="500"
  >
    <v-bottom-navigation
      scroll-target="#scroll-area-2"
      hide-on-scroll
      scroll-threshold="500"
      absolute
      color="white"
      horizontal
    >
      <v-btn>
        <span>Recents</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn>
        <span>Favorites</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn>
        <span>Nearby</span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-sheet
      id="scroll-area-2"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 1500px;">

      </v-container>
    </v-sheet>
  </v-card>
</template>`,
};
