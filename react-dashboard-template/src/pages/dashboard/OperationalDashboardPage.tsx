import { useMemo, useState, type ReactNode } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
  Grid,
  IconButton,
  InputBase,
  LinearProgress,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import {
  Add,
  ArrowUpward,
  Comment,
  DeleteOutline,
  EditOutlined,
  ImportExport,
  Inventory2Outlined,
  InsertChartOutlined,
  MoreVert,
  People,
  Storefront,
} from "@mui/icons-material";
import { Bar, Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import "../../components/ChartJS/chartConfig";
import shoeRevolt from "../../assets/ui-components/widgets/lists/shoe-revolt-unsplash.webp";
import appleTeal from "../../assets/ui-components/widgets/lists/apple-teal.webp";
import strawberry from "../../assets/ui-components/widgets/lists/strawberry.webp";
import heinzMustard from "../../assets/ui-components/widgets/lists/heinz-mustard.webp";
import coffeeCup from "../../assets/ui-components/widgets/lists/coffee-yellow-cup.webp";
import nikeRedShoe from "../../assets/ui-components/widgets/lists/nike-red-shoe.webp";
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
import avatarM4 from "../../assets/ui-components/widgets/lists/m4.jpg";
import avatarMen1 from "../../assets/ui-components/widgets/lists/men1.png";

const neuGlow = "-7px -7px 5px rgba(255,255,255,.86), 7px 7px 7px rgba(174,174,192,.30)";
const neuGlowSmall = "-4px -4px 5px rgba(255,255,255,.88), 5px 5px 7px rgba(174,174,192,.28)";
const neuInset = "inset -5px -5px 6px rgba(255,255,255,.88), inset 6px 6px 8px rgba(174,174,192,.30)";

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const users = {
  jack: { name: "Jack Johnson", designation: "Network Engineer", avatar: avatarMen1 },
  camelia: { name: "Camelia Lopez", designation: "Network Engineer", avatar: avatarJulieta },
  denis: { name: "Denis Richard", designation: "Network Engineer", avatar: avatar2 },
  mia: { name: "Mia Willson", designation: "Network Engineer", avatar: avatarLily },
  regina: { name: "Regina E. Hernandez", designation: "Designer Lead", avatar: avatarG2 },
  mary: { name: "Mary Beveridge", designation: "HR Manager", avatar: avatarG3 },
  gulnaz: { name: "Gulnaz Vorobyova", designation: "Frontend Engineer", avatar: avatarG4 },
  aline: { name: "Aline Correia", designation: "Project Mananager", avatar: avatarG5 },
  jane: { name: "Jane T. Keys", designation: "Software Engineer", avatar: avatarG6 },
  timothy: { name: "Timothy Macredie", designation: "Photographer", avatar: avatarM1 },
  beau: { name: "Beau Liversidge", designation: "Designer", avatar: avatarM2 },
  davi: { name: "Davi Martins Dias", designation: "Marketing Lead", avatar: avatarM3 },
  john: { name: "John Mowbray", designation: "Technical Lead", avatar: avatarM4 },
};

export default function OperationalDashboardPage() {
  return (
    <Box className="vuse-content-wrapper">
      <Grid container spacing={3}>
        {operationalStats.map((stat) => (
          <Grid item xs={12} sm={6} lg={3} key={stat.title}>
            <BasicStatistic {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 0 }}>
        <Grid item xs={12} md={7}>
          <RevenueCard />
        </Grid>
        <Grid item xs={12} md={5}>
          <VisitsCard />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 0 }}>
        <Grid item xs={12} md={4}>
          <LatestMediaList />
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <BlogPostCard />
            <TaskStatus />
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <TicketCheckList />
            <MembersList />
          </Stack>
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

function BasicStatistic({ title, heading, icon, color, percent }: { title: string; heading: string; icon: ReactNode; color: string; percent: string }) {
  return (
    <VuseCard sx={{ height: "100%" }}>
      <CardContent>
        <Typography sx={{ fontSize: 18, fontWeight: 500, mb: 1.5 }}>{title}</Typography>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box sx={{ minWidth: 0, flexGrow: 1 }}>
            <Typography variant="h4" sx={{ fontSize: 34, fontWeight: 500, lineHeight: 1.2 }}>
              {heading}
            </Typography>
            <Box sx={{ color: "text.secondary", fontSize: 14.5, mt: 0.75 }}>
              <Stack component="span" direction="row" alignItems="center" spacing={0.75} sx={{ color: "#00bfa5", fontWeight: 500 }}>
                <ArrowUpward sx={{ fontSize: 17 }} />
                <span dangerouslySetInnerHTML={{ __html: percent }} />
              </Stack>
              <Box sx={{ mt: 0.15 }}>Since last month</Box>
            </Box>
          </Box>
          <Avatar sx={{ width: 50, height: 50, bgcolor: "background.default", color, boxShadow: neuGlowSmall }}>
            {icon}
          </Avatar>
        </Stack>
      </CardContent>
    </VuseCard>
  );
}

function DashboardCardHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between" spacing={2} sx={{ px: 2, py: 2 }}>
      <Typography sx={{ fontSize: 20, fontWeight: 500 }}>{title}</Typography>
      {children}
    </Stack>
  );
}

function RevenueCard() {
  const [mode, setMode] = useState<"monthly" | "weekly">("monthly");
  const data = useMemo<ChartData<"line">>(() => {
    const isMonthly = mode === "monthly";
    return {
      labels: monthLabels,
      datasets: [
        {
          label: "Sales",
          data: isMonthly ? [40, 39, 20, 40, 38, 50, 40, 39, 20, 40, 38, 50] : [20, 32, 15, 34, 31, 46, 37, 33, 16, 35, 34, 45],
          borderColor: isMonthly ? "#2979ff" : "#00bcd4",
          backgroundColor: isMonthly ? "rgba(41,121,255,.18)" : "rgba(0,188,212,.16)",
          fill: true,
          pointRadius: 0,
          borderWidth: 0,
          tension: 0.35,
          order: 0,
        },
        {
          label: "Revenue",
          data: isMonthly ? [43, 30, 48, 47, 70, 30, 43, 30, 48, 47, 70, 30] : [38, 25, 42, 41, 73, 24, 37, 26, 42, 41, 65, 25],
          borderColor: isMonthly ? "#3d5afe" : "#e91e63",
          backgroundColor: isMonthly ? "rgba(61,90,254,.18)" : "rgba(233,30,99,.14)",
          fill: true,
          pointRadius: 0,
          borderWidth: 0,
          tension: 0.35,
          order: 1,
        },
      ],
    };
  }, [mode]);

  return (
    <VuseCard>
      <DashboardCardHeader title="Revenue">
        <Stack direction="row" sx={{ height: 40, borderRadius: 1, boxShadow: neuGlowSmall, overflow: "hidden" }}>
          {(["monthly", "weekly"] as const).map((value) => (
            <Button key={value} onClick={() => setMode(value)} sx={segmentedButtonSx(mode === value)}>
              {value === "monthly" ? "Monthly" : "Weekly"}
            </Button>
          ))}
        </Stack>
      </DashboardCardHeader>
      <Box sx={{ px: 2, pb: 1.5, height: 402 }}>
        <Line data={data} options={dashboardLineOptions} />
      </Box>
    </VuseCard>
  );
}

function VisitsCard() {
  const data: ChartData<"bar"> = {
    labels: monthLabels,
    datasets: [
      {
        label: "Visits",
        data: [40, 39, 20, 40, 38, 50, 40, 39, 20, 40, 38, 50],
        backgroundColor: "#ce93d8",
        categoryPercentage: 0.5,
        barPercentage: 0.5,
        borderRadius: 4,
      },
      {
        label: "Order",
        data: [43, 30, 48, 47, 70, 30, 43, 30, 48, 47, 70, 30],
        backgroundColor: "#2979ff",
        categoryPercentage: 0.5,
        barPercentage: 0.5,
        borderRadius: 4,
      },
    ],
  };

  return (
    <VuseCard>
      <DashboardCardHeader title="Visits" />
      <Box sx={{ px: 2, pb: 1.5, height: 410 }}>
        <Bar data={data} options={dashboardBarOptions} />
      </Box>
    </VuseCard>
  );
}

function CardHeader({ title, menu = false }: { title: string; menu?: boolean }) {
  return (
    <CardContent sx={{ pb: 0 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography sx={{ fontSize: 20, fontWeight: 500 }}>{title}</Typography>
        {menu && (
          <IconButton aria-label={`${title} options`} sx={{ color: "text.secondary" }}>
            <MoreVert />
          </IconButton>
        )}
      </Stack>
    </CardContent>
  );
}

function LatestMediaList() {
  return (
    <VuseCard>
      <CardHeader title="Latest Media" menu />
      <CardContent sx={{ pt: 2.25 }}>
        <Stack spacing={2}>
          {[
            { image: shoeRevolt, user: users.mary.name, status: "Published", color: "#1de9b6" },
            { image: appleTeal, user: users.mary.name, status: "Published", color: "#1de9b6" },
            { image: strawberry, user: users.mary.name, status: "Progress", color: "#ffc400" },
            { image: heinzMustard, user: users.mary.name, status: "Rejected", color: "#f44336" },
            { image: coffeeCup, user: users.mary.name, status: "Published", color: "#1de9b6" },
            { image: nikeRedShoe, user: users.gulnaz.name, status: "Published", color: "#1de9b6" },
          ].map((item, index) => (
            <SoftListRow key={`${item.image}-${index}`} image={item.image} title={item.user} subtitle="May 01, 2026">
              <Chip label={item.status} size="small" sx={{ height: 23, borderRadius: 999, bgcolor: item.color, color: "#fff", fontSize: 12, fontWeight: 500 }} />
            </SoftListRow>
          ))}
        </Stack>
      </CardContent>
    </VuseCard>
  );
}

function SoftListRow({ image, avatar, title, subtitle, children }: { image?: string; avatar?: string; title: string; subtitle: string; children?: ReactNode }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ width: "100%", minHeight: 68, borderRadius: 1, p: 1.25, boxShadow: neuGlowSmall, "&:hover": { boxShadow: neuInset } }}>
      {image && <Box component="img" src={image} alt="" sx={{ width: 100, height: 62, borderRadius: 1, objectFit: "contain", flexShrink: 0 }} />}
      {avatar && <Avatar src={avatar} sx={{ width: 42, height: 42, flexShrink: 0 }} />}
      <Box sx={{ minWidth: 0, flexGrow: 1 }}>
        <Typography noWrap sx={{ fontSize: 15, fontWeight: 600, lineHeight: 1.35 }}>{title}</Typography>
        <Typography noWrap color="text.secondary" sx={{ fontSize: 13.5 }}>{subtitle}</Typography>
      </Box>
      {children}
    </Stack>
  );
}

