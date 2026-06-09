import { useEffect, useMemo, useRef, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Card,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  Menu,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Chat,
  ChevronLeft,
  Close,
  Menu as MenuIcon,
  MoreVert,
  Notifications,
  Search,
  Send,
} from "@mui/icons-material";
import AppInnerLayout from "./AppInnerLayout";
import ali from "../../assets/app/contacts/ali.jpg";
import men1 from "../../assets/app/contacts/men1.png";
import jack from "../../assets/app/contacts/jack.png";
import julieta from "../../assets/app/contacts/julieta.png";
import avatar2 from "../../assets/app/contacts/2.jpg";
import lily from "../../assets/app/contacts/lily.png";
import g1 from "../../assets/app/contacts/g1.jpg";
import g2 from "../../assets/app/contacts/g2.jpg";
import g3 from "../../assets/app/contacts/g3.jpg";
import g4 from "../../assets/app/contacts/g4.jpg";
import g5 from "../../assets/app/contacts/g5.jpg";
import g6 from "../../assets/app/contacts/g6.jpg";
import m1 from "../../assets/app/contacts/m1.jpg";
import m2 from "../../assets/app/contacts/m2.jpg";
import m3 from "../../assets/app/contacts/m3.jpg";
import m4 from "../../assets/app/contacts/m4.jpg";

const neuGlow = "-7px -7px 5px rgba(255,255,255,.86), 7px 7px 7px rgba(174,174,192,.30)";
const neuSmall = "-4px -4px 5px rgba(255,255,255,.88), 5px 5px 7px rgba(174,174,192,.28)";
const neuInset = "inset -5px -5px 6px rgba(255,255,255,.86), inset 5px 5px 8px rgba(174,174,192,.30)";

type StatusColor = "success" | "warning" | "grey" | "secondary";

interface ChatUser {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  mood: string;
  status: {
    color: StatusColor;
    icon: string;
  };
  designation?: string;
  last_message?: string;
}

interface ChatGroup {
  id: number;
  user: ChatUser;
  unread: number;
}

interface ConversationItem {
  id: number;
  group_id: number;
  user_id: number;
  user: ChatUser;
  message: string;
  created_at: number;
  read: boolean;
}

interface EnrichedGroup extends ChatGroup {
  msgOn: number;
  lastMsg: ConversationItem | null;
}

export default function ChatPage() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawer, setDrawer] = useState(true);
  const [search, setSearch] = useState("");
  const [activeGroupId, setActiveGroupId] = useState(1);
  const [conversation, setConversation] = useState<ConversationItem[]>(initialConversation);
  const [message, setMessage] = useState("");
  const conversationRef = useRef<HTMLDivElement | null>(null);
  const activeGroup = groups.find((group) => group.id === activeGroupId) ?? groups[0];

  useEffect(() => {
    const createdAt = Date.now();
    const timeout = window.setTimeout(() => {
      setConversation((current) => [
        ...current,
        {
          id: current.length + 1,
          group_id: 7,
          user_id: 9,
          user: users[8],
          message: "Hey, please check new design. It's really amazing. Hope you love it",
          created_at: createdAt,
          read: false,
        },
      ]);
    }, 5000);
    return () => window.clearTimeout(timeout);
  }, []);

  const conversationGroup = useMemo(() => groupConversation(conversation), [conversation]);
  const filteredGroups = useMemo(() => {
    const query = search.toLowerCase();
    return groups
      .map((group) => {
        const thread = conversationGroup[group.id] ?? [];
        const lastMsg = thread.length ? thread[thread.length - 1] : null;
        return { ...group, msgOn: lastMsg ? lastMsg.created_at : 0, lastMsg };
      })
      .filter((group) => group.user.name.toLowerCase().includes(query))
      .sort((a, b) => b.msgOn - a.msgOn);
  }, [conversationGroup, search]);

  const activeChat = conversationGroup[activeGroupId] ?? [];

  const sendMessage = () => {
    if (!message.trim()) return;
    const createdAt = Date.now();
    setConversation((current) => [
      ...current,
      {
        id: current.length + 1,
        group_id: activeGroup.id,
        user_id: authUser.id,
        user: authUser,
        message,
        created_at: createdAt,
        read: true,
      },
    ]);
    setMessage("");
    window.requestAnimationFrame(() => {
      const container = conversationRef.current;
      if (container) container.scrollTop = container.scrollHeight;
    });
  };

  return (
    <Box className="vuse-content-wrapper chat-app">
      <SectionDefinition />
      <AppInnerLayout
        sidebar={
          <UserListNav
            drawer={drawer}
            mdUp={mdUp}
            search={search}
            groups={filteredGroups}
            activeId={activeGroupId}
            onSearch={setSearch}
            onToggle={() => setDrawer((value) => !value)}
            onSelect={(group) => setActiveGroupId(group.id)}
          />
        }
        header={
          <ChatToolbar
            drawer={drawer}
            smDown={smDown}
            group={activeGroup}
            onToggleDrawer={() => setDrawer((value) => !value)}
          />
        }
        footer={
          <MessageComposer
            value={message}
            onChange={setMessage}
            onSend={sendMessage}
          />
        }
      >
        <Box ref={conversationRef} sx={{ height: "100%", overflow: "auto" }}>
          <Stack sx={{ p: { xs: 1.5, md: 2.25 }, gap: 1.25 }}>
            {activeChat.map((thread) => (
              <MessageBubble key={thread.id} thread={thread} />
            ))}
          </Stack>
        </Box>
      </AppInnerLayout>
    </Box>
  );
}

