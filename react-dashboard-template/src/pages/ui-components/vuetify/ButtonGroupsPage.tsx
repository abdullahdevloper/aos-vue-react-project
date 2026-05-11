import { useState, type PointerEvent, type ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Code,
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatColorFill,
  FormatColorText,
  FormatItalic,
  FormatUnderlined,
  GitHub,
  InvertColors,
  KeyboardArrowDown,
  ViewColumn,
} from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };

type ToggleValue = string | number;

interface ButtonRipple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface ButtonGroupsExample {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  minHeight: number;
  render: (inverted: boolean) => ReactNode;
}

export default function ButtonGroupsPage() {
  return (
    <DocPage
      title="ButtonGroups"
      namespace="Components"
      icon={<ViewColumn />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Button Groups" },
      ]}
    >
      <DocText>
        The <CodePill>v-btn-toggle</CodePill> component is a simple wrapper for <CodePill>v-item-group</CodePill> built specifically to work with <CodePill>v-btn</CodePill>.
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
        Toggle buttons allow you to create a styled group of buttons that can selected or toggled under a single <CodePill>v-model</CodePill>
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
          <UsageToggleGrid inverted={inverted} />
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
        {buttonGroupsExamples.map((example) => (
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
        <Tooltip title="View on Github"><IconButton size="small" aria-label="View on Github" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton size="small" aria-label="View source" aria-expanded={sourceOpen} onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", maxHeight: { xs: "none", sm: "calc(100vh - 275px)" }, overflowY: "auto", p: 2 }}>
          <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', 'SFMono-Regular', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap", color: "#f8f8f2" }}>{sourceTemplates[source]}</Box>
        </Box>
      </Collapse>
      <Box sx={{ px: { xs: 3, md: 4 }, py: { xs: 3.5, md: 4.25 }, minHeight, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", transition: "background-color 180ms ease, color 180ms ease" }}>
        <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: 16.5, fontWeight: 300, lineHeight: 1.7, mb: 3 }}>{description}</Typography>
        {children(inverted)}
      </Box>
    </Card>
  );
}

function UsageToggleGrid({ inverted }: { inverted: boolean }) {
  const [exclusive, setExclusive] = useState<ToggleValue | null>(2);
  const [multiple, setMultiple] = useState<ToggleValue[]>([0, 1, 2]);
  const [none, setNone] = useState<ToggleValue | null>(null);
  const [mandatory, setMandatory] = useState<ToggleValue | null>(0);
  const [text, setText] = useState<ToggleValue | null>("center");
  const [icon, setIcon] = useState<ToggleValue | null>("justify");

  return (
    <Grid container>
      <UsageCell title="Exclusive"><VBtnToggle value={exclusive} onChange={setExclusive} buttons={alignIconButtons()} inverted={inverted} /></UsageCell>
      <UsageCell title="Multiple"><VBtnToggle multiple dense primaryDark value={multiple} onMultipleChange={setMultiple} buttons={formatIconButtons()} inverted={inverted} /></UsageCell>
      <UsageCell title="No Options Selected"><VBtnToggle value={none} onChange={setNone} buttons={alignIconButtons()} inverted={inverted} /></UsageCell>
      <UsageCell title="Mandatory"><VBtnToggle mandatory shaped value={mandatory} onChange={setMandatory} buttons={alignIconButtons()} inverted={inverted} /></UsageCell>
      <UsageCell title="Text Options"><VBtnToggle group tile color="#651fff" value={text} onChange={setText} buttons={textButtons()} inverted={inverted} /></UsageCell>
      <UsageCell title="Text & Icon Options"><VBtnToggle borderless value={icon} onChange={setIcon} buttons={textIconButtons()} inverted={inverted} /></UsageCell>
    </Grid>
  );
}

function UsageCell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Grid item xs={12} sm={6} sx={{ py: 1 }}>
      <Typography component="p" sx={{ m: "0 0 16px", fontSize: 16, color: "inherit" }}>{title}</Typography>
      {children}
    </Grid>
  );
}

