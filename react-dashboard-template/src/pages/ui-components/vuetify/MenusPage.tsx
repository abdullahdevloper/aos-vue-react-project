import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { Avatar, Box, Button, Card, Checkbox, Collapse, Divider, IconButton, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { Code, GitHub, InvertColors, Menu as MenuIcon } from "@mui/icons-material";
import { mdiDotsVertical, mdiHeart } from "@mdi/js";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const indigo = "#3f51b5";
const blue = "#2196f3";
const purple = "#9c27b0";
const deepOrange = "#ff5722";
const deepPurpleAccent = "#6200ea";
const error = "#ff5252";
const tealDarken = "#00897b";
const shadow2 = "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)";
const shadow8 = "0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";

type ExampleKey = keyof typeof sourceTemplates;
type MenuItem = { title: string };
type Ripple = { id: number; x: number; y: number; size: number };
type MenuSide = "top" | "bottom";
type HorizontalSide = "left" | "right" | "center";
type TransitionKind = "scale" | "slide-x" | "slide-y";

const clickItems: MenuItem[] = [
  { title: "Click Me" },
  { title: "Click Me" },
  { title: "Click Me" },
  { title: "Click Me 2" },
];

const tooltipItems: MenuItem[] = [
  { title: "Click Me1" },
  { title: "Click Me2" },
  { title: "Click Me3" },
  { title: "Click Me4" },
];

export default function MenusPage() {
  return (
    <DocPage
      title="Menus"
      namespace="Components"
      icon={<MenuIcon />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Menus" },
      ]}
    >
      <DocText>The <CodePill>v-menu</CodePill> component shows a menu at the position of the element used to activate it.</DocText>
      <UsageSection />
      <PlaygroundSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <BaseHeading id="usage">Usage</BaseHeading>
      <VuetifyExampleBlock title="" source="usage" description={<>Remember to put the element that activates the menu in the <CodePill>activator</CodePill> slot.</>}>
        {() => <Centered><BasicMenu label="Dropdown" offsetY /></Centered>}
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
  const examples: Array<{ title: string; description: ReactNode; source: ExampleKey; render: () => ReactNode; badge?: string }> = [
    { title: "Absolute position", description: "Menus can also be placed absolutely on top of the activator element using the absolute prop. Try clicking anywhere on the image.", source: "simple/absolute", render: () => <AbsoluteExample /> },
    { title: "Menu with activator and tooltip", description: <>With the new <CodePill>v-slot</CodePill> syntax, nested activators such as those seen with a <CodePill>v-menu</CodePill> and <CodePill>v-tooltip</CodePill> attached to the same activator button, need a particular setup in order to function correctly. <strong>Note: this same syntax is used for other nested activators such as <CodePill>v-dialog</CodePill> w/ <CodePill>v-tooltip</CodePill>.</strong></>, source: "simple/menu-activator-tooltip", render: () => <TooltipMenuExample /> },
    { title: "Hover", description: "Menus can be accessed using hover instead of clicking with the open-on-hover prop.", source: "simple/hover", render: () => <Centered><BasicMenu label="Dropdown" openOnHover side="top" offsetY /></Centered> },
    { title: "Custom transitions", description: <>Vuetify comes with 3 standard transitions, <strong>scale</strong>, <strong>slide-x</strong> and <strong>slide-y</strong>. You can also create your own and pass it as the transition argument. For an example of how the stock transitions are constructed, visit <a href="https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/util/helpers.ts">here</a>.</>, source: "simple/custom-transition", render: () => <CustomTransitionExample /> },
    { title: "Disabled", description: "You can disable the menu. Disabled menus can't be opened.", source: "simple/disabled", render: () => <Centered><BasicMenu label="Dropdown" disabled side="top" offsetY /></Centered> },
    { title: "X offset", description: "Menu can be offset by the X axis to make the activator visible.", source: "simple/offset-x", render: () => <OffsetExample axis="x" /> },
    { title: "Y offset", description: "Menu can be offset by the Y axis to make the activator visible.", source: "simple/offset-y", render: () => <OffsetExample axis="y" /> },
    { title: "Rounded", description: <>Menus can have their border-radius set by the <CodePill>rounded</CodePill> prop. Additional information about rounded classes is on the <a href="/styles/border-radius">Border Radius page</a>.</>, source: "simple/rounded", render: () => <RoundedExample />, badge: "v2.3" },
    { title: "Close on click", description: "Menu can be closed when lost focus.", source: "simple/close-on-click", render: () => <CloseOnClickExample /> },
    { title: "Close on content click", description: <>You can configure whether <CodePill>v-menu</CodePill> should be closed when its content is clicked.</>, source: "simple/close-on-content-click", render: () => <CloseOnContentClickExample /> },
    { title: "Absolute position without activator", description: <>Menus can also be used without an activator by using <CodePill>absolute</CodePill> together with the props <CodePill>position-x</CodePill> and <CodePill>position-y</CodePill>. Try right-clicking anywhere on the image.</>, source: "intermediate/absolute-without-activator", render: () => <AbsoluteWithoutActivatorExample /> },
    { title: "Menus", description: "Menus can be placed within almost any component.", source: "intermediate/menus", render: () => <CardMenuExample /> },
    { title: "Popover menu", description: "A menu can be configured to be static when opened, allowing it to function as a popover. This can be useful when there are multiple interactive items within the menu contents.", source: "intermediate/popover", render: () => <PopoverExample /> },
  ];

  return (
    <Box component="section">
      <BaseHeading id="examples">Examples</BaseHeading>
      {examples.map((example) => (
        <VuetifyExampleBlock key={example.source} title={example.title} description={example.description} source={example.source} badge={example.badge}>
          {example.render}
        </VuetifyExampleBlock>
      ))}
    </Box>
  );
}

function PlaygroundExample() {
  const [disabled, setDisabled] = useState(false);
  const [absolute, setAbsolute] = useState(false);
  const [openOnHover, setOpenOnHover] = useState(false);
  const [closeOnClick, setCloseOnClick] = useState(true);
  const [closeOnContentClick, setCloseOnContentClick] = useState(true);
  const [offsetX, setOffsetX] = useState(false);
  const [offsetY, setOffsetY] = useState(true);
  const [value, setValue] = useState(false);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 1 }}>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
        <VSwitch label="Disabled" checked={disabled} onChange={setDisabled} />
        <VSwitch label="Absolute" checked={absolute} onChange={setAbsolute} />
        <VSwitch label="Open on hover" checked={openOnHover} onChange={setOpenOnHover} />
        <VSwitch label="Close on click" checked={closeOnClick} onChange={setCloseOnClick} />
        <VSwitch label="Close on content click" checked={closeOnContentClick} onChange={setCloseOnContentClick} />
        <VSwitch label="X offset" checked={offsetX} onChange={setOffsetX} />
        <VSwitch label="Y offset" checked={offsetY} onChange={setOffsetY} />
        <VSwitch label="Value" checked={value} onChange={setValue} />
      </Box>
      <VMenu
        open={value}
        onOpenChange={setValue}
        disabled={disabled}
        absolute={absolute}
        openOnHover={openOnHover}
        closeOnClick={closeOnClick}
        closeOnContentClick={closeOnContentClick}
        offsetX={offsetX}
        offsetY={offsetY}
        activator={<VButton>Dropdown</VButton>}
      >
        <MenuList items={clickItems} />
      </VMenu>
    </Box>
  );
}

