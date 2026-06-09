import { createContext, isValidElement, useContext, useState, type PointerEvent, type ReactNode } from "react";
import { Box, Button, Card, Checkbox, Collapse, IconButton, Stack, Switch, Toolbar, Tooltip, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight, Check, Code, ErrorOutline, Event, ExpandMore, GitHub, InvertColors, KeyboardArrowDown, ViewAgenda } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const secondary = "#ff4081";
const teal = "#009688";
const error = "#ff5252";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const PanelOpenContext = createContext(false);

interface ExpansionExample {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  minHeight: number;
  uninverted?: boolean;
  render: (inverted: boolean) => ReactNode;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
  leaving: boolean;
}

type PanelValue = number | number[] | null;

interface ExpansionPanelProps {
  header: ReactNode;
  children: ReactNode;
  expandIcon?: ReactNode;
  disableIconRotate?: boolean;
}

export default function ExpansionPanelsPage() {
  return (
    <DocPage
      title="ExpansionPanels"
      namespace="Components"
      icon={<ViewAgenda />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Expansion Panel" },
      ]}
    >
      <DocText>
        The <CodePill>v-expansion-panel</CodePill> component is useful for reducing vertical space with large amounts of information. The default functionality of the component is to only display one expansion-panel body at a time; however, with the <CodePill>multiple</CodePill> property, the expansion-panel can remain open until explicitly closed.
      </DocText>
      <UsageSection />
      <PlaygroundSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Usage
      </Typography>
      <VuetifyExampleBlock title="" description="Expansion panels in their simplest form display a list of expandable items." source="usage" minHeight={330}>
        {() => <BasicFivePanels />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function PlaygroundSection() {
  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Playground
      </Typography>
      <VuetifyExampleBlock title="" description="" source="playground" minHeight={430}>
        {() => <PlaygroundExample />}
      </VuetifyExampleBlock>
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
        {expansionExamples.map((example) => (
          <VuetifyExampleBlock key={example.title} title={example.title} description={example.description} source={example.source} minHeight={example.minHeight} uninverted={example.uninverted}>
            {(inverted) => example.render(inverted)}
          </VuetifyExampleBlock>
        ))}
      </Stack>
    </Box>
  );
}

function VuetifyExampleBlock({ title, description, source, children, minHeight, uninverted = false }: { title: string; description: ReactNode; source: keyof typeof sourceTemplates; children: (inverted: boolean) => ReactNode; minHeight: number; uninverted?: boolean }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  const effectiveInverted = uninverted ? false : inverted;

  return (
    <Card sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}>
      <Toolbar variant="dense" sx={{ minHeight: 74, alignItems: "center", px: { xs: 3, md: 4 }, bgcolor: "transparent" }}>
        <Typography sx={{ fontSize: { xs: 22, md: 25 }, fontWeight: 500, lineHeight: 1.35 }}>{title}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        {!uninverted && (
          <Tooltip title="Invert example colors">
            <IconButton size="small" aria-label="Invert example colors" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}>
              <InvertColors sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="View on Github"><IconButton size="small" aria-label="View on Github" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton size="small" aria-label="View source" aria-expanded={sourceOpen} onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", maxHeight: { xs: "none", sm: "calc(100vh - 275px)" }, overflowY: "auto", p: 2 }}>
          <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', 'SFMono-Regular', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap", color: "#f8f8f2" }}>{sourceTemplates[source]}</Box>
        </Box>
      </Collapse>
      <Box sx={{ px: { xs: 3, md: 4 }, py: { xs: 3.5, md: 4.25 }, minHeight, bgcolor: effectiveInverted ? "#303030" : "transparent", color: effectiveInverted ? "rgba(255,255,255,.92)" : "inherit", transition: "background-color 180ms ease, color 180ms ease", position: "relative", zIndex: 1 }}>
        {description && <Typography sx={{ color: effectiveInverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: 16.5, fontWeight: 300, lineHeight: 1.7, mb: 3 }}>{description}</Typography>}
        {children(effectiveInverted)}
      </Box>
    </Card>
  );
}

function BasicFivePanels({ variant = "default" }: { variant?: "default" | "popout" | "inset" | "accordion" | "focusable" }) {
  return (
    <ExpansionPanels popout={variant === "popout"} inset={variant === "inset"} accordion={variant === "accordion"} focusable={variant === "focusable"}>
      {Array.from({ length: 5 }).map((_, index) => (
        <ExpansionPanel key={index} header="Item">
          {lorem}
        </ExpansionPanel>
      ))}
    </ExpansionPanels>
  );
}

function PlaygroundExample() {
  const [accordion, setAccordion] = useState(false);
  const [popout, setPopout] = useState(false);
  const [inset, setInset] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [focusable, setFocusable] = useState(false);
  const [flat, setFlat] = useState(false);
  const [hover, setHover] = useState(false);
  const [tile, setTile] = useState(false);

  const switches = [
    ["Accordion", accordion, setAccordion],
    ["Popout", popout, setPopout],
    ["Inset", inset, setInset],
    ["Multiple", multiple, setMultiple],
    ["Disabled", disabled, setDisabled],
    ["Readonly", readonly, setReadonly],
    ["Focusable", focusable, setFocusable],
    ["Flat", flat, setFlat],
    ["Hover", hover, setHover],
    ["Tile", tile, setTile],
  ] as const;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap", mb: 2 }}>
        {switches.map(([label, checked, setChecked]) => (
          <VSwitch key={label} label={label} checked={checked} onChange={setChecked} />
        ))}
      </Box>
      <ExpansionPanels accordion={accordion} popout={popout} inset={inset} multiple={multiple} focusable={focusable} disabled={disabled} readonly={readonly} flat={flat} hover={hover} tile={tile}>
        {Array.from({ length: 5 }).map((_, index) => (
          <ExpansionPanel key={index} header="Item">
            {lorem}
          </ExpansionPanel>
        ))}
      </ExpansionPanels>
    </Box>
  );
}

