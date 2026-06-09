import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import { Box, Card, Chip, Collapse, Divider, IconButton, LinearProgress, Stack, Switch, Toolbar, Tooltip, Typography } from "@mui/material";
import { Add, ArrowDropDown, Check, CheckBox, CheckBoxOutlineBlank, Code, Fastfood, GitHub, IndeterminateCheckBox, InvertColors, Map, Remove, ViewHeadline } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const indigoDarken4 = "#1a237e";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 16, md: 20 }, lineHeight: 1.55, fontWeight: 300, mb: 3, color: "text.secondary" };
const sectionHeadingSx = { fontSize: { xs: 20, md: 22 }, lineHeight: 1.45, fontWeight: 400, mb: 2.5 };

type SelectItem = string | { text?: string; state?: string; abbr?: string };
type Ripple = { id: number; x: number; y: number; size: number };

interface Example {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  minHeight: number;
  render: () => ReactNode;
}

const basicItems = ["Foo", "Bar", "Fizz", "Buzz"];
const lowerItems = ["foo", "bar", "fizz", "buzz"];
const selectionItems = ["foo", "bar", "fizz", "buzz", "fizzbuzz", "foobar"];
const stateObjects = [
  { state: "Florida", abbr: "FL" },
  { state: "Georgia", abbr: "GA" },
  { state: "Nebraska", abbr: "NE" },
  { state: "California", abbr: "CA" },
  { state: "New York", abbr: "NY" },
];
const states = [
  "Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Federated States of Micronesia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Marshall Islands", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Palau", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Island", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];
const fruits = ["Apples", "Apricots", "Avocado", "Bananas", "Blueberries", "Blackberries", "Boysenberries", "Bread fruit", "Cantaloupes (cantalope)", "Cherries", "Cranberries", "Cucumbers", "Currants", "Dates", "Eggplant", "Figs", "Grapes", "Grapefruit", "Guava", "Honeydew melons", "Huckleberries", "Kiwis", "Kumquat", "Lemons", "Limes", "Mangos", "Mulberries", "Muskmelon", "Nectarines", "Olives", "Oranges", "Papaya", "Peaches", "Pears", "Persimmon", "Pineapple", "Plums", "Pomegranate", "Raspberries", "Rose Apple", "Starfruit", "Strawberries", "Tangerines", "Tomatoes", "Watermelons", "Zucchini"];

