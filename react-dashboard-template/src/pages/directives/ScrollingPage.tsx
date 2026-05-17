import { forwardRef, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  IconButton,
  MenuItem,
  Radio,
  Slider,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Code,
  Functions,
  GitHub,
  InvertColors,
} from "@mui/icons-material";
import DocPage from "../../components/vuetify-docs/DocPage";
import DocText from "../../components/vuetify-docs/DocText";

const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 16.5, md: 18 }, lineHeight: 1.7, fontWeight: 300 };
const primary = "#0097a7";
const lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi commodi earum tenetur. Asperiores dolorem placeat ab nobis iusto culpa, autem molestias molestiae quidem pariatur. Debitis beatae expedita nam facere perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ducimus cupiditate rerum officiis consequuntur laborum doloremque quaerat ipsa voluptates, nobis nam quis nulla ullam at corporis, similique ratione quasi illo!";

const easings = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t ** 2,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t ** 2 : -1 + (4 - 2 * t) * t),
  easeInCubic: (t: number) => t ** 3,
  easeOutCubic: (t: number) => --t ** 3 + 1,
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t ** 3 : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: (t: number) => t ** 4,
  easeOutQuart: (t: number) => 1 - --t ** 4,
  easeInOutQuart: (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
  easeInQuint: (t: number) => t ** 5,
  easeOutQuint: (t: number) => 1 + --t ** 5,
  easeInOutQuint: (t: number) => t < 0.5 ? 16 * t ** 5 : 1 + 16 * --t ** 5,
};

type EasingName = keyof typeof easings;

export default function ScrollingPage() {
  return (
    <DocPage
      title="Scrolling"
      namespace="Directives"
      icon={<Functions />}
      breadcrumbs={[
        { label: "Directives", href: "/directives/Intersect" },
        { label: "Scrolling" },
      ]}
    >
      <DocText>
        <RichText text="The `v-scroll` directive allows you to provide callbacks when the window, specified target or element itself (with `.self` modifier) is scrolled." />
      </DocText>
      <UsageSection />
      <ExamplesSection />
      <OptionsSection />
    </DocPage>
  );
}

function UsageSection() {
  return (
    <Box component="section" sx={{ mb: 5.25 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 27, md: 30 }, fontWeight: 500, mb: 1.6 }}>
        Usage
      </Typography>
      <DirectiveExampleBlock
        title=""
        description="The default behavior is to bind to the window. If no additional configuration options are needed, you can simply pass your callback function."
        source={usageSource}
        minHeight={580}
        uninverted
      >
        <GoToUsageExample />
      </DirectiveExampleBlock>
    </Box>
  );
}

function ExamplesSection() {
  return (
    <Box component="section" sx={{ pt: 0.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 27, md: 30 }, fontWeight: 500, mb: 1.25 }}>
        Examples
      </Typography>
      <Typography color="text.secondary" sx={{ ...docsParagraphSx, mb: 4.2, maxWidth: 980 }}>
        Below is a collection of simple to complex examples.
      </Typography>
      <DirectiveExampleBlock
        id="scroll-with-options"
        title="Scroll with options"
        description="For a more fine tuned approach, you can designate the target to bind the scroll event listener."
        source={optionsSource}
        minHeight={520}
        uninverted
      >
        <ScrollWithOptionsExample />
      </DirectiveExampleBlock>
      <DirectiveExampleBlock
        id="watching-bound-element"
        title="Watching bound element"
        description="`v-scroll` targets the `window` by default but can also watch the element it's being bound to. In the following example we use the **self** modifier, `v-scroll.self`, to watch the [`v-card`](/components/cards) element specifically. This causes the method `onScroll` to invoke as you scroll the card contents; incrementing the counter."
        source={selfSource}
        minHeight={500}
        newIn="v2.3"
      >
        <SelfScrollExample />
      </DirectiveExampleBlock>
    </Box>
  );
}