function DisabledExample() {
  const [disabled, setDisabled] = useState(false);
  const [panel, setPanel] = useState<number[]>([0, 1]);
  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <VCheckbox label="Disabled" checked={disabled} onChange={setDisabled} />
      </Box>
      <ExpansionPanels multiple value={panel} onChange={(next) => setPanel(Array.isArray(next) ? next : [])} disabled={disabled}>
        <ExpansionPanel header="Panel 1">Some content</ExpansionPanel>
        <ExpansionPanel header="Panel 2">Some content</ExpansionPanel>
        <ExpansionPanel header="Panel 3">Some content</ExpansionPanel>
      </ExpansionPanels>
    </Box>
  );
}

function ReadonlyExample() {
  const [readonly, setReadonly] = useState(false);
  const [panel, setPanel] = useState<number[]>([0, 1]);
  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <VCheckbox label="Readonly" checked={readonly} onChange={setReadonly} />
      </Box>
      <ExpansionPanels multiple value={panel} onChange={(next) => setPanel(Array.isArray(next) ? next : [])} readonly={readonly}>
        <ExpansionPanel header="Panel 1">Some content</ExpansionPanel>
        <ExpansionPanel header="Panel 2">Some content</ExpansionPanel>
        <ExpansionPanel header="Panel 3">Some content</ExpansionPanel>
      </ExpansionPanels>
    </Box>
  );
}

function ExternalExample() {
  const [panel, setPanel] = useState<number[]>([]);
  const items = 5;
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", pb: 4 }}>
        <VBtn onClick={() => setPanel(Array.from({ length: items }, (_, index) => index))}>all</VBtn>
        <VBtn sx={{ mx: 2 }} onClick={() => setPanel([])}>none</VBtn>
        <Typography sx={{ fontSize: 16 }}>[{panel.join(", ")}]</Typography>
      </Box>
      <ExpansionPanels multiple value={panel} onChange={(next) => setPanel(Array.isArray(next) ? next : [])}>
        {Array.from({ length: items }).map((_, index) => (
          <ExpansionPanel key={index} header={`Header ${index + 1}`}>
            {lorem}
          </ExpansionPanel>
        ))}
      </ExpansionPanels>
    </Box>
  );
}

function CustomIconsExample() {
  return (
    <Box>
      <Box sx={{ mb: 6 }}>
        <ExpansionPanels>
          {Array.from({ length: 5 }).map((_, index) => (
            <ExpansionPanel key={index} header="Item" expandIcon={<KeyboardArrowDown sx={{ fontSize: 24 }} />}>
              {lorem}
            </ExpansionPanel>
          ))}
        </ExpansionPanels>
      </Box>
      <ExpansionPanels>
        <ExpansionPanel header="Item" expandIcon={<ExpandMore sx={{ color: primary, fontSize: 24 }} />}>
          {lorem}
        </ExpansionPanel>
        <ExpansionPanel header="Item" disableIconRotate expandIcon={<Check sx={{ color: teal, fontSize: 24 }} />}>
          {lorem}
        </ExpansionPanel>
        <ExpansionPanel header="Item" disableIconRotate expandIcon={<ErrorOutline sx={{ color: error, fontSize: 24 }} />}>
          {lorem}
        </ExpansionPanel>
      </ExpansionPanels>
    </Box>
  );
}