function SectionDefinition() {
  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ mx: { xs: 0, md: 1.5 }, mb: 3, py: 1.75 }}>
      <Box sx={{ width: 48, height: 48, borderRadius: 1, display: "grid", placeItems: "center", color: "primary.main", bgcolor: "background.default", boxShadow: neuGlow }}>
        <Chat />
      </Box>
      <Typography sx={{ color: "primary.main", fontSize: { xs: 24, md: 28 }, fontWeight: 500, lineHeight: 1.2 }}>Chat</Typography>
    </Stack>
  );
}

function UserListNav({
  drawer,
  mdUp,
  search,
  groups,
  activeId,
  onSearch,
  onToggle,
  onSelect,
}: {
  drawer: boolean;
  mdUp: boolean;
  search: string;
  groups: EnrichedGroup[];
  activeId: number;
  onSearch: (value: string) => void;
  onToggle: () => void;
  onSelect: (group: EnrichedGroup) => void;
}) {
  if (!drawer) return null;
  return (
    <Box
      sx={{
        width: { xs: 280, md: 280 },
        flex: "0 0 auto",
        position: { xs: "absolute", md: "relative" },
        insetBlock: 0,
        insetInlineStart: 0,
        zIndex: { xs: 5, md: 1 },
        bgcolor: { xs: "background.default", md: "transparent" },
        boxShadow: { xs: neuGlow, md: "none" },
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Stack direction="row" alignItems="center" sx={{ minHeight: 64, px: 1.4, gap: 1 }}>
        <Box sx={{ width: 26, display: "grid", placeItems: "center", color: "text.secondary", flexShrink: 0 }}>
          <Search sx={{ fontSize: 21 }} />
        </Box>
        <TextField
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search User"
          size="small"
          sx={chatSearchSx}
        />
        <Box sx={{ flexGrow: 1 }} />
        {!mdUp && (
          <IconButton onClick={onToggle} sx={{ color: "text.secondary" }}>
            <ChevronLeft />
          </IconButton>
        )}
      </Stack>
      <Divider sx={{ borderColor: "rgba(111,125,133,.18)" }} />
      <List sx={{ flex: 1, minHeight: 0, py: 1, px: 1.05, overflowY: "auto", overflowX: "hidden" }}>
        {groups.map((group) => {
          const active = group.id === activeId;
          return (
            <ListItemButton
              key={group.id}
              onClick={() => onSelect(group)}
              sx={{
                minHeight: 64,
                borderRadius: 999,
                mb: 0.35,
                px: 1.15,
                py: 0.75,
                border: "1px solid",
                borderColor: active ? "rgba(0,150,166,.62)" : "transparent",
                color: active ? "primary.main" : "text.primary",
                bgcolor: active ? "rgba(255,255,255,.56)" : "transparent",
                boxShadow: active ? "inset -4px -4px 5px rgba(255,255,255,.84), inset 5px 5px 8px rgba(0,131,143,.18)" : "none",
                "&:hover": {
                  bgcolor: active ? "rgba(255,255,255,.62)" : "rgba(0,131,143,.055)",
                  borderColor: active ? "rgba(0,150,166,.68)" : "transparent",
                },
              }}
            >
              <StatusAvatar user={group.user} />
              <Box sx={{ minWidth: 0, flex: 1, ml: 1.45 }}>
                <Typography noWrap sx={{ fontSize: 15.25, lineHeight: 1.35, fontWeight: active ? 500 : 400 }}>{group.user.name}</Typography>
                <Typography noWrap sx={{ fontSize: 12.75, lineHeight: 1.45, color: "text.secondary" }}>{group.user.last_message}</Typography>
              </Box>
              {group.lastMsg && !group.lastMsg.read ? (
                <IconButton size="small" sx={{ color: "secondary.main", p: 0.25, ml: 0.35, alignSelf: "center" }}>
                  <Notifications sx={{ fontSize: 15 }} />
                </IconButton>
              ) : null}
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}

function ChatToolbar({ drawer, smDown, group, onToggleDrawer }: { drawer: boolean; smDown: boolean; group: ChatGroup; onToggleDrawer: () => void }) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <Stack direction="row" alignItems="center" sx={{ minHeight: 64, px: { xs: 1, md: 2 } }}>
      {smDown && !drawer ? (
        <IconButton onClick={onToggleDrawer} sx={{ color: "text.secondary", mr: 1 }}>
          <MenuIcon />
        </IconButton>
      ) : null}
      <Avatar src={group.user.avatar} sx={{ width: 35, height: 35, mr: smDown ? 1.5 : 1.5, bgcolor: "grey.100" }} />
      <Typography sx={{ fontSize: 20, fontWeight: 400 }}>{group.user.name}</Typography>
      <Box sx={{ flexGrow: 1 }} />
      <IconButton onClick={(event) => setAnchor(event.currentTarget)} sx={{ color: "text.secondary" }}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        PaperProps={{ sx: { width: 280, maxWidth: 280, bgcolor: "background.default", borderRadius: 1, boxShadow: neuGlow, overflow: "hidden" } }}
      >
        <Card elevation={0} sx={{ bgcolor: "background.default", boxShadow: "none", borderRadius: 0 }}>
          <Box sx={{ height: 280, position: "relative", backgroundImage: "url(https://picsum.photos/630/280?image=618)", backgroundSize: "cover", backgroundPosition: "center" }}>
            <Avatar src={group.user.avatar} variant="square" sx={{ position: "absolute", left: 0, top: 0, width: 164, height: 164, bgcolor: "grey.500" }} />
            <IconButton onClick={() => setAnchor(null)} sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}>
              <Close />
            </IconButton>
            <Box sx={{ position: "absolute", left: 16, right: 16, bottom: 12, color: "#fff" }}>
              <Typography sx={{ fontSize: 20, fontWeight: 500 }}>{group.user.firstname} {group.user.lastname}</Typography>
              <Typography sx={{ fontSize: 14, opacity: 0.88 }}>{group.user.designation}</Typography>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ px: 2, py: 1.75 }}>
            <Typography component="h4" sx={{ fontSize: 16, fontWeight: 700, mb: 1 }}>About</Typography>
            <Typography sx={{ fontSize: 14, color: "text.secondary", lineHeight: 1.6 }}>{group.user.mood}</Typography>
          </Box>
        </Card>
      </Menu>
    </Stack>
  );
}

function MessageBubble({ thread }: { thread: ConversationItem }) {
  const isAuth = thread.user.id === authUser.id;
  return (
    <Stack direction={isAuth ? "row-reverse" : "row"} alignItems="flex-start" sx={{ width: "100%" }}>
      <Avatar src={thread.user.avatar} sx={{ width: 40, height: 40, bgcolor: "grey.100", flexShrink: 0 }} />
      <Box
        sx={{
          mx: 1.5,
          px: 1.5,
          py: 1.5,
          borderRadius: 1,
          maxWidth: { xs: "76%", md: "68%" },
          bgcolor: isAuth ? "background.default" : "rgba(255,255,255,.44)",
          boxShadow: isAuth ? neuInset : "none",
          color: "text.primary",
          fontSize: 14.5,
          lineHeight: 1.55,
          "& b": { fontWeight: 700 },
        }}
        dangerouslySetInnerHTML={{ __html: thread.message }}
      />
    </Stack>
  );
}

function MessageComposer({ value, onChange, onSend }: { value: string; onChange: (value: string) => void; onSend: () => void }) {
  return (
    <Box sx={{ px: { xs: 1, md: 1.5 }, py: 1.25 }}>
      <TextField
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onSend();
          }
        }}
        placeholder="Write your message ..."
        multiline
        minRows={1}
        maxRows={4}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onSend} sx={{ color: "primary.main" }}>
                <Send />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            minHeight: 52,
            alignItems: "center",
            bgcolor: "background.default",
            borderRadius: 1,
            boxShadow: neuSmall,
            pr: 0.75,
            "& fieldset": { borderColor: "rgba(111,125,133,.24)" },
            "&:hover fieldset": { borderColor: "rgba(0,131,143,.28)" },
            "&.Mui-focused fieldset": { borderColor: "primary.main", borderWidth: 1 },
          },
          "& textarea": { fontSize: 15 },
        }}
      />
    </Box>
  );
}

