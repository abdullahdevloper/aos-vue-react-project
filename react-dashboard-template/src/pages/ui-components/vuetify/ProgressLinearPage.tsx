import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Box,
  Button,
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
import {
  Add,
  ArrowBack,
  ChangeHistory,
  Code,
  CropSquare,
  GitHub,
  InvertColors,
  LinearScale,
  Menu,
  MoreVert,
  RadioButtonUnchecked,
  Search,
  Share,
} from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const secondary = "#ffa726";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const progressTransition = ".2s cubic-bezier(.4,0,.2,1)";
const stripeGradient = "linear-gradient(135deg, hsla(0,0%,100%,.25) 25%, transparent 0, transparent 50%, hsla(0,0%,100%,.25) 0, hsla(0,0%,100%,.25) 75%, transparent 0, transparent)";

type ExampleKey = keyof typeof sourceTemplates;

function colorValue(color?: string) {
  switch (color) {
    case "primary":
      return primary;
    case "secondary":
      return secondary;
    case "light-blue":
      return "#03a9f4";
    case "deep-purple accent-4":
      return "#6200ea";
    case "deep-purple":
      return "#673ab7";
    case "pink":
      return "#e91e63";
    case "pink lighten-1":
      return "#ec407a";
    case "pink lighten-3":
      return "#f48fb1";
    case "indigo":
      return "#3f51b5";
    case "indigo darken-2":
      return "#303f9f";
    case "amber":
      return "#ffc107";
    case "yellow darken-2":
      return "#fbc02d";
    case "green":
      return "#4caf50";
    case "teal":
      return "#009688";
    case "cyan":
      return "#00bcd4";
    case "cyan darken-2":
      return "#0097a7";
    case "purple":
      return "#9c27b0";
    case "red lighten-2":
      return "#e57373";
    case "red darken-2":
      return "#d32f2f";
    case "black":
      return "#000";
    case "blue-grey":
      return "#607d8b";
    case "lime":
      return "#cddc39";
    case "success":
      return "#4caf50";
    case "error":
      return "#ff5252";
    case "light-green darken-4":
      return "#33691e";
    case "deep-orange":
      return "#ff5722";
    case "orange":
      return "#ff9800";
    default:
      return primary;
  }
}

function normalize(value: number | string) {
  const number = parseFloat(String(value));
  if (number < 0) return 0;
  if (number > 100) return 100;
  return Number.isNaN(number) ? 0 : number;
}

