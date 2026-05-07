import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Slider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { ArrowDropDown, Code, GitHub, Help, InvertColors } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import DocPage from "../../components/vuetify-docs/DocPage";
import DocText from "../../components/vuetify-docs/DocText";

type HelperSection = "Content" | "Display" | "Elevation" | "Flex" | "Float" | "Spacing";

const sections: HelperSection[] = ["Content", "Display", "Elevation", "Flex", "Float", "Spacing"];
const neuGlow = "-7px -7px 5px rgba(255,255,255,.86), 7px 7px 7px rgba(174,174,192,.30)";
const neuInset = "inset -5px -5px 6px rgba(255,255,255,.88), inset 6px 6px 8px rgba(174,174,192,.30)";
const darkPanel = "#2d2d2d";

export default function HelpersPage() {
  const [activeSection, setActiveSection] = useState<HelperSection>("Content");
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const theme = useTheme();
  const mdAndUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box className="vuse-content-wrapper">
      <DocPage
        title="Helpers"
        namespace=""
        icon={<Help />}
        breadcrumbs={[
          { label: "User Interface" },
          { label: "Helpers" },
        ]}
      >
        {mdAndUp ? (
          <Card elevation={0} sx={sectionNavSx}>
            <Stack direction="row" sx={{ minHeight: 56 }}>
              {sections.map((section) => (
                <Button key={section} onClick={() => setActiveSection(section)} sx={sectionButtonSx(activeSection === section)}>
                  {section}
                </Button>
              ))}
            </Stack>
          </Card>
        ) : (
          <>
            <Button
              onClick={(event) => setMenuAnchor(event.currentTarget)}
              startIcon={<ArrowDropDown />}
              sx={{
                mb: 3,
                color: "secondary.main",
                bgcolor: "background.default",
                boxShadow: neuGlow,
                borderRadius: 1,
                px: 2.25,
                py: 1.25,
                textTransform: "none",
                fontSize: 15,
              }}
            >
              {activeSection}
            </Button>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={() => setMenuAnchor(null)}
              PaperProps={{ sx: { minWidth: 210, bgcolor: "background.default", boxShadow: neuGlow, borderRadius: 1, backgroundImage: "none" } }}
            >
              {sections.map((section, index) => (
                <Box key={section}>
                  {index > 0 ? <Divider /> : null}
                  <MenuItem
                    selected={activeSection === section}
                    onClick={() => {
                      setActiveSection(section);
                      setMenuAnchor(null);
                    }}
                    sx={{ minHeight: 46, fontSize: 15 }}
                  >
                    {section}
                  </MenuItem>
                </Box>
              ))}
            </Menu>
          </>
        )}

        {activeSection === "Content" ? <ContentSection /> : null}
        {activeSection === "Display" ? <DisplaySection /> : null}
        {activeSection === "Elevation" ? <ElevationSection /> : null}
        {activeSection === "Flex" ? <FlexSection /> : null}
        {activeSection === "Float" ? <FloatSection /> : null}
        {activeSection === "Spacing" ? <SpacingSection /> : null}
      </DocPage>
    </Box>
  );
}

