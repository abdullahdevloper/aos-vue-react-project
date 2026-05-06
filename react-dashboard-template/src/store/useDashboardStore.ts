import { create } from "zustand";

type ActiveMenuStyle = {
  shaped: boolean;
  rounded: boolean;
  flat: boolean;
};

interface DashboardState {
  sidebarOpen: boolean;
  miniVariant: boolean;
  sidebarRight: boolean;
  denseNav: boolean;
  darkMode: boolean;
  rtl: boolean;
  locale: string;
  headerVisible: boolean;
  footerVisible: boolean;
  activeMenuStyle: ActiveMenuStyle;
  toggleSidebar: () => void;
  setMiniVariant: (value: boolean) => void;
  setSidebarRight: (value: boolean) => void;
  setDenseNav: (value: boolean) => void;
  setDarkMode: (value: boolean) => void;
  setRtl: (value: boolean) => void;
  setLocale: (value: string) => void;
  setHeaderVisible: (value: boolean) => void;
  setFooterVisible: (value: boolean) => void;
  setActiveMenuStyle: (style: Partial<ActiveMenuStyle>) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  sidebarOpen: true,
  miniVariant: false,
  sidebarRight: false,
  denseNav: true,
  darkMode: false,
  rtl: false,
  locale: "en",
  headerVisible: true,
  footerVisible: true,
  activeMenuStyle: { shaped: true, rounded: false, flat: false },
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setMiniVariant: (miniVariant) => set({ miniVariant }),
  setSidebarRight: (sidebarRight) => set({ sidebarRight }),
  setDenseNav: (denseNav) => set({ denseNav }),
  setDarkMode: (darkMode) => set({ darkMode }),
  setRtl: (rtl) => set({ rtl }),
  setLocale: (locale) => set({ locale }),
  setHeaderVisible: (headerVisible) => set({ headerVisible }),
  setFooterVisible: (footerVisible) => set({ footerVisible }),
  setActiveMenuStyle: (style) =>
    set((state) => ({ activeMenuStyle: { ...state.activeMenuStyle, ...style } })),
}));
