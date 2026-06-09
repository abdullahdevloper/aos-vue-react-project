import { Dashboard } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";
import ApiExplorer from "../../../components/vuetify-docs/ApiExplorer";

export default function ApiExplorerPage() {
  return (
    <DocPage
      title="Api Explorer"
      namespace="Components"
      icon={<Dashboard />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify" },
      ]}
    >
      <DocText>
        The API explorer lists Vuetify components and exposes their documented props, slots, events, functions, options, and style variables in the same compact documentation layout used by the Vuse template.
      </DocText>
      <ApiExplorer />
    </DocPage>
  );
}
