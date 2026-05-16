import { Children, cloneElement, isValidElement, useState, type MouseEvent as ReactMouseEvent, type ReactElement, type ReactNode } from "react";
import { Box, Card, CircularProgress, Collapse, IconButton, Stack, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { ArrowDropDown, Check, Code, GitHub, IndeterminateCheckBox, InvertColors, Remove, ViewHeadline } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const sectionHeadingSx = { fontSize: { xs: 20, md: 22 }, lineHeight: 1.45, fontWeight: 400, mb: 2.5 };
const docsParagraphSx = { fontSize: { xs: 16, md: 20 }, lineHeight: 1.55, fontWeight: 300, mb: 3, color: "text.secondary" };

type Ripple = { id: number; x: number; y: number; size: number };
type ControlColor = "accent" | "teal" | "blue" | "error" | "success" | "red" | "red darken-3" | "indigo" | "indigo darken-3" | "orange" | "orange darken-3" | "primary" | "secondary" | "info" | "warning";
type ExampleKey = keyof typeof sourceTemplates;

interface Example {
  title: string;
  description: ReactNode;
  source: ExampleKey;
  minHeight: number;
  render: () => ReactNode;
}

const colors: ControlColor[] = ["accent", "teal", "blue", "error", "success"];
const colorExamples: ControlColor[] = ["red", "red darken-3", "indigo", "indigo darken-3", "orange", "orange darken-3", "primary", "secondary", "success", "info", "warning", "error"];

const colorMap: Record<ControlColor, string> = {
  accent: "#00bcd4",
  teal: "#009688",
  blue: "#2196f3",
  error: "#ff5252",
  success: "#4caf50",
  red: "#f44336",
  "red darken-3": "#c62828",
  indigo: "#3f51b5",
  "indigo darken-3": "#283593",
  orange: "#ff9800",
  "orange darken-3": "#ef6c00",
  primary,
  secondary: "#424242",
  info: "#2196f3",
  warning: "#fb8c00",
};

export default function SelectionControlsPage() {
  return (
    <DocPage
      title="SelectionControls"
      namespace="Components"
      icon={<ViewHeadline />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Selection Controls" },
      ]}
    >
      <DocText>Selection control components allow a user to select options. These components <strong>must</strong> be used with the <CodePill>v-model</CodePill> prop as they do not maintain their own state.</DocText>
      <UsageSection />
      <PlaygroundSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <Typography variant="h5" sx={sectionHeadingSx}>Usage</Typography>
      <VuetifyExampleBlock title="" description="" source="usage" minHeight={265}>
        {() => <UsageExample />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function UsageExample() {
  const [checkbox, setCheckbox] = useState(true);
  const [radio, setRadio] = useState(1);
  const [switch1, setSwitch1] = useState(true);
  return (
    <VContainer px={0}>
      <VCheckbox checked={checkbox} onChange={setCheckbox} label={`Checkbox 1: ${checkbox.toString()}`} />
      <VRadioGroup value={radio} onChange={setRadio}>
        {[1, 2, 3].map((n) => <VRadio key={n} value={n} label={`Radio ${n}`} />)}
      </VRadioGroup>
      <VSwitch checked={switch1} onChange={setSwitch1} label={`Switch 1: ${switch1.toString()}`} />
    </VContainer>
  );
}

function PlaygroundSection() {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <Typography variant="h5" sx={sectionHeadingSx}>Playground</Typography>
      <VuetifyExampleBlock title="" description="" source="playground" minHeight={640}>
        {() => <PlaygroundExample />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function PlaygroundExample() {
  const [disabled, setDisabled] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [flat, setFlat] = useState(false);
  const [inset, setInset] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mandatory, setMandatory] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [row, setRow] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [color, setColor] = useState<ControlColor>("accent");
  const [radio, setRadio] = useState<number | number[] | null>(null);
  const [controlSwitch, setControlSwitch] = useState(false);
  const [controlCheckbox, setControlCheckbox] = useState(false);

  const radioChange = (value: number) => {
    if (readonly || disabled) return;
    if (multiple) {
      const values = Array.isArray(radio) ? radio : radio == null ? [] : [radio];
      setRadio(values.includes(value) ? values.filter((entry) => entry !== value) : [...values, value]);
      return;
    }
    if (!mandatory && radio === value) setRadio(null);
    else setRadio(value);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap" }}>
        <VCheckbox checked={disabled} onChange={setDisabled} label="Disabled" classMx />
        <VCheckbox checked={readonly} onChange={setReadonly} label="Read-only" classMx />
        <VCheckbox checked={error} onChange={setError} label="Error" classMx />
        <VCheckbox checked={success} onChange={setSuccess} label="Success" classMx />
        <Box sx={{ width: "100%", px: 1.5 }}>
          <VSelect value={color} onChange={setColor} items={colors} label="Color" />
        </Box>
        <HeaderLabel>Checkboxes</HeaderLabel>
        <VCheckbox checked={loading} onChange={setLoading} label="Loading" classMx />
        <VCheckbox checked={flat} onChange={setFlat} label="Flat" classMx />
        <VCheckbox checked={inset} onChange={setInset} label="Inset" classMx />
        <HeaderLabel>Switches</HeaderLabel>
        <VSwitch checked={mandatory} onChange={setMandatory} label="Mandatory" classMx />
        <VSwitch checked={multiple} onChange={setMultiple} label="Multiple" classMx />
        <VSwitch checked={row} onChange={setRow} label="Row" classMx />
        <HeaderLabel>Radios</HeaderLabel>
        <VRadioGroup value={1} onChange={() => undefined}>
          {[1, 2, 3].map((n) => <VRadio key={n} value={n} label={`Radio ${n}`} />)}
        </VRadioGroup>
      </Box>
      <VSwitch checked={controlSwitch} onChange={setControlSwitch} disabled={disabled} readonly={readonly} loading={loading} flat={flat} inset={inset} error={error} success={success} color={color} label="I'm a switch" />
      <VRadioGroup value={radio} onChange={radioChange} row={row} multiple={multiple}>
        {[1, 2, 3].map((n) => (
          <VRadio key={n} value={n} label="I'm a radio button" disabled={disabled} readonly={readonly} error={error} success={success} color={color} checkedOverride={Array.isArray(radio) ? radio.includes(n) : radio === n} />
        ))}
      </VRadioGroup>
      <VSwitch checked={indeterminate} onChange={setIndeterminate} label="Indeterminate" classMx />
      <VCheckbox checked={controlCheckbox} onChange={setControlCheckbox} disabled={disabled} readonly={readonly} indeterminate={indeterminate} error={error} success={success} color={color} label="I'm a checkbox" />
    </Box>
  );
}

function HeaderLabel({ children }: { children: ReactNode }) {
  return <Box sx={{ width: "100%", px: 1.5, py: 1.25, fontSize: 16, color: "rgba(0,0,0,.87)" }}>{children}</Box>;
}

function ExamplesSection() {
  return (
    <Box component="section">
      <Typography variant="h5" sx={sectionHeadingSx}>Examples</Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>Below is a collection of simple to complex examples.</Typography>
      <Stack spacing={5}>
        {examples.map((example) => (
          <VuetifyExampleBlock key={example.source} title={example.title} description={example.description} source={example.source} minHeight={example.minHeight}>
            {example.render}
          </VuetifyExampleBlock>
        ))}
      </Stack>
    </Box>
  );
}

function CheckboxesBooleanExample() {
  const [one, setOne] = useState(true);
  const [two, setTwo] = useState(false);
  return <VContainer><VCheckbox checked={one} onChange={setOne} label={`Checkbox 1: ${one.toString()}`} /><VCheckbox checked={two} onChange={setTwo} label={`Checkbox 2: ${two.toString()}`} /></VContainer>;
}

function CheckboxesArrayExample() {
  const [selected, setSelected] = useState(["John"]);
  const toggle = (value: string) => setSelected((current) => current.includes(value) ? current.filter((entry) => entry !== value) : [...current, value]);
  return <VContainer><Typography sx={{ mb: 1 }}>{JSON.stringify(selected)}</Typography><VCheckbox checked={selected.includes("John")} onChange={() => toggle("John")} label="John" /><VCheckbox checked={selected.includes("Jacob")} onChange={() => toggle("Jacob")} label="Jacob" /></VContainer>;
}

function CheckboxesStatesExample() {
  const [on, setOn] = useState(true);
  const [off, setOff] = useState(false);
  const [indeterminateState, setIndeterminateState] = useState({ checked: false, indeterminate: true });
  return (
    <VContainer>
      <GridCols cols={3}><LightText>on</LightText><LightText>off</LightText><LightText>indeterminate</LightText></GridCols>
      <GridCols cols={3}>
        <VCheckbox checked={on} onChange={setOn} />
        <VCheckbox checked={off} onChange={setOff} />
        <VCheckbox checked={indeterminateState.checked} indeterminate={indeterminateState.indeterminate} onChange={(next) => setIndeterminateState({ checked: next, indeterminate: false })} />
      </GridCols>
      <GridCols cols={3}><LightText>on disabled</LightText><LightText>off disabled</LightText><Box /></GridCols>
      <GridCols cols={3}><VCheckbox checked disabled /><VCheckbox checked={false} disabled /><Box /></GridCols>
    </VContainer>
  );
}

function ColorCheckboxesExample() {
  const [selected, setSelected] = useState<string[]>(colorExamples);
  const toggle = (value: ControlColor) => setSelected((current) => current.includes(value) ? current.filter((entry) => entry !== value) : [...current, value]);
  return <ColorGrid>{colorExamples.map((color) => <VCheckbox key={color} checked={selected.includes(color)} onChange={() => toggle(color)} label={color} color={color} hideDetails />)}</ColorGrid>;
}

function InlineTextFieldExample() {
  const [includeFiles, setIncludeFiles] = useState(true);
  const [enabled, setEnabled] = useState(false);
  return (
    <Card sx={{ boxShadow: "none", bgcolor: "#fff" }}>
      <Box sx={{ p: 2 }}>
        <InlineField><VCheckbox checked={includeFiles} onChange={setIncludeFiles} hideDetails /><VTextField label="Include files" /></InlineField>
        <InlineField><VCheckbox checked={enabled} onChange={setEnabled} hideDetails /><VTextField label="I only work if you check the box" disabled={!enabled} /></InlineField>
      </Box>
    </Card>
  );
}

function RadiosDefaultExample() {
  const [radios, setRadios] = useState<string | null>("radio-1");
  return <VContainer><Typography sx={{ mb: 1 }}>{radios || "null"}</Typography><VRadioGroup value={radios} onChange={(value) => setRadios(radios === value ? null : value)}><VRadio value="radio-1" label="Radio 1" /><VRadio value="radio-2" label="Radio 2" /></VRadioGroup></VContainer>;
}

function RadiosDirectionExample() {
  const [column, setColumn] = useState<string | null>(null);
  const [row, setRow] = useState<string | null>(null);
  return <VContainer><VRadioGroup value={column} onChange={setColumn}><VRadio value="radio-1" label="Option 1" /><VRadio value="radio-2" label="Option 2" /></VRadioGroup><Box component="hr" sx={{ border: 0, borderTop: "1px solid rgba(0,0,0,.12)", my: 2 }} /><VRadioGroup value={row} onChange={setRow} row><VRadio value="radio-1" label="Option 1" /><VRadio value="radio-2" label="Option 2" /></VRadioGroup></VContainer>;
}

function RadiosColorsExample() {
  const [left, setLeft] = useState("red");
  const [right, setRight] = useState("primary");
  return <VContainer><GridCols cols={2}><VRadioGroup value={left} onChange={setLeft}>{colorExamples.slice(0, 6).map((color) => <VRadio key={color} value={color} label={color} color={color as ControlColor} />)}</VRadioGroup><VRadioGroup value={right} onChange={setRight}>{colorExamples.slice(6).map((color) => <VRadio key={color} value={color} label={color} color={color as ControlColor} />)}</VRadioGroup></GridCols></VContainer>;
}

function SwitchesBooleanExample() {
  const [one, setOne] = useState(true);
  const [two, setTwo] = useState(false);
  return <VContainer><VSwitch checked={one} onChange={setOne} label={`Switch 1: ${one.toString()}`} /><VSwitch checked={two} onChange={setTwo} label={`Switch 2: ${two.toString()}`} /></VContainer>;
}

function SwitchesArrayExample() {
  const [people, setPeople] = useState(["John"]);
  const toggle = (value: string) => setPeople((current) => current.includes(value) ? current.filter((entry) => entry !== value) : [...current, value]);
  return <VContainer><Typography sx={{ mb: 1 }}>{JSON.stringify(people)}</Typography><VSwitch checked={people.includes("John")} onChange={() => toggle("John")} label="John" /><VSwitch checked={people.includes("Jacob")} onChange={() => toggle("Jacob")} label="Jacob" /></VContainer>;
}

function SwitchesStatesExample() {
  const [on, setOn] = useState(true);
  const [off, setOff] = useState(false);
  const [loadingOn, setLoadingOn] = useState(true);
  const [loadingOff, setLoadingOff] = useState(false);
  return (
    <VContainer>
      <GridCols cols={2}><DarkText>on</DarkText><DarkText>off</DarkText></GridCols>
      <GridCols cols={2}><VSwitch checked={on} onChange={setOn} /><VSwitch checked={off} onChange={setOff} /></GridCols>
      <GridCols cols={2}><DarkText>on disabled</DarkText><DarkText>off disabled</DarkText></GridCols>
      <GridCols cols={2}><VSwitch checked disabled /><VSwitch checked={false} disabled /></GridCols>
      <GridCols cols={2}><DarkText>on loading</DarkText><DarkText>off loading</DarkText></GridCols>
      <GridCols cols={2}><VSwitch checked={loadingOn} onChange={setLoadingOn} loading="warning" /><VSwitch checked={loadingOff} onChange={setLoadingOff} loading="warning" /></GridCols>
    </VContainer>
  );
}

function SwitchesColorsExample() {
  const [selected, setSelected] = useState<string[]>(colorExamples);
  const toggle = (value: ControlColor) => setSelected((current) => current.includes(value) ? current.filter((entry) => entry !== value) : [...current, value]);
  return <ColorGrid>{colorExamples.map((color) => <VSwitch key={color} checked={selected.includes(color)} onChange={() => toggle(color)} label={color} color={color} hideDetails />)}</ColorGrid>;
}

function SwitchesFlatExample() {
  const [one, setOne] = useState(true);
  const [two, setTwo] = useState(false);
  return <Box sx={{ bgcolor: "#eeeeee", width: "100%", minHeight: 210, p: 6 }}><VSwitch checked={one} onChange={setOne} flat label={`Switch 1: ${one.toString()}`} /><VSwitch checked={two} onChange={setTwo} flat label={`Switch 2: ${two.toString()}`} /></Box>;
}

function SwitchesInsetExample() {
  const [one, setOne] = useState(true);
  const [two, setTwo] = useState(false);
  return <Box sx={{ bgcolor: "#fff", width: "100%", p: 2.5 }}><VSwitch checked={one} onChange={setOne} inset label={`Switch 1: ${one.toString()}`} /><VSwitch checked={two} onChange={setTwo} inset label={`Switch 2: ${two.toString()}`} /></Box>;
}

function LabelSlotExample() {
  const [checkbox, setCheckbox] = useState(false);
  const [radios, setRadios] = useState("Duckduckgo");
  const [switchMe, setSwitchMe] = useState(false);
  return (
    <VContainer>
      <VCheckbox checked={checkbox} onChange={setCheckbox} label={<Box>I agree that <Tooltip title="Opens in new window"><Box component="a" href="http://vuetifyjs.com" target="_blank" onClick={(event) => event.stopPropagation()} sx={{ color: primary }}>Vuetify</Box></Tooltip> is awesome</Box>} />
      <VRadioGroup value={radios} onChange={setRadios} groupLabel={<Box>Your favourite <strong>search engine</strong></Box>}>
        <VRadio value="Google" label={<Box>Of course it's <strong style={{ color: "#4caf50" }}>Google</strong></Box>} />
        <VRadio value="Duckduckgo" label={<Box>Definitely <strong style={{ color: primary }}>Duckduckgo</strong></Box>} />
      </VRadioGroup>
      <VSwitch checked={switchMe} onChange={setSwitchMe} label={<Box sx={{ display: "inline-flex", alignItems: "center" }}>Turn on the progress: <VProgressCircular active={switchMe} /></Box>} />
    </VContainer>
  );
}

function VContainer({ children, px = 3 }: { children: ReactNode; px?: number }) {
  return <Box sx={{ width: "100%", px: { xs: 1.5, md: px }, py: 1 }}>{children}</Box>;
}

function GridCols({ children, cols }: { children: ReactNode; cols: number }) {
  return <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: `repeat(${cols}, minmax(0, 1fr))` }, alignItems: "center", columnGap: 3, rowGap: .5 }}>{children}</Box>;
}

function ColorGrid({ children }: { children: ReactNode }) {
  return <Card sx={{ boxShadow: "none", bgcolor: "#fff" }}><Box sx={{ p: 2 }}><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" }, rowGap: 5, columnGap: 3 }}>{children}</Box></Box></Card>;
}

function InlineField({ children }: { children: ReactNode }) {
  return <Box sx={{ display: "flex", alignItems: "center", minHeight: 68, gap: 1 }}>{children}</Box>;
}

function VTextField({ label, disabled = false }: { label: string; disabled?: boolean }) {
  return (
    <TextField
      variant="standard"
      label={label}
      disabled={disabled}
      fullWidth
      InputLabelProps={{ sx: { fontSize: 16, color: "rgba(0,0,0,.6)" } }}
      InputProps={{ sx: { fontSize: 16, "&:before": { borderBottomColor: "rgba(0,0,0,.42)" }, "&:after": { borderBottomColor: primary } } }}
    />
  );
}

function controlColor(color?: ControlColor, error?: boolean, success?: boolean) {
  if (error) return colorMap.error;
  if (success) return colorMap.success;
  return colorMap[color || "accent"] || primary;
}

function VCheckbox({
  checked,
  onChange,
  label,
  color,
  disabled = false,
  readonly = false,
  error = false,
  success = false,
  indeterminate = false,
  hideDetails = false,
  classMx = false,
  staticControl = false,
}: {
  checked: boolean;
  onChange?: (value: boolean) => void;
  label?: ReactNode;
  color?: ControlColor;
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
  success?: boolean;
  indeterminate?: boolean;
  hideDetails?: boolean;
  classMx?: boolean;
  staticControl?: boolean;
}) {
  const activeColor = controlColor(color, error, success);
  const stateColor = error || success ? activeColor : undefined;
  return (
    <ControlRow mx={classMx} disabled={disabled} hideDetails={hideDetails} onClick={() => !staticControl && !disabled && !readonly && onChange?.(!checked)}>
      <RippleBox disabled={disabled || readonly}>
        <Box sx={{ width: 18, height: 18, borderRadius: .35, border: `2px solid ${checked || indeterminate || stateColor ? activeColor : "rgba(0,0,0,.54)"}`, bgcolor: checked || indeterminate ? activeColor : "transparent", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", transition: "background-color 180ms cubic-bezier(.4,0,.2,1), border-color 180ms cubic-bezier(.4,0,.2,1), transform 120ms cubic-bezier(.4,0,.2,1)" }}>
          {indeterminate ? <Remove sx={{ fontSize: 16 }} /> : checked ? <Check sx={{ fontSize: 16 }} /> : null}
        </Box>
      </RippleBox>
      {label && <ControlLabel color={stateColor}>{label}</ControlLabel>}
    </ControlRow>
  );
}

function VRadioGroup<T extends string | number>({
  value,
  onChange,
  children,
  row = false,
  groupLabel,
}: {
  value: T | T[] | null;
  onChange: (value: T) => void;
  children: ReactNode;
  row?: boolean;
  multiple?: boolean;
  groupLabel?: ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: row ? "row" : "column", flexWrap: "wrap", py: .5 }}>
      {groupLabel && <Typography sx={{ fontSize: 16, mb: 1 }}>{groupLabel}</Typography>}
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;
        const element = child as ReactElement<{ value: T; checkedOverride?: boolean; onSelect?: () => void }>;
        const checked = Array.isArray(value) ? value.includes(element.props.value) : value === element.props.value;
        return cloneElement(element, { checkedOverride: element.props.checkedOverride ?? checked, onSelect: element.props.onSelect ?? (() => onChange(element.props.value)) });
      })}
    </Box>
  );
}

