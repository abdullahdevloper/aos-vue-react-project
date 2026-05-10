import { useMemo, useState, type ReactNode } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import {
  Add,
  CloudDownload,
  ConfirmationNumber,
  DesktopMac,
  EmojiEvents,
  Favorite,
  FlashOn,
  MoreVert,
  OutlinedFlag,
  Person,
  PhoneIphone,
  PlaylistAdd,
  PlaylistAddCheck,
  SentimentSatisfiedAlt,
  TrendingDown,
  TrendingUp,
} from "@mui/icons-material";
import { Bar } from "react-chartjs-2";
import type { ChartData, ChartOptions, ScriptableContext } from "chart.js";
import "../../components/ChartJS/chartConfig";
import sketchLogo from "../../assets/ui-components/widgets/statistics/sketch.png";
import adobeXdLogo from "../../assets/ui-components/widgets/statistics/AdobeXD.png";
import avatar2 from "../../assets/ui-components/widgets/lists/2.jpg";
import avatarG2 from "../../assets/ui-components/widgets/lists/g2.jpg";
import avatarG3 from "../../assets/ui-components/widgets/lists/g3.jpg";
import avatarG4 from "../../assets/ui-components/widgets/lists/g4.jpg";
import avatarG5 from "../../assets/ui-components/widgets/lists/g5.jpg";
import avatarG6 from "../../assets/ui-components/widgets/lists/g6.jpg";
import avatarJulieta from "../../assets/ui-components/widgets/lists/julieta.png";
import avatarLily from "../../assets/ui-components/widgets/lists/lily.png";
import avatarM1 from "../../assets/ui-components/widgets/lists/m1.jpg";
import avatarM2 from "../../assets/ui-components/widgets/lists/m2.jpg";
import avatarM3 from "../../assets/ui-components/widgets/lists/m3.jpg";

const neuGlow = "-7px -7px 5px rgba(255,255,255,.86), 7px 7px 7px rgba(174,174,192,.30)";
const neuGlowSmall = "-4px -4px 5px rgba(255,255,255,.88), 5px 5px 7px rgba(174,174,192,.28)";
const neuInset = "inset -5px -5px 6px rgba(255,255,255,.88), inset 6px 6px 8px rgba(174,174,192,.30)";
const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const users = [
  { firstname: "Jack", avatar: avatarM1 },
  { firstname: "Camelia", avatar: avatarJulieta },
  { firstname: "Denis", avatar: avatar2 },
  { firstname: "Mia", avatar: avatarLily },
  { firstname: "Regina", avatar: avatarG2 },
  { firstname: "Mary", avatar: avatarG3 },
  { firstname: "Gulnaz", avatar: avatarG4 },
  { firstname: "Aline", avatar: avatarG5 },
  { firstname: "Jane", avatar: avatarG6 },
  { firstname: "Timothy", avatar: avatarM1 },
  { firstname: "Beau", avatar: avatarM2 },
  { firstname: "Davi", avatar: avatarM3 },
  { firstname: "John", avatar: avatar2 },
  { firstname: "Ali", avatar: avatarJulieta },
  { firstname: "Sara", avatar: avatarLily },
];

export default function AnalyticalDashboardPage() {
  return (
    <Box className="vuse-content-wrapper">
      <Grid container spacing={3}>
        {basicStats.map((stat) => (
          <Grid item xs={12} sm={6} lg={3} key={stat.title}>
            <BasicStatistic {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 0 }}>
        <Grid item xs={12} md={7}>
          <RevenueComparisonCard />
        </Grid>
        <Grid item xs={12} md={5}>
          <UiDesignCard />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 0 }}>
        {twoColStats.map((card) => (
          <Grid item xs={12} sm={6} lg={3} key={card.title}>
            <ColumnarStatistic title={card.title} items={card.items} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 0 }}>
        <Grid item xs={12}>
          <ProjectTableCard />
        </Grid>
      </Grid>
    </Box>
  );
}

function VuseCard({ children, sx = {} }: { children: ReactNode; sx?: object }) {
  return (
    <Card sx={{ bgcolor: "background.default", borderRadius: 1, boxShadow: neuGlow, backgroundImage: "none", overflow: "visible", ...sx }}>
      {children}
    </Card>
  );
}

function BasicStatistic({ title, heading, icon, color, progress, text }: BasicStat) {
  return (
    <VuseCard sx={{ height: "100%", minHeight: 172 }}>
      <Box sx={{ px: 2, pt: 1.75, pb: 0.35 }}>
        <Typography sx={{ fontSize: 20, fontWeight: 500, lineHeight: 1.35 }}>{title}</Typography>
      </Box>
      <CardContent sx={{ px: 2, pt: 1, pb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box sx={{ minWidth: 0, flexGrow: 1 }}>
            <Typography sx={{ fontSize: 34, fontWeight: 400, lineHeight: 1.18, mb: 0.75 }}>{heading}</Typography>
            <Typography color="text.secondary" sx={{ fontSize: 14, lineHeight: 1.35, mb: 1.05 }}>{text}</Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 4, borderRadius: 999, bgcolor: "rgba(111,125,133,.14)", "& .MuiLinearProgress-bar": { borderRadius: 999, bgcolor: color } }}
            />
          </Box>
          <Avatar sx={{ width: 50, height: 50, bgcolor: "background.default", color, boxShadow: neuGlowSmall, flexShrink: 0 }}>
            {icon}
          </Avatar>
        </Stack>
      </CardContent>
    </VuseCard>
  );
}

function DashboardCardHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between" spacing={1.5} sx={{ px: 2, py: 1.95 }}>
      <Typography sx={{ fontSize: 20, fontWeight: 500 }}>{title}</Typography>
      {children}
    </Stack>
  );
}

