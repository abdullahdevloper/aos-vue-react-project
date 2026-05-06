import type { AvatarLike } from "../../types/dashboard";
import { RenderAvatar } from "../common";

export default function VuseAvatar({ avatar, size }: { avatar?: AvatarLike; size?: number }) {
  return <RenderAvatar avatar={avatar} size={size} />;
}
