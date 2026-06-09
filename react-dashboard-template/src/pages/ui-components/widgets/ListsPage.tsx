import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Fuse from "fuse.js";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Grid,
  IconButton,
  InputBase,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Add, DeleteOutline, EditOutlined, Favorite, FavoriteBorder, FormatListBulleted, Inventory2Outlined, MoreVert } from "@mui/icons-material";
import VuseSectionDefinition from "../../../components/layout/VuseSectionDefinition";
import shoeRevolt from "../../../assets/ui-components/widgets/lists/shoe-revolt-unsplash.webp";
import appleTeal from "../../../assets/ui-components/widgets/lists/apple-teal.webp";
import strawberry from "../../../assets/ui-components/widgets/lists/strawberry.webp";
import heinzMustard from "../../../assets/ui-components/widgets/lists/heinz-mustard.webp";
import coffeeCup from "../../../assets/ui-components/widgets/lists/coffee-yellow-cup.webp";
import nikeRedShoe from "../../../assets/ui-components/widgets/lists/nike-red-shoe.webp";
import avatar2 from "../../../assets/ui-components/widgets/lists/2.jpg";
import avatarG2 from "../../../assets/ui-components/widgets/lists/g2.jpg";
import avatarG3 from "../../../assets/ui-components/widgets/lists/g3.jpg";
import avatarG4 from "../../../assets/ui-components/widgets/lists/g4.jpg";
import avatarG5 from "../../../assets/ui-components/widgets/lists/g5.jpg";
import avatarG6 from "../../../assets/ui-components/widgets/lists/g6.jpg";
import avatarJulieta from "../../../assets/ui-components/widgets/lists/julieta.png";
import avatarLily from "../../../assets/ui-components/widgets/lists/lily.png";
import avatarM1 from "../../../assets/ui-components/widgets/lists/m1.jpg";
import avatarM2 from "../../../assets/ui-components/widgets/lists/m2.jpg";
import avatarM3 from "../../../assets/ui-components/widgets/lists/m3.jpg";
import avatarM4 from "../../../assets/ui-components/widgets/lists/m4.jpg";
import avatarMen1 from "../../../assets/ui-components/widgets/lists/men1.png";

const neuGlow = "-7px -7px 5px rgba(255,255,255,.86), 7px 7px 7px rgba(174,174,192,.30)";
const neuGlowSmall = "-4px -4px 5px rgba(255,255,255,.88), 5px 5px 7px rgba(174,174,192,.28)";
const neuInset = "inset -5px -5px 6px rgba(255,255,255,.88), inset 6px 6px 8px rgba(174,174,192,.30)";

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

type Action =
  | { type: "chip"; label: string; color: string }
  | { type: "icon"; icon: "favorite" | "favorite_border" | "add"; color: string; raised?: boolean }
  | { type: "text"; label: string; color: string };

interface FlexItemData {
  title: string;
  body: string;
  image?: string;
  avatar?: string;
  avatarText?: string;
  action?: Action;
}

interface SearchItemData {
  title: string;
  subtitle: string;
  avatar: string;
  action: Action;
}

interface TaskItem {
  title: string;
  body: string;
  isCompleted: boolean;
  tags: Array<{ name?: string; color: string; textColor?: string }>;
}

