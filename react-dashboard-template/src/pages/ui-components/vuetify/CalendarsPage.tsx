import { useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Collapse,
  FormControlLabel,
  IconButton,
  MenuItem,
  Popover,
  Select,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  CalendarMonth,
  ChevronLeft,
  ChevronRight,
  Code,
  Edit,
  Favorite,
  GitHub,
  InvertColors,
  MoreVert,
  Today,
} from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

type CalendarType = "month" | "week" | "day" | "4day" | "custom-weekly" | "custom-daily" | "category";
type OverlapMode = "stack" | "column";

interface CalendarEvent {
  name: string;
  start: string | Date | number;
  end?: string | Date | number;
  color?: string;
  timed?: boolean;
  category?: string;
  details?: string;
}

interface NormalizedEvent extends CalendarEvent {
  startDate: Date;
  endDate: Date;
  startKey: string;
  endKey: string;
  minutesStart: number;
  minutesEnd: number;
  isTimed: boolean;
}

interface CalendarExample {
  key: keyof typeof sourceTemplates;
  title: string;
  description: ReactNode;
  minHeight: number;
  render: (inverted: boolean) => ReactNode;
}

const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };
const primary = "#1867c0";
const border = "1px solid rgba(0,0,0,.12)";
const darkBorder = "1px solid rgba(255,255,255,.14)";
const eventNames = ["Meeting", "Holiday", "PTO", "Travel", "Event", "Birthday", "Conference", "Party"];
const eventColors = ["blue", "indigo", "deep-purple", "cyan", "green", "orange", "grey darken-1"];
const dragColors = ["#2196F3", "#3F51B5", "#673AB7", "#00BCD4", "#4CAF50", "#FF9800", "#757575"];
const weekdaysDefault = [0, 1, 2, 3, 4, 5, 6];
const intervalDefault = { first: 0, minutes: 60, count: 24, height: 48 };
const intervalWorkday = { first: 16, minutes: 30, count: 20, height: 48 };

export default function CalendarsPage() {
  return (
    <DocPage
      title="Calendars"
      namespace="Components"
      icon={<CalendarMonth />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Calendars" },
      ]}
    >
      <DocText>
        The <CodePill>v-calendar</CodePill> component is used to display information in a daily, weekly, monthly, or category view. The daily view has slots for all day or timed elements, and the weekly and monthly view has a slot for each day. The category view has a slot for each category in the day and timed sections based on the categories given or the categories in the given events. Optionally you can pass in an array of events and they will be rendered over the appropriate days and times.
      </DocText>
      <UsageBlock />
      <PlaygroundBlock />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageBlock() {
  const [inverted, setInverted] = useState(false);
  return (
    <VuetifyExampleBlock
      title="Usage"
      description={
        <>
          A calendar has a type and a value which determines what type of calendar is shown over what span of time. This shows the bare minimum configuration, an array of events with <CodePill>name</CodePill>, <CodePill>start</CodePill> and <CodePill>end</CodePill> properties. <CodePill>end</CodePill> is optional, it defaults to the <CodePill>start</CodePill>. If the <CodePill>start</CodePill> has a time it&apos;s considered a timed event and will be shown accordingly in the day views. An event can span multiple days and will be rendered accordingly.
        </>
      }
      source="usage"
      inverted={inverted}
      onInvert={() => setInverted((value) => !value)}
      minHeight={760}
    >
      <UsageCalendar inverted={inverted} />
    </VuetifyExampleBlock>
  );
}

function PlaygroundBlock() {
  const [inverted, setInverted] = useState(false);
  return (
    <VuetifyExampleBlock
      title="Playground"
      description="The playground exposes the source props used by v-calendar and updates the calendar range and rendered events as controls change."
      source="playground"
      inverted={inverted}
      onInvert={() => setInverted((value) => !value)}
      minHeight={760}
    >
      <PlaygroundCalendar inverted={inverted} />
    </VuetifyExampleBlock>
  );
}

function ExamplesSection() {
  return (
    <Box component="section" sx={{ mt: 5.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Examples
      </Typography>
      <Stack spacing={5.5}>
        {calendarExamples.map((example) => (
          <ExampleWithInvert key={example.key} example={example} />
        ))}
      </Stack>
    </Box>
  );
}

function ExampleWithInvert({ example }: { example: CalendarExample }) {
  const [inverted, setInverted] = useState(false);
  return (
    <VuetifyExampleBlock title={example.title} description={example.description} source={example.key} inverted={inverted} onInvert={() => setInverted((value) => !value)} minHeight={example.minHeight}>
      {example.render(inverted)}
    </VuetifyExampleBlock>
  );
}

function VuetifyExampleBlock({
  title,
  description,
  source,
  children,
  inverted,
  onInvert,
  minHeight,
}: {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  children: ReactNode;
  inverted: boolean;
  onInvert: () => void;
  minHeight: number;
}) {
  const [sourceOpen, setSourceOpen] = useState(false);

  return (
    <Card sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "hidden", mb: 5.5 }}>
      <Toolbar variant="dense" sx={{ minHeight: 74, alignItems: "center", px: { xs: 3, md: 4 }, bgcolor: "transparent" }}>
        <Typography sx={{ fontSize: { xs: 22, md: 25 }, fontWeight: 500, lineHeight: 1.35 }}>{title}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors">
          <IconButton size="small" aria-label="Invert example colors" onClick={onInvert} sx={exampleIconSx(inverted)}>
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
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", maxHeight: { xs: "none", sm: "calc(100vh - 275px)" }, overflowY: "auto", p: 2 }}>
          <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', 'SFMono-Regular', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap", color: "#f8f8f2" }}>
            {sourceTemplates[source]}
          </Box>
        </Box>
      </Collapse>
      <Box sx={{ px: { xs: 3, md: 4 }, py: { xs: 3.5, md: 4.25 }, minHeight, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", transition: "background-color 180ms ease, color 180ms ease" }}>
        <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: 16.5, fontWeight: 300, lineHeight: 1.7, mb: 3 }}>
          {description}
        </Typography>
        {children}
      </Box>
    </Card>
  );
}

function UsageCalendar({ inverted }: { inverted: boolean }) {
  const [type, setType] = useState<CalendarType>("month");
  const [mode, setMode] = useState<OverlapMode>("stack");
  const [weekday, setWeekday] = useState<number[]>(weekdaysDefault);
  const [value, setValue] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const range = useMemo(() => getCalendarRange(value || todayKey(), type, weekday), [value, type, weekday]);

  useEffect(() => {
    setEvents(generateRangeEvents(range.start, range.end, false));
  }, [range.start, range.end]);

  return (
    <Box>
      <Box sx={{ height: 54, bgcolor: inverted ? "#555" : "#eeeeee", display: "flex", alignItems: "center" }}>
        <IconButton sx={{ m: 1 }} onClick={() => setValue(moveCalendar(value || todayKey(), type, -1))}><ChevronLeft /></IconButton>
        <VSelect label="type" value={type} onChange={(value) => setType(value as CalendarType)} items={["month", "week", "day", "4day"]} />
        <VSelect label="event-overlap-mode" value={mode} onChange={(value) => setMode(value as OverlapMode)} items={["stack", "column"]} />
        <VSelect label="weekdays" value={weekday.join(",")} onChange={(value) => setWeekday(value.split(",").map(Number))} items={weekdayOptionsUsage.map((item) => ({ text: item.text, value: item.value.join(",") }))} />
        <Box sx={{ flexGrow: 1 }} />
        <IconButton sx={{ m: 1 }} onClick={() => setValue(moveCalendar(value || todayKey(), type, 1))}><ChevronRight /></IconButton>
      </Box>
      <CalendarSheet height={600} inverted={inverted}>
        <VCalendarLike value={value || todayKey()} type={type} weekdays={weekday} events={events} mode={mode} color="primary" inverted={inverted} onDateClick={(date) => setValue(date)} />
      </CalendarSheet>
    </Box>
  );
}

function PlaygroundCalendar({ inverted }: { inverted: boolean }) {
  const [type, setType] = useState<CalendarType>("month");
  const [dark, setDark] = useState(false);
  const [shortIntervals, setShortIntervals] = useState(true);
  const [shortMonths, setShortMonths] = useState(false);
  const [shortWeekdays, setShortWeekdays] = useState(false);
  const [start, setStart] = useState("2019-01-12");
  const [end, setEnd] = useState("2019-01-27");
  const [now, setNow] = useState("");
  const [mode, setMode] = useState<OverlapMode>("stack");
  const [weekdays, setWeekdays] = useState<number[]>(weekdaysDefault);
  const [minWeeks, setMinWeeks] = useState(1);
  const [intervals, setIntervals] = useState(intervalDefault);
  const [maxDays, setMaxDays] = useState(7);
  const [styleInterval, setStyleInterval] = useState("default");
  const [color, setColor] = useState("primary");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const hasIntervals = ["week", "day", "4day", "custom-daily"].includes(type);
  const hasEnd = ["custom-weekly", "custom-daily"].includes(type);
  const range = useMemo(() => getCalendarRange(start, type, weekdays, end, maxDays), [start, type, weekdays, end, maxDays]);

  useEffect(() => {
    setEvents(generateRangeEvents(range.start, range.end, true));
  }, [range.start, range.end]);

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "25% 75%" }, gap: { xs: 2, lg: 0 } }}>
      <Box sx={{ position: "relative", mb: 4, pr: { lg: 2 } }}>
        <IconButton sx={fabSx("left")} onClick={() => setStart(moveCalendar(start, type, -1))}><ChevronLeft sx={{ color: "#fff" }} /></IconButton>
        <IconButton sx={fabSx("right")} onClick={() => setStart(moveCalendar(start, type, 1))}><ChevronRight sx={{ color: "#fff" }} /></IconButton>
        <Box sx={{ height: 72 }} />
        <VSelect label="Type" value={type} onChange={(value) => setType(value as CalendarType)} items={typeOptions} full />
        <VCheckbox label="Dark" checked={dark} onChange={setDark} />
        <VCheckbox label="Short intervals" checked={shortIntervals} onChange={setShortIntervals} />
        <VCheckbox label="Short months" checked={shortMonths} onChange={setShortMonths} />
        <VCheckbox label="Short weekdays" checked={shortWeekdays} onChange={setShortWeekdays} />
        <VSelect label="Color" value={color} onChange={setColor} items={colorOptions} full mt />
        <DateMenuField label="Start Date" value={start} onChange={setStart} />
        {hasEnd && <DateMenuField label="End Date" value={end} onChange={setEnd} />}
        <DateMenuField label="Today" value={now} onChange={setNow} nullable />
        <VSelect label="Event Overlap Mode" value={mode} onChange={(value) => setMode(value as OverlapMode)} items={modeOptions} full mt />
        <VSelect label="Weekdays" value={weekdays.join(",")} onChange={(value) => setWeekdays(value.split(",").map(Number))} items={weekdaysOptionsPlayground.map((item) => ({ text: item.text, value: item.value.join(",") }))} full mt />
        {type === "custom-weekly" && <TextField value={minWeeks} onChange={(event) => setMinWeeks(Number(event.target.value))} label="Minimum Weeks" type="number" size="small" fullWidth sx={fieldSx(true)} />}
        {hasIntervals && <VSelect label="Intervals" value={intervals === intervalWorkday ? "workday" : "default"} onChange={(value) => setIntervals(value === "workday" ? intervalWorkday : intervalDefault)} items={[{ text: "Default", value: "default" }, { text: "Workday", value: "workday" }]} full mt />}
        {type === "custom-daily" && <VSelect label="# of Days" value={String(maxDays)} onChange={(value) => setMaxDays(Number(value))} items={[{ text: "7 days", value: "7" }, { text: "5 days", value: "5" }, { text: "4 days", value: "4" }, { text: "3 days", value: "3" }]} full mt />}
        {hasIntervals && <VSelect label="Styling" value={styleInterval} onChange={setStyleInterval} items={[{ text: "Default", value: "default" }, { text: "Workday", value: "workday" }, { text: "Past", value: "past" }]} full mt />}
      </Box>
      <Box sx={{ pl: { lg: 2 } }}>
        <CalendarSheet height={600} inverted={inverted || dark}>
          <VCalendarLike
            value={start}
            start={start}
            end={end}
            type={type}
            weekdays={weekdays}
            events={events}
            mode={mode}
            color={color}
            now={now || undefined}
            inverted={inverted || dark}
            shortWeekdays={shortWeekdays}
            shortMonths={shortMonths}
            shortIntervals={shortIntervals}
            intervalConfig={intervals}
            intervalStyleMode={styleInterval}
            minWeeks={minWeeks}
            maxDays={maxDays}
          />
        </CalendarSheet>
      </Box>
    </Box>
  );
}

