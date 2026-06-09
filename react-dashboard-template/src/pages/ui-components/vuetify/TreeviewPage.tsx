import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from "react";
import {
  Box, Card, Chip, CircularProgress, Collapse, Divider, IconButton,
  Switch, TextField, Toolbar, Tooltip, Typography,
  FormControl, InputLabel, Select, MenuItem,
} from "@mui/material";
import { Code as CodeIcon, GitHub, InvertColors, AccountTree } from "@mui/icons-material";
import {
  mdiMenuRight, mdiMenuDown,
  mdiCheckboxMarked, mdiCheckboxBlankOutline, mdiMinusBox,
  mdiFolder, mdiFolderOpen,
  mdiLanguageHtml5, mdiNodejs, mdiCodeJson, mdiLanguageMarkdown,
  mdiFilePdf, mdiFileImage, mdiFileDocumentOutline, mdiFileExcel,
  mdiHomeVariant, mdiFolderNetwork,
  mdiAccount,
  mdiSilverware, mdiBookmark, mdiBookmarkOutline, mdiBookmarkMinus,
  mdiChevronDown, mdiBeer, mdiContentSave,
  mdiCloseCircleOutline,
} from "@mdi/js";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

// ─── Constants ────────────────────────────────────────────────────────────────

const primary = "#0097A7";
const appBackground = "#F2F3F7";
const textSecondary = "rgba(0,0,0,.6)";
const textPrimary = "rgba(0,0,0,.87)";
const neuInset = "inset -7px -7px 5px #FFFFFF, inset 7px 7px 7px #DDE4EF";
const shadow2 = "0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)";

const VUETIFY_COLORS: Record<string, string> = {
  primary: "#0097A7",
  accent: "#FF4081",
  teal: "#009688",
  red: "#F44336",
  success: "#4CAF50",
  warning: "#FFA000",
  "warning lighten-2": "#FFD54F",
  indigo: "#3F51B5",
  "green darken-1": "#43A047",
  grey: "#9E9E9E",
  white: "#FFFFFF",
};

