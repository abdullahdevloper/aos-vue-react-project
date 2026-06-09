import { useState, type PointerEvent, type ReactNode } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Collapse,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Select,
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
  AccountCircle,
  Add,
  Alarm,
  Android,
  Cached,
  CloudUpload,
  Code,
  Dashboard,
  Delete,
  Domain,
  Edit,
  Favorite,
  FormatListBulleted,
  GitHub,
  InvertColors,
  Minimize,
  Person,
  Star,
  ThumbUp,
  Tv,
} from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };

type ButtonKind = "raised" | "depressed" | "outlined" | "rounded" | "text" | "fab" | "icon" | "tile";
type ButtonSize = "x-small" | "small" | "normal" | "large" | "x-large";
type VuseColor = "normal" | "primary" | "secondary" | "accent" | "error" | "warning" | "success" | "info" | "blue-grey" | "deep-purple accent-4" | "pink" | "indigo" | "teal" | "cyan" | "purple" | "deep-orange" | "green";

interface ButtonsExample {
  title: string;
  description: ReactNode;
  source: string;
  minHeight: number;
  uninverted?: boolean;
  render: (inverted: boolean) => ReactNode;
}

interface ButtonRipple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function ButtonsPage() {
  return (
    <DocPage
      title="Buttons"
      namespace="Components"
      icon={<Dashboard />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Buttons" },
      ]}
    >
      <DocText>
        The <CodePill>v-btn</CodePill> component replaces the standard html button with a material design theme and a multitude of options. Any color helper class can be used to alter the background or text color.
      </DocText>
      <Alert severity="warning" sx={{ mb: 4, borderRadius: 1, bgcolor: "rgba(255,152,0,.12)", color: "text.primary", boxShadow: neuInset, "& .MuiAlert-icon": { color: "#fb8c00" } }}>
        <CodePill>v-btn</CodePill> is the only component that behaves differently when using the <strong>dark</strong> prop. Normally components use the <strong>dark</strong> prop to denote that they have a dark colored background and need their text to be white. While this will work for <CodePill>v-btn</CodePill>, it is advised to only use the prop when the button <strong>IS ON</strong> a colored background due to the disabled state blending in with white backgrounds. If you need white text, simply add the <strong>white--text</strong> class.
      </Alert>
      <UsageSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  const [tab, setTab] = useState<ButtonKind>("raised");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [block, setBlock] = useState(false);
  const [elevation, setElevation] = useState(2);
  const [color, setColor] = useState<VuseColor>("deep-purple accent-4");
  const [size, setSize] = useState<ButtonSize>("normal");
  const [inverted, setInverted] = useState(false);

  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Usage
      </Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>
        Buttons in their simplest form contain uppercase text, a slight elevation, hover effect, and a ripple effect on click.
      </Typography>
      <Card variant="outlined" sx={{ bgcolor: "background.default", borderColor: "rgba(111,125,133,.18)", boxShadow: "none", overflow: "hidden", mb: 6 }}>
        <Grid container>
          <Grid item xs={12} md={9}>
            <Box sx={{ bgcolor: "rgba(111,125,133,.10)", borderBottom: "1px solid rgba(111,125,133,.14)" }}>
              <ToggleButtonGroup exclusive value={tab} onChange={(_, value: ButtonKind | null) => value && setTab(value)} sx={usageTabsGroupSx}>
                {(["raised", "depressed", "outlined", "rounded", "text", "fab", "icon", "tile"] as ButtonKind[]).map((item) => (
                  <ToggleButton key={item} value={item}>{item}</ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
            <Box sx={{ minHeight: 300, p: { xs: 3, md: 4 }, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "#fff" : "inherit", transition: "background-color 180ms ease, color 180ms ease" }}>
              <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 220 }}>
                <VButton kind={tab} color={color} size={size} disabled={disabled} loading={loading} block={block} elevation={elevation} dark>
                  {tab === "fab" || tab === "icon" ? <Person /> : "Click Me"}
                </VButton>
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
              <FormControlLabel control={<Switch checked={disabled} onChange={(event) => setDisabled(event.target.checked)} sx={vuseSwitchSx} />} label="disabled" sx={switchLabelSx} />
              <FormControlLabel control={<Switch checked={loading} onChange={(event) => setLoading(event.target.checked)} sx={vuseSwitchSx} />} label="loading" sx={switchLabelSx} />
              <FormControlLabel control={<Switch checked={block} onChange={(event) => setBlock(event.target.checked)} sx={vuseSwitchSx} />} label="block" sx={switchLabelSx} />
              <Typography sx={{ fontSize: 14, color: "text.secondary", pt: 0.5 }}>elevation</Typography>
              <Slider value={elevation} min={0} max={24} onChange={(_, value) => setElevation(value as number)} size="small" sx={vuseSliderSx} />
              <Typography sx={{ fontSize: 14, color: "text.secondary" }}>Colors</Typography>
              <Select value={color} onChange={(event) => setColor(event.target.value as VuseColor)} size="small" sx={vuseSelectSx}>
                {(["deep-purple accent-4", "primary", "secondary", "accent"] as VuseColor[]).map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
              </Select>
              <Typography sx={{ fontSize: 14, color: "text.secondary" }}>Sizes</Typography>
              <Select value={size} onChange={(event) => setSize(event.target.value as ButtonSize)} size="small" sx={vuseSelectSx}>
                {(["x-small", "small", "large", "x-large"] as ButtonSize[]).map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
              </Select>
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
      <Stack spacing={5.5}>
        {buttonExamples.map((example) => (
          <VuetifyExampleBlock key={example.title} title={example.title} description={example.description} source={example.source} minHeight={example.minHeight} uninverted={example.uninverted}>
            {(inverted) => example.render(inverted)}
          </VuetifyExampleBlock>
        ))}
      </Stack>
    </Box>
  );
}

function VuetifyExampleBlock({
  title,
  description,
  source,
  children,
  minHeight = 220,
  uninverted = false,
}: {
  title: string;
  description: ReactNode;
  source: string;
  children: (inverted: boolean) => ReactNode;
  minHeight?: number;
  uninverted?: boolean;
}) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  const effectiveInverted = uninverted ? false : inverted;

  return (
    <Card sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "hidden" }}>
      <Toolbar variant="dense" sx={{ minHeight: 74, alignItems: "center", px: { xs: 3, md: 4 }, bgcolor: "transparent" }}>
        <Typography sx={{ fontSize: { xs: 22, md: 25 }, fontWeight: 500, lineHeight: 1.35 }}>{title}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        {!uninverted && (
          <Tooltip title="Invert example colors">
            <IconButton size="small" aria-label="Invert example colors" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}>
              <InvertColors sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton size="small" aria-expanded={sourceOpen} onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", maxHeight: { xs: "none", sm: "calc(100vh - 275px)" }, overflowY: "auto", p: 2 }}>
          <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', 'SFMono-Regular', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap", color: "#f8f8f2" }}>{source}</Box>
        </Box>
      </Collapse>
      <Box sx={{ px: { xs: 3, md: 4 }, py: { xs: 3.5, md: 4.25 }, minHeight, bgcolor: effectiveInverted ? "#303030" : "transparent", color: effectiveInverted ? "rgba(255,255,255,.92)" : "inherit", transition: "background-color 180ms ease, color 180ms ease" }}>
        <Typography sx={{ color: effectiveInverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: 16.5, fontWeight: 300, lineHeight: 1.7, mb: 3 }}>
          {description}
        </Typography>
        {children(effectiveInverted)}
      </Box>
    </Card>
  );
}

