import { useMemo, useState } from "react";
import { Autocomplete, Box, Chip, InputAdornment, ListItemIcon, ListItemText, Stack, TextField, Typography } from "@mui/material";
import { AccessTime, Dashboard, Dataset, GridView, Search, ViewStream } from "@mui/icons-material";
import { vuetifyApiEntries, type VuetifyApiEntry } from "../../data/vuetifyApiData";
import ApiItems from "./ApiItems";

const neuGlow = "-6px -6px 5px rgba(255,255,255,.86), 6px 6px 7px rgba(174,174,192,.28)";

export default function ApiExplorer() {
  const entries = useMemo(() => vuetifyApiEntries, []);
  const [selected, setSelected] = useState<VuetifyApiEntry | null>(null);

  return (
    <Box sx={{ mt: 3, mb: 7 }}>
      <Autocomplete
        value={selected}
        onChange={(_, value) => setSelected(value)}
        options={entries}
        getOptionLabel={(option) => option.text}
        clearOnEscape
        sx={{
          mb: 6,
          "& .MuiOutlinedInput-root": {
            minHeight: 56,
            bgcolor: "background.default",
            boxShadow: neuGlow,
            borderRadius: 1,
            px: 1.25,
            "& fieldset": { borderColor: "transparent" },
            "&:hover fieldset": { borderColor: "rgba(0,131,143,.22)" },
            "&.Mui-focused fieldset": { borderColor: "primary.main" },
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select component"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <Dataset color="primary" />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <Box component="li" {...props} sx={{ py: 1.1 }}>
            <ListItemIcon sx={{ color: "text.secondary", minWidth: 40 }}>{iconFor(option)}</ListItemIcon>
            <ListItemText primary={option.text} secondary={option.subtext} primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }} secondaryTypographyProps={{ fontSize: 12.5 }} />
          </Box>
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={option.text}
              color="primary"
              label={
                <Stack direction="row" alignItems="center" spacing={0.75}>
                  {iconFor(option, 16)}
                  <span>{option.text}</span>
                </Stack>
              }
              sx={{ color: "#fff", borderRadius: 1, height: 30 }}
            />
          ))
        }
      />

      {!selected ? (
        <Stack alignItems="center" spacing={0.75} sx={{ color: "text.secondary", textAlign: "center", py: 1 }}>
          <Search sx={{ fontSize: 42, opacity: 0.45 }} />
          <Typography sx={{ fontSize: { xs: 25, md: 34 }, fontWeight: 300 }}>Search for a component</Typography>
          <Typography sx={{ fontSize: 15 }}>or</Typography>
          <Typography sx={{ fontSize: { xs: 25, md: 34 }, fontWeight: 300 }}>Browse categories</Typography>
        </Stack>
      ) : (
        <ApiItems entries={entries} selected={selected} onSelect={setSelected} />
      )}
    </Box>
  );
}

function iconFor(option: VuetifyApiEntry, size = 22) {
  const sx = { fontSize: size };
  if (option.icon === "grid") return <GridView sx={sx} />;
  if (option.icon === "transition") return <AccessTime sx={sx} />;
  if (option.icon === "stream") return <ViewStream sx={sx} />;
  return <Dashboard sx={sx} />;
}
