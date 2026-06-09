import { useEffect, useMemo, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { Box, Button, Card, Collapse, Divider, IconButton, Stack, Switch, Toolbar, Tooltip, Typography } from "@mui/material";
import { Check, ChevronLeft, ChevronRight, Close, Code, GitHub, InvertColors, LocalOffer } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };
const primary = "#0097a7";
const deepPurpleAccent = "#651fff";
const tags = ["Work", "Home Improvement", "Vacation", "Food", "Drawers", "Shopping", "Art", "Tech", "Creative Writing"];

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface ChipGroupsExample {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  minHeight: number;
  render: (inverted: boolean) => ReactNode;
}

export default function ChipGroupsPage() {
  return (
    <DocPage
      title="ChipGroups"
      namespace="Components"
      icon={<LocalOffer />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Chip Groups" },
      ]}
    >
      <DocText>
        The <CodePill>v-chip-group</CodePill> supercharges the <CodePill>v-chip</CodePill> component by providing groupable functionality. It is used for creating groups of selections using chips.
      </DocText>
      <UsageSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  const [column, setColumn] = useState(false);
  const [mandatory, setMandatory] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [inverted, setInverted] = useState(false);

  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Usage
      </Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>
        Chip groups make it easy for users to select filtering options for more complex implementations. By default <CodePill>v-chip-group</CodePill> will overflow to the right but can be changed to a <strong>column</strong> only mode.
      </Typography>
      <Card variant="outlined" sx={{ bgcolor: "background.paper", borderColor: "rgba(0,0,0,.12)", boxShadow: "none", overflow: "hidden", mb: 6 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "75% 25%" } }}>
          <Box sx={{ minWidth: 0 }}>
            <Box sx={{ display: "flex", alignItems: "stretch", minHeight: 48, bgcolor: inverted ? "#212121" : "#eeeeee", borderBottom: "1px solid rgba(0,0,0,.12)" }}>
              <Box sx={{ display: "flex", pl: { xs: 0, md: 3 }, overflowX: "auto" }} />
              <Divider orientation="vertical" flexItem />
            </Box>
            <Box sx={{ height: 300, overflow: "hidden" }}>
              <Box id="usage-example" sx={{ width: "calc(100% - 1px)", height: 300, overflowY: "auto", bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "#fff" : "inherit" }}>
                <Box sx={{ minHeight: "100%", p: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ChipGroup activeClass="primary" column={column} mandatory={mandatory} multiple={multiple} inverted={inverted} tags={tags} />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ borderLeft: { md: "1px solid rgba(0,0,0,.12)" }, minWidth: 0 }}>
            <Toolbar variant="dense" sx={{ bgcolor: inverted ? "#212121" : "#eeeeee", minHeight: 48, px: 1.5 }}>
              <Typography sx={{ fontSize: 20, fontWeight: 400, color: inverted ? "rgba(255,255,255,.92)" : "text.primary" }}>Options</Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Tooltip title="Invert playground colors">
                <IconButton size="small" aria-label="Invert playground colors" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}>
                  <InvertColors fontSize="small" />
                </IconButton>
              </Tooltip>
            </Toolbar>
            <Divider />
            <Stack spacing={0} sx={{ maxHeight: 300, overflowY: "auto", py: 1.5, scrollbarWidth: "thin", "&::-webkit-scrollbar": { width: 8 }, "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(0,0,0,.28)", borderRadius: 8 } }}>
              <OptionSwitch label="column" checked={column} onChange={setColumn} />
              <OptionSwitch label="mandatory" checked={mandatory} onChange={setMandatory} />
              <OptionSwitch label="multiple" checked={multiple} onChange={setMultiple} />
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
        {chipGroupsExamples.map((example) => (
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

function ChipGroup({ tags: items, column = false, mandatory = false, multiple = false, activeClass = "primary", inverted = false, filter = false, outlined = false, initialSingle, initialMultiple }: { tags: string[]; column?: boolean; mandatory?: boolean; multiple?: boolean; activeClass?: "primary" | "purple"; inverted?: boolean; filter?: boolean; outlined?: boolean; initialSingle?: number | string; initialMultiple?: Array<number | string> }) {
  const mandatoryInitial = initialSingle ?? (mandatory ? 0 : undefined);
  const [single, setSingle] = useState<number | string | undefined>(mandatoryInitial);
  const [multi, setMulti] = useState<Array<number | string>>(initialMultiple || []);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [widths, setWidths] = useState({ content: 0, wrapper: 0 });
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const usesStringValues = typeof initialSingle === "string" || initialMultiple?.some((item) => typeof item === "string");
  const values = useMemo(() => items.map((tag, index) => (usesStringValues ? tag : index)), [items, usesStringValues]);
  const isOverflowing = !column && widths.wrapper > 0 && widths.content > widths.wrapper;
  const maxOffset = Math.max(widths.content - widths.wrapper, 0);
  const hasPrev = isOverflowing && scrollOffset > 0;
  const hasNext = isOverflowing && scrollOffset < maxOffset - 1;

  useEffect(() => {
    if (!mandatory) return;

    if (multiple) {
      setMulti((current) => (current.length ? current : [values[0]]));
      return;
    }

    setSingle((current) => (current === undefined || current === null ? values[0] : current));
  }, [mandatory, multiple, values]);

  useEffect(() => {
    const measure = () => {
      const wrapper = wrapperRef.current;
      const content = contentRef.current;
      if (!wrapper || !content) return;
      const next = { wrapper: wrapper.clientWidth, content: content.scrollWidth };
      setWidths(next);
      setScrollOffset((current) => Math.min(current, Math.max(next.content - next.wrapper, 0)));
    };
    measure();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    if (observer) {
      if (wrapperRef.current) observer.observe(wrapperRef.current);
      if (contentRef.current) observer.observe(contentRef.current);
    }
    window.addEventListener("resize", measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [items.length, column]);

  const toggle = (value: number | string) => {
    if (multiple) {
      setMulti((current) => {
        const exists = current.includes(value);
        if (exists && mandatory && current.length <= 1) return current;
        return exists ? current.filter((item) => item !== value) : [...current, value];
      });
      return;
    }

    setSingle((current) => {
      if (current === value) return mandatory ? current : undefined;
      return value;
    });
  };
  const scrollTo = (direction: "prev" | "next") => {
    const amount = widths.wrapper;
    setScrollOffset((current) => {
      const next = direction === "prev" ? current - amount : current + amount;
      return Math.max(Math.min(next, maxOffset), 0);
    });
  };

  return (
    <Box sx={{ display: "flex", maxWidth: "100%" }}>
      {isOverflowing && <SlideAffix direction="prev" disabled={!hasPrev} onClick={() => scrollTo("prev")} />}
      <Box ref={wrapperRef} sx={{ flex: "1 1 auto", overflow: "hidden", contain: "content", display: "flex", touchAction: "none" }}>
        <Box ref={contentRef} sx={{ display: "flex", flex: "1 0 auto", position: "relative", whiteSpace: column ? "normal" : "nowrap", flexWrap: column ? "wrap" : "nowrap", maxWidth: column ? "100%" : "none", py: "4px", transform: column ? "none" : `translateX(${-scrollOffset}px)`, transition: "transform .3s cubic-bezier(.25,.8,.5,1)" }}>
          {items.map((tag, index) => {
            const value = values[index];
            const active = multiple ? multi.includes(value) : single === value;
            return (
              <VChip key={tag} active={active} activeClass={activeClass} filter={filter} outlined={outlined} inverted={inverted} onClick={() => toggle(value)}>
                {tag}
              </VChip>
            );
          })}
        </Box>
      </Box>
      {isOverflowing && <SlideAffix direction="next" disabled={!hasNext} onClick={() => scrollTo("next")} />}
    </Box>
  );
}

function SlideAffix({ direction, disabled, onClick }: { direction: "prev" | "next"; disabled: boolean; onClick: () => void }) {
  return (
    <Box
      onClick={() => {
        if (!disabled) onClick();
      }}
      sx={{
        alignItems: "center",
        display: "flex",
        flex: "0 1 52px",
        justifyContent: "center",
        minWidth: 52,
        cursor: disabled ? "default" : "pointer",
        pointerEvents: disabled ? "none" : "auto",
        color: disabled ? "rgba(0,0,0,.26)" : "rgba(0,0,0,.54)",
        transition: "opacity .2s cubic-bezier(.4,0,.2,1), color .2s cubic-bezier(.4,0,.2,1)",
      }}
    >
      {direction === "prev" ? <ChevronLeft sx={{ fontSize: 24 }} /> : <ChevronRight sx={{ fontSize: 24 }} />}
    </Box>
  );
}

function VChip({ children, active, activeClass = "primary", filter = false, outlined = false, inverted = false, onClick }: { children: ReactNode; active?: boolean; activeClass?: "primary" | "purple"; filter?: boolean; outlined?: boolean; inverted?: boolean; onClick?: () => void }) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const accent = activeClass === "purple" ? deepPurpleAccent : primary;
  const handleRipple = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.1;
    const ripple = { id: window.performance.now(), x: event.clientX - rect.left - size / 2, y: event.clientY - rect.top - size / 2, size };
    setRipples((current) => [...current.slice(-2), ripple]);
    window.setTimeout(() => setRipples((current) => current.filter((item) => item.id !== ripple.id)), 650);
  };
  const activeOverlay = outlined ? 0.08 : 0.22;
  const baseBg = outlined ? "transparent" : active ? "transparent" : inverted ? "#555" : "#e0e0e0";

  return (
    <Box
      onPointerDown={handleRipple}
      onClick={onClick}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        height: 32,
        px: "12px",
        my: "4px",
        mx: "4px",
        borderRadius: 16,
        bgcolor: baseBg,
        color: active ? accent : inverted ? "rgba(255,255,255,.92)" : "rgba(0,0,0,.87)",
        border: outlined ? `thin solid ${active ? accent : inverted ? "rgba(255,255,255,.52)" : "rgba(0,0,0,.38)"}` : "1px solid transparent",
        fontSize: 14,
        lineHeight: "20px",
        fontWeight: 400,
        cursor: "pointer",
        userSelect: "none",
        whiteSpace: "nowrap",
        boxShadow: "none",
        outline: "none",
        textDecoration: "none",
        verticalAlign: "middle",
        transitionDuration: ".28s",
        transitionProperty: "box-shadow, opacity, color, border-color, background-color",
        transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          bgcolor: "currentColor",
          opacity: active ? activeOverlay : 0,
          pointerEvents: "none",
          transition: "opacity .28s cubic-bezier(.4,0,.2,1)",
        },
        "&:hover::before": { opacity: active ? activeOverlay : 0.04 },
        "&:active": { boxShadow: "0px 2px 2px -1px rgba(0,0,0,.2), 0px 2px 3px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)" },
        "@keyframes chipgroup-ripple": { "0%": { transform: "scale(.2)", opacity: 0 }, "18%": { opacity: 0.18 }, "100%": { transform: "scale(1)", opacity: 0 } },
      }}
    >
      {filter && (
        <Box sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: active ? 22 : 0, mr: active ? 0.75 : 0, opacity: active ? 1 : 0, overflow: "hidden", transform: active ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left center", transition: "width 220ms cubic-bezier(.4,0,.2,1), margin 220ms cubic-bezier(.4,0,.2,1), opacity 160ms ease, transform 220ms cubic-bezier(.4,0,.2,1)" }}>
          <Check sx={{ fontSize: 18 }} />
        </Box>
      )}
      <Box component="span" sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
      {ripples.map((ripple) => <Box key={ripple.id} component="span" sx={{ position: "absolute", left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size, borderRadius: "50%", bgcolor: "currentColor", pointerEvents: "none", animation: "chipgroup-ripple 650ms cubic-bezier(.25,.8,.5,1)" }} />)}
    </Box>
  );
}

