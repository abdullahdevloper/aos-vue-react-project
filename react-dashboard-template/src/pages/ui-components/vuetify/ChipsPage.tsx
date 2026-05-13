import { useMemo, useRef, useState, type MouseEvent, type PointerEvent, type ReactNode } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  IconButton,
  Menu,
  Stack,
  Switch,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  AccountCircleOutlined,
  Add,
  AlarmOn,
  ArrowBack,
  Build,
  CalendarMonth,
  Cake,
  Check,
  CheckCircle,
  Close,
  Delete,
  DirectionsBike,
  FilterList,
  GitHub,
  Google,
  HighlightOff,
  InvertColors,
  Label,
  LocalFireDepartment,
  Map,
  Nature,
  Search,
  Storage,
  Star,
  Twitter,
  ViewModule,
  WbSunny,
  WineBar,
  Work,
  Code,
} from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };

type ChipSize = "x-small" | "small" | "default" | "large" | "x-large";

interface ButtonRipple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface ChipExample {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  minHeight: number;
  uninverted?: boolean;
  render: (inverted: boolean) => ReactNode;
}

export default function ChipsPage() {
  return (
    <DocPage
      title="Chips"
      namespace="Components"
      icon={<ViewModule />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Chips" },
      ]}
    >
      <DocText>
        The <CodePill>v-chip</CodePill> component is used to convey small pieces of information. Using the <CodePill>close</CodePill> property, the chip becomes interactive, allowing user interaction. This component is used by the <CodePill>v-chip-group</CodePill> for advanced selection options.
      </DocText>
      <UsageSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  const [close, setClose] = useState(false);
  const [avatar, setAvatar] = useState(false);
  const [value, setValue] = useState<boolean | null>(null);
  const [variant, setVariant] = useState("filter");
  const [closeIcon, setCloseIcon] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");
  const [inverted, setInverted] = useState(false);
  const tabs = ["filter", "label", "link", "outlined", "pill"];
  const visibleControls = usageControlsByTab[variant] || usageControlsByTab.filter;
  const closeActive = variant === "filter" ? close : Boolean(closeIcon) && visibleControls.includes("closeIcon");
  const leading = (
    <>
      {avatar && (
        <Avatar sx={{ bgcolor: colorMap.secondary, color: "#fff" }}>
          {iconNode(icon) || <AccountCircle />}
        </Avatar>
      )}
      {icon && iconNode(icon)}
    </>
  );

  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Usage
      </Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>
        Chips come in the following variations: Default, closeable, filter, outlined, pill. The default slot of <CodePill>v-chip</CodePill> will also accept avatars and icons alongside text.
      </Typography>
      <Card variant="outlined" sx={{ bgcolor: "background.paper", borderColor: "rgba(0,0,0,.12)", boxShadow: "none", overflow: "hidden", mb: 6 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "75% 25%" } }}>
          <Box sx={{ minWidth: 0 }}>
            <Box sx={{ display: "flex", alignItems: "stretch", minHeight: 48, bgcolor: inverted ? "#212121" : "#eeeeee", borderBottom: "1px solid rgba(0,0,0,.12)" }}>
              <Box sx={{ display: "flex", pl: { xs: 0, md: 3 }, overflowX: "auto" }}>
                {tabs.map((item) => {
                  const active = variant === item;
                  return (
                    <Button
                      key={item}
                      onClick={() => setVariant(item)}
                      sx={{
                        position: "relative",
                        minWidth: 90,
                        px: 2,
                        borderRadius: 0,
                        color: active ? "#0097a7" : inverted ? "rgba(255,255,255,.72)" : "rgba(0,0,0,.68)",
                        fontSize: 14,
                        fontWeight: 500,
                        letterSpacing: 0,
                        textTransform: "uppercase",
                        "&:hover": { bgcolor: "rgba(0,150,167,.08)" },
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          left: 0,
                          right: 0,
                          bottom: 0,
                          height: active ? 2 : 0,
                          bgcolor: "#0097a7",
                        },
                      }}
                    >
                      {item}
                    </Button>
                  );
                })}
              </Box>
              <Divider orientation="vertical" flexItem />
            </Box>
            <Box sx={{ height: 300, overflow: "hidden" }}>
              <Box id="usage-example" sx={{ width: "calc(100% - 1px)", height: 300, overflowY: "auto", bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "#fff" : "inherit" }}>
                <Box sx={{ minHeight: "100%", p: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <VChip
                    color={color || undefined}
                    close={closeActive}
                    closeIcon={closeIcon || "mdi-close-outline"}
                    label={variant === "label"}
                    outlined={variant === "outlined"}
                    pill={variant === "pill"}
                    filter={variant === "filter"}
                    active={value === true}
                    left={avatar || icon ? leading : undefined}
                    onClick={variant === "link" ? () => undefined : undefined}
                  >
                    Chip Component
                  </VChip>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ borderLeft: { md: "1px solid rgba(0,0,0,.12)" }, minWidth: 0 }}>
            <Toolbar variant="dense" sx={{ bgcolor: inverted ? "#212121" : "#eeeeee", minHeight: 48, px: 1.5 }}>
              <Typography sx={{ fontSize: 20, fontWeight: 400, color: inverted ? "rgba(255,255,255,.92)" : "text.primary" }}>Options</Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Tooltip title="Invert playground colors">
                <IconButton size="small" aria-label="Invert playground colors" onClick={() => setInverted((v) => !v)} sx={{ color: inverted ? "#0097a7" : "text.secondary", mt: 0.25 }}>
                  <InvertColors fontSize="small" />
                </IconButton>
              </Tooltip>
            </Toolbar>
            <Divider />
            <Stack spacing={0} sx={{ maxHeight: 300, overflowY: "auto", py: 1.5, scrollbarWidth: "thin", "&::-webkit-scrollbar": { width: 8 }, "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(0,0,0,.28)", borderRadius: 8 } }}>
              {visibleControls.includes("close") && <OptionToggle label="Close" checked={close} onChange={setClose} />}
              {visibleControls.includes("avatar") && <OptionToggle label="Avatar" checked={avatar} onChange={setAvatar} />}
              {visibleControls.includes("value") && <OptionToggle label="Value" checked={value === true} onChange={(next) => setValue(next)} />}
              {visibleControls.includes("closeIcon") && <OptionSelect label="Close icon" value={closeIcon} items={["", "mdi-close-outline", "mdi-close", "mdi-delete"]} onChange={setCloseIcon} />}
              {visibleControls.includes("icon") && <OptionSelect label="Icon" value={icon} items={["", "mdi-plus", "mdi-vuetify", "mdi-google"]} onChange={setIcon} />}
              {visibleControls.includes("color") && <OptionSelect label="Color" value={color} items={["", "red", "orange", "yellow", "green", "blue", "purple"]} onChange={setColor} />}
            </Stack>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