function VRadio<T extends string | number>({ value, label, checkedOverride, onSelect, color, disabled = false, readonly = false, error = false, success = false }: { value: T; label: ReactNode; checkedOverride?: boolean; onSelect?: () => void; color?: ControlColor; disabled?: boolean; readonly?: boolean; error?: boolean; success?: boolean }) {
  const activeColor = controlColor(color, error, success);
  const stateColor = error || success ? activeColor : undefined;
  const checked = !!checkedOverride;
  return (
    <ControlRow disabled={disabled} onClick={() => !disabled && !readonly && onSelect?.()}>
      <RippleBox disabled={disabled || readonly}>
        <Box sx={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${checked || stateColor ? activeColor : "rgba(0,0,0,.54)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 180ms cubic-bezier(.4,0,.2,1)" }}>
          <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: activeColor, transform: checked ? "scale(1)" : "scale(0)", transition: "transform 180ms cubic-bezier(.4,0,.2,1)" }} />
        </Box>
      </RippleBox>
      <ControlLabel color={stateColor}>{label}</ControlLabel>
    </ControlRow>
  );
}

function VSwitch({
  checked,
  onChange,
  label,
  color,
  disabled = false,
  readonly = false,
  loading = false,
  flat = false,
  inset = false,
  error = false,
  success = false,
  hideDetails = false,
  classMx = false,
  staticControl = false,
}: {
  checked: boolean;
  onChange?: (value: boolean) => void;
  label?: ReactNode;
  color?: ControlColor;
  disabled?: boolean;
  readonly?: boolean;
  loading?: boolean | ControlColor;
  flat?: boolean;
  inset?: boolean;
  error?: boolean;
  success?: boolean;
  hideDetails?: boolean;
  classMx?: boolean;
  staticControl?: boolean;
}) {
  const activeColor = controlColor(color, error, success);
  const stateColor = error || success ? activeColor : undefined;
  const trackWidth = inset ? 52 : 34;
  const trackHeight = inset ? 32 : 14;
  const thumb = 20;
  const offset = inset ? (checked ? 25 : 7) : (checked ? 18 : 0);
  return (
    <ControlRow mx={classMx} disabled={disabled} hideDetails={hideDetails} onClick={() => !staticControl && !disabled && !readonly && onChange?.(!checked)}>
      <RippleBox disabled={disabled || readonly} wide={inset}>
        <Box sx={{ position: "relative", width: inset ? 52 : 38, height: 34, display: "flex", alignItems: "center" }}>
          <Box sx={{ position: "absolute", left: 2, width: trackWidth, height: trackHeight, borderRadius: 20, bgcolor: checked || stateColor ? activeColor : "rgba(0,0,0,.38)", opacity: checked ? .5 : stateColor ? .34 : .38, transition: "background-color 180ms cubic-bezier(.4,0,.2,1), opacity 180ms cubic-bezier(.4,0,.2,1)" }} />
          <Box sx={{ position: "absolute", left: 0, width: thumb, height: thumb, borderRadius: "50%", bgcolor: disabled ? "#bdbdbd" : checked || stateColor ? activeColor : "#fafafa", transform: `translateX(${offset}px)`, boxShadow: flat ? "none" : "0 2px 4px rgba(0,0,0,.32)", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 220ms cubic-bezier(.4,0,.2,1), background-color 180ms cubic-bezier(.4,0,.2,1), box-shadow 180ms cubic-bezier(.4,0,.2,1)" }}>
            {loading && <CircularProgress size={16} thickness={5} sx={{ color: typeof loading === "string" ? controlColor(loading) : "#fff" }} />}
          </Box>
        </Box>
      </RippleBox>
      {label && <ControlLabel color={stateColor}>{label}</ControlLabel>}
    </ControlRow>
  );
}

function ControlRow({ children, onClick, mx = false, disabled = false, hideDetails = false }: { children: ReactNode; onClick?: () => void; mx?: boolean; disabled?: boolean; hideDetails?: boolean }) {
  return <Box onClick={onClick} sx={{ display: "inline-flex", alignItems: "center", minHeight: hideDetails ? 36 : 48, mx: mx ? 1 : 0, opacity: disabled ? .55 : 1, cursor: disabled ? "default" : "pointer", userSelect: "none", verticalAlign: "middle" }}>{children}</Box>;
}

function ControlLabel({ children, color }: { children: ReactNode; color?: string }) {
  return <Typography component="div" sx={{ fontSize: 16, color: color || "rgba(0,0,0,.87)", lineHeight: 1.35, transition: "color 180ms cubic-bezier(.4,0,.2,1)" }}>{children}</Typography>;
}

function RippleBox({ children, disabled = false, wide = false }: { children: ReactNode; disabled?: boolean; wide?: boolean }) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  return (
    <Box
      onMouseDown={(event) => {
        if (!disabled) createRipple(event, setRipples);
      }}
      sx={{ position: "relative", width: wide ? 64 : 42, height: 42, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: wide ? 22 : "50%", overflow: "hidden", mr: .5 }}
    >
      <RippleLayer ripples={ripples} color="rgba(0,0,0,.16)" />
      {children}
    </Box>
  );
}

function VSelect({ value, onChange, items, label }: { value: ControlColor; onChange: (value: ControlColor) => void; items: ControlColor[]; label: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ position: "relative", mt: 1.5, mb: 2.5 }}>
      <Box onClick={() => setOpen((current) => !current)} sx={{ minHeight: 56, borderBottom: `1px solid ${open ? primary : "rgba(0,0,0,.42)"}`, display: "flex", alignItems: "center", cursor: "pointer", transition: "border-color 180ms cubic-bezier(.4,0,.2,1)" }}>
        <Box sx={{ flex: 1, pt: .5 }}>
          <Typography sx={{ fontSize: 12, color: open ? primary : "rgba(0,0,0,.6)", lineHeight: 1.2 }}>{label}</Typography>
          <Typography sx={{ fontSize: 16, color: "rgba(0,0,0,.87)", lineHeight: 1.7 }}>{value}</Typography>
        </Box>
        <ArrowDropDown sx={{ color: "rgba(0,0,0,.54)", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 180ms cubic-bezier(.4,0,.2,1)" }} />
      </Box>
      <Collapse in={open} timeout={160} unmountOnExit>
        <Box sx={{ position: "absolute", zIndex: 14, left: 0, right: 0, top: "calc(100% - 18px)", bgcolor: "#fff", borderRadius: .5, boxShadow: "0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)", py: .5 }}>
          {items.map((item) => (
            <Box key={item} onClick={() => { onChange(item); setOpen(false); }} sx={{ minHeight: 48, px: 2, display: "flex", alignItems: "center", fontSize: 16, color: item === value ? primary : "rgba(0,0,0,.87)", bgcolor: item === value ? "rgba(0,151,167,.08)" : "transparent", cursor: "pointer", "&:hover": { bgcolor: item === value ? "rgba(0,151,167,.12)" : "rgba(0,0,0,.04)" } }}>{item}</Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}

function createRipple(event: ReactMouseEvent<HTMLElement>, setRipples: React.Dispatch<React.SetStateAction<Ripple[]>>) {
  const rect = event.currentTarget.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.75;
  const id = Date.now() + Math.random();
  setRipples((current) => [...current, { id, size, x: event.clientX - rect.left - size / 2, y: event.clientY - rect.top - size / 2 }]);
  window.setTimeout(() => setRipples((current) => current.filter((entry) => entry.id !== id)), 520);
}

function RippleLayer({ ripples, color }: { ripples: Ripple[]; color: string }) {
  return (
    <Box sx={{ position: "absolute", inset: 0, borderRadius: "inherit", overflow: "hidden", pointerEvents: "none", "@keyframes selectionRipple": { "0%": { transform: "scale(0)", opacity: .22 }, "100%": { transform: "scale(1)", opacity: 0 } } }}>
      {ripples.map((ripple) => <Box key={ripple.id} component="span" sx={{ position: "absolute", left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size, borderRadius: "50%", bgcolor: color, animation: "selectionRipple 520ms cubic-bezier(.4,0,.2,1)" }} />)}
    </Box>
  );
}

function VProgressCircular({ active }: { active: boolean }) {
  const size = 24;
  const width = 4;
  const radius = 20;
  const viewBoxSize = radius / (1 - width / size);
  const circumference = Math.round(2 * Math.PI * radius * 1000) / 1000;
  const strokeWidth = (width / size) * viewBoxSize * 2;
  return (
    <Box
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={active ? undefined : 0}
      sx={{
        ml: 1,
        width: size,
        height: size,
        position: "relative",
        display: "inline-flex",
        verticalAlign: "middle",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(0,0,0,.87)",
      }}
    >
      <Box
        component="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`${viewBoxSize} ${viewBoxSize} ${2 * viewBoxSize} ${2 * viewBoxSize}`}
        sx={{
          width: "100%",
          height: "100%",
          m: "auto",
          position: "absolute",
          inset: 0,
          transformOrigin: "center center",
          animation: active ? "progressCircularRotate 1.4s linear infinite" : "none",
          "@keyframes progressCircularRotate": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
          "@keyframes progressCircularDash": {
            "0%": { strokeDasharray: "1, 200", strokeDashoffset: "0px" },
            "50%": { strokeDasharray: "100, 200", strokeDashoffset: "-15px" },
            "100%": { strokeDasharray: "100, 200", strokeDashoffset: "-125px" },
          },
        }}
      >
        {!active && (
          <Box
            component="circle"
            cx={2 * viewBoxSize}
            cy={2 * viewBoxSize}
            r={radius}
            fill="transparent"
            stroke="rgba(0,0,0,.1)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={0}
          />
        )}
        <Box
          component="circle"
          cx={2 * viewBoxSize}
          cy={2 * viewBoxSize}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={active ? "80, 200" : circumference}
          strokeDashoffset={active ? "0px" : `${circumference}px`}
          strokeLinecap={active ? "round" : "butt"}
          sx={{
            transition: "all .6s ease-in-out",
            animation: active ? "progressCircularDash 1.4s ease-in-out infinite" : "none",
          }}
        />
      </Box>
    </Box>
  );
}

function LightText({ children }: { children: ReactNode }) {
  return <Typography sx={{ color: "rgba(0,0,0,.38)", fontSize: 16, py: 1 }}>{children}</Typography>;
}

function DarkText({ children }: { children: ReactNode }) {
  return <Typography sx={{ color: "rgba(0,0,0,.87)", fontSize: 16, py: 1 }}>{children}</Typography>;
}

function VuetifyExampleBlock({ title, description, source, children, minHeight }: { title: string; description: ReactNode; source: ExampleKey; children: () => ReactNode; minHeight: number }) {
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
      <Box sx={{ px: 2, py: 2, minHeight, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", overflow: "visible" }}>
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
  { title: "Checkboxes - Boolean", description: "", source: "simple/checkboxes-boolean", minHeight: 150, render: () => <CheckboxesBooleanExample /> },
  { title: "Checkboxes - Array", description: "", source: "simple/checkboxes-array", minHeight: 150, render: () => <CheckboxesArrayExample /> },
  { title: "Checkboxes - States", description: "", source: "simple/checkboxes-states", minHeight: 240, render: () => <CheckboxesStatesExample /> },
  { title: "Checkboxes - Colors", description: <>Checkboxes can be colored by using any of the builtin colors and contextual names using the <CodePill>color</CodePill> prop.</>, source: "simple/checkboxes-colors", minHeight: 360, render: () => <ColorCheckboxesExample /> },
  { title: "Checkboxes - Inline with a textfield", description: "", source: "intermediate/checkboxes-inline-textfield", minHeight: 190, render: () => <InlineTextFieldExample /> },
  { title: "Radios - Default", description: <>Radio-groups are by default mandatory. This can be changed with the <CodePill>mandatory</CodePill> prop.</>, source: "simple/radios-default", minHeight: 170, render: () => <RadiosDefaultExample /> },
  { title: "Radios - Direction", description: <>Radio-groups can be presented either as a row or a column, using their respective props. The default is as a column.</>, source: "simple/radios-direction", minHeight: 220, render: () => <RadiosDirectionExample /> },
  { title: "Radios - Colors", description: <>Radios can be colored by using any of the builtin colors and contextual names using the <CodePill>color</CodePill> prop.</>, source: "simple/radios-colors", minHeight: 410, render: () => <RadiosColorsExample /> },
  { title: "Switches - Boolean", description: "", source: "simple/switches-boolean", minHeight: 150, render: () => <SwitchesBooleanExample /> },
  { title: "Switches - Array", description: "", source: "simple/switches-array", minHeight: 150, render: () => <SwitchesArrayExample /> },
  { title: "Switches - States", description: "", source: "simple/switches-states", minHeight: 330, render: () => <SwitchesStatesExample /> },
  { title: "Switches - Colors", description: <>Switches can be colored by using any of the builtin colors and contextual names using the <CodePill>color</CodePill> prop.</>, source: "simple/switches-colors", minHeight: 360, render: () => <SwitchesColorsExample /> },
  { title: "Switches - Flat", description: <>You can make switch render without elevation of thumb using <CodePill>flat</CodePill> property.</>, source: "simple/switches-flat", minHeight: 280, render: () => <SwitchesFlatExample /> },
  { title: "Switches - inset", description: <>You can make switch render in inset mode.</>, source: "simple/switches-inset", minHeight: 210, render: () => <SwitchesInsetExample /> },
  { title: "Label slot", description: <>Selection controls' labels can be defined in <CodePill>label</CodePill> slot - that will allow to use HTML content</>, source: "intermediate/label-slot", minHeight: 260, render: () => <LabelSlotExample /> },
];

const sourceTemplates = {
  usage: "src/demo/examples/selection-controls/usage.vue",
  playground: "src/demo/examples/selection-controls/playground.vue",
  "simple/checkboxes-boolean": "src/demo/examples/selection-controls/simple/checkboxes-boolean.vue",
  "simple/checkboxes-array": "src/demo/examples/selection-controls/simple/checkboxes-array.vue",
  "simple/checkboxes-states": "src/demo/examples/selection-controls/simple/checkboxes-states.vue",
  "simple/checkboxes-colors": "src/demo/examples/selection-controls/simple/checkboxes-colors.vue",
  "intermediate/checkboxes-inline-textfield": "src/demo/examples/selection-controls/intermediate/checkboxes-inline-textfield.vue",
  "simple/radios-default": "src/demo/examples/selection-controls/simple/radios-default.vue",
  "simple/radios-direction": "src/demo/examples/selection-controls/simple/radios-direction.vue",
  "simple/radios-colors": "src/demo/examples/selection-controls/simple/radios-colors.vue",
  "simple/switches-boolean": "src/demo/examples/selection-controls/simple/switches-boolean.vue",
  "simple/switches-array": "src/demo/examples/selection-controls/simple/switches-array.vue",
  "simple/switches-states": "src/demo/examples/selection-controls/simple/switches-states.vue",
  "simple/switches-colors": "src/demo/examples/selection-controls/simple/switches-colors.vue",
  "simple/switches-flat": "src/demo/examples/selection-controls/simple/switches-flat.vue",
  "simple/switches-inset": "src/demo/examples/selection-controls/simple/switches-inset.vue",
  "intermediate/label-slot": "src/demo/examples/selection-controls/intermediate/label-slot.vue",
};
