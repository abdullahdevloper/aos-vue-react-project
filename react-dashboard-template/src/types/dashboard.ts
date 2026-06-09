import type { ReactNode } from "react";

export type Tone = "primary" | "secondary" | "success" | "warning" | "error" | "info";

export interface AvatarLike {
  src?: string;
  icon?: ReactNode;
  text?: string;
  color?: string;
}

export interface MetricItem {
  label: string;
  value: string | number;
  helper?: string;
  tone?: Tone;
}

export interface NavItem {
  title: string;
  path?: string;
  icon?: ReactNode;
  children?: NavItem[];
}

export interface ChartPanelProps {
  title?: string;
  height?: number;
}