const usageControlsByTab: Record<string, Array<"close" | "avatar" | "value" | "closeIcon" | "icon" | "color">> = {
  filter: ["close", "avatar", "value", "closeIcon", "icon", "color"],
  label: ["avatar", "value", "closeIcon", "icon", "color"],
  link: ["avatar", "value", "closeIcon", "icon", "color"],
  outlined: ["avatar", "value", "closeIcon", "icon", "color"],
  pill: ["avatar", "value", "closeIcon", "icon", "color"],
};

function ExamplesSection() {
  return (
    <Box component="section">
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Examples
      </Typography>
      <Stack spacing={5.5}>
        {chipExamples.map((example) => (
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
    <Card sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "hidden" }}>
      <Toolbar variant="dense" sx={{ minHeight: 74, alignItems: "center", px: { xs: 3, md: 4 }, bgcolor: "transparent" }}>
        <Typography sx={{ fontSize: { xs: 22, md: 25 }, fontWeight: 500, lineHeight: 1.35 }}>{title}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        {!uninverted && (
          <Tooltip title="Invert example colors">
            <IconButton size="small" aria-label="Invert example colors" onClick={() => setInverted((v) => !v)} sx={exampleIconSx(inverted)}>
              <InvertColors sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="View on Github"><IconButton size="small" aria-label="View on Github" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton size="small" aria-label="View source" aria-expanded={sourceOpen} onClick={() => setSourceOpen((v) => !v)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", maxHeight: { xs: "none", sm: "calc(100vh - 275px)" }, overflowY: "auto", p: 2 }}>
          <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', 'SFMono-Regular', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap", color: "#f8f8f2" }}>{sourceTemplates[source]}</Box>
        </Box>
      </Collapse>
      <Box sx={{ px: { xs: 3, md: 4 }, py: { xs: 3.5, md: 4.25 }, minHeight, bgcolor: effectiveInverted ? "#303030" : "transparent", color: effectiveInverted ? "rgba(255,255,255,.92)" : "inherit", transition: "background-color 180ms ease, color 180ms ease" }}>
        <Typography sx={{ color: effectiveInverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: 16.5, fontWeight: 300, lineHeight: 1.7, mb: 3 }}>{description}</Typography>
        {children(effectiveInverted)}
      </Box>
    </Card>
  );
}

function VChip({ children, color, textColor, left, right, close, closeIcon = "mdi-close", outlined, label, pill, filter, filterIcon, active, size = "default", draggable, ripple = true, disabled, onClose, onClick }: { children: ReactNode; color?: string; textColor?: string; left?: ReactNode; right?: ReactNode; close?: boolean; closeIcon?: string; outlined?: boolean; label?: boolean; pill?: boolean; filter?: boolean; filterIcon?: ReactNode; active?: boolean; size?: ChipSize; draggable?: boolean; ripple?: boolean; disabled?: boolean; onClose?: () => void; onClick?: (event: MouseEvent<HTMLDivElement>) => void }) {
  const [ripples, setRipples] = useState<ButtonRipple[]>([]);
  const sizeMap = {
    "x-small": { h: 20, fs: 11, px: 8, icon: 14, avatar: 20 },
    small: { h: 24, fs: 12, px: 10, icon: 16, avatar: 24 },
    default: { h: 32, fs: 14, px: 12, icon: 18, avatar: 32 },
    large: { h: 44, fs: 16, px: 14, icon: 22, avatar: 44 },
    "x-large": { h: 52, fs: 18, px: 16, icon: 24, avatar: 52 },
  }[size];
  const mapped = color ? colorMap[color] || color : undefined;
  const bg = outlined ? "transparent" : mapped || "#e0e0e0";
  const fg = textColor || (mapped && !outlined && !lightTextColors.has(color || "") ? "#fff" : mapped && outlined ? mapped : "rgba(0,0,0,.87)");
  const hasLeadingVisual = Boolean(left || filter);

  const handleRipple = (event: PointerEvent<HTMLDivElement>) => {
    if (!ripple || disabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const rippleSize = Math.max(rect.width, rect.height) * 1.7;
    const item = { id: window.performance.now(), x: event.clientX - rect.left - rippleSize / 2, y: event.clientY - rect.top - rippleSize / 2, size: rippleSize };
    setRipples((current) => [...current.slice(-2), item]);
    window.setTimeout(() => setRipples((current) => current.filter((r) => r.id !== item.id)), 560);
  };

  return (
    <Box
      draggable={draggable}
      onPointerDown={handleRipple}
      onClick={(event) => {
        if (!disabled) onClick?.(event);
      }}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        height: sizeMap.h,
        minWidth: 0,
        px: `${sizeMap.px}px`,
        pl: hasLeadingVisual ? `${Math.max(4, sizeMap.px - 4)}px` : `${sizeMap.px}px`,
        my: 1,
        mx: 1,
        borderRadius: label ? 1 : pill ? 999 : `${sizeMap.h / 2}px`,
        bgcolor: bg,
        color: fg,
        border: outlined ? `1px solid ${mapped || "currentColor"}` : "1px solid transparent",
        fontSize: sizeMap.fs,
        fontWeight: 400,
        lineHeight: 1,
        verticalAlign: "middle",
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? "default" : draggable ? "grab" : onClick ? "pointer" : "default",
        userSelect: "none",
        boxShadow: "none",
        transition: "background-color 180ms ease, color 180ms ease, opacity 180ms ease, border-color 180ms ease",
        "&:hover": { bgcolor: disabled ? bg : outlined ? "rgba(0,0,0,.04)" : bg },
        "& .MuiSvgIcon-root": { fontSize: sizeMap.icon },
        "& .MuiAvatar-root": {
          width: sizeMap.avatar,
          height: sizeMap.avatar,
          fontSize: sizeMap.fs,
          ml: "-6px",
          mr: "2px",
          color: "inherit",
        },
        "@keyframes chip-ripple": { "0%": { transform: "scale(0)", opacity: 0.18 }, "100%": { transform: "scale(1)", opacity: 0 } },
      }}
    >
      {filter && (
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: active ? sizeMap.icon + 6 : 0,
            mr: active ? 0.75 : 0,
            ml: active ? -0.25 : 0,
            opacity: active ? 1 : 0,
            overflow: "hidden",
            transform: active ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left center",
            transition: "width 220ms cubic-bezier(.4,0,.2,1), margin 220ms cubic-bezier(.4,0,.2,1), opacity 160ms ease, transform 220ms cubic-bezier(.4,0,.2,1)",
          }}
        >
          {filterIcon || <Check />}
        </Box>
      )}
      {left && <Box sx={{ display: "inline-flex", alignItems: "center", mr: 0.75, ml: -0.25 }}>{left}</Box>}
      <Box component="span" sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
      {right && <Box sx={{ display: "inline-flex", alignItems: "center", ml: 0.75, mr: -0.25 }}>{right}</Box>}
      {close && (
        <IconButton size="small" disabled={disabled} onClick={(event) => { event.stopPropagation(); onClose?.(); }} sx={{ ml: 0.55, mr: -0.85, width: 20, height: 20, minWidth: 20, p: 0, color: "inherit", opacity: 0.74, "&:hover": { opacity: 1, bgcolor: "rgba(0,0,0,.10)" }, "&.Mui-disabled": { color: "inherit", opacity: 0.28 } }}>
          {closeIconNode(closeIcon)}
        </IconButton>
      )}
      {ripples.map((r) => <Box key={r.id} component="span" sx={{ position: "absolute", left: r.x, top: r.y, width: r.size, height: r.size, borderRadius: "50%", bgcolor: mapped && !outlined ? "rgba(255,255,255,.34)" : "rgba(0,0,0,.22)", pointerEvents: "none", animation: "chip-ripple 560ms cubic-bezier(.25,.8,.5,1)" }} />)}
    </Box>
  );
}

function ColoredExample() {
  return <Center><VChip>Default</VChip><VChip color="primary">Primary</VChip><VChip color="secondary">Secondary</VChip><VChip color="red">Red Chip</VChip><VChip color="green">Green Chip</VChip></Center>;
}

function IconExample() {
  return (
    <Center>
      <VChip color="indigo" left={<AccountCircle />}>Ranee</VChip>
      <VChip color="orange" right={<Star />}>Premium</VChip>
      <VChip color="primary" right={<Cake />}>1 Year</VChip>
      <VChip color="green" left={<Avatar sx={{ width: 24, height: 24, bgcolor: "#1b5e20", color: "#fff", fontSize: 13 }}>1</Avatar>}>Years</VChip>
      <VChip color="teal" close left={<CheckCircle />} onClose={() => window.alert("Chip close clicked")}>Confirmed</VChip>
      <VChip color="teal" close closeIcon="mdi-delete" left={<CheckCircle />} onClose={() => window.alert("Chip close clicked")}>Confirmed</VChip>
    </Center>
  );
}

function OutlinedExample() {
  return <Center><VChip color="success" outlined left={<Storage />}>Server Status</VChip><VChip color="primary" outlined pill right={<AccountCircleOutlined />}>User Account</VChip><VChip color="deep-purple accent-4" outlined left={<Build />}>Update Settings</VChip><VChip color="indigo darken-3" outlined close left={<LocalFireDepartment />}>New Posts Available</VChip></Center>;
}

function LabelExample() {
  return <Center><VChip label>Label</VChip><VChip color="pink" label left={<Label />}>Tags</VChip><VChip color="primary" label left={<AccountCircleOutlined />}>John Leider</VChip><VChip color="cyan" label close left={<Twitter />}>New Tweets</VChip></Center>;
}

function SizesExample() {
  return <Center><VChip size="x-small">x-small chip</VChip><VChip size="small">small chip</VChip><VChip>Default</VChip><VChip size="large">large chip</VChip><VChip size="x-large">x-large chip</VChip></Center>;
}

function FilterExample() {
  const [active, setActive] = useState(false);
  return <Center><VChip filter active={active}>I&apos;m v-chip</VChip><VChip filter active={active} filterIcon={<Add />}>I&apos;m v-chip</VChip><VChip filter active={active} filterIcon={<RemoveIcon />}>I&apos;m v-chip</VChip><ToggleLine label="Active" checked={active} onChange={setActive} /></Center>;
}

function ClosableExample() {
  const [chips, setChips] = useState([true, true, true, true]);
  const closeChip = (index: number) => {
    setChips((current) => current.map((chip, chipIndex) => (chipIndex === index ? false : chip)));
  };

  if (chips.every((chip) => !chip)) {
    return (
      <Center>
        <Button
          variant="contained"
          onClick={() => setChips([true, true, true, true])}
          sx={{
            minWidth: 106,
            height: 36,
            px: 2,
            borderRadius: 1,
            bgcolor: "#0097a7",
            color: "#fff",
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: 0,
            textTransform: "uppercase",
            boxShadow: "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)",
            "&:hover": { bgcolor: "#00838f", boxShadow: "0px 2px 4px -1px rgba(0,0,0,.2), 0px 4px 5px 0px rgba(0,0,0,.14), 0px 1px 10px 0px rgba(0,0,0,.12)" },
          }}
        >
          Reset Chips
        </Button>
      </Center>
    );
  }

  return (
    <Center>
      {chips[0] && <VChip close onClose={() => closeChip(0)}>Closable</VChip>}
      {chips[1] && <VChip close color="red" onClose={() => closeChip(1)}>Remove</VChip>}
      {chips[2] && <VChip close color="green" outlined onClose={() => closeChip(2)}>Success</VChip>}
      {chips[3] && <VChip close color="orange" label outlined onClose={() => closeChip(3)}>Complete</VChip>}
    </Center>
  );
}

function ActionChipsExample() {
  return (
    <Card sx={{ maxWidth: 450, mx: "auto", boxShadow: "0 2px 4px rgba(0,0,0,.18)", overflow: "hidden" }}>
      <Box sx={{ height: 253, backgroundImage: "url(/static/doc-images/cards/house.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} />
      <Box sx={{ p: 2 }}><Typography sx={{ fontSize: 34, mb: 1 }}>Welcome Home...</Typography><Typography sx={{ fontSize: 20, color: "text.secondary" }}>Monday, 12:30 PM, Mostly Sunny</Typography></Box>
      <Stack direction="row" alignItems="center" sx={{ px: 2, color: "text.secondary" }}><Avatar src="https://cdn.vuetifyjs.com/images/weather/part-cloud-48px.png" sx={{ width: 24, height: 24, mr: 2 }} /><span>81° / 62°</span></Stack>
      <Divider sx={{ mt: 3, mx: 2 }} />
      <Box sx={{ p: 2 }}><VChip left={<WbSunny />} onClick={() => window.alert("Toggling lights...")}>Turn on Lights</VChip><VChip left={<AlarmOn />} onClick={() => window.alert("Turning on alarm...")}>Set alarm</VChip><VChip left={<FilterList />} onClick={() => window.alert("Toggling Blinds...")}>Close blinds</VChip></Box>
    </Card>
  );
}

function InSelectsExample() {
  const [chips, setChips] = useState(["Programming", "Playing video games", "Watching movies", "Sleeping"]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const items = ["Streaming", "Eating"];
  const inputRef = useRef<HTMLInputElement | null>(null);
  const add = (value: string) => {
    const next = value.trim();
    if (!next || chips.includes(next)) return;
    setChips([...chips, next]);
    setInput("");
    setOpen(false);
  };
  const remove = (item: string) => {
    setChips((current) => current.filter((chip) => chip !== item));
    if (selectedChip === item) setSelectedChip(null);
  };
  const available = items.filter((item) => !chips.includes(item) && item.toLowerCase().includes(input.toLowerCase()));

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", position: "relative" }}>
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <FilterList sx={{ color: "rgba(0,0,0,.54)", mt: 2.2, mr: 2, fontSize: 24 }} />
        <Box sx={{ position: "relative", flex: 1 }}>
          <Box
            onClick={() => {
              setOpen(true);
              inputRef.current?.focus();
            }}
            sx={{
              minHeight: 56,
              bgcolor: "#fff",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              px: 1.5,
              pt: chips.length ? 0.75 : 0,
              pb: chips.length ? 0.75 : 0,
              pr: 6.5,
              cursor: "text",
              boxShadow: "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)",
              transition: "box-shadow 180ms ease",
              "&:focus-within": {
                boxShadow: "0px 5px 5px -3px rgba(0,0,0,.2), 0px 8px 10px 1px rgba(0,0,0,.14), 0px 3px 14px 2px rgba(0,0,0,.12)",
              },
            }}
          >
            {chips.map((chip) => (
              <VChip
                key={chip}
                close
                active={selectedChip === chip}
                filter={selectedChip === chip}
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedChip(chip);
                }}
                onClose={() => remove(chip)}
              >
                <strong>{chip}</strong>&nbsp;<span>(interest)</span>
              </VChip>
            ))}
            <Box sx={{ position: "relative", flex: "1 1 160px", minWidth: 120, height: 42, display: "flex", alignItems: "center" }}>
              {!chips.length && !input && (
                <Typography component="span" sx={{ position: "absolute", left: 0, color: "rgba(0,0,0,.54)", fontSize: 16, pointerEvents: "none" }}>
                  Your favorite hobbies
                </Typography>
              )}
              <Box
                component="input"
                ref={inputRef}
                value={input}
                onFocus={() => setOpen(true)}
                onBlur={() => window.setTimeout(() => setOpen(false), 130)}
                onChange={(event) => {
                  setInput(event.target.value);
                  setOpen(true);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    add(input);
                  }
                  if (event.key === "Backspace" && !input && chips.length) {
                    remove(chips[chips.length - 1]);
                  }
                }}
                sx={{ width: "100%", height: 32, border: 0, outline: 0, bgcolor: "transparent", color: "rgba(0,0,0,.87)", font: "inherit", fontSize: 16, p: 0 }}
              />
            </Box>
            {!!chips.length && (
              <IconButton
                aria-label="Clear"
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                  setChips([]);
                  setSelectedChip(null);
                  setInput("");
                  inputRef.current?.focus();
                }}
                sx={{ position: "absolute", right: 30, top: "50%", transform: "translateY(-50%)", width: 24, height: 24, color: "rgba(0,0,0,.54)" }}
              >
                <Close sx={{ fontSize: 18 }} />
              </IconButton>
            )}
            <Box sx={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-42%)", width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "6px solid rgba(0,0,0,.54)" }} />
          </Box>
          {open && available.length > 0 && (
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "calc(100% + 2px)",
                zIndex: 5,
                bgcolor: "#fff",
                borderRadius: 1,
                py: 1,
                boxShadow: "0px 5px 5px -3px rgba(0,0,0,.2), 0px 8px 10px 1px rgba(0,0,0,.14), 0px 3px 14px 2px rgba(0,0,0,.12)",
              }}
            >
              {available.map((item) => (
                <Button
                  key={item}
                  fullWidth
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => add(item)}
                  sx={{ justifyContent: "flex-start", minHeight: 48, px: 2, color: "rgba(0,0,0,.87)", textTransform: "none", fontSize: 16, fontWeight: 400, borderRadius: 0, "&:hover": { bgcolor: "rgba(0,0,0,.04)" } }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

function PhotosExample() {
  const items = [{ text: "Nature", icon: <Nature /> }, { text: "Nightlife", icon: <WineBar /> }, { text: "November", icon: <CalendarMonth /> }, { text: "Portland", icon: <Map /> }, { text: "Biking", icon: <DirectionsBike /> }];
  const [selected, setSelected] = useState<typeof items>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const input = useRef<HTMLInputElement | null>(null);
  const filtered = items.filter((item) => !selected.includes(item) && item.text.toLowerCase().includes(search.toLowerCase()));
  const allSelected = selected.length === items.length;
  const next = () => {
    setLoading(true);
    window.setTimeout(() => { setSelected([]); setSearch(""); setLoading(false); }, 2000);
  };
  return (
    <Card sx={{ maxWidth: 500, mx: "auto", boxShadow: "0 2px 4px rgba(0,0,0,.18)" }}>
      <Toolbar sx={{ bgcolor: "transparent" }}><IconButton><ViewModule /></IconButton><Typography sx={{ fontSize: 20 }}>Photo Info</Typography><Box sx={{ flexGrow: 1 }} /><IconButton onClick={() => input.current?.focus()}><Search /></IconButton></Toolbar>
      <Box sx={{ px: 2, pb: 1 }}>{selected.map((item) => <VChip key={item.text} close disabled={loading} left={item.icon} onClose={() => setSelected(selected.filter((sel) => sel !== item))}>{item.text}</VChip>)}{!allSelected && <TextField inputRef={input} fullWidth variant="standard" label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />}</Box>
      {!allSelected && <Divider />}
      <Stack>{filtered.map((item) => <Button key={item.text} disabled={loading} onClick={() => { setSelected([...selected, item]); setSearch(""); }} sx={{ justifyContent: "flex-start", color: "text.primary", minHeight: 52, px: 2, textTransform: "none" }}><Box sx={{ width: 40, display: "flex" }}>{item.icon}</Box>{item.text}</Button>)}</Stack>
      <Divider />
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}><Button disabled={!selected.length || loading} onClick={next} sx={{ color: "#9c27b0" }}>{loading ? "Loading..." : "Next"}</Button></Box>
    </Card>
  );
}

function FilteringExample() {
  const [search, setSearch] = useState("");
  const items = [
    { image: "https://picsum.photos/500/300?image=395", title: "TBI’s 5 Best: SF Mocktails to Finish Dry January Strong", category: "Travel", keyword: "Drinks" },
    { image: "https://picsum.photos/500/300?image=504", title: "PWAs on iOS 12.2 beta: the good, the bad, and the “not sure yet if good”", category: "Technology", keyword: "Phones" },
    { image: "https://picsum.photos/500/300?image=454", title: "How to Get Media Mentions for Your Business", category: "Media", keyword: "Social" },
    { image: "https://picsum.photos/500/300?image=445", title: "The Pitfalls Of Outsourcing Self-Awareness To Artificial Intelligence", category: "Technology", keyword: "Military" },
    { image: "https://picsum.photos/500/300?image=42", title: "Degrees of Freedom and Sudoko", category: "Travel", keyword: "Social" },
  ];
  const searching = search ? items.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())) : items;
  const keywords = search ? searching.map((item) => item.keyword) : [];
  return (
    <Card sx={{ maxWidth: 450, mx: "auto", mt: 2, boxShadow: "0 2px 4px rgba(0,0,0,.18)" }}>
      <Box sx={{ height: 24, bgcolor: "#f5f5f5" }} />
      <Toolbar sx={{ bgcolor: "transparent" }}><IconButton><ArrowBack /></IconButton><TextField fullWidth variant="standard" label="Search News" value={search} onChange={(e) => setSearch(e.target.value)} InputProps={{ endAdornment: <Search /> }} /></Toolbar>
      <Box sx={{ px: 2, py: 0 }}>{keywords.map((keyword, index) => <VChip key={`${keyword}-${index}`}>{keyword}</VChip>)}</Box>
      <Stack>{searching.map((item) => <Box key={item.title} sx={{ display: "flex", minHeight: 86, p: 2, cursor: "pointer", "&:hover": { bgcolor: "rgba(0,0,0,.04)" } }}><Box component="img" src={item.image} sx={{ width: 64, height: 48, objectFit: "cover", mr: 2 }} /><Box><Typography sx={{ textTransform: "uppercase", fontSize: 12, color: "text.secondary" }}>{item.category}</Typography><Typography>{item.title}</Typography></Box></Box>)}</Stack>
    </Card>
  );
}

