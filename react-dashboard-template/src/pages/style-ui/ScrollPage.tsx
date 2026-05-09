import { useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Code, GitHub, InvertColors, SwapVert } from "@mui/icons-material";
import DocPage from "../../components/vuetify-docs/DocPage";

type TargetType = "number" | "selector" | "element";
type ElementTarget = "Button" | "Radio group";
type EasingName =
  | "linear"
  | "easeInQuad"
  | "easeOutQuad"
  | "easeInOutQuad"
  | "easeInCubic"
  | "easeOutCubic"
  | "easeInOutCubic"
  | "easeInQuart"
  | "easeOutQuart"
  | "easeInOutQuart"
  | "easeInQuint"
  | "easeOutQuint"
  | "easeInOutQuint";

const neuInset = "inset -5px -5px 6px rgba(255,255,255,.88), inset 6px 6px 8px rgba(174,174,192,.30)";
const darkPanel = "#2d2d2d";

const scrollCopy = {
  headingText:
    "You can Programmatically trigger scrolling in your application by using the `goTo` method found on the `$vuetify` object. This method supports several different types of target selectors, and options including smooth scrolling using built-in easing functions.",
  usage:
    "The `goTo` method takes two parameters `target` and `options`. `target` can be either a pixel offset from the top of the page, a valid css selector, or an element reference. `options` is an object that includes `duration`, `easing` ,`container`, and `offset`.",
  routerHeading: "Using with router",
  routerText1:
    "The **goTo** function can be individually imported and invoked anywhere. This is particularly useful when hooking up to [vue-router](https://router.vuejs.org/).",
  firstHeader: "First",
  secondHeader: "Second",
  thirdHeader: "Third",
  loremIpsum:
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
};

const easings: EasingName[] = [
  "linear",
  "easeInQuad",
  "easeOutQuad",
  "easeInOutQuad",
  "easeInCubic",
  "easeOutCubic",
  "easeInOutCubic",
  "easeInQuart",
  "easeOutQuart",
  "easeInOutQuart",
  "easeInQuint",
  "easeOutQuint",
  "easeInOutQuint",
];

const easingPatterns: Record<EasingName, (value: number) => number> = {
  linear: (t) => t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => --t * t * t + 1,
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeInQuart: (t) => t * t * t * t,
  easeOutQuart: (t) => 1 - --t * t * t * t,
  easeInOutQuart: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
  easeInQuint: (t) => t * t * t * t * t,
  easeOutQuint: (t) => 1 + --t * t * t * t * t,
  easeInOutQuint: (t) => (t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t),
};

export default function ScrollPage() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const radioRef = useRef<HTMLHeadingElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Box className="vuse-content-wrapper" ref={pageRef}>
      <DocPage
        title="Scroll"
        namespace="Styles"
        icon={<SwapVert />}
        breadcrumbs={[
          { label: "User Interface" },
          { label: "Scroll" },
        ]}
      >
        <DocHeading>Programmatic Scrolling</DocHeading>
        <RichDocText>{scrollCopy.headingText}</RichDocText>

        <ScrollUsageExample pageRef={pageRef} radioRef={radioRef} buttonRef={buttonRef} />

        <MarkdownHeading>{scrollCopy.routerHeading}</MarkdownHeading>
        <RichDocText>{scrollCopy.routerText1}</RichDocText>
        <CodePanel code={routerSnippet} />

        <AnchorSection id="first" title={scrollCopy.firstHeader} />
        <RichDocText>{scrollCopy.loremIpsum}</RichDocText>
        <RichDocText>{scrollCopy.loremIpsum}</RichDocText>
        <RichDocText>{scrollCopy.loremIpsum}</RichDocText>

        <AnchorSection id="second" title={scrollCopy.secondHeader} />
        <RichDocText>{scrollCopy.loremIpsum}</RichDocText>
        <RichDocText>{scrollCopy.loremIpsum}</RichDocText>
        <RichDocText>{scrollCopy.loremIpsum}</RichDocText>

        <AnchorSection id="third" title={scrollCopy.thirdHeader} />
        <RichDocText>{scrollCopy.loremIpsum}</RichDocText>
        <RichDocText>{scrollCopy.loremIpsum}</RichDocText>
        <RichDocText>{scrollCopy.loremIpsum}</RichDocText>
      </DocPage>
    </Box>
  );
}

