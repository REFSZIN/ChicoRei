
import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

const store = createStore(({
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
}))

export default store