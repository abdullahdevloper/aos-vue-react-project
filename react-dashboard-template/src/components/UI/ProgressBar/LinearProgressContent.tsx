import { ProgressMetric } from "../../common";

export default function LinearProgressContent() {
  return <ProgressMetric item={{ label: "Completion", value: "64%", helper: "Component coverage", tone: "primary" }} value={64} />;
}
