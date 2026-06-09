import { useState, type PointerEvent, type ReactNode } from "react";
import { Box, Button, Card, Checkbox, Collapse, IconButton, MenuItem, Select, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { CalendarMonth, Code, Delete, Email, Facebook, GitHub, Home, Instagram, InvertColors, LinkedIn, Twitter, ViewStream } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const primaryLighten1 = "#26a6b4";
const primaryLighten2 = "#4db7c2";
const redLighten1 = "#ef5350";
const indigoLighten1 = "#5c6bc0";
const teal = "#009688";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };
const year = new Date().getFullYear();

interface FooterExample {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  minHeight: number;
  render: (inverted: boolean) => ReactNode;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
  leaving: boolean;
}

export default function FootersPage() {
  return (
    <DocPage
      title="Footer"
      namespace="Components"
      icon={<ViewStream />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Footer" },
      ]}
    >
      <DocText>
        The <CodePill>v-footer</CodePill> component is used for displaying general information that a user might want to access from any page within your site.
      </DocText>
      <UsageSection />
      <PlaygroundSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Usage
      </Typography>
      <VuetifyExampleBlock title="" description={<>The <CodePill>v-footer</CodePill> component in its simplest form is a container.</>} source="usage" minHeight={154}>
        {() => (
          <VFooter>
            <Box sx={{ flexGrow: 1 }} />
            <Box>&copy; {year}</Box>
          </VFooter>
        )}
      </VuetifyExampleBlock>
    </Box>
  );
}

function PlaygroundSection() {
  const [variant, setVariant] = useState("default");
  const [padless, setPadless] = useState(false);

  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Playground
      </Typography>
      <VuetifyExampleBlock title="" description="" source="playground" minHeight={500}>
        {() => (
          <VCard sx={{ height: 400, position: "relative", overflow: "hidden" }}>
            <VFooter absolute={variant === "absolute"} fixed={variant === "fixed"} padless={padless}>
              <VCard flat tile sx={{ width: "100%", bgcolor: redLighten1, color: "#fff", textAlign: "center" }}>
                <Box sx={{ p: 2 }}>
                  {playgroundIcons.map((icon) => (
                    <VIconButton key={icon.label} color="inherit">{icon.icon}</VIconButton>
                  ))}
                </Box>
                <VDivider dark />
                <Box sx={{ p: 2, color: "#fff" }}>
                  {year} — <strong>Vuetify</strong>
                </Box>
              </VCard>
            </VFooter>
            <Box sx={{ m: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box sx={{ width: { xs: "100%", md: "66.666%" } }}>
                <VSelect label="Variant" value={variant} items={["default", "absolute", "fixed"]} onChange={setVariant} />
                <VCheckbox label="Padless" checked={padless} onChange={setPadless} />
              </Box>
            </Box>
          </VCard>
        )}
      </VuetifyExampleBlock>
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
        {footerExamples.map((example) => (
          <VuetifyExampleBlock key={example.title} title={example.title} description={example.description} source={example.source} minHeight={example.minHeight}>
            {(inverted) => example.render(inverted)}
          </VuetifyExampleBlock>
        ))}
      </Stack>
    </Box>
  );
}

function VuetifyExampleBlock({ title, description, source, children, minHeight }: { title: string; description: ReactNode; source: keyof typeof sourceTemplates; children: (inverted: boolean) => ReactNode; minHeight: number }) {
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
        {description && <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: 16.5, fontWeight: 300, lineHeight: 1.7, mb: 3 }}>{description}</Typography>}
        {children(inverted)}
      </Box>
    </Card>
  );
}

function AbsoluteExample() {
  return (
    <VCard sx={{ height: 150, position: "relative", overflow: "hidden" }}>
      <VFooter absolute sx={{ fontWeight: 500 }}>
        <Box sx={{ width: "100%", textAlign: "center", px: 1.5, py: 1.5 }}>
          {year} — <strong>Vuetify</strong>
        </Box>
      </VFooter>
    </VCard>
  );
}