function StatusAvatar({ user }: { user: ChatUser }) {
  return (
    <Badge
      overlap="circular"
      variant="dot"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      sx={{
        "& .MuiBadge-badge": {
          width: 10,
          height: 10,
          minWidth: 10,
          borderRadius: "50%",
          bgcolor: statusColor(user.status.color),
          border: "2px solid",
          borderColor: "background.default",
          right: 3,
          bottom: 3,
        },
      }}
    >
      <Avatar src={user.avatar} sx={{ width: 40, height: 40 }} />
    </Badge>
  );
}

function groupConversation(items: ConversationItem[]) {
  return items.reduce<Record<number, ConversationItem[]>>((acc, item) => {
    if (!acc[item.group_id]) acc[item.group_id] = [];
    acc[item.group_id].push(item);
    return acc;
  }, {});
}

function statusColor(color: StatusColor) {
  if (color === "success") return "#4caf50";
  if (color === "warning") return "#ff9800";
  if (color === "secondary") return "#f06292";
  return "#9e9e9e";
}

const chatSearchSx = {
  flex: "1 1 auto",
  minWidth: 0,
  "& .MuiOutlinedInput-root": {
    height: 40,
    bgcolor: "#fff",
    borderRadius: 1,
    boxShadow: "none",
    "& fieldset": { border: 0 },
    "& input": { fontSize: 14.5, py: 0, px: 1.4, "&::placeholder": { opacity: 0.68 } },
  },
};