function AdvancedExample() {
  const [tripName, setTripName] = useState("");
  const [location, setLocation] = useState<string | null>(null);
  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);
  const locations = ["Australia", "Barbados", "Chile", "Denmark", "Equador", "France"];

  return (
    <ExpansionPanels>
      <ExpansionPanel header={<AdvancedHeader label="Trip name" openText="Enter a name for the trip" closedText={tripName} />}>
        <VTextField value={tripName} onChange={setTripName} placeholder="Caribbean Cruise" />
      </ExpansionPanel>
      <ExpansionPanel header={<AdvancedHeader label="Location" openText="Select trip destination" closedText={location || ""} />}>
        <Box sx={{ display: "flex", alignItems: "flex-start", flexWrap: { xs: "wrap", md: "nowrap" } }}>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }} />
          <Box sx={{ width: { xs: "100%", md: "41.666%" } }}>
            <VSelectChip value={location} items={locations} onChange={setLocation} />
          </Box>
          <Box sx={{ alignSelf: "stretch", mx: 4, borderRight: "thin solid rgba(0,0,0,.12)", display: { xs: "none", md: "block" } }} />
          <Typography sx={{ width: { xs: "100%", md: "25%" }, fontSize: 16, lineHeight: 1.5, mt: { xs: 2, md: 0 } }}>
            Select your destination of choice
            <br />
            <Box component="a" href="javascript:void(0)" sx={{ color: primary, textDecoration: "none" }}>Learn more</Box>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 1 }}>
          <VBtn text color={secondary}>Cancel</VBtn>
          <VBtn text color={primary}>Save</VBtn>
        </Box>
      </ExpansionPanel>
      <ExpansionPanel header={<AdvancedDatesHeader start={start} end={end} />}>
        <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
          <Box sx={{ width: { xs: "100%", md: "25%" }, mb: { xs: 2, md: 0 } }}>
            <VDateMenu label="Start date" value={start} onChange={setStart} />
          </Box>
          <Box sx={{ width: { xs: "100%", md: "25%" } }}>
            <VDateMenu label="End date" value={end} onChange={setEnd} />
          </Box>
        </Box>
      </ExpansionPanel>
    </ExpansionPanels>
  );
}

function AdvancedHeader({ label, openText, closedText }: { label: string; openText: string; closedText: string }) {
  return (
    <Box sx={{ display: "flex", width: "100%", flexWrap: "nowrap" }}>
      <Box sx={{ width: "33.333%", flexShrink: 0 }}>{label}</Box>
      <Box sx={{ width: "66.666%", color: "text.secondary", position: "relative", minHeight: 18 }}>
        <FadeText>{({ open }) => (open ? openText : closedText)}</FadeText>
      </Box>
    </Box>
  );
}

function AdvancedDatesHeader({ start, end }: { start: string | null; end: string | null }) {
  return (
    <Box sx={{ display: "flex", width: "100%", flexWrap: "nowrap" }}>
      <Box sx={{ width: "33.333%", flexShrink: 0 }}>Start and end dates</Box>
      <Box sx={{ width: "66.666%", color: "text.secondary", position: "relative", minHeight: 18 }}>
        <FadeText>
          {({ open }) => open ? "When do you want to travel?" : (
            <Box sx={{ display: "flex", width: "100%" }}>
              <Box sx={{ width: "50%" }}>Start date: {start || "Not set"}</Box>
              <Box sx={{ width: "50%" }}>End date: {end || "Not set"}</Box>
            </Box>
          )}
        </FadeText>
      </Box>
    </Box>
  );
}

function FadeText({ children }: { children: (state: { open: boolean }) => ReactNode }) {
  const open = useContext(PanelOpenContext);
  return <>{children({ open })}</>;
}

