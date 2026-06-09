import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import type { ButtonProps, IconButtonProps, SxProps, Theme } from "@mui/material";
import {
  Bookmark,
  Comment,
  Facebook,
  Favorite,
  Instagram,
  Mail,
  Message,
  MoreVert,
  PlayArrow,
  ShoppingCart,
  Twitter,
  WidgetsOutlined,
} from "@mui/icons-material";
import VuseSectionDefinition from "../../../components/layout/VuseSectionDefinition";
import type { ReactNode } from "react";
import avengersEndgame from "../../../assets/ui-components/widgets/cards/Avengers-EndGame.jpg";
import dragonCourse from "../../../assets/ui-components/widgets/cards/dragon.jpg";
import designCommunity from "../../../assets/ui-components/widgets/cards/design_community.png";
import fancyHeadphone from "../../../assets/ui-components/widgets/cards/headphone-fancy-yellow.webp";
import revoltShoe from "../../../assets/ui-components/widgets/cards/shoe-revolt-unsplash.webp";
import reginaAvatar from "../../../assets/ui-components/widgets/cards/g2.jpg";
import maryAvatar from "../../../assets/ui-components/widgets/cards/g3.jpg";
import timothyAvatar from "../../../assets/ui-components/widgets/cards/m1.jpg";
import gulnazAvatar from "../../../assets/ui-components/widgets/cards/g4.jpg";

const neuGlow = "-7px -7px 5px rgba(255,255,255,.86), 7px 7px 7px rgba(174,174,192,.30)";
const neuGlowSmall = "-4px -4px 5px rgba(255,255,255,.88), 5px 5px 7px rgba(174,174,192,.28)";
const neuInset = "inset -5px -5px 6px rgba(255,255,255,.88), inset 6px 6px 8px rgba(174,174,192,.30)";

const users = {
  regina: { name: "Regina E. Hernandez", email: "regina@example.com", avatar: reginaAvatar },
  mary: { name: "Mary Beveridge", email: "mary@example.com", avatar: maryAvatar },
  timothy: { name: "Timothy Macredie", email: "timothy@example.com", avatar: timothyAvatar },
  gulnaz: { name: "Gulnaz Vorobyova", email: "gulnaz@example.com", avatar: gulnazAvatar },
};

