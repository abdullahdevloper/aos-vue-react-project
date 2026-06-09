import { useEffect, useRef, useState, type ReactNode } from "react";
import { Box, Button, Card, Collapse, IconButton, LinearProgress, Stack, Switch, Toolbar, Tooltip, Typography } from "@mui/material";
import { ArrowDropDown, Code, GitHub, InvertColors, ViewHeadline } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const success = "#4caf50";
const error = "#ff5252";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 16, md: 20 }, lineHeight: 1.55, fontWeight: 300, mb: 3, color: "text.secondary" };
const sectionHeadingSx = { fontSize: { xs: 20, md: 22 }, lineHeight: 1.45, fontWeight: 400, mb: 2.5 };

type OverflowItem = string | { text: string; callback?: () => void };

interface Example {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  minHeight: number;
  render: () => ReactNode;
}

const fontItems = ["Arial", "Calibri", "Courier", "Verdana"];
const editItems = [{ text: "100%" }, { text: "75%" }, { text: "50%" }, { text: "25%" }, { text: "0%" }];
const iconItems = [{ text: "list" }, { text: "favorite" }, { text: "delete" }];

export default function OverflowButtonsPage() {
  return (
    <DocPage
      title="OverflowBtns"
      namespace="Components"
      icon={<ViewHeadline />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Overflow Buttons" },
      ]}
    >
      <DocText>
        <CodePill>v-overflow-btn</CodePill> is used to give the user the ability to select items from the list. It has 3 variations: <CodePill>editable</CodePill>, <CodePill>overflow</CodePill> and <CodePill>segmented</CodePill>
      </DocText>
      <UsageSection />
      <Stack spacing={1.5} sx={{ mb: 4 }}>
        <AppAlert severity="error">When using objects for the <strong>items</strong> prop, you must associate <strong>item-text</strong> and <strong>item-value</strong> with existing properties on your objects. These values are defaulted to <strong>text</strong> and <strong>value</strong> and can be changed.</AppAlert>
        <AppAlert severity="warning">The <strong>auto</strong> property of <strong>menu-props</strong> is only supported for the default input style.</AppAlert>
      </Stack>
      <PlaygroundSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <Typography variant="h5" sx={sectionHeadingSx}>Usage</Typography>
      <VuetifyExampleBlock title="" description={<><CodePill>v-overflow-btn</CodePill> is used for creating selection lists</>} source="usage" minHeight={168}>
        {() => <OverflowContainer><VOverflowBtn items={fontItems} label="Overflow Btn" /></OverflowContainer>}
      </VuetifyExampleBlock>
    </Box>
  );
}

