import { Children, cloneElement, isValidElement, useEffect, useLayoutEffect, useRef, useState, type ReactElement, type ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  Collapse,
  IconButton,
  Switch,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Code as CodeIcon, GitHub, InvertColors, Timeline as TimelineIcon } from "@mui/icons-material";
import {
  mdiAccountMultipleOutline,
  mdiAirballoon,
  mdiAlert,
  mdiAlertCircle,
  mdiBookVariant,
  mdiBuffer,
  mdiCalendarText,
  mdiCheckCircle,
  mdiEmailOutline,
  mdiHomeOutline,
  mdiInformation,
  mdiMagnify,
  mdiMenu,
  mdiPhoneInTalk,
  mdiPlus,
  mdiServerNetwork,
  mdiStar,
} from "@mdi/js";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097A7";
const white = "#FFFFFF";
const appBackground = "#F2F3F7";
const cardSurface = "#FFFFFF";
const darkCardSurface = "#1E1E1E";
const divider = "rgba(0,0,0,.12)";
const textPrimary = "rgba(0,0,0,.87)";
const textSecondary = "rgba(0,0,0,.6)";
const iconActive = "rgba(0,0,0,.54)";
const neuInset = "inset -7px -7px 5px #FFFFFF, inset 7px 7px 7px #DDE4EF";
const shadow1 = "0px 2px 1px -1px rgba(0,0,0,.2), 0px 1px 1px 0px rgba(0,0,0,.14), 0px 1px 3px 0px rgba(0,0,0,.12)";
const shadow2 = "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)";
const shadow6 = "0px 3px 5px -1px rgba(0,0,0,.2), 0px 6px 10px 0px rgba(0,0,0,.14), 0px 1px 18px 0px rgba(0,0,0,.12)";
const bodyText = "Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.";

type ExampleKey =
  | "usage"
  | "playground"
  | "simple/small"
  | "simple/icons"
  | "simple/reverse"
  | "simple/card"
  | "intermediate/alert"
  | "intermediate/slot"
  | "intermediate/avatars"
  | "complex/color"
  | "complex/advanced";

type TimelineItemProps = {
  children?: ReactNode;
  color?: string;
  fillDot?: boolean;
  hideDot?: boolean;
  icon?: string;
  iconColor?: string;
  itemRef?: (node: HTMLDivElement | null) => void;
  large?: boolean;
  left?: boolean;
  opposite?: ReactNode;
  right?: boolean;
  small?: boolean;
  className?: string;
  itemSx?: Record<string, unknown>;
  timelineAlignTop?: boolean;
  timelineDense?: boolean;
  timelineIndex?: number;
  timelineReverse?: boolean;
};

const mdiPaths: Record<string, string> = {
  "mdi-account-multiple-outline": mdiAccountMultipleOutline,
  "mdi-airballoon": mdiAirballoon,
  "mdi-alert": mdiAlert,
  "mdi-alert-circle": mdiAlertCircle,
  "mdi-book-variant": mdiBookVariant,
  "mdi-buffer": mdiBuffer,
  "mdi-calendar-text": mdiCalendarText,
  "mdi-check-circle": mdiCheckCircle,
  "mdi-email-outline": mdiEmailOutline,
  "mdi-home-outline": mdiHomeOutline,
  "mdi-information": mdiInformation,
  "mdi-magnify": mdiMagnify,
  "mdi-menu": mdiMenu,
  "mdi-phone-in-talk": mdiPhoneInTalk,
  "mdi-plus": mdiPlus,
  "mdi-server-network": mdiServerNetwork,
  "mdi-star": mdiStar,
};

export default function TimelinesPage() {
  return (
    <DocPage
      title="Timelines"
      namespace="Components"
      icon={<TimelineIcon />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Timelines" },
      ]}
    >
      <DocText>
        The <CodePill>v-timeline</CodePill> is useful for stylistically displaying chronological information.
      </DocText>

      <Box component="section" sx={{ mb: 5 }}>
        <BaseHeading id="usage">Usage</BaseHeading>
        <ExampleBlock source="usage" description={<><CodePill>v-timeline</CodePill>'s in their simplest form display a vertical timeline that should contain at least one <CodePill>v-timeline-item</CodePill>.</>}>
          <VTimeline>
            <VTimelineItem>timeline item</VTimelineItem>
            <VTimelineItem><Box sx={{ textAlign: "right" }}>timeline item</Box></VTimelineItem>
            <VTimelineItem>timeline item</VTimelineItem>
          </VTimeline>
        </ExampleBlock>
      </Box>

      <Box component="section" sx={{ mb: 5 }}>
        <BaseHeading id="playground">Playground</BaseHeading>
        <ExampleBlock source="playground">
          <PlaygroundExample />
        </ExampleBlock>
      </Box>

      <Box component="section" id="examples">
        <BaseHeading id="examples">Examples</BaseHeading>
        <SmallDotsExample />
        <IconDotsExample />
        <ReverseExample />
        <TimelineCardExample />
        <DenseAlertExample />
        <OppositeSlotExample />
        <AvatarDotsExample />
        <ColoredDotsExample />
        <AdvancedExample />
      </Box>
    </DocPage>
  );
}