function ScrollUsageExample({
  pageRef,
  radioRef,
  buttonRef,
}: {
  pageRef: React.RefObject<HTMLDivElement>;
  radioRef: React.RefObject<HTMLHeadingElement>;
  buttonRef: React.RefObject<HTMLButtonElement>;
}) {
  const [type, setType] = useState<TargetType>("number");
  const [number, setNumber] = useState(9999);
  const [selector, setSelector] = useState("#first");
  const [selected, setSelected] = useState<ElementTarget>("Button");
  const [duration, setDuration] = useState(300);
  const [offset, setOffset] = useState(0);
  const [easing, setEasing] = useState<EasingName>("easeInOutCubic");

  function scroll() {
    const container = getScrollContainer(pageRef.current);
    const target = resolveTarget({ type, number, selector, selected, buttonRef, radioRef });
    const targetLocation = typeof target === "number"
      ? getOffset(target) - offset
      : getOffset(target) - getOffset(container) - offset;

    animateScroll(container, targetLocation, duration, easingPatterns[easing]);
  }

  return (
    <ExampleBlock title="Usage" description={scrollCopy.usage} source={usageSource} height={595}>
      {(dark) => (
        <Box sx={{ maxWidth: 960, mx: "auto" }}>
          <Grid container>
            <Grid item xs={12}>
              <Typography ref={radioRef} component="h3" sx={{ fontSize: 24, fontWeight: 400, mb: 1.35, color: dark ? "rgba(255,255,255,.9)" : "text.primary" }}>
                Target
              </Typography>

              <RadioGroup row value={type} onChange={(event) => setType(event.target.value as TargetType)} sx={{ mb: 1.2 }}>
                <FormControlLabel value="number" control={<Radio sx={radioSx(dark)} />} label="Number" sx={controlLabelSx(dark)} />
                <FormControlLabel value="selector" control={<Radio sx={radioSx(dark)} />} label="Selector" sx={controlLabelSx(dark)} />
                <FormControlLabel value="element" control={<Radio sx={radioSx(dark)} />} label="DOMElement" sx={controlLabelSx(dark)} />
              </RadioGroup>

              {type === "number" ? (
                <TextField value={number} onChange={(event) => setNumber(Number(event.target.value))} type="number" label="Number" fullWidth variant="standard" sx={fieldSx(dark)} />
              ) : null}

              {type === "selector" ? (
                <FormControl fullWidth variant="standard" sx={fieldSx(dark)}>
                  <InputLabel>Selector</InputLabel>
                  <Select value={selector} label="Selector" onChange={(event) => setSelector(event.target.value)}>
                    {["#first", "#second", "#third"].map((item) => <MenuItem value={item} key={item}>{item}</MenuItem>)}
                  </Select>
                </FormControl>
              ) : null}

              {type === "element" ? (
                <FormControl fullWidth variant="standard" sx={fieldSx(dark)}>
                  <InputLabel>DOMElement</InputLabel>
                  <Select value={selected} label="DOMElement" onChange={(event) => setSelected(event.target.value as ElementTarget)}>
                    {(["Button", "Radio group"] as ElementTarget[]).map((item) => <MenuItem value={item} key={item}>{item}</MenuItem>)}
                  </Select>
                </FormControl>
              ) : null}
            </Grid>

            <Grid item xs={12} sx={{ mt: 3.1 }}>
              <Typography component="h3" sx={{ fontSize: 24, fontWeight: 400, mb: 2.2, color: dark ? "rgba(255,255,255,.9)" : "text.primary" }}>
                Options
              </Typography>

              <FormControl fullWidth variant="standard" sx={fieldSx(dark)}>
                <InputLabel>Easing</InputLabel>
                <Select value={easing} label="Easing" onChange={(event) => setEasing(event.target.value as EasingName)}>
                  {easings.map((item) => <MenuItem value={item} key={item}>{item}</MenuItem>)}
                </Select>
              </FormControl>

              <Box sx={{ mt: 2.4 }}>
                <SliderLabel dark={dark}>Duration</SliderLabel>
                <Slider min={0} max={1000} value={duration} onChange={(_, value) => setDuration(value as number)} valueLabelDisplay="auto" sx={sliderSx(dark)} />
              </Box>

              <Box sx={{ mt: 2.15 }}>
                <SliderLabel dark={dark}>Offset</SliderLabel>
                <Slider min={-500} max={500} value={offset} onChange={(_, value) => setOffset(value as number)} valueLabelDisplay="auto" sx={sliderSx(dark)} />
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2.6 }}>
              <Button ref={buttonRef} fullWidth onClick={scroll} sx={primaryButtonSx}>
                scroll
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </ExampleBlock>
  );
}

