import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Box, Card, CardContent, Grid, IconButton, InputAdornment, Stack, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { Code, ColorLens, ContentCopy, GitHub, InvertColors, Palette, Search } from "@mui/icons-material";
import DocPage from "../../components/vuetify-docs/DocPage";
import DocText from "../../components/vuetify-docs/DocText";

type ColorFamily = Record<string, string>;

const neuInset = "inset -5px -5px 6px rgba(255,255,255,.88), inset 6px 6px 8px rgba(174,174,192,.30)";
const neuGlow = "-7px -7px 5px rgba(255,255,255,.86), 7px 7px 7px rgba(174,174,192,.30)";
const darkPanel = "#2d2d2d";

export default function ColorsPage() {
  const [search, setSearch] = useState("");
  const filteredColors = useMemo(() => {
    const query = search.trim().toLowerCase();
    return Object.entries(vuetifyColors).filter(([key]) => kebab(key).includes(query));
  }, [search]);

  return (
    <Box className="vuse-content-wrapper">
      <DocPage
        title="Colors"
        namespace="Styles"
        icon={<ColorLens />}
        breadcrumbs={[
          { label: "Style & User Interface" },
          { label: "Color" },
        ]}
      >
        <TextField
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          label="Search"
          fullWidth
          variant="filled"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ fontSize: 21 }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Palette sx={{ fontSize: 21 }} />
              </InputAdornment>
            ),
          }}
          sx={searchFieldSx}
        />

        <Grid container spacing={3} sx={{ mt: 1 }}>
          {filteredColors.map(([family, shades]) => (
            <Grid item xs={12} md={6} lg={4} key={family}>
              <ColorFamilyColumn family={kebab(family)} shades={shades} />
            </Grid>
          ))}
        </Grid>

        <DocsSection title="Javascript color pack" text="Vuetify has an optional javascript color pack that you can import and use within your application. This can also be used to help define your application's theme.">
          <CodePanel code={javascriptColorPackSnippet} lang="js" value="js/vuetify_color_pack.txt" />
        </DocsSection>

        <DocsSection title="Sass color pack" text="While convenient, the color pack increases the CSS export size by ~30kb. Some projects may only require the default provided classes that are created at run-time from the Vuetify bootstrap. To disable this feature, you will have to manually import and build the main sass file. This will require a Sass loader and a .sass/.scss file entry.">
          <CodePanel code={sassColorPackSnippet} lang="sass" value="sass/vuetify_color_pack.txt" />
        </DocsSection>

        <ColorClassesExample />
        <DocText>Text colors also support <strong>darken</strong> and <strong>lighten</strong> variants using <code>text--{"{lighten|darken}"}-{"{n}"}</code></DocText>
      </DocPage>
    </Box>
  );
}