function ButtonMatrix({ kind }: { kind: ButtonKind }) {
  return (
    <Grid container alignItems="center" spacing={2}>
      {(["small", "normal", "large"] as ButtonSize[]).map((size) => (
        <Grid item xs={12} sm={4} textAlign="center" key={size}>
          {(["normal", "primary", "error", "disabled"] as const).map((color) => (
            <Box key={color} sx={{ my: 1 }}>
              <VButton kind={kind} size={size} color={color === "disabled" ? "normal" : color} disabled={color === "disabled"}>
                {color === "normal" ? "Normal" : color === "disabled" ? "Disabled" : color === "primary" ? "Primary" : "Error"}
              </VButton>
            </Box>
          ))}
        </Grid>
      ))}
    </Grid>
  );
}

function DropdownExample() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}><Typography sx={{ mb: 1.5 }}>Overflow</Typography><OverflowButton label="Overflow Btn" items={["Arial", "Calibri", "Courier", "Verdana"]} /></Grid>
      <Grid item xs={12} sm={4}><Typography sx={{ mb: 1.5 }}>Segmented</Typography><OverflowButton label="Segmented Btn" items={["list", "favorite", "delete"]} segmented /></Grid>
      <Grid item xs={12} sm={4}><Typography sx={{ mb: 1.5 }}>Editable</Typography><OverflowButton label="Editable Btn" items={["100%", "75%", "50%", "25%", "0%"]} editable /></Grid>
    </Grid>
  );
}

