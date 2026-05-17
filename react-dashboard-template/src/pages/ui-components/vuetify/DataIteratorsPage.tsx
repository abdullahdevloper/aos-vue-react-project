import { useMemo, useState, type ReactNode } from "react";
import {
  Box,
  Card,
  Collapse,
  Divider,
  IconButton,
  MenuItem,
  Select,
  Switch,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Code, GitHub, InvertColors, Search, TableRows } from "@mui/icons-material";
import {
  mdiArrowDown,
  mdiArrowUp,
  mdiChevronDown,
  mdiChevronLeft,
  mdiChevronRight,
} from "@mdi/js";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const blueDark3 = "#1565c0";
const indigo = "#3f51b5";
const indigoDark5 = "#1a237e";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const shadow2 = "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)";
const shadow6 = "0px 3px 5px -1px rgba(0,0,0,.2), 0px 6px 10px 0px rgba(0,0,0,.14), 0px 1px 18px 0px rgba(0,0,0,.12)";

type ExampleKey = "usage" | "slots" | "expand" | "filter";
type Dessert = {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
  sodium: number;
  calcium: string;
  iron: string;
};

const keys = ["Name", "Calories", "Fat", "Carbs", "Protein", "Sodium", "Calcium", "Iron"];
const detailKeys = keys.filter((key) => key !== "Name");
const desserts: Dessert[] = [
  { name: "Frozen Yogurt", calories: 159, fat: 6.0, carbs: 24, protein: 4.0, sodium: 87, calcium: "14%", iron: "1%" },
  { name: "Ice cream sandwich", calories: 237, fat: 9.0, carbs: 37, protein: 4.3, sodium: 129, calcium: "8%", iron: "1%" },
  { name: "Eclair", calories: 262, fat: 16.0, carbs: 23, protein: 6.0, sodium: 337, calcium: "6%", iron: "7%" },
  { name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3, sodium: 413, calcium: "3%", iron: "8%" },
  { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9, sodium: 327, calcium: "7%", iron: "16%" },
  { name: "Jelly bean", calories: 375, fat: 0.0, carbs: 94, protein: 0.0, sodium: 50, calcium: "0%", iron: "0%" },
  { name: "Lollipop", calories: 392, fat: 0.2, carbs: 98, protein: 0, sodium: 38, calcium: "0%", iron: "2%" },
  { name: "Honeycomb", calories: 408, fat: 3.2, carbs: 87, protein: 6.5, sodium: 562, calcium: "0%", iron: "45%" },
  { name: "Donut", calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: "2%", iron: "22%" },
  { name: "KitKat", calories: 518, fat: 26.0, carbs: 65, protein: 7, sodium: 54, calcium: "12%", iron: "6%" },
];

const mdiPaths: Record<string, string> = {
  "mdi-arrow-down": mdiArrowDown,
  "mdi-arrow-up": mdiArrowUp,
  "mdi-chevron-down": mdiChevronDown,
  "mdi-chevron-left": mdiChevronLeft,
  "mdi-chevron-right": mdiChevronRight,
};

export default function DataIteratorsPage() {
  return (
    <DocPage
      title="DataIterators"
      namespace="Components"
      icon={<TableRows />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Data Iterators" },
      ]}
    >
      <DocText>
        The <CodePill>v-data-iterator</CodePill> component is used for displaying data, and shares a majority of its functionality with the <CodePill>v-data-table</CodePill> component. Features include sorting, searching, pagination, and selection.
      </DocText>
      <Box component="section" sx={{ mb: 5 }}>
        <BaseHeading id="usage">Usage</BaseHeading>
        <DocText>
          The <CodePill>v-data-iterator</CodePill> allows you to customize exactly how to display your data. In this example we are using a grid with cards.
        </DocText>
        <UsagePlayground />
      </Box>
      <Box component="section" id="examples">
        <BaseHeading id="examples">Examples</BaseHeading>
        <ExampleBlock title="Slots" source="slots" description={<>The <CodePill>v-data-iterator</CodePill> has both a header and footer slot for adding extra content.</>}>
          <SlotsExample />
        </ExampleBlock>
        <ExampleBlock title="Expand" source="expand" description={<>The <CodePill>v-data-iterator</CodePill> has internal state for both selection and expansion, just like <CodePill>v-data-table</CodePill>. In this example we use the methods <CodePill>isExpanded</CodePill> and <CodePill>expand</CodePill> available on the default slot.</>}>
          <ExpandExample />
        </ExampleBlock>
        <ExampleBlock title="Filter" source="filter" description="Order, filters and pagination can be controlled externally by using the individual props">
          <FilterExample />
        </ExampleBlock>
      </Box>
    </DocPage>
  );
}