function PlaygroundExample() {
  const [alignTop, setAlignTop] = useState(false);
  const [avatar, setAvatar] = useState(false);
  const [dense, setDense] = useState(false);
  const [fillDot, setFillDot] = useState(false);
  const [hideDot, setHideDot] = useState(false);
  const [icon, setIcon] = useState(false);
  const [iconColor, setIconColor] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [small, setSmall] = useState(false);

  return (
    <Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", mb: 2 }}>
        <VuetifySwitch checked={alignTop} onChange={setAlignTop} label="Toggle align-top" />
        <VuetifySwitch checked={dense} onChange={setDense} label="Toggle dense" />
        <VuetifySwitch checked={fillDot} onChange={setFillDot} label="Toggle fill-dot" />
        <VuetifySwitch checked={hideDot} onChange={setHideDot} label="Toggle hide-dot" />
        <VuetifySwitch checked={icon} onChange={setIcon} label="Toggle icon" />
        <VuetifySwitch checked={avatar} onChange={setAvatar} label="Toggle avatar" />
        <VuetifySwitch checked={iconColor} onChange={setIconColor} label="Toggle icon color" />
        <VuetifySwitch checked={reverse} onChange={setReverse} label="Toggle reverse" />
        <VuetifySwitch checked={left} onChange={setLeft} label="Toggle left" />
        <VuetifySwitch checked={right} onChange={setRight} label="Toggle right" />
        <VuetifySwitch checked={small} onChange={setSmall} label="Toggle small" />
      </Box>
      <VTimeline alignTop={alignTop} dense={dense} reverse={reverse}>
        {[1, 2, 3].map((n) => (
          <VTimelineItem
            key={n}
            fillDot={fillDot}
            hideDot={hideDot}
            icon={avatar ? undefined : icon ? "mdi-star" : undefined}
            iconColor={iconColor ? "deep-orange" : undefined}
            left={left}
            opposite="Tus eu perfecto"
            right={right}
            small={small}
          >
            {avatar ? <TimelineAvatar slot="icon" /> : null}
            <TimelineCard title="Lorem ipsum" body={bodyText} />
          </VTimelineItem>
        ))}
      </VTimeline>
    </Box>
  );
}

function SmallDotsExample() {
  return (
    <ExampleBlock title="Small dots" source="simple/small" description={<>The <CodePill>small</CodePill> prop allows alternate styles to provide a unique design.</>}>
      <VTimeline denseOnSmall>
        <VTimelineItem color="purple lighten-2" fillDot right>
          <FeatureTimelineCard color="purple lighten-2" icon="mdi-magnify" title="Title 1" columns={[smallLongText, <VIcon key="cal" name="mdi-calendar-text" size={64} muted />]} />
        </VTimelineItem>
        <VTimelineItem color="amber lighten-1" fillDot left small>
          <FeatureTimelineCard color="amber lighten-1" icon="mdi-home-outline" title="Title 2" rightTitle columns={[smallLongText, "Lorem ipsum dolor sit amet, no nam oblique veritus."]} />
        </VTimelineItem>
        <VTimelineItem color="cyan lighten-1" fillDot right>
          <FeatureTimelineCard color="cyan lighten-1" icon="mdi-email-outline" title="Title 3" columns={Array.from({ length: 3 }, () => "Lorem ipsum dolor sit amet, no nam oblique veritus no nam oblique.")} />
        </VTimelineItem>
        <VTimelineItem color="red lighten-1" fillDot left small>
          <FeatureTimelineCard color="red lighten-1" icon="mdi-account-multiple-outline" title="Title 4" rightTitle columns={[<VIcon key="server" name="mdi-server-network" size={64} muted />, "Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus."]} />
        </VTimelineItem>
        <VTimelineItem color="green lighten-1" fillDot right>
          <FeatureTimelineCard color="green lighten-1" icon="mdi-phone-in-talk" title="Title 5" columns={["Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae."]} />
        </VTimelineItem>
      </VTimeline>
    </ExampleBlock>
  );
}

