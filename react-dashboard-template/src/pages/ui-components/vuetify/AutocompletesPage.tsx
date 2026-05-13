import { useEffect, useMemo, useState, type PointerEvent, type ReactNode } from "react";
import { Avatar, Box, Button, Card, Checkbox, Chip, CircularProgress, Collapse, IconButton, LinearProgress, MenuItem, Select, Stack, Switch, Toolbar, Tooltip, Typography } from "@mui/material";
import { AccountCircle, CheckCircleOutline, Close, Code, Edit, EditOutlined, GitHub, InvertColors, KeyboardArrowDown, LocationCity, MoreVert, Paid, Storage, Update, ViewList } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const redLighten2 = "#e57373";
const redLighten3 = "#ef9a9a";
const purple = "#9c27b0";
const purpleLighten1 = "#ab47bc";
const purpleDarken3 = "#6a1b9a";
const blueGreyDarken1 = "#546e7a";
const blueGreyDarken3 = "#37474f";
const blueGreyLighten2 = "#90a4ae";
const orangeAccent1 = "#ffd180";
const teal = "#009688";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };

type Item = string | Record<string, unknown>;

interface AutoExample {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  minHeight: number;
  render: (inverted: boolean) => ReactNode;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
  leaving: boolean;
}

export default function AutocompletesPage() {
  return (
    <DocPage
      title="Autocompletes"
      namespace="Components"
      icon={<ViewList />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Autocompletes" },
      ]}
    >
      <DocText>
        The <CodePill>v-autocomplete</CodePill> component offers simple and flexible type-ahead functionality. This is useful when searching large sets of data or even dynamically requesting information from an API.
      </DocText>
      <UsageSection />
      <Alerts />
      <ExamplesSection />
    </DocPage>
  );
}

function Alerts() {
  return (
    <Stack spacing={1.5} sx={{ mb: 4 }}>
      <AppAlert severity="error">When using objects for the <strong>items</strong> prop, you must associate <strong>item-text</strong> and <strong>item-value</strong> with existing properties on your objects. These values are defaulted to <strong>text</strong> and <strong>value</strong> and can be changed.</AppAlert>
      <AppAlert severity="warning">The <strong>auto</strong> property of <strong>menu-props</strong> is only supported for the default input style.</AppAlert>
      <AppAlert severity="error">Browser autocomplete is set to off by default, may vary by browser and may be ignored. <Box component="a" href="https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion" sx={{ color: "inherit", textDecoration: "underline" }}>MDN</Box></AppAlert>
    </Stack>
  );
}

function AppAlert({ severity, children }: { severity: "error" | "warning"; children: ReactNode }) {
  const color = severity === "error" ? "#ff5252" : "#fb8c00";
  return <Box sx={{ borderLeft: `4px solid ${color}`, bgcolor: severity === "error" ? "rgba(255,82,82,.08)" : "rgba(251,140,0,.10)", color: "text.secondary", px: 2, py: 1.5, fontSize: 15, lineHeight: 1.55 }}>{children}</Box>;
}

function UsageSection() {
  const [filter, setFilter] = useState("");
  const activeFilter = filter === "Exact Match" ? "exact" : filter === "Search Length > 2 & Loose Match" ? "loose" : "default";

  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Usage
      </Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>
        The autocomplete component extends <CodePill>v-select</CodePill> and adds the ability to filter items.
      </Typography>
      <Card variant="outlined" sx={{ bgcolor: "background.default", borderColor: "rgba(111,125,133,.18)", boxShadow: "none", overflow: "hidden", mb: 6 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "3fr 1fr" } }}>
          <Box>
            <Box sx={{ height: 48, bgcolor: "rgba(111,125,133,.10)", borderBottom: "thin solid rgba(0,0,0,.12)" }} />
            <Box sx={{ height: 300, p: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box sx={{ width: { xs: "100%", sm: 440 } }}>
                <VAutocomplete label="Test custom filters" items={states} filled rounded filterMode={activeFilter} />
              </Box>
            </Box>
          </Box>
          <Box sx={{ borderLeft: { md: "thin solid rgba(0,0,0,.12)" } }}>
            <Box sx={{ height: 48, bgcolor: "rgba(111,125,133,.10)", display: "flex", alignItems: "center", px: 2, fontSize: 20 }}>Options</Box>
            <Box sx={{ borderTop: "thin solid rgba(0,0,0,.12)", p: 2, maxHeight: 300, overflowY: "auto" }}>
              <VSelect label="Filter" value={filter} items={["Exact Match", "Search Length > 2 & Loose Match"]} onChange={setFilter} clearable />
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
            {(inverted) => example.render(inverted)}
          </VuetifyExampleBlock>
        ))}
      </Stack>
    </Box>
  );
}

