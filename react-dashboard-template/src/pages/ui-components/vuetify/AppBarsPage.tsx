import { createContext, useContext, useRef, useState, type MouseEvent, type ReactNode, type UIEvent } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Select,
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
  AccountCircle,
  Apps,
  Code,
  Dashboard,
  Delete,
  Favorite,
  GitHub,
  Home,
  InvertColors,
  Menu as MenuIcon,
  MoreVert,
  Search,
} from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const neuGlow = "-6px -6px 5px rgba(255,255,255,.86), 6px 6px 7px rgba(174,174,192,.28)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };

type UsageTab = "default";

interface AppBarExample {
  title: string;
  description: ReactNode;
  source: string;
  minHeight: number;
  render: (inverted: boolean) => ReactNode;
}

export default function AppBarsPage() {
  return (
    <DocPage
      title="AppBars"
      namespace="Components"
      icon={<Dashboard />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "AppBars" },
      ]}
    >
      <DocText>
        The <CodePill>v-app-bar</CodePill> component is pivotal to any graphical user interface (GUI), as it generally is the primary source of site navigation. The app-bar component works great in conjunction with a <a href="/components/navigation-drawers">v-navigation-drawer</a> for providing site navigation in your application.
      </DocText>
      <UsageSection />
      <ExamplesSection />
      <WarningAlert />
      <FunctionalSection />
    </DocPage>
  );
}

function UsageSection() {
  const [image, setImage] = useState(false);
  const [collapseOnScroll, setCollapseOnScroll] = useState(false);
  const [dense, setDense] = useState(false);
  const [flat, setFlat] = useState(false);
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [invertedScroll, setInvertedScroll] = useState(false);
  const [prominent, setProminent] = useState(false);
  const [color, setColor] = useState("primary");
  const [inverted, setInverted] = useState(false);
  const [tab, setTab] = useState<UsageTab>("default");
  const [scrollTop, setScrollTop] = useState(0);

  const scrolled = scrollTop > 28;
  const visible = invertedScroll ? scrolled : hideOnScroll ? scrollTop < 28 : true;
  const collapsed = collapseOnScroll && scrolled;

  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Usage
      </Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>
        The <CodePill>v-app-bar</CodePill> component is used for application-wide actions and information.
      </Typography>
      <Card variant="outlined" sx={{ bgcolor: "background.default", borderColor: "rgba(111,125,133,.18)", boxShadow: "none", overflow: "hidden", mb: 6 }}>
        <Grid container>
          <Grid item xs={12} md={9}>
            <Box sx={{ bgcolor: "rgba(111,125,133,.10)", borderBottom: "1px solid rgba(111,125,133,.14)" }}>
              <ToggleButtonGroup exclusive value={tab} onChange={(_, value: UsageTab | null) => value && setTab(value)} sx={usageTabsGroupSx}>
                <ToggleButton value="default">default</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box sx={{ height: 300, overflow: "hidden", bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "#fff" : "inherit", transition: "background-color 180ms ease, color 180ms ease" }}>
              <Box id="usage-example" sx={{ height: 300, overflowY: "auto", position: "relative" }} onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}>
                <DemoAppBar
                  title="Title"
                  color={color}
                  image={image}
                  dense={dense || collapsed}
                  prominent={prominent && !collapsed}
                  flat={flat || !scrollTop}
                  visible={visible}
                  dark
                  absolute
                  actions={<Search />}
                />
                <Box sx={{ height: 1000 }} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={3} sx={{ borderLeft: { md: "1px solid rgba(111,125,133,.14)" } }}>
            <Toolbar variant="dense" sx={{ bgcolor: "rgba(111,125,133,.10)", minHeight: 54, px: 2.25 }}>
              <Typography sx={{ fontSize: 20, fontWeight: 400 }}>Options</Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Tooltip title="Invert playground colors">
                <IconButton size="small" aria-label="Invert playground colors" onClick={() => setInverted((value) => !value)} sx={softIconButtonSx(inverted)}>
                  <InvertColors fontSize="small" />
                </IconButton>
              </Tooltip>
            </Toolbar>
            <Divider />
            <Stack spacing={1.25} sx={{ p: 2.25, maxHeight: 300, overflowY: "auto" }}>
              <FormControlLabel control={<Switch checked={image} onChange={(event) => setImage(event.target.checked)} sx={vuseSwitchSx} />} label="image" sx={switchLabelSx} />
              <FormControlLabel control={<Switch checked={collapseOnScroll} onChange={(event) => setCollapseOnScroll(event.target.checked)} sx={vuseSwitchSx} />} label="collapse-on-scroll" sx={switchLabelSx} />
              <FormControlLabel control={<Switch checked={dense} onChange={(event) => setDense(event.target.checked)} sx={vuseSwitchSx} />} label="dense" sx={switchLabelSx} />
              <FormControlLabel control={<Switch checked={flat} onChange={(event) => setFlat(event.target.checked)} sx={vuseSwitchSx} />} label="flat" sx={switchLabelSx} />
              <FormControlLabel control={<Switch checked={hideOnScroll} onChange={(event) => setHideOnScroll(event.target.checked)} sx={vuseSwitchSx} />} label="hide-on-scroll" sx={switchLabelSx} />
              <FormControlLabel control={<Switch checked={invertedScroll} onChange={(event) => setInvertedScroll(event.target.checked)} sx={vuseSwitchSx} />} label="inverted-scroll" sx={switchLabelSx} />
              <FormControlLabel control={<Switch checked={prominent} onChange={(event) => setProminent(event.target.checked)} sx={vuseSwitchSx} />} label="prominent" sx={switchLabelSx} />
              <Select value={color} onChange={(event) => setColor(event.target.value)} size="small" sx={vuseSelectSx}>
                {["primary", "orange", "yellow", "green", "blue", "purple"].map((item) => (
                  <MenuItem key={item} value={item}>{item}</MenuItem>
                ))}
              </Select>
            </Stack>
          </Grid>
        </Grid>
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
      <Grid container spacing={5.5}>
        {appBarExamples.map((example) => (
          <Grid item xs={12} key={example.title}>
            <VuetifyExampleBlock title={example.title} description={example.description} source={example.source} minHeight={example.minHeight}>
              {(inverted) => example.render(inverted)}
            </VuetifyExampleBlock>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function VuetifyExampleBlock({
  title,
  description,
  source,
  children,
  minHeight = 280,
}: {
  title: string;
  description: ReactNode;
  source: string;
  children: (inverted: boolean) => ReactNode;
  minHeight?: number;
}) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("template");
  const sourceSections = getSourceSections(source);
  const sectionNames = Object.keys(sourceSections);
  const activeSection = sourceSections[selectedSection] ? selectedSection : sectionNames[0];

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
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2" }}>
          <Stack direction="row" spacing={1} sx={{ p: 1, flexWrap: "wrap" }}>
            {sectionNames.map((section) => (
              <Button key={section} size="small" onClick={() => setSelectedSection(section)} sx={sourceTabSx(activeSection === section)}>
                {section}
              </Button>
            ))}
          </Stack>
          <Divider sx={{ borderColor: "rgba(255,255,255,.14)" }} />
          <Box sx={{ maxHeight: { xs: "none", sm: "calc(100vh - 275px)" }, overflowY: "auto", p: 2 }}>
            <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', 'SFMono-Regular', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap", color: "#f8f8f2" }}>
              {sourceSections[activeSection]}
            </Box>
          </Box>
        </Box>
      </Collapse>
      <Box sx={{ px: { xs: 3, md: 4 }, py: { xs: 3.5, md: 4.25 }, minHeight, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", transition: "background-color 180ms ease, color 180ms ease" }}>
        <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: 16.5, fontWeight: 300, lineHeight: 1.7, mb: 3 }}>
          {description}
        </Typography>
        {children(inverted)}
      </Box>
    </Card>
  );
}

function DenseExample() {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <DemoAppBar title="Page title" color="deep-purple accent-4" dense dark>
      <ToolbarIcon><Favorite /></ToolbarIcon>
      <ToolbarIcon><Search /></ToolbarIcon>
      <ToolbarIcon onClick={(event) => setAnchor(event.currentTarget)}><MoreVert /></ToolbarIcon>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
        {[1, 2, 3, 4, 5].map((n) => <MenuItem key={n} onClick={() => setAnchor(null)}>Option {n}</MenuItem>)}
      </Menu>
    </DemoAppBar>
  );
}