export default function SelectsPage() {
  return (
    <DocPage
      title="Selects"
      namespace="Components"
      icon={<ViewHeadline />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Selects" },
      ]}
    >
      <DocText>Select fields components are used for collecting user provided information from a list of options.</DocText>
      <UsageSection />
      <Stack spacing={1.5} sx={{ mb: 4 }}>
        <AppAlert severity="error">When using objects for the <strong>items</strong> prop, you must associate <strong>item-text</strong> and <strong>item-value</strong> with existing properties on your objects. These values are defaulted to <strong>text</strong> and <strong>value</strong> and can be changed.</AppAlert>
        <AppAlert severity="warning">The <strong>auto</strong> property of <strong>menu-props</strong> is only supported for the default input style.</AppAlert>
        <AppAlert severity="info">Browser autocomplete is set to off by default, may vary by browser and may be ignored. <Box component="a" href="https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion" sx={{ color: "inherit", textDecoration: "underline" }}>MDN</Box></AppAlert>
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
      <VuetifyExampleBlock title="" description="" source="usage" minHeight={300}>
        {() => <UsageExample />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function UsageExample() {
  return (
    <VContainer>
      <VGrid>
        <VSelect items={basicItems} label="Standard" />
        <VSelect items={basicItems} label="Filled style" filled />
        <VSelect items={basicItems} label="Outlined style" outlined />
        <VSelect items={basicItems} label="Solo field" solo />
      </VGrid>
    </VContainer>
  );
}

function PlaygroundSection() {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <Typography variant="h5" sx={sectionHeadingSx}>Playground</Typography>
      <VuetifyExampleBlock title="" description="" source="playground" minHeight={420}>
        {() => <PlaygroundExample />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function PlaygroundExample() {
  const [disabled, setDisabled] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [chips, setChips] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [appendIcon, setAppendIcon] = useState(false);
  const [appendSlot, setAppendSlot] = useState(false);
  const [appendItemSlot, setAppendItemSlot] = useState(false);
  const [prependIcon, setPrependIcon] = useState(false);
  const [prependSlot, setPrependSlot] = useState(false);
  const [prependItemSlot, setPrependItemSlot] = useState(false);
  const [selectSlot, setSelectSlot] = useState(false);
  const [model, setModel] = useState<string | string[]>("Foo");
  const value = Array.isArray(model) ? model : [model];
  const setValues = (next: string[]) => setModel(multiple ? next : next[0] || "Foo");
  const toggleMultiple = (next: boolean) => {
    setMultiple(next);
    setModel(next ? value : value[0] || "Foo");
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", width: "100%" }}>
      <VSwitch label="Disabled" checked={disabled} onChange={setDisabled} />
      <VSwitch label="Readonly" checked={readonly} onChange={setReadonly} />
      <VSwitch label="Chips" checked={chips} onChange={setChips} />
      <VSwitch label="Multiple" checked={multiple} onChange={toggleMultiple} />
      <VSwitch label="Append icon" checked={appendIcon} onChange={setAppendIcon} />
      <VSwitch label="Append slot" checked={appendSlot} onChange={setAppendSlot} />
      <VSwitch label="Append item slot" checked={appendItemSlot} onChange={setAppendItemSlot} />
      <VSwitch label="Prepend icon" checked={prependIcon} onChange={setPrependIcon} />
      <VSwitch label="Prepend slot" checked={prependSlot} onChange={setPrependSlot} />
      <VSwitch label="Prepend item slot" checked={prependItemSlot} onChange={setPrependItemSlot} />
      <VSwitch label="Selection slot" checked={selectSlot} onChange={setSelectSlot} />
      <Box sx={{ width: "100%", px: 1.5 }}>
        <VSelect
          items={basicItems}
          label="Label"
          disabled={disabled}
          readonly={readonly}
          multiple={multiple}
          chips={chips}
          value={value}
          onChange={setValues}
          prependIcon={prependIcon ? <Remove sx={{ color: "rgba(0,0,0,.54)" }} /> : undefined}
          appendIcon={appendIcon ? <Add sx={{ color: "rgba(0,0,0,.54)" }} /> : undefined}
          prependSlot={prependSlot ? <Remove sx={{ color: "#f44336" }} /> : undefined}
          appendSlot={appendSlot ? <Add sx={{ color: "#4caf50" }} /> : undefined}
          prependItemSlot={prependItemSlot ? <Box sx={{ px: 2, py: 1.3, color: "rgba(0,0,0,.54)" }}><ArrowDropDown sx={{ transform: "rotate(90deg)" }} /></Box> : undefined}
          appendItemSlot={appendItemSlot ? <Box sx={{ px: 2, py: 1.3, color: "rgba(0,0,0,.54)" }}><ArrowDropDown sx={{ transform: "rotate(-90deg)" }} /></Box> : undefined}
          selectionAppearance={selectSlot}
          playgroundMotion
        />
      </Box>
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

function VContainer({ children }: { children: ReactNode }) {
  return <Box sx={{ width: "100%", px: { xs: 1.5, md: 3 }, py: 1 }}>{children}</Box>;
}

function VGrid({ children }: { children: ReactNode }) {
  return <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, columnGap: 3, rowGap: 2, alignItems: "center" }}>{children}</Box>;
}

function Subheader({ children }: { children: ReactNode }) {
  return <Typography sx={{ color: "rgba(0,0,0,.6)", fontSize: 16, px: 2 }}>{children}</Typography>;
}

function VSelect({
  items,
  label,
  value,
  onChange,
  multiple = false,
  chips = false,
  disabled = false,
  readonly = false,
  dense = false,
  filled = false,
  outlined = false,
  solo = false,
  hint,
  persistentHint = false,
  prependIcon,
  appendIcon,
  appendOuterIcon,
  prependSlot,
  appendSlot,
  prependItemSlot,
  appendItemSlot,
  selectionAppearance = false,
  menuTop = false,
  hideDetails = false,
  returnObject = false,
  itemText = "text",
  playgroundMotion = true,
}: {
  items: SelectItem[];
  label: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  multiple?: boolean;
  chips?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  dense?: boolean;
  filled?: boolean;
  outlined?: boolean;
  solo?: boolean;
  hint?: string;
  persistentHint?: boolean;
  prependIcon?: ReactNode;
  appendIcon?: ReactNode;
  appendOuterIcon?: ReactNode;
  prependSlot?: ReactNode;
  appendSlot?: ReactNode;
  prependItemSlot?: ReactNode;
  appendItemSlot?: ReactNode;
  selectionAppearance?: boolean;
  menuTop?: boolean;
  hideDetails?: boolean;
  returnObject?: boolean;
  itemText?: "text" | "state";
  playgroundMotion?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState<string[]>(value || []);
  const [fieldRipples, setFieldRipples] = useState<Ripple[]>([]);
  const selected = value || internal;
  const canOpen = !disabled && !readonly;
  const active = open || selected.length > 0;
  const height = dense ? 48 : 56;
  const list = useMemo(() => items.map((item) => itemLabel(item, itemText)), [items, itemText]);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const update = (next: string[]) => {
    if (onChange) onChange(next);
    else setInternal(next);
  };
  const toggle = (item: string) => {
    if (multiple) update(selected.includes(item) ? selected.filter((entry) => entry !== item) : [...selected, item]);
    else {
      update([item]);
      setOpen(false);
    }
  };
  const clearOne = (item: string) => update(selected.filter((entry) => entry !== item));

  return (
    <Box ref={rootRef} sx={{ display: "flex", alignItems: "flex-start", width: "100%", opacity: disabled ? .52 : 1 }}>
      {prependIcon && <Box sx={{ width: 40, minHeight: height, display: "flex", alignItems: "center", justifyContent: "center", mr: 1 }}>{prependIcon}</Box>}
      <Box sx={{ flex: 1, minWidth: 0, position: "relative" }}>
        <Box
          onMouseDown={(event) => {
            if (canOpen && playgroundMotion) createRipple(event, setFieldRipples);
          }}
          onClick={() => canOpen && setOpen((current) => !current)}
          sx={{
            position: "relative",
            minHeight: height,
            px: outlined || filled || solo ? 1.5 : 0,
            py: chips && selected.length ? .55 : 0,
            display: "flex",
            alignItems: "center",
            bgcolor: solo ? "#fff" : filled ? "rgba(0,0,0,.06)" : "transparent",
            border: outlined ? `1px solid ${open ? primary : "rgba(0,0,0,.38)"}` : 0,
            borderRadius: outlined || solo ? 1 : 0,
            borderBottom: outlined || solo ? undefined : `1px solid ${open ? primary : "rgba(0,0,0,.42)"}`,
            boxShadow: solo ? "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)" : "none",
            cursor: canOpen ? "pointer" : "default",
            overflow: playgroundMotion ? "hidden" : "visible",
            transition: "background-color 180ms cubic-bezier(.4,0,.2,1), border-color 180ms cubic-bezier(.4,0,.2,1), box-shadow 180ms cubic-bezier(.4,0,.2,1)",
            "&:hover": { borderColor: canOpen ? "rgba(0,0,0,.87)" : undefined, borderBottomColor: canOpen ? "rgba(0,0,0,.87)" : undefined },
          }}
        >
          {playgroundMotion && <RippleLayer ripples={fieldRipples} color="rgba(0,0,0,.16)" />}
          {prependSlot && <Box sx={{ width: 32, display: "flex", alignItems: "center", justifyContent: "center", mr: 1 }}>{prependSlot}</Box>}
          <Box sx={{ flex: 1, minWidth: 0, pt: active ? .65 : 1.9 }}>
            <Typography sx={{ fontSize: active ? 12 : 16, color: open ? primary : "rgba(0,0,0,.6)", lineHeight: 1.1, transition: "font-size 160ms cubic-bezier(.4,0,.2,1), color 160ms cubic-bezier(.4,0,.2,1)" }}>{label}</Typography>
            <Box sx={{ minHeight: dense ? 22 : 30, display: "flex", alignItems: "center", flexWrap: "wrap", gap: .5, fontSize: 16, color: "rgba(0,0,0,.87)" }}>
              {renderSelection(selected, { chips, multiple, selectionAppearance, clearOne })}
            </Box>
          </Box>
          {appendSlot && <Box sx={{ width: 32, display: "flex", alignItems: "center", justifyContent: "center", ml: 1 }}>{appendSlot}</Box>}
          <Box sx={{ width: 32, minHeight: 32, display: "flex", alignItems: "center", justifyContent: "center", color: canOpen ? "rgba(0,0,0,.54)" : "rgba(0,0,0,.38)" }}>
            {appendIcon || <ArrowDropDown sx={{ fontSize: 24, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 180ms ease" }} />}
          </Box>
        </Box>
        {!hideDetails && (
          <Box sx={{ minHeight: 18, mt: .45 }}>
            <Typography sx={{ fontSize: 12, color: "rgba(0,0,0,.6)" }}>{persistentHint || open ? hint : ""}</Typography>
          </Box>
        )}
        <Collapse in={open && canOpen} timeout={playgroundMotion ? 180 : 130} unmountOnExit>
          <Box sx={{ position: "absolute", zIndex: 12, left: 0, right: 0, top: menuTop ? "auto" : "calc(100% - 14px)", bottom: menuTop ? "calc(100% - 2px)" : "auto", bgcolor: "#fff", boxShadow: "0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)", borderRadius: .5, overflowY: "auto", maxHeight: 400, py: .5, transformOrigin: menuTop ? "bottom center" : "top center", animation: playgroundMotion ? "selectMenuEnter 160ms cubic-bezier(.4,0,.2,1)" : "none", "@keyframes selectMenuEnter": { "0%": { opacity: .82, transform: "scaleY(.96)" }, "100%": { opacity: 1, transform: "scaleY(1)" } } }}>
            {prependItemSlot}
            {list.map((item) => {
              const selectedItem = selected.includes(item);
              return (
                <SelectMenuItem key={item} item={item} dense={dense} multiple={multiple} selected={selectedItem} playgroundMotion={playgroundMotion} onSelect={() => toggle(item)} />
              );
            })}
            {appendItemSlot}
          </Box>
        </Collapse>
      </Box>
      {appendOuterIcon && <Box sx={{ width: 40, minHeight: height, display: "flex", alignItems: "center", justifyContent: "center", ml: 1 }}>{appendOuterIcon}</Box>}
    </Box>
  );
}

function createRipple(event: ReactMouseEvent<HTMLElement>, setRipples: React.Dispatch<React.SetStateAction<Ripple[]>>) {
  const rect = event.currentTarget.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.9;
  const id = Date.now() + Math.random();
  const ripple = {
    id,
    size,
    x: event.clientX - rect.left - size / 2,
    y: event.clientY - rect.top - size / 2,
  };
  setRipples((current) => [...current, ripple]);
  window.setTimeout(() => {
    setRipples((current) => current.filter((entry) => entry.id !== id));
  }, 520);
}

function RippleLayer({ ripples, color }: { ripples: Ripple[]; color: string }) {
  return (
    <Box sx={{ position: "absolute", inset: 0, borderRadius: "inherit", overflow: "hidden", pointerEvents: "none", "@keyframes selectRipple": { "0%": { transform: "scale(0)", opacity: .24 }, "70%": { opacity: .16 }, "100%": { transform: "scale(1)", opacity: 0 } } }}>
      {ripples.map((ripple) => (
        <Box key={ripple.id} component="span" sx={{ position: "absolute", left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size, borderRadius: "50%", bgcolor: color, animation: "selectRipple 520ms cubic-bezier(.4,0,.2,1)" }} />
      ))}
    </Box>
  );
}

function SelectMenuItem({ item, dense, multiple, selected, playgroundMotion, onSelect }: { item: string; dense: boolean; multiple: boolean; selected: boolean; playgroundMotion: boolean; onSelect: () => void }) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  return (
    <Box
      onMouseDown={(event) => {
        if (playgroundMotion) createRipple(event, setRipples);
      }}
      onClick={onSelect}
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: dense ? 40 : 48,
        px: 2,
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        fontSize: 16,
        cursor: "pointer",
        color: selected ? primary : "rgba(0,0,0,.87)",
        bgcolor: selected ? "rgba(0,151,167,.08)" : "transparent",
        transition: "background-color 150ms cubic-bezier(.4,0,.2,1), color 150ms cubic-bezier(.4,0,.2,1)",
        "&:hover": { bgcolor: selected ? "rgba(0,151,167,.12)" : "rgba(0,0,0,.04)" },
      }}
    >
      {playgroundMotion && <RippleLayer ripples={ripples} color={selected ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.14)"} />}
      {multiple && <Check sx={{ fontSize: 18, opacity: selected ? 1 : 0, transition: "opacity 120ms cubic-bezier(.4,0,.2,1)" }} />}
      {item}
    </Box>
  );
}

function renderSelection(selected: string[], { chips, multiple, selectionAppearance, clearOne }: { chips: boolean; multiple: boolean; selectionAppearance: boolean; clearOne: (item: string) => void }) {
  if (!selected.length) return "";
  if (selectionAppearance && selected.length) {
    return (
      <>
        <Chip label={selected[0]} size="small" sx={{ bgcolor: "rgba(0,0,0,.08)", height: 32 }} />
        {selected.length > 1 && <Typography sx={{ color: "rgba(0,0,0,.54)", fontSize: 12 }}>(+{selected.length - 1} others)</Typography>}
      </>
    );
  }
  if (chips) return selected.map((item) => <Chip key={item} label={item} size="small" sx={{ height: 32, bgcolor: "rgba(0,0,0,.08)" }} />);
  return multiple ? selected.join(", ") : selected[0];
}

function itemLabel(item: SelectItem, itemText: "text" | "state") {
  if (typeof item === "string") return item;
  return String(item[itemText] || item.text || "");
}

function VSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", m: 2 }}>
      <Box
        onMouseDown={(event) => createRipple(event, setRipples)}
        sx={{ position: "relative", width: 52, height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 20, overflow: "hidden" }}
      >
        <RippleLayer ripples={ripples} color={checked ? "rgba(0,151,167,.22)" : "rgba(0,0,0,.14)"} />
        <Switch
          disableRipple
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          sx={{
            width: 50,
            height: 34,
            p: 0,
            "& .MuiSwitch-switchBase": { p: "7px", transition: "transform 220ms cubic-bezier(.4,0,.2,1), color 160ms cubic-bezier(.4,0,.2,1)" },
            "& .MuiSwitch-switchBase.Mui-checked": { color: primary, transform: "translateX(16px)" },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: primary, opacity: .5 },
            "& .MuiSwitch-thumb": { width: 20, height: 20, boxShadow: "0 2px 4px rgba(0,0,0,.28)", transition: "box-shadow 160ms cubic-bezier(.4,0,.2,1)" },
            "& .MuiSwitch-track": { borderRadius: 12, bgcolor: "rgba(0,0,0,.38)", opacity: .38, transition: "background-color 180ms cubic-bezier(.4,0,.2,1), opacity 180ms cubic-bezier(.4,0,.2,1)" },
          }}
        />
      </Box>
      <Typography sx={{ fontSize: 16 }}>{label}</Typography>
    </Box>
  );
}

function LightExample() {
  const value = ["foo", "bar", "fizz", "buzz"];
  return <Card sx={{ boxShadow: "none", overflow: "visible" }}><VContainer><VGrid><VSelect items={lowerItems} label="Chips" multiple chips value={value} /><VSelect items={lowerItems} label="Chips" multiple chips value={value} filled /><VSelect items={lowerItems} label="Chips" multiple chips value={value} outlined /><VSelect items={lowerItems} label="Chips" multiple chips value={value} solo /></VGrid></VContainer></Card>;
}

function SelectionAppearanceExample() {
  const [value, setValue] = useState(["foo", "bar", "fizz"]);
  return (
    <VContainer>
      <VSelect items={selectionItems} label="Select Item" multiple value={value} onChange={setValue} selectionAppearance />
    </VContainer>
  );
}

function IconsExample() {
  return (
    <VContainer>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 2, columnGap: 3, alignItems: "center" }}>
        <Subheader>Prepended icon</Subheader>
        <VSelect items={states} value={["Florida"]} label="Select" prependIcon={<Map />} hideDetails />
        <Subheader>Appended icon</Subheader>
        <VSelect items={states} value={["Texas"]} label="Select" appendOuterIcon={<Map />} hideDetails />
      </Box>
    </VContainer>
  );
}

function MultipleExample() {
  return (
    <VContainer>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, rowGap: 2, columnGap: 3, alignItems: "center" }}>
        <Subheader>Multiple with persistent hint</Subheader>
        <VSelect items={states} label="Select" multiple hint="Pick your favorite states" persistentHint />
        <Subheader>Multiple (Chips) with persistent hint</Subheader>
        <VSelect items={states} label="Select" multiple chips hint="What are the target regions" persistentHint />
      </Box>
    </VContainer>
  );
}

