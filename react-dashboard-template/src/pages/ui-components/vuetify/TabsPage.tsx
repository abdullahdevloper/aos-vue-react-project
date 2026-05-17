import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Slider,
  Switch,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Code as CodeIcon, GitHub, InvertColors, Tab as TabIcon } from "@mui/icons-material";
import {
  mdiAccessPoint,
  mdiAccount,
  mdiAccountBox,
  mdiArrowLeftBoldBoxOutline,
  mdiArrowRightBoldBoxOutline,
  mdiDotsVertical,
  mdiHeart,
  mdiLock,
  mdiMagnify,
  mdiMenu,
  mdiMenuDown,
  mdiMicrophone,
  mdiPhone,
} from "@mdi/js";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const deepPurpleAccent4 = "#6200ea";
const tealDark3 = "#00695c";
const cyan = "#00bcd4";
const indigo = "#3f51b5";
const redLight2 = "#e57373";
const basilBg = "#fffbe6";
const basilText = "#356859";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const shadow2 = "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)";
const shadow6 = "0px 3px 5px -1px rgba(0,0,0,.2), 0px 6px 10px 0px rgba(0,0,0,.14), 0px 1px 18px 0px rgba(0,0,0,.12)";
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

type ExampleKey =
  | "usage"
  | "playground"
  | "simple/fixed-tabs"
  | "simple/center-active"
  | "simple/tab-items"
  | "simple/grow"
  | "simple/pagination"
  | "simple/icons"
  | "simple/vertical"
  | "intermediate/icons-and-text"
  | "intermediate/right"
  | "intermediate/content"
  | "intermediate/align-with-title"
  | "intermediate/dynamic"
  | "complex/dynamic-height"
  | "complex/desktop"
  | "complex/overflow-to-menu";

type TabItem = { label: ReactNode; value?: string; icon?: string; content?: ReactNode };

const mdiPaths: Record<string, string> = {
  "mdi-access-point": mdiAccessPoint,
  "mdi-account": mdiAccount,
  "mdi-account-box": mdiAccountBox,
  "mdi-arrow-left-bold-box-outline": mdiArrowLeftBoldBoxOutline,
  "mdi-arrow-right-bold-box-outline": mdiArrowRightBoldBoxOutline,
  "mdi-dots-vertical": mdiDotsVertical,
  "mdi-heart": mdiHeart,
  "mdi-lock": mdiLock,
  "mdi-magnify": mdiMagnify,
  "mdi-menu": mdiMenu,
  "mdi-menu-down": mdiMenuDown,
  "mdi-mic": mdiMicrophone,
  "mdi-phone": mdiPhone,
};