function BlogPostCard() {
  return (
    <VuseCard>
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 2, pt: 2 }}>
        <Avatar src={users.timothy.avatar} sx={{ width: 40, height: 40 }} />
        <Typography sx={{ flexGrow: 1, fontSize: 16 }}>{users.timothy.name}</Typography>
        <IconButton aria-label="Post options" sx={{ color: "text.secondary" }}>
          <MoreVert />
        </IconButton>
      </Stack>
      <CardMedia component="img" image="https://picsum.photos/500/300?image=292" sx={{ height: 250, objectFit: "cover", mt: 1.5 }} />
      <CardContent sx={{ pb: 0 }}>
        <Typography variant="h6" sx={{ fontSize: 21, fontWeight: 500, mb: 0.5 }}>Salad Recipes</Typography>
        <Typography color="text.secondary" sx={{ fontSize: 14, mb: 2 }}>May 1, 2026</Typography>
        <Typography color="text.secondary" sx={{ fontSize: 14.5, lineHeight: 1.55 }}>
          Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 1.5, pb: 1.25 }}>
        <Button startIcon={<Box component="span" sx={{ color: "#f44336", display: "grid" }}>♥</Box>} sx={{ color: "text.primary", fontWeight: 500 }}>213 Likes</Button>
        <Button startIcon={<Comment />} sx={{ color: "text.primary", fontWeight: 500 }}>123 Comments</Button>
      </CardActions>
    </VuseCard>
  );
}

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
      <Typography color="text.secondary" sx={{ fontSize: 14.5, mb: 1 }}>{title}</Typography>
      <Box sx={{ borderRadius: 1, boxShadow: neuGlowSmall, py: 1.5, px: 1.75 }}>
        <Stack spacing={2}>
          {tasks.map((task) => (
            <Box key={task.title}>
              <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ mb: 0.75 }}>
                <Typography sx={{ fontSize: 12 }}>{task.title}</Typography>
                <Typography sx={{ fontSize: 12, textAlign: "right" }}>{task.timeline}</Typography>
              </Stack>
              <LinearProgress variant="determinate" value={task.completedPercentage} sx={{ height: 4, borderRadius: 999, bgcolor: "rgba(111,125,133,.16)", "& .MuiLinearProgress-bar": { borderRadius: 999, bgcolor: "primary.main" } }} />
            </Box>
          ))}
        </Stack>
      </Box>
    </CardContent>
  );
}

