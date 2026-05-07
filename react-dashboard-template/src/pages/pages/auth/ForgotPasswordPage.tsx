import { useMemo, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CheckCircle, Close, Email, EnhancedEncryption, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import AuthShell from "./AuthShell";
import forgotPasswordImage from "../../../assets/pages/illustrator/forgot_password.png";
import passcodeImage from "../../../assets/pages/illustrator/my_passcode.png";
import passwordImage from "../../../assets/pages/illustrator/password.png";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const steps = [
  {
    title: "Recover Your Account",
    subtitle: "Provide your e-mail address to reset your password",
    image: forgotPasswordImage,
    alt: "Forgot password illustration",
  },
  {
    title: "Enter 5- Digit Code.",
    subtitle: "We've sent a 5-digit code to your email address. Input code below.",
    image: passcodeImage,
    alt: "Passcode illustration",
  },
  {
    title: "Set New Password",
    subtitle: "",
    image: passwordImage,
    alt: "Password illustration",
  },
];

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    code: false,
    password: false,
    repeatPassword: false,
  });

  const detail = steps[step - 1];
  const errors = useMemo(
    () => ({
      email: !email ? "Please enter email" : !emailPattern.test(email) ? "Email must be valid" : "",
      code: !code ? "Please enter code" : "",
      password: !password ? "Password is required field." : "",
      repeatPassword: repeatPassword !== password ? "Must needs to match with Password" : "",
    }),
    [code, email, password, repeatPassword],
  );

  function waitThen(callback: () => void) {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      callback();
    }, 2000);
  }

  function handleEmailSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched((value) => ({ ...value, email: true }));
    if (errors.email) return;
    waitThen(() => setStep(2));
  }

  function handleCodeSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched((value) => ({ ...value, code: true }));
    if (errors.code) return;
    waitThen(() => setStep(3));
  }

  function handleResetSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched((value) => ({ ...value, password: true, repeatPassword: true }));
    if (errors.password || errors.repeatPassword || !repeatPassword) return;
    waitThen(() => {
      setSnackbarOpen(true);
      window.setTimeout(() => navigate("/pages/authentication/login"), 650);
    });
  }

  function handleCodeChange(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 5);
    setCode(digits.length > 3 ? `${digits.slice(0, 3)}-${digits.slice(3)}` : digits);
    setTouched((current) => ({ ...current, code: true }));
  }

  return (
    <AuthShell illustration={detail.image} illustrationAlt={detail.alt} md={8} lg={6}>
      <Box sx={{ position: "relative", px: { xs: 3, sm: 4.5 }, py: { xs: 4, sm: 4.65 }, minHeight: { md: 430 } }}>
        <IconButton
          component={RouterLink}
          to="/pages/authentication/login"
          aria-label="Close forgot password"
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 34,
            height: 34,
            color: "text.secondary",
            "&:hover": { bgcolor: "rgba(0,131,143,.07)", color: "primary.main" },
          }}
        >
          <Close sx={{ fontSize: 18 }} />
        </IconButton>

        <Stack alignItems="center" sx={{ mt: 0.85, mb: 0 }}>
          <Typography component="h1" sx={{ fontSize: { xs: 31, sm: 34 }, lineHeight: 1.16, color: "text.primary", fontWeight: 400 }}>
            <Box component="span" sx={{ fontWeight: 800 }}>
              Vuse
            </Box>{" "}
            Admin
          </Typography>
          <Typography sx={{ mt: 0.85, fontSize: 16, color: "text.primary", lineHeight: 1.45, textAlign: "center" }}>{detail.title}</Typography>
          {detail.subtitle ? (
            <Typography sx={{ mt: 0.15, fontSize: 14, color: "text.secondary", lineHeight: 1.5, textAlign: "center", maxWidth: 340 }}>{detail.subtitle}</Typography>
          ) : null}
        </Stack>

        {step === 1 ? (
          <Box component="form" onSubmit={handleEmailSubmit} noValidate sx={formSx}>
            <Stack spacing={1.35}>
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
              <Button type="submit" fullWidth disabled={Boolean(errors.email) || loading} sx={authButtonSx}>
                {loading ? <CircularProgress size={18} color="inherit" /> : "Send OTP"}
              </Button>
            </Stack>
          </Box>
        ) : null}

        {step === 2 ? (
          <Box component="form" onSubmit={handleCodeSubmit} noValidate sx={formSx}>
            <Stack spacing={1.35}>
              <TextField
                value={code}
                placeholder="000-00"
                onChange={(event) => handleCodeChange(event.target.value)}
                onBlur={() => setTouched((value) => ({ ...value, code: true }))}
                error={touched.code && Boolean(errors.code)}
                helperText={touched.code ? errors.code : " "}
                fullWidth
                variant="filled"
                inputProps={{ "aria-label": "Verification code", inputMode: "numeric" }}
                sx={authTextFieldSx}
              />
              <Button type="submit" fullWidth disabled={Boolean(errors.code) || loading} sx={authButtonSx}>
                {loading ? <CircularProgress size={18} color="inherit" /> : "Send OTP"}
              </Button>
            </Stack>
          </Box>
        ) : null}

        {step === 3 ? (
          <Box component="form" onSubmit={handleResetSubmit} noValidate sx={formSx}>
            <Stack spacing={1.35}>
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
              <Button type="submit" fullWidth disabled={Boolean(errors.password || errors.repeatPassword || !repeatPassword) || loading} sx={authButtonSx}>
                {loading ? <CircularProgress size={18} color="inherit" /> : "Reset Password"}
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Snackbar open={snackbarOpen} anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={1800} onClose={() => setSnackbarOpen(false)}>
        <Alert severity="success" icon={<CheckCircle fontSize="inherit" />} sx={{ alignItems: "center" }}>
          Password Reset Successfully
        </Alert>
      </Snackbar>
    </AuthShell>
  );
}

const formSx = {
  maxWidth: 380,
  mx: "auto",
  my: { xs: 4.2, sm: 5 },
};

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
