<template>
  <div class="container-fluid">
    <div
      id="search-form"
      class="form-row p-3"
    >
      <div class="form-group col-lg-6 offset-lg-3">
        <label for="search">絞り込み</label>
        <input
          id="search"
          v-model="searchTask"
          type="text"
          placeholder="タスク名を入力してください"
          class="form-control"
        >
      </div>
    </div>
    <div class="row">
      <TaskList
        id="todo-list"
        :tasks="todoTasks"
        @handleShowTaskDetailModal="handleShowTaskDetailModal"
      >
        <template #header>
          <div class="h4">
            TODO
          </div>
        </template>
      </TaskList>
      <TaskList
        id="doing-list"
        :tasks="doingTasks"
        @handleShowTaskDetailModal="handleShowTaskDetailModal"
      >
        <template #header>
          <div class="h4">
            DOING
          </div>
        </template>
      </TaskList>
      <TaskList
        id="done-list"
        :tasks="doneTasks"
        @handleShowTaskDetailModal="handleShowTaskDetailModal"
      >
        <template #header>
          <div class="h4">
            DONE
          </div>
        </template>
      </TaskList>
    </div>
    <div class="text-center">
      <button
        type="button"
        class="btn btn-secondary"
        @click="handleShowTaskCreateModal"
      >
        タスクを追加
      </button>
    </div>
    <div class="text-center">
      <router-link
        to="/"
        class="btn btn-dark mt-5"
      >
        戻る
      </router-link>
    </div>
    <transition name="fade">
      <TaskDetailModal
        v-if="isVisibleTaskDetailModal"
        :task="taskDetail"
        :auth-user="authUser"
        @close-modal="handleCloseTaskDetailModal"
        @show-edit-modal="handleShowTaskEditModal"
        @delete-task="handleDeleteTask"
      />
    </transition>
    <transition name="fade">
      <TaskCreateModal
        v-if="isVisibleTaskCreateModal"
        @close-modal="handleCloseTaskCreateModal"
        @create-task="newTask"
      />
    </transition>
    <transition name="fade">
      <TaskEditModal
        v-if="isVisibleTaskEditModal"
        :taskedit.sync="taskEdit"
        @close-modal="handleCloseTaskEditModal"
        @update-task="handleUpdateTask"
      />
    </transition>
  </div>
</template>

<script>
import TaskList from './components/TaskList'
import TaskDetailModal from './components/TaskDetailModal'
import TaskCreateModal from './components/TaskCreateModal'
import TaskEditModal from './components/TaskEditModal'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TaskIndex',
  components: {
    TaskList,
    TaskDetailModal,
    TaskCreateModal,
    TaskEditModal,
  },
  data() {
    return {
      taskDetail: {},
      isVisibleTaskDetailModal: false,
      isVisibleTaskCreateModal: false,
      isVisibleTaskEditModal: false,
      taskEdit: {},
      searchTask: '',
    }
  },
  computed: {
    ...mapGetters('tasks', ["tasks"]),
    ...mapGetters("users", ["authUser"]),
    todoTasks() {
      return this.filteredTasks.filter(task => {
        return task.status == "todo"
      })
    },
    doingTasks() {
      return this.filteredTasks.filter(task => {
        return task.status == "doing"
      })
    },
    doneTasks() {
      return this.filteredTasks.filter(task => {
        return task.status == "done"
      })
    },
    filteredTasks() {
      return this.tasks.filter(task => {
        return task.title.indexOf(this.searchTask) != -1
      })
    }
  },
  created() {
    this.getTasks();
  },
  methods: {
    ...mapActions('tasks', [
      'getTasks',
      'createTask',
      'updateTask',
      'deleteTask'
    ]),
    async newTask(task) {
      try {
        await this.createTask(task);
        this.resetSearchTask();
        this.handleCloseTaskCreateModal();
      } catch(error) {
        console.log(error);
      }
    },
    async handleUpdateTask(task) {
      try {
        await this.updateTask(task);
        this.resetSearchTask();
        this.handleCloseTaskEditModal();
      } catch(error) {
        console.log(error);
      }
    },
    async handleDeleteTask(task) {
      try {
        await this.deleteTask(task);
        this.handleCloseTaskDetailModal();
      } catch(error) {
        console.log(error);
      }
    },
    resetSearchTask() {
      this.searchTask = ""
    },
    handleShowTaskDetailModal(task) {
      this.isVisibleTaskDetailModal = true;
      this.taskDetail = task;
    },
    handleCloseTaskDetailModal() {
      this.isVisibleTaskDetailModal = false;
      this.taskDetail = {};
    },
    handleShowTaskCreateModal() {
      this.isVisibleTaskCreateModal = true;
    },
    handleCloseTaskCreateModal() {
      this.isVisibleTaskCreateModal = false;
    },
    handleShowTaskEditModal(task) {
      this.taskEdit = Object.assign({}, task);
      this.isVisibleTaskEditModal = true;
      this.handleCloseTaskDetailModal();
    },
    handleCloseTaskEditModal() {
      this.isVisibleTaskEditModal = false;
    },
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
