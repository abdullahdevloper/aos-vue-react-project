import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Slider,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { CheckCircle, Input } from "@mui/icons-material";
import VuseSectionDefinition from "../../components/layout/VuseSectionDefinition";

type FieldName = keyof FormState;

interface FormState {
  first: string;
  last: string;
  email: string;
  bio: string;
  favoriteAnimal: string;
  city: string;
  state: string;
  pincode: string;
  age: number | "";
  terms: boolean;
}

type DirtyState = Record<FieldName, boolean>;

const defaultForm: FormState = {
  first: "",
  last: "",
  email: "",
  bio: "",
  favoriteAnimal: "",
  city: "",
  state: "",
  pincode: "",
  age: "",
  terms: false,
};

const defaultDirty: DirtyState = {
  first: false,
  last: false,
  email: false,
  bio: false,
  favoriteAnimal: false,
  city: false,
  state: false,
  pincode: false,
  age: false,
  terms: false,
};

const animals = ["Dog", "Cat", "Rabbit", "Turtle", "Snake"];
const dialogContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.";

const neuGlow = "-7px -7px 5px rgba(255,255,255,.86), 7px 7px 7px rgba(174,174,192,.30)";

export default function FormsPage() {
  return (
    <Box className="vuse-content-wrapper">
      <VuseSectionDefinition
        title="Forms"
        icon={<Input />}
        breadcrumbs={[
          { label: "User Interface" },
          { label: "Forms" },
        ]}
      />
      <Box sx={{ px: { xs: 0, sm: 1.5, md: 2 }, pb: 2, overflowX: "hidden" }}>
        <BasicForm />
      </Box>
    </Box>
  );
}

