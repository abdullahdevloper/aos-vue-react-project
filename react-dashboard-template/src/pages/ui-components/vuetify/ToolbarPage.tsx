import { useState, type MouseEvent, type ReactNode } from "react";
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
  InputAdornment,
  MenuItem,
  Select,
  Slider,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AddCircle,
  Apps,
  ArrowBack,
  Close,
  Code,
  Dashboard,
  Delete,
  Favorite,
  FileUpload,
  GitHub,
  InvertColors,
  Menu as MenuIcon,
  MoreVert,
  MyLocation,
  Reply,
  Search,
} from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const neuGlow = "-6px -6px 5px rgba(255,255,255,.86), 6px 6px 7px rgba(174,174,192,.28)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };

type UsageTab = "default";

interface ToolbarExample {
  title: string;
  description: ReactNode;
  source: string;
  minHeight: number;
  render: (inverted: boolean) => ReactNode;
}

export default function ToolbarPage() {
  return (
    <DocPage
      title="Toolbars"
      namespace="Components"
      icon={<Dashboard />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Toolbar" },
      ]}
    >
      <DocText>
        The <CodePill>v-toolbar</CodePill> component is pivotal to any gui, as it generally is the primary source of site navigation. The toolbar component works great in conjunction with <a href="/components/navigation-drawers">v-navigation-drawer</a> and <a href="/components/cards">v-card</a>.
      </DocText>
      <UsageSection />
      <ExamplesSection />
      <WarningAlert />
    </DocPage>
  );
}

