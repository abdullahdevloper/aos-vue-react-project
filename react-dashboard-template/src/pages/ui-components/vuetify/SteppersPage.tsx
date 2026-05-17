import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  Collapse,
  IconButton,
  MenuItem,
  Slider,
  Switch,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Check, Code, Edit, GitHub, InvertColors, Warning, ViewHeadline } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const error = "#ff5252";
const greyLighten1 = "#bdbdbd";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const elevation2 = "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)";
const swing = "cubic-bezier(0.25, 0.8, 0.5, 1)";

type ExampleKey =
  | "usage"
  | "playground"
  | "simple/editable"
  | "simple/non-editable"
  | "simple/optional"
  | "simple/horizontal"
  | "simple/vertical"
  | "simple/linear"
  | "simple/non-linear"
  | "simple/alternate-labels"
  | "simple/error"
  | "simple/alternate-error"
  | "simple/vertical-error"
  | "intermediate/dynamic";

type StepDef = {
  step: number | string;
  label: ReactNode;
  complete?: boolean;
  editable?: boolean;
  error?: boolean;
};

export default function SteppersPage() {
  return (
    <DocPage
      title="Steppers"
      namespace="Components"
      icon={<ViewHeadline />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Steppers" },
      ]}
    >
      <DocText>The <CodePill>v-stepper</CodePill> component displays progress through numbered steps.</DocText>
      <Box component="section" sx={{ mb: 5 }}>
        <BaseHeading id="usage">Usage</BaseHeading>
        <VuetifyExampleBlock source="usage" description={<>A stepper can be used for a multitude of scenarios, including shopping carts, record creation and more.</>}>
          {() => <UsageExample />}
        </VuetifyExampleBlock>
      </Box>
      <Box component="section" sx={{ mb: 5 }}>
        <BaseHeading id="playground">Playground</BaseHeading>
        <VuetifyExampleBlock source="playground" description="">
          {() => <PlaygroundExample />}
        </VuetifyExampleBlock>
      </Box>
      <Box component="section" id="examples">
        <BaseHeading id="examples">Examples</BaseHeading>
        <ExampleSection title="Editable steps" source="simple/editable" description={<>An editable step can be selected by a user at any point and will navigate them to that step.</>}>{() => <EditableExample />}</ExampleSection>
        <ExampleSection title="Non-editable steps" source="simple/non-editable" description={<>Non-editable steps force a user to process linearly through your process.</>}>{() => <NonEditableExample />}</ExampleSection>
        <ExampleSection title="Optional steps" source="simple/optional" description={<>An optional step can be called out with sub-text.</>}>{() => <OptionalExample />}</ExampleSection>
        <ExampleSection title="Horizontal steps" source="simple/horizontal" description={<>Horizontal steppers move users along the x-axis through the defined steps.</>}>{() => <HorizontalExample />}</ExampleSection>
        <ExampleSection title="Vertical steppers" source="simple/vertical" description={<>Vertical steppers move users along the y-axis and otherwise work exactly the same as their horizontal counterpart.</>}>{() => <VerticalExample />}</ExampleSection>
        <ExampleSection title="Linear steppers" source="simple/linear" description={<>Linear steppers will always move a user through your defined path.</>}>{() => <LinearExample />}</ExampleSection>
        <ExampleSection title="Non-linear steppers" source="simple/non-linear" description={<>Non-linear steppers allow the user to move through your process in whatever way they choose.</>}>{() => <NonLinearExample />}</ExampleSection>
        <ExampleSection title="Alternate labels" source="simple/alternate-labels" description={<>Steppers also have an alternative label style which places the title under the step itself.</>}>{() => <AlternateLabelsExample />}</ExampleSection>
        <ExampleSection title="Multi-line error state" source="simple/error" description={<>An error state can be displayed to notify the user of some action that must be taken.</>}>{() => <ErrorExample />}</ExampleSection>
        <ExampleSection title="Alternative label multi-line error state" source="simple/alternate-error" description={<>The error state can also be applied to the alternative label style.</>}>{() => <AlternateErrorExample />}</ExampleSection>
        <ExampleSection title="Vertical multi-line error state" source="simple/vertical-error" description={<>The same state also applies to Vertical steppers.</>}>{() => <VerticalErrorExample />}</ExampleSection>
        <ExampleSection title="Dynamic steps" source="intermediate/dynamic" description={<>Steppers can have their steps dynamically added or removed. If a currently active step is removed, be sure to account for this by changing the applied model.</>}>{() => <DynamicExample />}</ExampleSection>
      </Box>
    </DocPage>
  );
}

