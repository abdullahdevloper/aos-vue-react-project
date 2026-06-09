import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { Box, Card, Collapse, IconButton, Stack, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { AcUnit, Add, Alarm, Code, ErrorOutline, GitHub, InvertColors, LocalFireDepartment, Opacity, Pause, PlayArrow, Remove, Share, Spa, VolumeDown, VolumeUp, ViewHeadline, ZoomIn, ZoomOut } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const sectionHeadingSx = { fontSize: { xs: 20, md: 22 }, lineHeight: 1.45, fontWeight: 400, mb: 2.5 };
const docsParagraphSx = { fontSize: { xs: 16, md: 20 }, lineHeight: 1.55, fontWeight: 300, mb: 3, color: "text.secondary" };

type ExampleKey = keyof typeof sourceTemplates;
type SliderColor = "primary" | "orange darken-3" | "green lighten-1" | "red" | "indigo" | "teal" | "green" | "orange" | "grey";

interface Example {
  title: string;
  description: ReactNode;
  source: ExampleKey;
  minHeight: number;
  render: () => ReactNode;
}

const colorMap: Record<SliderColor, string> = {
  primary,
  "orange darken-3": "#ef6c00",
  "green lighten-1": "#66bb6a",
  red: "#f44336",
  indigo: "#3f51b5",
  teal: "#009688",
  green: "#4caf50",
  orange: "#ff9800",
  grey: "#9e9e9e",
};

export default function SlidersPage() {
  return (
    <DocPage
      title="Sliders"
      namespace="Components"
      icon={<ViewHeadline />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Sliders" },
      ]}
    >
      <DocText>The <CodePill>v-slider</CodePill> component is a better visualization of the number input. It is used for gathering numerical user data.</DocText>
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
      <Typography sx={docsParagraphSx}>Sliders reflect a range of values along a bar, from which users may select a single value. They are ideal for adjusting settings such as volume, brightness, or applying image filters.</Typography>
      <VuetifyExampleBlock title="" description="" source="usage" minHeight={360}>
        {() => <UsageExample />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function UsageExample() {
  const [value, setValue] = useState(30);
  const [dense, setDense] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [hideDetails, setHideDetails] = useState(false);
  const [inverseLabel, setInverseLabel] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [persistentHint, setPersistentHint] = useState(false);
  const [vertical, setVertical] = useState(false);

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0,1fr) 260px" }, gap: 3, alignItems: "stretch" }}>
      <Box sx={{ minHeight: vertical ? 250 : 170, display: "flex", alignItems: "center", justifyContent: "center", px: { xs: 1, md: 4 } }}>
        <Box sx={{ width: vertical ? "auto" : "100%", maxWidth: vertical ? 180 : 620 }}>
          <VSlider
            label="Slider"
            value={value}
            onChange={setValue}
            hint="hint"
            dense={dense}
            disabled={disabled}
            hideDetails={hideDetails}
            inverseLabel={inverseLabel}
            readonly={readonly}
            persistentHint={persistentHint}
            vertical={vertical}
          />
        </Box>
      </Box>
      <Box sx={{ borderLeft: { md: "1px solid rgba(0,0,0,.08)" }, pl: { md: 2 }, pr: .5, maxHeight: 300, overflowY: "auto" }}>
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: "rgba(0,0,0,.54)", letterSpacing: .4, textTransform: "uppercase", mb: 1 }}>Options</Typography>
        <Stack spacing={0}>
          <VSwitch checked={dense} onChange={setDense} label="Dense" />
          <VSwitch checked={disabled} onChange={setDisabled} label="Disabled" />
          <VSwitch checked={hideDetails} onChange={setHideDetails} label="Hide details" />
          <VSwitch checked={inverseLabel} onChange={setInverseLabel} label="Inverse label" />
          <VSwitch checked={readonly} onChange={setReadonly} label="Readonly" />
          <VSwitch checked={persistentHint} onChange={setPersistentHint} label="Persistent hint" />
          <VSwitch checked={vertical} onChange={setVertical} label="Vertical" />
        </Stack>
      </Box>
    </Box>
  );
}

