import { useState, type ReactNode } from "react";
import {
  Box,
  Card,
  Collapse,
  IconButton,
  MenuItem,
  Slider,
  Switch,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Code, GitHub, InvertColors, Layers } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";

type ExampleKey = "usage" | "playground" | "simple/elevation" | "simple/tile" | "intermediate/colors-sizes";

function colorValue(color?: string) {
  switch (color) {
    case "orange lighten-2":
      return "#ffb74d";
    case "grey lighten-3":
      return "#eeeeee";
    case "gray darken-2":
    case "grey darken-2":
      return "#616161";
    case "warning":
      return "#fb8c00";
    case "error":
      return "#ff5252";
    case "success":
      return "#4caf50";
    case "teal":
      return "#009688";
    case "green lighten-3":
      return "#a5d6a7";
    case "yellow lighten-3":
      return "#fff59d";
    case "red lighten-3":
      return "#ef9a9a";
    case "teal lighten-3":
      return "#80cbc4";
    case "purple lighten-3":
      return "#ce93d8";
    case "rgba(0, 0, 0, .36)":
      return "rgba(0, 0, 0, .36)";
    case "white":
      return "#fff";
    case "transparent":
      return "transparent";
    default:
      return color || "#fff";
  }
}

const elevationUmbra = [
  "0px 0px 0px 0px rgba(0,0,0,.2)",
  "0px 2px 1px -1px rgba(0,0,0,.2)",
  "0px 3px 1px -2px rgba(0,0,0,.2)",
  "0px 3px 3px -2px rgba(0,0,0,.2)",
  "0px 2px 4px -1px rgba(0,0,0,.2)",
  "0px 3px 5px -1px rgba(0,0,0,.2)",
  "0px 3px 5px -1px rgba(0,0,0,.2)",
  "0px 4px 5px -2px rgba(0,0,0,.2)",
  "0px 5px 5px -3px rgba(0,0,0,.2)",
  "0px 5px 6px -3px rgba(0,0,0,.2)",
  "0px 6px 6px -3px rgba(0,0,0,.2)",
  "0px 6px 7px -4px rgba(0,0,0,.2)",
  "0px 7px 8px -4px rgba(0,0,0,.2)",
  "0px 7px 8px -4px rgba(0,0,0,.2)",
  "0px 7px 9px -4px rgba(0,0,0,.2)",
  "0px 8px 9px -5px rgba(0,0,0,.2)",
  "0px 8px 10px -5px rgba(0,0,0,.2)",
  "0px 8px 11px -5px rgba(0,0,0,.2)",
  "0px 9px 11px -5px rgba(0,0,0,.2)",
  "0px 9px 12px -6px rgba(0,0,0,.2)",
  "0px 10px 13px -6px rgba(0,0,0,.2)",
  "0px 10px 13px -6px rgba(0,0,0,.2)",
  "0px 10px 14px -6px rgba(0,0,0,.2)",
  "0px 11px 14px -7px rgba(0,0,0,.2)",
  "0px 11px 15px -7px rgba(0,0,0,.2)",
];

const elevationPenumbra = [
  "0px 0px 0px 0px rgba(0,0,0,.14)",
  "0px 1px 1px 0px rgba(0,0,0,.14)",
  "0px 2px 2px 0px rgba(0,0,0,.14)",
  "0px 3px 4px 0px rgba(0,0,0,.14)",
  "0px 4px 5px 0px rgba(0,0,0,.14)",
  "0px 5px 8px 0px rgba(0,0,0,.14)",
  "0px 6px 10px 0px rgba(0,0,0,.14)",
  "0px 7px 10px 1px rgba(0,0,0,.14)",
  "0px 8px 10px 1px rgba(0,0,0,.14)",
  "0px 9px 12px 1px rgba(0,0,0,.14)",
  "0px 10px 14px 1px rgba(0,0,0,.14)",
  "0px 11px 15px 1px rgba(0,0,0,.14)",
  "0px 12px 17px 2px rgba(0,0,0,.14)",
  "0px 13px 19px 2px rgba(0,0,0,.14)",
  "0px 14px 21px 2px rgba(0,0,0,.14)",
  "0px 15px 22px 2px rgba(0,0,0,.14)",
  "0px 16px 24px 2px rgba(0,0,0,.14)",
  "0px 17px 26px 2px rgba(0,0,0,.14)",
  "0px 18px 28px 2px rgba(0,0,0,.14)",
  "0px 19px 29px 2px rgba(0,0,0,.14)",
  "0px 20px 31px 3px rgba(0,0,0,.14)",
  "0px 21px 33px 3px rgba(0,0,0,.14)",
  "0px 22px 35px 3px rgba(0,0,0,.14)",
  "0px 23px 36px 3px rgba(0,0,0,.14)",
  "0px 24px 38px 3px rgba(0,0,0,.14)",
];

