import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:'',
    addCourse:[]
  },
  mutations: {
    SET_USER:(state,data)=>{
      state.user=data;
    },
    SET_ADDCOURSE:(state,data)=>{
      state.addCourse=data;
    },
    REMOVE_USER:(state)=>{
      state.user=[];
    },
    REMOVE_ADDCOURSE:(state)=>{
      state.addCourse=[];
    }
  },
  actions: {
  },
  modules: {
  }
})