const users: ChatUser[] = [
  { id: 1, name: "Alice Blue", firstname: "Alice", lastname: "Blue", email: "aliceblue@example.com", avatar: ali, mood: "Vuse - Powerful VuejS admin template.", status: { color: "success", icon: "check_circle" } },
  { id: 2, name: "Jack Johnson", firstname: "Jack", lastname: "Johnson", email: "jack@example.com", avatar: men1, mood: "Vuse - Powerful VuejS admin template.", status: { color: "success", icon: "check_circle" }, designation: "Network Engineer" },
  { id: 3, name: "Bruce Canta", firstname: "Bruce", lastname: "Canta", email: "bruce@example.com", avatar: jack, mood: "Vuse - Powerful VuejS admin template.", status: { color: "warning", icon: "access_time" }, designation: "Network Engineer" },
  { id: 4, name: "Camelia Lopez", firstname: "Camelia", lastname: "Lopez", email: "camelia@example.com", avatar: julieta, mood: "Vuse - Powerful VuejS admin template.", status: { color: "grey", icon: "not_interested" }, designation: "Network Engineer" },
  { id: 5, name: "Denis Richard", firstname: "Denis", lastname: "Richard", email: "denis@example.com", avatar: avatar2, mood: "Vuse - Powerful VuejS admin template.", status: { color: "secondary", icon: "stars" }, designation: "Network Engineer" },
  { id: 6, name: "Mia Willson", firstname: "Mia", lastname: "Willson", email: "mia@example.com", avatar: lily, mood: "Vuse - Powerful VuejS admin template.", status: { color: "success", icon: "check_circle" }, designation: "Network Engineer" },
  { id: 7, name: "Florence J. Brown", firstname: "Florence", lastname: "Brown", email: "florence@example.com", avatar: g1, mood: "Good content isn't about good storytelling", status: { color: "success", icon: "check_circle" }, designation: "Sales Manager" },
  { id: 8, name: "Regina E. Hernandez", firstname: "Regina", lastname: "Hernandez", email: "regina@example.com", avatar: g2, mood: "Design is intelligence made visible", status: { color: "success", icon: "check_circle" }, designation: "Designer Lead" },
  { id: 9, name: "Mary Beveridge", firstname: "Mary", lastname: "Beveridge", email: "mary@example.com", avatar: g3, mood: "In most cases, being a good boss means hiring talented people and then getting out of their way", status: { color: "success", icon: "check_circle" }, designation: "HR Manager" },
  { id: 10, name: "Gulnaz Vorobyova", firstname: "Gulnaz", lastname: "Vorobyova", email: "gulnaz@example.com", avatar: g4, mood: "#wakeup#eat#code#chill", status: { color: "success", icon: "check_circle" }, designation: "Frontend Engineer" },
  { id: 11, name: "Aline Correia", firstname: "Aline", lastname: "Correia", email: "aline@example.com", avatar: g5, mood: "#wakeup#eat#code#chill", status: { color: "success", icon: "check_circle" }, designation: "Project Mananager" },
  { id: 12, name: "Jane T. Keys", firstname: "Jane", lastname: "Keys", email: "jane@example.com", avatar: g6, mood: "#wakeup#eat#code#chill", status: { color: "success", icon: "check_circle" }, designation: "Software Engineer" },
  { id: 13, name: "Timothy Macredie", firstname: "Timothy", lastname: "Macredie", email: "timothy@example.com", avatar: m1, mood: "#wakeup#eat#code#chill", status: { color: "success", icon: "check_circle" }, designation: "Photographer" },
  { id: 14, name: "Beau Liversidge", firstname: "Beau", lastname: "Liversidge", email: "beau@example.com", avatar: m2, mood: "#wakeup#eat#code#chill", status: { color: "success", icon: "check_circle" }, designation: "Designer" },
  { id: 15, name: "Davi Martins Dias", firstname: "Davi", lastname: "Dias", email: "davi@example.com", avatar: m3, mood: "#wakeup#eat#code#chill", status: { color: "success", icon: "check_circle" }, designation: "Marketing Lead" },
  { id: 16, name: "John Mowbray", firstname: "John", lastname: "Mowbray", email: "john@example.com", avatar: m4, mood: "#wakeup#eat#code#chill", status: { color: "success", icon: "check_circle" }, designation: "Technical Lead" },
];