function UsagePlayground() {
  const [disableFiltering, setDisableFiltering] = useState(false);
  const [disablePagination, setDisablePagination] = useState(false);
  const [disableSort, setDisableSort] = useState(false);
  const [hideDefaultFooter, setHideDefaultFooter] = useState(false);

  return (
    <Card sx={{ mb: 6, border: "1px solid rgba(0,0,0,.12)", boxShadow: "none", borderRadius: 1, overflow: "hidden" }}>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Box sx={{ width: { xs: "100%", md: "75%" }, borderRight: { md: "1px solid rgba(0,0,0,.12)" } }}>
          <Box sx={{ bgcolor: "#e0e0e0", minHeight: 48, borderBottom: "1px solid rgba(0,0,0,.12)" }} />
          <Box sx={{ boxSizing: "border-box", height: 300, overflowY: "auto", p: 3, display: "flex", alignItems: "center" }}>
            <UsageGrid disableFiltering={disableFiltering} disablePagination={disablePagination} disableSort={disableSort} hideDefaultFooter={hideDefaultFooter} />
          </Box>
        </Box>
        <Box sx={{ width: { xs: "100%", md: "25%" } }}>
          <Box sx={{ alignItems: "center", bgcolor: "#e0e0e0", display: "flex", height: 48, px: 1.5, borderBottom: "1px solid rgba(0,0,0,.12)" }}>
            <Typography sx={{ fontSize: 20, fontWeight: 400 }}>Options</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Tooltip title="Invert playground colors"><IconButton size="small"><InvertColors fontSize="small" /></IconButton></Tooltip>
          </Box>
          <Box sx={{ maxHeight: 300, overflowY: "auto", py: 1.5 }}>
            <OptionSwitch label="disable-filtering" checked={disableFiltering} onChange={setDisableFiltering} />
            <OptionSwitch label="disable-pagination" checked={disablePagination} onChange={setDisablePagination} />
            <OptionSwitch label="disable-sort" checked={disableSort} onChange={setDisableSort} />
            <OptionSwitch label="hide-default-footer" checked={hideDefaultFooter} onChange={setHideDefaultFooter} />
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

function UsageGrid({ disableFiltering, disablePagination, disableSort, hideDefaultFooter }: { disableFiltering: boolean; disablePagination: boolean; disableSort: boolean; hideDefaultFooter: boolean }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Name");
  const [sortDesc, setSortDesc] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const items = useIteratorItems(desserts, {
    search: disableFiltering ? "" : search,
    sortBy: disableSort ? "" : sortBy,
    sortDesc,
    page: disablePagination ? 1 : page,
    itemsPerPage: disablePagination ? desserts.length : itemsPerPage,
  });
  const pageCount = Math.max(1, Math.ceil(items.filtered.length / itemsPerPage));

  return (
    <VContainer fillHeight>
      <Box sx={{ width: "100%" }}>
        <IteratorToolbar search={search} onSearch={(value) => { setSearch(value); setPage(1); }} sortBy={sortBy} onSortBy={setSortBy} sortDesc={sortDesc} onSortDesc={setSortDesc} />
        <VRow>
          {items.pageItems.map((item) => (
            <VCol key={item.name} cols={12} sm={6}>
              <DessertCard item={item} titleVariant="h5" rowMode="row" />
            </VCol>
          ))}
        </VRow>
        {!hideDefaultFooter && <DataFooter itemsLength={items.filtered.length} page={page} pageCount={pageCount} itemsPerPage={itemsPerPage} options={[4, 8, 12]} onPage={setPage} onItemsPerPage={(value) => { setItemsPerPage(value); setPage(1); }} />}
      </Box>
    </VContainer>
  );
}

function SlotsExample() {
  return (
    <VContainer fluid>
      <FlatToolbar color={indigoDark5} title="This is a header" sx={{ mb: 2 }} />
      <VRow>
        {desserts.slice(0, 4).map((item) => (
          <VCol key={item.name} cols={12} sm={6} md={4} lg={3}>
            <DessertCard item={item} titleVariant="subheading" />
          </VCol>
        ))}
      </VRow>
      <FlatToolbar color={indigo} title="This is a footer" subheading sx={{ mt: 2 }} />
    </VContainer>
  );
}

function ExpandExample() {
  const [singleExpand, setSingleExpand] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const setItemExpanded = (item: Dessert, value: boolean) => {
    setExpanded((current) => {
      const next = singleExpand ? {} : { ...current };
      if (value) next[item.name] = true;
      else delete next[item.name];
      return next;
    });
  };

  return (
    <VContainer fluid>
      <OptionSwitch label="Expand Single Item" checked={singleExpand} onChange={(value) => { setSingleExpand(value); if (value) setExpanded({}); }} plain />
      <VRow>
        {desserts.slice(0, 4).map((item) => {
          const open = !!expanded[item.name];
          return (
            <VCol key={item.name} cols={12} sm={6} md={4} lg={3}>
              <VCard>
                <Box sx={{ alignItems: "center", display: "flex", minHeight: 64, px: 2 }}>
                  <Typography component="h4" sx={{ fontSize: 20, lineHeight: 1.2, fontWeight: 400, m: 0 }}>{item.name}</Typography>
                </Box>
                <OptionSwitch label={open ? "Expanded" : "Closed"} checked={open} onChange={(value) => setItemExpanded(item, value)} sx={{ pl: 2, mt: 0 }} plain />
                <Divider />
                {open && <DenseList item={item} />}
              </VCard>
            </VCol>
          );
        })}
      </VRow>
    </VContainer>
  );
}

function FilterExample() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Name");
  const [sortDesc, setSortDesc] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useIteratorItems(desserts, { search, sortBy, sortDesc, page, itemsPerPage });
  const numberOfPages = Math.max(1, Math.ceil(desserts.length / itemsPerPage));

  return (
    <VContainer fluid>
      <IteratorToolbar search={search} onSearch={(value) => { setSearch(value); setPage(1); }} sortBy={sortBy} onSortBy={setSortBy} sortDesc={sortDesc} onSortDesc={setSortDesc} />
      <VRow>
        {items.pageItems.map((item) => (
          <VCol key={item.name} cols={12} sm={6} md={4} lg={3}>
            <DessertCard item={item} titleVariant="subheading" highlightKey={sortBy} />
          </VCol>
        ))}
      </VRow>
      <Box sx={{ alignItems: "center", display: "flex", flexWrap: "wrap", justifyContent: "center", mt: 2 }}>
        <Typography sx={{ color: "#9e9e9e", fontSize: 16 }}>Items per page</Typography>
        <Box sx={{ position: "relative", ml: 2 }}>
          <TextButton onClick={() => setMenuOpen((open) => !open)}>
            {itemsPerPage}
            <VIcon name="mdi-chevron-down" size={20} />
          </TextButton>
          {menuOpen && (
            <Card sx={{ position: "absolute", left: 0, top: 40, zIndex: 10, minWidth: 96, boxShadow: shadow2 }}>
              {[4, 8, 12].map((number) => (
                <Box key={number} onClick={() => { setItemsPerPage(number); setPage(1); setMenuOpen(false); }} sx={{ cursor: "pointer", minHeight: 48, px: 2, display: "flex", alignItems: "center", "&:hover": { bgcolor: "rgba(0,0,0,.04)" } }}>{number}</Box>
              ))}
            </Card>
          )}
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Typography sx={{ color: "#9e9e9e", fontSize: 16, mr: 4 }}>Page {page} of {numberOfPages}</Typography>
        <FabButton disabled={page <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))}><VIcon name="mdi-chevron-left" /></FabButton>
        <FabButton disabled={page >= numberOfPages} onClick={() => setPage((value) => Math.min(numberOfPages, value + 1))} sx={{ ml: 1 }}><VIcon name="mdi-chevron-right" /></FabButton>
      </Box>
    </VContainer>
  );
}

