import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import {
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Code,
  Functions,
  GitHub,
  InvertColors,
} from "@mui/icons-material";
import DocPage from "../../components/vuetify-docs/DocPage";
import DocText from "../../components/vuetify-docs/DocText";

const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 16.5, md: 18 }, lineHeight: 1.7, fontWeight: 300 };
const bodyText = "Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi. Fusce fermentum odio nec arcu. Aenean ut eros et nisl sagittis vestibulum. Nunc interdum lacus sit amet orci. Phasellus nec sem in justo pellentesque facilisis.";

export default function MutatePage() {
  return (
    <DocPage
      title="Mutate"
      namespace="Directives"
      icon={<Functions />}
      breadcrumbs={[
        { label: "Directives", href: "/directives/Intersect" },
        { label: "Mutate" },
      ]}
    >
      <DocText>
        <RichText text="The `v-mutate` directive utilizes the [Mutation Observer API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver). It provides an easy to use interface for detecting when elements are updated." />
      </DocText>
      <UsageSection />
      <ExamplesSection />
      <OptionsSection />
    </DocPage>
  );
}

function UsageSection() {
  return (
    <Box component="section" sx={{ mb: 5.25 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 27, md: 30 }, fontWeight: 500, mb: 1.6 }}>
        Usage
      </Typography>
      <DirectiveExampleBlock
        title=""
        description={'By default the `v-mutate` directive will enable all available options in the [Mutation Observer API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver). This can be modified in one of two ways. You can either pass in object with keys for **handler** and **options** or use the _modifier_ property of the directive, `v-mutate.attr.sub="onMutate"`'}
        source={usageSource}
        minHeight={250}
      >
        <UsageExample />
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
      <DirectiveExampleBlock
        title="Modifiers"
        description="The `v-mutate` directive accepts modifiers for all of the available options in the [Mutation Observer API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver). For brevity, abbreviations are used—**attr** (attributes), **child** (childList), **sub** (subtree) and **char** (characterData)."
        source={onceSource}
        minHeight={560}
      >
        <ModifiersExample />
      </DirectiveExampleBlock>
    </Box>
  );
}

function OptionsSection() {
  const rows = [
    ["modifiers.once", "Will only invoke the provided user callback once, then directive will be unbound."],
    ["modifiers.attr", "Sets the value of [attributes](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit/attributes) to true."],
    ["modifiers.child", "Sets the value of [childList](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit/childList) to true."],
    ["modifiers.char", "Sets the value of [characterData](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit/characterData) to true."],
    ["modifiers.sub", "Sets the value of [subtree](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe#Parameters) to true."],
    ["value", "The function to invoke when the target element is updated."],
  ];

  return (
    <Box component="section" sx={{ mb: 2 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 27, md: 30 }, fontWeight: 500, mb: 1.6 }}>
        Options
      </Typography>
      <Card sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "hidden" }}>
        {rows.map(([name, description], index) => (
          <Box key={name} sx={{ display: { xs: "block", sm: "grid" }, gridTemplateColumns: "220px 1fr", px: { xs: 2.5, md: 3 }, py: 2, borderTop: index === 0 ? 0 : "1px solid rgba(0,0,0,.08)" }}>
            <Typography sx={{ fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 13.5, color: "#e53935", mb: { xs: 0.75, sm: 0 } }}>{name}</Typography>
            <Typography color="text.secondary" sx={{ fontSize: 15.5, lineHeight: 1.65, fontWeight: 300 }}>
              <RichText text={description} />
            </Typography>
          </Box>
        ))}
      </Card>
    </Box>
  );
}

