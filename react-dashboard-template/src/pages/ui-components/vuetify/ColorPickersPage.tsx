import { useCallback, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import {
  Box,
  Card,
  Collapse,
  IconButton,
  MenuItem,
  Select,
  Slider,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Code, GitHub, InvertColors, Palette, UnfoldMore } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const neuInset =
  "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const shadow2 =
  "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)";
const checkerboard =
  "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC) repeat";

type ExampleKey = keyof typeof sourceTemplates;
type ColorMode = "rgba" | "hsla" | "hexa";
type ModelMode = "hex" | "hexa" | "rgba" | "hsla" | "hsva";

// ─── Color utilities ──────────────────────────────────────────────────────────

function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
  };
  return [Math.round(f(5) * 255), Math.round(f(3) * 255), Math.round(f(1) * 255)];
}

function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  const rr = r / 255, gg = g / 255, bb = b / 255;
  const max = Math.max(rr, gg, bb), min = Math.min(rr, gg, bb);
  const v = max, d = max - min;
  const s = max === 0 ? 0 : d / max;
  let h = 0;
  if (d !== 0) {
    if (max === rr) h = ((gg - bb) / d) % 6;
    else if (max === gg) h = (bb - rr) / d + 2;
    else h = (rr - gg) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return [Math.round(h), s, v];
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0").toUpperCase()).join("");
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const len = h.length >= 6 ? 6 : 3;
  const mult = len === 3 ? 17 : 1;
  const step = len === 3 ? 1 : 2;
  return [
    parseInt(h.slice(0, step), 16) * mult,
    parseInt(h.slice(step, step * 2), 16) * mult,
    parseInt(h.slice(step * 2, step * 3), 16) * mult,
  ];
}

function alphaToHex(a: number): string {
  return Math.round(a * 255).toString(16).padStart(2, "0").toUpperCase();
}

function hsvToHsl(h: number, s: number, v: number): [number, number, number] {
  const l = v * (1 - s / 2);
  const sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);
  return [h, sl, l];
}

function hslToHsv(h: number, s: number, l: number): [number, number, number] {
  const v = l + s * Math.min(l, 1 - l);
  const sv = v === 0 ? 0 : 2 * (1 - l / v);
  return [h, sv, v];
}

interface HsvColor { h: number; s: number; v: number; a: number }

function hsvToCss(c: HsvColor): string {
  const [r, g, b] = hsvToRgb(c.h, c.s, c.v);
  return c.a < 1 ? `rgba(${r},${g},${b},${c.a.toFixed(2)})` : rgbToHex(r, g, b);
}

function hsvToOutput(c: HsvColor, mode: ModelMode): string | object {
  const [r, g, b] = hsvToRgb(c.h, c.s, c.v);
  if (mode === "hex") return rgbToHex(r, g, b);
  if (mode === "hexa") return rgbToHex(r, g, b) + alphaToHex(c.a);
  if (mode === "rgba") return { r, g, b, a: parseFloat(c.a.toFixed(2)) };
  if (mode === "hsla") {
    const [h, s, l] = hsvToHsl(c.h, c.s, c.v);
    return { h: Math.round(h), s: parseFloat(s.toFixed(2)), l: parseFloat(l.toFixed(2)), a: parseFloat(c.a.toFixed(2)) };
  }
  return { h: Math.round(c.h), s: parseFloat(c.s.toFixed(2)), v: parseFloat(c.v.toFixed(2)), a: parseFloat(c.a.toFixed(2)) };
}

const MODES: ColorMode[] = ["rgba", "hsla", "hexa"];

