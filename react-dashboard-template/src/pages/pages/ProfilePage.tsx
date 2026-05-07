import { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Add,
  Business,
  Call,
  CameraAlt,
  Close,
  Comment,
  Favorite,
  FavoriteBorder,
  Fullscreen,
  FullscreenExit,
  Group,
  Home,
  Info,
  Language,
  LocationOn,
  MoreVert,
  Pages,
  Person,
  Photo,
  Public,
  School,
  Search,
} from "@mui/icons-material";
import ali from "../../assets/pages/profile/lists/ali.jpg";
import men1 from "../../assets/pages/profile/lists/men1.png";
import jack from "../../assets/pages/profile/lists/jack.png";
import julieta from "../../assets/pages/profile/lists/julieta.png";
import denis from "../../assets/pages/profile/lists/2.jpg";
import lily from "../../assets/pages/profile/lists/lily.png";
import g1 from "../../assets/pages/profile/lists/g1.jpg";
import g2 from "../../assets/pages/profile/lists/g2.jpg";
import g3 from "../../assets/pages/profile/lists/g3.jpg";
import g4 from "../../assets/pages/profile/lists/g4.jpg";
import g5 from "../../assets/pages/profile/lists/g5.jpg";
import g6 from "../../assets/pages/profile/lists/g6.jpg";
import m1 from "../../assets/pages/profile/lists/m1.jpg";
import m2 from "../../assets/pages/profile/lists/m2.jpg";
import m3 from "../../assets/pages/profile/lists/m3.jpg";
import m4 from "../../assets/pages/profile/lists/m4.jpg";
import envato from "../../assets/pages/profile/pages/envato.png";
import netflix from "../../assets/pages/profile/pages/netflix.jpg";
import scotch from "../../assets/pages/profile/pages/scotch-io.png";

const neuGlow = "-7px -7px 5px rgba(255,255,255,.86), 7px 7px 7px rgba(174,174,192,.30)";
const neuGlowSmall = "-4px -4px 5px rgba(255,255,255,.88), 5px 5px 7px rgba(174,174,192,.28)";
const neuInset = "inset -5px -5px 6px rgba(255,255,255,.88), inset 6px 6px 8px rgba(174,174,192,.30)";

const users = [
  { id: 1, name: "Alice Blue", firstname: "Alice", lastname: "Blue", email: "aliceblue@example.com", phone: "+1 2245721247", avatar: ali },
  { id: 2, name: "Jack Johnson", firstname: "Jack", lastname: "Johnson", email: "jack@example.com", phone: "+1 2245721248", avatar: men1 },
  { id: 3, name: "Bruce Canta", firstname: "Bruce", lastname: "Canta", email: "bruce@example.com", phone: "+1 2245721249", avatar: jack },
  { id: 4, name: "Camelia Lopez", firstname: "Camelia", lastname: "Lopez", email: "camelia@example.com", phone: "+1 2245721250", avatar: julieta },
  { id: 5, name: "Denis Richard", firstname: "Denis", lastname: "Richard", email: "denis@example.com", phone: "+1 2245721251", avatar: denis },
  { id: 6, name: "Mia Willson", firstname: "Mia", lastname: "Willson", email: "mia@example.com", phone: "+1 2245721252", avatar: lily },
  { id: 7, name: "Florence J. Brown", firstname: "Florence", lastname: "Brown", email: "florence@example.com", phone: "+1 2245721253", avatar: g1 },
  { id: 8, name: "Regina E. Hernandez", firstname: "Regina", lastname: "Hernandez", email: "regina@example.com", phone: "+1 2245721254", avatar: g2 },
  { id: 9, name: "Mary Beveridge", firstname: "Mary", lastname: "Beveridge", email: "mary@example.com", phone: "+1 2245721255", avatar: g3 },
  { id: 10, name: "Gulnaz Vorobyova", firstname: "Gulnaz", lastname: "Vorobyova", email: "gulnaz@example.com", phone: "+1 2245721256", avatar: g4 },
  { id: 11, name: "Aline Correia", firstname: "Aline", lastname: "Correia", email: "aline@example.com", phone: "+1 2245721257", avatar: g5 },
  { id: 12, name: "Jane T. Keys", firstname: "Jane", lastname: "Keys", email: "jane@example.com", phone: "+1 2245721258", avatar: g6 },
  { id: 13, name: "Timothy Macredie", firstname: "Timothy", lastname: "Macredie", email: "timothy@example.com", phone: "+1 2245721259", avatar: m1 },
  { id: 14, name: "Beau Liversidge", firstname: "Beau", lastname: "Liversidge", email: "beau@example.com", phone: "+1 2245721260", avatar: m2 },
  { id: 15, name: "Davi Martins Dias", firstname: "Davi", lastname: "Dias", email: "davi@example.com", phone: "+1 2245721261", avatar: m3 },
  { id: 16, name: "John Mowbray", firstname: "John", lastname: "Mowbray", email: "john@example.com", phone: "+1 2245721262", avatar: m4 },
];