function PlaygroundSection() {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <Typography variant="h5" sx={sectionHeadingSx}>Playground</Typography>
      <VuetifyExampleBlock title="" description="" source="playground" minHeight={410}>
        {() => <PlaygroundExample />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function PlaygroundExample() {
  const [volume, setVolume] = useState(10);
  const [rangeValue, setRangeValue] = useState<[number, number]>([0, 100]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [disabled, setDisabled] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [vertical, setVertical] = useState(false);
  const [range, setRange] = useState(false);
  return (
    <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", alignItems: "center" }}>
      <Box sx={{ width: "100%", px: 1.5 }}><VSlider value={min} onChange={setMin} min={-100} max={100} label="Min" /></Box>
      <Box sx={{ width: "100%", px: 1.5 }}><VSlider value={max} onChange={setMax} min={-100} max={100} label="Max" /></Box>
      <VSwitch checked={disabled} onChange={setDisabled} label="Disabled" />
      <VSwitch checked={readonly} onChange={setReadonly} label="Readonly" />
      <VSwitch checked={vertical} onChange={setVertical} label="Vertical" />
      <VSwitch checked={range} onChange={setRange} label="Range" />
      <Box sx={{ width: "100%", px: 1.5, minHeight: vertical ? 230 : 76 }}>
        {range ? (
          <VSlider range value={rangeValue} onRangeChange={setRangeValue} min={min} max={max} disabled={disabled} readonly={readonly} vertical={vertical} label="Volume" prependIcon={<VolumeDown />} appendIcon={<VolumeUp />} />
        ) : (
          <VSlider value={volume} onChange={setVolume} min={min} max={max} disabled={disabled} readonly={readonly} vertical={vertical} label="Volume" prependIcon={<VolumeDown />} appendIcon={<VolumeUp />} />
        )}
      </Box>
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
          <VuetifyExampleBlock key={example.source} title={example.title} description={example.description} source={example.source} minHeight={example.minHeight}>
            {example.render}
          </VuetifyExampleBlock>
        ))}
      </Stack>
    </Box>
  );
}

function MinMaxExample() {
  const [slider, setSlider] = useState(40);
  const [range, setRange] = useState<[number, number]>([-20, 70]);
  return (
    <TransparentCard>
      <Subheader>Min and max default slider</Subheader>
      <CardText>
        <VSlider value={slider} onChange={setSlider} min={-50} max={90} hideDetails append={<NumberField value={slider} onChange={setSlider} />} />
      </CardText>
      <Subheader>Min and max range slider</Subheader>
      <CardText>
        <VSlider range value={range} onRangeChange={setRange} min={-50} max={90} hideDetails prepend={<NumberField value={range[0]} onChange={(value) => setRange([value, range[1]])} />} append={<NumberField value={range[1]} onChange={(value) => setRange([range[0], value])} />} />
      </CardText>
    </TransparentCard>
  );
}

function IconsExample() {
  const [media, setMedia] = useState(0);
  const [alarm, setAlarm] = useState(0);
  const [zoom, setZoom] = useState(0);
  return (
    <TransparentCard>
      <Subheader>Media volume</Subheader>
      <CardText><VSlider value={media} onChange={setMedia} prependIcon={<VolumeUp />} /></CardText>
      <Subheader>Alarm volume</Subheader>
      <CardText><VSlider value={alarm} onChange={setAlarm} appendIcon={<Alarm />} /></CardText>
      <Subheader>Icon click callback</Subheader>
      <CardText><VSlider value={zoom} onChange={setZoom} prependIcon={<ZoomOut />} appendIcon={<ZoomIn />} onPrependClick={() => setZoom((value) => Math.max(0, value - 10))} onAppendClick={() => setZoom((value) => Math.min(100, value + 10))} /></CardText>
    </TransparentCard>
  );
}

function VerticalExample() {
  const [value, setValue] = useState(10);
  const [range, setRange] = useState<[number, number]>([20, 40]);
  return <VContainer><Box sx={{ display: "flex", minHeight: 250, gap: 6, alignItems: "stretch" }}><VSlider value={value} onChange={setValue} vertical label="Regular" /><VSlider range value={range} onRangeChange={setRange} vertical label="Range" /></Box></VContainer>;
}

function ThumbExample() {
  const [slider, setSlider] = useState(45);
  const emojis = ["😭", "😢", "☹️", "🙁", "😐", "🙂", "😊", "😁", "😄", "😍"];
  return (
    <VContainer>
      <Subheader noPad>Show thumb when using slider</Subheader><VSlider value={slider} onChange={setSlider} thumbLabel />
      <Subheader noPad>Always show thumb label</Subheader><VSlider value={slider} onChange={setSlider} thumbLabel="always" />
      <Subheader noPad>Custom thumb size</Subheader><VSlider value={slider} onChange={setSlider} thumbLabel="always" thumbSize={24} />
      <Subheader noPad>Custom thumb label</Subheader><VSlider value={slider} onChange={setSlider} thumbLabel="always" thumbSize={24} thumbContent={emojis[Math.min(Math.floor(slider / 10), 9)]} />
    </VContainer>
  );
}

