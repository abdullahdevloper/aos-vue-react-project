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
import { CheckCircle, Email, Key, Visibility, VisibilityOff } from "@mui/icons-material";
import AuthShell from "./AuthShell";
import VuseLogoMark from "./VuseLogoMark";
import workingLateImage from "../../../assets/pages/illustrator/working_late.png";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const errors = useMemo(
    () => ({
      email: !email ? "Please enter email" : !emailPattern.test(email) ? "Email must be valid" : "",
      password: !password ? "Please enter password" : password.length < 6 ? "Password must be of 6 characters" : "",
    }),
    [email, password],
  );
  const isInvalid = Boolean(errors.email || errors.password);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ email: true, password: true });
    if (isInvalid) return;

    setSnackbarOpen(true);
    setEmail("");
    setPassword("");
    setRememberMe(false);
    setTouched({ email: false, password: false });
    window.setTimeout(() => navigate("/dashboard/operational"), 2000);
  }

  return (
    <AuthShell illustration={workingLateImage} illustrationAlt="Working late illustration">
      <Box sx={{ px: { xs: 3, sm: 4 }, py: { xs: 4, sm: 5 } }}>
        <Stack alignItems="center" sx={{ mb: 3.2 }}>
          <Stack direction="row" alignItems="center" justifyContent="center" sx={{ fontSize: 34, color: "text.primary", lineHeight: 1.1 }}>
            <VuseLogoMark size={45} />
            <Typography component="span" sx={{ fontSize: 34, fontWeight: 800, ml: -0.25 }}>
              use
            </Typography>
            <Typography component="span" sx={{ fontSize: 34, fontWeight: 400, ml: 1 }}>
              Admin
            </Typography>
          </Stack>
          <Typography sx={{ mt: 1.5, fontSize: 16, color: "text.secondary" }}>Hello, Welcome Back!</Typography>
        </Stack>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ maxWidth: 380, mx: "auto" }}>
          <Stack spacing={1.75}>
            <TextField
              value={email}
              label="Email"
              onChange={(event) => {
                setEmail(event.target.value);
                setTouched((value) => ({ ...value, email: true }));
              }}
              onBlur={() => setTouched((value) => ({ ...value, email: true }))}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email ? errors.email : " "}
              fullWidth
              variant="filled"
              InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ fontSize: 21 }} /></InputAdornment> }}
              sx={authTextFieldSx}
            />
            <TextField
              value={password}
              label="Password"
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
              InputProps={{
                startAdornment: <InputAdornment position="start"><Key sx={{ fontSize: 21 }} /></InputAdornment>,
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

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: -0.75, mb: 0.25, gap: 1 }}>
              <FormControlLabel
                control={<Checkbox checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} sx={authCheckboxSx} />}
                label="Remember Me"
                sx={{ m: 0, "& .MuiFormControlLabel-label": { fontSize: 14.5, color: "text.secondary" } }}
              />
              <Link component={RouterLink} to="/pages/authentication/forgot-password" underline="none" sx={authLinkSx}>
                Forgot Password
              </Link>
            </Stack>

            <Button type="submit" fullWidth disabled={isInvalid} sx={authButtonSx}>
              Sign In
            </Button>
            <Typography sx={{ textAlign: "center", my: 1.6, fontSize: 15, color: "text.secondary" }}>
              Don&apos;t have account ?{" "}
              <Link component={RouterLink} to="/pages/authentication/signup" underline="none" sx={authLinkSx}>
                Create Account
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
    minHeight: 56,
    bgcolor: "#fff",
    borderRadius: 1,
    boxShadow: "none",
    border: "1px solid transparent",
    transition: "border-color 140ms ease, background-color 140ms ease",
    "&:before, &:after": { display: "none" },
    "&:hover": { bgcolor: "#fff", borderColor: "rgba(0,131,143,.22)" },
    "&.Mui-focused": { bgcolor: "#fff", borderColor: "#00838f" },
    "&.Mui-error": { borderColor: "#ff5252" },
  },
  "& .MuiFilledInput-input": { py: 2.05, fontSize: 15.5 },
  "& .MuiInputLabel-root": { fontSize: 15.5, color: "text.secondary", "&.Mui-focused": { color: "primary.main" } },
  "& .MuiInputAdornment-root": { color: "text.secondary", mt: "0 !important" },
  "& .MuiFormHelperText-root": { minHeight: 20, mx: 1.5, mt: 0.45, fontSize: 12.5 },
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
