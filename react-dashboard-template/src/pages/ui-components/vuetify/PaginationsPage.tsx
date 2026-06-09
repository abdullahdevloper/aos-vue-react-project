import { useState, type ReactNode } from "react";
import {
  Box,
  Card,
  Collapse,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Code, GitHub, InvertColors, ViewHeadline } from "@mui/icons-material";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import NavigateNext from "@mui/icons-material/NavigateNext";
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiArrowLeft,
  mdiArrowRight,
  mdiMenuLeft,
  mdiMenuRight,
} from "@mdi/js";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const neuInset =
  "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const shadow2 =
  "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)";

type ExampleKey = keyof typeof sourceTemplates;

const MDI_ICON_MAP: Record<string, string> = {
  "mdi-chevron-left": mdiChevronLeft,
  "mdi-arrow-left": mdiArrowLeft,
  "mdi-menu-left": mdiMenuLeft,
  "mdi-chevron-right": mdiChevronRight,
  "mdi-arrow-right": mdiArrowRight,
  "mdi-menu-right": mdiMenuRight,
};

function resolveNavIcon(name: string, size = 18): ReactNode {
  if (MDI_ICON_MAP[name]) {
    return (
      <Box
        component="svg"
        viewBox="0 0 24 24"
        sx={{ width: size, height: size, display: "block" }}
      >
        <Box component="path" d={MDI_ICON_MAP[name]} fill="currentColor" />
      </Box>
    );
  }
  if (name === "navigate_before") return <NavigateBefore sx={{ fontSize: size + 4 }} />;
  if (name === "navigate_next") return <NavigateNext sx={{ fontSize: size + 4 }} />;
  return <NavigateBefore sx={{ fontSize: size + 4 }} />;
}

function getPageItems(
  page: number,
  length: number,
  totalVisible?: number
): Array<number | "..."> {
  if (!totalVisible || length <= totalVisible) {
    return Array.from({ length }, (_, i) => i + 1);
  }
  if (totalVisible <= 2) return [page];

  const middle = Math.max(totalVisible - 2, 1);
  const half = Math.floor(middle / 2);
  let start = page - half;
  let end = page + (middle - 1 - half);

  if (start <= 1) {
    start = 1;
    end = Math.min(middle, length);
  }
  if (end >= length) {
    end = length;
    start = Math.max(1, length - middle + 1);
  }

  const items: Array<number | "..."> = [];
  if (start > 1) {
    items.push(1);
    if (start > 2) items.push("...");
  }
  for (let i = start; i <= end; i++) items.push(i);
  if (end < length) {
    if (end < length - 1) items.push("...");
    items.push(length);
  }
  return items;
}

function VPagination({
  value = 1,
  length,
  circle = false,
  disabled = false,
  totalVisible,
  prevIcon = "navigate_before",
  nextIcon = "navigate_next",
  onChange,
}: {
  value?: number;
  length: number;
  circle?: boolean;
  disabled?: boolean;
  totalVisible?: number;
  prevIcon?: string;
  nextIcon?: string;
  onChange?: (page: number) => void;
}) {
  const page = value;
  const items = getPageItems(page, length, totalVisible);
  const radius = circle ? "50%" : "4px";

  const pageBtnSx = (active: boolean) => ({
    minWidth: 34,
    width: 34,
    height: 34,
    p: 0,
    mx: "3px",
    my: "3px",
    border: "none",
    borderRadius: radius,
    bgcolor: active ? primary : "#fff",
    color: active ? "#fff" : "rgba(0,0,0,.87)",
    boxShadow: shadow2,
    fontSize: 14,
    fontWeight: active ? 500 : 400,
    lineHeight: 1,
    cursor: disabled ? "default" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 150ms cubic-bezier(.4,0,.2,1)",
    "&:hover": disabled
      ? {}
      : { bgcolor: active ? primary : "rgba(0,0,0,.06)" },
    "&:disabled": { opacity: 1 },
  });

  const navBtnSx = (inactive: boolean) => ({
    ...pageBtnSx(false),
    opacity: inactive ? 0.38 : 1,
    cursor: inactive || disabled ? "default" : "pointer",
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
    >
      <Box
        component="button"
        type="button"
        disabled={disabled || page <= 1}
        onClick={() => page > 1 && onChange?.(page - 1)}
        sx={navBtnSx(page <= 1)}
      >
        {resolveNavIcon(prevIcon)}
      </Box>

      {items.map((item, idx) =>
        item === "..." ? (
          <Box
            key={`ellipsis-${idx}`}
            sx={{
              minWidth: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "3px",
              fontSize: 14,
              color: "rgba(0,0,0,.87)",
            }}
          >
            ...
          </Box>
        ) : (
          <Box
            key={item}
            component="button"
            type="button"
            disabled={disabled}
            onClick={() => onChange?.(item as number)}
            sx={pageBtnSx(item === page)}
          >
            {item}
          </Box>
        )
      )}

      <Box
        component="button"
        type="button"
        disabled={disabled || page >= length}
        onClick={() => page < length && onChange?.(page + 1)}
        sx={navBtnSx(page >= length)}
      >
        {resolveNavIcon(nextIcon)}
      </Box>
    </Box>
  );
}

export default function PaginationsPage() {
  return (
    <DocPage
      title="Paginations"
      namespace="Components"
      icon={<ViewHeadline />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Paginations" },
      ]}
    >
      <DocText>
        The <CodePill>v-pagination</CodePill> component is used to separate
        long sets of data so that it is easier for a user to consume
        information. Depending on the length provided, the pagination component
        will automatically scale. To maintain the current page, simply supply a{" "}
        <CodePill>v-model</CodePill> attribute.
      </DocText>
      <UsageSection />
      <PlaygroundSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  const [page, setPage] = useState(1);
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <BaseHeading id="usage">Usage</BaseHeading>
      <VuetifyExampleBlock
        title=""
        source="usage"
        description={
          <>
            Pagination by default displays the number of pages based on the set{" "}
            <CodePill>length</CodePill> prop, with <CodePill>prev</CodePill> and{" "}
            <CodePill>next</CodePill> buttons surrounding to help you navigate.
          </>
        }
      >
        {() => (
          <Box sx={{ textAlign: "center" }}>
            <VPagination value={page} length={6} onChange={setPage} />
          </Box>
        )}
      </VuetifyExampleBlock>
    </Box>
  );
}