const DEFAULT_SWATCHES: string[][] = [
  ["#f44336", "#b71c1c", "#c62828", "#d32f2f", "#e53935", "#ef5350", "#e57373", "#ef9a9a", "#ffcdd2", "#ffebee"],
  ["#e91e63", "#880e4f", "#ad1457", "#c2185b", "#d81b60", "#ec407a", "#f06292", "#f48fb1", "#f8bbd0", "#fce4ec"],
  ["#9c27b0", "#4a148c", "#6a1b9a", "#7b1fa2", "#8e24aa", "#ab47bc", "#ba68c8", "#ce93d8", "#e1bee7", "#f3e5f5"],
  ["#673ab7", "#311b92", "#4527a0", "#512da8", "#5e35b1", "#7e57c2", "#9575cd", "#b39ddb", "#d1c4e9", "#ede7f6"],
  ["#3f51b5", "#1a237e", "#283593", "#303f9f", "#3949ab", "#5c6bc0", "#7986cb", "#9fa8da", "#c5cae9", "#e8eaf6"],
  ["#2196f3", "#0d47a1", "#1565c0", "#1976d2", "#1e88e5", "#42a5f5", "#64b5f6", "#90caf9", "#bbdefb", "#e3f2fd"],
  ["#03a9f4", "#01579b", "#0277bd", "#0288d1", "#039be5", "#29b6f6", "#4fc3f7", "#81d4fa", "#b3e5fc", "#e1f5fe"],
  ["#00bcd4", "#006064", "#00838f", "#0097a7", "#00acc1", "#26c6da", "#4dd0e1", "#80deea", "#b2ebf2", "#e0f7fa"],
  ["#009688", "#004d40", "#00695c", "#00796b", "#00897b", "#26a69a", "#4db6ac", "#80cbc4", "#b2dfdb", "#e0f2f1"],
  ["#4caf50", "#1b5e20", "#2e7d32", "#388e3c", "#43a047", "#66bb6a", "#81c784", "#a5d6a7", "#c8e6c9", "#e8f5e9"],
  ["#8bc34a", "#33691e", "#558b2f", "#689f38", "#7cb342", "#9ccc65", "#aed581", "#c5e1a5", "#dcedc8", "#f1f8e9"],
  ["#cddc39", "#827717", "#9e9d24", "#afb42b", "#c0ca33", "#d4e157", "#dce775", "#e6ee9c", "#f0f4c3", "#f9fbe7"],
  ["#ffeb3b", "#f57f17", "#f9a825", "#fbc02d", "#fdd835", "#ffee58", "#fff176", "#fff59d", "#fff9c4", "#fffde7"],
  ["#ffc107", "#ff6f00", "#ff8f00", "#ffa000", "#ffb300", "#ffca28", "#ffd54f", "#ffe082", "#ffecb3", "#fff8e1"],
  ["#ff9800", "#e65100", "#ef6c00", "#f57c00", "#fb8c00", "#ffa726", "#ffb74d", "#ffcc80", "#ffe0b2", "#fff3e0"],
  ["#ff5722", "#bf360c", "#d84315", "#e64a19", "#f4511e", "#ff7043", "#ff8a65", "#ffab91", "#ffccbc", "#fbe9e7"],
  ["#795548", "#3e2723", "#4e342e", "#5d4037", "#6d4c41", "#8d6e63", "#a1887f", "#bcaaa4", "#d7ccc8", "#efebe9"],
  ["#607d8b", "#263238", "#37474f", "#455a64", "#546e7a", "#78909c", "#90a4ae", "#b0bec5", "#cfd8dc", "#eceff1"],
  ["#9e9e9e", "#212121", "#424242", "#616161", "#757575", "#bdbdbd", "#e0e0e0", "#eeeeee", "#f5f5f5", "#fafafa"],
  ["#000000", "#ffffff", "transparent"],
];

// ─── Canvas ───────────────────────────────────────────────────────────────────

