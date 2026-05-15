import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { Box, Card, Collapse, IconButton, Stack, Switch, Toolbar, Tooltip, Typography } from "@mui/material";
import { Add, ChevronLeft, ChevronRight, Code, GitHub, HighlightOff, InvertColors, Remove, ViewCarousel } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const success = "#4caf50";
const purple = "#9c27b0";
const greyLighten1 = "#bdbdbd";
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

export default function SlideGroupsPage() {
  return (
    <DocPage
      title="SlideGroups"
      namespace="Components"
      icon={<ViewCarousel />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Slide Groups" },
      ]}
    >
      <DocText>
        The <CodePill>v-slide-group</CodePill> component is used to display pseudo paginated information. It uses <CodePill>v-item-group</CodePill> at its core and provides a baseline for components such as <CodePill>v-tabs</CodePill> and <CodePill>v-chip-group</CodePill>.
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
      <Typography variant="h5" sx={sectionHeadingSx}>Usage</Typography>
      <Typography sx={docsParagraphSx}>Similar to the <CodePill>v-window</CodePill> component, <CodePill>v-slide-group</CodePill> lets items to take up as much space as needed, allowing the user to move horizontally through the provided information.</Typography>
      <VuetifyExampleBlock title="" description="" source="usage" minHeight={120}>
        {() => <UsageExample />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function UsageExample() {
  const [selected, setSelected] = useState<number[]>([]);
  const toggle = (index: number) => setSelected((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  return (
    <Sheet maxWidth={700}>
      <SlideRail showArrows>
        {Array.from({ length: 25 }, (_, index) => {
          const active = selected.includes(index);
          return <SlideButton key={index} active={active} onClick={() => toggle(index)}>Options {index + 1}</SlideButton>;
        })}
      </SlideRail>
    </Sheet>
  );
}

function PlaygroundSection() {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <Typography variant="h5" sx={sectionHeadingSx}>Playground</Typography>
      <VuetifyExampleBlock title="" description="" source="playground" minHeight={500}>
        {() => <PlaygroundExample />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function PlaygroundExample() {
  const [multiple, setMultiple] = useState(false);
  const [mandatory, setMandatory] = useState(false);
  const [showArrows, setShowArrows] = useState(true);
  const [prevIcon, setPrevIcon] = useState(false);
  const [nextIcon, setNextIcon] = useState(false);
  const [centerActive, setCenterActive] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  useEffect(() => {
    setSelected((current) => {
      if (multiple) return current;
      return current.length ? [current[0]] : mandatory ? [0] : [];
    });
  }, [multiple, mandatory]);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", mb: 2 }}>
        <VSwitch label="Multiple" checked={multiple} onChange={setMultiple} />
        <VSwitch label="Mandatory" checked={mandatory} onChange={setMandatory} />
        <VSwitch label="Show arrows" checked={showArrows} onChange={setShowArrows} />
        <VSwitch label="Custom prev icon" checked={prevIcon} onChange={setPrevIcon} />
        <VSwitch label="Custom next icon" checked={nextIcon} onChange={setNextIcon} />
        <VSwitch label="Center active item" checked={centerActive} onChange={setCenterActive} />
      </Box>
      <CardSlideGroup selected={selected} setSelected={setSelected} multiple={multiple} mandatory={mandatory} showArrows={showArrows} prevIcon={prevIcon ? <Remove /> : undefined} nextIcon={nextIcon ? <Add /> : undefined} centerActive={centerActive} />
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
          <VuetifyExampleBlock key={example.source} title={example.title} description={example.description} source={example.source} minHeight={example.minHeight}>{example.render}</VuetifyExampleBlock>
        ))}
      </Stack>
    </Box>
  );
}

function CardSlideGroup({ selected, setSelected, multiple = false, mandatory = false, activeColor = primary, showArrows = true, prevIcon, nextIcon, centerActive = false }: { selected: number[]; setSelected: (next: number[] | ((current: number[]) => number[])) => void; multiple?: boolean; mandatory?: boolean; activeColor?: string; showArrows?: boolean; prevIcon?: ReactNode; nextIcon?: ReactNode; centerActive?: boolean }) {
  const toggle = (index: number) => {
    setSelected((current) => {
      const active = current.includes(index);
      if (multiple) return active ? current.filter((item) => item !== index) : [...current, index];
      if (active) return mandatory ? current : [];
      return [index];
    });
  };
  return (
    <Sheet maxWidth={800} elevation>
      <SlideRail showArrows={showArrows} prevIcon={prevIcon} nextIcon={nextIcon} centerIndex={centerActive ? selected[0] : undefined} padding={16}>
        {Array.from({ length: 15 }, (_, index) => {
          const active = selected.includes(index);
          return <SlideCard key={index} index={index} active={active} activeColor={activeColor} onClick={() => toggle(index)} />;
        })}
      </SlideRail>
    </Sheet>
  );
}

function SlideCard({ index, active, activeColor, onClick }: { index: number; active: boolean; activeColor: string; onClick: () => void }) {
  return (
    <RippleBox data-slide-index={index} onClick={onClick} sx={{ flex: "0 0 auto", width: 100, height: 200, m: "16px", bgcolor: active ? activeColor : greyLighten1, cursor: "pointer", transition: "background-color 150ms cubic-bezier(.4,0,.2,1)" }}>
      <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Collapse in={active} timeout={160}>
          <HighlightOff sx={{ color: "#fff", fontSize: 48 }} />
        </Collapse>
      </Box>
    </RippleBox>
  );
}

function CarouselExample() {
  const [selected, setSelected] = useState<number[]>([]);
  return (
    <Sheet maxWidth={800} elevation>
      <SlideRail showArrows padding={16}>
        {Array.from({ length: 15 }, (_, index) => <SlideCard key={index} index={index} active={selected.includes(index)} activeColor={primary} onClick={() => setSelected(selected.includes(index) ? [] : [index])} />)}
      </SlideRail>
      <Collapse in={selected.length > 0} timeout={180}>
        <Box sx={{ bgcolor: "#f5f5f5", height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography sx={{ fontSize: 20, fontWeight: 500 }}>Selected {selected[0]}</Typography>
        </Box>
      </Collapse>
    </Sheet>
  );
}

function Sheet({ children, maxWidth, elevation = false }: { children: ReactNode; maxWidth: number; elevation?: boolean }) {
  return <Box sx={{ mx: "auto", maxWidth, bgcolor: "#fff", boxShadow: elevation ? "0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)" : "none" }}>{children}</Box>;
}

function SlideRail({ children, showArrows = false, prevIcon, nextIcon, centerIndex, padding = 0 }: { children: ReactNode; showArrows?: boolean; prevIcon?: ReactNode; nextIcon?: ReactNode; centerIndex?: number; padding?: number }) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const scrollBy = (delta: number) => railRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  useEffect(() => {
    if (centerIndex === undefined || !railRef.current) return;
    const item = railRef.current.querySelector(`[data-slide-index="${centerIndex}"]`) as HTMLElement | null;
    if (!item) return;
    const left = item.offsetLeft - railRef.current.clientWidth / 2 + item.clientWidth / 2;
    railRef.current.scrollTo({ left, behavior: "smooth" });
  }, [centerIndex]);
  return (
    <Box sx={{ display: "flex", alignItems: "center", minHeight: 52 }}>
      {showArrows && <IconButton onClick={() => scrollBy(-240)} sx={{ color: "rgba(0,0,0,.54)", flex: "0 0 auto" }}>{prevIcon || <ChevronLeft />}</IconButton>}
      <Box ref={railRef} sx={{ display: "flex", alignItems: "center", overflowX: "auto", overflowY: "hidden", scrollBehavior: "smooth", p: `${padding}px`, flex: 1, scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>{children}</Box>
      {showArrows && <IconButton onClick={() => scrollBy(240)} sx={{ color: "rgba(0,0,0,.54)", flex: "0 0 auto" }}>{nextIcon || <ChevronRight />}</IconButton>}
    </Box>
  );
}

function SlideButton({ children, active, onClick }: { children: ReactNode; active: boolean; onClick: () => void }) {
  return (
    <RippleBox onClick={onClick} sx={{ flex: "0 0 auto", mx: "8px", my: "8px", px: "16px", minWidth: 64, height: 36, borderRadius: 18, bgcolor: active ? purple : "transparent", color: active ? "#fff" : "rgba(0,0,0,.87)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14, textTransform: "uppercase", cursor: "pointer", transition: "background-color 150ms ease, color 150ms ease" }}>{children}</RippleBox>
  );
}

function VSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <Box onClick={() => onChange(!checked)} sx={{ display: "inline-flex", alignItems: "center", m: .5, cursor: "pointer" }}><Switch checked={checked} sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: primary }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: primary } }} /><Typography sx={{ fontSize: 16 }}>{label}</Typography></Box>;
}

function RippleBox({ children, onClick, sx = {}, ...rest }: { children: ReactNode; onClick?: () => void; sx?: object; [key: string]: unknown }) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.8;
    const ripple = { id: Date.now(), x: event.clientX - rect.left - size / 2, y: event.clientY - rect.top - size / 2, size };
    setRipples((items) => [...items, ripple]);
    window.setTimeout(() => setRipples((items) => items.filter((item) => item.id !== ripple.id)), 520);
    onClick?.();
  };
  return (
    <Box {...rest} onClick={handleClick} sx={{ position: "relative", overflow: "hidden", ...sx }}>
      {children}
      {ripples.map((ripple) => <Box key={ripple.id} sx={{ position: "absolute", left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size, borderRadius: "50%", bgcolor: "rgba(255,255,255,.28)", transform: "scale(0)", animation: "slideGroupRipple 520ms cubic-bezier(.4,0,.2,1)", pointerEvents: "none", "@keyframes slideGroupRipple": { to: { transform: "scale(1)", opacity: 0 } } }} />)}
    </Box>
  );
}

