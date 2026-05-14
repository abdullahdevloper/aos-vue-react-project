import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Avatar, Box, Button, Card, Chip, Collapse, IconButton, MenuItem, Select, Stack, Switch, Toolbar, Tooltip, Typography } from "@mui/material";
import { Check, Close, Code, GitHub, InvertColors, KeyboardArrowDown, ViewList } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };
const baseItems = ["Programming", "Design", "Vue", "Vuetify"];
const tagItems = ["Gaming", "Programming", "Vue", "Vuetify"];
const advancedColors = ["green", "purple", "indigo", "cyan", "teal", "orange"];
const colorMap: Record<string, string> = {
  blue: "#90caf9",
  red: "#ef9a9a",
  green: "#a5d6a7",
  purple: "#ce93d8",
  indigo: "#9fa8da",
  cyan: "#80deea",
  teal: "#80cbc4",
  orange: "#ffcc80",
};

type ComboItem = string | AdvancedItem | { header: string };

interface AdvancedItem {
  text: string;
  color: string;
}

interface Example {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  minHeight: number;
  render: () => ReactNode;
}

export default function ComboboxPage() {
  return (
    <DocPage
      title="Combobox"
      namespace="Components"
      icon={<ViewList />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Combobox" },
      ]}
    >
      <DocText>
        The <CodePill>v-combobox</CodePill> component is a <Box component="a" href="/components/autocompletes" sx={{ color: primary, textDecoration: "none" }}>v-autocomplete</Box> that allows the user to enter values that do not exist within the provided <strong>items</strong>. Created items will be returned as strings.
      </DocText>
      <UsageSection />
      <Alerts />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  const [attrs, setAttrs] = useState({
    "hide-selected": false,
    multiple: false,
    "persistent-hint": false,
    "small-chips": false,
    clearable: false,
    type: "",
  });
  const [model, setModel] = useState<string | ComboItem[]>("Vuetify");

  const updateAttr = (key: keyof typeof attrs, value: boolean | string) => {
    setAttrs((current) => ({ ...current, [key]: value }));
    if (key === "multiple" && typeof value === "boolean") {
      setModel((current) => value ? toArray(current) : toArray(current).map(textFor).join(", ") || "");
    }
  };

  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Usage
      </Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>
        With Combobox, you can allow a user to create new values that may not be present in a provided items list.
      </Typography>
      <Card variant="outlined" sx={{ bgcolor: "background.default", borderColor: "rgba(111,125,133,.18)", boxShadow: "none", overflow: "hidden", mb: 6 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "3fr 1fr" } }}>
          <Box>
            <Box sx={{ height: 48, bgcolor: "rgba(111,125,133,.10)", borderBottom: "thin solid rgba(0,0,0,.12)" }} />
            <Box sx={{ height: 300, p: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box sx={{ width: { xs: "100%", sm: 440 } }}>
                <VCombobox
                  label="Add some tags"
                  hint="Comboboxes can receive custom values not present in items"
                  items={tagItems}
                  value={model}
                  onChange={setModel}
                  multiple={attrs.multiple}
                  hideSelected={attrs["hide-selected"]}
                  persistentHint={attrs["persistent-hint"]}
                  smallChips={attrs["small-chips"]}
                  clearable={attrs.clearable}
                  filled={attrs.type === "filled"}
                  outlined={attrs.type === "outlined"}
                  solo={attrs.type === "solo"}
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ borderLeft: { md: "thin solid rgba(0,0,0,.12)" } }}>
            <Box sx={{ height: 48, bgcolor: "rgba(111,125,133,.10)", display: "flex", alignItems: "center", px: 2, fontSize: 20 }}>Options</Box>
            <Box sx={{ borderTop: "thin solid rgba(0,0,0,.12)", p: 2, maxHeight: 300, overflowY: "auto" }}>
              <Stack spacing={1.4}>
                <VOptionSwitch label="Hide selected" checked={attrs["hide-selected"]} onChange={(value) => updateAttr("hide-selected", value)} />
                <VOptionSwitch label="Multiple" checked={attrs.multiple} onChange={(value) => updateAttr("multiple", value)} />
                <VOptionSwitch label="Persistent hint" checked={attrs["persistent-hint"]} onChange={(value) => updateAttr("persistent-hint", value)} />
                <VOptionSwitch label="Small chips" checked={attrs["small-chips"]} onChange={(value) => updateAttr("small-chips", value)} />
                <VOptionSwitch label="Clearable" checked={attrs.clearable} onChange={(value) => updateAttr("clearable", value)} />
                <VSelect label="Type" value={attrs.type} items={["filled", "outlined", "solo"]} onChange={(value) => updateAttr("type", value)} clearable />
              </Stack>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

