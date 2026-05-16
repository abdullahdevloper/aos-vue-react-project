import { useState, type MouseEvent, type ReactNode } from "react";
import { Box, Card, Checkbox, Collapse, IconButton, Slider, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { Code, GitHub, InvertColors, ViewList } from "@mui/icons-material";
import { mdiBluetooth, mdiChartDonut, mdiEmailOpen, mdiInbox, mdiSend, mdiStar, mdiWifi } from "@mdi/js";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const indigo = "#3f51b5";
const deepPurpleAccent = "#6200ea";
const shadow2 = "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";

type ExampleKey = keyof typeof sourceTemplates;
type Ripple = { id: number; x: number; y: number; size: number };
type ListItemData = { icon: string; text: string };

const usageItems: ListItemData[] = [
  { icon: "mdi-inbox", text: "Inbox" },
  { icon: "mdi-star", text: "Star" },
  { icon: "mdi-send", text: "Send" },
  { icon: "mdi-email-open", text: "Drafts" },
];

const connectivityItems: ListItemData[] = [
  { icon: "mdi-wifi", text: "Wifi" },
  { icon: "mdi-bluetooth", text: "Bluetooth" },
  { icon: "mdi-chart-donut", text: "Data Usage" },
];

export default function ListItemGroupsPage() {
  return (
    <DocPage
      title="ListItemGroups"
      namespace="Components"
      icon={<ViewList />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "List Item Group" },
      ]}
    >
      <DocText>
        The <CodePill>v-list-item-group</CodePill> provides the ability to create a group of selectable <CodePill>v-list-item</CodePill>s. The <CodePill>v-list-item-group</CodePill> component utilizes <a href="/components/item-groups">v-item-group</a> at its core to provide a clean interface for interactive lists.
      </DocText>
      <UsageSection />
      <PlaygroundSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <BaseHeading id="usage">Usage</BaseHeading>
      <VuetifyExampleBlock
        title=""
        source="usage"
        description={<>By default, the <CodePill>v-list-item-group</CodePill> operates similarly to <CodePill>v-item-group</CodePill>. If a <strong>value</strong> is not provided, the group will provide a default based upon its index.</>}
      >
        {() => <UsageExample />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function PlaygroundSection() {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <BaseHeading id="playground">Playground</BaseHeading>
      <VuetifyExampleBlock title="" description="" source="playground">
        {() => <PlaygroundExample />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function ExamplesSection() {
  const examples: Array<{ title: string; description: ReactNode; source: ExampleKey; render: () => ReactNode }> = [
    { title: "De-emphasized selections", description: <>You can easily disable the default highlighting of selected <CodePill>v-list-item</CodePill>s. This creates a lower profile for a user's choices.</>, source: "simple/flat", render: () => <ConnectivityExample flat /> },
    { title: "Select multiple items", description: "You can select multiple items at one time.", source: "simple/multiple", render: () => <ConnectivityExample multiple /> },
    { title: "Mandatory", description: "At least one item must be selected.", source: "simple/mandatory", render: () => <ConnectivityExample mandatory /> },
    { title: "Custom active class", description: "You can set a class which will be added when an item is selected.", source: "simple/active-class", render: () => <ConnectivityExample activeClass /> },
    { title: "Selection controls", description: <>Using the default slot, you can access an items internal state and toggle it. Since the <strong>active</strong> property is a <em>boolean</em>, we use the <strong>true-value</strong> prop on the checkbox to link its state to the <CodePill>v-list-item</CodePill>.</>, source: "intermediate/selection-controls", render: () => <SelectionControlsExample /> },
  ];

  return (
    <Box component="section">
      <BaseHeading id="examples">Examples</BaseHeading>
      {examples.map((example) => (
        <VuetifyExampleBlock key={example.source} title={example.title} description={example.description} source={example.source}>
          {example.render}
        </VuetifyExampleBlock>
      ))}
    </Box>
  );
}

function UsageExample() {
  const [model, setModel] = useState<number | null>(1);
  return (
    <DemoCard maxWidth={500}>
      <VList>
        <VListItemGroup selected={model} onSelect={(index) => setModel(model === index ? null : index)}>
          {usageItems.map((item, index) => (
            <VListItem key={item.text} icon={item.icon} title={item.text} active={model === index} onClick={() => setModel(model === index ? null : index)} />
          ))}
        </VListItemGroup>
      </VList>
    </DemoCard>
  );
}

function PlaygroundExample() {
  const [multiple, setMultiple] = useState(false);
  const [mandatory, setMandatory] = useState(false);
  const [flat, setFlat] = useState(false);
  const [dense, setDense] = useState(false);
  const [count, setCount] = useState(4);
  const [singleModel, setSingleModel] = useState<number | null>(1);
  const [multiModel, setMultiModel] = useState<number[]>([1]);

  const select = (index: number) => {
    if (multiple) {
      setMultiModel((current) => {
        if (current.includes(index)) {
          return mandatory && current.length === 1 ? current : current.filter((item) => item !== index);
        }
        return [...current, index];
      });
      return;
    }
    setSingleModel((current) => current === index ? mandatory ? current : null : index);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", mx: -1.5 }}>
        <VSwitch label="Multiple" checked={multiple} onChange={(value) => { setMultiple(value); if (value && singleModel !== null) setMultiModel([singleModel]); }} />
        <VSwitch label="Mandatory" checked={mandatory} onChange={(value) => { setMandatory(value); if (value && !multiple && singleModel === null) setSingleModel(0); if (value && multiple && multiModel.length === 0) setMultiModel([0]); }} />
        <VSwitch label="Flat" checked={flat} onChange={setFlat} />
        <VSwitch label="Dense" checked={dense} onChange={setDense} />
        <Box sx={{ width: "100%", px: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", minHeight: 56 }}>
            <Typography sx={{ width: 90, color: "rgba(0,0,0,.6)", fontSize: 16 }}>Items count</Typography>
            <Slider value={count} min={0} max={25} onChange={(_, value) => setCount(value as number)} sx={sliderSx} />
          </Box>
        </Box>
      </Box>
      <DemoCard maxWidth={400}>
        <VList flat={flat} dense={dense}>
          <VListItemGroup selected={multiple ? multiModel : singleModel}>
            {Array.from({ length: count }, (_, index) => (
              <VListItem
                key={index}
                icon="mdi-wifi"
                title="Wifi"
                dense={dense}
                flat={flat}
                active={multiple ? multiModel.includes(index) : singleModel === index}
                activeColor={indigo}
                onClick={() => select(index)}
              />
            ))}
          </VListItemGroup>
        </VList>
      </DemoCard>
    </Box>
  );
}

function ConnectivityExample({ flat = false, multiple = false, mandatory = false, activeClass = false }: { flat?: boolean; multiple?: boolean; mandatory?: boolean; activeClass?: boolean }) {
  const [singleModel, setSingleModel] = useState<number | null>(1);
  const [multiModel, setMultiModel] = useState<number[]>([1]);

  const select = (index: number) => {
    if (multiple) {
      setMultiModel((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
      return;
    }
    setSingleModel((current) => current === index ? mandatory ? current : null : index);
  };

  return (
    <DemoCard maxWidth={400}>
      <VList flat={flat}>
        <VListItemGroup selected={multiple ? multiModel : singleModel}>
          {connectivityItems.map((item, index) => (
            <VListItem
              key={item.text}
              icon={item.icon}
              title={item.text}
              active={multiple ? multiModel.includes(index) : singleModel === index}
              flat={flat}
              activeClass={activeClass}
              activeColor={indigo}
              onClick={() => select(index)}
            />
          ))}
        </VListItemGroup>
      </VList>
    </DemoCard>
  );
}

function SelectionControlsExample() {
  const items = ["Dog Photos", "Cat Photos", "", "Potatoes", "Carrots"];
  const [model, setModel] = useState<string[]>(["Carrots"]);
  const toggle = (item: string) => setModel((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);

  return (
    <DemoCard maxWidth={500}>
      <VList shaped>
        {items.map((item, index) => item ? (
          <VListItem
            key={item}
            title={item}
            shaped
            active={model.includes(item)}
            activeColor={deepPurpleAccent}
            checkboxValue={model.includes(item)}
            checkboxColor={deepPurpleAccent}
            onClick={() => toggle(item)}
          />
        ) : <VDivider key={`divider-${index}`} />)}
      </VList>
    </DemoCard>
  );
}

function VList({ children, dense = false, flat = false, shaped = false }: { children: ReactNode; dense?: boolean; flat?: boolean; shaped?: boolean }) {
  return <Box data-dense={dense} data-flat={flat} data-shaped={shaped} sx={{ py: 1, bgcolor: "#fff" }}>{children}</Box>;
}

function VListItemGroup({ children }: { children: ReactNode; selected: number | number[] | null; onSelect?: (index: number) => void }) {
  return <Box>{children}</Box>;
}

function VListItem({ icon, title, active = false, activeColor = indigo, flat = false, dense = false, shaped = false, activeClass = false, checkboxValue, checkboxColor = primary, onClick }: { icon?: string; title: string; active?: boolean; activeColor?: string; flat?: boolean; dense?: boolean; shaped?: boolean; activeClass?: boolean; checkboxValue?: boolean; checkboxColor?: string; onClick: () => void }) {
  const { ripples, triggerRipple } = useVuetifyRipple();
  const handlePointerDown = (event: MouseEvent<HTMLElement>) => triggerRipple(event);
  const activeBg = flat || activeClass ? "transparent" : colorToBg(activeColor);

  return (
    <Box
      component="button"
      type="button"
      onPointerDown={handlePointerDown}
      onClick={onClick}
      sx={{
        width: "100%",
        minHeight: dense ? 40 : 48,
        display: "flex",
        alignItems: "center",
        border: activeClass && active ? "2px dashed orange" : "2px solid transparent",
        bgcolor: active ? activeBg : "transparent",
        color: active ? activeColor : "rgba(0,0,0,.87)",
        borderRadius: shaped ? "0 24px 24px 0" : 0,
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
        textAlign: "left",
        px: 2,
        py: dense ? .25 : 1,
        transition: "background-color .18s cubic-bezier(.4,0,.2,1), color .18s cubic-bezier(.4,0,.2,1)",
        "&:hover": { bgcolor: active ? activeBg : "rgba(0,0,0,.04)" },
      }}
    >
      {icon && <Box sx={{ minWidth: 56, color: active ? activeColor : "rgba(0,0,0,.54)" }}><VIcon icon={icon} /></Box>}
      <Typography sx={{ flex: 1, minWidth: 0, fontSize: 16, lineHeight: "24px", fontWeight: 400 }}>{title}</Typography>
      {checkboxValue !== undefined && (
        <Checkbox
          checked={checkboxValue}
          tabIndex={-1}
          onClick={(event) => {
            event.stopPropagation();
            onClick();
          }}
          sx={{ color: "rgba(0,0,0,.54)", "&.Mui-checked": { color: checkboxColor }, p: 1.5 }}
        />
      )}
      <RippleLayer ripples={ripples} />
    </Box>
  );
}

function VSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <Box onClick={() => onChange(!checked)} sx={{ m: 1, display: "flex", alignItems: "center", minHeight: 42, cursor: "pointer", userSelect: "none" }}>
      <Box sx={{ width: 42, height: 34, position: "relative", mr: 1, display: "flex", alignItems: "center" }}>
        <Box sx={{ width: 34, height: 14, borderRadius: 8, bgcolor: checked ? primary : "rgba(0,0,0,.38)", opacity: checked ? .5 : .38 }} />
        <Box sx={{ position: "absolute", left: checked ? 18 : 0, width: 20, height: 20, borderRadius: "50%", bgcolor: checked ? primary : "#fafafa", boxShadow: "0 2px 4px rgba(0,0,0,.32)", transition: "left 150ms cubic-bezier(.4,0,.2,1)" }} />
      </Box>
      <Typography sx={{ fontSize: 16 }}>{label}</Typography>
    </Box>
  );
}

function DemoCard({ children, maxWidth }: { children: ReactNode; maxWidth: number }) {
  return <Card sx={{ mx: "auto", maxWidth, borderRadius: 1, boxShadow: shadow2, overflow: "hidden", bgcolor: "#fff" }}>{children}</Card>;
}

function VDivider() {
  return <Box sx={{ height: 1, bgcolor: "rgba(0,0,0,.12)" }} />;
}

function VIcon({ icon, size = 24 }: { icon: string; size?: number }) {
  const path = mdiPaths[icon];
  return <Box component="svg" viewBox="0 0 24 24" sx={{ width: size, height: size, display: "block", color: "currentColor" }}><Box component="path" d={path} fill="currentColor" /></Box>;
}

function useVuetifyRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const triggerRipple = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const id = Date.now() + Math.random();
    setRipples((current) => [...current, { id, x, y, size }]);
    window.setTimeout(() => {
      setRipples((current) => current.filter((ripple) => ripple.id !== id));
    }, 560);
  };
  return { ripples, triggerRipple };
}

function RippleLayer({ ripples }: { ripples: Ripple[] }) {
  return (
    <Box aria-hidden="true" sx={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", borderRadius: "inherit" }}>
      {ripples.map((ripple) => (
        <Box
          key={ripple.id}
          sx={{
            position: "absolute",
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            borderRadius: "50%",
            bgcolor: "currentColor",
            opacity: 0,
            transform: "scale(0)",
            animation: "vListItemGroupRipple 560ms cubic-bezier(.25,.8,.5,1)",
            "@keyframes vListItemGroupRipple": {
              "0%": { opacity: .18, transform: "scale(0)" },
              "45%": { opacity: .14, transform: "scale(.55)" },
              "100%": { opacity: 0, transform: "scale(1)" },
            },
          }}
        />
      ))}
    </Box>
  );
}

function BaseHeading({ id, children }: { id: string; children: ReactNode }) {
  return <Typography id={id} variant="h5" sx={{ fontSize: { xs: 20, md: 22 }, lineHeight: 1.45, fontWeight: 400, mb: 2.5 }}>{children}</Typography>;
}

function VuetifyExampleBlock({ title, description, source, children }: { title: string; description: ReactNode; source: ExampleKey; children: () => ReactNode }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card sx={{ mb: 5, bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "hidden" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
        {title && <Typography sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>{title}</Typography>}
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit><Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", overflowX: "auto", p: 2 }}><Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box></Box></Collapse>
      <Box sx={{ bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", p: 2, "& a": { color: primary } }}>
        {description && <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography>}
        <Box data-app="true">{children()}</Box>
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

function colorToBg(color: string) {
  if (color === deepPurpleAccent) return "rgba(98,0,234,.12)";
  if (color === indigo) return "rgba(63,81,181,.12)";
  return "rgba(0,151,167,.12)";
}

const sliderSx = {
  color: primary,
  height: 2,
  "& .MuiSlider-thumb": { width: 20, height: 20, boxShadow: "0 2px 4px rgba(0,0,0,.22)" },
  "& .MuiSlider-track": { height: 2, border: 0 },
  "& .MuiSlider-rail": { height: 2, opacity: 1, bgcolor: "rgba(0,0,0,.26)" },
};

const mdiPaths: Record<string, string> = {
  "mdi-bluetooth": mdiBluetooth,
  "mdi-chart-donut": mdiChartDonut,
  "mdi-email-open": mdiEmailOpen,
  "mdi-inbox": mdiInbox,
  "mdi-send": mdiSend,
  "mdi-star": mdiStar,
  "mdi-wifi": mdiWifi,
};

const sourceTemplates = {
  usage: `src/demo/examples/list-item-groups/usage.vue`,
  playground: `src/demo/examples/list-item-groups/playground.vue`,
  "simple/flat": `src/demo/examples/list-item-groups/simple/flat.vue`,
  "simple/multiple": `src/demo/examples/list-item-groups/simple/multiple.vue`,
  "simple/mandatory": `src/demo/examples/list-item-groups/simple/mandatory.vue`,
  "simple/active-class": `src/demo/examples/list-item-groups/simple/active-class.vue`,
  "intermediate/selection-controls": `src/demo/examples/list-item-groups/intermediate/selection-controls.vue`,
};
