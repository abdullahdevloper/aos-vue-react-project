import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Code,
  Functions,
  GitHub,
  InvertColors,
} from "@mui/icons-material";
import DocPage from "../../components/vuetify-docs/DocPage";
import DocText from "../../components/vuetify-docs/DocText";

const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 16.5, md: 18 }, lineHeight: 1.7, fontWeight: 300 };
const success = "#8bc34a";
const error = "#d32f2f";

export default function IntersectPage() {
  return (
    <DocPage
      title="Intersect"
      namespace="Directives"
      icon={<Functions />}
      breadcrumbs={[
        { label: "Directives", href: "/directives/Intersect" },
        { label: "Intersect" },
      ]}
    >
      <DocText>
        <RichText text="The `v-intersect` directive utilizes the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). It provides an easy-to-use interface for detecting when elements are visible within the user's viewport. This is also used for the [v-lazy](/components/lazy) component." />
      </DocText>
      <UsageSection />
      <ExamplesSection />
      <OptionsSection />
      <PolyfillSection />
    </DocPage>
  );
}

function UsageSection() {
  return (
    <Box component="section" sx={{ mb: 5.25 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 27, md: 30 }, fontWeight: 500, mb: 1.6 }}>
        Usage
      </Typography>
      <DirectiveExampleBlock
        title=""
        description="Scroll the window and watch the colored dot. Notice as the [v-card](/components/cards) comes into view that it changes from error to success"
        source={usageSource}
        minHeight={520}
      >
        <IntersectViewportExample variant="usage" />
      </DirectiveExampleBlock>
    </Box>
  );
}

function ExamplesSection() {
  return (
    <Box component="section" sx={{ pt: 0.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 27, md: 30 }, fontWeight: 500, mb: 1.25 }}>
        Examples
      </Typography>
      <Typography color="text.secondary" sx={{ ...docsParagraphSx, mb: 4.2, maxWidth: 980 }}>
        Below is a collection of simple to complex examples.
      </Typography>
      <DirectiveExampleBlock
        title="With options"
        description="The `v-intersect` directive accepts options. Available options can be found in the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). Below is an example using the `threshold` option."
        source={optionsSource}
        minHeight={520}
      >
        <IntersectViewportExample variant="options" />
      </DirectiveExampleBlock>
    </Box>
  );
}

function OptionsSection() {
  const rows = [
    ["modifiers.once", "Will only invoke the provided user callback on mount and once intersected. If using the **quiet** modifier will only invoke once."],
    ["modifiers.quiet", "Will not automatically invoke the provided callback on bind."],
    ["value", "The function to invoke when the targeted element is intersected."],
  ];

  return (
    <Box component="section" sx={{ mb: 5.25 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 27, md: 30 }, fontWeight: 500, mb: 1.6 }}>
        Options
      </Typography>
      <Card sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "hidden" }}>
        {rows.map(([name, description], index) => (
          <Box key={name} sx={{ display: { xs: "block", sm: "grid" }, gridTemplateColumns: "220px 1fr", px: { xs: 2.5, md: 3 }, py: 2, borderTop: index === 0 ? 0 : "1px solid rgba(0,0,0,.08)" }}>
            <Typography sx={{ fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 13.5, color: "#e53935", mb: { xs: 0.75, sm: 0 } }}>{name}</Typography>
            <Typography color="text.secondary" sx={{ fontSize: 15.5, lineHeight: 1.65, fontWeight: 300 }}>
              <RichText text={description} />
            </Typography>
          </Box>
        ))}
      </Card>
    </Box>
  );
}

function PolyfillSection() {
  return (
    <Box component="section" id="polyfill" sx={{ mb: 2 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 27, md: 30 }, fontWeight: 500, mb: 1.6 }}>
        Polyfill
      </Typography>
      <Typography color="text.secondary" sx={{ ...docsParagraphSx, mb: 0 }}>
        <RichText text="While the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) is not available in IE11 by default, it can be implemented using a [polyfill](https://github.com/w3c/IntersectionObserver)." />
      </Typography>
    </Box>
  );
}

