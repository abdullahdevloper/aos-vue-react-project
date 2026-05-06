import { Stack, Tooltip, IconButton } from "@mui/material";

const colors = ["#00838f", "#ffb74d", "#43a047", "#5e35b1", "#e53935"];

export default function VuseColorPicker({ onChange }: { onChange?: (value: string) => void }) {
  return (
    <Stack direction="row" spacing={1}>
      {colors.map((color) => (
        <Tooltip title={color} key={color}>
          <IconButton aria-label={color} onClick={() => onChange?.(color)} sx={{ width: 28, height: 28, bgcolor: color, "&:hover": { bgcolor: color } }} />
        </Tooltip>
      ))}
    </Stack>
  );
}