const elevationAmbient = [
  "0px 0px 0px 0px rgba(0,0,0,.12)",
  "0px 1px 3px 0px rgba(0,0,0,.12)",
  "0px 1px 5px 0px rgba(0,0,0,.12)",
  "0px 1px 8px 0px rgba(0,0,0,.12)",
  "0px 1px 10px 0px rgba(0,0,0,.12)",
  "0px 1px 14px 0px rgba(0,0,0,.12)",
  "0px 1px 18px 0px rgba(0,0,0,.12)",
  "0px 2px 16px 1px rgba(0,0,0,.12)",
  "0px 3px 14px 2px rgba(0,0,0,.12)",
  "0px 3px 16px 2px rgba(0,0,0,.12)",
  "0px 4px 18px 3px rgba(0,0,0,.12)",
  "0px 4px 20px 3px rgba(0,0,0,.12)",
  "0px 5px 22px 4px rgba(0,0,0,.12)",
  "0px 5px 24px 4px rgba(0,0,0,.12)",
  "0px 5px 26px 4px rgba(0,0,0,.12)",
  "0px 6px 28px 5px rgba(0,0,0,.12)",
  "0px 6px 30px 5px rgba(0,0,0,.12)",
  "0px 6px 32px 5px rgba(0,0,0,.12)",
  "0px 7px 34px 6px rgba(0,0,0,.12)",
  "0px 7px 36px 6px rgba(0,0,0,.12)",
  "0px 8px 38px 7px rgba(0,0,0,.12)",
  "0px 8px 40px 7px rgba(0,0,0,.12)",
  "0px 8px 42px 7px rgba(0,0,0,.12)",
  "0px 9px 44px 8px rgba(0,0,0,.12)",
  "0px 9px 46px 8px rgba(0,0,0,.12)",
];

function elevationShadow(elevation = 0) {
  const value = Math.max(0, Math.min(24, Math.round(elevation)));
  return `${elevationUmbra[value]}, ${elevationPenumbra[value]}, ${elevationAmbient[value]}`;
}