function ColorFamilyColumn({ family, shades }: { family: string; shades: ColorFamily }) {
  const baseColor = shades.base || (family === "shades" ? "#fff" : "#f2f3f7");
  return (
    <Box>
      <Card
        elevation={0}
        sx={{
          borderRadius: 0,
          boxShadow: "none",
          border: "1px solid rgba(111,125,133,.22)",
          bgcolor: baseColor,
          color: readableText(baseColor),
          backgroundImage: "none",
        }}
      >
        <CardContent sx={{ py: 2, px: 2 }}>
          <Typography sx={{ fontSize: 20, fontWeight: 500, lineHeight: 1.35 }}>{family}</Typography>
        </CardContent>
      </Card>
      {Object.entries(shades).map(([shade, value]) => {
        const label = family === "shades" ? (shade === "base" ? "" : formatShade(shade)) : `${family} ${shade === "base" ? "" : formatShade(shade)}`.trim();
        return (
          <Box
            key={shade}
            sx={{
              minHeight: 48,
              bgcolor: value === "transparent" ? "transparent" : value,
              backgroundImage:
                value === "transparent"
                  ? "linear-gradient(45deg, rgba(111,125,133,.16) 25%, transparent 25%), linear-gradient(-45deg, rgba(111,125,133,.16) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(111,125,133,.16) 75%), linear-gradient(-45deg, transparent 75%, rgba(111,125,133,.16) 75%)"
                  : "none",
              backgroundSize: value === "transparent" ? "18px 18px" : undefined,
              backgroundPosition: value === "transparent" ? "0 0, 0 9px, 9px -9px, -9px 0px" : undefined,
              color: shadeTextColor(shade),
              px: 2,
              py: 1.45,
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) auto",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: 12, lineHeight: 1.35 }}>{label}</Typography>
            <Typography sx={{ fontSize: 12, lineHeight: 1.35, textAlign: "right" }}>{value === "transparent" ? "" : value.toUpperCase()}</Typography>
          </Box>
        );
      })}
    </Box>
  );
}

function DocsSection({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography component="h2" sx={{ fontSize: 30, fontWeight: 400, color: "text.primary", mb: 1.4 }}>
        {title}
      </Typography>
      <DocText>{text}</DocText>
      {children}
    </Box>
  );
}

function CodePanel({ code, lang, value }: { code: string; lang: string; value: string }) {
  const [copied, setCopied] = useState(false);

  function copyCode() {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <Card sx={{ position: "relative", bgcolor: darkPanel, color: "#fff", borderRadius: 1, boxShadow: "none", backgroundImage: "none", mb: 2, overflow: "hidden" }}>
      <Box component="pre" sx={{ m: 0, p: 2.25, overflowX: "auto", fontFamily: "'Inconsolata', 'Roboto Mono', monospace", fontSize: 15, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>
        <code>{code}</code>
      </Box>
      <Tooltip title="Copy code">
        <IconButton onClick={copyCode} aria-label="Copy code" sx={{ position: "absolute", top: 0, right: 0, width: 30, height: 30, color: "rgba(255,255,255,.78)" }}>
          <ContentCopy sx={{ fontSize: 17 }} />
        </IconButton>
      </Tooltip>
      {copied ? <Typography sx={{ position: "absolute", top: 7, right: 38, fontSize: 13, color: "rgba(255,255,255,.86)" }}>Copied</Typography> : null}
      <Typography sx={{ position: "absolute", bottom: 0, right: 0, px: 1.5, py: 0.85, fontSize: 12, color: "rgba(255,255,255,.56)" }}>{value}</Typography>
      <Typography sx={{ position: "absolute", top: 5, right: 44, fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,.18)", textTransform: "uppercase" }}>{lang}</Typography>
    </Card>
  );
}

function ColorClassesExample() {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);

  return (
    <Card sx={{ mt: 4, mb: 3, borderRadius: 1, bgcolor: "background.default", boxShadow: neuInset, backgroundImage: "none", overflow: "hidden" }}>
      <Toolbar variant="dense" sx={{ minHeight: 52, bgcolor: "transparent", px: 2 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 500 }}>Classes</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors">
          <IconButton size="small" aria-label="Invert example colors" onClick={() => setInverted((value) => !value)} sx={exampleActionSx(inverted)}>
            <InvertColors sx={{ fontSize: 15 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="View on Github">
          <IconButton size="small" aria-label="View on Github" sx={exampleActionSx(false)}>
            <GitHub sx={{ fontSize: 15 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="View source">
          <IconButton size="small" aria-label="View source" onClick={() => setSourceOpen((value) => !value)} sx={exampleActionSx(sourceOpen)}>
            <Code sx={{ fontSize: 15 }} />
          </IconButton>
        </Tooltip>
      </Toolbar>
      {sourceOpen ? (
        <Box sx={{ bgcolor: darkPanel, color: "#fff" }}>
          <Stack direction="row" spacing={1} sx={{ p: 1 }}>
            <Box sx={{ px: 2, py: 0.8, borderRadius: 999, bgcolor: "rgba(255,255,255,.13)", fontSize: 13 }}>template</Box>
          </Stack>
          <Box component="pre" sx={{ m: 0, p: 2, borderTop: "1px solid rgba(255,255,255,.14)", fontSize: 14, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>
            <code>{classesExampleSource}</code>
          </Box>
        </Box>
      ) : null}
      <Box sx={{ bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.88)" : "inherit", p: { xs: 2.5, md: 3 }, transition: "background-color 180ms ease" }}>
        <DocText>Each color from the spec gets converted to a <strong>background</strong> and <strong>text</strong> variant for styling within your application through a class.</DocText>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box sx={{ bgcolor: vuetifyColors.red.base, color: "#fff", borderRadius: 1, p: 2, textAlign: "center" }}>red</Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ bgcolor: vuetifyColors.blue.darken2, color: "#fff", borderRadius: 1, p: 2, textAlign: "center" }}>blue darken-2</Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ color: vuetifyColors.green.accent4, borderRadius: 1, p: 2, textAlign: "center", boxShadow: neuGlow }}>green--text text--accent-4</Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

function kebab(value: string) {
  return value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function formatShade(value: string) {
  return value.replace(/(.*)(\d)$/, "$1-$2");
}

function shadeTextColor(shade: string) {
  return shade === "white" || shade === "transparent" || shade.includes("light") || shade.includes("accent") ? "#111" : "#fff";
}

function readableText(hex: string) {
  if (!hex || hex === "transparent") return "#263238";
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? "#263238" : "#fff";
}

const searchFieldSx = {
  mb: 2,
  "& .MuiFilledInput-root": {
    minHeight: 56,
    bgcolor: "#fff",
    borderRadius: 1,
    boxShadow: neuInset,
    border: "1px solid transparent",
    "&:before, &:after": { display: "none" },
    "&:hover": { bgcolor: "#fff", borderColor: "rgba(0,131,143,.22)" },
    "&.Mui-focused": { bgcolor: "#fff", borderColor: "#00838f" },
  },
  "& .MuiFilledInput-input": { py: 2, fontSize: 15.5 },
  "& .MuiInputLabel-root": { fontSize: 15.5, color: "text.secondary", "&.Mui-focused": { color: "primary.main" } },
  "& .MuiInputAdornment-root": { color: "text.secondary", mt: "0 !important" },
};

const exampleActionSx = (active: boolean) => ({
  width: 24,
  height: 24,
  mx: 0.15,
  bgcolor: "transparent",
  color: active ? "primary.main" : "text.secondary",
  opacity: active ? 0.78 : 0.5,
  "&:hover": { bgcolor: "rgba(0,131,143,.07)", opacity: 0.9 },
});

const javascriptColorPackSnippet = `// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.red.darken1, // #E53935
        secondary: colors.red.lighten4, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },
    },
  },
})`;

const sassColorPackSnippet = `// src/sass/main.scss

$color-pack: false;

@import '~vuetify/src/styles/main.sass';`;

const classesExampleSource = `<template>
  <div>
    <div class="red white--text">red</div>
    <div class="blue darken-2 white--text">blue darken-2</div>
    <span class="green--text text--accent-4">green--text text--accent-4</span>
  </div>
</template>`;

const standard = {
  red: { base: "#f44336", lighten5: "#ffebee", lighten4: "#ffcdd2", lighten3: "#ef9a9a", lighten2: "#e57373", lighten1: "#ef5350", darken1: "#e53935", darken2: "#d32f2f", darken3: "#c62828", darken4: "#b71c1c", accent1: "#ff8a80", accent2: "#ff5252", accent3: "#ff1744", accent4: "#d50000" },
  pink: { base: "#e91e63", lighten5: "#fce4ec", lighten4: "#f8bbd0", lighten3: "#f48fb1", lighten2: "#f06292", lighten1: "#ec407a", darken1: "#d81b60", darken2: "#c2185b", darken3: "#ad1457", darken4: "#880e4f", accent1: "#ff80ab", accent2: "#ff4081", accent3: "#f50057", accent4: "#c51162" },
  purple: { base: "#9c27b0", lighten5: "#f3e5f5", lighten4: "#e1bee7", lighten3: "#ce93d8", lighten2: "#ba68c8", lighten1: "#ab47bc", darken1: "#8e24aa", darken2: "#7b1fa2", darken3: "#6a1b9a", darken4: "#4a148c", accent1: "#ea80fc", accent2: "#e040fb", accent3: "#d500f9", accent4: "#aa00ff" },
  deepPurple: { base: "#673ab7", lighten5: "#ede7f6", lighten4: "#d1c4e9", lighten3: "#b39ddb", lighten2: "#9575cd", lighten1: "#7e57c2", darken1: "#5e35b1", darken2: "#512da8", darken3: "#4527a0", darken4: "#311b92", accent1: "#b388ff", accent2: "#7c4dff", accent3: "#651fff", accent4: "#6200ea" },
  indigo: { base: "#3f51b5", lighten5: "#e8eaf6", lighten4: "#c5cae9", lighten3: "#9fa8da", lighten2: "#7986cb", lighten1: "#5c6bc0", darken1: "#3949ab", darken2: "#303f9f", darken3: "#283593", darken4: "#1a237e", accent1: "#8c9eff", accent2: "#536dfe", accent3: "#3d5afe", accent4: "#304ffe" },
  blue: { base: "#2196f3", lighten5: "#e3f2fd", lighten4: "#bbdefb", lighten3: "#90caf9", lighten2: "#64b5f6", lighten1: "#42a5f5", darken1: "#1e88e5", darken2: "#1976d2", darken3: "#1565c0", darken4: "#0d47a1", accent1: "#82b1ff", accent2: "#448aff", accent3: "#2979ff", accent4: "#2962ff" },
  lightBlue: { base: "#03a9f4", lighten5: "#e1f5fe", lighten4: "#b3e5fc", lighten3: "#81d4fa", lighten2: "#4fc3f7", lighten1: "#29b6f6", darken1: "#039be5", darken2: "#0288d1", darken3: "#0277bd", darken4: "#01579b", accent1: "#80d8ff", accent2: "#40c4ff", accent3: "#00b0ff", accent4: "#0091ea" },
  cyan: { base: "#00bcd4", lighten5: "#e0f7fa", lighten4: "#b2ebf2", lighten3: "#80deea", lighten2: "#4dd0e1", lighten1: "#26c6da", darken1: "#00acc1", darken2: "#0097a7", darken3: "#00838f", darken4: "#006064", accent1: "#84ffff", accent2: "#18ffff", accent3: "#00e5ff", accent4: "#00b8d4" },
  teal: { base: "#009688", lighten5: "#e0f2f1", lighten4: "#b2dfdb", lighten3: "#80cbc4", lighten2: "#4db6ac", lighten1: "#26a69a", darken1: "#00897b", darken2: "#00796b", darken3: "#00695c", darken4: "#004d40", accent1: "#a7ffeb", accent2: "#64ffda", accent3: "#1de9b6", accent4: "#00bfa5" },
  green: { base: "#4caf50", lighten5: "#e8f5e9", lighten4: "#c8e6c9", lighten3: "#a5d6a7", lighten2: "#81c784", lighten1: "#66bb6a", darken1: "#43a047", darken2: "#388e3c", darken3: "#2e7d32", darken4: "#1b5e20", accent1: "#b9f6ca", accent2: "#69f0ae", accent3: "#00e676", accent4: "#00c853" },
  lightGreen: { base: "#8bc34a", lighten5: "#f1f8e9", lighten4: "#dcedc8", lighten3: "#c5e1a5", lighten2: "#aed581", lighten1: "#9ccc65", darken1: "#7cb342", darken2: "#689f38", darken3: "#558b2f", darken4: "#33691e", accent1: "#ccff90", accent2: "#b2ff59", accent3: "#76ff03", accent4: "#64dd17" },
  lime: { base: "#cddc39", lighten5: "#f9fbe7", lighten4: "#f0f4c3", lighten3: "#e6ee9c", lighten2: "#dce775", lighten1: "#d4e157", darken1: "#c0ca33", darken2: "#afb42b", darken3: "#9e9d24", darken4: "#827717", accent1: "#f4ff81", accent2: "#eeff41", accent3: "#c6ff00", accent4: "#aeea00" },
  yellow: { base: "#ffeb3b", lighten5: "#fffde7", lighten4: "#fff9c4", lighten3: "#fff59d", lighten2: "#fff176", lighten1: "#ffee58", darken1: "#fdd835", darken2: "#fbc02d", darken3: "#f9a825", darken4: "#f57f17", accent1: "#ffff8d", accent2: "#ffff00", accent3: "#ffea00", accent4: "#ffd600" },
  amber: { base: "#ffc107", lighten5: "#fff8e1", lighten4: "#ffecb3", lighten3: "#ffe082", lighten2: "#ffd54f", lighten1: "#ffca28", darken1: "#ffb300", darken2: "#ffa000", darken3: "#ff8f00", darken4: "#ff6f00", accent1: "#ffe57f", accent2: "#ffd740", accent3: "#ffc400", accent4: "#ffab00" },
  orange: { base: "#ff9800", lighten5: "#fff3e0", lighten4: "#ffe0b2", lighten3: "#ffcc80", lighten2: "#ffb74d", lighten1: "#ffa726", darken1: "#fb8c00", darken2: "#f57c00", darken3: "#ef6c00", darken4: "#e65100", accent1: "#ffd180", accent2: "#ffab40", accent3: "#ff9100", accent4: "#ff6d00" },
  deepOrange: { base: "#ff5722", lighten5: "#fbe9e7", lighten4: "#ffccbc", lighten3: "#ffab91", lighten2: "#ff8a65", lighten1: "#ff7043", darken1: "#f4511e", darken2: "#e64a19", darken3: "#d84315", darken4: "#bf360c", accent1: "#ff9e80", accent2: "#ff6e40", accent3: "#ff3d00", accent4: "#dd2c00" },
};

const vuetifyColors: Record<string, ColorFamily> = {
  ...standard,
  brown: { base: "#795548", lighten5: "#efebe9", lighten4: "#d7ccc8", lighten3: "#bcaaa4", lighten2: "#a1887f", lighten1: "#8d6e63", darken1: "#6d4c41", darken2: "#5d4037", darken3: "#4e342e", darken4: "#3e2723" },
  blueGrey: { base: "#607d8b", lighten5: "#eceff1", lighten4: "#cfd8dc", lighten3: "#b0bec5", lighten2: "#90a4ae", lighten1: "#78909c", darken1: "#546e7a", darken2: "#455a64", darken3: "#37474f", darken4: "#263238" },
  grey: { base: "#9e9e9e", lighten5: "#fafafa", lighten4: "#f5f5f5", lighten3: "#eeeeee", lighten2: "#e0e0e0", lighten1: "#bdbdbd", darken1: "#757575", darken2: "#616161", darken3: "#424242", darken4: "#212121" },
  shades: { black: "#000000", white: "#ffffff", transparent: "transparent" },
};