function ExampleBlock({ title, description, source, children, height }: { title: string; description: string; source: string; children: (dark: boolean) => ReactNode; height: number }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card elevation={0} sx={{ mb: 4.5, borderRadius: 1, bgcolor: "background.default", boxShadow: neuInset, backgroundImage: "none", overflow: "hidden" }}>
      <Toolbar variant="dense" sx={{ minHeight: 56, px: { xs: 2.25, md: 2.75 }, bgcolor: "transparent", alignItems: "center" }}>
        <Typography sx={{ fontSize: 19, fontWeight: 500, lineHeight: 1.35 }}>{title}</Typography>
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
      <Box sx={{ minHeight: height, p: 2, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.9)" : "inherit", transition: "background-color 180ms ease, color 180ms ease" }}>
        <RichDocText dark={inverted}>{description}</RichDocText>
        {children(inverted)}
      </Box>
    </Card>
  );
}

function RichDocText({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <Typography
      component="div"
      sx={{
        color: dark ? "rgba(255,255,255,.72)" : "text.secondary",
        fontSize: { xs: 16, md: 20 },
        fontWeight: 300,
        lineHeight: 1.65,
        mb: 3,
        "& code": inlineCodeSx,
        "& strong": { fontWeight: 700, color: dark ? "rgba(255,255,255,.9)" : "text.primary" },
        "& a": { color: "primary.main", textDecoration: "underline" },
      }}
    >
      {renderRichText(children)}
    </Typography>
  );
}

function DocHeading({ children }: { children: ReactNode }) {
  return <Typography component="h1" sx={{ fontSize: { xs: 40, md: 48 }, fontWeight: 300, lineHeight: 1.18, mt: 4, mb: 1.5 }}>{children}</Typography>;
}

function MarkdownHeading({ children }: { children: ReactNode }) {
  return <Typography component="h2" sx={{ fontSize: { xs: 30, md: 32 }, fontWeight: 500, lineHeight: 1.3, mt: 4, mb: 1.4 }}>{children}</Typography>;
}

function AnchorSection({ id, title }: { id: string; title: string }) {
  return <Typography id={id} component="h2" sx={{ fontSize: { xs: 30, md: 32 }, fontWeight: 500, lineHeight: 1.3, mt: 4.5, mb: 1.4 }}>{title}</Typography>;
}