function ContentSection() {
  return (
    <SectionFrame>
      <DocHeading>Content</DocHeading>
      <DocText>Vuetify provides helper styles for rendering common HTML content with consistent Material Design spacing and typography.</DocText>
      <HelperExample title="Blockquote" source={`<blockquote class="blockquote">...`} height={190}>
        <Box component="blockquote" sx={{ m: 0, py: 1, px: 3, borderLeft: "5px solid #00acc1", color: "text.secondary", fontSize: 20, fontWeight: 300, lineHeight: 1.6 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
        </Box>
      </HelperExample>
      <HelperExample title="Paragraphs" source={`<p>...</p>`} height={210}>
        <Stack spacing={2}>
          <Typography sx={{ fontSize: 16, lineHeight: 1.65 }}>Material Design typography helpers keep text readable across dense dashboard pages.</Typography>
          <Typography sx={{ fontSize: 16, lineHeight: 1.65, color: "text.secondary" }}>The Vuse docs present these helpers as simple content samples inside soft example surfaces.</Typography>
        </Stack>
      </HelperExample>
      <HelperExample title="Code" source={`<code>npm run serve</code>`} height={170}>
        <Stack spacing={1.5}>
          <Typography>Inline code appears like <CodePill>display-1</CodePill> or <CodePill>pa-4</CodePill>.</Typography>
          <Box component="pre" sx={codeSampleSx}><code>{`const helper = "vuse";`}</code></Box>
        </Stack>
      </HelperExample>
      <HelperExample title="Variables" source={`<var>y</var> = <var>m</var><var>x</var> + <var>b</var>`} height={150}>
        <Typography sx={{ fontSize: 18 }}><Box component="var">y</Box> = <Box component="var">m</Box><Box component="var">x</Box> + <Box component="var">b</Box></Typography>
      </HelperExample>
      <HelperExample title="User input" source={`Press <kbd>Ctrl</kbd> + <kbd>C</kbd>`} height={150}>
        <Typography>To copy selected text, press <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd>.</Typography>
      </HelperExample>
    </SectionFrame>
  );
}

function DisplaySection() {
  return (
    <SectionFrame>
      <DocHeading>Display</DocHeading>
      <DocText>Display helpers control visibility and layout at each Material Design breakpoint.</DocText>
      <ViewportBreakpoints />
      <DocSubheading>Display</DocSubheading>
      <DocText>The display helpers allow you to set an element display value responsively using classes such as <CodePill>d-inline</CodePill>, <CodePill>d-block</CodePill>, and <CodePill>d-none</CodePill>.</DocText>
      <HelperExample title="Display Inline" source={displayInlineSource} height={145}>
        <Box>
          <Box sx={{ display: "inline", p: 1, bgcolor: "#6200ea", color: "#fff" }}>d-inline</Box>
          <Box sx={{ display: "inline", p: 1, bgcolor: "#000", color: "#fff" }}>d-inline</Box>
        </Box>
      </HelperExample>
      <HelperExample title="Display block" source={displayBlockSource} height={170}>
        <Stack spacing={0}>
          <Box sx={{ display: "block", p: 1, bgcolor: "#6200ea", color: "#fff" }}>d-block</Box>
          <Box sx={{ display: "block", p: 1, bgcolor: "#000", color: "#fff" }}>d-block</Box>
        </Stack>
      </HelperExample>
      <DocSubheading>Visibility</DocSubheading>
      <DocText>Conditionally display content at viewport widths using Vuetify visibility helper classes.</DocText>
      <VisibilityTable />
      <HelperExample title="Visibility" source={visibilitySource} height={140}>
        <Stack spacing={1}>
          <Typography sx={{ display: { xs: "block", lg: "none" } }}>hide on screens wider than lg</Typography>
          <Typography sx={{ display: { xs: "none", lg: "block" } }}>hide on screens smaller than lg</Typography>
        </Stack>
      </HelperExample>
      <DocSubheading>Print display</DocSubheading>
      <DocText>Print helpers change visibility only when the page is printed.</DocText>
      <HelperExample title="Print" source={printSource} height={170}>
        <Stack spacing={1}>
          <Typography>Screen Only (Hide on print only)</Typography>
          <Typography sx={{ color: "text.secondary" }}>Print Only (Hide on screen only)</Typography>
          <Typography sx={{ color: "text.secondary" }}>Hide up to large on screen, but always show on print</Typography>
        </Stack>
      </HelperExample>
    </SectionFrame>
  );
}

function ElevationSection() {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(false);

  return (
    <SectionFrame>
      <DocHeading>Elevation</DocHeading>
      <DocText>Elevation helpers apply Material Design depth using a scale from 0 through 24.</DocText>
      <HelperExample title="Usage" source={`<v-card v-for="n in 25" :elevation="n - 1" />`} height={470}>
        <Grid container spacing={2} justifyContent="center">
          {Array.from({ length: 25 }, (_, index) => (
            <Grid item xs="auto" key={index}>
              <Box sx={{ width: 100, height: 100, display: "grid", placeItems: "center", bgcolor: "#fff", borderRadius: 1, boxShadow: elevationShadow(index), fontSize: 16 }}>{index}</Box>
            </Grid>
          ))}
        </Grid>
      </HelperExample>
      <HelperExample title="Playground" source={elevationPlaygroundSource} height={215}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4}>
            <Slider min={0} max={24} value={selected} onChange={(_, value) => setSelected(value as number)} valueLabelDisplay="auto" sx={{ color: "primary.main" }} />
          </Grid>
          <Grid item xs={12} md={4} sx={{ ml: { md: "auto" } }}>
            <Box sx={{ bgcolor: "#fff", borderRadius: 1, boxShadow: elevationShadow(selected), p: 3, textAlign: "center" }}>Elevation {selected}</Box>
          </Grid>
        </Grid>
      </HelperExample>
      <HelperExample title="Dynamic elevation" source={dynamicElevationSource} height={250}>
        <Stack spacing={3} alignItems="center" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          <Box sx={{ width: "min(100%, 360px)", bgcolor: "#fff", borderRadius: 1, p: 3, textAlign: "center", boxShadow: elevationShadow(hovered ? 24 : 6), transition: "box-shadow 180ms ease" }}>Prop based elevation</Box>
          <Box sx={{ width: "min(100%, 360px)", bgcolor: "#fff", borderRadius: 1, p: 3, textAlign: "center", boxShadow: elevationShadow(hovered ? 24 : 6), transition: "box-shadow 180ms ease" }}>Class based elevation</Box>
        </Stack>
      </HelperExample>
    </SectionFrame>
  );
}

function FlexSection() {
  return (
    <SectionFrame>
      <DocHeading>Flex</DocHeading>
      <DocText>Flex helpers expose common flexbox layout patterns for rows, columns, alignment, wrapping, ordering, and growth.</DocText>
      <FlexExample title="Flexbox" source={flexboxSource}><FlexRow labels={["d-flex", "item", "item"]} /></FlexExample>
      <FlexExample title="Flexbox Inline" source={`<div class="d-inline-flex">...</div>`}><Box sx={{ display: "inline-flex", gap: 1, p: 1, bgcolor: "rgba(0,172,193,.12)" }}><DemoChip>inline</DemoChip><DemoChip>flex</DemoChip></Box></FlexExample>
      <DocSubheading>Direction</DocSubheading>
      <FlexExample title="Flexbox Direction" source={`flex-row | flex-row-reverse`}><Stack spacing={2}><FlexRow labels={["row", "item", "item"]} /><FlexRow reverse labels={["reverse", "item", "item"]} /></Stack></FlexExample>
      <FlexExample title="Flexbox Column" source={`flex-column | flex-column-reverse`}><Stack direction="row" spacing={3}><Stack spacing={1}><DemoChip>column</DemoChip><DemoChip>one</DemoChip><DemoChip>two</DemoChip></Stack><Stack spacing={1} sx={{ flexDirection: "column-reverse" }}><DemoChip>reverse</DemoChip><DemoChip>one</DemoChip><DemoChip>two</DemoChip></Stack></Stack></FlexExample>
      <DocSubheading>Justify</DocSubheading>
      <FlexExample title="Flexbox Justify" source={`justify-start | justify-center | justify-space-between`}><Stack spacing={2}><FlexLine justifyContent="flex-start" /><FlexLine justifyContent="center" /><FlexLine justifyContent="space-between" /></Stack></FlexExample>
      <DocSubheading>Align</DocSubheading>
      <FlexExample title="Flexbox Align" source={`align-start | align-center | align-end`}><Stack spacing={2}><FlexTall alignItems="flex-start" /><FlexTall alignItems="center" /><FlexTall alignItems="flex-end" /></Stack></FlexExample>
      <FlexExample title="Flexbox Align Self" source={`align-self-start | align-self-center | align-self-end`}><Box sx={{ display: "flex", gap: 1, height: 130, alignItems: "stretch" }}><DemoChip sx={{ alignSelf: "flex-start" }}>start</DemoChip><DemoChip sx={{ alignSelf: "center" }}>center</DemoChip><DemoChip sx={{ alignSelf: "flex-end" }}>end</DemoChip></Box></FlexExample>
      <DocSubheading>Margins</DocSubheading>
      <FlexExample title="Margins" source={`mr-auto | ml-auto`}><Box sx={{ display: "flex", gap: 1 }}><DemoChip>left</DemoChip><DemoChip sx={{ ml: "auto" }}>right</DemoChip></Box></FlexExample>
      <FlexExample title="Margins align items" source={`my-auto`}><Box sx={{ display: "flex", height: 120, gap: 1 }}><DemoChip>top</DemoChip><DemoChip sx={{ my: "auto" }}>middle</DemoChip><DemoChip sx={{ alignSelf: "flex-end" }}>bottom</DemoChip></Box></FlexExample>
      <DocSubheading>Wrap and order</DocSubheading>
      <FlexExample title="Flex nowrap" source={`flex-nowrap`}><Box sx={{ display: "flex", gap: 1, overflowX: "auto", flexWrap: "nowrap" }}>{["one", "two", "three", "four", "five"].map((item) => <DemoChip key={item} sx={{ minWidth: 120 }}>{item}</DemoChip>)}</Box></FlexExample>
      <FlexExample title="Flex wrap" source={`flex-wrap`}><Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>{["one", "two", "three", "four", "five"].map((item) => <DemoChip key={item} sx={{ minWidth: 120 }}>{item}</DemoChip>)}</Box></FlexExample>
      <FlexExample title="Flex wrap reverse" source={`flex-wrap-reverse`}><Box sx={{ display: "flex", gap: 1, flexWrap: "wrap-reverse", minHeight: 105 }}>{["one", "two", "three", "four", "five"].map((item) => <DemoChip key={item} sx={{ minWidth: 120 }}>{item}</DemoChip>)}</Box></FlexExample>
      <FlexExample title="Flex order" source={`order-first | order-last`}><Box sx={{ display: "flex", gap: 1 }}><DemoChip sx={{ order: 2 }}>first in markup</DemoChip><DemoChip sx={{ order: 1 }}>ordered first</DemoChip><DemoChip sx={{ order: 3 }}>last</DemoChip></Box></FlexExample>
      <DocSubheading>Align content and grow</DocSubheading>
      <FlexExample title="Flex align content" source={`align-content-start | center | space-around`}><Box sx={{ display: "flex", flexWrap: "wrap", alignContent: "space-around", gap: 1, height: 170 }}>{["start", "center", "around", "end", "stretch", "base"].map((item) => <DemoChip key={item} sx={{ width: "30%" }}>{item}</DemoChip>)}</Box></FlexExample>
      <FlexExample title="Grow and shrink" source={`flex-grow-1 | flex-shrink-0`}><Box sx={{ display: "flex", gap: 1 }}><DemoChip>auto</DemoChip><DemoChip sx={{ flexGrow: 1 }}>grow</DemoChip><DemoChip>auto</DemoChip></Box></FlexExample>
    </SectionFrame>
  );
}

function FloatSection() {
  return (
    <SectionFrame>
      <DocHeading>Float</DocHeading>
      <DocText>Float helpers apply left, right, or no floating behavior, including breakpoint-specific float classes.</DocText>
      <ViewportBreakpoints />
      <DocSubheading>Classes</DocSubheading>
      <HelperExample title="Classes" source={floatClassesSource} height={150}>
        <Box>
          <Typography sx={{ float: "left" }}>Float left on all viewport sizes</Typography><Box sx={{ clear: "both" }} />
          <Typography sx={{ float: "right" }}>Float right on all viewport sizes</Typography><Box sx={{ clear: "both" }} />
          <Typography>Don&apos;t float on all viewport sizes</Typography>
        </Box>
      </HelperExample>
      <DocSubheading>Responsive</DocSubheading>
      <HelperExample title="Responsive" source={floatResponsiveSource} height={190}>
        <Stack spacing={1}>
          <Typography>Float left on viewports sized SM (small) or wider</Typography>
          <Typography>Float left on viewports sized MD (medium) or wider</Typography>
          <Typography>Float left on viewports sized LG (large) or wider</Typography>
          <Typography>Float left on viewports sized XL (extra-large) or wider</Typography>
        </Stack>
      </HelperExample>
    </SectionFrame>
  );
}

function SpacingSection() {
  const directions = ["t", "b", "l", "r", "s", "e", "x", "y", "a"];
  const paddingSizes = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const marginSizes = ["auto", ...paddingSizes, "n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n11", "n12"];
  const [paddingDirection, setPaddingDirection] = useState("a");
  const [paddingSize, setPaddingSize] = useState("2");
  const [marginDirection, setMarginDirection] = useState("a");
  const [marginSize, setMarginSize] = useState("2");
  const padding = spacingValue(paddingSize);
  const margin = spacingValue(marginSize);

  return (
    <SectionFrame>
      <DocHeading>Spacing</DocHeading>
      <DocText>Spacing helpers apply margin and padding with short utility class names that can include breakpoint modifiers.</DocText>
      <HelperExample title="Playground" source={spacingPlaygroundSource} height={330}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Typography sx={{ fontWeight: 700, color: "primary.main" }}>p</Typography>
              <Select size="small" value={paddingDirection} onChange={(event: SelectChangeEvent) => setPaddingDirection(event.target.value)} sx={selectSx}>{directions.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}</Select>
              <Typography>-</Typography>
              <Select size="small" value={paddingSize} onChange={(event: SelectChangeEvent) => setPaddingSize(event.target.value)} sx={selectSx}>{paddingSizes.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}</Select>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Typography sx={{ fontWeight: 700, color: "primary.main" }}>m</Typography>
              <Select size="small" value={marginDirection} onChange={(event: SelectChangeEvent) => setMarginDirection(event.target.value)} sx={selectSx}>{directions.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}</Select>
              <Typography>-</Typography>
              <Select size="small" value={marginSize} onChange={(event: SelectChangeEvent) => setMarginSize(event.target.value)} sx={selectSx}>{marginSizes.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}</Select>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ bgcolor: "#ffcc80", p: 0, minHeight: 150, overflow: "hidden" }}>
              <Box sx={{ m: margin, bgcolor: "#fff", boxShadow: elevationShadow(4), borderRadius: 1 }}>
                <Box sx={{ p: padding, bgcolor: "#c5e1a5" }}>
                  <Box sx={{ bgcolor: "#fff", textAlign: "center", p: 1.5 }}>Use the controls above to try out the different spacing helpers</Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </HelperExample>
      <DocSubheading>How it works</DocSubheading>
      <DocText>The helper format combines a property, a direction, and a size: <CodePill>{"{property}{direction}-{size}"}</CodePill>.</DocText>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}><InfoCard title="Properties" items={["m - margin", "p - padding"]} /></Grid>
        <Grid item xs={12} md={4}><InfoCard title="Directions" items={["t, b, l, r", "s, e, x, y, a"]} /></Grid>
        <Grid item xs={12} md={4}><InfoCard title="Sizes" items={["0 through 12", "n1 through n12 for negative margins"]} /></Grid>
      </Grid>
      <HelperExample title="Horizontal" source={spacingHorizontalSource} height={150}>
        <Box sx={{ width: 200, mx: "auto", bgcolor: "#fff", borderRadius: 1, boxShadow: neuGlow, p: 2 }}>Centered</Box>
      </HelperExample>
      <HelperExample title="Negative margin" source={negativeMarginSource} height={250}>
        <Box>
          <Box sx={{ width: 200, height: 100, mx: "auto", border: "1px solid rgba(0,0,0,.18)", borderRadius: 1 }} />
          <Box sx={{ width: 300, maxWidth: "100%", height: 200, mt: -6, mx: "auto", bgcolor: "#fff", borderRadius: 1, boxShadow: elevationShadow(12) }} />
        </Box>
      </HelperExample>
      <DocSubheading>With breakpoint</DocSubheading>
      <DocText>Spacing helpers can be scoped to a breakpoint so padding and margins change as the viewport changes.</DocText>
      <ViewportBreakpoints />
      <HelperExample title="Responsive" source={breakpointSpacingSource} height={165}>
        <Box sx={{ width: 250, mx: { xs: 0, lg: "auto" }, p: { xs: 2, md: 4 }, bgcolor: "#fff", borderRadius: 1, boxShadow: neuGlow }}>Adjust screen size to see spacing changes</Box>
      </HelperExample>
    </SectionFrame>
  );
}

