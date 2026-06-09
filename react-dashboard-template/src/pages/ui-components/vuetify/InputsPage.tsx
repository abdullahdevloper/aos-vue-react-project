import { useMemo, useState, type ReactNode } from "react";
import { Box, Button, Card, Collapse, IconButton, LinearProgress, Slider, Stack, Switch, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { Add, Close, Code, GitHub, InvertColors, Phone, Remove, ViewList } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const success = "#4caf50";
const error = "#ff5252";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 16, md: 20 }, lineHeight: 1.55, fontWeight: 300, mb: 3, color: "text.secondary" };
const sectionHeadingSx = { fontSize: { xs: 20, md: 22 }, lineHeight: 1.45, fontWeight: 400, mb: 2.5 };

interface Example {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  minHeight: number;
  render: () => ReactNode;
}

export default function InputsPage() {
  return (
    <DocPage
      title="Inputs"
      namespace="Components"
      icon={<ViewList />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Inputs" },
      ]}
    >
      <DocText>
        The <CodePill>v-input</CodePill> component gives you a baseline to create your own custom inputs. It consists of a prepend/append slot, messages, and a default slot. It is <em>recommended</em> that you extend this component, but it can be used as a standalone.
      </DocText>
      <UsageSection />
      <AppAlert>The <CodePill>v-input</CodePill> component is used as a wrapper for all of the Vuetify form controls. It does <strong>NOT</strong> inherit attributes as they are expected to be passed down to inner inputs.</AppAlert>
      <PlaygroundSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <Typography variant="h5" sx={sectionHeadingSx}>
        Usage
      </Typography>
      <VuetifyExampleBlock title="" description="`v-input` has 4 main areas. The prepended slot, the appended slot, the default slot, and messages. These make up the core logic shared between all form components." source="usage" minHeight={185}>
        {() => <UsageInput />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function PlaygroundSection() {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <Typography variant="h5" sx={sectionHeadingSx}>
        Playground
      </Typography>
      <VuetifyExampleBlock title="" description="" source="playground" minHeight={360}>
        {() => <InputPlayground />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function ExamplesSection() {
  return (
    <Box component="section">
      <Typography variant="h5" sx={sectionHeadingSx}>
        Examples
      </Typography>
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

function UsageInput() {
  return (
    <Box id="input-usage" sx={{ width: "100%" }}>
      <VInput dashed messages={["Messages"]} prependIcon={<Phone />} appendIcon={<Close />}>
        Default Slot
      </VInput>
    </Box>
  );
}

function InputPlayground() {
  const [successState, setSuccessState] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [hideDetails, setHideDetails] = useState(false);
  const [persistentHint, setPersistentHint] = useState(true);
  const [errorCount, setErrorCount] = useState(1);
  const errorMessages = errorState ? ["Error", "Another one", "One more", "All the errors"].slice(0, errorCount) : [];
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", width: "100%", mb: 1 }}>
        <Box sx={{ width: "100%", px: 1.5, mb: 1 }}>
          <VSlider label="Max error count" value={errorCount} onChange={setErrorCount} min={0} max={4} />
        </Box>
        <VSwitch label="Success" checked={successState} onChange={setSuccessState} />
        <VSwitch label="Error" checked={errorState} onChange={setErrorState} />
        <VSwitch label="Hide details" checked={hideDetails} onChange={setHideDetails} />
        <VSwitch label="Persistent hint" checked={persistentHint} onChange={setPersistentHint} />
        <Box sx={{ width: "100%", display: "flex", justifyContent: "space-around", mt: 1, px: 1.5 }}>
          <VBtn color={success} onClick={() => { setSuccessState(true); setErrorState(false); }}>Success</VBtn>
          <VBtn color={error} onClick={() => { setSuccessState(false); setErrorState(true); }}>Error</VBtn>
        </Box>
      </Box>
      <Box sx={{ width: "100%", px: 1.5, mt: 1 }}>
        <VInput
          messages={["Messages"]}
          success={successState}
          successMessages={successState ? ["Done"] : []}
          error={errorState}
          errorMessages={errorMessages}
          hideDetails={hideDetails}
          hint="I am hint"
          persistentHint={persistentHint}
          prependIcon={<Phone />}
          appendIcon={<Close />}
          onPrependClick={() => window.alert("click:prepend")}
          onAppendClick={() => window.alert("click:append")}
        >
          Default Slot
        </VInput>
      </Box>
    </Box>
  );
}

function LoadingExample() {
  return <VTextInput loading disabled color={success} />;
}

function HintExample() {
  const [showMessages, setShowMessages] = useState(false);
  return (
    <Box sx={{ width: "100%" }}>
      <VSwitch label="Show messages" checked={showMessages} onChange={setShowMessages} />
      <VInput hint="I am hint" persistentHint messages={showMessages ? ["Message"] : undefined}>Input</VInput>
    </Box>
  );
}

function RulesExample() {
  const [value, setValue] = useState("");
  const rules = useMemo(() => [
    (next: string) => Boolean(next) || "Required.",
    (next: string) => (next && next.length >= 3) || "Min 3 characters",
  ], []);
  return <VTextInput value={value} onChange={setValue} rules={rules} />;
}

function HideDetailsExample() {
  const [main, setMain] = useState("");
  const [another, setAnother] = useState("");
  const mainError = main && main.length < 3 ? "Min 3 characters" : !main ? "" : "";
  return (
    <Box sx={{ width: "100%" }}>
      <VTextInput label="Main input" value={main} onChange={setMain} errorText={mainError} hideDetailsAuto />
      <VTextInput label="Another input" value={another} onChange={setAnother} />
    </Box>
  );
}

function SlotsExample() {
  return <VTextInput prependSlot={<Remove sx={{ color: "#4caf50", fontSize: 24 }} />} appendSlot={<Add sx={{ color: "#f44336", fontSize: 24 }} />} />;
}

function SlotEventsExample() {
  return (
    <Box id="input-usage" sx={{ width: "100%" }}>
      <VInput dashed messages={["Messages"]} prependIcon={<Phone />} appendIcon={<Close />} onPrependClick={() => window.alert("click:prepend")} onAppendClick={() => window.alert("click:append")}>
        Default Slot
      </VInput>
    </Box>
  );
}

function VInput({ children, messages, prependIcon, appendIcon, success: isSuccess = false, error: isError = false, successMessages = [], errorMessages = [], hint, persistentHint = false, hideDetails = false, disabled = false, dashed = false, onPrependClick, onAppendClick }: { children: ReactNode; messages?: string[]; prependIcon?: ReactNode; appendIcon?: ReactNode; success?: boolean; error?: boolean; successMessages?: string[]; errorMessages?: string[]; hint?: string; persistentHint?: boolean; hideDetails?: boolean; disabled?: boolean; dashed?: boolean; onPrependClick?: () => void; onAppendClick?: () => void }) {
  const displayMessages = isError ? errorMessages : isSuccess ? successMessages : messages;
  const detail = displayMessages && displayMessages.length ? displayMessages : persistentHint && hint ? [hint] : undefined;
  const color = isError ? error : isSuccess ? success : "rgba(0,0,0,.6)";
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", width: "100%", minHeight: hideDetails ? 34 : 58, opacity: disabled ? .55 : 1, color: disabled ? "rgba(0,0,0,.38)" : "rgba(0,0,0,.87)" }}>
      {prependIcon && <IconSlot dashed={dashed} onClick={onPrependClick}>{prependIcon}</IconSlot>}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ minHeight: 32, display: "flex", alignItems: "center", px: dashed ? .75 : 0, border: dashed ? "1px dashed rgba(0,0,0,.4)" : 0, fontSize: 16 }}>
          {children}
        </Box>
        {!hideDetails && (
          <Box sx={{ minHeight: 20, mt: .45, border: dashed ? "1px dashed rgba(0,0,0,.4)" : 0, px: dashed ? .75 : 0, display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            {detail?.map((message) => <Typography key={message} sx={{ color, fontSize: 12, lineHeight: 1.45, mr: 1 }}>{message}</Typography>)}
          </Box>
        )}
      </Box>
      {appendIcon && <IconSlot dashed={dashed} onClick={onAppendClick}>{appendIcon}</IconSlot>}
    </Box>
  );
}

function IconSlot({ children, dashed, onClick }: { children: ReactNode; dashed: boolean; onClick?: () => void }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 42,
        minHeight: 32,
        mx: .75,
        border: dashed ? "1px dashed rgba(0,0,0,.4)" : 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(0,0,0,.54)",
        cursor: onClick ? "pointer" : "default",
        "& svg": { fontSize: 22 },
      }}
    >
      {children}
    </Box>
  );
}

type Rule = (value: string) => true | string;

function VTextInput({ label, value = "", onChange, loading = false, disabled = false, color = primary, rules = [], errorText = "", hideDetailsAuto = false, prependSlot, appendSlot }: { label?: string; value?: string; onChange?: (value: string) => void; loading?: boolean; disabled?: boolean; color?: string; rules?: Rule[]; errorText?: string; hideDetailsAuto?: boolean; prependSlot?: ReactNode; appendSlot?: ReactNode }) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const ruleError = rules.map((rule) => rule(value)).find((result) => result !== true);
  const message = errorText || (touched && typeof ruleError === "string" ? ruleError : "");
  const hasDetail = Boolean(message) || !hideDetailsAuto;
  return (
    <Box sx={{ width: "100%", mb: 2.5 }}>
      <Box sx={{ display: "flex", alignItems: "flex-end", opacity: disabled ? .5 : 1 }}>
        {prependSlot && <Box sx={{ width: 40, minHeight: 48, display: "flex", alignItems: "center", justifyContent: "center", mr: 1 }}>{prependSlot}</Box>}
        <Box sx={{ flex: 1, minWidth: 0, position: "relative" }}>
          {loading && <LinearProgress sx={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 2, zIndex: 2, bgcolor: "rgba(0,0,0,.08)", "& .MuiLinearProgress-bar": { bgcolor: color } }} />}
          <TextField
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => { setFocused(false); setTouched(true); }}
            label={label}
            disabled={disabled}
            variant="standard"
            fullWidth
            sx={{
              "& .MuiInputBase-root": { fontSize: 16, minHeight: 48, color: "rgba(0,0,0,.87)" },
              "& .MuiInputLabel-root": { color: message ? error : focused ? color : "rgba(0,0,0,.6)" },
              "& .MuiInputLabel-root.Mui-focused": { color: color },
              "& .MuiInput-underline:before": { borderBottomColor: message ? error : "rgba(0,0,0,.42)" },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "rgba(0,0,0,.87)" },
              "& .MuiInput-underline:after": { borderBottomColor: message ? error : color },
            }}
          />
        </Box>
        {appendSlot && <Box sx={{ width: 40, minHeight: 48, display: "flex", alignItems: "center", justifyContent: "center", ml: 1 }}>{appendSlot}</Box>}
      </Box>
      {hasDetail && <Typography sx={{ minHeight: 18, fontSize: 12, color: message ? error : "rgba(0,0,0,.6)", mt: .45, ml: prependSlot ? 6 : 0 }}>{message}</Typography>}
    </Box>
  );
}