function VuetifyExampleBlock({ title, description, source, children, minHeight }: { title: string; description: ReactNode; source: keyof typeof sourceTemplates; children: (inverted: boolean) => ReactNode; minHeight: number }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);

  return (
    <Card sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}>
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
      <Box sx={{ px: { xs: 3, md: 4 }, py: { xs: 3.5, md: 4.25 }, minHeight, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", transition: "background-color 180ms ease, color 180ms ease", position: "relative", zIndex: 1 }}>
        {description && <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: 16.5, fontWeight: 300, lineHeight: 1.7, mb: 3 }}>{description}</Typography>}
        {children(inverted)}
      </Box>
    </Card>
  );
}

function ApiExample() {
  const fallback = [
    { API: "AdoptAPet", Description: "Resource to help get pets adopted", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.adoptapet.com/public/apis/pet_list.html", Category: "Animals" },
    { API: "Axolotl", Description: "Collection of axolotl pictures and facts", Auth: "", HTTPS: true, Cors: "no", Link: "https://theaxolotlapi.netlify.app/", Category: "Animals" },
    { API: "Cat Facts", Description: "Daily cat facts", Auth: "", HTTPS: true, Cors: "no", Link: "https://alexwohlbruck.github.io/cat-facts/", Category: "Animals" },
  ];
  const [entries, setEntries] = useState<Record<string, unknown>[]>([]);
  const [model, setModel] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const items = (entries.length ? entries : fallback).map((entry) => ({ ...entry, Description: String(entry.Description).length > 60 ? `${String(entry.Description).slice(0, 60)}...` : entry.Description }));

  const load = () => {
    if (entries.length || loading) return;
    setLoading(true);
    fetch("https://api.publicapis.org/entries")
      .then((res) => res.json())
      .then((res) => setEntries(res.entries || []))
      .catch(() => setEntries(fallback))
      .finally(() => setLoading(false));
  };

  const fields = model ? Object.keys(model).map((key) => ({ key, value: String(model[key] || "n/a") })) : [];
  return (
    <VCard sx={{ bgcolor: redLighten2, color: "#fff" }}>
      <Box sx={{ bgcolor: redLighten3, px: 2, py: 2 }}>
        <Typography sx={{ fontSize: 24, fontWeight: 400 }}>Search for Public APIs</Typography>
      </Box>
      <Box sx={{ p: 2, lineHeight: 1.5 }}>
        Explore hundreds of free API&apos;s ready for consumption! For more information visit <Box component="a" href="https://github.com/toddmotto/public-apis" target="_blank" sx={{ color: "rgba(255,255,255,.75)" }}>the Github repository</Box>.
      </Box>
      <Box sx={{ px: 2, pb: 2 }}>
        <VAutocomplete label="Public APIs" placeholder="Start typing to Search" items={items} itemText="Description" prependIcon={<Storage />} loading={loading} hideNoData hideSelected onSearch={load} onSelect={(item) => setModel(item as Record<string, unknown>)} dark color="#fff" />
      </Box>
      <VDivider dark />
      <Collapse in={Boolean(model)}>
        <Box sx={{ bgcolor: redLighten3 }}>
          {fields.map((field) => (
            <Box key={field.key} sx={{ px: 2, py: 1.2 }}>
              <Typography sx={{ fontSize: 16 }}>{field.value}</Typography>
              <Typography sx={{ fontSize: 14, color: "rgba(255,255,255,.7)" }}>{field.key}</Typography>
            </Box>
          ))}
        </Box>
      </Collapse>
      <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}>
        <VBtn disabled={!model} color="#424242" dark onClick={() => setModel(null)}>Clear <Close sx={{ fontSize: 18, ml: 1 }} /></VBtn>
      </Box>
    </VCard>
  );
}