function ColumnExample() {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
      <Box sx={{ width: { xs: "100%", sm: "50%", md: "33.333%", lg: "25%" }, px: 1.5 }}>
        <Sheet elevation={10} sx={{ p: 2 }}>
          <ChipGroup column activeClass="primary" tags={tags} />
        </Sheet>
      </Box>
    </Box>
  );
}

function MandatoryExample() {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
      <Box sx={{ width: { xs: "100%", sm: "50%", md: "33.333%" }, px: 1.5 }}>
        <Sheet elevation={10} sx={{ py: 2, px: 0.5 }}>
          <ChipGroup mandatory activeClass="primary" tags={tags} />
        </Sheet>
      </Box>
    </Box>
  );
}

function MultipleExample() {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
      <Box sx={{ width: { xs: "100%", sm: "50%", md: "33.333%" }, px: 1.5 }}>
        <Sheet elevation={10} sx={{ py: 2, px: 0.5 }}>
          <ChipGroup multiple activeClass="primary" tags={tags} />
        </Sheet>
      </Box>
    </Box>
  );
}

function ToothbrushCard() {
  return (
    <ProductCard title="Toothbrush" price="$4.99" text="Our company takes pride in making handmade brushes. Our toothbrushes are available in 4 different bristel types, from extra soft to hard.">
      <Typography component="span" sx={{ fontSize: 16, color: "rgba(0,0,0,.78)" }}>Select type</Typography>
      <ChipGroup mandatory activeClass="purple" tags={["Extra Soft", "Soft", "Medium", "Hard"]} initialSingle={2} />
    </ProductCard>
  );
}

