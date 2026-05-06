import * as mutationTypes from "../mutation-types";
import config from "@/config/index";

export const state = { ...config.navigations.header };

export const getters = {
  isVisibleHeader: (state) => state.show,
  isClippedOver: (state) => state.clippedOver,
  isDense: (state) => state.dense,
  isProminent: (state) => state.prominent,
  isHideOnScroll: (state) => state.hideOnScroll,
  isShrinkOnScroll: (state) => state.shrinkOnScroll,
  isFloating: (state) => state.floating,
};

export const mutations = {
  [mutationTypes.SET_HEADER_VISIBILITY]: (state, payload) => {
    state.show = payload !== undefined ? payload : !state.show;
  },
  [mutationTypes.SET_HEADER_CLIPPED_OVER]: (state, payload) => {
    state.clippedOver = payload !== undefined ? payload : !state.clippedOver;
  },
  [mutationTypes.UPDATE_HEADER_SETTING]: (state, payload) => {
    state = Object.assign(state, payload);
  },
};

export const actions = {
  setHeaderVisibility: ({ commit }, payload) => {
    commit(mutationTypes.SET_HEADER_VISIBILITY, payload);
  },
  setHeaderClippedOver: ({ commit }, payload) => {
    commit(mutationTypes.SET_HEADER_CLIPPED_OVER, payload);
  },
  updateHeaderSettings: ({ commit }, payload) => {
    commit(mutationTypes.UPDATE_HEADER_SETTING, payload);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