function IteratorToolbar({ search, onSearch, sortBy, onSortBy, sortDesc, onSortDesc }: { search: string; onSearch: (value: string) => void; sortBy: string; onSortBy: (value: string) => void; sortDesc: boolean; onSortDesc: (value: boolean) => void }) {
  return (
    <Toolbar sx={{ bgcolor: blueDark3, boxShadow: shadow2, color: "#fff", height: 64, minHeight: 64, mb: 1, px: 2 }}>
      <SoloField label="Search" value={search} onChange={onSearch} />
      <Box sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }} />
      <Box sx={{ display: { xs: "none", md: "block" }, mx: 2, width: 210 }}>
        <SoloSelect label="Sort by" value={sortBy} items={keys} onChange={onSortBy} />
      </Box>
      <Box sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }} />
      <Box sx={{ display: { xs: "none", md: "inline-flex" }, borderRadius: 1, overflow: "hidden" }}>
        <ToggleButton active={!sortDesc} onClick={() => onSortDesc(false)}><VIcon name="mdi-arrow-up" /></ToggleButton>
        <ToggleButton active={sortDesc} onClick={() => onSortDesc(true)}><VIcon name="mdi-arrow-down" /></ToggleButton>
      </Box>
    </Toolbar>
  );
}

function DessertCard({ item, titleVariant, highlightKey, rowMode = "dense" }: { item: Dessert; titleVariant: "h5" | "h4" | "subheading"; highlightKey?: string; rowMode?: "dense" | "row" }) {
  const titleSx = titleVariant === "h5" ? { fontSize: "1.25rem", fontWeight: 500, lineHeight: 1.2 } : titleVariant === "h4" ? { fontSize: "1.5rem", fontWeight: 400, lineHeight: 1.2 } : { fontSize: 16, fontWeight: 700, lineHeight: "1.5rem" };
  return (
    <VCard>
      <Box sx={{ alignItems: "center", display: "flex", minHeight: 52, px: 2 }}>
        <Typography component={titleVariant === "h5" ? "h5" : titleVariant === "h4" ? "h4" : "div"} sx={{ ...titleSx, m: 0 }}>{item.name}</Typography>
      </Box>
      <Divider />
      <DenseList item={item} highlightKey={highlightKey} rowMode={rowMode} />
    </VCard>
  );
}

