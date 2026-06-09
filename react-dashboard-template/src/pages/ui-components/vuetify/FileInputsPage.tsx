import { useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { Box, Card, Chip, Collapse, IconButton, Stack, Switch, Toolbar, Tooltip, Typography } from "@mui/material";
import { AttachFile, CameraAlt, Close, Code, GitHub, InsertDriveFile, InvertColors } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const deepPurpleAccent4 = "#6200ea";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };

interface SelectedFile {
  name: string;
  size: number;
  type?: string;
}

interface Example {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  minHeight: number;
  render: () => ReactNode;
}

export default function FileInputsPage() {
  return (
    <DocPage
      title="FileInputs"
      namespace="Components"
      icon={<InsertDriveFile />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "File Inputs" },
      ]}
    >
      <DocText>
        The <CodePill>v-file-input</CodePill> component is a specialized input that provides a clean interface for selecting files, showing detailed selection information and upload progress. It is meant to be a direct replacement for a standard file input.
      </DocText>
      <UsageSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  const [attrs, setAttrs] = useState({ chips: false, counter: false, disabled: false, "show-size": false });
  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Usage
      </Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>
        At its core, the <CodePill>v-file-input</CodePill> component is a basic container that extends <Box component="a" href="/components/text-fields" sx={{ color: primary, textDecoration: "none" }}>v-text-field</Box>.
      </Typography>
      <Card variant="outlined" sx={{ bgcolor: "background.default", borderColor: "rgba(111,125,133,.18)", boxShadow: "none", overflow: "hidden", mb: 6 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "3fr 1fr" } }}>
          <Box>
            <Box sx={{ height: 48, bgcolor: "rgba(111,125,133,.10)", borderBottom: "thin solid rgba(0,0,0,.12)" }} />
            <Box sx={{ height: 300, p: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box sx={{ width: { xs: "100%", sm: 420 } }}>
                <VFileInput label="File input" chips={attrs.chips} counter={attrs.counter} disabled={attrs.disabled} showSize={attrs["show-size"]} />
              </Box>
            </Box>
          </Box>
          <Box sx={{ borderLeft: { md: "thin solid rgba(0,0,0,.12)" } }}>
            <Box sx={{ height: 48, bgcolor: "rgba(111,125,133,.10)", display: "flex", alignItems: "center", px: 2, fontSize: 20 }}>Options</Box>
            <Box sx={{ borderTop: "thin solid rgba(0,0,0,.12)", p: 2, maxHeight: 300, overflowY: "auto" }}>
              <Stack spacing={1.4}>
                <VOptionSwitch label="Chips" checked={attrs.chips} onChange={(value) => setAttrs((current) => ({ ...current, chips: value }))} />
                <VOptionSwitch label="Counter" checked={attrs.counter} onChange={(value) => setAttrs((current) => ({ ...current, counter: value }))} />
                <VOptionSwitch label="Disabled" checked={attrs.disabled} onChange={(value) => setAttrs((current) => ({ ...current, disabled: value }))} />
                <VOptionSwitch label="Show size" checked={attrs["show-size"]} onChange={(value) => setAttrs((current) => ({ ...current, "show-size": value }))} />
              </Stack>
            </Box>
          </Box>
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

function VFileInput({
  label,
  multiple = false,
  accept,
  chips = false,
  smallChips = false,
  counter = false,
  showSize = false,
  outlined = false,
  dense = false,
  filled = false,
  disabled = false,
  placeholder,
  prependIcon = <AttachFile />,
  color = primary,
  validation = false,
  customSelection,
}: {
  label: string;
  multiple?: boolean;
  accept?: string;
  chips?: boolean;
  smallChips?: boolean;
  counter?: boolean;
  showSize?: boolean | 1000 | 1024;
  outlined?: boolean;
  dense?: boolean;
  filled?: boolean;
  disabled?: boolean;
  placeholder?: string;
  prependIcon?: ReactNode;
  color?: string;
  validation?: boolean;
  customSelection?: "primary-chips" | "advanced";
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  const error = validation && files.some((file) => file.size >= 2000000);
  const selectFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || []).map((file) => ({ name: file.name, size: file.size, type: file.type }));
    setFiles(multiple ? selected : selected.slice(0, 1));
  };
  const clear = () => {
    setFiles([]);
    if (inputRef.current) inputRef.current.value = "";
  };
  const hasValue = files.length > 0;
  const counterText = counter ? showSize ? `${files.length} files (${formatSize(totalSize, showSize)})` : `${files.length} files` : "";

  return (
    <Box sx={{ mb: 3, opacity: disabled ? .55 : 1 }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
        <Box sx={{ pt: dense ? 1 : 2.15, color: "rgba(0,0,0,.54)" }}>{prependIcon}</Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box
            onClick={() => !disabled && inputRef.current?.click()}
            sx={{
              minHeight: dense ? 40 : 56,
              px: outlined || filled ? 1.5 : 0,
              py: hasValue && (chips || smallChips || customSelection) ? .65 : 0,
              display: "flex",
              alignItems: "center",
              border: outlined ? `1px solid ${error ? "#ff5252" : "rgba(0,0,0,.38)"}` : 0,
              borderBottom: outlined ? undefined : `1px solid ${error ? "#ff5252" : "rgba(0,0,0,.42)"}`,
              bgcolor: filled ? "rgba(0,0,0,.06)" : "transparent",
              cursor: disabled ? "default" : "pointer",
              "&:hover": { borderColor: error ? "#ff5252" : "rgba(0,0,0,.87)", borderBottomColor: error ? "#ff5252" : "rgba(0,0,0,.87)" },
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: hasValue || placeholder ? 12 : 16, color: error ? "#ff5252" : hasValue ? color : "rgba(0,0,0,.6)", lineHeight: 1.15, mb: hasValue || placeholder ? .45 : 0 }}>{label}</Typography>
              <Box sx={{ minHeight: dense ? 24 : 32, display: "flex", alignItems: "center", flexWrap: "wrap", gap: .5, color: hasValue ? "rgba(0,0,0,.87)" : "rgba(0,0,0,.38)", fontSize: 16 }}>
                {files.length === 0 && placeholder ? placeholder : renderSelection(files, { chips, smallChips, showSize, customSelection, color })}
              </Box>
            </Box>
            {files.length > 0 && !disabled && <IconButton size="small" onClick={(event) => { event.stopPropagation(); clear(); }}><Close sx={{ fontSize: 18 }} /></IconButton>}
          </Box>
          <Box component="input" ref={inputRef} type="file" accept={accept} multiple={multiple} disabled={disabled} onChange={selectFiles} sx={{ display: "none" }} />
          <Box sx={{ minHeight: 18, display: "flex", justifyContent: "space-between", mt: .5 }}>
            <Typography sx={{ fontSize: 12, color: error ? "#ff5252" : "rgba(0,0,0,.6)" }}>{error ? "Avatar size should be less than 2 MB!" : ""}</Typography>
            {counterText && <Typography sx={{ fontSize: 12, color: "rgba(0,0,0,.6)" }}>{counterText}</Typography>}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function renderSelection(files: SelectedFile[], options: { chips: boolean; smallChips: boolean; showSize: boolean | 1000 | 1024; customSelection?: "primary-chips" | "advanced"; color: string }) {
  if (!files.length) return "";
  if (options.customSelection === "advanced") {
    return (
      <>
        {files.slice(0, 2).map((file) => <Chip key={file.name} size="small" label={displayName(file, options.showSize)} sx={{ height: 24, borderRadius: 1, bgcolor: deepPurpleAccent4, color: "#fff" }} />)}
        {files.length > 2 && <Typography sx={{ mx: 1, color: "rgba(0,0,0,.66)", fontSize: 12, fontWeight: 500, textTransform: "uppercase" }}>+{files.length - 2} File(s)</Typography>}
      </>
    );
  }
  if (options.customSelection === "primary-chips") return files.map((file) => <Chip key={file.name} size="small" label={displayName(file, options.showSize)} sx={{ height: 24, borderRadius: 1, bgcolor: primary, color: "#fff" }} />);
  if (options.chips || options.smallChips) return files.map((file) => <Chip key={file.name} size={options.smallChips ? "small" : "medium"} label={displayName(file, options.showSize)} sx={{ height: options.smallChips ? 24 : 32, bgcolor: "rgba(0,0,0,.08)" }} />);
  if (files.length > 1) return `${files.length} files`;
  return displayName(files[0], options.showSize);
}

function displayName(file: SelectedFile, showSize: boolean | 1000 | 1024) {
  const name = truncate(file.name, 22);
  return showSize ? `${name} (${formatSize(file.size, showSize)})` : name;
}

function formatSize(size: number, base: boolean | 1000 | 1024) {
  const divider = base === 1024 ? 1024 : 1000;
  if (size < divider) return `${size} B`;
  const unit = divider === 1024 ? "KiB" : "kB";
  return `${(size / divider).toFixed(1)} ${unit}`;
}

function truncate(text: string, length: number) {
  return text.length > length ? `${text.slice(0, length - 3)}...` : text;
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

function VOptionSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 40 }}><Typography sx={{ fontSize: 14 }}>{label}</Typography><Switch checked={checked} onChange={(event) => onChange(event.target.checked)} sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: primary }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: primary } }} /></Box>;
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: .55, py: .18, borderRadius: .75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: .5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