export default function ListsPage() {
  return (
    <>
      <VuseSectionDefinition
        title="List Widgets"
        namespace="Widgets"
        icon={<FormatListBulleted />}
        breadcrumbs={[
          { label: "Widgets", href: "/widgets/lists" },
          { label: "List" },
        ]}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <LatestMediaList />
            <TicketCheckList />
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <AuthorList />
            <TransactionsList />
            <TodoList />
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <MembersList />
            <BestSellerList />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

function VuseCard({ children, sx = {} }: { children: ReactNode; sx?: object }) {
  return (
    <Card sx={{ bgcolor: "background.default", borderRadius: 1, boxShadow: neuGlow, backgroundImage: "none", overflow: "visible", ...sx }}>
      {children}
    </Card>
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

function ActionView({ action }: { action?: Action }) {
  if (!action) return null;
  if (action.type === "chip") {
    return <Chip label={action.label} size="small" sx={{ height: 23, borderRadius: 999, bgcolor: action.color, color: "#fff", fontSize: 12, fontWeight: 500 }} />;
  }
  if (action.type === "text") {
    return <Typography sx={{ color: action.color, fontSize: 15, fontWeight: 600 }}>{action.label}</Typography>;
  }
  const icon =
    action.icon === "favorite" ? <Favorite sx={{ fontSize: 18, color: action.color }} /> : action.icon === "favorite_border" ? <FavoriteBorder sx={{ fontSize: 18, color: action.color }} /> : <Add sx={{ fontSize: 18, color: action.color }} />;
  return (
    <IconButton
      aria-label={action.icon}
      sx={{
        width: 32,
        height: 32,
        color: action.color,
        bgcolor: "background.default",
        boxShadow: action.raised ? neuGlowSmall : "none",
        "&:hover": { bgcolor: "background.default", boxShadow: neuInset },
      }}
    >
      {icon}
    </IconButton>
  );
}

function FlexList({ title, items, align = "center" }: { title: string; items: FlexItemData[]; align?: "center" | "start" }) {
  return (
    <VuseCard>
      <CardHeader title={title} menu />
      <CardContent sx={{ pt: 2.25 }}>
        <Stack spacing={2}>
          {items.map((item) => (
            <FlexRow key={`${title}-${item.title}-${item.body}-${item.image ?? item.avatar ?? item.avatarText}`} item={item} align={align} />
          ))}
        </Stack>
      </CardContent>
    </VuseCard>
  );
}

function FlexRow({ item, align }: { item: FlexItemData; align: "center" | "start" }) {
  return (
    <Stack
      direction="row"
      alignItems={align === "start" ? "flex-start" : "center"}
      spacing={1.5}
      sx={{
        width: "100%",
        minHeight: 68,
        borderRadius: 1,
        p: 1.25,
        boxShadow: neuGlowSmall,
        transition: "box-shadow 140ms ease",
        "&:hover": { boxShadow: neuInset },
      }}
    >
      {item.image && <Box component="img" src={item.image} alt="" sx={{ width: 100, height: 62, borderRadius: 1, objectFit: "contain", flexShrink: 0 }} />}
      {item.avatar && <Avatar src={item.avatar} sx={{ width: 42, height: 42, flexShrink: 0 }} />}
      {item.avatarText && (
        <Avatar sx={{ width: 42, height: 42, flexShrink: 0, bgcolor: "#2979ff", color: "#fff", boxShadow: neuGlowSmall }}>
          {item.avatarText}
        </Avatar>
      )}
      <Box sx={{ minWidth: 0, flexGrow: 1, mx: 0.5 }}>
        <Typography noWrap sx={{ fontSize: 15, fontWeight: 600, lineHeight: 1.35 }}>
          {item.title}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: 14, lineHeight: 1.45 }}>
          {item.body}
        </Typography>
      </Box>
      <Box sx={{ flexShrink: 0 }}>
        <ActionView action={item.action} />
      </Box>
    </Stack>
  );
}

function SearchableList({ title, items }: { title: string; items: SearchItemData[] }) {
  const [input, setInput] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => setSearchText(input), 1200);
    return () => window.clearTimeout(timeout);
  }, [input]);

  const visibleItems = useMemo(() => {
    if (!searchText.trim()) return items;
    const fuse = new Fuse(items, { includeScore: true, keys: ["title", "subtitle"] });
    return fuse.search(searchText).map((result) => result.item);
  }, [items, searchText]);

  return (
    <VuseCard>
      <Typography sx={{ fontSize: 20, fontWeight: 500, px: 2, pt: 2, pb: 1.25 }}>{title}</Typography>
      <Box sx={{ mx: 1.5, mb: 1.75, px: 1.5, py: 0.85, borderRadius: 1, boxShadow: neuInset }}>
        <InputBase fullWidth placeholder="Search" value={input} onChange={(event) => setInput(event.target.value)} sx={{ fontSize: 14.5 }} />
      </Box>
      <CardContent sx={{ pt: 0 }}>
        <Stack spacing={1.5}>
          {visibleItems.map((item) => (
            <Stack key={`${title}-${item.title}`} direction="row" alignItems="center" spacing={1.5} sx={{ minHeight: 46 }}>
              <Avatar src={item.avatar} sx={{ width: 42, height: 42 }} />
              <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                <Typography noWrap sx={{ fontSize: 15.5, lineHeight: 1.35 }}>
                  {item.title}
                </Typography>
                <Typography noWrap color="text.secondary" sx={{ fontSize: 13.5 }}>
                  {item.subtitle}
                </Typography>
              </Box>
              <ActionView action={item.action} />
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </VuseCard>
  );
}

function CheckList({ title, initialItems, filterable = false, enableCreateNew = false, showTags = false }: { title: string; initialItems: TaskItem[]; filterable?: boolean; enableCreateNew?: boolean; showTags?: boolean }) {
  const [tasks, setTasks] = useState(initialItems);
  const [activeList, setActiveList] = useState(true);
  const [taskInput, setTaskInput] = useState("");
  const completedTasks = tasks.filter((item) => item.isCompleted).length;
  const activeTasks = tasks.length - completedTasks;
  const renderList = filterable ? tasks.filter((item) => item.isCompleted !== activeList) : tasks;

  const updateTask = (index: number, checked: boolean) => {
    const target = renderList[index];
    setTasks((current) => current.map((item) => (item === target ? { ...item, isCompleted: checked } : item)));
  };

  const addTask = () => {
    const titleValue = taskInput.trim();
    if (!titleValue) return;
    setTasks((current) => [{ title: titleValue, body: "", isCompleted: false, tags: [] }, ...current]);
    setTaskInput("");
  };

  return (
    <VuseCard>
      <CardContent sx={{ pb: 1.5 }}>
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between" spacing={1.25}>
          <Typography sx={{ fontSize: 20, fontWeight: 500 }}>{title}</Typography>
          {filterable && (
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <FilterButton active={activeList} onClick={() => setActiveList(true)}>{activeTasks} Active Tasks</FilterButton>
              <FilterButton active={!activeList} onClick={() => setActiveList(false)}>{completedTasks} Completed Tasks</FilterButton>
            </Stack>
          )}
        </Stack>
      </CardContent>
      {enableCreateNew && (
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
      )}
      <CardContent sx={{ pt: 0 }}>
        <Stack spacing={2}>
          {renderList.map((item, index) => (
            <CheckListRow key={`${item.title}-${index}`} item={item} showTags={showTags} onChecked={(checked) => updateTask(index, checked)} />
          ))}
        </Stack>
      </CardContent>
    </VuseCard>
  );
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <Button
      size="small"
      onClick={onClick}
      sx={{
        minHeight: 25,
        px: 1.25,
        borderRadius: 999,
        bgcolor: active ? "primary.main" : "transparent",
        color: active ? "#fff" : "text.secondary",
        fontSize: 12,
        fontWeight: 600,
        "&:hover": { bgcolor: active ? "primary.main" : "rgba(0,131,143,.08)" },
      }}
    >
      {children}
    </Button>
  );
}

function CheckListRow({ item, showTags, onChecked }: { item: TaskItem; showTags: boolean; onChecked: (checked: boolean) => void }) {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const tagColor = item.tags[0]?.color ? colorFromVue(item.tags[0].color) : undefined;

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      sx={{
        position: "relative",
        minHeight: 78,
        borderRadius: 1,
        p: 1.25,
        pl: item.tags.length ? 1.75 : 1.25,
        boxShadow: neuGlowSmall,
        overflow: "hidden",
      }}
    >
      {item.tags.length > 0 && <Box sx={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 5, height: 50, bgcolor: tagColor, borderRadius: "0 4px 4px 0" }} />}
      <Checkbox checked={item.isCompleted} onChange={(event) => onChecked(event.target.checked)} sx={{ p: 0.25, mr: 1, color: "primary.main", "&.Mui-checked": { color: "primary.main" } }} />
      <Box sx={{ minWidth: 0, flexGrow: 1 }}>
        <Typography sx={{ fontSize: 15, fontWeight: 600, mt: 0.25, lineHeight: 1.35 }}>{item.title}</Typography>
        <Typography color="text.secondary" sx={{ fontSize: 14, lineHeight: 1.45 }}>{item.body}</Typography>
        {showTags && item.tags.some((tag) => tag.name) && (
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
            {item.tags.filter((tag) => tag.name).map((tag) => (
              <Chip key={tag.name} label={tag.name} size="small" sx={{ bgcolor: colorFromVue(tag.color), color: tag.textColor === "white" ? "#fff" : "inherit", height: 23, fontSize: 12 }} />
            ))}
          </Stack>
        )}
      </Box>
      <IconButton aria-label={`${item.title} menu`} onClick={(event) => setAnchor(event.currentTarget)} sx={{ color: "text.secondary", mt: -0.5 }}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ sx: { bgcolor: "background.default", borderRadius: 1, boxShadow: neuGlow, mt: 0.5 } }}
      >
        <MenuItem onClick={() => setAnchor(null)}>
          <ListItemIcon><EditOutlined fontSize="small" /></ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setAnchor(null)}>
          <ListItemIcon><Inventory2Outlined fontSize="small" /></ListItemIcon>
          <ListItemText>Move to Archive</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setAnchor(null)}>
          <ListItemIcon><DeleteOutline fontSize="small" /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Stack>
  );
}