function ProminentExample() {
  const [scrollTop, setScrollTop] = useState(0);
  const frameRef = useRef<number | null>(null);
  const latestScrollRef = useRef(0);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    latestScrollRef.current = event.currentTarget.scrollTop;
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      setScrollTop(latestScrollRef.current);
    });
  };

  return (
    <Card sx={{ overflow: "hidden", position: "relative", bgcolor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,.16)" }}>
      <ProgressiveProminentAppBar scrollTop={scrollTop} />
      <Box id="scrolling-techniques" sx={{ maxHeight: 600, overflowY: "auto", position: "relative" }} onScroll={handleScroll}>
        <Box sx={{ height: 1000 }} />
      </Box>
    </Card>
  );
}

function ProgressiveProminentAppBar({ scrollTop }: { scrollTop: number }) {
  const originalHeight = 128;
  const minHeight = 56;
  const scrollThreshold = originalHeight - minHeight;
  const contentHeight = Math.max(minHeight, originalHeight - scrollTop * ((originalHeight - minHeight) / scrollThreshold));
  const titleFontSize = Number((1.5 - (originalHeight - contentHeight) * 0.00347).toFixed(2));
  const scrolled = scrollTop > 0;

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        height: contentHeight,
        color: "#fff",
        bgcolor: "#303f9f",
        overflow: "hidden",
        pointerEvents: "auto",
        boxShadow: "0 2px 4px -1px rgba(0,0,0,.20), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)",
        willChange: "height, font-size, padding-bottom",
      }}
    >
      <Toolbar disableGutters sx={{ minHeight: contentHeight, height: contentHeight, px: 2, py: 0.5, alignItems: "flex-start" }}>
        <ToolbarIcon><MenuIcon /></ToolbarIcon>
        <Typography
          sx={{
            alignSelf: "flex-end",
            ml: 1.25,
            pb: scrolled ? "9px" : "6px",
            fontSize: `${titleFontSize}rem`,
            fontWeight: 400,
            lineHeight: 1.5,
            whiteSpace: "nowrap",
          }}
        >
          Title
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <ToolbarIcon><Search /></ToolbarIcon>
        <ToolbarIcon><Favorite /></ToolbarIcon>
        <ToolbarIcon><MoreVert /></ToolbarIcon>
      </Toolbar>
    </Box>
  );
}

function ImageExample() {
  const [scrollTop, setScrollTop] = useState(0);
  const frameRef = useRef<number | null>(null);
  const latestScrollRef = useRef(0);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    latestScrollRef.current = event.currentTarget.scrollTop;
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      setScrollTop(latestScrollRef.current);
    });
  };

  return (
    <Card sx={{ overflow: "hidden", position: "relative", bgcolor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,.16)" }}>
      <ProgressiveImageAppBar scrollTop={scrollTop} />
      <Box id="scrolling-techniques-2" sx={{ maxHeight: 600, overflowY: "auto", position: "relative" }} onScroll={handleScroll}>
        <Box sx={{ height: 1000 }} />
      </Box>
    </Card>
  );
}