function WeeklyExample({ inverted }: { inverted: boolean }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const events: CalendarEvent[] = [
    { name: "Weekly Meeting", start: "2019-01-07 09:00", end: "2019-01-07 10:00" },
    { name: "Thomas' Birthday", start: "2019-01-10" },
    { name: "Mash Potatoes", start: "2019-01-09 12:30", end: "2019-01-09 15:30" },
  ];

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 8 * 48;
  }, []);

  return (
    <CalendarSheet height={400} inverted={inverted}>
      <VCalendarLike value="2019-01-08" now="2019-01-08" type="week" events={events} color="primary" inverted={inverted} scrollRef={scrollRef} />
    </CalendarSheet>
  );
}

function DailyExample({ inverted }: { inverted: boolean }) {
  return (
    <CalendarSheet height={400} inverted={inverted}>
      <VCalendarLike value={todayKey()} type="day" color="primary" inverted={inverted} dayHeaderSlot={(present) => (present ? "Today" : "")} intervalSlot={(hour) => `${hour} o'clock`} />
    </CalendarSheet>
  );
}

function SlotsExample({ inverted }: { inverted: boolean }) {
  const tracked: Record<string, number[]> = {
    "2019-01-09": [23, 45, 10],
    "2019-01-08": [10],
    "2019-01-07": [0, 78, 5],
    "2019-01-06": [0, 0, 50],
    "2019-01-05": [0, 10, 23],
    "2019-01-04": [2, 90],
    "2019-01-03": [10, 32],
    "2019-01-02": [80, 10, 10],
    "2019-01-01": [20, 25, 10],
  };
  return (
    <CalendarSheet height={500} inverted={inverted}>
      <VCalendarLike value="2019-01-10" now="2019-01-10" type="month" color="primary" inverted={inverted} daySlot={(day) => <TrackedDay day={day} tracked={tracked} />} />
    </CalendarSheet>
  );
}

