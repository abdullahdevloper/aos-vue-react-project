import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  Collapse,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Code, GitHub, InvertColors, Star, ViewHeadline } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const elevation6 = "0px 3px 5px -1px rgba(0,0,0,.2), 0px 6px 10px 0px rgba(0,0,0,.14), 0px 1px 18px 0px rgba(0,0,0,.12)";
const elevation24 = "0px 11px 15px -7px rgba(0,0,0,.2), 0px 24px 38px 3px rgba(0,0,0,.14), 0px 9px 46px 8px rgba(0,0,0,.12)";

type ExampleKey = "usage" | "simple/multi-line" | "simple/timeout" | "simple/vertical" | "simple/variants";

function colorValue(color?: string) {
  switch (color) {
    case "red darken-2":
      return "#d32f2f";
    case "orange darken-2":
      return "#f57c00";
    case "indigo":
      return "#3f51b5";
    case "pink":
      return "#e91e63";
    case "red":
      return "#f44336";
    case "blue":
      return "#2196f3";
    case "cyan":
      return "#00bcd4";
    case "cyan darken-2":
      return "#0097a7";
    case "blue-grey":
      return "#607d8b";
    case "deep-purple accent-4":
      return "#6200ea";
    case "success":
      return "#4caf50";
    case "primary":
      return primary;
    default:
      return color || "#333";
  }
}

export default function SnackbarsPage() {
  return (
    <DocPage
      title="Snackbars"
      namespace="Components"
      icon={<ViewHeadline />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Snackbars" },
      ]}
    >
      <DocText>
        The <CodePill>v-snackbar</CodePill> component is used to display a quick message to a user. Snackbars support positioning, removal delay, and callbacks.
      </DocText>
      <Box component="section" sx={{ mb: 5 }}>
        <BaseHeading id="usage">Usage</BaseHeading>
        <VuetifyExampleBlock source="usage" description={<><CodePill>v-snackbar</CodePill>&apos;s in their simplest form display a temporary and closable notification to the user.</>}>
          {() => <UsageExample />}
        </VuetifyExampleBlock>
      </Box>
      <Box component="section" id="examples">
        <BaseHeading id="examples">Examples</BaseHeading>
        <ExampleSection
          title="Multi Line"
          source="simple/multi-line"
          description={<>The <CodePill>multi-line</CodePill> property extends the height of the <CodePill>v-snackbar</CodePill> to give you a little more room for content.</>}
        >
          {() => <MultiLineExample />}
        </ExampleSection>
        <ExampleSection
          title="Timeout"
          source="simple/timeout"
          description={<>The <CodePill>timeout</CodePill> property lets you customize the delay before the <CodePill>v-snackbar</CodePill> is hidden.</>}
        >
          {() => <TimeoutExample />}
        </ExampleSection>
        <ExampleSection
          title="Vertical"
          source="simple/vertical"
          description={<>The <CodePill>vertical</CodePill> property allows you to stack the content of your <CodePill>v-snackbar</CodePill>.</>}
        >
          {() => <VerticalExample />}
        </ExampleSection>
        <ExampleSection
          title="Variants"
          source="simple/variants"
          newIn="v2.3"
          description={<>Apply different styles to the snackbar using props such as <CodePill>text</CodePill>, <CodePill>shaped</CodePill>, <CodePill>outlined</CodePill>, and more.</>}
        >
          {() => <VariantsExample />}
        </ExampleSection>
      </Box>
    </DocPage>
  );
}

function UsageExample() {
  const [snackbar, setSnackbar] = useState(false);
  return (
    <Box sx={{ textAlign: "center", m: 2 }}>
      <VButton dark onClick={() => setSnackbar(true)}>Open Snackbar</VButton>
      <VSnackbar open={snackbar} onClose={() => setSnackbar(false)} actionColor="pink">
        Hello, I&apos;m a snackbar
      </VSnackbar>
    </Box>
  );
}

function MultiLineExample() {
  const [snackbar, setSnackbar] = useState(false);
  return (
    <Box sx={{ textAlign: "center" }}>
      <VButton dark color="red darken-2" onClick={() => setSnackbar(true)}>Open Snackbar</VButton>
      <VSnackbar open={snackbar} onClose={() => setSnackbar(false)} multiLine actionColor="red">
        I&apos;m a multi-line snackbar.
      </VSnackbar>
    </Box>
  );
}

