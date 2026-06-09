import { Fragment, useState, type ReactNode } from "react";
import {
  Box,
  Card,
  Collapse,
  IconButton,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Code, GitHub, InvertColors, ViewStream } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const cardShadow2 = "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)";

type ExampleKey = "usage" | "playground";

const rootTypes: Record<string, string> = {
  actions: "button@2",
  article: "heading, paragraph",
  avatar: "avatar",
  button: "button",
  card: "image, card-heading",
  "card-avatar": "image, list-item-avatar",
  "card-heading": "heading",
  chip: "chip",
  "date-picker": "list-item, card-heading, divider, date-picker-options, date-picker-days, actions",
  "date-picker-options": "text, avatar@2",
  "date-picker-days": "avatar@28",
  heading: "heading",
  image: "image",
  "list-item": "text",
  "list-item-avatar": "avatar, text",
  "list-item-two-line": "sentences",
  "list-item-avatar-two-line": "avatar, sentences",
  "list-item-three-line": "paragraph",
  "list-item-avatar-three-line": "avatar, paragraph",
  paragraph: "text@3",
  sentences: "text@2",
  table: "table-heading, table-thead, table-tbody, table-tfoot",
  "table-heading": "heading, text",
  "table-thead": "heading@6",
  "table-tbody": "table-row-divider@6",
  "table-row-divider": "table-row, divider",
  "table-row": "table-cell@6",
  "table-cell": "text",
  "table-tfoot": "text@2, avatar@2",
  text: "text",
};

function colorValue(color?: string) {
  switch (color) {
    case "grey lighten-4":
      return "#f5f5f5";
    case "grey darken-2":
      return "#616161";
    case "grey":
      return "#9e9e9e";
    default:
      return color || "#fff";
  }
}

function SkeletonLoadersPage() {
  return (
    <DocPage
      title="SkeletonLoaders"
      namespace="Components"
      icon={<ViewStream />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Skeleton Loaders" },
      ]}
    >
      <DocText>The <CodePill>v-skeleton-loader</CodePill> component is a versatile tool that can fill many roles within a project.  At its heart, the component provides an indication to the user that something is coming but not yet available. There are over 30 pre-defined options available that can be combined to make custom examples.</DocText>
      <Box component="section">
        <Typography component="h2" id="usage" sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400, mb: 2 }}>Usage</Typography>
        <VuetifyExampleBlock title="" source="usage" description={<>The <CodePill>v-skeleton-loader</CodePill> component provides a user with a visual indicator that content is coming / loading. This is better received than traditional full-screen loaders.</>}>
          {() => <UsageExample />}
        </VuetifyExampleBlock>
      </Box>
      <Box component="section">
        <Typography component="h2" id="playground" sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400, mb: 2 }}>Playground</Typography>
        <VuetifyExampleBlock title="" source="playground" description="">
          {() => <PlaygroundExample />}
        </VuetifyExampleBlock>
      </Box>
    </DocPage>
  );
}

function VSkeletonLoader({
  type = "",
  boilerplate = false,
  tile = false,
  loading,
  height,
  maxWidth,
  elevation = 0,
  children,
}: {
  type?: string;
  boilerplate?: boolean;
  tile?: boolean;
  loading?: boolean;
  height?: number | string;
  maxWidth?: number | string;
  elevation?: number;
  children?: ReactNode;
}) {
  const isLoading = children === undefined || loading;
  return (
    <Box
      className={`v-skeleton-loader${boilerplate ? " v-skeleton-loader--boilerplate" : ""}${isLoading ? " v-skeleton-loader--is-loading" : ""}${tile ? " v-skeleton-loader--tile" : ""}`}
      role={isLoading && !boilerplate ? "alert" : undefined}
      aria-busy={isLoading && !boilerplate ? true : undefined}
      aria-live={isLoading && !boilerplate ? "polite" : undefined}
      sx={{
        borderRadius: tile ? 0 : 1,
        boxShadow: elevation ? cardShadow2 : "none",
        height: isLoading ? height : undefined,
        maxWidth,
        mx: maxWidth ? "auto" : undefined,
        overflow: isLoading ? "hidden" : "visible",
        position: "relative",
        verticalAlign: "top",
        ...skeletonStyles(boilerplate, tile),
      }}
    >
      {isLoading ? genStructure(type || "text") : children}
    </Box>
  );
}

