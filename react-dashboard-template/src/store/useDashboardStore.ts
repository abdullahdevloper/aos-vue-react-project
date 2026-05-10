import { create } from "zustand";

type ActiveMenuStyle = {
  shaped: boolean;
  rounded: boolean;
  flat: boolean;
};

const defaultActiveMenuStyle: ActiveMenuStyle = {
  shaped: false,
  rounded: false,
  flat: false,
};

interface DashboardState {
  sidebarOpen: boolean;
  miniVariant: boolean;
  sidebarRight: boolean;
  denseNav: boolean;
  darkMode: boolean;
  semiDark: boolean;
  rtl: boolean;
  locale: string;
  headerVisible: boolean;
  footerVisible: boolean;
  primaryColor: string;
  secondaryColor: string;
  headerColor: string;
  footerColor: string;
  headerDense: boolean;
  headerClippedOver: boolean;
  headerHideOnScroll: boolean;
  headerFloating: boolean;
  footerFixed: boolean;
  footerInset: boolean;
  footerPadless: boolean;
  activeMenuStyle: ActiveMenuStyle;
  toggleSidebar: () => void;
  setSidebarOpen: (value: boolean) => void;
  setMiniVariant: (value: boolean) => void;
  setSidebarRight: (value: boolean) => void;
  setDenseNav: (value: boolean) => void;
  setDarkMode: (value: boolean) => void;
  setSemiDark: (value: boolean) => void;
  setRtl: (value: boolean) => void;
  setLocale: (value: string) => void;
  setHeaderVisible: (value: boolean) => void;
  setFooterVisible: (value: boolean) => void;
  setPrimaryColor: (value: string) => void;
  setSecondaryColor: (value: string) => void;
  setHeaderColor: (value: string) => void;
  setFooterColor: (value: string) => void;
  setHeaderDense: (value: boolean) => void;
  setHeaderClippedOver: (value: boolean) => void;
  setHeaderHideOnScroll: (value: boolean) => void;
  setHeaderFloating: (value: boolean) => void;
  setFooterFixed: (value: boolean) => void;
  setFooterInset: (value: boolean) => void;
  setFooterPadless: (value: boolean) => void;
  setActiveMenuStyle: (style: Partial<ActiveMenuStyle>) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  sidebarOpen: true,
  miniVariant: false,
  sidebarRight: false,
  denseNav: true,
  darkMode: false,
  semiDark: false,
  rtl: false,
  locale: "en",
  headerVisible: true,
  footerVisible: true,
  primaryColor: "#00838f",
  secondaryColor: "#ffb74d",
  headerColor: "",
  footerColor: "",
  headerDense: false,
  headerClippedOver: false,
  headerHideOnScroll: false,
  headerFloating: true,
  footerFixed: false,
  footerInset: true,
  footerPadless: true,
  activeMenuStyle: { shaped: true, rounded: false, flat: false },
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setMiniVariant: (miniVariant) => set({ miniVariant }),
  setSidebarRight: (sidebarRight) => set({ sidebarRight }),
  setDenseNav: (denseNav) => set({ denseNav }),
  setDarkMode: (darkMode) => set((state) => ({ darkMode, semiDark: darkMode ? false : state.semiDark })),
  setSemiDark: (semiDark) => set({ semiDark }),
  setRtl: (rtl) => set({ rtl, sidebarRight: rtl }),
  setLocale: (locale) => set({ locale }),
  setHeaderVisible: (headerVisible) => set({ headerVisible }),
  setFooterVisible: (footerVisible) => set({ footerVisible }),
  setPrimaryColor: (primaryColor) => set({ primaryColor }),
  setSecondaryColor: (secondaryColor) => set({ secondaryColor }),
  setHeaderColor: (headerColor) => set({ headerColor }),
  setFooterColor: (footerColor) => set({ footerColor }),
  setHeaderDense: (headerDense) => set({ headerDense }),
  setHeaderClippedOver: (headerClippedOver) => set({ headerClippedOver }),
  setHeaderHideOnScroll: (headerHideOnScroll) => set({ headerHideOnScroll }),
  setHeaderFloating: (headerFloating) => set({ headerFloating }),
  setFooterFixed: (footerFixed) => set({ footerFixed }),
  setFooterInset: (footerInset) => set({ footerInset }),
  setFooterPadless: (footerPadless) => set({ footerPadless }),
  setActiveMenuStyle: (style) => set({ activeMenuStyle: { ...defaultActiveMenuStyle, ...style } }),
}));