export default function CardsPage() {
  return (
    <>
      <VuseSectionDefinition
        title="Card Widgets"
        namespace="Widgets"
        icon={<WidgetsOutlined />}
        breadcrumbs={[
          { label: "Widgets", href: "/widgets/card" },
          { label: "Card" },
        ]}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <MovieTicket />
            <CourseWidget />
            <BlogPostCard />
            <UserFollowCard />
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <AddToCart />
            <ShoeCard />
            <ArticlePostCard />
            <UserProfileCard />
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <ProductCard />
            <TinyPost />
            <UserProfileCardAlternative />
            <UserProfileCardAnother />
            <UserUtilization />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

function VuseCard({ children, sx = {} }: { children: ReactNode; sx?: SxProps<Theme> }) {
  return (
    <Card
      sx={{
        bgcolor: "background.default",
        borderRadius: 1,
        overflow: "hidden",
        boxShadow: neuGlow,
        backgroundImage: "none",
        ...sx,
      }}
    >
      {children}
    </Card>
  );
}

function SoftButton({ children, buttonColor = "#00838f", sx = {}, ...props }: { children: ReactNode; buttonColor?: string; sx?: SxProps<Theme> } & Omit<ButtonProps, "color">) {
  return (
    <Button
      variant="contained"
      {...props}
      sx={{
        borderRadius: 999,
        minHeight: 34,
        px: 2.25,
        bgcolor: buttonColor,
        color: "#fff",
        boxShadow: neuGlowSmall,
        textTransform: "none",
        fontWeight: 500,
        "&:hover": { bgcolor: buttonColor, boxShadow: neuInset },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
}

function SoftIconButton({ children, sx = {}, ...props }: { children: ReactNode; sx?: SxProps<Theme> } & IconButtonProps) {
  return (
    <IconButton
      {...props}
      sx={{
        width: 36,
        height: 36,
        bgcolor: "background.default",
        boxShadow: neuGlowSmall,
        "&:hover": { bgcolor: "background.default", boxShadow: neuInset },
        ...sx,
      }}
    >
      {children}
    </IconButton>
  );
}

function CartCard({
  img,
  title,
  stickyText,
  stickyColor,
  actionText,
  actionColor,
  fabIcon,
  stickyFab = false,
  children,
}: {
  img: string;
  title: string;
  stickyText: string;
  stickyColor: string;
  actionText: string;
  actionColor: string;
  fabIcon?: ReactNode;
  stickyFab?: boolean;
  children: ReactNode;
}) {
  return (
    <VuseCard>
      <CardMedia component="img" image={img} sx={{ height: 250, objectFit: "cover" }} />
      <CardContent sx={{ textAlign: "center", position: "relative", pt: 3.25, pb: 1.5 }}>
        <Button
          size="small"
          variant="contained"
          sx={{
            position: "absolute",
            left: 18,
            top: -16,
            minWidth: stickyFab ? 46 : 58,
            width: stickyFab ? 46 : "auto",
            height: stickyFab ? 46 : 32,
            borderRadius: stickyFab ? "50%" : 999,
            bgcolor: stickyColor,
            color: "#fff",
            boxShadow: neuGlowSmall,
            "&:hover": { bgcolor: stickyColor, boxShadow: neuInset },
          }}
        >
          {stickyText}
        </Button>
        <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 700, mb: 1.75 }}>
          {title}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: 14.5, lineHeight: 1.55, px: 1 }}>
          {children}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", pb: 2.5, gap: 1.75 }}>
        <SoftButton buttonColor={actionColor}>{actionText}</SoftButton>
        {fabIcon && (
          <SoftIconButton aria-label={`${title} action`}>
            <Box sx={{ color: actionColor, display: "grid" }}>{fabIcon}</Box>
          </SoftIconButton>
        )}
      </CardActions>
    </VuseCard>
  );
}

function MovieTicket() {
  return (
    <CartCard img={avengersEndgame} title="Avengers: Endgame" stickyText="0.8" stickyColor="#e91e63" actionText="Ticket Available" actionColor="#ffb74d" fabIcon={<Bookmark fontSize="small" />} stickyFab>
      After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.
    </CartCard>
  );
}

function AddToCart() {
  return (
    <CartCard img={dragonCourse} title="Discover How to Design" stickyText="$250" stickyColor="#e91e63" actionText="Add to Cart" actionColor="#2979ff">
      48 Hours of video with <Box component="span" sx={{ color: "#e91e63" }}>Full Access</Box>
    </CartCard>
  );
}

function ShoeCard() {
  return (
    <VuseCard>
      <CardMedia component="img" image={revoltShoe} sx={{ height: 250, objectFit: "cover" }} />
      <CardContent sx={{ textAlign: "center", position: "relative", pt: 4.25, pb: 2 }}>
        <Box sx={{ position: "absolute", left: 0, right: 0, top: -24, display: "flex", justifyContent: "center" }}>
          <Button
            aria-label="Add shoe to cart"
            sx={{
              minWidth: 48,
              width: 48,
              height: 48,
              borderRadius: "50%",
              bgcolor: "#00bcd4",
              color: "#fff",
              boxShadow: neuGlowSmall,
              "&:hover": { bgcolor: "#00bcd4", boxShadow: neuInset },
            }}
          >
            <ShoppingCart />
          </Button>
        </Box>
        <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 700, mb: 1.75 }}>
          Nike Revolt
        </Typography>
        <Typography sx={{ fontSize: 14.5 }}>
          Men's Shoe <Box component="span" sx={{ color: "#e91e63" }}> $189.99</Box>
        </Typography>
        <Typography sx={{ fontSize: 14.5 }}>
          <Box component="b">Size</Box>: 6 US
        </Typography>
      </CardContent>
    </VuseCard>
  );
}