function IconDotsExample() {
  const items = [
    { color: "red lighten-2", icon: "mdi-star" },
    { color: "purple darken-1", icon: "mdi-book-variant" },
    { color: "green lighten-1", icon: "mdi-airballoon" },
    { color: "indigo", icon: "mdi-buffer" },
  ];
  return (
    <ExampleBlock title="Icon dots" source="simple/icons" description={<>Conditionally use icons within the <CodePill>v-timeline-item</CodePill>'s dot to provide additional context.</>}>
      <VTimeline alignTop denseOnSmall>
        {items.map((item, i) => (
          <VTimelineItem key={i} color={item.color} icon={item.icon} fillDot>
            <Card sx={{ bgcolor: vuetifyColor(item.color), color: white, boxShadow: shadow2, borderRadius: 0.5 }}>
              <Box sx={{ p: 2, fontSize: 20, fontWeight: 400 }}>Lorem Ipsum Dolor</Box>
              <Box sx={{ bgcolor: cardSurface, color: textPrimary, p: 2 }}>
                <Typography sx={{ mb: 2 }}>{bodyText}</Typography>
                <Button variant="outlined" sx={{ borderColor: vuetifyColor(item.color), color: vuetifyColor(item.color), borderRadius: 1 }}>Button</Button>
              </Box>
            </Card>
          </VTimelineItem>
        ))}
      </VTimeline>
    </ExampleBlock>
  );
}

function ReverseExample() {
  const [reverse, setReverse] = useState(true);
  return (
    <ExampleBlock title="Reverse direction" source="simple/reverse" description={<>You can reverse the direction of the timeline items by using the <CodePill>reverse</CodePill> prop. This works both in default and <CodePill>dense</CodePill> mode.</>}>
      <VuetifySwitch checked={reverse} onChange={setReverse} label="Toggle reverse" />
      <VTimeline reverse={reverse} denseOnSmall>{[1, 2].map((n) => <VTimelineItem key={n} opposite="Tus eu perfecto"><TimelineCard title="Lorem ipsum" body={bodyText} /></VTimelineItem>)}</VTimeline>
      <VTimeline reverse={reverse} dense>{[1, 2].map((n) => <VTimelineItem key={n} opposite="Tus eu perfecto"><TimelineCard title="Lorem ipsum" body={bodyText} /></VTimelineItem>)}</VTimeline>
    </ExampleBlock>
  );
}

function TimelineCardExample() {
  return (
    <ExampleBlock title="Timeline card" source="simple/card" description="If you place a v-card inside of a v-timeline-item, a caret will appear on the side of the card.">
      <VTimeline>
        {[1, 2, 3].map((n) => <VTimelineItem key={n} color="red lighten-2" large opposite="Tus eu perfecto"><TimelineCard title="Lorem ipsum" body={bodyText} /></VTimelineItem>)}
      </VTimeline>
    </ExampleBlock>
  );
}

function DenseAlertExample() {
  const colors = ["info", "warning", "error", "success"];
  const icons: Record<string, string> = { info: "mdi-information", warning: "mdi-alert", error: "mdi-alert-circle", success: "mdi-check-circle" };
  const [running, setRunning] = useState(false);
  const [items, setItems] = useState([{ id: 1, color: "info", icon: icons.info }]);
  const [nonce, setNonce] = useState(2);

  const addEvent = () => {
    const previous = items[0]?.color;
    let color = colors[Math.floor(Math.random() * 3)];
    while (color === previous) color = colors[Math.floor(Math.random() * 3)];
    setItems((current) => [{ id: nonce, color, icon: icons[color] }, ...current].slice(0, 5));
    setNonce((value) => value + 1);
  };

  useEffect(() => {
    if (!running) return undefined;
    const interval = window.setInterval(addEvent, 3000);
    return () => window.clearInterval(interval);
  });

  return (
    <ExampleBlock title="Dense alert" source="intermediate/alert" description={<><CodePill>dense</CodePill> timelines position all content to the right. In this example, <CodePill>v-alert</CodePill> replaces the card to provide a different design.</>}>
      <Card sx={{ bgcolor: cardSurface, color: textPrimary, maxWidth: 600, mx: "auto", boxShadow: shadow2 }}>
        <Box sx={{ alignItems: "center", bgcolor: vuetifyColor("blue-grey"), color: white, display: "flex", minHeight: 64, px: 2 }}>
          <Typography sx={{ fontSize: 20 }}>Logs</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={() => setRunning((value) => !value)} variant={running ? "contained" : "outlined"} sx={{ bgcolor: running ? primary : "transparent", borderColor: white, color: white, boxShadow: running ? "none" : undefined }}>Realtime Logging</Button>
        </Box>
        <Box sx={{ py: 0, px: 2 }}>
          <VTimeline dense>
            {items.map((item) => (
              <VTimelineItem key={item.id} color={item.color} small fillDot>
                <AlertBox color={item.color} icon={item.icon}>{bodyText}</AlertBox>
              </VTimelineItem>
            ))}
          </VTimeline>
        </Box>
      </Card>
    </ExampleBlock>
  );
}

function OppositeSlotExample() {
  const years = [
    { color: "cyan", year: "1960" },
    { color: "green", year: "1970" },
    { color: "pink", year: "1980" },
    { color: "amber", year: "1990" },
    { color: "orange", year: "2000" },
  ];
  return (
    <ExampleBlock title="Opposite slot" source="intermediate/slot" description="The opposite slot provides an additional layer of customization within your timelines.">
      <VTimeline>
        {years.map((year) => (
          <VTimelineItem key={year.year} color={year.color} small opposite={<Typography sx={{ color: vuetifyColor(year.color), fontSize: 24, fontWeight: 700 }}>{year.year}</Typography>}>
            <Box sx={{ py: 2 }}>
              <Typography component="h2" sx={{ color: vuetifyColor(year.color), fontSize: 24, fontWeight: 300, mb: 2 }}>Lorem ipsum</Typography>
              <Typography>{bodyText}</Typography>
            </Box>
          </VTimelineItem>
        ))}
      </VTimeline>
    </ExampleBlock>
  );
}

function AvatarDotsExample() {
  return (
    <ExampleBlock title="Avatar dots" source="intermediate/avatars" description={<>Insert avatars into dots with use of the <CodePill>icon</CodePill> slot and <CodePill>v-avatar</CodePill>.</>}>
      <VTimeline>
        {[1, 2, 3, 4].map((n) => (
          <VTimelineItem key={n} large opposite="Tus eu perfecto">
            <TimelineAvatar slot="icon" />
            <TimelineCard title="Lorem ipsum" body={bodyText} />
          </VTimelineItem>
        ))}
      </VTimeline>
    </ExampleBlock>
  );
}

function ColoredDotsExample() {
  return (
    <ExampleBlock title="Colored dots" source="complex/color" description="Colored dots create visual breakpoints that make your timelines easier to read.">
      <Card sx={{ bgcolor: cardSurface, color: textPrimary, maxWidth: 400, mx: "auto", boxShadow: shadow2, borderRadius: 1, overflow: "visible", position: "relative" }}>
        <Card data-flat="true" sx={{ bgcolor: darkCardSurface, color: white, boxShadow: "none", borderRadius: "4px 4px 0 0", position: "relative" }}>
          <IconButton sx={{ bgcolor: vuetifyColor("pink"), bottom: -28, boxShadow: shadow6, color: white, height: 56, position: "absolute", right: 16, width: 56, zIndex: 4, "&:hover": { bgcolor: vuetifyColor("pink darken-1") } }}><VIcon name="mdi-plus" /></IconButton>
          <Box sx={{ alignItems: "center", bgcolor: vuetifyColor("purple lighten-3"), display: "flex", minHeight: 64, p: 1 }}>
            <IconButton sx={{ color: white, height: 36, width: 36 }}><VIcon name="mdi-menu" /></IconButton>
            <Typography sx={{ flex: 1, fontSize: 20, fontWeight: 300, textAlign: "center" }}>Timeline</Typography>
            <AvatarImage src={avatarUrls[0]} />
          </Box>
          <Box sx={{ overflow: "hidden", position: "relative" }}>
            <Box component="img" src="https://cdn.vuetifyjs.com/images/cards/forest.jpg" sx={{ display: "block", width: "100%" }} />
            <Box sx={{ bgcolor: "rgba(0,0,0,.44)", bottom: 0, left: 0, position: "absolute", right: 0, top: 0 }} />
            <Box sx={{ bottom: 0, display: "flex", flexWrap: "wrap", left: 0, p: 1.5, position: "absolute", right: 0, top: 0 }}>
              <Box sx={{ alignItems: "center", display: "flex", flex: "1 1 100%", flexWrap: "wrap", m: -1.5, maxWidth: "calc(100% + 24px)" }}>
                <Typography component="strong" sx={{ fontSize: 96, fontWeight: 400, lineHeight: "6rem", mr: 3 }}>8</Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end", m: -1.5, ml: "auto", textAlign: "right" }}>
                  <Box sx={{ px: 1.5 }}>
                    <Typography sx={{ fontSize: 24, fontWeight: 300 }}>Monday</Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 300, textTransform: "uppercase" }}>February 2015</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Card>
        <Box sx={{ bgcolor: cardSurface, color: textSecondary, py: 0, px: 2 }}>
          <VTimeline alignTop dense>
            <ScheduleItem color="pink" time="5pm" title="New Icon" caption="Mobile App" />
            <VTimelineItem color="teal lighten-3" small>
              <Box sx={{ display: "flex", flexWrap: "wrap", mx: -1.5, pt: 0.5 }}>
                <Box sx={{ boxSizing: "border-box", flexBasis: "25%", fontWeight: 700, px: 1.5 }}>3-4pm</Box>
                <Box sx={{ boxSizing: "border-box", flex: 1, px: 1.5 }}>
                  <strong>Design Stand Up</strong>
                  <Typography sx={{ fontSize: 12, mb: 1 }}>Hangouts</Typography>
                  <AvatarImage src={avatarUrls[1]} />
                  <AvatarImage src={avatarUrls[2]} />
                  <AvatarImage src={avatarUrls[3]} />
                </Box>
              </Box>
            </VTimelineItem>
            <ScheduleItem color="pink" time="12pm" title="Lunch break" />
            <ScheduleItem color="teal lighten-3" time="9-11am" title="Finish Home Screen" caption="Web App" />
          </VTimeline>
        </Box>
      </Card>
    </ExampleBlock>
  );
}

