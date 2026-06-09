import "@mdi/font/css/materialdesignicons.css";
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import {
  Box,
  Card,
  Collapse,
  Divider,
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
  useTheme,
} from "@mui/material";
import { Code, GitHub, InsertChartOutlined, InvertColors } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];

const playgroundValue = [0, 2, 5, 9, 5, 10, 3, 5, -4, -10, 1, 8, 2, 9, 0];
const standardValue = [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0];
const dashboardLabels = ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"];
const dashboardValue = [200, 675, 410, 390, 310, 460, 250, 240];
const salesValue = [423, 446, 675, 510, 590, 610, 760];

export default function SparkLinePage() {
  return (
    <DocPage
      title="Sparklines"
      namespace="Components"
      icon={<InsertChartOutlined />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "SparkLine" },
      ]}
    >
      <DocText>
        The sparkline component can be used to create simple graphs, like GitHub&apos;s contribution chart.
        <br />
        <br />
        Any <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute">SVG attribute</a> may be used in addition to the ones listed below.
      </DocText>

      <Typography id="examples" color="text.primary" sx={{ fontSize: 24, lineHeight: 1.35, fontWeight: 500, mb: 1 }}>
        Examples
      </Typography>
      <Typography color="text.secondary" sx={{ fontSize: 18, fontWeight: 300, lineHeight: 1.65, mb: 3 }}>
        Below is a collection of simple to complex examples.
      </Typography>

      <SparklineExampleBlock
        title="Playground"
        source="playground"
        description={
          <>
            The sparkline component comes in 2 variations, <strong>trend</strong>(default) and <strong>bar</strong>. Each support a multitude of options for customizing the look and feel of the sparkline.
          </>
        }
      >
        <SparklinePlayground />
      </SparklineExampleBlock>

      <SparklineExampleBlock
        title="Fill"
        source="simple/fill"
        description={
          <>
            You can create a <CodePill>v-sparkline</CodePill> with fill using the <CodePill>fill</CodePill> property.
          </>
        }
      >
        <FillExample />
      </SparklineExampleBlock>

      <SparklineExampleBlock title="Take a break" source="intermediate/heart-rate" description="For concise information, a complete chart might be overkill. Using a trend line with gradient provides enough detail for the user without showing too much information.">
        <HeartRateExample />
      </SparklineExampleBlock>

      <SparklineExampleBlock
        title="Dashboard card"
        source="intermediate/dashboard-card"
        description={
          <>
            The <CodePill>v-sparkline</CodePill> component pairs nicely with <CodePill>v-card</CodePill> and <CodePill>v-sheet</CodePill> to create customized information cards, perfect for admin dashboards. Here we use custom labels to provide additional context for the sparkline.
          </>
        }
      >
        <DashboardCardExample />
      </SparklineExampleBlock>

      <SparklineExampleBlock
        title="Custom labels"
        source="intermediate/sales-card"
        description={
          <>
            By providing a <strong>label</strong> slot, we are able to modify the displayed content adding a dollar sign ($). This slot is <strong><em>exclusively</em></strong> for text content. For more information on the svg <CodePill>{"<text>"}</CodePill> element, <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text">navigate here</a>.
          </>
        }
      >
        <SalesCardExample />
      </SparklineExampleBlock>
    </DocPage>
  );
}

