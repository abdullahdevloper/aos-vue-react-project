import { useMemo, useState, type ReactNode } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Add,
  Cake,
  ChevronLeft,
  ClearAll,
  Contacts,
  Delete,
  Domain,
  Email,
  Menu as MenuIcon,
  MoreVert,
  Person,
  Phone,
  Search,
  Star,
  StarBorder,
  Work,
} from "@mui/icons-material";
import AppInnerLayout from "./AppInnerLayout";
import ali from "../../assets/app/contacts/ali.jpg";
import men1 from "../../assets/app/contacts/men1.png";
import jack from "../../assets/app/contacts/jack.png";
import julieta from "../../assets/app/contacts/julieta.png";
import avatar2 from "../../assets/app/contacts/2.jpg";
import lily from "../../assets/app/contacts/lily.png";
import g1 from "../../assets/app/contacts/g1.jpg";
import g2 from "../../assets/app/contacts/g2.jpg";
import g3 from "../../assets/app/contacts/g3.jpg";
import g4 from "../../assets/app/contacts/g4.jpg";
import g5 from "../../assets/app/contacts/g5.jpg";
import g6 from "../../assets/app/contacts/g6.jpg";
import m1 from "../../assets/app/contacts/m1.jpg";
import m2 from "../../assets/app/contacts/m2.jpg";
import m3 from "../../assets/app/contacts/m3.jpg";
import m4 from "../../assets/app/contacts/m4.jpg";
import defaultUserPic from "../../assets/app/contacts/user.svg";

const neuGlow = "-7px -7px 5px rgba(255,255,255,.86), 7px 7px 7px rgba(174,174,192,.30)";
const neuSmall = "-4px -4px 5px rgba(255,255,255,.88), 5px 5px 7px rgba(174,174,192,.28)";
const neuInset = "inset -5px -5px 6px rgba(255,255,255,.86), inset 5px 5px 8px rgba(174,174,192,.30)";

type ContactMenu = "all" | "frequent" | "favourite";

interface ContactRecord {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  mood: string;
  designation?: string;
  nickname: string | null;
  phone: string;
  company: string | null;
  birthdate: string;
  formatedBirthday: string;
  address: string | null;
  notes: string | null;
  is_favourite: boolean;
  is_frequent: boolean;
  selected: boolean;
}

const emptyForm = (): ContactRecord => ({
  id: Date.now(),
  name: "",
  firstname: "",
  lastname: "",
  nickname: "",
  phone: "",
  email: "",
  company: "",
  avatar: defaultUserPic,
  birthdate: "",
  formatedBirthday: "",
  address: "",
  notes: null,
  is_favourite: false,
  is_frequent: false,
  selected: false,
  designation: "",
  mood: "Vuse - Powerful VuejS admin template.",
});

