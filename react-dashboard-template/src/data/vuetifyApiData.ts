import apiGeneratorData from "./vuetifyApiGeneratorData.json";

export type ApiParameter = {
  name: string;
  type?: unknown;
  default?: unknown;
  source?: string;
  description?: string;
  example?: unknown;
  signature?: string;
  props?: unknown;
  value?: unknown;
  [key: string]: unknown;
};

export type ApiCategory = "api" | "props" | "slots" | "events" | "functions" | "functional" | "options" | "sass";

export type VuetifyApiEntry = {
  text: string;
  namespace: "Components" | "Layout" | "Motion";
  subtext: string;
  icon: "dashboard" | "grid" | "transition" | "stream";
  api?: ApiParameter[];
  props?: ApiParameter[];
  slots?: ApiParameter[];
  events?: ApiParameter[];
  functions?: ApiParameter[];
  functional?: ApiParameter[];
  options?: ApiParameter[];
  sass?: ApiParameter[];
};

type RawApiComponent = Partial<Record<ApiCategory | "mixins" | "type", unknown>>;

const rawApi = apiGeneratorData as Record<string, RawApiComponent>;
const excludedDirectives = ["v-ripple", "v-touch", "v-scroll", "v-resize"];
const gridComponents = ["v-container", "v-layout", "v-flex", "v-spacer"];
const categories: ApiCategory[] = ["api", "props", "slots", "events", "functions", "functional", "options", "sass"];

export const vuetifyApiEntries: VuetifyApiEntry[] = Object.keys(rawApi)
  .filter((key) => key.includes("v-") && !excludedDirectives.includes(key))
  .map((text) => {
    const source = rawApi[text];
    const entry: VuetifyApiEntry = {
      text,
      namespace: getNamespace(text, source),
      subtext: getSubtext(text, source),
      icon: getIcon(text, source),
    };

    for (const category of categories) {
      const value = source[category];
      if (Array.isArray(value) && value.length > 0) entry[category] = normalizeParameters(value);
    }

    return entry;
  })
  .sort((a, b) => a.text.localeCompare(b.text));

export const vuetifyApiComponentNames = vuetifyApiEntries.map((entry) => entry.text);

function getNamespace(text: string, source: RawApiComponent): VuetifyApiEntry["namespace"] {
  if (gridComponents.includes(text)) return "Layout";
  if (text.includes("transition")) return "Motion";
  if (Array.isArray(source.props) && source.props.length === 0) return "Components";
  return "Components";
}

function getSubtext(text: string, source: RawApiComponent) {
  if (gridComponents.includes(text)) return "Grid Component";
  if (text.includes("transition")) return "Transition";
  if (Array.isArray(source.props) && source.props.length === 0) return "Functional Components";
  return "Component";
}

function getIcon(text: string, source: RawApiComponent): VuetifyApiEntry["icon"] {
  if (gridComponents.includes(text)) return "grid";
  if (text.includes("transition")) return "transition";
  if (Array.isArray(source.props) && source.props.length === 0) return "stream";
  return "dashboard";
}

function normalizeParameters(items: unknown[]): ApiParameter[] {
  return items.map((item) => {
    if (item && typeof item === "object" && !Array.isArray(item)) {
      const parameter = item as Record<string, unknown>;
      return {
        ...parameter,
        name: typeof parameter.name === "string" ? parameter.name : String(parameter.name || "default"),
      };
    }

    return { name: String(item) };
  });
}