function SparklinePlayground() {
  const [showLabels, setShowLabels] = useState(false);
  const [lineWidth, setLineWidth] = useState(2);
  const [labelSize, setLabelSize] = useState(7);
  const [radius, setRadius] = useState(10);
  const [padding, setPadding] = useState(8);
  const [lineCap, setLineCap] = useState<"butt" | "round" | "square">("round");
  const [gradient, setGradient] = useState(gradients[5]);
  const [gradientDirection, setGradientDirection] = useState<GradientDirection>("top");
  const [fill, setFill] = useState(false);
  const [type, setType] = useState<SparklineType>("trend");
  const [autoLineWidth, setAutoLineWidth] = useState(false);

  return (
    <Box className="v-container v-container--fluid" sx={containerFluidSx}>
      <VSparkline value={playgroundValue} gradient={gradient} smooth={radius || false} padding={padding} lineWidth={lineWidth} strokeLinecap={lineCap} gradientDirection={gradientDirection} fill={fill} type={type} autoLineWidth={autoLineWidth} autoDraw showLabels={showLabels} labelSize={labelSize} />
      <VDivider />

      <Grid container sx={{ mt: 0 }}>
        <Grid item xs={12}>
          <ControlRow>
            <VSubheader>Type</VSubheader>
            <VBtnToggle value={type} onChange={(value) => setType(value as SparklineType)} options={["bar", "trend"]} />
          </ControlRow>
        </Grid>

        <Grid item xs={12} md={6}>
          <ControlRow>
            <VSubheader>Gradient</VSubheader>
            <GradientSwatches value={gradient} onChange={setGradient} />
          </ControlRow>
        </Grid>

        <Grid item xs={12} md={6}>
          <ControlRow>
            <VSubheader>Gradient direction</VSubheader>
            <VBtnToggle value={gradientDirection} onChange={(value) => setGradientDirection(value as GradientDirection)} options={["top", "right", "left", "bottom"]} />
          </ControlRow>
        </Grid>

        <Grid item xs={12}>
          <VSlider label="Line width" value={lineWidth} min={0.1} max={10} step={0.1} disabled={autoLineWidth} onChange={setLineWidth} />
        </Grid>
        <Grid item xs={12}>
          <VSlider label="Radius" value={radius} min={0} max={16} onChange={setRadius} />
        </Grid>
        <Grid item xs={12}>
          <VSlider label="Padding" value={padding} min={0} max={16} onChange={setPadding} />
        </Grid>

        <Grid item xs={12} md={6}>
          <ControlRow>
            <VSubheader>Linecap</VSubheader>
            <VBtnToggle value={lineCap} disabled={type !== "trend"} onChange={(value) => setLineCap(value as "butt" | "round" | "square")} options={["butt", "round", "square"]} />
          </ControlRow>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack direction="row" alignItems="center" justifyContent="space-around" flexWrap="wrap" sx={{ minHeight: 56 }}>
            <VSwitch checked={showLabels} label="Show labels" onChange={setShowLabels} />
            <VSwitch checked={fill} label="Fill" disabled={type !== "trend"} onChange={setFill} />
            <VSwitch checked={autoLineWidth} label="Auto-line-width" disabled={type !== "bar"} onChange={setAutoLineWidth} />
          </Stack>
        </Grid>

        {showLabels && (
          <Grid item xs={12}>
            <VSlider label="Label size" value={labelSize} min={1} max={20} onChange={setLabelSize} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

function FillExample() {
  const [fill, setFill] = useState(true);
  const [gradient, setGradient] = useState(gradients[4]);
  const [padding, setPadding] = useState(8);
  const [radius, setRadius] = useState(10);
  const [width, setWidth] = useState(2);

  return (
    <Box className="v-container v-container--fluid" sx={containerFluidSx}>
      <VSparkline fill={fill} gradient={gradient} lineWidth={width} padding={padding} smooth={radius || false} value={standardValue} autoDraw />
      <VDivider />

      <Grid container>
        <Grid item xs={12} md={6}>
          <ControlRow>
            <GradientSwatches value={gradient} onChange={setGradient} />
          </ControlRow>
        </Grid>

        <Grid item xs={12} md={6}>
          <VSlider label="Width" value={width} min={0.1} max={10} step={0.1} onChange={setWidth} />
        </Grid>

        <Grid item xs={6}>
          <ControlRow>
            <VSwitch checked={fill} label="Filled" onChange={setFill} />
          </ControlRow>
        </Grid>

        <Grid item xs={12} md={6}>
          <VSlider label="Radius" value={radius} min={0} max={25} onChange={setRadius} />
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }} />

        <Grid item xs={12} md={6}>
          <VSlider label="Padding" value={padding} min={0} max={25} onChange={setPadding} />
        </Grid>
      </Grid>
    </Box>
  );
}

function HeartRateExample() {
  const [checking, setChecking] = useState(false);
  const [heartbeats, setHeartbeats] = useState<number[]>([]);
  const avg = heartbeats.length ? Math.ceil(heartbeats.reduce((acc, cur) => acc + cur, 0) / heartbeats.length) : 0;

  useEffect(() => {
    takePulse(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function takePulse(inhale = true) {
    setChecking(true);
    if (inhale) await exhale(1000);
    setHeartbeats(Array.from({ length: 20 }, heartbeat));
    setChecking(false);
  }

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", bgcolor: "#f5f5f5", color: "rgba(0,0,0,.87)", borderRadius: 1, boxShadow: "none", backgroundImage: "none" }}>
      <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
        <MdiIcon icon="mdi-heart-pulse" onClick={() => takePulse(true)} sx={{ mr: 6, fontSize: 64, color: checking ? "#e57373" : "#3f51b5", cursor: "pointer" }} />
        <Grid container alignItems="flex-start" sx={{ width: "auto", flexGrow: 1 }}>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ fontSize: 12, color: "#9e9e9e", textTransform: "uppercase", lineHeight: 1.25 }}>Heart rate</Typography>
            <Box>
              <Typography component="span" sx={{ fontSize: 48, lineHeight: 1, fontWeight: 900, color: "rgba(0,0,0,.87)" }}>
                {avg || "-"}
              </Typography>
              {Boolean(avg) && <Box component="strong" sx={{ ml: 0.5 }}>BPM</Box>}
            </Box>
          </Box>
        </Grid>
        <Box component="button" aria-label="Next" sx={iconButtonSx}>
          <MdiIcon icon="mdi-arrow-right-thick" sx={{ fontSize: 24 }} />
        </Box>
      </Box>

      <Box sx={{ bgcolor: "transparent" }}>
        <VSparkline key={String(avg)} smooth={16} gradient={gradients[5]} lineWidth={3} value={heartbeats} autoDraw strokeLinecap="round" />
      </Box>
    </Card>
  );
}

function DashboardCardExample() {
  return (
    <Card sx={{ mt: 4, maxWidth: 400, mx: "auto", overflow: "visible", borderRadius: 1, backgroundImage: "none", bgcolor: "#fff", boxShadow: "0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)" }}>
      <Box sx={{ maxWidth: "calc(100% - 32px)", mx: "auto", top: -24, position: "relative", bgcolor: "#00bcd4", color: "#fff", boxShadow: "0 7px 8px -4px rgba(0,0,0,.2), 0 12px 17px 2px rgba(0,0,0,.14), 0 5px 22px 4px rgba(0,0,0,.12)", borderRadius: 1 }}>
        <VSparkline labels={dashboardLabels} value={dashboardValue} color="white" lineWidth={2} padding={16} />
      </Box>

      <Box sx={{ px: 2, pb: 2, pt: 0 }}>
        <Typography sx={{ fontSize: 20, lineHeight: 1.6, fontWeight: 300, mb: 1 }}>User Registrations</Typography>
        <Typography sx={{ fontSize: 16, lineHeight: 1.5, fontWeight: 300, color: "#9e9e9e" }}>Last Campaign Performance</Typography>
        <VDivider sx={{ my: 1 }} />
        <MdiIcon icon="mdi-clock" sx={{ mr: 1, fontSize: 16, color: "rgba(0,0,0,.54)" }} />
        <Typography component="span" sx={{ fontSize: 12, color: "#9e9e9e", fontWeight: 300 }}>last registration 26 minutes ago</Typography>
      </Box>
    </Card>
  );
}

function SalesCardExample() {
  return (
    <Card sx={{ maxWidth: 600, mx: "auto", textAlign: "center", bgcolor: "#4caf50", color: "#fff", borderRadius: 1, backgroundImage: "none", boxShadow: "0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)" }}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ bgcolor: "rgba(0, 0, 0, .12)" }}>
          <VSparkline value={salesValue} color="rgba(255, 255, 255, .7)" height={100} padding={24} strokeLinecap="round" smooth labelSlot={(item) => `$${item.value}`} />
        </Box>
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontSize: 34, lineHeight: 1.2, fontWeight: 100 }}>Sales Last 24h</Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,.2)" }} />

      <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
        <Box component="button" sx={{ width: "100%", minHeight: 36, border: 0, bgcolor: "transparent", color: "#fff", borderRadius: 1, fontSize: 14, textTransform: "uppercase", cursor: "pointer", "&:hover": { bgcolor: "rgba(255,255,255,.08)" } }}>
          Go to Report
        </Box>
      </Box>
    </Card>
  );
}