function ExpansionPanels({ children, multiple = false, value, onChange, accordion = false, disabled = false, readonly = false, focusable = false, flat = false, hover = false, inset = false, popout = false, tile = false }: { children: ReactNode[] | ReactNode; multiple?: boolean; value?: PanelValue; onChange?: (value: PanelValue) => void; accordion?: boolean; disabled?: boolean; readonly?: boolean; focusable?: boolean; flat?: boolean; hover?: boolean; inset?: boolean; popout?: boolean; tile?: boolean }) {
  const childArray = Array.isArray(children) ? children : [children];
  const [internal, setInternal] = useState<PanelValue>(value ?? (multiple ? [] : null));
  const activeValue = value ?? internal;

  const isActive = (index: number) => Array.isArray(activeValue) ? activeValue.includes(index) : activeValue === index;
  const setActive = (index: number) => {
    if (disabled || readonly) return;
    let next: PanelValue;
    if (multiple) {
      const current = Array.isArray(activeValue) ? activeValue : [];
      next = current.includes(index) ? current.filter((item) => item !== index) : [...current, index];
    } else {
      next = activeValue === index ? null : index;
    }
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  return (
    <Box
      sx={{
        borderRadius: tile ? 0 : "4px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100%",
        zIndex: 1,
        color: "rgba(0,0,0,.87)",
      }}
    >
      {childArray.map((child, index) => {
        if (!isValidElement<ExpansionPanelProps>(child)) return null;
        const panel = child.props;
        const active = isActive(index);
        const nextActive = isActive(index + 1);
        return (
          <PanelShell
            key={index}
            active={active}
            nextActive={nextActive}
            disabled={disabled}
            readonly={readonly}
            focusable={focusable}
            flat={flat}
            hover={hover}
            inset={inset}
            popout={popout}
            accordion={accordion}
            tile={tile}
            first={index === 0}
            last={index === childArray.length - 1}
            onToggle={() => setActive(index)}
            header={panel.header}
            expandIcon={panel.expandIcon}
            disableIconRotate={panel.disableIconRotate}
          >
            {panel.children}
          </PanelShell>
        );
      })}
    </Box>
  );
}

function ExpansionPanel(_props: ExpansionPanelProps) {
  return null;
}

function PanelShell({ children, header, expandIcon, disableIconRotate = false, active, nextActive, disabled, readonly, focusable, flat, hover, inset, popout, accordion, tile, first, last, onToggle }: { children: ReactNode; header: ReactNode; expandIcon?: ReactNode; disableIconRotate?: boolean; active: boolean; nextActive: boolean; disabled: boolean; readonly: boolean; focusable: boolean; flat: boolean; hover: boolean; inset: boolean; popout: boolean; accordion: boolean; tile: boolean; first: boolean; last: boolean; onToggle: () => void }) {
  return (
    <Box
      sx={{
        flex: "1 0 100%",
        maxWidth: popout ? (active ? "calc(100% + 16px)" : "calc(100% - 32px)") : inset ? (active ? "calc(100% - 32px)" : "100%") : "100%",
        position: "relative",
        transition: ".3s cubic-bezier(.25,.8,.5,1)",
        bgcolor: "#fff",
        color: disabled ? "rgba(0,0,0,.38)" : "rgba(0,0,0,.87)",
        borderTopLeftRadius: tile ? 0 : (first || active || nextActive ? 4 : 0),
        borderTopRightRadius: tile ? 0 : (first || active || nextActive ? 4 : 0),
        borderBottomLeftRadius: tile ? 0 : (last || active || nextActive ? 4 : 0),
        borderBottomRightRadius: tile ? 0 : (last || active || nextActive ? 4 : 0),
        mt: active && !first && !accordion ? "16px" : 0,
        "& + .panel-active": { mt: accordion ? 0 : "16px" },
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          zIndex: -1,
          borderRadius: "inherit",
          boxShadow: flat ? "none" : "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)",
          transition: "box-shadow .28s cubic-bezier(.4,0,.2,1)",
        },
        "&::after": !first && !flat ? {
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          borderTop: "thin solid rgba(0,0,0,.12)",
          opacity: active || accordion ? 1 : 1,
          transition: ".2s opacity cubic-bezier(.4,0,.2,1)",
        } : {},
      }}
      className={active ? "panel-active" : undefined}
    >
      <PanelOpenContext.Provider value={active}>
        <PanelContext active={active} disabled={disabled} readonly={readonly} focusable={focusable} hover={hover} onToggle={onToggle}>
          <PanelHeader expandIcon={expandIcon} disableIconRotate={disableIconRotate}>{header}</PanelHeader>
          <Collapse in={active} timeout={260} unmountOnExit={false}>
            <PanelContent>{children}</PanelContent>
          </Collapse>
        </PanelContext>
      </PanelOpenContext.Provider>
    </Box>
  );
}

function PanelContext({ children, active, disabled, readonly, focusable, hover, onToggle }: { children: ReactNode; active: boolean; disabled: boolean; readonly: boolean; focusable: boolean; hover: boolean; onToggle: () => void }) {
  const childArray = Array.isArray(children) ? children : [children];
  return (
    <>
      {childArray.map((child, index) => index === 0 ? (
        <Box key={index} onClick={onToggle} data-active={active} data-disabled={disabled} data-readonly={readonly} data-focusable={focusable} data-hover={hover}>
          {child}
        </Box>
      ) : child)}
    </>
  );
}