function VProgressLinear({
  active = true,
  backgroundColor = null,
  backgroundOpacity = null,
  bufferValue = 100,
  color = "primary",
  height = 4,
  indeterminate = false,
  query = false,
  rounded = false,
  stream = false,
  striped = false,
  top = false,
  bottom = false,
  absolute = false,
  value = 0,
  children,
  reactive = false,
  onChange,
}: {
  active?: boolean;
  backgroundColor?: string | null;
  backgroundOpacity?: number | string | null;
  bufferValue?: number | string;
  color?: string;
  height?: number | string;
  indeterminate?: boolean;
  query?: boolean;
  rounded?: boolean;
  stream?: boolean;
  striped?: boolean;
  top?: boolean;
  bottom?: boolean;
  absolute?: boolean;
  value?: number | string;
  children?: ReactNode | ((value: number) => ReactNode);
  reactive?: boolean;
  onChange?: (value: number) => void;
}) {
  const normalizedValue = normalize(value);
  const normalizedBuffer = normalize(bufferValue);
  const numericHeight = Number(height);
  const progressColor = colorValue(color);
  const background = colorValue(backgroundColor || color);
  const opacity = backgroundOpacity == null ? (backgroundColor ? 1 : 0.3) : parseFloat(String(backgroundOpacity));
  const backgroundWidth = Math.max(0, normalizedBuffer - normalizedValue);

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    if (!reactive || !onChange) return;
    const rect = event.currentTarget.getBoundingClientRect();
    onChange(((event.clientX - rect.left) / rect.width) * 100);
  }

  return (
    <Box
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={normalizedBuffer}
      aria-valuenow={indeterminate ? undefined : normalizedValue}
      onClick={handleClick}
      className="v-progress-linear"
      sx={{
        background: "transparent",
        overflow: "hidden",
        position: absolute ? "absolute" : "relative",
        transition: progressTransition,
        width: "100%",
        height: active ? numericHeight : 0,
        top: top ? 0 : undefined,
        bottom: bottom ? 0 : undefined,
        left: absolute ? 0 : undefined,
        zIndex: absolute ? 1 : undefined,
        borderRadius: rounded ? "4px" : 0,
        "@keyframes indeterminate-ltr": {
          "0%": { left: "-90%", right: "100%" },
          "60%": { left: "-90%", right: "100%" },
          "100%": { left: "100%", right: "-35%" },
        },
        "@keyframes indeterminate-short-ltr": {
          "0%": { left: "-200%", right: "100%" },
          "60%": { left: "107%", right: "-8%" },
          "100%": { left: "107%", right: "-8%" },
        },
        "@keyframes query-ltr": {
          "0%": { right: "-90%", left: "100%" },
          "60%": { right: "-90%", left: "100%" },
          "100%": { right: "100%", left: "-35%" },
        },
        "@keyframes query-short-ltr": {
          "0%": { right: "-200%", left: "100%" },
          "60%": { right: "107%", left: "-8%" },
          "100%": { right: "107%", left: "-8%" },
        },
        "@keyframes stream-ltr": {
          to: { transform: "translateX(-8px)" },
        },
      }}
    >
      {stream && (
        <Box
          className="v-progress-linear__stream"
          sx={{
            animation: "stream-ltr .25s infinite linear",
            borderColor: progressColor,
            borderTop: "4px dotted",
            bottom: 0,
            left: "auto",
            right: -8,
            opacity: 0.3,
            pointerEvents: "none",
            position: "absolute",
            top: "calc(50% - 2px)",
            transition: "inherit",
            width: `${100 - normalizedBuffer}%`,
          }}
        />
      )}
      <Box
        className="v-progress-linear__background"
        sx={{
          bgcolor: background,
          bottom: 0,
          left: `${normalizedValue}%`,
          position: "absolute",
          top: 0,
          transition: "inherit",
          opacity,
          width: `${backgroundWidth}%`,
        }}
      />
      <Box
        className="v-progress-linear__buffer"
        sx={{
          height: "inherit",
          left: 0,
          position: "absolute",
          top: 0,
          transition: "inherit",
          width: !indeterminate && normalizedBuffer !== 100 ? `${normalizedBuffer}%` : "100%",
          zIndex: 1,
        }}
      />
      {indeterminate ? (
        <Box className={`v-progress-linear__indeterminate${active ? " v-progress-linear__indeterminate--active" : ""}`} sx={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Box
            className="v-progress-linear__indeterminate long"
            sx={{
              bgcolor: progressColor,
              bottom: 0,
              height: "inherit",
              left: 0,
              position: "absolute",
              top: 0,
              width: "auto",
              willChange: "left, right",
              animation: active ? `${query ? "query-ltr" : "indeterminate-ltr"} ${query ? "2s" : "2.2s"} infinite` : "none",
            }}
          />
          <Box
            className="v-progress-linear__indeterminate short"
            sx={{
              bgcolor: progressColor,
              bottom: 0,
              height: "inherit",
              left: 0,
              position: "absolute",
              top: 0,
              width: "auto",
              willChange: "left, right",
              animation: active ? `${query ? "query-short-ltr" : "indeterminate-short-ltr"} ${query ? "2s" : "2.2s"} infinite` : "none",
            }}
          />
        </Box>
      ) : (
        <Box
          className="v-progress-linear__determinate"
          sx={{
            height: "inherit",
            left: 0,
            position: "absolute",
            transition: "inherit",
            bgcolor: progressColor,
            width: `${normalizedValue}%`,
            backgroundImage: striped ? stripeGradient : undefined,
            backgroundSize: striped ? "40px 40px" : undefined,
            backgroundRepeat: striped ? "repeat" : undefined,
            zIndex: 1,
          }}
        />
      )}
      {children && (
        <Box
          className="v-progress-linear__content"
          sx={{
            alignItems: "center",
            display: "flex",
            height: "100%",
            left: 0,
            justifyContent: "center",
            position: "absolute",
            top: 0,
            width: "100%",
            zIndex: 2,
            pointerEvents: reactive ? "none" : "auto",
          }}
        >
          {typeof children === "function" ? children(normalizedValue) : children}
        </Box>
      )}
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

function UsageExample() {
  return <VProgressLinear value={15} />;
}

function VContainer({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        width: "100%",
        px: "12px",
        mx: "auto",
        maxWidth: { xs: "100%", md: 900, lg: 1185, xl: 1785 },
      }}
    >
      {children}
    </Box>
  );
}

