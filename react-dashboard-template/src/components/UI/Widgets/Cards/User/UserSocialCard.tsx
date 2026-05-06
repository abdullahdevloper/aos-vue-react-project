import { Group } from "@mui/icons-material";
import { MetricCard } from "../../../../common";

export default function UserSocialCard() {
  return <MetricCard title="Social Reach" heading="12.4k" avatar={{ icon: <Group /> }}>Followers across channels</MetricCard>;
}