function CustomFilterExample() {
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const statesData = [
    { name: "Florida", abbr: "FL", id: 1 },
    { name: "Georgia", abbr: "GA", id: 2 },
    { name: "Nebraska", abbr: "NE", id: 3 },
    { name: "California", abbr: "CA", id: 4 },
    { name: "New York", abbr: "NY", id: 5 },
  ];
  const save = () => {
    setIsEditing(false);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };
  return (
    <VCard sx={{ bgcolor: purpleLighten1, color: "#fff", position: "relative", overflow: "hidden" }}>
      <Toolbar sx={{ bgcolor: purple, color: "#fff", minHeight: 64 }}>
        <AccountCircle sx={{ mr: 2 }} />
        <Typography sx={{ fontSize: 20, fontWeight: 300 }}>User Profile</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={() => setIsEditing((value) => !value)} sx={{ bgcolor: purpleDarken3, color: "#fff", width: 40, height: 40, "&:hover": { bgcolor: purpleDarken3 } }}>
          {isEditing ? <Close /> : <Edit />}
        </IconButton>
      </Toolbar>
      <Box sx={{ p: 2 }}>
        <VTextField label="Name" disabled={!isEditing} dark color="#fff" />
        <VAutocomplete label="State" items={statesData} itemText="name" disabled={!isEditing} dark color="#fff" filter={(item, query) => String((item as Record<string, unknown>).name).toLowerCase().includes(query.toLowerCase()) || String((item as Record<string, unknown>).abbr).toLowerCase().includes(query.toLowerCase())} />
      </Box>
      <VDivider dark />
      <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}>
        <VBtn disabled={!isEditing} color="#4caf50" dark onClick={save}>Save</VBtn>
      </Box>
      <Collapse in={saved}>
        <Box sx={{ position: "absolute", left: 16, bottom: 16, bgcolor: "#323232", color: "#fff", px: 2, py: 1.5, borderRadius: 1, boxShadow: "0 3px 8px rgba(0,0,0,.3)" }}>Your profile has been updated</Box>
      </Collapse>
    </VCard>
  );
}

function DenseExample() {
  const items = ["foo", "bar", "fizz", "buzz"];
  return (
    <VCard>
      <Box sx={{ p: 3 }}>
        <VAutocomplete label="Outlined" items={items} multiple chips smallChips dense outlined defaultSelected={["foo", "bar"]} />
        <VAutocomplete label="Solo" items={items} multiple chips smallChips dense solo defaultSelected={["foo", "bar"]} />
        <VAutocomplete label="Filled" items={items} dense filled />
      </Box>
    </VCard>
  );
}