function VSheet({
  children,
  color,
  dark = false,
  elevation = 0,
  height,
  width,
  tile = false,
  sx = {},
}: {
  children?: ReactNode;
  color?: string;
  dark?: boolean;
  elevation?: number;
  height?: number | string;
  width?: number | string;
  tile?: boolean;
  sx?: Record<string, unknown>;
}) {
  return (
    <Box
      className={`v-sheet theme--${dark ? "dark" : "light"} elevation-${elevation}${tile ? " rounded-0" : ""}`}
      sx={{
        bgcolor: colorValue(color),
        borderRadius: tile ? 0 : 0,
        boxShadow: elevationShadow(elevation),
        color: dark ? "#fff" : "rgba(0,0,0,.87)",
        height,
        width,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function VuetifyExampleBlock({ title, description, source, children }: { title: string; description: ReactNode; source: ExampleKey; children: () => ReactNode }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card sx={{ mb: 5, bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
        <Typography sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>{title}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", overflowX: "auto", p: 2 }}>
          <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box>
        </Box>
      </Collapse>
      <Box sx={{ bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", p: 2, overflow: "visible" }}>
        {description && <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography>}
        <Box data-app="true" sx={{ overflow: "visible" }}>{children()}</Box>
      </Box>
    </Card>
  );
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: 0.55, py: 0.18, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: 0.5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

function VContainer({ children }: { children: ReactNode }) {
  return <Box sx={{ width: "100%", px: "12px", mx: "auto" }}>{children}</Box>;
}

function VRow({ children, justify = "flex-start", sx = {} }: { children: ReactNode; justify?: string; sx?: Record<string, unknown> }) {
  return <Box sx={{ display: "flex", flexWrap: "wrap", mx: "-12px", justifyContent: justify, ...sx }}>{children}</Box>;
}

function VCol({ children, cols = 12, md, sx = {} }: { children: ReactNode; cols?: number; md?: number; sx?: Record<string, unknown> }) {
  return (
    <Box
      sx={{
        flex: { xs: `0 0 ${(cols / 12) * 100}%`, md: md ? `0 0 ${(md / 12) * 100}%` : undefined },
        maxWidth: { xs: `${(cols / 12) * 100}%`, md: md ? `${(md / 12) * 100}%` : undefined },
        px: "12px",
        py: "12px",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function UsageExample() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <VSheet color="orange lighten-2">Hello, world! I'm a simple v-sheet</VSheet>
    </Box>
  );
}

function PlaygroundExample() {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [elevation, setElevation] = useState(4);
  const [color, setColor] = useState("white");
  const [tile, setTile] = useState(false);
  const colors = ["white", "gray darken-2", "warning", "error", "success", "teal"];

  return (
    <VContainer>
      <VRow>
        <VCol>
          <PlaySlider label="Width" value={width} min={0} max={500} onChange={setWidth} />
          <PlaySlider label="Height" value={height} min={0} max={500} onChange={setHeight} />
          <PlaySlider label="Elevation" value={elevation} min={0} max={24} onChange={setElevation} />
          <TextField select variant="standard" label="Color" value={color} onChange={(event) => setColor(event.target.value)} sx={{ width: "100%", mb: 2 }}>
            {colors.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
          </TextField>
          <Box onClick={() => setTile(!tile)} sx={{ display: "inline-flex", alignItems: "center", cursor: "pointer", my: 1 }}>
            <Switch checked={tile} onChange={(event) => setTile(event.target.checked)} sx={switchSx} />
            <Typography>Tile</Typography>
          </Box>
        </VCol>
      </VRow>
      <VRow justify="space-around">
        <VSheet width={width} height={height} elevation={elevation} color={color} tile={tile} />
      </VRow>
    </VContainer>
  );
}

function PlaySlider({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", minHeight: 48 }}>
      <Typography sx={{ minWidth: 90, color: "text.secondary", fontSize: 16 }}>{label}</Typography>
      <Slider value={value} min={min} max={max} onChange={(_, newValue) => onChange(newValue as number)} sx={{ color: primary, mx: 2, "& .MuiSlider-thumb": { width: 12, height: 12 }, "& .MuiSlider-track": { height: 2, border: 0 }, "& .MuiSlider-rail": { height: 2 } }} />
    </Box>
  );
}

const switchSx = {
  "& .MuiSwitch-switchBase.Mui-checked": { color: primary },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: primary },
};

function ElevationExample() {
  return (
    <VContainer>
      <VRow justify="space-around">
        {[6, 12, 18].map((elevation) => (
          <VCol key={elevation} cols={12} md={4}>
            <VSheet color="grey lighten-3" sx={{ p: 6 }}>
              <VSheet elevation={elevation} height={100} width={100} sx={{ mx: "auto" }} />
            </VSheet>
          </VCol>
        ))}
      </VRow>
    </VContainer>
  );
}

function TileExample() {
  return (
    <VContainer>
      <VRow justify="space-around">
        {[false, true].map((tile) => (
          <VCol key={String(tile)} cols={12} md={4}>
            <VSheet color="grey lighten-3" sx={{ p: 6 }}>
              <Box />
              <VSheet tile={tile} height={100} width={100} sx={{ mx: "auto" }} />
              <Box />
            </VSheet>
          </VCol>
        ))}
      </VRow>
    </VContainer>
  );
}

function SheetFooter({ children }: { children: ReactNode }) {
  return (
    <VSheet color="rgba(0, 0, 0, .36)" dark height={50} sx={{ mt: "auto", display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
      {children}
    </VSheet>
  );
}

function ColorsSizesExample() {
  return (
    <VContainer>
      <VRow sx={{ alignItems: "stretch" }}>
        <VCol cols={12} md={4} sx={{ display: "flex" }}>
          <VSheet color="grey lighten-3" height={424} sx={{ display: "flex", width: "100%" }}>
            <SheetFooter>#1: (3r x 2c)</SheetFooter>
          </VSheet>
        </VCol>
        <VCol cols={12} md={4} sx={{ display: "flex" }}>
          <VRow>
            <VCol cols={6}>
              <VSheet color="green lighten-3" height={150} sx={{ display: "flex" }}><SheetFooter>#2: (1r x 1c)</SheetFooter></VSheet>
            </VCol>
            <VCol cols={6}>
              <VSheet color="yellow lighten-3" height={150} sx={{ display: "flex" }}><SheetFooter>#3: (1r x 1c)</SheetFooter></VSheet>
            </VCol>
            <VCol cols={12}>
              <VSheet color="red lighten-3" height={250} sx={{ display: "flex" }}><SheetFooter>#5: (2r x 2c)</SheetFooter></VSheet>
            </VCol>
          </VRow>
        </VCol>
        <VCol cols={6} md={2}>
          <VSheet color="teal lighten-3" height={300} sx={{ display: "flex" }}><SheetFooter>#4: (2r x 1c)</SheetFooter></VSheet>
        </VCol>
        <VCol cols={6} md={2} sx={{ display: "flex" }}>
          <VSheet color="purple lighten-3" height={300} sx={{ display: "flex", mt: "auto", width: "100%" }}><SheetFooter>#6: (2r x 1c)</SheetFooter></VSheet>
        </VCol>
      </VRow>
    </VContainer>
  );
}

const examples = [
  { source: "simple/elevation", title: "Using elevation", description: <>Sheets can accept a custom elevation between <strong>0 and 24</strong> (0 is default).</>, render: () => <ElevationExample /> },
  { source: "simple/tile", title: "Tile", description: <>Sheets can accept a <CodePill>tile</CodePill> property which makes them rectangular (no <CodePill>border-radius</CodePill>).</>, render: () => <TileExample /> },
  { source: "intermediate/colors-sizes", title: "Colors & sizes", description: <>Sheets and components based on them can have different sizes and colors.</>, render: () => <ColorsSizesExample /> },
] as const;

export default function SheetsPage() {
  return (
    <DocPage
      title="Sheets"
      namespace="Components"
      icon={<Layers />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Sheets" },
      ]}
    >
      <DocText>The <CodePill>v-sheet</CodePill> is designed to power other <strong>paper</strong> components within Vuetify. It is meant to be used as a low level component.</DocText>
      <Box component="section">
        <Typography component="h2" id="usage" sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400, mb: 2 }}>Usage</Typography>
        <VuetifyExampleBlock title="" source="usage" description={<>The <CodePill>v-sheet</CodePill> component is a malleable piece of paper that can be morphed to facilitate other components.</>}>
          {() => <UsageExample />}
        </VuetifyExampleBlock>
      </Box>
      <Box component="section">
        <Typography component="h2" id="playground" sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400, mb: 2 }}>Playground</Typography>
        <VuetifyExampleBlock title="" source="playground" description="">
          {() => <PlaygroundExample />}
        </VuetifyExampleBlock>
      </Box>
      {examples.map((example) => (
        <VuetifyExampleBlock key={example.source} title={example.title} description={example.description} source={example.source}>
          {example.render}
        </VuetifyExampleBlock>
      ))}
    </DocPage>
  );
}

const sourceTemplates: Record<ExampleKey, string> = {
  usage: `src/demo/examples/sheets/usage.vue`,
  playground: `src/demo/examples/sheets/playground.vue`,
  "simple/elevation": `src/demo/examples/sheets/simple/elevation.vue`,
  "simple/tile": `src/demo/examples/sheets/simple/tile.vue`,
  "intermediate/colors-sizes": `src/demo/examples/sheets/intermediate/colors-sizes.vue`,
};