function SectionFrame({ children }: { children: ReactNode }) {
  return <Box sx={{ mt: 1 }}>{children}</Box>;
}

function DocHeading({ children }: { children: ReactNode }) {
  return <Typography component="h2" sx={{ fontSize: { xs: 28, md: 34 }, fontWeight: 400, lineHeight: 1.25, mb: 1.25 }}>{children}</Typography>;
}

function DocSubheading({ children }: { children: ReactNode }) {
  return <Typography component="h3" sx={{ fontSize: { xs: 23, md: 28 }, fontWeight: 400, lineHeight: 1.25, mt: 4, mb: 1.1 }}>{children}</Typography>;
}

function HelperExample({ title, source, children, height = 220 }: { title: string; source: string; children: ReactNode; height?: number }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card elevation={0} sx={{ mb: 3, borderRadius: 1, bgcolor: "background.default", boxShadow: neuInset, backgroundImage: "none", overflow: "hidden" }}>
      <Toolbar variant="dense" sx={{ minHeight: 54, px: { xs: 2, md: 2.5 }, bgcolor: "transparent" }}>
        <Typography sx={{ fontSize: 18, fontWeight: 500 }}>{title}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example color">
          <IconButton size="small" aria-label="Invert example color" onClick={() => setInverted((value) => !value)} sx={exampleActionSx(inverted)}><InvertColors sx={{ fontSize: 14 }} /></IconButton>
        </Tooltip>
        <Tooltip title="View on Github">
          <IconButton size="small" aria-label="View on Github" sx={exampleActionSx(false)}><GitHub sx={{ fontSize: 14 }} /></IconButton>
        </Tooltip>
        <Tooltip title="View source">
          <IconButton size="small" aria-label="View source" onClick={() => setSourceOpen((value) => !value)} sx={exampleActionSx(sourceOpen)}><Code sx={{ fontSize: 14 }} /></IconButton>
        </Tooltip>
      </Toolbar>
      {sourceOpen ? (
        <Box sx={{ bgcolor: darkPanel, color: "#fff" }}>
          <Stack direction="row" spacing={1} sx={{ p: 1 }}>
            <Box sx={{ px: 2, py: 0.8, borderRadius: 999, bgcolor: "rgba(255,255,255,.13)", fontSize: 13 }}>template</Box>
          </Stack>
          <Box component="pre" sx={{ m: 0, p: 2, borderTop: "1px solid rgba(255,255,255,.14)", fontSize: 14, lineHeight: 1.55, whiteSpace: "pre-wrap", overflowX: "auto" }}><code>{source}</code></Box>
        </Box>
      ) : null}
      <Box sx={{ minHeight: height, p: { xs: 2.5, md: 3 }, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.9)" : "inherit", transition: "background-color 180ms ease, color 180ms ease" }}>
        {children}
      </Box>
    </Card>
  );
}