function resolveColor(c: string): string {
  return VUETIFY_COLORS[c] ?? c;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TreeItem {
  id?: number | string;
  name: string;
  children?: TreeItem[];
  file?: string;
  [key: string]: unknown;
}

interface TreeviewCtxValue {
  openSet: Set<string | number>;
  activeSet: Set<string | number>;
  selectedSet: Set<string | number>;
  loadingSet: Set<string | number>;
  dense: boolean;
  selectable: boolean;
  activatable: boolean;
  hoverable: boolean;
  shaped: boolean;
  rounded: boolean;
  openOnClick: boolean;
  colorVal: string;
  selectedColorVal: string;
  selType: "leaf" | "independent";
  itemKeyField: string;
  itemTextField: string;
  itemDisField: string;
  onIconPath: string;
  offIconPath: string;
  indetermIconPath: string;
  expandIconPath: string;
  prependSlot?: (p: { item: TreeItem; open: boolean }) => ReactNode;
  getKey: (item: TreeItem) => string | number;
  getText: (item: TreeItem) => string;
  isDis: (item: TreeItem) => boolean;
  selState: (item: TreeItem) => "on" | "off" | "indeterminate";
  subtreeMatches: (item: TreeItem) => boolean;
  doToggleOpen: (item: TreeItem) => void;
  doToggleSel: (item: TreeItem) => void;
  doActivate: (item: TreeItem) => void;
}

const TreeviewCtx = createContext<TreeviewCtxValue | null>(null);

// ─── VTreeview ─────────────────────────────────────────────────────────────

interface VTreeviewProps {
  items: TreeItem[];
  dense?: boolean;
  selectable?: boolean;
  selectedColor?: string;
  activatable?: boolean;
  color?: string;
  hoverable?: boolean;
  shaped?: boolean;
  rounded?: boolean;
  openAll?: boolean;
  openOnClick?: boolean;
  itemKey?: string;
  itemText?: string;
  itemDisabled?: string;
  selectionType?: "leaf" | "independent";
  returnObject?: boolean;
  search?: string | null;
  filter?: (item: TreeItem, search: string, textKey: string) => boolean;
  loadChildren?: (item: TreeItem) => Promise<void>;
  expandIcon?: string;
  onIcon?: string;
  offIcon?: string;
  indeterminateIcon?: string;
  value?: (string | number | TreeItem)[];
  open?: (string | number)[];
  active?: (string | number)[];
  onChange?: (v: (string | number | TreeItem)[]) => void;
  onUpdateActive?: (v: (string | number)[]) => void;
  onUpdateOpen?: (v: (string | number)[]) => void;
  prependSlot?: (p: { item: TreeItem; open: boolean }) => ReactNode;
}

function collectAllParentKeys(items: TreeItem[], keyField: string): Set<string | number> {
  const s = new Set<string | number>();
  function walk(list: TreeItem[]) {
    for (const it of list) {
      if (it.children) {
        const k = (it[keyField] as string | number) ?? it.id ?? it.name;
        s.add(k);
        walk(it.children);
      }
    }
  }
  walk(items);
  return s;
}

function collectAllLeaves(item: TreeItem, keyField: string): TreeItem[] {
  if (!item.children || item.children.length === 0) return [item];
  return item.children.flatMap((c) => collectAllLeaves(c, keyField));
}

export function VTreeview({
  items,
  dense = false,
  selectable = false,
  selectedColor = "accent",
  activatable = false,
  color = "primary",
  hoverable = false,
  shaped = false,
  rounded = false,
  openAll = false,
  openOnClick = false,
  itemKey,
  itemText,
  itemDisabled,
  selectionType = "leaf",
  returnObject = false,
  search,
  filter,
  loadChildren,
  expandIcon,
  onIcon,
  offIcon,
  indeterminateIcon,
  value,
  open: openProp,
  active: activeProp,
  onChange,
  onUpdateActive,
  onUpdateOpen,
  prependSlot,
}: VTreeviewProps) {
  const kf = itemKey ?? "id";
  const tf = itemText ?? "name";
  const df = itemDisabled ?? "disabled";

  const getKey = useCallback((it: TreeItem): string | number =>
    ((it[kf] as string | number) ?? it.id ?? it.name), [kf]);
  const getText = useCallback((it: TreeItem): string =>
    String(it[tf] ?? it.name ?? ""), [tf]);
  const isDis = useCallback((it: TreeItem): boolean => !!(it[df]), [df]);

  const [openSet, setOpenSet] = useState<Set<string | number>>(() => {
    if (openAll) return collectAllParentKeys(items, kf);
    if (openProp) return new Set(openProp);
    return new Set();
  });

  const [activeSet, setActiveSet] = useState<Set<string | number>>(
    activeProp ? new Set(activeProp) : new Set()
  );

  const [selectedSet, setSelectedSet] = useState<Set<string | number>>(
    value ? new Set((value as (string | number)[]).map((v) => (typeof v === "object" ? getKey(v as TreeItem) : v))) : new Set()
  );

  const [loadingSet, setLoadingSet] = useState<Set<string | number>>(new Set());

  // Sync controlled props
  useEffect(() => {
    if (openProp) setOpenSet(new Set(openProp));
  }, [openProp]);

  useEffect(() => {
    if (activeProp) setActiveSet(new Set(activeProp));
  }, [activeProp]);

  useEffect(() => {
    if (value !== undefined) {
      const kField = itemKey ?? "id";
      const keys = new Set(
        (value as (string | number | TreeItem)[]).map((v) => {
          if (typeof v === "object" && v !== null) {
            return ((v as TreeItem)[kField] as string | number) ?? (v as TreeItem).id ?? (v as TreeItem).name;
          }
          return v as string | number;
        })
      );
      setSelectedSet(keys);
    }
  }, [value, itemKey]);

  // Selection helpers
  const selState = useCallback((item: TreeItem): "on" | "off" | "indeterminate" => {
    if (selectionType === "independent" || !item.children || item.children.length === 0) {
      return selectedSet.has(getKey(item)) ? "on" : "off";
    }
    const leaves = collectAllLeaves(item, kf);
    const n = leaves.filter((l) => selectedSet.has(getKey(l))).length;
    if (n === 0) return "off";
    if (n === leaves.length) return "on";
    return "indeterminate";
  }, [selectedSet, selectionType, kf, getKey]);

  // Search helper
  const subtreeMatches = useCallback((item: TreeItem): boolean => {
    if (!search) return true;
    const itemMatches = filter
      ? filter(item, search, tf)
      : getText(item).toLowerCase().includes(search.toLowerCase());
    if (itemMatches) return true;
    if (item.children) return item.children.some((c) => subtreeMatches(c));
    return false;
  }, [search, filter, getText, tf]);

  const doToggleOpen = useCallback((item: TreeItem) => {
    const key = getKey(item);
    const wasOpen = openSet.has(key);
    if (wasOpen) {
      setOpenSet((prev) => { const s = new Set(prev); s.delete(key); return s; });
    } else {
      setOpenSet((prev) => { const s = new Set(prev); s.add(key); return s; });
      if (loadChildren && item.children && item.children.length === 0 && !loadingSet.has(key)) {
        setLoadingSet((ps) => new Set([...ps, key]));
        const promise = loadChildren(item);
        if (promise) {
          promise.finally(() =>
            setLoadingSet((ps) => { const s = new Set(ps); s.delete(key); return s; })
          );
        }
      }
    }
    if (onUpdateOpen) {
      const nextOpen = new Set(openSet);
      if (wasOpen) nextOpen.delete(key); else nextOpen.add(key);
      onUpdateOpen([...nextOpen] as (string | number)[]);
    }
  }, [getKey, loadChildren, loadingSet, onUpdateOpen, openSet]);

  const doActivate = useCallback((item: TreeItem) => {
    const key = getKey(item);
    const isCurrentlyActive = activeSet.has(key);
    const next = isCurrentlyActive ? new Set<string | number>() : new Set<string | number>([key]);
    setActiveSet(next);
    if (onUpdateActive) onUpdateActive([...next] as (string | number)[]);
  }, [getKey, activeSet, onUpdateActive]);

  const doToggleSel = useCallback((item: TreeItem) => {
    if (isDis(item)) return;
    const next = new Set(selectedSet);
    if (selectionType === "independent" || !item.children || item.children.length === 0) {
      if (next.has(getKey(item))) next.delete(getKey(item));
      else next.add(getKey(item));
    } else {
      const leaves = collectAllLeaves(item, kf);
      const all = leaves.every((l) => next.has(getKey(l)));
      if (all) leaves.forEach((l) => next.delete(getKey(l)));
      else leaves.forEach((l) => next.add(getKey(l)));
    }
    setSelectedSet(next);
    if (onChange) {
      const arr = returnObject
        ? getAllItemsWithKeys([...next], items, kf, getKey)
        : [...next];
      onChange(arr);
    }
  }, [isDis, selectionType, kf, getKey, items, onChange, returnObject, selectedSet]);

  const colorVal = resolveColor(color);
  const selectedColorVal = resolveColor(selectedColor);

  const ctx: TreeviewCtxValue = useMemo(() => ({
    openSet, activeSet, selectedSet, loadingSet,
    dense, selectable, activatable, hoverable, shaped, rounded, openOnClick,
    colorVal, selectedColorVal, selType: selectionType,
    itemKeyField: kf, itemTextField: tf, itemDisField: df,
    onIconPath: onIcon ? mdiPaths[onIcon] ?? mdiCheckboxMarked : mdiCheckboxMarked,
    offIconPath: offIcon ? mdiPaths[offIcon] ?? mdiCheckboxBlankOutline : mdiCheckboxBlankOutline,
    indetermIconPath: indeterminateIcon ? mdiPaths[indeterminateIcon] ?? mdiMinusBox : mdiMinusBox,
    expandIconPath: expandIcon ? mdiPaths[expandIcon] ?? mdiMenuRight : mdiMenuRight,
    prependSlot,
    getKey, getText, isDis, selState, subtreeMatches,
    doToggleOpen, doToggleSel, doActivate,
  }), [openSet, activeSet, selectedSet, loadingSet, dense, selectable, activatable, hoverable,
    shaped, rounded, openOnClick, colorVal, selectedColorVal, selectionType, kf, tf, df,
    onIcon, offIcon, indeterminateIcon, expandIcon, prependSlot,
    getKey, getText, isDis, selState, subtreeMatches, doToggleOpen, doToggleSel, doActivate]);

  return (
    <TreeviewCtx.Provider value={ctx}>
      <Box>
        {items.filter((it) => subtreeMatches(it)).map((it) => (
          <TreeNode key={String(getKey(it))} item={it} depth={0} />
        ))}
      </Box>
    </TreeviewCtx.Provider>
  );
}

function getAllItemsWithKeys(
  keys: (string | number)[],
  items: TreeItem[],
  kf: string,
  getKey: (it: TreeItem) => string | number
): TreeItem[] {
  const result: TreeItem[] = [];
  const keySet = new Set(keys);
  function walk(list: TreeItem[]) {
    for (const it of list) {
      if (keySet.has(getKey(it))) result.push(it);
      if (it.children) walk(it.children);
    }
  }
  walk(items);
  return result;
}

// ─── MDI icon path registry ────────────────────────────────────────────────

const mdiPaths: Record<string, string> = {
  "mdi-menu-right": mdiMenuRight,
  "mdi-menu-down": mdiMenuDown,
  "mdi-checkbox-marked": mdiCheckboxMarked,
  "mdi-checkbox-blank-outline": mdiCheckboxBlankOutline,
  "mdi-minus-box": mdiMinusBox,
  "mdi-folder": mdiFolder,
  "mdi-folder-open": mdiFolderOpen,
  "mdi-language-html5": mdiLanguageHtml5,
  "mdi-nodejs": mdiNodejs,
  "mdi-json": mdiCodeJson,
  "mdi-markdown": mdiLanguageMarkdown,
  "mdi-file-pdf": mdiFilePdf,
  "mdi-file-image": mdiFileImage,
  "mdi-file-document-outline": mdiFileDocumentOutline,
  "mdi-file-excel": mdiFileExcel,
  "mdi-home-variant": mdiHomeVariant,
  "mdi-folder-network": mdiFolderNetwork,
  "mdi-account": mdiAccount,
  "mdi-silverware": mdiSilverware,
  "mdi-bookmark": mdiBookmark,
  "mdi-bookmark-outline": mdiBookmarkOutline,
  "mdi-bookmark-minus": mdiBookmarkMinus,
  "mdi-chevron-down": mdiChevronDown,
  "mdi-beer": mdiBeer,
  "mdi-content-save": mdiContentSave,
  "mdi-close-circle-outline": mdiCloseCircleOutline,
};

function SvgIcon({ path, size = 20, color }: { path: string; size?: number; color?: string }) {
  return (
    <Box component="svg" viewBox="0 0 24 24"
      sx={{ display: "inline-block", width: size, height: size, fill: color ?? "currentColor", flexShrink: 0, verticalAlign: "middle" }}>
      <path d={path} />
    </Box>
  );
}

// ─── TreeNode ─────────────────────────────────────────────────────────────────

function TreeNode({ item, depth }: { item: TreeItem; depth: number }) {
  const ctx = useContext(TreeviewCtx)!;
  const {
    openSet, activeSet, selectedSet, loadingSet,
    dense, selectable, activatable, hoverable, shaped, rounded, openOnClick,
    colorVal, selectedColorVal,
    onIconPath, offIconPath, indetermIconPath, expandIconPath,
    prependSlot,
    getKey, getText, isDis, selState, subtreeMatches,
    doToggleOpen, doToggleSel, doActivate,
  } = ctx;

  const key = getKey(item);
  const isOpen = openSet.has(key);
  const isActive = activeSet.has(key);
  const isItemDis = isDis(item);
  const hasKids = item.children !== undefined;
  const isLoading = loadingSet.has(key);
  const ss = selectable ? selState(item) : "off";

  const rowH = dense ? 40 : 48;

  let br: string | undefined;
  if (shaped) br = "0 9999px 9999px 0";
  else if (rounded) br = "9999px";

  function handleRowClick(e: React.MouseEvent) {
    if (isItemDis) return;
    e.stopPropagation();
    if (openOnClick && hasKids) {
      doToggleOpen(item);
    } else if (activatable && !openOnClick) {
      doActivate(item);
    } else if (activatable && openOnClick && !hasKids) {
      doActivate(item);
    }
  }

  function handleToggleClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (!isItemDis && hasKids) doToggleOpen(item);
  }

  // Expand icon path — custom or default; rotation always applied (Vuetify CSS applies same rotation to all)
  const expandPath = expandIconPath ?? mdiMenuRight;
  const expandSize = expandIconPath && expandIconPath !== mdiMenuRight ? 18 : 20;

  return (
    <>
      <Box
        onClick={handleRowClick}
        sx={{
          display: "flex",
          alignItems: "center",
          minHeight: rowH,
          position: "relative",
          userSelect: "none",
          cursor: isItemDis ? "default" : ((activatable || openOnClick) ? "pointer" : "default"),
          opacity: isItemDis ? 0.38 : 1,
          borderRadius: br,
          overflow: "hidden",
          bgcolor: isActive ? `${colorVal}1F` : "transparent",
          "&:hover": hoverable
            ? { bgcolor: isActive ? `${colorVal}30` : "rgba(0,0,0,.04)" }
            : {},
        }}
      >
        {/* Level indents */}
        {Array.from({ length: depth }).map((_, i) => (
          <Box key={i} sx={{ width: 24, flexShrink: 0 }} />
        ))}

        {/* Toggle icon zone */}
        <Box
          onClick={handleToggleClick}
          sx={{
            width: 24, flexShrink: 0, display: "flex",
            alignItems: "center", justifyContent: "center",
            cursor: hasKids ? "pointer" : "default",
          }}
        >
          {isLoading && <CircularProgress size={16} sx={{ color: colorVal }} />}
          {!isLoading && hasKids && (
            <Box sx={{
              transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
              display: "flex", alignItems: "center",
            }}>
              <SvgIcon path={expandPath} size={expandSize} color="rgba(0,0,0,.54)" />
            </Box>
          )}
        </Box>

        {/* Checkbox (when selectable) */}
        {selectable && (
          <Box
            onClick={(e) => { e.stopPropagation(); if (!isItemDis) doToggleSel(item); }}
            sx={{ display: "flex", alignItems: "center", mr: 0.5, cursor: "pointer" }}
          >
            <SvgIcon
              path={ss === "on" ? onIconPath : ss === "indeterminate" ? indetermIconPath : offIconPath}
              size={20}
              color={ss === "off" ? "rgba(0,0,0,.54)" : selectedColorVal}
            />
          </Box>
        )}

        {/* Prepend slot */}
        {prependSlot && (
          <Box sx={{ display: "flex", alignItems: "center", mr: 1, color: "rgba(0,0,0,.54)" }}>
            {prependSlot({ item, open: isOpen })}
          </Box>
        )}

        {/* Label */}
        <Box
          sx={{
            flex: "1 0 auto",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: 14,
            fontFamily: "Roboto, sans-serif",
            color: isActive ? colorVal : textPrimary,
            fontWeight: isActive ? 600 : 400,
            py: 0.5,
          }}
        >
          {getText(item)}
        </Box>
      </Box>

      {/* Children */}
      {hasKids && isOpen && (
        <Box>
          {item.children!
            .filter((child) => subtreeMatches(child))
            .map((child) => (
              <TreeNode key={String(getKey(child))} item={child} depth={depth + 1} />
            ))}
        </Box>
      )}
    </>
  );
}