function ExpandableExample() {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <Card sx={{ maxWidth: 400, mx: "auto", boxShadow: "0 2px 4px rgba(0,0,0,.18)" }}>
      <Box sx={{ height: 24, bgcolor: "#f5f5f5" }} />
      <Stack direction="row" alignItems="center" sx={{ px: 3, py: 1.5 }}><Typography sx={{ mr: 2 }}>To</Typography><VChip pill left={<Avatar src="https://cdn.vuetifyjs.com/images/john.png" sx={{ width: 24, height: 24 }} />} onClick={(e) => setAnchor(e.currentTarget as HTMLElement)}>John Leider</VChip></Stack>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)} PaperProps={{ sx: { width: 300, mt: 1 } }}>
        <Box sx={{ bgcolor: "#424242", color: "#fff", display: "flex", alignItems: "center", p: 2 }}><Avatar src="https://cdn.vuetifyjs.com/images/john.png" sx={{ mr: 2 }} /><Box sx={{ flexGrow: 1 }}><Typography>John Leider</Typography><Typography sx={{ color: "rgba(255,255,255,.7)", fontSize: 14 }}>john@vuetifyjs.com</Typography></Box><IconButton onClick={() => setAnchor(null)} sx={{ color: "#fff" }}><Close /></IconButton></Box>
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}><Work sx={{ mr: 2 }} /><Typography color="text.secondary">john@gmail.com</Typography></Box>
      </Menu>
      <Divider />
      <TextField fullWidth variant="standard" defaultValue="Re: Vacation Request" label="Subject" sx={{ px: 2, pt: 1 }} />
      <TextField fullWidth multiline minRows={4} variant="standard" label="Message" sx={{ px: 2, pb: 2 }} />
    </Card>
  );
}

