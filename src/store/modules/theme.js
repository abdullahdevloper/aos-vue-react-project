import * as mutationTypes from "../mutation-types";
import config from "@/config/index";

export const state = config.theme;

export const getters = {
  primary: (state) => state.primary,
  secondary: (state) => state.secondary,
  header: (state) => state.header,
  footer: (state) => state.footer,
  dark: (state) => state.dark,
  rtl: (state) => state.rtl,
  primaryBgText: (state) => state.primaryBgText,
  secondaryBgText: (state) => state.secondaryBgText,
  semidark: (state) => state.semidark,
};

export const mutations = {
  [mutationTypes.SET_PRIMARY_COLOR]: (state, payload) => {
    state.primary = payload.color;
    state.primaryBgText = payload.bgText;
  },
  [mutationTypes.SET_SECONDARY_COLOR]: (state, payload) => {
    state.secondary = payload.color;
    state.secondaryBgText = payload.bgText;
  },
  [mutationTypes.SET_HEADER_COLOR]: (state, payload) => {
    state.header = payload;
  },
  [mutationTypes.SET_FOOTER_COLOR]: (state, payload) => {
    state.footer = payload;
  },
  [mutationTypes.SET_DARK_MODE]: (state, payload) => {
    state.semidark = false;
    state.dark = payload !== undefined ? payload : !state.dark;
  },
  [mutationTypes.SET_SEMI_DARK_MODE]: (state, payload) => {
    state.semidark = payload !== undefined ? payload : !state.semidark;
  },
  [mutationTypes.SET_RTL]: (state, payload) => {
    state.rtl = payload !== undefined ? payload : !state.rtl;
  },
};

export const actions = {
  setPrimaryColor: ({ commit }, payload) => {
    commit(mutationTypes.SET_PRIMARY_COLOR, payload);
  },
  setSecondaryColor: ({ commit }, payload) => {
    commit(mutationTypes.SET_SECONDARY_COLOR, payload);
  },
  setHeaderColor: ({ commit }, payload) => {
    commit(mutationTypes.SET_HEADER_COLOR, payload);
  },
  setFooterColor: ({ commit }, payload) => {
    commit(mutationTypes.SET_FOOTER_COLOR, payload);
  },
  setDarkTheme: ({ commit }, payload) => {
    commit(mutationTypes.SET_DARK_MODE, payload);
  },
  setSemiDarkTheme: ({ commit }, payload) => {
    commit(mutationTypes.SET_SEMI_DARK_MODE, payload);
  },
  setRtl: ({ commit }, payload) => {
    commit(mutationTypes.SET_RTL, payload);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