// ─── Standard dataset ─────────────────────────────────────────────────────────

const STANDARD_ITEMS: TreeItem[] = [
  {
    id: 1, name: "Applications :",
    children: [
      { id: 2, name: "Calendar : app" },
      { id: 3, name: "Chrome : app" },
      { id: 4, name: "Webstorm : app" },
    ],
  },
  {
    id: 5, name: "Documents :",
    children: [
      {
        id: 6, name: "vuetify :",
        children: [{ id: 7, name: "src :", children: [{ id: 8, name: "index : ts" }, { id: 9, name: "bootstrap : ts" }] }],
      },
      {
        id: 10, name: "material2 :",
        children: [{ id: 11, name: "src :", children: [{ id: 12, name: "v-btn : ts" }, { id: 13, name: "v-card : ts" }, { id: 14, name: "v-window : ts" }] }],
      },
    ],
  },
  {
    id: 15, name: "Downloads :",
    children: [
      { id: 16, name: "October : pdf" },
      { id: 17, name: "November : pdf" },
      { id: 18, name: "Tutorial : html" },
    ],
  },
  {
    id: 19, name: "Videos :",
    children: [
      {
        id: 20, name: "Tutorials :",
        children: [
          { id: 21, name: "Basic layouts : mp4" },
          { id: 22, name: "Advanced techniques : mp4" },
          { id: 23, name: "All about app : dir" },
        ],
      },
      { id: 24, name: "Intro : mov" },
      { id: 25, name: "Conference introduction : avi" },
    ],
  },
];