function ProductCard() {
  return (
    <VuseCard>
      <CardMedia component="img" image={fancyHeadphone} sx={{ height: 250, objectFit: "cover" }} />
      <CardContent sx={{ pb: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Box>
            <Typography sx={{ fontSize: 17, fontWeight: 700 }}>Fancy Headphone</Typography>
            <Rating value={3} readOnly size="small" sx={{ color: "#00838f" }} />
          </Box>
          <Typography sx={{ whiteSpace: "nowrap" }}>
            <Box component="span" sx={{ mx: 1, color: "text.secondary", textDecoration: "line-through" }}>$349</Box>
            <Box component="span" sx={{ fontWeight: 600 }}>$250</Box>
          </Typography>
        </Stack>
        <Typography color="text.secondary" sx={{ fontSize: 14.5, lineHeight: 1.55 }}>
          The Fancy-Beats Noise Cancelling Headphones are currently the best headphones and have a sexy new design and cool features that come with its high price tag.
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", pb: 2.5 }}>
        <SoftButton buttonColor="#ffb74d">Add to Cart</SoftButton>
      </CardActions>
    </VuseCard>
  );
}

function CourseWidget() {
  return (
    <VuseCard>
      <CardMedia component="img" image={designCommunity} sx={{ height: 200, objectFit: "contain", bgcolor: "#eeeeee" }} />
      <Box sx={{ position: "relative", height: 0 }}>
        <Button
          aria-label="Play course"
          sx={{
            position: "absolute",
            right: 18,
            bottom: -20,
            minWidth: 46,
            width: 46,
            height: 46,
            borderRadius: "50%",
            bgcolor: "#ffb74d",
            color: "#fff",
            boxShadow: neuGlowSmall,
            "&:hover": { bgcolor: "#ffb74d", boxShadow: neuInset },
          }}
        >
          <PlayArrow />
        </Button>
      </Box>
      <CardContent sx={{ pt: 2.75 }}>
        <Typography color="text.secondary" sx={{ fontSize: 14, mb: 0.75 }}>
          Design
        </Typography>
        <Typography variant="h6" sx={{ fontSize: 21, fontWeight: 500, mb: 2 }}>
          Design Principle
        </Typography>
        <Typography sx={{ fontSize: 14.5, mb: 1.5 }}>{users.timothy.name}</Typography>
        <Stack direction="row" alignItems="center" spacing={1.75}>
          <Typography color="text.secondary" sx={{ fontSize: 14.5, flexGrow: 1 }}>
            4 of 8 Lessons
          </Typography>
          <LinearProgress variant="determinate" value={50} sx={{ width: 72, height: 8, borderRadius: 999, bgcolor: "rgba(111,125,133,.16)", "& .MuiLinearProgress-bar": { borderRadius: 999 } }} />
        </Stack>
      </CardContent>
    </VuseCard>
  );
}

function PostHeader({ name, avatar }: { name: string; avatar: string }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 2, pt: 2 }}>
      <Avatar src={avatar} sx={{ width: 40, height: 40 }} />
      <Typography sx={{ flexGrow: 1, fontSize: 16 }}>{name}</Typography>
      <IconButton aria-label="Post options" sx={{ color: "text.secondary" }}>
        <MoreVert />
      </IconButton>
    </Stack>
  );
}

function PostActions({ likes = 213, comments = 123 }: { likes?: number; comments?: number }) {
  return (
    <CardActions sx={{ px: 1.5, pb: 1.25 }}>
      <Button startIcon={<Favorite sx={{ color: "#f44336" }} />} sx={{ color: "text.primary", fontWeight: 500 }}>
        {likes} Likes
      </Button>
      <Button startIcon={<Comment />} sx={{ color: "text.primary", fontWeight: 500 }}>
        {comments} Comments
      </Button>
    </CardActions>
  );
}

function BlogPostCard() {
  return (
    <VuseCard>
      <PostHeader name={users.timothy.name} avatar={users.timothy.avatar} />
      <CardMedia component="img" image="https://picsum.photos/500/300?image=292" sx={{ height: 250, objectFit: "cover", mt: 1.5 }} />
      <CardContent sx={{ pb: 0 }}>
        <Typography variant="h6" sx={{ fontSize: 21, fontWeight: 500, mb: 0.5 }}>
          Salad Recipes
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: 14, mb: 2 }}>
          May 1, 2026
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: 14.5, lineHeight: 1.55 }}>
          Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.
        </Typography>
      </CardContent>
      <PostActions />
    </VuseCard>
  );
}

function ArticlePostCard() {
  return (
    <VuseCard>
      <CardContent sx={{ pb: 0 }}>
        <Typography variant="h6" sx={{ fontSize: 21, fontWeight: 500, mb: 0.5 }}>
          Salad Recipes
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: 14, mb: 2 }}>
          May 1, 2026
        </Typography>
      </CardContent>
      <CardMedia component="img" image="https://picsum.photos/500/300?image=292" sx={{ height: 250, objectFit: "cover" }} />
      <CardContent sx={{ pb: 0 }}>
        <Typography color="text.secondary" sx={{ fontSize: 14.5, lineHeight: 1.55 }}>
          Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.
        </Typography>
      </CardContent>
      <PostActions />
      <PostHeader name={users.timothy.name} avatar={users.timothy.avatar} />
      <Box sx={{ height: 12 }} />
    </VuseCard>
  );
}

function TinyPost() {
  return (
    <VuseCard>
      <PostHeader name={users.timothy.name} avatar={users.timothy.avatar} />
      <CardContent sx={{ pt: 2 }}>
        <Typography color="text.secondary" sx={{ fontSize: 14.5, lineHeight: 1.55 }}>
          Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.
        </Typography>
      </CardContent>
      <PostActions />
    </VuseCard>
  );
}

function ProfileAvatar({ src, size = 80, tile = false }: { src: string; size?: number; tile?: boolean }) {
  return (
    <Box
      sx={{
        width: size + 18,
        height: size + 18,
        borderRadius: tile ? 1 : "50%",
        display: "grid",
        placeItems: "center",
        bgcolor: "background.default",
        boxShadow: neuInset,
      }}
    >
      <Avatar src={src} variant={tile ? "rounded" : "circular"} sx={{ width: size, height: size }} />
    </Box>
  );
}

