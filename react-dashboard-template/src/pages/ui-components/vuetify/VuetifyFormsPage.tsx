import { useMemo, useState, type ReactNode } from "react";
import { Box, Button, Card, Checkbox, Collapse, IconButton, MenuItem, Select, Slider, Stack, Switch, Toolbar, Tooltip, Typography } from "@mui/material";
import { Code, GitHub, InvertColors, ViewList } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const success = "#4caf50";
const error = "#ff5252";
const warning = "#fb8c00";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };
const selectItems = ["Item 1", "Item 2", "Item 3", "Item 4"];

interface Example {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  minHeight: number;
  render: () => ReactNode;
}

export default function VuetifyFormsPage() {
  return (
    <DocPage
      title="Forms"
      namespace="Components"
      icon={<ViewList />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Forms" },
      ]}
    >
      <DocText>
        When it comes to form validation, Vuetify has a multitude of integrations and baked in functionality. Want to use a 3rd party validation plugin? Out of the box you can use <Box component="a" href="https://github.com/baianat/Vee-validate" sx={linkSx}>Vee-validate</Box> and <Box component="a" href="https://github.com/vuelidate/vuelidate" sx={linkSx}>vuelidate</Box>.
      </DocText>
      <UsageSection />
      <PlaygroundSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Usage
      </Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>
        The internal <CodePill>v-form</CodePill> component makes it easy to add validation to form inputs. All input components have a <CodePill>rules</CodePill> prop which takes an array of functions. These functions allow you to specify conditions in which the field is <em>valid</em> or <em>invalid</em>. Whenever the value of an input is changed, each function in the array will receive the new value. If a function returns false or a string, validation has failed.
      </Typography>
      <VuetifyExampleBlock title="" description="" source="usage" minHeight={230}>
        {() => <UsageForm />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function UsageForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
        <VTextField label="First name" value={firstname} onChange={setFirstname} counter={10} rules={[required("Name is required"), maxLength(10, "Name must be less than 10 characters")]} />
        <VTextField label="Last name" value={lastname} onChange={setLastname} counter={10} rules={[required("Name is required"), maxLength(10, "Name must be less than 10 characters")]} />
        <VTextField label="E-mail" value={email} onChange={setEmail} rules={[required("E-mail is required"), pattern(/.+@.+/, "E-mail must be valid")]} />
      </Box>
    </Box>
  );
}

function PlaygroundSection() {
  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Playground
      </Typography>
      <VuetifyExampleBlock title="" description="" source="playground" minHeight={470}>
        {() => <ValidationForm includeLazySwitch />}
      </VuetifyExampleBlock>
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
        {examples.map((example) => (
          <VuetifyExampleBlock key={example.title} title={example.title} description={example.description} source={example.source} minHeight={example.minHeight}>
            {example.render}
          </VuetifyExampleBlock>
        ))}
      </Stack>
    </Box>
  );
}

function RulesExample() {
  const [model, setModel] = useState("Foobar");
  const [max, setMax] = useState(0);
  const [allowSpaces, setAllowSpaces] = useState(false);
  const [match, setMatch] = useState("Foobar");
  const rules = useMemo(() => {
    const list: Rule[] = [];
    if (max) list.push((value) => value.length <= max || `A maximum of ${max} characters is allowed`);
    if (!allowSpaces) list.push((value) => value.indexOf(" ") < 0 || "No spaces are allowed");
    if (match) list.push((value) => value === match || "Values do not match");
    return list;
  }, [max, allowSpaces, match]);
  return (
    <Box sx={{ p: { xs: 1.5, md: 2 }, display: "grid", gridTemplateColumns: { xs: "1fr", md: "4fr 6fr" }, justifyContent: "space-between", columnGap: { xs: 3, md: 8 }, rowGap: 3, alignItems: "start" }}>
      <VTextField label="First name" value={model} onChange={setModel} counter={max || undefined} rules={rules} eager />
      <Box>
        <VSliderField label="Max characters" value={max} onChange={setMax} />
        <VCheckbox label="Allow spaces" checked={allowSpaces} onChange={setAllowSpaces} />
        <VTextField label="Value must match" value={match} onChange={setMatch} />
      </Box>
    </Box>
  );
}