function BlouseCard() {
  return (
    <ProductCard title="Shirt Blouse" price="$44.50" text="Our blouses are available in 8 colors. You can custom order a built-in arch support for any of the models.">
      <Typography component="span" sx={{ fontSize: 16, color: "rgba(0,0,0,.78)" }}>Select size</Typography>
      <ChipGroup mandatory activeClass="purple" tags={["04", "06", "08", "10", "12", "14"]} initialSingle="08" />
    </ProductCard>
  );
}

function ProductCard({ title, price, text, children }: { title: string; price: string; text: string; children: ReactNode }) {
  return (
    <Card sx={{ maxWidth: 400, mx: "auto", bgcolor: "#fff", color: "rgba(0,0,0,.87)", borderRadius: 1, boxShadow: "0px 2px 4px rgba(0,0,0,.18)", overflow: "hidden" }}>
      <Box sx={{ display: "flex", alignItems: "center", px: 2, py: 2 }}>
        <Typography component="h2" sx={{ fontSize: 34, fontWeight: 400, lineHeight: 1.2 }}>{title}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>{price}</Typography>
      </Box>
      <Typography sx={{ px: 2, pb: 2, color: "rgba(0,0,0,.60)", fontSize: 14, lineHeight: 1.43 }}>{text}</Typography>
      <Divider sx={{ mx: 2 }} />
      <Box sx={{ px: 2, py: 2 }}>{children}</Box>
      <Box sx={{ p: 1 }}>
        <Button fullWidth variant="contained" sx={{ minHeight: 36, bgcolor: deepPurpleAccent, color: "#fff", borderRadius: 1, fontSize: 14, fontWeight: 500, letterSpacing: 0, textTransform: "uppercase", boxShadow: "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)", "&:hover": { bgcolor: "#5b19e6" } }}>
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
}

function FilterResultsCard() {
  const [amenities, setAmenities] = useState<Array<number | string>>([1, 4]);
  const [neighborhoods, setNeighborhoods] = useState<Array<number | string>>([1]);

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", bgcolor: "#fff", color: "rgba(0,0,0,.87)", borderRadius: 1, boxShadow: "0px 2px 4px rgba(0,0,0,.18)", overflow: "hidden" }}>
      <Toolbar variant="dense" sx={{ minHeight: 56, bgcolor: deepPurpleAccent, color: "#fff", px: 0.5 }}>
        <IconButton aria-label="Close" sx={{ color: "#fff", width: 48, height: 48 }}><Close /></IconButton>
        <Typography sx={{ fontSize: 20, fontWeight: 500 }}>Filter results</Typography>
      </Toolbar>
      <FilterSection title="Choose amenities" items={["Elevator", "Washer / Dryer", "Fireplace", "Wheelchair access", "Dogs ok", "Cats ok"]} selected={amenities} onChange={setAmenities} />
      <FilterSection title="Choose neighborhoods" items={["Snowy Rock Place", "Honeylane Circle", "Donna Drive", "Elaine Street", "Court Street", "Kennedy Park"]} selected={neighborhoods} onChange={setNeighborhoods} />
    </Card>
  );
}

