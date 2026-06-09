import { useState, type ReactNode } from "react";
import {
  Box,
  Card,
  Collapse,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Code as CodeIcon, GitHub, InvertColors, TableRows } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const dividerLight = "rgba(0,0,0,.12)";
const dividerDark = "rgba(255,255,255,.12)";

type ExampleKey = "usage" | "playground" | "simple/height" | "simple/fixed-header" | "simple/dense" | "simple/dark";
type Dessert = { name: string; calories: number };

const desserts: Dessert[] = [
  { name: "Frozen Yogurt", calories: 159 },
  { name: "Ice cream sandwich", calories: 237 },
  { name: "Eclair", calories: 262 },
  { name: "Cupcake", calories: 305 },
  { name: "Gingerbread", calories: 356 },
  { name: "Jelly bean", calories: 375 },
  { name: "Lollipop", calories: 392 },
  { name: "Honeycomb", calories: 408 },
  { name: "Donut", calories: 452 },
  { name: "KitKat", calories: 518 },
];

export default function SimpleTablesPage() {
  return (
    <DocPage
      title="SimpleTables"
      namespace="Components"
      icon={<TableRows />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Simple Tables" },
      ]}
    >
      <DocText>
        The <CodePill>v-simple-table</CodePill> component is a simple wrapper component around the <CodePill>{"<table>"}</CodePill> element. Inside the component you can use all the regular table elements such as <CodePill>{"<thead>"}</CodePill>, <CodePill>{"<tbody>"}</CodePill>, <CodePill>{"<tr>"}</CodePill>, etc.
      </DocText>

      <Box component="section" sx={{ mb: 5 }}>
        <BaseHeading id="usage">Usage</BaseHeading>
        <ExampleBlock source="usage">
          <VSimpleTable items={desserts} />
        </ExampleBlock>
      </Box>

      <Box component="section" sx={{ mb: 5 }}>
        <BaseHeading id="playground">Playground</BaseHeading>
        <ExampleBlock source="playground">
          <PlaygroundExample />
        </ExampleBlock>
      </Box>

      <Box component="section" id="examples">
        <BaseHeading id="examples">Examples</BaseHeading>
        <ExampleBlock title="Fixed height" source="simple/height" description={<>Use the <CodePill>height</CodePill> prop to set the height of the table.</>}>
          <VSimpleTable items={desserts} height={300} />
        </ExampleBlock>
        <ExampleBlock title="Fixed header" source="simple/fixed-header" description={<>Use the <CodePill>fixed-header</CodePill> prop together with the <CodePill>height</CodePill> prop to fix the header to the top of the table.</>}>
          <VSimpleTable items={desserts} height={300} fixedHeader />
        </ExampleBlock>
        <ExampleBlock title="Dense table" source="simple/dense" description={<>You can show a dense version of the table by using the <CodePill>dense</CodePill> prop.</>}>
          <VSimpleTable items={desserts} dense />
        </ExampleBlock>
        <ExampleBlock title="Dark theme" source="simple/dark" description={<>Use <CodePill>dark</CodePill> prop to switch table to the dark theme.</>}>
          <VSimpleTable items={desserts} dark />
        </ExampleBlock>
      </Box>
    </DocPage>
  );
}

function PlaygroundExample() {
  const [dense, setDense] = useState(false);
  const [fixedHeader, setFixedHeader] = useState(false);
  const [height, setHeight] = useState(300);

  return (
    <Box>
      <VSimpleTable items={desserts} dense={dense} fixedHeader={fixedHeader} height={height} />
      <Box sx={{ display: "flex", flexWrap: "wrap", mx: -1.5, mt: 2 }}>
        <Box sx={{ boxSizing: "border-box", flexBasis: { xs: "100%", md: "50%" }, maxWidth: { xs: "100%", md: "50%" }, px: 1.5 }}>
          <TextField
            label="Height - px"
            type="number"
            value={height}
            onChange={(event) => {
              const next = Number(event.target.value);
              setHeight(Number.isFinite(next) ? Math.min(500, Math.max(1, next)) : 1);
            }}
            inputProps={{ min: 1, max: 500, step: 1 }}
            variant="standard"
            sx={{ mx: 4, width: 125 }}
          />
        </Box>
        <Box sx={{ boxSizing: "border-box", flexBasis: { xs: "50%", md: "25%" }, maxWidth: { xs: "50%", md: "25%" }, px: 1.5 }}>
          <VuetifySwitch checked={dense} onChange={setDense} label="Toggle dense" />
        </Box>
        <Box sx={{ boxSizing: "border-box", flexBasis: { xs: "50%", md: "25%" }, maxWidth: { xs: "50%", md: "25%" }, px: 1.5 }}>
          <VuetifySwitch checked={fixedHeader} onChange={setFixedHeader} label="Toggle fixed-header" />
        </Box>
      </Box>
    </Box>
  );
}

