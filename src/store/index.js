import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
  },
  mutations: {
    setLoading: (state, payload) => (state.loading = payload),
  },
  actions: {},
  modules: {
    auth,
  },
});