function RevenueComparisonCard() {
  const [compareLastYear, setCompareLastYear] = useState(false);
  const data = useMemo<ChartData<"bar">>(() => {
    const dataSet = compareLastYear ? lastYearRevenue : currentYearRevenue;
    return {
      labels: monthLabels,
      datasets: [
        {
          label: "Sales",
          data: dataSet.sales,
          backgroundColor: gradientBar(compareLastYear ? "#bbdefb" : "#bbdefb", compareLastYear ? "#2979ff" : "#448aff"),
          categoryPercentage: 0.56,
          barPercentage: 0.7,
          borderRadius: 0,
        },
        {
          label: "Revenue",
          data: dataSet.revenue,
          backgroundColor: gradientBar(compareLastYear ? "#d1c4e9" : "#e1bee7", compareLastYear ? "#3d5afe" : "#7e57c2"),
          categoryPercentage: 0.56,
          barPercentage: 0.7,
          borderRadius: 0,
        },
      ],
    };
  }, [compareLastYear]);

  return (
    <VuseCard>
      <DashboardCardHeader title="Revenue">
        <Stack direction="row" alignItems="center" spacing={1.05} sx={{ minHeight: 40 }}>
          <Switch
            checked={compareLastYear}
            onChange={(event) => setCompareLastYear(event.target.checked)}
            sx={{
              width: 44,
              height: 26,
              p: 0,
              overflow: "visible",
              "& .MuiSwitch-switchBase": { p: "3px", color: "#fff", "&.Mui-checked": { transform: "translateX(18px)", color: "#fff", "& + .MuiSwitch-track": { bgcolor: "primary.main", opacity: 1 } } },
              "& .MuiSwitch-thumb": { width: 20, height: 20, boxShadow: "0 2px 5px rgba(103,116,132,.35)" },
              "& .MuiSwitch-track": { borderRadius: 999, bgcolor: "rgba(103,116,132,.34)", opacity: 1 },
            }}
          />
          <Typography color="text.secondary" sx={{ fontSize: 14.5 }}>Last year comparison</Typography>
        </Stack>
      </DashboardCardHeader>
      <Box sx={{ px: 2, pb: 0, height: 402 }}>
        <Bar data={data} options={stackedBarOptions} />
      </Box>
    </VuseCard>
  );
}

