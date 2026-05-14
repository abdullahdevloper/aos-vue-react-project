import { useEffect, useRef, useState, type ReactNode } from "react";
import { Box, Button, Card, Checkbox, Collapse, Dialog, DialogContent, IconButton, LinearProgress, Stack, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { ArrowBack, ChangeHistory, Circle, Close, Code, Comment, GitHub, InvertColors, MoreVert, Search, Square, ViewHeadline } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const deepPurple = "#6200ea";
const deepPurpleDark = "#311b92";
const error = "#ff5252";
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

export default function TextareasPage() {
  return (
    <DocPage
      title="Textarea"
      namespace="Components"
      icon={<ViewHeadline />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Textarea" },
      ]}
    >
      <DocText>Textarea components are used for collecting large amounts of textual data.</DocText>
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
      <Typography sx={docsParagraphSx}><CodePill>v-textarea</CodePill> in its simplest form is a multi-line text-field, useful for larger amounts of text.</Typography>
      <VuetifyExampleBlock title="" description="" source="usage" minHeight={365}>
        {() => <UsageExample />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function UsageExample() {
  const woodman = "The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.";
  return (
    <VContainer>
      <VGrid>
        <VTextarea name="input-7-1" label="Default style" value={woodman} hint="Hint text" />
        <VTextarea solo name="input-7-4" label="Solo textarea" />
        <VTextarea filled name="input-7-4" label="Filled textarea" value={woodman} />
        <VTextarea outlined name="input-7-4" label="Outlined textarea" value={woodman} />
      </VGrid>
    </VContainer>
  );
}

function PlaygroundSection() {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <Typography variant="h5" sx={sectionHeadingSx}>Playground</Typography>
      <VuetifyExampleBlock title="" description="" source="playground" minHeight={610}>
        {() => <PlaygroundExample />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function PlaygroundExample() {
  const [label, setLabel] = useState("");
  const [hint, setHint] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [rowHeight, setRowHeight] = useState(24);
  const [rows, setRows] = useState(1);
  const [autoGrow, setAutoGrow] = useState(false);
  const [clearable, setClearable] = useState(false);
  const [filled, setFilled] = useState(false);
  const [flat, setFlat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [outlined, setOutlined] = useState(false);
  const [persistentHint, setPersistentHint] = useState(false);
  const [rounded, setRounded] = useState(false);
  const [shaped, setShaped] = useState(false);
  const [singleLine, setSingleLine] = useState(false);
  const [solo, setSolo] = useState(false);
  const [model, setModel] = useState("I'm a textarea.");

  return (
    <VContainer>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3, alignItems: "start" }}>
        <Stack spacing={2.2}>
          <VTextInput label="Label" value={label} onChange={setLabel} />
          <VTextInput label="Hint" value={hint} onChange={setHint} />
          <VTextInput label="Placeholder" value={placeholder} onChange={setPlaceholder} />
        </Stack>
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <VTextInput label="Row height - px" type="number" value={String(rowHeight)} onChange={(next) => setRowHeight(clampNumber(next, 1, 500))} disabled={!autoGrow} width={125} />
          <VTextInput label="Rows" type="number" value={String(rows)} onChange={(next) => setRows(clampNumber(next, 1, 50))} width={125} />
        </Box>
        <Box sx={{ gridColumn: "1 / -1" }} />
        <Box>
          <VSwitch label="Auto-grow" checked={autoGrow} onChange={setAutoGrow} />
          <VSwitch label="Clearable" checked={clearable} onChange={setClearable} />
          <VSwitch label="Filled" checked={filled} onChange={setFilled} />
          <VSwitch label="Flat (requires Solo)" checked={flat} onChange={setFlat} disabled={!solo} />
          <VSwitch label="Loading" checked={loading} onChange={setLoading} />
          <VSwitch label="Outlined" checked={outlined} onChange={setOutlined} />
          <VSwitch label="Persistent Hint" checked={persistentHint} onChange={setPersistentHint} />
          <VSwitch label="Rounded (requires Filled or Outlined)" checked={rounded} onChange={setRounded} />
          <VSwitch label="Shaped (requires Filled or Outlined)" checked={shaped} onChange={setShaped} />
          <VSwitch label="Single-line" checked={singleLine} onChange={setSingleLine} />
          <VSwitch label="Solo" checked={solo} onChange={setSolo} />
        </Box>
        <Box>
          <Box sx={{ p: 6, bgcolor: "#fff", boxShadow: "0 8px 24px rgba(0,0,0,.22)", borderRadius: .5 }}>
            <VTextarea
              value={model}
              onChange={setModel}
              autoGrow={autoGrow}
              clearable={clearable}
              filled={filled}
              flat={flat}
              hint={hint}
              label={label}
              loading={loading}
              outlined={outlined}
              persistentHint={persistentHint}
              placeholder={placeholder}
              rounded={rounded}
              rowHeight={rowHeight}
              rows={rows}
              shaped={shaped}
              singleLine={singleLine}
              solo={solo}
            />
            <Typography sx={{ mt: 6, textAlign: "center", fontSize: 16 }}>Value: {model}</Typography>
          </Box>
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
          <VuetifyExampleBlock key={example.source} title={example.title} description={example.description} source={example.source} minHeight={example.minHeight}>
            {example.render}
          </VuetifyExampleBlock>
        ))}
      </Stack>
    </Box>
  );
}

function IconExample() {
  return (
    <VContainer>
      <VGrid>
        <VTextarea label="prepend-icon" rows={1} prependIcon={<Comment />} classMx />
        <VTextarea label="append-icon" rows={1} appendIcon={<Comment />} classMx />
        <VTextarea label="prepend-inner-icon" rows={1} prependInnerIcon={<Comment />} classMx />
        <VTextarea label="append-outer-icon" rows={1} appendOuterIcon={<Comment />} classMx />
      </VGrid>
    </VContainer>
  );
}

function AutoGrowExample() {
  const [value, setValue] = useState("The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.");
  return <VContainer><VTextarea filled label="Label" autoGrow value={value} onChange={setValue} /></VContainer>;
}

function BackgroundColorExample() {
  return (
    <VContainer narrow>
      <VTextarea backgroundColor="#03a9f4" color="#000" label="Label" />
      <VTextarea backgroundColor="#e0e0e0" color="#00bcd4" label="Label" />
      <VTextarea backgroundColor="#fff8e1" color="#ef6c00" label="Label" />
    </VContainer>
  );
}

function BrowserAutocompleteExample() {
  return <VContainer><VTextarea autocomplete="email" label="Email" /></VContainer>;
}

function ClearableExample() {
  const [value, setValue] = useState("This is clearable text.");
  return <VContainer><VTextarea clearable clearIcon={<Close />} label="Text" value={value} onChange={setValue} /></VContainer>;
}

function CounterExample() {
  const [value, setValue] = useState("Hello!");
  const errorText = value.length > 25 ? "Max 25 characters" : "";
  return <VContainer><VTextarea counter label="Text" value={value} onChange={setValue} errorText={errorText} /></VContainer>;
}

function NoResizeExample() {
  const [value, setValue] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
  return <VContainer><VTextarea label="Text" noResize rows={1} value={value} onChange={setValue} /></VContainer>;
}

function RowsExample() {
  return (
    <VContainer>
      <VGrid>
        <VTextarea label="One row" autoGrow outlined rows={1} rowHeight={15} />
        <VTextarea filled autoGrow label="Two rows" rows={2} rowHeight={20} />
        <VTextarea label="Three rows" autoGrow outlined rows={3} rowHeight={25} shaped />
        <VTextarea filled autoGrow label="Four rows" rows={4} rowHeight={30} shaped />
      </VGrid>
    </VContainer>
  );
}

function SignupBoxExample() {
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts");
  const [agreement, setAgreement] = useState(false);
  const [dialog, setDialog] = useState(false);
  const passwordError = password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/.test(password) ? "Password must contain an upper case letter, a numeric character, and a special character" : password && password.length < 6 ? "Invalid character length, required 6" : "";
  const emailError = email && !email.match(/@/) ? "Please enter a valid email" : "";
  const formValid = Boolean(password && !passwordError && phone && email && !emailError && agreement);
  const clear = () => {
    setPassword("");
    setPhone("");
    setEmail("");
    setBio("");
    setAgreement(false);
  };

  return (
    <Card sx={{ maxWidth: 500, mx: "auto", borderRadius: .5, overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,.18)" }}>
      <Box sx={{ height: 24, bgcolor: deepPurpleDark, display: "flex", justifyContent: "flex-end", alignItems: "center", px: 2, color: "#fff" }}><Square sx={{ fontSize: 12 }} /><Circle sx={{ fontSize: 12, ml: 1 }} /><ChangeHistory sx={{ fontSize: 14, ml: 1 }} /></Box>
      <Toolbar sx={{ minHeight: 64, bgcolor: deepPurple, color: "#fff", px: 1 }}><IconButton sx={{ color: "#fff" }}><ArrowBack /></IconButton><Typography sx={{ fontSize: 20, fontWeight: 400 }}>Sign up</Typography><Box sx={{ flexGrow: 1 }} /><IconButton sx={{ color: "#fff" }}><Search /></IconButton><IconButton sx={{ color: "#fff" }}><MoreVert /></IconButton></Toolbar>
      <Box sx={{ p: 3, pt: 3.8 }}>
        <VTextInput filled color={deepPurple} counter={6} label="Password" type="password" value={password} onChange={setPassword} errorText={passwordError} minHeight={96} />
        <VTextInput filled color={deepPurple} label="Phone number" value={phone} onChange={setPhone} />
        <VTextInput filled color={deepPurple} label="Email address" type="email" value={email} onChange={setEmail} errorText={emailError} />
        <VTextarea autoGrow filled color={deepPurple} label="Bio" rows={1} value={bio} onChange={setBio} />
        <Box sx={{ display: "flex", alignItems: "flex-start", color: agreement ? deepPurple : "rgba(0,0,0,.72)" }}>
          <Checkbox checked={agreement} onChange={(event) => setAgreement(event.target.checked)} sx={{ color: deepPurple, "&.Mui-checked": { color: deepPurple }, mt: -.6, ml: -1 }} />
          <Typography sx={{ fontSize: 16, lineHeight: 1.45 }}>
            I agree to the&nbsp;<Box component="a" href="#" onClick={(event) => { event.preventDefault(); setDialog(true); }} sx={{ color: primary }}>Terms of Service</Box>&nbsp;and&nbsp;<Box component="a" href="#" onClick={(event) => { event.preventDefault(); setDialog(true); }} sx={{ color: primary }}>Privacy Policy</Box>*
          </Typography>
        </Box>
      </Box>
      <Box sx={{ borderTop: "1px solid rgba(0,0,0,.12)", display: "flex", alignItems: "center", p: 1, pl: 2 }}>
        <VBtn text onClick={clear}>Clear</VBtn>
        <Box sx={{ flexGrow: 1 }} />
        <VBtn color={deepPurple} disabled={!formValid}>Submit</VBtn>
      </Box>
      <Dialog open={dialog} onClose={() => undefined} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: .5 } }}>
        <Box sx={{ bgcolor: "#eee", px: 3, py: 2 }}><Typography sx={{ fontSize: 24 }}>Legal</Typography></Box>
        <DialogContent sx={{ fontSize: 16, color: "rgba(0,0,0,.72)", lineHeight: 1.5 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </DialogContent>
        <Box sx={{ borderTop: "1px solid rgba(0,0,0,.12)", p: 1, display: "flex" }}>
          <VBtn text onClick={() => { setAgreement(false); setDialog(false); }}>No</VBtn>
          <Box sx={{ flexGrow: 1 }} />
          <VBtn color={deepPurple} onClick={() => { setAgreement(true); setDialog(false); }}>Yes</VBtn>
        </Box>
      </Dialog>
    </Card>
  );
}

function VTextarea({
  value,
  onChange,
  label,
  hint,
  placeholder,
  rows = 5,
  rowHeight = 24,
  autoGrow = false,
  filled = false,
  outlined = false,
  solo = false,
  flat = false,
  rounded = false,
  shaped = false,
  singleLine = false,
  clearable = false,
  clearIcon = <Close />,
  counter = false,
  loading = false,
  persistentHint = false,
  noResize = false,
  disabled = false,
  errorText = "",
  color = primary,
  backgroundColor,
  prependIcon,
  appendIcon,
  prependInnerIcon,
  appendOuterIcon,
  name,
  autocomplete,
  classMx = false,
}: {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  hint?: string;
  placeholder?: string;
  rows?: number;
  rowHeight?: number;
  autoGrow?: boolean;
  filled?: boolean;
  outlined?: boolean;
  solo?: boolean;
  flat?: boolean;
  rounded?: boolean;
  shaped?: boolean;
  singleLine?: boolean;
  clearable?: boolean;
  clearIcon?: ReactNode;
  counter?: boolean;
  loading?: boolean;
  persistentHint?: boolean;
  noResize?: boolean;
  disabled?: boolean;
  errorText?: string;
  color?: string;
  backgroundColor?: string;
  prependIcon?: ReactNode;
  appendIcon?: ReactNode;
  prependInnerIcon?: ReactNode;
  appendOuterIcon?: ReactNode;
  name?: string;
  autocomplete?: string;
  classMx?: boolean;
}) {
  const [internal, setInternal] = useState(value || "");
  const [autoHeight, setAutoHeight] = useState(rows * rowHeight + 22);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const controlled = value !== undefined && onChange !== undefined;
  const text = controlled ? value : internal;
  const hasText = Boolean(text);
  const active = focused || hasText || Boolean(placeholder) || singleLine;
  const currentColor = errorText ? error : focused ? color : "rgba(0,0,0,.6)";
  const showHint = persistentHint || focused;
  const minRows = autoGrow ? rows : rows;
  const baseTextareaHeight = rows * rowHeight + 22;
  const textareaHeight = autoGrow ? autoHeight : baseTextareaHeight;
  const fieldMinHeight = Math.max(textareaHeight, 56);
  const hasBox = filled || outlined || solo || Boolean(backgroundColor);
  const radius = rounded ? 28 : shaped ? "16px 4px" : solo ? 4 : outlined ? 4 : 0;
  const setText = (next: string) => {
    if (disabled) return;
    if (!controlled) setInternal(next);
    onChange?.(next);
  };
  const clear = () => {
    setText("");
    ref.current?.focus();
  };

  useEffect(() => {
    if (!autoGrow || !ref.current) {
      setAutoHeight(baseTextareaHeight);
      return;
    }
    const textarea = ref.current;
    textarea.style.height = "auto";
    const nextHeight = Math.max(baseTextareaHeight, textarea.scrollHeight);
    textarea.style.height = `${nextHeight}px`;
    setAutoHeight(nextHeight);
  }, [autoGrow, baseTextareaHeight, text, rows, rowHeight, label, active]);

  return (
    <Box sx={{ width: "100%", mx: classMx ? 1 : 0, mb: 2.4, opacity: disabled ? .55 : 1 }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
        {prependIcon && <IconSlot>{prependIcon}</IconSlot>}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "flex-start",
              minHeight: fieldMinHeight,
              px: hasBox ? 1.5 : 0,
              pt: hasBox ? 1.8 : 1.3,
              pb: .4,
              bgcolor: backgroundColor || (solo ? "#fff" : filled ? "rgba(0,0,0,.06)" : "transparent"),
              border: outlined ? `1px solid ${focused ? currentColor : "rgba(0,0,0,.38)"}` : 0,
              borderBottom: outlined || solo ? undefined : `1px solid ${errorText ? error : focused ? currentColor : "rgba(0,0,0,.42)"}`,
              borderRadius: radius,
              boxShadow: solo && !flat ? "0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)" : "none",
              transition: "border-color 150ms ease, box-shadow 150ms ease, background-color 150ms ease",
              "&:hover": { borderColor: errorText ? error : "rgba(0,0,0,.87)", borderBottomColor: errorText ? error : "rgba(0,0,0,.87)" },
            }}
          >
            {prependInnerIcon && <Box sx={{ color: "rgba(0,0,0,.54)", mr: 1, pt: .9 }}>{prependInnerIcon}</Box>}
            <Box sx={{ position: "relative", flex: 1, minWidth: 0 }}>
              {label && (
                <Typography
                  component="label"
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: active ? -10 : 8,
                    transform: active ? "scale(.75)" : "scale(1)",
                    transformOrigin: "top left",
                    color: currentColor,
                    fontSize: 16,
                    lineHeight: 1,
                    pointerEvents: "none",
                    transition: "top 150ms ease, transform 150ms ease, color 150ms ease",
                  }}
                >
                  {label}
                </Typography>
              )}
              <Box
                component="textarea"
                ref={ref}
                name={name}
                autoComplete={autocomplete}
                value={text}
                placeholder={placeholder}
                disabled={disabled}
                rows={autoGrow ? minRows : rows}
                onChange={(event) => setText(event.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                sx={{
                  width: "100%",
                  minHeight: textareaHeight,
                  height: textareaHeight,
                  mt: label && active ? 1.2 : 0,
                  pt: label && !active ? 1.45 : .2,
                  border: 0,
                  outline: 0,
                  resize: noResize || autoGrow ? "none" : "vertical",
                  overflow: autoGrow ? "hidden" : "auto",
                  bgcolor: "transparent",
                  color: disabled ? "rgba(0,0,0,.38)" : "rgba(0,0,0,.87)",
                  font: "inherit",
                  fontSize: 16,
                  lineHeight: `${rowHeight}px`,
                  fontFamily: "inherit",
                }}
              />
            </Box>
            {clearable && hasText && <IconButton size="small" onClick={clear} sx={{ mt: .5, color: "rgba(0,0,0,.54)" }}>{clearIcon}</IconButton>}
          </Box>
          {loading && <LinearProgress sx={{ height: 2, bgcolor: "rgba(0,0,0,.1)", "& .MuiLinearProgress-bar": { bgcolor: currentColor } }} />}
          <Box sx={{ minHeight: 20, display: "flex", justifyContent: "space-between", mt: .45, px: hasBox ? 1.5 : 0 }}>
            <Typography sx={{ fontSize: 12, color: errorText ? error : "rgba(0,0,0,.6)" }}>{errorText || (showHint ? hint : "")}</Typography>
            {counter && <Typography sx={{ fontSize: 12, color: errorText ? error : "rgba(0,0,0,.6)" }}>{text.length}</Typography>}
          </Box>
        </Box>
        {appendIcon && <IconSlot>{appendIcon}</IconSlot>}
        {appendOuterIcon && <IconSlot>{appendOuterIcon}</IconSlot>}
      </Box>
    </Box>
  );
}