function CustomThumbExample() {
  const [range, setRange] = useState<[number, number]>([0, 1]);
  const seasons = ["Winter", "Spring", "Summer", "Fall"];
  const icons = [
    <AcUnit key="winter" sx={{ fontSize: 18 }} />,
    <Spa key="spring" sx={{ fontSize: 18 }} />,
    <LocalFireDepartment key="summer" sx={{ fontSize: 18 }} />,
    <Opacity key="fall" sx={{ fontSize: 18 }} />,
  ];
  return <Box sx={{ px: 6, py: 5 }}><VSlider range value={range} onRangeChange={setRange} min={0} max={3} step={1} ticks="always" tickSize={4} tickLabels={seasons} thumbLabel syncRangeThumbLabels thumbContent={(value) => icons[value]} /></Box>;
}

function InverseLabelExample() {
  const [value, setValue] = useState(30);
  return <VContainer><VSlider label="Inverse label" value={value} onChange={setValue} inverseLabel /></VContainer>;
}

function TicksExample() {
  const [value, setValue] = useState(0);
  const [fruits, setFruits] = useState(0);
  return (
    <TransparentCard>
      <Subheader>Show ticks when using slider</Subheader><CardText><VSlider value={value} onChange={setValue} step={10} ticks /></CardText>
      <Subheader>Always show ticks</Subheader><CardText><VSlider value={value} onChange={setValue} step={10} ticks="always" /></CardText>
      <Subheader>Tick size</Subheader><CardText><VSlider value={value} onChange={setValue} step={10} ticks="always" tickSize={4} /></CardText>
      <Subheader>Tick labels</Subheader><CardText><VSlider value={fruits} onChange={setFruits} max={3} step={1} ticks="always" tickSize={4} tickLabels={["Figs", "Lemon", "Pear", "Apple"]} /></CardText>
    </TransparentCard>
  );
}

function CustomColorsExample() {
  const [one, setOne] = useState(25);
  const [two, setTwo] = useState(75);
  const [three, setThree] = useState(50);
  return <Box><VSlider value={one} onChange={setOne} color="orange darken-3" label="color" /><VSlider value={two} onChange={setTwo} trackColor="green lighten-1" label="track-color" /><VSlider value={three} onChange={setThree} thumbColor="red" thumbLabel="always" label="thumb-color" /></Box>;
}

function RangeExample() {
  const [value1, setValue1] = useState<[number, number]>([30, 60]);
  return <TransparentCard><Subheader>Default range slider</Subheader><CardText><VSlider range value={value1} onRangeChange={setValue1} /></CardText><Subheader>Disabled range slider</Subheader><CardText><VSlider range value={[30, 60]} disabled /></CardText></TransparentCard>;
}

function ValidationExample() {
  const [value, setValue] = useState(30);
  const error = value > 40 ? "Only 40 in stock" : "";
  return <TransparentCard><Subheader>Rules</Subheader><CardText pt0><VSlider value={value} onChange={setValue} label="How many?" step={10} thumbLabel="always" ticks errorMessage={error} /></CardText><Subheader>Persistent hint</Subheader><CardText pt0><VSlider value={value} onChange={setValue} label="How many?" step={10} thumbLabel="always" ticks hint="40 in stock" persistentHint errorMessage={error} /></CardText></TransparentCard>;
}

function MetronomeExample() {
  const [bpm, setBpm] = useState(40);
  const [playing, setPlaying] = useState(false);
  const color = bpm < 100 ? "indigo" : bpm < 125 ? "teal" : bpm < 140 ? "green" : bpm < 175 ? "orange" : "red";
  const activeColor = colorMap[color];
  return (
    <Card sx={{ maxWidth: 600, mx: "auto", bgcolor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,.18)", borderRadius: .5 }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, px: 2 }}><Typography sx={{ fontSize: 16 }}>METRONOME</Typography><Box sx={{ flexGrow: 1 }} /><IconButton size="small"><Share sx={{ fontSize: 20 }} /></IconButton></Toolbar>
      <Box sx={{ px: 2, pb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}><Typography sx={{ fontSize: 58, fontWeight: 300, lineHeight: 1 }}>{bpm}</Typography><Typography sx={{ fontSize: 16, fontWeight: 300, mr: 1 }}>BPM</Typography>{playing && <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: activeColor, mb: .8, animation: `metronomePulse ${60 / bpm}s infinite alternate`, "@keyframes metronomePulse": { from: { transform: "scale(.5)" }, to: { transform: "scale(1)" } } }} />}</Box>
          <IconButton onClick={() => setPlaying((value) => !value)} sx={{ width: 56, height: 56, bgcolor: activeColor, color: "#fff", boxShadow: "none", "&:hover": { bgcolor: activeColor } }}>{playing ? <Pause /> : <PlayArrow />}</IconButton>
        </Box>
        <VSlider value={bpm} onChange={setBpm} min={40} max={218} color={color} trackColor="grey" alwaysDirty prependIcon={<Remove />} appendIcon={<Add />} onPrependClick={() => setBpm((value) => Math.max(40, value - 1))} onAppendClick={() => setBpm((value) => Math.min(218, value + 1))} />
      </Box>
    </Card>
  );
}

