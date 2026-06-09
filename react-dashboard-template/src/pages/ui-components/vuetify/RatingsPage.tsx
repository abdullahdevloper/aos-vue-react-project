import "@mdi/font/css/materialdesignicons.css";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import {
  mdiCircleOutline,
  mdiCloseCircleOutline,
  mdiEmail,
  mdiHeart,
  mdiHeartHalfFull,
  mdiHeartOutline,
  mdiNumeric0Box,
  mdiNumeric1Box,
  mdiNumeric2Box,
  mdiNumeric3Box,
  mdiNumeric4Box,
  mdiNumeric5Box,
  mdiNumeric6Box,
  mdiNumeric7Box,
  mdiNumeric8Box,
  mdiNumeric9Box,
  mdiShareVariant,
  mdiStar,
  mdiStarCircle,
  mdiStarHalf,
  mdiStarOutline,
} from "@mdi/js";
import {
  Box,
  Button,
  Card,
  Collapse,
  Dialog,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Slider,
  Switch,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Code, GitHub, InvertColors, Star } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";

type ExampleKey =
  | "usage"
  | "playground"
  | "simple/sizes"
  | "simple/colors"
  | "simple/length"
  | "intermediate/increments"
  | "intermediate/slots"
  | "intermediate/card"
  | "complex/advanced";

type RatingSlotProps = {
  index: number;
  value: number;
  isFilled: boolean;
  isHalfFilled?: boolean;
  isHovered: boolean;
  isHalfHovered?: boolean;
  click: (event: MouseEvent<HTMLElement>) => void;
};

function colorValue(color?: string) {
  switch (color) {
    case "primary":
      return primary;
    case "accent":
      return "#82b1ff";
    case "warning":
      return "#fb8c00";
    case "warning lighten-1":
      return "#ffa726";
    case "green":
      return "#4caf50";
    case "green lighten-2":
      return "#81c784";
    case "green lighten-3":
      return "#a5d6a7";
    case "red":
      return "#f44336";
    case "red lighten-2":
      return "#e57373";
    case "red lighten-3":
      return "#ef9a9a";
    case "red darken-4":
      return "#b71c1c";
    case "blue":
      return "#2196f3";
    case "blue darken-4":
      return "#0d47a1";
    case "error":
      return "#ff5252";
    case "teal":
      return "#009688";
    case "cyan":
      return "#00bcd4";
    case "cyan lighten-2":
      return "#4dd0e1";
    case "purple":
      return "#9c27b0";
    case "purple lighten-3":
      return "#ce93d8";
    case "purple darken-4":
      return "#4a148c";
    case "pink":
      return "#e91e63";
    case "pink lighten-3":
      return "#f48fb1";
    case "orange":
      return "#ff9800";
    case "orange lighten-3":
      return "#ffcc80";
    case "indigo":
      return "#3f51b5";
    case "indigo lighten-3":
      return "#9fa8da";
    case "yellow darken-3":
      return "#f9a825";
    case "yellow accent-4":
      return "#ffd600";
    case "grey":
      return "#9e9e9e";
    case "grey lighten-1":
      return "#bdbdbd";
    case "grey lighten-2":
      return "#e0e0e0";
    case "grey darken-1":
      return "#757575";
    case "white":
      return "#fff";
    case "#eee":
      return "#eee";
    default:
      return color || primary;
  }
}

function iconName(icon: string) {
  if (icon === "$ratingFull") return "mdi-star";
  if (icon === "$ratingEmpty") return "mdi-star-outline";
  if (icon === "$ratingHalf") return "mdi-star-half";
  return icon;
}

const numericPaths = [
  mdiNumeric0Box,
  mdiNumeric1Box,
  mdiNumeric2Box,
  mdiNumeric3Box,
  mdiNumeric4Box,
  mdiNumeric5Box,
  mdiNumeric6Box,
  mdiNumeric7Box,
  mdiNumeric8Box,
  mdiNumeric9Box,
];

