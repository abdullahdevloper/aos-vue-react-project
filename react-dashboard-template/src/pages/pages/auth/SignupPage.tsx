import { useMemo, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CheckCircle, Email, EnhancedEncryption, Lock, Person, Visibility, VisibilityOff } from "@mui/icons-material";
import AuthShell from "./AuthShell";
import welcomeImage from "../../../assets/pages/illustrator/welcome.png";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    repeatPassword: false,
    agreeToPolicy: false,
  });

  const errors = useMemo(
    () => ({
      name: !name ? "Name is required." : "",
      email: !email ? "Please enter email" : !emailPattern.test(email) ? "Email must be valid" : "",
      password: !password ? "Please enter password" : password.length < 6 ? "Password must be of 6 characters" : "",
      repeatPassword: !repeatPassword ? "" : repeatPassword !== password ? "Password does not match" : "",
      agreeToPolicy: !agreeToPolicy ? "Required" : "",
    }),
    [agreeToPolicy, email, name, password, repeatPassword],
  );
  const isInvalid = Boolean(errors.name || errors.email || errors.password || errors.repeatPassword || errors.agreeToPolicy || !repeatPassword);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ name: true, email: true, password: true, repeatPassword: true, agreeToPolicy: true });
    if (isInvalid) return;

    setSnackbarOpen(true);
    setName("");
    setEmail("");
    setPassword("");
    setRepeatPassword("");
    setAgreeToPolicy(false);
    setTouched({ name: false, email: false, password: false, repeatPassword: false, agreeToPolicy: false });
    window.setTimeout(() => navigate("/dashboard/operational"), 2000);
  }

  return (
    <AuthShell illustration={welcomeImage} illustrationAlt="Welcome illustration">
      <Box sx={{ px: { xs: 3, sm: 4 }, py: { xs: 3.7, sm: 4.35 } }}>
        <Stack alignItems="center" sx={{ mb: 2.8 }}>
          <Typography component="h1" sx={{ fontSize: { xs: 32, sm: 34 }, lineHeight: 1.15, color: "text.primary", fontWeight: 400 }}>
            <Box component="span" sx={{ fontWeight: 800 }}>
              Vuse
            </Box>{" "}
            Admin
          </Typography>
          <Typography sx={{ mt: 0.85, fontSize: 16, color: "text.secondary" }}>Create Account</Typography>
        </Stack>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ maxWidth: 380, mx: "auto" }}>
          <Stack spacing={1.1}>
            <TextField
              value={name}
              placeholder="Name"
              onChange={(event) => setName(event.target.value)}
              onBlur={() => setTouched((value) => ({ ...value, name: true }))}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name ? errors.name : " "}
              fullWidth
              variant="filled"
              inputProps={{ "aria-label": "Name" }}
              InputProps={{ startAdornment: <InputAdornment position="start"><Person sx={{ fontSize: 21 }} /></InputAdornment> }}
              sx={authTextFieldSx}
            />
            <TextField
              value={email}
              placeholder="Email"
              onChange={(event) => {
                setEmail(event.target.value);
                setTouched((value) => ({ ...value, email: true }));
              }}
              onBlur={() => setTouched((value) => ({ ...value, email: true }))}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email ? errors.email : " "}
              fullWidth
              variant="filled"
              inputProps={{ "aria-label": "Email" }}
              InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ fontSize: 21 }} /></InputAdornment> }}
              sx={authTextFieldSx}
            />
            <TextField
              value={password}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              onChange={(event) => {
                setPassword(event.target.value);
                setTouched((value) => ({ ...value, password: true }));
              }}
              onBlur={() => setTouched((value) => ({ ...value, password: true }))}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password ? errors.password : " "}
              fullWidth
              variant="filled"
              inputProps={{ "aria-label": "Password" }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Lock sx={{ fontSize: 21 }} /></InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="Toggle password visibility" onClick={() => setShowPassword((value) => !value)} edge="end" size="small" sx={{ color: "text.secondary" }}>
                      {showPassword ? <Visibility sx={{ fontSize: 21 }} /> : <VisibilityOff sx={{ fontSize: 21 }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={authTextFieldSx}
            />
            <TextField
              value={repeatPassword}
              placeholder="Confirm Password"
              type="password"
              onChange={(event) => {
                setRepeatPassword(event.target.value);
                setTouched((value) => ({ ...value, repeatPassword: true }));
              }}
              onBlur={() => setTouched((value) => ({ ...value, repeatPassword: true }))}
              error={touched.repeatPassword && Boolean(errors.repeatPassword || !repeatPassword)}
              helperText={touched.repeatPassword ? errors.repeatPassword : " "}
              fullWidth
              variant="filled"
              inputProps={{ "aria-label": "Confirm Password" }}
              InputProps={{ startAdornment: <InputAdornment position="start"><EnhancedEncryption sx={{ fontSize: 21 }} /></InputAdornment> }}
              sx={authTextFieldSx}
            />

            <FormControlLabel
              control={<Checkbox checked={agreeToPolicy} onChange={(event) => setAgreeToPolicy(event.target.checked)} onBlur={() => setTouched((value) => ({ ...value, agreeToPolicy: true }))} sx={authCheckboxSx} />}
              label={
                <Typography component="span" sx={{ fontSize: 15, color: "text.secondary", lineHeight: 1.45 }}>
                  Agree to{" "}
                  <Button component="span" onClick={(event) => event.stopPropagation()} sx={policyButtonSx}>
                    terms & privacy policy
                  </Button>
                  .
                </Typography>
              }
              sx={{ alignItems: "center", m: 0, mt: -0.4, mb: 0.35 }}
            />

            <Button type="submit" fullWidth disabled={isInvalid} sx={authButtonSx}>
              Sign Up
            </Button>
            <Typography sx={{ textAlign: "center", mt: 1.55, mb: 1.2, fontSize: 15, color: "text.secondary" }}>
              Already have account ?{" "}
              <Link component={RouterLink} to="/pages/authentication/login" underline="none" sx={authLinkSx}>
                Login
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Box>
      <Snackbar open={snackbarOpen} anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={1800} onClose={() => setSnackbarOpen(false)}>
        <Alert severity="success" icon={<CheckCircle fontSize="inherit" />} sx={{ alignItems: "center" }}>
          Signed In Successfully
        </Alert>
      </Snackbar>
    </AuthShell>
  );
}

const authTextFieldSx = {
  "& .MuiFilledInput-root": {
    minHeight: 50,
    height: 50,
    bgcolor: "#fff",
    borderRadius: 1,
    boxShadow: "none",
    border: "1px solid transparent",
    alignItems: "center",
    transition: "border-color 140ms ease, background-color 140ms ease",
    "&:before, &:after": { display: "none" },
    "&:hover": { bgcolor: "#fff", borderColor: "rgba(0,131,143,.22)" },
    "&.Mui-focused": { bgcolor: "#fff", borderColor: "#00838f" },
    "&.Mui-error": { borderColor: "#ff5252" },
  },
  "& .MuiFilledInput-input": {
    height: 50,
    boxSizing: "border-box",
    py: "0 !important",
    fontSize: 15.5,
    lineHeight: "50px",
    "&::placeholder": { opacity: 0.72, color: "text.secondary" },
  },
  "& .MuiInputAdornment-root": {
    color: "text.secondary",
    mt: "0 !important",
    height: 50,
    maxHeight: 50,
    alignItems: "center",
  },
  "& .MuiInputAdornment-positionStart": { ml: 1.15, mr: 0.85 },
  "& .MuiInputAdornment-positionEnd": { mr: 0.65 },
  "& .MuiFormHelperText-root": { minHeight: 18, mx: 1.5, mt: 0.35, fontSize: 12.5, lineHeight: 1.35 },
};

const authCheckboxSx = {
  p: 0.65,
  color: "text.secondary",
  "&.Mui-checked": { color: "primary.main" },
  "&:hover": { bgcolor: "rgba(0,131,143,.06)" },
};

const authLinkSx = {
  color: "primary.main",
  fontSize: 14.5,
  fontWeight: 500,
  "&:hover": { color: "primary.dark" },
};

const authButtonSx = {
  minHeight: 38,
  borderRadius: 1,
  bgcolor: "primary.main",
  color: "#fff",
  fontSize: 14,
  fontWeight: 500,
  letterSpacing: 0.25,
  textTransform: "uppercase",
  boxShadow: "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)",
  "&:hover": { bgcolor: "primary.dark", boxShadow: "0 4px 5px rgba(0,0,0,.18)" },
  "&:active": { transform: "translateY(1px)" },
  "&.Mui-disabled": { bgcolor: "rgba(111,125,133,.22)", color: "rgba(111,125,133,.64)", boxShadow: "none" },
};

const policyButtonSx = {
  minWidth: 0,
  p: 0,
  color: "primary.main",
  fontSize: 15,
  fontWeight: 500,
  lineHeight: "inherit",
  textTransform: "none",
  verticalAlign: "baseline",
  "&:hover": { bgcolor: "transparent", color: "primary.dark", textDecoration: "underline" },
};