function VSlider({
  value,
  onChange,
  defaultValue = 0,
  range = false,
  onRangeChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  hint,
  persistentHint = false,
  disabled = false,
  readonly = false,
  vertical = false,
  hideDetails = false,
  inverseLabel = false,
  thumbLabel = false,
  thumbSize = 32,
  thumbContent,
  ticks = false,
  tickSize = 2,
  tickLabels,
  color = "primary",
  trackColor,
  thumbColor,
  prependIcon,
  appendIcon,
  prepend,
  append,
  onPrependClick,
  onAppendClick,
  errorMessage = "",
  alwaysDirty = false,
  dense = false,
  syncRangeThumbLabels = false,
}: {
  value?: number | [number, number];
  onChange?: (value: number) => void;
  defaultValue?: number;
  range?: boolean;
  onRangeChange?: (value: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: ReactNode;
  hint?: string;
  persistentHint?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  vertical?: boolean;
  hideDetails?: boolean;
  inverseLabel?: boolean;
  thumbLabel?: boolean | "always";
  thumbSize?: number;
  thumbContent?: ReactNode | ((value: number) => ReactNode);
  ticks?: boolean | "always";
  tickSize?: number;
  tickLabels?: string[];
  color?: SliderColor;
  trackColor?: SliderColor;
  thumbColor?: SliderColor;
  prependIcon?: ReactNode;
  appendIcon?: ReactNode;
  prepend?: ReactNode;
  append?: ReactNode;
  onPrependClick?: () => void;
  onAppendClick?: () => void;
  errorMessage?: string;
  alwaysDirty?: boolean;
  dense?: boolean;
  syncRangeThumbLabels?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [internal, setInternal] = useState(defaultValue);
  const [internalRange, setInternalRange] = useState<[number, number]>([30, 60]);
  const [activeThumb, setActiveThumb] = useState<"single" | "start" | "end" | null>(null);
  const [focusedThumb, setFocusedThumb] = useState<"single" | "start" | "end" | null>(null);
  const low = Math.min(min, max);
  const high = Math.max(min, max);
  const span = Math.max(high - low, step || 1);
  const current = clampToStep(typeof value === "number" ? value : internal, low, high, step);
  const rawRangeValue = Array.isArray(value) ? value : internalRange;
  const rangeValue: [number, number] = [
    clampToStep(Math.min(rawRangeValue[0], rawRangeValue[1]), low, high, step),
    clampToStep(Math.max(rawRangeValue[0], rawRangeValue[1]), low, high, step),
  ];
  const activeColor = errorMessage ? "#ff5252" : colorMap[color];
  const inactiveColor = trackColor ? colorMap[trackColor] : "rgba(0,0,0,.26)";
  const actualThumbColor = errorMessage ? "#ff5252" : thumbColor ? colorMap[thumbColor] : activeColor;
  const disabledColor = "rgba(0,0,0,.26)";
  const pct = (v: number) => ((v - low) / span) * 100;
  const startPct = range ? pct(rangeValue[0]) : 0;
  const endPct = range ? pct(rangeValue[1]) : pct(current);
  const fillStart = range ? startPct : 0;
  const fillEnd = range ? endPct : pct(current);
  const setSingle = (next: number) => {
    if (disabled || readonly) return;
    const clamped = clampToStep(next, low, high, step);
    if (onChange) onChange(clamped);
    else setInternal(clamped);
  };
  const setRange = (which: "start" | "end", next: number) => {
    if (disabled || readonly) return;
    const clamped = clampToStep(next, low, high, step);
    const nextRange: [number, number] = which === "start" ? [Math.min(clamped, rangeValue[1]), rangeValue[1]] : [rangeValue[0], Math.max(clamped, rangeValue[0])];
    if (onRangeChange) onRangeChange(nextRange);
    else setInternalRange(nextRange);
  };
  const valueFromPointer = (event: ReactPointerEvent<HTMLElement>) => {
    const track = trackRef.current;
    if (!track) return low;
    const rect = track.getBoundingClientRect();
    const ratio = vertical ? (rect.bottom - event.clientY) / Math.max(rect.height, 1) : (event.clientX - rect.left) / Math.max(rect.width, 1);
    return clampToStep(low + clamp(ratio, 0, 1) * span, low, high, step);
  };
  const moveThumb = (thumb: "single" | "start" | "end", event: ReactPointerEvent<HTMLElement>) => {
    const next = valueFromPointer(event);
    if (thumb === "single") setSingle(next);
    else setRange(thumb, next);
  };
  const pickRangeThumb = (next: number) => (Math.abs(next - rangeValue[0]) <= Math.abs(next - rangeValue[1]) ? "start" : "end");
  const beginDrag = (thumb: "single" | "start" | "end", event: ReactPointerEvent<HTMLElement>) => {
    if (disabled || readonly) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    setFocusedThumb(thumb);
    setActiveThumb(thumb);
    moveThumb(thumb, event);
  };
  const beginTrackDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if (disabled || readonly) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const next = valueFromPointer(event);
    const thumb = range ? pickRangeThumb(next) : "single";
    setFocusedThumb(thumb);
    setActiveThumb(thumb);
    if (thumb === "single") setSingle(next);
    else setRange(thumb, next);
  };
  const continueDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if (!activeThumb) return;
    event.preventDefault();
    moveThumb(activeThumb, event);
  };
  const stopDrag = () => setActiveThumb(null);
  const isDirty = alwaysDirty || (range ? rangeValue[0] !== low || rangeValue[1] !== low : current !== low);
  const showSyncedRangeLabels = Boolean(range && syncRangeThumbLabels && thumbLabel && (activeThumb || focusedThumb));
  const showThumb = (thumb: "single" | "start" | "end") => thumbLabel === "always" || (thumbLabel && (showSyncedRangeLabels || activeThumb === thumb || focusedThumb === thumb));
  const showTicks = Boolean(ticks && (ticks === "always" || tickLabels?.length || activeThumb));
  useEffect(() => {
    if (!focusedThumb) return undefined;
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setFocusedThumb(null);
        setActiveThumb(null);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [focusedThumb]);
  const sliderTrack = (
    <Box
      ref={trackRef}
      onPointerDown={beginTrackDrag}
      onPointerMove={continueDrag}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
      sx={{ position: "relative", flex: 1, minWidth: vertical ? 40 : 0, height: vertical ? 180 : dense ? 26 : 32, display: "flex", alignItems: "center", justifyContent: "center", touchAction: "none", cursor: disabled || readonly ? "default" : "pointer" }}
    >
      <Box sx={{ position: "absolute", ...(vertical ? { top: 0, bottom: 0, left: "50%", width: 2, transform: "translateX(-50%)" } : { left: 0, right: 0, top: "50%", height: 2, transform: "translateY(-50%)" }), bgcolor: disabled ? disabledColor : inactiveColor }} />
      <Box sx={{ position: "absolute", ...(vertical ? { left: "50%", width: 2, transform: "translateX(-50%)", bottom: `${fillStart}%`, height: `${Math.max(0, fillEnd - fillStart)}%` } : { top: "50%", height: 2, transform: "translateY(-50%)", left: `${fillStart}%`, width: `${Math.max(0, fillEnd - fillStart)}%` }), bgcolor: disabled ? disabledColor : activeColor }} />
      {ticks && <Ticks min={low} max={high} step={step} vertical={vertical} size={tickSize} labels={tickLabels} fillStart={fillStart} fillEnd={fillEnd} visible={showTicks} />}
      {range ? (
        <>
          <Thumb value={rangeValue[0]} min={low} max={high} vertical={vertical} color={disabled ? disabledColor : actualThumbColor} pct={startPct} showLabel={showThumb("start")} size={thumbSize} content={typeof thumbContent === "function" ? thumbContent(rangeValue[0]) : thumbContent || rangeValue[0]} onPointerDown={(event) => beginDrag("start", event)} onPointerMove={continueDrag} onPointerUp={stopDrag} />
          <Thumb value={rangeValue[1]} min={low} max={high} vertical={vertical} color={disabled ? disabledColor : actualThumbColor} pct={endPct} showLabel={showThumb("end")} size={thumbSize} content={typeof thumbContent === "function" ? thumbContent(rangeValue[1]) : thumbContent || rangeValue[1]} onPointerDown={(event) => beginDrag("end", event)} onPointerMove={continueDrag} onPointerUp={stopDrag} />
        </>
      ) : (
        <>
          <Thumb value={current} min={low} max={high} vertical={vertical} color={disabled || !isDirty ? disabledColor : actualThumbColor} pct={pct(current)} showLabel={showThumb("single")} size={thumbSize} content={typeof thumbContent === "function" ? thumbContent(current) : thumbContent || current} onPointerDown={(event) => beginDrag("single", event)} onPointerMove={continueDrag} onPointerUp={stopDrag} />
        </>
      )}
    </Box>
  );
  return (
    <Box ref={rootRef} sx={{ width: vertical ? "auto" : "100%", display: vertical ? "inline-flex" : "block", opacity: disabled ? .55 : 1 }}>
      <Box sx={{ display: "flex", flexDirection: vertical ? "column" : "row", alignItems: vertical ? "center" : "center", minHeight: vertical ? 220 : dense ? 42 : 52, gap: inverseLabel ? 0 : 1.25 }}>
        {!inverseLabel && label && <SliderLabel>{label}</SliderLabel>}
        {prependIcon && <SliderIcon onClick={onPrependClick}>{prependIcon}</SliderIcon>}
        {prepend}
        {sliderTrack}
        {append}
        {appendIcon && <SliderIcon onClick={onAppendClick}>{appendIcon}</SliderIcon>}
        {inverseLabel && label && <SliderLabel inverse>{label}</SliderLabel>}
      </Box>
      {!hideDetails && (
        <Box sx={{ minHeight: 18, ml: label && !inverseLabel && !vertical ? 9 : 0, display: "flex", alignItems: "center", gap: .5, color: errorMessage ? "#ff5252" : "rgba(0,0,0,.6)" }}>
          {errorMessage && <ErrorOutline sx={{ fontSize: 14 }} />}
          <Typography sx={{ fontSize: 12 }}>{errorMessage || (persistentHint ? hint : "")}</Typography>
        </Box>
      )}
    </Box>
  );
}

function Thumb({ pct, vertical, color, showLabel, size, content, onPointerDown, onPointerMove, onPointerUp }: { value: number; min: number; max: number; pct: number; vertical: boolean; color: string; showLabel: boolean; size: number; content: ReactNode; onPointerDown: (event: ReactPointerEvent<HTMLElement>) => void; onPointerMove: (event: ReactPointerEvent<HTMLElement>) => void; onPointerUp: () => void }) {
  return (
    <Box onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} sx={{ position: "absolute", ...(vertical ? { bottom: `${pct}%`, left: "50%", transform: "translate(-50%, 50%)" } : { left: `${pct}%`, top: "50%", transform: "translate(-50%, -50%)" }), zIndex: 3, pointerEvents: "auto", cursor: "pointer", touchAction: "none" }}>
      <Box sx={{ position: "absolute", left: "50%", bottom: vertical ? "calc(100% + 8px)" : "calc(100% + 9px)", transform: showLabel ? "translateX(-50%) scale(1)" : "translateX(-50%) scale(.4)", opacity: showLabel ? 1 : 0, transition: "transform 160ms cubic-bezier(.4,0,.2,1), opacity 120ms ease" }}>
        <Box sx={{ width: size, height: size, borderRadius: "50% 50% 0", bgcolor: color, color: "#fff", transform: "rotate(45deg)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 4px rgba(0,0,0,.22)" }}>
          <Box sx={{ transform: "rotate(-45deg)", fontSize: size <= 24 ? 12 : 13, lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>{content}</Box>
        </Box>
      </Box>
      <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: color, boxShadow: "0 2px 4px rgba(0,0,0,.28)" }} />
    </Box>
  );
}