function AdvancedExample() {
  const [input, setInput] = useState<string | null>(null);
  const [events, setEvents] = useState<Array<{ id: number; text: string | null; time: string }>>([]);
  const [nonce, setNonce] = useState(0);
  const comment = () => {
    const time = new Date().toTimeString().replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (_match, contents) => ` ${contents.split(" ").map((v: string) => v.charAt(0)).join("")}`);
    setNonce((value) => {
      setEvents((current) => [...current, { id: value, text: input, time }]);
      return value + 1;
    });
    setInput(null);
  };
  return (
    <ExampleBlock title="Advanced" source="complex/advanced" description="Modular components allow you to create highly customized solutions that just work.">
      <Box sx={{ boxSizing: "border-box", maxWidth: 600, mx: "auto", px: 1.5, width: "100%" }}>
        <VTimeline dense clipped>
          <VTimelineItem color="orange" fillDot large itemSx={{ mb: 6 }}>
            <Box sx={{ bgcolor: cardSurface, borderRadius: 1, boxShadow: "none", mt: 1.5, minHeight: 48 }}>
              <Box sx={{ alignItems: "center", display: "flex", minHeight: 48, px: 2 }}>
                <TextField
                  value={input ?? ""}
                  onChange={(event) => setInput(event.target.value || null)}
                  onKeyDown={(event) => { if (event.key === "Enter") comment(); }}
                  label="Leave a comment..."
                  variant="standard"
                  InputLabelProps={{ shrink: Boolean(input) }}
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    flex: 1,
                    "& .MuiInputBase-root": { color: textPrimary, fontSize: 16, minHeight: 48 },
                    "& .MuiInputBase-input": { lineHeight: "20px", p: "8px 0" },
                    "& .MuiInputLabel-root": { color: textSecondary, fontSize: 16, left: 0, top: "calc(50% - 9px)", transform: "none" },
                    "& .MuiInputLabel-root.MuiInputLabel-shrink": { maxWidth: "133%", transform: "translateY(-18px) scale(.75)" },
                  }}
                />
                <Button onClick={comment} variant="text" sx={{ color: textPrimary, height: 36, minWidth: 64, mx: 0, px: 2 }}>Post</Button>
              </Box>
            </Box>
            <Box data-slot="icon" sx={{ color: white, fontSize: 14 }}>JL</Box>
          </VTimelineItem>
          <AdvancedEventRows events={[...events].reverse()} />
          <VTimelineItem hideDot itemSx={{ mb: 3 }}><Box>TODAY</Box></VTimelineItem>
          <CompactRow color="grey" iconColor="grey lighten-2" text="This order was archived." time="15:26 EDT" itemSx={{ mb: 2 }} />
          <VTimelineItem small>
            <TimelineRow left={<><Chip label="APP" size="small" sx={{ bgcolor: vuetifyColor("purple"), borderRadius: 0.75, color: white, height: 24, mr: 1 }} />Digital Downloads fulfilled 1 item.</>} right="15:25 EDT" />
          </VTimelineItem>
          <CompactRow color="grey" text="Order confirmation email was sent to John Leider (john@vuetifyjs.com)." time="15:25 EDT" itemSx={{ mb: 2 }} />
          <VTimelineItem hideDot itemSx={{ mb: 2 }}><Button sx={{ bgcolor: cardSurface, color: textPrimary, boxShadow: shadow1, height: 36, minWidth: 64, mx: 0 }}>Resend Email</Button></VTimelineItem>
          <CompactRow color="grey" text="A $15.00 USD payment was processed on PayPal Express Checkout" time="15:25 EDT" itemSx={{ mb: 2 }} />
          <CompactRow color="grey" text="John Leider placed this order on Online Store (checkout #1937432132572)." time="15:25 EDT" />
        </VTimeline>
      </Box>
    </ExampleBlock>
  );
}

