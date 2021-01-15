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
      </div>
    </div>
    <div class="text-center">
      <router-link to="/" class="btn btn-dark mt-5">戻る</router-link>
    </div>
    <TaskDetailModal v-if="isVisibleTaskDetailModal" :task="taskDetail" @close-modal="handleCloseTaskDetailModal" />
  </div>
</template>

<script>
import TaskDetailModal from './components/TaskDetailModal'

export default {
  components: {
    TaskDetailModal
  },
  name: 'TaskIndex',
  data() {
    return {
      tasks: [],
      taskDetail: {},
      isVisibleTaskDetailModal: false
    }
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    fetchTasks() {
      this.$axios.get("tasks")
        .then(res => this.tasks = res.data)
        .catch(err => console.log(err.status));
    },
    handleShowTaskDetailModal(task) {
      this.isVisibleTaskDetailModal = true;
      this.taskDetail = task;
    },
    handleCloseTaskDetailModal() {
      this.isVisibleTaskDetailModal = false;
      this.taskDetail = {};
    }
  }
}
</script>

<style scoped>
</style>