function Center({ children }: { children: ReactNode }) {
  return <Box sx={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 0 }}>{children}</Box>;
}

function ToggleLine({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><Typography sx={{ fontSize: 14 }}>{label}</Typography><Switch checked={checked} onChange={(e) => onChange(e.target.checked)} sx={vuseSwitchSx} /></Box>;
}

function OptionToggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <Box sx={{ px: 1.5, pb: 0, minHeight: 54, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Typography sx={{ fontSize: 16, color: "text.secondary" }}>{label}</Typography>
      <Switch
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        sx={{
          width: 50,
          height: 34,
          p: 0.75,
          "& .MuiSwitch-switchBase": { p: 1, color: "#fff", "&.Mui-checked": { transform: "translateX(16px)", color: "#fff" } },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: "#0097a7", opacity: 1 },
          "& .MuiSwitch-thumb": { width: 16, height: 16, boxShadow: "0 1px 3px rgba(0,0,0,.28)" },
          "& .MuiSwitch-track": { borderRadius: 20, bgcolor: "rgba(0,0,0,.32)", opacity: 1 },
        }}
      />
    </Box>
  );
}

function OptionSelect({ label, value, items, onChange }: { label: string; value: string; items: string[]; onChange: (value: string) => void }) {
  return (
    <Box sx={{ px: 1.5, pb: 1.5, position: "relative" }}>
      <TextField
        select
        fullWidth
        SelectProps={{ native: true }}
        label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        variant="filled"
        size="small"
        sx={{
          "& .MuiFilledInput-root": {
            minHeight: 48,
            bgcolor: "rgba(0,0,0,.04)",
            borderRadius: "4px 4px 0 0",
            boxShadow: "none",
            "&:before": { borderColor: "rgba(0,0,0,.42)" },
            "&:after": { borderColor: "#0097a7" },
            "&:hover": { bgcolor: "rgba(0,0,0,.06)" },
          },
          "& .MuiInputLabel-root": { fontSize: 16 },
          "& select": { pt: "20px", pb: "6px" },
        }}
      >
        {items.map((item) => <option key={item || "empty"} value={item}>{item}</option>)}
      </TextField>
      {value && (
        <IconButton
          size="small"
          aria-label={`Clear ${label}`}
          onClick={() => onChange("")}
          sx={{
            position: "absolute",
            right: 34,
            top: 8,
            width: 24,
            height: 24,
            color: "text.secondary",
            zIndex: 2,
            "&:hover": { bgcolor: "rgba(0,0,0,.08)" },
          }}
        >
          <Close sx={{ fontSize: 16 }} />
        </IconButton>
      )}
    </Box>
  );
}

