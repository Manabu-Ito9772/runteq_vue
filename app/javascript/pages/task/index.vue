<template>
  <div class="container-fluid">
    <div class="row">
      <TaskList :tasks="todoTasks" id="todo-list" @show-detail-modal="handleShowTaskDetailModal">
        <template v-slot:header>
          <div class="h4">TODO</div>
        </template>
      </TaskList>
      <TaskList :tasks="doingTasks" id="doing-list" @show-detail-modal="handleShowTaskDetailModal">
        <template v-slot:header>
          <div class="h4">DOING</div>
        </template>
      </TaskList>
      <TaskList :tasks="doneTasks" id="done-list" @show-detail-modal="handleShowTaskDetailModal">
        <template v-slot:header>
          <div class="h4">DONE</div>
        </template>
      </TaskList>
    </div>
    <div class="text-center">
      <button @click="handleShowTaskCreateModal" type="button" class="btn btn-secondary">タスクを追加</button>
    </div>
    <div class="text-center">
      <router-link to="/" class="btn btn-dark mt-5">戻る</router-link>
    </div>
    <transition name="fade">
      <TaskDetailModal v-if="isVisibleTaskDetailModal"
                       :task="taskDetail"
                       @close-modal="handleCloseTaskDetailModal"
                       @show-edit-modal="handleShowTaskEditModal"
                       @delete-task="handleDeleteTask"/>
    </transition>
    <transition name="fade">
      <TaskCreateModal v-if="isVisibleTaskCreateModal"
                       @close-modal="handleCloseTaskCreateModal"
                       @create-task="newTask"/>
    </transition>
    <transition name="fade">
      <TaskEditModal v-if="isVisibleTaskEditModal"
                     @close-modal="handleCloseTaskEditModal"
                     @update-task="handleUpdateTask"
                     :task="taskEdit"/>
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
  components: {
    TaskList,
    TaskDetailModal,
    TaskCreateModal,
    TaskEditModal,
  },
  name: 'TaskIndex',
  data() {
    return {
      taskDetail: {},
      isVisibleTaskDetailModal: false,
      isVisibleTaskCreateModal: false,
      isVisibleTaskEditModal: false,
      taskEdit: {},
    }
  },
  created() {
    this.getTasks();
  },
  computed: {
    ...mapGetters([
      'todoTasks',
      'doingTasks',
      'doneTasks'
    ])
  },
  methods: {
    ...mapActions([
      'getTasks',
      'createTask',
      'updateTask',
      'deleteTask'
    ]),
    async newTask(task) {
      try {
        await this.createTask(task);
        this.handleCloseTaskCreateModal();
      } catch(error) {
        console.log(error);
      }
    },
    async handleUpdateTask(task) {
      try {
        await this.updateTask(task);
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
