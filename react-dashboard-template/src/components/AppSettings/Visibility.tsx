import { Stack } from "@mui/material";
import FooterSettings from "./FooterSettings";
import HeaderSettings from "./HeaderSettings";

export default function Visibility() {
  return (
    <Stack>
      <HeaderSettings />
      <FooterSettings />
    </Stack>
  );
}