function PadlessExample() {
  return (
    <VFooter padless>
      <Box sx={{ width: "100%", textAlign: "center", px: 1.5, py: 1.5 }}>
        {year} — <strong>Vuetify</strong>
      </Box>
    </VFooter>
  );
}

function CompanyFooterExample() {
  const links = ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"];
  return (
    <VFooter color={primaryLighten1} padless>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", width: "100%" }}>
        {links.map((link) => (
          <VTextButton key={link} rounded color="#fff" sx={{ my: 1 }}>{link}</VTextButton>
        ))}
        <Box sx={{ width: "100%", bgcolor: primaryLighten2, color: "#fff", py: 2, textAlign: "center" }}>
          {year} — <strong>Vuetify</strong>
        </Box>
      </Box>
    </VFooter>
  );
}

function IndigoFooterExample() {
  return (
    <VFooter dark padless>
      <VCard flat tile sx={{ bgcolor: indigoLighten1, color: "#fff", textAlign: "center", width: "100%" }}>
        <Box sx={{ p: 2 }}>
          {socialIcons.map((icon) => (
            <VIconButton key={icon.label} color="#fff">{icon.icon}</VIconButton>
          ))}
        </Box>
        <Box sx={{ px: 2, pb: 2, pt: 0, color: "#fff", fontSize: 16, lineHeight: 1.5 }}>
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </Box>
        <VDivider dark />
        <Box sx={{ p: 2, color: "#fff" }}>
          {year} — <strong>Vuetify</strong>
        </Box>
      </VCard>
    </VFooter>
  );
}