function colorFromVue(color: string) {
  if (color.includes("pink")) return "#f06292";
  if (color.includes("amber") || color.includes("warning")) return "#ffc400";
  if (color.includes("red") || color.includes("error")) return "#f44336";
  if (color.includes("blue") || color.includes("info")) return "#2979ff";
  if (color.includes("green") || color.includes("success")) return "#4caf50";
  if (color.includes("grey")) return "#9e9e9e";
  if (color.includes("teal")) return "#1de9b6";
  return color;
}

const dateFiveDaysAgo = "May 01, 2026";
const dateSevenDaysAgo = "Apr 29, 2026";
const dateEightDaysAgo = "Apr 28, 2026";
const dateNineDaysAgo = "Apr 27, 2026";

function LatestMediaList() {
  return (
    <FlexList
      title="Latest Media"
      align="start"
      items={[
        { title: users.mary.name, body: dateFiveDaysAgo, image: shoeRevolt, action: { type: "chip", label: "Published", color: "#1de9b6" } },
        { title: users.mary.name, body: dateFiveDaysAgo, image: appleTeal, action: { type: "chip", label: "Published", color: "#1de9b6" } },
        { title: users.mary.name, body: dateFiveDaysAgo, image: strawberry, action: { type: "chip", label: "Progress", color: "#ffc400" } },
        { title: users.mary.name, body: dateFiveDaysAgo, image: heinzMustard, action: { type: "chip", label: "Rejected", color: "#f44336" } },
        { title: users.mary.name, body: dateFiveDaysAgo, image: coffeeCup, action: { type: "chip", label: "Published", color: "#1de9b6" } },
        { title: users.gulnaz.name, body: dateFiveDaysAgo, image: nikeRedShoe, action: { type: "chip", label: "Published", color: "#1de9b6" } },
      ]}
    />
  );
}