function PlaygroundExample() {
  const [active, setActive] = useState(true);
  const [opacity, setOpacity] = useState(0.3);
  const [bottom, setBottom] = useState(false);
  const [buffer, setBuffer] = useState(100);
  const [height, setHeight] = useState(4);
  const [indeterminate, setIndeterminate] = useState(false);
  const [query, setQuery] = useState(false);
  const [rounded, setRounded] = useState(false);
  const [stream, setStream] = useState(false);
  const [striped, setStriped] = useState(false);
  const [top, setTop] = useState(false);
  const [value, setValue] = useState(25);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", mx: -1.5 }}>
      <VContainer>
        <VProgressLinear active={active} backgroundOpacity={opacity} bottom={bottom} bufferValue={buffer} height={height} indeterminate={indeterminate} query={query} rounded={rounded} stream={stream} striped={striped} top={top} value={value} color="light-blue" />
      </VContainer>
      <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%", mt: 3 }}>
        <PlaygroundField label="Buffer" value={buffer} onChange={setBuffer} />
        <PlaygroundField label="Height - px" value={height} onChange={setHeight} />
        <PlaygroundField label="Opacity" value={opacity} step={0.01} onChange={setOpacity} />
        <PlaygroundField label="Value - %" value={value} onChange={setValue} />
        <PlaygroundSwitch label="Toggle active" checked={active} onChange={setActive} />
        <PlaygroundSwitch label="Toggle bottom" checked={bottom} onChange={setBottom} />
        <PlaygroundSwitch label="Toggle indeterminate" checked={indeterminate} onChange={setIndeterminate} />
        <PlaygroundSwitch label="Toggle query" checked={query} onChange={setQuery} />
        <PlaygroundSwitch label="Toggle rounded" checked={rounded} onChange={setRounded} />
        <PlaygroundSwitch label="Toggle stream" checked={stream} onChange={setStream} />
        <PlaygroundSwitch label="Toggle striped" checked={striped} onChange={setStriped} />
        <PlaygroundSwitch label="Toggle top" checked={top} onChange={setTop} />
      </Box>
    </Box>
  );
}

function PlaygroundField({ label, value, step = 1, onChange }: { label: string; value: number; step?: number; onChange: (value: number) => void }) {
  return (
    <Box sx={{ flex: { xs: "0 0 100%", md: "0 0 50%", lg: "0 0 25%" }, maxWidth: { xs: "100%", md: "50%", lg: "25%" }, px: 1.5 }}>
      <TextField variant="standard" type="number" label={label} value={value} onChange={(event) => onChange(Number(event.target.value))} inputProps={{ min: 0, max: label === "Opacity" ? 1 : 100, step }} sx={{ width: 125, mx: 4 }} />
    </Box>
  );
}

function PlaygroundSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <Box sx={{ flex: { xs: "0 0 50%", md: "0 0 25%" }, maxWidth: { xs: "50%", md: "25%" }, px: 1.5 }}>
      <FormControlLabel sx={{ mx: 4 }} control={<Switch checked={checked} onChange={(event) => onChange(event.target.checked)} sx={switchSx} />} label={label} />
    </Box>
  );
}

const switchSx = {
  "& .MuiSwitch-switchBase.Mui-checked": { color: primary },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: primary },
};

function DeterminateExample() {
  return (
    <Box>
      <VProgressLinear value={50} color="deep-purple accent-4" />
      <br />
      <VProgressLinear value={50} color="pink" />
      <br />
      <VProgressLinear value={50} color="indigo darken-2" />
      <br />
      <VProgressLinear value={50} color="amber" />
    </Box>
  );
}

function IndeterminateExample() {
  return (
    <Box>
      <VProgressLinear indeterminate color="yellow darken-2" />
      <br />
      <VProgressLinear indeterminate color="green" />
      <br />
      <VProgressLinear indeterminate color="teal" />
      <br />
      <VProgressLinear indeterminate color="cyan" />
    </Box>
  );
}