function PlaygroundSection() {
  const [circle, setCircle] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [length, setLength] = useState(10);
  const [prevIcon, setPrevIcon] = useState("navigate_before");
  const [nextIcon, setNextIcon] = useState("navigate_next");
  const [page, setPage] = useState(1);
  const [totalVisible, setTotalVisible] = useState(10);

  const prevIcons = ["mdi-chevron-left", "mdi-arrow-left", "mdi-menu-left"];
  const nextIcons = ["mdi-chevron-right", "mdi-arrow-right", "mdi-menu-right"];

  return (
    <Box component="section" sx={{ mb: 5 }}>
      <BaseHeading id="playground">Playground</BaseHeading>
      <VuetifyExampleBlock title="" description="" source="playground">
        {() => (
          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                mb: 2,
              }}
            >
              <VSwitch
                label="Toggle circle"
                checked={circle}
                onChange={setCircle}
              />
              <VSwitch
                label="Toggle disabled"
                checked={disabled}
                onChange={setDisabled}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 1,
                mb: 3,
              }}
            >
              <VSelect
                label="prev-icon"
                value={prevIcon}
                items={prevIcons}
                onChange={setPrevIcon}
              />
              <VSelect
                label="next-icon"
                value={nextIcon}
                items={nextIcons}
                onChange={setNextIcon}
              />
              <TextField
                label="Pagination length"
                type="number"
                value={length}
                inputProps={{ min: 1, max: 25, step: 1 }}
                onChange={(e) => setLength(Number(e.target.value))}
                sx={fieldSx}
              />
              <TextField
                label="Total visible"
                type="number"
                value={totalVisible}
                inputProps={{ min: 1, max: 25, step: 1 }}
                onChange={(e) => setTotalVisible(Number(e.target.value))}
                sx={fieldSx}
              />
            </Box>

            <VPagination
              value={page}
              length={length}
              circle={circle}
              disabled={disabled}
              totalVisible={totalVisible}
              prevIcon={prevIcon}
              nextIcon={nextIcon}
              onChange={setPage}
            />
          </Box>
        )}
      </VuetifyExampleBlock>
    </Box>
  );
}

function ExamplesSection() {
  return (
    <Box component="section">
      <BaseHeading id="examples">Examples</BaseHeading>
      <LongExample />
      <LimitExample />
      <CircleExample />
      <IconsExample />
      <DisabledExample />
    </Box>
  );
}

function LongExample() {
  const [page, setPage] = useState(1);
  return (
    <VuetifyExampleBlock
      title="Long"
      source="simple/long"
      description={
        <>
          Using the <CodePill>length</CodePill> prop you can set the length of{" "}
          <CodePill>v-pagination</CodePill>, if the number of page buttons
          exceeds the parent container, it will truncate the list.
        </>
      }
    >
      {() => (
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ maxWidth: "66.66%", mx: "auto" }}>
            <Box sx={{ my: 2 }}>
              <VPagination value={page} length={15} onChange={setPage} />
            </Box>
          </Box>
        </Box>
      )}
    </VuetifyExampleBlock>
  );
}

