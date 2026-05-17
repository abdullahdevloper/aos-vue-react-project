import { useMemo, useState, type MouseEvent, type ReactNode } from "react";
import {
  mdiArrowLeft,
  mdiDotsVertical,
  mdiFacebook,
  mdiInstagram,
  mdiLinkedin,
  mdiMagnify,
  mdiMenu,
} from "@mdi/js";
import {
  Box,
  Card,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  GlobalStyles,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Code, GitHub, InvertColors, ViewHeadline } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";
import materialIconsFont from "../../../assets/style-ui/icons/MaterialIcons-Regular.woff2";

const primary = "#0097a7";
const teal = "#009688";
const cyan = "#00bcd4";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const shadow2 = "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)";
const shadow4 = "0px 2px 4px -1px rgba(0,0,0,.2), 0px 4px 5px 0px rgba(0,0,0,.14), 0px 1px 10px 0px rgba(0,0,0,.12)";
const shadow6 = "0px 3px 5px -1px rgba(0,0,0,.2), 0px 6px 10px 0px rgba(0,0,0,.14), 0px 1px 18px 0px rgba(0,0,0,.12)";

type ExampleKey = "usage" | "playground" | "simple/inset" | "simple/grid" | "simple/menu" | "intermediate/social";
type Ripple = { id: number; x: number; y: number; size: number };

const playgroundItems = [
  { action: "inbox", title: "inbox" },
  { divider: true },
  { action: "send", title: "send" },
  { divider: true },
  { action: "delete", title: "trash" },
];

const insetItems = [
  { action: "label", title: "List item 1" },
  { divider: true },
  { action: "label", title: "List item 2" },
  { divider: true },
  { action: "label", title: "List item 3" },
];

const menuItems = [
  { action: "move_to_inbox", title: "Inbox" },
  { action: "send", title: "Sent" },
  { action: "delete", title: "Trash" },
  { action: "report", title: "Spam" },
  { divider: true },
  { header: "Labels" },
  { action: "label", title: "Family" },
  { action: "label", title: "Friends" },
  { action: "label", title: "Work" },
];

const socialTypes = ["Places to Be", "Places to See"];
const socialCards = ["Good", "Best", "Finest"];
const socials = [
  { icon: "mdi-facebook", color: "#3f51b5" },
  { icon: "mdi-linkedin", color: "#00acc1" },
  { icon: "mdi-instagram", color: "#ef9a9a" },
];

const mdiPaths: Record<string, string> = {
  "mdi-arrow-left": mdiArrowLeft,
  "mdi-dots-vertical": mdiDotsVertical,
  "mdi-facebook": mdiFacebook,
  "mdi-instagram": mdiInstagram,
  "mdi-linkedin": mdiLinkedin,
  "mdi-magnify": mdiMagnify,
  "mdi-menu": mdiMenu,
};

export default function SubheadersPage() {
  return (
    <>
      <GlobalStyles styles={{ "@font-face": { fontFamily: "Material Icons", fontStyle: "normal", fontWeight: 400, src: `url(${materialIconsFont}) format("woff2")` } }} />
      <DocPage
        title="Subheaders"
        namespace="Components"
        icon={<ViewHeadline />}
        breadcrumbs={[
          { label: "Components", href: "/components/vuetify/api-explorer" },
          { label: "Vuetify", href: "/components/vuetify/api-explorer" },
          { label: "Subheaders" },
        ]}
      >
        <DocText>
          The <CodePill>v-subheader</CodePill> component is used to separate sections of lists.
        </DocText>

        <Box component="section" sx={{ mb: 5 }}>
          <BaseHeading id="usage">Usage</BaseHeading>
          <VuetifyExampleBlock source="usage" description={null}>
            {() => <UsageExample />}
          </VuetifyExampleBlock>
        </Box>

        <Box component="section" sx={{ mb: 5 }}>
          <BaseHeading id="playground">Playground</BaseHeading>
          <VuetifyExampleBlock source="playground" description={null}>
            {() => <PlaygroundExample />}
          </VuetifyExampleBlock>
        </Box>

        <Box component="section" id="examples">
          <BaseHeading id="examples">Examples</BaseHeading>
          <ExampleSection
            title="Inset subheaders"
            source="simple/inset"
            description={
              <>
                Inset subheaders are moved 72px to the right. This gives you the option to line them up with list items and inset dividers.
              </>
            }
          >
            {() => <InsetExample />}
          </ExampleSection>
          <ExampleSection
            title="Grid subheaders"
            source="simple/grid"
            description="A subheader can add context to what a user is looking at."
          >
            {() => <GridExample />}
          </ExampleSection>
          <ExampleSection
            title="Menu subheaders"
            source="simple/menu"
            description="Using a subheader can help separate different types of actions."
          >
            {() => <MenuExample />}
          </ExampleSection>
          <ExampleSection
            title="Subheaders with social media"
            source="intermediate/social"
            description="Using a subheader with social media interaction."
          >
            {() => <SocialExample />}
          </ExampleSection>
        </Box>
      </DocPage>
    </>
  );
}