function BufferExample() {
  const [value, setValue] = useState(10);
  const [bufferValue, setBufferValue] = useState(20);
  const intervalRef = useRef<number | null>(null);
  const valueRef = useRef(10);
  const bufferRef = useRef(20);

  useEffect(() => {
    function startBuffer() {
      if (intervalRef.current != null) window.clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => {
        const nextValue = valueRef.current + Math.random() * (15 - 5) + 5;
        const nextBufferValue = bufferRef.current + Math.random() * (15 - 5) + 6;

        if (nextValue >= 100) {
          valueRef.current = 0;
          bufferRef.current = 10;
          setValue(0);
          setBufferValue(10);
          startBuffer();
          return;
        }

        valueRef.current = nextValue;
        bufferRef.current = nextBufferValue;
        setValue(valueRef.current);
        setBufferValue(bufferRef.current);
      }, 2000);
    }
    startBuffer();
    return () => {
      if (intervalRef.current != null) window.clearInterval(intervalRef.current);
    };
  }, []);
  return (
    <Box>
      <VProgressLinear value={value} bufferValue={bufferValue} />
      <br />
      <VProgressLinear value={value} bufferValue={bufferValue} color="purple" />
      <br />
      <VProgressLinear value={value} bufferValue={bufferValue} color="red lighten-2" />
      <br />
      <VProgressLinear value={value} bufferValue={bufferValue} color="black" />
    </Box>
  );
}

