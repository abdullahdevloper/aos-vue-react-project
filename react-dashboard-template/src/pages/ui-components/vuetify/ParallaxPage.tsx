import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Box,
  Card,
  Collapse,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Code, GitHub, InvertColors, ViewHeadline } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const neuInset =
  "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";

type ExampleKey = keyof typeof sourceTemplates;

function findScrollParent(el: HTMLElement | null): HTMLElement | Window {
  let node = el;
  while (node) {
    const style = window.getComputedStyle(node);
    if (/auto|scroll/.test(style.overflow + style.overflowY)) return node;
    node = node.parentElement;
  }
  return window;
}

function VParallax({
  src,
  height = 500,
  dark = false,
  alt = "",
  children,
}: {
  src: string;
  height?: number;
  dark?: boolean;
  alt?: string;
  children?: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const extraPx = 200;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scrollTarget = findScrollParent(el.parentElement);

    function update() {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const centerDist = rect.top + rect.height / 2 - viewH / 2;
      setOffsetY(-(centerDist * 0.4));
    }

    update();
    scrollTarget.addEventListener("scroll", update, { passive: true });
    return () => scrollTarget.removeEventListener("scroll", update);
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        height,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#c3c3c3",
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          position: "absolute",
          top: `-${extraPx / 2}px`,
          left: 0,
          width: "100%",
          height: `calc(100% + ${extraPx}px)`,
          objectFit: "cover",
          objectPosition: "center",
          transform: `translateY(${offsetY}px)`,
          willChange: "transform",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
      {children && (
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            color: dark ? "#fff" : "rgba(0,0,0,.87)",
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
}

export default function ParallaxPage() {
  return (
    <DocPage
      title="Parallax"
      namespace="Components"
      icon={<ViewHeadline />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Parallax" },
      ]}
    >
      <DocText>
        The <CodePill>v-parallax</CodePill> component creates a 3d effect that
        makes an image appear to scroll slower than the window.
      </DocText>
      <UsageSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <BaseHeading id="usage">Usage</BaseHeading>
      <VuetifyExampleBlock
        title=""
        source="usage"
        description="A parallax causes a shift in a background image when the user scrolls the page."
      >
        {() => (
          <VParallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" />
        )}
      </VuetifyExampleBlock>
    </Box>
  );
}

function ExamplesSection() {
  return (
    <Box component="section">
      <BaseHeading id="examples">Examples</BaseHeading>
      <ContentExample />
      <CustomHeightExample />
    </Box>
  );
}

function ContentExample() {
  return (
    <VuetifyExampleBlock
      title="With content"
      source="simple/content"
      description="You can also place any content inside of the parallax. This allows you to use the parallax as a hero image."
    >
      {() => (
        <VParallax
          src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
          dark
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ textAlign: "center", px: 2 }}>
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: "1.5rem", md: "2.125rem" },
                  fontWeight: 100,
                  mb: 2,
                  color: "#fff",
                  lineHeight: 1.235,
                  letterSpacing: ".0073529412em",
                }}
              >
                Vuetify.js
              </Typography>
              <Typography
                component="h4"
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 400,
                  color: "#fff",
                  lineHeight: 1.6,
                  letterSpacing: ".0094017857em",
                }}
              >
                Build your application today!
              </Typography>
            </Box>
          </Box>
        </VParallax>
      )}
    </VuetifyExampleBlock>
  );
}

function CustomHeightExample() {
  return (
    <VuetifyExampleBlock
      title="Custom height"
      source="simple/custom-height"
      description="You can specify a custom height on a parallax. Keep in mind this can break the parallax if your image is not sized properly"
    >
      {() => (
        <VParallax
          src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
          height={300}
        />
      )}
    </VuetifyExampleBlock>
  );
}

function BaseHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <Typography
      id={id}
      variant="h5"
      sx={{
        fontSize: { xs: 20, md: 22 },
        lineHeight: 1.45,
        fontWeight: 400,
        mb: 2.5,
      }}
    >
      {children}
    </Typography>
  );
}

function VuetifyExampleBlock({
  title,
  description,
  source,
  children,
}: {
  title: string;
  description: ReactNode;
  source: ExampleKey;
  children: () => ReactNode;
}) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card
      sx={{
        mb: 5,
        bgcolor: "background.default",
        boxShadow: neuInset,
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      <Toolbar
        variant="dense"
        sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}
      >
        {title && (
          <Typography sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>
            {title}
          </Typography>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors">
          <IconButton
            size="small"
            onClick={() => setInverted((v) => !v)}
            sx={exampleIconSx(inverted)}
          >
            <InvertColors sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="View on Github">
          <IconButton size="small" sx={exampleIconSx(false)}>
            <GitHub sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="View source">
          <IconButton
            size="small"
            onClick={() => setSourceOpen((v) => !v)}
            sx={exampleIconSx(sourceOpen)}
          >
            <Code sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", overflowX: "auto", p: 2 }}>
          <Box
            component="pre"
            sx={{
              m: 0,
              fontFamily: "'Roboto Mono', Consolas, monospace",
              fontSize: 12.5,
              lineHeight: 1.55,
              whiteSpace: "pre-wrap",
            }}
          >
            {sourceTemplates[source]}
          </Box>
        </Box>
      </Collapse>
      <Box
        sx={{
          bgcolor: inverted ? "#303030" : "transparent",
          color: inverted ? "rgba(255,255,255,.92)" : "inherit",
          "& a": { color: primary },
        }}
      >
        {description !== "" && description !== undefined && description !== null && (
          <Box sx={{ p: 2, pb: 0 }}>
            <Typography
              sx={{
                color: inverted ? "rgba(255,255,255,.72)" : "text.secondary",
                fontSize: { xs: 16, md: 20 },
                fontWeight: 300,
                lineHeight: 1.55,
                mb: 2,
              }}
            >
              {description}
            </Typography>
          </Box>
        )}
        <Box data-app="true">{children()}</Box>
      </Box>
    </Card>
  );
}

function CodePill({ children }: { children: ReactNode }) {
  return (
    <Box
      component="code"
      sx={{
        px: 0.55,
        py: 0.18,
        borderRadius: 0.75,
        bgcolor: "rgba(244,67,54,.08)",
        color: "#e53935",
        fontFamily: "'Roboto Mono', Consolas, monospace",
        fontSize: "88%",
      }}
    >
      {children}
    </Box>
  );
}

function exampleIconSx(active: boolean) {
  return {
    width: 30,
    height: 30,
    ml: 0.5,
    color: active ? primary : "text.secondary",
    bgcolor: active ? "rgba(0,151,167,.12)" : "transparent",
    "&:hover": {
      bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)",
    },
  };
}

const sourceTemplates = {
  usage: `<template>
  <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-parallax>
</template>`,
  "simple/content": `<template>
  <v-parallax
    dark
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <v-row align="center" justify="center">
      <v-col class="text-center" cols="12">
        <h1 class="text-h4 font-weight-thin mb-4">Vuetify.js</h1>
        <h4 class="subheading">Build your application today!</h4>
      </v-col>
    </v-row>
  </v-parallax>
</template>`,
  "simple/custom-height": `<template>
  <v-parallax
    height="300"
    src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
  ></v-parallax>
</template>`,
};
