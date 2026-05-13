import { useState, type PointerEvent, type ReactNode } from "react";
import { Avatar, Box, Button, Card, Collapse, IconButton, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { ArrowBackIosNew, Code, Edit, Email, GitHub, InvertColors, Mail, Menu as MenuIcon, Message, MoreVert, Phone, Place, Search, ViewHeadline } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";

interface DividerExample {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  minHeight: number;
  render: (inverted: boolean) => ReactNode;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
  leaving: boolean;
}

export default function DividersPage() {
  return (
    <DocPage
      title="Dividers"
      namespace="Components"
      icon={<ViewHeadline />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Dividers" },
      ]}
    >
      <DocText>
        The <CodePill>v-divider</CodePill> component is used to separate sections of lists or layouts.
      </DocText>
      <ExamplesSection />
    </DocPage>
  );
}

function ExamplesSection() {
  return (
    <Box component="section">
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Examples
      </Typography>
      <Stack spacing={5.5}>
        {dividerExamples.map((example) => (
          <VuetifyExampleBlock key={example.title} title={example.title} description={example.description} source={example.source} minHeight={example.minHeight}>
            {(inverted) => example.render(inverted)}
          </VuetifyExampleBlock>
        ))}
      </Stack>
    </Box>
  );
}

function VuetifyExampleBlock({ title, description, source, children, minHeight }: { title: string; description: ReactNode; source: keyof typeof sourceTemplates; children: (inverted: boolean) => ReactNode; minHeight: number }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);

  return (
    <Card sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "hidden" }}>
      <Toolbar variant="dense" sx={{ minHeight: 74, alignItems: "center", px: { xs: 3, md: 4 }, bgcolor: "transparent" }}>
        <Typography sx={{ fontSize: { xs: 22, md: 25 }, fontWeight: 500, lineHeight: 1.35 }}>{title}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors">
          <IconButton size="small" aria-label="Invert example colors" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}>
            <InvertColors sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="View on Github"><IconButton size="small" aria-label="View on Github" disableRipple sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton size="small" aria-label="View source" aria-expanded={sourceOpen} onClick={() => setSourceOpen((value) => !value)} disableRipple sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", maxHeight: { xs: "none", sm: "calc(100vh - 275px)" }, overflowY: "auto", p: 2 }}>
          <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', 'SFMono-Regular', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap", color: "#f8f8f2" }}>{sourceTemplates[source]}</Box>
        </Box>
      </Collapse>
      <Box sx={{ px: { xs: 3, md: 4 }, py: { xs: 3.5, md: 4.25 }, minHeight, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", transition: "background-color 180ms ease, color 180ms ease" }}>
        <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: 16.5, fontWeight: 300, lineHeight: 1.7, mb: 3 }}>{description}</Typography>
        {children(inverted)}
      </Box>
    </Card>
  );
}

function InsetExample() {
  const items = [
    { header: "Today" },
    { avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg", title: "Brunch this weekend?", subtitle: "<span class='font-weight-bold'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
    { divider: true, inset: true },
    { avatar: "/static/doc-images/lists/m2.jpg", title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>', subtitle: "<span class='font-weight-bold'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend." },
    { divider: true, inset: true },
    { avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg", title: "Oui oui", subtitle: "<span class='font-weight-bold'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?" },
  ];

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", mx: -1.5 }}>
      <Box sx={{ width: { xs: "100%", sm: "50%" }, ml: { sm: "25%" }, px: 1.5 }}>
        <VCard>
          <VList twoLine>
            {items.map((item, index) => item.header ? <Subheader key={item.header}>{item.header}</Subheader> : item.divider ? <VDivider key={index} inset={item.inset} /> : <ListItem key={item.title || index} avatar={item.avatar} title={item.title || ""} subtitle={item.subtitle || ""} />)}
          </VList>
        </VCard>
      </Box>
    </Box>
  );
}

function VerticalExample() {
  return (
    <VToolbar color="#9c27b0">
      <ToolbarTitle>Title</ToolbarTitle>
      <VDivider vertical sx={{ mx: 2 }} />
      <Typography sx={{ fontSize: 16 }}>My Home</Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: { xs: "none", sm: "flex" }, alignSelf: "stretch" }}>
        <ToolbarTextButton>News</ToolbarTextButton>
        <VDivider vertical />
        <ToolbarTextButton>Blog</ToolbarTextButton>
        <VDivider vertical />
        <ToolbarTextButton>Music</ToolbarTextButton>
        <VDivider vertical />
      </Box>
      <RippleIconButton><MenuIcon /></RippleIconButton>
    </VToolbar>
  );
}