export default function TabsPage() {
  return (
    <DocPage
      title="Tabs"
      namespace="Components"
      icon={<TabIcon />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Tabs" },
      ]}
    >
      <DocText>
        The <CodePill>v-tabs</CodePill> component is used for hiding content behind a selectable item. This can also be used as a pseudo-navigation for a page, where the tabs are links and the tab-items are the content.
      </DocText>
      <Box component="section" sx={{ mb: 5 }}>
        <BaseHeading id="usage">Usage</BaseHeading>
        <ExampleBlock source="usage" description={<>The <CodePill>v-tabs</CodePill> component is a styled extension of <CodePill>v-item-group</CodePill>. It provides an easy to use interface for organizing groups of content.</>}>
          <VTabs tabs={[{ label: "Item One" }, { label: "Item Two" }, { label: "Item Three" }]} />
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
        <ExampleBlock title="Fixed tabs" source="simple/fixed-tabs" description={<>The <strong>fixed-tabs</strong> prop forces <CodePill>v-tab</CodePill> to take up all available space up to the maximum width (300px).</>}>
          <VTabs fixedTabs dark backgroundColor={indigo} tabs={["Option", "Another Selection", "Items", "Another Screen"].map((label) => ({ label }))} />
        </ExampleBlock>
        <ExampleBlock title="Centered active tab" source="simple/center-active" description="Active tab is always centered">
          <Card sx={{ boxShadow: "none" }}><VTabs dark backgroundColor={deepPurpleAccent4} centerActive showArrows tabs={numberWords.map((label) => ({ label }))} /></Card>
        </ExampleBlock>
        <TabItemsExample />
        <GrowExample />
        <ExampleBlock title="Pagination" source="simple/pagination" description={<>If the tab items overflow their container, pagination controls will appear on desktop. For mobile devices, arrows will only display with the <strong>show-arrows</strong> prop.</>}>
          <Card sx={{ boxShadow: "none" }}><VTabs dark backgroundColor={tealDark3} sliderColor="#80cbc4" showArrows tabs={Array.from({ length: 30 }, (_, i) => ({ label: `Item ${i + 1}` }))} /></Card>
        </ExampleBlock>
        <ExampleBlock title="Custom icons" source="simple/icons" description={<><strong>prev-icon</strong> and <strong>next-icon</strong> can be used for applying custom pagination icons.</>}>
          <Box sx={{ boxShadow: shadow6 }}><VTabs dark backgroundColor="#00bcd4" sliderColor="#ffeb3b" showArrows prevIcon="mdi-arrow-left-bold-box-outline" nextIcon="mdi-arrow-right-bold-box-outline" tabs={Array.from({ length: 30 }, (_, i) => ({ label: `Item ${i + 1}` }))} /></Box>
        </ExampleBlock>
        <VerticalExample />
        <IconsAndTextExample />
        <RightExample />
        <ContentExample />
        <AlignWithTitleExample />
        <DynamicExample />
        <DynamicHeightExample />
        <DesktopExample />
        <OverflowMenuExample />
      </Box>
    </DocPage>
  );
}

function PlaygroundExample() {
  const [active, setActive] = useState("tab-1");
  const [icons, setIcons] = useState(false);
  const [centered, setCentered] = useState(false);
  const [grow, setGrow] = useState(false);
  const [vertical, setVertical] = useState(false);
  const [right, setRight] = useState(false);
  const [tabs, setTabs] = useState(3);
  const items = Array.from({ length: tabs }, (_, index) => ({ label: `Tab ${index + 1}`, icon: icons ? "mdi-phone" : undefined, value: `tab-${index + 1}`, content: lorem }));
  return (
    <Box>
      <Box sx={{ alignItems: "center", display: "flex", flexWrap: "wrap", justifyContent: "space-around", mb: 2 }}>
        <VuetifySwitch checked={icons} onChange={setIcons} label="Text + icons" />
        <VuetifySwitch checked={centered} onChange={setCentered} label="Centered" disabled={vertical} />
        <VuetifySwitch checked={grow} onChange={setGrow} label="Grow" />
        <VuetifySwitch checked={vertical} onChange={setVertical} label="Vertical" />
        <VuetifySwitch checked={right} onChange={setRight} label="Right" />
        <Box sx={{ flexBasis: "100%", px: 1.5 }}>
          <Typography sx={{ fontSize: 14, color: "text.secondary" }}>Tabs number</Typography>
          <Slider value={tabs} min={0} max={10} onChange={(_, value) => { setTabs(value as number); setActive("tab-1"); }} sx={{ color: primary }} />
        </Box>
      </Box>
      <VTabs value={active} onChange={setActive} dark backgroundColor={deepPurpleAccent4} elevation iconsAndText={icons} centered={centered} grow={grow} vertical={vertical} right={right} tabs={items} withItems />
    </Box>
  );
}

function TabItemsExample() {
  const [tab, setTab] = useState("0");
  const items = Array.from({ length: 10 }, (_, i) => ({ label: numberWords[i], value: String(i), content: `Tab ${i + 1} Content` }));
  return (
    <ExampleBlock title="Tab Items" source="simple/tab-items" description={<>The <CodePill>v-tabs-items</CodePill> component allows for you to customize the content per tab. Using a shared <CodePill>v-model</CodePill>, the <CodePill>v-tabs-items</CodePill> will sync with the currently selected <CodePill>v-tab</CodePill>.</>}>
      <Card sx={{ boxShadow: "none" }}><VTabs value={tab} onChange={setTab} dark backgroundColor={primary} tabs={items} withItems /></Card>
    </ExampleBlock>
  );
}

