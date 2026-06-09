import type { ReactNode } from "react";
import {
  AssignmentReturn,
  CardGiftcard,
  CloudDownload,
  Comment,
  ConfirmationNumber,
  DesktopMac,
  Favorite,
  LocalMall,
  Memory,
  MonetizationOn,
  OutlinedFlag,
  Person,
  PhoneIphone,
  PlaylistAdd,
  PlaylistAddCheck,
  SentimentSatisfiedAlt,
  TrendingDown,
  TrendingUp,
  Visibility,
} from "@mui/icons-material";
import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import VuseSectionDefinition from "../../../components/layout/VuseSectionDefinition";
import sketchLogo from "../../../assets/ui-components/widgets/statistics/sketch.png";
import adobeXdLogo from "../../../assets/ui-components/widgets/statistics/AdobeXD.png";

const neuGlow = "-7px -7px 5px rgba(255,255,255,.86), 7px 7px 7px rgba(174,174,192,.30)";
const neuGlowSmall = "-4px -4px 5px rgba(255,255,255,.88), 5px 5px 7px rgba(174,174,192,.28)";

type StatColor = string;

interface ColumnItem {
  icon?: ReactNode;
  image?: string;
  color?: StatColor;
  heading: string;
  subIcon?: ReactNode;
  subColor?: StatColor;
  subText: ReactNode;
  cols?: 6 | 12;
  tile?: boolean;
}

interface BasicItem {
  title: string;
  heading: string;
  icon: ReactNode;
  color: StatColor;
  tile?: boolean;
  detail?: ReactNode;
  progress?: { value: number; color: string };
}