function SimpleCenteredExample({ kind }: { kind: "rounded" | "mandatory" | "multiple" }) {
  const [single, setSingle] = useState<ToggleValue | null>(null);
  const [multiple, setMultiple] = useState<ToggleValue[]>([]);
  const title = kind === "rounded" ? "Rounded" : kind === "mandatory" ? "Mandatory" : "Multiple";

  return (
    <Card sx={{ boxShadow: "none", py: 6, bgcolor: "transparent" }}>
      <Box sx={{ px: 2 }}>
        <Stack alignItems="center" justifyContent="center">
          <Typography component="p" sx={{ width: "100%", textAlign: "center", mb: 2 }}>{title}</Typography>
          {kind === "multiple" ? (
            <>
              <VBtnToggle multiple value={multiple} onMultipleChange={setMultiple} buttons={alignIconButtons()} />
              <Typography sx={{ mt: 3, textAlign: "center" }}>Model: {formatModel(multiple)}</Typography>
            </>
          ) : (
            <VBtnToggle rounded={kind === "rounded"} mandatory={kind === "mandatory"} value={single} onChange={setSingle} buttons={alignIconButtons()} />
          )}
        </Stack>
      </Box>
    </Card>
  );
}

function ToolbarExample() {
  const [font, setFont] = useState("");
  const [size, setSize] = useState("");
  const [multi, setMulti] = useState<ToggleValue[]>([1, 2, 3]);
  const [exclusive, setExclusive] = useState<ToggleValue | null>(2);

  return (
    <Toolbar variant="dense" sx={{ minHeight: 48, bgcolor: "#fff", color: "rgba(0,0,0,.87)", p: 0, overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,.18)" }}>
      <OverflowButton label="Select font" value={font} items={["Arial", "Calibri", "Courier", "Verdana"]} onChange={setFont} />
      <Divider orientation="vertical" flexItem />
      <Box sx={{ display: { xs: "none", md: "contents" } }}>
        <OverflowButton editable label="Select size" value={size} items={["100%", "75%", "50%", "25%", "0%"]} onChange={setSize} />
        <Divider orientation="vertical" flexItem />
        <Box sx={{ flexGrow: 1 }} />
        <VBtnToggle dense group multiple color="#0097a7" value={multi} onMultipleChange={setMulti} buttons={formatIconButtons([1, 2, 3, 4])} />
        <Box sx={{ mx: 2 }} />
        <VBtnToggle dense group color="#0097a7" value={exclusive} onChange={setExclusive} buttons={alignIconButtons([1, 2, 3, 4])} />
      </Box>
    </Toolbar>
  );
}

function QwertyExample() {
  const [value, setValue] = useState("Toggle button requirements.\r\rHave at least three toggle buttons in a group\rLabel buttons with text, an icon, or");
  const [formatting, setFormatting] = useState<ToggleValue[]>([]);
  const [alignment, setAlignment] = useState<ToggleValue | null>(1);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const letters = "qwertyuiop".split("");

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", borderRadius: 0.5, boxShadow: "0 2px 4px rgba(0,0,0,.18)", overflow: "hidden" }}>
      <TextField value={value} onChange={(event) => setValue(event.target.value)} fullWidth multiline minRows={2} variant="standard" sx={{ px: 2, pt: 1.2, "& textarea": { fontSize: 16, lineHeight: 1.45 }, "& .MuiInput-root:before": { borderBottomColor: "rgba(0,0,0,.42)" } }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", px: 2, pb: 2, pt: 1, m: 0, gap: 1, flexWrap: "wrap" }}>
        <VBtnToggle multiple value={formatting} onMultipleChange={setFormatting} buttons={qwertyFormatButtons()} />
        <VBtnToggle value={alignment} onChange={setAlignment} buttons={qwertyAlignButtons()} />
      </Box>
      <Box sx={{ p: 2, textAlign: "center", bgcolor: "#eeeeee" }}>
        <Grid container spacing={0} sx={{ mb: 1 }}>
          {numbers.map((number) => <Grid item xs key={number}><Typography sx={{ fontSize: 12, color: "#757575" }}>{number}</Typography></Grid>)}
        </Grid>
        <Grid container spacing={0}>
          {letters.map((letter) => <Grid item xs key={letter}><Typography sx={{ fontSize: 20, color: "#616161", fontWeight: 400 }}>{letter}</Typography></Grid>)}
        </Grid>
      </Box>
    </Card>
  );
}

interface ToggleButtonConfig {
  value: ToggleValue;
  label?: ReactNode;
  icon?: ReactNode;
}

function VBtnToggle({
  value,
  onChange,
  multiple = false,
  onMultipleChange,
  buttons,
  rounded = false,
  mandatory = false,
  shaped = false,
  dense = false,
  primaryDark = false,
  group = false,
  tile = false,
  borderless = false,
  color = "#0097a7",
  inverted = false,
}: {
  value: ToggleValue | ToggleValue[] | null;
  onChange?: (value: ToggleValue | null) => void;
  multiple?: boolean;
  onMultipleChange?: (value: ToggleValue[]) => void;
  buttons: ToggleButtonConfig[];
  rounded?: boolean;
  mandatory?: boolean;
  shaped?: boolean;
  dense?: boolean;
  primaryDark?: boolean;
  group?: boolean;
  tile?: boolean;
  borderless?: boolean;
  color?: string;
  inverted?: boolean;
}) {
  const currentArray = Array.isArray(value) ? value : [];
  const activeBg = primaryDark ? "rgba(255,255,255,.24)" : group ? `${color}1f` : inverted ? "rgba(255,255,255,.16)" : "rgba(0,0,0,.12)";

  const select = (next: ToggleValue) => {
    if (multiple) {
      const exists = currentArray.includes(next);
      onMultipleChange?.(exists ? currentArray.filter((item) => item !== next) : [...currentArray, next]);
      return;
    }
    if (value === next && !mandatory) {
      onChange?.(null);
      return;
    }
    onChange?.(next);
  };

  return (
    <Box sx={{ display: "inline-flex", verticalAlign: "middle", borderRadius: rounded ? 999 : shaped ? "16px 4px" : tile ? 0 : 1, overflow: "hidden", bgcolor: primaryDark ? "#0097a7" : group || borderless ? "transparent" : inverted ? "#424242" : "#fff", boxShadow: group || borderless ? "none" : "0 2px 4px rgba(0,0,0,.18)", border: group || borderless ? "none" : "1px solid rgba(0,0,0,.12)" }}>
      {buttons.map((button, index) => {
        const selected = multiple ? currentArray.includes(button.value) : value === button.value;
        return (
          <VToggleButton
            key={button.value}
            selected={selected}
            dense={dense}
            group={group}
            borderless={borderless}
            first={index === 0}
            activeBg={activeBg}
            selectedColor={primaryDark ? "#fff" : group ? color : inverted ? "#fff" : "rgba(0,0,0,.87)"}
            color={primaryDark ? "rgba(255,255,255,.82)" : inverted ? "rgba(255,255,255,.72)" : "rgba(0,0,0,.72)"}
            onClick={() => select(button.value)}
          >
            {button.label}
            {button.icon}
          </VToggleButton>
        );
      })}
    </Box>
  );
}

function VToggleButton({
  children,
  selected,
  dense,
  group,
  borderless,
  first,
  activeBg,
  selectedColor,
  color,
  onClick,
}: {
  children: ReactNode;
  selected: boolean;
  dense?: boolean;
  group?: boolean;
  borderless?: boolean;
  first?: boolean;
  activeBg: string;
  selectedColor: string;
  color: string;
  onClick: () => void;
}) {
  const [ripples, setRipples] = useState<ButtonRipple[]>([]);
  const handleRipple = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.15;
    const ripple = { id: window.performance.now(), x: event.clientX - rect.left - size / 2, y: event.clientY - rect.top - size / 2, size };
    setRipples((current) => [...current.slice(-3), ripple]);
    window.setTimeout(() => setRipples((current) => current.filter((item) => item.id !== ripple.id)), 620);
  };

  return (
    <Button
      disableRipple
      onPointerDown={handleRipple}
      onClick={onClick}
      sx={{
        minWidth: dense ? 40 : 48,
        height: dense ? 36 : 48,
        px: children && typeof children === "string" ? 2 : 1.35,
        py: 0,
        borderRadius: 0,
        borderLeft: first || group || borderless ? "none" : "1px solid rgba(0,0,0,.12)",
        bgcolor: selected ? activeBg : "transparent",
        color: selected ? selectedColor : color,
        textTransform: "none",
        fontSize: 14,
        overflow: "hidden",
        position: "relative",
        boxShadow: "none",
        "&:hover": { bgcolor: selected ? activeBg : "rgba(0,0,0,.04)", boxShadow: "none" },
        "& svg": { fontSize: 24, position: "relative", zIndex: 1 },
        "@keyframes vuse-toggle-ripple": {
          "0%": { transform: "scale(0)", opacity: 0.25 },
          "65%": { opacity: 0.16 },
          "100%": { transform: "scale(1)", opacity: 0 },
        },
      }}
    >
      <Box component="span" sx={{ position: "relative", zIndex: 1, display: "inline-flex", alignItems: "center", gap: 0.75 }}>{children}</Box>
      {ripples.map((ripple) => <Box key={ripple.id} component="span" sx={{ position: "absolute", left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size, borderRadius: "50%", bgcolor: "rgba(0,0,0,.18)", opacity: 0, transform: "scale(0)", pointerEvents: "none", animation: "vuse-toggle-ripple 620ms cubic-bezier(.25,.8,.5,1)" }} />)}
    </Button>
  );
}