function Alerts() {
  return (
    <Stack spacing={1.5} sx={{ mb: 4 }}>
      <AppAlert severity="error">As the Combobox allows user input, it <strong>always</strong> returns the full value provided to it (for example a list of Objects will always return an Object when selected). This is because there&apos;s no way to tell if a value is supposed to be user input or an object lookup <Box component="a" href="https://github.com/vuetifyjs/vuetify/issues/5479" sx={{ color: "inherit", textDecoration: "underline" }}>GitHub Issue</Box></AppAlert>
      <AppAlert severity="warning">The <strong>auto</strong> property of <strong>menu-props</strong> is only supported for the default input style.</AppAlert>
      <AppAlert severity="info">Browser autocomplete is set to off by default, may vary by browser and may be ignored. <Box component="a" href="https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion" sx={{ color: "inherit", textDecoration: "underline" }}>MDN</Box></AppAlert>
    </Stack>
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

function MultipleExample() {
  const [select, setSelect] = useState<ComboItem[]>(["Vuetify", "Programming"]);
  return (
    <Box sx={{ p: 3 }}>
      <VCombobox label="Select a favorite activity or create a new one" items={baseItems} multiple value={select} onChange={(value) => setSelect(toArray(value))} />
      <VCombobox label="I use chips" items={baseItems} multiple chips value={select} onChange={(value) => setSelect(toArray(value))} />
      <VCombobox label="I use a scoped slot" items={baseItems} multiple chips scopedChips value={select} onChange={(value) => setSelect(toArray(value))} />
      <VCombobox label="I'm readonly" items={[]} multiple chips readonly value={select} onChange={(value) => setSelect(toArray(value))} />
    </Box>
  );
}

function DenseExample() {
  const [select, setSelect] = useState<ComboItem[]>(["Vuetify", "Programming"]);
  return (
    <Box sx={{ p: 3 }}>
      <VCombobox label="Combobox" items={baseItems} multiple outlined dense value={select} onChange={(value) => setSelect(toArray(value))} />
    </Box>
  );
}

function NoDataExample() {
  const [model, setModel] = useState<ComboItem[]>(["Vuetify"]);
  return (
    <Box sx={{ p: 3 }}>
      <VCombobox label="Add some tags" hint="Maximum of 5 tags" items={tagItems} multiple smallChips persistentHint hideSelected noDataCreate value={model} onChange={(value) => setModel(toArray(value).slice(0, 5))} />
    </Box>
  );
}

function AdvancedExample() {
  const [items, setItems] = useState<AdvancedItem[]>([
    { text: "Foo", color: "blue" },
    { text: "Bar", color: "red" },
  ]);
  const [model, setModel] = useState<ComboItem[]>([{ text: "Foo", color: "blue" }]);
  const [editing, setEditing] = useState<string | null>(null);
  const [nonce, setNonce] = useState(1);

  const handleChange = (value: string | ComboItem[]) => {
    const mapped = toArray(value).flatMap((entry) => {
      if (typeof entry === "string") {
        const created = { text: entry, color: advancedColors[(nonce - 1) % advancedColors.length] };
        setItems((current) => [...current, created]);
        setNonce((current) => current + 1);
        return [created];
      }
      if ("text" in entry) return [entry];
      return [];
    });
    setModel(mapped);
  };

  const saveEdit = (original: AdvancedItem, text: string) => {
    const update = (item: AdvancedItem) => item === original ? { ...item, text } : item;
    setItems((current) => current.map(update));
    setModel((current) => current.map((item) => isAdvanced(item) ? update(item) : item));
    setEditing(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <VCombobox
        label="Search for an option"
        items={[{ header: "Select an option or create one" }, ...items]}
        multiple
        smallChips
        solo
        hideSelected
        advanced
        noDataCreate
        value={model}
        onChange={handleChange}
        editing={editing}
        onEdit={setEditing}
        onSaveEdit={saveEdit}
      />
    </Box>
  );
}

function VCombobox(props: {
  label: string;
  items: ComboItem[];
  value: string | ComboItem[];
  onChange: (value: string | ComboItem[]) => void;
  multiple?: boolean;
  chips?: boolean;
  smallChips?: boolean;
  scopedChips?: boolean;
  dense?: boolean;
  filled?: boolean;
  outlined?: boolean;
  solo?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  hideSelected?: boolean;
  persistentHint?: boolean;
  hint?: string;
  noDataCreate?: boolean;
  advanced?: boolean;
  editing?: string | null;
  onEdit?: (key: string | null) => void;
  onSaveEdit?: (item: AdvancedItem, text: string) => void;
}) {
  const {
    label, items, value, onChange, multiple = false, chips = false, smallChips = false, scopedChips = false,
    dense = false, filled = false, outlined = false, solo = false, readonly = false, clearable = false,
    hideSelected = false, persistentHint = false, hint, noDataCreate = false, advanced = false, editing, onEdit, onSaveEdit,
  } = props;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState(!multiple ? modelText(value) : "");
  const comboboxRef = useRef<HTMLDivElement | null>(null);
  const selected = toArray(value);
  const selectedTexts = selected.map(textFor);
  const filterText = search;
  const hasValue = multiple ? selectedTexts.length > 0 || search.length > 0 : inputText.length > 0;

  useEffect(() => {
    if (!multiple) {
      setInputText(modelText(value));
      setSearch("");
    }
    if (multiple) setSearch("");
  }, [multiple, value]);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnOutsidePointer = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && comboboxRef.current?.contains(target)) return;
      setOpen(false);
      setSearch("");
    };
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [open]);

  const visibleItems = useMemo(() => {
    const normalized = filterText.toLowerCase();
    return items.filter((item) => {
      if (typeof item !== "string" && "header" in item) return true;
      const text = textFor(item);
      if (hideSelected && selectedTexts.includes(text)) return false;
      return text.toLowerCase().includes(normalized);
    });
  }, [items, filterText, hideSelected, selectedTexts.join("|")]);
  const selectableCount = visibleItems.filter((item) => typeof item === "string" || "text" in item).length;

  const commitValue = (next: ComboItem | string) => {
    if (multiple) {
      const exists = selected.some((item) => textFor(item) === textFor(next));
      onChange((exists ? selected.filter((item) => textFor(item) !== textFor(next)) : [...selected, next]) as ComboItem[]);
      setSearch("");
    } else {
      onChange(textFor(next));
      setInputText(textFor(next));
      setSearch("");
      setOpen(false);
    }
  };
  const remove = (text: string) => onChange(selected.filter((item) => textFor(item) !== text) as ComboItem[]);
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const typed = multiple ? search : inputText;
    if (event.key === "Enter" && typed.trim()) {
      event.preventDefault();
      commitValue(typed.trim());
    }
    if (event.key === "Backspace" && multiple && !search && selected.length) remove(textFor(selected[selected.length - 1]));
  };

  return (
    <Box ref={comboboxRef} sx={{ mb: 3 }}>
      <Box onClick={() => { if (!readonly) { if (!open && !multiple) setSearch(""); setOpen(true); } }} sx={{
        minHeight: dense ? 40 : 56, display: "flex", alignItems: "center", px: solo || filled || outlined ? 1.5 : 0,
        py: multiple && selected.length ? .65 : 0, borderRadius: solo ? 1 : 0, bgcolor: solo ? "#fff" : filled ? "rgba(0,0,0,.06)" : "transparent",
        border: outlined ? "1px solid rgba(0,0,0,.38)" : 0, borderBottom: solo || outlined ? undefined : "1px solid rgba(0,0,0,.42)",
        boxShadow: solo ? "0px 2px 4px rgba(0,0,0,.18)" : "none", cursor: readonly ? "default" : "text",
        "&:focus-within": { borderColor: outlined ? primary : undefined, borderBottomColor: solo || outlined ? undefined : primary, borderBottomWidth: solo || outlined ? undefined : 2 },
      }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: hasValue ? 12 : 16, color: readonly ? "rgba(0,0,0,.6)" : hasValue ? primary : "rgba(0,0,0,.6)", lineHeight: 1.15, mb: hasValue ? .4 : 0 }}>{label}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: .5 }}>
            {multiple && selected.map((item) => <SelectedChip key={textFor(item)} item={item} small={smallChips} scoped={scopedChips} removable={!readonly && (chips || smallChips || advanced || scopedChips)} onRemove={() => remove(textFor(item))} />)}
            {!readonly && <Box component="input" value={multiple ? search : inputText} onChange={(event) => { const next = event.target.value; if (multiple) setSearch(next); else { setInputText(next); setSearch(next); } setOpen(true); }} onKeyDown={handleKeyDown} sx={{ flex: 1, minWidth: 80, height: dense ? 27 : 32, border: 0, outline: 0, bgcolor: "transparent", color: "rgba(0,0,0,.87)", fontSize: 16, p: 0 }} />}
          </Box>
        </Box>
        {clearable && (selected.length > 0 || inputText || search) && <IconButton size="small" onClick={(event) => { event.stopPropagation(); onChange(multiple ? [] : ""); setSearch(""); setInputText(""); }}><Close sx={{ fontSize: 18 }} /></IconButton>}
        {!readonly && <KeyboardArrowDown sx={{ color: "rgba(0,0,0,.54)" }} />}
      </Box>
      {(persistentHint || open) && hint && <Typography sx={{ fontSize: 12, color: "rgba(0,0,0,.6)", mt: .5 }}>{hint}</Typography>}
      {open && !readonly && (
        <Card sx={{ position: "relative", mt: .5, zIndex: 20, maxHeight: 304, overflowY: "auto", py: .5, boxShadow: "0px 5px 5px -3px rgba(0,0,0,.2), 0px 8px 10px 1px rgba(0,0,0,.14), 0px 3px 14px 2px rgba(0,0,0,.12)", borderRadius: 1 }}>
          {visibleItems.map((item, index) => {
            if (typeof item !== "string" && "header" in item) return <Typography key={`h-${index}`} sx={{ px: 2, py: 1, color: "rgba(0,0,0,.6)", fontSize: 14 }}>{item.header}</Typography>;
            const text = textFor(item);
            const activeEdit = isAdvanced(item) && editing === item.text;
            const selectedItem = selectedTexts.includes(text);
            return (
              <Box key={`${text}-${index}`} onClick={() => !activeEdit && commitValue(item)} sx={{ px: 2, py: .75, minHeight: 48, display: "flex", alignItems: "center", gap: 1.5, cursor: activeEdit ? "default" : "pointer", bgcolor: selectedItem ? "rgba(0,151,167,.08)" : "transparent", color: selectedItem ? primary : "inherit", "&:hover": { bgcolor: selectedItem ? "rgba(0,151,167,.12)" : "rgba(0,0,0,.04)" } }}>
                {advanced && isAdvanced(item) ? activeEdit ? <InlineEdit item={item} onSave={(nextText) => onSaveEdit?.(item, nextText)} /> : <Chip label={item.text} size="small" sx={{ bgcolor: colorMap[item.color], borderRadius: 1, color: "rgba(0,0,0,.87)" }} /> : <Typography sx={{ fontSize: 16 }}>{text}</Typography>}
                <Box sx={{ flexGrow: 1 }} />
                {selectedItem && !advanced && <Check sx={{ fontSize: 20, color: primary }} />}
                {advanced && isAdvanced(item) && <IconButton size="small" onClick={(event) => { event.stopPropagation(); onEdit?.(activeEdit ? null : item.text); }}>{activeEdit ? <Check /> : <Box component="span" className="material-icons" sx={{ fontSize: 20 }}>edit</Box>}</IconButton>}
              </Box>
            );
          })}
          {selectableCount === 0 && noDataCreate && filterText && (
            <Box onClick={() => commitValue(filterText)} sx={{ px: 2, py: 1.5, minHeight: 48, display: "flex", alignItems: "center", cursor: "pointer" }}>
              {advanced ? <><Typography sx={{ mr: 1, fontSize: 16 }}>Create</Typography><Chip label={filterText} size="small" sx={{ bgcolor: colorMap[advancedColors[0]], borderRadius: 1 }} /></> : <Typography sx={{ fontSize: 16 }}>No results matching &quot;<strong>{filterText}</strong>&quot;. Press <Kbd>enter</Kbd> to create a new one</Typography>}
            </Box>
          )}
        </Card>
      )}
    </Box>
  );
}