function IntersectViewportExample({ variant }: { variant: "usage" | "options" }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useIntersect<HTMLDivElement>((entries) => {
    setIsIntersecting(variant === "options" ? entries[0].intersectionRatio >= 0.5 : entries[0].isIntersecting);
  }, variant === "options" ? { threshold: [0, 0.5, 1.0] } : undefined);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center" }}>
        <Box
          className="v-avatar mr-3 swing-transition"
          sx={{
            width: 32,
            height: 32,
            minWidth: 32,
            borderRadius: "50%",
            bgcolor: isIntersecting ? success : error,
            transition: "background-color 300ms cubic-bezier(0.25, 0.8, 0.5, 1)",
          }}
        />
      </Box>
      <Box className="v-responsive overflow-y-auto" sx={{ position: "relative", overflowY: "auto", overflowX: "hidden", maxHeight: 400, display: "flex", flex: "1 0 auto", maxWidth: "100%", mt: 2 }}>
        <Box className="v-responsive__content" sx={{ flex: "1 0 0px", maxWidth: "100%", height: "200vh", display: "flex", alignItems: "center", textAlign: "center", p: 1 }}>
          <Card ref={targetRef} className="mx-auto" sx={{ mx: "auto", maxWidth: 336, bgcolor: "#fff", color: "rgba(0,0,0,.87)", borderRadius: 1, boxShadow: "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)" }}>
            <Typography sx={{ p: "16px 16px 8px", fontSize: 20, fontWeight: 500, lineHeight: 1.6, textAlign: "left" }}>
              Card title
            </Typography>
            <Typography sx={{ px: 2, pb: 2, color: "rgba(0,0,0,.6)", fontSize: 14, lineHeight: 1.5, textAlign: "left" }}>
              {variant === "usage" ? usageCardText : optionsCardText}
            </Typography>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

function DirectiveExampleBlock({
  title,
  description,
  source,
  children,
  minHeight,
}: {
  title: string;
  description: string;
  source: string;
  children: ReactNode;
  minHeight: number;
}) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("template");
  const sourceSections = getSourceSections(source);
  const sectionNames = Object.keys(sourceSections);
  const activeSection = sourceSections[selectedSection] ? selectedSection : sectionNames[0];

  return (
    <Card sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "hidden", mb: 5.25 }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, alignItems: "center", py: 0.5, px: { xs: 2.25, md: 3 }, bgcolor: "transparent" }}>
        <Box sx={{ minWidth: 0, pr: 2 }}>
          {title ? (
            <Typography sx={{ fontSize: { xs: 19, md: 21 }, fontWeight: 500, lineHeight: 1.35 }}>
              {title}
            </Typography>
          ) : null}
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example color">
          <IconButton size="small" aria-label="Invert example color" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}>
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
              <Button
                key={section}
                size="small"
                onClick={() => setSelectedSection(section)}
                sx={{
                  minHeight: 32,
                  px: 1.75,
                  borderRadius: 999,
                  color: activeSection === section ? "#fff" : "rgba(255,255,255,.78)",
                  bgcolor: activeSection === section ? "rgba(255,255,255,.16)" : "transparent",
                  "&:hover": { bgcolor: activeSection === section ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.08)" },
                }}
              >
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
      <Box
        sx={{
          px: { xs: 2.5, md: 3 },
          py: { xs: 2.4, md: 2.7 },
          minHeight,
          bgcolor: inverted ? "#303030" : "transparent",
          color: inverted ? "rgba(255,255,255,.92)" : "inherit",
          transition: "background-color 180ms ease, color 180ms ease",
          "& .MuiCard-root": { bgcolor: "#fff", color: "rgba(0,0,0,.87)" },
        }}
      >
        <Typography color={inverted ? "rgba(255,255,255,.82)" : "text.secondary"} sx={{ fontSize: { xs: 15.5, md: 16 }, lineHeight: 1.68, fontWeight: 300, mb: 2.5, maxWidth: title ? 820 : 940 }}>
          <RichText text={description} />
        </Typography>
        {children}
      </Box>
    </Card>
  );
}

