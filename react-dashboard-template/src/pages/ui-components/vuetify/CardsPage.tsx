import { useEffect, useState, type ReactNode } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Collapse,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  LinearProgress,
  Rating,
  Slider,
  Stack,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Bookmark,
  CalendarViewMonth,
  ChevronRight,
  Close,
  Cloud,
  CloudDownload,
  Code,
  ExpandLess,
  ExpandMore,
  Favorite,
  GitHub,
  Image as ImageIcon,
  InvertColors,
  Menu,
  Search,
  Send,
  Share,
  Twitter,
  WbSunny,
  Window,
} from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };
const imgBase = "/static/doc-images/cards";

interface CardExample {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  minHeight: number;
  render: (inverted: boolean) => ReactNode;
}

export default function CardsPage() {
  return (
    <DocPage
      title="Cards"
      namespace="Components"
      icon={<CalendarViewMonth />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Cards" },
      ]}
    >
      <DocText>
        The <CodePill>v-card</CodePill> component is a versatile component that can be used for anything from a panel to a static image. The <strong>card</strong> component has numerous helper components to make markup as easy as possible. Components that have no listed options use <strong>Vue&apos;s</strong> functional component option for faster rendering and serve as markup sugar to make building easier.
      </DocText>
      <UsageSection />
      <FunctionalSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [subtitle, setSubtitle] = useState(true);
  const [supportingText, setSupportingText] = useState(true);
  const [elevation, setElevation] = useState(2);
  const [variant, setVariant] = useState("default");
  const [inverted, setInverted] = useState(false);

  const variantAttrs = {
    outlined: variant === "outlined",
    raised: variant === "raised",
    shaped: variant === "shaped",
    tile: variant === "tile",
  };
  const resetVariant = (_: unknown, value: string | null) => {
    if (!value) return;
    setVariant(value);
    if (value === "raised" && elevation < 8) setElevation(8);
  };

  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Usage
      </Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>
        A card has 4 basic components, <CodePill>v-card-title</CodePill>, <CodePill>v-card-subtitle</CodePill>, <CodePill>v-card-text</CodePill> and <CodePill>v-card-actions</CodePill>.
      </Typography>
      <Card variant="outlined" sx={{ bgcolor: "background.default", borderColor: "rgba(111,125,133,.18)", boxShadow: "none", overflow: "hidden", mb: 6 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 3fr) minmax(270px, 1fr)" } }}>
          <Box sx={{ minHeight: 460, p: { xs: 3, md: 4 }, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "#fff" : "inherit" }}>
            <VCardSurface
              width={342}
              disabled={disabled}
              loading={loading}
              elevation={elevation}
              outlined={variantAttrs.outlined}
              shaped={variantAttrs.shaped}
              tile={variantAttrs.tile}
              inverted={inverted}
            >
              {image && (
                <Box sx={{ height: 200, bgcolor: inverted ? "#555" : "#eeeeee", display: "flex", alignItems: "center", justifyContent: "center", color: inverted ? "rgba(255,255,255,.72)" : "rgba(0,0,0,.54)" }}>
                  <ImageIcon sx={{ fontSize: 64 }} />
                </Box>
              )}
              <VCardTitle>Card title</VCardTitle>
              {subtitle && <VCardSubtitle>Secondary text</VCardSubtitle>}
              {supportingText && <VCardText>Greyhound divisively hello coldly wonderfully marginally far upon excluding.</VCardText>}
            </VCardSurface>
          </Box>
          <Box sx={{ borderLeft: { lg: "1px solid rgba(111,125,133,.14)" } }}>
            <Toolbar variant="dense" sx={{ bgcolor: "rgba(111,125,133,.10)", minHeight: 54, px: 2.25 }}>
              <Typography sx={{ fontSize: 20, fontWeight: 400 }}>Options</Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Tooltip title="Invert playground colors">
                <IconButton size="small" aria-label="Invert playground colors" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}>
                  <InvertColors fontSize="small" />
                </IconButton>
              </Tooltip>
            </Toolbar>
            <Divider />
            <Stack spacing={1.4} sx={{ p: 2.25 }}>
              <ToggleButtonGroup exclusive value={variant} onChange={resetVariant} size="small" sx={{ flexWrap: "wrap", gap: 0.75, "& .MuiToggleButton-root": { border: "1px solid rgba(0,0,0,.14)", borderRadius: "4px !important", textTransform: "none", px: 1.25 } }}>
                {["default", "outlined", "raised", "shaped", "tile"].map((item) => <ToggleButton key={item} value={item}>{item}</ToggleButton>)}
              </ToggleButtonGroup>
              <OptionSwitch label="disabled" checked={disabled} onChange={setDisabled} />
              <OptionSwitch label="loading" checked={loading} onChange={setLoading} />
              <OptionSwitch label="image" checked={image} onChange={setImage} />
              <OptionSwitch label="subtitle" checked={subtitle} onChange={setSubtitle} />
              <OptionSwitch label="supportingText" checked={supportingText} onChange={setSupportingText} />
              <Typography sx={{ fontSize: 14, color: "text.secondary", pt: 0.5 }}>elevation</Typography>
              <Slider value={elevation} min={2} max={24} onChange={(_, value) => setElevation(value as number)} disabled={variant === "outlined"} sx={{ color: "#0097a7", mx: 1, width: "calc(100% - 16px)" }} />
            </Stack>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

function FunctionalSection() {
  return (
    <Box sx={{ mb: 5 }}>
      <Stack spacing={1.2}>
        {[
          <><CodePill>v-card-actions</CodePill>: The container used for placing <strong>actions</strong> for a card, such as <CodePill>v-btn</CodePill> or <CodePill>v-menu</CodePill>. Also applies <em>special margin</em> to buttons so that they properly line up with other card content areas.</>,
          <><CodePill>v-card-subtitle</CodePill>: Provides a default <strong>font-size</strong> and <strong>padding</strong> for card subtitles.Font-size can be overwritten with typography classes.</>,
          <><CodePill>v-card-text</CodePill>: Primarily used for <strong>text content</strong> in a card. Applies padding for text, reduces its font-size to .875rem.</>,
          <><CodePill>v-card-title</CodePill>: Provides a default <strong>font-size</strong> and <strong>padding</strong> for card titles. Font-size can be overwritten with typography classes.</>,
        ].map((item, index) => (
          <Typography key={index} color="text.secondary" sx={{ fontSize: 15.5, fontWeight: 300, lineHeight: 1.65 }}>{item}</Typography>
        ))}
      </Stack>
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
        {cardExamples.map((example) => (
          <VuetifyExampleBlock key={example.title} title={example.title} description={example.description} source={example.source} minHeight={example.minHeight}>
            {(inverted) => example.render(inverted)}
          </VuetifyExampleBlock>
        ))}
      </Stack>
    </Box>
  );
}

function VuetifyExampleBlock({
  title,
  description,
  source,
  children,
  minHeight,
}: {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  children: (inverted: boolean) => ReactNode;
  minHeight: number;
}) {
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

function OutlinedExample({ inverted }: { inverted: boolean }) {
  return (
    <VCardSurface width={344} outlined inverted={inverted} mxAuto>
      <Box sx={{ display: "flex", p: 2, gap: 2 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1.8, mb: 2, color: inverted ? "rgba(255,255,255,.64)" : "rgba(0,0,0,.6)" }}>OVERLINE</Typography>
          <Typography sx={{ fontSize: 24, lineHeight: 1.25, mb: 0.5 }}>Headline 5</Typography>
          <Typography sx={{ fontSize: 14, color: inverted ? "rgba(255,255,255,.68)" : "rgba(0,0,0,.6)" }}>Greyhound divisely hello coldly fonwderfully</Typography>
        </Box>
        <Box sx={{ width: 80, height: 80, bgcolor: "grey.500" }} />
      </Box>
      <VCardActions>
        <TextAction>Button</TextAction>
        <TextAction>Button</TextAction>
      </VCardActions>
    </VCardSurface>
  );
}

function IntermediateExample() {
  return (
    <VCardSurface width="fit-content" mxAuto>
      <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", gap: 0 }}>
        <Box component="img" src={`${imgBase}/store.jpg`} sx={{ height: 200, width: 200, objectFit: "cover" }} />
        <Stack justifyContent="center" alignItems="center" sx={{ width: 52 }}>
          <IconButton><Favorite /></IconButton>
          <IconButton><Bookmark /></IconButton>
          <IconButton><Share /></IconButton>
        </Stack>
      </Box>
    </VCardSurface>
  );
}

function InfoCardExample({ inverted }: { inverted: boolean }) {
  return (
    <VCardSurface width={344} inverted={inverted} mxAuto>
      <VCardText>
        <Typography sx={{ mb: 1 }}>Word of the Day</Typography>
        <Typography sx={{ fontSize: 34, lineHeight: 1.2, color: inverted ? "#fff" : "rgba(0,0,0,.87)", mb: 1.5 }}>be•nev•o•lent</Typography>
        <Typography sx={{ mb: 1 }}>adjective</Typography>
        <Typography sx={{ color: inverted ? "#fff" : "rgba(0,0,0,.87)" }}>well meaning and kindly.<br />&quot;a benevolent smile&quot;</Typography>
      </VCardText>
      <VCardActions><TextAction color="#6200ea">Learn More</TextAction></VCardActions>
    </VCardSurface>
  );
}

function MediaWithTextExample({ inverted }: { inverted: boolean }) {
  return (
    <VCardSurface width={400} inverted={inverted} mxAuto>
      <ImageHeader src={`${imgBase}/docks.jpg`} height={200} title="Top 10 Australian beaches" />
      <VCardSubtitle compact>Number 10</VCardSubtitle>
      <VCardText primary>
        <div>Whitehaven Beach</div>
        <div>Whitsunday Island, Whitsunday Islands</div>
      </VCardText>
      <VCardActions>
        <TextAction color="#fb8c00">Share</TextAction>
        <TextAction color="#fb8c00">Explore</TextAction>
      </VCardActions>
    </VCardSurface>
  );
}

function GridsExample() {
  const cards = [
    { title: "Pre-fab homes", src: `${imgBase}/house.jpg`, flex: 12 },
    { title: "Favorite road trips", src: `${imgBase}/road.jpg`, flex: 6 },
    { title: "Best airlines", src: `${imgBase}/plane.jpg`, flex: 6 },
  ];
  return (
    <VCardSurface width={500} mxAuto>
      <SystemBar color="#303f9f" />
      <Toolbar sx={{ bgcolor: "#3f51b5", color: "#fff", minHeight: 64 }}>
        <IconButton sx={{ color: "#fff" }}><Menu /></IconButton>
        <Typography sx={{ fontSize: 20 }}>Discover</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton sx={{ color: "#fff" }}><Search /></IconButton>
      </Toolbar>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={1}>
          {cards.map((card) => (
            <Grid item xs={card.flex} key={card.title}>
              <VCardSurface>
                <ImageHeader src={card.src} height={200} title={card.title} gradient />
                <VCardActions end>
                  <IconButton><Favorite /></IconButton>
                  <IconButton><Bookmark /></IconButton>
                  <IconButton><Share /></IconButton>
                </VCardActions>
              </VCardSurface>
            </Grid>
          ))}
        </Grid>
      </Box>
    </VCardSurface>
  );
}

function HorizontalExample() {
  const items = [
    { color: "#1F7087", src: `${imgBase}/foster.jpg`, title: "Supermodel", artist: "Foster the People" },
    { color: "#952175", src: `${imgBase}/halcyon.png`, title: "Halcyon Days", artist: "Ellie Goulding" },
  ];
  return (
    <VCardSurface width={400} mxAuto>
      <SystemBar color="#ad1457" />
      <Toolbar sx={{ bgcolor: "#e91e63", color: "#fff", minHeight: 64 }}>
        <IconButton sx={{ color: "#fff" }}><Menu /></IconButton>
        <Typography sx={{ fontSize: 20 }}>My Music</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton sx={{ color: "#fff" }}><Search /></IconButton>
      </Toolbar>
      <Stack spacing={1} sx={{ p: 2 }}>
        <VCardSurface dark bgcolor="#385F73">
          <VCardTitle>Unlimited music now</VCardTitle>
          <VCardSubtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</VCardSubtitle>
          <VCardActions><TextAction light>Listen Now</TextAction></VCardActions>
        </VCardSurface>
        {items.map((item) => (
          <VCardSurface key={item.title} dark bgcolor={item.color}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <VCardTitle>{item.title}</VCardTitle>
                <VCardSubtitle>{item.artist}</VCardSubtitle>
              </Box>
              <Box component="img" src={item.src} sx={{ width: 125, height: 125, objectFit: "cover", m: 1.5 }} />
            </Box>
          </VCardSurface>
        ))}
      </Stack>
    </VCardSurface>
  );
}

function CustomActionsExample({ inverted }: { inverted: boolean }) {
  const [show, setShow] = useState(false);
  return (
    <VCardSurface width={344} inverted={inverted} mxAuto>
      <Box component="img" src={`${imgBase}/sunshine.jpg`} sx={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
      <VCardTitle>Top western road trips</VCardTitle>
      <VCardSubtitle>1,000 miles of wonder</VCardSubtitle>
      <VCardActions>
        <TextAction>Share</TextAction>
        <TextAction color="#9c27b0">Explore</TextAction>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={() => setShow((value) => !value)}>{show ? <ExpandLess /> : <ExpandMore />}</IconButton>
      </VCardActions>
      <Collapse in={show} timeout={220}>
        <Divider />
        <VCardText>I&apos;m a thing. But, like most politicians, he promised more than he could deliver. You won&apos;t have time for sleeping, soldier, not with all the bed making you&apos;ll be doing. Then we&apos;ll go with that data file! Hey, you add a one and two zeros to that or we walk! You&apos;re going to do his laundry? I&apos;ve got to find a way to escape.</VCardText>
      </Collapse>
    </VCardSurface>
  );
}

function TwitterCardExample() {
  return (
    <VCardSurface width={400} dark bgcolor="#26c6da" mxAuto>
      <VCardTitle><Twitter sx={{ fontSize: 32, mr: 1.5 }} /><Typography sx={{ fontSize: 20, fontWeight: 300 }}>Twitter</Typography></VCardTitle>
      <VCardText sx={{ fontSize: 24, lineHeight: 1.35, fontWeight: 700, color: "#fff" }}>&quot;Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.&quot;</VCardText>
      <VCardActions>
        <Avatar src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light" sx={{ width: 40, height: 40, bgcolor: "#424242", boxShadow: "0 3px 6px rgba(0,0,0,.28)" }} />
        <Typography sx={{ ml: 2, flexGrow: 1 }}>Evan You</Typography>
        <Favorite sx={{ fontSize: 20, mr: 0.5 }} /><Typography sx={{ mr: 1.2 }}>256</Typography>
        <Typography sx={{ mr: 1 }}>·</Typography>
        <Share sx={{ fontSize: 20, mr: 0.5 }} /><Typography>45</Typography>
      </VCardActions>
    </VCardSurface>
  );
}

function LoadingExample({ inverted }: { inverted: boolean }) {
  const [loading, setLoading] = useState(false);
  const [selection, setSelection] = useState(1);
  useEffect(() => {
    if (!loading) return;
    const timeout = window.setTimeout(() => setLoading(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [loading]);

  return (
    <VCardSurface width={374} inverted={inverted} mxAuto>
      {loading && <LinearProgress sx={{ height: 4, color: "#6200ea" }} />}
      <Box component="img" src="https://cdn.vuetifyjs.com/images/cards/cooking.png" sx={{ width: "100%", height: 250, objectFit: "cover", display: "block" }} />
      <VCardTitle>Cafe Badilico</VCardTitle>
      <VCardText>
        <Stack direction="row" alignItems="center">
          <Rating value={4.5} precision={0.5} readOnly size="small" sx={{ color: "#ffc107" }} />
          <Typography sx={{ ml: 2, color: "text.secondary" }}>4.5 (413)</Typography>
        </Stack>
        <Typography sx={{ my: 2, fontSize: 16, color: inverted ? "#fff" : "rgba(0,0,0,.87)" }}>$ • Italian, Cafe</Typography>
        <Typography>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</Typography>
      </VCardText>
      <Divider sx={{ mx: 2 }} />
      <VCardTitle>Tonight&apos;s availability</VCardTitle>
      <VCardText>
        <Stack direction="row" gap={1} flexWrap="wrap">
          {["5:30PM", "7:30PM", "8:00PM", "9:00PM"].map((time, index) => (
            <Chip key={time} label={time} onClick={() => setSelection(index)} sx={{ bgcolor: selection === index ? "#6200ea" : inverted ? "#555" : "#e0e0e0", color: selection === index ? "#fff" : "inherit" }} />
          ))}
        </Stack>
      </VCardText>
      <VCardActions><TextAction color="#9575cd" onClick={() => setLoading(true)} disabled={loading}>Reserve</TextAction></VCardActions>
    </VCardSurface>
  );
}

function WeatherExample({ inverted }: { inverted: boolean }) {
  const [time, setTime] = useState(0);
  const labels = ["SU", "MO", "TU", "WED", "TH", "FR", "SA"];
  const forecast = [
    { day: "Tuesday", icon: <WbSunny />, temp: "24°/12°" },
    { day: "Wednesday", icon: <WbSunny />, temp: "22°/14°" },
    { day: "Thursday", icon: <Cloud />, temp: "25°/15°" },
  ];
  return (
    <VCardSurface width={400} inverted={inverted} mxAuto>
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontSize: 24, lineHeight: 1.3 }}>San Francisco</Typography>
        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>Mon, 12:30 PM, Mostly sunny</Typography>
      </Box>
      <VCardText>
        <Grid container alignItems="center">
          <Grid item xs={6}><Typography sx={{ fontSize: 60, lineHeight: 1 }}>23°C</Typography></Grid>
          <Grid item xs={6}><Box component="img" src="https://cdn.vuetifyjs.com/images/cards/sun.png" alt="Sunny image" sx={{ width: 92 }} /></Grid>
        </Grid>
      </VCardText>
      <WeatherLine icon={<Send />} text="23 km/h" />
      <WeatherLine icon={<CloudDownload />} text="48%" />
      <Box sx={{ mx: 4, pt: 1 }}>
        <Slider value={time} min={0} max={6} step={1} marks={labels.map((label, value) => ({ label, value }))} onChange={(_, value) => setTime(value as number)} sx={{ color: "#0097a7", "& .MuiSlider-markLabel": { fontSize: 11 } }} />
      </Box>
      <Stack sx={{ py: 1 }}>
        {forecast.map((item) => (
          <Box key={item.day} sx={{ display: "grid", gridTemplateColumns: "1fr 40px 80px", alignItems: "center", minHeight: 40, px: 2 }}>
            <Typography>{item.day}</Typography>
            <Box sx={{ color: "text.secondary" }}>{item.icon}</Box>
            <Typography sx={{ textAlign: "right", color: "text.secondary" }}>{item.temp}</Typography>
          </Box>
        ))}
      </Stack>
      <Divider />
      <VCardActions><TextAction>Full Report</TextAction></VCardActions>
    </VCardSurface>
  );
}

function AdvancedExample({ inverted }: { inverted: boolean }) {
  return (
    <VCardSurface width={344} inverted={inverted} mxAuto>
      <Box sx={{ display: "flex", p: 2, gap: 2, alignItems: "center" }}>
        <Avatar sx={{ bgcolor: "grey.500" }} />
        <Box>
          <Typography sx={{ fontSize: 24, lineHeight: 1.2 }}>Our Changing Planet</Typography>
          <Typography sx={{ fontSize: 14, color: "text.secondary" }}>by Kurt Wagner</Typography>
        </Box>
      </Box>
      <Box component="img" src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg" sx={{ width: "100%", height: 194, objectFit: "cover", display: "block" }} />
      <VCardText>Visit ten places on our planet that are undergoing the biggest changes today.</VCardText>
      <VCardActions>
        <TextAction color="#6200ea">Read</TextAction>
        <TextAction color="#6200ea">Bookmark</TextAction>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton><Favorite /></IconButton>
        <IconButton><Share /></IconButton>
      </VCardActions>
    </VCardSurface>
  );
}

function SystemBar({ color }: { color: string }) {
  return (
    <Box sx={{ height: 24, bgcolor: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "flex-end", px: 1 }}>
      <Window sx={{ fontSize: 16, mx: 0.4 }} />
      <Window sx={{ fontSize: 16, mx: 0.4 }} />
      <Close sx={{ fontSize: 16, mx: 0.4 }} />
    </Box>
  );
}

function ImageHeader({ src, height, title, gradient = false }: { src: string; height: number; title: string; gradient?: boolean }) {
  return (
    <Box sx={{ position: "relative", height, color: "#fff", display: "flex", alignItems: "flex-end", backgroundImage: `${gradient ? "linear-gradient(to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)), " : ""}url(${src})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <Typography sx={{ fontSize: 20, fontWeight: 500, p: 2 }}>{title}</Typography>
    </Box>
  );
}

function WeatherLine({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <Box sx={{ minHeight: 40, display: "flex", alignItems: "center", px: 2, color: "text.secondary" }}>
      <Box sx={{ width: 40 }}>{icon}</Box>
      <Typography>{text}</Typography>
    </Box>
  );
}

function VCardSurface({
  children,
  width,
  outlined,
  shaped,
  tile,
  disabled,
  loading,
  elevation = 2,
  inverted,
  dark,
  bgcolor,
  mxAuto,
}: {
  children: ReactNode;
  width?: number | string;
  outlined?: boolean;
  shaped?: boolean;
  tile?: boolean;
  disabled?: boolean;
  loading?: boolean;
  elevation?: number;
  inverted?: boolean;
  dark?: boolean;
  bgcolor?: string;
  mxAuto?: boolean;
}) {
  const isDark = Boolean(dark || inverted);
  return (
    <Card sx={{ width, maxWidth: "100%", mx: mxAuto ? "auto" : undefined, bgcolor: bgcolor || (isDark ? "#424242" : "#fff"), color: isDark ? "#fff" : "rgba(0,0,0,.87)", borderRadius: tile ? 0 : shaped ? "24px 4px" : 0.5, boxShadow: outlined ? "none" : vueElevationShadow(elevation, isDark), border: outlined ? "1px solid rgba(0,0,0,.14)" : "none", overflow: "hidden", opacity: disabled ? 0.52 : 1, pointerEvents: disabled ? "none" : "auto", position: "relative", transition: "box-shadow 180ms cubic-bezier(.4,0,.2,1), border-radius 180ms cubic-bezier(.4,0,.2,1)" }}>
      {loading && <LinearProgress sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 4 }} />}
      {children}
    </Card>
  );
}

function vueElevationShadow(level: number, dark: boolean) {
  const elevation = Math.max(0, Math.min(24, level));
  if (elevation <= 0) return "none";
  const key = dark ? "0,0,0" : "0,0,0";
  const y1 = Math.max(1, Math.round(elevation * 0.45));
  const blur1 = Math.max(2, Math.round(elevation * 0.55));
  const spread1 = -Math.max(1, Math.round(elevation * 0.18));
  const y2 = Math.max(1, Math.round(elevation * 0.35));
  const blur2 = Math.max(2, Math.round(elevation * 0.45));
  const y3 = Math.max(1, Math.round(elevation * 0.22));
  const blur3 = Math.max(3, Math.round(elevation * 1.1));
  const strength = dark ? 1.25 : 1;

  return [
    `0px ${y1}px ${blur1}px ${spread1}px rgba(${key}, ${0.2 * strength})`,
    `0px ${y2}px ${blur2}px 0px rgba(${key}, ${0.14 * strength})`,
    `0px ${y3}px ${blur3}px 0px rgba(${key}, ${0.12 * strength})`,
  ].join(", ");
}

function VCardTitle({ children }: { children: ReactNode }) {
  return <Box sx={{ p: 2, fontSize: 20, fontWeight: 500, lineHeight: 1.35, display: "flex", alignItems: "center" }}>{children}</Box>;
}

function VCardSubtitle({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  return <Box sx={{ px: 2, pt: compact ? 2 : 0, pb: 0, fontSize: 14, color: "text.secondary" }}>{children}</Box>;
}

function VCardText({ children, primary = false, sx = {} }: { children: ReactNode; primary?: boolean; sx?: object }) {
  return <Box sx={{ p: 2, fontSize: 14, color: primary ? "rgba(0,0,0,.87)" : "text.secondary", lineHeight: 1.55, ...sx }}>{children}</Box>;
}

function VCardActions({ children, end = false }: { children: ReactNode; end?: boolean }) {
  return <Box sx={{ minHeight: 52, display: "flex", alignItems: "center", justifyContent: end ? "flex-end" : "flex-start", px: 1 }}>{children}</Box>;
}

function TextAction({ children, color, light, onClick, disabled }: { children: ReactNode; color?: string; light?: boolean; onClick?: () => void; disabled?: boolean }) {
  return (
    <Button disabled={disabled} onClick={onClick} sx={{ minWidth: 64, textTransform: "none", color: light ? "#fff" : color || "rgba(0,0,0,.72)", fontWeight: 500 }}>
      {children}
    </Button>
  );
}

function OptionSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <FormControlLabel control={<Switch checked={checked} onChange={(event) => onChange(event.target.checked)} sx={vuseSwitchSx} />} label={label} sx={{ m: 0, ".MuiFormControlLabel-label": { fontSize: 14 } }} />;
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

const vuseSwitchSx = {
  "& .MuiSwitch-switchBase.Mui-checked": { color: "#0097a7" },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: "#0097a7" },
};

const cardExamples: CardExample[] = [
  { title: "Outlined cards", description: <>An <strong>outlined</strong> card has 0 elevation and contains a soft border.</>, source: "outlined", minHeight: 310, render: (inverted) => <OutlinedExample inverted={inverted} /> },
  { title: "Intermediate", description: "The v-card component is useful for wrapping content.", source: "intermediate", minHeight: 310, render: () => <IntermediateExample /> },
  { title: "Information card", description: "Cards are entry points to more detailed information. To keep things concise, ensure to limit the number of actions the user can take.", source: "info", minHeight: 360, render: (inverted) => <InfoCardExample inverted={inverted} /> },
  { title: "Media with text", description: "Using the layout system, we can add custom text anywhere within the background.", source: "media", minHeight: 430, render: (inverted) => <MediaWithTextExample inverted={inverted} /> },
  { title: "Grids", description: "Using grids, you can create beautiful layouts.", source: "grids", minHeight: 650, render: () => <GridsExample /> },
  { title: "Horizontal cards", description: <>Using <CodePill>v-flex</CodePill>, you can create customized horizontal cards. Use the <CodePill>contain</CodePill> property to shrink the <CodePill>v-img</CodePill> to fit inside the container, instead of covering.</>, source: "horizontal", minHeight: 620, render: () => <HorizontalExample /> },
  { title: "Custom actions", description: "With a simple conditional, you can easily add supplementary text that is hidden until opened.", source: "custom", minHeight: 520, render: (inverted) => <CustomActionsExample inverted={inverted} /> },
  { title: "Twitter card", description: <>The <CodePill>v-card</CodePill> component has multiple children components that help you build complex examples without having to worry about spacing. This example is comprised of the <CodePill>v-card-title</CodePill>, <CodePill>v-card-text</CodePill> and <CodePill>v-card-actions</CodePill> components.</>, source: "twitter", minHeight: 420, render: () => <TwitterCardExample /> },
  { title: "Loading card", description: "Cards can be set to a loading state when processing a user action. This disables further actions and provides visual feedback with an indeterminate v-progress-linear.", source: "loading", minHeight: 760, render: (inverted) => <LoadingExample inverted={inverted} /> },
  { title: "Weather card", description: "Using v-list-items and a v-slider, we are able to create a unique weather card. The list components ensure that we have consistent spacing and functionality while the slider component allows us to provide a useful interface of selection to the user.", source: "weather", minHeight: 690, render: (inverted) => <WeatherExample inverted={inverted} /> },
  { title: "Advanced", description: <>Using <CodePill>v-list-item</CodePill> and <CodePill>v-img</CodePill> allows us to create unique card layouts in an advanced setting</>, source: "advanced", minHeight: 540, render: (inverted) => <AdvancedExample inverted={inverted} /> },
];

const sourceTemplates = {
  outlined: `<v-card class="mx-auto" max-width="344" outlined>
  <v-list-item three-line>...</v-list-item>
  <v-card-actions>
    <v-btn text>Button</v-btn>
    <v-btn text>Button</v-btn>
  </v-card-actions>
</v-card>`,
  intermediate: `<v-card class="d-inline-block mx-auto">
  <v-container>
    <v-row justify="space-between">
      <v-img height="200" width="200" src="store.jpg"></v-img>
      <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>
    </v-row>
  </v-container>
</v-card>`,
  info: `<v-card class="mx-auto" max-width="344">
  <v-card-text>
    <div>Word of the Day</div>
    <p class="text-h4 text--primary">be•nev•o•lent</p>
  </v-card-text>
  <v-card-actions><v-btn text color="deep-purple accent-4">Learn More</v-btn></v-card-actions>
</v-card>`,
  media: `<v-card class="mx-auto" max-width="400">
  <v-img class="white--text align-end" height="200px" src="docks.jpg">
    <v-card-title>Top 10 Australian beaches</v-card-title>
  </v-img>
</v-card>`,
  grids: `<v-card class="mx-auto" max-width="500">
  <v-system-bar color="indigo darken-2" dark>...</v-system-bar>
  <v-toolbar color="indigo" dark>Discover</v-toolbar>
  <v-row dense>
    <v-col v-for="card in cards" :cols="card.flex">...</v-col>
  </v-row>
</v-card>`,
  horizontal: `<v-card max-width="400" class="mx-auto">
  <v-system-bar color="pink darken-2" dark></v-system-bar>
  <v-app-bar dark color="pink">My Music</v-app-bar>
  <v-card color="#385F73" dark>Unlimited music now</v-card>
</v-card>`,
  custom: `<v-card class="mx-auto" max-width="344">
  <v-img src="sunshine.jpg" height="200px"></v-img>
  <v-card-actions>
    <v-btn icon @click="show = !show"><v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon></v-btn>
  </v-card-actions>
  <v-expand-transition><div v-show="show">...</div></v-expand-transition>
</v-card>`,
  twitter: `<v-card class="mx-auto" color="#26c6da" dark max-width="400">
  <v-card-title><v-icon large left>mdi-twitter</v-icon><span>Twitter</span></v-card-title>
</v-card>`,
  loading: `<v-card :loading="loading" class="mx-auto my-12" max-width="374">
  <v-img height="250" src="cooking.png"></v-img>
  <v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>...</v-chip-group>
  <v-btn color="deep-purple lighten-2" text @click="reserve">Reserve</v-btn>
</v-card>`,
  weather: `<v-card class="mx-auto" max-width="400">
  <v-list-item two-line>San Francisco</v-list-item>
  <v-slider v-model="time" :max="6" :tick-labels="labels" class="mx-4" ticks></v-slider>
</v-card>`,
  advanced: `<v-card max-width="344" class="mx-auto">
  <v-list-item>Our Changing Planet</v-list-item>
  <v-img src="mountain.jpg" height="194"></v-img>
</v-card>`,
};