function VTextInput({ label, value, onChange, disabled = false, type = "text", width = "100%", filled = false, color = primary, counter, errorText = "", minHeight }: { label: string; value: string; onChange: (value: string) => void; disabled?: boolean; type?: string; width?: number | string; filled?: boolean; color?: string; counter?: number; errorText?: string; minHeight?: number }) {
  const [focused, setFocused] = useState(false);
  const active = focused || Boolean(value);
  return (
    <Box sx={{ width, mb: 2, minHeight, opacity: disabled ? .55 : 1 }}>
      <Box sx={{ position: "relative", minHeight: 56, px: filled ? 1.5 : 0, pt: filled ? 1.8 : 1.2, bgcolor: filled ? "rgba(0,0,0,.06)" : "transparent", borderBottom: `1px solid ${errorText ? error : focused ? color : "rgba(0,0,0,.42)"}` }}>
        <Typography sx={{ position: "absolute", top: active ? 6 : 22, left: filled ? 12 : 0, color: errorText ? error : focused ? color : "rgba(0,0,0,.6)", transform: active ? "scale(.75)" : "scale(1)", transformOrigin: "top left", transition: "all 150ms ease", fontSize: 16, lineHeight: 1 }}>{label}</Typography>
        <Box component="input" type={type} value={value} disabled={disabled} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={(event) => onChange(event.target.value)} sx={{ width: "100%", mt: 2.4, border: 0, outline: 0, bgcolor: "transparent", fontSize: 16, fontFamily: "inherit" }} />
      </Box>
      <Box sx={{ minHeight: 18, display: "flex", justifyContent: "space-between", mt: .4 }}>
        <Typography sx={{ fontSize: 12, color: errorText ? error : "rgba(0,0,0,.6)" }}>{errorText}</Typography>
        {counter !== undefined && <Typography sx={{ fontSize: 12, color: errorText ? error : "rgba(0,0,0,.6)" }}>{value.length} / {counter}</Typography>}
      </Box>
    </Box>
  );
}

