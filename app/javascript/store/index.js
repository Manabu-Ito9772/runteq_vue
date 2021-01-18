import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../plugins/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: []
  },
  getters: {
    todoTasks: state => state.tasks.filter((task) => task.status == 'todo'),
    doingTasks: state => state.tasks.filter((task) => task.status == 'doing'),
    doneTasks: state => state.tasks.filter((task) => task.status == 'done')
    // ↓もしくは
    // tasks(state) {
  	// 	return state.tasks
  	// }
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    // ↓もしくは
    // setTasks: (state, tasks) => {
    //   state.tasks = tasks
    // },
    addTask(state, task) {
      state.tasks.push(task)
    },
    updateTask: (state, updateTask) => {
      const index = state.tasks.findIndex(task => {
        return task.id == updateTask.id
      })
      state.tasks.splice(index, 1, updateTask)
    },
    deleteTask(state, deleteTask) {
      state.tasks = state.tasks.filter(task => {
        return task.id != deleteTask.id
      })
    }
  },
  actions: {
    getTasks({ commit }) {
      axios.get('tasks')
        .then(res => {
          commit('setTasks', res.data)
        })
        .catch(err => console.log(err.response));
    },
    createTask({commit}, task) {
      // return axios.post('tasks', {
      //   title: task.title,
      //   description: task.description
      // })
      return axios.post('tasks', task)
        .then(res => {
          commit('addTask', res.data)
        })
    },
    updateTask({commit}, task) {
      return axios.patch(`tasks/${task.id}`, task)
        .then(res => {
          commit('updateTask', res.data)
        })
    },
    deleteTask({commit}, task) {
      return axios.delete(`tasks/${task.id}`)
        .then(res => {
          commit('deleteTask', res.data)
        })
    }
  }
})