function ColorCanvas({
  hue, saturation, value, dotSize = 10, height = 150,
  disabled, onChange,
}: {
  hue: number; saturation: number; value: number; dotSize?: number;
  height?: number; disabled?: boolean;
  onChange: (s: number, v: number) => void;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromPointer = useCallback((clientX: number, clientY: number) => {
    const el = canvasRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const s = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const v = Math.max(0, Math.min(1, 1 - (clientY - rect.top) / rect.height));
    onChange(s, v);
  }, [onChange]);

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (disabled) return;
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updateFromPointer(e.clientX, e.clientY);
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    updateFromPointer(e.clientX, e.clientY);
  }

  function handlePointerUp() {
    dragging.current = false;
  }

  return (
    <Box
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      sx={{
        position: "relative",
        width: "100%",
        height,
        cursor: disabled ? "default" : "crosshair",
        userSelect: "none",
        touchAction: "none",
        background: [
          "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))",
          "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))",
          `hsl(${hue}, 100%, 50%)`,
        ].join(", "),
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: `${saturation * 100}%`,
          top: `${(1 - value) * 100}%`,
          transform: "translate(-50%, -50%)",
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          border: "2px solid #fff",
          boxShadow: "0 1px 3px rgba(0,0,0,.5)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}

// ─── Hue/Alpha sliders ────────────────────────────────────────────────────────

function HueSlider({ value, onChange, disabled }: {
  value: number; onChange: (h: number) => void; disabled?: boolean;
}) {
  return (
    <Slider
      disabled={disabled}
      value={value}
      min={0}
      max={360}
      onChange={(_, v) => onChange(v as number)}
      sx={{
        p: 0,
        height: 10,
        minHeight: 10,
        "& .MuiSlider-track": { display: "none" },
        "& .MuiSlider-rail": {
          height: 10,
          borderRadius: 5,
          opacity: 1,
          background: "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",
        },
        "& .MuiSlider-thumb": {
          width: 16,
          height: 16,
          background: "#e0e0e0",
          boxShadow: shadow2,
          border: "none",
          "&:hover": { boxShadow: shadow2 },
        },
      }}
    />
  );
}

function AlphaSlider({ value, color, onChange, disabled }: {
  value: number; color: string; onChange: (a: number) => void; disabled?: boolean;
}) {
  return (
    <Slider
      disabled={disabled}
      value={value}
      min={0}
      max={1}
      step={0.01}
      onChange={(_, v) => onChange(v as number)}
      sx={{
        p: 0,
        height: 10,
        minHeight: 10,
        "& .MuiSlider-track": { display: "none" },
        "& .MuiSlider-rail": {
          height: 10,
          borderRadius: 5,
          opacity: 1,
          background: `linear-gradient(to right, rgba(255,255,255,0), ${color})`,
          backgroundImage: `
            linear-gradient(to right, transparent, ${color}),
            repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px
          `,
        },
        "& .MuiSlider-thumb": {
          width: 16,
          height: 16,
          background: "#e0e0e0",
          border: "none",
          boxShadow: shadow2,
          "&:hover": { boxShadow: shadow2 },
        },
      }}
    />
  );
}

// ─── Inputs ───────────────────────────────────────────────────────────────────

function ColorInputField({ label, value, onChange, max = 255, step = 1, isText = false }: {
  label: string; value: string | number; onChange: (v: string) => void;
  max?: number; step?: number; isText?: boolean;
}) {
  return (
    <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "center", textAlign: "center", mr: 1, "&:last-of-type": { mr: 0 } }}>
      <Box
        component="input"
        type={isText ? "text" : "number"}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        sx={{
          width: "100%",
          minWidth: 0,
          height: 28,
          border: "thin solid rgba(0,0,0,.12)",
          borderRadius: 1,
          mb: 1,
          bgcolor: "transparent",
          textAlign: "center",
          fontSize: 13,
          fontFamily: "inherit",
          color: "rgba(0,0,0,.87)",
          outline: "none",
          px: 0.5,
          "&:focus": { borderColor: primary },
        }}
      />
      <Typography component="span" sx={{ fontSize: "0.75rem", color: "rgba(0,0,0,.54)", lineHeight: 1.2 }}>{label}</Typography>
    </Box>
  );
}

function ColorInputs({ hsv, mode, hideAlpha = false, onHsvChange }: {
  hsv: HsvColor; mode: ColorMode; hideAlpha?: boolean; onHsvChange: (c: HsvColor) => void;
}) {
  const [r, g, b] = hsvToRgb(hsv.h, hsv.s, hsv.v);
  const hex = rgbToHex(r, g, b);
  const hexa = hex + alphaToHex(hsv.a);
  const [hl, sl, ll] = hsvToHsl(hsv.h, hsv.s, hsv.v);

  function fromHexa(v: string) {
    const clean = v.replace("#", "");
    if (clean.length === 8) {
      const [nr, ng, nb] = hexToRgb("#" + clean.slice(0, 6));
      const [nh, ns, nv] = rgbToHsv(nr, ng, nb);
      const na = parseInt(clean.slice(6), 16) / 255;
      onHsvChange({ h: nh, s: ns, v: nv, a: parseFloat(na.toFixed(2)) });
    }
  }

  if (mode === "hexa") return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 3 }}>
      <ColorInputField label="HEXA" value={hexa} isText onChange={fromHexa} />
    </Box>
  );
  if (mode === "rgba") return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
      <ColorInputField label="R" value={r} onChange={(v) => { const [nh,ns,nv] = rgbToHsv(Number(v),g,b); onHsvChange({...hsv,h:nh,s:ns,v:nv}); }} max={255} />
      <ColorInputField label="G" value={g} onChange={(v) => { const [nh,ns,nv] = rgbToHsv(r,Number(v),b); onHsvChange({...hsv,h:nh,s:ns,v:nv}); }} max={255} />
      <ColorInputField label="B" value={b} onChange={(v) => { const [nh,ns,nv] = rgbToHsv(r,g,Number(v)); onHsvChange({...hsv,h:nh,s:ns,v:nv}); }} max={255} />
      {!hideAlpha && <ColorInputField label="A" value={hsv.a.toFixed(2)} step={0.01} onChange={(v) => onHsvChange({...hsv, a: Math.max(0,Math.min(1,Number(v)))})} max={1} />}
    </Box>
  );
  if (mode === "hsla") return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
      <ColorInputField label="H" value={Math.round(hl)} onChange={(v) => { const [nh,ns,nv]=hslToHsv(Number(v),sl,ll); onHsvChange({...hsv,h:nh,s:ns,v:nv}); }} max={360} />
      <ColorInputField label="S" value={sl.toFixed(2)} step={0.01} onChange={(v) => { const [nh,ns,nv]=hslToHsv(hl,Number(v),ll); onHsvChange({...hsv,h:nh,s:ns,v:nv}); }} max={1} />
      <ColorInputField label="L" value={ll.toFixed(2)} step={0.01} onChange={(v) => { const [nh,ns,nv]=hslToHsv(hl,sl,Number(v)); onHsvChange({...hsv,h:nh,s:ns,v:nv}); }} max={1} />
      {!hideAlpha && <ColorInputField label="A" value={hsv.a.toFixed(2)} step={0.01} onChange={(v) => onHsvChange({...hsv,a:Math.max(0,Math.min(1,Number(v)))})} max={1} />}
    </Box>
  );
  return null;
}