function GrowExample() {
  const [tab, setTab] = useState("0");
  const items = ["Appetizers", "Entrees", "Deserts", "Cocktails"].map((label, index) => ({ label, value: String(index), content: lorem }));
  return (
    <ExampleBlock title="Grow" source="simple/grow" description="The grow prop will make the tab items take up all available space up to a maximum width of 300px.">
      <Card sx={{ bgcolor: basilBg, boxShadow: "none" }}>
        <Box sx={{ py: 6, textAlign: "center" }}><Typography sx={{ color: basilText, fontSize: 60, fontWeight: 700, lineHeight: 1 }}>BASiL</Typography></Box>
        <VTabs value={tab} onChange={setTab} backgroundColor="transparent" color={basilText} grow tabs={items} withItems contentColor={basilBg} />
      </Card>
    </ExampleBlock>
  );
}

function VerticalExample() {
  const [tab, setTab] = useState("0");
  const items = [
    { label: "Option 1", icon: "mdi-account", content: <Paragraphs text={verticalText1.split("\n\n")} /> },
    { label: "Option 2", icon: "mdi-lock", content: <Paragraphs text={verticalText2.split("\n\n")} /> },
    { label: "Option 3", icon: "mdi-access-point", content: <Paragraphs text={verticalText3.split("\n\n")} /> },
  ].map((item, index) => ({ ...item, value: String(index) }));
  return (
    <ExampleBlock title="Vertical Tabs" source="simple/vertical" description="Tabs can be toggled to stack its v-tab components vertically.">
      <Card sx={{ boxShadow: "none" }}>
        <Toolbar sx={{ bgcolor: primary, color: "#fff", minHeight: 64 }}><Typography sx={{ fontSize: 20 }}>User Profile</Typography></Toolbar>
        <VTabs value={tab} onChange={setTab} vertical tabs={items} withItems />
      </Card>
    </ExampleBlock>
  );
}

