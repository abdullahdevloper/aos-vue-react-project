import { ContentCard, RenderAvatar, StatusChips } from "../../../../common";
import { Stack, Typography } from "@mui/material";

export default function UserProfileCard() {
  return (
    <ContentCard title="User Profile">
      <Stack alignItems="center" spacing={1}>
        <RenderAvatar avatar={{ text: "AB" }} size={72} />
        <Typography fontWeight={800}>Avery Brooks</Typography>
        <StatusChips labels={["Product", "Admin"]} />
      </Stack>
    </ContentCard>
  );
}
