import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
  Switch,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Code as CodeIcon, GitHub, InvertColors, Search, TableChart } from "@mui/icons-material";
import {
  mdiArrowCollapseLeft,
  mdiArrowCollapseRight,
  mdiChevronDown,
  mdiChevronLeft,
  mdiChevronRight,
  mdiDelete,
  mdiMinus,
  mdiPencil,
  mdiPlus,
} from "@mdi/js";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const blueDark1 = "#1e88e5";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const shadow1 = "0px 2px 1px -1px rgba(0,0,0,.2), 0px 1px 1px 0px rgba(0,0,0,.14), 0px 1px 3px 0px rgba(0,0,0,.12)";
const shadow2 = "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)";
const divider = "rgba(0,0,0,.12)";

type ExampleKey =
  | "usage"
  | "simple/select"
  | "simple/group"
  | "simple/multi-sort"
  | "simple/search"
  | "simple/headerless"
  | "simple/loading"
  | "simple/dense"
  | "simple/footer-props"
  | "simple/filterable-columns"
  | "intermediate/slots"
  | "intermediate/simple-checkbox"
  | "intermediate/expand"
  | "intermediate/custom-filter"
  | "intermediate/customize-header"
  | "intermediate/customize-rows"
  | "intermediate/paginate"
  | "intermediate/sort"
  | "intermediate/server"
  | "complex/edit-dialog"
  | "complex/crud";

type Header = {
  text: string;
  value: string;
  align?: "start" | "center" | "end";
  sortable?: boolean;
  filterable?: boolean;
};

type Dessert = {
  name: string;
  calories?: number;
  fat?: number;
  carbs?: number;
  protein?: number;
  iron?: string;
  category?: string;
  glutenfree?: boolean;
  actions?: string;
};

const mdiPaths: Record<string, string> = {
  "mdi-arrow-collapse-left": mdiArrowCollapseLeft,
  "mdi-arrow-collapse-right": mdiArrowCollapseRight,
  "mdi-chevron-down": mdiChevronDown,
  "mdi-chevron-left": mdiChevronLeft,
  "mdi-chevron-right": mdiChevronRight,
  "mdi-delete": mdiDelete,
  "mdi-minus": mdiMinus,
  "mdi-pencil": mdiPencil,
  "mdi-plus": mdiPlus,
};

const nutritionHeaders: Header[] = [
  { text: "Dessert (100g serving)", align: "start", sortable: false, value: "name" },
  { text: "Calories", value: "calories" },
  { text: "Fat (g)", value: "fat" },
  { text: "Carbs (g)", value: "carbs" },
  { text: "Protein (g)", value: "protein" },
  { text: "Iron (%)", value: "iron" },
];

const sortableNutritionHeaders: Header[] = nutritionHeaders.map((header) => header.value === "name" ? { ...header, sortable: true } : header);

const categoryHeaders: Header[] = [
  { text: "Dessert (100g serving)", align: "start", value: "name" },
  { text: "Category", value: "category" },
];

const nutritionDesserts: Dessert[] = [
  { name: "Frozen Yogurt", calories: 159, fat: 6.0, carbs: 24, protein: 4.0, iron: "1%" },
  { name: "Ice cream sandwich", calories: 237, fat: 9.0, carbs: 37, protein: 4.3, iron: "1%" },
  { name: "Eclair", calories: 262, fat: 16.0, carbs: 23, protein: 6.0, iron: "7%" },
  { name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3, iron: "8%" },
  { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9, iron: "16%" },
  { name: "Jelly bean", calories: 375, fat: 0.0, carbs: 94, protein: 0.0, iron: "0%" },
  { name: "Lollipop", calories: 392, fat: 0.2, carbs: 98, protein: 0, iron: "2%" },
  { name: "Honeycomb", calories: 408, fat: 3.2, carbs: 87, protein: 6.5, iron: "45%" },
  { name: "Donut", calories: 452, fat: 25.0, carbs: 51, protein: 4.9, iron: "22%" },
  { name: "KitKat", calories: 518, fat: 26.0, carbs: 65, protein: 7, iron: "6%" },
];

const multiSortDesserts: Dessert[] = [
  { name: "Frozen Yogurt", calories: 200, fat: 6.0, carbs: 24, protein: 4.0, iron: "1%" },
  { name: "Ice cream sandwich", calories: 200, fat: 9.0, carbs: 37, protein: 4.3, iron: "1%" },
  { name: "Eclair", calories: 300, fat: 16.0, carbs: 23, protein: 6.0, iron: "7%" },
  { name: "Cupcake", calories: 300, fat: 3.7, carbs: 67, protein: 4.3, iron: "8%" },
  { name: "Gingerbread", calories: 400, fat: 16.0, carbs: 49, protein: 3.9, iron: "16%" },
  { name: "Jelly bean", calories: 400, fat: 0.0, carbs: 94, protein: 0.0, iron: "0%" },
  { name: "Lollipop", calories: 400, fat: 0.2, carbs: 98, protein: 0, iron: "2%" },
  { name: "Honeycomb", calories: 400, fat: 3.2, carbs: 87, protein: 6.5, iron: "45%" },
  { name: "Donut", calories: 500, fat: 25.0, carbs: 51, protein: 4.9, iron: "22%" },
  { name: "KitKat", calories: 500, fat: 26.0, carbs: 65, protein: 7, iron: "6%" },
];

const categoryDesserts: Dessert[] = [
  { name: "Frozen Yogurt", category: "Ice cream" },
  { name: "Ice cream sandwich", category: "Ice cream" },
  { name: "Eclair", category: "Cookie" },
  { name: "Cupcake", category: "Pastry" },
  { name: "Gingerbread", category: "Cookie" },
  { name: "Jelly bean", category: "Candy" },
  { name: "Lollipop", category: "Candy" },
  { name: "Honeycomb", category: "Toffee" },
  { name: "Donut", category: "Pastry" },
  { name: "KitKat", category: "Candy" },
];

const playgroundDesserts: Dessert[] = [
  ...categoryDesserts,
  { name: "Butterfinger", category: "Candy" },
  { name: "Scone", category: "Pastry" },
  { name: "Crunch bar", category: "Candy" },
  { name: "Fudge sundae", category: "Ice cream" },
  { name: "Twizzlers", category: "Candy" },
  { name: "Root beer float", category: "Ice cream" },
  { name: "Strawberry shortcake", category: "Pastry" },
  { name: "Croissant", category: "Pastry" },
  { name: "Cannoli dip", category: "Ice cream" },
  { name: "Sorbet", category: "Ice cream" },
];