// ─── Source templates ──────────────────────────────────────────────────────────

type ExampleKey =
  | "usage" | "playground"
  | "simple/dense" | "simple/selected-color" | "simple/color"
  | "simple/shaped" | "simple/rounded" | "simple/item-disabled"
  | "simple/selection-type" | "simple/selectable" | "simple/activatable"
  | "simple/hoverable" | "simple/open-all"
  | "intermediate/file-explorer"
  | "complex/human-resources" | "complex/directory" | "complex/hotspots";

const sourceTemplates: Record<ExampleKey, string> = {
  "usage": `<template>
  <v-treeview :items="items"></v-treeview>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { id: 1, name: 'Applications :', children: [
          { id: 2, name: 'Calendar : app' },
          { id: 3, name: 'Chrome : app' },
          { id: 4, name: 'Webstorm : app' },
        ]},
        { id: 5, name: 'Documents :', children: [
          { id: 6, name: 'vuetify :', children: [
            { id: 7, name: 'src :', children: [
              { id: 8, name: 'index : ts' },
              { id: 9, name: 'bootstrap : ts' },
            ]},
          ]},
        ]},
        // ...
      ],
    }),
  }
</script>`,

  "playground": `<template>
  <div>
    <v-row justify="space-around">
      <v-switch v-model="dense" label="Dense"></v-switch>
      <v-switch v-model="selectable" label="Selectable"></v-switch>
      <v-switch v-model="activatable" label="Activatable"></v-switch>
      <v-switch v-model="hoverable" label="Hoverable"></v-switch>
      <v-switch v-model="shaped" label="Shaped"></v-switch>
      <v-switch v-model="rounded" label="Rounded"></v-switch>
      <v-switch v-model="openOnClick" label="Open on any item click"></v-switch>
      <v-col cols="12">
        <v-select v-model="selectedColor" :items="selectedColors"
          :disabled="!selectable" label="Selected checkbox color"></v-select>
      </v-col>
      <v-col cols="12">
        <v-select v-model="color" :items="selectedColors"
          :disabled="!activatable" label="Active node color"></v-select>
      </v-col>
    </v-row>
    <v-treeview
      :items="items"
      :dense="dense"
      :selectable="selectable"
      :activatable="activatable"
      :hoverable="hoverable"
      :open-on-click="openOnClick"
      :selected-color="selectedColor"
      :color="color"
      :shaped="shaped"
      :rounded="rounded"
    ></v-treeview>
  </div>
</template>`,

  "simple/dense": `<template>
  <v-treeview dense :items="items"></v-treeview>
</template>`,

  "simple/selected-color": `<template>
  <v-treeview selectable selected-color="red" :items="items"></v-treeview>
</template>`,

  "simple/color": `<template>
  <v-treeview activatable color="warning" :items="items"></v-treeview>
</template>`,

  "simple/shaped": `<template>
  <v-treeview shaped hoverable activatable :items="items"></v-treeview>
</template>`,

  "simple/rounded": `<template>
  <v-treeview rounded hoverable activatable :items="items"></v-treeview>
</template>`,

  "simple/item-disabled": `<template>
  <v-treeview selectable item-disabled="locked" :items="items"></v-treeview>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { id: 1, name: 'Applications :', locked: true, children: [ ... ] },
        { id: 5, name: 'Documents :', children: [
          { id: 6, name: 'vuetify :', children: [
            { id: 7, name: 'src :', locked: true, children: [ ... ] },
          ]},
        ]},
        { id: 15, name: 'Downloads :', children: [
          { id: 16, name: 'October : pdf', locked: true },
          { id: 17, name: 'November : pdf', locked: true },
          { id: 18, name: 'Tutorial : html', locked: true },
        ]},
      ],
    }),
  }
</script>`,

  "simple/selection-type": `<template>
  <v-container>
    <v-select v-model="selectionType" :items="['leaf', 'independent']"
      label="Selection type"></v-select>
    <v-row>
      <v-col>
        <v-treeview
          v-model="selection"
          :items="items"
          :selection-type="selectionType"
          selectable
          return-object
          open-all
        ></v-treeview>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col class="pa-6" cols="6">
        <template v-if="!selection.length">No nodes selected.</template>
        <template v-else>
          <div v-for="node in selection" :key="node.id">{{ node.name }}</div>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>`,

  "simple/selectable": `<template>
  <v-treeview selectable :items="items"></v-treeview>
</template>`,

  "simple/activatable": `<template>
  <v-treeview activatable :items="items"></v-treeview>
</template>`,

  "simple/hoverable": `<template>
  <v-treeview hoverable :items="items"></v-treeview>
</template>`,

  "simple/open-all": `<template>
  <v-treeview open-all :items="items"></v-treeview>
</template>`,

  "intermediate/file-explorer": `<template>
  <v-treeview
    v-model="tree"
    :open="open"
    :items="items"
    activatable
    item-key="name"
    open-on-click
  >
    <template v-slot:prepend="{ item, open }">
      <v-icon v-if="!item.file">
        {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
      </v-icon>
      <v-icon v-else>
        {{ files[item.file] }}
      </v-icon>
    </template>
  </v-treeview>
</template>

<script>
  export default {
    data: () => ({
      open: ['public'],
      files: {
        html: 'mdi-language-html5',
        js: 'mdi-nodejs',
        json: 'mdi-json',
        md: 'mdi-markdown',
        pdf: 'mdi-file-pdf',
        png: 'mdi-file-image',
        txt: 'mdi-file-document-outline',
        xls: 'mdi-file-excel',
      },
      items: [ ... ],
    }),
  }
</script>`,

  "complex/human-resources": `<template>
  <v-card class="mx-auto" max-width="500">
    <v-sheet class="pa-4 primary lighten-2">
      <v-text-field
        v-model="search"
        label="Search Company Directory"
        dark flat solo-inverted hide-details clearable
        clear-icon="mdi-close-circle-outline"
      ></v-text-field>
      <v-checkbox v-model="caseSensitive" dark hide-details
        label="Case sensitive search"></v-checkbox>
    </v-sheet>
    <v-card-text>
      <v-treeview
        :items="items"
        :search="search"
        :filter="filter"
        :open.sync="open"
      >
        <template v-slot:prepend="{ item }">
          <v-icon v-if="item.children"
            v-text="\`mdi-\${item.id === 1 ? 'home-variant' : 'folder-network'}\`"
          ></v-icon>
        </template>
      </v-treeview>
    </v-card-text>
  </v-card>
</template>`,

  "complex/directory": `<template>
  <v-card>
    <v-card-title class="indigo white--text text-h5">User Directory</v-card-title>
    <v-row class="pa-4" justify="space-between">
      <v-col cols="5">
        <v-treeview
          :active.sync="active"
          :items="items"
          :load-children="fetchUsers"
          :open.sync="open"
          activatable
          color="warning"
          open-on-click
          transition
        >
          <template v-slot:prepend="{ item }">
            <v-icon v-if="!item.children">mdi-account</v-icon>
          </template>
        </v-treeview>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col class="d-flex text-center">
        <v-scroll-y-transition mode="out-in">
          <div v-if="!selected" ...>Select a User</div>
          <v-card v-else :key="selected.id" ...>
            <!-- user profile card -->
          </v-card>
        </v-scroll-y-transition>
      </v-col>
    </v-row>
  </v-card>
</template>`,

  "complex/hotspots": `<template>
  <v-card>
    <v-toolbar color="primary" dark flat>
      <v-icon>mdi-silverware</v-icon>
      <v-toolbar-title>Local hotspots</v-toolbar-title>
    </v-toolbar>
    <v-row>
      <v-col>
        <v-card-text>
          <v-treeview
            v-model="tree"
            :load-children="fetch"
            :items="items"
            selected-color="indigo"
            open-on-click selectable return-object
            expand-icon="mdi-chevron-down"
            on-icon="mdi-bookmark"
            off-icon="mdi-bookmark-outline"
            indeterminate-icon="mdi-bookmark-minus"
          ></v-treeview>
        </v-card-text>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="12" md="6">
        <v-card-text>
          <div v-if="tree.length === 0">Select your favorite breweries</div>
          <v-chip v-for="(s, i) in tree" :key="i" color="grey" dark small>
            <v-icon left small>mdi-beer</v-icon>{{ s.name }}
          </v-chip>
        </v-card-text>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn text @click="tree = []">Reset</v-btn>
      <v-spacer></v-spacer>
      <v-btn class="white--text" color="green darken-1" depressed>
        Save<v-icon right>mdi-content-save</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>`,
};