function LimitExample() {
  const [page, setPage] = useState(1);
  return (
    <VuetifyExampleBlock
      title="Limit"
      source="simple/limit"
      description={
        <>
          You can also manually set the maximum number of visible page buttons
          with the <CodePill>total-visible</CodePill> prop.
        </>
      }
    >
      {() => (
        <Box sx={{ textAlign: "center" }}>
          <VPagination
            value={page}
            length={15}
            totalVisible={7}
            onChange={setPage}
          />
        </Box>
      )}
    </VuetifyExampleBlock>
  );
}

function CircleExample() {
  const [page, setPage] = useState(1);
  return (
    <VuetifyExampleBlock
      title="Circle"
      source="simple/circle"
      description={
        <>
          The <CodePill>circle</CodePill> prop gives you an alternate style for
          pagination buttons.
        </>
      }
    >
      {() => (
        <Box sx={{ textAlign: "center" }}>
          <VPagination value={page} length={4} circle onChange={setPage} />
        </Box>
      )}
    </VuetifyExampleBlock>
  );
}

function IconsExample() {
  const [page, setPage] = useState(1);
  return (
    <VuetifyExampleBlock
      title="Icons"
      source="simple/icons"
      description={
        <>
          Previous and next page icons can be customized with the{" "}
          <CodePill>prev-icon</CodePill> and <CodePill>next-icon</CodePill>{" "}
          props.
        </>
      }
    >
      {() => (
        <Box sx={{ textAlign: "center" }}>
          <VPagination
            value={page}
            length={4}
            prevIcon="mdi-menu-left"
            nextIcon="mdi-menu-right"
            onChange={setPage}
          />
        </Box>
      )}
    </VuetifyExampleBlock>
  );
}

function DisabledExample() {
  return (
    <VuetifyExampleBlock
      title="Disabled"
      source="simple/disabled"
      description={
        <>
          Pagination items can be manually deactivated using the{" "}
          <CodePill>disabled</CodePill> prop.
        </>
      }
    >
      {() => (
        <Box sx={{ textAlign: "center" }}>
          <VPagination length={3} disabled />
        </Box>
      )}
    </VuetifyExampleBlock>
  );
}

function VSwitch({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <Box
      onClick={() => onChange(!checked)}
      sx={{
        mx: 2,
        display: "flex",
        alignItems: "center",
        minHeight: 42,
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <Box
        sx={{
          width: 42,
          height: 34,
          position: "relative",
          mr: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 34,
            height: 14,
            borderRadius: 8,
            bgcolor: checked ? primary : "rgba(0,0,0,.38)",
            opacity: checked ? 0.5 : 0.38,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            left: checked ? 18 : 0,
            width: 20,
            height: 20,
            borderRadius: "50%",
            bgcolor: checked ? primary : "#fafafa",
            boxShadow: "0 2px 4px rgba(0,0,0,.32)",
            transition: "left 150ms cubic-bezier(.4,0,.2,1)",
          }}
        />
      </Box>
      <Typography sx={{ fontSize: 16 }}>{label}</Typography>
    </Box>
  );
}

function VSelect({
  label,
  value,
  items,
  onChange,
}: {
  label: string;
  value: string;
  items: string[];
  onChange: (v: string) => void;
}) {
  return (
    <Box sx={{ mx: 2, minWidth: 160, position: "relative" }}>
      <Typography
        sx={{
          position: "absolute",
          top: -8,
          left: 8,
          fontSize: 12,
          color: primary,
          bgcolor: "transparent",
          px: 0.5,
          zIndex: 1,
        }}
      >
        {label}
      </Typography>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="small"
        sx={{
          width: "100%",
          height: 48,
          fontSize: 16,
          bgcolor: "#fff",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0,0,0,.42)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0,0,0,.87)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: primary,
          },
        }}
      >
        {items.map((item) => (
          <MenuItem key={item} value={item} sx={{ fontSize: 16 }}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

function BaseHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <Typography
      id={id}
      variant="h5"
      sx={{
        fontSize: { xs: 20, md: 22 },
        lineHeight: 1.45,
        fontWeight: 400,
        mb: 2.5,
      }}
    >
      {children}
    </Typography>
  );
}

function VuetifyExampleBlock({
  title,
  description,
  source,
  children,
}: {
  title: string;
  description: ReactNode;
  source: ExampleKey;
  children: () => ReactNode;
}) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card
      sx={{
        mb: 5,
        bgcolor: "background.default",
        boxShadow: neuInset,
        borderRadius: 1,
        overflow: "visible",
      }}
    >
      <Toolbar
        variant="dense"
        sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}
      >
        {title && (
          <Typography sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>
            {title}
          </Typography>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors">
          <IconButton
            size="small"
            onClick={() => setInverted((v) => !v)}
            sx={exampleIconSx(inverted)}
          >
            <InvertColors sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="View on Github">
          <IconButton size="small" sx={exampleIconSx(false)}>
            <GitHub sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="View source">
          <IconButton
            size="small"
            onClick={() => setSourceOpen((v) => !v)}
            sx={exampleIconSx(sourceOpen)}
          >
            <Code sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", overflowX: "auto", p: 2 }}>
          <Box
            component="pre"
            sx={{
              m: 0,
              fontFamily: "'Roboto Mono', Consolas, monospace",
              fontSize: 12.5,
              lineHeight: 1.55,
              whiteSpace: "pre-wrap",
            }}
          >
            {sourceTemplates[source]}
          </Box>
        </Box>
      </Collapse>
      <Box
        sx={{
          bgcolor: inverted ? "#303030" : "transparent",
          color: inverted ? "rgba(255,255,255,.92)" : "inherit",
          p: 2,
          overflow: "visible",
          "& a": { color: primary },
        }}
      >
        {description !== "" && description !== undefined && description !== null && (
          <Typography
            sx={{
              color: inverted ? "rgba(255,255,255,.72)" : "text.secondary",
              fontSize: { xs: 16, md: 20 },
              fontWeight: 300,
              lineHeight: 1.55,
              mb: 3,
            }}
          >
            {description}
          </Typography>
        )}
        <Box data-app="true" sx={{ overflow: "visible" }}>
          {children()}
        </Box>
      </Box>
    </Card>
  );
}

function CodePill({ children }: { children: ReactNode }) {
  return (
    <Box
      component="code"
      sx={{
        px: 0.55,
        py: 0.18,
        borderRadius: 0.75,
        bgcolor: "rgba(244,67,54,.08)",
        color: "#e53935",
        fontFamily: "'Roboto Mono', Consolas, monospace",
        fontSize: "88%",
      }}
    >
      {children}
    </Box>
  );
}

function exampleIconSx(active: boolean) {
  return {
    width: 30,
    height: 30,
    ml: 0.5,
    color: active ? primary : "text.secondary",
    bgcolor: active ? "rgba(0,151,167,.12)" : "transparent",
    "&:hover": {
      bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)",
    },
  };
}

