export const vueColors = {
  blue: { base: "#2196f3", lighten3: "#90caf9", lighten4: "#bbdefb", accent3: "#2979ff", accent4: "#2962ff" },
  purple: { base: "#9c27b0", lighten3: "#ce93d8", lighten4: "#e1bee7", accent3: "#d500f9", accent4: "#aa00ff" },
  indigo: { base: "#3f51b5", lighten4: "#c5cae9", accent3: "#3d5afe", accent4: "#304ffe" },
  teal: { lighten3: "#80cbc4", accent3: "#1de9b6" },
  green: { base: "#4caf50", accent3: "#00e676", accent4: "#00c853" },
  orange: { base: "#ff9800", lighten3: "#ffcc80", accent3: "#ff9100", accent4: "#ff6d00" },
  red: { base: "#f44336", lighten3: "#ef9a9a", lighten4: "#ffcdd2", accent3: "#ff1744", accent4: "#d50000" },
  amber: { lighten3: "#ffe082", base: "#ffc107", accent3: "#ffc400" },
  pink: { base: "#e91e63", lighten4: "#f8bbd0", accent4: "#c51162" },
  deepOrange: { lighten3: "#ffab91" },
  cyan: { base: "#00bcd4" },
};

export const monthLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const frameworkLabels = ["VueJs", "ReactJs", "EmberJs", "AngularJs"];

export function linearGradient(start: string, end: string, alpha = 1) {
  return (context: { chart: { ctx: CanvasRenderingContext2D; chartArea?: { top: number; bottom: number } } }) => {
    const { ctx, chartArea } = context.chart;
    if (!chartArea) return start;
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, withAlpha(start, alpha));
    gradient.addColorStop(1, withAlpha(end, alpha));
    return gradient;
  };
}

export function radialValues(seed = 1, length = 7) {
  return Array.from({ length }, (_, index) => Math.round(((index + 1) * 17 + seed * 13) % 89) + 10);
}

export function scatterValues(seed = 2, length = 7) {
  return Array.from({ length }, (_, index) => ({
    x: Math.round(((index + seed) * 19) % 96) + 4,
    y: Math.round(((index + seed * 3) * 23) % 88) + 8,
  }));
}

function withAlpha(hex: string, alpha: number) {
  if (alpha >= 1) return hex;
  const normalized = hex.replace("#", "");
  const bigint = Number.parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