function SelectLine({ label, value, items, onChange }: { label: string; value: string; items: string[]; onChange: (value: string) => void }) {
  return <TextField select SelectProps={{ native: true }} label={label} value={value} onChange={(e) => onChange(e.target.value)} size="small">{items.map((item) => <option key={item} value={item}>{item}</option>)}</TextField>;
}

function iconNode(name: string) {
  if (name === "mdi-plus") return <Add />;
  if (name === "mdi-vuetify") return <VuetifyGlyph />;
  if (name === "mdi-google") return <Google />;
  return null;
}

function closeIconNode(name: string) {
  if (name === "mdi-delete") return <Delete sx={{ fontSize: 16 }} />;
  if (name === "mdi-close-outline") return <HighlightOff sx={{ fontSize: 18 }} />;
  return <Close sx={{ fontSize: 16 }} />;
}

function VuetifyGlyph() {
  return (
    <Box
      component="span"
      sx={{
        width: 18,
        height: 18,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        color: "currentColor",
        "&::before": {
          content: '""',
          position: "absolute",
          width: 0,
          height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: "15px solid currentColor",
          opacity: 0.95,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 4,
          width: 0,
          height: 0,
          borderLeft: "4px solid transparent",
          borderRight: "4px solid transparent",
          borderTop: "7px solid rgba(255,255,255,.78)",
        },
      }}
    />
  );
}