function TicketCheckList() {
  return (
    <CheckList
      title="Tickets"
      filterable
      enableCreateNew
      showTags
      initialItems={[
        { title: "[PRE-110] Project Scoping & Estimation", body: "Culpa sint aliqua adipisicing officia aliquip excepteur occaecat dolor velit culpa ullamco.", isCompleted: true, tags: [{ name: "In Progress", color: "blue", textColor: "white" }] },
        { title: "[PRE-111] Logo Making", body: "Culpa sint aliqua adipisicing officia aliquip excepteur occaecat dolor velit culpa ullamco.", isCompleted: false, tags: [{ name: "UX/UI", color: "pink lighten-2", textColor: "white" }] },
        { title: "[PRE-112] Sprint Planning", body: "Sint officia aute incididunt dolor sit consectetur laborum consequat est adipisicing veniam dolor.", isCompleted: true, tags: [{ name: "Backlog", color: "amber", textColor: "white" }] },
        { title: "[UI-145] WireFrames and Design", body: "Minim fugiat labore est enim consectetur anim commodo irure reprehenderit est.", isCompleted: false, tags: [{ name: "FrontEnd", color: "blue", textColor: "white" }] },
        { title: "[SV-180] Gather API requirement", body: "Officia consectetur consectetur adipisicing consectetur commodo enim tempor nulla reprehenderit occaecat.", isCompleted: false, tags: [{ name: "Backend", color: "grey", textColor: "white" }] },
      ]}
    />
  );
}