function VuetifyExampleBlock({ title, description, source, children, minHeight }: { title: string; description: ReactNode; source: ExampleKey; children: () => ReactNode; minHeight: number }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return <Card sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}><Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2 }}><Typography sx={{ fontSize: 20 }}>{title}</Typography><Box sx={{ flexGrow: 1 }} /><Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((v) => !v)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip><Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip><Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((v) => !v)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip></Toolbar><Collapse in={sourceOpen} timeout={180} unmountOnExit><Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", maxHeight: { xs: "none", sm: "calc(100vh - 275px)" }, overflowY: "auto", p: 2 }}><Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box></Box></Collapse><Box sx={{ px: 2, py: 2, minHeight, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit" }}>{description && <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography>}{children()}</Box></Card>;
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: .55, py: .18, borderRadius: .75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: .5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

const examples: Example[] = [
  { title: "Custom icons", description: <>You can add your custom pagination icons instead of arrows</>, source: "simple/custom-icons", minHeight: 360, render: () => <CustomIconsExample /> },
  { title: "Active class", description: <>Active class can be customized</>, source: "simple/active-class", minHeight: 360, render: () => <ActiveClassExample /> },
  { title: "Multiple", description: <>You can select multiple items</>, source: "simple/multiple", minHeight: 360, render: () => <MultipleExample /> },
  { title: "Mandatory", description: <>At least 1 item must be selected</>, source: "simple/mandatory", minHeight: 360, render: () => <MandatoryExample /> },
  { title: "Pseudo Carousel", description: <>Customize the slide group to creatively display information on sheets. Using the selection, we can display auxillary information easily for the user.</>, source: "simple/carousel", minHeight: 560, render: () => <CarouselExample /> },
  { title: "Centered active item", description: <>Active item is always centered</>, source: "simple/center-active", minHeight: 360, render: () => <CenterActiveExample /> },
];