function IconSlot({ children }: { children: ReactNode }) {
  return <Box sx={{ width: 32, pt: 1.9, color: "rgba(0,0,0,.54)", display: "flex", justifyContent: "center", "& svg": { fontSize: 24 } }}>{children}</Box>;
}

function VSwitch({ checked, onChange, label, disabled = false }: { checked: boolean; onChange: (value: boolean) => void; label: string; disabled?: boolean }) {
  return (
    <Box onClick={() => !disabled && onChange(!checked)} sx={{ display: "inline-flex", alignItems: "center", m: .5, cursor: disabled ? "default" : "pointer", userSelect: "none", opacity: disabled ? .45 : 1 }}>
      <Box sx={{ width: 42, height: 34, position: "relative", mr: .5, display: "flex", alignItems: "center" }}>
        <Box sx={{ width: 34, height: 14, borderRadius: 8, bgcolor: checked ? primary : "rgba(0,0,0,.38)", opacity: checked ? .5 : .38 }} />
        <Box sx={{ position: "absolute", left: checked ? 18 : 0, width: 20, height: 20, borderRadius: "50%", bgcolor: checked ? primary : "#fafafa", boxShadow: "0 2px 4px rgba(0,0,0,.32)", transition: "left 180ms cubic-bezier(.4,0,.2,1)" }} />
      </Box>
      <Typography sx={{ fontSize: 16 }}>{label}</Typography>
    </Box>
  );
}

