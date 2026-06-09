import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import {
  Avatar,
  Box,
  Card,
  Collapse,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Add,
  ChevronLeft,
  ChevronRight,
  Code,
  GitHub,
  InvertColors,
  Remove,
  ViewCarousel,
} from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };
const carouselImages = [
  "/static/doc-images/carousel/squirrel.jpg",
  "/static/doc-images/carousel/sky.jpg",
  "/static/doc-images/carousel/bird.jpg",
  "/static/doc-images/carousel/planet.jpg",
];

interface CarouselExample {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  minHeight: number;
  render: (inverted: boolean) => ReactNode;
}

export default function CarouselsPage() {
  return (
    <DocPage
      title="Carousels"
      namespace="Components"
      icon={<ViewCarousel />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Carousels" },
      ]}
    >
      <DocText>
        The <CodePill>v-carousel</CodePill> component is used to display large numbers of visual content on a rotating timer.
      </DocText>
      <Typography variant="h5" sx={{ fontSize: { xs: 24, md: 26 }, fontWeight: 500, mb: 1.2 }}>
        Sub-components
      </Typography>
      <Typography color="text.secondary" sx={{ ...docsParagraphSx, mb: 4 }}>
        <CodePill>v-carousel-item</CodePill>: The image container used by <CodePill>v-carousel</CodePill>. Extends <CodePill>v-window-item</CodePill>, is routable, and uses <CodePill>v-img</CodePill> in its default slot.
      </Typography>
      <UsageSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  const [showArrows, setShowArrows] = useState(true);
  const [hideDelimiters, setHideDelimiters] = useState(false);
  const [cycle, setCycle] = useState(false);
  const [model, setModel] = useState(0);
  const [inverted, setInverted] = useState(false);

  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Usage
      </Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>
        The <CodePill>v-carousel</CodePill> component expands upon <CodePill>v-window</CodePill> by providing additional features targeted at displaying images.
      </Typography>
      <Card variant="outlined" sx={{ bgcolor: "background.default", borderColor: "rgba(111,125,133,.18)", boxShadow: "none", overflow: "hidden", mb: 6 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 3fr) minmax(260px, 1fr)" } }}>
          <Box sx={{ minHeight: 520, p: { xs: 3, md: 4 }, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "#fff" : "inherit" }}>
            <ModelControls model={model} setModel={setModel} total={5} />
            <VCarousel
              value={model}
              onChange={setModel}
              height={500}
              showArrows={showArrows}
              hideDelimiters={hideDelimiters}
              cycle={cycle}
              slides={usageSlides}
            />
          </Box>
          <Box sx={{ borderLeft: { lg: "1px solid rgba(111,125,133,.14)" } }}>
            <Toolbar variant="dense" sx={{ bgcolor: "rgba(111,125,133,.10)", minHeight: 54, px: 2.25 }}>
              <Typography sx={{ fontSize: 20, fontWeight: 400 }}>Options</Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Tooltip title="Invert playground colors">
                <IconButton size="small" aria-label="Invert playground colors" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}>
                  <InvertColors fontSize="small" />
                </IconButton>
              </Tooltip>
            </Toolbar>
            <Stack spacing={1.25} sx={{ p: 2.25 }}>
              <OptionSwitch label="show-arrows" checked={showArrows} onChange={setShowArrows} />
              <OptionSwitch label="hide-delimiters" checked={hideDelimiters} onChange={setHideDelimiters} />
              <OptionSwitch label="cycle" checked={cycle} onChange={setCycle} />
            </Stack>
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
        {carouselExamples.map((example) => (
          <VuetifyExampleBlock key={example.title} title={example.title} description={example.description} source={example.source} minHeight={example.minHeight}>
            {(inverted) => example.render(inverted)}
          </VuetifyExampleBlock>
        ))}
      </Stack>
    </Box>
  );
}