function SlotsExample() {
  const srcs = { 1: "/static/doc-images/lists/m1.jpg", 2: "/static/doc-images/lists/m2.jpg", 3: "/static/doc-images/lists/m3.jpg", 4: "/static/doc-images/lists/m4.jpg", 5: "/static/doc-images/lists/g6.jpg" };
  const people = [
    { header: "Group 1" },
    { name: "Sandra Adams", group: "Group 1", avatar: srcs[1] },
    { name: "Ali Connors", group: "Group 1", avatar: srcs[2] },
    { name: "Trevor Hansen", group: "Group 1", avatar: srcs[3] },
    { name: "Tucker Smith", group: "Group 1", avatar: srcs[2] },
    { divider: true },
    { header: "Group 2" },
    { name: "Britta Holt", group: "Group 2", avatar: srcs[4] },
    { name: "Jane Smith ", group: "Group 2", avatar: srcs[5] },
    { name: "John Smith", group: "Group 2", avatar: srcs[1] },
    { name: "Sandra Williams", group: "Group 2", avatar: srcs[3] },
  ];
  const [updating, setUpdating] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);
  useEffect(() => {
    if (!updating) return;
    const timer = window.setTimeout(() => setUpdating(false), 3000);
    return () => window.clearTimeout(timer);
  }, [updating]);
  return (
    <VCard sx={{ bgcolor: blueGreyDarken1, color: "#fff", position: "relative" }}>
      {updating && <LinearProgress sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, bgcolor: "transparent", "& .MuiLinearProgress-bar": { bgcolor: "#a5d6a7" } }} />}
      <Box sx={{ height: 200, backgroundImage: "url(https://i.picsum.photos/id/485/1024/768.jpg)", backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}><IconButton onClick={() => setUpdating(true)} sx={{ color: "#fff" }}><MoreVert /></IconButton></Box>
        <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", pointerEvents: "none" }}>
          <Box><Typography sx={{ fontSize: 24 }}>Midnight Crew</Typography><Typography sx={{ color: "rgba(255,255,255,.7)" }}>The summer breeze</Typography></Box>
        </Box>
      </Box>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
          <VTextField label="Name" value="Midnight Crew" disabled={updating} filled dark color={blueGreyLighten2} />
          <VTextField label="Title" value="The summer breeze" disabled={updating} filled dark color={blueGreyLighten2} />
        </Box>
        <VAutocomplete label="Select" items={people} itemText="name" multiple chips filled dark color={blueGreyLighten2} disabled={updating} defaultSelected={["Sandra Adams", "Britta Holt"]} customList />
      </Box>
      <VDivider dark />
      <Box sx={{ p: 1, display: "flex", alignItems: "center" }}>
        <VSwitch label="Auto Update" checked={autoUpdate} disabled={updating} onChange={setAutoUpdate} />
        <Box sx={{ flexGrow: 1 }} />
        <VBtn disabled={autoUpdate} loading={updating} color={blueGreyDarken3} dark onClick={() => setUpdating(true)}><Update sx={{ fontSize: 18, mr: 1 }} />Update Now</VBtn>
      </Box>
    </VCard>
  );
}

function AsyncExample() {
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const query = (value: string) => {
    if (!value) return;
    setLoading(true);
    window.setTimeout(() => {
      setItems(states.filter((state) => state.toLowerCase().includes(value.toLowerCase())));
      setLoading(false);
    }, 500);
  };
  return (
    <Toolbar sx={{ minHeight: 64, bgcolor: teal, color: "#fff" }}>
      <Typography sx={{ fontSize: 20, mr: 2, whiteSpace: "nowrap" }}>State selection</Typography>
      <Box sx={{ flex: 1 }}>
        <VAutocomplete label="What state are you from?" items={items} loading={loading} onSearch={query} soloInverted hideDetails />
      </Box>
      <IconButton sx={{ color: "#fff" }}><MoreVert /></IconButton>
    </Toolbar>
  );
}

function AdvancedExample() {
  const coins = [
    { name: "Bitcoin", symbol: "btc" },
    { name: "Ethereum", symbol: "eth" },
    { name: "Litecoin", symbol: "ltc" },
    { name: "Cardano", symbol: "ada" },
    { name: "Dogecoin", symbol: "doge" },
  ];
  const [model, setModel] = useState<Item | null>(null);
  return (
    <Box>
      <Toolbar sx={{ minHeight: 64, bgcolor: orangeAccent1, color: "rgba(0,0,0,.87)" }}>
        <IconButton sx={{ display: { xs: "none", sm: "inline-flex" } }}><ViewList /></IconButton>
        <Typography sx={{ fontSize: 20, mr: 3, display: { xs: "none", sm: "block" } }}>Cryptocurrency</Typography>
        <Box sx={{ flex: 1 }}>
          <VAutocomplete label="Search for a coin..." items={coins} itemText="name" itemValue="symbol" chips solo clearable hideSelected onSelect={setModel} customCoin />
        </Box>
      </Toolbar>
      <Box sx={{ height: 48, display: "flex", alignItems: "center", borderTop: "thin solid rgba(0,0,0,.12)", bgcolor: orangeAccent1 }}>
        {["News", "Trading", "Blog"].map((tab, index) => <Button key={tab} disabled={!model} sx={{ height: 48, px: 3, color: model ? blueGreyDarken1 : "rgba(0,0,0,.38)", borderBottom: model && index === 0 ? `2px solid ${blueGreyDarken1}` : "2px solid transparent" }}>{tab}</Button>)}
      </Box>
    </Box>
  );
}

