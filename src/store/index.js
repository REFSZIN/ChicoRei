import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: localStorage,
  })],
  namespaced: true,
  state: {
    userData: undefined,
  },

  getters: {
  },

  mutations: {
    SET_USER_DATA(state, userData) {
      state.userData = userData
    }
  },

  actions: {
    async login({ commit }, user) {
      const userData = user;
      commit('SET_USER_DATA', userData)
    }
  },

  modules: {
  }
})