function UsageExample() {
  const [active, setActive] = useState(1);
  const steps = [
    { step: 1, label: "Name of step 1", complete: active > 1 },
    { step: 2, label: "Name of step 2", complete: active > 2 },
    { step: 3, label: "Name of step 3" },
  ];
  return <StepperWithContent active={active} setActive={setActive} steps={steps} />;
}

function PlaygroundExample() {
  const [active, setActive] = useState(1);
  const [steps, setSteps] = useState(2);
  const [vertical, setVertical] = useState(false);
  const [altLabels, setAltLabels] = useState(false);
  const [editable, setEditable] = useState(true);

  useEffect(() => {
    if (active > steps) setActive(steps);
  }, [active, steps]);

  function toggleVertical(value: boolean) {
    setVertical(value);
    setActive(2);
    requestAnimationFrame(() => setActive(1));
  }

  const stepDefs = Array.from({ length: steps }, (_, index) => {
    const n = index + 1;
    return { step: n, label: `Step ${n}`, complete: active > n, editable };
  });

  return (
    <Box>
      <VRow justify="space-around">
        <VCol cols={12}>
          <Box sx={{ px: 1 }}>
            <Typography sx={{ fontSize: 16, mb: 0.5 }}>Steps</Typography>
            <Slider value={steps} min={2} max={20} step={1} onChange={(_, value) => setSteps(value as number)} sx={{ color: primary }} />
          </Box>
        </VCol>
        <VSwitch label="Vertical" checked={vertical} onChange={toggleVertical} />
        <VSwitch label="altLabels" checked={altLabels} onChange={setAltLabels} />
        <VSwitch label="Editable" checked={editable} onChange={setEditable} />
      </VRow>
      <StepperWithContent active={active} setActive={setActive} steps={stepDefs} vertical={vertical} altLabels={altLabels} editable={editable} />
    </Box>
  );
}

function EditableExample() {
  const [active, setActive] = useState(1);
  return (
    <VStepper active={active}>
      <StepperHeader
        active={active}
        onSelect={setActive}
        steps={[
          { step: 1, label: "Select campaign settings", complete: true, editable: true },
          { step: 2, label: "Create an ad group", complete: true },
          { step: 3, label: "Create an ad", editable: true },
        ]}
      />
    </VStepper>
  );
}

function NonEditableExample() {
  return (
    <VStepper active={2}>
      <StepperHeader steps={[{ step: 1, label: "Select campaign settings", complete: true }, { step: 2, label: "Create an ad group" }, { step: 3, label: "Create an ad" }]} />
    </VStepper>
  );
}

function OptionalExample() {
  const steps = [
    { step: 1, label: "Select campaign settings" },
    { step: 2, label: <>Create an ad group<small>Optional</small></> },
    { step: 3, label: "Create an ad" },
  ];
  return (
    <Box>
      <VStepper active={1}><StepperHeader steps={steps} /></VStepper>
      <VStepper active={2} sx={{ mt: 12 }}><StepperHeader steps={[{ ...steps[0], complete: true }, steps[1], steps[2]]} /></VStepper>
    </Box>
  );
}

function HorizontalExample() {
  return (
    <VStepper active={1}>
      <StepperHeader steps={[{ step: 1, label: "Select campaign settings" }, { step: 2, label: "Create an ad group" }, { step: 3, label: "Create an ad" }]} />
    </VStepper>
  );
}

function VerticalExample() {
  const [active, setActive] = useState(1);
  const steps = [
    { step: 1, label: <>Select an app<small>Summarize if needed</small></>, complete: active > 1 },
    { step: 2, label: "Configure analytics for this app", complete: active > 2 },
    { step: 3, label: "Select an ad format and name ad unit", complete: active > 3 },
    { step: 4, label: "View setup instructions" },
  ];
  return <StepperWithContent active={active} setActive={setActive} steps={steps} vertical />;
}