function SelectedChip({ item, small, scoped, removable, onRemove }: { item: ComboItem; small: boolean; scoped: boolean; removable: boolean; onRemove: () => void }) {
  const text = textFor(item);
  if (scoped) return <Chip avatar={<Avatar sx={{ bgcolor: primary, color: "#fff" }}>{text.slice(0, 1).toUpperCase()}</Avatar>} label={text} onDelete={removable ? onRemove : undefined} size={small ? "small" : "medium"} sx={chipSx(small, false)} />;
  if (isAdvanced(item)) return <Chip label={<Box component="span" sx={{ pr: 1 }}>{text}</Box>} onDelete={onRemove} size="small" sx={{ ...chipSx(true, true), bgcolor: colorMap[item.color] || "#e0e0e0" }} />;
  return <Chip label={text} onDelete={removable ? onRemove : undefined} size={small ? "small" : "medium"} sx={chipSx(small, false)} />;
}

function InlineEdit({ item, onSave }: { item: AdvancedItem; onSave: (text: string) => void }) {
  const [text, setText] = useState(item.text);
  return <Box component="input" autoFocus value={text} onChange={(event) => setText(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") onSave(text); }} sx={{ flex: 1, border: 0, outline: 0, bgcolor: "transparent", borderBottom: `1px solid ${primary}`, fontSize: 16, height: 32 }} />;
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

function AppAlert({ severity, children }: { severity: "error" | "warning" | "info"; children: ReactNode }) {
  const color = severity === "error" ? "#ff5252" : severity === "warning" ? "#fb8c00" : "#2196f3";
  return <Box sx={{ borderLeft: `4px solid ${color}`, bgcolor: severity === "error" ? "rgba(255,82,82,.08)" : severity === "warning" ? "rgba(251,140,0,.10)" : "rgba(33,150,243,.10)", color: "text.secondary", px: 2, py: 1.5, fontSize: 15, lineHeight: 1.55 }}>{children}</Box>;
}

function VOptionSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 40 }}><Typography sx={{ fontSize: 14 }}>{label}</Typography><Switch checked={checked} onChange={(event) => onChange(event.target.checked)} sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: primary }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: primary } }} /></Box>;
}