function UserProfileBase({
  name,
  avatar,
  cover,
  avatarSize = 80,
  tile = false,
  social = false,
  actionText = "Follow",
  showMessage = true,
}: {
  name: string;
  avatar: string;
  cover?: string;
  avatarSize?: number;
  tile?: boolean;
  social?: boolean;
  actionText?: string;
  showMessage?: boolean;
}) {
  return (
    <VuseCard>
      {cover && <CardMedia component="img" image={cover} sx={{ height: 210, objectFit: "cover" }} />}
      <CardContent sx={{ textAlign: "center", position: "relative", pt: cover ? 6.25 : 2.75 }}>
        <Box sx={{ display: "flex", justifyContent: "center", ...(cover ? { position: "absolute", top: -50, left: 0, right: 0 } : {}) }}>
          <ProfileAvatar src={avatar} size={avatarSize} tile={tile} />
        </Box>
        <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 700, mt: cover ? 0 : 2, mb: 0.5 }}>
          {name}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: 14.5 }}>
          Los Angeles, California
        </Typography>
        {social && (
          <Stack direction="row" justifyContent="center" spacing={1.5} sx={{ mt: 1.5 }}>
            <SocialButton icon={<Facebook fontSize="small" />} color="#9c27b0" label="Facebook" />
            <SocialButton icon={<Twitter fontSize="small" />} color="#2196f3" label="Twitter" />
            <SocialButton icon={<Instagram fontSize="small" />} color="#e91e63" label="Instagram" />
            <SocialButton icon={<Mail fontSize="small" />} color="#00bcd4" label="Email" href="mailto:example@hotmail.com" />
          </Stack>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: "center", pb: 2.5, gap: 1.75 }}>
        <SoftButton buttonColor="#ffb74d">{actionText}</SoftButton>
        {showMessage && (
          <SoftIconButton aria-label="Message user">
            <Message sx={{ color: "primary.main", fontSize: 18 }} />
          </SoftIconButton>
        )}
      </CardActions>
    </VuseCard>
  );
}

function SocialButton({ icon, color, label, href = "#" }: { icon: ReactNode; color: string; label: string; href?: string }) {
  return (
    <IconButton
      component="a"
      href={href}
      aria-label={label}
      sx={{
        width: 36,
        height: 36,
        bgcolor: "background.default",
        boxShadow: neuGlowSmall,
        color,
        "&:hover": { bgcolor: "background.default", boxShadow: neuInset },
      }}
    >
      {icon}
    </IconButton>
  );
}

function UserFollowCard() {
  return <UserProfileBase name={users.regina.name} avatar={users.regina.avatar} cover="https://picsum.photos/500/300?image=512" />;
}

function UserProfileCard() {
  return <UserProfileBase name={users.gulnaz.name} avatar={users.gulnaz.avatar} cover="https://picsum.photos/500/300?image=188" social actionText="Add Friend" showMessage={false} />;
}

function UserProfileCardAlternative() {
  return <UserProfileBase name={users.mary.name} avatar={users.mary.avatar} avatarSize={120} social actionText="Add Friend" showMessage={false} />;
}

function UserProfileCardAnother() {
  return <UserProfileBase name={users.regina.name} avatar={users.regina.avatar} avatarSize={120} tile social actionText="Add Friend" showMessage={false} />;
}

function UserUtilization() {
  return (
    <VuseCard>
      <CardContent sx={{ pb: 1 }}>
        <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 500, mb: 2 }}>
          My Progress
        </Typography>
        <Box sx={{ display: "grid", placeItems: "center", my: 1 }}>
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress variant="determinate" value={78} size={150} thickness={4.5} sx={{ color: "primary.main" }} />
            <Box sx={{ inset: 0, position: "absolute", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography variant="h4" sx={{ fontSize: 34, fontWeight: 500 }}>
                78<sup>%</sup>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Stack direction="row" alignItems="center" justifyContent="center" divider={<Divider orientation="vertical" flexItem />} sx={{ textAlign: "center", my: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ fontSize: 30, fontWeight: 500 }}>32<sup>%</sup></Typography>
            <Typography color="text.secondary">Last Week</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ fontSize: 30, fontWeight: 500 }}>89<sup>%</sup></Typography>
            <Typography color="text.secondary">Last Month</Typography>
          </Box>
        </Stack>
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{
            mx: 1,
            px: 2.5,
            py: 1.5,
            borderRadius: 1,
            boxShadow: neuInset,
          }}
        >
          <Avatar src={users.gulnaz.avatar} sx={{ width: 42, height: 42 }} />
          <Box sx={{ minWidth: 0 }}>
            <Typography noWrap sx={{ fontSize: 16 }}>{users.gulnaz.name}</Typography>
            <Typography noWrap color="secondary.main" sx={{ fontSize: 13.5 }}>{users.gulnaz.email}</Typography>
          </Box>
        </Stack>
      </CardContent>
    </VuseCard>
  );
}
