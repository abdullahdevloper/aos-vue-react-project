import { useEffect, useState, type PointerEvent, type ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Radio,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { ArrowDropDown, Close, Code, GitHub, InvertColors, MoreVert, ViewModule } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const greenDarken1 = "#43a047";
const blueDarken1 = "#1e88e5";
const redLighten2 = "#e57373";
const purpleDarken2 = "#7b1fa2";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const docsParagraphSx = { fontSize: { xs: 17, md: 18.5 }, lineHeight: 1.72, fontWeight: 300, mb: 4 };

interface DialogExample {
  title: string;
  description: ReactNode;
  source: keyof typeof sourceTemplates;
  minHeight: number;
  uninverted?: boolean;
  render: (inverted: boolean) => ReactNode;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
  leaving: boolean;
}

export default function DialogsPage() {
  return (
    <DocPage
      title="Dialogs"
      namespace="Components"
      icon={<ViewModule />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Dialogs" },
      ]}
    >
      <DocText>
        The <CodePill>v-dialog</CodePill> component inform users about a specific task and may contain critical information, require decisions, or involve multiple tasks. Use dialogs sparingly because they are interruptive.
      </DocText>
      <UsageSection />
      <ExamplesSection />
    </DocPage>
  );
}

function UsageSection() {
  const [open, setOpen] = useState(false);

  return (
    <Box component="section" sx={{ mb: 6.5 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Usage
      </Typography>
      <Typography color="text.secondary" sx={docsParagraphSx}>
        A dialog contains two slots, one for its activator and one for its content (default). Good for Privacy Policies.
      </Typography>
      <Card variant="outlined" sx={{ bgcolor: "background.default", borderColor: "rgba(111,125,133,.18)", boxShadow: "none", overflow: "hidden", mb: 6 }}>
        <Box sx={{ minHeight: 300, p: { xs: 3, md: 4 }, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <VBtn color={redLighten2} dark onClick={() => setOpen(true)}>Click Me</VBtn>
          <VDialog open={open} width={500} onClose={() => setOpen(false)}>
            <VCard>
              <Box sx={{ px: 3, py: 2, bgcolor: "#eeeeee" }}>
                <Typography sx={{ fontSize: 24, fontWeight: 400 }}>Privacy Policy</Typography>
              </Box>
              <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </CardText>
              <Divider />
              <CardActions>
                <VBtn text color={primary} onClick={() => setOpen(false)}>I accept</VBtn>
              </CardActions>
            </VCard>
          </VDialog>
        </Box>
      </Card>
    </Box>
  );
}

function ExamplesSection() {
  return (
    <Box component="section">
      <Typography variant="h5" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 500, mb: 1.4 }}>
        Examples
      </Typography>
      <Stack spacing={5.5}>
        {dialogExamples.map((example) => (
          <VuetifyExampleBlock key={example.title} title={example.title} description={example.description} source={example.source} minHeight={example.minHeight} uninverted={example.uninverted}>
            {(inverted) => example.render(inverted)}
          </VuetifyExampleBlock>
        ))}
      </Stack>
    </Box>
  );
}

function VuetifyExampleBlock({ title, description, source, children, minHeight, uninverted = false }: { title: string; description: ReactNode; source: keyof typeof sourceTemplates; children: (inverted: boolean) => ReactNode; minHeight: number; uninverted?: boolean }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  const effectiveInverted = uninverted ? false : inverted;

  return (
    <Card sx={{ bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "hidden" }}>
      <Toolbar variant="dense" sx={{ minHeight: 74, alignItems: "center", px: { xs: 3, md: 4 }, bgcolor: "transparent" }}>
        <Typography sx={{ fontSize: { xs: 22, md: 25 }, fontWeight: 500, lineHeight: 1.35 }}>{title}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        {!uninverted && (
          <Tooltip title="Invert example colors">
            <IconButton size="small" aria-label="Invert example colors" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}>
              <InvertColors sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="View on Github"><IconButton size="small" aria-label="View on Github" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton size="small" aria-label="View source" aria-expanded={sourceOpen} onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", maxHeight: { xs: "none", sm: "calc(100vh - 275px)" }, overflowY: "auto", p: 2 }}>
          <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', 'SFMono-Regular', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap", color: "#f8f8f2" }}>{sourceTemplates[source]}</Box>
        </Box>
      </Collapse>
      <Box sx={{ px: { xs: 3, md: 4 }, py: { xs: 3.5, md: 4.25 }, minHeight, bgcolor: effectiveInverted ? "#303030" : "transparent", color: effectiveInverted ? "rgba(255,255,255,.92)" : "inherit", transition: "background-color 180ms ease, color 180ms ease" }}>
        <Typography sx={{ color: effectiveInverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: 16.5, fontWeight: 300, lineHeight: 1.7, mb: 3 }}>{description}</Typography>
        {children(effectiveInverted)}
      </Box>
    </Card>
  );
}

function VDialog({ open, children, onClose, width, maxWidth, fullscreen, persistent, hideOverlay, scrollable, bottomTransition }: { open: boolean; children: ReactNode; onClose: () => void; width?: number | string; maxWidth?: number | string; fullscreen?: boolean; persistent?: boolean; hideOverlay?: boolean; scrollable?: boolean; bottomTransition?: boolean }) {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !persistent) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, persistent]);

  if (!open) return null;

  const outside = () => {
    if (!persistent) {
      onClose();
      return;
    }
    setShake(true);
    window.setTimeout(() => setShake(false), 170);
  };

  return (
    <Box sx={{ position: "fixed", inset: 0, zIndex: 1800, display: "flex", alignItems: fullscreen ? "stretch" : "center", justifyContent: "center", p: fullscreen ? 0 : 3 }}>
      {!hideOverlay && <Box onMouseDown={outside} sx={{ position: "absolute", inset: 0, bgcolor: "rgba(33,33,33,.46)" }} />}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: fullscreen ? "100vw" : width || maxWidth || "auto",
          maxWidth: fullscreen ? "100vw" : maxWidth || width || "calc(100vw - 48px)",
          maxHeight: fullscreen ? "100vh" : "90vh",
          display: scrollable || fullscreen ? "flex" : "block",
          flexDirection: "column",
          overflow: fullscreen ? "hidden" : "visible",
          animation: `${shake ? "animate-dialog" : bottomTransition ? "dialog-bottom" : "dialog-scale"} ${shake ? "150ms" : "300ms"} cubic-bezier(.4,0,.6,1)`,
          "@keyframes dialog-scale": { from: { opacity: 0, transform: "scale(.5)" }, to: { opacity: 1, transform: "scale(1)" } },
          "@keyframes dialog-bottom": { from: { opacity: 0, transform: "translateY(100%)" }, to: { opacity: 1, transform: "translateY(0)" } },
          "@keyframes animate-dialog": { "0%": { transform: "scale(1)" }, "50%": { transform: "scale(1.03)" }, "100%": { transform: "scale(1)" } },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function WithoutActivatorExample() {
  const [open, setOpen] = useState(false);
  return (
    <CenterRow>
      <VBtn color={primary} dark onClick={() => setOpen(true)}>Open Dialog</VBtn>
      <LocationDialog open={open} onClose={() => setOpen(false)} />
    </CenterRow>
  );
}

function ModalExample() {
  const [open, setOpen] = useState(false);
  return (
    <CenterRow>
      <VBtn color={primary} dark onClick={() => setOpen(true)}>Open Dialog</VBtn>
      <LocationDialog open={open} onClose={() => setOpen(false)} persistent />
    </CenterRow>
  );
}

function LocationDialog({ open, onClose, persistent }: { open: boolean; onClose: () => void; persistent?: boolean }) {
  return (
    <VDialog open={open} maxWidth={290} persistent={persistent} onClose={onClose}>
      <VCard>
        <CardTitle>Use Google&apos;s location service?</CardTitle>
        <CardText>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</CardText>
        <CardActions>
          <VBtn text color={greenDarken1} onClick={onClose}>Disagree</VBtn>
          <VBtn text color={greenDarken1} onClick={onClose}>Agree</VBtn>
        </CardActions>
      </VCard>
    </VDialog>
  );
}

function ScrollableExample() {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const countries = ["Bahamas, The", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi"];

  return (
    <CenterRow>
      <VBtn color={primary} dark onClick={() => setOpen(true)}>Open Dialog</VBtn>
      <VDialog open={open} maxWidth="300px" scrollable onClose={() => setOpen(false)}>
        <VCard>
          <CardTitle>Select Country</CardTitle>
          <Divider />
          <Box sx={{ height: 300, overflowY: "auto", py: 1 }}>
            {countries.map((item) => (
              <Box key={item} onClick={() => setCountry(item.toLowerCase().replace(/[^a-z]+/g, "-"))} sx={{ minHeight: 40, px: 2, display: "flex", alignItems: "center", cursor: "pointer" }}>
                <Radio checked={country === item.toLowerCase().replace(/[^a-z]+/g, "-")} sx={radioSx} />
                <Typography sx={{ fontSize: 16 }}>{item}</Typography>
              </Box>
            ))}
          </Box>
          <Divider />
          <Box sx={{ px: 2, py: 1, display: "flex", justifyContent: "flex-end" }}>
            <VBtn text color={blueDarken1} onClick={() => setOpen(false)}>Close</VBtn>
            <VBtn text color={blueDarken1} onClick={() => setOpen(false)}>Save</VBtn>
          </Box>
        </VCard>
      </VDialog>
    </CenterRow>
  );
}

function OverflowedExample() {
  const [open, setOpen] = useState(false);
  return (
    <CenterRow>
      <VBtn color={primary} dark onClick={() => setOpen(true)}>Open Dialog</VBtn>
      <VDialog open={open} width="600px" onClose={() => setOpen(false)}>
        <VCard sx={{ maxHeight: "90vh", overflowY: "auto" }}>
          <CardTitle><span>Use Google&apos;s location service?</span></CardTitle>
          <CardText>{longOverflowText}</CardText>
          <CardActions>
            <VBtn text color={greenDarken1} onClick={() => setOpen(false)}>Disagree</VBtn>
            <VBtn text color={greenDarken1} onClick={() => setOpen(false)}>Agree</VBtn>
          </CardActions>
        </VCard>
      </VDialog>
    </CenterRow>
  );
}

function FormExample() {
  const [open, setOpen] = useState(false);
  return (
    <CenterRow>
      <VBtn color={primary} dark onClick={() => setOpen(true)}>Open Dialog</VBtn>
      <VDialog open={open} maxWidth="600px" persistent onClose={() => setOpen(false)}>
        <VCard>
          <CardTitle><span>User Profile</span></CardTitle>
          <CardText>
            <Box sx={{ px: 1.5 }}>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: 2 }}>
                <VField label="Legal first name*" />
                <VField label="Legal middle name" helper="example of helper text only on focus" />
                <VField label="Legal last name*" helper="example of persistent helper text" persistent />
              </Box>
              <Box sx={{ display: "grid", gap: 2, mt: 2 }}>
                <VField label="Email*" />
                <VField label="Password*" type="password" />
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2, mt: 2 }}>
                <VSelectField label="Age*" items={["0-17", "18-29", "30-54", "54+"]} />
                <VSelectField label="Interests" items={["Skiing", "Ice hockey", "Soccer", "Basketball", "Hockey", "Reading", "Writing", "Coding", "Basejump"]} multiple />
              </Box>
            </Box>
            <Typography component="small" sx={{ display: "block", mt: 2 }}>*indicates required field</Typography>
          </CardText>
          <CardActions>
            <VBtn text color={blueDarken1} onClick={() => setOpen(false)}>Close</VBtn>
            <VBtn text color={blueDarken1} onClick={() => setOpen(false)}>Save</VBtn>
          </CardActions>
        </VCard>
      </VDialog>
    </CenterRow>
  );
}