type SparklineType = "trend" | "bar";
type GradientDirection = "top" | "right" | "left" | "bottom";
type SparklineItem = number | string | { value: number | string };

type Point = {
  x: number;
  y: number;
  value: number;
};

type Bar = {
  x: number;
  y: number;
  height: number;
  value: number;
};

type Boundary = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

type LabelItem = {
  x: number;
  value: string;
};

interface VSparklineProps {
  autoDraw?: boolean;
  autoDrawDuration?: number;
  autoDrawEasing?: string;
  autoLineWidth?: boolean;
  color?: string;
  fill?: boolean;
  gradient?: string[];
  gradientDirection?: GradientDirection;
  height?: number | string;
  labels?: SparklineItem[];
  labelSize?: number | string;
  lineWidth?: number | string;
  padding?: number | string;
  showLabels?: boolean;
  smooth?: boolean | number | string;
  strokeLinecap?: "butt" | "round" | "square";
  type?: SparklineType;
  value: SparklineItem[];
  width?: number | string;
  labelSlot?: (item: { index: number; value: string }) => ReactNode;
}

function VSparkline({
  autoDraw = false,
  autoDrawDuration = 2000,
  autoDrawEasing = "ease",
  autoLineWidth = false,
  color = "primary",
  fill = false,
  gradient = [],
  gradientDirection = "top",
  height = 75,
  labels = [],
  labelSize = 7,
  lineWidth = 4,
  padding = 8,
  showLabels = false,
  smooth = false,
  strokeLinecap,
  type = "trend",
  value,
  width = 300,
  labelSlot,
}: VSparklineProps) {
  const theme = useTheme();
  const reactId = useId();
  const pathRef = useRef<SVGPathElement | null>(null);
  const lastLengthRef = useRef(0);
  const gradientId = `sparkline-${reactId.replace(/:/g, "")}`;
  const barClipId = `sparkline-bar-${gradientId}`;
  const normalizedValues = useMemo(() => value.map((item) => (typeof item === "number" ? item : typeof item === "string" ? Number(item) : Number(item.value))), [value]);
  const parsedPadding = Number(padding);
  const parsedWidth = Number(width);
  const parsedHeight = parseInt(String(height), 10);
  const parsedLabelSize = parseInt(String(labelSize), 10) || 7;
  const hasLabels = Boolean(showLabels || labels.length > 0 || labelSlot);
  const totalValues = value.length;
  const radius = smooth === true ? 8 : Number(smooth);
  const computedLineWidth = autoLineWidth && type !== "trend"
    ? (parsedWidth - parsedPadding * (totalValues + 1)) / totalValues
    : parseFloat(String(lineWidth)) || 4;
  const totalHeight = parsedHeight + (hasLabels ? parsedLabelSize * 1.5 : 0);
  const totalWidth = type === "bar" ? Math.max(value.length * computedLineWidth, parsedWidth) : parsedWidth;
  const boundary = type === "bar"
    ? { minX: 0, maxX: totalWidth, minY: 0, maxY: parsedHeight }
    : { minX: parsedPadding, maxX: totalWidth - parsedPadding, minY: parsedPadding, maxY: parsedHeight - parsedPadding };
  const points = useMemo(() => genPoints(normalizedValues, boundary), [normalizedValues, boundary.minX, boundary.maxX, boundary.minY, boundary.maxY]);
  const bars = useMemo(() => genBars(normalizedValues, boundary), [normalizedValues, boundary.minX, boundary.maxX, boundary.minY, boundary.maxY]);
  const parsedLabels = useMemo(() => {
    const source = type === "trend" ? points : bars;
    return source.map((item, index) => {
      const explicit = labels[index];
      const fallback = explicit == null ? item.value : typeof explicit === "number" || typeof explicit === "string" ? explicit : explicit.value;
      return { x: item.x, value: String(fallback) };
    });
  }, [bars, labels, points, type]);

  useEffect(() => {
    if (!autoDraw || type === "bar" || !pathRef.current) return;

    const path = pathRef.current;

    if (!fill) {
      const length = path.getTotalLength();
      path.style.transition = "none";
      path.style.strokeDasharray = `${length} ${length}`;
      path.style.strokeDashoffset = Math.abs(length - (lastLengthRef.current || 0)).toString();
      path.getBoundingClientRect();
      path.style.transition = `stroke-dashoffset ${autoDrawDuration}ms ${autoDrawEasing}`;
      path.style.strokeDashoffset = "0";
      lastLengthRef.current = length;
    } else {
      path.style.transformOrigin = "bottom center";
      path.style.transition = "none";
      path.style.transform = "scaleY(0)";
      path.getBoundingClientRect();
      path.style.transition = `transform ${autoDrawDuration}ms ${autoDrawEasing}`;
      path.style.transform = "scaleY(1)";
      lastLengthRef.current = path.getTotalLength();
    }
  }, [autoDraw, autoDrawDuration, autoDrawEasing, fill, normalizedValues, type]);

  if (totalValues < 2) return null;

  const gradientStops = gradient.length ? gradient.slice().reverse() : [""];
  const len = Math.max(gradientStops.length - 1, 1);
  const lineColor = resolveVuetifyColor(color, theme.palette.primary.main);
  const labelY = (type === "trend" ? parsedHeight - 4 : parsedHeight) + parsedLabelSize * 0.75;

  if (type === "bar") {
    const offsetX = bars.length > 1 ? (Math.abs(bars[0].x - bars[1].x) - computedLineWidth) / 2 : 0;
    const rounding = typeof smooth === "number" ? smooth : smooth ? 2 : 0;

    return (
      <Box component="svg" display="block" viewBox={`0 0 ${totalWidth} ${totalHeight}`} sx={sparkSvgSx}>
        <SparkGradient id={gradientId} gradient={gradientStops} len={len} direction={gradientDirection} />
        <clipPath id={`${barClipId}-clip`}>
          {bars.map((item, index) => (
            <rect key={`${item.x}-${index}`} x={item.x + offsetX} y={item.y} width={computedLineWidth} height={item.height} rx={rounding} ry={rounding}>
              {autoDraw && <animate attributeName="height" from="0" to={item.height} dur={`${autoDrawDuration}ms`} fill="freeze" />}
            </rect>
          ))}
        </clipPath>
        {hasLabels && <SparkLabels labels={parsedLabels} offsetX={offsetX} lineWidth={computedLineWidth} y={labelY} labelSize={parsedLabelSize} labelSlot={labelSlot} />}
        <g clipPath={`url(#${barClipId}-clip)`} fill={`url(#${gradientId})`}>
          <rect x="0" y="0" width={totalWidth} height={String(height)} />
        </g>
      </Box>
    );
  }

  const trendPath = genPath(points.map((point) => ({ ...point })), radius, fill, parsedHeight);

  return (
    <Box component="svg" display="block" strokeWidth={computedLineWidth || 1} viewBox={`0 0 ${width} ${totalHeight}`} sx={{ ...sparkSvgSx, color: lineColor }}>
      <SparkGradient id={gradientId} gradient={gradientStops} len={len} direction={gradientDirection} />
      {hasLabels && <SparkLabels labels={parsedLabels} offsetX={-(computedLineWidth / 2)} lineWidth={computedLineWidth} y={labelY} labelSize={parsedLabelSize} labelSlot={labelSlot} />}
      <path ref={pathRef} d={trendPath} fill={fill ? `url(#${gradientId})` : "none"} stroke={fill ? "none" : `url(#${gradientId})`} strokeLinecap={strokeLinecap} />
    </Box>
  );
}