function AbsoluteExample() {
  const [menu, setMenu] = useState<{ open: boolean; x: number; y: number }>({ open: false, x: 0, y: 0 });
  const rootRef = useRef<HTMLDivElement | null>(null);
  return (
    <Box ref={rootRef} sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
      <ImageCard
        height={300}
        width={600}
        onClick={(event) => {
          const rect = rootRef.current?.getBoundingClientRect();
          setMenu({ open: true, x: event.clientX - (rect?.left ?? 0), y: event.clientY - (rect?.top ?? 0) });
        }}
      />
      {menu.open && (
        <Box sx={{ position: "absolute", left: menu.x, top: menu.y + 8, zIndex: 30 }}>
          <MenuSurface>
            <MenuList items={clickItems} onItemClick={() => setMenu((current) => ({ ...current, open: false }))} />
          </MenuSurface>
        </Box>
      )}
    </Box>
  );
}

function TooltipMenuExample() {
  const [tooltip, setTooltip] = useState(false);
  const [menu, setMenu] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!menu) return;
    const close = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setMenu(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [menu]);

  return (
    <Centered>
      <Box ref={rootRef} sx={{ position: "relative", display: "inline-flex" }}>
        <Box
          onMouseEnter={() => setTooltip(true)}
          onMouseLeave={() => setTooltip(false)}
          onClick={() => setMenu((open) => !open)}
          sx={{ display: "inline-flex" }}
        >
          <VButton>Dropdown w/ Tooltip</VButton>
        </Box>
        {tooltip && (
          <Box sx={{ position: "absolute", left: "50%", top: "calc(100% + 8px)", transform: "translateX(-50%)", bgcolor: "rgba(97,97,97,.9)", color: "#fff", borderRadius: 1, px: 1, py: .5, fontSize: 12, whiteSpace: "nowrap", zIndex: 20 }}>
            Im A ToolTip
          </Box>
        )}
        {menu && (
          <Box sx={{ position: "absolute", left: "50%", top: "100%", transform: "translateX(-50%)", zIndex: 40, animation: "scaleMenuEnter 160ms cubic-bezier(.4,0,.2,1)", "@keyframes scaleMenuEnter": { "0%": { opacity: .2, transform: "translateX(-50%) scale(.86)" }, "100%": { opacity: 1, transform: "translateX(-50%) scale(1)" } } }}>
            <MenuSurface>
              <MenuList items={tooltipItems} onItemClick={() => setMenu(false)} />
            </MenuSurface>
          </Box>
        )}
      </Box>
    </Centered>
  );
}