function Ticks({ min, max, step, vertical, size, labels, fillStart, fillEnd, visible }: { min: number; max: number; step: number; vertical: boolean; size: number; labels?: string[]; fillStart: number; fillEnd: number; visible: boolean }) {
  const count = Math.floor((max - min) / step) + 1;
  return (
    <>
      {Array.from({ length: count }).map((_, index) => {
        const pct = (index / (count - 1)) * 100;
        const filled = pct >= fillStart && pct <= fillEnd;
        return <Box key={index} sx={{ position: "absolute", ...(vertical ? { bottom: `calc(${pct}% - ${size / 2}px)`, left: `calc(50% - ${size / 2}px)` } : { left: `calc(${pct}% - ${size / 2}px)`, top: `calc(50% - ${size / 2}px)` }), width: size, height: size, borderRadius: 0, opacity: visible ? 1 : 0, bgcolor: filled ? "rgba(255,255,255,.5)" : "rgba(0,0,0,.5)", transition: "opacity .3s cubic-bezier(.25,.8,.5,1), background-color .3s cubic-bezier(.25,.8,.5,1)" }} />;
      })}
      {labels?.map((label, index) => {
        const pct = (index / Math.max(labels.length - 1, 1)) * 100;
        const transform = index === 0 ? "none" : index === labels.length - 1 ? "translateX(-100%)" : "translateX(-50%)";
        return <Typography key={label} sx={{ position: "absolute", left: `calc(${pct}% - ${size / 2}px)`, top: `calc(50% + ${8 - size / 2}px)`, transform, fontSize: 12, color: "rgba(0,0,0,.54)", userSelect: "none", whiteSpace: "nowrap" }}>{label}</Typography>;
      })}
    </>
  );
}