function VuetifyExampleBlock({
  title,
  description,
  source,
  children,
  minHeight,
}: {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  children: (inverted: boolean) => ReactNode;
  minHeight: number;
}) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);

  return (
    <Card sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "hidden" }}>
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
      <Box sx={{ px: { xs: 3, md: 4 }, py: { xs: 3.5, md: 4.25 }, minHeight, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", transition: "background-color 180ms ease, color 180ms ease" }}>
        <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: 16.5, fontWeight: 300, lineHeight: 1.7, mb: 3 }}>{description}</Typography>
        {children(inverted)}
      </Box>
    </Card>
  );
}

function VCarousel({
  slides,
  value,
  onChange,
  height = 500,
  showArrows = true,
  hideDelimiters = false,
  cycle = false,
  showArrowsOnHover = false,
  delimiterIcon = "dot",
  continuous = true,
  transition = "slide",
}: {
  slides: ReactNode[];
  value: number;
  onChange: (value: number) => void;
  height?: number;
  showArrows?: boolean;
  hideDelimiters?: boolean;
  cycle?: boolean;
  showArrowsOnHover?: boolean;
  delimiterIcon?: "dot" | "minus";
  continuous?: boolean;
  transition?: "slide" | "fade";
}) {
  const [hovered, setHovered] = useState(false);
  const startX = useRef<number | null>(null);
  const total = slides.length;
  const safeValue = ((value % total) + total) % total;
  const canPrev = continuous || safeValue > 0;
  const canNext = continuous || safeValue < total - 1;

  const move = (delta: number) => {
    const next = safeValue + delta;
    if (!continuous && (next < 0 || next >= total)) return;
    onChange(((next % total) + total) % total);
  };

  useEffect(() => {
    if (!cycle) return;
    const interval = window.setInterval(() => move(1), 6000);
    return () => window.clearInterval(interval);
  }, [cycle, safeValue]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    startX.current = event.clientX;
  };
  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const diff = event.clientX - startX.current;
    startX.current = null;
    if (Math.abs(diff) < 45) return;
    move(diff < 0 ? 1 : -1);
  };

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      sx={{ height, position: "relative", overflow: "hidden", bgcolor: "#000", userSelect: "none", boxShadow: "0 2px 4px rgba(0,0,0,.18)" }}
    >
      <Box sx={{ height: "100%", display: "flex", transform: transition === "slide" ? `translateX(-${safeValue * 100}%)` : "none", transition: transition === "slide" ? "transform 360ms cubic-bezier(.25,.8,.5,1)" : "none" }}>
        {slides.map((slide, index) => (
          <Box key={index} sx={{ minWidth: "100%", height: "100%", opacity: transition === "fade" ? (safeValue === index ? 1 : 0) : 1, position: transition === "fade" ? "absolute" : "relative", inset: transition === "fade" ? 0 : undefined, transition: "opacity 360ms cubic-bezier(.25,.8,.5,1)" }}>
            {slide}
          </Box>
        ))}
      </Box>
      {showArrows && (!showArrowsOnHover || hovered) && (
        <>
          <CarouselArrow side="left" disabled={!canPrev} onClick={() => move(-1)} />
          <CarouselArrow side="right" disabled={!canNext} onClick={() => move(1)} />
        </>
      )}
      {!hideDelimiters && (
        <Box sx={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 50, display: "flex", alignItems: "center", justifyContent: "center", gap: 1, bgcolor: "rgba(0,0,0,.32)" }}>
          {slides.map((_, index) => (
            <IconButton key={index} size="small" aria-label={`Go to slide ${index + 1}`} onClick={() => onChange(index)} sx={{ width: 28, height: 28, color: "#fff", opacity: safeValue === index ? 1 : 0.55 }}>
              {delimiterIcon === "minus" ? <Remove sx={{ fontSize: 22 }} /> : <Box sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: "currentColor" }} />}
            </IconButton>
          ))}
        </Box>
      )}
    </Box>
  );
}

function CarouselArrow({ side, disabled, onClick }: { side: "left" | "right"; disabled: boolean; onClick: () => void }) {
  return (
    <IconButton
      disabled={disabled}
      onClick={onClick}
      sx={{ position: "absolute", top: "50%", transform: "translateY(-50%)", [side]: 16, width: 44, height: 44, bgcolor: "rgba(0,0,0,.34)", color: "#fff", "&:hover": { bgcolor: "rgba(0,0,0,.54)" }, "&.Mui-disabled": { color: "rgba(255,255,255,.28)" } }}
    >
      {side === "left" ? <ChevronLeft /> : <ChevronRight />}
    </IconButton>
  );
}