const authUser = users[0];
const tabs = ["timeline", "about", "friends", "photos"] as const;

const posts = [
  {
    id: 1,
    user: users[7],
    favorite: true,
    img: "https://picsum.photos/500/300?image=501",
    likes: 477,
    commentsCount: 84,
    comments: [users[8], users[9]],
  },
  { id: 2, user: users[8], favorite: true, img: "https://picsum.photos/500/300?image=1011", likes: 119, commentsCount: 44, comments: [users[8], users[9]] },
  { id: 3, user: users[9], favorite: true, likes: 89, commentsCount: 56, comments: [users[8]] },
].map((post) => ({
  ...post,
  publishedON: "Apr 27, 2026 00:00",
  content:
    "19 things you don't want to hear about sports fan clubs. What experts are saying about match predictions. Why live tennis scores beat peanut butter on pancakes. If you read one article about sport crickets read this one. 18 problems with betting offers. The complete beginner's guide to sporting indexes. Why mom was right about sport crickets.",
}));

export default function ProfilePage() {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ m: 3 }}>
      <Card sx={{ bgcolor: "background.default", borderRadius: 1, boxShadow: neuInset, overflow: "visible", backgroundImage: "none" }}>
        <ProfileCover />
        <Grid container alignItems="center" sx={{ mt: 5, mx: 0 }}>
          <Grid item xs={12} md={4} sx={{ pl: { xs: 3, md: 6 }, pb: { xs: 1.5, md: 0 } }}>
            <Typography component="h1" sx={{ fontSize: 34, fontWeight: 700, color: "text.primary", lineHeight: 1.25 }}>
              {authUser.name}
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Tabs value={tab} onChange={(_, value) => setTab(value)} textColor="primary" indicatorColor="primary" variant="scrollable" scrollButtons="auto" sx={tabsSx}>
              {tabs.map((item) => <Tab key={item} label={item} />)}
            </Tabs>
          </Grid>
        </Grid>
      </Card>

      <Box sx={{ mt: 3 }}>
        {tab === 0 && <TimelineTab />}
        {tab === 1 && <AboutTab />}
        {tab === 2 && <FriendsTab />}
        {tab === 3 && <PhotosTab />}
      </Box>
    </Box>
  );
}

function ProfileCover() {
  return (
    <Box
      sx={{
        minHeight: 240,
        position: "relative",
        borderRadius: 1,
        overflow: "visible",
        backgroundImage: "linear-gradient(rgba(0,0,0,.08), rgba(0,0,0,.18)), url(https://picsum.photos/id/823/851/315)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Toolbar variant="dense" sx={{ color: "#fff", bgcolor: "transparent" }}>
        <Typography sx={{ display: { xs: "none", md: "block" }, fontSize: 20 }}>{authUser.name}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton aria-label="Change cover photo" sx={{ color: "#fff" }}>
          <CameraAlt />
        </IconButton>
      </Toolbar>
      <Box sx={{ position: "absolute", left: { xs: 24, md: 48 }, bottom: -56 }}>
        <NeuAvatar src={authUser.avatar} alt={authUser.name} />
      </Box>
      <IconButton aria-label="Add profile item" sx={{ position: "absolute", right: 24, bottom: 18, width: 42, height: 42, bgcolor: "background.default", color: "text.primary", boxShadow: neuGlowSmall, "&:hover": { bgcolor: "background.default", boxShadow: neuInset } }}>
        <Add sx={{ fontSize: 20 }} />
      </IconButton>
    </Box>
  );
}

function TimelineTab() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <IntroCard />
        <PhotosSidebar />
        <FriendsSidebar />
        <ActivitiesCard />
      </Grid>
      <Grid item xs={12} md={8}>
        <Composer />
        {posts.map((post) => <PostCard key={post.id} post={post} />)}
      </Grid>
    </Grid>
  );
}

