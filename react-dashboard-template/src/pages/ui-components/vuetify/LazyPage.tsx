import { useEffect, useRef, useState, type ReactNode } from "react";
import { Box, Card, Collapse, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { Code, GitHub, HourglassEmpty, Info, InvertColors } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const vuetifyShadow2 = "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)";

export default function LazyPage() {
  return (
    <DocPage
      title="Lazy"
      namespace="Components"
      icon={<HourglassEmpty />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Lazy" },
      ]}
    >
      <DocText>
        The <CodePill>v-lazy</CodePill> component is used to dynamically load components based upon an elements visiblity.
      </DocText>
      <UsageSection />
      <AppAlert>
        The <CodePill>v-lazy</CodePill> component uses the <Box component="a" href="/directives/intersect" sx={{ color: "inherit", textDecoration: "underline" }}>v-intersect</Box> directive which requires a <Box component="a" href="/directives/intersect#polyfill" sx={{ color: "inherit", textDecoration: "underline" }}>Polyfill</Box> in order to work on IE11 / Safari. It&apos;s possible on some iOS versions will also require the use of this polyfill.
      </AppAlert>
    </DocPage>
  );
}

function UsageSection() {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <BaseHeading id="usage">Usage</BaseHeading>
      <VuetifyExampleBlock source="usage">
        {() => <LazyUsageExample />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function LazyUsageExample() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const lazyRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const root = scrollRef.current;
    const target = lazyRef.current;
    if (!root || !target || active) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.5)) {
          setActive(true);
        }
      },
      { root, threshold: 0.5 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [active]);

  return (
    <Box ref={scrollRef} sx={{ maxHeight: 400, overflowY: "auto" }}>
      <Box sx={{ p: 3, textAlign: "center", fontSize: 16, lineHeight: "24px" }}>Scroll down</Box>
      <Box sx={{ height: "200vh", textAlign: "center", p: 1 }}>
        <Box sx={{ minHeight: "50vh" }} />
        <Typography sx={{ fontSize: 14, lineHeight: "20px", mb: 6 }}>The card will appear below:</Typography>
        <Box ref={lazyRef} sx={{ minHeight: 200 }}>
          <Collapse in={active} timeout={280} appear>
            <Card sx={{ mx: "auto", maxWidth: 336, borderRadius: 1, boxShadow: vuetifyShadow2, textAlign: "left", bgcolor: "#fff" }}>
              <Typography sx={{ p: 2, fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>Card title</Typography>
              <Typography sx={{ px: 2, pb: 2, fontSize: 14, lineHeight: "20px", color: "rgba(0,0,0,.6)" }}>
                Phasellus magna. Quisque rutrum. Nunc egestas, augue at pellentesque
                laoreet, felis eros vehicula leo, at malesuada velit leo quis pede.
                Aliquam lobortis. Quisque libero metus, condimentum nec, tempor a,
                commodo mollis, magna. In turpis. In dui magna, posuere eget,
                vestibulum et, tempor auctor, justo. In turpis. Pellentesque dapibus
                hendrerit tortor. Ut varius tincidunt libero.
              </Typography>
            </Card>
          </Collapse>
        </Box>
      </Box>
    </Box>
  );
}

function VuetifyExampleBlock({ source, children }: { source: keyof typeof sourceTemplates; children: () => ReactNode }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);

  return (
    <Card sx={{ mb: 5, bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "hidden" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors"><IconButton aria-label="Invert example colors" size="small" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View on Github"><IconButton aria-label="View on Github" size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton aria-label="View source" size="small" onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", overflowX: "auto", p: 2 }}>
          <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box>
        </Box>
      </Collapse>
      <Box sx={{ bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", p: 2 }}>
        <Box data-app="true">{children()}</Box>
      </Box>
    </Card>
  );
}

function AppAlert({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, borderRadius: 1, bgcolor: "rgba(33,150,243,.12)", color: "#0d47a1", px: 2, py: 1.5, mb: 2, fontSize: 14, lineHeight: 1.55 }}>
      <Info sx={{ fontSize: 22, mt: .1, color: "#2196f3" }} />
      <Box>{children}</Box>
    </Box>
  );
}

function BaseHeading({ id, children }: { id: string; children: ReactNode }) {
  return <Typography id={id} variant="h5" sx={{ fontSize: { xs: 20, md: 22 }, lineHeight: 1.45, fontWeight: 400, mb: 2.5 }}>{children}</Typography>;
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: .55, py: .18, borderRadius: .75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: .5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

const sourceTemplates = {
  usage: `<template>
  <v-responsive class="overflow-y-auto" max-height="400">
    <div class="pa-6 text-center">
      Scroll down
    </div>

    <v-responsive height="200vh" class="text-center pa-2">
      <v-responsive min-height="50vh"></v-responsive>
      <div class="text-center text-body-2 mb-12">
        The card will appear below:
      </div>

      <v-lazy
        v-model="isActive"
        :options="{
          threshold: 0.5,
        }"
        min-height="200"
        transition="fade-transition"
      >
        <v-card class="mx-auto" max-width="336">
          <v-card-title>Card title</v-card-title>

          <v-card-text>
            Phasellus magna. Quisque rutrum. Nunc egestas, augue at pellentesque
            laoreet, felis eros vehicula leo, at malesuada velit leo quis pede.
            Aliquam lobortis. Quisque libero metus, condimentum nec, tempor a,
            commodo mollis, magna. In turpis. In dui magna, posuere eget,
            vestibulum et, tempor auctor, justo. In turpis. Pellentesque dapibus
            hendrerit tortor. Ut varius tincidunt libero.
          </v-card-text>
        </v-card>
      </v-lazy>
    </v-responsive>
  </v-responsive>
</template>`,
};