function IconsAndTextExample() {
  const [tab, setTab] = useState("tab-1");
  const items = [
    { label: "Recents", icon: "mdi-phone", value: "tab-1", content: lorem },
    { label: "Favorites", icon: "mdi-heart", value: "tab-2", content: lorem },
    { label: "Nearby", icon: "mdi-account-box", value: "tab-3", content: lorem },
  ];
  return (
    <ExampleBlock title="Icons and text" source="intermediate/icons-and-text" description={<><CodePill>v-tab</CodePill>'s can contain icons as well as text. This increases the <CodePill>v-tabs</CodePill> height to 72px.</>}>
      <Card sx={{ boxShadow: "none" }}><VTabs value={tab} onChange={setTab} dark backgroundColor={deepPurpleAccent4} centered iconsAndText tabs={items} withItems /></Card>
    </ExampleBlock>
  );
}

function RightExample() {
  const [tab, setTab] = useState("0");
  const items = ["Landscape", "City", "Abstract"].map((label, index) => ({ label, value: String(index), content: <ImageGrid n={index + 1} /> }));
  return (
    <ExampleBlock title="Right aligned tabs" source="intermediate/right" description="The right prop aligns the tabs to the right.">
      <Card sx={{ boxShadow: "none" }}><VTabs value={tab} onChange={setTab} backgroundColor="#fff" color={deepPurpleAccent4} right tabs={items} withItems /></Card>
    </ExampleBlock>
  );
}

function ContentExample() {
  const [tab, setTab] = useState("tab-2");
  const items = [1, 2, 3].map((n) => ({ label: `Item ${n}`, value: `tab-${n}`, content: lorem }));
  return (
    <ExampleBlock title="Content" source="intermediate/content" description="It is common to put v-tabs inside the extension slot of v-toolbar. Using v-toolbar's tabs prop auto adjusts its height to 48px to match v-tabs.">
      <ToolbarTabsCard title="Page title" active={tab} onChange={setTab} items={items} centered />
    </ExampleBlock>
  );
}

function AlignWithTitleExample() {
  const [tab, setTab] = useState("0");
  const items = ["web", "shopping", "videos", "images", "news"].map((label, index) => ({ label, value: String(index), content: lorem }));
  return (
    <ExampleBlock title="Align tabs with toolbar title" source="intermediate/align-with-title" description="Make v-tabs lined up with the v-toolbar-title component (v-app-bar-nav-icon or v-btn must be used in v-toolbar).">
      <ToolbarTabsCard title="Your Dashboard" active={tab} onChange={setTab} items={items} alignWithTitle />
    </ExampleBlock>
  );
}

function DynamicExample() {
  const [length, setLength] = useState(15);
  const [tab, setTab] = useState("0");
  const changeLength = (next: number) => {
    const value = Math.max(0, next);
    setLength(value);
    setTab(String(Math.max(0, value - 1)));
  };
  return (
    <ExampleBlock title="Dynamic Tabs" source="intermediate/dynamic" description={<>Tabs can be dynamically added and removed. This allows you to update to any number and the <CodePill>v-tabs</CodePill> component will react. In this example when we add a new tab, we automatically change our model to match. As we add more tabs and overflow the container, the selected item will be automatically scrolled into view. Remove all <CodePill>v-tab</CodePill>s and the slider will disappear.</>}>
      <Card sx={{ boxShadow: "none" }}>
        <VTabs value={tab} onChange={setTab} dark backgroundColor={redLight2} tabs={Array.from({ length }, (_, i) => ({ label: `Item ${i + 1}`, value: String(i) }))} showArrows />
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Button onClick={() => changeLength(length - 1)} sx={{ color: "rgba(0,0,0,.72)" }}>Remove Tab</Button>
          <Divider orientation="vertical" flexItem sx={{ display: "inline-flex", height: 24, mx: 4, verticalAlign: "middle" }} />
          <Button onClick={() => changeLength(length + 1)} sx={{ color: "rgba(0,0,0,.72)" }}>Add Tab</Button>
        </Box>
      </Card>
    </ExampleBlock>
  );
}

function DynamicHeightExample() {
  const [tab, setTab] = useState("0");
  const items = [
    { label: "Item 1", value: "0", content: <Typography>{lorem}</Typography> },
    { label: "Item 2", value: "1", content: <><Typography component="h3" sx={{ fontSize: 24, mb: 2 }}>An awesome title</Typography><Paragraphs text={[dynamicP1, dynamicP2, dynamicP3]} /></> },
    { label: "Item 3", value: "2", content: <><Typography component="h3" sx={{ fontSize: 24, mb: 2 }}>An even better title</Typography><Paragraphs text={[dynamicP4, dynamicP5]} /></> },
  ];
  return (
    <ExampleBlock title="With search" source="complex/dynamic-height" description="When changing your v-tab-item, the content area will smoothly scale to the new size.">
      <Card sx={{ boxShadow: "none" }}>
        <Toolbar sx={{ bgcolor: "#9c27b0", color: "#fff", minHeight: 128, alignItems: "flex-start", pt: 2 }}>
          <TextField placeholder="Search" variant="standard" InputProps={{ disableUnderline: true, startAdornment: <VIcon name="mdi-magnify" />, endAdornment: <VIcon name="mdi-mic" /> }} sx={{ mx: 4, bgcolor: "rgba(255,255,255,.15)", borderRadius: 1, px: 2, flex: 1, input: { color: "#fff" } }} />
        </Toolbar>
        <VTabs value={tab} onChange={setTab} dark backgroundColor="#9c27b0" centered tabs={items} withItems contentTransition />
      </Card>
    </ExampleBlock>
  );
}

function DesktopExample() {
  const [tab, setTab] = useState("mobile-tabs-5-1");
  const items = ["mdi-phone", "mdi-heart", "mdi-account-box"].map((icon, index) => ({ label: <VIcon name={icon} />, value: `mobile-tabs-5-${index + 1}`, content: lorem }));
  return (
    <ExampleBlock title="Desktop tabs" source="complex/desktop" description="You can represent v-tab actions by using single icons. This is useful when it is easy to correlate content to each tab.">
      <ToolbarTabsCard title="Contact Database" active={tab} onChange={setTab} items={items} fixedTabs light />
    </ExampleBlock>
  );
}

function OverflowMenuExample() {
  const [currentItem, setCurrentItem] = useState("tab-Web");
  const [items, setItems] = useState(["Web", "Shopping", "Videos", "Images"]);
  const [more, setMore] = useState(["News", "Maps", "Books", "Flights", "Apps"]);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const addItem = (item: string) => {
    const removed = items[0];
    setItems([...items.slice(1), item]);
    setMore([...more.filter((value) => value !== item), removed]);
    setCurrentItem(`tab-${item}`);
    setAnchor(null);
  };
  const all = [...items, ...more].map((label) => ({ label, value: `tab-${label}`, content: <><Typography component="h2" sx={{ fontSize: 24, mb: 1 }}>{label}</Typography>{lorem}</> }));
  return (
    <ExampleBlock title="With menu" source="complex/overflow-to-menu" description="You can use a menu to hold additional tabs, swapping them out on the fly.">
      <Card sx={{ boxShadow: "none" }}>
        <Toolbar sx={{ bgcolor: deepPurpleAccent4, color: "#fff", minHeight: 64 }}><VIcon name="mdi-menu" /><Typography sx={{ ml: 2, fontSize: 20 }}>Page title</Typography><Box sx={{ flexGrow: 1 }} /><IconButton sx={{ color: "#fff" }}><VIcon name="mdi-magnify" /></IconButton><IconButton sx={{ color: "#fff" }}><VIcon name="mdi-dots-vertical" /></IconButton></Toolbar>
        <Box sx={{ bgcolor: deepPurpleAccent4, color: "#fff", display: "flex" }}>
          <VTabs value={currentItem} onChange={setCurrentItem} dark backgroundColor={deepPurpleAccent4} fixedTabs sliderColor="#fff" tabs={items.map((label) => ({ label, value: `tab-${label}` }))} sx={{ flex: 1 }} />
          {more.length ? <Button onClick={(event) => setAnchor(event.currentTarget)} sx={{ alignSelf: "center", color: "#fff", mr: 4 }}>more <VIcon name="mdi-menu-down" /></Button> : null}
        </Box>
        <Menu anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)}>{more.map((item) => <MenuItem key={item} onClick={() => addItem(item)}>{item}</MenuItem>)}</Menu>
        <TabsItems active={currentItem} items={all} />
      </Card>
    </ExampleBlock>
  );
}