function OptionsSection() {
  const rows = [
    ["arg:target", "`v-scroll:#target=\"callback\"` The target watched for scroll changes. Defaults to window but can be changed to any valid id selector."],
    ["arg:self", "`v-scroll.self=\"callback\"` Binds to the element that the the directive is attached."],
    ["value", "`v-scroll=\"callback\"` The function to invoke on target scroll"],
  ];

  return (
    <Box component="section" sx={{ mb: 2 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 27, md: 30 }, fontWeight: 500, mb: 1.6 }}>
        Options
      </Typography>
      <Card sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "hidden" }}>
        {rows.map(([name, description], index) => (
          <Box key={name} sx={{ display: { xs: "block", sm: "grid" }, gridTemplateColumns: "220px 1fr", px: { xs: 2.5, md: 3 }, py: 2, borderTop: index === 0 ? 0 : "1px solid rgba(0,0,0,.08)" }}>
            <Typography sx={{ fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 13.5, color: "#e53935", mb: { xs: 0.75, sm: 0 } }}>{name}</Typography>
            <Typography color="text.secondary" sx={{ fontSize: 15.5, lineHeight: 1.65, fontWeight: 300 }}>
              <RichText text={description} />
            </Typography>
          </Box>
        ))}
      </Card>
    </Box>
  );
}

function GoToUsageExample() {
  const radioRef = useRef<HTMLHeadingElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [type, setType] = useState<"number" | "selector" | "element">("number");
  const [number, setNumber] = useState(9999);
  const [selector, setSelector] = useState("#scroll-with-options");
  const [selected, setSelected] = useState("Button");
  const [duration, setDuration] = useState(300);
  const [offset, setOffset] = useState(0);
  const [easing, setEasing] = useState<EasingName>("easeInOutCubic");

  const target = useMemo(() => {
    if (type === "element") return selected === "Button" ? buttonRef.current : radioRef.current;
    const value = type === "number" ? number : selector;
    return !Number.isNaN(Number(value)) ? Number(value) : value;
  }, [number, selected, selector, type]);

  return (
    <Box className="v-container" sx={{ width: "100%", px: { xs: 0, sm: 3 }, mx: "auto" }}>
      <Box className="v-row" sx={{ display: "flex", flexWrap: "wrap", mx: -1.5 }}>
        <Box className="v-col v-col-12" sx={{ flex: "0 0 100%", maxWidth: "100%", px: 1.5, py: 1.5 }}>
          <Typography ref={radioRef} component="h3" className="text-h5" sx={sectionH3Sx}>
            Target
          </Typography>
          <Box className="v-input--radio-group v-input--radio-group--row" sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", mt: 1, mb: 2 }}>
            {[
              ["Number", "number"],
              ["Selector", "selector"],
              ["DOMElement", "element"],
            ].map(([label, value]) => (
              <Box key={value} component="label" sx={radioLabelSx}>
                <Radio checked={type === value} onChange={() => setType(value as typeof type)} size="small" sx={radioSx} />
                <Typography component="span" sx={{ fontSize: 16, color: "rgba(0,0,0,.87)" }}>{label}</Typography>
              </Box>
            ))}
          </Box>
          {type === "number" ? <VueTextField label="Number" type="number" value={number} onChange={(value) => setNumber(Number(value))} /> : null}
          {type === "selector" ? <VueTextField label="Selector" value={selector} onChange={setSelector} /> : null}
          {type === "element" ? <VueSelect label="DOMElement" value={selected} items={["Button", "Radio group"]} onChange={setSelected} /> : null}
        </Box>
        <Box className="v-col v-col-12" sx={{ flex: "0 0 100%", maxWidth: "100%", px: 1.5, py: 1.5 }}>
          <Typography component="h3" className="text-h5" sx={sectionH3Sx}>
            Options
          </Typography>
          <VueSelect label="Easing" value={easing} items={Object.keys(easings)} onChange={(value) => setEasing(value as EasingName)} />
          <VueSlider label="Duration" value={duration} min={0} max={1000} onChange={setDuration} />
          <VueSlider label="Offset" value={offset} min={-500} max={500} onChange={setOffset} />
        </Box>
        <Box className="v-col" sx={{ flexBasis: 0, flexGrow: 1, maxWidth: "100%", px: 1.5, py: 1.5 }}>
          <VButton ref={buttonRef} block onClick={() => goTo(target, { duration, offset, easing })}>
            scroll
          </VButton>
        </Box>
      </Box>
    </Box>
  );
}

