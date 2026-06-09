import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { AddCircle, Check, Code, GitHub, InvertColors, Slideshow } from "@mui/icons-material";
import DocPage from "../../components/vuetify-docs/DocPage";

type Effect = "slide-x" | "slide-x-reverse" | "slide-y" | "slide-y-reverse" | "scroll-x" | "scroll-x-reverse" | "scroll-y" | "scroll-y-reverse" | "scale" | "fab" | "fade";

interface Task {
  text: string;
  done: boolean;
}

const neuGlow = "-7px -7px 5px rgba(255,255,255,.86), 7px 7px 7px rgba(174,174,192,.30)";
const neuInset = "inset -5px -5px 6px rgba(255,255,255,.88), inset 6px 6px 8px rgba(174,174,192,.30)";
const darkPanel = "#2d2d2d";

const motionCopy = {
  headingText: "Smooth animations help make a UI feel great. Using Vue's transition system and re-usable functional components, you can easily control the motion of your application. Most components can have their transition altered through the <code>transition</code> prop.",
  usage: "Vuetify comes with over 10 custom css animations that can be applied to numerous components or your own custom use-case",
  slideX: "Slide x transitions move along the horizontal axis.",
  slideY: "Animations use the application's <code>$primary-transition</code>.",
  scrollX: "Scroll X transitions continue along the horizontal axis.",
  scrollY: "Scroll Y transitions continue along the vertical axis.",
  scale: "Many of Vuetify's components contain a <code>transition</code> prop which allows you to specify your own.",
  fab: "An example of the fab transition can be found in the `v-speed-dial` component.",
  fade: "An example of the fade transition can be found on the Carousel component.",
  expand: "The expand transition is used in Expansion Panels and List Groups. There is also a horizontal version available with `v-expand-x-transition`.",
  customOrigin: "Programmatically control the transition origin with a simple prop.",
  todo: "Using multiple custom transitions, it is easy to bring a simple todo list to life!",
};

export default function TransitionsPage() {
  return (
    <Box className="vuse-content-wrapper">
      <DocPage
        title="Transitions"
        namespace="Styles"
        icon={<Slideshow />}
        breadcrumbs={[
          { label: "User Interface" },
          { label: "Transitions" },
        ]}
      >
        <DocHeading>Motion</DocHeading>
        <RichDocText>{motionCopy.headingText}</RichDocText>

        <MotionExample title="Usage" description={motionCopy.usage} source={usageSource} height={360}>
          {(bodyDark) => <TransitionRow>
            <TransitionMenu label="Slide X Transition" effect="slide-x" tone="primary" dark={bodyDark} />
            <TransitionMenu label="Scroll Y Transition" effect="scroll-y" tone="secondary" dark={bodyDark} />
          </TransitionRow>
          }
        </MotionExample>

        <MotionExample title="Slide X transitions" description={motionCopy.slideX} source={slideXSource}>
          {(bodyDark) => <TransitionRow>
            <TransitionMenu label="Slide X Transition" effect="slide-x" tone="primary" dark={bodyDark} />
            <TransitionMenu label="Slide X Reverse Transition" effect="slide-x-reverse" tone="secondary" dark={bodyDark} />
          </TransitionRow>
          }
        </MotionExample>

        <MotionExample title="Slide Y transitions" description={motionCopy.slideY} source={slideYSource}>
          {(bodyDark) => <TransitionRow>
            <TransitionMenu label="Slide Y Transition" effect="slide-y" tone="primary" dark={bodyDark} />
            <TransitionMenu label="Slide Y Reverse Transition" effect="slide-y-reverse" tone="secondary" dark={bodyDark} />
          </TransitionRow>
          }
        </MotionExample>

        <MotionExample title="Scroll X transitions" description={motionCopy.scrollX} source={scrollXSource}>
          {(bodyDark) => <TransitionRow>
            <TransitionMenu label="Scroll X Transition" effect="scroll-x" tone="primary" dark={bodyDark} />
            <TransitionMenu label="Scroll X Reverse Transition" effect="scroll-x-reverse" tone="secondary" dark={bodyDark} />
          </TransitionRow>
          }
        </MotionExample>

        <MotionExample title="Scroll Y transitions" description={motionCopy.scrollY} source={scrollYSource}>
          {(bodyDark) => <TransitionRow>
            <TransitionMenu label="Scroll Y Transition" effect="scroll-y" tone="primary" dark={bodyDark} />
            <TransitionMenu label="Scroll Y Reverse Transition" effect="scroll-y-reverse" tone="secondary" dark={bodyDark} />
          </TransitionRow>
          }
        </MotionExample>

        <MotionExample title="Scale transition" description={motionCopy.scale} source={scaleSource}>
          {(bodyDark) => <TransitionRow>
            <TransitionMenu label="Scale Transition" effect="scale" tone="primary" dark={bodyDark} />
          </TransitionRow>
          }
        </MotionExample>

        <MotionExample title="Fab transition" description={motionCopy.fab} source={fabSource}>
          {(bodyDark) => <TransitionRow>
            <TransitionMenu label="Fab Transition" effect="fab" tone="primary" dark={bodyDark} />
          </TransitionRow>
          }
        </MotionExample>

        <MotionExample title="Fade transition" description={motionCopy.fade} source={fadeSource}>
          {(bodyDark) => <TransitionRow>
            <TransitionMenu label="Fade Transition" effect="fade" tone="primary" dark={bodyDark} />
          </TransitionRow>
          }
        </MotionExample>

        <MotionExample title="Expand transition" description={motionCopy.expand} source={expandSource} height={285}>
          {(bodyDark) => <ExpandExample dark={bodyDark} />}
        </MotionExample>

        <MotionExample title="Custom Origin" description={motionCopy.customOrigin} source={customOriginSource}>
          {(bodyDark) => <TransitionRow>
            <TransitionMenu label="Scale Transition" effect="scale" tone="primary" origin="center center" dark={bodyDark} />
          </TransitionRow>
          }
        </MotionExample>

        <MotionExample title="Todo list" description={motionCopy.todo} source={todoSource} height={455}>
          {(bodyDark) => <TodoExample dark={bodyDark} />}
        </MotionExample>
      </DocPage>
    </Box>
  );
}