function ProgressiveImageAppBar({ scrollTop }: { scrollTop: number }) {
  const originalHeight = 128;
  const minHeight = 56;
  const scrollThreshold = originalHeight - minHeight;
  const contentHeight = Math.max(minHeight, originalHeight - scrollTop * ((originalHeight - minHeight) / scrollThreshold));
  const titleFontSize = Number((1.5 - (originalHeight - contentHeight) * 0.00347).toFixed(2));
  const scrolled = scrollTop > 0;

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        height: contentHeight,
        color: "#fff",
        bgcolor: "#fcb69f",
        overflow: "hidden",
        pointerEvents: "auto",
        boxShadow: "0 2px 4px -1px rgba(0,0,0,.20), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)",
        willChange: "height, font-size, padding-bottom",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)), url(https://picsum.photos/1920/1080?random)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Toolbar disableGutters sx={{ position: "relative", minHeight: contentHeight, height: contentHeight, px: 2, py: 0.5, alignItems: "flex-start" }}>
        <ToolbarIcon><MenuIcon /></ToolbarIcon>
        <Typography
          sx={{
            alignSelf: "flex-end",
            ml: 1.25,
            pb: scrolled ? "9px" : "6px",
            fontSize: `${titleFontSize}rem`,
            fontWeight: 400,
            lineHeight: 1.5,
            whiteSpace: "nowrap",
          }}
        >
          Title
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <ToolbarIcon><Search /></ToolbarIcon>
        <ToolbarIcon><Favorite /></ToolbarIcon>
        <ToolbarIcon><MoreVert /></ToolbarIcon>
      </Toolbar>
    </Box>
  );
}

function HideExample() {
  return <ScrollCard id="scrolling-techniques-4" height={1000}><ScrollAppBar color="teal lighten-3" prominent hide title="Title" /></ScrollCard>;
}

function CollapseExample() {
  const [collapseOnScroll, setCollapseOnScroll] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);
  const frameRef = useRef<number | null>(null);
  const latestScrollRef = useRef(0);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    latestScrollRef.current = event.currentTarget.scrollTop;
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      setScrollTop(latestScrollRef.current);
    });
  };

  return (
    <Card sx={{ overflow: "hidden", position: "relative", bgcolor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,.16)" }}>
      <ProgressiveCollapseAppBar scrollTop={scrollTop} collapseOnScroll={collapseOnScroll} onCollapseOnScrollChange={setCollapseOnScroll} />
      <Box id="scrolling-techniques-6" sx={{ maxHeight: 600, overflowY: "auto", position: "relative" }} onScroll={handleScroll}>
        <Box sx={{ height: 1000 }} />
      </Box>
    </Card>
  );
}

function ProgressiveCollapseAppBar({
  scrollTop,
  collapseOnScroll,
  onCollapseOnScrollChange,
}: {
  scrollTop: number;
  collapseOnScroll: boolean;
  onCollapseOnScrollChange: (value: boolean) => void;
}) {
  const collapsed = !collapseOnScroll || scrollTop > 0;

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 3,
        width: collapsed ? 112 : "100%",
        maxWidth: collapsed ? 112 : "100%",
        height: 64,
        color: "#fff",
        bgcolor: "#6200ea",
        overflow: "hidden",
        borderBottomRightRadius: collapsed ? 24 : 0,
        boxShadow: "0 2px 4px -1px rgba(0,0,0,.20), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)",
        transition: "width 250ms cubic-bezier(.4,0,.2,1), max-width 250ms cubic-bezier(.4,0,.2,1), border-radius 250ms cubic-bezier(.4,0,.2,1)",
        willChange: "width, max-width",
      }}
    >
      <Toolbar disableGutters sx={{ minHeight: 64, height: 64, px: 2, py: 0.5, width: collapsed ? 112 : "100%", overflow: "hidden" }}>
        <ToolbarIcon><MenuIcon /></ToolbarIcon>
        <Typography
          sx={{
            display: collapsed ? "none" : "block",
            ml: 1.25,
            fontSize: 20,
            fontWeight: 400,
            lineHeight: 1.5,
            whiteSpace: "nowrap",
          }}
        >
          Collapsing Bar
        </Typography>
        <Box sx={{ flexGrow: 1, minWidth: 0 }} />
        <Checkbox
          checked={collapseOnScroll}
          onChange={(event) => onCollapseOnScrollChange(event.target.checked)}
          sx={{
            flex: "0 0 auto",
            p: 1,
            color: "#fff",
            "&.Mui-checked": { color: "#fff" },
            "& .MuiSvgIcon-root": { fontSize: 24 },
          }}
        />
      </Toolbar>
    </Box>
  );
}

function ElevateOnScrollExample() {
  const [scrollTop, setScrollTop] = useState(0);
  const frameRef = useRef<number | null>(null);
  const latestScrollRef = useRef(0);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    latestScrollRef.current = event.currentTarget.scrollTop;
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      setScrollTop(latestScrollRef.current);
    });
  };

  return (
    <Card sx={{ overflow: "hidden", position: "relative", bgcolor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,.16)" }}>
      <ElevatingAppBar elevated={scrollTop > 0} />
      <Box id="scrolling-techniques-7" sx={{ maxHeight: 600, overflowY: "auto", position: "relative" }} onScroll={handleScroll}>
        <Box sx={{ height: 1500 }} />
      </Box>
    </Card>
  );
}

function ElevatingAppBar({ elevated }: { elevated: boolean }) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        height: 64,
        color: "rgba(0,0,0,.87)",
        bgcolor: "#fff",
        overflow: "hidden",
        pointerEvents: "auto",
        boxShadow: elevated ? "0 2px 4px -1px rgba(0,0,0,.20), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)" : "none",
        transition: "box-shadow 280ms cubic-bezier(.4,0,.2,1)",
        willChange: "box-shadow",
      }}
    >
      <Toolbar disableGutters sx={{ minHeight: 64, height: 64, px: 2, py: 0.5 }}>
        <ToolbarIcon><MenuIcon /></ToolbarIcon>
        <Typography sx={{ ml: 1.25, fontSize: 20, fontWeight: 400, lineHeight: 1.5, whiteSpace: "nowrap" }}>
          Title
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <ToolbarIcon><Search /></ToolbarIcon>
        <ToolbarIcon><Favorite /></ToolbarIcon>
        <ToolbarIcon><MoreVert /></ToolbarIcon>
      </Toolbar>
    </Box>
  );
}

function InvertedScrollExample() {
  const [scrollTop, setScrollTop] = useState(0);
  const frameRef = useRef<number | null>(null);
  const latestScrollRef = useRef(0);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    latestScrollRef.current = event.currentTarget.scrollTop;
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      setScrollTop(latestScrollRef.current);
    });
  };

  return (
    <Card sx={{ overflow: "hidden", position: "relative", bgcolor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,.16)" }}>
      <InvertedAppBar active={scrollTop > 8} />
      <Box id="scrolling-techniques-8" sx={{ maxHeight: 600, overflowY: "auto", position: "relative" }} onScroll={handleScroll}>
        <Box sx={{ height: 1500 }} />
      </Box>
    </Card>
  );
}

