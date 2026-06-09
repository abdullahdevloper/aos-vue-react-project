import { useState, type ReactNode } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  Drawer,
  FormControlLabel,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Code,
  Dashboard,
  FastForward,
  FastRewind,
  GitHub,
  InvertColors,
  Pause,
} from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };

interface BottomSheetExample {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  minHeight: number;
  render: (inverted: boolean) => ReactNode;
}

export default function BottomSheetsPage() {
  return (
    <DocPage
      title="BottomSheets"
      namespace="Components"
      icon={<Dashboard />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Bottom Sheets" },
      ]}
    >
      <DocText>
        The bottom sheet is a modified <CodePill>v-dialog</CodePill> that slides from the bottom of the screen, similar to a <CodePill>v-bottom-navigation</CodePill>. Whereas a bottom navigation component is for buttons and specific application level actions, a bottom sheet can contain anything.
      </DocText>
      <UsageSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  const [open, setOpen] = useState(false);
  const [inset, setInset] = useState(false);
  const [hideOverlay, setHideOverlay] = useState(false);
  const [persistent, setPersistent] = useState(false);
  const [inverted, setInverted] = useState(false);

  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Usage
      </Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>
        Here we display an example list of actions that could be present in an application.
      </Typography>
      <Card variant="outlined" sx={{ bgcolor: "background.default", borderColor: "rgba(111,125,133,.18)", boxShadow: "none", overflow: "hidden", mb: 6 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 3fr) minmax(250px, 1fr)" } }}>
          <Box sx={{ minHeight: 300, p: { xs: 3, md: 4 }, bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "#fff" : "inherit", transition: "background-color 180ms ease, color 180ms ease" }}>
            <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 220 }}>
              <VuseButton color="purple" onClick={() => setOpen(true)}>Open Playground</VuseButton>
            </Stack>
            <VBottomSheet open={open} onClose={() => setOpen(false)} inset={inset} hideOverlay={hideOverlay} persistent={persistent}>
              <SheetPanel height={200}>
                <VuseButton variant="depressed" color="error" onClick={() => setOpen(false)} sx={{ mt: 3, mb: 2 }}>
                  close
                </VuseButton>
                <Typography sx={{ fontSize: 20, fontWeight: 500, mb: 0.8 }}>Active Playground Props</Typography>
                {open && <Typography>v-model</Typography>}
                {inset && <Typography>inset</Typography>}
                {hideOverlay && <Typography>hide-overlay</Typography>}
                {persistent && <Typography>persistent</Typography>}
              </SheetPanel>
            </VBottomSheet>
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
              <FormControlLabel control={<Switch checked={inset} onChange={(event) => setInset(event.target.checked)} sx={vuseSwitchSx} />} label="inset" sx={switchLabelSx} />
              <FormControlLabel control={<Switch checked={hideOverlay} onChange={(event) => setHideOverlay(event.target.checked)} sx={vuseSwitchSx} />} label="hide-overlay" sx={switchLabelSx} />
              <FormControlLabel control={<Switch checked={persistent} onChange={(event) => setPersistent(event.target.checked)} sx={vuseSwitchSx} />} label="persistent" sx={switchLabelSx} />
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
        {bottomSheetExamples.map((example) => (
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
  minHeight = 220,
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

function PersistentExample() {
  const [open, setOpen] = useState(false);
  return (
    <ExampleCenter>
      <VuseButton color="green" onClick={() => setOpen(true)}>Open Persistent</VuseButton>
      <VBottomSheet open={open} onClose={() => setOpen(false)} persistent>
        <SheetPanel height={200}>
          <VuseButton variant="text" color="error" onClick={() => setOpen(false)} sx={{ mt: 3, mb: 2 }}>
            close
          </VuseButton>
          <Typography sx={{ py: 1.5 }}>This is a bottom sheet using the persistent prop</Typography>
        </SheetPanel>
      </VBottomSheet>
    </ExampleCenter>
  );
}

function ModelExample() {
  const [open, setOpen] = useState(false);
  return (
    <ExampleCenter>
      <VuseButton color="blue" onClick={() => setOpen((value) => !value)}>Open v-model</VuseButton>
      <VBottomSheet open={open} onClose={() => setOpen(false)}>
        <SheetPanel height={200}>
          <VuseButton variant="text" color="red" onClick={() => setOpen(false)} sx={{ mt: 3, mb: 2 }}>
            close
          </VuseButton>
          <Typography sx={{ py: 1.5 }}>This is a bottom sheet using the controlled by v-model instead of activator</Typography>
        </SheetPanel>
      </VBottomSheet>
    </ExampleCenter>
  );
}

function InsetExample() {
  const [open, setOpen] = useState(false);
  return (
    <ExampleCenter>
      <VuseButton color="orange" onClick={() => setOpen(true)}>Open Inset</VuseButton>
      <VBottomSheet open={open} onClose={() => setOpen(false)} inset>
        <SheetPanel height={200}>
          <VuseButton variant="text" color="error" onClick={() => setOpen(false)} sx={{ mt: 3, mb: 2 }}>
            close
          </VuseButton>
          <Typography sx={{ my: 1.5 }}>This is a bottom sheet using the inset prop</Typography>
        </SheetPanel>
      </VBottomSheet>
    </ExampleCenter>
  );
}

function PlayerExample() {
  const [open, setOpen] = useState(false);
  return (
    <ExampleCenter>
      <VuseButton color="red" onClick={() => setOpen(true)}>Open Player</VuseButton>
      <VBottomSheet open={open} onClose={() => setOpen(false)} inset>
        <Card square sx={{ boxShadow: "none", borderRadius: 0 }}>
          <LinearProgress variant="determinate" value={50} sx={{ height: 3, bgcolor: "rgba(0,0,0,.12)", "& .MuiLinearProgress-bar": { bgcolor: "#0097a7" } }} />
          <List disablePadding>
            <ListItem sx={{ minHeight: 72, px: { xs: 2, md: 3 } }}>
              <ListItemText
                primary="The Walker"
                secondary="Fitz & The Trantrums"
                primaryTypographyProps={{ fontSize: 16, fontWeight: 400 }}
                secondaryTypographyProps={{ fontSize: 14 }}
              />
              <Box sx={{ flexGrow: 1 }} />
              <IconButton sx={playerIconSx}><FastRewind /></IconButton>
              <IconButton sx={{ ...playerIconSx, mx: { md: 5 } }}><Pause /></IconButton>
              <IconButton sx={{ ...playerIconSx, ml: 0, mr: { md: 3 } }}><FastForward /></IconButton>
            </ListItem>
          </List>
        </Card>
      </VBottomSheet>
    </ExampleCenter>
  );
}

function OpenInListExample() {
  const [open, setOpen] = useState(false);
  return (
    <ExampleCenter>
      <VuseButton color="purple" onClick={() => setOpen(true)}>Open In</VuseButton>
      <VBottomSheet open={open} onClose={() => setOpen(false)}>
        <List sx={{ bgcolor: "#fff", py: 1 }}>
          <Typography sx={{ height: 48, display: "flex", alignItems: "center", px: 2, color: "rgba(0,0,0,.54)", fontSize: 14, fontWeight: 500 }}>
            Open in
          </Typography>
          {openInTiles.map((tile) => (
            <ListItemButton key={tile.title} onClick={() => setOpen(false)} sx={{ minHeight: 56, px: 2 }}>
              <ListItemAvatar sx={{ minWidth: 56 }}>
                <Avatar variant="square" src={`https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`} alt={tile.title} sx={{ width: 32, height: 32 }} />
              </ListItemAvatar>
              <ListItemText primary={tile.title} primaryTypographyProps={{ fontSize: 16, fontWeight: 400 }} />
            </ListItemButton>
          ))}
        </List>
      </VBottomSheet>
    </ExampleCenter>
  );
}

function VBottomSheet({
  open,
  onClose,
  children,
  inset = false,
  persistent = false,
  hideOverlay = false,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  inset?: boolean;
  persistent?: boolean;
  hideOverlay?: boolean;
}) {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={(_, reason) => {
        if (persistent && (reason === "backdropClick" || reason === "escapeKeyDown")) return;
        onClose();
      }}
      ModalProps={{ keepMounted: true }}
      slotProps={{
        backdrop: {
          invisible: hideOverlay,
          sx: { bgcolor: hideOverlay ? "transparent" : "rgba(0,0,0,.46)" },
        },
      }}
      PaperProps={{
        sx: {
          width: inset ? { xs: "100%", md: "70%" } : "100%",
          mx: "auto",
          left: inset ? { md: "15%" } : 0,
          right: inset ? { md: "15%" } : 0,
          borderRadius: 0,
          boxShadow: "0 -8px 24px rgba(0,0,0,.24)",
          bgcolor: "#fff",
        },
      }}
    >
      {children}
    </Drawer>
  );
}

function SheetPanel({ children, height }: { children: ReactNode; height: number }) {
  return (
    <Box sx={{ height, textAlign: "center", bgcolor: "#fff", color: "rgba(0,0,0,.87)" }}>
      {children}
    </Box>
  );
}

function ExampleCenter({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ textAlign: "center", minHeight: 96, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {children}
    </Box>
  );
}

function VuseButton({
  children,
  color,
  onClick,
  variant = "raised",
  sx,
}: {
  children: ReactNode;
  color: "purple" | "green" | "blue" | "orange" | "red" | "error";
  onClick: () => void;
  variant?: "raised" | "text" | "depressed";
  sx?: object;
}) {
  const palette = {
    purple: "#9c27b0",
    green: "#4caf50",
    blue: "#2196f3",
    orange: "#ff9800",
    red: "#f44336",
    error: "#ff5252",
  };
  const text = variant === "text";
  return (
    <Button
      onClick={onClick}
      sx={{
        minHeight: 36,
        px: 2,
        borderRadius: 1,
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: 0.4,
        textTransform: "uppercase",
        color: text ? palette[color] : "#fff",
        bgcolor: text ? "transparent" : palette[color],
        boxShadow: text || variant === "depressed" ? "none" : "0 3px 5px rgba(0,0,0,.2)",
        "&:hover": { bgcolor: text ? "rgba(244,67,54,.06)" : palette[color], boxShadow: text || variant === "depressed" ? "none" : "0 4px 8px rgba(0,0,0,.26)" },
        ...sx,
      }}
    >
      {children}
    </Button>
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

const playerIconSx = { color: "rgba(0,0,0,.54)", width: 40, height: 40 };

const openInTiles = [
  { img: "keep.png", title: "Keep" },
  { img: "inbox.png", title: "Inbox" },
  { img: "hangouts.png", title: "Hangouts" },
  { img: "messenger.png", title: "Messenger" },
  { img: "google.png", title: "Google+" },
];

const bottomSheetExamples: BottomSheetExample[] = [
  {
    title: "Persistent",
    description: "Persistent bottom sheets can't be closed by clicking outside them.",
    source: "persistent",
    minHeight: 190,
    render: () => <PersistentExample />,
  },
  {
    title: "`v-model` control",
    description: <>Bottom sheets can be controlled using <CodePill>v-model</CodePill>. You can use it to close them or if you can&apos;t use <CodePill>activator</CodePill> slot.</>,
    source: "model",
    minHeight: 190,
    render: () => <ModelExample />,
  },
  {
    title: "Inset",
    description: <>Bottom sheets can be inset, reducing their maximum width on desktop to 70%. This can be further reduced manually using the <CodePill>width</CodePill> prop.</>,
    source: "inset",
    minHeight: 190,
    render: () => <InsetExample />,
  },
  {
    title: "Music Player",
    description: " Using a inset bottom sheet, you can make practical components such as this simple music player.",
    source: "player",
    minHeight: 190,
    render: () => <PlayerExample />,
  },
  {
    title: "Open In List",
    description: "By combining a functional list into a bottom sheet, you can create a simple 'open in' component.",
    source: "open-in-list",
    minHeight: 190,
    render: () => <OpenInListExample />,
  },
];

const sourceTemplates = {
  persistent: `<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet" persistent>
      <template v-slot:activator="{ on }">
        <v-btn color="green" dark v-on="on">
          Open Persistent
        </v-btn>
      </template>
      <v-sheet class="text-center" height="200px">
        <v-btn class="mt-6" text color="error" @click="sheet = !sheet"
          >close</v-btn
        >
        <div class="py-3">This is a bottom sheet using the persistent prop</div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>`,
  model: `<template>
  <div class="text-center">
    <v-btn
      color="blue"
      dark
      @click="sheet = !sheet"
    >
      Open v-model
    </v-btn>
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center" height="200px">
        <v-btn
          class="mt-6"
          text
          color="red"
          @click="sheet = !sheet"
        >close</v-btn>
        <div class="py-3">This is a bottom sheet using the controlled by v-model instead of activator</div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>`,
  inset: `<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet" inset>
      <template v-slot:activator="{ on }">
        <v-btn
          color="orange"
          dark
          v-on="on"
        >
          Open Inset
        </v-btn>
      </template>
      <v-sheet class="text-center" height="200px">
        <v-btn
          class="mt-6"
          text
          color="error"
          @click="sheet = !sheet"
        >close</v-btn>
        <div class="my-3">This is a bottom sheet using the inset prop</div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>`,
  player: `<template>
  <div class="text-center">
    <v-bottom-sheet inset>
      <template v-slot:activator="{ on }">
        <v-btn
          color="red"
          dark
          v-on="on"
        >
          Open Player
        </v-btn>
      </template>
      <v-card tile>
        <v-progress-linear
          :value="50"
          class="my-0"
          height="3"
        ></v-progress-linear>

        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>The Walker</v-list-item-title>
              <v-list-item-subtitle>Fitz & The Trantrums</v-list-item-subtitle>
            </v-list-item-content>

            <v-spacer></v-spacer>

            <v-list-item-icon>
              <v-btn icon>
                <v-icon>mdi-rewind</v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-icon :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
              <v-btn icon>
                <v-icon>mdi-pause</v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-icon
              class="ml-0"
              :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }"
            >
              <v-btn icon>
                <v-icon>mdi-fast-forward</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>`,
  "open-in-list": `<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet">
      <template v-slot:activator="{ on }">
        <v-btn
          color="purple"
          dark
          v-on="on"
        >
          Open In
        </v-btn>
      </template>
      <v-list>
        <v-subheader>Open in</v-subheader>
        <v-list-item
          v-for="tile in tiles"
          :key="tile.title"
          @click="sheet = false"
        >
          <v-list-item-avatar>
            <v-avatar size="32px" tile>
              <img
                :src="\`https://cdn.vuetifyjs.com/images/bottom-sheets/\${tile.img}\`"
                :alt="tile.title"
              >
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-title>{{ tile.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
  </div>
</template>`,
};