function CustomTransitionExample() {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", gap: 2 }}>
      <BasicMenu label="Scale Transition" transition="scale" side="bottom" />
      <BasicMenu label="Slide X Transition" transition="slide-x" side="bottom" align="right" color={deepOrange} />
      <BasicMenu label="Slide Y Transition" transition="slide-y" side="bottom" color={purple} />
    </Box>
  );
}

function OffsetExample({ axis }: { axis: "x" | "y" }) {
  const [offset, setOffset] = useState(true);
  return (
    <Centered>
      <Stack alignItems="center" spacing={1}>
        <VSwitch label={axis === "x" ? "X offset" : "Y offset"} checked={offset} onChange={setOffset} />
        <BasicMenu label="Dropdown" side="top" offsetX={axis === "x" && offset} offsetY={axis === "y" && offset} />
      </Stack>
    </Centered>
  );
}

function RoundedExample() {
  const buttons: Array<[string, string, string | number]> = [
    ["Removed", deepPurpleAccent, 0],
    ["Large", error, 2],
    ["Custom", tealDarken, 6],
  ];
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
      {buttons.map(([text, color, rounded]) => (
        <Box key={text} sx={{ m: 4 }}>
          <BasicMenu label={`${text} Radius`} color={color} rounded={rounded} offsetY />
        </Box>
      ))}
    </Box>
  );
}

function CloseOnClickExample() {
  const [closeOnClick, setCloseOnClick] = useState(true);
  return (
    <Centered>
      <Stack alignItems="center" spacing={1}>
        <VSwitch label="Close on click" checked={closeOnClick} onChange={setCloseOnClick} />
        <BasicMenu label="Dropdown" side="top" closeOnClick={closeOnClick} />
      </Stack>
    </Centered>
  );
}

function CloseOnContentClickExample() {
  const [closeOnContentClick, setCloseOnContentClick] = useState(true);
  return (
    <Centered>
      <Stack alignItems="center" spacing={1}>
        <VSwitch label="Close on content click" checked={closeOnContentClick} onChange={setCloseOnContentClick} />
        <BasicMenu label="Dropdown" side="top" closeOnContentClick={closeOnContentClick} />
      </Stack>
    </Centered>
  );
}