function EventsExample({ inverted }: { inverted: boolean }) {
  const [focus, setFocus] = useState("");
  const [type, setType] = useState<CalendarType>("month");
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const range = useMemo(() => getCalendarRange(focus || todayKey(), type), [focus, type]);

  useEffect(() => {
    setEvents(generateRangeEvents(range.start, range.end, false));
  }, [range.start, range.end]);

  const title = calendarTitle(range.start, range.end);
  return (
    <Box className="fill-height">
      <CalendarToolbar title={title} type={type} setType={setType} onToday={() => setFocus("")} onPrev={() => setFocus(moveCalendar(focus || todayKey(), type, -1))} onNext={() => setFocus(moveCalendar(focus || todayKey(), type, 1))} />
      <CalendarSheet height={600} inverted={inverted}>
        <VCalendarLike
          value={focus || todayKey()}
          type={type}
          events={events}
          color="primary"
          inverted={inverted}
          onDateClick={(date) => {
            setFocus(date);
            setType("day");
          }}
          onMoreClick={(date) => {
            setFocus(date);
            setType("day");
          }}
          onEventClick={(event, nativeEvent) => {
            setSelectedEvent(event);
            setMenuAnchor(nativeEvent.currentTarget as HTMLElement);
          }}
        />
        <Popover open={Boolean(menuAnchor)} anchorEl={menuAnchor} onClose={() => setMenuAnchor(null)} anchorOrigin={{ vertical: "center", horizontal: "right" }} transformOrigin={{ vertical: "center", horizontal: "left" }}>
          <Card sx={{ minWidth: 350, bgcolor: "#f5f5f5", boxShadow: "none" }}>
            <Toolbar sx={{ bgcolor: toColor(selectedEvent?.color || "primary"), color: "#fff", minHeight: 64 }}>
              <IconButton sx={{ color: "#fff" }}><Edit /></IconButton>
              <Typography sx={{ fontSize: 20, fontWeight: 500 }}>{selectedEvent?.name}</Typography>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton sx={{ color: "#fff" }}><Favorite /></IconButton>
              <IconButton sx={{ color: "#fff" }}><MoreVert /></IconButton>
            </Toolbar>
            <Box sx={{ p: 2, color: "rgba(0,0,0,.6)", minHeight: 52 }}>{selectedEvent?.details}</Box>
            <Box sx={{ p: 1 }}>
              <Button variant="text" sx={{ color: "#0097a7" }} onClick={() => setMenuAnchor(null)}>Cancel</Button>
            </Box>
          </Card>
        </Popover>
      </CalendarSheet>
    </Box>
  );
}

function CategoryExample({ inverted }: { inverted: boolean }) {
  const [focus, setFocus] = useState("");
  const categories = ["John Smith", "Tori Walker"];
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const range = useMemo(() => getCalendarRange(focus || todayKey(), "category"), [focus]);

  useEffect(() => {
    setEvents(generateRangeEvents(range.start, range.end, false, categories));
  }, [range.start, range.end]);

  return (
    <Box className="fill-height">
      <CalendarToolbar title={calendarTitle(range.start, range.end)} onToday={() => setFocus("")} onPrev={() => setFocus(moveCalendar(focus || todayKey(), "category", -1))} onNext={() => setFocus(moveCalendar(focus || todayKey(), "category", 1))} />
      <CalendarSheet height={600} inverted={inverted}>
        <VCalendarLike value={focus || todayKey()} type="category" categories={categories} events={events} color="primary" inverted={inverted} />
      </CalendarSheet>
    </Box>
  );
}

function NowLineExample({ inverted }: { inverted: boolean }) {
  const [now, setNow] = useState(new Date());
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (scrollRef.current) {
      const minutes = now.getHours() * 60 + now.getMinutes();
      const first = Math.max(0, minutes - (minutes % 30) - 30);
      scrollRef.current.scrollTop = (first / 60) * 48;
    }
    const interval = window.setInterval(() => setNow(new Date()), 60 * 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <CalendarSheet height={500} inverted={inverted}>
      <VCalendarLike value={todayKey()} type="week" color="primary" inverted={inverted} nowLineDate={now} scrollRef={scrollRef} />
    </CalendarSheet>
  );
}

function DragDropExample({ inverted }: { inverted: boolean }) {
  const [value, setValue] = useState(todayKey());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [dragEvent, setDragEvent] = useState<CalendarEvent | null>(null);
  const [dragTime, setDragTime] = useState<number | null>(null);
  const [createEvent, setCreateEvent] = useState<CalendarEvent | null>(null);
  const [createStart, setCreateStart] = useState<number | null>(null);
  const [extendOriginal, setExtendOriginal] = useState<number | null>(null);
  const range = useMemo(() => getCalendarRange(value, "4day"), [value]);

  useEffect(() => {
    setEvents(generateRangeEvents(range.start, range.end, false, undefined, true));
  }, [range.start, range.end]);

  const eventColor = (event: CalendarEvent) => {
    const color = event.color || "#2196F3";
    if (event === dragEvent || event === createEvent) return alphaColor(color, 0.7);
    return color;
  };

  return (
    <CalendarSheet height={600} inverted={inverted}>
      <VCalendarLike
        value={value}
        type="4day"
        events={events}
        color="primary"
        inverted={inverted}
        eventColor={eventColor}
        draggable
        onTimeMouseDown={(date, minutes) => {
          const mouse = timestampFor(date, minutes);
          if (dragEvent && dragTime === null) {
            const start = normalizedTime(dragEvent.start).getTime();
            setDragTime(mouse - start);
          } else {
            const rounded = roundTime(mouse);
            const next: CalendarEvent = { name: `Event #${events.length}`, color: rndElement(dragColors), start: rounded, end: rounded, timed: true };
            setCreateStart(rounded);
            setCreateEvent(next);
            setEvents((items) => [...items, next]);
          }
        }}
        onTimeMouseMove={(date, minutes) => {
          const mouse = timestampFor(date, minutes);
          if (dragEvent && dragTime !== null) {
            const start = normalizedTime(dragEvent.start).getTime();
            const end = normalizedTime(dragEvent.end || dragEvent.start).getTime();
            const duration = end - start;
            const newStart = roundTime(mouse - dragTime);
            const newEnd = newStart + duration;
            setEvents((items) => items.map((item) => item === dragEvent ? { ...item, start: newStart, end: newEnd } : item));
          } else if (createEvent && createStart !== null) {
            const mouseRounded = roundTime(mouse, false);
            const min = Math.min(mouseRounded, createStart);
            const max = Math.max(mouseRounded, createStart);
            setEvents((items) => items.map((item) => item === createEvent ? { ...item, start: min, end: max } : item));
          }
        }}
        onTimeMouseUp={() => {
          setDragEvent(null);
          setDragTime(null);
          setCreateEvent(null);
          setCreateStart(null);
          setExtendOriginal(null);
        }}
        onCalendarMouseLeave={() => {
          if (createEvent) {
            if (extendOriginal) {
              setEvents((items) => items.map((item) => item === createEvent ? { ...item, end: extendOriginal } : item));
            } else {
              setEvents((items) => items.filter((item) => item !== createEvent));
            }
          }
          setDragEvent(null);
          setDragTime(null);
          setCreateEvent(null);
          setCreateStart(null);
        }}
        onEventMouseDown={(event, timed) => {
          if (timed) {
            setDragEvent(event);
            setDragTime(null);
            setExtendOriginal(null);
          }
        }}
        onEventResizeMouseDown={(event) => {
          setCreateEvent(event);
          setCreateStart(normalizedTime(event.start).getTime());
          setExtendOriginal(normalizedTime(event.end || event.start).getTime());
        }}
        onDateClick={setValue}
      />
    </CalendarSheet>
  );
}

