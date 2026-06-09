import { useState, type MouseEvent, type ReactNode } from "react";
import { Avatar, Box, Button, Card, Checkbox, Collapse, Divider, GlobalStyles, IconButton, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { Code, GitHub, InvertColors, ViewList } from "@mui/icons-material";
import {
  mdiAccount,
  mdiAccountMultiple,
  mdiCheckCircle,
  mdiCheckboxMarkedCircle,
  mdiChevronDown,
  mdiChevronLeft,
  mdiChevronUp,
  mdiClock,
  mdiCloudUpload,
  mdiDotsVertical,
  mdiEmail,
  mdiFlag,
  mdiFolder,
  mdiHistory,
  mdiHome,
  mdiInformation,
  mdiMagnify,
  mdiMapMarker,
  mdiMenu,
  mdiMenuDown,
  mdiMessageText,
  mdiPencil,
  mdiPhone,
  mdiStar,
  mdiUpload,
  mdiViewModule,
} from "@mdi/js";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";
import materialIconsFont from "../../../assets/style-ui/icons/MaterialIcons-Regular.woff2";
import m2Avatar from "../../../assets/app/contacts/m2.jpg";

const primary = "#0097a7";
const pink = "#e91e63";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";
const shadow2 = "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)";
const docsParagraphSx = { fontSize: { xs: 16, md: 20 }, lineHeight: 1.55, fontWeight: 300, mb: 3, color: "text.secondary" };
type ExampleKey = keyof typeof sourceTemplates;
type ListVariant = "disabled" | "shaped" | "dense" | "flat" | "rounded";
type Ripple = { id: number; x: number; y: number; size: number };

const reportItems = [
  { text: "Real-Time", icon: "mdi-clock" },
  { text: "Audience", icon: "mdi-account" },
  { text: "Conversions", icon: "mdi-flag" },
];

const mailItems = [
  {
    avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
    title: "Brunch this weekend?",
    subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
  },
  {
    avatar: m2Avatar,
    title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
    subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
  },
  {
    avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
    title: "Oui oui",
    subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
  },
  {
    avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
    title: "Birthday gift",
    subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
  },
  {
    avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
    title: "Recipe to try",
    subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
  },
];

export default function ListsVuetifyPage() {
  return (
    <>
      <GlobalStyles styles={{ "@font-face": { fontFamily: "Material Icons", fontStyle: "normal", fontWeight: 400, src: `url(${materialIconsFont}) format("woff2")` } }} />
      <DocPage
        title="Lists"
        namespace="Components"
        icon={<ViewList />}
        breadcrumbs={[
          { label: "Components", href: "/components/vuetify/api-explorer" },
          { label: "Vuetify", href: "/components/vuetify/api-explorer" },
          { label: "List" },
        ]}
      >
        <DocText>
          The <CodePill>v-list</CodePill> component is used to display information. It can contain an avatar, content, actions, subheaders and much more. Lists present content in a way that makes it easy to identify a specific item in a collection. They provide a consistent styling for organizing groups of text and images.
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
      <VuetifyExampleBlock title="" description={<>Lists come in three main variations. <strong>single-line</strong> (default), <strong>two-line</strong> and <strong>three-line</strong>. The line declaration specifies the minimum height of the item and can also be controlled from <CodePill>v-list</CodePill> with the same prop.</>} source="usage">
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
    { title: "Disabled lists", description: <>You cannot interact with disabled <CodePill>v-list</CodePill>.</>, source: "simple/disabled", render: () => <ReportListExample variant="disabled" /> },
    { title: "Shaped lists", description: <>Shaped lists have rounded borders on one side of the <CodePill>v-list-item</CodePill>.</>, source: "simple/shaped", render: () => <ReportListExample variant="shaped" /> },
    { title: "Dense", description: <><CodePill>v-list</CodePill> can be lowered with <CodePill>dense</CodePill> property.</>, source: "simple/dense", render: () => <ReportListExample variant="dense" /> },
    { title: "Flat", description: <>Items don&apos;t change when selected in <CodePill>v-list</CodePill> with <CodePill>flat</CodePill> property.</>, source: "simple/flat", render: () => <ReportListExample variant="flat" /> },
    { title: "Rounded", description: <>You can make <CodePill>v-list</CodePill> items rounded.</>, source: "simple/rounded", render: () => <ReportListExample variant="rounded" /> },
    { title: "Avatar with title and action", description: <>Lists also contain slots for a more explicit approach. If you choose this approach, remember you must provide additional props for correct spacing. In this example, we have a tile with an avatar, so we must provide an <CodePill>avatar</CodePill> property.</>, source: "intermediate/avatar-title-and-action", render: () => <AvatarTitleActionExample /> },
    { title: "Icon with 2 lines and action", description: <>Lists can contain subheaders, dividers, and can contain 1 or more lines. The subtitle will overflow with ellipsis if it extends past one line.</>, source: "intermediate/icon-two-lines-and-action", render: () => <IconTwoLinesActionExample /> },
    { title: "Avatar with 3 lines", description: <>For three line lists, the subtitle will clamp vertically at 2 lines and then ellipsis. This feature uses <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp">line-clamp</a> and is not supported in all browsers.</>, source: "intermediate/avatar-three-lines", render: () => <AvatarThreeLinesExample /> },
    { title: "Avatar with title and action", description: <>Here we combine <strong>v-list-item-avatar</strong> and <strong>v-list-item-icon</strong> in a single-line list.</>, source: "intermediate/avatar-subheader-title-and-action", render: () => <AvatarSubheaderExample /> },
    { title: "Nested lists", description: <>Using the <CodePill>v-list-group</CodePill> component you can create up to <strong>2</strong> levels in depth using the <strong>sub-group</strong> prop.</>, source: "intermediate/nested", render: () => <NestedExample /> },
    { title: "Card image with toolbar and list", description: "A list can be combined with a card.", source: "intermediate/card-list", render: () => <CardListExample /> },
    { title: "Title with sub-title, actions and action-text", description: "A list can contain a stack within an action. This is useful when you need to display meta text next to your action item.", source: "intermediate/title-subtitle-actions-and-action-text", render: () => <TitleSubtitleActionTextExample /> },
    { title: "Action with title and sub-title", description: <>A <strong>three-line</strong> list with actions. Utilizing <strong><a href="/components/list-item-groups">v-list-item-group</a></strong>, easily connect actions to your tiles.</>, source: "intermediate/action-title-and-subtitle", render: () => <ActionTitleSubtitleExample /> },
    { title: "Expansion Lists", description: <>A list can contain a group of items which will display on click. Expansion lists are also used within the <strong><a href="/components/navigation-drawers">v-navigation-drawer</a></strong> component.</>, source: "intermediate/expansion-lists", render: () => <ExpansionListsExample /> },
    { title: "Navigation lists", description: <>Lists can receive an alternative <strong>nav</strong> styling that reduces the width <CodePill>v-list-item</CodePill> takes up as well as adding a border radius.</>, source: "intermediate/nav", render: () => <NavExample /> },
  ];

  return (
    <Box component="section" id="examples">
      <BaseHeading id="examples">Examples</BaseHeading>
      <Typography sx={docsParagraphSx}>Below is a collection of simple to complex examples.</Typography>
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
    <DemoCard maxWidth={400} tile>
      <VList>
        <VListItem title="Single-line item" />
        <VListItem title="Two-line item" subtitle="Secondary text" twoLine />
        <VListItem title="Three-line item" subtitles={["Secondary line text Lorem ipsum dolor sit amet,", "consectetur adipiscing elit."]} threeLine />
      </VList>
    </DemoCard>
  );
}

function PlaygroundExample() {
  const [selected, setSelected] = useState(5);
  const [opts, setOpts] = useState({ disabled: false, dense: false, twoLine: false, threeLine: false, shaped: false, flat: false, subheader: false, inactive: false, subGroup: false, nav: false, avatar: false, rounded: false });
  const set = (key: keyof typeof opts) => (value: boolean) => setOpts((current) => ({ ...current, [key]: value }));
  return (
    <VRow align="center">
      <VRow justify="space-around" sx={{ width: "100%" }}>
        {Object.entries({ disabled: "Disabled", dense: "Dense", twoLine: "Two-line", threeLine: "Three-line", shaped: "Shaped", flat: "Flat", subheader: "Subheader", inactive: "Inactive", subGroup: "Sub-group", nav: "Nav", avatar: "Avatar", rounded: "Rounded" }).map(([key, label]) => (
          <VSwitch key={key} label={label} checked={opts[key as keyof typeof opts]} onChange={set(key as keyof typeof opts)} />
        ))}
      </VRow>
      <DemoCard maxWidth={400} tile>
        <VList dense={opts.dense} disabled={opts.disabled} shaped={opts.shaped} flat={opts.flat} nav={opts.nav} rounded={opts.rounded} subheader={opts.subheader}>
          <Subheader>REPORTS</Subheader>
          {mailItems.map((item, index) => (
            <VListItem
              key={item.title}
              active={selected === index}
              disabled={opts.disabled}
              inactive={opts.inactive}
              dense={opts.dense}
              twoLine={opts.twoLine}
              threeLine={opts.threeLine}
              shaped={opts.shaped}
              rounded={opts.rounded}
              flat={opts.flat}
              nav={opts.nav}
              avatar={opts.avatar ? item.avatar : undefined}
              titleHtml={item.title}
              subtitleHtml={opts.twoLine || opts.threeLine ? item.subtitle : undefined}
              onClick={() => !opts.inactive && !opts.disabled && setSelected(index)}
            />
          ))}
        </VList>
      </DemoCard>
    </VRow>
  );
}

function ReportListExample({ variant }: { variant: ListVariant }) {
  const [selected, setSelected] = useState(1);
  const disabled = variant === "disabled";
  return (
    <DemoCard maxWidth={300} tile>
      <VList dense={variant === "dense"} disabled={disabled} shaped={variant === "shaped"} flat={variant === "flat"} rounded={variant === "rounded"}>
        <Subheader>REPORTS</Subheader>
        {reportItems.map((item, index) => (
          <VListItem key={item.text} active={selected === index} disabled={disabled} dense={variant === "dense"} shaped={variant === "shaped"} rounded={variant === "rounded"} flat={variant === "flat"} prependIcon={item.icon} title={item.text} onClick={() => !disabled && setSelected(index)} />
        ))}
      </VList>
    </DemoCard>
  );
}

function AvatarTitleActionExample() {
  const items = [
    { icon: true, title: "Jason Oner", avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg" },
    { title: "Travis Howard", avatar: m2Avatar },
    { title: "Ali Connors", avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg" },
    { title: "Cindy Baker", avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg" },
  ];
  return (
    <DemoCard maxWidth={500}>
      <VToolbar color="#3f51b5" title="Inbox" actions={["mdi-magnify", "mdi-dots-vertical"]} />
      <VList>
        {items.map((item) => <VListItem key={item.title} prependIcon={item.icon ? "mdi-star" : undefined} prependColor="#e91e63" title={item.title} trailingAvatar={item.avatar} onClick={() => {}} />)}
      </VList>
    </DemoCard>
  );
}

function IconTwoLinesActionExample() {
  const folders = [
    { icon: "folder", color: "#bdbdbd", title: "Photos", subtitle: "Jan 9, 2014" },
    { icon: "folder", color: "#bdbdbd", title: "Recipes", subtitle: "Jan 17, 2014" },
    { icon: "folder", color: "#bdbdbd", title: "Work", subtitle: "Jan 28, 2014" },
  ];
  const files = [
    { icon: "assignment", color: "#2196f3", title: "Vacation itinerary", subtitle: "Jan 20, 2014" },
    { icon: "call_to_action", color: "#ffc107", title: "Kitchen remodel", subtitle: "Jan 10, 2014" },
  ];
  return (
    <DemoCard maxWidth={600}>
      <VToolbar color="#03a9f4" title="My files" actions={["mdi-magnify", "mdi-view-module"]} />
      <VList twoLine subheader>
        <Subheader inset>Folders</Subheader>
        {folders.map((item) => <VListItem key={item.title} twoLine avatarIcon={item.icon} avatarIconBg={item.color} title={item.title} subtitle={item.subtitle} actionIcon="mdi-information" onClick={() => {}} />)}
        <VDivider inset />
        <Subheader inset>Files</Subheader>
        {files.map((item) => <VListItem key={item.title} twoLine avatarIcon={item.icon} avatarIconBg={item.color} title={item.title} subtitle={item.subtitle} actionIcon="mdi-information" onClick={() => {}} />)}
      </VList>
    </DemoCard>
  );
}

function AvatarThreeLinesExample() {
  return (
    <DemoCard maxWidth={450}>
      <VToolbar color="#00bcd4" title="Inbox" actions={["mdi-magnify"]} />
      <VList threeLine>
        <Subheader>Today</Subheader>
        {mailItems.map((item, index) => (
          <Box key={item.title}>
            {index > 0 && <VDivider inset />}
            <VListItem threeLine avatar={item.avatar} titleHtml={item.title} subtitleHtml={item.subtitle} onClick={() => {}} />
          </Box>
        ))}
      </VList>
    </DemoCard>
  );
}

function AvatarSubheaderExample() {
  const recent = [
    { active: true, title: "Jason Oner", avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg" },
    { active: true, title: "Ranee Carlson", avatar: m2Avatar },
    { title: "Cindy Baker", avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg" },
    { title: "Ali Connors", avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg" },
  ];
  return (
    <DemoCard maxWidth={500}>
      <VToolbar color="#6200ea" title="New Chat" actions={["mdi-magnify"]} />
      <VList subheader>
        <Subheader>Recent chat</Subheader>
        {recent.map((item) => <VListItem key={item.title} avatar={item.avatar} title={item.title} actionPlainIcon="chat_bubble" actionColor={item.active ? "#6200ea" : "#9e9e9e"} onClick={() => {}} />)}
      </VList>
      <VDivider />
      <VList subheader>
        <Subheader>Previous chats</Subheader>
        <VListItem avatar="https://cdn.vuetifyjs.com/images/lists/5.jpg" title="Travis Howard" onClick={() => {}} />
      </VList>
    </DemoCard>
  );
}

function NestedExample() {
  const [usersOpen, setUsersOpen] = useState(true);
  const [adminOpen, setAdminOpen] = useState(true);
  const [actionsOpen, setActionsOpen] = useState(false);
  return (
    <DemoCard width={300}>
      <VList>
        <VListItem prependIcon="mdi-home" title="Home" />
        <GroupHeader icon="account_circle" title="Users" open={usersOpen} onClick={() => setUsersOpen(!usersOpen)} />
        <Collapse in={usersOpen}>
          <GroupHeader title="Admin" open={adminOpen} nested onClick={() => setAdminOpen(!adminOpen)} />
          <Collapse in={adminOpen}>
            {[["Management", "people_outline"], ["Settings", "settings"]].map(([title, icon]) => <VListItem key={title} title={title} actionPlainIcon={icon} indent={2} onClick={() => {}} />)}
          </Collapse>
          <GroupHeader title="Actions" open={actionsOpen} nested onClick={() => setActionsOpen(!actionsOpen)} />
          <Collapse in={actionsOpen}>
            {[["Create", "add"], ["Read", "insert_drive_file"], ["Update", "update"], ["Delete", "delete"]].map(([title, icon]) => <VListItem key={title} title={title} actionPlainIcon={icon} indent={2} onClick={() => {}} />)}
          </Collapse>
        </Collapse>
      </VList>
    </DemoCard>
  );
}

function CardListExample() {
  return (
    <DemoCard maxWidth={375}>
      <Box sx={{ height: 300, backgroundImage: "url(https://cdn.vuetifyjs.com/images/lists/ali.png)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff", display: "flex", flexDirection: "column" }}>
        <Stack direction="row" alignItems="center" sx={{ p: 1 }}>
          <VIconButton icon="mdi-chevron-left" color="#fff" />
          <Box sx={{ flex: 1 }} />
          <VIconButton icon="mdi-pencil" color="#fff" sx={{ mr: 2 }} />
          <VIconButton icon="mdi-dots-vertical" color="#fff" />
        </Stack>
        <Box sx={{ flex: 1 }} />
        <Typography sx={{ fontSize: 34, lineHeight: "40px", pl: 12, pt: 12, pb: 2 }}>Ali Conners</Typography>
      </Box>
      <VList twoLine>
        <VListItem twoLine prependIcon="mdi-phone" prependColor="#3f51b5" title="(650) 555-1234" subtitle="Mobile" actionIcon="mdi-message-text" onClick={() => {}} />
        <VListItem twoLine title="(323) 555-6789" subtitle="Work" actionIcon="mdi-message-text" indent={1} onClick={() => {}} />
        <VDivider inset />
        <VListItem twoLine prependIcon="mdi-email" prependColor="#3f51b5" title="aliconnors@example.com" subtitle="Personal" onClick={() => {}} />
        <VListItem twoLine title="ali_connors@example.com" subtitle="Work" indent={1} onClick={() => {}} />
        <VDivider inset />
        <VListItem twoLine prependIcon="mdi-map-marker" prependColor="#3f51b5" title="1400 Main Street" subtitle="Orlando, FL 79938" onClick={() => {}} />
      </VList>
    </DemoCard>
  );
}

function TitleSubtitleActionTextExample() {
  const [selected, setSelected] = useState<number[]>([2]);
  const items = [
    { action: "15 min", headline: "Brunch this weekend?", title: "Ali Connors", subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
    { action: "2 hr", headline: "Summer BBQ", title: "me, Scrott, Jennifer", subtitle: "Wish I could come, but I'm out of town this weekend." },
    { action: "6 hr", headline: "Oui oui", title: "Sandra Adams", subtitle: "Do you have Paris recommendations? Have you ever been?" },
    { action: "12 hr", headline: "Birthday gift", title: "Trevor Hansen", subtitle: "Have any ideas about what we should get Heidi for her birthday?" },
    { action: "18hr", headline: "Recipe to try", title: "Britta Holt", subtitle: "We should eat this: Grate, Squash, Corn, and tomatillo Tacos." },
  ];
  const toggle = (index: number) => setSelected((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  return (
    <DemoCard maxWidth={500}>
      <VToolbar color={pink} title="Inbox" actions={["mdi-magnify", "mdi-checkbox-marked-circle"]} />
      <VList twoLine>
        {items.map((item, index) => <Box key={item.title}><VListItem twoLine active={selected.includes(index)} flat activeColor={pink} title={item.title} subtitle={item.headline} thirdLine={item.subtitle} actionText={item.action} actionPlainIcon={selected.includes(index) ? "star" : "star_border"} actionColor={selected.includes(index) ? "#ffeb3b" : "#bdbdbd"} onClick={() => toggle(index)} />{index + 1 < items.length && <VDivider />}</Box>)}
      </VList>
    </DemoCard>
  );
}

function ActionTitleSubtitleExample() {
  const [settings, setSettings] = useState<number[]>([]);
  const toggle = (index: number) => setSettings((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  const controls = [
    ["Content filtering", "Set the content filtering level to restrict appts that can be downloaded"],
    ["Password", "Require password for purchase or use password to restrict purchase"],
  ];
  const general = [
    ["Notifications", "Notify me about updates to apps or games that I downloaded"],
    ["Sound", "Auto-update apps at any time. Data charges may apply"],
    ["Auto-add widgets", "Automatically add home screen widgets when downloads complete"],
  ];
  return (
    <DemoCard maxWidth={400}>
      <VToolbar color="#9c27b0" title="Settings" actions={["mdi-magnify"]} />
      <VList threeLine subheader>
        <Subheader>User Controls</Subheader>
        {controls.map(([title, subtitle]) => <VListItem key={title} threeLine title={title} subtitle={subtitle} />)}
      </VList>
      <VDivider />
      <VList threeLine subheader>
        <Subheader>General</Subheader>
        {general.map(([title, subtitle], index) => <VListItem key={title} threeLine checkbox={settings.includes(index)} title={title} subtitle={subtitle} onClick={() => toggle(index)} />)}
      </VList>
    </DemoCard>
  );
}

function ExpansionListsExample() {
  const [open, setOpen] = useState<Record<string, boolean>>({ Dining: true });
  const items = [
    { action: "local_activity", title: "Attractions", items: ["List Item"] },
    { action: "restaurant", title: "Dining", items: ["Breakfast & brunch", "New American", "Sushi"] },
    { action: "school", title: "Education", items: ["List Item"] },
    { action: "directions_run", title: "Family", items: ["List Item"] },
    { action: "healing", title: "Health", items: ["List Item"] },
    { action: "content_cut", title: "Office", items: ["List Item"] },
    { action: "local_offer", title: "Promotions", items: ["List Item"] },
  ];
  return (
    <DemoCard maxWidth={500}>
      <VToolbar color="#009688" title="Topics" actions={["mdi-dots-vertical"]} />
      <VList>
        {items.map((item) => <Box key={item.title}><GroupHeader icon={item.action} title={item.title} open={Boolean(open[item.title])} onClick={() => setOpen((current) => ({ ...current, [item.title]: !current[item.title] }))} /><Collapse in={Boolean(open[item.title])}>{item.items.map((title) => <VListItem key={title} title={title} indent={1} onClick={() => {}} />)}</Collapse></Box>)}
      </VList>
    </DemoCard>
  );
}

function NavExample() {
  const [selected, setSelected] = useState(0);
  const items = [
    { text: "My Files", icon: "mdi-folder" },
    { text: "Shared with me", icon: "mdi-account-multiple" },
    { text: "Starred", icon: "mdi-star" },
    { text: "Recent", icon: "mdi-history" },
    { text: "Offline", icon: "mdi-check-circle" },
    { text: "Uploads", icon: "mdi-upload" },
    { text: "Backups", icon: "mdi-cloud-upload" },
  ];
  return (
    <DemoCard width={256} tile>
      <Box sx={{ bgcolor: "#fff", minHeight: "100%" }}>
        <Box sx={{ height: 24, bgcolor: "#f5f5f5" }} />
        <VList>
          <VListItem avatar="https://cdn.vuetifyjs.com/images/john.png" />
          <VListItem title="John Leider" subtitle="john@vuetifyjs.com" actionIcon="mdi-menu-down" onClick={() => {}} />
        </VList>
        <VDivider />
        <VList dense nav>
          {items.map((item, index) => <VListItem key={item.text} nav dense active={selected === index} prependIcon={item.icon} title={item.text} onClick={() => setSelected(index)} />)}
        </VList>
      </Box>
    </DemoCard>
  );
}

function VList({ children, dense = false, disabled = false, shaped = false, flat = false, nav = false, rounded = false, subheader = false, twoLine = false, threeLine = false }: { children: ReactNode; dense?: boolean; disabled?: boolean; shaped?: boolean; flat?: boolean; nav?: boolean; rounded?: boolean; subheader?: boolean; twoLine?: boolean; threeLine?: boolean }) {
  return <Box data-dense={dense} data-disabled={disabled} data-shaped={shaped} data-flat={flat} data-nav={nav} data-rounded={rounded} data-subheader={subheader} data-two-line={twoLine} data-three-line={threeLine} sx={{ py: subheader ? 0 : 1, bgcolor: "#fff", opacity: disabled ? .55 : 1 }}>{children}</Box>;
}

function VListItem({ title, titleHtml, subtitle, subtitleHtml, subtitles, thirdLine, twoLine = false, threeLine = false, dense = false, disabled = false, inactive = false, active = false, activeColor = primary, flat = false, shaped = false, rounded = false, nav = false, avatar, trailingAvatar, avatarIcon, avatarIconBg, prependIcon, prependColor, actionIcon, actionPlainIcon, actionColor, actionText, checkbox, indent = 0, onClick }: { title?: string; titleHtml?: string; subtitle?: string; subtitleHtml?: string; subtitles?: string[]; thirdLine?: string; twoLine?: boolean; threeLine?: boolean; dense?: boolean; disabled?: boolean; inactive?: boolean; active?: boolean; activeColor?: string; flat?: boolean; shaped?: boolean; rounded?: boolean; nav?: boolean; avatar?: string; trailingAvatar?: string; avatarIcon?: string; avatarIconBg?: string; prependIcon?: string; prependColor?: string; actionIcon?: string; actionPlainIcon?: string; actionColor?: string; actionText?: string; checkbox?: boolean; indent?: number; onClick?: () => void }) {
  const { ripples, triggerRipple } = useVuetifyRipple();
  const hasSub = Boolean(subtitle || subtitleHtml || subtitles?.length || thirdLine);
  const minHeight = dense ? 40 : threeLine ? 88 : twoLine || hasSub ? 72 : 48;
  const clickable = Boolean(onClick) && !disabled && !inactive;
  const radius = nav || rounded ? 4 : shaped ? "0 24px 24px 0" : 0;
  const handlePointerDown = (event: MouseEvent<HTMLElement>) => {
    if (clickable) triggerRipple(event);
  };
  return (
    <Box component="button" type="button" disabled={disabled} onPointerDown={handlePointerDown} onClick={clickable ? onClick : undefined} sx={{ width: nav ? "calc(100% - 16px)" : "100%", minHeight, display: "flex", alignItems: threeLine ? "flex-start" : "center", border: 0, mx: nav ? 1 : 0, my: nav ? .25 : 0, pl: 2 + indent * 4, pr: 2, py: dense ? .25 : 1, textAlign: "left", bgcolor: active && !flat ? "rgba(0,151,167,.12)" : "transparent", color: active ? activeColor : "rgba(0,0,0,.87)", borderRadius: radius, cursor: clickable ? "pointer" : "default", opacity: disabled ? .55 : 1, position: "relative", overflow: "hidden", transition: "background-color .18s cubic-bezier(.4,0,.2,1)", "&:hover": { bgcolor: clickable ? active && !flat ? "rgba(0,151,167,.16)" : "rgba(0,0,0,.04)" : active && !flat ? "rgba(0,151,167,.12)" : "transparent" } }}>
      {checkbox !== undefined && <Box sx={{ minWidth: 56 }}><Checkbox checked={checkbox} tabIndex={-1} sx={{ color: "rgba(0,0,0,.54)", "&.Mui-checked": { color: primary } }} /></Box>}
      {avatar && <Box sx={{ minWidth: 56, pt: threeLine ? .5 : 0 }}><Avatar src={avatar} sx={{ width: 40, height: 40 }} /></Box>}
      {avatarIcon && <Box sx={{ minWidth: 56, pt: threeLine ? .5 : 0 }}><Avatar sx={{ width: 40, height: 40, bgcolor: avatarIconBg, color: "#fff" }}><MaterialIcon name={avatarIcon} /></Avatar></Box>}
      {prependIcon && <Box sx={{ minWidth: 56, color: prependColor ?? "rgba(0,0,0,.54)", pt: threeLine ? .5 : 0 }}><VIcon icon={prependIcon} color="currentColor" /></Box>}
      <Box sx={{ flex: 1, minWidth: 0, alignSelf: "center" }}>
        {titleHtml ? <Typography component="div" dangerouslySetInnerHTML={{ __html: titleHtml }} sx={titleSx} /> : title && <Typography sx={titleSx}>{title}</Typography>}
        {subtitleHtml ? <Typography component="div" dangerouslySetInnerHTML={{ __html: subtitleHtml }} sx={subtitleSx(threeLine)} /> : subtitle && <Typography sx={subtitleSx(threeLine)}>{subtitle}</Typography>}
        {subtitles?.map((line) => <Typography key={line} sx={subtitleSx(false)}>{line}</Typography>)}
        {thirdLine && <Typography sx={subtitleSx(false)}>{thirdLine}</Typography>}
      </Box>
      {actionText && <Typography sx={{ alignSelf: "flex-start", fontSize: 12, color: "rgba(0,0,0,.6)", mr: .5 }}>{actionText}</Typography>}
      {trailingAvatar && <Box sx={{ minWidth: 48, display: "flex", justifyContent: "flex-end" }}><Avatar src={trailingAvatar} sx={{ width: 40, height: 40 }} /></Box>}
      {actionIcon && <Box sx={{ minWidth: 40, display: "flex", justifyContent: "flex-end", color: "rgba(0,0,0,.54)" }}><VIcon icon={actionIcon} color="currentColor" /></Box>}
      {actionPlainIcon && <Box sx={{ minWidth: 40, display: "flex", justifyContent: "flex-end", color: actionColor ?? "rgba(0,0,0,.54)" }}><MaterialIcon name={actionPlainIcon} color="currentColor" /></Box>}
      <RippleLayer ripples={ripples} />
    </Box>
  );
}

function GroupHeader({ title, icon, open, nested = false, onClick }: { title: string; icon?: string; open: boolean; nested?: boolean; onClick: () => void }) {
  const { ripples, triggerRipple } = useVuetifyRipple();
  const handlePointerDown = (event: MouseEvent<HTMLElement>) => triggerRipple(event);
  return (
    <Box component="button" type="button" onPointerDown={handlePointerDown} onClick={onClick} sx={{ width: "100%", minHeight: 48, display: "flex", alignItems: "center", border: 0, bgcolor: "transparent", px: 2, pl: nested ? 8 : 2, cursor: "pointer", textAlign: "left", position: "relative", overflow: "hidden", "&:hover": { bgcolor: "rgba(0,0,0,.04)" } }}>
      {icon && <Box sx={{ minWidth: 56, color: "rgba(0,0,0,.54)" }}><VIcon icon={icon} color="currentColor" /></Box>}
      <Typography sx={{ flex: 1, fontSize: 16 }}>{title}</Typography>
      <VIcon icon={open ? "mdi-chevron-up" : "mdi-chevron-down"} color="rgba(0,0,0,.54)" />
      <RippleLayer ripples={ripples} />
    </Box>
  );
}

function VToolbar({ color, title, actions }: { color: string; title: string; actions: string[] }) {
  return (
    <Toolbar sx={{ minHeight: 64, height: 64, bgcolor: color, color: "#fff", px: 1 }}>
      <VIconButton icon="mdi-menu" color="#fff" />
      <Typography sx={{ flex: 1, fontSize: 20, fontWeight: 400, ml: 2 }}>{title}</Typography>
      {actions.map((icon) => <VIconButton key={icon} icon={icon} color="#fff" material={!icon.startsWith("mdi-")} />)}
    </Toolbar>
  );
}

function VIconButton({ icon, color = "rgba(0,0,0,.54)", material = false, sx }: { icon: string; color?: string; material?: boolean; sx?: object }) {
  return <IconButton sx={{ width: 48, height: 48, color, ...sx }}>{material ? <MaterialIcon name={icon} color="currentColor" /> : <VIcon icon={icon} color="currentColor" />}</IconButton>;
}

function VIcon({ icon, color = "currentColor", size = 24 }: { icon: string; color?: string; size?: number }) {
  const path = mdiPaths[icon];
  if (!path) return <MaterialIcon name={icon.replace(/^mdi-/, "")} color={color} size={size} />;
  return <Box component="svg" viewBox="0 0 24 24" sx={{ width: size, height: size, display: "block", color }}><Box component="path" d={path} fill="currentColor" /></Box>;
}

function MaterialIcon({ name, size = 24, color = "currentColor" }: { name: string; size?: number; color?: string }) {
  return <Box component="span" sx={{ color, direction: "ltr", display: "inline-block", fontFamily: "Material Icons", fontFeatureSettings: "'liga'", fontSize: size, fontStyle: "normal", fontWeight: 400, height: size, letterSpacing: "normal", lineHeight: 1, textRendering: "optimizeLegibility", textTransform: "none", whiteSpace: "nowrap", width: size, wordWrap: "normal" }}>{name}</Box>;
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
    window.setTimeout(() => {
      setRipples((current) => current.filter((ripple) => ripple.id !== id));
    }, 560);
  };
  return { ripples, triggerRipple };
}

function RippleLayer({ ripples }: { ripples: Ripple[] }) {
  return (
    <Box aria-hidden="true" sx={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", borderRadius: "inherit" }}>
      {ripples.map((ripple) => (
        <Box
          key={ripple.id}
          sx={{
            position: "absolute",
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            borderRadius: "50%",
            bgcolor: "currentColor",
            opacity: 0,
            transform: "scale(0)",
            animation: "vListRipple 560ms cubic-bezier(.25,.8,.5,1)",
            "@keyframes vListRipple": {
              "0%": { opacity: .18, transform: "scale(0)" },
              "45%": { opacity: .14, transform: "scale(.55)" },
              "100%": { opacity: 0, transform: "scale(1)" },
            },
          }}
        />
      ))}
    </Box>
  );
}

function VSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <Box onClick={() => onChange(!checked)} sx={{ m: 1, display: "flex", alignItems: "center", minHeight: 42, cursor: "pointer", userSelect: "none" }}><Box sx={{ width: 42, height: 34, position: "relative", mr: 1, display: "flex", alignItems: "center" }}><Box sx={{ width: 34, height: 14, borderRadius: 8, bgcolor: checked ? primary : "rgba(0,0,0,.38)", opacity: checked ? .5 : .38 }} /><Box sx={{ position: "absolute", left: checked ? 18 : 0, width: 20, height: 20, borderRadius: "50%", bgcolor: checked ? primary : "#fafafa", boxShadow: "0 2px 4px rgba(0,0,0,.32)", transition: "left 150ms cubic-bezier(.4,0,.2,1)" }} /></Box><Typography sx={{ fontSize: 16 }}>{label}</Typography></Box>;
}

function DemoCard({ children, maxWidth, width, tile = false }: { children: ReactNode; maxWidth?: number; width?: number; tile?: boolean }) {
  return <Card sx={{ mx: "auto", width, maxWidth, borderRadius: tile ? 0 : 1, boxShadow: shadow2, overflow: "hidden", bgcolor: "#fff" }}>{children}</Card>;
}

function VRow({ children, align, justify, sx }: { children: ReactNode; align?: string; justify?: string; sx?: object }) {
  return <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: align, justifyContent: justify, mx: -1.5, ...sx }}>{children}</Box>;
}

function Subheader({ children, inset = false }: { children: ReactNode; inset?: boolean }) {
  return <Typography sx={{ minHeight: 48, display: "flex", alignItems: "center", pl: inset ? 9 : 2, pr: 2, color: "rgba(0,0,0,.6)", fontSize: 14, fontWeight: 400 }}>{children}</Typography>;
}

function VDivider({ inset = false }: { inset?: boolean }) {
  return <Divider sx={{ ml: inset ? 9 : 0 }} />;
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

const titleSx = { fontSize: 16, lineHeight: "24px", fontWeight: 400, color: "inherit", "& .grey--text": { color: "#bdbdbd" } };
function subtitleSx(clamp: boolean) {
  return { fontSize: 14, lineHeight: "20px", color: "rgba(0,0,0,.6)", ...(clamp ? { display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } : {}), "& .text--primary": { color: "rgba(0,0,0,.87)" } };
}

const mdiPaths: Record<string, string> = {
  "mdi-account": mdiAccount,
  "mdi-account-multiple": mdiAccountMultiple,
  "mdi-check-circle": mdiCheckCircle,
  "mdi-checkbox-marked-circle": mdiCheckboxMarkedCircle,
  "mdi-chevron-down": mdiChevronDown,
  "mdi-chevron-left": mdiChevronLeft,
  "mdi-chevron-up": mdiChevronUp,
  "mdi-clock": mdiClock,
  "mdi-cloud-upload": mdiCloudUpload,
  "mdi-dots-vertical": mdiDotsVertical,
  "mdi-email": mdiEmail,
  "mdi-flag": mdiFlag,
  "mdi-folder": mdiFolder,
  "mdi-history": mdiHistory,
  "mdi-home": mdiHome,
  "mdi-information": mdiInformation,
  "mdi-magnify": mdiMagnify,
  "mdi-map-marker": mdiMapMarker,
  "mdi-menu": mdiMenu,
  "mdi-menu-down": mdiMenuDown,
  "mdi-message-text": mdiMessageText,
  "mdi-pencil": mdiPencil,
  "mdi-phone": mdiPhone,
  "mdi-star": mdiStar,
  "mdi-upload": mdiUpload,
  "mdi-view-module": mdiViewModule,
};

const sourceTemplates = {
  usage: "src/demo/examples/lists/usage.vue",
  playground: "src/demo/examples/lists/playground.vue",
  "simple/disabled": "src/demo/examples/lists/simple/disabled.vue",
  "simple/shaped": "src/demo/examples/lists/simple/shaped.vue",
  "simple/dense": "src/demo/examples/lists/simple/dense.vue",
  "simple/flat": "src/demo/examples/lists/simple/flat.vue",
  "simple/rounded": "src/demo/examples/lists/simple/rounded.vue",
  "intermediate/avatar-title-and-action": "src/demo/examples/lists/intermediate/avatar-title-and-action.vue",
  "intermediate/icon-two-lines-and-action": "src/demo/examples/lists/intermediate/icon-two-lines-and-action.vue",
  "intermediate/avatar-three-lines": "src/demo/examples/lists/intermediate/avatar-three-lines.vue",
  "intermediate/avatar-subheader-title-and-action": "src/demo/examples/lists/intermediate/avatar-subheader-title-and-action.vue",
  "intermediate/nested": "src/demo/examples/lists/intermediate/nested.vue",
  "intermediate/card-list": "src/demo/examples/lists/intermediate/card-list.vue",
  "intermediate/title-subtitle-actions-and-action-text": "src/demo/examples/lists/intermediate/title-subtitle-actions-and-action-text.vue",
  "intermediate/action-title-and-subtitle": "src/demo/examples/lists/intermediate/action-title-and-subtitle.vue",
  "intermediate/expansion-lists": "src/demo/examples/lists/intermediate/expansion-lists.vue",
  "intermediate/nav": "src/demo/examples/lists/intermediate/nav.vue",
};