export default function DataTablesPage() {
  return (
    <DocPage
      title="DataTables"
      namespace="Components"
      icon={<TableChart />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Data Tables" },
      ]}
    >
      <DocText>
        The <CodePill>v-data-table</CodePill> component is used for displaying tabular data. Features include sorting, searching, pagination, inline-editing, and row selection.
      </DocText>
      <Box component="section" sx={{ mb: 5 }}>
        <BaseHeading id="usage">Usage</BaseHeading>
        <ExampleBlock source="usage" description="The standard data-table will by default render your data as simple rows.">
          <DataTable headers={nutritionHeaders} items={nutritionDesserts} itemsPerPage={5} elevation />
        </ExampleBlock>
      </Box>
      <Box component="section" id="examples">
        <BaseHeading id="examples">Examples</BaseHeading>
        <ExampleBlock title="Selectable rows" source="simple/select" description={<>The <CodePill>show-select</CodePill> prop will render a checkbox in the default header to toggle all rows, and a checkbox for each default row. You can customize these with the slots <CodePill>header.data-table-select</CodePill> and <CodePill>item.data-table-select</CodePill> respectively. You can also switch between allowing multiple selected rows at the same time or just one with the <CodePill>single-select</CodePill> prop.</>}>
          <SelectExample />
        </ExampleBlock>
        <ExampleBlock title="Grouped rows" source="simple/group" description={<>Using the <CodePill>group-by</CodePill> and <CodePill>group-desc</CodePill> props you can group rows on an item property. The <CodePill>show-group-by</CodePill> prop will show a group button in the default header.</>}>
          <DataTable headers={categoryHeaders} items={categoryDesserts} groupBy="category" showGroupBy itemKey="name" elevation />
        </ExampleBlock>
        <ExampleBlock title="Sort on multiple columns" source="simple/multi-sort" description={<>Using the <CodePill>multi-sort</CodePill> prop will enable you to sort on multiple columns at the same time. When enabled, you can pass arrays to both <CodePill>sort-by</CodePill> and <CodePill>sort-desc</CodePill> to programmatically control the sorting, instead of single values.</>}>
          <DataTable headers={nutritionHeaders} items={multiSortDesserts} sortBy={["calories", "fat"]} sortDesc={[false, true]} multiSort elevation />
        </ExampleBlock>
        <SearchExample />
        <ExampleBlock title="Remove default header and footer" source="simple/headerless" description="You can apply the hide-default-header and hide-default-footer props to remove the default header and footer respectively.">
          <DataTable headers={nutritionHeaders} items={nutritionDesserts} hideDefaultHeader hideDefaultFooter elevation />
        </ExampleBlock>
        <ExampleBlock title="Loading state" source="simple/loading" description="You can use the loading prop to indicate that data in the table is currently loading. If there is no data in the table, a loading message will also be displayed. This message can be customized using the loading-text prop or the loading slot.">
          <DataTable headers={[]} items={[]} loading loadingText="Loading... Please wait" itemKey="name" elevation />
        </ExampleBlock>
        <ExampleBlock title="Dense" source="simple/dense" description={<>Using the <CodePill>dense</CodePill> prop you are able to give your data tables an alternate style.</>}>
          <DataTable headers={nutritionHeaders} items={nutritionDesserts} dense elevation />
        </ExampleBlock>
        <ExampleBlock title="Footer props" source="simple/footer-props" description={<>The <CodePill>v-data-table</CodePill> renders a default footer using the <CodePill>v-data-footer</CodePill> component. You can pass props to this component using <CodePill>footer-props</CodePill>.</>}>
          <DataTable headers={categoryHeaders} items={categoryDesserts} itemsPerPage={5} footerProps={{ showFirstLastPage: true, firstIcon: "mdi-arrow-collapse-left", lastIcon: "mdi-arrow-collapse-right", prevIcon: "mdi-minus", nextIcon: "mdi-plus" }} elevation />
        </ExampleBlock>
        <FilterableColumnsExample />
        <SlotsExample />
        <ExampleBlock title="Simple Checkbox" source="intermediate/simple-checkbox" description={<>When wanting to use a checkbox component inside of a slot template in your data tables, use the <CodePill>v-simple-checkbox</CodePill> component rather than the <CodePill>v-checkbox</CodePill> component. The <CodePill>v-simple-checkbox</CodePill> component is used internally and will respect header alignment.</>}>
          <DataTable headers={[...nutritionHeaders, { text: "Gluten-Free", value: "glutenfree" }]} items={glutenDesserts} cellRenderers={{ glutenfree: (item) => <SimpleCheckbox checked={!!item.glutenfree} disabled /> }} elevation />
        </ExampleBlock>
        <ExampleBlock title="Expandable rows" source="intermediate/expand" description={<>The <CodePill>show-expand</CodePill> prop will render an expand icon on each default row. You can customize this with the <CodePill>item.data-table-expand</CodePill> slot. The position of this slot can be customized by adding a column with <CodePill>{"value: 'data-table-expand'"}</CodePill> to the headers array. You can also switch between allowing multiple expanded rows at the same time or just one with the <CodePill>single-expand</CodePill> prop. The expanded rows are available on the synced prop <CodePill>expanded.sync</CodePill></>}>
          <ExpandExample />
        </ExampleBlock>
        <CustomFilterExample />
        <ExampleBlock title="Customizing default header" source="intermediate/customize-header" description={<>You can use the dynamic slots <CodePill>{"header.<name>"}</CodePill> to customize only certain columns. <CodePill>{"<name>"}</CodePill> is the name of the <CodePill>value</CodePill> property in the corresponding header item sent to <CodePill>headers</CodePill>.</>}>
          <DataTable headers={sortableNutritionHeaders} items={nutritionDesserts} headerRenderers={{ name: (header) => header.text.toUpperCase() }} elevation />
        </ExampleBlock>
        <ExampleBlock title="Customizing default rows" source="intermediate/customize-rows" description={<>You can use the dynamic slots <CodePill>{"item.<name>"}</CodePill> to customize only certain columns. <CodePill>{"<name>"}</CodePill> is the name of the <CodePill>value</CodePill> property in the corresponding header item sent to <CodePill>headers</CodePill>. So to customize the calories column we're using the <CodePill>item.calories</CodePill> slot.</>}>
          <DataTable headers={nutritionHeaders} items={nutritionDesserts} cellRenderers={{ calories: (item) => <Chip label={item.calories} sx={{ bgcolor: getCaloriesColor(item.calories || 0), color: "#fff", height: 32 }} /> }} elevation />
        </ExampleBlock>
        <PaginateExample />
        <SortExample />
        <ServerExample />
        <EditDialogExample />
        <CrudExample />
      </Box>
    </DocPage>
  );
}

function SelectExample() {
  const [singleSelect, setSingleSelect] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <DataTable
      headers={nutritionHeaders}
      items={nutritionDesserts}
      showSelect
      singleSelect={singleSelect}
      selected={selected}
      onSelected={setSelected}
      itemKey="name"
      top={<Box sx={{ p: 3 }}><VuetifySwitch checked={singleSelect} onChange={(value) => { setSingleSelect(value); setSelected([]); }} label="Single select" /></Box>}
      elevation
    />
  );
}

function SearchExample() {
  const [search, setSearch] = useState("");
  return (
    <ExampleBlock title="Search" source="simple/search" description={<>The data table exposes a <CodePill>search</CodePill> prop that allows you to filter your data.</>}>
      <Card sx={{ borderRadius: 1, boxShadow: "none" }}>
        <Box sx={{ alignItems: "center", display: "flex", minHeight: 64, p: "16px" }}>
          <Typography sx={{ fontSize: 20, fontWeight: 400 }}>Nutrition</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <SearchField value={search} onChange={setSearch} />
        </Box>
        <DataTable headers={nutritionHeaders} items={nutritionDesserts} search={search} noOuterRadius />
      </Card>
    </ExampleBlock>
  );
}

