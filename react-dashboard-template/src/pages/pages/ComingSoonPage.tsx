import { useEffect, useMemo, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import FullPageShell from "./components/FullPageShell";
import moonImage from "../../assets/pages/illustrator/the_moon.png";

const secondary = "#ffb74d";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ComingSoonPage() {
  const deadline = useMemo(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return date;
  }, []);
  const [now, setNow] = useState(() => new Date());
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const emailError = !email ? "Please enter email" : !emailPattern.test(email) ? "Email must be valid" : "";
  const remaining = getRemaining(deadline, now);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (emailError) return;
    setEmail("");
    setTouched(false);
  }

  return (
    <FullPageShell>
      <Stack sx={{ minHeight: { xs: 505, sm: 540 }, height: "100%", px: { xs: 2.5, sm: 5 }, pb: { xs: 3.5, sm: 4.5 } }}>
        <Box component="img" src={moonImage} alt="Moon illustration" sx={{ width: "100%", height: 250, objectFit: "contain", mt: { xs: 1.5, sm: 2 } }} />

        <Box sx={{ flexGrow: 1, minHeight: { xs: 12, sm: 18 } }} />

        <Typography component="h1" sx={{ textAlign: "center", fontSize: { xs: 22, sm: 24 }, fontWeight: 400, color: "text.primary", lineHeight: 1.35 }}>
          Lauching Very Soon
        </Typography>

        <Countdown values={remaining} />

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ textAlign: "center", px: { xs: 0.5, sm: 5 }, mt: 1.3 }}>
          <Typography sx={{ fontSize: { xs: 15.5, sm: 16 }, color: "text.primary", lineHeight: 1.6, mb: 2.3 }}>
            Please{" "}
            <Box component="span" sx={{ fontWeight: 700 }}>
              subscribe
            </Box>{" "}
            us to get updates on our application
          </Typography>

          <TextField
            value={email}
            label="Email"
            onChange={(event) => {
              setEmail(event.target.value);
              setTouched(true);
            }}
            onBlur={() => setTouched(true)}
            error={touched && Boolean(emailError)}
            helperText={touched ? emailError : " "}
            fullWidth
            variant="filled"
            sx={notifyFieldSx}
          />

          <Button type="submit" disabled={Boolean(emailError)} sx={secondaryButtonSx}>
            Notify Me!
          </Button>
        </Box>
      </Stack>
    </FullPageShell>
  );
}

function Countdown({ values }: { values: { days: number; hours: number; minutes: number; seconds: number } }) {
  const tiles = [
    ["Days", values.days],
    ["Hrs", values.hours],
    ["Min", values.minutes],
    ["Sec", values.seconds],
  ] as const;

  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="center" sx={{ mt: 2.3, mb: 0.7 }}>
      {tiles.map(([label, value]) => (
        <Stack
          key={label}
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 70,
            height: 70,
            m: 1,
            borderRadius: 1,
            bgcolor: "background.default",
            boxShadow: "inset -7px -7px 5px rgba(255,255,255,.88), inset 7px 7px 7px rgba(174,174,192,.32)",
          }}
        >
          <Typography sx={{ fontSize: 24, lineHeight: 1.25, fontWeight: 400, color: "text.primary" }}>{twoDigits(value)}</Typography>
          <Typography sx={{ fontSize: 16, lineHeight: 1.35, color: "text.secondary" }}>{label}</Typography>
        </Stack>
      ))}
    </Stack>
  );
}

function getRemaining(deadline: Date, now: Date) {
  const diff = Math.max(0, Math.trunc((deadline.getTime() - now.getTime()) / 1000));
  return {
    days: Math.trunc(diff / 60 / 60 / 24),
    hours: Math.trunc(diff / 60 / 60) % 24,
    minutes: Math.trunc(diff / 60) % 60,
    seconds: diff % 60,
  };
}

function twoDigits(value: number) {
  return value < 10 ? `0${value}` : String(value);
}

const notifyFieldSx = {
  maxWidth: 400,
  mx: "auto",
  display: "block",
  mb: 0.4,
  "& .MuiFilledInput-root": {
    minHeight: 56,
    bgcolor: "#fff",
    borderRadius: 1,
    boxShadow: "none",
    border: "1px solid transparent",
    "&:before, &:after": { display: "none" },
    "&:hover": { bgcolor: "#fff", borderColor: "rgba(0,131,143,.22)" },
    "&.Mui-focused": { bgcolor: "#fff", borderColor: "#00838f" },
    "&.Mui-error": { borderColor: "#ff5252" },
  },
  "& .MuiFilledInput-input": { py: 2.05, fontSize: 15.5 },
  "& .MuiInputLabel-root": { fontSize: 15.5, color: "text.secondary", "&.Mui-focused": { color: "primary.main" } },
  "& .MuiFormHelperText-root": { minHeight: 20, mx: 1.5, mt: 0.45, fontSize: 12.5 },
};

const secondaryButtonSx = {
  minHeight: 36,
  px: 2.4,
  borderRadius: 1,
  bgcolor: secondary,
  color: "#263238",
  fontSize: 14,
  fontWeight: 500,
  letterSpacing: 0.25,
  textTransform: "uppercase",
  boxShadow: "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)",
  "&:hover": { bgcolor: "#ffa726", boxShadow: "0 4px 5px rgba(0,0,0,.18)" },
  "&:active": { bgcolor: "#fb9f18", boxShadow: "0 2px 3px rgba(0,0,0,.18)", transform: "translateY(1px)" },
  "&.Mui-disabled": { bgcolor: "rgba(111,125,133,.22)", color: "rgba(111,125,133,.64)", boxShadow: "none" },
};