function CustomTextValueExample() {
  const [value, setValue] = useState(["Florida"]);
  const current = stateObjects.find((item) => item.state === value[0]) || stateObjects[0];
  return (
    <VContainer>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", columnGap: 3 }}>
        <Subheader>Custom items</Subheader>
        <VSelect items={stateObjects} label="Select" value={value} onChange={setValue} itemText="state" hint={`${current.state}, ${current.abbr}`} persistentHint />
      </Box>
    </VContainer>
  );
}

function SlotsExample() {
  const [selected, setSelected] = useState<string[]>([]);
  const likesAll = selected.length === fruits.length;
  const likesSome = selected.length > 0 && !likesAll;
  const toggleAll = () => setSelected(likesAll ? [] : fruits.slice());
  const icon = likesAll ? <CheckBox sx={{ color: indigoDarken4 }} /> : likesSome ? <IndeterminateCheckBox sx={{ color: indigoDarken4 }} /> : <CheckBoxOutlineBlank />;
  return (
    <VContainer>
      <VSelect
        items={fruits}
        label="Favorite Fruits"
        multiple
        value={selected}
        onChange={setSelected}
        prependItemSlot={<><Box onClick={toggleAll} sx={{ minHeight: 48, px: 2, display: "flex", alignItems: "center", gap: 2, cursor: "pointer" }}>{icon}<Typography>Select All</Typography></Box><Divider sx={{ mt: 1 }} /></>}
        appendItemSlot={<><Divider sx={{ mb: 1 }} /><Box sx={{ minHeight: 72, px: 2, display: "flex", alignItems: "center", gap: 2, color: "rgba(0,0,0,.6)" }}><Box sx={{ width: 40, height: 40, borderRadius: "50%", bgcolor: "#eeeeee", display: "flex", alignItems: "center", justifyContent: "center" }}><Fastfood /></Box><Box>{likesAll ? <Typography>Holy smokes, someone call the fruit police!</Typography> : likesSome ? <><Typography>Fruit Count</Typography><Typography sx={{ fontSize: 14 }}>{selected.length}</Typography></> : <><Typography>How could you not like fruit?</Typography><Typography sx={{ fontSize: 14 }}>Go ahead, make a selection above!</Typography></>}</Box></Box></>}
      />
    </VContainer>
  );
}