function BasicForm() {
  const [form, setForm] = useState<FormState>({ ...defaultForm });
  const [dirty, setDirty] = useState<DirtyState>({ ...defaultDirty });
  const [termsOpen, setTermsOpen] = useState(false);
  const [conditionsOpen, setConditionsOpen] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const validation = useMemo(() => buildValidation(form, dirty), [form, dirty]);
  const invalid = validation.$invalid;

  function update<K extends FieldName>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function touch(field: FieldName) {
    setDirty((current) => ({ ...current, [field]: true }));
  }

  function touchAll() {
    const allDirty = Object.keys(defaultDirty).reduce((acc, field) => ({ ...acc, [field]: true }), {} as DirtyState);
    setDirty(allDirty);
  }

  function resetForm() {
    setForm({ ...defaultForm });
    setDirty({ ...defaultDirty });
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    touchAll();
    if (invalid) return;
    setSnackbar(true);
    resetForm();
  }

  return (
    <Grid container spacing={3} sx={{ width: "100%", m: 0 }}>
      <Grid item xs={12} md={6}>
        <Card sx={{ ...softCardSx, minHeight: { md: 848 } }}>
          <Snackbar
            open={snackbar}
            onClose={() => setSnackbar(false)}
            autoHideDuration={2600}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            sx={{ position: "absolute", top: 8, right: 8, left: "auto", bottom: "auto" }}
          >
            <Alert icon={<CheckCircle fontSize="small" />} severity="success" sx={{ bgcolor: "success.main", color: "#fff", alignItems: "center", "& .MuiAlert-icon": { color: "#fff" } }}>
              Registration successful!
            </Alert>
          </Snackbar>

          <CardHeader title="Reactive Form Example" titleTypographyProps={{ sx: { fontSize: 24, fontWeight: 400 } }} sx={{ px: 2, pt: 2, pb: 0.5 }} />

          <Box component="form" onSubmit={submit}>
            <CardContent sx={{ px: 1.5, pt: 2.5, pb: 0 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <VuseTextField label="First name" value={form.first} onChange={(value) => update("first", value)} onBlur={() => touch("first")} errors={fieldErrors(validation.form.first, "first")} color="#00838f" required />
                </Grid>
                <Grid item xs={12} md={6}>
                  <VuseTextField label="Last name" value={form.last} onChange={(value) => update("last", value)} onBlur={() => touch("last")} errors={fieldErrors(validation.form.last, "last")} color="#7b1fa2" required />
                </Grid>
                <Grid item xs={12}>
                  <VuseTextField label="Email" value={form.email} onChange={(value) => update("email", value)} onBlur={() => touch("email")} errors={fieldErrors(validation.form.email, "email")} color="#7b1fa2" required />
                </Grid>
                <Grid item xs={12}>
                  <VuseTextField label="Bio (optional)" value={form.bio} onChange={(value) => update("bio", value)} multiline minRows={4} color="#009688" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="filled" error={fieldErrors(validation.form.favoriteAnimal, "favoriteAnimal").length > 0} sx={selectSx("#e91e63")}>
                    <Select
                      displayEmpty
                      value={form.favoriteAnimal}
                      onChange={(event) => update("favoriteAnimal", event.target.value)}
                      onBlur={() => touch("favoriteAnimal")}
                      renderValue={(selected) => selected ? selected : <Box component="span" sx={{ color: "text.secondary" }}>Favorite animal</Box>}
                    >
                      {animals.map((animal) => <MenuItem key={animal} value={animal}>{animal}</MenuItem>)}
                    </Select>
                    {fieldErrors(validation.form.favoriteAnimal, "favoriteAnimal").length > 0
                      ? fieldErrors(validation.form.favoriteAnimal, "favoriteAnimal").map((error) => <FormHelperText key={error}>{error}</FormHelperText>)
                      : <FormHelperText> </FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ px: 0.75, pt: 0.35 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minHeight: 32 }}>
                      <Typography sx={{ color: fieldErrors(validation.form.age, "age").length ? "error.main" : "text.secondary", fontSize: 15, lineHeight: 1 }}>Age</Typography>
                      <Slider min={1} max={100} value={form.age === "" ? 1 : form.age} onChange={(_, value) => update("age", value as number)} onChangeCommitted={() => touch("age")} valueLabelDisplay="auto" sx={sliderSx} />
                    </Box>
                    <Typography sx={{ ml: 6.1, mt: -0.25, fontSize: 12, color: "text.secondary" }}>Be honest</Typography>
                    {fieldErrors(validation.form.age, "age").map((error) => <FormHelperText error key={error}>{error}</FormHelperText>)}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <VuseTextField label="City" value={form.city} onChange={(value) => update("city", value)} onBlur={() => touch("city")} errors={fieldErrors(validation.form.city, "city")} color="#7b1fa2" required />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <VuseTextField label="State" value={form.state} onChange={(value) => update("state", value)} onBlur={() => touch("state")} errors={fieldErrors(validation.form.state, "state")} color="#7b1fa2" required />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <VuseTextField label="Pincode" value={form.pincode} onChange={(value) => { update("pincode", value); touch("pincode"); }} onBlur={() => touch("pincode")} errors={fieldErrors(validation.form.pincode, "pincode")} color="#7b1fa2" required />
                </Grid>
                <Grid item xs={12}>
                  <FormControl error={fieldErrors(validation.form.terms, "terms").length > 0} component="fieldset" sx={{ width: "100%", mt: 1.8 }}>
                    <FormControlLabel
                      control={<Checkbox checked={form.terms} onChange={(event) => { update("terms", event.target.checked); touch("terms"); }} sx={checkboxSx} />}
                      label={<TermsLabel onTerms={() => setTermsOpen(true)} onConditions={() => setConditionsOpen(true)} />}
                      sx={{ alignItems: "center", ml: -0.15, "& .MuiFormControlLabel-label": { pt: 0, fontSize: 15.5, color: "text.secondary" } }}
                    />
                    {fieldErrors(validation.form.terms, "terms").map((error) => <FormHelperText key={error}>{error}</FormHelperText>)}
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>

            <CardActions sx={{ px: 2, pt: 4.4, pb: 1.7 }}>
              <Button type="button" onClick={resetForm} sx={textButtonSx("text.secondary")}>Cancel</Button>
              <Box sx={{ flexGrow: 1 }} />
              <Button type="submit" disabled={invalid} sx={textButtonSx("primary.main")}>Register</Button>
            </CardActions>
          </Box>

          <TermsDialog open={termsOpen} title="Terms" onClose={() => setTermsOpen(false)} />
          <TermsDialog open={conditionsOpen} title="Conditions" onClose={() => setConditionsOpen(false)} />
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card sx={softCardSx}>
          <CardHeader title="Reactive Form Validation" titleTypographyProps={{ sx: { fontSize: 24, fontWeight: 400 } }} sx={{ px: 2, pt: 2, pb: 0.5 }} />
          <CardContent sx={jsonPanelSx}>
            <Box component="pre" sx={{ m: 0, fontSize: 14, lineHeight: 1.38, fontFamily: "'Roboto Mono', Consolas, monospace", whiteSpace: "pre-wrap" }}>
              {JSON.stringify(validation, null, 2)}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

function VuseTextField({ label, value, onChange, onBlur, errors = [], color, required = false, multiline = false, minRows }: { label: string; value: string; onChange: (value: string) => void; onBlur?: () => void; errors?: string[]; color: string; required?: boolean; multiline?: boolean; minRows?: number }) {
  return (
    <TextField
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      placeholder={label}
      inputProps={{ "aria-required": required || undefined }}
      fullWidth
      variant="filled"
      multiline={multiline}
      minRows={minRows}
      error={errors.length > 0}
      helperText={errors[0] || " "}
      sx={textFieldSx(color)}
    />
  );
}

function TermsLabel({ onTerms, onConditions }: { onTerms: () => void; onConditions: () => void }) {
  return (
    <span>
      Do you accept the{" "}
      <Box component="a" href="javascript:;" onClick={(event) => { event.preventDefault(); event.stopPropagation(); onTerms(); }} sx={linkSx}>terms</Box>{" "}
      and{" "}
      <Box component="a" href="javascript:;" onClick={(event) => { event.preventDefault(); event.stopPropagation(); onConditions(); }} sx={linkSx}>conditions?</Box>
    </span>
  );
}

function TermsDialog({ open, title, onClose }: { open: boolean; title: string; onClose: () => void }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={false} PaperProps={{ sx: { width: "70%", bgcolor: "background.paper", borderRadius: 1, backgroundImage: "none" } }}>
      <DialogTitle sx={{ fontSize: 20, fontWeight: 500 }}>{title}</DialogTitle>
      <DialogContent>
        {Array.from({ length: 5 }, (_, index) => (
          <Typography key={index} sx={{ color: "text.secondary", fontSize: 16, lineHeight: 1.6, mb: 2 }}>{dialogContent}</Typography>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={textButtonSx("#7b1fa2")}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

function buildValidation(form: FormState, dirty: DirtyState) {
  const field = {
    first: validationField(dirty.first, { required: Boolean(form.first.trim()) }),
    last: validationField(dirty.last, { required: Boolean(form.last.trim()) }),
    email: validationField(dirty.email, { required: Boolean(form.email.trim()), email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) }),
    bio: validationField(dirty.bio, {}),
    favoriteAnimal: validationField(dirty.favoriteAnimal, { required: Boolean(form.favoriteAnimal) }),
    city: validationField(dirty.city, { required: Boolean(form.city.trim()) }),
    state: validationField(dirty.state, { required: Boolean(form.state.trim()) }),
    pincode: validationField(dirty.pincode, { required: Boolean(form.pincode.trim()), maxLength: form.pincode.length <= 5 }),
    age: validationField(dirty.age, { required: form.age !== "" && form.age !== null }),
    terms: validationField(dirty.terms, { required: form.terms === true }),
  };

  const invalid = Object.values(field).some((item) => item.$invalid);
  const anyDirty = Object.values(field).some((item) => item.$dirty);

  return {
    form: field,
    $dirty: anyDirty,
    $invalid: invalid,
    $error: anyDirty && invalid,
    $anyDirty: anyDirty,
  };
}

function validationField(dirty: boolean, rules: Record<string, boolean>) {
  const invalid = Object.values(rules).some((value) => value === false);
  return {
    ...rules,
    $dirty: dirty,
    $invalid: invalid,
    $error: dirty && invalid,
  };
}

function fieldErrors(field: ReturnType<typeof validationField>, name: Exclude<FieldName, "bio">) {
  if (!field.$dirty) return [];
  const messages: Record<string, Record<string, string>> = {
    first: { required: "First name is required" },
    last: { required: "Last name is required" },
    favoriteAnimal: { required: "Choose your favorite animal" },
    age: { required: "Age is required" },
    city: { required: "City is required" },
    state: { required: "State is required" },
    email: { required: "Email is required", email: "Email must be valid" },
    pincode: { required: "Pincode is required", maxLength: "Max 5 characters" },
    terms: { required: "" },
  };
  return Object.entries(messages[name]).flatMap(([rule, message]) => field[rule as keyof typeof field] === false && message ? [message] : []);
}

const softCardSx = {
  position: "relative",
  bgcolor: "background.default",
  borderRadius: 1,
  boxShadow: neuGlow,
  backgroundImage: "none",
  overflow: "hidden",
};

const textFieldSx = (color: string) => ({
  "& .MuiFilledInput-root": {
    bgcolor: "#fff",
    borderRadius: 1,
    minHeight: 48,
    boxShadow: "0 2px 6px rgba(38,50,56,.18)",
    border: "1px solid rgba(38,50,56,.06)",
    "&:before, &:after": { display: "none" },
    "&:hover": { bgcolor: "#fff", borderColor: `${color}66` },
    "&.Mui-focused": { bgcolor: "#fff", borderColor: color },
    "&.Mui-error": { borderColor: "#f44336" },
  },
  "& .MuiFilledInput-input": { py: 1.45, px: 1.5, fontSize: 15.5, color: "text.primary", "&::placeholder": { color: "text.secondary", opacity: 1 } },
  "& .MuiFilledInput-inputMultiline": { py: 1.1 },
  "& .MuiFormHelperText-root": { minHeight: 18, mx: 0.5, mt: 0.65 },
});

const selectSx = (color: string) => ({
  ...textFieldSx(color),
  "& .MuiFilledInput-root": {
    ...textFieldSx(color)["& .MuiFilledInput-root"],
    minHeight: 48,
  },
  "& .MuiSelect-select": { py: 1.45, px: 1.5, fontSize: 15.5, minHeight: "auto !important" },
  "& .MuiSelect-icon": { right: 12, color: "text.secondary" },
});

const sliderSx = {
  color: "#fb8c00",
  flex: 1,
  height: 2,
  py: 1.2,
  "& .MuiSlider-rail": { color: "rgba(38,50,56,.18)", opacity: 1 },
  "& .MuiSlider-track": { border: 0, color: "#00a6b6" },
  "& .MuiSlider-thumb": { width: 20, height: 20, bgcolor: "#fb8c00", boxShadow: "0 2px 5px rgba(38,50,56,.18)", "&:hover, &.Mui-focusVisible": { boxShadow: "0 2px 5px rgba(38,50,56,.22)" } },
  "& .MuiSlider-valueLabel": { bgcolor: "#fb8c00", color: "#fff" },
};

const checkboxSx = {
  color: "#2e7d32",
  p: 0.35,
  mr: 1.2,
  "&.Mui-checked": { color: "#2e7d32" },
  "& .MuiSvgIcon-root": { fontSize: 20 },
};

const jsonPanelSx = {
  color: "#2196f3",
  minHeight: 748,
  maxHeight: 748,
  height: 748,
  overflowY: "auto",
  px: 2,
  pt: 1.25,
  pb: 1.5,
};

const textButtonSx = (color: string) => ({
  color,
  textTransform: "uppercase",
  fontWeight: 500,
  letterSpacing: ".08em",
  fontSize: 13,
  px: 1.2,
  minHeight: 36,
  "&:hover": { bgcolor: "rgba(0,131,143,.08)" },
  "&.Mui-disabled": { color: "rgba(0,0,0,.26)" },
});

const linkSx = {
  color: "primary.main",
  textDecoration: "none",
  cursor: "pointer",
  "&:hover": { textDecoration: "underline" },
};
