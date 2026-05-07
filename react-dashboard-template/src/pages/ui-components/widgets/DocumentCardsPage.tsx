import { Box, Button, Card, CardContent, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import { CardGiftcard, PlayArrow, QueryBuilder } from "@mui/icons-material";
import VuseSectionDefinition from "../../../components/layout/VuseSectionDefinition";

const neuGlow = "-7px -7px 5px rgba(255,255,255,.86), 7px 7px 7px rgba(174,174,192,.30)";
const neuGlowSmall = "-4px -4px 5px rgba(255,255,255,.88), 5px 5px 7px rgba(174,174,192,.28)";
const todayLabel = "Thursday, May 7, 2026";
const bodyText =
  "Incididunt amet est amet duis anim qui. Cillum deserunt ut eu nisi occaecat aliqua exercitation irure aute laboris. Duis et sit ullamco enim ad id et veniam anim irure id aute. Eu pariatur laborum cupidatat veniam magna. Laboris aute id Lorem nisi deserunt.";

export default function DocumentCardsPage() {
  return (
    <>
      <VuseSectionDefinition
        title="Document Widgets"
        namespace="Widgets"
        icon={<CardGiftcard />}
        breadcrumbs={[
          { label: "Widgets", href: "/widgets/document-cards" },
          { label: "Document" },
        ]}
      />
      <Box sx={{ maxWidth: 1180 }}>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <WordDocument />
              <PictureDocument />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <PdfDocument />
              <AudioDocument />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <VideoDocument />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

function VuseCard({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <Card
      sx={{
        maxWidth: 374,
        width: "100%",
        bgcolor: dark ? "#263238" : "background.default",
        color: dark ? "#fff" : "text.primary",
        backgroundImage: "none",
        borderRadius: 1,
        boxShadow: neuGlow,
        overflow: "hidden",
      }}
    >
      {children}
    </Card>
  );
}

function LinearProgressAvatar({ label, color, size = 20 }: { label: string; color: string; size?: number }) {
  return (
    <Box sx={{ position: "absolute", inset: "auto 0 auto auto", top: 0, width: "100%", zIndex: 2 }}>
      <LinearProgress variant="determinate" value={100} sx={{ height: 4, bgcolor: "transparent", "& .MuiLinearProgress-bar": { bgcolor: color } }} />
      <Stack direction="row" justifyContent="flex-end">
        <Box
          sx={{
            width: size,
            height: size,
            bgcolor: color,
            color: "#fff",
            display: "grid",
            placeItems: "center",
            borderRadius: 0,
            fontSize: label.length > 1 ? 10 : 12,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {label}
        </Box>
      </Stack>
    </Box>
  );
}

function TextDocument({ label, color, size = 20 }: { label: string; color: string; size?: number }) {
  return (
    <VuseCard>
      <Box sx={{ position: "relative", minHeight: 4 }}>
        <LinearProgressAvatar label={label} color={color} size={size} />
      </Box>
      <CardContent sx={{ pt: 3.5 }}>
        <Typography sx={{ fontSize: 20, fontWeight: 500, mb: 2 }}>Proposal Document</Typography>
        <Typography color="text.secondary" sx={{ fontSize: 14.5, lineHeight: 1.55, mb: 2 }}>
          {bodyText}
        </Typography>
        <DateLine />
      </CardContent>
    </VuseCard>
  );
}

function WordDocument() {
  return <TextDocument label="W" color="#2196f3" />;
}

function PdfDocument() {
  return <TextDocument label="PDF" color="#f44336" size={25} />;
}

function MediaOverlay({ image, badge, title, centeredPlay = false }: { image: string; badge: string; title: string; centeredPlay?: boolean }) {
  return (
    <VuseCard dark>
      <Box
        sx={{
          height: 300,
          position: "relative",
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.16), rgba(0,0,0,.56)), url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {centeredPlay && (
          <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
            <Button
              aria-label="Play video"
              sx={{
                minWidth: 54,
                width: 54,
                height: 54,
                borderRadius: "50%",
                bgcolor: "background.default",
                color: "text.primary",
                boxShadow: neuGlowSmall,
                "&:hover": { bgcolor: "background.default" },
              }}
            >
              <PlayArrow />
            </Button>
          </Box>
        )}
        <Stack sx={{ height: "100%", p: 1.5 }} justifyContent="space-between">
          <Stack direction="row" justifyContent="flex-end">
            <Button size="small" sx={{ minHeight: 24, px: 1.25, borderRadius: 1, bgcolor: "rgba(255,255,255,.88)", color: "#263238", fontSize: 12, "&:hover": { bgcolor: "#fff" } }}>
              {badge}
            </Button>
          </Stack>
          <Box>
            <Typography sx={{ fontSize: 13, lineHeight: 1.3 }}>{title}</Typography>
            <DateLine dark />
          </Box>
        </Stack>
      </Box>
    </VuseCard>
  );
}

function PictureDocument() {
  return <MediaOverlay image="https://picsum.photos/500/300?image=271" badge="25MB" title="Bride At Night" />;
}

function VideoDocument() {
  return <MediaOverlay image="https://picsum.photos/500/300?image=501" badge="01:28" title="Beach Party" centeredPlay />;
}

function AudioDocument() {
  return (
    <VuseCard>
      <Box sx={{ height: 250, position: "relative", overflow: "hidden" }}>
        <Stack sx={{ position: "absolute", inset: 0, px: 2, py: 1.5 }} justifyContent="space-between">
          <Stack direction="row" justifyContent="flex-end">
            <Button size="small" sx={{ minHeight: 24, px: 1.25, borderRadius: 1, bgcolor: "#1de9b6", color: "#fff", fontSize: 12, "&:hover": { bgcolor: "#1de9b6" } }}>
              06:12
            </Button>
          </Stack>
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ fontSize: 16, mb: 0.25 }}>Beach Party</Typography>
            <DateLine />
          </Box>
        </Stack>
        <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", px: 2 }}>
          <Box
            component="audio"
            controls
            sx={{
              width: "100%",
              maxWidth: 315,
              borderRadius: 30,
              boxShadow: neuGlowSmall,
              "&:focus": { outline: "none" },
            }}
          >
            <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
          </Box>
        </Box>
      </Box>
    </VuseCard>
  );
}

function DateLine({ dark = false }: { dark?: boolean }) {
  return (
    <Stack direction="row" spacing={0.75} alignItems="center" sx={{ color: dark ? "rgba(255,255,255,.86)" : "text.secondary", fontSize: 12, textTransform: "uppercase", letterSpacing: 0 }}>
      <QueryBuilder sx={{ fontSize: 16 }} />
      <Typography component="span" sx={{ fontSize: 12, color: "inherit", textTransform: "uppercase" }}>
        {todayLabel}
      </Typography>
    </Stack>
  );
}