const examples: Example[] = [
  { title: "Multiple", description: <>The <CodePill>v-file-input</CodePill> can contain multiple files at the same time when using the <strong>multiple</strong> prop.</>, source: "simple/multiple", minHeight: 170, render: () => <VFileInput multiple label="File input" /> },
  { title: "Accept formats", description: <><CodePill>v-file-input</CodePill> component can accept only specific media formats/file types if you want. For more information, checkout the documentation on the <Box component="a" href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept" sx={{ color: primary, textDecoration: "none" }}>accept attribute</Box>.</>, source: "simple/accept", minHeight: 170, render: () => <VFileInput accept="image/*" label="File input" /> },
  { title: "With chips", description: <>A selected file can be displayed as a <Box component="a" href="/components/chips" sx={{ color: primary, textDecoration: "none" }}>chip</Box>. When using the <strong>chips</strong> and <strong>multiple</strong> props, each chip will be displayed (as opposed to the file count).</>, source: "simple/chips", minHeight: 230, render: () => <Box><VFileInput chips multiple label="File input w/ chips" /><VFileInput smallChips multiple label="File input w/ small chips" /></Box> },
  { title: "Size displaying", description: <>The displayed size of the selected file(s) can be configured with the <strong>show-size</strong> property. Display sizes can be either <em>1024</em> (the default used when providing <strong>true</strong>) or <em>1000</em>.</>, source: "simple/size", minHeight: 170, render: () => <VFileInput showSize label="File input" /> },
  { title: "Counter", description: <>When using the <strong>show-size</strong> property along with <strong>counter</strong>, the total number of files and size will be displayed under the input.</>, source: "simple/counter", minHeight: 170, render: () => <VFileInput showSize counter multiple label="File input" /> },
  { title: "Custom icons", description: <>The <CodePill>v-file-input</CodePill> has a default prepended icon that can be set on the component or adjusted globally. More information on changing global components can be found on the <Box component="a" href="/customization/icons" sx={{ color: primary, textDecoration: "none" }}>customizing icons page</Box>.</>, source: "simple/custom-icon", minHeight: 170, render: () => <VFileInput label="File input" filled prependIcon={<CameraAlt />} /> },
  { title: "Dense", description: <>You can reduces the file input height with <CodePill>dense</CodePill> prop.</>, source: "simple/dense", minHeight: 150, render: () => <VFileInput label="File input" outlined dense /> },
  { title: "Selection slot", description: <>Using the <CodePill>selection</CodePill> slot, you can customize the appearance of your input selections. This is typically done with <Box component="a" href="/components/chips" sx={{ color: primary, textDecoration: "none" }}>chips</Box>, however any component or markup can be used.</>, source: "intermediate/selection", minHeight: 190, render: () => <VFileInput placeholder="Upload your documents" label="File input" multiple prependIcon={<AttachFile />} customSelection="primary-chips" /> },
  { title: "Validation", description: <>Similar to other inputs, you can use the <strong>rules</strong> prop to can create your own custom validation parameters.</>, source: "intermediate/validation", minHeight: 180, render: () => <VFileInput accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" prependIcon={<CameraAlt />} label="Avatar" validation /> },
  { title: "Complex selection slots", description: <>The flexibility of the selection slot allows you accomodate complex use-cases. In this example we show the first 2 selections as chips while adding a number indicator for the remaining amount.</>, source: "complex/advanced", minHeight: 200, render: () => <VFileInput color={deepPurpleAccent4} counter label="File input" multiple placeholder="Select your files" prependIcon={<AttachFile />} outlined showSize={1000} customSelection="advanced" /> },
];

const sourceTemplates = {
  "simple/multiple": "src/demo/examples/file-inputs/simple/multiple.vue",
  "simple/accept": "src/demo/examples/file-inputs/simple/accept.vue",
  "simple/chips": "src/demo/examples/file-inputs/simple/chips.vue",
  "simple/size": "src/demo/examples/file-inputs/simple/size.vue",
  "simple/counter": "src/demo/examples/file-inputs/simple/counter.vue",
  "simple/custom-icon": "src/demo/examples/file-inputs/simple/custom-icon.vue",
  "simple/dense": "src/demo/examples/file-inputs/simple/dense.vue",
  "intermediate/selection": "src/demo/examples/file-inputs/intermediate/selection.vue",
  "intermediate/validation": "src/demo/examples/file-inputs/intermediate/validation.vue",
  "complex/advanced": "src/demo/examples/file-inputs/complex/advanced.vue",
};