function ValidationForm({ includeLazySwitch = false }: { includeLazySwitch?: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [select, setSelect] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [touched, setTouched] = useState(false);
  const [lazy, setLazy] = useState(false);
  const validation = validateCore({ name, email, select, checkbox });
  const valid = validation.valid;
  const showErrors = touched || !lazy;
  const validate = () => setTouched(true);
  const reset = () => {
    setName("");
    setEmail("");
    setSelect("");
    setCheckbox(false);
    setTouched(false);
  };
  const resetValidation = () => setTouched(false);
  return (
    <Box sx={includeLazySwitch ? { display: "flex", alignItems: "center", flexWrap: "wrap", width: "100%" } : {}}>
      {includeLazySwitch && (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", width: "100%", mb: 1 }}>
          <VSwitch label="Valid" checked={valid} readonly />
          <VSwitch label="Lazy" checked={lazy} onChange={setLazy} />
        </Box>
      )}
      <Box component="form" sx={{ width: "100%" }}>
        <VTextField label="Name" value={name} onChange={setName} counter={10} rules={[required("Name is required"), maxLength(10, "Name must be less than 10 characters")]} forceShowErrors={showErrors} />
        <VTextField label="E-mail" value={email} onChange={setEmail} rules={[required("E-mail is required"), pattern(/.+@.+\..+/, "E-mail must be valid")]} forceShowErrors={showErrors} />
        <VSelectField label="Item" value={select} onChange={setSelect} items={selectItems} error={showErrors ? validation.select : ""} />
        <VCheckbox label="Do you agree?" checked={checkbox} onChange={setCheckbox} error={showErrors ? validation.checkbox : ""} />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
          <VBtn color={success} disabled={!valid} onClick={validate}>Validate</VBtn>
          <VBtn color={error} onClick={reset}>Reset Form</VBtn>
          <VBtn color={warning} onClick={resetValidation}>Reset Validation</VBtn>
        </Box>
      </Box>
    </Box>
  );
}

function VuelidateExample() {
  const [values, setValues] = useState({ name: "", email: "", select: "", checkbox: false });
  const [dirty, setDirty] = useState({ name: false, email: false, select: false, checkbox: false });
  const errors = validateVuelidate(values, dirty);
  const touch = (key: keyof typeof dirty) => setDirty((current) => ({ ...current, [key]: true }));
  const clear = () => {
    setValues({ name: "", email: "", select: "", checkbox: false });
    setDirty({ name: false, email: false, select: false, checkbox: false });
  };
  return (
    <Box component="form">
      <VTextField label="Name" value={values.name} onChange={(value) => { setValues((v) => ({ ...v, name: value })); touch("name"); }} counter={10} externalError={errors.name} onBlur={() => touch("name")} />
      <VTextField label="E-mail" value={values.email} onChange={(value) => { setValues((v) => ({ ...v, email: value })); touch("email"); }} externalError={errors.email} onBlur={() => touch("email")} />
      <VSelectField label="Item" value={values.select} onChange={(value) => { setValues((v) => ({ ...v, select: value })); touch("select"); }} items={selectItems} error={errors.select} onBlur={() => touch("select")} />
      <VCheckbox label="Do you agree?" checked={values.checkbox} onChange={(value) => { setValues((v) => ({ ...v, checkbox: value })); touch("checkbox"); }} error={errors.checkbox} />
      <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
        <VBtn onClick={() => setDirty({ name: true, email: true, select: true, checkbox: true })}>submit</VBtn>
        <VBtn onClick={clear}>clear</VBtn>
      </Box>
    </Box>
  );
}

function VeeValidateExample() {
  const [values, setValues] = useState({ name: "", email: "", select: "", checkbox: false });
  const [submitted, setSubmitted] = useState(false);
  const errors = submitted ? validateVee(values) : { name: "", email: "", select: "", checkbox: "" };
  const clear = () => {
    setValues({ name: "", email: "", select: "", checkbox: false });
    setSubmitted(false);
  };
  return (
    <Box component="form">
      <VTextField label="Name" value={values.name} onChange={(value) => setValues((v) => ({ ...v, name: value }))} counter={10} externalError={errors.name} />
      <VTextField label="E-mail" value={values.email} onChange={(value) => setValues((v) => ({ ...v, email: value }))} externalError={errors.email} />
      <VSelectField label="Select" value={values.select} onChange={(value) => setValues((v) => ({ ...v, select: value }))} items={selectItems} error={errors.select} />
      <VCheckbox label="Option" checked={values.checkbox} onChange={(value) => setValues((v) => ({ ...v, checkbox: value }))} error={errors.checkbox} />
      <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
        <VBtn onClick={() => setSubmitted(true)}>submit</VBtn>
        <VBtn onClick={clear}>clear</VBtn>
      </Box>
    </Box>
  );
}

type Rule = (value: string) => true | string;

function VTextField({ label, value, onChange, rules = [], counter, eager = false, forceShowErrors = false, externalError = "", onBlur }: { label: string; value: string; onChange: (value: string) => void; rules?: Rule[]; counter?: number; eager?: boolean; forceShowErrors?: boolean; externalError?: string; onBlur?: () => void }) {
  const [touched, setTouched] = useState(eager);
  const ruleError = rules.map((rule) => rule(value)).find((result) => result !== true);
  const errorText = externalError || ((touched || forceShowErrors || eager) && typeof ruleError === "string" ? ruleError : "");
  return (
    <Box sx={{ mb: 2.5 }}>
      <Box sx={{ minHeight: 56, borderBottom: `1px solid ${errorText ? error : "rgba(0,0,0,.42)"}`, "&:focus-within": { borderBottomColor: errorText ? error : primary, borderBottomWidth: 2 } }}>
        <Typography sx={{ fontSize: value ? 12 : 16, color: errorText ? error : value ? primary : "rgba(0,0,0,.6)", pt: 1, lineHeight: 1.15 }}>{label}</Typography>
        <Box component="input" value={value} onChange={(event) => { onChange(event.target.value); if (eager) setTouched(true); }} onBlur={() => { setTouched(true); onBlur?.(); }} sx={{ width: "100%", height: 30, border: 0, outline: 0, bgcolor: "transparent", fontSize: 16, p: 0 }} />
      </Box>
      <Box sx={{ minHeight: 18, display: "flex", justifyContent: "space-between", mt: .45 }}>
        <Typography sx={{ fontSize: 12, color: error }}>{errorText}</Typography>
        {counter !== undefined && <Typography sx={{ fontSize: 12, color: "rgba(0,0,0,.6)" }}>{value.length} / {counter}</Typography>}
      </Box>
    </Box>
  );
}

function VSelectField({ label, value, onChange, items, error: errorText = "", onBlur }: { label: string; value: string; onChange: (value: string) => void; items: string[]; error?: string; onBlur?: () => void }) {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Typography sx={{ fontSize: value ? 12 : 16, color: errorText ? error : value ? primary : "rgba(0,0,0,.6)", mb: .25 }}>{label}</Typography>
      <Select value={value} displayEmpty fullWidth variant="standard" onChange={(event) => onChange(event.target.value)} onBlur={onBlur} sx={{ "&:before": { borderBottomColor: errorText ? error : "rgba(0,0,0,.42)" }, "&:after": { borderBottomColor: errorText ? error : primary } }}>
        <MenuItem value="" disabled />
        {items.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
      </Select>
      <Typography sx={{ minHeight: 18, fontSize: 12, color: error, mt: .45 }}>{errorText}</Typography>
    </Box>
  );
}

function VCheckbox({ label, checked, onChange, error: errorText = "" }: { label: string; checked: boolean; onChange: (value: boolean) => void; error?: string }) {
  return (
    <Box sx={{ mb: 1.5 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Checkbox checked={checked} onChange={(event) => onChange(event.target.checked)} sx={{ color: "rgba(0,0,0,.54)", "&.Mui-checked": { color: primary }, p: .5, mr: 1 }} />
        <Typography sx={{ color: "rgba(0,0,0,.72)" }}>{label}</Typography>
      </Box>
      <Typography sx={{ minHeight: 18, fontSize: 12, color: error, ml: 4.5 }}>{errorText}</Typography>
    </Box>
  );
}

function VSliderField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", minHeight: 48, mb: 2 }}>
      <Typography sx={{ flex: "0 0 128px", pr: 2, color: "rgba(0,0,0,.6)", fontSize: 16 }}>{label}</Typography>
      <Slider
        value={value}
        min={0}
        max={25}
        onChange={(_, next) => onChange(next as number)}
        sx={{
          color: primary,
          height: 2,
          py: 2,
          "& .MuiSlider-thumb": { width: 12, height: 12, boxShadow: "0 0 0 6px rgba(0,151,167,.12)" },
          "& .MuiSlider-rail": { opacity: 1, bgcolor: "rgba(0,0,0,.26)" },
          "& .MuiSlider-track": { border: 0 },
        }}
      />
    </Box>
  );
}

function VSwitch({ label, checked, onChange, readonly = false }: { label: string; checked: boolean; onChange?: (value: boolean) => void; readonly?: boolean }) {
  return <Box sx={{ display: "inline-flex", alignItems: "center", m: 2 }}><Switch checked={checked} readOnly={readonly} onChange={(event) => !readonly && onChange?.(event.target.checked)} sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: primary }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: primary } }} /><Typography>{label}</Typography></Box>;
}

