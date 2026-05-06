import * as mutationTypes from "../mutation-types";
import config from "@/config/index";

export const state = config.navigations.footer;

export const getters = {
  isVisibleFooter: (state) => state.show,
  isAppFooter: (state) => state.app,
  isFixedFooter: (state) => state.fixed,
  isAbsoluteFooter: (state) => state.absolute,
  isInsetFooter: (state) => state.inset,
  isPadlessFooter: (state) => state.padless,
};

export const mutations = {
  [mutationTypes.SET_FOOTER_VISIBILITY]: (state, payload) => {
    state.show = payload !== undefined ? payload : !state.show;
  },
  [mutationTypes.SET_APP_FOOTER]: (state, payload) => {
    state.app = payload !== undefined ? payload : !state.app;
  },
  [mutationTypes.SET_FIXED_FOOTER]: (state, payload) => {
    state.fixed = payload !== undefined ? payload : !state.fixed;
  },
  [mutationTypes.SET_INSET_FOOTER]: (state, payload) => {
    state.inset = payload !== undefined ? payload : !state.inset;
  },
  [mutationTypes.SET_ABSOLUTE_FOOTER]: (state, payload) => {
    state.absolute = payload !== undefined ? payload : !state.absolute;
  },
  [mutationTypes.SET_PADLESS_FOOTER]: (state, payload) => {
    state.padless = payload !== undefined ? payload : !state.padless;
  },
};

export const actions = {
  setFooterVisibility: ({ commit }, payload) => {
    commit(mutationTypes.SET_FOOTER_VISIBILITY, payload);
  },
  setAppFooter: ({ commit }, payload) => {
    commit(mutationTypes.SET_APP_FOOTER, payload);
  },
  setFixedFooter: ({ commit }, payload) => {
    commit(mutationTypes.SET_FIXED_FOOTER, payload);
  },
  setInsetFooter: ({ commit }, payload) => {
    commit(mutationTypes.SET_INSET_FOOTER, payload);
  },
  setAbsoluteFooter: ({ commit }, payload) => {
    commit(mutationTypes.SET_ABSOLUTE_FOOTER, payload);
  },
  setPadlessFooter: ({ commit }, payload) => {
    commit(mutationTypes.SET_PADLESS_FOOTER, payload);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
