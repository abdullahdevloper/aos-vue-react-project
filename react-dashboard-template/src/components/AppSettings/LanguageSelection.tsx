import { MenuItem, TextField } from "@mui/material";
import { useDashboardStore } from "../../store/useDashboardStore";

export default function LanguageSelection() {
  const locale = useDashboardStore((state) => state.locale);
  const setLocale = useDashboardStore((state) => state.setLocale);
  return (
    <TextField select fullWidth size="small" label="Language" value={locale} onChange={(event) => setLocale(event.target.value)}>
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="fr-FR">French</MenuItem>
      <MenuItem value="ja-JP">Japanese</MenuItem>
      <MenuItem value="ru-RU">Russian</MenuItem>
    </TextField>
  );
}