function VBtn({ children, color, disabled = false, onClick }: { children: ReactNode; color?: string; disabled?: boolean; onClick?: () => void }) {
  const isDefault = !color;
  const background = isDefault ? "#fff" : color;
  const textColor = disabled ? "rgba(0,0,0,.38)" : isDefault || color === warning ? "rgba(0,0,0,.87)" : "#fff";
  return <Button disabled={disabled} onClick={onClick} sx={{ minWidth: 64, height: 36, px: 2, bgcolor: disabled ? "rgba(0,0,0,.12)" : background, color: textColor, textTransform: "uppercase", fontSize: 14, fontWeight: 500, letterSpacing: ".0892857143em", boxShadow: disabled ? "none" : "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)", "&:hover": { bgcolor: disabled ? "rgba(0,0,0,.12)" : isDefault ? "#f5f5f5" : background } }}>{children}</Button>;
}

function validateCore(values: { name: string; email: string; select: string; checkbox: boolean }) {
  return {
    name: !values.name ? "Name is required" : values.name.length > 10 ? "Name must be less than 10 characters" : "",
    email: !values.email ? "E-mail is required" : !/.+@.+\..+/.test(values.email) ? "E-mail must be valid" : "",
    select: !values.select ? "Item is required" : "",
    checkbox: !values.checkbox ? "You must agree to continue!" : "",
    get valid() { return !this.name && !this.email && !this.select && !this.checkbox; },
  };
}

