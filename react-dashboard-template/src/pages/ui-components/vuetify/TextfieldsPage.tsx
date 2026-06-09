import { useState, type ReactNode } from "react";
import { Box, Button, Card, Checkbox, Chip, Collapse, Dialog, DialogContent, IconButton, LinearProgress, Menu, MenuItem, Select, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { Code, Close, EmojiEmotions, FindInPage, GitHub, HelpOutline, InvertColors, Map, Mic, MyLocation, Place, Refresh, Send, Visibility, VisibilityOff, ViewHeadline } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const error = "#ff5252";
const success = "#4caf50";
const warning = "#fb8c00";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const sectionHeadingSx = { fontSize: { xs: 20, md: 22 }, lineHeight: 1.45, fontWeight: 400, mb: 2.5 };
const docsParagraphSx = { fontSize: { xs: 16, md: 20 }, lineHeight: 1.55, fontWeight: 300, mb: 3, color: "text.secondary" };
type ExampleKey = keyof typeof sourceTemplates;

interface Example {
  title: string;
  description: ReactNode;
  source: ExampleKey;
  minHeight: number;
  render: () => ReactNode;
}

export default function TextfieldsPage() {
  return (
    <DocPage
      title="TextFields"
      namespace="Components"
      icon={<ViewHeadline />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Textfields" },
      ]}
    >
      <DocText>Text fields components are used for collecting user provided information.</DocText>
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
      <Typography sx={docsParagraphSx}>A simple text field with placeholder and/or label.</Typography>
      <VuetifyExampleBlock title="" description="" source="usage" minHeight={310}>
        {() => <UsageExample />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function UsageExample() {
  return (
    <VContainer>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }, gap: 3 }}>
        <VTextField label="Regular" />
        <VTextField label="Regular" placeholder="Placeholder" />
        <VTextField label="Solo" solo />
        <VTextField label="Solo" placeholder="Placeholder" solo />
        <VTextField label="Filled" filled />
        <VTextField label="Filled" placeholder="Placeholder" filled />
        <VTextField label="Outlined" outlined />
        <VTextField label="Outlined" placeholder="Placeholder" outlined />
      </Box>
    </VContainer>
  );
}