function genStructure(type: string): ReactNode {
  const bone = rootTypes[type] || "";
  if (type.includes(",")) return mapBones(type);
  if (type.includes("@")) return genBones(type);
  if (bone.includes(",")) return <Bone type={type}>{mapBones(bone)}</Bone>;
  if (bone.includes("@")) return <Bone type={type}>{genBones(bone)}</Bone>;
  if (bone && bone !== type) return <Bone type={type}>{genStructure(bone)}</Bone>;
  return <Bone type={type} />;
}

function mapBones(bones: string) {
  return bones.replace(/\s/g, "").split(",").map((bone, index) => (
    <Fragment key={`${bone}-${index}`}>{genStructure(bone)}</Fragment>
  ));
}

function genBones(bone: string) {
  const [type, length] = bone.split("@");
  return Array.from({ length: Number(length) }, (_, index) => (
    <Fragment key={`${type}-${index}`}>{genStructure(type)}</Fragment>
  ));
}

function Bone({ type, children }: { type: string; children?: ReactNode }) {
  return <Box className={`v-skeleton-loader__${type} v-skeleton-loader__bone`}>{children}</Box>;
}

function skeletonStyles(boilerplate: boolean, tile: boolean) {
  const bone = "#e0e0e0";
  return {
    "@keyframes skeletonLoading": { "100%": { transform: "translateX(100%)" } },
    "& .v-skeleton-loader__bone": {
      borderRadius: tile ? 0 : "inherit",
      overflow: "hidden",
      position: "relative",
      "&::after": boilerplate
        ? { display: "none" }
        : {
            animation: "skeletonLoading 1.5s infinite",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,.32), transparent)",
            content: "''",
            height: "100%",
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
            transform: "translateX(-100%)",
            zIndex: 1,
          },
    },
    "& .v-skeleton-loader__avatar, & .v-skeleton-loader__button, & .v-skeleton-loader__chip, & .v-skeleton-loader__divider, & .v-skeleton-loader__heading, & .v-skeleton-loader__image, & .v-skeleton-loader__text": { bgcolor: bone },
    "& .v-skeleton-loader__actions, & .v-skeleton-loader__article, & .v-skeleton-loader__card-heading, & .v-skeleton-loader__card-text, & .v-skeleton-loader__date-picker, & .v-skeleton-loader__list-item, & .v-skeleton-loader__list-item-avatar, & .v-skeleton-loader__list-item-two-line, & .v-skeleton-loader__list-item-avatar-two-line, & .v-skeleton-loader__list-item-three-line, & .v-skeleton-loader__list-item-avatar-three-line, & .v-skeleton-loader__table-heading, & .v-skeleton-loader__table-thead, & .v-skeleton-loader__table-tbody, & .v-skeleton-loader__table-tfoot": { bgcolor: "#fff" },
    "& .v-skeleton-loader__actions, & .v-skeleton-loader__article, & .v-skeleton-loader__card, & .v-skeleton-loader__card-avatar, & .v-skeleton-loader__card-heading, & .v-skeleton-loader__card-text, & .v-skeleton-loader__date-picker, & .v-skeleton-loader__date-picker-options, & .v-skeleton-loader__date-picker-days, & .v-skeleton-loader__list-item, & .v-skeleton-loader__list-item-avatar, & .v-skeleton-loader__list-item-two-line, & .v-skeleton-loader__list-item-avatar-two-line, & .v-skeleton-loader__list-item-three-line, & .v-skeleton-loader__list-item-avatar-three-line, & .v-skeleton-loader__paragraph, & .v-skeleton-loader__sentences, & .v-skeleton-loader__table, & .v-skeleton-loader__table-cell, & .v-skeleton-loader__table-heading, & .v-skeleton-loader__table-thead, & .v-skeleton-loader__table-tbody, & .v-skeleton-loader__table-tfoot, & .v-skeleton-loader__table-row, & .v-skeleton-loader__table-row-divider": { "&::after": { display: "none" } },
    "& .v-skeleton-loader__actions": { p: "16px 16px 8px", textAlign: "right", "& .v-skeleton-loader__button": { display: "inline-block", mr: "12px" } },
    "& .v-skeleton-loader__article .v-skeleton-loader__heading": { m: "16px 0 16px 16px" },
    "& .v-skeleton-loader__article .v-skeleton-loader__paragraph": { p: 2 },
    "& .v-skeleton-loader__avatar": { borderRadius: "50%", height: 56, width: 48 },
    "& .v-skeleton-loader__button": { borderRadius: 1, height: 36, width: 64 },
    "& .v-skeleton-loader__card .v-skeleton-loader__image": { borderRadius: 0 },
    "& .v-skeleton-loader__card-heading .v-skeleton-loader__heading": { m: 2 },
    "& .v-skeleton-loader__card-text": { p: 2 },
    "& .v-skeleton-loader__chip": { borderRadius: 16, height: 32, width: 96 },
    "& .v-skeleton-loader__date-picker .v-skeleton-loader__list-item:first-of-type .v-skeleton-loader__text": { maxWidth: 88, width: "20%" },
    "& .v-skeleton-loader__date-picker .v-skeleton-loader__heading": { maxWidth: 256, width: "40%" },
    "& .v-skeleton-loader__date-picker-days": { display: "flex", flexWrap: "wrap", p: "0 12px", m: "0 auto", "& .v-skeleton-loader__avatar": { borderRadius: 1, flex: "1 1 auto", m: "4px", height: 40, width: 40 } },
    "& .v-skeleton-loader__date-picker-options": { alignItems: "center", display: "flex", p: 2, "& .v-skeleton-loader__avatar": { height: 40, width: 40 }, "& .v-skeleton-loader__avatar:nth-child(2)": { ml: "auto", mr: 1 }, "& .v-skeleton-loader__text:first-child": { mb: 0, maxWidth: "50%", width: 456 } },
    "& .v-skeleton-loader__divider": { borderRadius: 1, height: 2 },
    "& .v-skeleton-loader__heading": { borderRadius: 12, height: 24, width: "45%" },
    "& .v-skeleton-loader__image": { height: 200, borderRadius: 0 },
    "& .v-skeleton-loader__list-item": { height: 48 },
    "& .v-skeleton-loader__list-item-avatar": { height: 56 },
    "& .v-skeleton-loader__list-item-two-line, & .v-skeleton-loader__list-item-avatar-two-line": { height: 72 },
    "& .v-skeleton-loader__list-item, & .v-skeleton-loader__list-item-avatar, & .v-skeleton-loader__list-item-two-line, & .v-skeleton-loader__list-item-three-line, & .v-skeleton-loader__list-item-avatar-two-line, & .v-skeleton-loader__list-item-avatar-three-line": { alignContent: "center", alignItems: "center", display: "flex", flexWrap: "wrap", p: "0 16px", borderRadius: 1, "& .v-skeleton-loader__avatar": { mr: 2, height: 40, width: 40 }, "& .v-skeleton-loader__text:last-child, & .v-skeleton-loader__text:only-child": { mb: 0 } },
    "& .v-skeleton-loader__list-item-three-line, & .v-skeleton-loader__list-item-avatar-three-line": { height: 88 },
    "& .v-skeleton-loader__list-item-three-line": { "& > *": { flex: "1 0 100%", width: "100%" } },
    "& .v-skeleton-loader__list-item-avatar-three-line .v-skeleton-loader__avatar": { alignSelf: "flex-start" },
    "& .v-skeleton-loader__paragraph, & .v-skeleton-loader__sentences": { flex: "1 0 auto" },
    "& .v-skeleton-loader__paragraph": { "&:not(:last-child)": { mb: "6px" }, "& .v-skeleton-loader__text:nth-child(1)": { maxWidth: "100%" }, "& .v-skeleton-loader__text:nth-child(2)": { maxWidth: "50%" }, "& .v-skeleton-loader__text:nth-child(3)": { maxWidth: "70%" } },
    "& .v-skeleton-loader__sentences": { "& .v-skeleton-loader__text:nth-child(2)": { maxWidth: "70%" }, "&:not(:last-child)": { mb: "6px" } },
    "& .v-skeleton-loader__table-heading": { alignItems: "center", display: "flex", justifyContent: "space-between", p: 2, "& .v-skeleton-loader__heading": { maxWidth: "15%" }, "& .v-skeleton-loader__text": { maxWidth: "40%" } },
    "& .v-skeleton-loader__table-thead": { display: "flex", justifyContent: "space-between", p: 2, "& .v-skeleton-loader__heading": { maxWidth: "5%" } },
    "& .v-skeleton-loader__table-tbody": { p: "16px 16px 0" },
    "& .v-skeleton-loader__table-tfoot": { alignItems: "center", display: "flex", justifyContent: "flex-end", p: 2, "& > *": { ml: 1 }, "& .v-skeleton-loader__avatar": { height: 40, width: 40 }, "& .v-skeleton-loader__text": { mb: 0 }, "& .v-skeleton-loader__text:nth-child(1)": { maxWidth: 128 }, "& .v-skeleton-loader__text:nth-child(2)": { maxWidth: 64 } },
    "& .v-skeleton-loader__table-row": { display: "flex", justifyContent: "space-between" },
    "& .v-skeleton-loader__table-cell": { alignItems: "center", display: "flex", height: 48, width: 88, "& .v-skeleton-loader__text": { mb: 0 } },
    "& .v-skeleton-loader__text": { borderRadius: 6, flex: "1 0 auto", height: 12, mb: "6px" },
  };
}