function ToolbarTabsCard({ title, active, onChange, items, centered = false, alignWithTitle = false, fixedTabs = false, light = false }: { title: string; active: string; onChange: (value: string) => void; items: TabItem[]; centered?: boolean; alignWithTitle?: boolean; fixedTabs?: boolean; light?: boolean }) {
  const bg = light ? "#fff" : cyan;
  const foreground = light ? "rgba(0,0,0,.87)" : "#fff";
  return (
    <Card sx={{ boxShadow: "none" }}>
      <Box sx={{ bgcolor: bg, color: foreground }}>
        <Toolbar sx={{ color: "inherit", minHeight: 64 }}>
          <VIcon name="mdi-menu" />
          <Typography sx={{ ml: 2, fontSize: 20 }}>{title}</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton sx={{ color: "inherit" }}><VIcon name="mdi-magnify" /></IconButton>
          <IconButton sx={{ color: "inherit" }}><VIcon name="mdi-dots-vertical" /></IconButton>
        </Toolbar>
        <VTabs value={active} onChange={onChange} dark={!light} backgroundColor={bg} color={light ? primary : "#fff"} sliderColor={light ? primary : "#ffeb3b"} centered={centered} alignWithTitle={alignWithTitle} fixedTabs={fixedTabs} tabs={items} />
      </Box>
      <TabsItems active={active} items={items} />
    </Card>
  );
}