function SparkGradient({ id, gradient, len, direction }: { id: string; gradient: string[]; len: number; direction: GradientDirection }) {
  return (
    <defs>
      <linearGradient id={id} x1={direction === "left" ? 1 : 0} y1={direction === "top" ? 1 : 0} x2={direction === "right" ? 1 : 0} y2={direction === "bottom" ? 1 : 0}>
        {gradient.map((color, index) => (
          <stop key={`${color || "current"}-${index}`} offset={index / len} stopColor={color || "currentColor"} />
        ))}
      </linearGradient>
    </defs>
  );
}

function SparkLabels({ labels, offsetX, lineWidth, y, labelSize, labelSlot }: { labels: LabelItem[]; offsetX: number; lineWidth: number; y: number; labelSize: number; labelSlot?: (item: { index: number; value: string }) => ReactNode }) {
  return (
    <g style={{ fontSize: 8, textAnchor: "middle", dominantBaseline: "mathematical", fill: "currentColor" }}>
      {labels.map((item, index) => (
        <text key={`${item.x}-${index}`} x={item.x + offsetX + lineWidth / 2} y={y} fontSize={labelSize}>
          {labelSlot ? labelSlot({ index, value: item.value }) : item.value}
        </text>
      ))}
    </g>
  );
}

function genPoints(values: number[], boundary: Boundary): Point[] {
  const { minX, maxX, minY, maxY } = boundary;
  const totalValues = values.length;
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const gridX = (maxX - minX) / (totalValues - 1);
  const gridY = (maxY - minY) / ((maxValue - minValue) || 1);

  return values.map((value, index) => ({
    x: minX + index * gridX,
    y: maxY - (value - minValue) * gridY + +(index === totalValues - 1) * 0.00001 - +(index === 0) * 0.00001,
    value,
  }));
}