function StateSelectorExample() {
  const [editing, setEditing] = useState(false);
  return (
    <VCard>
      <Box sx={{ bgcolor: blueGreyDarken1, color: "#fff", px: 2, py: 2 }}>
        <Typography sx={{ fontSize: 24, fontWeight: 400 }}>Profile</Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography sx={{ color: "rgba(0,0,0,.54)", fontSize: 14, mb: 1 }}>Where do you live?</Typography>
        <VAutocomplete label={`State — ${editing ? "Editable" : "Readonly"}`} items={states} readonly={!editing} prependIcon={<LocationCity />} hint={!editing ? "Click the icon to edit" : "Click the icon to save"} appendOuter={<IconButton onClick={() => setEditing((value) => !value)} sx={{ color: editing ? "#4caf50" : "#2196f3" }}>{editing ? <CheckCircleOutline /> : <EditOutlined />}</IconButton>} />
      </Box>
    </VCard>
  );
}

function VAutocomplete({ label, items, itemText, itemValue, multiple = false, chips = false, smallChips = false, dense = false, filled = false, outlined = false, solo = false, rounded = false, soloInverted = false, clearable = false, hideSelected = false, hideNoData = false, hideDetails = false, disabled = false, readonly = false, dark = false, color = primary, prependIcon, appendOuter, hint, placeholder, loading = false, defaultSelected = [], filterMode = "default", filter, onSearch, onSelect, customList = false, customCoin = false }: { label: string; items: Item[]; itemText?: string; itemValue?: string; multiple?: boolean; chips?: boolean; smallChips?: boolean; dense?: boolean; filled?: boolean; outlined?: boolean; solo?: boolean; rounded?: boolean; soloInverted?: boolean; clearable?: boolean; hideSelected?: boolean; hideNoData?: boolean; hideDetails?: boolean; disabled?: boolean; readonly?: boolean; dark?: boolean; color?: string; prependIcon?: ReactNode; appendOuter?: ReactNode; hint?: string; placeholder?: string; loading?: boolean; defaultSelected?: string[]; filterMode?: "default" | "exact" | "loose"; filter?: (item: Item, query: string) => boolean; onSearch?: (query: string) => void; onSelect?: (item: Item) => void; customList?: boolean; customCoin?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>(defaultSelected);
  const getText = (item: Item) => typeof item === "string" ? item : String(item[itemText || "text"] ?? item.name ?? "");
  const selectedSet = new Set(selected);
  const filtered = useMemo(() => {
    const base = items.filter((item) => !(hideSelected && selectedSet.has(getText(item))));
    if (!query) return base;
    return base.filter((item) => {
      if (filter) return filter(item, query);
      const text = getText(item);
      if (filterMode === "exact") return text.indexOf(query) > -1;
      if (filterMode === "loose") return query.length > 2 && text.toLowerCase().includes(query.toLowerCase());
      return text.toLowerCase().includes(query.toLowerCase());
    });
  }, [items, query, hideSelected, selected.join("|"), filterMode]);
  const hasValue = selected.length > 0 || query.length > 0;
  const selectItem = (item: Item) => {
    const text = getText(item);
    if (multiple) setSelected((current) => current.includes(text) ? current : [...current, text]);
    else {
      setSelected([text]);
      setQuery(text);
      setOpen(false);
    }
    onSelect?.(itemValue && typeof item !== "string" ? String(item[itemValue]) : item);
  };
  const remove = (value: string) => setSelected((current) => current.filter((item) => item !== value));
  const clear = () => { setSelected([]); setQuery(""); };

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: hideDetails ? 0 : 2.5, color: dark ? "#fff" : "inherit", opacity: disabled ? .55 : 1 }}>
      {prependIcon && <Box sx={{ pt: dense ? 1 : 2.25, color: dark ? "rgba(255,255,255,.7)" : "rgba(0,0,0,.54)" }}>{prependIcon}</Box>}
      <Box sx={{ flex: 1, position: "relative" }}>
        <Box
          onClick={() => !disabled && !readonly && setOpen(true)}
          sx={{
            minHeight: dense ? 40 : 56,
            display: "flex",
            alignItems: "center",
            px: solo || soloInverted ? 1.5 : 0,
            py: chips && selected.length ? .6 : 0,
            borderRadius: rounded ? 28 : solo || soloInverted ? 1 : 0,
            bgcolor: solo ? "#fff" : soloInverted ? "rgba(255,255,255,.16)" : filled ? (dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.06)") : "transparent",
            border: outlined ? `1px solid ${dark ? "rgba(255,255,255,.7)" : "rgba(0,0,0,.38)"}` : 0,
            borderBottom: solo || soloInverted || outlined ? undefined : `1px solid ${dark ? "rgba(255,255,255,.7)" : "rgba(0,0,0,.42)"}`,
            boxShadow: solo ? "0px 2px 4px rgba(0,0,0,.18)" : "none",
            cursor: disabled ? "default" : "text",
            position: "relative",
            "&:focus-within": { borderBottomColor: color, borderBottomWidth: solo || soloInverted || outlined ? undefined : 2 },
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: hasValue || placeholder ? 12 : 16, color: dark ? "rgba(255,255,255,.7)" : hasValue ? color : "rgba(0,0,0,.6)", lineHeight: 1.1, transition: ".2s" }}>{label}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: .5 }}>
              {chips && selected.map((item) => (
                <Chip key={item} size={smallChips ? "small" : "medium"} label={item} onDelete={multiple ? () => remove(item) : undefined} avatar={customList ? <Avatar src={avatarFor(item)} /> : customCoin ? <Avatar sx={{ bgcolor: blueGreyDarken1, color: "#fff" }}><Paid sx={{ fontSize: 16 }} /></Avatar> : undefined} sx={{ height: smallChips ? 24 : 32, bgcolor: customCoin ? blueGreyDarken1 : "rgba(0,0,0,.08)", color: customCoin ? "#fff" : "inherit" }} />
              ))}
              <Box component="input" disabled={disabled || readonly} value={multiple ? query : query} placeholder={placeholder} onChange={(event) => { setQuery(event.target.value); setOpen(true); onSearch?.(event.target.value); }} sx={{ flex: 1, minWidth: 80, height: dense ? 28 : 32, border: 0, outline: 0, bgcolor: "transparent", color: dark ? "#fff" : "rgba(0,0,0,.87)", fontSize: 16, p: 0 }} />
            </Box>
          </Box>
          {loading && <CircularProgress size={18} sx={{ mr: 1, color }} />}
          {clearable && (selected.length || query) ? <IconButton size="small" onClick={(event) => { event.stopPropagation(); clear(); }}><Close sx={{ fontSize: 18 }} /></IconButton> : null}
          <KeyboardArrowDown sx={{ color: dark ? "rgba(255,255,255,.7)" : "rgba(0,0,0,.54)" }} />
        </Box>
        {!hideDetails && hint && <Typography sx={{ fontSize: 12, color: dark ? "rgba(255,255,255,.7)" : "rgba(0,0,0,.6)", mt: .5 }}>{hint}</Typography>}
        {open && !disabled && !readonly && (!hideNoData || filtered.length > 0) && (
          <Card sx={{ position: "absolute", left: 0, right: 0, top: "calc(100% + 4px)", zIndex: 2300, maxHeight: 304, overflowY: "auto", py: .5, boxShadow: "0px 5px 5px -3px rgba(0,0,0,.2), 0px 8px 10px 1px rgba(0,0,0,.14), 0px 3px 14px 2px rgba(0,0,0,.12)" }}>
            {customCoin && filtered.length === 0 && <Box sx={{ px: 2, py: 1.5 }}>Search for your favorite <strong>Cryptocurrency</strong></Box>}
            {filtered.map((item, index) => {
              const record = typeof item === "string" ? undefined : item;
              const meta = record ? String(record.group ?? record.symbol ?? "") : "";
              if (record?.header) return <Typography key={`h-${index}`} sx={{ px: 2, py: 1, color: "rgba(0,0,0,.6)", fontSize: 14 }}>{String(record.header)}</Typography>;
              if (record?.divider) return <VDivider key={`d-${index}`} />;
              return (
                <Box key={`${getText(item)}-${index}`} onClick={() => selectItem(item)} sx={{ px: 2, py: 1, minHeight: 48, display: "flex", alignItems: "center", cursor: "pointer", "&:hover": { bgcolor: "rgba(0,0,0,.04)" } }}>
                  {customList && record && <Avatar src={String(record.avatar)} sx={{ mr: 2 }} />}
                  {customCoin && record && <Avatar sx={{ mr: 2, bgcolor: "#3f51b5", color: "#fff", fontSize: 20 }}>{getText(item).charAt(0)}</Avatar>}
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: 16 }}>{getText(item)}</Typography>
                    {meta && <Typography sx={{ fontSize: 14, color: "rgba(0,0,0,.6)" }}>{meta}</Typography>}
                  </Box>
                  {customCoin && <Paid sx={{ color: "rgba(0,0,0,.54)" }} />}
                </Box>
              );
            })}
          </Card>
        )}
      </Box>
      {appendOuter}
    </Box>
  );
}