function PlaygroundSection() {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <Typography variant="h5" sx={sectionHeadingSx}>Playground</Typography>
      <VuetifyExampleBlock title="" description="" source="playground" minHeight={398}>
        {() => <PlaygroundExample />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function PlaygroundExample() {
  const [editable, setEditable] = useState(false);
  const [segmented, setSegmented] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [filled, setFilled] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [dense, setDense] = useState(false);
  const [persistentHint, setPersistentHint] = useState(false);
  const [topMenu, setTopMenu] = useState(false);
  return (
    <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", width: "100%" }}>
        <VSwitch label="Editable" checked={editable} onChange={setEditable} />
        <VSwitch label="Segmented" checked={segmented} onChange={setSegmented} />
        <VSwitch label="Loading" checked={loading} onChange={setLoading} />
        <VSwitch label="Disabled" checked={disabled} onChange={setDisabled} />
        <VSwitch label="Readonly" checked={readonly} onChange={setReadonly} />
        <VSwitch label="Filled" checked={filled} onChange={setFilled} />
        <VSwitch label="Reverse" checked={reverse} onChange={setReverse} />
        <VSwitch label="Dense" checked={dense} onChange={setDense} />
        <VSwitch label="Persistent hint" checked={persistentHint} onChange={setPersistentHint} />
        <VSwitch label="Menu to top" checked={topMenu} onChange={setTopMenu} />
      </Box>
      <OverflowContainer>
        <VOverflowBtn
          items={fontItems.map((text) => ({ text }))}
          label="Overflow Btn"
          editable={editable}
          segmented={segmented}
          loading={loading}
          disabled={disabled}
          readonly={readonly}
          filled={filled}
          reverse={reverse}
          dense={dense}
          persistentHint={persistentHint}
          hint="I'm a hint"
          menuTop={topMenu}
        />
      </OverflowContainer>
    </Box>
  );
}

function ExamplesSection() {
  return (
    <Box component="section">
      <Typography variant="h5" sx={sectionHeadingSx}>Examples</Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>Below is a collection of simple to complex examples.</Typography>
      <Stack spacing={5}>
        {examples.map((example) => (
          <VuetifyExampleBlock key={example.title} title={example.title} description={example.description} source={example.source} minHeight={example.minHeight}>
            {example.render}
          </VuetifyExampleBlock>
        ))}
      </Stack>
    </Box>
  );
}

function OverflowContainer({ children }: { children: ReactNode }) {
  return <Box sx={{ width: "100%", px: { xs: 1.5, md: 3 }, py: 1.5, my: 1 }}>{children}</Box>;
}

function VOverflowBtn({
  items,
  label,
  editable = false,
  segmented = false,
  loading = false,
  disabled = false,
  readonly = false,
  filled = false,
  reverse = false,
  dense = false,
  persistentHint = false,
  hint,
  menuTop = false,
  counter = false,
}: {
  items: OverflowItem[];
  label: string;
  editable?: boolean;
  segmented?: boolean;
  loading?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  filled?: boolean;
  reverse?: boolean;
  dense?: boolean;
  persistentHint?: boolean;
  hint?: string;
  menuTop?: boolean;
  counter?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [text, setText] = useState("");
  const display = editable ? text : value;
  const active = open || Boolean(display);
  const canOpen = !disabled && !readonly;
  const height = dense ? 48 : 56;

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const selectItem = (item: OverflowItem) => {
    const next = typeof item === "string" ? item : item.text;
    setValue(next);
    setText(next);
    setOpen(false);
    if (typeof item !== "string") item.callback?.();
  };

  return (
    <Box ref={rootRef} sx={{ position: "relative", width: "100%", maxWidth: 528, opacity: disabled ? .52 : 1 }}>
      <Box
        onClick={() => canOpen && !editable && setOpen((current) => !current)}
        sx={{
          minHeight: height,
          display: "flex",
          flexDirection: reverse ? "row-reverse" : "row",
          alignItems: "stretch",
          bgcolor: filled ? "rgba(0,0,0,.06)" : "transparent",
          borderBottom: filled ? 0 : `1px solid ${open ? primary : "rgba(0,0,0,.42)"}`,
          cursor: canOpen && !editable ? "pointer" : "default",
          position: "relative",
          "&:hover": { borderBottomColor: canOpen ? "rgba(0,0,0,.87)" : undefined },
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0, px: filled ? 1.5 : 0, pt: active ? .75 : 2, pb: .3 }}>
          <Typography sx={{ fontSize: active ? 12 : 16, color: open ? primary : "rgba(0,0,0,.6)", lineHeight: 1.1 }}>{label}</Typography>
          {editable ? (
            <Box
              component="input"
              value={text}
              readOnly={readonly}
              disabled={disabled}
              onFocus={() => canOpen && setOpen(true)}
              onChange={(event) => setText(event.target.value)}
              sx={{ width: "100%", height: dense ? 22 : 30, border: 0, outline: 0, bgcolor: "transparent", p: 0, fontSize: 16, color: "rgba(0,0,0,.87)" }}
            />
          ) : (
            <Typography sx={{ height: dense ? 22 : 30, display: "flex", alignItems: "center", fontSize: 16, color: "rgba(0,0,0,.87)" }}>{display}</Typography>
          )}
        </Box>
        <Box
          onClick={(event) => {
            event.stopPropagation();
            if (canOpen) setOpen((current) => !current);
          }}
          sx={{
            width: segmented ? 56 : 42,
            borderLeft: segmented && !reverse ? "1px solid rgba(0,0,0,.12)" : 0,
            borderRight: segmented && reverse ? "1px solid rgba(0,0,0,.12)" : 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: canOpen ? "rgba(0,0,0,.54)" : "rgba(0,0,0,.38)",
          }}
        >
          <ArrowDropDown sx={{ fontSize: 24, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 180ms ease" }} />
        </Box>
        {loading && <LinearProgress sx={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 2, bgcolor: "rgba(0,0,0,.08)", "& .MuiLinearProgress-bar": { bgcolor: primary } }} />}
      </Box>
      <Box sx={{ minHeight: 18, display: "flex", justifyContent: "space-between", mt: .45 }}>
        <Typography sx={{ fontSize: 12, color: "rgba(0,0,0,.6)" }}>{persistentHint || hint && open ? hint : ""}</Typography>
        {counter && <Typography sx={{ fontSize: 12, color: "rgba(0,0,0,.6)" }}>{display.length}</Typography>}
      </Box>
      <Collapse in={open && canOpen} timeout={130} unmountOnExit>
        <Box
          sx={{
            position: "absolute",
            zIndex: 12,
            left: 0,
            right: 0,
            top: menuTop ? "auto" : "calc(100% - 16px)",
            bottom: menuTop ? "calc(100% - 2px)" : "auto",
            bgcolor: "#fff",
            boxShadow: "0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)",
            borderRadius: .5,
            overflow: "hidden",
            py: .5,
          }}
        >
          {items.map((item) => {
            const textValue = typeof item === "string" ? item : item.text;
            const selected = textValue === value;
            return (
              <Box
                key={textValue}
                onClick={() => selectItem(item)}
                sx={{
                  minHeight: dense ? 40 : 48,
                  px: 2,
                  display: "flex",
                  alignItems: "center",
                  fontSize: 16,
                  color: selected ? primary : "rgba(0,0,0,.87)",
                  bgcolor: selected ? "rgba(0,151,167,.08)" : "transparent",
                  cursor: "pointer",
                  "&:hover": { bgcolor: selected ? "rgba(0,151,167,.12)" : "rgba(0,0,0,.04)" },
                }}
              >
                {textValue}
              </Box>
            );
          })}
        </Box>
      </Collapse>
    </Box>
  );
}

function VSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", m: 2 }}>
      <Switch checked={checked} onChange={(event) => onChange(event.target.checked)} sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: primary }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: primary } }} />
      <Typography sx={{ fontSize: 16 }}>{label}</Typography>
    </Box>
  );
}

