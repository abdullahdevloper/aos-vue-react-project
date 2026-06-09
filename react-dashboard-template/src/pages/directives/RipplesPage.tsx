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
const primary = "#0097a7";
const rippleEasing = "cubic-bezier(0.4, 0, 0.2, 1)";
const rippleTransitionIn = `transform .25s ${rippleEasing}, opacity .1s ${rippleEasing}`;
const rippleTransitionOut = `opacity .3s ${rippleEasing}`;
const colorClasses: Record<string, string> = {
  primary: "#0097a7",
  secondary: "#ffa726",
  info: "#42a5f5",
  success: "#00c853",
  warning: "#ffa000",
  error: "#d50000",
  red: "#f44336",
};

export default function RipplesPage() {
  return (
    <DocPage
      title="Ripples"
      namespace="Directives"
      icon={<Functions />}
      breadcrumbs={[
        { label: "Directives", href: "/directives/Intersect" },
        { label: "Ripples" },
      ]}
    >
      <DocText>
        <RichText text="The `v-ripple` directive is used to show action from a user. It can be applied to any block level element. Numerous components come with the ripple directive built in, such as the `v-btn`, `v-tabs-item` and many more." />
      </DocText>
      <UsageSection />
      <ExamplesSection />
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
        description="Basic ripple functionality can be enabled just by using `v-ripple` directive on a component or an HTML element"
        source={usageSource}
        minHeight={190}
        uninverted
      >
        <RippleSurface>HTML element with v-ripple</RippleSurface>
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
        title="Custom color"
        description="Using a helper class, you can change the color of the ripple."
        source={customColorSource}
        minHeight={356}
        uninverted
      >
        <CustomColorExample />
      </DirectiveExampleBlock>
      <DirectiveExampleBlock
        title="Centered ripple"
        description="When a `center` option is used ripple will always originate from the center of the target."
        source={centerSource}
        minHeight={190}
        uninverted
      >
        <RippleSurface center>HTML element with centered ripple</RippleSurface>
      </DirectiveExampleBlock>
      <DirectiveExampleBlock
        title="Ripple in components"
        description="Some components provide the `ripple` prop that allows you to controll the ripple effect. You can turn it off or customize the behaviour by using `class` or `center` options."
        source={rippleInComponentsSource}
        minHeight={150}
        uninverted
      >
        <RippleButtonsExample />
      </DirectiveExampleBlock>
    </Box>
  );
}