function LoaderExample() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => setOpen(false), 4000);
    return () => window.clearTimeout(timer);
  }, [open]);

  return (
    <Box sx={{ textAlign: "center" }}>
      <VBtn color={purpleDarken2} dark disabled={open} loading={open} onClick={() => setOpen(true)}>Start loading</VBtn>
      <VDialog open={open} width={300} hideOverlay persistent onClose={() => undefined}>
        <VCard sx={{ bgcolor: primary, color: "#fff" }}>
          <CardText sx={{ color: "#fff" }}>
            Please stand by
            <LinearProgress sx={{ mt: 2, bgcolor: "rgba(255,255,255,.35)", "& .MuiLinearProgress-bar": { bgcolor: "#fff" } }} />
          </CardText>
        </VCard>
      </VDialog>
    </Box>
  );
}

function FullscreenExample() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [sound, setSound] = useState(true);
  const [widgets, setWidgets] = useState(false);
  return (
    <CenterRow>
      <VBtn color={primary} dark onClick={() => setOpen(true)}>Open Dialog</VBtn>
      <VDialog open={open} fullscreen hideOverlay bottomTransition onClose={() => setOpen(false)}>
        <SettingsCard onClose={() => setOpen(false)} notifications={notifications} setNotifications={setNotifications} sound={sound} setSound={setSound} widgets={widgets} setWidgets={setWidgets} />
      </VDialog>
    </CenterRow>
  );
}

