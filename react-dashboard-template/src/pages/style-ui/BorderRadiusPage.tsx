import { useState } from "react";
import type { ReactNode } from "react";
import { Box, Card, Grid, IconButton, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { Code, ContentCopy, GitHub, InvertColors, RoundedCorner } from "@mui/icons-material";
import DocPage from "../../components/vuetify-docs/DocPage";
import DocText from "../../components/vuetify-docs/DocText";

const neuGlow = "-7px -7px 5px rgba(255,255,255,.86), 7px 7px 7px rgba(174,174,192,.30)";
const neuInset = "inset -5px -5px 6px rgba(255,255,255,.88), inset 6px 6px 8px rgba(174,174,192,.30)";
const darkPanel = "#2d2d2d";

export default function BorderRadiusPage() {
  return (
    <Box className="vuse-content-wrapper">
      <DocPage
        title="BorderRadius"
        namespace="Styles"
        icon={<RoundedCorner />}
        breadcrumbs={[
          { label: "Components" },
          { label: "Vuetify" },
          { label: "Border Radius" },
        ]}
      >
        <DocHeading>Border Radius</DocHeading>
        <DocText>Use border utilities to quickly style the border-radius of any element.</DocText>

        <DocHeading>Rounded corners</DocHeading>
        <DocText>
          The <strong>rounded</strong> helper classes allow you to modify the <em>border radius</em> of an element. Use the <CodePill>.rounded-sm</CodePill>, <CodePill>.rounded</CodePill>, <CodePill>.rounded-lg</CodePill>, and <CodePill>.rounded-xl</CodePill> to add a border radius of varying size.
        </DocText>
        <RadiusExample title="" source={roundedSource}>
          <RadiusGrid>
            {[
              [".rounded-sm", 2],
              [".rounded", 4],
              [".rounded-lg", 8],
              [".rounded-xl", 24],
            ].map(([label, radius]) => (
              <Grid item xs={12} md={2} key={label}>
                <RadiusTile label={label as string} radius={radius as number} />
              </Grid>
            ))}
          </RadiusGrid>
        </RadiusExample>

        <DocHeading>Pill and Circle</DocHeading>
        <DocText>You can create pills with the <CodePill>.rounded-pill</CodePill> class and circles with the <CodePill>.rounded-circle</CodePill> class.</DocText>
        <RadiusExample title="" source={pillCircleSource} height={176}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={3} justifyContent="center" alignItems="center">
            <ShapeTile width={128} height={64} radius={9999}>Pill</ShapeTile>
            <ShapeTile width={64} height={64} radius="50%">Circle</ShapeTile>
          </Stack>
        </RadiusExample>

        <DocHeading>Removing Border Radius</DocHeading>
        <DocText>
          Use the <CodePill>.rounded-0</CodePill> helper class to <em>remove</em> all of an elements radius or select by side or corner; e.g. <CodePill>.rounded-l-0</CodePill> and <CodePill>.rounded-tr-0</CodePill>.
        </DocText>
        <RadiusExample title="" source={removingSource} height={168}>
          <RadiusGrid>
            <Grid item xs={12} md={2}>
              <RadiusTile label=".rounded-0" radius={0} />
            </Grid>
          </RadiusGrid>
        </RadiusExample>

        <DocHeading>Rounding sides separately</DocHeading>
        <DocText>
          Border radius is configurable on a per side basis using the infix classes, <strong>t, r, b, l</strong>; e.g. <CodePill>.rounded-br-xl</CodePill> and <CodePill>.rounded-tr</CodePill>.
        </DocText>
        <RadiusExample title="" source={bySideSource}>
          <RadiusGrid>
            {[
              [".rounded-t-xl", { borderTopLeftRadius: 24, borderTopRightRadius: 24 }],
              [".rounded-r-xl", { borderTopRightRadius: 24, borderBottomRightRadius: 24 }],
              [".rounded-b-xl", { borderBottomRightRadius: 24, borderBottomLeftRadius: 24 }],
              [".rounded-l-xl", { borderTopLeftRadius: 24, borderBottomLeftRadius: 24 }],
            ].map(([label, sx]) => (
              <Grid item xs={12} md={2} key={label as string}>
                <RadiusTile label={label as string} sx={sx as object} />
              </Grid>
            ))}
          </RadiusGrid>
        </RadiusExample>

        <DocHeading>Rounding corners separately</DocHeading>
        <DocText>
          Border radius is configurable on a per corner basis using the infix classes, <strong>tl, tr, br, bl</strong>; e.g. <CodePill>.rounded-br-xl</CodePill> and <CodePill>.rounded-tr</CodePill>.
        </DocText>
        <RadiusExample title="" source={cornersSource}>
          <RadiusGrid>
            {[
              [".rounded-tl-xl", { borderTopLeftRadius: 24 }],
              [".rounded-tr-xl", { borderTopRightRadius: 24 }],
              [".rounded-br-xl", { borderBottomRightRadius: 24 }],
              [".rounded-bl-xl", { borderBottomLeftRadius: 24 }],
            ].map(([label, sx]) => (
              <Grid item xs={12} md={2} key={label as string}>
                <RadiusTile label={label as string} sx={sx as object} />
              </Grid>
            ))}
          </RadiusGrid>
        </RadiusExample>

        <DocHeading>Customizing</DocHeading>
        <DocText>
          Configure or disable the border radius helper classes. Requires the use of the vue-cli-plugin-vuetify library and a configured <CodePill>variables.s(c|a)ss</CodePill> file. Additional information on how to configure variables is located on the SASS Variables documentation page.
        </DocText>
        <DocText>Rounded sizes are based off of the <CodePill>$border-radius-root</CodePill> variable which has a default value of <strong>0.25rem</strong>.</DocText>
        <CodePanel code={defaultRoundedVariables} lang="sass" value="sass_default_rounded_variables" />

        <DocSubheading>Overwriting Radiuses</DocSubheading>
        <DocText>You can change or add <em>border-radius</em> sizes by adding a list named <CodePill>$rounded</CodePill> in your project&apos;s <CodePill>variables</CodePill> file.</DocText>
        <CodePanel code={changingRoundedVariables} lang="sass" value="sass_changing_rounded_variables" />
      </DocPage>
    </Box>
  );
}

function DocHeading({ children }: { children: ReactNode }) {
  return <Typography component="h2" sx={{ fontSize: { xs: 28, md: 34 }, fontWeight: 400, lineHeight: 1.25, mt: 3.5, mb: 1.25 }}>{children}</Typography>;
}

function DocSubheading({ children }: { children: ReactNode }) {
  return <Typography component="h3" sx={{ fontSize: { xs: 22, md: 26 }, fontWeight: 400, lineHeight: 1.25, mt: 3.5, mb: 1.15 }}>{children}</Typography>;
}

function RadiusExample({ title, source, children, height = 190 }: { title: string; source: string; children: ReactNode; height?: number }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card elevation={0} sx={{ mb: 3, borderRadius: 1, bgcolor: "background.default", boxShadow: neuInset, backgroundImage: "none", overflow: "hidden" }}>
      <Toolbar variant="dense" sx={{ minHeight: 52, px: { xs: 2, md: 2.5 }, bgcolor: "transparent" }}>
        {title ? <Typography sx={{ fontSize: 18, fontWeight: 500 }}>{title}</Typography> : null}
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

function RadiusGrid({ children }: { children: ReactNode }) {
  return <Grid container spacing={3} justifyContent="center">{children}</Grid>;
}

function RadiusTile({ label, radius = 0, sx = {} }: { label: string; radius?: number; sx?: object }) {
  return <Box sx={{ p: 3, minHeight: 72, display: "grid", placeItems: "center", textAlign: "center", bgcolor: "#e0e0e0", color: "#263238", borderRadius: radius, fontSize: 14, lineHeight: 1.35, ...sx }}>{label}</Box>;
}

function ShapeTile({ children, width, height, radius }: { children: ReactNode; width: number; height: number; radius: number | string }) {
  return <Box sx={{ width, height, borderRadius: radius, display: "inline-flex", alignItems: "center", justifyContent: "center", textAlign: "center", bgcolor: "#e0e0e0", color: "#263238", fontSize: 15 }}>{children}</Box>;
}

function CodePanel({ code, lang, value }: { code: string; lang: string; value: string }) {
  const [copied, setCopied] = useState(false);
  function copyCode() {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    });
  }
  return (
    <Card sx={{ position: "relative", bgcolor: darkPanel, color: "#fff", borderRadius: 1, boxShadow: "none", backgroundImage: "none", mb: 3, overflow: "hidden" }}>
      <Box component="pre" sx={{ m: 0, p: 2.25, overflowX: "auto", fontFamily: "'Inconsolata', 'Roboto Mono', monospace", fontSize: 15, lineHeight: 1.55, whiteSpace: "pre-wrap" }}><code>{code}</code></Box>
      <Tooltip title="Copy code">
        <IconButton onClick={copyCode} aria-label="Copy code" sx={{ position: "absolute", top: 0, right: 0, width: 30, height: 30, color: "rgba(255,255,255,.78)" }}><ContentCopy sx={{ fontSize: 17 }} /></IconButton>
      </Tooltip>
      {copied ? <Typography sx={{ position: "absolute", top: 7, right: 38, fontSize: 13, color: "rgba(255,255,255,.86)" }}>Copied</Typography> : null}
      <Typography sx={{ position: "absolute", bottom: 0, right: 0, px: 1.5, py: 0.85, fontSize: 12, color: "rgba(255,255,255,.56)" }}>{value}</Typography>
      <Typography sx={{ position: "absolute", top: 5, right: 44, fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,.18)", textTransform: "uppercase" }}>{lang}</Typography>
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

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: 0.65, py: 0.25, borderRadius: 0.5, bgcolor: "rgba(0,0,0,.06)", color: "secondary.main", fontSize: "0.9em" }}>{children}</Box>;
}