function FlexExample({ title, source, children }: { title: string; source: string; children: ReactNode }) {
  return <HelperExample title={title} source={source} height={170}>{children}</HelperExample>;
}

function ViewportBreakpoints() {
  const rows = [
    ["Extra small", "xs", "small to large handset", "< 600px"],
    ["Small", "sm", "small to medium tablet", "600px > < 960px"],
    ["Medium", "md", "large tablet to laptop", "960px > < 1264px*"],
    ["Large", "lg", "desktop", "1264px* > < 1904px*"],
    ["Extra large", "xl", "4k and ultra-wides", "> 1904px*"],
  ];
  return (
    <TableCard caption="Material Design Viewport Breakpoints">
      {rows.map(([device, code, types, range]) => (
        <TableRow key={code}>
          <TableCell>{device}</TableCell><TableCell><strong>{code}</strong></TableCell><TableCell>{types}</TableCell><TableCell>{range}</TableCell>
        </TableRow>
      ))}
      <TableRow><TableCell colSpan={4} align="center"><Typography component="small" sx={{ color: "text.secondary", fontStyle: "italic" }}>* -16px on Desktop</Typography></TableCell></TableRow>
    </TableCard>
  );
}

function VisibilityTable() {
  const rows = [
    ["Hidden on all", ".d-none"],
    ["Hidden only on xs", ".d-none .d-sm-flex"],
    ["Hidden only on sm", ".d-sm-none .d-md-flex"],
    ["Hidden only on md", ".d-md-none .d-lg-flex"],
    ["Hidden only on lg", ".d-lg-none .d-xl-flex"],
    ["Hidden only on xl", ".d-xl-none"],
    ["Visible on all", ".d-flex"],
    ["Visible only on xs", ".d-flex .d-sm-none"],
    ["Visible only on sm", ".d-none .d-sm-flex .d-md-none"],
    ["Visible only on md", ".d-none .d-md-flex .d-lg-none"],
    ["Visible only on lg", ".d-none .d-lg-flex .d-xl-none"],
    ["Visible only on xl", ".d-none .d-xl-flex"],
  ];
  return (
    <TableCard headers={["Screen Size", "Class"]}>
      {rows.map(([screen, klass]) => (
        <TableRow key={screen}><TableCell>{screen}</TableCell><TableCell><CodePill>{klass}</CodePill></TableCell></TableRow>
      ))}
    </TableCard>
  );
}

