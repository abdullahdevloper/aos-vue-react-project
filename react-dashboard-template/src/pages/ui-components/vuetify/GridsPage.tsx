import { useState, type ReactNode } from "react";
import { Box, Card, Collapse, IconButton, MenuItem, Select, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { Code, GitHub, GridOn, InvertColors, Laptop, Monitor, PhoneIphone, TabletMac, Tv } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const sectionHeadingSx = { fontSize: { xs: 20, md: 22 }, lineHeight: 1.45, fontWeight: 400, mb: 2.5 };
const docsParagraphSx = { fontSize: { xs: 16, md: 20 }, lineHeight: 1.55, fontWeight: 300, mb: 3, color: "text.secondary" };
type ExampleKey = keyof typeof sourceTemplates;
type Align = "start" | "center" | "end" | "baseline" | "stretch";
type Justify = "start" | "center" | "end" | "space-around" | "space-between";
type ColValue = number | "auto" | "sm";

interface Example {
  title: string;
  description: ReactNode;
  source: ExampleKey;
  minHeight: number;
  render: () => ReactNode;
}

export default function GridsPage() {
  return (
    <DocPage
      title="Grids"
      namespace="Components"
      icon={<GridOn />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Grids" },
      ]}
    >
      <DocText>
        Vuetify comes with a 12 point grid system built using <CodePill>flex-box</CodePill>. The grid is used to create specific layouts within an application's content. It contains 5 types of media breakpoints that are used for targeting specific screen sizes or orientations, <strong>xs</strong>, <strong>sm</strong>, <strong>md</strong>, <strong>lg</strong> and <strong>xl</strong>. These resolutions are defined below in the Viewport Breakpoints table and can be modified by customizing the <Box component="a" sx={{ color: primary }}>Breakpoint service</Box>.
      </DocText>
      <UsageSection />
      <PlaygroundSection />
      <ExamplesSection />
      <ViewportBreakpoints />
    </DocPage>
  );
}

function UsageSection() {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <Typography variant="h5" sx={sectionHeadingSx}>Usage</Typography>
      <Typography sx={docsParagraphSx}>
        The Vuetify grid is heavily inspired by the <Box component="a" sx={{ color: primary }}>Bootstrap grid</Box>. It is integrated by using a series of containers, rows, and columns to layout and align content. <strong>If you are new to flexbox</strong>, <Box component="a" sx={{ color: primary }}>Read the CSS Tricks flexbox guide</Box> for background, terminology, guidelines, and code snippets.
      </Typography>
      <VuetifyExampleBlock title="" description="" source="usage" minHeight={150}>
        {() => <UsageExample />}
      </VuetifyExampleBlock>
      <Typography sx={{ ...docsParagraphSx, mt: 3, mb: 2 }}>
        In the example above, we created three equal-width columns on small, medium, large and extra large devices. The parent <CodePill>v-container</CodePill> to center the inner <CodePill>v-col</CodePill>s.
      </Typography>
      <Stack component="ul" spacing={1.2} sx={{ pl: 3, color: "text.secondary", fontSize: 16, lineHeight: 1.6, fontWeight: 300 }}>
        <li><CodePill>v-container</CodePill> provides the ability to center and horizontally pad your site's contents. You can also use the <strong>fluid</strong> prop to fully extend the container across all viewport and device sizes.</li>
        <li><CodePill>v-row</CodePill> is a wrapper component for <CodePill>v-col</CodePill>. It utilizes flex properties to control the layout and flow of its inner columns. It uses a standard gutter of <strong>24px</strong>. This can be reduced with the <strong>dense</strong> prop or removed completely with <strong>no-gutters</strong>.</li>
        <li><CodePill>v-col</CodePill> is a content holder that must be a direct child of <CodePill>v-row</CodePill>.</li>
      </Stack>
    </Box>
  );
}