function OptionsSection() {
  const rows = [
    ["class", "`v-ripple=\"{ \"class\": 'my-class' }\"` Applies a custom class to the ripple, used for changing color"],
    ["center", "`v-ripple=\"{ \"center\": true }\"` Force ripple to originate from the center of the target"],
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

function RippleSurface({ children, center = false }: { children: ReactNode; center?: boolean }) {
  const ref = useRipple<HTMLDivElement>(center ? { center: true } : true);

  return (
    <Box
      ref={ref}
      tabIndex={0}
      className="text-center elevation-2 pa-12 text-h5"
      sx={{
        textAlign: "center",
        p: 6,
        fontSize: 24,
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: 0,
        bgcolor: "transparent",
        color: "rgba(0,0,0,.87)",
        boxShadow: "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)",
        outline: "none",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {children}
    </Box>
  );
}

function CustomColorExample() {
  const colors = ["primary", "secondary", "info", "success", "warning", "error"];

  return (
    <Box className="v-list" sx={{ bgcolor: "#fff", color: "rgba(0,0,0,.87)", py: 1, borderRadius: 0 }}>
      {colors.map((color) => (
        <RippleListItem key={color} color={color} />
      ))}
    </Box>
  );
}

function RippleListItem({ color }: { color: string }) {
  const ref = useRipple<HTMLDivElement>({ className: `${color}--text`, color: colorClasses[color] });

  return (
    <Box
      ref={ref}
      tabIndex={0}
      className="v-list-item"
      sx={{
        alignItems: "center",
        display: "flex",
        minHeight: 48,
        px: 2,
        position: "relative",
        overflow: "hidden",
        outline: "none",
        color: "rgba(0,0,0,.87)",
        cursor: "pointer",
        userSelect: "none",
        letterSpacing: 0,
        "&::after": { content: "''", minHeight: "inherit", fontSize: 0 },
        "&::before": {
          content: "''",
          position: "absolute",
          inset: 0,
          bgcolor: "currentColor",
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity .2s cubic-bezier(.4,0,.6,1)",
        },
        "&:hover::before": { opacity: 0.04 },
        "&:focus-visible::before": { opacity: 0.12 },
      }}
    >
      <Box className="v-list-item__content" sx={{ alignItems: "center", alignSelf: "center", display: "flex", flexWrap: "wrap", flex: "1 1", overflow: "hidden", py: 1.5 }}>
        <Typography className="v-list-item__title" sx={{ flex: "1 1 100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 16, lineHeight: 1.2 }}>
          Item with &quot;{color}&quot; class
        </Typography>
      </Box>
    </Box>
  );
}

function RippleButtonsExample() {
  return (
    <Box className="v-row py-12 justify-space-around" sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", py: 6, mx: -1.5, rowGap: 2 }}>
      <VBtn>With ripple (default)</VBtn>
      <VBtn ripple={false}>Without ripple</VBtn>
      <VBtn ripple={{ center: true }}>With centered ripple</VBtn>
      <VBtn text ripple={{ className: "red--text", color: colorClasses.red }}>With red ripple</VBtn>
    </Box>
  );
}

function VBtn({ children, ripple = true, text = false }: { children: ReactNode; ripple?: RippleBinding; text?: boolean }) {
  const ref = useRipple<HTMLButtonElement>(ripple);

  return (
    <Box
      component="button"
      ref={ref}
      type="button"
      className={`v-btn v-size--default${text ? " v-btn--text" : " primary"}`}
      sx={{
        alignItems: "center",
        border: 0,
        borderRadius: "4px",
        display: "inline-flex",
        flex: "0 0 auto",
        fontWeight: 500,
        letterSpacing: ".0892857143em",
        justifyContent: "center",
        outline: 0,
        position: "relative",
        textDecoration: "none",
        textIndent: ".0892857143em",
        textTransform: "uppercase",
        transitionDuration: ".28s",
        transitionProperty: "box-shadow, transform, opacity",
        transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
        userSelect: "none",
        verticalAlign: "middle",
        whiteSpace: "nowrap",
        height: 36,
        minWidth: 64,
        px: 2,
        fontSize: 14,
        overflow: "hidden",
        cursor: "pointer",
        color: text ? "rgba(0,0,0,.87)" : "#fff",
        bgcolor: text ? "transparent" : primary,
        boxShadow: text ? "none" : "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)",
        "&::before": {
          borderRadius: "inherit",
          bottom: 0,
          color: "inherit",
          content: "''",
          left: 0,
          opacity: 0,
          pointerEvents: "none",
          position: "absolute",
          right: 0,
          top: 0,
          transition: "opacity .2s cubic-bezier(.4,0,.6,1)",
          bgcolor: "currentColor",
        },
        "&:hover::before": { opacity: 0.08 },
        "&:focus-visible::before": { opacity: 0.24 },
        "&:active": text ? {} : { boxShadow: "0px 5px 5px -3px rgba(0,0,0,.2), 0px 8px 10px 1px rgba(0,0,0,.14), 0px 3px 14px 2px rgba(0,0,0,.12)" },
      }}
    >
      <Box className="v-btn__content" sx={{ alignItems: "center", color: "inherit", display: "flex", flex: "1 0 auto", justifyContent: "inherit", lineHeight: "normal", position: "relative" }}>
        {children}
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
        <Typography color={darkBody ? "rgba(255,255,255,.82)" : "text.secondary"} sx={{ fontSize: { xs: 15.5, md: 16 }, lineHeight: 1.68, fontWeight: 300, mb: 2.5, maxWidth: title ? 900 : 980 }}>
          <RichText text={description} />
        </Typography>
        {children}
      </Box>
    </Card>
  );
}

type RippleBinding = true | false | RippleOptions;

interface RippleOptions {
  className?: string;
  color?: string;
  center?: boolean;
  circle?: boolean;
}

function useRipple<T extends HTMLElement>(binding: RippleBinding = true) {
  const ref = useRef<T | null>(null);
  const bindingRef = useRef(binding);
  const touchedRef = useRef(false);
  const isTouchRef = useRef(false);
  const showTimerRef = useRef<number | null>(null);
  const showTimerCommitRef = useRef<(() => void) | null>(null);
  const keyboardRippleRef = useRef(false);

  useEffect(() => {
    bindingRef.current = binding;
  }, [binding]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const show = (event: MouseEvent | TouchEvent | KeyboardEvent) => {
      const value = bindingRef.current;
      if (!value || touchedRef.current) return;
      if (isTouchEvent(event)) {
        touchedRef.current = true;
        isTouchRef.current = true;
      } else if (isTouchRef.current) {
        return;
      }

      const options = value === true ? {} : value;
      const rippleOptions = {
        ...options,
        center: Boolean(options.center || isKeyboardEvent(event)),
      };

      if (isTouchEvent(event)) {
        if (showTimerCommitRef.current) return;
        showTimerCommitRef.current = () => showRipple(event, element, rippleOptions);
        showTimerRef.current = window.setTimeout(() => {
          showTimerCommitRef.current?.();
          showTimerCommitRef.current = null;
        }, 80);
      } else {
        showRipple(event, element, rippleOptions);
      }
    };

    const hide = (event: Event) => {
      if (showTimerRef.current !== null) window.clearTimeout(showTimerRef.current);
      if (event.type === "touchend" && showTimerCommitRef.current) {
        showTimerCommitRef.current();
        showTimerCommitRef.current = null;
        showTimerRef.current = window.setTimeout(() => hide(event), 0);
        return;
      }
      window.setTimeout(() => {
        touchedRef.current = false;
      });
      hideRipple(element);
    };

    const cancelShow = () => {
      showTimerCommitRef.current = null;
      if (showTimerRef.current !== null) window.clearTimeout(showTimerRef.current);
    };

    const keydown = (event: KeyboardEvent) => {
      if (!keyboardRippleRef.current && (event.key === "Enter" || event.key === " ")) {
        keyboardRippleRef.current = true;
        show(event);
      }
    };

    const keyup = (event: KeyboardEvent) => {
      keyboardRippleRef.current = false;
      hide(event);
    };

    if (binding) {
      element.addEventListener("touchstart", show, { passive: true });
      element.addEventListener("touchend", hide, { passive: true });
      element.addEventListener("touchmove", cancelShow, { passive: true });
      element.addEventListener("touchcancel", hide);
      element.addEventListener("mousedown", show);
      element.addEventListener("mouseup", hide);
      element.addEventListener("mouseleave", hide);
      element.addEventListener("keydown", keydown);
      element.addEventListener("keyup", keyup);
      element.addEventListener("dragstart", hide, { passive: true });
    }

    return () => {
      hideRipple(element);
      element.removeEventListener("touchstart", show);
      element.removeEventListener("touchend", hide);
      element.removeEventListener("touchmove", cancelShow);
      element.removeEventListener("touchcancel", hide);
      element.removeEventListener("mousedown", show);
      element.removeEventListener("mouseup", hide);
      element.removeEventListener("mouseleave", hide);
      element.removeEventListener("keydown", keydown);
      element.removeEventListener("keyup", keyup);
      element.removeEventListener("dragstart", hide);
    };
  }, [binding]);

  return ref;
}

function showRipple(event: MouseEvent | TouchEvent | KeyboardEvent, element: HTMLElement, value: RippleOptions) {
  const container = document.createElement("span");
  const animation = document.createElement("span");
  container.appendChild(animation);
  container.className = "v-ripple__container";
  applyRippleContainerStyles(container);
  if (value.className) container.className += ` ${value.className}`;
  if (value.color) container.style.color = value.color;

  const calculated = calculateRipple(event, element, value);
  const size = `${calculated.radius * 2}px`;
  animation.className = "v-ripple__animation";
  applyRippleAnimationBaseStyles(animation);
  animation.style.width = size;
  animation.style.height = size;

  element.appendChild(container);
  const computed = window.getComputedStyle(element);
  if (computed && computed.position === "static") {
    element.style.position = "relative";
    element.dataset.previousPosition = "static";
  }

  animation.classList.add("v-ripple__animation--enter");
  animation.classList.add("v-ripple__animation--visible");
  animation.style.transition = "none";
  setTransform(animation, `translate(${calculated.x}, ${calculated.y}) scale3d(${calculated.scale},${calculated.scale},${calculated.scale})`);
  animation.style.opacity = "0";
  animation.dataset.activated = String(performance.now());

  window.setTimeout(() => {
    animation.classList.remove("v-ripple__animation--enter");
    animation.classList.add("v-ripple__animation--in");
    animation.style.transition = rippleTransitionIn;
    setTransform(animation, `translate(${calculated.centerX}, ${calculated.centerY}) scale3d(1,1,1)`);
    animation.style.opacity = "0.25";
  }, 0);
}

function hideRipple(element: HTMLElement | null) {
  if (!element) return;
  const ripples = element.getElementsByClassName("v-ripple__animation");
  if (ripples.length === 0) return;
  const animation = ripples[ripples.length - 1] as HTMLElement;
  if (animation.dataset.isHiding) return;
  animation.dataset.isHiding = "true";
  const diff = performance.now() - Number(animation.dataset.activated);
  const delay = Math.max(250 - diff, 0);

  window.setTimeout(() => {
    animation.classList.remove("v-ripple__animation--in");
    animation.classList.add("v-ripple__animation--out");
    animation.style.transition = rippleTransitionOut;
    animation.style.opacity = "0";

    window.setTimeout(() => {
      const activeRipples = element.getElementsByClassName("v-ripple__animation");
      if (activeRipples.length === 1 && element.dataset.previousPosition) {
        element.style.position = element.dataset.previousPosition;
        delete element.dataset.previousPosition;
      }
      animation.parentNode && element.contains(animation.parentNode) && element.removeChild(animation.parentNode);
    }, 300);
  }, delay);
}

function applyRippleContainerStyles(container: HTMLElement) {
  container.style.color = "inherit";
  container.style.borderRadius = "inherit";
  container.style.position = "absolute";
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.left = "0";
  container.style.top = "0";
  container.style.overflow = "hidden";
  container.style.zIndex = "0";
  container.style.pointerEvents = "none";
  container.style.contain = "strict";
}

function applyRippleAnimationBaseStyles(animation: HTMLElement) {
  animation.style.color = "inherit";
  animation.style.position = "absolute";
  animation.style.top = "0";
  animation.style.left = "0";
  animation.style.borderRadius = "50%";
  animation.style.background = "currentColor";
  animation.style.opacity = "0";
  animation.style.pointerEvents = "none";
  animation.style.overflow = "hidden";
  animation.style.willChange = "transform, opacity";
}

function calculateRipple(event: MouseEvent | TouchEvent | KeyboardEvent, element: HTMLElement, value: RippleOptions = {}) {
  let localX = 0;
  let localY = 0;

  if (!isKeyboardEvent(event)) {
    const offset = element.getBoundingClientRect();
    const target = isTouchEvent(event) ? event.touches[event.touches.length - 1] : event;
    localX = target.clientX - offset.left;
    localY = target.clientY - offset.top;
  }

  let radius = 0;
  let scale = 0.3;
  if (value.circle) {
    scale = 0.15;
    radius = element.clientWidth / 2;
    radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
  } else {
    radius = Math.sqrt(element.clientWidth ** 2 + element.clientHeight ** 2) / 2;
  }

  const centerX = `${(element.clientWidth - radius * 2) / 2}px`;
  const centerY = `${(element.clientHeight - radius * 2) / 2}px`;
  const x = value.center ? centerX : `${localX - radius}px`;
  const y = value.center ? centerY : `${localY - radius}px`;
  return { radius, scale, x, y, centerX, centerY };
}

function isTouchEvent(event: Event): event is TouchEvent {
  return typeof TouchEvent !== "undefined" && event instanceof TouchEvent;
}

function isKeyboardEvent(event: Event): event is KeyboardEvent {
  return event instanceof KeyboardEvent;
}

function setTransform(element: HTMLElement, value: string) {
  element.style.transform = value;
  element.style.webkitTransform = value;
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
  return Object.fromEntries([["template", template]].filter(([, value]) => value));
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
  <div v-ripple class="text-center elevation-2 pa-12 text-h5">
    HTML element with v-ripple
  </div>
</template>`;

const customColorSource = `<template>
  <v-list>
    <v-list-item
      v-for="color in ['primary', 'secondary', 'info', 'success', 'warning', 'error']"
      :key="color"
      v-ripple="{ class: \`\${color}--text\` }"
    >
      <v-list-item-title>Item with "{{ color }}" class</v-list-item-title>
    </v-list-item>
  </v-list>
</template>`;

const centerSource = `<template>
  <div
    v-ripple="{ center: true }"
    class="text-center elevation-2 pa-12 text-h5"
  >
    HTML element with centered ripple
  </div>
</template>`;

const rippleInComponentsSource = `<template>
  <v-row
    class="py-12"
    justify="space-around"
  >
    <v-btn
      color="primary"
    >
      With ripple (default)
    </v-btn>
    <v-btn
      :ripple="false"
      color="primary"
    >
      Without ripple
    </v-btn>
    <v-btn
      :ripple="{ center: true }"
      color="primary"
    >
      With centered ripple
    </v-btn>
    <v-btn
      :ripple="{ class: 'red--text' }"
      text
    >
      With red ripple
    </v-btn>
  </v-row>
</template>`;
