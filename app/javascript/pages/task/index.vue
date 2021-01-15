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
    <TaskDetailModal v-if="isVisibleTaskDetailModal" :task="taskDetail" @close-modal="handleCloseTaskDetailModal" />
    <TaskCreateModal v-if="isVisibleTaskCreateModal" @close-modal="handleCloseTaskCreateModal" @create-task="newTask"/>
  </div>
</template>

<script>
import TaskDetailModal from './components/TaskDetailModal'
import TaskCreateModal from './components/TaskCreateModal'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    TaskDetailModal,
    TaskCreateModal,
  },
  name: 'TaskIndex',
  data() {
    return {
      taskDetail: {},
      isVisibleTaskDetailModal: false,
      isVisibleTaskCreateModal: false,
    }
  },
  created() {
    this.getTasks()
  },
  computed: {
    ...mapGetters([
      'tasks'
    ])
  },
  methods: {
    ...mapActions([
      'getTasks',
      'createTask'
    ]),
    newTask(task) {
      this.createTask(task)
      this.handleCloseTaskCreateModal();
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
  }
}
</script>

<style scoped>
</style>
