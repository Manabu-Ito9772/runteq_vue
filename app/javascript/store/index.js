import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../plugins/axios'
import taskModule from './modules/tasks'
import userModule from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    taskModule: taskModule,
    userModule: userModule
  }
})