// ─── Shared UI helpers ─────────────────────────────────────────────────────────

function VuetifySwitch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", minHeight: 48, mx: 1 }}>
      <Switch
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        size="small"
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked": { color: primary },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: primary },
        }}
      />
      <Typography sx={{ fontSize: 14 }}>{label}</Typography>
    </Box>
  );
}

function BaseHeading({ children, id }: { children: ReactNode; id?: string }) {
  return <Typography id={id} component="h2" sx={{ fontSize: 32, lineHeight: 1.2, fontWeight: 400, mb: 2 }}>{children}</Typography>;
}

function SectionHeading({ children }: { children: ReactNode }) {
  return <Typography component="h3" sx={{ fontSize: 24, fontWeight: 400, mb: 1 }}>{children}</Typography>;
}

function CodePill({ children }: { children: ReactNode }) {
  return (
    <Box component="code" sx={{ px: 0.55, py: 0.18, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>
      {children}
    </Box>
  );
}

function exampleIconSx(active: boolean) {
  return { bgcolor: active ? "rgba(0,151,167,.14)" : "transparent", color: active ? primary : textSecondary, height: 28, width: 28, mx: 0.25 };
}

function ExampleBlock({ title, description, source, children }: { title?: string; description?: ReactNode; source: ExampleKey; children: ReactNode }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card sx={{ mb: 5, bgcolor: appBackground, boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
        {title ? <Typography sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>{title}</Typography> : null}
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((v) => !v)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((v) => !v)} sx={exampleIconSx(sourceOpen)}><CodeIcon sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", overflowX: "auto", p: 2 }}>
          <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>
            {sourceTemplates[source]}
          </Box>
        </Box>
      </Collapse>
      <Box sx={{ bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.7)" : textSecondary, p: 2, overflow: "visible" }}>
        {description && <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : textSecondary, fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography>}
        <Box data-app="true" sx={{ overflow: "visible" }}>{children}</Box>
      </Box>
    </Card>
  );
}

// ─── Playground ────────────────────────────────────────────────────────────────

const PLAYGROUND_COLORS = ["accent", "teal", "red", "success", "warning lighten-2"];

function PlaygroundExample() {
  const [dense, setDense] = useState(false);
  const [selectable, setSelectable] = useState(false);
  const [activatable, setActivatable] = useState(false);
  const [hoverable, setHoverable] = useState(false);
  const [shaped, setShaped] = useState(false);
  const [rounded, setRounded] = useState(false);
  const [openOnClick, setOpenOnClick] = useState(false);
  const [selectedColor, setSelectedColor] = useState("accent");
  const [color, setColor] = useState("primary");

  return (
    <Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", mb: 2 }}>
        <VuetifySwitch checked={dense} onChange={setDense} label="Dense" />
        <VuetifySwitch checked={selectable} onChange={setSelectable} label="Selectable" />
        <VuetifySwitch checked={activatable} onChange={setActivatable} label="Activatable" />
        <VuetifySwitch checked={hoverable} onChange={setHoverable} label="Hoverable" />
        <VuetifySwitch checked={shaped} onChange={setShaped} label="Shaped" />
        <VuetifySwitch checked={rounded} onChange={setRounded} label="Rounded" />
        <VuetifySwitch checked={openOnClick} onChange={setOpenOnClick} label="Open on any item click" />
      </Box>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl size="small" sx={{ minWidth: 220 }} disabled={!selectable}>
          <InputLabel>Selected checkbox color</InputLabel>
          <Select value={selectedColor} label="Selected checkbox color" onChange={(e) => setSelectedColor(e.target.value)}>
            {PLAYGROUND_COLORS.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 220 }} disabled={!activatable}>
          <InputLabel>Active node color</InputLabel>
          <Select value={color} label="Active node color" onChange={(e) => setColor(e.target.value)}>
            {PLAYGROUND_COLORS.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
      <VTreeview
        items={STANDARD_ITEMS}
        dense={dense}
        selectable={selectable}
        activatable={activatable}
        hoverable={hoverable}
        shaped={shaped}
        rounded={rounded}
        openOnClick={openOnClick}
        selectedColor={selectedColor}
        color={color}
      />
    </Box>
  );
}

// ─── Simple examples ───────────────────────────────────────────────────────────

function DenseExample() {
  return (
    <ExampleBlock title="Dense mode" source="simple/dense"
      description="Dense mode provides more compact layout with decreased heights of the items.">
      <VTreeview items={STANDARD_ITEMS} dense />
    </ExampleBlock>
  );
}

function SelectedColorExample() {
  return (
    <ExampleBlock title="Checkbox color" source="simple/selected-color"
      description="You can control the color of the selected node checkbox.">
      <VTreeview items={STANDARD_ITEMS} selectable selectedColor="red" />
    </ExampleBlock>
  );
}

function ColorExample() {
  return (
    <ExampleBlock title="Color" source="simple/color"
      description="You can control the text and background color of the active treeview node.">
      <VTreeview items={STANDARD_ITEMS} activatable color="warning" />
    </ExampleBlock>
  );
}

function ShapedExample() {
  return (
    <ExampleBlock title="Shaped" source="simple/shaped"
      description={<>Shaped treeview's have rounded borders on one side of the nodes.</>}>
      <VTreeview items={STANDARD_ITEMS} shaped hoverable activatable />
    </ExampleBlock>
  );
}

function RoundedExample() {
  return (
    <ExampleBlock title="Rounded" source="simple/rounded"
      description="You can make treeview nodes rounded.">
      <VTreeview items={STANDARD_ITEMS} rounded hoverable activatable />
    </ExampleBlock>
  );
}

const ITEM_DISABLED_ITEMS: TreeItem[] = [
  {
    id: 1, name: "Applications :", locked: true,
    children: [
      { id: 2, name: "Calendar : app" },
      { id: 3, name: "Chrome : app" },
      { id: 4, name: "Webstorm : app" },
    ],
  },
  {
    id: 5, name: "Documents :",
    children: [
      {
        id: 6, name: "vuetify :",
        children: [{ id: 7, name: "src :", locked: true, children: [{ id: 8, name: "index : ts" }, { id: 9, name: "bootstrap : ts" }] }],
      },
      {
        id: 10, name: "material2 :",
        children: [{ id: 11, name: "src :", children: [{ id: 12, name: "v-btn : ts" }, { id: 13, name: "v-card : ts" }, { id: 14, name: "v-window : ts" }] }],
      },
    ],
  },
  {
    id: 15, name: "Downloads :",
    children: [
      { id: 16, name: "October : pdf", locked: true },
      { id: 17, name: "November : pdf", locked: true },
      { id: 18, name: "Tutorial : html", locked: true },
    ],
  },
  {
    id: 19, name: "Videos :",
    children: [
      {
        id: 20, name: "Tutorials :",
        children: [
          { id: 21, name: "Basic layouts : mp4" },
          { id: 22, name: "Advanced techniques : mp4" },
          { id: 23, name: "All about app : dir" },
        ],
      },
      { id: 24, name: "Intro : mov" },
      { id: 25, name: "Conference introduction : avi" },
    ],
  },
];

function ItemDisabledExample() {
  return (
    <ExampleBlock title="Disabling nodes" source="simple/item-disabled"
      description={<>Setting <CodePill>item-disabled</CodePill> prop allows to control which node's property disables the node when set to <CodePill>true</CodePill>.</>}>
      <VTreeview items={ITEM_DISABLED_ITEMS} selectable itemDisabled="locked" />
    </ExampleBlock>
  );
}

const SELECTION_TYPE_ITEMS: TreeItem[] = [
  {
    id: 1, name: "Root",
    children: [
      { id: 2, name: "Child #1" },
      { id: 3, name: "Child #2" },
      {
        id: 4, name: "Child #3",
        children: [
          { id: 5, name: "Grandchild #1" },
          { id: 6, name: "Grandchild #2" },
        ],
      },
    ],
  },
];

function SelectionTypeExample() {
  const [selectionType, setSelectionType] = useState<"leaf" | "independent">("leaf");
  const [selection, setSelection] = useState<TreeItem[]>([]);

  return (
    <ExampleBlock title="Selection type" source="simple/selection-type"
      description={<>Treeview now supports two different selection types. The default type is <CodePill>leaf</CodePill>, which will only include leaf nodes in the v-model array, but will render parent nodes as either partially or fully selected. The alternative mode is <CodePill>independent</CodePill>, which allows one to select parent nodes, but each node is independent of its parent and children.</>}>
      <FormControl size="small" sx={{ mb: 2, minWidth: 200 }}>
        <InputLabel>Selection type</InputLabel>
        <Select value={selectionType} label="Selection type" onChange={(e) => setSelectionType(e.target.value as "leaf" | "independent")}>
          <MenuItem value="leaf">leaf</MenuItem>
          <MenuItem value="independent">independent</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ display: "flex", gap: 0 }}>
        <Box sx={{ flex: 1 }}>
          <VTreeview
            items={SELECTION_TYPE_ITEMS}
            selectable
            returnObject
            openAll
            selectionType={selectionType}
            onChange={(v) => setSelection(v as TreeItem[])}
          />
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ flex: 1, p: 3 }}>
          {selection.length === 0
            ? <Typography sx={{ color: textSecondary }}>No nodes selected.</Typography>
            : selection.map((node) => <Typography key={node.id as number} sx={{ fontSize: 14 }}>{node.name}</Typography>)
          }
        </Box>
      </Box>
    </ExampleBlock>
  );
}

function SelectableExample() {
  return (
    <ExampleBlock title="Selectable" source="simple/selectable"
      description="You can easily select treeview nodes and children.">
      <VTreeview items={STANDARD_ITEMS} selectable />
    </ExampleBlock>
  );
}

function ActivatableExample() {
  return (
    <ExampleBlock title="Activatable" source="simple/activatable"
      description="Treeview nodes can be activated by clicking on them.">
      <VTreeview items={STANDARD_ITEMS} activatable />
    </ExampleBlock>
  );
}

function HoverableExample() {
  return (
    <ExampleBlock title="Hoverable" source="simple/hoverable"
      description="Treeview nodes can have a hover effect.">
      <VTreeview items={STANDARD_ITEMS} hoverable />
    </ExampleBlock>
  );
}

function OpenAllExample() {
  return (
    <ExampleBlock title="Open-all" source="simple/open-all"
      description="Treeview nodes can be pre-opened on page load.">
      <VTreeview items={STANDARD_ITEMS} openAll />
    </ExampleBlock>
  );
}

// ─── File Explorer ─────────────────────────────────────────────────────────────

const FILE_ICONS: Record<string, string> = {
  html: mdiLanguageHtml5,
  js: mdiNodejs,
  json: mdiCodeJson,
  md: mdiLanguageMarkdown,
  pdf: mdiFilePdf,
  png: mdiFileImage,
  txt: mdiFileDocumentOutline,
  xls: mdiFileExcel,
};

const FILE_EXPLORER_ITEMS: TreeItem[] = [
  { name: ".git" },
  { name: "node_modules" },
  {
    name: "public",
    children: [
      { name: "static", children: [{ name: "logo.png", file: "png" }] },
      { name: "favicon.ico", file: "png" },
      { name: "index.html", file: "html" },
    ],
  },
  { name: ".gitignore", file: "txt" },
  { name: "babel.config.js", file: "js" },
  { name: "package.json", file: "json" },
  { name: "README.md", file: "md" },
  { name: "vue.config.js", file: "js" },
  { name: "yarn.lock", file: "txt" },
];

function FileExplorerExample() {
  return (
    <ExampleBlock title="Slots" source="intermediate/file-explorer"
      description={<>Using slots we are able to create an intuitive file explorer. Apart from the <CodePill>prepend</CodePill> slot, there is also one for the <CodePill>label</CodePill>, and an <CodePill>append</CodePill> slot.</>}>
      <VTreeview
        items={FILE_EXPLORER_ITEMS}
        itemKey="name"
        open={["public"]}
        activatable
        openOnClick
        prependSlot={({ item, open }) => (
          item.file
            ? <SvgIcon path={FILE_ICONS[item.file] ?? mdiFileDocumentOutline} size={20} />
            : <SvgIcon path={open ? mdiFolderOpen : mdiFolder} size={20} />
        )}
      />
    </ExampleBlock>
  );
}

// ─── Human Resources (Search) ─────────────────────────────────────────────────

const HR_ITEMS: TreeItem[] = [
  {
    id: 1, name: "Vuetify Human Resources",
    children: [
      { id: 2, name: "Core team", children: [{ id: 201, name: "John" }, { id: 202, name: "Kael" }, { id: 203, name: "Nekosaur" }, { id: 204, name: "Jacek" }, { id: 205, name: "Andrew" }] },
      { id: 3, name: "Administrators", children: [{ id: 301, name: "Ranee" }, { id: 302, name: "Rachel" }] },
      { id: 4, name: "Contributors", children: [{ id: 401, name: "Phlow" }, { id: 402, name: "Brandon" }, { id: 403, name: "Sean" }] },
    ],
  },
];

function HumanResourcesExample() {
  const [search, setSearch] = useState<string | null>(null);
  const [caseSensitive, setCaseSensitive] = useState(false);

  const filter = caseSensitive
    ? (item: TreeItem, s: string, textKey: string) => String(item[textKey] ?? item.name).indexOf(s) > -1
    : undefined;

  return (
    <ExampleBlock title="Searching a directory" source="complex/human-resources"
      description={<>Easily filter your treeview by using the <CodePill>search</CodePill> prop. You can easily apply your custom filtering function if you need case-sensitive or fuzzy filtering by setting the <CodePill>filter</CodePill> prop.</>}>
      <Box sx={{ maxWidth: 500, mx: "auto" }}>
        <Box sx={{ bgcolor: "#80CBC4", p: 2, borderRadius: "4px 4px 0 0" }}>
          <TextField
            value={search ?? ""}
            onChange={(e) => setSearch(e.target.value || null)}
            label="Search Company Directory"
            size="small"
            fullWidth
            variant="filled"
            InputProps={{
              disableUnderline: true,
              endAdornment: search
                ? <Box component="button" onClick={() => setSearch(null)} sx={{ border: "none", bgcolor: "transparent", cursor: "pointer", display: "flex", p: 0 }}>
                    <SvgIcon path={mdiCloseCircleOutline} size={18} color="rgba(255,255,255,.7)" />
                  </Box>
                : null,
            }}
            sx={{ "& .MuiFilledInput-root": { bgcolor: "rgba(255,255,255,.2)", borderRadius: 1 }, input: { color: "#fff" }, label: { color: "rgba(255,255,255,.7)" } }}
          />
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Switch
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              size="small"
              sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: "#fff" }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: "rgba(255,255,255,.5)" } }}
            />
            <Typography sx={{ color: "#fff", fontSize: 14 }}>Case sensitive search</Typography>
          </Box>
        </Box>
        <Box sx={{ p: 2, bgcolor: "#fff", borderRadius: "0 0 4px 4px", boxShadow: shadow2 }}>
          <VTreeview
            items={HR_ITEMS}
            search={search ?? undefined}
            filter={filter}
            open={[1, 2]}
            prependSlot={({ item }) =>
              item.children
                ? <SvgIcon path={item.id === 1 ? mdiHomeVariant : mdiFolderNetwork} size={20} />
                : null
            }
          />
        </Box>
      </Box>
    </ExampleBlock>
  );
}

