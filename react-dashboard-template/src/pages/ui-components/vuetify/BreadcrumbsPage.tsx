import { useState, type MouseEvent, type ReactNode } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ChevronRight,
  Code,
  Dashboard,
  FastForward,
  GitHub,
  InvertColors,
} from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };

interface CrumbItem {
  text: string;
  disabled: boolean;
  href: string;
}

interface BreadcrumbExample {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  minHeight: number;
  render: (inverted: boolean) => ReactNode;
}

export default function BreadcrumbsPage() {
  return (
    <DocPage
      title="Breadcrumbs"
      namespace="Components"
      icon={<Dashboard />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Breadcrumbs" },
      ]}
    >
      <DocText>
        The <CodePill>v-breadcrumbs</CodePill> component is a navigational helper for pages. It can accept a <strong>Material Icons</strong> icon or text characters as a divider. An array of objects can be passed to the <strong>items</strong> property of the component. Additionally, slots exists for more control of the breadcrumbs, either utilizing <CodePill>v-breadcrumbs-item</CodePill> or other custom markup.
      </DocText>
      <Alert severity="info" sx={{ mb: 4, borderRadius: 1, bgcolor: "rgba(0,150,167,.10)", color: "text.primary", boxShadow: neuInset, "& .MuiAlert-icon": { color: "#0097a7" } }}>
        By default <CodePill>v-breadcrumbs</CodePill> will disable all crumbs up to the current page in a nested paths. You can prevent this behavior by using <CodePill>exact: true</CodePill> on each applicable breadcrumb in the <CodePill>items</CodePill> array.
      </Alert>
      <UsageSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  const [large, setLarge] = useState(false);
  const [customDivider, setCustomDivider] = useState(false);
  const [divider, setDivider] = useState("/");
  const [inverted, setInverted] = useState(false);

  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Usage
      </Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>
        By default, breadcrumbs use a text divider. This can be any string.
      </Typography>
      <Card variant="outlined" sx={{ bgcolor: "background.default", borderColor: "rgba(111,125,133,.18)", boxShadow: "none", overflow: "hidden", mb: 6 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 3fr) minmax(250px, 1fr)" } }}>
          <Box sx={{ minHeight: 300, p: { xs: 3, md: 4 }, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "#fff" : "inherit", transition: "background-color 180ms ease, color 180ms ease" }}>
            <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 220 }}>
              <VBreadcrumbs items={items} divider={customDivider ? <ChevronRight sx={{ fontSize: large ? 22 : 20 }} /> : divider} large={large} inverted={inverted} />
            </Stack>
          </Box>
          <Box sx={{ borderLeft: { md: "1px solid rgba(111,125,133,.14)" } }}>
            <Toolbar variant="dense" sx={{ bgcolor: "rgba(111,125,133,.10)", minHeight: 54, px: 2.25 }}>
              <Typography sx={{ fontSize: 20, fontWeight: 400 }}>Options</Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Tooltip title="Invert playground colors">
                <IconButton size="small" aria-label="Invert playground colors" onClick={() => setInverted((value) => !value)} sx={softIconButtonSx(inverted)}>
                  <InvertColors fontSize="small" />
                </IconButton>
              </Tooltip>
            </Toolbar>
            <Divider />
            <Stack spacing={1.5} sx={{ p: 2.25, maxHeight: 300, overflowY: "auto" }}>
              <FormControlLabel control={<Switch checked={customDivider} onChange={(event) => setCustomDivider(event.target.checked)} sx={vuseSwitchSx} />} label="customDivider" sx={switchLabelSx} />
              <FormControlLabel control={<Switch checked={large} onChange={(event) => setLarge(event.target.checked)} sx={vuseSwitchSx} />} label="large" sx={switchLabelSx} />
              <Typography sx={{ fontSize: 14, color: "text.secondary", pt: 0.5 }}>Divider</Typography>
              <Select value={divider} onChange={(event) => setDivider(event.target.value)} size="small" sx={vuseSelectSx}>
                {["/", "/", ".", ";", ">", "-"].map((option, index) => (
                  <MenuItem key={`${option}-${index}`} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </Stack>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

function ExamplesSection() {
  return (
    <Box component="section">
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Examples
      </Typography>
      <Stack spacing={5.5}>
        {breadcrumbExamples.map((example) => (
          <VuetifyExampleBlock key={example.title} title={example.title} description={example.description} source={example.source} minHeight={example.minHeight}>
            {(inverted) => example.render(inverted)}
          </VuetifyExampleBlock>
        ))}
      </Stack>
    </Box>
  );
}

function VuetifyExampleBlock({
  title,
  description,
  source,
  children,
  minHeight = 200,
}: {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  children: (inverted: boolean) => ReactNode;
  minHeight?: number;
}) {
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
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", maxHeight: { xs: "none", sm: "calc(100vh - 275px)" }, overflowY: "auto", p: 2 }}>
          <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', 'SFMono-Regular', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap", color: "#f8f8f2" }}>
            {sourceTemplates[source]}
          </Box>
        </Box>
      </Collapse>
      <Box sx={{ px: { xs: 3, md: 4 }, py: { xs: 3.5, md: 4.25 }, minHeight, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", transition: "background-color 180ms ease, color 180ms ease" }}>
        <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: 16.5, fontWeight: 300, lineHeight: 1.7, mb: 3 }}>
          {description}
        </Typography>
        {children(inverted)}
      </Box>
    </Card>
  );
}

function LargeExample({ inverted }: { inverted: boolean }) {
  return (
    <Stack spacing={2.5}>
      <VBreadcrumbs items={items} inverted={inverted} />
      <VBreadcrumbs items={items} large inverted={inverted} />
    </Stack>
  );
}

function DividerExample({ inverted }: { inverted: boolean }) {
  return (
    <Stack spacing={2.5}>
      <VBreadcrumbs items={items} divider="-" inverted={inverted} />
      <VBreadcrumbs items={items} divider="." inverted={inverted} />
    </Stack>
  );
}

function IconDividersExample({ inverted }: { inverted: boolean }) {
  return (
    <Stack spacing={2.5}>
      <VBreadcrumbs items={items} divider={<FastForward sx={{ fontSize: 20 }} />} inverted={inverted} />
      <VBreadcrumbs items={items} divider={<ChevronRight sx={{ fontSize: 20 }} />} inverted={inverted} />
    </Stack>
  );
}

function ItemSlotExample({ inverted }: { inverted: boolean }) {
  return <VBreadcrumbs items={items.map((item) => ({ ...item, text: item.text.toUpperCase() }))} inverted={inverted} />;
}

function VBreadcrumbs({
  items,
  divider = "/",
  large = false,
  inverted = false,
}: {
  items: CrumbItem[];
  divider?: ReactNode;
  large?: boolean;
  inverted?: boolean;
}) {
  return (
    <Box component="nav" aria-label="breadcrumbs" sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", minHeight: large ? 48 : 40, px: 1 }}>
      {items.map((item, index) => {
        const disabled = item.disabled;
        const last = index === items.length - 1;
        return (
          <Box key={`${item.text}-${index}`} sx={{ display: "inline-flex", alignItems: "center" }}>
            <Box
              component={disabled ? "span" : "a"}
              href={disabled ? undefined : item.href}
              onClick={(event: MouseEvent<HTMLElement>) => event.preventDefault()}
              sx={{
                color: disabled ? (inverted ? "rgba(255,255,255,.38)" : "rgba(0,0,0,.38)") : (inverted ? "rgba(255,255,255,.82)" : "rgba(0,0,0,.87)"),
                cursor: disabled ? "default" : "pointer",
                textDecoration: "none",
                fontSize: large ? 16 : 14,
                lineHeight: 1.4,
                fontWeight: 400,
                px: 1,
                "&:hover": { textDecoration: disabled ? "none" : "underline" },
              }}
            >
              {item.text}
            </Box>
            {!last && (
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: inverted ? "rgba(255,255,255,.38)" : "rgba(0,0,0,.38)",
                  mx: 0.5,
                  fontSize: large ? 16 : 14,
                  lineHeight: 1,
                  "& svg": { color: "inherit" },
                }}
              >
                {divider}
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}

function CodePill({ children }: { children: ReactNode }) {
  return (
    <Box component="code" sx={{ mx: 0.25, px: 0.6, py: 0.2, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "85%" }}>
      {children}
    </Box>
  );
}

function softIconButtonSx(active: boolean) {
  return {
    width: 34,
    height: 34,
    color: active ? "#0097a7" : "text.secondary",
    bgcolor: "background.paper",
    boxShadow: active ? neuInset : "-3px -3px 4px rgba(255,255,255,.72), 3px 3px 5px rgba(174,174,192,.28)",
    "&:hover": { bgcolor: "background.paper", color: "#0097a7" },
  };
}

function exampleIconSx(active: boolean) {
  return {
    width: 32,
    height: 32,
    ml: 0.75,
    color: active ? "#0097a7" : "text.secondary",
    bgcolor: "background.paper",
    boxShadow: active ? neuInset : "-3px -3px 4px rgba(255,255,255,.72), 3px 3px 5px rgba(174,174,192,.24)",
    "&:hover": { bgcolor: "background.paper", color: "#0097a7" },
  };
}

const switchLabelSx = {
  mx: 0,
  "& .MuiFormControlLabel-label": { fontSize: 15, color: "text.secondary" },
};

const vuseSwitchSx = {
  "& .MuiSwitch-switchBase.Mui-checked": { color: "#0097a7" },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "#0097a7" },
};

const vuseSelectSx = {
  height: 42,
  bgcolor: "#fff",
  borderRadius: 1,
  boxShadow: "0 2px 4px rgba(0,0,0,.16)",
  fontSize: 14,
  "& fieldset": { borderColor: "rgba(0,0,0,.12)" },
};

const items: CrumbItem[] = [
  { text: "Dashboard", disabled: false, href: "breadcrumbs_dashboard" },
  { text: "Link 1", disabled: false, href: "breadcrumbs_link_1" },
  { text: "Link 2", disabled: true, href: "breadcrumbs_link_2" },
];

const breadcrumbExamples: BreadcrumbExample[] = [
  {
    title: "Large",
    description: "Large breadcrumbs have larger font size.",
    source: "large",
    minHeight: 210,
    render: (inverted) => <LargeExample inverted={inverted} />,
  },
  {
    title: "Custom divider",
    description: "Breadcrumbs separator can be set using `divider` property.",
    source: "divider",
    minHeight: 210,
    render: (inverted) => <DividerExample inverted={inverted} />,
  },
  {
    title: "Icon dividers",
    description: "For the icon variant, breadcrumbs can use any icon in Material Design Icons.",
    source: "icon-dividers",
    minHeight: 210,
    render: (inverted) => <IconDividersExample inverted={inverted} />,
  },
  {
    title: "Item slot",
    description: <>You can use the <CodePill>item</CodePill> slot to customize each breadcrumb.</>,
    source: "item-slot",
    minHeight: 170,
    render: (inverted) => <ItemSlotExample inverted={inverted} />,
  },
];

const sourceTemplates = {
  large: `<template>
  <div>
    <v-breadcrumbs :items="items"></v-breadcrumbs>

    <v-breadcrumbs :items="items" large></v-breadcrumbs>
  </div>
</template>`,
  divider: `<template>
  <div>
    <v-breadcrumbs :items="items" divider="-"></v-breadcrumbs>

    <v-breadcrumbs :items="items" divider="."></v-breadcrumbs>
  </div>
</template>`,
  "icon-dividers": `<template>
  <div>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-forward</v-icon>
      </template>
    </v-breadcrumbs>

    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>`,
  "item-slot": `<template>
  <v-breadcrumbs :items="items">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
        :href="item.href"
        :disabled="item.disabled"
      >
        {{ item.text.toUpperCase() }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>`,
};