function VerticalInsetExample() {
  return (
    <VToolbar color="#009688">
      <ToolbarTitle>Title</ToolbarTitle>
      <VDivider vertical inset sx={{ mx: 2 }} />
      <Typography sx={{ fontSize: 16 }}>My Home</Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: { xs: "none", sm: "flex" }, alignSelf: "stretch" }}>
        <ToolbarTextButton>News</ToolbarTextButton>
        <VDivider vertical inset />
        <ToolbarTextButton>Blog</ToolbarTextButton>
        <VDivider vertical inset />
        <ToolbarTextButton>Music</ToolbarTextButton>
        <VDivider vertical inset />
      </Box>
      <RippleIconButton><MenuIcon /></RippleIconButton>
    </VToolbar>
  );
}

function SubheadersExample() {
  const items = [
    { header: "Today" },
    { divider: true },
    { avatar: "https://picsum.photos/250/300?image=660", title: "Meeting @ Noon", subtitle: "<span class='font-weight-bold'>Spike Lee</span> &mdash; I'll be in your neighborhood" },
    { avatar: "https://picsum.photos/250/300?image=821", title: 'Summer BBQ <span class="grey--text text--lighten-1"></span>', subtitle: "<span class='font-weight-bold'>to Operations support</span> &mdash; Wish I could come." },
    { avatar: "https://picsum.photos/250/300?image=783", title: "Yes yes", subtitle: "<span class='font-weight-bold'>Bella</span> &mdash; Do you have Paris recommendations" },
    { header: "Yesterday" },
    { divider: true },
    { avatar: "https://picsum.photos/250/300?image=1006", title: "Dinner tonight?", subtitle: "<span class='font-weight-bold'>LaToya</span> &mdash; Do you want to hang out?" },
    { avatar: "https://picsum.photos/250/300?image=146", title: "So long", subtitle: "<span class='font-weight-bold'>Nancy</span> &mdash; Do you see what time it is?" },
    { header: "Last Week" },
    { divider: true },
    { avatar: "https://picsum.photos/250/300?image=1008", title: "Breakfast?", subtitle: "<span class='font-weight-bold'>LaToya</span> &mdash; Do you want to hang out?" },
    { avatar: "https://picsum.photos/250/300?image=839", title: 'Winter Porridge <span class="grey--text text--lighten-1"></span>', subtitle: "<span class='font-weight-bold'>cc: Daniel</span> &mdash; Tell me more..." },
    { avatar: "https://picsum.photos/250/300?image=145", title: "Oui oui", subtitle: "<span class='font-weight-bold'>Nancy</span> &mdash; Do you see what time it is?" },
  ];

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: { xs: "100%", sm: "66.666%", md: "50%" } }}>
        <VCard>
          <VToolbar color="#ffa726">
            <RippleIconButton><MenuIcon /></RippleIconButton>
            <ToolbarTitle>Message Board</ToolbarTitle>
            <Box sx={{ flexGrow: 1 }} />
            <RippleIconButton><Search /></RippleIconButton>
          </VToolbar>
          <VList twoLine>
            {items.map((item, index) => item.header ? <Subheader key={`${item.header}-${index}`} inset>{item.header}</Subheader> : item.divider ? <VDivider key={index} inset /> : <ListItem key={`${item.title}-${index}`} avatar={item.avatar} title={item.title || ""} subtitle={item.subtitle || ""} ripple />)}
          </VList>
        </VCard>
      </Box>
    </Box>
  );
}

function PortraitExample() {
  const rows = [
    { left: <Phone />, title: "(650) 555-1234", right: <Message /> },
    { left: <Phone />, title: "(323) 555-6789", right: <Message /> },
    { left: <Email />, title: "mcbeal@example.com" },
    { left: <Place />, title: "Orlando, FL 79938" },
  ];

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: { xs: "100%", sm: "66.666%" } }}>
        <VCard>
          <Box sx={{ minHeight: 64, px: 2, display: "flex", alignItems: "center", bgcolor: "#00acc1", color: "#fff" }}>
            <Typography sx={{ fontSize: 24, fontWeight: 400 }}>Sarah Mcbeal</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <RippleIconButton><ArrowBackIosNew /></RippleIconButton>
            <RippleIconButton><Edit /></RippleIconButton>
            <RippleIconButton><MoreVert /></RippleIconButton>
          </Box>
          <VList>
            {rows.map((row, index) => (
              <Box key={row.title}>
                <RippleBox sx={{ minHeight: 48, px: 2, display: "flex", alignItems: "center", cursor: "pointer", "&:hover::before": { opacity: 0.04 } }}>
                  <Box sx={{ width: 40, mr: 2, display: "flex", color: "rgba(0,0,0,.54)" }}>{row.left}</Box>
                  <Typography sx={{ fontSize: 16, flex: 1 }}>{row.title}</Typography>
                  {row.right && <Box sx={{ width: 40, ml: 2, display: "flex", justifyContent: "flex-end", color: "rgba(0,0,0,.54)" }}>{row.right}</Box>}
                </RippleBox>
                {index < rows.length - 1 && <VDivider inset />}
              </Box>
            ))}
          </VList>
          <Box component="img" src="https://picsum.photos/700?image=996" sx={{ display: "block", width: "100%", height: 200, objectFit: "cover" }} />
        </VCard>
      </Box>
    </Box>
  );
}