function FilterSection({ title, items, selected, onChange }: { title: string; items: string[]; selected: Array<number | string>; onChange: (value: Array<number | string>) => void }) {
  const toggle = (value: number) => {
    onChange(selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography component="h2" sx={{ fontSize: 20, fontWeight: 500, lineHeight: 1.6, mb: 1 }}>{title}</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", py: 0.5 }}>
        {items.map((item, index) => (
          <VChip key={item} active={selected.includes(index)} filter outlined onClick={() => toggle(index)}>
            {item}
          </VChip>
        ))}
      </Box>
    </Box>
  );
}

function Sheet({ children, elevation, sx = {} }: { children: ReactNode; elevation: number; sx?: Record<string, unknown> }) {
  return (
    <Box sx={{ bgcolor: "#fff", borderRadius: 0, boxShadow: vuetifyElevation(elevation), color: "rgba(0,0,0,.87)", ...sx }}>
      {children}
    </Box>
  );
}

function OptionSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <Box sx={{ px: 1.5, pb: 0, minHeight: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Typography sx={{ fontSize: 16, textTransform: "capitalize", color: "text.secondary" }}>{label}</Typography>
      <Switch checked={checked} onChange={(event) => onChange(event.target.checked)} color="primary" sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: primary }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: primary } }} />
    </Box>
  );
}