function DenseList({ item, highlightKey, rowMode = "dense" }: { item: Dessert; highlightKey?: string; rowMode?: "dense" | "row" }) {
  return (
    <Box sx={{ py: 1 }}>
      {detailKeys.map((key) => {
        const active = highlightKey === key;
        const value = item[key.toLowerCase() as keyof Dessert];
        return (
          <Box key={key} sx={{ alignItems: "center", display: "flex", minHeight: rowMode === "row" ? 40 : 32, px: 2 }}>
            <Typography sx={{ color: active ? "#2196f3" : "rgba(0,0,0,.87)", flex: 1, fontSize: 16 }}>{key}:</Typography>
            <Typography sx={{ color: active ? "#2196f3" : "rgba(0,0,0,.87)", flex: 1, fontSize: 16, textAlign: "right" }}>{value}</Typography>
          </Box>
        );
      })}
    </Box>
  );
}

function useIteratorItems(items: Dessert[], options: { search: string; sortBy: string; sortDesc: boolean; page: number; itemsPerPage: number }) {
  return useMemo(() => {
    const search = options.search.toLowerCase().trim();
    let filtered = !search ? [...items] : items.filter((item) => Object.values(item).some((value) => String(value).toLowerCase().includes(search)));
    if (options.sortBy) {
      const field = options.sortBy.toLowerCase() as keyof Dessert;
      filtered = filtered.sort((a, b) => {
        const av = a[field];
        const bv = b[field];
        const result = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
        return options.sortDesc ? -result : result;
      });
    }
    const start = (options.page - 1) * options.itemsPerPage;
    return { filtered, pageItems: filtered.slice(start, start + options.itemsPerPage) };
  }, [items, options.itemsPerPage, options.page, options.search, options.sortBy, options.sortDesc]);
}

