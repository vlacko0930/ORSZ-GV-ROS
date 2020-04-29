import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    csatlakozva: false
  },
  mutations: {
    SOCKET_CONNECT(state) {
      state.csatlakozva=true;
    },
    SOCKET_DISCONNECT(state) {
      state.csatlakozva=false;
    }
  },
  actions: {
  },
  modules: {
  }
})
