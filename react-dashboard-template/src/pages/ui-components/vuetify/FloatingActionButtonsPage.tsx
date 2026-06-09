import { useState, type PointerEvent, type ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  Add,
  Assignment,
  CallToAction,
  Close,
  Code,
  Delete,
  Edit,
  Folder,
  GitHub,
  Info,
  InvertColors,
  KeyboardArrowUp,
  Menu as MenuIcon,
  Search,
  Share,
  ViewModule,
} from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };

type FabColor = "pink" | "primary" | "cyan accent-2" | "blue darken-2" | "green" | "indigo" | "red" | "success";
type SpeedDirection = "top" | "right" | "bottom" | "left";
type SpeedTransition = "slide-y-transition" | "slide-y-reverse-transition" | "slide-x-transition" | "slide-x-reverse-transition" | "scale-transition";
type TabValue = "one" | "two" | "three";

interface ButtonRipple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface FabExample {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  minHeight: number;
  render: (inverted: boolean) => ReactNode;
}

export default function FloatingActionButtonsPage() {
  return (
    <DocPage
      title="FloatingActionButtons"
      namespace="Components"
      icon={<Add />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Floating Action" },
      ]}
    >
      <DocText>
        The <CodePill>v-btn</CodePill> component can be used as a floating action button. This provides an application with a main point of action. Combined with the <CodePill>v-speed-dial</CodePill> component, you can create a diverse set of functions available for your users.
      </DocText>
      <UsageSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  const [inverted, setInverted] = useState(false);

  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Usage
      </Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>
        Floating action buttons can be attached to material to signify a promoted action in your application. The default size will be used in most cases, whereas the <CodePill>small</CodePill> variant can be used to maintain continuity with similar sized elements.
      </Typography>
      <Card variant="outlined" sx={{ bgcolor: "background.default", borderColor: "rgba(111,125,133,.18)", boxShadow: "none", overflow: "hidden", mb: 6 }}>
        <Toolbar variant="dense" sx={{ bgcolor: "rgba(111,125,133,.10)", minHeight: 54, px: 2.25 }}>
          <Typography sx={{ fontSize: 20, fontWeight: 400 }}>usage</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Invert playground colors">
            <IconButton size="small" aria-label="Invert playground colors" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}>
              <InvertColors fontSize="small" />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <Box sx={{ px: { xs: 3, md: 4 }, py: { xs: 3.5, md: 4.25 }, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <UsageFabCard variant="top" dark={inverted} />
            </Grid>
            <Grid item xs={12} md={6}>
              <UsageFabCard variant="extended" dark={inverted} />
            </Grid>
          </Grid>
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
        {fabExamples.map((example) => (
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
  minHeight,
}: {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  children: (inverted: boolean) => ReactNode;
  minHeight: number;
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

function UsageFabCard({ variant, dark }: { variant: "top" | "extended"; dark: boolean }) {
  return (
    <Card sx={{ position: "relative", overflow: "hidden", bgcolor: dark ? "#424242" : "#fff", borderRadius: 0.5, boxShadow: "0 2px 4px rgba(0,0,0,.18)" }}>
      <Toolbar sx={{ minHeight: variant === "extended" ? 112 : 64, alignItems: "flex-start", pt: 1, bgcolor: dark ? "#3a3a3a" : "#fff", color: dark ? "#fff" : "rgba(0,0,0,.87)" }}>
        <IconButton sx={{ color: "inherit" }}><MenuIcon /></IconButton>
        {variant === "extended" && (
          <FabButton small colorName="pink" sx={{ position: "absolute", left: 24, bottom: -20 }}>
            <Add />
          </FabButton>
        )}
      </Toolbar>
      <Box sx={{ height: variant === "extended" ? 236 : 300, bgcolor: dark ? "#303030" : "#f5f5f5" }} />
      <Box sx={{ height: 100, position: "relative", bgcolor: dark ? "#424242" : "#fff" }}>
        {variant === "top" && (
          <FabButton colorName="pink" sx={{ position: "absolute", top: -28, right: 16 }}>
            <Add />
          </FabButton>
        )}
      </Box>
    </Card>
  );
}

function SmallVariantExample() {
  const [dialog, setDialog] = useState(false);
  const folders = [
    { icon: <Folder />, bg: "#bdbdbd", title: "Photos", subtitle: "Jan 9, 2014" },
    { icon: <Folder />, bg: "#bdbdbd", title: "Recipes", subtitle: "Jan 17, 2014" },
    { icon: <Folder />, bg: "#bdbdbd", title: "Work", subtitle: "Jan 28, 2014" },
  ];
  const files = [
    { icon: <Assignment />, bg: "#2196f3", title: "Vacation itinerary", subtitle: "Jan 20, 2014" },
    { icon: <CallToAction />, bg: "#ffc107", title: "Kitchen remodel", subtitle: "Jan 10, 2014" },
  ];

  return (
    <Box sx={{ maxWidth: { sm: "50%" }, mx: "auto" }}>
      <Card sx={{ overflow: "hidden", borderRadius: 0.5, bgcolor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,.18)" }}>
        <Toolbar sx={{ position: "relative", minHeight: 112, alignItems: "flex-start", pt: 1, bgcolor: "#03a9f4", color: "#fff" }}>
          <IconButton sx={{ color: "rgba(0,0,0,.54)" }}><MenuIcon /></IconButton>
          <Typography sx={{ fontSize: 20, lineHeight: "48px", ml: 1 }}>My files</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton sx={{ color: "rgba(0,0,0,.54)" }}><Search /></IconButton>
          <IconButton sx={{ color: "rgba(0,0,0,.54)" }}><ViewModule /></IconButton>
          <FabButton colorName="cyan accent-2" sx={{ position: "absolute", left: 24, bottom: -28 }} onClick={() => setDialog(true)}>
            <Add />
          </FabButton>
        </Toolbar>
        <ListSection title="Folders" items={folders} />
        <Box sx={{ ml: 9, borderTop: "1px solid rgba(0,0,0,.12)" }} />
        <ListSection title="Files" items={files} />
      </Card>
      <Dialog open={dialog} onClose={() => setDialog(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 0.5 } }}>
        <DialogContent sx={{ pt: 3 }}>
          <TextField fullWidth variant="standard" label="File name" />
          <Typography sx={{ display: "block", mt: 2, fontSize: 12, color: "text.secondary" }} component="small">
            * This doesn&apos;t actually save.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)} sx={{ color: "#0097a7", textTransform: "uppercase" }}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function ListSection({ title, items }: { title: string; items: Array<{ icon: ReactNode; bg: string; title: string; subtitle: string }> }) {
  return (
    <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
      <Box component="li" sx={{ pl: 9, pr: 2, pt: 2, pb: 1, color: "rgba(0,0,0,.54)", fontSize: 14 }}>{title}</Box>
      {items.map((item) => (
        <Box key={item.title} component="li" sx={{ minHeight: 72, display: "flex", alignItems: "center", px: 2, color: "rgba(0,0,0,.87)", "&:hover": { bgcolor: "rgba(0,0,0,.04)" } }}>
          <Box sx={{ width: 40, height: 40, mr: 2, borderRadius: "50%", bgcolor: item.bg, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", "& svg": { fontSize: 24 } }}>{item.icon}</Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 16 }}>{item.title}</Typography>
            <Typography sx={{ fontSize: 14, color: "rgba(0,0,0,.6)" }}>{item.subtitle}</Typography>
          </Box>
          <IconButton sx={{ color: "#bdbdbd" }}><Info /></IconButton>
        </Box>
      ))}
    </Box>
  );
}

function DisplayAnimationExample() {
  const [hidden, setHidden] = useState(false);

  return (
    <Box sx={{ width: "100%", maxWidth: { md: "50%" }, mx: "auto" }}>
      <Card sx={{ overflow: "hidden", borderRadius: 0.5, bgcolor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,.18)" }}>
        <Toolbar sx={{ minHeight: 112, alignItems: "flex-start", pt: 1, px: 2, position: "relative", bgcolor: "#fff", color: "rgba(0,0,0,.87)" }}>
          <IconButton sx={{ color: "rgba(0,0,0,.54)" }}><MenuIcon /></IconButton>
          <FabTransition show={!hidden}>
            <FabButton small colorName="pink" sx={{ position: "absolute", left: 24, bottom: -20 }}>
              <Add />
            </FabButton>
          </FabTransition>
        </Toolbar>
        <Box sx={{ height: 300, boxSizing: "border-box", p: 2, bgcolor: "#f5f5f5", textAlign: "center" }}>
          <Button variant="contained" disableElevation={false} onClick={() => setHidden((value) => !value)} sx={{ minWidth: 64, height: 36, px: 2, bgcolor: "#0097a7", color: "#fff", borderRadius: 1, fontSize: 14, letterSpacing: 0.4, textTransform: "uppercase", boxShadow: "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)", "&:hover": { bgcolor: "#00838f", boxShadow: "0 2px 4px rgba(0,0,0,.24)" } }}>
            {hidden ? "Show" : "Hide"}
          </Button>
        </Box>
        <Box sx={{ height: 100, p: 2, boxSizing: "border-box", position: "relative", bgcolor: "#fff" }}>
          <FabTransition show={!hidden}>
            <FabButton colorName="pink" sx={{ position: "absolute", top: 16, right: 16 }}>
              <Add />
            </FabButton>
          </FabTransition>
        </Box>
      </Card>
    </Box>
  );
}

function SpeedDialExample() {
  const [fab, setFab] = useState(false);
  const [hover, setHover] = useState(false);
  const [top, setTop] = useState(false);
  const [right, setRight] = useState(true);
  const [bottom, setBottom] = useState(true);
  const [left, setLeft] = useState(false);
  const [direction, setDirection] = useState<SpeedDirection>("top");
  const [transition, setTransition] = useState<SpeedTransition>("slide-y-reverse-transition");

  const setPairedPosition = (name: "top" | "right" | "bottom" | "left", value: boolean) => {
    if (name === "top") {
      setTop(value);
      setBottom(!value);
    } else if (name === "bottom") {
      setBottom(value);
      setTop(!value);
    } else if (name === "right") {
      setRight(value);
      setLeft(!value);
    } else {
      setLeft(value);
      setRight(!value);
    }
  };

  return (
    <Card id="create" sx={{ position: "relative", minHeight: 420, p: 3, overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,.18)", borderRadius: 0.5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Subheader>Options</Subheader>
          <VCheckbox checked={hover} label="Open on hover" onChange={setHover} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Subheader>FAB location</Subheader>
          <VCheckbox checked={top} label="Top" onChange={(value) => setPairedPosition("top", value)} />
          <VCheckbox checked={right} label="Right" onChange={(value) => setPairedPosition("right", value)} />
          <VCheckbox checked={bottom} label="Bottom" onChange={(value) => setPairedPosition("bottom", value)} />
          <VCheckbox checked={left} label="Left" onChange={(value) => setPairedPosition("left", value)} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Subheader>Speed dial direction</Subheader>
          <VRadioGroup value={direction} values={["top", "right", "bottom", "left"]} labels={["Top", "Right", "Bottom", "Left"]} onChange={(value) => setDirection(value as SpeedDirection)} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Subheader>Transition</Subheader>
          <VRadioGroup value={transition} values={["slide-y-transition", "slide-y-reverse-transition", "slide-x-transition", "slide-x-reverse-transition", "scale-transition"]} labels={["Slide y", "Slide y reverse", "Slide x", "Slide x reverse", "Scale"]} onChange={(value) => setTransition(value as SpeedTransition)} />
        </Grid>
      </Grid>
      <Box
        onMouseEnter={() => hover && setFab(true)}
        onMouseLeave={() => hover && setFab(false)}
        sx={{
          position: "absolute",
          top: top ? 16 : "auto",
          right: right ? 16 : "auto",
          bottom: bottom ? 16 : "auto",
          left: left ? 16 : "auto",
        }}
      >
        <SpeedDialActions open={fab} direction={direction} transition={transition} />
        <FabButton colorName="blue darken-2" onClick={() => !hover && setFab((value) => !value)}>
          {fab ? <Close /> : <AccountCircle />}
        </FabButton>
      </Box>
    </Card>
  );
}

function LateralScreensExample() {
  const [tab, setTab] = useState<TabValue>("one");
  const active = {
    one: { color: "success" as FabColor, icon: <Share /> },
    two: { color: "red" as FabColor, icon: <Edit /> },
    three: { color: "green" as FabColor, icon: <KeyboardArrowUp /> },
  }[tab];

  return (
    <Card id="lateral" sx={{ position: "relative", overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,.18)", borderRadius: 0.5 }}>
      <Box sx={{ bgcolor: "#3f51b5", color: "#fff" }}>
        <Toolbar sx={{ minHeight: 64 }}>
          <IconButton sx={{ color: "#fff" }}><MenuIcon /></IconButton>
          <Typography sx={{ ml: 1, fontSize: 20 }}>Page title</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton sx={{ color: "#fff" }}><Search /></IconButton>
          <IconButton sx={{ color: "#fff" }}><MoreVerticalIcon /></IconButton>
        </Toolbar>
        <Stack direction="row" sx={{ pl: { xs: 0, sm: 9 }, height: 48, alignItems: "flex-end" }}>
          {(["one", "two", "three"] as TabValue[]).map((value, index) => (
            <Button key={value} onClick={() => setTab(value)} sx={{ position: "relative", minWidth: 110, height: 48, color: "#fff", opacity: tab === value ? 1 : 0.78, textTransform: "uppercase", fontSize: 14 }}>
              Item {["One", "Two", "Three"][index]}
              {tab === value && <Box sx={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 2, bgcolor: "#e91e63" }} />}
            </Button>
          ))}
        </Stack>
      </Box>
      <Box sx={{ p: 2 }}>
        <Box sx={{ height: 200, bgcolor: "#fff" }} />
      </Box>
      <FabTransition show key={`${tab}-${active.color}`}>
        <FabButton large colorName={active.color} sx={{ position: "absolute", left: 16, bottom: 16 }}>
          {active.icon}
        </FabButton>
      </FabTransition>
    </Card>
  );
}

function SpeedDialActions({ open, direction, transition }: { open: boolean; direction: SpeedDirection; transition: SpeedTransition }) {
  const actions = [
    { color: "green" as FabColor, icon: <Edit /> },
    { color: "indigo" as FabColor, icon: <Add /> },
    { color: "red" as FabColor, icon: <Delete /> },
  ];
  const axis = direction === "top" || direction === "bottom" ? "Y" : "X";
  const sign = direction === "top" || direction === "left" ? -1 : 1;

  return (
    <>
      {actions.map((action, index) => {
        const distance = (index + 1) * 56 * sign;
        const offset = axis === "Y" ? `translate3d(0, ${open ? distance : 0}px, 0)` : `translate3d(${open ? distance : 0}px, 0, 0)`;
        return (
          <FabButton
            key={`${action.color}-${index}`}
            small
            colorName={action.color}
            sx={{
              position: "absolute",
              inset: 8,
              opacity: open ? 1 : 0,
              pointerEvents: open ? "auto" : "none",
              transform: transition === "scale-transition" ? `${offset} scale(${open ? 1 : 0.25})` : offset,
              transition: `transform 220ms cubic-bezier(.25,.8,.5,1) ${index * 24}ms, opacity 180ms ease ${index * 24}ms`,
            }}
          >
            {action.icon}
          </FabButton>
        );
      })}
    </>
  );
}

function FabButton({
  children,
  colorName,
  small = false,
  large = false,
  onClick,
  sx,
}: {
  children: ReactNode;
  colorName: FabColor;
  small?: boolean;
  large?: boolean;
  onClick?: () => void;
  sx?: object;
}) {
  const [ripples, setRipples] = useState<ButtonRipple[]>([]);
  const size = small ? 40 : large ? 64 : 56;
  const color = fabPalette(colorName);

  const handleRipple = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const rippleSize = Math.max(rect.width, rect.height) * 2.15;
    const ripple = {
      id: window.performance.now(),
      x: event.clientX - rect.left - rippleSize / 2,
      y: event.clientY - rect.top - rippleSize / 2,
      size: rippleSize,
    };
    setRipples((current) => [...current.slice(-3), ripple]);
    window.setTimeout(() => setRipples((current) => current.filter((item) => item.id !== ripple.id)), 620);
  };

  return (
    <Button
      disableRipple
      onPointerDown={handleRipple}
      onClick={onClick}
      sx={{
        minWidth: size,
        width: size,
        height: size,
        p: 0,
        borderRadius: "50%",
        bgcolor: color,
        color: "#fff",
        boxShadow: "0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12)",
        overflow: "hidden",
        position: "relative",
        "&:hover": { bgcolor: color, boxShadow: "0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)" },
        "& svg": { fontSize: small ? 20 : large ? 28 : 24, position: "relative", zIndex: 1 },
        "@keyframes vuse-fab-ripple": {
          "0%": { transform: "scale(0)", opacity: 0.3 },
          "65%": { opacity: 0.18 },
          "100%": { transform: "scale(1)", opacity: 0 },
        },
        ...sx,
      }}
    >
      <Box component="span" sx={{ position: "relative", zIndex: 1, display: "inline-flex" }}>{children}</Box>
      {ripples.map((ripple) => (
        <Box key={ripple.id} component="span" sx={{ position: "absolute", left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size, borderRadius: "50%", bgcolor: "rgba(255,255,255,.34)", opacity: 0, transform: "scale(0)", pointerEvents: "none", animation: "vuse-fab-ripple 620ms cubic-bezier(.25,.8,.5,1)" }} />
      ))}
    </Button>
  );
}

function FabTransition({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <Box sx={{ display: show ? "block" : "block", opacity: show ? 1 : 0, transform: show ? "scale(1)" : "scale(.2)", pointerEvents: show ? "auto" : "none", transition: "transform 220ms cubic-bezier(.4,0,.2,1), opacity 180ms ease" }}>
      {children}
    </Box>
  );
}

function VCheckbox({ checked, label, onChange }: { checked: boolean; label: string; onChange: (value: boolean) => void }) {
  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={(event) => onChange(event.target.checked)} sx={{ color: "#0097a7", "&.Mui-checked": { color: "#0097a7" } }} />}
      label={label}
      sx={{ display: "block", my: 0.1, "& .MuiFormControlLabel-label": { fontSize: 15, color: "rgba(0,0,0,.74)" } }}
    />
  );
}

function VRadioGroup({ value, values, labels, onChange }: { value: string; values: string[]; labels: string[]; onChange: (value: string) => void }) {
  return (
    <RadioGroup value={value} onChange={(event) => onChange(event.target.value)}>
      {values.map((item, index) => (
        <FormControlLabel key={item} value={item} control={<Radio sx={{ color: "#0097a7", "&.Mui-checked": { color: "#0097a7" } }} />} label={labels[index]} sx={{ my: -0.25, "& .MuiFormControlLabel-label": { fontSize: 15, color: "rgba(0,0,0,.74)" } }} />
      ))}
    </RadioGroup>
  );
}

function Subheader({ children }: { children: ReactNode }) {
  return <Typography sx={{ fontSize: 14, color: "rgba(0,0,0,.54)", fontWeight: 500, minHeight: 48, display: "flex", alignItems: "center" }}>{children}</Typography>;
}

function MoreVerticalIcon() {
  return <Box component="span" sx={{ fontSize: 24, lineHeight: 1, letterSpacing: -2 }}>⋮</Box>;
}

function CodePill({ children }: { children: ReactNode }) {
  return (
    <Box component="code" sx={{ mx: 0.25, px: 0.6, py: 0.2, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "85%" }}>
      {children}
    </Box>
  );
}

function fabPalette(color: FabColor) {
  const colors: Record<FabColor, string> = {
    pink: "#e91e63",
    primary: "#0097a7",
    "cyan accent-2": "#18ffff",
    "blue darken-2": "#1976d2",
    green: "#4caf50",
    indigo: "#3f51b5",
    red: "#f44336",
    success: "#4caf50",
  };
  return colors[color];
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

const fabExamples: FabExample[] = [
  {
    title: "Small variant",
    description: "For better visual appeal, we use a small button to match our list avatars.",
    source: "small",
    minHeight: 640,
    render: () => <SmallVariantExample />,
  },
  {
    title: "Display animation",
    description: <>When displaying for the first time, a floating action button should animate onto the screen. Here we use the <CodePill>v-fab-transition</CodePill> with v-show. You can also use any custom transition provided by Vuetify or your own.</>,
    source: "displayAnimation",
    minHeight: 560,
    render: () => <DisplayAnimationExample />,
  },
  {
    title: "FAB with speed-dial",
    description: "The speed-dial component has an very robust api for customizing your FAB experience exactly how you want.",
    source: "speedDial",
    minHeight: 560,
    render: () => <SpeedDialExample />,
  },
  {
    title: "Lateral screens",
    description: "When changing the default action of your button, it is recommended that you display a transition to signify a change. We do this by binding the key prop to a piece of data that can properly signal a change in action to the Vue transition system. While you can use a custom transition for this, ensure that you set the mode prop to out-in.",
    source: "lateralScreens",
    minHeight: 430,
    render: () => <LateralScreensExample />,
  },
];

const sourceTemplates = {
  usage: `<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-card>
          <v-toolbar>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
          </v-toolbar>
          <v-card-text style="height: 300px;" class="grey lighten-5"></v-card-text>
          <v-card-text style="height: 100px; position: relative">
            <v-btn absolute dark fab top right color="pink">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>`,
  small: `<template>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
      <v-card>
        <v-toolbar color="light-blue" light extended>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title class="white--text">My files</v-toolbar-title>
          <v-btn fab color="cyan accent-2" bottom left absolute @click="dialog = !dialog">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list two-line subheader>...</v-list>
        <v-dialog v-model="dialog" max-width="500px">...</v-dialog>
      </v-card>
    </v-col>
  </v-row>
</template>`,
  displayAnimation: `<template>
  <v-card>
    <v-toolbar extended>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <template v-slot:extension>
        <v-fab-transition>
          <v-btn v-show="!hidden" color="pink" fab dark small absolute bottom left>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </template>
    </v-toolbar>
    <v-btn color="primary" @click="hidden = !hidden">
      {{ hidden ? 'Show' : 'Hide' }}
    </v-btn>
  </v-card>
</template>`,
  speedDial: `<template>
  <v-speed-dial
    v-model="fab"
    :top="top"
    :bottom="bottom"
    :right="right"
    :left="left"
    :direction="direction"
    :open-on-hover="hover"
    :transition="transition"
  >
    <template v-slot:activator>
      <v-btn v-model="fab" color="blue darken-2" dark fab>
        <v-icon v-if="fab">mdi-close</v-icon>
        <v-icon v-else>mdi-account-circle</v-icon>
      </v-btn>
    </template>
    <v-btn fab dark small color="green"><v-icon>mdi-pencil</v-icon></v-btn>
    <v-btn fab dark small color="indigo"><v-icon>mdi-plus</v-icon></v-btn>
    <v-btn fab dark small color="red"><v-icon>mdi-delete</v-icon></v-btn>
  </v-speed-dial>
</template>`,
  lateralScreens: `<template>
  <v-card id="lateral">
    <v-toolbar dark tabs flat color="indigo">
      <v-toolbar-title>Page title</v-toolbar-title>
      <template v-slot:extension>
        <v-tabs v-model="tabs" align-with-title>
          <v-tab href="#one">Item One</v-tab>
          <v-tab href="#two">Item Two</v-tab>
          <v-tab href="#three">Item Three</v-tab>
          <v-tabs-slider color="pink"></v-tabs-slider>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-fab-transition>
      <v-btn :key="activeFab.icon" :color="activeFab.color" fab large dark bottom left class="v-btn--example">
        <v-icon>{{ activeFab.icon }}</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-card>
</template>`,
};
