import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Code,
  FiberManualRecord,
  Functions,
  GitHub,
  InvertColors,
} from "@mui/icons-material";
import DocPage from "../../components/vuetify-docs/DocPage";
import DocText from "../../components/vuetify-docs/DocText";

const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const primary = "#00838f";
const docsParagraphSx = { fontSize: { xs: 16.5, md: 18 }, lineHeight: 1.7, fontWeight: 300 };

export default function ClickOutsidePage() {
  return (
    <DocPage
      title="ClickOutside"
      namespace="Directives"
      icon={<Functions />}
      breadcrumbs={[
        { label: "Directives", href: "/directives/Intersect" },
        { label: "Click Outside" },
      ]}
    >
      <DocText>
        <RichText text="The `v-click-outside` directive calls a function when something outside of the target element is clicked on. This is used internally by components like `v-menu` and `v-dialog`." />
      </DocText>
      <UsageSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  return (
    <Box component="section" sx={{ mb: 5.25 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 27, md: 30 }, fontWeight: 500, mb: 1.6 }}>
        Usage
      </Typography>
      <DirectiveExampleBlock title="" description="The `v-click-outside` directive allows you to provide a handler to be invoked when the user clicks outside of the target element." source={usageSource} minHeight={332}>
        <UsageCard />
      </DirectiveExampleBlock>
    </Box>
  );
}

function ExamplesSection() {
  return (
    <Box component="section" sx={{ pt: 0.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 27, md: 30 }, fontWeight: 500, mb: 1.25 }}>
        Examples
      </Typography>
      <Typography color="text.secondary" sx={{ ...docsParagraphSx, mb: 4.2, maxWidth: 980 }}>
        Below is a collection of simple to complex examples.
      </Typography>
      <DirectiveExampleBlock title="Conditional handler" description="Optionally provide a `closeOnOutsideClick` handler that returns `true` or `false`. This function determines whether the outside click function is invoked or not." source={conditionalSource} minHeight={170}>
        <ConditionalHandlerExample />
      </DirectiveExampleBlock>
    </Box>
  );
}

function UsageCard() {
  const [active, setActive] = useState(false);
  const ref = useOutsideClick<HTMLDivElement>(() => setActive(false));

  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Card
        ref={ref}
        onClick={() => setActive(true)}
        sx={{
          width: 256,
          height: 256,
          borderRadius: 6,
          display: "grid",
          placeItems: "center",
          cursor: "pointer",
          bgcolor: active ? primary : "background.paper",
          color: active ? "#fff" : "text.primary",
          boxShadow: active ? "0 10px 24px rgba(0,131,143,.22)" : "0 2px 7px rgba(38,50,56,.12)",
          transition: "background-color 160ms ease, color 160ms ease, box-shadow 160ms ease",
          "&:hover": { boxShadow: active ? "0 12px 28px rgba(0,131,143,.26)" : "0 4px 12px rgba(38,50,56,.14)" },
        }}
      >
        <Typography sx={{ fontSize: { xs: 20, md: 34 }, fontWeight: 400, lineHeight: 1.2 }}>
          {active ? "Click Outside" : "Click Me"}
        </Typography>
      </Card>
    </Box>
  );
}

function ConditionalHandlerExample() {
  const [models, setModels] = useState({ base: false, conditional: false });
  const baseRef = useOutsideClick<HTMLLIElement>(() => setModels((current) => ({ ...current, base: false })));
  const conditionalRef = useOutsideClick<HTMLLIElement>(
    () => {
      setModels((current) => ({ ...current, conditional: false }));
    },
    { closeConditional: () => models.conditional },
  );

  return (
    <Box sx={{ bgcolor: "#fff", borderRadius: 1, boxShadow: "0 1px 4px rgba(38,50,56,.08)", overflow: "hidden" }}>
      <List disablePadding sx={{ width: "100%", bgcolor: "transparent", py: 0 }}>
      <ListItem
        ref={baseRef}
        onClick={() => setModels((current) => ({ ...current, base: true }))}
        sx={conditionalRowSx}
        secondaryAction={<FiberManualRecord sx={{ color: models.base ? "#4caf50" : "#f44336", fontSize: 19 }} />}
      >
        <ListItemText primary="Default Click Outside" primaryTypographyProps={{ sx: { fontSize: 16, lineHeight: 1.5 } }} />
      </ListItem>
      <ListItem
        ref={conditionalRef}
        onClick={() => setModels((current) => ({ ...current, conditional: true }))}
        sx={conditionalRowSx}
        secondaryAction={<FiberManualRecord sx={{ color: models.conditional ? "#4caf50" : "#f44336", fontSize: 19 }} />}
      >
        <ListItemText primary="Default w/ Close Conditional" primaryTypographyProps={{ sx: { fontSize: 16, lineHeight: 1.5 } }} />
      </ListItem>
      </List>
    </Box>
  );
}