function VDivider({ inset = false, vertical = false, sx = {} }: { inset?: boolean; vertical?: boolean; sx?: Record<string, unknown> }) {
  return (
    <Box
      role="separator"
      aria-orientation={vertical ? "vertical" : "horizontal"}
      sx={{
        display: vertical ? "inline-flex" : "block",
        flex: vertical ? "0 0 auto" : "1 1 0px",
        width: vertical ? 0 : "auto",
        height: vertical ? "inherit" : 0,
        minHeight: vertical ? (inset ? 0 : "100%") : 0,
        maxHeight: vertical ? (inset ? "calc(100% - 16px)" : "100%") : 0,
        maxWidth: vertical ? 0 : inset ? "calc(100% - 72px)" : "100%",
        ml: vertical ? undefined : inset ? "72px" : 0,
        mt: vertical && inset ? "8px" : 0,
        borderStyle: "solid",
        borderColor: "rgba(0,0,0,.12)",
        borderWidth: vertical ? "0 thin 0 0" : "thin 0 0 0",
        alignSelf: vertical ? "stretch" : undefined,
        verticalAlign: vertical ? "text-bottom" : undefined,
        transition: "inherit",
        ...sx,
      }}
    />
  );
}

function VCard({ children }: { children: ReactNode }) {
  return <Card sx={{ bgcolor: "#fff", color: "rgba(0,0,0,.87)", borderRadius: 1, boxShadow: "0px 2px 4px rgba(0,0,0,.18)", overflow: "hidden" }}>{children}</Card>;
}

function VList({ children, twoLine = false }: { children: ReactNode; twoLine?: boolean }) {
  return <Box sx={{ py: 1, bgcolor: "#fff", ...(twoLine ? {} : {}) }}>{children}</Box>;
}

function ListItem({ avatar, title, subtitle, ripple = false }: { avatar?: string; title: string; subtitle: string; ripple?: boolean }) {
  return (
    <RippleBox sx={{ minHeight: 72, px: 2, display: "flex", alignItems: "center", cursor: "pointer", "&:hover::before": { opacity: ripple ? 0.04 : 0 } }}>
      {avatar && <Avatar src={avatar} sx={{ width: 40, height: 40, mr: 2 }} />}
      <Box sx={{ minWidth: 0 }}>
        <Typography component="div" sx={{ fontSize: 16, lineHeight: 1.4 }} dangerouslySetInnerHTML={{ __html: title }} />
        <Typography component="div" sx={{ fontSize: 14, color: "rgba(0,0,0,.60)", lineHeight: 1.35, overflow: "hidden", textOverflow: "ellipsis" }} dangerouslySetInnerHTML={{ __html: subtitle }} />
      </Box>
    </RippleBox>
  );
}

function Subheader({ children, inset = false }: { children: ReactNode; inset?: boolean }) {
  return <Typography sx={{ height: 48, px: 2, ml: inset ? "56px" : 0, display: "flex", alignItems: "center", color: "rgba(0,0,0,.54)", fontSize: 14 }}>{children}</Typography>;
}

function VToolbar({ children, color }: { children: ReactNode; color: string }) {
  return <Toolbar sx={{ minHeight: 64, bgcolor: color, color: "#fff", px: 2 }}>{children}</Toolbar>;
}

function ToolbarTitle({ children }: { children: ReactNode }) {
  return <Typography sx={{ fontSize: 20, fontWeight: 500, whiteSpace: "nowrap" }}>{children}</Typography>;
}

function ToolbarTextButton({ children }: { children: ReactNode }) {
  return <RippleButton sx={{ color: "#fff", minWidth: 64, px: 2, borderRadius: 0, textTransform: "uppercase", fontSize: 14, fontWeight: 500 }}>{children}</RippleButton>;
}