function iconPath(icon: string) {
  const name = iconName(icon);
  const numeric = /^mdi-numeric-(\d)-box$/.exec(name);
  if (numeric) return numericPaths[Number(numeric[1])];

  switch (name) {
    case "mdi-star":
      return mdiStar;
    case "mdi-star-outline":
      return mdiStarOutline;
    case "mdi-star-half":
      return mdiStarHalf;
    case "mdi-heart":
      return mdiHeart;
    case "mdi-heart-outline":
      return mdiHeartOutline;
    case "mdi-heart-half-full":
      return mdiHeartHalfFull;
    case "mdi-star-circle":
      return mdiStarCircle;
    case "mdi-circle-outline":
      return mdiCircleOutline;
    case "mdi-share-variant":
      return mdiShareVariant;
    case "mdi-close-circle-outline":
      return mdiCloseCircleOutline;
    case "mdi-email":
      return mdiEmail;
    default:
      return "";
  }
}

function VIcon({
  icon,
  color,
  size,
  onClick,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
  sx,
}: {
  icon: string;
  color?: string;
  size?: number;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
  onMouseMove?: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLElement>) => void;
  sx?: object;
}) {
  const path = iconPath(icon);
  const resolvedIcon = iconName(icon);

  return (
    <Box
      component={onClick ? "button" : "i"}
      className={`v-icon notranslate ${path ? "v-icon--svg" : `mdi ${resolvedIcon}`}${onClick ? " v-icon--link" : ""}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      sx={{
        alignItems: "center",
        appearance: "none",
        bgcolor: "transparent",
        border: 0,
        color: color ? colorValue(color) : "inherit",
        cursor: onClick ? "pointer" : "inherit",
        display: "inline-flex",
        fontFeatureSettings: "'liga'",
        fontSize: size ?? 24,
        height: "auto",
        justifyContent: "center",
        letterSpacing: "normal",
        lineHeight: 1,
        m: 0,
        outline: "none",
        position: "relative",
        textDecoration: "none",
        textIndent: 0,
        transition: ".3s cubic-bezier(.25,.8,.5,1), visibility 0s",
        userSelect: "none",
        verticalAlign: "middle",
        width: "auto",
        ...sx,
      }}
    >
      {path && (
        <Box
          component="svg"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
          sx={{
            display: "block",
            fill: "currentColor",
            flex: "0 0 auto",
            height: size ?? 24,
            width: size ?? 24,
          }}
        >
          <path d={path} />
        </Box>
      )}
    </Box>
  );
}

function ratingSize({ small, medium, large, xLarge, size }: { small?: boolean; medium?: boolean; large?: boolean; xLarge?: boolean; size?: number }) {
  if (size != null) return size;
  if (small) return 16;
  if (medium) return 24;
  if (large) return 36;
  if (xLarge) return 40;
  return 24;
}

function VRating({
  value,
  onChange,
  backgroundColor = "accent",
  color = "primary",
  clearable = false,
  dense = false,
  emptyIcon = "$ratingEmpty",
  fullIcon = "$ratingFull",
  halfIcon = "$ratingHalf",
  halfIncrements = false,
  hover = false,
  length = 5,
  readonly = false,
  size,
  small,
  medium,
  large,
  xLarge,
  item,
}: {
  value: number;
  onChange?: (value: number) => void;
  backgroundColor?: string;
  color?: string;
  clearable?: boolean;
  dense?: boolean;
  emptyIcon?: string;
  fullIcon?: string;
  halfIcon?: string;
  halfIncrements?: boolean;
  hover?: boolean;
  length?: number;
  readonly?: boolean;
  size?: number;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  xLarge?: boolean;
  item?: (props: RatingSlotProps) => ReactNode;
}) {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const isHovering = hover && hoverIndex >= 0;
  const iconSize = ratingSize({ small, medium, large, xLarge, size });

  function isHalfEvent(event: MouseEvent<HTMLElement>) {
    if (!halfIncrements) return false;
    const rect = event.currentTarget.getBoundingClientRect();
    return event.clientX - rect.left < rect.width / 2;
  }

  function genHoverIndex(event: MouseEvent<HTMLElement>, index: number) {
    return index + (isHalfEvent(event) ? 0.5 : 1);
  }

  function createProps(index: number): RatingSlotProps {
    const props: RatingSlotProps = {
      index,
      value,
      click: (event) => {
        if (readonly) return;
        const newValue = genHoverIndex(event, index);
        onChange?.(clearable && value === newValue ? 0 : newValue);
      },
      isFilled: Math.floor(value) > index,
      isHovered: Math.floor(hoverIndex) > index,
    };

    if (halfIncrements) {
      props.isHalfHovered = !props.isHovered && (hoverIndex - index) % 1 > 0;
      props.isHalfFilled = !props.isFilled && (value - index) % 1 > 0;
    }

    return props;
  }

  function getIcon(props: RatingSlotProps) {
    const isFull = isHovering ? props.isHovered : props.isFilled;
    const isHalf = isHovering ? props.isHalfHovered : props.isHalfFilled;
    return isFull ? fullIcon : isHalf ? halfIcon : emptyIcon;
  }

  function getColor(props: RatingSlotProps) {
    if (isHovering) {
      if (props.isHovered || props.isHalfHovered) return color;
    } else if (props.isFilled || props.isHalfFilled) {
      return color;
    }
    return backgroundColor;
  }

  return (
    <Box
      className={`v-rating${readonly ? " v-rating--readonly" : ""}${dense ? " v-rating--dense" : ""}`}
      sx={{
        maxWidth: "100%",
        whiteSpace: "nowrap",
        "& .v-icon": {
          borderRadius: "50%",
          outline: "none",
          overflow: "hidden",
          p: "0.5rem",
          userSelect: "none",
          "&::after": { display: "none" },
          "&::before": { lineHeight: 1 },
        },
        "&.v-rating--readonly .v-icon": { pointerEvents: "none" },
        "&.v-rating--dense .v-icon": { p: "0.1rem" },
        "& .v-icon--link:active": { bgcolor: "rgba(0,0,0,.08)" },
      }}
    >
      {Array.from({ length }, (_, index) => {
        const props = createProps(index);
        const listeners = hover && !readonly
          ? {
              onMouseEnter: (event: MouseEvent<HTMLElement>) => setHoverIndex(genHoverIndex(event, index)),
              onMouseMove: halfIncrements ? (event: MouseEvent<HTMLElement>) => setHoverIndex(genHoverIndex(event, index)) : undefined,
              onMouseLeave: () => setHoverIndex(-1),
            }
          : {};
        return (
          <Box key={index} component="span" sx={{ display: "inline-flex", verticalAlign: "middle" }}>
            {item ? (
              item(props)
            ) : (
              <VIcon icon={getIcon(props)} color={getColor(props)} size={iconSize} onClick={props.click} {...listeners} />
            )}
          </Box>
        );
      })}
    </Box>
  );
}

function VuetifyExampleBlock({ title, description, source, children }: { title: string; description: ReactNode; source: ExampleKey; children: () => ReactNode }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card sx={{ mb: 5, bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
        <Typography sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>{title}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", overflowX: "auto", p: 2 }}>
          <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box>
        </Box>
      </Collapse>
      <Box sx={{ bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", p: 2, overflow: "visible" }}>
        {description && <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography>}
        <Box data-app="true" sx={{ overflow: "visible" }}>{children()}</Box>
      </Box>
    </Card>
  );
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: 0.55, py: 0.18, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: 0.5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

function UsageExample() {
  const [rating, setRating] = useState(3);
  return <Box sx={{ textAlign: "center" }}><VRating value={rating} onChange={setRating} /></Box>;
}

function PlaygroundExample() {
  const [emptyIcon, setEmptyIcon] = useState("mdi-heart-outline");
  const [fullIcon, setFullIcon] = useState("mdi-heart");
  const [halfIcon, setHalfIcon] = useState("mdi-heart-half-full");
  const [halfIncrements, setHalfIncrements] = useState(false);
  const [hover, setHover] = useState(true);
  const [length, setLength] = useState(5);
  const [rating, setRating] = useState(2);
  const [readonly, setReadonly] = useState(false);
  const [size, setSize] = useState(64);
  const [dense, setDense] = useState(false);
  const [color, setColor] = useState("red lighten-3");
  const [bgColor, setBgColor] = useState("grey lighten-1");
  const colors = ["primary", "warning", "green", "red", "blue", "error", "teal", "red lighten-3"];
  const bgColors = ["grey lighten-2", "warning lighten-1", "green lighten-2", "red lighten-2", "grey", "#eee", "cyan lighten-2", "grey lighten-1"];

  return (
    <Box sx={{ textAlign: "center" }}>
      <PlayTextField label="Full icon" value={fullIcon} onChange={setFullIcon} />
      <PlayTextField label="Half icon" value={halfIcon} onChange={setHalfIcon} disabled={!halfIncrements} />
      <PlayTextField label="Empty icon" value={emptyIcon} onChange={setEmptyIcon} />
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <PlaySwitch label="Half increments" checked={halfIncrements} onChange={setHalfIncrements} />
        <PlaySwitch label="Hover" checked={hover} onChange={setHover} />
        <PlaySwitch label="Readonly" checked={readonly} onChange={setReadonly} />
        <PlaySwitch label="Dense" checked={dense} onChange={setDense} />
      </Box>
      <PlaySlider label="Custom length" value={length} min={1} max={15} color="red darken-4" onChange={(value) => setLength(value)} />
      <PlaySlider label="Value" value={rating} min={0} max={length} step={halfIncrements ? 0.5 : 1} color="blue darken-4" onChange={setRating} />
      <PlaySlider label="Size" value={size} min={0} max={100} color="green" onChange={setSize} />
      <PlaySelect label="Color" value={color} items={colors} onChange={setColor} />
      <PlaySelect label="Background color" value={bgColor} items={bgColors} onChange={setBgColor} />
      <VRating value={rating} onChange={setRating} length={length} emptyIcon={emptyIcon} fullIcon={fullIcon} halfIcon={halfIcon} halfIncrements={halfIncrements} hover={hover} readonly={readonly} size={size} dense={dense} color={color} backgroundColor={bgColor} />
      <Box>
        <Typography component="span" className="text-caption text-uppercase" sx={{ fontSize: 12, textTransform: "uppercase" }}>model:</Typography>
        <Typography component="span" sx={{ fontWeight: 700, ml: 0.5 }}>{rating}</Typography>
      </Box>
    </Box>
  );
}

function PlayTextField({ label, value, disabled = false, onChange }: { label: string; value: string; disabled?: boolean; onChange: (value: string) => void }) {
  return <TextField variant="standard" label={label} value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} sx={fieldSx} InputLabelProps={{ sx: { color: "#b71c1c" } }} />;
}

function PlaySwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <FormControlLabel sx={{ m: 2 }} control={<Switch checked={checked} onChange={(event) => onChange(event.target.checked)} sx={switchSx("#b71c1c")} />} label={label} />;
}

function PlaySlider({ label, value, min, max, step = 1, color, onChange }: { label: string; value: number; min: number; max: number; step?: number; color: string; onChange: (value: number) => void }) {
  const c = colorValue(color);
  return (
    <Box sx={{ display: "flex", alignItems: "center", minHeight: 48, px: 1 }}>
      <Typography sx={{ minWidth: 120, color: "text.secondary", fontSize: 16, textAlign: "left" }}>{label}</Typography>
      <Slider value={value} min={min} max={max} step={step} onChange={(_, newValue) => onChange(newValue as number)} sx={{ color: c, mx: 2, "& .MuiSlider-thumb": { width: 12, height: 12 }, "& .MuiSlider-track": { border: 0, height: 2 }, "& .MuiSlider-rail": { height: 2 } }} />
    </Box>
  );
}

function PlaySelect({ label, value, items, onChange }: { label: string; value: string; items: string[]; onChange: (value: string) => void }) {
  return (
    <TextField select variant="standard" label={label} value={value} onChange={(event) => onChange(event.target.value)} sx={fieldSx}>
      {items.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
    </TextField>
  );
}

const fieldSx = {
  display: "block",
  mx: "auto",
  mb: 2,
  maxWidth: 520,
  textAlign: "left",
  "& .MuiInput-root:before": { borderBottomColor: "rgba(0,0,0,.42)" },
  "& .MuiInput-root:after": { borderBottomColor: "#b71c1c" },
};

function switchSx(color: string) {
  return {
    "& .MuiSwitch-switchBase.Mui-checked": { color },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: color },
  };
}

function SizesExample() {
  const [rating, setRating] = useState(4);
  return (
    <Box sx={{ textAlign: "center" }}>
      <VRating value={rating} onChange={setRating} backgroundColor="purple lighten-3" color="purple" small />
      <VRating value={rating} onChange={setRating} backgroundColor="pink lighten-3" color="pink" />
      <VRating value={rating} onChange={setRating} backgroundColor="orange lighten-3" color="orange" medium />
      <VRating value={rating} onChange={setRating} backgroundColor="green lighten-3" color="green" large />
      <VRating value={rating} onChange={setRating} backgroundColor="red lighten-3" color="red" xLarge />
      <VRating value={rating} onChange={setRating} backgroundColor="indigo lighten-3" color="indigo" size={64} />
    </Box>
  );
}

function ColorsExample() {
  const [rating, setRating] = useState(4);
  return (
    <Box sx={{ textAlign: "center" }}>
      <VRating value={rating} onChange={setRating} backgroundColor="purple lighten-3" color="purple" />
      <VRating value={rating} onChange={setRating} backgroundColor="pink lighten-3" color="pink" />
      <VRating value={rating} onChange={setRating} backgroundColor="orange lighten-3" color="orange" />
      <VRating value={rating} onChange={setRating} backgroundColor="green lighten-3" color="green" />
      <VRating value={rating} onChange={setRating} backgroundColor="red lighten-3" color="red" />
      <VRating value={rating} onChange={setRating} backgroundColor="indigo lighten-3" color="indigo" />
    </Box>
  );
}

function LengthExample() {
  const [length, setLength] = useState(5);
  const [rating, setRating] = useState(2);
  return (
    <Box sx={{ textAlign: "center" }}>
      <PlaySlider label="Custom length" value={length} min={1} max={15} color="red darken-4" onChange={setLength} />
      <VRating value={rating} onChange={setRating} length={length} color="red lighten-3" backgroundColor="grey lighten-1" />
      <Box>
        <Typography component="span" sx={{ fontSize: 12, textTransform: "uppercase" }}>model:</Typography>
        <Typography component="span" sx={{ fontWeight: 700, ml: 0.5 }}>{rating}</Typography>
      </Box>
    </Box>
  );
}

function IncrementsExample() {
  const [rating, setRating] = useState(4.5);
  return (
    <Card sx={{ width: 300, mx: "auto", borderRadius: 1, boxShadow: "0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)" }}>
      <Typography sx={{ fontSize: 24, lineHeight: "32px", fontWeight: 400, p: 2 }}>Rate Our Framework</Typography>
      <Box sx={{ px: 2, pb: 2, color: "text.secondary", fontSize: 14, lineHeight: 1.5 }}>
        If you enjoy using Vuetify, please take a few seconds to rate your
        experience with the framework. It really helps!
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <VRating value={rating} onChange={setRating} color="yellow darken-3" backgroundColor="grey darken-1" emptyIcon="$ratingFull" halfIncrements hover />
        </Box>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
        <Button sx={{ color: "rgba(0,0,0,.87)" }}>No Thanks</Button>
        <Button sx={{ color: primary }}>Rate Now</Button>
      </Box>
    </Card>
  );
}

function SlotsExample() {
  const [rating, setRating] = useState(4.5);
  const colors = ["green", "purple", "orange", "indigo", "red"];
  return (
    <Box sx={{ textAlign: "center" }}>
      <VRating
        value={rating}
        onChange={setRating}
        item={(props) => (
          <VIcon
            icon={props.isFilled ? "mdi-star-circle" : "mdi-circle-outline"}
            color={props.isFilled ? colors[props.index] : "grey lighten-1"}
            size={36}
            onClick={props.click}
          />
        )}
      />
    </Box>
  );
}

function CardExample() {
  const [rating, setRating] = useState(4.3);
  return (
    <Card sx={{ mx: "auto", maxWidth: 400, bgcolor: "#9c27b0", color: "#fff", borderRadius: 1, boxShadow: "0 10px 13px -6px rgba(0,0,0,.2),0 20px 31px 3px rgba(0,0,0,.14),0 8px 38px 7px rgba(0,0,0,.12)" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ flex: "0 0 66.666%", maxWidth: "66.666%", p: 2 }}>
          <Typography sx={{ fontSize: 24, lineHeight: "32px" }}>Halycon Days</Typography>
          <Typography>Ellie Goulding</Typography>
          <Typography>(2013)</Typography>
        </Box>
        <Box component="img" src="https://cdn.vuetifyjs.com/images/cards/halcyon.png" sx={{ flexBasis: 125, height: 125, objectFit: "contain", m: 1, flexShrink: 0 }} />
      </Box>
      <Divider sx={{ borderColor: "rgba(255,255,255,.12)" }} />
      <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
        <Typography>Rate this album</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography sx={{ color: "#e0e0e0", fontSize: 12, mr: 1 }}>({rating})</Typography>
        <VRating value={rating} onChange={setRating} backgroundColor="white" color="yellow accent-4" dense halfIncrements hover size={18} />
      </Box>
    </Card>
  );
}

function AdvancedExample() {
  const [dialog, setDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const linkRef = useRef<HTMLInputElement | null>(null);
  const rating = 10;

  function copy() {
    linkRef.current?.focus();
    linkRef.current?.select();
    setCopied(document.execCommand("copy"));
  }

  return (
    <Card sx={{ mx: "auto", maxWidth: 600, overflow: "hidden", borderRadius: 1, boxShadow: "0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px rgba(0,0,0,.14),0 1px 3px rgba(0,0,0,.12)" }}>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Box sx={{ display: "flex", flex: "0 0 50%", maxWidth: "50%" }}><Box component="img" src="https://cdn.vuetifyjs.com/images/ratings/fortnite1.png" sx={{ width: "100%", objectFit: "cover" }} /></Box>
        <Box sx={{ flex: "0 0 50%", maxWidth: "50%" }}>
          <Box sx={{ p: 0, pl: 1, my: "-4px" }}>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <ImageCol cols={7} src="https://cdn.vuetifyjs.com/images/ratings/fortnite2.png" />
              <ImageCol cols={5} src="https://cdn.vuetifyjs.com/images/ratings/fortnite3.png" />
              <ImageCol cols={5} src="https://cdn.vuetifyjs.com/images/ratings/fortnite4.png" />
              <ImageCol cols={7} src="https://cdn.vuetifyjs.com/images/ratings/fortnite5.png" />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-start", p: 2 }}>
        <Box>
          <Typography sx={{ fontSize: 24, lineHeight: "32px" }}>FORTNITE</Typography>
          <Typography sx={{ color: "rgba(0,0,0,.38)", fontWeight: 300 }}>Video game</Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <VIcon icon="mdi-share-variant" size={24} onClick={() => setDialog(true)} />
      </Box>
      <Divider />
      <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
        <Typography sx={{ pl: 1, color: "rgba(0,0,0,.6)", fontWeight: 300, fontSize: 12 }}>16,544 reviews</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <VRating value={rating} length={10} readonly item={(props) => <VIcon icon={`mdi-numeric-${props.index}-box`} color={props.isFilled ? "purple darken-4" : undefined} size={24} onClick={props.click} />} />
      </Box>
      <Typography component="div" sx={{ p: 2, pt: 0, fontSize: 12, lineHeight: 1.6 }}>
        <em>Portions of the materials used are trademarks and/or copyrighted works
        of Epic Games, Inc. All rights reserved by Epic. This material is not
        official and is not endorsed by Epic.</em>
      </Typography>
      <Dialog open={dialog} onClose={() => setDialog(false)} PaperProps={{ sx: { width: 400, maxWidth: "calc(100% - 32px)", borderRadius: 1 } }}>
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          <Typography sx={{ fontSize: 20, fontWeight: 700 }}>Share</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={() => setDialog(false)}><VIcon icon="mdi-close-circle-outline" size={24} /></IconButton>
        </Box>
        <ShareRow icon="mdi-facebook-box" color="indigo" label="Facebook" />
        <ShareRow icon="mdi-twitter-box" color="cyan" label="Twitter" />
        <ShareRow icon="mdi-email" label="Email" />
        <TextField inputRef={linkRef} variant="standard" label={copied ? "Link copied" : "Click to copy link"} value="https://g.co/kgs/nkrK43" onClick={copy} InputProps={{ readOnly: true }} sx={{ m: 2 }} />
      </Dialog>
    </Card>
  );
}

function ImageCol({ cols, src }: { cols: number; src: string }) {
  return <Box sx={{ display: "flex", flex: `0 0 ${(cols / 12) * 100}%`, maxWidth: `${(cols / 12) * 100}%`, p: 1.5 }}><Box component="img" src={src} sx={{ width: "100%", objectFit: "cover" }} /></Box>;
}

function ShareRow({ icon, color, label }: { icon: string; color?: string; label: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", minHeight: 48, px: 2, cursor: "pointer", "&:hover": { bgcolor: "rgba(0,0,0,.04)" } }}>
      <Box sx={{ mr: 3 }}><VIcon icon={icon} color={color} size={24} /></Box>
      <Typography sx={{ fontSize: 20 }}>{label}</Typography>
    </Box>
  );
}

const examples = [
  { source: "simple/sizes", title: "Size variants", description: <>Utilize the same sizing classes available in <CodePill>v-icon</CodePill> or provide your own with the <strong>size</strong> prop.</>, render: () => <SizesExample /> },
  { source: "simple/colors", title: "Colors", description: <>The <CodePill>v-rating</CodePill> component can be colored as you want, you can set both selected and not selected colors.</>, render: () => <ColorsExample /> },
  { source: "simple/length", title: "Custom length", description: <>Sometimes an application will call for a customized implementation. Easily change length or displayed icons.</>, render: () => <LengthExample /> },
  { source: "intermediate/increments", title: "Incremented", description: <>A rating can have 3 defined icons, <strong>full-icon</strong>, <strong>half-icon</strong> (with the <strong>half-increments</strong> prop) and <strong>empty-icon</strong>.</>, render: () => <IncrementsExample /> },
  { source: "intermediate/slots", title: "Slots", description: <>Slots are provided to give you even more freedom in how you display the rating.</>, render: () => <SlotsExample /> },
  { source: "intermediate/card", title: "Card ratings", description: <>The rating component pairs well with products allowing you to gather and display customer feedback.</>, render: () => <CardExample /> },
  { source: "complex/advanced", title: "Advanced usage", description: <>The <CodePill>v-rating</CodePill> component fits right in with existing components. Build truly complex examples with rich features and beautiful designs.</>, render: () => <AdvancedExample /> },
] as const;

export default function RatingsPage() {
  return (
    <DocPage
      title="Ratings"
      namespace="Components"
      icon={<Star />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Ratings" },
      ]}
    >
      <DocText>The rating component is a specialized but crucial piece in building user widgets. Collecting user feedback via ratings is a simple analytic that can provide a lot of feedback to your product or application.</DocText>
      <Box component="section">
        <Typography component="h2" id="usage" sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400, mb: 2 }}>Usage</Typography>
        <VuetifyExampleBlock title="" source="usage" description={<>The <CodePill>v-rating</CodePill> component provides a simple interface for gathering user feedback.</>}>
          {() => <UsageExample />}
        </VuetifyExampleBlock>
      </Box>
      <Box component="section">
        <Typography component="h2" id="playground" sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400, mb: 2 }}>Playground</Typography>
        <VuetifyExampleBlock title="" source="playground" description="">
          {() => <PlaygroundExample />}
        </VuetifyExampleBlock>
      </Box>
      {examples.map((example) => (
        <VuetifyExampleBlock key={example.source} title={example.title} description={example.description} source={example.source}>
          {example.render}
        </VuetifyExampleBlock>
      ))}
    </DocPage>
  );
}

const sourceTemplates: Record<ExampleKey, string> = {
  usage: `src/demo/examples/ratings/usage.vue`,
  playground: `src/demo/examples/ratings/playground.vue`,
  "simple/sizes": `src/demo/examples/ratings/simple/sizes.vue`,
  "simple/colors": `src/demo/examples/ratings/simple/colors.vue`,
  "simple/length": `src/demo/examples/ratings/simple/length.vue`,
  "intermediate/increments": `src/demo/examples/ratings/intermediate/increments.vue`,
  "intermediate/slots": `src/demo/examples/ratings/intermediate/slots.vue`,
  "intermediate/card": `src/demo/examples/ratings/intermediate/card.vue`,
  "complex/advanced": `src/demo/examples/ratings/complex/advanced.vue`,
};