function TimeoutExample() {
  const [snackbar, setSnackbar] = useState(false);
  return (
    <Box sx={{ textAlign: "center" }}>
      <VButton dark color="orange darken-2" onClick={() => setSnackbar(true)}>Open Snackbar</VButton>
      <VSnackbar open={snackbar} onClose={() => setSnackbar(false)} timeout={2000} actionColor="blue">
        My timeout is set to 2000.
      </VSnackbar>
    </Box>
  );
}

function VerticalExample() {
  const [snackbar, setSnackbar] = useState(false);
  return (
    <Box sx={{ textAlign: "center" }}>
      <VButton dark color="indigo" onClick={() => setSnackbar(true)}>Open Snackbar</VButton>
      <VSnackbar open={snackbar} onClose={() => setSnackbar(false)} vertical actionColor="indigo">
        Lorem ipsum dolor sit amet
      </VSnackbar>
    </Box>
  );
}

function VariantsExample() {
  return (
    <Card sx={{ height: 300, position: "relative", boxShadow: "none", borderRadius: 0, bgcolor: "#fff", overflow: "hidden" }}>
      <VSnackbar staticOpen absolute top left shaped timeout={-1}>
        Lorem ipsum dolor sit amet consectetur.
      </VSnackbar>
      <VSnackbar staticOpen absolute top right rounded="pill" color="blue-grey" timeout={-1}>
        Lorem ipsum dolor sit amet consectetur.
      </VSnackbar>
      <VSnackbar staticOpen absolute centered color="deep-purple accent-4" elevation={24} timeout={-1}>
        Lorem ipsum dolor sit amet consectetur.
      </VSnackbar>
      <VSnackbar staticOpen absolute bottom left color="primary" textVariant timeout={-1}>
        Lorem ipsum dolor sit amet consectetur.
      </VSnackbar>
      <VSnackbar staticOpen absolute bottom right color="success" outlined timeout={-1}>
        Lorem ipsum dolor sit amet consectetur.
      </VSnackbar>
    </Card>
  );
}