function VCalendarLike({
  value,
  type,
  events = [],
  categories = [],
  weekdays = weekdaysDefault,
  start,
  end,
  now,
  color = "primary",
  mode = "stack",
  inverted = false,
  shortWeekdays = false,
  shortMonths = false,
  shortIntervals = true,
  intervalConfig = intervalDefault,
  intervalStyleMode = "default",
  minWeeks = 1,
  maxDays = 7,
  scrollRef,
  dayHeaderSlot,
  intervalSlot,
  daySlot,
  nowLineDate,
  eventColor,
  onDateClick,
  onMoreClick,
  onEventClick,
  draggable,
  onTimeMouseDown,
  onTimeMouseMove,
  onTimeMouseUp,
  onCalendarMouseLeave,
  onEventMouseDown,
  onEventResizeMouseDown,
}: {
  value: string;
  type: CalendarType;
  events?: CalendarEvent[];
  categories?: string[];
  weekdays?: number[];
  start?: string;
  end?: string;
  now?: string;
  color?: string;
  mode?: OverlapMode;
  inverted?: boolean;
  shortWeekdays?: boolean;
  shortMonths?: boolean;
  shortIntervals?: boolean;
  intervalConfig?: typeof intervalDefault;
  intervalStyleMode?: string;
  minWeeks?: number;
  maxDays?: number;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
  dayHeaderSlot?: (present: boolean) => ReactNode;
  intervalSlot?: (hour: number) => ReactNode;
  daySlot?: (day: Date) => ReactNode;
  nowLineDate?: Date;
  eventColor?: (event: CalendarEvent) => string;
  onDateClick?: (date: string) => void;
  onMoreClick?: (date: string) => void;
  onEventClick?: (event: CalendarEvent, nativeEvent: MouseEvent<HTMLElement>) => void;
  draggable?: boolean;
  onTimeMouseDown?: (date: string, minutes: number) => void;
  onTimeMouseMove?: (date: string, minutes: number) => void;
  onTimeMouseUp?: () => void;
  onCalendarMouseLeave?: () => void;
  onEventMouseDown?: (event: CalendarEvent, timed: boolean) => void;
  onEventResizeMouseDown?: (event: CalendarEvent) => void;
}) {
  const range = getCalendarRange(value, type, weekdays, end, maxDays, start);
  const visibleDays = type === "month" || type === "custom-weekly"
    ? buildMonthlyDays(range.start, range.end, weekdays, minWeeks)
    : buildDaySpan(range.start, range.end, weekdays, maxDays);
  const normalized = events.map(normalizeEvent);
  const activeNow = now || todayKey();
  const line = inverted ? darkBorder : border;
  const bg = inverted ? "#424242" : "#fff";
  const text = inverted ? "rgba(255,255,255,.86)" : "rgba(0,0,0,.87)";

  if (type === "month" || type === "custom-weekly") {
    return (
      <Box className="v-calendar v-calendar-weekly v-calendar-monthly v-calendar-events" sx={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", bgcolor: bg, color: text, borderTop: line, borderLeft: line, minHeight: 0 }}>
        <Box className="v-calendar-weekly__head" sx={{ display: "flex", userSelect: "none" }}>
          {weekdays.map((weekday) => (
            <Box key={weekday} className="v-calendar-weekly__head-weekday" sx={{ flex: "1 0 20px", p: "0 4px", fontSize: 11, overflow: "hidden", textAlign: "center", textTransform: "uppercase", whiteSpace: "nowrap", borderRight: line, color: muted(inverted) }}>
              {weekdayLabel(weekday, shortWeekdays)}
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
          {chunk(visibleDays, weekdays.length).map((week, weekIndex) => (
            <Box key={weekIndex} className="v-calendar-weekly__week" sx={{ display: "flex", flex: 1, minHeight: 0 }}>
              {week.map((day) => {
                const key = toDateKey(day);
                const dayEvents = normalized.filter((event) => event.startKey <= key && event.endKey >= key);
                return (
                  <Box key={key} className="v-calendar-weekly__day" sx={{ flex: 1, width: 0, overflow: "visible", position: "relative", borderRight: line, borderBottom: line, color: key === activeNow ? toColor(color) : text, minWidth: 0, bgcolor: day.getMonth() !== range.start.getMonth() ? (inverted ? "#3a3a3a" : "#fafafa") : bg }}>
                    <Box onClick={() => onDateClick?.(key)} className="v-calendar-weekly__day-label" sx={{ textAlign: "center", m: "4px 0 0", height: 32, lineHeight: "32px", fontSize: 12, cursor: "pointer", userSelect: "none" }}>
                      {day.getDate()}
                    </Box>
                    {shortMonths || (day.getDate() === 1 && type === "month") ? (
                      <Box className="v-calendar-weekly__day-month" sx={{ position: "absolute", top: 0, left: 36, height: 32, lineHeight: "32px", fontSize: 12, color: muted(inverted) }}>
                        {monthLabel(day, shortMonths)}
                      </Box>
                    ) : null}
                    {daySlot?.(day)}
                    <Stack spacing="1px" sx={{ px: 0.5, pb: 0.5 }}>
                      {dayEvents.slice(0, 3).map((event, index) => (
                        <EventChip key={`${event.name}-${index}-${key}`} event={event} eventColor={eventColor} onClick={onEventClick} />
                      ))}
                      {dayEvents.length > 3 && (
                        <Box onClick={() => onMoreClick?.(key)} className="v-event-more" sx={{ fontSize: 12, cursor: "pointer", fontWeight: 700, color: text, overflow: "hidden", whiteSpace: "nowrap" }}>
                          {dayEvents.length - 3} more
                        </Box>
                      )}
                    </Stack>
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  const dayColumns = type === "category" ? categories : visibleDays.map(toDateKey);
  return (
    <Box className={`v-calendar v-calendar-daily ${type === "category" ? "v-calendar-category" : ""} v-calendar-events`} sx={{ display: "flex", flexDirection: "column", overflow: "hidden", height: "100%", bgcolor: bg, color: text, borderLeft: line, borderTop: line }} onMouseLeave={onCalendarMouseLeave}>
      <Box className="v-calendar-daily__head" sx={{ display: "flex", flex: "none" }}>
        <Box className="v-calendar-daily__intervals-head" sx={{ flex: "0 0 60px", borderRight: line, position: "relative" }} />
        {dayColumns.map((column, index) => {
          const day = visibleDays[index] || visibleDays[0];
          const key = toDateKey(day);
          const present = key === activeNow;
          return (
            <Box key={column} className="v-calendar-daily_head-day" sx={{ flex: "1 1 auto", width: 0, position: "relative", borderRight: line, borderBottom: line }}>
              <Box sx={{ userSelect: "none", pt: "3px", fontSize: 11, textAlign: "center", textTransform: "uppercase", color: muted(inverted) }}>{type === "category" ? column : weekdayLabel(day.getDay(), shortWeekdays)}</Box>
              <Box onClick={() => onDateClick?.(key)} sx={{ userSelect: "none", pb: "3px", cursor: "pointer", textAlign: "center", fontSize: 24, color: present ? toColor(color) : text }}>
                {dayHeaderSlot ? dayHeaderSlot(present) || day.getDate() : type === "category" ? "" : day.getDate()}
              </Box>
            </Box>
          );
        })}
      </Box>
      <Box className="v-calendar-daily__body" sx={{ flex: "1 1 60%", overflow: "hidden", display: "flex", position: "relative", flexDirection: "column" }}>
        <Box ref={scrollRef} className="v-calendar-daily__scroll-area" sx={{ overflowY: "scroll", flex: "1 1 auto", display: "flex", alignItems: "flex-start" }}>
          <Box className="v-calendar-daily__pane" sx={{ width: "100%", overflowY: "hidden", flex: "none", display: "flex", alignItems: "flex-start" }}>
            <Box className="v-calendar-daily__intervals-body" sx={{ flex: "0 0 60px", userSelect: "none", borderRight: line }}>
              {Array.from({ length: intervalConfig.count }, (_, i) => intervalConfig.first * intervalConfig.minutes + i * intervalConfig.minutes).map((minute) => {
                const hour = Math.floor(minute / 60) % 24;
                const m = minute % 60;
                return (
                  <Box key={minute} className="v-calendar-daily__interval" sx={{ height: intervalConfig.height, textAlign: "right", pr: "8px", position: "relative", "&::after": { content: "''", position: "absolute", right: 0, bottom: -1, width: 8, borderTop: line } }}>
                    <Box className="v-calendar-daily__interval-text" sx={{ display: "block", position: "relative", top: -6, fontSize: 10, pr: "4px", color: muted(inverted) }}>
                      {intervalSlot ? intervalSlot(hour) : showIntervalLabel(m) ? formatInterval(hour, m, shortIntervals) : ""}
                    </Box>
                  </Box>
                );
              })}
            </Box>
            <Box className="v-calendar-daily__day-container" sx={{ display: "flex", flex: 1, width: "100%", height: intervalConfig.count * intervalConfig.height, position: "relative" }}>
              {dayColumns.map((column, index) => {
                const day = visibleDays[index] || visibleDays[0];
                const key = toDateKey(day);
                const columnEvents = type === "category"
                  ? normalized.filter((event) => event.category === column)
                  : normalized.filter((event) => event.startKey <= key && event.endKey >= key);
                return (
                  <Box key={column} className={type === "category" ? "v-calendar-category__column" : "v-calendar-daily__day"} sx={{ flex: 1, width: 0, position: "relative", borderRight: line, borderBottom: line }}>
                    {Array.from({ length: intervalConfig.count }, (_, i) => i).map((i) => {
                      const minute = intervalConfig.first * intervalConfig.minutes + i * intervalConfig.minutes;
                      return (
                        <Box
                          key={i}
                          className="v-calendar-daily__day-interval"
                          onMouseDown={() => onTimeMouseDown?.(key, minute)}
                          onMouseMove={() => onTimeMouseMove?.(key, minute)}
                          onMouseUp={onTimeMouseUp}
                          sx={{ height: intervalConfig.height, borderTop: i === 0 ? "none" : line, ...intervalStyle(intervalStyleMode, day, minute, inverted) }}
                        />
                      );
                    })}
                    <Box className="v-event-timed-container" sx={{ position: "absolute", inset: "0 10px 0 0", pointerEvents: "none" }}>
                      {columnEvents.filter((event) => event.isTimed).map((event, eventIndex) => (
                        <TimedEventChip
                          key={`${event.name}-${eventIndex}-${column}`}
                          event={event}
                          eventColor={eventColor}
                          intervalConfig={intervalConfig}
                          mode={mode}
                          onClick={onEventClick}
                          draggable={draggable}
                          onMouseDown={onEventMouseDown}
                          onResizeMouseDown={onEventResizeMouseDown}
                        />
                      ))}
                    </Box>
                  </Box>
                );
              })}
              {nowLineDate && <NowLine now={nowLineDate} firstDay={visibleDays[0]} intervalConfig={intervalConfig} />}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function EventChip({ event, eventColor, onClick }: { event: NormalizedEvent; eventColor?: (event: CalendarEvent) => string; onClick?: (event: CalendarEvent, nativeEvent: MouseEvent<HTMLElement>) => void }) {
  const color = eventColor ? eventColor(event) : toColor(event.color || "primary");
  return (
    <Box onClick={(nativeEvent) => onClick?.(event, nativeEvent)} className="v-event" sx={{ position: "relative", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 12, cursor: "pointer", lineHeight: "20px", mr: "-1px", zIndex: 1, borderRadius: "4px", bgcolor: color, color: "#fff", px: 0.75 }}>
      {event.name}
    </Box>
  );
}

function TimedEventChip({
  event,
  intervalConfig,
  eventColor,
  mode,
  onClick,
  draggable,
  onMouseDown,
  onResizeMouseDown,
}: {
  event: NormalizedEvent;
  intervalConfig: typeof intervalDefault;
  eventColor?: (event: CalendarEvent) => string;
  mode: OverlapMode;
  onClick?: (event: CalendarEvent, nativeEvent: MouseEvent<HTMLElement>) => void;
  draggable?: boolean;
  onMouseDown?: (event: CalendarEvent, timed: boolean) => void;
  onResizeMouseDown?: (event: CalendarEvent) => void;
}) {
  const top = ((event.minutesStart - intervalConfig.first * intervalConfig.minutes) / intervalConfig.minutes) * intervalConfig.height;
  const height = Math.max(20, ((event.minutesEnd - event.minutesStart) / intervalConfig.minutes) * intervalConfig.height);
  const color = eventColor ? eventColor(event) : toColor(event.color || "primary");
  return (
    <Box
      className="v-event-timed"
      onClick={(nativeEvent) => onClick?.(event, nativeEvent)}
      onMouseDown={(nativeEvent) => {
        onMouseDown?.(event, true);
        if (draggable) nativeEvent.stopPropagation();
      }}
      sx={{
        position: "absolute",
        top,
        height,
        left: mode === "column" ? "4px" : "4px",
        right: mode === "column" ? "18%" : "4px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        fontSize: 12,
        cursor: draggable ? "move" : "pointer",
        borderRadius: "4px",
        pointerEvents: "all",
        bgcolor: color,
        color: "#fff",
        border: `1px solid ${color}`,
        zIndex: 2,
        userSelect: "none",
      }}
    >
      <Box className="v-event-draggable" sx={{ pl: draggable ? "6px" : 0.75, lineHeight: "20px" }}>{event.name}</Box>
      {draggable && (
        <Box
          className="v-event-drag-bottom"
          onMouseDown={(nativeEvent) => {
            nativeEvent.stopPropagation();
            onResizeMouseDown?.(event);
          }}
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 4,
            height: 4,
            cursor: "ns-resize",
            "&::after": {
              display: "none",
              position: "absolute",
              left: "50%",
              height: 4,
              borderTop: "1px solid white",
              borderBottom: "1px solid white",
              width: 16,
              ml: "-8px",
              opacity: 0.8,
              content: "''",
            },
            "&:hover::after": { display: "block" },
          }}
        />
      )}
    </Box>
  );
}

function CalendarToolbar({ title, type, setType, onToday, onPrev, onNext }: { title: string; type?: CalendarType; setType?: (type: CalendarType) => void; onToday: () => void; onPrev: () => void; onNext: () => void }) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <Box sx={{ height: 64 }}>
      <Toolbar sx={{ bgcolor: "#fff", color: "rgba(0,0,0,.87)", minHeight: 64, px: 2 }}>
        <Button variant="outlined" onClick={onToday} sx={{ mr: 2, color: "#616161", borderColor: "rgba(0,0,0,.38)", textTransform: "none" }}>Today</Button>
        <IconButton onClick={onPrev} sx={{ color: "#616161", width: 40, height: 40 }}><ChevronLeft fontSize="small" /></IconButton>
        <IconButton onClick={onNext} sx={{ color: "#616161", width: 40, height: 40 }}><ChevronRight fontSize="small" /></IconButton>
        <Typography sx={{ ml: 2, fontSize: 20, fontWeight: 500 }}>{title}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        {type && setType && (
          <>
            <Button variant="outlined" onClick={(event) => setAnchor(event.currentTarget)} sx={{ color: "#616161", borderColor: "rgba(0,0,0,.38)", textTransform: "none" }}>
              <span>{{ month: "Month", week: "Week", day: "Day", "4day": "4 Days", category: "Category", "custom-weekly": "Custom Weekly", "custom-daily": "Custom Daily" }[type]}</span>
              <MoreVert sx={{ ml: 1, transform: "rotate(90deg)" }} />
            </Button>
            <Popover open={Boolean(anchor)} anchorEl={anchor} onClose={() => setAnchor(null)} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "right" }}>
              <Stack sx={{ py: 1, minWidth: 160 }}>
                {[
                  ["Day", "day"],
                  ["Week", "week"],
                  ["Month", "month"],
                  ["4 days", "4day"],
                ].map(([label, value]) => (
                  <Button key={value} onClick={() => { setType(value as CalendarType); setAnchor(null); }} sx={{ justifyContent: "flex-start", px: 2, color: "rgba(0,0,0,.87)", textTransform: "none" }}>{label}</Button>
                ))}
              </Stack>
            </Popover>
          </>
        )}
      </Toolbar>
    </Box>
  );
}

function CalendarSheet({ height, inverted, children }: { height: number; inverted: boolean; children: ReactNode }) {
  return (
    <Box sx={{ height, bgcolor: inverted ? "#424242" : "#fff", color: inverted ? "rgba(255,255,255,.86)" : "rgba(0,0,0,.87)", boxShadow: "0 2px 4px rgba(0,0,0,.18)", overflow: "hidden" }}>
      {children}
    </Box>
  );
}

function TrackedDay({ day, tracked }: { day: Date; tracked: Record<string, number[]> }) {
  const key = toDateKey(day);
  const today = "2019-01-10";
  const colors = ["#1867c0", "#fb8c00", "#000000"];
  const category = ["Development", "Meetings", "Slacking"];
  if (!(key < today) || !tracked[key]) return null;
  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      {tracked[key].map((percent, index) => (
        <Box key={`${key}-${category[index]}`} title={category[index]} sx={{ width: `${percent}%`, height: "100%", bgcolor: colors[index] }} />
      ))}
    </Box>
  );
}

function NowLine({ now, firstDay, intervalConfig }: { now: Date; firstDay: Date; intervalConfig: typeof intervalDefault }) {
  const minutes = now.getHours() * 60 + now.getMinutes();
  const top = ((minutes - intervalConfig.first * intervalConfig.minutes) / intervalConfig.minutes) * intervalConfig.height;
  return (
    <>
      <Box sx={{ position: "absolute", top, left: 0, right: 0, height: 2, bgcolor: "#ea4335", pointerEvents: "none", zIndex: 4 }} />
      <Box sx={{ position: "absolute", top: top - 5, left: -6.5, width: 12, height: 12, borderRadius: "50%", bgcolor: "#ea4335", pointerEvents: "none", zIndex: 5 }} title={toDateKey(firstDay)} />
    </>
  );
}

function DateMenuField({ label, value, onChange, nullable }: { label: string; value: string; onChange: (value: string) => void; nullable?: boolean }) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [draft, setDraft] = useState(value);
  return (
    <>
      <TextField value={value} label={label} size="small" fullWidth inputProps={{ readOnly: true }} onClick={(event) => { setDraft(value); setAnchor(event.currentTarget); }} InputProps={{ startAdornment: <Today sx={{ color: "rgba(0,0,0,.54)", mr: 1 }} /> }} sx={fieldSx(true)} />
      <Popover open={Boolean(anchor)} anchorEl={anchor} onClose={() => setAnchor(null)} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
        <Box sx={{ p: 2, minWidth: 290 }}>
          <TextField type="date" value={draft || ""} onChange={(event) => setDraft(event.target.value)} fullWidth size="small" />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
            <Button variant="text" onClick={() => setAnchor(null)}>Cancel</Button>
            {nullable && <Button variant="text" onClick={() => { onChange(""); setAnchor(null); }}>Clear</Button>}
            <Button variant="text" onClick={() => { onChange(draft); setAnchor(null); }}>OK</Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
}

function VSelect({ label, value, onChange, items, full = false, mt = false }: { label: string; value: string; onChange: (value: string) => void; items: Array<string | { text: string; value: string }>; full?: boolean; mt?: boolean }) {
  return (
    <TextField select label={label} value={value} size="small" onChange={(event) => onChange(event.target.value)} sx={{ ...fieldSx(mt), minWidth: full ? undefined : 150, width: full ? "100%" : 180, mx: full ? 0 : 1 }}>
      {items.map((item) => {
        const option = typeof item === "string" ? { text: item, value: item } : item;
        return <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>;
      })}
    </TextField>
  );
}

function VCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return <FormControlLabel sx={{ display: "flex", height: 38, m: 0 }} control={<Checkbox size="small" checked={checked} onChange={(event) => onChange(event.target.checked)} sx={{ color: "rgba(0,0,0,.54)", "&.Mui-checked": { color: primary } }} />} label={<Typography sx={{ fontSize: 14 }}>{label}</Typography>} />;
}

function fieldSx(mt = false) {
  return {
    mt: mt ? 1.5 : 0,
    "& .MuiOutlinedInput-root": { height: 40, borderRadius: "4px", bgcolor: "#fff" },
    "& .MuiInputLabel-root": { fontSize: 14 },
    "& .MuiInputBase-input": { fontSize: 14 },
  };
}

function fabSx(side: "left" | "right") {
  return {
    position: "absolute",
    top: 0,
    [side]: 0,
    width: 40,
    height: 40,
    bgcolor: primary,
    boxShadow: "0px 3px 5px -1px rgba(0,0,0,.2), 0px 6px 10px 0px rgba(0,0,0,.14), 0px 1px 18px 0px rgba(0,0,0,.12)",
    "&:hover": { bgcolor: primary },
  };
}

function normalizeEvent(event: CalendarEvent): NormalizedEvent {
  const startDate = normalizedTime(event.start);
  const endDate = normalizedTime(event.end || event.start);
  const startKey = toDateKey(startDate);
  const endKey = toDateKey(endDate);
  const isTimed = event.timed ?? hasTime(event.start) ?? hasTime(event.end);
  return { ...event, startDate, endDate, startKey, endKey, minutesStart: startDate.getHours() * 60 + startDate.getMinutes(), minutesEnd: endDate.getHours() * 60 + endDate.getMinutes(), isTimed: Boolean(isTimed) };
}

function normalizedTime(value: string | Date | number): Date {
  if (value instanceof Date) return value;
  if (typeof value === "number") return new Date(value);
  const [date, time] = value.split(" ");
  return new Date(`${date}T${time || "00:00"}`);
}

function hasTime(value?: string | Date | number) {
  if (value instanceof Date || typeof value === "number") return true;
  return Boolean(value?.includes(":"));
}

function generateRangeEvents(start: Date, end: Date, asString: boolean, categories?: string[], drag = false) {
  const events: CalendarEvent[] = [];
  const min = new Date(`${toDateKey(start)}T00:00:00`).getTime();
  const max = new Date(`${toDateKey(end)}T23:59:59`).getTime();
  const days = (max - min) / 86400000;
  const eventCount = rnd(days, days + 20);
  for (let i = 0; i < eventCount; i += 1) {
    const timed = drag ? rnd(0, 3) !== 0 : rnd(0, 3) !== 0;
    const firstTimestamp = rnd(min, max);
    const first = firstTimestamp - (firstTimestamp % 900000);
    const secondTimestamp = rnd(2, timed ? 8 : 288) * 900000;
    const second = first + secondTimestamp;
    const color = drag ? rndElement(dragColors) : rndElement(eventColors);
    const event: CalendarEvent = {
      name: rndElement(eventNames),
      start: asString ? formatDate(new Date(first), timed) : first,
      end: asString ? formatDate(new Date(second), timed) : second,
      color,
      timed,
      details: "This is a scheduled calendar event.",
    };
    if (categories) event.category = rndElement(categories);
    events.push(event);
  }
  return events;
}

function getCalendarRange(value: string, type: CalendarType, weekdays = weekdaysDefault, end?: string, maxDays = 7, startOverride?: string) {
  const around = parseDateOnly(startOverride || value || todayKey());
  if (type === "month") return { start: startOfMonth(around), end: endOfMonth(around) };
  if (type === "week") return { start: startOfWeek(around, weekdays), end: addDays(startOfWeek(around, weekdays), 6) };
  if (type === "day") return { start: around, end: around };
  if (type === "4day") return { start: around, end: addDays(around, 3) };
  if (type === "custom-weekly" || type === "custom-daily") return { start: parseDateOnly(startOverride || value), end: end ? parseDateOnly(end) : addDays(parseDateOnly(startOverride || value), maxDays - 1) };
  if (type === "category") return { start: around, end: around };
  return { start: around, end: around };
}

function buildMonthlyDays(start: Date, end: Date, weekdays: number[], minWeeks: number) {
  const gridStart = startOfWeek(start, weekdays);
  const gridEnd = endOfWeek(end, weekdays);
  const days = buildDaySpan(gridStart, gridEnd, weekdays, 42);
  const min = minWeeks * weekdays.length;
  return days.length < min ? [...days, ...Array.from({ length: min - days.length }, (_, index) => addDays(days[days.length - 1], index + 1))] : days;
}

function buildDaySpan(start: Date, end: Date, weekdays = weekdaysDefault, maxDays = 42) {
  const days: Date[] = [];
  let cursor = new Date(start);
  while (cursor <= end && days.length < maxDays) {
    if (weekdays.includes(cursor.getDay()) || weekdays.length === 0) days.push(new Date(cursor));
    cursor = addDays(cursor, 1);
  }
  return days.length ? days : [start];
}

function moveCalendar(value: string, type: CalendarType, amount: number) {
  const date = parseDateOnly(value);
  if (type === "month") return toDateKey(new Date(date.getFullYear(), date.getMonth() + amount, date.getDate()));
  if (type === "week") return toDateKey(addDays(date, amount * 7));
  if (type === "4day") return toDateKey(addDays(date, amount * 4));
  if (type === "category") return toDateKey(addDays(date, amount));
  return toDateKey(addDays(date, amount));
}

function calendarTitle(start: Date, end: Date) {
  if (start.getFullYear() !== end.getFullYear()) return `${monthLabel(start, true)} ${start.getFullYear()} - ${monthLabel(end, true)} ${end.getFullYear()}`;
  if (start.getMonth() !== end.getMonth()) return `${monthLabel(start, true)} - ${monthLabel(end, true)} ${end.getFullYear()}`;
  return `${monthLabel(start, false)} ${start.getFullYear()}`;
}

function parseDateOnly(value: string) {
  return new Date(`${value || todayKey()}T00:00:00`);
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function startOfWeek(date: Date, weekdays: number[]) {
  const startDay = weekdays[0] ?? 0;
  const diff = (date.getDay() - startDay + 7) % 7;
  return addDays(date, -diff);
}

function endOfWeek(date: Date, weekdays: number[]) {
  return addDays(startOfWeek(date, weekdays), weekdays.length - 1);
}

function addDays(date: Date, count: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + count);
  return next;
}

function toDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function todayKey() {
  return toDateKey(new Date());
}

function weekdayLabel(weekday: number, short = false) {
  const labels = short ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return labels[weekday];
}

function monthLabel(date: Date, short = false) {
  return date.toLocaleDateString("en-US", { month: short ? "short" : "long" });
}

function formatInterval(hour: number, minute: number, short = true) {
  if (short && minute === 0) {
    if (hour === 0) return "12 AM";
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return "12 PM";
    return `${hour - 12} PM`;
  }
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function showIntervalLabel(minute: number) {
  return minute === 0;
}

function intervalStyle(mode: string, day: Date, minute: number, inverted: boolean) {
  if (mode === "workday") {
    const hour = Math.floor(minute / 60);
    const inactive = day.getDay() === 0 || day.getDay() === 6 || hour < 9 || hour >= 17;
    const startOfHour = minute % 60 === 0;
    const mid = inverted ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
    return { bgcolor: inactive ? (inverted ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.05)") : undefined, borderTop: startOfHour ? undefined : `1px dashed ${mid}` };
  }
  if (mode === "past") return { bgcolor: day < new Date() ? (inverted ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.05)") : undefined };
  return {};
}

function formatDate(date: Date, withTime: boolean) {
  const base = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return withTime ? `${base} ${date.getHours()}:${date.getMinutes()}` : base;
}

function timestampFor(date: string, minutes: number) {
  const d = parseDateOnly(date);
  d.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0);
  return d.getTime();
}

function roundTime(time: number, down = true) {
  const roundDownTime = 15 * 60 * 1000;
  return down ? time - (time % roundDownTime) : time + (roundDownTime - (time % roundDownTime));
}

function rnd(a: number, b: number) {
  return Math.floor((b - a + 1) * Math.random()) + a;
}

function rndElement<T>(arr: T[]) {
  return arr[rnd(0, arr.length - 1)];
}

function alphaColor(color: string, alpha: number) {
  const hex = color.startsWith("#") ? color.slice(1) : toColor(color).slice(1);
  const rgb = parseInt(hex, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function toColor(color: string) {
  const map: Record<string, string> = {
    primary,
    secondary: "#0097a7",
    accent: "#82b1ff",
    red: "#f44336",
    pink: "#e91e63",
    purple: "#9c27b0",
    "deep-purple": "#673ab7",
    indigo: "#3f51b5",
    blue: "#2196f3",
    "light-blue": "#03a9f4",
    cyan: "#00bcd4",
    teal: "#009688",
    green: "#4caf50",
    "light-green": "#8bc34a",
    lime: "#cddc39",
    yellow: "#ffeb3b",
    amber: "#ffc107",
    orange: "#ff9800",
    "deep-orange": "#ff5722",
    brown: "#795548",
    "blue-gray": "#607d8b",
    gray: "#9e9e9e",
    "grey darken-1": "#757575",
    black: "#000000",
  };
  return map[color] || color;
}

function muted(inverted: boolean) {
  return inverted ? "rgba(255,255,255,.58)" : "rgba(0,0,0,.54)";
}

function chunk<T>(items: T[], size: number) {
  const rows: T[][] = [];
  for (let index = 0; index < items.length; index += size) rows.push(items.slice(index, index + size));
  return rows;
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

const weekdayOptionsUsage = [
  { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
  { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
  { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
  { text: "Mon, Wed, Fri", value: [1, 3, 5] },
];

const typeOptions = [
  { text: "Day", value: "day" },
  { text: "4 Day", value: "4day" },
  { text: "Week", value: "week" },
  { text: "Month", value: "month" },
  { text: "Custom Daily", value: "custom-daily" },
  { text: "Custom Weekly", value: "custom-weekly" },
];

const modeOptions = [
  { text: "Stack", value: "stack" },
  { text: "Column", value: "column" },
];

const weekdaysOptionsPlayground = [
  { text: "Sunday - Saturday", value: weekdaysDefault },
  { text: "Mon, Wed, Fri", value: [1, 3, 5] },
  { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
  { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
];

const colorOptions = [
  "Primary", "Secondary", "Accent", "Red", "Pink", "Purple", "Deep Purple", "Indigo", "Blue", "Light Blue", "Cyan", "Teal", "Green", "Light Green", "Lime", "Yellow", "Amber", "Orange", "Deep Orange", "Brown", "Blue Gray", "Gray", "Black",
].map((text) => ({ text, value: text.toLowerCase().replace(" ", "-") }));

const calendarExamples: CalendarExample[] = [
  { key: "weekly", title: "Weekly", description: <>This is an example of an event calendar with all-day and timed events with a type of <CodePill>week</CodePill>.</>, minHeight: 520, render: (inverted) => <WeeklyExample inverted={inverted} /> },
  { key: "daily", title: "Daily", description: <>This is an example of calendar with content in each interval slot and a type of <CodePill>day</CodePill>.</>, minHeight: 520, render: (inverted) => <DailyExample inverted={inverted} /> },
  { key: "slots", title: "Slots", description: "Slots allow you to define the content for each day, time interval for the daily views, and various labels.", minHeight: 620, render: (inverted) => <SlotsExample inverted={inverted} /> },
  { key: "events", title: "Events", description: "This is an example of a planner with additional event handlers and external components controlling the display of the calendar.", minHeight: 760, render: (inverted) => <EventsExample inverted={inverted} /> },
  { key: "category", title: "Category", description: <>This is an example of an event calendar with a type of <CodePill>category</CodePill> that allows you to compare two schedules side-by-side.</>, minHeight: 760, render: (inverted) => <CategoryExample inverted={inverted} /> },
  { key: "nowline", title: "Now Line", description: "This is an example of an calendar with a line for the current time.", minHeight: 620, render: (inverted) => <NowLineExample inverted={inverted} /> },
  { key: "dragndrop", title: "Drag and Drop", description: "This is an example of an event calendar where you can drag events, extend their length, and create events.", minHeight: 720, render: (inverted) => <DragDropExample inverted={inverted} /> },
];

const sourceTemplates = {
  usage: `<template>
  <div>
    <v-sheet tile height="54" color="grey lighten-3" class="d-flex">
      <v-btn icon class="ma-2" @click="$refs.calendar.prev()"><v-icon>mdi-chevron-left</v-icon></v-btn>
      <v-select v-model="type" :items="types" dense outlined hide-details class="ma-2" label="type"></v-select>
      <v-select v-model="mode" :items="modes" dense outlined hide-details label="event-overlap-mode" class="ma-2"></v-select>
      <v-select v-model="weekday" :items="weekdays" dense outlined hide-details label="weekdays" class="ma-2"></v-select>
      <v-spacer></v-spacer>
      <v-btn icon class="ma-2" @click="$refs.calendar.next()"><v-icon>mdi-chevron-right</v-icon></v-btn>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        @change="getEvents"
      ></v-calendar>
    </v-sheet>
  </div>
</template>`,
  playground: `<template>
  <v-row>
    <v-col sm="12" lg="3" class="mb-4 controls">
      <v-btn fab small absolute left color="primary" @click="$refs.calendar.prev()"><v-icon dark>mdi-chevron-left</v-icon></v-btn>
      <v-btn fab small absolute right color="primary" @click="$refs.calendar.next()"><v-icon dark>mdi-chevron-right</v-icon></v-btn>
      <v-select v-model="type" :items="typeOptions" label="Type" hide-details outlined dense></v-select>
      <v-checkbox v-model="dark" label="Dark" hide-details></v-checkbox>
      <v-checkbox v-model="shortIntervals" label="Short intervals" hide-details></v-checkbox>
      <v-checkbox v-model="shortMonths" label="Short months" hide-details></v-checkbox>
      <v-checkbox v-model="shortWeekdays" label="Short weekdays" hide-details></v-checkbox>
      <v-menu ref="startMenu" v-model="startMenu" :return-value.sync="start" transition="scale-transition" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-text-field v-model="start" label="Start Date" prepend-icon="event" dense readonly outlined hide-details v-bind="attrs" v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="start" no-title scrollable></v-date-picker>
      </v-menu>
    </v-col>
    <v-col sm="12" lg="9" class="pl-4">
      <v-sheet height="600">
        <v-calendar ref="calendar" v-model="start" :type="type" :events="events" @change="getEvents"></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>`,
  weekly: `<template>
  <v-row>
    <v-col>
      <v-sheet height="400">
        <v-calendar ref="calendar" :now="today" :value="today" :events="events" color="primary" type="week"></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>`,
  daily: `<template>
  <v-row>
    <v-col>
      <v-sheet height="400">
        <v-calendar color="primary" type="day">
          <template v-slot:day-header="{ present }"><template v-if="present" class="text-center">Today</template></template>
          <template v-slot:interval="{ hour }"><div class="text-center">{{ hour }} o'clock</div></template>
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>`,
  slots: `<template>
  <v-row>
    <v-col>
      <v-sheet height="500">
        <v-calendar :now="today" :value="today" color="primary">
          <template v-slot:day="{ present, past, date }">
            <v-row class="fill-height">
              <template v-if="past && tracked[date]">
                <v-sheet v-for="(percent, i) in tracked[date]" :key="i" :title="category[i]" :color="colors[i]" :width="\`\${percent}%\`" height="100%" tile></v-sheet>
              </template>
            </v-row>
          </template>
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>`,
  events: `<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">Today</v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev"><v-icon small>mdi-chevron-left</v-icon></v-btn>
          <v-btn fab text small color="grey darken-2" @click="next"><v-icon small>mdi-chevron-right</v-icon></v-btn>
          <v-toolbar-title v-if="$refs.calendar">{{ $refs.calendar.title }}</v-toolbar-title>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar ref="calendar" v-model="focus" color="primary" :events="events" :type="type" @click:event="showEvent" @click:more="viewDay" @click:date="viewDay" @change="updateRange"></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>`,
  category: `<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64"><v-toolbar flat color="white">...</v-toolbar></v-sheet>
      <v-sheet height="600">
        <v-calendar ref="calendar" v-model="focus" color="primary" type="category" category-show-all :categories="categories" :events="events" :event-color="getEventColor" @change="fetchEvents"></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>`,
  nowline: `<template>
  <v-row>
    <v-col>
      <v-sheet height="500">
        <v-calendar ref="calendar" v-model="value" type="week">
          <template #day-body="{ date, week }">
            <div class="v-current-time" :class="{ first: date === week[0].date }" :style="{ top: nowY }"></div>
          </template>
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>`,
  dragndrop: `<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="value"
          color="primary"
          type="4day"
          :events="events"
          :event-color="getEventColor"
          :event-ripple="false"
          @mousedown:event="startDrag"
          @mousedown:time="startTime"
          @mousemove:time="mouseMove"
          @mouseup:time="endDrag"
          @mouseleave.native="cancelDrag"
        ></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>`,
};
