import { useState, type ReactNode } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
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
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  AccessAlarm,
  AccountCircle,
  Code,
  Dashboard,
  GitHub,
  Groups,
  InvertColors,
  LocalOffer,
} from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";
import profileAvatar from "../../../assets/ui-components/widgets/lists/m4.jpg";

const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const neuGlow = "-6px -6px 5px rgba(255,255,255,.86), 6px 6px 7px rgba(174,174,192,.28)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };

export default function AvatarsPage() {
  return (
    <DocPage
      title="Avatars"
      namespace="Components"
      icon={<Dashboard />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Avatars" },
      ]}
    >
      <DocText>
        The v-avatar component is used to control the size and border radius of responsive images, icons, and text.
      </DocText>
      <UsageSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  const [image, setImage] = useState(false);
  const [tile, setTile] = useState(false);
  const [color, setColor] = useState("");
  const [size, setSize] = useState(56);
  const [inverted, setInverted] = useState(false);

  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Usage
      </Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>
        Avatars can contain images, icons, or text and can be adjusted with size, color, and tile options.
      </Typography>
      <Card variant="outlined" sx={{ bgcolor: "background.default", borderColor: "rgba(111,125,133,.18)", boxShadow: "none", overflow: "hidden", mb: 6 }}>
        <Grid container>
          <Grid item xs={12} md={9}>
            <Box sx={{ height: 350, overflowY: "auto", bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "#fff" : "inherit", transition: "background-color 180ms ease" }}>
              <Stack sx={{ minHeight: 350, p: { xs: 3.25, md: 4 } }} alignItems="center" justifyContent="center">
                <VuseAvatar size={size} color={color || (image ? undefined : "primary")} tile={tile}>
                  {image ? <Box component="img" src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar" sx={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <Typography sx={{ color: "#fff", fontSize: Math.max(18, size / 3.1), fontWeight: 500 }}>VJ</Typography>}
                </VuseAvatar>
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
              <FormControlLabel control={<Switch checked={image} onChange={(event) => setImage(event.target.checked)} sx={vuseSwitchSx} />} label="image" sx={switchLabelSx} />
              <FormControlLabel control={<Switch checked={tile} onChange={(event) => setTile(event.target.checked)} sx={vuseSwitchSx} />} label="tile" sx={switchLabelSx} />
              <UsageSelect label="Colors" value={color} items={["primary", "accent", "warning lighten-2", "teal", "grey lighten-2"]} onChange={setColor} />
              <Stack spacing={0.75}>
                <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                  Size
                </Typography>
                <Slider min={56} max={128} value={size} onChange={(_, value) => setSize(value as number)} />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
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
      <Typography color="text.secondary" sx={{ ...docsParagraphSx, mb: 5 }}>
        Avatar examples rendered with the Vuse documentation card shell and source-matched Vuetify compositions.
      </Typography>
      <Grid container spacing={5.5}>
        {avatarExamples.map((example) => (
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
              <Button key={section} size="small" onClick={() => setSelectedSection(section)} sx={sourceTabSx(activeSection === section)}>
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
      <Box sx={{ px: { xs: 3, md: 4 }, py: { xs: 3.5, md: 4.25 }, minHeight, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", transition: "background-color 180ms ease, color 180ms ease" }}>
        {children}
      </Box>
    </Card>
  );
}

function VuseAvatar({ size = 48, color, tile = false, children }: { size?: number; color?: string; tile?: boolean; children: ReactNode }) {
  return (
    <Avatar
      variant={tile ? "square" : "circular"}
      sx={{
        width: size,
        height: size,
        bgcolor: resolveAvatarColor(color),
        color: "#fff",
        borderRadius: tile ? 0 : "50%",
        overflow: "hidden",
        "& .MuiSvgIcon-root": { fontSize: Math.max(24, size * 0.58) },
      }}
    >
      {children}
    </Avatar>
  );
}

function SizeExample() {
  return (
    <Stack direction="row" justifyContent="space-around" alignItems="center" sx={{ width: "100%", minHeight: 120, gap: 3, flexWrap: "wrap" }}>
      <VuseAvatar color="indigo" size={36}>
        <Typography sx={{ color: "#fff", fontSize: 20, fontWeight: 500 }}>36</Typography>
      </VuseAvatar>
      <VuseAvatar color="teal" size={48}>
        <Typography sx={{ color: "#fff", fontSize: 20, fontWeight: 500 }}>48</Typography>
      </VuseAvatar>
      <VuseAvatar color="orange" size={62}>
        <Typography sx={{ color: "#fff", fontSize: 20, fontWeight: 500 }}>62</Typography>
      </VuseAvatar>
    </Stack>
  );
}

function TileExample() {
  return (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 120 }}>
      <VuseAvatar color="blue" tile>
        <AccessAlarm />
      </VuseAvatar>
    </Stack>
  );
}

function DefaultExample() {
  return (
    <Stack direction="row" justifyContent="space-around" alignItems="center" sx={{ width: "100%", minHeight: 130, gap: 3, flexWrap: "wrap" }}>
      <VuseAvatar color="indigo">
        <AccountCircle />
      </VuseAvatar>
      <VuseAvatar>
        <Box component="img" src={profileAvatar} alt="John" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </VuseAvatar>
      <VuseAvatar color="red">
        <Typography sx={{ color: "#fff", fontSize: 20, fontWeight: 500 }}>CJ</Typography>
      </VuseAvatar>
    </Stack>
  );
}

function ProfileExample() {
  return (
    <Card sx={{ maxWidth: 434, mx: "auto", borderRadius: 0, overflow: "hidden", boxShadow: "none", bgcolor: "transparent" }}>
      <Box sx={{ height: 280, backgroundImage: "url(https://picsum.photos/630/280?image=618)", backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
        <Box sx={{ position: "absolute", top: 0, left: 0 }}>
          <Avatar variant="square" sx={{ width: 164, height: 164, borderRadius: 0, bgcolor: "#9e9e9e" }}>
            <Box component="img" src={profileAvatar} alt="Marcus Obrien" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Avatar>
        </Box>
        <Stack justifyContent="flex-end" sx={{ height: "100%" }}>
          <Box sx={{ bgcolor: "rgba(0,0,0,.4)", color: "#fff", px: 2, py: 1 }}>
            <Typography sx={{ fontSize: 20, fontWeight: 500 }}>Marcus Obrien</Typography>
            <Typography sx={{ fontSize: 14, color: "rgba(255,255,255,.72)" }}>Network Engineer</Typography>
          </Box>
        </Stack>
      </Box>
    </Card>
  );
}

function AdvancedExample() {
  const [expanded, setExpanded] = useState<number | false>(false);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box sx={{ width: "100%" }}>
      <Stack alignItems="center" sx={{ mb: 1.5 }}>
        <Typography sx={{ color: "text.secondary", fontSize: 16 }}>Today</Typography>
      </Stack>
      <Stack sx={{ maxWidth: 960, mx: "auto" }}>
        {messages.map((message, index) => (
          <Accordion
            key={message.title}
            expanded={expanded === index}
            onChange={(_, isExpanded) => setExpanded(isExpanded ? index : false)}
            disableGutters
            sx={{
              bgcolor: "background.default",
              boxShadow: expanded === index ? neuGlow : "0 1px 0 rgba(111,125,133,.12)",
              borderRadius: 0,
              "&:before": { display: "none" },
              mx: expanded === index ? { xs: 0, sm: -2 } : 0,
              my: expanded === index ? 0.75 : 0,
              transition: "margin 160ms ease, box-shadow 160ms ease",
            }}
          >
            <AccordionSummary sx={{ minHeight: 64, px: { xs: 1.5, sm: 2 }, "& .MuiAccordionSummary-content": { m: 0, alignItems: "center" } }}>
              <Grid container alignItems="center" wrap="nowrap">
                <Grid item xs={4} sm={2} md={1}>
                  <VuseAvatar size={36} color={message.color}>
                    {message.avatar ? <Box component="img" src={message.avatar} alt="Avatar" sx={{ width: "100%", height: "100%", objectFit: "cover" }} /> : message.icon}
                  </VuseAvatar>
                </Grid>
                {smUp && (
                  <Grid item sm={5} md={3}>
                    <Typography component="strong" sx={{ fontSize: 15.5, fontWeight: 700 }}>
                      {message.name}
                    </Typography>
                    {message.total && (
                      <Typography component="span" color="text.secondary" sx={{ fontSize: 15 }}>
                        &nbsp;({message.total})
                      </Typography>
                    )}
                  </Grid>
                )}
                <Grid item xs={5} sm={3}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ whiteSpace: "nowrap" }}>
                    {message.newCount && <Box sx={{ bgcolor: message.chipBg, color: "#263238", px: 1, py: 0.25, borderRadius: 0.5, fontSize: 12, fontWeight: 700 }}>{message.newCount} new</Box>}
                    <Typography component="strong" sx={{ fontSize: 15.5, fontWeight: 700 }}>
                      {message.title}
                    </Typography>
                  </Stack>
                </Grid>
                {mdUp && message.excerpt && (
                  <Grid item xs>
                    <Typography color="text.secondary" noWrap sx={{ fontSize: 15 }}>
                      &mdash; {message.excerpt}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <Divider sx={{ borderColor: "rgba(111,125,133,.16)" }} />
              <Typography color="text.secondary" sx={{ px: 2, py: 2, fontSize: 15, lineHeight: 1.6 }}>
                {lorem}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Box>
  );
}

const avatarExamples = [
  { title: "Size", description: "The size prop allows you to define the height and width of v-avatar.", source: "avatars/simple/size", minHeight: 180, render: () => <SizeExample /> },
  { title: "Tile", description: "The tile prop removes the border radius from an avatar, creating a square surface.", source: "avatars/simple/tile", minHeight: 170, render: () => <TileExample /> },
  { title: "Default", description: "Avatars can contain icons, images, or text while preserving consistent circular sizing.", source: "avatars/intermediate/default", minHeight: 190, render: () => <DefaultExample /> },
  { title: "Profile", description: "Avatars can be composed with cards and image overlays for profile-style layouts.", source: "avatars/intermediate/profile", minHeight: 360, render: () => <ProfileExample /> },
  { title: "Advanced", description: "The advanced example combines avatars with responsive expansion panels and list-row metadata.", source: "avatars/complex/advanced", minHeight: 340, render: () => <AdvancedExample /> },
];

const messages = [
  {
    avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
    name: "John Leider",
    title: "Welcome to Vuetify.js!",
    excerpt: "Thank you for joining our community...",
  },
  {
    color: "red",
    icon: <Groups />,
    name: "Social",
    newCount: 1,
    total: 3,
    title: "Twitter",
    chipBg: "#ffcdd2",
  },
  {
    color: "teal",
    icon: <LocalOffer />,
    name: "Promos",
    newCount: 2,
    total: 4,
    title: "Shop your way",
    chipBg: "#b2dfdb",
  },
];

const lorem =
  "Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.";

function UsageSelect({ label, value, items, onChange }: { label: string; value: string; items: string[]; onChange: (value: string) => void }) {
  return (
    <FormControl fullWidth size="small" variant="outlined" sx={usageSelectSx}>
      <InputLabel shrink={Boolean(value)}>{label}</InputLabel>
      <Select value={value} label={label} onChange={(event) => onChange(event.target.value)} displayEmpty={false} MenuProps={{ PaperProps: { sx: selectMenuSx } }}>
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

const switchLabelSx = { m: 0, minHeight: 42, "& .MuiFormControlLabel-label": { fontSize: 15, color: "text.secondary", textTransform: "capitalize" } };

const usageSelectSx = {
  "& .MuiInputLabel-root": { fontSize: 15, lineHeight: 1, color: "text.secondary", transform: "translate(15px, 15px) scale(1)", "&.Mui-focused": { color: "primary.main" }, "&.MuiInputLabel-shrink": { transform: "translate(12px, -8px) scale(.80)", px: 0.5, bgcolor: "background.default", lineHeight: 1.15 } },
  "& .MuiOutlinedInput-root": { minHeight: 48, borderRadius: 1, bgcolor: "background.default", transition: "background-color 140ms ease, box-shadow 140ms ease, border-color 140ms ease", "& fieldset": { borderColor: "rgba(111,125,133,.28)" }, "&:hover": { bgcolor: "rgba(0,131,143,.025)" }, "&:hover fieldset": { borderColor: "rgba(0,131,143,.44)" }, "&.Mui-focused": { boxShadow: "0 0 0 2px rgba(0,131,143,.10)" }, "&.Mui-focused fieldset": { borderWidth: 1, borderColor: "#00838f" } },
  "& .MuiSelect-select": { minHeight: "0 !important", height: 48, display: "flex", alignItems: "center", py: "0 !important", pl: "15px !important", pr: "40px !important", fontSize: 15, lineHeight: "48px", color: "text.primary" },
  "& .MuiSelect-icon": { right: 12, color: "text.secondary", top: "calc(50% - 12px)" },
};

const selectMenuSx = {
  mt: 0.75,
  bgcolor: "background.default",
  boxShadow: neuGlow,
  borderRadius: 1,
  "& .MuiMenuItem-root": { minHeight: 38, fontSize: 15, "&:hover": { bgcolor: "rgba(0,131,143,.08)" }, "&.Mui-selected": { bgcolor: "rgba(0,131,143,.12)", color: "primary.main" }, "&.Mui-selected:hover": { bgcolor: "rgba(0,131,143,.16)" } },
};

const vuseSwitchSx = {
  width: 48,
  height: 30,
  p: 0.5,
  "& .MuiSwitch-switchBase": { p: 0.75, transitionDuration: "140ms", "&.Mui-checked": { transform: "translateX(18px)", color: "#fff", "& + .MuiSwitch-track": { bgcolor: "#00838f", opacity: 1 }, "&:hover": { bgcolor: "rgba(0,131,143,.08)" } }, "&:hover": { bgcolor: "rgba(0,131,143,.06)" } },
  "& .MuiSwitch-thumb": { width: 18, height: 18, boxShadow: neuGlow },
  "& .MuiSwitch-track": { borderRadius: 999, bgcolor: "rgba(111,125,133,.26)", opacity: 1, boxShadow: "inset 1px 1px 3px rgba(174,174,192,.34)" },
};

function exampleIconSx(active: boolean) {
  return { width: 28, height: 28, color: active ? "primary.main" : "text.secondary", mx: 0.1, bgcolor: "transparent", opacity: active ? 0.72 : 0.48, transition: "color 140ms ease, background-color 140ms ease, opacity 140ms ease, transform 140ms ease", "&:hover": { bgcolor: "rgba(0,131,143,.08)", color: "primary.main", opacity: 0.82 }, "&:active": { transform: "scale(.94)", bgcolor: "rgba(0,131,143,.14)", opacity: 1 }, "&:focus-visible": { outline: "2px solid rgba(0,131,143,.38)", outlineOffset: 2 } };
}

function softIconButtonSx(active: boolean) {
  return { width: 36, height: 36, color: active ? "primary.main" : "text.secondary", bgcolor: "transparent", opacity: active ? 0.86 : 0.72, transition: "color 140ms ease, background-color 140ms ease, transform 140ms ease, opacity 140ms ease", "&:hover": { bgcolor: "rgba(0,131,143,.08)", color: "primary.main", opacity: 1 }, "&:active": { bgcolor: "rgba(0,131,143,.14)", transform: "scale(.94)" }, "&:focus-visible": { outline: "2px solid rgba(0,131,143,.34)", outlineOffset: 2 } };
}

function sourceTabSx(active: boolean) {
  return { minHeight: 32, px: 1.75, borderRadius: 999, color: active ? "#fff" : "rgba(255,255,255,.78)", bgcolor: active ? "rgba(255,255,255,.16)" : "transparent", "&:hover": { bgcolor: active ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.08)" }, "&:active": { bgcolor: "rgba(255,255,255,.22)" }, "&:focus-visible": { outline: "2px solid rgba(29,233,182,.72)", outlineOffset: 2 } };
}

function resolveAvatarColor(color?: string) {
  const map: Record<string, string> = {
    primary: "#00838f",
    accent: "#ffb74d",
    "warning lighten-2": "#ffb74d",
    teal: "#009688",
    "grey lighten-2": "#e0e0e0",
    indigo: "#3f51b5",
    orange: "#ff9800",
    blue: "#2196f3",
    red: "#f44336",
  };
  return color ? map[color] || color : "#9e9e9e";
}

function getSourceSections(source: string): Record<string, string> {
  const sections: Record<string, string> = { template: sourceTemplates[source] || `<template>\n  <v-avatar color=\"primary\">VJ</v-avatar>\n</template>` };
  if (source.includes("advanced")) {
    sections.script = `<script>\n  export default {\n    data: () => ({\n      messages: [...],\n      lorem: 'Lorem ipsum dolor sit amet...',\n    }),\n  }\n</script>`;
  }
  return sections;
}

const sourceTemplates: Record<string, string> = {
  "avatars/simple/size": `<template>\n  <v-row justify=\"space-around\">\n    <v-avatar color=\"indigo\" size=\"36\"><span class=\"white--text text-h5\">36</span></v-avatar>\n    <v-avatar color=\"teal\" size=\"48\"><span class=\"white--text text-h5\">48</span></v-avatar>\n    <v-avatar color=\"orange\" size=\"62\"><span class=\"white--text text-h5\">62</span></v-avatar>\n  </v-row>\n</template>`,
  "avatars/simple/tile": `<template>\n  <div class=\"text-center\">\n    <v-avatar tile color=\"blue\"><v-icon dark>mdi-alarm</v-icon></v-avatar>\n  </div>\n</template>`,
  "avatars/intermediate/default": `<template>\n  <v-row justify=\"space-around\">\n    <v-avatar color=\"indigo\"><v-icon dark>mdi-account-circle</v-icon></v-avatar>\n    <v-avatar><img src=\"/static/doc-images/lists/m4.jpgg\" alt=\"John\" /></v-avatar>\n    <v-avatar color=\"red\"><span class=\"white--text text-h5\">CJ</span></v-avatar>\n  </v-row>\n</template>`,
  "avatars/intermediate/profile": `<template>\n  <v-card class=\"mx-auto\" max-width=\"434\" tile>\n    <v-img height=\"100%\" src=\"https://picsum.photos/630/280?image=618\">\n      <v-row align=\"end\" class=\"fill-height\">\n        <v-col align-self=\"start\" class=\"pa-0\" cols=\"12\">\n          <v-avatar class=\"profile\" color=\"grey\" size=\"164\" tile><v-img src=\"/static/doc-images/lists/m4.jpg\"></v-img></v-avatar>\n        </v-col>\n        <v-col class=\"py-0\"><v-list-item color=\"rgba(0,0,0,.4)\" dark>Marcus Obrien</v-list-item></v-col>\n      </v-row>\n    </v-img>\n  </v-card>\n</template>`,
  "avatars/complex/advanced": `<template>\n  <v-container fluid>\n    <v-row justify=\"center\">\n      <v-subheader>Today</v-subheader>\n      <v-expansion-panels popout>\n        <v-expansion-panel v-for=\"message in messages\" hide-actions>\n          <v-expansion-panel-header>...</v-expansion-panel-header>\n          <v-expansion-panel-content>...</v-expansion-panel-content>\n        </v-expansion-panel>\n      </v-expansion-panels>\n    </v-row>\n  </v-container>\n</template>`,
};