function TableCard({ children, caption, headers = ["Device", "Code", "Types", "Range"] }: { children: ReactNode; caption?: string; headers?: string[] }) {
  return (
    <TableContainer component={Card} elevation={0} sx={{ mb: 3, borderRadius: 1, bgcolor: "background.default", boxShadow: neuGlow, backgroundImage: "none" }}>
      <Table>
        {caption ? <caption style={{ padding: 16, captionSide: "top", color: "rgba(0,0,0,.68)", fontSize: 16 }}>{caption}</caption> : null}
        <TableHead><TableRow>{headers.map((header) => <TableCell key={header} sx={{ fontWeight: 700 }}>{header}</TableCell>)}</TableRow></TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: 0.65, py: 0.25, borderRadius: 0.5, bgcolor: "rgba(0,0,0,.06)", color: "secondary.main", fontSize: "0.9em" }}>{children}</Box>;
}

function Kbd({ children }: { children: ReactNode }) {
  return <Box component="kbd" sx={{ px: 0.8, py: 0.35, mx: 0.25, borderRadius: 0.5, bgcolor: "#263238", color: "#fff", fontFamily: "monospace", fontSize: 14, boxShadow: "inset 0 -2px 0 rgba(255,255,255,.18)" }}>{children}</Box>;
}

