import { useState, type MouseEvent, type ReactNode } from "react";
import { Avatar, Box, Button, Card, Collapse, Divider, GlobalStyles, IconButton, MenuItem, Select, Toolbar, Tooltip, Typography } from "@mui/material";
import { Code, GitHub, InvertColors, Menu as MenuIcon } from "@mui/icons-material";
import {
  mdiAccount,
  mdiAccountGroupOutline,
  mdiAccountMultiple,
  mdiAccountSupervisorCircle,
  mdiChevronLeft,
  mdiClockStart,
  mdiDotsVertical,
  mdiEmail,
  mdiFilter,
  mdiFolder,
  mdiHelpBox,
  mdiHomeCity,
  mdiImage,
  mdiMagnify,
  mdiStar,
  mdiViewDashboard,
} from "@mdi/js";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";
import materialIconsFont from "../../../assets/style-ui/icons/MaterialIcons-Regular.woff2";

const primary = "#0097a7";
const deepPurpleAccent = "#6200ea";
const deepPurpleDark = "#4527a0";
const indigoDark = "#303f9f";
const shadow2 = "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)";
const shadow12 = "0 7px 8px -4px rgba(0,0,0,.2), 0 12px 17px 2px rgba(0,0,0,.14), 0 5px 22px 4px rgba(0,0,0,.12)";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";

type ExampleKey = keyof typeof sourceTemplates;
type Ripple = { id: number; x: number; y: number; size: number };
type DrawerItem = { title: string; icon?: string };

const basicItems: DrawerItem[] = [
  { title: "Dashboard", icon: "mdi-view-dashboard" },
  { title: "Photos", icon: "mdi-image" },
  { title: "About", icon: "mdi-help-box" },
];

const materialItems: DrawerItem[] = [
  { title: "Dashboard", icon: "dashboard" },
  { title: "Account", icon: "account_box" },
  { title: "Admin", icon: "gavel" },
];

const accountItems: DrawerItem[] = [
  { title: "Home", icon: "mdi-home-city" },
  { title: "My Account", icon: "mdi-account" },
  { title: "Users", icon: "mdi-account-group-outline" },
];

export default function NavigationDrawersPage() {
  return (
    <>
      <GlobalStyles styles={{ "@font-face": { fontFamily: "Material Icons", fontStyle: "normal", fontWeight: 400, src: `url(${materialIconsFont}) format("woff2")` } }} />
      <DocPage
        title="NavigationDrawers"
        namespace="Components"
        icon={<MenuIcon />}
        breadcrumbs={[
          { label: "Components", href: "/components/vuetify/api-explorer" },
          { label: "Vuetify", href: "/components/vuetify/api-explorer" },
          { label: "Navigation Drawers" },
        ]}
      >
        <DocText>
          The <CodePill>v-navigation-drawer</CodePill> component is what your users will utilize to navigate through the application. The navigation-drawer is pre-configured to work with or without <strong>vue-router</strong> right out the box. For the purpose of display, some examples are wrapped in a <CodePill>v-card</CodePill> element. Within your application you will generally place the <CodePill>v-navigation-drawer</CodePill> as a direct child of <CodePill>v-app</CodePill>.
        </DocText>
        <UsageSection />
        <PlaygroundSection />
        <ExamplesSection />
      </DocPage>
    </>
  );
}

