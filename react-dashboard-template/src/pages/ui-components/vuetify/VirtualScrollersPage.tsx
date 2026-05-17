import { useMemo, useRef, useState, type ReactNode } from "react";
import { Box, Button, Card, Collapse, Divider, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { Code as CodeIcon, GitHub, InvertColors, Label } from "@mui/icons-material";
import { mdiOpenInNew, mdiPlus } from "@mdi/js";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097A7";
const textPrimary = "rgba(0,0,0,.87)";
const textSecondary = "rgba(0,0,0,.6)";
const appBackground = "#F2F3F7";
const cardSurface = "#FFFFFF";
const divider = "rgba(0,0,0,.12)";
const orangeDarken4 = "#E65100";
const neuInset = "inset -7px -7px 5px #FFFFFF, inset 7px 7px 7px #DDE4EF";

type ExampleKey = "usage" | "user-directory" | "benching";

type DirectoryItem = {
  color: string;
  fullName: string;
  initials: string;
};

export default function VirtualScrollersPage() {
  return (
    <DocPage
      title="VirtualScrollers"
      namespace="Components"
      icon={<Label />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "VirtualScrollers" },
      ]}
    >
      <DocText>
        The <CodePill>v-virtual-scroll</CodePill> component displays a virtual, <Em>infinite</Em> list. It supports dynamic height and scrolling vertically.
      </DocText>

      <Box component="section" sx={{ mb: 5 }}>
        <BaseHeading id="usage">Usage</BaseHeading>
        <DocText>
          The virtual scroller displays just enough records to fill the viewport and uses the existing component, rehydrating it with new data.
        </DocText>
        <AlertText>
          We are in the <Em>process</Em> of integrating the <CodePill>v-virtual-scroller</CodePill> component into existing features and components. If you are interested in helping, please reach out to <Strong>John Leider</Strong> in the <LinkText>Discord Community</LinkText>.
        </AlertText>
        <UsageExample />
      </Box>

      <Box component="section" id="examples">
        <BaseHeading id="examples">Examples</BaseHeading>
        <ExampleBlock title="User directory" source="user-directory" description={<>The <CodePill>v-virtual-scroll</CodePill> component can render an <Strong>unlimited</Strong> amount of items by rendering <Strong>only</Strong> what it needs to fill the scroller's viewport.</>}>
          <UserDirectoryExample />
        </ExampleBlock>
        <ExampleBlock title="Pre-rendering items" source="benching" description={<>By default the <CodePill>v-virtual-scroller</CodePill> does not pre-render additional items outside of the viewport. Increasing this value causes the scroller to render additional items as <Strong>padding</Strong>. It is <Strong>recommended</Strong> to keep this number as low as possible for the best possible <CodePill>performance</CodePill>.</>}>
          <BenchingExample />
        </ExampleBlock>
      </Box>
    </DocPage>
  );
}

function UsageExample() {
  const [count, setCount] = useState(7000);
  const [height, setHeight] = useState(200);
  const items = useMemo(() => Array.from({ length: count }, (_, index) => index + 1), [count]);

  return (
    <ExampleBlock source="usage">
      <Box sx={{ display: "flex", flexWrap: "wrap", mx: -1.5 }}>
        <Box sx={{ boxSizing: "border-box", flex: "1 1 0", minWidth: 0, px: 1.5 }}>
          <Box sx={{ py: 3, flexGrow: 1 }}>
            <Typography sx={{ color: textPrimary, fontSize: 16, fontWeight: 700, lineHeight: 1.5, mb: 2, textAlign: "center" }}>
              {items.length} Total Items
            </Typography>
            <Card sx={{ bgcolor: cardSurface, border: `1px solid ${divider}`, borderRadius: 1, boxShadow: "none", overflow: "hidden" }}>
              <VirtualScroll height={height} itemHeight={25} items={items}>
                {(item) => (
                  <Box sx={{ color: textPrimary, fontSize: 16, lineHeight: "24px", p: 2 }}>
                    I'm item number {item}
                  </Box>
                )}
              </VirtualScroll>
            </Card>
          </Box>
        </Box>
        <Box sx={{ boxSizing: "border-box", flex: { xs: "0 0 100%", md: "0 0 320px" }, maxWidth: { xs: "100%", md: 320 }, px: 1.5 }}>
          <OptionsPanel>
            <SliderOption label="Item Count" max={15000} min={7000} value={count} onChange={setCount} />
            <SliderOption label="Height" max={275} min={175} value={height} onChange={setHeight} />
          </OptionsPanel>
        </Box>
      </Box>
    </ExampleBlock>
  );
}

