import * as mutationTypes from "../mutation-types";
import config from "@/config/index";

export const state = config.navigations.sidebar;

const defaultActiveMenuStyles = config.navigations.defaultActiveMenuStyles;

export const getters = {
  isVisibleSideNav: state => state.show,
  isMinSideNav: state => state.miniVariant,
  activeItemStyle: state => state.activeMenuStyle,
  isSidenavPostionRight: state => state.isRight,
  isClipped: state => state.clipped
};

export const mutations = {
  [mutationTypes.SET_SIDENAV_VISIBILITY]: (state, payload) => {
    state.show = payload !== undefined ? payload : !state.show;
  },
  [mutationTypes.SET_SIDENAV_MINI_VARIANT]: (state, payload) => {
    state.miniVariant = payload !== undefined ? payload : !state.miniVariant;
  },
  [mutationTypes.SET_SIDENAV_ACTIVE_MENU_STYLE]: (state, payload) => {
    state.activeMenuStyle = !payload
      ? {
          ...defaultActiveMenuStyles
        }
      : {
          ...defaultActiveMenuStyles,
          [payload]: true
        };
  },
  [mutationTypes.SET_SIDENAV_POSITION_TO_RIGHT]: (state, payload) => {
    state.isRight = payload !== undefined ? payload : !state.isRight;
  }
};

export const actions = {
  setSidenavVisibility: ({ commit }, payload) => {
    commit(mutationTypes.SET_SIDENAV_VISIBILITY, payload);
  },
  setMiniVariant: ({ commit }, payload) => {
    commit(mutationTypes.SET_SIDENAV_MINI_VARIANT, payload);
  },
  setActiveSidenavStyle: ({ commit }, payload) => {
    commit(mutationTypes.SET_SIDENAV_ACTIVE_MENU_STYLE, payload);
  },
  setSidenavPositionRight: ({ commit }, payload) => {
    commit(mutationTypes.SET_SIDENAV_POSITION_TO_RIGHT, payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