function PanelHeader({ children, expandIcon, disableIconRotate }: { children: ReactNode; expandIcon?: ReactNode; disableIconRotate?: boolean }) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    const disabled = event.currentTarget.parentElement?.getAttribute("data-disabled") === "true";
    if (!disabled) addRipple(event, setRipples, { maxSize: 96, opacity: 0.12 });
  };
  return (
    <Box
      component="button"
      type="button"
      onPointerDown={onPointerDown}
      sx={{
        alignItems: "center",
        border: 0,
        borderTopLeftRadius: "inherit",
        borderTopRightRadius: "inherit",
        bgcolor: "transparent",
        color: "inherit",
        cursor: "pointer",
        display: "flex",
        font: "inherit",
        fontSize: "0.9375rem",
        lineHeight: 1,
        minHeight: "48px",
        outline: "none",
        p: "16px 24px",
        position: "relative",
        textAlign: "left",
        transition: ".3s min-height cubic-bezier(.25,.8,.5,1)",
        width: "100%",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          bgcolor: "currentColor",
          opacity: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          transition: ".3s opacity cubic-bezier(.25,.8,.5,1)",
        },
        "div[data-active='true'] > &": { minHeight: "64px" },
        "div[data-disabled='true'] > &": { pointerEvents: "none", cursor: "default" },
        "div[data-focusable='true'] > &:focus::before": { opacity: 0.12 },
        "div[data-hover='true'] > &:hover::before": { opacity: 0.04 },
      }}
    >
      <Box sx={{ flex: "1 1 auto" }}>{children}</Box>
      <Box
        sx={{
          display: "inline-flex",
          ml: "auto",
          mb: "-4px",
          mt: "-4px",
          color: "rgba(0,0,0,.54)",
          transition: ".3s cubic-bezier(.25,.8,.5,1)",
          "div[data-active='true'] > button &": disableIconRotate ? {} : { transform: "rotate(-180deg)" },
        }}
      >
        {expandIcon || <ExpandMore sx={{ fontSize: 24 }} />}
      </Box>
      <RippleSpan ripples={ripples} />
    </Box>
  );
}

function PanelContent({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ p: "0 24px 16px", flex: "1 1 auto", maxWidth: "100%", fontSize: 16, lineHeight: 1.5 }}>
        {children}
      </Box>
    </Box>
  );
}

function VSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", m: 1 }}>
      <Switch
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        sx={{
          width: 50,
          height: 32,
          p: 0.75,
          "& .MuiSwitch-switchBase": { p: "7px", "&.Mui-checked": { transform: "translateX(18px)", color: primary }, "&.Mui-checked + .MuiSwitch-track": { bgcolor: "rgba(0,151,167,.5)" } },
          "& .MuiSwitch-thumb": { width: 18, height: 18, boxShadow: "0 1px 3px rgba(0,0,0,.35)" },
          "& .MuiSwitch-track": { borderRadius: 14, bgcolor: "rgba(0,0,0,.38)", opacity: 1 },
        }}
      />
      <Typography sx={{ fontSize: 16, ml: 1 }}>{label}</Typography>
    </Box>
  );
}

function VCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", minHeight: 48 }}>
      <Checkbox checked={checked} onChange={(event) => onChange(event.target.checked)} sx={{ color: "rgba(0,0,0,.54)", "&.Mui-checked": { color: primary }, p: 1 }} />
      <Typography sx={{ fontSize: 16 }}>{label}</Typography>
    </Box>
  );
}

function VBtn({ children, onClick, text = false, color, sx = {} }: { children: ReactNode; onClick?: () => void; text?: boolean; color?: string; sx?: Record<string, unknown> }) {
  return (
    <RippleButton
      onClick={onClick}
      sx={{
        minWidth: 64,
        height: 36,
        px: 2,
        border: 0,
        borderRadius: 1,
        bgcolor: text ? "transparent" : "#fff",
        color: color || "rgba(0,0,0,.87)",
        boxShadow: text ? "none" : "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)",
        textTransform: "uppercase",
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: ".0892857143em",
        ...sx,
      }}
    >
      {children}
    </RippleButton>
  );
}

function RippleButton({ children, onClick, sx = {} }: { children: ReactNode; onClick?: () => void; sx?: Record<string, unknown> }) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => addRipple(event, setRipples);
  return (
    <Button
      disableRipple
      onPointerDown={onPointerDown}
      onClick={onClick}
      sx={{ position: "relative", overflow: "hidden", fontFamily: "inherit", ...sx }}
    >
      {children}
      <RippleSpan ripples={ripples} />
    </Button>
  );
}

function VTextField({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <Box component="input" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} sx={{ width: "100%", height: 48, border: 0, borderBottom: "1px solid rgba(0,0,0,.42)", bgcolor: "transparent", outline: "none", fontSize: 16, color: "rgba(0,0,0,.87)", "&::placeholder": { color: "rgba(0,0,0,.38)", opacity: 1 }, "&:focus": { borderBottomColor: primary, borderBottomWidth: 2 } }} />
  );
}