function UserDirectoryExample() {
  const items = useMemo(() => generateDirectoryItems(), []);

  return (
    <Card sx={{ bgcolor: cardSurface, borderRadius: 1, boxShadow: "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)", maxWidth: 400, mx: "auto", overflow: "hidden" }}>
      <Box sx={{ alignItems: "center", bgcolor: orangeDarken4, color: "#fff", display: "flex", minHeight: 64, px: 2 }}>
        <Typography sx={{ color: "#fff", fontSize: 20, fontWeight: 500, letterSpacing: ".0125em", lineHeight: "32px" }}>User Directory</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          sx={{
            bgcolor: "#fff",
            boxShadow: "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)",
            color: textPrimary,
            height: 40,
            width: 40,
            "&:hover": { bgcolor: "#fff" },
          }}
        >
          <MdiIcon path={mdiPlus} size={24} />
        </IconButton>
      </Box>
      <Box sx={{ color: textSecondary, fontSize: 14, lineHeight: 1.5, p: 2, pt: 2 }}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi nobis a at voluptates culpa optio amet! Inventore deserunt voluptatem maxime a veniam placeat, eos impedit nulla quos? Officiis, aperiam ducimus.
      </Box>
      <Divider sx={{ borderColor: divider }} />
      <VirtualScroll height={300} itemHeight={50} items={items}>
        {(item) => <DirectoryRow item={item} />}
      </VirtualScroll>
    </Card>
  );
}

function BenchingExample() {
  const [benched, setBenched] = useState(0);
  const items = useMemo(() => Array.from({ length: 7000 }, (_, index) => index + 1), []);

  return (
    <Box>
      <Box sx={{ maxWidth: 400, mx: "auto", mb: 2 }}>
        <NumberField label="Total Benched" max={10} min={0} value={benched} onChange={setBenched} />
      </Box>
      <Card sx={{ bgcolor: cardSurface, borderRadius: 1, boxShadow: elevation(16), maxWidth: 400, mx: "auto", overflow: "hidden" }}>
        <VirtualScroll bench={benched} height={300} itemHeight={64} items={items}>
          {(item) => <BenchRow item={item} />}
        </VirtualScroll>
      </Card>
    </Box>
  );
}