function LinearExample() {
  const base = [{ step: 1, label: "Select campaign settings" }, { step: 2, label: "Create an ad group" }, { step: 3, label: "Create an ad" }];
  return (
    <Box>
      <VStepper active={1}><StepperHeader steps={base} /></VStepper>
      <VStepper active={2} sx={{ mt: 12 }}><StepperHeader steps={[{ ...base[0], complete: true }, base[1], base[2]]} /></VStepper>
      <VStepper active={3} sx={{ mt: 12 }}><StepperHeader steps={[{ ...base[0], complete: true }, { ...base[1], complete: true }, base[2]]} /></VStepper>
    </Box>
  );
}

function NonLinearExample() {
  const [first, setFirst] = useState(1);
  const [second, setSecond] = useState(1);
  const [third, setThird] = useState(3);
  const base = [{ step: 1, label: "Select campaign settings", editable: true }, { step: 2, label: "Create an ad group", editable: true }, { step: 3, label: "Create an ad", editable: true }];
  return (
    <Box>
      <VStepper active={first} nonLinear><StepperHeader steps={base} active={first} onSelect={setFirst} nonLinear /></VStepper>
      <VStepper active={second} nonLinear sx={{ mt: 12 }}><StepperHeader steps={[{ ...base[0], complete: true }, base[1], { ...base[2], complete: true }]} active={second} onSelect={setSecond} nonLinear /></VStepper>
      <VStepper active={third} nonLinear sx={{ mt: 12 }}><StepperHeader steps={base.map((step) => ({ ...step, complete: true }))} active={third} onSelect={setThird} nonLinear /></VStepper>
    </Box>
  );
}

function AlternateLabelsExample() {
  return (
    <Box>
      <VStepper active={1} altLabels><StepperHeader steps={[{ step: 1, label: "Ad unit details" }, { step: 2, label: "Ad sizes" }, { step: 3, label: "Ad templates" }]} altLabels /></VStepper>
      <VStepper active={1} altLabels sx={{ mt: 12 }}><StepperHeader steps={[{ step: 1, label: "Ad unit details" }, { step: 2, label: <>Ad sizes<small>Optional</small></> }, { step: 3, label: "Ad templates" }]} altLabels /></VStepper>
    </Box>
  );
}

function ErrorExample() {
  return (
    <VStepper active={1}>
      <StepperHeader steps={[{ step: 1, label: "Ad unit details" }, { step: 2, label: <>Ad templates<small>Alert message</small></>, error: true }, { step: 3, label: "Ad sizes" }]} />
    </VStepper>
  );
}

function AlternateErrorExample() {
  return (
    <VStepper altLabels active={3}>
      <StepperHeader
        altLabels
        steps={[
          { step: 3, label: "Ad type", complete: true },
          { step: 4, label: "Ad style", complete: true },
          { step: 5, label: <>Custom channels<small>Alert message</small></>, error: true },
          { step: 6, label: "Get code" },
        ]}
      />
    </VStepper>
  );
}

function VerticalErrorExample() {
  const [active, setActive] = useState(2);
  const steps = [
    { step: 1, label: "Name of step 1", complete: true },
    { step: 2, label: "Name of step 2", complete: true },
    { step: 3, label: <>Ad templates<small>Alert message</small></>, error: true },
    { step: 4, label: "View setup instructions" },
  ];
  return <StepperWithContent active={active} setActive={setActive} steps={steps} vertical />;
}

function DynamicExample() {
  const [active, setActive] = useState(1);
  const [steps, setSteps] = useState(2);
  useEffect(() => {
    if (active > steps) setActive(steps);
  }, [active, steps]);
  const stepDefs = Array.from({ length: steps }, (_, index) => {
    const n = index + 1;
    return { step: n, label: `Step ${n}`, complete: active > n, editable: true };
  });
  return (
    <Box>
      <Card sx={{ mb: 4, boxShadow: elevation2, borderRadius: 1 }}>
        <Box sx={{ p: 2 }}>
          <TextField select label="# of steps" value={steps} onChange={(event) => setSteps(Number(event.target.value))} variant="standard" fullWidth>
            {[2, 3, 4, 5, 6].map((n) => <MenuItem key={n} value={n}>{n}</MenuItem>)}
          </TextField>
        </Box>
      </Card>
      <StepperWithContent active={active} setActive={setActive} steps={stepDefs} editable />
    </Box>
  );
}