function UsageSection() {
  const [image, setImage] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [dense, setDense] = useState(false);
  const [extended, setExtended] = useState(false);
  const [flat, setFlat] = useState(false);
  const [prominent, setProminent] = useState(false);
  const [short, setShort] = useState(false);
  const [elevation, setElevation] = useState(2);
  const [color, setColor] = useState("primary");
  const [inverted, setInverted] = useState(false);
  const [tab, setTab] = useState<UsageTab>("default");

  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Usage
      </Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>
        A toolbar is a flexible container that can be used in a number of ways. By default, the toolbar is 64px high on desktop and 56px high on mobile. There are a number of helper components available to use with the toolbar. The <CodePill>v-toolbar-title</CodePill> is used for displaying a title and <CodePill>v-toolbar-items</CodePill> allow <a href="/components/buttons">v-btn</a> to extend full height.
      </Typography>
      <Card variant="outlined" sx={{ bgcolor: "background.default", borderColor: "rgba(111,125,133,.18)", boxShadow: "none", overflow: "hidden", mb: 6 }}>
        <Grid container>
          <Grid item xs={12} md={9}>
            <Box sx={{ bgcolor: "rgba(111,125,133,.10)", borderBottom: "1px solid rgba(111,125,133,.14)" }}>
              <ToggleButtonGroup exclusive value={tab} onChange={(_, value: UsageTab | null) => value && setTab(value)} sx={usageTabsGroupSx}>
                <ToggleButton value="default">default</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box sx={{ minHeight: 300, p: 3, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "#fff" : "inherit", transition: "background-color 180ms ease, color 180ms ease" }}>
              <VToolbar
                title="Title"
                color={color}
                dark={image || inverted || isDarkToolbarColor(color)}
                image={image}
                collapse={collapse}
                dense={dense}
                extended={extended}
                flat={flat}
                prominent={prominent}
                short={short}
                elevation={elevation}
                usageActions
              />
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
              <FormControlLabel control={<Switch checked={collapse} onChange={(event) => setCollapse(event.target.checked)} sx={vuseSwitchSx} />} label="collapse" sx={switchLabelSx} />
              <FormControlLabel control={<Switch checked={dense} onChange={(event) => setDense(event.target.checked)} sx={vuseSwitchSx} />} label="dense" sx={switchLabelSx} />
              <FormControlLabel control={<Switch checked={extended} onChange={(event) => setExtended(event.target.checked)} sx={vuseSwitchSx} />} label="extended" sx={switchLabelSx} />
              <FormControlLabel control={<Switch checked={flat} onChange={(event) => setFlat(event.target.checked)} sx={vuseSwitchSx} />} label="flat" sx={switchLabelSx} />
              <FormControlLabel control={<Switch checked={prominent} onChange={(event) => setProminent(event.target.checked)} sx={vuseSwitchSx} />} label="prominent" sx={switchLabelSx} />
              <FormControlLabel control={<Switch checked={short} onChange={(event) => setShort(event.target.checked)} sx={vuseSwitchSx} />} label="short" sx={switchLabelSx} />
              <Typography sx={{ fontSize: 14, color: "text.secondary", pt: 0.5 }}>elevation</Typography>
              <Slider min={2} max={24} value={elevation} onChange={(_, value) => setElevation(value as number)} sx={vuseSliderSx} />
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
        {toolbarExamples.map((example) => (
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
  minHeight = 220,
}: {
  title: string;
  description: ReactNode;
  source: string;
  children: (inverted: boolean) => ReactNode;
  minHeight?: number;
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
          <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap", color: "#f8f8f2" }}>
            {sourceTemplates[source] || "<template>\n  <v-toolbar>Title</v-toolbar>\n</template>"}
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

function VToolbar({
  title,
  color = "",
  dark = false,
  image = false,
  collapse = false,
  dense = false,
  extended = false,
  prominent = false,
  short = false,
  flat = false,
  elevation = 4,
  extensionHeight = 48,
  usageActions = false,
  children,
}: {
  title?: string;
  color?: string;
  dark?: boolean;
  image?: boolean;
  collapse?: boolean;
  dense?: boolean;
  extended?: boolean;
  prominent?: boolean;
  short?: boolean;
  flat?: boolean;
  elevation?: number;
  extensionHeight?: number;
  usageActions?: boolean;
  children?: ReactNode;
}) {
  const contentHeight = prominent ? (dense ? 96 : short ? 112 : 128) : dense ? 48 : short ? 56 : 64;
  const totalHeight = contentHeight + (extended ? extensionHeight : 0);
  const resolvedColor = image ? "#6A76AB" : resolveToolbarColor(color);
  const toolbarDark = dark || isDarkToolbarColor(color);

  return (
    <Box sx={{ position: "relative", width: collapse ? 112 : "100%", maxWidth: collapse ? 112 : "100%", height: totalHeight, bgcolor: image ? "#6A76AB" : resolvedColor, color: toolbarDark ? "#fff" : "rgba(0,0,0,.87)", overflow: "hidden", borderBottomRightRadius: collapse ? 24 : 0, boxShadow: flat ? "none" : toolbarShadow(elevation), transition: "width 250ms cubic-bezier(.4,0,.2,1), box-shadow 280ms cubic-bezier(.4,0,.2,1)" }}>
      {image ? <Box sx={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(to top right, rgba(100,115,201,.48), rgba(25,32,72,.56)), url(https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} /> : null}
      <Toolbar disableGutters sx={{ position: "relative", minHeight: contentHeight, height: contentHeight, px: 2, py: 0.5, alignItems: prominent ? "flex-start" : "center", overflow: "hidden" }}>
        {children || (
          <>
            <ToolbarIcon><MenuIcon /></ToolbarIcon>
            {!collapse && title ? <Typography sx={{ alignSelf: prominent ? "flex-end" : "center", ml: 1.25, pb: prominent ? "6px" : 0, fontSize: prominent ? 24 : 20, fontWeight: 400, lineHeight: 1.5, whiteSpace: "nowrap" }}>{title}</Typography> : null}
            {!collapse ? <Box sx={{ flexGrow: 1 }} /> : null}
            {!collapse && usageActions ? (
              <>
                <ToolbarIcon><FileUpload /></ToolbarIcon>
                <ToolbarIcon><Delete /></ToolbarIcon>
                <ToolbarIcon><AddCircle /></ToolbarIcon>
              </>
            ) : !collapse ? (
              <>
                <ToolbarIcon><Search /></ToolbarIcon>
                <ToolbarIcon><Favorite /></ToolbarIcon>
                <ToolbarIcon><MoreVert /></ToolbarIcon>
              </>
            ) : null}
          </>
        )}
      </Toolbar>
      {extended && !collapse ? (
        <Stack direction="row" sx={{ position: "relative", height: extensionHeight, pl: 2 }}>
          {["Link 1", "Link 2", "Link 3"].map((link) => <Button key={link} sx={{ color: "inherit", minHeight: extensionHeight, borderRadius: 0 }}>{link}</Button>)}
        </Stack>
      ) : null}
    </Box>
  );
}

function ToolbarSurface({ children, height = 200, inverted = false }: { children: ReactNode; height?: number; inverted?: boolean }) {
  return <Card sx={{ height, bgcolor: inverted ? "#424242" : "#f5f5f5", boxShadow: "none", borderRadius: 0, overflow: "hidden" }}>{children}</Card>;
}

function ProminentExample() {
  return <ToolbarSurface><VToolbar title="Title" prominent extended /></ToolbarSurface>;
}

function DenseExample() {
  return <ToolbarSurface><VToolbar title="Title" dense /></ToolbarSurface>;
}

function LightDarkExample() {
  return (
    <Card sx={{ boxShadow: "none", bgcolor: "transparent" }}>
      <Grid container>
        <Grid item xs={12} md={9}>
          <VToolbar color="white" title="Title">
            <ToolbarIcon><ArrowBack /></ToolbarIcon>
            <Typography sx={{ ml: 1.25, fontSize: 20, fontWeight: 400 }}>Title</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <ToolbarIcon><Search /></ToolbarIcon>
          </VToolbar>
        </Grid>
        <Grid item xs={12} md={3}>
          <VToolbar color="#212121" dark>
            <Box sx={{ flexGrow: 1 }} />
            <ToolbarIcon><Reply /></ToolbarIcon>
            <ToolbarIcon><MoreVert /></ToolbarIcon>
          </VToolbar>
        </Grid>
      </Grid>
    </Card>
  );
}

function VariationsExample() {
  const bars = [
    { color: "", dark: false, flat: false },
    { color: "#212121", dark: true, flat: false },
    { color: "primary", dark: true, flat: false },
    { color: "", dark: false, flat: true },
  ];
  return (
    <Grid container spacing={4}>
      {bars.map((bar, index) => (
        <Grid item xs={12} md={6} key={index}>
          <ToolbarSurface>
            <VToolbar title="Title" color={bar.color} dark={bar.dark} flat={bar.flat} />
          </ToolbarSurface>
        </Grid>
      ))}
    </Grid>
  );
}

function BackgroundExample() {
  return (
    <Box>
      <VToolbar title="Vuetify" image prominent dark>
        <ToolbarIcon><MenuIcon /></ToolbarIcon>
        <Typography sx={{ alignSelf: "flex-end", ml: 1.25, pb: "6px", fontSize: 24, fontWeight: 400 }}>Vuetify</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <ToolbarIcon><FileUpload /></ToolbarIcon>
      </VToolbar>
    </Box>
  );
}

function ExtendedExample() {
  return <ToolbarSurface><VToolbar title="Title" extended /></ToolbarSurface>;
}

function ExtensionHeightExample() {
  return <ToolbarSurface><VToolbar title="Title" extended extensionHeight={100} /></ToolbarSurface>;
}

function CollapseToolbarExample() {
  return (
    <ToolbarSurface>
      <VToolbar collapse>
        <ToolbarIcon><Search /></ToolbarIcon>
        <ToolbarIcon><MoreVert /></ToolbarIcon>
      </VToolbar>
    </ToolbarSurface>
  );
}

function FlexibleCardExample() {
  return (
    <Card sx={{ boxShadow: "none", bgcolor: "transparent" }}>
      <VToolbar color="primary" dark extended flat>
        <ToolbarIcon><MenuIcon /></ToolbarIcon>
      </VToolbar>
      <Card sx={{ maxWidth: 700, mx: "auto", mt: "-64px", bgcolor: "#fff", borderRadius: 1, boxShadow: "0 2px 4px rgba(0,0,0,.16)", overflow: "hidden" }}>
        <VToolbar color="white" flat>
          <Typography sx={{ color: "#757575", fontSize: 20, fontWeight: 400 }}>Title</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <ToolbarIcon><Search /></ToolbarIcon>
          <ToolbarIcon><Apps /></ToolbarIcon>
          <ToolbarIcon><MoreVert /></ToolbarIcon>
        </VToolbar>
        <Divider />
        <Box sx={{ height: 200 }} />
      </Card>
    </Card>
  );
}

function FloatingSearchExample() {
  return (
    <Card sx={{ p: 4, height: 300, boxShadow: "none", borderRadius: 0, backgroundImage: "url(https://cdn.vuetifyjs.com/images/toolbar/map.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
      <Box sx={{ display: "inline-flex", bgcolor: "#fff", color: "rgba(0,0,0,.87)", minHeight: 48, boxShadow: toolbarShadow(4), borderRadius: 0 }}>
        <TextField variant="standard" placeholder="" InputProps={{ disableUnderline: true, startAdornment: <InputAdornment position="start"><Search sx={{ color: "rgba(0,0,0,.54)" }} /></InputAdornment> }} sx={{ width: 220, px: 2, alignSelf: "center", "& input": { py: 1, fontSize: 16 } }} />
        <ToolbarIcon><MyLocation /></ToolbarIcon>
        <ToolbarIcon><MoreVert /></ToolbarIcon>
      </Box>
    </Card>
  );
}

function ContextualActionBarExample() {
  const [selection, setSelection] = useState<string[]>([]);
  const selected = selection.length > 0;
  const items = ["Foo", "Bar", "Fizz", "Buzz"];

  return (
    <Card sx={{ maxWidth: 500, mx: "auto", bgcolor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,.16)", borderRadius: 1, overflow: "hidden" }}>
      <VToolbar color={selected ? "#212121" : "deep-purple accent-4"} dark>
        {selected ? <ToolbarIcon onClick={() => setSelection([])}><Close /></ToolbarIcon> : <ToolbarIcon><MenuIcon /></ToolbarIcon>}
        <Typography sx={{ ml: 1.25, fontSize: 20, fontWeight: 400 }}>{selected ? `${selection.length} selected` : "Photos"}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        {selected ? (
          <>
            <ToolbarIcon><FileUpload /></ToolbarIcon>
            <ToolbarIcon><Delete /></ToolbarIcon>
          </>
        ) : null}
        <ToolbarIcon><MoreVert /></ToolbarIcon>
      </VToolbar>
      <Box sx={{ p: 2 }}>
        <Select
          multiple
          fullWidth
          displayEmpty
          value={selection}
          onChange={(event) => setSelection(typeof event.target.value === "string" ? event.target.value.split(",") : event.target.value)}
          renderValue={(selectedValue) => selectedValue.length ? selectedValue.join(", ") : "Select an option"}
          sx={contextSelectSx}
        >
          {items.map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={selection.includes(item)} sx={{ color: "#00838f", "&.Mui-checked": { color: "#00838f" } }} />
              {item}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Card>
  );
}

function WarningAlert() {
  return (
    <Box sx={{ my: 5, px: 3, py: 2.5, borderLeft: "4px solid #fb8c00", bgcolor: "rgba(251,140,0,.10)", borderRadius: 1, color: "text.secondary", fontSize: 16, lineHeight: 1.7 }}>
      When <CodePill>{"<v-btn>"}</CodePill>s with the <strong>icon</strong> prop are used inside of <CodePill>v-toolbar</CodePill> and <CodePill>v-app-bar</CodePill> they will automatically have their size increased and negative margin applied to ensure proper spacing according to the Material Design Specification. If you choose to wrap your buttons in any container, such as a <CodePill>{"<div>"}</CodePill>, you will need to apply negative margin to that container in order to properly align them.
    </Box>
  );
}

function ToolbarIcon({ children, onClick, color }: { children: ReactNode; onClick?: (event: MouseEvent<HTMLButtonElement>) => void; color?: string }) {
  return (
    <IconButton onClick={onClick} sx={{ width: 48, height: 48, color: color || "inherit", flex: "0 0 auto", "&:hover": { bgcolor: "rgba(0,0,0,.04)" }, "&:active": { bgcolor: "rgba(0,0,0,.08)", transform: "scale(.96)" } }}>
      {children}
    </IconButton>
  );
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: 0.55, py: 0.15, borderRadius: 0.75, bgcolor: "rgba(255,82,82,.10)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "0.88em" }}>{children}</Box>;
}

const toolbarExamples: ToolbarExample[] = [
  { title: "Prominent toolbars", description: <>Prominent toolbars increase the <CodePill>v-toolbar</CodePill>'s height to <em>128px</em> and positions the <CodePill>v-toolbar-title</CodePill> towards the bottom of the container. This is expanded upon in <a href="/components/app-bars#prominent-w-scroll-shrink">v-app</a> with the ability to shrink a <strong>prominent</strong> toolbar to a <strong>dense</strong> or <strong>short</strong> one.</>, source: "toolbars/simple/prominent", minHeight: 300, render: () => <ProminentExample /> },
  { title: "Dense toolbars", description: <>Dense toolbars reduce their height to <em>48px</em>. When using in conjunction with the <strong>prominent</strong> prop, will reduce height to <em>96px</em>.</>, source: "toolbars/simple/dense", minHeight: 300, render: () => <DenseExample /> },
  { title: "Light and Dark", description: <>Toolbars come in <strong>2</strong> variants, light and dark. Light toolbars have dark tinted buttons and dark text whereas dark toolbars have white tinted buttons and white text.</>, source: "toolbars/simple/light-and-dark", minHeight: 180, render: () => <LightDarkExample /> },
  { title: "Variations", description: <>A <CodePill>v-toolbar</CodePill> has multiple variations that can be applied with themes and helper classes. These range from light and dark themes, colored and transparent.</>, source: "toolbars/simple/variations", minHeight: 520, render: () => <VariationsExample /> },
  { title: "Prominent w/ Background", description: <>Toolbars can display a background as opposed to a solid color. This can be modified by using the <strong>img</strong> slot and providing your own <a href="/components/images">v-img</a> component. Backgrounds can be faded using a <a href="/components/app-bars#prominent-w-scroll-shrink-and-image">v-app-bar</a>.</>, source: "toolbars/simple/background", minHeight: 240, render: () => <BackgroundExample /> },
  { title: "Extended", description: <>Toolbars can be extended without using the <CodePill>extension</CodePill> slot.</>, source: "toolbars/simple/extended", minHeight: 300, render: () => <ExtendedExample /> },
  { title: "Extension height", description: "The extension's height can be customized.", source: "toolbars/simple/extension-height", minHeight: 300, render: () => <ExtensionHeightExample /> },
  { title: "Collapse", description: "Toolbars can be collapsed to save screen space.", source: "toolbars/simple/collapse", minHeight: 300, render: () => <CollapseToolbarExample /> },
  { title: "Flexible toolbar and card toolbar", description: <>In this example we offset our card onto the extended content area of a toolbar using the <strong>extended</strong> prop.</>, source: "toolbars/intermediate/flexible-and-card", minHeight: 390, render: () => <FlexibleCardExample /> },
  { title: "Floating with search", description: "A floating toolbar is turned into an inline element that only takes up as much space as needed. This is particularly useful when placing toolbars over content.", source: "toolbars/intermediate/floating-with-search", minHeight: 400, render: () => <FloatingSearchExample /> },
  { title: "Contextual action bars", description: <>It is possible to update the appearance of a toolbar in response to changes in app state. In this example, the color and content of the toolbar changes in response to user selections in the <CodePill>v-select</CodePill>.</>, source: "toolbars/intermediate/contextual-action-bar", minHeight: 300, render: () => <ContextualActionBarExample /> },
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

const vuseSliderSx = { color: "#00838f", height: 2, "& .MuiSlider-thumb": { width: 18, height: 18, bgcolor: "#fb8c00", boxShadow: "none" }, "& .MuiSlider-track": { border: 0 }, "& .MuiSlider-rail": { bgcolor: "rgba(111,125,133,.35)" } };
const vuseSelectSx = { minHeight: 42, fontSize: 14, bgcolor: "#fff", boxShadow: neuGlow, borderRadius: 1, "& fieldset": { borderColor: "transparent" } };
const contextSelectSx = { bgcolor: "#fff", "& .MuiSelect-select": { minHeight: 42, py: 1.4, fontSize: 16 }, "& fieldset": { borderColor: "rgba(0,0,0,.23)" }, "&:hover fieldset": { borderColor: "rgba(0,0,0,.54)" } };

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

function resolveToolbarColor(color: string) {
  const map: Record<string, string> = {
    primary: "#00838f",
    orange: "#fb8c00",
    yellow: "#fdd835",
    green: "#43a047",
    blue: "#1e88e5",
    purple: "#8e24aa",
    "deep-purple accent-4": "#6200ea",
    white: "#fff",
    "": "#fff",
  };
  return map[color] || color;
}

function isDarkToolbarColor(color: string) {
  return ["primary", "orange", "green", "blue", "purple", "deep-purple accent-4", "#212121"].includes(color);
}

function toolbarShadow(elevation: number) {
  if (elevation <= 0) return "none";
  const opacity = Math.min(0.26, 0.1 + elevation / 110);
  return `0 2px 4px -1px rgba(0,0,0,${opacity}), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)`;
}

const sourceTemplates: Record<string, string> = {
  "toolbars/simple/prominent": `<template>
  <v-card color="grey lighten-4" flat height="200px" tile>
    <v-toolbar prominent extended>...</v-toolbar>
  </v-card>
</template>`,
  "toolbars/simple/dense": `<template>
  <v-card color="grey lighten-4" flat height="200px" tile>
    <v-toolbar dense>...</v-toolbar>
  </v-card>
</template>`,
  "toolbars/simple/light-and-dark": `<template>
  <v-card flat>
    <v-row class="child-flex">
      <v-toolbar>...</v-toolbar>
      <v-toolbar dark>...</v-toolbar>
    </v-row>
  </v-card>
</template>`,
  "toolbars/simple/variations": `<template>
  <v-row>
    <v-col v-for="bar in bars" cols="12" sm="12" md="6">
      <v-toolbar :color="bar.class" :dark="bar.dark">...</v-toolbar>
    </v-col>
  </v-row>
</template>`,
  "toolbars/simple/background": `<template>
  <v-toolbar dark prominent src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">...</v-toolbar>
</template>`,
  "toolbars/simple/extended": `<template>
  <v-toolbar extended>...</v-toolbar>
</template>`,
  "toolbars/simple/extension-height": `<template>
  <v-toolbar extended extension-height="100">...</v-toolbar>
</template>`,
  "toolbars/simple/collapse": `<template>
  <v-toolbar collapse>
    <v-btn icon><v-icon>mdi-magnify</v-icon></v-btn>
    <v-btn icon><v-icon>mdi-dots-vertical</v-icon></v-btn>
  </v-toolbar>
</template>`,
  "toolbars/intermediate/flexible-and-card": `<template>
  <v-toolbar color="primary" dark extended flat>...</v-toolbar>
  <v-card class="mx-auto" max-width="700" style="margin-top: -64px;">...</v-card>
</template>`,
  "toolbars/intermediate/floating-with-search": `<template>
  <v-card class="pa-4" flat height="300px" img="https://cdn.vuetifyjs.com/images/toolbar/map.jpg">
    <v-toolbar dense floating>...</v-toolbar>
  </v-card>
</template>`,
  "toolbars/intermediate/contextual-action-bar": `<template>
  <v-toolbar :color="selection.length ? 'grey darken-4' : 'deep-purple accent-4'" dark>...</v-toolbar>
  <v-select v-model="selection" :items="items" multiple label="Select an option"></v-select>
</template>`,
};