function CodePanel({ code }: { code: string }) {
  return (
    <Card sx={{ position: "relative", bgcolor: darkPanel, color: "#fff", borderRadius: 1, boxShadow: "none", backgroundImage: "none", mb: 3, overflow: "hidden" }}>
      <Box component="pre" sx={{ m: 0, p: 2.25, overflowX: "auto", fontFamily: "'Inconsolata', 'Roboto Mono', monospace", fontSize: 15, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>
        <code>{code}</code>
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

function SliderLabel({ children, dark }: { children: ReactNode; dark: boolean }) {
  return <Typography sx={{ color: dark ? "rgba(255,255,255,.68)" : "text.secondary", fontSize: 14, mb: -0.2 }}>{children}</Typography>;
}

function renderRichText(text: string) {
  const parts = text.split(/(<code>.*?<\/code>|`[^`]+`|\*\*.*?\*\*|\[.*?\]\(.*?\))/g).filter(Boolean);
  return parts.map((part, index) => {
    if (part.startsWith("<code>") && part.endsWith("</code>")) return <Box key={index} component="code">{part.slice(6, -7)}</Box>;
    if (part.startsWith("`") && part.endsWith("`")) return <Box key={index} component="code">{part.slice(1, -1)}</Box>;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (link) return <Box key={index} component="a" href={link[2]}>{link[1]}</Box>;
    return <span key={index}>{part}</span>;
  });
}

function resolveTarget({
  type,
  number,
  selector,
  selected,
  buttonRef,
  radioRef,
}: {
  type: TargetType;
  number: number;
  selector: string;
  selected: ElementTarget;
  buttonRef: RefObject<HTMLButtonElement>;
  radioRef: RefObject<HTMLHeadingElement>;
}) {
  if (type === "number") return Number(number);
  if (type === "selector") {
    const target = document.querySelector(selector);
    if (target instanceof HTMLElement) return target;
    throw new Error(`Target element "${selector}" not found.`);
  }

  const target = selected === "Button" ? buttonRef.current : radioRef.current;
  if (target instanceof HTMLElement) return target;
  throw new TypeError(`Target must be a Number/Selector/HTMLElement, received ${target} instead.`);
}

function getScrollContainer(page: HTMLElement | null) {
  const container = page?.closest("main");
  if (container instanceof HTMLElement) return container;
  const fallback = document.scrollingElement || document.body || document.documentElement;
  if (fallback instanceof HTMLElement) return fallback;
  throw new TypeError("Container must be a Selector/HTMLElement.");
}

function getOffset(target: number | HTMLElement) {
  if (typeof target === "number") return target;

  let totalOffset = 0;
  let element: HTMLElement | null = target;
  while (element) {
    totalOffset += element.offsetTop;
    element = element.offsetParent as HTMLElement | null;
  }
  return totalOffset;
}

function animateScroll(container: HTMLElement, targetLocation: number, duration: number, easing: (value: number) => number) {
  const startLocation = container.scrollTop;
  const startTime = performance.now();

  if (targetLocation === startLocation) return;

  if (duration <= 0) {
    container.scrollTop = Math.floor(targetLocation);
    return;
  }

  function step(currentTime: number) {
    const timeElapsed = currentTime - startTime;
    const progress = Math.abs(Math.min(timeElapsed / duration, 1));
    container.scrollTop = Math.floor(startLocation + (targetLocation - startLocation) * easing(progress));

    if (progress === 1 || container.clientHeight + container.scrollTop >= container.scrollHeight) return;
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const inlineCodeSx = {
  px: 0.45,
  py: 0.12,
  mx: 0.15,
  borderRadius: 0.5,
  color: "#c0341d",
  bgcolor: "#fbe5e1",
  boxShadow: "none",
  fontFamily: "Roboto Mono, Consolas, monospace",
  fontSize: "85%",
};

const fieldSx = (dark: boolean) => ({
  mt: 0.6,
  mb: 1.5,
  "& .MuiInputLabel-root": { color: dark ? "rgba(255,255,255,.62)" : "text.secondary", fontSize: 16, "&.Mui-focused": { color: "primary.main" } },
  "& .MuiInputBase-root": { color: dark ? "rgba(255,255,255,.9)" : "text.primary", fontSize: 16 },
  "& .MuiInputBase-input": { py: 1.05 },
  "& .MuiInput-underline:before": { borderBottomColor: dark ? "rgba(255,255,255,.28)" : "rgba(38,50,56,.34)" },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: dark ? "rgba(255,255,255,.55)" : "rgba(38,50,56,.62)" },
  "& .MuiInput-underline:after": { borderBottomColor: "primary.main" },
  "& .MuiSvgIcon-root": { color: dark ? "rgba(255,255,255,.72)" : "text.secondary" },
});

const controlLabelSx = (dark: boolean) => ({
  mr: 2.4,
  "& .MuiFormControlLabel-label": { fontSize: 16, color: dark ? "rgba(255,255,255,.82)" : "text.primary" },
});

const radioSx = (dark: boolean) => ({
  color: dark ? "rgba(255,255,255,.62)" : "rgba(38,50,56,.62)",
  "&.Mui-checked": { color: "primary.main" },
});

const sliderSx = (dark: boolean) => ({
  color: "primary.main",
  height: 2,
  "& .MuiSlider-rail": { color: dark ? "rgba(255,255,255,.28)" : "rgba(38,50,56,.22)", opacity: 1 },
  "& .MuiSlider-track": { border: 0 },
  "& .MuiSlider-thumb": { width: 20, height: 20, boxShadow: "0 2px 7px rgba(38,50,56,.2)", "&:hover": { boxShadow: "0 0 0 8px rgba(0,131,143,.10)" } },
  "& .MuiSlider-valueLabel": { bgcolor: "primary.main", color: "#fff", fontSize: 12 },
});

const primaryButtonSx = {
  minHeight: 38,
  borderRadius: 1,
  bgcolor: "primary.main",
  color: "#fff",
  textTransform: "lowercase",
  fontWeight: 500,
  boxShadow: "0 3px 7px rgba(38,50,56,.18)",
  "&:hover": { bgcolor: "primary.dark", boxShadow: "0 5px 10px rgba(38,50,56,.20)" },
};

const exampleActionSx = (active: boolean) => ({
  width: 23,
  height: 23,
  mx: 0.12,
  color: active ? "primary.main" : "text.secondary",
  opacity: active ? 0.75 : 0.5,
  bgcolor: "transparent",
});

const routerSnippet = `// src/router.js

import Router from 'vue-router'
import goTo from 'vuetify/es5/services/goto'

export default new Router({
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0

    if (to.hash) {
      scrollTo = to.hash
    } else if (savedPosition) {
      scrollTo = savedPosition.y
    }

    return goTo(scrollTo)
  },
  routes: [
    //
  ],
})`;

const usageSource = `<v-container>
  <v-row>
    <v-col cols="12">
      <h3 ref="radio" class="text-h5">Target</h3>

      <v-radio-group v-model="type" row>
        <v-radio label="Number" value="number"></v-radio>
        <v-radio label="Selector" value="selector"></v-radio>
        <v-radio label="DOMElement" value="element"></v-radio>
      </v-radio-group>

      <v-text-field v-if="type === 'number'" v-model="number" type="number" label="Number"></v-text-field>
      <v-select v-if="type === 'selector'" v-model="selector" label="Selector" :items="selections"></v-select>
      <v-select v-if="type === 'element'" v-model="selected" :items="elements" label="DOMElement"></v-select>
    </v-col>

    <v-col cols="12">
      <h3 class="text-h5">Options</h3>
      <v-select v-model="easing" :items="easings" label="Easing"></v-select>
      <v-slider v-model="duration" min="0" max="1000" label="Duration" thumb-label></v-slider>
      <v-slider v-model="offset" min="-500" max="500" label="Offset" thumb-label></v-slider>
    </v-col>

    <v-col>
      <v-btn ref="button" block color="primary" @click="$vuetify.goTo(target, options)">scroll</v-btn>
    </v-col>
  </v-row>
</v-container>`;