function AdvancedEventRows({ events }: { events: Array<{ id: number; text: string | null; time: string }> }) {
  const elements = useRef(new Map<number, HTMLDivElement>());
  const previousRects = useRef(new Map<number, DOMRect>());
  const seenIds = useRef(new Set<number>());

  useLayoutEffect(() => {
    const currentRects = new Map<number, DOMRect>();

    events.forEach((event) => {
      const element = elements.current.get(event.id);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const previous = previousRects.current.get(event.id);
      const isNew = !seenIds.current.has(event.id);

      if (previous) {
        const deltaY = previous.top - rect.top;
        if (deltaY !== 0) {
          element.style.transition = "none";
          element.style.transform = `translateY(${deltaY}px)`;
          window.requestAnimationFrame(() => {
            element.style.transition = "transform .6s";
            element.style.transform = "";
          });
        }
      } else if (isNew) {
        element.style.animation = "timeline-slide-x-enter 300ms cubic-bezier(0.25, 0.8, 0.5, 1)";
      }

      currentRects.set(event.id, rect);
      seenIds.current.add(event.id);
    });

    previousRects.current = currentRects;
  }, [events]);

  return (
    <>
      {events.map((event) => (
        <CompactRow
          key={event.id}
          color="pink"
          text={event.text}
          time={event.time}
          itemSx={{ mb: 2 }}
          itemRef={(node) => {
            if (node) elements.current.set(event.id, node);
            else elements.current.delete(event.id);
          }}
        />
      ))}
    </>
  );
}