function UsageExample() {
  return <VContainer><VRow noGutters>{[1, 2, 3].map((n) => <VCol key={n} cols={12} sm={4}><GridCard>One of three columns</GridCard></VCol>)}</VRow></VContainer>;
}

function PlaygroundSection() {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <Typography variant="h5" sx={sectionHeadingSx}>Layout playground</Typography>
      <Typography sx={docsParagraphSx}>Test the layout props in a simple playground.</Typography>
      <VuetifyExampleBlock title="" description="" source="playground" minHeight={460}>
        {() => <PlaygroundExample />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function PlaygroundExample() {
  const [alignment, setAlignment] = useState<Align>("center");
  const [justify, setJustify] = useState<Justify>("center");
  return (
    <VContainer fluid>
      <VRow>
        <VCol cols={12}>
          <VRow align={alignment} justify={justify} sx={{ bgcolor: "#fafafa", height: 300 }}>
            {[1, 2, 3].map((n) => <GridCard key={n} sx={{ m: vuetifySpace(3), p: vuetifySpace(6) }}>Column</GridCard>)}
          </VRow>
        </VCol>
        <VCol cols={12}>
          <VRow justify="center">
            <VCol cols={6} md={2}><VSelect label="Align" value={alignment} items={["start", "center", "end", "baseline", "stretch"]} onChange={(v) => setAlignment(v as Align)} /></VCol>
            <VCol cols={6} md={2}><VSelect label="Justify" value={justify} items={["start", "center", "end", "space-around", "space-between"]} onChange={(v) => setJustify(v as Justify)} /></VCol>
          </VRow>
        </VCol>
      </VRow>
    </VContainer>
  );
}

function ExamplesSection() {
  return (
    <Box component="section">
      <Typography variant="h5" sx={sectionHeadingSx}>Examples</Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>Below is a collection of simple to complex examples.</Typography>
      <Stack spacing={5}>
        {examples.map((example) => (
          <VuetifyExampleBlock key={example.source} title={example.title} description={example.description} source={example.source} minHeight={example.minHeight}>{example.render}</VuetifyExampleBlock>
        ))}
      </Stack>
    </Box>
  );
}

function AutoExample() {
  return <VContainer>{[1, 2].map((n) => <VRow key={n} noGutters sx={{ mb: n === 1 ? vuetifySpace(6) : 0 }}>{Array.from({ length: n + 1 }, (_, i) => <VCol key={i}><GridCard>{i + 1} of {n + 1}</GridCard></VCol>)}</VRow>)}</VContainer>;
}

function EqualExample() {
  return <VContainer><VRow noGutters>{[1, 2].map((n) => <VCol key={n}><GridCard>Column</GridCard></VCol>)}<Box sx={{ flexBasis: "100%", maxWidth: "100%" }} />{[3, 4].map((n) => <VCol key={n}><GridCard>Column</GridCard></VCol>)}</VRow></VContainer>;
}

function OneColumnWidthExample() {
  return <VContainer><VRow noGutters sx={{ mb: vuetifySpace(6) }}>{[1, 2, 3].map((n) => <VCol key={n} cols={n === 2 ? 6 : undefined}><GridCard>{n} of 3 {n === 2 ? "(wider)" : ""}</GridCard></VCol>)}</VRow><VRow noGutters>{[1, 2, 3].map((n) => <VCol key={n} cols={n === 2 ? 5 : undefined}><GridCard>{n} of 3 {n === 2 ? "(wider)" : ""}</GridCard></VCol>)}</VRow></VContainer>;
}

function VariableContentExample() {
  return <VContainer><VRow noGutters justify="center" sx={{ mb: vuetifySpace(6) }}><VCol lg={2}><GridCard>1 of 3</GridCard></VCol><VCol md="auto"><GridCard>Variable width content</GridCard></VCol><VCol lg={2}><GridCard>3 of 3</GridCard></VCol></VRow><VRow noGutters><VCol><GridCard>1 of 3</GridCard></VCol><VCol md="auto"><GridCard>Variable width content</GridCard></VCol><VCol lg={2}><GridCard>3 of 3</GridCard></VCol></VRow></VContainer>;
}

function GrowShrinkExample() {
  return <VContainer><VRow noGutters sx={{ mb: vuetifySpace(6) }}>{[1, 2, 3, 4].map((n) => <VCol key={n}><GridCard>col</GridCard></VCol>)}</VRow><VRow noGutters>{[8, 4].map((n) => <VCol key={n} cols={n}><GridCard>col-{n}</GridCard></VCol>)}</VRow></VContainer>;
}

function RowColumnBreakpointExample() {
  return <VContainer><VRow noGutters sx={{ mb: vuetifySpace(6) }}><VCol sm={9} md={6} lg={3}><GridCard><ResponsiveColText xs="col-6" sm="col-9" lg="col-3" /></GridCard></VCol><VCol sm={3} md={6} lg={9}><GridCard><ResponsiveColText xs="col-6" sm="col-3" lg="col-9" /></GridCard></VCol></VRow><VRow noGutters>{[1, 2, 3].map((n) => <VCol key={n} cols="sm"><GridCard>col</GridCard></VCol>)}</VRow></VContainer>;
}

function UniqueLayoutsExample() {
  return <VContainer><VRow><VCol cols={12} md={8}><GridCard>.col-12 .col-md-8</GridCard></VCol><VCol cols={6} md={4}><GridCard>.col-6 .col-md-4</GridCard></VCol></VRow><VRow>{[1, 2, 3].map((n) => <VCol key={n} cols={6} md={4}><GridCard>.col-6 .col-md-4</GridCard></VCol>)}</VRow><VRow>{[1, 2].map((n) => <VCol key={n} cols={6}><GridCard>.col-6</GridCard></VCol>)}</VRow></VContainer>;
}

function VerticalAlignmentExample() {
  const alignments: Align[] = ["start", "center", "end"];
  return <Box>{alignments.map((align) => <VContainer key={align} sx={{ mb: vuetifySpace(6) }}><VRow noGutters align={align} sx={{ height: 150 }}>{[1, 2, 3].map((n) => <VCol key={n}><GridCard>One of three columns</GridCard></VCol>)}</VRow></VContainer>)}<VContainer><VRow noGutters sx={{ height: 150 }}>{alignments.map((align) => <VCol key={align} alignSelf={align}><GridCard>One of three columns</GridCard></VCol>)}</VRow></VContainer></Box>;
}

function HorizontalAlignmentExample() {
  const justify: Justify[] = ["start", "center", "end", "space-around", "space-between"];
  return <VContainer>{justify.map((j) => <VRow key={j} justify={j}>{[1, 2].map((n) => <VCol key={n} md={4}><GridCard>One of two columns</GridCard></VCol>)}</VRow>)}</VContainer>;
}

function NoGuttersExample() {
  return <VContainer><VRow noGutters><VCol cols={12} sm={6} md={8}><GridCard>.col-12 .col-sm-6 .col-md-8</GridCard></VCol><VCol cols={6} md={4}><GridCard>.col-6 .col-md-4</GridCard></VCol></VRow></VContainer>;
}

function WrappingExample() {
  return <VContainer><VRow noGutters><VCol cols={9}><GridCard>.col-9</GridCard></VCol><VCol cols={4}><GridCard>.col-4<br />Since 9 + 4 = 13 &gt; 12, this 4-column-wide div gets wrapped onto a new line as one contiguous unit.</GridCard></VCol><VCol cols={6}><GridCard>.col-6<br />Subsequent columns continue along the new line.</GridCard></VCol></VRow></VContainer>;
}

function OrderExample() {
  return <VContainer><VRow noGutters><VCol><GridCard>First, but unordered</GridCard></VCol><VCol order={12}><GridCard>Second, but last</GridCard></VCol><VCol order={1}><GridCard>Third, but first</GridCard></VCol></VRow></VContainer>;
}

function OrderFirstLastExample() {
  return <VContainer><VRow noGutters><VCol order="last"><GridCard>First, but last</GridCard></VCol><VCol><GridCard>Second, but unordered</GridCard></VCol><VCol order="first"><GridCard>Third, but first</GridCard></VCol></VRow></VContainer>;
}

function OffsetExample() {
  return <VContainer><VRow noGutters sx={{ mb: vuetifySpace(6) }}><VCol md={4}><GridCard>.col-md-4</GridCard></VCol><VCol md={4} offsetMd={4}><GridCard>.col-md-4 .offset-md-4</GridCard></VCol></VRow><VRow noGutters sx={{ mb: vuetifySpace(6) }}><VCol md={3} offsetMd={3}><GridCard>.col-md-3 .offset-md-3</GridCard></VCol><VCol md={3} offsetMd={3}><GridCard>.col-md-3 .offset-md-3</GridCard></VCol></VRow><VRow noGutters><VCol md={6} offsetMd={3}><GridCard>.col-md-6 .offset-md-3</GridCard></VCol></VRow></VContainer>;
}

function OffsetBreakpointExample() {
  return <VContainer><VRow noGutters sx={{ mb: vuetifySpace(6) }}><VCol sm={5} md={6}><GridCard>.col-sm-5 .col-md-6</GridCard></VCol><VCol sm={5} offsetSm={2} md={6} offsetMd={0}><GridCard>.col-sm-5 .offset-sm-2 .col-md-6 .offset-md-0</GridCard></VCol></VRow><VRow noGutters><VCol sm={6} md={5} lg={6}><GridCard>.col-sm-6 .col-md-5 .col-lg-6</GridCard></VCol><VCol sm={6} md={5} offsetMd={2} lg={6} offsetLg={0}><GridCard>.col-sm-6 .col-md-5 .offset-md-2 .col-lg-6 .offset-lg-0</GridCard></VCol></VRow></VContainer>;
}

function MarginExample() {
  return <Box sx={{ m: vuetifySpace(5), p: vuetifySpace(5) }}><VContainer><VRow><VCol md={4}><GridCard>.col-md-4</GridCard></VCol><VCol md={4} sx={{ ml: { md: "auto" } }}><GridCard>.col-md-4 .ml-auto</GridCard></VCol></VRow><VRow><VCol md={3} sx={{ ml: { md: "auto" } }}><GridCard>.col-md-3 .ml-md-auto</GridCard></VCol><VCol md={3} sx={{ ml: { md: "auto" } }}><GridCard>.col-md-3 .ml-md-auto</GridCard></VCol></VRow><VRow><VCol cols="auto" sx={{ mr: "auto" }}><GridCard>.col-auto .mr-auto</GridCard></VCol><VCol cols="auto"><GridCard>.col-auto</GridCard></VCol></VRow></VContainer></Box>;
}

function NestedGridExample() {
  return <VContainer><VRow><VCol sm={9}><GridCard>Level 1: .col-sm-9</GridCard><VRow noGutters><VCol cols={8} sm={6}><GridCard sx={{ bgcolor: "lightgrey" }}>Level 2: .col-8 .col-sm-6</GridCard></VCol><VCol cols={4} sm={6}><GridCard sx={{ bgcolor: "lightgrey" }}>Level 3: .col-4 .col-sm-6</GridCard></VCol></VRow></VCol></VRow></VContainer>;
}

function SpacerExample() {
  return <VContainer><VRow><VCol><GridCard>.col</GridCard></VCol><VSpacer /><VCol><GridCard>.col</GridCard></VCol></VRow><VRow><VCol cols="auto" lg={3}><GridCard>.col-auto</GridCard></VCol><VSpacer /><VCol><GridCard>.col</GridCard></VCol><VSpacer /><VCol md={5}><GridCard>.col-md-5</GridCard></VCol></VRow></VContainer>;
}

function ViewportBreakpoints() {
  const rows = [
    [<PhoneIphone />, "Extra small", "xs", "small to large handset", "< 600px"],
    [<TabletMac />, "Small", "sm", "small to medium tablet", "600px > < 960px"],
    [<Laptop />, "Medium", "md", "large tablet to laptop", "960px > < 1264px*"],
    [<Monitor />, "Large", "lg", "desktop", "1264px* > < 1904px*"],
    [<Tv />, "Extra large", "xl", "4k and ultra-wides", "> 1904px*"],
  ];
  return (
    <Box component="section" sx={{ mt: 5, overflowX: "auto" }}>
      <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", bgcolor: "background.paper", boxShadow: neuInset }}>
        <caption style={{ padding: 16, captionSide: "top", color: "rgba(0,0,0,.72)" }}>Material Design Viewport Breakpoints</caption>
        <Box component="thead"><Box component="tr" sx={{ textAlign: "left" }}><TableHead>Device</TableHead><TableHead>Code</TableHead><TableHead>Types</TableHead><TableHead>Range</TableHead></Box></Box>
        <Box component="tbody">{rows.map(([icon, label, code, type, range]) => <Box component="tr" key={String(code)} sx={{ borderTop: "1px solid rgba(0,0,0,.12)" }}><TableCell><Box sx={{ display: "flex", alignItems: "center", gap: 1, "& svg": { color: "rgba(0,0,0,.54)" } }}>{icon}<span>{label}</span></Box></TableCell><TableCell><strong>{code}</strong></TableCell><TableCell>{type}</TableCell><TableCell>{range}</TableCell></Box>)}</Box>
        <Box component="tfoot"><Box component="tr" sx={{ borderTop: "1px solid rgba(0,0,0,.12)" }}><Box component="td" colSpan={4} sx={{ p: 2, textAlign: "center" }}><small><em style={{ color: "#9e9e9e" }}>* -16px on Desktop</em></small></Box></Box></Box>
      </Box>
    </Box>
  );
}

function VContainer({ children, fluid = false, sx = {} }: { children: ReactNode; fluid?: boolean; sx?: object }) {
  return <Box sx={{ width: "100%", maxWidth: fluid ? "none" : { xs: "100%", sm: 540, md: 720, lg: 960, xl: 1140 }, mx: "auto", px: vuetifySpace(3), py: vuetifySpace(3), bgcolor: "#fafafa", ...sx }}>{children}</Box>;
}

function VRow({ children, noGutters = false, align, justify, sx = {} }: { children: ReactNode; noGutters?: boolean; align?: Align; justify?: Justify; sx?: object }) {
  const gutter = noGutters ? 0 : vuetifySpace(3);
  return <Box sx={{ "--vuse-grid-gutter-x": gutter, "--vuse-grid-gutter-y": gutter, display: "flex", flexWrap: "wrap", alignItems: alignMap(align), justifyContent: justifyMap(justify), mx: noGutters ? 0 : `-${gutter}`, ...sx }}>{children}</Box>;
}

function VCol({ children, cols, sm, md, lg, xl, offsetSm, offsetMd, offsetLg, order, alignSelf, sx = {} }: { children: ReactNode; cols?: ColValue; sm?: ColValue; md?: ColValue; lg?: ColValue; xl?: ColValue; offsetSm?: number; offsetMd?: number; offsetLg?: number; order?: number | "first" | "last"; alignSelf?: Align; sx?: object }) {
  return <Box sx={{ px: "var(--vuse-grid-gutter-x, 12px)", py: "var(--vuse-grid-gutter-y, 12px)", ...colWidth(cols), order: orderValue(order), alignSelf: alignMap(alignSelf), ...(sm !== undefined || offsetSm !== undefined ? { "@media (min-width:600px)": { ...(sm !== undefined ? colWidth(sm) : {}), marginLeft: offsetSm !== undefined ? pct(offsetSm) : undefined } } : {}), ...(md !== undefined || offsetMd !== undefined ? { "@media (min-width:960px)": { ...(md !== undefined ? colWidth(md) : {}), marginLeft: offsetMd !== undefined ? pct(offsetMd) : undefined } } : {}), ...(lg !== undefined || offsetLg !== undefined ? { "@media (min-width:1264px)": { ...(lg !== undefined ? colWidth(lg) : {}), marginLeft: offsetLg !== undefined ? pct(offsetLg) : undefined } } : {}), ...(xl !== undefined ? { "@media (min-width:1904px)": colWidth(xl) } : {}), ...sx }}>{children}</Box>;
}

function VSpacer() {
  return <Box sx={{ flexGrow: 1 }} />;
}

function GridCard({ children, sx = {} }: { children: ReactNode; sx?: object }) {
  return <Box sx={{ p: vuetifySpace(2), minHeight: 36, border: "1px solid rgba(0,0,0,.12)", bgcolor: "#fff", borderRadius: 0, color: "rgba(0,0,0,.87)", fontSize: 14, lineHeight: 1.45, boxShadow: "none", ...sx }}>{children}</Box>;
}

function ResponsiveColText({ xs, sm, lg }: { xs: string; sm: string; lg: string }) {
  return (
    <>
      <Box component="span" sx={{ display: "inline", "@media (min-width:600px)": { display: "none" } }}>{xs}</Box>
      <Box component="span" sx={{ display: "none", "@media (min-width:600px)": { display: "inline" }, "@media (min-width:960px)": { display: "none" } }}>{sm}</Box>
      <Box component="span" sx={{ display: "none", "@media (min-width:960px)": { display: "inline" }, "@media (min-width:1264px)": { display: "none" } }}>{xs}</Box>
      <Box component="span" sx={{ display: "none", "@media (min-width:1264px)": { display: "inline" } }}>{lg}</Box>
    </>
  );
}

function VSelect({ label, value, items, onChange }: { label: string; value: string; items: string[]; onChange: (value: string) => void }) {
  return <Box sx={{ position: "relative", pt: 1.5 }}><Typography sx={{ position: "absolute", top: 0, left: 0, fontSize: 12, color: "rgba(0,0,0,.6)" }}>{label}</Typography><Select variant="standard" value={value} onChange={(e) => onChange(e.target.value)} fullWidth sx={{ fontSize: 16 }}>{items.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}</Select></Box>;
}

function VuetifyExampleBlock({ title, description, source, children, minHeight }: { title: string; description: ReactNode; source: ExampleKey; children: () => ReactNode; minHeight: number }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return <Card sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}><Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2 }}><Typography sx={{ fontSize: 20 }}>{title}</Typography><Box sx={{ flexGrow: 1 }} /><Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((v) => !v)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip><Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip><Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((v) => !v)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip></Toolbar><Collapse in={sourceOpen} timeout={180} unmountOnExit><Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", maxHeight: { xs: "none", sm: "calc(100vh - 275px)" }, overflowY: "auto", p: 2 }}><Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box></Box></Collapse><Box sx={{ px: 2, py: 2, minHeight, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", "& .MuiBox-root": inverted ? { borderColor: "rgba(255,255,255,.16)" } : undefined }}>{description && <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography>}{children()}</Box></Card>;
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: .55, py: .18, borderRadius: .75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function TableHead({ children }: { children: ReactNode }) {
  return <Box component="th" sx={{ px: 2, py: 2, fontWeight: 500, fontSize: 14, color: "rgba(0,0,0,.72)" }}>{children}</Box>;
}