function VSlider({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", minHeight: 48 }}>
      <Typography sx={{ flex: "0 0 150px", color: "rgba(0,0,0,.6)", fontSize: 16 }}>{label}</Typography>
      <Slider value={value} min={min} max={max} onChange={(_, next) => onChange(next as number)} sx={{ color: primary, height: 2, "& .MuiSlider-thumb": { width: 12, height: 12, boxShadow: "0 0 0 6px rgba(0,151,167,.12)" }, "& .MuiSlider-track": { border: 0 }, "& .MuiSlider-rail": { opacity: 1, bgcolor: "rgba(0,0,0,.26)" } }} />
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

function VBtn({ children, color, onClick }: { children: ReactNode; color: string; onClick: () => void }) {
  return (
    <Button onClick={onClick} sx={{ minWidth: 64, height: 36, px: 2, bgcolor: color, color: "#fff", textTransform: "uppercase", fontSize: 14, fontWeight: 500, letterSpacing: ".0892857143em", boxShadow: "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)", "&:hover": { bgcolor: color } }}>
      {children}
    </Button>
  );
}

function AppAlert({ children }: { children: ReactNode }) {
  return <Box sx={{ borderLeft: `4px solid ${primary}`, bgcolor: "#eeeeee", color: "text.secondary", px: 2, py: 1.5, mb: 4, fontSize: 15, lineHeight: 1.55 }}>{children}</Box>;
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
        {description && <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{renderDescription(description)}</Typography>}
        {children()}
      </Box>
    </Card>
  );
}

function renderDescription(description: ReactNode) {
  if (typeof description !== "string") return description;
  const parts = description.split(/(`[^`]+`)/g);
  return parts.map((part, index) => part.startsWith("`") && part.endsWith("`") ? <CodePill key={index}>{part.slice(1, -1)}</CodePill> : part);
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: .55, py: .18, borderRadius: .75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: .5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

const examples: Example[] = [
  { title: "Loading", description: "`v-input` has `loading` state which can be used, e.g. for data loading indication. Note: `v-text-field` is used just for example.", source: "simple/loading", minHeight: 140, render: () => <LoadingExample /> },
  { title: "Hint", description: "`v-input` can have `hint` which can tell user how to use the input. `persistent-hint` prop makes the hint visible always if no messages are displayed.", source: "simple/hint", minHeight: 210, render: () => <HintExample /> },
  { title: "Success", description: "As any validatable Vuetify component, `v-input` can be set to success state using `success` prop, you can add message to it using `success-messages` prop.", source: "simple/success", minHeight: 150, render: () => <VInput success successMessages={["Success"]} disabled>Input</VInput> },
  { title: "Error", description: "As any validatable Vuetify component, `v-input` can be set to error state using `error` prop, messages can be added using `error-messages` prop. You can determine error messages count to show using `error-count` property.", source: "simple/error", minHeight: 150, render: () => <VInput error errorMessages={["Fatal error"]} disabled>Input</VInput> },
  { title: "Multiple errors", description: "You can add multiple errors to `v-input` using `error-count` property.", source: "simple/multi-error", minHeight: 165, render: () => <VInput error errorMessages={["Fatal error", "Another error"]} disabled>Input</VInput> },
  { title: "Rules", description: "You can add custom validation rules to `v-input`, add them as functions returning `true`/error message. Note: `v-text-field` is used just for example.", source: "intermediate/rules", minHeight: 150, render: () => <RulesExample /> },
  { title: "Auto hiding details", description: "When `hide-details` is set to `auto` messages will be rendered only if there's a message (hint, error message etc) to display.", source: "intermediate/hide-details", minHeight: 215, render: () => <HideDetailsExample /> },
  { title: "Slots", description: "`v-input` has `append` and `prepend` slots. You can place custom icons in them.", source: "intermediate/slots", minHeight: 140, render: () => <SlotsExample /> },
  { title: "Slot events", description: "`v-input` can have `click:append` and `click:prepend` events for its slots. Note: `v-text-field` is used just for example.", source: "intermediate/slot-events", minHeight: 185, render: () => <SlotEventsExample /> },
];

const sourceTemplates = {
  usage: "src/demo/examples/inputs/usage.vue",
  playground: "src/demo/examples/inputs/playground.vue",
  "simple/loading": "src/demo/examples/inputs/simple/loading.vue",
  "simple/hint": "src/demo/examples/inputs/simple/hint.vue",
  "simple/success": "src/demo/examples/inputs/simple/success.vue",
  "simple/error": "src/demo/examples/inputs/simple/error.vue",
  "simple/multi-error": "src/demo/examples/inputs/simple/multi-error.vue",
  "intermediate/rules": "src/demo/examples/inputs/intermediate/rules.vue",
  "intermediate/hide-details": "src/demo/examples/inputs/intermediate/hide-details.vue",
  "intermediate/slots": "src/demo/examples/inputs/intermediate/slots.vue",
  "intermediate/slot-events": "src/demo/examples/inputs/intermediate/slot-events.vue",
};