function AuthorList() {
  return (
    <SearchableList
      title="Authors"
      items={[
        { title: users.denis.name, subtitle: "VueJS, Laravel", avatar: users.denis.avatar, action: { type: "icon", icon: "favorite", color: "#f44336" } },
        { title: users.mary.name, subtitle: "MySQL, MongoDB, Laravel", avatar: users.mary.avatar, action: { type: "icon", icon: "favorite", color: "#f44336" } },
        { title: users.john.name, subtitle: "React, Redux, Redux-Saga", avatar: users.john.avatar, action: { type: "icon", icon: "favorite", color: "#f44336" } },
        { title: users.jane.name, subtitle: "Atomic Design", avatar: users.jane.avatar, action: { type: "icon", icon: "favorite_border", color: "#f44336" } },
        { title: users.davi.name, subtitle: "GraphQL, Apollo, ReactJS", avatar: users.davi.avatar, action: { type: "icon", icon: "favorite", color: "#f44336" } },
      ]}
    />
  );
}

function TransactionsList() {
  return (
    <FlexList
      title="Transations"
      items={[
        { title: users.aline.name, body: dateFiveDaysAgo, avatar: users.aline.avatar, action: { type: "text", label: "+607", color: "#4caf50" } },
        { title: users.davi.name, body: dateSevenDaysAgo, avatar: users.davi.avatar, action: { type: "text", label: "-106", color: "#f44336" } },
        { title: users.gulnaz.name, body: dateEightDaysAgo, avatar: users.gulnaz.avatar, action: { type: "text", label: "+106", color: "#4caf50" } },
        { title: users.beau.name, body: dateNineDaysAgo, avatar: users.beau.avatar, action: { type: "text", label: "+116", color: "#4caf50" } },
        { title: users.camelia.name, body: dateNineDaysAgo, avatarText: "CL", action: { type: "text", label: "+105", color: "#4caf50" } },
      ]}
    />
  );
}

function TodoList() {
  return (
    <CheckList
      title="Todo"
      initialItems={[
        { title: "Project Scoping & Estimation", body: "Due in 1 day", isCompleted: false, tags: [{ color: "info" }] },
        { title: "Sprint Planning", body: "Due in 2 day", isCompleted: false, tags: [{ color: "warning" }] },
        { title: "WireFrames and Design", body: "Due in 1Wk", isCompleted: false, tags: [{ color: "error" }] },
        { title: "Gather API requirement", body: "Due in 10 Days", isCompleted: false, tags: [{ color: "success" }] },
      ]}
    />
  );
}

function MembersList() {
  return (
    <SearchableList
      title="Members"
      items={[
        { title: users.camelia.name, subtitle: users.camelia.designation, avatar: users.camelia.avatar, action: { type: "icon", icon: "add", color: "#00bfa5", raised: true } },
        { title: users.mia.name, subtitle: users.mia.designation, avatar: users.mia.avatar, action: { type: "icon", icon: "add", color: "#00bfa5", raised: true } },
        { title: users.regina.name, subtitle: users.regina.designation, avatar: users.regina.avatar, action: { type: "icon", icon: "add", color: "#00bfa5", raised: true } },
        { title: users.john.name, subtitle: users.john.designation, avatar: users.john.avatar, action: { type: "icon", icon: "add", color: "#00bfa5", raised: true } },
        { title: users.beau.name, subtitle: users.beau.designation, avatar: users.beau.avatar, action: { type: "icon", icon: "add", color: "#00bfa5", raised: true } },
      ]}
    />
  );
}

function BestSellerList() {
  return (
    <FlexList
      title="Monthly Best Sellers"
      items={[
        { title: users.mary.name, body: dateFiveDaysAgo, avatar: users.mary.avatar, action: { type: "chip", label: "208 sales", color: "#4caf50" } },
        { title: users.timothy.name, body: dateSevenDaysAgo, avatar: users.timothy.avatar, action: { type: "chip", label: "167 sales", color: "#4caf50" } },
        { title: users.denis.name, body: dateEightDaysAgo, avatar: users.denis.avatar, action: { type: "chip", label: "123 sales", color: "#4caf50" } },
        { title: users.mia.name, body: dateNineDaysAgo, avatar: users.mia.avatar, action: { type: "chip", label: "105 sales", color: "#4caf50" } },
        { title: users.jack.name, body: dateNineDaysAgo, avatar: users.jack.avatar, action: { type: "chip", label: "104 sales", color: "#4caf50" } },
      ]}
    />
  );
}