function VTabs({ tabs, value, onChange, backgroundColor = "#fff", color = primary, sliderColor, dark = false, fixedTabs = false, grow = false, centered = false, centerActive = false, right = false, vertical = false, iconsAndText = false, showArrows = false, prevIcon = "mdi-arrow-left-bold-box-outline", nextIcon = "mdi-arrow-right-bold-box-outline", withItems = false, contentColor = "#fff", contentTransition = false, elevation = false, alignWithTitle = false, sx = {} }: { tabs: TabItem[]; value?: string; onChange?: (value: string) => void; backgroundColor?: string; color?: string; sliderColor?: string; dark?: boolean; fixedTabs?: boolean; grow?: boolean; centered?: boolean; centerActive?: boolean; right?: boolean; vertical?: boolean; iconsAndText?: boolean; showArrows?: boolean; prevIcon?: string; nextIcon?: string; withItems?: boolean; contentColor?: string; contentTransition?: boolean; elevation?: boolean; alignWithTitle?: boolean; sx?: object }) {
  const first = tabs[0]?.value ?? "0";
  const [local, setLocal] = useState(first);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [sliderBounds, setSliderBounds] = useState({ height: 0, left: 0, top: 0, width: 0 });
  const active = value ?? local;
  const activeIndex = Math.max(0, tabs.findIndex((tab, index) => (tab.value ?? String(index)) === active));
  const setActive = (next: string) => { onChange ? onChange(next) : setLocal(next); };
  const barHeight = iconsAndText ? 72 : 48;

  useEffect(() => {
    const updateSlider = () => {
      const el = tabRefs.current[activeIndex];
      if (!el || !tabs.length) {
        setSliderBounds({ height: 0, left: 0, top: 0, width: 0 });
        return;
      }
      setSliderBounds({
        height: vertical ? el.scrollHeight : 2,
        left: vertical ? 0 : el.offsetLeft,
        top: el.offsetTop,
        width: vertical ? 2 : el.scrollWidth,
      });
    };

    updateSlider();
    window.setTimeout(updateSlider, 30);
    window.addEventListener("resize", updateSlider);
    return () => window.removeEventListener("resize", updateSlider);
  }, [activeIndex, alignWithTitle, centered, centerActive, fixedTabs, grow, iconsAndText, right, tabs.length, vertical]);

  return (
    <Box sx={{ display: vertical ? "flex" : "block", width: "100%", boxShadow: elevation ? shadow2 : "none", ...sx }}>
      <Box sx={{ bgcolor: backgroundColor, color: dark ? "#fff" : color, display: "flex", flex: vertical ? "1 0 auto" : "none", height: vertical ? "auto" : barHeight, overflow: "hidden" }}>
        {showArrows ? <ArrowAffix icon={prevIcon} onClick={() => wrapperRef.current?.scrollBy({ left: -220, behavior: "smooth" })} /> : null}
        <Box ref={wrapperRef} sx={{ flex: 1, overflowX: vertical ? "visible" : "auto", overflowY: "hidden", scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
          <Box sx={{ display: "flex", flexDirection: vertical ? "column" : "row", height: vertical ? "auto" : "100%", justifyContent: centered || centerActive ? "center" : right ? "flex-end" : "flex-start", minWidth: vertical ? 160 : undefined, ml: alignWithTitle && !vertical ? "42px" : 0, position: "relative", whiteSpace: "nowrap" }}>
            {!vertical && tabs.length ? <Box sx={{ bgcolor: sliderColor || (dark ? "#fff" : color), bottom: 0, height: sliderBounds.height || 2, left: sliderBounds.left, position: "absolute", transition: ".3s cubic-bezier(.25,.8,.5,1)", width: sliderBounds.width, zIndex: 1 }} /> : null}
            {vertical && tabs.length ? <Box sx={{ bgcolor: sliderColor || color, height: sliderBounds.height, left: 0, position: "absolute", top: sliderBounds.top, transition: ".3s cubic-bezier(.25,.8,.5,1)", width: sliderBounds.width || 2, zIndex: 1 }} /> : null}
            {tabs.map((tab, index) => {
              const tabValue = tab.value ?? String(index);
              const isActive = tabValue === active;
              const tabTextColor = isActive ? (dark ? "#fff" : color) : dark ? "rgba(255,255,255,.6)" : "rgba(0,0,0,.54)";
              return (
                <Box component="button" ref={(node: HTMLButtonElement | null) => { tabRefs.current[index] = node; }} key={`${tabValue}-${index}`} onClick={() => setActive(tabValue)} role="tab" aria-selected={isActive} sx={{ alignItems: "center", bgcolor: "transparent", border: 0, color: tabTextColor, cursor: "pointer", display: "flex", flex: grow ? "1 0 auto" : fixedTabs ? "1 1 auto" : "0 1 auto", flexDirection: iconsAndText ? "column-reverse" : "row", fontSize: 14, fontWeight: 500, height: vertical ? 48 : barHeight, justifyContent: "center", letterSpacing: ".0892857143em", lineHeight: "normal", maxWidth: grow ? "none" : 360, minWidth: fixedTabs ? 0 : 90, outline: 0, overflow: "hidden", px: 2, position: "relative", textAlign: "center", textTransform: "uppercase", transition: "none", userSelect: "none", width: fixedTabs ? "100%" : undefined, "&:focus:before": { opacity: 0.2 }, "&:hover:before": { opacity: 0.16 }, "&:before": { bgcolor: "currentColor", bottom: 0, content: "''", left: 0, opacity: 0, pointerEvents: "none", position: "absolute", right: 0, top: 0, transition: ".3s cubic-bezier(.25,.8,.5,1)" } }}>
                  {tab.icon && !iconsAndText ? <Box sx={{ display: "inline-flex", mr: 1 }}><VIcon name={tab.icon} /></Box> : null}
                  <Box component="span">{tab.label}</Box>
                  {tab.icon && iconsAndText ? <Box sx={{ display: "inline-flex", mb: 0.75 }}><VIcon name={tab.icon} /></Box> : null}
                </Box>
              );
            })}
          </Box>
        </Box>
        {showArrows ? <ArrowAffix icon={nextIcon} onClick={() => wrapperRef.current?.scrollBy({ left: 220, behavior: "smooth" })} /> : null}
      </Box>
      {withItems ? <TabsItems active={active} items={tabs} contentColor={contentColor} transition={contentTransition} /> : null}
    </Box>
  );
}

function TabsItems({ active, items, contentColor = "#fff", transition = true }: { active: string; items: TabItem[]; contentColor?: string; transition?: boolean }) {
  const activeItem = items.find((item, index) => (item.value ?? String(index)) === active) || items[0];
  return (
    <Box sx={{ bgcolor: contentColor, overflow: "hidden", position: "relative", transition: transition ? ".3s cubic-bezier(.25,.8,.5,1)" : "none" }}>
      <Box sx={{ p: 2, animation: transition ? "tabs-window .3s cubic-bezier(.25,.8,.5,1)" : "none" }} key={active}>
        {typeof activeItem?.content === "string" ? <Typography sx={{ color: "text.secondary", fontSize: 16 }}>{activeItem.content}</Typography> : activeItem?.content}
      </Box>
      <style>{`@keyframes tabs-window{from{opacity:.35;transform:translateX(24px)}to{opacity:1;transform:translateX(0)}}`}</style>
    </Box>
  );
}

function ArrowAffix({ icon, onClick }: { icon: string; onClick: () => void }) {
  return <Box component="button" onClick={onClick} sx={{ alignItems: "center", bgcolor: "transparent", border: 0, color: "inherit", cursor: "pointer", display: "flex", flex: "0 1 52px", justifyContent: "center", minWidth: 52, p: 0 }}><VIcon name={icon} /></Box>;
}

function ImageGrid({ n }: { n: number }) {
  return <Box sx={{ display: "flex", flexWrap: "wrap", m: -1.5 }}>{Array.from({ length: 6 }, (_, i) => i + 1).map((i) => <Box key={i} sx={{ boxSizing: "border-box", flexBasis: { xs: "100%", md: "33.333%" }, maxWidth: { xs: "100%", md: "33.333%" }, p: 1.5 }}><Box component="img" src={`https://picsum.photos/500/300?image=${i * n * 5 + 10}`} sx={{ aspectRatio: "1 / 1", display: "block", objectFit: "cover", width: "100%" }} /></Box>)}</Box>;
}

function Paragraphs({ text }: { text: string[] }) {
  return <>{text.map((p, i) => <Typography key={i} sx={{ mb: i === text.length - 1 ? 0 : 2 }}>{p}</Typography>)}</>;
}

function VuetifySwitch({ checked, onChange, label, disabled = false }: { checked: boolean; onChange: (value: boolean) => void; label: string; disabled?: boolean }) {
  return <Box sx={{ alignItems: "center", display: "inline-flex", minHeight: 48, mx: 2 }}><Switch disabled={disabled} checked={checked} onChange={(event) => onChange(event.target.checked)} sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: primary }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: primary } }} /><Typography sx={{ color: disabled ? "rgba(0,0,0,.38)" : "inherit", fontSize: 16 }}>{label}</Typography></Box>;
}