function ScrollWithOptionsExample() {
  const [offsetTop, setOffsetTop] = useState(0);
  const scrollTargetRef = useRef<HTMLDivElement | null>(null);
  const directiveRef = useScroll<HTMLDivElement>((event) => {
    setOffsetTop((event.target as HTMLElement).scrollTop);
  }, { target: "#scroll-target" });

  return (
    <Box>
      <Box className="v-row align-center justify-center" sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", mx: -1.5 }}>
        <Box component="span" className="v-subheader" sx={subheaderSx}>Offset Top</Box>
        <Typography component="span" sx={{ fontSize: 16, color: "rgba(0,0,0,.87)" }}>{offsetTop}</Typography>
      </Box>
      <Box
        id="scroll-target"
        ref={scrollTargetRef}
        className="v-container overflow-y-auto"
        sx={{ maxHeight: 400, overflowY: "auto", width: "100%", px: { xs: 0, sm: 3 }, mx: "auto" }}
      >
        <Box
          ref={directiveRef}
          className="v-row align-center justify-center"
          sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", mx: -1.5, height: 1000 }}
        />
      </Box>
    </Box>
  );
}

function SelfScrollExample() {
  const [scrollInvoked, setScrollInvoked] = useState(0);
  const cardRef = useScroll<HTMLDivElement>(() => setScrollInvoked((value) => value + 1), { self: true });

  return (
    <Card
      ref={cardRef}
      className="v-card overflow-y-auto"
      sx={{
        maxHeight: 400,
        overflowY: "auto",
        bgcolor: "#fff",
        color: "rgba(0,0,0,.87)",
        borderRadius: 1,
        boxShadow: "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)",
      }}
    >
      <Box className="v-banner justify-center headline font-weight-light" sx={{ position: "sticky", top: 0, zIndex: 1, bgcolor: "#fff" }}>
        <Box className="v-banner__wrapper" sx={{ alignItems: "center", display: "flex", flex: "1 1 auto", justifyContent: "center", p: "16px 24px", borderBottom: "thin solid rgba(0,0,0,.12)" }}>
          <Typography className="v-banner__text" sx={{ flex: "0 1 auto", lineHeight: 1.5, fontSize: 24, fontWeight: 300, textAlign: "center" }}>
            Scroll Me - Method invoked{" "}
            <Box component="span" className="font-weight-bold" sx={{ fontWeight: 700 }}>
              {scrollInvoked}
            </Box>{" "}
            times
          </Typography>
        </Box>
      </Box>
      <Box className="v-card__text" sx={{ p: 2, color: "rgba(0,0,0,.6)", fontSize: 14, lineHeight: 1.5, width: "100%" }}>
        {Array.from({ length: 12 }, (_, index) => (
          <Typography key={index} component="div" className="mb-4" sx={{ mb: 2, fontSize: 14, lineHeight: 1.5 }}>
            {lorem}
          </Typography>
        ))}
      </Box>
    </Card>
  );
}

function DirectiveExampleBlock({
  title,
  description,
  source,
  children,
  minHeight,
  uninverted = false,
  newIn,
  id,
}: {
  id?: string;
  title: string;
  description: string;
  source: string;
  children: ReactNode;
  minHeight: number;
  uninverted?: boolean;
  newIn?: string;
}) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("template");
  const sourceSections = getSourceSections(source);
  const sectionNames = Object.keys(sourceSections);
  const activeSection = sourceSections[selectedSection] ? selectedSection : sectionNames[0];
  const darkBody = inverted && !uninverted;

  return (
    <Card id={id} sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "hidden", mb: 5.25 }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, alignItems: "center", py: 0.5, px: { xs: 2.25, md: 3 }, bgcolor: "transparent" }}>
        <Box sx={{ minWidth: 0, pr: 2, display: "flex", alignItems: "center", gap: 1 }}>
          {title ? (
            <Typography sx={{ fontSize: { xs: 19, md: 21 }, fontWeight: 500, lineHeight: 1.35 }}>
              {title}
            </Typography>
          ) : null}
          {newIn ? (
            <Box sx={{ display: "inline-flex", alignItems: "center", height: 24, px: 1, borderRadius: 999, bgcolor: "#fb8c00", color: "#fff", fontSize: 12, fontWeight: 500 }}>
              New in&nbsp;<strong>{newIn}</strong>
            </Box>
          ) : null}
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example color">
          <IconButton size="small" aria-label="Invert example color" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}>
            <InvertColors sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="View on Github">
          <IconButton size="small" aria-label="View on Github" sx={exampleIconSx(false)}>
            <GitHub sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="View source">
          <IconButton size="small" aria-label="View source" aria-expanded={sourceOpen} onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}>
            <Code sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2" }}>
          <Stack direction="row" spacing={1} sx={{ p: 1, flexWrap: "wrap" }}>
            {sectionNames.map((section) => (
              <Button
                key={section}
                size="small"
                onClick={() => setSelectedSection(section)}
                sx={{
                  minHeight: 32,
                  px: 1.75,
                  borderRadius: 999,
                  color: activeSection === section ? "#fff" : "rgba(255,255,255,.78)",
                  bgcolor: activeSection === section ? "rgba(255,255,255,.16)" : "transparent",
                  "&:hover": { bgcolor: activeSection === section ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.08)" },
                }}
              >
                {section}
              </Button>
            ))}
          </Stack>
          <Divider sx={{ borderColor: "rgba(255,255,255,.14)" }} />
          <Box sx={{ maxHeight: { xs: "none", sm: "calc(100vh - 275px)" }, overflowY: "auto", p: 2 }}>
            <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', 'SFMono-Regular', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap", color: "#f8f8f2" }}>
              {sourceSections[activeSection]}
            </Box>
          </Box>
        </Box>
      </Collapse>
      <Box
        sx={{
          px: { xs: 2.5, md: 3 },
          py: { xs: 2.4, md: 2.7 },
          minHeight,
          bgcolor: darkBody ? "#303030" : "transparent",
          color: darkBody ? "rgba(255,255,255,.92)" : "inherit",
          transition: "background-color 180ms ease, color 180ms ease",
        }}
      >
        <Typography color={darkBody ? "rgba(255,255,255,.82)" : "text.secondary"} sx={{ fontSize: { xs: 15.5, md: 16 }, lineHeight: 1.68, fontWeight: 300, mb: 2.5, maxWidth: title ? 900 : 980 }}>
          <RichText text={description} />
        </Typography>
        {children}
      </Box>
    </Card>
  );
}