function QueryExample() {
  const [value, setValue] = useState(0);
  const [query, setQuery] = useState(false);
  const [show, setShow] = useState(true);
  const intervalRef = useRef<number | null>(null);
  const queryTimerRef = useRef<number | null>(null);
  const restartTimerRef = useRef<number | null>(null);
  const valueRef = useRef(0);

  useEffect(() => {
    let alive = true;

    function clearTimers() {
      if (intervalRef.current != null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (queryTimerRef.current != null) {
        window.clearTimeout(queryTimerRef.current);
        queryTimerRef.current = null;
      }
      if (restartTimerRef.current != null) {
        window.clearTimeout(restartTimerRef.current);
        restartTimerRef.current = null;
      }
    }

    function run() {
      if (!alive) return;
      clearTimers();
      setQuery(true);
      setShow(true);
      setValue(0);
      valueRef.current = 0;
      queryTimerRef.current = window.setTimeout(() => {
        if (!alive) return;
        setQuery(false);
        intervalRef.current = window.setInterval(() => {
          if (!alive) return;
          if (valueRef.current === 100) {
            if (intervalRef.current != null) {
              window.clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            setShow(false);
            restartTimerRef.current = window.setTimeout(run, 2000);
            return;
          }
          valueRef.current += 25;
          setValue(valueRef.current);
        }, 1000);
      }, 2500);
    }
    run();
    return () => {
      alive = false;
      clearTimers();
    };
  }, []);
  return <Box sx={{ minHeight: 4 }}><VProgressLinear value={value} active={show} indeterminate={query} query /></Box>;
}

function CustomColorsExample() {
  return (
    <Box>
      <VProgressLinear backgroundColor="pink lighten-3" color="pink lighten-1" value={15} />
      <br />
      <VProgressLinear backgroundColor="blue-grey" color="lime" value={30} />
      <br />
      <VProgressLinear backgroundColor="success" color="error" value={45} />
    </Box>
  );
}

function RoundedExample() {
  return (
    <Box>
      <VProgressLinear color="red darken-2" rounded value={100} />
      <br />
      <VProgressLinear color="indigo" rounded value={100} />
      <br />
      <VProgressLinear color="teal" rounded value={100} />
      <br />
      <VProgressLinear color="cyan darken-2" rounded value={100} />
    </Box>
  );
}

function StreamExample() {
  return (
    <Box>
      <VProgressLinear color="red lighten-2" bufferValue={0} stream />
      <br />
      <VProgressLinear color="teal" bufferValue={0} value={20} stream />
      <br />
      <VProgressLinear bufferValue={50} stream color="cyan" />
      <br />
      <VProgressLinear bufferValue={60} value={40} stream color="orange" />
    </Box>
  );
}

function StripedExample() {
  return (
    <Box>
      <VProgressLinear color="light-blue" height={10} value={10} striped />
      <br />
      <VProgressLinear color="light-green darken-4" height={10} value={20} striped />
      <br />
      <VProgressLinear height={10} value={45} striped color="lime" />
      <br />
      <VProgressLinear value={60} height={10} striped color="deep-orange" />
    </Box>
  );
}

function ToolbarLoaderExample() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!loading) return undefined;
    const timeout = window.setTimeout(() => setLoading(false), 3000);
    return () => window.clearTimeout(timeout);
  }, [loading]);
  return (
    <Card sx={{ mx: "auto", mt: 6, width: 344, borderRadius: "4px", overflow: "hidden", boxShadow: "0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px rgba(0,0,0,.14), 0 1px 3px rgba(0,0,0,.12)" }}>
      <Box sx={{ height: 24, display: "flex", alignItems: "center", px: 2, bgcolor: "#f5f5f5", color: "rgba(0,0,0,.54)" }}>
        <Box sx={{ flexGrow: 1 }} />
        <CropSquare sx={{ fontSize: 16 }} />
        <RadioButtonUnchecked sx={{ fontSize: 16, ml: 1 }} />
        <ChangeHistory sx={{ fontSize: 16, ml: 1 }} />
      </Box>
      <Toolbar sx={{ minHeight: "64px !important", position: "relative", px: 1 }}>
        <IconButton><ArrowBack /></IconButton>
        <Typography sx={{ fontSize: 20, fontWeight: 400, ml: 1 }}>My Recipes</Typography>
        <VProgressLinear active={loading} indeterminate={loading} absolute bottom color="deep-purple accent-4" />
        <Box sx={{ flexGrow: 1 }} />
        <IconButton><Search /></IconButton>
        <IconButton><MoreVert /></IconButton>
      </Toolbar>
      <Box sx={{ height: 282, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {!loading && <Button variant="contained" onClick={() => setLoading(true)} sx={{ bgcolor: primary, "&:hover": { bgcolor: "#00838f" } }}>Start loading</Button>}
      </Box>
    </Card>
  );
}

function FileLoaderExample() {
  return (
    <Card sx={{ mx: "auto", maxWidth: 344, borderRadius: "4px", overflow: "hidden", boxShadow: "0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px rgba(0,0,0,.14), 0 1px 3px rgba(0,0,0,.12)" }}>
      <Toolbar sx={{ minHeight: "128px !important", alignItems: "flex-start", position: "relative", bgcolor: "#6200ea", color: "#fff", px: 1, pt: 1 }}>
        <IconButton sx={{ color: "#fff" }}><Menu /></IconButton>
        <Typography sx={{ fontSize: 20, fontWeight: 400, mt: 1, ml: 1 }}>My Files</Typography>
        <IconButton sx={{ position: "absolute", left: 16, bottom: -28, width: 56, height: 56, bgcolor: "#fff", color: "rgba(0,0,0,.87)", boxShadow: "0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px rgba(0,0,0,.14),0 1px 18px rgba(0,0,0,.12)", "&:hover": { bgcolor: "#fff" } }}><Add /></IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton sx={{ color: "#fff" }}><Share /></IconButton>
        <IconButton sx={{ color: "#fff" }}><Search /></IconButton>
        <IconButton sx={{ color: "#fff" }}><MoreVert /></IconButton>
      </Toolbar>
      <Box sx={{ height: 400, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", px: 3 }}>
        <Typography sx={{ fontSize: 16, width: "100%", textAlign: "center", mb: 2 }}>Getting your files</Typography>
        <Box sx={{ width: "50%" }}>
          <VProgressLinear color="deep-purple accent-4" indeterminate rounded height={6} />
        </Box>
      </Box>
    </Card>
  );
}

function SlotExample() {
  const [power, setPower] = useState(78);
  const [skill, setSkill] = useState(20);
  const [knowledge, setKnowledge] = useState(33);
  return (
    <Box>
      <VProgressLinear value={power} color="amber" height={25} reactive onChange={setPower} />
      <br />
      <VProgressLinear value={skill} color="blue-grey" height={25} reactive onChange={setSkill}>
        {(value) => <strong>{Math.ceil(value)}%</strong>}
      </VProgressLinear>
      <br />
      <VProgressLinear value={knowledge} height={25} reactive onChange={setKnowledge}>
        <strong>{Math.ceil(knowledge)}%</strong>
      </VProgressLinear>
    </Box>
  );
}

const examples = [
  { key: "simple/linear-determinate", title: "Determinate", description: <>The progress linear component can have a determinate state modified by <CodePill>v-model</CodePill>.</>, render: () => <DeterminateExample /> },
  { key: "simple/linear-indeterminate", title: "Indeterminate", description: <>Using the <CodePill>indeterminate</CodePill> prop, <CodePill>v-progress-linear</CodePill> continuously animates.</>, render: () => <IndeterminateExample /> },
  { key: "simple/linear-buffer", title: "Buffer", description: <>A buffer state represents two values simultaneously. The primary value is controlled by <CodePill>v-model</CodePill>, whereas the buffer is controlled by the <CodePill>buffer-value</CodePill> prop.</>, render: () => <BufferExample /> },
  { key: "simple/linear-query-indeterminate-and-determinate", title: "Query Indeterminate and Determinate", description: <>The <CodePill>query</CodePill> state is controlled by the truthiness of indeterminate, while the <CodePill>query</CodePill> prop set to true.</>, render: () => <QueryExample /> },
  { key: "simple/linear-custom-colors", title: "Custom colors", description: <>You can also set the color using the props <CodePill>color</CodePill> and <CodePill>background-color</CodePill>.</>, render: () => <CustomColorsExample /> },
  { key: "simple/rounded", title: "Rounded", description: <>The <CodePill>rounded</CodePill> prop is an alternative style that adds a border radius to the <CodePill>v-progress-linear</CodePill> component.</>, render: () => <RoundedExample /> },
  { key: "simple/stream", title: "Stream", description: <>The <CodePill>stream</CodePill> property works with <CodePill>buffer-value</CodePill> to convey to the user that there is some action taking place. You can use any combination of <CodePill>buffer-value</CodePill> and <CodePill>value</CodePill> to achieve your design.</>, render: () => <StreamExample /> },
  { key: "simple/striped", title: "Striped", description: <>This applies a striped background over the value portion of the <CodePill>v-progress-linear</CodePill>.</>, render: () => <StripedExample /> },
  { key: "intermediate/loader", title: "Toolbar loader", description: <>Using the <CodePill>absolute</CodePill> prop we are able to position the <CodePill>v-progress-linear</CodePill> component at the bottom of the <CodePill>v-toolbar</CodePill>. We also use the <CodePill>active</CodePill> prop which allows us to control the visibility of the progress.</>, render: () => <ToolbarLoaderExample /> },
  { key: "intermediate/file-loader", title: "File loader", description: <>The <CodePill>v-progress-linear</CodePill> component is good for translating to the user that they are waiting for a response.</>, render: () => <FileLoaderExample /> },
  { key: "intermediate/slot", title: "Slots", description: <>The <CodePill>v-progress-linear</CodePill> component will be responsive to user input when using <CodePill>v-model</CodePill>. You can use the default slot or bind a local model to display inside of the progress. If you are looking for advanced features on a linear type component, check out <a href="/components/sliders">v-slider</a>.</>, render: () => <SlotExample /> },
] as const;

function ProgressLinearPage() {
  return (
    <DocPage
      title="ProgressLinear"
      namespace="Components"
      icon={<LinearScale />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Circular Progress" },
      ]}
    >
      <DocText>The <CodePill>v-progress-linear</CodePill> component is used to convey data visually to users. They can also represent an indeterminate amount, such as loading or processing.</DocText>
      <Box component="section">
        <Typography component="h2" id="usage" sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400, mb: 2 }}>Usage</Typography>
        <VuetifyExampleBlock title="" source="usage" description={<>In its simplest form, <CodePill>v-progress-linear</CodePill> displays a horizontal progress bar. Use the <CodePill>value</CodePill> prop to control the progress.</>}>
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
        <VuetifyExampleBlock key={example.key} title={example.title} description={example.description} source={example.key}>
          {example.render}
        </VuetifyExampleBlock>
      ))}
    </DocPage>
  );
}