function TealFooterExample() {
  return (
    <VFooter dark padless>
      <VCard flat tile sx={{ width: "100%", color: "#fff" }}>
        <Box sx={{ minHeight: 64, bgcolor: teal, display: "flex", alignItems: "center", px: 2, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
          <Typography component="strong" sx={{ fontSize: 16, fontWeight: 700 }}>Get connected with us on social networks!</Typography>
          <Box sx={{ flexGrow: 1 }} />
          {socialIcons.map((icon) => (
            <VIconButton key={icon.label} color="#fff">{icon.icon}</VIconButton>
          ))}
        </Box>
        <Box sx={{ py: 1, px: 2, textAlign: "center", bgcolor: "#fff", color: "rgba(0,0,0,.87)" }}>
          {year} — <strong>Vuetify</strong>
        </Box>
      </VCard>
    </VFooter>
  );
}

function VFooter({ children, absolute = false, fixed = false, padless = false, dark = false, color, sx = {} }: { children: ReactNode; absolute?: boolean; fixed?: boolean; padless?: boolean; dark?: boolean; color?: string; sx?: Record<string, unknown> }) {
  return (
    <Box
      component="footer"
      sx={{
        alignItems: "center",
        display: "flex",
        flex: "0 1 auto",
        flexWrap: "wrap",
        p: padless ? 0 : "6px 16px",
        position: fixed ? "fixed" : absolute ? "absolute" : "relative",
        left: absolute || fixed ? 0 : undefined,
        right: absolute || fixed ? 0 : undefined,
        bottom: absolute || fixed ? 0 : undefined,
        zIndex: absolute || fixed ? 3 : undefined,
        width: absolute || fixed ? "100%" : "auto",
        bgcolor: color || (dark ? "#212121" : "#f5f5f5"),
        color: dark ? "#fff" : "rgba(0,0,0,.87)",
        borderRadius: 0,
        transition: "background-color .2s cubic-bezier(.4,0,.2,1), left .2s cubic-bezier(.4,0,.2,1), right .2s cubic-bezier(.4,0,.2,1)",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function VCard({ children, flat = false, tile = false, sx = {} }: { children: ReactNode; flat?: boolean; tile?: boolean; sx?: Record<string, unknown> }) {
  return <Card sx={{ borderRadius: tile ? 0 : 1, boxShadow: flat ? "none" : "0px 2px 4px rgba(0,0,0,.18)", overflow: "hidden", bgcolor: "#fff", ...sx }}>{children}</Card>;
}

function VDivider({ dark = false }: { dark?: boolean }) {
  return <Box sx={{ borderTop: `thin solid ${dark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.12)"}` }} />;
}

function VIconButton({ children, color = "rgba(0,0,0,.54)" }: { children: ReactNode; color?: string }) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => addRipple(event, setRipples);
  return (
    <IconButton disableRipple onPointerDown={onPointerDown} sx={{ width: 48, height: 48, mx: 2, color, position: "relative", overflow: "hidden" }}>
      {children}
      <RippleSpan ripples={ripples} />
    </IconButton>
  );
}

function VTextButton({ children, color, rounded = false, sx = {} }: { children: ReactNode; color?: string; rounded?: boolean; sx?: Record<string, unknown> }) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => addRipple(event, setRipples);
  return (
    <Button disableRipple onPointerDown={onPointerDown} sx={{ minWidth: 64, height: 36, px: 2, borderRadius: rounded ? 18 : 1, color: color || "rgba(0,0,0,.87)", bgcolor: "transparent", boxShadow: "none", textTransform: "uppercase", fontSize: 14, fontWeight: 500, letterSpacing: ".0892857143em", position: "relative", overflow: "hidden", "&:hover": { bgcolor: "rgba(255,255,255,.08)" }, ...sx }}>
      {children}
      <RippleSpan ripples={ripples} />
    </Button>
  );
}

function VCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", minHeight: 48 }}>
      <Checkbox checked={checked} onChange={(event) => onChange(event.target.checked)} sx={{ color: "rgba(0,0,0,.54)", "&.Mui-checked": { color: primary }, p: 1 }} />
      <Typography sx={{ fontSize: 16 }}>{label}</Typography>
    </Box>
  );
}

function VSelect({ label, value, items, onChange }: { label: string; value: string; items: string[]; onChange: (value: string) => void }) {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography sx={{ fontSize: 12, color: primary, mb: .25 }}>{label}</Typography>
      <Select
        value={value}
        displayEmpty
        fullWidth
        size="small"
        onChange={(event) => onChange(event.target.value)}
        sx={{ bgcolor: "transparent", "& .MuiOutlinedInput-notchedOutline": { border: 0, borderBottom: "1px solid rgba(0,0,0,.42)", borderRadius: 0 }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderBottom: `2px solid ${primary}` } }}
      >
        {items.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
      </Select>
    </Box>
  );
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: .55, py: .18, borderRadius: .75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: .5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

function addRipple<T extends HTMLElement>(event: PointerEvent<T>, setRipples: (updater: (current: Ripple[]) => Ripple[]) => void) {
  const rect = event.currentTarget.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.8;
  const ripple: Ripple = { id: Date.now() + Math.random(), x: event.clientX - rect.left - size / 2, y: event.clientY - rect.top - size / 2, size, leaving: false };
  setRipples((current) => [...current, ripple]);
  window.setTimeout(() => setRipples((current) => current.map((item) => item.id === ripple.id ? { ...item, leaving: true } : item)), 250);
  window.setTimeout(() => setRipples((current) => current.filter((item) => item.id !== ripple.id)), 560);
}

function RippleSpan({ ripples }: { ripples: Ripple[] }) {
  return (
    <>
      {ripples.map((ripple) => (
        <Box key={ripple.id} component="span" sx={{ position: "absolute", left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size, borderRadius: "50%", bgcolor: "currentColor", pointerEvents: "none", opacity: ripple.leaving ? 0 : .14, transform: ripple.leaving ? "scale(1)" : "scale(.08)", transition: ripple.leaving ? "opacity 300ms cubic-bezier(.25,.8,.5,1)" : "transform 250ms cubic-bezier(.25,.8,.5,1), opacity 100ms cubic-bezier(.25,.8,.5,1)" }} />
      ))}
    </>
  );
}

const playgroundIcons = [
  { label: "home", icon: <Home sx={{ fontSize: 24 }} /> },
  { label: "email", icon: <Email sx={{ fontSize: 24 }} /> },
  { label: "calendar", icon: <CalendarMonth sx={{ fontSize: 24 }} /> },
  { label: "delete", icon: <Delete sx={{ fontSize: 24 }} /> },
];

const socialIcons = [
  { label: "facebook", icon: <Facebook sx={{ fontSize: 24 }} /> },
  { label: "twitter", icon: <Twitter sx={{ fontSize: 24 }} /> },
  { label: "linkedin", icon: <LinkedIn sx={{ fontSize: 24 }} /> },
  { label: "instagram", icon: <Instagram sx={{ fontSize: 24 }} /> },
];

const footerExamples: FooterExample[] = [
  { title: "Absolute Footer", description: <>The <CodePill>absolute</CodePill> prop positions footers absolutely at the bottom of their parent container.</>, source: "simple/absolute", minHeight: 270, render: () => <AbsoluteExample /> },
  { title: "Padless Footer", description: <>The <CodePill>padless</CodePill> prop removes all default padding from the footer component.</>, source: "simple/padless", minHeight: 170, render: () => <PadlessExample /> },
  { title: "Company Footer", description: "The footer component as a basic company footer with links.", source: "intermediate/company-footer", minHeight: 230, render: () => <CompanyFooterExample /> },
  { title: "Indigo Footer", description: "The footer component with Indigo background color and social media icons and button.", source: "intermediate/indigo-footer", minHeight: 360, render: () => <IndigoFooterExample /> },
  { title: "Teal Footer", description: "The footer component with a Teal color header and columns and rows of links.", source: "intermediate/teal-footer", minHeight: 230, render: () => <TealFooterExample /> },
];

const sourceTemplates = {
  usage: `<template>
  <v-footer>
    <v-spacer></v-spacer>
    <div>&copy; {{ new Date().getFullYear() }}</div>
  </v-footer>
</template>`,
  playground: `<template>
  <v-card height="400px">
    <v-footer
      v-bind="localAttrs"
      :padless="padless"
    >
      <v-card
        flat
        tile
        width="100%"
        class="red lighten-1 text-center"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4"
            icon
          >
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>

    <v-row
      align="center"
      justify="center"
      class="ma-12"
    >
      <v-col
        cols="12"
        md="8"
      >

        <v-select
          v-model="variant"
          :items="items"
          clearable
          label="Variant"
        ></v-select>

        <v-checkbox
          v-model="padless"
          hide-details
          label="Padless"
        ></v-checkbox>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'mdi-home',
        'mdi-email',
        'mdi-calendar',
        'mdi-delete',
      ],
      items: [
        'default',
        'absolute',
        'fixed',
      ],
      padless: false,
      variant: 'default',
    }),
    computed: {
      localAttrs () {
        const attrs = {}

        if (this.variant === 'default') {
          attrs.absolute = false
          attrs.fixed = false
        } else {
          attrs[this.variant] = true
        }
        return attrs
      },
    },
  }
</script>`,
  "simple/absolute": `<template>
  <v-card height="150">
    <v-footer
      absolute
      class="font-weight-medium"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-footer>
  </v-card>
</template>`,
  "simple/padless": `<template>
  <v-footer padless>
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
    </v-col>
  </v-footer>
</template>`,
  "intermediate/company-footer": `<template>
  <v-footer
    color="primary lighten-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ],
    }),
  }
</script>`,
  "intermediate/indigo-footer": `<template>
  <v-footer
    dark
    padless
  >
    <v-card
      flat
      tile
      class="indigo lighten-1 white--text text-center"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
</script>`,
  "intermediate/teal-footer": `<template>
  <v-footer
    dark
    padless
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="teal">
        <strong class="subheading">Get connected with us on social networks!</strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          dark
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
</script>`,
};