function VSelectChip({ value, items, onChange }: { value: string | null; items: string[]; onChange: (value: string | null) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ position: "relative" }}>
      <Box onClick={() => setOpen((next) => !next)} sx={{ minHeight: 48, display: "flex", alignItems: "center", px: 1.5, bgcolor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,.18)", cursor: "pointer" }}>
        {value && <Box sx={{ display: "inline-flex", alignItems: "center", height: 32, px: 1.5, borderRadius: 16, bgcolor: "rgba(0,0,0,.08)", fontSize: 14 }}>{value}</Box>}
        <Box sx={{ flexGrow: 1 }} />
        <KeyboardArrowDown sx={{ color: "rgba(0,0,0,.54)" }} />
      </Box>
      {open && (
        <Card sx={{ position: "absolute", zIndex: 20, left: 0, right: 0, top: 52, py: 1, boxShadow: "0 5px 12px rgba(0,0,0,.22)" }}>
          {items.map((item) => (
            <Box key={item} onClick={() => { onChange(item); setOpen(false); }} sx={{ px: 2, py: 1.2, fontSize: 16, cursor: "pointer", "&:hover": { bgcolor: "rgba(0,0,0,.04)" } }}>{item}</Box>
          ))}
        </Card>
      )}
    </Box>
  );
}