function VirtualScroll<T>({ bench = 0, children, height, itemHeight, items }: { bench?: number; children: (item: T, index: number) => ReactNode; height: number; itemHeight: number; items: T[] }) {
  const [scrollTop, setScrollTop] = useState(0);
  const first = Math.floor(scrollTop / itemHeight);
  const last = first + Math.ceil(height / itemHeight);
  const firstToRender = Math.max(0, first - Number.parseInt(String(bench), 10));
  const lastToRender = Math.min(items.length, last + Number.parseInt(String(bench), 10));
  const visibleItems = items.slice(firstToRender, lastToRender);

  return (
    <Box
      className="v-virtual-scroll"
      onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
      sx={{
        display: "block",
        flex: "1 1 auto",
        height,
        maxWidth: "100%",
        overflow: "auto",
        position: "relative",
      }}
    >
      <Box className="v-virtual-scroll__container" sx={{ display: "block", height: items.length * itemHeight, position: "relative" }}>
        {visibleItems.map((item, offset) => {
          const index = firstToRender + offset;
          return (
            <Box
              key={index}
              className="v-virtual-scroll__item"
              sx={{ left: 0, position: "absolute", right: 0, top: index * itemHeight }}
            >
              {children(item, index)}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

function DirectoryRow({ item }: { item: DirectoryItem }) {
  return (
    <Box
      className="v-list-item"
      sx={{
        alignItems: "center",
        color: `${textPrimary} !important`,
        display: "flex",
        flex: "1 1 100%",
        letterSpacing: "normal",
        minHeight: 48,
        outline: "none",
        px: 2,
        position: "relative",
        textDecoration: "none",
      }}
    >
      <Box
        className="v-avatar v-list-item__avatar"
        sx={{
          alignItems: "center",
          alignSelf: "center",
          borderRadius: "50%",
          display: "inline-flex",
          justifyContent: "flex-start",
          height: 40,
          mb: 1,
          minWidth: 40,
          mr: 2,
          mt: 1,
          overflow: "hidden",
          position: "relative",
          textAlign: "center",
          verticalAlign: "middle",
          width: 40,
        }}
      >
        <Box className="v-avatar white--text" sx={{ alignItems: "center", bgcolor: item.color, borderRadius: "inherit", color: "#fff", display: "inline-flex", flex: "0 0 auto", fontSize: 20, height: 56, justifyContent: "center", lineHeight: "normal", minWidth: 56, overflow: "hidden", textAlign: "center", verticalAlign: "middle", width: 56 }}>
          {item.initials}
        </Box>
      </Box>
      <Box
        className="v-list-item__content"
        sx={{
          alignItems: "center",
          alignSelf: "center",
          display: "flex",
          flex: "1 1",
          flexWrap: "wrap",
          minWidth: 0,
          overflow: "hidden",
          py: 1.5,
        }}
      >
        <Typography className="v-list-item__title" sx={{ alignSelf: "center", color: textPrimary, flex: "1 1 100%", fontSize: "1rem", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.fullName}</Typography>
      </Box>
      <Box className="v-list-item__action" sx={{ alignItems: "center", alignSelf: "center", display: "inline-flex", ml: 2, my: 1.5, minWidth: 24 }}>
        <Button
          disableElevation
          sx={{
            bgcolor: "#f5f5f5",
            borderRadius: 1,
            color: textPrimary,
            fontSize: 12,
            fontWeight: 500,
            height: 28,
            letterSpacing: ".0892857143em",
            lineHeight: "28px",
            minWidth: 50,
            px: "12.4444px",
            textTransform: "uppercase",
            transitionDuration: ".28s",
            transitionProperty: "box-shadow, transform, opacity",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": { bgcolor: "#eeeeee" },
          }}
        >
          View User
          <MdiIcon path={mdiOpenInNew} color={orangeDarken4} size={18} sx={{ ml: 1, mr: "-4px" }} />
        </Button>
      </Box>
    </Box>
  );
}

function BenchRow({ item }: { item: number }) {
  return (
    <>
      <Box sx={{ alignItems: "center", color: textPrimary, display: "flex", minHeight: 63, px: 2 }}>
        <Box sx={{ alignItems: "center", display: "inline-flex", minWidth: 56, mr: 2 }}>
          <Button
            disableElevation
            sx={{
              bgcolor: primary,
              borderRadius: "50%",
              color: "#fff",
              fontSize: 14,
              fontWeight: 500,
              height: 40,
              maxWidth: 40,
              minWidth: 40,
              p: 0,
              width: 40,
              "&:hover": { bgcolor: primary },
            }}
          >
            {item}
          </Button>
        </Box>
        <Box sx={{ flex: "1 1 auto", minWidth: 0 }}>
          <Typography sx={{ color: textPrimary, fontSize: 16, lineHeight: "24px" }}>
            User Database Record <Box component="strong" sx={{ fontWeight: 700 }}>ID </Box>
          </Typography>
        </Box>
        <MdiIcon path={mdiOpenInNew} color="rgba(0,0,0,.54)" size={16} />
      </Box>
      <Divider sx={{ borderColor: divider }} />
    </>
  );
}

function OptionsPanel({ children }: { children: ReactNode }) {
  return (
    <Card sx={{ bgcolor: cardSurface, border: `1px solid ${divider}`, borderRadius: 1, boxShadow: "none", p: 2 }}>
      <Typography sx={{ color: textPrimary, fontSize: 20, fontWeight: 400, lineHeight: "32px", mb: 2 }}>Options</Typography>
      {children}
    </Card>
  );
}

function SliderOption({ label, max, min, onChange, value }: { label: string; max: number; min: number; onChange: (value: number) => void; value: number }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography sx={{ color: textSecondary, fontSize: 16, lineHeight: "24px", mb: 0.5 }}>{label}</Typography>
      <Box sx={{ alignItems: "center", display: "flex", gap: 1.5 }}>
        <Typography sx={{ color: textSecondary, fontSize: 13, minWidth: 40 }}>{value}</Typography>
        <Box component="input" max={max} min={min} onChange={(event) => onChange(Number(event.currentTarget.value))} type="range" value={value} sx={{ accentColor: primary, flex: 1 }} />
      </Box>
    </Box>
  );
}

function NumberField({ label, max, min, onChange, value }: { label: string; max: number; min: number; onChange: (value: number) => void; value: number }) {
  return (
    <Box sx={{ pt: 1 }}>
      <Box sx={{ position: "relative" }}>
        <Box component="label" sx={{ color: primary, fontSize: 12, left: 0, lineHeight: 1, position: "absolute", top: -4 }}>{label}</Box>
        <Box
          component="input"
          max={max}
          min={min}
          onChange={(event) => onChange(Math.max(min, Math.min(max, Number(event.currentTarget.value))))}
          type="number"
          value={value}
          sx={{
            bgcolor: "transparent",
            border: 0,
            borderBottom: `1px solid ${primary}`,
            color: textPrimary,
            font: "inherit",
            fontSize: 16,
            height: 32,
            outline: "none",
            pt: 1,
            width: "100%",
          }}
        />
      </Box>
    </Box>
  );
}

function BaseHeading({ children, id }: { children: ReactNode; id?: string }) {
  return <Typography id={id} component="h2" sx={{ color: textPrimary, fontSize: 32, fontWeight: 400, lineHeight: 1.2, mb: 2 }}>{children}</Typography>;
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: 0.55, py: 0.18, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function Em({ children }: { children: ReactNode }) {
  return <Box component="em" sx={{ fontStyle: "italic" }}>{children}</Box>;
}

function Strong({ children }: { children: ReactNode }) {
  return <Box component="strong" sx={{ fontWeight: 700 }}>{children}</Box>;
}

function LinkText({ children }: { children: ReactNode }) {
  return <Box component="span" sx={{ color: primary, cursor: "pointer" }}>{children}</Box>;
}

function AlertText({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ bgcolor: "rgba(66,165,245,.12)", borderLeft: "4px solid #42A5F5", borderRadius: 1, color: textSecondary, fontSize: 16, lineHeight: 1.6, mb: 3, p: 2 }}>
      {children}
    </Box>
  );
}

function ExampleBlock({ title, description, source, children }: { title?: string; description?: ReactNode; source: ExampleKey; children: ReactNode }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);

  return (
    <Card sx={{ mb: 5, bgcolor: appBackground, boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
        {title ? <Typography sx={{ color: textPrimary, fontSize: 20, fontWeight: 400, lineHeight: "32px" }}>{title}</Typography> : null}
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}><CodeIcon sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", overflowX: "auto", p: 2 }}>
          <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box>
        </Box>
      </Collapse>
      <Box sx={{ bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.7)" : textSecondary, p: 2, overflow: "visible" }}>
        {description ? <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : textSecondary, fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography> : null}
        <Box data-app="true" sx={{ overflow: "visible" }}>{children}</Box>
      </Box>
    </Card>
  );
}

function exampleIconSx(active: boolean) {
  return { bgcolor: active ? "rgba(0,151,167,.14)" : "transparent", color: active ? primary : textSecondary, height: 28, width: 28, mx: 0.25 };
}

function MdiIcon({ color = "currentColor", path, size = 24, sx }: { color?: string; path: string; size?: number; sx?: object }) {
  return <Box component="svg" viewBox="0 0 24 24" sx={{ color, display: "inline-block", flex: "0 0 auto", height: size, verticalAlign: "middle", width: size, ...sx }}><Box component="path" d={path} fill="currentColor" /></Box>;
}

function elevation(level: number) {
  if (level === 16) return "0px 8px 10px -5px rgba(0,0,0,.2), 0px 16px 24px 2px rgba(0,0,0,.14), 0px 6px 30px 5px rgba(0,0,0,.12)";
  return "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)";
}

function generateDirectoryItems() {
  const colors = ["#2196F3", "#90CAF9", "#64B5F6", "#42A5F5", "#1E88E5", "#1976D2", "#1565C0", "#0D47A1", "#82B1FF", "#448AFF", "#2979FF", "#2962FF"];
  const names = ["Oliver", "Jake", "Noah", "James", "Jack", "Connor", "Liam", "John", "Harry", "Callum", "Mason", "Robert", "Jacob", "Jacob", "Jacob", "Michael", "Charlie", "Kyle", "William", "William", "Thomas", "Joe", "Ethan", "David", "George", "Reece", "Michael", "Richard", "Oscar", "Rhys", "Alexander", "Joseph", "James", "Charlie", "James", "Charles", "William", "Damian", "Daniel", "Thomas", "Amelia", "Margaret", "Emma", "Mary", "Olivia", "Samantha", "Olivia", "Patricia", "Isla", "Bethany"];
  const surnames = ["Smith", "Anderson", "Clark", "Wright", "Mitchell", "Johnson", "Thomas", "Rodriguez", "Lopez", "Perez", "Williams", "Jackson", "Lewis", "Hill", "Roberts", "Jones", "White", "Lee", "Scott", "Turner", "Brown", "Harris", "Walker", "Green", "Phillips", "Davis", "Martin", "Hall", "Adams", "Campbell", "Miller", "Thompson", "Allen", "Baker", "Parker", "Wilson", "Garcia", "Young", "Gonzalez", "Evans", "Moore", "Martinez", "Hernandez", "Nelson", "Edwards", "Taylor", "Robinson", "King", "Carter", "Collins"];

  return Array.from({ length: 10000 }, () => {
    const name = names[Math.ceil(Math.random() * (names.length - 1))];
    const surname = surnames[Math.ceil(Math.random() * (surnames.length - 1))];
    return {
      color: colors[Math.ceil(Math.random() * (colors.length - 1))],
      fullName: `${name} ${surname}`,
      initials: `${name[0]} ${surname[0]}`,
    };
  });
}

const sourceTemplates: Record<ExampleKey, string> = {
  usage: `<template>
  <div class="py-6 grow">
    <div class="text-center font-weight-bold">{{ items.length }} Total Items</div>

    <v-card outlined>
      <v-virtual-scroll
        :height="attrs.height"
        :items="items"
        item-height="25"
      >
        <template v-slot="{ item }">
          <div class="pa-4">
            I'm item number {{ item }}
          </div>
        </template>
      </v-virtual-scroll>
    </v-card>
  </div>
</template>`,
  "user-directory": `<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title class="white--text orange darken-4">
      User Directory

      <v-spacer></v-spacer>

      <v-btn color="white" class="text--primary" fab small>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text class="pt-4">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi nobis a at
      voluptates culpa optio amet! Inventore deserunt voluptatem maxime a veniam
      placeat, eos impedit nulla quos? Officiis, aperiam ducimus.
    </v-card-text>

    <v-divider></v-divider>

    <v-virtual-scroll :items="items" :item-height="50" height="300">
      <template v-slot="{ item }">
        <v-list-item>
          <v-list-item-avatar>
            <v-avatar :color="item.color" size="56" class="white--text">
              {{ item.initials }}
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ item.fullName }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn depressed small>
              View User

              <v-icon color="orange darken-4" right>
                mdi-open-in-new
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-virtual-scroll>
  </v-card>
</template>`,
  benching: `<template>
  <div>
    <v-responsive
      max-width="400"
      class="mx-auto mb-4"
    >
      <v-text-field
        v-model="benched"
        type="number"
        label="Total Benched"
        min="0"
        max="10"
      ></v-text-field>
    </v-responsive>

    <v-card
      elevation="16"
      max-width="400"
      class="mx-auto"
    >
      <v-virtual-scroll
        :bench="benched"
        :items="items"
        height="300"
        item-height="64"
      >
        <template v-slot="{ item }">
          <v-list-item :key="item">
            <v-list-item-action>
              <v-btn
                fab
                small
                depressed
                color="primary"
              >
                {{ item }}
              </v-btn>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>
                User Database Record <strong>ID {{ }}</strong>
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon small>mdi-open-in-new</v-icon>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>
        </template>
      </v-virtual-scroll>
    </v-card>
  </div>
</template>`,
};