function FilterableColumnsExample() {
  const [search, setSearch] = useState("");
  return (
    <ExampleBlock title="Filterable columns" source="simple/filterable-columns" description="You can easily disable specific columns from being included when searching through table rows by setting the property filterable to false on the header item(s). In the example below the dessert name column is no longer searchable.">
      <Card sx={{ borderRadius: 1, boxShadow: "none" }}>
        <Box sx={{ minHeight: 64, p: "16px" }}>
          <SearchField value={search} onChange={setSearch} />
        </Box>
        <DataTable headers={[{ ...nutritionHeaders[0], filterable: false }, ...nutritionHeaders.slice(1)]} items={nutritionDesserts} search={search} noOuterRadius />
      </Card>
    </ExampleBlock>
  );
}

function SlotsExample() {
  const [enabled, setEnabled] = useState("");
  const showSelect = enabled === "header.data-table-select" || enabled === "item.data-table-select";
  const items = enabled === "no-data" ? [] : nutritionDesserts;
  const search = enabled === "no-results" ? "..." : "";
  return (
    <ExampleBlock title="Slots" source="intermediate/slots" description={<>The <CodePill>v-data-table</CodePill> provides a large number of slots for customizing the table. This example showcases some of these slots and what you can do with each. It is important to note some slot (eg: <CodePill>item</CodePill>/<CodePill>body</CodePill>/<CodePill>header</CodePill>) will completely takes over the internal rendering of the component which will require you to re-implement functionalities such as selection and expansion. Some slots will override each other such as: <CodePill>body</CodePill> &gt; <CodePill>item</CodePill> &gt; <CodePill>{"item.<name>"}</CodePill> and <CodePill>header</CodePill>/<CodePill>{"header.<name>"}</CodePill>.</>}>
      <Select value={enabled} onChange={(event) => setEnabled(event.target.value)} displayEmpty variant="standard" sx={{ mb: 2, minWidth: 260 }}>
        <MenuItem value="">Slot</MenuItem>
        {slotNames.map((slot) => <MenuItem key={slot} value={slot}>{slot}</MenuItem>)}
      </Select>
      <DataTable
        headers={nutritionHeaders}
        items={items}
        search={search}
        showSelect={showSelect}
        hideDefaultHeader={!showSelect}
        hideDefaultFooter
        loading={enabled === "progress"}
        progressSlot={enabled === "progress"}
        top={enabled === "top" ? <Box sx={{ p: 2 }}>This is content above the actual table</Box> : undefined}
        customHeader={enabled === "header" ? "This is a header" : undefined}
        bodyMode={enabled === "body" ? "content" : undefined}
        bodyPrepend={enabled === "body.prepend" ? "This is a prepended row" : undefined}
        bodyAppend={enabled === "body.append" ? "This is an appended row" : undefined}
        customFooter={enabled === "footer" ? "This is a footer" : undefined}
        noDataText={enabled === "no-data" ? "NO DATA HERE!" : "No data available"}
        noResultsText={enabled === "no-results" ? "NO RESULTS HERE!" : "No matching records found"}
        headerSelectColor={enabled === "header.data-table-select" ? "purple" : undefined}
        itemSelectColor={enabled === "item.data-table-select" ? "green" : undefined}
        cellRenderers={enabled === "item.<name>" ? { name: (item) => item.name.toUpperCase() } : undefined}
        elevation
      />
    </ExampleBlock>
  );
}

function ExpandExample() {
  const [singleExpand, setSingleExpand] = useState(false);
  const [expanded, setExpanded] = useState<string[]>([]);
  return (
    <DataTable
      headers={[...nutritionHeaders, { text: "", value: "data-table-expand" }]}
      items={nutritionDesserts}
      showExpand
      singleExpand={singleExpand}
      expanded={expanded}
      onExpanded={setExpanded}
      itemKey="name"
      top={<Toolbar sx={{ bgcolor: "#fff", boxShadow: "none", minHeight: 64 }}><Typography sx={{ fontSize: 20 }}>Expandable Table</Typography><Box sx={{ flexGrow: 1 }} /><VuetifySwitch checked={singleExpand} onChange={(value) => { setSingleExpand(value); setExpanded([]); }} label="Single expand" /></Toolbar>}
      expandedRender={(item, colspan) => <TableRow><TableCell colSpan={colspan}>More info about {item.name}</TableCell></TableRow>}
      elevation
    />
  );
}

function CustomFilterExample() {
  const [search, setSearch] = useState("");
  const [calories, setCalories] = useState("");
  const headers: Header[] = nutritionHeaders.map((header) => header.value === "calories" ? { ...header } : header);
  const maxCalories = calories ? Number(calories) : undefined;
  return (
    <ExampleBlock title="Custom filtering" source="intermediate/custom-filter" description={<>You can override the default filtering used with <CodePill>search</CodePill> prop by supplying a function to the <CodePill>custom-filter</CodePill> prop. If you need to customize the filtering of a specific column, you can supply a function to the <CodePill>filter</CodePill> property on header items. The signature is <CodePill>{"(value: any, search: string | null, item: any) => boolean"}</CodePill>. This function will always be run even if <CodePill>search</CodePill> prop has not been provided. Thus you need to make sure to exit early with a value of <CodePill>true</CodePill> if filter should not be applied.</>}>
      <DataTable
        headers={headers}
        items={nutritionDesserts}
        search={search}
        customFilter={(value, term) => typeof value === "string" && value.toUpperCase().includes(term)}
        itemFilter={(item) => !maxCalories || Number(item.calories) < maxCalories}
        top={<TextField value={search} onChange={(event) => setSearch(event.target.value)} label="Search (UPPER CASE ONLY)" variant="standard" sx={{ mx: 4, my: 1.5, width: "calc(100% - 64px)" }} />}
        bodyAppendNode={<TableRow><TableCell /><TableCell><TextField value={calories} onChange={(event) => setCalories(event.target.value)} type="number" label="Less than" variant="standard" /></TableCell><TableCell colSpan={4} /></TableRow>}
        elevation
      />
    </ExampleBlock>
  );
}

function PaginateExample() {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const pageCount = Math.max(1, Math.ceil(nutritionDesserts.length / Math.max(1, itemsPerPage)));
  return (
    <ExampleBlock title="External pagination" source="intermediate/paginate" description="Pagination can be controlled externally by using the individual props, or by using the options prop. Remember that you must apply the .sync modifier.">
      <DataTable headers={nutritionHeaders} items={nutritionDesserts} page={page} onPage={setPage} itemsPerPage={itemsPerPage} hideDefaultFooter elevation />
      <Box sx={{ textAlign: "center", pt: 2 }}>
        <PaginationControl page={page} pageCount={pageCount} onPage={setPage} />
        <TextField value={itemsPerPage} onChange={(event) => setItemsPerPage(parseInt(event.target.value, 10) || -1)} label="Items per page" type="number" inputProps={{ min: -1, max: 15 }} variant="standard" sx={{ mt: 1, width: 180 }} />
      </Box>
    </ExampleBlock>
  );
}