function TicketCheckList() {
  const [tasks, setTasks] = useState(ticketTasks);
  const [activeList, setActiveList] = useState(true);
  const [taskInput, setTaskInput] = useState("");
  const completedTasks = tasks.filter((item) => item.isCompleted).length;
  const activeTasks = tasks.length - completedTasks;
  const renderList = tasks.filter((item) => item.isCompleted !== activeList);

  const updateTask = (targetIndex: number, checked: boolean) => {
    const target = renderList[targetIndex];
    setTasks((current) => current.map((item) => (item === target ? { ...item, isCompleted: checked } : item)));
  };

  const addTask = () => {
    const title = taskInput.trim();
    if (!title) return;
    setTasks((current) => [{ title, body: "", isCompleted: false, tag: "Backlog", color: "#ffc400" }, ...current]);
    setTaskInput("");
  };

  return (
    <VuseCard>
      <CardContent sx={{ pb: 1.5 }}>
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between" spacing={1.25}>
          <Typography sx={{ fontSize: 20, fontWeight: 500 }}>Tickets</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <FilterButton active={activeList} onClick={() => setActiveList(true)}>{activeTasks} Active Tasks</FilterButton>
            <FilterButton active={!activeList} onClick={() => setActiveList(false)}>{completedTasks} Completed Tasks</FilterButton>
          </Stack>
        </Stack>
      </CardContent>
      <Box sx={{ mx: 2, mb: 2, px: 1.5, py: 0.85, borderRadius: 1, boxShadow: neuInset }}>
        <InputBase
          fullWidth
          placeholder="Add New"
          value={taskInput}
          onChange={(event) => setTaskInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") addTask();
          }}
          sx={{ fontSize: 14.5 }}
        />
      </Box>
      <CardContent sx={{ pt: 0 }}>
        <Stack spacing={2}>
          {renderList.map((item, index) => (
            <TicketRow key={`${item.title}-${index}`} item={item} onChecked={(checked) => updateTask(index, checked)} />
          ))}
        </Stack>
      </CardContent>
    </VuseCard>
  );
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <Button size="small" onClick={onClick} sx={{ minHeight: 25, px: 1.25, borderRadius: 999, bgcolor: active ? "primary.main" : "transparent", color: active ? "#fff" : "text.secondary", fontSize: 12, fontWeight: 600, "&:hover": { bgcolor: active ? "primary.main" : "rgba(0,131,143,.08)" } }}>
      {children}
    </Button>
  );
}

