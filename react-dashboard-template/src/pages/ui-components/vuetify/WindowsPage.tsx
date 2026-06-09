import { useEffect, useRef, useState, type ReactNode } from "react";
import { Avatar, Box, Button, Card, Collapse, Divider, IconButton, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { AccountCircle, ChevronLeft, ChevronRight, Code, GitHub, InvertColors, RadioButtonChecked, Window } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const sectionHeadingSx = { fontSize: { xs: 20, md: 22 }, lineHeight: 1.45, fontWeight: 400, mb: 2.5 };
const docsParagraphSx = { fontSize: { xs: 16, md: 20 }, lineHeight: 1.55, fontWeight: 300, mb: 3, color: "text.secondary" };
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
type ExampleKey = keyof typeof sourceTemplates;

export default function WindowsPage() {
  return (
    <DocPage
      title="Windows"
      namespace="Components"
      icon={<Window />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Windows" },
      ]}
    >
      <DocText>
        The <CodePill>v-window</CodePill> component provides the baseline functionality for transitioning content from 1 pane to another. Other components such as <CodePill>v-tabs</CodePill>, <CodePill>v-carousel</CodePill> and <CodePill>v-stepper</CodePill> utilize this component at their core.
      </DocText>
      <UsageSection />
      <PlaygroundSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <Typography variant="h5" sx={sectionHeadingSx}>Usage</Typography>
      <Typography sx={docsParagraphSx}>Designed to easily cycle through content, <CodePill>v-window</CodePill> provides a simple interface to create truly custom implementations.</Typography>
      <VuetifyExampleBlock title="" description="" source="usage" minHeight={520}>
        {() => <UsageExample />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function UsageExample() {
  const [windowIndex, setWindowIndex] = useState(0);
  return (
    <VRow align="center">
      <Box sx={{ flex: "0 0 auto", mr: "24px" }}>
        {[0, 1, 2].map((index) => (
          <Box key={index}>
            <IconButton onClick={() => setWindowIndex(index)} sx={{ color: windowIndex === index ? primary : "rgba(0,0,0,.54)" }}><RadioButtonChecked /></IconButton>
          </Box>
        ))}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <WindowFrame value={windowIndex} vertical elevation stacked height={430}>
          {[0, 1, 2].map((index) => <ArticlePane key={index} n={index + 1} />)}
        </WindowFrame>
      </Box>
    </VRow>
  );
}

function PlaygroundSection() {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <Typography variant="h5" sx={sectionHeadingSx}>Playground</Typography>
      <VuetifyExampleBlock title="" description="" source="playground" minHeight={580}>
        {() => <PlaygroundExample />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function PlaygroundExample() {
  const [windowIndex, setWindowIndex] = useState(0);
  const [autorun, setAutorun] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const [vertical, setVertical] = useState(false);
  const [reverse, setReverse] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    window.clearInterval(timerRef.current);
    if (!autorun) return undefined;
    timerRef.current = window.setInterval(() => setWindowIndex((current) => (current + 1 >= 3 ? 0 : current + 1)), 1000);
    return () => window.clearInterval(timerRef.current);
  }, [autorun]);

  return (
    <VRow align="center">
      <VRow justify="space-around" sx={{ width: "100%", mb: 2 }}>
        <VSwitch label="Automatic switching" checked={autorun} onChange={setAutorun} />
        <VSwitch label="Show arrows" checked={showArrows} onChange={setShowArrows} />
        <VSwitch label="Vertical" checked={vertical} onChange={setVertical} />
        <VSwitch label="Reverse" checked={reverse} onChange={setReverse} />
      </VRow>
      <WindowFrame value={windowIndex} vertical={vertical} reverse={reverse} elevation showArrows={showArrows} stacked height={430} onPrev={() => setWindowIndex((v) => (v - 1 < 0 ? 2 : v - 1))} onNext={() => setWindowIndex((v) => (v + 1 >= 3 ? 0 : v + 1))}>
        {[0, 1, 2].map((index) => <ArticlePane key={index} n={index + 1} />)}
      </WindowFrame>
    </VRow>
  );
}

function ExamplesSection() {
  return (
    <Box component="section">
      <Typography variant="h5" sx={sectionHeadingSx}>Examples</Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>Below is a collection of simple to complex examples.</Typography>
      <Stack spacing={5}>
        <VuetifyExampleBlock title="Account creation" description={<>Create rich forms with smooth animations. <CodePill>v-window</CodePill> automatically tracks the current selection index to automatically change the transition direction. This can be manually controlled with the <CodePill>reverse</CodePill> prop.</>} source="complex/account" minHeight={430}>
          {() => <AccountExample />}
        </VuetifyExampleBlock>
      </Stack>
    </Box>
  );
}

function ArticlePane({ n }: { n: number }) {
  return (
    <Card sx={{ boxShadow: "none", borderRadius: 0 }}>
      <Box sx={{ p: 2 }}>
        <VRow align="center" sx={{ mb: "16px" }}>
          <Avatar sx={{ bgcolor: "#9e9e9e", mr: "16px" }} />
          <Typography component="strong" sx={{ fontSize: 20, fontWeight: 700 }}>Title {n}</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton><AccountCircle /></IconButton>
        </VRow>
        {[1, 2, 3].map((item) => <Typography key={item} component="p" sx={{ fontSize: 16, lineHeight: 1.5, mb: 2, color: "rgba(0,0,0,.78)" }}>{lorem}</Typography>)}
      </Box>
    </Card>
  );
}

function WindowFrame({ children, value, vertical = false, reverse = false, elevation = false, showArrows = false, stacked = false, height, onPrev, onNext }: { children: ReactNode[]; value: number; vertical?: boolean; reverse?: boolean; elevation?: boolean; showArrows?: boolean; stacked?: boolean; height?: number; onPrev?: () => void; onNext?: () => void }) {
  const [previousValue, setPreviousValue] = useState(value);
  useEffect(() => {
    if (value !== previousValue) {
      const id = window.setTimeout(() => setPreviousValue(value), 280);
      return () => window.clearTimeout(id);
    }
    return undefined;
  }, [previousValue, value]);
  const activeChild = children[value] ?? children[0];
  const direction = reverse ? -1 : value >= previousValue ? 1 : -1;
  const enteringTransform = vertical ? `translateY(${direction * 8}px)` : `translateX(${direction * 8}px)`;
  const frameShadow = elevation ? "0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px rgba(0,0,0,.14), 0 1px 3px rgba(0,0,0,.12)" : "none";
  if (stacked) {
    return (
      <Box sx={{ width: "100%", height, position: "relative", overflow: "hidden", boxShadow: frameShadow, bgcolor: "#fff" }}>
        <Box sx={{ display: "flex", flexDirection: vertical ? "column" : "row", width: vertical ? "100%" : `${children.length * 100}%`, height: vertical ? `${children.length * 100}%` : "100%", transform: vertical ? `translateY(-${value * (100 / children.length)}%)` : `translateX(-${value * (100 / children.length)}%)`, transition: reverse ? "transform 280ms cubic-bezier(.4,0,.6,1)" : "transform 280ms cubic-bezier(.25,.8,.5,1)" }}>
          {children.map((child, index) => <Box key={index} sx={{ flex: vertical ? `0 0 ${100 / children.length}%` : `0 0 ${100 / children.length}%`, width: vertical ? "100%" : `${100 / children.length}%`, height: vertical ? `${100 / children.length}%` : "100%", overflow: "hidden" }}>{child}</Box>)}
        </Box>
        {showArrows && (
          <>
            <IconButton onClick={onPrev} sx={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", bgcolor: "rgba(255,255,255,.72)", "&:hover": { bgcolor: "rgba(255,255,255,.9)" } }}><ChevronLeft /></IconButton>
            <IconButton onClick={onNext} sx={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", bgcolor: "rgba(255,255,255,.72)", "&:hover": { bgcolor: "rgba(255,255,255,.9)" } }}><ChevronRight /></IconButton>
          </>
        )}
      </Box>
    );
  }
  return (
    <Box sx={{ width: "100%", position: "relative", overflow: "hidden", boxShadow: frameShadow, bgcolor: "#fff" }}>
      <Box key={`${vertical ? "v" : "h"}-${value}`} sx={{ animation: "windowPaneIn 260ms cubic-bezier(.25,.8,.5,1)", "@keyframes windowPaneIn": { from: { opacity: .82, transform: enteringTransform }, to: { opacity: 1, transform: "translate(0, 0)" } } }}>
        {activeChild}
      </Box>
      {showArrows && (
        <>
          <IconButton onClick={onPrev} sx={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", bgcolor: "rgba(255,255,255,.72)", "&:hover": { bgcolor: "rgba(255,255,255,.9)" } }}><ChevronLeft /></IconButton>
          <IconButton onClick={onNext} sx={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", bgcolor: "rgba(255,255,255,.72)", "&:hover": { bgcolor: "rgba(255,255,255,.9)" } }}><ChevronRight /></IconButton>
        </>
      )}
    </Box>
  );
}

function AccountExample() {
  const [step, setStep] = useState(1);
  const title = step === 1 ? "Sign-up" : step === 2 ? "Create a password" : "Account created";
  return (
    <Card sx={{ maxWidth: 500, mx: "auto", borderRadius: 1, boxShadow: "0 2px 4px rgba(0,0,0,.18)", overflow: "hidden" }}>
      <Box sx={{ minHeight: 64, display: "flex", alignItems: "center", justifyContent: "space-between", px: 2 }}>
        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>{title}</Typography>
        <Avatar sx={{ bgcolor: "rgba(0,151,167,.7)", color: "#fff", width: 24, height: 24, fontSize: 14 }}>{step}</Avatar>
      </Box>
      <WindowFrame value={step - 1}>
        {[
          <Box sx={{ p: 2 }}><VTextField label="Email" value="john@vuetifyjs.com" /><Typography sx={{ fontSize: 12, color: "rgba(0,0,0,.54)" }}>This is the email you will use to login to your Vuetify account</Typography></Box>,
          <Box sx={{ p: 2 }}><VTextField label="Password" type="password" /><VTextField label="Confirm Password" type="password" /><Typography sx={{ fontSize: 12, color: "rgba(0,0,0,.54)" }}>Please enter a password for your account</Typography></Box>,
          <Box sx={{ p: 4, textAlign: "center" }}><Box component="img" src="https://cdn.vuetifyjs.com/images/logos/v.svg" sx={{ height: 128, objectFit: "contain", mb: 4 }} /><Typography sx={{ fontSize: 20, fontWeight: 300, mb: 1 }}>Welcome to Vuetify</Typography><Typography sx={{ fontSize: 12, color: "rgba(0,0,0,.54)" }}>Thanks for signing up!</Typography></Box>,
        ]}
      </WindowFrame>
      <Divider />
      <Box sx={{ minHeight: 52, display: "flex", alignItems: "center", p: 1 }}>
        <Button disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))} sx={{ textTransform: "uppercase" }}>Back</Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button disabled={step === 3} onClick={() => setStep((s) => Math.min(3, s + 1))} variant="contained" disableElevation sx={{ bgcolor: primary, textTransform: "uppercase", "&:hover": { bgcolor: primary } }}>Next</Button>
      </Box>
    </Card>
  );
}

function VTextField({ label, value = "", type = "text" }: { label: string; value?: string; type?: string }) {
  const [text, setText] = useState(value);
  const [focused, setFocused] = useState(false);
  return <Box sx={{ position: "relative", minHeight: 56, pt: 2.2, mb: 2, borderBottom: `1px solid ${focused ? primary : "rgba(0,0,0,.42)"}` }}><Typography sx={{ position: "absolute", top: 3, left: 0, fontSize: 12, color: focused ? primary : "rgba(0,0,0,.6)" }}>{label}</Typography><Box component="input" value={text} type={type} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={(event) => setText(event.target.value)} sx={{ width: "100%", border: 0, outline: 0, bgcolor: "transparent", fontSize: 16, fontFamily: "inherit", color: "rgba(0,0,0,.87)" }} /></Box>;
}

function VRow({ children, align, justify, sx = {} }: { children: ReactNode; align?: "center"; justify?: "space-around"; sx?: object }) {
  return <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: align, justifyContent: justify, ...sx }}>{children}</Box>;
}

function VSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <Box onClick={() => onChange(!checked)} sx={{ display: "inline-flex", alignItems: "center", m: 2, cursor: "pointer" }}><Switch checked={checked} sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: primary }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: primary } }} /><Typography sx={{ fontSize: 16 }}>{label}</Typography></Box>;
}

