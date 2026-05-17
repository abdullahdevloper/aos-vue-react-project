import { cloneElement, forwardRef, isValidElement, useEffect, useLayoutEffect, useRef, useState, type ReactElement, type ReactNode, type Ref } from "react";
import { createPortal } from "react-dom";
import { Box, Button, Card, Collapse, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { Code as CodeIcon, GitHub, InvertColors, Label } from "@mui/icons-material";
import { mdiCart, mdiHome } from "@mdi/js";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097A7";
const textSecondary = "rgba(0,0,0,.6)";
const appBackground = "#F2F3F7";
const neuInset = "inset -7px -7px 5px #FFFFFF, inset 7px 7px 7px #DDE4EF";

type ExampleKey = "usage" | "alignment" | "visibility";
type TooltipSide = "top" | "right" | "bottom" | "left";

export default function TooltipsPage() {
  return (
    <DocPage
      title="Tooltips"
      namespace="Components"
      icon={<Label />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Tooltips" },
      ]}
    >
      <DocText>
        The <CodePill>v-tooltip</CodePill> component is useful for conveying information when a user hovers over an element. You can also programmatically control the display of tooltips through a <CodePill>v-model</CodePill>. When activated, tooltips display a text label identifying an element, such as a description of its function.
      </DocText>

      <Box component="section" sx={{ mb: 5 }}>
        <BaseHeading id="usage">Usage</BaseHeading>
        <ExampleBlock source="usage" description="Tooltips can wrap any element.">
          <Box sx={{ alignItems: "center", display: "flex", justifyContent: "center", minHeight: 48, textAlign: "center" }}>
            <VTooltip text="Tooltip" side="bottom">
              <VButton>Button</VButton>
            </VTooltip>
            <VTooltip text="Tooltip" side="bottom">
              <VIcon name="mdi-home" color={primary} />
            </VTooltip>
            <VTooltip text="Tooltip" side="bottom">
              <Box component="span" sx={{ color: "rgba(0,0,0,.87)", fontSize: 16 }}>This text has a tooltip</Box>
            </VTooltip>
          </Box>
        </ExampleBlock>
      </Box>

      <Box component="section" id="examples">
        <BaseHeading id="examples">Examples</BaseHeading>
        <ExampleBlock title="Alignment" source="alignment" description="A tooltip can be aligned to any of the four sides of the activator element">
          <Box sx={{ textAlign: "center", minHeight: 48 }}>
            <VTooltip text="Left tooltip" side="left"><VButton>Left</VButton></VTooltip>
            <VTooltip text="Top tooltip" side="top"><VButton>Top</VButton></VTooltip>
            <VTooltip text="Bottom tooltip" side="bottom"><VButton>Bottom</VButton></VTooltip>
            <VTooltip text="Right tooltip" side="right"><VButton>Right</VButton></VTooltip>
          </Box>
        </ExampleBlock>

        <VisibilityExample />
      </Box>
    </DocPage>
  );
}