function UsageExample() {
  const [content, setContent] = useState("Hello, world!");
  const [mutations, setMutations] = useState(0);
  const sheetRef = useMutate<HTMLDivElement>(() => setMutations((value) => value + 1));

  return (
    <Box>
      <TextField
        label="Content"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        variant="standard"
        fullWidth
        sx={{
          mb: 2,
          "& .MuiInputLabel-root": { fontSize: 16 },
          "& .MuiInputBase-input": { fontSize: 16 },
        }}
      />
      <Box ref={sheetRef} sx={{ minHeight: 38, display: "flex", alignItems: "center", bgcolor: "#fff", color: "rgba(0,0,0,.87)", px: 0, py: 1 }}>
        {content}
      </Box>
      <Typography sx={{ mt: 1, fontSize: 16 }}>Total mutations: {mutations}</Typography>
    </Box>
  );
}

function ModifiersExample() {
  const [content, setContent] = useState(false);
  const [card1, setCard1] = useState(0);
  const [card2, setCard2] = useState(0);
  const card1Ref = useMutate<HTMLDivElement>(() => setCard1((value) => value + 1));
  const card2Ref = useMutate<HTMLDivElement>(() => setCard2((value) => value + 1), { once: true });
  const count = Number(content) + 2;

  return (
    <Box>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Button variant="contained" onClick={() => setContent((value) => !value)} sx={buttonSx}>
          Change Content
        </Button>
      </Box>
      <Box sx={{ px: { xs: 0, md: 2 }, display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, gap: 3 }}>
        <MutationCard title="Card 1" count={card1} observerRef={card1Ref} paragraphs={count} />
        <MutationCard title="Card 2 (w/ once modifier)" count={card2} observerRef={card2Ref} paragraphs={count} />
      </Box>
    </Box>
  );
}

function MutationCard({ title, count, observerRef, paragraphs }: { title: string; count: number; observerRef: RefObject<HTMLDivElement | null>; paragraphs: number }) {
  return (
    <Card sx={{ bgcolor: "#fff", color: "rgba(0,0,0,.87)", borderRadius: 1, boxShadow: "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)" }}>
      <Typography sx={{ p: "16px 16px 8px", fontSize: 20, fontWeight: 500, lineHeight: 1.6 }}>
        {title}
      </Typography>
      <Typography className="title text-center pb-3" sx={{ textAlign: "center", pb: 1.5, fontSize: 20, lineHeight: 1.5, fontWeight: 400 }}>
        Times Mutated: {count}
      </Typography>
      <Box ref={observerRef} sx={{ px: 2, pb: 2, color: "rgba(0,0,0,.6)", fontSize: 14, lineHeight: 1.5 }}>
        {Array.from({ length: paragraphs }, (_, index) => (
          <Typography key={index} component="p" sx={{ mb: index === paragraphs - 1 ? 0 : 2, fontSize: 14, lineHeight: 1.5 }}>
            {bodyText}
          </Typography>
        ))}
      </Box>
    </Card>
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
            <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', 'SFMono-Regular', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap", color: "#f8f8f2" }}>
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
          "& .MuiCard-root": { bgcolor: "#fff", color: "rgba(0,0,0,.87)" },
        }}
      >
        <Typography color={inverted ? "rgba(255,255,255,.82)" : "text.secondary"} sx={{ fontSize: { xs: 15.5, md: 16 }, lineHeight: 1.68, fontWeight: 300, mb: 2.5, maxWidth: title ? 900 : 980 }}>
          <RichText text={description} />
        </Typography>
        {children}
      </Box>
    </Card>
  );
}