function OverflowButton({ label, items, segmented = false, editable = false }: { label: string; items: string[]; segmented?: boolean; editable?: boolean }) {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState("");
  return (
    <>
      <Button
        onClick={(event) => setAnchor(event.currentTarget)}
        sx={{
          height: 48,
          width: "100%",
          justifyContent: "space-between",
          px: 1.5,
          bgcolor: "#fff",
          color: value ? "rgba(0,0,0,.87)" : "rgba(0,0,0,.54)",
          borderRadius: 0.5,
          border: "1px solid rgba(0,0,0,.12)",
          boxShadow: "0 2px 4px rgba(0,0,0,.16)",
          textTransform: "none",
          "&:hover": { bgcolor: "#fff" },
        }}
      >
        <span>{editable ? value || label : value || label}</span>
        <span style={{ opacity: segmented ? 1 : 0.7 }}>▾</span>
      </Button>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)} PaperProps={{ sx: { minWidth: anchor?.clientWidth || 180 } }}>
        {items.map((item) => <MenuItem key={item} onClick={() => { setValue(item); setAnchor(null); }}>{item}</MenuItem>)}
      </Menu>
    </>
  );
}

function IconExample() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}><Typography>Normal</Typography></Grid>
        <IconCell><VButton kind="icon" color="pink"><Favorite /></VButton></IconCell>
        <IconCell><VButton kind="icon" color="indigo"><Star /></VButton></IconCell>
        <IconCell><VButton kind="icon" color="green"><Cached /></VButton></IconCell>
        <IconCell><VButton kind="icon" color="deep-orange"><ThumbUp /></VButton></IconCell>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 5 }}>
        <Grid item xs={12}><Typography>Disabled</Typography></Grid>
        {[Favorite, Star, Cached, ThumbUp].map((Icon, index) => <IconCell key={index}><VButton kind="icon" disabled><Icon /></VButton></IconCell>)}
      </Grid>
    </Box>
  );
}

function IconCell({ children }: { children: ReactNode }) {
  return <Grid item xs={12} sm={3} textAlign="center">{children}</Grid>;
}

function FloatingExample() {
  return (
    <Box textAlign="center">
      <VButton kind="fab" size="small" color="primary" dark sx={{ mx: 1 }}><Minimize /></VButton>
      <VButton kind="fab" size="small" color="pink" dark sx={{ mx: 1 }}><Favorite /></VButton>
      <VButton kind="fab" color="indigo" dark sx={{ mx: 1 }}><Add /></VButton>
      <VButton kind="fab" color="teal" dark sx={{ mx: 1 }}><FormatListBulleted /></VButton>
      <VButton kind="fab" size="large" color="cyan" dark sx={{ mx: 1 }}><Edit /></VButton>
      <VButton kind="fab" size="large" color="purple" dark sx={{ mx: 1 }}><Android /></VButton>
    </Box>
  );
}

