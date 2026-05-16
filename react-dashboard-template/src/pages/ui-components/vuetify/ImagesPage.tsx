import { useState, type ReactNode } from "react";
import { Box, Button, Card, CircularProgress, Collapse, Divider, GlobalStyles, IconButton, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { Code, GitHub, InvertColors, PhotoLibrary } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";
import materialIconsFont from "../../../assets/style-ui/icons/MaterialIcons-Regular.woff2";

const primary = "#0097a7";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const vuetifyShadow2 = "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)";
const docsParagraphSx = { fontSize: { xs: 16, md: 20 }, lineHeight: 1.55, fontWeight: 300, mb: 3, color: "text.secondary" };
type ExampleKey = keyof typeof sourceTemplates;
type RatioListItem = { icon: string; title: string } | { divider: true };

export default function ImagesPage() {
  return (
    <>
      <GlobalStyles
        styles={{
          "@font-face": {
            fontFamily: "Material Icons",
            fontStyle: "normal",
            fontWeight: 400,
            src: `url(${materialIconsFont}) format("woff2")`,
          },
        }}
      />
      <DocPage
        title="Images"
        namespace="Components"
        icon={<PhotoLibrary />}
        breadcrumbs={[
          { label: "Components", href: "/components/vuetify/api-explorer" },
          { label: "Vuetify", href: "/components/vuetify/api-explorer" },
          { label: "Images" },
        ]}
      >
        <DocText>
          The <CodePill>v-img</CodePill> component is packed with features to support rich media. Combined with the <a href="https://github.com/vuetifyjs/vuetify-loader">vuetify-loader</a>, you can add dynamic progressive images to provide a better user experience.
        </DocText>
        <UsageSection />
        <ExamplesSection />
      </DocPage>
    </>
  );
}

function UsageSection() {
  const [contain, setContain] = useState(false);
  const [maxWidth, setMaxWidth] = useState(250);
  const [maxHeight, setMaxHeight] = useState(150);

  return (
    <Box component="section" sx={{ mb: 6 }}>
      <BaseHeading id="usage">Usage</BaseHeading>
      <Typography sx={docsParagraphSx}><CodePill>v-img</CodePill> component is used to display a responsive image with lazy-load and placeholder.</Typography>
      <UsageExampleFrame
        invertedContent={(dark) => (
          <VContainer fillHeight sx={{ height: 300 }}>
            <VRow align="center" justify="center" sx={{ minHeight: "100%" }}>
              <VImg
                src="https://picsum.photos/id/11/500/300"
                lazySrc="https://picsum.photos/id/11/10/6"
                aspectRatio={1}
                classColor={dark ? "#424242" : "#e0e0e0"}
                contain={contain}
                maxWidth={maxWidth}
                maxHeight={maxHeight}
              />
            </VRow>
          </VContainer>
        )}
      >
        {(dark, toggleDark) => (
          <>
            <UsageSwitch label="contain" checked={contain} onChange={setContain} />
            <UsageSlider label="max width" value={maxWidth} min={0} max={500} onChange={setMaxWidth} />
            <UsageSlider label="max height" value={maxHeight} min={0} max={300} onChange={setMaxHeight} />
            <Box sx={{ display: "none" }} data-dark={dark} data-toggle={String(Boolean(toggleDark))} />
          </>
        )}
      </UsageExampleFrame>
    </Box>
  );
}

function ExamplesSection() {
  return (
    <Box component="section" id="examples">
      <BaseHeading id="examples">Examples</BaseHeading>
      <Typography sx={docsParagraphSx}>Below is a collection of simple to complex examples.</Typography>
      <VuetifyExampleBlock title="Contain and Cover" description={<>If the provided aspect ratio doesn&apos;t match that of the actual image, the default behavior is to fill as much space as possible, clipping the sides of the image. Enabling the <CodePill>contain</CodePill> prop will prevent this, but will result in empty space at the sides.</>} source="simple/contain-cover">
        {() => <ContainCoverExample />}
      </VuetifyExampleBlock>
      <VuetifyExampleBlock title="Height" description={<><CodePill>v-img</CodePill> will automatically grow to the size of its <CodePill>src</CodePill>, preserving the correct aspect ratio. You can limit this with the <CodePill>height</CodePill> and <CodePill>max-height</CodePill> props.</>} source="simple/max-height">
        {() => <MaxHeightExample />}
      </VuetifyExampleBlock>
      <VuetifyExampleBlock title="Fixed ratio" description="You can set a fixed aspect ratio if you want to change aspect ratio of the image." source="simple/ratio">
        {() => <RatioExample />}
      </VuetifyExampleBlock>
      <VuetifyExampleBlock title="Placeholder" description={<><CodePill>v-img</CodePill> has a special <CodePill>placeholder</CodePill> slot for placeholder to display while image&apos;s loading. Note: the example below has bad src which won&apos;t load for you to see placeholder.</>} source="simple/placeholder">
        {() => <PlaceholderExample />}
      </VuetifyExampleBlock>
      <VuetifyExampleBlock title="Gradients" description={<>The <CodePill>gradient</CodePill> prop can be used to apply a simple gradient overlay to the image. More complex gradients should be written as a class on the content slot instead.</>} source="intermediate/gradients">
        {() => <GradientsExample />}
      </VuetifyExampleBlock>
      <VuetifyExampleBlock title="Grid" description={<>You can use <CodePill>v-img</CodePill> to make, for example, a picture gallery.</>} source="intermediate/grid">
        {() => <GridExample />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function ContainCoverExample() {
  const rows = [
    ["Matching", 1.7],
    ["Too high", 2],
    ["Too low", 1.4],
  ] as const;

  return (
    <VContainer fluid>
      <VRow justify="space-around">
        <VCol cols={5}>
          <Typography sx={{ fontSize: 20, lineHeight: "32px", mb: 1 }}>Default (cover)</Typography>
          {rows.map(([label, ratio], index) => (
            <Box key={label}>
              <Typography sx={{ fontSize: 16, lineHeight: "24px", pt: index > 0 ? 2 : 0 }}>{label}</Typography>
              <VImg src="https://picsum.photos/510/300?random" aspectRatio={ratio} contain={false} />
            </Box>
          ))}
        </VCol>
        <VCol cols={5}>
          <Typography sx={{ fontSize: 20, lineHeight: "32px", mb: 1 }}>Contain</Typography>
          {rows.map(([label, ratio], index) => (
            <Box key={label}>
              <Typography sx={{ fontSize: 16, lineHeight: "24px", pt: index > 0 ? 2 : 0 }}>{label}</Typography>
              <VImg src="https://picsum.photos/510/300?random" aspectRatio={ratio} contain />
            </Box>
          ))}
        </VCol>
      </VRow>
    </VContainer>
  );
}

function MaxHeightExample() {
  const [show, setShow] = useState(false);
  const cards = [
    { title: "height", height: 125, contain: false },
    { title: "height with contain", height: 125, contain: true },
    { title: "max-height", maxHeight: 125, contain: false },
    { title: "max-height with contain", maxHeight: 125, contain: true },
  ];

  return (
    <VContainer fluid fillHeight sx={{ minHeight: 434 }}>
      <FadeSwap show={show}>
        {show ? (
          <VRow>
            {cards.map((item) => (
              <VCol cols={6} key={item.title}>
                <Card sx={{ borderRadius: 1, boxShadow: vuetifyShadow2, overflow: "hidden" }}>
                  <VImg src="https://picsum.photos/350/165?random" naturalRatio={350 / 165} height={item.height} maxHeight={item.maxHeight} contain={item.contain} classColor="#212121" />
                  <Typography sx={{ p: 2, fontSize: 20, lineHeight: "32px" }}>{item.title}</Typography>
                </Card>
              </VCol>
            ))}
          </VRow>
        ) : (
          <VRow justify="center" align="center" sx={{ width: "100%" }}>
            <VTextButton onClick={() => setShow(true)}>Load images</VTextButton>
          </VRow>
        )}
      </FadeSwap>
    </VContainer>
  );
}

function RatioExample() {
  const [width, setWidth] = useState(300);
  const items: RatioListItem[] = [
    { icon: "inbox", title: "Inbox" },
    { icon: "star", title: "Starred" },
    { icon: "send", title: "Sent mail" },
    { icon: "drafts", title: "Drafts" },
    { divider: true },
    { icon: "mail", title: "All mail" },
    { icon: "delete", title: "Trash" },
    { icon: "error", title: "Spam" },
  ];

  return (
    <VContainer fluid>
      <VRange value={width} min={200} max={500} step={1} onChange={setWidth} />
      <Card sx={{ width, maxWidth: "100%", borderRadius: 0, boxShadow: vuetifyShadow2, overflow: "hidden", transition: "none", bgcolor: "#fff" }}>
        <VImg src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" aspectRatio={16 / 9}>
          <VRow align="end" sx={{ height: "100%", color: "#fff", p: 1, boxShadow: "0 0 20px inset rgba(0, 0, 0, 0.2)", backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px)" }}>
            <VCol cols={12}>
              <Typography sx={{ fontSize: 16, lineHeight: "24px" }}>Jonathan Lee</Typography>
              <Typography sx={{ fontSize: 16, lineHeight: "24px" }}>heyfromjonathan@gmail.com</Typography>
            </VCol>
          </VRow>
        </VImg>
        <Box component="ul" sx={{ listStyle: "none", m: 0, p: "8px 0" }}>
          {items.map((item, index) => "divider" in item ? (
            <Divider key={index} sx={{ my: 1 }} />
          ) : (
            <Box component="li" key={item.title}>
              <Box component="button" type="button" sx={{ width: "100%", minHeight: 48, display: "flex", alignItems: "center", border: 0, bgcolor: "transparent", px: 2, cursor: "pointer", textAlign: "left", color: "rgba(0,0,0,.87)", "&:hover": { bgcolor: "rgba(0,0,0,.04)" } }}>
                <Box sx={{ minWidth: 56, display: "flex", color: "rgba(0,0,0,.54)" }}><MaterialIcon name={item.icon} /></Box>
                <Typography sx={{ fontSize: 16, lineHeight: "24px" }}>{item.title}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Card>
    </VContainer>
  );
}

function PlaceholderExample() {
  return (
    <VRow align="center" justify="center">
      <VImg src="https://picsum.photos/id/1024/700/60" lazySrc="https://picsum.photos/id/11/100/60" aspectRatio={1} maxWidth={500} maxHeight={300} classColor="#e0e0e0" placeholder />
    </VRow>
  );
}

function GradientsExample() {
  return (
    <VContainer fluid>
      <VRow>
        <VCol cols={6} sm={4}>
          <VImg src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg" naturalRatio={16 / 9} gradient="linear-gradient(to top right, rgba(100,115,201,.33), rgba(25,32,72,.7))" />
        </VCol>
        <VCol cols={6} sm={4}>
          <VImg src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg" naturalRatio={16 / 9}><Box sx={{ height: "100%", backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px)" }} /></VImg>
        </VCol>
        <VCol cols={6} sm={4}>
          <VImg src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg" naturalRatio={16 / 9}><Box sx={{ height: "100%", backgroundImage: "repeating-linear-gradient(-45deg, rgba(255,0,0,.25), rgba(255,0,0,.25) 5px, rgba(0,0,255,.25) 5px, rgba(0,0,255,.25) 10px)" }} /></VImg>
        </VCol>
      </VRow>
    </VContainer>
  );
}

function GridExample() {
  return (
    <VRow>
      <VCol cols={12} sm={6} offsetSm={3}>
        <Card sx={{ borderRadius: 1, boxShadow: vuetifyShadow2 }}>
          <VContainer fluid>
            <VRow>
              {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
                <VCol cols={4} key={n} sx={{ display: "flex" }}>
                  <Card sx={{ display: "flex", width: "100%", boxShadow: "none", borderRadius: 0 }}>
                    <VImg src={`https://picsum.photos/500/300?image=${n * 5 + 10}`} lazySrc={`https://picsum.photos/10/6?image=${n * 5 + 10}`} aspectRatio={1} classColor="#e0e0e0" placeholder />
                  </Card>
                </VCol>
              ))}
            </VRow>
          </VContainer>
        </Card>
      </VCol>
    </VRow>
  );
}

function VImg({ src, lazySrc, aspectRatio, naturalRatio, contain = false, maxWidth, maxHeight, height, gradient, classColor, placeholder = false, children }: { src: string; lazySrc?: string; aspectRatio?: number; naturalRatio?: number; contain?: boolean; maxWidth?: number; maxHeight?: number; height?: number; gradient?: string; classColor?: string; placeholder?: boolean; children?: ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const ratio = aspectRatio ?? naturalRatio;
  const showPlaceholder = placeholder && (!loaded || errored);
  const ratioHeight = ratio && maxWidth ? maxWidth / ratio : undefined;
  const boxHeight = height ?? (maxHeight && (!maxWidth || (ratioHeight && ratioHeight > maxHeight)) ? maxHeight : undefined);
  const padding = ratio && !boxHeight ? `${100 / ratio}%` : undefined;

  return (
    <Box sx={{ width: maxWidth ?? "100%", maxWidth: maxWidth ?? "100%", maxHeight, height: boxHeight, mx: maxWidth ? "auto" : undefined, bgcolor: classColor, position: "relative", overflow: "hidden" }}>
      <Box sx={{ width: "100%", height: boxHeight ?? (padding ? 0 : undefined), pt: padding, position: "relative", maxHeight }}>
        {lazySrc && !loaded && <Box component="img" src={lazySrc} alt="" sx={imgSx(contain, .65, true)} />}
        <Box component="img" src={src} alt="" onLoad={() => setLoaded(true)} onError={() => setErrored(true)} sx={imgSx(contain, loaded && !errored ? 1 : lazySrc ? 0 : 1, false)} />
        {gradient && <Box sx={{ position: "absolute", inset: 0, backgroundImage: gradient }} />}
        {showPlaceholder && <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><CircularProgress size={32} thickness={4} sx={{ color: "#fafafa" }} /></Box>}
        {children && <Box sx={{ position: "absolute", inset: 0 }}>{children}</Box>}
      </Box>
    </Box>
  );
}

function imgSx(contain: boolean, opacity: number, blur: boolean) {
  return {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: contain ? "contain" : "cover",
    opacity,
    filter: blur ? "blur(2px)" : undefined,
    transition: "opacity .3s cubic-bezier(.25,.8,.5,1)",
  } as const;
}

function UsageExampleFrame({ children, invertedContent }: { children: (dark: boolean, toggleDark: () => void) => ReactNode; invertedContent: (dark: boolean) => ReactNode }) {
  const [dark, setDark] = useState(false);
  const toggleDark = () => setDark((value) => !value);
  return (
    <Card sx={{ mx: "auto", mb: 6, border: "1px solid rgba(0,0,0,.12)", borderRadius: 1, boxShadow: "none", overflow: "hidden", bgcolor: "#fff" }}>
      <VRow noGutters>
        <VCol cols={12} md={9} noPadding>
          <Box sx={{ height: 48, display: "flex", bgcolor: "#e0e0e0", borderBottom: "1px solid rgba(0,0,0,.12)" }}>
            <Box sx={{ flex: 1 }} />
            <Divider orientation="vertical" flexItem />
          </Box>
          <Box sx={{ height: 300, overflow: "hidden", position: "relative" }}>
            <Box sx={{ width: "calc(100% - 1px)", height: 300, overflowY: "auto", bgcolor: dark ? "#303030" : "#fff", color: dark ? "#fff" : "inherit" }}>
              <Box sx={{ minHeight: "100%", p: 3, display: "flex", alignItems: "center" }}>
                {invertedContent(dark)}
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ position: "absolute", top: 0, right: 0, bottom: 0, display: { xs: "none", md: "block" } }} />
          </Box>
        </VCol>
        <VCol cols={12} md={3} noPadding>
          <Box sx={{ height: 48, display: "flex", alignItems: "center", bgcolor: "#e0e0e0" }}>
            <Typography sx={{ flex: 1, px: 1.5, fontSize: 20, lineHeight: "48px", fontWeight: 400 }}>Options</Typography>
            <Tooltip title="Invert playground colors">
              <IconButton aria-label="Invert playground colors" onClick={toggleDark} sx={{ mx: 1, width: 36, height: 36, color: dark ? primary : "rgba(0,0,0,.54)" }}><InvertColors sx={{ fontSize: 24 }} /></IconButton>
            </Tooltip>
          </Box>
          <Divider />
          <Box sx={{ maxHeight: 300, overflowY: "auto", py: 1.5 }}>
            {children(dark, toggleDark)}
          </Box>
        </VCol>
      </VRow>
    </Card>
  );
}

function VuetifyExampleBlock({ title, description, source, children }: { title: string; description: ReactNode; source: ExampleKey; children: () => ReactNode }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card sx={{ mb: 5, bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "hidden" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
        <Typography sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>{title}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors"><IconButton aria-label="Invert example colors" size="small" onClick={() => setInverted((v) => !v)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View on Github"><IconButton aria-label="View on Github" size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton aria-label="View source" size="small" onClick={() => setSourceOpen((v) => !v)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2" }}>
          <Box sx={{ p: 1, display: "flex", gap: 1 }}>
            <Button sx={{ borderRadius: 999, color: "#fff", bgcolor: "#616161", minHeight: 36, px: 2, textTransform: "none" }}>template</Button>
          </Box>
          <Divider sx={{ borderColor: "rgba(255,255,255,.12)" }} />
          <Box sx={{ p: 2, overflowX: "auto" }}><Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box></Box>
        </Box>
      </Collapse>
      <Box sx={{ bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", p: 2, "& a": { color: primary } }}>
        <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography>
        <Box data-app="true">{children()}</Box>
      </Box>
    </Card>
  );
}

function VContainer({ children, fluid = false, fillHeight = false, sx }: { children: ReactNode; fluid?: boolean; fillHeight?: boolean; sx?: object }) {
  return <Box sx={{ width: "100%", maxWidth: fluid ? "none" : 1185, mx: fluid ? 0 : "auto", px: 1.5, ...(fillHeight ? { minHeight: "100%", display: "flex" } : {}), ...sx }}>{children}</Box>;
}

function VRow({ children, align, justify, noGutters = false, sx }: { children: ReactNode; align?: string; justify?: string; noGutters?: boolean; sx?: object }) {
  return <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: align, justifyContent: justify, mx: noGutters ? 0 : -1.5, ...sx }}>{children}</Box>;
}

function VCol({ children, cols = 12, sm, md, offsetSm = 0, noPadding = false, sx }: { children: ReactNode; cols?: number; sm?: number; md?: number; offsetSm?: number; noPadding?: boolean; sx?: object }) {
  const basis = (value: number) => `${(value / 12) * 100}%`;
  return <Box sx={{ flex: `0 0 ${basis(cols)}`, maxWidth: basis(cols), p: noPadding ? 0 : 1.5, ml: 0, ...(sm ? { "@media (min-width:600px)": { flexBasis: basis(sm), maxWidth: basis(sm), marginLeft: offsetSm ? basis(offsetSm) : 0 } } : {}), ...(md ? { "@media (min-width:960px)": { flexBasis: basis(md), maxWidth: basis(md) } } : {}), ...sx }}>{children}</Box>;
}

function BaseHeading({ id, children }: { id: string; children: ReactNode }) {
  return <Typography id={id} variant="h5" sx={{ fontSize: { xs: 20, md: 22 }, lineHeight: 1.45, fontWeight: 400, mb: 2.5 }}>{children}</Typography>;
}

function UsageSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <Box sx={{ px: 1.5, pb: 0 }}>
      <Box onClick={() => onChange(!checked)} sx={{ display: "flex", alignItems: "center", minHeight: 48, cursor: "pointer", userSelect: "none" }}>
        <Box sx={{ width: 46, height: 32, position: "relative", mr: 1.25, display: "flex", alignItems: "center" }}>
          <Box sx={{ width: 36, height: 14, borderRadius: 8, bgcolor: checked ? primary : "rgba(0,0,0,.38)", opacity: checked ? .5 : .38 }} />
          <Box sx={{ position: "absolute", left: checked ? 18 : 0, width: 20, height: 20, borderRadius: "50%", bgcolor: checked ? primary : "#fafafa", boxShadow: "0 2px 4px rgba(0,0,0,.32)", transition: "left 150ms cubic-bezier(.4,0,.2,1)" }} />
        </Box>
        <Typography sx={{ textTransform: "capitalize", fontSize: 16 }}>{label}</Typography>
      </Box>
    </Box>
  );
}

function UsageSlider({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  return (
    <Box sx={{ px: 1.5, pb: 0, pt: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", minHeight: 40 }}>
        <Typography sx={{ textTransform: "capitalize", fontSize: 16, color: "rgba(0,0,0,.6)", width: 92, mr: 2 }}>{label}</Typography>
        <VRange value={value} min={min} max={max} step={1} onChange={onChange} />
      </Box>
    </Box>
  );
}

function VRange({ value, min, max, step, onChange }: { value: number; min: number; max: number; step: number; onChange: (value: number) => void }) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <Box sx={{ flex: 1, position: "relative", height: 32, display: "flex", alignItems: "center" }}>
      <Box sx={{ position: "absolute", left: 0, right: 0, height: 2, bgcolor: "rgba(0,0,0,.26)" }} />
      <Box sx={{ position: "absolute", left: 0, width: `${percent}%`, height: 2, bgcolor: primary }} />
      <Box component="input" type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} sx={{ position: "absolute", inset: 0, width: "100%", opacity: 0, cursor: "pointer", m: 0 }} />
      <Box sx={{ position: "absolute", left: `calc(${percent}% - 10px)`, width: 20, height: 20, borderRadius: "50%", bgcolor: primary, boxShadow: "0 2px 4px rgba(0,0,0,.24)", pointerEvents: "none" }} />
    </Box>
  );
}

function VTextButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return <Box component="button" type="button" onClick={onClick} sx={{ border: 0, bgcolor: "transparent", color: primary, px: 2, minWidth: 64, height: 36, borderRadius: 1, textTransform: "uppercase", fontWeight: 500, fontSize: 14, cursor: "pointer", "&:hover": { bgcolor: "rgba(0,151,167,.08)" } }}>{children}</Box>;
}

function FadeSwap({ show, children }: { show: boolean; children: ReactNode }) {
  return <Box key={String(show)} sx={{ width: "100%", animation: "vFade .18s cubic-bezier(.4,0,.2,1)", "@keyframes vFade": { from: { opacity: 0 }, to: { opacity: 1 } } }}>{children}</Box>;
}

function MaterialIcon({ name, size = 24, color = "currentColor" }: { name: string; size?: number; color?: string }) {
  return <Box component="span" sx={{ color, direction: "ltr", display: "inline-block", fontFamily: "Material Icons", fontFeatureSettings: "'liga'", fontSize: size, fontStyle: "normal", fontWeight: 400, height: size, letterSpacing: "normal", lineHeight: 1, textRendering: "optimizeLegibility", textTransform: "none", whiteSpace: "nowrap", width: size, wordWrap: "normal" }}>{name}</Box>;
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: .55, py: .18, borderRadius: .75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: .5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

const sourceTemplates = {
  usage: `<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-img
        src="https://picsum.photos/id/11/500/300"
        lazy-src="https://picsum.photos/id/11/10/6"
        aspect-ratio="1"
        class="grey lighten-2"
        v-bind="attrs"
      />
    </v-row>
  </v-container>
</template>`,
  "simple/contain-cover": `<template>
  <v-container fluid>
    <v-row justify="space-around">
      <v-col cols="5">
        <div class="title mb-1">Default (cover)</div>
        <div class="subheading">Matching</div>
        <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.7"></v-img>
        <div class="subheading pt-4">Too high</div>
        <v-img src="https://picsum.photos/510/300?random" aspect-ratio="2"></v-img>
        <div class="subheading pt-4">Too low</div>
        <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.4"></v-img>
      </v-col>

      <v-col cols="5">
        <div class="title mb-1">Contain</div>
        <div class="subheading">Matching</div>
        <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.7" contain></v-img>
        <div class="subheading pt-4">Too high</div>
        <v-img src="https://picsum.photos/510/300?random" aspect-ratio="2" contain></v-img>
        <div class="subheading pt-4">Too low</div>
        <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.4" contain></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>`,
  "simple/max-height": `<template>
  <v-container class="fill-height" fluid style="min-height: 434px">
    <v-fade-transition mode="out-in">
      <v-row v-if="show" key="0">
        <v-col cols="6">
          <v-card>
            <v-img src="https://picsum.photos/350/165?random" height="125" class="grey darken-4"></v-img>
            <v-card-title class="title">height</v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else key="1" justify="center">
        <v-btn text @click="show = true">Load images</v-btn>
      </v-row>
    </v-fade-transition>
  </v-container>
</template>`,
  "simple/ratio": `<template>
  <v-container fluid>
    <v-slider v-model="width" min="200" max="500" step="1"></v-slider>
    <v-navigation-drawer :width="width" :value="true" stateless>
      <v-img :aspect-ratio="16 / 9" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
        <v-row align="end" class="lightbox white--text pa-2 fill-height">
          <v-col>
            <div class="subheading">Jonathan Lee</div>
            <div class="text-body-1">heyfromjonathan@gmail.com</div>
          </v-col>
        </v-row>
      </v-img>
      <v-list>...</v-list>
    </v-navigation-drawer>
  </v-container>
</template>`,
  "simple/placeholder": `<template>
  <v-row align="center" justify="center">
    <v-img
      src="https://picsum.photos/id/1024/700/60"
      lazy-src="https://picsum.photos/id/11/100/60"
      aspect-ratio="1"
      class="grey lighten-2"
      max-width="500"
      max-height="300"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-row>
      </template>
    </v-img>
  </v-row>
</template>`,
  "intermediate/gradients": `<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6" sm="4">
        <v-img src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>`,
  "intermediate/grid": `<template>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
      <v-card>
        <v-container fluid>
          <v-row>
            <v-col v-for="n in 9" :key="n" class="d-flex child-flex" cols="4">
              <v-card flat tile class="d-flex">
                <v-img :src="\`https://picsum.photos/500/300?image=\${n * 5 + 10}\`" :lazy-src="\`https://picsum.photos/10/6?image=\${n * 5 + 10}\`" aspect-ratio="1" class="grey lighten-2" />
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>`,
};
