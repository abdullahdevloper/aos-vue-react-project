import { Card, CardContent, Stack, Typography } from "@mui/material";
import type { AvatarLike } from "../../../types/dashboard";
import { RenderAvatar } from "../../common";

export default function HorizontalCard({ title = "Horizontal card", subtitle = "Compact content", avatar }: { title?: string; subtitle?: string; avatar?: AvatarLike }) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <RenderAvatar avatar={avatar} />
          <Stack>
            <Typography fontWeight={800}>{title}</Typography>
            <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