const authUser = users[0];

const initialConversation: ConversationItem[] = [
  { id: 1, group_id: 1, user_id: 2, user: users[1], message: "We are planning to move with GrapQL API with Board section. What do you think on it", created_at: 1528104070, read: true },
  { id: 2, group_id: 1, user_id: 2, user: users[1], message: "I mean for scrum board. A part from this, I have design some layouts in Sketch for it. Did you get chance to see those?", created_at: 1528104071, read: true },
  { id: 3, group_id: 1, user_id: 1, user: authUser, message: "Yeah, that's really sounds good. I loved it. Can you please connet with Mia for further implementation?", created_at: 1528104072, read: true },
  { id: 4, group_id: 1, user_id: 2, user: users[1], message: "I am scheduling a meeting with Team today at 5:00PM. Hope you are available.", created_at: 1528104073, read: true },
  { id: 5, group_id: 1, user_id: 2, user: users[1], message: "I also need your assistance for GraphQL API structuring. Are you gonna make APIs in Laravel for it?", created_at: 1528104074, read: true },
  { id: 6, group_id: 2, user_id: 3, user: users[2], message: "I have started reviewing <b>MaterialCSS</b> framework. It seems that they have improved the Framework.", created_at: 1528104074, read: true },
  { id: 7, group_id: 2, user_id: 3, user: users[2], message: "How do you plan for Forge Admin new version, we need to talk about his.", created_at: 1528104075, read: true },
  { id: 8, group_id: 2, user_id: 3, user: authUser, message: "Sure, we can arrage a meeting tomorrow in the morning. I have planned a few things. I will share you details tomorrow. Will it be fine?", created_at: 1528104076, read: true },
  { id: 9, group_id: 3, user_id: 3, user: users[3], message: "We are planning some activities in this weekends. So you can provide your inputs.", created_at: 1528104075, read: true },
  { id: 10, group_id: 3, user_id: 3, user: users[3], message: "let's play Table-Tennis in the evening, after that we can discuss about the weekends suggestions. What do you say?", created_at: 1528104076, read: true },
  { id: 11, group_id: 4, user_id: 4, user: users[4], message: "we have received a mail from Envato regarding new Taxation policy. Once you get chance to have look into that.", created_at: 1528104076, read: true },
  { id: 12, group_id: 5, user_id: 5, user: users[5], message: "Forge Admin needs some improvements in designs. We have very nice features, but old design is factor of less sales.", created_at: 1528104076, read: true },
  { id: 13, group_id: 5, user_id: 5, user: users[5], message: "We need to think about this.", created_at: 1528104077, read: true },
  { id: 14, group_id: 5, user_id: 5, user: users[5], message: "As I know - Bruce is reviewing the details for MaterialCSS. Let me know once you planned a meeting.", created_at: 1528104078, read: true },
  { id: 15, group_id: 1, user_id: 2, user: users[1], message: "We are planning to move with GrapQL API with Board section. What do you think on it", created_at: 1528104070, read: true },
  { id: 16, group_id: 1, user_id: 2, user: users[1], message: "We are planning to move with GrapQL API with Board section. What do you think on it", created_at: 1528104070, read: true },
  { id: 17, group_id: 1, user_id: 2, user: users[1], message: "We are planning to move with GrapQL API with Board section. What do you think on it", created_at: 1528104070, read: true },
];