function DataFooter({ itemsLength, page, pageCount, itemsPerPage, options, onPage, onItemsPerPage, disablePagination = false }: { itemsLength: number; page: number; pageCount: number; itemsPerPage: number; options: number[]; onPage: (page: number) => void; onItemsPerPage: (value: number) => void; disablePagination?: boolean }) {
  const [open, setOpen] = useState(false);
  const pageStart = itemsLength ? (page - 1) * itemsPerPage + 1 : 0;
  const pageStop = Math.min(page * itemsPerPage, itemsLength);
  return (
    <Box sx={{ alignItems: "center", display: "flex", flexWrap: "wrap", justifyContent: "flex-end", fontSize: 12, px: 1, minHeight: 52 }}>
      <Box sx={{ alignItems: "center", display: "flex", mr: 1.75, whiteSpace: "nowrap" }}>
        Rows per page:
        <Box sx={{ position: "relative", ml: 4.25 }}>
          <TextButton onClick={() => setOpen((value) => !value)} disabled={disablePagination}>{itemsPerPage}<VIcon name="mdi-chevron-down" size={18} /></TextButton>
          {open && (
            <Card sx={{ position: "absolute", right: 0, top: 36, zIndex: 10, minWidth: 88, boxShadow: shadow2 }}>
              {options.map((value) => <Box key={value} onClick={() => { onItemsPerPage(value); setOpen(false); }} sx={{ cursor: "pointer", minHeight: 40, px: 2, display: "flex", alignItems: "center", "&:hover": { bgcolor: "rgba(0,0,0,.04)" } }}>{value}</Box>)}
            </Card>
          )}
        </Box>
      </Box>
      <Box sx={{ mx: "32px", minWidth: 80, textAlign: "center" }}>{pageStart}-{pageStop} of {itemsLength}</Box>
      <IconButton disabled={disablePagination || page <= 1} onClick={() => onPage(Math.max(1, page - 1))} sx={{ color: "inherit", mr: "7px" }}><VIcon name="mdi-chevron-left" /></IconButton>
      <IconButton disabled={disablePagination || page >= pageCount} onClick={() => onPage(Math.min(pageCount, page + 1))} sx={{ color: "inherit", ml: "7px" }}><VIcon name="mdi-chevron-right" /></IconButton>
    </Box>
  );
}

function VContainer({ children, fluid = false, fillHeight = false }: { children: ReactNode; fluid?: boolean; fillHeight?: boolean }) {
  return <Box sx={{ boxSizing: "border-box", width: "100%", maxWidth: fluid ? "none" : 1185, mx: "auto", p: 1.5, ...(fillHeight ? { height: "100%" } : {}) }}>{children}</Box>;
}

function VRow({ children }: { children: ReactNode }) {
  return <Box sx={{ display: "flex", flexWrap: "wrap", m: -1.5 }}>{children}</Box>;
}

function VCol({ children, cols, sm, md, lg }: { children: ReactNode; cols: number; sm?: number; md?: number; lg?: number }) {
  return (
    <Box sx={{
      boxSizing: "border-box",
      flexBasis: `${cols / 12 * 100}%`,
      maxWidth: `${cols / 12 * 100}%`,
      p: 1.5,
      ...(sm ? { "@media (min-width:600px)": { flexBasis: `${sm / 12 * 100}%`, maxWidth: `${sm / 12 * 100}%` } } : {}),
      ...(md ? { "@media (min-width:960px)": { flexBasis: `${md / 12 * 100}%`, maxWidth: `${md / 12 * 100}%` } } : {}),
      ...(lg ? { "@media (min-width:1264px)": { flexBasis: `${lg / 12 * 100}%`, maxWidth: `${lg / 12 * 100}%` } } : {}),
    }}>{children}</Box>
  );
}

function VCard({ children }: { children: ReactNode }) {
  return <Card sx={{ bgcolor: "#fff", borderRadius: 1, boxShadow: shadow2, overflow: "hidden" }}>{children}</Card>;
}

function FlatToolbar({ color, title, subheading = false, sx = {} }: { color: string; title: string; subheading?: boolean; sx?: object }) {
  return (
    <Toolbar sx={{ bgcolor: color, boxShadow: "none", color: "#fff", height: 64, minHeight: 64, px: 2, ...sx }}>
      <Typography sx={{ fontSize: subheading ? 16 : 20, fontWeight: 400, lineHeight: "32px" }}>{title}</Typography>
    </Toolbar>
  );
}

function SoloField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <TextField value={value} onChange={(event) => onChange(event.target.value)} placeholder={label} size="small" variant="standard" InputProps={{ disableUnderline: true, startAdornment: <Search sx={{ fontSize: 22, mr: 1, opacity: .85 }} /> }} sx={soloSx} />
  );
}

