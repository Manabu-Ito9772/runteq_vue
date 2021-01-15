import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../plugins/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: []
  },
  getters: {
    tasks(state) {
  		return state.tasks
  	}
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    addTask(state, task) {
      state.tasks.push(task)
    }
  },
  actions: {
    getTasks({commit}) {
      axios.get('tasks')
        .then(res => {
          commit('setTasks', res.data)
        })
        .catch(err => console.log(err.status));
    },
    createTask({commit}, task) {
      axios.post("tasks", {
        title: task.title,
        description: task.description
      })
      .then(res => {
        commit('addTask', res.data)
      })
      .catch(err => console.log(err.status));
    }
  }
})