function SliderLabel({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return <Typography sx={{ width: 78, minWidth: 78, ml: inverse ? 1.5 : 0, mr: inverse ? 0 : 1.5, fontSize: 16, color: "rgba(0,0,0,.6)" }}>{children}</Typography>;
}

function SliderIcon({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return <IconButton size="small" onClick={onClick} sx={{ color: "rgba(0,0,0,.54)" }}>{children}</IconButton>;
}

function VSwitch({ checked, onChange, label }: { checked: boolean; onChange: (value: boolean) => void; label: string }) {
  return (
    <Box onClick={() => onChange(!checked)} sx={{ display: "inline-flex", alignItems: "center", m: 2, cursor: "pointer", userSelect: "none" }}>
      <Box sx={{ width: 42, height: 34, position: "relative", mr: .5, display: "flex", alignItems: "center" }}>
        <Box sx={{ width: 34, height: 14, borderRadius: 8, bgcolor: checked ? primary : "rgba(0,0,0,.38)", opacity: checked ? .5 : .38, transition: "background-color 180ms ease" }} />
        <Box sx={{ position: "absolute", left: checked ? 18 : 0, width: 20, height: 20, borderRadius: "50%", bgcolor: checked ? primary : "#fafafa", boxShadow: "0 2px 4px rgba(0,0,0,.32)", transition: "left 180ms cubic-bezier(.4,0,.2,1), background-color 180ms ease" }} />
      </Box>
      <Typography sx={{ fontSize: 16 }}>{label}</Typography>
    </Box>
  );
}

function VContainer({ children, px = 3 }: { children: ReactNode; px?: number }) {
  return <Box sx={{ width: "100%", px: { xs: 1.5, md: px }, py: 1 }}>{children}</Box>;
}

function TransparentCard({ children }: { children: ReactNode }) {
  return <Card sx={{ boxShadow: "none", bgcolor: "transparent" }}>{children}</Card>;
}

function CardText({ children, pt0 = false }: { children: ReactNode; pt0?: boolean }) {
  return <Box sx={{ px: 2, py: pt0 ? 0 : 2 }}>{children}</Box>;
}

function Subheader({ children, noPad = false }: { children: ReactNode; noPad?: boolean }) {
  return <Typography sx={{ minHeight: 48, display: "flex", alignItems: "center", px: noPad ? 0 : 2, color: "rgba(0,0,0,.6)", fontSize: 16 }}>{children}</Typography>;
}

function NumberField({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <TextField
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      type="number"
      variant="standard"
      sx={{ width: 60, "& input": { fontSize: 16, textAlign: "left" } }}
    />
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function clampToStep(value: number, min: number, max: number, step: number) {
  const safeStep = step || 1;
  const clamped = clamp(value, min, max);
  const snapped = Math.round((clamped - min) / safeStep) * safeStep + min;
  const decimals = (safeStep.toString().split(".")[1] || "").length;
  return Number(clamp(snapped, min, max).toFixed(decimals));
}

function VuetifyExampleBlock({ title, description, source, children, minHeight }: { title: string; description: ReactNode; source: ExampleKey; children: () => ReactNode; minHeight: number }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, alignItems: "center", px: 2, bgcolor: "transparent" }}>
        <Typography sx={{ fontSize: 20, fontWeight: 400, lineHeight: 1.35 }}>{title}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", maxHeight: { xs: "none", sm: "calc(100vh - 275px)" }, overflowY: "auto", p: 2 }}>
          <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box>
        </Box>
      </Collapse>
      <Box sx={{ px: 2, py: 2, minHeight, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", overflow: "visible" }}>
        {description && <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography>}
        {children()}
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

const examples: Example[] = [
  { title: "Min & Max values", description: <>You can set <CodePill>min</CodePill> and <CodePill>max</CodePill> values of sliders.</>, source: "simple/min-max", minHeight: 330, render: () => <MinMaxExample /> },
  { title: "Disabled", description: <>You cannot interact with <CodePill>disabled</CodePill> sliders.</>, source: "simple/disabled", minHeight: 150, render: () => <VContainer><VSlider label="Disabled" value={30} disabled /></VContainer> },
  { title: "Readonly", description: <>You cannot interact with <CodePill>readonly</CodePill> sliders, but they look as ordinary ones.</>, source: "simple/readonly", minHeight: 150, render: () => <VContainer><VSlider label="Readonly" value={30} readonly /></VContainer> },
  { title: "Icons", description: <>You can add icons to the slider with the <CodePill>append-icon</CodePill> and <CodePill>prepend-icon</CodePill> props. With <CodePill>@click:append</CodePill> and <CodePill>@click:prepend</CodePill> you can trigger a callback function when click the icon.</>, source: "simple/icons", minHeight: 405, render: () => <IconsExample /> },
  { title: "Vertical sliders", description: <>You can use <CodePill>vertical</CodePill> to switch sliders to a vertical orientation. If you need to change the height of the slider, use css.</>, source: "simple/vertical", minHeight: 300, render: () => <VerticalExample /> },
  { title: "Thumb", description: <>You can display a <CodePill>thumb-label</CodePill> while sliding or always. It It can have a custom color by setting <CodePill>thumb-color</CodePill> and a custom size with <CodePill>thumb-size</CodePill>. With <CodePill>always-dirty</CodePill> its color will never change, even when on <CodePill>min</CodePill> value.</>, source: "simple/thumb", minHeight: 390, render: () => <ThumbExample /> },
  { title: "Inverse label", description: <><CodePill>v-slider</CodePill> with <CodePill>inverse-label</CodePill> property displays label at the end of it.</>, source: "simple/inverse-label", minHeight: 150, render: () => <InverseLabelExample /> },
  { title: "Custom Range slider", description: <> Using the <CodePill>tick-labels</CodePill> prop along with slots, you can create a very customized solution.</>, source: "simple/custom-thumb", minHeight: 220, render: () => <CustomThumbExample /> },
  { title: "Ticks", description: <>Tick marks represent predetermined values to which the user can move the slider.</>, source: "simple/ticks", minHeight: 430, render: () => <TicksExample /> },
  { title: "Custom colors", description: <>You can set the colors of the slider using the props <CodePill>color</CodePill>, <CodePill>track-color</CodePill> and <CodePill>thumb-color</CodePill>.</>, source: "simple/custom-colors", minHeight: 245, render: () => <CustomColorsExample /> },
  { title: "Range", description: <>Range sliders.</>, source: "simple/range", minHeight: 260, render: () => <RangeExample /> },
  { title: "Validation", description: <>Vuetify includes simple validation through the <CodePill>rules</CodePill> prop. The prop accepts an array of callbacks. While validating rules, the current v-model value will be passed to the callback. This callback should return either <CodePill>true</CodePill> or a <CodePill>String</CodePill>, the error message.</>, source: "intermediate/validation", minHeight: 310, render: () => <ValidationExample /> },
  { title: "Slots", description: <>Use slots such as <CodePill>prepend</CodePill> and <CodePill>append</CodePill> to easily customize the <CodePill>v-slider</CodePill> to fit any situation.</>, source: "intermediate/metronome", minHeight: 310, render: () => <MetronomeExample /> },
];

const sourceTemplates = {
  usage: "src/demo/usages/sliders.vue",
  playground: "src/demo/examples/sliders/playground.vue",
  "simple/min-max": "src/demo/examples/sliders/simple/min-max.vue",
  "simple/disabled": "src/demo/examples/sliders/simple/disabled.vue",
  "simple/readonly": "src/demo/examples/sliders/simple/readonly.vue",
  "simple/icons": "src/demo/examples/sliders/simple/icons.vue",
  "simple/vertical": "src/demo/examples/sliders/simple/vertical.vue",
  "simple/thumb": "src/demo/examples/sliders/simple/thumb.vue",
  "simple/inverse-label": "src/demo/examples/sliders/simple/inverse-label.vue",
  "simple/custom-thumb": "src/demo/examples/sliders/simple/custom-thumb.vue",
  "simple/ticks": "src/demo/examples/sliders/simple/ticks.vue",
  "simple/custom-colors": "src/demo/examples/sliders/simple/custom-colors.vue",
  "simple/range": "src/demo/examples/sliders/simple/range.vue",
  "intermediate/validation": "src/demo/examples/sliders/intermediate/validation.vue",
  "intermediate/metronome": "src/demo/examples/sliders/intermediate/metronome.vue",
};