function AppAlert({ severity, children }: { severity: "error" | "warning" | "info"; children: ReactNode }) {
  const color = severity === "error" ? "#ff5252" : severity === "warning" ? "#fb8c00" : primary;
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
  { title: "Disabled", description: <>You cannot use disabled <CodePill>v-select</CodePill>.</>, source: "simple/disabled", minHeight: 150, render: () => <VSelect items={basicItems} label="Disabled" disabled /> },
  { title: "Read-only", description: <>You cannot use read-only <CodePill>v-select</CodePill>, but it looks default.</>, source: "simple/readonly", minHeight: 150, render: () => <VSelect items={basicItems} label="Read-only" readonly /> },
  { title: "Light theme", description: <>A standard single select has a multitude of configuration options.</>, source: "simple/light", minHeight: 340, render: () => <LightExample /> },
  { title: "Icons", description: <>Use a custom prepended or appended icon.</>, source: "simple/icons", minHeight: 260, render: () => <IconsExample /> },
  { title: "Multiple", description: <>A multi-select can utilize <CodePill>v-chip</CodePill> as the display for selected items.</>, source: "simple/multiple", minHeight: 310, render: () => <MultipleExample /> },
  { title: "Dense", description: <>You can use <CodePill>dense</CodePill> prop to reduce the field height and lower max height of list items.</>, source: "simple/dense", minHeight: 300, render: () => <VContainer><VGrid><VSelect items={basicItems} label="Standard" dense /><VSelect items={basicItems} label="Filled style" dense filled /><VSelect items={basicItems} label="Outlined style" dense outlined /><VSelect items={basicItems} label="Solo field" dense solo /></VGrid></VContainer> },
  { title: "Customized item text and value", description: <>You can specify the specific properties within your items array correspond to the text and value fields. By default, this is <strong>text</strong> and <strong>value</strong>. In this example we also use the <CodePill>return-object</CodePill> prop which will return the entire object of the selected item on selection.</>, source: "simple/custom-text-and-value", minHeight: 190, render: () => <CustomTextValueExample /> },
  { title: "Custom menu props", description: <>Custom props can be passed directly to <CodePill>v-menu</CodePill> using <CodePill>menuProps</CodePill> prop. In this example menu is force directed to top and shifted to top.</>, source: "intermediate/menu-props", minHeight: 160, render: () => <VSelect items={basicItems} label="Label" menuTop /> },
  { title: "Prepend/Append item slots", description: <>The <CodePill>v-select</CodePill> components can be optionally expanded with prepended and appended items. This is perfect for customized <strong>select-all</strong> functionality.</>, source: "intermediate/slots", minHeight: 250, render: () => <SlotsExample /> },
  { title: "Change selection appearance", description: <>The <CodePill>selection</CodePill> slot can be used to customize the way selected values are shown in the input. This is great when you want something like <CodePill>foo (+20 others)</CodePill> or don't want the selection to occupy multiple lines.</>, source: "intermediate/selection-appearance", minHeight: 170, render: () => <SelectionAppearanceExample /> },
];

const sourceTemplates = {
  usage: "src/demo/examples/selects/usage.vue",
  playground: "src/demo/examples/selects/playground.vue",
  "simple/disabled": "src/demo/examples/selects/simple/disabled.vue",
  "simple/readonly": "src/demo/examples/selects/simple/readonly.vue",
  "simple/light": "src/demo/examples/selects/simple/light.vue",
  "simple/icons": "src/demo/examples/selects/simple/icons.vue",
  "simple/multiple": "src/demo/examples/selects/simple/multiple.vue",
  "simple/dense": "src/demo/examples/selects/simple/dense.vue",
  "simple/custom-text-and-value": "src/demo/examples/selects/simple/custom-text-and-value.vue",
  "intermediate/menu-props": "src/demo/examples/selects/intermediate/menu-props.vue",
  "intermediate/slots": "src/demo/examples/selects/intermediate/slots.vue",
  "intermediate/selection-appearance": "src/demo/examples/selects/intermediate/selection-appearance.vue",
};