function SizingExample() {
  return (
    <Grid container alignItems="center">
      <Grid item xs={12} sm={6} textAlign="center"><Stack spacing={1} alignItems="center">
        <VButton size="x-small" color="secondary" dark>Extra small Button</VButton>
        <VButton size="small" color="primary" dark>Small Button</VButton>
        <VButton color="warning" dark>Normal Button</VButton>
        <VButton size="large" color="error" dark>Large Button</VButton>
        <VButton size="x-large" color="success" dark>Extra large Button</VButton>
      </Stack></Grid>
      <Grid item xs={12} sm={6} textAlign="center"><Stack spacing={1} alignItems="center">
        <VButton kind="fab" size="x-small" color="secondary" dark><Tv /></VButton>
        <VButton kind="fab" size="small" color="primary" dark><Edit /></VButton>
        <VButton kind="fab" color="warning" dark><AccountCircle /></VButton>
        <VButton kind="fab" size="large" color="error" dark><Alarm /></VButton>
        <VButton kind="fab" size="x-large" color="success" dark><Domain /></VButton>
      </Stack></Grid>
    </Grid>
  );
}

function LoadersExample() {
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const start = (key: string) => {
    setLoading((value) => ({ ...value, [key]: true }));
    window.setTimeout(() => setLoading((value) => ({ ...value, [key]: false })), 3000);
  };
  return (
    <Box textAlign="center">
      <VButton color="secondary" loading={loading.loading} disabled={loading.loading} onClick={() => start("loading")} sx={{ m: 1 }}>Accept Terms</VButton>
      <VButton color="blue-grey" loading={loading.loading3} disabled={loading.loading3} onClick={() => start("loading3")} sx={{ m: 1 }} dark>Upload <CloudUpload sx={{ ml: 1, fontSize: 18 }} /></VButton>
      <VButton color="success" loading={loading.loading2} loaderText="Loading..." disabled={loading.loading2} onClick={() => start("loading2")} sx={{ m: 1 }}>Custom Loader</VButton>
      <VButton color="info" loading={loading.loading4} loaderIcon disabled={loading.loading4} onClick={() => start("loading4")} sx={{ m: 1 }}>Icon Loader</VButton>
      <VButton kind="fab" color="blue-grey" loading={loading.loading5} disabled={loading.loading5} onClick={() => start("loading5")} sx={{ m: 1 }} dark><CloudUpload /></VButton>
    </Box>
  );
}

function VuetifyIconMark() {
  return (
    <Box
      component="span"
      sx={{
        width: 24,
        height: 24,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        "&::before": {
          content: '""',
          width: 0,
          height: 0,
          borderLeft: "12px solid transparent",
          borderRight: "12px solid transparent",
          borderTop: "21px solid currentColor",
          opacity: 0.95,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 4,
          width: 0,
          height: 0,
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderTop: "11px solid #fff",
        },
      }}
    />
  );
}