function validateVuelidate(values: { name: string; email: string; select: string; checkbox: boolean }, dirty: { name: boolean; email: boolean; select: boolean; checkbox: boolean }) {
  return {
    name: !dirty.name ? "" : values.name.length > 10 ? "Name must be at most 10 characters long" : !values.name ? "Name is required." : "",
    email: !dirty.email ? "" : !/.+@.+\..+/.test(values.email) && values.email ? "Must be valid e-mail" : !values.email ? "E-mail is required" : "",
    select: !dirty.select ? "" : !values.select ? "Item is required" : "",
    checkbox: !dirty.checkbox ? "" : !values.checkbox ? "You must agree to continue!" : "",
  };
}

function validateVee(values: { name: string; email: string; select: string; checkbox: boolean }) {
  return {
    name: !values.name ? "Name can not be empty" : values.name.length > 10 ? "Name may not be greater than 10 characters" : "",
    email: !values.email ? "email can not be empty" : !/.+@.+\..+/.test(values.email) ? "Email must be valid" : "",
    select: !values.select ? "select can not be empty" : "",
    checkbox: !values.checkbox ? "checkbox can not be empty" : "",
  };
}

function required(message: string): Rule {
  return (value) => Boolean(value) || message;
}

function maxLength(max: number, message: string): Rule {
  return (value) => value.length <= max || message;
}