function VDateMenu({ label, value, onChange }: { label: string; value: string | null; onChange: (value: string | null) => void }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value || "");
  const monthLabel = "July 2018";
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
  const days = Array.from({ length: 35 }, (_, index) => {
    const day = index - 0;
    return day >= 1 && day <= 31 ? day : null;
  });
  const toDate = (day: number) => `2018-07-${String(day).padStart(2, "0")}`;
  return (
    <Box sx={{ position: "relative" }}>
      <Box onClick={() => setOpen(true)} sx={{ minHeight: 48, display: "flex", alignItems: "center", borderBottom: "1px solid rgba(0,0,0,.42)", cursor: "pointer" }}>
        <Event sx={{ mr: 1, color: "rgba(0,0,0,.54)" }} />
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: value ? 12 : 16, color: value ? primary : "rgba(0,0,0,.6)", lineHeight: value ? 1 : 1.35, transform: value ? "translateY(-2px)" : "none", transition: ".2s cubic-bezier(.4,0,.2,1)" }}>{label}</Typography>
          <Typography sx={{ fontSize: 16, minHeight: 24 }}>{value || ""}</Typography>
        </Box>
      </Box>
      {open && (
        <Card sx={{ position: "absolute", top: 52, left: 0, width: 290, zIndex: 2200, borderRadius: 1, boxShadow: "0px 5px 5px -3px rgba(0,0,0,.2), 0px 8px 10px 1px rgba(0,0,0,.14), 0px 3px 14px 2px rgba(0,0,0,.12)", overflow: "hidden", bgcolor: "#fff" }}>
          <Box sx={{ height: 48, display: "flex", alignItems: "center", px: 1, color: "rgba(0,0,0,.87)" }}>
            <IconButton size="small" sx={{ color: "rgba(0,0,0,.54)" }}><ChevronLeft /></IconButton>
            <Typography sx={{ flex: 1, textAlign: "center", fontSize: 16, fontWeight: 500 }}>{monthLabel}</Typography>
            <IconButton size="small" sx={{ color: "rgba(0,0,0,.54)" }}><ChevronRight /></IconButton>
          </Box>
          <Box sx={{ px: 1.5, pb: 1 }}>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", mb: .5 }}>
              {weekdays.map((weekday, index) => (
                <Typography key={`${weekday}-${index}`} sx={{ height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "rgba(0,0,0,.38)", fontWeight: 500 }}>{weekday}</Typography>
              ))}
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", rowGap: .25 }}>
              {days.map((day, index) => {
                const date = day ? toDate(day) : "";
                const selected = Boolean(day && draft === date);
                return (
                  <Box key={`${day || "blank"}-${index}`} sx={{ height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {day && (
                      <Box
                        onClick={() => setDraft(date)}
                        sx={{
                          width: 32,
                          height: 32,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          fontSize: 13,
                          cursor: "pointer",
                          bgcolor: selected ? primary : "transparent",
                          color: selected ? "#fff" : "rgba(0,0,0,.87)",
                          transition: ".2s cubic-bezier(.4,0,.2,1)",
                          "&:hover": { bgcolor: selected ? primary : "rgba(0,0,0,.08)" },
                        }}
                      >
                        {day}
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1, pt: 0 }}>
            <VBtn text color={primary} onClick={() => setOpen(false)}>Cancel</VBtn>
            <VBtn text color={primary} onClick={() => { onChange(draft); setOpen(false); }}>OK</VBtn>
          </Box>
        </Card>
      )}
    </Box>
  );
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: .55, py: .18, borderRadius: .75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: .5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

function addRipple<T extends HTMLElement>(event: PointerEvent<T>, setRipples: (updater: (current: Ripple[]) => Ripple[]) => void, options: { maxSize?: number; opacity?: number } = {}) {
  const rect = event.currentTarget.getBoundingClientRect();
  const dx = Math.max(event.clientX - rect.left, rect.right - event.clientX);
  const dy = Math.max(event.clientY - rect.top, rect.bottom - event.clientY);
  const naturalSize = Math.sqrt(dx * dx + dy * dy) * 2;
  const size = Math.min(options.maxSize ?? naturalSize, naturalSize);
  const ripple: Ripple = { id: Date.now() + Math.random(), x: event.clientX - rect.left - size / 2, y: event.clientY - rect.top - size / 2, size, leaving: false };
  setRipples((current) => [...current, ripple]);
  window.setTimeout(() => setRipples((current) => current.map((item) => item.id === ripple.id ? { ...item, leaving: true } : item)), 250);
  window.setTimeout(() => setRipples((current) => current.filter((item) => item.id !== ripple.id)), 560);
}

function RippleSpan({ ripples }: { ripples: Ripple[] }) {
  return (
    <>
      {ripples.map((ripple) => (
        <Box key={ripple.id} component="span" sx={{ position: "absolute", left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size, borderRadius: "50%", bgcolor: "currentColor", pointerEvents: "none", opacity: ripple.leaving ? 0 : .12, transform: ripple.leaving ? "scale(1)" : "scale(.08)", transition: ripple.leaving ? "opacity 300ms cubic-bezier(.25,.8,.5,1)" : "transform 250ms cubic-bezier(.25,.8,.5,1), opacity 100ms cubic-bezier(.25,.8,.5,1)" }} />
      ))}
    </>
  );
}

const expansionExamples: ExpansionExample[] = [
  { title: "Disabled", description: <>Both the expansion-panel and its content can be disabled using the <CodePill>disabled</CodePill> prop.</>, source: "simple/disabled", minHeight: 260, render: () => <DisabledExample /> },
  { title: "Readonly", description: <><CodePill>readonly</CodePill> prop does the same thing as <CodePill>disabled</CodePill>, but it doesn't touch styles.</>, source: "simple/readonly", minHeight: 260, render: () => <ReadonlyExample /> },
  { title: "Popout", description: <>The expansion-panel also has <strong>popout</strong> design. With it, expansion-panel is enlargened when activated.</>, source: "simple/popout", minHeight: 340, render: () => <BasicFivePanels variant="popout" /> },
  { title: "Inset", description: <><strong>inset</strong> expansion-panel becomes smaller when activated.</>, source: "simple/inset", minHeight: 340, render: () => <BasicFivePanels variant="inset" /> },
  { title: "Accordion", description: <><strong>accordion</strong> expansion-panel hasn't got margins around active panel.</>, source: "simple/accordion", minHeight: 320, render: () => <BasicFivePanels variant="accordion" /> },
  { title: "Focusable", description: <>The expansion-panel headers can be made focusable with the prop <CodePill>focusable</CodePill>.</>, source: "simple/focusable", minHeight: 320, render: () => <BasicFivePanels variant="focusable" /> },
  { title: "External control", description: <>Expansion panels can be controlled externally by modifying the <CodePill>v-model</CodePill>. Its value corresponds to a zero-based index of the currently opened expansion panel content. If <CodePill>multiple</CodePill> prop is used then it is an array containing the indices of the open items.</>, source: "intermediate/external", minHeight: 360, render: () => <ExternalExample /> },
  { title: "Custom icon", description: <>Expand action icon can be customized with <CodePill>expand-icon</CodePill> prop or the <CodePill>actions</CodePill> slot.</>, source: "intermediate/custom-icons", minHeight: 560, render: () => <CustomIconsExample /> },
  { title: "Advanced", description: <>The expansion panel component provides a rich playground to build truly advanced implementations. Here we take advantage of slots in the <CodePill>v-expansion-panel-header</CodePill> component to react to the state of being open or closed by fading content in and out.</>, source: "complex/advanced", minHeight: 480, uninverted: true, render: () => <AdvancedExample /> },
];

const sourceTemplates = {
  usage: `<template>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="(item,i) in 5"
      :key="i"
    >
      <v-expansion-panel-header>Item</v-expansion-panel-header>
      <v-expansion-panel-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>`,
  playground: `<template>
  <v-row align="center">
    <v-row justify="space-around">
      <v-switch v-model="accordion" class="ma-2" label="Accordion"></v-switch>
      <v-switch v-model="popout" class="ma-2" label="Popout"></v-switch>
      <v-switch v-model="inset" class="ma-2" label="Inset"></v-switch>
      <v-switch v-model="multiple" class="ma-2" label="Multiple"></v-switch>
      <v-switch v-model="disabled" class="ma-2" label="Disabled"></v-switch>
      <v-switch v-model="readonly" class="ma-2" label="Readonly"></v-switch>
      <v-switch v-model="focusable" class="ma-2" label="Focusable"></v-switch>
      <v-switch v-model="flat" class="ma-2" label="Flat"></v-switch>
      <v-switch v-model="hover" class="ma-2" label="Hover"></v-switch>
      <v-switch v-model="tile" class="ma-2" label="Tile"></v-switch>
    </v-row>

    <v-expansion-panels
      :accordion="accordion"
      :popout="popout"
      :inset="inset"
      :multiple="multiple"
      :focusable="focusable"
      :disabled="disabled"
      :readonly="readonly"
      :flat="flat"
      :hover="hover"
      :tile="tile"
    >
      <v-expansion-panel
        v-for="(item,i) in 5"
        :key="i"
      >
        <v-expansion-panel-header>Item</v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>`,
  "simple/disabled": `<template>
  <div>
    <div class="d-flex">
      <v-checkbox
        v-model="disabled"
        label="Disabled"
      ></v-checkbox>
    </div>

    <v-expansion-panels
      v-model="panel"
      :disabled="disabled"
      multiple
    >
      <v-expansion-panel>
        <v-expansion-panel-header>Panel 1</v-expansion-panel-header>
        <v-expansion-panel-content>
          Some content
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>Panel 2</v-expansion-panel-header>
        <v-expansion-panel-content>
          Some content
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>Panel 3</v-expansion-panel-header>
        <v-expansion-panel-content>
          Some content
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>`,
  "simple/readonly": `<template>
  <div>
    <div class="d-flex">
      <v-checkbox
        v-model="readonly"
        label="Readonly"
      ></v-checkbox>
    </div>

    <v-expansion-panels
      v-model="panel"
      :readonly="readonly"
      multiple
    >
      <v-expansion-panel>
        <v-expansion-panel-header>Panel 1</v-expansion-panel-header>
        <v-expansion-panel-content>
          Some content
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>Panel 2</v-expansion-panel-header>
        <v-expansion-panel-content>
          Some content
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>Panel 3</v-expansion-panel-header>
        <v-expansion-panel-content>
          Some content
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>`,
  "simple/popout": `<template>
  <v-row justify="center">
    <v-expansion-panels popout>
      <v-expansion-panel
        v-for="(item,i) in 5"
        :key="i"
      >
        <v-expansion-panel-header>Item</v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>`,
  "simple/inset": `<template>
  <v-row justify="center">
    <v-expansion-panels inset>
      <v-expansion-panel
        v-for="(item,i) in 5"
        :key="i"
      >
        <v-expansion-panel-header>Item</v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>`,
  "simple/accordion": `<template>
  <v-row justify="center">
    <v-expansion-panels accordion>
      <v-expansion-panel
        v-for="(item,i) in 5"
        :key="i"
      >
        <v-expansion-panel-header>Item</v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>`,
  "simple/focusable": `<template>
  <v-expansion-panels focusable>
    <v-expansion-panel
      v-for="(item,i) in 5"
      :key="i"
    >
      <v-expansion-panel-header>Item</v-expansion-panel-header>
      <v-expansion-panel-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>`,
  "intermediate/external": `<template>
  <div>
    <div class="text-center d-flex pb-4">
      <v-btn @click="all">all</v-btn>

      <v-btn @click="none" class="mx-2">none</v-btn>
      <div>{{ panel }}</div>
    </div>

    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel v-for="(item, i) in items" :key="i">
        <v-expansion-panel-header>Header {{ item }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>`,
  "intermediate/custom-icons": `<template>
  <div>
    <v-expansion-panels class="mb-6">
      <v-expansion-panel
        v-for="(item,i) in 5"
        :key="i"
      >
        <v-expansion-panel-header expand-icon="mdi-menu-down">Item</v-expansion-panel-header>
        <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          Item
          <template v-slot:actions>
            <v-icon color="primary">$expand</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate>
          Item
          <template v-slot:actions>
            <v-icon color="teal">mdi-check</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>`,
  "complex/advanced": `<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="4">Trip name</v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open">Enter a name for the trip</span>
                <span v-else>{{ trip.name }}</span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-text-field v-model="trip.name" placeholder="Caribbean Cruise"></v-text-field>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>`,
};