const exampleActionSx = (active: boolean) => ({
  width: 23,
  height: 23,
  mx: 0.12,
  color: active ? "primary.main" : "text.secondary",
  opacity: active ? 0.75 : 0.5,
  bgcolor: "transparent",
});

const roundedSource = `<v-container>
  <v-row justify="center">
    <v-col v-for="value in ['-sm', '', '-lg', '-xl']" cols="12" md="2">
      <div :class="\`rounded\${value}\`" class="pa-6 text-center grey lighten-2" />
    </v-col>
  </v-row>
</v-container>`;

const pillCircleSource = `<v-responsive class="rounded-pill" height="64" width="128">Pill</v-responsive>
<v-responsive class="rounded-circle" height="64" width="64">Circle</v-responsive>`;

const removingSource = `<div class="pa-6 text-center grey lighten-2 rounded-0">.rounded-0</div>`;

const bySideSource = `<div class="rounded-t-xl">.rounded-t-xl</div>
<div class="rounded-r-xl">.rounded-r-xl</div>
<div class="rounded-b-xl">.rounded-b-xl</div>
<div class="rounded-l-xl">.rounded-l-xl</div>`;

const cornersSource = `<div class="rounded-tl-xl">.rounded-tl-xl</div>
<div class="rounded-tr-xl">.rounded-tr-xl</div>
<div class="rounded-br-xl">.rounded-br-xl</div>
<div class="rounded-bl-xl">.rounded-bl-xl</div>`;

const defaultRoundedVariables = `$rounded: (
  0: 0,
  'sm': $border-radius-root / 2,
  null: $border-radius-root,
  'lg': $border-radius-root * 2,
  'xl': $border-radius-root * 6,
  'pill': 9999px,
  'circle': 50%
);`;

const changingRoundedVariables = `$rounded: (
  'sm': $border-radius-root / 3,
  'lg': $border-radius-root * 2
);`;