function InvertedAppBar({ active }: { active: boolean }) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        height: 64,
        color: "#fff",
        bgcolor: "#00838f",
        overflow: "hidden",
        pointerEvents: active ? "auto" : "none",
        transform: active ? "translateY(0)" : "translateY(-64px)",
        boxShadow: active ? "0 2px 4px -1px rgba(0,0,0,.20), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)" : "none",
        transition: "transform 200ms cubic-bezier(.4,0,.2,1), box-shadow 280ms cubic-bezier(.4,0,.2,1)",
        willChange: "transform, box-shadow",
      }}
    >
      <Toolbar disableGutters sx={{ minHeight: 64, height: 64, px: 2, py: 0.5 }}>
        <ToolbarIcon><MenuIcon /></ToolbarIcon>
        <Typography sx={{ ml: 1.25, fontSize: 20, fontWeight: 400, lineHeight: 1.5, whiteSpace: "nowrap" }}>
          Title
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <ToolbarIcon><Search /></ToolbarIcon>
        <ToolbarIcon><Favorite /></ToolbarIcon>
        <ToolbarIcon><MoreVert /></ToolbarIcon>
      </Toolbar>
    </Box>
  );
}

function AppBarNavExample() {
  const [drawer, setDrawer] = useState(false);
  const [group, setGroup] = useState("");
  const navItems = [{ id: "home", icon: <Home />, label: "Home" }, { id: "account", icon: <AccountCircle />, label: "Account" }];

  return (
    <Card sx={{ height: 400, overflow: "hidden", position: "relative", bgcolor: "#fff", mx: "auto" }}>
      <DemoAppBar title="Title" color="deep-purple" dark navAction={() => setDrawer(true)} />
      {drawer ? (
        <Box
          aria-hidden
          onClick={() => setDrawer(false)}
          sx={{ position: "absolute", inset: 0, zIndex: 6, bgcolor: "rgba(33,33,33,.46)" }}
        />
      ) : null}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 7,
          width: 256,
          bgcolor: "#fff",
          boxShadow: drawer ? "0 8px 10px -5px rgba(0,0,0,.20), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12)" : "none",
          transform: drawer ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 280ms cubic-bezier(.4,0,.2,1), box-shadow 280ms cubic-bezier(.4,0,.2,1)",
          visibility: drawer ? "visible" : "hidden",
          willChange: "transform",
        }}
      >
        <Stack sx={{ py: 1, px: 1 }}>
          {navItems.map((item) => {
            const active = group === item.id;
            return (
              <Button
                key={item.id}
                onClick={() => setGroup(item.id)}
                startIcon={item.icon}
                sx={{
                  justifyContent: "flex-start",
                  minHeight: 40,
                  mb: item.id === "home" ? 0.5 : 0,
                  px: 1,
                  color: active ? "#6200ea" : "rgba(0,0,0,.87)",
                  bgcolor: "transparent",
                  borderRadius: 1,
                  textTransform: "none",
                  fontSize: 13,
                  fontWeight: 500,
                  "& .MuiButton-startIcon": { mr: 4, ml: 0, minWidth: 24, color: "inherit", "& svg": { fontSize: 24 } },
                  "&:hover": { bgcolor: "rgba(0,0,0,.04)" },
                  "&:active": { bgcolor: "rgba(0,0,0,.08)" },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Stack>
      </Box>
    </Card>
  );
}

function ScrollThresholdExample() {
  const [scrollTop, setScrollTop] = useState(0);
  const frameRef = useRef<number | null>(null);
  const latestScrollRef = useRef(0);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    latestScrollRef.current = event.currentTarget.scrollTop;
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      setScrollTop(latestScrollRef.current);
    });
  };

  return (
    <Card sx={{ overflow: "hidden", position: "relative", bgcolor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,.16)" }}>
      <ThresholdImageAppBar scrollTop={scrollTop} />
      <Box id="scrolling-techniques-5" sx={{ maxHeight: 600, overflowY: "auto", position: "relative" }} onScroll={handleScroll}>
        <Box sx={{ height: 1500 }} />
      </Box>
    </Card>
  );
}

function ThresholdImageAppBar({ scrollTop }: { scrollTop: number }) {
  const originalHeight = 128;
  const minHeight = 56;
  const scrollThreshold = 500;
  const contentHeight = Math.max(minHeight, originalHeight - scrollTop * ((originalHeight - minHeight) / scrollThreshold));
  const titleFontSize = Number((1.5 - (originalHeight - contentHeight) * 0.00347).toFixed(2));
  const imageOpacity = Number(Math.max((scrollThreshold - scrollTop) / scrollThreshold, 0).toFixed(2));
  const scrolled = scrollTop > 0;

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        height: contentHeight,
        color: "#fff",
        bgcolor: "#43a047",
        overflow: "hidden",
        pointerEvents: "auto",
        boxShadow: "0 2px 4px -1px rgba(0,0,0,.20), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)",
        willChange: "height, font-size, padding-bottom",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: imageOpacity,
          backgroundImage: "linear-gradient(to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)), url(https://picsum.photos/1920/1080?random)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "opacity .4s cubic-bezier(.4,0,.2,1)",
          willChange: "opacity",
        }}
      />
      <Toolbar disableGutters sx={{ position: "relative", minHeight: contentHeight, height: contentHeight, px: 2, py: 0.5, alignItems: "flex-start" }}>
        <ToolbarIcon><MenuIcon /></ToolbarIcon>
        <Typography
          sx={{
            alignSelf: "flex-end",
            ml: 1.25,
            pb: scrolled ? "9px" : "6px",
            fontSize: `${titleFontSize}rem`,
            fontWeight: 400,
            lineHeight: 1.5,
            whiteSpace: "nowrap",
          }}
        >
          Title
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <ToolbarIcon><Search /></ToolbarIcon>
        <ToolbarIcon><Favorite /></ToolbarIcon>
        <ToolbarIcon><MoreVert /></ToolbarIcon>
      </Toolbar>
    </Box>
  );
}