function RippleBox({ children, sx = {} }: { children: ReactNode; sx?: Record<string, unknown> }) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const handleRipple = (event: PointerEvent<HTMLDivElement>) => addRipple(event, setRipples);

  return (
    <Box
      onPointerDown={handleRipple}
      sx={{
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          bgcolor: "currentColor",
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity .28s cubic-bezier(.4,0,.2,1)",
        },
        ...rippleKeyframes,
        ...sx,
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1, display: "contents" }}>{children}</Box>
      {ripples.map((ripple) => <RippleSpan key={ripple.id} ripple={ripple} />)}
    </Box>
  );
}

function RippleButton({ children, sx = {} }: { children: ReactNode; sx?: Record<string, unknown> }) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const handleRipple = (event: PointerEvent<HTMLButtonElement>) => addRipple(event, setRipples);

  return (
    <Button
      disableRipple
      onPointerDown={handleRipple}
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: 36,
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          bgcolor: "currentColor",
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity .28s cubic-bezier(.4,0,.2,1)",
        },
        "&:hover::before": { opacity: 0.08 },
        "&:focus-visible::before": { opacity: 0.24 },
        ...rippleKeyframes,
        ...sx,
      }}
    >
      <Box component="span" sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
      {ripples.map((ripple) => <RippleSpan key={ripple.id} ripple={ripple} />)}
    </Button>
  );
}

function RippleIconButton({ children }: { children: ReactNode }) {
  return (
    <IconButton disableRipple sx={{ color: "#fff", p: 0 }}>
      <RippleBox sx={{ width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", "&:hover::before": { opacity: 0.08 }, "&:focus-visible::before": { opacity: 0.24 } }}>
        {children}
      </RippleBox>
    </IconButton>
  );
}

function RippleSpan({ ripple }: { ripple: Ripple }) {
  return <Box component="span" sx={{ position: "absolute", left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size, borderRadius: "50%", bgcolor: "currentColor", opacity: ripple.leaving ? 0 : 0.15, pointerEvents: "none", animation: ripple.leaving ? "divider-ripple-out .3s cubic-bezier(.4,0,.2,1)" : "divider-ripple-in .25s cubic-bezier(.4,0,.2,1)" }} />;
}

function addRipple<T extends HTMLElement>(event: PointerEvent<T>, setRipples: (updater: (current: Ripple[]) => Ripple[]) => void) {
  const rect = event.currentTarget.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2.2;
  const id = window.performance.now();
  const ripple = { id, x: event.clientX - rect.left - size / 2, y: event.clientY - rect.top - size / 2, size, leaving: false };
  setRipples((current) => [...current.slice(-2), ripple]);
  window.setTimeout(() => setRipples((current) => current.map((item) => (item.id === id ? { ...item, leaving: true } : item))), 250);
  window.setTimeout(() => setRipples((current) => current.filter((item) => item.id !== id)), 560);
}

const rippleKeyframes = {
  "@keyframes divider-ripple-in": { from: { transform: "scale(.15)", opacity: 0.15 }, to: { transform: "scale(1)", opacity: 0.15 } },
  "@keyframes divider-ripple-out": { from: { opacity: 0.15 }, to: { opacity: 0 } },
};

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: 0.65, py: 0.15, borderRadius: 0.75, bgcolor: "rgba(255,82,82,.10)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "0.86em" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, mx: 0.25, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.05)" } };
}

const dividerExamples: DividerExample[] = [
  { title: "Inset dividers", description: "Inset dividers are moved 72px to the right. This will cause them to line up with list items.", source: "inset", minHeight: 360, render: () => <InsetExample /> },
  { title: "Vertical dividers", description: "Vertical dividers give you more tools for unique layouts.", source: "vertical", minHeight: 190, render: () => <VerticalExample /> },
  { title: "Vertical inset dividers", description: <>Vertical dividers can also be paired with the <CodePill>inset</CodePill> prop for even more options.</>, source: "verticalInset", minHeight: 190, render: () => <VerticalInsetExample /> },
  { title: "Dividers and subheaders", description: <>Dividers and subheaders can help break up content and can optionally line up with one another by using the same <CodePill>inset</CodePill> prop.</>, source: "subheaders", minHeight: 700, render: () => <SubheadersExample /> },
  { title: "Dividers in Portrait View", description: "Create custom cards to fit any use-case", source: "portrait", minHeight: 560, render: () => <PortraitExample /> },
];

const sourceTemplates = {
  inset: "src/demo/examples/dividers/simple/inset.vue",
  vertical: "src/demo/examples/dividers/simple/vertical.vue",
  verticalInset: "src/demo/examples/dividers/simple/vertical-inset.vue",
  subheaders: "src/demo/examples/dividers/intermediate/subheaders.vue",
  portrait: "src/demo/examples/dividers/intermediate/divider-list-portrait.vue",
};