function UiDesignCard() {
  return (
    <VuseCard sx={{ height: "100%" }}>
      <CardContent sx={{ px: 2, py: 2 }}>
        <Stack alignItems="center" sx={{ my: 2.5 }}>
          <Box sx={{ position: "relative", width: 180, height: 180, display: "grid", placeItems: "center" }}>
            <CircularProgress variant="determinate" value={100} size={180} thickness={8.5} sx={{ color: "rgba(240,98,146,.12)", position: "absolute", inset: 0 }} />
            <CircularProgress variant="determinate" value={60} size={180} thickness={8.5} sx={{ color: "#f8bbd0", transform: "rotate(90deg) !important", position: "absolute", inset: 0, "& .MuiCircularProgress-circle": { strokeLinecap: "butt" } }} />
            <Stack alignItems="center" spacing={1}>
              <Avatar sx={{ width: 56, height: 56, bgcolor: "background.default", color: "secondary.main", boxShadow: neuGlowSmall }}>
                <FlashOn />
              </Avatar>
              <Typography sx={{ fontSize: 20, fontWeight: 500, color: "text.primary" }}>60</Typography>
            </Stack>
          </Box>
        </Stack>
        <Box sx={{ borderRadius: 1, boxShadow: neuGlowSmall, px: 1.6, py: 1.15, mb: 2.8, mx: "auto", width: "fit-content", minWidth: 270 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Avatar sx={{ width: 45, height: 45, bgcolor: "background.default", color: "#00bcd4", boxShadow: neuGlowSmall }}>
              <EmojiEvents />
            </Avatar>
            <Box>
              <Typography sx={{ fontSize: 15.5, fontWeight: 600, lineHeight: 1.35 }}>UI Design Progress</Typography>
              <Typography color="text.secondary" sx={{ fontSize: 13.5 }}>Good progress!</Typography>
            </Box>
          </Stack>
        </Box>
        <Box sx={{ borderRadius: 1, boxShadow: neuGlowSmall, px: 2, py: 1.5 }}>
          <Stack spacing={2.45}>
            {uiDesignTasks.map((task) => (
              <ProgressContentRow key={task.title} {...task} />
            ))}
          </Stack>
        </Box>
      </CardContent>
    </VuseCard>
  );
}

function ProgressContentRow({ title, timeline, completed }: { title: string; timeline: string; completed: number }) {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ mb: 0.7 }}>
        <Typography sx={{ fontSize: 12, lineHeight: 1.25 }}>{title}</Typography>
        <Typography sx={{ fontSize: 12, lineHeight: 1.25, textAlign: "right" }}>{timeline}</Typography>
      </Stack>
      <LinearProgress variant="determinate" value={completed} sx={{ height: 4, borderRadius: 999, bgcolor: "rgba(111,125,133,.15)", "& .MuiLinearProgress-bar": { bgcolor: "secondary.main", borderRadius: 999 } }} />
    </Box>
  );
}