function genBars(values: number[], boundary: Boundary): Bar[] {
  const { minX, maxX, minY, maxY } = boundary;
  const totalValues = values.length;
  let maxValue = Math.max(...values);
  let minValue = Math.min(...values);

  if (minValue > 0) minValue = 0;
  if (maxValue < 0) maxValue = 0;

  const gridX = maxX / totalValues;
  const gridY = (maxY - minY) / ((maxValue - minValue) || 1);
  const horizonY = maxY - Math.abs(minValue * gridY);

  return values.map((value, index) => {
    const height = Math.abs(gridY * value);
    return {
      x: minX + index * gridX,
      y: horizonY - height + +(value < 0) * height,
      height,
      value,
    };
  });
}

function genPath(points: Point[], radius: number, fill = false, height = 75) {
  const start = points.shift();
  if (!start) return "";
  const end = points[points.length - 1] || start;

  return (
    (fill ? `M${start.x} ${height - start.x + 2} L${start.x} ${start.y}` : `M${start.x} ${start.y}`) +
    points.map((point, index) => {
      const next = points[index + 1];
      const prev = points[index - 1] || start;
      const isCollinear = next && checkCollinear(next, point, prev);

      if (!next || isCollinear) return `L${point.x} ${point.y}`;

      const threshold = Math.min(getDistance(prev, point), getDistance(next, point));
      const radiusForPoint = threshold / 2 < radius ? threshold / 2 : radius;
      const before = moveTo(prev, point, radiusForPoint);
      const after = moveTo(next, point, radiusForPoint);

      return `L${before.x} ${before.y}S${point.x} ${point.y} ${after.x} ${after.y}`;
    }).join("") +
    (fill ? `L${end.x} ${height - start.x + 2} Z` : "")
  );
}