function VBtn({ children, onClick, color = primary, disabled = false, text = false }: { children: ReactNode; onClick?: () => void; color?: string; disabled?: boolean; text?: boolean }) {
  return (
    <Button disabled={disabled} onClick={onClick} sx={{ minWidth: 64, px: 2, height: 36, borderRadius: 1, color: text ? "rgba(0,0,0,.72)" : "#fff", bgcolor: text ? "transparent" : color, boxShadow: text || disabled ? "none" : "0 2px 4px rgba(0,0,0,.2)", textTransform: "uppercase", fontWeight: 500, "&:hover": { bgcolor: text ? "rgba(0,0,0,.04)" : color } }}>{children}</Button>
  );
}

function VContainer({ children, narrow = false }: { children: ReactNode; narrow?: boolean }) {
  return <Box sx={{ width: "100%", maxWidth: narrow ? 960 : "none", mx: "auto", px: { xs: 1.5, md: 3 }, py: 1 }}>{children}</Box>;
}

function VGrid({ children }: { children: ReactNode }) {
  return <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, columnGap: 3, rowGap: 2 }}>{children}</Box>;
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: .55, py: .18, borderRadius: .75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
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

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: .5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

function clampNumber(value: string, min: number, max: number) {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return min;
  return Math.min(max, Math.max(min, parsed));
}