const fieldSx = {
  width: 125,
  mx: 2,
  "& .MuiInputBase-root": { height: 48, bgcolor: "#fff" },
  "& .MuiInputLabel-root": { fontSize: 16 },
  "& input": { py: 1.1 },
};

const sourceTemplates = {
  usage: `<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="6"
    ></v-pagination>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        page: 1,
      }
    },
  }
</script>`,
  playground: `<template>
  <div class="text-center">
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-radio-group row wrap>
          <v-switch v-model="circle" label="Toggle circle" class="mx-4"></v-switch>
          <v-switch v-model="disabled" label="Toggle disabled" class="mx-4"></v-switch>
        </v-radio-group>
      </v-col>

      <v-row>
        <v-col cols="12" md="3">
          <v-select
            v-model="prevIcon"
            class="mx-4"
            :items="prevIcons"
            label="prev-icon"
          ></v-select>
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            v-model="nextIcon"
            class="mx-4"
            :items="nextIcons"
            label="next-icon"
          ></v-select>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            v-model="length"
            label="Pagination length"
            max="25"
            min="1"
            step="1"
            style="width: 125px"
            type="number"
            @keydown="false"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            v-model="totalVisible"
            label="Total visible"
            max="25"
            min="1"
            step="1"
            style="width: 125px"
            type="number"
            @keydown="false"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-row>

    <v-pagination
      v-model="page"
      :circle="circle"
      :disabled="disabled"
      :length="length"
      :next-icon="nextIcon"
      :prev-icon="prevIcon"
      :page="page"
      :total-visible="totalVisible"
    ></v-pagination>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        circle: false,
        disabled: false,
        length: 10,
        nextIcon: 'navigate_next',
        nextIcons: ['mdi-chevron-right', 'mdi-arrow-right', 'mdi-menu-right'],
        prevIcon: 'navigate_before',
        prevIcons: ['mdi-chevron-left', 'mdi-arrow-left', 'mdi-menu-left'],
        page: 1,
        totalVisible: 10,
      }
    },
  }
</script>`,
  "simple/long": `<template>
  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              class="my-4"
              :length="15"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        page: 1,
      }
    },
  }
</script>`,
  "simple/limit": `<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="15"
      :total-visible="7"
    ></v-pagination>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        page: 1,
      }
    },
  }
</script>`,
  "simple/circle": `<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="4"
      circle
    ></v-pagination>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        page: 1,
      }
    },
  }
</script>`,
  "simple/icons": `<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="4"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    ></v-pagination>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        page: 1,
      }
    },
  }
</script>`,
  "simple/disabled": `<template>
  <div class="text-center">
    <v-pagination
      :length="3"
      disabled
    ></v-pagination>
  </div>
</template>`,
};