const sourceTemplates = {
  usage: `src/demo/examples/progress-linear/usage.vue`,
  playground: `src/demo/examples/progress-linear/playground.vue`,
  "simple/linear-determinate": `src/demo/examples/progress-linear/simple/linear-determinate.vue`,
  "simple/linear-indeterminate": `src/demo/examples/progress-linear/simple/linear-indeterminate.vue`,
  "simple/linear-buffer": `src/demo/examples/progress-linear/simple/linear-buffer.vue`,
  "simple/linear-query-indeterminate-and-determinate": `src/demo/examples/progress-linear/simple/linear-query-indeterminate-and-determinate.vue`,
  "simple/linear-custom-colors": `src/demo/examples/progress-linear/simple/linear-custom-colors.vue`,
  "simple/rounded": `src/demo/examples/progress-linear/simple/rounded.vue`,
  "simple/stream": `src/demo/examples/progress-linear/simple/stream.vue`,
  "simple/striped": `src/demo/examples/progress-linear/simple/striped.vue`,
  "intermediate/loader": `src/demo/examples/progress-linear/intermediate/loader.vue`,
  "intermediate/file-loader": `src/demo/examples/progress-linear/intermediate/file-loader.vue`,
  "intermediate/slot": `src/demo/examples/progress-linear/intermediate/slot.vue`,
};

export default ProgressLinearPage;