function StepperWithContent({
  active,
  setActive,
  steps,
  vertical = false,
  altLabels = false,
  editable = false,
}: {
  active: number;
  setActive: (value: number) => void;
  steps: StepDef[];
  vertical?: boolean;
  altLabels?: boolean;
  editable?: boolean;
}) {
  function nextStep(n: number) {
    setActive(n === steps.length ? 1 : n + 1);
  }

  if (vertical) {
    return (
      <VStepper active={active} vertical>
        {steps.map((step, index) => {
          const value = Number(step.step);
          return (
            <Box key={step.step}>
              <StepperStep step={{ ...step, editable: step.editable ?? editable }} active={active} onSelect={setActive} vertical />
              <StepperContent active={active === value} vertical>
                <GreyCard />
                <VButton color="primary" onClick={() => nextStep(value)}>Continue</VButton>
                <VButton text>Cancel</VButton>
              </StepperContent>
            </Box>
          );
        })}
      </VStepper>
    );
  }

  return (
    <VStepper active={active} altLabels={altLabels}>
      <StepperHeader steps={steps.map((step) => ({ ...step, editable: step.editable ?? editable }))} active={active} onSelect={setActive} altLabels={altLabels} />
      <HorizontalStepperItems active={active}>
        {steps.map((step) => {
          const value = Number(step.step);
          return {
            step: value,
            content: (
              <StepperContent active>
                <GreyCard />
                <VButton color="primary" onClick={() => nextStep(value)}>Continue</VButton>
                <VButton text>Cancel</VButton>
              </StepperContent>
            ),
          };
        })}
      </HorizontalStepperItems>
    </VStepper>
  );
}

function VStepper({ children, active, vertical = false, altLabels = false, nonLinear = false, sx = {} }: { children: ReactNode; active?: number; vertical?: boolean; altLabels?: boolean; nonLinear?: boolean; sx?: Record<string, unknown> }) {
  return (
    <Box
      className={`v-stepper${vertical ? " v-stepper--vertical" : ""}${altLabels ? " v-stepper--alt-labels" : ""}${nonLinear ? " v-stepper--non-linear" : ""}`}
      sx={{
        bgcolor: "#fff",
        borderRadius: 1,
        boxShadow: elevation2,
        overflow: "hidden",
        position: "relative",
        pb: vertical ? "36px" : 0,
        ...sx,
      }}
      data-active={active}
    >
      {children}
    </Box>
  );
}

function StepperHeader({ steps, active = 1, onSelect, altLabels = false, nonLinear = false }: { steps: StepDef[]; active?: number; onSelect?: (value: number) => void; altLabels?: boolean; nonLinear?: boolean }) {
  return (
    <Box className="v-stepper__header" sx={{ alignItems: "stretch", display: "flex", flexWrap: "wrap", height: altLabels ? "auto" : 72, justifyContent: "space-between", boxShadow: elevation2 }}>
      {steps.map((step, index) => (
        <Fragment key={step.step}>
          <StepperStep step={step} active={active} onSelect={onSelect} altLabels={altLabels} nonLinear={nonLinear} />
          {index !== steps.length - 1 && <VDivider altLabels={altLabels} />}
        </Fragment>
      ))}
    </Box>
  );
}