function SoloSelect({ label, value, items, onChange }: { label: string; value: string; items: string[]; onChange: (value: string) => void }) {
  return (
    <Select value={value} onChange={(event) => onChange(event.target.value)} variant="standard" disableUnderline size="small" displayEmpty sx={soloSx}>
      {items.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
    </Select>
  );
}

function ToggleButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return <IconButton onClick={onClick} sx={{ bgcolor: active ? "#2196f3" : "#1976d2", borderRadius: 0, color: "#fff", height: 44, width: 58, "&:hover": { bgcolor: "#2196f3" } }}>{children}</IconButton>;
}

function OptionSwitch({ label, checked, onChange, plain = false, sx = {} }: { label: string; checked: boolean; onChange: (value: boolean) => void; plain?: boolean; sx?: object }) {
  return (
    <Box sx={{ alignItems: "center", display: "flex", minHeight: plain ? 48 : 56, px: plain ? 0 : 2, ...sx }}>
      <Switch checked={checked} onChange={(event) => onChange(event.target.checked)} sx={{ mr: 1, "& .MuiSwitch-switchBase.Mui-checked": { color: primary }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: primary } }} />
      <Typography sx={{ fontSize: 16, textTransform: plain ? "none" : "capitalize" }}>{label}</Typography>
    </Box>
  );
}

function TextButton({ children, onClick, disabled = false }: { children: ReactNode; onClick: () => void; disabled?: boolean }) {
  return <Box component="button" disabled={disabled} onClick={onClick} sx={{ alignItems: "center", bgcolor: "transparent", border: 0, color: disabled ? "rgba(0,0,0,.26)" : primary, cursor: disabled ? "default" : "pointer", display: "inline-flex", font: "inherit", height: 36, px: 1, textTransform: "uppercase" }}>{children}</Box>;
}

function FabButton({ children, disabled, onClick, sx = {} }: { children: ReactNode; disabled: boolean; onClick: () => void; sx?: object }) {
  return <IconButton disabled={disabled} onClick={onClick} sx={{ bgcolor: disabled ? "rgba(0,0,0,.12)" : blueDark3, boxShadow: disabled ? "none" : shadow6, color: disabled ? "rgba(0,0,0,.26)" : "#fff", height: 56, width: 56, "&:hover": { bgcolor: blueDark3 }, ...sx }}>{children}</IconButton>;
}

function VIcon({ name, size = 24 }: { name: string; size?: number }) {
  const path = mdiPaths[name];
  return path ? <Box component="svg" viewBox="0 0 24 24" sx={{ display: "block", height: size, width: size }}><Box component="path" d={path} fill="currentColor" /></Box> : null;
}

function ExampleBlock({ title, description, source, children }: { title: string; description: ReactNode; source: ExampleKey; children: ReactNode }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card sx={{ mb: 5, bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
        <Typography sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>{title}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit><Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", overflowX: "auto", p: 2 }}><Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box></Box></Collapse>
      <Box sx={{ bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", p: 2, overflow: "visible" }}>
        {description && <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography>}
        <Box data-app="true" sx={{ overflow: "visible" }}>{children}</Box>
      </Box>
    </Card>
  );
}

function BaseHeading({ children, id }: { children: ReactNode; id?: string }) {
  return <Typography id={id} component="h2" sx={{ fontSize: 32, lineHeight: 1.2, fontWeight: 400, mb: 2 }}>{children}</Typography>;
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: 0.55, py: 0.18, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: 0.5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

const soloSx = {
  bgcolor: "rgba(255,255,255,.15)",
  borderRadius: 1,
  color: "#fff",
  minWidth: 180,
  px: 1.5,
  py: 0.5,
  "& .MuiInputBase-root": { color: "#fff" },
  "& input": { color: "#fff" },
  "& input::placeholder": { color: "rgba(255,255,255,.9)", opacity: 1 },
  "& .MuiSvgIcon-root": { color: "#fff" },
};

const sourceTemplates: Record<ExampleKey, string> = {
  usage: "src/demo/usages/data-iterators.vue",
  slots: "src/demo/examples/data-iterators/slots.vue",
  expand: "src/demo/examples/data-iterators/expand.vue",
  filter: "src/demo/examples/data-iterators/filter.vue",
};