function RemoveIcon() {
  return <Box component="span" sx={{ width: 14, height: 2, bgcolor: "currentColor", display: "inline-block" }} />;
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ mx: 0.25, px: 0.6, py: 0.2, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "85%" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 32, height: 32, ml: 0.75, color: active ? "#0097a7" : "text.secondary", bgcolor: "background.paper", boxShadow: active ? neuInset : "-3px -3px 4px rgba(255,255,255,.72), 3px 3px 5px rgba(174,174,192,.24)", "&:hover": { bgcolor: "background.paper", color: "#0097a7" } };
}

const vuseSwitchSx = { "& .MuiSwitch-switchBase.Mui-checked": { color: "#0097a7" }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: "#0097a7" } };
const colorMap: Record<string, string> = { primary: "#0097a7", secondary: "#424242", red: "#f44336", orange: "#fb8c00", yellow: "#fbc02d", green: "#4caf50", blue: "#2196f3", purple: "#9c27b0", indigo: "#3f51b5", teal: "#009688", cyan: "#00bcd4", pink: "#e91e63", success: "#4caf50", "deep-purple accent-4": "#6200ea", "indigo darken-3": "#283593" };
const lightTextColors = new Set(["yellow"]);

const chipExamples: ChipExample[] = [
  { title: "Colored", description: "Any color from the Material Design palette can be used to change a chips color.", source: "colored", minHeight: 190, render: () => <ColoredExample /> },
  { title: "Icon", description: "Chips can use text or any icon available in the Material Icons font library.", source: "icon", minHeight: 210, render: () => <IconExample /> },
  { title: "Outlined", description: "Outlined chips inherit their border color from the current text color.", source: "outlined", minHeight: 190, render: () => <OutlinedExample /> },
  { title: "Label", description: <>Label chips use the <CodePill>v-card</CodePill> border-radius.</>, source: "label", minHeight: 190, render: () => <LabelExample /> },
  { title: "Sizes", description: <><CodePill>v-chip</CodePill> component can have various sizes from <CodePill>x-small</CodePill> to <CodePill>x-large</CodePill>.</>, source: "sizes", minHeight: 180, render: () => <SizesExample /> },
  { title: "Draggable", description: <><CodePill>draggable</CodePill> <CodePill>v-chip</CodePill> component can be dragged by mouse.</>, source: "draggable", minHeight: 150, render: () => <Center><VChip draggable>Default</VChip></Center> },
  { title: "Filter", description: <><CodePill>v-chip</CodePill> component has <CodePill>filter</CodePill> option which shows an additional icon to you if chip is active. It can be customized using <CodePill>filter-icon</CodePill>.</>, source: "filter", minHeight: 180, render: () => <FilterExample /> },
  { title: "No ripple", description: <><CodePill>v-chip</CodePill> can be rendered without ripple if <CodePill>ripple</CodePill> prop is set to <CodePill>false</CodePill>.</>, source: "noRipple", minHeight: 150, render: () => <Center><VChip ripple={false}>Default</VChip></Center> },
  { title: "Closable", description: <>Closable chips can be controlled with a v-model. You can also listen to the <CodePill>click:close</CodePill> event if you want to know when a chip has been closed.</>, source: "closable", minHeight: 190, uninverted: true, render: () => <ClosableExample /> },
  { title: "Action chips", description: <>Chips can be used as actionable items. Provided with a <em>click</em> event, the chip becomes interactive and can invoke methods.</>, source: "actions", minHeight: 540, render: () => <ActionChipsExample /> },
  { title: "In selects", description: "Selects can use chips to display the selected data. Try adding your own tags below.", source: "selects", minHeight: 260, uninverted: true, render: () => <InSelectsExample /> },
  { title: "Custom lists", description: "In this example we opt to use a customized list instead of v-autocomplete. This allows us to always display the options available while still providing the same functionality of search and selection.", source: "photos", minHeight: 520, render: () => <PhotosExample /> },
  { title: "Additional filtering", description: "Chips are great for providing supplementary actions to a particular task. In this instance, we are searching a list of items and collecting a subset of information to display available keywords.", source: "filtering", minHeight: 640, render: () => <FilteringExample /> },
  { title: "Expandable", description: <>Chips can be combined with <CodePill>v-menu</CodePill> to enable a specific set of actions for a chip.</>, source: "expandable", minHeight: 430, render: () => <ExpandableExample /> },
];

