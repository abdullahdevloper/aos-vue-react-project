import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Box, Button, Card, Checkbox, Chip, Collapse, IconButton, MenuItem, Select, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { CalendarToday, ChevronLeft, ChevronRight, Close, Code, Event, GitHub, InvertColors, Palette, SkipNext, SkipPrevious } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const accent = "#0097a7";
const greenLighten1 = "#66bb6a";
const warning = "#fb8c00";
const shadow2 = "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";

type PickerType = "date" | "month";
type PickerValue = string | string[];
type ActivePicker = "DATE" | "MONTH" | "YEAR";
type ExampleKey = keyof typeof sourceTemplates;
type AnimationDirection = "forward" | "reverse";
type AnimationVariant = "tab" | "picker" | "fade";

const todayIso = () => new Date().toISOString().slice(0, 10);
const todayMonth = () => new Date().toISOString().slice(0, 7);
const pad = (value: number, size = 2) => String(value).padStart(size, "0");
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parseDateParts(value: string | undefined, type: PickerType) {
  const fallback = type === "month" ? todayMonth() : todayIso();
  const parts = (value || fallback).split("-").map(Number);
  return { year: parts[0], month: (parts[1] || 1) - 1, day: parts[2] || 1 };
}

function monthKey(year: number, month: number) {
  return `${pad(year, 4)}-${pad(month + 1)}`;
}

function dateKey(year: number, month: number, day: number) {
  return `${monthKey(year, month)}-${pad(day)}`;
}

function formatHeader(value: string, locale?: string) {
  const [year, month] = value.split("-").map(Number);
  return new Intl.DateTimeFormat(locale || undefined, { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(year, (month || 1) - 1, 1)));
}

function formatTitleDate(value: PickerValue | undefined, type: PickerType, locale?: string) {
  if (Array.isArray(value)) {
    if (!value.length) return "";
    if (value.length > 1) return `${value.length} selected`;
    return formatTitleDate(value[0], type, locale);
  }
  if (!value) return "";
  const [year, month = 1, day = 1] = value.split("-").map(Number);
  if (!Number.isFinite(year) || !Number.isFinite(month)) return "";
  if (type === "month") return new Intl.DateTimeFormat(locale || undefined, { month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(year, month - 1, 1)));
  return new Intl.DateTimeFormat(locale || undefined, { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(year, month - 1, Number.isFinite(day) ? day : 1)));
}

function formatYear(value: PickerValue | undefined, tableYear: number) {
  if (Array.isArray(value)) value = value[0];
  return value ? value.slice(0, 4) : String(tableYear);
}

function colorValue(color?: string) {
  if (color === "green lighten-1") return greenLighten1;
  if (color === "primary") return primary;
  if (color === "warning") return warning;
  if (color === "error" || color === "red") return "#f44336";
  if (color === "purple") return "#9c27b0";
  if (color === "yellow") return "#ffeb3b";
  return color || accent;
}

function isBefore(value: string, min?: string) {
  return !!min && value < min;
}

function isAfter(value: string, max?: string) {
  return !!max && value > max;
}

function selectedIncludes(value: PickerValue | undefined, item: string, range?: boolean) {
  if (Array.isArray(value)) {
    if (range && value.length === 2) {
      const [from, to] = [...value].sort();
      return from <= item && item <= to;
    }
    return value.includes(item);
  }
  return value === item;
}

function normalizeValueForType(value: PickerValue, type: PickerType): PickerValue {
  const normalizeOne = (entry: string) => {
    if (!entry) return entry;
    if (type === "month") return entry.slice(0, 7);
    return entry.length === 7 ? `${entry}-01` : entry;
  };
  return Array.isArray(value) ? value.map(normalizeOne) : normalizeOne(value);
}

interface DatePickerProps {
  value?: PickerValue;
  onChange?: (value: PickerValue) => void;
  type?: PickerType;
  color?: string;
  headerColor?: string;
  landscape?: boolean;
  fullWidth?: boolean;
  width?: number | string;
  noTitle?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  range?: boolean;
  reactive?: boolean;
  showCurrent?: boolean | string;
  min?: string;
  max?: string;
  allowedDates?: (value: string) => boolean;
  events?: ((value: string) => boolean | string | string[]) | string[] | Record<string, boolean | string | string[]> | null;
  eventColor?: string | ((value: string) => string | string[]);
  locale?: string;
  firstDayOfWeek?: number;
  prevIcon?: "skip" | "chevron";
  nextIcon?: "skip" | "chevron";
  yearIcon?: boolean;
  initialActivePicker?: ActivePicker;
  scrollable?: boolean;
  pickerDate?: string | null;
  onPickerDateChange?: (value: string) => void;
  children?: ReactNode;
}