function ImgFadeExample() {
  const [scrollTop, setScrollTop] = useState(0);
  const frameRef = useRef<number | null>(null);
  const latestScrollRef = useRef(0);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    latestScrollRef.current = event.currentTarget.scrollTop;
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      setScrollTop(latestScrollRef.current);
    });
  };

  return (
    <Card sx={{ overflow: "hidden", position: "relative", bgcolor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,.16)" }}>
      <ImageFadeAppBar scrollTop={scrollTop} />
      <Box id="scrolling-techniques-3" sx={{ maxHeight: 600, overflowY: "auto", position: "relative" }} onScroll={handleScroll}>
        <Box sx={{ height: 1000 }} />
      </Box>
    </Card>
  );
}

function ImageFadeAppBar({ scrollTop }: { scrollTop: number }) {
  const originalContentHeight = 128;
  const minContentHeight = 56;
  const extensionHeight = 48;
  const scrollThreshold = originalContentHeight + extensionHeight - minContentHeight;
  const contentHeight = Math.max(minContentHeight, originalContentHeight - scrollTop * ((originalContentHeight - minContentHeight) / scrollThreshold));
  const appBarHeight = contentHeight + extensionHeight;
  const titleFontSize = Number((1.5 - (originalContentHeight - contentHeight) * 0.00347).toFixed(2));
  const imageOpacity = Number(Math.max((scrollThreshold - scrollTop) / scrollThreshold, 0).toFixed(2));
  const scrolled = scrollTop > 0;

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        height: appBarHeight,
        color: "#fff",
        bgcolor: "#6A76AB",
        overflow: "hidden",
        pointerEvents: "auto",
        boxShadow: "0 2px 4px -1px rgba(0,0,0,.20), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)",
        willChange: "height, font-size, padding-bottom",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: imageOpacity,
          backgroundImage: "linear-gradient(to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)), url(https://picsum.photos/1920/1080?random)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "opacity .4s cubic-bezier(.4,0,.2,1)",
          willChange: "opacity",
        }}
      />
      <Toolbar disableGutters sx={{ position: "relative", minHeight: contentHeight, height: contentHeight, px: 2, py: 0.5, alignItems: "flex-start" }}>
        <ToolbarIcon><MenuIcon /></ToolbarIcon>
        <Typography
          sx={{
            alignSelf: "flex-end",
            ml: 1.25,
            pb: scrolled ? "9px" : "6px",
            fontSize: `${titleFontSize}rem`,
            fontWeight: 400,
            lineHeight: 1.5,
            whiteSpace: "nowrap",
          }}
        >
          Title
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <ToolbarIcon><Search /></ToolbarIcon>
        <ToolbarIcon><Favorite /></ToolbarIcon>
        <ToolbarIcon><MoreVert /></ToolbarIcon>
      </Toolbar>
      <Stack direction="row" sx={{ position: "relative", height: extensionHeight, pl: 9.2, borderTop: "1px solid rgba(255,255,255,.18)" }}>
        {["Tab 1", "Tab 2", "Tab 3"].map((tab) => <Button key={tab} sx={{ color: "inherit", minHeight: extensionHeight, borderRadius: 0 }}>{tab}</Button>)}
      </Stack>
    </Box>
  );
}

function MenuExample() {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const frameRef = useRef<number | null>(null);
  const latestScrollRef = useRef(0);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    latestScrollRef.current = event.currentTarget.scrollTop;
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      setScrollTop(latestScrollRef.current);
    });
  };

  return (
    <Card sx={{ overflow: "hidden", position: "relative", bgcolor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,.16)" }}>
      <MenuImageAppBar scrollTop={scrollTop} onMenuOpen={(event) => setAnchor(event.currentTarget)} />
      <Box id="scrolling-techniques-4" sx={{ maxHeight: 600, overflowY: "auto", position: "relative" }} onScroll={handleScroll}>
        <Box sx={{ height: 1000 }} />
      </Box>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 0.5,
            minWidth: 126,
            borderRadius: 1,
            boxShadow: "0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)",
            "& .MuiList-root": { py: 1 },
            "& .MuiMenuItem-root": {
              minHeight: 48,
              px: 2,
              fontSize: 16,
              color: "rgba(0,0,0,.87)",
              "&:hover": { bgcolor: "rgba(0,0,0,.04)" },
              "&:active": { bgcolor: "rgba(0,0,0,.08)" },
            },
          },
        }}
      >
        {["Click Me", "Click Me", "Click Me", "Click Me 2"].map((item, index) => <MenuItem key={`${item}-${index}`} onClick={() => setAnchor(null)}>{item}</MenuItem>)}
      </Menu>
    </Card>
  );
}