function UsageExample() {
  return (
    <VSheet color="grey lighten-4" sx={{ px: 3, pt: 3, pb: 3 }}>
      <VSkeletonLoader maxWidth={300} type="card" />
    </VSheet>
  );
}

function PlaygroundExample() {
  const [boilerplate, setBoilerplate] = useState(false);
  const [tile, setTile] = useState(false);
  const [type, setType] = useState("list-item-avatar-three-line");
  const types = Object.keys(rootTypes);
  const maxWidth = type.includes("table") ? 900 : 500;

  return (
    <VSheet color="grey lighten-4" sx={{ px: 3, pt: 3, pb: 12 }}>
      <Box sx={{ maxWidth, mx: "auto" }}>
        <Box sx={{ maxWidth: 500, mx: "auto", mb: 12 }}>
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", p: 3 }}>
            <TextField select label="Pre-made Types" value={type} onChange={(event) => setType(event.target.value)} variant="filled" sx={{ mr: 12, maxWidth: 250, minWidth: 250 }}>
              {types.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
            </TextField>
            <Box>
              <InsetSwitch label="Boilerplate" checked={boilerplate} onChange={setBoilerplate} />
              <InsetSwitch label="Tile" checked={tile} onChange={setTile} />
            </Box>
          </Box>
        </Box>
        <VSkeletonLoader boilerplate={boilerplate} type={type} tile={tile} />
      </Box>
    </VSheet>
  );
}

function InsetSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <Box onClick={() => onChange(!checked)} sx={{ display: "flex", alignItems: "center", cursor: "pointer", minHeight: 34, mb: 1 }}>
      <Box sx={{ width: 42, height: 34, position: "relative", mr: 1, display: "flex", alignItems: "center" }}>
        <Box sx={{ width: 34, height: 14, borderRadius: 8, bgcolor: checked ? primary : "rgba(0,0,0,.38)", opacity: checked ? .5 : .38 }} />
        <Box sx={{ position: "absolute", left: checked ? 18 : 0, width: 20, height: 20, borderRadius: "50%", bgcolor: checked ? primary : "#fafafa", boxShadow: cardShadow2, transition: "left 150ms ease" }} />
      </Box>
      <Typography sx={{ fontSize: 16 }}>{label}</Typography>
    </Box>
  );
}

