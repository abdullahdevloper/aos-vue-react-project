import { Chip, Stack } from "@mui/material";

export default function CountDown({ days = 7, hours = 12, minutes = 30 }: { days?: number; hours?: number; minutes?: number }) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip label={`${days}d`} />
      <Chip label={`${hours}h`} />
      <Chip label={`${minutes}m`} />
    </Stack>
  );
}