function MenuImageAppBar({ scrollTop, onMenuOpen }: { scrollTop: number; onMenuOpen: (event: MouseEvent<HTMLButtonElement>) => void }) {
  const originalContentHeight = 128;
  const minContentHeight = 56;
  const extensionHeight = 48;
  const scrollThreshold = originalContentHeight + extensionHeight - minContentHeight;
  const contentHeight = Math.max(minContentHeight, originalContentHeight - scrollTop * ((originalContentHeight - minContentHeight) / scrollThreshold));
  const appBarHeight = contentHeight + extensionHeight;
  const titleFontSize = Number((1.5 - (originalContentHeight - contentHeight) * 0.00347).toFixed(2));
  const imageOpacity = Number(Math.max((scrollThreshold - scrollTop) / scrollThreshold, 0).toFixed(2));
  const scrolled = scrollTop > 0;

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        height: appBarHeight,
        color: "#fff",
        bgcolor: "#6A76AB",
        overflow: "hidden",
        pointerEvents: "auto",
        boxShadow: "0 2px 4px -1px rgba(0,0,0,.20), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)",
        willChange: "height, font-size, padding-bottom",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: imageOpacity,
          backgroundImage: "linear-gradient(to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)), url(https://picsum.photos/1920/1080?random)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "opacity .4s cubic-bezier(.4,0,.2,1)",
          willChange: "opacity",
        }}
      />
      <Toolbar disableGutters sx={{ position: "relative", minHeight: contentHeight, height: contentHeight, px: 2, py: 0.5, alignItems: "flex-start" }}>
        <ToolbarIcon><MenuIcon /></ToolbarIcon>
        <Typography
          sx={{
            alignSelf: "flex-end",
            ml: 1.25,
            pb: scrolled ? "9px" : "6px",
            fontSize: `${titleFontSize}rem`,
            fontWeight: 400,
            lineHeight: 1.5,
            whiteSpace: "nowrap",
          }}
        >
          Title
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <ToolbarIcon><Search /></ToolbarIcon>
        <ToolbarIcon><Favorite /></ToolbarIcon>
        <ToolbarIcon color="#ffeb3b" onClick={onMenuOpen}><MoreVert /></ToolbarIcon>
      </Toolbar>
      <Stack direction="row" sx={{ position: "relative", height: extensionHeight, pl: 9.2, borderTop: "1px solid rgba(255,255,255,.18)" }}>
        {["Tab 1", "Tab 2", "Tab 3"].map((tab) => <Button key={tab} sx={{ color: "inherit", minHeight: extensionHeight, borderRadius: 0 }}>{tab}</Button>)}
      </Stack>
    </Box>
  );
}

function ScrollCard({ children, height, id }: { children: ReactNode; height: number; id: string }) {
  const [scrollTop, setScrollTop] = useState(0);
  return (
    <Card sx={{ overflow: "hidden", position: "relative", bgcolor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,.16)" }}>
      <Box id={id} sx={{ maxHeight: 600, overflowY: "auto", position: "relative" }} onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}>
        <ScrollTopContext.Provider value={scrollTop}>{children}</ScrollTopContext.Provider>
        <Box sx={{ height }} />
      </Box>
    </Card>
  );
}

const ScrollTopContext = createContext(0);

function ScrollAppBar({
  color,
  title,
  prominent = false,
  shrink = false,
  image = false,
  hide = false,
  collapse = false,
  collapseOnScroll = false,
  elevate = false,
  inverted = false,
  fade = false,
  threshold = 0,
  dark = true,
  extension = false,
  extra,
  menuButton,
}: {
  color: string;
  title: string;
  prominent?: boolean;
  shrink?: boolean;
  image?: boolean;
  hide?: boolean;
  collapse?: boolean;
  collapseOnScroll?: boolean;
  elevate?: boolean;
  inverted?: boolean;
  fade?: boolean;
  threshold?: number;
  dark?: boolean;
  extension?: boolean;
  extra?: ReactNode;
  menuButton?: ReactNode;
}) {
  const scrollTop = useContext(ScrollTopContext);

  return (
    <Box>
      <DemoAppBar
        title={title}
        color={color}
        dark={dark}
        image={image}
        prominent={prominent && !(shrink && scrollTop > threshold)}
        dense={shrink && scrollTop > threshold}
        visible={inverted ? scrollTop > threshold : hide ? scrollTop < 20 : true}
        collapsed={collapse || (collapseOnScroll && scrollTop > 20)}
        flat={elevate ? scrollTop === 0 : false}
        absolute
        fadeImage={fade ? Math.max(0.2, 1 - scrollTop / 420) : 1}
        extension={extension}
        extra={extra}
        menuButton={menuButton}
      />
    </Box>
  );
}

function DemoAppBar({
  title,
  color,
  image = false,
  dense = false,
  prominent = false,
  flat = false,
  visible = true,
  collapsed = false,
  dark = true,
  absolute = false,
  fadeImage = 1,
  extension = false,
  actions,
  extra,
  children,
  menuButton,
  navAction,
}: {
  title: string;
  color: string;
  image?: boolean;
  dense?: boolean;
  prominent?: boolean;
  flat?: boolean;
  visible?: boolean;
  collapsed?: boolean;
  dark?: boolean;
  absolute?: boolean;
  fadeImage?: number;
  extension?: boolean;
  actions?: ReactNode;
  extra?: ReactNode;
  children?: ReactNode;
  menuButton?: ReactNode;
  navAction?: () => void;
}) {
  const bg = resolveBarColor(color);
  const height = collapsed ? 56 : prominent ? 128 : dense ? 48 : 64;
  const width = collapsed ? 72 : "100%";

  return (
    <Box
      sx={{
        position: absolute ? "sticky" : "relative",
        top: 0,
        zIndex: 3,
        width,
        minHeight: extension ? height + 48 : height,
        color: dark ? "#fff" : "rgba(0,0,0,.87)",
        bgcolor: image ? bg : bg,
        overflow: "hidden",
        transform: visible ? "translateY(0)" : "translateY(-110%)",
        transition: "height 220ms ease, min-height 220ms ease, width 220ms ease, transform 220ms ease, box-shadow 180ms ease",
        boxShadow: flat ? "none" : "0 2px 4px rgba(0,0,0,.20)",
      }}
    >
      {image ? <Box sx={{ position: "absolute", inset: 0, opacity: fadeImage, backgroundImage: `linear-gradient(to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)), url(https://picsum.photos/1920/1080?random)`, backgroundSize: "cover", backgroundPosition: "center", transition: "opacity 180ms ease" }} /> : null}
      <Toolbar disableGutters sx={{ position: "relative", minHeight: height, height, px: 1.5, alignItems: prominent ? "flex-end" : "center", pb: prominent ? 1.2 : 0 }}>
        <ToolbarIcon onClick={navAction}><MenuIcon /></ToolbarIcon>
        {!collapsed ? <Typography sx={{ fontSize: 20, fontWeight: 400, ml: 1.25, whiteSpace: "nowrap" }}>{title}</Typography> : null}
        {!collapsed ? <Box sx={{ flexGrow: 1 }} /> : null}
        {!collapsed ? children || (
          <>
            {actions ? <ToolbarIcon>{actions}</ToolbarIcon> : <ToolbarIcon><Search /></ToolbarIcon>}
            <ToolbarIcon><Favorite /></ToolbarIcon>
            {menuButton || <ToolbarIcon><MoreVert /></ToolbarIcon>}
            {extra}
          </>
        ) : extra}
      </Toolbar>
      {extension && !collapsed ? (
        <Stack direction="row" sx={{ position: "relative", height: 48, pl: 9.2, borderTop: "1px solid rgba(255,255,255,.18)" }}>
          {["Tab 1", "Tab 2", "Tab 3"].map((tab) => <Button key={tab} sx={{ color: "inherit", minHeight: 48, borderRadius: 0 }}>{tab}</Button>)}
        </Stack>
      ) : null}
    </Box>
  );
}