function TableCell({ children }: { children: ReactNode }) {
  return <Box component="td" sx={{ px: 2, py: 2, fontSize: 14, color: "rgba(0,0,0,.72)" }}>{children}</Box>;
}

function colWidth(value?: ColValue) {
  if (value === undefined) return { flex: "1 1 0", flexBasis: 0, maxWidth: "100%" };
  if (value === "auto") return { flex: "0 0 auto", flexBasis: "auto", maxWidth: "none" };
  if (value === "sm") return { flex: "1 1 0", flexBasis: 0, maxWidth: "100%" };
  return { flex: `0 0 ${pct(value)}`, flexBasis: pct(value), maxWidth: pct(value) };
}

function vuetifySpace(value: number) {
  return `${value * 4}px`;
}

function pct(value: number) {
  return `${(value / 12) * 100}%`;
}

function alignMap(value?: Align) {
  return value === "start" ? "flex-start" : value === "end" ? "flex-end" : value;
}

function justifyMap(value?: Justify) {
  return value === "start" ? "flex-start" : value === "end" ? "flex-end" : value;
}

function orderValue(value?: number | "first" | "last") {
  return value === "first" ? -1 : value === "last" ? 13 : value;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: .5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

const examples: Example[] = [
  { title: "Auto sizing columns", description: <>Columns will automatically take up an equal amount of space within their parent container. This can be modified using the <strong>cols</strong> prop. You can also utilize the <strong>sm</strong>, <strong>md</strong>, <strong>lg</strong>, and <strong>xl</strong> props to further define how the column will be sized in different viewport sizes.</>, source: "simple/auto", minHeight: 230, render: () => <AutoExample /> },
  { title: "Equal width columns", description: <>You can break equal width columns into multiple lines. While there are workarounds for older browser versions, there was a <Box component="a" sx={{ color: primary }}>Safari flexbox bug</Box>. This shouldn&apos;t be necessary if you&apos;re up-to-date.</>, source: "simple/equal", minHeight: 160, render: () => <EqualExample /> },
  { title: "One column width", description: <>When using the auto-layout, you can define the width of only one column and still have its siblings to automatically resize around it.</>, source: "simple/one-column-width", minHeight: 230, render: () => <OneColumnWidthExample /> },
  { title: "Variable content width", description: <>Assigning breakpoint width for columns can be configured to resize based upon the nature width of their content.</>, source: "intermediate/variable-content", minHeight: 250, render: () => <VariableContentExample /> },
  { title: "Grow and Shrink", description: <>By default, flex components will automatically fill the available space in a row or column. They will also shrink relative to the rest of the flex items in the flex container when a specific size is not designated. You can define the column width of the <CodePill>v-col</CodePill> by using the <strong>cols</strong> prop and providing a value from <strong>1 to 12</strong>.</>, source: "intermediate/grow-shrink", minHeight: 250, render: () => <GrowShrinkExample /> },
  { title: "Row and column breakpoints", description: <>Dynamically change your layout based upon resolution. <strong>(resize your screen and watch the top <CodePill>row</CodePill> layout change on sm, md, and lg breakpoints)</strong></>, source: "intermediate/row-column-breakpoint", minHeight: 250, render: () => <RowColumnBreakpointExample /> },
  { title: "Unique layouts", description: <>The power and flexibility of the Vuetify grid system allows you to create amazing user interfaces.</>, source: "intermediate/unique-layouts", minHeight: 300, render: () => <UniqueLayoutsExample /> },
  { title: "Vertical alignment", description: <>Change the vertical alignment of flex items and their parents using the <strong>align</strong> and <strong>align-self</strong> properties.</>, source: "simple/vertical-alignment", minHeight: 820, render: () => <VerticalAlignmentExample /> },
  { title: "Horizontal alignment", description: <>Change the horizontal alignment of flex items and their parents using the <strong>justify</strong> and <strong>justify-self</strong> properties.</>, source: "simple/horizontal-alignment", minHeight: 520, render: () => <HorizontalAlignmentExample /> },
  { title: "No gutters", description: <>You can remove the negative margins from <CodePill>v-row</CodePill> and the padding from its direct <CodePill>v-col</CodePill> children using the <strong>no-gutters</strong> property.</>, source: "simple/no-gutters", minHeight: 150, render: () => <NoGuttersExample /> },
  { title: "Column wrapping", description: <>When more than 12 columns are placed within a given row (that is not using the <CodePill>.flex-nowrap</CodePill> utility class), each group of extra columns will wrap onto a new line.</>, source: "intermediate/wrapping", minHeight: 260, render: () => <WrappingExample /> },
  { title: "Order classes", description: <>You can control the ordering of grid items. As with offsets, you can set different orders for different sizes. Design specialized screen layouts that accommodate to any application.</>, source: "advanced/order", minHeight: 150, render: () => <OrderExample /> },
  { title: "Order last / first", description: <>You can also designate explicitly <strong>first</strong> or <strong>last</strong> which will assign <strong>-1</strong> or <strong>13</strong> values respectively to the <CodePill>order</CodePill> CSS property.</>, source: "advanced/order-first-last", minHeight: 150, render: () => <OrderFirstLastExample /> },
  { title: "Offset", description: <>Offsets are useful for compensating for elements that may not be visible yet, or to control the position of content. Just as with breakpoints, you can set an offset for any available sizes. This allows you to fine tune your application layout precisely to your needs.</>, source: "advanced/offset", minHeight: 350, render: () => <OffsetExample /> },
  { title: "Offset breakpoint", description: <>Offset can also be applied on a per breakpoint basis.</>, source: "advanced/offset-breakpoint", minHeight: 260, render: () => <OffsetBreakpointExample /> },
  { title: "Margin utilities", description: <>Using the <Box component="a" sx={{ color: primary }}>auto margin helper utilities</Box> you can force sibling columns away from each other.</>, source: "intermediate/margin", minHeight: 380, render: () => <MarginExample /> },
  { title: "Nested grid", description: <>Grids can be nested, similar to other frameworks, in order to achieve very custom layouts.</>, source: "advanced/nested-grid", minHeight: 190, render: () => <NestedGridExample /> },
  { title: "Spacers", description: <>The <CodePill>v-spacer</CodePill> component is useful when you want to fill available space or make space between two components.</>, source: "simple/spacer", minHeight: 270, render: () => <SpacerExample /> },
];

const sourceTemplates = {
  usage: "src/demo/examples/grids/usage.vue",
  playground: "src/demo/examples/grids/playground.vue",
  "simple/auto": "src/demo/examples/grids/simple/auto.vue",
  "simple/equal": "src/demo/examples/grids/simple/equal.vue",
  "simple/one-column-width": "src/demo/examples/grids/simple/one-column-width.vue",
  "intermediate/variable-content": "src/demo/examples/grids/intermediate/variable-content.vue",
  "intermediate/grow-shrink": "src/demo/examples/grids/intermediate/grow-shrink.vue",
  "intermediate/row-column-breakpoint": "src/demo/examples/grids/intermediate/row-column-breakpoint.vue",
  "intermediate/unique-layouts": "src/demo/examples/grids/intermediate/unique-layouts.vue",
  "simple/vertical-alignment": "src/demo/examples/grids/simple/vertical-alignment.vue",
  "simple/horizontal-alignment": "src/demo/examples/grids/simple/horizontal-alignment.vue",
  "simple/no-gutters": "src/demo/examples/grids/simple/no-gutters.vue",
  "intermediate/wrapping": "src/demo/examples/grids/intermediate/wrapping.vue",
  "advanced/order": "src/demo/examples/grids/advanced/order.vue",
  "advanced/order-first-last": "src/demo/examples/grids/advanced/order-first-last.vue",
  "advanced/offset": "src/demo/examples/grids/advanced/offset.vue",
  "advanced/offset-breakpoint": "src/demo/examples/grids/advanced/offset-breakpoint.vue",
  "intermediate/margin": "src/demo/examples/grids/intermediate/margin.vue",
  "advanced/nested-grid": "src/demo/examples/grids/advanced/nested-grid.vue",
  "simple/spacer": "src/demo/examples/grids/simple/spacer.vue",
};