function AbsoluteWithoutActivatorExample() {
  const [menu, setMenu] = useState<{ open: boolean; x: number; y: number }>({ open: false, x: 0, y: 0 });
  const rootRef = useRef<HTMLDivElement | null>(null);
  return (
    <Box ref={rootRef} sx={{ position: "relative" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ImageCard
          height={300}
          maxWidth={600}
          onContextMenu={(event) => {
            event.preventDefault();
            const rect = rootRef.current?.getBoundingClientRect();
            setMenu({ open: false, x: event.clientX - (rect?.left ?? 0), y: event.clientY - (rect?.top ?? 0) });
            window.setTimeout(() => setMenu((current) => ({ ...current, open: true })), 0);
          }}
        />
      </Box>
      {menu.open && (
        <Box sx={{ position: "absolute", left: menu.x, top: menu.y + 8, zIndex: 30 }}>
          <MenuSurface onClose={() => setMenu((current) => ({ ...current, open: false }))}>
            <MenuList items={clickItems} onItemClick={() => setMenu((current) => ({ ...current, open: false }))} />
          </MenuSurface>
        </Box>
      )}
    </Box>
  );
}

function CardMenuExample() {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", mx: -1.5 }}>
      <Box sx={{ flexBasis: { xs: "100%", sm: "50%" }, maxWidth: { xs: "100%", sm: "50%" }, ml: { sm: "25%" }, px: 1.5 }}>
        <Card sx={{ height: 200, borderRadius: 1, boxShadow: shadow2 }}>
          <Toolbar sx={{ minHeight: 64, height: 64, bgcolor: blue, color: "#fff", px: 2 }}>
            <Typography sx={{ fontSize: 24, lineHeight: "32px", flex: 1 }}>Menu</Typography>
            <VMenu side="bottom" align="right" activator={<VIconButton icon="mdi-dots-vertical" />}>
              <MenuList items={clickItems} />
            </VMenu>
          </Toolbar>
          <Typography sx={{ p: 2, color: "rgba(0,0,0,.6)", fontSize: 14 }}>Lorem Ipsum</Typography>
        </Card>
      </Box>
    </Box>
  );
}

function PopoverExample() {
  const [menu, setMenu] = useState(false);
  const [fav, setFav] = useState(true);
  const [message, setMessage] = useState(false);
  const [hints, setHints] = useState(true);
  return (
    <Centered>
      <VMenu open={menu} onOpenChange={setMenu} closeOnContentClick={false} offsetX nudgeWidth={200} activator={<VButton color={indigo}>Menu as Popover</VButton>}>
        <Card sx={{ width: 360, boxShadow: "none", borderRadius: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", minHeight: 72, px: 2 }}>
            <Avatar src="https://cdn.vuetifyjs.com/images/john.jpg" sx={{ width: 40, height: 40, mr: 2 }} />
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: 16, lineHeight: "24px" }}>John Leider</Typography>
              <Typography sx={{ fontSize: 14, lineHeight: "20px", color: "rgba(0,0,0,.6)" }}>Founder of Vuetify.js</Typography>
            </Box>
            <IconButton onClick={() => setFav((value) => !value)} sx={{ color: fav ? "#f44336" : "rgba(0,0,0,.54)" }}><VIcon icon="mdi-heart" /></IconButton>
          </Box>
          <Divider />
          <VListControl label="Enable messages" checked={message} onChange={setMessage} />
          <VListControl label="Enable hints" checked={hints} onChange={setHints} />
          <Box sx={{ display: "flex", justifyContent: "flex-end", px: 1, py: 1 }}>
            <VTextButton onClick={() => setMenu(false)}>Cancel</VTextButton>
            <VTextButton color={primary} onClick={() => setMenu(false)}>Save</VTextButton>
          </Box>
        </Card>
      </VMenu>
    </Centered>
  );
}

function BasicMenu(props: Partial<VMenuProps> & { label: string; color?: string }) {
  const { label, color = primary, ...menuProps } = props;
  return (
    <VMenu {...menuProps} activator={<VButton color={color}>{label}</VButton>}>
      <MenuList items={clickItems} />
    </VMenu>
  );
}

interface VMenuProps {
  activator: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  absolute?: boolean;
  openOnHover?: boolean;
  closeOnClick?: boolean;
  closeOnContentClick?: boolean;
  offsetX?: boolean;
  offsetY?: boolean;
  side?: MenuSide;
  align?: HorizontalSide;
  transition?: TransitionKind;
  rounded?: string | number;
  nudgeWidth?: number;
}

function VMenu({ activator, children, open, onOpenChange, disabled = false, absolute = false, openOnHover = false, closeOnClick = true, closeOnContentClick = true, offsetX = false, offsetY = false, side = "bottom", align = "center", transition = "scale", rounded = 1, nudgeWidth = 0 }: VMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const isOpen = open ?? internalOpen;
  const setOpen = (next: boolean) => {
    if (disabled) return;
    onOpenChange?.(next);
    if (open === undefined) setInternalOpen(next);
  };

  useEffect(() => {
    if (!isOpen || !closeOnClick) return;
    const close = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [closeOnClick, isOpen]);

  const hoverProps = openOnHover ? { onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false) } : {};

  return (
    <Box ref={rootRef} sx={{ display: "inline-flex", position: "relative", maxWidth: absolute ? 600 : "none" }} {...hoverProps}>
      <Box onClick={() => !openOnHover && setOpen(!isOpen)} sx={{ display: "inline-flex", cursor: disabled ? "default" : "pointer", opacity: disabled ? .6 : 1 }}>{activator}</Box>
      {isOpen && !disabled && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 40,
            minWidth: 112 + nudgeWidth,
            top: side === "bottom" ? offsetY ? "calc(100% + 8px)" : "100%" : "auto",
            bottom: side === "top" ? offsetY ? "calc(100% + 8px)" : "100%" : "auto",
            left: align === "left" ? 0 : align === "right" ? "auto" : offsetX ? "calc(100% + 8px)" : "50%",
            right: align === "right" ? 0 : "auto",
            transform: align === "center" && !offsetX ? "translateX(-50%)" : "none",
            animation: `${transition}MenuEnter 160ms cubic-bezier(.4,0,.2,1)`,
            "@keyframes scaleMenuEnter": { "0%": { opacity: .2, transform: `${align === "center" && !offsetX ? "translateX(-50%) " : ""}scale(.86)` }, "100%": { opacity: 1, transform: `${align === "center" && !offsetX ? "translateX(-50%) " : ""}scale(1)` } },
            "@keyframes slide-xMenuEnter": { "0%": { opacity: .2, transform: "translateX(-16px)" }, "100%": { opacity: 1, transform: "translateX(0)" } },
            "@keyframes slide-yMenuEnter": { "0%": { opacity: .2, transform: "translateY(-16px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
          }}
          onClick={() => {
            if (closeOnContentClick) setOpen(false);
          }}
        >
          <MenuSurface rounded={rounded}>{children}</MenuSurface>
        </Box>
      )}
    </Box>
  );
}