function OverflowButton({ label, value, items, editable = false, onChange }: { label: string; value: string; items: string[]; editable?: boolean; onChange: (value: string) => void }) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <>
      <Button onClick={(event) => setAnchor(event.currentTarget)} sx={{ minWidth: editable ? 180 : 160, height: 48, px: 1.5, borderRadius: 0, justifyContent: "space-between", textTransform: "none", color: value ? "rgba(0,0,0,.87)" : "rgba(0,0,0,.54)", bgcolor: "#fff", "&:hover": { bgcolor: "#fff" } }}>
        <span>{value || label}</span>
        <KeyboardArrowDown sx={{ fontSize: 20 }} />
      </Button>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)} PaperProps={{ sx: { minWidth: anchor?.clientWidth || 160 } }}>
        {items.map((item) => <MenuItem key={item} onClick={() => { onChange(item); setAnchor(null); }}>{item}</MenuItem>)}
      </Menu>
    </>
  );
}

function alignIconButtons(values: ToggleValue[] = [0, 1, 2, 3]): ToggleButtonConfig[] {
  return [
    { value: values[0], icon: <FormatAlignLeft /> },
    { value: values[1], icon: <FormatAlignCenter /> },
    { value: values[2], icon: <FormatAlignRight /> },
    { value: values[3], icon: <FormatAlignJustify /> },
  ];
}