function DemoChip({ children, sx = {} }: { children: ReactNode; sx?: object }) {
  return <Box sx={{ bgcolor: "#00acc1", color: "#fff", borderRadius: 1, px: 1.5, py: 1, textAlign: "center", minWidth: 72, ...sx }}>{children}</Box>;
}

function FlexRow({ labels, reverse = false }: { labels: string[]; reverse?: boolean }) {
  return <Box sx={{ display: "flex", flexDirection: reverse ? "row-reverse" : "row", gap: 1 }}>{labels.map((label, index) => <DemoChip key={`${label}-${index}`}>{label}</DemoChip>)}</Box>;
}

function FlexLine({ justifyContent }: { justifyContent: string }) {
  return <Box sx={{ display: "flex", justifyContent, gap: 1, bgcolor: "rgba(0,172,193,.08)", p: 1 }}><DemoChip>one</DemoChip><DemoChip>two</DemoChip><DemoChip>three</DemoChip></Box>;
}

function FlexTall({ alignItems }: { alignItems: string }) {
  return <Box sx={{ display: "flex", alignItems, gap: 1, height: 95, bgcolor: "rgba(0,172,193,.08)", p: 1 }}><DemoChip>one</DemoChip><DemoChip>two</DemoChip><DemoChip>three</DemoChip></Box>;
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return <Card elevation={0} sx={{ p: 2, borderRadius: 1, bgcolor: "background.default", boxShadow: neuGlow, backgroundImage: "none" }}><Typography sx={{ fontSize: 17, fontWeight: 600, mb: 1 }}>{title}</Typography>{items.map((item) => <Typography key={item} sx={{ color: "text.secondary", fontSize: 15, lineHeight: 1.7 }}>{item}</Typography>)}</Card>;
}