const sourceTemplates = {
  colored: `<v-chip class="ma-2">Default</v-chip>\n<v-chip class="ma-2" color="primary">Primary</v-chip>\n<v-chip class="ma-2" color="red" text-color="white">Red Chip</v-chip>`,
  icon: `<v-chip color="indigo" text-color="white"><v-avatar left><v-icon>mdi-account-circle</v-icon></v-avatar>Ranee</v-chip>`,
  outlined: `<v-chip color="success" outlined><v-icon left>mdi-server-plus</v-icon>Server Status</v-chip>`,
  label: `<v-chip color="pink" label text-color="white"><v-icon left>mdi-label</v-icon>Tags</v-chip>`,
  sizes: `<v-chip x-small>x-small chip</v-chip>\n<v-chip small>small chip</v-chip>\n<v-chip large>large chip</v-chip>`,
  draggable: `<v-chip draggable>Default</v-chip>`,
  filter: `<v-chip :input-value="active" filter>I'm v-chip</v-chip>\n<v-switch v-model="active" label="Active"></v-switch>`,
  noRipple: `<v-chip :ripple="false">Default</v-chip>`,
  closable: `<v-chip v-if="chip1" close @click:close="chip1 = false">Closable</v-chip>`,
  actions: `<v-chip @click="lights"><v-icon left>mdi-brightness-5</v-icon>Turn on Lights</v-chip>`,
  selects: `<v-combobox v-model="chips" :items="items" chips clearable label="Your favorite hobbies" multiple prepend-icon="filter_list" solo>...</v-combobox>`,
  photos: `<v-card max-width="500"><v-toolbar flat color="transparent">Photo Info</v-toolbar><v-chip close v-for="selection in selections">...</v-chip></v-card>`,
  filtering: `<v-card max-width="450"><v-text-field v-model="search" label="Search News"></v-text-field><v-chip v-for="keyword in keywords">{{ keyword }}</v-chip></v-card>`,
  expandable: `<v-menu v-model="menu" bottom right><template v-slot:activator="{ on }"><v-chip pill v-on="on">John Leider</v-chip></template></v-menu>`,
};