function SortExample() {
  const [sortBy, setSortBy] = useState("fat");
  const [sortDesc, setSortDesc] = useState(false);
  const nextSort = () => {
    const index = sortableNutritionHeaders.findIndex((header) => header.value === sortBy);
    setSortBy(sortableNutritionHeaders[(index + 1) % sortableNutritionHeaders.length].value);
  };
  return (
    <ExampleBlock title="External sorting" source="intermediate/sort" description="Sorting can also be controlled externally by using the individual props, or by using the the options prop. Remember that you must apply the .sync modifier.">
      <DataTable headers={sortableNutritionHeaders} items={nutritionDesserts} sortBy={sortBy} sortDesc={sortDesc} onSort={(value, desc) => { setSortBy(String(value)); setSortDesc(Array.isArray(desc) ? Boolean(desc[0]) : desc); }} elevation />
      <Box sx={{ textAlign: "center", pt: 2 }}>
        <VButton onClick={() => setSortDesc((value) => !value)} sx={{ mr: 2 }}>Toggle sort order</VButton>
        <VButton onClick={nextSort}>Sort next column</VButton>
      </Box>
    </ExampleBlock>
  );
}

function ServerExample() {
  const [options, setOptions] = useState({ page: 1, itemsPerPage: 10, sortBy: [] as string[], sortDesc: [] as boolean[] });
  const [serverRows, setServerRows] = useState<Dessert[]>([]);
  const [totalDesserts, setTotalDesserts] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => {
      let items = [...nutritionDesserts];
      const total = items.length;
      const { sortBy, sortDesc, page, itemsPerPage } = options;
      if (sortBy.length === 1 && sortDesc.length === 1) {
        items.sort((a, b) => {
          const sortA = a[sortBy[0] as keyof Dessert] ?? "";
          const sortB = b[sortBy[0] as keyof Dessert] ?? "";
          if (sortDesc[0]) {
            if (sortA < sortB) return 1;
            if (sortA > sortB) return -1;
            return 0;
          }
          if (sortA < sortB) return -1;
          if (sortA > sortB) return 1;
          return 0;
        });
      }
      if (itemsPerPage > 0) items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
      setServerRows(items);
      setTotalDesserts(total);
      setLoading(false);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [options]);
  return (
    <ExampleBlock title="Paginate and sort server-side" source="intermediate/server" description={<>If you're loading data already paginated and sorted from a backend, you can use the <CodePill>server-items-length</CodePill> prop. Defining this prop will disable the built-in sorting and pagination, and you will instead need to use the available events (<CodePill>update:page</CodePill>, <CodePill>update:sortBy</CodePill>, <CodePill>update:options</CodePill>, etc) to know when to request new pages from your backend. Use the <CodePill>loading</CodePill> prop to display a progress bar while fetching data.</>}>
      <DataTable
        headers={nutritionHeaders}
        items={serverRows}
        page={options.page}
        onPage={(page) => setOptions((current) => ({ ...current, page }))}
        itemsPerPage={options.itemsPerPage}
        onItemsPerPage={(itemsPerPage) => setOptions((current) => ({ ...current, page: 1, itemsPerPage }))}
        sortBy={options.sortBy}
        sortDesc={options.sortDesc}
        onSort={(value, desc) => setOptions((current) => ({ ...current, sortBy: Array.isArray(value) ? value : value ? [String(value)] : [], sortDesc: Array.isArray(desc) ? desc : value ? [Boolean(desc)] : [] }))}
        serverMode
        loading={loading}
        serverItemsLength={totalDesserts}
        elevation
      />
    </ExampleBlock>
  );
}

function EditDialogExample() {
  const [rows, setRows] = useState(nutritionDesserts.map((item) => ({ ...item })));
  const [editing, setEditing] = useState<{ index: number; field: "name" | "iron"; value: string; large?: boolean } | null>(null);
  const [snack, setSnack] = useState<{ open: boolean; color: string; text: string }>({ open: false, color: "", text: "" });
  const openEditor = (index: number, field: "name" | "iron", large = false) => {
    setEditing({ index, field, value: String(rows[index][field] || ""), large });
    setSnack({ open: true, color: "#2196f3", text: "Dialog opened" });
  };
  const save = () => {
    if (editing) setRows((current) => current.map((row, index) => index === editing.index ? { ...row, [editing.field]: editing.value } : row));
    setEditing(null);
    setSnack({ open: true, color: "#4caf50", text: "Data saved" });
  };
  const cancel = () => {
    setEditing(null);
    setSnack({ open: true, color: "#f44336", text: "Canceled" });
  };
  return (
    <ExampleBlock title="Content Editing" source="complex/edit-dialog" description={<>The <CodePill>v-edit-dialog</CodePill> component can be used for editing data directly within a <CodePill>v-data-table</CodePill>. You can block the closing of the <CodePill>v-edit-dialog</CodePill> when clicked outside by adding the <strong>persistent</strong> prop.</>}>
      <DataTable headers={nutritionHeaders} items={rows} hideDefaultFooter cellRenderers={{ name: (item, index) => <Box onClick={() => openEditor(index, "name")} sx={{ cursor: "pointer" }}>{item.name}</Box>, iron: (item, index) => <Box onClick={() => openEditor(index, "iron", true)} sx={{ cursor: "pointer" }}>{item.iron}</Box> }} />
      <Dialog open={!!editing} onClose={editing?.large ? undefined : cancel} maxWidth="xs" fullWidth>
        {editing?.large ? <DialogTitle>Update Iron</DialogTitle> : null}
        <DialogContent sx={{ pt: 2 }}>
          <TextField autoFocus label="Edit" value={editing?.value || ""} onChange={(event) => setEditing((current) => current ? { ...current, value: event.target.value } : current)} variant="standard" fullWidth inputProps={{ maxLength: 25 }} helperText={`${(editing?.value || "").length} / 25`} />
        </DialogContent>
        {editing?.large ? <DialogActions><Button onClick={cancel}>Cancel</Button><Button onClick={save}>Save</Button></DialogActions> : null}
      </Dialog>
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack((current) => ({ ...current, open: false }))} message={snack.text} action={<Button color="inherit" onClick={() => setSnack((current) => ({ ...current, open: false }))}>Close</Button>} ContentProps={{ sx: { bgcolor: snack.color || undefined } }} />
    </ExampleBlock>
  );
}

