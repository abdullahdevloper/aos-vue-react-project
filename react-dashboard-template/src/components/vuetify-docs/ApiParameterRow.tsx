import { Box, Divider, Stack, Typography } from "@mui/material";
import type { ApiParameter } from "../../data/vuetifyApiData";

const mono = "'Roboto Mono', 'SFMono-Regular', Consolas, monospace";

interface ApiParameterRowProps {
  item: ApiParameter;
  isLast?: boolean;
  fields: Array<"name" | "type" | "default" | "description" | "example" | "signature" | "props" | "value">;
}

export default function ApiParameterRow({ item, isLast = false, fields }: ApiParameterRowProps) {
  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(140px, .8fr) minmax(120px, .55fr) minmax(160px, .9fr) minmax(240px, 2.2fr)" },
          gap: { xs: 1.4, md: 2 },
          px: { xs: 1.5, md: 2 },
          py: 1.7,
        }}
      >
        {fields.includes("name") && <Field label="name" value={item.name} name />}
        {fields.includes("type") && <Field label="type" value={formatValue(item.type)} />}
        {fields.includes("default") && <Field label="default" value={formatValue(item.default)} />}
        {fields.includes("description") && (
          <Stack spacing={0.35}>
            <Overline>description</Overline>
            <Typography color="text.secondary" sx={{ fontSize: 13.5, lineHeight: 1.55 }}>
              {item.description || fallbackDescription(item)}
            </Typography>
          </Stack>
        )}
        {fields.includes("example") && item.example !== undefined && <CodeField label="example" value={item.example} />}
        {fields.includes("signature") && item.signature !== undefined && <CodeField label="signature" value={item.signature} />}
        {fields.includes("props") && item.props !== undefined && <CodeField label="props" value={item.props} />}
        {fields.includes("value") && item.value !== undefined && <CodeField label="value" value={item.value} />}
      </Box>
      {!isLast && <Divider sx={{ borderColor: "rgba(111,125,133,.16)" }} />}
    </Box>
  );
}

function Field({ label, value, name = false }: { label: string; value?: string; name?: boolean }) {
  return (
    <Stack spacing={0.35}>
      <Overline>{label}</Overline>
      <Typography
        sx={{
          fontFamily: mono,
          color: name ? "#d63200" : "text.primary",
          fontSize: 13.5,
          lineHeight: 1.45,
          wordBreak: "break-word",
        }}
      >
        {value || "-"}
      </Typography>
    </Stack>
  );
}

function CodeField({ label, value }: { label: string; value: unknown }) {
  return (
    <Stack spacing={0.5} sx={{ gridColumn: "1 / -1" }}>
      <Overline>{label}</Overline>
      <Box
        component="pre"
        sx={{
          m: 0,
          px: 1.5,
          py: 1,
          bgcolor: "#2d2d2d",
          color: "#f8f8f2",
          borderRadius: 1,
          fontSize: 12.5,
          lineHeight: 1.45,
          overflowX: "auto",
          fontFamily: mono,
        }}
      >
        {formatValue(value)}
      </Box>
    </Stack>
  );
}

function Overline({ children }: { children: string }) {
  return (
    <Typography
      sx={{
        color: "text.secondary",
        fontSize: 10.5,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 0,
        lineHeight: 1.3,
      }}
    >
      {children}
    </Typography>
  );
}

function formatValue(value: unknown) {
  if (Array.isArray(value)) return value.join(" | ");
  if (value === null) return "null";
  if (value === undefined) return undefined;
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
}

function fallbackDescription(item: ApiParameter) {
  if (item.source) return `Generated Vuetify API metadata from ${item.source}.`;
  return "Generated Vuetify API metadata.";
}