function Switch({ checked, sx = {} }: { checked: boolean; sx?: object }) {
  return <Box sx={{ width: 42, height: 34, position: "relative", mr: .5, display: "flex", alignItems: "center", ...sx }}><Box sx={{ width: 34, height: 14, borderRadius: 8, bgcolor: checked ? primary : "rgba(0,0,0,.38)", opacity: checked ? .5 : .38 }} /><Box sx={{ position: "absolute", left: checked ? 18 : 0, width: 20, height: 20, borderRadius: "50%", bgcolor: checked ? primary : "#fafafa", boxShadow: "0 2px 4px rgba(0,0,0,.32)", transition: "left 150ms ease" }} /></Box>;
}

function VuetifyExampleBlock({ title, description, source, children, minHeight }: { title: string; description: ReactNode; source: ExampleKey; children: () => ReactNode; minHeight: number }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return <Card sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}><Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2 }}><Typography sx={{ fontSize: 20 }}>{title}</Typography><Box sx={{ flexGrow: 1 }} /><Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((v) => !v)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip><Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip><Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((v) => !v)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip></Toolbar><Collapse in={sourceOpen} timeout={180} unmountOnExit><Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", maxHeight: { xs: "none", sm: "calc(100vh - 275px)" }, overflowY: "auto", p: 2 }}><Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box></Box></Collapse><Box sx={{ px: 2, py: 2, minHeight, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit" }}>{description && <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography>}{children()}</Box></Card>;
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: .55, py: .18, borderRadius: .75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: .5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

const sourceTemplates = {
  usage: "src/demo/examples/windows/usage.vue",
  playground: "src/demo/examples/windows/playground.vue",
  "complex/account": "src/demo/examples/windows/complex/account.vue",
};