function formatIconButtons(values: ToggleValue[] = [0, 1, 2, 3]): ToggleButtonConfig[] {
  return [
    { value: values[0], icon: <FormatBold /> },
    { value: values[1], icon: <FormatItalic /> },
    { value: values[2], icon: <FormatUnderlined /> },
    { value: values[3], icon: <FormatColorFill /> },
  ];
}

function textButtons(): ToggleButtonConfig[] {
  return ["left", "center", "right", "justify"].map((value) => ({ value, label: `${value[0].toUpperCase()}${value.slice(1)}` }));
}

function textIconButtons(): ToggleButtonConfig[] {
  return [
    { value: "left", label: "Left", icon: <FormatAlignLeft /> },
    { value: "center", label: "Center", icon: <FormatAlignCenter /> },
    { value: "right", label: "Right", icon: <FormatAlignRight /> },
    { value: "justify", label: "Justify", icon: <FormatAlignJustify /> },
  ];
}

function qwertyFormatButtons(): ToggleButtonConfig[] {
  return [
    { value: 0, icon: <FormatItalic /> },
    { value: 1, icon: <FormatBold /> },
    { value: 2, icon: <FormatUnderlined /> },
    { value: 3, icon: <Stack alignItems="center" spacing={0}><FormatColorText /><Box sx={{ mt: "-4px", height: 4, width: 26, bgcolor: "#9c27b0" }} /></Stack> },
  ];
}

