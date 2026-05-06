import type { ReactNode } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { CheckCircle, FiberManualRecord, MoreVert } from "@mui/icons-material";
import Fuse from "fuse.js";
import type { AvatarLike, MetricItem, NavItem } from "../types/dashboard";

export function RenderAvatar({ avatar, size = 48 }: { avatar?: AvatarLike; size?: number }) {
  return (
    <Avatar src={avatar?.src} sx={{ width: size, height: size, bgcolor: avatar?.color ?? "primary.main" }}>
      {avatar?.icon ?? avatar?.text?.slice(0, 2).toUpperCase() ?? "VD"}
    </Avatar>
  );
}

export function MetricCard({ title, heading, avatar, children }: { title: string; heading: ReactNode; avatar?: AvatarLike; children?: ReactNode }) {
  return (
    <Card>
      <CardHeader title={title} action={<MoreVert color="disabled" />} />
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Box>
            <Typography variant="h4">{heading}</Typography>
            <Typography variant="body2" color="text.secondary">{children}</Typography>
          </Box>
          <RenderAvatar avatar={avatar} />
        </Stack>
      </CardContent>
    </Card>
  );
}

export function CompactList({ items }: { items: Array<{ title: string; subtitle?: string; icon?: ReactNode }> }) {
  return (
    <List dense disablePadding>
      {items.map((item) => (
        <ListItem key={item.title} disableGutters>
          <ListItemIcon sx={{ minWidth: 36 }}>{item.icon ?? <FiberManualRecord fontSize="small" />}</ListItemIcon>
          <ListItemText primary={item.title} secondary={item.subtitle} />
        </ListItem>
      ))}
    </List>
  );
}

export function ProgressMetric({ item, value = 64 }: { item: MetricItem; value?: number }) {
  return (
    <Stack spacing={1}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2" fontWeight={700}>{item.label}</Typography>
        <Typography variant="body2" color="text.secondary">{item.value}</Typography>
      </Stack>
      <LinearProgress variant="determinate" value={value} color={item.tone ?? "primary"} />
      {item.helper && <Typography variant="caption" color="text.secondary">{item.helper}</Typography>}
    </Stack>
  );
}

export function NavList({ items }: { items: NavItem[] }) {
  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.title} component="a" href={item.path ?? "#"} sx={{ borderRadius: 1 }}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItem>
      ))}
    </List>
  );
}

export function SearchList({ query, items }: { query: string; items: string[] }) {
  const fuse = new Fuse(items);
  const visible = query ? fuse.search(query).map((result) => result.item) : items;
  return <CompactList items={visible.map((title) => ({ title, icon: <CheckCircle color="success" /> }))} />;
}

export function TaskList({ items }: { items: Array<{ id: number; label: string; done: boolean }> }) {
  return (
    <List dense>
      {items.map((item) => (
        <ListItem key={item.id} disableGutters>
          <Checkbox checked={item.done} />
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
  );
}

export function ContentCard({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>{children}</CardContent>
      {action && <><Divider /><CardActions>{action}</CardActions></>}
    </Card>
  );
}

export function StatusChips({ labels }: { labels: string[] }) {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {labels.map((label) => <Chip key={label} label={label} size="small" />)}
    </Stack>
  );
}

export function ActionButton({ children = "Open" }: { children?: ReactNode }) {
  return <Button variant="contained" size="small">{children}</Button>;
}
