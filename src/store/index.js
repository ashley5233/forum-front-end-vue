import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import userAPI from './../apis/users'

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      isAdmin: false
    },
    isAuthenticated: false
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await userAPI.getCurrentUser()
        const { id, name, email, image, isAdmin } = data
        commit('setCurrentUser', {
          id, name, email, image, isAdmin
        })
      } catch (error) {
        console.error('error', error)
      }
    }
  },
  modules: {
  }
})