function checkCollinear(p0: Point, p1: Point, p2: Point) {
  return parseInt(String(p0.x + p2.x), 10) === parseInt(String(2 * p1.x), 10) && parseInt(String(p0.y + p2.y), 10) === parseInt(String(2 * p1.y), 10);
}

function getDistance(p1: Point, p2: Point) {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}

function moveTo(to: Point, from: Point, radius: number) {
  const vector = { x: to.x - from.x, y: to.y - from.y };
  const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  const unitVector = { x: vector.x / length, y: vector.y / length };

  return {
    x: from.x + unitVector.x * radius,
    y: from.y + unitVector.y * radius,
  };
}

function SparklineExampleBlock({ title, description, source, children }: { title: string; description: ReactNode; source: ExampleKey; children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const [expand, setExpand] = useState(false);

  return (
    <Card className="neu-glow-inset" sx={{ mb: 5, borderRadius: 1, bgcolor: "background.default", backgroundImage: "none", overflow: "hidden", boxShadow: neuInset }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
        <Typography sx={{ fontSize: 20, fontWeight: 400, lineHeight: "32px" }}>{title}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors" placement="bottom">
          <IconButton size="small" aria-label="Invert example colors" onClick={() => setDark((value) => !value)} sx={exampleActionSx(dark)}>
            <InvertColors sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="View on Github" placement="bottom">
          <IconButton size="small" aria-label="View on Github" sx={exampleActionSx(false)}>
            <GitHub sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="View source" placement="bottom">
          <IconButton size="small" aria-label="View source" onClick={() => setExpand((value) => !value)} sx={exampleActionSx(expand)}>
            <Code sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
      </Toolbar>

      <Collapse in={expand} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", overflowX: "auto", p: 2 }}>
          <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box>
        </Box>
      </Collapse>

      <Box sx={{ bgcolor: dark ? "#303030" : "transparent", color: dark ? "rgba(255,255,255,.92)" : "inherit", transition: "background-color .3s cubic-bezier(.25,.8,.5,1), color .3s cubic-bezier(.25,.8,.5,1)" }}>
        <Box sx={{ p: 2 }}>
          <DocText>{description}</DocText>
          <Box data-app="true">{children}</Box>
        </Box>
      </Box>
    </Card>
  );
}

type ExampleKey = "playground" | "simple/fill" | "intermediate/heart-rate" | "intermediate/dashboard-card" | "intermediate/sales-card";

function VSlider({ label, value, min, max, step = 1, disabled = false, onChange }: { label: string; value: number; min: number; max: number; step?: number; disabled?: boolean; onChange: (value: number) => void }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ minHeight: 56, px: 1.5 }}>
      <Typography sx={{ minWidth: 112, fontSize: 16, color: disabled ? "rgba(0,0,0,.38)" : "rgba(0,0,0,.6)" }}>{label}</Typography>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        valueLabelDisplay="auto"
        onChange={(_, next) => onChange(next as number)}
        sx={{
          color: "#0097a7",
          mx: 1,
          "& .MuiSlider-rail": { height: 2, opacity: 1, bgcolor: "rgba(0,0,0,.26)" },
          "& .MuiSlider-track": { height: 2, border: 0 },
          "& .MuiSlider-thumb": { width: 12, height: 12 },
          "& .MuiSlider-valueLabel": { bgcolor: "#0097a7", borderRadius: "50% 50% 50% 0", transform: "translateY(-100%) rotate(-45deg) scale(0)", "& span": { transform: "rotate(45deg)" } },
          "& .MuiSlider-thumb.Mui-active + .MuiSlider-valueLabel, & .MuiSlider-thumb:hover + .MuiSlider-valueLabel": { transform: "translateY(-100%) rotate(-45deg) scale(1)" },
        }}
      />
    </Stack>
  );
}