function VIcon({ name, size = 24 }: { name: string; size?: number }) {
  const path = mdiPaths[name];
  return path ? <Box component="svg" viewBox="0 0 24 24" sx={{ display: "inline-block", height: size, verticalAlign: "middle", width: size }}><Box component="path" d={path} fill="currentColor" /></Box> : null;
}

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

const numberWords = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty"];
const verticalText1 = "Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed a libero.\n\nNam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse non nisl sit amet velit hendrerit rutrum.\n\nPhasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Phasellus blandit leo ut odio.";
const verticalText2 = "Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.\n\nSuspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea dictumst. Fusce ac felis sit amet ligula pharetra condimentum.\n\nSed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Nam commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae tortor. Aliquam eu nunc.\n\nEtiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio nec arcu.\n\nDonec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.";
const verticalText3 = "Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.\n\nCras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.";
const dynamicP1 = "Duis lobortis massa imperdiet quam. Donec vitae orci sed dolor rutrum auctor. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Praesent congue erat at massa.";
const dynamicP2 = "Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non est. Etiam sit amet orci eget eros faucibus tincidunt. Donec sodales sagittis magna.";
const dynamicP3 = "Ut leo. Suspendisse potenti. Duis vel nibh at velit scelerisque suscipit. Fusce pharetra convallis urna.";
const dynamicP4 = "Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Sed hendrerit. Maecenas malesuada. Vestibulum ullamcorper mauris at ligula. Proin faucibus arcu quis ante.";
const dynamicP5 = "Etiam vitae tortor. Curabitur ullamcorper ultricies nisi. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. Aliquam lobortis. Suspendisse potenti.";

const sourceTemplates: Record<ExampleKey, string> = Object.fromEntries([
  "usage",
  "playground",
  "simple/fixed-tabs",
  "simple/center-active",
  "simple/tab-items",
  "simple/grow",
  "simple/pagination",
  "simple/icons",
  "simple/vertical",
  "intermediate/icons-and-text",
  "intermediate/right",
  "intermediate/content",
  "intermediate/align-with-title",
  "intermediate/dynamic",
  "complex/dynamic-height",
  "complex/desktop",
  "complex/overflow-to-menu",
].map((key) => [key, `Source traced from src/demo/examples/tabs/${key}.vue`])) as Record<ExampleKey, string>;