function VTimeline({ children, alignTop = false, dense = false, denseOnSmall = false, reverse = false, clipped = false }: { children: ReactNode; alignTop?: boolean; dense?: boolean; denseOnSmall?: boolean; reverse?: boolean; clipped?: boolean }) {
  const renderedChildren = Children.map(children, (child, index) => {
    if (!isValidElement<TimelineItemProps>(child)) return child;
    return cloneElement(child as ReactElement<TimelineItemProps>, {
      timelineAlignTop: alignTop,
      timelineDense: dense,
      timelineIndex: index,
      timelineReverse: reverse,
    });
  });

  return (
    <Box
      data-align-top={alignTop ? "true" : undefined}
      data-dense={dense ? "true" : undefined}
      data-dense-small={denseOnSmall ? "true" : undefined}
      data-reverse={reverse ? "true" : undefined}
      sx={{
        pt: clipped ? 0 : 3,
        position: "relative",
        width: "100%",
        "@keyframes timeline-slide-x-enter": {
          from: { opacity: 0, transform: "translateX(-15px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        "&:before": {
          bgcolor: divider,
          bottom: 0,
          content: "''",
          height: "100%",
          left: dense ? (reverse ? "auto" : "47px") : "calc(50% - 1px)",
          position: "absolute",
          right: dense && reverse ? "47px" : "initial",
          top: 0,
          width: 2,
        },
        "& .timeline-item": {
          display: "flex",
          pb: 3,
          position: "relative",
        },
        "& .timeline-body": {
          flex: "1 1 auto",
          height: "100%",
          position: "relative",
        },
        "& .timeline-divider": {
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          minWidth: "96px",
          position: "relative",
        },
        ...(dense ? {
          "& .timeline-item": {
            display: "flex",
            flexDirection: reverse ? "row" : "row-reverse",
            pb: 3,
            position: "relative",
          },
          "& .timeline-body": {
            flexBasis: "calc(100% - 96px)",
            maxWidth: "calc(100% - 96px)",
          },
          "& .timeline-opposite": {
            display: "none",
          },
        } : {}),
        "@media (max-width: 960px)": denseOnSmall ? { "&:before": { left: reverse ? "auto" : "47px", right: reverse ? "47px" : "auto" } } : undefined,
      }}
    >
      {renderedChildren}
    </Box>
  );
}

function VTimelineItem({ children, color = "primary", fillDot = false, hideDot = false, icon, iconColor, itemRef, itemSx, large = false, left = false, opposite, right = false, small = false, timelineAlignTop = false, timelineDense = false, timelineIndex = 0, timelineReverse = false }: TimelineItemProps) {
  const dotSize = large ? 52 : small ? 24 : 38;
  const innerSize = fillDot ? dotSize : large ? 42 : small ? 18 : 30;
  const bodyChildren = Array.isArray(children) ? children.filter((child) => !(child && typeof child === "object" && "props" in child && (child as { props?: { slot?: string } }).props?.slot === "icon")) : children;
  const slotIcon = Array.isArray(children) ? children.find((child) => child && typeof child === "object" && "props" in child && (child as { props?: { slot?: string } }).props?.slot === "icon") : undefined;
  const itemAfter = timelineReverse ? left : right;
  const itemBefore = timelineReverse ? right : left;
  const bodyOnRight = timelineDense ? !timelineReverse : timelineReverse ? (timelineIndex % 2 === 0 ? false : true) : (timelineIndex % 2 === 0 ? true : false);
  const forcedBodyOnRight = itemAfter ? true : itemBefore ? false : bodyOnRight;
  const flexDirection = timelineDense ? (timelineReverse ? "row" : "row-reverse") : forcedBodyOnRight ? "row-reverse" : "row";
  const bodyWidth = timelineDense ? "calc(100% - 96px)" : "calc(50% - 48px)";
  const oppositeNode = opposite ? (
    <Box
      className="timeline-opposite"
      sx={{
        alignSelf: "center",
        flex: "1 1 auto",
        maxWidth: "calc(50% - 48px)",
        textAlign: forcedBodyOnRight ? "right" : "left",
        ...(timelineDense ? { display: "none" } : {}),
      }}
    >
      {opposite}
    </Box>
  ) : null;
  const bodyNode = (
    <Box
      className="timeline-body"
      data-body-right={forcedBodyOnRight ? "true" : undefined}
      sx={{
        flex: "1 1 auto",
        height: "100%",
        ...(timelineDense ? { flexBasis: bodyWidth } : {}),
        maxWidth: bodyWidth,
        position: "relative",
        "& > .timeline-card:not([data-flat='true']):before, & > .timeline-card:not([data-flat='true']):after": {
          borderBottom: "10px solid transparent",
          borderRight: `10px solid ${divider}`,
          borderTop: "10px solid transparent",
          content: "''",
          position: "absolute",
          top: timelineAlignTop ? 12 : "calc(50% - 8px)",
          transform: forcedBodyOnRight ? "rotate(0deg)" : "rotate(180deg)",
          ...(forcedBodyOnRight ? { left: -10, right: "initial" } : { right: -10, left: "initial" }),
        },
        "& > .timeline-card:not([data-flat='true']):after": {
          borderRightColor: cardSurface,
          top: timelineAlignTop ? 10 : "calc(50% - 10px)",
        },
      }}
    >
      {bodyChildren}
    </Box>
  );
  const dividerNode = (
    <Box
      className="timeline-divider"
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        minWidth: 96,
        position: "relative",
      }}
    >
      {!hideDot ? (
        <Box sx={{ alignItems: "center", alignSelf: timelineAlignTop ? "flex-start" : "center", bgcolor: cardSurface, borderRadius: "50%", boxShadow: shadow1, display: "flex", height: dotSize, justifyContent: "center", width: dotSize, zIndex: 2 }}>
          <Box sx={{ alignItems: "center", bgcolor: vuetifyColor(color), borderRadius: "50%", color: iconColor ? vuetifyColor(iconColor) : white, display: "flex", height: innerSize, justifyContent: "center", m: fillDot ? 0 : `${(dotSize - innerSize) / 2}px`, width: innerSize }}>
            {slotIcon || (icon ? <VIcon name={icon} size={small ? 16 : 24} /> : null)}
          </Box>
        </Box>
      ) : null}
    </Box>
  );

  return (
    <Box
      className="timeline-item"
      data-left={left ? "true" : undefined}
      data-right={right ? "true" : undefined}
      ref={itemRef}
      sx={{
        flexDirection,
        width: "100%",
        ...itemSx,
      }}
    >
      {bodyNode}
      {dividerNode}
      {oppositeNode}
    </Box>
  );
}