function VDatePicker({
  value: valueProp,
  onChange,
  type = "date",
  color,
  headerColor,
  landscape = false,
  fullWidth = false,
  width = 290,
  noTitle = false,
  readonly = false,
  disabled = false,
  multiple = false,
  range = false,
  reactive = false,
  showCurrent = true,
  min,
  max,
  allowedDates,
  events = null,
  eventColor = "warning",
  locale,
  firstDayOfWeek = 0,
  prevIcon = "chevron",
  nextIcon = "chevron",
  yearIcon = false,
  initialActivePicker,
  pickerDate,
  onPickerDateChange,
  children,
}: DatePickerProps) {
  const defaultValue = type === "month" ? todayMonth() : todayIso();
  const [internalValue, setInternalValue] = useState<PickerValue>(multiple || range ? [] : defaultValue);
  const value = valueProp ?? internalValue;
  const lastValue = Array.isArray(value) ? value[value.length - 1] : value;
  const initialParts = parseDateParts(lastValue || (typeof showCurrent === "string" ? showCurrent : undefined), type);
  const [tableYear, setTableYear] = useState(initialParts.year);
  const [tableMonth, setTableMonth] = useState(initialParts.month);
  const [activePicker, setActivePicker] = useState<ActivePicker>(initialActivePicker || (type === "month" ? "MONTH" : "DATE"));
  const mainColor = colorValue(color);
  const titleColor = colorValue(headerColor || color || "primary");
  const tableDate = activePicker === "DATE" ? monthKey(tableYear, tableMonth) : String(tableYear);
  const tableDirection = useVueTabDirection(tableDate);
  const titleValueKey = Array.isArray(value) ? value.join("|") : value || "";
  const titleDirection = usePickerDirection(titleValueKey);
  const tableValue = type === "month" ? normalizeValueForType(value, "month") : value;
  const previousType = useRef(type);

  useEffect(() => {
    if (previousType.current === type) return;
    previousType.current = type;
    setActivePicker(type === "month" ? "MONTH" : "DATE");
    if (valueProp !== undefined) {
      const normalized = normalizeValueForType(valueProp, type);
      if (JSON.stringify(normalized) !== JSON.stringify(valueProp)) onChange?.(normalized);
    }
  }, [type]);

  useEffect(() => {
    if (pickerDate !== tableDate) onPickerDateChange?.(tableDate);
  }, [tableDate]);

  function updateTable(year: number, month = tableMonth) {
    setTableYear(year);
    setTableMonth(month);
    onPickerDateChange?.(type === "date" ? monthKey(year, month) : String(year));
  }

  function emit(next: PickerValue) {
    if (valueProp === undefined) setInternalValue(next);
    onChange?.(next);
  }

  function isAllowed(item: string) {
    return !isBefore(item, min) && !isAfter(item, max) && (!allowedDates || allowedDates(item));
  }

  function selectDate(item: string) {
    if (disabled || readonly || !isAllowed(item)) return;
    if (range) {
      const array = Array.isArray(value) ? value : [];
      emit(array.length === 1 ? [...array, item] : [item]);
      return;
    }
    if (multiple) {
      const array = Array.isArray(value) ? value : [];
      emit(array.includes(item) ? array.filter((entry) => entry !== item) : [...array, item]);
      return;
    }
    emit(item);
  }

  function selectMonth(item: string) {
    const [year, month] = item.split("-").map(Number);
    setTableYear(year);
    setTableMonth(month - 1);
    if (type === "date") {
      setActivePicker("DATE");
      if (reactive && !multiple && !range) selectDate(`${item}-${pad(parseDateParts(lastValue, "date").day)}`);
      return;
    }
    selectDate(item);
  }

  function selectYear(year: number) {
    setTableYear(year);
    setActivePicker("MONTH");
    if (type === "month") onPickerDateChange?.(String(year));
    if (type === "date") onPickerDateChange?.(monthKey(year, tableMonth));
  }

  function shift(sign: number) {
    if (activePicker === "DATE") {
      const date = new Date(Date.UTC(tableYear, tableMonth + sign, 1));
      updateTable(date.getUTCFullYear(), date.getUTCMonth());
    } else {
      updateTable(tableYear + sign, tableMonth);
    }
  }

  function eventColors(item: string) {
    let eventData: boolean | string | string[] | undefined;
    if (Array.isArray(events)) eventData = events.includes(item);
    else if (typeof events === "function") eventData = events(item) || false;
    else if (events) eventData = events[item] || false;
    if (!eventData) return [];
    if (eventData !== true) return (Array.isArray(eventData) ? eventData : [eventData]).map(colorValue);
    if (typeof eventColor === "function") {
      const output = eventColor(item);
      return (Array.isArray(output) ? output : [output]).map(colorValue);
    }
    return [colorValue(eventColor)];
  }

  const pickerWidth = fullWidth ? "100%" : width;
  return (
    <Box sx={{ display: fullWidth ? "flex" : "inline-flex", width: fullWidth ? "100%" : "auto", verticalAlign: "top" }}>
      <Box
        sx={{
          display: "inline-flex",
          flexDirection: landscape ? "row" : "column",
          position: "relative",
          borderRadius: 1,
          overflow: "hidden",
          boxShadow: shadow2,
          bgcolor: "#fff",
          width: pickerWidth,
          maxWidth: fullWidth ? "100%" : pickerWidth,
          fontSize: "1rem",
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {!noTitle && (
          <Box sx={{ bgcolor: titleColor, color: "#fff", p: 2, width: landscape ? 170 : "auto", minHeight: landscape ? 290 : 112, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Box onClick={() => !disabled && !readonly && setActivePicker("YEAR")} sx={{ opacity: activePicker === "YEAR" ? 1 : 0.6, cursor: readonly ? "default" : "pointer", fontSize: 14, fontWeight: 500, mb: 1, display: "inline-flex", alignItems: "center" }}>
              {formatYear(value, tableYear)} {yearIcon && <CalendarToday sx={{ ml: 0.5, fontSize: 16 }} />}
            </Box>
            <Box onClick={() => !disabled && !readonly && setActivePicker(type.toUpperCase() as ActivePicker)} sx={{ opacity: activePicker === "YEAR" ? 0.6 : 1, cursor: readonly ? "default" : "pointer", fontSize: 34, lineHeight: 1.06, fontWeight: 500, pb: 1, mb: -1, textAlign: "left" }}>
              <AnimatedReplace animationKey={titleValueKey || "empty"} variant="picker" direction={titleDirection} sx={{ minHeight: landscape ? 76 : 40, display: "block" }}>
                <Box component="span" sx={{ display: "block" }}>{formatTitleDate(value, type, locale) || "\u00a0"}</Box>
              </AnimatedReplace>
            </Box>
          </Box>
        )}
        <Box sx={{ flex: "1 0 auto", display: "flex", flexDirection: "column", alignItems: "center", bgcolor: "#fff", width: fullWidth ? "100%" : pickerWidth, overflow: "hidden" }}>
          <AnimatedReplace animationKey={activePicker} variant="fade" sx={{ width: "100%" }}>
            {activePicker === "YEAR" ? (
              <YearsView value={tableYear} min={min} max={max} color={mainColor} onSelect={selectYear} />
            ) : (
              <>
                <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, py: 0.5 }}>
                  <IconButton disabled={disabled} onClick={() => shift(-1)} sx={{ color: "rgba(0,0,0,.54)" }}>{prevIcon === "skip" ? <SkipPrevious /> : <ChevronLeft />}</IconButton>
                  <Box sx={{ flex: 1, textAlign: "center", overflow: "hidden", position: "relative" }}>
                    <AnimatedReplace animationKey={`${activePicker}:${tableDate}`} variant="tab" direction={tableDirection} sx={{ minHeight: 36 }}>
                      <Button onClick={() => !disabled && !readonly && setActivePicker(activePicker === "DATE" ? "MONTH" : "YEAR")} sx={{ color: "rgba(0,0,0,.87)", fontWeight: 700, textTransform: "none", px: 1, transition: "color .3s cubic-bezier(.25,.8,.5,1), background-color .3s cubic-bezier(.25,.8,.5,1)" }}>
                        {activePicker === "DATE" ? formatHeader(tableDate, locale) : tableYear}
                      </Button>
                    </AnimatedReplace>
                  </Box>
                  <IconButton disabled={disabled} onClick={() => shift(1)} sx={{ color: "rgba(0,0,0,.54)" }}>{nextIcon === "skip" ? <SkipNext /> : <ChevronRight />}</IconButton>
                </Box>
                <AnimatedReplace animationKey={`${activePicker}:${tableDate}`} variant="tab" direction={tableDirection} sx={{ height: 242, width: "100%" }}>
                  {activePicker === "DATE" ? (
                    <DateTable year={tableYear} month={tableMonth} value={value} color={mainColor} current={showCurrent === true ? todayIso() : typeof showCurrent === "string" ? showCurrent : null} firstDayOfWeek={firstDayOfWeek} locale={locale} isAllowed={isAllowed} range={range} eventColors={eventColors} onSelect={selectDate} />
                  ) : (
                    <MonthTable year={tableYear} value={tableValue} color={mainColor} current={showCurrent === true ? todayMonth() : typeof showCurrent === "string" ? showCurrent : null} isAllowed={isAllowed} range={range} eventColors={eventColors} locale={locale} onSelect={selectMonth} />
                  )}
                </AnimatedReplace>
              </>
            )}
          </AnimatedReplace>
          {children && <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1, p: 1 }}>{children}</Box>}
        </Box>
      </Box>
    </Box>
  );
}