function ToolbarIcon({ children, onClick, color }: { children: ReactNode; onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; color?: string }) {
  return (
    <IconButton onClick={onClick} sx={{ width: 48, height: 48, color: color || "inherit", "&:hover": { bgcolor: "rgba(255,255,255,.12)" }, "&:active": { bgcolor: "rgba(255,255,255,.18)", transform: "scale(.96)" } }}>
      {children}
    </IconButton>
  );
}

function WarningAlert() {
  return (
    <Box sx={{ my: 5, px: 3, py: 2.5, borderLeft: "4px solid #fb8c00", bgcolor: "rgba(251,140,0,.10)", borderRadius: 1, color: "text.secondary", fontSize: 16, lineHeight: 1.7 }}>
      When <CodePill>{"<v-btn>"}</CodePill>s with the <strong>icon</strong> prop are used inside of <CodePill>v-toolbar</CodePill> and <CodePill>v-app-bar</CodePill> they will automatically have their size increased and negative margin applied to ensure proper spacing according to the Material Design Specification.
    </Box>
  );
}

function FunctionalSection() {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Functional
      </Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>
        <CodePill>v-app-bar-nav-icon</CodePill>: A styled icon button component created specifically for use with <a href="/components/toolbars">v-toolbar</a> and <CodePill>v-app-bar</CodePill>. Typically seen on the left side of a toolbar as a hamburger menu, it is often used to control the state of a navigation drawer. The <CodePill>default</CodePill> slot can be used to customize the icon and function of this component.
      </Typography>
    </Box>
  );
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: 0.55, py: 0.15, borderRadius: 0.75, bgcolor: "rgba(255,82,82,.10)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "0.88em" }}>{children}</Box>;
}

const appBarExamples: AppBarExample[] = [
  { title: "Dense", description: "You can make app-bar dense. A dense app bar has lower height than regular one", source: "app-bars/simple/dense", minHeight: 120, render: () => <DenseExample /> },
  { title: "Prominent w/ scroll shrink", description: <><CodePill>v-app-bar</CodePill> with the <CodePill>prominent</CodePill> prop can opt to have its height shrunk as the user scrolls down.</>, source: "app-bars/simple/prominent", minHeight: 650, render: () => <ProminentExample /> },
  { title: "Prominent w/ scroll shrink and image", description: <><CodePill>v-app-bar</CodePill> can contain background images. You can set source via the <CodePill>src</CodePill> prop.</>, source: "app-bars/simple/img", minHeight: 650, render: () => <ImageExample /> },
  { title: "Hiding on scroll", description: <><CodePill>v-app-bar</CodePill> can be hidden on scroll. Use the <CodePill>hide-on-scroll</CodePill> property for this.</>, source: "app-bars/simple/hide", minHeight: 650, render: () => <HideExample /> },
  { title: "Collapsible bars", description: "With the collapse and collapse-on-scroll props you can easily control the state of toolbar that the user interacts with.", source: "app-bars/simple/collapse", minHeight: 650, render: () => <CollapseExample /> },
  { title: "Elevate bar on scroll", description: "When using the elevate-on-scroll prop, the app bar rests at an elevation of 0dp until the user begins to scroll down. Once scrolling, the bar raises to 4dp.", source: "app-bars/simple/elevate-on-scroll", minHeight: 650, render: () => <ElevateOnScrollExample /> },
  { title: "Inverted scrolling", description: "When using the inverted-scroll property, the bar will hide until the user scrolls past the designated threshold.", source: "app-bars/simple/inverted-scroll", minHeight: 650, render: () => <InvertedScrollExample /> },
  { title: "Toggle Navigation Drawers", description: <><CodePill>v-app-bar-nav-icon</CodePill> can toggle the state of other components such as a navigation drawer.</>, source: "app-bars/intermediate/app-bar-nav", minHeight: 460, render: () => <AppBarNavExample /> },
  { title: "Scroll threshold", description: "The app bar starts reacting to scroll only after the scroll-threshold amount of pixels.", source: "app-bars/intermediate/scroll-threshold", minHeight: 650, render: () => <ScrollThresholdExample /> },
  { title: "Prominent w/ scroll shrink and image, fading on scroll", description: "The background image of an app bar can fade on scroll. Use the fade-img-on-scroll property for this.", source: "app-bars/complex/img-fade", minHeight: 650, render: () => <ImgFadeExample /> },
  { title: "With menu", description: "You can easily extend the functionality of app bar by adding VMenu there. Click on last icon to see it in action.", source: "app-bars/complex/menu", minHeight: 650, render: () => <MenuExample /> },
];

const switchLabelSx = { m: 0, minHeight: 42, "& .MuiFormControlLabel-label": { fontSize: 15, color: "text.secondary", textTransform: "capitalize" } };

const vuseSwitchSx = {
  width: 48,
  height: 30,
  p: 0.5,
  "& .MuiSwitch-switchBase": { p: 0.75, transitionDuration: "140ms", "&.Mui-checked": { transform: "translateX(18px)", color: "#fff", "& + .MuiSwitch-track": { bgcolor: "#00838f", opacity: 1 } } },
  "& .MuiSwitch-thumb": { width: 18, height: 18, boxShadow: neuGlow },
  "& .MuiSwitch-track": { borderRadius: 999, bgcolor: "rgba(111,125,133,.26)", opacity: 1, boxShadow: "inset 1px 1px 3px rgba(174,174,192,.34)" },
};