const examples: Example[] = [
  { title: "Icons", description: <>The <CodePill>append-icon</CodePill> and <CodePill>prepend-icon</CodePill> props help add context to <CodePill>v-textarea</CodePill>.</>, source: "simple/icon", minHeight: 250, render: () => <IconExample /> },
  { title: "Auto grow", description: <>When using the <CodePill>auto-grow</CodePill> prop, textarea&apos;s will automatically increase in size when the contained text exceeds its size.</>, source: "simple/auto-grow", minHeight: 180, render: () => <AutoGrowExample /> },
  { title: "Background color", description: <>The <CodePill>background-color</CodePill> and <CodePill>color</CodePill> props give you more control over styling <CodePill>v-textarea</CodePill>&apos;s.</>, source: "simple/background-color", minHeight: 350, render: () => <BackgroundColorExample /> },
  { title: "Browser autocomplete", description: <>The <CodePill>autocomplete</CodePill> prop gives you the option to enable the browser to predict user input.</>, source: "simple/browser-autocomplete", minHeight: 170, render: () => <BrowserAutocompleteExample /> },
  { title: "Clearable", description: <>You can clear the text from a <CodePill>v-textarea</CodePill> by using the <CodePill>clearable</CodePill> prop, and customize the icon used with the <CodePill>clearable-icon</CodePill> prop.</>, source: "simple/clearable", minHeight: 185, render: () => <ClearableExample /> },
  { title: "Counter", description: <>The <CodePill>counter</CodePill> prop informs the user of a character limit for the <CodePill>v-textarea</CodePill>.</>, source: "simple/counter", minHeight: 185, render: () => <CounterExample /> },
  { title: "No resize", description: <><CodePill>v-textarea</CodePill>&apos;s have the option to remain the same size regardless of their content&apos;s size, using the <CodePill>no-resize</CodePill> prop.</>, source: "simple/no-resize", minHeight: 170, render: () => <NoResizeExample /> },
  { title: "Rows", description: <>The <CodePill>rows</CodePill> prop allows you to define how many rows the textarea has, when combined with the <CodePill>row-height</CodePill> prop you can further customize your rows by defining their height.</>, source: "simple/rows", minHeight: 420, render: () => <RowsExample /> },
  { title: "Beautiful Forms", description: <>Utilizing alternative input styles, you can create amazing interfaces that are easy to build and easy to use.</>, source: "intermediate/signup-box", minHeight: 780, render: () => <SignupBoxExample /> },
];

const sourceTemplates = {
  usage: "src/demo/examples/textarea/usage.vue",
  playground: "src/demo/examples/textarea/playground.vue",
  "simple/icon": "src/demo/examples/textarea/simple/icon.vue",
  "simple/auto-grow": "src/demo/examples/textarea/simple/auto-grow.vue",
  "simple/background-color": "src/demo/examples/textarea/simple/background-color.vue",
  "simple/browser-autocomplete": "src/demo/examples/textarea/simple/browser-autocomplete.vue",
  "simple/clearable": "src/demo/examples/textarea/simple/clearable.vue",
  "simple/counter": "src/demo/examples/textarea/simple/counter.vue",
  "simple/no-resize": "src/demo/examples/textarea/simple/no-resize.vue",
  "simple/rows": "src/demo/examples/textarea/simple/rows.vue",
  "intermediate/signup-box": "src/demo/examples/textarea/intermediate/signup-box.vue",
};