function VTextField({ label, value = "", disabled = false, filled = false, dark = false, color = primary }: { label: string; value?: string; disabled?: boolean; filled?: boolean; dark?: boolean; color?: string }) {
  const [text, setText] = useState(value);
  return (
    <Box sx={{ mb: 2.5, opacity: disabled ? .55 : 1 }}>
      <Box sx={{ minHeight: 56, px: filled ? 1.5 : 0, bgcolor: filled ? (dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.06)") : "transparent", borderBottom: `1px solid ${dark ? "rgba(255,255,255,.7)" : "rgba(0,0,0,.42)"}`, "&:focus-within": { borderBottomColor: color, borderBottomWidth: 2 } }}>
        <Typography sx={{ fontSize: text ? 12 : 16, color: dark ? "rgba(255,255,255,.7)" : text ? color : "rgba(0,0,0,.6)", pt: 1 }}>{label}</Typography>
        <Box component="input" disabled={disabled} value={text} onChange={(event) => setText(event.target.value)} sx={{ width: "100%", height: 30, border: 0, outline: 0, bgcolor: "transparent", color: dark ? "#fff" : "rgba(0,0,0,.87)", fontSize: 16, p: 0 }} />
      </Box>
    </Box>
  );
}

function VSelect({ label, value, items, onChange, clearable = false }: { label: string; value: string; items: string[]; onChange: (value: string) => void; clearable?: boolean }) {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography sx={{ fontSize: 12, color: primary, mb: .25 }}>{label}</Typography>
      <Select value={value} displayEmpty fullWidth size="small" onChange={(event) => onChange(event.target.value)} sx={{ bgcolor: "transparent", "& .MuiOutlinedInput-notchedOutline": { border: 0, borderBottom: "1px solid rgba(0,0,0,.42)", borderRadius: 0 }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderBottom: `2px solid ${primary}` } }}>
        {clearable && <MenuItem value="">None</MenuItem>}
        {items.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
      </Select>
    </Box>
  );
}

function VSwitch({ label, checked, disabled = false, onChange }: { label: string; checked: boolean; disabled?: boolean; onChange: (value: boolean) => void }) {
  return <Box sx={{ display: "inline-flex", alignItems: "center", opacity: disabled ? .55 : 1 }}><Switch disabled={disabled} checked={checked} onChange={(event) => onChange(event.target.checked)} sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: "#81c784" }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: "rgba(129,199,132,.5)" } }} /><Typography>{label}</Typography></Box>;
}