function UsageExample() {
  return <VSubheader>Subheader</VSubheader>;
}

function PlaygroundExample() {
  const [inset, setInset] = useState(false);
  return (
    <Box sx={{ bgcolor: "#fafafa", p: 4 }}>
      <VRow align="center" justify="center">
        <VCol cols={12} sm={4} md={8}>
          <VCard>
            <VSubheader inset={inset}>Subheader</VSubheader>
            <VList>
              {playgroundItems.map((item, index) => item.divider ? <VDivider key={index} /> : <VListItem key={item.title} icon={item.action!} title={item.title!} />)}
            </VList>
          </VCard>
        </VCol>
      </VRow>
      <VRow align="center" justify="center" sx={{ mt: 6 }}>
        <VCol cols={12} md={8}>
          <FormControlLabel
            control={<Checkbox checked={inset} onChange={(event) => setInset(event.target.checked)} sx={checkboxSx} />}
            label="Inset"
            sx={{ m: 0, color: "rgba(0,0,0,.87)", "& .MuiFormControlLabel-label": { fontSize: 16 } }}
          />
        </VCol>
      </VRow>
    </Box>
  );
}

function InsetExample() {
  return (
    <VRow>
      <VCol cols={12} sm={6} offsetSm={3}>
        <VCard>
          <VSubheader inset>Subheader</VSubheader>
          <VList>
            {insetItems.map((item, index) => item.divider ? <VDivider key={index} inset /> : <VListItem key={item.title} icon={item.action!} title={item.title!} />)}
          </VList>
        </VCard>
      </VCol>
    </VRow>
  );
}

function GridExample() {
  return (
    <VRow>
      <VCol cols={12} sm={6} offsetSm={3}>
        <VCard>
          <VToolbar color="#fff" light flat title="Albums" leading="mdi-arrow-left" trailing="mdi-magnify" />
          <VSubheader>May</VSubheader>
          <ImageGrid gender="men" start={21} />
          <VSubheader>June</VSubheader>
          <ImageGrid gender="women" start={6} />
          <Box sx={{ mt: 6, height: 36, bgcolor: "#f5f5f5" }} />
        </VCard>
      </VCol>
    </VRow>
  );
}

function MenuExample() {
  return (
    <VRow>
      <VCol cols={12} sm={6} offsetSm={3}>
        <VCard>
          <VToolbar color={teal} dark title="Manage" leading="mdi-menu" trailing="mdi-dots-vertical" />
          <VList>
            {menuItems.map((item, index) => {
              if (item.divider) return <VDivider key={index} />;
              if (item.header) return <VSubheader key={item.header}>{item.header}</VSubheader>;
              return <VListItem key={item.title} icon={item.action!} title={item.title!} />;
            })}
          </VList>
        </VCard>
      </VCol>
    </VRow>
  );
}