function VSelect({ label, value, items, onChange, clearable = false }: { label: string; value: string; items: string[]; onChange: (value: string) => void; clearable?: boolean }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 12, color: primary, mb: .25 }}>{label}</Typography>
      <Select value={value} displayEmpty fullWidth size="small" onChange={(event) => onChange(event.target.value)} sx={{ bgcolor: "transparent", "& .MuiOutlinedInput-notchedOutline": { border: 0, borderBottom: "1px solid rgba(0,0,0,.42)", borderRadius: 0 }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderBottom: `2px solid ${primary}` } }}>
        {clearable && <MenuItem value="">None</MenuItem>}
        {items.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
      </Select>
    </Box>
  );
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: .55, py: .18, borderRadius: .75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function Kbd({ children }: { children: ReactNode }) {
  return <Box component="kbd" sx={{ px: .4, py: .15, borderRadius: .5, border: "1px solid rgba(0,0,0,.25)", bgcolor: "#f5f5f5", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12 }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: .5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

function chipSx(small: boolean, label: boolean) {
  return { height: small ? 24 : 32, borderRadius: label ? 1 : 16, bgcolor: "rgba(0,0,0,.08)", "& .MuiChip-deleteIcon": { fontSize: small ? 16 : 18 } };
}

function toArray(value: string | ComboItem[]): ComboItem[] {
  if (Array.isArray(value)) return value;
  return value ? String(value).split(", ").filter(Boolean) : [];
}

function textFor(item: ComboItem): string {
  if (typeof item === "string") return item;
  if ("text" in item) return item.text;
  return item.header;
}

function modelText(value: string | ComboItem[]): string {
  return Array.isArray(value) ? value.map(textFor).join(", ") : value;
}

function isAdvanced(item: ComboItem): item is AdvancedItem {
  return typeof item !== "string" && "text" in item;
}

const examples: Example[] = [
  { title: "Multiple combobox", description: "Previously known as tags - user is allowed to enter more than 1 value", source: "simple/combobox-multiple", minHeight: 460, render: () => <MultipleExample /> },
  { title: "Dense", description: <>You can use <CodePill>dense</CodePill> prop to reduce combobox height and lower max height of list items.</>, source: "simple/dense", minHeight: 190, render: () => <DenseExample /> },
  { title: "No data with chips", description: <>In this example we utilize a custom <strong>no-data</strong> slot to provide context to the user when searching / creating items.</>, source: "intermediate/no-data", minHeight: 210, render: () => <NoDataExample /> },
  { title: "Advanced custom options", description: <>The <CodePill>v-combobox</CodePill> improves upon the added functionality from <CodePill>v-select</CodePill> and <CodePill>v-autocomplete</CodePill>. This provides you with an expansive interface to create truly customized implementations. This example takes advantage of some more advanced features such as a custom <strong>filter</strong> algorithm, inline list editing and dynamic input items.</>, source: "intermediate/advanced", minHeight: 250, render: () => <AdvancedExample /> },
];

const sourceTemplates = {
  "simple/combobox-multiple": "src/demo/examples/combobox/simple/combobox-multiple.vue",
  "simple/dense": "src/demo/examples/combobox/simple/dense.vue",
  "intermediate/no-data": "src/demo/examples/combobox/intermediate/no-data.vue",
  "intermediate/advanced": "src/demo/examples/combobox/intermediate/advanced.vue",
};