function DateTable({ year, month, value, color, current, firstDayOfWeek, locale, isAllowed, range, eventColors, onSelect }: {
  year: number; month: number; value?: PickerValue; color: string; current: string | null; firstDayOfWeek: number; locale?: string; isAllowed: (value: string) => boolean; range?: boolean; eventColors: (value: string) => string[]; onSelect: (value: string) => void;
}) {
  const weekdays = useMemo(() => Array.from({ length: 7 }, (_, i) => {
    const day = 15 + ((i + firstDayOfWeek) % 7);
    return new Intl.DateTimeFormat(locale || undefined, { weekday: "narrow", timeZone: "UTC" }).format(new Date(Date.UTC(2017, 0, day)));
  }), [firstDayOfWeek, locale]);
  const firstDay = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const blanks = (firstDay - firstDayOfWeek + 7) % 7;
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells: Array<number | null> = [...Array(blanks).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);
  return (
    <Box sx={{ position: "relative", width: "100%", height: 242, px: 1.5 }}>
      <Box component="table" sx={{ width: "100%", tableLayout: "fixed", borderCollapse: "collapse" }}>
        <Box component="thead"><Box component="tr">{weekdays.map((day, index) => <Box key={`${day}-${index}`} component="th" sx={{ color: "rgba(0,0,0,.38)", fontSize: 12, fontWeight: 600, py: 1 }}>{day}</Box>)}</Box></Box>
        <Box component="tbody">
          {Array.from({ length: cells.length / 7 }, (_, row) => (
            <Box component="tr" key={row}>
              {cells.slice(row * 7, row * 7 + 7).map((day, col) => {
                if (!day) return <Box key={col} component="td" sx={{ width: 45 }} />;
                const item = dateKey(year, month, day);
                return <PickerCell key={item} value={item} label={String(day)} color={color} selected={selectedIncludes(value, item, range)} current={current === item} allowed={isAllowed(item)} events={eventColors(item)} onSelect={onSelect} />;
              })}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function MonthTable({ year, value, color, current, isAllowed, range, eventColors, locale, onSelect }: {
  year: number; value?: PickerValue; color: string; current: string | null; isAllowed: (value: string) => boolean; range?: boolean; eventColors: (value: string) => string[]; locale?: string; onSelect: (value: string) => void;
}) {
  return (
    <Box sx={{ position: "relative", width: "100%", height: 242, px: 1.5 }}>
      <Box component="table" sx={{ width: "100%", height: "100%", tableLayout: "fixed", borderCollapse: "collapse" }}>
        <Box component="tbody">
          {Array.from({ length: 4 }, (_, row) => (
            <Box component="tr" key={row}>
              {Array.from({ length: 3 }, (_, col) => {
                const month = row * 3 + col;
                const item = monthKey(year, month);
                const label = new Intl.DateTimeFormat(locale || undefined, { month: "short", timeZone: "UTC" }).format(new Date(Date.UTC(year, month, 1)));
                return <PickerCell key={item} value={item} label={label} color={color} selected={selectedIncludes(value, item, range)} current={current === item} allowed={isAllowed(item)} events={eventColors(item)} onSelect={onSelect} month />;
              })}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function PickerCell({ value, label, color, selected, current, allowed, events, onSelect, month = false }: {
  value: string; label: string; color: string; selected: boolean; current: boolean; allowed: boolean; events: string[]; onSelect: (value: string) => void; month?: boolean;
}) {
  return (
    <Box component="td" sx={{ textAlign: "center", position: "relative", width: month ? "33.333%" : 45, height: month ? 56 : "auto", verticalAlign: "middle" }}>
      <Button
        disabled={!allowed}
        onClick={() => onSelect(value)}
        sx={{
          minWidth: month ? 40 : 32,
          maxWidth: month ? 140 : 32,
          width: month ? "100%" : 32,
          height: 32,
          mx: "auto",
          borderRadius: selected || current ? 999 : month ? 1 : 999,
          textTransform: "none",
          fontSize: 12,
          color: selected ? "#fff" : allowed ? "rgba(0,0,0,.87)" : "rgba(0,0,0,.26)",
          bgcolor: selected ? color : "transparent",
          border: current && !selected ? `1px solid ${color}` : "1px solid transparent",
          p: 0,
          position: "relative",
          overflow: "visible",
          transition: "background-color .3s cubic-bezier(.25,.8,.5,1), border-color .3s cubic-bezier(.25,.8,.5,1), color .3s cubic-bezier(.25,.8,.5,1), box-shadow .3s cubic-bezier(.25,.8,.5,1), opacity .3s cubic-bezier(.25,.8,.5,1)",
          "&:hover": { bgcolor: selected ? color : "rgba(0,0,0,.06)" },
          "&:focus-visible": { boxShadow: `0 0 0 2px ${selected ? "rgba(255,255,255,.72)" : "rgba(0,151,167,.28)"}` },
        }}
      >
        <Box component="span" sx={{ transform: events.length ? "translateY(-4px)" : "none", transition: "transform .3s cubic-bezier(.25,.8,.5,1)" }}>{label}</Box>
        {!!events.length && (
          <Box component="span" sx={{ position: "absolute", bottom: month ? 3 : 2, left: 0, width: "100%", textAlign: "center", lineHeight: 0, whiteSpace: "pre", pointerEvents: "none" }}>
            {events.map((eventColor, index) => <Box component="span" key={index} sx={{ display: "inline-block", width: 8, height: 8, mx: "1px", borderRadius: "50%", bgcolor: eventColor }} />)}
          </Box>
        )}
      </Button>
    </Box>
  );
}

function YearsView({ value, min, max, color, onSelect }: { value: number; min?: string; max?: string; color: string; onSelect: (year: number) => void }) {
  const maxYear = max ? Number(max.slice(0, 4)) : value + 100;
  const minYear = Math.min(maxYear, min ? Number(min.slice(0, 4)) : value - 100);
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i);
  return (
    <Box component="ul" sx={{ fontSize: 16, fontWeight: 400, height: 290, overflow: "auto", textAlign: "center", listStyle: "none", p: 0, m: 0, width: "100%" }}>
      {years.map((year) => (
        <Box component="li" key={year} onClick={() => onSelect(year)} sx={{ cursor: "pointer", py: year === value ? "10px" : "8px", color: year === value ? color : "rgba(0,0,0,.87)", fontSize: year === value ? 26 : 16, fontWeight: year === value ? 500 : 400, "&:hover": { bgcolor: "rgba(0,0,0,.12)" } }}>
          {year}
        </Box>
      ))}
    </Box>
  );
}

export default function DatePickersPage() {
  return (
    <DocPage
      title="Date Pickers"
      namespace="Components"
      icon={<CalendarToday />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Date Pickers" },
      ]}
    >
      <DocText>The <CodePill>v-date-picker</CodePill> is stand-alone component that can be utilized in many existing Vuetify components. It offers the user a visual representation for selecting date/month.</DocText>
      <UsageSection />
      <PlaygroundSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  const [picker, setPicker] = useState<PickerValue>(todayIso());
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <BaseHeading id="usage">Usage</BaseHeading>
      <VuetifyExampleBlock title="" source="usage" description={<DocDesc>Date pickers come in two orientation variations, portrait <strong>(default)</strong> and landscape. By default they are emitting <CodePill>input</CodePill> event when the day (for date picker) or month (for month picker), but with <strong>reactive</strong> prop they can update the model even after clicking year/month.</DocDesc>}>
        {() => <Row justify="center"><VDatePicker value={picker} onChange={setPicker} /></Row>}
      </VuetifyExampleBlock>
    </Box>
  );
}

function PlaygroundSection() {
  const [picker, setPicker] = useState<PickerValue>(todayIso());
  const [state, setState] = useState({ landscape: false, reactive: false, fullWidth: false, showCurrent: true, month: false, multiple: false, readonly: false, disabled: false, enableEvents: false });
  const events = state.enableEvents ? (date: string) => {
    if (state.month) {
      const month = Number(date.split("-")[1]);
      if ([1, 3, 7].includes(month)) return true;
      if ([2, 5, 12].includes(month)) return ["error", "purple", "rgba(0, 128, 0, 0.5)"];
      return false;
    }
    const day = Number(date.split("-")[2]);
    if ([12, 17, 28].includes(day)) return true;
    if ([1, 19, 22].includes(day)) return ["red", "#00f"];
    return false;
  } : undefined;
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <BaseHeading id="playground">Playground</BaseHeading>
      <VuetifyExampleBlock title="" source="playground" description="">
        {() => (
          <Row justify="space-around">
            <Box sx={{ flexBasis: "100%", maxWidth: "100%" }}>
              <Row justify="space-around">
                {Object.entries({ Landscape: "landscape", Reactive: "reactive", "Full width": "fullWidth", "Show current date": "showCurrent", "Month picker": "month", Multiple: "multiple", Readonly: "readonly", Disabled: "disabled", Events: "enableEvents" }).map(([label, key]) => (
                  <VSwitch key={key} label={label} checked={state[key as keyof typeof state]} onChange={(checked) => setState((prev) => ({ ...prev, [key]: checked }))} />
                ))}
              </Row>
            </Box>
            <VDatePicker value={picker} onChange={setPicker} landscape={state.landscape} reactive={state.reactive} fullWidth={state.fullWidth} showCurrent={state.showCurrent} type={state.month ? "month" : "date"} multiple={state.multiple} readonly={state.readonly} disabled={state.disabled} events={events} />
          </Row>
        )}
      </VuetifyExampleBlock>
    </Box>
  );
}

function ExamplesSection() {
  const examples: Array<{ key: ExampleKey; title: string; description: ReactNode; render: () => ReactNode }> = [
    { key: "simple/date-colorable", title: "Date pickers - Colors", description: <>Date picker colors can be set using the <CodePill>color</CodePill> and <CodePill>header-color</CodePill> props. If <CodePill>header-color</CodePill> prop is not provided header will use the <CodePill>color</CodePill> prop value.</>, render: () => <DateColorable /> },
    { key: "simple/date-allowed-dates", title: "Date pickers - Allowed dates", description: "You can specify allowed dates using arrays, objects, and functions.", render: () => <DateAllowed /> },
    { key: "simple/date-width", title: "Date pickers - Setting picker width", description: "You can specify allowed the picker's width or make it full width.", render: () => <DateWidth /> },
    { key: "simple/date-picker-date", title: "Date pickers - react to displayed month/year change", description: <>You can watch the <CodePill>pickerDate</CodePill> which is the displayed month/year (depending on the picker type and active view) to perform some action when it changes.</>, render: () => <PickerDateExample /> },
    { key: "simple/date-internationalization", title: "Date pickers - Internationalization", description: <>The date picker supports internationalization through the JavaScript Date object. Specify a BCP 47 language tag using the <CodePill>locale</CodePill> prop, and then set the first day of the week with the <CodePill>first-day-of-week</CodePill> prop.</>, render: () => <DateInternationalization /> },
    { key: "simple/date-icons", title: "Date pickers - icons", description: "You can override the default icons used in the picker.", render: () => <DateIcons /> },
    { key: "simple/date-readonly", title: "Date pickers - read only", description: <><span>Selecting new date could be disabled by adding </span><strong>readonly</strong><span> prop.</span></>, render: () => <CenteredPicker readonly /> },
    { key: "simple/date-current", title: "Date pickers - current date indicator", description: <>By default the current date is displayed using outlined button - <strong>show-current</strong> prop allows you to remove the border or select different date to be displayed as the current one.</>, render: () => <DateCurrent /> },
    { key: "simple/month-light", title: "Month pickers", description: <>Month pickers come in two orientation variations, portrait <strong>(default)</strong> and landscape.</>, render: () => <MonthLight /> },
    { key: "simple/month-colorable", title: "Month pickers - Colors", description: <>Month picker colors can be set using the <CodePill>color</CodePill> and <CodePill>header-color</CodePill> props. If <CodePill>header-color</CodePill> prop is not provided header will use the <CodePill>color</CodePill> prop value.</>, render: () => <MonthColorable /> },
    { key: "simple/month-allowed-months", title: "Month pickers - Allowed months", description: "You can specify allowed months using arrays, objects or functions.", render: () => <MonthAllowed /> },
    { key: "simple/month-multiple", title: "Month pickers - Multiple", description: <>Month pickers can now select multiple months with the <CodePill>multiple</CodePill> prop. If using <CodePill>multiple</CodePill> then the month picker expects its model to be an array.</>, render: () => <MonthMultiple /> },
    { key: "simple/month-width", title: "Month pickers - Setting picker width", description: "You can specify allowed the picker's width or make it full width.", render: () => <MonthWidth /> },
    { key: "simple/month-internationalization", title: "Month pickers - Internationalization", description: <>The month picker supports internationalization through the JavaScript Date object. Specify a BCP 47 language tag using the <CodePill>locale</CodePill> prop, and then set the first day of the week with the <CodePill>first-day-of-week</CodePill> prop.</>, render: () => <MonthInternationalization /> },
    { key: "simple/month-icons", title: "Month pickers - icons", description: "You can override the default icons used in the picker.", render: () => <MonthIcons /> },
    { key: "simple/month-readonly", title: "Month pickers - read only", description: <><span>Selecting new date could be disabled by adding </span><strong>readonly</strong><span> prop.</span></>, render: () => <CenteredPicker type="month" readonly /> },
    { key: "simple/month-current", title: "Month pickers - current month indicator", description: <>By default the current month is displayed using outlined button - <strong>show-current</strong> prop allows you to remove the border or select different month to be displayed as a current one.</>, render: () => <MonthCurrent /> },
    { key: "intermediate/date-dialog-and-menu", title: "Date pickers - In dialog and menu", description: <>When integrating a picker into a <CodePill>v-text-field</CodePill>, it is recommended to use the <strong>readonly</strong> prop. This will prevent mobile keyboards from triggering. To save vertical space, you can also hide the picker title.<br /><br />Pickers expose a slot that allow you to hook into save and cancel functionality. This will maintain an old value which can be replaced if the user cancels.</>, render: () => <DateDialogAndMenu /> },
    { key: "intermediate/date-formatting", title: "Date pickers - formatting date", description: "If you need to display date in the custom format (different than YYYY-MM-DD) you need to use the formatting function.", render: () => <DateFormatting /> },
    { key: "intermediate/date-formatting-moment-datefns", title: "Date pickers - formatting date using external libs", description: "Formatting dates is possible also with external libs such as Moment.js or date-fns", render: () => <ExternalFormatting /> },
    { key: "intermediate/date-multiple", title: "Date pickers - Multiple", description: <>Date picker can now select multiple dates with the <CodePill>multiple</CodePill> prop. If using <CodePill>multiple</CodePill> then date picker expects its model to be an array.</>, render: () => <DateMultiple /> },
    { key: "intermediate/date-range", title: "Date pickers - Range", description: <>Date picker can select date range with the <CodePill>range</CodePill> prop. When using <CodePill>range</CodePill> prop date picker expects its model to be an array of length 2 or empty.</>, render: () => <DateRange /> },
    { key: "intermediate/date-birthday", title: "Date pickers - birthday picker", description: "Starting with year picker by default, resticting dates range and closing the picker menu after selecting the day make the perfect birthday picker.", render: () => <BirthdayPicker /> },
    { key: "intermediate/date-events", title: "Date pickers - Events", description: <>You can specify events using arrays, objects or functions. To change the default color of the event use <strong>event-color</strong> prop. Your <strong>events</strong> function or object can return an array of colors (material or css) in case you want to display multiple event indicators.</>, render: () => <DateEvents /> },
    { key: "intermediate/month-dialog-and-menu", title: "Month pickers - In dialog and menu", description: <>When integrating a picker into a <CodePill>v-text-field</CodePill>, it is recommended to use the <strong>readonly</strong> prop. This will prevent mobile keyboards from triggering. To save vertical space, you can also hide the picker title.<br /><br />Pickers expose a slot that allow you to hook into save and cancel functionality. This will maintain an old value which can be replaced if the user cancels.</>, render: () => <MonthDialogAndMenu /> },
  ];
  return (
    <Box component="section">
      <BaseHeading id="examples">Examples</BaseHeading>
      {examples.map((example) => <VuetifyExampleBlock key={example.key} title={example.title} source={example.key} description={example.description} lazy>{example.render}</VuetifyExampleBlock>)}
    </Box>
  );
}

function DateColorable() {
  const [picker, setPicker] = useState<PickerValue>(todayIso());
  const [picker2, setPicker2] = useState<PickerValue>(todayIso());
  return <Row justify="space-around"><VDatePicker value={picker} onChange={setPicker} color="green lighten-1" /><VDatePicker value={picker2} onChange={setPicker2} color="green lighten-1" headerColor="primary" /></Row>;
}

function DateAllowed() {
  const [date, setDate] = useState<PickerValue>("2018-03-02");
  return <Row justify="center"><Box sx={{ mt: 4 }}><VDatePicker value={date} onChange={setDate} min="2016-06-15" max="2018-03-20" allowedDates={(val) => Number(val.split("-")[2]) % 2 === 0} /></Box></Row>;
}

function DateWidth() {
  const [date, setDate] = useState<PickerValue>(todayIso());
  return <Row align="center"><Box sx={{ mt: 4, px: 1 }}><VDatePicker value={date} onChange={setDate} width={290} /></Box><Box sx={{ mt: 4, px: 1, flex: "1 1 0", minWidth: 290 }}><VDatePicker value={date} onChange={setDate} fullWidth landscape /></Box></Row>;
}

function PickerDateExample() {
  const [date, setDate] = useState<PickerValue>(todayIso());
  const [pickerDate, setPickerDate] = useState<string | null>(null);
  const allNotes = ["President met with prime minister", "New power plant opened", "Rocket launch announced", "Global warming discussion cancelled", "Company changed its location"];
  const [notes, setNotes] = useState<string[]>([]);
  function updatePickerDate(value: string) {
    setPickerDate(value);
    setNotes(randomUniqueNotes(allNotes));
  }
  return <Row><Col sm={6}><VDatePicker value={date} onChange={setDate} pickerDate={pickerDate} onPickerDateChange={updatePickerDate} fullWidth /></Col><Col sm={6}><Typography sx={{ fontSize: 20, mb: 1 }}>Month news ({pickerDate || "change month..."})</Typography><Typography sx={{ fontSize: 16 }}>Change month to see other news</Typography><Box component="ul" sx={{ m: 4 }}>{notes.map((note) => <li key={note}>{note}</li>)}</Box></Col></Row>;
}

function DateInternationalization() {
  const [picker, setPicker] = useState<PickerValue>(todayIso());
  return <Row justify="space-around"><VDatePicker value={picker} onChange={setPicker} firstDayOfWeek={0} locale="zh-cn" /><VDatePicker value={picker} onChange={setPicker} firstDayOfWeek={1} locale="sv-SE" /></Row>;
}

function DateIcons() {
  const [picker, setPicker] = useState<PickerValue>(todayIso());
  return <Row justify="center"><VDatePicker value={picker} onChange={setPicker} yearIcon prevIcon="skip" nextIcon="skip" /></Row>;
}

function CenteredPicker({ type = "date", readonly = false }: { type?: PickerType; readonly?: boolean }) {
  const [value, setValue] = useState<PickerValue>(type === "month" ? todayMonth() : todayIso());
  return <Row justify="center"><VDatePicker value={value} onChange={setValue} type={type} readonly={readonly} /></Row>;
}

function DateCurrent() {
  const [date1, setDate1] = useState<PickerValue>(todayIso());
  const [date2, setDate2] = useState<PickerValue>("2013-07-29");
  return <Row justify="space-around"><VDatePicker value={date1} onChange={setDate1} showCurrent={false} /><VDatePicker value={date2} onChange={setDate2} showCurrent="2013-07-13" /></Row>;
}

function MonthLight() {
  const [landscape, setLandscape] = useState(false);
  const [picker, setPicker] = useState<PickerValue>(todayMonth());
  return <Row align="center"><Box sx={{ flexBasis: "100%" }}><VCheckbox label="Landscape" checked={landscape} onChange={setLandscape} /></Box><Box sx={{ flexBasis: "100%" }}><VDatePicker value={picker} onChange={setPicker} landscape={landscape} type="month" /></Box></Row>;
}

function MonthColorable() {
  const [picker, setPicker] = useState<PickerValue>(todayMonth());
  const [picker2, setPicker2] = useState<PickerValue>(todayMonth());
  return <Row justify="space-around"><VDatePicker value={picker} onChange={setPicker} type="month" color="green lighten-1" /><VDatePicker value={picker2} onChange={setPicker2} type="month" color="green lighten-1" headerColor="primary" /></Row>;
}

function MonthAllowed() {
  const [date, setDate] = useState<PickerValue>("2017-12");
  return <Row justify="center"><Box sx={{ mt: 4 }}><VDatePicker value={date} onChange={setDate} type="month" min="2017-06" max="2019-10" allowedDates={(val) => Number(val.split("-")[1]) % 2 === 0} /></Box></Row>;
}

function MonthMultiple() {
  const [months, setMonths] = useState<PickerValue>(["2018-09", "2018-10"]);
  return <Row justify="center"><VDatePicker value={months} onChange={setMonths} type="month" multiple /></Row>;
}

function MonthWidth() {
  const [date, setDate] = useState<PickerValue>(todayMonth());
  return <Row justify="space-around"><Box sx={{ mt: 4 }}><VDatePicker value={date} onChange={setDate} type="month" width={290} /></Box><Box sx={{ mt: 4, flex: 1 }}><VDatePicker value={date} onChange={setDate} type="month" fullWidth landscape /></Box></Row>;
}

function MonthInternationalization() {
  const [picker, setPicker] = useState<PickerValue>(todayMonth());
  return <Row justify="space-around"><VDatePicker value={picker} onChange={setPicker} type="month" locale="th" /><VDatePicker value={picker} onChange={setPicker} type="month" locale="sv-SE" /></Row>;
}

function MonthIcons() {
  const [picker, setPicker] = useState<PickerValue>(todayMonth());
  return <Row justify="center"><VDatePicker value={picker} onChange={setPicker} type="month" yearIcon prevIcon="skip" nextIcon="skip" /></Row>;
}

function MonthCurrent() {
  const [month1, setMonth1] = useState<PickerValue>(todayMonth());
  const [month2, setMonth2] = useState<PickerValue>("2013-09");
  return <Row justify="space-around"><VDatePicker value={month1} onChange={setMonth1} type="month" showCurrent={false} /><VDatePicker value={month2} onChange={setMonth2} type="month" showCurrent="2013-07" /></Row>;
}

function DateDialogAndMenu() {
  const [date, setDate] = useState<PickerValue>(todayIso());
  return <Row><Col sm={6} md={4}><PickerField label="Picker in menu" date={date} onChange={setDate} noTitle actions /></Col><Box sx={{ flexGrow: 1 }} /><Col sm={6} md={4}><PickerField label="Picker in dialog" date={date} onChange={setDate} dialog actions /></Col><Col sm={6} md={4}><PickerField label="Picker without buttons" date={date} onChange={setDate} closeOnSelect nudgeRight={40} /></Col><Box sx={{ flexGrow: 1 }} /></Row>;
}

function DateFormatting() {
  const [date, setDate] = useState<PickerValue>(todayIso());
  const [dateFormatted, setDateFormatted] = useState(formatSlash(String(date)));
  useEffect(() => {
    setDateFormatted(formatSlash(String(date)));
  }, [date]);
  return (
    <Box sx={{ px: 2 }}>
      <Row>
        <Col lg={6}>
          <PickerField label="Date" date={date} onChange={setDate} fieldValue={dateFormatted} onFieldChange={setDateFormatted} hint="MM/DD/YYYY format" parseOnBlur={() => setDate(parseSlash(dateFormatted))} noTitle readonlyField={false} />
          <Typography component="p" sx={{ mt: 2 }}>Date in ISO format: <strong>{String(date)}</strong></Typography>
        </Col>
        <Col lg={6}>
          <PickerField label="Date (read only text field)" date={date} onChange={setDate} fieldValue={formatSlash(String(date))} hint="MM/DD/YYYY format" noTitle readonlyField />
          <Typography component="p" sx={{ mt: 2 }}>Date in ISO format: <strong>{String(date)}</strong></Typography>
        </Col>
      </Row>
    </Box>
  );
}

function ExternalFormatting() {
  const [date, setDate] = useState<PickerValue>(todayIso());
  const text = formatLong(String(date));
  return <Row><Col lg={6}><PickerField label="Formatted with Moment.js" date={date} onChange={setDate} fieldValue={text} clearable /></Col><Col lg={6}><PickerField label="Formatted with datefns" date={date} onChange={setDate} fieldValue={text} clearable /></Col></Row>;
}

function DateMultiple() {
  const [dates, setDates] = useState<PickerValue>(["2018-09-15", "2018-09-20"]);
  return <Row><Col sm={6}><VDatePicker value={dates} onChange={setDates} multiple /></Col><Col sm={6}><PickerField label="Multiple picker in menu" date={dates} onChange={setDates} multiple noTitle actions chips /></Col></Row>;
}

function DateRange() {
  const [dates, setDates] = useState<PickerValue>(["2019-09-10", "2019-09-20"]);
  return <Row><Col sm={6}><VDatePicker value={dates} onChange={setDates} range /></Col><Col sm={6}><TextLike label="Date range" value={Array.isArray(dates) ? dates.join(" ~ ") : ""} prepend /><Typography sx={{ mt: 2 }}>model: {JSON.stringify(dates)}</Typography></Col></Row>;
}

function BirthdayPicker() {
  const [date, setDate] = useState<PickerValue>("");
  return <PickerField label="Birthday date" date={date} onChange={setDate} min="1950-01-01" max={todayIso()} startYear closeOnSelect />;
}

function DateEvents() {
  const [date1, setDate1] = useState<PickerValue>(todayIso());
  const [date2, setDate2] = useState<PickerValue>(todayIso());
  const arrayEvents = useMemo(() => randomDateEvents(), []);
  const functionEvents = (date: string) => {
    const day = Number(date.split("-")[2]);
    if ([12, 17, 28].includes(day)) return true;
    if ([1, 19, 22].includes(day)) return ["red", "#00f"];
    return false;
  };
  return <Row justify="space-between"><Box><Typography className="subheading" sx={{ mb: 1 }}>Defined by array</Typography><VDatePicker value={date1} onChange={setDate1} events={arrayEvents} eventColor="green lighten-1" /></Box><Box><Typography className="subheading" sx={{ mb: 1 }}>Defined by function</Typography><VDatePicker value={date2} onChange={setDate2} eventColor={(date) => Number(date[9]) % 2 ? "red" : "yellow"} events={functionEvents} /></Box></Row>;
}

function MonthDialogAndMenu() {
  const [date, setDate] = useState<PickerValue>(todayMonth());
  return <Row><Col sm={5}><PickerField label="Picker in menu" date={date} onChange={setDate} type="month" noTitle actions /></Col><Box sx={{ flexGrow: 1 }} /><Col sm={5}><PickerField label="Picker in dialog" date={date} onChange={setDate} type="month" dialog actions /></Col></Row>;
}

function randomUniqueNotes(notes: string[]) {
  return [
    notes[Math.floor(Math.random() * notes.length)],
    notes[Math.floor(Math.random() * notes.length)],
    notes[Math.floor(Math.random() * notes.length)],
  ].filter((value, index, self) => self.indexOf(value) === index);
}

function randomDateEvents() {
  return Array.from({ length: 6 }, () => {
    const day = Math.floor(Math.random() * 30);
    const date = new Date();
    date.setDate(day);
    return date.toISOString().slice(0, 10);
  });
}

interface AnimatedLayer {
  id: number;
  key: string;
  child: ReactNode;
  phase: "current" | "enter" | "leave";
  direction: AnimationDirection;
}

function usePickerDirection(animationKey: string): AnimationDirection {
  const previous = useRef(animationKey);
  const direction = useRef<AnimationDirection>("forward");
  if (animationKey !== previous.current) {
    direction.current = animationKey < previous.current ? "reverse" : "forward";
    previous.current = animationKey;
  }
  return direction.current;
}

function useVueTabDirection(animationKey: string): AnimationDirection {
  const previous = useRef(animationKey);
  const direction = useRef<AnimationDirection>("forward");
  if (animationKey !== previous.current) {
    const isReversing = animationKey < previous.current;
    const rtl = typeof document !== "undefined" && document.documentElement.dir === "rtl";
    direction.current = isReversing === !rtl ? "reverse" : "forward";
    previous.current = animationKey;
  }
  return direction.current;
}

function AnimatedReplace({ animationKey, variant, direction = "forward", children, sx }: { animationKey: string; variant: AnimationVariant; direction?: AnimationDirection; children: ReactNode; sx?: object }) {
  const key = String(animationKey);
  const idRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);
  const [layers, setLayers] = useState<AnimatedLayer[]>([{ id: 0, key, child: children, phase: "current", direction }]);
  const currentKey = layers[layers.length - 1]?.key;

  useEffect(() => {
    if (key === currentKey) return undefined;
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    const previousLayer = layers[layers.length - 1];
    const nextLayer: AnimatedLayer = { id: ++idRef.current, key, child: children, phase: "enter", direction };
    setLayers([
      { ...previousLayer, phase: "leave", direction },
      nextLayer,
    ]);
    timeoutRef.current = window.setTimeout(() => {
      setLayers([{ ...nextLayer, phase: "current" }]);
      timeoutRef.current = null;
    }, 300);
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [key]);

  const displayLayers = layers.length === 1 && layers[0].key === key
    ? [{ ...layers[0], child: children, direction }]
    : layers;

  return (
    <Box sx={{ position: "relative", overflow: "hidden", ...sx, ...datePickerAnimationKeyframes }}>
      {displayLayers.map((layer, index) => (
        <Box
          key={`${layer.id}-${layer.key}`}
          sx={{
            position: layer.phase === "leave" ? "absolute" : "relative",
            inset: layer.phase === "leave" ? 0 : undefined,
            width: "100%",
            animation: layer.phase === "current" ? "none" : `${datePickerAnimationName(variant, layer.phase, layer.direction)} 300ms ${variant === "picker" ? "cubic-bezier(0,0,.2,1)" : "cubic-bezier(.25,.8,.5,1)"} both`,
            zIndex: index,
          }}
        >
          {layer.child}
        </Box>
      ))}
    </Box>
  );
}

function datePickerAnimationName(variant: AnimationVariant, phase: "enter" | "leave" | "current", direction: AnimationDirection) {
  if (variant === "fade") return phase === "enter" ? "dpFadeEnter" : "dpFadeLeave";
  if (variant === "picker") {
    if (phase === "enter") return direction === "reverse" ? "dpPickerReverseEnter" : "dpPickerEnter";
    return direction === "reverse" ? "dpPickerReverseLeave" : "dpPickerLeave";
  }
  if (phase === "enter") return direction === "reverse" ? "dpTabReverseEnter" : "dpTabEnter";
  return direction === "reverse" ? "dpTabReverseLeave" : "dpTabLeave";
}

const datePickerAnimationKeyframes = {
  "@keyframes dpFadeEnter": { from: { opacity: 0 }, to: { opacity: 1 } },
  "@keyframes dpFadeLeave": { from: { opacity: 1 }, to: { opacity: 0 } },
  "@keyframes dpPickerEnter": { from: { opacity: 0, transform: "translateY(100%)" }, to: { opacity: 1, transform: "translateY(0)" } },
  "@keyframes dpPickerLeave": { from: { opacity: 1, transform: "translateY(0)" }, to: { opacity: 0, transform: "translateY(-100%)" } },
  "@keyframes dpPickerReverseEnter": { from: { opacity: 0, transform: "translateY(-100%)" }, to: { opacity: 1, transform: "translateY(0)" } },
  "@keyframes dpPickerReverseLeave": { from: { opacity: 1, transform: "translateY(0)" }, to: { opacity: 0, transform: "translateY(100%)" } },
  "@keyframes dpTabEnter": { from: { transform: "translateX(100%)" }, to: { transform: "translateX(0)" } },
  "@keyframes dpTabLeave": { from: { transform: "translateX(0)" }, to: { transform: "translateX(-100%)" } },
  "@keyframes dpTabReverseEnter": { from: { transform: "translateX(-100%)" }, to: { transform: "translateX(0)" } },
  "@keyframes dpTabReverseLeave": { from: { transform: "translateX(0)" }, to: { transform: "translateX(100%)" } },
  "@keyframes dpScaleEnter": { from: { opacity: 0, transform: "scale(0)" }, to: { opacity: 1, transform: "scale(1)" } },
};

function PickerField({ label, date, onChange, type = "date", dialog = false, actions = false, noTitle = false, closeOnSelect = false, min, max, startYear = false, multiple = false, chips = false, fieldValue, onFieldChange, hint, parseOnBlur, readonlyField = true, clearable = false, nudgeRight = 0 }: {
  label: string; date: PickerValue; onChange: (value: PickerValue) => void; type?: PickerType; dialog?: boolean; actions?: boolean; noTitle?: boolean; closeOnSelect?: boolean; min?: string; max?: string; startYear?: boolean; multiple?: boolean; chips?: boolean; fieldValue?: string; onFieldChange?: (value: string) => void; hint?: string; parseOnBlur?: () => void; readonlyField?: boolean; clearable?: boolean; nudgeRight?: number;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<PickerValue>(date);
  const display = fieldValue ?? (Array.isArray(date) ? date.join(", ") : String(date || ""));
  const picker = <VDatePicker value={actions ? draft : date} onChange={(next) => { actions ? setDraft(next) : onChange(next); if (closeOnSelect) setOpen(false); }} type={type} multiple={multiple} noTitle={noTitle} min={min} max={max} initialActivePicker={startYear ? "YEAR" : undefined}>{actions && <><VSpacer /><TextButton onClick={() => setOpen(false)}>Cancel</TextButton><TextButton onClick={() => { onChange(draft); setOpen(false); }}>OK</TextButton></>}</VDatePicker>;
  return (
    <Box sx={{ position: "relative", minWidth: 260 }}>
      {chips ? <ComboboxLike label={label} values={Array.isArray(date) ? date : []} onOpen={() => { setDraft(date); setOpen(true); }} /> : <TextLike label={label} value={display} prepend readonly={readonlyField} hint={hint} onClick={() => { setDraft(date); setOpen(true); }} onChange={onFieldChange} onBlur={parseOnBlur} clearable={clearable} onClear={() => onChange("")} />}
      {open && !dialog && <Box sx={{ position: "absolute", zIndex: 20, top: "100%", left: nudgeRight, mt: 1, minWidth: 290, boxShadow: shadow2, transformOrigin: "top left", animation: "dpScaleEnter 300ms cubic-bezier(.25,.8,.5,1) both", ...datePickerAnimationKeyframes }}>{picker}</Box>}
      {open && dialog && <Box sx={{ position: "fixed", inset: 0, zIndex: 1300, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(0,0,0,.32)" }}><Box sx={{ animation: "dpScaleEnter 300ms cubic-bezier(.25,.8,.5,1) both", ...datePickerAnimationKeyframes }}>{picker}</Box></Box>}
    </Box>
  );
}

function TextLike({ label, value, prepend, readonly, hint, onClick, onChange, onBlur, clearable, onClear }: { label: string; value: string; prepend?: boolean; readonly?: boolean; hint?: string; onClick?: () => void; onChange?: (value: string) => void; onBlur?: () => void; clearable?: boolean; onClear?: () => void }) {
  return <TextField value={value} label={label} variant="standard" fullWidth onClick={onClick} onChange={(event) => onChange?.(event.target.value)} onBlur={onBlur} InputProps={{ readOnly: readonly, startAdornment: prepend ? <Event sx={{ mr: 1, color: "rgba(0,0,0,.54)" }} /> : undefined, endAdornment: clearable && value ? <IconButton size="small" onClick={(event) => { event.stopPropagation(); onClear?.(); }}><Close fontSize="small" /></IconButton> : undefined }} helperText={hint} sx={{ "& .MuiInputLabel-root": { fontSize: 16 }, "& input": { fontSize: 16 } }} />;
}

function ComboboxLike({ label, values, onOpen }: { label: string; values: string[]; onOpen: () => void }) {
  return <Box onClick={onOpen}><Typography sx={{ fontSize: 12, color: "rgba(0,0,0,.6)", mb: 0.5 }}>{label}</Typography><Box sx={{ minHeight: 36, borderBottom: "1px solid rgba(0,0,0,.42)", display: "flex", alignItems: "center", gap: 0.5, flexWrap: "wrap" }}><Event sx={{ mr: 1, color: "rgba(0,0,0,.54)" }} />{values.map((value) => <Chip key={value} label={value} size="small" />)}</Box></Box>;
}

function formatSlash(date: string) {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${month}/${day}/${year}`;
}

function parseSlash(date: string) {
  if (!date) return "";
  const [month, day, year] = date.split("/");
  if (!month || !day || !year) return "";
  return `${year}-${pad(Number(month))}-${pad(Number(day))}`;
}

function formatLong(date: string) {
  if (!date) return "";
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(year, month - 1, day)));
}

function Row({ children, justify = "flex-start", align = "stretch" }: { children: ReactNode; justify?: string; align?: string }) {
  return <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: justify, alignItems: align, mx: -1 }}>{children}</Box>;
}

function Col({ children, sm, md, lg }: { children: ReactNode; sm?: number; md?: number; lg?: number }) {
  const basis = { xs: "100%", sm: sm ? `${(sm / 12) * 100}%` : undefined, md: md ? `${(md / 12) * 100}%` : undefined, lg: lg ? `${(lg / 12) * 100}%` : undefined };
  return <Box sx={{ flexBasis: basis, maxWidth: basis, px: 1, py: 1, minWidth: 0 }}>{children}</Box>;
}

function VSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <Box onClick={() => onChange(!checked)} sx={{ display: "flex", alignItems: "center", m: 2, cursor: "pointer" }}><Box sx={{ width: 44, height: 24, borderRadius: 999, bgcolor: checked ? "rgba(0,150,136,.5)" : "rgba(0,0,0,.18)", p: "2px" }}><Box sx={{ width: 20, height: 20, borderRadius: "50%", bgcolor: checked ? primary : "#fff", boxShadow: shadow2, transform: checked ? "translateX(20px)" : "translateX(0)", transition: "transform 150ms" }} /></Box><Typography sx={{ ml: 1, fontSize: 16 }}>{label}</Typography></Box>;
}

function VCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <Box onClick={() => onChange(!checked)} sx={{ display: "flex", alignItems: "center", cursor: "pointer", minHeight: 48 }}><Checkbox checked={checked} sx={{ color: "rgba(0,0,0,.54)", "&.Mui-checked": { color: primary } }} /><Typography sx={{ fontSize: 16 }}>{label}</Typography></Box>;
}

function TextButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return <Button onClick={onClick} sx={{ color: primary, textTransform: "uppercase", fontWeight: 500 }}>{children}</Button>;
}

function VSpacer() { return <Box sx={{ flexGrow: 1 }} />; }

function DocDesc({ children }: { children: ReactNode }) { return <>{children}</>; }

function BaseHeading({ id, children }: { id: string; children: ReactNode }) {
  return <Typography id={id} variant="h5" sx={{ fontSize: { xs: 20, md: 22 }, lineHeight: 1.45, fontWeight: 400, mb: 2.5 }}>{children}</Typography>;
}

function VuetifyExampleBlock({ title, description, source, children, lazy = false }: { title: string; description: ReactNode; source: ExampleKey; children: () => ReactNode; lazy?: boolean }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [visible, setVisible] = useState(!lazy);
  const blockRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!lazy || visible) return;
    const node = blockRef.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "900px 0px", threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [lazy, visible]);

  return (
    <Card ref={blockRef} sx={{ mb: 5, bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
        {title && <Typography sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>{title}</Typography>}
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit><Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", overflowX: "auto", p: 2 }}><Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box></Box></Collapse>
      <Box sx={{ bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", p: 2, overflow: "visible", "& a": { color: primary } }}>
        {description && <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography>}
        <Box data-app="true" sx={{ overflow: "visible" }}>
          {visible ? children() : <Box sx={{ minHeight: 320 }} />}
        </Box>
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

const sourceTemplates = {
  usage: "src/demo/examples/date-pickers/usage.vue",
  playground: "src/demo/examples/date-pickers/playground.vue",
  "simple/date-colorable": "src/demo/examples/date-pickers/simple/date-colorable.vue",
  "simple/date-allowed-dates": "src/demo/examples/date-pickers/simple/date-allowed-dates.vue",
  "simple/date-width": "src/demo/examples/date-pickers/simple/date-width.vue",
  "simple/date-picker-date": "src/demo/examples/date-pickers/simple/date-picker-date.vue",
  "simple/date-internationalization": "src/demo/examples/date-pickers/simple/date-internationalization.vue",
  "simple/date-icons": "src/demo/examples/date-pickers/simple/date-icons.vue",
  "simple/date-readonly": "src/demo/examples/date-pickers/simple/date-readonly.vue",
  "simple/date-current": "src/demo/examples/date-pickers/simple/date-current.vue",
  "simple/month-light": "src/demo/examples/date-pickers/simple/month-light.vue",
  "simple/month-colorable": "src/demo/examples/date-pickers/simple/month-colorable.vue",
  "simple/month-allowed-months": "src/demo/examples/date-pickers/simple/month-allowed-months.vue",
  "simple/month-multiple": "src/demo/examples/date-pickers/simple/month-multiple.vue",
  "simple/month-width": "src/demo/examples/date-pickers/simple/month-width.vue",
  "simple/month-internationalization": "src/demo/examples/date-pickers/simple/month-internationalization.vue",
  "simple/month-icons": "src/demo/examples/date-pickers/simple/month-icons.vue",
  "simple/month-readonly": "src/demo/examples/date-pickers/simple/month-readonly.vue",
  "simple/month-current": "src/demo/examples/date-pickers/simple/month-current.vue",
  "intermediate/date-dialog-and-menu": "src/demo/examples/date-pickers/intermediate/date-dialog-and-menu.vue",
  "intermediate/date-formatting": "src/demo/examples/date-pickers/intermediate/date-formatting.vue",
  "intermediate/date-formatting-moment-datefns": "src/demo/examples/date-pickers/intermediate/date-formatting-moment-datefns.vue",
  "intermediate/date-multiple": "src/demo/examples/date-pickers/intermediate/date-multiple.vue",
  "intermediate/date-range": "src/demo/examples/date-pickers/intermediate/date-range.vue",
  "intermediate/date-birthday": "src/demo/examples/date-pickers/intermediate/date-birthday.vue",
  "intermediate/date-events": "src/demo/examples/date-pickers/intermediate/date-events.vue",
  "intermediate/month-dialog-and-menu": "src/demo/examples/date-pickers/intermediate/month-dialog-and-menu.vue",
};