function ColorSlide({ color, text }: { color: string; text: string }) {
  return (
    <Box sx={{ height: "100%", bgcolor: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Typography sx={{ fontSize: { xs: 42, md: 60 }, fontWeight: 400 }}>{text}</Typography>
    </Box>
  );
}

function ImageSlide({ src }: { src: string }) {
  return <Box sx={{ height: "100%", backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center" }} />;
}

function ModelControls({ model, setModel, total }: { model: number; setModel: (value: number) => void; total: number }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mb: 2 }}>
      <IconButton onClick={() => setModel(((model - 1) % total + total) % total)}><Remove /></IconButton>
      <Typography sx={{ minWidth: 24, textAlign: "center" }}>{model}</Typography>
      <IconButton onClick={() => setModel((model + 1) % total)}><Add /></IconButton>
    </Stack>
  );
}

function CycleExample() {
  const [model, setModel] = useState(0);
  return <VCarousel value={model} onChange={setModel} height={400} cycle showArrowsOnHover hideDelimiters={false} slides={cycleSlides} />;
}

function ImageCarouselExample({ showArrows = true, hideDelimiters = false, transition = "slide" as "slide" | "fade" }) {
  const [model, setModel] = useState(0);
  return <VCarousel value={model} onChange={setModel} showArrows={showArrows} hideDelimiters={hideDelimiters} transition={transition} slides={carouselImages.map((src) => <ImageSlide src={src} />)} />;
}

function CustomIconsExample() {
  const [model, setModel] = useState(0);
  const [cycle, setCycle] = useState(false);
  return (
    <Card sx={{ maxWidth: 444, mx: "auto", boxShadow: vueElevation24, borderRadius: 0.5, overflow: "hidden" }}>
      <Box sx={{ height: 24, bgcolor: "rgba(0,0,0,.12)" }} />
      <VCarousel value={model} onChange={setModel} height={300} showArrows={false} hideDelimiters={false} delimiterIcon="minus" continuous={false} cycle={cycle} slides={customIconSlides} />
      <Box sx={{ minHeight: 72, display: "flex", alignItems: "center", px: 2, bgcolor: "#fff" }}>
        <Avatar src="https://cdn.vuetifyjs.com/images/john.png" sx={{ width: 40, height: 40, mr: 2 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography sx={{ fontSize: 16 }}>John Leider</Typography>
          <Typography sx={{ fontSize: 14, color: "text.secondary" }}>Author</Typography>
        </Box>
        <FormControlLabel control={<Switch checked={cycle} onChange={(event) => setCycle(event.target.checked)} sx={vuseSwitchSx} />} label="Cycle Slides" labelPlacement="start" sx={{ m: 0, ".MuiFormControlLabel-label": { fontSize: 14 } }} />
      </Box>
    </Card>
  );
}

function ModelExample() {
  const [model, setModel] = useState(0);
  return (
    <Box>
      <ModelControls model={model} setModel={setModel} total={5} />
      <VCarousel value={model} onChange={setModel} slides={usageSlides} />
    </Box>
  );
}

function OptionSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <FormControlLabel control={<Switch checked={checked} onChange={(event) => onChange(event.target.checked)} sx={vuseSwitchSx} />} label={label} sx={{ m: 0, ".MuiFormControlLabel-label": { fontSize: 14 } }} />;
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ mx: 0.25, px: 0.6, py: 0.2, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "85%" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return {
    width: 32,
    height: 32,
    ml: 0.75,
    color: active ? "#0097a7" : "text.secondary",
    bgcolor: "background.paper",
    boxShadow: active ? neuInset : "-3px -3px 4px rgba(255,255,255,.72), 3px 3px 5px rgba(174,174,192,.24)",
    "&:hover": { bgcolor: "background.paper", color: "#0097a7" },
  };
}

const vuseSwitchSx = {
  "& .MuiSwitch-switchBase.Mui-checked": { color: "#0097a7" },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: "#0097a7" },
};

const vueElevation24 = "0px 11px 15px -7px rgba(0,0,0,.2), 0px 24px 38px 3px rgba(0,0,0,.14), 0px 9px 46px 8px rgba(0,0,0,.12)";

const usageColors = ["#0097a7", "#424242", "#fbc02d", "#f44336", "#fb8c00"];
const usageSlides = usageColors.map((color, index) => <ColorSlide color={color} text={`Slide ${index + 1}`} />);
const cycleSlides = [
  <ColorSlide color="#3f51b5" text="First Slide" />,
  <ColorSlide color="#fb8c00" text="Second Slide" />,
  <ColorSlide color="#c2185b" text="Third Slide" />,
  <ColorSlide color="#ef5350" text="Fourth Slide" />,
  <ColorSlide color="#6200ea" text="Fifth Slide" />,
];
const customIconSlides = [
  <ColorSlide color="#4caf50" text="First Slide" />,
  <ColorSlide color="#424242" text="Second Slide" />,
  <ColorSlide color="#f9a825" text="Third Slide" />,
  <ColorSlide color="#e57373" text="Fourth Slide" />,
  <ColorSlide color="#fb8c00" text="Fifth Slide" />,
];

const carouselExamples: CarouselExample[] = [
  { title: "Cycle", description: <>With the <strong>cycle</strong> prop you can have your slides automatically transition to the next available every 6s (default).</>, source: "cycle", minHeight: 520, render: () => <CycleExample /> },
  { title: "Custom transition", description: <>The <CodePill>v-carousel-item</CodePill> component can have its <strong>transition/reverse-transition</strong> changed.</>, source: "transition", minHeight: 620, render: () => <ImageCarouselExample transition="fade" /> },
  { title: "Custom delimiters", description: "Use any available icon as your carousel's slide delimiter.", source: "icons", minHeight: 520, render: () => <CustomIconsExample /> },
  { title: "Hide controls", description: <>You can hide the carousel navigation controls with <CodePill>:show-arrows=&quot;false&quot;</CodePill>.</>, source: "hideControls", minHeight: 620, render: () => <ImageCarouselExample showArrows={false} /> },
  { title: "Hide delimiters", description: <>You can hide the bottom controls with <CodePill>hide-delimiters</CodePill> prop.</>, source: "hideDelimiters", minHeight: 620, render: () => <ImageCarouselExample hideDelimiters /> },
  { title: "v-model control", description: "You can control carousel with model.", source: "model", minHeight: 620, render: () => <ModelExample /> },
];

const sourceTemplates = {
  cycle: `<v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
  <v-carousel-item v-for="(slide, i) in slides" :key="i">
    <v-sheet :color="colors[i]" height="100%">
      <div class="text-h2">{{ slide }} Slide</div>
    </v-sheet>
  </v-carousel-item>
</v-carousel>`,
  transition: `<v-carousel>
  <v-carousel-item
    v-for="(item,i) in items"
    :key="i"
    :src="item.src"
    reverse-transition="fade-transition"
    transition="fade-transition"
  ></v-carousel-item>
</v-carousel>`,
  icons: `<v-card elevation="24" max-width="444" class="mx-auto">
  <v-system-bar lights-out></v-system-bar>
  <v-carousel :continuous="false" :cycle="cycle" :show-arrows="false" hide-delimiter-background delimiter-icon="mdi-minus" height="300">...</v-carousel>
  <v-switch v-model="cycle" label="Cycle Slides" inset></v-switch>
</v-card>`,
  hideControls: `<v-carousel :show-arrows="false">
  <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
</v-carousel>`,
  hideDelimiters: `<v-carousel hide-delimiters>
  <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
</v-carousel>`,
  model: `<v-row justify="space-around">
  <v-icon @click="model--">mdi-minus</v-icon>
  {{ model }}
  <v-icon @click="model++">mdi-plus</v-icon>
</v-row>
<v-carousel v-model="model">...</v-carousel>`,
};