function useScroll<T extends HTMLElement>(handler: EventListener, config: { self?: boolean; target?: string; options?: boolean | AddEventListenerOptions } = {}) {
  const ref = useRef<T | null>(null);
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const listener: EventListener = (event) => handlerRef.current(event);
    const target = config.self ? element : config.target ? document.querySelector(config.target) : window;
    if (!target) return;
    const options = config.options || { passive: true };
    target.addEventListener("scroll", listener, options);
    return () => target.removeEventListener("scroll", listener, options);
  }, [config.self, config.target, config.options]);

  return ref;
}

function goTo(target: number | string | HTMLElement | null, settings: { duration: number; offset: number; easing: EasingName }) {
  const container = (document.scrollingElement as HTMLElement | null) || document.body || document.documentElement;
  let targetLocation = 0;
  if (typeof target === "number") {
    targetLocation = getOffset(target) - settings.offset;
  } else {
    targetLocation = getOffset(target) - getOffset(container) - settings.offset;
  }
  const startLocation = container.scrollTop;
  if (targetLocation === startLocation) return Promise.resolve(targetLocation);
  const startTime = performance.now();
  const ease = easings[settings.easing];
  return new Promise<number>((resolve) => {
    requestAnimationFrame(function step(currentTime) {
      const timeElapsed = currentTime - startTime;
      const progress = Math.abs(settings.duration ? Math.min(timeElapsed / settings.duration, 1) : 1);
      container.scrollTop = Math.floor(startLocation + (targetLocation - startLocation) * ease(progress));
      const clientHeight = container === document.body ? document.documentElement.clientHeight : container.clientHeight;
      if (progress === 1 || clientHeight + container.scrollTop === container.scrollHeight) {
        resolve(targetLocation);
        return;
      }
      requestAnimationFrame(step);
    });
  });
}

function getOffset(target: number | string | HTMLElement | null) {
  if (typeof target === "number") return target;
  let element = typeof target === "string" ? document.querySelector(target) : target;
  if (!element) return 0;
  let totalOffset = 0;
  while (element instanceof HTMLElement) {
    totalOffset += element.offsetTop;
    element = element.offsetParent as HTMLElement | null;
  }
  return totalOffset;
}

function VueTextField({ label, value, onChange, type = "text" }: { label: string; value: string | number; onChange: (value: string) => void; type?: string }) {
  return (
    <TextField
      variant="standard"
      label={label}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      fullWidth
      sx={inputSx}
    />
  );
}

function VueSelect({ label, value, items, onChange }: { label: string; value: string; items: string[]; onChange: (value: string) => void }) {
  return (
    <TextField
      select
      variant="standard"
      label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      fullWidth
      sx={inputSx}
    >
      {items.map((item) => (
        <MenuItem key={item} value={item}>{item}</MenuItem>
      ))}
    </TextField>
  );
}