function PlaygroundSection() {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <Typography variant="h5" sx={sectionHeadingSx}>Playground</Typography>
      <VuetifyExampleBlock title="" description="" source="playground" minHeight={520}>
        {() => <PlaygroundExample />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function PlaygroundExample() {
  const [model, setModel] = useState("I'm a text field");
  const [label, setLabel] = useState("Hey!");
  const [hint, setHint] = useState("Customize me!");
  const [placeholder, setPlaceholder] = useState("");
  const [shaped, setShaped] = useState(false);
  const [outlined, setOutlined] = useState(false);
  const [rounded, setRounded] = useState(false);
  const [solo, setSolo] = useState(false);
  const [singleLine, setSingleLine] = useState(false);
  const [filled, setFilled] = useState(false);
  const [clearable, setClearable] = useState(false);
  const [persistentHint, setPersistentHint] = useState(false);
  const [loading, setLoading] = useState(false);
  const [flat, setFlat] = useState(false);
  const [counterEn, setCounterEn] = useState(false);
  const [counter, setCounter] = useState(0);
  const [dense, setDense] = useState(false);

  return (
    <VContainer>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
        <Stack spacing={2}>
          <VTextField label="Label" value={label} onChange={setLabel} />
          <VTextField label="Hint" value={hint} onChange={setHint} />
          <VTextField label="Placeholder" value={placeholder} onChange={setPlaceholder} />
          <Box />
          <VSwitch label="Shaped (requires Filled, Outlined or Solo)" checked={shaped} onChange={setShaped} disabled={!outlined && !filled && !solo} />
          <VSwitch label="Outlined" checked={outlined} onChange={setOutlined} />
          <VSwitch label="Rounded (requires Filled, Outlined or Solo)" checked={rounded} onChange={setRounded} disabled={!filled && !outlined && !solo} />
          <VSwitch label="Solo" checked={solo} onChange={setSolo} disabled={filled} />
          <VSwitch label="Single-line" checked={singleLine} onChange={setSingleLine} />
          <VSwitch label="Filled" checked={filled} onChange={setFilled} disabled={outlined || solo} />
          <VSwitch label="Clearable" checked={clearable} onChange={setClearable} />
          <VSwitch label="Persistent Hint" checked={persistentHint} onChange={setPersistentHint} />
          <VSwitch label="Loading" checked={loading} onChange={setLoading} />
          <VSwitch label="Flat (requires Solo)" checked={flat} onChange={setFlat} disabled={!solo} />
          <VSwitch label="Dense" checked={dense} onChange={setDense} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><VSwitch label="Counter" checked={counterEn} onChange={setCounterEn} /><Box component="input" type="range" min={0} max={100} disabled={!counterEn} value={counter} onChange={(e) => setCounter(Number(e.target.value))} /></Box>
        </Stack>
        <Box sx={{ p: 6, bgcolor: "#fff", boxShadow: "0 8px 24px rgba(0,0,0,.22)", borderRadius: .5, alignSelf: "start" }}>
          <VTextField value={model} onChange={setModel} label={label} hint={hint} placeholder={placeholder} shaped={shaped} outlined={outlined} rounded={rounded} solo={solo} singleLine={singleLine} filled={filled} clearable={clearable} persistentHint={persistentHint} loading={loading} flat={flat} counter={counterEn ? counter : undefined} dense={dense} />
          <Typography sx={{ mt: 6, textAlign: "center", fontSize: 16 }}>Value: {model}</Typography>
        </Box>
      </Box>
    </VContainer>
  );
}

function ExamplesSection() {
  return (
    <Box component="section">
      <Typography variant="h5" sx={sectionHeadingSx}>Examples</Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>Below is a collection of simple to complex examples.</Typography>
      <Stack spacing={5}>
        {examples.map((example) => (
          <VuetifyExampleBlock key={example.source} title={example.title} description={example.description} source={example.source} minHeight={example.minHeight}>{example.render}</VuetifyExampleBlock>
        ))}
      </Stack>
    </Box>
  );
}

function PairExample({ mode }: { mode?: "single" | "shaped" | "box" | "solo" | "outlined" }) {
  const [first, setFirst] = useState("John");
  const [last, setLast] = useState("Doe");
  if (mode === "shaped") {
    return (
      <VContainer>
        <VGrid>
          <VTextField label="First Name" value={first} onChange={setFirst} outlined shaped />
          <VTextField label="Last Name" value={last} onChange={setLast} filled shaped />
        </VGrid>
      </VContainer>
    );
  }
  const props = mode === "box" ? { filled: true } : mode === "solo" ? { solo: true } : mode === "outlined" ? { outlined: true } : {};
  return <VContainer><VGrid><VTextField label={mode === "single" ? "Regular" : "First Name"} value={mode === "single" ? "" : first} onChange={setFirst} singleLine={mode === "single"} {...props} /><VTextField label={mode === "single" ? "Solo" : "Last Name"} value={mode === "single" ? "" : last} onChange={setLast} singleLine={mode === "single"} solo={mode === "single" || mode === "solo"} soloInverted={mode === "solo"} {...props} /></VGrid></VContainer>;
}

function SingleLineExample() {
  return <VContainer><VGrid><VTextField label="Regular" singleLine /><VTextField label="Solo" singleLine solo /><VTextField label="Filled" singleLine filled /><VTextField label="Outlined" singleLine outlined /></VGrid></VContainer>;
}

function DisabledReadonlyExample() {
  return <VContainer><VGrid>{["", "solo", "filled", "outlined"].flatMap((mode) => [<VTextField key={`${mode}-disabled`} label={mode ? cap(mode) : "Regular"} value="John Doe" disabled solo={mode === "solo"} filled={mode === "filled"} outlined={mode === "outlined"} />, <VTextField key={`${mode}-readonly`} label={mode ? cap(mode) : "Regular"} value="John Doe" readonly solo={mode === "solo"} filled={mode === "filled"} outlined={mode === "outlined"} />])}</VGrid></VContainer>;
}

function DenseExample() {
  return <VContainer><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" }, gap: 3 }}><VTextField dense label="Regular" /><VTextField label="Filled" filled dense /><VTextField label="Filled" placeholder="Dense & Rounded" filled rounded dense /><VTextField label="Solo" solo dense /><VTextField label="Outlined" outlined dense /><VTextField label="Outlined" placeholder="Placeholder" outlined dense /></Box></VContainer>;
}

function IconExample() {
  const variants = [{}, { solo: true }, { filled: true }, { outlined: true }];
  return <VContainer><VGrid>{variants.flatMap((props, index) => [<VTextField key={`${index}-pre`} label="Prepend" prependIcon={<Place />} {...props} />, <VTextField key={`${index}-inner`} label="Prepend inner" prependInnerIcon={<Place />} {...props} />, <VTextField key={`${index}-app`} label="Append" appendIcon={<Place />} {...props} />, <VTextField key={`${index}-outer`} label="Append outer" appendOuterIcon={<Place />} {...props} />])}</VGrid></VContainer>;
}

function ClearableExample() {
  const [values, setValues] = useState(["Hey!", "Hey!", "Hey!", "Hey!"]);
  const set = (i: number, value: string) => setValues((current) => current.map((item, index) => index === i ? value : item));
  return <VContainer><VGrid><VTextField label="Regular" clearable value={values[0]} onChange={(v) => set(0, v)} /><VTextField solo label="Solo" clearable value={values[1]} onChange={(v) => set(1, v)} /><VTextField filled label="Filled" clearable value={values[2]} onChange={(v) => set(2, v)} /><VTextField label="Outlined" outlined clearable value={values[3]} onChange={(v) => set(3, v)} /></VGrid></VContainer>;
}

function CharacterCounterExample() {
  const [title, setTitle] = useState("Preliminary report");
  const [description, setDescription] = useState("California is a state in the western United States");
  const errTitle = title.length > 25 ? "Max 25 characters" : "";
  const errDesc = description.length > 25 ? "Max 25 characters" : "";
  return <VContainer><VGrid><VTextField label="Regular" value={title} onChange={setTitle} counter={25} hint="This field uses counter prop" errorText={errTitle} /><VTextField label="Limit exceeded" value={description} onChange={setDescription} counter maxLength={25} hint="This field uses maxlength attribute" errorText={errDesc} /><VTextField label="Filled" value={title} onChange={setTitle} counter={25} filled errorText={errTitle} /><VTextField label="Outlined" value={title} onChange={setTitle} counter={25} outlined errorText={errTitle} /></VGrid></VContainer>;
}

function HideDetailsExample() {
  const [main, setMain] = useState("");
  const [another, setAnother] = useState("");
  const mainError = main ? main.length < 3 ? "Min 3 characters" : "" : "";
  return <Box><VTextField label="Main input" value={main} onChange={setMain} errorText={mainError} hideDetailsAuto /><VTextField label="Another input" value={another} onChange={setAnother} /></Box>;
}

function PasswordExample() {
  const [show, setShow] = useState([false, true, false, false]);
  const toggle = (i: number) => setShow((current) => current.map((v, index) => index === i ? !v : v));
  return <VContainer><VGrid><VTextField label="Normal with hint text" value="Password" type={show[0] ? "text" : "password"} appendIcon={show[0] ? <Visibility /> : <VisibilityOff />} onAppendClick={() => toggle(0)} hint="At least 8 characters" counter /><VTextField label="Visible" value="wqfasds" type={show[1] ? "text" : "password"} appendIcon={show[1] ? <Visibility /> : <VisibilityOff />} onAppendClick={() => toggle(1)} hint="At least 8 characters" /><VTextField label="Not visible" value="wqfasds" type={show[2] ? "text" : "password"} appendIcon={show[2] ? <Visibility /> : <VisibilityOff />} onAppendClick={() => toggle(2)} hint="At least 8 characters" /><VTextField label="Error" value="Pa" type={show[3] ? "text" : "password"} appendIcon={show[3] ? <Visibility /> : <VisibilityOff />} onAppendClick={() => toggle(3)} hint="At least 8 characters" errorText="The email and password you entered don't match" /></VGrid></VContainer>;
}

function HintExample() {
  return <VContainer><VGrid><VTextField label="Your product or service" value="Grocery delivery" hint="For example, flowers or used cars" /><VTextField label="Your landing page" hint="www.example.com/page" persistentHint /><VTextField label="Your product or service" value="Grocery delivery" hint="For example, flowers or used cars" filled /><VTextField label="Your landing page" hint="www.example.com/page" persistentHint filled /><VTextField label="Your product or service" value="Grocery delivery" hint="For example, flowers or used cars" outlined /><VTextField label="Your landing page" hint="www.example.com/page" persistentHint outlined /></VGrid></VContainer>;
}

function PrefixSuffixExample() {
  return <VContainer>{[["Prefix for dollar currency", "Amount", "10.00", "$", ""], ["Suffix for weight", "Weight", "28.00", "", "lbs"], ["Suffix for email domain", "Email address", "example", "", "@gmail.com"], ["Suffix for time zone", "Label Text", "12:30:00", "", "PST"]].map(([sub, label, value, prefix, suffix]) => <Box key={sub} sx={{ display: "grid", gridTemplateColumns: "1fr 2fr", alignItems: "center", gap: 2, mb: 2 }}><Typography sx={{ color: "rgba(0,0,0,.6)" }}>{sub}</Typography><VTextField label={label} value={value} prefix={prefix} suffix={suffix} type={suffix === "PST" ? "time" : "text"} /></Box>)}</VContainer>;
}

function IconEventsExample() {
  const icons = ["😀", "😎", "💀", "🤩", "🙂", "😐", "🙁", "😛"];
  const [message, setMessage] = useState("Hey!");
  const [marker, setMarker] = useState(true);
  const [iconIndex, setIconIndex] = useState(0);
  const clear = () => setMessage("");
  return <VContainer><VTextField filled clearable label="Message" value={message} onChange={setMessage} prependIcon={<Box sx={{ fontSize: 22 }}>{icons[iconIndex]}</Box>} appendIcon={marker ? <Map /> : <Place />} appendOuterIcon={message ? <Send /> : <Mic />} onPrependClick={() => setIconIndex(iconIndex === icons.length - 1 ? 0 : iconIndex + 1)} onAppendClick={() => setMarker((v) => !v)} onAppendOuterClick={() => { setIconIndex(0); clear(); }} onClear={clear} /></VContainer>;
}

function IconSlotsExample() {
  const [message, setMessage] = useState("Hey!");
  const [loading, setLoading] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const clickMe = () => {
    setLoading(true); setMessage("Wait for it..."); setAnchor(null);
    window.setTimeout(() => { setLoading(false); setMessage("You've clicked me!"); }, 2000);
  };
  return <VContainer><VTextField outlined clearable label="Message" value={message} onChange={setMessage} prependIcon={<Tooltip title="I'm a tooltip"><HelpOutline /></Tooltip>} appendIcon={loading ? <Box sx={{ width: 24, height: 24, border: "3px solid #03a9f4", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", "@keyframes spin": { to: { transform: "rotate(360deg)" } } }} /> : <Box component="img" alt="" src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg" sx={{ width: 24, height: 24 }} />} appendOuterIcon={<Button onClick={(e) => setAnchor(e.currentTarget)} startIcon={<ViewHeadline />} sx={{ color: "rgba(0,0,0,.75)" }}>Menu</Button>} /><Menu open={Boolean(anchor)} anchorEl={anchor} onClose={() => setAnchor(null)}><MenuItem onClick={clickMe}><MyLocation sx={{ mr: 1 }} />Click me</MenuItem></Menu></VContainer>;
}

function LabelSlotExample() {
  return <VContainer><VTextField label={<span>What about <strong>icon</strong> here? <FindInPage sx={{ fontSize: 18, verticalAlign: "middle" }} /></span>} /></VContainer>;
}

function ValidationExample() {
  const [title, setTitle] = useState("Preliminary report");
  const [email, setEmail] = useState("");
  const titleError = !title ? "Required." : title.length > 20 ? "Max 20 characters" : "";
  const emailError = !email ? "" : !emailPattern.test(email) ? "Invalid e-mail." : "";
  return <VContainer><VGrid><VTextField label="Title" value={title} onChange={setTitle} counter maxLength={20} errorText={titleError} /><VTextField label="E-mail" value={email} onChange={setEmail} errorText={emailError} /></VGrid></VContainer>;
}

function FullWidthExample() {
  const [title, setTitle] = useState("Hi,\nI just wanted to check in and see if you had any plans the upcoming weekend. We are thinking of heading up to Napa");
  return <Box><Box sx={{ minHeight: 56, display: "flex", alignItems: "center", px: 1 }}><Typography sx={{ fontSize: 12, color: primary, mr: 1 }}>To</Typography><Chip label="Trevor Handsen" size="small" /></Box><DividerLine /><VTextField label="Subject" value="Plans for the weekend" singleLine fullWidth hideDetails /><DividerLine /><VTextAreaField label="Message" value={title} onChange={setTitle} counter maxLength={120} /></Box>;
}

function ProgressExample() {
  const [custom, setCustom] = useState(true);
  const [value, setValue] = useState("");
  const progress = Math.min(100, value.length * 10);
  const color = progress < 40 ? error : progress < 80 ? warning : success;
  return <VContainer><VCheck label="Custom progress bar" checked={custom} onChange={setCustom} /><VTextField label="Text field" placeholder="Start typing..." value={value} onChange={setValue} loading progress={custom ? progress : undefined} progressColor={custom ? color : undefined} /></VContainer>;
}

function CustomValidationExample() {
  const [form, setForm] = useState({ name: "", address: "", city: "", state: "", zip: "", country: "" });
  const [submitted, setSubmitted] = useState(false);
  const errorMessages = form.address && !form.name ? "Hey! I'm required" : "";
  const hasErrors = submitted && Object.values(form).some((v) => !v);
  const set = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const reset = () => { setForm({ name: "", address: "", city: "", state: "", zip: "", country: "" }); setSubmitted(false); };
  const submit = () => setSubmitted(true);
  return <Box sx={{ display: "flex", justifyContent: "center" }}><Card sx={{ width: { xs: "100%", sm: "83%", md: "66%", lg: "50%" }, boxShadow: "0 2px 4px rgba(0,0,0,.18)", borderRadius: .5 }}><Box sx={{ p: 2 }}><VTextField label="Full Name" placeholder="John Doe" value={form.name} onChange={(v) => set("name", v)} errorText={submitted && !form.name ? "This field is required" : errorMessages} /><VTextField label="Address Line" placeholder="Snowy Rock Pl" value={form.address} onChange={(v) => set("address", v)} counter={25} errorText={submitted && !form.address ? "This field is required" : form.address.length > 25 ? "Address must be less than 25 characters" : ""} /><VTextField label="City" placeholder="El Paso" value={form.city} onChange={(v) => set("city", v)} errorText={submitted && !form.city ? "This field is required" : ""} /><VTextField label="State/Province/Region" placeholder="TX" value={form.state} onChange={(v) => set("state", v)} errorText={submitted && !form.state ? "This field is required" : ""} /><VTextField label="ZIP / Postal Code" placeholder="79938" value={form.zip} onChange={(v) => set("zip", v)} errorText={submitted && !form.zip ? "This field is required" : ""} /><VSelectField label="Country" placeholder="Select..." value={form.country} onChange={(v) => set("country", v)} errorText={submitted && !form.country ? "This field is required" : ""} /></Box><DividerLine mt={6} /><Box sx={{ display: "flex", alignItems: "center", p: 1 }}><VBtn text>Cancel</VBtn><Box sx={{ flexGrow: 1 }} />{hasErrors && <Tooltip title="Refresh form"><IconButton onClick={reset}><Refresh /></IconButton></Tooltip>}<VBtn text color={primary} onClick={submit}>Submit</VBtn></Box></Card></Box>;
}

function CustomColorsExample() {
  return <VContainer><VGrid><VTextField label="First name" color="#7b1fa2" required /><VTextField label="Last name" color="#1976d2" required /><Box sx={{ gridColumn: "1 / -1" }}><VTextAreaField label={<span>Bio <small>(optional)</small></span>} color="#009688" /></Box><VTextField label="Favorite animal" color="#e91e63" required /><VTextField label="Age" color="#fb8c00" hint="Be honest" /></VGrid><Box sx={{ display: "flex", alignItems: "center" }}><VCheck label={<>Do you accept the <Box component="a" sx={{ color: primary }}>terms</Box> and <Box component="a" sx={{ color: primary }}>conditions?</Box></>} checked={false} onChange={() => undefined} /></Box><Box sx={{ display: "flex", mt: 2 }}><VBtn text>Cancel</VBtn><Box sx={{ flexGrow: 1 }} /><VBtn text color={primary} disabled>Register</VBtn></Box></VContainer>;
}

function VTextField(props: FieldProps) {
  const { value, onChange, label, placeholder, hint, persistentHint, counter, maxLength, errorText = "", disabled, readonly, filled, outlined, solo, soloInverted, flat, rounded, shaped, singleLine, dense, clearable, loading, progress, progressColor, prependIcon, prependInnerIcon, appendIcon, appendOuterIcon, onPrependClick, onAppendClick, onAppendOuterClick, onClear, prefix, suffix, type = "text", color = primary, hideDetails, hideDetailsAuto, fullWidth } = props;
  const [internal, setInternal] = useState(value || "");
  const [focused, setFocused] = useState(false);
  const text = value !== undefined ? value : internal;
  const counterExceeded = typeof counter === "number" && counter > 0 && text.length > counter;
  const computedError = errorText || (counterExceeded ? `Max ${counter} characters` : "");
  const active = !singleLine && (focused || Boolean(text) || Boolean(placeholder));
  const displayHint = persistentHint || focused || Boolean(computedError);
  const currentColor = computedError ? error : focused ? color : "rgba(0,0,0,.6)";
  const hasBox = filled || outlined || solo || soloInverted;
  const radius = rounded ? 28 : shaped ? (outlined ? "18px 4px" : "18px 18px 4px 4px") : outlined || solo || soloInverted ? 4 : 0;
  const height = dense ? (hasBox ? 40 : 34) : (hasBox ? 56 : 48);
  const details = !hideDetails && !(hideDetailsAuto && !computedError && !hint && counter === undefined);
  const labelColor = disabled ? "rgba(0,0,0,.38)" : currentColor;
  const idleBorderColor = disabled ? "rgba(0,0,0,.18)" : "rgba(0,0,0,.42)";
  const boxBorderColor = disabled ? "rgba(0,0,0,.18)" : focused || computedError ? currentColor : "rgba(0,0,0,.38)";
  const labelTop = singleLine ? "50%" : active ? (outlined ? -7 : filled ? 7 : solo || soloInverted ? 8 : -4) : "50%";
  const labelTransform = singleLine ? "translateY(-50%) scale(1)" : active ? "translateY(0) scale(.75)" : "translateY(-50%) scale(1)";
  const inputPadTop = label && active && !singleLine ? (hasBox ? 1.35 : 1.55) : 0;
  const boxPaddingX = hasBox ? (dense ? 1.4 : 1.5) : 0;
  const setValue = (next: string) => {
    if (disabled || readonly) return;
    if (maxLength) next = next.slice(0, maxLength);
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };
  const clear = () => { setValue(""); onClear?.(); };
  return (
    <Box sx={{ width: fullWidth ? "100%" : "100%", mb: details ? 2 : .8, opacity: disabled ? .55 : 1 }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
        {prependIcon && <IconSlot height={height} onClick={onPrependClick}>{prependIcon}</IconSlot>}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ position: "relative", minHeight: height, height, px: boxPaddingX, display: "flex", alignItems: "center", bgcolor: soloInverted ? "rgba(0,0,0,.06)" : solo ? "#fff" : filled ? "rgba(0,0,0,.06)" : "transparent", border: outlined ? `1px solid ${boxBorderColor}` : 0, borderBottom: outlined || solo || soloInverted ? undefined : `1px solid ${computedError ? error : focused ? currentColor : idleBorderColor}`, borderRadius: radius, boxShadow: solo && !flat ? "0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)" : "none", transition: "border-color 150ms ease, border-bottom-color 150ms ease, box-shadow 150ms ease", "&:before": !outlined && !solo && !soloInverted ? { content: '""', position: "absolute", left: 0, right: 0, bottom: 0, height: focused || computedError ? 2 : 0, bgcolor: currentColor, transition: "height 150ms ease" } : undefined, "&:hover": { borderColor: computedError ? error : "rgba(0,0,0,.87)", borderBottomColor: computedError ? error : "rgba(0,0,0,.87)" } }}>
            {prependInnerIcon && <IconSlot height={height} inner onClick={onPrependClick}>{prependInnerIcon}</IconSlot>}
            <Box sx={{ flex: 1, position: "relative", minWidth: 0, height: "100%", display: "flex", alignItems: "center" }}>
              {label && <Typography component="label" sx={{ position: "absolute", left: 0, top: labelTop, transform: labelTransform, transformOrigin: "top left", color: labelColor, fontSize: 16, lineHeight: 1, px: outlined && active ? .35 : 0, bgcolor: outlined && active ? "#f2f3f7" : "transparent", maxWidth: "calc(100% - 8px)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", transition: "all 150ms cubic-bezier(.4,0,.2,1)", pointerEvents: "none", zIndex: 1 }}>{label}</Typography>}
              {prefix && <Typography sx={{ mt: inputPadTop, mr: .5, color: "rgba(0,0,0,.72)" }}>{prefix}</Typography>}
              <Box component="input" type={type} value={text} readOnly={readonly} disabled={disabled} placeholder={placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={(e) => setValue(e.target.value)} sx={{ width: "100%", minWidth: 0, height: "100%", border: 0, outline: 0, bgcolor: "transparent", fontSize: dense ? 15 : 16, fontFamily: "inherit", pt: inputPadTop, color: disabled ? "rgba(0,0,0,.38)" : "rgba(0,0,0,.87)", "&::placeholder": { color: "rgba(0,0,0,.38)", opacity: placeholder && (!label || active || singleLine) ? 1 : 0 } }} />
              {suffix && <Typography sx={{ mt: inputPadTop, ml: .5, color: "rgba(0,0,0,.72)" }}>{suffix}</Typography>}
            </Box>
            {clearable && text && <IconButton size="small" onClick={clear} sx={{ color: "rgba(0,0,0,.54)" }}><Close sx={{ fontSize: 18 }} /></IconButton>}
            {appendIcon && <IconButton size="small" onClick={onAppendClick} sx={{ color: "rgba(0,0,0,.54)", width: dense ? 32 : 36, height: dense ? 32 : 36 }}>{appendIcon}</IconButton>}
          </Box>
          {loading && <LinearProgress variant={progress !== undefined ? "determinate" : "indeterminate"} value={progress} sx={{ height: progress !== undefined ? 7 : 2, bgcolor: "rgba(0,0,0,.08)", "& .MuiLinearProgress-bar": { bgcolor: progressColor || currentColor } }} />}
          {details && <Box sx={{ minHeight: 20, mt: .45, display: "flex", justifyContent: "space-between", px: hasBox ? 1.5 : 0 }}><Typography sx={{ fontSize: 12, color: computedError ? error : "rgba(0,0,0,.6)" }}>{computedError || (displayHint ? hint : "")}</Typography>{counter !== undefined && <Typography sx={{ fontSize: 12, color: computedError ? error : "rgba(0,0,0,.6)" }}>{text.length}{typeof counter === "number" && counter > 0 ? ` / ${counter}` : ""}</Typography>}</Box>}
        </Box>
        {appendOuterIcon && <IconSlot height={height} onClick={onAppendOuterClick}>{appendOuterIcon}</IconSlot>}
      </Box>
    </Box>
  );
}

interface FieldProps {
  value?: string; onChange?: (value: string) => void; label?: ReactNode; placeholder?: string; hint?: string; persistentHint?: boolean; counter?: number | boolean; maxLength?: number; errorText?: string; disabled?: boolean; readonly?: boolean; filled?: boolean; outlined?: boolean; solo?: boolean; soloInverted?: boolean; flat?: boolean; rounded?: boolean; shaped?: boolean; singleLine?: boolean; dense?: boolean; clearable?: boolean; loading?: boolean; progress?: number; progressColor?: string; prependIcon?: ReactNode; prependInnerIcon?: ReactNode; appendIcon?: ReactNode; appendOuterIcon?: ReactNode; onPrependClick?: () => void; onAppendClick?: () => void; onAppendOuterClick?: () => void; onClear?: () => void; prefix?: string; suffix?: string; type?: string; color?: string; hideDetails?: boolean; hideDetailsAuto?: boolean; fullWidth?: boolean; required?: boolean;
}

function VTextAreaField({ value = "", onChange, label, counter, maxLength, color = primary }: { value?: string; onChange?: (value: string) => void; label?: ReactNode; counter?: boolean; maxLength?: number; color?: string }) {
  const [focused, setFocused] = useState(false);
  return <Box sx={{ mb: 2 }}><Box sx={{ position: "relative", pt: 2, borderBottom: `1px solid ${focused ? color : "rgba(0,0,0,.42)"}` }}><Typography sx={{ position: "absolute", top: 0, fontSize: 12, color: focused ? color : "rgba(0,0,0,.6)" }}>{label}</Typography><Box component="textarea" value={value} maxLength={maxLength} onChange={(e) => onChange?.(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} sx={{ width: "100%", minHeight: 96, mt: 1, border: 0, outline: 0, resize: "vertical", bgcolor: "transparent", font: "inherit", fontSize: 16 }} /></Box>{counter && <Typography sx={{ textAlign: "right", fontSize: 12, color: "rgba(0,0,0,.6)" }}>{value.length}</Typography>}</Box>;
}

function VSelectField({ label, placeholder, value, onChange, errorText }: { label: string; placeholder: string; value: string; onChange: (value: string) => void; errorText?: string }) {
  return <Box sx={{ mb: 2 }}><Select displayEmpty value={value} onChange={(e) => onChange(e.target.value)} fullWidth variant="standard" sx={{ fontSize: 16 }}><MenuItem value="">{placeholder}</MenuItem>{["Afghanistan", "Albania", "Algeria", "Andorra", "United States"].map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}</Select><Typography sx={{ fontSize: 12, color: error }}>{errorText}</Typography><Typography sx={{ fontSize: 12, color: "rgba(0,0,0,.6)", mt: -5, pointerEvents: "none" }}>{label}</Typography></Box>;
}

function IconSlot({ children, onClick, inner = false, height = 56 }: { children: ReactNode; onClick?: () => void; inner?: boolean; height?: number }) {
  return <Box onClick={onClick} sx={{ width: inner ? 30 : 34, minWidth: inner ? 30 : 34, height, color: "rgba(0,0,0,.54)", cursor: onClick ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", "& svg": { fontSize: 22 } }}>{children}</Box>;
}

function VSwitch({ label, checked, onChange, disabled = false }: { label: string; checked: boolean; onChange: (value: boolean) => void; disabled?: boolean }) {
  return <Box onClick={() => !disabled && onChange(!checked)} sx={{ display: "inline-flex", alignItems: "center", m: .5, cursor: disabled ? "default" : "pointer", opacity: disabled ? .45 : 1 }}><Box sx={{ width: 42, height: 34, position: "relative", mr: .5, display: "flex", alignItems: "center" }}><Box sx={{ width: 34, height: 14, borderRadius: 8, bgcolor: checked ? primary : "rgba(0,0,0,.38)", opacity: checked ? .5 : .38 }} /><Box sx={{ position: "absolute", left: checked ? 18 : 0, width: 20, height: 20, borderRadius: "50%", bgcolor: checked ? primary : "#fafafa", boxShadow: "0 2px 4px rgba(0,0,0,.32)" }} /></Box><Typography sx={{ fontSize: 16 }}>{label}</Typography></Box>;
}

function VCheck({ label, checked, onChange }: { label: ReactNode; checked: boolean; onChange: (value: boolean) => void }) {
  return <Box onClick={() => onChange(!checked)} sx={{ display: "flex", alignItems: "center", cursor: "pointer", my: 1 }}><Checkbox checked={checked} sx={{ color: primary, "&.Mui-checked": { color: primary } }} /><Typography sx={{ fontSize: 16 }}>{label}</Typography></Box>;
}

function VBtn({ children, text = false, color = primary, onClick, disabled = false }: { children: ReactNode; text?: boolean; color?: string; onClick?: () => void; disabled?: boolean }) {
  return <Button disabled={disabled} onClick={onClick} sx={{ minWidth: 64, height: 36, color: text ? color : "#fff", bgcolor: text ? "transparent" : color, textTransform: "uppercase", "&:hover": { bgcolor: text ? "rgba(0,0,0,.04)" : color } }}>{children}</Button>;
}

function VContainer({ children }: { children: ReactNode }) {
  return <Box sx={{ width: "100%", px: { xs: 1.5, md: 3 }, py: 1 }}>{children}</Box>;
}

function VGrid({ children }: { children: ReactNode }) {
  return <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3 }}>{children}</Box>;
}

function DividerLine({ mt = 0 }: { mt?: number }) {
  return <Box sx={{ borderTop: "1px solid rgba(0,0,0,.12)", mt }} />;
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: .55, py: .18, borderRadius: .75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function VuetifyExampleBlock({ title, description, source, children, minHeight }: { title: string; description: ReactNode; source: ExampleKey; children: () => ReactNode; minHeight: number }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return <Card sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}><Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2 }}><Typography sx={{ fontSize: 20 }}>{title}</Typography><Box sx={{ flexGrow: 1 }} /><Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((v) => !v)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip><Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip><Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((v) => !v)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip></Toolbar><Collapse in={sourceOpen} timeout={180} unmountOnExit><Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", maxHeight: { xs: "none", sm: "calc(100vh - 275px)" }, overflowY: "auto", p: 2 }}><Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box></Box></Collapse><Box sx={{ px: 2, py: 2, minHeight, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit" }}>{description && <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography>}{children()}</Box></Card>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: .5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

function cap(text: string) { return text.charAt(0).toUpperCase() + text.slice(1); }
const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const examples: Example[] = [
  { title: "Single line", description: <>Single line text fields do not float their label on focus or with data.</>, source: "simple/single-line", minHeight: 260, render: () => <SingleLineExample /> },
  { title: "Shaped", description: <><CodePill>shaped</CodePill> text fields are rounded if they&apos;re <CodePill>outlined</CodePill> and have higher <CodePill>border-radius</CodePill> if <CodePill>filled</CodePill>.</>, source: "simple/shaped", minHeight: 180, render: () => <PairExample mode="shaped" /> },
  { title: "Disabled and readonly", description: <>Text fields can be <CodePill>disabled</CodePill> or <CodePill>readonly</CodePill>.</>, source: "simple/disabled-and-readonly", minHeight: 520, render: () => <DisabledReadonlyExample /> },
  { title: "Dense", description: <>You can reduces the text field height with <CodePill>dense</CodePill> prop.</>, source: "simple/dense", minHeight: 320, render: () => <DenseExample /> },
  { title: "Icons", description: <>You can add icons to the text field with <CodePill>prepend-icon</CodePill>, <CodePill>append-icon</CodePill> and <CodePill>append-outer-icon</CodePill> props.</>, source: "simple/icon", minHeight: 760, render: () => <IconExample /> },
  { title: "Clearable", description: <>When <CodePill>clearable</CodePill>, you can customize the clear icon with <CodePill>clear-icon</CodePill>.</>, source: "simple/clearable", minHeight: 260, render: () => <ClearableExample /> },
  { title: "Character counter", description: <>Use a <CodePill>counter</CodePill> prop to inform a user of the character limit. The counter does not perform any validation by itself. You will need to pair it with either the internal validation system, or a 3rd party library. You can use it on regular, box or outlined text fields.</>, source: "simple/character-counter", minHeight: 340, render: () => <CharacterCounterExample /> },
  { title: "Auto hiding details", description: <>When <CodePill>hide-details</CodePill> is set to <CodePill>auto</CodePill> messages will be rendered only if there&apos;s a message (hint, error message, counter value etc) to display.</>, source: "simple/hide-details", minHeight: 170, render: () => <HideDetailsExample /> },
  { title: "Password input", description: <>A password input can be used with an appended icon and callback to control the visibility.</>, source: "simple/password", minHeight: 260, render: () => <PasswordExample /> },
  { title: "Box style", description: <>Text fields can be used with an alternative box design. Append and prepend icon props are <strong>not</strong> supported in this mode.</>, source: "simple/box", minHeight: 180, render: () => <PairExample mode="box" /> },
  { title: "Solo style", description: <>Text fields can be used with an alternative solo design.</>, source: "simple/solo", minHeight: 180, render: () => <PairExample mode="solo" /> },
  { title: "Outlined style", description: <>Text fields can be used with an alternative outlined design.</>, source: "simple/outlined", minHeight: 180, render: () => <PairExample mode="outlined" /> },
  { title: "Custom colors", description: <>You can optionally change a text field into any color in the Material design palette. Below is an example implementation of a custom form with validation.</>, source: "simple/custom-colors", minHeight: 520, render: () => <CustomColorsExample /> },
  { title: "Hint text", description: <>The <CodePill>hint</CodePill> property on text fields adds the provided string beneath the text field. Using <CodePill>persistent-hint</CodePill> keeps the hint visible when the text field is not focused. Hint prop is <strong>not</strong> supported in solo mode.</>, source: "simple/hint", minHeight: 420, render: () => <HintExample /> },
  { title: "Prefixes & suffixes", description: <>The <CodePill>prefix</CodePill> and <CodePill>suffix</CodePill> properties allows you to prepend and append inline non-modifiable text next to the text field.</>, source: "simple/prefixes-and-suffixes", minHeight: 360, render: () => <PrefixSuffixExample /> },
  { title: "Icon events", description: <><CodePill>click:prepend</CodePill>, <CodePill>click:append</CodePill>, <CodePill>click:append-outer</CodePill>, and <CodePill>click:clear</CodePill> will be emitted when you click on the respective icon. Note that these events will not be fired if the slot is used instead. </>, source: "intermediate/icon-events", minHeight: 170, render: () => <IconEventsExample /> },
  { title: "Icon slots", description: <>Instead of using prepend / append / append-outer icons you can use slots to extend input&apos;s functionality.</>, source: "intermediate/icon-slots", minHeight: 200, render: () => <IconSlotsExample /> },
  { title: "Label slot", description: <>Text field label can be defined in <CodePill>label</CodePill> slot - that will allow to use HTML content</>, source: "intermediate/label-slot", minHeight: 160, render: () => <LabelSlotExample /> },
  { title: "Validation", description: <>Vuetify includes simple validation through the <CodePill>rules</CodePill> prop. The prop accepts an array of callbacks. While validating rules, the current v-model value will be passed to the callback. This callback should return either <CodePill>true</CodePill> or a <CodePill>String</CodePill>, the error message.</>, source: "intermediate/validation", minHeight: 190, render: () => <ValidationExample /> },
  { title: "Full-width text field with character counter", description: <>Full width text fields allow you to create boundless inputs. In this example, we use a <CodePill>v-divider</CodePill> to separate the fields.</>, source: "intermediate/full-width-with-character-counter", minHeight: 360, render: () => <FullWidthExample /> },
  { title: "Progress bar", description: <>You can display a progress bar instead of the bottom line. You can use the default indeterminate progress having same color as the text field or designate a custom one using the <CodePill>progress</CodePill> slot</>, source: "intermediate/progress-bar", minHeight: 210, render: () => <ProgressExample /> },
  { title: "Custom validation", description: <>While the built in <CodePill>v-form</CodePill> or 3rd party plugin such as <Box component="a" href="https://github.com/monterail/vuelidate" sx={{ color: primary }}>vuelidate</Box> or <Box component="a" href="https://github.com/logaretm/vee-validate" sx={{ color: primary }}>vee-validation</Box> can help streamline your validation process, you can choose to simply control it yourself.</>, source: "complex/custom-validation", minHeight: 620, render: () => <CustomValidationExample /> },
];

const sourceTemplates = {
  usage: "src/demo/examples/text-fields/usage.vue",
  playground: "src/demo/examples/text-fields/playground.vue",
  "simple/single-line": "src/demo/examples/text-fields/simple/single-line.vue",
  "simple/shaped": "src/demo/examples/text-fields/simple/shaped.vue",
  "simple/disabled-and-readonly": "src/demo/examples/text-fields/simple/disabled-and-readonly.vue",
  "simple/dense": "src/demo/examples/text-fields/simple/dense.vue",
  "simple/icon": "src/demo/examples/text-fields/simple/icon.vue",
  "simple/clearable": "src/demo/examples/text-fields/simple/clearable.vue",
  "simple/character-counter": "src/demo/examples/text-fields/simple/character-counter.vue",
  "simple/hide-details": "src/demo/examples/text-fields/simple/hide-details.vue",
  "simple/password": "src/demo/examples/text-fields/simple/password.vue",
  "simple/box": "src/demo/examples/text-fields/simple/box.vue",
  "simple/solo": "src/demo/examples/text-fields/simple/solo.vue",
  "simple/outlined": "src/demo/examples/text-fields/simple/outlined.vue",
  "simple/custom-colors": "src/demo/examples/text-fields/simple/custom-colors.vue",
  "simple/hint": "src/demo/examples/text-fields/simple/hint.vue",
  "simple/prefixes-and-suffixes": "src/demo/examples/text-fields/simple/prefixes-and-suffixes.vue",
  "intermediate/icon-events": "src/demo/examples/text-fields/intermediate/icon-events.vue",
  "intermediate/icon-slots": "src/demo/examples/text-fields/intermediate/icon-slots.vue",
  "intermediate/label-slot": "src/demo/examples/text-fields/intermediate/label-slot.vue",
  "intermediate/validation": "src/demo/examples/text-fields/intermediate/validation.vue",
  "intermediate/full-width-with-character-counter": "src/demo/examples/text-fields/intermediate/full-width-with-character-counter.vue",
  "intermediate/progress-bar": "src/demo/examples/text-fields/intermediate/progress-bar.vue",
  "complex/custom-validation": "src/demo/examples/text-fields/complex/custom-validation.vue",
};