function useMutate<T extends HTMLElement>(handler: (mutationsList: MutationRecord[], observer: MutationObserver) => void, modifiers?: { once?: boolean; attr?: boolean; child?: boolean; sub?: boolean; char?: boolean }) {
  const ref = useRef<T | null>(null);
  const handlerRef = useRef(handler);
  const once = Boolean(modifiers?.once);
  const hasModifiers = Boolean(modifiers?.attr || modifiers?.child || modifiers?.sub || modifiers?.char);
  const options: MutationObserverInit = hasModifiers
    ? {
      attributes: Boolean(modifiers?.attr),
      childList: Boolean(modifiers?.child),
      subtree: Boolean(modifiers?.sub),
      characterData: Boolean(modifiers?.char),
    }
    : {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    };

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = ref.current;
    if (!element || !("MutationObserver" in window)) return;
    const observer = new MutationObserver((mutationsList, activeObserver) => {
      handlerRef.current(mutationsList, activeObserver);
      if (once) activeObserver.disconnect();
    });
    observer.observe(element, options);
    return () => observer.disconnect();
  }, [once, hasModifiers, modifiers?.attr, modifiers?.child, modifiers?.sub, modifiers?.char]);

  return ref;
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|_[^_]+_)/g);
  return (
    <>
      {parts.map((part, index) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          return <Box key={`${part}-${index}`} component="a" href={link[2]} sx={{ color: "#00838f", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>{link[1]}</Box>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return <Box component="code" key={`${part}-${index}`} sx={inlineCodeSx}>{part.slice(1, -1)}</Box>;
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return <Box component="strong" key={`${part}-${index}`} sx={{ fontWeight: 600 }}>{part.slice(2, -2)}</Box>;
        }
        if (part.startsWith("_") && part.endsWith("_")) {
          return <Box component="em" key={`${part}-${index}`}>{part.slice(1, -1)}</Box>;
        }
        return <span key={`${part}-${index}`}>{part}</span>;
      })}
    </>
  );
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

const inlineCodeSx = {
  fontFamily: "'Roboto Mono', 'SFMono-Regular', Consolas, monospace",
  fontSize: "0.84em",
  color: "#e53935",
  bgcolor: "rgba(229,57,53,.09)",
  px: 0.45,
  py: 0.1,
  borderRadius: 0.75,
};

const buttonSx = {
  minHeight: 36,
  px: 2,
  borderRadius: "4px",
  bgcolor: "#00838f",
  color: "#fff",
  boxShadow: "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)",
  textTransform: "uppercase",
  fontSize: 14,
  fontWeight: 500,
  letterSpacing: ".0892857143em",
  "&:hover": { bgcolor: "#00838f", boxShadow: "0px 2px 4px -1px rgba(0,0,0,.2), 0px 4px 5px 0px rgba(0,0,0,.14), 0px 1px 10px 0px rgba(0,0,0,.12)" },
};

const usageSource = `<template>
  <div>
    <v-text-field v-model="content" label="Content"></v-text-field>
    <v-sheet v-mutate="onMutate">
      {{ content }}
    </v-sheet>
    Total mutations: {{ mutations }}
  </div>
</template>

<script>
  export default {
    data: () => ({
      mutations: 0,
      content: 'Hello, world!',
    }),

    methods: {
      onMutate () {
        this.mutations++
      },
    },
  }
</script>`;

const onceSource = `<template>
  <div>
    <div>
      <div class="text-center">
        <v-btn @click="content = !content">Change Content</v-btn>
      </div>

      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-card>
              <v-card-title>Card 1</v-card-title>

              <div class="title text-center pb-3">
                Times Mutated: {{ card1 }}
              </div>

              <v-card-text v-mutate="() => onMutate('card1')">
                <p
                  v-for="n in +content + 2"
                  :key="n"
                  :class="n === +content + 2 && 'mb-0'"
                >
                  Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi. Fusce fermentum odio nec arcu. Aenean ut eros et nisl sagittis vestibulum. Nunc interdum lacus sit amet orci. Phasellus nec sem in justo pellentesque facilisis.
                </p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-card>
              <v-card-title>Card 2 (w/ once modifier)</v-card-title>

              <div class="title text-center pb-3">
                Times Mutated: {{ card2 }}
              </div>

              <v-card-text v-mutate.once="() => onMutate('card2')">
                <p
                  v-for="n in +content + 2"
                  :key="n"
                  :class="n === +content + 2 && 'mb-0'"
                >
                  Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi. Fusce fermentum odio nec arcu. Aenean ut eros et nisl sagittis vestibulum. Nunc interdum lacus sit amet orci. Phasellus nec sem in justo pellentesque facilisis.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      content: false,
      card1: 0,
      card2: 0,
    }),

    methods: {
      onMutate (card) {
        this[card]++
      },
    },
  }
</script>`;