function AppAlert({ severity, children }: { severity: "error" | "warning"; children: ReactNode }) {
  const color = severity === "error" ? "#ff5252" : "#fb8c00";
  return <Box sx={{ borderLeft: `4px solid ${color}`, bgcolor: "#eeeeee", color: "text.secondary", px: 2, py: 1.5, fontSize: 15, lineHeight: 1.55 }}>{children}</Box>;
}

function VuetifyExampleBlock({ title, description, source, children, minHeight }: { title: string; description: ReactNode; source: keyof typeof sourceTemplates; children: () => ReactNode; minHeight: number }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, alignItems: "center", px: 2, bgcolor: "transparent" }}>
        <Typography sx={{ fontSize: 20, fontWeight: 400, lineHeight: 1.35 }}>{title}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", maxHeight: { xs: "none", sm: "calc(100vh - 275px)" }, overflowY: "auto", p: 2 }}>
          <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box>
        </Box>
      </Collapse>
      <Box sx={{ px: 2, py: 2, minHeight, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit" }}>
        {description && <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography>}
        {children()}
      </Box>
    </Card>
  );
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: .55, py: .18, borderRadius: .75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: .5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

const examples: Example[] = [
  { title: "Counter", description: <>You can add a counter to <CodePill>v-overflow-btn</CodePill> to control the max char count</>, source: "simple/counter", minHeight: 168, render: () => <OverflowContainer><VOverflowBtn items={editItems} label="Overflow Btn w/ counter" counter /></OverflowContainer> },
  { title: "Disabled", description: <><CodePill>v-overflow-btn</CodePill> can be disabled in order to prevent a user from interacting with it</>, source: "simple/disabled", minHeight: 168, render: () => <OverflowContainer><VOverflowBtn items={fontItems} label="Overflow Btn w/ disabled" disabled /></OverflowContainer> },
  { title: "Dense", description: <>You can use <CodePill>dense</CodePill> prop to reduce overflow button height and lower max height of list items.</>, source: "simple/dense", minHeight: 158, render: () => <OverflowContainer><VOverflowBtn items={fontItems} label="Overflow Btn - Dense" dense /></OverflowContainer> },
  { title: "Editable", description: <><CodePill>editable</CodePill> <CodePill>v-overflow-btn</CodePill> can be directly edited, just as <CodePill>v-text-field</CodePill></>, source: "simple/editable", minHeight: 168, render: () => <OverflowContainer><VOverflowBtn items={editItems} label="Overflow Btn w/ editable" editable /></OverflowContainer> },
  { title: "Filled", description: <>Text fields can be used with an alternative box design. Append and prepend icon props are <strong>not</strong> supported in this mode.</>, source: "simple/filled", minHeight: 168, render: () => <OverflowContainer><VOverflowBtn items={fontItems} label="Overflow Btn - filled" filled /></OverflowContainer> },
  { title: "Hint", description: <>You can add a hint for the user using the <CodePill>hint</CodePill> property</>, source: "simple/hint", minHeight: 178, render: () => <OverflowContainer><VOverflowBtn items={fontItems} label="Overflow Btn w/ hint" hint="Select font" menuTop /></OverflowContainer> },
  { title: "Loading", description: <><CodePill>v-overflow-btn</CodePill> can have <CodePill>loading</CodePill> state with a linear progress bar under them</>, source: "simple/loading", minHeight: 168, render: () => <OverflowContainer><VOverflowBtn items={fontItems} label="Overflow Btn w/ loading" loading /></OverflowContainer> },
  { title: "Menu props", description: <>You can set underlying <CodePill>v-menu</CodePill> props using <CodePill>menu-props</CodePill> property</>, source: "simple/menu-props", minHeight: 178, render: () => <OverflowContainer><VOverflowBtn items={fontItems} label="Overflow Btn w/ menu-props" menuTop /></OverflowContainer> },
  { title: "Read-only", description: <><CodePill>v-overflow-btn</CodePill> can be put into <CodePill>readonly</CodePill> mode, it'll become inactive but won't change the color</>, source: "simple/readonly", minHeight: 168, render: () => <OverflowContainer><VOverflowBtn items={fontItems} label="Overflow Btn w/ readonly" readonly /></OverflowContainer> },
  { title: "Segmented", description: <><CodePill>segmented</CodePill> <CodePill>v-overflow-btn</CodePill> has and additional divider between the content and the icon</>, source: "simple/segmented", minHeight: 168, render: () => <OverflowContainer><VOverflowBtn items={iconItems} label="Overflow Btn w/ segmented" segmented /></OverflowContainer> },
];

const sourceTemplates = {
  usage: "src/demo/examples/overflow-btns/usage.vue",
  playground: "src/demo/examples/overflow-btns/playground.vue",
  "simple/counter": "src/demo/examples/overflow-btns/simple/counter.vue",
  "simple/disabled": "src/demo/examples/overflow-btns/simple/disabled.vue",
  "simple/dense": "src/demo/examples/overflow-btns/simple/dense.vue",
  "simple/editable": "src/demo/examples/overflow-btns/simple/editable.vue",
  "simple/filled": "src/demo/examples/overflow-btns/simple/filled.vue",
  "simple/hint": "src/demo/examples/overflow-btns/simple/hint.vue",
  "simple/loading": "src/demo/examples/overflow-btns/simple/loading.vue",
  "simple/menu-props": "src/demo/examples/overflow-btns/simple/menu-props.vue",
  "simple/readonly": "src/demo/examples/overflow-btns/simple/readonly.vue",
  "simple/segmented": "src/demo/examples/overflow-btns/simple/segmented.vue",
};
