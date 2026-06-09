import { useMemo, useState } from "react";
import { Box, Card, Grid, GlobalStyles, InputAdornment, TextField, Typography } from "@mui/material";
import { Collections, Search } from "@mui/icons-material";
import DocPage from "../../components/vuetify-docs/DocPage";
import iconData from "../../data/style-ui/google-material-icons.json";
import materialIconsFont from "../../assets/style-ui/icons/MaterialIcons-Regular.woff2";

interface MaterialIconEntry {
  id: string;
  name: string;
  group_id: string;
  keywords: string[];
  ligature: string;
  codepoint: string;
  is_new: boolean;
  state?: string;
}

const icons = iconData as MaterialIconEntry[];
const neuGlow = "-7px -7px 5px rgba(255,255,255,.86), 7px 7px 7px rgba(174,174,192,.30)";
const neuInset = "inset -5px -5px 6px rgba(255,255,255,.88), inset 6px 6px 8px rgba(174,174,192,.30)";

export default function IconsPage() {
  const [search, setSearch] = useState("");
  const filteredIcons = useMemo(() => {
    if (!search) return icons;

    let regex: RegExp;
    try {
      regex = new RegExp(search, "i");
    } catch {
      regex = new RegExp(escapeRegExp(search), "i");
    }

    return icons.filter((icon) => regex.test(icon.keywords.join(" ")) || regex.test(icon.state || "") || regex.test(icon.id));
  }, [search]);

  return (
    <Box className="vuse-content-wrapper">
      <GlobalStyles
        styles={{
          "@font-face": {
            fontFamily: "Material Icons",
            fontStyle: "normal",
            fontWeight: 400,
            src: `url(${materialIconsFont}) format("woff2")`,
          },
        }}
      />
      <DocPage
        title="Icons"
        namespace=""
        icon={<Collections />}
        breadcrumbs={[
          { label: "User Interface" },
          { label: "Google Material Icons" },
        ]}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              label="Search"
              fullWidth
              variant="filled"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ fontSize: 21 }} />
                  </InputAdornment>
                ),
              }}
              sx={searchFieldSx}
            />
          </Grid>

          {filteredIcons.map((icon) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={icon.id}>
              <IconCard icon={icon} />
            </Grid>
          ))}
        </Grid>
      </DocPage>
    </Box>
  );
}

function IconCard({ icon }: { icon: MaterialIconEntry }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: 150,
        borderRadius: 1,
        bgcolor: "background.default",
        boxShadow: neuGlow,
        backgroundImage: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 1.5,
        transition: "box-shadow 160ms ease, transform 160ms ease",
        "&:hover": {
          boxShadow: neuInset,
        },
      }}
    >
      <Box
        component="span"
        aria-hidden
        sx={{
          fontFamily: "Material Icons",
          fontWeight: "normal",
          fontStyle: "normal",
          fontSize: 36,
          lineHeight: 1,
          letterSpacing: 0,
          textTransform: "none",
          display: "inline-block",
          whiteSpace: "nowrap",
          wordWrap: "normal",
          direction: "ltr",
          WebkitFontFeatureSettings: "liga",
          WebkitFontSmoothing: "antialiased",
          color: "text.primary",
          pt: 1,
        }}
      >
        {icon.id}
      </Box>
      <Typography sx={{ mt: 2, color: "text.secondary", fontSize: 14, lineHeight: 1.35, overflowWrap: "anywhere" }}>{icon.id}</Typography>
    </Card>
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const searchFieldSx = {
  "& .MuiFilledInput-root": {
    minHeight: 56,
    bgcolor: "#fff",
    borderRadius: 1,
    boxShadow: neuInset,
    border: "1px solid transparent",
    "&:before, &:after": { display: "none" },
    "&:hover": { bgcolor: "#fff", borderColor: "rgba(0,131,143,.22)" },
    "&.Mui-focused": { bgcolor: "#fff", borderColor: "#00838f" },
  },
  "& .MuiFilledInput-input": { py: 2, fontSize: 15.5 },
  "& .MuiInputLabel-root": { fontSize: 15.5, color: "text.secondary", "&.Mui-focused": { color: "primary.main" } },
  "& .MuiInputAdornment-root": { color: "text.secondary", mt: "0 !important" },
};
