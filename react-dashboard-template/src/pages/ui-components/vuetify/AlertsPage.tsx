import { useState, type ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  CheckCircle,
  Close,
  Code,
  Delete,
  Error as ErrorIcon,
  GitHub,
  Home,
  Info,
  InvertColors,
  LocalFireDepartment,
  School,
  Security,
  Twitter,
  Warning,
  Whatshot,
} from "@mui/icons-material";
import { Dashboard } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const neuGlowSmall = "-4px -4px 5px rgba(255,255,255,.86), 5px 5px 7px rgba(174,174,192,.24)";
const buttonActiveInset = "inset -2px -2px 3px rgba(255,255,255,.34), inset 2px 2px 4px rgba(38,50,56,.22)";
const docsParagraphSx = { fontSize: { xs: 17.5, md: 19 }, lineHeight: 1.75, fontWeight: 300, mb: 4 };

type AlertTone = "success" | "info" | "warning" | "error";
type BorderSide = "top" | "right" | "bottom" | "left";
type UsageTab = "normal" | "dense" | "prominent" | "outlined" | "text" | "tile";

interface VuseAlertProps {
  children: ReactNode;
  type?: AlertTone;
  color?: string;
  border?: BorderSide;
  dark?: boolean;
  dense?: boolean;
  text?: boolean;
  outlined?: boolean;
  prominent?: boolean;
  coloredBorder?: boolean;
  elevation?: number;
  icon?: ReactNode;
  dismissible?: boolean;
  closeIcon?: ReactNode;
  onClose?: () => void;
  tile?: boolean;
}

