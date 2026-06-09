import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Collapse,
  IconButton,
  Rating,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Close, Code, GitHub, InvertColors, Layers } from "@mui/icons-material";
import { mdiOpenInNew } from "@mdi/js";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const error = "#ff5252";
const success = "#4caf50";
const orangeLight2 = "#ffb74d";
const teal = "#009688";
const deepPurpleAccent4 = "#6200ea";

const shadow2 =
  "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)";
const neuInset =
  "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";

type ExampleKey = keyof typeof sourceTemplates;

type RippleState = { id: number; x: number; y: number; size: number };

function useVuetifyRipple() {
  const [ripples, setRipples] = useState<RippleState[]>([]);
  const counter = useRef(0);

  function triggerRipple(event: React.PointerEvent<HTMLElement>) {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;
    const id = ++counter.current;
    setRipples((prev) => [...prev, { id, x, y, size }]);
    setTimeout(
      () => setRipples((prev) => prev.filter((r) => r.id !== id)),
      600
    );
  }

  return { ripples, triggerRipple };
}

function RippleLayer({ ripples }: { ripples: RippleState[] }) {
  return (
    <>
      {ripples.map((r) => (
        <Box
          key={r.id}
          sx={{
            position: "absolute",
            left: r.x - r.size / 2,
            top: r.y - r.size / 2,
            width: r.size,
            height: r.size,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,.3)",
            animation: "rippleAnim 600ms cubic-bezier(.4,0,.2,1)",
            pointerEvents: "none",
            "@keyframes rippleAnim": {
              "0%": { opacity: 0.6, transform: "scale(0)" },
              "100%": { opacity: 0, transform: "scale(1)" },
            },
          }}
        />
      ))}
    </>
  );
}

export default function OverlaysPage() {
  return (
    <DocPage
      title="Overlays"
      namespace="Components"
      icon={<Layers />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Overlays" },
      ]}
    >
      <DocText>
        The <CodePill>v-overlay</CodePill> component is used to provide
        emphasis on a particular element or parts of it. It signals to the user
        of a state change within the application and can be used for creating
        loaders, dialogs and more.
      </DocText>
      <UsageSection />
      <PlaygroundSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  const [overlay, setOverlay] = useState(false);
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <BaseHeading id="usage">Usage</BaseHeading>
      <VuetifyExampleBlock
        title=""
        source="usage"
        description={
          <>
            In its simplest form, the <CodePill>v-overlay</CodePill> component
            will add a dimmed layer over your application.
          </>
        }
      >
        {() => (
          <Box sx={{ textAlign: "center" }}>
            <VButton color={error} onClick={() => setOverlay(!overlay)}>
              Show Overlay
            </VButton>
            <VOverlay open={overlay}>
              <IconButton
                onClick={() => setOverlay(false)}
                sx={{ color: "#fff" }}
              >
                <Close />
              </IconButton>
            </VOverlay>
          </Box>
        )}
      </VuetifyExampleBlock>
    </Box>
  );
}

