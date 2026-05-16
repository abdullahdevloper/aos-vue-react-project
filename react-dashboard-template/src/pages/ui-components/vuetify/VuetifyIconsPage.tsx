import { useState, type ReactNode } from "react";
import { Box, Button, Card, Collapse, FormControl, GlobalStyles, Grid, IconButton, MenuItem, Select, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { Code, GitHub, InvertColors, PhotoLibrary } from "@mui/icons-material";
import {
  mdiAccessPoint,
  mdiAccount,
  mdiAntenna,
  mdiArrowLeft,
  mdiArrowUpBoldBoxOutline,
  mdiCallSplit,
  mdiCancel,
  mdiCheckboxMarkedCircle,
  mdiChevronRight,
  mdiCloudUpload,
  mdiDelete,
  mdiDialpad,
  mdiDomain,
  mdiEmail,
  mdiMessageText,
  mdiMinus,
  mdiMinusCircle,
  mdiPencil,
  mdiPlus,
  mdiShareVariant,
  mdiThumbDown,
  mdiThumbUp,
  mdiWrench,
} from "@mdi/js";
import { faCircleNotch, faEdit, faList, faLock, faSearch, faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";
import materialIconsFont from "../../../assets/style-ui/icons/MaterialIcons-Regular.woff2";

const primary = "#0097a7";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const sectionHeadingSx = { fontSize: { xs: 20, md: 22 }, lineHeight: 1.45, fontWeight: 400, mb: 2.5 };
const docsParagraphSx = { fontSize: { xs: 16, md: 20 }, lineHeight: 1.55, fontWeight: 300, mb: 3, color: "text.secondary" };
type ExampleKey = keyof typeof sourceTemplates;

export default function VuetifyIconsPage() {
  return (
    <>
      <GlobalStyles
        styles={{
          "@font-face": {
            fontFamily: "Material Icons",
            fontStyle: "normal",
            fontWeight: 400,
            src: `url(${materialIconsFont}) format("woff2")`,
          },
        }}
      />
      <DocPage
        title="Icons"
        namespace="Components"
        icon={<PhotoLibrary />}
        breadcrumbs={[
          { label: "Components", href: "/components/vuetify/api-explorer" },
          { label: "Vuetify", href: "/components/vuetify/api-explorer" },
          { label: "Icons" },
        ]}
      >
        <DocText>
          The <CodePill>v-icon</CodePill> component provides a large set of glyphs to provide context to various aspects of your application. For a list of all available icons, visit the official <a href="https://materialdesignicons.com/">Material Design Icons</a> page. To use any of these icons simply use the <CodePill>mdi-</CodePill> prefix followed by the icon name.
        </DocText>
        <UsageSection />
        <ExamplesSection />
      </DocPage>
    </>
  );
}

function UsageSection() {
  const [dense, setDense] = useState(false);
  const [icon, setIcon] = useState("mdi-plus");
  const [size, setSize] = useState("medium");
  const [color, setColor] = useState("red");
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <Typography variant="h5" sx={sectionHeadingSx}>Usage</Typography>
      <Typography sx={docsParagraphSx}>Icons come in two themes (light and dark), and five different sizes (x-small, small, medium (default), large, and x-large).</Typography>
      <VuetifyExampleBlock title="" description="" source="usage" minHeight={360}>
        {() => (
          <PlaygroundShell>
            <Box sx={{ flex: 1, minHeight: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MdiIcon path={usageIconPaths[icon] ?? mdiPlus} size={dense ? 20 : iconSize(size)} color={colorValue(color)} />
            </Box>
            <OptionsPanel>
              <VSwitch label="Dense" checked={dense} onChange={setDense} />
              <VSelect label="Icon" value={icon} onChange={setIcon} items={["mdi-plus", "mdi-minus", "mdi-access-point", "mdi-antenna"]} />
              <VSelect label="Size" value={size} onChange={setSize} items={["x-small", "small", "medium", "large", "x-large"]} />
              <VSelect label="Color" value={color} onChange={setColor} items={["red", "orange", "yellow", "green", "blue", "purple"]} />
            </OptionsPanel>
          </PlaygroundShell>
        )}
      </VuetifyExampleBlock>
    </Box>
  );
}

function ExamplesSection() {
  return (
    <Box component="section">
      <Typography variant="h5" sx={sectionHeadingSx}>Examples</Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>Below is a collection of simple to complex examples.</Typography>
      <Stack spacing={5}>
        <VuetifyExampleBlock title="Material Design" description={<> <a href="https://material.io/tools/icons/?style=baseline">Material Design</a> is also supported. For more information on how to install it please <a href="/customization/icons#install-material-icons">navigate here</a></>} source="simple/md" minHeight={360}>
          {() => <MaterialDesignExample />}
        </VuetifyExampleBlock>
        <VuetifyExampleBlock title="Font Awesome" description={<> <a href="http://fontawesome.io/icons/">Font Awesome</a> is also supported. Simply use the <CodePill>fa-</CodePill> prefixed icon name. Please note that you still need to include the Font Awesome icons in your project. For more information on how to install it, please navigate to the <a href="/customization/icons#install-font-awesome-5-icons">installation page</a></>} source="simple/font-awesome" minHeight={260}>
          {() => <FontAwesomeExample />}
        </VuetifyExampleBlock>
        <VuetifyExampleBlock title="Color" description="Using color helpers you can change the color of an icon from the standard dark and light themes." source="simple/color" minHeight={220}>
          {() => <ColorExample />}
        </VuetifyExampleBlock>
        <VuetifyExampleBlock title="Buttons" description="Icons can be used inside of buttons to add emphasis to the action." source="intermediate/buttons" minHeight={300}>
          {() => <ButtonsExample />}
        </VuetifyExampleBlock>
        <VuetifyExampleBlock title="Clickable" description={<>Binding any click event to <CodePill>v-icon</CodePill> will automatically change the cursor to a pointer.</>} source="intermediate/clickable" minHeight={330}>
          {() => <ClickableExample />}
        </VuetifyExampleBlock>
        <VuetifyExampleBlock title="MDI SVG" description={<>You can manually import only the icons you use when using the <a href="https://www.npmjs.com/package/@mdi/js">@mdi/js</a> package. If you want to use SVG icons with <CodePill>VIcon</CodePill> component, read about using them <a href="/customization/icons#install-material-design-icons-js-svg">here</a>.</>} source="complex/mdi-svg" minHeight={220}>
          {() => <MdiSvgExample />}
        </VuetifyExampleBlock>
      </Stack>
    </Box>
  );
}

function MaterialDesignExample() {
  const sizes = [24, 24, 36, 40];
  return (
    <Box sx={{ width: "100%" }}>
      {sizes.map((size, index) => (
        <Grid container justifyContent="space-around" sx={{ mb: index === sizes.length - 1 ? 0 : 1 }} key={index}>
          <Grid item xs={12} sm={5} sx={iconGroupSx}>
            <MaterialIcon name="home" size={size} />
            <MaterialIcon name="event" size={size} />
            <MaterialIcon name="info" size={size} />
          </Grid>
          <Grid item xs={12} sm={5} sx={{ ...iconGroupSx, bgcolor: "#009688" }}>
            <MaterialIcon name="folder_open" size={size} color="#fff" />
            <MaterialIcon name="widgets" size={size} color="#fff" />
            <MaterialIcon name="gavel" size={size} color="#fff" />
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}

function FontAwesomeExample() {
  const items = [faLock, faSearch, faList, faEdit, faTachometerAlt, faCircleNotch];
  return (
    <IconRow>
      {items.map((item) => <FaIcon key={item.iconName} icon={item} spin={item.iconName === "circle-notch"} />)}
    </IconRow>
  );
}

function ColorExample() {
  return (
    <IconRow>
      <MdiIcon path={mdiDomain} size={36} color="#388e3c" />
      <MdiIcon path={mdiMessageText} size={36} color="#1976d2" />
      <MdiIcon path={mdiDialpad} size={36} color="#7b1fa2" />
      <MdiIcon path={mdiEmail} size={36} color="#00796b" />
      <MdiIcon path={mdiCallSplit} size={36} color="#455a64" />
      <MdiIcon path={mdiArrowUpBoldBoxOutline} size={36} color="#f57c00" />
    </IconRow>
  );
}

function ButtonsExample() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box>
        <VButton color={primary}>Accept <MdiIcon path={mdiCheckboxMarkedCircle} size={20} color="#fff" sx={{ ml: 1 }} /></VButton>
        <VButton color="#f44336">Decline <MdiIcon path={mdiCancel} size={20} color="#fff" sx={{ ml: 1 }} /></VButton>
        <VButton color="#212121"><MdiIcon path={mdiMinusCircle} size={20} color="#fff" sx={{ mr: 1 }} />Cancel</VButton>
      </Box>
      <Box>
        <VButton color="#f57c00"><MdiIcon path={mdiArrowLeft} size={20} color="#fff" sx={{ mr: 1 }} />Back</VButton>
        <VButton color="#9c27b0"><MdiIcon path={mdiWrench} size={20} color="#fff" /></VButton>
        <VButton color="#3f51b5"><MdiIcon path={mdiCloudUpload} size={20} color="#fff" /></VButton>
      </Box>
      <Box>
        <IconButton sx={{ m: 1, color: "#64b5f6", "&:hover": { bgcolor: "rgba(100,181,246,.08)" } }}><MdiIcon path={mdiThumbUp} size={24} color="currentColor" /></IconButton>
        <IconButton sx={{ m: 1, color: "#e57373", "&:hover": { bgcolor: "rgba(229,115,115,.08)" } }}><MdiIcon path={mdiThumbDown} size={24} color="currentColor" /></IconButton>
      </Box>
    </Box>
  );
}

function ClickableExample() {
  return (
    <Card sx={{ borderRadius: 1, boxShadow: elevationShadow(2), overflow: "hidden" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, bgcolor: "#e91e63", color: "#fff", px: 2 }}>
        <Typography sx={{ fontSize: 14 }}>Upcoming Changes</Typography>
      </Toolbar>
      <Box sx={{ p: 2, fontSize: 14, lineHeight: 1.5, color: "rgba(0,0,0,.6)" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Box>
      <Box sx={{ minHeight: 52, display: "flex", alignItems: "center", px: 1 }}>
        <Box sx={{ flexGrow: 1 }} />
        <Box component="button" type="button" onClick={() => window.alert("You clicked next!")} sx={{ border: 0, bgcolor: "transparent", p: 1, cursor: "pointer", color: "rgba(0,0,0,.54)", lineHeight: 0 }}>
          <MdiIcon path={mdiChevronRight} size={36} color="currentColor" />
        </Box>
      </Box>
    </Card>
  );
}

function MdiSvgExample() {
  return (
    <IconRow>
      <MdiIcon path={mdiAccount} />
      <Box sx={{ mx: 1 }} />
      <MdiIcon path={mdiPencil} />
      <Box sx={{ mx: 1 }} />
      <MdiIcon path={mdiShareVariant} />
      <Box sx={{ mx: 1 }} />
      <Button variant="contained" disableElevation sx={{ bgcolor: primary, color: "#fff", minHeight: 36, borderRadius: 1, textTransform: "uppercase", "&:hover": { bgcolor: primary } }}><MdiIcon path={mdiDelete} size={20} color="#fff" sx={{ mr: 1 }} />Delete</Button>
    </IconRow>
  );
}

function PlaygroundShell({ children }: { children: ReactNode }) {
  return <Box sx={{ display: "flex", gap: 3, alignItems: "stretch", flexDirection: { xs: "column", md: "row" } }}>{children}</Box>;
}

function OptionsPanel({ children }: { children: ReactNode }) {
  return <Box sx={{ width: { xs: "100%", md: 260 }, flex: "0 0 auto", borderLeft: { md: "1px solid rgba(0,0,0,.08)" }, pl: { md: 3 }, pt: .5 }}>{children}</Box>;
}

function VSelect({ label, value, onChange, items }: { label: string; value: string; onChange: (value: string) => void; items: string[] }) {
  return (
    <FormControl fullWidth sx={{ mt: 2 }}>
      <Typography sx={{ fontSize: 12, color: "text.secondary", mb: .5 }}>{label}</Typography>
      <Select size="small" value={value} onChange={(event) => onChange(event.target.value)} sx={{ minHeight: 40, bgcolor: "#fff", borderRadius: 1, fontSize: 14, boxShadow: "0 2px 5px rgba(0,0,0,.08)", "& fieldset": { borderColor: "rgba(0,0,0,.12)" } }}>
        {items.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
      </Select>
    </FormControl>
  );
}

function VSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <Box onClick={() => onChange(!checked)} sx={{ display: "flex", alignItems: "center", minHeight: 42, cursor: "pointer", userSelect: "none" }}><SwitchKnob checked={checked} /><Typography sx={{ fontSize: 16 }}>{label}</Typography></Box>;
}

function SwitchKnob({ checked }: { checked: boolean }) {
  return <Box sx={{ width: 42, height: 34, position: "relative", mr: 1, display: "flex", alignItems: "center" }}><Box sx={{ width: 34, height: 14, borderRadius: 8, bgcolor: checked ? primary : "rgba(0,0,0,.38)", opacity: checked ? .5 : .38 }} /><Box sx={{ position: "absolute", left: checked ? 18 : 0, width: 20, height: 20, borderRadius: "50%", bgcolor: checked ? primary : "#fafafa", boxShadow: "0 2px 4px rgba(0,0,0,.32)", transition: "left 150ms ease" }} /></Box>;
}

function MdiIcon({ path, size = 24, color = "rgba(0,0,0,.54)", sx = {} }: { path: string; size?: number; color?: string; sx?: object }) {
  return <Box component="svg" viewBox="0 0 24 24" aria-hidden="true" sx={{ width: size, height: size, display: "inline-block", flex: "0 0 auto", fill: color, verticalAlign: "middle", ...sx }}><path d={path} /></Box>;
}

function FaIcon({ icon, spin = false }: { icon: IconDefinition; spin?: boolean }) {
  const [width, height, , , svgPathData] = icon.icon;
  return (
    <Box component="svg" viewBox={`0 0 ${width} ${height}`} aria-hidden="true" sx={{ width: 24, height: 24, display: "inline-block", fill: "rgba(0,0,0,.54)", animation: spin ? "faSpin 1s linear infinite" : undefined }}>
      {Array.isArray(svgPathData) ? svgPathData.map((path) => <path key={path} d={path} />) : <path d={svgPathData} />}
    </Box>
  );
}

function MaterialIcon({ name, size = 24, color = "rgba(0,0,0,.54)" }: { name: string; size?: number; color?: string }) {
  return <Box component="span" className="material-icons" sx={{ fontFamily: '"Material Icons"', fontWeight: 400, fontStyle: "normal", fontSize: size, color, lineHeight: 1, letterSpacing: "normal", textTransform: "none", display: "inline-block", whiteSpace: "nowrap", wordWrap: "normal", direction: "ltr", fontFeatureSettings: '"liga"', WebkitFontFeatureSettings: '"liga"', WebkitFontSmoothing: "antialiased" }}>{name}</Box>;
}

function IconRow({ children }: { children: ReactNode }) {
  return <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", gap: 2, width: "100%", "@keyframes faSpin": { to: { transform: "rotate(360deg)" } } }}>{children}</Box>;
}

function VButton({ children, color }: { children: ReactNode; color: string }) {
  return <Button variant="contained" disableElevation sx={{ m: 1, minHeight: 36, px: 2, bgcolor: color, color: "#fff", borderRadius: 1, fontSize: 14, fontWeight: 500, textTransform: "uppercase", boxShadow: elevationShadow(2), "&:hover": { bgcolor: color, boxShadow: elevationShadow(4) } }}>{children}</Button>;
}

function VuetifyExampleBlock({ title, description, source, children, minHeight }: { title: string; description: ReactNode; source: ExampleKey; children: () => ReactNode; minHeight: number }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return <Card sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}><Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2 }}><Typography sx={{ fontSize: 20 }}>{title}</Typography><Box sx={{ flexGrow: 1 }} /><Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((v) => !v)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip><Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip><Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((v) => !v)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip></Toolbar><Collapse in={sourceOpen} timeout={180} unmountOnExit><Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", maxHeight: { xs: "none", sm: "calc(100vh - 275px)" }, overflowY: "auto", p: 2 }}><Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box></Box></Collapse><Box sx={{ px: 2, py: 2, minHeight, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", "& a": { color: primary } }}>{description && <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography>}{children()}</Box></Card>;
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: .55, py: .18, borderRadius: .75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: .5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

function iconSize(size: string) {
  return size === "x-small" ? 16 : size === "small" ? 20 : size === "medium" ? 28 : size === "large" ? 36 : size === "x-large" ? 40 : 24;
}

function colorValue(color: string) {
  const colors: Record<string, string> = { red: "#f44336", orange: "#ff9800", yellow: "#fdd835", green: "#4caf50", blue: "#2196f3", purple: "#9c27b0" };
  return colors[color] ?? "rgba(0,0,0,.54)";
}

function elevationShadow(level: number) {
  const shadows: Record<number, string> = {
    2: "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)",
    4: "0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)",
  };
  return shadows[level] ?? shadows[2];
}

const iconGroupSx = { display: "flex", flex: 1, justifyContent: "space-around", alignItems: "center", p: 2, minHeight: 56 };

const usageIconPaths: Record<string, string> = {
  "mdi-plus": mdiPlus,
  "mdi-minus": mdiMinus,
  "mdi-access-point": mdiAccessPoint,
  "mdi-antenna": mdiAntenna,
};

const sourceTemplates = {
  usage: "src/demo/usages/icons.vue",
  "simple/md": "src/demo/examples/icons/simple/md.vue",
  "simple/font-awesome": "src/demo/examples/icons/simple/font-awesome.vue",
  "simple/color": "src/demo/examples/icons/simple/color.vue",
  "intermediate/buttons": "src/demo/examples/icons/intermediate/buttons.vue",
  "intermediate/clickable": "src/demo/examples/icons/intermediate/clickable.vue",
  "complex/mdi-svg": "src/demo/examples/icons/complex/mdi-svg.vue",
};