function qwertyAlignButtons(): ToggleButtonConfig[] {
  return [
    { value: 0, icon: <FormatAlignCenter /> },
    { value: 1, icon: <FormatAlignLeft /> },
    { value: 2, icon: <FormatAlignRight /> },
  ];
}

function formatModel(values: ToggleValue[]) {
  return values.length ? values.join(",") : "";
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ mx: 0.25, px: 0.6, py: 0.2, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "85%" }}>{children}</Box>;
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

const buttonGroupsExamples: ButtonGroupsExample[] = [
  { title: "Rounded buttons", description: <>You can make <CodePill>VBtnToggle</CodePill> rounded using the <CodePill>rounded</CodePill> prop.</>, source: "rounded", minHeight: 300, render: () => <SimpleCenteredExample kind="rounded" /> },
  { title: "Mandatory", description: <><CodePill>mandatory</CodePill> <CodePill>VBtnToggle</CodePill> always has value.</>, source: "mandatory", minHeight: 300, render: () => <SimpleCenteredExample kind="mandatory" /> },
  { title: "Multiple", description: <><CodePill>multiple</CodePill> <CodePill>VBtnToggle</CodePill> allows user to select multiple variants and returns value as an array.</>, source: "multiple", minHeight: 330, render: () => <SimpleCenteredExample kind="multiple" /> },
  { title: "In toolbar", description: <>Easily integrate customized button solutions with a <CodePill>v-toolbar</CodePill></>, source: "appBar", minHeight: 190, render: () => <ToolbarExample /> },
  { title: "Selected action", description: "Group similar actions and design your own WYSIWYG component.", source: "qwerty", minHeight: 410, render: () => <QwertyExample /> },
];

const sourceTemplates = {
  usage: `<template>
  <v-btn-toggle v-model="toggle_exclusive">...</v-btn-toggle>
  <v-btn-toggle v-model="toggle_multiple" dense background-color="primary" dark multiple>...</v-btn-toggle>
  <v-btn-toggle v-model="toggle_one" shaped mandatory>...</v-btn-toggle>
</template>`,
  rounded: `<template>
  <v-card flat class="py-12">
    <v-btn-toggle v-model="toggle_exclusive" rounded>
      <v-btn><v-icon>mdi-format-align-left</v-icon></v-btn>
      <v-btn><v-icon>mdi-format-align-center</v-icon></v-btn>
      <v-btn><v-icon>mdi-format-align-right</v-icon></v-btn>
      <v-btn><v-icon>mdi-format-align-justify</v-icon></v-btn>
    </v-btn-toggle>
  </v-card>
</template>`,
  mandatory: `<template>
  <v-card flat class="py-12">
    <v-btn-toggle v-model="toggle_exclusive" mandatory>...</v-btn-toggle>
  </v-card>
</template>`,
  multiple: `<template>
  <v-card flat class="py-12">
    <v-btn-toggle v-model="toggle_exclusive" multiple>...</v-btn-toggle>
    <v-col cols="12" class="text-center">Model: {{ toggle_exclusive }}</v-col>
  </v-card>
</template>`,
  appBar: `<template>
  <v-toolbar dense>
    <v-overflow-btn :items="dropdown_font" label="Select font" hide-details class="pa-0"></v-overflow-btn>
    <template v-if="$vuetify.breakpoint.mdAndUp">
      <v-divider vertical></v-divider>
      <v-overflow-btn :items="dropdown_edit" editable label="Select size" hide-details class="pa-0" overflow></v-overflow-btn>
      <v-spacer></v-spacer>
      <v-btn-toggle v-model="toggle_multiple" color="primary" dense group multiple>...</v-btn-toggle>
      <v-btn-toggle v-model="toggle_exclusive" color="primary" dense group>...</v-btn-toggle>
    </template>
  </v-toolbar>
</template>`,
  qwerty: `<template>
  <v-card max-width="400" class="mx-auto">
    <v-textarea v-model="value" auto-grow full-width rows="2"></v-textarea>
    <v-btn-toggle v-model="formatting" multiple>...</v-btn-toggle>
    <v-btn-toggle v-model="alignment">...</v-btn-toggle>
    <v-sheet class="pa-4 text-center" color="grey lighten-3" tile>...</v-sheet>
  </v-card>
</template>`,
};