function CrudExample() {
  const base = nutritionDesserts.map(({ iron, ...item }) => item);
  const [rows, setRows] = useState<Dessert[]>(base);
  const [dialog, setDialog] = useState(false);
  const [editedIndex, setEditedIndex] = useState(-1);
  const [editedItem, setEditedItem] = useState<Dessert>({ name: "", calories: 0, fat: 0, carbs: 0, protein: 0 });
  const editItem = (item: Dessert, index: number) => {
    setEditedIndex(index);
    setEditedItem({ ...item });
    setDialog(true);
  };
  const save = () => {
    setRows((current) => editedIndex > -1 ? current.map((row, index) => index === editedIndex ? editedItem : row) : [...current, editedItem]);
    setDialog(false);
    setEditedIndex(-1);
    setEditedItem({ name: "", calories: 0, fat: 0, carbs: 0, protein: 0 });
  };
  const headers: Header[] = [
    { text: "Dessert (100g serving)", align: "start", sortable: false, value: "name" },
    { text: "Calories", value: "calories" },
    { text: "Fat (g)", value: "fat" },
    { text: "Carbs (g)", value: "carbs" },
    { text: "Protein (g)", value: "protein" },
    { text: "Actions", value: "actions", sortable: false },
  ];
  return (
    <ExampleBlock title="CRUD Actions" source="complex/crud" description={<><CodePill>v-data-table</CodePill> with CRUD actions using a <CodePill>v-dialog</CodePill> component for editing each row</>}>
      <DataTable
        headers={headers}
        items={rows}
        sortBy="calories"
        top={<Toolbar sx={{ bgcolor: "#fff", minHeight: 64 }}><Typography sx={{ fontSize: 20 }}>My CRUD</Typography><Divider orientation="vertical" flexItem sx={{ mx: 4 }} /><Box sx={{ flexGrow: 1 }} /><VButton onClick={() => { setEditedIndex(-1); setEditedItem({ name: "", calories: 0, fat: 0, carbs: 0, protein: 0 }); setDialog(true); }}>New Item</VButton></Toolbar>}
        cellRenderers={{
          actions: (item, index) => <Box><IconButton size="small" onClick={() => editItem(item, index)}><VIcon name="mdi-pencil" size={18} /></IconButton><IconButton size="small" onClick={() => setRows((current) => current.filter((_, rowIndex) => rowIndex !== index))}><VIcon name="mdi-delete" size={18} /></IconButton></Box>,
        }}
        noDataText={<VButton onClick={() => setRows(base)}>Reset</VButton>}
        elevation
      />
      <Dialog open={dialog} onClose={() => setDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editedIndex === -1 ? "New Item" : "Edit Item"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexWrap: "wrap", mx: -1.5 }}>
            {(["name", "calories", "fat", "carbs", "protein"] as const).map((field) => (
              <Box key={field} sx={{ boxSizing: "border-box", flexBasis: { xs: "100%", sm: "50%", md: "33.333%" }, maxWidth: { xs: "100%", sm: "50%", md: "33.333%" }, px: 1.5 }}>
                <TextField label={field === "name" ? "Dessert name" : field === "fat" ? "Fat (g)" : field === "carbs" ? "Carbs (g)" : field === "protein" ? "Protein (g)" : "Calories"} value={editedItem[field] ?? ""} onChange={(event) => setEditedItem((current) => ({ ...current, [field]: field === "name" ? event.target.value : Number(event.target.value) }))} variant="standard" fullWidth />
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions><Button onClick={() => setDialog(false)} sx={{ color: blueDark1 }}>Cancel</Button><Button onClick={save} sx={{ color: blueDark1 }}>Save</Button></DialogActions>
      </Dialog>
    </ExampleBlock>
  );
}

type DataTableProps = {
  headers: Header[];
  items: Dessert[];
  itemsPerPage?: number;
  page?: number;
  onPage?: (page: number) => void;
  sortBy?: string | string[];
  sortDesc?: boolean | boolean[];
  onSort?: (sortBy: string | string[], sortDesc: boolean | boolean[]) => void;
  multiSort?: boolean;
  mustSort?: boolean;
  search?: string;
  customFilter?: (value: unknown, search: string, item: Dessert) => boolean;
  itemFilter?: (item: Dessert) => boolean;
  hideDefaultHeader?: boolean;
  hideDefaultFooter?: boolean;
  disableSort?: boolean;
  disablePagination?: boolean;
  disableFiltering?: boolean;
  dense?: boolean;
  loading?: boolean;
  loadingText?: string;
  showSelect?: boolean;
  singleSelect?: boolean;
  selected?: string[];
  onSelected?: (selected: string[]) => void;
  showExpand?: boolean;
  singleExpand?: boolean;
  expanded?: string[];
  onExpanded?: (expanded: string[]) => void;
  expandedRender?: (item: Dessert, colspan: number) => ReactNode;
  groupBy?: string;
  showGroupBy?: boolean;
  itemKey?: keyof Dessert;
  top?: ReactNode;
  height?: number;
  elevation?: boolean;
  footerProps?: { showFirstLastPage?: boolean; showCurrentPage?: boolean; firstIcon?: string; lastIcon?: string; prevIcon?: string; nextIcon?: string };
  cellRenderers?: Record<string, (item: Dessert, index: number) => ReactNode>;
  headerRenderers?: Record<string, (header: Header) => ReactNode>;
  bodyAppendNode?: ReactNode;
  bodyPrepend?: string;
  bodyAppend?: string;
  customFooter?: string;
  customHeader?: string;
  bodyMode?: "content";
  noDataText?: ReactNode;
  noResultsText?: ReactNode;
  progressSlot?: boolean;
  headerSelectColor?: string;
  itemSelectColor?: string;
  serverItemsLength?: number;
  serverMode?: boolean;
  onItemsPerPage?: (itemsPerPage: number) => void;
  noOuterRadius?: boolean;
};

function DataTable(props: DataTableProps) {
  const {
    headers,
    items,
    itemsPerPage: initialItemsPerPage = 10,
    page: controlledPage,
    onPage,
    sortBy: initialSortBy = "",
    sortDesc: initialSortDesc = false,
    onSort,
    multiSort = false,
    search = "",
    customFilter,
    itemFilter,
    hideDefaultHeader = false,
    hideDefaultFooter = false,
    disableSort = false,
    disablePagination = false,
    disableFiltering = false,
    dense = false,
    loading = false,
    loadingText = "Loading...",
    showSelect = false,
    singleSelect = false,
    selected,
    onSelected,
    showExpand = false,
    singleExpand = false,
    expanded,
    onExpanded,
    expandedRender,
    groupBy,
    showGroupBy = false,
    itemKey = "name",
    top,
    height,
    elevation = false,
    footerProps = {},
    cellRenderers,
    headerRenderers,
    bodyAppendNode,
    bodyPrepend,
    bodyAppend,
    customFooter,
    customHeader,
    bodyMode,
    noDataText = "No data available",
    noResultsText = "No matching records found",
    progressSlot = false,
    headerSelectColor,
    itemSelectColor,
    serverItemsLength,
    serverMode = false,
    onItemsPerPage,
    noOuterRadius = false,
  } = props;
  const [localPage, setLocalPage] = useState(1);
  const [localItemsPerPage, setLocalItemsPerPage] = useState(initialItemsPerPage);
  const [localSortBy, setLocalSortBy] = useState<string | string[]>(initialSortBy);
  const [localSortDesc, setLocalSortDesc] = useState<boolean | boolean[]>(initialSortDesc);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const page = controlledPage ?? localPage;
  const itemsPerPage = initialItemsPerPage;
  const footerItemsPerPage = controlledPage ? itemsPerPage : localItemsPerPage;
  const sortBy = onSort ? initialSortBy : localSortBy;
  const sortDesc = onSort ? initialSortDesc : localSortDesc;
  const currentSelected = selected || [];
  const currentExpanded = expanded || [];
  const rowHeight = dense ? 32 : 48;
  const headerHeight = dense ? 32 : 48;
  const effectiveHeaders = [
    ...(showSelect ? [{ text: "", value: "data-table-select", sortable: false }] : []),
    ...headers,
    ...(showExpand && !headers.some((header) => header.value === "data-table-expand") ? [{ text: "", value: "data-table-expand", sortable: false }] : []),
  ];
  const filteredItems = useMemo(() => {
    let next = [...items];
    if (!disableFiltering && search) {
      const term = search.toUpperCase();
      next = next.filter((item) => headers.some((header) => {
        if (header.filterable === false) return false;
        const value = item[header.value as keyof Dessert];
        if (customFilter) return customFilter(value, term, item);
        return String(value ?? "").toUpperCase().includes(term);
      }));
    }
    if (itemFilter) next = next.filter(itemFilter);
    return next;
  }, [items, disableFiltering, search, headers, customFilter, itemFilter]);
  const sortedItems = useMemo(() => serverMode ? filteredItems : sortItems(filteredItems, sortBy, sortDesc, disableSort), [filteredItems, sortBy, sortDesc, disableSort, serverMode]);
  const pageCount = footerItemsPerPage < 0 ? 1 : Math.max(1, Math.ceil((serverItemsLength ?? sortedItems.length) / Math.max(1, footerItemsPerPage)));
  const pagedItems = serverMode || disablePagination || footerItemsPerPage < 0 ? sortedItems : sortedItems.slice((page - 1) * footerItemsPerPage, page * footerItemsPerPage);
  const setPage = (next: number) => {
    const value = Math.min(pageCount, Math.max(1, next));
    if (onPage) onPage(value);
    else setLocalPage(value);
  };
  const selectAll = currentSelected.length < pagedItems.length;
  const toggleSelectAll = () => onSelected?.(selectAll ? pagedItems.map((item) => String(item[itemKey])) : []);
  const toggleSelect = (key: string) => onSelected?.(singleSelect ? (currentSelected.includes(key) ? [] : [key]) : currentSelected.includes(key) ? currentSelected.filter((value) => value !== key) : [...currentSelected, key]);
  const toggleExpand = (key: string) => onExpanded?.(singleExpand ? (currentExpanded.includes(key) ? [] : [key]) : currentExpanded.includes(key) ? currentExpanded.filter((value) => value !== key) : [...currentExpanded, key]);
  const grouped = groupBy ? groupRows(pagedItems, groupBy) : [{ key: "", rows: pagedItems }];
  const hasNoResults = filteredItems.length === 0 && items.length > 0;

  const updateSort = (header: Header) => {
    if (disableSort || header.sortable === false || header.value === "data-table-select" || header.value === "data-table-expand") return;
    if (multiSort) {
      const currentBy = Array.isArray(sortBy) ? sortBy : sortBy ? [sortBy] : [];
      const currentDesc = Array.isArray(sortDesc) ? sortDesc : currentBy.map(() => Boolean(sortDesc));
      const index = currentBy.indexOf(header.value);
      const nextBy = index === -1 ? [...currentBy, header.value] : currentBy;
      const nextDesc = index === -1 ? [...currentDesc, false] : currentDesc.map((value, i) => i === index ? !value : value);
      onSort ? onSort(nextBy, nextDesc) : (setLocalSortBy(nextBy), setLocalSortDesc(nextDesc));
    } else {
      const active = sortBy === header.value;
      const nextDesc = active ? !Boolean(sortDesc) : false;
      onSort ? onSort(header.value, nextDesc) : (setLocalSortBy(header.value), setLocalSortDesc(nextDesc));
    }
  };

  return (
    <Card sx={{ bgcolor: "#fff", borderRadius: noOuterRadius ? 0 : 1, boxShadow: elevation ? shadow1 : "none", overflow: "hidden" }}>
      {top}
      <Box sx={{ height, overflowX: "auto", overflowY: height ? "auto" : "hidden", position: "relative" }}>
        {loading && progressSlot ? <Box sx={{ height: 10, bgcolor: "rgba(156,39,176,.16)", overflow: "hidden" }}><Box sx={{ width: "35%", height: "100%", bgcolor: "#9c27b0", animation: "dt-progress 1.1s linear infinite" }} /></Box> : loading ? <Box sx={{ height: 4, bgcolor: "rgba(25,118,210,.16)", overflow: "hidden" }}><Box sx={{ width: "35%", height: "100%", bgcolor: "#1976d2", animation: "dt-progress 1.1s linear infinite" }} /></Box> : null}
        <Box component="table" sx={{ borderSpacing: 0, width: "100%" }}>
          {!hideDefaultHeader && (
            <Box component="thead">
              {customHeader ? <TableRow><TableHeadCell colSpan={effectiveHeaders.length} height={headerHeight}>{customHeader}</TableHeadCell></TableRow> : (
                <TableRow>
                  {effectiveHeaders.map((header) => {
                    const sortMeta = getSortMeta(header.value, sortBy, sortDesc);
                    return (
                    <TableHeadCell key={header.value} height={headerHeight} onClick={() => updateSort(header)} sortable={!disableSort && header.sortable !== false && header.value !== "data-table-select" && header.value !== "data-table-expand"} active={sortMeta.active} desc={sortMeta.desc} sortIndex={sortMeta.index}>
                      {header.value === "data-table-select" ? <SimpleCheckbox checked={currentSelected.length > 0 && currentSelected.length === pagedItems.length} indeterminate={currentSelected.length > 0 && currentSelected.length < pagedItems.length} onClick={toggleSelectAll} color={headerSelectColor} /> : headerRenderers?.[header.value] ? headerRenderers[header.value](header) : header.text}
                      {showGroupBy && header.value !== "data-table-select" ? <Box component="span" sx={{ color: "rgba(0,0,0,.54)", fontSize: 12, ml: 0.75 }}>group</Box> : null}
                    </TableHeadCell>
                    );
                  })}
                </TableRow>
              )}
            </Box>
          )}
          <Box component="tbody">
            {bodyPrepend ? <TableRow><TableCell colSpan={effectiveHeaders.length}>{bodyPrepend}</TableCell></TableRow> : null}
            {loading && items.length === 0 ? <TableRow><TableCell colSpan={Math.max(1, effectiveHeaders.length)} sx={{ textAlign: "center" }}>{loadingText}</TableCell></TableRow> : null}
            {!loading && pagedItems.length === 0 ? <TableRow><TableCell colSpan={Math.max(1, effectiveHeaders.length)} sx={{ color: "rgba(0,0,0,.38)", textAlign: "center" }}>{hasNoResults ? noResultsText : noDataText}</TableCell></TableRow> : null}
            {grouped.map((group) => (
              <FragmentRows key={group.key || "rows"}>
                {groupBy ? <TableRow><TableCell colSpan={effectiveHeaders.length} height={35} sx={{ bgcolor: "rgba(0,0,0,.04)", fontWeight: 500 }}><IconButton size="small" onClick={() => setOpenGroups((current) => ({ ...current, [group.key]: current[group.key] === false }))} sx={{ mr: 0.5 }}><VIcon name={openGroups[group.key] === false ? "mdi-plus" : "mdi-minus"} size={18} /></IconButton>{groupBy}: {group.key}<IconButton size="small" disabled sx={{ ml: 0.5, opacity: 0.35 }}><Box component="span" sx={{ fontSize: 18, lineHeight: 1 }}>x</Box></IconButton></TableCell></TableRow> : null}
                {(groupBy && openGroups[group.key] === false ? [] : group.rows).map((item, index) => {
                  const key = String(item[itemKey]);
                  const open = currentExpanded.includes(key);
                  return (
                    <FragmentRows key={key}>
                      <TableRow selected={currentSelected.includes(key)}>
                        {bodyMode === "content" ? (
                          effectiveHeaders.map((header, cellIndex) => <TableCell key={header.value} height={rowHeight}>{cellIndex === 0 ? item.name : "CONTENT"}</TableCell>)
                        ) : (
                          effectiveHeaders.map((header) => (
                            <TableCell key={header.value} height={rowHeight}>
                              {header.value === "data-table-select" ? <SimpleCheckbox checked={currentSelected.includes(key)} onClick={() => toggleSelect(key)} color={itemSelectColor} /> :
                                header.value === "data-table-expand" ? <IconButton size="small" onClick={() => toggleExpand(key)} sx={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }}><VIcon name="mdi-chevron-down" size={20} /></IconButton> :
                                cellRenderers?.[header.value] ? cellRenderers[header.value](item, index) : String(item[header.value as keyof Dessert] ?? "")}
                            </TableCell>
                          ))
                        )}
                      </TableRow>
                      {open && (expandedRender ? expandedRender(item, effectiveHeaders.length) : <TableRow><TableCell colSpan={effectiveHeaders.length}>More info about {item.name}</TableCell></TableRow>)}
                    </FragmentRows>
                  );
                })}
              </FragmentRows>
            ))}
            {bodyAppend ? <TableRow><TableCell colSpan={effectiveHeaders.length}>{bodyAppend}</TableCell></TableRow> : null}
            {bodyAppendNode}
          </Box>
        </Box>
      </Box>
      {customFooter ? <Box sx={{ p: 2 }}>{customFooter}</Box> : null}
      {!hideDefaultFooter ? <DataFooter page={page} pageCount={pageCount} itemsLength={serverItemsLength ?? sortedItems.length} itemsPerPage={footerItemsPerPage} onItemsPerPage={(value) => { if (onItemsPerPage) onItemsPerPage(value); else { setLocalItemsPerPage(value); setPage(1); } }} onPage={setPage} footerProps={footerProps} disablePagination={disablePagination} /> : null}
      <style>{`@keyframes dt-progress{0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}`}</style>
    </Card>
  );
}

function sortItems(items: Dessert[], sortBy: string | string[], sortDesc: boolean | boolean[], disabled: boolean) {
  if (disabled) return items;
  const fields = Array.isArray(sortBy) ? sortBy : sortBy ? [sortBy] : [];
  const descs = Array.isArray(sortDesc) ? sortDesc : fields.map(() => Boolean(sortDesc));
  if (!fields.length) return items;
  return [...items].sort((a, b) => {
    for (let i = 0; i < fields.length; i += 1) {
      const field = fields[i] as keyof Dessert;
      const av = a[field] ?? "";
      const bv = b[field] ?? "";
      if (av < bv) return descs[i] ? 1 : -1;
      if (av > bv) return descs[i] ? -1 : 1;
    }
    return 0;
  });
}

function getSortMeta(value: string, sortBy: string | string[], sortDesc: boolean | boolean[]) {
  const fields = Array.isArray(sortBy) ? sortBy : sortBy ? [sortBy] : [];
  const descs = Array.isArray(sortDesc) ? sortDesc : fields.map(() => Boolean(sortDesc));
  const index = fields.indexOf(value);
  return { active: index >= 0, desc: Boolean(descs[index]), index: index >= 0 && fields.length > 1 ? index + 1 : undefined };
}

function groupRows(items: Dessert[], field: string) {
  return items.reduce<{ key: string; rows: Dessert[] }[]>((groups, item) => {
    const key = String(item[field as keyof Dessert] ?? "");
    let group = groups.find((entry) => entry.key === key);
    if (!group) {
      group = { key, rows: [] };
      groups.push(group);
    }
    group.rows.push(item);
    return groups;
  }, []);
}

function TableRow({ children, selected = false }: { children: ReactNode; selected?: boolean }) {
  return <Box component="tr" sx={{ bgcolor: selected ? "rgba(0,0,0,.08)" : "transparent", "&:hover td": { bgcolor: "rgba(0,0,0,.04)" } }}>{children}</Box>;
}

function TableHeadCell({ children, height, sortable = false, active = false, desc = false, sortIndex, onClick, colSpan }: { children: ReactNode; height?: number; sortable?: boolean; active?: boolean; desc?: boolean; sortIndex?: number; onClick?: () => void; colSpan?: number }) {
  return (
    <Box
      component="th"
      colSpan={colSpan}
      onClick={onClick}
      sx={{
        borderBottom: `1px solid ${divider}`,
        color: active ? "rgba(0,0,0,.87)" : "rgba(0,0,0,.6)",
        cursor: sortable ? "pointer" : "default",
        fontSize: 12,
        fontWeight: 500,
        height: height || 48,
        p: "0 16px",
        textAlign: "left",
        userSelect: "none",
        whiteSpace: "nowrap",
        "&:hover .dt-sort-icon": { opacity: sortable ? 1 : 0 },
      }}
    >
      <Box component="span" sx={{ alignItems: "center", display: "inline-flex", gap: 0.5 }}>
        {children}
        {sortable ? <Box className="dt-sort-icon" component="span" sx={{ display: "inline-flex", opacity: active ? 1 : 0, transform: desc ? "rotate(-180deg)" : "none", transition: ".3s cubic-bezier(.25,.8,.5,1)" }}><VIcon name="mdi-chevron-down" size={16} /></Box> : null}
        {sortIndex ? <Box component="span" sx={{ alignItems: "center", bgcolor: "rgba(0,0,0,.12)", borderRadius: "50%", display: "inline-flex", fontSize: 11, height: 18, justifyContent: "center", minWidth: 18 }}>{sortIndex}</Box> : null}
      </Box>
    </Box>
  );
}

function TableCell({ children, height = 48, colSpan, sx = {} }: { children?: ReactNode; height?: number; colSpan?: number; sx?: object }) {
  return <Box component="td" colSpan={colSpan} sx={{ borderBottom: `1px solid ${divider}`, fontSize: 14, height, p: "0 16px", whiteSpace: "nowrap", ...sx }}>{children}</Box>;
}

function DataFooter({ page, pageCount, itemsLength, itemsPerPage, onItemsPerPage, onPage, footerProps, disablePagination }: { page: number; pageCount: number; itemsLength: number; itemsPerPage: number; onItemsPerPage: (value: number) => void; onPage: (page: number) => void; footerProps: NonNullable<DataTableProps["footerProps"]>; disablePagination?: boolean }) {
  const start = itemsLength === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const stop = itemsPerPage < 0 ? itemsLength : Math.min(itemsLength, page * itemsPerPage);
  return (
    <Box sx={{ alignItems: "center", borderTop: `1px solid ${divider}`, display: "flex", flexWrap: "wrap", fontSize: 12, justifyContent: "flex-end", minHeight: 52, px: 1 }}>
      <Box sx={{ alignItems: "center", display: "flex", mr: 1.75, whiteSpace: "nowrap" }}>
        Rows per page:
        <Select value={itemsPerPage} onChange={(event) => onItemsPerPage(Number(event.target.value))} variant="standard" disableUnderline sx={{ ml: 1, minWidth: 52, fontSize: 12 }}>
          {[5, 10, 15, -1].map((value) => <MenuItem key={value} value={value}>{value === -1 ? "All" : value}</MenuItem>)}
        </Select>
      </Box>
      <Box sx={{ mx: "32px", minWidth: 80, textAlign: "center" }}>{footerProps.showCurrentPage ? `${page} / ${pageCount}` : `${start}-${stop} of ${itemsLength}`}</Box>
      {footerProps.showFirstLastPage ? <IconButton disabled={disablePagination || page <= 1} onClick={() => onPage(1)}><VIcon name={footerProps.firstIcon || "mdi-arrow-collapse-left"} /></IconButton> : null}
      <IconButton disabled={disablePagination || page <= 1} onClick={() => onPage(page - 1)}><VIcon name={footerProps.prevIcon || "mdi-chevron-left"} /></IconButton>
      <IconButton disabled={disablePagination || page >= pageCount} onClick={() => onPage(page + 1)}><VIcon name={footerProps.nextIcon || "mdi-chevron-right"} /></IconButton>
      {footerProps.showFirstLastPage ? <IconButton disabled={disablePagination || page >= pageCount} onClick={() => onPage(pageCount)}><VIcon name={footerProps.lastIcon || "mdi-arrow-collapse-right"} /></IconButton> : null}
    </Box>
  );
}

function FragmentRows({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function SimpleCheckbox({ checked, indeterminate = false, disabled = false, onClick, color }: { checked: boolean; indeterminate?: boolean; disabled?: boolean; onClick?: () => void; color?: string }) {
  return (
    <Box component="button" disabled={disabled} onClick={onClick} sx={{ alignItems: "center", bgcolor: "transparent", border: 0, color: disabled ? "rgba(0,0,0,.26)" : color === "purple" ? "#9c27b0" : color === "green" ? "#4caf50" : primary, cursor: disabled ? "default" : "pointer", display: "inline-flex", height: 32, justifyContent: "center", p: 0, width: 32 }}>
      <Box sx={{ alignItems: "center", border: `2px solid ${checked || indeterminate ? "currentColor" : "rgba(0,0,0,.54)"}`, borderRadius: 0.5, display: "flex", height: 18, justifyContent: "center", width: 18 }}>
        {checked ? <Box sx={{ borderBottom: "2px solid currentColor", borderRight: "2px solid currentColor", height: 10, transform: "rotate(45deg) translate(-1px,-1px)", width: 5 }} /> : indeterminate ? <Box sx={{ bgcolor: "currentColor", height: 2, width: 10 }} /> : null}
      </Box>
    </Box>
  );
}

function VuetifySwitch({ checked, onChange, label }: { checked: boolean; onChange: (value: boolean) => void; label: string }) {
  return (
    <Box sx={{ alignItems: "center", display: "inline-flex", minHeight: 48, mx: 2 }}>
      <Switch checked={checked} onChange={(event) => onChange(event.target.checked)} sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: primary }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: primary } }} />
      <Typography sx={{ fontSize: 16 }}>{label}</Typography>
    </Box>
  );
}