function TicketRow({ item, onChecked }: { item: TicketTask; onChecked: (checked: boolean) => void }) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  return (
    <Stack direction="row" alignItems="flex-start" sx={{ position: "relative", minHeight: 78, borderRadius: 1, p: 1.25, pl: 1.75, boxShadow: neuGlowSmall, overflow: "hidden" }}>
      <Box sx={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 5, height: 50, bgcolor: item.color, borderRadius: "0 4px 4px 0" }} />
      <Checkbox checked={item.isCompleted} onChange={(event) => onChecked(event.target.checked)} sx={{ p: 0.25, mr: 1, color: "primary.main", "&.Mui-checked": { color: "primary.main" } }} />
      <Box sx={{ minWidth: 0, flexGrow: 1 }}>
        <Typography sx={{ fontSize: 15, fontWeight: 600, mt: 0.25, lineHeight: 1.35 }}>{item.title}</Typography>
        <Typography color="text.secondary" sx={{ fontSize: 14, lineHeight: 1.45 }}>{item.body}</Typography>
        <Chip label={item.tag} size="small" sx={{ mt: 1, bgcolor: item.color, color: "#fff", height: 23, fontSize: 12 }} />
      </Box>
      <IconButton aria-label={`${item.title} menu`} onClick={(event) => setAnchor(event.currentTarget)} sx={{ color: "text.secondary", mt: -0.5 }}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)} PaperProps={{ sx: { bgcolor: "background.default", borderRadius: 1, boxShadow: neuGlow, mt: 0.5 } }}>
        <MenuItem onClick={() => setAnchor(null)}><EditOutlined fontSize="small" sx={{ mr: 1.5 }} />Edit</MenuItem>
        <MenuItem onClick={() => setAnchor(null)}><Inventory2Outlined fontSize="small" sx={{ mr: 1.5 }} />Move to Archive</MenuItem>
        <MenuItem onClick={() => setAnchor(null)}><DeleteOutline fontSize="small" sx={{ mr: 1.5 }} />Delete</MenuItem>
      </Menu>
    </Stack>
  );
}