function StepperStep({ step, active, onSelect, altLabels = false, vertical = false, nonLinear = false }: { step: StepDef; active: number; onSelect?: (value: number) => void; altLabels?: boolean; vertical?: boolean; nonLinear?: boolean }) {
  const value = Number(step.step);
  const isActive = active.toString() === step.step.toString();
  const isInactive = active < value;
  const editable = Boolean(step.editable);
  const complete = Boolean(step.complete);
  const hasError = Boolean(step.error);
  const color = hasError ? error : complete || isActive ? primary : "rgba(0,0,0,.38)";
  const labelColor = hasError ? error : complete ? "rgba(0,0,0,.87)" : nonLinear ? "rgba(0,0,0,.6)" : isActive ? "rgba(0,0,0,.87)" : "rgba(0,0,0,.38)";
  const icon = hasError ? <Warning sx={{ fontSize: 24 }} /> : complete ? editable ? <Edit sx={{ fontSize: 20 }} /> : <Check sx={{ fontSize: 20 }} /> : step.step;

  return (
    <Box
      className="v-stepper__step"
      onClick={(event) => {
        event.stopPropagation();
        if (editable) onSelect?.(value);
      }}
      sx={{
        alignItems: "center",
        cursor: editable ? "pointer" : "default",
        display: "flex",
        flexBasis: altLabels ? 175 : "auto",
        flexDirection: altLabels ? "column" : "row",
        justifyContent: altLabels ? "flex-start" : "initial",
        p: vertical ? "24px 24px 16px" : "24px",
        position: "relative",
        "&:hover": editable ? { bgcolor: "rgba(0,0,0,.06)" } : undefined,
        "@media (max-width: 960px)": !vertical && !altLabels ? { "& .v-stepper__label": { display: "none" }, "& .v-stepper__step__step": { mr: 0 } } : undefined,
      }}
    >
      <Box
        className="v-stepper__step__step"
        sx={{
          alignItems: "center",
          bgcolor: hasError ? "transparent" : color,
          borderRadius: "50%",
          color: hasError ? error : "#fff",
          display: "inline-flex",
          fontSize: 12,
          height: 24,
          justifyContent: "center",
          mb: altLabels ? "11px" : 0,
          minWidth: 24,
          mr: altLabels ? 0 : vertical ? "12px" : "8px",
          transition: ".3s cubic-bezier(.4,0,.6,1)",
          width: 24,
        }}
      >
        {icon}
      </Box>
      <Box className="v-stepper__label" sx={{ alignItems: altLabels ? "center" : "flex-start", color: labelColor, display: "flex", flexDirection: "column", fontWeight: hasError ? 500 : 400, lineHeight: 1, textAlign: altLabels ? "center" : "left", textShadow: isActive || editable ? "0 0 0 rgba(0,0,0,1)" : "none", "& small": { color: hasError ? error : "rgba(0,0,0,.6)", fontSize: 12, fontWeight: 300, mt: 0.5, textShadow: "none" } }}>
        {step.label}
      </Box>
    </Box>
  );
}

function VDivider({ altLabels }: { altLabels?: boolean }) {
  return <Box className="v-divider" sx={{ alignSelf: altLabels ? "flex-start" : "center", borderTop: "1px solid rgba(0,0,0,.12)", flex: "1 1 0", m: altLabels ? "35px -67px 0" : "0 -16px" }} />;
}

function HorizontalStepperItems({ active, children }: { active: number; children: Array<{ step: number; content: ReactNode }> }) {
  const previousActive = useRef(active);
  const [leaving, setLeaving] = useState<{ step: number; content: ReactNode; reverse: boolean } | null>(null);
  const [reverse, setReverse] = useState(false);
  const current = children.find((child) => child.step === active) || children[0];

  useEffect(() => {
    if (previousActive.current === active) return;
    const previous = children.find((child) => child.step === previousActive.current);
    const isReverse = active < previousActive.current;
    if (previous) setLeaving({ ...previous, reverse: isReverse });
    setReverse(isReverse);
    previousActive.current = active;
    const timeout = window.setTimeout(() => setLeaving(null), 300);
    return () => window.clearTimeout(timeout);
  }, [active, children]);

  return (
    <Box
      className="v-stepper__items"
      sx={{
        position: "relative",
        overflow: "hidden",
        "@keyframes stepTabEnter": { from: { transform: "translate(100%, 0)" }, to: { transform: "translate(0, 0)" } },
        "@keyframes stepTabLeave": { from: { transform: "translate(0, 0)" }, to: { transform: "translate(-100%, 0)" } },
        "@keyframes stepTabReverseEnter": { from: { transform: "translate(-100%, 0)" }, to: { transform: "translate(0, 0)" } },
        "@keyframes stepTabReverseLeave": { from: { transform: "translate(0, 0)" }, to: { transform: "translate(100%, 0)" } },
      }}
    >
      {leaving && (
        <Box
          key={`leaving-${leaving.step}`}
          sx={{
            animation: `${leaving.reverse ? "stepTabReverseLeave" : "stepTabLeave"} .3s ${swing}`,
            left: 0,
            position: "absolute",
            top: 0,
            width: "100%",
          }}
        >
          {leaving.content}
        </Box>
      )}
      <Box
        key={`active-${current.step}`}
        sx={{
          animation: `${reverse ? "stepTabReverseEnter" : "stepTabEnter"} .3s ${swing}`,
          position: "relative",
          width: "100%",
        }}
      >
        {current.content}
      </Box>
    </Box>
  );
}