function UsageSection() {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <BaseHeading id="usage">Usage</BaseHeading>
      <VuetifyExampleBlock title="" source="usage" description={<>The navigation drawer is primarily used to house links to the pages in your application. Using <CodePill>null</CodePill> as the starting value for its <CodePill>v-model</CodePill> will initialize the drawer as closed on mobile and as open on desktop. It is common to pair drawers with the <a href="/components/lists">v-list</a> component using the <strong>nav</strong> property.</>}>
        {() => <UsageExample />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function PlaygroundSection() {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <BaseHeading id="playground">Playground</BaseHeading>
      <VuetifyExampleBlock title="" description="" source="playground">
        {() => <PlaygroundExample />}
      </VuetifyExampleBlock>
    </Box>
  );
}

function ExamplesSection() {
  const examples: Array<{ title: string; description: ReactNode; source: ExampleKey; render: () => ReactNode }> = [
    { title: "Colored drawer", description: <>Navigation drawers can be customized to fit any application's design. Here we apply a custom background color and an appended content area using the <strong>append</strong> slot.</>, source: "simple/colored", render: () => <ColoredExample /> },
    { title: "Permanent floating drawer", description: <>By default, a navigation drawer has a 1px right border that separates it from content. In this example we want to detach the drawer from the left side and let it float on its own. The <strong>floating</strong> property removes the right border (or left if using <strong>right</strong>).</>, source: "simple/permanent-floating", render: () => <PermanentFloatingExample /> },
    { title: "Mini", description: <>When using the <strong>mini-variant</strong> prop, the drawer will shrink (default 80px) and hide everything inside of <CodePill>v-list</CodePill> except the first element. In this example we use the <strong>.sync</strong> modifier that allows us to tie the expanding/contracting of the drawer programmatically.</>, source: "simple/mini", render: () => <MiniExample /> },
    { title: "Temporary", description: "A temporary drawer sits above its application and uses a scrim (overlay) to darken the background. This drawer behavior is mimicked by default when on mobile. Clicking outside of the drawer will cause it to close.", source: "simple/temporary", render: () => <TemporaryExample /> },
    { title: "Right positioned", description: <>Navigation drawers can also be positioned on the right side of your application (or an element). This is also useful for creating a side-sheet with auxillary information that may not have any navigation links. When using <strong>RTL</strong> you must explicitly define <strong>right</strong> for your drawer.</>, source: "simple/right", render: () => <RightExample /> },
    { title: "Expand on hover", description: <>Places the component in <strong>mini-variant</strong> mode and expands once hovered. Does not alter the content area. Width can be controlled with the <strong>mini-variant-width</strong> property.</>, source: "simple/expand-on-hover", render: () => <ExpandOnHoverExample /> },
    { title: "Backgrounds", description: <>Apply a custom background to your drawer. If you need to customize <CodePill>v-img</CodePill>'s properties you can use the <strong>img</strong> slot.</>, source: "intermediate/background", render: () => <BackgroundExample /> },
    { title: "Combined drawers", description: <>In this example we define a custom width to accommodate our nested drawer. Using <CodePill>v-row</CodePill> we ensure that the drawer and list stack horizontally next to each other.</>, source: "intermediate/combined", render: () => <CombinedExample /> },
    { title: "Bottom drawer", description: <>Using the <strong>bottom</strong> prop, we are able to relocate our drawer on mobile devices to come from the bottom of the screen. This is an alternative style and only activates once the <strong>mobile-breakpoint</strong> is met.</>, source: "complex/bottom-drawer", render: () => <BottomDrawerExample /> },
  ];
  return (
    <Box component="section">
      <BaseHeading id="examples">Examples</BaseHeading>
      {examples.map((example) => (
        <VuetifyExampleBlock key={example.source} title={example.title} description={example.description} source={example.source}>
          {example.render}
        </VuetifyExampleBlock>
      ))}
    </Box>
  );
}

function UsageExample() {
  return (
    <DemoCard width={256} height={400}>
      <Drawer permanent>
        <DrawerHeader title="Application" subtitle="subtext" />
        <VDivider />
        <DrawerList items={basicItems} dense nav />
      </Drawer>
    </DemoCard>
  );
}

function PlaygroundExample() {
  const [drawer, setDrawer] = useState(true);
  const [color, setColor] = useState("primary");
  const [permanent, setPermanent] = useState(true);
  const [miniVariant, setMiniVariant] = useState(false);
  const [expandOnHover, setExpandOnHover] = useState(false);
  const [background, setBackground] = useState(false);
  const [right, setRight] = useState(false);
  const colorMap: Record<string, string> = { primary, blue: "#2196f3", success: "#4caf50", red: "#f44336", teal: "#009688" };
  return (
    <Box sx={{ px: 1.5 }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", mb: 1 }}>
        <Box sx={{ width: "100%", px: 1.5, mb: 1 }}>
          <Select size="small" value={color} onChange={(event) => setColor(event.target.value)} sx={{ width: "100%", maxWidth: 460, bgcolor: "#fff" }}>
            {["primary", "blue", "success", "red", "teal"].map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
          </Select>
        </Box>
        <VSwitch label="v-model" checked={drawer} onChange={setDrawer} />
        <VSwitch label="Permanent" checked={permanent} onChange={setPermanent} />
        <VSwitch label="Mini variant" checked={miniVariant} onChange={setMiniVariant} />
        <VSwitch label="Expand on hover" checked={expandOnHover} onChange={setExpandOnHover} />
        <VSwitch label="Background" checked={background} onChange={setBackground} />
        <VSwitch label="Right" checked={right} onChange={setRight} />
      </Box>
      <DemoCard height={400}>
        <Box sx={{ position: "relative", height: "100%", overflow: "hidden" }}>
          {drawer && (
            <Drawer absolute dark right={right} permanent={permanent} mini={miniVariant} expandOnHover={expandOnHover} color={colorMap[color]} background={background ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg" : undefined}>
              <DrawerProfile avatar="https://randomuser.me/api/portraits/men/81.jpg" title="Application" subtitle="Subtext" mini={miniVariant} />
              <VDivider dark />
              <DrawerList items={basicItems} dense nav dark mini={miniVariant} />
            </Drawer>
          )}
        </Box>
      </DemoCard>
    </Box>
  );
}

function ColoredExample() {
  return (
    <DemoCard width={256} height={400}>
      <Drawer permanent dark color={deepPurpleAccent} append={<Box sx={{ p: 1 }}><Button fullWidth sx={{ bgcolor: "#fff", color: "rgba(0,0,0,.87)", height: 36 }}>Logout</Button></Box>}>
        <DrawerList items={materialItems} dark material />
      </Drawer>
    </DemoCard>
  );
}

function PermanentFloatingExample() {
  return (
    <Card sx={{ p: 6, bgcolor: indigoDark, boxShadow: "none", borderRadius: 1 }}>
      <Card sx={{ width: 256, boxShadow: shadow12, borderRadius: 1, overflow: "hidden" }}>
        <Drawer permanent floating>
          <DrawerList items={[{ title: "Home", icon: "dashboard" }, { title: "About", icon: "question_answer" }]} dense rounded material />
        </Drawer>
      </Card>
    </Card>
  );
}

function MiniExample() {
  const [mini, setMini] = useState(true);
  return (
    <Card sx={{ boxShadow: shadow2, width: mini ? 80 : 256, overflow: "hidden", transition: "width 180ms cubic-bezier(.4,0,.2,1)" }}>
      <Drawer permanent mini={mini} onMiniExpand={() => setMini(false)}>
        <Box sx={{ display: "flex", alignItems: "center", minHeight: 56, px: 1 }}>
          <Avatar src="https://randomuser.me/api/portraits/men/85.jpg" sx={{ width: 40, height: 40, mx: .5 }} />
          <Typography className="drawer-hide-on-mini" sx={{ flex: 1, ml: 2, fontSize: 16 }}>John Leider</Typography>
          {!mini && <IconButton onClick={() => setMini(true)}><VIcon icon="mdi-chevron-left" /></IconButton>}
        </Box>
        <VDivider />
        <DrawerList items={accountItems} dense mini={mini} />
      </Drawer>
    </Card>
  );
}

function TemporaryExample() {
  const [drawer, setDrawer] = useState<boolean | null>(null);
  const [renderDrawer, setRenderDrawer] = useState(false);
  const openDrawer = Boolean(drawer);
  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (openDrawer) {
      setDrawer(false);
      window.setTimeout(() => setRenderDrawer(false), 180);
    } else {
      setRenderDrawer(true);
      window.setTimeout(() => setDrawer(true), 0);
    }
  };
  const close = () => {
    setDrawer(false);
    window.setTimeout(() => setRenderDrawer(false), 180);
  };
  return (
    <Card sx={{ height: 400, position: "relative", overflow: "hidden", boxShadow: "none", bgcolor: "#fff" }}>
      <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Button onClick={toggle} sx={{ bgcolor: "#e91e63", color: "#fff", boxShadow: shadow2, "&:hover": { bgcolor: "#e91e63" } }}>Toggle</Button>
      </Box>
      {renderDrawer && <Box onClick={close} sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,.46)", opacity: openDrawer ? 1 : 0, zIndex: 5, transition: "opacity 180ms cubic-bezier(.4,0,.2,1)" }} />}
      {renderDrawer && (
        <Box sx={{ position: "absolute", top: 0, bottom: 0, left: 0, zIndex: 8, width: 256, transform: openDrawer ? "translateX(0)" : "translateX(-100%)", transition: "transform 180ms cubic-bezier(.4,0,.2,1)" }}>
        <Drawer temporary>
          <DrawerProfile avatar="https://randomuser.me/api/portraits/men/78.jpg" title="John Leider" />
          <VDivider />
          <DrawerList items={[{ title: "Home", icon: "dashboard" }, { title: "About", icon: "question_answer" }]} dense material />
        </Drawer>
        </Box>
      )}
    </Card>
  );
}

function RightExample() {
  return (
    <DemoCard height={350}>
      <Box sx={{ position: "relative", height: "100%" }}>
        <Drawer absolute permanent right>
          <DrawerProfile avatar="https://randomuser.me/api/portraits/women/81.jpg" title="Jane Smith" subtitle="Logged In" twoLine />
          <VDivider />
          <DrawerList items={accountItems} dense />
        </Drawer>
      </Box>
    </DemoCard>
  );
}

function ExpandOnHoverExample() {
  const [hover, setHover] = useState(false);
  return (
    <Box sx={{ m: 6, p: 6 }}>
      <Card onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} sx={{ width: hover ? 256 : 80, boxShadow: shadow2, overflow: "hidden", transition: "width 180ms cubic-bezier(.4,0,.2,1)" }}>
        <Drawer permanent mini={!hover}>
          <Box sx={{ py: 1 }}>
            <Box sx={{ minHeight: 56, display: "flex", alignItems: "center", px: 1 }}>
              <Avatar src="https://randomuser.me/api/portraits/women/85.jpg" sx={{ width: 40, height: 40, mx: .5 }} />
            </Box>
            {hover && <DrawerHeader title="Sandra Adams" subtitle="sandra_a88@gmail.com" />}
          </Box>
          <VDivider />
          <DrawerList items={[{ title: "My Files", icon: "mdi-folder" }, { title: "Shared with me", icon: "mdi-account-multiple" }, { title: "Starred", icon: "mdi-star" }]} dense nav mini={!hover} />
        </Drawer>
      </Card>
    </Box>
  );
}

function BackgroundExample() {
  return (
    <DemoCard width={300} height={300}>
      <Drawer absolute dark permanent width="100%" background="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg">
        <DrawerList items={[{ title: "Inbox", icon: "mdi-email" }, { title: "Supervisors", icon: "mdi-account-supervisor-circle" }, { title: "Clock-in", icon: "mdi-clock-start" }]} dark />
      </Drawer>
    </DemoCard>
  );
}

function CombinedExample() {
  return (
    <DemoCard width={330} height={300}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Drawer dark permanent mini width={56} color="#212121">
          <Box sx={{ minHeight: 56, display: "flex", alignItems: "center", px: 1 }}>
            <Avatar src="https://randomuser.me/api/portraits/women/75.jpg" sx={{ width: 40, height: 40 }} />
          </Box>
          <VDivider dark />
          <DrawerList items={[{ title: "Home", icon: "dashboard" }, { title: "About", icon: "question_answer" }]} dense nav dark mini material />
        </Drawer>
        <Box sx={{ flex: 1, bgcolor: "#fff", py: 1 }}>
          {["Home", "Contacts", "Settings"].map((link) => <DrawerListItem key={link} title={link} />)}
        </Box>
      </Box>
    </DemoCard>
  );
}

function BottomDrawerExample() {
  const [drawer, setDrawer] = useState(false);
  const [renderDrawer, setRenderDrawer] = useState(false);
  const [group, setGroup] = useState<string | null>(null);
  const open = drawer;
  const toggle = () => {
    if (open) {
      setDrawer(false);
      window.setTimeout(() => setRenderDrawer(false), 180);
    } else {
      setRenderDrawer(true);
      window.setTimeout(() => setDrawer(true), 0);
    }
  };
  const close = () => {
    setDrawer(false);
    window.setTimeout(() => setRenderDrawer(false), 180);
  };
  const select = (item: string) => {
    setGroup(item);
    close();
  };
  return (
    <DemoCard width={344} height={400}>
      <Box sx={{ height: "100%", position: "relative", overflow: "hidden", bgcolor: "#fff" }}>
        <Box sx={{ height: 24, bgcolor: deepPurpleDark }} />
        <Toolbar sx={{ height: 128, minHeight: 128, alignItems: "flex-start", pt: 2, bgcolor: deepPurpleAccent, color: "#fff" }}>
          <IconButton onClick={toggle} sx={{ color: "#fff" }}><MenuIcon /></IconButton>
          <Typography sx={{ flex: 1, pt: 1.1, fontSize: 20 }}>My files</Typography>
          <IconButton sx={{ color: "#fff" }}><VIcon icon="mdi-magnify" /></IconButton>
          <IconButton sx={{ color: "#fff" }}><VIcon icon="mdi-filter" /></IconButton>
          <IconButton sx={{ color: "#fff" }}><VIcon icon="mdi-dots-vertical" /></IconButton>
        </Toolbar>
        <Typography sx={{ p: 2, color: "rgba(0,0,0,.6)", fontSize: 14 }}>The navigation drawer will appear from the bottom on smaller size screens.</Typography>
        {renderDrawer && <Box onClick={close} sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,.46)", opacity: open ? 1 : 0, zIndex: 4, transition: "opacity 180ms cubic-bezier(.4,0,.2,1)" }} />}
        {renderDrawer && (
          <Box sx={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 6, bgcolor: "#fff", boxShadow: shadow12, py: 1, transform: open ? "translateY(0)" : "translateY(100%)", transition: "transform 180ms cubic-bezier(.4,0,.2,1)" }}>
            {["Foo", "Bar", "Fizz", "Buzz"].map((item) => <DrawerListItem key={item} title={item} active={group === item} activeColor={deepPurpleAccent} onClick={() => select(item)} />)}
          </Box>
        )}
      </Box>
    </DemoCard>
  );
}

function Drawer({ children, append, permanent = false, temporary = false, absolute = false, right = false, dark = false, color = "#fff", background, mini = false, expandOnHover = false, floating = false, width = 256, onMiniExpand }: { children: ReactNode; append?: ReactNode; permanent?: boolean; temporary?: boolean; absolute?: boolean; right?: boolean; dark?: boolean; color?: string; background?: string; mini?: boolean; expandOnHover?: boolean; floating?: boolean; width?: number | string; onMiniExpand?: () => void }) {
  const [hover, setHover] = useState(false);
  const compact = mini || (expandOnHover && !hover);
  const miniWidth = typeof width === "number" && width < 80 ? width : 80;
  const drawerWidth = compact ? miniWidth : width;
  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        if (compact && onMiniExpand) onMiniExpand();
      }}
      sx={{
        position: absolute || temporary ? "absolute" : "relative",
        top: 0,
        bottom: 0,
        left: right ? "auto" : 0,
        right: right ? 0 : "auto",
        zIndex: temporary ? 8 : 2,
        width: drawerWidth,
        height: "100%",
        bgcolor: color,
        color: dark ? "#fff" : "rgba(0,0,0,.87)",
        borderRight: floating || right ? 0 : "1px solid rgba(0,0,0,.12)",
        borderLeft: right ? "1px solid rgba(0,0,0,.12)" : 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "width 180ms cubic-bezier(.4,0,.2,1)",
        backgroundImage: background ? `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), url(${background})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        cursor: compact && onMiniExpand ? "pointer" : "default",
        "& .drawer-hide-on-mini": {
          opacity: compact ? 0 : 1,
          pointerEvents: compact ? "none" : "auto",
          width: compact ? 0 : "auto",
          overflow: "hidden",
          whiteSpace: "nowrap",
          transition: "opacity 120ms cubic-bezier(.4,0,.2,1)",
        },
        '&[data-compact="true"] .drawer-avatar': {
          marginRight: 0,
        },
      }}
      data-permanent={permanent}
      data-compact={compact}
    >
      <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto" }}>{children}</Box>
      {append}
    </Box>
  );
}

function DrawerHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <Box sx={{ minHeight: 72, display: "flex", alignItems: "center", px: 2 }}>
      <Box>
        <Typography sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>{title}</Typography>
        {subtitle && <Typography sx={{ fontSize: 14, lineHeight: "20px", color: "rgba(0,0,0,.6)" }}>{subtitle}</Typography>}
      </Box>
    </Box>
  );
}

function DrawerProfile({ avatar, title, subtitle, mini = false, twoLine = false }: { avatar: string; title: string; subtitle?: string; mini?: boolean; twoLine?: boolean }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", minHeight: twoLine || subtitle ? 72 : 56, px: 2 }}>
      <Avatar className="drawer-avatar" src={avatar} sx={{ width: 40, height: 40, mr: mini ? 0 : 2 }} />
      <Box className="drawer-hide-on-mini"><Typography sx={{ fontSize: 16, lineHeight: "24px" }}>{title}</Typography>{subtitle && <Typography sx={{ fontSize: 14, lineHeight: "20px", color: "rgba(0,0,0,.6)" }}>{subtitle}</Typography>}</Box>
    </Box>
  );
}

function DrawerList({ items, dense = false, nav = false, rounded = false, dark = false, mini = false, material = false }: { items: DrawerItem[]; dense?: boolean; nav?: boolean; rounded?: boolean; dark?: boolean; mini?: boolean; material?: boolean }) {
  return (
    <Box sx={{ py: 1 }}>
      {items.map((item) => <DrawerListItem key={item.title} title={item.title} icon={item.icon} dense={dense} nav={nav} rounded={rounded} dark={dark} mini={mini} material={material} />)}
    </Box>
  );
}

function DrawerListItem({ title, icon, dense = false, nav = false, rounded = false, dark = false, mini = false, material = false, active = false, activeColor = primary, onClick }: { title: string; icon?: string; dense?: boolean; nav?: boolean; rounded?: boolean; dark?: boolean; mini?: boolean; material?: boolean; active?: boolean; activeColor?: string; onClick?: () => void }) {
  const { ripples, triggerRipple } = useVuetifyRipple();
  const fg = dark ? "#fff" : "rgba(0,0,0,.87)";
  return (
    <Box component="button" type="button" onPointerDown={triggerRipple} onClick={onClick} sx={{ width: nav ? "calc(100% - 16px)" : "100%", minHeight: dense ? 40 : 48, display: "flex", alignItems: "center", mx: nav ? 1 : 0, my: nav ? .25 : 0, px: 2, border: 0, borderRadius: rounded || nav ? 4 : 0, bgcolor: active ? "rgba(98,0,234,.12)" : "transparent", color: active ? activeColor : fg, textAlign: "left", cursor: "pointer", position: "relative", overflow: "hidden", "&:hover": { bgcolor: dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.04)" } }}>
      {icon && <Box sx={{ minWidth: 56, color: active ? activeColor : dark ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.54)" }}>{material ? <MaterialIcon name={icon} /> : <VIcon icon={icon} />}</Box>}
      <Typography className="drawer-hide-on-mini" sx={{ fontSize: 14, lineHeight: "20px", fontWeight: 500, whiteSpace: "nowrap" }}>{title}</Typography>
      <RippleLayer ripples={ripples} />
    </Box>
  );
}

function VDivider({ dark = false }: { dark?: boolean }) {
  return <Divider sx={{ borderColor: dark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.12)" }} />;
}

function VSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <Box onClick={() => onChange(!checked)} sx={{ m: 1, display: "flex", alignItems: "center", minHeight: 42, cursor: "pointer", userSelect: "none" }}>
      <Box sx={{ width: 42, height: 34, position: "relative", mr: 1, display: "flex", alignItems: "center" }}>
        <Box sx={{ width: 34, height: 14, borderRadius: 8, bgcolor: checked ? primary : "rgba(0,0,0,.38)", opacity: checked ? .5 : .38 }} />
        <Box sx={{ position: "absolute", left: checked ? 18 : 0, width: 20, height: 20, borderRadius: "50%", bgcolor: checked ? primary : "#fafafa", boxShadow: "0 2px 4px rgba(0,0,0,.32)", transition: "left 150ms cubic-bezier(.4,0,.2,1)" }} />
      </Box>
      <Typography sx={{ fontSize: 16 }}>{label}</Typography>
    </Box>
  );
}

function DemoCard({ children, width, height }: { children: ReactNode; width?: number | string; height: number }) {
  return <Card sx={{ mx: "auto", width: width ?? "100%", height, borderRadius: 1, boxShadow: shadow2, overflow: "hidden", bgcolor: "#fff", position: "relative" }}>{children}</Card>;
}

function VIcon({ icon, size = 24 }: { icon: string; size?: number }) {
  const path = mdiPaths[icon];
  if (!path) return <MaterialIcon name={icon.replace(/^mdi-/, "")} size={size} />;
  return <Box component="svg" viewBox="0 0 24 24" sx={{ width: size, height: size, display: "block", color: "currentColor" }}><Box component="path" d={path} fill="currentColor" /></Box>;
}

function MaterialIcon({ name, size = 24 }: { name: string; size?: number }) {
  return <Box component="span" sx={{ direction: "ltr", display: "inline-block", fontFamily: "Material Icons", fontFeatureSettings: "'liga'", fontSize: size, fontStyle: "normal", fontWeight: 400, height: size, letterSpacing: "normal", lineHeight: 1, textRendering: "optimizeLegibility", textTransform: "none", whiteSpace: "nowrap", width: size, wordWrap: "normal" }}>{name}</Box>;
}

function useVuetifyRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const triggerRipple = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const id = Date.now() + Math.random();
    setRipples((current) => [...current, { id, x, y, size }]);
    window.setTimeout(() => setRipples((current) => current.filter((ripple) => ripple.id !== id)), 560);
  };
  return { ripples, triggerRipple };
}

function RippleLayer({ ripples }: { ripples: Ripple[] }) {
  return (
    <Box aria-hidden="true" sx={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", borderRadius: "inherit" }}>
      {ripples.map((ripple) => <Box key={ripple.id} sx={{ position: "absolute", left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size, borderRadius: "50%", bgcolor: "currentColor", opacity: 0, transform: "scale(0)", animation: "navDrawerRipple 560ms cubic-bezier(.25,.8,.5,1)", "@keyframes navDrawerRipple": { "0%": { opacity: .18, transform: "scale(0)" }, "45%": { opacity: .14, transform: "scale(.55)" }, "100%": { opacity: 0, transform: "scale(1)" } } }} />)}
    </Box>
  );
}

function BaseHeading({ id, children }: { id: string; children: ReactNode }) {
  return <Typography id={id} variant="h5" sx={{ fontSize: { xs: 20, md: 22 }, lineHeight: 1.45, fontWeight: 400, mb: 2.5 }}>{children}</Typography>;
}

function VuetifyExampleBlock({ title, description, source, children }: { title: string; description: ReactNode; source: ExampleKey; children: () => ReactNode }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card sx={{ mb: 5, bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "hidden" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
        {title && <Typography sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>{title}</Typography>}
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit><Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", overflowX: "auto", p: 2 }}><Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box></Box></Collapse>
      <Box sx={{ bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", p: 2, "& a": { color: primary } }}>
        {description && <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography>}
        <Box data-app="true">{children()}</Box>
      </Box>
    </Card>
  );
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: .55, py: .18, borderRadius: .75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: .5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

const mdiPaths: Record<string, string> = {
  "mdi-account": mdiAccount,
  "mdi-account-group-outline": mdiAccountGroupOutline,
  "mdi-account-multiple": mdiAccountMultiple,
  "mdi-account-supervisor-circle": mdiAccountSupervisorCircle,
  "mdi-chevron-left": mdiChevronLeft,
  "mdi-clock-start": mdiClockStart,
  "mdi-dots-vertical": mdiDotsVertical,
  "mdi-email": mdiEmail,
  "mdi-filter": mdiFilter,
  "mdi-folder": mdiFolder,
  "mdi-help-box": mdiHelpBox,
  "mdi-home-city": mdiHomeCity,
  "mdi-image": mdiImage,
  "mdi-magnify": mdiMagnify,
  "mdi-star": mdiStar,
  "mdi-view-dashboard": mdiViewDashboard,
};

const sourceTemplates = {
  usage: "src/demo/examples/navigation-drawers/usage.vue",
  playground: "src/demo/examples/navigation-drawers/playground.vue",
  "simple/colored": "src/demo/examples/navigation-drawers/simple/colored.vue",
  "simple/permanent-floating": "src/demo/examples/navigation-drawers/simple/permanent-floating.vue",
  "simple/mini": "src/demo/examples/navigation-drawers/simple/mini.vue",
  "simple/temporary": "src/demo/examples/navigation-drawers/simple/temporary.vue",
  "simple/right": "src/demo/examples/navigation-drawers/simple/right.vue",
  "simple/expand-on-hover": "src/demo/examples/navigation-drawers/simple/expand-on-hover.vue",
  "intermediate/background": "src/demo/examples/navigation-drawers/intermediate/background.vue",
  "intermediate/combined": "src/demo/examples/navigation-drawers/intermediate/combined.vue",
  "complex/bottom-drawer": "src/demo/examples/navigation-drawers/complex/bottom-drawer.vue",
};
