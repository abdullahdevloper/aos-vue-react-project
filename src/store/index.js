import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import sidebar from "./modules/sidebar";
import header from "./modules/header";
import footer from "./modules/footer";
import translation from "./modules/translation";
import theme from "./modules/theme";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters,
  mutations,
  actions,
  modules: {
    navigations: {
      namespaced: true,
      modules: {
        header,
        sidebar,
        footer,
      },
    },
    scheme: {
      namespaced: true,
      modules: {
        theme,
      },
    },
    translation,
  },
});