function VueSlider({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  return (
    <Box sx={{ pt: 1.5, pb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography sx={{ width: 86, color: "rgba(0,0,0,.6)", fontSize: 16 }}>{label}</Typography>
        <Slider
          value={value}
          min={min}
          max={max}
          valueLabelDisplay="auto"
          onChange={(_, next) => onChange(Array.isArray(next) ? next[0] : next)}
          sx={{
            color: primary,
            height: 2,
            "& .MuiSlider-track": { height: 2, border: 0 },
            "& .MuiSlider-rail": { height: 2, opacity: 0.38, bgcolor: "rgba(0,0,0,.26)" },
            "& .MuiSlider-thumb": { width: 12, height: 12, boxShadow: "none", "&:before": { boxShadow: "none" } },
            "& .MuiSlider-valueLabel": { bgcolor: primary, fontSize: 12 },
          }}
        />
      </Box>
    </Box>
  );
}

const VButton = forwardRef<HTMLButtonElement, { children: ReactNode; onClick: () => void; block?: boolean }>(function VButton({ children, onClick, block = false }, ref) {
  return (
    <Box
      component="button"
      ref={ref}
      type="button"
      onClick={onClick}
      sx={{
        width: block ? "100%" : "auto",
        minHeight: 36,
        minWidth: 64,
        px: 2,
        border: 0,
        borderRadius: "4px",
        bgcolor: primary,
        color: "#fff",
        boxShadow: "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)",
        textTransform: "uppercase",
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: ".0892857143em",
        cursor: "pointer",
        transition: "box-shadow .28s cubic-bezier(.4,0,.2,1)",
        "&:hover": { boxShadow: "0px 2px 4px -1px rgba(0,0,0,.2), 0px 4px 5px 0px rgba(0,0,0,.14), 0px 1px 10px 0px rgba(0,0,0,.12)" },
        "&:active": { boxShadow: "0px 5px 5px -3px rgba(0,0,0,.2), 0px 8px 10px 1px rgba(0,0,0,.14), 0px 3px 14px 2px rgba(0,0,0,.12)" },
      }}
    >
      {children}
    </Box>
  );
});

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|_[^_]+_)/g);
  return (
    <>
      {parts.map((part, index) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          return <Box key={`${part}-${index}`} component="a" href={link[2]} sx={{ color: "#00838f", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>{link[1]}</Box>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return <Box component="code" key={`${part}-${index}`} sx={inlineCodeSx}>{part.slice(1, -1)}</Box>;
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return <Box component="strong" key={`${part}-${index}`} sx={{ fontWeight: 600 }}>{part.slice(2, -2)}</Box>;
        }
        if (part.startsWith("_") && part.endsWith("_")) {
          return <Box component="em" key={`${part}-${index}`}>{part.slice(1, -1)}</Box>;
        }
        return <span key={`${part}-${index}`}>{part}</span>;
      })}
    </>
  );
}

function getSourceSections(source: string) {
  const template = source.match(/<template>[\s\S]*?<\/template>/)?.[0] ?? "";
  const script = source.match(/<script>[\s\S]*?<\/script>/)?.[0] ?? "";
  return Object.fromEntries(
    [
      ["template", template],
      ["script", script],
    ].filter(([, value]) => value),
  );
}

function exampleIconSx(active: boolean) {
  return {
    width: 28,
    height: 28,
    color: active ? "primary.main" : "text.secondary",
    mx: 0.1,
    bgcolor: "transparent",
    opacity: active ? 0.72 : 0.48,
    "&:hover": { bgcolor: "rgba(0,131,143,.08)", color: "primary.main", opacity: 0.82 },
    "&:active": { transform: "scale(.94)", bgcolor: "rgba(0,131,143,.14)", opacity: 1 },
  };
}

const sectionH3Sx = { fontSize: 24, fontWeight: 400, lineHeight: 1.5, letterSpacing: 0, mt: 0, mb: 1, color: "rgba(0,0,0,.87)" };
const radioLabelSx = { display: "inline-flex", alignItems: "center", mr: 2, mb: 1, cursor: "pointer", userSelect: "none" };
const radioSx = { color: "rgba(0,0,0,.54)", "&.Mui-checked": { color: primary }, p: 0.75, mr: 0.5 };
const inputSx = {
  mt: 1,
  mb: 2,
  "& .MuiInputLabel-root": { fontSize: 16, color: "rgba(0,0,0,.6)" },
  "& .MuiInputLabel-root.Mui-focused": { color: primary },
  "& .MuiInputBase-input": { fontSize: 16, color: "rgba(0,0,0,.87)", py: "8px" },
  "& .MuiInput-underline:before": { borderBottomColor: "rgba(0,0,0,.42)" },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "rgba(0,0,0,.87)" },
  "& .MuiInput-underline:after": { borderBottomColor: primary },
};
const subheaderSx = {
  alignItems: "center",
  display: "flex",
  height: 48,
  fontSize: 14,
  fontWeight: 400,
  px: 2,
  color: "rgba(0,0,0,.6)",
};
const inlineCodeSx = {
  fontFamily: "'Roboto Mono', 'SFMono-Regular', Consolas, monospace",
  fontSize: "0.84em",
  color: "#e53935",
  bgcolor: "rgba(229,57,53,.09)",
  px: 0.45,
  py: 0.1,
  borderRadius: 0.75,
};