const vuseSelectSx = { minHeight: 42, fontSize: 14, bgcolor: "#fff", boxShadow: neuGlow, borderRadius: 1, "& fieldset": { borderColor: "transparent" } };

const usageTabsGroupSx = {
  pl: { xs: 0, md: 3 },
  "& .MuiToggleButton-root": {
    minHeight: 54,
    px: 2.4,
    color: "text.secondary",
    bgcolor: "transparent",
    boxShadow: "none",
    borderRadius: 0,
    fontSize: 15,
    fontWeight: 500,
    textTransform: "none",
    "&:hover": { bgcolor: "rgba(0,131,143,.06)", color: "primary.main" },
    "&.Mui-selected": { color: "primary.main", boxShadow: "inset 0 -2px 0 #00838f", bgcolor: "rgba(0,131,143,.04)" },
  },
};

function exampleIconSx(active: boolean) {
  return { width: 28, height: 28, color: active ? "primary.main" : "text.secondary", mx: 0.1, bgcolor: "transparent", opacity: active ? 0.72 : 0.48, "&:hover": { bgcolor: "rgba(0,131,143,.08)", color: "primary.main", opacity: 0.82 }, "&:active": { transform: "scale(.94)", bgcolor: "rgba(0,131,143,.14)", opacity: 1 } };
}

function softIconButtonSx(active: boolean) {
  return { width: 36, height: 36, color: active ? "primary.main" : "text.secondary", bgcolor: "transparent", opacity: active ? 0.86 : 0.72, "&:hover": { bgcolor: "rgba(0,131,143,.08)", color: "primary.main", opacity: 1 } };
}

function sourceTabSx(active: boolean) {
  return { minHeight: 32, px: 1.75, borderRadius: 999, color: active ? "#fff" : "rgba(255,255,255,.78)", bgcolor: active ? "rgba(255,255,255,.16)" : "transparent", "&:hover": { bgcolor: active ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.08)" } };
}

function resolveBarColor(color: string) {
  const map: Record<string, string> = {
    primary: "#00838f",
    orange: "#fb8c00",
    yellow: "#fdd835",
    green: "#43a047",
    blue: "#1e88e5",
    purple: "#8e24aa",
    "deep-purple": "#673ab7",
    "deep-purple accent-4": "#6200ea",
    "indigo darken-2": "#303f9f",
    "teal lighten-3": "#80cbc4",
    white: "#fff",
  };
  return map[color] || color;
}

function getSourceSections(source: string): Record<string, string> {
  const template = sourceTemplates[source] || "<template>\n  <v-app-bar>Title</v-app-bar>\n</template>";
  const sections: Record<string, string> = { template };
  if (source.includes("collapse")) sections.script = "<script>\n  export default { data: () => ({ collapseOnScroll: true }) }\n</script>";
  if (source.includes("app-bar-nav")) sections.script = "<script>\n  export default { data: () => ({ drawer: false, group: '' }) }\n</script>";
  if (source.includes("menu")) sections.script = "<script>\n  export default { data: () => ({ items: [{ title: 'Click Me' }, { title: 'Click Me 2' }] }) }\n</script>";
  return sections;
}

const sourceTemplates: Record<string, string> = {
  "app-bars/simple/dense": `<template>
  <v-app-bar color="deep-purple accent-4" dense dark>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>Page title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>
    <v-btn icon><v-icon>mdi-magnify</v-icon></v-btn>
    <v-menu left bottom>...</v-menu>
  </v-app-bar>
</template>`,
  "app-bars/simple/prominent": `<template>
  <v-app-bar absolute color="indigo darken-2" dark shrink-on-scroll prominent scroll-target="#scrolling-techniques">...</v-app-bar>
</template>`,
  "app-bars/simple/img": `<template>
  <v-app-bar absolute color="#fcb69f" dark shrink-on-scroll src="https://picsum.photos/1920/1080?random" scroll-target="#scrolling-techniques-2">...</v-app-bar>
</template>`,
  "app-bars/simple/hide": `<template>
  <v-app-bar absolute color="teal lighten-3" dark hide-on-scroll prominent scroll-target="#scrolling-techniques-4">...</v-app-bar>
</template>`,
  "app-bars/simple/collapse": `<template>
  <v-app-bar :collapse="!collapseOnScroll" :collapse-on-scroll="collapseOnScroll" absolute color="deep-purple accent-4" dark scroll-target="#scrolling-techniques-6">...</v-app-bar>
</template>`,
  "app-bars/simple/elevate-on-scroll": `<template>
  <v-app-bar absolute color="white" elevate-on-scroll scroll-target="#scrolling-techniques-7">...</v-app-bar>
</template>`,
  "app-bars/simple/inverted-scroll": `<template>
  <v-app-bar absolute color="primary" dark inverted-scroll scroll-target="#scrolling-techniques-8">...</v-app-bar>
</template>`,
  "app-bars/intermediate/app-bar-nav": `<template>
  <v-card height="400"><v-app-bar color="deep-purple" dark><v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon></v-app-bar><v-navigation-drawer v-model="drawer" absolute temporary>...</v-navigation-drawer></v-card>
</template>`,
  "app-bars/intermediate/scroll-threshold": `<template>
  <v-app-bar absolute color="#43a047" dark shrink-on-scroll prominent src="https://picsum.photos/1920/1080?random" fade-img-on-scroll scroll-target="#scrolling-techniques-5" scroll-threshold="500">...</v-app-bar>
</template>`,
  "app-bars/complex/img-fade": `<template>
  <v-app-bar absolute color="#6A76AB" dark shrink-on-scroll prominent src="https://picsum.photos/1920/1080?random" fade-img-on-scroll scroll-target="#scrolling-techniques-3"><template v-slot:extension><v-tabs align-with-title>...</v-tabs></template></v-app-bar>
</template>`,
  "app-bars/complex/menu": `<template>
  <v-app-bar absolute color="#6A76AB" dark shrink-on-scroll prominent src="https://picsum.photos/1920/1080?random" fade-img-on-scroll scroll-target="#scrolling-techniques-4"><v-menu bottom left>...</v-menu></v-app-bar>
</template>`,
};