function pattern(regex: RegExp, message: string): Rule {
  return (value) => regex.test(value) || message;
}

function VuetifyExampleBlock({ title, description, source, children, minHeight }: { title: string; description: ReactNode; source: keyof typeof sourceTemplates; children: () => ReactNode; minHeight: number }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}>
      <Toolbar variant="dense" sx={{ minHeight: 74, alignItems: "center", px: { xs: 3, md: 4 }, bgcolor: "transparent" }}>
        <Typography sx={{ fontSize: { xs: 22, md: 25 }, fontWeight: 500, lineHeight: 1.35 }}>{title}</Typography>
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
      <Box sx={{ px: { xs: 3, md: 4 }, py: { xs: 3.5, md: 4.25 }, minHeight, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit" }}>
        {description && <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: 16.5, fontWeight: 300, lineHeight: 1.7, mb: 3 }}>{description}</Typography>}
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

const linkSx = { color: primary, textDecoration: "none" };

const examples: Example[] = [
  { title: "Creating rules", description: <>Rules allow you to apply custom validation on all form components. These are validated sequentially and will display a <strong>maximum</strong> of 1 error at a time, so make sure you order your rules accordingly.</>, source: "simple/rules", minHeight: 330, render: () => <RulesExample /> },
  { title: "Validation with submit & clear", description: <>The <CodePill>v-form</CodePill> component has <strong>three</strong> functions that can be accessed by setting a <em>ref</em> on the component. A ref allows us to access internal methods on a component, for example, <CodePill>{'<v-form ref="form">'}</CodePill>. <strong>this.$refs.form.validate()</strong> will validate all inputs and return if they are all valid or not. <strong>this.$refs.form.reset()</strong> will clear all inputs and reset their validation errors. <strong>this.$refs.form.resetValidation()</strong> will only reset input validation and not alter their state.</>, source: "simple/validation-with-submit-and-clear", minHeight: 460, render: () => <ValidationForm /> },
  { title: "Vuelidate", description: <><strong>vuelidate</strong> is a simple, lightweight model-based validation for Vue.js. <Box component="a" href="https://vuelidate.netlify.com/" sx={linkSx}>Documentation</Box></>, source: "intermediate/vuelidate", minHeight: 430, render: () => <VuelidateExample /> },
  { title: "Vee-validate", description: <><strong>vee-validate</strong> is a template Based Validation Framework for Vue.js. <Box component="a" href="https://logaretm.github.io/vee-validate/" sx={linkSx}>Documentation</Box></>, source: "intermediate/vee-validate", minHeight: 430, render: () => <VeeValidateExample /> },
];

const sourceTemplates = {
  usage: "src/demo/examples/forms/usage.vue",
  playground: "src/demo/examples/forms/playground.vue",
  "simple/rules": "src/demo/examples/forms/simple/rules.vue",
  "simple/validation-with-submit-and-clear": "src/demo/examples/forms/simple/validation-with-submit-and-clear.vue",
  "intermediate/vuelidate": "src/demo/examples/forms/intermediate/vuelidate.vue",
  "intermediate/vee-validate": "src/demo/examples/forms/intermediate/vee-validate.vue",
};
