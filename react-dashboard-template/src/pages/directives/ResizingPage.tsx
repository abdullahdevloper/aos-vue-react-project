import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
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

export default function ResizingPage() {
  return (
    <DocPage
      title="Resizing"
      namespace="Directives"
      icon={<Functions />}
      breadcrumbs={[
        { label: "Directives", href: "/directives/Intersect" },
        { label: "Resizing" },
      ]}
    >
      <DocText>
        <RichText text="The `v-resize` directive can be used for calling specific functions when the window resizes." />
      </DocText>
      <UsageSection />
      <OptionsSection />
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
        description="Resize your window and observe the values change.."
        source={usageSource}
        minHeight={170}
        uninverted
      >
        <ResizeUsageExample />
      </DirectiveExampleBlock>
    </Box>
  );
}

function OptionsSection() {
  const rows = [
    ["modifiers.quiet", "`v-resize.quiet=\"callback\"` Will **not** automatically invoke the provided callback on bind."],
    ["value", "`v-resize=\"callback\"` The function to invoke on window resize"],
  ];

  return (
    <Box component="section" sx={{ mb: 2 }}>
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

function ResizeUsageExample() {
  const [windowSize, setWindowSize] = useState({ x: 0, y: 0 });
  const onResize = useCallback(() => {
    setWindowSize({ x: window.innerWidth, y: window.innerHeight });
  }, []);
  const rowRef = useResize<HTMLDivElement>(onResize);

  useEffect(() => {
    onResize();
  }, [onResize]);

  return (
    <Box
      ref={rowRef}
      className="v-row align-center justify-center"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        margin: "-12px",
        color: "rgba(0,0,0,.87)",
        fontSize: 16,
        lineHeight: 1.5,
      }}
    >
      <Box
        component="span"
        className="v-subheader"
        sx={{
          alignItems: "center",
          display: "flex",
          height: 48,
          fontSize: 14,
          fontWeight: 400,
          px: 2,
          color: "rgba(0,0,0,.6)",
        }}
      >
        Window Size
      </Box>
      <Box component="span" sx={{ whiteSpace: "normal" }}>
        {JSON.stringify(windowSize, null, 2)}
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
  uninverted = false,
}: {
  title: string;
  description: string;
  source: string;
  children: ReactNode;
  minHeight: number;
  uninverted?: boolean;
}) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("template");
  const sourceSections = getSourceSections(source);
  const sectionNames = Object.keys(sourceSections);
  const activeSection = sourceSections[selectedSection] ? selectedSection : sectionNames[0];
  const darkBody = inverted && !uninverted;

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
          bgcolor: darkBody ? "#303030" : "transparent",
          color: darkBody ? "rgba(255,255,255,.92)" : "inherit",
          transition: "background-color 180ms ease, color 180ms ease",
        }}
      >
        <Typography color={darkBody ? "rgba(255,255,255,.82)" : "text.secondary"} sx={{ fontSize: { xs: 15.5, md: 16 }, lineHeight: 1.68, fontWeight: 300, mb: 2.5, maxWidth: 980 }}>
          <RichText text={description} />
        </Typography>
        {children}
      </Box>
    </Card>
  );
}

function useResize<T extends HTMLElement>(handler: () => void, quiet = false) {
  const ref = useRef<T | null>(null);
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const callback = () => handlerRef.current();
    window.addEventListener("resize", callback, { passive: true });
    if (!quiet) callback();
    return () => window.removeEventListener("resize", callback);
  }, [quiet]);

  return ref;
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|_[^_]+_)/g);
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
        if (part.startsWith("_") && part.endsWith("_")) {
          return <Box component="em" key={`${part}-${index}`}>{part.slice(1, -1)}</Box>;
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

const usageSource = `<template>
  <v-row v-resize="onResize" align="center" justify="center">
    <v-subheader>Window Size</v-subheader>
    {{ windowSize }}
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      windowSize: {
        x: 0,
        y: 0,
      },
    }),

    mounted () {
      this.onResize()
    },

    methods: {
      onResize () {
        this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      },
    },
  }
</script>`;