function TransitionRow({ children }: { children: ReactNode }) {
  return <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 3, sm: 7 }} justifyContent="center" alignItems="flex-start" sx={{ pt: 1.25 }}>{children}</Stack>;
}

function TransitionMenu({ label, effect, tone, origin = "top left", dark = false }: { label: string; effect: Effect; tone: "primary" | "secondary"; origin?: string; dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const style = transitionStyle(effect, open, origin);

  return (
    <Box sx={{ minWidth: 220, textAlign: "center", position: "relative" }}>
      <Button onClick={() => setOpen((value) => !value)} sx={vuseButtonSx(tone)}>
        {label}
      </Button>
      <Box sx={{ mt: 1.5, minHeight: 188, display: "flex", justifyContent: "center" }}>
        <Card elevation={0} sx={{ width: 188, borderRadius: 1, bgcolor: dark ? "#383838" : "#fff", boxShadow: dark ? "0 5px 14px rgba(0,0,0,.18)" : neuGlow, backgroundImage: "none", overflow: "hidden", ...style }}>
          {Array.from({ length: 5 }, (_, index) => (
            <Box key={index} sx={{ px: 2, py: 1.2, textAlign: "left", borderBottom: index < 4 ? `1px solid ${dark ? "rgba(255,255,255,.12)" : "rgba(38,50,56,.08)"}` : "none", fontSize: 15, color: dark ? "rgba(255,255,255,.88)" : "text.primary", "&:hover": { bgcolor: dark ? "rgba(255,255,255,.08)" : "rgba(0,172,193,.08)" } }}>
              Item {index + 1}
            </Box>
          ))}
        </Card>
      </Box>
    </Box>
  );
}

function ExpandExample({ dark }: { dark: boolean }) {
  const [expand, setExpand] = useState(false);
  const [expandX, setExpandX] = useState(false);
  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 2, md: 6 }} justifyContent="center" alignItems="flex-start" sx={{ minHeight: 160 }}>
      <Box sx={{ textAlign: "center", minWidth: 180 }}>
        <Button onClick={() => setExpand((value) => !value)} sx={vuseButtonSx("primary")}>Expand Transition</Button>
        <Box sx={{ height: 112, mt: 2, overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
          <Box sx={{ width: 100, height: 100, bgcolor: dark ? "#383838" : "#fff", borderRadius: 1, boxShadow: dark ? "0 5px 14px rgba(0,0,0,.18)" : neuGlow, transform: expand ? "scaleY(1)" : "scaleY(0)", opacity: expand ? 1 : 0, transformOrigin: "top center", transition: "transform 220ms cubic-bezier(.4,0,.2,1), opacity 180ms ease" }} />
        </Box>
      </Box>
      <Box sx={{ textAlign: "center", minWidth: 180 }}>
        <Button onClick={() => setExpandX((value) => !value)} sx={vuseButtonSx("secondary")}>Expand X Transition</Button>
        <Box sx={{ height: 112, mt: 2, overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
          <Box sx={{ width: 100, height: 100, bgcolor: dark ? "#383838" : "#fff", borderRadius: 1, boxShadow: dark ? "0 5px 14px rgba(0,0,0,.18)" : neuGlow, transform: expandX ? "scaleX(1)" : "scaleX(0)", opacity: expandX ? 1 : 0, transformOrigin: "left center", transition: "transform 220ms cubic-bezier(.4,0,.2,1), opacity 180ms ease" }} />
        </Box>
      </Box>
    </Stack>
  );
}

function TodoExample({ dark }: { dark: boolean }) {
  const [tasks, setTasks] = useState<Task[]>([
    { text: "Foobar", done: false },
    { text: "Fizzbuzz", done: false },
  ]);
  const [task, setTask] = useState("");
  const completedTasks = tasks.filter((item) => item.done).length;
  const remainingTasks = tasks.length - completedTasks;
  const progress = tasks.length ? (completedTasks / tasks.length) * 100 : 0;

  function create() {
    const text = task.trim();
    if (!text) return;
    setTasks((items) => [...items, { text, done: false }]);
    setTask("");
  }

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", color: dark ? "rgba(255,255,255,.88)" : "inherit" }}>
      <TextField
        value={task}
        onChange={(event) => setTask(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") create();
        }}
        label="What are you working on?"
        fullWidth
        variant="filled"
        InputProps={{
          endAdornment: (
            <IconButton onClick={create} aria-label="Add task" sx={{ opacity: task ? 1 : 0, transform: task ? "scale(1)" : "scale(.75)", transition: "opacity 180ms ease, transform 180ms ease", color: "primary.main" }}>
              <AddCircle />
            </IconButton>
          ),
        }}
        sx={todoFieldSx(dark)}
      />
      <Typography sx={{ color: dark ? "#66bb6a" : "success.main", fontSize: 34, fontWeight: 400, pl: 2, mt: 2.35, lineHeight: 1.25 }}>
        Tasks:&nbsp;<Box component="span" key={tasks.length} sx={{ display: "inline-block", animation: "fadeCount 180ms ease" }}>{tasks.length}</Box>
      </Typography>
      <Divider sx={{ mt: 2, borderColor: dark ? "rgba(255,255,255,.16)" : "rgba(38,50,56,.12)" }} />
      <Stack direction="row" alignItems="center" sx={{ my: 1.1 }} spacing={1.5}>
        <Typography sx={{ mx: 2, color: dark ? "#4fc3f7" : "info.dark", fontWeight: 700 }}>Remaining: {remainingTasks}</Typography>
        <Divider orientation="vertical" flexItem sx={{ borderColor: dark ? "rgba(255,255,255,.18)" : "rgba(38,50,56,.16)" }} />
        <Typography sx={{ mx: 2, color: dark ? "#66bb6a" : "success.dark", fontWeight: 700 }}>Completed: {completedTasks}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <CircularProgress variant="determinate" value={progress} size={36} thickness={4} sx={{ mr: 1, color: dark ? "#26c6da" : "primary.main" }} />
      </Stack>
      <Divider sx={{ mb: 2, borderColor: dark ? "rgba(255,255,255,.16)" : "rgba(38,50,56,.12)" }} />
      {tasks.length ? (
        <Card elevation={0} sx={{ bgcolor: dark ? "#353535" : "#fff", borderRadius: 1, boxShadow: dark ? "0 5px 14px rgba(0,0,0,.18)" : "0 4px 11px rgba(174,174,192,.18)", backgroundImage: "none", overflow: "hidden" }}>
          {tasks.map((item, index) => (
            <Box key={`${item.text}-${index}`} sx={{ animation: "slideTodo 190ms ease" }}>
              {index !== 0 ? <Divider sx={{ borderColor: dark ? "rgba(255,255,255,.12)" : "rgba(38,50,56,.10)" }} /> : null}
              <Stack direction="row" alignItems="center" sx={{ px: 1.35, py: 0.55, minHeight: 56 }}>
                <Checkbox
                  checked={item.done}
                  onChange={() => setTasks((current) => current.map((taskItem, taskIndex) => taskIndex === index ? { ...taskItem, done: !taskItem.done } : taskItem))}
                  sx={{
                    color: item.done ? (dark ? "rgba(255,255,255,.42)" : "grey.500") : "primary.main",
                    p: 0.65,
                    "&.Mui-checked": { color: dark ? "rgba(255,255,255,.48)" : "grey.500" },
                    "& .MuiSvgIcon-root": { fontSize: 22 },
                  }}
                />
                <Typography sx={{ ml: 1.15, color: item.done ? (dark ? "rgba(255,255,255,.48)" : "grey.500") : "primary.main", fontSize: 16 }}>{item.text}</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Check sx={{ color: dark ? "#66bb6a" : "success.main", opacity: item.done ? 1 : 0, transform: item.done ? "translateX(0)" : "translateX(18px)", transition: "opacity 180ms ease, transform 180ms ease" }} />
              </Stack>
            </Box>
          ))}
        </Card>
      ) : null}
      <style>{`@keyframes fadeCount { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } } @keyframes slideTodo { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </Box>
  );
}

function MotionExample({ title, description, source, children, height = 305 }: { title: string; description: string; source: string; children: ReactNode | ((bodyDark: boolean) => ReactNode); height?: number }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  const bodyDark = inverted;
  return (
    <Card elevation={0} sx={{ mb: 4.5, borderRadius: 1, bgcolor: "background.default", boxShadow: neuInset, backgroundImage: "none", overflow: "hidden" }}>
      <Toolbar variant="dense" sx={{ minHeight: 56, px: { xs: 2.25, md: 2.75 }, bgcolor: "transparent", alignItems: "center" }}>
        <Box>
          <Typography sx={{ fontSize: 19, fontWeight: 500, lineHeight: 1.35 }}>{title}</Typography>
        </Box>
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
      <Box sx={{ minHeight: height, p: 2, bgcolor: bodyDark ? "#303030" : "transparent", color: bodyDark ? "rgba(255,255,255,.9)" : "inherit", transition: "background-color 180ms ease, color 180ms ease" }}>
        <RichDocText dark={bodyDark} example>
          {description}
        </RichDocText>
        {typeof children === "function" ? children(bodyDark) : children}
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

function RichDocText({ children, dark = false, example = false }: { children: string; dark?: boolean; example?: boolean }) {
  return (
    <Typography
      component="div"
      sx={{
        color: dark ? "rgba(255,255,255,.72)" : "text.secondary",
        fontSize: example ? { xs: 16, md: 20 } : { xs: 16, md: 20 },
        fontWeight: 300,
        lineHeight: 1.65,
        mb: example ? 3 : 3,
        "& code": inlineCodeSx,
      }}
    >
      {renderRichText(children)}
    </Typography>
  );
}

function DocHeading({ children }: { children: ReactNode }) {
  return <Typography component="h1" sx={{ fontSize: { xs: 40, md: 48 }, fontWeight: 300, lineHeight: 1.18, mt: 4, mb: 1.5 }}>{children}</Typography>;
}

function renderRichText(text: string) {
  const parts = text.split(/(<code>.*?<\/code>|`[^`]+`)/g).filter(Boolean);
  return parts.map((part, index) => {
    if (part.startsWith("<code>") && part.endsWith("</code>")) {
      return <Box key={index} component="code">{part.slice(6, -7)}</Box>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <Box key={index} component="code">{part.slice(1, -1)}</Box>;
    }
    return <span key={index}>{part}</span>;
  });
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

function transitionStyle(effect: Effect, open: boolean, origin: string): CSSProperties {
  const base: CSSProperties = {
    opacity: open ? 1 : 0,
    pointerEvents: open ? "auto" : "none",
    transformOrigin: origin,
    transition: "opacity 190ms cubic-bezier(.4,0,.2,1), transform 190ms cubic-bezier(.4,0,.2,1)",
  };
  const transforms: Record<Effect, string> = {
    "slide-x": "translateX(-20px)",
    "slide-x-reverse": "translateX(20px)",
    "slide-y": "translateY(-20px)",
    "slide-y-reverse": "translateY(20px)",
    "scroll-x": "translateX(-34px)",
    "scroll-x-reverse": "translateX(34px)",
    "scroll-y": "translateY(-34px)",
    "scroll-y-reverse": "translateY(34px)",
    scale: "scale(.78)",
    fab: "scale(.35) translateY(28px)",
    fade: "none",
  };
  return { ...base, transform: open ? "translate(0, 0) scale(1)" : transforms[effect] };
}

const vuseButtonSx = (tone: "primary" | "secondary") => ({
  my: 1,
  bgcolor: `${tone}.main`,
  color: "#fff",
  borderRadius: 1,
  minHeight: 38,
  px: 2,
  textTransform: "none",
  fontWeight: 500,
  boxShadow: "0 3px 7px rgba(38,50,56,.18)",
  "&:hover": { bgcolor: `${tone}.dark`, boxShadow: "0 5px 10px rgba(38,50,56,.20)" },
});

const exampleActionSx = (active: boolean) => ({
  width: 23,
  height: 23,
  mx: 0.12,
  color: active ? "primary.main" : "text.secondary",
  opacity: active ? 0.75 : 0.5,
  bgcolor: "transparent",
});

const todoFieldSx = (dark: boolean) => ({
  "& .MuiFilledInput-root": {
    minHeight: 54,
    bgcolor: dark ? "#3a3a3a" : "#fff",
    borderRadius: 1,
    boxShadow: dark ? "inset -2px -2px 3px rgba(255,255,255,.05), inset 2px 2px 4px rgba(0,0,0,.22)" : "0 3px 10px rgba(174,174,192,.18)",
    border: dark ? "1px solid rgba(255,255,255,.10)" : "1px solid rgba(38,50,56,.06)",
    "&:before, &:after": { display: "none" },
    "&:hover": { bgcolor: dark ? "#3c3c3c" : "#fff", borderColor: "rgba(38,198,218,.28)" },
    "&.Mui-focused": { bgcolor: dark ? "#3c3c3c" : "#fff", borderColor: "#26c6da" },
  },
  "& .MuiFilledInput-input": { py: 1.85, fontSize: 15.5, color: dark ? "rgba(255,255,255,.88)" : "text.primary" },
  "& .MuiInputLabel-root": { fontSize: 15.5, color: dark ? "rgba(255,255,255,.56)" : "text.secondary", "&.Mui-focused": { color: "#26c6da" } },
});

const usageSource = `<v-menu transition="slide-x-transition">...</v-menu>
<v-menu transition="scroll-y-transition">...</v-menu>`;
const slideXSource = `<v-menu transition="slide-x-transition">...</v-menu>
<v-menu transition="slide-x-reverse-transition">...</v-menu>`;
const slideYSource = `<v-menu transition="slide-y-transition">...</v-menu>
<v-menu transition="slide-y-reverse-transition">...</v-menu>`;
const scrollXSource = `<v-menu transition="scroll-x-transition">...</v-menu>
<v-menu transition="scroll-x-reverse-transition">...</v-menu>`;
const scrollYSource = `<v-menu transition="scroll-y-transition">...</v-menu>
<v-menu transition="scroll-y-reverse-transition">...</v-menu>`;
const scaleSource = `<v-menu transition="scale-transition">...</v-menu>`;
const fabSource = `<v-menu transition="fab-transition">...</v-menu>`;
const fadeSource = `<v-menu transition="fade-transition">...</v-menu>`;
const customOriginSource = `<v-menu transition="scale-transition" origin="center center">...</v-menu>`;
const expandSource = `<v-expand-transition>
  <v-card v-show="expand" height="100" width="100" />
</v-expand-transition>
<v-expand-x-transition>
  <v-card v-show="expand2" height="100" width="100" />
</v-expand-x-transition>`;
const todoSource = `<v-text-field v-model="task" label="What are you working on?" @keydown.enter="create" />
<v-slide-y-transition group tag="v-list">
  <v-list-item v-for="task in tasks">...</v-list-item>
</v-slide-y-transition>`;