function useIntersect<T extends HTMLElement>(handler: (entries: IntersectionObserverEntry[], observer: IntersectionObserver, isIntersecting: boolean) => void, options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries, activeObserver) => {
      const isIntersecting = Boolean(entries.find((entry) => entry.isIntersecting));
      handlerRef.current(entries, activeObserver, isIntersecting);
    }, options || {});

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [options]);

  return ref;
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          return <Box key={`${part}-${index}`} component="a" href={link[2]} sx={{ color: "#00838f", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>{link[1]}</Box>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return <Box component="code" key={`${part}-${index}`} sx={inlineCodeSx}>{part.slice(1, -1)}</Box>;
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return <Box component="strong" key={`${part}-${index}`} sx={{ fontWeight: 600 }}>{part.slice(2, -2)}</Box>;
        }
        return <span key={`${part}-${index}`}>{part}</span>;
      })}
    </>
  );
}

function getSourceSections(source: string) {
  const template = source.match(/<template>[\s\S]*?<\/template>/)?.[0] ?? "";
  const script = source.match(/<script>[\s\S]*?<\/script>/)?.[0] ?? "";
  return Object.fromEntries(
    [
      ["template", template],
      ["script", script],
    ].filter(([, value]) => value),
  );
}

function exampleIconSx(active: boolean) {
  return {
    width: 28,
    height: 28,
    color: active ? "primary.main" : "text.secondary",
    mx: 0.1,
    bgcolor: "transparent",
    opacity: active ? 0.72 : 0.48,
    "&:hover": { bgcolor: "rgba(0,131,143,.08)", color: "primary.main", opacity: 0.82 },
    "&:active": { transform: "scale(.94)", bgcolor: "rgba(0,131,143,.14)", opacity: 1 },
  };
}

const inlineCodeSx = {
  fontFamily: "'Roboto Mono', 'SFMono-Regular', Consolas, monospace",
  fontSize: "0.84em",
  color: "#e53935",
  bgcolor: "rgba(229,57,53,.09)",
  px: 0.45,
  py: 0.1,
  borderRadius: 0.75,
};

const usageCardText = "Phasellus magna. Quisque rutrum. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Aliquam lobortis. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. In turpis. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. In turpis. Pellentesque dapibus hendrerit tortor. Ut varius tincidunt libero.";
const optionsCardText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const usageSource = `<template>
  <div>
    <div class="d-flex align-center text-center justify-center">
      <v-avatar
        :color="isIntersecting ? 'green lighten-1' : 'red darken-2'"
        class="mr-3 swing-transition"
        size="32"
      ></v-avatar>
    </div>

    <v-responsive class="overflow-y-auto" max-height="400">
      <v-responsive height="200vh" class="d-flex align-center text-center pa-2">
        <v-card v-intersect="onIntersect" class="mx-auto" max-width="336">
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
      </v-responsive>
    </v-responsive>
  </div>
</template>

<script>
export default {
  data: () => ({
    isIntersecting: false,
  }),

  methods: {
    onIntersect(entries) {
      this.isIntersecting = entries[0].isIntersecting;
    },
  },
};
</script>`;

const optionsSource = `<template>
  <div>
    <div class="d-flex align-center text-center justify-center">
      <v-avatar
        :color="isIntersecting ? 'green lighten-1' : 'red darken-2'"
        class="mr-3 swing-transition"
        size="32"
      ></v-avatar>
    </div>

    <v-responsive class="overflow-y-auto" max-height="400">
      <v-responsive height="200vh" class="d-flex align-center text-center pa-2">
        <v-card
          v-intersect="{
            handler: onIntersect,
            options: {
              threshold: [0, 0.5, 1.0],
            },
          }"
          class="mx-auto"
          max-width="336"
        >
          <v-card-title>Card title</v-card-title>

          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </v-card-text>
        </v-card>
      </v-responsive>
    </v-responsive>
  </div>
</template>

<script>
export default {
  data: () => ({
    isIntersecting: false,
  }),

  methods: {
    onIntersect(entries) {
      this.isIntersecting = entries[0].intersectionRatio >= 0.5;
    },
  },
};
</script>`;