function VButton({
  children,
  kind = "raised",
  color = "normal",
  size = "normal",
  disabled = false,
  loading = false,
  loaderText,
  loaderIcon = false,
  block = false,
  elevation = 2,
  dark = false,
  onClick,
  sx,
}: {
  children: ReactNode;
  kind?: ButtonKind;
  color?: VuseColor;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  loaderText?: string;
  loaderIcon?: boolean;
  block?: boolean;
  elevation?: number;
  dark?: boolean;
  onClick?: () => void;
  sx?: object;
}) {
  const fab = kind === "fab";
  const icon = kind === "icon";
  const text = kind === "text" || icon;
  const outlined = kind === "outlined";
  const depressed = kind === "depressed";
  const tile = kind === "tile";
  const rounded = kind === "rounded";
  const palette = buttonPalette(color);
  const filled = !text && !outlined;
  const dimensions = buttonDimensions(size, fab || icon);
  const colorValue = filled ? (dark || color !== "normal" ? "#fff" : "rgba(0,0,0,.87)") : palette;
  const shadow = filled && !depressed && !disabled ? elevationShadow(elevation) : "none";
  const [ripples, setRipples] = useState<ButtonRipple[]>([]);
  const rippleColor = filled || dark ? "rgba(255,255,255,.34)" : "rgba(0,0,0,.18)";
  const isDisabled = disabled || loading;

  const handleRipple = (event: PointerEvent<HTMLButtonElement>) => {
    if (isDisabled || (event.pointerType === "mouse" && event.button !== 0)) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.15;
    const ripple: ButtonRipple = {
      id: window.performance.now(),
      x: event.clientX - rect.left - size / 2,
      y: event.clientY - rect.top - size / 2,
      size,
    };

    setRipples((current) => [...current.slice(-4), ripple]);
    window.setTimeout(() => {
      setRipples((current) => current.filter((item) => item.id !== ripple.id));
    }, 620);
  };

  return (
    <Button
      disableRipple
      disabled={isDisabled}
      onClick={onClick}
      onPointerDown={handleRipple}
      sx={{
        position: "relative",
        overflow: "hidden",
        minWidth: icon || fab ? dimensions.height : 64,
        width: block ? "100%" : fab || icon ? dimensions.height : "auto",
        height: dimensions.height,
        px: fab || icon ? 0 : dimensions.px,
        borderRadius: fab || icon ? "50%" : tile ? 0 : rounded ? 999 : 1,
        bgcolor: filled ? palette : "transparent",
        color: disabled ? "rgba(0,0,0,.26)" : colorValue,
        border: outlined ? `1px solid ${palette}` : "none",
        boxShadow: shadow,
        fontSize: dimensions.font,
        fontWeight: 500,
        letterSpacing: 0.45,
        textTransform: "uppercase",
        lineHeight: 1,
        "&:hover": {
          bgcolor: filled ? palette : color === "normal" ? "rgba(0,0,0,.04)" : `${palette}14`,
          boxShadow: filled && !depressed && !disabled ? elevationShadow(Math.max(elevation, 4)) : "none",
        },
        "&.Mui-disabled": {
          bgcolor: filled ? "rgba(0,0,0,.12)" : "transparent",
          color: "rgba(0,0,0,.26)",
          boxShadow: "none",
          borderColor: outlined ? "rgba(0,0,0,.12)" : "transparent",
        },
        "@keyframes vuse-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "@keyframes vuse-button-ripple": {
          "0%": { transform: "scale(0)", opacity: 0.28 },
          "65%": { opacity: 0.18 },
          "100%": { transform: "scale(1)", opacity: 0 },
        },
        ...sx,
      }}
    >
      <Box component="span" sx={{ position: "relative", zIndex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        {loading ? loaderText || (loaderIcon ? <Cached sx={{ animation: "vuse-spin 1s linear infinite" }} /> : <CircularProgress size={fab || icon ? 22 : 18} color="inherit" />) : children}
      </Box>
      {ripples.map((ripple) => (
        <Box
          key={ripple.id}
          component="span"
          sx={{
            position: "absolute",
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            borderRadius: "50%",
            pointerEvents: "none",
            bgcolor: rippleColor,
            opacity: 0,
            transform: "scale(0)",
            animation: "vuse-button-ripple 620ms cubic-bezier(.25,.8,.5,1)",
            zIndex: 0,
          }}
        />
      ))}
    </Button>
  );
}

function CodePill({ children }: { children: ReactNode }) {
  return (
    <Box component="code" sx={{ mx: 0.25, px: 0.6, py: 0.2, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "85%" }}>
      {children}
    </Box>
  );
}

function buttonPalette(color: VuseColor) {
  const colors: Record<VuseColor, string> = {
    normal: "#f5f5f5",
    primary: "#0097a7",
    secondary: "#424242",
    accent: "#82b1ff",
    error: "#ff5252",
    warning: "#fb8c00",
    success: "#4caf50",
    info: "#2196f3",
    "blue-grey": "#607d8b",
    "deep-purple accent-4": "#6200ea",
    pink: "#e91e63",
    indigo: "#3f51b5",
    teal: "#009688",
    cyan: "#00bcd4",
    purple: "#9c27b0",
    "deep-orange": "#ff5722",
    green: "#4caf50",
  };
  return colors[color];
}

function buttonDimensions(size: ButtonSize, round: boolean) {
  const map = {
    "x-small": { height: round ? 32 : 20, px: 1.1, font: 10 },
    small: { height: round ? 40 : 28, px: 1.5, font: 12 },
    normal: { height: round ? 56 : 36, px: 2, font: 14 },
    large: { height: round ? 64 : 44, px: 2.4, font: 15 },
    "x-large": { height: round ? 72 : 52, px: 2.8, font: 16 },
  };
  return map[size];
}

function elevationShadow(elevation: number) {
  if (elevation <= 0) return "none";
  if (elevation <= 2) return "0 2px 4px rgba(0,0,0,.22)";
  if (elevation <= 8) return "0 4px 8px rgba(0,0,0,.26)";
  return "0 8px 18px rgba(0,0,0,.28)";
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

const usageTabsGroupSx = {
  minHeight: 54,
  px: 1.25,
  py: 0.75,
  gap: 0.75,
  flexWrap: "wrap",
  "& .MuiToggleButton-root": {
    border: 0,
    borderRadius: 1,
    px: 1.4,
    py: 0.75,
    color: "text.secondary",
    textTransform: "none",
    fontSize: 13,
    "&.Mui-selected": { bgcolor: "#0097a7", color: "#fff" },
  },
};

const switchLabelSx = { mx: 0, "& .MuiFormControlLabel-label": { fontSize: 15, color: "text.secondary" } };
const vuseSwitchSx = { "& .MuiSwitch-switchBase.Mui-checked": { color: "#0097a7" }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "#0097a7" } };
const vuseSliderSx = { color: "#0097a7", "& .MuiSlider-thumb": { width: 14, height: 14 }, "& .MuiSlider-track": { height: 2 }, "& .MuiSlider-rail": { height: 2 } };
const vuseSelectSx = { height: 42, bgcolor: "#fff", borderRadius: 1, boxShadow: "0 2px 4px rgba(0,0,0,.16)", fontSize: 14, "& fieldset": { borderColor: "rgba(0,0,0,.12)" } };

const buttonExamples: ButtonsExample[] = [
  { title: "Text", description: "Text buttons have no box shadow and no background. Only on hover is the container for the button shown.", source: "<template>\n  <v-row align=\"center\">...text button matrix...</v-row>\n</template>", minHeight: 310, render: () => <ButtonMatrix kind="text" /> },
  { title: "Raised", description: "Raised buttons have a box shadow that increases when clicked. This is the default style.", source: "<template>\n  <v-row align=\"center\">...raised button matrix...</v-row>\n</template>", minHeight: 310, render: () => <ButtonMatrix kind="raised" /> },
  { title: "Depressed", description: "Depressed buttons still maintain their background color, but have no box shadow.", source: "<template>\n  <v-row align=\"center\">...depressed button matrix...</v-row>\n</template>", minHeight: 310, render: () => <ButtonMatrix kind="depressed" /> },
  { title: "Button Dropdown Variants", description: "Button dropdowns are regular selects with additional styling.", source: "<template>\n  <v-overflow-btn label=\"Overflow Btn\"></v-overflow-btn>\n  <v-overflow-btn segmented label=\"Segmented Btn\"></v-overflow-btn>\n  <v-overflow-btn editable label=\"Editable Btn\"></v-overflow-btn>\n</template>", minHeight: 250, uninverted: true, render: () => <DropdownExample /> },
  { title: "Icon", description: "Icons can be used for the primary content of a button.", source: "<template>\n  <v-btn icon color=\"pink\"><v-icon>mdi-heart</v-icon></v-btn>\n  ...\n</template>", minHeight: 330, render: () => <IconExample /> },
  { title: "Floating", description: "Floating buttons are rounded and usually contain an icon.", source: "<template>\n  <v-btn fab dark small color=\"primary\"><v-icon>mdi-minus</v-icon></v-btn>\n  ...\n</template>", minHeight: 180, render: () => <FloatingExample /> },
  { title: "Sizing", description: "Buttons can be given different sizing options to fit a multitude of scenarios.", source: "<template>\n  <v-btn x-small color=\"secondary\" dark>Extra small Button</v-btn>\n  ...\n</template>", minHeight: 390, render: () => <SizingExample /> },
  { title: "Outlined", description: "Outlined buttons inherit their borders from the current color applied.", source: "<template>\n  <v-btn outlined color=\"indigo\">Outlined Button</v-btn>\n  ...\n</template>", minHeight: 180, render: () => <Box textAlign="center"><VButton kind="outlined" color="indigo" sx={{ m: 1 }}>Outlined Button</VButton><VButton kind="fab" color="teal" sx={{ m: 1, bgcolor: "transparent", color: "#009688", border: "1px solid #009688", boxShadow: "none", "&:hover": { bgcolor: "rgba(0,150,136,.08)", boxShadow: "none" } }}><FormatListBulleted /></VButton><VButton kind="fab" size="large" color="indigo" sx={{ m: 1, bgcolor: "transparent", color: "#3f51b5", border: "1px solid #3f51b5", boxShadow: "none", "&:hover": { bgcolor: "rgba(63,81,181,.08)", boxShadow: "none" } }}><Edit /></VButton></Box> },
  { title: "Rounded", description: "Rounded buttons behave the same as regular buttons but have rounded edges.", source: "<template>\n  <v-btn rounded color=\"primary\" dark>Rounded Button</v-btn>\n</template>", minHeight: 160, render: () => <Box textAlign="center"><VButton kind="rounded" color="primary" dark>Rounded Button</VButton></Box> },
  { title: "Tile", description: "Tile buttons behave the same as regular buttons but have no border radius.", source: "<template>\n  <v-btn tile color=\"indigo\" dark>Tile Button</v-btn>\n  ...\n</template>", minHeight: 180, render: () => <Box textAlign="center"><VButton kind="tile" color="indigo" dark sx={{ m: 1 }}>Tile Button</VButton><VButton kind="tile" color="success" sx={{ m: 1, border: "1px solid #4caf50", bgcolor: "transparent", color: "#4caf50" }}><Edit sx={{ mr: 1, fontSize: 18 }} /> Edit</VButton><VButton kind="icon" size="large" color="teal" sx={{ m: 1, borderRadius: 0 }}><VuetifyIconMark /></VButton></Box> },
  { title: "Block", description: "Block buttons extend the full available width.", source: "<template>\n  <v-btn block color=\"secondary\" dark>Block Button</v-btn>\n</template>", minHeight: 150, render: () => <VButton block color="secondary" dark>Block Button</VButton> },
  { title: "Loaders", description: <>Using the loading prop, you can notify a user that there is processing taking place. The default behavior is to use a <CodePill>v-progress-circular</CodePill> component but this can be customized.</>, source: "<template>\n  <v-btn :loading=\"loading\" :disabled=\"loading\" color=\"secondary\">Accept Terms</v-btn>\n  ...\n</template>", minHeight: 200, render: () => <LoadersExample /> },
];
