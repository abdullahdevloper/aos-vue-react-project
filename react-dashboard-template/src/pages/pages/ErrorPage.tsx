import { Box, Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import FullPageShell from "./components/FullPageShell";

const secondary = "#ffb74d";

interface ErrorPageProps {
  code: "404" | "500";
  message: string;
  image: string;
  imageAlt: string;
}

export default function ErrorPage({ code, message, image, imageAlt }: ErrorPageProps) {
  return (
    <FullPageShell>
      <Stack sx={{ minHeight: { xs: 470, sm: 505 }, height: "100%", px: { xs: 2.5, sm: 5 }, pb: { xs: 3, sm: 4 } }}>
        <Box
          component="img"
          src={image}
          alt={imageAlt}
          sx={{
            width: "100%",
            height: 250,
            objectFit: "contain",
            mt: { xs: 2, sm: 2.5 },
            mb: { xs: 1.5, sm: 2 },
          }}
        />
        <Box sx={{ flexGrow: 1 }} />
        <Typography
          component="h1"
          sx={{
            textAlign: "center",
            fontSize: { xs: 82, sm: 96 },
            lineHeight: 1,
            fontWeight: 900,
            color: "text.primary",
            letterSpacing: 0,
            textShadow: "-4px -4px 5px rgba(255,255,255,.92), 4px 4px 6px rgba(174,174,192,.38)",
            mb: { xs: 1.8, sm: 2 },
          }}
        >
          {code}
        </Typography>
        <Stack alignItems="center" sx={{ px: { xs: 1, sm: 5 } }}>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { xs: 16, sm: 17 },
              fontWeight: 400,
              lineHeight: 1.65,
              color: "text.primary",
              mb: 2.5,
              whiteSpace: "pre-line",
            }}
          >
            {message}
          </Typography>
          <Button component={RouterLink} to="/dashboard/operational" sx={secondaryButtonSx}>
            Back To Home
          </Button>
        </Stack>
      </Stack>
    </FullPageShell>
  );
}

const secondaryButtonSx = {
  minHeight: 36,
  px: 2.4,
  mb: 0.5,
  borderRadius: 1,
  bgcolor: secondary,
  color: "#263238",
  fontSize: 14,
  fontWeight: 500,
  letterSpacing: 0.25,
  textTransform: "uppercase",
  boxShadow: "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)",
  "&:hover": {
    bgcolor: "#ffa726",
    boxShadow: "0 4px 5px rgba(0,0,0,.18)",
  },
  "&:active": {
    bgcolor: "#fb9f18",
    boxShadow: "0 2px 3px rgba(0,0,0,.18)",
    transform: "translateY(1px)",
  },
  "&:focus-visible": {
    outline: "2px solid rgba(255,183,77,.5)",
    outlineOffset: 2,
  },
};