function VSheet({ children, color, sx = {} }: { children: ReactNode; color?: string; sx?: Record<string, unknown> }) {
  return <Box className="v-sheet" sx={{ bgcolor: colorValue(color), borderRadius: 0, color: "rgba(0,0,0,.87)", ...sx }}>{children}</Box>;
}

function VContainer({ children, sx = {} }: { children: ReactNode; sx?: Record<string, unknown> }) {
  return <Box sx={{ width: "100%", px: "12px", mx: "auto", ...sx }}>{children}</Box>;
}

function VRow({ children, justify = "flex-start" }: { children: ReactNode; justify?: string }) {
  return <Box sx={{ display: "flex", flexWrap: "wrap", mx: "-12px", justifyContent: justify }}>{children}</Box>;
}

function VCol({ children, cols = 12, md, sx = {} }: { children: ReactNode; cols?: number; md?: number; sx?: Record<string, unknown> }) {
  return <Box sx={{ flex: { xs: `0 0 ${(cols / 12) * 100}%`, md: md ? `0 0 ${(md / 12) * 100}%` : undefined }, maxWidth: { xs: `${(cols / 12) * 100}%`, md: md ? `${(md / 12) * 100}%` : undefined }, px: "12px", py: "12px", ...sx }}>{children}</Box>;
}

function VuetifyExampleBlock({ title, description, source, children }: { title: string; description: ReactNode; source: ExampleKey; children: () => ReactNode }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card sx={{ mb: 5, bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
        <Typography sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>{title}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", overflowX: "auto", p: 2 }}>
          <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box>
        </Box>
      </Collapse>
      <Box sx={{ bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", p: 2, overflow: "visible" }}>
        {description && <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography>}
        <Box data-app="true" sx={{ overflow: "visible" }}>{children()}</Box>
      </Box>
    </Card>
  );
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: 0.55, py: 0.18, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: 0.5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

const sourceTemplates: Record<ExampleKey, string> = {
  usage: "src/demo/examples/skeleton-loaders/usage.vue",
  playground: "src/demo/examples/skeleton-loaders/playground.vue",
};

export default SkeletonLoadersPage;