function AboutTab() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <InfoList title="overview" icon={<Info />} items={[
          ["Lead. UI/UX Designer at Hexesis", "Past: ABC Technologies", <Business />],
          ["Master Degree at Oxford University", "June 2012", <School />],
          ["Los Angeles, California", "From New York", <Home />],
          ["Phone", "+1 2245721247", <Call />],
          ["Website", "http://hexesis.com", <Language />],
        ]} />
        <InfoList title="Work" icon={<Business />} items={[
          ["Face Ltd", "Sr. UI/UX Designer, Nov 2018 - Present", <Person />],
          ["Doddle Ltd", "Sr. UI/UX Designer, Sept 2016 - Nov 2018", <Business />],
          ["Polymer Ltd.", "UI/UX Designer, Jun 2014 - Aug 2016", <Business />],
          ["Pet Shop", "Store Assistant", <Home />],
          ["Green Ozon Foundation", "Founder", <Public />],
        ]} />
        <PagesCard />
      </Grid>
      <Grid item xs={12} md={8}>
        <StatsCards />
        <TextSection title="Biography" paragraphs={[
          "Don't bother typing “lorem ipsum” into Google translate. If you already tried, you may have gotten anything from \"NATO\" to \"China\", depending on how you capitalized the letters. The bizarre translation was fodder for conspiracy theories, but Google has since updated its “lorem ipsum” translation to, boringly enough, “lorem ipsum”.",
          "One brave soul did take a stab at translating the almost-not-quite-Latin. According to The Guardian, Jaspreet Singh Boparai undertook the challenge with the goal of making the text “precisely as incoherent in English as it is in Latin - and to make it incoherent in the same way”.",
        ]} />
        <SkillsCard />
        <TestimonialsCard />
      </Grid>
    </Grid>
  );
}