export default function ContactsPage() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawer, setDrawer] = useState(true);
  const [activeMenu, setActiveMenu] = useState<ContactMenu>("favourite");
  const [search, setSearch] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [contacts, setContacts] = useState<ContactRecord[]>(initialContacts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState<ContactRecord>(emptyForm());
  const [deleteTarget, setDeleteTarget] = useState<ContactRecord | null>(null);

  const selectedContacts = contacts.filter((contact) => contact.selected);
  const selectionAll = contacts.length > 0 && contacts.every((contact) => contact.selected);

  const listContact = useMemo(() => {
    if (activeMenu === "frequent") return contacts.filter((contact) => contact.is_frequent);
    if (activeMenu === "favourite") return contacts.filter((contact) => contact.is_favourite);
    const query = search.trim().toLowerCase();
    if (!query) return contacts;
    return contacts.filter((contact) => (
      contact.firstname.toLowerCase().includes(query)
      || contact.lastname.toLowerCase().includes(query)
      || contact.email.toLowerCase().includes(query)
      || String(contact.phone).toLowerCase().includes(query)
    ));
  }, [activeMenu, contacts, search]);

  const errors = validateContact(form);
  const formInvalid = Object.keys(errors).length > 0;

  const openCreate = () => {
    setForm(emptyForm());
    setEditIndex(null);
    setDialogOpen(true);
  };

  const openEdit = (contact: ContactRecord) => {
    const index = contacts.findIndex((item) => item.id === contact.id);
    setForm({ ...contact });
    setEditIndex(index);
    setDialogOpen(true);
  };

  const saveContact = () => {
    if (formInvalid) return;
    const nextForm = { ...form, name: `${form.firstname} ${form.lastname}`.trim() };
    setContacts((current) => {
      if (editIndex !== null) return current.map((contact, index) => (index === editIndex ? nextForm : contact));
      return [...current, nextForm];
    });
    setDialogOpen(false);
    setEditIndex(null);
    setForm(emptyForm());
  };

  const removeContact = () => {
    if (!deleteTarget) return;
    setContacts((current) => current.filter((contact) => contact.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const toggleSelectAll = (checked: boolean) => {
    setContacts((current) => current.map((contact) => ({ ...contact, selected: checked })));
  };

  return (
    <Box className="vuse-content-wrapper contact-app">
      <SectionDefinition />
      <AppInnerLayout
        sidebar={
          <ContactsSidenav
            drawer={drawer}
            mdUp={mdUp}
            activeMenu={activeMenu}
            onToggle={() => setDrawer((value) => !value)}
            onSelect={(menu) => setActiveMenu(menu)}
          />
        }
        header={
          <ContactsToolbar
            selectionAll={selectionAll}
            selectedCount={selectedContacts.length}
            search={search}
            showSearch={!smDown || showMobileSearch}
            hideAdd={smDown && showMobileSearch}
            onSelectAll={toggleSelectAll}
            onBulkDelete={() => setContacts((current) => current.filter((contact) => !contact.selected))}
            onSearch={setSearch}
            onToggleDrawer={() => setDrawer((value) => !value)}
            onToggleSearch={() => setShowMobileSearch((value) => !value)}
            onAdd={openCreate}
          />
        }
      >
        {listContact.length ? (
          <List disablePadding sx={{ bgcolor: "transparent", overflowX: "hidden" }}>
            {listContact.map((contact) => (
              <ContactRow
                key={contact.id}
                item={contact}
                onEdit={() => openEdit(contact)}
                onToggleSelected={(checked) => setContacts((current) => current.map((item) => (item.id === contact.id ? { ...item, selected: checked } : item)))}
                onToggleFavourite={() => setContacts((current) => current.map((item) => (item.id === contact.id ? { ...item, is_favourite: !item.is_favourite } : item)))}
                onDelete={() => setDeleteTarget(contact)}
              />
            ))}
          </List>
        ) : (
          <Box sx={{ height: "100%", display: "grid", placeItems: "center", color: "text.secondary", fontSize: 15 }}>No contacts found</Box>
        )}
      </AppInnerLayout>

      <ContactDialog
        open={dialogOpen}
        form={form}
        errors={errors}
        editMode={editIndex !== null}
        onClose={() => {
          setDialogOpen(false);
          setEditIndex(null);
          setForm(emptyForm());
        }}
        onChange={setForm}
        onSave={saveContact}
      />

      <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} maxWidth="xs" fullWidth PaperProps={{ sx: { bgcolor: "background.default", boxShadow: neuGlow, borderRadius: 1 } }}>
        <DialogTitle sx={{ fontSize: 20, fontWeight: 500 }}>Delete Contact ?</DialogTitle>
        <DialogContent sx={{ color: "text.secondary", fontSize: 14 }}>Are you sure you want to delete the Contact ?</DialogContent>
        <DialogActions sx={{ px: 2, pb: 1.5 }}>
          <Button onClick={() => setDeleteTarget(null)} sx={textButtonSx}>Cancel</Button>
          <Button onClick={removeContact} sx={{ ...textButtonSx, color: "error.main" }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function SectionDefinition() {
  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ mx: { xs: 0, md: 1.5 }, mb: 3, py: 1.75 }}>
      <Box sx={{ width: 48, height: 48, borderRadius: 1, display: "grid", placeItems: "center", color: "primary.main", bgcolor: "background.default", boxShadow: neuGlow }}>
        <Contacts />
      </Box>
      <Typography sx={{ color: "primary.main", fontSize: { xs: 24, md: 28 }, fontWeight: 500, lineHeight: 1.2 }}>Contacts</Typography>
    </Stack>
  );
}

function ContactsSidenav({ drawer, mdUp, activeMenu, onToggle, onSelect }: { drawer: boolean; mdUp: boolean; activeMenu: ContactMenu; onToggle: () => void; onSelect: (menu: ContactMenu) => void }) {
  if (!drawer) return null;
  return (
    <Box
      sx={{
        width: { xs: 280, md: 300 },
        flex: "0 0 auto",
        position: { xs: "absolute", md: "relative" },
        insetBlock: 0,
        insetInlineStart: 0,
        zIndex: { xs: 5, md: 1 },
        bgcolor: { xs: "background.default", md: "transparent" },
        boxShadow: { xs: neuGlow, md: "none" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack direction="row" alignItems="center" sx={{ height: 64, px: 2 }}>
        <Avatar src={initialUsers[0].avatar} sx={{ width: 40, height: 40 }} />
        <Typography sx={{ ml: 1.5, fontSize: 16, fontWeight: 500 }}>{initialUsers[0].name}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        {!mdUp && (
          <IconButton onClick={onToggle} sx={{ color: "text.secondary" }}>
            <ChevronLeft />
          </IconButton>
        )}
      </Stack>
      <Divider sx={{ borderColor: "rgba(111,125,133,.18)" }} />
      <List dense sx={{ p: 1.15, overflow: "auto" }}>
        {contactMenus.map((item) => {
          const active = item.slug === activeMenu;
          return (
            <ListItemButton
              key={item.slug}
              onClick={() => onSelect(item.slug)}
              sx={{
                minHeight: 48,
                borderRadius: 999,
                mb: 0.5,
                px: 1.15,
                color: active ? "primary.main" : "text.primary",
                bgcolor: active ? "background.default" : "transparent",
                boxShadow: active ? "inset -4px -4px 5px rgba(255,255,255,.82), inset 5px 5px 8px rgba(0,131,143,.18)" : "none",
                "&:hover": { bgcolor: "rgba(0,131,143,.055)" },
              }}
            >
              <Avatar sx={{ width: 40, height: 40, mr: 1.5, bgcolor: "background.default", color: active ? "primary.main" : "text.secondary", boxShadow: neuSmall, fontSize: 12, fontWeight: 700 }}>
                {item.code}
              </Avatar>
              <Typography sx={{ fontSize: 14.5 }}>{item.title}</Typography>
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}

function ContactsToolbar({
  selectionAll,
  selectedCount,
  search,
  showSearch,
  hideAdd,
  onSelectAll,
  onBulkDelete,
  onSearch,
  onToggleDrawer,
  onToggleSearch,
  onAdd,
}: {
  selectionAll: boolean;
  selectedCount: number;
  search: string;
  showSearch: boolean;
  hideAdd: boolean;
  onSelectAll: (checked: boolean) => void;
  onBulkDelete: () => void;
  onSearch: (value: string) => void;
  onToggleDrawer: () => void;
  onToggleSearch: () => void;
  onAdd: () => void;
}) {
  return (
    <Stack direction="row" alignItems="center" sx={{ minHeight: 64, px: 1.25, gap: 1 }}>
      <Checkbox checked={selectionAll} onChange={(event) => onSelectAll(event.target.checked)} sx={checkboxSx} />
      <IconButton onClick={onToggleDrawer} sx={{ display: { xs: "inline-flex", md: "none" }, color: "text.secondary" }}>
        <MenuIcon />
      </IconButton>
      {showSearch && (
        <TextField
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search Contact"
          size="small"
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search sx={{ color: "text.secondary", fontSize: 20 }} /></InputAdornment>,
            endAdornment: search ? <InputAdornment position="end"><IconButton size="small" onClick={() => onSearch("")}><ClearAll fontSize="small" /></IconButton></InputAdornment> : undefined,
          }}
          sx={searchFieldSx}
        />
      )}
      <Box sx={{ flexGrow: 1 }} />
      {selectedCount > 0 && (
        <IconButton onClick={onBulkDelete} sx={{ color: "error.main" }}>
          <Delete />
        </IconButton>
      )}
      {!showSearch && (
        <IconButton onClick={onToggleSearch} sx={fabSx}>
          <Search />
        </IconButton>
      )}
      {!hideAdd && (
        <IconButton onClick={onAdd} sx={fabSx}>
          <Add />
        </IconButton>
      )}
    </Stack>
  );
}

function ContactRow({ item, onEdit, onToggleSelected, onToggleFavourite, onDelete }: { item: ContactRecord; onEdit: () => void; onToggleSelected: (checked: boolean) => void; onToggleFavourite: () => void; onDelete: () => void }) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <Stack
      direction="row"
      alignItems="center"
      onClick={onEdit}
      sx={{ minHeight: 64, px: { xs: 1, md: 2 }, cursor: "pointer", bgcolor: item.selected ? "rgba(0,131,143,.075)" : "transparent", "&:hover": { bgcolor: item.selected ? "rgba(0,131,143,.095)" : "rgba(0,131,143,.045)" } }}
    >
      <Checkbox checked={item.selected} onClick={(event) => event.stopPropagation()} onChange={(event) => onToggleSelected(event.target.checked)} sx={{ ...checkboxSx, mr: 2.5 }} />
      <Avatar src={item.avatar} sx={{ width: 40, height: 40, mr: 3 }} />
      <Typography sx={{ flex: "1 1 220px", minWidth: 0, fontSize: 16 }}>{item.firstname} {item.lastname}</Typography>
      <Typography sx={{ display: { xs: "none", md: "block" }, flex: "1 1 275px", minWidth: 0, fontSize: 15, color: "text.primary" }}>{item.email}</Typography>
      <Typography sx={{ display: { xs: "none", lg: "block" }, flex: "0 0 170px", fontSize: 15, color: "text.primary" }}>{item.phone}</Typography>
      <IconButton
        onClick={(event) => {
          event.stopPropagation();
          onToggleFavourite();
        }}
        sx={{ color: item.is_favourite ? "#ffc107" : "text.secondary" }}
      >
        {item.is_favourite ? <Star /> : <StarBorder />}
      </IconButton>
      <IconButton
        onClick={(event) => {
          event.stopPropagation();
          setAnchor(event.currentTarget);
        }}
        sx={{ color: "text.secondary" }}
      >
        <MoreVert fontSize="small" />
      </IconButton>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)} PaperProps={{ sx: { bgcolor: "background.default", borderRadius: 1, boxShadow: neuGlow } }}>
        <MenuItem
          onClick={(event) => {
            event.stopPropagation();
            setAnchor(null);
            onDelete();
          }}
        >
          <Delete fontSize="small" sx={{ mr: 1.25 }} /> Delete
        </MenuItem>
      </Menu>
    </Stack>
  );
}

function ContactDialog({ open, form, errors, editMode, onClose, onChange, onSave }: { open: boolean; form: ContactRecord; errors: Record<string, string>; editMode: boolean; onClose: () => void; onChange: (value: ContactRecord) => void; onSave: () => void }) {
  const update = (field: keyof ContactRecord, value: string) => onChange({ ...form, [field]: value });
  return (
    <Dialog open={open} onClose={onClose} scroll="paper" maxWidth={false} PaperProps={{ sx: { width: 375, maxWidth: "calc(100vw - 32px)", bgcolor: "background.default", borderRadius: 1, boxShadow: neuGlow, overflow: "hidden" } }}>
      <Box sx={{ height: 280, position: "relative", backgroundImage: "url(https://picsum.photos/630/280?image=618)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <Avatar src={form.avatar} variant="square" sx={{ position: "absolute", left: 0, top: 0, width: 164, height: 164, bgcolor: "grey.500" }} />
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}>
          <ChevronLeft />
        </IconButton>
        <Box sx={{ position: "absolute", left: 16, right: 16, bottom: 12, color: "#fff" }}>
          <Typography sx={{ fontSize: 20, fontWeight: 500 }}>{form.firstname} {form.lastname}</Typography>
          <Typography sx={{ fontSize: 14, opacity: 0.88 }}>{form.designation}</Typography>
        </Box>
      </Box>
      <DialogContent sx={{ px: 0 }}>
        <Stack spacing={0.4}>
          <DialogField icon={<Person />} label="First Name" value={form.firstname} error={errors.firstname} onChange={(value) => update("firstname", value)} />
          <DialogField icon={<Box component="span" sx={{ fontWeight: 700 }}>c</Box>} label="Last name" value={form.lastname} onChange={(value) => update("lastname", value)} />
          <DialogField icon={<Box component="span" sx={{ fontWeight: 700 }}>c</Box>} label="Nickname" value={form.nickname ?? ""} onChange={(value) => update("nickname", value)} />
          <DialogField icon={<Phone />} label="Phone" value={form.phone} error={errors.phone} onChange={(value) => update("phone", value)} />
          <DialogField icon={<Email />} label="Email" value={form.email} error={errors.email} onChange={(value) => update("email", value)} />
          <DialogField icon={<Domain />} label="Company" value={form.company ?? ""} onChange={(value) => update("company", value)} />
          <DialogField icon={<Work />} label="Job" value={form.designation ?? ""} onChange={(value) => update("designation", value)} />
          <DialogField icon={<Cake />} label="Birthdate" value={form.formatedBirthday} helper="MM/DD/YYYY format" onChange={(value) => onChange({ ...form, formatedBirthday: value, birthdate: parseDate(value) })} />
          <DialogField icon={<Box component="span" sx={{ fontSize: 20 }}>⌖</Box>} label="Address" value={form.address ?? ""} onChange={(value) => update("address", value)} />
        </Stack>
        <Typography sx={{ px: 2.5, pt: 1.5, color: "text.secondary", fontSize: 12 }}>*indicates required field</Typography>
      </DialogContent>
      <DialogActions sx={{ px: 2, pb: 1.5 }}>
        <Button onClick={onClose} sx={textButtonSx}>Close</Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={onSave} disabled={Object.keys(errors).length > 0} sx={textButtonSx}>{editMode ? "Edit" : "Save"}</Button>
      </DialogActions>
    </Dialog>
  );
}

function DialogField({ icon, label, value, helper, error, onChange }: { icon: ReactNode; label: string; value: string; helper?: string; error?: string; onChange: (value: string) => void }) {
  return (
    <Stack direction="row" alignItems="flex-start" spacing={1.5} sx={{ px: 2, py: 0.5 }}>
      <Box sx={{ width: 28, pt: 2.25, color: "text.secondary", display: "grid", placeItems: "center", "& .MuiSvgIcon-root": { fontSize: 22 } }}>{icon}</Box>
      <TextField
        fullWidth
        variant="standard"
        label={label}
        value={value}
        helperText={error || helper}
        error={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
        sx={{
          "& .MuiInputLabel-root": { fontSize: 14 },
          "& .MuiInputBase-input": { fontSize: 14.5, py: 1.2 },
          "& .MuiFormHelperText-root": { ml: 0, fontSize: 11.5 },
        }}
      />
    </Stack>
  );
}

function validateContact(contact: ContactRecord) {
  const errors: Record<string, string> = {};
  if (!contact.firstname.trim()) errors.firstname = "First name is required";
  const digits = contact.phone.replace(/\D/g, "");
  if (!contact.phone.trim()) errors.phone = "Phone number is required";
  else if (!/^\+?[\d\s]+$/.test(contact.phone)) errors.phone = "Phone number must be a valid number";
  else if (digits.length > 14) errors.phone = "Max 14 digits";
  else if (digits.length < 7) errors.phone = "Min 7 digits";
  if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) errors.email = "Email must be valid";
  return errors;
}

function parseDate(date: string) {
  const parts = date.split("/");
  if (parts.length !== 3) return "";
  const [month, day, year] = parts;
  if (!month || !day || !year) return "";
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

const checkboxSx = {
  color: "#00838f",
  p: 0.35,
  "&.Mui-checked": { color: "#00838f" },
  "& .MuiSvgIcon-root": { fontSize: 22 },
};

const fabSx = {
  width: 36,
  height: 36,
  bgcolor: "primary.main",
  color: "#fff",
  boxShadow: neuSmall,
  "&:hover": { bgcolor: "primary.dark", boxShadow: neuInset },
};

const searchFieldSx = {
  width: { xs: "min(260px, 58vw)", md: 320 },
  "& .MuiOutlinedInput-root": {
    height: 40,
    bgcolor: "background.default",
    borderRadius: 1,
    boxShadow: neuSmall,
    "& fieldset": { border: 0 },
    "& input": { fontSize: 14.5 },
  },
};

const textButtonSx = {
  color: "primary.main",
  textTransform: "none",
  fontWeight: 500,
  "&.Mui-disabled": { color: "text.disabled" },
};

const contactMenus: Array<{ title: string; slug: ContactMenu; code: string }> = [
  { title: "All Contacts", slug: "all", code: "AL" },
  { title: "Frequently Contacted", slug: "frequent", code: "FR" },
  { title: "Favourite Contacts", slug: "favourite", code: "FA" },
];

const initialUsers = [
  { id: 1, name: "Alice Blue", firstname: "Alice", lastname: "Blue", email: "aliceblue@example.com", avatar: ali, mood: "Vuse - Powerful VuejS admin template." },
  { id: 2, name: "Jack Johnson", firstname: "Jack", lastname: "Johnson", email: "jack@example.com", avatar: men1, mood: "Vuse - Powerful VuejS admin template.", designation: "Network Engineer" },
  { id: 3, name: "Bruce Canta", firstname: "Bruce", lastname: "Canta", email: "bruce@example.com", avatar: jack, mood: "Vuse - Powerful VuejS admin template.", designation: "Network Engineer" },
  { id: 4, name: "Camelia Lopez", firstname: "Camelia", lastname: "Lopez", email: "camelia@example.com", avatar: julieta, mood: "Vuse - Powerful VuejS admin template.", designation: "Network Engineer" },
  { id: 5, name: "Denis Richard", firstname: "Denis", lastname: "Richard", email: "denis@example.com", avatar: avatar2, mood: "Vuse - Powerful VuejS admin template.", designation: "Network Engineer" },
  { id: 6, name: "Mia Willson", firstname: "Mia", lastname: "Willson", email: "mia@example.com", avatar: lily, mood: "Vuse - Powerful VuejS admin template.", designation: "Network Engineer" },
  { id: 7, name: "Florence J. Brown", firstname: "Florence", lastname: "Brown", email: "florence@example.com", avatar: g1, mood: "Good content isn't about good storytelling", designation: "Sales Manager" },
  { id: 8, name: "Regina E. Hernandez", firstname: "Regina", lastname: "Hernandez", email: "regina@example.com", avatar: g2, mood: "Design is intelligence made visible", designation: "Designer Lead" },
  { id: 9, name: "Mary Beveridge", firstname: "Mary", lastname: "Beveridge", email: "mary@example.com", avatar: g3, mood: "In most cases, being a good boss means hiring talented people and then getting out of their way", designation: "HR Manager" },
  { id: 10, name: "Gulnaz Vorobyova", firstname: "Gulnaz", lastname: "Vorobyova", email: "gulnaz@example.com", avatar: g4, mood: "#wakeup#eat#code#chill", designation: "Frontend Engineer" },
  { id: 11, name: "Aline Correia", firstname: "Aline", lastname: "Correia", email: "aline@example.com", avatar: g5, mood: "#wakeup#eat#code#chill", designation: "Project Mananager" },
  { id: 12, name: "Jane T. Keys", firstname: "Jane", lastname: "Keys", email: "jane@example.com", avatar: g6, mood: "#wakeup#eat#code#chill", designation: "Software Engineer" },
  { id: 13, name: "Timothy Macredie", firstname: "Timothy", lastname: "Macredie", email: "timothy@example.com", avatar: m1, mood: "#wakeup#eat#code#chill", designation: "Photographer" },
  { id: 14, name: "Beau Liversidge", firstname: "Beau", lastname: "Liversidge", email: "beau@example.com", avatar: m2, mood: "#wakeup#eat#code#chill", designation: "Designer" },
  { id: 15, name: "Davi Martins Dias", firstname: "Davi", lastname: "Dias", email: "davi@example.com", avatar: m3, mood: "#wakeup#eat#code#chill", designation: "Marketing Lead" },
  { id: 16, name: "John Mowbray", firstname: "John", lastname: "Mowbray", email: "john@example.com", avatar: m4, mood: "#wakeup#eat#code#chill", designation: "Technical Lead" },
];

const vueRandomFlags = [
  { favourite: true, frequent: true },
  { favourite: false, frequent: true },
  { favourite: true, frequent: false },
  { favourite: false, frequent: false },
  { favourite: true, frequent: true },
  { favourite: false, frequent: true },
  { favourite: true, frequent: false },
  { favourite: true, frequent: true },
  { favourite: false, frequent: false },
  { favourite: true, frequent: false },
  { favourite: false, frequent: true },
  { favourite: true, frequent: true },
  { favourite: false, frequent: false },
  { favourite: true, frequent: true },
  { favourite: false, frequent: true },
  { favourite: true, frequent: false },
];

const initialContacts: ContactRecord[] = initialUsers.map((user, index) => ({
  ...user,
  nickname: null,
  phone: String(100000000 + index * 137531).slice(0, 9),
  company: null,
  birthdate: "",
  formatedBirthday: "",
  address: null,
  notes: null,
  is_favourite: vueRandomFlags[index].favourite,
  is_frequent: vueRandomFlags[index].frequent,
  selected: false,
}));