function AdvancedExample() {
  const [dialog, setDialog] = useState(false);
  const [dialog2, setDialog2] = useState(false);
  const [dialog3, setDialog3] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [sound, setSound] = useState(true);
  const [widgets, setWidgets] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [toolbarMenuAnchor, setToolbarMenuAnchor] = useState<HTMLElement | null>(null);
  const [dialog3MenuAnchor, setDialog3MenuAnchor] = useState<HTMLElement | null>(null);

  return (
    <Box>
      <CenterRow wrap>
        <VBtn color={primary} dark onClick={() => setDialog(true)} sx={{ m: 1 }}>Open Dialog 1</VBtn>
        <VBtn color={primary} dark onClick={() => setDialog2(true)} sx={{ m: 1 }}>Open Dialog 2</VBtn>
        <VBtn color={primary} dark onClick={() => setDialog3(true)} sx={{ m: 1 }}>Open Dialog 3</VBtn>
        <VBtn onClick={(event) => setMenuAnchor(event.currentTarget)} sx={{ m: 1 }}>A Menu</VBtn>
        <ClickMenu anchor={menuAnchor} onClose={() => setMenuAnchor(null)} />
      </CenterRow>

      <VDialog open={dialog} fullscreen hideOverlay scrollable bottomTransition onClose={() => setDialog(false)}>
        <SettingsCard
          onClose={() => setDialog(false)}
          notifications={notifications}
          setNotifications={setNotifications}
          sound={sound}
          setSound={setSound}
          widgets={widgets}
          setWidgets={setWidgets}
          toolbarMenuAnchor={toolbarMenuAnchor}
          setToolbarMenuAnchor={setToolbarMenuAnchor}
          bodyTop={<><VBtn color={primary} dark onClick={() => setDialog2((value) => !value)} sx={{ m: 1 }}>Open Dialog 2</VBtn><Tooltip title="Tool Tip" placement="right"><Box component="span" sx={{ display: "inline-flex" }}><VBtn sx={{ m: 1 }}>Tool Tip Activator</VBtn></Box></Tooltip></>}
        />
      </VDialog>

      <VDialog open={dialog2} maxWidth="500px" onClose={() => setDialog2(false)}>
        <VCard>
          <CardTitle>Dialog 2</CardTitle>
          <CardText>
            <VBtn color={primary} dark onClick={() => setDialog3((value) => !value)}>Open Dialog 3</VBtn>
            <VSelectField label="A Select List" items={["State 1", "State 2", "State 3", "State 4", "State 5", "State 6", "State 7"]} sx={{ mt: 2 }} />
          </CardText>
          <Box sx={{ px: 2, py: 1 }}>
            <VBtn text color={primary} onClick={() => setDialog2(false)}>Close</VBtn>
          </Box>
        </VCard>
      </VDialog>

      <VDialog open={dialog3} maxWidth="500px" onClose={() => setDialog3(false)}>
        <VCard>
          <Box sx={{ minHeight: 64, px: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: 20 }}>Dialog 3</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton onClick={(event) => setDialog3MenuAnchor(event.currentTarget)}><MoreVert /></IconButton>
            <ClickMenu anchor={dialog3MenuAnchor} onClose={() => setDialog3MenuAnchor(null)} />
          </Box>
          <Box sx={{ px: 2, py: 1 }}>
            <VBtn text color={primary} onClick={() => setDialog3(false)}>Close</VBtn>
          </Box>
        </VCard>
      </VDialog>
    </Box>
  );
}

