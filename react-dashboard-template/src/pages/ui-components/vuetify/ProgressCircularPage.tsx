import { useEffect, useState, type ReactNode } from "react";
import {
  Box,
  Card,
  Collapse,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Code, DonutLarge, GitHub, InvertColors } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const secondary = "#ffa726";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const progressUnderlay = "rgba(0,0,0,.1)";
const overlayTransition = "all .6s ease-in-out";
const svgTransition = "all .2s ease-in-out";

type ExampleKey = keyof typeof sourceTemplates;

function colorValue(color?: string) {
  switch (color) {
    case "primary":
      return primary;
    case "secondary":
      return secondary;
    case "light-blue":
      return "#03a9f4";
    case "blue-grey":
      return "#607d8b";
    case "deep-orange lighten-2":
      return "#ff8a65";
    case "brown":
      return "#795548";
    case "lime":
      return "#cddc39";
    case "indigo darken-2":
      return "#303f9f";
    case "red":
      return "#f44336";
    case "purple":
      return "#9c27b0";
    case "green":
      return "#4caf50";
    case "amber":
      return "#ffc107";
    case "teal":
      return "#009688";
    case "pink":
      return "#e91e63";
    default:
      return secondary;
  }
}

function VProgressCircular({
  value = 0,
  size = 32,
  width = 4,
  rotate = 0,
  color,
  indeterminate = false,
  children,
}: {
  value?: number | string;
  size?: number | string;
  width?: number | string;
  rotate?: number | string;
  color?: string;
  indeterminate?: boolean;
  children?: ReactNode;
}) {
  const radius = 20;
  const numericSize = Number(size);
  const numericWidth = Number(width);
  const numericValue = Math.max(0, Math.min(100, parseFloat(String(value))));
  const viewBoxSize = radius / (1 - numericWidth / numericSize);
  const circumference = 2 * Math.PI * radius;
  const dashArray = Math.round(circumference * 1000) / 1000;
  const dashOffset = ((100 - numericValue) / 100) * circumference;
  const strokeWidth = (numericWidth / numericSize) * viewBoxSize * 2;
  const cx = 2 * viewBoxSize;
  const cy = 2 * viewBoxSize;

  return (
    <Box
      className={`v-progress-circular${indeterminate ? " v-progress-circular--indeterminate" : ""}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={indeterminate ? undefined : numericValue}
      sx={{
        position: "relative",
        display: "inline-flex",
        verticalAlign: "middle",
        justifyContent: "center",
        alignItems: "center",
        width: numericSize,
        height: numericSize,
        color: colorValue(color),
        "@keyframes progress-circular-rotate": { "100%": { transform: "rotate(360deg)" } },
        "@keyframes progress-circular-dash": {
          "0%": { strokeDasharray: "1, 200", strokeDashoffset: "0px" },
          "50%": { strokeDasharray: "100, 200", strokeDashoffset: "-15px" },
          "100%": { strokeDasharray: "100, 200", strokeDashoffset: "-125px" },
        },
        "& svg": {
          width: "100%",
          height: "100%",
          margin: "auto",
          position: "absolute",
          inset: 0,
          zIndex: 0,
          transform: `rotate(${Number(rotate)}deg)`,
        },
        "&.v-progress-circular--indeterminate svg": {
          animation: "progress-circular-rotate 1.4s linear infinite",
          transformOrigin: "center center",
          transition: svgTransition,
        },
        "&.v-progress-circular--indeterminate .v-progress-circular__overlay": {
          animation: "progress-circular-dash 1.4s ease-in-out infinite",
          strokeLinecap: "round",
          strokeDasharray: "80, 200",
          strokeDashoffset: "0px",
        },
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={`${viewBoxSize} ${viewBoxSize} ${2 * viewBoxSize} ${2 * viewBoxSize}`}>
        {!indeterminate && (
          <circle
            className="v-progress-circular__underlay"
            fill="transparent"
            cx={cx}
            cy={cy}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={0}
            stroke={progressUnderlay}
          />
        )}
        <circle
          className="v-progress-circular__overlay"
          fill="transparent"
          cx={cx}
          cy={cy}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
          strokeDashoffset={`${dashOffset}px`}
          stroke="currentColor"
          style={{ transition: overlayTransition }}
        />
      </svg>
      <Box className="v-progress-circular__info" sx={{ alignItems: "center", display: "flex", justifyContent: "center", zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
}

function VuetifyExampleBlock({ title, description, source, children }: { title: string; description: ReactNode; source: ExampleKey; children: () => ReactNode }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card sx={{ mb: 5, bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
        {title && <Typography sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>{title}</Typography>}
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

function TextCenter({ children }: { children: ReactNode }) {
  return <Box sx={{ textAlign: "center", "& .v-progress-circular": { m: "1rem" } }}>{children}</Box>;
}

function UsageExample() {
  return (
    <TextCenter>
      <VProgressCircular value={20} />
      <VProgressCircular value={40} />
      <VProgressCircular value={60} />
      <VProgressCircular value={80} />
      <VProgressCircular value={100} />
    </TextCenter>
  );
}

function PlaygroundExample() {
  const [indeterminate, setIndeterminate] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [size, setSize] = useState(32);
  const [value, setValue] = useState(0);
  const [width, setWidth] = useState(4);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", mx: -1.5 }}>
      <Box sx={{ textAlign: "center", m: 12 }}>
        <VProgressCircular indeterminate={indeterminate} rotate={rotate} size={size} value={value} width={width} color="light-blue">
          {value}
        </VProgressCircular>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
        <PlaygroundField label="Rotate" value={rotate} onChange={setRotate} />
        <PlaygroundField label="Size - px" value={size} onChange={setSize} />
        <PlaygroundField label="Value - %" value={value} onChange={setValue} />
        <PlaygroundField label="Width - px" value={width} onChange={setWidth} />
        <Box sx={{ flex: { xs: "0 0 100%", md: "0 0 25%", lg: "0 0 16.666%" }, maxWidth: { xs: "100%", md: "25%", lg: "16.666%" }, px: 1.5 }}>
          <FormControlLabel
            sx={{ mx: 4 }}
            control={<Switch checked={indeterminate} onChange={(event) => setIndeterminate(event.target.checked)} sx={switchSx} />}
            label="Toggle indeterminate"
          />
        </Box>
      </Box>
    </Box>
  );
}

function PlaygroundField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <Box sx={{ flex: { xs: "0 0 100%", md: "0 0 25%", lg: "0 0 16.666%" }, maxWidth: { xs: "100%", md: "25%", lg: "16.666%" }, px: 1.5 }}>
      <TextField
        variant="standard"
        type="number"
        label={label}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        inputProps={{ min: 0, max: 360, step: 1 }}
        sx={{ width: 125, mx: 4 }}
      />
    </Box>
  );
}

const switchSx = {
  "& .MuiSwitch-switchBase.Mui-checked": { color: primary },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: primary },
};

function ColoredExample() {
  return (
    <TextCenter>
      <VProgressCircular value={100} color="blue-grey" />
      <VProgressCircular value={80} color="deep-orange lighten-2" />
      <VProgressCircular value={60} color="brown" />
      <VProgressCircular value={40} color="lime" />
      <VProgressCircular value={20} color="indigo darken-2" />
    </TextCenter>
  );
}

function IndeterminateExample() {
  return (
    <TextCenter>
      <VProgressCircular indeterminate color="primary" />
      <VProgressCircular indeterminate color="red" />
      <VProgressCircular indeterminate color="purple" />
      <VProgressCircular indeterminate color="green" />
      <VProgressCircular indeterminate color="amber" />
    </TextCenter>
  );
}

function SizeAndWidthExample() {
  return (
    <TextCenter>
      <VProgressCircular size={50} color="primary" indeterminate />
      <VProgressCircular width={3} color="red" indeterminate />
      <VProgressCircular size={70} width={7} color="purple" indeterminate />
      <VProgressCircular width={3} color="green" indeterminate />
      <VProgressCircular size={50} color="amber" indeterminate />
    </TextCenter>
  );
}

function RotateExample() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const interval = window.setInterval(() => {
      setValue((current) => (current === 100 ? 0 : current + 10));
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <TextCenter>
      <VProgressCircular rotate={360} size={100} width={15} value={value} color="teal">{value}</VProgressCircular>
      <VProgressCircular rotate={-90} size={100} width={15} value={value} color="primary">{value}</VProgressCircular>
      <VProgressCircular rotate={90} size={100} width={15} value={value} color="red">{value}</VProgressCircular>
      <VProgressCircular rotate={180} size={100} width={15} value={value} color="pink">{value}</VProgressCircular>
    </TextCenter>
  );
}

const examples = [
  {
    key: "simple/circular-colored",
    title: "Colored",
    description: <>Alternate colors can be applied to <CodePill>v-progress-circular</CodePill> using the <CodePill>color</CodePill> prop.</>,
    render: () => <ColoredExample />,
  },
  {
    key: "simple/circular-indeterminate",
    title: "Indeterminate",
    description: <>Using the <CodePill>indeterminate</CodePill> prop, a <CodePill>v-progress-circular</CodePill> continues to animate indefinitely.</>,
    render: () => <IndeterminateExample />,
  },
  {
    key: "simple/circular-size-and-width",
    title: "Size & Width",
    description: <>The <CodePill>size</CodePill> and <CodePill>width</CodePill> props allow you to easily alter the size and width of the <CodePill>v-progress-circular</CodePill> component.</>,
    render: () => <SizeAndWidthExample />,
  },
  {
    key: "simple/circular-rotate",
    title: "Rotate",
    description: <>The <CodePill>rotate</CodePill> prop gives you the ability to customize the <CodePill>v-progress-circular</CodePill>'s origin.</>,
    render: () => <RotateExample />,
  },
] as const;

function ProgressCircularPage() {
  return (
    <DocPage
      title="ProgressCircular"
      namespace="Components"
      icon={<DonutLarge />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Circular Progress" },
      ]}
    >
      <DocText>The <CodePill>v-progress-circular</CodePill> component is used to convey data circularly to users. It also can be put into an indeterminate state to portray loading.</DocText>
      <Box component="section">
        <Typography component="h2" id="usage" sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400, mb: 2 }}>Usage</Typography>
        <VuetifyExampleBlock title="" source="usage" description="By default, progress circular uses the applications secondary color.">
          {() => <UsageExample />}
        </VuetifyExampleBlock>
      </Box>
      <Box component="section">
        <VuetifyExampleBlock title="" source="playground" description="">
          {() => <PlaygroundExample />}
        </VuetifyExampleBlock>
      </Box>
      {examples.map((example) => (
        <VuetifyExampleBlock key={example.key} title={example.title} description={example.description} source={example.key}>
          {example.render}
        </VuetifyExampleBlock>
      ))}
    </DocPage>
  );
}

const sourceTemplates = {
  usage: `<template>
  <div class="text-center">
    <v-progress-circular :value="20"></v-progress-circular>
    <v-progress-circular :value="40"></v-progress-circular>
    <v-progress-circular :value="60"></v-progress-circular>
    <v-progress-circular :value="80"></v-progress-circular>
    <v-progress-circular :value="100"></v-progress-circular>
  </div>
</template>`,
  playground: `<v-progress-circular
  :indeterminate="indeterminate"
  :rotate="rotate"
  :size="size"
  :value="value"
  :width="width"
  color="light-blue"
>{{ value }}</v-progress-circular>`,
  "simple/circular-colored": `<v-progress-circular :value="100" color="blue-grey"></v-progress-circular>
<v-progress-circular :value="80" color="deep-orange lighten-2"></v-progress-circular>
<v-progress-circular :value="60" color="brown"></v-progress-circular>
<v-progress-circular :value="40" color="lime"></v-progress-circular>
<v-progress-circular :value="20" color="indigo darken-2"></v-progress-circular>`,
  "simple/circular-indeterminate": `<v-progress-circular indeterminate color="primary"></v-progress-circular>
<v-progress-circular indeterminate color="red"></v-progress-circular>
<v-progress-circular indeterminate color="purple"></v-progress-circular>
<v-progress-circular indeterminate color="green"></v-progress-circular>
<v-progress-circular indeterminate color="amber"></v-progress-circular>`,
  "simple/circular-size-and-width": `<v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
<v-progress-circular :width="3" color="red" indeterminate></v-progress-circular>
<v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
<v-progress-circular :width="3" color="green" indeterminate></v-progress-circular>
<v-progress-circular :size="50" color="amber" indeterminate></v-progress-circular>`,
  "simple/circular-rotate": `<v-progress-circular :rotate="360" :size="100" :width="15" :value="value" color="teal">{{ value }}</v-progress-circular>
<v-progress-circular :rotate="-90" :size="100" :width="15" :value="value" color="primary">{{ value }}</v-progress-circular>
<v-progress-circular :rotate="90" :size="100" :width="15" :value="value" color="red">{{ value }}</v-progress-circular>
<v-progress-circular :rotate="180" :size="100" :width="15" :value="value" color="pink">{{ value }}</v-progress-circular>`,
};

export default ProgressCircularPage;
