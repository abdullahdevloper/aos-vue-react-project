import { Divider, Stack } from "@mui/material";
import LanguageSelection from "./LanguageSelection";
import SidenavSettings from "./SidenavSettings";
import Theme from "./Theme";
import Visibility from "./Visibility";
import VuseColorPicker from "../VuseColorPicker";

export default function AppSettings() {
  return (
    <Stack spacing={2}>
      <Theme />
      <Visibility />
      <Divider />
      <SidenavSettings />
      <LanguageSelection />
      <VuseColorPicker />
    </Stack>
  );
}