function SettingsCard({ onClose, notifications, setNotifications, sound, setSound, widgets, setWidgets, bodyTop, toolbarMenuAnchor, setToolbarMenuAnchor }: { onClose: () => void; notifications: boolean; setNotifications: (value: boolean) => void; sound: boolean; setSound: (value: boolean) => void; widgets: boolean; setWidgets: (value: boolean) => void; bodyTop?: ReactNode; toolbarMenuAnchor?: HTMLElement | null; setToolbarMenuAnchor?: (value: HTMLElement | null) => void }) {
  return (
    <VCard sx={{ width: "100vw", height: "100vh", borderRadius: 0, display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ minHeight: 64, bgcolor: primary, color: "#fff", px: 0.5 }}>
        <IconButton sx={{ color: "#fff" }} onClick={onClose}><Close /></IconButton>
        <Typography sx={{ fontSize: 20, fontWeight: 500 }}>Settings</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <VBtn text color="#fff" dark onClick={onClose}>Save</VBtn>
        {setToolbarMenuAnchor && (
          <>
            <IconButton sx={{ color: "#fff" }} onClick={(event) => setToolbarMenuAnchor(event.currentTarget)}><MoreVert /></IconButton>
            <ClickMenu anchor={toolbarMenuAnchor || null} onClose={() => setToolbarMenuAnchor(null)} />
          </>
        )}
      </Toolbar>
      <Box sx={{ flex: 1, overflowY: "auto", bgcolor: "#fff", color: "rgba(0,0,0,.87)" }}>
        {bodyTop}
        <SettingsLists notifications={notifications} setNotifications={setNotifications} sound={sound} setSound={setSound} widgets={widgets} setWidgets={setWidgets} />
      </Box>
    </VCard>
  );
}