function TimelineCard({ title, body }: { title: string; body: string }) {
  return (
    <Card className="timeline-card" sx={{ bgcolor: cardSurface, color: textPrimary, boxShadow: shadow2, borderRadius: 0.5, overflow: "visible", position: "relative" }}>
      <Box sx={{ fontSize: 24, fontWeight: 400, p: 2 }}>{title}</Box>
      <Box sx={{ p: 2, pt: 0, color: textSecondary }}>{body}</Box>
    </Card>
  );
}

function FeatureTimelineCard({ color, icon, title, columns, rightTitle = false }: { color: string; icon: string; title: string; columns: ReactNode[]; rightTitle?: boolean }) {
  return (
    <Card className="timeline-card" sx={{ bgcolor: cardSurface, color: textPrimary, boxShadow: shadow2, borderRadius: 0.5, overflow: "visible", position: "relative" }}>
      <Box sx={{ alignItems: "center", bgcolor: vuetifyColor(color), color: white, display: "flex", justifyContent: rightTitle ? "flex-end" : "flex-start", p: 2 }}>
        {!rightTitle ? <VIcon name={icon} size={42} /> : null}
        <Typography component="h2" sx={{ fontSize: 34, fontWeight: 300, mx: rightTitle ? 2 : 2 }}>{title}</Typography>
        {rightTitle ? <VIcon name={icon} size={42} /> : null}
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", p: 2 }}>
        {columns.map((column, index) => (
          <Box key={index} sx={{ boxSizing: "border-box", flexBasis: columns.length === 1 ? "100%" : { xs: "100%", md: index === 0 && columns.length === 2 ? "66.666%" : columns.length === 2 ? "33.333%" : "33.333%" }, p: 1, textAlign: typeof column === "object" ? "right" : "left" }}>{column}</Box>
        ))}
      </Box>
    </Card>
  );
}

function AlertBox({ color, icon, children }: { color: string; icon: string; children: ReactNode }) {
  return <Box sx={{ alignItems: "center", bgcolor: vuetifyColor(color), color: white, display: "flex", fontSize: 16, lineHeight: 1.5, mb: 2, minHeight: 48, p: 2 }}><Box sx={{ mr: 2 }}><VIcon name={icon} /></Box>{children}</Box>;
}

function ScheduleItem({ color, time, title, caption }: { color: string; time: string; title: string; caption?: string }) {
  return (
    <VTimelineItem color={color} small>
      <Box sx={{ display: "flex", flexWrap: "wrap", mx: -1.5, pt: 0.5 }}>
        <Box sx={{ boxSizing: "border-box", flexBasis: "25%", fontWeight: 700, px: 1.5 }}>{time}</Box>
        <Box sx={{ boxSizing: "border-box", flex: 1, px: 1.5 }}><strong>{title}</strong>{caption ? <Typography sx={{ fontSize: 12, lineHeight: "20px" }}>{caption}</Typography> : null}</Box>
      </Box>
    </VTimelineItem>
  );
}

function CompactRow({ color, iconColor, itemRef, itemSx, text, time }: { color: string; iconColor?: string; itemRef?: (node: HTMLDivElement | null) => void; itemSx?: Record<string, unknown>; text: ReactNode; time: string }) {
  return <VTimelineItem color={color} iconColor={iconColor} itemRef={itemRef} itemSx={itemSx} small><TimelineRow left={text} right={time} /></VTimelineItem>;
}