function VBtn({ children, onClick, disabled = false, loading = false, color = "#fff", dark = false }: { children: ReactNode; onClick?: () => void; disabled?: boolean; loading?: boolean; color?: string; dark?: boolean }) {
  return <Button disabled={disabled || loading} onClick={onClick} sx={{ minWidth: 64, height: 36, px: 2, bgcolor: color, color: dark ? "#fff" : "rgba(0,0,0,.87)", textTransform: "uppercase", fontSize: 14, fontWeight: 500, letterSpacing: ".0892857143em", boxShadow: "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)", "&:hover": { bgcolor: color } }}>{loading ? <CircularProgress size={18} sx={{ color: "inherit", mr: 1 }} /> : null}{children}</Button>;
}

function VCard({ children, sx = {} }: { children: ReactNode; sx?: Record<string, unknown> }) {
  return <Card sx={{ borderRadius: 1, boxShadow: "0px 2px 4px rgba(0,0,0,.18)", overflow: "visible", bgcolor: "#fff", ...sx }}>{children}</Card>;
}

function VDivider({ dark = false }: { dark?: boolean }) {
  return <Box sx={{ borderTop: `thin solid ${dark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.12)"}` }} />;
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: .55, py: .18, borderRadius: .75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: .5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

function avatarFor(name: string) {
  const match = peopleAvatars.find((person) => person.name === name);
  return match?.avatar || "";
}

const peopleAvatars = [
  { name: "Sandra Adams", avatar: "/static/doc-images/lists/m1.jpg" },
  { name: "Britta Holt", avatar: "/static/doc-images/lists/m4.jpg" },
];

const states = ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Federated States of Micronesia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Marshall Islands", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Palau", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Island", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

const examples: AutoExample[] = [
  { title: "Searching an API", description: <>Easily hook up dynamic data and create a unique experience. The <CodePill>v-autocomplete</CodePill>&apos;s expansive prop list makes it easy to fine tune every aspect of the input.</>, source: "simple/api", minHeight: 520, render: () => <ApiExample /> },
  { title: "Custom filter on autocomplete", description: <>The <CodePill>filter</CodePill> prop can be used to filter each individual item with custom logic. In this example we filter items by name</>, source: "simple/customFilter", minHeight: 440, render: () => <CustomFilterExample /> },
  { title: "Dense", description: <>You can use <CodePill>dense</CodePill> prop to reduce autocomplete height and lower max height of list items.</>, source: "simple/dense", minHeight: 360, render: () => <DenseExample /> },
  { title: "Slots", description: "With the power of slots, you can customize the visual output of the select. In this example we add a profile picture for both the chips and list items.", source: "intermediate/slots", minHeight: 700, render: () => <SlotsExample /> },
  { title: "Asynchronous items", description: <>Sometimes you need to load data externally based upon a search query. Use the <CodePill>search-input</CodePill> prop with the <strong>.sync</strong> modifier when using the <CodePill>autocomplete</CodePill> prop. We also make use of the new <CodePill>cache-items</CodePill> prop. This will keep a unique list of all items that have been passed to the <CodePill>items</CodePill> prop and is <strong>REQUIRED</strong> when using asynchronous items and the <strong>multiple</strong> prop.</>, source: "intermediate/asynchronous", minHeight: 190, render: () => <AsyncExample /> },
  { title: "Advanced slots", description: <>The <CodePill>v-autocomplete</CodePill> component is extremely flexible and can fit in just about any use-case. Create custom displays for <strong>no-data</strong>, <strong>item</strong> and <strong>selection</strong> slots to provide a unique user experience. Using <em>slots</em> enables you to easily customize the desired look for your application.</>, source: "intermediate/advanced", minHeight: 220, render: () => <AdvancedExample /> },
  { title: "State selector", description: <>Using a combination of <CodePill>v-autocomplete</CodePill> slots and transitions, you can create a stylish toggleable autocomplete field such as this state selector.</>, source: "complex/stateSelector", minHeight: 250, render: () => <StateSelectorExample /> },
];

const sourceTemplates = {
  "simple/api": `src/demo/examples/autocompletes/simple/api.vue`,
  "simple/customFilter": `src/demo/examples/autocompletes/simple/customFilter.vue`,
  "simple/dense": `src/demo/examples/autocompletes/simple/dense.vue`,
  "intermediate/slots": `src/demo/examples/autocompletes/intermediate/slots.vue`,
  "intermediate/asynchronous": `src/demo/examples/autocompletes/intermediate/asynchronous.vue`,
  "intermediate/advanced": `src/demo/examples/autocompletes/intermediate/advanced.vue`,
  "complex/stateSelector": `src/demo/examples/autocompletes/complex/stateSelector.vue`,
};