function StepperContent({ children, active, vertical = false }: { children: ReactNode; active: boolean; vertical?: boolean }) {
  return (
    <Box
      className="v-stepper__content"
      sx={{
        borderLeft: vertical ? "1px solid rgba(0,0,0,.12)" : 0,
        display: !vertical && !active ? "none" : "block",
        flex: "1 0 auto",
        ml: vertical ? "36px" : 0,
        mr: vertical ? "-36px" : 0,
        mt: vertical ? "-8px" : 0,
        mb: vertical ? "-16px" : 0,
        p: vertical ? "16px 60px 16px 23px" : "24px 24px 16px",
        width: vertical ? "auto" : "100%",
      }}
    >
      <Box
        className="v-stepper__wrapper"
        sx={{
          maxHeight: vertical ? (active ? 360 : 0) : "none",
          overflow: "hidden",
          transition: vertical ? `.3s ${swing}` : "none",
          transitionProperty: vertical ? "max-height" : "none",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function GreyCard() {
  return <Card sx={{ bgcolor: greyLighten1, height: 200, mb: 12, borderRadius: 1, boxShadow: "none" }} />;
}

function VButton({ children, color, text = false, onClick }: { children: ReactNode; color?: string; text?: boolean; onClick?: () => void }) {
  const bg = color === "primary" ? primary : "transparent";
  return (
    <Button
      onClick={onClick}
      sx={{
        bgcolor: text ? "transparent" : bg,
        borderRadius: 1,
        boxShadow: text ? "none" : elevation2,
        color: text ? "rgba(0,0,0,.87)" : "#fff",
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: "0.0892857143em",
        m: "24px 8px 8px 0",
        minWidth: 64,
        px: 2,
        textTransform: "uppercase",
        "&:hover": { bgcolor: text ? "rgba(0,0,0,.04)" : bg },
      }}
    >
      {children}
    </Button>
  );
}

function VRow({ children, justify = "flex-start" }: { children: ReactNode; justify?: string }) {
  return <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: justify, mx: "-12px" }}>{children}</Box>;
}

function VCol({ children, cols = 12 }: { children: ReactNode; cols?: number }) {
  return <Box sx={{ flex: `0 0 ${(cols / 12) * 100}%`, maxWidth: `${(cols / 12) * 100}%`, px: "12px" }}>{children}</Box>;
}

function VSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <Box onClick={() => onChange(!checked)} sx={{ display: "flex", alignItems: "center", cursor: "pointer", minHeight: 48, px: 2 }}>
      <Switch checked={checked} sx={{ color: primary, "& .MuiSwitch-switchBase.Mui-checked": { color: primary }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: primary } }} />
      <Typography sx={{ fontSize: 16 }}>{label}</Typography>
    </Box>
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

function VuetifyExampleBlock({ title = "", description, source, children }: { title?: string; description: ReactNode; source: ExampleKey; children: () => ReactNode }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card sx={{ mb: 5, bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
        <Typography sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>{title}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", overflowX: "auto", p: 2 }}>
          <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box>
        </Box>
      </Collapse>
      <Box sx={{ bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", p: 2, overflow: "visible" }}>
        {description && <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography>}
        <Box data-app="true">{children()}</Box>
      </Box>
    </Card>
  );
}

function BaseHeading({ id, children }: { id: string; children: ReactNode }) {
  return <Typography id={id} component="h2" sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400, mb: 2 }}>{children}</Typography>;
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: 0.55, py: 0.18, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: 0.5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

const sourceTemplates: Record<ExampleKey, string> = {
  usage: "src/demo/examples/steppers/usage.vue",
  playground: "src/demo/examples/steppers/playground.vue",
  "simple/editable": "src/demo/examples/steppers/simple/editable.vue",
  "simple/non-editable": "src/demo/examples/steppers/simple/non-editable.vue",
  "simple/optional": "src/demo/examples/steppers/simple/optional.vue",
  "simple/horizontal": "src/demo/examples/steppers/simple/horizontal.vue",
  "simple/vertical": "src/demo/examples/steppers/simple/vertical.vue",
  "simple/linear": "src/demo/examples/steppers/simple/linear.vue",
  "simple/non-linear": "src/demo/examples/steppers/simple/non-linear.vue",
  "simple/alternate-labels": "src/demo/examples/steppers/simple/alternate-labels.vue",
  "simple/error": "src/demo/examples/steppers/simple/error.vue",
  "simple/alternate-error": "src/demo/examples/steppers/simple/alternate-error.vue",
  "simple/vertical-error": "src/demo/examples/steppers/simple/vertical-error.vue",
  "intermediate/dynamic": "src/demo/examples/steppers/intermediate/dynamic.vue",
};
