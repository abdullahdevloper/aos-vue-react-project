import { useMemo, useState } from "react";
import {
  Box,
  Card,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Dashboard, Search } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import type { ApiCategory, ApiParameter, VuetifyApiEntry } from "../../data/vuetifyApiData";
import ApiParameterRow from "./ApiParameterRow";

const tabs: ApiCategory[] = ["api", "props", "slots", "events", "functions", "functional", "options", "sass"];

const fieldMap: Record<ApiCategory, Array<"name" | "type" | "default" | "description" | "example" | "signature" | "props" | "value">> = {
  api: ["name", "type", "default", "description", "example"],
  props: ["name", "type", "default", "description", "example"],
  slots: ["name", "description", "props"],
  events: ["name", "description", "value"],
  functions: ["name", "description", "signature"],
  functional: ["name", "description"],
  options: ["name", "type", "default", "description"],
  sass: ["name", "default"],
};

interface ApiItemsProps {
  entries: VuetifyApiEntry[];
  selected: VuetifyApiEntry;
  onSelect: (entry: VuetifyApiEntry) => void;
}

export default function ApiItems({ entries, selected, onSelect }: ApiItemsProps) {
  const theme = useTheme();
  const vertical = useMediaQuery(theme.breakpoints.up("sm"));
  const availableTabs = tabs.filter((tab) => (selected[tab] || []).length > 0);
  const [activeTab, setActiveTab] = useState<ApiCategory>(availableTabs[0] || "props");
  const [search, setSearch] = useState("");

  const currentTab = availableTabs.includes(activeTab) ? activeTab : availableTabs[0];
  const items = selected[currentTab] || [];
  const filteredItems = useMemo(() => filterItems(items, search), [items, search]);

  return (
    <Box component="section" sx={{ mt: 4 }}>
      <Typography id="api" variant="h5" sx={{ fontSize: 25, fontWeight: 500, mb: 1 }}>
        API
      </Typography>
      <Typography color="text.secondary" sx={{ fontSize: 15, lineHeight: 1.65, mb: 2.5 }}>
        Select a component to inspect its available props, slots, events, options, and style variables.
      </Typography>
      <Card
        variant="outlined"
        sx={{
          bgcolor: "background.default",
          borderColor: "rgba(111,125,133,.18)",
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        <Box sx={{ bgcolor: "primary.main", color: "primary.contrastText", px: { xs: 2, md: 3 }, py: 2 }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ xs: "stretch", md: "center" }}>
            <FormControl sx={{ minWidth: { xs: "100%", md: 280 } }} size="small">
              <InputLabel sx={{ color: "rgba(255,255,255,.86)", "&.Mui-focused": { color: "#fff" } }}>Available Component(s)</InputLabel>
              <Select
                value={selected.text}
                label="Available Component(s)"
                onChange={(event) => {
                  const next = entries.find((entry) => entry.text === event.target.value);
                  if (next) {
                    onSelect(next);
                    setActiveTab(tabs.find((tab) => (next[tab] || []).length > 0) || "props");
                    setSearch("");
                  }
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <Dashboard sx={{ color: "#fff", fontSize: 19 }} />
                  </InputAdornment>
                }
                sx={whiteControlSx}
              >
                {entries.map((entry) => (
                  <MenuItem value={entry.text} key={entry.text}>
                    {entry.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ flexGrow: 1 }} />
            <TextField
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              label="Search..."
              type="search"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "#fff", fontSize: 19 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: { xs: "100%", md: 280 }, ...whiteControlSx }}
            />
          </Stack>
        </Box>

        {availableTabs.length > 0 ? (
          <Box sx={{ display: { xs: "block", sm: "flex" }, bgcolor: "#fff", minHeight: 360 }}>
            <Tabs
              orientation={vertical ? "vertical" : "horizontal"}
              variant={vertical ? "standard" : "scrollable"}
              value={currentTab}
              onChange={(_, value: ApiCategory) => setActiveTab(value)}
              sx={{
                flexShrink: 0,
                minWidth: { sm: 170 },
                bgcolor: "rgba(242,243,247,.72)",
                borderRight: { sm: "1px solid rgba(111,125,133,.16)" },
                borderBottom: { xs: "1px solid rgba(111,125,133,.16)", sm: 0 },
                "& .MuiTab-root": {
                  alignItems: { sm: "flex-start" },
                  minHeight: 48,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "text.secondary",
                  textTransform: "none",
                },
                "& .Mui-selected": { color: "primary.main" },
                "& .MuiTabs-indicator": { bgcolor: "primary.main" },
              }}
            >
              {availableTabs.map((tab) => (
                <Tab key={tab} label={tabLabel(tab)} value={tab} />
              ))}
            </Tabs>
            <Box sx={{ flexGrow: 1, maxHeight: 800, overflowY: "auto" }}>
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <ApiParameterRow key={`${currentTab}-${item.name}`} item={item} fields={fieldMap[currentTab]} isLast={index + 1 === filteredItems.length} />
                ))
              ) : (
                <Typography sx={{ textAlign: "center", py: 5, fontSize: 19, fontWeight: 400 }}>No matching records found</Typography>
              )}
            </Box>
          </Box>
        ) : (
          <Typography sx={{ textAlign: "center", py: 5, bgcolor: "#fff" }}>No API records available.</Typography>
        )}
      </Card>
    </Box>
  );
}

const whiteControlSx = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    "& fieldset": { borderColor: "rgba(255,255,255,.72)" },
    "&:hover fieldset": { borderColor: "#fff" },
    "&.Mui-focused fieldset": { borderColor: "#fff" },
  },
  "& .MuiInputLabel-root": { color: "rgba(255,255,255,.86)" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
  "& .MuiSvgIcon-root": { color: "#fff" },
};

function filterItems(items: ApiParameter[], search: string) {
  const term = search.trim().toLowerCase();
  if (!term) return items;
  return items.filter((item) => [item.name, item.type, item.default, item.source, item.description, item.example, item.signature, item.props, item.value].flat().filter(Boolean).map(formatSearchValue).join(" ").toLowerCase().includes(term));
}

function tabLabel(tab: ApiCategory) {
  return tab.replace(/([A-Z])/g, " $1");
}

function formatSearchValue(value: unknown) {
  return typeof value === "string" ? value : JSON.stringify(value);
}
