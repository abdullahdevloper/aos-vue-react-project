import { useMemo, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CheckCircle, Key, Visibility, VisibilityOff } from "@mui/icons-material";
import AuthShell from "./AuthShell";
import unlockImage from "../../../assets/pages/illustrator/unlock.png";
import aliAvatar from "../../../assets/pages/doc-images/lists/ali.jpg";

const user = {
  name: "Alice Blue",
  avatar: aliAvatar,
};

export default function LockScreenPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const passwordError = useMemo(() => (!password ? "Please enter password" : password.length < 6 ? "Password must be of 6 characters" : ""), [password]);
  const isInvalid = Boolean(passwordError);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (isInvalid) return;

    setSnackbarOpen(true);
    setPassword("");
    setTouched(false);
    window.setTimeout(() => navigate("/dashboard/operational"), 2000);
  }

  return (
    <AuthShell illustration={unlockImage} illustrationAlt="Unlock illustration">
      <Box sx={{ px: { xs: 3, sm: 4 }, py: { xs: 4, sm: 5 } }}>
        <Stack alignItems="center" sx={{ my: { xs: 2, sm: 3.15 } }}>
          <Typography component="h1" sx={{ fontSize: { xs: 32, sm: 34 }, lineHeight: 1.15, color: "text.primary", fontWeight: 400 }}>
            <Box component="span" sx={{ fontWeight: 800 }}>
              Vuse
            </Box>{" "}
            Admin
          </Typography>
          <Typography sx={{ mt: 0.95, fontSize: 16, color: "text.secondary" }}>Hello, Welcome Back</Typography>
          <Typography sx={{ mt: 0.7, mb: 1.6, fontSize: 20, fontWeight: 500, color: "primary.main", lineHeight: 1.35 }}>{user.name}</Typography>
          <VuseNeuAvatar src={user.avatar} alt={user.name} />
        </Stack>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ maxWidth: 380, mx: "auto" }}>
          <Stack spacing={1.35}>
            <TextField
              value={password}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              onChange={(event) => {
                setPassword(event.target.value);
                setTouched(true);
              }}
              onBlur={() => setTouched(true)}
              error={touched && Boolean(passwordError)}
              helperText={touched ? passwordError : " "}
              fullWidth
              variant="filled"
              inputProps={{ "aria-label": "Password" }}
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

            <Button type="submit" fullWidth disabled={isInvalid} sx={authButtonSx}>
              Sign In
            </Button>
            <Typography sx={{ textAlign: "center", mt: 2.1, mb: 1.3, fontSize: 15, color: "text.secondary", lineHeight: 1.55 }}>
              Not {user.name} ?{" "}
              <Link component={RouterLink} to="/pages/authentication/login" underline="none" sx={authLinkSx}>
                Login with different account
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

function VuseNeuAvatar({ src, alt }: { src: string; alt: string }) {
  return (
    <Box
      sx={{
        width: 146,
        height: 146,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        boxShadow: "inset -7px -7px 5px rgba(255,255,255,.88), inset 7px 7px 7px rgba(174,174,192,.32)",
      }}
    >
      <Box
        sx={{
          width: 122,
          height: 122,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          boxShadow: "-7px -7px 5px rgba(255,255,255,.9), 7px 7px 7px rgba(174,174,192,.34)",
        }}
      >
        <Box component="img" src={src} alt={alt} sx={{ width: 105, height: 105, borderRadius: "50%", objectFit: "cover", display: "block" }} />
      </Box>
    </Box>
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
