import { useState, type MouseEvent, type ReactNode } from "react";
import { Box, Button, Card, Chip, Collapse, Divider, IconButton, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { Code, Favorite, FavoriteBorder, GitHub, InvertColors, ViewModule } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const purple = "#9c27b0";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const sectionHeadingSx = { fontSize: { xs: 20, md: 22 }, lineHeight: 1.45, fontWeight: 400, mb: 2.5 };
const docsParagraphSx = { fontSize: { xs: 16, md: 20 }, lineHeight: 1.55, fontWeight: 300, mb: 3, color: "text.secondary" };
type ExampleKey = keyof typeof sourceTemplates;

interface Example {
  title: string;
  description: ReactNode;
  source: ExampleKey;
  minHeight: number;
  render: () => ReactNode;
}

export default function ItemGroupsPage() {
  return (
    <DocPage
      title="ItemGroups"
      namespace="Components"
      icon={<ViewModule />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Item Groups" },
      ]}
    >
      <DocText>
        The <CodePill>v-item-group</CodePill> provides the ability to create a group of selectable items out of any component. This is the baseline functionality for components such as <CodePill>v-tabs</CodePill> and <CodePill>v-carousel</CodePill>.
      </DocText>
      <UsageSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <Typography variant="h5" sx={sectionHeadingSx}>Usage</Typography>
      <Typography sx={docsParagraphSx}>The core usage of the <CodePill>v-item-group</CodePill> is to create groups of anything that should be controlled by a <strong>model</strong>.</Typography>
      <VuetifyExampleBlock title="" description="" source="usage" minHeight={300}>
        {() => <SelectableCards multiple={false} mandatory={false} />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function ExamplesSection() {
  return (
    <Box component="section">
      <Typography variant="h5" sx={sectionHeadingSx}>Examples</Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>Below is a collection of simple to complex examples.</Typography>
      <Stack spacing={5}>
        {examples.map((example) => (
          <VuetifyExampleBlock key={example.source} title={example.title} description={example.description} source={example.source} minHeight={example.minHeight}>{example.render}</VuetifyExampleBlock>
        ))}
      </Stack>
    </Box>
  );
}

function SelectableCards({ multiple, mandatory, activeClass = false }: { multiple: boolean; mandatory: boolean; activeClass?: boolean }) {
  const [selected, setSelected] = useState<number[]>(mandatory ? [0] : []);
  const toggle = (index: number) => {
    setSelected((current) => {
      const active = current.includes(index);
      if (multiple) return active ? current.filter((item) => item !== index) : [...current, index];
      if (active) return mandatory ? current : [];
      return [index];
    });
  };
  return (
    <VContainer>
      <VRow>
        {[0, 1, 2].map((index) => {
          const active = selected.includes(index);
          return (
            <VCol key={index} cols={12} md={4}>
              <ItemCard active={active} activeClass={activeClass} onClick={() => toggle(index)} />
            </VCol>
          );
        })}
      </VRow>
    </VContainer>
  );
}

function ItemCard({ active, activeClass = false, onClick }: { active: boolean; activeClass?: boolean; onClick: () => void }) {
  const activeColor = activeClass ? primary : primary;
  return (
    <RippleBox
      onClick={onClick}
      sx={{
        height: 200,
        bgcolor: active ? activeColor : "#424242",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        transition: "background-color 150ms cubic-bezier(.4,0,.2,1), box-shadow 150ms cubic-bezier(.4,0,.2,1)",
        boxShadow: "0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px rgba(0,0,0,.14), 0 1px 3px rgba(0,0,0,.12)",
      }}
    >
      <Collapse in={active} timeout={180} sx={{ width: "100%" }}>
        <Typography sx={{ flexGrow: 1, textAlign: "center", fontSize: 60, lineHeight: 1, fontWeight: 300 }}>Active</Typography>
      </Collapse>
    </RippleBox>
  );
}

function TogglePicturesExample() {
  const [selected, setSelected] = useState<number[]>([]);
  const items = ["backgrounds/bg.jpg", "backgrounds/md.jpg", "backgrounds/bg-2.jpg", "backgrounds/md2.jpg"];
  const toggle = (index: number) => setSelected((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  return (
    <Card sx={{ maxWidth: 400, mx: "auto", borderRadius: 1, boxShadow: "0 2px 4px rgba(0,0,0,.18)", overflow: "hidden" }}>
      <VContainer sx={{ p: 4 }}>
        <VRow>
          {items.map((src, index) => {
            const active = selected.includes(index);
            return (
              <VCol key={src} cols={12} md={6}>
                <PictureTile src={`https://cdn.vuetifyjs.com/images/${src}`} active={active} onClick={() => toggle(index)} />
              </VCol>
            );
          })}
        </VRow>
      </VContainer>
    </Card>
  );
}

function PictureTile({ src, active, onClick }: { src: string; active: boolean; onClick: () => void }) {
  return (
    <RippleBox onClick={onClick} sx={{ height: 150, bgcolor: "#ddd", backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center", p: 1, textAlign: "right", cursor: "pointer" }}>
      <IconButton sx={{ color: "#fff", bgcolor: "rgba(0,0,0,.18)", "&:hover": { bgcolor: "rgba(0,0,0,.26)" } }}>{active ? <Favorite /> : <FavoriteBorder />}</IconButton>
    </RippleBox>
  );
}

function PostExample() {
  const [selected, setSelected] = useState<number[]>([]);
  const toggle = (index: number) => setSelected((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  return (
    <Card sx={{ borderRadius: 1, boxShadow: "0 2px 4px rgba(0,0,0,.18)", overflow: "hidden" }}>
      <Toolbar sx={{ bgcolor: "#607d8b", color: "#fff", minHeight: 64 }}>
        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>Submit a post</Typography>
      </Toolbar>
      <Box sx={{ p: 2 }}>
        <FilledField label="Title" value="My new post" />
        <FilledArea label="Text" value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse" />
        <Divider sx={{ my: 2 }} />
        <Typography sx={{ color: "rgba(0,0,0,.6)", fontSize: 14, px: 2, py: 1 }}>Tags</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {Array.from({ length: 8 }, (_, index) => {
            const active = selected.includes(index);
            return (
              <Chip
                key={index}
                label={`Tag ${index + 1}`}
                onClick={() => toggle(index)}
                sx={{
                  height: 32,
                  borderRadius: 16,
                  bgcolor: active ? "rgba(156,39,176,.12)" : "rgba(0,0,0,.08)",
                  color: active ? purple : "rgba(0,0,0,.87)",
                  cursor: "pointer",
                  transition: "background-color 150ms ease, color 150ms ease",
                }}
              />
            );
          })}
        </Box>
      </Box>
      <Divider />
      <Box sx={{ minHeight: 52, display: "flex", justifyContent: "flex-end", alignItems: "center", p: 1 }}>
        <Button variant="contained" disableElevation sx={{ bgcolor: "#4caf50", color: "#fff", textTransform: "uppercase", minWidth: 64, height: 36, "&:hover": { bgcolor: "#43a047" } }}>Post</Button>
      </Box>
    </Card>
  );
}

function FilledField({ label, value }: { label: string; value: string }) {
  return <Box sx={{ position: "relative", bgcolor: "rgba(0,0,0,.06)", minHeight: 56, px: 1.5, pt: 2.4, mb: 2, borderBottom: "1px solid rgba(0,0,0,.42)" }}><Typography sx={{ position: "absolute", top: 8, left: 12, fontSize: 12, color: "rgba(0,0,0,.6)" }}>{label}</Typography><Typography sx={{ fontSize: 16 }}>{value}</Typography></Box>;
}

function FilledArea({ label, value }: { label: string; value: string }) {
  return <Box sx={{ position: "relative", bgcolor: "rgba(0,0,0,.06)", minHeight: 132, px: 1.5, pt: 3, mb: 1, borderBottom: "1px solid rgba(0,0,0,.42)" }}><Typography sx={{ position: "absolute", top: 8, left: 12, fontSize: 12, color: "rgba(0,0,0,.6)" }}>{label}</Typography><Typography sx={{ fontSize: 16, lineHeight: 1.5 }}>{value}</Typography></Box>;
}

function RippleBox({ children, onClick, sx = {} }: { children: ReactNode; onClick?: () => void; sx?: object }) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.8;
    const ripple = { id: Date.now(), x: event.clientX - rect.left - size / 2, y: event.clientY - rect.top - size / 2, size };
    setRipples((items) => [...items, ripple]);
    window.setTimeout(() => setRipples((items) => items.filter((item) => item.id !== ripple.id)), 520);
    onClick?.();
  };
  return (
    <Box onClick={handleClick} sx={{ position: "relative", overflow: "hidden", ...sx }}>
      {children}
      {ripples.map((ripple) => <Box key={ripple.id} sx={{ position: "absolute", left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size, borderRadius: "50%", bgcolor: "rgba(255,255,255,.28)", transform: "scale(0)", animation: "itemGroupRipple 520ms cubic-bezier(.4,0,.2,1)", pointerEvents: "none", "@keyframes itemGroupRipple": { to: { transform: "scale(1)", opacity: 0 } } }} />)}
    </Box>
  );
}

function VContainer({ children, sx = {} }: { children: ReactNode; sx?: object }) {
  return <Box sx={{ width: "100%", maxWidth: { xs: "100%", sm: 540, md: 720, lg: 960, xl: 1140 }, mx: "auto", px: "12px", py: "12px", ...sx }}>{children}</Box>;
}

function VRow({ children }: { children: ReactNode }) {
  return <Box sx={{ display: "flex", flexWrap: "wrap", mx: "-12px" }}>{children}</Box>;
}

function VCol({ children, cols = 12, md }: { children: ReactNode; cols?: number; md?: number }) {
  return <Box sx={{ px: "12px", py: "12px", flex: `0 0 ${(cols / 12) * 100}%`, maxWidth: `${(cols / 12) * 100}%`, ...(md ? { "@media (min-width:960px)": { flexBasis: `${(md / 12) * 100}%`, maxWidth: `${(md / 12) * 100}%` } } : {}) }}>{children}</Box>;
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

const examples: Example[] = [
  { title: "Multiple", description: <>Item groups can have multiple items selected.</>, source: "simple/multiple", minHeight: 300, render: () => <SelectableCards multiple mandatory={false} /> },
  { title: "Mandatory", description: <><strong>mandatory</strong> item groups must have at least 1 item selected.</>, source: "simple/mandatory", minHeight: 300, render: () => <SelectableCards multiple={false} mandatory /> },
  { title: "With active class", description: <><strong>activeClass</strong> property allows you to set custom CSS class on active items.</>, source: "simple/active-class", minHeight: 300, render: () => <SelectableCards multiple={false} mandatory={false} activeClass /> },
  { title: "Custom groups", description: <>Icons can be used as toggle buttons when they allow selection, or deselection, of a single choice, such as marking an item as a favorite.</>, source: "intermediate/toggle-pictures", minHeight: 420, render: () => <TogglePicturesExample /> },
  { title: "Chips", description: <>Easily hook up a custom chip group.</>, source: "complex/post", minHeight: 560, render: () => <PostExample /> },
];

const sourceTemplates = {
  usage: "src/demo/examples/item-groups/usage.vue",
  "simple/multiple": "src/demo/examples/item-groups/simple/multiple.vue",
  "simple/mandatory": "src/demo/examples/item-groups/simple/mandatory.vue",
  "simple/active-class": "src/demo/examples/item-groups/simple/active-class.vue",
  "intermediate/toggle-pictures": "src/demo/examples/item-groups/intermediate/toggle-pictures.vue",
  "complex/post": "src/demo/examples/item-groups/complex/post.vue",
};