const usageSource = `<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h3 ref="radio" class="text-h5">
          Target
        </h3>

        <v-radio-group v-model="type" row>
          <v-radio label="Number" value="number"></v-radio>

          <v-radio label="Selector" value="selector"></v-radio>

          <v-radio label="DOMElement" value="element"></v-radio>
        </v-radio-group>

        <v-text-field
          v-if="type === 'number'"
          v-model="number"
          type="number"
          label="Number"
        ></v-text-field>

        <v-text-field
          v-if="type === 'selector'"
          v-model="selector"
          label="Selector"
        ></v-text-field>

        <v-select
          v-if="type === 'element'"
          v-model="selected"
          :items="elements"
          label="DOMElement"
        ></v-select>
      </v-col>

      <v-col cols="12">
        <h3 class="text-h5">Options</h3>

        <v-select v-model="easing" :items="easings" label="Easing"></v-select>

        <v-slider
          v-model="duration"
          min="0"
          max="1000"
          label="Duration"
          thumb-label
        ></v-slider>

        <v-slider
          v-model="offset"
          min="-500"
          max="500"
          label="Offset"
          thumb-label
        ></v-slider>
      </v-col>

      <v-col>
        <v-btn
          ref="button"
          block
          color="primary"
          @click="$vuetify.goTo(target, options)"
        >
          scroll
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as easings from "vuetify/es5/services/goto/easing-patterns";

export default {
  data() {
    return {
      type: "number",
      number: 9999,
      selector: "#scroll-with-options",
      selected: "Button",
      elements: ["Button", "Radio group"],
      duration: 300,
      offset: 0,
      easing: "easeInOutCubic",
      easings: Object.keys(easings),
    };
  },
  computed: {
    target() {
      const value = this[this.type];
      if (!isNaN(value)) return Number(value);
      else return value;
    },
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing,
      };
    },
    element() {
      if (this.selected === "Button") return this.$refs.button;
      else if (this.selected === "Radio group") return this.$refs.radio;
      else return "";
    },
  },
};
</script>`;

const optionsSource = `<template>
  <div>
    <v-row justify="center" align="center">
      <v-subheader>Offset Top</v-subheader>
      {{ offsetTop }}
    </v-row>
    <v-container
      id="scroll-target"
      style="max-height: 400px"
      class="overflow-y-auto"
    >
      <v-row
        v-scroll:#scroll-target="onScroll"
        align="center"
        justify="center"
        style="height: 1000px"
      >
      </v-row>
    </v-container>
  </div>
</template>

<script>
  export default {
    data: () => ({
      offsetTop: 0,
    }),

    methods: {
      onScroll (e) {
        this.offsetTop = e.target.scrollTop
      },
    },
  }
</script>`;

const selfSource = `<template>
  <v-card
    v-scroll.self="onScroll"
    class="overflow-y-auto"
    max-height="400"
  >
    <v-banner
      class="justify-center headline font-weight-light"
      sticky
    >
      Scroll Me - Method invoked

      <span
        class="font-weight-bold"
        v-text="scrollInvoked"
      ></span>

      times
    </v-banner>

    <v-card-text>
      <div
        v-for="n in 12"
        :key="n"
        class="mb-4"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi commodi earum tenetur. Asperiores dolorem placeat ab nobis iusto culpa, autem molestias molestiae quidem pariatur. Debitis beatae expedita nam facere perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ducimus cupiditate rerum officiis consequuntur laborum doloremque quaerat ipsa voluptates, nobis nam quis nulla ullam at corporis, similique ratione quasi illo!
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      scrollInvoked: 0,
    }),

    methods: {
      onScroll () {
        this.scrollInvoked++
      },
    },
  }
</script>`;