function SettingsLists({ notifications, setNotifications, sound, setSound, widgets, setWidgets }: { notifications: boolean; setNotifications: (value: boolean) => void; sound: boolean; setSound: (value: boolean) => void; widgets: boolean; setWidgets: (value: boolean) => void }) {
  return (
    <>
      <ListBlock title="User Controls" items={[
        ["Content filtering", "Set the content filtering level to restrict apps that can be downloaded"],
        ["Password", "Require password for purchase or use password to restrict purchase"],
      ]} />
      <Divider />
      <Box sx={{ py: 1 }}>
        <Typography sx={{ px: 2, py: 1, color: "rgba(0,0,0,.54)", fontSize: 14 }}>General</Typography>
        <CheckItem title="Notifications" subtitle="Notify me about updates to apps or games that I downloaded" checked={notifications} onChange={setNotifications} />
        <CheckItem title="Sound" subtitle="Auto-update apps at any time. Data charges may apply" checked={sound} onChange={setSound} />
        <CheckItem title="Auto-add widgets" subtitle="Automatically add home screen widgets" checked={widgets} onChange={setWidgets} />
      </Box>
    </>
  );
}

function ListBlock({ title, items }: { title: string; items: string[][] }) {
  return (
    <Box sx={{ py: 1 }}>
      <Typography sx={{ px: 2, py: 1, color: "rgba(0,0,0,.54)", fontSize: 14 }}>{title}</Typography>
      {items.map(([main, sub]) => (
        <Box key={main} sx={{ minHeight: 72, px: 2, display: "flex", alignItems: "center" }}>
          <Box>
            <Typography sx={{ fontSize: 16 }}>{main}</Typography>
            <Typography sx={{ fontSize: 14, color: "rgba(0,0,0,.60)" }}>{sub}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function CheckItem({ title, subtitle, checked, onChange }: { title: string; subtitle: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <Box sx={{ minHeight: 72, px: 2, display: "flex", alignItems: "center" }}>
      <Checkbox checked={checked} onChange={(event) => onChange(event.target.checked)} sx={{ color: "rgba(0,0,0,.54)", "&.Mui-checked": { color: primary }, mr: 2 }} />
      <Box>
        <Typography sx={{ fontSize: 16 }}>{title}</Typography>
        <Typography sx={{ fontSize: 14, color: "rgba(0,0,0,.60)" }}>{subtitle}</Typography>
      </Box>
    </Box>
  );
}

function ClickMenu({ anchor, onClose }: { anchor: HTMLElement | null; onClose: () => void }) {
  const items = ["Click Me", "Click Me", "Click Me", "Click Me 2"];
  return (
    <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={onClose} sx={{ zIndex: 2400 }} PaperProps={{ sx: { minWidth: 128, boxShadow: "0px 5px 5px -3px rgba(0,0,0,.2), 0px 8px 10px 1px rgba(0,0,0,.14), 0px 3px 14px 2px rgba(0,0,0,.12)" } }}>
      {items.map((item, index) => <MenuItem key={`${item}-${index}`} onClick={onClose}>{item}</MenuItem>)}
    </Menu>
  );
}

function VCard({ children, sx = {} }: { children: ReactNode; sx?: Record<string, unknown> }) {
  return <Card sx={{ bgcolor: "#fff", color: "rgba(0,0,0,.87)", borderRadius: 1, boxShadow: "0px 11px 15px -7px rgba(0,0,0,.2), 0px 24px 38px 3px rgba(0,0,0,.14), 0px 9px 46px 8px rgba(0,0,0,.12)", overflow: "hidden", ...sx }}>{children}</Card>;
}

function CardTitle({ children }: { children: ReactNode }) {
  return <Box sx={{ px: 3, py: 2 }}><Typography sx={{ fontSize: 20, fontWeight: 500, lineHeight: 1.4 }}>{children}</Typography></Box>;
}

function CardText({ children, sx = {} }: { children: ReactNode; sx?: Record<string, unknown> }) {
  return <Box sx={{ px: 3, py: 2, color: "rgba(0,0,0,.60)", fontSize: 14, lineHeight: 1.5, ...sx }}>{children}</Box>;
}

function CardActions({ children }: { children: ReactNode }) {
  return <Box sx={{ px: 2, py: 1, display: "flex", justifyContent: "flex-end", gap: 0.5 }}>{children}</Box>;
}

function CenterRow({ children, wrap = false }: { children: ReactNode; wrap?: boolean }) {
  return <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: wrap ? "wrap" : "nowrap" }}>{children}</Box>;
}

function VBtn({ children, onClick, color, text, dark, disabled, loading, sx = {} }: { children: ReactNode; onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; color?: string; text?: boolean; dark?: boolean; disabled?: boolean; loading?: boolean; sx?: Record<string, unknown> }) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const handleRipple = (event: PointerEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.2;
    const id = window.performance.now();
    const ripple = { id, x: event.clientX - rect.left - size / 2, y: event.clientY - rect.top - size / 2, size, leaving: false };
    setRipples((current) => [...current.slice(-2), ripple]);
    window.setTimeout(() => setRipples((current) => current.map((item) => (item.id === id ? { ...item, leaving: true } : item))), 250);
    window.setTimeout(() => setRipples((current) => current.filter((item) => item.id !== id)), 560);
  };

  return (
    <Button
      disabled={disabled}
      disableRipple
      onPointerDown={handleRipple}
      onClick={onClick}
      sx={{
        minHeight: 36,
        px: 2,
        borderRadius: 1,
        color: text ? color || primary : dark ? "#fff" : "rgba(0,0,0,.87)",
        bgcolor: text ? "transparent" : color || "#f5f5f5",
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: 0,
        textTransform: "uppercase",
        textIndent: 0,
        position: "relative",
        overflow: "hidden",
        boxShadow: text ? "none" : "0px 3px 1px -2px rgba(0,0,0,.2), 0px 2px 2px 0px rgba(0,0,0,.14), 0px 1px 5px 0px rgba(0,0,0,.12)",
        transitionDuration: ".28s",
        transitionProperty: "box-shadow, transform, opacity",
        transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          bgcolor: "currentColor",
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity .28s cubic-bezier(.4,0,.2,1)",
        },
        "&:hover::before": { opacity: 0.08 },
        "&:focus-visible::before": { opacity: 0.24 },
        "&:active": { boxShadow: text ? "none" : "0px 5px 5px -3px rgba(0,0,0,.2), 0px 8px 10px 1px rgba(0,0,0,.14), 0px 3px 14px 2px rgba(0,0,0,.12)" },
        "&:hover": { bgcolor: text ? "transparent" : color || "#eeeeee", boxShadow: text ? "none" : "0px 2px 4px -1px rgba(0,0,0,.2), 0px 4px 5px 0px rgba(0,0,0,.14), 0px 1px 10px 0px rgba(0,0,0,.12)" },
        "&.Mui-disabled": { color: "rgba(0,0,0,.26)", bgcolor: text ? "transparent" : "rgba(0,0,0,.12)" },
        "@keyframes v-ripple-in": { from: { transform: "scale(.15)", opacity: 0.15 }, to: { transform: "scale(1)", opacity: 0.15 } },
        "@keyframes v-ripple-out": { from: { opacity: 0.15 }, to: { opacity: 0 } },
        ...sx,
      }}
    >
      <Box component="span" sx={{ position: "relative", zIndex: 1, opacity: loading ? 0 : 1, display: "inline-flex", alignItems: "center" }}>{children}</Box>
      {loading && <CircularProgress size={18} sx={{ position: "absolute", color: "inherit" }} />}
      {ripples.map((ripple) => (
        <Box
          key={ripple.id}
          component="span"
          sx={{
            position: "absolute",
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            borderRadius: "50%",
            bgcolor: "currentColor",
            pointerEvents: "none",
            opacity: ripple.leaving ? 0 : 0.15,
            animation: ripple.leaving ? "v-ripple-out .3s cubic-bezier(.4,0,.2,1)" : "v-ripple-in .25s cubic-bezier(.4,0,.2,1)",
          }}
        />
      ))}
    </Button>
  );
}

function VField({ label, helper, persistent, type = "text" }: { label: string; helper?: string; persistent?: boolean; type?: string }) {
  return <TextField fullWidth variant="standard" type={type} label={label} helperText={persistent ? helper : " "} sx={fieldSx} />;
}

function VSelectField({ label, items, multiple, sx = {} }: { label: string; items: string[]; multiple?: boolean; sx?: Record<string, unknown> }) {
  const [value, setValue] = useState<string | string[]>(multiple ? [] : "");

  return (
    <TextField
      select
      fullWidth
      variant="standard"
      label={label}
      helperText=" "
      value={value}
      onChange={(event) => setValue(event.target.value)}
      SelectProps={{
        multiple,
        IconComponent: ArrowDropDown,
        MenuProps: {
          sx: { zIndex: 2400 },
          PaperProps: {
            sx: {
              maxHeight: 304,
              boxShadow: "0px 5px 5px -3px rgba(0,0,0,.2), 0px 8px 10px 1px rgba(0,0,0,.14), 0px 3px 14px 2px rgba(0,0,0,.12)",
            },
          },
          MenuListProps: { dense: false },
        },
      }}
      sx={{ ...fieldSx, ...sx }}
    >
      {items.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
    </TextField>
  );
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: 0.65, py: 0.15, borderRadius: 0.75, bgcolor: "rgba(255,82,82,.10)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "0.86em" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, mx: 0.25, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.05)" } };
}