function MembersList() {
  return (
    <VuseCard>
      <Typography sx={{ fontSize: 20, fontWeight: 500, px: 2, pt: 2, pb: 1.25 }}>Members</Typography>
      <CardContent sx={{ pt: 0 }}>
        <Stack spacing={1.5}>
          {[users.camelia, users.mia, users.regina, users.john, users.beau].map((user) => (
            <Stack key={user.name} direction="row" alignItems="center" spacing={1.5} sx={{ minHeight: 46 }}>
              <Avatar src={user.avatar} sx={{ width: 42, height: 42 }} />
              <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                <Typography noWrap sx={{ fontSize: 15.5, lineHeight: 1.35 }}>{user.name}</Typography>
                <Typography noWrap color="text.secondary" sx={{ fontSize: 13.5 }}>{user.designation}</Typography>
              </Box>
              <IconButton aria-label={`Add ${user.name}`} sx={{ width: 32, height: 32, bgcolor: "background.default", boxShadow: neuGlowSmall, "&:hover": { bgcolor: "background.default", boxShadow: neuInset } }}>
                <Add sx={{ fontSize: 18, color: "#00bfa5" }} />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </VuseCard>
  );
}

const segmentedButtonSx = (active: boolean) => ({
  px: 2,
  minWidth: 86,
  borderRadius: 0,
  color: active ? "secondary.main" : "text.secondary",
  bgcolor: active ? "rgba(255,183,77,.12)" : "transparent",
  textTransform: "none",
  fontWeight: 500,
  "&:hover": { bgcolor: active ? "rgba(255,183,77,.18)" : "rgba(0,0,0,.04)" },
});

const gridStyle = {
  color: "rgba(103,116,132,.24)",
  borderDash: [8, 4],
};

const dashboardLineOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
  scales: {
    x: { stacked: true, grid: { display: false } },
    y: { stacked: true, beginAtZero: true, grid: gridStyle },
  },
};

const dashboardBarOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true, suggestedMin: 0, suggestedMax: 100, grid: gridStyle },
  },
};

const operationalStats = [
  { title: "Sales", heading: "106K", icon: <Storefront />, color: "#2196f3", percent: "+4.25<sup>%</sup>" },
  { title: "New Users", heading: "3214", icon: <People />, color: "#ff8f00", percent: "+2.25<sup>%</sup>" },
  { title: "Traffic", heading: "350K", icon: <ImportExport />, color: "#ff4081", percent: "+4.75<sup>%</sup>" },
  { title: "Performance", heading: "78.67%", icon: <InsertChartOutlined />, color: "#00bcd4", percent: "+4.75<sup>%</sup>" },
];

const ongoingTasks = [
  { title: "Sketch File", timeline: "4 weeks", completedPercentage: 80 },
  { title: "Adobe XD File", timeline: "3 weeks", completedPercentage: 70 },
  { title: "UI Implementation", timeline: "6 weeks", completedPercentage: 86 },
];

const upcomingTasks = [
  { title: "Project Scoping", timeline: "2 weeks", completedPercentage: 50 },
  { title: "Wireframes", timeline: "5 weeks", completedPercentage: 35 },
  { title: "API Integration", timeline: "7 weeks", completedPercentage: 64 },
];

interface TicketTask {
  title: string;
  body: string;
  isCompleted: boolean;
  tag: string;
  color: string;
}

const ticketTasks: TicketTask[] = [
  { title: "[PRE-110] Project Scoping & Estimation", body: "Culpa sint aliqua adipisicing officia aliquip excepteur occaecat dolor velit culpa ullamco.", isCompleted: true, tag: "In Progress", color: "#2979ff" },
  { title: "[PRE-111] Logo Making", body: "Culpa sint aliqua adipisicing officia aliquip excepteur occaecat dolor velit culpa ullamco.", isCompleted: false, tag: "UX/UI", color: "#f06292" },
  { title: "[PRE-112] Sprint Planning", body: "Sint officia aute incididunt dolor sit consectetur laborum consequat est adipisicing veniam dolor.", isCompleted: true, tag: "Backlog", color: "#ffc400" },
  { title: "[UI-145] WireFrames and Design", body: "Minim fugiat labore est enim consectetur anim commodo irure reprehenderit est.", isCompleted: false, tag: "FrontEnd", color: "#2979ff" },
  { title: "[SV-180] Gather API requirement", body: "Officia consectetur consectetur adipisicing consectetur commodo enim tempor nulla reprehenderit occaecat.", isCompleted: false, tag: "Backend", color: "#9e9e9e" },
];