function PlaygroundSection() {
  const [absolute, setAbsolute] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [opacity, setOpacity] = useState(0.46);
  const [zIndex, setZIndex] = useState(5);

  return (
    <Box component="section" sx={{ mb: 5 }}>
      <BaseHeading id="playground">Playground</BaseHeading>
      <VuetifyExampleBlock title="" description="" source="playground">
        {() => (
          <Box sx={{ position: "relative", minHeight: 200 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <VButton
                color={primary}
                onClick={() => setOverlay(!overlay)}
                sx={{ mt: 6 }}
              >
                Show Overlay
              </VButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <VCheckbox
                label="Absolute"
                checked={absolute}
                onChange={setAbsolute}
              />
              <VCheckbox
                label="value"
                checked={overlay}
                onChange={setOverlay}
              />
              <TextField
                label="Opacity"
                type="number"
                value={opacity}
                inputProps={{ min: 0, max: 1, step: 0.01 }}
                onChange={(e) => setOpacity(Number(e.target.value))}
                sx={fieldSx}
              />
              <TextField
                label="z-index"
                type="number"
                value={zIndex}
                inputProps={{ min: -9999, max: 9999, step: 1 }}
                onChange={(e) => setZIndex(Number(e.target.value))}
                sx={fieldSx}
              />
            </Box>
            <VOverlay
              open={overlay}
              absolute={absolute}
              opacity={opacity}
              zIndex={zIndex}
            >
              <VButton color={primary} onClick={() => setOverlay(false)}>
                Hide Overlay
              </VButton>
            </VOverlay>
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
      <AbsoluteExample />
      <OpacityExample />
      <ZIndexExample />
      <LoaderExample />
      <AdvancedExample />
    </Box>
  );
}

function AbsoluteExample() {
  const [overlay, setOverlay] = useState(false);
  return (
    <VuetifyExampleBlock
      title="Absolute"
      source="simple/absolute"
      description={
        <>
          <CodePill>absolute</CodePill> overlays are positioned absolutely and
          contained inside of their parent element.
        </>
      }
    >
      {() => (
        <Box
          sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <Card
            sx={{
              height: 300,
              width: 250,
              position: "relative",
              overflow: "hidden",
              boxShadow: shadow2,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", pt: 6 }}>
              <VButton color={success} onClick={() => setOverlay(!overlay)}>
                Show Overlay
              </VButton>
            </Box>
            <VOverlay open={overlay} absolute>
              <VButton color={success} onClick={() => setOverlay(false)}>
                Hide Overlay
              </VButton>
            </VOverlay>
          </Card>
        </Box>
      )}
    </VuetifyExampleBlock>
  );
}

function OpacityExample() {
  const [overlay, setOverlay] = useState(false);
  return (
    <VuetifyExampleBlock
      title="Opacity"
      source="simple/opacity"
      description={
        <>
          <CodePill>opacity</CodePill> allows you to customize the transparency
          of <CodePill>v-overlay</CodePill> components.
        </>
      }
    >
      {() => (
        <Box
          sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <Card
            sx={{
              height: 300,
              width: 250,
              position: "relative",
              overflow: "hidden",
              boxShadow: shadow2,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", pt: 6 }}>
              <VButton
                color={orangeLight2}
                onClick={() => setOverlay(!overlay)}
              >
                Show Overlay
              </VButton>
            </Box>
            <VOverlay open={overlay} absolute opacity={1}>
              <VButton color={orangeLight2} onClick={() => setOverlay(false)}>
                Hide Overlay
              </VButton>
            </VOverlay>
          </Card>
        </Box>
      )}
    </VuetifyExampleBlock>
  );
}

function ZIndexExample() {
  const [overlay, setOverlay] = useState(false);
  return (
    <VuetifyExampleBlock
      title="Z Index"
      source="simple/z-index"
      description={
        <>
          <CodePill>z-index</CodePill> gives you the ability to easily change
          the stack order of the <CodePill>v-overlay</CodePill> component.
        </>
      }
    >
      {() => (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <VButton color={teal} onClick={() => setOverlay(!overlay)}>
            Show Overlay
          </VButton>
          <VOverlay open={overlay} zIndex={0}>
            <VButton color={teal} onClick={() => setOverlay(false)}>
              Hide Overlay
            </VButton>
          </VOverlay>
        </Box>
      )}
    </VuetifyExampleBlock>
  );
}

function LoaderExample() {
  const [overlay, setOverlay] = useState(false);
  useEffect(() => {
    if (!overlay) return;
    const timer = window.setTimeout(() => setOverlay(false), 3000);
    return () => window.clearTimeout(timer);
  }, [overlay]);

  return (
    <VuetifyExampleBlock
      title="Loader"
      source="intermediate/loader"
      description="Using the v-overlay as a background, add a progress component to easily create a custom loader."
    >
      {() => (
        <Box sx={{ textAlign: "center" }}>
          <VButton color={deepPurpleAccent4} onClick={() => setOverlay(!overlay)}>
            Launch Application&nbsp;
            <VIcon icon="mdi-open-in-new" />
          </VButton>
          <VOverlay open={overlay}>
            <CircularProgress size={64} thickness={3.5} sx={{ color: "#fff" }} />
          </VOverlay>
        </Box>
      )}
    </VuetifyExampleBlock>
  );
}

function AdvancedExample() {
  const [hover, setHover] = useState(false);
  return (
    <VuetifyExampleBlock
      title="Advanced"
      source="complex/advanced"
      description={
        <>
          Using the{" "}
          <a href="/components/hover">v-hover</a>, we are able to add a nice
          scrim over the information card with additional actions the user can
          take.
        </>
      }
    >
      {() => (
        <Card
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          sx={{
            mx: "auto",
            maxWidth: 344,
            position: "relative",
            overflow: "hidden",
            boxShadow: shadow2,
          }}
        >
          <Box
            component="img"
            src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
            sx={{ display: "block", width: "100%", height: "auto", objectFit: "cover" }}
          />
          <Box sx={{ p: 2 }}>
            <Typography
              component="h2"
              sx={{
                fontSize: 20,
                fontWeight: 500,
                lineHeight: "32px",
                color: primary,
                mb: 0.5,
              }}
            >
              Magento Forests
            </Typography>
            <Typography sx={{ fontSize: 14, color: "rgba(0,0,0,.6)", lineHeight: "20px" }}>
              Travel to the best outdoor experience on planet Earth. A vacation
              you will never forget!
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", px: 2, pb: 2 }}>
            <Rating
              value={4}
              readOnly
              size="small"
              sx={{ color: "#ff9800", mr: 1 }}
            />
            <Typography sx={{ fontSize: 12, fontWeight: 500, color: primary }}>
              64 Reviews
            </Typography>
          </Box>
          <VOverlay open={hover} absolute color="#036358">
            <VButton textColor="rgba(0,0,0,.87)">See more info</VButton>
          </VOverlay>
        </Card>
      )}
    </VuetifyExampleBlock>
  );
}

function VOverlay({
  open,
  children,
  absolute = false,
  opacity = 0.46,
  color = "#212121",
  zIndex = 5,
}: {
  open: boolean;
  children?: ReactNode;
  absolute?: boolean;
  opacity?: number;
  color?: string;
  zIndex?: number;
}) {
  if (!open) return null;
  return (
    <Box
      sx={{
        position: absolute ? "absolute" : "fixed",
        inset: 0,
        zIndex,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "vOverlayFadeIn 300ms cubic-bezier(.25,.8,.25,1)",
        "@keyframes vOverlayFadeIn": { from: { opacity: 0 }, to: { opacity: 1 } },
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          bgcolor: color,
          opacity,
          zIndex: -1,
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
    </Box>
  );
}

function VButton({
  children,
  color = "#fff",
  textColor = "#fff",
  onClick,
  sx,
}: {
  children?: ReactNode;
  color?: string;
  textColor?: string;
  onClick?: () => void;
  sx?: object;
}) {
  const { ripples, triggerRipple } = useVuetifyRipple();
  return (
    <Button
      onPointerDown={triggerRipple}
      onClick={onClick}
      disableRipple
      sx={{
        minWidth: 64,
        height: 36,
        px: 2,
        bgcolor: color,
        color: textColor,
        boxShadow: shadow2,
        borderRadius: 1,
        textTransform: "uppercase",
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: 0.4,
        position: "relative",
        overflow: "hidden",
        "&:hover": { bgcolor: color },
        ...sx,
      }}
    >
      {children}
      <RippleLayer ripples={ripples} />
    </Button>
  );
}

function VCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <Box
      onClick={() => onChange(!checked)}
      sx={{ display: "flex", alignItems: "center", cursor: "pointer", minHeight: 48 }}
    >
      <Checkbox
        checked={checked}
        disableRipple
        sx={{
          p: 1,
          color: "rgba(0,0,0,.54)",
          "&.Mui-checked": { color: primary },
        }}
      />
      <Typography sx={{ fontSize: 16 }}>{label}</Typography>
    </Box>
  );
}

function VIcon({ icon }: { icon: string }) {
  const path = mdiPaths[icon];
  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      sx={{ ml: 0.5, width: 18, height: 18, display: "inline-block", verticalAlign: "middle" }}
    >
      <Box component="path" d={path} fill="currentColor" />
    </Box>
  );
}

function BaseHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <Typography
      id={id}
      variant="h5"
      sx={{ fontSize: { xs: 20, md: 22 }, lineHeight: 1.45, fontWeight: 400, mb: 2.5 }}
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
  "& .MuiInputBase-root": { height: 48, bgcolor: "#fff" },
  "& .MuiInputLabel-root": { fontSize: 16 },
  "& input": { py: 1.1 },
};

const mdiPaths: Record<string, string> = {
  "mdi-open-in-new": mdiOpenInNew,
};

const sourceTemplates = {
  usage: `<template>
  <div class="text-center">
    <v-btn
      color="error"
      @click="overlay = !overlay"
    >
      Show Overlay
    </v-btn>

    <v-overlay :value="overlay">
      <v-btn
        icon
        @click="overlay = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-overlay>
  </div>
</template>

<script>
  export default {
    data: () => ({
      overlay: false,
    }),
  }
</script>`,
  playground: `<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-row align="center">
        <v-btn
          class="mt-12"
          color="primary"
          @click="overlay = !overlay"
        >
          Show Overlay
        </v-btn>

        <v-overlay
          :absolute="absolute"
          :opacity="opacity"
          :value="overlay"
          :z-index="zIndex"
        >
          <v-btn
            color="primary"
            @click="overlay = false"
          >
            Hide Overlay
          </v-btn>
        </v-overlay>
      </v-row>
    </v-col>

    <v-row justify="center">
      <v-radio-group row>
        <v-checkbox
          v-model="absolute"
          label="Absolute"
        ></v-checkbox>
        <v-checkbox
          v-model="overlay"
          class="mx-6"
          label="value"
        ></v-checkbox>
        <v-text-field
          v-model="opacity"
          label="Opacity"
          max="1"
          min="0"
          step=".01"
          style="width: 125px"
          type="number"
          @keydown="false"
        ></v-text-field>
        <v-text-field
          v-model="zIndex"
          label="z-index"
          max="9999"
          min="-9999"
          step="1"
          style="width: 125px"
          type="number"
          @keydown="false"
        ></v-text-field>
      </v-radio-group>
    </v-row>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      absolute: false,
      opacity: 0.46,
      overlay: false,
      zIndex: 5,
    }),
  }
</script>`,
  "simple/absolute": `<template>
  <v-row align="center" justify="center">
    <v-card height="300" width="250">
      <v-row justify="center">
        <v-btn
          color="success"
          class="mt-12"
          @click="overlay = !overlay"
        >
          Show Overlay
        </v-btn>

        <v-overlay
          :absolute="absolute"
          :value="overlay"
        >
          <v-btn
            color="success"
            @click="overlay = false"
          >
            Hide Overlay
          </v-btn>
        </v-overlay>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      absolute: true,
      overlay: false,
    }),
  }
</script>`,
  "simple/opacity": `<template>
  <v-row align="center" justify="center">
    <v-card height="300" width="250">
      <v-row justify="center">
        <v-btn
          color="orange lighten-2"
          class="mt-12"
          @click="overlay = !overlay"
        >
          Show Overlay
        </v-btn>

        <v-overlay
          :absolute="absolute"
          :opacity="opacity"
          :value="overlay"
        >
          <v-btn
            color="orange lighten-2"
            @click="overlay = false"
          >
            Hide Overlay
          </v-btn>
        </v-overlay>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      absolute: true,
      opacity: 1,
      overlay: false,
    }),
  }
</script>`,
  "simple/z-index": `<template>
  <v-row justify="center">
    <v-btn
      class="white--text"
      color="teal"
      @click="overlay = !overlay"
    >
      Show Overlay
    </v-btn>

    <v-overlay
      :z-index="zIndex"
      :value="overlay"
    >
      <v-btn
        class="white--text"
        color="teal"
        @click="overlay = false"
      >
        Hide Overlay
      </v-btn>
    </v-overlay>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      overlay: false,
      zIndex: 0,
    }),
  }
</script>`,
  "intermediate/loader": `<template>
  <div class="text-center">
    <v-btn
      color="deep-purple accent-4"
      class="white--text"
      @click="overlay = !overlay"
    >
      Launch Application
      <v-icon right>mdi-open-in-new</v-icon>
    </v-btn>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
  export default {
    data: () => ({
      overlay: false,
    }),

    watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },
    },
  }
</script>`,
  "complex/advanced": `<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card class="mx-auto" max-width="344">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
        ></v-img>

        <v-card-text>
          <h2 class="title primary--text">Magento Forests</h2>
          Travel to the best outdoor experience on planet Earth. A vacation you
          will never forget!
        </v-card-text>

        <v-card-title>
          <v-rating
            :value="4"
            dense
            color="orange"
            background-color="orange"
            hover
            class="mr-2"
          ></v-rating>
          <span class="primary--text text-subtitle-2">64 Reviews</span>
        </v-card-title>

        <v-fade-transition>
          <v-overlay v-if="hover" absolute color="#036358">
            <v-btn>See more info</v-btn>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  data: () => ({
    overlay: false,
  }),
};
</script>`,
};