const fieldSx = {
  "& .MuiInputLabel-root": { fontSize: 16, color: "rgba(0,0,0,.60)" },
  "& .MuiInputLabel-root.Mui-focused": { color: primary },
  "& .MuiInput-root:before": { borderBottomColor: "rgba(0,0,0,.42)" },
  "& .MuiInput-root:after": { borderBottomColor: primary },
  "& .MuiFormHelperText-root": { minHeight: 18, mx: 0 },
};

const radioSx = { color: "rgba(0,0,0,.54)", "&.Mui-checked": { color: primary }, p: 1 };

const dialogExamples: DialogExample[] = [
  { title: "Without activator", description: <>If for some reason you are unable to use the activator slot, be sure to add the <CodePill>.stop</CodePill> modifier to the event that triggers the dialog.</>, source: "withoutActivator", minHeight: 220, uninverted: true, render: () => <WithoutActivatorExample /> },
  { title: "Modal", description: "Similar to a Simple Dialog, except that it's not dismissed when touching outside.", source: "modal", minHeight: 220, uninverted: true, render: () => <ModalExample /> },
  { title: "Scrollable", description: "Example of a dialog with scrollable content.", source: "scrollable", minHeight: 220, uninverted: true, render: () => <ScrollableExample /> },
  { title: "Overflowed", description: "Modals that do not fit within the available window space will scroll the container.", source: "overflowed", minHeight: 220, uninverted: true, render: () => <OverflowedExample /> },
  { title: "Form", description: "Just a simple example of a form in a dialog.", source: "form", minHeight: 220, uninverted: true, render: () => <FormExample /> },
  { title: "Loader", description: <>The <CodePill>v-dialog</CodePill> component makes it easy to create a customized loading experience for your application.</>, source: "loader", minHeight: 220, render: () => <LoaderExample /> },
  { title: "Fullscreen", description: "Due to limited space, full-screen dialogs may be more appropriate for mobile devices than dialogs used on devices with larger screens.", source: "fullscreen", minHeight: 220, uninverted: true, render: () => <FullscreenExample /> },
  { title: "Nested dialogs", description: "Dialogs can be nested: you can open one dialog from another.", source: "advanced", minHeight: 250, uninverted: true, render: () => <AdvancedExample /> },
];