function TimelineRow({ left, right }: { left: ReactNode; right: ReactNode }) {
  return <Box sx={{ color: textSecondary, display: "flex", flexWrap: "wrap", justifyContent: "space-between", mx: -1.5 }}><Box sx={{ boxSizing: "border-box", flexBasis: "58.333333%", px: 1.5 }}>{left}</Box><Box sx={{ boxSizing: "border-box", flexBasis: "41.666667%", px: 1.5, textAlign: "right" }}>{right}</Box></Box>;
}

function TimelineAvatar({ slot }: { slot?: string }) {
  return <Box data-slot={slot} sx={{ height: "100%", width: "100%" }}><AvatarImage src="http://i.pravatar.cc/64" /></Box>;
}

function AvatarImage({ src }: { src: string }) {
  return <Box component="img" src={src} sx={{ borderRadius: "50%", display: "inline-block", height: 48, objectFit: "cover", verticalAlign: "middle", width: 48 }} />;
}

function VuetifySwitch({ checked, onChange, label }: { checked: boolean; onChange: (value: boolean) => void; label: string }) {
  return <Box sx={{ alignItems: "center", display: "inline-flex", minHeight: 48, mx: 2 }}><Switch checked={checked} onChange={(event) => onChange(event.target.checked)} sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: primary }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: primary } }} /><Typography sx={{ fontSize: 16 }}>{label}</Typography></Box>;
}

function VIcon({ name, size = 24, muted = false }: { name: string; size?: number; muted?: boolean }) {
  const path = mdiPaths[name];
  return path ? <Box component="svg" viewBox="0 0 24 24" sx={{ color: muted ? iconActive : "inherit", display: "inline-block", height: size, verticalAlign: "middle", width: size }}><Box component="path" d={path} fill="currentColor" /></Box> : null;
}

function BaseHeading({ children, id }: { children: ReactNode; id?: string }) {
  return <Typography id={id} component="h2" sx={{ fontSize: 32, lineHeight: 1.2, fontWeight: 400, mb: 2 }}>{children}</Typography>;
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: 0.55, py: 0.18, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function ExampleBlock({ title, description, source, children }: { title?: string; description?: ReactNode; source: ExampleKey; children: ReactNode }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card sx={{ mb: 5, bgcolor: appBackground, boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
        {title ? <Typography sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>{title}</Typography> : null}
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}><CodeIcon sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit><Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", overflowX: "auto", p: 2 }}><Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box></Box></Collapse>
      <Box sx={{ bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.7)" : textSecondary, p: 2, overflow: "visible" }}>
        {description ? <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : textSecondary, fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography> : null}
        <Box data-app="true" sx={{ overflow: "visible" }}>{children}</Box>
      </Box>
    </Card>
  );
}

function exampleIconSx(active: boolean) {
  return { bgcolor: active ? "rgba(0,151,167,.14)" : "transparent", color: active ? primary : textSecondary, height: 28, width: 28, mx: 0.25 };
}

function vuetifyColor(color: string) {
  const map: Record<string, string> = {
    "accent": "#7C4DFF",
    "amber": "#FFC107",
    "amber lighten-1": "#FFCA28",
    "blue-grey": "#607D8B",
    "cyan": "#00BCD4",
    "cyan lighten-1": "#26C6DA",
    "deep-orange": "#FF5722",
    "error": "#D50000",
    "green": "#4CAF50",
    "green lighten-1": "#66BB6A",
    "grey": "#9E9E9E",
    "grey lighten-2": "#E0E0E0",
    "indigo": "#3F51B5",
    "info": "#42A5F5",
    "orange": "#FF9800",
    "pink": "#E91E63",
    "pink darken-1": "#D81B60",
    "primary": primary,
    "purple": "#9C27B0",
    "purple darken-1": "#8E24AA",
    "purple lighten-2": "#BA68C8",
    "purple lighten-3": "#CE93D8",
    "red lighten-1": "#EF5350",
    "red lighten-2": "#E57373",
    "secondary": "#FFA726",
    "success": "#00C853",
    "teal lighten-3": "#80CBC4",
    "warning": "#FFA000",
    "white": white,
  };
  return map[color] || color || primary;
}

const smallLongText = "Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit.";
const avatarUrls = [
  "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
  "https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown",
  "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned",
  "https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale",
];

const sourceTemplates: Record<ExampleKey, string> = {
  usage: "src/demo/examples/timelines/usage.vue",
  playground: "src/demo/examples/timelines/playground.vue",
  "simple/small": "src/demo/examples/timelines/simple/small.vue",
  "simple/icons": "src/demo/examples/timelines/simple/icons.vue",
  "simple/reverse": "src/demo/examples/timelines/simple/reverse.vue",
  "simple/card": "src/demo/examples/timelines/simple/card.vue",
  "intermediate/alert": "src/demo/examples/timelines/intermediate/alert.vue",
  "intermediate/slot": "src/demo/examples/timelines/intermediate/slot.vue",
  "intermediate/avatars": "src/demo/examples/timelines/intermediate/avatars.vue",
  "complex/color": "src/demo/examples/timelines/complex/color.vue",
  "complex/advanced": "src/demo/examples/timelines/complex/advanced.vue",
};