function ActiveClassExample() {
  const [selected, setSelected] = useState<number[]>([]);
  return <CardSlideGroup selected={selected} setSelected={setSelected} activeColor={success} />;
}

function CustomIconsExample() {
  const [selected, setSelected] = useState<number[]>([]);
  return <CardSlideGroup selected={selected} setSelected={setSelected} prevIcon={<Remove />} nextIcon={<Add />} />;
}

function MultipleExample() {
  const [selected, setSelected] = useState<number[]>([]);
  return <CardSlideGroup selected={selected} setSelected={setSelected} multiple />;
}

function MandatoryExample() {
  const [selected, setSelected] = useState<number[]>([0]);
  return <CardSlideGroup selected={selected} setSelected={setSelected} mandatory />;
}

function CenterActiveExample() {
  const [selected, setSelected] = useState<number[]>([]);
  return <CardSlideGroup selected={selected} setSelected={setSelected} centerActive />;
}

const sourceTemplates = {
  usage: "src/demo/examples/slide-groups/usage.vue",
  playground: "src/demo/examples/slide-groups/playground.vue",
  "simple/custom-icons": "src/demo/examples/slide-groups/simple/custom-icons.vue",
  "simple/active-class": "src/demo/examples/slide-groups/simple/active-class.vue",
  "simple/multiple": "src/demo/examples/slide-groups/simple/multiple.vue",
  "simple/mandatory": "src/demo/examples/slide-groups/simple/mandatory.vue",
  "simple/carousel": "src/demo/examples/slide-groups/simple/carousel.vue",
  "simple/center-active": "src/demo/examples/slide-groups/simple/center-active.vue",
};