function FriendsTab() {
  const [friends, setFriends] = useState(() => users.slice(1).map((friend, index) => ({ ...friend, closedFriend: index % 2 === 0 })));
  const [search, setSearch] = useState("");
  const visible = friends.filter((friend) => [friend.firstname, friend.lastname, friend.email, friend.phone].join(" ").toLowerCase().includes(search.toLowerCase()));

  return (
    <SoftCard>
      <Toolbar sx={{ bgcolor: "transparent" }}>
        <Typography sx={{ fontSize: 20 }}>All Friends</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <TextField value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search Friend" variant="filled" size="small" InputProps={{ startAdornment: <Search sx={{ color: "text.secondary", mr: 1 }} />, endAdornment: search ? <IconButton size="small" onClick={() => setSearch("")}><Close fontSize="small" /></IconButton> : null }} sx={searchSx} />
      </Toolbar>
      <Grid container spacing={3} sx={{ p: 3, pt: 1 }}>
        {visible.map((friend) => (
          <Grid item xs={12} md={6} key={friend.id}>
            <Card sx={{ bgcolor: "background.default", borderRadius: 1, boxShadow: neuInset, backgroundImage: "none" }}>
              <Stack direction="row" sx={{ p: 2 }}>
                <NeuAvatar src={friend.avatar} alt={friend.name} tile size={100} outer={120} inner={110} />
                <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2 }}>
                  <Typography sx={{ fontSize: 20, color: "text.primary", mb: 0.5 }}>{friend.name}</Typography>
                  <Typography sx={{ fontSize: 14, color: "text.secondary", mb: 1.3 }}>{friend.email}</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton aria-label="Toggle favorite friend" onClick={() => setFriends((list) => list.map((item) => item.id === friend.id ? { ...item, closedFriend: !item.closedFriend } : item))} sx={{ color: "error.main" }}>
                      {friend.closedFriend ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                    <Button onClick={() => setFriends((list) => list.filter((item) => item.id !== friend.id))} title="Click to unfriend" sx={roundedButtonSx}>
                      Unfriend
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </SoftCard>
  );
}

function PhotosTab() {
  const [fullscreen, setFullscreen] = useState(false);
  const [carousel, setCarousel] = useState(0);
  const photos = Array.from({ length: 18 }, (_, index) => index + 1);
  if (fullscreen) {
    return (
      <SoftCard sx={{ p: 3 }}>
        <Box sx={{ position: "relative" }}>
          <Box component="img" src={`https://picsum.photos/1024/720?image=${photos[carousel] * 6 + 10}`} alt="Profile fullscreen" sx={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", display: "block" }} />
          <IconButton onClick={() => setFullscreen(false)} aria-label="Exit fullscreen" sx={{ position: "absolute", top: 12, right: 12, bgcolor: "error.main", color: "#fff", "&:hover": { bgcolor: "error.dark" } }}>
            <FullscreenExit />
          </IconButton>
        </Box>
        <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 2 }}>
          <Button disabled={carousel === 0} onClick={() => setCarousel((value) => Math.max(0, value - 1))} sx={roundedButtonSx}>Prev</Button>
          <Button disabled={carousel === photos.length - 1} onClick={() => setCarousel((value) => Math.min(photos.length - 1, value + 1))} sx={roundedButtonSx}>Next</Button>
        </Stack>
      </SoftCard>
    );
  }
  return (
    <SoftCard sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {photos.map((n, index) => (
          <Grid item xs={12} md={3} key={n}>
            <Box sx={photoTileSx}>
              <Box component="img" src={`https://picsum.photos/500/300?image=${n * 6 + 10}`} alt={`Profile ${n}`} sx={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" }} />
              <Box className="photoReveal">
                <IconButton aria-label="Open fullscreen photo" onClick={() => { setCarousel(index); setFullscreen(true); }} sx={{ width: 54, height: 54, bgcolor: "secondary.main", color: "#fff", "&:hover": { bgcolor: "secondary.dark" } }}>
                  <Fullscreen sx={{ fontSize: 30 }} />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </SoftCard>
  );
}

function Composer() {
  return (
    <SoftCard sx={{ p: 3, mb: 3 }}>
      <TextField multiline minRows={3} fullWidth placeholder="What's new today?" variant="filled" sx={textareaSx} />
      <Stack direction="row" alignItems="center" sx={{ mt: 1.5 }}>
        {[<Photo />, <Person />, <LocationOn />].map((icon, index) => <IconButton key={index} sx={{ color: "text.secondary" }}>{icon}</IconButton>)}
        <Box sx={{ flexGrow: 1 }} />
        <Button sx={primaryButtonSx}>Post</Button>
      </Stack>
    </SoftCard>
  );
}

function PostCard({ post }: { post: (typeof posts)[number] }) {
  return (
    <SoftCard sx={{ p: 3, mt: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Avatar src={post.user.avatar} sx={{ width: 40, height: 40 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography sx={{ fontSize: 16, color: "text.primary" }}>{post.user.name}</Typography>
          <Typography sx={{ fontSize: 13, color: "text.secondary" }}>{post.publishedON}</Typography>
        </Box>
        <Favorite sx={{ color: post.favorite ? "#b71c1c" : "text.secondary" }} />
      </Stack>
      <Typography sx={{ fontSize: 16, color: "text.primary", lineHeight: 1.55, p: 2 }}>{post.content}</Typography>
      {post.img ? <Box component="img" src={post.img} alt="Profile post" sx={{ width: "calc(100% - 24px)", mx: 1.5, display: "block", boxShadow: neuInset }} /> : null}
      <Stack direction="row" sx={{ px: 1, py: 2 }}>
        <Stack direction="row" alignItems="center"><FavoriteBorder /><Typography sx={{ px: 1, fontSize: 12 }}>{post.likes}</Typography></Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center"><Comment /><Typography sx={{ px: 1, fontSize: 12 }}>{post.commentsCount}</Typography></Stack>
      </Stack>
      {post.comments.map((user, index) => (
        <Box key={`${post.id}-${user.id}-${index}`} sx={{ pt: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Avatar src={user.avatar} sx={{ width: 40, height: 40 }} />
            <Box sx={{ flexGrow: 1 }}><Typography>{user.name}</Typography><Typography sx={{ fontSize: 13, color: "text.secondary" }}>Apr 30, 2026 00:00</Typography></Box>
            <IconButton size="small"><FavoriteBorder fontSize="small" /></IconButton>
          </Stack>
          <Box sx={{ ml: 6, mr: 1.5, mt: 1, p: 1.5, borderRadius: 1, bgcolor: "background.default" }}>Why olympic national parks are on crack about olympic national parks. The 20 worst songs about betting offers.</Box>
        </Box>
      ))}
      <SoftCard sx={{ p: 2, mx: 1.5, mt: 2 }}>
        <TextField multiline minRows={2} fullWidth placeholder="What's new today?" variant="filled" sx={textareaSx} />
        <Button sx={{ ...primaryButtonSx, mt: 1.2 }}>Comment</Button>
      </SoftCard>
    </SoftCard>
  );
}

function IntroCard() {
  return (
    <SoftCard sx={{ mb: 3 }}>
      <CardToolbar title="Intro" icon={<Public />} iconColor="#2196f3" menu />
      <Box sx={{ p: 2.5, fontSize: 14, lineHeight: 1.55 }}>I'm web developer working in fullstack application. I choose this firm b'coz I love it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Box>
      {[
        ["Lives In: ", "Los Angeles, California"],
        ["Joined: ", "April 14, 2012"],
        ["Current Job: ", "Technical Lead at Hexesis Studio"],
        ["Email: ", authUser.email],
        ["Website: ", "http://hexesis.com"],
      ].map(([title, subtitle]) => <TwoLine key={title} title={title} subtitle={subtitle} />)}
    </SoftCard>
  );
}

function PhotosSidebar() {
  return (
    <SoftCard sx={{ mb: 3 }}>
      <CardToolbar title="Photos" icon={<Photo />} iconColor="#ffb74d" />
      <Grid container spacing={2} sx={{ p: 2 }}>
        {Array.from({ length: 9 }, (_, index) => index + 1).map((n) => (
          <Grid item xs={4} key={n}><Box component="img" src={`https://picsum.photos/500/300?image=${n * 6 + 10}`} alt="" sx={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block", borderRadius: 1, boxShadow: neuInset }} /></Grid>
        ))}
      </Grid>
    </SoftCard>
  );
}

function FriendsSidebar() {
  return (
    <SoftCard sx={{ mb: 3 }}>
      <CardToolbar title="Friends" icon={<Group />} iconColor="#9c27b0" action="See All" />
      <Grid container spacing={2} sx={{ p: 2 }}>
        {users.slice(1, 7).map((friend) => (
          <Grid item xs={6} key={friend.id}>
            <Card sx={{ bgcolor: "background.default", borderRadius: 1, boxShadow: neuInset, backgroundImage: "none", overflow: "hidden" }}>
              <Box component="img" src={friend.avatar} alt={friend.name} sx={{ width: "100%", display: "block" }} />
              <Typography sx={{ p: 1.6, fontSize: 14 }}>{friend.name}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </SoftCard>
  );
}

function ActivitiesCard() {
  const items = users.slice(1, 6);
  return (
    <SoftCard>
      <CardToolbar title="Last Activities" action="See All" />
      <Typography sx={{ px: 2, pt: 1, color: "text.secondary", fontSize: 14 }}>Today</Typography>
      {items.map((user) => <ActivityRow key={user.id} user={user} />)}
      <Typography sx={{ px: 2, pt: 1, color: "text.secondary", fontSize: 14 }}>Yesterday</Typography>
      {items.slice(0, 3).map((user) => <ActivityRow key={`y-${user.id}`} user={user} />)}
    </SoftCard>
  );
}

function ActivityRow({ user }: { user: (typeof users)[number] }) {
  return <Stack direction="row" spacing={1.5} sx={{ px: 2, py: 1.35, borderTop: "1px solid rgba(111,125,133,.12)" }}><Avatar src={user.avatar} /><Box><Typography sx={{ fontSize: 15 }}>Brunch this weekend?</Typography><Typography sx={{ fontSize: 13, color: "text.secondary" }}><Box component="span" sx={{ color: "#1976d2" }}>{user.name}</Box> - I'll be in your neighborhood doing errands this weekend.</Typography></Box></Stack>;
}

function InfoList({ title, icon, items }: { title: string; icon: React.ReactNode; items: [string, string, React.ReactNode][] }) {
  return <SoftCard sx={{ mb: 3 }}><CardToolbar title={title} icon={icon} iconColor="#607d8b" />{items.map(([itemTitle, subtitle, itemIcon]) => <Stack key={itemTitle} direction="row" spacing={2} sx={{ px: 2, py: 1.4 }}><Box sx={{ color: "primary.main", mt: 0.5 }}>{itemIcon}</Box><Box><Typography sx={{ fontSize: 15.5 }}>{itemTitle}</Typography><Typography sx={{ fontSize: 13.5, color: "text.secondary" }}>{subtitle}</Typography></Box></Stack>)}</SoftCard>;
}

function PagesCard() {
  const pageItems = [[envato, "Envato", "Join millions and bring your ideas and projects to life with Envato"], [netflix, "Netflix", "Watch Netflix movies & TV shows online"], [scotch, "Scotch.IO", "fun and practical web development tutorials"]];
  return <SoftCard><CardToolbar title="Pages" icon={<Pages />} iconColor="#546e7a" />{pageItems.map(([img, title, subtitle]) => <Stack key={title} direction="row" spacing={2} sx={{ p: 2 }}><Avatar src={img} variant="rounded" sx={{ width: 70, height: 70 }} /><Box><Typography>{title}</Typography><Typography sx={{ fontSize: 13.5, color: "text.secondary" }}>{subtitle}</Typography></Box></Stack>)}</SoftCard>;
}

function StatsCards() {
  const stats = [
    { icon: <Photo />, title: "365", subtitle: "Photos", color: "primary.main" },
    { icon: <Person />, title: "845", subtitle: "Followers", color: "#2196f3" },
    { icon: <Favorite />, title: "612", subtitle: "Following", color: "#e91e63" },
  ];
  return <SoftCard sx={{ mb: 3, p: 2 }}><Grid container spacing={2}>{stats.map(({ icon, title, subtitle, color }) => <Grid item xs={12} md={4} key={subtitle}><Stack direction="row" alignItems="center" spacing={2}><Avatar sx={{ width: 50, height: 50, bgcolor: "background.default", color, boxShadow: neuInset }}>{icon}</Avatar><Box><Typography sx={{ fontSize: 24 }}>{title}</Typography><Typography sx={{ color: "text.secondary" }}>{subtitle}</Typography></Box></Stack></Grid>)}</Grid></SoftCard>;
}

function TextSection({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return <SoftCard sx={{ mb: 3, p: 3 }}><Typography sx={{ fontSize: 34, color: "text.primary", mb: 2 }}>{title}</Typography>{paragraphs.map((text) => <Typography key={text} sx={{ lineHeight: 1.65, mb: 1.4 }}>{text}</Typography>)}</SoftCard>;
}

function SkillsCard() {
  const skills = [["HTML/CSS", 97], ["Web Design", 88], ["Vue.JS ", 95], ["React.JS ", 93], ["Laravel ", 98], ["Photoshop ", 67], ["Sketch ", 89], ["Adobe XD ", 76]];
  return <SoftCard sx={{ mb: 3, p: 3 }}><Typography sx={{ fontSize: 34, mb: 2 }}>Skills</Typography><Grid container spacing={1}>{skills.map(([name, value]) => <Grid item xs={12} md={6} key={String(name)}><Box sx={{ px: 2, py: 1 }}><Typography>{name}</Typography><LinearProgress variant="determinate" value={Number(value)} sx={{ mt: 1, height: 4, borderRadius: 1, bgcolor: "rgba(0,131,143,.12)", "& .MuiLinearProgress-bar": { bgcolor: "primary.main" } }} /></Box></Grid>)}</Grid></SoftCard>;
}

function TestimonialsCard() {
  return <SoftCard sx={{ p: 3 }}><Typography sx={{ fontSize: 34, mb: 2 }}>Testimonials</Typography>{[users[11], users[8], users[12]].map((user, index) => <Stack key={user.id} direction={index === 1 ? "row-reverse" : "row"} spacing={2} sx={{ py: 2 }}><Avatar src={user.avatar} sx={{ width: 96, height: 96 }} /><Box><Typography>{user.name}</Typography><Typography sx={{ color: "text.secondary", lineHeight: 1.55 }}>Tempor irure reprehenderit voluptate et exercitation deserunt id veniam occaecat non aute consectetur consectetur aliquip. Consectetur fugiat Lorem adipisicing adipisicing excepteur.</Typography></Box></Stack>)}</SoftCard>;
}

function CardToolbar({ title, icon, iconColor, action, menu }: { title: string; icon?: React.ReactNode; iconColor?: string; action?: string; menu?: boolean }) {
  return <Toolbar variant="dense" sx={{ bgcolor: "transparent", minHeight: "48px !important" }}>{icon ? <IconButton sx={{ color: iconColor || "primary.main" }}>{icon}</IconButton> : null}<Typography sx={{ fontSize: 20 }}>{title}</Typography><Box sx={{ flexGrow: 1 }} />{action ? <Button sx={{ color: "text.primary" }}>{action}</Button> : null}{menu ? <IconButton><MoreVert /></IconButton> : null}</Toolbar>;
}

function TwoLine({ title, subtitle }: { title: string; subtitle: string }) {
  return <Box sx={{ px: 2, py: 1.25 }}><Typography sx={{ fontSize: 15.5 }}>{title}</Typography><Typography sx={{ fontSize: 14, color: "text.secondary" }}>{subtitle}</Typography></Box>;
}

function SoftCard({ children, sx = {} }: { children: React.ReactNode; sx?: object }) {
  return <Card sx={{ bgcolor: "background.default", borderRadius: 1, boxShadow: neuInset, backgroundImage: "none", overflow: "hidden", ...sx }}>{children}</Card>;
}

function NeuAvatar({ src, alt, tile = false, size = 105, outer = 146, inner = 122 }: { src: string; alt: string; tile?: boolean; size?: number; outer?: number; inner?: number }) {
  const radius = tile ? 1 : "50%";
  return <Box sx={{ width: outer, height: outer, borderRadius: radius, display: "grid", placeItems: "center", boxShadow: neuInset, bgcolor: "background.default" }}><Box sx={{ width: inner, height: inner, borderRadius: radius, display: "grid", placeItems: "center", boxShadow: neuGlowSmall, bgcolor: "background.default" }}><Box component="img" src={src} alt={alt} sx={{ width: size, height: size, borderRadius: radius, objectFit: "cover", display: "block" }} /></Box></Box>;
}

const tabsSx = {
  justifyContent: { md: "flex-end" },
  "& .MuiTabs-flexContainer": { justifyContent: { md: "flex-end" } },
  "& .MuiTab-root": { minHeight: 48, fontSize: 14, textTransform: "uppercase", color: "text.secondary", px: 2.2 },
};

const primaryButtonSx = { minHeight: 36, px: 2.5, borderRadius: 1, bgcolor: "primary.main", color: "#fff", textTransform: "uppercase", fontSize: 14, "&:hover": { bgcolor: "primary.dark" } };
const roundedButtonSx = { px: 2.1, minHeight: 34, borderRadius: 999, bgcolor: "background.default", color: "text.primary", boxShadow: neuGlowSmall, "&:hover": { bgcolor: "background.default", boxShadow: neuInset } };
const textareaSx = { "& .MuiFilledInput-root": { bgcolor: "#fff", borderRadius: 1, "&:before,&:after": { display: "none" }, "&:hover": { bgcolor: "#fff" }, "&.Mui-focused": { bgcolor: "#fff" } } };
const searchSx = { width: { xs: 210, sm: 300 }, "& .MuiFilledInput-root": { height: 40, bgcolor: "#fff", borderRadius: 1, "&:before,&:after": { display: "none" }, "&:hover": { bgcolor: "#fff" }, "&.Mui-focused": { bgcolor: "#fff" } }, "& .MuiFilledInput-input": { py: 0, fontSize: 14 } };
const photoTileSx = { position: "relative", overflow: "hidden", bgcolor: "background.default", "& .photoReveal": { position: "absolute", inset: 0, opacity: 0, display: "grid", placeItems: "center", bgcolor: "rgba(0,96,100,.5)", transition: "opacity 160ms ease" }, "&:hover .photoReveal": { opacity: 1 } };
