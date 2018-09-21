/**
 * @file index
 * @author shuai.li
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dreamObj: {
      userName: '',
      dream: '',
    },
    addressObj: {
      province: '',
      city: '',
      county: '',
      address: '',
      mobile: '',
    },
    globleObj: {
      isShowLoading: false,
    },
  },
  mutations: {
    updateDream(state, payload) {
      state.dreamObj = {
        ...state.dreamObj,
        ...payload,
      };
    },
    updateAddress(state, payload) {
      state.addressObj = {
        ...state.addressObj,
        ...payload,
      };
    },
    updateGlobleObj(state, payload) {
      state.globleObj = {
        ...state.globleObj,
        ...payload,
      };
    },
  },
})