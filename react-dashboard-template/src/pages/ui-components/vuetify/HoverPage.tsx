import { useEffect, useRef, useState, type ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material/styles";
import { Box, Button, Card, Collapse, Grid, IconButton, Slider, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { Code, FastForward, FastRewind, GitHub, InvertColors, PlayArrow, TouchApp } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const sectionHeadingSx = { fontSize: { xs: 20, md: 22 }, lineHeight: 1.45, fontWeight: 400, mb: 2.5 };
const docsParagraphSx = { fontSize: { xs: 16, md: 20 }, lineHeight: 1.55, fontWeight: 300, mb: 3, color: "text.secondary" };
type ExampleKey = keyof typeof sourceTemplates;

export default function HoverPage() {
  return (
    <DocPage
      title="Hover"
      namespace="Components"
      icon={<TouchApp />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Hover" },
      ]}
    >
      <DocText>
        The <CodePill>v-hover</CodePill> component provides a clean interface for handling hover states for any component.
      </DocText>
      <UsageSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  const [value, setValue] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [openDelay, setOpenDelay] = useState(0);
  const [closeDelay, setCloseDelay] = useState(0);

  return (
    <Box component="section" sx={{ mb: 5 }}>
      <Typography variant="h5" sx={sectionHeadingSx}>Usage</Typography>
      <Typography sx={docsParagraphSx}>
        The <CodePill>v-hover</CodePill> component is a wrapper that should contain only one child element, and can trigger an event when hovered over. In order for <CodePill>v-hover</CodePill> to work properly, either the <CodePill>value</CodePill> prop should be set to <CodePill>true</CodePill> or the wrapped element should contain <CodePill>slot-scope=&quot;{"{ wrapper }"}&quot;</CodePill>.
      </Typography>
      <VuetifyExampleBlock title="" description="" source="usage" minHeight={430}>
        {() => (
          <PlaygroundShell>
            <Box sx={{ flex: 1, minWidth: 0, minHeight: 332, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <HoverBox value={value} disabled={disabled} openDelay={openDelay} closeDelay={closeDelay}>
                {(hover) => <SimpleHoverCard hover={hover} height={300} maxWidth={350}>Hover over me!</SimpleHoverCard>}
              </HoverBox>
            </Box>
            <OptionsPanel>
              <VSwitch label="Value" checked={value} onChange={setValue} />
              <VSwitch label="Disabled" checked={disabled} onChange={setDisabled} />
              <OptionSlider label="Open delay" value={openDelay} onChange={setOpenDelay} />
              <OptionSlider label="Close delay" value={closeDelay} onChange={setCloseDelay} />
            </OptionsPanel>
          </PlaygroundShell>
        )}
      </VuetifyExampleBlock>
    </Box>
  );
}

function ExamplesSection() {
  return (
    <Box component="section">
      <Typography variant="h5" sx={sectionHeadingSx}>Examples</Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>Below is a collection of simple to complex examples.</Typography>
      <Stack spacing={5}>
        <VuetifyExampleBlock title="Disabled" description={<>The <CodePill>disabled</CodePill> prop disables the hover functionality.</>} source="simple/disabled" minHeight={430}>
          {() => <DisabledExample />}
        </VuetifyExampleBlock>
        <VuetifyExampleBlock title="Open/Close Delay" description={<>Delay <CodePill>v-hover</CodePill> events by using <CodePill>open-delay</CodePill> and <CodePill>close-delay</CodePill> props in combination or separately.</>} source="simple/open-and-close-delay" minHeight={430}>
          {() => <OpenCloseDelayExample />}
        </VuetifyExampleBlock>
        <VuetifyExampleBlock title="Hover list" description={<><CodePill>v-hover</CodePill> can be used in combination with <CodePill>v-for</CodePill> to make a single item stand out when the user interacts with the list.</>} source="complex/hover-list" minHeight={400}>
          {() => <HoverListExample />}
        </VuetifyExampleBlock>
        <VuetifyExampleBlock title="Transitions" description="Create highly customized components that respond to user interaction." source="complex/transition" minHeight={560}>
          {() => <TransitionExample />}
        </VuetifyExampleBlock>
      </Stack>
    </Box>
  );
}

function DisabledExample() {
  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item xs={12}>
        <HoverBox disabled>
          {(hover) => <SimpleHoverCard hover={hover} height={350} maxWidth={350}>Hover over me!</SimpleHoverCard>}
        </HoverBox>
      </Grid>
    </Grid>
  );
}

function OpenCloseDelayExample() {
  return (
    <Grid container>
      <Grid item xs={12} sm={6} sx={{ px: 1.5, py: 1 }}>
        <HoverBox openDelay={200}>
          {(hover) => <SimpleHoverCard hover={hover} height={350} maxWidth={350} activeElevation={16}><Box sx={{ mt: 6, fontWeight: 500, fontSize: 16 }}>Open Delay (Mouse enter)</Box></SimpleHoverCard>}
        </HoverBox>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ px: 1.5, py: 1 }}>
        <HoverBox closeDelay={200}>
          {(hover) => <SimpleHoverCard hover={hover} height={350} maxWidth={350} activeElevation={16}><Box sx={{ mt: 6, fontWeight: 500, fontSize: 16 }}>Close Delay (Mouse leave)</Box></SimpleHoverCard>}
        </HoverBox>
      </Grid>
    </Grid>
  );
}

const hoverItems = [
  {
    title: "New Releases",
    text: "It's New Release Friday",
    subtext: "Newly released songs. Updated daily.",
    img: "http://lorempixel.com/output/nightlife-q-c-640-480-5.jpg",
  },
  {
    title: "Rock",
    text: "Greatest Rock Hits",
    subtext: "Lose yourself in rock tunes.",
    img: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
  },
  {
    title: "Mellow Moods",
    text: "Ambient Bass",
    subtext: "Chill beats to mellow you out.",
    img: "http://lorempixel.com/output/abstract-q-c-640-480-6.jpg",
  },
];

function HoverListExample() {
  return (
    <Box sx={{ p: 2, textAlign: "center" }}>
      <Grid container alignItems="center" justifyContent="center">
        {hoverItems.map((item) => (
          <Grid item xs={12} md={4} key={item.title} sx={{ p: 1.5 }}>
            <HoverBox>
              {(hover) => (
                <Card sx={{ borderRadius: 1, overflow: "hidden", opacity: hover ? 1 : .6, transition: "opacity .4s ease-in-out, box-shadow .18s cubic-bezier(.4,0,.2,1)", boxShadow: elevationShadow(hover ? 12 : 2) }}>
                  <Box sx={{ height: 225, backgroundImage: `linear-gradient(rgba(0,0,0,.18), rgba(0,0,0,.24)), url("${item.img}")`, backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }}>
                    <Box sx={{ height: "100%", p: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <Typography sx={{ mt: 2, fontSize: 20, fontWeight: 400, textAlign: "left" }}>{item.title}</Typography>
                      <Box>
                        <Typography sx={{ m: 0, fontSize: 16, fontWeight: 700, fontStyle: "italic", textAlign: "left" }}>{item.text}</Typography>
                        <Typography sx={{ fontSize: 12, fontWeight: 500, fontStyle: "italic", textAlign: "left" }}>{item.subtext}</Typography>
                      </Box>
                      <Stack direction="row" justifyContent="center">
                        {[<FastRewind key="rewind" />, <PlayArrow key="play" />, <FastForward key="forward" />].map((icon, index) => (
                          <IconButton key={index} sx={{ color: hover ? "#fff" : "transparent", transition: "color .18s ease", bgcolor: "transparent", "&:hover": { bgcolor: "rgba(255,255,255,.08)" } }}>{icon}</IconButton>
                        ))}
                      </Stack>
                    </Box>
                  </Box>
                </Card>
              )}
            </HoverBox>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function TransitionExample() {
  return (
    <HoverBox sx={{ maxWidth: 600, mx: "auto" }}>
      {(hover) => (
        <Card sx={{ width: "100%", bgcolor: "#f5f5f5", borderRadius: 1, overflow: "hidden", boxShadow: elevationShadow(2) }}>
          <Box sx={{ position: "relative", aspectRatio: "16 / 9", backgroundImage: "url(https://cdn.vuetifyjs.com/images/cards/kitchen.png)", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }}>
            <Box sx={{ position: "absolute", left: 0, right: 0, bottom: 0, height: hover ? "100%" : 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#ef6c00", color: "#fff", fontSize: 60, fontWeight: 300, opacity: hover ? .5 : 0, transition: "height 300ms cubic-bezier(.25,.8,.5,1), opacity 300ms cubic-bezier(.25,.8,.5,1)" }}>$14.99</Box>
          </Box>
          <Box sx={{ position: "relative", pt: 3, px: 2, pb: 2 }}>
            <IconButton sx={{ position: "absolute", top: -28, right: 16, width: 56, height: 56, bgcolor: "#ff9800", color: "#fff", boxShadow: elevationShadow(6), "&:hover": { bgcolor: "#fb8c00" } }}><Box component="span" className="material-icons" sx={{ fontSize: 24 }}>shopping_cart</Box></IconButton>
            <Typography sx={{ fontSize: 20, fontWeight: 300, color: "#9e9e9e", mb: 1 }}>For the perfect meal</Typography>
            <Typography component="h3" sx={{ fontSize: 34, fontWeight: 300, color: "#ff9800", mb: 1 }}>QW cooking utensils</Typography>
            <Typography sx={{ fontSize: 20, fontWeight: 300, color: "rgba(0,0,0,.87)", mb: 1 }}>Our Vintage kitchen utensils delight any chef.<br />Made of bamboo by hand</Typography>
          </Box>
        </Card>
      )}
    </HoverBox>
  );
}

function SimpleHoverCard({ hover, children, height, maxWidth, activeElevation = 12 }: { hover: boolean; children: ReactNode; height: number; maxWidth: number; activeElevation?: number }) {
  return (
    <Card sx={{ mx: "auto", height, maxWidth, display: "flex", alignItems: "flex-start", justifyContent: "center", width: "100%", borderRadius: 1, boxShadow: elevationShadow(hover ? activeElevation : 2), transition: "box-shadow .18s cubic-bezier(.4,0,.2,1)" }}>
      <Typography component="div" sx={{ my: 2, textAlign: "center", fontSize: 20, fontWeight: 400, width: "100%" }}>{children}</Typography>
    </Card>
  );
}

function HoverBox({ children, value = false, disabled = false, openDelay = 0, closeDelay = 0, sx }: { children: (hover: boolean) => ReactNode; value?: boolean; disabled?: boolean; openDelay?: number; closeDelay?: number; sx?: SxProps<Theme> }) {
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);
  const clear = () => window.clearTimeout(timerRef.current);
  const setDelayed = (next: boolean) => {
    clear();
    if (disabled) {
      setHovered(false);
      return;
    }
    const delay = next ? openDelay : closeDelay;
    timerRef.current = window.setTimeout(() => setHovered(next), delay);
  };

  useEffect(() => () => clear(), []);
  useEffect(() => {
    if (disabled) setHovered(false);
  }, [disabled]);

  return (
    <Box onMouseEnter={() => setDelayed(true)} onMouseLeave={() => setDelayed(false)} sx={sx}>
      {children(value || (!disabled && hovered))}
    </Box>
  );
}

function PlaygroundShell({ children }: { children: ReactNode }) {
  return <Box sx={{ display: "flex", gap: 3, alignItems: "stretch", flexDirection: { xs: "column", md: "row" } }}>{children}</Box>;
}

function OptionsPanel({ children }: { children: ReactNode }) {
  return <Box sx={{ width: { xs: "100%", md: 260 }, flex: "0 0 auto", borderLeft: { md: "1px solid rgba(0,0,0,.08)" }, pl: { md: 3 }, pt: .5 }}>{children}</Box>;
}

function OptionSlider({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 1 }}>{label}</Typography>
      <Slider value={value} min={0} max={1000} step={1} onChange={(_, next) => onChange(Array.isArray(next) ? next[0] : next)} sx={{ color: primary, height: 2, "& .MuiSlider-thumb": { width: 20, height: 20 }, "& .MuiSlider-rail": { opacity: .26 } }} />
      <Typography sx={{ fontSize: 12, color: "text.secondary", textAlign: "right" }}>{value}</Typography>
    </Box>
  );
}

function VSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <Box onClick={() => onChange(!checked)} sx={{ display: "flex", alignItems: "center", minHeight: 42, cursor: "pointer", userSelect: "none" }}><SwitchKnob checked={checked} /><Typography sx={{ fontSize: 16 }}>{label}</Typography></Box>;
}

function SwitchKnob({ checked }: { checked: boolean }) {
  return <Box sx={{ width: 42, height: 34, position: "relative", mr: 1, display: "flex", alignItems: "center" }}><Box sx={{ width: 34, height: 14, borderRadius: 8, bgcolor: checked ? primary : "rgba(0,0,0,.38)", opacity: checked ? .5 : .38 }} /><Box sx={{ position: "absolute", left: checked ? 18 : 0, width: 20, height: 20, borderRadius: "50%", bgcolor: checked ? primary : "#fafafa", boxShadow: "0 2px 4px rgba(0,0,0,.32)", transition: "left 150ms ease" }} /></Box>;
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

function elevationShadow(level: number) {
  const shadows: Record<number, string> = {
    2: "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)",
    12: "0 7px 8px -4px rgba(0,0,0,.2), 0 12px 17px 2px rgba(0,0,0,.14), 0 5px 22px 4px rgba(0,0,0,.12)",
    16: "0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12)",
  };
  return shadows[level] ?? shadows[2];
}

const sourceTemplates = {
  usage: "src/demo/usages/hover.vue",
  "simple/disabled": "src/demo/examples/hover/simple/disabled.vue",
  "simple/open-and-close-delay": "src/demo/examples/hover/simple/open-and-close-delay.vue",
  "complex/hover-list": "src/demo/examples/hover/complex/hover-list.vue",
  "complex/transition": "src/demo/examples/hover/complex/transition.vue",
};