// ─── Swatches ─────────────────────────────────────────────────────────────────

function ColorSwatches({ swatches = DEFAULT_SWATCHES, maxHeight = 150, onSelect }: {
  swatches?: string[][]; maxHeight?: number; onSelect: (hex: string) => void;
}) {
  return (
    <Box
      sx={{
        overflowY: "auto",
        maxHeight,
        "& > div": {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          p: 1,
        },
      }}
    >
      <Box>
        {swatches.map((col, ci) => (
          <Box key={ci} sx={{ display: "flex", flexDirection: "column", mb: 1.25 }}>
            {col.map((hex, ri) => (
              <Box
                key={`${ci}-${ri}`}
                onClick={() => onSelect(hex)}
                sx={{
                  position: "relative",
                  width: 45,
                  height: 18,
                  maxHeight: 18,
                  m: "2px 4px",
                  borderRadius: 0.5,
                  userSelect: "none",
                  overflow: "hidden",
                  cursor: "pointer",
                  background: checkerboard,
                  "& > div": {
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: hex === "transparent" ? "transparent" : hex,
                  },
                }}
              >
                <Box />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// ─── VColorPicker ─────────────────────────────────────────────────────────────

function VColorPicker({
  value,
  defaultHsv = { h: 0, s: 1, v: 1, a: 1 },
  onChange,
  disabled = false,
  flat = false,
  hideCanvas = false,
  hideInputs = false,
  hideModeSwitch = false,
  showSwatches = false,
  swatches,
  swatchesMaxHeight = 150,
  dotSize = 10,
  canvasHeight = 150,
  mode: modeProp,
  hideAlpha = false,
  width = 300,
}: {
  value?: HsvColor;
  defaultHsv?: HsvColor;
  onChange?: (color: HsvColor) => void;
  disabled?: boolean;
  flat?: boolean;
  hideCanvas?: boolean;
  hideInputs?: boolean;
  hideModeSwitch?: boolean;
  showSwatches?: boolean;
  swatches?: string[][];
  swatchesMaxHeight?: number;
  dotSize?: number;
  canvasHeight?: number;
  mode?: ColorMode;
  hideAlpha?: boolean;
  width?: number;
}) {
  const [uncontrolledHsv, setUncontrolledHsv] = useState<HsvColor>(defaultHsv);
  const hsv = value ?? uncontrolledHsv;
  const setHsv = (next: HsvColor | ((prev: HsvColor) => HsvColor)) => {
    const resolved = typeof next === "function" ? (next as (prev: HsvColor) => HsvColor)(hsv) : next;
    if (!value) setUncontrolledHsv(resolved);
    onChange?.(resolved);
  };
  const [internalMode, setInternalMode] = useState<ColorMode>(modeProp ?? "rgba");
  const mode = modeProp ?? internalMode;

  const cssColor = hsvToCss(hsv);
  const opaqueColor = (() => { const [r,g,b] = hsvToRgb(hsv.h, hsv.s, hsv.v); return rgbToHex(r,g,b); })();

  function cycleMode() {
    const idx = MODES.indexOf(internalMode);
    setInternalMode(MODES[(idx + 1) % MODES.length]);
  }

  function selectSwatch(hex: string) {
    if (hex === "transparent") {
      setHsv({ h: 0, s: 1, v: 0, a: 0 });
      return;
    }
    const [r,g,b] = hexToRgb(hex);
    const [h,s,v] = rgbToHsv(r,g,b);
    setHsv(prev => ({...prev, h, s, v, a: 1}));
  }

  const showAlpha = !hideAlpha;

  return (
    <Box
      sx={{
        width,
        maxWidth: width,
        borderRadius: 1,
        contain: "content",
        overflow: "hidden",
        boxShadow: flat ? "none" : shadow2,
        bgcolor: "#fff",
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? "none" : "auto",
        display: "inline-block",
      }}
    >
      {!hideCanvas && (
        <ColorCanvas
          hue={hsv.h}
          saturation={hsv.s}
          value={hsv.v}
          dotSize={dotSize}
          height={canvasHeight}
          disabled={disabled}
          onChange={(s, v) => setHsv(prev => ({ ...prev, s, v }))}
        />
      )}

      {/* Preview + sliders row */}
      <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            position: "relative",
            width: 30,
            height: 30,
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            background: checkerboard,
            mr: 3,
            "& > div": { width: "100%", height: "100%", bgcolor: cssColor },
          }}
        ><Box /></Box>
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: showAlpha ? 3 : 0 }}>
          <HueSlider value={hsv.h} onChange={(h) => setHsv(prev => ({ ...prev, h }))} disabled={disabled} />
          {showAlpha && (
            <AlphaSlider value={hsv.a} color={opaqueColor} onChange={(a) => setHsv(prev => ({ ...prev, a }))} disabled={disabled} />
          )}
        </Box>
        {!hideModeSwitch && (
          <Tooltip title="Switch mode">
            <IconButton size="small" disabled={disabled} onClick={cycleMode} sx={{ flexShrink: 0, color: "rgba(0,0,0,.54)", ml: 1, width: 32, height: 32 }}>
              <UnfoldMore sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {!hideInputs && (
        <Box>
          <ColorInputs hsv={hsv} mode={mode} hideAlpha={hideAlpha} onHsvChange={setHsv} />
        </Box>
      )}
      </Box>

      {showSwatches && (
        <ColorSwatches
          swatches={swatches}
          maxHeight={swatchesMaxHeight}
          onSelect={selectSwatch}
        />
      )}
    </Box>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ColorPickersPage() {
  return (
    <DocPage
      title="Color Pickers"
      namespace="Components"
      icon={<Palette />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Color Pickers" },
      ]}
    >
      <DocText>
        The <CodePill>v-color-picker</CodePill> allows you to select a color
        using a variety of input methods.
      </DocText>
      <UsageSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  const [disabled, setDisabled] = useState(false);
  const [hideCanvas, setHideCanvas] = useState(false);
  const [hideInputs, setHideInputs] = useState(false);
  const [hideModeSwitch, setHideModeSwitch] = useState(false);
  const [showSwatches, setShowSwatches] = useState(false);
  const [flat, setFlat] = useState(false);
  const [mode, setMode] = useState<ColorMode | "">("");
  const [dotSize, setDotSize] = useState(10);
  const [swatchesMaxHeight, setSwatchesMaxHeight] = useState(150);

  return (
    <Box component="section" sx={{ mb: 5 }}>
      <BaseHeading id="usage">Usage</BaseHeading>
      <VuetifyExampleBlock title="" source="usage" description="">
        {() => (
          <UsagePlayground
            preview={
              <VColorPicker
                disabled={disabled}
                flat={flat}
                hideCanvas={hideCanvas}
                hideInputs={hideInputs}
                hideModeSwitch={hideModeSwitch}
                showSwatches={showSwatches}
                dotSize={dotSize}
                swatchesMaxHeight={swatchesMaxHeight}
                mode={mode || undefined}
              />
            }
            options={
              <>
                {[
                  { label: "disabled", val: disabled, set: setDisabled },
                  { label: "hide-canvas", val: hideCanvas, set: setHideCanvas },
                  { label: "hide-inputs", val: hideInputs, set: setHideInputs },
                  { label: "hide-mode-switch", val: hideModeSwitch, set: setHideModeSwitch },
                  { label: "show-swatches", val: showSwatches, set: setShowSwatches },
                  { label: "flat", val: flat, set: setFlat },
                ].map(({ label, val, set }) => (
                  <UsageSwitch key={label} label={label} checked={val} onChange={set} />
                ))}
                <UsageSlider label="dot-size" value={dotSize} min={0} max={50} onChange={setDotSize} />
                <UsageSlider label="swatches-max-height" value={swatchesMaxHeight} min={100} max={250} onChange={setSwatchesMaxHeight} />
                <UsageSelect label="Mode" value={mode} items={["rgba", "hsla", "hexa"]} onChange={(next) => setMode(next as ColorMode | "")} />
              </>
            }
          />
        )}
      </VuetifyExampleBlock>
    </Box>
  );
}

function UsagePlayground({ preview, options }: { preview: ReactNode; options: ReactNode }) {
  return (
    <Card variant="outlined" sx={{ borderColor: "rgba(0,0,0,.12)", borderRadius: 1, boxShadow: "none", overflow: "hidden" }}>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "9fr 3fr" } }}>
        <Box sx={{ minWidth: 0, borderRight: { md: "1px solid rgba(0,0,0,.12)" } }}>
          <Box sx={{ height: 48, bgcolor: "#eeeeee", borderBottom: "1px solid rgba(0,0,0,.12)" }} />
          <Box sx={{ height: 300, width: "calc(100% - 1px)", overflowY: "auto", bgcolor: "#fff" }}>
            <Box sx={{ minHeight: 300, p: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {preview}
            </Box>
          </Box>
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Box sx={{ height: 48, bgcolor: "#eeeeee", display: "flex", alignItems: "center", px: 1.5, borderBottom: "1px solid rgba(0,0,0,.12)" }}>
            <Typography sx={{ fontSize: 20, fontWeight: 400 }}>Options</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton size="small" aria-label="Invert playground colors" sx={{ color: "rgba(0,0,0,.54)" }}>
              <InvertColors sx={{ fontSize: 22 }} />
            </IconButton>
          </Box>
          <Box sx={{ maxHeight: 300, overflowY: "auto", py: 1.5 }}>
            {options}
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

function UsageSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <Box sx={{ px: 1.5, pb: 1.5 }}>
      <Box onClick={() => onChange(!checked)} sx={{ minHeight: 32, display: "flex", alignItems: "center", cursor: "pointer" }}>
        <Box sx={{ width: 44, height: 24, borderRadius: 999, bgcolor: checked ? "rgba(0,150,136,.5)" : "rgba(0,0,0,.18)", p: "2px", transition: "background-color 150ms" }}>
          <Box sx={{ width: 20, height: 20, borderRadius: "50%", bgcolor: checked ? "#009688" : "#fff", boxShadow: shadow2, transform: checked ? "translateX(20px)" : "translateX(0)", transition: "transform 150ms, background-color 150ms" }} />
        </Box>
        <Typography sx={{ ml: 1.5, fontSize: 16, color: "rgba(0,0,0,.74)", textTransform: "capitalize" }}>{label}</Typography>
      </Box>
    </Box>
  );
}

function UsageSlider({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  return (
    <Box sx={{ px: 1.5, pb: 1.5 }}>
      <Box sx={{ display: "flex", alignItems: "center", minHeight: 32 }}>
        <Typography sx={{ width: 132, fontSize: 16, color: "rgba(0,0,0,.6)", textTransform: "capitalize" }}>{label}</Typography>
        <Slider value={value} min={min} max={max} onChange={(_, next) => onChange(next as number)} sx={usageSliderSx} />
      </Box>
    </Box>
  );
}

function UsageSelect({ label, value, items, onChange }: { label: string; value: string; items: string[]; onChange: (value: string) => void }) {
  return (
    <Box sx={{ px: 1.5, pb: 1.5 }}>
      <Select
        displayEmpty
        value={value}
        onChange={(event) => onChange(event.target.value)}
        renderValue={(selected) => selected ? String(selected) : label}
        size="small"
        sx={{
          width: "100%",
          bgcolor: "rgba(0,0,0,.06)",
          borderRadius: 1,
          fontSize: 16,
          "& fieldset": { border: "none" },
          "& .MuiSelect-select": { py: 1.15 },
        }}
      >
        <MenuItem value="" sx={{ fontSize: 16 }}><em>None</em></MenuItem>
        {items.map((item) => <MenuItem key={item} value={item} sx={{ fontSize: 16 }}>{item}</MenuItem>)}
      </Select>
    </Box>
  );
}

function ExamplesSection() {
  return (
    <Box component="section">
      <BaseHeading id="examples">Examples</BaseHeading>
      <ModelExample />
      <SwatchesExample />
      <InputsExample />
      <CanvasExample />
    </Box>
  );
}

function ModelExample() {
  const types: ModelMode[] = ["hex", "hexa", "rgba", "hsla", "hsva"];
  const [type, setType] = useState<ModelMode>("hex");
  const initialModelColor: HsvColor = { h: 300, s: 1, v: 1, a: 1 };
  const [colors, setColors] = useState<Record<ModelMode, HsvColor>>({
    hex: initialModelColor,
    hexa: initialModelColor,
    rgba: initialModelColor,
    hsla: initialModelColor,
    hsva: initialModelColor,
  });
  const hsv = colors[type];

  function showOutput(): string {
    const out = hsvToOutput(hsv, type);
    if (typeof out === "string") return out;
    return JSON.stringify(
      Object.fromEntries(Object.entries(out).map(([k, v]) => [k, parseFloat(Number(v).toFixed(2))])),
      null, 2
    );
  }

  return (
    <VuetifyExampleBlock
      title="Model"
      source="simple/model"
      description={
        <>
          The <CodePill>v-color-picker</CodePill> uses the <CodePill>v-model</CodePill> prop to control the color displayed. It supports hex strings such as <strong>#FF00FF</strong> and <strong>#FF00FF00</strong>, and objects representing <strong>RGBA</strong>, <strong>HSLA</strong> and <strong>HSVA</strong> values.
        </>
      }
    >
      {() => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "flex-start", justifyContent: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column", minWidth: 120 }}>
            {types.map((t) => (
              <Box
                key={t}
                component="button"
                onClick={() => setType(t)}
                sx={{
                  my: 1,
                  width: "100%",
                  height: 36,
                  border: "none",
                  borderRadius: 1,
                  bgcolor: type === t ? primary : "#fff",
                  color: type === t ? "#fff" : "rgba(0,0,0,.87)",
                  boxShadow: shadow2,
                  fontSize: 14,
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontWeight: 500,
                  letterSpacing: 0.4,
                }}
              >
                {t}
              </Box>
            ))}
          </Box>
          <VColorPicker
            value={hsv}
            hideAlpha={type === "hex"}
            onChange={(next) => setColors((previous) => ({ ...previous, [type]: next }))}
          />
          <Box
            sx={{
              bgcolor: "#303030",
              color: "#f8f8f2",
              p: 2,
              borderRadius: 1,
              minWidth: 200,
              maxWidth: 260,
              alignSelf: "flex-start",
            }}
          >
            <Box
              component="pre"
              sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 13, lineHeight: 1.5 }}
            >
              {showOutput()}
            </Box>
          </Box>
        </Box>
      )}
    </VuetifyExampleBlock>
  );
}

function SwatchesExample() {
  const customSwatches = [
    ["#FF0000", "#AA0000", "#550000"],
    ["#FFFF00", "#AAAA00", "#555500"],
    ["#00FF00", "#00AA00", "#005500"],
    ["#00FFFF", "#00AAAA", "#005555"],
    ["#0000FF", "#0000AA", "#000055"],
  ];

  return (
    <VuetifyExampleBlock
      title="Swatches"
      source="intermediate/swatches"
      description="Using the show-swatches prop you can display an array of color swatches that users can pick from. It is also possible to customize what colors are shown using the swatches prop. This prop accepts a two-dimensional array, where the first dimension defines a column, and second dimension defines the swatches from top to bottom by providing rgba hex strings. You can also set the max height of the swatches section with the swatches-max-height prop."
    >
      {() => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "space-around" }}>
          <Box sx={{ m: 1 }}><VColorPicker showSwatches /></Box>
          <Box sx={{ m: 1 }}><VColorPicker showSwatches swatches={customSwatches} /></Box>
          <Box sx={{ m: 1 }}><VColorPicker showSwatches swatchesMaxHeight={300} /></Box>
        </Box>
      )}
    </VuetifyExampleBlock>
  );
}

function InputsExample() {
  const [mode, setMode] = useState<ColorMode>("hsla");
  const modes: ColorMode[] = ["hsla", "rgba", "hexa"];

  return (
    <VuetifyExampleBlock
      title="Inputs"
      source="intermediate/inputs"
      description={
        <>
          The number inputs can be hidden with the <CodePill>hide-inputs</CodePill> prop. You can also hide the mode switch icon with the <CodePill>hide-mode-switch</CodePill> prop. The mode can also be controlled externally through the <CodePill>mode</CodePill> prop.
        </>
      }
    >
      {() => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "space-around", alignItems: "flex-start" }}>
          <Box sx={{ m: 1 }}><VColorPicker hideInputs /></Box>
          <Box sx={{ m: 1 }}><VColorPicker hideModeSwitch /></Box>
          <Box sx={{ m: 1, display: "flex", flexDirection: "column", gap: 1 }}>
            <VColorPicker mode={mode} />
            <Select
              value={mode}
              onChange={(e) => setMode(e.target.value as ColorMode)}
              size="small"
              sx={{ maxWidth: 300, fontSize: 14 }}
            >
              {modes.map((m) => (
                <MenuItem key={m} value={m} sx={{ fontSize: 14 }}>{m}</MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      )}
    </VuetifyExampleBlock>
  );
}

function CanvasExample() {
  return (
    <VuetifyExampleBlock
      title="Canvas"
      source="intermediate/canvas"
      description={
        <>
          The canvas can be hidden with the <CodePill>hide-canvas</CodePill> prop, and you can set its height with the prop <CodePill>canvas-height</CodePill>. The size of the selection dot can be controlled with the <CodePill>dot-size</CodePill> prop.
        </>
      }
    >
      {() => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "space-around" }}>
          <Box sx={{ m: 1 }}><VColorPicker hideCanvas /></Box>
          <Box sx={{ m: 1 }}><VColorPicker canvasHeight={300} /></Box>
          <Box sx={{ m: 1 }}><VColorPicker dotSize={30} /></Box>
        </Box>
      )}
    </VuetifyExampleBlock>
  );
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

function BaseHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <Typography
      id={id}
      variant="h5"
      sx={{ fontSize: { xs: 20, md: 22 }, lineHeight: 1.45, fontWeight: 400, mb: 2.5 }}
    >
      {children}
    </Typography>
  );
}

function VuetifyExampleBlock({
  title, description, source, children,
}: {
  title: string; description: ReactNode; source: ExampleKey; children: () => ReactNode;
}) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card sx={{ mb: 5, bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
        {title && <Typography sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>{title}</Typography>}
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors">
          <IconButton size="small" onClick={() => setInverted((v) => !v)} sx={exampleIconSx(inverted)}>
            <InvertColors sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="View on Github">
          <IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton>
        </Tooltip>
        <Tooltip title="View source">
          <IconButton size="small" onClick={() => setSourceOpen((v) => !v)} sx={exampleIconSx(sourceOpen)}>
            <Code sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", overflowX: "auto", p: 2 }}>
          <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>
            {sourceTemplates[source]}
          </Box>
        </Box>
      </Collapse>
      <Box sx={{ bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", p: 2, overflow: "visible" }}>
        {description !== "" && description !== undefined && description !== null && (
          <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>
            {description}
          </Typography>
        )}
        <Box data-app="true" sx={{ overflow: "visible" }}>{children()}</Box>
      </Box>
    </Card>
  );
}

function CodePill({ children }: { children: ReactNode }) {
  return (
    <Box component="code" sx={{ px: 0.55, py: 0.18, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>
      {children}
    </Box>
  );
}

function exampleIconSx(active: boolean) {
  return {
    width: 30, height: 30, ml: 0.5,
    color: active ? primary : "text.secondary",
    bgcolor: active ? "rgba(0,151,167,.12)" : "transparent",
    "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" },
  };
}

const usageSliderSx = {
  color: primary,
  height: 2,
  p: 0,
  "& .MuiSlider-rail": { opacity: 0.3 },
  "& .MuiSlider-thumb": { width: 12, height: 12, boxShadow: "none", "&:hover": { boxShadow: "none" } },
};

const sourceTemplates = {
  usage: `<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-color-picker
        v-bind="attrs"
      />
    </v-row>
  </v-container>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
  }
</script>`,
  "simple/model": `<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-btn
          v-for="t in types"
          :key="t"
          class="my-4"
          block
          @click="type = t"
        >{{ t }}</v-btn>
      </v-col>
      <v-col class="d-flex justify-center">
        <v-color-picker v-model="color"></v-color-picker>
      </v-col>
      <v-col cols="12" md="4">
        <v-sheet dark class="pa-4">
          <pre>{{ showColor }}</pre>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      types: ['hex', 'hexa', 'rgba', 'hsla', 'hsva'],
      type: 'hex',
      hex: '#FF00FF',
      hexa: '#FF00FFFF',
      rgba: { r: 255, g: 0, b: 255, a: 1 },
      hsla: { h: 300, s: 1, l: 0.5, a: 1 },
      hsva: { h: 300, s: 1, v: 1, a: 1 },
    }),
    computed: {
      color: {
        get () { return this[this.type] },
        set (v) { this[this.type] = v },
      },
      showColor () {
        if (typeof this.color === 'string') return this.color
        return JSON.stringify(Object.keys(this.color).reduce((color, key) => {
          color[key] = Number(this.color[key].toFixed(2))
          return color
        }, {}), null, 2)
      },
    },
  }
</script>`,
  "intermediate/swatches": `<template>
  <v-row justify="space-around">
    <v-color-picker class="ma-2" show-swatches></v-color-picker>
    <v-color-picker class="ma-2" :swatches="swatches" show-swatches></v-color-picker>
    <v-color-picker class="ma-2" show-swatches swatches-max-height="300px"></v-color-picker>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      swatches: [
        ['#FF0000', '#AA0000', '#550000'],
        ['#FFFF00', '#AAAA00', '#555500'],
        ['#00FF00', '#00AA00', '#005500'],
        ['#00FFFF', '#00AAAA', '#005555'],
        ['#0000FF', '#0000AA', '#000055'],
      ],
    }),
  }
</script>`,
  "intermediate/inputs": `<template>
  <v-row justify="space-around">
    <v-color-picker class="ma-2" hide-inputs></v-color-picker>
    <v-color-picker class="ma-2" hide-mode-switch></v-color-picker>
    <v-row class="ma-2" style="flex: 0 0 auto">
      <v-color-picker :mode.sync="mode"></v-color-picker>
      <v-select v-model="mode" :items="modes" style="max-width: 300px"></v-select>
    </v-row>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      mode: 'hsla',
      modes: ['hsla', 'rgba', 'hexa'],
    }),
  }
</script>`,
  "intermediate/canvas": `<template>
  <v-row justify="space-around">
    <v-color-picker class="ma-2" hide-canvas></v-color-picker>
    <v-color-picker class="ma-2" canvas-height="300"></v-color-picker>
    <v-color-picker class="ma-2" dot-size="30"></v-color-picker>
  </v-row>
</template>`,
};
