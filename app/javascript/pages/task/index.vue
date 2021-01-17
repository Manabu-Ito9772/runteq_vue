<template>
  <div>
    <div class="d-flex">
      <div class="col-4 bg-light rounded shadow m-3 p-3">
        <div class="h4">TODO</div>
        <div v-for="task in tasks"
             :key="task.id"
             :id="'task-' + task.id"
             @click="handleShowTaskDetailModal(task)"
             class="bg-white border shadow-sm rounded my-2 p-4">
          <span>{{ task.title }}</span>
        </div>
        <button @click="handleShowTaskCreateModal" type="button" class="btn btn-secondary">タスクを追加</button>
      </div>
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
      <TaskCreateModal v-if="isVisibleTaskCreateModal" @close-modal="handleCloseTaskCreateModal" @create-task="newTask"/>
    </transition>
    <transition name="fade">
      <TaskEditModal v-if="isVisibleTaskEditModal" @close-modal="handleCloseTaskEditModal" @update-task="handleUpdateTask" :task="taskEdit"/>
    </transition>
  </div>
</template>

<script>
import TaskDetailModal from './components/TaskDetailModal'
import TaskCreateModal from './components/TaskCreateModal'
import TaskEditModal from './components/TaskEditModal'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
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
      taskEdit: {}
    }
  },
  created() {
    this.getTasks();
  },
  computed: {
    ...mapGetters([ 'tasks' ])
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
