import {
  Analytics,
  Article,
  BarChart,
  Dashboard,
  Group,
  Inventory2,
  ListAlt,
  Settings,
  ShoppingCart,
  TaskAlt,
} from "@mui/icons-material";
import type { MetricItem, NavItem } from "../types/dashboard";

export const navigationItems: NavItem[] = [
  { title: "Analytical", path: "/", icon: <Dashboard /> },
  { title: "Charts", path: "/charts", icon: <BarChart /> },
  { title: "Widgets", path: "/widgets", icon: <Analytics /> },
  { title: "Lists", path: "/lists", icon: <ListAlt /> },
  { title: "Settings", path: "/settings", icon: <Settings /> },
];

export const metrics: MetricItem[] = [
  { label: "Revenue", value: "$48.2k", helper: "12% this month", tone: "success" },
  { label: "Orders", value: "1,284", helper: "214 open", tone: "primary" },
  { label: "Visitors", value: "32.8k", helper: "3 regions", tone: "info" },
  { label: "Tasks", value: "86%", helper: "sprint health", tone: "warning" },
];

export const projects = [
  { name: "Material migration", owner: "Design", progress: 78, status: "On track" },
  { name: "Chart refactor", owner: "Frontend", progress: 64, status: "Review" },
  { name: "Inventory cards", owner: "Commerce", progress: 42, status: "Draft" },
];

export const checklistItems = [
  { id: 1, label: "Audit Vue components", done: true },
  { id: 2, label: "Build React equivalents", done: true },
  { id: 3, label: "Run phase builds", done: false },
];

export const people = [
  { name: "Avery Brooks", role: "Product Lead", icon: <Group /> },
  { name: "Mira Chen", role: "Frontend", icon: <TaskAlt /> },
  { name: "Sam Rivera", role: "Operations", icon: <Inventory2 /> },
];

export const commerceItems = [
  { name: "Wireless Headphones", price: "$129", icon: <ShoppingCart /> },
  { name: "Travel Backpack", price: "$84", icon: <Inventory2 /> },
  { name: "Design Handbook", price: "$36", icon: <Article /> },
];
