import type { AvatarLike } from "../../types/dashboard";
import { RenderAvatar } from "../common";

export default function VuseNeuAvatar({ avatar, size = 56 }: { avatar?: AvatarLike; size?: number }) {
  return <RenderAvatar avatar={{ color: "#00838f", ...avatar }} size={size} />;
}