export default function AlertsPage() {
  return (
    <DocPage
      title="Alerts"
      namespace="Components"
      icon={<Dashboard />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Alerts" },
      ]}
    >
      <DocText>
        The alert component is used to convey important information to the user through contextual types, colors, borders, icons, and dismissible states.
      </DocText>
      <UsageSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  const [dismissible, setDismissible] = useState(false);
  const [elevation, setElevation] = useState(0);
  const [tab, setTab] = useState<UsageTab>("normal");
  const [border, setBorder] = useState("");
  const [color, setColor] = useState("");
  const [icon, setIcon] = useState("");
  const [type, setType] = useState("");
  const [visible, setVisible] = useState(true);
  const [inverted, setInverted] = useState(false);

  const selectedType = type as AlertTone | "";
  const alertColor = color || selectedType || "blue lighten-2";
  const isDismissible = dismissible;

  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Usage
      </Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>
        Alerts can have a contextual color and are hidden by default.
      </Typography>
      <Card
        variant="outlined"
        sx={{
          bgcolor: "background.default",
          borderColor: "rgba(111,125,133,.18)",
          boxShadow: "none",
          overflow: "hidden",
          mb: 6,
        }}
      >
        <Grid container>
          <Grid item xs={12} md={9}>
            <Box sx={{ bgcolor: "rgba(111,125,133,.10)", borderBottom: "1px solid rgba(111,125,133,.14)" }}>
              <ToggleButtonGroup
                exclusive
                value={tab}
                onChange={(_, value: UsageTab | null) => {
                  if (value) {
                    setTab(value);
                    setVisible(true);
                  }
                }}
                sx={{
                  pl: { xs: 0, md: 3 },
                  overflowX: "auto",
                  maxWidth: "100%",
                  "& .MuiToggleButton-root": {
                    minHeight: 54,
                    px: 2.4,
                    color: "text.secondary",
                    bgcolor: "transparent",
                    boxShadow: "none",
                    borderRadius: 0,
                    fontSize: 15,
                    fontWeight: 500,
                    lineHeight: 1.2,
                    transition: "color 140ms ease, background-color 140ms ease, box-shadow 140ms ease",
                    "&:hover": { bgcolor: "rgba(0,131,143,.06)", color: "primary.main" },
                    "&:active": { bgcolor: "rgba(0,131,143,.10)", boxShadow: buttonActiveInset },
                    "&:focus-visible": { outline: "2px solid rgba(0,131,143,.34)", outlineOffset: -2 },
                    "&.Mui-disabled": { color: "rgba(111,125,133,.36)" },
                  },
                  "& .Mui-selected": {
                    color: "primary.main",
                    boxShadow: "inset 0 -2px 0 #00838f",
                    bgcolor: "rgba(0,131,143,.04)",
                    "&:hover": { bgcolor: "rgba(0,131,143,.08)" },
                  },
                }}
              >
                {(["normal", "dense", "prominent", "outlined", "text", "tile"] as UsageTab[]).map((value) => (
                  <ToggleButton key={value} value={value}>
                    {value}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
            <Box sx={{ height: 350, overflowY: "auto", bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "#fff" : "inherit", transition: "background-color 180ms ease" }}>
              <Stack sx={{ minHeight: 350, p: { xs: 3.25, md: 4 } }} alignItems="center" justifyContent="center">
                {visible ? (
                  <VuseAlert
                    color={alertColor}
                    type={selectedType || undefined}
                    border={(border || undefined) as BorderSide | undefined}
                    icon={icon ? iconNode(icon) : undefined}
                    dense={tab === "dense"}
                    prominent={tab === "prominent"}
                    outlined={tab === "outlined"}
                    text={tab === "text"}
                    tile={tab === "tile"}
                    elevation={elevation}
                    dismissible={isDismissible}
                    onClose={() => setVisible(false)}
                  >
                    Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. In auctor lobortis lacus.
                  </VuseAlert>
                ) : (
                  <Button variant="contained" onClick={() => setVisible(true)} sx={vuseButtonSx("primary")}>
                    Reset
                  </Button>
                )}
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={3} sx={{ borderLeft: { md: "1px solid rgba(111,125,133,.14)" } }}>
            <Toolbar variant="dense" sx={{ bgcolor: "rgba(111,125,133,.10)", minHeight: 54, px: 2.25 }}>
              <Typography sx={{ fontSize: 20, fontWeight: 400 }}>Options</Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Tooltip title="Invert playground colors">
                <IconButton size="small" aria-label="Invert playground colors" onClick={() => setInverted((value) => !value)} sx={softIconButtonSx(inverted)}>
                  <InvertColors fontSize="small" />
                </IconButton>
              </Tooltip>
            </Toolbar>
            <Stack spacing={1.9} sx={{ p: 2.25, maxHeight: 350, overflowY: "auto" }}>
              <FormControlLabel
                control={<Switch checked={dismissible} onChange={(event) => setDismissible(event.target.checked)} sx={vuseSwitchSx} />}
                label="dismissible"
                sx={{ m: 0, minHeight: 42, "& .MuiFormControlLabel-label": { fontSize: 15, color: "text.secondary", textTransform: "capitalize" } }}
              />
              <Stack spacing={0.75}>
                <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                  Elevation
                </Typography>
                <Slider min={0} max={24} value={elevation} onChange={(_, value) => setElevation(value as number)} />
              </Stack>
              <UsageSelect label="Border" value={border} items={["top", "right", "left", "bottom"]} onChange={setBorder} />
              <UsageSelect label="Color" value={color} items={["red", "orange", "yellow", "green", "blue", "purple"]} onChange={setColor} />
              <UsageSelect label="Icon" value={icon} items={["mdi-vuetify", "mdi-account"]} onChange={setIcon} />
              <UsageSelect label="Type" value={type} items={["success", "info", "warning", "error"]} onChange={setType} />
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

function UsageSelect({ label, value, items, onChange }: { label: string; value: string; items: string[]; onChange: (value: string) => void }) {
  return (
    <FormControl fullWidth size="small" variant="outlined" sx={usageSelectSx}>
      <InputLabel shrink={Boolean(value)}>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(event) => onChange(event.target.value)}
        displayEmpty={false}
        MenuProps={{
          PaperProps: {
            sx: {
              mt: 0.75,
              bgcolor: "background.default",
              boxShadow: neuGlowSmall,
              borderRadius: 1,
              "& .MuiMenuItem-root": {
                minHeight: 36,
                fontSize: 14,
                "&:hover": { bgcolor: "rgba(0,131,143,.08)" },
                "&.Mui-selected": { bgcolor: "rgba(0,131,143,.12)", color: "primary.main" },
                "&.Mui-selected:hover": { bgcolor: "rgba(0,131,143,.16)" },
              },
            },
          },
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {items.map((item) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function ExamplesSection() {
  return (
    <Box component="section">
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Examples
      </Typography>
      <Typography color="text.secondary" sx={{ ...docsParagraphSx, mb: 5 }}>
        Alert examples rendered in the same documentation card flow as the Vue Vuse page.
      </Typography>
      <Grid container spacing={5.5}>
        {alertExamples.map((example) => (
          <Grid item xs={12} key={example.title}>
            <VuetifyExampleBlock title={example.title} description={example.description} source={example.source} minHeight={example.minHeight}>
              {example.render()}
            </VuetifyExampleBlock>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function VuetifyExampleBlock({ title, description, source, children, minHeight = 215 }: { title: string; description?: string; source: string; children: ReactNode; minHeight?: number }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("template");
  const sourceSections = getSourceSections(source);
  const sectionNames = Object.keys(sourceSections);
  const activeSection = sourceSections[selectedSection] ? selectedSection : sectionNames[0];

  return (
    <Card sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "hidden" }}>
      <Toolbar variant="dense" sx={{ minHeight: description ? 126 : 74, alignItems: "flex-start", pt: description ? 2.75 : 1.65, pb: 1.6, px: { xs: 3, md: 4 }, bgcolor: "transparent" }}>
        <Box sx={{ minWidth: 0, pr: 2 }}>
          <Typography sx={{ fontSize: { xs: 22, md: 25 }, fontWeight: 500, lineHeight: 1.35 }}>{title}</Typography>
          {description && (
            <Typography color="text.secondary" sx={{ mt: 1.1, fontSize: { xs: 16.5, md: 18.5 }, lineHeight: 1.72, maxWidth: 980, fontWeight: 300 }}>
              {description}
            </Typography>
          )}
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
                  "&:active": { bgcolor: "rgba(255,255,255,.22)" },
                  "&:focus-visible": { outline: "2px solid rgba(29,233,182,.72)", outlineOffset: 2 },
                }}
              >
                {section}
              </Button>
            ))}
          </Stack>
          <Divider sx={{ borderColor: "rgba(255,255,255,.14)" }} />
          <Box
            sx={{
              maxHeight: { xs: "none", sm: "calc(100vh - 275px)" },
              overflowY: "auto",
              p: 2,
            }}
          >
            <Box
              component="pre"
              sx={{
                m: 0,
                fontFamily: "'Roboto Mono', 'SFMono-Regular', Consolas, monospace",
                fontSize: 12.5,
                lineHeight: 1.55,
                whiteSpace: "pre-wrap",
                color: "#f8f8f2",
              }}
            >
              {sourceSections[activeSection]}
            </Box>
          </Box>
        </Box>
      </Collapse>
      <Box
        sx={{
          px: { xs: 3, md: 4 },
          py: { xs: 3.5, md: 4.25 },
          minHeight,
          bgcolor: inverted ? "#303030" : "transparent",
          color: inverted ? "rgba(255,255,255,.92)" : "inherit",
          transition: "background-color 180ms ease, color 180ms ease",
          "& .vuse-alert": { filter: inverted ? "brightness(.95)" : "none" },
        }}
      >
        <Box sx={{ width: "100%" }}>{children}</Box>
      </Box>
    </Card>
  );
}

function exampleIconSx(active: boolean) {
  return {
    width: 28,
    height: 28,
    color: active ? "primary.main" : "text.secondary",
    mx: 0.1,
    bgcolor: "transparent",
    opacity: active ? 0.72 : 0.48,
    transition: "color 140ms ease, background-color 140ms ease, opacity 140ms ease, transform 140ms ease",
    "&:hover": {
      bgcolor: "rgba(0,131,143,.08)",
      color: "primary.main",
      opacity: 0.82,
    },
    "&:active": {
      transform: "scale(.94)",
      bgcolor: "rgba(0,131,143,.14)",
      opacity: 1,
    },
    "&:focus-visible": {
      outline: "2px solid rgba(0,131,143,.38)",
      outlineOffset: 2,
    },
  };
}

function softIconButtonSx(active: boolean) {
  return {
    width: 36,
    height: 36,
    color: active ? "primary.main" : "text.secondary",
    bgcolor: "transparent",
    opacity: active ? 0.86 : 0.72,
    transition: "color 140ms ease, background-color 140ms ease, transform 140ms ease, opacity 140ms ease",
    "&:hover": { bgcolor: "rgba(0,131,143,.08)", color: "primary.main", opacity: 1 },
    "&:active": { bgcolor: "rgba(0,131,143,.14)", transform: "scale(.94)" },
    "&:focus-visible": { outline: "2px solid rgba(0,131,143,.34)", outlineOffset: 2 },
  };
}

const usageSelectSx = {
  "& .MuiInputLabel-root": {
    fontSize: 15,
    lineHeight: 1,
    color: "text.secondary",
    transform: "translate(15px, 15px) scale(1)",
    "&.Mui-focused": { color: "primary.main" },
    "&.MuiInputLabel-shrink": {
      transform: "translate(12px, -8px) scale(.80)",
      px: 0.5,
      bgcolor: "background.default",
      lineHeight: 1.15,
    },
  },
  "& .MuiOutlinedInput-root": {
    minHeight: 48,
    borderRadius: 1,
    bgcolor: "background.default",
    transition: "background-color 140ms ease, box-shadow 140ms ease, border-color 140ms ease",
    "& fieldset": { borderColor: "rgba(111,125,133,.28)" },
    "&:hover": { bgcolor: "rgba(0,131,143,.025)" },
    "&:hover fieldset": { borderColor: "rgba(0,131,143,.44)" },
    "&.Mui-focused": { boxShadow: "0 0 0 2px rgba(0,131,143,.10)" },
    "&.Mui-focused fieldset": { borderWidth: 1, borderColor: "#00838f" },
    "&.Mui-disabled": { bgcolor: "rgba(111,125,133,.06)" },
  },
  "& .MuiSelect-select": {
    minHeight: "0 !important",
    height: 48,
    display: "flex",
    alignItems: "center",
    py: "0 !important",
    pl: "15px !important",
    pr: "40px !important",
    fontSize: 15,
    lineHeight: "48px",
    color: "text.primary",
  },
  "& .MuiSelect-icon": {
    right: 12,
    color: "text.secondary",
    top: "calc(50% - 12px)",
  },
};

const vuseSwitchSx = {
  width: 48,
  height: 30,
  p: 0.5,
  "& .MuiSwitch-switchBase": {
    p: 0.75,
    transitionDuration: "140ms",
    "&.Mui-checked": {
      transform: "translateX(18px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        bgcolor: "#00838f",
        opacity: 1,
      },
      "&:hover": { bgcolor: "rgba(0,131,143,.08)" },
    },
    "&:hover": { bgcolor: "rgba(0,131,143,.06)" },
    "&:active .MuiSwitch-thumb": { boxShadow: buttonActiveInset },
  },
  "& .MuiSwitch-thumb": {
    width: 18,
    height: 18,
    boxShadow: neuGlowSmall,
  },
  "& .MuiSwitch-track": {
    borderRadius: 999,
    bgcolor: "rgba(111,125,133,.26)",
    opacity: 1,
    boxShadow: "inset 1px 1px 3px rgba(174,174,192,.34)",
  },
};

function vuseButtonSx(tone: "primary" | "deepPurple" | "dark" | "light") {
  const colors = {
    primary: { bg: "#00838f", hover: "#007580", active: "#006872", color: "#fff" },
    deepPurple: { bg: "#6200ea", hover: "#5600cf", active: "#4b00b6", color: "#fff" },
    dark: { bg: "#424242", hover: "#383838", active: "#303030", color: "#fff" },
    light: { bg: "#fff", hover: "#f7f8fb", active: "#eef1f5", color: "#263238" },
  }[tone];

  return {
    minHeight: 40,
    px: 2.4,
    borderRadius: 1,
    bgcolor: colors.bg,
    color: colors.color,
    boxShadow: tone === "light" ? "0 2px 4px rgba(38,50,56,.14)" : "0 2px 5px rgba(38,50,56,.18)",
    textTransform: "none",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: 0,
    transition: "background-color 140ms ease, box-shadow 140ms ease, transform 140ms ease",
    "&:hover": {
      bgcolor: colors.hover,
      boxShadow: tone === "light" ? "0 3px 7px rgba(38,50,56,.16)" : "0 3px 8px rgba(38,50,56,.24)",
    },
    "&:active": {
      bgcolor: colors.active,
      boxShadow: buttonActiveInset,
      transform: "translateY(1px)",
    },
    "&:focus-visible": {
      outline: "2px solid rgba(0,131,143,.34)",
      outlineOffset: 2,
    },
    "&.Mui-disabled": {
      bgcolor: "rgba(111,125,133,.16)",
      color: "rgba(111,125,133,.56)",
      boxShadow: "none",
    },
  };
}

function vuseOutlinedButtonSx(color: string) {
  return {
    minHeight: 38,
    px: 2.1,
    borderRadius: 1,
    borderColor: color,
    color,
    bgcolor: "transparent",
    textTransform: "none",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.25,
    transition: "background-color 140ms ease, box-shadow 140ms ease, transform 140ms ease",
    "&:hover": {
      borderColor: color,
      bgcolor: "rgba(33,150,243,.08)",
    },
    "&:active": {
      bgcolor: "rgba(33,150,243,.14)",
      boxShadow: buttonActiveInset,
      transform: "translateY(1px)",
    },
    "&:focus-visible": {
      outline: "2px solid rgba(33,150,243,.34)",
      outlineOffset: 2,
    },
  };
}

function getSourceSections(source: string): Record<string, string> {
  const template = sourceTemplates[source] || `<template>
  <div>
    <!-- ${source}.vue -->
    <v-alert type="info">
      Example alert content.
    </v-alert>
  </div>
</template>`;

  const sections: Record<string, string> = { template };
  if (source.includes("dismissible") || source.includes("transition") || source.includes("twitter")) {
    sections.script = `<script>
  export default {
    data: () => ({
      alert: true,
    }),
  }
</script>`;
  }
  return sections;
}

const sourceTemplates: Record<string, string> = {
  "alerts/simple/type": `<template>
  <div>
    <v-alert type="success">I'm a success alert.</v-alert>
    <v-alert type="info">I'm an info alert.</v-alert>
    <v-alert type="warning">I'm a warning alert.</v-alert>
    <v-alert type="error">I'm an error alert.</v-alert>
  </div>
</template>`,
  "alerts/simple/border": `<template>
  <div>
    <v-alert border="top" color="red lighten-2" dark>
      I'm an alert with a top border and red color
    </v-alert>
    <v-alert border="right" color="blue-grey" dark>
      I'm an alert with a right border and blue-grey color
    </v-alert>
    <v-alert border="bottom" color="pink darken-1" dark>
      I'm an alert with a bottom border and pink color
    </v-alert>
    <v-alert border="left" color="indigo" dark>
      I'm an alert with a border left type info
    </v-alert>
  </div>
</template>`,
  "alerts/simple/colored-border": `<template>
  <div>
    <v-alert border="left" colored-border color="deep-purple accent-4" elevation="2">
      Aliquam eu nunc. Fusce commodo aliquam arcu.
    </v-alert>
    <v-alert border="top" colored-border type="info" elevation="2">
      Vestibulum ullamcorper mauris at ligula.
    </v-alert>
    <v-alert border="bottom" colored-border type="warning" elevation="2">
      Sed in libero ut nibh placerat accumsan.
    </v-alert>
    <v-alert border="right" colored-border type="error" elevation="2">
      Fusce commodo aliquam arcu.
    </v-alert>
  </div>
</template>`,
  "alerts/simple/dense": `<template>
  <div>
    <v-alert dense type="info">I'm a dense alert with a <strong>type</strong> of info</v-alert>
    <v-alert dense text type="success">I'm a dense alert with the <strong>text</strong> prop.</v-alert>
    <v-alert dense border="left" type="warning">I'm a dense alert with the <strong>border</strong> prop.</v-alert>
    <v-alert dense outlined type="error">I'm a dense alert with the <strong>outlined</strong> prop.</v-alert>
  </div>
</template>`,
  "alerts/simple/dismissible": `<template>
  <div>
    <v-alert
      v-model="alert"
      border="left"
      close-text="Close Alert"
      color="deep-purple accent-4"
      dark
      dismissible
    >
      Aenean imperdiet. Quisque id odio. Cras dapibus.
    </v-alert>
    <div class="text-center">
      <v-btn v-if="!alert" color="deep-purple accent-4" dark @click="alert = true">
        Reset
      </v-btn>
    </div>
  </div>
</template>`,
  "alerts/simple/icon": `<template>
  <div>
    <v-alert color="#2A3B4D" dark icon="mdi-firework" dense>
      Suspendisse enim turpis.
    </v-alert>
    <v-alert color="#C51162" dark icon="mdi-material-design" border="right">
      Phasellus blandit leo ut odio.
    </v-alert>
    <v-alert color="primary" dark icon="mdi-vuetify" border="left" prominent>
      Praesent congue erat at massa.
    </v-alert>
  </div>
</template>`,
  "alerts/simple/outlined": `<template>
  <div>
    <v-alert outlined color="purple">
      <div class="text-h6">Lorem Ipsum</div>
      <div>Maecenas ullamcorper, dui et placerat feugiat.</div>
    </v-alert>
    <v-alert outlined type="success" text>Praesent venenatis metus.</v-alert>
    <v-alert outlined type="warning" prominent border="left">Duis arcu tortor.</v-alert>
  </div>
</template>`,
  "alerts/simple/prominent": `<template>
  <div>
    <v-alert prominent type="error">
      <v-row align="center">
        <v-col class="grow">Nunc nonummy metus.</v-col>
        <v-col class="shrink"><v-btn>Take action</v-btn></v-col>
      </v-row>
    </v-alert>
    <v-alert color="blue-grey" dark dense icon="mdi-school" prominent>Sed augue ipsum.</v-alert>
    <v-alert icon="mdi-shield-lock-outline" prominent text type="info">Donec quam felis.</v-alert>
  </div>
</template>`,
  "alerts/simple/text": `<template>
  <div>
    <v-alert text color="info">
      <h3 class="text-h5">Lorem Ipsum</h3>
      <div>Maecenas nec odio et ante tincidunt tempus.</div>
      <v-divider class="my-4 info" style="opacity: 0.22"></v-divider>
      <v-row align="center" no-gutters>
        <v-col class="grow">Proin magna.</v-col>
        <v-spacer></v-spacer>
        <v-col class="shrink"><v-btn color="info" outlined>Okay</v-btn></v-col>
      </v-row>
    </v-alert>
  </div>
</template>`,
  "alerts/simple/transition": `<template>
  <div>
    <div class="text-center mb-4">
      <v-btn color="primary" @click="alert = !alert">Toggle</v-btn>
    </div>
    <v-alert :value="alert" color="pink" dark border="top" icon="mdi-home" transition="scale-transition">
      Phasellus tempus. Fusce ac felis sit amet ligula pharetra condimentum.
    </v-alert>
  </div>
</template>`,
  "alerts/complex/twitter": `<template>
  <div>
    <v-alert
      v-model="alert"
      dismissible
      close-icon="mdi-delete"
      color="cyan"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-twitter"
    >
      You've got <strong>5</strong> new updates on your timeline!.
    </v-alert>
    <div class="text-center">
      <v-btn v-if="!alert" dark @click="alert = true">Reset Alert</v-btn>
    </div>
  </div>
</template>`,
};

function VuseAlert({
  children,
  type,
  color,
  border,
  dark,
  dense,
  text,
  outlined,
  prominent,
  coloredBorder,
  elevation = 0,
  icon,
  dismissible,
  closeIcon,
  onClose,
  tile,
}: VuseAlertProps) {
  const palette = resolveAlertPalette(type, color);
  const isDark = dark || (!text && !outlined && !coloredBorder && palette.darkSurface);
  const accent = palette.accent;
  const hasIcon = icon !== undefined || type !== undefined;

  return (
    <Box
      className="vuse-alert"
      sx={{
        width: "100%",
        position: "relative",
        display: "flex",
        gap: prominent ? 2.75 : 1.8,
        alignItems: prominent ? "center" : "flex-start",
        borderRadius: tile ? 0 : 1,
        px: prominent ? 3 : 2.35,
        py: dense ? 1.05 : prominent ? 2.75 : 1.75,
        my: 1.35,
        color: isDark ? "#fff" : text || coloredBorder || outlined ? accent : "#263238",
        bgcolor: text || outlined || coloredBorder ? (text ? palette.tint : "background.default") : palette.bg,
        border: outlined ? `1px solid ${accent}` : "1px solid transparent",
        boxShadow: elevation > 0 ? shadowForElevation(elevation) : coloredBorder ? neuGlowSmall : "none",
        overflow: "hidden",
        lineHeight: 1.62,
        fontSize: dense ? 15 : 16,
        "& strong": { fontWeight: 700 },
        "&:before": border
          ? {
              content: '""',
              position: "absolute",
              bgcolor: accent,
              ...(border === "left" && { left: 0, top: 0, bottom: 0, width: coloredBorder ? 4 : 5 }),
              ...(border === "right" && { right: 0, top: 0, bottom: 0, width: coloredBorder ? 4 : 5 }),
              ...(border === "top" && { left: 0, right: 0, top: 0, height: coloredBorder ? 4 : 5 }),
              ...(border === "bottom" && { left: 0, right: 0, bottom: 0, height: coloredBorder ? 4 : 5 }),
            }
          : undefined,
      }}
    >
      {hasIcon && (
        <Box
          sx={{
            pt: prominent ? 0 : 0.05,
            color: isDark ? "#fff" : accent,
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            "& .MuiSvgIcon-root": { fontSize: prominent ? 34 : 25 },
          }}
        >
          {icon || typeIcon(type)}
        </Box>
      )}
      <Box sx={{ flex: 1, minWidth: 0 }}>{children}</Box>
      {dismissible && (
        <IconButton aria-label="Close Alert" size="small" onClick={onClose} sx={{ color: "inherit", opacity: 0.78, mt: -0.4, width: 34, height: 34 }}>
          {closeIcon || <Close fontSize="small" />}
        </IconButton>
      )}
    </Box>
  );
}

function DismissibleExample() {
  const [visible, setVisible] = useState(true);
  return (
    <Box>
      {visible && (
        <VuseAlert border="left" color="deep-purple accent-4" dark dismissible onClose={() => setVisible(false)}>
          Aenean imperdiet. Quisque id odio. Cras dapibus. Pellentesque ut neque. Cras dapibus.
          <br />
          <br />
          Vivamus consectetuer hendrerit lacus. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur blandit mollis lacus. Curabitur ligula sapien,
          tincidunt non, euismod vitae, posuere imperdiet, leo.
        </VuseAlert>
      )}
      {!visible && (
        <Stack alignItems="center">
          <Button variant="contained" onClick={() => setVisible(true)} sx={vuseButtonSx("deepPurple")}>
            Reset
          </Button>
        </Stack>
      )}
    </Box>
  );
}

function TransitionExample() {
  const [visible, setVisible] = useState(true);
  return (
    <Box>
      <Stack alignItems="center" sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => setVisible((value) => !value)} sx={vuseButtonSx("primary")}>
          Toggle
        </Button>
      </Stack>
      <Box sx={{ transform: visible ? "scale(1)" : "scale(.94)", opacity: visible ? 1 : 0, maxHeight: visible ? 260 : 0, transition: "all 180ms ease", overflow: "hidden" }}>
        <VuseAlert color="pink" dark border="top" icon={<Home />}>
          Phasellus tempus. Fusce ac felis sit amet ligula pharetra condimentum. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Pellentesque posuere. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo.
          <br />
          <br />
          Phasellus nec sem in justo pellentesque facilisis. Phasellus magna. Cras risus ipsum, faucibus ut, ullamcorper id, varius ac, leo. In hac habitasse platea dictumst. Praesent turpis.
        </VuseAlert>
      </Box>
    </Box>
  );
}

function TwitterExample() {
  const [visible, setVisible] = useState(true);
  return (
    <Box>
      {visible && (
        <VuseAlert border="left" color="cyan" coloredBorder elevation={2} icon={<Twitter />} dismissible closeIcon={<Delete fontSize="small" />} onClose={() => setVisible(false)}>
          You've got <strong>5</strong> new updates on your timeline!.
        </VuseAlert>
      )}
      {!visible && (
        <Stack alignItems="center">
          <Button variant="contained" onClick={() => setVisible(true)} sx={vuseButtonSx("dark")}>
            Reset Alert
          </Button>
        </Stack>
      )}
    </Box>
  );
}

const alertExamples = [
  {
    title: "Type",
    description:
      "The v-alert component is used to convey important information to the user. It comes in 4 variations, success, info, warning and error. These have default icons assigned which can be changed and represent different actions.",
    source: "alerts/simple/type",
    render: () => (
      <Stack>
        <VuseAlert type="success">I'm a success alert.</VuseAlert>
        <VuseAlert type="info">I'm an info alert.</VuseAlert>
        <VuseAlert type="warning">I'm a warning alert.</VuseAlert>
        <VuseAlert type="error">I'm an error alert.</VuseAlert>
      </Stack>
    ),
  },
  {
    title: "Border",
    description: "The border prop adds a simple border to one of the 4 sides of the alert. They are four possible values for each of the sides: top, bottom, left, and right.",
    source: "alerts/simple/border",
    render: () => (
      <Stack>
        <VuseAlert border="top" color="red lighten-2" dark>
          I'm an alert with a top border and red color
        </VuseAlert>
        <VuseAlert border="right" color="blue-grey" dark>
          I'm an alert with a right border and blue-grey color
        </VuseAlert>
        <VuseAlert border="bottom" color="pink darken-1" dark>
          I'm an alert with a bottom border and pink color
        </VuseAlert>
        <VuseAlert border="left" color="indigo" dark>
          I'm an alert with a border left type info
        </VuseAlert>
      </Stack>
    ),
  },
  {
    title: "Colored Border",
    description: "The colored-border prop removes the alert background in order to accent the border. If a type is set, it will use the type's default color.",
    source: "alerts/simple/colored-border",
    minHeight: 320,
    render: () => (
      <Stack>
        <VuseAlert border="left" coloredBorder color="deep-purple accent-4" elevation={2}>
          Aliquam eu nunc. Fusce commodo aliquam arcu. In consectetuer turpis ut velit. Nulla facilisi..
          <br />
          <br />
          Morbi mollis tellus ac sapien. Fusce vel dui. Praesent ut ligula non mi varius sagittis. Vivamus consectetuer hendrerit lacus. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
        </VuseAlert>
        <VuseAlert border="top" coloredBorder type="info" elevation={2}>
          Vestibulum ullamcorper mauris at ligula. Nam pretium turpis et arcu. Ut varius tincidunt libero. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Morbi nec metus.
        </VuseAlert>
        <VuseAlert border="bottom" coloredBorder type="warning" elevation={2}>
          Sed in libero ut nibh placerat accumsan. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero.
        </VuseAlert>
        <VuseAlert border="right" coloredBorder type="error" elevation={2}>
          Fusce commodo aliquam arcu. Pellentesque posuere. Phasellus tempus. Donec posuere vulputate arcu.
        </VuseAlert>
      </Stack>
    ),
  },
  {
    title: "Dense",
    description: "The dense prop decreases alert height to create a compact alert while preserving alert color, icon, border, and text variants.",
    source: "alerts/simple/dense",
    render: () => (
      <Stack>
        <VuseAlert dense type="info">
          I'm a dense alert with a <strong>type</strong> of info
        </VuseAlert>
        <VuseAlert dense text type="success">
          I'm a dense alert with the <strong>text</strong> prop and a <strong>type</strong> of success
        </VuseAlert>
        <VuseAlert dense border="left" type="warning">
          I'm a dense alert with the <strong>border</strong> prop and a <strong>type</strong> of warning
        </VuseAlert>
        <VuseAlert dense outlined type="error">
          I'm a dense alert with the <strong>outlined</strong> prop and a <strong>type</strong> of error
        </VuseAlert>
      </Stack>
    ),
  },
  { title: "Dismissible", description: "The dismissible prop adds a close button to the end of the alert component. This close button hides the alert and can be reset with a bound value.", source: "alerts/simple/dismissible", minHeight: 270, render: () => <DismissibleExample /> },
  {
    title: "Icon",
    description: "The icon prop allows a custom icon to be displayed with the alert. Icons can be combined with borders, colors, dense spacing, and prominent layouts.",
    source: "alerts/simple/icon",
    minHeight: 270,
    render: () => (
      <Stack>
        <VuseAlert color="#2A3B4D" dark icon={<Whatshot />} dense>
          Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi. Vivamus quis mi. Quisque ut nisi. Maecenas malesuada.
        </VuseAlert>
        <VuseAlert color="#C51162" dark icon={<School />} border="right">
          Phasellus blandit leo ut odio. Morbi mattis ullamcorper velit. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla.
        </VuseAlert>
        <VuseAlert color="primary" dark icon={<Dashboard />} border="left" prominent>
          Praesent congue erat at massa. Nullam vel sem. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
        </VuseAlert>
      </Stack>
    ),
  },
  {
    title: "Outlined",
    description: "The outlined prop inverts the style of an alert by making the background transparent and applying the color to the border and content.",
    source: "alerts/simple/outlined",
    minHeight: 300,
    render: () => (
      <Stack>
        <VuseAlert outlined color="purple">
          <Typography sx={{ fontSize: 20, fontWeight: 500, mb: 0.5 }}>Lorem Ipsum</Typography>
          Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Duis vel nibh at velit scelerisque suscipit.
        </VuseAlert>
        <VuseAlert outlined type="success" text>
          Praesent venenatis metus at tortor pulvinar varius. Aenean commodo ligula eget dolor. Praesent ac massa at ligula laoreet iaculis.
        </VuseAlert>
        <VuseAlert outlined type="warning" prominent border="left">
          Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Suspendisse non nisl sit amet velit hendrerit rutrum.
        </VuseAlert>
      </Stack>
    ),
  },
  {
    title: "Prominent",
    description: "The prominent prop increases the height of the alert and applies a larger icon treatment, making the message more visually pronounced.",
    source: "alerts/simple/prominent",
    minHeight: 280,
    render: () => (
      <Stack>
        <VuseAlert prominent type="error">
          <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" spacing={2}>
            <Box sx={{ flex: 1 }}>Nunc nonummy metus. Nunc interdum lacus sit amet orci. Nullam dictum felis eu pede mollis pretium. Cras id dui.</Box>
            <Button sx={vuseButtonSx("light")}>Take action</Button>
          </Stack>
        </VuseAlert>
        <VuseAlert color="blue-grey" dark dense icon={<School />} prominent>
          Sed augue ipsum, egestas nec, vestibulum et, malesuada adipiscing, dui. Aenean ut eros et nisl sagittis vestibulum.
        </VuseAlert>
        <VuseAlert icon={<Security />} prominent text type="info">
          Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Sed in libero ut nibh placerat accumsan.
        </VuseAlert>
      </Stack>
    ),
  },
  {
    title: "Text",
    description: "The text prop applies the alert color as a low-emphasis background and text treatment while keeping the content readable.",
    source: "alerts/simple/text",
    minHeight: 360,
    render: () => (
      <Stack>
        <VuseAlert text color="info">
          <Typography sx={{ fontSize: 24, fontWeight: 500, mb: 1 }}>Lorem Ipsum</Typography>
          <Box>Maecenas nec odio et ante tincidunt tempus. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci.</Box>
          <Divider sx={{ my: 2, borderColor: "rgba(3,169,244,.22)" }} />
          <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" spacing={2}>
            <Box sx={{ flex: 1 }}>Proin magna. Vivamus in erat ut urna cursus vestibulum. Etiam imperdiet imperdiet orci.</Box>
            <Button variant="outlined" sx={vuseOutlinedButtonSx("#2196f3")}>
              Okay
            </Button>
          </Stack>
        </VuseAlert>
        <VuseAlert text outlined color="deep-orange" icon={<LocalFireDepartment />}>
          Nullam tincidunt adipiscing enim. In consectetuer turpis ut velit. Maecenas egestas arcu quis ligula mattis placerat.
        </VuseAlert>
        <VuseAlert text dense color="teal" icon={<Warning />} border="left">
          Vestibulum ullamcorper mauris at ligula. Nulla porta dolor. Vestibulum facilisis, purus nec pulvinar iaculis.
        </VuseAlert>
        <VuseAlert text prominent type="error" icon={<ErrorIcon />}>
          Praesent blandit laoreet nibh. Praesent nonummy mi in odio. Phasellus tempus. Mauris turpis nunc.
        </VuseAlert>
      </Stack>
    ),
  },
  { title: "Transition", description: "You can apply a custom transition to alerts when toggling visibility.", source: "alerts/simple/transition", minHeight: 310, render: () => <TransitionExample /> },
  { title: "Twitter", description: "Alerts can combine icons, colored borders, elevation, and dismissible behavior to create richer notification patterns.", source: "alerts/complex/twitter", minHeight: 190, render: () => <TwitterExample /> },
];

function resolveAlertPalette(type?: AlertTone, color?: string) {
  const key = color || type || "info";
  const map: Record<string, { bg: string; accent: string; tint: string; darkSurface?: boolean }> = {
    success: { bg: "#4caf50", accent: "#4caf50", tint: "rgba(76,175,80,.10)", darkSurface: true },
    info: { bg: "#2196f3", accent: "#2196f3", tint: "rgba(33,150,243,.10)", darkSurface: true },
    warning: { bg: "#fb8c00", accent: "#fb8c00", tint: "rgba(251,140,0,.12)", darkSurface: true },
    error: { bg: "#ff5252", accent: "#ff5252", tint: "rgba(255,82,82,.10)", darkSurface: true },
    "red lighten-2": { bg: "#e57373", accent: "#e57373", tint: "rgba(229,115,115,.11)", darkSurface: true },
    "blue-grey": { bg: "#607d8b", accent: "#607d8b", tint: "rgba(96,125,139,.11)", darkSurface: true },
    "pink darken-1": { bg: "#d81b60", accent: "#d81b60", tint: "rgba(216,27,96,.11)", darkSurface: true },
    indigo: { bg: "#3f51b5", accent: "#3f51b5", tint: "rgba(63,81,181,.11)", darkSurface: true },
    "deep-purple accent-4": { bg: "#6200ea", accent: "#6200ea", tint: "rgba(98,0,234,.11)", darkSurface: true },
    cyan: { bg: "#00bcd4", accent: "#00bcd4", tint: "rgba(0,188,212,.12)" },
    pink: { bg: "#e91e63", accent: "#e91e63", tint: "rgba(233,30,99,.11)", darkSurface: true },
    primary: { bg: "#00838f", accent: "#00838f", tint: "rgba(0,131,143,.11)", darkSurface: true },
    purple: { bg: "#9c27b0", accent: "#9c27b0", tint: "rgba(156,39,176,.11)" },
    "deep-orange": { bg: "#ff5722", accent: "#ff5722", tint: "rgba(255,87,34,.11)" },
    teal: { bg: "#009688", accent: "#009688", tint: "rgba(0,150,136,.11)" },
    red: { bg: "#f44336", accent: "#f44336", tint: "rgba(244,67,54,.11)", darkSurface: true },
    orange: { bg: "#fb8c00", accent: "#fb8c00", tint: "rgba(251,140,0,.12)", darkSurface: true },
    yellow: { bg: "#fbc02d", accent: "#fbc02d", tint: "rgba(251,192,45,.14)" },
    green: { bg: "#4caf50", accent: "#4caf50", tint: "rgba(76,175,80,.10)", darkSurface: true },
    blue: { bg: "#2196f3", accent: "#2196f3", tint: "rgba(33,150,243,.10)", darkSurface: true },
    "#2A3B4D": { bg: "#2A3B4D", accent: "#2A3B4D", tint: "rgba(42,59,77,.11)", darkSurface: true },
    "#C51162": { bg: "#C51162", accent: "#C51162", tint: "rgba(197,17,98,.11)", darkSurface: true },
    "blue lighten-2": { bg: "#64b5f6", accent: "#2196f3", tint: "rgba(100,181,246,.13)", darkSurface: true },
  };
  return map[key] || map.info;
}

function typeIcon(type?: AlertTone) {
  if (type === "success") return <CheckCircle />;
  if (type === "warning") return <Warning />;
  if (type === "error") return <ErrorIcon />;
  return <Info />;
}

function iconNode(icon: string) {
  if (icon === "mdi-account") return <AccountCircle />;
  return <Dashboard />;
}

function shadowForElevation(elevation: number) {
  const alpha = Math.min(0.1 + elevation / 160, 0.24);
  const spread = Math.min(2 + elevation / 2, 12);
  return `0 ${spread}px ${spread + 3}px rgba(38,50,56,${alpha})`;
}