function SearchField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <TextField value={value} onChange={(event) => onChange(event.target.value)} label="Search" variant="standard" InputProps={{ endAdornment: <Search sx={{ color: "rgba(0,0,0,.54)", fontSize: 22 }} /> }} sx={{ minWidth: 260 }} />;
}

function VButton({ children, onClick, sx = {} }: { children: ReactNode; onClick: () => void; sx?: object }) {
  return <Button onClick={onClick} variant="contained" sx={{ bgcolor: primary, boxShadow: shadow2, color: "#fff", textTransform: "uppercase", "&:hover": { bgcolor: primary }, ...sx }}>{children}</Button>;
}

function PaginationControl({ page, pageCount, onPage }: { page: number; pageCount: number; onPage: (page: number) => void }) {
  return <Box sx={{ alignItems: "center", display: "inline-flex", gap: 0.5 }}>{Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => <Button key={number} onClick={() => onPage(number)} sx={{ borderRadius: "50%", height: 34, minWidth: 34, p: 0, bgcolor: page === number ? primary : "transparent", color: page === number ? "#fff" : "rgba(0,0,0,.7)" }}>{number}</Button>)}</Box>;
}

function VIcon({ name, size = 24 }: { name: string; size?: number }) {
  const path = mdiPaths[name];
  return path ? <Box component="svg" viewBox="0 0 24 24" sx={{ display: "inline-block", height: size, verticalAlign: "middle", width: size }}><Box component="path" d={path} fill="currentColor" /></Box> : null;
}