function SocialExample() {
  const imageIds = useMemo(() => socialTypes.map(() => socialCards.map(() => Math.floor(Math.random() * 11) + 550)), []);
  return (
    <VCard flat tile>
      <VToolbar color={cyan} dark title="Application" leading="mdi-menu" trailing="mdi-magnify" />
      {socialTypes.map((type, typeIndex) => (
        <Box key={type} sx={{ bgcolor: "#f5f5f5", p: 1.5 }}>
          <VSubheader>{type}</VSubheader>
          <VRow>
            <Box sx={{ flexGrow: 1 }} />
            {socialCards.map((card, index) => (
              <VCol key={`${type}-${card}`} cols={12} sm={6} md={4}>
                <VCard>
                  <Box sx={{ position: "relative", height: 300, overflow: "hidden", bgcolor: "#ddd" }}>
                    <Box
                      component="img"
                      src={`https://picsum.photos/200/300?image=${imageIds[typeIndex][index]}`}
                      alt=""
                      sx={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
                    />
                    <Typography sx={{ position: "absolute", top: 16, left: 16, color: "#fff", fontSize: 24, lineHeight: "32px", fontWeight: 400 }} />
                  </Box>
                  <Box sx={{ alignItems: "center", bgcolor: "#fff", display: "flex", justifyContent: "center", p: 1 }}>
                    {socials.map((social) => (
                      <VFABIconButton key={social.icon} icon={social.icon} color={social.color} />
                    ))}
                  </Box>
                </VCard>
              </VCol>
            ))}
          </VRow>
        </Box>
      ))}
    </VCard>
  );
}

function ImageGrid({ gender, start }: { gender: "men" | "women"; start: number }) {
  return (
    <Box sx={{ p: 1.5 }}>
      <VRow>
        {Array.from({ length: 6 }, (_, index) => (
          <VCol key={`${gender}-${index}`} cols={4}>
            <Box
              component="img"
              src={`https://randomuser.me/api/portraits/${gender}/${start + index}.jpg`}
              alt="lorem"
              sx={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
            />
          </VCol>
        ))}
      </VRow>
    </Box>
  );
}

function VSubheader({ children, inset = false }: { children: ReactNode; inset?: boolean }) {
  return (
    <Box
      sx={{
        alignItems: "center",
        color: "rgba(0,0,0,.6)",
        display: "flex",
        fontSize: ".875rem",
        fontWeight: 400,
        height: 48,
        letterSpacing: ".0178571429em",
        lineHeight: "1.25rem",
        ml: inset ? "56px" : 0,
        px: 2,
      }}
    >
      {children}
    </Box>
  );
}

function VList({ children }: { children: ReactNode }) {
  return <Box sx={{ py: 1, bgcolor: "#fff" }}>{children}</Box>;
}

function VListItem({ icon, title }: { icon: string; title: string }) {
  const { ripples, triggerRipple } = useVuetifyRipple();
  return (
    <Box
      onMouseDown={triggerRipple}
      sx={{
        alignItems: "center",
        bgcolor: "#fff",
        color: "rgba(0,0,0,.87)",
        cursor: "pointer",
        display: "flex",
        minHeight: 48,
        overflow: "hidden",
        position: "relative",
        px: 2,
        userSelect: "none",
        "&:hover": { bgcolor: "rgba(0,0,0,.04)" },
      }}
    >
      <Box sx={{ alignItems: "center", color: "rgba(0,0,0,.54)", display: "inline-flex", flex: "0 0 auto", justifyContent: "center", mr: 4, minWidth: 24 }}>
        <MaterialIcon name={icon} />
      </Box>
      <Typography sx={{ fontSize: 16, lineHeight: "1.2rem", fontWeight: 400 }}>{title}</Typography>
      <RippleLayer ripples={ripples} color="rgba(0,0,0,.18)" />
    </Box>
  );
}

function VDivider({ inset = false }: { inset?: boolean }) {
  return <Divider sx={{ borderColor: "rgba(0,0,0,.12)", ml: inset ? "72px" : 0 }} />;
}

function VCard({ children, flat = false, tile = false }: { children: ReactNode; flat?: boolean; tile?: boolean }) {
  return (
    <Card
      sx={{
        bgcolor: "#fff",
        borderRadius: tile ? 0 : 1,
        boxShadow: flat ? "none" : shadow2,
        overflow: "hidden",
      }}
    >
      {children}
    </Card>
  );
}

function VToolbar({ color, title, dark = false, light = false, flat = false, leading, trailing }: { color: string; title: string; dark?: boolean; light?: boolean; flat?: boolean; leading: string; trailing: string }) {
  const textColor = dark ? "#fff" : "rgba(0,0,0,.87)";
  const iconColor = light ? "#616161" : textColor;
  return (
    <Toolbar sx={{ boxShadow: flat ? "none" : shadow4, minHeight: 64, height: 64, bgcolor: color, color: textColor, px: 2 }}>
      <VIconButton icon={leading} color={iconColor} sx={{ ml: -1.5 }} />
      <Typography sx={{ color: light ? "#212121" : textColor, flex: 1, fontSize: 20, fontWeight: 400, lineHeight: "32px", ml: 2.5 }}>{title}</Typography>
      <VIconButton icon={trailing} color={iconColor} sx={{ mr: -1.5 }} />
    </Toolbar>
  );
}

function VIconButton({ icon, color = "rgba(0,0,0,.54)", small = false, sx = {} }: { icon: string; color?: string; small?: boolean; sx?: object }) {
  const size = small ? 40 : 48;
  const iconSize = small ? 20 : 24;
  return (
    <IconButton sx={{ color, height: size, width: size, ...sx }}>
      <VIcon name={icon} size={iconSize} />
    </IconButton>
  );
}

function VFABIconButton({ icon, color }: { icon: string; color: string }) {
  return (
    <IconButton
      sx={{
        bgcolor: color,
        boxShadow: shadow6,
        color: "#fff",
        height: 40,
        mx: 0.5,
        width: 40,
        "&:hover": { bgcolor: color, filter: "brightness(.96)" },
      }}
    >
      <VIcon name={icon} size={24} />
    </IconButton>
  );
}

function VIcon({ name, size = 24 }: { name: string; size?: number }) {
  if (name.startsWith("mdi-")) {
    const path = mdiPaths[name];
    if (!path) return null;
    return (
      <Box component="svg" viewBox="0 0 24 24" sx={{ color: "inherit", display: "block", height: size, width: size }}>
        <Box component="path" d={path} fill="currentColor" />
      </Box>
    );
  }
  return <MaterialIcon name={name} size={size} />;
}

function MaterialIcon({ name, size = 24, color = "currentColor" }: { name: string; size?: number; color?: string }) {
  return (
    <Box
      component="span"
      sx={{
        color,
        direction: "ltr",
        display: "inline-block",
        fontFamily: "Material Icons",
        fontFeatureSettings: "'liga'",
        fontSize: size,
        fontStyle: "normal",
        fontWeight: 400,
        height: size,
        letterSpacing: "normal",
        lineHeight: 1,
        textRendering: "optimizeLegibility",
        textTransform: "none",
        whiteSpace: "nowrap",
        width: size,
        wordWrap: "normal",
      }}
    >
      {name}
    </Box>
  );
}

function VRow({ children, align, justify, sx = {} }: { children: ReactNode; align?: "center"; justify?: "center"; sx?: object }) {
  return (
    <Box
      sx={{
        alignItems: align,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: justify,
        m: -1.5,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function VCol({ children, cols, sm, md, offsetSm = 0 }: { children: ReactNode; cols: number; sm?: number; md?: number; offsetSm?: number }) {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        flexBasis: `${(cols / 12) * 100}%`,
        maxWidth: `${(cols / 12) * 100}%`,
        p: 1.5,
        ...(sm ? { "@media (min-width:600px)": { flexBasis: `${(sm / 12) * 100}%`, maxWidth: `${(sm / 12) * 100}%`, ml: `${(offsetSm / 12) * 100}%` } } : {}),
        ...(md ? { "@media (min-width:960px)": { flexBasis: `${(md / 12) * 100}%`, maxWidth: `${(md / 12) * 100}%`, ml: 0 } } : {}),
      }}
    >
      {children}
    </Box>
  );
}

function VuetifyExampleBlock({ title, description, source, children }: { title?: string; description: ReactNode; source: ExampleKey; children: () => ReactNode }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card sx={{ mb: 5, bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}>
      {title && (
        <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
          <Typography sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>{title}</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip>
          <Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
          <Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        </Toolbar>
      )}
      {!title && (
        <Toolbar variant="dense" sx={{ justifyContent: "flex-end", minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
          <Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip>
          <Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
          <Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        </Toolbar>
      )}
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

function ExampleSection({ title, description, source, children }: { title: string; description: ReactNode; source: ExampleKey; children: () => ReactNode }) {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <VuetifyExampleBlock title={title} source={source} description={description}>
        {children}
      </VuetifyExampleBlock>
    </Box>
  );
}

function BaseHeading({ children, id }: { children: ReactNode; id?: string }) {
  return <Typography id={id} component="h2" sx={{ fontSize: 32, lineHeight: 1.2, fontWeight: 400, mb: 2 }}>{children}</Typography>;
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: 0.55, py: 0.18, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: 0.5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

function useVuetifyRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const triggerRipple = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const id = Date.now() + Math.random();
    setRipples((current) => [...current, { id, x, y, size }]);
    window.setTimeout(() => setRipples((current) => current.filter((ripple) => ripple.id !== id)), 560);
  };
  return { ripples, triggerRipple };
}

function RippleLayer({ ripples, color }: { ripples: Ripple[]; color: string }) {
  return (
    <>
      <GlobalStyles styles={{ "@keyframes vuetify-ripple": { "0%": { opacity: 0.22, transform: "scale(0)" }, "100%": { opacity: 0, transform: "scale(1)" } } }} />
      {ripples.map((ripple) => (
        <Box
          key={ripple.id}
          sx={{
            animation: "vuetify-ripple 560ms cubic-bezier(.4,0,.2,1)",
            bgcolor: color,
            borderRadius: "50%",
            height: ripple.size,
            left: ripple.x,
            pointerEvents: "none",
            position: "absolute",
            top: ripple.y,
            transform: "scale(0)",
            width: ripple.size,
          }}
        />
      ))}
    </>
  );
}

const checkboxSx = {
  color: "rgba(0,0,0,.54)",
  p: 1.125,
  "&.Mui-checked": { color: primary },
  "& .MuiSvgIcon-root": { fontSize: 24 },
};

const sourceTemplates: Record<ExampleKey, string> = {
  usage: `<template>
  <v-subheader>Subheader</v-subheader>
</template>`,
  playground: `<template>
  <div class="grey lighten-5 pa-4">
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" sm="4">
        <v-card>
          <v-subheader :inset="inset">Subheader</v-subheader>
          <v-list>...</v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-12" align="center" justify="center">
      <v-col cols="12" md="8">
        <v-checkbox v-model="inset" hide-details label="Inset" light />
      </v-col>
    </v-row>
  </div>
</template>`,
  "simple/inset": `<template>
  <v-col cols="12" sm="6" offset-sm="3">
    <v-card>
      <v-subheader :inset="inset">Subheader</v-subheader>
      <v-list>...</v-list>
    </v-card>
  </v-col>
</template>`,
  "simple/grid": `<template>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
      <v-card>
        <v-toolbar color="white" flat>...</v-toolbar>
        <v-subheader>May</v-subheader>
        <v-container fluid>...</v-container>
        <v-subheader>June</v-subheader>
        <v-container fluid>...</v-container>
        <v-footer class="mt-12"></v-footer>
      </v-card>
    </v-col>
  </v-row>
</template>`,
  "simple/menu": `<template>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
      <v-card>
        <v-toolbar color="teal" dark>...</v-toolbar>
        <v-list>
          <v-list-item>...</v-list-item>
          <v-divider />
          <v-subheader>Labels</v-subheader>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>`,
  "intermediate/social": `<template>
  <v-card flat tile>
    <v-toolbar color="cyan" dark>...</v-toolbar>
    <v-container v-for="type in types" :key="type" class="grey lighten-4" fluid>
      <v-subheader>{{ type }}</v-subheader>
      <v-row>
        <v-spacer />
        <v-col v-for="card in cards" :key="card" cols="12" sm="6" md="4">
          <v-card>...</v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>`,
};