const longOverflowText = `Lorem ipsum dolor sit amet, semper quis, sapien id natoque elit. Nostra urna at, magna at neque sed sed ante imperdiet, dolor mauris cursus velit, velit non, sem nec. Volutpat sem ridiculus placerat leo, augue in, duis erat proin condimentum in a eget, sed fermentum sed vestibulum varius ac, vestibulum volutpat orci ut elit eget tortor. Ultrices nascetur nulla gravida ante arcu. Pharetra rhoncus morbi ipsum, nunc tempor debitis, ipsum pellentesque, vitae id quam ut mauris dui tempor, aptent non. Quisque turpis. Phasellus quis lectus luctus orci eget rhoncus. Amet donec vestibulum mattis commodo, nulla aliquet, nibh praesent, elementum nulla. Sit lacus pharetra tempus magna neque pellentesque, nulla vel erat. Justo ex quisque nulla accusamus venenatis, sed quis. Nibh phasellus gravida metus in, fusce aenean ut erat commodo eros. Ut turpis, dui integer, nonummy pede placeat nec in sit leo. Faucibus porttitor illo taciti odio, amet viverra scelerisque quis quis et tortor, curabitur morbi a. Enim tempor at, rutrum elit condimentum, amet rutrum vitae tempor torquent nunc. Praesent vestibulum integer maxime felis. Neque aenean quia vitae nostra, tempus elit enim id dui, at egestas pulvinar. Integer libero vestibulum, quis blandit scelerisque mattis fermentum nulla, tortor donec vestibulum dolor amet eget, elit nullam. Aliquam leo phasellus aliquam curabitur metus a, nulla justo mattis duis interdum vel, mollis vitae et id, vestibulum erat ridiculus sit pulvinar justo sed. Vehicula convallis, et nulla wisi, amet vestibulum risus, quam ac egestas. Et vitae, nulla gravida erat scelerisque nullam nunc pellentesque, a dictumst cras augue, purus imperdiet non. Varius montes cursus varius vel tortor, nec leo a qui, magni cras, velit vel consectetuer lobortis vel. Nibh erat et wisi felis leo porttitor, sapien nibh sapien pede mi, sed eget porttitor, repellendus arcu ac quis. Luctus vulputate aut est sem magna, placerat accumsan nunc vestibulum ipsum ac auctor, maecenas lorem in ut nec mauris tortor.`;

const sourceTemplates = {
  usage: "src/demo/examples/dialogs/usage.vue",
  withoutActivator: "src/demo/examples/dialogs/simple/without-activator.vue",
  modal: "src/demo/examples/dialogs/simple/modal.vue",
  scrollable: "src/demo/examples/dialogs/simple/scrollable.vue",
  overflowed: "src/demo/examples/dialogs/simple/overflowed.vue",
  form: "src/demo/examples/dialogs/intermediate/form.vue",
  loader: "src/demo/examples/dialogs/intermediate/loader.vue",
  fullscreen: "src/demo/examples/dialogs/intermediate/fullscreen.vue",
  advanced: "src/demo/examples/dialogs/complex/advanced.vue",
};