function getCaloriesColor(calories: number) {
  if (calories > 400) return "#f44336";
  if (calories > 200) return "#ff9800";
  return "#4caf50";
}

const glutenDesserts: Dessert[] = [
  { ...nutritionDesserts[0], glutenfree: true },
  { ...nutritionDesserts[1], glutenfree: false },
  { ...nutritionDesserts[2], glutenfree: false },
  { ...nutritionDesserts[5], glutenfree: true },
  { ...nutritionDesserts[6], glutenfree: true },
  { ...nutritionDesserts[9], glutenfree: false },
];

const slotNames = ["body", "body.append", "body.prepend", "footer", "header.data-table-select", "header", "progress", "item.data-table-select", "item.<name>", "no-data", "no-results", "top"];

function BaseHeading({ children, id }: { children: ReactNode; id?: string }) {
  return <Typography id={id} component="h2" sx={{ fontSize: 32, lineHeight: 1.2, fontWeight: 400, mb: 2 }}>{children}</Typography>;
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: 0.55, py: 0.18, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function ExampleBlock({ title, description, source, children }: { title?: string; description?: ReactNode; source: ExampleKey; children: ReactNode }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card sx={{ mb: 5, bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
        {title ? <Typography sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>{title}</Typography> : null}
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}><CodeIcon sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit><Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", overflowX: "auto", p: 2 }}><Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box></Box></Collapse>
      <Box sx={{ bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", p: 2, overflow: "visible" }}>
        {description ? <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography> : null}
        <Box data-app="true" sx={{ overflow: "visible" }}>{children}</Box>
      </Box>
    </Card>
  );
}

function exampleIconSx(active: boolean) {
  return { bgcolor: active ? "rgba(0,150,136,.14)" : "transparent", color: active ? primary : "text.secondary", height: 28, width: 28, mx: 0.25 };
}

const sourceTemplates: Record<ExampleKey, string> = Object.fromEntries([
  "usage",
  "simple/select",
  "simple/group",
  "simple/multi-sort",
  "simple/search",
  "simple/headerless",
  "simple/loading",
  "simple/dense",
  "simple/footer-props",
  "simple/filterable-columns",
  "intermediate/slots",
  "intermediate/simple-checkbox",
  "intermediate/expand",
  "intermediate/custom-filter",
  "intermediate/customize-header",
  "intermediate/customize-rows",
  "intermediate/paginate",
  "intermediate/sort",
  "intermediate/server",
  "complex/edit-dialog",
  "complex/crud",
].map((key) => [key, `Source traced from src/demo/examples/data-tables/${key}.vue`])) as Record<ExampleKey, string>;
