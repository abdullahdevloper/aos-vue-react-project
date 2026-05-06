import { useMemo, useState } from "react";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton, Slider, Stack, Switch, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { ArrowForward, Favorite, InsertChartOutlined, Schedule } from "@mui/icons-material";
import ExampleBlock from "../../../components/docs/ExampleBlock";
import VuseSectionDefinition from "../../../components/layout/VuseSectionDefinition";

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];

export default function SparkLinePage() {
  return (
    <>
      <VuseSectionDefinition
        title="Sparklines"
        namespace="Components"
        icon={<InsertChartOutlined />}
        breadcrumbs={[
          { label: "Components", href: "/components/vuetify/api-explorer" },
          { label: "Vuetify", href: "/components/vuetify/api-explorer" },
          { label: "SparkLine" },
        ]}
      />
      <Box sx={{ mx: { xs: 0, md: 1.5 }, mb: 1.5 }}>
        <Typography variant="h5" color="text.primary" sx={{ fontSize: 22, fontWeight: 500, mb: 0.75 }}>
          Examples
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13.5 }}>
          Sparkline playground and card examples recreated from the Vuetify/Vuse demo composition.
        </Typography>
      </Box>
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <ExampleBlock title="Playground" source="sparklines/playground" height={460}>
            <SparklinePlayground />
          </ExampleBlock>
        </Grid>
        <Grid item xs={12}>
          <ExampleBlock title="Fill" source="sparklines/simple/fill" height={390}>
            <SparklineFill />
          </ExampleBlock>
        </Grid>
        <Grid item xs={12}>
          <ExampleBlock title="Heart Rate" source="sparklines/intermediate/heart-rate" height={300}>
            <HeartRateCard />
          </ExampleBlock>
        </Grid>
        <Grid item xs={12}>
          <ExampleBlock title="Dashboard Card" source="sparklines/intermediate/dashboard-card" height={330}>
            <DashboardSparkCard />
          </ExampleBlock>
        </Grid>
        <Grid item xs={12}>
          <ExampleBlock title="Sales Card" source="sparklines/intermediate/sales-card" height={350}>
            <SalesCard />
          </ExampleBlock>
        </Grid>
      </Grid>
    </>
  );
}