function VSimpleTable({ items, dense = false, fixedHeader = false, height, dark = false }: { items: Dessert[]; dense?: boolean; fixedHeader?: boolean; height?: number; dark?: boolean }) {
  const headerHeight = dense ? 32 : 48;
  const rowHeight = dense ? 32 : 48;
  const divider = dark ? dividerDark : dividerLight;

  return (
    <Box
      sx={{
        bgcolor: dark ? "#1e1e1e" : "#fff",
        borderRadius: 1,
        color: dark ? "#fff" : "rgba(0,0,0,.87)",
        lineHeight: 1.5,
        maxWidth: "100%",
      }}
    >
      <Box
        sx={{
          height: height ? `${height}px` : undefined,
          overflowX: "auto",
          overflowY: height || fixedHeader ? "auto" : "hidden",
        }}
      >
        <Box component="table" sx={{ borderSpacing: 0, width: "100%" }}>
          <Box component="thead">
            <Box component="tr">
              <TableHeaderCell dark={dark} divider={divider} height={headerHeight} fixedHeader={fixedHeader}>Name</TableHeaderCell>
              <TableHeaderCell dark={dark} divider={divider} height={headerHeight} fixedHeader={fixedHeader}>Calories</TableHeaderCell>
            </Box>
          </Box>
          <Box component="tbody">
            {items.map((item, index) => (
              <Box
                component="tr"
                key={item.name}
                sx={{
                  "&:hover td": { bgcolor: dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.04)" },
                }}
              >
                <TableCell divider={divider} height={rowHeight} last={index === items.length - 1}>{item.name}</TableCell>
                <TableCell divider={divider} height={rowHeight} last={index === items.length - 1}>{item.calories}</TableCell>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function TableHeaderCell({ children, dark, divider, height, fixedHeader }: { children: ReactNode; dark: boolean; divider: string; height: number; fixedHeader: boolean }) {
  return (
    <Box
      component="th"
      sx={{
        bgcolor: dark ? "#1e1e1e" : "#fff",
        borderBottom: fixedHeader ? "0 !important" : `1px solid ${divider}`,
        boxShadow: fixedHeader ? `inset 0 -1px 0 ${divider}` : "none",
        color: dark ? "rgba(255,255,255,.7)" : "rgba(0,0,0,.6)",
        fontSize: 12,
        fontWeight: 500,
        height,
        p: "0 16px",
        position: fixedHeader ? "sticky" : "static",
        textAlign: "left",
        top: 0,
        transition: "height .2s cubic-bezier(.4,0,.6,1)",
        userSelect: "none",
        zIndex: fixedHeader ? 2 : "auto",
      }}
    >
      {children}
    </Box>
  );
}

function TableCell({ children, divider, height, last }: { children: ReactNode; divider: string; height: number; last: boolean }) {
  return (
    <Box
      component="td"
      sx={{
        borderBottom: last ? "none" : `1px solid ${divider}`,
        fontSize: 14,
        fontWeight: 400,
        height,
        p: "0 16px",
        transition: "height .2s cubic-bezier(.4,0,.6,1)",
      }}
    >
      {children}
    </Box>
  );
}

function VuetifySwitch({ checked, onChange, label }: { checked: boolean; onChange: (value: boolean) => void; label: string }) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": { color: primary },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: primary },
          }}
        />
      }
      label={label}
      sx={{ mx: 4, minHeight: 48, "& .MuiFormControlLabel-label": { color: "rgba(0,0,0,.87)", fontSize: 16 } }}
    />
  );
}

function ExampleBlock({ title, description, source, children }: { title?: string; description?: ReactNode; source: ExampleKey; children: ReactNode }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card sx={{ mb: 5, bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
        {title ? <Typography sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>{title}</Typography> : null}
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
      <Box sx={{ bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", p: 2, overflow: "visible" }}>
        {description ? <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography> : null}
        <Box data-app="true" sx={{ overflow: "visible" }}>{children}</Box>
      </Box>
    </Card>
  );
}

function BaseHeading({ children, id }: { children: ReactNode; id?: string }) {
  return <Typography id={id} component="h2" sx={{ fontSize: 32, lineHeight: 1.2, fontWeight: 400, mb: 2 }}>{children}</Typography>;
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: 0.55, py: 0.18, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return {
    bgcolor: active ? "rgba(0,150,136,.14)" : "transparent",
    color: active ? primary : "text.secondary",
    height: 28,
    width: 28,
    mx: 0.25,
  };
}

const sourceTemplates: Record<ExampleKey, string> = {
  usage: `<v-simple-table>
  <template v-slot:default>
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Calories</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in desserts" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>
    </tbody>
  </template>
</v-simple-table>`,
  playground: `<v-simple-table
  :dense="dense"
  :fixed-header="fixedHeader"
  :height="height"
>
  <template v-slot:default>
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Calories</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in desserts" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>
    </tbody>
  </template>
</v-simple-table>`,
  "simple/height": `<v-simple-table height="300px">
  <template v-slot:default>
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Calories</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in desserts" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>
    </tbody>
  </template>
</v-simple-table>`,
  "simple/fixed-header": `<v-simple-table fixed-header height="300px">
  <template v-slot:default>
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Calories</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in desserts" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>
    </tbody>
  </template>
</v-simple-table>`,
  "simple/dense": `<v-simple-table dense>
  <template v-slot:default>
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Calories</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in desserts" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>
    </tbody>
  </template>
</v-simple-table>`,
  "simple/dark": `<v-simple-table dark>
  <template v-slot:default>
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Calories</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in desserts" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>
    </tbody>
  </template>
</v-simple-table>`,
};
