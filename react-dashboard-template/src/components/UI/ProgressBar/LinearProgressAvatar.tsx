import { Stack } from "@mui/material";
import { ProgressMetric, RenderAvatar } from "../../common";

export default function LinearProgressAvatar() {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <RenderAvatar avatar={{ text: "PR" }} />
      <ProgressMetric item={{ label: "Progress", value: "72%", helper: "Phase health", tone: "success" }} value={72} />
    </Stack>
  );
}