function spacingValue(value: string) {
  if (value === "auto") return "auto";
  const negative = value.startsWith("n");
  const numeric = Number(negative ? value.slice(1) : value);
  const px = numeric * 4;
  return `${negative ? "-" : ""}${px}px`;
}

function elevationShadow(level: number) {
  if (level === 0) return "none";
  const y = Math.min(24, 1 + level * 0.55);
  const blur = Math.min(36, 4 + level * 1.25);
  return `0 ${y}px ${blur}px rgba(38,50,56,${0.08 + Math.min(level, 24) * 0.006})`;
}

const sectionNavSx = {
  mb: 3,
  borderRadius: 1,
  bgcolor: "background.default",
  boxShadow: neuGlow,
  backgroundImage: "none",
  overflow: "hidden",
};

const sectionButtonSx = (active: boolean) => ({
  flex: 1,
  borderRadius: 0,
  minHeight: 56,
  color: active ? "secondary.main" : "text.secondary",
  textTransform: "none",
  fontSize: 15,
  fontWeight: active ? 600 : 500,
  boxShadow: active ? neuInset : "none",
  bgcolor: active ? "rgba(255,255,255,.42)" : "transparent",
  "&:hover": { bgcolor: active ? "rgba(255,255,255,.54)" : "rgba(0,172,193,.08)" },
});