function VSnackbar({
  children,
  open = false,
  staticOpen = false,
  onClose,
  timeout = 5000,
  top = false,
  bottom,
  left = false,
  right = false,
  centered = false,
  absolute = false,
  multiLine = false,
  vertical = false,
  color,
  actionColor,
  textVariant = false,
  outlined = false,
  shaped = false,
  rounded,
  elevation = 6,
}: {
  children: ReactNode;
  open?: boolean;
  staticOpen?: boolean;
  onClose?: () => void;
  timeout?: number;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  centered?: boolean;
  absolute?: boolean;
  multiLine?: boolean;
  vertical?: boolean;
  color?: string;
  actionColor?: string;
  textVariant?: boolean;
  outlined?: boolean;
  shaped?: boolean;
  rounded?: "pill";
  elevation?: number;
}) {
  const active = staticOpen || open;
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    window.clearTimeout(timer.current);
    if (!active || staticOpen || timeout === -1 || timeout === 0) return;
    timer.current = window.setTimeout(() => onClose?.(), timeout);
    return () => window.clearTimeout(timer.current);
  }, [active, onClose, staticOpen, timeout]);

  const hasBackground = !textVariant && !outlined;
  const snackbarBottom = bottom ?? !top;
  const baseColor = colorValue(color);
  const textColor = hasBackground ? "hsla(0,0%,100%,.87)" : baseColor;
  const background = hasBackground ? baseColor : "transparent";

  return (
    <Box
      className="v-snack"
      sx={{
        alignItems: centered ? "center" : top ? "flex-start" : "flex-end",
        bottom: 0,
        display: "flex",
        fontSize: 14,
        height: absolute ? "100%" : "100vh",
        justifyContent: centered ? "center" : left ? "flex-start" : right ? "flex-end" : "center",
        left: 0,
        pointerEvents: "none",
        position: absolute ? "absolute" : "fixed",
        right: 0,
        top: 0,
        width: "100%",
        zIndex: absolute ? 1 : 1000,
      }}
    >
      <Box
        className="v-snack__wrapper"
        sx={{
          alignItems: "center",
          bgcolor: background,
          border: outlined ? `1px solid ${baseColor}` : 0,
          borderColor: "currentColor",
          borderRadius: rounded === "pill" ? 999 : shaped ? "24px 4px" : 1,
          boxShadow: hasBackground ? (elevation >= 24 ? elevation24 : elevation6) : "none",
          color: textColor,
          display: "flex",
          flexDirection: vertical ? "column" : "row",
          margin: "8px",
          maxWidth: 672,
          minHeight: vertical ? 48 : multiLine ? 68 : 48,
          minWidth: 344,
          opacity: active ? 1 : 0,
          overflow: "hidden",
          padding: 0,
          pointerEvents: active ? "auto" : "none",
          position: "relative",
          transform: active ? "scale(1)" : "scale(.8)",
          transition: "opacity .15s linear, transform .15s cubic-bezier(0,0,.2,1)",
          visibility: active ? "visible" : "hidden",
          ...(textVariant
            ? {
                "&::before": {
                  bgcolor: "currentColor",
                  borderRadius: "inherit",
                  bottom: 0,
                  content: "''",
                  left: 0,
                  opacity: 0.12,
                  pointerEvents: "none",
                  position: "absolute",
                  right: 0,
                  top: 0,
                },
              }
            : {}),
        }}
      >
        <Box
          className="v-snack__content"
          role="status"
          aria-live="polite"
          sx={{
            flexGrow: 1,
            fontSize: 14,
            fontWeight: 400,
            letterSpacing: "0.0178571429em",
            lineHeight: "20px",
            mr: "auto",
            p: "14px 16px",
            textAlign: "initial",
          }}
        >
          {children}
        </Box>
        {onClose && (
          <Box className="v-snack__action" sx={{ alignItems: "center", alignSelf: vertical ? "flex-end" : "center", display: "flex", mb: vertical ? 1 : 0, mr: 1 }}>
            <Button
              onClick={onClose}
              sx={{
                color: colorValue(actionColor) || "#fff",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.0892857143em",
                minWidth: "auto",
                px: 1,
                textTransform: "uppercase",
              }}
            >
              Close
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function VButton({ children, color, dark, onClick }: { children: ReactNode; color?: string; dark?: boolean; onClick?: () => void }) {
  return (
    <Button
      onClick={onClick}
      sx={{
        bgcolor: colorValue(color) || "#f5f5f5",
        borderRadius: 1,
        boxShadow: elevation2,
        color: dark ? "#fff" : "rgba(0,0,0,.87)",
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: "0.0892857143em",
        minWidth: 64,
        px: 2,
        textTransform: "uppercase",
        "&:hover": { bgcolor: colorValue(color) || "#eeeeee", filter: "brightness(.96)" },
      }}
    >
      {children}
    </Button>
  );
}

const elevation2 = "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)";

function ExampleSection({
  title,
  description,
  source,
  newIn,
  children,
}: {
  title: string;
  description: ReactNode;
  source: ExampleKey;
  newIn?: string;
  children: () => ReactNode;
}) {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <VuetifyExampleBlock title={title} source={source} description={description} newIn={newIn}>
        {children}
      </VuetifyExampleBlock>
    </Box>
  );
}

function VuetifyExampleBlock({ title = "", description, source, newIn, children }: { title?: string; description: ReactNode; source: ExampleKey; newIn?: string; children: () => ReactNode }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card sx={{ mb: 5, bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
        <Typography sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>{title}</Typography>
        {newIn && (
          <Chip
            size="small"
            icon={<Star sx={{ fontSize: "14px !important" }} />}
            label={<span>New in <strong>{newIn}</strong></span>}
            sx={{ ml: title ? 2 : 0, bgcolor: "#fb8c00", color: "#fff", height: 24, "& .MuiChip-icon": { color: "#fff" } }}
          />
        )}
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

function BaseHeading({ id, children }: { id: string; children: ReactNode }) {
  return <Typography id={id} component="h2" sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400, mb: 2 }}>{children}</Typography>;
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: 0.55, py: 0.18, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: 0.5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

const sourceTemplates: Record<ExampleKey, string> = {
  usage: "src/demo/examples/snackbars/usage.vue",
  "simple/multi-line": "src/demo/examples/snackbars/simple/multi-line.vue",
  "simple/timeout": "src/demo/examples/snackbars/simple/timeout.vue",
  "simple/vertical": "src/demo/examples/snackbars/simple/vertical.vue",
  "simple/variants": "src/demo/examples/snackbars/simple/variants.vue",
};