function VSwitch({ checked, label, disabled = false, onChange }: { checked: boolean; label: string; disabled?: boolean; onChange: (value: boolean) => void }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ mx: 1, minHeight: 48, opacity: disabled ? 0.45 : 1 }}>
      <Switch checked={checked} disabled={disabled} onChange={(event) => onChange(event.target.checked)} sx={switchSx} />
      <Typography sx={{ fontSize: 16 }}>{label}</Typography>
    </Stack>
  );
}

function VBtnToggle({ value, options, disabled = false, onChange }: { value: string; options: string[]; disabled?: boolean; onChange: (value: string) => void }) {
  return (
    <ToggleButtonGroup exclusive size="small" value={value} disabled={disabled} onChange={(_, next) => next && onChange(next)}>
      {options.map((option) => (
        <ToggleButton key={option} value={option} sx={toggleButtonSx}>
          {option}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

function GradientSwatches({ value, onChange }: { value: string[]; onChange: (value: string[]) => void }) {
  return (
    <Stack direction="row" flexWrap="wrap" sx={{ gap: 1 }}>
      {gradients.map((gradient, index) => {
        const active = gradient === value;
        return (
          <Box
            key={`${gradient.join("-")}-${index}`}
            component="button"
            aria-label={`Gradient ${index + 1}`}
            onClick={() => onChange(gradient)}
            sx={{
              width: 30,
              height: 30,
              border: "2px solid",
              borderColor: active ? "#222" : "#fff",
              background: gradient.length > 1 ? `linear-gradient(0deg, ${gradient.join(",")})` : gradient[0],
              cursor: "pointer",
              mr: 1,
              p: 0,
            }}
          />
        );
      })}
    </Stack>
  );
}

function ControlRow({ children }: { children: ReactNode }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ minHeight: 56, width: "100%" }}>
      {children}
    </Stack>
  );
}

function VSubheader({ children }: { children: ReactNode }) {
  return <Typography sx={{ pl: 0, pr: 2, minWidth: 96, color: "rgba(0,0,0,.54)", fontSize: 14, lineHeight: "48px" }}>{children}</Typography>;
}

function VDivider({ sx = {} }: { sx?: object }) {
  return <Divider sx={{ my: 2, borderColor: "rgba(0,0,0,.12)", ...sx }} />;
}

function MdiIcon({ icon, onClick, sx = {} }: { icon: string; onClick?: () => void; sx?: object }) {
  return <Box component="i" onClick={onClick} className={`mdi ${icon}`} sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", lineHeight: 1, verticalAlign: "middle", ...sx }} />;
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: 0.55, py: 0.18, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function heartbeat() {
  return Math.ceil(Math.random() * (120 - 80) + 80);
}

function exhale(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function resolveVuetifyColor(color: string, primary: string) {
  switch (color) {
    case "primary": return primary;
    case "white": return "#fff";
    case "cyan": return "#00bcd4";
    case "green": return "#4caf50";
    default: return color;
  }
}

const containerFluidSx = {
  width: "100%",
  mx: "auto",
  px: { xs: 0, sm: 3 },
};

const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";

const sparkSvgSx = {
  display: "block",
  width: "100%",
  maxWidth: "100%",
  overflow: "hidden",
};

const iconButtonSx = {
  alignSelf: "flex-start",
  width: 28,
  height: 28,
  minWidth: 28,
  border: 0,
  borderRadius: "50%",
  bgcolor: "transparent",
  color: "rgba(0,0,0,.54)",
  cursor: "pointer",
  p: 0,
  display: "grid",
  placeItems: "center",
  "&:hover": { bgcolor: "rgba(0,0,0,.04)" },
};

const toggleButtonSx = {
  minWidth: 44,
  height: 30,
  px: 1.25,
  border: 0,
  borderRadius: 1,
  color: "rgba(0,0,0,.87)",
  fontSize: 13,
  textTransform: "uppercase",
  "&.Mui-selected": {
    bgcolor: "rgba(0,0,0,.08)",
    color: "rgba(0,0,0,.87)",
  },
  "&.Mui-disabled": {
    color: "rgba(0,0,0,.26)",
  },
};

const switchSx = {
  width: 46,
  height: 30,
  p: 0,
  mr: 1,
  "& .MuiSwitch-switchBase": {
    p: 0,
    top: 3,
    left: 3,
    color: "#fff",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        bgcolor: "#0097a7",
        opacity: 1,
      },
    },
  },
  "& .MuiSwitch-thumb": { width: 24, height: 24, boxShadow: "0 2px 4px rgba(0,0,0,.2)" },
  "& .MuiSwitch-track": { borderRadius: 15, bgcolor: "rgba(0,0,0,.26)", opacity: 1 },
};

function exampleActionSx(active: boolean) {
  return {
    width: 28,
    height: 28,
    mx: 0.15,
    color: active ? "primary.main" : "text.secondary",
    bgcolor: "transparent",
    opacity: active ? 0.78 : 0.56,
    "&:hover": { bgcolor: "rgba(0,0,0,.04)" },
  };
}

const sourceTemplates: Record<ExampleKey, string> = {
  playground: `<v-container fluid>
  <v-sparkline
    :value="value"
    :gradient="gradient"
    :smooth="radius || false"
    :padding="padding"
    :line-width="lineWidth"
    :stroke-linecap="lineCap"
    :gradient-direction="gradientDirection"
    :fill="fill"
    :type="type"
    :auto-line-width="autoLineWidth"
    auto-draw
    :show-labels="showLabels"
    :label-size="labelSize"
  ></v-sparkline>
</v-container>`,
  "simple/fill": `<v-container fluid>
  <v-sparkline
    :fill="fill"
    :gradient="gradient"
    :line-width="width"
    :padding="padding"
    :smooth="radius || false"
    :value="value"
    auto-draw
  ></v-sparkline>
</v-container>`,
  "intermediate/heart-rate": `<v-card class="mx-auto" color="grey lighten-4" max-width="600">
  <v-card-title>
    <v-icon :color="checking ? 'red lighten-2' : 'indigo'" class="mr-12" size="64" @click="takePulse">
      mdi-heart-pulse
    </v-icon>
  </v-card-title>
  <v-sheet color="transparent">
    <v-sparkline :key="String(avg)" :smooth="16" :gradient="['#f72047', '#ffd200', '#1feaea']" :line-width="3" :value="heartbeats" auto-draw stroke-linecap="round"></v-sparkline>
  </v-sheet>
</v-card>`,
  "intermediate/dashboard-card": `<v-card class="mt-4 mx-auto" max-width="400">
  <v-sheet class="v-sheet--offset mx-auto" color="cyan" elevation="12" max-width="calc(100% - 32px)">
    <v-sparkline :labels="labels" :value="value" color="white" line-width="2" padding="16"></v-sparkline>
  </v-sheet>
</v-card>`,
  "intermediate/sales-card": `<v-card class="mx-auto text-center" color="green" dark max-width="600">
  <v-card-text>
    <v-sheet color="rgba(0, 0, 0, .12)">
      <v-sparkline :value="value" color="rgba(255, 255, 255, .7)" height="100" padding="24" stroke-linecap="round" smooth>
        <template v-slot:label="item"> $\{{ item.value }} </template>
      </v-sparkline>
    </v-sheet>
  </v-card-text>
</v-card>`,
};