function MenuSurface({ children, rounded = 1, onClose: _onClose }: { children: ReactNode; rounded?: string | number; onClose?: () => void }) {
  return <Box sx={{ bgcolor: "#fff", boxShadow: shadow8, borderRadius: rounded, overflow: "hidden", minWidth: 112 }}>{children}</Box>;
}

function MenuList({ items, onItemClick }: { items: MenuItem[]; onItemClick?: () => void }) {
  return (
    <Box sx={{ py: 1 }}>
      {items.map((item, index) => <MenuListItem key={`${item.title}-${index}`} title={item.title} onClick={onItemClick} />)}
    </Box>
  );
}

function MenuListItem({ title, onClick }: { title: string; onClick?: () => void }) {
  const { ripples, triggerRipple } = useVuetifyRipple();
  return (
    <Box component="button" type="button" onPointerDown={triggerRipple} onClick={onClick} sx={{ width: "100%", minHeight: 48, display: "flex", alignItems: "center", border: 0, bgcolor: "transparent", color: "rgba(0,0,0,.87)", px: 2, textAlign: "left", cursor: "pointer", position: "relative", overflow: "hidden", "&:hover": { bgcolor: "rgba(0,0,0,.04)" } }}>
      <Typography sx={{ fontSize: 16, lineHeight: "24px" }}>{title}</Typography>
      <RippleLayer ripples={ripples} />
    </Box>
  );
}

function VButton({ children, color = primary }: { children: ReactNode; color?: string }) {
  const { ripples, triggerRipple } = useVuetifyRipple();
  return (
    <Button onPointerDown={triggerRipple} disableRipple sx={{ minWidth: 64, height: 36, px: 2, borderRadius: 1, bgcolor: color, color: "#fff", boxShadow: shadow2, textTransform: "uppercase", fontSize: 14, fontWeight: 500, letterSpacing: .4, position: "relative", overflow: "hidden", "&:hover": { bgcolor: color } }}>
      {children}
      <RippleLayer ripples={ripples} />
    </Button>
  );
}

function VTextButton({ children, color = "rgba(0,0,0,.7)", onClick }: { children: ReactNode; color?: string; onClick: () => void }) {
  const { ripples, triggerRipple } = useVuetifyRipple();
  return <Button onPointerDown={triggerRipple} onClick={onClick} disableRipple sx={{ height: 36, px: 2, minWidth: 64, color, textTransform: "uppercase", position: "relative", overflow: "hidden" }}>{children}<RippleLayer ripples={ripples} /></Button>;
}

function VIconButton({ icon }: { icon: string }) {
  return <IconButton sx={{ color: "#fff", width: 48, height: 48 }}><VIcon icon={icon} /></IconButton>;
}