function SparklinePlayground() {
  const [type, setType] = useState<"trend" | "bar">("trend");
  const [gradient, setGradient] = useState(5);
  const [lineWidth, setLineWidth] = useState(2);
  const [radius, setRadius] = useState(10);
  const [padding, setPadding] = useState(8);
  const [fill, setFill] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const value = [0, 2, 5, 9, 5, 10, 3, 5, -4, -10, 1, 8, 2, 9, 0];

  return (
    <Stack spacing={2.5}>
      <Sparkline value={value} gradient={gradients[gradient]} type={type} fill={fill} lineWidth={lineWidth} padding={padding} radius={radius} showLabels={showLabels} height={160} />
      <Divider />
      <Grid container spacing={2.25} alignItems="center">
        <Grid item xs={12} md={4}>
          <ControlLabel label="Type" />
          <ToggleButtonGroup size="small" exclusive value={type} onChange={(_, next) => next && setType(next)}>
            <ToggleButton value="bar">bar</ToggleButton>
            <ToggleButton value="trend">trend</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12} md={4}>
          <ControlLabel label="Gradient" />
          <Swatches value={gradient} onChange={setGradient} />
        </Grid>
        <Grid item xs={12} md={4}>
          <ControlLabel label="Gradient direction" />
          <ToggleButtonGroup size="small" exclusive value="top">
            <ToggleButton value="top">top</ToggleButton>
            <ToggleButton value="right">right</ToggleButton>
            <ToggleButton value="left">left</ToggleButton>
            <ToggleButton value="bottom">bottom</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <SliderControl label="Line width" value={lineWidth} min={0.1} max={10} step={0.1} onChange={setLineWidth} />
        <SliderControl label="Radius" value={radius} min={0} max={16} onChange={setRadius} />
        <SliderControl label="Padding" value={padding} min={0} max={16} onChange={setPadding} />
        <Grid item xs={12} md={6}>
          <ControlLabel label="Linecap" />
          <ToggleButtonGroup size="small" exclusive value="round" disabled={type !== "trend"}>
            <ToggleButton value="butt">butt</ToggleButton>
            <ToggleButton value="round">round</ToggleButton>
            <ToggleButton value="square">square</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <SwitchLabel label="Show labels" checked={showLabels} onChange={setShowLabels} />
            <SwitchLabel label="Fill" checked={fill} onChange={setFill} disabled={type !== "trend"} />
            <SwitchLabel label="Auto-line-width" checked={false} disabled />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

function SparklineFill() {
  const [gradient, setGradient] = useState(4);
  const [width, setWidth] = useState(2);
  const [radius, setRadius] = useState(10);
  const [padding, setPadding] = useState(8);
  const [fill, setFill] = useState(true);
  const value = [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0];

  return (
    <Stack spacing={2.5}>
      <Sparkline value={value} gradient={gradients[gradient]} fill={fill} lineWidth={width} padding={padding} radius={radius} height={150} />
      <Divider />
      <Grid container spacing={2.25} alignItems="center">
        <Grid item xs={12} md={6}>
          <Swatches value={gradient} onChange={setGradient} />
        </Grid>
        <SliderControl label="Width" value={width} min={0.1} max={10} step={0.1} onChange={setWidth} />
        <Grid item xs={12} md={6}>
          <SwitchLabel label="Filled" checked={fill} onChange={setFill} />
        </Grid>
        <SliderControl label="Radius" value={radius} min={0} max={25} onChange={setRadius} />
        <Grid item xs={12} md={6} />
        <SliderControl label="Padding" value={padding} min={0} max={25} onChange={setPadding} />
      </Grid>
    </Stack>
  );
}

function HeartRateCard() {
  const [checking, setChecking] = useState(false);
  const [heartbeats, setHeartbeats] = useState(() => buildHeartbeats());
  const avg = Math.ceil(heartbeats.reduce((acc, value) => acc + value, 0) / heartbeats.length);

  const takePulse = () => {
    setChecking(true);
    setTimeout(() => {
      setHeartbeats(buildHeartbeats());
      setChecking(false);
    }, 350);
  };

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", bgcolor: "#f5f5f5", boxShadow: "none" }}>
      <CardHeader
        avatar={
          <IconButton onClick={takePulse} sx={{ color: checking ? "#ef5350" : "#3f51b5" }}>
            <Favorite sx={{ fontSize: 58 }} />
          </IconButton>
        }
        title={<Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase" }}>Heart rate</Typography>}
        subheader={<Box><Typography component="span" variant="h3" sx={{ fontWeight: 900 }}>{avg}</Typography><Typography component="strong" sx={{ ml: 1 }}>BPM</Typography></Box>}
        action={<IconButton><ArrowForward /></IconButton>}
      />
      <Box sx={{ px: 2, pb: 2 }}>
        <Sparkline value={heartbeats} gradient={gradients[5]} lineWidth={3} radius={16} height={96} />
      </Box>
    </Card>
  );
}

function DashboardSparkCard() {
  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 3, overflow: "visible" }}>
      <Box sx={{ width: "calc(100% - 32px)", mx: "auto", position: "relative", top: -24, bgcolor: "#00bcd4", boxShadow: 12, borderRadius: 1, p: 1 }}>
        <Sparkline value={[200, 675, 410, 390, 310, 460, 250, 240]} gradient={["#fff"]} lineWidth={2} padding={16} height={120} labels={["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"]} />
      </Box>
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="h6" sx={{ fontWeight: 300, mb: 1 }}>User Registrations</Typography>
        <Typography color="text.secondary" sx={{ mb: 1.5 }}>Last Campaign Performance</Typography>
        <Divider sx={{ my: 1 }} />
        <Stack direction="row" alignItems="center" spacing={1}>
          <Schedule fontSize="small" color="disabled" />
          <Typography variant="caption" color="text.secondary">last registration 26 minutes ago</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

function SalesCard() {
  return (
    <Card sx={{ maxWidth: 600, mx: "auto", textAlign: "center", bgcolor: "#4caf50", color: "#fff" }}>
      <CardContent>
        <Box sx={{ bgcolor: "rgba(0, 0, 0, .12)", p: 1 }}>
          <Sparkline value={[423, 446, 675, 510, 590, 610, 760]} gradient={["rgba(255, 255, 255, .7)"]} lineWidth={3} padding={24} height={120} showLabels labelPrefix="$" />
        </Box>
      </CardContent>
      <CardContent>
        <Typography variant="h4" sx={{ fontWeight: 200 }}>Sales Last 24h</Typography>
      </CardContent>
      <Divider sx={{ borderColor: "rgba(255, 255, 255, .24)" }} />
      <CardActions sx={{ justifyContent: "center" }}>
        <Button fullWidth sx={{ color: "#fff" }}>Go to Report</Button>
      </CardActions>
    </Card>
  );
}