export default function StatisticPage() {
  return (
    <>
      <VuseSectionDefinition
        title="Stats Widgets"
        namespace="Widgets"
        icon={<CardGiftcard />}
        breadcrumbs={[
          { label: "Widgets", href: "/widgets/statistic" },
          { label: "Stats" },
        ]}
      />

      <Grid container spacing={3}>
        {singleColumnStats.map((stat) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={stat.title}>
            <ColumnarStatistic title={stat.title} items={stat.items} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 0 }}>
        {twoColumnStats.map((stat) => (
          <Grid item xs={12} sm={6} lg={3} key={stat.title}>
            <ColumnarStatistic title={stat.title} items={stat.items} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 0 }}>
        {basicStats.map((stat) => (
          <Grid item xs={12} sm={6} lg={3} key={stat.title}>
            <BasicStatistic {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 0 }}>
        <Grid item xs={12} md={6}>
          <TaskStatus />
        </Grid>
      </Grid>
    </>
  );
}

function VuseCard({ children }: { children: ReactNode }) {
  return (
    <Card
      sx={{
        bgcolor: "background.default",
        backgroundImage: "none",
        borderRadius: 1,
        boxShadow: neuGlow,
        height: "100%",
      }}
    >
      {children}
    </Card>
  );
}

function SoftAvatar({ icon, image, color = "#00838f", size = 70, tile = false }: { icon?: ReactNode; image?: string; color?: string; size?: number; tile?: boolean }) {
  return (
    <Avatar
      variant={tile ? "rounded" : "circular"}
      src={image}
      sx={{
        width: size,
        height: size,
        bgcolor: image ? "transparent" : "background.default",
        color,
        borderRadius: tile ? 1 : "50%",
        boxShadow: image ? "none" : neuGlowSmall,
        mx: "auto",
        "& img": { objectFit: "contain" },
      }}
    >
      {!image && icon}
    </Avatar>
  );
}

function ColumnarStatistic({ title, items }: { title: string; items: ColumnItem[] }) {
  return (
    <VuseCard>
      <CardContent sx={{ pb: 2.5 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 500, mb: 2 }}>{title}</Typography>
        <Grid container alignItems="center" justifyContent="space-between">
          {items.map((item) => (
            <Grid item xs={item.cols ?? 12} key={`${title}-${item.heading}`} sx={{ textAlign: "center" }}>
              <SoftAvatar icon={item.icon} image={item.image} color={item.color} tile={item.tile} />
              <Typography variant="h4" sx={{ fontSize: 33, fontWeight: 500, mt: 2.5, lineHeight: 1.18 }}>
                {item.heading}
              </Typography>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.75} sx={{ color: item.subColor ?? "text.secondary", minHeight: 24 }}>
                {item.subIcon}
                <Typography component="span" sx={{ fontSize: 14 }}>
                  {item.subText}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </VuseCard>
  );
}

function BasicStatistic({ title, heading, icon, color, tile = false, detail, progress }: BasicItem) {
  return (
    <VuseCard>
      <CardContent>
        <Typography sx={{ fontSize: 18, fontWeight: 500, mb: 1.5 }}>{title}</Typography>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box sx={{ minWidth: 0, flexGrow: 1 }}>
            <Typography variant="h4" sx={{ fontSize: 34, fontWeight: 500, lineHeight: 1.2 }}>
              {heading}
            </Typography>
            <Box sx={{ color: "text.secondary", fontSize: 14.5, mt: 0.75 }}>{detail ?? defaultTrend}</Box>
          </Box>
          <SoftAvatar icon={icon} color={color} size={50} tile={tile} />
        </Stack>
        {progress && (
          <LinearProgress
            variant="determinate"
            value={progress.value}
            sx={{
              mt: 1.75,
              height: 4,
              bgcolor: "rgba(111,125,133,.16)",
              "& .MuiLinearProgress-bar": { bgcolor: progress.color },
            }}
          />
        )}
      </CardContent>
    </VuseCard>
  );
}

const defaultTrend = (
  <Stack component="span" direction="row" alignItems="center" spacing={0.75}>
    <TrendingUp sx={{ fontSize: 17 }} />
    <span>
      +3.49<sup>%</sup>
    </span>
  </Stack>
);

function TaskStatus() {
  return (
    <VuseCard>
      <CardContent sx={{ pb: 1 }}>
        <Typography sx={{ fontSize: 20, fontWeight: 500 }}>Task Status</Typography>
      </CardContent>
      <TaskGroup title="On Going" tasks={ongoingTasks} />
      <TaskGroup title="Upcomig" tasks={upcomingTasks} />
    </VuseCard>
  );
}

function TaskGroup({ title, tasks }: { title: string; tasks: Array<{ title: string; timeline: string; completedPercentage: number }> }) {
  return (
    <CardContent sx={{ pt: 1.25 }}>
      <Typography color="text.secondary" sx={{ fontSize: 14.5, mb: 1 }}>
        {title}
      </Typography>
      <Box sx={{ borderRadius: 1, boxShadow: neuGlowSmall, py: 1.5, px: 1.75 }}>
        <Stack spacing={2}>
          {tasks.map((task) => (
            <Box key={task.title}>
              <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ mb: 0.75 }}>
                <Typography sx={{ fontSize: 12 }}>{task.title}</Typography>
                <Typography sx={{ fontSize: 12, textAlign: "right" }}>{task.timeline}</Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={task.completedPercentage}
                sx={{
                  height: 4,
                  borderRadius: 999,
                  bgcolor: "rgba(111,125,133,.16)",
                  "& .MuiLinearProgress-bar": { borderRadius: 999, bgcolor: "primary.main" },
                }}
              />
            </Box>
          ))}
        </Stack>
      </Box>
    </CardContent>
  );
}

const up = (color: string) => <TrendingUp sx={{ fontSize: 17, color }} />;
const down = (color: string) => <TrendingDown sx={{ fontSize: 17, color }} />;
const pct = (value: string) => (
  <>
    {value}
    <sup>%</sup>
  </>
);

const singleColumnStats: Array<{ title: string; items: ColumnItem[] }> = [
  { title: "Total Orders", items: [{ icon: <LocalMall />, color: "#1de9b6", heading: "36K", subIcon: up("#1de9b6"), subColor: "#1de9b6", subText: pct("+2.75") }] },
  { title: "Total Views", items: [{ icon: <Visibility />, color: "#d500f9", heading: "78K", subIcon: up("#00e5ff"), subColor: "#00e5ff", subText: pct("+9.15") }] },
  { title: "Likes", items: [{ icon: <Favorite />, color: "#f06292", heading: "84K", subIcon: up("#e91e63"), subColor: "#e91e63", subText: pct("+7.75") }] },
  { title: "Comments", items: [{ icon: <Comment />, color: "#448aff", heading: "60K", subIcon: down("#2979ff"), subColor: "#2979ff", subText: pct("-3.80") }] },
  { title: "Reviews", items: [{ icon: <SentimentSatisfiedAlt />, color: "#00e676", heading: "35K", subIcon: up("#00e676"), subColor: "#00e676", subText: pct("+9.10") }] },
  { title: "Return", items: [{ icon: <AssignmentReturn />, color: "#e57373", heading: "02", subIcon: down("#ef9a9a"), subColor: "#ef9a9a", subText: pct("0.12") }] },
];

const twoColumnStats: Array<{ title: string; items: ColumnItem[] }> = [
  {
    title: "Users",
    items: [
      { cols: 6, icon: <PhoneIphone />, color: "#ba68c8", heading: "46K", subIcon: up("#00e676"), subColor: "#00e676", subText: pct("+2.75") },
      { cols: 6, icon: <DesktopMac />, color: "#fbc02d", heading: "42K", subIcon: down("#ff1744"), subColor: "#ff1744", subText: pct("-3.25") },
    ],
  },
  {
    title: "Happy Customers",
    items: [
      { cols: 6, icon: <Favorite />, color: "#e91e63", heading: "84K", subIcon: up("#e91e63"), subColor: "#e91e63", subText: pct("+2.75") },
      { cols: 6, icon: <SentimentSatisfiedAlt />, color: "#f9a825", heading: "35K", subIcon: up("#00e676"), subColor: "#00e676", subText: pct("+9.10") },
    ],
  },
  {
    title: "Tickets",
    items: [
      { cols: 6, icon: <PlaylistAdd />, color: "#00b0ff", heading: "12K", subText: "Created" },
      { cols: 6, icon: <PlaylistAddCheck />, color: "#00e676", heading: "35K", subText: "Completed" },
    ],
  },
  {
    title: "UI Users",
    items: [
      { cols: 6, image: sketchLogo, heading: "82K", subIcon: <Favorite sx={{ fontSize: 17, color: "#e91e63" }} />, subColor: "text.secondary", subText: "Likes", tile: true },
      { cols: 6, image: adobeXdLogo, heading: "78K", subIcon: <Favorite sx={{ fontSize: 17, color: "#e91e63" }} />, subColor: "text.secondary", subText: "Likes", tile: true },
    ],
  },
];

const basicStats: BasicItem[] = [
  { title: "Users", heading: "106K", icon: <Person />, color: "#2979ff" },
  { title: "Orders", heading: "158K", icon: <LocalMall />, color: "#1de9b6" },
  { title: "CUP Usage", heading: "78%", icon: <Memory />, color: "#3d5afe" },
  { title: "Weekly Income", heading: "$750", icon: <MonetizationOn />, color: "#ff8f00" },
  { title: "Customers", heading: "52K", icon: <Person />, color: "#2979ff", detail: <Box sx={{ my: 1 }}>48K more to goal</Box>, progress: { value: 52, color: "#2979ff" } },
  { title: "Closed Tickets", heading: "78", icon: <ConfirmationNumber />, color: "#f06292", tile: true, detail: <Box sx={{ my: 1 }}>32 To goal</Box>, progress: { value: 78, color: "#f06292" } },
  { title: "Downloads", heading: "80K", icon: <CloudDownload />, color: "#00e5ff", detail: <Box sx={{ my: 1 }}>20K more to goal</Box>, progress: { value: 80, color: "#00e5ff" } },
  { title: "Visits", heading: "68K", icon: <OutlinedFlag />, color: "#00e676", detail: <Box sx={{ my: 1 }}>32K more to goal</Box>, progress: { value: 68, color: "#00e676" } },
];

const ongoingTasks = [
  { title: "Sketch File", timeline: "4 weeks", completedPercentage: 80 },
  { title: "Adobe XD File", timeline: "3 weeks", completedPercentage: 70 },
  { title: "UI Implementation", timeline: "6 weeks", completedPercentage: 86 },
];

const upcomingTasks = [
  { title: "Upgrade Vuetify", timeline: "5 weeks", completedPercentage: 25 },
  { title: "Update Vue.js Version", timeline: "3 weeks", completedPercentage: 33 },
  { title: "Deployment", timeline: "2 weeks", completedPercentage: 2 },
];