const exampleActionSx = (active: boolean) => ({
  width: 23,
  height: 23,
  mx: 0.12,
  color: active ? "primary.main" : "text.secondary",
  opacity: active ? 0.75 : 0.5,
  bgcolor: "transparent",
});

const codeSampleSx = { m: 0, p: 1.5, borderRadius: 1, bgcolor: darkPanel, color: "#fff", fontSize: 14, overflowX: "auto" };
const selectSx = { minWidth: 86, bgcolor: "#fff", borderRadius: 1, boxShadow: neuInset, "& fieldset": { borderColor: "transparent" } };

const displayInlineSource = `<div class="d-inline pa-2 deep-purple accent-4 white--text">d-inline</div>
<div class="d-inline pa-2 black white--text">d-inline</div>`;
const displayBlockSource = `<div class="d-block pa-2 deep-purple accent-4 white--text">d-block</div>
<div class="d-block pa-2 black white--text">d-block</div>`;
const visibilitySource = `<div class="d-lg-none">hide on screens wider than lg</div>
<div class="d-none d-lg-block">hide on screens smaller than lg</div>`;
const printSource = `<div class="d-print-none">Screen Only (Hide on print only)</div>
<div class="d-none d-print-block">Print Only (Hide on screen only)</div>`;
const elevationPlaygroundSource = `<v-slider v-model="selected" min="0" max="24" thumb-label />
<v-card :elevation="selected">Elevation {{ selected }}</v-card>`;
const dynamicElevationSource = `<v-hover>
  <v-card :elevation="hover ? 24 : 6">Prop based elevation</v-card>
</v-hover>`;
const flexboxSource = `<div class="d-flex">...</div>`;
const floatClassesSource = `<div class="float-left">Float left on all viewport sizes</div>
<div class="float-right">Float right on all viewport sizes</div>
<div class="float-none">Don't float on all viewport sizes</div>`;
const floatResponsiveSource = `<div class="float-sm-left">Float left on SM or wider</div>
<div class="float-md-left">Float left on MD or wider</div>`;
const spacingPlaygroundSource = `<v-select v-model="paddingDirection" />
<v-select v-model="marginDirection" />
<v-card :class="[computedMargin]"><div :class="[computedPadding]" /></v-card>`;
const spacingHorizontalSource = `<v-card class="mx-auto" width="200px">Centered</v-card>`;
const negativeMarginSource = `<v-card height="100" max-width="200" outlined />
<v-card class="mt-n12 mx-auto" elevation="12" height="200" max-width="300" />`;
const breakpointSpacingSource = `<v-card class="pa-md-4 mx-lg-auto" width="250px">
  Adjust screen size to see spacing changes
</v-card>`;