// ─── Directory (Async) ────────────────────────────────────────────────────────

interface JsonPlaceholderUser {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
  company: { name: string };
}

const AVATAR_PARAMS = [
  "?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban",
  "?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun",
  "?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong",
  "?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair",
  "?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly",
];

function DirectoryExample() {
  const [users, setUsers] = useState<JsonPlaceholderUser[]>([]);
  const [active, setActive] = useState<(string | number)[]>([]);
  const [avatarParam, setAvatarParam] = useState<string | null>(null);

  const items: TreeItem[] = useMemo(() => [{ id: "users-root", name: "Users", children: users as unknown as TreeItem[] }], [users]);

  const selected = active.length > 0
    ? users.find((u) => u.id === active[0])
    : undefined;

  useEffect(() => {
    if (selected) {
      setAvatarParam(AVATAR_PARAMS[Math.floor(Math.random() * AVATAR_PARAMS.length)]);
    }
  }, [selected?.id]);

  const fetchUsers = useCallback(async (item: TreeItem) => {
    await new Promise((r) => setTimeout(r, 1500));
    const data = await fetch("https://jsonplaceholder.typicode.com/users").then((r) => r.json()) as JsonPlaceholderUser[];
    setUsers(data);
    (item.children as TreeItem[]).push(...(data as unknown as TreeItem[]));
  }, []);

  return (
    <ExampleBlock title="Async items" source="complex/directory"
      description={<>You can dynamically load child data by supplying a <em>Promise</em> callback to the <CodePill>load-children</CodePill> prop. This callback will be executed the first time a user tries to expand an item that has a children property that is an empty array.</>}>
      <Box sx={{ boxShadow: shadow2, borderRadius: 1, overflow: "hidden", bgcolor: "#fff" }}>
        <Box sx={{ bgcolor: "#3F51B5", color: "#fff", px: 3, py: 2 }}>
          <Typography sx={{ fontSize: 24, fontWeight: 400 }}>User Directory</Typography>
        </Box>
        <Box sx={{ display: "flex", p: 2, gap: 2 }}>
          <Box sx={{ width: "40%" }}>
            <VTreeview
              items={items}
              active={active}
              onUpdateActive={setActive}
              activatable
              color="warning"
              openOnClick
              loadChildren={fetchUsers}
              prependSlot={({ item }) =>
                !item.children ? <SvgIcon path={mdiAccount} size={20} /> : null
              }
            />
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
            {!selected
              ? <Typography sx={{ color: "rgba(0,0,0,.38)", fontSize: 20, fontWeight: 300 }}>Select a User</Typography>
              : <Box sx={{ textAlign: "center", py: 3 }}>
                  {avatarParam && (
                    <Box component="img" src={`https://avataaars.io/${avatarParam}`}
                      sx={{ width: 88, height: 88, borderRadius: "50%", mb: 2 }} />
                  )}
                  <Typography sx={{ fontSize: 24, fontWeight: 400, mb: 1 }}>{selected.name}</Typography>
                  <Typography sx={{ color: "#1565C0", mb: 0.5 }}>{selected.email}</Typography>
                  <Typography sx={{ color: "#1565C0", fontWeight: 700 }}>{selected.username}</Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ textAlign: "left", display: "grid", gridTemplateColumns: "auto 1fr", gap: 1, fontSize: 14 }}>
                    <Typography sx={{ fontWeight: 700, textAlign: "right", fontSize: 14 }}>Company:</Typography>
                    <Typography sx={{ fontSize: 14 }}>{selected.company.name}</Typography>
                    <Typography sx={{ fontWeight: 700, textAlign: "right", fontSize: 14 }}>Website:</Typography>
                    <Typography component="a" href={`//${selected.website}`} target="_blank" sx={{ fontSize: 14, color: "#1565C0" }}>{selected.website}</Typography>
                    <Typography sx={{ fontWeight: 700, textAlign: "right", fontSize: 14 }}>Phone:</Typography>
                    <Typography sx={{ fontSize: 14 }}>{selected.phone}</Typography>
                  </Box>
                </Box>
            }
          </Box>
        </Box>
      </Box>
    </ExampleBlock>
  );
}