function VIcon({ icon, size = 24 }: { icon: string; size?: number }) {
  return <Box component="svg" viewBox="0 0 24 24" sx={{ width: size, height: size, display: "block", color: "currentColor" }}><Box component="path" d={mdiPaths[icon]} fill="currentColor" /></Box>;
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

function VListControl({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", minHeight: 48, px: 2 }}>
      <Box sx={{ minWidth: 56 }}><VSwitch label="" checked={checked} onChange={onChange} /></Box>
      <Typography sx={{ fontSize: 16 }}>{label}</Typography>
    </Box>
  );
}

function ImageCard({ height, width, maxWidth, onContextMenu, onClick }: { height: number; width?: number; maxWidth?: number; onContextMenu?: (event: MouseEvent<HTMLDivElement>) => void; onClick?: (event: MouseEvent<HTMLDivElement>) => void }) {
  return <Card onContextMenu={onContextMenu} onClick={onClick} sx={{ height, width: width ?? "100%", maxWidth: maxWidth ?? width, borderRadius: 1, boxShadow: shadow2, cursor: onClick || onContextMenu ? "pointer" : "default", backgroundImage: "url(https://cdn.vuetifyjs.com/images/cards/girl.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} />;
}

function Centered({ children }: { children: ReactNode }) {
  return <Box sx={{ textAlign: "center" }}>{children}</Box>;
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
      {ripples.map((ripple) => (
        <Box key={ripple.id} sx={{ position: "absolute", left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size, borderRadius: "50%", bgcolor: "currentColor", opacity: 0, transform: "scale(0)", animation: "vMenuRipple 560ms cubic-bezier(.25,.8,.5,1)", "@keyframes vMenuRipple": { "0%": { opacity: .18, transform: "scale(0)" }, "45%": { opacity: .14, transform: "scale(.55)" }, "100%": { opacity: 0, transform: "scale(1)" } } }} />
      ))}
    </Box>
  );
}

function BaseHeading({ id, children }: { id: string; children: ReactNode }) {
  return <Typography id={id} variant="h5" sx={{ fontSize: { xs: 20, md: 22 }, lineHeight: 1.45, fontWeight: 400, mb: 2.5 }}>{children}</Typography>;
}

function VuetifyExampleBlock({ title, description, source, children, badge }: { title: string; description: ReactNode; source: ExampleKey; children: () => ReactNode; badge?: string }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card sx={{ mb: 5, bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
        {title && <Typography sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>{title}</Typography>}
        {badge && <Box sx={{ ml: 1, px: .75, height: 20, borderRadius: 10, bgcolor: primary, color: "#fff", fontSize: 11, display: "flex", alignItems: "center" }}>{badge}</Box>}
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit><Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", overflowX: "auto", p: 2 }}><Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box></Box></Collapse>
      <Box sx={{ bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", p: 2, overflow: "visible", "& a": { color: primary } }}>
        {description && <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography>}
        <Box data-app="true" sx={{ overflow: "visible" }}>{children()}</Box>
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
  "mdi-dots-vertical": mdiDotsVertical,
  "mdi-heart": mdiHeart,
};

const sourceTemplates = {
  usage: "src/demo/examples/menus/usage.vue",
  playground: "src/demo/examples/menus/playground.vue",
  "simple/absolute": "src/demo/examples/menus/simple/absolute.vue",
  "simple/menu-activator-tooltip": "src/demo/examples/menus/simple/menu-activator-tooltip.vue",
  "simple/hover": "src/demo/examples/menus/simple/hover.vue",
  "simple/custom-transition": "src/demo/examples/menus/simple/custom-transition.vue",
  "simple/disabled": "src/demo/examples/menus/simple/disabled.vue",
  "simple/offset-x": "src/demo/examples/menus/simple/offset-x.vue",
  "simple/offset-y": "src/demo/examples/menus/simple/offset-y.vue",
  "simple/rounded": "src/demo/examples/menus/simple/rounded.vue",
  "simple/close-on-click": "src/demo/examples/menus/simple/close-on-click.vue",
  "simple/close-on-content-click": "src/demo/examples/menus/simple/close-on-content-click.vue",
  "intermediate/absolute-without-activator": "src/demo/examples/menus/intermediate/absolute-without-activator.vue",
  "intermediate/menus": "src/demo/examples/menus/intermediate/menus.vue",
  "intermediate/popover": "src/demo/examples/menus/intermediate/popover.vue",
};