function VisibilityExample() {
  const [show, setShow] = useState(false);
  return (
    <ExampleBlock title="Visibility" source="visibility" description={<>Tooltip visibility can be programmatically changed using <CodePill>v-model</CodePill>.</>}>
      <Box sx={{ px: 1.5, textAlign: "center", width: "100%" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", mx: -1.5 }}>
          <Box sx={{ boxSizing: "border-box", flexBasis: "100%", px: 1.5 }}>
            <VButton color="default" dark={false} onClick={() => setShow((value) => !value)}>toggle</VButton>
          </Box>
          <Box sx={{ boxSizing: "border-box", flexBasis: "100%", mt: 6, px: 1.5 }}>
            <VTooltip text="Programmatic tooltip" side="top" value={show} onValueChange={setShow}>
              <IconButton sx={{ color: "#bdbdbd", height: 36, width: 36 }}>
                <VIcon name="mdi-cart" color="#bdbdbd" />
              </IconButton>
            </VTooltip>
          </Box>
        </Box>
      </Box>
    </ExampleBlock>
  );
}

function VTooltip({ children, onValueChange, side, text, value }: { children: ReactNode; onValueChange?: (value: boolean) => void; side: TooltipSide; text: string; value?: boolean }) {
  const activatorRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const openTimeout = useRef<number | undefined>(undefined);
  const closeTimeout = useRef<number | undefined>(undefined);
  const [internalActive, setInternalActive] = useState(false);
  const [hasBooted, setHasBooted] = useState(Boolean(value));
  const [position, setPosition] = useState({ left: 0, ready: false, top: 0 });
  const active = value ?? internalActive;

  const setActive = (next: boolean) => {
    if (value === undefined) setInternalActive(next);
    onValueChange?.(next);
    if (next) setHasBooted(true);
  };

  const clearDelay = () => {
    window.clearTimeout(openTimeout.current);
    window.clearTimeout(closeTimeout.current);
  };

  const runDelay = (type: "open" | "close") => {
    clearDelay();
    const next = type === "open";
    const timeout = window.setTimeout(() => setActive(next), 0);
    if (next) openTimeout.current = timeout;
    else closeTimeout.current = timeout;
  };

  useEffect(() => {
    if (active) setHasBooted(true);
  }, [active]);

  useEffect(() => () => clearDelay(), []);

  const updatePosition = () => {
    const activator = activatorRef.current;
    const content = contentRef.current;
    if (!activator || !content) return;

    const activatorRect = activator.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    let left = 0;
    let top = 0;

    if (side === "top" || side === "bottom") {
      left = activatorRect.left + activatorRect.width / 2 - contentRect.width / 2;
      top = side === "bottom" ? activatorRect.bottom + 10 : activatorRect.top - contentRect.height - 10;
    } else {
      left = side === "right" ? activatorRect.right + 10 : activatorRect.left - contentRect.width - 10;
      top = activatorRect.top + activatorRect.height / 2 - contentRect.height / 2;
    }

    const pageXOffset = window.pageXOffset || document.documentElement.scrollLeft || 0;
    const pageYOffset = window.pageYOffset || document.documentElement.scrollTop || 0;
    const pageWidth = document.documentElement.clientWidth;
    const xOverflow = left + contentRect.width - pageWidth + 12;

    if (side !== "left" && xOverflow > 0) {
      left = Math.max(left - xOverflow, 0);
    } else {
      left = Math.max(left, 12);
    }

    top += pageYOffset;
    const windowBottom = pageYOffset + (window.innerHeight || document.documentElement.clientHeight);
    const totalHeight = top + contentRect.height;

    if (windowBottom < totalHeight) {
      top = windowBottom - contentRect.height - 12;
    } else if (top < pageYOffset) {
      top = pageYOffset + 12;
    }

    setPosition({ left: left + pageXOffset, ready: true, top: top < 12 ? 12 : top });
  };

  useLayoutEffect(() => {
    if (!active) return;
    updatePosition();
    const id = window.requestAnimationFrame(updatePosition);
    return () => window.cancelAnimationFrame(id);
  }, [active, side, text]);

  useEffect(() => {
    if (!active) return undefined;
    const handle = () => updatePosition();
    window.addEventListener("scroll", handle, true);
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle, true);
      window.removeEventListener("resize", handle);
    };
  }, [active, side]);

  const activator = isValidElement(children)
    ? (() => {
        const element = children as ReactElement<Record<string, unknown>> & { ref?: Ref<HTMLElement> };
        const props = element.props as {
          onBlur?: (event: unknown) => void;
          onFocus?: (event: unknown) => void;
          onKeyDown?: (event: { key?: string }) => void;
          onMouseEnter?: (event: unknown) => void;
          onMouseLeave?: (event: unknown) => void;
          sx?: unknown;
        };

        return cloneElement(element, {
          "aria-expanded": String(active),
          "aria-haspopup": true,
          onBlur: (event: unknown) => {
            props.onBlur?.(event);
            runDelay("close");
          },
          onFocus: (event: unknown) => {
            props.onFocus?.(event);
            runDelay("open");
          },
          onKeyDown: (event: { key?: string }) => {
            props.onKeyDown?.(event);
            if (event.key === "Escape") runDelay("close");
          },
          onMouseEnter: (event: unknown) => {
            props.onMouseEnter?.(event);
            runDelay("open");
          },
          onMouseLeave: (event: unknown) => {
            props.onMouseLeave?.(event);
            runDelay("close");
          },
          ref: mergeRefs(element.ref, (node: HTMLElement | null) => {
            activatorRef.current = node;
          }),
          role: "button",
        });
      })()
    : children;

  return (
    <>
      {activator}
      {hasBooted && createPortal(
        <Box
          ref={contentRef}
          className={`v-tooltip__content v-tooltip--${side}`}
          sx={{
            bgcolor: "rgba(97,97,97,.9)",
            borderRadius: 1,
            color: "#fff",
            display: "inline-block",
            fontSize: 14,
            left: position.left,
            lineHeight: "22px",
            opacity: active && position.ready ? 0.9 : 0,
            p: "5px 16px",
            pointerEvents: "none",
            position: "absolute",
            textTransform: "initial",
            top: position.top,
            transform: active && position.ready ? "scale(1)" : position.ready ? "scale(1)" : "scale(0)",
            transformOrigin: "center center",
            transition: active ? "opacity 150ms cubic-bezier(0, 0, 0.2, 1), transform 150ms cubic-bezier(0, 0, 0.2, 1)" : "opacity 75ms cubic-bezier(0, 0, 0.2, 1)",
            width: "auto",
            zIndex: 8,
          }}
        >
          <span>{text}</span>
        </Box>,
        document.body
      )}
    </>
  );
}

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") ref(node);
      else if (typeof ref === "object" && "current" in ref) (ref as { current: T | null }).current = node;
    });
  };
}

