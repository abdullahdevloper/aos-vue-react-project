import { useState } from "react";
import type { ReactNode } from "react";
import { Box, Card, Grid, IconButton, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { Code, FormatColorText, GitHub, InvertColors } from "@mui/icons-material";
import DocPage from "../../components/vuetify-docs/DocPage";
import DocText from "../../components/vuetify-docs/DocText";

type TypeClass = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle-1" | "subtitle-2" | "body-1" | "body-2" | "button" | "caption" | "overline";

const neuGlow = "-7px -7px 5px rgba(255,255,255,.86), 7px 7px 7px rgba(174,174,192,.30)";
const neuInset = "inset -5px -5px 6px rgba(255,255,255,.88), inset 6px 6px 8px rgba(174,174,192,.30)";
const darkPanel = "#2d2d2d";

const typographyClasses: Array<[TypeClass, string, string, string, string, number]> = [
  ["h1", "Heading 1", "6rem", "300", "-0.09375rem", -1],
  ["h2", "Heading 2", "3.75rem", "300", "-0.03125rem", 0],
  ["h3", "Heading 3", "3rem", "400", "normal", 1],
  ["h4", "Heading 4", "2.125rem", "400", "0.015625rem", 2],
  ["h5", "Heading 5", "1.5rem", "400", "normal", 2],
  ["h6", "Heading 6", "1.25rem", "500", "0.009375rem", 3],
  ["subtitle-1", "Subtitle 1", "1rem", "400", "0.009375rem", 4],
  ["subtitle-2", "Subtitle 2", "0.875rem", "500", "0.00625rem", 4],
  ["body-1", "Body 1", "1rem", "400", "0.03125rem", 4],
  ["body-2", "Body 2", "0.875rem", "400", "0.015625rem", 4],
  ["button", "Button", "0.875rem", "500", "0.078125rem", 4],
  ["caption", "Caption", "0.75rem", "400", "0.025rem", 4],
  ["overline", "Overline", "0.75rem", "500", "0.1666666667em", 4],
];

const breakpointSizes = [
  ["devices", "all", "caption"],
  ["phone_iphone", "sm", "body-2"],
  ["laptop", "md", "body-1"],
  ["desktop_windows", "lg", "h6"],
  ["tv", "xl", "h4"],
] as const;

export default function TextTypographyPage() {
  return (
    <Box className="vuse-content-wrapper">
      <DocPage
        title="TextAndTypography"
        namespace="Styles"
        icon={<FormatColorText />}
        breadcrumbs={[
          { label: "User Interface" },
          { label: "Text & Typography" },
        ]}
      >
        <DocHeading>Text and typography</DocHeading>
        <DocText>Control text size, alignment, wrapping, overflow, transforms and more.</DocText>

        <DocHeading>Typography</DocHeading>
        <DocText>Control the size and style of text using the Typography helper classes. These values are based upon the Material Design type specification.</DocText>
        <TypographyExample />
        <DocText>These classes can be applied to all breakpoints from <CodePill>xs</CodePill> to <CodePill>xl</CodePill>. When using a base class, <CodePill>.text-{"{value}"}</CodePill>, it is inferred to be <CodePill>.text-{"{value}"}-xs</CodePill>.</DocText>
        <BulletList items={["`.text-{value}` for `xs`", "`.text-{breakpoint}-{value}` for `sm`, `md`, `lg` and `xl`"]} />
        <DocText>The <em>value</em> property is one of:</DocText>
        <InlineCodeList items={["h1", "h2", "h3", "h4", "h5", "h6", "subtitle-1", "subtitle-2", "body-1", "body-2", "button", "caption", "overline"]} />
        <DocText>The following example demonstrates how the various sizes would appear at different breakpoints:</DocText>
        <TypographyBreakpointsExample />

        <DocHeading>Text alignment</DocHeading>
        <DocText>Alignment helper classes allow you to easily re-align text.</DocText>
        <TextExample source={alignJustifySource} height={230}>
          <Typography sx={{ textAlign: "justify", fontSize: 16, lineHeight: 1.65 }}>
            Morbi mattis ullamcorper velit. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Fusce convallis metus id felis luctus adipiscing. Aenean massa. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nulla consequat massa quis enim. Praesent venenatis metus at tortor pulvinar varius.
          </Typography>
        </TextExample>
        <DocText>There are also available alignment classes that support responsive displays.</DocText>
        <TextExample source={alignAllSource} height={310}>
          <Stack spacing={1}>
            <Typography sx={{ textAlign: "left" }}>Left aligned text on all viewport sizes.</Typography>
            <Typography sx={{ textAlign: "center" }}>Center aligned text on all viewport sizes.</Typography>
            <Typography sx={{ textAlign: "right" }}>Right aligned text on all viewport sizes.</Typography>
            <Typography sx={{ textAlign: { xs: "inherit", sm: "left" } }}>Left aligned text on viewports sized SM (small) or wider.</Typography>
            <Typography sx={{ textAlign: { xs: "inherit", md: "left" } }}>Left aligned text on viewports sized MD (medium) or wider.</Typography>
            <Typography sx={{ textAlign: { xs: "inherit", lg: "left" } }}>Left aligned text on viewports sized LG (large) or wider.</Typography>
            <Typography sx={{ textAlign: { xs: "inherit", xl: "left" } }}>Left aligned text on viewports sized XL (extra-large) or wider.</Typography>
          </Stack>
        </TextExample>

        <DocHeading>Text decoration</DocHeading>
        <DocText>Remove text decoration with the <CodePill>.text-decoration-none</CodePill> class or add an <em>overline, underline or line-through</em> by using <CodePill>.text-decoration-overline</CodePill>, <CodePill>.text-decoration-underline</CodePill>, and <CodePill>.text-decoration-line-through</CodePill>.</DocText>
        <TextExample source={decorationSource} height={210}>
          <Stack spacing={1.25}>
            <Typography component="a" href="#" sx={{ color: "primary.main", textDecoration: "none" }}>Non-underlined link</Typography>
            <Typography sx={{ textDecoration: "line-through" }}>Line-through text</Typography>
            <Typography sx={{ textDecoration: "overline" }}>Overline text</Typography>
            <Typography sx={{ textDecoration: "underline" }}>Underline text</Typography>
          </Stack>
        </TextExample>

        <DocHeading>Text wrapping and overflow</DocHeading>
        <DocText>You can prevent wrapping text with the <CodePill>.text-no-wrap</CodePill> utility class.</DocText>
        <TextExample source={noWrapSource} height={150}>
          <Box sx={{ width: "8rem", whiteSpace: "nowrap", bgcolor: "rgba(86, 61, 124,.15)", border: "1px solid rgba(86, 61, 124,.15)" }}>This text should overflow the parent.</Box>
        </TextExample>
        <DocText>Longer content can be truncated with a text ellipsis. <strong>Requires</strong> <CodePill>display: inline-block</CodePill> <strong>or</strong> <CodePill>display: block</CodePill>.</DocText>
        <TextExample source={truncateSource} height={190}>
          <Stack spacing={2}>
            <Box sx={{ width: "16.666%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus.</Box>
            <Box component="span" sx={{ display: "inline-block", maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus.</Box>
          </Stack>
        </TextExample>

        <DocHeading>Text transform</DocHeading>
        <DocText>Text can be transformed with text capitalization classes.</DocText>
        <TextExample source={transformSource} height={170}>
          <Stack spacing={1}>
            <Typography sx={{ textTransform: "lowercase" }}>Lowercased text.</Typography>
            <Typography sx={{ textTransform: "uppercase" }}>Uppercased text.</Typography>
            <Typography sx={{ textTransform: "capitalize" }}>CapiTaliZed text.</Typography>
          </Stack>
        </TextExample>
        <DocText>Text breaking and the removal of <CodePill>text-transform</CodePill> is also possible. In the first example, the <CodePill>text-transform: uppercase</CodePill> custom class is overwritten and allows the text casing to remain. In the second example, we break up a longer word to fit the available space.</DocText>
        <TextExample source={breakSource} height={170}>
          <Stack spacing={1}>
            <Typography sx={{ textTransform: "none" }}>Random TEXT cApitaLization</Typography>
            <Typography sx={{ maxWidth: "4rem", overflowWrap: "break-word" }}>SUBDERMATOGLYPHIC</Typography>
          </Stack>
        </TextExample>

        <DocHeading>Font weights and italics</DocHeading>
        <DocText>Material design, by default, supports <strong>100, 300, 400, 500, 700, 900</strong> font weights and italicized text.</DocText>
        <TextExample source={weightsSource} height={265}>
          <Stack spacing={1}>
            <Typography sx={{ fontWeight: 900 }}>Black text.</Typography>
            <Typography sx={{ fontWeight: 700 }}>Bold text.</Typography>
            <Typography sx={{ fontWeight: 500 }}>Medium weight text.</Typography>
            <Typography sx={{ fontWeight: 400 }}>Normal weight text.</Typography>
            <Typography sx={{ fontWeight: 300 }}>Light weight text.</Typography>
            <Typography sx={{ fontWeight: 100 }}>Thin weight text.</Typography>
            <Typography sx={{ fontStyle: "italic" }}>Italic text.</Typography>
          </Stack>
        </TextExample>

        <DocHeading>Text opacity</DocHeading>
        <DocText>Opacity helper classes allow you to easily adjust the emphasis of text. <CodePill>text--primary</CodePill> has the same opacity as default text. <CodePill>text--secondary</CodePill> is used for hints and helper text. De-emphasise text with <CodePill>text--disabled</CodePill>.</DocText>
        <TextExample source={opacitySource} height={165}>
          <Stack spacing={1}>
            <Typography sx={{ color: "rgba(0,0,0,.87)" }}>High-emphasis has an opacity of 87%.</Typography>
            <Typography sx={{ color: "rgba(0,0,0,.60)" }}>Medium-emphasis text and hint text have opacities of 60%.</Typography>
            <Typography sx={{ color: "rgba(0,0,0,.37)" }}>Disabled text has an opacity of 37%.</Typography>
          </Stack>
        </TextExample>

        <DocHeading>RTL Alignment</DocHeading>
        <DocText>When using RTL, you may want to keep the alignment regardless of the <strong>rtl</strong> designation. This can be achieved using text alignment helper classes in the following format: <CodePill>text-&lt;breakpoint&gt;-&lt;direction&gt;</CodePill>, where breakpoint can be <CodePill>sm</CodePill>, <CodePill>md</CodePill>, <CodePill>lg</CodePill>, or <CodePill>xl</CodePill> and direction can be <CodePill>left</CodePill> or <CodePill>right</CodePill>. You may also want alignment to respond to rtl which can be done using directions <CodePill>start</CodePill> and <CodePill>end</CodePill>.</DocText>
        <TextExample source={rtlSource} height={360}>
          <Stack spacing={1}>
            <Typography sx={{ fontSize: 14, fontWeight: 500, textAlign: "center" }}>Agnostic RTL Alignment</Typography>
            <Typography>Left aligned text on viewports sized SM (small) or wider for rtl or ltr.</Typography>
            <Typography>Left aligned text on viewports sized MD (medium) or wider for rtl or ltr.</Typography>
            <Typography sx={{ textAlign: { lg: "right" } }}>Right aligned text on viewports sized LG (large) or wider for rtl or ltr.</Typography>
            <Typography>Left aligned text on viewports sized XL (extra-large) or wider for rtl or ltr.</Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 500, textAlign: "center", mt: 2 }}>Responsive RTL Alignment</Typography>
            <Typography sx={{ textAlign: "start" }}>Left aligned text on ltr and right aligned on rtl.</Typography>
            <Typography sx={{ textAlign: "end" }}>Right aligned text on ltr and left aligned on rtl.</Typography>
          </Stack>
        </TextExample>
      </DocPage>
    </Box>
  );
}

function TypographyExample() {
  const [active, setActive] = useState<TypeClass>("h1");
  return (
    <TextExample source={typographySource} height={640}>
      <Box sx={{ maxHeight: 600, overflowY: "auto", bgcolor: "#fff" }}>
        {typographyClasses.map(([klass, label, size, weight, spacing]) => {
          const selected = active === klass;
          return (
            <Box key={klass} onClick={() => setActive(klass)} sx={{ cursor: "pointer", px: 2, pt: 2, pb: 1.5, bgcolor: selected ? "#f5f5f5" : "transparent", transition: "background-color 160ms ease" }}>
              <Typography sx={{ ...typeSx(klass), mb: selected ? 2 : 0, transition: "margin 180ms ease" }}>{label}</Typography>
              {selected ? (
                <Grid container spacing={2} sx={{ maxWidth: 350 }}>
                  <Spec label="Font" value="Roboto" />
                  <Spec label="Weight" value={weight} />
                  <Spec label="Size" value={size} />
                  <Spec label="Letter spacing" value={spacing} />
                </Grid>
              ) : null}
            </Box>
          );
        })}
      </Box>
    </TextExample>
  );
}

function TypographyBreakpointsExample() {
  const [model, setModel] = useState<TypeClass>("caption");
  const current = breakpointSizes.find(([, , size]) => size === model) || breakpointSizes[0];
  const typeClass = current[1] === "all" ? `.text-${model}` : `.text-${current[1]}-${model}`;
  return (
    <TextExample source={typographyBreakpointsSource} height={310}>
      <Stack alignItems="center" spacing={2}>
        <Stack direction="row" flexWrap="wrap" justifyContent="center" sx={{ p: 1 }}>
          {breakpointSizes.map(([icon, bp, size]) => {
            const active = model === size;
            return (
              <Box key={size} onClick={() => setModel(size)} sx={{ m: 1.5, p: 0.8, textAlign: "center", cursor: "pointer", color: active ? "text.primary" : "text.secondary", boxShadow: active ? "0 1px 4px rgba(38,50,56,.18)" : "none", transition: "box-shadow 160ms ease, color 160ms ease", "&:hover": { color: "text.primary", boxShadow: "0 1px 4px rgba(38,50,56,.18)" } }}>
                <Box component="span" sx={{ fontFamily: "Material Icons", fontSize: 26, display: "block", lineHeight: 1.1, mb: 0.5 }}>{icon}</Box>
                <Typography sx={{ fontSize: 12 }}>{bp}</Typography>
              </Box>
            );
          })}
        </Stack>
        <Typography sx={{ fontSize: 24, textAlign: "center" }}><CodePill>{typeClass}</CodePill></Typography>
        <Card elevation={0} sx={{ width: "100%", maxWidth: 550, minHeight: 76, display: "flex", alignItems: "center", justifyContent: "center", p: 2, border: "1px solid rgba(38,50,56,.18)", boxShadow: "none", backgroundImage: "none" }}>
          <Typography sx={typeSx(model)}>Example Heading</Typography>
        </Card>
      </Stack>
    </TextExample>
  );
}

function TextExample({ source, children, height }: { source: string; children: ReactNode; height: number }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card elevation={0} sx={{ mb: 3, borderRadius: 1, bgcolor: "background.default", boxShadow: neuInset, backgroundImage: "none", overflow: "hidden" }}>
      <Toolbar variant="dense" sx={{ minHeight: 52, px: { xs: 2, md: 2.5 }, bgcolor: "transparent" }}>
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
      {sourceOpen ? <SourcePanel source={source} /> : null}
      <Box sx={{ minHeight: height, p: { xs: 2.5, md: 3 }, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.9)" : "inherit", transition: "background-color 180ms ease, color 180ms ease" }}>
        {children}
      </Box>
    </Card>
  );
}

function SourcePanel({ source }: { source: string }) {
  return (
    <Box sx={{ bgcolor: darkPanel, color: "#fff" }}>
      <Stack direction="row" spacing={1} sx={{ p: 1 }}>
        <Box sx={{ px: 2, py: 0.8, borderRadius: 999, bgcolor: "rgba(255,255,255,.13)", fontSize: 13 }}>template</Box>
      </Stack>
      <Box component="pre" sx={{ m: 0, p: 2, borderTop: "1px solid rgba(255,255,255,.14)", fontSize: 14, lineHeight: 1.55, whiteSpace: "pre-wrap", overflowX: "auto" }}><code>{source}</code></Box>
    </Box>
  );
}

function DocHeading({ children }: { children: ReactNode }) {
  return <Typography component="h2" sx={{ fontSize: { xs: 28, md: 34 }, fontWeight: 400, lineHeight: 1.25, mt: 3.5, mb: 1.25 }}>{children}</Typography>;
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: 0.65, py: 0.25, borderRadius: 0.5, bgcolor: "rgba(0,0,0,.06)", color: "secondary.main", fontSize: "0.9em" }}>{children}</Box>;
}

function BulletList({ items }: { items: string[] }) {
  return <Box component="ul" sx={{ color: "text.secondary", fontSize: 17, lineHeight: 1.7, mb: 3 }}>{items.map((item) => <li key={item}><CodePill>{item.replace(/`/g, "")}</CodePill></li>)}</Box>;
}

function InlineCodeList({ items }: { items: string[] }) {
  return <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 3 }}>{items.map((item) => <CodePill key={item}>{item}</CodePill>)}</Stack>;
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <Grid item xs={6} sm={3}>
      <Typography sx={{ color: "text.secondary", fontSize: 12, mb: 1 }}>{label}</Typography>
      <Typography sx={{ fontSize: 13, fontWeight: 500 }}>{value}</Typography>
    </Grid>
  );
}

function typeSx(klass: TypeClass) {
  const found = typographyClasses.find(([item]) => item === klass);
  const size = found?.[2] || "1rem";
  const weight = found?.[3] || "400";
  const spacing = found?.[4] || "normal";
  return {
    fontSize: `clamp(${klass === "h1" ? "3rem" : klass === "h2" ? "2.4rem" : "0.75rem"}, ${size}, ${size})`,
    fontWeight: Number(weight),
    letterSpacing: spacing === "normal" ? 0 : spacing,
    lineHeight: klass === "h1" || klass === "h2" ? 1.05 : 1.25,
    textTransform: klass === "button" || klass === "overline" ? "uppercase" : "none",
  };
}

const exampleActionSx = (active: boolean) => ({
  width: 23,
  height: 23,
  mx: 0.12,
  color: active ? "primary.main" : "text.secondary",
  opacity: active ? 0.75 : 0.5,
  bgcolor: "transparent",
});

const typographySource = `<v-item-group mandatory>
  <v-item v-for="[c, text, size, weight, spacing] in classes">
    <v-sheet @click="toggle">
      <div :class="\`text-\${c}\`">{{ text }}</div>
    </v-sheet>
  </v-item>
</v-item-group>`;
const typographyBreakpointsSource = `<v-item-group v-model="model" mandatory>
  <v-item v-for="[icon, bp, size] in sizes" :value="size">...</v-item>
</v-item-group>
<div :class="\`text-\${model}\`">Example Heading</div>`;
const alignJustifySource = `<p class="text-justify">Morbi mattis ullamcorper velit...</p>`;
const alignAllSource = `<p class="text-left">Left aligned text on all viewport sizes.</p>
<p class="text-center">Center aligned text on all viewport sizes.</p>
<p class="text-right">Right aligned text on all viewport sizes.</p>`;
const decorationSource = `<a href="#" class="text-decoration-none">Non-underlined link</a>
<div class="text-decoration-line-through">Line-through text</div>
<div class="text-decoration-overline">Overline text</div>
<div class="text-decoration-underline">Underline text</div>`;
const noWrapSource = `<div class="text-no-wrap text-example" style="width: 8rem;">
  This text should overflow the parent.
</div>`;
const truncateSource = `<div class="col-2 text-truncate">Suspendisse faucibus...</div>
<span class="d-inline-block text-truncate" style="max-width: 150px;">Suspendisse faucibus...</span>`;
const transformSource = `<p class="text-lowercase">Lowercased text.</p>
<p class="text-uppercase">Uppercased text.</p>
<p class="text-capitalize">CapiTaliZed text.</p>`;
const breakSource = `<p class="custom-transform-class text-none">Random TEXT cApitaLization</p>
<p class="text-break" style="max-width: 4rem;">SUBDERMATOGLYPHIC</p>`;
const weightsSource = `<p class="font-weight-black">Black text.</p>
<p class="font-weight-bold">Bold text.</p>
<p class="font-italic">Italic text.</p>`;
const opacitySource = `<p class="text--primary">High-emphasis has an opacity of 87%.</p>
<p class="text--secondary">Medium-emphasis text and hint text have opacities of 60%.</p>
<p class="text--disabled">Disabled text has an opacity of 37%.</p>`;
const rtlSource = `<p class="subtitle-2 text-center">Agnostic RTL Alignment</p>
<p class="text-sm-left">Left aligned text on viewports sized SM or wider.</p>
<p class="text-start">Left aligned text on ltr and right aligned on rtl.</p>
<p class="text-end">Right aligned text on ltr and left aligned on rtl.</p>`;