// ─── Hotspots (Custom selectable icons) ───────────────────────────────────────

interface Brewery { id: string; name: string; brewery_type: string }

function HotspotsExample() {
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tree, setTree] = useState<TreeItem[]>([]);

  const types = useMemo(() => {
    const seen = new Set<string>();
    const result: string[] = [];
    for (const b of breweries) {
      if (!seen.has(b.brewery_type)) { seen.add(b.brewery_type); result.push(b.brewery_type); }
    }
    return result.sort();
  }, [breweries]);

  const items: TreeItem[] = useMemo(() => {
    const children = types.map((type) => ({
      id: type,
      name: `${type.charAt(0).toUpperCase()}${type.slice(1)}`,
      children: breweries.filter((b) => b.brewery_type === type).map((b) => ({
        ...b,
        name: `${b.name.charAt(0).toUpperCase()}${b.name.slice(1)}`,
      })) as unknown as TreeItem[],
    }));
    return [{ id: "all", name: "All Breweries", children }];
  }, [types, breweries]);

  const fetchBreweries = useCallback(async (_item: TreeItem) => {
    if (breweries.length) return;
    setIsLoading(true);
    try {
      const data = await fetch("https://api.openbrewerydb.org/breweries").then((r) => r.json()) as Brewery[];
      setBreweries(data);
    } catch {
      /* ignore */
    } finally {
      setIsLoading(false);
    }
  }, [breweries.length]);

  return (
    <ExampleBlock title="Custom selectable icons" source="complex/hotspots"
      description={<>Customize the <strong>on</strong>, <strong>off</strong> and <strong>indeterminate</strong> icons for your selectable tree. Combine with other advanced functionality like API loaded items.</>}>
      <Box sx={{ boxShadow: shadow2, borderRadius: 1, overflow: "hidden", bgcolor: "#fff" }}>
        {/* Toolbar */}
        <Box sx={{ bgcolor: primary, color: "#fff", display: "flex", alignItems: "center", px: 2, minHeight: 56 }}>
          <SvgIcon path={mdiSilverware} size={24} color="#fff" />
          <Typography sx={{ ml: 2, fontSize: 20, fontWeight: 500 }}>Local hotspots</Typography>
        </Box>
        {/* Body */}
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: 1, p: 2 }}>
            {isLoading && <CircularProgress size={24} sx={{ color: primary }} />}
            <VTreeview
              items={items}
              value={tree}
              loadChildren={fetchBreweries}
              selectedColor="indigo"
              openOnClick
              selectable
              returnObject
              expandIcon="mdi-chevron-down"
              onIcon="mdi-bookmark"
              offIcon="mdi-bookmark-outline"
              indeterminateIcon="mdi-bookmark-minus"
              onChange={(v) => setTree(v as TreeItem[])}
            />
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ flex: 1, p: 2 }}>
            {tree.length === 0
              ? <Typography sx={{ color: textSecondary, fontWeight: 300, fontSize: 20, textAlign: "center", pt: 2 }}>Select your favorite breweries</Typography>
              : <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {tree.map((sel, i) => (
                    <Chip
                      key={i}
                      size="small"
                      label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <SvgIcon path={mdiBeer} size={14} color="#fff" />
                          {sel.name}
                        </Box>
                      }
                      sx={{ bgcolor: "#9E9E9E", color: "#fff", fontSize: 12 }}
                    />
                  ))}
                </Box>
            }
          </Box>
        </Box>
        <Divider />
        {/* Actions */}
        <Box sx={{ display: "flex", alignItems: "center", px: 1, py: 0.5 }}>
          <Box
            component="button"
            onClick={() => setTree([])}
            sx={{ border: "none", bgcolor: "transparent", cursor: "pointer", fontSize: 14, px: 2, py: 1, color: textPrimary, fontFamily: "Roboto, sans-serif" }}
          >
            Reset
          </Box>
          <Box sx={{ flex: 1 }} />
          <Box
            component="button"
            sx={{ border: "none", bgcolor: "#388E3C", cursor: "pointer", color: "#fff", fontSize: 14, px: 3, py: 1, borderRadius: 1, display: "flex", alignItems: "center", gap: 0.5, fontFamily: "Roboto, sans-serif" }}
          >
            Save
            <SvgIcon path={mdiContentSave} size={18} color="#fff" />
          </Box>
        </Box>
      </Box>
    </ExampleBlock>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TreeviewPage() {
  return (
    <DocPage
      title="Treeview"
      namespace="Components"
      icon={<AccountTree />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Treeview" },
      ]}
    >
      <DocText>
        The <CodePill>v-treeview</CodePill> component is useful for displaying large amounts of nested data.
      </DocText>

      <Box component="section" sx={{ mb: 5 }}>
        <BaseHeading id="usage">Usage</BaseHeading>
        <ExampleBlock source="usage" description="A basic example">
          <VTreeview items={STANDARD_ITEMS} />
        </ExampleBlock>
      </Box>

      <Box component="section" sx={{ mb: 5 }}>
        <BaseHeading id="playground">Playground</BaseHeading>
        <ExampleBlock source="playground">
          <PlaygroundExample />
        </ExampleBlock>
      </Box>

      <Box component="section" id="examples">
        <BaseHeading id="examples">Examples</BaseHeading>
        <DenseExample />
        <SelectedColorExample />
        <ColorExample />
        <ShapedExample />
        <RoundedExample />
        <ItemDisabledExample />
        <SelectionTypeExample />
        <SelectableExample />
        <ActivatableExample />
        <HoverableExample />
        <OpenAllExample />
        <FileExplorerExample />
        <HumanResourcesExample />
        <DirectoryExample />
        <HotspotsExample />
      </Box>
    </DocPage>
  );
}