const VButton = forwardRef<HTMLButtonElement, { children: ReactNode; color?: "primary" | "default"; dark?: boolean; onClick?: () => void; [key: string]: any }>(function VButton({ children, color = "primary", dark = true, onClick, ...activatorProps }, ref) {
  const isPrimary = color === "primary";
  return (
    <Button
      ref={ref}
      onClick={onClick}
      {...activatorProps}
      sx={{
        bgcolor: isPrimary ? primary : "#fff",
        borderRadius: 1,
        boxShadow: "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)",
        color: dark && isPrimary ? "#fff" : "rgba(0,0,0,.87)",
        fontSize: 14,
        fontWeight: 500,
        height: 36,
        letterSpacing: ".0892857143em",
        lineHeight: "36px",
        minWidth: 64,
        px: 2,
        textTransform: "uppercase",
        "&:hover": {
          bgcolor: isPrimary ? primary : "#fff",
        },
      }}
    >
      {children}
    </Button>
  );
});

const VIcon = forwardRef<SVGSVGElement, { color?: string; name: "mdi-home" | "mdi-cart"; size?: number; [key: string]: any }>(function VIcon({ color = "inherit", name, size = 24, ...activatorProps }, ref) {
  const path = name === "mdi-cart" ? mdiCart : mdiHome;
  return <Box ref={ref} component="svg" viewBox="0 0 24 24" {...activatorProps} sx={{ color, display: "inline-block", height: size, verticalAlign: "middle", width: size }}><Box component="path" d={path} fill="currentColor" /></Box>;
});

function BaseHeading({ children, id }: { children: ReactNode; id?: string }) {
  return <Typography id={id} component="h2" sx={{ fontSize: 32, lineHeight: 1.2, fontWeight: 400, mb: 2 }}>{children}</Typography>;
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: 0.55, py: 0.18, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function ExampleBlock({ title, description, source, children }: { title?: string; description?: ReactNode; source: ExampleKey; children: ReactNode }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card sx={{ mb: 5, bgcolor: appBackground, boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
        {title ? <Typography sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>{title}</Typography> : null}
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}><CodeIcon sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", overflowX: "auto", p: 2 }}>
          <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box>
        </Box>
      </Collapse>
      <Box sx={{ bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.7)" : textSecondary, p: 2, overflow: "visible" }}>
        {description ? <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : textSecondary, fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography> : null}
        <Box data-app="true" sx={{ overflow: "visible" }}>{children}</Box>
      </Box>
    </Card>
  );
}

function exampleIconSx(active: boolean) {
  return { bgcolor: active ? "rgba(0,151,167,.14)" : "transparent", color: active ? primary : textSecondary, height: 28, width: 28, mx: 0.25 };
}

const sourceTemplates: Record<ExampleKey, string> = {
  usage: `<template>
  <div class="text-center d-flex align-center">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Button</v-btn>
      </template>
      <span>Tooltip</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-icon color="primary" dark v-on="on">mdi-home</v-icon>
      </template>
      <span>Tooltip</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <span v-on="on">This text has a tooltip</span>
      </template>
      <span>Tooltip</span>
    </v-tooltip>
  </div>
</template>`,
  alignment: `<template>
  <div class="text-center">
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Left</v-btn>
      </template>
      <span>Left tooltip</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Top</v-btn>
      </template>
      <span>Top tooltip</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Bottom</v-btn>
      </template>
      <span>Bottom tooltip</span>
    </v-tooltip>

    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Right</v-btn>
      </template>
      <span>Right tooltip</span>
    </v-tooltip>
  </div>
</template>`,
  visibility: `<template>
  <v-container fluid class="text-center">
    <v-row
      class="flex"
      justify="space-between"
    >
      <v-col cols="12">
        <v-btn @click="show = !show">toggle</v-btn>
      </v-col>

      <v-col cols="12" class="mt-12">
        <v-tooltip v-model="show" top>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon color="grey lighten-1">mdi-cart</v-icon>
            </v-btn>
          </template>
          <span>Programmatic tooltip</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        show: false,
      }
    },
  }
</script>`,
};