function CodePill({ children }: { children: ReactNode }) {
  return (
    <Box component="code" sx={{ px: 0.65, py: 0.15, borderRadius: 0.75, bgcolor: "rgba(255,82,82,.10)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "0.86em" }}>
      {children}
    </Box>
  );
}

function exampleIconSx(active: boolean) {
  return {
    width: 30,
    height: 30,
    mx: 0.25,
    color: active ? primary : "text.secondary",
    bgcolor: active ? "rgba(0,151,167,.12)" : "transparent",
    "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.05)" },
  };
}

function vuetifyElevation(level: number) {
  const shadows: Record<number, string> = {
    10: "0px 6px 6px -3px rgba(0,0,0,.2), 0px 10px 14px 1px rgba(0,0,0,.14), 0px 4px 18px 3px rgba(0,0,0,.12)",
  };
  return shadows[level] || shadows[10];
}

const chipGroupsExamples: ChipGroupsExample[] = [
  {
    title: "Column",
    description: <>Chip groups with <CodePill>column</CodePill> prop can wrap their chips.</>,
    source: "column",
    minHeight: 250,
    render: () => <ColumnExample />,
  },
  {
    title: "Mandatory",
    description: <>Chip groups with <CodePill>mandatory</CodePill> prop must always have a value selected.</>,
    source: "mandatory",
    minHeight: 230,
    render: () => <MandatoryExample />,
  },
  {
    title: "Multiple",
    description: <>Chip groups with <CodePill>multiple</CodePill> prop can have many values selected.</>,
    source: "multiple",
    minHeight: 230,
    render: () => <MultipleExample />,
  },
  {
    title: "Toothbrush card",
    description: "Chip groups allow the creation of custom interfaces that perform the same actions as an item group or radio controls, but are stylistically different.",
    source: "toothbrush",
    minHeight: 430,
    render: () => <ToothbrushCard />,
  },
  {
    title: "Blouse product card",
    description: <>The <CodePill>v-chip</CodePill> component can have an explicit value used for its model. This gets passed to the <CodePill>v-chip-group</CodePill> component and is useful for when you don&apos;t want to use the chips index as their values.</>,
    source: "blouse",
    minHeight: 430,
    render: () => <BlouseCard />,
  },
  {
    title: "Filter results",
    description: <>Easily create chip groups that provide additional feedback with the <strong>filter</strong> prop. This creates an alternative visual style that communicates to the user that the chip is selected.</>,
    source: "filterResults",
    minHeight: 560,
    render: () => <FilterResultsCard />,
  },
];

const sourceTemplates = {
  usage: `<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-chip-group
        active-class="primary--text"
        v-bind="attrs"
      >
        <v-chip v-for="tag in tags" :key="tag">
          {{ tag }}
        </v-chip>
      </v-chip-group>
    </v-row>
  </v-container>
</template>`,
  column: `<template>
  <v-row justify="space-around">
    <v-col cols="12" sm="6" md="4" lg="3">
      <v-sheet elevation="10" class="pa-4">
        <v-chip-group
          column
          active-class="primary--text"
        >
          <v-chip v-for="tag in tags" :key="tag">
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </v-sheet>
    </v-col>
  </v-row>
</template>`,
  mandatory: `<template>
  <v-row justify="space-around">
    <v-col cols="12" sm="6" md="4">
      <v-sheet elevation="10" class="py-4 px-1">
        <v-chip-group
          mandatory
          active-class="primary--text"
        >
          <v-chip v-for="tag in tags" :key="tag">
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </v-sheet>
    </v-col>
  </v-row>
</template>`,
  multiple: `<template>
  <v-row justify="space-around">
    <v-col cols="12" sm="6" md="4">
      <v-sheet elevation="10" class="py-4 px-1">
        <v-chip-group
          multiple
          active-class="primary--text"
        >
          <v-chip v-for="tag in tags" :key="tag">
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </v-sheet>
    </v-col>
  </v-row>
</template>`,
  toothbrush: `<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title>
      <h2 class="text-h4">Toothbrush</h2>
      <v-spacer></v-spacer>
      <span class="text-h6">$4.99</span>
    </v-card-title>

    <v-card-text>
      Our company takes pride in making handmade brushes. Our toothbrushes are
      available in 4 different bristel types, from extra soft to hard.
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <span class="subheading">Select type</span>

      <v-chip-group
        v-model="selection"
        active-class="deep-purple--text text--accent-4"
        mandatory
      >
        <v-chip>Extra Soft</v-chip>
        <v-chip>Soft</v-chip>
        <v-chip>Medium</v-chip>
        <v-chip>Hard</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn block class="white--text" color="deep-purple accent-4">
        Add to Cart
      </v-btn>
    </v-card-actions>
  </v-card>
</template>`,
  blouse: `<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title>
      <h2 class="text-h4">Shirt Blouse</h2>
      <v-spacer></v-spacer>
      <span class="text-h6">$44.50</span>
    </v-card-title>

    <v-card-text>
      Our blouses are available in 8 colors. You can custom order a built-in
      arch support for any of the models.
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <span class="subheading">Select size</span>

      <v-chip-group
        v-model="selection"
        active-class="deep-purple--text text--accent-4"
        mandatory
      >
        <v-chip v-for="size in sizes" :key="size" :value="size">
          {{ size }}
        </v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn block class="white--text" color="deep-purple accent-4">
        Add to Cart
      </v-btn>
    </v-card-actions>
  </v-card>
</template>`,
  filterResults: `<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-toolbar
      flat
      color="deep-purple accent-4"
      dark
    >
      <v-btn icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Filter results</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <h2 class="title mb-2">Choose amenities</h2>

      <v-chip-group
        v-model="amenities"
        column
        multiple
      >
        <v-chip filter outlined>Elevator</v-chip>
        <v-chip filter outlined>Washer / Dryer</v-chip>
        <v-chip filter outlined>Fireplace</v-chip>
        <v-chip filter outlined>Wheelchair access</v-chip>
        <v-chip filter outlined>Dogs ok</v-chip>
        <v-chip filter outlined>Cats ok</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-text>
      <h2 class="title mb-2">Choose neighborhoods</h2>

      <v-chip-group
        v-model="neighborhoods"
        column
        multiple
      >
        <v-chip filter outlined>Snowy Rock Place</v-chip>
        <v-chip filter outlined>Honeylane Circle</v-chip>
        <v-chip filter outlined>Donna Drive</v-chip>
        <v-chip filter outlined>Elaine Street</v-chip>
        <v-chip filter outlined>Court Street</v-chip>
        <v-chip filter outlined>Kennedy Park</v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>`,
};