interface SparklineProps {
  value: number[];
  gradient: string[];
  type?: "trend" | "bar";
  fill?: boolean;
  lineWidth?: number;
  padding?: number;
  radius?: number;
  height?: number;
  showLabels?: boolean;
  labels?: string[];
  labelPrefix?: string;
}

function Sparkline({ value, gradient, type = "trend", fill = false, lineWidth = 2, padding = 8, height = 140, showLabels = false, labels, labelPrefix = "" }: SparklineProps) {
  const width = 720;
  const chart = useMemo(() => buildSparkline(value, width, height, padding), [value, height, padding]);
  const gradientId = useMemo(() => `spark-${Math.random().toString(36).slice(2)}`, []);
  const stroke = gradient.length === 1 ? gradient[0] : `url(#${gradientId})`;

  return (
    <Box component="svg" viewBox={`0 0 ${width} ${height}`} sx={{ display: "block", width: "100%", height }}>
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
          {gradient.map((color, index) => (
            <stop key={color} offset={`${(index / Math.max(gradient.length - 1, 1)) * 100}%`} stopColor={color} />
          ))}
        </linearGradient>
      </defs>
      {type === "bar" ? (
        chart.points.map((point, index) => {
          const barWidth = Math.max(8, chart.step * 0.5);
          return <rect key={`${point.x}-${index}`} x={point.x - barWidth / 2} y={Math.min(point.y, chart.zeroY)} width={barWidth} height={Math.abs(chart.zeroY - point.y)} rx={3} fill={stroke} opacity={0.88} />;
        })
      ) : (
        <>
          {fill && <path d={`${chart.path} L ${chart.points[chart.points.length - 1]?.x ?? width - padding} ${height - padding} L ${padding} ${height - padding} Z`} fill={stroke} opacity={0.18} />}
          <path d={chart.path} fill="none" stroke={stroke} strokeWidth={lineWidth} strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {showLabels &&
        chart.points.map((point, index) => (
          <text key={`${point.x}-label-${index}`} x={point.x} y={Math.max(12, point.y - 8)} textAnchor="middle" fontSize="12" fill="currentColor" opacity="0.75">
            {labels?.[index] ?? `${labelPrefix}${value[index]}`}
          </text>
        ))}
    </Box>
  );
}

function buildSparkline(values: number[], width: number, height: number, padding: number) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = (width - padding * 2) / Math.max(values.length - 1, 1);
  const zeroY = height - padding - ((0 - min) / range) * (height - padding * 2);
  const points = values.map((value, index) => ({
    x: padding + index * step,
    y: height - padding - ((value - min) / range) * (height - padding * 2),
  }));
  return {
    step,
    zeroY: Number.isFinite(zeroY) ? zeroY : height - padding,
    points,
    path: points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" "),
  };
}

function Swatches({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {gradients.map((gradient, index) => (
        <Box
          key={gradient.join("-")}
          onClick={() => onChange(index)}
          sx={{
            width: 30,
            height: 30,
            border: "2px solid",
            borderColor: value === index ? "#222" : "#fff",
            bgcolor: gradient[0],
            background: gradient.length > 1 ? `linear-gradient(0deg, ${gradient.join(",")})` : gradient[0],
            cursor: "pointer",
          }}
        />
      ))}
    </Stack>
  );
}

function SliderControl({ label, value, min, max, step = 1, onChange }: { label: string; value: number; min: number; max: number; step?: number; onChange: (value: number) => void }) {
  return (
    <Grid item xs={12} md={6}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Slider value={value} min={min} max={max} step={step} valueLabelDisplay="auto" onChange={(_, next) => onChange(next as number)} />
    </Grid>
  );
}

function SwitchLabel({ label, checked, disabled, onChange }: { label: string; checked: boolean; disabled?: boolean; onChange?: (value: boolean) => void }) {
  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <Switch checked={checked} disabled={disabled} onChange={(event) => onChange?.(event.target.checked)} />
      <Typography variant="body2">{label}</Typography>
    </Stack>
  );
}

function ControlLabel({ label }: { label: string }) {
  return <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{label}</Typography>;
}

function buildHeartbeats() {
  return Array.from({ length: 20 }, (_, index) => 82 + ((index * 17 + 31) % 39));
}