function DirectiveExampleBlock({
  title,
  description,
  source,
  children,
  minHeight,
}: {
  title: string;
  description: string;
  source: string;
  children: ReactNode;
  minHeight: number;
}) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("template");
  const sourceSections = getSourceSections(source);
  const sectionNames = Object.keys(sourceSections);
  const activeSection = sourceSections[selectedSection] ? selectedSection : sectionNames[0];

  return (
    <Card sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "hidden", mb: 5.25 }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, alignItems: "center", py: 0.5, px: { xs: 2.25, md: 3 }, bgcolor: "transparent" }}>
        <Box sx={{ minWidth: 0, pr: 2 }}>
          {title ? (
            <Typography sx={{ fontSize: { xs: 19, md: 21 }, fontWeight: 500, lineHeight: 1.35 }}>
              {title}
            </Typography>
          ) : null}
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
                }}
              >
                {section}
              </Button>
            ))}
          </Stack>
          <Divider sx={{ borderColor: "rgba(255,255,255,.14)" }} />
          <Box sx={{ maxHeight: { xs: "none", sm: "calc(100vh - 275px)" }, overflowY: "auto", p: 2 }}>
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
          px: { xs: 2.5, md: 3 },
          py: { xs: 2.4, md: 2.7 },
          minHeight,
          bgcolor: inverted ? "#303030" : "transparent",
          color: inverted ? "rgba(255,255,255,.92)" : "inherit",
          transition: "background-color 180ms ease, color 180ms ease",
          "& .MuiListItem-root": { color: inverted ? "rgba(255,255,255,.9)" : undefined },
          "& .MuiCard-root": { bgcolor: inverted ? "rgba(255,255,255,.10)" : undefined, color: inverted ? "rgba(255,255,255,.92)" : undefined },
        }}
      >
        <Typography color={inverted ? "rgba(255,255,255,.82)" : "text.secondary"} sx={{ fontSize: { xs: 15.5, md: 16 }, lineHeight: 1.68, fontWeight: 300, mb: 2.5, maxWidth: title ? 820 : 940 }}>
          <RichText text={description} />
        </Typography>
        {children}
      </Box>
    </Card>
  );
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, index) => (
        part.startsWith("`") && part.endsWith("`") ? (
          <Box component="code" key={`${part}-${index}`} sx={inlineCodeSx}>
            {part.slice(1, -1)}
          </Box>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        )
      ))}
    </>
  );
}

function useOutsideClick<T extends HTMLElement>(handler: () => void, options?: { closeConditional?: () => boolean }) {
  const ref = useRef<T | null>(null);
  const handlerRef = useRef(handler);
  const closeConditionalRef = useRef(options?.closeConditional);

  useEffect(() => {
    handlerRef.current = handler;
    closeConditionalRef.current = options?.closeConditional;
  }, [handler, options?.closeConditional]);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const element = ref.current;
      if (!element || element.contains(event.target as Node)) return;
      if (closeConditionalRef.current && !closeConditionalRef.current()) return;
      handlerRef.current();
    };
    document.addEventListener("click", listener);
    document.addEventListener("touchend", listener);
    return () => {
      document.removeEventListener("click", listener);
      document.removeEventListener("touchend", listener);
    };
  }, []);

  return ref;
}

function getSourceSections(source: string) {
  const template = source.match(/<template>[\s\S]*?<\/template>/)?.[0] ?? "";
  const script = source.match(/<script>[\s\S]*?<\/script>/)?.[0] ?? "";
  return Object.fromEntries(
    [
      ["template", template],
      ["script", script],
    ].filter(([, value]) => value),
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
    "&:hover": { bgcolor: "rgba(0,131,143,.08)", color: "primary.main", opacity: 0.82 },
    "&:active": { transform: "scale(.94)", bgcolor: "rgba(0,131,143,.14)", opacity: 1 },
  };
}

const conditionalRowSx = {
  minHeight: 56,
  px: 2,
  py: 0,
  borderRadius: 0,
  cursor: "pointer",
  "&:hover": { bgcolor: "rgba(0,131,143,.06)" },
  "& .MuiListItemSecondaryAction-root": { right: 20 },
};

const inlineCodeSx = {
  fontFamily: "'Roboto Mono', 'SFMono-Regular', Consolas, monospace",
  fontSize: "0.84em",
  color: "#e53935",
  bgcolor: "rgba(229,57,53,.09)",
  px: 0.45,
  py: 0.1,
  borderRadius: 0.75,
};

const usageSource = `<template>
  <v-card
    v-click-outside="onClickOutside"
    :color="active ? 'primary' : undefined"
    :dark="active"
    class="mx-auto"
    height="256"
    rounded="xl"
    width="256"
    @click="active = true"
  >
    <div class="text-h6 text-md-h4 fill-height d-flex align-center justify-center">
      {{ active ? 'Click Outside' : 'Click Me' }}
    </div>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      active: false,
    }),

    methods: {
      onClickOutside () {
        this.active = false
      },
    },
  }
</script>`;

const conditionalSource = `<template>
  <v-list>
    <v-list-item
      v-click-outside="onClickOutsideStandard"
      @click="models.base = true"
    >
      <v-list-item-title>Default Click Outside</v-list-item-title>

      <v-list-item-action>
        <v-icon :color="models.base ? 'green' : 'red'">mdi-record</v-icon>
      </v-list-item-action>
    </v-list-item>

    <v-list-item
      v-click-outside="{
        handler: onClickOutsideWithConditional,
        closeConditional,
      }"
      @click="models.conditional = true"
    >
      <v-list-item-title>Default w/ Close Conditional</v-list-item-title>

      <v-list-item-action>
        <v-icon :color="models.conditional ? 'green' : 'red'"
          >mdi-record</v-icon
        >
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    models: {
      base: false,
      conditional: false,
    },
  }),

  methods: {
    onClickOutsideStandard() {
      this.models.base = false;
    },
    onClickOutsideWithConditional() {
      this.models.conditional = false;
    },
    closeConditional() {
      return this.models.conditional;
    },
  },
};
</script>`;