const groups: ChatGroup[] = [
  { id: 1, user: { ...users[1], last_message: "Jan 20 , 2018" }, unread: 2 },
  { id: 2, user: { ...users[2], last_message: "Jan 20 , 2018" }, unread: 0 },
  { id: 3, user: { ...users[3], last_message: "Jan 20 , 2018" }, unread: 2 },
  { id: 4, user: { ...users[4], last_message: "Jan 20 , 2018" }, unread: 0 },
  { id: 5, user: { ...users[5], last_message: "Jan 20 , 2018" }, unread: 3 },
  { id: 6, user: { ...users[7], last_message: "Jan 20 , 2018" }, unread: 3 },
  { id: 7, user: { ...users[8], last_message: "Jan 20 , 2018" }, unread: 3 },
  { id: 8, user: { ...users[9], last_message: "Jan 20 , 2018" }, unread: 3 },
  { id: 9, user: { ...users[10], last_message: "Jan 20 , 2018" }, unread: 3 },
  { id: 10, user: { ...users[11], last_message: "Jan 20 , 2018" }, unread: 3 },
  { id: 11, user: { ...users[12], last_message: "Jan 20 , 2018" }, unread: 3 },
  { id: 12, user: { ...users[13], last_message: "Jan 20 , 2018" }, unread: 3 },
  { id: 13, user: { ...users[14], last_message: "Jan 20 , 2018" }, unread: 3 },
  { id: 14, user: { ...users[15], last_message: "Jan 20 , 2018" }, unread: 3 },
];