function ColumnarStatistic({ title, items }: { title: string; items: ColumnStatItem[] }) {
  return (
    <VuseCard sx={{ height: "100%" }}>
      <CardContent sx={{ px: 2.1, py: 2 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 500, mb: 1.8 }}>{title}</Typography>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          {items.map((item) => (
            <Stack key={`${title}-${item.heading}`} alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
              <Avatar src={item.image} variant={item.image ? "rounded" : "circular"} sx={{ width: item.image ? 64 : 50, height: item.image ? 64 : 50, bgcolor: "background.default", color: item.color, boxShadow: item.image ? "none" : neuGlowSmall, mb: 1 }}>
                {!item.image && item.icon}
              </Avatar>
              <Typography sx={{ fontSize: 27, fontWeight: 500, lineHeight: 1.18 }}>{item.heading}</Typography>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.45} sx={{ color: item.trendColor ?? "text.secondary" }}>
                {item.trendIcon}
                <Typography noWrap sx={{ fontSize: 13.5, fontWeight: item.trendColor ? 600 : 500 }}>{item.text}</Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </VuseCard>
  );
}

function ProjectTableCard() {
  return (
    <VuseCard>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 2 }}>
        <Typography sx={{ fontSize: 20, fontWeight: 500 }}>Projects</Typography>
        <IconButton aria-label="Add project" sx={{ width: 40, height: 40, bgcolor: "background.default", boxShadow: neuGlowSmall, "&:hover": { bgcolor: "background.default", boxShadow: neuInset } }}>
          <Add sx={{ color: "secondary.main" }} />
        </IconButton>
      </Stack>
      <CardContent sx={{ pt: 0, px: 2, pb: 2 }}>
        <Box sx={{ borderRadius: 1, boxShadow: neuInset, overflowX: "auto", bgcolor: "background.default" }}>
          <Box
            component="table"
            sx={{
              width: "100%",
              minWidth: 860,
              borderCollapse: "collapse",
              tableLayout: "fixed",
              "& th": {
                height: 48,
                px: 2,
                color: "text.secondary",
                fontSize: 13,
                fontWeight: 500,
                textAlign: "left",
                borderBottom: "1px solid rgba(111,125,133,.14)",
                whiteSpace: "nowrap",
              },
              "& td": {
                height: 64,
                px: 2,
                fontSize: 14,
                borderBottom: "1px solid rgba(111,125,133,.10)",
                verticalAlign: "middle",
              },
              "& tbody tr:last-of-type td": {
                borderBottom: 0,
              },
              "& tbody tr": {
                transition: "background-color 140ms ease",
              },
              "& tbody tr:hover": {
                bgcolor: "rgba(0,131,143,.035)",
              },
            }}
          >
            <Box component="colgroup">
              <Box component="col" sx={{ width: 72 }} />
              <Box component="col" sx={{ width: 245 }} />
              <Box component="col" sx={{ width: 160 }} />
              <Box component="col" sx={{ width: 250 }} />
              <Box component="col" sx={{ width: 190 }} />
              <Box component="col" sx={{ width: 95 }} />
            </Box>
            <Box component="thead">
              <Box component="tr">
                {projectHeaders.map((header) => (
                  <Box component="th" key={header.label} sx={{ textAlign: header.align ?? "left", pl: header.label ? 2 : 0 }}>
                    <Stack direction="row" alignItems="center" justifyContent={header.align === "right" ? "flex-end" : header.align === "center" ? "center" : "flex-start"} spacing={0.4}>
                      <Box component="span">{header.label}</Box>
                      {header.sortable && <Box component="span" sx={{ color: "text.disabled", fontSize: 12, lineHeight: 1, opacity: 0.34 }}>▲</Box>}
                    </Stack>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {projects.map((project) => (
                <Box component="tr" key={project.name}>
                  <Box component="td" sx={{ textAlign: "center", px: 0 }}>
                    <Avatar src={project.avatar} alt={project.username} sx={{ width: 36, height: 36, mx: "auto" }} />
                  </Box>
                  <Box component="td">
                    <Typography sx={{ fontSize: 14.5, fontWeight: 500, lineHeight: 1.3 }}>{project.name}</Typography>
                    <Typography color="text.secondary" sx={{ fontSize: 12.5, lineHeight: 1.25 }}>{project.username}</Typography>
                  </Box>
                  <Box component="td">
                    <Typography color="text.secondary" sx={{ fontSize: 13.5 }}>{project.deadline}</Typography>
                  </Box>
                  <Box component="td">
                    <Stack direction="row" alignItems="center" spacing={1.2}>
                      <LinearProgress
                        variant="determinate"
                        value={project.progress}
                        sx={{ flex: 1, minWidth: 130, height: 5, borderRadius: 999, bgcolor: "rgba(111,125,133,.15)", "& .MuiLinearProgress-bar": { bgcolor: project.color, borderRadius: 999 } }}
                      />
                      <Typography sx={{ fontSize: 12.5, color: "text.secondary", minWidth: 34 }}>{project.progress}%</Typography>
                    </Stack>
                  </Box>
                  <Box component="td">
                    <Stack direction="row" alignItems="center">
                      {project.members.map((member) => (
                        <Avatar key={`${project.name}-${member.firstname}`} src={member.avatar} alt={member.firstname} sx={{ width: 25, height: 25, ml: -0.35, border: "2px solid", borderColor: "background.default" }} />
                      ))}
                      {project.membersCount > 3 && (
                        <Avatar sx={{ width: 25, height: 25, ml: -0.35, bgcolor: "#9e9e9e", color: "#fff", fontSize: 10.5, border: "2px solid", borderColor: "background.default" }}>+{project.membersCount - 3}</Avatar>
                      )}
                    </Stack>
                  </Box>
                  <Box component="td" sx={{ textAlign: "right" }}>
                    <IconButton aria-label={`${project.name} options`} sx={{ width: 36, height: 36, color: "text.secondary", "&:hover": { bgcolor: "rgba(111,125,133,.08)" } }}>
                      <MoreVert />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </VuseCard>
  );
}

function gradientBar(from: string, to: string) {
  return (context: ScriptableContext<"bar">) => {
    const { chart } = context;
    const area = chart.chartArea;
    if (!area) return to;
    const gradient = chart.ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0, from);
    gradient.addColorStop(1, to);
    return gradient;
  };
}

const gridStyle = {
  color: "rgba(103,116,132,.24)",
  borderDash: [8, 4],
};

const stackedBarOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
  layout: { padding: { left: 10, right: 10, top: 10, bottom: 10 } },
  scales: {
    x: { stacked: true, grid: { display: false }, ticks: { font: { size: 12 }, color: "#7c8794" } },
    y: { stacked: true, beginAtZero: true, suggestedMax: 125, grid: gridStyle, ticks: { font: { size: 12 }, color: "#7c8794" } },
  },
};

interface BasicStat {
  title: string;
  heading: string;
  icon: ReactNode;
  color: string;
  progress: number;
  text: string;
}

const basicStats: BasicStat[] = [
  { title: "Customers", heading: "52K", icon: <Person />, color: "#2979ff", progress: 52, text: "48K more to goal" },
  { title: "Closed Tickets", heading: "78", icon: <ConfirmationNumber />, color: "#f06292", progress: 78, text: "32 To goal" },
  { title: "Downloads", heading: "80K", icon: <CloudDownload />, color: "#00e5ff", progress: 80, text: "20K more to goal" },
  { title: "Visits", heading: "68K", icon: <OutlinedFlag />, color: "#1de9b6", progress: 68, text: "32K more to goal" },
];

const currentYearRevenue = {
  sales: [40, 39, 20, 40, 38, 50, 40, 39, 20, 40, 38, 50],
  revenue: [43, 30, 48, 47, 70, 30, 43, 30, 48, 47, 70, 30],
};

const lastYearRevenue = {
  sales: [20, 32, 15, 34, 31, 46, 37, 33, 16, 35, 34, 45],
  revenue: [38, 25, 42, 41, 73, 24, 37, 26, 42, 41, 65, 25],
};

const uiDesignTasks = [
  { title: "Sketch File", timeline: "4 weeks", completed: 80 },
  { title: "Adobe XD File", timeline: "3 weeks", completed: 70 },
  { title: "UI Implementation", timeline: "6 weeks", completed: 86 },
];

const projectHeaders: Array<{ label: string; align?: "left" | "center" | "right"; sortable?: boolean }> = [
  { label: "", align: "center" },
  { label: "Name", sortable: true },
  { label: "Deadline", sortable: true },
  { label: "Progress", sortable: true },
  { label: "Members" },
  { label: "Action", align: "right" },
];

interface ColumnStatItem {
  icon?: ReactNode;
  image?: string;
  heading: string;
  text: string;
  color?: string;
  trendColor?: string;
  trendIcon?: ReactNode;
}

const twoColStats: Array<{ title: string; items: ColumnStatItem[] }> = [
  {
    title: "Users",
    items: [
      { icon: <PhoneIphone />, color: "#ab47bc", heading: "46K", text: "+2.75%", trendColor: "#00c853", trendIcon: <TrendingUp sx={{ fontSize: 16 }} /> },
      { icon: <DesktopMac />, color: "#fbc02d", heading: "42K", text: "-3.25%", trendColor: "#ff5252", trendIcon: <TrendingDown sx={{ fontSize: 16 }} /> },
    ],
  },
  {
    title: "Happy Customers",
    items: [
      { icon: <Favorite />, color: "#ff4081", heading: "84K", text: "+2.75%", trendColor: "#ff4081", trendIcon: <TrendingUp sx={{ fontSize: 16 }} /> },
      { icon: <SentimentSatisfiedAlt />, color: "#ffb300", heading: "35K", text: "+9.10%", trendColor: "#00c853", trendIcon: <TrendingUp sx={{ fontSize: 16 }} /> },
    ],
  },
  {
    title: "Tickets",
    items: [
      { icon: <PlaylistAdd />, color: "#00b0ff", heading: "12K", text: "Created" },
      { icon: <PlaylistAddCheck />, color: "#1de9b6", heading: "35K", text: "Completed" },
    ],
  },
  {
    title: "UI Users",
    items: [
      { image: sketchLogo, heading: "82K", text: "Likes", trendColor: "#ff4081", trendIcon: <Favorite sx={{ fontSize: 15 }} /> },
      { image: adobeXdLogo, heading: "78K", text: "Likes", trendColor: "#ff4081", trendIcon: <Favorite sx={{ fontSize: 15 }} /> },
    ],
  },
];

const projects = [
  { username: users[10].firstname, avatar: users[10].avatar, name: "Sketch File Template", deadline: "3 days later", progress: 85, color: "#00838f", members: [users[9], users[13], users[14]], membersCount: 3 },
  { username: users[5].firstname, avatar: users[5].avatar, name: "Layout Design", deadline: "1 weeks later", progress: 72, color: "#ff9800", members: [users[9], users[13], users[10]], membersCount: 4 },
  { username: users[14].firstname, avatar: users[14].avatar, name: "GraphQL API", deadline: "1 Month later", progress: 50, color: "#2196f3", members: [users[9], users[13]], membersCount: 2 },
  { username: users[13].firstname, avatar: users[13].avatar, name: "Lambda Testing", deadline: "2 Month later", progress: 30, color: "#009688", members: [users[9], users[14], users[5]], membersCount: 10 },
  { username: users[9].firstname, avatar: users[9].avatar, name: "Project Deploy", deadline: "half year later", progress: 15, color: "#f44336", members: [users[9]], membersCount: 1 },
];
